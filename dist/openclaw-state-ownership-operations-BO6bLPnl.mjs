import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as clearNodeSqliteKyselyCacheForDatabase } from "./kysely-sync-cache-state-BlM1eqOk.mjs";
import { t as openNodeSqliteDatabase } from "./node-sqlite-B4hwsR7e.mjs";
import { r as OpenClawStateOwnershipMetadataError } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { s as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS } from "./openclaw-state-db-contract-CQDemVBb.mjs";
import { a as runSqliteImmediateTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { i as configureSqliteWalMaintenance } from "./sqlite-wal-fdekKFS3.mjs";
import { i as assertStateDatabaseAccessAllowed } from "./gateway-state-owner-CPG45dwV.mjs";
import { E as assertOpenClawStateDatabaseForMaintenance, M as resolveDatabasePath } from "./openclaw-state-db-read-connection-DJObJIAO.mjs";
import { o as isGatewayExternallySupervised } from "./gateway-supervision-fKhmwUVZ.mjs";
import { n as assertSqliteIntegrity } from "./sqlite-integrity-BWdDHT-b.mjs";
import { f as openClawStateDatabaseCache } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { a as inspectOpenClawStateOwnershipFromDatabase, s as normalizeOpenClawStateManagerId, t as STATE_SUPERVISION_KEY } from "./openclaw-state-ownership-1l-TMJat.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
//#region src/state/openclaw-state-ownership-operations.ts
function requireOwnershipCheckpoint(walMaintenance, databasePath) {
	if (!walMaintenance.checkpoint()) throw new Error(`External ownership was committed for ${databasePath}, but its WAL checkpoint failed. Retry the same ownership claim before activating the supervisor.`);
}
function claimOwnershipRow(database, databasePath, managerId, repairMalformed) {
	let current = null;
	try {
		current = inspectOpenClawStateOwnershipFromDatabase(database, databasePath);
	} catch (error) {
		if (!repairMalformed || !(error instanceof OpenClawStateOwnershipMetadataError)) throw error;
	}
	if (current) {
		if (current.managerId !== managerId) throw new Error(`OpenClaw shared state is already claimed by external manager ${current.managerId}; manager ${managerId} cannot replace that durable ownership.`);
		return current;
	}
	const ownership = {
		version: 1,
		mode: "external",
		managerId,
		claimedAt: Date.now()
	};
	const valueJson = JSON.stringify(ownership);
	const stateDb = getNodeSqliteKysely(database);
	executeSqliteQuerySync(database, stateDb.insertInto("config_machine_state").values({
		state_key: STATE_SUPERVISION_KEY,
		value_json: valueJson,
		updated_at_ms: ownership.claimedAt
	}).onConflict((conflict) => conflict.column("state_key").doUpdateSet({
		value_json: valueJson,
		updated_at_ms: ownership.claimedAt
	})));
	return ownership;
}
function repairMalformedOwnershipClaim(databasePath, managerId) {
	assertStateDatabaseAccessAllowed(databasePath);
	const existing = openClawStateDatabaseCache.getOpenClawStateDatabaseIfOpenAtPath(databasePath);
	const database = existing?.db ?? openNodeSqliteDatabase(databasePath);
	let walMaintenance;
	try {
		database.exec(`PRAGMA busy_timeout = ${OPENCLAW_SQLITE_BUSY_TIMEOUT_MS};`);
		assertSqliteIntegrity(database, databasePath);
		assertOpenClawStateDatabaseForMaintenance(database, { pathname: databasePath });
		walMaintenance = existing?.walMaintenance ?? configureSqliteWalMaintenance(database, {
			busyTimeoutMs: 5e3,
			checkpointIntervalMs: 0,
			checkpointMode: "TRUNCATE",
			databaseLabel: "OpenClaw shared state ownership",
			databasePath
		});
		const ownership = runSqliteImmediateTransactionSync(database, () => {
			assertStateDatabaseAccessAllowed(databasePath);
			assertOpenClawStateDatabaseForMaintenance(database, { pathname: databasePath });
			return claimOwnershipRow(database, databasePath, managerId, true);
		}, {
			busyTimeoutMs: OPENCLAW_SQLITE_BUSY_TIMEOUT_MS,
			databaseLabel: databasePath,
			operationLabel: "state.ownership.repair"
		});
		requireOwnershipCheckpoint(walMaintenance, databasePath);
		return ownership;
	} finally {
		if (!existing) {
			walMaintenance?.close({ checkpointMode: "PASSIVE" });
			clearNodeSqliteKyselyCacheForDatabase(database);
			database.close();
		}
	}
}
/** Claim durable shared-state write ownership for the active external supervisor. */
function claimOpenClawStateOwnership(managerId, options = {}) {
	const env = options.env ?? process.env;
	if (!isGatewayExternallySupervised(env)) throw new Error("Claiming external shared-state ownership requires OPENCLAW_SUPERVISOR_MODE=external.");
	const normalizedManagerId = normalizeOpenClawStateManagerId(managerId);
	try {
		const database = openOpenClawStateDatabase(options);
		const ownership = runOpenClawStateWriteTransaction(({ db, path: databasePath }) => claimOwnershipRow(db, databasePath, normalizedManagerId, false), {
			...options,
			database
		}, { operationLabel: "state.ownership.claim" });
		requireOwnershipCheckpoint(database.walMaintenance, database.path);
		return ownership;
	} catch (error) {
		if (!(error instanceof OpenClawStateOwnershipMetadataError)) throw error;
		const ownership = repairMalformedOwnershipClaim(resolveDatabasePath(options), normalizedManagerId);
		openOpenClawStateDatabase(options);
		return ownership;
	}
}
//#endregion
export { claimOpenClawStateOwnership };
