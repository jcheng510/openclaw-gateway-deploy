import { r as getSqliteWorkerStateContext } from "./sqlite-worker-state-context-KkU943i2.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as loadCronRows, h as upsertCronJobRow, n as deleteCronJobRowInDatabase, o as loadedCronStoreFromRows } from "./row-codec-BoajbjTy.mjs";
import { t as prepareCronRunReceiptWriteSchema } from "./run-receipt-write-admission-C_bxAGc4.mjs";
import { _ as finishCronRunReceiptInDatabase, m as findActiveCronRunReceiptInDatabase, p as exactCronRunReceiptMatches } from "./run-receipt-store-C5VImo6M.mjs";
import { h as recomputeJobNextRunAtMs } from "./jobs-scheduling-BFO_sCWD.mjs";
import { d as findCronRunRecoveryInDatabase, f as isCronRunTriggerStateRetiredInDatabase, l as resolveCronRunReceiptTerminalStatus, n as markInterruptedStartupRun, r as restoreFinalizedStartupRun } from "./startup-run-repair-C-U6va4v.mjs";
import { n as prepareCronRuntimeMutation, r as retainCronRuntimeMutationOutcome, t as createCronMutationLogger } from "./runtime-mutation.worker-DHQKL2D3.mjs";
//#region src/cron/store/run-recovery.kernel.ts
function repairCronRunInDatabase(params) {
	const { state, database, proposal } = params;
	const { storeKey } = params;
	const currentReceipt = findActiveCronRunReceiptInDatabase({
		database: database.db,
		storePath: storeKey,
		jobId: proposal.jobId
	});
	if (proposal.receipt) {
		if (!exactCronRunReceiptMatches(currentReceipt, proposal.receipt) && currentReceipt) return {
			kind: "superseded",
			receipt: currentReceipt
		};
		if (currentReceipt && !params.proposedReceiptIsStale) return {
			kind: "live",
			receipt: currentReceipt
		};
	} else if (currentReceipt) return {
		kind: "superseded",
		receipt: currentReceipt
	};
	const { row, job } = params;
	if (!row || !job) {
		if (proposal.receipt && currentReceipt) {
			finishCronRunReceiptInDatabase({
				receiptSchema: params.receiptSchema,
				database: database.db,
				handle: proposal.receipt,
				status: "interrupted",
				finishedAtMs: state.deps.nowMs(),
				error: "cron: owner unavailable after the job row was finalized"
			});
			return {
				kind: "repaired",
				notifications: []
			};
		}
		return { kind: "superseded" };
	}
	if (proposal.runningAtMs !== void 0 && job.state.runningAtMs === proposal.runningAtMs && job.state.runningReceiptId !== proposal.runningReceiptId) return {
		kind: "superseded",
		...currentReceipt ? { receipt: currentReceipt } : {}
	};
	let changed = false;
	if (proposal.queuedAtMs !== void 0 && job.state.queuedAtMs === proposal.queuedAtMs) {
		delete job.state.queuedAtMs;
		if (proposal.receipt && currentReceipt) finishCronRunReceiptInDatabase({
			receiptSchema: params.receiptSchema,
			database: database.db,
			handle: proposal.receipt,
			status: "interrupted",
			finishedAtMs: state.deps.nowMs(),
			error: "cron: queued run interrupted because owner is unavailable"
		});
		changed = true;
	}
	let interrupted;
	let replacementAtMs;
	const notifications = [];
	if (proposal.runningAtMs !== void 0) {
		if (job.state.runningAtMs !== proposal.runningAtMs) {
			if (proposal.receipt && currentReceipt) {
				finishCronRunReceiptInDatabase({
					receiptSchema: params.receiptSchema,
					database: database.db,
					handle: proposal.receipt,
					status: "interrupted",
					finishedAtMs: state.deps.nowMs(),
					error: "cron: owner unavailable after run state was already finalized"
				});
				return {
					kind: "repaired",
					notifications: []
				};
			}
			return {
				kind: "superseded",
				...currentReceipt ? { receipt: currentReceipt } : {}
			};
		}
		const task = findCronRunRecoveryInDatabase({
			database: database.db,
			jobId: proposal.jobId,
			startedAt: proposal.runningAtMs,
			storeKey,
			receiptId: proposal.runningReceiptId ?? proposal.receipt?.receiptId
		});
		const finalized = task.finalized;
		const receiptId = proposal.runningReceiptId ?? currentReceipt?.receiptId ?? task.receiptId;
		const triggerStateRetired = receiptId ? isCronRunTriggerStateRetiredInDatabase({
			database: database.db,
			handle: {
				receiptId,
				storeKey,
				jobId: proposal.jobId,
				startedAtMs: proposal.runningAtMs
			}
		}) : false;
		const restored = finalized ? restoreFinalizedStartupRun({
			state,
			job,
			runningAtMs: proposal.runningAtMs,
			entry: finalized.entry,
			triggerStateRetired,
			...finalized.scriptResult ? { scriptResult: finalized.scriptResult } : {},
			...finalized.triggerEval ? { triggerEval: finalized.triggerEval } : {},
			deferredNotifications: notifications
		}) : void 0;
		replacementAtMs = restored?.replacementAtMs;
		if (!restored) {
			const nowMs = state.deps.nowMs();
			interrupted = markInterruptedStartupRun({
				state,
				job,
				taskRunId: task.taskRunId,
				runningAtMs: proposal.runningAtMs,
				nowMs,
				recoverInterruptedOneShot: params.mode === "startup",
				deferredNotifications: notifications
			});
			replacementAtMs = interrupted.replacementAtMs;
			if (job.enabled && job.state.nextRunAtMs === void 0) recomputeJobNextRunAtMs({
				state,
				job,
				nowMs,
				deferredNotifications: notifications
			});
			if (params.mode === "startup" && job.schedule.kind === "at") job.state.startupCatchupAtMs = job.state.nextRunAtMs;
		}
		if (proposal.receipt) finishCronRunReceiptInDatabase({
			receiptSchema: params.receiptSchema,
			database: database.db,
			handle: proposal.receipt,
			status: restored && finalized ? resolveCronRunReceiptTerminalStatus(finalized.entry.status, finalized.triggerEval?.fired) : "interrupted",
			finishedAtMs: restored && finalized ? finalized.entry.ts : state.deps.nowMs(),
			error: restored && finalized ? finalized.entry.error : "cron: job interrupted because owner is unavailable"
		});
		if (restored?.shouldDelete) {
			deleteCronJobRowInDatabase(database.db, storeKey, proposal.jobId);
			return {
				kind: "repaired",
				notifications,
				...restored.replacementAtMs === void 0 ? { skipStartupCatchup: true } : {}
			};
		}
		changed = true;
	}
	if (!changed) {
		if (proposal.receipt && currentReceipt && params.proposedReceiptIsStale) {
			finishCronRunReceiptInDatabase({
				receiptSchema: params.receiptSchema,
				database: database.db,
				handle: proposal.receipt,
				status: "interrupted",
				finishedAtMs: state.deps.nowMs(),
				error: "cron: owner unavailable after run marker retirement"
			});
			return {
				kind: "repaired",
				notifications
			};
		}
		return {
			kind: "superseded",
			...currentReceipt ? { receipt: currentReceipt } : {}
		};
	}
	upsertCronJobRow(database.db, storeKey, job, row.sort_order);
	return {
		kind: "repaired",
		...interrupted ? { interrupted } : {},
		notifications,
		...replacementAtMs === void 0 && proposal.runningAtMs !== void 0 && !(params.mode === "startup" && interrupted && job.schedule.kind === "at") ? { skipStartupCatchup: true } : {}
	};
}
//#endregion
//#region src/cron/store/run-recovery.worker.ts
function repairCronRunInWorker(database, input) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const receiptSchema = prepareCronRunReceiptWriteSchema(db);
		const row = loadCronRows(db, input.storeKey, /* @__PURE__ */ new Set([input.proposal.jobId]))[0];
		const job = row ? loadedCronStoreFromRows([row]).store.jobs[0] : void 0;
		const preparation = prepareCronRuntimeMutation("cron.repairRun", input.nonce, {
			id: input.proposal.jobId,
			delivery: job?.delivery,
			failureAlert: job?.failureAlert
		});
		const logs = [];
		const { nowMs, cronConfig, failureAlert } = preparation;
		const state = {
			deps: {
				nowMs: () => nowMs,
				cronConfig,
				log: createCronMutationLogger(logs)
			},
			preparedFailureAlert: {
				jobId: input.proposal.jobId,
				value: failureAlert
			}
		};
		const outcome = {
			result: repairCronRunInDatabase({
				database,
				receiptSchema,
				row,
				job,
				storeKey: input.storeKey,
				state,
				proposal: input.proposal,
				proposedReceiptIsStale: preparation.proposedReceiptIsStale,
				mode: input.mode
			}),
			logs
		};
		return retainCronRuntimeMutationOutcome("cron.repairRun", db, input.nonce, outcome);
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "cron.run-recovery" });
}
//#endregion
export { repairCronRunInWorker };
