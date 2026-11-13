import { n as computeBackoff } from "./src-DqaLEvc_.mjs";
import { t as extractSqliteTableSchema } from "./sqlite-schema-sql-CKIqAlrf.mjs";
import { r as runWithSqliteBusyTimeout } from "./sqlite-busy-timeout-DYrW2wFu.mjs";
import { a as isSqliteLockError } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import "./backoff-DG9ukw7j.mjs";
import { f as withOpenClawStateDatabaseReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { f as OPENCLAW_STATE_SCHEMA_SQL } from "./openclaw-state-db-legacy-backfills-xddLXhvs.mjs";
import { a as createOpenClawStateLeaseLostError, n as OpenClawStateLeaseError, s as toOpenClawStateLeaseVerificationError } from "./openclaw-state-lease-error-Ds9BTWol.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase, u as runWithOpenClawStateBusyTimeout } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as releaseOpenClawStateLeaseInTransaction, o as renewOpenClawStateLeaseInTransaction, r as readOpenClawStateLeaseExpiry } from "./openclaw-state-lease-store-mYOdDX2y.mjs";
import { n as createSqliteWorkerWriteAdmission } from "./sqlite-worker-store-DNLj-iuz.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { t as runExistingOpenClawStateWriteTransaction } from "./openclaw-state-db-existing-write-Bs94uHSu.mjs";
import path from "node:path";
import { setTimeout } from "node:timers/promises";
//#region src/state/openclaw-state-lease-storage.ts
const leaseSchema = ["schema_meta", "state_leases"].map((table) => extractSqliteTableSchema(OPENCLAW_STATE_SCHEMA_SQL, table, {
	endMarker: ") STRICT;",
	errorMessage: "Existing lease schema is unavailable."
})).join("\n");
function prepareLeaseDatabase(database) {
	if (database.schemaPolicy !== "existing") runWithOpenClawStateBusyTimeout(() => void 0, database.options ?? {}, 0);
}
function resolveLeaseDatabasePath(database) {
	return database.schemaPolicy === "existing" ? path.resolve(database.options?.path ?? resolveOpenClawStateSqlitePath(database.options?.env)) : openOpenClawStateDatabase(database.options).path;
}
function readLeaseDatabase(database, operation) {
	return database.schemaPolicy === "existing" ? withOpenClawStateDatabaseReadOnly(({ db }) => operation(db), database.options) : operation(openOpenClawStateDatabase(database.options).db);
}
async function acquireLease(database, input, assertCurrent, signal) {
	if (database.options?.readOnly) throw new Error("State lease acquisition requires writable storage");
	if (database.schemaPolicy === "existing" && database.options?.database) throw new Error("Existing-state writes require their own tracked writable connection.");
	const opened = database.schemaPolicy === "existing" ? void 0 : openOpenClawStateDatabase(database.options);
	const context = captureOpenClawStateWorkerContext({
		...database.options,
		path: opened?.path ?? resolveLeaseDatabasePath(database)
	});
	const assertAdmission = () => {
		context.admission.assertCurrent();
		assertCurrent();
		if (opened?.db.isTransaction) throw new OpenClawStateLeaseError("State lease acquisition requires no active transaction", { code: "OPENCLAW_STATE_LEASE_INVALID_INPUT" });
	};
	const result = await runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
		type: "stateLease.acquire",
		input: {
			...input,
			schemaPolicy: database.schemaPolicy
		}
	}, { signal }), {
		existingOnly: database.schemaPolicy === "existing",
		assertCurrent: assertAdmission,
		createAdmission: createSqliteWorkerWriteAdmission(assertAdmission, [context.admission.databasePath])
	});
	if (!result) throw new Error("State lease acquisition requires an existing database");
	return result;
}
function withLeaseWriteTransaction(database, operationLabel, operation, busyTimeoutMs = 0) {
	if (database.schemaPolicy === "existing") return runExistingOpenClawStateWriteTransaction(({ db }) => operation(db), database.options ?? {}, {
		operationLabel,
		busyTimeoutMs,
		schemaSql: leaseSchema
	});
	const stateDatabase = openOpenClawStateDatabase(database.options);
	const run = () => runOpenClawStateWriteTransaction(({ db }) => operation(db), {
		...database.options,
		database: stateDatabase
	}, {
		operationLabel,
		busyTimeoutMs
	});
	return runWithSqliteBusyTimeout(stateDatabase.db, busyTimeoutMs, run);
}
const STATE_LEASE_WRITE_BACKOFF = {
	initialMs: 25,
	maxMs: 250,
	factor: 1.5,
	jitter: .25
};
const RELEASE_RETRY_TIMEOUT_MS = 2e3;
function renewOpenClawStateLease(params) {
	return withLeaseWriteTransaction(params.database, params.operationLabel, (db) => {
		const expiresAt = renewOpenClawStateLeaseInTransaction(db, params, params.leaseMs);
		if (expiresAt === void 0) throw createOpenClawStateLeaseLostError(params);
		return expiresAt;
	});
}
function assertOpenClawStateLeaseOwnedInDatabase(database, params) {
	const expiresAt = readOpenClawStateLeaseExpiry(database, params);
	if (expiresAt === void 0) throw createOpenClawStateLeaseLostError(params);
	return expiresAt;
}
function verifyOpenClawStateLeaseOwnership(params) {
	try {
		if (params.transaction) return assertOpenClawStateLeaseOwnedInDatabase(params.transaction, params);
		if (!params.database) throw new Error("state lease ownership check requires a database");
		return readLeaseDatabase(params.database, (db) => assertOpenClawStateLeaseOwnedInDatabase(db, params));
	} catch (error) {
		throw toOpenClawStateLeaseVerificationError(params, error);
	}
}
function releaseOpenClawStateLease(params) {
	withLeaseWriteTransaction(params.database, params.operationLabel, (db) => releaseOpenClawStateLeaseInTransaction(db, params));
}
async function releaseOpenClawStateLeaseBestEffort(params, execute) {
	const deadline = performance.now() + RELEASE_RETRY_TIMEOUT_MS;
	let attempt = 0;
	while (true) try {
		if (execute) await execute();
		else releaseOpenClawStateLease(params);
		return;
	} catch (error) {
		const now = performance.now();
		if (!isSqliteLockError(error) || now >= deadline) {
			if (execute) throw error;
			return;
		}
		attempt += 1;
		await setTimeout(Math.min(deadline - now, computeBackoff(STATE_LEASE_WRITE_BACKOFF, attempt)));
	}
}
//#endregion
export { releaseOpenClawStateLeaseBestEffort as a, verifyOpenClawStateLeaseOwnership as c, releaseOpenClawStateLease as i, withLeaseWriteTransaction as l, acquireLease as n, renewOpenClawStateLease as o, prepareLeaseDatabase as r, resolveLeaseDatabasePath as s, STATE_LEASE_WRITE_BACKOFF as t };
