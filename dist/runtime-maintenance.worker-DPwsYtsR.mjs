import { r as getSqliteWorkerStateContext } from "./sqlite-worker-state-context-KkU943i2.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as loadCronRows, h as upsertCronJobRow, o as loadedCronStoreFromRows } from "./row-codec-BoajbjTy.mjs";
import { n as repairCronRuntimeAuthorityRows, t as loadCronRuntimeAuthorities } from "./runtime-authority-store-DOXjIOS9.mjs";
import { n as readCronRunRecordsInDatabase, r as reconcileCronRunHistoryInDatabase, t as pruneCronRunHistoryInDatabase } from "./run-history.kernel--Y98rxfv.mjs";
import { t as prepareCronRunReceiptWriteSchema } from "./run-receipt-write-admission-C_bxAGc4.mjs";
import { D as readActiveCronRunReceiptsInDatabase, b as listActiveCronRunReceiptJobIdsInDatabase } from "./run-receipt-store-C5VImo6M.mjs";
import { _ as recomputeSingleJobForMaintenance } from "./jobs-scheduling-BFO_sCWD.mjs";
import { n as prepareCronRuntimeMutation, r as retainCronRuntimeMutationOutcome, t as createCronMutationLogger } from "./runtime-mutation.worker-DHQKL2D3.mjs";
//#region src/cron/store/runtime-maintenance.worker.ts
function maintainCronRunHistoryInWorker(database, input) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const schema = prepareCronRunReceiptWriteSchema(db);
		const records = readCronRunRecordsInDatabase(db);
		const jobIds = [...new Set(records.flatMap((row) => (row.status === "queued" || row.status === "running" || row.status === "lost" && row.error?.trim().toLowerCase().includes("backing session missing")) && row.jobId?.trim() ? [row.jobId.trim()] : []))];
		const receipts = schema.cronRunReceipts ? readActiveCronRunReceiptsInDatabase(db, void 0, jobIds) : [];
		const preparation = prepareCronRuntimeMutation("cron.maintainHistory", input.nonce, {
			jobIds,
			receipts
		});
		const reconciled = reconcileCronRunHistoryInDatabase(db, records, preparation.nowMs, new Set(preparation.protectedJobIds));
		const pruned = pruneCronRunHistoryInDatabase(db, preparation.nowMs, schema, records.filter((row) => !reconciled.has(row.id)));
		return retainCronRuntimeMutationOutcome("cron.maintainHistory", db, input.nonce, {
			reconciled: reconciled.size,
			pruned
		});
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "cron.history-maintenance" });
}
function scheduleUnownedCronJobsInWorker(database, input) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const rows = loadCronRows(db, input.storeKey);
		const decoded = loadedCronStoreFromRows(rows).store.jobs;
		const activeJobIds = listActiveCronRunReceiptJobIdsInDatabase(db, input.storeKey);
		const jobsById = new Map(decoded.map((job) => [job.id, job]));
		const preparation = prepareCronRuntimeMutation("cron.scheduleUnowned", input.nonce, { jobIds: decoded.map((job) => job.id) });
		const reservations = new Map(preparation.ownership.flatMap((owner) => owner.reservation ? [[owner.jobId, owner.reservation]] : []));
		const active = new Set(preparation.ownership.filter((owner) => owner.active).map((owner) => owner.jobId));
		const outcome = {
			changed: false,
			jobs: [],
			notifications: [],
			logs: []
		};
		const state = { deps: {
			nowMs: () => preparation.nowMs,
			log: createCronMutationLogger(outcome.logs)
		} };
		for (const row of rows) {
			const job = jobsById.get(row.job_id);
			if (!job || activeJobIds.has(row.job_id)) continue;
			if (recomputeSingleJobForMaintenance(state, job, {
				...input.options,
				nowMs: preparation.nowMs,
				deferredNotifications: outcome.notifications
			}, {
				reservations,
				isJobActive: (jobId) => active.has(jobId)
			})) {
				upsertCronJobRow(db, input.storeKey, job, row.sort_order);
				outcome.jobs.push(job);
				outcome.changed = true;
			}
		}
		return retainCronRuntimeMutationOutcome("cron.scheduleUnowned", db, input.nonce, outcome);
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "cron.schedule-unowned" });
}
function recordCronFailureAlertOutcomeInWorker(database, input) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const row = loadCronRows(db, input.storeKey, /* @__PURE__ */ new Set([input.jobId]))[0];
		const job = row ? loadedCronStoreFromRows([row]).store.jobs[0] : void 0;
		const jobs = job ? [job] : [];
		const { repairJobIds } = loadCronRuntimeAuthorities({
			db,
			storeKey: input.storeKey,
			jobs
		});
		if (repairJobIds.length > 0) repairCronRuntimeAuthorityRows({
			db,
			storeKey: input.storeKey,
			jobs,
			jobIds: repairJobIds
		});
		const ownsCycle = job !== void 0 && job.state.lastRunAtMs === input.runAtMs && job.state.lastFailureAlertAtMs === input.alertAtMs && job.state.lastFailureNotificationId === input.notificationId && job.state.lastFailureNotificationDeliveryStatus === "unknown";
		prepareCronRuntimeMutation("cron.recordFailureAlertOutcome", input.nonce, { ownsCycle });
		if (job && row && ownsCycle) {
			job.state.lastFailureNotificationDelivered = input.outcome.delivered;
			job.state.lastFailureNotificationDeliveryStatus = input.outcome.status;
			job.state.lastFailureNotificationDeliveryError = input.outcome.error;
			upsertCronJobRow(db, input.storeKey, job, row.sort_order);
		}
		return retainCronRuntimeMutationOutcome("cron.recordFailureAlertOutcome", db, input.nonce, { job: ownsCycle ? job : void 0 });
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "cron.failure-alert-outcome" });
}
//#endregion
export { maintainCronRunHistoryInWorker, recordCronFailureAlertOutcomeInWorker, scheduleUnownedCronJobsInWorker };
