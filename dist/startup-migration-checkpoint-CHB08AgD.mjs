import { n as getFileLockProcessStartTime } from "./pid-alive-DB0zHgvx.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { d as sqlitePrimaryResultCode } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { a as runSqliteImmediateTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { t as VERSION } from "./version-BMuSsYfE.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { d as withExistingOpenClawStateDatabaseReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { n as assertOpenClawStateWriteAllowed } from "./openclaw-state-ownership-1l-TMJat.mjs";
import { d as withOpenClawStateStartupMigrationCheckpointDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { c as readStateLeaseProcessOwnerStatus, i as reclaimDeadOpenClawStateLeaseInTransaction, s as parseStateLeaseProcessOwner } from "./openclaw-state-lease-store-mYOdDX2y.mjs";
import { hostname } from "node:os";
import { randomUUID } from "node:crypto";
import { setTimeout } from "node:timers/promises";
//#region src/infra/acquire-with-wait.ts
/** Retry only acquisition, keeping the deadline independent of wall-clock changes. */
async function acquireWithWait(params) {
	const now = params.now ?? performance.now.bind(performance);
	let delayMs = params.pollIntervalMs;
	for (;;) try {
		return await params.acquire();
	} catch (error) {
		if (!params.shouldRetry(error)) throw error;
		const remainingMs = params.deadlineMs - now();
		if (remainingMs <= 0) throw error;
		await (params.sleep ?? setTimeout)(Math.min(delayMs, remainingMs));
		delayMs = Math.min(delayMs * 2, params.maxPollIntervalMs ?? params.pollIntervalMs);
	}
}
//#endregion
//#region src/infra/startup-migration-checkpoint.ts
const STARTUP_MIGRATION_META_KEY = "startup-migrations";
const STATE_MIGRATION_META_KEY = "state-migrations";
const STARTUP_MIGRATION_LEASE_SCOPE = "startup-migrations";
const STARTUP_MIGRATION_LEASE_KEY = "global";
const STARTUP_MIGRATION_LEASE_POLL_INTERVAL_MS = 250;
const STARTUP_MIGRATION_LEASE_TTL_MS = 3e5;
const STARTUP_MIGRATION_HEARTBEAT_INTERVAL_MS = 6e4;
var StartupMigrationLeaseConflictError = class extends Error {};
function withStartupMigrationCheckpointDatabase(env, callback, atomic = false) {
	return withOpenClawStateStartupMigrationCheckpointDatabase(callback, {
		env,
		atomic
	});
}
function writeStartupMigrationCheckpointDatabase(env, callback) {
	const databasePath = resolveOpenClawStateSqlitePath(env);
	return withStartupMigrationCheckpointDatabase(env, (db) => runSqliteImmediateTransactionSync(db, () => {
		assertOpenClawStateWriteAllowed({
			database: db,
			databasePath,
			env
		});
		return callback(db);
	}, {
		databaseLabel: databasePath,
		operationLabel: "state.startup-checkpoint.write"
	}));
}
function assertStartupMigrationLeaseOwnedInTransaction(params) {
	const stateDb = getNodeSqliteKysely(params.database);
	if (!executeSqliteQueryTakeFirstSync(params.database, stateDb.selectFrom("state_leases").select("owner").where("scope", "=", STARTUP_MIGRATION_LEASE_SCOPE).where("lease_key", "=", STARTUP_MIGRATION_LEASE_KEY).where("owner", "=", params.owner).where("expires_at", ">", params.nowMs ?? Date.now()))) throw new Error("OpenClaw startup migration lease was lost before startup migrations completed; retry so migrations can run under a fresh lease.");
}
/** Returns whether the shared startup/Doctor lease has a live process owner. */
function hasActiveStartupMigrationLease(params = {}) {
	const env = params.env ?? process.env;
	const nowMs = params.nowMs ?? Date.now();
	return withExistingOpenClawStateDatabaseReadOnly(({ db }) => {
		const stateDb = getNodeSqliteKysely(db);
		const lease = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("state_leases").select([
			"payload_json as payloadJson",
			"owner",
			"heartbeat_at as heartbeatAt"
		]).where("scope", "=", STARTUP_MIGRATION_LEASE_SCOPE).where("lease_key", "=", STARTUP_MIGRATION_LEASE_KEY).where("expires_at", ">", nowMs));
		if (!lease) return false;
		const owner = parseStateLeaseProcessOwner(lease.payloadJson);
		if (readStateLeaseProcessOwnerStatus(owner) === "dead") return false;
		params.onActivity?.({
			owner: lease.owner,
			pid: owner?.host === hostname() ? owner.pid : void 0,
			heartbeatAt: lease.heartbeatAt
		});
		return true;
	}, { env }) ?? false;
}
function acquireStartupMigrationLease(params, now) {
	const env = params.env ?? process.env;
	const owner = params.owner ?? randomUUID();
	return withStartupMigrationCheckpointDatabase(env, (db) => acquireStartupMigrationLeaseFromDatabase(db, {
		...params,
		env,
		nowMs: now(),
		owner
	}), true);
}
function acquireStartupMigrationLeaseFromDatabase(connection, params) {
	const env = params.env ?? process.env;
	const nowMs = params.nowMs ?? Date.now();
	const owner = params.owner ?? randomUUID();
	const ownerPid = params.ownerPid ?? process.pid;
	const leaseOwner = {
		pid: ownerPid,
		host: hostname(),
		startedAt: getFileLockProcessStartTime(ownerPid)
	};
	const expiresAt = nowMs + STARTUP_MIGRATION_LEASE_TTL_MS;
	runSqliteImmediateTransactionSync(connection, () => {
		const db = connection;
		assertOpenClawStateWriteAllowed({
			database: db,
			databasePath: resolveOpenClawStateSqlitePath(env),
			env
		});
		const stateDb = getNodeSqliteKysely(db);
		executeSqliteQuerySync(db, stateDb.deleteFrom("state_leases").where("scope", "=", STARTUP_MIGRATION_LEASE_SCOPE).where("lease_key", "=", STARTUP_MIGRATION_LEASE_KEY).where("expires_at", "<=", nowMs));
		const existing = reclaimDeadOpenClawStateLeaseInTransaction(db, {
			scope: STARTUP_MIGRATION_LEASE_SCOPE,
			key: STARTUP_MIGRATION_LEASE_KEY
		});
		const existingOwner = parseStateLeaseProcessOwner(existing?.payloadJson ?? null);
		if (existing) {
			const ownerHint = existingOwner ? ` (held by pid ${existingOwner.pid})` : "";
			throw new StartupMigrationLeaseConflictError(`OpenClaw startup migrations are already running for this state directory; retry after the other OpenClaw process finishes or after ${new Date(existing.expiresAt ?? expiresAt).toISOString()}.${ownerHint}`);
		}
		executeSqliteQuerySync(db, stateDb.insertInto("state_leases").values({
			scope: STARTUP_MIGRATION_LEASE_SCOPE,
			lease_key: STARTUP_MIGRATION_LEASE_KEY,
			owner,
			expires_at: expiresAt,
			heartbeat_at: nowMs,
			payload_json: JSON.stringify({
				version: VERSION,
				owner: leaseOwner
			}),
			created_at: nowMs,
			updated_at: nowMs
		}));
	}, {
		databaseLabel: resolveOpenClawStateSqlitePath(env),
		operationLabel: "state.startup-migration.lease.acquire"
	});
	return {
		owner,
		assertOwnedInTransaction: (database, assertionParams = {}) => {
			assertStartupMigrationLeaseOwnedInTransaction({
				database,
				owner,
				nowMs: assertionParams.nowMs
			});
		},
		heartbeat: (heartbeatParams = {}) => {
			const heartbeatNowMs = heartbeatParams.nowMs ?? Date.now();
			const heartbeatExpiresAt = heartbeatNowMs + STARTUP_MIGRATION_LEASE_TTL_MS;
			writeStartupMigrationCheckpointDatabase(env, (db) => {
				const stateDb = getNodeSqliteKysely(db);
				if (executeSqliteQuerySync(db, stateDb.updateTable("state_leases").set({
					expires_at: heartbeatExpiresAt,
					heartbeat_at: heartbeatNowMs,
					updated_at: heartbeatNowMs
				}).where("scope", "=", STARTUP_MIGRATION_LEASE_SCOPE).where("lease_key", "=", STARTUP_MIGRATION_LEASE_KEY).where("owner", "=", owner).where("expires_at", ">", heartbeatNowMs)).numAffectedRows !== 1n) throw new Error("OpenClaw startup migration lease was lost before startup migrations completed; retry so migrations can run under a fresh lease.");
			});
		},
		release: () => {
			writeStartupMigrationCheckpointDatabase(env, (db) => {
				const stateDb = getNodeSqliteKysely(db);
				executeSqliteQuerySync(db, stateDb.deleteFrom("state_leases").where("scope", "=", STARTUP_MIGRATION_LEASE_SCOPE).where("lease_key", "=", STARTUP_MIGRATION_LEASE_KEY).where("owner", "=", owner));
			});
		}
	};
}
function acquireStartupMigrationLeaseWithWait(params = {}) {
	const now = params.now ?? Date.now;
	const monotonicNow = params.monotonicNow ?? performance.now.bind(performance);
	const timeoutMs = Math.max(0, Math.min(params.timeoutMs ?? 3e5, STARTUP_MIGRATION_LEASE_TTL_MS));
	const pollIntervalMs = Math.max(1, params.pollIntervalMs ?? STARTUP_MIGRATION_LEASE_POLL_INTERVAL_MS);
	const owner = params.owner ?? randomUUID();
	return acquireWithWait({
		deadlineMs: monotonicNow() + timeoutMs,
		pollIntervalMs,
		now: monotonicNow,
		sleep: params.sleep,
		acquire: () => acquireStartupMigrationLease({
			env: params.env,
			owner,
			ownerPid: params.ownerPid
		}, now),
		shouldRetry: (error) => error instanceof StartupMigrationLeaseConflictError || sqlitePrimaryResultCode(error) === 5
	});
}
/** Unfinished owner work cannot retain an earlier successful aggregate checkpoint. */
function invalidateSuccessfulMigrationCheckpointsInTransaction(database) {
	executeSqliteQuerySync(database, getNodeSqliteKysely(database).deleteFrom("schema_meta").where("meta_key", "in", [STATE_MIGRATION_META_KEY, STARTUP_MIGRATION_META_KEY]));
}
//#endregion
export { invalidateSuccessfulMigrationCheckpointsInTransaction as a, hasActiveStartupMigrationLease as i, STARTUP_MIGRATION_LEASE_TTL_MS as n, acquireWithWait as o, acquireStartupMigrationLeaseWithWait as r, STARTUP_MIGRATION_HEARTBEAT_INTERVAL_MS as t };
