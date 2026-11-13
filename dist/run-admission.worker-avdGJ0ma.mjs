import { t as assertTransactionUsable } from "./sqlite-transaction-2VkikDo-.mjs";
import { r as getSqliteWorkerStateContext } from "./sqlite-worker-state-context-KkU943i2.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as loadCronRows, h as upsertCronJobRow, o as loadedCronStoreFromRows, r as deleteStaleCronJobFamilyRows } from "./row-codec-BoajbjTy.mjs";
import { n as repairCronRuntimeAuthorityRows, t as loadCronRuntimeAuthorities } from "./runtime-authority-store-DOXjIOS9.mjs";
import { a as isAgentDeletionBlocked } from "./agent-lifecycle-registry-BTCyhxXt.mjs";
import { t as prepareCronRunReceiptWriteSchema } from "./run-receipt-write-admission-C_bxAGc4.mjs";
import { t as resolveCronJobConfigRevision } from "./config-revision-SGtbOEQL.mjs";
import { D as readActiveCronRunReceiptsInDatabase, _ as finishCronRunReceiptInDatabase, a as adjudicateActiveCronRunReceiptInDatabase, f as ensureCronRunReceiptSchema, i as activateCronRunReceiptInDatabase, n as CronRunReceiptConflictError, r as CronRunReceiptRevisionError, s as assertCronRunReceiptCurrentInDatabase, u as claimCronRunReceiptInDatabase } from "./run-receipt-store-C5VImo6M.mjs";
import { E as retainManualOneShotOccurrence, h as recomputeJobNextRunAtMs } from "./jobs-scheduling-BFO_sCWD.mjs";
import { n as resolveCronJobEffectiveAgentId } from "./agent-id-BPaE0_vm.mjs";
import { n as prepareCronRuntimeMutation, r as retainCronRuntimeMutationOutcome, t as createCronMutationLogger } from "./runtime-mutation.worker-DHQKL2D3.mjs";
//#region src/cron/store/run-admission.worker.ts
function loadRuntimeRows(db, storeKey, jobIds) {
	const rows = loadCronRows(db, storeKey, new Set(jobIds), { includeGrantDefinitionProjection: true });
	const jobs = loadedCronStoreFromRows(rows).store.jobs;
	const { repairJobIds } = loadCronRuntimeAuthorities({
		db,
		storeKey,
		jobs
	});
	if (repairJobIds.length > 0) repairCronRuntimeAuthorityRows({
		db,
		storeKey,
		jobs,
		jobIds: repairJobIds
	});
	return {
		rows: new Map(rows.map((row) => [row.job_id, row])),
		jobs: new Map(jobs.map((job) => [job.id, job]))
	};
}
function reserveCronRunsInWorker(database, input) {
	let transactionConflict;
	try {
		return runOpenClawStateWriteTransaction(({ db }) => {
			try {
				const proposals = new Map(input.proposals.map((proposal) => [proposal.jobId, proposal]));
				const jobIds = [...proposals.keys()].toSorted();
				const { rows, jobs } = loadRuntimeRows(db, input.storeKey, jobIds);
				const receiptSchema = prepareCronRunReceiptWriteSchema(db);
				ensureCronRunReceiptSchema(db);
				const preparation = prepareCronRuntimeMutation("cron.reserveRuns", input.nonce, { receipts: readActiveCronRunReceiptsInDatabase(db, input.storeKey, jobIds) });
				const claims = new Map(preparation.claims.map((claim) => [claim.handle.jobId, claim]));
				const replacements = new Map(preparation.replacements.map((receipt) => [receipt.jobId, receipt]));
				for (const jobId of jobIds) if (!replacements.has(jobId)) adjudicateActiveCronRunReceiptInDatabase({
					database: db,
					jobId,
					prepared: claims.get(jobId),
					finishedAtMs: input.reservedAtMs
				});
				const outcome = {
					reservations: [],
					replacedReceipts: []
				};
				for (const jobId of jobIds) {
					const job = jobs.get(jobId);
					const row = rows.get(jobId);
					const planned = proposals.get(jobId);
					if (!job || !row || job.enabled !== planned.enabled || !planned.immediate && job.state.nextRunAtMs !== planned.nextRunAtMs || job.state.lastRunAtMs !== planned.lastRunAtMs || job.state.lastRunStatus !== planned.lastRunStatus || job.state.queuedAtMs !== void 0 || job.state.runningAtMs !== void 0 || resolveCronJobConfigRevision(job) !== planned.configRevision) continue;
					const prior = replacements.get(jobId);
					if (prior) {
						finishCronRunReceiptInDatabase({
							database: db,
							receiptSchema,
							handle: prior,
							status: "superseded",
							finishedAtMs: input.reservedAtMs,
							error: "cron reservation replaced before activation"
						});
						outcome.replacedReceipts.push(prior);
					}
					const runReceipt = claimCronRunReceiptInDatabase({
						database: db,
						receiptSchema,
						prepared: claims.get(jobId),
						resolveAgentId: (current) => resolveCronJobEffectiveAgentId(current, preparation.defaultAgentId)
					});
					if (input.onExit) {
						job.enabled = false;
						job.updatedAtMs = input.reservedAtMs;
						job.state.scheduleActivatedAtMs = input.reservedAtMs;
						delete job.state.nextRunAtMs;
						delete job.state.startupCatchupAtMs;
						delete job.state.pacedNextRunAtMs;
						delete job.state.forcePreservedNextRunAtMs;
					} else if (input.preserveSchedule) retainManualOneShotOccurrence(job, input.scheduleOwnershipAtMs);
					job.state.queuedAtMs = input.reservedAtMs;
					upsertCronJobRow(db, input.storeKey, job, row.sort_order, { knownExistingRow: row });
					outcome.reservations.push({
						job,
						runReceipt
					});
				}
				return retainCronRuntimeMutationOutcome("cron.reserveRuns", db, input.nonce, outcome);
			} catch (error) {
				if (error instanceof CronRunReceiptConflictError) transactionConflict = error;
				throw error;
			}
		}, {
			database,
			path: database.path,
			env: getSqliteWorkerStateContext().environment
		}, { operationLabel: "cron.run-reservation" });
	} catch (error) {
		if (!transactionConflict || error !== transactionConflict) throw error;
		assertTransactionUsable(database.db);
		if (!database.db.isOpen || database.db.isTransaction) throw error;
		return {
			nonce: input.nonce,
			conflict: transactionConflict.receipt
		};
	}
}
function activateCronRunInWorker(database, input) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const { rows, jobs } = loadRuntimeRows(db, input.storeKey, [input.handle.jobId]);
		const current = jobs.get(input.handle.jobId);
		const preparation = prepareCronRuntimeMutation("cron.activateRun", input.nonce, {});
		const outcome = {};
		const row = rows.get(input.handle.jobId);
		const matchesExit = !input.onExitSchedule || current?.schedule.kind === "on-exit" && current.schedule.command === input.onExitSchedule.command && current.schedule.cwd === input.onExitSchedule.cwd;
		if (current && row && current.state.queuedAtMs === preparation.markerAtMs && matchesExit) try {
			const receipt = activateCronRunReceiptInDatabase({
				database: db,
				handle: input.handle,
				startedAtMs: input.startedAtMs,
				resolveAgentId: (job) => resolveCronJobEffectiveAgentId(job, preparation.defaultAgentId)
			});
			outcome.activation = {
				job: current,
				receipt,
				previousLastError: current.state.lastError
			};
			delete current.state.queuedAtMs;
			current.state.runningAtMs = input.startedAtMs;
			current.state.runningReceiptId = receipt.receiptId;
			delete current.state.runningScheduleChangeId;
			current.state.lastError = void 0;
			upsertCronJobRow(db, input.storeKey, current, row.sort_order, { knownExistingRow: row });
		} catch (error) {
			if (!(error instanceof CronRunReceiptRevisionError)) throw error;
		}
		return retainCronRuntimeMutationOutcome("cron.activateRun", db, input.nonce, outcome);
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "cron.run-activation" });
}
function releaseCronReservationsInWorker(database, input) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const { rows, jobs } = loadRuntimeRows(db, input.storeKey, input.jobIds);
		const receiptSchema = prepareCronRunReceiptWriteSchema(db);
		const preparation = prepareCronRuntimeMutation("cron.releaseReservations", input.nonce, { deletionBlocked: input.requireCurrentReceipt === true && input.terminal !== void 0 && isAgentDeletionBlocked(input.terminal.handle.agentId, {}, db) });
		const outcome = {
			jobs: [],
			notifications: [],
			logs: []
		};
		const state = { deps: {
			nowMs: () => preparation.nowMs,
			log: createCronMutationLogger(outcome.logs)
		} };
		if (input.requireCurrentReceipt && input.terminal) assertCronRunReceiptCurrentInDatabase({
			database: db,
			handle: input.terminal.handle,
			resolveAgentId: (job) => resolveCronJobEffectiveAgentId(job, preparation.defaultAgentId)
		});
		for (const reservation of preparation.reservations) {
			if (!input.terminal) finishCronRunReceiptInDatabase({
				database: db,
				receiptSchema,
				handle: reservation.runReceipt,
				status: "skipped",
				finishedAtMs: preparation.nowMs,
				error: "cron reservation released before completion"
			});
			const job = jobs.get(reservation.jobId);
			const row = rows.get(reservation.jobId);
			if (!job || !row) continue;
			const queuedMatches = reservation.markerAtMs === job.state.queuedAtMs;
			const runningMatches = reservation.markerAtMs === job.state.runningAtMs;
			if (!queuedMatches && !runningMatches) continue;
			if (input.restoreLastError && reservation.activationPreviousLastError) job.state.lastError = reservation.activationPreviousLastError.value;
			if (queuedMatches) delete job.state.queuedAtMs;
			if (runningMatches) {
				delete job.state.runningAtMs;
				delete job.state.runningReceiptId;
				delete job.state.runningScheduleChangeId;
			}
			if (input.recompute && job.enabled && job.state.nextRunAtMs === void 0) recomputeJobNextRunAtMs({
				state,
				job,
				nowMs: preparation.nowMs,
				deferredNotifications: outcome.notifications
			});
			upsertCronJobRow(db, input.storeKey, job, row.sort_order, { knownExistingRow: row });
			outcome.jobs.push(job);
		}
		if (input.terminal && !preparation.deferTerminal) finishCronRunReceiptInDatabase({
			database: db,
			receiptSchema,
			...input.terminal
		});
		return retainCronRuntimeMutationOutcome("cron.releaseReservations", db, input.nonce, outcome);
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "cron.run-reservation-cleanup" });
}
function finishCronReceiptInWorker(database, input) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		prepareCronRuntimeMutation("cron.finishReceipt", input.nonce, {});
		finishCronRunReceiptInDatabase({
			database: db,
			receiptSchema: prepareCronRunReceiptWriteSchema(db),
			...input.terminal
		});
		return retainCronRuntimeMutationOutcome("cron.finishReceipt", db, input.nonce, {});
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "cron.run-receipt.finish" });
}
function removeStaleCronFamilyInWorker(database, input) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		prepareCronRuntimeMutation("cron.removeStaleFamily", input.nonce, {});
		const removed = deleteStaleCronJobFamilyRows(db, input.storeKey, input.family);
		return retainCronRuntimeMutationOutcome("cron.removeStaleFamily", db, input.nonce, { removed });
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "cron.job-family-adoption" });
}
//#endregion
export { activateCronRunInWorker, finishCronReceiptInWorker, releaseCronReservationsInWorker, removeStaleCronFamilyInWorker, reserveCronRunsInWorker };
