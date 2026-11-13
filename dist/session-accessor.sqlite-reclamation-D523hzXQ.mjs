import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { r as getChildLogger } from "./logger-DabFgCLJ.mjs";
import { r as runWithSqliteBusyTimeout } from "./sqlite-busy-timeout-DYrW2wFu.mjs";
import { a as withSqlitePostCommitPublications, t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { a as resolveOpenClawStateDirForDatabasePath, s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { o as isGatewayExternallySupervised } from "./gateway-supervision-fKhmwUVZ.mjs";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.mjs";
import { i as readOpenClawAgentDatabaseIdentity } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { c as resolveOpenClawAgentSqlitePath, i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { l as deferOpenClawAgentPostCommitPublication } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { c as openOpenClawAgentDatabase, d as runOpenClawAgentWriteTransaction, o as getOpenClawAgentDatabaseIfOpen } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { t as retainOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { g as runExclusiveSqliteSessionWrite, i as getSessionKysely, y as withSqliteSessionDatabase } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { r as publishSessionEntryCacheInvalidation } from "./session-accessor.sqlite-entry-cache-DYTBofzQ.mjs";
import { N as runSqliteSessionDeletionTransaction, Z as sqliteLifecycleTargetSnapshotsEqual, _ as deleteSessionDeliveryArtifacts, o as readLifecycleTargetSnapshot, r as deleteLifecycleTargetRows, y as readSessionNodeArtifactFingerprint } from "./session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
import { i as isRecentHistoricalSessionId, r as collectSessionStateIdsForEntry } from "./session-accessor.sqlite-references-YChoasaE.mjs";
import { t as prepareCommittedSessionEntryRemovals } from "./session-accessor.sqlite-identity-C3Jm_Tf4.mjs";
import { d as withSqliteMutationWorkerLifetime, r as withSqliteReclamationWorker } from "./session-accessor.sqlite-reclamation-worker-Du8IF7nF.mjs";
import { a as withSqliteReclamationAuthorization } from "./session-accessor.sqlite-reclamation-commit-BW3XgI4j.mjs";
import { i as prepareSessionTranscriptArchivePublishPlans, o as recordSessionTranscriptArchivePublishResults } from "./session-accessor.sqlite-archive-store-kernel-B7AKinHq.mjs";
import { n as readSqliteSessionGenerationClaim, r as readSqliteSessionGenerationWindows } from "./session-accessor.sqlite-generation-copy-DiZ7vuHk.mjs";
import { a as deletePlannedLifecycleArtifactEntries, i as deleteMaterializedSessionStatePlans, p as shouldRemoveSessionEntry, t as assertPlannedLifecycleArtifactEntriesUnchanged } from "./session-accessor.sqlite-lifecycle-state-DalYr83g.mjs";
import { n as reclaimSessionMaintenanceInTransaction } from "./session-accessor.sqlite-maintenance-transaction-DqhJSpP3.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/config/sessions/session-accessor.sqlite-archive-transaction.ts
/** Archive metadata retains the reclamation worker's transaction and commit authority. */
function reclaimSessionArchivePublicationInTransaction(plan, callbacks) {
	return runOpenClawAgentWriteTransaction((database) => {
		callbacks.beforeMutation?.();
		if (plan.kind === "archive-publish-prepare") {
			const value = prepareSessionTranscriptArchivePublishPlans(database, plan);
			if (value.length > 0) callbacks.onCommit?.(database);
			return {
				kind: plan.kind,
				value
			};
		}
		recordSessionTranscriptArchivePublishResults(database, plan.results, plan.nowMs);
		callbacks.onCommit?.(database);
		return {
			kind: plan.kind,
			value: true
		};
	}, plan.databaseOptions, { operationLabel: `session.${plan.kind}` });
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-reclamation-publication.ts
function prepareReclamationPublication(plan, databaseIdentity, result) {
	if (plan.kind === "maintenance-finalize" && result?.kind === "maintenance-finalize") return prepareCommittedSessionEntryRemovals(plan.agentId, databaseIdentity, result.value.committedEntries);
	if (plan.kind === "lifecycle-artifacts") return prepareCommittedSessionEntryRemovals(plan.agentId, databaseIdentity, plan.entries);
}
function collectReclamationChangedSessionKeys(plan, result) {
	switch (result.kind) {
		case "maintenance-plan": return result.value.archivedSessionKeys;
		case "maintenance-finalize": return result.value.committedEntries.map(({ sessionKey }) => sessionKey);
		case "maintenance-preservation-required":
		case "maintenance-plan-stale":
		case "maintenance-statistics": return [];
		default: return [...plan.materializedPlans.flatMap(({ snapshot }) => snapshot.sessionKey ? [snapshot.sessionKey] : []), ...plan.kind === "lifecycle-artifacts" ? plan.entries.map(({ sessionKey }) => sessionKey) : plan.kind === "entry" || plan.kind === "historical-generation" ? [plan.deleteParams.target.canonicalKey, ...plan.deleteParams.target.storeKeys] : []];
	}
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-reclamation-run.ts
function prepareReclamationWorkerTransferList(plan) {
	const buffers = /* @__PURE__ */ new Set();
	for (const materializedPlan of plan.materializedPlans) {
		const archive = materializedPlan.archive;
		if (!archive) continue;
		const bytes = archive.bytes;
		let owned = bytes;
		let buffer;
		if (bytes.buffer instanceof ArrayBuffer && bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength) buffer = bytes.buffer;
		else {
			buffer = new ArrayBuffer(bytes.byteLength);
			owned = new Uint8Array(buffer);
			owned.set(bytes);
		}
		materializedPlan.archive = {
			...archive,
			bytes: owned
		};
		buffers.add(buffer);
	}
	return [...buffers];
}
async function runPreparedSqliteSessionReclamation(params, owner) {
	const { database, claim, worker, assertRequestCurrent, commitGate } = owner;
	const { plan } = params;
	const assertCommitAllowed = () => {
		worker.assertCurrent(plan.databaseOptions, claim);
		assertRequestCurrent();
	};
	assertCommitAllowed();
	let publishCommitted;
	return await withSqliteReclamationAuthorization(commitGate, database.db, () => {
		assertCommitAllowed();
		publishCommitted = prepareReclamationPublication(plan, claim.identity);
	}, (authorize) => worker.run({
		claim,
		validationOwner: {
			database,
			isCurrent: claim.isCurrent
		},
		commitGate,
		plan,
		diagnostics: params.diagnostics,
		onCommitRequest: authorize,
		withWriteAdmission: async (run, reclamationAdmission) => await runExclusiveSqliteSessionWrite(plan.databaseOptions, async () => {
			let refusal;
			let maintenanceProtection;
			try {
				maintenanceProtection = params.refreshMaintenanceProtection?.();
				assertCommitAllowed();
			} catch (error) {
				refusal = { error };
			}
			const completed = await run(refusal, maintenanceProtection);
			if (completed) {
				params.onWorkerResult?.(completed, claim.identity);
				withSqlitePostCommitPublications(database.db, () => {
					const publishRemoval = plan.kind === "maintenance-finalize" ? prepareReclamationPublication(plan, claim.identity, completed) : publishCommitted;
					if (publishRemoval) deferSqlitePostCommitPublication(database.db, publishRemoval);
					for (const sessionKey of new Set(collectReclamationChangedSessionKeys(plan, completed))) publishSessionEntryCacheInvalidation(database, { sessionKey });
				});
				if (plan.kind === "maintenance-statistics" && getOpenClawAgentDatabaseIfOpen(plan.databaseOptions)?.db === database.db) try {
					assertCommitAllowed();
					runWithSqliteBusyTimeout(database.db, 0, () => {
						database.db.exec("ANALYZE sqlite_schema;");
					});
				} catch (error) {
					try {
						getChildLogger({ subsystem: "session-sqlite" }).warn("Committed SQLite session statistics could not refresh parent planner metadata", {
							agentId: database.agentId,
							error,
							path: database.path
						});
					} catch {}
				}
			}
		}, "session.reclamation.worker-commit", {
			...params.diagnostics,
			reclamationAdmission
		}, "worker", owner.signal).catch((error) => {
			if (owner.signal.aborted) assertCommitAllowed();
			throw error;
		}),
		transferList: prepareReclamationWorkerTransferList(plan)
	}));
}
//#endregion
//#region src/config/sessions/session-accessor.sqlite-reclamation.ts
const reclamationQueue = resolveGlobalSingleton(Symbol.for("openclaw.sqliteSessionReclamationQueue"), () => new KeyedAsyncQueue());
/** Bounds materialized archive bytes through the matching reclamation commit. */
function runExclusiveSqliteSessionReclamation(run) {
	return reclamationQueue.enqueue("session-reclamation", run);
}
function resolveSessionReclamationDatabaseOptions(options) {
	const sourceEnv = options.env ?? process.env;
	const sharedStatePath = options.database?.path ?? resolveOpenClawStateSqlitePath(sourceEnv);
	return {
		agentId: normalizeAgentId(options.agentId),
		env: {
			OPENCLAW_STATE_DIR: resolveOpenClawStateDirForDatabasePath(sharedStatePath),
			...isGatewayExternallySupervised(sourceEnv) ? { OPENCLAW_SUPERVISOR_MODE: "external" } : {}
		},
		path: resolveOpenClawAgentSqlitePath(options)
	};
}
function deleteSessionBoardRows(database, sessionKeys) {
	const keys = [...new Set(sessionKeys)];
	if (keys.length === 0) return;
	const db = getNodeSqliteKysely(database.db);
	const tables = new Set(executeSqliteQuerySync(database.db, db.selectFrom("sqlite_schema").select("name").where("type", "=", "table").where("name", "in", ["board_tabs", "board_widgets"])).rows.map((row) => row.name));
	if (!tables.has("board_tabs") || !tables.has("board_widgets")) return;
	executeSqliteQuerySync(database.db, db.deleteFrom("board_widgets").where("session_key", "in", keys));
	executeSqliteQuerySync(database.db, db.deleteFrom("board_tabs").where("session_key", "in", keys));
}
function shouldDeleteSqliteSessionEntryLifecycle(database, entry, params, scope = {
	kind: "entry",
	phase: "plan"
}) {
	if (params.expectedDatabaseIdentity !== void 0 && params.expectedDatabaseIdentity !== readOpenClawAgentDatabaseIdentity(database).identity) return false;
	if (!shouldRemoveSessionEntry(entry, {
		expectedEntry: params.expectedEntry || void 0,
		expectedSessionId: params.expectedSessionId,
		expectedLifecycleRevision: params.expectedLifecycleRevision,
		expectedUpdatedAt: params.expectedUpdatedAt
	})) return false;
	if (scope.kind === "entry" && params.expectedNodeArtifactFingerprint !== void 0 && params.expectedNodeArtifactFingerprint !== readSessionNodeArtifactFingerprint(database, params.target.canonicalKey)) return false;
	if (params.expectedGenerations) {
		const expected = new Map(params.expectedGenerations.map((generation) => [generation.window.session_id, generation]));
		if (readSqliteSessionGenerationWindows(database, scope.kind === "entry" ? [params.target.canonicalKey, ...params.target.storeKeys] : [], scope.kind === "entry" ? collectSessionStateIdsForEntry(entry) : [scope.sessionId]).some((window) => {
			const generation = expected.get(window.session_id);
			return !generation || !isDeepStrictEqual({ ...generation.window }, { ...window }) || scope.phase === "commit" && generation.fingerprint !== readSqliteSessionGenerationClaim(database, window).fingerprint;
		})) return false;
	}
	return true;
}
function readValidatedSessionDeletionTarget(database, validation) {
	const snapshot = readLifecycleTargetSnapshot(database, validation.deleteParams.target);
	const entry = snapshot[0]?.entry;
	if (!sqliteLifecycleTargetSnapshotsEqual(validation.preparedTargetSnapshot, snapshot) || !shouldDeleteSqliteSessionEntryLifecycle(database, entry, validation.deleteParams, validation.scope)) return;
	return {
		snapshot,
		entry
	};
}
function* prepareHistoricalGenerationDeletions(params) {
	const expected = params.deleteParams.expectedGenerations ? new Map(params.deleteParams.expectedGenerations.map((generation) => [generation.window.session_id, generation])) : void 0;
	for (const sessionId of params.sessionIds) {
		const generation = expected?.get(sessionId);
		yield {
			sessionId,
			deleteParams: expected ? {
				...params.deleteParams,
				expectedGenerations: generation ? [generation] : []
			} : params.deleteParams,
			preparedTargetSnapshot: params.preparedTargetSnapshot,
			scope: {
				kind: "historical-generation",
				phase: "plan",
				sessionId
			}
		};
	}
}
function expectedEntryMismatchResult(archivedTranscripts = []) {
	return {
		archivedTranscripts,
		deleted: false,
		expectedEntryMismatch: true
	};
}
function reclaimSqliteSessionInTransaction(plan, callbacks = {}) {
	if (plan.kind === "maintenance-pages") {
		const database = openOpenClawAgentDatabase(plan.databaseOptions);
		return {
			kind: plan.kind,
			value: database.walMaintenance.reclaimFreePages({
				maxPages: plan.maxPages,
				beforeMutation: callbacks.beforeMutation,
				onCommit: () => callbacks.onCommit?.(database),
				afterCommit: callbacks.afterCommit
			})
		};
	}
	const result = reclaimSqliteRowsInTransaction(plan, callbacks);
	callbacks.afterCommit?.();
	if (result.kind === "history-eviction" && result.value.deleted) reclaimSqliteFreePagesBestEffort(plan.databaseOptions);
	return result;
}
function reclaimSqliteRowsInTransaction(plan, callbacks) {
	if (plan.kind === "archive-publish-prepare" || plan.kind === "archive-publish-record") return reclaimSessionArchivePublicationInTransaction(plan, callbacks);
	if (plan.kind === "maintenance-plan" || plan.kind === "maintenance-finalize" || plan.kind === "maintenance-statistics") return reclaimSessionMaintenanceInTransaction(plan, callbacks);
	if (plan.kind === "entry") {
		const value = runSqliteSessionDeletionTransaction((transactionDb) => {
			callbacks.beforeMutation?.();
			const current = readValidatedSessionDeletionTarget(transactionDb, {
				...plan,
				scope: {
					kind: "entry",
					phase: "commit"
				}
			});
			if (!current) return expectedEntryMismatchResult();
			const { snapshot, entry } = current;
			const sessionKeys = [
				plan.deleteParams.target.canonicalKey,
				...plan.deleteParams.target.storeKeys,
				...snapshot.map((row) => row.sessionKey)
			];
			const archivedTranscripts = deleteMaterializedSessionStatePlans(transactionDb, plan.materializedPlans, void 0, new Set(sessionKeys));
			deleteLifecycleTargetRows(transactionDb, plan.deleteParams.target);
			if (plan.deleteParams.deleteDeliveryArtifacts === true) deleteSessionDeliveryArtifacts(transactionDb, plan.deleteParams.target.canonicalKey, sessionKeys);
			deleteSessionBoardRows(transactionDb, sessionKeys);
			callbacks.onCommit?.(transactionDb);
			return {
				archivedTranscripts,
				deleted: true,
				deletedEntry: structuredClone(entry),
				...entry.sessionId ? { deletedSessionId: entry.sessionId } : {}
			};
		}, plan.databaseOptions, { operationLabel: "session.reclaim.entry" });
		return {
			kind: plan.kind,
			value
		};
	}
	if (plan.kind === "lifecycle-artifacts") {
		const value = runSqliteSessionDeletionTransaction((transactionDb) => {
			callbacks.beforeMutation?.();
			assertPlannedLifecycleArtifactEntriesUnchanged(transactionDb, plan.entries);
			const archivedTranscripts = deleteMaterializedSessionStatePlans(transactionDb, plan.materializedPlans, void 0, new Set(plan.entries.map((entry) => entry.sessionKey)));
			const removedEntries = deletePlannedLifecycleArtifactEntries(transactionDb, plan.entries);
			callbacks.onCommit?.(transactionDb);
			return {
				archivedTranscripts,
				removedEntries
			};
		}, plan.databaseOptions, { operationLabel: "session.reclaim.lifecycle-artifacts" });
		return {
			kind: plan.kind,
			value
		};
	}
	const value = runOpenClawAgentWriteTransaction((transactionDb) => {
		callbacks.beforeMutation?.();
		const protectedSessionIds = new Set(plan.protectedSessionIds);
		const diskBudget = plan.kind === "history-eviction" ? plan.diskBudget : void 0;
		let excludedSessionKeys;
		if (plan.kind === "historical-generation") {
			const current = readValidatedSessionDeletionTarget(transactionDb, {
				...plan,
				scope: {
					kind: "historical-generation",
					phase: "commit",
					sessionId: plan.sessionId
				}
			});
			if (!current) return {
				archivedTranscripts: [],
				deleted: false,
				expectedEntryMismatch: true
			};
			excludedSessionKeys = /* @__PURE__ */ new Set([
				plan.deleteParams.target.canonicalKey,
				...plan.deleteParams.target.storeKeys,
				...current.snapshot.map((row) => row.sessionKey)
			]);
		} else if (isRecentHistoricalSessionId({
			database: transactionDb,
			...plan.diskBudget,
			sessionId: plan.sessionId
		})) protectedSessionIds.add(plan.sessionId);
		const archivedTranscripts = deleteMaterializedSessionStatePlans(transactionDb, plan.materializedPlans, protectedSessionIds, excludedSessionKeys, void 0, diskBudget);
		const db = getSessionKysely(transactionDb.db);
		const deleted = executeSqliteQuerySync(transactionDb.db, db.selectFrom("session_windows").select("session_id").where("session_id", "=", plan.sessionId)).rows.length === 0;
		if (deleted) callbacks.onCommit?.(transactionDb);
		return {
			archivedTranscripts: deleted ? archivedTranscripts : [],
			deleted
		};
	}, plan.databaseOptions, { operationLabel: `session.reclaim.${plan.kind}` });
	return {
		kind: plan.kind,
		value
	};
}
function reclaimSqliteFreePagesBestEffort(databaseOptions) {
	try {
		openOpenClawAgentDatabase(databaseOptions).walMaintenance.reclaimFreePages({ checkpointMode: "PASSIVE" });
	} catch {}
}
async function runSqliteSessionReclamation(params) {
	if (params.diagnostics) params.diagnostics.kind = params.plan.kind;
	if (params.forceInProcess || isIncognitoOpenClawAgentSqlitePath(params.plan.databaseOptions.path, {
		agentId: params.plan.databaseOptions.agentId,
		env: params.plan.databaseOptions.env
	})) return await runExclusiveSqliteSessionWrite(params.plan.databaseOptions, async () => {
		if (params.plan.kind === "maintenance-plan") Object.assign(params.plan.input, params.refreshMaintenanceProtection?.());
		params.assertCommitAllowed?.();
		return await withSqliteSessionDatabase(params.plan.databaseOptions, () => {
			params.assertCommitAllowed?.();
			return reclaimSqliteSessionInTransaction(params.plan, {
				beforeMutation: params.assertCommitAllowed,
				onCommit: (database, result) => {
					const publish = prepareReclamationPublication(params.plan, readOpenClawAgentDatabaseIdentity(database).identity, result);
					if (publish) deferOpenClawAgentPostCommitPublication(database, publish);
					params.onInProcessCommit?.(database);
				}
			});
		}, params.assertCommitAllowed);
	}, "session.reclamation.in-process", params.diagnostics);
	return await withSqliteMutationWorkerLifetime(params.plan.databaseOptions, async ({ assertCurrent, commitGate, signal }) => {
		const assertRequestCurrent = () => {
			assertCurrent();
			params.assertCommitAllowed?.();
		};
		const retained = await runExclusiveSqliteSessionWrite(params.plan.databaseOptions, async () => {
			assertRequestCurrent();
			return retainOpenClawAgentDatabaseReadOnly(params.plan.databaseOptions);
		}, "session.reclamation.retain", void 0, "foreground", signal);
		if (!retained.found) throw new Error("SQLite session reclamation lost its prepared database");
		const { database, claim } = retained;
		try {
			const plan = {
				...params.plan,
				databaseOptions: {
					...params.plan.databaseOptions,
					path: readOpenClawAgentDatabaseIdentity(database).filename
				}
			};
			return await withSqliteReclamationWorker(plan.databaseOptions, claim, async (worker) => {
				return runPreparedSqliteSessionReclamation({
					...params,
					plan
				}, {
					database,
					claim,
					worker,
					assertRequestCurrent,
					commitGate,
					signal
				});
			}, assertRequestCurrent, signal);
		} finally {
			claim.release();
		}
	});
}
function prepareReclamationDeleteParams({ commitGuard: _commitGuard, ...params }) {
	return params;
}
function createSessionEntryReclamationPlan(params) {
	return {
		databaseOptions: resolveSessionReclamationDatabaseOptions(params.databaseOptions),
		deleteParams: prepareReclamationDeleteParams(params.deleteParams),
		kind: "entry",
		materializedPlans: params.materializedPlans,
		preparedTargetSnapshot: params.preparedTargetSnapshot
	};
}
function createLifecycleArtifactReclamationPlan(params) {
	return {
		databaseOptions: resolveSessionReclamationDatabaseOptions(params.databaseOptions),
		agentId: params.agentId,
		entries: params.entries,
		kind: "lifecycle-artifacts",
		materializedPlans: params.materializedPlans
	};
}
function createSessionMaintenancePlanningOperation(params) {
	return {
		databaseOptions: resolveSessionReclamationDatabaseOptions(params.databaseOptions),
		input: params.input,
		kind: "maintenance-plan",
		materializedPlans: []
	};
}
function createSessionMaintenanceStatisticsOperation(databaseOptions) {
	return {
		databaseOptions: resolveSessionReclamationDatabaseOptions(databaseOptions),
		kind: "maintenance-statistics",
		materializedPlans: []
	};
}
function createSessionMaintenanceFinalizationOperation(params) {
	return {
		...params,
		databaseOptions: resolveSessionReclamationDatabaseOptions(params.databaseOptions),
		kind: "maintenance-finalize"
	};
}
function createHistoryEvictionReclamationPlan(params) {
	return {
		databaseOptions: resolveSessionReclamationDatabaseOptions(params.databaseOptions),
		diskBudget: params.diskBudget,
		kind: "history-eviction",
		materializedPlans: params.materializedPlans,
		protectedSessionIds: [...params.protectedSessionIds],
		sessionId: params.sessionId
	};
}
function createHistoricalGenerationReclamationPlan(params) {
	return {
		databaseOptions: resolveSessionReclamationDatabaseOptions(params.databaseOptions),
		deleteParams: prepareReclamationDeleteParams(params.deleteParams),
		kind: "historical-generation",
		materializedPlans: params.materializedPlans,
		preparedTargetSnapshot: params.preparedTargetSnapshot,
		protectedSessionIds: [...params.protectedSessionIds],
		sessionId: params.sessionId
	};
}
//#endregion
export { createSessionMaintenanceFinalizationOperation as a, expectedEntryMismatchResult as c, reclaimSqliteSessionInTransaction as d, resolveSessionReclamationDatabaseOptions as f, shouldDeleteSqliteSessionEntryLifecycle as h, createSessionEntryReclamationPlan as i, prepareHistoricalGenerationDeletions as l, runSqliteSessionReclamation as m, createHistoryEvictionReclamationPlan as n, createSessionMaintenancePlanningOperation as o, runExclusiveSqliteSessionReclamation as p, createLifecycleArtifactReclamationPlan as r, createSessionMaintenanceStatisticsOperation as s, createHistoricalGenerationReclamationPlan as t, readValidatedSessionDeletionTarget as u };
