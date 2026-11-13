import { t as hasNodeErrorCode } from "./path-guards-CH7noY0Z.mjs";
import { n as resolvePathViaExistingAncestorSync$1 } from "./boundary-path-CAv_plX7.mjs";
import { n as formatErrorMessageWithCode } from "./errors-YPvSaqwO.mjs";
import { s as createPrivateSqliteDirectory } from "./sqlite-snapshot-staging-C3ICAs3m.mjs";
import { u as retainSnapshotWork } from "./sqlite-readonly-location-cleanup-HvAn98XM.mjs";
import { Fn as object, Jn as string, Nt as array, Pn as number, Un as record } from "./schemas-BOYIvvln.mjs";
import { c as sha256File, l as syncDirectory, s as requireDirectorySync, t as ensureDurableDirectory } from "./directory-durability-fWp4i1Sl.mjs";
import { a as discoverUpdateStateSchemaInspectionInProcess, h as runUpdateStateInspectionWorker, m as parseUpdateStateInspectionWorker, p as readUpdateStateDatabaseSizes, r as UpdateStateSchemaInspectionPlanSchema } from "./update-candidate-state-DSdpv9IU.mjs";
import { n as formatDiskSpaceBytes, r as tryReadDiskSpace } from "./disk-space-CtKhSv74.mjs";
import { t as measureUpdateStateFiles } from "./update-candidate-io-pRtgvOhr.mjs";
import { t as readUpdateDatabaseGenerations } from "./update-database-generations-DSv4_5gN.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import { sameFileIdentity } from "@openclaw/fs-safe/advanced";
//#region src/infra/update-database-backup.ts
const UpdateDatabaseBackupSchema = object({
	directory: string(),
	databases: array(object({
		path: string(),
		snapshotPath: string(),
		userVersion: number().int().nonnegative(),
		sha256: string().regex(/^[a-f0-9]{64}$/u),
		sizeBytes: number().int().nonnegative()
	})),
	missingPaths: array(string()),
	sourcePaths: array(string()),
	sourceGenerations: record(string(), string().nullable()),
	warnings: array(string())
});
async function inspectRestorableDatabaseFiles(databases, previous) {
	const identities = /* @__PURE__ */ new Map();
	for (const database of databases) for (const suffix of [
		"",
		"-wal",
		"-shm",
		"-journal"
	]) {
		const file = `${database}${suffix}`;
		let info;
		try {
			info = await fs.lstat(file);
		} catch (error) {
			if (suffix && hasNodeErrorCode(error, "ENOENT")) continue;
			throw error;
		}
		if (!info.isFile() || info.nlink !== 1) throw new Error(`Update database rollback requires a regular file with one link: ${file}. Resolve database aliases before retrying; the databases have not been migrated.`);
		const before = previous?.get(file);
		if (before && !sameFileIdentity(before, info)) throw new Error(`Update database file changed during backup: ${file}.`);
		identities.set(file, info);
	}
	return identities;
}
async function checkDatabaseBackupSpace(directory, files) {
	const { bytes, largest, families } = await measureUpdateStateFiles(files);
	const warnings = [];
	const check = (target, requiredBytes, purpose) => {
		const space = tryReadDiskSpace(target);
		if (space && space.availableBytes < requiredBytes) throw new Error(`${purpose} needs ${formatDiskSpaceBytes(requiredBytes)} near ${target}, but only ${formatDiskSpaceBytes(space.availableBytes)} is available. Free disk space before retrying; the databases have not been migrated.`);
		if (!space) warnings.push(`Available disk space could not be measured near ${target}; database backup will be attempted.`);
	};
	const reserve = 67108864;
	check(directory, bytes === 0 ? 0 : 2 * bytes + 3 * largest + reserve, "Update database backup");
	const backupDevice = (await fs.stat(directory, { bigint: true })).dev;
	const sources = /* @__PURE__ */ new Map();
	for (const family of families) {
		const sourceDirectory = path.dirname(family.path);
		const device = (await fs.stat(sourceDirectory, { bigint: true })).dev;
		if (device > 0n && device === backupDevice) continue;
		const key = device > 0n ? device : sourceDirectory;
		let source = sources.get(key);
		if (!source) {
			source = {
				directory: sourceDirectory,
				bytes: 0,
				largest: 0
			};
			sources.set(key, source);
			if (device === 0n) warnings.push(`Filesystem identity is unavailable near ${sourceDirectory}; restore space is checked separately.`);
		}
		source.bytes += family.bytes;
		source.largest = Math.max(source.largest, family.bytes);
	}
	for (const source of sources.values()) check(source.directory, source.bytes + source.largest + reserve, "Update database rollback");
	return warnings;
}
async function canonicalDatabaseInventory(plan) {
	const present = /* @__PURE__ */ new Set();
	const missing = /* @__PURE__ */ new Set();
	for (const [, database] of plan.files) for (const spelling of database.spellings) try {
		present.add(await fs.realpath(spelling));
	} catch (error) {
		if (!hasNodeErrorCode(error, "ENOENT")) throw error;
		if (await fs.lstat(spelling).catch((cause) => {
			if (!hasNodeErrorCode(cause, "ENOENT")) throw cause;
		})) throw new Error(`Update database path cannot be resolved: ${spelling}`, { cause: error });
		missing.add(resolvePathViaExistingAncestorSync$1(spelling));
	}
	return {
		present: [...present].toSorted(),
		missing: [...missing].toSorted(),
		sourcePaths: [...new Set(plan.files.flatMap(([, database]) => database.spellings))].toSorted()
	};
}
/** Read-only capture; the caller separately decides whether automatic restoration is safe. */
async function createUpdateDatabaseBackupInProcess(input) {
	const directory = await fs.realpath(`${input.backupRoot}.databases`);
	const inventory = await canonicalDatabaseInventory(input.inspectionPlan);
	const identities = await inspectRestorableDatabaseFiles(inventory.present);
	const warnings = await checkDatabaseBackupSpace(directory, inventory.present);
	const { buildBackupArchivePath } = await import("./backup-shared-Dmtg8JbG.mjs");
	const { createVerifiedSqliteSnapshot } = await import("./sqlite-snapshot-Bb4ZpYp_.mjs");
	const databases = [];
	const sourceGenerations = Object.fromEntries(inventory.missing.map((file) => [file, null]));
	const readGeneration = (file) => {
		try {
			return readUpdateDatabaseGenerations([file])[file] ?? void 0;
		} catch (error) {
			warnings.push(`Database write generation unavailable for ${file}: ${formatErrorMessageWithCode(error)}`);
			return;
		}
	};
	for (const sourcePath of inventory.present) {
		input.onProgress?.({
			phase: "pre-migration database backup",
			path: sourcePath
		});
		const archivePath = buildBackupArchivePath("", sourcePath);
		let parent = directory;
		for (const component of path.posix.dirname(archivePath).split("/")) {
			parent = path.join(parent, component);
			await ensureDurableDirectory({
				directoryPath: parent,
				create: createPrivateSqliteDirectory
			});
		}
		const snapshotPath = path.join(directory, archivePath);
		const before = readGeneration(sourcePath);
		const snapshot = await createVerifiedSqliteSnapshot({
			sourcePath,
			targetPath: snapshotPath,
			sourceAcquisition: {
				mode: "isolated-process",
				stagingRoot: input.stagingRoot
			},
			preserveRowIds: true,
			requireNonEmptySource: true
		});
		const after = readGeneration(sourcePath);
		if (after !== void 0 && before === after) sourceGenerations[sourcePath] = after;
		else warnings.push(`Database changed during capture; its snapshot requires manual recovery: ${sourcePath}`);
		const { digest, bytes: sizeBytes } = await sha256File(snapshotPath);
		databases.push({
			path: sourcePath,
			snapshotPath,
			userVersion: snapshot.userVersion,
			sha256: digest,
			sizeBytes
		});
	}
	const current = await canonicalDatabaseInventory(await discoverUpdateStateSchemaInspectionInProcess(input));
	if (JSON.stringify(current) !== JSON.stringify(inventory)) throw new Error("Update database inventory changed during backup; retry after writers stop.");
	await inspectRestorableDatabaseFiles(inventory.present, identities);
	return {
		directory,
		databases,
		missingPaths: inventory.missing,
		sourcePaths: inventory.sourcePaths,
		sourceGenerations,
		warnings
	};
}
/** Retain raw, verified database files separately from the old package fingerprint. */
async function createUpdateDatabaseBackup({ nodeRunner = process.execPath, timeoutMs, signal: callerSignal, ...input }) {
	const controller = new AbortController();
	const signal = callerSignal ? AbortSignal.any([callerSignal, controller.signal]) : controller.signal;
	const work = (async () => {
		signal.throwIfAborted();
		const backupRoot = path.resolve(input.backupRoot);
		const directory = `${backupRoot}.databases`;
		await createPrivateSqliteDirectory(directory);
		const identity = await fs.lstat(directory);
		try {
			const sourceEnv = input.env ?? process.env;
			const worker = {
				nodeRunner,
				timeoutMs,
				signal,
				sourceEnv,
				stagingRoot: directory
			};
			const workerInput = {
				...input,
				backupRoot,
				stagingRoot: directory
			};
			const shared = path.resolve(input.stateDir, "state", "openclaw.sqlite");
			const inspectionPlan = parseUpdateStateInspectionWorker(await runUpdateStateInspectionWorker({
				...worker,
				input: {
					...workerInput,
					mode: "discover"
				},
				databases: await readUpdateStateDatabaseSizes([shared], worker)
			}), UpdateStateSchemaInspectionPlanSchema);
			const files = inspectionPlan.files.flatMap(([, database]) => database.spellings);
			const backup = parseUpdateStateInspectionWorker(await runUpdateStateInspectionWorker({
				...worker,
				input: {
					...workerInput,
					mode: "database-backup",
					inspectionPlan
				},
				databases: await readUpdateStateDatabaseSizes(files, worker)
			}), UpdateDatabaseBackupSchema);
			if (!sameFileIdentity(identity, await fs.lstat(directory))) throw new Error(`Database backup directory changed during capture: ${directory}.`);
			requireDirectorySync(await syncDirectory(path.dirname(directory)), "Database backup parent");
			return backup;
		} catch (error) {
			throw new Error(`${formatErrorMessageWithCode(error)}. Database backup files retained at ${directory}.`, { cause: error });
		}
	})();
	return retainSnapshotWork(work, () => controller.abort());
}
//#endregion
export { createUpdateDatabaseBackupInProcess as n, createUpdateDatabaseBackup as t };
