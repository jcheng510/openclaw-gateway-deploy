import { l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { h as finiteSecondsToTimerSafeMilliseconds } from "./number-coercion-Dq1l5muL.mjs";
import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { a as runInDetachedAsyncContext } from "./async-work-scope-ClifbwQr.mjs";
import "./src-SskUVPJG.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as stableStringify } from "./stable-stringify-CkQ0IEj1.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { n as isAbortError, r as racePromiseWithAbortSignal, t as createAbortError } from "./abort-signal-Z3A36sLL.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as formatTimestamp } from "./timestamps-tLN31L4a.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { t as sha256Base64Url } from "./crypto-digest-y6oZN-_F.mjs";
import { lt as resolveAdmittedCronCompletionStatus, ut as resolveCronCompletionStatus } from "./openclaw-state-db-read-connection-DJObJIAO.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { A as parseAgentSessionKey, S as isSubagentSessionKey, c as normalizeOptionalAgentId, l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { t as parseDurationMs } from "./parse-duration-CBHJ2Wxa.mjs";
import { C as runWithGatewayIndependentRootWorkContinuation, r as beginGatewayRootWorkAdmissionWhenOpen, t as GatewayDrainingError } from "./gateway-work-admission-B4bQUVQ6.mjs";
import "./heartbeat-wake-CW-obKf9.mjs";
import { d as retainGatewayDeviceRevocation } from "./device-revocation-CtZLAXd7.mjs";
import { t as parseAbsoluteTimeMs } from "./parse-BMAUe1NJ.mjs";
import "./normalize-BKhDy-BF.mjs";
import { n as getInvalidPersistedCronJobReason, t as assertCronJobStateTimestamps } from "./persisted-shape-Cj2JMPzw.mjs";
import { _ as tryCronScheduleIdentity, a as loadCronRows, g as cronSchedulingInputsEqual, h as upsertCronJobRow, n as deleteCronJobRowInDatabase, o as loadedCronStoreFromRows, v as normalizeCronJobIdentityFields } from "./row-codec-BoajbjTy.mjs";
import { c as resolveCronToolsAllowExecTargetRecoveryError } from "./scheduled-tool-policy-BrtsPd84.mjs";
import { a as createCronStreamSourceIdentity, i as appendCronPayloadText, n as normalizeCronJobInput, o as cronStreamScheduleKey } from "./normalize-BUsm2nZV.mjs";
import { i as resolveCronAuthenticatedChannelRequester, r as resolveCronAuthenticatedCallerOrigin } from "./tools-allow-provenance-3Z-3O-cO.mjs";
import { a as resolveCronDeliverySessionKey, r as isInvalidCronSessionTargetIdError } from "./session-target-DJsUULzX.mjs";
import { n as repairCronRuntimeAuthorityRows, t as loadCronRuntimeAuthorities } from "./runtime-authority-store-DOXjIOS9.mjs";
import { n as AgentDeletionCommitUncertainError, t as AgentDeletionAuthorityRollbackError } from "./agent-lifecycle-registry-BTCyhxXt.mjs";
import { p as isCompetingSessionWorkAdmissionActive } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import { S as loadExactSessionEntryReadOnly } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { u as resolveMaintenanceConfig } from "./disk-budget-DNKBUWcN.mjs";
import "./session-accessor-CGLseszP.mjs";
import { b as applySessionEntryLifecycleMutation } from "./session-accessor.reset-xoze7eVv.mjs";
import { t as readExpiredCronRunEntriesInWorker } from "./session-entry-read-runtime-e6OehipM.mjs";
import { t as buildPendingGeneratedMediaSessionKeySet } from "./media-generation-activity-8_KIfY-s.mjs";
import { C as requestActiveCronJobCancellation, S as onCronJobInactive, d as isCronActiveJobMarkerCurrent, f as isCronJobActive, g as markCronJobWaitingForHeartbeat, n as bindCronJobAdmittedRun, o as clearCronJobActive, x as noteActiveCronJobTriggerMutation, y as noteActiveCronJobRemoval } from "./active-jobs-CTCtrefd.mjs";
import { a as trackActiveCronTaskRunSettlement, r as registerActiveCronTaskRun } from "./active-run-cancellation-CKD08Yo7.mjs";
import "./lanes-D7a4ntDu.mjs";
import { r as enqueueCommandInLane } from "./command-queue-Bf07l33f.mjs";
import { a as preExecutionTimeoutErrorMessage, c as timeoutErrorMessage, i as normalizeCronRunErrorText, r as isSetupTimeoutErrorText, s as setupTimeoutErrorMessage, t as abortErrorMessage } from "./execution-errors-C8x3LEGB.mjs";
import { i as withCronMutationCommitHook, n as captureCronRunAdmissionTracker, t as captureCronMutationCommit } from "./mutation-completion-CBKW4TZ3.mjs";
import { c as hasDescendantRunAwaitingSettle } from "./subagent-registry-read-DgbIKTmN.mjs";
import { t as resolveCronAgentSessionKey } from "./session-key-CtJgMVmq.mjs";
import { n as runCronRuntimeMutation, t as prepareCronRunReceiptWriteSchema } from "./run-receipt-write-admission-C_bxAGc4.mjs";
import { t as cronStoreKey } from "./key-BBZ40bDq.mjs";
import { t as resolveCronJobConfigRevision } from "./config-revision-SGtbOEQL.mjs";
import { d as saveCronJobsStoreChangesWithRevision, f as saveCronJobsStoreChangesWithRevisionNative, h as saveCronJobsStoreWithRevisionNative, i as loadCronJobsStoreWithConfigJobs, m as saveCronJobsStoreWithRevision, n as getCronJobsStoreRevision, o as noteCronJobsStoreCommit, s as removeStaleCronJobFamilyRows } from "./store-CbOyaAbS.mjs";
import { t as materializeLegacyDefaultCronJobOwners } from "./legacy-default-agent-owner-migration-BUforJLu.mjs";
import { O as describeUnavailableCronAgent, S as prepareCronRunReceiptClaim, T as retainCronRunReceiptSettlement, _ as finishCronRunReceiptInDatabase, d as claimLocalCronRunReceiptOwnership, g as finishCronRunReceiptAsync, h as finishCronRunReceipt, m as findActiveCronRunReceiptInDatabase, n as CronRunReceiptConflictError, p as exactCronRunReceiptMatches, r as CronRunReceiptRevisionError, v as isCronRunReceiptOwnerStale, w as releaseLocalCronRunReceiptOwnership } from "./run-receipt-store-C5VImo6M.mjs";
import { C as hasPendingCronTriggerInterval, S as summarizeCronJobSchedule, a as findJobOrThrow, b as resolveJobErrorBackoffUntilMs, c as isJobDue, d as isTimeScheduledJob, f as needsCronTimerMaintenance, g as recomputeNextRunsForMaintenance, h as recomputeJobNextRunAtMs, l as isJobEnabled, n as computeJobNextRunAtMs, o as hasActiveCronRun, p as nextWakeAtMs, r as computeJobPreviousRunAtOrBeforeMs, s as hasScheduledNextRunAtMs, t as DEFAULT_ERROR_BACKOFF_SCHEDULE_MS, u as isStaleFutureCronSlot, w as resolveForcePreservedOneShotAtMs, x as resolveJobLastRunStatus } from "./jobs-scheduling-BFO_sCWD.mjs";
import { a as systemOwnedDeclarationKeyNamespace, i as isSystemMonitorDeclaration } from "./system-owned-declaration-CIFRO5mv.mjs";
import { i as registerPendingCronSessionCleanup, r as locked, t as getPendingCronSessionCleanup } from "./locked-CyUkMHfL.mjs";
import { n as createCronRunDiagnosticsFromError } from "./run-diagnostics-DWNlemj-.mjs";
import { n as resolveCronJobEffectiveAgentId, r as tryResolveCronJobEffectiveAgentId, t as CRON_AGENT_SELECTION_REQUIRED_MESSAGE } from "./agent-id-BPaE0_vm.mjs";
import { A as createCronOwnerExecutionIdentityAdmission, C as recordCronOutcomeForJob, D as MIN_REFIRE_GAP_MS, E as MAX_CRON_TIMER_DELAY_MS, F as cronFailureNotificationEventContext, I as emit, L as isImmediateCronRunMode, M as finishCronRun, N as recordQuietCronEvaluation, O as resolveMainSessionCronDeliveryContext, P as createCronServiceState, S as emitCronOutcomeEventForJob, _ as normalizeQueuedSystemEventHandle, a as cronRunReceiptMutationHooks, b as resolveNextRunAtMsOrDisable, c as prepareCronRunReceiptOwnerMutationHooks, f as isCronRunTriggerStateRetiredInDatabase, g as isScheduledTerminalOneShotRetry, h as applyOutcomeToStoredJob, i as assertServiceCronRunReceiptCurrent, j as createCronRunHandle, k as runsDetachedFromMainSession, l as resolveCronRunReceiptTerminalStatus, m as applyOutcomeToAuthoritativeJob, o as cronRunReceiptPersistHooks, p as applyJobResult, s as markServiceCronJobActive, t as STARTUP_INTERRUPTED_ERROR, u as trackServiceCronRunReceiptSettlement, v as removeQueuedSystemEventHandle, x as createCronOutcomeEvent, y as resolveDeliveryState } from "./startup-run-repair-C-U6va4v.mjs";
import { o as writeCronJobScratch, r as readCronJobScratchState, t as deleteCronJobScratch } from "./scratch-store-DwXH17Ua.mjs";
import { n as resolveCronDeliveryPlan } from "./delivery-plan-BzI5V5w6.mjs";
import { c as assertSupportedJobSpec, d as resolveConfiguredChannelsForValidation, i as declarativeFields, l as assertTimeScheduleSatisfiable, n as applyJobPatch, o as normalizeCronRunJobId, r as createJob, t as applyDeclarativeJobSpec, u as cronPatchTouchesDeliveryResolution } from "./jobs-B2OlmzK7.mjs";
import { a as resolveFailureAlert, t as failureNotificationDeliveryFromJobState } from "./failure-alerts-vo_mYq9O.mjs";
import { a as reconcileRuntimeAuthority, i as reconcileCronChannelRequesterAuthority, n as cronJobMessageActionAuthorityInputsEqual, r as cronJobMessageToolAuthorityInputsEqual, t as consumeRuntimeAuthorityMutationOptions } from "./jobs-tool-policy-CrFFUwm3.mjs";
import { n as isHeartbeatTaskCronJob } from "./heartbeat-task-BGANU0wH.mjs";
import { n as deleteCronSessionViaGateway } from "./session-cleanup-Cx-FAhv9.mjs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
import { isDeepStrictEqual } from "node:util";
import { isMainThread, threadId } from "node:worker_threads";
import { performance } from "node:perf_hooks";
import pMap, { pMapSkip } from "p-map";
//#region src/cron/service/foreign-receipt-monitor.ts
const CRON_FOREIGN_RECEIPT_RECHECK_MS = 2e3;
const monitors = /* @__PURE__ */ new WeakMap();
function monitor(state) {
	let current = monitors.get(state);
	if (!current) {
		current = {
			byJobId: /* @__PURE__ */ new Map(),
			waiters: /* @__PURE__ */ new Map(),
			timer: null
		};
		monitors.set(state, current);
	}
	return current;
}
function arm(state) {
	const current = monitor(state);
	const reconcile = current.reconcile;
	if (state.stopped || current.timer || current.byJobId.size === 0 || !reconcile) return;
	current.timer = state.deps.scheduler.schedule({
		id: `cron:${state.deps.storePath}:foreign-receipts`,
		atMs: state.deps.scheduler.now() + CRON_FOREIGN_RECEIPT_RECHECK_MS,
		everyMs: CRON_FOREIGN_RECEIPT_RECHECK_MS,
		run: () => runInDetachedAsyncContext(() => {
			return (state.deps.runSchedulerOwned ? state.deps.runSchedulerOwned(reconcile) : reconcile()).catch((error) => {
				state.deps.log.warn({ err: String(error) }, "cron: foreign receipt reconciliation failed");
			});
		})
	});
}
function configureForeignReceiptMonitor(state, reconcile) {
	monitor(state).reconcile = reconcile;
	arm(state);
}
function enrollForeignReceipt(state, receipt) {
	monitor(state).byJobId.set(receipt.jobId, receipt);
	arm(state);
}
function listForeignReceipts(state) {
	return [...monitor(state).byJobId.values()].toSorted((left, right) => left.jobId.localeCompare(right.jobId));
}
function waitForForeignReceipt(state, jobId, signal) {
	if (state.stopped || signal.aborted) return Promise.resolve(false);
	const current = monitor(state);
	if (!current.byJobId.has(jobId)) return Promise.resolve(true);
	return new Promise((resolve) => {
		const waiters = current.waiters.get(jobId) ?? /* @__PURE__ */ new Set();
		const finish = (settled) => {
			signal.removeEventListener("abort", abort);
			waiters.delete(finish);
			if (waiters.size === 0) current.waiters.delete(jobId);
			resolve(settled);
		};
		const abort = () => finish(false);
		waiters.add(finish);
		current.waiters.set(jobId, waiters);
		signal.addEventListener("abort", abort, { once: true });
		if (signal.aborted) abort();
	});
}
function removeForeignReceipt(state, jobId) {
	const current = monitor(state);
	current.byJobId.delete(jobId);
	if (current.byJobId.size === 0) {
		current.timer?.cancel();
		current.timer = null;
	}
	for (const finish of current.waiters.get(jobId) ?? []) finish(true);
}
function stopForeignReceiptMonitor(state) {
	const current = monitor(state);
	if (current.timer) {
		current.timer.cancel();
		current.timer = null;
	}
	current.byJobId.clear();
	current.reconcile = void 0;
	for (const waiters of current.waiters.values()) for (const finish of waiters) finish(false);
}
function resumeForeignReceiptMonitor(state) {
	arm(state);
}
//#endregion
//#region src/cron/service/run-admission-capacity.ts
function acquireCronRunSlot(state) {
	state.runAdmission.active += 1;
	let released = false;
	return () => {
		if (released) return;
		released = true;
		state.runAdmission.active -= 1;
		dispatchWaiters(state);
	};
}
function dispatchWaiters(state) {
	const admission = state.runAdmission;
	if (state.stopped) {
		cancelCronRunAdmissionWaiters(state);
		return;
	}
	const maxConcurrentRuns = 8;
	while (admission.active < maxConcurrentRuns) {
		const waiter = admission.waiters.shift();
		if (!waiter) break;
		waiter(acquireCronRunSlot(state));
	}
	if (admission.active < maxConcurrentRuns && admission.waiters.length === 0) {
		const listener = admission.capacityListener;
		admission.capacityListener = null;
		if (listener) queueMicrotask(listener);
	}
}
/**
* Acquire only the slots currently available to scheduled work. Unlike the
* waiter-based path used by direct runs, this never retains a timer batch while
* the pool is saturated.
*/
function tryAcquireCronRunSlots(state, requested) {
	if (state.stopped || requested <= 0 || state.runAdmission.waiters.length > 0) return [];
	const available = Math.max(0, 8 - state.runAdmission.active);
	return Array.from({ length: Math.min(requested, available) }, () => acquireCronRunSlot(state));
}
/** Keep the first wake-up until capacity release consumes or cancellation clears it. */
function setCronRunCapacityListener(state, listener) {
	state.runAdmission.capacityListener ??= listener;
}
async function acquireCronRunAdmission(state, signal) {
	const admission = state.runAdmission;
	if (state.stopped || signal?.aborted) return null;
	if (admission.waiters.length === 0 && admission.active < 8) return acquireCronRunSlot(state);
	return await new Promise((resolve) => {
		const settle = (release) => {
			signal?.removeEventListener("abort", cancel);
			resolve(release);
		};
		const cancel = () => {
			const index = admission.waiters.indexOf(settle);
			if (index < 0) return;
			admission.waiters.splice(index, 1);
			settle(null);
			dispatchWaiters(state);
		};
		admission.waiters.push(settle);
		signal?.addEventListener("abort", cancel, { once: true });
		if (signal?.aborted) cancel();
	});
}
/** Wake queued work on stop so each caller can release its durable reservation. */
function cancelCronRunAdmissionWaiters(state) {
	state.runAdmission.capacityListener = null;
	const waiters = state.runAdmission.waiters.splice(0);
	for (const waiter of waiters) waiter(null);
}
/** Apply one service-level cap to every cron execution source. Queue waiters
* keep their job reservation, then recheck scheduler state before execution.
*/
async function runWithCronAdmission(state, execute, acquiredRelease, signal) {
	const release = acquiredRelease ?? await acquireCronRunAdmission(state, signal);
	if (!release) return { kind: "stopped" };
	try {
		return {
			kind: "admitted",
			value: await execute()
		};
	} finally {
		release();
	}
}
//#endregion
//#region src/cron/service/runtime-publication.ts
function publishDurableNextRunChanges(params) {
	const previous = params.state.durableNextRunAtMsByJobId;
	const next = params.stateOnly ? new Map(previous) : new Map(params.storeJobs.map((job) => [job.id, job.state.nextRunAtMs]));
	if (params.stateOnly) {
		const currentJobsById = new Map(params.storeJobs.map((job) => [job.id, job]));
		for (const jobId of previous.keys()) {
			const job = currentJobsById.get(jobId);
			if (job) next.set(jobId, job.state.nextRunAtMs);
		}
	}
	const changedJobs = params.storeJobs.filter((job) => {
		if (!previous.has(job.id) || !next.has(job.id)) return false;
		return previous.get(job.id) !== next.get(job.id);
	});
	params.state.durableNextRunAtMsByJobId = next;
	for (const job of changedJobs) {
		if (job.id === params.suppressScheduledJobId) continue;
		emit(params.state, {
			jobId: job.id,
			action: "scheduled",
			job,
			nextRunAtMs: job.state.nextRunAtMs
		});
	}
}
/** Publishes scheduled-row changes after a targeted runtime transaction commits. */
function publishCronRuntimeRows(state) {
	if (!state.store) return;
	publishDurableNextRunChanges({
		state,
		storeJobs: state.store.jobs,
		stateOnly: false
	});
}
//#endregion
//#region src/cron/service/runtime-store.ts
/** Applies committed target rows locally without copying any unrelated store snapshot. */
function applyCronRuntimeRowsToState(state, jobs, deletedJobIds = [], opts) {
	if (!state.store) return;
	const jobsById = new Map([...jobs].map((job) => [job.id, job]));
	const deleted = new Set(deletedJobIds);
	const residentJobIds = new Set(state.store.jobs.map((job) => job.id));
	const residentJobs = state.store.jobs.filter((job) => !deleted.has(job.id)).map((job) => jobsById.get(job.id) ?? job);
	const importedJobs = [...jobsById.values()].filter((job) => !residentJobIds.has(job.id) && !deleted.has(job.id));
	state.store.jobs = [...residentJobs, ...importedJobs];
	if (opts?.publish !== false) publishCronRuntimeRows(state);
}
/** Commits runtime-owned job rows from authoritative values read under SQLite's write lock. */
function commitCronRuntimeRows(params) {
	const storeKey = cronStoreKey(params.state.deps.storePath);
	const jobIds = new Set(params.jobIds);
	const committed = runOpenClawStateWriteTransaction(({ db }) => {
		const receiptSchema = prepareCronRunReceiptWriteSchema(db);
		const rows = loadCronRows(db, storeKey, jobIds, { includeGrantDefinitionProjection: true });
		const rowsByJobId = new Map(rows.map((row) => [row.job_id, row]));
		const loadedJobs = loadedCronStoreFromRows(rows).store.jobs;
		const { repairJobIds } = loadCronRuntimeAuthorities({
			db,
			storeKey,
			jobs: loadedJobs
		});
		if (repairJobIds.length > 0) repairCronRuntimeAuthorityRows({
			db,
			storeKey,
			jobs: loadedJobs,
			jobIds: repairJobIds
		});
		const jobs = new Map(loadedJobs.map((job) => [job.id, job]));
		const mutation = params.mutate({
			database: db,
			jobs,
			receiptSchema
		});
		const upsertJobIds = [...new Set(mutation.upsertJobIds ?? [])].toSorted();
		const deleteJobIds = [...new Set(mutation.deleteJobIds ?? [])].toSorted();
		const runHooks = mutation.runHooks !== false;
		if (runHooks) params.transactionHooks?.beforeWrite?.(db, receiptSchema);
		for (const jobId of deleteJobIds) deleteCronJobRowInDatabase(db, storeKey, jobId);
		for (const jobId of upsertJobIds) {
			const row = rowsByJobId.get(jobId);
			const job = jobs.get(jobId);
			if (row && job && !deleteJobIds.includes(jobId)) upsertCronJobRow(db, storeKey, job, row.sort_order, { knownExistingRow: row });
		}
		if (runHooks) params.transactionHooks?.afterWrite?.(db, receiptSchema);
		return {
			changed: upsertJobIds.length > 0 || deleteJobIds.length > 0,
			runHooks,
			value: mutation.value
		};
	}, {}, { operationLabel: params.operationLabel });
	if (committed.runHooks) params.transactionHooks?.afterCommit?.();
	if (committed.changed) noteCronJobsStoreCommit(storeKey);
	return committed.value;
}
//#endregion
//#region src/cron/service/wake.ts
/** Manual cron wake helper for queueing system events into sessions. */
/** Keeps safety notices with their creator and limits failure routes to explicit origins. */
function enqueueCronNotification(state, job, text, kind) {
	const sessionKey = kind === "failure-alert" ? resolveCronDeliverySessionKey(job) : job.sessionKey;
	const agentId = normalizeOptionalAgentId(job.agentId) ?? normalizeOptionalAgentId(parseAgentSessionKey(sessionKey)?.agentId) ?? normalizeOptionalAgentId(state.deps.resolveDefaultAgentId?.()) ?? normalizeOptionalAgentId(state.deps.defaultAgentId);
	const deliveryContext = sessionKey || kind === "auto-disabled" && agentId ? state.deps.resolveOriginDeliveryContext?.({
		agentId,
		sessionKey
	}) : void 0;
	state.deps.enqueueSystemEvent(text, {
		agentId,
		sessionKey,
		contextKey: `cron:${job.id}:${kind}`,
		...deliveryContext ? { deliveryContext } : {}
	});
	if (kind === "auto-disabled" || job.wakeMode === "now" || sessionKey) state.deps.requestHeartbeat({
		source: "notifications-event",
		intent: "immediate",
		reason: "wake",
		agentId,
		sessionKey
	});
}
/** Enqueues a manual cron wake event and optionally pokes the targeted heartbeat loop. */
function wake(state, opts) {
	const text = opts.text.trim();
	if (!text) return { ok: false };
	const sessionKey = opts.sessionKey?.trim() || void 0;
	const agentId = opts.agentId?.trim() || void 0;
	if (sessionKey && isSubagentSessionKey(sessionKey)) return {
		ok: false,
		reason: "unwakeable-session-key"
	};
	const originDeliveryContext = sessionKey || agentId ? state.deps.resolveOriginDeliveryContext?.({
		sessionKey,
		agentId
	}) : void 0;
	const enqueueOpts = sessionKey || agentId ? {
		...sessionKey ? { sessionKey } : {},
		...agentId ? { agentId } : {},
		...originDeliveryContext ? { deliveryContext: originDeliveryContext } : {}
	} : void 0;
	state.deps.enqueueSystemEvent(text, enqueueOpts);
	if (opts.mode === "now" || sessionKey) state.deps.requestHeartbeat({
		source: "manual",
		intent: "immediate",
		reason: "wake",
		...sessionKey ? { sessionKey } : {},
		...agentId ? { agentId } : {}
	});
	return { ok: true };
}
//#endregion
//#region src/cron/service/notification-dispatch.ts
/** Sends committed cron notifications through the live host and records delivery. */
function dispatchCronNotification(state, notification) {
	if (notification.kind === "auto-disabled") enqueueCronNotification(state, notification.job, notification.text, notification.kind);
	else transportFailureAlert(state, notification);
}
const FAILURE_ALERT_ERROR_MAX_LENGTH = 1e3;
/** Writes one settled transport fact while the exact alert cycle still owns the row. */
async function recordFailureAlertOutcome(state, cycle, outcome) {
	let ownsCycle = false;
	try {
		return await locked(state, async () => {
			if (state.stopped || state.lifecycleGeneration !== cycle.lifecycleGeneration) return "stale";
			const context = captureOpenClawStateWorkerContext();
			const storeKey = cronStoreKey(state.deps.storePath);
			let result = "stale";
			await runCronRuntimeMutation({
				context,
				type: "cron.recordFailureAlertOutcome",
				input: {
					storeKey,
					jobId: cycle.jobId,
					runAtMs: cycle.runAtMs,
					alertAtMs: cycle.alertAtMs,
					notificationId: cycle.notificationId,
					outcome: {
						...outcome,
						error: outcome.error ? truncateUtf16Safe(formatErrorMessage(outcome.error), FAILURE_ALERT_ERROR_MAX_LENGTH) : void 0
					}
				},
				assertCurrent() {
					if (state.stopped || state.lifecycleGeneration !== cycle.lifecycleGeneration) {
						ownsCycle = false;
						throw new Error("Cron failure-alert owner retired");
					}
				},
				prepare(facts) {
					ownsCycle = facts.ownsCycle;
					return {
						value: {},
						assertCurrent() {}
					};
				},
				publish(committed) {
					if (committed.job) {
						noteCronJobsStoreCommit(storeKey);
						applyCronRuntimeRowsToState(state, [committed.job], [], { publish: false });
						result = "recorded";
					}
				}
			});
			return result;
		});
	} catch (err) {
		state.deps.log.warn({
			jobId: cycle.jobId,
			err: formatErrorMessage(err)
		}, "cron: failed to record failure-alert outcome");
		return ownsCycle ? "persistence-failed" : "stale";
	}
}
function transportFailureAlert(state, params) {
	const jobId = params.job.id;
	const alertAtMs = params.job.state.lastFailureAlertAtMs;
	const lifecycleGeneration = state.lifecycleGeneration;
	const notificationId = params.job.state.lastFailureNotificationId;
	const runAtMs = params.job.state.lastRunAtMs;
	if (!state.deps.sendCronFailureAlert) {
		enqueueCronNotification(state, params.job, params.payload.text ?? "", "failure-alert");
		return;
	}
	state.deps.sendCronFailureAlert({
		job: params.job,
		payload: params.payload,
		runAtMs: params.runAtMs,
		channel: params.route.channel,
		to: params.route.to,
		mode: params.route.mode,
		accountId: params.route.accountId,
		threadId: params.route.threadId,
		...params.route.alternateRoute ? { inheritSessionThread: false } : {},
		onDeliverySettled: async (outcome) => {
			if (await recordFailureAlertOutcome(state, {
				jobId,
				alertAtMs,
				runAtMs,
				lifecycleGeneration,
				notificationId
			}, outcome) !== "stale" && outcome.status === "not-delivered") enqueueCronNotification(state, params.job, params.payload.text ?? "", "failure-alert");
		}
	}).catch((err) => {
		state.deps.log.warn({
			jobId: params.job.id,
			err: String(err)
		}, "cron: failure alert delivery failed");
	});
}
//#endregion
//#region src/cron/service/store.ts
/** Loads, normalizes, quarantines, and persists cron service store state. */
const loadedCronStoreRevisions = /* @__PURE__ */ new WeakMap();
function invalidateStaleNextRunOnScheduleChange(params) {
	const previousJob = params.previousJobsById.get(params.hydrated.id);
	if (!previousJob || cronSchedulingInputsEqual(previousJob, params.hydrated)) return;
	params.hydrated.state ??= {};
	params.hydrated.state.nextRunAtMs = void 0;
	params.hydrated.state.startupCatchupAtMs = void 0;
	params.hydrated.state.pacedNextRunAtMs = void 0;
	params.hydrated.state.forcePreservedNextRunAtMs = cronSchedulingInputsEqual({
		...previousJob,
		enabled: params.hydrated.enabled
	}, params.hydrated) ? resolveForcePreservedOneShotAtMs(params.hydrated) : void 0;
}
function warnInvalidPersistedCronJob(params) {
	const jobId = typeof params.raw.id === "string" ? params.raw.id : void 0;
	const dedupeKey = jobId ?? `index:${params.index}`;
	if (params.state.warnedInvalidPersistedJobKeys.has(dedupeKey)) return;
	params.state.warnedInvalidPersistedJobKeys.add(dedupeKey);
	params.state.deps.log.warn({
		storePath: params.state.deps.storePath,
		jobId,
		jobIndex: params.index,
		reason: params.reason
	}, "cron: quarantined invalid persisted job and skipped it from runtime");
}
function isValidatedCronJob(value) {
	return getInvalidPersistedCronJobReason(value) === null;
}
/** Loads and normalizes the cron store, quarantining invalid persisted rows before runtime use. */
async function ensureLoaded(state, opts) {
	if (state.store && !opts?.forceReload) {
		const loadedRevision = loadedCronStoreRevisions.get(state);
		if (loadedRevision === void 0 || loadedRevision === getCronJobsStoreRevision(state.deps.storePath)) return;
	}
	const previousJobsById = /* @__PURE__ */ new Map();
	for (const job of state.store?.jobs ?? []) previousJobsById.set(job.id, job);
	const loadedRevision = getCronJobsStoreRevision(state.deps.storePath);
	const loaded = await loadCronJobsStoreWithConfigJobs(state.deps.storePath);
	const loadNowMs = state.deps.nowMs();
	const loadedJobs = (loaded.store.jobs ?? []).filter(isRecord);
	const jobs = [];
	const durableNextRunAtMsByJobId = /* @__PURE__ */ new Map();
	const quarantinedConfigJobs = [...loaded.invalidConfigRows];
	for (const [index, raw] of loadedJobs.entries()) {
		const rawConfigJob = loaded.configJobs[index] ?? structuredClone(raw);
		const sourceIndex = loaded.configJobIndexes[index] ?? index;
		const runtimeEntry = loaded.configJobRuntimeEntries[index];
		normalizeCronJobIdentityFields(raw);
		const rawInvalidReason = getInvalidPersistedCronJobReason(raw);
		let normalized;
		try {
			normalized = normalizeCronJobInput(raw);
		} catch (error) {
			if (!isInvalidCronSessionTargetIdError(error)) throw error;
			normalized = null;
			state.deps.log.warn({
				storePath: state.deps.storePath,
				jobId: typeof raw.id === "string" ? raw.id : void 0
			}, "cron: job has invalid persisted sessionTarget; run openclaw doctor --fix to repair");
		}
		const hydratedRaw = normalized ?? raw;
		let invalidReason = rawInvalidReason ?? getInvalidPersistedCronJobReason(hydratedRaw);
		const hydratedSchedule = isRecord(hydratedRaw.schedule) ? hydratedRaw.schedule : {};
		const hydratedIsValid = !invalidReason && isValidatedCronJob(hydratedRaw);
		if (hydratedIsValid && hydratedRaw.enabled && hydratedSchedule.kind === "every") try {
			assertTimeScheduleSatisfiable({
				...hydratedRaw,
				state: {}
			}, loadNowMs);
		} catch {
			invalidReason = "unsatisfiable-schedule";
		}
		if (invalidReason) {
			const quarantineEntry = {
				sourceIndex,
				reason: invalidReason,
				job: rawConfigJob
			};
			const runtimeState = runtimeEntry?.state ?? raw.state;
			if (runtimeState && typeof runtimeState === "object" && !Array.isArray(runtimeState)) quarantineEntry.state = structuredClone(runtimeState);
			const updatedAtMs = runtimeEntry?.updatedAtMs ?? raw.updatedAtMs;
			if (typeof updatedAtMs === "number" && Number.isFinite(updatedAtMs)) quarantineEntry.updatedAtMs = updatedAtMs;
			if (typeof runtimeEntry?.scheduleIdentity === "string") quarantineEntry.scheduleIdentity = runtimeEntry.scheduleIdentity;
			quarantinedConfigJobs.push(quarantineEntry);
			warnInvalidPersistedCronJob({
				state,
				raw,
				index: sourceIndex,
				reason: invalidReason
			});
			continue;
		}
		if (!hydratedIsValid) continue;
		const hydrated = hydratedRaw;
		jobs.push(hydrated);
		durableNextRunAtMsByJobId.set(hydrated.id, hydrated.state.nextRunAtMs);
		invalidateStaleNextRunOnScheduleChange({
			previousJobsById,
			hydrated
		});
	}
	state.store = {
		version: 1,
		jobs
	};
	state.durableNextRunAtMsByJobId = durableNextRunAtMsByJobId;
	state.storeLoadedAtMs = loadNowMs;
	loadedCronStoreRevisions.set(state, loadedRevision);
	if (quarantinedConfigJobs.length > 0 && !opts?.deferQuarantinePersist) {
		quarantinedConfigJobs.sort((left, right) => left.sourceIndex - right.sourceIndex);
		state.pendingQuarantineConfigJobs = quarantinedConfigJobs;
		try {
			if (await persist(state)) state.deps.log.warn({
				storePath: state.deps.storePath,
				quarantinedJobs: quarantinedConfigJobs.length
			}, "cron: sanitized active cron store after quarantining malformed persisted jobs");
		} catch (error) {
			state.deps.log.warn({
				storePath: state.deps.storePath,
				error: error instanceof Error ? error.message : String(error)
			}, "cron: failed to sanitize malformed persisted jobs after quarantine; continuing with quarantined in-memory view");
		}
	}
}
/** Loads authoritative passive state without discarding enabled-scheduler transients. */
async function ensureLoadedForOperation(state) {
	await ensureLoaded(state, {
		forceReload: !state.deps.cronEnabled,
		deferQuarantinePersist: !state.deps.cronEnabled
	});
	if (!state.deps.cronEnabled) {
		state.pendingQuarantineConfigJobs = [];
		state.lastQuarantineFailureWarnKey = null;
	}
}
/** Emits the cron-disabled warning once per service state. */
function warnIfDisabled(state, action) {
	if (state.deps.cronEnabled) return;
	if (state.warnedDisabled) return;
	state.warnedDisabled = true;
	state.deps.log.warn({
		enabled: false,
		action,
		storePath: state.deps.storePath
	}, "cron: scheduler disabled; jobs will not run automatically");
}
/** Persists cron rows and pending quarantine records in one SQLite transaction. */
function persist(state, opts) {
	return persistUsing(state, opts, saveCronJobsStoreWithRevision);
}
async function persistUsing(state, opts, save) {
	const store = state.store;
	if (!store) return false;
	const quarantine = state.pendingQuarantineConfigJobs.length > 0 ? {
		entries: state.pendingQuarantineConfigJobs,
		nowMs: state.deps.nowMs()
	} : void 0;
	const stateOnly = !quarantine && opts?.stateOnly === true;
	let revision;
	try {
		revision = (await save(state.deps.storePath, store, {
			quarantine,
			stateOnly,
			transactionHooks: opts?.transactionHooks
		})).revision;
	} catch (error) {
		if (!quarantine || error instanceof CronRunReceiptConflictError || error instanceof CronRunReceiptRevisionError) throw error;
		const errorMessage = error instanceof Error ? error.message : String(error);
		const warnKey = `${state.deps.storePath}\0${errorMessage}`;
		if (state.lastQuarantineFailureWarnKey !== warnKey) {
			state.lastQuarantineFailureWarnKey = warnKey;
			state.deps.log.warn({
				storePath: state.deps.storePath,
				error: errorMessage
			}, "cron: failed to quarantine malformed persisted jobs; skipping active store sanitization");
		}
		return false;
	}
	loadedCronStoreRevisions.set(state, revision);
	if (quarantine) {
		state.pendingQuarantineConfigJobs = [];
		state.lastQuarantineFailureWarnKey = null;
	}
	publishDurableNextRunChanges({
		state,
		storeJobs: store.jobs,
		stateOnly,
		suppressScheduledJobId: opts?.suppressScheduledJobId
	});
	runPostPersistCronNotifications(state, opts?.postPersistNotifications);
	return true;
}
/**
* Notifications run after the durable commit; one throwing notify (e.g. an
* auto-disable notice for a removed agent) must not drop its siblings or
* masquerade as a store-write failure — at startup that keeps the whole
* scheduler down.
*/
function runPostPersistCronNotifications(state, notifications) {
	for (const notification of notifications ?? []) try {
		dispatchCronNotification(state, notification);
	} catch (err) {
		state.deps.log.warn({ error: err instanceof Error ? err.message : String(err) }, "cron: post-persist notification failed");
	}
}
/** Best-effort scratch pruning after the owning job deletions are durable. */
function pruneCronJobScratchAfterCommit(state, committedJobIds) {
	for (const jobId of committedJobIds) try {
		deleteCronJobScratch(state.deps.storePath, jobId);
	} catch (error) {
		state.deps.log.warn({
			jobId,
			err: String(error)
		}, "cron: post-commit scratch cleanup failed");
	}
}
/** Captures the live cron state that must stay aligned with the durable store. */
function snapshotStoreForRollback(state) {
	return {
		store: state.store ? structuredClone(state.store) : null,
		durableNextRunAtMsByJobId: new Map(state.durableNextRunAtMsByJobId)
	};
}
function persistOrRestore(state, snapshot, opts = {}) {
	return persistOrRestoreUsing(state, snapshot, opts, {
		save: saveCronJobsStoreWithRevision,
		saveChanges: saveCronJobsStoreChangesWithRevision
	});
}
/** Retain the current host turn from caller guard/capture through the native commit. */
function persistNativeOrRestore(state, snapshot, opts = {}) {
	return persistOrRestoreUsing(state, snapshot, opts, {
		save: saveCronJobsStoreWithRevisionNative,
		saveChanges: saveCronJobsStoreChangesWithRevisionNative
	});
}
async function persistOrRestoreUsing(state, snapshot, opts, persistence) {
	try {
		if (!state.deps.cronEnabled && snapshot.store && state.store) {
			const committed = await persistence.saveChanges(state.deps.storePath, snapshot.store, state.store, {
				...opts.preserveConcurrentAdds ? { preserveConcurrentAdds: true } : {},
				...opts.transactionHooks ? { transactionHooks: opts.transactionHooks } : {}
			});
			state.store = committed.value;
			state.storeLoadedAtMs = state.deps.nowMs();
			loadedCronStoreRevisions.set(state, committed.revision);
			publishDurableNextRunChanges({
				state,
				storeJobs: state.store.jobs,
				stateOnly: false,
				suppressScheduledJobId: opts.suppressScheduledJobId
			});
			runPostPersistCronNotifications(state, opts.postPersistNotifications);
			return;
		}
		if (!await persistUsing(state, opts, persistence.save)) throw new Error("cron: durable store write did not complete");
	} catch (err) {
		state.store = snapshot.store;
		state.durableNextRunAtMsByJobId = snapshot.durableNextRunAtMsByJobId;
		throw err;
	}
}
//#endregion
//#region src/cron/service/run-admission-mutation.ts
function currentDefaultAgentId(state) {
	return state.deps.resolveDefaultAgentId ? state.deps.resolveDefaultAgentId() : state.deps.defaultAgentId;
}
async function reserveCronRuns(params) {
	const { state } = params;
	const prospective = [];
	let committed = false;
	let conflict;
	try {
		await runCronRuntimeMutation({
			context: params.context,
			type: "cron.reserveRuns",
			input: {
				storeKey: cronStoreKey(state.deps.storePath),
				proposals: [...params.candidates.values()].map((job) => ({
					jobId: job.id,
					enabled: job.enabled,
					configRevision: resolveCronJobConfigRevision(job),
					nextRunAtMs: job.state.nextRunAtMs,
					lastRunAtMs: job.state.lastRunAtMs,
					lastRunStatus: job.state.lastRunStatus,
					immediate: params.immediateJobIds?.has(job.id) === true
				})),
				reservedAtMs: params.reservedAtMs,
				preserveSchedule: params.preserveSchedule,
				scheduleOwnershipAtMs: params.scheduleOwnershipAtMs,
				onExit: params.onExit
			},
			assertCurrent: params.assertCurrent,
			prepare(facts) {
				const defaultAgentId = currentDefaultAgentId(state);
				const observed = new Map(facts.receipts.map((receipt) => [receipt.jobId, receipt]));
				const owners = new Map([...params.candidates.keys()].map((jobId) => {
					const owner = state.queuedRunReservationsByJobId.get(jobId);
					return [jobId, {
						owner,
						markerAtMs: owner?.markerAtMs,
						lifecycleGeneration: owner?.lifecycleGeneration,
						handle: owner ? { ...owner.runReceipt } : void 0
					}];
				}));
				const claims = [...params.candidates.values()].map((job) => prepareCronRunReceiptClaim({
					storePath: state.deps.storePath,
					job: params.onExit ? {
						...job,
						enabled: false
					} : job,
					agentId: resolveCronJobEffectiveAgentId(job, currentDefaultAgentId(state)),
					startedAtMs: params.reservedAtMs,
					requestRunId: params.requestRunId,
					observed: observed.get(job.id)
				}));
				for (const claim of claims) {
					claimLocalCronRunReceiptOwnership(claim.handle);
					prospective.push(claim.handle);
				}
				return {
					value: {
						defaultAgentId,
						claims,
						replacements: [...owners.values()].flatMap(({ handle }) => handle ? [handle] : [])
					},
					assertCurrent() {
						const currentDefault = currentDefaultAgentId(state);
						for (const claim of claims) if (tryResolveCronJobEffectiveAgentId(params.candidates.get(claim.handle.jobId), currentDefault) !== claim.handle.agentId) throw new Error("Cron job owner changed before reservation");
						for (const [jobId, { owner, markerAtMs, lifecycleGeneration, handle }] of owners) if (state.queuedRunReservationsByJobId.get(jobId) !== owner || owner?.markerAtMs !== markerAtMs || owner?.lifecycleGeneration !== lifecycleGeneration || handle && !exactCronRunReceiptMatches(owner?.runReceipt, handle)) throw new Error("Cron local reservation changed before commit");
						for (const claim of claims) if (claim.observed && claim.observedStale !== isCronRunReceiptOwnerStale(claim.observed, params.reservedAtMs)) throw new Error("Cron receipt liveness changed before reservation commit");
					}
				};
			},
			publish(outcome) {
				committed = true;
				const claimed = new Set(outcome.reservations.map(({ runReceipt }) => runReceipt.receiptId));
				for (const handle of prospective) if (!claimed.has(handle.receiptId)) releaseLocalCronRunReceiptOwnership(handle);
				params.onCommitted(outcome);
				if (outcome.reservations.length > 0) noteCronJobsStoreCommit(cronStoreKey(state.deps.storePath));
			},
			onRolledBackConflict(receipt) {
				conflict = receipt;
			}
		});
		return conflict;
	} finally {
		if (!committed) for (const handle of prospective) releaseLocalCronRunReceiptOwnership(handle);
	}
}
/** Callers hold the partition lock through committed publication and execution handoff. */
async function activateReservedCronRun(params) {
	const { state } = params;
	const reservation = state.queuedRunReservationsByJobId.get(params.job.id);
	if (!reservation || reservation.identity !== params.reservationIdentity) return;
	const markerAtMs = reservation.markerAtMs;
	const runReceipt = reservation.runReceipt;
	const storeKey = cronStoreKey(state.deps.storePath);
	const context = captureOpenClawStateWorkerContext();
	let activation;
	await runCronRuntimeMutation({
		context,
		type: "cron.activateRun",
		input: {
			storeKey,
			handle: { ...runReceipt },
			startedAtMs: params.startedAtMs,
			onExitSchedule: params.onExitSchedule ? { ...params.onExitSchedule } : void 0
		},
		assertCurrent() {
			params.commitGuard?.();
			if (state.queuedRunReservationsByJobId.get(params.job.id) !== reservation || reservation.markerAtMs !== markerAtMs || reservation.runReceipt !== runReceipt) throw new CronRunReceiptRevisionError(runReceipt.receiptId, "cron reservation changed before activation");
		},
		prepare() {
			const defaultAgentId = currentDefaultAgentId(state);
			return {
				value: {
					markerAtMs,
					defaultAgentId
				},
				assertCurrent() {
					if (currentDefaultAgentId(state) !== defaultAgentId) throw new CronRunReceiptRevisionError(runReceipt.receiptId);
				}
			};
		},
		publish(committed) {
			activation = committed.activation;
			if (!activation) return;
			noteCronJobsStoreCommit(storeKey);
			applyCronRuntimeRowsToState(state, [activation.job]);
			reservation.markerAtMs = params.startedAtMs;
			reservation.runReceipt = activation.receipt;
			reservation.activationPreviousLastError = { value: activation.previousLastError };
		}
	});
	return activation;
}
async function releaseReservedCronRuns(params) {
	const { state } = params;
	const storeKey = cronStoreKey(state.deps.storePath);
	const context = params.context ?? captureOpenClawStateWorkerContext();
	const retained = params.terminal ? retainCronRunReceiptSettlement(params.terminal.handle) : void 0;
	try {
		await runCronRuntimeMutation({
			context,
			type: "cron.releaseReservations",
			input: {
				storeKey,
				jobIds: params.reservations.map(({ jobId }) => jobId),
				restoreLastError: params.restoreLastError !== false,
				recompute: params.recompute === true,
				terminal: params.terminal,
				requireCurrentReceipt: params.requireCurrentReceipt
			},
			assertCurrent() {
				retained?.assertCurrent();
			},
			prepare(facts) {
				const defaultAgentId = currentDefaultAgentId(state);
				const owners = params.reservations.map((reservation) => ({
					...reservation,
					owner: state.queuedRunReservationsByJobId.get(reservation.jobId)
				})).filter(({ owner, reservationIdentity }) => owner?.identity === reservationIdentity);
				const reservations = owners.map(({ jobId, owner }) => ({
					jobId,
					markerAtMs: owner.markerAtMs,
					runReceipt: { ...owner.runReceipt },
					activationPreviousLastError: owner.activationPreviousLastError ? { ...owner.activationPreviousLastError } : void 0
				}));
				const assertAvailable = () => {
					if (params.requireCurrentReceipt && params.terminal && (facts.deletionBlocked || state.deps.isAgentAvailable?.(params.terminal.handle.agentId, void 0, facts) === false)) throw new CronRunReceiptRevisionError(params.terminal.handle.receiptId, describeUnavailableCronAgent(params.terminal.handle.agentId), "owner-unavailable");
				};
				assertAvailable();
				return {
					value: {
						nowMs: state.deps.nowMs(),
						defaultAgentId,
						reservations,
						deferTerminal: retained?.pending === true
					},
					assertCurrent() {
						assertAvailable();
						if (currentDefaultAgentId(state) !== defaultAgentId) throw new Error("Cron default owner changed before cleanup");
						for (const [index, { jobId, owner }] of owners.entries()) {
							const prepared = reservations[index];
							if (state.queuedRunReservationsByJobId.get(jobId) !== owner || owner?.markerAtMs !== prepared.markerAtMs || owner.runReceipt.receiptId !== prepared.runReceipt.receiptId || owner.runReceipt.startedAtMs !== prepared.runReceipt.startedAtMs) throw new Error("Cron reservation ownership changed before cleanup");
						}
					}
				};
			},
			publish(committed) {
				if (params.terminal && retained?.pending) retained.deferFinish(params.terminal, context);
				if (committed.jobs.length > 0) noteCronJobsStoreCommit(storeKey);
				try {
					runPostPersistCronNotifications(state, committed.notifications);
					applyCronRuntimeRowsToState(state, committed.jobs);
					for (const entry of committed.logs) state.deps.log[entry.level](entry.fields, entry.message);
				} finally {
					releaseReservationOwnership(state, params.reservations);
				}
			},
			onSettled: params.onSettled
		});
	} finally {
		retained?.release();
	}
}
/** Release exact local identities only after accepted work has settled. */
function releaseReservationOwnership(state, reservations) {
	for (const reservation of reservations) {
		const ownership = state.queuedRunReservationsByJobId.get(reservation.jobId);
		if (ownership?.identity !== reservation.reservationIdentity) continue;
		releaseLocalCronRunReceiptOwnership(ownership.runReceipt);
		state.queuedRunReservationsByJobId.delete(reservation.jobId);
	}
}
//#endregion
//#region src/cron/service/run-owner.ts
/** Records ownerless scheduled attempts before one invalid job can block batch admission. */
async function skipCronJobsWithoutOwners(state, candidates, nowMs, opts) {
	const resolveOwnerAgentId = (job) => tryResolveCronJobEffectiveAgentId(job, state.deps.resolveDefaultAgentId ? state.deps.resolveDefaultAgentId() : state.deps.defaultAgentId);
	const unresolved = new Map(candidates.filter((job) => !resolveOwnerAgentId(job)).map((job) => [job.id, job]));
	if (unresolved.size === 0) return candidates;
	const notifications = [];
	const skipped = commitCronRuntimeRows({
		state,
		jobIds: unresolved.keys(),
		operationLabel: "cron.unresolved-owner",
		mutate: ({ database, jobs }) => {
			const committed = [];
			const rejected = [];
			for (const [jobId, job] of jobs) {
				const planned = unresolved.get(jobId);
				if (!planned || job.enabled !== planned.enabled || job.state.nextRunAtMs !== planned.state.nextRunAtMs || job.state.lastRunAtMs !== planned.state.lastRunAtMs || job.state.lastRunStatus !== planned.state.lastRunStatus || resolveCronJobConfigRevision(job) !== resolveCronJobConfigRevision(planned) || hasActiveCronRun(job) || findActiveCronRunReceiptInDatabase({
					database,
					storePath: state.deps.storePath,
					jobId
				}) || resolveOwnerAgentId(job)) {
					if (planned) rejected.push(job);
					continue;
				}
				applyJobResult(state, job, {
					status: "skipped",
					completionStatus: "failed",
					error: CRON_AGENT_SELECTION_REQUIRED_MESSAGE,
					executionStarted: false,
					startedAt: nowMs,
					endedAt: nowMs
				}, {
					deferredNotifications: notifications,
					scheduleMode: opts?.scheduleMode,
					scheduleOwnershipAtMs: opts?.manualRun?.scheduleOwnershipAtMs
				});
				committed.push(job);
			}
			return {
				upsertJobIds: committed.map((job) => job.id),
				value: {
					committed,
					rejected
				}
			};
		}
	});
	applyCronRuntimeRowsToState(state, skipped.committed);
	for (const job of skipped.committed) {
		state.deps.log.warn({
			jobId: job.id,
			error: CRON_AGENT_SELECTION_REQUIRED_MESSAGE
		}, "cron: skipping job with unresolved owner");
		await emitOwnerlessFinished(state, job, nowMs, opts?.manualRun);
	}
	if (opts?.manualRun) for (const job of skipped.rejected) await emitOwnerlessFinished(state, job, nowMs, opts.manualRun);
	runPostPersistCronNotifications(state, notifications);
	return candidates.filter((job) => !unresolved.has(job.id));
}
async function emitOwnerlessFinished(state, job, nowMs, manualRun) {
	const event = {
		jobId: job.id,
		action: "finished",
		job,
		status: "skipped",
		completionStatus: "failed",
		error: CRON_AGENT_SELECTION_REQUIRED_MESSAGE,
		runId: manualRun?.runId,
		runAtMs: nowMs,
		durationMs: 0,
		nextRunAtMs: job.state.nextRunAtMs,
		deliveryStatus: job.state.lastDeliveryStatus,
		deliveryError: job.state.lastDeliveryError
	};
	await finishCronRun(state, {
		event,
		ownerlessRun: true
	});
	emit(state, event);
	if (manualRun?.terminalTracker) manualRun.terminalTracker.emitted = true;
}
//#endregion
//#region src/cron/service/agent-watchdog.ts
const CRON_TIMEOUT_CLEANUP_GUARD_MS = 2e4;
const CRON_AGENT_SETUP_WATCHDOG_MS = 6e4;
const CRON_AGENT_PRE_EXECUTION_WATCHDOG_MS = 6e4;
const CRON_AGENT_PRE_EXECUTION_MIN_WATCHDOG_MS = 1e3;
const CRON_AGENT_PHASE_WATCHDOG_STAGE = {
	runner_entered: "pre_execution",
	workspace: "pre_execution",
	runtime_plugins: "pre_execution",
	before_agent_reply: "execution",
	model_resolution: "pre_execution",
	auth: "pre_execution",
	context_engine: "pre_execution",
	attempt_dispatch: "execution",
	context_assembled: "execution",
	turn_accepted: "execution",
	process_spawned: "execution",
	tool_execution_started: "execution",
	assistant_output_started: "execution",
	model_call_started: "execution"
};
/** Tracks isolated-agent setup/execution progress and fires the correct cron timeout reason. */
function createCronAgentWatchdog(params) {
	let state = params.deferUntilRunner ? "waiting_for_runner" : "executing";
	let timeoutId;
	let setupTimeoutId;
	let preExecutionTimeoutId;
	let activeExecution;
	let observedLaneWait = false;
	let waitingForLane = false;
	const setTimedOut = (reason) => {
		if (state === "timed_out" || state === "disposed") return;
		state = "timed_out";
		params.triggerTimeout(reason);
	};
	const startTimeout = () => {
		if (timeoutId || state === "disposed") return;
		timeoutId = setTimeout(() => {
			setTimedOut(timeoutErrorMessage(activeExecution));
		}, params.jobTimeoutMs);
	};
	const clearSetupTimeout = () => {
		if (!setupTimeoutId) return;
		clearTimeout(setupTimeoutId);
		setupTimeoutId = void 0;
	};
	const startSetupTimeout = () => {
		if (setupTimeoutId || state !== "waiting_for_runner" || waitingForLane) return;
		setupTimeoutId = setTimeout(() => {
			if (state === "waiting_for_runner" && !waitingForLane) setTimedOut(setupTimeoutErrorMessage(activeExecution));
		}, CRON_AGENT_SETUP_WATCHDOG_MS);
	};
	const clearPreExecutionTimeout = () => {
		if (!preExecutionTimeoutId) return;
		clearTimeout(preExecutionTimeoutId);
		preExecutionTimeoutId = void 0;
	};
	const isWaitingForExecution = () => state === "waiting_for_initial_progress" || state === "waiting_for_fallback_execution";
	const startPreExecutionTimeout = () => {
		if (preExecutionTimeoutId || !isWaitingForExecution()) return;
		preExecutionTimeoutId = setTimeout(() => {
			if (isWaitingForExecution()) setTimedOut(preExecutionTimeoutErrorMessage(activeExecution));
		}, resolveCronAgentPreExecutionWatchdogMs(params.jobTimeoutMs));
	};
	const noteExecutionProgress = (info) => {
		if (!info) return;
		activeExecution = {
			...activeExecution,
			...info
		};
		const stage = info.phase ? CRON_AGENT_PHASE_WATCHDOG_STAGE[info.phase] : void 0;
		if (state === "waiting_for_initial_progress" && info.phase !== void 0 && info.phase !== "runner_entered" || state === "waiting_for_fallback_execution" && stage === "execution") {
			state = "executing";
			clearPreExecutionTimeout();
		}
	};
	return {
		start: () => {
			if (params.deferUntilRunner) {
				startSetupTimeout();
				return;
			}
			startTimeout();
		},
		replaceTimeout: (timeoutMs) => {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = timeoutMs !== void 0 && state !== "timed_out" && state !== "disposed" ? setTimeout(() => setTimedOut(timeoutErrorMessage(activeExecution)), timeoutMs) : void 0;
		},
		noteLaneWait: () => {
			if (state === "waiting_for_runner") {
				observedLaneWait = true;
				waitingForLane = true;
				clearSetupTimeout();
			}
		},
		noteLaneAdmitted: () => {
			if (state === "waiting_for_runner") {
				observedLaneWait = false;
				waitingForLane = false;
				startSetupTimeout();
			}
		},
		noteRunnerStarted: (info) => {
			if (state === "disposed" || state === "timed_out") return;
			clearSetupTimeout();
			startTimeout();
			if (info?.isFallback === true) {
				clearPreExecutionTimeout();
				state = "waiting_for_fallback_execution";
			} else if (state === "waiting_for_runner") state = "waiting_for_initial_progress";
			noteExecutionProgress(info);
			startPreExecutionTimeout();
		},
		notePhase: (info) => {
			if (state === "disposed" || state === "timed_out") return;
			noteExecutionProgress(info);
		},
		activeExecution: () => activeExecution,
		observedLaneWait: () => observedLaneWait,
		dispose: () => {
			state = "disposed";
			if (timeoutId) clearTimeout(timeoutId);
			clearSetupTimeout();
			clearPreExecutionTimeout();
		}
	};
}
/** Joins timeout cleanup and command settlement without wedging the cron lane. */
async function settleTimedOutCronRun(state, job, timeoutMs, execution, commandSettlement) {
	const cleanupPromise = state.deps.cleanupTimedOutAgentRun?.({
		job,
		timeoutMs,
		execution
	});
	if (!cleanupPromise && !commandSettlement) return;
	let settleTimer;
	const cleanup = cleanupPromise?.catch((err) => {
		state.deps.log.warn({
			jobId: job.id,
			err: String(err)
		}, "cron: timed-out agent cleanup failed");
	});
	const settleTimeout = new Promise((resolve) => {
		settleTimer = setTimeout(resolve, CRON_TIMEOUT_CLEANUP_GUARD_MS);
	});
	try {
		await Promise.race([Promise.allSettled([cleanup, commandSettlement]), settleTimeout]);
	} finally {
		if (settleTimer) clearTimeout(settleTimer);
	}
}
function resolveCronAgentPreExecutionWatchdogMs(jobTimeoutMs) {
	return Math.max(CRON_AGENT_PRE_EXECUTION_MIN_WATCHDOG_MS, Math.min(CRON_AGENT_PRE_EXECUTION_WATCHDOG_MS, Math.floor(jobTimeoutMs / 2)));
}
//#endregion
//#region src/cron/service/timeout-policy.ts
/** Resolves cron job wall-clock timeout policy. */
/**
* Maximum wall-clock time for a single job execution. Acts as a safety net
* on top of per-provider/per-agent timeouts to prevent one stuck job from
* wedging the entire cron lane.
*/
const DEFAULT_JOB_TIMEOUT_MS = 6e5;
/**
* Agent turns can legitimately run much longer than generic cron jobs.
* Use a larger safety ceiling when no explicit timeout is set.
*/
const AGENT_TURN_SAFETY_TIMEOUT_MS = 36e5;
/** Resolves the wall-clock timeout for a cron job, including explicit detached-run overrides. */
function resolveCronJobTimeoutMs(job) {
	const configuredTimeoutMs = (job.payload.kind === "agentTurn" || job.payload.kind === "command" || job.payload.kind === "script") && typeof job.payload.timeoutSeconds === "number" ? finiteSecondsToTimerSafeMilliseconds(job.payload.timeoutSeconds) ?? 0 : void 0;
	if (configuredTimeoutMs === void 0) return job.payload.kind === "agentTurn" ? AGENT_TURN_SAFETY_TIMEOUT_MS : DEFAULT_JOB_TIMEOUT_MS;
	return configuredTimeoutMs <= 0 ? void 0 : configuredTimeoutMs;
}
//#endregion
//#region src/cron/script-failure.ts
function classifyCronScriptFailure(code) {
	if (code === "timeout") return {
		kind: "reason",
		reason: "timeout"
	};
	if (code === "runtime_unavailable") return {
		kind: "reason",
		reason: "server_error"
	};
	return { kind: "permanent" };
}
/** Authors matched retry policy and safe notification detail from one closed code. */
function cronScriptFailureMetadata(source, code) {
	return {
		errorClassification: classifyCronScriptFailure(code),
		failureNotificationDetail: {
			kind: "script-failure",
			source,
			code
		}
	};
}
//#endregion
//#region src/cron/service/timer-execution.ts
/** Executes a cron job without mutating persisted job state. */
async function executeJobCore(state, job, abortSignal, options) {
	const resolveAbortError = () => ({
		status: "error",
		error: abortErrorMessage(abortSignal)
	});
	if (abortSignal?.aborted) return resolveAbortError();
	const execTargetRecoveryError = resolveCronToolsAllowExecTargetRecoveryError({
		jobId: job.id,
		requirement: job.toolsAllowExecTargetRequirement,
		execTarget: job.toolsAllowExecTarget
	});
	if (execTargetRecoveryError) return {
		status: "error",
		error: execTargetRecoveryError,
		diagnostics: createCronRunDiagnosticsFromError("cron-preflight", execTargetRecoveryError, { nowMs: state.deps.nowMs })
	};
	if (options?.streamScheduleKey !== void 0 || options?.streamSourceIdentity !== void 0) {
		const currentKey = job.schedule.kind === "stream" ? cronStreamScheduleKey(job.schedule) : void 0;
		if (options.streamScheduleKey === void 0 || options.streamSourceIdentity === void 0 || currentKey !== options.streamScheduleKey || job.state.streamSourceIdentity !== options.streamSourceIdentity) return {
			status: "skipped",
			error: "stream batch source no longer current"
		};
	}
	let effectiveJob = job;
	let triggerEval;
	if (job.trigger) {
		const evaluator = state.deps.evaluateCronTrigger;
		if (!evaluator) return {
			status: "error",
			error: "cron trigger evaluator is unavailable",
			...cronScriptFailureMetadata("trigger", "runtime_unavailable")
		};
		const evaluation = await evaluator({
			job,
			script: job.trigger.script,
			state: job.state.triggerState,
			streamBatch: options?.streamBatch,
			abortSignal,
			executionIdentity: options?.executionIdentity
		});
		if (abortSignal?.aborted) return resolveAbortError();
		if (evaluation.kind === "busy") {
			state.deps.log.debug({ jobId: job.id }, "cron: trigger evaluation skipped while busy");
			return {
				status: "ok",
				triggerEval: {
					fired: false,
					stateChanged: false,
					busy: true
				}
			};
		}
		if (evaluation.kind === "error") return {
			status: "error",
			error: `cron trigger evaluation failed (${evaluation.code}): ${evaluation.error}`,
			...cronScriptFailureMetadata("trigger", evaluation.code),
			triggerEval: {
				fired: false,
				stateChanged: false
			}
		};
		const stateChanged = Object.hasOwn(evaluation, "state");
		triggerEval = {
			fired: evaluation.fire,
			stateChanged,
			...stateChanged ? { state: evaluation.state } : {}
		};
		if (!evaluation.fire) return {
			status: "ok",
			triggerEval
		};
		if (evaluation.message !== void 0) effectiveJob = {
			...job,
			payload: appendCronPayloadText(job.payload, evaluation.message)
		};
	}
	options?.assertRunCurrent?.();
	options?.onPayloadExecutionStarted?.();
	if (effectiveJob.payload.kind === "script") {
		const result = await executeScriptCronJob(state, effectiveJob, abortSignal, options);
		return triggerEval ? {
			...result,
			triggerEval
		} : result;
	}
	if (options?.streamBatch !== void 0) effectiveJob = {
		...effectiveJob,
		payload: appendCronPayloadText(effectiveJob.payload, options.streamBatch)
	};
	const heartbeatTask = isHeartbeatTaskCronJob(effectiveJob) ? effectiveJob : void 0;
	if (effectiveJob.payload.kind === "heartbeat" || heartbeatTask) {
		const agentId = resolveCronJobEffectiveAgentId(effectiveJob, state.deps.resolveDefaultAgentId?.() ?? state.deps.defaultAgentId);
		const heartbeatWake = heartbeatTask ? {
			source: "interval",
			intent: "task",
			reason: `heartbeat-task:${heartbeatTask.id}`,
			agentId,
			tasks: [{
				jobId: heartbeatTask.id,
				name: heartbeatTask.name,
				prompt: heartbeatTask.payload.text
			}]
		} : {
			source: "interval",
			intent: "scheduled",
			reason: "interval",
			agentId,
			scheduledEveryMs: effectiveJob.schedule.kind === "every" ? effectiveJob.schedule.everyMs : void 0
		};
		const heartbeatWaitLifecycle = options?.onHeartbeatExecutionStarted?.(heartbeatWake);
		const releaseHeartbeatWait = markCronJobWaitingForHeartbeat(options?.activeJobMarker, options?.owningCronLaneTaskMarker);
		let heartbeatResult;
		try {
			heartbeatResult = await (state.deps.requestHeartbeatAndWait?.(heartbeatWake, {
				...abortSignal ? { abortSignal } : {},
				...heartbeatWaitLifecycle
			}) ?? {
				status: "failed",
				reason: "heartbeat wake settlement unavailable"
			});
		} finally {
			releaseHeartbeatWait();
		}
		if (abortSignal?.aborted) return resolveAbortError();
		const result = heartbeatResult.status === "ran" ? {
			status: "ok",
			summary: heartbeatTask ? "heartbeat task completed" : "heartbeat completed"
		} : heartbeatResult.status === "failed" ? {
			status: "error",
			error: `heartbeat failed: ${heartbeatResult.reason}`
		} : {
			status: "skipped",
			error: `heartbeat skipped: ${heartbeatResult.reason}`
		};
		return triggerEval ? {
			...result,
			triggerEval
		} : result;
	}
	if (effectiveJob.sessionTarget === "main") {
		const result = await executeMainSessionCronJob(state, effectiveJob, abortSignal, options?.onHeartbeatExecutionStarted, options?.activeJobMarker, options?.owningCronLaneTaskMarker);
		return triggerEval ? {
			...result,
			triggerEval
		} : result;
	}
	const result = await executeDetachedCronJob(state, effectiveJob, abortSignal, options);
	return triggerEval ? {
		...result,
		triggerEval
	} : result;
}
async function executeMainSessionCronJob(state, job, abortSignal, onHeartbeatExecutionStarted, activeJobMarker, owningCronLaneTaskMarker) {
	const text = job.payload.kind === "systemEvent" && typeof job.payload.text === "string" ? job.payload.text.trim() : void 0;
	if (!text) return {
		status: "skipped",
		error: job.payload.kind === "systemEvent" ? "main job requires non-empty systemEvent text" : "main job requires payload.kind=\"systemEvent\""
	};
	const agentId = resolveCronJobEffectiveAgentId(job, state.deps.resolveDefaultAgentId?.() ?? state.deps.defaultAgentId);
	const deliveryContext = resolveMainSessionCronDeliveryContext(state, job);
	const queuedSystemEvent = normalizeQueuedSystemEventHandle(state.deps.enqueueSystemEvent(text, {
		agentId,
		contextKey: `cron:${job.id}`,
		...deliveryContext ? { deliveryContext } : {}
	}));
	const heartbeatWake = {
		source: "cron",
		intent: job.wakeMode === "now" ? "immediate" : "event",
		reason: `cron:${job.id}`,
		agentId,
		heartbeat: { target: "last" }
	};
	const removeQueuedSystemEvent = () => removeQueuedSystemEventHandle(state, job, queuedSystemEvent);
	if (job.wakeMode === "now" && state.deps.requestHeartbeatAndWait) {
		const heartbeatWaitLifecycle = onHeartbeatExecutionStarted?.(heartbeatWake);
		const waitStartedAt = state.deps.nowMs();
		const releaseHeartbeatWait = markCronJobWaitingForHeartbeat(activeJobMarker, owningCronLaneTaskMarker);
		let handedOff = false;
		let heartbeatResult;
		try {
			heartbeatResult = await state.deps.requestHeartbeatAndWait(heartbeatWake, {
				abortSignal,
				...heartbeatWaitLifecycle,
				stopWaitingOnRetry: (result, retryAtMs) => {
					const remainingMs = 12e4 - (state.deps.nowMs() - waitStartedAt);
					handedOff = result.reason === "cron-in-progress" || remainingMs <= 0 || retryAtMs - Date.now() > remainingMs;
					return handedOff;
				}
			});
		} catch (error) {
			removeQueuedSystemEvent();
			throw error;
		} finally {
			releaseHeartbeatWait();
		}
		if (abortSignal?.aborted) {
			removeQueuedSystemEvent();
			return {
				status: "error",
				error: timeoutErrorMessage()
			};
		}
		if (handedOff || heartbeatResult.status === "ran") return {
			status: "ok",
			summary: text
		};
		removeQueuedSystemEvent();
		return {
			status: heartbeatResult.status === "skipped" ? "skipped" : "error",
			error: heartbeatResult.reason,
			summary: text
		};
	}
	if (abortSignal?.aborted) {
		removeQueuedSystemEvent();
		return {
			status: "error",
			error: timeoutErrorMessage()
		};
	}
	state.deps.requestHeartbeat(heartbeatWake);
	return {
		status: "ok",
		summary: text
	};
}
async function executeDetachedCronJob(state, job, abortSignal, options) {
	const interrupted = () => {
		const error = abortErrorMessage(abortSignal);
		return {
			status: "error",
			error,
			diagnostics: createCronRunDiagnosticsFromError("cron-setup", error, { nowMs: state.deps.nowMs })
		};
	};
	if (job.payload.kind === "command") {
		if (!state.deps.runCommandJob) {
			const error = "cron command runner is not configured";
			return {
				status: "skipped",
				error,
				diagnostics: createCronRunDiagnosticsFromError("cron-preflight", error, {
					severity: "warn",
					nowMs: state.deps.nowMs
				})
			};
		}
		const res = await state.deps.runCommandJob({
			job,
			abortSignal
		});
		if (abortSignal?.aborted && !(abortSignal.reason instanceof Error && abortSignal.reason.name === "TimeoutError" && res.failureNotificationDetail?.kind === "command-timeout" && res.failureNotificationDetail.mode === "wall-clock")) return interrupted();
		return {
			status: res.status,
			error: res.error,
			errorClassification: res.errorClassification,
			deliveryError: res.deliveryError,
			deliverySuppressionReason: res.deliverySuppressionReason,
			deliveryState: res.deliveryState,
			summary: res.summary,
			delivered: res.delivered,
			deliveryAttempted: res.deliveryAttempted,
			delivery: res.delivery,
			diagnostics: res.diagnostics,
			failureNotificationDetail: res.failureNotificationDetail
		};
	}
	if (job.payload.kind !== "agentTurn") {
		const error = "isolated job requires payload.kind=\"agentTurn\" or \"command\"";
		return {
			status: "skipped",
			error,
			diagnostics: createCronRunDiagnosticsFromError("cron-preflight", error, {
				severity: "warn",
				nowMs: state.deps.nowMs
			})
		};
	}
	if (abortSignal?.aborted) return interrupted();
	const res = await state.deps.runIsolatedAgentJob({
		job,
		admissionSource: job.owner?.sessionKey || job.owner?.accountId || job.scheduledToolPolicy?.mode === "account" || job.payload.externalContentSource || job.toolsAllowProvenance?.channelRequester || job.toolsAllowProvenance && job.toolsAllowProvenance.callerOrigin?.kind !== "local" ? "requester-schedule" : "operator-schedule",
		message: job.payload.message,
		abortSignal,
		onExecutionStarted: options?.onExecutionStarted,
		onExecutionPhase: options?.onExecutionPhase,
		onLaneWait: options?.onLaneWait,
		executionIdentity: options?.executionIdentity
	});
	if (abortSignal?.aborted) return interrupted();
	return {
		status: res.status,
		error: res.error,
		errorClassification: res.errorClassification,
		executionStarted: res.executionStarted,
		deliveryError: res.deliveryError,
		deliverySuppressionReason: res.deliverySuppressionReason,
		deliveryState: res.deliveryState,
		nextCheck: res.nextCheck,
		summary: res.summary,
		delivered: res.delivered,
		deliveryAttempted: res.deliveryAttempted,
		delivery: res.delivery,
		sessionId: res.sessionId,
		sessionKey: res.sessionKey,
		diagnostics: res.diagnostics,
		failureNotificationDetail: res.failureNotificationDetail,
		model: res.model,
		provider: res.provider,
		usage: res.usage
	};
}
async function executeScriptCronJob(state, job, abortSignal, options) {
	if (state.deps.cronConfig?.triggers?.enabled === false) return {
		status: "error",
		error: "cron script payload execution is disabled because the operator set cron.triggers.enabled: false; remove it or set it to true to allow unattended scripts"
	};
	if (!state.deps.runScriptJob) return {
		status: "error",
		error: "cron script payload executor is unavailable",
		...cronScriptFailureMetadata("payload", "runtime_unavailable")
	};
	const result = await state.deps.runScriptJob({
		job,
		streamBatch: options?.streamBatch,
		abortSignal,
		executionIdentity: options?.executionIdentity
	});
	if (!isCronActiveJobMarkerCurrent(options?.activeJobMarker)) return {
		status: "error",
		error: "Gateway restarting."
	};
	if (abortSignal?.aborted) return {
		status: "error",
		error: abortErrorMessage(abortSignal)
	};
	options?.assertRunCurrent?.();
	if (result.status !== "ok") return result;
	if (result.nextCheck && !job.pacing) return {
		status: "error",
		error: "cron script payload returned nextCheck, but this job has no pacing bounds",
		...cronScriptFailureMetadata("payload", "invalid_input")
	};
	const notify = result.notify?.trim() ? result.notify : void 0;
	if (job.sessionTarget === "main" && notify || result.wake) {
		const agentId = resolveCronJobEffectiveAgentId(job, state.deps.resolveDefaultAgentId?.() ?? state.deps.defaultAgentId);
		const deliveryContext = job.sessionTarget === "main" ? resolveMainSessionCronDeliveryContext(state, job) : void 0;
		const eventOptions = {
			agentId,
			...deliveryContext ? { deliveryContext } : {}
		};
		if (job.sessionTarget === "main" && notify) state.deps.enqueueSystemEvent(notify, {
			...eventOptions,
			contextKey: `cron:${job.id}:script`
		});
		if (result.wake) {
			if (job.sessionTarget !== "main" || !notify) state.deps.enqueueSystemEvent(notify ?? `script job ${job.name} completed`, {
				...eventOptions,
				contextKey: `cron:${job.id}:script-wake`
			});
			state.deps.requestHeartbeat({
				source: result.wake === "now" ? "notifications-event" : "cron",
				intent: result.wake === "now" ? "immediate" : "event",
				reason: result.wake === "now" ? "wake" : `cron:${job.id}:script`,
				agentId
			});
		}
	}
	return {
		status: "ok",
		...notify ? { summary: notify } : {},
		delivered: result.delivered,
		deliveryAttempted: result.deliveryAttempted,
		deliveryError: result.deliveryError,
		deliverySuppressionReason: result.deliverySuppressionReason,
		deliveryState: result.deliveryState,
		delivery: result.delivery,
		nextCheck: result.nextCheck,
		scriptStateChanged: result.stateChanged === true,
		...result.stateChanged === true ? { scriptState: result.state } : {}
	};
}
//#endregion
//#region src/cron/service/timer-job-runner.interruption.ts
function withPrimaryWebhookTrace(params) {
	const delivered = params.outcome.status === "unknown" ? void 0 : params.outcome.status === "delivered";
	const error = params.outcome.status === "delivered" ? void 0 : params.outcome.error && params.error && params.outcome.error !== params.error ? `${params.outcome.error}; ${params.error}` : params.error ?? params.outcome.error;
	const plan = resolveCronDeliveryPlan(params.job);
	const intended = params.result.delivery?.intended ?? {
		to: plan.to,
		source: "explicit"
	};
	return {
		...params.result,
		deliveryState: {
			status: params.outcome.status,
			delivered,
			error,
			deliverySuppressionReason: params.deliverySuppressionReason,
			failureNotification: { status: "not-requested" }
		},
		delivered,
		deliverySuppressionReason: params.deliverySuppressionReason,
		deliveryAttempted: params.deliverySuppressionReason === void 0,
		deliveryError: error || void 0,
		delivery: {
			...params.result.delivery,
			intended,
			delivered,
			resolved: delivered === void 0 ? void 0 : {
				to: plan.to,
				source: "explicit",
				ok: delivered,
				...error ? { error } : {}
			}
		}
	};
}
function withPrimaryWebhookInterruption(params) {
	return resolveCronDeliveryPlan(params.job).mode === "webhook" && params.result.triggerEval?.fired !== false ? withPrimaryWebhookTrace({
		...params,
		outcome: params.outcome ?? { status: "not-delivered" }
	}) : params.result;
}
function resolveInterruptedRunProgress(params) {
	if (params.progress.settledDeliveryResult) return params.progress.settledDeliveryResult;
	if (params.progress.completedCoreResult) return withPrimaryWebhookInterruption({
		job: params.job,
		result: params.progress.completedCoreResult,
		outcome: params.progress.webhookDelivery,
		error: params.error
	});
}
//#endregion
//#region src/cron/service/timer-job-runner.ts
async function deliverPrimaryWebhook(state, job, result, abortSignal, progress, assertRunCurrent) {
	const settle = (settledResult) => {
		progress.settledDeliveryResult ??= settledResult;
		return progress.settledDeliveryResult;
	};
	if (resolveCronDeliveryPlan(job).mode !== "webhook" || result.triggerEval?.fired === false) return result;
	const undelivered = (error, deliverySuppressionReason) => withPrimaryWebhookTrace({
		job,
		result,
		outcome: {
			status: "not-delivered",
			error
		},
		deliverySuppressionReason
	});
	if (result.status !== "error" && !(typeof result.summary === "string" && result.summary.trim())) return settle(undelivered(void 0, "empty"));
	if (!state.deps.sendCronWebhook) return undelivered("cron webhook delivery is unavailable");
	const interruptionError = () => {
		const reason = abortErrorMessage(abortSignal);
		return abortSignal.reason instanceof Error && abortSignal.reason.name === "TimeoutError" ? `cron webhook delivery timed out: ${reason}` : `cron webhook delivery cancelled: ${reason}`;
	};
	if (abortSignal.aborted) return undelivered(interruptionError());
	assertRunCurrent?.();
	const startedAt = job.state.runningAtMs;
	const deliveredResult = withPrimaryWebhookTrace({
		job,
		result,
		outcome: { status: "delivered" }
	});
	try {
		const outcome = await state.deps.sendCronWebhook({
			job,
			abortSignal,
			onDeliveryState: (delivery) => {
				progress.webhookDelivery = delivery;
			},
			event: {
				jobId: job.id,
				action: "finished",
				job,
				...typeof startedAt === "number" ? { runAtMs: startedAt } : {},
				...typeof startedAt === "number" ? { durationMs: Math.max(0, state.deps.nowMs() - startedAt) } : {},
				status: result.status,
				error: result.error,
				summary: result.summary,
				diagnostics: result.diagnostics,
				delivered: true,
				deliveryStatus: "delivered",
				delivery: deliveredResult.delivery,
				sessionId: result.sessionId,
				sessionKey: result.sessionKey,
				model: result.model,
				provider: result.provider,
				usage: result.usage
			}
		});
		if (outcome.error) state.deps.log.warn({
			jobId: job.id,
			err: outcome.error
		}, "cron: webhook delivery failed");
		if (progress.settledDeliveryResult) return progress.settledDeliveryResult;
		if (abortSignal.aborted) return withPrimaryWebhookInterruption({
			job,
			result,
			outcome,
			error: interruptionError()
		});
		return settle(withPrimaryWebhookTrace({
			job,
			result,
			outcome
		}));
	} catch (error) {
		if (progress.settledDeliveryResult) return progress.settledDeliveryResult;
		const deliveryError = abortSignal.aborted ? interruptionError() : formatErrorMessage(error);
		state.deps.log.warn({
			jobId: job.id,
			err: deliveryError
		}, "cron: webhook delivery failed");
		return settle(withPrimaryWebhookTrace({
			job,
			result,
			outcome: progress.webhookDelivery ?? { status: "unknown" },
			error: deliveryError
		}));
	}
}
/** Executes cron job core logic with the configured wall-clock timeout and watchdog cleanup. */
async function executeJobCoreWithTimeoutUnfinalized(state, job, opts) {
	const runAbortController = new AbortController();
	const progress = {};
	let commandSettlement;
	const assertRunCurrent = opts?.runReceipt ? () => assertServiceCronRunReceiptCurrent(state, opts.runReceipt, opts.activeJobMarker) : void 0;
	const operatorCancellationMarker = Symbol("cron-operator-cancelled");
	const operatorCancellation = createDeferredCore();
	const createInterruptionOutcome = async (interruption, execution, watchdog) => {
		const error = interruption === "cancelled" ? abortErrorMessage(runAbortController.signal) : interruption.reason;
		const deliveryError = `cron webhook delivery ${interruption === "cancelled" ? "cancelled" : "timed out"}: ${error}`;
		const settled = resolveInterruptedRunProgress({
			progress,
			job,
			error: deliveryError
		});
		if (settled) return settled;
		if (interruption !== "cancelled") {
			await settleTimedOutCronRun(state, job, interruption.timeoutMs, execution, commandSettlement);
			if (commandSettlement) {
				const settledAfterCleanup = resolveInterruptedRunProgress({
					progress,
					job,
					error: deliveryError
				});
				if (settledAfterCleanup) return settledAfterCleanup;
			}
		}
		const isolatedAgentSetupTimeout = interruption !== "cancelled" && job.sessionTarget === "isolated" && isSetupTimeoutErrorText(error) && !watchdog?.observedLaneWait() ? {
			error,
			timeoutMs: CRON_AGENT_SETUP_WATCHDOG_MS,
			otherCronJobsActiveAtTimeout: false
		} : void 0;
		return withPrimaryWebhookInterruption({
			job,
			result: {
				status: "error",
				error,
				...execution && {
					provider: execution.provider,
					model: execution.model,
					sessionId: execution.sessionId,
					sessionKey: execution.sessionKey
				},
				...isolatedAgentSetupTimeout ? { isolatedAgentSetupTimeout } : {},
				diagnostics: createCronRunDiagnosticsFromError("cron-setup", error, { nowMs: state.deps.nowMs })
			},
			error: deliveryError
		});
	};
	const reservation = opts?.runReceipt ? state.queuedRunReservationsByJobId.get(job.id) : void 0;
	if (!isCronActiveJobMarkerCurrent(opts?.activeJobMarker) || opts?.runReceipt && (reservation?.runReceipt.receiptId !== opts.runReceipt.receiptId || reservation.lifecycleGeneration !== state.lifecycleGeneration)) {
		runAbortController.abort("Gateway restarting.");
		return await createInterruptionOutcome("cancelled");
	}
	const detachedPayload = runsDetachedFromMainSession(job);
	const releaseCronTaskRun = detachedPayload || job.trigger ? registerActiveCronTaskRun({
		runId: opts?.runId ?? `cron-active:${job.id}`,
		controller: runAbortController,
		activeJobMarker: opts?.activeJobMarker,
		onCancel: () => operatorCancellation.resolve(operatorCancellationMarker)
	}) : void 0;
	const jobTimeoutMs = resolveCronJobTimeoutMs(job);
	try {
		const timeout = createDeferredCore();
		const deferTimeoutUntilExecutionStart = job.sessionTarget !== "main" && job.payload.kind === "agentTurn";
		const watchdog = jobTimeoutMs === void 0 ? void 0 : createCronAgentWatchdog({
			deferUntilRunner: deferTimeoutUntilExecutionStart,
			jobTimeoutMs,
			triggerTimeout: (reason) => {
				if (!runAbortController.signal.aborted) {
					const timeoutError = new Error(reason);
					timeoutError.name = "TimeoutError";
					runAbortController.abort(timeoutError);
				}
				timeout.resolve({
					timeoutMs: jobTimeoutMs,
					reason
				});
			}
		});
		let untimedExecution;
		const accumulateExecution = (info) => {
			if (info) untimedExecution = {
				...untimedExecution,
				...info
			};
		};
		const noteLaneState = (info) => {
			if (info?.waiting === false) {
				watchdog?.noteLaneAdmitted();
				return;
			}
			watchdog?.noteLaneWait();
		};
		const noteRunnerStarted = (info) => {
			if (watchdog) watchdog.noteRunnerStarted(info);
			else accumulateExecution(info);
		};
		const trackExecution = !watchdog || deferTimeoutUntilExecutionStart;
		const resolveHeartbeatTimeoutMs = state.deps.resolveHeartbeatTimeoutMs;
		const executionIdentity = opts?.executionIdentity;
		const coreOptions = {
			activeJobMarker: opts?.activeJobMarker,
			owningCronLaneTaskMarker: opts?.owningCronLaneTaskMarker,
			streamBatch: opts?.streamBatch,
			streamScheduleKey: opts?.streamScheduleKey,
			streamSourceIdentity: opts?.streamSourceIdentity,
			onPayloadExecutionStarted: detachedPayload ? void 0 : releaseCronTaskRun,
			onExecutionStarted: trackExecution ? noteRunnerStarted : void 0,
			onExecutionPhase: trackExecution ? watchdog?.notePhase ?? accumulateExecution : void 0,
			onLaneWait: watchdog && deferTimeoutUntilExecutionStart ? noteLaneState : void 0,
			onHeartbeatExecutionStarted: watchdog && resolveHeartbeatTimeoutMs ? (heartbeat) => {
				const heartbeatTimeoutMs = resolveHeartbeatTimeoutMs(heartbeat);
				return {
					onAttemptStarted: () => watchdog.replaceTimeout(heartbeatTimeoutMs),
					onQueued: () => watchdog.replaceTimeout(void 0)
				};
			} : void 0,
			assertRunCurrent,
			executionIdentity: executionIdentity && {
				...executionIdentity,
				onPostAdmission: (context) => {
					bindCronJobAdmittedRun(opts?.activeJobMarker, context, runAbortController.signal);
					return executionIdentity.onPostAdmission?.(context);
				}
			}
		};
		watchdog?.start();
		const corePromise = executeJobCore(state, job, runAbortController.signal, coreOptions);
		commandSettlement = job.payload.kind === "command" ? corePromise : void 0;
		const runPromise = corePromise.then(async (result) => {
			progress.completedCoreResult = result;
			return await deliverPrimaryWebhook(state, job, result, runAbortController.signal, progress, assertRunCurrent);
		});
		if (opts?.runReceipt) trackServiceCronRunReceiptSettlement({
			state,
			handle: opts.runReceipt,
			settlement: runPromise
		});
		trackActiveCronTaskRunSettlement(runPromise, runAbortController.signal, opts?.runReceipt?.agentId ?? opts?.activeJobMarker?.agentId);
		runPromise.catch((err) => {
			if (runAbortController.signal.aborted) state.deps.log.warn({
				jobId: job.id,
				err: String(err)
			}, `cron: job core rejected after abort: ${abortErrorMessage(runAbortController.signal)}`);
		});
		try {
			const first = await Promise.race([
				runPromise,
				timeout.promise,
				operatorCancellation.promise
			]);
			if (first === operatorCancellationMarker) return await createInterruptionOutcome("cancelled", watchdog?.activeExecution() ?? untimedExecution);
			return "status" in first ? first : await createInterruptionOutcome(first, watchdog?.activeExecution(), watchdog);
		} finally {
			watchdog?.dispose();
		}
	} finally {
		releaseCronTaskRun?.();
	}
}
function authorCronRunCompletion(_state, job, result) {
	const deliveryState = result.deliveryState ?? resolveDeliveryState({
		job,
		runStatus: result.status,
		delivery: result.delivery,
		delivered: result.delivered,
		deliveryAttempted: result.deliveryAttempted,
		error: result.deliveryError ?? result.error,
		deliverySuppressionReason: result.deliverySuppressionReason
	});
	return {
		...result,
		deliveryState,
		completionStatus: resolveAdmittedCronCompletionStatus(job, result.status, deliveryState.status, deliveryState.deliverySuppressionReason)
	};
}
/** Authors completion after execution and primary delivery have both settled. */
async function executeJobCoreWithTimeout(state, job, opts) {
	return authorCronRunCompletion(state, job, await executeJobCoreWithTimeoutUnfinalized(state, job, opts));
}
//#endregion
//#region src/cron/service/timer-runnable.ts
/**
* Reports whether a cron job's last completed occurrence is older than its previous
* effective slot, which is how restart catch-up detects a missed run once
* nextRunAtMs has already advanced past it.
*/
function hasMissedCronSlotSinceLastRun(job, nowMs) {
	const lastTriggerEvalAtMs = job.trigger ? job.state.lastTriggerEvalAtMs : void 0;
	const lastRunAtMs = lastTriggerEvalAtMs === void 0 ? job.state.lastRunAtMs : Math.max(job.state.lastRunAtMs ?? lastTriggerEvalAtMs, lastTriggerEvalAtMs);
	const nextRunAtMs = job.state.nextRunAtMs;
	if (typeof lastRunAtMs !== "number" || !Number.isFinite(lastRunAtMs) || hasPendingCronTriggerInterval(job, nowMs) || hasScheduledNextRunAtMs(nextRunAtMs) && job.state.pacedNextRunAtMs === nextRunAtMs && nowMs < nextRunAtMs) return false;
	let previousRunAtMs;
	try {
		previousRunAtMs = computeJobPreviousRunAtOrBeforeMs(job, nowMs);
	} catch {
		return false;
	}
	if (typeof previousRunAtMs !== "number" || !Number.isFinite(previousRunAtMs) || previousRunAtMs <= lastRunAtMs) return false;
	const activatedAtMs = job.state.scheduleActivatedAtMs;
	if (typeof activatedAtMs !== "number" || !Number.isFinite(activatedAtMs)) return true;
	return previousRunAtMs > activatedAtMs;
}
function isRunnableJob(params) {
	const { job, nowMs } = params;
	if (!job.state) job.state = {};
	if (!isJobEnabled(job) || !isTimeScheduledJob(job)) return false;
	if (hasActiveCronRun(job)) return false;
	const next = job.state.nextRunAtMs;
	if (hasScheduledNextRunAtMs(next) && nowMs < next && (!params.allowCronMissedRunByLastRun || job.state.startupCatchupAtMs === next)) return false;
	const lastRunStatus = resolveJobLastRunStatus(job);
	if (params.skipAtIfAlreadyRan && job.schedule.kind === "at" && lastRunStatus) {
		if (hasScheduledNextRunAtMs(next) && job.state.startupCatchupAtMs === next) return nowMs >= next;
		const lastRun = job.state.lastRunAtMs;
		const nextRun = job.state.nextRunAtMs;
		if (typeof lastRun === "number" && typeof nextRun === "number" && nextRun > lastRun && parseAbsoluteTimeMs(job.schedule.at) === nextRun) return nowMs >= nextRun;
		if (isScheduledTerminalOneShotRetry(job, lastRunStatus, lastRun, nextRun)) return typeof nextRun === "number" && nowMs >= nextRun;
		return false;
	}
	if (isErrorBackoffPending(job, nowMs, lastRunStatus)) return false;
	if (hasScheduledNextRunAtMs(next) && nowMs >= next) {
		const lastRunAtMs = job.state.lastRunAtMs;
		if (!(params.allowCronMissedRunByLastRun && job.schedule.kind === "cron" && (lastRunStatus === "ok" || lastRunStatus === "skipped") && typeof lastRunAtMs === "number" && Number.isFinite(lastRunAtMs) && lastRunAtMs >= next)) return true;
		let latestRunAtMs;
		try {
			latestRunAtMs = computeJobPreviousRunAtOrBeforeMs(job, nowMs);
		} catch {
			return false;
		}
		return typeof latestRunAtMs === "number" && latestRunAtMs > lastRunAtMs;
	}
	if (!params.allowCronMissedRunByLastRun || job.schedule.kind !== "cron") return false;
	return hasMissedCronSlotSinceLastRun(job, nowMs);
}
function isErrorBackoffPending(job, nowMs, lastRunStatus) {
	if (job.schedule.kind === "at" || lastRunStatus !== "error") return false;
	const backoffUntilMs = resolveJobErrorBackoffUntilMs(job, DEFAULT_ERROR_BACKOFF_SCHEDULE_MS);
	return backoffUntilMs !== void 0 && nowMs < backoffUntilMs;
}
function collectRunnableJobs(state, nowMs) {
	return state.store?.jobs.filter((job) => isRunnableJob({
		job,
		nowMs
	})) ?? [];
}
//#endregion
//#region src/cron/service/run-admission.ts
function matchesOnExitSchedule(job, schedule) {
	return job.schedule.kind === "on-exit" && job.schedule.command === schedule.command && job.schedule.cwd === schedule.cwd;
}
/** Track a persisted marker through shared admission and payload execution. */
function reserveQueuedCronRun(state, jobId, reservationAt, opts) {
	const identity = {};
	state.queuedRunReservationsByJobId.set(jobId, {
		identity,
		lifecycleGeneration: opts.lifecycleGeneration ?? state.lifecycleGeneration,
		markerAtMs: reservationAt,
		runReceipt: opts.runReceipt,
		preserveWhenDisabled: opts?.preserveWhenDisabled === true,
		...opts.onExit ? { onExit: true } : {}
	});
	return identity;
}
function releaseQueuedCronRun(state, jobId, identity) {
	if (state.queuedRunReservationsByJobId.get(jobId)?.identity !== identity) return false;
	state.queuedRunReservationsByJobId.delete(jobId);
	return true;
}
function isQueuedCronRunReservationCurrent(state, jobId, identity) {
	const reservation = state.queuedRunReservationsByJobId.get(jobId);
	return reservation?.identity === identity && reservation.lifecycleGeneration === state.lifecycleGeneration;
}
/** Clears exact reservations through the worker, retrying only a known non-commit. */
async function cleanupQueuedCronRunReservations(params) {
	const { state, reservations } = params;
	let retrySafe = false;
	const attempt = () => locked(state, async () => {
		retrySafe = false;
		await releaseReservedCronRuns({
			...params,
			recompute: params.recompute !== void 0,
			onSettled: (outcome) => {
				retrySafe = outcome === "not-committed";
			}
		});
	});
	try {
		await attempt();
	} catch (error) {
		try {
			if (!retrySafe) throw error;
			await attempt();
		} catch (failure) {
			releaseReservationOwnership(state, reservations);
			throw failure;
		}
	}
}
/** Supersedes one activated run and releases only its exact durable marker.
* Receipt terminalization shares the marker transaction, so no successor can
* enter between dropping the fence and repairing scheduling state. */
async function supersedeActivatedCronRun(params) {
	try {
		await cleanupQueuedCronRunReservations({
			state: params.state,
			reservations: [params],
			recompute: "maintenance",
			terminal: {
				handle: params.runReceipt,
				status: "superseded",
				finishedAtMs: params.state.deps.nowMs(),
				error: params.reason
			}
		});
	} finally {
		releaseLocalCronRunReceiptOwnership(params.runReceipt);
	}
}
/** Persists queued markers only while no gateway owns an active run receipt.
* Each retry re-reads and updates only pending rows, so excluded foreign jobs
* can advance without a stale full-store snapshot overwriting their state.
*/
async function persistQueuedCronRunReservations(params) {
	const generation = params.state.lifecycleGeneration;
	if (params.state.stopped) return [];
	const candidates = await skipCronJobsWithoutOwners(params.state, [...params.candidates], params.reservedAtMs, {
		...params.scheduleMode ? { scheduleMode: params.scheduleMode } : {},
		...params.manualRun ? { manualRun: params.manualRun } : {}
	});
	if (params.state.stopped || params.state.lifecycleGeneration !== generation) return [];
	const pendingJobs = new Map(candidates.map((job) => [job.id, structuredClone(job)]));
	if (pendingJobs.size === 0) {
		await ensureLoaded(params.state, { forceReload: true });
		return [];
	}
	const context = captureOpenClawStateWorkerContext();
	const storeKey = cronStoreKey(params.state.deps.storePath);
	const retired = () => params.state.stopped || params.state.lifecycleGeneration !== generation;
	const retiredError = /* @__PURE__ */ new Error("Cron service stopped before run reservation");
	const assertCurrent = () => {
		context.admission.assertCurrent();
		if (cronStoreKey(params.state.deps.storePath) !== storeKey) throw new Error("Cron reservation store changed before commit");
		if (retired()) throw retiredError;
		(params.manualRun?.commitGuard ?? params.manualRun?.onExit?.commitGuard)?.();
		if (retired()) throw retiredError;
	};
	const cleanupUnhandedReservations = async (committed) => {
		const reservations = committed.map(({ job, runReceipt }) => {
			const existing = params.state.queuedRunReservationsByJobId.get(job.id);
			return {
				jobId: job.id,
				reservationIdentity: existing?.runReceipt.receiptId === runReceipt.receiptId ? existing.identity : reserveQueuedCronRun(params.state, job.id, params.reservedAtMs, {
					runReceipt,
					lifecycleGeneration: generation
				})
			};
		});
		if (reservations.length === 0) return;
		try {
			await releaseReservedCronRuns({
				state: params.state,
				context,
				reservations,
				recompute: true,
				onSettled() {}
			});
		} finally {
			releaseReservationOwnership(params.state, reservations);
		}
	};
	const markCommitted = params.manualRun ? captureCronMutationCommit("cron.run") : void 0;
	while (pendingJobs.size > 0) {
		let reservationCommitted = false;
		let committedReservations = [];
		try {
			const conflict = await reserveCronRuns({
				state: params.state,
				context,
				candidates: pendingJobs,
				immediateJobIds: params.immediateJobIds,
				reservedAtMs: params.reservedAtMs,
				requestRunId: params.manualRun?.runId,
				preserveSchedule: params.scheduleMode === "preserve",
				scheduleOwnershipAtMs: params.manualRun?.scheduleOwnershipAtMs ?? params.reservedAtMs,
				onExit: params.manualRun?.onExit !== void 0,
				assertCurrent,
				onCommitted(outcome) {
					reservationCommitted = true;
					committedReservations = outcome.reservations;
					if (committedReservations.length > 0) markCommitted?.();
					for (const receipt of outcome.replacedReceipts) releaseLocalCronRunReceiptOwnership(receipt);
					const first = committedReservations[0];
					if (params.manualRun?.onExit && first) params.manualRun.onExit.onReserved(first.job, first.runReceipt);
				}
			});
			if (conflict) {
				enrollForeignReceipt(params.state, conflict);
				pendingJobs.delete(conflict.jobId);
				continue;
			}
			const firstReservation = committedReservations[0];
			if (params.manualRun?.onExit && firstReservation) {
				const { job } = firstReservation;
				applyCronRuntimeRowsToState(params.state, [job]);
				emit(params.state, {
					jobId: job.id,
					action: "updated",
					job,
					nextRunAtMs: job.state.nextRunAtMs
				});
				return committedReservations;
			}
			const committedJobs = committedReservations.map(({ job }) => job);
			if (retired()) {
				applyCronRuntimeRowsToState(params.state, committedJobs);
				return committedReservations;
			}
			await ensureLoaded(params.state, { forceReload: true }).catch(() => applyCronRuntimeRowsToState(params.state, committedJobs));
			const receiptByJobId = new Map(committedReservations.map(({ job, runReceipt }) => [job.id, runReceipt]));
			const reloadedReservations = (params.state.store?.jobs ?? []).filter((job) => receiptByJobId.has(job.id)).map((job) => ({
				job,
				runReceipt: receiptByJobId.get(job.id)
			}));
			const reloadedJobIds = new Set(reloadedReservations.map(({ job }) => job.id));
			for (const reservation of committedReservations) {
				if (reloadedJobIds.has(reservation.job.id)) continue;
				await finishCronRunReceiptAsync({
					handle: reservation.runReceipt,
					status: "skipped",
					finishedAtMs: params.state.deps.nowMs(),
					error: "cron reservation job disappeared before local handoff"
				}, context);
			}
			context.admission.assertCurrent();
			return reloadedReservations;
		} catch (error) {
			if (reservationCommitted) try {
				await cleanupUnhandedReservations(committedReservations);
			} catch (cleanupError) {
				throw new AggregateError([error, cleanupError], "Cron reservation handoff and cleanup failed", { cause: cleanupError });
			}
			if (error === retiredError) return [];
			throw error;
		}
	}
	await ensureLoaded(params.state, { forceReload: true });
	return [];
}
async function activateQueuedCronRun(params) {
	const { state, job, reservationIdentity } = params;
	const startedAt = state.deps.nowMs();
	const reservation = state.queuedRunReservationsByJobId.get(job.id);
	const runReceipt = reservation?.runReceipt;
	if (!reservation || reservation.identity !== reservationIdentity || !runReceipt) return { kind: "fenced" };
	let activation;
	try {
		activation = await activateReservedCronRun({
			...params,
			startedAtMs: startedAt
		});
	} catch (error) {
		if (!(error instanceof CronRunReceiptRevisionError)) throw error;
	}
	if (!activation) return { kind: "fenced" };
	const { job: activatedJob, receipt: activatedReceipt } = activation;
	if (!state.stopped && reservation.lifecycleGeneration === state.lifecycleGeneration) return {
		kind: "activated",
		job: activatedJob,
		startedAt,
		runReceipt: activatedReceipt
	};
	params.onUnavailable?.();
	try {
		await releaseReservedCronRuns({
			state,
			reservations: [{
				jobId: job.id,
				reservationIdentity
			}],
			onSettled() {},
			terminal: {
				handle: activatedReceipt,
				status: "skipped",
				finishedAtMs: state.deps.nowMs(),
				error: "cron service stopped"
			},
			requireCurrentReceipt: true
		});
	} catch (error) {
		await params.onUnavailableRollbackError?.();
		throw error;
	} finally {
		releaseLocalCronRunReceiptOwnership(activatedReceipt);
	}
	releaseQueuedCronRun(state, job.id, reservationIdentity);
	return {
		kind: "unavailable",
		reason: "stopped"
	};
}
async function executeQueuedCronRun(params) {
	const { state } = params;
	const executeAdmitted = async () => {
		const started = await locked(state, async () => {
			await ensureLoaded(state, { forceReload: true });
			if (params.isUnavailable?.() || state.stopped) {
				params.onUnavailable?.();
				return;
			}
			const job = state.store?.jobs.find((entry) => entry.id === params.jobId);
			if (!job || !isQueuedCronRunReservationCurrent(state, params.jobId, params.reservationIdentity) || job.state.queuedAtMs !== params.reservedAtMs) {
				const ownership = state.queuedRunReservationsByJobId.get(params.jobId);
				if (job && ownership?.identity === params.reservationIdentity && job.state.queuedAtMs === params.reservedAtMs) {
					await params.onNotRunnable(job);
					return;
				}
				if (ownership?.identity === params.reservationIdentity) try {
					await finishCronRunReceiptAsync({
						handle: ownership.runReceipt,
						status: "skipped",
						finishedAtMs: state.deps.nowMs(),
						error: "cron reservation fenced by concurrent mutation"
					});
				} catch {}
				releaseQueuedCronRun(state, params.jobId, params.reservationIdentity);
				return;
			}
			const runnableJob = structuredClone(job);
			delete runnableJob.state.queuedAtMs;
			if (!isRunnableJob({
				job: runnableJob,
				nowMs: state.deps.nowMs(),
				...params.runnableOptions
			})) {
				await params.onNotRunnable(job);
				return;
			}
			const activation = await activateQueuedCronRun({
				state,
				job,
				reservationIdentity: params.reservationIdentity,
				onUnavailable: params.onUnavailable
			});
			if (activation.kind !== "activated") return;
			params.onActivated?.();
			const executionJob = structuredClone(activation.job);
			executionJob.state.runningAtMs = activation.startedAt;
			executionJob.state.lastError = void 0;
			return {
				executionJob,
				taskRun: createCronRunHandle({
					state,
					job: executionJob,
					startedAt: activation.startedAt,
					runReceipt: activation.runReceipt
				}),
				startedAt: activation.startedAt,
				runReceipt: activation.runReceipt,
				activeJobMarker: markServiceCronJobActive(state, activation.job, activation.runReceipt)
			};
		});
		if (!started) return;
		const { executionJob, taskRun, activeJobMarker } = started;
		const taskRunId = taskRun?.runId;
		emit(state, {
			jobId: executionJob.id,
			action: "started",
			job: executionJob,
			runAtMs: started.startedAt
		});
		const base = {
			jobId: params.jobId,
			job: executionJob,
			taskRunId,
			activeJobMarker,
			reservationIdentity: params.reservationIdentity,
			startedAt: started.startedAt,
			runReceipt: started.runReceipt
		};
		let outcome;
		try {
			const result = await executeJobCoreWithTimeout(state, executionJob, {
				runId: taskRunId,
				activeJobMarker,
				runReceipt: started.runReceipt,
				executionIdentity: createCronOwnerExecutionIdentityAdmission({
					state,
					runReceipt: started.runReceipt
				})
			});
			outcome = {
				...base,
				...result,
				endedAt: state.deps.nowMs()
			};
		} catch (error) {
			const receiptSettlementDisposition = error instanceof CronRunReceiptRevisionError && error.reason === "owner-unavailable" ? "owner-unavailable" : void 0;
			const errorText = error instanceof CronRunReceiptRevisionError ? error.message : normalizeCronRunErrorText(error);
			params.onSetupError?.(executionJob, errorText);
			outcome = {
				...base,
				...authorCronRunCompletion(state, executionJob, {
					status: "error",
					error: errorText,
					diagnostics: createCronRunDiagnosticsFromError("cron-setup", errorText, { nowMs: state.deps.nowMs })
				}),
				...receiptSettlementDisposition ? { receiptSettlementDisposition } : {},
				endedAt: state.deps.nowMs()
			};
		}
		return {
			outcome,
			handled: await params.onCompleted?.(outcome) === true
		};
	};
	const admission = await runWithCronAdmission(state, executeAdmitted, params.admissionRelease).catch(async (error) => {
		await cleanupQueuedCronRunReservations({
			state,
			reservations: [{
				jobId: params.jobId,
				reservationIdentity: params.reservationIdentity
			}],
			recompute: "maintenance"
		});
		throw error;
	});
	if (admission.kind === "stopped") return { kind: "stopped" };
	if (!admission.value) return { kind: "skipped" };
	return {
		kind: "completed",
		...admission.value
	};
}
//#endregion
//#region src/cron/service/run-recovery-events.ts
async function emitInterruptedCronRun(state, interrupted) {
	const job = state.store?.jobs.find((entry) => entry.id === interrupted.jobId);
	const event = {
		jobId: interrupted.jobId,
		action: "finished",
		job,
		status: "error",
		completionStatus: "failed",
		error: STARTUP_INTERRUPTED_ERROR,
		delivered: false,
		deliveryStatus: "unknown",
		deliveryError: STARTUP_INTERRUPTED_ERROR,
		failureNotificationDelivery: job ? failureNotificationDeliveryFromJobState(job) : void 0,
		runAtMs: interrupted.runAtMs,
		durationMs: interrupted.durationMs,
		nextRunAtMs: job?.state.nextRunAtMs
	};
	await finishCronRun(state, {
		taskRunId: interrupted.taskRunId,
		job,
		event
	});
	emit(state, event);
}
//#endregion
//#region src/cron/service/run-recovery.ts
var RetiredCronRecoveryError = class extends Error {
	constructor() {
		super("Cron recovery owner retired");
	}
};
function recoveryAuthority(state, context, signal, isCurrent) {
	const generation = state.lifecycleGeneration;
	return () => {
		context.admission.assertCurrent();
		if (state.stopped || state.lifecycleGeneration !== generation || signal?.aborted || isCurrent?.() === false) throw new RetiredCronRecoveryError();
	};
}
async function observeRecoveryProposals(state, context, proposals, assertCurrent) {
	if (proposals.length === 0) return [];
	const command = {
		type: "cron.observeRunRecovery",
		storeKey: cronStoreKey(state.deps.storePath),
		proposals
	};
	assertCurrent();
	let result = await executeExistingOpenClawStateRead({}, command);
	assertCurrent();
	if (!result || result.ok && result.type === command.type && result.observation.kind === "schema-uninitialized") {
		const assertSchemaCurrent = () => {
			context.admission.assertCurrent();
			assertCurrent();
		};
		const { createSqliteWorkerWriteAdmission } = await import("./sqlite-worker-store-B3q06gbG.mjs");
		await runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
			type: "cron.initializeRunReceipts",
			input: {}
		}), {
			assertCurrent: assertSchemaCurrent,
			createAdmission: createSqliteWorkerWriteAdmission(assertSchemaCurrent, [context.admission.databasePath])
		});
		assertCurrent();
		result = await executeExistingOpenClawStateRead({}, command);
		assertCurrent();
	}
	if (!result?.ok || result.type !== command.type || result.observation.kind !== "observed") throw new Error("Cron recovery observation did not return its admitted receipt snapshot");
	return result.observation.proposals;
}
function observedRecoveryResult(state, proposal, observed) {
	const receipt = observed.receipt;
	if (!receipt) return;
	if (!proposal.receipt || !exactCronRunReceiptMatches(receipt, proposal.receipt)) return {
		kind: "superseded",
		receipt
	};
	return isCronRunReceiptOwnerStale(receipt, state.deps.nowMs()) ? void 0 : {
		kind: "live",
		receipt
	};
}
async function repairRecoveryProposal(state, context, proposal, mode, assertOwnerCurrent, publish) {
	const input = {
		storeKey: cronStoreKey(state.deps.storePath),
		proposal: structuredClone(proposal),
		mode
	};
	let retired = false;
	try {
		await runCronRuntimeMutation({
			context,
			type: "cron.repairRun",
			input,
			assertCurrent() {
				try {
					assertOwnerCurrent();
				} catch (error) {
					retired = error instanceof RetiredCronRecoveryError;
					throw error;
				}
			},
			prepare(routing) {
				if (routing.id !== proposal.jobId) throw new Error("Cron recovery policy differs from its admitted job");
				const receiptIsStale = () => proposal.receipt ? isCronRunReceiptOwnerStale(proposal.receipt, state.deps.nowMs()) : true;
				const cronConfig = structuredClone(state.deps.cronConfig);
				const value = {
					proposedReceiptIsStale: receiptIsStale(),
					nowMs: state.deps.nowMs(),
					cronConfig,
					failureAlert: resolveFailureAlert({ deps: { cronConfig } }, routing)
				};
				return {
					value,
					assertCurrent() {
						if (value.proposedReceiptIsStale !== receiptIsStale() || !isDeepStrictEqual(value.cronConfig, state.deps.cronConfig) || !isDeepStrictEqual(value.failureAlert, resolveFailureAlert(state, routing))) throw new Error("Cron recovery policy or receipt ownership changed before commit");
					}
				};
			},
			publish(outcome) {
				if (outcome.result.kind === "repaired") noteCronJobsStoreCommit(input.storeKey);
				publish(outcome.result);
				for (const entry of outcome.logs) state.deps.log[entry.level](entry.fields, entry.message);
			}
		});
	} catch (error) {
		if (retired) throw new RetiredCronRecoveryError();
		throw error;
	}
}
/** Observe the whole batch before any repair; committed candidates publish before a later await fails. */
async function recoverCronRunProposals(state, targets, options) {
	const context = captureOpenClawStateWorkerContext();
	const assertCurrent = recoveryAuthority(state, context, options.signal, options.isCurrent);
	try {
		const observed = await observeRecoveryProposals(state, context, targets, assertCurrent);
		const repairs = [];
		for (let index = 0; index < observed.length; index += 1) {
			const current = observed[index];
			const target = targets[index];
			const proposal = target.receipt ? target : current;
			const result = observedRecoveryResult(state, proposal, current);
			if (result) options.onRecovery(proposal, result);
			else repairs.push(proposal);
		}
		for (const proposal of repairs) {
			assertCurrent();
			await repairRecoveryProposal(state, context, proposal, options.mode ?? "reclaim", assertCurrent, (result) => options.onRecovery(proposal, result));
		}
	} catch (error) {
		if (!(error instanceof RetiredCronRecoveryError)) throw error;
	}
}
//#endregion
//#region src/cron/service/schedule-maintenance.ts
/** Schedules authoritative rows in the worker without clearing live process ownership. */
async function recomputeUnownedCronSchedules(state, opts) {
	const context = captureOpenClawStateWorkerContext();
	const generation = state.lifecycleGeneration;
	const storeKey = cronStoreKey(state.deps.storePath);
	let outcome;
	await runCronRuntimeMutation({
		context,
		type: "cron.scheduleUnowned",
		input: {
			storeKey,
			options: opts ? { ...opts } : void 0
		},
		assertCurrent() {
			if (state.lifecycleGeneration !== generation) throw new Error("Cron schedule maintenance owner retired");
		},
		prepare({ jobIds }) {
			const owners = jobIds.map((jobId) => ({
				jobId,
				active: isCronJobActive(jobId),
				reservation: state.queuedRunReservationsByJobId.get(jobId)
			}));
			const ownership = owners.map(({ jobId, active, reservation }) => ({
				jobId,
				active,
				reservation: reservation ? {
					markerAtMs: reservation.markerAtMs,
					preserveWhenDisabled: reservation.preserveWhenDisabled
				} : void 0
			}));
			return {
				value: {
					nowMs: opts?.nowMs ?? state.deps.nowMs(),
					ownership
				},
				assertCurrent() {
					for (let index = 0; index < owners.length; index += 1) {
						const owner = owners[index];
						const prepared = ownership[index];
						const current = state.queuedRunReservationsByJobId.get(owner.jobId);
						if (owner.active !== isCronJobActive(owner.jobId) || current !== owner.reservation || current?.markerAtMs !== prepared.reservation?.markerAtMs || current?.preserveWhenDisabled !== prepared.reservation?.preserveWhenDisabled) throw new Error("Cron schedule ownership changed before commit");
					}
				}
			};
		},
		publish(committed) {
			outcome = committed;
			if (committed.changed) noteCronJobsStoreCommit(storeKey);
			applyCronRuntimeRowsToState(state, committed.jobs);
			runPostPersistCronNotifications(state, committed.notifications);
			for (const entry of committed.logs) state.deps.log[entry.level](entry.fields, entry.message);
		}
	});
	if (!outcome) throw new Error("Cron schedule maintenance did not publish its committed rows");
	return outcome;
}
//#endregion
//#region src/cron/session-reaper.ts
/** Prunes expired per-run cron sessions and archives unreferenced transcripts. */
const DEFAULT_RETENTION_MS = 864e5;
/** Minimum interval between reaper sweeps (avoid running every timer tick). */
const MIN_SWEEP_INTERVAL_MS = 3e5;
const lastSweepAtMsByTarget = /* @__PURE__ */ new Map();
function reaperTargetKey(agentId, storePath) {
	return `${normalizeAgentId(agentId)}\0${path.resolve(storePath)}`;
}
/** Resolves cron run-session retention; `false` disables pruning, bad strings fall back safely. */
function resolveRetentionMs(cronConfig) {
	if (cronConfig?.sessionRetention === false) return null;
	const raw = cronConfig?.sessionRetention;
	if (typeof raw === "string" && raw.trim()) try {
		const ms = parseDurationMs(raw.trim(), { defaultUnit: "h" });
		if (ms <= 0) return null;
		return ms;
	} catch {
		return DEFAULT_RETENTION_MS;
	}
	return DEFAULT_RETENTION_MS;
}
/** Removes the reusable base session whose owning isolated cron job was deleted. */
async function removeCronJobBaseSession(params) {
	const sessionKey = resolveCronAgentSessionKey({
		agentId: params.agentId,
		sessionKey: `cron:${params.jobId}`
	});
	const existing = loadExactSessionEntryReadOnly({
		storePath: params.sessionStorePath,
		sessionKey
	})?.entry;
	if (!existing) return false;
	const sessionId = existing.sessionId.trim();
	if (sessionId) return await deleteCronSessionViaGateway({
		agentSessionKey: sessionKey,
		sessionId,
		lifecycleRevision: existing.lifecycleRevision,
		sessionUpdatedAt: existing.updatedAt
	});
	return (await applySessionEntryLifecycleMutation({
		agentId: params.agentId,
		storePath: params.sessionStorePath,
		removals: [{
			sessionKey,
			archiveRemovedTranscript: true,
			expectedEntry: existing
		}]
	})).removedEntries > 0;
}
/**
* Sweeps completed isolated cron run sessions while preserving base cron sessions.
*
* Run outside the cron service `locked()` section: cleanup acquires session
* lifecycle and writer ownership, so nesting the queues can deadlock timer ticks.
*/
async function sweepCronRunSessions(params) {
	const retentionMs = resolveRetentionMs(params.cronConfig);
	if (retentionMs === null) return {
		swept: false,
		pruned: 0
	};
	const now = params.nowMs ?? Date.now();
	const storePath = params.sessionStorePath;
	const targetKey = reaperTargetKey(params.agentId, storePath);
	const lastSweepAtMs = lastSweepAtMsByTarget.get(targetKey) ?? 0;
	if (now >= lastSweepAtMs && now - lastSweepAtMs < MIN_SWEEP_INTERVAL_MS) return {
		swept: false,
		pruned: 0
	};
	lastSweepAtMsByTarget.set(targetKey, now);
	let pruned = 0;
	let transcriptCleanupError;
	try {
		if (params.isAgentAvailable?.(params.agentId) === false) {
			params.log.debug({ agentId: params.agentId }, "cron-reaper: skipped unavailable agent");
			return {
				swept: false,
				pruned: 0
			};
		}
		const cutoff = now - retentionMs;
		let pendingMediaSessionKeys;
		const removals = [];
		for (const { sessionKey, entry } of await readExpiredCronRunEntriesInWorker({
			agentId: params.agentId,
			storePath,
			updatedBefore: cutoff
		})) {
			if (entry.cronRunContinuation) {
				pendingMediaSessionKeys ??= buildPendingGeneratedMediaSessionKeySet();
				if (pendingMediaSessionKeys.has(sessionKey) || hasDescendantRunAwaitingSettle(sessionKey)) continue;
			}
			if (entry.sessionId && isCompetingSessionWorkAdmissionActive(storePath, [sessionKey, entry.sessionId])) continue;
			removals.push({
				sessionKey,
				expectedEntry: entry,
				...entry.sessionId ? { expectedSessionId: entry.sessionId } : {},
				expectedUpdatedAt: entry.updatedAt,
				archiveRemovedTranscript: true
			});
		}
		if (removals.length > 0) {
			const archiveRetentionMs = resolveMaintenanceConfig().resetArchiveRetentionMs;
			const result = await applySessionEntryLifecycleMutation({
				agentId: params.agentId,
				storePath,
				removals,
				beforeCommitInTransaction: () => {
					for (const removal of removals) if (removal.expectedEntry?.cronRunContinuation && hasDescendantRunAwaitingSettle(removal.sessionKey)) throw new Error(`Cannot prune cron run continuation while subagents await settlement for ${removal.sessionKey}`);
				},
				...archiveRetentionMs == null ? {} : { cleanupArchivedTranscripts: {
					rules: [{
						reason: "deleted",
						olderThanMs: archiveRetentionMs
					}],
					nowMs: now
				} },
				captureArtifactCleanupError: true
			});
			pruned = result.removedEntries;
			transcriptCleanupError = result.artifactCleanupError;
		}
	} catch (err) {
		params.log.warn({ err: String(err) }, "cron-reaper: failed to sweep session store");
		return {
			swept: false,
			pruned: 0
		};
	}
	if (transcriptCleanupError) params.log.warn({ err: formatErrorMessage(transcriptCleanupError) }, "cron-reaper: transcript cleanup failed");
	if (pruned > 0) params.log.info({
		pruned,
		retentionMs
	}, `cron-reaper: pruned ${pruned} expired cron run session(s)`);
	return {
		swept: true,
		pruned
	};
}
/** Resets per-target reaper throttles between tests. */
function resetReaperThrottle() {
	lastSweepAtMsByTarget.clear();
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.cronSessionReaperTestApi")] = { resetReaperThrottle };
//#endregion
//#region src/cron/service/timer-capacity-recheck.ts
/** Tracks capacity-triggered child ticks without leaking the parent timer lifecycle. */
function createCronCapacityRecheckTracker(requestRecheck, requestRecheckAfterClose) {
	let pendingActivations = 0;
	let activationsAllowRecheck = true;
	let activationGateResolved = false;
	let activationGateAllowsRecheck = false;
	let closed = false;
	const { promise: activationGate, resolve: resolveActivationGate } = createDeferredCore();
	const trackedRechecks = /* @__PURE__ */ new Set();
	const runInParentContext = AsyncLocalStorage.snapshot();
	const resolveActivationGateOnce = (allowRecheck) => {
		if (activationGateResolved) return;
		activationGateResolved = true;
		activationGateAllowsRecheck = allowRecheck;
		resolveActivationGate(allowRecheck);
	};
	return {
		initializeActivations(count, allowRecheckWhenEmpty = false) {
			pendingActivations = count;
			if (count === 0) resolveActivationGateOnce(allowRecheckWhenEmpty);
		},
		settleActivation(allowRecheck) {
			if (activationGateResolved) return;
			activationsAllowRecheck &&= allowRecheck;
			pendingActivations -= 1;
			if (pendingActivations === 0) resolveActivationGateOnce(activationsAllowRecheck);
		},
		request() {
			if (closed) {
				if (activationGateAllowsRecheck) requestRecheckAfterClose();
				return;
			}
			const recheck = activationGate.then(async (allowRecheck) => {
				if (allowRecheck) await runInParentContext(requestRecheck);
			});
			trackedRechecks.add(recheck);
			recheck.finally(() => trackedRechecks.delete(recheck));
		},
		abort() {
			closed = true;
			resolveActivationGateOnce(false);
		},
		async drain() {
			while (trackedRechecks.size > 0) await Promise.all(trackedRechecks);
		}
	};
}
//#endregion
//#region src/cron/service/timer-notifications.ts
function maybeNotifyIsolatedAgentSetupTimeout(state, result) {
	const signal = result.isolatedAgentSetupTimeout;
	if (!signal) return false;
	const notify = state.deps.onIsolatedAgentSetupTimeout;
	if (!notify) return false;
	const logFailure = (err) => {
		state.deps.log.warn({
			jobId: result.job.id,
			err: String(err)
		}, "cron: isolated setup timeout handler failed");
	};
	try {
		Promise.resolve(notify({
			job: result.job,
			error: signal.error,
			timeoutMs: signal.timeoutMs
		})).catch(logFailure);
		return true;
	} catch (err) {
		logFailure(err);
		return false;
	}
}
//#endregion
//#region src/cron/service/timer-outcome-finalization.ts
/** Finalizes cron receipts and active markers after timer outcome persistence. */
/** Coalesces terminal cron writes without holding an execution admission slot. */
function createCompletedCronRunOutcomeDrain(state, opts) {
	const pendingOutcomes = [];
	const finalizedOutcomes = [];
	let drainPromise;
	let drainFailure;
	const startDrain = () => {
		if (drainPromise || pendingOutcomes.length === 0) return;
		drainPromise = Promise.resolve().then(async () => {
			while (pendingOutcomes.length > 0) {
				const completed = pendingOutcomes.splice(0);
				try {
					finalizedOutcomes.push(...await finalizeCompletedCronRunOutcomes(state, completed, opts));
				} catch (error) {
					drainFailure ??= { error };
				}
			}
		}).catch((error) => {
			drainFailure ??= { error };
		}).finally(() => {
			drainPromise = void 0;
			if (pendingOutcomes.length > 0) startDrain();
		});
	};
	return {
		enqueue(outcome) {
			pendingOutcomes.push(outcome);
			startDrain();
		},
		async flush() {
			for (;;) {
				const pendingDrain = drainPromise;
				if (!pendingDrain) break;
				await pendingDrain;
			}
			if (drainFailure) throw drainFailure.error;
			return finalizedOutcomes.splice(0);
		}
	};
}
/** Durably finalizes finished work without waiting for unrelated cron runs. */
async function finalizeCompletedCronRunOutcomes(state, outcomes, opts) {
	if (outcomes.length === 0) return [];
	let finalizedOutcomes = [];
	let finalizationSucceeded = false;
	const canPublish = (outcome) => !(state.stopped && opts?.discardWhenStopped) && isCronActiveJobMarkerCurrent(outcome.activeJobMarker);
	try {
		await locked(state, async () => {
			await ensureLoaded(state, { forceReload: true });
			for (const outcome of outcomes) if (outcome.status !== "ok" || outcome.triggerEval?.fired !== false) {
				const taskJob = structuredClone(state.store?.jobs.find((job) => job.id === outcome.jobId) ?? outcome.job);
				applyOutcomeToAuthoritativeJob(state, taskJob, outcome, { deferredNotifications: [] });
				await recordCronOutcomeForJob(state, taskJob, outcome);
			}
			finalizedOutcomes = outcomes.filter((outcome) => outcome.runReceipt || canPublish(outcome));
			if (finalizedOutcomes.length === 0) {
				finalizationSucceeded = true;
				return;
			}
			const postPersistNotifications = [];
			const receiptHooks = finalizedOutcomes.filter((outcome) => outcome.runReceipt).map((outcome) => cronRunReceiptPersistHooks({
				state,
				handle: outcome.runReceipt,
				allowMissingJob: outcome.activeJobMarker?.jobRemoved === true || !state.store?.jobs.some((job) => job.id === outcome.jobId),
				terminal: {
					status: outcome.status,
					...outcome.triggerEval ? { triggerFired: outcome.triggerEval.fired } : {},
					finishedAtMs: outcome.endedAt,
					error: outcome.error,
					...outcome.receiptSettlementDisposition ? { disposition: outcome.receiptSettlementDisposition } : {}
				}
			}));
			const transactionHooks = receiptHooks.length > 0 ? {
				beforeWrite: (database, receiptSchema) => {
					for (const hooks of receiptHooks) hooks.beforeWrite?.(database, receiptSchema);
				},
				afterWrite: (database, receiptSchema) => {
					for (const hooks of receiptHooks) hooks.afterWrite?.(database, receiptSchema);
				},
				afterCommit: () => {
					for (const hooks of receiptHooks) hooks.afterCommit?.();
				}
			} : void 0;
			const committed = commitCronRuntimeRows({
				state,
				jobIds: finalizedOutcomes.map((outcome) => outcome.jobId),
				operationLabel: "cron.run-finalization",
				transactionHooks,
				mutate: ({ database, jobs }) => {
					const upsertedJobs = [];
					const removedJobs = [];
					const eventPlans = [];
					for (const outcome of finalizedOutcomes) {
						const job = jobs.get(outcome.jobId);
						if (!job || outcome.activeJobMarker?.jobRemoved === true) {
							eventPlans.push({ outcome });
							continue;
						}
						if (applyOutcomeToAuthoritativeJob(state, job, outcome, {
							deferredNotifications: postPersistNotifications,
							triggerStateRetired: outcome.runReceipt && isCronRunTriggerStateRetiredInDatabase({
								database,
								handle: outcome.runReceipt
							})
						})) removedJobs.push(job);
						else upsertedJobs.push(job);
						eventPlans.push({
							outcome,
							job: structuredClone(job)
						});
					}
					return {
						deleteJobIds: removedJobs.map((job) => job.id),
						upsertJobIds: upsertedJobs.map((job) => job.id),
						value: {
							eventPlans,
							removedJobs,
							upsertedJobs
						}
					};
				}
			});
			applyCronRuntimeRowsToState(state, committed.upsertedJobs, committed.removedJobs.map((job) => job.id), { publish: false });
			for (const outcome of finalizedOutcomes) {
				if (outcome.status === "ok" && outcome.triggerEval?.fired === false) await recordQuietCronEvaluation(state, outcome);
				if (!canPublish(outcome)) state.durableNextRunAtMsByJobId.set(outcome.jobId, state.store?.jobs.find((job) => job.id === outcome.jobId)?.state.nextRunAtMs);
			}
			finalizedOutcomes = finalizedOutcomes.filter(canPublish);
			finalizationSucceeded = true;
			if (finalizedOutcomes.length === 0) {
				runPostPersistCronNotifications(state, postPersistNotifications);
				return;
			}
			const publishedJobIds = new Set(finalizedOutcomes.map((outcome) => outcome.jobId));
			for (const plan of committed.eventPlans) {
				if (!publishedJobIds.has(plan.outcome.jobId)) continue;
				if (plan.job) emitCronOutcomeEventForJob(state, plan.job, plan.outcome);
				else await applyOutcomeToStoredJob(state, plan.outcome, { deferredNotifications: postPersistNotifications });
			}
			runPostPersistCronNotifications(state, postPersistNotifications);
			for (const removedJob of committed.removedJobs) if (publishedJobIds.has(removedJob.id)) emit(state, {
				jobId: removedJob.id,
				action: "removed",
				job: removedJob
			});
			publishCronRuntimeRows(state);
			try {
				await recomputeUnownedCronSchedules(state, opts?.repairFutureCronNextRunAtMs === false ? { repairFutureCronNextRunAtMs: false } : void 0);
			} catch (error) {
				state.deps.log.warn({ err: String(error) }, "cron: post-finalization schedule maintenance failed");
			}
		});
		finalizationSucceeded ||= finalizedOutcomes.length > 0;
		return finalizedOutcomes;
	} catch (error) {
		if (error instanceof CronRunReceiptRevisionError) {
			const stale = outcomes.find((outcome) => outcome.runReceipt?.receiptId === error.receiptId);
			if (stale?.runReceipt) {
				if (isCronActiveJobMarkerCurrent(stale.activeJobMarker)) {
					if (stale.reservationIdentity) await supersedeActivatedCronRun({
						state,
						jobId: stale.jobId,
						reservationIdentity: stale.reservationIdentity,
						runReceipt: stale.runReceipt,
						reason: error.message
					});
					else finishCronRunReceipt({
						handle: stale.runReceipt,
						status: "superseded",
						finishedAtMs: state.deps.nowMs(),
						error: error.message
					});
				}
				return await finalizeCompletedCronRunOutcomes(state, outcomes.filter((outcome) => outcome !== stale), opts);
			}
		}
		throw error;
	} finally {
		for (const outcome of outcomes) {
			if (outcome.reservationIdentity) releaseQueuedCronRun(state, outcome.jobId, outcome.reservationIdentity);
			if (opts?.clearOnFailure !== false || finalizationSucceeded) clearCronJobActive(outcome.jobId, outcome.activeJobMarker);
			if (outcome.runReceipt) releaseLocalCronRunReceiptOwnership(outcome.runReceipt);
		}
	}
}
//#endregion
//#region src/cron/service/timer-scheduler.ts
/** Arms the cron timer for the next wake or a maintenance recheck. */
function armTimer(state) {
	stopTimer(state);
	if (state.stopped || state.schedulingPaused || state.startupCatchup) {
		state.deps.log.debug({}, "cron: armTimer skipped - scheduler stopped");
		return;
	}
	if (!state.deps.cronEnabled) {
		state.deps.log.debug({}, "cron: armTimer skipped - scheduler disabled");
		return;
	}
	const { nextWakeAtMs: nextAt, jobCount, enabledCount } = summarizeCronJobSchedule(state);
	if (!nextAt) {
		const withNextRun = 0;
		if (enabledCount > 0) {
			armRunningRecheckTimer(state);
			state.deps.log.debug({
				jobCount,
				enabledCount,
				withNextRun,
				delayMs: MAX_CRON_TIMER_DELAY_MS
			}, "cron: timer armed for maintenance recheck");
			return;
		}
		state.deps.log.debug({
			jobCount,
			enabledCount,
			withNextRun
		}, "cron: armTimer skipped - no jobs with nextRunAtMs");
		return;
	}
	const now = state.deps.nowMs();
	const delay = Math.max(nextAt - now, 0);
	const clampedDelay = Math.min(delay === 0 ? MIN_REFIRE_GAP_MS : delay, MAX_CRON_TIMER_DELAY_MS);
	setCronTimer(state, clampedDelay);
	state.deps.log.debug({
		nextAt,
		nextAtIso: formatTimestamp(new Date(nextAt), { style: "long" }),
		delayMs: clampedDelay,
		clamped: delay > MAX_CRON_TIMER_DELAY_MS
	}, "cron: timer armed");
}
function armRunningRecheckTimer(state) {
	if (state.stopped || state.schedulingPaused) return;
	setCronTimer(state, MAX_CRON_TIMER_DELAY_MS);
}
function stopTimer(state) {
	state.timer?.cancel();
	state.timer = null;
}
function setCronTimer(state, delayMs) {
	state.timer = state.deps.scheduler.schedule({
		id: `cron:${state.deps.storePath}:due`,
		delayMs,
		run: () => {
			state.timer = null;
			return runInDetachedAsyncContext(() => onTimer(state)).catch((err) => {
				state.deps.log.error({ err: String(err) }, "cron: timer tick failed");
			});
		}
	});
}
/** Consume a released slot without routing overdue work through the refire floor. */
function requestImmediateCronRecheck(state) {
	if (state.stopped || state.schedulingPaused || !state.deps.cronEnabled) return;
	stopTimer(state);
	return onTimer(state).catch((err) => {
		state.deps.log.error({ err: String(err) }, "cron: immediate capacity recheck failed");
	});
}
function requestIndependentImmediateCronRecheck(state) {
	return runInDetachedAsyncContext(() => requestImmediateCronRecheck(state));
}
/** Handles one cron timer tick under the process-wide root work admission. */
async function onTimer(state) {
	const lifecycleGeneration = state.lifecycleGeneration;
	let admission;
	try {
		admission = await beginGatewayRootWorkAdmissionWhenOpen("cron:timer-tick", state.deps.scheduler.signal);
	} catch (err) {
		if (err instanceof GatewayDrainingError || state.deps.scheduler.signal.aborted && isAbortError(err)) return;
		throw err;
	}
	try {
		if (state.lifecycleGeneration === lifecycleGeneration) {
			const run = () => onAdmittedTimer(state);
			await admission.run(() => state.deps.runSchedulerOwned ? state.deps.runSchedulerOwned(run) : run());
		}
	} finally {
		admission.release();
	}
}
/** Loads due jobs, reserves them, executes, persists, and re-arms. */
async function onAdmittedTimer(state) {
	if (state.stopped || state.schedulingPaused || state.startupCatchup) return;
	const generation = state.lifecycleGeneration;
	state.running = true;
	state.activeTimerTicks += 1;
	armRunningRecheckTimer(state);
	const capacityRechecks = createCronCapacityRecheckTracker(() => requestImmediateCronRecheck(state), () => requestIndependentImmediateCronRecheck(state));
	let allowEmptyCapacityRecheck = false;
	try {
		const dueJobs = await locked(state, async () => {
			await ensureLoaded(state, { forceReload: true });
			if (state.stopped || state.startupCatchup || state.lifecycleGeneration !== generation) {
				state.deps.log.warn({}, "cron: due job reservation skipped - scheduler unavailable");
				return [];
			}
			const proposals = (state.store?.jobs ?? []).filter((job) => job.state.queuedAtMs !== void 0 || job.state.runningAtMs !== void 0).map((job) => ({
				jobId: job.id,
				queuedAtMs: job.state.queuedAtMs,
				runningAtMs: job.state.runningAtMs
			}));
			let repaired = false;
			const interruptedRuns = [];
			try {
				await recoverCronRunProposals(state, proposals, {
					isCurrent: () => !state.startupCatchup && state.lifecycleGeneration === generation,
					onRecovery(_proposal, result) {
						if (result.kind === "repaired") {
							repaired = true;
							runPostPersistCronNotifications(state, result.notifications);
							if (result.interrupted) interruptedRuns.push(result.interrupted);
						} else if (result.receipt && result.receipt.ownerPid !== process.pid) enrollForeignReceipt(state, result.receipt);
					}
				});
			} finally {
				if (repaired) await ensureLoaded(state, { forceReload: true });
				for (const interrupted of interruptedRuns) await emitInterruptedCronRun(state, interrupted);
			}
			if (state.stopped || state.startupCatchup || state.lifecycleGeneration !== generation) return [];
			const dueCheckNow = state.deps.nowMs();
			const due = await skipCronJobsWithoutOwners(state, collectRunnableJobs(state, dueCheckNow), dueCheckNow);
			if (state.stopped || state.startupCatchup || state.lifecycleGeneration !== generation) return [];
			if (due.length === 0) {
				if (!state.store?.jobs.some((job) => needsCronTimerMaintenance(job, dueCheckNow))) return [];
				await recomputeUnownedCronSchedules(state, {
					recomputeExpired: true,
					nowMs: dueCheckNow,
					repairFutureCronNextRunAtMs: state.store.jobs.some((job) => isStaleFutureCronSlot(job, dueCheckNow))
				});
				return [];
			}
			const admissionReleases = tryAcquireCronRunSlots(state, due.length);
			const admittedDue = due.slice(0, admissionReleases.length);
			if (admittedDue.length < due.length) {
				setCronRunCapacityListener(state, admittedDue.length > 0 ? () => capacityRechecks.request() : () => void requestIndependentImmediateCronRecheck(state));
				allowEmptyCapacityRecheck = admittedDue.length > 0;
			}
			if (admittedDue.length === 0) return [];
			const now = state.deps.nowMs();
			try {
				const reservedDue = (await persistQueuedCronRunReservations({
					state,
					candidates: admittedDue,
					reservedAtMs: now
				})).map(({ job, runReceipt }, index) => ({
					id: job.id,
					job,
					reservedAtMs: now,
					reservationIdentity: reserveQueuedCronRun(state, job.id, now, {
						runReceipt,
						lifecycleGeneration: generation
					}),
					releaseAdmission: admissionReleases[index]
				}));
				if (reservedDue.length === 0 && allowEmptyCapacityRecheck) {
					const stillDue = new Set(collectRunnableJobs(state, state.deps.nowMs()).map((job) => job.id));
					allowEmptyCapacityRecheck = admittedDue.some((job) => !stillDue.has(job.id));
				}
				for (const releaseAdmission of admissionReleases.slice(reservedDue.length)) releaseAdmission();
				return reservedDue;
			} catch (error) {
				for (const releaseAdmission of admissionReleases) releaseAdmission();
				throw error;
			}
		});
		if (state.lifecycleGeneration === generation) {
			if (state.runAdmission.capacityListener) armRunningRecheckTimer(state);
			else armTimer(state);
		}
		const concurrency = Math.min(8, Math.max(1, dueJobs.length));
		capacityRechecks.initializeActivations(dueJobs.length, allowEmptyCapacityRecheck);
		const completedOutcomeDrain = createCompletedCronRunOutcomeDrain(state);
		const claimedIndexes = /* @__PURE__ */ new Set();
		let reservationReleaseError;
		let setupTimeoutNotified = false;
		let stopAdmittingDueJobs = false;
		const releaseUnclaimedDueJobReservationsWithRetry = async () => {
			const unclaimed = dueJobs.filter((_, index) => !claimedIndexes.has(index));
			const reservations = unclaimed.map((due) => ({
				jobId: due.id,
				reservationIdentity: due.reservationIdentity
			}));
			try {
				await cleanupQueuedCronRunReservations({
					state,
					reservations,
					recompute: "maintenance"
				});
			} finally {
				for (const due of unclaimed) due.releaseAdmission();
			}
		};
		if (state.stopped || state.lifecycleGeneration !== generation) {
			capacityRechecks.abort();
			if (dueJobs.length > 0) await releaseUnclaimedDueJobReservationsWithRetry();
			return;
		}
		let completedResults;
		let batchExecutionError;
		try {
			completedResults = await pMap(dueJobs, async (due, index) => {
				let initialActivationSettled = false;
				const settleThisInitialActivation = (allowRecheck) => {
					if (initialActivationSettled) return;
					initialActivationSettled = true;
					capacityRechecks.settleActivation(allowRecheck);
				};
				if (stopAdmittingDueJobs || state.stopped) {
					stopAdmittingDueJobs = true;
					settleThisInitialActivation(false);
					return pMapSkip;
				}
				try {
					const execution = await executeQueuedCronRun({
						state,
						jobId: due.id,
						reservedAtMs: due.reservedAtMs,
						reservationIdentity: due.reservationIdentity,
						admissionRelease: due.releaseAdmission,
						isUnavailable: () => stopAdmittingDueJobs,
						onUnavailable: () => {
							stopAdmittingDueJobs = true;
						},
						onActivated: () => {
							claimedIndexes.add(index);
							settleThisInitialActivation(true);
						},
						onNotRunnable: async () => {
							const committedJob = commitCronRuntimeRows({
								state,
								jobIds: [due.id],
								operationLabel: "cron.skipped-reservation-cleanup",
								mutate: ({ database, jobs, receiptSchema }) => {
									const current = jobs.get(due.id);
									const ownership = state.queuedRunReservationsByJobId.get(due.id);
									if (!current || ownership?.identity !== due.reservationIdentity || ownership.markerAtMs !== current.state.queuedAtMs) return { value: void 0 };
									finishCronRunReceiptInDatabase({
										receiptSchema,
										database,
										handle: ownership.runReceipt,
										status: "skipped",
										finishedAtMs: state.deps.nowMs(),
										error: "cron scheduled reservation became ineligible"
									});
									delete current.state.queuedAtMs;
									return {
										upsertJobIds: [current.id],
										value: current
									};
								}
							});
							if (committedJob) applyCronRuntimeRowsToState(state, [committedJob]);
							const ownership = state.queuedRunReservationsByJobId.get(due.id);
							if (ownership?.identity === due.reservationIdentity) releaseLocalCronRunReceiptOwnership(ownership.runReceipt);
							releaseQueuedCronRun(state, due.id, due.reservationIdentity);
						},
						onSetupError: (job, errorText) => {
							state.deps.log.warn({
								jobId: due.id,
								jobName: job.name,
								timeoutMs: resolveCronJobTimeoutMs(job) ?? null
							}, `cron: job failed: ${errorText}`);
						},
						onCompleted: async (result) => {
							if (!result.isolatedAgentSetupTimeout) {
								completedOutcomeDrain.enqueue(result);
								return true;
							}
							let finalizedResults;
							try {
								finalizedResults = await finalizeCompletedCronRunOutcomes(state, [result], { clearOnFailure: false });
							} catch {
								return false;
							}
							if (finalizedResults.length > 0 && !setupTimeoutNotified && maybeNotifyIsolatedAgentSetupTimeout(state, result)) {
								setupTimeoutNotified = true;
								stopAdmittingDueJobs = true;
								try {
									await releaseUnclaimedDueJobReservationsWithRetry();
								} catch (err) {
									reservationReleaseError = err;
								}
							}
							return true;
						}
					});
					if (execution.kind === "stopped") {
						stopAdmittingDueJobs = true;
						return pMapSkip;
					}
					if (execution.kind === "skipped") {
						settleThisInitialActivation(!stopAdmittingDueJobs && !state.stopped);
						return pMapSkip;
					}
					if (execution.handled) return pMapSkip;
					return execution.outcome;
				} catch (error) {
					stopAdmittingDueJobs = true;
					batchExecutionError ??= error;
					return pMapSkip;
				} finally {
					settleThisInitialActivation(false);
				}
			}, {
				concurrency,
				stopOnError: false
			});
		} catch (error) {
			let finalizationError;
			try {
				await completedOutcomeDrain.flush();
			} catch (drainError) {
				finalizationError = drainError;
			}
			await releaseUnclaimedDueJobReservationsWithRetry();
			if (finalizationError) throw finalizationError instanceof Error ? finalizationError : new Error(formatErrorMessage(finalizationError));
			throw error instanceof AggregateError && error.errors.length > 0 ? error.errors[0] : error;
		}
		let postBatchError = reservationReleaseError;
		try {
			await completedOutcomeDrain.flush();
		} catch (error) {
			postBatchError ??= error;
			stopAdmittingDueJobs = true;
		}
		if (stopAdmittingDueJobs) try {
			await releaseUnclaimedDueJobReservationsWithRetry();
		} catch (error) {
			postBatchError ??= error;
		}
		if (completedResults.length > 0) {
			const finalizedResults = await finalizeCompletedCronRunOutcomes(state, completedResults);
			for (const result of finalizedResults) if (!setupTimeoutNotified && result.isolatedAgentSetupTimeout && maybeNotifyIsolatedAgentSetupTimeout(state, result)) {
				setupTimeoutNotified = true;
				break;
			}
		}
		if (postBatchError) throw postBatchError instanceof Error ? postBatchError : new Error(formatErrorMessage(postBatchError));
		if (batchExecutionError) throw batchExecutionError instanceof Error ? batchExecutionError : new Error(formatErrorMessage(batchExecutionError));
	} finally {
		capacityRechecks.abort();
		await capacityRechecks.drain();
		try {
			if (state.lifecycleGeneration === generation && (state.deps.resolveSessionStorePath || state.deps.sessionStorePath)) {
				const configuredDefaultAgentId = (state.deps.resolveDefaultAgentId?.() ?? state.deps.defaultAgentId)?.trim();
				const defaultAgentId = configuredDefaultAgentId ? normalizeAgentId(configuredDefaultAgentId) : void 0;
				const reaperAgentIds = new Set((state.deps.resolveSessionStoreAgentIds?.() ?? []).map(normalizeAgentId));
				const resolveJobAgentId = (job) => {
					if (typeof job.agentId === "string" && job.agentId.trim()) return normalizeAgentId(job.agentId);
					try {
						return resolveAgentIdFromSessionKey(job.sessionKey, defaultAgentId);
					} catch {
						return;
					}
				};
				for (const job of state.store?.jobs ?? []) {
					const agentId = resolveJobAgentId(job);
					if (agentId) reaperAgentIds.add(agentId);
				}
				if (defaultAgentId) reaperAgentIds.add(defaultAgentId);
				if (reaperAgentIds.size > 0) {
					const nowMs = state.deps.nowMs();
					for (const agentId of reaperAgentIds) {
						const storePath = state.deps.resolveSessionStorePath ? state.deps.resolveSessionStorePath(agentId) : state.deps.sessionStorePath;
						if (!storePath) continue;
						try {
							await sweepCronRunSessions({
								agentId,
								cronConfig: state.deps.cronConfig,
								sessionStorePath: storePath,
								isAgentAvailable: state.deps.isAgentAvailable,
								nowMs,
								log: state.deps.log
							});
						} catch (err) {
							state.deps.log.warn({
								err: String(err),
								storePath
							}, "cron: session reaper sweep failed");
						}
					}
				}
			}
		} catch (err) {
			state.deps.log.warn({ err: String(err) }, "cron: session reaper preparation failed");
		} finally {
			state.activeTimerTicks = Math.max(0, state.activeTimerTicks - 1);
			state.running = state.activeTimerTicks > 0;
			if (!state.running && state.lifecycleGeneration === generation) armTimer(state);
		}
	}
}
//#endregion
//#region src/cron/service/timer-catchup.ts
function collectStartupCatchupJobs(state, nowMs, opts) {
	if (!state.store) return [];
	const missed = [];
	const skippedJobIds = [];
	const postPersistNotifications = [];
	const committedJobs = commitCronRuntimeRows({
		state,
		jobIds: state.store.jobs.map((job) => job.id),
		operationLabel: "cron.startup-schedules",
		mutate: ({ database, jobs }) => {
			const committed = [];
			for (const job of jobs.values()) {
				if (!isJobEnabled(job) || opts?.skipJobIds?.has(job.id) || hasActiveCronRun(job) || findActiveCronRunReceiptInDatabase({
					database,
					storePath: state.deps.storePath,
					jobId: job.id
				})) continue;
				const backoffUntilMs = job.schedule.kind === "cron" ? resolveJobErrorBackoffUntilMs(job, DEFAULT_ERROR_BACKOFF_SCHEDULE_MS) : void 0;
				if (backoffUntilMs !== void 0 && nowMs < backoffUntilMs && hasMissedCronSlotSinceLastRun(job, nowMs) && job.state.nextRunAtMs !== backoffUntilMs) {
					job.state.nextRunAtMs = backoffUntilMs;
					committed.push(job);
					continue;
				}
				if (!isRunnableJob({
					job,
					nowMs,
					skipAtIfAlreadyRan: true,
					allowCronMissedRunByLastRun: true
				})) continue;
				if (state.deps.cronConfig?.skipMissedJobs && (job.schedule.kind === "cron" || job.schedule.kind === "every")) {
					if (recomputeJobNextRunAtMs({
						state,
						job,
						nowMs,
						deferredNotifications: postPersistNotifications
					})) committed.push(job);
					skippedJobIds.push(job.id);
				} else missed.push(job);
			}
			return {
				upsertJobIds: committed.map((job) => job.id),
				value: committed
			};
		}
	});
	runPostPersistCronNotifications(state, postPersistNotifications);
	applyCronRuntimeRowsToState(state, committedJobs);
	if (skippedJobIds.length > 0) state.deps.log.info({
		count: skippedJobIds.length,
		jobIds: skippedJobIds
	}, "cron: skipped missed recurring jobs after restart");
	return missed;
}
function commitStartupCatchupRows(params) {
	const postPersistNotifications = [];
	const deferredJobs = params.deferredJobs ?? [];
	const reservationByJobId = new Map(params.reservations.map((reservation) => [reservation.jobId, reservation]));
	const deferredByJobId = new Map(deferredJobs.map((deferred) => [deferred.jobId, deferred]));
	const baseNow = params.state.deps.nowMs();
	let offset = params.staggerMs ?? 0;
	const committedJobs = commitCronRuntimeRows({
		state: params.state,
		jobIds: [...reservationByJobId.keys(), ...deferredByJobId.keys()],
		operationLabel: "cron.startup-catchup-state",
		mutate: ({ database, jobs, receiptSchema }) => {
			const committed = [];
			for (const [jobId, job] of jobs) {
				let changed = false;
				const reservation = reservationByJobId.get(jobId);
				const ownership = params.state.queuedRunReservationsByJobId.get(jobId);
				if (reservation && ownership?.identity === reservation.reservationIdentity) {
					finishCronRunReceiptInDatabase({
						receiptSchema,
						database,
						handle: ownership.runReceipt,
						status: "skipped",
						finishedAtMs: params.state.deps.nowMs(),
						error: "cron startup reservation abandoned before completion"
					});
					if (ownership.activationPreviousLastError) job.state.lastError = ownership.activationPreviousLastError.value;
					if (ownership.markerAtMs === job.state.queuedAtMs) {
						delete job.state.queuedAtMs;
						changed = true;
					}
					if (ownership.markerAtMs === job.state.runningAtMs) {
						delete job.state.runningAtMs;
						delete job.state.runningReceiptId;
						delete job.state.runningScheduleChangeId;
						changed = true;
					}
				}
				const deferred = deferredByJobId.get(jobId);
				if (deferred && isJobEnabled(job) && job.state.queuedAtMs === void 0 && job.state.runningAtMs === void 0 && job.state.nextRunAtMs === deferred.nextRunAtMs && job.state.lastRunAtMs === deferred.lastRunAtMs && job.state.lastRunStatus === deferred.lastRunStatus && job.state.scheduleActivatedAtMs === deferred.scheduleActivatedAtMs && job.createdAtMs === deferred.createdAtMs && job.payload.kind === deferred.payloadKind && deferred.scheduleIdentity !== void 0 && tryCronScheduleIdentity(job) === deferred.scheduleIdentity && !findActiveCronRunReceiptInDatabase({
					database,
					storePath: params.state.deps.storePath,
					jobId
				})) {
					const candidate = typeof deferred.delayMs === "number" ? baseNow + deferred.delayMs + offset - (params.staggerMs ?? 0) : baseNow + offset;
					const runAtMs = resolveNextRunAtMsOrDisable({
						state: params.state,
						job,
						candidate,
						deferredNotifications: postPersistNotifications
					});
					job.state.nextRunAtMs = runAtMs;
					job.state.startupCatchupAtMs = runAtMs;
					offset += params.staggerMs ?? 0;
					changed = true;
				}
				if (changed) committed.push(job);
			}
			return {
				upsertJobIds: committed.map((job) => job.id),
				value: committed
			};
		}
	});
	runPostPersistCronNotifications(params.state, postPersistNotifications);
	applyCronRuntimeRowsToState(params.state, committedJobs);
	for (const reservation of params.reservations) {
		const ownership = params.state.queuedRunReservationsByJobId.get(reservation.jobId);
		if (ownership?.identity === reservation.reservationIdentity) releaseLocalCronRunReceiptOwnership(ownership.runReceipt);
		releaseQueuedCronRun(params.state, reservation.jobId, reservation.reservationIdentity);
	}
}
async function releaseStartupCatchupReservationsAfterFailure(state, plan, outcomes) {
	const startedJobIds = new Set(outcomes.map((outcome) => outcome.jobId));
	await cleanupQueuedCronRunReservations({
		state,
		reservations: plan.candidates.filter((candidate) => !startedJobIds.has(candidate.jobId)),
		recompute: "startup-overflow"
	});
}
/** Runs or defers missed startup jobs using restart catch-up limits. */
async function runMissedJobs(state, opts) {
	if (state.stopped) return;
	const catchup = {};
	state.startupCatchup = catchup;
	try {
		const plan = await planStartupCatchup(state, opts);
		if (plan.candidates.length === 0 && plan.deferredJobs.length === 0) return;
		const completedOutcomeDrain = createCompletedCronRunOutcomeDrain(state, {
			discardWhenStopped: true,
			repairFutureCronNextRunAtMs: false
		});
		const execution = await executeStartupCatchupPlan(state, plan, completedOutcomeDrain);
		let finalizedOutcomes;
		try {
			let completedOutcomes;
			try {
				completedOutcomes = await completedOutcomeDrain.flush();
			} catch (drainError) {
				await applyStartupCatchupOutcomes(state, plan, execution.outcomes);
				throw drainError;
			}
			finalizedOutcomes = await applyStartupCatchupOutcomes(state, plan, completedOutcomes);
		} catch (finalizationError) {
			try {
				await releaseStartupCatchupReservationsAfterFailure(state, plan, execution.outcomes);
			} catch (cleanupError) {
				state.deps.log.warn({ err: String(cleanupError) }, execution.ok ? "cron: failed to release startup catch-up reservations after finalization error" : "cron: failed to release startup catch-up reservations after execution error");
			}
			throw execution.ok ? finalizationError : execution.error;
		}
		for (const outcome of finalizedOutcomes) maybeNotifyIsolatedAgentSetupTimeout(state, outcome);
		if (!execution.ok) throw execution.error;
	} finally {
		if (state.startupCatchup === catchup) state.startupCatchup = void 0;
	}
}
async function planStartupCatchup(state, opts) {
	const lifecycleGeneration = state.lifecycleGeneration;
	const maxImmediate = Math.max(0, state.deps.maxMissedJobsPerRestart ?? 5);
	return locked(state, async () => {
		await ensureLoaded(state);
		if (state.stopped || state.lifecycleGeneration !== lifecycleGeneration || !state.store) return {
			lifecycleGeneration,
			candidates: [],
			deferredJobs: []
		};
		const now = state.deps.nowMs();
		const missed = await skipCronJobsWithoutOwners(state, collectStartupCatchupJobs(state, now, { skipJobIds: opts?.skipJobIds }), now);
		if (missed.length === 0 || state.stopped || state.lifecycleGeneration !== lifecycleGeneration) return {
			lifecycleGeneration,
			candidates: [],
			deferredJobs: []
		};
		const sorted = missed.toSorted((a, b) => (a.state.nextRunAtMs ?? 0) - (b.state.nextRunAtMs ?? 0));
		const deferredAgentJobs = [];
		const startupEligible = [];
		for (const job of sorted) {
			const waitsForAgent = job.payload.kind === "agentTurn" || job.payload.kind === "heartbeat" || isHeartbeatTaskCronJob(job) || job.sessionTarget === "main" && job.payload.kind === "systemEvent" && job.wakeMode === "now";
			(opts?.deferAgentWork && waitsForAgent ? deferredAgentJobs : startupEligible).push(job);
		}
		const startupCandidates = startupEligible.slice(0, maxImmediate);
		const deferredOverflow = startupEligible.slice(maxImmediate);
		const deferredAgentDelayMs = Math.max(0, state.deps.startupDeferredMissedAgentJobDelayMs ?? 12e4);
		const deferredJob = (job, delayMs) => ({
			jobId: job.id,
			...delayMs === void 0 ? {} : { delayMs },
			scheduleIdentity: tryCronScheduleIdentity(job),
			createdAtMs: job.createdAtMs,
			payloadKind: job.payload.kind,
			scheduleActivatedAtMs: job.state.scheduleActivatedAtMs,
			nextRunAtMs: job.state.nextRunAtMs,
			lastRunAtMs: job.state.lastRunAtMs,
			lastRunStatus: job.state.lastRunStatus
		});
		const deferred = [...deferredOverflow.map((job) => deferredJob(job)), ...deferredAgentJobs.map((job) => deferredJob(job, deferredAgentDelayMs))];
		if (deferred.length > 0) state.deps.log.info({
			immediateCount: startupCandidates.length,
			deferredCount: deferred.length,
			totalMissed: missed.length
		}, "cron: staggering missed jobs to prevent gateway overload");
		if (deferredAgentJobs.length > 0) state.deps.log.info({
			count: deferredAgentJobs.length,
			jobIds: deferredAgentJobs.map((job) => job.id),
			delayMs: deferredAgentDelayMs
		}, "cron: deferring missed agent jobs until after gateway startup");
		if (startupCandidates.length > 0) state.deps.log.info({
			count: startupCandidates.length,
			jobIds: startupCandidates.map((j) => j.id)
		}, "cron: running missed jobs after restart");
		const reservedStartupCandidates = await persistQueuedCronRunReservations({
			state,
			candidates: startupCandidates,
			reservedAtMs: now
		});
		return {
			lifecycleGeneration,
			candidates: reservedStartupCandidates.map(({ job, runReceipt }) => ({
				jobId: job.id,
				job,
				reservedAtMs: now,
				reservationIdentity: reserveQueuedCronRun(state, job.id, now, {
					runReceipt,
					lifecycleGeneration
				})
			})),
			deferredJobs: deferred
		};
	});
}
async function executeStartupCatchupPlan(state, plan, completedOutcomeDrain) {
	const outcomes = [];
	try {
		for (const candidate of plan.candidates) {
			if (state.stopped || state.lifecycleGeneration !== plan.lifecycleGeneration) break;
			const execution = await executeQueuedCronRun({
				state,
				jobId: candidate.jobId,
				reservedAtMs: candidate.reservedAtMs,
				reservationIdentity: candidate.reservationIdentity,
				runnableOptions: {
					skipAtIfAlreadyRan: true,
					allowCronMissedRunByLastRun: true
				},
				onNotRunnable: async () => {
					commitStartupCatchupRows({
						state,
						reservations: [candidate]
					});
				}
			});
			if (execution.kind === "stopped") break;
			if (execution.kind === "completed") {
				outcomes.push(execution.outcome);
				completedOutcomeDrain.enqueue(execution.outcome);
			}
		}
	} catch (error) {
		return {
			ok: false,
			outcomes,
			error
		};
	}
	return {
		ok: true,
		outcomes
	};
}
async function applyStartupCatchupOutcomes(state, plan, outcomes) {
	const staggerMs = Math.max(0, state.deps.missedJobStaggerMs ?? 5e3);
	await locked(state, async () => {
		await ensureLoaded(state, { forceReload: true });
		if (!state.store) return;
		const startedJobIds = new Set(outcomes.map((outcome) => outcome.jobId));
		const pendingReleases = plan.candidates.filter((candidate) => !startedJobIds.has(candidate.jobId));
		if (state.stopped || state.lifecycleGeneration !== plan.lifecycleGeneration || outcomes.length === 0 && plan.deferredJobs.length === 0) {
			if (pendingReleases.length > 0) commitStartupCatchupRows({
				state,
				reservations: pendingReleases
			});
			return;
		}
		commitStartupCatchupRows({
			state,
			reservations: pendingReleases,
			deferredJobs: plan.deferredJobs,
			staggerMs
		});
		await recomputeUnownedCronSchedules(state, { repairFutureCronNextRunAtMs: false });
	});
	return outcomes;
}
//#endregion
//#region src/cron/service/timer.ts
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.cronTimerTestApi")] = { onTimer };
//#endregion
//#region src/cron/service/ops-lifecycle.ts
function applyRecoveryResult(params) {
	const { state, proposal, result } = params;
	if (result.kind === "live") {
		enrollForeignReceipt(state, result.receipt);
		params.skipJobIds?.add(proposal.jobId);
		return false;
	}
	if (result.kind === "superseded") {
		if (result.receipt) {
			enrollForeignReceipt(state, result.receipt);
			params.skipJobIds?.add(proposal.jobId);
		} else removeForeignReceipt(state, proposal.jobId);
		return true;
	}
	removeForeignReceipt(state, proposal.jobId);
	runPostPersistCronNotifications(state, result.notifications);
	if (result.interrupted) params.interruptedRuns.push(result.interrupted);
	if (result.skipStartupCatchup) params.skipJobIds?.add(proposal.jobId);
	return true;
}
async function reconcileForeignRunReceipts(state) {
	let schedulingChanged = false;
	const interruptedRuns = [];
	await locked(state, async () => {
		if (state.stopped) return;
		const proposals = listForeignReceipts(state).map((receipt) => {
			const job = state.store?.jobs.find((entry) => entry.id === receipt.jobId);
			return {
				jobId: receipt.jobId,
				queuedAtMs: job?.state.queuedAtMs,
				runningAtMs: job?.state.runningAtMs,
				runningReceiptId: job?.state.runningReceiptId,
				receipt
			};
		});
		try {
			await recoverCronRunProposals(state, proposals, { onRecovery(proposal, result) {
				schedulingChanged = applyRecoveryResult({
					state,
					proposal,
					result,
					interruptedRuns
				}) || schedulingChanged;
			} });
		} finally {
			if (schedulingChanged) {
				await ensureLoaded(state, { forceReload: true });
				for (const interrupted of interruptedRuns) await emitInterruptedCronRun(state, interrupted);
			}
		}
	});
	if (schedulingChanged && state.schedulerStarted) armTimer(state);
}
/** Waits for receipt retirement without reserving a run or extending its timeout response. */
async function waitForRunSettlement(state, jobId, signal) {
	const generation = state.lifecycleGeneration;
	while (true) {
		const result = await racePromiseWithAbortSignal(locked(state, async () => {
			if (signal.aborted || state.stopped || state.lifecycleGeneration !== generation) return { settled: false };
			await ensureLoaded(state);
			if (signal.aborted || state.stopped || state.lifecycleGeneration !== generation) return { settled: false };
			const job = state.store?.jobs.find((entry) => entry.id === jobId);
			const proposal = {
				jobId,
				queuedAtMs: job?.state.queuedAtMs,
				runningAtMs: job?.state.runningAtMs
			};
			let recovery;
			let changed = false;
			const interruptedRuns = [];
			try {
				await recoverCronRunProposals(state, [proposal], {
					signal,
					onRecovery(observed, recovered) {
						recovery = recovered;
						changed = applyRecoveryResult({
							state,
							proposal: observed,
							result: recovered,
							interruptedRuns
						});
					}
				});
			} finally {
				if (changed) {
					await ensureLoaded(state, { forceReload: true });
					for (const interrupted of interruptedRuns) await emitInterruptedCronRun(state, interrupted);
					if (state.schedulerStarted) armTimer(state);
				}
			}
			if (!recovery || signal.aborted || state.stopped || state.lifecycleGeneration !== generation) return { settled: false };
			if (recovery.kind === "repaired" || !recovery.receipt) return { settled: true };
			configureForeignReceiptMonitor(state, async () => await reconcileForeignRunReceipts(state));
			return { waiting: waitForForeignReceipt(state, jobId, signal) };
		}), signal).catch((error) => {
			if (signal.aborted && isAbortError(error)) return { settled: false };
			throw error;
		});
		if ("settled" in result) return result.settled;
		if (!await result.waiting) return false;
	}
}
/** Starts the cron service, atomically repairs abandoned runs, and arms scheduling. */
async function start(state) {
	state.stopped = false;
	const generation = state.lifecycleGeneration;
	stopForeignReceiptMonitor(state);
	configureForeignReceiptMonitor(state, async () => await reconcileForeignRunReceipts(state));
	if (!state.deps.cronEnabled) {
		state.deps.log.info({ enabled: false }, "cron: disabled");
		return;
	}
	const skipJobIds = /* @__PURE__ */ new Set();
	await locked(state, async () => {
		const interruptedRuns = [];
		await ensureLoaded(state);
		if (state.stopped || state.lifecycleGeneration !== generation) return;
		if (state.deps.legacyDefaultAgentId) {
			const rewritten = await materializeLegacyDefaultCronJobOwners({
				storePath: state.deps.storePath,
				legacyDefaultAgentId: state.deps.legacyDefaultAgentId
			});
			if (rewritten > 0) {
				state.deps.log.info({
					storePath: state.deps.storePath,
					rewritten
				}, "cron: assigned legacy jobs to the retained owner");
				await ensureLoaded(state, { forceReload: true });
			}
		}
		if (state.stopped || state.lifecycleGeneration !== generation) return;
		const proposals = [];
		for (const job of state.store?.jobs ?? []) {
			job.state ??= {};
			if (typeof job.state.queuedAtMs === "number") proposals.push({
				jobId: job.id,
				queuedAtMs: job.state.queuedAtMs
			});
			if (typeof job.state.runningAtMs === "number") proposals.push({
				jobId: job.id,
				runningAtMs: job.state.runningAtMs
			});
		}
		try {
			await recoverCronRunProposals(state, proposals, {
				mode: "startup",
				onRecovery(proposal, result) {
					applyRecoveryResult({
						state,
						proposal,
						result,
						interruptedRuns,
						skipJobIds
					});
				}
			});
		} finally {
			if (proposals.length > 0) await ensureLoaded(state, { forceReload: true });
			for (const interrupted of interruptedRuns) await emitInterruptedCronRun(state, interrupted);
		}
		if (state.stopped || state.lifecycleGeneration !== generation) return;
		if (listForeignReceipts(state).length > 0) await recomputeUnownedCronSchedules(state);
	});
	if (state.stopped || state.lifecycleGeneration !== generation) return;
	try {
		await runMissedJobs(state, {
			skipJobIds: skipJobIds.size > 0 ? skipJobIds : void 0,
			deferAgentWork: true
		});
	} catch (err) {
		if (!state.stopped && state.lifecycleGeneration === generation) {
			state.schedulerStarted = true;
			try {
				armTimer(state);
				resumeForeignReceiptMonitor(state);
			} catch (armError) {
				state.deps.log.warn({ err: String(armError) }, "cron: failed to arm scheduling after startup catch-up failed");
			}
		}
		throw err;
	}
	await locked(state, async () => {
		await ensureLoaded(state, { forceReload: true });
		if (state.stopped || state.lifecycleGeneration !== generation) return;
		if (listForeignReceipts(state).length === 0) await recomputeUnownedCronSchedules(state, { recomputeExpired: true });
		if (state.stopped || state.lifecycleGeneration !== generation) return;
		armTimer(state);
		resumeForeignReceiptMonitor(state);
		state.deps.log.info({
			enabled: true,
			jobs: state.store?.jobs.length ?? 0,
			nextWakeAtMs: nextWakeAtMs(state) ?? null
		}, "cron: started");
	});
}
/** Stops the cron service timer without mutating persisted job state. */
function stop(state) {
	state.lifecycleGeneration += 1;
	state.stopped = true;
	cancelCronRunAdmissionWaiters(state);
	state.schedulerStarted = false;
	stopForeignReceiptMonitor(state);
	stopTimer(state);
}
/** Temporarily stops automatic ticks without running startup recovery on resume. */
function pauseScheduling(state) {
	state.schedulingPaused = true;
	stopTimer(state);
}
function resumeScheduling(state) {
	if (!state.schedulingPaused) return;
	state.schedulingPaused = false;
	if (!state.schedulerStarted) return;
	try {
		armTimer(state);
		resumeForeignReceiptMonitor(state);
	} catch (err) {
		state.schedulingPaused = true;
		stopTimer(state);
		throw err;
	}
}
//#endregion
//#region src/cron/service/jobs-mutation.ts
/** Completes a canonical job edit before authority rebinding and persistence. */
/** Keep the harness-owned immutable envelope intact when copying mutable job fields. */
function cloneCronJobForMutation(job) {
	const { runtimeAuthority, ...mutableJob } = job;
	return {
		...structuredClone(mutableJob),
		...runtimeAuthority ? { runtimeAuthority } : {}
	};
}
function reconcileStreamSourceIdentity(job, nextJob) {
	if (nextJob.schedule.kind !== "stream") {
		nextJob.state.streamSourceIdentity = void 0;
		return;
	}
	const sourceChanged = job.schedule.kind !== "stream" || cronStreamScheduleKey(job.schedule) !== cronStreamScheduleKey(nextJob.schedule) || isJobEnabled(job) !== isJobEnabled(nextJob);
	const currentIdentity = job.schedule.kind === "stream" ? job.state.streamSourceIdentity : void 0;
	nextJob.state.streamSourceIdentity = sourceChanged || !currentIdentity ? createCronStreamSourceIdentity() : currentIdentity;
}
function finalizeUpdatedJob(params) {
	const { job, nextJob, now } = params;
	if (nextJob.schedule.kind === "every") {
		const anchor = nextJob.schedule.anchorMs;
		if (typeof anchor !== "number" || !Number.isFinite(anchor)) {
			const fallbackAnchorMs = (job.schedule.kind === "every" && job.schedule.everyMs === nextJob.schedule.everyMs && typeof job.schedule.anchorMs === "number" && Number.isFinite(job.schedule.anchorMs) ? job.schedule.anchorMs : void 0) ?? (params.scheduleChanged ? now : typeof nextJob.createdAtMs === "number" && Number.isFinite(nextJob.createdAtMs) ? nextJob.createdAtMs : now);
			nextJob.schedule = {
				...nextJob.schedule,
				anchorMs: Math.max(0, Math.floor(fallbackAnchorMs))
			};
		}
	}
	reconcileStreamSourceIdentity(job, nextJob);
	const previousScript = job.payload.kind === "script" ? job.payload.script : void 0;
	const nextScript = nextJob.payload.kind === "script" ? nextJob.payload.script : void 0;
	if (!isDeepStrictEqual(job.trigger, nextJob.trigger) || previousScript !== nextScript) for (const field of [
		"triggerState",
		"triggerEvalCount",
		"lastTriggerEvalAtMs",
		"lastTriggerFireAtMs"
	]) if (params.explicitTriggerState && Object.hasOwn(params.explicitTriggerState, field)) Object.assign(nextJob.state, { [field]: params.explicitTriggerState[field] });
	else delete nextJob.state[field];
	const schedulingInputsChanged = params.schedulingInputsRequested && !cronSchedulingInputsEqual(job, nextJob);
	if (params.scheduleChanged && nextJob.schedule.kind === "cron" && !isJobEnabled(nextJob)) computeJobNextRunAtMs({
		...nextJob,
		enabled: true
	}, now);
	nextJob.updatedAtMs = now;
	if (schedulingInputsChanged) {
		nextJob.state.scheduleActivatedAtMs = now;
		nextJob.state.startupCatchupAtMs = void 0;
		nextJob.state.pacedNextRunAtMs = void 0;
		nextJob.state.forcePreservedNextRunAtMs = cronSchedulingInputsEqual({
			...job,
			enabled: nextJob.enabled
		}, nextJob) ? resolveForcePreservedOneShotAtMs(job) : void 0;
		if (isJobEnabled(nextJob)) nextJob.state.nextRunAtMs = computeJobNextRunAtMs(nextJob, now);
		else {
			nextJob.state.nextRunAtMs = void 0;
			nextJob.state.queuedAtMs = void 0;
			if (!isCronJobActive(nextJob.id)) {
				Object.assign(nextJob.state, {
					runningAtMs: void 0,
					runningReceiptId: void 0
				});
				delete nextJob.state.runningScheduleChangeId;
			}
		}
	} else if (isJobEnabled(nextJob) && !hasScheduledNextRunAtMs(nextJob.state.nextRunAtMs)) nextJob.state.nextRunAtMs = computeJobNextRunAtMs(nextJob, now);
	if (nextJob.state.runningAtMs !== job.state.runningAtMs) delete nextJob.state.runningReceiptId;
}
//#endregion
//#region src/cron/service/ops-shared.ts
/** Shared cron operation invariants used across lifecycle, CRUD, and manual runs. */
function markManualCronJobActive(state, job, runReceipt) {
	state.activeManualRunJobIds.add(job.id);
	return markServiceCronJobActive(state, job, runReceipt);
}
function clearManualCronJobActive(state, jobId, activeJobMarker) {
	state.activeManualRunJobIds.delete(jobId);
	clearCronJobActive(jobId, activeJobMarker);
	if (state.activeManualRunJobIds.size === 0) state.manualSetupTimeoutNotified = false;
}
function maybeNotifyManualIsolatedSetupTimeout(state, result) {
	if (!result.isolatedAgentSetupTimeout || state.manualSetupTimeoutNotified) return false;
	const notified = maybeNotifyIsolatedAgentSetupTimeout(state, result);
	state.manualSetupTimeoutNotified ||= notified;
	return notified;
}
async function ensureLoadedForRead(state) {
	await ensureLoadedForOperation(state);
	if (!state.store || state.schedulerStarted) return;
	await recomputeUnownedCronSchedules(state);
}
/** Resolves the current configured default agent without caching reloadable state. */
function resolveCurrentDefaultAgentId(state) {
	return state.deps.resolveDefaultAgentId ? state.deps.resolveDefaultAgentId() : state.deps.defaultAgentId;
}
/** Returns whether a stream event still belongs to the job's current logical source. */
function ownsStreamSource(job, streamScheduleKey, streamSourceIdentity) {
	return job.schedule.kind === "stream" && cronStreamScheduleKey(job.schedule) === streamScheduleKey && job.state.streamSourceIdentity === streamSourceIdentity;
}
//#endregion
//#region src/cron/service/ops-mutations.ts
const RETRY_ADD_AFTER_SESSION_CLEANUP = /* @__PURE__ */ new Error("retry add after session cleanup");
/** Cancels only caller-corroborated definitions while the durable lifecycle fence holds. */
async function quiesceJobs(state, jobs, commitGuard) {
	await locked(state, async () => {
		await ensureLoadedForOperation(state);
		for (const expected of jobs) {
			const job = state.store?.jobs.find((candidate) => candidate.id === expected.id);
			if (!job || resolveCronJobConfigRevision(job) !== expected.revision) throw new Error(`Cron job ${expected.id} changed before cancellation.`);
		}
		commitGuard();
		for (const job of jobs) requestActiveCronJobCancellation(job.id, "Claw agent removal.");
	});
}
async function persistUpdatedJob(params) {
	const { state, snapshot, previousJob, nextJob, persistStore } = params;
	const reservation = state.queuedRunReservationsByJobId.get(nextJob.id);
	const preservesOnExitRearm = reservation?.onExit === true && reservation.lifecycleGeneration === state.lifecycleGeneration && reservation.markerAtMs === previousJob.state.queuedAtMs && previousJob.schedule.kind === "on-exit" && !previousJob.enabled && nextJob.enabled && resolveCronJobConfigRevision(previousJob) === resolveCronJobConfigRevision({
		...nextJob,
		enabled: false
	});
	if (nextJob.state.queuedAtMs !== void 0 && !preservesOnExitRearm && resolveCronJobConfigRevision(previousJob) !== resolveCronJobConfigRevision(nextJob)) delete nextJob.state.queuedAtMs;
	if (state.store) {
		const index = state.store.jobs.findIndex((entry) => entry.id === nextJob.id);
		if (index >= 0) state.store.jobs[index] = nextJob;
	}
	const triggerStateChanged = !isDeepStrictEqual(previousJob.trigger, nextJob.trigger) || !isDeepStrictEqual(previousJob.state.triggerState, nextJob.state.triggerState) || (previousJob.payload.kind === "script" || nextJob.payload.kind === "script") && !isDeepStrictEqual(previousJob.payload, nextJob.payload);
	const scheduleChanged = !cronSchedulingInputsEqual(previousJob, nextJob);
	const messageActionAuthorityChanged = isJobEnabled(previousJob) && !isJobEnabled(nextJob) || !cronJobMessageToolAuthorityInputsEqual(previousJob, nextJob);
	const messageSourceAuthorityChanged = !cronJobMessageActionAuthorityInputsEqual(previousJob, nextJob) || triggerStateChanged && Boolean(resolveCronAuthenticatedChannelRequester(previousJob) || resolveCronAuthenticatedChannelRequester(nextJob) || resolveCronAuthenticatedCallerOrigin(previousJob) || resolveCronAuthenticatedCallerOrigin(nextJob));
	await persistStore(state, snapshot, {
		suppressScheduledJobId: nextJob.id,
		transactionHooks: withCronMutationCommitHook(params.mutationMethod, cronRunReceiptMutationHooks({
			state,
			jobId: nextJob.id,
			ownerHooks: params.ownerHooks,
			triggerStateChanged,
			messageActionAuthorityChanged,
			messageSourceAuthorityChanged,
			...scheduleChanged ? { scheduleChangedJob: nextJob } : {}
		}))
	});
	if (isJobEnabled(previousJob) && !isJobEnabled(nextJob)) requestActiveCronJobCancellation(nextJob.id, "Cron job disabled by operator.");
	if (triggerStateChanged) noteActiveCronJobTriggerMutation(nextJob.id);
	armTimer(state);
	emit(state, {
		jobId: nextJob.id,
		action: "updated",
		job: nextJob,
		nextRunAtMs: nextJob.state.nextRunAtMs
	});
}
/** Adds or converges a declaration-keyed cron job inside one store lock and write transaction. */
async function add(state, input, opts) {
	let pendingSessionCleanup;
	return await locked(state, async () => {
		warnIfDisabled(state, "add");
		if (input.payload.kind === "heartbeat" && opts?.systemOwned !== true) throw new Error("system-owned payloads cannot be created by cron clients");
		const declarationKey = normalizeOptionalString(input.declarationKey);
		const systemOwnedDeclarationNamespace = systemOwnedDeclarationKeyNamespace(declarationKey);
		if (systemOwnedDeclarationNamespace && opts?.systemOwned !== true) throw new Error(`cron declarationKey namespace "${systemOwnedDeclarationNamespace}" is system-owned; jobs cannot be created with it`);
		await ensureLoadedForOperation(state);
		const agentId = resolveCronJobEffectiveAgentId(input, resolveCurrentDefaultAgentId(state));
		if (state.deps.isAgentAvailable?.(agentId) === false) throw new Error(describeUnavailableCronAgent(agentId));
		const normalizedId = normalizeOptionalString(input.id);
		if (input.id !== void 0 && !normalizedId) throw new Error("cron job id must not be blank");
		if (normalizedId) {
			normalizeCronRunJobId(normalizedId);
			pendingSessionCleanup = getPendingCronSessionCleanup(state, normalizedId);
			if (pendingSessionCleanup) throw RETRY_ADD_AFTER_SESSION_CLEANUP;
		}
		const normalizedInput = normalizedId ? {
			...input,
			id: normalizedId
		} : input;
		const matches = declarationKey ? state.store?.jobs.filter((job) => job.declarationKey === declarationKey && (opts?.matchesExisting?.(job) ?? true)) ?? [] : [];
		if (matches.length > 1) throw new Error(`cron declarationKey is ambiguous within caller scope: ${declarationKey}`);
		const existing = matches[0];
		const configuredChannels = await resolveConfiguredChannelsForValidation(state);
		const persistStore = opts?.commitGuard !== void 0 || opts?.captureRuntimeAuthority !== void 0 ? persistNativeOrRestore : persistOrRestore;
		if (existing) {
			const now = state.deps.nowMs();
			const nextJob = cloneCronJobForMutation(existing);
			applyDeclarativeJobSpec(nextJob, normalizedInput, {
				defaultAgentId: state.deps.defaultAgentId,
				enabledExplicit: opts?.enabledExplicit === true,
				nowMs: now,
				cronConfig: state.deps.cronConfig,
				scheduledToolPolicy: opts?.scheduledToolPolicy,
				toolsAllowProvenance: opts?.toolsAllowProvenance,
				toolsAllowExecTarget: opts?.toolsAllowExecTarget,
				configuredChannels
			});
			finalizeUpdatedJob({
				job: existing,
				nextJob,
				now,
				schedulingInputsRequested: true,
				scheduleChanged: !isDeepStrictEqual(existing.schedule, nextJob.schedule),
				explicitTriggerState: normalizedInput.state
			});
			const runtimeAuthorityMutation = consumeRuntimeAuthorityMutationOptions(opts);
			reconcileRuntimeAuthority({
				job: nextJob,
				...runtimeAuthorityMutation,
				explicitlyMutatesToolsAllow: normalizedInput.payload.toolsAllow !== void 0
			});
			reconcileCronChannelRequesterAuthority({
				job: nextJob,
				previousJob: existing,
				toolsAllowProvenance: opts?.toolsAllowProvenance,
				reauthorize: true
			});
			const includeEnabled = opts?.enabledExplicit === true;
			if (isDeepStrictEqual(declarativeFields(existing, includeEnabled), declarativeFields(nextJob, includeEnabled))) return {
				...existing,
				created: false,
				updated: false,
				job: existing
			};
			await persistUpdatedJob({
				state,
				snapshot: snapshotStoreForRollback(state),
				previousJob: existing,
				nextJob,
				persistStore,
				mutationMethod: "cron.add"
			});
			return {
				...nextJob,
				created: false,
				updated: true,
				job: nextJob
			};
		}
		if (normalizedId && state.store?.jobs.some((job) => job.id === normalizedId)) throw new Error(`cron job already exists: ${normalizedId}`);
		const explicitOwnerAgentId = normalizeOptionalAgentId(normalizedInput.agentId) ?? parseAgentSessionKey(normalizeOptionalString(normalizedInput.sessionKey))?.agentId;
		const retainedLegacyAgentId = normalizeOptionalAgentId(state.deps.legacyDefaultAgentId);
		const creationInput = !explicitOwnerAgentId && retainedLegacyAgentId === agentId ? {
			...normalizedInput,
			agentId
		} : normalizedInput;
		const snapshot = snapshotStoreForRollback(state);
		const job = createJob(state, creationInput, {
			scheduledToolPolicy: opts?.scheduledToolPolicy,
			toolsAllowProvenance: opts?.toolsAllowProvenance,
			toolsAllowExecTarget: opts?.toolsAllowExecTarget,
			configuredChannels
		});
		if (opts?.createdActor) job.createdActor = structuredClone(opts.createdActor);
		if (opts?.skillLibrarySelections) job.skillLibrarySelections = structuredClone(opts.skillLibrarySelections);
		const runtimeAuthorityMutation = consumeRuntimeAuthorityMutationOptions(opts);
		reconcileRuntimeAuthority({
			job,
			...runtimeAuthorityMutation,
			explicitlyMutatesToolsAllow: normalizedInput.payload.toolsAllow !== void 0
		});
		reconcileCronChannelRequesterAuthority({
			job,
			toolsAllowProvenance: opts?.toolsAllowProvenance
		});
		state.store?.jobs.push(job);
		const postPersistNotifications = [];
		recomputeNextRunsForMaintenance(state, { deferredNotifications: postPersistNotifications });
		await persistStore(state, snapshot, {
			postPersistNotifications,
			suppressScheduledJobId: job.id,
			transactionHooks: withCronMutationCommitHook("cron.add")
		});
		armTimer(state);
		state.deps.log.info({
			jobId: job.id,
			jobName: job.name,
			nextRunAtMs: job.state.nextRunAtMs,
			schedulerNextWakeAtMs: nextWakeAtMs(state) ?? null,
			timerArmed: state.timer !== null,
			cronEnabled: state.deps.cronEnabled
		}, "cron: job added");
		emit(state, {
			jobId: job.id,
			action: "added",
			job,
			nextRunAtMs: job.state.nextRunAtMs
		});
		return declarationKey ? {
			...job,
			created: true,
			job
		} : job;
	}).catch(async (error) => {
		if (error !== RETRY_ADD_AFTER_SESSION_CLEANUP || !pendingSessionCleanup) throw error;
		await pendingSessionCleanup;
		return await add(state, input, opts);
	});
}
/** Prunes an owned job family from obsolete store partitions after active-store convergence. */
async function removeStaleJobFamily(state, family, opts) {
	return await locked(state, async () => {
		await ensureLoadedForOperation(state);
		return await removeStaleCronJobFamilyRows(state.deps.storePath, family, opts);
	});
}
async function updateLoadedJob(params) {
	const { state, id, patch, precondition, opts } = params;
	warnIfDisabled(state, "update");
	if (patch.payload?.kind === "heartbeat") throw new Error("system-owned payloads cannot be patched by cron clients");
	await ensureLoadedForOperation(state);
	const job = findJobOrThrow(state, id);
	if (isSystemMonitorDeclaration(job.declarationKey)) throw new Error("system-owned monitor jobs cannot be edited by cron clients");
	const now = state.deps.nowMs();
	const configuredChannels = cronPatchTouchesDeliveryResolution(patch) ? await resolveConfiguredChannelsForValidation(state) : void 0;
	await precondition?.(structuredClone(job), now);
	const nextJob = cloneCronJobForMutation(job);
	applyJobPatch(nextJob, patch, {
		defaultAgentId: resolveCurrentDefaultAgentId(state),
		scheduleValidationNowMs: now,
		cronConfig: state.deps.cronConfig,
		scheduledToolPolicy: opts?.scheduledToolPolicy,
		toolsAllowProvenance: opts?.toolsAllowProvenance,
		toolsAllowExecTarget: opts?.toolsAllowExecTarget,
		configuredChannels
	});
	if (patch.agentId !== void 0) {
		const agentId = resolveCronJobEffectiveAgentId(nextJob, resolveCurrentDefaultAgentId(state));
		if (state.deps.isAgentAvailable?.(agentId) === false) throw new Error(describeUnavailableCronAgent(agentId));
	}
	finalizeUpdatedJob({
		job,
		nextJob,
		now,
		schedulingInputsRequested: patch.schedule !== void 0 || patch.enabled !== void 0 || "trigger" in patch || "pacing" in patch,
		scheduleChanged: patch.schedule !== void 0,
		explicitTriggerState: patch.state
	});
	const persistStore = precondition !== void 0 || opts?.commitGuard !== void 0 || opts?.captureRuntimeAuthority !== void 0 ? persistNativeOrRestore : persistOrRestore;
	const ownerPreparation = prepareCronRunReceiptOwnerMutationHooks({
		state,
		previousJob: job,
		nextJob
	});
	const ownerHooks = ownerPreparation ? await ownerPreparation : void 0;
	const runtimeAuthorityMutation = consumeRuntimeAuthorityMutationOptions(opts);
	reconcileRuntimeAuthority({
		job: nextJob,
		...runtimeAuthorityMutation,
		explicitlyMutatesToolsAllow: patch.payload !== void 0 && Object.hasOwn(patch.payload, "toolsAllow")
	});
	reconcileCronChannelRequesterAuthority({
		job: nextJob,
		previousJob: job,
		toolsAllowProvenance: opts?.toolsAllowProvenance,
		reauthorize: patch.payload !== void 0 && Object.hasOwn(patch.payload, "toolsAllow"),
		reauthorizeCallerOrigin: patch.payload !== void 0 && Object.hasOwn(patch.payload, "toolsAllow")
	});
	await persistUpdatedJob({
		state,
		snapshot: snapshotStoreForRollback(state),
		previousJob: job,
		nextJob,
		persistStore,
		mutationMethod: "cron.update",
		ownerHooks
	});
	return nextJob;
}
/** Updates a cron job patch in-place, recomputes affected schedule state, and persists it. */
async function update(state, id, patch, opts) {
	return await locked(state, async () => await updateLoadedJob({
		state,
		id,
		patch,
		opts
	}));
}
/** Updates a cron job only after a store-locked caller precondition passes. */
async function updateWithPrecondition(state, id, patch, precondition, opts) {
	return await locked(state, async () => await updateLoadedJob({
		state,
		id,
		patch,
		precondition,
		opts
	}));
}
/** Removes a cron job by id and re-arms the timer when the in-memory store changes. */
async function remove(state, id, opts) {
	let sessionCleanup;
	const result = await locked(state, async () => {
		warnIfDisabled(state, "remove");
		const previousStore = state.store;
		await ensureLoadedForOperation(state);
		if (!state.store) return {
			ok: false,
			removed: false
		};
		const removedJob = state.store.jobs.find((j) => j.id === id);
		if (!removedJob) {
			if (state.store !== previousStore) armTimer(state);
			return {
				ok: true,
				removed: false
			};
		}
		if (isSystemMonitorDeclaration(removedJob.declarationKey) && opts?.systemOwned !== true) throw new Error("system-owned monitor jobs cannot be removed by cron clients");
		const persistStore = opts?.commitGuard ? persistNativeOrRestore : persistOrRestore;
		opts?.commitGuard?.();
		const snapshot = snapshotStoreForRollback(state);
		state.store.jobs = state.store.jobs.filter((j) => j.id !== id);
		const postPersistNotifications = [];
		recomputeNextRunsForMaintenance(state, { deferredNotifications: postPersistNotifications });
		await persistStore(state, snapshot, {
			postPersistNotifications,
			suppressScheduledJobId: id,
			transactionHooks: withCronMutationCommitHook("cron.remove")
		});
		const activeMarker = noteActiveCronJobRemoval(id, opts?.commitGuard);
		const agentId = resolveCronJobEffectiveAgentId(removedJob, resolveCurrentDefaultAgentId(state));
		const sessionStorePath = state.deps.resolveSessionStorePath?.(agentId) ?? state.deps.sessionStorePath;
		if (sessionStorePath && (removedJob.sessionTarget === "isolated" || removedJob.sessionTarget === "current")) {
			let finish;
			const done = new Promise((resolve) => {
				finish = resolve;
			});
			const release = registerPendingCronSessionCleanup(state, id, done, agentId);
			sessionCleanup = {
				activeMarker,
				agentId,
				sessionStorePath,
				done,
				finish,
				release
			};
		}
		pruneCronJobScratchAfterCommit(state, [id]);
		armTimer(state);
		emit(state, {
			jobId: id,
			action: "removed",
			job: removedJob
		});
		return {
			ok: true,
			removed: true
		};
	});
	if (!sessionCleanup) return result;
	const { activeMarker, agentId, sessionStorePath, finish, release } = sessionCleanup;
	const cleanup = async () => {
		try {
			if (await locked(state, async () => {
				await ensureLoaded(state);
				return !state.store?.jobs.some((job) => job.id === id);
			})) await removeCronJobBaseSession({
				agentId,
				jobId: id,
				sessionStorePath
			});
			return;
		} catch (error) {
			const message = `Cron job ${id} was removed, but session cleanup failed: ${String(error)}. Use openclaw sessions list --json, then openclaw sessions delete to retry.`;
			state.deps.log.warn({
				jobId: id,
				err: message
			}, "cron: session cleanup failed");
			return message;
		} finally {
			release();
			finish();
		}
	};
	if (activeMarker) {
		onCronJobInactive(activeMarker, () => void cleanup());
		return {
			...result,
			sessionCleanup: "pending"
		};
	}
	const cleanupError = await cleanup();
	if (cleanupError) throw new Error(cleanupError);
	return result;
}
/** Remove one agent's jobs while holding the cron lock across an external roster commit. */
async function removeAgentJobsTransactional(state, agentId, commit) {
	return await locked(state, async () => {
		warnIfDisabled(state, "remove agent jobs");
		await ensureLoadedForOperation(state);
		const id = normalizeOptionalAgentId(agentId);
		if (!id || !state.store) return await commit();
		const defaultAgentId = resolveCurrentDefaultAgentId(state);
		const removedJobs = state.store.jobs.filter((job) => resolveCronJobEffectiveAgentId(job, defaultAgentId) === id);
		if (removedJobs.length === 0) return await commit();
		const snapshot = snapshotStoreForRollback(state);
		state.store.jobs = state.store.jobs.filter((job) => resolveCronJobEffectiveAgentId(job, defaultAgentId) !== id);
		const postPersistNotifications = [];
		recomputeNextRunsForMaintenance(state, { deferredNotifications: postPersistNotifications });
		await persistOrRestore(state, snapshot);
		let result;
		try {
			result = await commit();
		} catch (error) {
			if (error instanceof AgentDeletionCommitUncertainError) {
				runPostPersistCronNotifications(state, postPersistNotifications);
				armTimer(state);
				for (const job of removedJobs) noteActiveCronJobRemoval(job.id);
				pruneCronJobScratchAfterCommit(state, removedJobs.map((job) => job.id));
				for (const job of removedJobs) emit(state, {
					jobId: job.id,
					action: "removed",
					job
				});
				throw error;
			}
			try {
				if (state.deps.cronEnabled) {
					state.store = snapshot.store;
					state.durableNextRunAtMsByJobId = snapshot.durableNextRunAtMsByJobId;
					if (!await persist(state)) throw new Error("cron: rollback store write did not complete", { cause: error });
				} else {
					const deletedSnapshot = snapshotStoreForRollback(state);
					state.store = snapshot.store;
					state.durableNextRunAtMsByJobId = snapshot.durableNextRunAtMsByJobId;
					await persistOrRestore(state, deletedSnapshot, { preserveConcurrentAdds: true });
				}
				armTimer(state);
			} catch (rollbackError) {
				throw new AgentDeletionAuthorityRollbackError([error, rollbackError], `cron: failed to roll back agent job deletion for ${id}`, { cause: error });
			}
			throw error;
		}
		runPostPersistCronNotifications(state, postPersistNotifications);
		for (const job of removedJobs) noteActiveCronJobRemoval(job.id);
		pruneCronJobScratchAfterCommit(state, removedJobs.map((job) => job.id));
		armTimer(state);
		for (const job of removedJobs) emit(state, {
			jobId: job.id,
			action: "removed",
			job
		});
		return result;
	});
}
//#endregion
//#region src/cron/list-snapshot-revision.ts
function resolveCronListSnapshotRevision(jobs) {
	return `sha256:${sha256Base64Url(stableStringify(jobs))}`;
}
//#endregion
//#region src/cron/service/list-page-sort.ts
function sortCronJobs(jobs, sortBy, sortDir) {
	const dir = sortDir === "desc" ? -1 : 1;
	let compareNames;
	jobs.sort((a, b) => {
		let cmp = 0;
		if (sortBy === "name") {
			const aName = typeof a.name === "string" ? a.name : "";
			const bName = typeof b.name === "string" ? b.name : "";
			compareNames ??= new Intl.Collator(void 0, { sensitivity: "base" }).compare;
			cmp = compareNames(aName, bName);
		} else if (sortBy === "updatedAtMs") cmp = a.updatedAtMs - b.updatedAtMs;
		else {
			const aNext = a.state.nextRunAtMs;
			const bNext = b.state.nextRunAtMs;
			if (typeof aNext === "number" && typeof bNext === "number") cmp = aNext - bNext;
			else if (typeof aNext === "number" || typeof bNext === "number") return typeof aNext === "number" ? -1 : 1;
		}
		if (cmp !== 0) return cmp * dir;
		const aId = typeof a.id === "string" ? a.id : "";
		const bId = typeof b.id === "string" ? b.id : "";
		return aId.localeCompare(bId);
	});
	return jobs;
}
//#endregion
//#region src/cron/service/ops-run-preparation.ts
async function emitCronRunFinished(state, evt, tracker, taskRunId, details) {
	const event = {
		...evt,
		completionStatus: evt.completionStatus ?? resolveCronCompletionStatus({
			status: evt.status,
			deliveryStatus: evt.deliveryStatus
		})
	};
	await finishCronRun(state, {
		taskRunId,
		job: evt.job,
		event,
		errorClassification: details?.errorClassification,
		...details?.scriptResult ? { scriptResult: details.scriptResult } : {},
		...details?.triggerEval ? { triggerEval: details.triggerEval } : {}
	});
	emit(state, event, cronFailureNotificationEventContext(details?.failureNotificationDetail));
	if (tracker) tracker.emitted = true;
}
function admitsStreamSourceRun(job, streamScheduleKey, streamSourceIdentity) {
	if (streamScheduleKey === void 0 && streamSourceIdentity === void 0) return true;
	return streamScheduleKey !== void 0 && streamSourceIdentity !== void 0 && isJobEnabled(job) && ownsStreamSource(job, streamScheduleKey, streamSourceIdentity);
}
async function skipInvalidPersistedManualRun(params) {
	const postPersistNotifications = [];
	const endedAt = params.state.deps.nowMs();
	const errorText = normalizeCronRunErrorText(params.error);
	const diagnostics = createCronRunDiagnosticsFromError("cron-preflight", errorText, {
		severity: "warn",
		nowMs: params.state.deps.nowMs
	});
	const configRevision = resolveCronJobConfigRevision(params.job);
	applyJobResult(params.state, params.job, {
		status: "skipped",
		completionStatus: "failed",
		error: errorText,
		diagnostics,
		startedAt: endedAt,
		endedAt
	}, {
		scheduleMode: isImmediateCronRunMode(params.mode) ? "preserve" : "advance",
		deferredNotifications: postPersistNotifications
	});
	const committedJob = commitCronRuntimeRows({
		state: params.state,
		jobIds: [params.job.id],
		operationLabel: "cron.invalid-manual-run",
		mutate: ({ jobs }) => {
			const current = jobs.get(params.job.id);
			if (!current || resolveCronJobConfigRevision(current) !== configRevision) return { value: void 0 };
			current.enabled = params.job.enabled;
			current.updatedAtMs = params.job.updatedAtMs;
			current.state = structuredClone(params.job.state);
			return {
				upsertJobIds: [current.id],
				value: current
			};
		}
	});
	if (!committedJob) {
		armTimer(params.state);
		return;
	}
	applyCronRuntimeRowsToState(params.state, [committedJob]);
	await emitCronRunFinished(params.state, {
		jobId: params.job.id,
		action: "finished",
		job: params.job,
		status: "skipped",
		error: errorText,
		diagnostics,
		runId: params.runId,
		runAtMs: endedAt,
		durationMs: params.job.state.lastDurationMs,
		nextRunAtMs: params.job.state.nextRunAtMs,
		deliveryStatus: params.job.state.lastDeliveryStatus,
		deliveryError: params.job.state.lastDeliveryError,
		failureNotificationDelivery: failureNotificationDeliveryFromJobState(params.job)
	}, params.terminalTracker);
	runPostPersistCronNotifications(params.state, postPersistNotifications);
	armTimer(params.state);
}
async function recomputeManualRunPreflight(state, id, mode) {
	await recomputeUnownedCronSchedules(state, {
		...isImmediateCronRunMode(mode) ? { preserveExpiredPacedNextRunJobId: id } : {},
		skipScheduleErrorHandling: true
	});
}
async function inspectManualRunPreflight(state, id, mode, opts) {
	warnIfDisabled(state, "run");
	await ensureLoaded(state);
	opts?.commitGuard?.();
	if (state.stopped) return {
		ok: true,
		ran: false,
		reason: "stopped"
	};
	await recomputeManualRunPreflight(state, id, mode);
	opts?.commitGuard?.();
	if (state.stopped) return {
		ok: true,
		ran: false,
		reason: "stopped"
	};
	const job = opts?.onExit ? state.store?.jobs.find((entry) => entry.id === id) : findJobOrThrow(state, id);
	if (!job || opts?.onExit && !matchesOnExitSchedule(job, opts.onExit.schedule)) return {
		ok: true,
		ran: false,
		reason: "not-due"
	};
	if (opts?.onExit && (!isJobEnabled(job) || job.state.autoDisabled)) return {
		ok: true,
		ran: false,
		reason: "disabled"
	};
	if (mode === "if-enabled" && (!isJobEnabled(job) || job.state.autoDisabled)) return {
		ok: true,
		ran: false,
		reason: "disabled"
	};
	if (!admitsStreamSourceRun(job, opts?.streamScheduleKey, opts?.streamSourceIdentity)) return {
		ok: true,
		ran: false,
		reason: "not-due"
	};
	try {
		assertSupportedJobSpec(job);
	} catch (error) {
		await skipInvalidPersistedManualRun({
			state,
			job,
			mode,
			runId: opts?.runId,
			terminalTracker: opts?.terminalTracker,
			error
		});
		return {
			ok: true,
			ran: false,
			reason: "invalid-spec"
		};
	}
	if (hasActiveCronRun(job)) return {
		ok: true,
		ran: false,
		reason: "already-running"
	};
	const now = state.deps.nowMs();
	if (!isJobDue(job, now, { forced: isImmediateCronRunMode(mode) })) return {
		ok: true,
		ran: false,
		reason: "not-due"
	};
	return {
		ok: true,
		runnable: true,
		job
	};
}
async function inspectManualRunDisposition(state, id, mode, opts) {
	const result = await locked(state, () => inspectManualRunPreflight(state, id, mode, opts));
	if (!result.ok) return result;
	if ("reason" in result) return result;
	return {
		ok: true,
		runnable: true
	};
}
async function prepareManualRun(state, id, mode, opts) {
	return await locked(state, async () => {
		const generation = state.lifecycleGeneration;
		const preflight = await inspectManualRunPreflight(state, id, mode, opts);
		if (!preflight.ok || "reason" in preflight) return preflight;
		if (state.lifecycleGeneration !== generation) return {
			ok: true,
			ran: false,
			reason: "stopped"
		};
		const { job } = preflight;
		opts?.commitGuard?.();
		const reservationAt = state.deps.nowMs();
		if (!isJobDue(job, reservationAt, { forced: isImmediateCronRunMode(mode) })) return {
			ok: true,
			ran: false,
			reason: "not-due"
		};
		const internalTracker = opts?.terminalTracker ?? { emitted: false };
		const onExit = opts?.onExit;
		let reservationIdentity;
		let reserved;
		try {
			[reserved] = await persistQueuedCronRunReservations({
				state,
				candidates: [job],
				...isImmediateCronRunMode(mode) ? { immediateJobIds: /* @__PURE__ */ new Set([job.id]) } : {},
				reservedAtMs: reservationAt,
				...isImmediateCronRunMode(mode) ? { scheduleMode: "preserve" } : {},
				manualRun: {
					runId: opts?.runId,
					commitGuard: opts?.commitGuard,
					terminalTracker: internalTracker,
					scheduleOwnershipAtMs: opts?.scheduleOwnershipAtMs,
					...onExit ? { onExit: {
						commitGuard: onExit.commitGuard,
						onReserved: (reservedJob, runReceipt) => {
							reservationIdentity = reserveQueuedCronRun(state, reservedJob.id, reservationAt, {
								runReceipt,
								preserveWhenDisabled: true,
								onExit: true,
								lifecycleGeneration: generation
							});
							onExit.onReserved();
						}
					} } : {}
				}
			});
		} catch (error) {
			if (reservationIdentity) await releasePreparedManualReservationWithRetry(state, {
				jobId: job.id,
				reservationIdentity
			});
			throw error;
		}
		if (!reserved) {
			if (state.stopped || state.lifecycleGeneration !== generation) return {
				ok: true,
				ran: false,
				reason: "stopped"
			};
			if (internalTracker.emitted) return {
				ok: true,
				ran: false,
				reason: "ownerless"
			};
			return {
				ok: true,
				ran: false,
				reason: "already-running"
			};
		}
		const reservedJob = reserved.job;
		reservationIdentity ??= reserveQueuedCronRun(state, reservedJob.id, reservationAt, {
			runReceipt: reserved.runReceipt,
			preserveWhenDisabled: mode === "force" && !isJobEnabled(job),
			lifecycleGeneration: generation
		});
		if (state.stopped || state.lifecycleGeneration !== generation) {
			try {
				await releasePreparedManualReservationWithRetry(state, {
					jobId: reservedJob.id,
					reservationIdentity
				});
			} catch (error) {
				releaseQueuedCronRun(state, job.id, reservationIdentity);
				throw error;
			}
			return {
				ok: true,
				ran: false,
				reason: "stopped"
			};
		}
		return {
			ok: true,
			ran: true,
			jobId: reservedJob.id,
			runId: opts?.runId,
			terminalTracker: opts?.terminalTracker,
			owningCronLaneTaskMarker: opts?.owningCronLaneTaskMarker,
			commitGuard: opts?.commitGuard,
			reservationAt,
			scheduleOwnershipAtMs: opts?.scheduleOwnershipAtMs ?? reservationAt,
			reservationIdentity,
			wasEnabled: opts?.onExit ? false : isJobEnabled(job),
			...onExit ? { onExit } : {},
			...opts?.payload ? { payload: structuredClone(opts.payload) } : {},
			...opts?.evaluateTrigger ? { evaluateTrigger: true } : {},
			...opts?.streamBatch !== void 0 ? { streamBatch: opts.streamBatch } : {},
			...opts?.streamScheduleKey !== void 0 ? { streamScheduleKey: opts.streamScheduleKey } : {},
			...opts?.streamSourceIdentity !== void 0 ? { streamSourceIdentity: opts.streamSourceIdentity } : {},
			...opts?.onTriggerDisposition ? { onTriggerDisposition: opts.onTriggerDisposition } : {}
		};
	});
}
async function activatePreparedManualRun(state, prepared, mode) {
	return await locked(state, async () => {
		await ensureLoaded(state, { forceReload: true });
		prepared.commitGuard?.();
		prepared.onExit?.commitGuard();
		if (state.stopped) {
			await releasePreparedManualReservationWithRetry(state, prepared);
			return {
				ok: true,
				ran: false,
				reason: "stopped"
			};
		}
		const job = state.store?.jobs.find((entry) => entry.id === prepared.jobId);
		if (!job) {
			await releasePreparedManualReservationWithRetry(state, prepared);
			return {
				ok: true,
				ran: false,
				reason: "not-due"
			};
		}
		if (mode === "if-enabled" && (!isJobEnabled(job) || job.state.autoDisabled)) {
			await releasePreparedManualReservationWithRetry(state, prepared);
			return {
				ok: true,
				ran: false,
				reason: "disabled"
			};
		}
		if (!isQueuedCronRunReservationCurrent(state, prepared.jobId, prepared.reservationIdentity) || job.state.queuedAtMs !== prepared.reservationAt) {
			await releasePreparedManualReservationWithRetry(state, prepared);
			return {
				ok: true,
				ran: false,
				reason: "not-due"
			};
		}
		if (prepared.onExit && !matchesOnExitSchedule(job, prepared.onExit.schedule)) {
			await releasePreparedManualReservationWithRetry(state, prepared);
			return {
				ok: true,
				ran: false,
				reason: "not-due"
			};
		}
		if (!admitsStreamSourceRun(job, prepared.streamScheduleKey, prepared.streamSourceIdentity)) {
			await releasePreparedManualReservationWithRetry(state, prepared);
			return {
				ok: true,
				ran: false,
				reason: "not-due"
			};
		}
		const dueProbe = structuredClone(job);
		delete dueProbe.state.queuedAtMs;
		if (prepared.wasEnabled && !isJobEnabled(job) || !isJobDue(dueProbe, state.deps.nowMs(), { forced: isImmediateCronRunMode(mode) })) {
			await releasePreparedManualReservationWithRetry(state, prepared);
			return {
				ok: true,
				ran: false,
				reason: "not-due"
			};
		}
		try {
			assertSupportedJobSpec(job);
		} catch (error) {
			await skipInvalidPersistedManualRun({
				state,
				job,
				mode,
				runId: prepared.runId,
				terminalTracker: prepared.terminalTracker,
				error
			});
			await releasePreparedManualReservationWithRetry(state, prepared);
			return {
				ok: true,
				ran: false,
				reason: "invalid-spec"
			};
		}
		const activation = await activateQueuedCronRun({
			state,
			job,
			reservationIdentity: prepared.reservationIdentity,
			commitGuard: prepared.commitGuard ?? prepared.onExit?.commitGuard,
			onExitSchedule: prepared.onExit?.schedule,
			onUnavailableRollbackError: async () => {
				await releasePreparedManualReservationWithRetry(state, prepared);
			}
		});
		if (activation.kind === "unavailable") return {
			ok: true,
			ran: false,
			reason: activation.reason
		};
		if (activation.kind === "fenced") {
			await releasePreparedManualReservationWithRetry(state, prepared);
			return {
				ok: true,
				ran: false,
				reason: "already-running"
			};
		}
		prepared.onExit?.commitGuard();
		const { job: activatedJob, startedAt } = activation;
		const payload = prepared.onExit?.payload?.(structuredClone(activatedJob)) ?? prepared.payload;
		emit(state, {
			jobId: activatedJob.id,
			action: "started",
			job: activatedJob,
			runAtMs: startedAt
		});
		const taskRunId = createCronRunHandle({
			state,
			job: activatedJob,
			startedAt,
			runReceipt: activation.runReceipt,
			publicRunId: prepared.runId
		})?.runId;
		const activeJobMarker = markManualCronJobActive(state, activatedJob, activation.runReceipt);
		const admittedJob = structuredClone(activatedJob);
		if (prepared.onExit) admittedJob.enabled = false;
		const executionJob = structuredClone({
			...activatedJob,
			payload: payload ?? activatedJob.payload
		});
		if (isImmediateCronRunMode(mode)) {
			executionJob.state.nextRunAtMs = prepared.scheduleOwnershipAtMs;
			executionJob.trigger = prepared.evaluateTrigger ? executionJob.trigger : void 0;
		}
		return {
			...prepared,
			startedAt,
			runId: prepared.runId ?? taskRunId,
			taskRunId,
			activeJobMarker,
			admittedJob,
			executionJob,
			runReceipt: activation.runReceipt
		};
	});
}
async function releasePreparedManualReservation(state, prepared) {
	if (state.queuedRunReservationsByJobId.get(prepared.jobId)?.identity !== prepared.reservationIdentity) return;
	const committedJob = commitCronRuntimeRows({
		state,
		jobIds: [prepared.jobId],
		operationLabel: "cron.manual-reservation-cleanup",
		mutate: ({ database, jobs, receiptSchema }) => {
			const job = jobs.get(prepared.jobId);
			const ownership = state.queuedRunReservationsByJobId.get(prepared.jobId);
			if (ownership?.identity !== prepared.reservationIdentity) return { value: void 0 };
			finishCronRunReceiptInDatabase({
				receiptSchema,
				database,
				handle: ownership.runReceipt,
				status: "skipped",
				finishedAtMs: state.deps.nowMs(),
				error: "cron manual reservation abandoned before completion"
			});
			if (!job) return { value: void 0 };
			const queuedMatches = ownership.markerAtMs === job.state.queuedAtMs;
			const runningMatches = ownership.markerAtMs === job.state.runningAtMs;
			if (!queuedMatches && !runningMatches) return { value: void 0 };
			if (ownership.activationPreviousLastError) job.state.lastError = ownership.activationPreviousLastError.value;
			if (queuedMatches) delete job.state.queuedAtMs;
			if (runningMatches) {
				delete job.state.runningAtMs;
				delete job.state.runningReceiptId;
				delete job.state.runningScheduleChangeId;
			}
			return {
				upsertJobIds: [job.id],
				value: job
			};
		}
	});
	if (committedJob) applyCronRuntimeRowsToState(state, [committedJob]);
	const ownership = state.queuedRunReservationsByJobId.get(prepared.jobId);
	if (ownership?.identity === prepared.reservationIdentity) releaseLocalCronRunReceiptOwnership(ownership.runReceipt);
	releaseQueuedCronRun(state, prepared.jobId, prepared.reservationIdentity);
}
async function releasePreparedManualReservationWithRetry(state, prepared) {
	try {
		await releasePreparedManualReservation(state, prepared);
	} catch {
		try {
			await releasePreparedManualReservation(state, prepared);
		} catch (error) {
			const ownership = state.queuedRunReservationsByJobId.get(prepared.jobId);
			if (ownership?.identity === prepared.reservationIdentity) releaseLocalCronRunReceiptOwnership(ownership.runReceipt);
			releaseQueuedCronRun(state, prepared.jobId, prepared.reservationIdentity);
			throw error;
		}
	}
}
async function releasePreparedManualReservationAfterReloadWithRetry(state, prepared) {
	await cleanupQueuedCronRunReservations({
		state,
		reservations: [prepared],
		restoreLastError: false
	});
}
//#endregion
//#region src/cron/service/ops-read.ts
/** Returns cron service status after a read-only maintenance pass. */
async function status(state) {
	return await locked(state, async () => {
		await ensureLoadedForRead(state);
		const sqlitePath = resolveOpenClawStateSqlitePath();
		return {
			enabled: state.deps.cronEnabled,
			triggersEnabled: state.deps.cronConfig?.triggers?.enabled !== false,
			storePath: sqlitePath,
			storage: "sqlite",
			sqlitePath,
			jobs: state.store?.jobs.length ?? 0,
			nextWakeAtMs: state.deps.cronEnabled ? nextWakeAtMs(state) ?? null : null
		};
	}, { readOnly: true });
}
/** Lists cron jobs sorted by next run time, excluding disabled jobs unless requested. */
async function list(state, opts) {
	return await locked(state, async () => {
		await ensureLoadedForRead(state);
		const includeDisabled = opts?.includeDisabled === true;
		return sortCronJobs((state.store?.jobs ?? []).filter((j) => includeDisabled || isJobEnabled(j)), "nextRunAtMs", "asc");
	}, { readOnly: true });
}
/** Reads one cron job by id without advancing due schedules. */
async function readJob(state, id) {
	return await locked(state, async () => {
		await ensureLoadedForRead(state);
		return state.store?.jobs.find((job) => job.id === id);
	}, { readOnly: true });
}
/** Reads one job's private scratch state after proving the job exists in this store. */
async function readScratch(state, id) {
	return await locked(state, async () => {
		await ensureLoaded(state);
		findJobOrThrow(state, id);
		return readCronJobScratchState(state.deps.storePath, id);
	});
}
/** Writes or clears one job's private scratch under the cron mutation lock. */
async function writeScratch(state, id, params) {
	return await locked(state, async () => {
		await ensureLoaded(state);
		findJobOrThrow(state, id);
		params.commitGuard?.();
		return writeCronJobScratch({
			storePath: state.deps.storePath,
			jobId: id,
			content: params.content,
			expectedRevision: params.expectedRevision,
			sourceSha256: params.sourceSha256,
			nowMs: state.deps.nowMs()
		});
	});
}
/** Record a terminal failure from a scheduler-owned event source. */
async function recordExternalFailure(state, id, error, statePatch, source) {
	await locked(state, async () => {
		await ensureLoaded(state);
		const job = findJobOrThrow(state, id);
		if (source && !ownsStreamSource(job, source.scheduleKey, source.identity)) return;
		const postPersistNotifications = [];
		const now = state.deps.nowMs();
		assertCronJobStateTimestamps(statePatch);
		const committedJob = commitCronRuntimeRows({
			state,
			jobIds: [id],
			operationLabel: "cron.external-failure",
			mutate: ({ jobs }) => {
				const current = jobs.get(id);
				if (!current || source && !ownsStreamSource(current, source.scheduleKey, source.identity)) return { value: void 0 };
				const sourceIdentity = current.state.streamSourceIdentity;
				Object.assign(current.state, statePatch);
				current.state.streamSourceIdentity = sourceIdentity;
				current.state.consecutiveErrors = Math.max(current.state.consecutiveErrors ?? 0, 4);
				applyJobResult(state, current, {
					status: "error",
					error,
					executionStarted: false,
					startedAt: now,
					endedAt: now
				}, { deferredNotifications: postPersistNotifications });
				current.state.nextRunAtMs = void 0;
				return {
					upsertJobIds: [current.id],
					value: current
				};
			}
		});
		if (committedJob) {
			await emitCronRunFinished(state, {
				jobId: committedJob.id,
				action: "finished",
				job: committedJob,
				status: "error",
				error,
				runAtMs: now,
				durationMs: 0,
				failureNotificationDelivery: failureNotificationDeliveryFromJobState(committedJob)
			});
			applyCronRuntimeRowsToState(state, [committedJob]);
		}
		runPostPersistCronNotifications(state, postPersistNotifications);
		armTimer(state);
	});
}
/** Atomically persist owner state only while its logical stream source still matches. */
async function updateExternalState(state, id, streamScheduleKey, streamSourceIdentity, statePatch) {
	return await locked(state, async () => {
		await ensureLoaded(state);
		assertCronJobStateTimestamps(statePatch);
		const committedJob = commitCronRuntimeRows({
			state,
			jobIds: [id],
			operationLabel: "cron.external-state",
			mutate: ({ jobs }) => {
				const job = jobs.get(id);
				if (!job || !ownsStreamSource(job, streamScheduleKey, streamSourceIdentity)) return { value: void 0 };
				const sourceIdentity = job.state.streamSourceIdentity;
				Object.assign(job.state, statePatch);
				job.state.streamSourceIdentity = sourceIdentity;
				return {
					upsertJobIds: [job.id],
					value: job
				};
			}
		});
		if (committedJob) applyCronRuntimeRowsToState(state, [committedJob]);
		return committedJob !== void 0;
	});
}
/** Retire a logical stream source before teardown that has no job-definition mutation. */
async function retireExternalStreamSource(state, id, streamScheduleKey, streamSourceIdentity) {
	return await locked(state, async () => {
		await ensureLoaded(state);
		const nextIdentity = createCronStreamSourceIdentity();
		const committedJob = commitCronRuntimeRows({
			state,
			jobIds: [id],
			operationLabel: "cron.retire-stream-source",
			mutate: ({ jobs }) => {
				const job = jobs.get(id);
				if (!job || !ownsStreamSource(job, streamScheduleKey, streamSourceIdentity)) return { value: void 0 };
				job.state.streamSourceIdentity = nextIdentity;
				return {
					upsertJobIds: [job.id],
					value: job
				};
			}
		});
		if (!committedJob) return;
		applyCronRuntimeRowsToState(state, [committedJob]);
		return nextIdentity;
	});
}
/** Persist the owner's monotonic loss counters across stream schedule replacement. */
async function updateExternalCounters(state, id, counters) {
	await locked(state, async () => {
		await ensureLoaded(state);
		const committedJob = commitCronRuntimeRows({
			state,
			jobIds: [id],
			operationLabel: "cron.external-counters",
			mutate: ({ jobs }) => {
				const job = jobs.get(id);
				if (!job || job.schedule.kind !== "stream") return { value: void 0 };
				job.state.streamDroppedBatches = Math.max(job.state.streamDroppedBatches ?? 0, counters.streamDroppedBatches ?? 0);
				job.state.streamCoalescedBatches = Math.max(job.state.streamCoalescedBatches ?? 0, counters.streamCoalescedBatches ?? 0);
				return {
					upsertJobIds: [job.id],
					value: job
				};
			}
		});
		if (committedJob) applyCronRuntimeRowsToState(state, [committedJob]);
	});
}
function resolveEnabledFilter(opts) {
	if (opts?.enabled === "all" || opts?.enabled === "enabled" || opts?.enabled === "disabled") return opts.enabled;
	return opts?.includeDisabled ? "all" : "enabled";
}
function resolveScheduleKindFilter(opts) {
	const kind = opts?.scheduleKind;
	return kind && [
		"all",
		"at",
		"every",
		"cron",
		"on-exit",
		"stream"
	].includes(kind) ? kind : "all";
}
function resolveLastRunStatusFilter(opts) {
	const lastRunStatus = opts?.lastRunStatus;
	return lastRunStatus && [
		"all",
		"ok",
		"error",
		"skipped",
		"unknown"
	].includes(lastRunStatus) ? lastRunStatus : "all";
}
function resolveTriggerFilter(opts) {
	const trigger = opts?.trigger;
	return trigger && [
		"all",
		"conditional",
		"unconditional"
	].includes(trigger) ? trigger : "all";
}
const SLOW_LIST_PAGE_MS = 1e3;
/** Lists a filtered, sorted, bounded page of cron jobs for CLI/RPC callers. */
async function listPage(state, opts, matchesJob) {
	const startedAt = performance.now();
	let enteredAt;
	let finishedAt;
	let sourceCount;
	let result;
	try {
		return await locked(state, async () => {
			enteredAt = performance.now();
			try {
				await ensureLoadedForRead(state);
				const query = normalizeLowercaseStringOrEmpty(opts?.query);
				const enabledFilter = resolveEnabledFilter(opts);
				const scheduleKindFilter = resolveScheduleKindFilter(opts);
				const lastRunStatusFilter = resolveLastRunStatusFilter(opts);
				const triggerFilter = resolveTriggerFilter(opts);
				const sortBy = opts?.sortBy ?? "nextRunAtMs";
				const sortDir = opts?.sortDir ?? "asc";
				const requestedAgentId = normalizeOptionalAgentId(opts?.agentId);
				const source = state.store?.jobs ?? [];
				sourceCount = source.length;
				const filtered = source.filter((job) => {
					if (enabledFilter === "enabled" && !isJobEnabled(job)) return false;
					if (enabledFilter === "disabled" && isJobEnabled(job)) return false;
					if (requestedAgentId && tryResolveCronJobEffectiveAgentId(job, resolveCurrentDefaultAgentId(state)) !== requestedAgentId) return false;
					if (scheduleKindFilter !== "all" && job.schedule.kind !== scheduleKindFilter) return false;
					if (lastRunStatusFilter !== "all" && (resolveJobLastRunStatus(job) ?? "unknown") !== lastRunStatusFilter) return false;
					if (triggerFilter === "conditional" && !job.trigger) return false;
					if (triggerFilter === "unconditional" && job.trigger) return false;
					if (query) {
						if (!normalizeLowercaseStringOrEmpty([
							job.id,
							job.name,
							job.description ?? "",
							job.agentId ?? "",
							...job.displayName ? [job.displayName] : []
						].join(" ")).includes(query)) return false;
					}
					return !matchesJob || matchesJob(job);
				});
				const storeRevision = getCronJobsStoreRevision(state.deps.storePath);
				let snapshot = state.schedulerStarted ? state.listPageSnapshot : void 0;
				if (!snapshot || snapshot.storeRevision !== storeRevision || snapshot.sortBy !== sortBy || snapshot.sortDir !== sortDir || snapshot.filteredJobs.length !== filtered.length || !snapshot.filteredJobs.every((job, index) => job === filtered[index])) {
					const jobs = sortCronJobs([...filtered], sortBy, sortDir);
					snapshot = {
						storeRevision,
						filteredJobs: filtered,
						sortBy,
						sortDir,
						jobs,
						snapshotRevision: resolveCronListSnapshotRevision(jobs)
					};
					if (state.schedulerStarted) state.listPageSnapshot = snapshot;
				}
				const { jobs: sortedJobs, snapshotRevision } = snapshot;
				const total = sortedJobs.length;
				const offset = Math.max(0, Math.min(total, Math.floor(opts?.offset ?? 0)));
				const defaultLimit = total === 0 ? 50 : total;
				const limit = Math.max(1, Math.min(200, Math.floor(opts?.limit ?? defaultLimit)));
				const jobs = structuredClone(sortedJobs.slice(offset, offset + limit));
				const nextOffset = offset + jobs.length;
				return result = {
					jobs,
					snapshotRevision,
					total,
					offset,
					limit,
					hasMore: nextOffset < total,
					nextOffset: nextOffset < total ? nextOffset : null
				};
			} finally {
				finishedAt = performance.now();
			}
		}, { readOnly: true });
	} finally {
		const completedAt = performance.now();
		const elapsedMs = completedAt - startedAt;
		if (elapsedMs >= SLOW_LIST_PAGE_MS) try {
			state.deps.log.warn({
				operation: "cron.listPage",
				pid: process.pid,
				threadId,
				isMainThread,
				elapsedMs: Math.round(elapsedMs),
				waitToCallbackMs: enteredAt === void 0 ? void 0 : Math.round(enteredAt - startedAt),
				callbackMs: enteredAt === void 0 || finishedAt === void 0 ? void 0 : Math.round(finishedAt - enteredAt),
				completionDelayMs: finishedAt === void 0 ? void 0 : Math.round(completedAt - finishedAt),
				sourceCount,
				matchedCount: result?.total,
				returnedCount: result?.jobs.length,
				outcome: result ? "ok" : "error",
				thresholdMs: SLOW_LIST_PAGE_MS
			}, "cron: slow list page");
		} catch {}
	}
}
//#endregion
//#region src/cron/service/ops-run.ts
let nextManualRunId = 1;
async function finishPreparedManualRun(state, prepared, mode) {
	const executionJob = prepared.executionJob;
	const startedAt = prepared.startedAt;
	const jobId = prepared.jobId;
	const taskRunId = prepared.taskRunId;
	const runId = prepared.runId;
	let finalized = false;
	let supersedeReason;
	let receiptSettlementDisposition;
	try {
		let coreResult;
		try {
			coreResult = await executeJobCoreWithTimeout(state, executionJob, {
				runId: taskRunId,
				activeJobMarker: prepared.activeJobMarker,
				owningCronLaneTaskMarker: prepared.owningCronLaneTaskMarker,
				streamBatch: prepared.streamBatch,
				streamScheduleKey: prepared.streamScheduleKey,
				streamSourceIdentity: prepared.streamSourceIdentity,
				runReceipt: prepared.runReceipt,
				executionIdentity: createCronOwnerExecutionIdentityAdmission({
					state,
					runReceipt: prepared.runReceipt
				})
			});
		} catch (err) {
			if (err instanceof CronRunReceiptRevisionError && err.reason === "owner-unavailable") receiptSettlementDisposition = "owner-unavailable";
			coreResult = authorCronRunCompletion(state, executionJob, {
				status: "error",
				error: err instanceof CronRunReceiptRevisionError ? err.message : normalizeCronRunErrorText(err)
			});
		}
		if (prepared.onTriggerDisposition) {
			const disposition = coreResult.triggerEval?.busy ? "busy" : coreResult.status === "error" ? "error" : coreResult.status !== "ok" ? "dropped" : !executionJob.trigger ? "fired" : coreResult.triggerEval?.fired ? "fired" : "dropped";
			prepared.onTriggerDisposition(disposition);
		}
		const endedAt = state.deps.nowMs();
		const triggerSkipped = coreResult.status === "ok" && coreResult.triggerEval?.fired === false;
		const outcome = {
			...coreResult,
			jobId,
			job: prepared.admittedJob,
			taskRunId,
			activeJobMarker: prepared.activeJobMarker,
			runReceipt: prepared.runReceipt,
			startedAt,
			endedAt
		};
		const outcomeOptions = { request: {
			preserveCadence: isImmediateCronRunMode(mode),
			scheduleOwnershipAtMs: prepared.scheduleOwnershipAtMs
		} };
		const emitMissingTerminal = async (required = false) => {
			const tracker = prepared.terminalTracker;
			if (!tracker && !required || tracker?.emitted) return;
			const job = prepared.activeJobMarker?.jobRemoved === true ? executionJob : state.store?.jobs.find((entry) => entry.id === jobId);
			await emitCronRunFinished(state, {
				jobId,
				action: "finished",
				job,
				status: triggerSkipped ? "skipped" : coreResult.status,
				completionStatus: triggerSkipped ? "failed" : coreResult.completionStatus,
				error: triggerSkipped ? "queued manual run skipped: trigger condition not met" : coreResult.error,
				deliveryError: coreResult.deliveryState.error,
				deliverySuppressionReason: coreResult.deliveryState.deliverySuppressionReason,
				summary: triggerSkipped ? void 0 : coreResult.summary,
				diagnostics: coreResult.diagnostics,
				delivered: coreResult.deliveryState.delivered,
				deliveryStatus: coreResult.deliveryState.status,
				delivery: coreResult.delivery,
				sessionId: coreResult.sessionId,
				sessionKey: coreResult.sessionKey,
				runId,
				runAtMs: startedAt,
				durationMs: Math.max(0, endedAt - startedAt),
				nextRunAtMs: job?.state.nextRunAtMs,
				model: coreResult.model,
				provider: coreResult.provider,
				usage: coreResult.usage
			}, tracker, taskRunId, {
				errorClassification: triggerSkipped ? void 0 : coreResult.errorClassification,
				failureNotificationDetail: triggerSkipped ? void 0 : coreResult.failureNotificationDetail
			});
		};
		const finishRemovedRun = async () => {
			finishCronRunReceipt({
				handle: prepared.runReceipt,
				status: resolveCronRunReceiptTerminalStatus(triggerSkipped ? "skipped" : coreResult.status, coreResult.triggerEval?.fired),
				finishedAtMs: endedAt,
				error: coreResult.error
			});
			finalized = true;
			await emitMissingTerminal(true);
		};
		if (prepared.activeJobMarker?.jobRemoved === true) {
			await finishRemovedRun();
			return;
		}
		let notifySetupTimeout = coreResult.isolatedAgentSetupTimeout !== void 0;
		await locked(state, async () => {
			await ensureLoaded(state, { forceReload: true });
			const job = state.store?.jobs.find((entry) => entry.id === jobId);
			if (prepared.activeJobMarker?.jobRemoved === true || !job) {
				notifySetupTimeout = false;
				await finishRemovedRun();
				return;
			}
			const postPersistNotifications = [];
			if (!triggerSkipped) {
				const taskJob = structuredClone(job);
				applyOutcomeToAuthoritativeJob(state, taskJob, outcome, {
					...outcomeOptions,
					deferredNotifications: []
				});
				await recordCronOutcomeForJob(state, taskJob, {
					...outcome,
					job: executionJob
				});
			}
			let removedJob;
			try {
				const committed = commitCronRuntimeRows({
					state,
					jobIds: [jobId],
					operationLabel: "cron.manual-run-finalization",
					transactionHooks: cronRunReceiptPersistHooks({
						state,
						handle: prepared.runReceipt,
						terminal: {
							status: triggerSkipped ? "skipped" : coreResult.status,
							finishedAtMs: endedAt,
							error: coreResult.error,
							...receiptSettlementDisposition ? { disposition: receiptSettlementDisposition } : {}
						}
					}),
					mutate: ({ database, jobs }) => {
						const current = jobs.get(jobId);
						if (!current) return { value: void 0 };
						const removed = applyOutcomeToAuthoritativeJob(state, current, outcome, {
							...outcomeOptions,
							triggerStateRetired: isCronRunTriggerStateRetiredInDatabase({
								database,
								handle: prepared.runReceipt
							}),
							deferredNotifications: postPersistNotifications
						});
						return {
							...removed ? { deleteJobIds: [jobId] } : { upsertJobIds: [jobId] },
							value: {
								job: structuredClone(current),
								removed
							}
						};
					}
				});
				if (!committed) return;
				removedJob = committed.removed ? committed.job : void 0;
				runPostPersistCronNotifications(state, postPersistNotifications);
				applyCronRuntimeRowsToState(state, committed.removed ? [] : [committed.job], committed.removed ? [jobId] : [], { publish: false });
				if (triggerSkipped) await recordQuietCronEvaluation(state, {
					taskRunId,
					jobId,
					startedAt,
					job: executionJob,
					status: coreResult.status,
					error: coreResult.error,
					endedAt,
					summary: coreResult.summary,
					childSessionKey: coreResult.sessionKey,
					triggerEval: coreResult.triggerEval
				});
				if (!isCronActiveJobMarkerCurrent(prepared.activeJobMarker)) {
					finalized = true;
					return;
				}
				if (!triggerSkipped) await emitCronRunFinished(state, {
					...createCronOutcomeEvent(committed.job, outcome),
					runId
				}, prepared.terminalTracker, taskRunId, {
					triggerEval: coreResult.triggerEval,
					scriptResult: {
						scriptStateChanged: coreResult.scriptStateChanged,
						scriptState: coreResult.scriptState
					},
					errorClassification: coreResult.errorClassification,
					failureNotificationDetail: coreResult.failureNotificationDetail
				});
				publishCronRuntimeRows(state);
				await recomputeUnownedCronSchedules(state, {
					recomputeExpired: true,
					...isImmediateCronRunMode(mode) ? { preserveExpiredPacedNextRunJobId: jobId } : {}
				});
			} catch (error) {
				if (error instanceof CronRunReceiptRevisionError) {
					if (isCronActiveJobMarkerCurrent(prepared.activeJobMarker)) supersedeReason = error.message;
					notifySetupTimeout = false;
					return;
				}
				throw error;
			}
			if (removedJob) emit(state, {
				jobId: removedJob.id,
				action: "removed",
				job: removedJob
			});
			finalized = true;
		});
		if (supersedeReason) await supersedeActivatedCronRun({
			state,
			jobId,
			reservationIdentity: prepared.reservationIdentity,
			runReceipt: prepared.runReceipt,
			reason: supersedeReason
		});
		if (notifySetupTimeout && isCronActiveJobMarkerCurrent(prepared.activeJobMarker)) maybeNotifyManualIsolatedSetupTimeout(state, {
			jobId,
			job: executionJob,
			isolatedAgentSetupTimeout: coreResult.isolatedAgentSetupTimeout
		});
		if (finalized && isCronActiveJobMarkerCurrent(prepared.activeJobMarker)) armTimer(state);
		await emitMissingTerminal();
	} finally {
		releaseLocalCronRunReceiptOwnership(prepared.runReceipt);
		try {
			releaseQueuedCronRun(state, prepared.jobId, prepared.reservationIdentity);
		} finally {
			clearManualCronJobActive(state, jobId, prepared.activeJobMarker);
		}
	}
}
/** Runs a cron job manually, reserving it under lock before executing outside the lock. */
async function run(state, id, mode, opts) {
	const execute = async () => {
		const prepared = await prepareManualRun(state, id, mode, opts);
		if (!prepared.ok || !prepared.ran) return prepared;
		return await executePreparedManualRun(state, prepared, mode);
	};
	return await (opts?.streamBatch !== void 0 && state.deps.runSchedulerOwned ? state.deps.runSchedulerOwned(execute) : execute());
}
/** Consumes an observed exit only when its payload owns the durable reservation. */
async function runOnExit(state, id, opts) {
	const generation = state.lifecycleGeneration;
	const execute = async () => {
		const commitGuard = () => {
			if (opts.signal.aborted || state.stopped || generation !== state.lifecycleGeneration) throw createAbortError("cron on-exit admission cancelled");
			opts.commitGuard();
		};
		try {
			while (await waitForRunSettlement(state, id, opts.signal)) {
				commitGuard();
				const prepared = await prepareManualRun(state, id, "force", {
					onExit: {
						...opts,
						commitGuard
					},
					commitGuard
				});
				if (!prepared.ok || !prepared.ran) {
					if (prepared.ok && prepared.reason === "already-running") continue;
					return prepared;
				}
				return await executePreparedManualRun(state, prepared, "force");
			}
		} catch (error) {
			if (!isAbortError(error)) throw error;
		}
		return {
			ok: true,
			ran: false,
			reason: "stopped"
		};
	};
	return await (state.deps.runSchedulerOwned ? state.deps.runSchedulerOwned(execute) : execute());
}
async function executePreparedManualRun(state, prepared, mode, onActivationSettled) {
	const admission = await runWithCronAdmission(state, async () => {
		let activeRun;
		try {
			activeRun = await activatePreparedManualRun(state, prepared, mode);
		} catch (error) {
			try {
				await locked(state, async () => {
					await releasePreparedManualReservationWithRetry(state, prepared);
				});
			} catch (cleanupError) {
				state.deps.log.warn({
					jobId: prepared.jobId,
					err: String(cleanupError)
				}, "cron: failed to release manual run reservation after activation error");
			}
			throw error;
		} finally {
			onActivationSettled?.();
		}
		if (!activeRun.ran) return activeRun;
		await finishPreparedManualRun(state, activeRun, mode);
		return {
			ok: true,
			ran: true
		};
	}, void 0, prepared.onExit?.signal);
	if (admission.kind === "stopped") {
		await releasePreparedManualReservationAfterReloadWithRetry(state, prepared);
		return {
			ok: true,
			ran: false,
			reason: "stopped"
		};
	}
	return admission.value;
}
/** Acknowledges queued manual work only after its durable reservation exists. */
async function enqueueRun(state, id, mode, opts) {
	const disposition = await inspectManualRunDisposition(state, id, mode, opts);
	if (!disposition.ok || !("runnable" in disposition && disposition.runnable)) return disposition;
	const scheduleOwnershipAtMs = state.deps.nowMs();
	const runId = `manual:${id}:${scheduleOwnershipAtMs}:${nextManualRunId++}`;
	const terminalTracker = { emitted: false };
	const releaseCallerAuthority = retainGatewayDeviceRevocation(opts?.commitGuard);
	const acceptance = createDeferredCore();
	const trackCallerWork = captureCronRunAdmissionTracker();
	const activationSettled = createDeferredCore();
	let accepted = false;
	const acceptQueue = () => {
		if (!accepted && trackCallerWork) trackCallerWork(() => activationSettled.promise).catch((error) => {
			state.deps.log.error({
				jobId: id,
				runId,
				err: String(error)
			}, "cron: queued manual admission tracking failed");
		});
		accepted = true;
		acceptance.resolve({
			ok: true,
			enqueued: true,
			runId
		});
	};
	let queuedRun;
	try {
		queuedRun = runWithGatewayIndependentRootWorkContinuation(async () => {
			opts?.commitGuard?.();
			const prepared = await prepareManualRun(state, id, mode, {
				runId,
				scheduleOwnershipAtMs,
				terminalTracker,
				commitGuard: opts?.commitGuard
			});
			if (!prepared.ok || !prepared.ran) {
				acceptance.resolve(prepared);
				return prepared;
			}
			let dispatched = false;
			try {
				opts?.commitGuard?.();
				return await enqueueCommandInLane("cron", async (owningCronLaneTaskMarker) => {
					acceptQueue();
					dispatched = true;
					const result = await executePreparedManualRun(state, {
						...prepared,
						owningCronLaneTaskMarker
					}, mode, activationSettled.resolve);
					if (result.ok && "ran" in result && !result.ran) {
						if (result.reason !== "invalid-spec" && result.reason !== "ownerless") {
							const finishedAt = state.deps.nowMs();
							const job = state.store?.jobs.find((entry) => entry.id === id);
							await emitCronRunFinished(state, {
								jobId: id,
								action: "finished",
								job,
								status: "skipped",
								error: `queued manual run skipped before execution: ${result.reason}`,
								runId,
								runAtMs: finishedAt,
								durationMs: 0,
								nextRunAtMs: job?.state.nextRunAtMs
							}, terminalTracker);
						}
						state.deps.log.info({
							jobId: id,
							runId,
							reason: result.reason
						}, "cron: queued manual run skipped before execution");
					}
					return result;
				}, {
					onQueued: acceptQueue,
					taskIdentity: {
						taskKind: "cron",
						runId
					},
					warnAfterMs: 5e3,
					onWait: (waitMs, queuedAhead) => {
						state.deps.log.warn({
							jobId: id,
							runId,
							waitMs,
							queuedAhead
						}, "cron: queued manual run waiting for an execution slot");
					}
				});
			} finally {
				if (!dispatched) try {
					await releasePreparedManualReservationAfterReloadWithRetry(state, prepared);
				} catch (cleanupError) {
					state.deps.log.warn({
						jobId: id,
						err: String(cleanupError)
					}, "cron: failed to release manual reservation after queue rejection");
				}
			}
		}, "cron:manual-run");
	} catch (error) {
		activationSettled.resolve();
		releaseCallerAuthority?.();
		throw error;
	}
	queuedRun.catch(async (err) => {
		if (!accepted) {
			acceptance.reject(err);
			return;
		}
		if (terminalTracker.emitted) {
			state.deps.log.error({
				jobId: id,
				runId,
				err: String(err)
			}, "cron: queued manual run failed after emitting its terminal event");
			return;
		}
		const finishedAt = state.deps.nowMs();
		const job = state.store?.jobs.find((entry) => entry.id === id);
		await emitCronRunFinished(state, {
			jobId: id,
			action: "finished",
			job,
			status: "error",
			error: normalizeCronRunErrorText(err),
			runId,
			runAtMs: finishedAt,
			durationMs: 0,
			nextRunAtMs: job?.state.nextRunAtMs
		}, terminalTracker);
		state.deps.log.error({
			jobId: id,
			runId,
			err: String(err)
		}, "cron: queued manual run background execution failed");
	}).finally(() => {
		activationSettled.resolve();
		releaseCallerAuthority?.();
	});
	return await acceptance.promise;
}
/** Enqueues manual wake text through the cron wake API. */
function wakeNow(state, opts) {
	return wake(state, opts);
}
//#endregion
//#region src/cron/service.ts
/** Public cron service facade that owns mutable scheduler state and delegates to locked ops. */
var CronService = class {
	constructor(deps) {
		this.startInProgress = 0;
		this.startState = null;
		this.state = createCronServiceState(deps);
	}
	async start() {
		const generation = this.state.lifecycleGeneration;
		const pending = this.startState;
		if (pending) {
			try {
				await pending.promise;
			} catch (err) {
				if (pending.generation === generation) throw err;
			}
			if (pending.generation === generation) return;
			await this.start();
			return;
		}
		const promise = this.startOnce(generation);
		this.startState = {
			generation,
			promise
		};
		try {
			await promise;
		} finally {
			if (this.startState?.promise === promise) this.startState = null;
		}
	}
	async startOnce(generation) {
		this.startInProgress += 1;
		this.state.schedulerStarted = false;
		try {
			const start$1 = () => start(this.state);
			await (this.state.deps.runSchedulerOwned ? this.state.deps.runSchedulerOwned(start$1) : start$1());
			if (generation !== this.state.lifecycleGeneration) {
				stop(this.state);
				return;
			}
			this.state.schedulerStarted = !this.state.stopped;
		} finally {
			this.startInProgress -= 1;
		}
	}
	stop() {
		stop(this.state);
	}
	pauseScheduling() {
		pauseScheduling(this.state);
	}
	resumeScheduling() {
		resumeScheduling(this.state);
	}
	getSuspensionBlockerCount() {
		return this.startInProgress;
	}
	async status() {
		return await status(this.state);
	}
	async list(opts) {
		return await list(this.state, opts);
	}
	async listPage(opts, matchesJob) {
		return await listPage(this.state, opts, matchesJob);
	}
	async add(input, opts) {
		return await add(this.state, input, opts);
	}
	async removeStaleJobFamily(family, opts) {
		return await removeStaleJobFamily(this.state, family, opts);
	}
	async update(id, patch, opts) {
		return await update(this.state, id, patch, opts);
	}
	async updateWithPrecondition(id, patch, precondition, opts) {
		return await updateWithPrecondition(this.state, id, patch, precondition, opts);
	}
	async remove(id, opts) {
		return await remove(this.state, id, opts);
	}
	async removeAgentJobsTransactional(agentId, commit) {
		return await removeAgentJobsTransactional(this.state, agentId, commit);
	}
	async quiesceJobs(jobs, commitGuard) {
		await quiesceJobs(this.state, jobs, commitGuard);
	}
	async run(id, mode, opts) {
		return await run(this.state, id, mode, opts);
	}
	async runOnExit(id, opts) {
		return await runOnExit(this.state, id, opts);
	}
	async enqueueRun(id, mode, opts) {
		const result = await enqueueRun(this.state, id, mode, opts);
		if (result.ok && "runnable" in result) throw new Error("cron enqueueRun returned unresolved runnable disposition");
		return result;
	}
	getJob(id) {
		return this.state.store?.jobs.find((job) => job.id === id);
	}
	/** In-memory job snapshot; undefined until the store is loaded. */
	getLoadedJobs() {
		return this.state.store?.jobs;
	}
	async readJob(id) {
		return await readJob(this.state, id);
	}
	async readScratch(id) {
		return await readScratch(this.state, id);
	}
	async writeScratch(id, params) {
		return await writeScratch(this.state, id, params);
	}
	async recordExternalFailure(id, error, statePatch, source) {
		await recordExternalFailure(this.state, id, error, statePatch, source);
	}
	async updateExternalState(id, streamScheduleKey, streamSourceIdentity, statePatch) {
		return await updateExternalState(this.state, id, streamScheduleKey, streamSourceIdentity, statePatch);
	}
	async retireExternalStreamSource(id, streamScheduleKey, streamSourceIdentity) {
		return await retireExternalStreamSource(this.state, id, streamScheduleKey, streamSourceIdentity);
	}
	async updateExternalCounters(id, counters) {
		await updateExternalCounters(this.state, id, counters);
	}
	getDefaultAgentId() {
		return this.state.deps.resolveDefaultAgentId ? this.state.deps.resolveDefaultAgentId() : this.state.deps.defaultAgentId;
	}
	wake(opts) {
		return wakeNow(this.state, opts);
	}
};
//#endregion
export { cronScriptFailureMetadata as n, CronService as t };
