import { r as runWithSqliteBusyTimeout } from "./sqlite-busy-timeout-DYrW2wFu.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { c as openOpenClawAgentDatabase, d as runOpenClawAgentWriteTransaction } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { t as retainOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { C as readSessionEntryCacheValidityToken, x as cacheValidityTokensEqual } from "./session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { E as readSessionEntryMaintenanceAgeFact, N as runSqliteSessionDeletionTransaction, k as stageSessionEntryMaintenanceAgeFact, w as invalidateSessionEntryMaintenanceAgeFact } from "./session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
import { a as deletePlannedLifecycleArtifactEntries, i as deleteMaterializedSessionStatePlans, o as partitionUnchangedPlannedLifecycleArtifactEntries } from "./session-accessor.sqlite-lifecycle-state-DalYr83g.mjs";
import { a as refreshSessionPlannerStatisticsInDatabase, r as prepareSessionEntryMaintenanceInDatabase, t as applySessionEntryMaintenanceInDatabase } from "./session-accessor.sqlite-maintenance-store-Cb8zEW1y.mjs";
import { t as SqliteReclamationInputsChangedError } from "./session-accessor.sqlite-reclamation-worker-diagnostics-CO1DPtzp.mjs";
//#region src/config/sessions/session-accessor.sqlite-maintenance-transaction.ts
var MaintenancePreservationRequiredError = class extends Error {};
function readPreservation(input) {
	if (input.preservation === null) throw new MaintenancePreservationRequiredError("SQLite maintenance requires session preservation");
	return input.preservation;
}
/** Retain the snapshot connection; its revision fences age facts, not unrelated row writes. */
function prepareSessionMaintenanceInWorker(plan) {
	const reader = retainOpenClawAgentDatabaseReadOnly(plan.databaseOptions);
	if (!reader.found) throw new Error(`Cannot plan SQLite maintenance: ${reader.reason}`);
	const { database, claim } = reader;
	try {
		claim.assertCurrent();
		stageSessionEntryMaintenanceAgeFact(database.db, plan.input.ageFact);
		const revision = readSessionEntryCacheValidityToken(database.db);
		let apply;
		try {
			apply = runSqliteDeferredTransactionSync(database.db, () => prepareSessionEntryMaintenanceInDatabase(database, plan.input, () => readPreservation(plan.input)), {
				databaseLabel: database.path,
				operationLabel: "session.maintenance.plan.read"
			});
		} catch (error) {
			if (!(error instanceof MaintenancePreservationRequiredError)) throw error;
			apply = () => {
				throw error;
			};
		}
		return {
			apply(current) {
				claim.assertCurrent();
				const snapshotCurrent = cacheValidityTokensEqual(revision, readSessionEntryCacheValidityToken(database.db));
				const maintenance = apply(current);
				if (!snapshotCurrent) invalidateSessionEntryMaintenanceAgeFact(current.db);
				return maintenance;
			},
			release: claim.release
		};
	} catch (error) {
		claim.release();
		throw error;
	}
}
function reclaimSessionMaintenanceInTransaction(plan, callbacks, prepared) {
	if (plan.kind === "maintenance-statistics") {
		const database = openOpenClawAgentDatabase(plan.databaseOptions);
		runWithSqliteBusyTimeout(database.db, 0, () => runOpenClawAgentWriteTransaction((current) => {
			callbacks.beforeMutation?.();
			refreshSessionPlannerStatisticsInDatabase(current);
			callbacks.onCommit?.(current);
		}, plan.databaseOptions, {
			busyTimeoutMs: 0,
			operationLabel: "session.maintenance.statistics"
		}));
		return {
			kind: plan.kind,
			value: true
		};
	}
	if (plan.kind === "maintenance-plan") try {
		return runOpenClawAgentWriteTransaction((database) => {
			callbacks.beforeMutation?.();
			stageSessionEntryMaintenanceAgeFact(database.db, plan.input.ageFact);
			const maintenance = prepared ? prepared.apply(database) : applySessionEntryMaintenanceInDatabase(database, plan.input, () => readPreservation(plan.input));
			if (maintenance.archived > 0 || maintenance.entryRemovals.length > 0) callbacks.onCommit?.(database);
			return {
				kind: plan.kind,
				value: maintenance,
				ageFact: readSessionEntryMaintenanceAgeFact(database.db, plan.input.maintenance)
			};
		}, plan.databaseOptions, { operationLabel: "session.maintenance.plan.write" });
	} catch (error) {
		if (error instanceof SqliteReclamationInputsChangedError) return { kind: "maintenance-plan-stale" };
		if (error instanceof MaintenancePreservationRequiredError) return { kind: "maintenance-preservation-required" };
		throw error;
	}
	return runSqliteSessionDeletionTransaction((database) => {
		callbacks.beforeMutation?.();
		const partition = partitionUnchangedPlannedLifecycleArtifactEntries(database, plan.entries);
		const archivedTranscripts = deleteMaterializedSessionStatePlans(database, plan.materializedPlans, void 0, new Set(partition.unchanged.map((entry) => entry.sessionKey)));
		deletePlannedLifecycleArtifactEntries(database, partition.unchanged);
		const result = {
			kind: plan.kind,
			value: {
				archivedTranscripts,
				changedEntries: partition.changed,
				committedEntries: partition.unchanged
			}
		};
		callbacks.onCommit?.(database, result);
		return result;
	}, plan.databaseOptions, { operationLabel: "session.maintenance.finalize" });
}
//#endregion
export { reclaimSessionMaintenanceInTransaction as n, prepareSessionMaintenanceInWorker as t };
