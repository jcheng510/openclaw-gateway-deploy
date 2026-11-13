import { i as extractErrorCode, r as collectNestedErrorCandidates } from "./error-coercion-1P2One0X.mjs";
import { r as isPathInside } from "./path-guards-CH7noY0Z.mjs";
import { r as isMissingPathError, t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import "./errors-YPvSaqwO.mjs";
import { i as runCommandWithTimeout } from "./exec-Bjx7k3vE.mjs";
import { i as runOutsideCommandProcessScope } from "./exec-spawn-B_BFgGrb.mjs";
import { t as createCommandError } from "./command-error-DUhFKi3T.mjs";
import { c as normalizeGitPathForFilesystem } from "./git-exec-CTnMIsHS.mjs";
import { n as OpenClawStateLeaseError } from "./openclaw-state-lease-error-Ds9BTWol.mjs";
import { t as withOpenClawStateLease } from "./openclaw-state-lease-dtaWMPu_.mjs";
import { n as formatDiskSpaceBytes, r as tryReadDiskSpace } from "./disk-space-CtKhSv74.mjs";
import { c as requireGit, d as runGit, m as worktreePathExists, n as commandError, s as listGitWorktrees, u as resolveGitRepositoryPaths } from "./git-CtRrTgDk.mjs";
import { t as runGitWorkerOperation } from "./git-worker-By34oXKp.mjs";
import { i as WorktreeRemovalContentionError } from "./run-lease-store.kernel-BenxyUvM.mjs";
import { g as listRegistryWorktrees } from "./registry-8DTb8KC2.mjs";
import { t as resolveCheckoutRootFromRealPath } from "./repository-paths-C4TNxPnH.mjs";
import { lstatSync, statSync } from "node:fs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
import fs$1 from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
//#region src/agents/worktrees/allocation.ts
const WORKTREE_CREATE_LEASE_SCOPE = "core:managed-worktrees:create";
const WORKTREE_CREATE_LEASE_MS = 6e4;
const WORKTREE_CREATE_LEASE_WAIT_MS = 6e5;
/** Serialize managed worktree allocations across repositories and processes. */
async function withWorktreeAllocationLease(params, run) {
	const acquisition = new AbortController();
	const abortAcquisition = () => acquisition.abort(params.signal?.reason);
	params.signal?.addEventListener("abort", abortAcquisition, { once: true });
	if (params.signal?.aborted) abortAcquisition();
	try {
		return await withOpenClawStateLease({
			scope: WORKTREE_CREATE_LEASE_SCOPE,
			key: "capacity",
			database: {
				scope: "shared",
				options: { env: params.env }
			},
			leaseMs: WORKTREE_CREATE_LEASE_MS,
			waitMs: WORKTREE_CREATE_LEASE_WAIT_MS,
			leaseLabel: "managed worktree allocation lease",
			operationLabel: "agents.worktrees.allocation",
			signal: acquisition.signal
		}, async (lease) => {
			params.signal?.removeEventListener("abort", abortAcquisition);
			const signal = params.signal ? AbortSignal.any([params.signal, lease.signal]) : lease.signal;
			try {
				const result = await run({
					signal,
					commitGuard: () => {
						lease.assertOwned();
						signal.throwIfAborted();
						params.commitGuard?.();
					},
					rollbackGuard: () => lease.assertOwned()
				});
				signal.throwIfAborted();
				return result;
			} catch (error) {
				if (collectNestedErrorCandidates(error).some((cause) => extractErrorCode(cause) === "outcome-unknown")) throw error;
				if (params.signal?.aborted) {
					lease.assertOwned();
					throw new OpenClawStateLeaseError("managed worktree allocation lease operation was aborted", {
						code: "OPENCLAW_STATE_LEASE_ABORTED",
						cause: params.signal.reason
					});
				}
				throw error;
			}
		});
	} finally {
		params.signal?.removeEventListener("abort", abortAcquisition);
	}
}
//#endregion
//#region src/agents/worktrees/capacity.ts
const GiB = 1024 ** 3;
const WORKTREE_SETUP_HEADROOM_BYTES = 4 * GiB;
/** Admission estimates allocations, not a quota on arbitrary repository scripts or other writers. */
function requireWorktreeDiskSpace(demands, purpose, snapshot = false) {
	const volumes = /* @__PURE__ */ new Map();
	for (const demand of demands) {
		const space = tryReadDiskSpace(demand.path);
		if (!space || space.totalBytes === null) throw new Error(`Cannot determine disk space near ${demand.path}; check the volume and retry ${purpose}.`);
		const device = statSync(space.checkedPath).dev;
		const existing = volumes.get(device);
		if (existing) {
			existing.available = Math.min(existing.available, space.availableBytes);
			existing.bytes += demand.bytes;
		} else volumes.set(device, {
			path: space.checkedPath,
			available: space.availableBytes,
			bytes: demand.bytes
		});
	}
	for (const volume of volumes.values()) {
		const required = (snapshot ? 128 * 1024 ** 2 : 4 * GiB) + volume.bytes;
		if (!Number.isSafeInteger(Math.ceil(required)) || volume.available < required) throw new Error(`Insufficient disk space near ${volume.path} for ${purpose}: ${formatDiskSpaceBytes(volume.available)} available; approximately ${formatDiskSpaceBytes(required)} required including safety reserve. Free caches or archive/remove unused worktrees, then retry.`);
	}
}
async function estimateWorktreeGitBytes(repoRoot, ref, options = {}) {
	return await runGitWorkerOperation({
		type: "worktree.git-size",
		input: {
			repoRoot,
			ref,
			replacementRefBase: process.env.GIT_REPLACE_REF_BASE ?? "refs/replace/"
		}
	}, options);
}
/** Budget a full snapshot checkout or the destination blobs written over a source clone. */
async function estimateWorktreeCheckoutTransitionBytes(repoRoot, baseRef, targetRef, options = {}) {
	return await runGitWorkerOperation({
		type: "worktree.checkout-transition-size",
		input: {
			repoRoot,
			baseRef,
			targetRef,
			replacementRefBase: process.env.GIT_REPLACE_REF_BASE ?? "refs/replace/"
		}
	}, options);
}
/** Each call measures current files; allocation cannot use a settled directory-size cache. */
async function directorySizeBytes(root, excludeGit = false, options = {}) {
	return await runGitWorkerOperation({
		type: "worktree.directory-size",
		input: {
			root,
			excludeGit
		}
	}, options);
}
//#endregion
//#region src/agents/worktrees/owner.ts
function worktreeOwnerMatches(record, params) {
	return record.ownerKind === (params.ownerKind ?? "manual") && (record.ownerId ?? void 0) === (params.ownerId ?? void 0);
}
//#endregion
//#region src/agents/worktrees/service-preparation.ts
const NAME_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
async function withWorktreeSource(params, run) {
	const { withSource, ...operation } = params;
	if (!withSource) return await run(operation);
	params.commitGuard?.();
	return await withSource((source) => {
		const commitGuard = () => {
			params.commitGuard?.();
			source.assertCurrent();
		};
		commitGuard();
		const signal = params.signal && source.signal ? AbortSignal.any([params.signal, source.signal]) : source.signal ?? params.signal;
		const rollbackGuard = () => {
			params.rollbackGuard();
			source.assertCheckoutCurrent?.();
		};
		return run({
			...operation,
			signal,
			commitGuard,
			rollbackGuard
		});
	});
}
function validateName(name) {
	if (!NAME_PATTERN.test(name)) throw new Error("worktree name must match [a-z0-9][a-z0-9-]{0,63}");
	return name;
}
function findWorktreeByName(env, fingerprint, name) {
	return listRegistryWorktrees(env).find((record) => record.repoFingerprint === fingerprint && record.name === name);
}
async function nameIsUnavailable(env, repoRoot, fingerprint, root, name, owner) {
	const worktreePath = path.join(root, name);
	const registered = findWorktreeByName(env, fingerprint, name);
	if (owner.ownerId && registered && registered.removedAt === void 0 && worktreeOwnerMatches(registered, owner)) return false;
	if (registered || await worktreePathExists(worktreePath)) return true;
	const branch = `openclaw/${name}`;
	const branchExists = await runGit(repoRoot, [
		"show-ref",
		"--quiet",
		"--verify",
		`refs/heads/${branch}`
	]);
	if (branchExists.code === 0) return true;
	if (branchExists.code !== 1) throw commandError("git show-ref --verify", branchExists);
	return (await listGitWorktrees(repoRoot)).some((entry) => path.resolve(entry.path) === path.resolve(worktreePath));
}
function appendNameOrdinal(name, ordinal) {
	const suffix = `-${ordinal}`;
	return `${name.slice(0, 64 - suffix.length).replace(/-+$/g, "")}${suffix}`;
}
async function generateName(env, repoRoot, fingerprint, root, owner, suggestedName) {
	validateName(suggestedName);
	for (let ordinal = 1; ordinal <= 1e3; ordinal += 1) {
		const candidate = ordinal === 1 ? suggestedName : appendNameOrdinal(suggestedName, ordinal);
		if (!await nameIsUnavailable(env, repoRoot, fingerprint, root, candidate, owner)) return candidate;
	}
	throw new Error(`no available worktree name for ${suggestedName}`);
}
async function resolveRepositoryFromRealPath(requested, requestedLabel) {
	const sourceRoot = await resolveCheckoutRootFromRealPath(requested, requestedLabel);
	const { canonicalRoot, commonDir } = await resolveGitRepositoryPaths(sourceRoot);
	const origin = await runGit(canonicalRoot, [
		"config",
		"--get",
		"remote.origin.url"
	]);
	const originUrl = origin.code === 0 ? origin.stdout.trim() : "";
	return {
		repoRoot: canonicalRoot,
		sourceRoot,
		commonDir,
		originUrl,
		fingerprint: createHash("sha256").update(`${commonDir}\n${originUrl}`).digest("hex").slice(0, 16)
	};
}
async function resolveRepository(repoRoot) {
	return await resolveRepositoryFromRealPath(await fs$1.realpath(repoRoot).catch(() => {
		throw new Error(`repository does not exist: ${repoRoot}`);
	}), repoRoot);
}
async function cleanupFailedCreate(repoRoot, worktreePath, branch, rollbackGuard) {
	const options = {
		beforeRun: rollbackGuard,
		killProcessTree: true
	};
	const removed = await runGit(repoRoot, [
		"worktree",
		"remove",
		"--force",
		worktreePath
	], options);
	const deletedBranch = await runGit(repoRoot, [
		"branch",
		"-D",
		branch
	], options);
	if (removed.code !== 0 || deletedBranch.code !== 0) {
		const failure = removed.code !== 0 ? commandError("git worktree remove", removed) : commandError("git branch -D", deletedBranch);
		throw new Error(`failed to clean up worktree creation: ${failure.message}`);
	}
}
async function resetFailedWorktreeAdd(repoRoot, worktreePath, branch, rollbackGuard) {
	const options = {
		beforeRun: rollbackGuard,
		killProcessTree: true
	};
	if ((await listGitWorktrees(repoRoot, options)).some((entry) => path.resolve(entry.path) === path.resolve(worktreePath))) {
		const removed = await runGit(repoRoot, [
			"worktree",
			"remove",
			"--force",
			worktreePath
		], options);
		if (removed.code !== 0) throw commandError("git worktree remove", removed);
	} else if (await worktreePathExists(worktreePath)) {
		rollbackGuard();
		await fs$1.rm(worktreePath, {
			recursive: true,
			force: true
		});
	}
	if ((await runGit(repoRoot, [
		"show-ref",
		"--quiet",
		"--verify",
		`refs/heads/${branch}`
	], options)).code === 0) await requireGit(repoRoot, [
		"branch",
		"-D",
		branch
	], options);
}
async function canResetFailedWorktreeAdd(repoRoot, worktreePath, branch, failure) {
	const message = (failure.stderr || failure.stdout).trim().split("\n").slice(-12).join("\n");
	const createdBranch = message.includes(`Preparing worktree (new branch '${branch}')`);
	if (message.includes("unable to checkout working tree") || createdBranch) return true;
	if ((await listGitWorktrees(repoRoot)).some((entry) => path.resolve(entry.path) === path.resolve(worktreePath)) || await worktreePathExists(worktreePath)) return false;
	return (await runGit(repoRoot, [
		"show-ref",
		"--quiet",
		"--verify",
		`refs/heads/${branch}`
	])).code === 1;
}
async function runSetupScript(repoRoot, worktreePath, params) {
	const setupScript = path.join(repoRoot, ".openclaw", "worktree-setup.sh");
	const stat = await fs$1.stat(setupScript).catch(() => void 0);
	if (!stat?.isFile() || (stat.mode & 73) === 0) return;
	const timeoutMs = 12e4;
	params.onProgress?.("setup");
	const runInCallerContext = AsyncLocalStorage.snapshot();
	const cancellation = new AbortController();
	const signal = params.signal ? AbortSignal.any([params.signal, cancellation.signal]) : cancellation.signal;
	let pending;
	let result;
	try {
		result = await (await withWorktreeSource(params, (current) => {
			current.signal?.throwIfAborted();
			current.commitGuard?.();
			pending = runInCallerContext(() => runCommandWithTimeout([setupScript], {
				timeoutMs,
				cwd: worktreePath,
				signal,
				killProcessTree: true,
				env: {
					OPENCLAW_SOURCE_TREE_PATH: repoRoot,
					OPENCLAW_WORKTREE_PATH: worktreePath
				}
			}));
			pending.catch(() => void 0);
			return { completion: pending };
		})).completion;
	} catch (error) {
		if (pending) {
			cancellation.abort(error);
			await pending.catch(() => void 0);
		}
		throw error;
	}
	params.signal?.throwIfAborted();
	if (result.code !== 0) throw createCommandError("worktree setup", result, { timeoutMs });
}
//#endregion
//#region src/agents/worktrees/removal-errors.ts
function isWorktreePermissionError(error) {
	return hasErrnoCode(error, "EACCES") || hasErrnoCode(error, "EPERM");
}
var WorktreeBranchMovedError = class extends Error {};
/** Removal aborted because snapshot loss was not permitted. */
var WorktreeSnapshotError = class extends Error {
	constructor(snapshotError, options) {
		super(`worktree snapshot failed; removal aborted: ${snapshotError}`, options);
		this.snapshotError = snapshotError;
	}
};
var WorktreeRemovalLockError = class extends Error {
	constructor(kind, message) {
		super(message);
		this.kind = kind;
		this.name = "WorktreeRemovalLockError";
	}
};
function classifyWorktreeRemovalError(error) {
	if (error instanceof WorktreeRemovalContentionError) return "busy";
	if (error instanceof WorktreeRemovalLockError) return error.kind;
	if (error instanceof WorktreeSnapshotError) return "snapshot-failed";
	return "cleanup-failed";
}
//#endregion
//#region src/agents/worktrees/orphan-paths.ts
async function canonicalPathKey(target) {
	const canonical = await fs$1.realpath(target);
	return process.platform === "win32" ? canonical.toLowerCase() : canonical;
}
async function resolveManagedWorktreePathKeys(records) {
	const managedPaths = /* @__PURE__ */ new Set();
	for (const record of records) try {
		managedPaths.add(await canonicalPathKey(record.path));
	} catch (error) {
		if (isWorktreePermissionError(error)) return;
		if (!isMissingPathError(error)) throw error;
	}
	return managedPaths;
}
async function shouldPreserveOrphanCandidate(target, managedPaths, customRoots) {
	if (/^\.openclaw-retiring-[a-f0-9-]{36}$/u.test(path.basename(target))) return true;
	const targetKey = await canonicalPathKey(target);
	if (managedPaths.has(targetKey) || [...customRoots].some((root) => isPathInside(root, targetKey) || isPathInside(targetKey, root))) return true;
	return await worktreePathExists(path.join(target, ".git"));
}
//#endregion
//#region src/agents/worktrees/removal-git.ts
function missingPathOrThrow(error) {
	if (!isMissingPathError(error)) throw error;
}
async function requireManagedWorktreeHead(record, options) {
	const branch = await runGit(record.path, [
		"symbolic-ref",
		"--quiet",
		"HEAD"
	], options);
	if (branch.code !== 0 && branch.code !== 1) throw commandError("git symbolic-ref --quiet HEAD", branch);
	if (branch.code !== 0 || branch.stdout.trim() !== `refs/heads/${record.branch}`) throw new WorktreeBranchMovedError(`Worktree HEAD no longer owns ${record.branch}; checkout and branch preserved.`);
	return await requireGit(record.path, [
		"rev-parse",
		"--verify",
		"HEAD^{commit}"
	], options);
}
/** Keep native branch deletion's ancestry and checked-out-elsewhere checks. */
async function prepareSnapshotBranchDeletion(record, snapshotRef, snapshot, options) {
	const merges = await runGit(record.repoRoot, [
		"config",
		"--get-all",
		`branch.${record.branch}.merge`
	], options);
	if (merges.code !== 0 && merges.code !== 1) throw commandError("git config --get-all", merges);
	const source = merges.code === 0 ? merges.stdout.split("\n")[0] : snapshotRef;
	await requireGit(record.repoRoot, ["check-ref-format", source], options);
	const remote = `openclaw-removal-${randomUUID()}`;
	const config = [
		`branch.${record.branch}.remote=${remote}`,
		`remote.${remote}.fetch=+${source}:${snapshotRef}`,
		...merges.code === 1 ? [`branch.${record.branch}.merge=${source}`] : []
	];
	const deletionOptions = {
		...options,
		env: {
			...options?.env,
			GIT_CONFIG_PARAMETERS: config.map((value) => `'${value.replaceAll("'", "'\\''")}'`).join(" ")
		}
	};
	if (await requireGit(record.repoRoot, [
		"rev-parse",
		"--verify",
		`${record.branch}@{upstream}^{commit}`
	], deletionOptions) !== snapshot) throw new Error(`Cannot bind branch cleanup to ${snapshotRef}; checkout preserved.`);
	return deletionOptions;
}
/** Once destructive deletion starts, its allocation owner joins it without a deadline. */
async function removeManagedCheckout(record, git, requireLossless, assertCurrent) {
	const removed = await runOutsideCommandProcessScope(() => git.run(record.repoRoot, [
		"worktree",
		"remove",
		...requireLossless ? [] : ["--force"],
		"--",
		record.path
	], {
		beforeRun: assertCurrent,
		killProcessTree: true,
		waitForExit: true
	}));
	if (removed.code !== 0) throw commandError("git worktree remove", removed);
}
/** Explicit detached retirement never grants ownership of another symbolic branch. */
async function requireExactManagedWorktreeHead(record, expected, options) {
	assertExactStateOwner(record, expected);
	if ((await runGit(record.path, [
		"symbolic-ref",
		"--quiet",
		"HEAD"
	], options)).code !== 1) throw new Error("Exact-state retirement requires detached HEAD; checkout preserved");
	const head = await requireGit(record.path, [
		"rev-parse",
		"--verify",
		"HEAD^{commit}"
	], options);
	const branchHead = await requireGit(record.repoRoot, [
		"rev-parse",
		"--verify",
		`refs/heads/${record.branch}^{commit}`
	], options);
	if (head !== expected.head || branchHead !== expected.branchHead) throw new Error("Worktree HEAD or recorded branch changed; checkout preserved");
	return head;
}
function assertExactStateOwner(record, expected) {
	if (record.removedAt !== void 0 || record.ownerKind !== expected.ownerKind || record.ownerId !== expected.ownerId || record.createdAt !== expected.createdAt || record.lastActiveAt !== expected.lastActiveAt) throw new Error("Worktree exact-state owner or lifecycle changed; checkout preserved");
}
/** Hold Git's own file-ref/index exclusion points through verification and deletion. */
async function withExactStateGitLocks(record, assertCurrent, run, additionalRefs = []) {
	const options = {
		beforeRun: assertCurrent,
		killProcessTree: true
	};
	const storage = await runGit(record.repoRoot, [
		"config",
		"--get",
		"extensions.refStorage"
	], options);
	if (storage.code !== 1 && (storage.code !== 0 || storage.stdout.trim() !== "files")) throw new Error("Exact-state retirement requires Git file refs; source preserved");
	const held = [];
	try {
		for (const name of [
			"index",
			"HEAD",
			`refs/heads/${record.branch}`,
			...additionalRefs
		]) {
			const target = path.resolve(record.path, normalizeGitPathForFilesystem(await requireGit(record.path, [
				"rev-parse",
				"--git-path",
				name
			], options))) + ".lock";
			assertCurrent();
			await fs$1.mkdir(path.dirname(target), { recursive: true });
			assertCurrent();
			const handle = await fs$1.open(target, "wx", 384);
			const stat = await handle.stat();
			held.push({
				path: target,
				handle,
				dev: stat.dev,
				ino: stat.ino
			});
		}
		assertCurrent();
		return await run();
	} finally {
		for (const lock of held.toReversed()) {
			await lock.handle.close();
			const current = await fs$1.lstat(lock.path).catch(missingPathOrThrow);
			if (current?.dev === lock.dev && current.ino === lock.ino) await fs$1.unlink(lock.path);
		}
	}
}
/** Archive the original inode tree: Git locks cannot revoke pre-existing workfile writers. */
async function retireExactWorktree(params) {
	const { record, git } = params;
	const destination = path.join(path.dirname(record.path), params.retirementName);
	const source = await fs$1.lstat(record.path);
	if (!source.isDirectory()) throw new Error("Exact-state source is no longer a directory; source preserved");
	if (await fs$1.lstat(destination).catch(missingPathOrThrow)) throw new Error("Exact-state retirement destination is occupied; source preserved");
	await git.require(record.repoRoot, [
		"worktree",
		"move",
		"--",
		record.path,
		destination
	], {
		signal: params.signal,
		beforeRun: params.assertCurrent,
		killProcessTree: true
	});
	const moved = await fs$1.lstat(destination);
	if (moved.dev !== source.dev || moved.ino !== source.ino) throw new Error("Exact-state source identity changed; quarantined source and recovery snapshot preserved");
	let retired = false;
	try {
		const quarantined = {
			...record,
			path: destination
		};
		return await withExactStateGitLocks(quarantined, params.assertCurrent, async () => {
			await params.verify(quarantined);
			params.signal?.throwIfAborted();
			params.assertCurrent();
			retired = true;
			return await params.finalize(destination);
		});
	} catch (error) {
		if (!retired) try {
			await requireGit(record.repoRoot, [
				"worktree",
				"move",
				"--",
				destination,
				record.path
			], {
				beforeRun: params.assertRollbackCurrent,
				killProcessTree: true
			});
			await requireGit(record.repoRoot, [
				"update-ref",
				"-d",
				`refs/openclaw/removals/${record.id}`,
				params.snapshot
			], {
				beforeRun: params.assertRollbackCurrent,
				killProcessTree: true
			});
		} catch (rollbackError) {
			throw new AggregateError([error, rollbackError], `Exact-state retirement stopped; source retained at ${destination} and recovery snapshot preserved`, { cause: rollbackError });
		}
		throw error;
	}
}
/** Synchronous admission/finalization fence after asynchronous native checks. */
function assertExactStateSourceIdentity(target, metadata) {
	const stat = lstatSync(target, {
		bigint: true,
		throwIfNoEntry: false
	});
	if (!stat?.isDirectory() || stat.dev.toString() !== metadata.sourceIdentity.device || stat.ino.toString() !== metadata.sourceIdentity.inode) throw new Error("Retained exact-state source identity changed; sources and snapshot preserved");
}
async function requireExactWorktreeRepository(record, sourcePath, options) {
	const commonAt = async (cwd) => await canonicalPathKey(path.resolve(cwd, normalizeGitPathForFilesystem(await requireGit(cwd, ["rev-parse", "--git-common-dir"], options))));
	if (await commonAt(sourcePath) !== await commonAt(record.repoRoot)) throw new Error("Retained exact-state repository changed; source preserved");
}
async function hasExactWorktreeIndex(sourcePath, metadata, options) {
	const index = path.resolve(sourcePath, normalizeGitPathForFilesystem(await requireGit(sourcePath, [
		"rev-parse",
		"--git-path",
		"index"
	], options)));
	const original = await fs$1.readFile(index).catch(missingPathOrThrow);
	if (!original) return false;
	if (createHash("sha256").update(original).digest("hex") !== metadata.indexSha256) throw new Error("Retained exact-state index changed; source and snapshot preserved");
	if (metadata.sharedIndex) {
		const bytes = await fs$1.readFile(path.join(path.dirname(index), metadata.sharedIndex.name)).catch(missingPathOrThrow);
		if ((bytes && createHash(metadata.head.length === 64 ? "sha256" : "sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex")) !== metadata.sharedIndex.blob) throw new Error("Retained exact-state shared index changed; source and snapshot preserved");
	}
	return true;
}
/** Prefer the retained original tree, preserving even writes through old descriptors. */
async function restoreRetiredExactWorktree(params) {
	const { record, metadata, options, assertCurrent } = params;
	const retained = path.join(path.dirname(record.path), metadata.retirementName);
	const statAt = async (target) => await fs$1.lstat(target, { bigint: true }).catch(missingPathOrThrow);
	const [retainedStat, liveStat, registrations] = await Promise.all([
		statAt(retained),
		statAt(record.path),
		listGitWorktrees(record.repoRoot)
	]);
	const retainedRegistered = registrations.some((entry) => entry.path === retained);
	const liveRegistered = registrations.some((entry) => entry.path === record.path);
	if (!retainedStat && !retainedRegistered && !liveStat && !liveRegistered) return;
	if (!retainedStat && !retainedRegistered && liveStat?.isDirectory() && !liveRegistered && (await fs$1.readdir(record.path)).length === 0) return;
	if ((retainedStat || retainedRegistered) && (liveStat || liveRegistered)) throw new Error("Exact-state live path is occupied; both sources and snapshot preserved");
	const alreadyMoved = !retainedStat && !retainedRegistered;
	const sourcePath = alreadyMoved ? record.path : retained;
	const stat = alreadyMoved ? liveStat : retainedStat;
	const registered = alreadyMoved ? liveRegistered : retainedRegistered;
	if (!stat?.isDirectory() || !registered || stat.dev.toString() !== metadata.sourceIdentity.device || stat.ino.toString() !== metadata.sourceIdentity.inode) throw new Error("Retained exact-state source identity or registration changed; source preserved");
	await requireExactWorktreeRepository(record, sourcePath, options);
	const archived = {
		...record,
		path: sourcePath,
		removedAt: void 0
	};
	return await withExactStateGitLocks(archived, assertCurrent, async () => {
		await requireExactManagedWorktreeHead(archived, {
			ownerKind: record.ownerKind,
			ownerId: record.ownerId,
			createdAt: record.createdAt,
			lastActiveAt: record.lastActiveAt,
			head: metadata.head,
			branchHead: metadata.branchHead,
			indexSha256: metadata.indexSha256
		}, options);
		if (!await hasExactWorktreeIndex(sourcePath, metadata, options)) throw new Error("Retained exact-state index missing; source and snapshot preserved");
		const beforeMove = () => {
			assertCurrent();
			assertExactStateSourceIdentity(sourcePath, metadata);
		};
		beforeMove();
		if (!alreadyMoved) await requireGit(record.repoRoot, [
			"worktree",
			"move",
			"--",
			retained,
			record.path
		], {
			beforeRun: beforeMove,
			killProcessTree: true
		});
		assertCurrent();
		assertExactStateSourceIdentity(record.path, metadata);
		return await params.finalize();
	});
}
//#endregion
export { worktreeOwnerMatches as A, generateName as C, runSetupScript as D, resolveRepositoryFromRealPath as E, requireWorktreeDiskSpace as F, withWorktreeAllocationLease as I, directorySizeBytes as M, estimateWorktreeCheckoutTransitionBytes as N, validateName as O, estimateWorktreeGitBytes as P, findWorktreeByName as S, resolveRepository as T, WorktreeSnapshotError as _, removeManagedCheckout as a, canResetFailedWorktreeAdd as b, requireManagedWorktreeHead as c, withExactStateGitLocks as d, canonicalPathKey as f, WorktreeRemovalLockError as g, WorktreeBranchMovedError as h, prepareSnapshotBranchDeletion as i, WORKTREE_SETUP_HEADROOM_BYTES as j, withWorktreeSource as k, restoreRetiredExactWorktree as l, shouldPreserveOrphanCandidate as m, assertExactStateSourceIdentity as n, requireExactManagedWorktreeHead as o, resolveManagedWorktreePathKeys as p, hasExactWorktreeIndex as r, requireExactWorktreeRepository as s, assertExactStateOwner as t, retireExactWorktree as u, classifyWorktreeRemovalError as v, resetFailedWorktreeAdd as w, cleanupFailedCreate as x, isWorktreePermissionError as y };
