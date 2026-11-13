import { i as extractErrorCode } from "./error-coercion-1P2One0X.mjs";
import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { i as isPidAlive, n as getFileLockProcessStartTime } from "./pid-alive-DB0zHgvx.mjs";
import { t as acquireFileLockSync } from "./file-lock-manager-D-LVVqdD.mjs";
import { t as resolveIdentityPathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { v as resolveGatewayLockDir, y as resolveGatewayLockDirForCanonicalStateDir } from "./paths-CtO6iw0c.mjs";
import { t as normalizeSqliteNonNegativeInteger } from "./sqlite-busy-timeout-DYrW2wFu.mjs";
import { o as runWithSqliteCleanup } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import "./openclaw-state-db-contract-CQDemVBb.mjs";
import { o as getOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { a as resolveOpenClawStateDirForDatabasePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { r as sha256HexPrefixCore } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { Et as _enum, Fn as object, Jn as string, Pn as number, xn as literal } from "./schemas-BOYIvvln.mjs";
import { t as safeParseJsonWithSchema } from "./zod-parse-Bip-sZi_.mjs";
import { t as applyPrivateModeSync } from "./private-mode-B6dWGRb2.mjs";
import { n as isLockOwnerDefinitelyStale } from "./stale-lock-file-C3Y3xG1t.mjs";
import fs from "node:fs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
import os from "node:os";
import { randomUUID } from "node:crypto";
import { isMainThread } from "node:worker_threads";
//#region src/infra/gateway-lock-payload.ts
const LockPayloadSchema = object({
	pid: number(),
	ownerId: string().min(1).optional(),
	/** A cold opener may wait for this transient owner, never enter while it is held. */
	stateOwnerKind: literal("schema").optional(),
	/** Present when Gateway cron writes use the dynamic-default ownership projection. */
	cronOwnerProjection: literal("dynamic-default-v1").optional(),
	createdAt: string(),
	configPath: string(),
	port: number().int().min(1).max(65535).optional(),
	role: _enum([
		"gateway",
		"agent-embedded",
		"skill-workshop-apply",
		"sqlite-maintenance"
	]).optional(),
	stateDir: string().optional(),
	startTime: number().optional()
});
function parseGatewayLockPayload(raw) {
	return safeParseJsonWithSchema(LockPayloadSchema, raw);
}
//#endregion
//#region src/infra/gateway-state-owner-directory.ts
function ensureOwnerDirectory(directory, created) {
	const firstCreated = fs.mkdirSync(directory, {
		recursive: true,
		mode: 448
	});
	if (firstCreated && created) {
		const boundary = path.toNamespacedPath(firstCreated);
		const directories = [];
		for (let current = directory;;) {
			const { dev, ino } = fs.lstatSync(current, { bigint: true });
			directories.push({
				path: current,
				dev,
				ino
			});
			if (path.toNamespacedPath(current) === boundary) break;
			const parent = path.dirname(current);
			if (parent === current) throw new Error("Created state ownership directory is outside its expected ancestry");
			current = parent;
		}
		for (const entry of directories) {
			const previous = created.findIndex((candidate) => candidate.path === entry.path);
			if (previous < 0) created.push(entry);
			else created[previous] = entry;
		}
	}
	const observed = fs.lstatSync(directory);
	const uid = process.getuid?.();
	if (!observed.isDirectory() || uid !== void 0 && observed.uid !== uid) throw new Error("State ownership directory must be a user-owned real directory");
	if (process.platform !== "win32" && (observed.mode & 4095) !== 448) {
		applyPrivateModeSync(directory, 448);
		if ((fs.lstatSync(directory).mode & 63) !== 0) throw new Error("State ownership directory permissions are not private");
	}
}
function removeCreatedProjectionDirectories(directories) {
	let directory = directories[0];
	while (directory) {
		try {
			const observed = fs.lstatSync(directory.path, { bigint: true });
			if (observed.isDirectory() && observed.dev === directory.dev && observed.ino === directory.ino) fs.rmdirSync(directory.path);
		} catch (error) {
			const code = extractErrorCode(error);
			if (code !== "ENOENT" && code !== "ENOTEMPTY" && code !== "EEXIST") throw error;
		}
		directories.shift();
		directory = directories[0];
	}
}
//#endregion
//#region src/infra/gateway-state-owner.ts
/** Carry the same physical sidecar through relocation and accepted schema work. */
function createGatewayStateProjection(lock) {
	let references = 1;
	let verifiedAt;
	const verify = () => {
		verifiedAt = void 0;
		if (!lock.verifyStillHeld()) return false;
		verifiedAt = performance.now();
		return true;
	};
	const reference = () => {
		let released = false;
		return {
			lockPath: lock.lockPath,
			get verifiedAt() {
				return released ? void 0 : verifiedAt;
			},
			verifyStillHeld: () => !released && verify(),
			retain() {
				if (released || !verify()) throw new Error("Gateway state projection is no longer current");
				references += 1;
				return reference();
			},
			release() {
				readOwnerPaths.clear();
				if (released) return;
				if (references === 1) lock.release();
				references -= 1;
				released = true;
			}
		};
	};
	return reference();
}
function hasPhysicalOwnership(owner) {
	return verifyOwnerLock(owner, owner.locks.values().next().value);
}
function verifyOwnerLock(owner, lock) {
	owner.verifiedAt = void 0;
	if (!lock?.verifyStillHeld()) return false;
	owner.verifiedAt = performance.now();
	return true;
}
const READ_OWNERSHIP_MAX_AGE_MS = 1e3;
const readOwnerPaths = resolveGlobalSingleton(Symbol.for("openclaw.gatewayStateReadOwnerPaths"), () => /* @__PURE__ */ new Map());
const owners = resolveGlobalSingleton(Symbol.for("openclaw.gatewayStateOwners"), () => /* @__PURE__ */ new Map());
const schemaOwners = resolveGlobalSingleton(Symbol.for("openclaw.stateDatabaseSchemaOwners"), () => new AsyncLocalStorage());
/** The synchronous lexical owner is live authority, not the existence of its sidecar. */
function getStateDatabaseSchemaLease(databasePath) {
	const entry = schemaOwners.getStore()?.get(resolveGatewayStateOwnerPath(databasePath));
	if (!entry) return;
	if (!entry.active) throw new Error("State schema maintenance scope is no longer current");
	entry.lease.assertCurrent();
	return entry.lease;
}
const GatewayStateOwnerContentionError = resolveGlobalSingleton(Symbol.for("openclaw.gatewayStateOwnerContentionError"), () => class StateOwnerContentionError extends Error {
	constructor(databasePath, cause) {
		super(`OpenClaw state database is busy at ${databasePath}. Wait for the other OpenClaw process to finish, then retry. If it persists, run \`openclaw gateway status\` and check for other OpenClaw processes using the same state directory. A running Gateway can hold this ownership until it stops; stop it through its service manager or original terminal before retrying.`);
		this.databasePath = databasePath;
		this.cause = cause;
		this.name = "GatewayStateOwnerContentionError";
	}
});
const StateDatabaseAdmissionPendingError = resolveGlobalSingleton(Symbol.for("openclaw.stateDatabaseAdmissionPendingError"), () => class extends Error {
	constructor(databasePath, message) {
		super(message);
		this.databasePath = databasePath;
	}
});
/** Retry cold admission only; the same budget covers opening and its first unentered write. */
function withStateDatabaseColdAdmission(params, open) {
	const budget = normalizeSqliteNonNegativeInteger(params.busyTimeoutMs, "busyTimeoutMs");
	const deadline = performance.now() + budget;
	const canonical = resolveIdentityPathViaExistingAncestorSync(params.databasePath);
	const remainingBusyTimeoutMs = () => Math.max(0, Math.ceil(deadline - performance.now()));
	const waiting = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));
	for (;;) try {
		assertStateDatabaseAccessAllowed(params.databasePath);
		return open(remainingBusyTimeoutMs);
	} catch (error) {
		if (!(error instanceof StateDatabaseAdmissionPendingError) || resolveIdentityPathViaExistingAncestorSync(error.databasePath) !== canonical || params.canRetry?.() === false) throw error;
		const remaining = deadline - performance.now();
		if (remaining <= 0) throw error;
		Atomics.wait(waiting, 0, 0, Math.min(10, remaining));
	}
}
/** State cleanup preserves this owner until destructive work and native handles settle. */
function resolveGatewayStateOwnerPath(databasePath) {
	const canonical = resolveIdentityPathViaExistingAncestorSync(databasePath);
	const uid = process.getuid?.();
	const directory = process.platform === "win32" ? path.join(os.homedir(), "AppData", "Local", "OpenClaw", "locks", uid === void 0 ? "openclaw-state-owners" : `openclaw-state-owners-${uid}`) : resolveGatewayLockDirForCanonicalStateDir(resolveOpenClawStateDirForDatabasePath(canonical));
	return path.join(resolveIdentityPathViaExistingAncestorSync(directory), `state.${sha256HexPrefixCore(canonical, 16)}.lock`);
}
function defaultPayload(databasePath, role = "sqlite-maintenance") {
	const stateDir = resolveOpenClawStateDirForDatabasePath(databasePath);
	const startTime = getFileLockProcessStartTime(process.pid);
	return {
		pid: process.pid,
		ownerId: randomUUID(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		stateDir,
		configPath: path.join(stateDir, "openclaw.json"),
		role,
		...startTime === null ? {} : { startTime }
	};
}
function acquireOwnerFile(databasePath, pathname, payload, busyTimeoutMs = 0, createdDirectories) {
	const deadline = performance.now() + busyTimeoutMs;
	ensureOwnerDirectory(path.dirname(pathname), createdDirectories);
	const stale = ({ payload: value }) => {
		return isLockOwnerDefinitelyStale({ payload: isRecord(value) ? {
			pid: value.pid,
			starttime: value.startTime
		} : null });
	};
	if (busyTimeoutMs > 0) try {
		const previous = parseGatewayLockPayload(fs.readFileSync(pathname, "utf8"));
		if (previous && !stale({ payload: previous }) && (previous.pid === process.pid || (previous.role ?? "gateway") === "gateway" && isPidAlive(previous.pid))) throw new GatewayStateOwnerContentionError(databasePath);
	} catch (error) {
		if (extractErrorCode(error) !== "ENOENT") throw error;
	}
	for (let retriedMissingParent = false;;) try {
		return acquireFileLockSync(pathname, {
			lockPath: pathname,
			retry: busyTimeoutMs > 0 ? {
				factor: 1.25,
				minTimeout: 10,
				maxTimeout: 25,
				randomize: false
			} : { retries: 0 },
			timeoutMs: Math.max(0, Math.ceil(deadline - performance.now())),
			staleMs: Infinity,
			staleRecovery: "remove-if-unchanged",
			reentrantOwner: payload.ownerId,
			payload: () => payload,
			parsePayload: parseGatewayLockPayload,
			shouldReclaim: stale,
			shouldRemoveStaleLock: stale
		});
	} catch (error) {
		const code = extractErrorCode(error);
		if (code === "ENOENT" && !retriedMissingParent) {
			retriedMissingParent = true;
			ensureOwnerDirectory(path.dirname(pathname), createdDirectories);
			continue;
		}
		if (code === "file_lock_timeout" || code === "file_lock_stale") throw new GatewayStateOwnerContentionError(databasePath, error);
		throw error;
	}
}
function leaseForFile(pathname, lock, owner, projection) {
	let released = false;
	const lease = {
		path: pathname,
		assertCurrent() {
			if (released || !verifyOwnerLock(owner, lock) || projection && !projection.verifyStillHeld()) throw new Error("OpenClaw state ownership is no longer current");
		},
		assertDatabaseAccess(databasePath) {
			if (released || owners.get(pathname) !== owner || resolveGatewayStateOwnerPath(databasePath) !== pathname || !verifyOwnerLock(owner, lock) || projection && !projection.verifyStillHeld()) throw new Error("OpenClaw state maintenance does not own this database");
		},
		run(operation) {
			lease.assertCurrent();
			readOwnerPaths.clear();
			const inherited = new Map(schemaOwners.getStore());
			const entry = {
				lease,
				active: true
			};
			inherited.set(pathname, entry);
			try {
				return schemaOwners.run(inherited, operation);
			} finally {
				entry.active = false;
				readOwnerPaths.clear();
			}
		},
		release() {
			readOwnerPaths.clear();
			if (!released) {
				projection?.release();
				lock.release();
				released = true;
				owner.locks.delete(lock);
				if (owner.locks.size === 0 && owners.get(pathname) === owner) {
					owner.accepting = false;
					owners.delete(pathname);
				}
			}
			if (owner.locks.size === 0) removeCreatedProjectionDirectories(owner.projectionDirectories);
		}
	};
	return lease;
}
/** One root owns startup or maintenance; only its registered custody can lend schema access. */
function acquireGatewayStateOwner(params) {
	const pathname = resolveGatewayStateOwnerPath(params.databasePath);
	if (owners.has(pathname)) throw new GatewayStateOwnerContentionError(params.databasePath);
	const payload = params.payload ? {
		...params.payload,
		ownerId: params.payload.ownerId ?? randomUUID()
	} : defaultPayload(params.databasePath);
	const owner = {
		kind: "process",
		payload,
		projectionPath: params.projectionPath,
		getProjection: params.getProjection,
		locks: /* @__PURE__ */ new Set(),
		projectionDirectories: [],
		accepting: true
	};
	const lock = acquireOwnerFile(params.databasePath, pathname, payload);
	owner.locks.add(lock);
	readOwnerPaths.clear();
	owners.set(pathname, owner);
	const lease = leaseForFile(pathname, lock, owner);
	try {
		lease.assertCurrent();
	} catch (error) {
		return runWithSqliteCleanup(lease, "state process ownership verification", () => {
			throw error;
		});
	}
	return {
		path: pathname,
		assertCurrent() {
			if (!owner.accepting || owners.get(pathname) !== owner) throw new Error("OpenClaw state process owner is no longer current");
			lease.assertCurrent();
		},
		assertDatabaseAccess: lease.assertDatabaseAccess,
		run: lease.run,
		release() {
			owner.accepting = false;
			lease.release();
		}
	};
}
/** Accepted schema work retains the sidecar even when its process owner stops lending. */
function acquireStateDatabaseSchemaLease(databasePath, options = {}) {
	readOwnerPaths.clear();
	const pathname = resolveGatewayStateOwnerPath(databasePath);
	let owner = owners.get(pathname);
	if (owner && (!owner.accepting || !hasPhysicalOwnership(owner))) throw new GatewayStateOwnerContentionError(databasePath);
	if (owner) assertStateDatabaseAccessAllowed(databasePath);
	const payload = owner?.payload ?? {
		...defaultPayload(databasePath),
		stateOwnerKind: "schema"
	};
	let lock;
	const projectionDirectories = [];
	try {
		lock = acquireOwnerFile(databasePath, pathname, payload, owner ? 0 : options.busyTimeoutMs ?? 5e3, projectionDirectories);
	} catch (error) {
		if (error instanceof GatewayStateOwnerContentionError) try {
			assertStateDatabaseAccessAllowed(databasePath);
		} catch (currentOwnerError) {
			if (currentOwnerError instanceof StateDatabaseAdmissionPendingError) throw currentOwnerError;
		}
		throw error;
	}
	const projectionPath = owner?.projectionPath ?? path.join(resolveGatewayLockDir(resolveOpenClawStateDirForDatabasePath(resolveIdentityPathViaExistingAncestorSync(databasePath))), "gateway.state.lock");
	let projection;
	try {
		projection = owner?.getProjection?.()?.retain() ?? acquireOwnerFile(databasePath, projectionPath, {
			...payload,
			role: payload.role === "gateway" ? "gateway" : "agent-embedded"
		}, 0, projectionDirectories);
	} catch (error) {
		return runWithSqliteCleanup({ release() {
			lock.release();
			removeCreatedProjectionDirectories(projectionDirectories);
		} }, "state schema projection admission", () => {
			throw error;
		});
	}
	if (owner) {
		owner.locks.add(lock);
		owner.projectionDirectories.push(...projectionDirectories);
	} else {
		owner = {
			kind: "schema",
			payload,
			projectionPath,
			locks: /* @__PURE__ */ new Set([lock]),
			projectionDirectories,
			accepting: true
		};
		owners.set(pathname, owner);
	}
	const lease = leaseForFile(pathname, lock, owner, projection);
	try {
		lease.assertCurrent();
		return lease;
	} catch (error) {
		return runWithSqliteCleanup(lease, "state schema ownership verification", () => {
			throw error;
		});
	}
}
/** A nested maintenance scope can retain only an already-held process root for its exact database. */
function tryBorrowGatewayStateOwner(databasePath) {
	const pathname = resolveGatewayStateOwnerPath(databasePath);
	const owner = owners.get(pathname);
	if (!owner || owner.kind !== "process") return;
	if (!owner.accepting || !hasPhysicalOwnership(owner)) throw new GatewayStateOwnerContentionError(databasePath);
	assertStateDatabaseAccessAllowed(databasePath);
	return acquireStateDatabaseSchemaLease(databasePath);
}
/** Startup recovery requires this process's retained Gateway root, not a schema loan. */
function hasActiveGatewayStateOwner(databasePath) {
	const owner = owners.get(resolveGatewayStateOwnerPath(databasePath));
	return owner?.kind === "process" && owner.accepting && (owner.payload.role ?? "gateway") === "gateway" && hasPhysicalOwnership(owner);
}
function hasRecentVerification(verifiedAt, now) {
	return verifiedAt !== void 0 && now - verifiedAt < READ_OWNERSHIP_MAX_AGE_MS;
}
/** Only explicit reads reuse recent physical verification; mutations always check freshly. */
function assertStateDatabaseReadAllowed(databasePath) {
	if (owners.size === 0) {
		assertStateDatabaseAccessAllowed(databasePath);
		return;
	}
	const key = path.resolve(databasePath);
	const now = performance.now();
	const cached = readOwnerPaths.get(key);
	const projection = cached?.owner.getProjection?.();
	if (cached && now < cached.expiresAt && owners.get(cached.pathname) === cached.owner && cached.owner.accepting && hasRecentVerification(cached.owner.verifiedAt, now) && (!cached.owner.getProjection || projection && hasRecentVerification(projection.verifiedAt, now))) return;
	readOwnerPaths.delete(key);
	const pathname = resolveGatewayStateOwnerPath(databasePath);
	const owner = owners.get(pathname);
	const role = owner?.payload.role ?? "gateway";
	if (!owner || owner.kind !== "process" || !owner.accepting || role !== "gateway" && role !== "agent-embedded") {
		assertStateDatabaseAccessAllowed(databasePath);
		return;
	}
	if (!hasPhysicalOwnership(owner) || owner.getProjection && !owner.getProjection()?.verifyStillHeld()) throw new Error(`OpenClaw state ownership at ${databasePath} could not be verified; retry after maintenance finishes.`);
	readOwnerPaths.set(key, {
		pathname,
		owner,
		expiresAt: now + READ_OWNERSHIP_MAX_AGE_MS
	});
}
/** Ordinary SQLite access observes maintenance; it never borrows schema authority. */
function assertStateDatabaseAccessAllowed(databasePath, captured) {
	const assertMaintenance = () => {
		const schemaLease = captured ? captured.schemaLease : getStateDatabaseSchemaLease(databasePath);
		if (schemaLease) {
			schemaLease.assertDatabaseAccess(databasePath);
			return;
		}
		const scope = captured ? captured.maintenanceScope : getOpenClawDatabaseMaintenanceScope();
		if (!scope) throw new Error(`OpenClaw state at ${databasePath} is undergoing offline maintenance; retry when it finishes.`);
		scope.assertDatabaseAccess(databasePath);
	};
	const pathname = resolveGatewayStateOwnerPath(databasePath);
	const local = owners.get(pathname);
	const unavailable = `OpenClaw state ownership at ${databasePath} could not be verified; retry after maintenance finishes.`;
	if (local) {
		if (!hasPhysicalOwnership(local)) throw new Error(unavailable);
		const role = local.payload.role ?? "gateway";
		if (!local.accepting || role !== "gateway" && role !== "agent-embedded") assertMaintenance();
		return;
	}
	let raw;
	try {
		raw = fs.readFileSync(pathname, "utf8");
	} catch (error) {
		if (extractErrorCode(error) === "ENOENT") return;
		throw new Error(unavailable, { cause: error });
	}
	const owner = parseGatewayLockPayload(raw);
	if (!owner) throw new StateDatabaseAdmissionPendingError(databasePath, unavailable);
	if (!Number.isSafeInteger(owner.pid) || owner.pid <= 0) throw new Error(unavailable);
	if (isLockOwnerDefinitelyStale({ payload: {
		pid: owner.pid,
		starttime: owner.startTime
	} })) return;
	if (owner.pid === process.pid && !isMainThread) return;
	if (!isPidAlive(owner.pid)) throw new Error(unavailable);
	const role = owner.role ?? "gateway";
	if (role === "gateway" || role === "agent-embedded") return;
	if (owner.pid === process.pid) {
		assertMaintenance();
		return;
	}
	if (owner.stateOwnerKind === "schema" && owner.role === "sqlite-maintenance") throw new StateDatabaseAdmissionPendingError(databasePath, `OpenClaw state at ${databasePath} is undergoing offline maintenance; retry when it finishes.`);
	throw new Error(`OpenClaw state at ${databasePath} is undergoing offline maintenance; retry when it finishes.`);
}
/** Cleanup must compete with local roots too; it cannot borrow a live Gateway's authority. */
function tryAcquireGatewayStateOwner(databasePath) {
	try {
		return acquireGatewayStateOwner({ databasePath });
	} catch (error) {
		if (error instanceof GatewayStateOwnerContentionError) return null;
		throw error;
	}
}
//#endregion
export { assertStateDatabaseReadAllowed as a, hasActiveGatewayStateOwner as c, tryBorrowGatewayStateOwner as d, withStateDatabaseColdAdmission as f, assertStateDatabaseAccessAllowed as i, resolveGatewayStateOwnerPath as l, acquireGatewayStateOwner as n, createGatewayStateProjection as o, parseGatewayLockPayload as p, acquireStateDatabaseSchemaLease as r, getStateDatabaseSchemaLease as s, GatewayStateOwnerContentionError as t, tryAcquireGatewayStateOwner as u };
