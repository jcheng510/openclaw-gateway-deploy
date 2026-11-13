import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as clearNodeSqliteKyselyCacheForDatabase } from "./kysely-sync-cache-state-BlM1eqOk.mjs";
import { o as sqliteReaderDatabasePathKey } from "./sqlite-reader-lifecycle-B0eu7rNH.mjs";
import { d as onSqliteWalCheckpoint } from "./sqlite-wal-fdekKFS3.mjs";
import { o as closeOpenClawStateDatabaseByPath } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { t as createOpenClawAgentDatabaseClaim } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { i as getOpenClawAgentDatabaseValidation, p as recordOpenClawAgentCanonicalValidation } from "./openclaw-agent-db-validation-cache-C348cqkT.mjs";
import { s as assertOpenClawAgentDatabaseLease } from "./openclaw-agent-db-lease-B-E6z2mk.mjs";
import { C as settleOpenClawAgentDatabaseWorkerClose, h as readOpenClawAgentDatabaseWorkerLeaseReceipt } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { d as runOpenClawAgentWriteTransaction, f as withOpenClawAgentDatabaseAdmission, t as borrowOpenClawAgentDatabase } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { i as withFreshOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-open-BuSJ-FUr.mjs";
import { n as scheduleWorkerIdleGc, t as cancelWorkerIdleGc } from "./worker-idle-gc-CYLBZfNA.mjs";
import { n as runWithSqliteMutationWorkerCoordination } from "./session-accessor.sqlite-worker-coordination-DVYX6ljS.mjs";
import { i as waitForSqliteReclamationCommit, n as markSqliteReclamationSettled, t as SqliteReclamationRequestRefusedError } from "./session-accessor.sqlite-reclamation-commit-BW3XgI4j.mjs";
import { isDeepStrictEqual } from "node:util";
import { on, once } from "node:events";
//#region src/config/sessions/session-accessor.sqlite-worker-admission.runtime.ts
function withWorkerWriteAdmission(port, operationId, databaseOptions, operation, refreshMaintenanceProtection) {
	let admissionId = 0;
	let finalAdmission = false;
	const withAdmission = async (run) => {
		const requestedId = ++admissionId;
		const admission = await new Promise((resolve, reject) => {
			const receive = (admissionMessage) => {
				cleanup();
				if (admissionMessage.type !== "admission" || admissionMessage.operationId !== operationId || admissionMessage.admissionId !== requestedId) {
					reject(/* @__PURE__ */ new Error("SQLite reclamation Worker received invalid write admission"));
					return;
				}
				resolve(admissionMessage);
			};
			const closed = () => {
				cleanup();
				reject(/* @__PURE__ */ new Error("SQLite reclamation parent closed during database admission"));
			};
			const cleanup = () => {
				port.off("message", receive);
				port.off("close", closed);
			};
			port.on("message", receive);
			port.once("close", closed);
			port.postMessage({
				type: "admission-request",
				operationId,
				admissionId: requestedId
			});
		});
		if (admission.allowed && admission.maintenanceProtection) refreshMaintenanceProtection?.(admission.maintenanceProtection);
		const value = await run(() => {
			if (!admission.allowed) throw new SqliteReclamationRequestRefusedError("SQLite reclamation database admission was revoked");
		}, admission.validation);
		if (!finalAdmission) port.postMessage({
			type: "admission-release",
			operationId,
			admissionId: requestedId
		});
		return value;
	};
	return withOpenClawAgentDatabaseAdmission(databaseOptions, withAdmission, (database) => {
		finalAdmission = true;
		return operation(database);
	});
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-mutation-worker.runtime.ts
const WORKER_CLOSE_MAX_ATTEMPTS = 3;
async function settleReclamationDatabase(pathname) {
	const warnings = /* @__PURE__ */ new Set();
	let outcome = {
		errors: [],
		settled: false
	};
	for (let attempt = 0; attempt < WORKER_CLOSE_MAX_ATTEMPTS; attempt += 1) {
		outcome = settleOpenClawAgentDatabaseWorkerClose(pathname);
		outcome.errors.forEach((error) => warnings.add(error.message));
		if (outcome.settled) break;
		if (attempt + 1 < WORKER_CLOSE_MAX_ATTEMPTS) await new Promise((resolve) => {
			setTimeout(resolve, 25 * 2 ** attempt);
		});
	}
	return {
		cleanupWarnings: [...warnings],
		settled: outcome.settled
	};
}
function throwReclamationFailure(error, cleanup, commitGate) {
	if (!cleanup.settled) throw new AggregateError([error, ...cleanup.cleanupWarnings.map((warning) => new Error(warning))], "SQLite session reclamation failed and Worker cleanup is incomplete; restart OpenClaw before deleting the owning agent", { cause: error });
	markSqliteReclamationSettled(commitGate);
	throw error;
}
async function runColdMutationWorkerPort(port, data) {
	const [request] = await once(port, "message");
	if (request.type !== "mutate") throw new Error("SQLite cold mutation Worker received invalid admission");
	const response = await runWithSqliteMutationWorkerCoordination(request.coordination, 0, data.plan.databaseOptions, (databaseOptions) => runColdMutationWorker(port, {
		...data,
		plan: {
			...data.plan,
			databaseOptions
		}
	}));
	port.postMessage(response);
	port.close();
}
async function runColdMutationWorker(port, data) {
	const { mutateSessionColdTranscriptInWorker, prepareSessionColdRestoreInWorker } = await import("./session-cold-storage-worker-BVhMwd5p.mjs");
	const coldRecords = data.plan.kind === "cold-restore" ? await prepareSessionColdRestoreInWorker(data.plan) : void 0;
	const commitGate = data.commitGate;
	let result;
	let validation;
	try {
		result = await withWorkerWriteAdmission(port, 0, data.plan.databaseOptions, async (openedDatabase) => {
			let transactionDatabase;
			try {
				return mutateSessionColdTranscriptInWorker(data.plan, coldRecords, (database) => {
					transactionDatabase = database.db;
					waitForSqliteReclamationCommit(commitGate, () => port.postMessage({
						type: "commit-request",
						operationId: 0
					}));
				});
			} finally {
				validation = getOpenClawAgentDatabaseValidation(openedDatabase);
				if (transactionDatabase && (!transactionDatabase.isOpen || !transactionDatabase.isTransaction)) markSqliteReclamationSettled(commitGate);
			}
		});
	} catch (error) {
		throwReclamationFailure(error, await settleReclamationDatabase(data.plan.databaseOptions.path), commitGate);
	}
	const cleanup = await settleReclamationDatabase(data.plan.databaseOptions.path);
	return {
		type: "reclaimed",
		operationId: 0,
		result: {
			result,
			...cleanup.cleanupWarnings.length > 0 ? { cleanupWarnings: cleanup.cleanupWarnings } : {},
			...!cleanup.settled ? { cleanupIncomplete: true } : {}
		},
		settled: true,
		validation: cleanup.settled ? validation : void 0
	};
}
async function runReclamationWorkerPort(port, databaseOptions, pooledTask) {
	let reclaimSqliteSessionInTransaction;
	let claim;
	let retainedDatabase;
	let lease;
	let commitGate;
	let operationId = pooledTask?.operationId ?? 0;
	let failureCleanup;
	let checkpointResultOwnedByRequest = false;
	const checkpointPath = sqliteReaderDatabasePathKey(databaseOptions.path);
	const stopCheckpointRelay = onSqliteWalCheckpoint(({ databasePath, ...snapshot }) => {
		if (!checkpointResultOwnedByRequest && databasePath === checkpointPath && claim?.isCurrent()) port.postMessage({
			type: "checkpoint",
			operationId,
			snapshot
		});
	});
	const closeDatabase = async () => {
		checkpointResultOwnedByRequest = false;
		const cleanup = await settleReclamationDatabase(databaseOptions.path);
		claim?.release();
		claim = void 0;
		return cleanup;
	};
	try {
		for await (const [message] of on(port, "message")) {
			const request = message;
			if (request.type === "admission") continue;
			cancelWorkerIdleGc();
			const requestDatabaseOptions = request.type === "close" ? databaseOptions : request.type === "canonical-validation" ? request.databaseOptions : request.plan.databaseOptions;
			if (request.operationId !== ++operationId || !isDeepStrictEqual(requestDatabaseOptions, databaseOptions)) throw new Error("SQLite session reclamation database owner is no longer current");
			if (pooledTask) pooledTask.operationId = operationId;
			failureCleanup = void 0;
			const response = await runWithSqliteMutationWorkerCoordination(request.coordination, operationId, databaseOptions, async (options) => {
				if (request.type === "close") {
					const cleanup = await closeDatabase();
					if (pooledTask) {
						if (!cleanup.settled) throw new Error("Canonical validation task could not close its agent database");
						closeOpenClawStateDatabaseByPath(request.coordination.databasePath);
					}
					return {
						type: "closed",
						...cleanup
					};
				}
				commitGate = request.commitGate;
				try {
					claim?.assertCurrent();
					if (request.type === "reclaim") ({reclaimSqliteSessionInTransaction} = await import("./session-accessor.sqlite-reclamation-BF_r63x-.mjs"));
					const canonical = request.type === "canonical-validation" ? await import("./session-canonical-validation-DYcgC-da.mjs") : void 0;
					let prepared;
					if (canonical && request.type === "canonical-validation" && !request.initializeCanonicalValidation) {
						const prepare = (database) => {
							const batch = canonical.readPendingCanonicalSessionValidationBatch(database, request);
							return canonical.validateCanonicalSessionValidationBatch(batch);
						};
						if (retainedDatabase) prepared = prepare({
							agentId: options.agentId,
							db: retainedDatabase
						});
						else {
							const opened = withFreshOpenClawAgentDatabaseReadOnly(prepare, options);
							if (!opened.found) throw new Error(`Cannot validate canonical sessions: ${opened.reason}`);
							prepared = opened.value;
						}
					}
					const maintenanceOwner = request.type === "reclaim" && request.plan.kind === "maintenance-plan" ? await import("./session-accessor.sqlite-maintenance-transaction-B1ydrS0P.mjs") : void 0;
					const maintenance = request.type === "reclaim" && request.plan.kind === "maintenance-plan" ? maintenanceOwner?.prepareSessionMaintenanceInWorker({
						...request.plan,
						databaseOptions: options
					}) : void 0;
					let validation;
					const result = await withWorkerWriteAdmission(port, operationId, options, (database) => {
						const openedForRequest = !claim;
						if (!claim) {
							const borrowed = borrowOpenClawAgentDatabase(options);
							claim = createOpenClawAgentDatabaseClaim(database, borrowed.release);
							retainedDatabase = database.db;
							lease = readOpenClawAgentDatabaseWorkerLeaseReceipt(options.path);
							port.postMessage({
								type: "lease",
								receipt: lease
							});
						}
						claim.assertCurrent();
						const currentClaim = claim;
						if (retainedDatabase !== database.db || !lease) throw new Error("SQLite session reclamation database owner is no longer current");
						assertOpenClawAgentDatabaseLease(lease.leaseId, options);
						try {
							checkpointResultOwnedByRequest = request.type === "reclaim" && request.plan.kind === "maintenance-pages";
							const authorizeCommit = () => waitForSqliteReclamationCommit(request.commitGate, () => port.postMessage({
								type: "commit-request",
								operationId
							}));
							const reclaimed = request.type === "canonical-validation" ? runOpenClawAgentWriteTransaction((transactionDatabase) => {
								currentClaim.assertCurrent();
								if (!canonical) throw new Error("Canonical validation lost its prepared batch");
								const counts = {
									validatedRows: 0,
									certifiedRows: 0,
									oversizedRows: 0
								};
								if (request.initializeCanonicalValidation) canonical.seedCanonicalSessionValidation(transactionDatabase);
								else {
									if (!prepared) throw new Error("Canonical validation lost its prepared batch");
									counts.certifiedRows = canonical.compareAndCertifyCanonicalSessionValidationBatch(transactionDatabase, prepared);
									counts.validatedRows = prepared.rows.length;
									counts.oversizedRows = prepared.oversizedRows;
								}
								const hasMore = canonical.hasPendingCanonicalSessionValidation(transactionDatabase);
								authorizeCommit();
								if (!hasMore) recordOpenClawAgentCanonicalValidation(transactionDatabase);
								return {
									validatedRows: counts.validatedRows,
									certifiedRows: counts.certifiedRows,
									hasMore,
									oversizedRows: counts.oversizedRows
								};
							}, options, { operationLabel: "session.canonical-validation.certify" }) : request.plan.kind === "maintenance-plan" && maintenanceOwner ? maintenanceOwner.reclaimSessionMaintenanceInTransaction({
								...request.plan,
								databaseOptions: options
							}, {
								beforeMutation: currentClaim.assertCurrent,
								onCommit: authorizeCommit
							}, maintenance) : reclaimSqliteSessionInTransaction({
								...request.plan,
								databaseOptions: options
							}, {
								beforeMutation: currentClaim.assertCurrent,
								onCommit: authorizeCommit,
								afterCommit: () => markSqliteReclamationSettled(request.commitGate)
							});
							if (openedForRequest) validation = getOpenClawAgentDatabaseValidation(database);
							return reclaimed;
						} finally {
							checkpointResultOwnedByRequest = false;
							if (!database.db.isOpen || !database.db.isTransaction) markSqliteReclamationSettled(commitGate);
							clearNodeSqliteKyselyCacheForDatabase(database.db);
						}
					}, request.type === "reclaim" && request.plan.kind === "maintenance-plan" ? (protection) => {
						if (request.plan.kind === "maintenance-plan") Object.assign(request.plan.input, protection);
					} : void 0).finally(() => maintenance?.release());
					return {
						type: "reclaimed",
						operationId,
						result,
						settled: true,
						validation
					};
				} catch (error) {
					if (request.type === "reclaim" && !pooledTask && error instanceof SqliteReclamationRequestRefusedError && (!claim && !retainedDatabase || claim?.isCurrent() && retainedDatabase?.isOpen && !retainedDatabase.isTransaction)) {
						markSqliteReclamationSettled(commitGate);
						return {
							type: "refused",
							operationId,
							settled: true
						};
					}
					failureCleanup = await closeDatabase();
					return throwReclamationFailure(error, failureCleanup, commitGate);
				}
			});
			if (response.type === "closed") {
				port.postMessage(response);
				if (pooledTask) {
					const [release] = await once(port, "message");
					if (!isRecord(release) || release.type !== "release" || release.operationId !== operationId) throw new Error("Canonical validation task received an invalid close release");
				}
				port.close();
				return response;
			}
			if (request.type === "reclaim") request.plan.materializedPlans.length = 0;
			port.postMessage(response);
			commitGate = void 0;
			scheduleWorkerIdleGc();
		}
		throw new Error("SQLite session reclamation parent closed without retiring its worker");
	} catch (error) {
		if (failureCleanup) port.postMessage({
			type: "closed",
			...failureCleanup
		});
		throw error;
	} finally {
		stopCheckpointRelay();
		claim?.release();
	}
}
//#endregion
export { runColdMutationWorkerPort, runReclamationWorkerPort };
