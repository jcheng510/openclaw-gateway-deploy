import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { a as isPidDefinitelyDead, n as getFileLockProcessStartTime, o as readDarwinProcessIdentity, t as collectProcessAncestorPids } from "./pid-alive-DB0zHgvx.mjs";
import { t as acquireFileLockSync } from "./file-lock-manager-D-LVVqdD.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { c as prepareSqliteQueryTakeFirstSync, i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync, s as prepareSqliteQuerySync, u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { r as enableNodeSqliteKyselyStatementCache } from "./kysely-sync-cache-state-BlM1eqOk.mjs";
import { i as resolveExistingSqliteFileUri, t as openNodeSqliteDatabase } from "./node-sqlite-B4hwsR7e.mjs";
import { n as resolvePreferredOpenClawTmpDir } from "./tmp-openclaw-dir-BSb3HetY.mjs";
import { i as setSqliteBusyTimeout, r as runWithSqliteBusyTimeout } from "./sqlite-busy-timeout-DYrW2wFu.mjs";
import { d as createPrivateWindowsFile } from "./sqlite-snapshot-staging-C3ICAs3m.mjs";
import { a as runSqliteImmediateTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import { Et as _enum, Jn as string, Nt as array, Pn as number, Yt as discriminatedUnion, or as union, qn as strictObject, xn as literal } from "./schemas-BOYIvvln.mjs";
import { t as safeParseJsonWithSchema } from "./zod-parse-Bip-sZi_.mjs";
import { n as isLockOwnerDefinitelyStale } from "./stale-lock-file-C3Y3xG1t.mjs";
import { n as isChildProcessTreeAlive } from "./child-process-tree-CcnXowa8.mjs";
import { t as resolveServiceManagerEnv } from "./service-process-env-DzXjpjx4.mjs";
import { p as syncDirectorySync, s as requireDirectorySync } from "./directory-durability-fWp4i1Sl.mjs";
import { i as tryResolvePathCaseInsensitive } from "./path-case-BjTaHmBw.mjs";
import { u as readWindowsProcessArgsSync } from "./gateway-owner-lease-_oTp5UxR.mjs";
import { r as getSelfAndAncestorPidsSync } from "./restart-stale-pids-H5ziMy3J.mjs";
import fs from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import os from "node:os";
import { isDeepStrictEqual } from "node:util";
import { spawnSync } from "node:child_process";
import { sameFileIdentity } from "@openclaw/fs-safe/advanced";
//#region src/infra/update-managed-service-handoff-schema.ts
const text$1 = string().min(1).max(4096);
const nativeProcessIdentityShape = {
	pid: number().int().positive(),
	startIdentity: text$1.max(128)
};
const processIdentitySchema = strictObject({
	...nativeProcessIdentityShape,
	startIdentitySource: literal("argv-sha256").nullable().optional()
}).refine(({ startIdentity, startIdentitySource }) => startIdentitySource === "argv-sha256" ? /^win32-argv-sha256:[a-f0-9]{64}$/.test(startIdentity) : !startIdentity.startsWith("win32-argv-sha256:"));
const managedHandoffBootSchema = union([
	strictObject({
		platform: _enum(["linux", "darwin"]),
		identity: string().regex(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i)
	}),
	strictObject({
		platform: literal("win32"),
		identity: string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{7}Z$/)
	}),
	strictObject({
		platform: literal("freebsd"),
		identity: string().regex(/^[a-f0-9]{32}$/)
	})
]);
const nativeLifetimeSchema = strictObject({
	kind: literal("native"),
	unit: text$1,
	scope: text$1,
	placement: discriminatedUnion("kind", [strictObject({ kind: literal("pending") }), strictObject({
		kind: literal("attached"),
		invocation: string().regex(/^[a-f0-9]{32}$/i)
	})])
});
const cancellationProtocol = literal("original-cancellation-v1");
const updateAction = strictObject({
	kind: literal("update"),
	mutationProtocol: cancellationProtocol
}).extend({ mutationProtocol: cancellationProtocol.optional() });
const actionSchema = discriminatedUnion("kind", [updateAction, strictObject({
	kind: literal("triage"),
	phase: _enum([
		"reserved",
		"running",
		"closing",
		"closed",
		"uncertain"
	]),
	lifetime: discriminatedUnion("kind", [strictObject({
		kind: literal("foreground"),
		boot: managedHandoffBootSchema
	}), nativeLifetimeSchema])
}).refine((action) => action.phase !== "running" || action.lifetime.kind !== "native" || action.lifetime.placement.kind === "attached")]);
const sourcePath = text$1.refine(path.isAbsolute, "Native source path must be absolute");
const digest = string().regex(/^[a-f0-9]{64}$/);
const nativeBorrowerSourceSchema = strictObject({
	runId: text$1,
	transactionId: text$1,
	claimId: text$1,
	revision: number().int().nonnegative(),
	recordSha256: digest,
	serviceKey: sourcePath,
	configPaths: array(sourcePath).min(1).max(512),
	lifetimeId: text$1
});
const nativeBorrowerSchema = strictObject({
	id: string().uuid(),
	phase: _enum(["reserved", "admitted"]),
	source: nativeBorrowerSourceSchema
});
const commonPayload = {
	executor: processIdentitySchema,
	helper: processIdentitySchema,
	action: actionSchema
};
const originalUpdateSchema = strictObject({
	version: literal(2),
	executor: processIdentitySchema,
	helper: processIdentitySchema,
	action: updateAction
});
const originalGenerationSchema = strictObject({
	key: text$1,
	owner: text$1,
	payload: string().min(1),
	updatedAt: number().int().nonnegative()
});
const cancellingPayloadSchema = strictObject({
	version: literal(4),
	executor: processIdentitySchema,
	helper: processIdentitySchema,
	action: updateAction,
	cancellation: originalGenerationSchema
}).refine((value) => {
	try {
		const original = originalUpdateSchema.parse(JSON.parse(value.cancellation.payload));
		return JSON.stringify(original.helper) === JSON.stringify(value.helper) && JSON.stringify(original.executor) === JSON.stringify(value.executor) && JSON.stringify(original.action) === JSON.stringify(value.action) && (JSON.stringify(value.helper) === JSON.stringify(value.executor) || original.action.mutationProtocol === "original-cancellation-v1");
	} catch {
		return false;
	}
});
const currentPayloadSchema = strictObject({
	version: literal(2),
	...commonPayload,
	mutationOriginal: originalGenerationSchema.optional()
}).refine((value) => {
	if (!value.mutationOriginal) return true;
	try {
		const original = originalUpdateSchema.parse(JSON.parse(value.mutationOriginal.payload));
		return !value.mutationOriginal.key.includes("/.openclaw-update-child-") && original.action.mutationProtocol === "original-cancellation-v1";
	} catch {
		return false;
	}
});
const payloadSchema = discriminatedUnion("version", [
	cancellingPayloadSchema,
	currentPayloadSchema,
	strictObject({
		version: literal(3),
		...commonPayload,
		action: strictObject({ kind: literal("update") }),
		nativeBorrower: nativeBorrowerSchema
	})
]);
const retiredPayloadSchema = strictObject({
	version: literal(1),
	...nativeProcessIdentityShape
});
function parseManagedHandoffLeasePayload(value) {
	return safeParseJsonWithSchema(payloadSchema, value);
}
/** Distinguish an exactly decoded retired record from unreadable prospective data. */
function parseRetiredManagedHandoffLeasePayload(value) {
	return safeParseJsonWithSchema(retiredPayloadSchema, value);
}
function isRetiredManagedHandoffLeasePayload(value) {
	return parseRetiredManagedHandoffLeasePayload(value) !== null;
}
//#endregion
//#region src/infra/update-managed-service-handoff-boot.ts
/** Bind the lease environment without caching boot identity or selecting an OS early. */
function createManagedHandoffBootIdentityReader(serviceManagerEnv) {
	return function bootIdentity() {
		let value;
		if (process.platform === "linux") value = fs.readFileSync("/proc/sys/kernel/random/boot_id", "utf8").trim();
		else if (process.platform === "freebsd") {
			const result = spawnSync("/sbin/sysctl", ["-b", "kern.boot_id"], {
				env: serviceManagerEnv,
				timeout: 1e3,
				maxBuffer: 16,
				killSignal: "SIGKILL",
				stdio: [
					"ignore",
					"pipe",
					"ignore"
				]
			});
			if (!result.error && result.status === 0 && Buffer.isBuffer(result.stdout) && result.stdout.length === 16) value = result.stdout.toString("hex");
		} else if (process.platform === "darwin" || process.platform === "win32") {
			const windows = process.platform === "win32";
			const result = spawnSync(windows ? "powershell.exe" : "/usr/sbin/sysctl", windows ? [
				"-NoProfile",
				"-NonInteractive",
				"-Command",
				"(Get-CimInstance -ClassName Win32_OperatingSystem).LastBootUpTime.ToUniversalTime().ToString('o')"
			] : ["-n", "kern.bootsessionuuid"], {
				env: serviceManagerEnv,
				encoding: "utf8",
				timeout: windows ? 5e3 : 1e3,
				killSignal: "SIGKILL",
				windowsHide: true,
				stdio: [
					"ignore",
					"pipe",
					"ignore"
				]
			});
			if (!result.error && result.status === 0) value = result.stdout.trim();
		}
		const boot = {
			platform: process.platform,
			identity: process.platform === "win32" ? value : value?.toLowerCase()
		};
		const parsed = managedHandoffBootSchema.safeParse(boot);
		if (!parsed.success) throw new Error("OS boot identity unavailable; run openclaw triage manually");
		return parsed.data;
	};
}
//#endregion
//#region src/infra/file-lock-sync.ts
/** Synchronous lock for legacy stores that cannot transact in SQLite yet. */
function acquireFileLockSyncWithRetry(path) {
	rejectUnsupportedLockPath(`${path}.lock`);
	const processStartTime = getFileLockProcessStartTime(process.pid);
	const createPayload = () => ({
		pid: process.pid,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		...processStartTime === null ? {} : { starttime: processStartTime }
	});
	const isStale = ({ payload }) => isLockOwnerDefinitelyStale({ payload: isRecord(payload) ? payload : null });
	const lock = acquireFileLockSync(path, {
		staleMs: 3e4,
		retry: {
			retries: 9,
			factor: 1,
			minTimeout: 20,
			maxTimeout: 20,
			randomize: false
		},
		staleRecovery: "remove-if-unchanged",
		payload: createPayload,
		shouldReclaim: isStale,
		shouldRemoveStaleLock: isStale
	});
	return () => lock.release();
}
function rejectUnsupportedLockPath(lockPath) {
	let observed;
	try {
		observed = fs.lstatSync(lockPath);
	} catch (error) {
		if (error.code === "ENOENT") return;
		throw error;
	}
	if (observed.isFile() && !observed.isSymbolicLink()) return;
	if (!observed.isDirectory() || observed.isSymbolicLink()) throw new Error(`Storage lock path has an unsupported legacy type: ${lockPath}`);
	throw Object.assign(/* @__PURE__ */ new Error(`Legacy storage lock requires manual removal after verifying no older OpenClaw process is running: ${lockPath}`), {
		code: "file_lock_stale",
		lockPath
	});
}
//#endregion
//#region src/infra/sqlite-existing-database.ts
/** Reuse only the handle, never a snapshot, validation result, or authority. */
function createExistingSqliteRollbackReader(pathname, options) {
	const retained = {};
	let disposed = false;
	const close = () => {
		const database = retained.database;
		retained.database = void 0;
		if (database?.isOpen) database.close();
	};
	return Object.assign((operation) => {
		if (disposed || retained.database?.isTransaction) throw new Error("Existing SQLite reader is closed or already in use.");
		try {
			return withExistingRollbackDatabase(pathname, {
				...options,
				write: false
			}, operation, retained);
		} catch (error) {
			close();
			throw error;
		}
	}, { [Symbol.dispose]() {
		disposed = true;
		close();
	} });
}
/** Keep a SQLite-owned read lock until the existing writer has acquired its lock. */
function withExistingSqliteRollbackDatabase(pathname, options, operation) {
	return withExistingRollbackDatabase(pathname, options, operation);
}
function withExistingRollbackDatabase(pathname, options, operation, retained) {
	options.assertIdentity();
	if (fs.statSync(pathname).size === 0) throw new Error("Existing SQLite storage is empty.");
	const reader = retained?.database ?? openNodeSqliteDatabase(pathname, { readOnly: true });
	if (retained && !retained.database) {
		enableNodeSqliteKyselyStatementCache(reader);
		retained.database = reader;
	}
	let writer;
	let snapshotOpen = false;
	const releaseReader = () => {
		if (!reader.isOpen) return;
		try {
			if (snapshotOpen && reader.isTransaction) {
				reader.exec("PRAGMA locking_mode = NORMAL");
				reader.exec("ROLLBACK");
			}
			snapshotOpen = false;
		} finally {
			if (!retained) reader.close();
		}
	};
	try {
		options.assertIdentity();
		setSqliteBusyTimeout(reader, options.busyTimeoutMs);
		if (retained) reader.exec("PRAGMA shrink_memory; PRAGMA writable_schema = RESET");
		reader.exec("PRAGMA locking_mode = EXCLUSIVE");
		reader.exec("BEGIN");
		snapshotOpen = true;
		if (retained) reader.prepare("PRAGMA schema_version").get();
		const mode = reader.prepare("PRAGMA journal_mode").get()?.journal_mode;
		if (![
			"delete",
			"truncate",
			"persist"
		].includes(String(mode))) throw new Error("Existing SQLite storage requires rollback journal mode.");
		reader.exec("PRAGMA locking_mode = NORMAL");
		options.validate(reader);
		options.assertIdentity();
		if (!options.write) return operation(reader, () => {
			throw new Error("Read-only SQLite observation cannot admit a writer.");
		});
		writer = openNodeSqliteDatabase(resolveExistingSqliteFileUri(pathname));
		options.assertIdentity();
		setSqliteBusyTimeout(writer, options.busyTimeoutMs);
		const database = writer;
		let admitted = false;
		return operation(database, (write, transactionOptions) => {
			if (admitted && !database.isTransaction) throw new Error("Existing SQLite write admission has already settled.");
			options.assertIdentity();
			return runWithSqliteBusyTimeout(database, 0, (restore) => runSqliteImmediateTransactionSync(database, () => {
				if (!admitted) {
					admitted = true;
					releaseReader();
				}
				restore();
				options.assertIdentity();
				return write();
			}, transactionOptions));
		});
	} finally {
		try {
			if (writer?.isOpen) writer.close();
		} finally {
			releaseReader();
		}
	}
}
//#endregion
//#region src/infra/update-managed-service-handoff-store-repair.ts
/** Retain unusable coordination state for diagnostics before the caller provisions its replacement. */
function quarantineManagedHandoffStore(databasePath, defect, warn = (message) => console.warn(message)) {
	const retained = `${databasePath}.${defect}.${Date.now()}`;
	try {
		fs.renameSync(databasePath, retained);
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return;
		try {
			fs.rmSync(databasePath, { force: true });
		} catch {
			return;
		}
		warn(`[openclaw] managed handoff lease store was ${defect}; removed ${path.basename(databasePath)} to restore updates`);
		return;
	}
	warn(`[openclaw] managed handoff lease store was ${defect}; retained it as ${path.basename(retained)} and started a new one`);
	return retained;
}
//#endregion
//#region src/infra/update-managed-service-handoff-database.ts
const leaseQueries = (db) => getNodeSqliteKysely(db);
function initializeLeaseSchema(db) {
	executeSqliteQuerySync(db, leaseQueries(db).schema.createTable("managed_update_handoffs").ifNotExists().addColumn("install_root", "text", (column) => column.notNull().primaryKey()).addColumn("owner", "text", (column) => column.notNull()).addColumn("payload_json", "text", (column) => column.notNull()).addColumn("updated_at", "integer", (column) => column.notNull()).modifyEnd(sql`STRICT`));
}
function assertPath(stat, kind) {
	if (stat.isSymbolicLink() || !(kind === "directory" ? stat.isDirectory() : stat.isFile()) || kind === "file" && BigInt(stat.nlink) !== 1n || typeof process.getuid === "function" && BigInt(stat.uid) !== BigInt(process.getuid()) || process.platform !== "win32" && (BigInt(stat.mode) & 63n) !== 0n) throw new Error("managed handoff lease " + kind + " is unsafe");
}
/**
* Earlier writers created the file under the caller's umask and chmodded it
* after schema creation. Excess read bits on a path we own can therefore be
* that interrupted work. Restore the
* invariant instead of refusing, which would otherwise lock the product out of its
* own state for every install root until an operator deleted the file by hand.
*
* Excess bits here are defense in depth rather than a live exposure: assertPath
* enforces a 0700 owned directory on every read and every write, and a single
* link, so no other user could traverse to this inode or hold a descriptor on it
* whatever the file's own mode said. Write bits are still refused rather than
* repaired, because chmod cannot revoke a descriptor and integrity is the one
* thing the directory guarantee would not restore. Ownership, type and link count
* are likewise not ours to repair; all of those still refuse in assertPath.
*/
function repairPrivateFileMode(databasePath, stat) {
	if (process.platform === "win32" || (stat.mode & 63) === 0 || (stat.mode & 18) !== 0 || stat.isSymbolicLink() || !stat.isFile() || stat.nlink !== 1 || typeof process.getuid === "function" && stat.uid !== process.getuid()) return stat;
	fs.chmodSync(databasePath, 384);
	return fs.lstatSync(databasePath);
}
function assertSamePath(stat, expected, kind) {
	assertPath(stat, kind);
	if (process.platform === "win32" && [
		stat.dev,
		stat.ino,
		expected.dev,
		expected.ino
	].some((value) => value === 0 || value === 0n) || !sameFileIdentity(stat, expected)) throw new Error("managed handoff lease " + kind + " changed during initialization");
}
function createMissingDatabaseFile(databasePath, parentReceipt) {
	let descriptor;
	try {
		descriptor = process.platform === "win32" ? createPrivateWindowsFile(databasePath) : fs.openSync(databasePath, fs.constants.O_RDWR | fs.constants.O_CREAT | fs.constants.O_EXCL | fs.constants.O_NOFOLLOW, 384);
	} catch (error) {
		if (!hasErrnoCode(error, "EEXIST")) throw error;
	}
	try {
		if (descriptor !== void 0) {
			fs.fchmodSync(descriptor, 384);
			fs.fsyncSync(descriptor);
		}
		const identity = descriptor === void 0 ? repairPrivateFileMode(databasePath, fs.lstatSync(databasePath)) : fs.fstatSync(descriptor, { bigint: true });
		assertSamePath(descriptor === void 0 ? fs.lstatSync(databasePath) : fs.lstatSync(databasePath, { bigint: true }), identity, "file");
		assertSamePath(fs.lstatSync(parentReceipt.path, { bigint: true }), parentReceipt.identity, "directory");
		const directorySync = syncDirectorySync(parentReceipt);
		requireDirectorySync(directorySync, "Managed handoff lease directory");
	} finally {
		if (descriptor !== void 0) fs.closeSync(descriptor);
	}
}
/**
* Bytes we could never adopt: the path is not our regular single-linked file, or
* it carries write bits, which mean a descriptor we cannot revoke may already
* exist. Excess read bits are excluded — repairPrivateFileMode restores those in
* place, because the store sets 0600 after every write and keeps its directory
* private, so they are its own interrupted work.
*/
function isUnadoptableStore(stat) {
	return stat.isSymbolicLink() || !stat.isFile() || stat.nlink !== 1 || typeof process.getuid === "function" && stat.uid !== process.getuid() || process.platform !== "win32" && (stat.mode & 18) !== 0;
}
/** Capture only an already-admitted database, never provision one during recovery. */
function captureManagedUpdateLeaseDatabaseIdentity(databasePath) {
	const canonical = fs.realpathSync(databasePath);
	const file = fs.lstatSync(canonical, { bigint: true });
	const parent = fs.lstatSync(path.dirname(canonical), { bigint: true });
	assertPath(file, "file");
	assertPath(parent, "directory");
	return Object.freeze({
		databasePath: canonical,
		databaseIdentity: `${file.dev}:${file.ino}`,
		parentIdentity: `${parent.dev}:${parent.ino}`
	});
}
function assertManagedUpdateLeaseDatabaseIdentity(binding) {
	const actual = captureManagedUpdateLeaseDatabaseIdentity(binding.databasePath);
	if (actual.databasePath !== binding.databasePath || actual.databaseIdentity !== binding.databaseIdentity || actual.parentIdentity !== binding.parentIdentity) throw new Error("managed handoff lease database identity changed");
}
/** Existing managed-update lease storage; extraction does not change its schema. */
function createManagedHandoffLeaseDatabase(databasePath, existingIdentity) {
	if (existingIdentity && databasePath !== existingIdentity.databasePath) throw new Error("managed handoff lease database path changed");
	const existingTransactions = /* @__PURE__ */ new WeakMap();
	const validations = /* @__PURE__ */ new WeakMap();
	const existingOptions = existingIdentity ? {
		busyTimeoutMs: 5e3,
		assertIdentity: () => assertManagedUpdateLeaseDatabaseIdentity(existingIdentity),
		validate: (db) => {
			let validate = validations.get(db);
			if (!validate) {
				validate = prepareSqliteQuerySync(db, () => leaseQueries(db).selectFrom("managed_update_handoffs").selectAll().limit(0));
				validations.set(db, validate);
			}
			validate();
		}
	} : void 0;
	let readExisting;
	/**
	* The store keeps its directory at 0700, so drift on a directory we own is its
	* own interrupted work. Ownership and type stay the temp-root resolver's call.
	*/
	function recoverDirectoryMode(target) {
		if (process.platform === "win32") return;
		try {
			const stat = fs.lstatSync(target);
			if (stat.isDirectory() && !stat.isSymbolicLink() && (stat.mode & 63) !== 0 && (typeof process.getuid !== "function" || stat.uid === process.getuid())) fs.chmodSync(target, 448);
		} catch {}
	}
	/**
	* Coordination state lives in a shared temp directory, so a store we cannot
	* adopt used to end config mutation and native service operations for every
	* install root on the host, permanently and with no in-product recovery.
	* Retain it under a name recording the defect and leave a usable store behind.
	*
	* Repairers must not race: renaming on a stale observation lets one process
	* retain the clean store another already opened, leaving two authoritative
	* databases and defeating the lock this store exists to provide. The decision
	* is therefore retaken under the lock, where the replacement is visible.
	*/
	function recoverUnadoptableStore(target, parent) {
		if (!observeUnadoptable(target)) return;
		const release = acquireFileLockSyncWithRetry(target);
		try {
			if (!observeUnadoptable(target)) return;
			quarantineManagedHandoffStore(target, "unsafe-file");
			createMissingDatabaseFile(target, parent);
		} finally {
			release();
		}
	}
	function observeUnadoptable(target) {
		try {
			return isUnadoptableStore(fs.lstatSync(target));
		} catch {
			return false;
		}
	}
	function withDatabase(write, operation) {
		if (existingOptions) {
			const run = (db, transact) => {
				existingTransactions.set(db, transact);
				try {
					return operation(db);
				} finally {
					existingTransactions.delete(db);
				}
			};
			return !write && readExisting ? readExisting(run) : withExistingSqliteRollbackDatabase(databasePath, {
				...existingOptions,
				write
			}, run);
		}
		const dir = path.dirname(databasePath);
		if (write) {
			fs.mkdirSync(dir, {
				recursive: true,
				mode: 448
			});
			const stat = fs.lstatSync(dir);
			if (!stat.isDirectory() || stat.isSymbolicLink() || typeof process.getuid === "function" && stat.uid !== process.getuid()) throw new Error("managed handoff lease directory is unsafe");
			fs.chmodSync(dir, 448);
		}
		recoverDirectoryMode(dir);
		const directoryIdentity = fs.lstatSync(dir, { bigint: true });
		assertPath(directoryIdentity, "directory");
		recoverUnadoptableStore(databasePath, {
			path: dir,
			realPath: fs.realpathSync(dir),
			identity: directoryIdentity
		});
		if (write && !fs.existsSync(databasePath)) createMissingDatabaseFile(databasePath, {
			path: dir,
			realPath: fs.realpathSync(dir),
			identity: directoryIdentity
		});
		const databaseIdentity = repairPrivateFileMode(databasePath, fs.lstatSync(databasePath));
		assertPath(databaseIdentity, "file");
		const db = openNodeSqliteDatabase(write ? resolveExistingSqliteFileUri(databasePath) : databasePath, { readOnly: !write });
		try {
			assertSamePath(fs.lstatSync(dir, { bigint: true }), directoryIdentity, "directory");
			assertSamePath(fs.lstatSync(databasePath), databaseIdentity, "file");
			setSqliteBusyTimeout(db, 5e3);
			if (write) initializeLeaseSchema(db);
			return operation(db);
		} finally {
			if (db.isOpen) db.close();
		}
	}
	return Object.assign(withDatabase, {
		retainReadConnection() {
			if (!existingOptions || readExisting) throw new Error("Existing SQLite reader requires an unretained identity-bound store.");
			const reader = createExistingSqliteRollbackReader(databasePath, existingOptions);
			readExisting = reader;
			return { [Symbol.dispose]() {
				if (readExisting === reader) readExisting = void 0;
				reader[Symbol.dispose]();
			} };
		},
		transact(db, operation, options) {
			const assertCurrent = () => {
				if (existingIdentity) assertManagedUpdateLeaseDatabaseIdentity(existingIdentity);
			};
			assertCurrent();
			return (existingTransactions.get(db) ?? ((write, transactionOptions) => runSqliteImmediateTransactionSync(db, write, transactionOptions)))(() => {
				assertCurrent();
				return operation();
			}, {
				...options,
				withCommit: (commit) => {
					assertCurrent();
					commit();
				}
			});
		}
	});
}
//#endregion
//#region src/infra/update-managed-service-handoff-original-owner.ts
/** Validate the unchanged acquisition object, never a decoded or copied row. */
function readManagedHandoffOriginalAdmission(original, admissions, existingIdentity, processState) {
	const receipt = admissions.get(original);
	if (!receipt || !existingIdentity || receipt.database.databasePath !== existingIdentity.databasePath || receipt.database.databaseIdentity !== existingIdentity.databaseIdentity || receipt.database.parentIdentity !== existingIdentity.parentIdentity || !isDeepStrictEqual(receipt.original, original) || original.version !== 2 || original.mutationOriginal || original.action.kind !== "update" || original.action.mutationProtocol !== "original-cancellation-v1" || original.key.includes("/.openclaw-update-child-") || original.helper.pid !== process.pid || !isDeepStrictEqual(original.helper, original.executor) || processState(original.helper) !== "live") return;
	return receipt;
}
/** Generic release, rebind and process-death reclamation cannot erase a bound
* original generation or remove its cancellation protocol. */
function hasOriginalUpdateExecutorCustody(lease, action = lease.action) {
	return lease.version === 2 && lease.action.kind === "update" && lease.action.mutationProtocol === "original-cancellation-v1" && !lease.key.includes("/.openclaw-update-child-") && (!isDeepStrictEqual(lease.helper, lease.executor) || action.kind !== "update" || action.mutationProtocol !== "original-cancellation-v1");
}
/** Query existing native lineage, not a second authority registry. Top-level
* occupied slots are not child-name aliases and must settle before generation changes. */
function readOriginalUpdateDependents(lease, db) {
	const original = {
		key: lease.key,
		owner: lease.owner,
		payload: lease.payload,
		updatedAt: lease.updatedAt
	};
	return executeSqliteQuerySync(db, leaseQueries(db).selectFrom("managed_update_handoffs").select(["install_root", "payload_json"])).rows.flatMap((entry) => {
		const payload = parseManagedHandoffLeasePayload(entry.payload_json);
		return payload?.version === 2 && isDeepStrictEqual(payload.mutationOriginal, original) ? [entry.install_root] : [];
	});
}
//#endregion
//#region src/infra/update-managed-service-handoff-cancellation.ts
function createManagedHandoffCancellation(deps) {
	const { existingIdentity, originalUpdateAdmissions, withDatabase, transact, mutationCurrent, storedCurrent, childAliases, canRelease, handle, updateRow, deleteRow, processState } = deps;
	const cancellations = /* @__PURE__ */ new WeakMap();
	function cancelUpdate(original, requestedRetained) {
		const admission = readManagedHandoffOriginalAdmission(original, originalUpdateAdmissions, existingIdentity, processState);
		if (!admission) return null;
		const lease = admission.original;
		const retained = requestedRetained;
		if (retained && (retained.key === lease.key || retained.key.includes("/.openclaw-update-child-") || retained.version !== 2 || retained.mutationOriginal || retained.action.kind !== "update" || retained.helper.pid !== process.pid || !isDeepStrictEqual(retained.helper, retained.executor) || processState(retained.helper) !== "live")) return null;
		const previous = cancellations.get(original);
		if (previous) return withDatabase(true, (db) => transact(db, () => isDeepStrictEqual(previous.retainedOriginal, retained) && storedCurrent(previous.lease, db) && (!previous.retained || storedCurrent(previous.retained, db)))) ? previous : null;
		const descendants = (db, parent) => {
			const prefix = `${parent.key}/.openclaw-update-child-`;
			return executeSqliteQuerySync(db, leaseQueries(db).selectFrom("managed_update_handoffs").select([
				"install_root",
				"owner",
				"payload_json",
				"updated_at"
			]).where("install_root", ">=", prefix).where("install_root", "<", prefix + "￿")).rows;
		};
		const transitioned = withDatabase(true, (db) => transact(db, () => {
			if (!mutationCurrent(lease, db) || retained && !mutationCurrent(retained, db)) return null;
			const originalChildren = descendants(db, lease);
			if (originalChildren.some((entry) => {
				const child = handle(entry.install_root, entry);
				return child.version !== 2 || child.action.kind !== "update" || child.action.mutationProtocol !== "original-cancellation-v1";
			})) return null;
			const originalKeys = new Set(originalChildren.map((entry) => entry.install_root));
			if (retained && descendants(db, retained).some((entry) => {
				const child = handle(entry.install_root, entry);
				return child.version !== 2 || child.action.kind !== "update" || !childAliases(child.key, db).some((key) => originalKeys.has(key));
			})) return null;
			const transition = (currentRow) => {
				const payload = JSON.stringify({
					version: 4,
					helper: currentRow.helper,
					executor: currentRow.executor,
					action: currentRow.action,
					cancellation: {
						key: currentRow.key,
						owner: currentRow.owner,
						payload: currentRow.payload,
						updatedAt: currentRow.updatedAt
					}
				});
				if (!parseManagedHandoffLeasePayload(payload)) throw new Error("Original cancellation payload is invalid");
				const updatedAt = Math.max(Date.now(), currentRow.updatedAt + 1);
				if (!updateRow(db, currentRow, {
					payload_json: payload,
					updated_at: updatedAt
				})) throw new Error("Original cancellation generation changed");
				return handle(currentRow.key, {
					owner: currentRow.owner,
					payload_json: payload,
					updated_at: updatedAt
				});
			};
			return {
				lease: transition(lease),
				retained: retained ? transition(retained) : void 0
			};
		}));
		if (!transitioned) return null;
		const generations = [transitioned.lease, ...transitioned.retained ? [transitioned.retained] : []];
		const successor = {
			...transitioned,
			retainedOriginal: retained ? structuredClone(retained) : void 0,
			release: (paired = []) => withDatabase(true, (db) => transact(db, () => {
				if (processState(lease.helper) !== "live" || [lease, ...retained ? [retained] : []].some((parent) => readOriginalUpdateDependents(parent, db).some((key) => !paired.some((item) => item.key === key))) || new Set([...generations, ...paired].map((item) => item.key)).size !== generations.length + paired.length || paired.some((item) => item.version !== 2 || !isDeepStrictEqual(item.mutationOriginal, {
					key: lease.key,
					owner: lease.owner,
					payload: lease.payload,
					updatedAt: lease.updatedAt
				}) || !canRelease(item) || !storedCurrent(item, db) || descendants(db, item).length > 0 || readOriginalUpdateDependents(item, db).length > 0) || generations.some((generation) => !storedCurrent(generation, db) || descendants(db, generation).length > 0)) return false;
				for (const generation of [...generations, ...paired]) if (!deleteRow(db, generation.key, {
					owner: generation.owner,
					payload_json: generation.payload,
					updated_at: generation.updatedAt
				})) throw new Error("Original cancellation settlement changed");
				return true;
			}))
		};
		cancellations.set(original, successor);
		return successor;
	}
	return cancelUpdate;
}
//#endregion
//#region src/infra/update-managed-service-handoff-legacy-parent.ts
function readBorrowedLegacyHandoffParent(root, row, executor) {
	const payload = row && parseRetiredManagedHandoffLeasePayload(row.payload_json);
	if (!row || !payload || row.owner.length === 0 || row.owner.length > 4096 || !Number.isSafeInteger(row.updated_at) || row.updated_at < 0) return null;
	const identity = {
		pid: payload.pid,
		startIdentity: payload.startIdentity
	};
	return {
		version: 1,
		key: root,
		owner: row.owner,
		payload: row.payload_json,
		updatedAt: row.updated_at,
		helper: identity,
		executor: executor ?? identity,
		action: { kind: "update" }
	};
}
/** The shipped runner may supervise a respawned updater instead of execing it. */
function isBorrowedLegacyHandoffParentCurrent(parent, readRow, processes) {
	const validate = (ancestorPids, isProcessIdentityCurrent) => {
		const ancestors = [...ancestorPids];
		const executorIndex = ancestors.indexOf(parent.executor.pid);
		return executorIndex > 0 && ancestors.indexOf(parent.helper.pid) >= executorIndex && isProcessIdentityCurrent(parent.helper) && isProcessIdentityCurrent(parent.executor) && isDeepStrictEqual(readBorrowedLegacyHandoffParent(parent.key, readRow(), parent.executor), parent);
	};
	return process.platform === "darwin" ? processes.validateDarwinAncestorProcesses(parent.helper.pid, validate) : validate(getSelfAndAncestorPidsSync(void 0, { requireVerifiedParent: true }), processes.isProcessIdentityCurrent);
}
//#endregion
//#region src/infra/update-managed-service-handoff-mutation.ts
/** Original cancellation's row/lineage checks over the receiver's existing store. */
function createManagedHandoffMutationReader(deps) {
	const { row, handle, sameRow, currentLegacyParent, withDatabase } = deps;
	function storedCurrent(lease, db) {
		if (lease.version === 1) return currentLegacyParent(lease, db);
		const value = row(db, lease.key);
		return Boolean(value && sameRow({
			owner: lease.owner,
			payload_json: lease.payload,
			updated_at: lease.updatedAt
		}, value) && isDeepStrictEqual(handle(lease.key, value), lease));
	}
	function originalAllowsMutation(lease, db) {
		if (lease.version !== 2 || !lease.mutationOriginal) return true;
		const original = lease.mutationOriginal;
		return sameRow({
			owner: original.owner,
			payload_json: original.payload,
			updated_at: original.updatedAt
		}, row(db, original.key));
	}
	function ancestorsAllowMutation(key, db) {
		let marker = key.indexOf("/.openclaw-update-child-");
		while (marker >= 0) {
			const ancestorKey = key.slice(0, marker);
			const ancestor = row(db, ancestorKey);
			if (!ancestor) return false;
			if (!isRetiredManagedHandoffLeasePayload(ancestor.payload_json)) {
				const lease = handle(ancestorKey, ancestor);
				if (lease.version === 4 || !originalAllowsMutation(lease, db)) return false;
			}
			marker = key.indexOf("/.openclaw-update-child-", marker + 1);
		}
		return true;
	}
	function childAliases(key, db) {
		const marker = "/.openclaw-update-child-";
		const index = key.lastIndexOf(marker);
		const childName = index < 0 ? "" : key.slice(index + 24);
		if (!/^[a-f0-9-]{36}-lineage-[a-f0-9]{64}$/.test(childName)) return [];
		return executeSqliteQuerySync(db, leaseQueries(db).selectFrom("managed_update_handoffs").select("install_root").where("install_root", "like", `%${marker}${childName}`)).rows.map((entry) => entry.install_root);
	}
	function mutationCurrent(lease, db) {
		if (lease.version === 4 || !storedCurrent(lease, db) || !originalAllowsMutation(lease, db) || !ancestorsAllowMutation(lease.key, db)) return false;
		if (childAliases(lease.key, db).some((key) => !ancestorsAllowMutation(key, db))) return false;
		return true;
	}
	function current(lease) {
		try {
			return withDatabase(false, (db) => mutationCurrent(lease, db));
		} catch {
			return false;
		}
	}
	return {
		storedCurrent,
		originalAllowsMutation,
		childAliases,
		mutationCurrent,
		current
	};
}
//#endregion
//#region src/infra/update-managed-service-handoff-source-inspection.ts
/** Match every schema object, including wrong shapes, using SQLite's identifier casing. */
function hasManagedHandoffSchemaObject(db) {
	return Boolean(executeSqliteQueryTakeFirstSync(db, getNodeSqliteKysely(db).selectFrom("sqlite_schema").select("name").where((eb) => eb(eb.fn("lower", ["name"]), "=", "managed_update_handoffs"))));
}
/** A first writer may have created the private inode before SQLite commits its schema. */
function isManagedHandoffSchemaEmpty(db) {
	return !executeSqliteQueryTakeFirstSync(db, getNodeSqliteKysely(db).selectFrom("sqlite_schema").select("name").limit(1));
}
//#endregion
//#region src/infra/update-managed-service-handoff-rows.ts
const managedHandoffLeaseText = string().min(1).max(4096);
const triageFailureSchema = strictObject({
	kind: _enum(["update", "gateway-startup"]),
	phase: string().max(120),
	error: string().max(800),
	installationRoot: managedHandoffLeaseText.optional(),
	expectedVersion: string().max(100).optional(),
	gateway: _enum(["verify-running", "preserve"])
});
const text = managedHandoffLeaseText;
function createManagedHandoffLeaseRows(options, withDatabase, processes) {
	const { databasePath } = options;
	const rowReaders = /* @__PURE__ */ new WeakMap();
	function row(db, root) {
		let readRow = rowReaders.get(db);
		if (!readRow) {
			readRow = prepareSqliteQueryTakeFirstSync(db, (parameter) => leaseQueries(db).selectFrom("managed_update_handoffs").select([
				"owner",
				"payload_json",
				"updated_at"
			]).where("install_root", "=", parameter((key) => key)));
			rowReaders.set(db, readRow);
		}
		return readRow(root);
	}
	function handle(root, value) {
		const payload = parseManagedHandoffLeasePayload(value.payload_json);
		if (!payload || !text.safeParse(value.owner).success || payload.version === 2 && payload.mutationOriginal && (payload.mutationOriginal.key === root || root.includes("/.openclaw-update-child-")) || payload.version === 4 && (payload.cancellation.key !== root || payload.cancellation.owner !== value.owner || payload.cancellation.updatedAt >= value.updated_at)) throw new Error("existing managed handoff lease is incompatible; retain diagnostics and run openclaw triage manually");
		return {
			key: root,
			owner: value.owner,
			payload: value.payload_json,
			updatedAt: value.updated_at,
			...payload
		};
	}
	function deleteRow(db, root, value) {
		return executeSqliteQuerySync(db, leaseQueries(db).deleteFrom("managed_update_handoffs").where("install_root", "=", root).where("owner", "=", value.owner).where("payload_json", "=", value.payload_json).where("updated_at", "=", value.updated_at)).numAffectedRows === 1n;
	}
	function updateRow(db, lease, values) {
		return executeSqliteQuerySync(db, leaseQueries(db).updateTable("managed_update_handoffs").set(values).where("install_root", "=", lease.key).where("owner", "=", lease.owner).where("payload_json", "=", lease.payload).where("updated_at", "=", lease.updatedAt)).numAffectedRows === 1n;
	}
	function read(root) {
		try {
			if (!options.existingIdentity && !fs.existsSync(databasePath)) return { kind: "absent" };
			return withDatabase(false, (db) => {
				if (!options.existingIdentity && isManagedHandoffSchemaEmpty(db)) return { kind: "absent" };
				const value = row(db, root);
				return value ? {
					kind: "current",
					lease: handle(root, value)
				} : { kind: "absent" };
			});
		} catch {
			return { kind: "unreadable" };
		}
	}
	function readLegacyParent(root, executor) {
		return withDatabase(false, (db) => readBorrowedLegacyHandoffParent(root, row(db, root), executor));
	}
	function currentLegacyParent(parent, db) {
		return isBorrowedLegacyHandoffParentCurrent(parent, () => row(db, parent.key), processes);
	}
	const sameRow = (a, b) => a?.owner === b?.owner && a?.payload_json === b?.payload_json && a?.updated_at === b?.updated_at;
	return {
		row,
		handle,
		deleteRow,
		updateRow,
		read,
		readLegacyParent,
		currentLegacyParent,
		sameRow
	};
}
//#endregion
//#region src/infra/update-managed-service-handoff-original-acquisition.ts
/** Cancellation-aware acquisition uses the original receiver admission transaction. */
function createManagedHandoffOriginalAcquisition(deps) {
	const { options, acquirePinnedOriginal, withDatabase, processIdentity, read, admit, originalUpdateAdmissions } = deps;
	const { databasePath } = options;
	function acquire(root, owner, requestedAction, transition = false, legacyParent, originalParent) {
		let action = requestedAction;
		const originalUpdateOwner = options.originalUpdateKey === root && !originalParent && !legacyParent && !transition && !root.includes("/.openclaw-update-child-") && action.kind === "update";
		if (originalUpdateOwner && action.kind === "update") action = {
			...action,
			mutationProtocol: "original-cancellation-v1"
		};
		if (originalUpdateOwner && !options.existingIdentity) return withDatabase(true, () => {
			const existingIdentity = captureManagedUpdateLeaseDatabaseIdentity(databasePath);
			return acquirePinnedOriginal({
				...options,
				databasePath: existingIdentity.databasePath,
				existingIdentity
			}, root, owner, action);
		});
		const helper = processIdentity();
		const mutationOriginal = !root.includes("/.openclaw-update-child-") && originalParent?.version === 2 && originalParent.action.kind === "update" && originalParent.action.mutationProtocol === "original-cancellation-v1" ? {
			key: originalParent.key,
			owner: originalParent.owner,
			payload: originalParent.payload,
			updatedAt: originalParent.updatedAt
		} : void 0;
		const payload = JSON.stringify({
			version: 2,
			executor: helper,
			helper,
			action,
			...mutationOriginal ? { mutationOriginal } : {}
		});
		if (!managedHandoffLeaseText.safeParse(root).success || !managedHandoffLeaseText.safeParse(owner).success || !parseManagedHandoffLeasePayload(payload)) throw new Error("managed handoff admission is invalid");
		if (transition) {
			if (legacyParent) throw new Error("Borrowed legacy authority cannot transition a lease");
			const result = read(root);
			if (result.kind !== "current" || result.lease.owner !== owner || result.lease.payload !== payload || action.kind !== "triage" || action.phase !== "reserved" || action.lifetime.kind !== "native" || action.lifetime.placement.kind !== "pending") throw new Error("managed triage transition lost its current lease");
			return {
				kind: "acquired",
				lease: result.lease
			};
		}
		const result = admit(root, owner, payload, void 0, legacyParent, originalParent);
		if (result.kind === "acquired" && originalUpdateOwner && options.existingIdentity) {
			const originalDatabaseIdentity = Object.freeze({ ...options.existingIdentity });
			originalUpdateAdmissions.set(result.lease, {
				database: originalDatabaseIdentity,
				original: structuredClone(result.lease)
			});
			return {
				...result,
				originalDatabaseIdentity
			};
		}
		return result;
	}
	return acquire;
}
//#endregion
//#region src/infra/update-managed-service-handoff-process.ts
const WINDOWS_ARGV_IDENTITY_PREFIX = "win32-argv-sha256:";
const WINDOWS_ARGV_IDENTITY_PATTERN = /^win32-argv-sha256:[a-f0-9]{64}$/;
function windowsArgvIdentity(argv) {
	if (!argv[0]) return null;
	const normalized = [path.win32.normalize(argv[0]).toLowerCase(), ...argv.slice(1)];
	return WINDOWS_ARGV_IDENTITY_PREFIX + sha256Hex(JSON.stringify(normalized));
}
/** Process facts shared by lease admission, live ownership, and cleanup. */
function createManagedHandoffProcessIdentityReader(options) {
	const warnedIdentityPids = /* @__PURE__ */ new Set();
	let selfIdentity;
	let parentStartIdentity;
	let selfLauncherIdentity;
	function warn(pid, continuation) {
		if (warnedIdentityPids.has(pid)) return;
		warnedIdentityPids.add(pid);
		try {
			options.onWarning?.(pid, `Native Windows creation-time queries returned no identity for PID ${pid}; ${continuation}.`);
		} catch {}
	}
	const isPidAlive = (pid) => !isPidDefinitelyDead(pid);
	function readProcessStartIdentity(pid) {
		const start = getFileLockProcessStartTime(pid, {
			...options.env,
			LC_ALL: "C",
			TZ: "UTC"
		});
		return start === null ? pid === process.pid ? parentStartIdentity ?? null : null : String(start);
	}
	function validateDarwinAncestorProcesses(requiredHelperPid, validate) {
		const immediateParent = process.ppid;
		const observed = /* @__PURE__ */ new Map();
		const read = (pid) => {
			if (!observed.has(pid)) observed.set(pid, readDarwinProcessIdentity(pid, options.env));
			return observed.get(pid) ?? null;
		};
		const ancestors = collectProcessAncestorPids(immediateParent, (pid) => read(pid)?.parentPid ?? null, requiredHelperPid);
		if (!ancestors.has(requiredHelperPid) || !read(requiredHelperPid) || process.ppid !== immediateParent) return false;
		return validate(ancestors, (value) => {
			const facts = observed.get(value.pid);
			return isPidAlive(value.pid) && facts != null && String(facts.startedAt) === value.startIdentity;
		});
	}
	function readWindowsArgvIdentity(pid) {
		if (pid !== process.pid) {
			const argv = readWindowsProcessArgsSync(pid, void 0, options.env);
			return argv ? windowsArgvIdentity(argv) : null;
		}
		if (selfLauncherIdentity === void 0) {
			const report = process.report.getReport();
			const argv = isRecord(report) && isRecord(report.header) ? report.header.commandLine : null;
			selfLauncherIdentity = Array.isArray(argv) && argv.every((arg) => typeof arg === "string") ? windowsArgvIdentity(argv) : null;
		}
		return selfLauncherIdentity;
	}
	function inspectProcessIdentity(value, ownedCustody = false) {
		if (!isPidAlive(value.pid)) return "dead";
		if (process.platform === "win32" && WINDOWS_ARGV_IDENTITY_PATTERN.test(value.startIdentity)) {
			const argvIdentity = readWindowsArgvIdentity(value.pid);
			return argvIdentity === null ? ownedCustody ? "live" : "unknown" : argvIdentity === value.startIdentity ? "live" : "mismatch";
		}
		const start = readProcessStartIdentity(value.pid);
		return start === null ? "unknown" : start === value.startIdentity ? "live" : "mismatch";
	}
	function processState(value) {
		const state = inspectProcessIdentity(value);
		if (state === "mismatch") return process.platform === "win32" && WINDOWS_ARGV_IDENTITY_PATTERN.test(value.startIdentity) ? "unknown" : "dead";
		return state;
	}
	function isProcessIdentityCurrent(value, ownedCustody = false) {
		return inspectProcessIdentity(value, ownedCustody) === "live";
	}
	function acceptSelfIdentity(value, parentBound = false) {
		if (value.pid !== process.pid) return false;
		const state = inspectProcessIdentity(value);
		if (state === "live") {
			selfIdentity ??= { ...value };
			return true;
		}
		if (state !== "unknown" || !parentBound || process.platform !== "win32" || WINDOWS_ARGV_IDENTITY_PATTERN.test(value.startIdentity)) return false;
		parentStartIdentity = value.startIdentity;
		selfIdentity ??= { ...value };
		warn(value.pid, "continuing with the creation identity established by the live parent");
		return true;
	}
	function processIdentity(pid = process.pid, argv) {
		if (pid === process.pid && selfIdentity) {
			const observed = process.platform === "win32" && WINDOWS_ARGV_IDENTITY_PATTERN.test(selfIdentity.startIdentity) ? readWindowsArgvIdentity(pid) : readProcessStartIdentity(pid);
			if (observed !== null && observed !== selfIdentity.startIdentity) throw new Error("managed handoff process identity changed");
			return { ...selfIdentity };
		}
		const startIdentity = readProcessStartIdentity(pid);
		if (startIdentity !== null) {
			if (pid === process.pid) selfIdentity = {
				pid,
				startIdentity
			};
			return {
				pid,
				startIdentity
			};
		}
		const attribution = process.platform === "win32" ? argv ? windowsArgvIdentity(argv) : readWindowsArgvIdentity(pid) : null;
		if (attribution) {
			warn(pid, "continuing with PID and launcher attribution");
			if (pid === process.pid) selfIdentity = {
				pid,
				startIdentity: attribution,
				startIdentitySource: "argv-sha256"
			};
			return {
				pid,
				startIdentity: attribution,
				startIdentitySource: "argv-sha256"
			};
		}
		throw new Error("managed handoff process start identity is unavailable");
	}
	return {
		isPidAlive,
		readProcessStartIdentity,
		processIdentity,
		processState,
		inspectProcessIdentity,
		isProcessIdentityCurrent,
		validateDarwinAncestorProcesses,
		acceptSelfIdentity
	};
}
//#endregion
//#region src/infra/update-managed-service-handoff-cleanup.ts
/** v1 shipped in 2026.8.2. This proves cleanup eligibility, never v2 authority. */
function canCleanupLegacyManagedHandoff(payload, processState) {
	let value;
	try {
		value = JSON.parse(payload);
	} catch {
		return false;
	}
	return isRecord(value) && Object.keys(value).length === 3 && value.version === 1 && typeof value.pid === "number" && Number.isInteger(value.pid) && value.pid > 0 && typeof value.startIdentity === "string" && Number.isSafeInteger(Number(value.startIdentity)) && Number(value.startIdentity) >= 0 && String(Number(value.startIdentity)) === value.startIdentity && processState({
		pid: value.pid,
		startIdentity: value.startIdentity
	}) === "dead";
}
const MANAGED_SERVICE_UPDATE_HANDOFF_TEMP_PREFIX = "openclaw-update-run-handoff-";
const MANAGED_SERVICE_UPDATE_HANDOFF_STALE_TTL_MS = 864e5;
async function cleanupStaleManagedServiceUpdateHandoffs(params) {
	const tmpDir = params?.tmpDir ?? os.tmpdir();
	const nowMs = params?.nowMs ?? Date.now();
	const ttlMs = params?.ttlMs ?? MANAGED_SERVICE_UPDATE_HANDOFF_STALE_TTL_MS;
	let entries;
	try {
		entries = await fs$1.readdir(tmpDir, { withFileTypes: true });
	} catch {
		return 0;
	}
	let removed = 0;
	for (const entry of entries.toSorted((left, right) => left.name.localeCompare(right.name))) {
		if (!entry.isDirectory() || !entry.name.startsWith("openclaw-update-run-handoff-")) continue;
		const dir = path.join(tmpDir, entry.name);
		let stats;
		try {
			stats = await fs$1.stat(dir);
		} catch {
			continue;
		}
		if (nowMs - stats.mtimeMs < ttlMs) continue;
		try {
			await fs$1.rm(dir, {
				recursive: true,
				force: true
			});
			removed += 1;
		} catch {}
	}
	return removed;
}
//#endregion
//#region src/infra/update-managed-service-handoff-reclamation.ts
/** Observe dead original-generation mirrors before the admission write lock.
* Commit their removal with the original row, never strand a slot whose
* mutationOriginal would immediately become stale. Cancellation/native custody
* is not reclaimable and all existing mutation predicates remain unchanged. */
function observeManagedHandoffOriginalReclamation(original, db, deps) {
	if (!original || original.version !== 2 || original.mutationOriginal || original.action.kind !== "update" || original.action.mutationProtocol !== "original-cancellation-v1") return () => true;
	const generation = {
		key: original.key,
		owner: original.owner,
		payload: original.payload,
		updatedAt: original.updatedAt
	};
	const readPairs = () => executeSqliteQuerySync(db, leaseQueries(db).selectFrom("managed_update_handoffs").select([
		"install_root",
		"owner",
		"payload_json",
		"updated_at"
	]).orderBy("install_root")).rows.flatMap((row) => {
		const payload = parseManagedHandoffLeasePayload(row.payload_json);
		return payload?.version === 2 && isDeepStrictEqual(payload.mutationOriginal, generation) ? [{
			row,
			lease: deps.handle(row.install_root, row)
		}] : [];
	});
	const observed = readPairs();
	const dead = observed.every(({ lease }) => deps.reclaimable(lease, db));
	return () => {
		const current = readPairs();
		if (!dead || !isDeepStrictEqual(current, observed) || current.some(({ lease }) => deps.hasUnsettledChildren(lease, db))) return false;
		for (const { row } of current) if (!deps.deleteRow(db, row.install_root, row)) throw new Error("Original update mirror changed during reclamation");
		return true;
	};
}
function readManagedHandoffAdmissionLease(root, value, handle, processState) {
	const legacyDead = value && managedHandoffLeaseText.safeParse(value.owner).success && Number.isSafeInteger(value.updated_at) && value.updated_at >= 0 && canCleanupLegacyManagedHandoff(value.payload_json, processState);
	return value && !legacyDead ? handle(root, value) : null;
}
//#endregion
//#region src/infra/update-managed-service-handoff-retained-custody.ts
function sourceKey(resource) {
	const absolute = path.resolve(resource);
	try {
		return path.join(fs.realpathSync(path.dirname(absolute)), path.basename(absolute));
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return absolute;
		throw error;
	}
}
function fileIdentity(file) {
	try {
		return fs.statSync(file, { bigint: true });
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return;
		throw error;
	}
}
function normalizationInsensitive(directory) {
	try {
		const names = fs.readdirSync(directory);
		for (const name of names) {
			const nfc = name.normalize("NFC");
			const nfd = name.normalize("NFD");
			if (nfc === nfd) continue;
			const originalPath = path.join(directory, name);
			const alternate = name === nfc ? nfd : nfc;
			const original = fs.lstatSync(originalPath, { bigint: true });
			if (original.ino === 0n) return;
			let insensitive;
			try {
				const other = fs.lstatSync(path.join(directory, alternate), { bigint: true });
				if (other.ino === 0n) return;
				insensitive = !names.includes(alternate) && original.dev === other.dev && original.ino === other.ino;
			} catch (error) {
				if (!hasErrnoCode(error, "ENOENT")) return;
				insensitive = false;
			}
			const current = fs.lstatSync(originalPath, { bigint: true });
			return current.dev === original.dev && current.ino === original.ino ? insensitive : void 0;
		}
	} catch {}
}
function sameSource(left, right) {
	if (left === right) return true;
	let distinct = false;
	for (const suffix of ["", ".lock"]) {
		const a = fileIdentity(left + suffix);
		const b = fileIdentity(right + suffix);
		if (a && b) {
			if (a.ino !== 0n && a.dev === b.dev && a.ino === b.ino) return true;
			if (a.ino !== 0n && b.ino !== 0n && (a.ino !== b.ino || a.dev !== b.dev)) distinct = true;
		}
	}
	if (distinct || path.dirname(left) !== path.dirname(right)) return false;
	const leftName = path.basename(left);
	const rightName = path.basename(right);
	const leftFolded = leftName.toLowerCase();
	const rightFolded = rightName.toLowerCase();
	if (leftFolded.normalize("NFC") !== rightFolded.normalize("NFC")) return false;
	if (leftFolded !== rightFolded) {
		const insensitive = normalizationInsensitive(path.dirname(right));
		if (insensitive === void 0) throw new Error("Source resource Unicode alias identity is unavailable.");
		if (!insensitive) return false;
	}
	if (leftName.normalize("NFC") === rightName.normalize("NFC")) return true;
	const insensitive = tryResolvePathCaseInsensitive(right, { allowTemporaryProbe: false });
	if (insensitive === void 0) throw new Error("Source resource alias identity is unavailable.");
	return insensitive;
}
/** Read-only compatibility for preserved v3 records. No current producer mints them. */
function assertNoRetainedSourceBorrower(resource, rows) {
	const key = sourceKey(resource);
	for (const lease of rows) if (lease.version === 3 && [lease.nativeBorrower.source.serviceKey, ...lease.nativeBorrower.source.configPaths].some((reserved) => sameSource(reserved, key))) throw new Error("Source resource has unresolved native custody.");
}
//#endregion
//#region src/infra/update-managed-service-handoff-scope.ts
/** Inspect the native scope through the same captured service-manager environment. */
function createManagedHandoffScopeReader(serviceManagerEnv) {
	const control = (command, args, timeout = 5e3) => spawnSync(command, args, {
		env: serviceManagerEnv,
		encoding: "utf8",
		timeout,
		killSignal: "SIGKILL",
		windowsHide: true,
		stdio: [
			"ignore",
			"pipe",
			"ignore"
		]
	});
	function properties(stdout) {
		return Object.fromEntries(String(stdout || "").trim().split(/\r?\n/).map((line) => {
			const i = line.indexOf("=");
			return [line.slice(0, i), line.slice(i + 1)];
		}));
	}
	function nativeScope(life) {
		const result = control("systemctl", [
			"--user",
			"show",
			life.scope,
			"--property=Id,LoadState,ActiveState,InvocationID,ControlGroup"
		]);
		const scope = properties(result.stdout);
		return !result.error && (result.status === 0 || scope.LoadState === "not-found") ? scope : null;
	}
	function isInNativeScope(life, scope = nativeScope(life)) {
		if (!scope || scope.Id !== life.scope || scope.LoadState !== "loaded" || !scope.ControlGroup || life.placement.kind === "attached" && scope.InvocationID !== life.placement.invocation) return false;
		return fs.readFileSync("/proc/self/cgroup", "utf8").split("\n").some((line) => {
			const systemd = /^[1-9][0-9]*:name=systemd:(.*)$/.exec(line);
			return line === "0::" + scope.ControlGroup || systemd?.[1] === scope.ControlGroup;
		});
	}
	function nativeClosed(life, scope = nativeScope(life)) {
		return Boolean(scope && scope.Id === life.scope && (scope.LoadState === "not-found" || scope.LoadState === "loaded" && ["inactive", "failed"].some((state) => state === scope.ActiveState) && scope.ControlGroup === "" && (life.placement.kind === "pending" || scope.InvocationID === life.placement.invocation)));
	}
	return {
		control,
		properties,
		nativeScope,
		isInNativeScope,
		nativeClosed
	};
}
//#endregion
//#region src/infra/update-managed-service-handoff-lease.ts
const originalUpdateAdmissions = /* @__PURE__ */ new WeakMap();
function resolveManagedUpdateLeaseDatabasePath() {
	return path.join(resolvePreferredOpenClawTmpDir(), "managed-update-handoffs.sqlite");
}
/** One lease implementation, preloaded normally and sealed before package replacement. */
function createManagedHandoffLeaseStore(options = {
	databasePath: resolveManagedUpdateLeaseDatabasePath(),
	serviceManagerEnv: resolveServiceManagerEnv()
}, logger) {
	const { databasePath, serviceManagerEnv } = options;
	const bootIdentity = createManagedHandoffBootIdentityReader(serviceManagerEnv);
	const { isPidAlive, readProcessStartIdentity, processIdentity, processState, inspectProcessIdentity, isProcessIdentityCurrent, validateDarwinAncestorProcesses, acceptSelfIdentity } = createManagedHandoffProcessIdentityReader({
		env: serviceManagerEnv,
		onWarning: options.onProcessIdentityWarning ?? ((pid, message) => logger?.warn(message, { pid }))
	});
	const { control, properties, nativeScope, isInNativeScope, nativeClosed } = createManagedHandoffScopeReader(serviceManagerEnv);
	const withDatabase = createManagedHandoffLeaseDatabase(databasePath, options.existingIdentity);
	const { row, handle, deleteRow, updateRow, read, readLegacyParent, currentLegacyParent, sameRow } = createManagedHandoffLeaseRows(options, withDatabase, {
		isProcessIdentityCurrent,
		validateDarwinAncestorProcesses
	});
	function transact(db, operation) {
		return withDatabase.transact(db, operation, { logger });
	}
	function hasUnsettledChildren(lease, connection) {
		if (lease.version === 3 || lease.version === 4) return true;
		const prefix = `${lease.key}/.openclaw-update-child-`;
		const inspect = (db) => {
			return executeSqliteQuerySync(db, leaseQueries(db).selectFrom("managed_update_handoffs").select([
				"install_root",
				"owner",
				"payload_json",
				"updated_at"
			]).where("install_root", ">=", prefix).where("install_root", "<", prefix + "￿")).rows.some((entry) => {
				const child = handle(entry.install_root, entry);
				return child.version === 3 || child.version === 4 || processState(child.helper) !== "dead" || processState(child.executor) !== "dead" || process.platform !== "win32" && isChildProcessTreeAlive(child.executor);
			});
		};
		return connection ? inspect(connection) : withDatabase(false, inspect);
	}
	function reclaimable(lease, db) {
		if (lease.version === 3 || lease.version === 4 || hasOriginalUpdateExecutorCustody(lease)) return false;
		const action = lease.action;
		if (action.kind === "triage" && action.lifetime.kind === "foreground") {
			const boot = bootIdentity();
			if (boot.platform === action.lifetime.boot.platform && boot.identity !== action.lifetime.boot.identity) return true;
			if (!["reserved", "closed"].includes(action.phase)) return false;
		}
		if (processState(lease.helper) !== "dead" || processState(lease.executor) !== "dead") return false;
		return !hasUnsettledChildren(lease, db) && (action.kind !== "triage" || action.lifetime.kind !== "native" || nativeClosed(action.lifetime));
	}
	function admit(root, owner, payload, source, legacyParent, originalParent) {
		const run = (db) => {
			const observed = row(db, root);
			const destination = readManagedHandoffAdmissionLease(root, observed, handle, processState);
			const canReplace = !destination || destination.owner !== owner && reclaimable(destination, db);
			const reclaimOriginalPair = observeManagedHandoffOriginalReclamation(canReplace ? destination ?? void 0 : void 0, db, {
				handle,
				deleteRow,
				reclaimable,
				hasUnsettledChildren
			});
			return transact(db, () => {
				if (originalParent && !mutationCurrent(originalParent, db)) return {
					kind: "busy",
					owner: originalParent.owner
				};
				if (destination && !originalAllowsMutation(destination, db)) return {
					kind: "busy",
					owner: destination.owner
				};
				if (source && !sameRow({
					owner: source.owner,
					payload_json: source.payload,
					updated_at: source.updatedAt
				}, row(db, source.key))) throw new Error("managed triage source changed during admission");
				if (source && (!mutationCurrent(source, db) || hasUnsettledChildren(source, db))) return {
					kind: "busy",
					owner: source.owner
				};
				const childMarker = root.indexOf("/.openclaw-update-child-");
				if (childMarker >= 0) {
					const parentKey = root.slice(0, childMarker);
					const parent = row(db, parentKey);
					if (legacyParent) {
						if (legacyParent.key !== parentKey || !currentLegacyParent(legacyParent, db)) throw new Error("Borrowed legacy update parent changed during child admission");
						if (root.lastIndexOf("/.openclaw-update-child-") === childMarker && hasUnsettledChildren(legacyParent, db)) return {
							kind: "busy",
							owner: legacyParent.owner
						};
					} else if (!parent || !mutationCurrent(handle(parentKey, parent), db) || handle(parentKey, parent).version === 3) return {
						kind: "busy",
						owner: parent?.owner ?? owner
					};
				} else if (legacyParent) throw new Error("Borrowed legacy update authority admits only child rows");
				const latest = row(db, root);
				if (!sameRow(observed, latest)) {
					if (latest) return {
						kind: "busy",
						owner: handle(root, latest).owner
					};
					throw new Error("managed handoff lease changed during admission");
				}
				const previous = destination ?? readBorrowedLegacyHandoffParent(root, observed);
				if (!canReplace || previous && hasUnsettledChildren(previous, db)) return {
					kind: "busy",
					owner: previous?.owner ?? owner
				};
				if (!reclaimOriginalPair()) return {
					kind: "busy",
					owner: destination?.owner ?? owner
				};
				if (observed) deleteRow(db, root, observed);
				const updatedAt = Math.max(Date.now(), (source?.updatedAt ?? 0) + 1);
				if (source) {
					if (!updateRow(db, source, {
						install_root: root,
						payload_json: payload,
						updated_at: updatedAt
					})) throw new Error("managed triage source changed during transfer");
				} else executeSqliteQuerySync(db, leaseQueries(db).insertInto("managed_update_handoffs").values({
					install_root: root,
					owner,
					payload_json: payload,
					updated_at: updatedAt
				}));
				return {
					kind: "acquired",
					lease: handle(root, {
						owner,
						payload_json: payload,
						updated_at: updatedAt
					})
				};
			});
		};
		return withDatabase(true, run);
	}
	const acquire = createManagedHandoffOriginalAcquisition({
		options,
		acquirePinnedOriginal: (pinnedOptions, root, owner, action) => createManagedHandoffLeaseStore(pinnedOptions, logger).acquire(root, owner, action),
		withDatabase,
		processIdentity,
		read,
		admit,
		originalUpdateAdmissions
	});
	const { storedCurrent, originalAllowsMutation, childAliases, mutationCurrent, current } = createManagedHandoffMutationReader({
		withDatabase,
		row,
		handle,
		sameRow,
		currentLegacyParent
	});
	const cancelUpdate = createManagedHandoffCancellation({
		existingIdentity: options.existingIdentity,
		originalUpdateAdmissions,
		withDatabase,
		transact,
		mutationCurrent,
		storedCurrent,
		childAliases,
		canRelease,
		handle,
		updateRow,
		deleteRow,
		processState
	});
	function owns(lease, role = "helper") {
		return current(lease) && !(lease.action.kind === "triage" && [
			"closing",
			"closed",
			"uncertain"
		].includes(lease.action.phase)) && lease[role].pid === process.pid && isProcessIdentityCurrent(lease.helper) && acceptSelfIdentity(lease[role]);
	}
	function acceptParentBoundExecutor(lease) {
		return current(lease) && lease.version === 2 && lease.action.kind === "update" && lease.helper.pid === process.ppid && lease.executor.pid === process.pid && isProcessIdentityCurrent(lease.helper) && acceptSelfIdentity(lease.executor, true);
	}
	function cas(lease, action, executor) {
		if (lease.version === 3 || lease.version === 4 || hasOriginalUpdateExecutorCustody(lease, action)) return null;
		const payload = JSON.stringify({
			...parseManagedHandoffLeasePayload(lease.payload),
			action,
			...executor ? {
				executor,
				helper: lease.helper
			} : {}
		});
		if (!parseManagedHandoffLeasePayload(payload)) return null;
		return withDatabase(true, (db) => transact(db, () => {
			if (!mutationCurrent(lease, db) || hasUnsettledChildren(lease, db)) return null;
			const updatedAt = Math.max(Date.now(), lease.updatedAt + 1);
			return updateRow(db, lease, {
				payload_json: payload,
				updated_at: updatedAt
			}) ? handle(lease.key, {
				owner: lease.owner,
				payload_json: payload,
				updated_at: updatedAt
			}) : null;
		}));
	}
	function bind(lease, pid, action = lease.action, argv) {
		if (!owns(lease)) return null;
		const previous = lease.action;
		if (previous.kind === "triage") {
			if (previous.phase !== "reserved" || action.kind !== "triage" || action.phase !== "reserved" || lease.executor.pid !== lease.helper.pid) return null;
			const lifetime = previous.lifetime.kind === "native" && action.lifetime.kind === "native" && previous.lifetime.placement.kind === "pending" ? {
				...previous.lifetime,
				placement: action.lifetime.placement
			} : previous.lifetime;
			if (JSON.stringify(lifetime) !== JSON.stringify(action.lifetime)) return null;
		} else if (action.kind !== "update") return null;
		return cas(lease, action, processIdentity(pid, argv));
	}
	function bindUpdateChildren(leases, pid, argv) {
		if (!leases.length || new Set(leases.map((lease) => lease.key)).size !== leases.length || leases.some((lease) => lease.version !== 2 || lease.action.kind !== "update" || !lease.key.includes("/.openclaw-update-child-") || !owns(lease) || !isDeepStrictEqual(lease.helper, lease.executor))) return null;
		const executor = processIdentity(pid, argv);
		return withDatabase(true, (db) => transact(db, () => {
			if (leases.some((lease) => !storedCurrent(lease, db) || hasUnsettledChildren(lease, db))) return null;
			return leases.map((lease) => {
				const payload = JSON.stringify({
					version: 2,
					helper: lease.helper,
					executor,
					action: lease.action
				});
				const updatedAt = Math.max(Date.now(), lease.updatedAt + 1);
				if (!updateRow(db, lease, {
					payload_json: payload,
					updated_at: updatedAt
				})) throw new Error("Candidate process binding changed.");
				return handle(lease.key, {
					owner: lease.owner,
					payload_json: payload,
					updated_at: updatedAt
				});
			});
		}));
	}
	function retarget(lease, root, action) {
		if (lease.version !== 2 || lease.action.kind === "update" && lease.action.mutationProtocol === "original-cancellation-v1" || hasUnsettledChildren(lease) || !owns(lease, "executor") || lease.helper.pid !== process.pid || lease.action.kind !== "update" || action.kind !== "triage" || action.phase !== "reserved" || action.lifetime.kind !== "native" || action.lifetime.placement.kind !== "pending") return null;
		const payload = JSON.stringify({
			version: 2,
			executor: lease.helper,
			helper: lease.helper,
			action,
			...lease.mutationOriginal ? { mutationOriginal: lease.mutationOriginal } : {}
		});
		if (!managedHandoffLeaseText.safeParse(root).success || !parseManagedHandoffLeasePayload(payload) || fs.realpathSync(root) !== root) throw new Error("managed triage destination is not canonical");
		if (root === lease.key) {
			const next = cas(lease, action, lease.helper);
			return next ? {
				kind: "acquired",
				lease: next
			} : null;
		}
		return admit(root, lease.owner, payload, lease);
	}
	function activate(lease) {
		if (!owns(lease) || processState(lease.executor) !== "live" || lease.executor.pid === lease.helper.pid || lease.action.kind !== "triage" || lease.action.phase !== "reserved") return null;
		return cas(lease, {
			...lease.action,
			phase: "running"
		});
	}
	function readGeneration(lease) {
		const result = read(lease.key);
		if (result.kind !== "current") return null;
		const active = result.lease;
		return lease.version === 2 && active.version === 2 && lease.action.kind === "triage" && active.action.kind === "triage" && lease.owner === active.owner && JSON.stringify(lease.helper) === JSON.stringify(active.helper) && JSON.stringify(lease.executor) === JSON.stringify(active.executor) && JSON.stringify(lease.action.lifetime) === JSON.stringify(active.action.lifetime) ? {
			...active,
			action: active.action
		} : null;
	}
	function settle(lease, phase) {
		const active = readGeneration(lease);
		if (!active) return null;
		const actor = active.helper.pid === process.pid && phase !== "closed" ? active.helper : active.executor;
		if (actor.pid !== process.pid || processState(actor) !== "live") return null;
		if (phase === "closed") {
			if (!["running", "closing"].includes(active.action.phase)) return null;
		} else if (active.action.phase === "uncertain" || phase === "closing" && ["closing", "closed"].includes(active.action.phase)) return active;
		return cas(active, {
			...active.action,
			phase
		});
	}
	function canRelease(lease) {
		if (lease.version === 4 || hasOriginalUpdateExecutorCustody(lease) || !withDatabase(false, (db) => storedCurrent(lease, db)) || hasUnsettledChildren(lease) || lease.key.includes("/.openclaw-update-child-") && lease.executor.pid !== lease.helper.pid && process.platform !== "win32" && isChildProcessTreeAlive(lease.executor)) return false;
		const localHelper = lease.helper.pid === process.pid && processState(lease.helper) === "live";
		const action = lease.action;
		const executorClosed = lease.executor.pid === process.pid || processState(lease.executor) === "dead";
		return localHelper ? action.kind === "update" ? executorClosed : action.lifetime.kind === "foreground" ? ["reserved", "closed"].includes(action.phase) && executorClosed : nativeClosed(action.lifetime) : reclaimable(lease);
	}
	function releaseAll(leases) {
		if (!leases.length || new Set(leases.map((lease) => lease.key)).size !== leases.length || leases.some((lease) => !canRelease(lease))) return false;
		return withDatabase(true, (db) => transact(db, () => {
			if (leases.some((lease) => hasUnsettledChildren(lease, db) || lease.version === 2 && lease.action.kind === "update" && lease.action.mutationProtocol === "original-cancellation-v1" && [...childAliases(lease.key, db), ...readOriginalUpdateDependents(lease, db)].some((key) => !leases.some((paired) => paired.key === key)) || !storedCurrent(lease, db))) return false;
			for (const lease of leases) if (!deleteRow(db, lease.key, {
				owner: lease.owner,
				payload_json: lease.payload,
				updated_at: lease.updatedAt
			})) {
				if (leases.length === 1) return false;
				throw new Error("Update executor release changed.");
			}
			return true;
		}));
	}
	function readRetainedSources() {
		try {
			fs.lstatSync(databasePath);
		} catch (error) {
			if (hasErrnoCode(error, "ENOENT")) return [];
			throw error;
		}
		return withDatabase(false, (db) => {
			if (!options.existingIdentity && !hasManagedHandoffSchemaObject(db)) return [];
			return executeSqliteQuerySync(db, leaseQueries(db).selectFrom("managed_update_handoffs").select([
				"install_root",
				"owner",
				"payload_json",
				"updated_at"
			])).rows.flatMap((entry) => isRetiredManagedHandoffLeasePayload(entry.payload_json) ? [] : [handle(entry.install_root, entry)]);
		});
	}
	function assertSourceUnborrowed(resource) {
		assertNoRetainedSourceBorrower(resource, readRetainedSources());
	}
	function stopNative(lease, ownPlacement = false) {
		const life = lease.action.kind === "triage" && lease.action.lifetime;
		if (!life || life.kind !== "native" || life.placement.kind !== "attached" && !ownPlacement || !ownPlacement && !current(lease)) return false;
		const scope = nativeScope(life);
		if (ownPlacement && (![lease.helper.pid, lease.executor.pid].includes(process.pid) || processState(lease.helper.pid === process.pid ? lease.helper : lease.executor) !== "live" || !isInNativeScope(life, scope))) return false;
		if (nativeClosed(life, scope)) return true;
		if (!scope || scope.Id !== life.scope || life.placement.kind === "attached" && scope.InvocationID !== life.placement.invocation || !ownPlacement && !current(lease)) return false;
		const result = control("systemctl", [
			"--user",
			...ownPlacement ? ["--no-block"] : [],
			"stop",
			life.scope
		], 3e4);
		return !result.error && result.status === 0 && (ownPlacement || nativeClosed(life));
	}
	return {
		retainReadConnection: withDatabase.retainReadConnection,
		transact,
		read,
		readLegacyParent,
		acquire,
		bind,
		bindUpdateChildren,
		cancelUpdate,
		releaseAll,
		retarget,
		activate,
		owns,
		hasUnsettledChildren,
		acceptParentBoundExecutor,
		current,
		readGeneration,
		settle,
		release: (lease) => releaseAll([lease]),
		assertSourceUnborrowed,
		stopNative,
		isInNativeScope,
		processIdentity,
		inspectProcessIdentity,
		isProcessIdentityCurrent,
		readProcessStartIdentity,
		isPidAlive,
		bootIdentity,
		properties,
		validFailure: (value) => triageFailureSchema.safeParse(value).success
	};
}
//#endregion
export { createManagedHandoffProcessIdentityReader as a, captureManagedUpdateLeaseDatabaseIdentity as c, acquireFileLockSyncWithRetry as d, cleanupStaleManagedServiceUpdateHandoffs as i, createManagedHandoffLeaseDatabase as l, resolveManagedUpdateLeaseDatabasePath as n, triageFailureSchema as o, MANAGED_SERVICE_UPDATE_HANDOFF_TEMP_PREFIX as r, assertManagedUpdateLeaseDatabaseIdentity as s, createManagedHandoffLeaseStore as t, withExistingSqliteRollbackDatabase as u };
