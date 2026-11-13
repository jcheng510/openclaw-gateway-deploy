import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as resolveIdentityPathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { t as openNodeSqliteDatabase } from "./node-sqlite-B4hwsR7e.mjs";
import { a as isSqliteLockError, p as withSqliteNativeOpen } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { o as runWithSqliteCleanup, r as OpenClawStateOwnershipMetadataError, t as OpenClawStateExternalOwnershipError } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { s as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS } from "./openclaw-state-db-contract-CQDemVBb.mjs";
import { i as assertStateDatabaseAccessAllowed, r as acquireStateDatabaseSchemaLease, s as getStateDatabaseSchemaLease, t as GatewayStateOwnerContentionError } from "./gateway-state-owner-CPG45dwV.mjs";
import { r as prepareSqliteReadOnlyLocationSync, t as prepareSqliteReadOnlyLocation } from "./sqlite-snapshot-source-DgqadUes.mjs";
import { r as normalizeOpenClawStateSchemaReadError } from "./openclaw-state-db-schema-migration-required-DQkqpkxd.mjs";
import { o as isGatewayExternallySupervised } from "./gateway-supervision-fKhmwUVZ.mjs";
import { a as requestSqliteWorkerSchemaMaintenance } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { i as quarantineOrphanedSqliteSidecars, n as hasOrphanedSqliteSidecars } from "./sqlite-files-BqDG9Qm0.mjs";
import { existsSync } from "node:fs";
import path from "node:path";
//#region src/infra/state-database-maintenance.ts
const StateSchemaMutationConflictError = resolveGlobalSingleton(Symbol.for("openclaw.stateSchemaMutationConflictError"), () => class SchemaMutationConflictError extends Error {
	constructor(databasePath, cause) {
		super(`OpenClaw refused shared state schema mutation at ${databasePath} because another Gateway owns that state directory. Stop that Gateway or perform the update through its managed restart path, then retry.`, { cause });
		this.name = "StateSchemaMutationConflictError";
	}
});
/** Ordinary transactions use SQLite; schema changes retain the installation's process owner. */
function withStateDatabaseSchemaMaintenance({ databasePath, busyTimeoutMs }, operation) {
	if (requestSqliteWorkerSchemaMaintenance(databasePath)) return operation();
	const canonical = resolveIdentityPathViaExistingAncestorSync(databasePath);
	const inherited = getStateDatabaseSchemaLease(canonical);
	if (inherited) {
		inherited.assertCurrent();
		return operation();
	}
	let lease;
	try {
		lease = acquireStateDatabaseSchemaLease(canonical, { busyTimeoutMs });
	} catch (error) {
		if (error instanceof GatewayStateOwnerContentionError) throw new StateSchemaMutationConflictError(canonical, error);
		throw error;
	}
	return runWithSqliteCleanup(lease, "state schema mutation", () => lease.run(operation));
}
//#endregion
//#region src/state/openclaw-state-ownership.ts
const STATE_SUPERVISION_KEY = "gateway.supervision";
const MAX_OWNERSHIP_TIMESTAMP_MS = 864e13;
const MANAGER_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u;
function isOpenClawStateWriteContentionError(error) {
	return error instanceof GatewayStateOwnerContentionError || error instanceof StateSchemaMutationConflictError || isSqliteLockError(error);
}
function normalizeOpenClawStateManagerId(managerId) {
	const normalized = managerId.trim();
	if (!MANAGER_ID_PATTERN.test(normalized)) throw new Error("External state ownership manager id must be a 1-128 character ASCII identifier.");
	return normalized;
}
function parseExternalOwnership(valueJson, databasePath) {
	let value;
	try {
		value = JSON.parse(valueJson);
	} catch {
		throw new OpenClawStateOwnershipMetadataError(databasePath, "reserved value is not valid JSON");
	}
	const record = isRecord(value) ? value : void 0;
	const keys = record ? Object.keys(record).toSorted().join(",") : "";
	const managerId = record?.managerId;
	const claimedAt = record?.claimedAt;
	if (keys !== "claimedAt,managerId,mode,version" || record?.version !== 1 || record?.mode !== "external" || typeof managerId !== "string" || !MANAGER_ID_PATTERN.test(managerId) || typeof claimedAt !== "number" || !Number.isSafeInteger(claimedAt) || claimedAt < 0 || claimedAt > MAX_OWNERSHIP_TIMESTAMP_MS) throw new OpenClawStateOwnershipMetadataError(databasePath, "reserved value does not match the version 1 external ownership contract");
	return {
		version: 1,
		mode: "external",
		managerId,
		claimedAt
	};
}
/** Inspect the reserved ownership row without entering the shared-state lifecycle. */
function inspectOpenClawStateOwnershipFromDatabase(database, databasePath, configMachineStateTableReady = false) {
	try {
		if (!configMachineStateTableReady && !tableExists(database, "config_machine_state")) return null;
		const ownershipSql = configMachineStateTableReady ? "SELECT value_json FROM config_machine_state WHERE state_key = ? LIMIT 1" : "SELECT value_json FROM config_machine_state NOT INDEXED WHERE state_key = ? LIMIT 1";
		const row = database.prepare(ownershipSql).get(STATE_SUPERVISION_KEY);
		if (!row) return null;
		if (typeof row.value_json !== "string") throw new OpenClawStateOwnershipMetadataError(databasePath, "reserved value is not text");
		return parseExternalOwnership(row.value_json, databasePath);
	} catch (error) {
		throw normalizeOpenClawStateSchemaReadError(error, databasePath);
	}
}
function inspectOwnershipThroughConnection(location, databasePath, openStateSchemaReadAdmission) {
	const database = withSqliteNativeOpen(() => openNodeSqliteDatabase(location, { readOnly: true }));
	let closeAdmission;
	try {
		closeAdmission = openStateSchemaReadAdmission?.(database);
		database.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS}; PRAGMA query_only = ON; PRAGMA trusted_schema = OFF;`);
		return inspectOpenClawStateOwnershipFromDatabase(database, databasePath);
	} finally {
		try {
			closeAdmission?.();
		} finally {
			database.close();
		}
	}
}
/** Inspect one resolved state database path without mutating its state tree. */
function inspectOpenClawStateOwnershipAtPath(databasePath) {
	const resolvedPath = path.resolve(databasePath);
	if (!existsSync(resolvedPath)) return null;
	const prepared = prepareSqliteReadOnlyLocationSync(resolvedPath);
	try {
		return inspectOwnershipThroughConnection(prepared.location, resolvedPath);
	} finally {
		prepared.cleanup();
	}
}
function assertOwnershipAllowsWrite(status, databasePath, env) {
	if (status && !isGatewayExternallySupervised(env)) throw new OpenClawStateExternalOwnershipError(databasePath, status.managerId);
}
/** Check write admission; callers may defer orphan-sidecar recovery until mutation is certain. */
async function assertOpenClawStateWriteAllowedAtPath(options) {
	options.signal?.throwIfAborted();
	const databasePath = path.resolve(options.databasePath);
	assertStateDatabaseAccessAllowed(databasePath);
	if (options.recoverOrphanedSidecars !== false && hasOrphanedSqliteSidecars(databasePath)) withStateDatabaseSchemaMaintenance({ databasePath }, () => quarantineOrphanedSqliteSidecars(databasePath));
	if (!existsSync(databasePath)) return;
	const env = options.env ?? process.env;
	const prepared = await prepareSqliteReadOnlyLocation(databasePath, {
		preserveSourceArtifacts: true,
		signal: options.signal
	});
	try {
		options.signal?.throwIfAborted();
		assertStateDatabaseAccessAllowed(databasePath);
		assertOwnershipAllowsWrite(inspectOwnershipThroughConnection(prepared.location, databasePath, options.openStateSchemaReadAdmission), databasePath, env);
	} finally {
		await prepared.cleanupAsync();
	}
}
/** Fence shared-state writes once an external manager has claimed ownership. */
function assertOpenClawStateWriteAllowed(options) {
	const resolvedPath = path.resolve(options.databasePath);
	assertStateDatabaseAccessAllowed(resolvedPath);
	assertOwnershipAllowsWrite(inspectOpenClawStateOwnershipFromDatabase(options.database, resolvedPath, options.schemaReady), resolvedPath, options.env ?? process.env);
}
//#endregion
export { inspectOpenClawStateOwnershipFromDatabase as a, StateSchemaMutationConflictError as c, inspectOpenClawStateOwnershipAtPath as i, withStateDatabaseSchemaMaintenance as l, assertOpenClawStateWriteAllowed as n, isOpenClawStateWriteContentionError as o, assertOpenClawStateWriteAllowedAtPath as r, normalizeOpenClawStateManagerId as s, STATE_SUPERVISION_KEY as t };
