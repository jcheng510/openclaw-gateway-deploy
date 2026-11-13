import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { n as isErrno, t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { l as isSupportedOpenClawNodeVersion } from "./node-version-DdJ6cN09.mjs";
import { i as resolveExistingSqliteFileUri, t as openNodeSqliteDatabase } from "./node-sqlite-B4hwsR7e.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { An as never, Et as _enum, Fn as object, Jn as string, Nt as array, lr as uuid, or as union, qn as strictObject, xn as literal } from "./schemas-BOYIvvln.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { r as resolveRuntimeWorkerUrl } from "./runtime-worker-url-S0NIVxUR.mjs";
import { t as quoteCliArg } from "./quote-cli-arg-BEt71TUh.mjs";
import { a as runUtf8CommandWithTimeout } from "./exec-Bjx7k3vE.mjs";
import { o as resolveExecutablePath } from "./executable-path-D8C96q25.mjs";
import { l as syncDirectory, p as syncDirectorySync, s as requireDirectorySync } from "./directory-durability-fWp4i1Sl.mjs";
import "./runtime-guard-Be896Oh5.mjs";
import { t as resolveUpdateInstallRoot } from "./update-install-root-DH-onosx.mjs";
import { s as assertManagedUpdateLeaseDatabaseIdentity, u as withExistingSqliteRollbackDatabase } from "./update-managed-service-handoff-lease-1Q-bxDqA.mjs";
import { t as retryAsync } from "./retry-D6s4wlQo.mjs";
import { o as captureUpdateCommandExecutorAuthority } from "./update-command-executor-B6yk9cYV.mjs";
import { t as UPDATE_CLEANUP_BUDGET_MS } from "./update-maintenance-DSvsYfBL.mjs";
import { i as packageLauncherDifferences, r as createPackageIntegrityReader } from "./package-update-integrity-BiTT-eQU.mjs";
import { t as retainMutationAuthority } from "./mutation-authority-E8BC9dNY.mjs";
import { n as isRemovalIoError, r as removePathWithinRoot } from "./fs-safe-remove-DuP7yp5L.mjs";
import { t as createVerifiedSqliteSnapshot } from "./sqlite-snapshot-DzSJnhxt.mjs";
import fs from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { FsSafeError } from "@openclaw/fs-safe/errors";
import { root } from "@openclaw/fs-safe/root";
import { movePathWithCopyFallback } from "@openclaw/fs-safe/atomic";
//#region src/infra/update-post-core-capability.ts
const POST_CORE_EXECUTOR_CAPABILITY = "stdin-pid-start-v1";
const POST_CORE_MUTATION_PROTOCOL = "original-cancellation-v1";
/** Compatibility only: authority still comes from the original live executor. */
async function supportsPostCoreExecutor(root, nodeRunner) {
	const check = await runUtf8CommandWithTimeout([
		nodeRunner,
		path.join(root, "dist", runtimeProcessEntrypoints.updateMigratedFinalize.distWorkerPath),
		"--check"
	], {
		cwd: root,
		baseEnv: {},
		timeoutMs: 3e4,
		killProcessTree: true,
		requireProcessTreeExtinction: true,
		killGraceMs: 500,
		maxOutputBytes: 65536
	});
	if (check.termination !== "exit" || check.code !== 0 || check.cleanup !== "normal") return false;
	let contract;
	try {
		contract = JSON.parse(check.stdout);
	} catch {
		return false;
	}
	if (!isRecord(contract) || contract.postCoreExecutor !== "stdin-pid-start-v1") return false;
	if (contract.mutationProtocol !== "original-cancellation-v1") throw new Error("Target update worker does not support original cancellation.");
	return true;
}
//#endregion
//#region src/infra/package-update-filesystem.ts
const PACKAGE_MANAGER_SWAP_SOURCE_HARDLINKS = "allow";
const log = createSubsystemLogger("update/package-launchers");
function assertPackagePathIdentity(filePath, expected) {
	let current;
	try {
		current = fs.lstatSync(filePath, {
			bigint: true,
			throwIfNoEntry: false
		});
	} catch (cause) {
		throw new FsSafeError("path-mismatch", `package path could not be verified: ${filePath}`, { cause: cause instanceof Error ? cause : void 0 });
	}
	if (expected ? !current || current.dev !== expected.dev || current.ino !== expected.ino || current.isDirectory() !== expected.isDirectory() || current.isSymbolicLink() !== expected.isSymbolicLink() || process.platform === "win32" && (current.dev === 0n || current.ino === 0n || expected.dev === 0n || expected.ino === 0n) : current !== void 0) throw new FsSafeError("path-mismatch", `package path changed: ${filePath}`);
}
async function packagePathEntryExists(targetPath) {
	try {
		await fs$1.lstat(targetPath);
		return true;
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return false;
		throw error;
	}
}
async function packagePathEntriesMatch(left, right) {
	const [leftStat, rightStat] = await Promise.all([fs$1.lstat(left).catch(() => null), fs$1.lstat(right).catch(() => null)]);
	if (!leftStat || !rightStat) return false;
	if (leftStat.isSymbolicLink() || rightStat.isSymbolicLink()) return leftStat.isSymbolicLink() && rightStat.isSymbolicLink() && await fs$1.readlink(left) === await fs$1.readlink(right);
	if (!leftStat.isFile() || !rightStat.isFile()) return false;
	if ((leftStat.mode & 511) !== (rightStat.mode & 511) || leftStat.size !== rightStat.size) return false;
	const [leftContents, rightContents] = await Promise.all([fs$1.readFile(left), fs$1.readFile(right)]);
	return leftContents.equals(rightContents);
}
async function activateStagedNpmPackageRoot(source, destination, assertCurrent) {
	if (assertCurrent) {
		retainMutationAuthority(assertCurrent)();
		await fs$1.rename(source, destination);
		return;
	}
	if (!(await fs$1.lstat(source)).isSymbolicLink()) {
		await movePathWithCopyFallback({
			from: source,
			sourceHardlinks: PACKAGE_MANAGER_SWAP_SOURCE_HARDLINKS,
			to: destination
		});
		return;
	}
	const canonicalSource = await fs$1.realpath(source);
	await fs$1.symlink(canonicalSource, destination, process.platform === "win32" ? "junction" : void 0);
}
async function backupNpmPackageRoot(source, destination, assertCaller, warnings, platform = process.platform) {
	if (platform !== "win32") {
		await fs$1.rename(source, destination);
		return;
	}
	const assertCurrent = retainMutationAuthority(assertCaller ?? (() => {}));
	const sourceIdentity = fs.lstatSync(source, { bigint: true });
	const parent = path.dirname(source);
	const parentIdentity = fs.lstatSync(parent, { bigint: true });
	let renameFailure;
	let attempts = 0;
	try {
		await retryAsync(async () => {
			renameFailure = void 0;
			assertCurrent();
			assertPackagePathIdentity(parent, parentIdentity);
			assertPackagePathIdentity(source, sourceIdentity);
			assertPackagePathIdentity(destination, void 0);
			attempts++;
			try {
				await fs$1.rename(source, destination);
			} catch (error) {
				renameFailure = error;
				throw error;
			}
		}, {
			attempts: 16,
			minDelayMs: 250,
			maxDelayMs: 5e3,
			shouldRetry: (error) => error === renameFailure && [
				"EPERM",
				"EBUSY",
				"EACCES"
			].some((code) => hasErrnoCode(error, code)),
			onRetry: ({ err, attempt, maxAttempts, delayMs }) => {
				warnings.push(`Windows package backup rename ${source} -> ${destination} failed: ${formatErrorMessage(err)}; retry ${attempt + 1}/${maxAttempts} in ${delayMs}ms.`);
			}
		});
	} catch (error) {
		if (error !== renameFailure) throw error;
		throw Object.assign(new Error(`Windows package backup rename failed after ${attempts} attempts: ${source} -> ${destination}: ${formatErrorMessage(error)}. Close processes holding this installation and check its permissions before retrying.`, { cause: error }), { code: isErrno(error) ? error.code : void 0 });
	}
}
function removePackagePath(target, assertCurrent = () => {}, signal) {
	const assertOwner = retainMutationAuthority(assertCurrent);
	assertOwner();
	if (!fs.lstatSync(target, { throwIfNoEntry: false })) return Promise.resolve();
	return removePathWithinRoot({
		rootDir: path.dirname(target),
		relativePath: path.basename(target),
		recursive: true,
		force: true,
		symlinks: "unlink",
		assertBeforeMutation: assertOwner,
		signal
	});
}
async function copyPackagePathEntry(source, destination, assertCaller = () => {}, beforePublish) {
	const assertCurrent = retainMutationAuthority(assertCaller);
	assertCurrent();
	const sourceIdentity = fs.lstatSync(source, { bigint: true });
	if (sourceIdentity.isDirectory() && beforePublish) throw new Error("Journal-owned launcher publication requires a file or symlink.");
	const destinationParent = await fs$1.realpath(path.dirname(destination));
	assertCurrent();
	const parentIdentity = fs.lstatSync(destinationParent, { bigint: true });
	if (!parentIdentity.isDirectory() || parentIdentity.isSymbolicLink()) throw new FsSafeError("path-mismatch", "package destination parent changed");
	const target = path.join(destinationParent, path.basename(destination));
	let destinationIdentity = fs.lstatSync(target, {
		bigint: true,
		throwIfNoEntry: false
	});
	const assertParent = retainMutationAuthority(() => {
		assertCurrent();
		assertPackagePathIdentity(destinationParent, parentIdentity);
	});
	assertParent();
	const staging = await fs$1.mkdtemp(path.join(destinationParent, ".openclaw-shim-stage-"));
	const stagingIdentity = fs.lstatSync(staging, { bigint: true });
	const staged = path.join(staging, "entry");
	const assertStaging = () => {
		assertParent();
		assertPackagePathIdentity(staging, stagingIdentity);
	};
	let ownershipPreserved = true;
	let failure;
	try {
		const stagedRoot = await root(staging, { assertBeforeMutation: assertStaging });
		assertStaging();
		const copyEntry = async (from, relativePath, identity, assertParents, nested) => {
			const assertEntry = () => {
				assertParents();
				assertPackagePathIdentity(from, identity);
			};
			assertEntry();
			const to = path.join(staging, relativePath);
			if (identity.isDirectory()) {
				await stagedRoot.mkdir(relativePath, { assertBeforeMutation: assertEntry });
				assertEntry();
				const directoryIdentity = fs.lstatSync(to, { bigint: true });
				const assertDirectory = () => {
					assertEntry();
					assertPackagePathIdentity(to, directoryIdentity);
				};
				const names = (await fs$1.readdir(from)).toSorted();
				assertDirectory();
				const children = names.map((name) => ({
					name,
					identity: fs.lstatSync(path.join(from, name), { bigint: true })
				}));
				for (const child of children) await copyEntry(path.join(from, child.name), path.join(relativePath, child.name), child.identity, assertDirectory, true);
				assertDirectory();
				await fs$1.chmod(to, Number(identity.mode));
			} else if (identity.isSymbolicLink()) {
				let linkTarget = await fs$1.readlink(from);
				assertEntry();
				if (nested && !path.isAbsolute(linkTarget)) linkTarget = path.resolve(path.dirname(from), linkTarget);
				await fs$1.symlink(linkTarget, to);
				assertEntry();
				const linkIdentity = fs.lstatSync(to, { bigint: true });
				const assertLink = () => {
					assertEntry();
					assertPackagePathIdentity(to, linkIdentity);
				};
				if (nested) {
					if (process.platform === "darwin") {
						assertLink();
						await fs$1.lchmod(to, Number(identity.mode));
						assertLink();
					}
				} else for (const [field, preserve] of [["ownership", () => fs$1.lchown(to, Number(identity.uid), Number(identity.gid))], ...process.platform === "darwin" ? [["mode", () => fs$1.lchmod(to, Number(identity.mode))]] : []]) {
					assertLink();
					try {
						await preserve();
					} catch (error) {
						assertLink();
						if (![
							"EPERM",
							"EACCES",
							"ENOSYS",
							"ENOTSUP",
							"EOPNOTSUPP"
						].some((code) => hasErrnoCode(error, code))) throw error;
						ownershipPreserved &&= field !== "ownership";
						log.warn(`Could not preserve launcher symlink ${field} from ${source}; continuing with the copied link`);
					}
					assertLink();
				}
			} else if (identity.isFile()) await stagedRoot.copyIn(relativePath, from, {
				assertBeforeMutation: assertEntry,
				sourceHardlinks: PACKAGE_MANAGER_SWAP_SOURCE_HARDLINKS,
				preserveSourceMode: true,
				mkdir: false,
				durable: !beforePublish
			});
			else throw new Error(`Unsupported package entry: ${from}`);
			assertEntry();
		};
		await copyEntry(source, "entry", sourceIdentity, assertStaging, false);
		assertStaging();
		const stagedIdentity = fs.lstatSync(staged, { bigint: true });
		if (beforePublish && sourceIdentity.isFile()) {
			const opened = await stagedRoot.open("entry");
			try {
				assertStaging();
				assertPackagePathIdentity(staged, stagedIdentity);
				const openedIdentity = fs.fstatSync(opened.handle.fd, { bigint: true });
				if (openedIdentity.dev !== stagedIdentity.dev || openedIdentity.ino !== stagedIdentity.ino) throw new FsSafeError("path-mismatch", "staged package launcher changed before sync");
				await opened.handle.sync();
				assertStaging();
				assertPackagePathIdentity(staged, stagedIdentity);
			} finally {
				await opened.handle.close();
			}
		}
		assertPackagePathIdentity(target, destinationIdentity);
		if (sourceIdentity.isDirectory()) {
			await removePackagePath(target, retainMutationAuthority(() => {
				assertStaging();
				if (fs.lstatSync(target, { throwIfNoEntry: false })) assertPackagePathIdentity(target, destinationIdentity);
			}));
			destinationIdentity = void 0;
		}
		assertStaging();
		assertPackagePathIdentity(staged, stagedIdentity);
		assertPackagePathIdentity(target, destinationIdentity);
		if (beforePublish) {
			requireDirectorySync(await syncDirectory(staging), "Staged package launcher");
			assertStaging();
			assertPackagePathIdentity(staged, stagedIdentity);
			assertPackagePathIdentity(target, destinationIdentity);
		}
		beforePublish?.(staged);
		assertStaging();
		assertPackagePathIdentity(staged, stagedIdentity);
		assertPackagePathIdentity(target, destinationIdentity);
		await fs$1.rename(staged, target);
		assertParent();
		if (beforePublish) for (const directory of [staging, destinationParent]) {
			assertStaging();
			assertPackagePathIdentity(target, stagedIdentity);
			requireDirectorySync(await syncDirectory(directory), "Package launcher publication");
			assertStaging();
			assertPackagePathIdentity(target, stagedIdentity);
		}
	} catch (error) {
		failure = { error };
	} finally {
		try {
			await removePackagePath(staging, () => {
				assertPackagePathIdentity(destinationParent, parentIdentity);
				if (fs.lstatSync(staging, { throwIfNoEntry: false })) assertPackagePathIdentity(staging, stagingIdentity);
			});
		} catch (error) {
			failure ??= { error };
		}
	}
	if (failure) throw failure.error;
	return { ownershipPreserved };
}
/** Publish partial backup state so the swap owner can recover after any failed copy. */
async function capturePackageLaunchers(snapshot, params, targetLayout, reader) {
	const native = params.stage.native;
	await fs$1.mkdir(targetLayout.globalRoot, { recursive: true });
	const shimNames = /* @__PURE__ */ new Set([params.packageName, "openclaw"]);
	const shimEntries = params.installTarget.directNodeModulesRoot === true ? [] : (await (native ? fs$1.readdir(params.stage.layout.binDir) : reader.entries(params.stage.layout.binDir)).catch((error) => {
		if (hasErrnoCode(error, "ENOENT")) return [];
		throw error;
	})).filter((entry) => shimNames.has(entry) || shimNames.has(path.parse(entry).name)).toSorted();
	if (shimEntries.length > 0) {
		snapshot.backupDir = await fs$1.mkdtemp(path.join(targetLayout.globalRoot, ".openclaw.shim-backup-"));
		await fs$1.mkdir(targetLayout.binDir, { recursive: true });
		for (const entry of shimEntries) {
			const destination = path.join(targetLayout.binDir, entry);
			const backup = await (native ? packagePathEntryExists(destination) : reader.exists(destination)) ? path.join(snapshot.backupDir, entry) : null;
			let fingerprint = backup && !native ? await reader.launcher(destination) : void 0;
			if (backup) {
				const copied = await copyPackagePathEntry(destination, backup);
				if (fingerprint) {
					snapshot.failedCopy = backup;
					const actual = await reader.launcher(backup);
					const differences = packageLauncherDifferences(fingerprint, actual, copied.ownershipPreserved);
					if (differences.length > 0) throw new Error(`Package rollback launcher backup changed: ${destination}; differing fields: ${differences.join(", ")}`);
					snapshot.failedCopy = void 0;
					fingerprint = actual;
				}
			}
			snapshot.entries.push({
				source: path.join(params.stage.layout.binDir, entry),
				destination,
				backup,
				fingerprint
			});
		}
	}
}
/** The caller verifies recovery material before this exact-object publication. */
async function restoreNpmPackageRoot(params) {
	const assertCurrent = retainMutationAuthority(params.assertCurrent ?? (() => {}));
	if (params.candidatePresent) {
		assertCurrent();
		await fs$1.rename(params.liveRoot, params.displacedRoot);
	}
	try {
		assertCurrent();
		await fs$1.rename(params.backupRoot, params.liveRoot);
	} catch (error) {
		assertCurrent();
		if (params.candidatePresent) await fs$1.rename(params.displacedRoot, params.liveRoot);
		throw error;
	}
}
/** Retire only obsolete backups after restoration or verified activation. */
async function discardPackageUpdateBackup(backupPath, label, globalRoot, assertCaller = () => {}, cleanupDeadlineAtMs = performance.now() + UPDATE_CLEANUP_BUDGET_MS) {
	const assertCurrent = retainMutationAuthority(assertCaller);
	assertCurrent();
	const backupIdentity = fs.lstatSync(backupPath, {
		bigint: true,
		throwIfNoEntry: false
	});
	if (!backupIdentity) return null;
	const backupParent = fs.realpathSync(path.dirname(backupPath));
	const retiredParent = fs.realpathSync(globalRoot);
	const parents = [backupParent, retiredParent].map((directory) => ({
		directory,
		identity: fs.lstatSync(directory, { bigint: true })
	}));
	const backup = path.join(backupParent, path.basename(backupPath));
	const assertParents = retainMutationAuthority(() => {
		assertCurrent();
		for (const { directory, identity } of parents) assertPackagePathIdentity(directory, identity);
	});
	const assertBackup = retainMutationAuthority(() => {
		assertParents();
		if (fs.lstatSync(backup, { throwIfNoEntry: false })) assertPackagePathIdentity(backup, backupIdentity);
	});
	const cleanupExpired = /* @__PURE__ */ new Error("Obsolete backup cleanup budget expired");
	const cleanup = new AbortController();
	try {
		await removePackagePath(backup, () => {
			assertBackup();
			if (performance.now() >= cleanupDeadlineAtMs) cleanup.abort(cleanupExpired);
		}, cleanup.signal);
		return null;
	} catch (error) {
		assertBackup();
		if (error !== cleanupExpired && !isRemovalIoError(error)) throw error;
		const expiredMessage = `cleanup budget expired after ${UPDATE_CLEANUP_BUDGET_MS}ms; preserved ${label} at ${backupPath} for delayed cleanup${error === cleanupExpired ? "" : `; ${formatErrorMessage(error)}`}`;
		if (error === cleanupExpired || performance.now() >= cleanupDeadlineAtMs) return fs.lstatSync(backup, { throwIfNoEntry: false }) ? expiredMessage : null;
		const retiredPath = path.join(retiredParent, path.basename(backupPath).replace(/^\.openclaw\./, ".openclaw-"));
		try {
			assertBackup();
			assertPackagePathIdentity(backup, backupIdentity);
			assertPackagePathIdentity(retiredPath, void 0);
			if (performance.now() >= cleanupDeadlineAtMs) return expiredMessage;
			await fs$1.rename(backup, retiredPath);
			assertParents();
			assertPackagePathIdentity(retiredPath, backupIdentity);
			return `preserved ${label} at ${retiredPath} for delayed cleanup`;
		} catch (retirementError) {
			assertBackup();
			assertPackagePathIdentity(backup, backupIdentity);
			if (!isRemovalIoError(retirementError)) throw retirementError;
			return `preserved ${label} at ${backupPath}; remove it manually after verifying the installation`;
		}
	}
}
async function discardPackageLauncherBackup(snapshot, globalRoot, assertCurrent, cleanupDeadlineAtMs) {
	if (snapshot.failedCopy) return `failed copy retained at ${snapshot.failedCopy}; inspect it before retrying`;
	return snapshot.backupDir ? await discardPackageUpdateBackup(snapshot.backupDir, "shim backup", globalRoot, assertCurrent, cleanupDeadlineAtMs) : null;
}
async function removePackageUpdatePath(targetPath) {
	try {
		await removePackagePath(targetPath);
		return true;
	} catch {
		return false;
	}
}
//#endregion
//#region src/infra/package-update-activation-paths.ts
function resolvePackageActivationAnchor(installKey) {
	const key = createHash("sha256").update(installKey).digest("hex").slice(0, 24);
	return path.join(path.dirname(installKey), `.openclaw.package-activation-${key}`);
}
function resolvePackageActivationControl(anchor) {
	return `${anchor}.control`;
}
function resolvePackageActivationJournalPath(anchor) {
	return path.join(resolvePackageActivationControl(anchor), "operation.sqlite");
}
function resolvePackageActivationHelper(anchor) {
	return path.join(resolvePackageActivationControl(anchor), "recovery.mjs");
}
function packageActivationIdentity(file, directory) {
	const stat = fs.lstatSync(file, { bigint: true });
	if (stat.ino === 0n || !(directory === "launcher" ? stat.isSymbolicLink() || stat.isFile() : directory ? stat.isDirectory() && !stat.isSymbolicLink() : stat.isFile()) || process.getuid && stat.uid !== BigInt(process.getuid())) throw new Error("Package publication object has an unsafe identity");
	return `${stat.dev}:${stat.ino}`;
}
function privatePackageActivationIdentity(file, directory) {
	const value = packageActivationIdentity(file, directory);
	const stat = fs.lstatSync(file);
	if ((stat.mode & 63) !== 0 || !directory && stat.nlink !== 1) throw new Error("Package publication recovery permissions are unsafe");
	return value;
}
function assertPackageActivationLayout(anchor) {
	if ([
		path.join(anchor, "operation.sqlite"),
		`${anchor}.sqlite`,
		`${anchor}.recovery.mjs`
	].some((file) => fs.lstatSync(file, { throwIfNoEntry: false }))) throw new Error("Legacy package activation artifacts require their original recovery owner; no migration is performed.");
}
/** A receipt is a read-only completion fact, never a grant for another effect. */
function isPackageActivationComplete(anchor, record) {
	if (record.phase !== "anchor-retired" || record.intent?.kind !== "unlink-helper") return false;
	if (record.intent.identity !== record.descriptor.helperIdentity) throw new Error("Final helper unlink identity is invalid.");
	for (const file of [anchor, resolvePackageActivationHelper(anchor)]) try {
		fs.lstatSync(file);
		return false;
	} catch (error) {
		if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
	}
	return true;
}
//#endregion
//#region src/infra/package-update-activation-schema.ts
const absolutePath = string().min(1).max(4096).refine((value) => path.resolve(value) === value);
const packageActivationIdentitySchema = string().regex(/^\d+:\d+$/u);
const fingerprint = strictObject({
	digest: string().regex(/^[a-f0-9]{64}$/u),
	identity: packageActivationIdentitySchema,
	version: string().min(1).max(256)
});
const basename$1 = string().min(1).max(255).refine((value) => value !== "." && value !== ".." && !/[\\/\0]/u.test(value));
const transferName = _enum([
	"anchor",
	"helper",
	"candidate",
	"launchers",
	"previous-launchers"
]);
const PackageActivationDescriptorSchema = strictObject({
	layout: literal("external-helper"),
	version: literal(1),
	operationId: uuid(),
	recoveryNodePath: absolutePath,
	authority: strictObject({
		databasePath: absolutePath,
		databaseIdentity: packageActivationIdentitySchema,
		parentIdentity: packageActivationIdentitySchema,
		installKey: absolutePath,
		owner: string().min(1).max(4096)
	}),
	anchorIdentity: packageActivationIdentitySchema,
	journalIdentity: packageActivationIdentitySchema,
	journalParentIdentity: packageActivationIdentitySchema,
	parentIdentity: packageActivationIdentitySchema,
	binDir: absolutePath,
	binIdentity: packageActivationIdentitySchema,
	originalStageRoot: absolutePath,
	previous: fingerprint,
	candidate: fingerprint,
	launcherRootIdentity: packageActivationIdentitySchema,
	previousLauncherRootIdentity: packageActivationIdentitySchema.nullable(),
	helperIdentity: packageActivationIdentitySchema,
	preparation: array(strictObject({
		name: transferName,
		source: absolutePath,
		sourceParentIdentity: packageActivationIdentitySchema,
		identity: packageActivationIdentitySchema
	})).min(4).max(5),
	helperDigest: string().regex(/^[a-f0-9]{64}$/u),
	launchers: array(strictObject({
		name: basename$1,
		previous: string().max(4096).nullable(),
		candidate: string().max(4096),
		previousIdentity: packageActivationIdentitySchema.nullable(),
		candidateIdentity: packageActivationIdentitySchema
	})).max(64)
});
const PackageActivationPhaseSchema = _enum([
	"preparing",
	"prepared",
	"publishing",
	"publication-complete",
	"rollback-in-progress",
	"rolled-back",
	"aborted",
	"retiring",
	"anchor-retired"
]);
const intentSchema = union([
	strictObject({
		kind: literal("prepare"),
		completed: array(transferName).max(5),
		moving: transferName.nullable()
	}),
	strictObject({
		kind: _enum(["remove-anchor", "unlink-helper"]),
		identity: packageActivationIdentitySchema,
		selected: _enum(["previous", "candidate"])
	}),
	strictObject({ kind: _enum(["displace", "publish"]) }),
	strictObject({
		kind: literal("launcher"),
		name: basename$1,
		identity: packageActivationIdentitySchema
	}),
	strictObject({
		kind: literal("retire"),
		selected: _enum(["previous", "candidate"])
	}),
	strictObject({
		kind: literal("remove"),
		name: _enum([
			"previous",
			"candidate",
			"previous.candidate",
			"launchers",
			"previous-launchers"
		]),
		identity: packageActivationIdentitySchema,
		selected: _enum(["previous", "candidate"])
	})
]).nullable();
//#endregion
//#region src/infra/package-update-activation-snapshot.ts
/** Keep recovery scratch attached to its original journal/control authority.
* The callback must recheck the supplied guard after awaited transport, before
* opening the result. Cleanup never adopts a successor directory or parent. */
async function withPackageRecoverySnapshot(control, assertCurrent, read) {
	const assertOwner = retainMutationAuthority(assertCurrent);
	assertOwner();
	const directory = fs.mkdtempSync(path.join(control, ".recovery-snapshot-"));
	const original = fs.lstatSync(directory, { bigint: true });
	const assertSnapshot = (allowMissing = false) => {
		assertOwner();
		const current = fs.lstatSync(directory, {
			bigint: true,
			throwIfNoEntry: false
		});
		if (!current && !allowMissing || current && (!current.isDirectory() || current.isSymbolicLink() || (current.mode & 63n) !== 0n || current.dev !== original.dev || current.ino !== original.ino)) throw new Error("Package recovery snapshot directory changed.");
	};
	let outcome;
	try {
		assertSnapshot();
		const value = await read(path.join(directory, "operation.sqlite"), assertSnapshot);
		assertSnapshot();
		outcome = { value };
	} catch (error) {
		outcome = { error };
	}
	let cleanupFailure;
	try {
		await removePathWithinRoot({
			rootDir: control,
			relativePath: path.basename(directory),
			recursive: true,
			force: true,
			assertBeforeMutation: () => assertSnapshot(true)
		});
	} catch (error) {
		cleanupFailure = { error };
	}
	if (cleanupFailure) {
		if ("error" in outcome) throw new AggregateError([outcome.error, cleanupFailure.error], "Recovery snapshot and owned cleanup failed.", { cause: outcome.error });
		throw cleanupFailure.error;
	}
	if ("error" in outcome) throw outcome.error;
	return outcome.value;
}
//#endregion
//#region src/infra/package-update-activation-launcher.ts
/** Keep the journal's version-1 launcher encoding while the live reader exposes metadata. */
function encodePackageActivationLauncher(value) {
	return JSON.stringify([
		value.type,
		value.mode,
		value.uid,
		value.gid,
		value.contents
	]);
}
//#endregion
//#region src/infra/package-update-activation-status.ts
/** Released in-anchor journals remain inspection-only; their helper owns recovery. */
function readReleasedPackageActivationReceipt(installKey) {
	const anchor = resolvePackageActivationAnchor(installKey);
	const journal = path.join(anchor, "operation.sqlite");
	if (!fs.lstatSync(journal, { throwIfNoEntry: false })) return;
	const anchorIdentity = privatePackageActivationIdentity(anchor, true);
	const journalIdentity = privatePackageActivationIdentity(journal, false);
	const parentIdentity = packageActivationIdentity(path.dirname(anchor), true);
	const assertIdentity = () => {
		if (privatePackageActivationIdentity(anchor, true) !== anchorIdentity || privatePackageActivationIdentity(journal, false) !== journalIdentity || packageActivationIdentity(path.dirname(anchor), true) !== parentIdentity || fs.realpathSync(anchor) !== anchor) throw new Error("Released package activation journal identity changed.");
	};
	const query = (db) => getNodeSqliteKysely(db).selectFrom("package_activation");
	return withExistingSqliteRollbackDatabase(journal, {
		write: false,
		busyTimeoutMs: 0,
		assertIdentity,
		validate: (db) => {
			executeSqliteQuerySync(db, query(db).select([
				"slot",
				"phase",
				"descriptor_json"
			]).limit(0));
		}
	}, (db) => {
		const rows = executeSqliteQuerySync(db, query(db).select(["slot", "phase"]).select((eb) => eb.case().when(eb.fn("length", [eb.cast("descriptor_json", "blob")]), "<=", 1048576).then(eb.ref("descriptor_json")).else(null).end().as("descriptor_json")).limit(2)).rows;
		const row = rows[0];
		if (rows.length !== 1 || row?.slot !== 1 || row.descriptor_json === null) throw new Error("Released package activation journal must contain one bounded operation.");
		const descriptor = object({
			version: literal(1),
			layout: never().optional(),
			operationId: uuid(),
			authority: object({ installKey: string() }),
			anchorIdentity: literal(anchorIdentity),
			journalIdentity: literal(journalIdentity),
			parentIdentity: literal(parentIdentity)
		}).parse(JSON.parse(row.descriptor_json));
		if (descriptor.authority.installKey !== installKey) throw new Error("Released package activation journal does not match its installation.");
		return {
			phase: _enum([
				"prepared",
				"publishing",
				"publication-complete",
				"rollback-in-progress",
				"rolled-back",
				"aborted",
				"retiring",
				"retired"
			]).parse(row.phase),
			operationId: descriptor.operationId,
			installKey,
			recoveryCommand: `node ${quoteCliArg(path.join(anchor, "recovery.mjs"))} status`
		};
	});
}
function readPackageActivationRecordStatus(record) {
	return {
		phase: isPackageActivationComplete(resolvePackageActivationAnchor(record.descriptor.authority.installKey), record) ? "complete" : record.phase,
		operationId: record.descriptor.operationId,
		installKey: record.descriptor.authority.installKey
	};
}
//#endregion
//#region src/infra/package-update-activation-journal.ts
const PACKAGE_ACTIVATION_JOURNAL = "operation.sqlite";
const MAX_PACKAGE_ACTIVATION_DESCRIPTOR_BYTES = 1048576;
const queries = (db) => getNodeSqliteKysely(db);
function descriptorJson(descriptor) {
	const encoded = JSON.stringify(PackageActivationDescriptorSchema.parse(descriptor));
	if (Buffer.byteLength(encoded) > MAX_PACKAGE_ACTIVATION_DESCRIPTOR_BYTES) throw new Error("Package publication descriptor exceeds 1 MiB");
	return encoded;
}
/** An existing operation is never bootstrapped, migrated, or repaired on open. */
function openPackageActivationJournal(anchor) {
	assertPackageActivationLayout(anchor);
	const journalPath = resolvePackageActivationJournalPath(anchor);
	const parent = path.dirname(anchor);
	const parentIdentity = packageActivationIdentity(parent, true);
	const control = resolvePackageActivationControl(anchor);
	const journalParentIdentity = privatePackageActivationIdentity(control, true);
	const journalIdentity = privatePackageActivationIdentity(journalPath, false);
	const assertFiles = () => {
		if (packageActivationIdentity(parent, true) !== parentIdentity || privatePackageActivationIdentity(control, true) !== journalParentIdentity || privatePackageActivationIdentity(journalPath, false) !== journalIdentity || fs.realpathSync(control) !== control) throw new Error("Package publication journal identity changed");
	};
	const withDatabase = (write, operation) => withExistingSqliteRollbackDatabase(journalPath, {
		write,
		busyTimeoutMs: 0,
		assertIdentity: assertFiles,
		validate: (db) => {
			executeSqliteQuerySync(db, queries(db).selectFrom("package_activation").selectAll().limit(0));
		}
	}, (db, transact) => {
		if (write) db.exec("PRAGMA synchronous = EXTRA");
		return operation(db, transact);
	});
	const decode = (row) => {
		if (!row || row.slot !== 1 || !Number.isSafeInteger(row.revision) || row.revision < 0 || Buffer.byteLength(row.descriptor_json) > MAX_PACKAGE_ACTIVATION_DESCRIPTOR_BYTES) throw new Error("Package publication journal is missing or invalid");
		const descriptor = PackageActivationDescriptorSchema.parse(JSON.parse(row.descriptor_json));
		if (descriptor.parentIdentity !== parentIdentity || descriptor.journalParentIdentity !== journalParentIdentity || descriptor.journalIdentity !== journalIdentity || resolvePackageActivationAnchor(descriptor.authority.installKey) !== anchor || descriptor.parentIdentity !== packageActivationIdentity(path.dirname(anchor), true) || new Set(descriptor.launchers.map((entry) => entry.name)).size !== descriptor.launchers.length) throw new Error("Package publication journal does not match its installation");
		const expectedTransfers = /* @__PURE__ */ new Map([
			["anchor", descriptor.anchorIdentity],
			["helper", descriptor.helperIdentity],
			["candidate", descriptor.candidate.identity],
			["launchers", descriptor.launcherRootIdentity]
		]);
		if (descriptor.previousLauncherRootIdentity) expectedTransfers.set("previous-launchers", descriptor.previousLauncherRootIdentity);
		if (descriptor.preparation.length !== expectedTransfers.size || new Set(descriptor.preparation.map((entry) => entry.name)).size !== expectedTransfers.size || descriptor.preparation.some((entry) => expectedTransfers.get(entry.name) !== entry.identity) || descriptor.preparation.find((entry) => entry.name === "candidate")?.source !== descriptor.originalStageRoot) throw new Error("Preparation custody does not match the recorded objects.");
		const publications = array(strictObject({
			name: basename$1,
			identity: packageActivationIdentitySchema
		})).max(64).parse(JSON.parse(row.publications_json));
		const intent = intentSchema.parse(JSON.parse(row.intent_json));
		const names = new Set(descriptor.launchers.map((entry) => entry.name));
		if (new Set(publications.map((entry) => entry.name)).size !== publications.length || publications.some((entry) => !names.has(entry.name)) || intent?.kind === "launcher" && !names.has(intent.name)) throw new Error("Package publication intent names an unknown launcher.");
		return {
			revision: row.revision,
			phase: PackageActivationPhaseSchema.parse(row.phase),
			intent,
			descriptor,
			publications
		};
	};
	const readRow = (db) => {
		const sizes = executeSqliteQuerySync(db, queries(db).selectFrom("package_activation").select((eb) => [
			"slot",
			eb.fn("length", [eb.cast("descriptor_json", "blob")]).as("descriptor_bytes"),
			eb.fn("length", [eb.cast("intent_json", "blob")]).as("intent_bytes"),
			eb.fn("length", [eb.cast("publications_json", "blob")]).as("publications_bytes")
		]).limit(2)).rows;
		const size = sizes[0];
		if (sizes.length !== 1 || !size || size.slot !== 1 || [
			size.descriptor_bytes,
			size.intent_bytes,
			size.publications_bytes
		].some((bytes) => bytes > MAX_PACKAGE_ACTIVATION_DESCRIPTOR_BYTES)) throw new Error("Package publication journal must contain one bounded operation.");
		const rows = executeSqliteQuerySync(db, queries(db).selectFrom("package_activation").selectAll().limit(2)).rows;
		if (rows.length !== 1) throw new Error("Package publication journal must contain exactly one operation.");
		return rows[0];
	};
	const read = () => withDatabase(false, (db) => decode(readRow(db)));
	const assertRecord = (expected, actual) => {
		if (JSON.stringify(expected) !== JSON.stringify(actual)) throw new Error("Package publication intent is no longer current");
	};
	const transition = (expected, phase, intent, assertCurrent, publications = expected.publications) => {
		const descriptorJsonValue = descriptorJson(expected.descriptor);
		const intentJson = JSON.stringify(intentSchema.parse(intent));
		PackageActivationPhaseSchema.parse(phase);
		assertCurrent();
		return withDatabase(true, (db, transact) => transact(() => {
			assertFiles();
			assertCurrent();
			assertRecord(expected, decode(readRow(db)));
			executeSqliteQuerySync(db, queries(db).updateTable("package_activation").set({
				revision: expected.revision + 1,
				phase,
				descriptor_json: descriptorJsonValue,
				intent_json: intentJson,
				publications_json: JSON.stringify(publications)
			}).where("slot", "=", 1).where("revision", "=", expected.revision));
			return decode(readRow(db));
		}, { withCommit: (commit) => {
			assertFiles();
			assertCurrent();
			commit();
		} }));
	};
	return {
		read,
		async readForRecovery() {
			const fileFingerprint = (file) => {
				const stat = fs.lstatSync(file, {
					bigint: true,
					throwIfNoEntry: false
				});
				if (!stat) return null;
				if (!stat.isFile() || stat.nlink !== 1n || (stat.mode & 63n) !== 0n) throw new Error("Package publication journal sidecar is unsafe");
				return `${stat.dev}:${stat.ino}:${stat.ctimeNs}:${stat.mtimeNs}:${stat.size}`;
			};
			assertFiles();
			const files = [
				journalPath,
				`${journalPath}-journal`,
				`${journalPath}-wal`,
				`${journalPath}-shm`
			];
			const identities = files.map(fileFingerprint);
			const assertUnchanged = () => {
				assertFiles();
				if (files.some((file, index) => fileFingerprint(file) !== identities[index])) throw new Error("Package publication recovery journal changed");
			};
			let record;
			let hot = false;
			try {
				record = read();
			} catch (error) {
				if (!(error instanceof Error && "errcode" in error && error.errcode === 776)) throw error;
				hot = true;
				assertUnchanged();
				record = await withPackageRecoverySnapshot(control, assertFiles, async (targetPath, assertSnapshot) => {
					await createVerifiedSqliteSnapshot({
						sourcePath: journalPath,
						targetPath,
						preserveRowIds: true,
						validate: (database) => {
							decode(readRow(database));
						}
					});
					assertSnapshot();
					const snapshot = openNodeSqliteDatabase(targetPath, { readOnly: true });
					try {
						return decode(readRow(snapshot));
					} finally {
						snapshot.close();
					}
				});
			}
			assertUnchanged();
			return {
				record,
				assertUnchanged,
				admit(assertFence) {
					assertUnchanged();
					assertFence();
					if (!hot) {
						assertRecord(record, read());
						return;
					}
					const database = openNodeSqliteDatabase(resolveExistingSqliteFileUri(journalPath));
					try {
						assertFiles();
						assertFence();
						const mode = database.prepare("PRAGMA journal_mode").get()?.journal_mode;
						if (![
							"delete",
							"truncate",
							"persist"
						].includes(String(mode))) throw new Error("Package publication recovery requires rollback journal mode");
						assertRecord(record, decode(readRow(database)));
					} finally {
						database.close();
					}
				}
			};
		},
		replaceCompleted(expected, descriptor, assertCurrent) {
			const encoded = descriptorJson({
				...descriptor,
				journalIdentity
			});
			return withDatabase(true, (db, transact) => transact(() => {
				assertFiles();
				assertCurrent();
				const previous = decode(readRow(db));
				assertRecord(expected, previous);
				if (!isPackageActivationComplete(anchor, previous) || descriptor.journalParentIdentity !== journalParentIdentity || packageActivationIdentity(preparationSource(descriptor, "anchor"), true) !== descriptor.anchorIdentity || packageActivationIdentity(preparationSource(descriptor, "helper"), false) !== descriptor.helperIdentity || previous.descriptor.authority.databasePath !== descriptor.authority.databasePath || previous.descriptor.authority.databaseIdentity !== descriptor.authority.databaseIdentity || previous.descriptor.authority.parentIdentity !== descriptor.authority.parentIdentity) throw new Error("The previous package receipt is not safely replaceable.");
				executeSqliteQuerySync(db, queries(db).updateTable("package_activation").set({
					revision: previous.revision + 1,
					phase: "preparing",
					descriptor_json: encoded,
					intent_json: JSON.stringify({
						kind: "prepare",
						completed: [],
						moving: null
					}),
					publications_json: "[]"
				}).where("slot", "=", 1).where("revision", "=", previous.revision));
			}, { withCommit: (commit) => {
				assertFiles();
				assertCurrent();
				commit();
			} }));
		},
		assertCurrent(expected) {
			assertRecord(expected, read());
		},
		transition
	};
}
function preparationSource(descriptor, name) {
	const source = descriptor.preparation.find((entry) => entry.name === name)?.source;
	if (!source) throw new Error("Package preparation bootstrap custody is missing.");
	return source;
}
/** Only the original admitted producer may create the one-operation database. */
function createPackageActivationJournal(anchor, descriptor, stagedControl, assertCurrent, onCustody) {
	const control = resolvePackageActivationControl(anchor);
	const journalPath = path.join(stagedControl, PACKAGE_ACTIVATION_JOURNAL);
	const helperPath = path.join(stagedControl, "recovery.mjs");
	const assertAnchor = () => {
		assertCurrent();
		assertPackageActivationLayout(anchor);
		if (privatePackageActivationIdentity(preparationSource(descriptor, "anchor"), true) !== descriptor.anchorIdentity || packageActivationIdentity(path.dirname(anchor), true) !== descriptor.parentIdentity || fs.realpathSync(path.dirname(anchor)) !== path.dirname(anchor) || privatePackageActivationIdentity(stagedControl, true) !== descriptor.journalParentIdentity || fs.realpathSync(stagedControl) !== stagedControl || descriptor.journalParentIdentity.split(":")[0] !== descriptor.parentIdentity.split(":")[0] || preparationSource(descriptor, "helper") !== resolvePackageActivationHelper(anchor) || descriptor.preparation.find((entry) => entry.name === "helper")?.sourceParentIdentity !== descriptor.journalParentIdentity || privatePackageActivationIdentity(helperPath, false) !== descriptor.helperIdentity || createHash("sha256").update(fs.readFileSync(helperPath)).digest("hex") !== descriptor.helperDigest || packageActivationIdentity(descriptor.authority.installKey, true) !== descriptor.previous.identity || packageActivationIdentity(descriptor.originalStageRoot, true) !== descriptor.candidate.identity || fs.lstatSync(anchor, { throwIfNoEntry: false }) || fs.lstatSync(control, { throwIfNoEntry: false })) throw new Error("Package publication journal identity changed");
	};
	assertAnchor();
	descriptorJson({
		...descriptor,
		journalIdentity: "0:0"
	});
	let journalIdentity;
	let initial;
	const assertCreated = () => {
		assertAnchor();
		if (privatePackageActivationIdentity(journalPath, false) !== journalIdentity) throw new Error("Package publication journal identity changed");
	};
	const fd = fs.openSync(journalPath, "wx", 384);
	try {
		const created = fs.fstatSync(fd, { bigint: true });
		journalIdentity = `${created.dev}:${created.ino}`;
		initial = {
			slot: 1,
			revision: 0,
			phase: "preparing",
			descriptor_json: descriptorJson({
				...descriptor,
				journalIdentity
			}),
			intent_json: JSON.stringify({
				kind: "prepare",
				completed: ["helper"],
				moving: null
			}),
			publications_json: "[]"
		};
		assertCreated();
		const db = openNodeSqliteDatabase(resolveExistingSqliteFileUri(journalPath));
		try {
			assertCreated();
			executeSqliteQuerySync(db, queries(db).schema.createTable("package_activation").addColumn("slot", "integer", (column) => column.primaryKey().notNull()).addColumn("revision", "integer", (column) => column.notNull()).addColumn("phase", "text", (column) => column.notNull()).addColumn("descriptor_json", "text", (column) => column.notNull()).addColumn("intent_json", "text", (column) => column.notNull()).addColumn("publications_json", "text", (column) => column.notNull()).modifyEnd(sql`STRICT`));
			assertCreated();
			executeSqliteQuerySync(db, queries(db).insertInto("package_activation").values(initial));
		} finally {
			if (db.isOpen) db.close();
		}
	} finally {
		fs.closeSync(fd);
	}
	const assertReady = () => {
		assertCreated();
		if (!isDeepStrictEqual(fs.readdirSync(stagedControl).toSorted(), [PACKAGE_ACTIVATION_JOURNAL, "recovery.mjs"])) throw new Error("Private package control contains unknown objects.");
	};
	const verifyPrivate = () => withExistingSqliteRollbackDatabase(journalPath, {
		write: false,
		busyTimeoutMs: 0,
		assertIdentity: assertReady,
		validate: () => {}
	}, (db) => {
		const rows = executeSqliteQuerySync(db, queries(db).selectFrom("package_activation").selectAll().limit(2)).rows;
		if (rows.length !== 1 || !isDeepStrictEqual({ ...rows[0] }, initial)) throw new Error("Private package publication journal is incomplete.");
	});
	verifyPrivate();
	requireDirectorySync(syncDirectorySync(stagedControl), "Private package control");
	onCustody?.(true);
	try {
		assertReady();
		fs.renameSync(stagedControl, control);
		for (const directory of /* @__PURE__ */ new Set([path.dirname(stagedControl), path.dirname(control)])) {
			assertCurrent();
			requireDirectorySync(syncDirectorySync(directory), "Package control publication");
		}
	} catch (error) {
		try {
			if (!fs.lstatSync(control, { throwIfNoEntry: false })) {
				verifyPrivate();
				onCustody?.(false);
			}
		} catch {}
		throw error;
	}
	const journal = openPackageActivationJournal(anchor);
	if (descriptorJson(journal.read().descriptor) !== initial.descriptor_json) throw new Error("Published package control identity changed.");
	assertCurrent();
	return journal;
}
//#endregion
//#region src/infra/package-update-activation-custody.ts
function packageActivationIdentityOrAbsent(file, directory) {
	try {
		return packageActivationIdentity(file, directory);
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return null;
		throw error;
	}
}
function inspectPackageActivationCustody(anchor, record) {
	if (record.phase !== "preparing" || record.intent?.kind !== "prepare") throw new Error("Package preparation requires its recorded transfer intent.");
	const intent = record.intent;
	const descriptor = record.descriptor;
	if (new Set(intent.completed).size !== intent.completed.length || intent.completed.some((name) => !descriptor.preparation.some((entry) => entry.name === name)) || intent.moving !== null && intent.completed.includes(intent.moving)) throw new Error("Package preparation custody is invalid.");
	return descriptor.preparation.map((entry) => {
		const destination = entry.name === "anchor" ? anchor : entry.name === "helper" ? resolvePackageActivationHelper(anchor) : path.join(anchor, entry.name);
		if (entry.source === descriptor.authority.installKey || entry.source.startsWith(`${anchor}${path.sep}`) || fs.realpathSync(path.dirname(entry.source)) !== path.dirname(entry.source) || packageActivationIdentity(path.dirname(entry.source), true) !== entry.sourceParentIdentity) throw new Error("Package preparation source parent changed.");
		const source = packageActivationIdentityOrAbsent(entry.source, entry.name !== "helper");
		const target = packageActivationIdentityOrAbsent(destination, entry.name !== "helper");
		const resident = entry.name === "helper" && entry.source === destination;
		if (resident && (entry.sourceParentIdentity !== descriptor.journalParentIdentity || !intent.completed.includes("helper") || intent.moving === "helper" || source !== entry.identity)) throw new Error("Resident package helper custody is invalid.");
		const moved = resident || source === null && target === entry.identity;
		if (moved) {
			if (!intent.completed.includes(entry.name) && intent.moving !== entry.name) throw new Error("Package preparation transfer has no recorded intent.");
		} else if (source !== entry.identity || target !== null || intent.completed.includes(entry.name)) throw new Error("Package preparation object custody is ambiguous or replaced.");
		return {
			name: entry.name,
			source: entry.source,
			identity: entry.identity,
			sourceParentIdentity: entry.sourceParentIdentity,
			destination,
			moved
		};
	});
}
async function completePackageActivationCustody(anchor, journal, assertCurrent, onHelperReady) {
	let record = journal.read();
	if (record.phase !== "preparing") return;
	const entries = inspectPackageActivationCustody(anchor, record);
	const control = resolvePackageActivationControl(anchor);
	for (const directory of /* @__PURE__ */ new Set([
		control,
		path.dirname(control),
		...entries.map((entry) => path.dirname(entry.source))
	])) {
		assertCurrent();
		journal.assertCurrent(record);
		requireDirectorySync(await syncDirectory(directory), "Package preparation control");
	}
	assertCurrent();
	journal.assertCurrent(record);
	if (record.intent?.kind === "prepare" && record.intent.completed.includes("helper")) {
		assertCurrent();
		journal.assertCurrent(record);
		onHelperReady?.();
	}
	for (const entry of entries) {
		if (record.intent?.kind !== "prepare") throw new Error("Preparation intent changed.");
		if (record.intent.completed.includes(entry.name)) continue;
		if (!entry.moved) {
			record = journal.transition(record, "preparing", {
				kind: "prepare",
				completed: record.intent.completed,
				moving: entry.name
			}, assertCurrent);
			assertCurrent();
			journal.assertCurrent(record);
			const current = inspectPackageActivationCustody(anchor, record).find((item) => item.name === entry.name);
			if (!current || current.moved) throw new Error("Preparation preimage changed before rename.");
			await fs$1.rename(entry.source, entry.destination);
		}
		for (const directory of /* @__PURE__ */ new Set([path.dirname(entry.source), path.dirname(entry.destination)])) {
			assertCurrent();
			journal.assertCurrent(record);
			requireDirectorySync(await syncDirectory(directory), "Package preparation transfer");
		}
		assertCurrent();
		journal.assertCurrent(record);
		if (!inspectPackageActivationCustody(anchor, record).find((item) => item.name === entry.name)?.moved || record.intent?.kind !== "prepare") throw new Error("Preparation transfer was not observed.");
		record = journal.transition(record, "preparing", {
			kind: "prepare",
			completed: [...record.intent.completed, entry.name],
			moving: null
		}, assertCurrent);
		if (entry.name === "helper") onHelperReady?.();
	}
	journal.transition(record, "prepared", null, assertCurrent);
}
//#endregion
//#region src/infra/package-update-activation-runtime-assets.ts
const packageActivationRuntimeEntrypoint = {
	currentModuleUrl: import.meta.url,
	sourceWorkerName: "package-update-activation-sealed",
	distWorkerPath: "package-update-activation-recovery.mjs"
};
//#endregion
//#region src/infra/package-update-activation-prepare.ts
function readPackageActivationRuntime() {
	const source = resolveRuntimeWorkerUrl(packageActivationRuntimeEntrypoint);
	if (!source.pathname.endsWith(".mjs")) throw new Error("Package publication recovery requires its built sealed helper.");
	return fs.readFileSync(source);
}
function packageActivationRecoveryCommand(node, anchor, operationId, helper = resolvePackageActivationHelper(anchor)) {
	const quote = (value) => `'${value.replaceAll("'", "'\\''")}'`;
	return `${quote(node)} ${quote(helper)} --anchor ${quote(anchor)} --operation ${quote(operationId)}`;
}
function resolvePackageActivationRecoveryCommand(record) {
	const anchor = resolvePackageActivationAnchor(record.descriptor.authority.installKey);
	let helper = resolvePackageActivationHelper(anchor);
	if (record.phase === "preparing") {
		const custody = inspectPackageActivationCustody(anchor, record).find((entry) => entry.name === "helper");
		if (!custody) throw new Error("Package bootstrap helper custody is missing.");
		helper = custody.moved ? custody.destination : custody.source;
	}
	const node = record.descriptor.recoveryNodePath;
	return packageActivationRecoveryCommand(node, anchor, record.descriptor.operationId, helper);
}
async function preparePackageActivationJournal(params, assertion = params.options.fence.assertCurrent.bind(params.options.fence)) {
	const assertCurrent = retainMutationAuthority(assertion);
	assertCurrent();
	const authority = captureUpdateCommandExecutorAuthority(params.options.fence);
	assertCurrent();
	const liveRoot = resolveUpdateInstallRoot(params.liveRoot);
	if (process.platform === "win32" || authority.installKey !== liveRoot) throw new Error("Package publication recovery requires its original POSIX npm directory.");
	const anchor = resolvePackageActivationAnchor(authority.installKey);
	const parent = path.dirname(anchor);
	if (fs.realpathSync(parent) !== parent) throw new Error("Package publication recovery requires canonical installation parents.");
	const stageRoot = resolveUpdateInstallRoot(params.stageRoot);
	const launcherRoot = resolveUpdateInstallRoot(params.launcherRoot);
	const binDir = resolveUpdateInstallRoot(params.binDir);
	const previousLauncherRoot = params.previousLauncherRoot ? resolveUpdateInstallRoot(params.previousLauncherRoot) : void 0;
	const node = fs.realpathSync(params.options.nodeRunner);
	for (const root of [
		liveRoot,
		stageRoot,
		anchor
	]) if (node === root || node.startsWith(`${root}${path.sep}`)) throw new Error("Recovery requires an external Node executable.");
	const version = spawnSync(node, ["--version"], {
		env: {},
		encoding: "utf8",
		timeout: 5e3,
		stdio: [
			"ignore",
			"pipe",
			"pipe"
		]
	});
	if (version.status !== 0 || !isSupportedOpenClawNodeVersion(version.stdout.trim().replace(/^v/u, ""))) throw new Error("Recovery requires a supported external Node executable.");
	const reader = createPackageIntegrityReader();
	const candidate = await reader.tree(stageRoot);
	const launchers = [];
	for (const entry of params.launchers) {
		const source = path.join(launcherRoot, entry.name);
		const destination = path.join(binDir, entry.name);
		launchers.push({
			...entry,
			candidate: encodePackageActivationLauncher(await reader.launcher(source)),
			candidateIdentity: packageActivationIdentity(source, "launcher"),
			previousIdentity: entry.previous === null ? null : packageActivationIdentity(destination, "launcher")
		});
	}
	const parentIdentity = packageActivationIdentity(parent, true);
	const binIdentity = packageActivationIdentity(binDir, true);
	if (candidate.identity.split(":")[0] !== parentIdentity.split(":")[0] || params.previous.identity.split(":")[0] !== parentIdentity.split(":")[0]) throw new Error("Package publication recovery requires same-filesystem directories.");
	assertPackageActivationLayout(anchor);
	const priorJournal = fs.lstatSync(resolvePackageActivationControl(anchor), { throwIfNoEntry: false }) ? openPackageActivationJournal(anchor) : void 0;
	const prior = priorJournal?.read();
	if (prior && !isPackageActivationComplete(anchor, prior)) throw new Error("An unresolved package operation already owns this installation.");
	const preparation = [
		{
			name: "candidate",
			source: stageRoot,
			identity: candidate.identity
		},
		{
			name: "launchers",
			source: launcherRoot,
			identity: packageActivationIdentity(launcherRoot, true)
		},
		...previousLauncherRoot ? [{
			name: "previous-launchers",
			source: previousLauncherRoot,
			identity: packageActivationIdentity(previousLauncherRoot, true)
		}] : []
	].map((entry) => ({
		name: entry.name,
		source: entry.source,
		identity: entry.identity,
		sourceParentIdentity: packageActivationIdentity(path.dirname(entry.source), true)
	}));
	const helperBytes = readPackageActivationRuntime();
	assertCurrent();
	const stagedAnchor = await fs$1.mkdtemp(path.join(path.dirname(stageRoot), ".activation-anchor-"));
	const anchorIdentity = packageActivationIdentity(stagedAnchor, true);
	const stagedControl = prior ? void 0 : await fs$1.mkdtemp(path.join(path.dirname(stageRoot), ".activation-control-"));
	const stagedHelper = stagedControl ? path.join(stagedControl, "recovery.mjs") : `${stagedAnchor}.recovery.mjs`;
	assertCurrent();
	fs.writeFileSync(stagedHelper, helperBytes, {
		flag: "wx",
		mode: 384,
		flush: true
	});
	for (const directory of /* @__PURE__ */ new Set([
		stagedAnchor,
		path.dirname(stagedHelper),
		path.dirname(stagedAnchor)
	])) {
		assertCurrent();
		requireDirectorySync(await syncDirectory(directory), "Package preparation staging");
	}
	assertCurrent();
	const helperIdentity = packageActivationIdentity(stagedHelper, false);
	const helperDigest = createHash("sha256").update(helperBytes).digest("hex");
	preparation.unshift({
		name: "anchor",
		source: stagedAnchor,
		identity: anchorIdentity,
		sourceParentIdentity: packageActivationIdentity(path.dirname(stagedAnchor), true)
	}, {
		name: "helper",
		source: stagedControl ? resolvePackageActivationHelper(anchor) : stagedHelper,
		identity: helperIdentity,
		sourceParentIdentity: packageActivationIdentity(path.dirname(stagedHelper), true)
	});
	const descriptor = {
		version: 1,
		layout: "external-helper",
		operationId: randomUUID(),
		recoveryNodePath: node,
		authority,
		anchorIdentity,
		parentIdentity,
		journalParentIdentity: packageActivationIdentity(stagedControl ?? resolvePackageActivationControl(anchor), true),
		binDir,
		binIdentity,
		originalStageRoot: stageRoot,
		previous: params.previous,
		candidate,
		launcherRootIdentity: packageActivationIdentity(launcherRoot, true),
		previousLauncherRootIdentity: previousLauncherRoot ? packageActivationIdentity(previousLauncherRoot, true) : null,
		helperDigest,
		helperIdentity,
		preparation,
		launchers
	};
	const journal = priorJournal ?? createPackageActivationJournal(anchor, descriptor, stagedControl, assertCurrent, params.onCustody);
	if (priorJournal && prior) {
		params.onCustody?.(true);
		try {
			priorJournal.replaceCompleted(prior, descriptor, assertCurrent);
		} catch (error) {
			try {
				assertCurrent();
				priorJournal.assertCurrent(prior);
				if (isPackageActivationComplete(anchor, prior)) params.onCustody?.(false);
			} catch {}
			throw error;
		}
	}
	const command = packageActivationRecoveryCommand(node, anchor, descriptor.operationId);
	assertCurrent();
	if (prior) params.options.onPrepared(`${packageActivationRecoveryCommand(node, anchor, descriptor.operationId, stagedHelper)} status`);
	await completePackageActivationCustody(anchor, journal, assertCurrent, () => params.options.onPrepared(`${command} status`));
	return {
		anchor,
		journal,
		command
	};
}
//#endregion
//#region src/infra/package-update-publication-owner.ts
function createPublicationOwner(anchor, journal, assertion, initial = journal.read(), assertJournalCurrent = journal.assertCurrent.bind(journal)) {
	let record = initial;
	const descriptor = record.descriptor;
	let retirementSelected;
	const live = descriptor.authority.installKey;
	const root = (name) => path.join(anchor, name);
	const helperIdentity = descriptor.helperIdentity;
	const custodyPath = (name) => {
		if (record.phase !== "preparing") return name === "anchor" ? anchor : resolvePackageActivationHelper(anchor);
		const entry = inspectPackageActivationCustody(anchor, record).find((item) => item.name === name);
		if (!entry) throw new Error("Package bootstrap custody is missing.");
		return entry.moved ? entry.destination : entry.source;
	};
	const helper = () => custodyPath("helper");
	const artifactNames = [
		"previous",
		"candidate",
		"previous.candidate",
		"launchers",
		"previous-launchers"
	];
	const assertInventory = (allowed = artifactNames) => {
		let entries;
		try {
			entries = fs.readdirSync(custodyPath("anchor"));
		} catch (error) {
			if (hasErrnoCode(error, "ENOENT") && (record.phase === "anchor-retired" || record.intent?.kind === "remove-anchor")) return;
			throw error;
		}
		if (entries.some((name) => !allowed.includes(name))) throw new Error("Unknown package recovery artifacts require operator inspection.");
	};
	const selectedLauncherIdentity = (entry, selected) => {
		if (selected === "previous" && entry.previous === null) return null;
		return record.phase === "aborted" ? entry.previousIdentity : record.publications.find((published) => published.name === entry.name)?.identity;
	};
	const assertSelectedLaunchers = (selected) => {
		for (const entry of descriptor.launchers) if (packageActivationIdentityOrAbsent(path.join(descriptor.binDir, entry.name), "launcher") !== selectedLauncherIdentity(entry, selected)) throw new Error("Selected package launcher identity changed.");
	};
	const verifySelectedLaunchers = async (selected) => {
		const reader = createPackageIntegrityReader();
		assertSelectedLaunchers(selected);
		for (const entry of descriptor.launchers) {
			const destination = path.join(descriptor.binDir, entry.name);
			if ((await reader.exists(destination) ? encodePackageActivationLauncher(await reader.launcher(destination)) : null) !== entry[selected]) throw new Error("Selected package launcher fingerprint changed.");
		}
		assertSelectedLaunchers(selected);
	};
	const assertCurrent = () => {
		assertion();
		assertJournalCurrent(record);
		const currentAnchor = packageActivationIdentityOrAbsent(custodyPath("anchor"), true);
		if (currentAnchor !== descriptor.anchorIdentity && !(currentAnchor === null && (record.phase === "anchor-retired" || record.intent?.kind === "remove-anchor"))) throw new Error("Package recovery anchor identity changed.");
		if (packageActivationIdentity(descriptor.binDir, true) !== descriptor.binIdentity) throw new Error("Package launcher parent changed");
		if (retirementSelected && packageActivationIdentity(live, true) !== descriptor[retirementSelected].identity) throw new Error("Selected package changed during retirement.");
		if (retirementSelected) assertSelectedLaunchers(retirementSelected);
	};
	const transition = (phase, intent = null, publications = record.publications) => {
		assertCurrent();
		record = journal.transition(record, phase, intent, assertion, publications);
	};
	const matches = async (file, expected, logical) => {
		if (!await packagePathEntryExists(file)) return false;
		const observed = await createPackageIntegrityReader().tree(file, logical);
		if (!isDeepStrictEqual(observed, expected)) throw new Error(`Package publication object changed: ${file}`);
		return true;
	};
	const inspect = async () => {
		const reader = createPackageIntegrityReader();
		const livePresent = await reader.exists(live);
		let selected = null;
		if (livePresent) {
			const id = packageActivationIdentity(live, true);
			selected = id === descriptor.previous.identity ? "previous" : id === descriptor.candidate.identity ? "candidate" : null;
			if (!selected) throw new Error("The installed package is not either recorded generation.");
			await matches(live, descriptor[selected], selected === "previous" ? live : descriptor.originalStageRoot);
		}
		const previous = await matches(root("previous"), descriptor.previous, live);
		const candidate = await matches(root("candidate"), descriptor.candidate, descriptor.originalStageRoot);
		if (selected === "previous" === previous || selected === "candidate" === candidate) throw new Error("Package publication generation roles are ambiguous.");
		if (packageActivationIdentity(root("launchers"), true) !== descriptor.launcherRootIdentity) throw new Error("Candidate launcher assets changed.");
		const published = new Map(record.publications.map((entry) => [entry.name, entry.identity]));
		if (record.intent?.kind === "launcher") published.set(record.intent.name, record.intent.identity);
		const launcherStates = /* @__PURE__ */ new Map();
		for (const entry of descriptor.launchers) {
			const source = root(`launchers/${entry.name}`);
			if (packageActivationIdentity(source, "launcher") !== entry.candidateIdentity || encodePackageActivationLauncher(await reader.launcher(source)) !== entry.candidate) throw new Error("Candidate launcher assets changed.");
			const destination = path.join(descriptor.binDir, entry.name);
			const present = await reader.exists(destination);
			const id = present ? packageActivationIdentity(destination, "launcher") : null;
			const fingerprint = present ? encodePackageActivationLauncher(await reader.launcher(destination)) : null;
			if (id === entry.previousIdentity && fingerprint === entry.previous) launcherStates.set(entry.name, "previous");
			else if (id === published.get(entry.name) && fingerprint === entry.candidate) launcherStates.set(entry.name, "candidate");
			else throw new Error(`Package launcher changed outside its publication intent: ${entry.name}`);
		}
		return {
			selected,
			previous,
			candidate,
			launcherStates
		};
	};
	const verifyClosure = async () => {
		assertInventory();
		assertManagedUpdateLeaseDatabaseIdentity(descriptor.authority);
		if (packageActivationIdentity(helper(), false) !== helperIdentity) throw new Error("Sealed package recovery helper identity changed.");
		const bytes = await fs$1.readFile(helper());
		if (createHash("sha256").update(bytes).digest("hex") !== descriptor.helperDigest) throw new Error("Sealed package recovery helper changed.");
		assertCurrent();
	};
	const preflight = async (action) => {
		if (action === "repair" && ![
			"preparing",
			"prepared",
			"publishing",
			"publication-complete"
		].includes(record.phase)) throw new Error(`Forward publication is disarmed (${record.phase}).`);
		if (action === "retire" && ![
			"publication-complete",
			"rolled-back",
			"aborted",
			"retiring",
			"anchor-retired"
		].includes(record.phase)) throw new Error(`Package evidence cannot be retired (${record.phase}).`);
		await verifyClosure();
		if (record.phase === "preparing") inspectPackageActivationCustody(anchor, record);
		else if (action === "repair" || record.phase === "publication-complete") await inspect();
		else {
			const selected = record.intent?.kind === "remove" || record.intent?.kind === "retire" || record.intent?.kind === "remove-anchor" || record.intent?.kind === "unlink-helper" ? record.intent.selected : "previous";
			if (!await matches(live, descriptor[selected], selected === "previous" ? live : descriptor.originalStageRoot)) throw new Error("Selected package is missing.");
			await verifySelectedLaunchers(selected);
		}
		assertCurrent();
	};
	const persistPackageSelection = async (selected) => {
		const rejected = selected === "previous" && packageActivationIdentityOrAbsent(root("previous.candidate"), true) !== null;
		const roles = [
			[live, selected === "displaced" ? null : descriptor[selected].identity],
			[root("previous"), selected === "previous" ? null : descriptor.previous.identity],
			[root("candidate"), selected === "displaced" || selected === "previous" && !rejected ? descriptor.candidate.identity : null],
			[root("previous.candidate"), rejected ? descriptor.candidate.identity : null]
		];
		const assertSelected = () => {
			assertCurrent();
			if (roles.some(([file, identity]) => packageActivationIdentityOrAbsent(file, true) !== identity)) throw new Error("Package selection changed during persistence.");
		};
		for (const directory of [anchor, path.dirname(live)]) {
			assertSelected();
			const outcome = await syncDirectory(directory);
			assertSelected();
			requireDirectorySync(outcome, "Package selection");
		}
	};
	const publish = async (resume, onDisplaced) => {
		await verifyClosure();
		if (![
			"preparing",
			"prepared",
			"publishing",
			"publication-complete"
		].includes(record.phase)) throw new Error(`Forward publication is disarmed (${record.phase}).`);
		if (record.phase === "preparing") {
			await completePackageActivationCustody(anchor, journal, assertion);
			record = journal.read();
		}
		let observed = await inspect();
		assertCurrent();
		if (resume && observed.selected === "previous" && !observed.previous) {
			if ([...observed.launcherStates.values()].some((value) => value !== "previous")) throw new Error("Untouched package has changed launchers; recovery is ambiguous.");
			transition("aborted");
			return readPackageActivationRecordStatus(record);
		}
		if (observed.selected === "previous") {
			transition("publishing", { kind: "displace" });
			assertCurrent();
			if (packageActivationIdentityOrAbsent(live, true) !== descriptor.previous.identity || packageActivationIdentityOrAbsent(root("previous"), true) !== null) throw new Error("Package displacement preimage changed.");
			await fs$1.rename(live, root("previous"));
			await persistPackageSelection("displaced");
			await onDisplaced?.();
			assertCurrent();
		} else if (observed.selected === null) await persistPackageSelection("displaced");
		observed = await inspect();
		assertCurrent();
		if (observed.selected === null) {
			transition("publishing", { kind: "publish" });
			await activateStagedNpmPackageRoot(root("candidate"), live, () => {
				assertCurrent();
				if (packageActivationIdentityOrAbsent(root("candidate"), true) !== descriptor.candidate.identity || packageActivationIdentityOrAbsent(root("previous"), true) !== descriptor.previous.identity || packageActivationIdentityOrAbsent(live, true) !== null) throw new Error("Candidate publication preimage changed.");
			});
		}
		await persistPackageSelection("candidate");
		for (const entry of descriptor.launchers) {
			observed = await inspect();
			assertCurrent();
			if (observed.launcherStates.get(entry.name) === "candidate") {
				const destination = path.join(descriptor.binDir, entry.name);
				const id = packageActivationIdentity(destination, "launcher");
				requireDirectorySync(await syncDirectory(descriptor.binDir), "Recovered package launcher");
				assertCurrent();
				if (packageActivationIdentity(destination, "launcher") !== id) throw new Error("Recovered launcher changed during persistence.");
				if (!record.publications.some((item) => item.name === entry.name)) transition("publishing", null, [...record.publications, {
					name: entry.name,
					identity: id
				}]);
				continue;
			}
			await copyPackagePathEntry(root(`launchers/${entry.name}`), path.join(descriptor.binDir, entry.name), () => {
				assertCurrent();
				if (packageActivationIdentityOrAbsent(root(`launchers/${entry.name}`), "launcher") !== entry.candidateIdentity) throw new Error("Launcher publication preimage changed.");
			}, (staged) => {
				assertCurrent();
				if (packageActivationIdentityOrAbsent(path.join(descriptor.binDir, entry.name), "launcher") !== entry.previousIdentity) throw new Error("Launcher publication preimage changed.");
				transition("publishing", {
					kind: "launcher",
					name: entry.name,
					identity: packageActivationIdentity(staged, "launcher")
				});
			});
			const id = packageActivationIdentity(path.join(descriptor.binDir, entry.name), "launcher");
			transition("publishing", null, [...record.publications, {
				name: entry.name,
				identity: id
			}]);
		}
		observed = await inspect();
		assertCurrent();
		if (observed.selected !== "candidate") throw new Error("Candidate publication is incomplete.");
		transition("publication-complete");
		return readPackageActivationRecordStatus(record);
	};
	const persistRetirement = async () => {
		const assertRetired = () => {
			assertCurrent();
			if (!isPackageActivationComplete(anchor, record)) throw new Error("Package recovery artifacts were not retired.");
		};
		assertRetired();
		const outcome = await syncDirectory(path.dirname(helper()));
		assertRetired();
		requireDirectorySync(outcome, "Package helper retirement");
		return readPackageActivationRecordStatus(record);
	};
	const retire = async () => {
		await verifyClosure();
		if (![
			"publication-complete",
			"rolled-back",
			"aborted",
			"retiring",
			"anchor-retired"
		].includes(record.phase)) throw new Error(`Package evidence cannot be retired (${record.phase}).`);
		const selected = record.intent?.kind === "remove" || record.intent?.kind === "retire" || record.intent?.kind === "remove-anchor" || record.intent?.kind === "unlink-helper" ? record.intent.selected : record.phase === "publication-complete" ? "candidate" : "previous";
		await matches(live, descriptor[selected], selected === "previous" ? live : descriptor.originalStageRoot);
		if (!await packagePathEntryExists(live)) throw new Error("Selected package is missing.");
		await verifySelectedLaunchers(selected);
		retirementSelected = selected;
		assertCurrent();
		if (!["retiring", "anchor-retired"].includes(record.phase)) {
			for (const name of [
				"previous",
				"candidate",
				"previous.candidate"
			]) await matches(root(name), name === "previous" ? descriptor.previous : descriptor.candidate, name === "previous" ? live : descriptor.originalStageRoot);
			assertCurrent();
			const publications = record.phase === "aborted" ? descriptor.launchers.flatMap((entry) => entry.previousIdentity ? [{
				name: entry.name,
				identity: entry.previousIdentity
			}] : []) : record.publications;
			transition("retiring", {
				kind: "retire",
				selected
			}, publications);
		}
		for (const name of [
			"previous",
			"candidate",
			"previous.candidate",
			"launchers",
			"previous-launchers"
		]) {
			const target = root(name);
			if (!await packagePathEntryExists(target)) {
				assertCurrent();
				continue;
			}
			const id = packageActivationIdentity(target, true);
			if (id !== (name === "previous" ? descriptor.previous.identity : name === "candidate" || name === "previous.candidate" ? descriptor.candidate.identity : name === "launchers" ? descriptor.launcherRootIdentity : descriptor.previousLauncherRootIdentity)) throw new Error("Retirement target identity changed.");
			transition("retiring", {
				kind: "remove",
				name,
				identity: id,
				selected
			});
			await removePackagePath(target, () => {
				assertCurrent();
				const current = packageActivationIdentityOrAbsent(target, true);
				if (current !== null && current !== id) throw new Error("Retirement target changed before removal.");
			});
		}
		if (record.phase !== "anchor-retired") {
			if (record.intent?.kind !== "remove-anchor") transition("retiring", {
				kind: "remove-anchor",
				identity: descriptor.anchorIdentity,
				selected
			});
			assertCurrent();
			assertInventory([]);
			const current = packageActivationIdentityOrAbsent(anchor, true);
			if (current !== null) {
				if (current !== descriptor.anchorIdentity) throw new Error("Final anchor identity changed.");
				await fs$1.rmdir(anchor);
			}
			assertCurrent();
			requireDirectorySync(await syncDirectory(path.dirname(anchor)), "Package anchor retirement");
			assertCurrent();
			if (packageActivationIdentityOrAbsent(anchor, true) !== null) throw new Error("Package anchor was not retired.");
			transition("anchor-retired", {
				kind: "retire",
				selected
			});
		}
		assertCurrent();
		if (packageActivationIdentityOrAbsent(anchor, true) !== null || packageActivationIdentity(helper(), false) !== helperIdentity) throw new Error("Final package recovery cleanup identity changed.");
		transition("anchor-retired", {
			kind: "unlink-helper",
			identity: helperIdentity,
			selected
		});
		assertCurrent();
		if (packageActivationIdentity(helper(), false) !== helperIdentity) throw new Error("Final helper identity changed.");
		await fs$1.unlink(helper());
		return persistRetirement();
	};
	return {
		publish,
		retire,
		persistRetirement,
		preflight,
		async disarmRollback() {
			assertCurrent();
			const observed = await inspect();
			assertCurrent();
			if (observed.selected === "previous" && !observed.previous && [...observed.launcherStates.values()].every((value) => value === "previous")) {
				transition("aborted");
				return false;
			}
			transition("rollback-in-progress", record.intent);
			const disarmed = await inspect();
			assertCurrent();
			return disarmed.previous;
		},
		recordRestoredLauncher(name, staged) {
			if (record.phase !== "rollback-in-progress") throw new Error("Launcher restoration requires durable rollback intent.");
			const identity = packageActivationIdentity(staged, "launcher");
			transition("rollback-in-progress", {
				kind: "launcher",
				name,
				identity
			}, [...record.publications.filter((entry) => entry.name !== name), {
				name,
				identity
			}]);
		},
		async restored() {
			assertCurrent();
			assertSelectedLaunchers("previous");
			const outcome = await syncDirectory(descriptor.binDir);
			assertCurrent();
			assertSelectedLaunchers("previous");
			requireDirectorySync(outcome, "Restored package launchers");
			await persistPackageSelection("previous");
			const publications = descriptor.launchers.flatMap((entry) => {
				const identity = entry.previous === null ? null : record.publications.find((published) => published.name === entry.name)?.identity ?? entry.previousIdentity;
				if (packageActivationIdentityOrAbsent(path.join(descriptor.binDir, entry.name), "launcher") !== identity) throw new Error("Restored launcher does not match its original owner.");
				return identity ? [{
					name: entry.name,
					identity
				}] : [];
			});
			transition("rolled-back", null, publications);
		},
		status: () => readPackageActivationRecordStatus(record),
		assertCurrent
	};
}
//#endregion
//#region src/infra/package-update-activation.ts
/** Read-only correlation; callers still need a privately registered live fence. */
function readPackageActivationContinuation(installKey) {
	const anchor = resolvePackageActivationAnchor(installKey);
	const released = readReleasedPackageActivationReceipt(installKey);
	if (released) throw new Error(`Package publication recovery is pending. With an external Node, run ${released.recoveryCommand}, then use that original helper to repair or retire; keep other package managers stopped.`);
	assertPackageActivationLayout(anchor);
	const journalPath = resolvePackageActivationJournalPath(anchor);
	if (!fs.lstatSync(journalPath, { throwIfNoEntry: false })) {
		if (fs.lstatSync(anchor, { throwIfNoEntry: false }) || fs.lstatSync(resolvePackageActivationControl(anchor), { throwIfNoEntry: false })) throw new Error(`Incomplete or legacy recovery artifacts require their original owner: ${anchor}. The next mutable update is blocked.`);
		return;
	}
	const record = openPackageActivationJournal(anchor).read();
	if (isPackageActivationComplete(anchor, record)) return;
	if (record.descriptor.authority.installKey !== installKey) throw new Error("Package publication is incomplete; its original continuation cannot run.");
	assertManagedUpdateLeaseDatabaseIdentity(record.descriptor.authority);
	if (record.phase !== "publication-complete") throw new Error(`Package publication is incomplete; its original continuation cannot run. With an external Node, run ${resolvePackageActivationRecoveryCommand(record)} status, then repair or retire; keep other package managers stopped.`);
	return record.descriptor.authority;
}
function assertNoPendingPackageActivation(installKey, options) {
	const authority = readPackageActivationContinuation(installKey);
	if (!authority) return;
	if (options?.continuation && isDeepStrictEqual(authority, captureUpdateCommandExecutorAuthority(options.continuation))) return;
	const record = openPackageActivationJournal(resolvePackageActivationAnchor(installKey)).read();
	throw new Error(`Package publication recovery is pending. With an external Node, run ${resolvePackageActivationRecoveryCommand(record)} status, then repair or retire; keep other package managers stopped.`);
}
async function preparePackageActivation(params) {
	const fence = params.options.fence;
	const assertOriginal = fence.assertCurrent.bind(fence);
	const options = {
		...params.options,
		fence
	};
	if (process.platform === "win32" || process.versions.bun || params.installTarget.manager !== "npm" || params.installTarget.directNodeModulesRoot || !(await fs$1.lstat(params.stageRoot)).isDirectory()) return;
	const nodeRunner = resolveExecutablePath(options.nodeRunner, { useCache: false });
	assertOriginal();
	if (!nodeRunner) {
		options.onUnavailable?.("Standalone package publication repair is unavailable: the selected Node executable could not be resolved.");
		return;
	}
	options.nodeRunner = fs.realpathSync(nodeRunner);
	const capable = await supportsPostCoreExecutor(params.stageRoot, options.nodeRunner);
	assertOriginal();
	if (!capable) {
		options.onUnavailable?.("Standalone package publication repair is unavailable for this target: its update worker does not support delegated post-core execution.");
		return;
	}
	const prepared = await preparePackageActivationJournal({
		...params,
		options
	}, assertOriginal);
	const owner = createPublicationOwner(prepared.anchor, prepared.journal, assertOriginal);
	return {
		...prepared,
		...owner
	};
}
function readPackageActivationReceipt(installKey) {
	const released = readReleasedPackageActivationReceipt(installKey);
	if (released) return released;
	const anchor = resolvePackageActivationAnchor(installKey);
	if (!fs.existsSync(resolvePackageActivationJournalPath(anchor))) {
		readPackageActivationContinuation(installKey);
		return;
	}
	const record = openPackageActivationJournal(anchor).read();
	assertManagedUpdateLeaseDatabaseIdentity(record.descriptor.authority);
	const receipt = readPackageActivationRecordStatus(record);
	return receipt.phase === "complete" ? receipt : {
		...receipt,
		recoveryCommand: `${resolvePackageActivationRecoveryCommand(record)} status`
	};
}
//#endregion
export { POST_CORE_EXECUTOR_CAPABILITY as _, PACKAGE_MANAGER_SWAP_SOURCE_HARDLINKS as a, capturePackageLaunchers as c, discardPackageUpdateBackup as d, packagePathEntriesMatch as f, restoreNpmPackageRoot as g, removePackageUpdatePath as h, encodePackageActivationLauncher as i, copyPackagePathEntry as l, removePackagePath as m, preparePackageActivation as n, activateStagedNpmPackageRoot as o, packagePathEntryExists as p, readPackageActivationReceipt as r, backupNpmPackageRoot as s, assertNoPendingPackageActivation as t, discardPackageLauncherBackup as u, POST_CORE_MUTATION_PROTOCOL as v, supportsPostCoreExecutor as y };
