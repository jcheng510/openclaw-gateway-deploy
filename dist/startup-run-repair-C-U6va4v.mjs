import { o as asDateTimestampMs } from "./number-coercion-Dq1l5muL.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { $ as resolveCronRunRecordTimestamp, G as cronRunRecordToRunLogEntry, H as cronQuietTriggerDetail, J as cronRunStorageStatus, K as cronRunRecordToScriptRunResult, U as cronRunLogEntryToDetail, W as cronRunRecordStoreKey, lt as resolveAdmittedCronCompletionStatus, q as cronRunRecordToTriggerEval, ut as resolveCronCompletionStatus } from "./openclaw-state-db-read-connection-DJObJIAO.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { f as OPENCLAW_STATE_SCHEMA_SQL } from "./openclaw-state-db-legacy-backfills-xddLXhvs.mjs";
import { n as captureOpenClawStateReadWorkerContext, r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { h as resolveAdmittedRunActiveAssertion } from "./admitted-run-context-BL8yRX2D.mjs";
import { t as deliveryContextFromSession } from "./delivery-context.read-CR06zOJ4.mjs";
import { t as parseAbsoluteTimeMs } from "./parse-BMAUe1NJ.mjs";
import { a as loadCronRows, g as cronSchedulingInputsEqual, o as loadedCronStoreFromRows } from "./row-codec-BoajbjTy.mjs";
import { a as createCronStreamSourceIdentity } from "./normalize-BUsm2nZV.mjs";
import { n as resolvePacedNextRunAtMs } from "./pacing-sPS-jg7P.mjs";
import { n as readCronRunRecordsInDatabase } from "./run-history.kernel--Y98rxfv.mjs";
import { c as loadSessionEntryReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { _ as noteActiveCronJobMessageActionAuthorityMutation, b as noteActiveCronJobScheduleMutation, h as markCronJobActive, p as isCronSelfRemovalCurrent, v as noteActiveCronJobMessageSourceAuthorityMutation } from "./active-jobs-CTCtrefd.mjs";
import { n as resolveCronTriggerMinIntervalMs } from "./cron-limits-txevLFpr.mjs";
import { t as computeNextRunAtMs } from "./schedule-DpJ8jCLT.mjs";
import { t as cronStoreKey } from "./key-BBZ40bDq.mjs";
import { n as createExecutionStartedOwnerBinding, r as executionOwnerBindingFromAdmission } from "./execution-owner-binding-Cp1jYiHd.mjs";
import { C as readCronRunReceiptCurrentJob, E as trackCronRunReceiptSettlement, O as describeUnavailableCronAgent, _ as finishCronRunReceiptInDatabase, a as adjudicateActiveCronRunReceiptInDatabase, c as assertCronRunReceiptOwnedInDatabase, h as finishCronRunReceipt, m as findActiveCronRunReceiptInDatabase, o as assertCronRunReceiptCurrent, r as CronRunReceiptRevisionError, s as assertCronRunReceiptCurrentInDatabase, x as prepareCronRunReceiptAdjudication, y as isCronRunReceiptSettlementPending } from "./run-receipt-store-C5VImo6M.mjs";
import { D as autoDisableCronJob, O as maybeAutoDisableCronJobAfterRunFailure, T as resolveManualOneShotOccurrenceAtMs, i as errorBackoffMs, l as isJobEnabled, n as computeJobNextRunAtMs, t as DEFAULT_ERROR_BACKOFF_SCHEDULE_MS, v as recordScheduleComputeError } from "./jobs-scheduling-BFO_sCWD.mjs";
import { a as normalizeCronRunDiagnostics, o as summarizeCronRunDiagnostics } from "./run-diagnostics-DWNlemj-.mjs";
import { n as resolveCronJobEffectiveAgentId, r as tryResolveCronJobEffectiveAgentId } from "./agent-id-BPaE0_vm.mjs";
import { t as toPublicCronJob } from "./public-job-C0Jx9vVK.mjs";
import { n as resolveCronDeliveryPlan } from "./delivery-plan-BzI5V5w6.mjs";
import { t as resolveCronRunErrorReason } from "./run-error-reason-CwZdxqwA.mjs";
import { t as createCronExecutionId } from "./run-id-kGde0n7U.mjs";
import { n as recordCronRun } from "./run-history-D6Rb8EFg.mjs";
import { a as resolveFailureAlert, i as maybeEmitFailureRecovery, n as finalizeCronFailureNotifications, r as maybeEmitFailureAlert, t as failureNotificationDeliveryFromJobState } from "./failure-alerts-vo_mYq9O.mjs";
import { c as resolveCronJobMessageToolAuthorityInputs, s as resolveCronJobMessageActionAuthorityInputs } from "./jobs-tool-policy-CrFFUwm3.mjs";
import { isDeepStrictEqual } from "node:util";
import { randomUUID } from "node:crypto";
//#region src/cron/service/state.ts
function cronFailureNotificationEventContext(failureNotificationDetail) {
	return failureNotificationDetail ? { failureNotificationDetail } : void 0;
}
function createCronServiceState(deps) {
	const defaultAgentId = deps.defaultAgentId ?? (deps.resolveDefaultAgentId ? void 0 : "main");
	return {
		deps: {
			...deps,
			defaultAgentId,
			nowMs: deps.nowMs ?? (() => deps.scheduler.now())
		},
		store: null,
		durableNextRunAtMsByJobId: /* @__PURE__ */ new Map(),
		timer: null,
		running: false,
		activeTimerTicks: 0,
		stopped: false,
		lifecycleGeneration: 0,
		schedulingPaused: false,
		schedulerStarted: false,
		activeManualRunJobIds: /* @__PURE__ */ new Set(),
		manualSetupTimeoutNotified: false,
		runAdmission: {
			active: 0,
			waiters: [],
			capacityListener: null
		},
		queuedRunReservationsByJobId: /* @__PURE__ */ new Map(),
		op: Promise.resolve(),
		warnedDisabled: false,
		warnedInvalidPersistedJobKeys: /* @__PURE__ */ new Set(),
		pendingQuarantineConfigJobs: [],
		lastQuarantineFailureWarnKey: null,
		storeLoadedAtMs: null
	};
}
/** Dispatches a cron event without letting subscriber errors escape scheduler work. */
function emit(state, evt, context) {
	try {
		const publicEvent = evt.job ? {
			...evt,
			job: toPublicCronJob(evt.job)
		} : evt;
		if (context) state.deps.onEvent?.(publicEvent, context);
		else state.deps.onEvent?.(publicEvent);
	} catch {}
}
function isImmediateCronRunMode(mode) {
	return mode === "force" || mode === "if-enabled";
}
//#endregion
//#region src/cron/run-event-codec.ts
/** Write-side cron codec: converts a finished service event into a run-history entry.
* Kept separate from run-history-detail.ts so the read/history codec stays free of the
* agents failover tree (which transitively pulls the sandbox module graph). */
/** Uses execution timing for the timestamp shared by history and runtime state. */
function resolveCronRunEndedAt(event, fallbackTs) {
	if (typeof event.runAtMs === "number" && Number.isFinite(event.runAtMs) && typeof event.durationMs === "number" && Number.isFinite(event.durationMs)) return event.runAtMs + event.durationMs;
	return fallbackTs;
}
/** Builds the legacy run-history record from one finished service event. */
function cronRunLogEntryFromEvent(event, fallbackTs, errorClassification) {
	const errorReason = resolveCronRunErrorReason(event.error, event.provider, errorClassification);
	return {
		ts: resolveCronRunEndedAt(event, fallbackTs),
		jobId: event.jobId,
		action: "finished",
		status: event.status,
		completionStatus: event.completionStatus,
		error: event.error,
		errorReason,
		summary: event.summary,
		diagnostics: event.diagnostics,
		delivered: event.delivered,
		deliveryStatus: event.deliveryStatus,
		deliveryError: event.deliveryError,
		deliverySuppressionReason: event.deliverySuppressionReason,
		failureNotificationDelivery: event.failureNotificationDelivery,
		delivery: event.delivery,
		sessionId: event.sessionId,
		sessionKey: event.sessionKey,
		runId: event.runId,
		runAtMs: event.runAtMs,
		durationMs: event.durationMs,
		nextRunAtMs: event.nextRunAtMs,
		triggerFired: event.triggerFired,
		model: event.model,
		provider: event.provider,
		usage: event.usage
	};
}
//#endregion
//#region src/cron/store/run-receipt-execution-binding.ts
/** Binds the exact admitted execution without changing the receipt lifecycle. */
async function bindCronRunReceiptExecution(params) {
	const binding = executionOwnerBindingFromAdmission(params.admitted);
	if (!binding) return "disabled";
	const context = params.context ?? captureOpenClawStateWorkerContext(params.options);
	const input = {
		handle: { ...params.handle },
		binding
	};
	const assertOwnerCurrent = params.assertCurrent;
	const assertCurrent = () => {
		context.admission.assertCurrent();
		assertOwnerCurrent?.();
	};
	const [{ runOpenClawStateWorkerOperation }, { createSqliteWorkerWriteAdmission }] = await Promise.all([import("./openclaw-state-worker-store-Bp_XCEWM.mjs"), import("./sqlite-worker-store-B3q06gbG.mjs")]);
	return runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
		type: "cron.bindReceiptExecution",
		input
	}), {
		assertCurrent,
		createAdmission: createSqliteWorkerWriteAdmission(assertCurrent, [context.admission.databasePath])
	});
}
//#endregion
//#region src/cron/service/run-history.ts
/** Cron receipts own running work; history records only durable outcomes. */
/** Carries exact admission into the first post-admission owner lifecycle phase. */
function createCronOwnerExecutionIdentityAdmission(params) {
	const ownerBinding = createExecutionStartedOwnerBinding(async (admitted) => {
		try {
			if (!admitted.executionIdentityToken) return;
			const assertCurrent = resolveAdmittedRunActiveAssertion(admitted);
			if (!assertCurrent) throw new Error("Cron execution authority closed before owner binding");
			const context = captureOpenClawStateWorkerContext();
			const receiptResult = await bindCronRunReceiptExecution({
				admitted,
				handle: params.runReceipt,
				context,
				assertCurrent
			});
			if (receiptResult === "mismatch" || receiptResult === "missing") params.state.deps.log.warn({ receiptResult }, "cron: exact execution identity binding was not retained");
		} catch (error) {
			params.state.deps.log.warn({ error }, "cron: failed to retain exact execution identity binding");
		}
	});
	return {
		ingress: {
			kind: "schedule",
			boundary: "cron.isolated-agent",
			state: "present"
		},
		onPostAdmission: ownerBinding.onPostAdmission,
		onExecutionStarted: ownerBinding.onExecutionStarted
	};
}
function createCronHistoryRunId(jobId, startedAt, receiptId, publicRunId) {
	const receipt = receiptId?.trim();
	const publicId = publicRunId?.trim();
	const discriminator = receipt || publicId || randomUUID();
	const publicSuffix = publicId && publicId !== discriminator ? `:${publicId}` : "";
	return `${createCronExecutionId(jobId, startedAt)}:${discriminator}${publicSuffix}`;
}
function createCronRunHandle(params) {
	return { runId: createCronHistoryRunId(params.job.id, params.startedAt, params.runReceipt?.receiptId, params.publicRunId) };
}
/** Quiet evaluations retain recovery state without appearing in cron.runs. */
async function recordQuietCronEvaluation(state, result) {
	if (!result.taskRunId || result.triggerEval?.fired !== false) return;
	if (!result.jobId || result.startedAt === void 0) throw new Error("Quiet cron outcome has no execution identity");
	const storeKey = cronStoreKey(state.deps.storePath);
	await persistCronOutcome(state, {
		storeKey,
		jobId: result.jobId,
		runId: result.taskRunId,
		startedAt: result.startedAt,
		endedAt: result.endedAt,
		agentId: result.job ? tryResolveCronJobEffectiveAgentId(result.job, state.deps.resolveDefaultAgentId?.() ?? state.deps.defaultAgentId) : void 0,
		sessionKey: result.childSessionKey ?? result.sessionKey,
		status: "succeeded",
		detail: cronQuietTriggerDetail(storeKey, {
			...result.triggerEval,
			fired: false
		})
	});
}
/** Join history persistence before settlement; a storage failure cannot strand a running receipt. */
async function finishCronRun(state, result) {
	const entry = cronRunLogEntryFromEvent(result.event, state.deps.nowMs(), result.errorClassification);
	const startedAt = entry.runAtMs ?? entry.ts;
	const job = result.job ?? result.event.job;
	const storeKey = cronStoreKey(state.deps.storePath);
	await persistCronOutcome(state, {
		storeKey,
		jobId: entry.jobId,
		runId: result.taskRunId ?? createCronHistoryRunId(entry.jobId, startedAt, void 0, entry.runId),
		agentId: !result.ownerlessRun && job ? tryResolveCronJobEffectiveAgentId(job, state.deps.resolveDefaultAgentId?.() ?? state.deps.defaultAgentId) : void 0,
		startedAt,
		endedAt: entry.ts,
		status: cronRunStorageStatus(entry),
		sessionKey: entry.sessionKey,
		error: entry.error,
		summary: entry.summary,
		detail: cronRunLogEntryToDetail(entry, {
			storeKey,
			scriptResult: result.scriptResult,
			triggerEval: result.triggerEval
		})
	});
}
async function persistCronOutcome(state, input) {
	try {
		await recordCronRun(input);
	} catch (error) {
		state.deps.log.warn({
			jobId: input.jobId,
			runId: input.runId,
			error
		}, "cron: failed to persist run history");
	}
}
//#endregion
//#region src/cron/service/timer-execution-timeout.ts
const MAX_CRON_TIMER_DELAY_MS = 6e4;
/**
* Minimum gap between consecutive fires of the same cron job.  This is a
* safety net that prevents spin-loops when `computeJobNextRunAtMs` returns
* a value within the same second as the just-completed run.  The guard
* is intentionally generous (2 s) so it never masks a legitimate schedule
* but always breaks an infinite re-trigger cycle.  (See #17821)
*/
const MIN_REFIRE_GAP_MS = 2e3;
const DEFAULT_MISSED_JOB_STAGGER_MS = 5e3;
const DEFAULT_STARTUP_DEFERRED_MISSED_AGENT_JOB_DELAY_MS = 12e4;
/** Payloads that execute outside the main session own cancellable task-run state. */
function runsDetachedFromMainSession(job) {
	return job.sessionTarget !== "main" || job.payload.kind === "script";
}
function resolveMainSessionCronDeliveryContext(state, job) {
	const targetSessionKey = job.sessionKey?.trim();
	if (!targetSessionKey) return;
	const explicitAgentId = job.agentId?.trim();
	const agentId = normalizeAgentId(explicitAgentId || resolveAgentIdFromSessionKey(targetSessionKey, state.deps.resolveDefaultAgentId?.() ?? state.deps.defaultAgentId));
	const storePath = state.deps.resolveSessionStorePath?.(agentId) ?? state.deps.sessionStorePath;
	if (!storePath) return;
	try {
		const sessionEntry = loadSessionEntryReadOnly({
			agentId,
			sessionKey: targetSessionKey,
			storePath
		});
		return deliveryContextFromSession(sessionEntry);
	} catch {
		return;
	}
}
//#endregion
//#region src/cron/service/timer-outcome-events.ts
/** Records a terminal task/event fact before the fallible runtime-row commit. */
async function emitCronOutcomeForJob(state, job, result) {
	if (result.status === "ok" && result.triggerEval && !result.triggerEval.fired) return;
	await recordCronOutcomeForJob(state, job, result);
	emitCronOutcomeEventForJob(state, job, result);
}
function createCronOutcomeEvent(job, result) {
	return {
		jobId: job.id,
		action: "finished",
		job,
		status: result.status,
		completionStatus: result.completionStatus,
		error: result.error,
		summary: result.summary,
		diagnostics: result.diagnostics,
		delivered: job.state.lastDelivered,
		deliveryStatus: job.state.lastDeliveryStatus,
		deliveryError: job.state.lastDeliveryError,
		deliverySuppressionReason: job.state.deliverySuppressionReason,
		failureNotificationDelivery: failureNotificationDeliveryFromJobState(job),
		delivery: result.delivery,
		sessionId: result.sessionId,
		sessionKey: result.sessionKey,
		runAtMs: result.startedAt,
		durationMs: job.state.lastDurationMs,
		nextRunAtMs: job.state.nextRunAtMs,
		...result.triggerEval?.fired ? { triggerFired: true } : {},
		model: result.model,
		provider: result.provider,
		usage: result.usage
	};
}
async function recordCronOutcomeForJob(state, job, result) {
	const event = createCronOutcomeEvent(job, result);
	await finishCronRun(state, {
		taskRunId: result.taskRunId,
		job,
		event,
		errorClassification: result.errorClassification,
		scriptResult: {
			scriptStateChanged: result.scriptStateChanged,
			scriptState: result.scriptState
		},
		...result.triggerEval ? { triggerEval: result.triggerEval } : {}
	});
}
function emitCronOutcomeEventForJob(state, job, result) {
	emit(state, createCronOutcomeEvent(job, result), cronFailureNotificationEventContext(result.failureNotificationDetail));
}
//#endregion
//#region src/cron/retry-hint.ts
const SERVER_ERROR_PATTERN = /\b(?:https?|status(?:[ _]code)?|response(?:[ _]code)?|http(?:[ _]status)?)\b[\s:=#"']{0,4}5\d{2}\b|\b5\d{2}\b[\s:)\].,-]*(?:internal server error|server error|bad gateway|service unavailable|gateway time-?out)\b|\binternal server error\b|\bbad gateway\b|\bservice unavailable\b|\bgateway time-?out\b|\b5xx\b|^\s*5\d{2}\s*$/i;
const RATE_LIMIT_PATTERN = /\b(?:https?(?:\/\d(?:\.\d)?)?|status(?:[ _-]?code)?|response(?:[ _-]?code)?|http(?:[ _-]?status)?)\b[\s:=#"'(]{0,6}429\b|\b(?:provider\s+)?api[ _-]?error\b[\s:=#"'(]{0,6}429\b|\b(?:requested\s+)?url\s+returned\s+error\b[\s:=#"'(]{0,6}429\b|\b429\b[\s:)\].,-]*(?:rate[_ -]?limit(?:ed|ing)?(?:[_ -](?:error|exceeded|reached))?|too many requests|resource has been exhausted|quota(?:\s+(?:exceeded|exhausted|depleted|reached))?)\b|\brate[_ -]?limit(?:ed|ing)?(?:[_ -](?:error|exceeded|reached))?\b|\btoo many requests\b|\bresource has been exhausted\b|\btokens per day\b|^\s*429\s*$/i;
const SESSION_LIFECYCLE_CLAIM_ERROR_PATTERN = /^(?:(?:CronSessionLifecycleClaimError|Error): )?Session "[^"\n]+" (?:changed|was deleted) while starting work\. Retry\.$/;
const TRANSIENT_PATTERNS = {
	rate_limit: RATE_LIMIT_PATTERN,
	overloaded: /^\s*529(?:\s*$|[\s:)\].,-]*(?:api\b.*\bbusy\b|(?:please\s+)?try\s+again\b))|\b(?:https?(?:\/\d(?:\.\d)?)?|status(?:[ _-]?code)?|response(?:[ _-]?code)?|http(?:[ _-]?status)?|(?:provider\s+)?api[ _-]?error|(?:requested\s+)?url\s+returned\s+error)\b[\s:=#"'(]{0,6}529\b|\boverloaded(?:_error)?\b|high demand|temporar(?:ily|y) overloaded|capacity exceeded/i,
	network: /(network|fetch failed|socket|econnreset|econnrefused|eai_again|enetdown|ehostunreach|ehostdown|enetreset|enetunreach|epipe)/i,
	timeout: /(timeout|timed out|stalled before execution start|etimedout)/i,
	server_error: SERVER_ERROR_PATTERN
};
/** Classifies cron execution errors against the configured retryable transient categories. */
function resolveCronExecutionRetryHint(input) {
	const { error, retryOn, classifiedReason, executionStarted } = input;
	if (!error || typeof error !== "string") return { retryable: false };
	if (SESSION_LIFECYCLE_CLAIM_ERROR_PATTERN.test(error)) return { retryable: executionStarted !== true };
	const keys = retryOn?.length ? retryOn : Object.keys(TRANSIENT_PATTERNS);
	const classified = classifiedReason ?? void 0;
	if (classified) return keys.includes(classified) ? {
		retryable: true,
		category: classified
	} : { retryable: false };
	for (const key of keys) if (TRANSIENT_PATTERNS[key]?.test(error)) return {
		retryable: true,
		category: key
	};
	return { retryable: false };
}
//#endregion
//#region src/cron/service/timer-trigger.ts
/** Default max retries for cron jobs on transient errors (#24355). */
const DEFAULT_MAX_TRANSIENT_RETRIES = 3;
/** Rejects outcome-generated schedule timestamps before they can persist or arm a timer. */
function resolveNextRunAtMsOrDisable(params) {
	const nextRunAtMs = asDateTimestampMs(params.candidate);
	if (nextRunAtMs !== void 0 && nextRunAtMs > 0) return nextRunAtMs;
	autoDisableCronJob({
		job: params.job,
		reason: "schedule-errors",
		atMs: params.state.deps.nowMs(),
		consecutiveErrors: 1,
		deferredNotifications: params.deferredNotifications
	});
}
/** Persists non-busy trigger evaluation state without touching payload-run history. */
function applyTriggerEvaluationState(job, triggerEval, evaluatedAtMs) {
	if (triggerEval.busy) return;
	job.state.lastTriggerEvalAtMs = evaluatedAtMs;
	job.state.triggerEvalCount = (job.state.triggerEvalCount ?? 0) + 1;
	if (triggerEval.stateChanged) job.state.triggerState = triggerEval.state;
	if (triggerEval.fired) job.state.lastTriggerFireAtMs = evaluatedAtMs;
}
/** Persists fired/error trigger metadata and disarms successful once triggers. */
function applyTriggerRunResult(job, result, opts) {
	if (!result.triggerEval || opts?.triggerOwnership === "stale") return;
	applyTriggerEvaluationState(job, result.status === "ok" ? result.triggerEval : {
		...result.triggerEval,
		stateChanged: false,
		state: void 0
	}, result.endedAt);
	if (opts?.scheduleOwnership !== "stale" && result.triggerEval.fired && job.trigger?.once === true && result.status === "ok") {
		if (job.schedule.kind === "stream") job.state.streamSourceIdentity = createCronStreamSourceIdentity();
		job.enabled = false;
		job.state.nextRunAtMs = void 0;
	}
}
function resolveCronNextRunWithLowerBound(params) {
	if (params.naturalNext === void 0) {
		params.state.deps.log.warn({
			jobId: params.job.id,
			jobName: params.job.name
		}, "cron: next run unresolved; clearing schedule to avoid a refire loop");
		return;
	}
	return resolveNextRunAtMsOrDisable({
		state: params.state,
		job: params.job,
		candidate: Math.max(params.naturalNext, params.lowerBoundMs),
		deferredNotifications: params.deferredNotifications
	});
}
function resolveTransientCronRetryDecision(params) {
	if (params.errorClassification?.kind === "permanent") return {
		retryable: false,
		consecutiveErrors: params.consecutiveErrors ?? 0,
		reason: "permanent error"
	};
	const retryHint = resolveCronExecutionRetryHint({
		error: params.error,
		retryOn: void 0,
		classifiedReason: params.errorClassification?.kind === "reason" ? params.errorClassification.reason : params.lastErrorReason,
		executionStarted: params.executionStarted
	});
	const consecutiveErrors = params.consecutiveErrors ?? 0;
	if (!retryHint.retryable) return {
		retryable: false,
		consecutiveErrors,
		retryCategory: retryHint.category,
		reason: "permanent error"
	};
	if (consecutiveErrors > DEFAULT_MAX_TRANSIENT_RETRIES) return {
		retryable: false,
		consecutiveErrors,
		retryCategory: retryHint.category,
		reason: "max retries exhausted"
	};
	return {
		retryable: true,
		consecutiveErrors,
		retryCategory: retryHint.category,
		backoffMs: errorBackoffMs(consecutiveErrors, DEFAULT_ERROR_BACKOFF_SCHEDULE_MS.slice(0, DEFAULT_MAX_TRANSIENT_RETRIES)),
		reason: "transient retry"
	};
}
function resolveDisabledHeartbeatOneShotRetryDecision(params) {
	const consecutiveSkipped = params.consecutiveSkipped ?? 0;
	if (consecutiveSkipped > DEFAULT_MAX_TRANSIENT_RETRIES) return {
		retryable: false,
		consecutiveSkipped,
		reason: "max retries exhausted"
	};
	return {
		retryable: true,
		consecutiveSkipped,
		backoffMs: errorBackoffMs(consecutiveSkipped, DEFAULT_ERROR_BACKOFF_SCHEDULE_MS.slice(0, DEFAULT_MAX_TRANSIENT_RETRIES)),
		reason: "disabled heartbeat retry"
	};
}
function normalizeQueuedSystemEventHandle(result) {
	if (typeof result === "boolean") return { accepted: result };
	if (result && typeof result === "object") return {
		accepted: result.accepted !== false,
		...result.remove ? { remove: result.remove } : {}
	};
	return { accepted: true };
}
function removeQueuedSystemEventHandle(state, job, queued) {
	if (!queued.accepted || !queued.remove) return;
	try {
		queued.remove();
	} catch (err) {
		state.deps.log.warn({
			jobId: job.id,
			jobName: job.name,
			err
		}, "cron: failed to remove undelivered main-session system event");
	}
}
function shouldRetryDisabledHeartbeatOneShot(job, result) {
	return job.schedule.kind === "at" && job.sessionTarget === "main" && job.wakeMode === "now" && result.status === "skipped" && result.error === "disabled";
}
function isScheduledTerminalOneShotRetry(job, lastRunStatus, lastRun, nextRun) {
	if (!isJobEnabled(job) || typeof nextRun !== "number" || typeof lastRun !== "number" || nextRun <= lastRun) return false;
	if (lastRunStatus === "error") return true;
	return lastRunStatus === "skipped" && job.sessionTarget === "main" && job.wakeMode === "now" && job.state.lastError === "disabled";
}
function resolveDeliveryState(params) {
	const primaryDeliveryPlan = resolveCronDeliveryPlan(params.job);
	const primaryDeliveryRequested = primaryDeliveryPlan.requested;
	const noFailureNotification = { status: "not-requested" };
	if (params.delivered === true && (params.runStatus !== "error" || params.delivery?.delivered === true)) return {
		delivered: true,
		status: "delivered",
		failureNotification: noFailureNotification
	};
	if (!primaryDeliveryRequested) {
		if (primaryDeliveryPlan.mode === "webhook" && params.deliveryAttempted === true) return {
			delivered: false,
			status: "not-delivered",
			error: params.error,
			failureNotification: noFailureNotification
		};
		return {
			status: "not-requested",
			failureNotification: noFailureNotification
		};
	}
	if (params.runStatus === "error") {
		if (params.delivered !== void 0) return {
			delivered: false,
			status: "not-delivered",
			error: params.error,
			deliverySuppressionReason: params.deliverySuppressionReason,
			failureNotification: noFailureNotification
		};
		return {
			status: "unknown",
			error: params.error,
			failureNotification: noFailureNotification
		};
	}
	if (params.delivered === false) return {
		delivered: false,
		status: "not-delivered",
		error: params.error,
		deliverySuppressionReason: params.deliverySuppressionReason,
		failureNotification: { status: "not-requested" }
	};
	return {
		status: "unknown",
		failureNotification: { status: "not-requested" }
	};
}
//#endregion
//#region src/cron/service/timer-outcomes.ts
/** Checks both the admitted schedule and edits that may have returned to its original value. */
function resolveCronRunScheduleOwnership(params) {
	return typeof params.currentJob.state.runningScheduleChangeId === "string" || params.activeJobMarker?.scheduleMutated === true || !cronSchedulingInputsEqual(params.admittedJob, params.currentJob) ? "stale" : "current";
}
/** Keeps trigger state owned by the exact script/once definition that evaluated it. */
function resolveCronRunTriggerOwnership(params) {
	return params.activeJobMarker?.triggerMutated === true || params.admittedJob.trigger?.script !== params.currentJob.trigger?.script || params.admittedJob.trigger?.once !== params.currentJob.trigger?.once ? "stale" : "current";
}
function assignNextRunAtMs(params) {
	const nextRunAtMs = resolveNextRunAtMsOrDisable(params);
	params.job.state.nextRunAtMs = nextRunAtMs;
	return nextRunAtMs;
}
/** Applies run outcome state, delivery state, backoff/next-run scheduling, and delete-after-run policy. */
function applyJobResult(state, job, result, opts) {
	const scheduleNextRun = (candidate) => assignNextRunAtMs({
		state,
		job,
		candidate,
		deferredNotifications: opts.deferredNotifications
	});
	const previousScheduleState = {
		enabled: job.enabled,
		nextRunAtMs: job.state.nextRunAtMs,
		pacedNextRunAtMs: job.state.pacedNextRunAtMs,
		forcePreservedNextRunAtMs: job.state.forcePreservedNextRunAtMs
	};
	job.state.queuedAtMs = void 0;
	job.state.runningAtMs = void 0;
	job.state.runningReceiptId = void 0;
	delete job.state.runningScheduleChangeId;
	job.state.pacedNextRunAtMs = void 0;
	job.state.forcePreservedNextRunAtMs = void 0;
	job.state.lastRunAtMs = result.startedAt;
	job.state.lastRunStatus = result.status;
	job.state.lastStatus = result.status;
	job.state.lastDurationMs = Math.max(0, result.endedAt - result.startedAt);
	job.state.lastError = result.error;
	job.state.lastDiagnostics = normalizeCronRunDiagnostics(result.diagnostics);
	job.state.lastDiagnosticSummary = summarizeCronRunDiagnostics(job.state.lastDiagnostics);
	job.state.lastErrorReason = result.status === "error" && typeof result.error === "string" ? resolveCronRunErrorReason(result.error, result.provider, result.errorClassification) : void 0;
	if (result.status === "error") state.deps.log.warn({
		jobId: job.id,
		jobName: job.name,
		error: result.error,
		diagnosticsSummary: job.state.lastDiagnosticSummary
	}, "cron: job run returned error status");
	const deliveryState = result.deliveryState ?? resolveDeliveryState({
		job,
		runStatus: result.status,
		delivery: result.delivery,
		delivered: result.delivered,
		deliveryAttempted: result.deliveryAttempted,
		error: result.deliveryError ?? result.error,
		deliverySuppressionReason: result.deliverySuppressionReason
	});
	job.state.lastDelivered = deliveryState.delivered;
	job.state.lastDeliveryStatus = deliveryState.status;
	job.state.deliverySuppressionReason = deliveryState.deliverySuppressionReason;
	job.state.lastDeliveryError = deliveryState.error;
	job.state.lastFailureNotificationDelivered = void 0;
	job.state.lastFailureNotificationDeliveryStatus = "not-requested";
	job.state.lastFailureNotificationDeliveryError = void 0;
	job.updatedAtMs = result.endedAt;
	const completionStatus = result.completionStatus ?? resolveAdmittedCronCompletionStatus(job, result.status, deliveryState.status, deliveryState.deliverySuppressionReason);
	const previousConsecutiveErrors = job.state.consecutiveErrors ?? 0;
	const computeNaturalNext = (restartInterval) => {
		try {
			return restartInterval && job.schedule.kind === "every" ? computeNextRunAtMs(job.schedule, result.endedAt) : computeJobNextRunAtMs(job, result.endedAt);
		} catch (err) {
			recordScheduleComputeError({
				state,
				job,
				err,
				deferredNotifications: opts.deferredNotifications
			});
			return;
		}
	};
	const alertConfig = resolveFailureAlert(state, job);
	if (result.status === "error") {
		job.state.consecutiveErrors = (job.state.consecutiveErrors ?? 0) + 1;
		job.state.consecutiveSkipped = 0;
	} else if (result.status === "skipped") {
		job.state.consecutiveErrors = 0;
		job.state.consecutiveSkipped = (job.state.consecutiveSkipped ?? 0) + 1;
		if (alertConfig?.includeSkipped && !opts.replay) maybeEmitFailureAlert(state, {
			job,
			alertConfig,
			status: "skipped",
			error: result.error,
			runAtMs: result.startedAt,
			consecutiveCount: job.state.consecutiveSkipped,
			deferredNotifications: opts.deferredNotifications
		});
	} else {
		job.state.consecutiveErrors = 0;
		job.state.consecutiveSkipped = 0;
		if (completionStatus === "succeeded") job.state.lastFailureAlertAtMs = void 0;
	}
	const scheduleOwnershipAtMs = opts.scheduleOwnershipAtMs ?? result.startedAt;
	const oneShotOccurrenceAtMs = resolveManualOneShotOccurrenceAtMs(job, scheduleOwnershipAtMs);
	const preserveOneShotSchedule = opts.scheduleMode === "preserve" && oneShotOccurrenceAtMs !== void 0;
	const ownsSchedule = opts.scheduleOwnership !== "stale";
	const isOneShotSchedule = job.schedule.kind === "at" || job.schedule.kind === "on-exit";
	const shouldDelete = ownsSchedule && isOneShotSchedule && !preserveOneShotSchedule && job.deleteAfterRun === true && completionStatus === "succeeded";
	let autoDisableNotificationOwnsFailure = false;
	const applyReplaySchedule = () => {
		const nextRunAtMs = job.state.autoDisabled ? void 0 : opts.replaySchedule?.nextRunAtMs;
		job.state.nextRunAtMs = nextRunAtMs === void 0 ? void 0 : scheduleNextRun(nextRunAtMs);
	};
	const finish = () => {
		if (opts.replaySchedule && job.schedule.kind !== "at") applyReplaySchedule();
		finalizeCronFailureNotifications(state, {
			job,
			alertConfig,
			result,
			completionStatus,
			autoDisableNotificationOwnsFailure,
			replay: opts.replay,
			deferredNotifications: opts.deferredNotifications
		});
		return shouldDelete;
	};
	if (!ownsSchedule) {
		job.enabled = previousScheduleState.enabled;
		job.state.nextRunAtMs = previousScheduleState.nextRunAtMs;
		job.state.pacedNextRunAtMs = previousScheduleState.pacedNextRunAtMs;
		job.state.forcePreservedNextRunAtMs = previousScheduleState.forcePreservedNextRunAtMs;
	} else if (!shouldDelete) {
		if (preserveOneShotSchedule) {
			job.state.nextRunAtMs = previousScheduleState.nextRunAtMs;
			job.state.pacedNextRunAtMs = previousScheduleState.pacedNextRunAtMs;
			job.state.forcePreservedNextRunAtMs = oneShotOccurrenceAtMs;
		} else if (opts.replaySchedule && job.schedule.kind === "at") {
			applyReplaySchedule();
			job.enabled = job.state.nextRunAtMs !== void 0;
		} else if (job.schedule.kind === "at" && isJobEnabled(job)) {
			if (shouldRetryDisabledHeartbeatOneShot(job, result)) {
				const retryDecision = resolveDisabledHeartbeatOneShotRetryDecision({ consecutiveSkipped: job.state.consecutiveSkipped });
				if (retryDecision.retryable && retryDecision.backoffMs !== void 0) {
					if (scheduleNextRun(result.endedAt + retryDecision.backoffMs) !== void 0) state.deps.log.info({
						jobId: job.id,
						jobName: job.name,
						consecutiveSkipped: retryDecision.consecutiveSkipped,
						backoffMs: retryDecision.backoffMs,
						nextRunAtMs: job.state.nextRunAtMs
					}, "cron: scheduling one-shot retry after disabled heartbeat");
				} else {
					job.enabled = false;
					job.state.nextRunAtMs = void 0;
					state.deps.log.warn({
						jobId: job.id,
						jobName: job.name,
						consecutiveSkipped: retryDecision.consecutiveSkipped,
						reason: retryDecision.reason
					}, "cron: disabling one-shot job after disabled heartbeat retries");
				}
			} else if (result.status === "ok" || result.status === "skipped") {
				job.enabled = false;
				job.state.nextRunAtMs = void 0;
			} else if (result.status === "error") {
				const retryDecision = resolveTransientCronRetryDecision({
					error: result.error,
					errorClassification: result.errorClassification,
					lastErrorReason: job.state.lastErrorReason,
					executionStarted: result.executionStarted,
					consecutiveErrors: job.state.consecutiveErrors
				});
				if (retryDecision.retryable && retryDecision.backoffMs !== void 0) {
					if (scheduleNextRun(result.endedAt + retryDecision.backoffMs) !== void 0) state.deps.log.info({
						jobId: job.id,
						jobName: job.name,
						consecutiveErrors: retryDecision.consecutiveErrors,
						backoffMs: retryDecision.backoffMs,
						nextRunAtMs: job.state.nextRunAtMs,
						retryCategory: retryDecision.retryCategory
					}, "cron: scheduling one-shot retry after transient error");
				} else {
					job.enabled = false;
					job.state.nextRunAtMs = void 0;
					state.deps.log.warn({
						jobId: job.id,
						jobName: job.name,
						consecutiveErrors: retryDecision.consecutiveErrors,
						error: result.error,
						reason: retryDecision.reason,
						retryCategory: retryDecision.retryCategory
					}, "cron: disabling one-shot job after error");
				}
			}
		} else if (opts.scheduleMode === "preserve") {
			job.state.nextRunAtMs = previousScheduleState.nextRunAtMs;
			job.state.pacedNextRunAtMs = previousScheduleState.pacedNextRunAtMs;
			job.state.forcePreservedNextRunAtMs = previousScheduleState.nextRunAtMs;
		} else if (result.status === "error" && isJobEnabled(job) && maybeAutoDisableCronJobAfterRunFailure({
			job,
			atMs: result.endedAt,
			deferredNotifications: opts.deferredNotifications
		})) {
			autoDisableNotificationOwnsFailure = true;
			state.deps.log.error({
				jobId: job.id,
				name: job.name,
				consecutiveErrors: job.state.consecutiveErrors,
				error: result.error
			}, "cron: auto-disabled job after consecutive run failures");
		} else if (result.status === "error" && isJobEnabled(job)) {
			const retryDecision = resolveTransientCronRetryDecision({
				error: result.error,
				errorClassification: result.errorClassification,
				lastErrorReason: job.state.lastErrorReason,
				executionStarted: result.executionStarted,
				consecutiveErrors: job.state.consecutiveErrors
			});
			let normalNext;
			let normalNextComputed = false;
			const computeNormalNext = () => {
				if (!normalNextComputed) {
					normalNext = computeNaturalNext(retryDecision.retryable || previousConsecutiveErrors > 0);
					normalNextComputed = true;
				}
				return normalNext;
			};
			if (retryDecision.retryable && retryDecision.backoffMs !== void 0) {
				normalNext = computeNormalNext();
				if (normalNext === void 0) {} else {
					const retryNextRunAtMs = scheduleNextRun(result.endedAt + retryDecision.backoffMs);
					if (retryNextRunAtMs === void 0) return finish();
					if (retryNextRunAtMs < normalNext) {
						state.deps.log.info({
							jobId: job.id,
							jobName: job.name,
							consecutiveErrors: retryDecision.consecutiveErrors,
							backoffMs: retryDecision.backoffMs,
							nextRunAtMs: job.state.nextRunAtMs,
							normalNextRunAtMs: normalNext,
							retryCategory: retryDecision.retryCategory
						}, "cron: scheduling recurring retry after transient error");
						return finish();
					}
				}
			}
			const backoff = errorBackoffMs(job.state.consecutiveErrors ?? 1, DEFAULT_ERROR_BACKOFF_SCHEDULE_MS);
			normalNext = computeNormalNext();
			if (normalNext === void 0 && job.schedule.kind === "every") {
				scheduleNextRun(void 0);
				return finish();
			}
			const backoffNext = scheduleNextRun(result.endedAt + backoff);
			if (backoffNext === void 0) return finish();
			job.state.nextRunAtMs = job.schedule.kind === "cron" ? resolveCronNextRunWithLowerBound({
				state,
				job,
				naturalNext: normalNext,
				lowerBoundMs: backoffNext,
				deferredNotifications: opts.deferredNotifications
			}) : normalNext !== void 0 ? Math.max(normalNext, backoffNext) : backoffNext;
			state.deps.log.info({
				jobId: job.id,
				consecutiveErrors: job.state.consecutiveErrors,
				backoffMs: backoff,
				nextRunAtMs: job.state.nextRunAtMs
			}, "cron: applying error backoff");
		} else if (isJobEnabled(job) && result.status === "ok" && job.pacing !== void 0 && result.nextCheck !== void 0) {
			const pacedNextRunAtMs = resolvePacedNextRunAtMs({
				nowMs: result.endedAt,
				delayMs: result.nextCheck.delayMs,
				pacing: job.pacing
			});
			const nextRunAtMs = scheduleNextRun(job.trigger ? Math.max(pacedNextRunAtMs ?? NaN, result.endedAt + Math.max(MIN_REFIRE_GAP_MS, resolveCronTriggerMinIntervalMs())) : pacedNextRunAtMs);
			job.state.pacedNextRunAtMs = nextRunAtMs;
		} else if (isJobEnabled(job)) {
			const naturalNext = computeNaturalNext(previousConsecutiveErrors > 0);
			if (job.schedule.kind === "cron") {
				const minNext = result.endedAt + Math.max(MIN_REFIRE_GAP_MS, job.trigger ? resolveCronTriggerMinIntervalMs() : 0);
				job.state.nextRunAtMs = resolveCronNextRunWithLowerBound({
					state,
					job,
					naturalNext,
					lowerBoundMs: minNext,
					deferredNotifications: opts.deferredNotifications
				});
			} else {
				const triggerNext = naturalNext !== void 0 && job.trigger ? Math.max(naturalNext, result.endedAt + resolveCronTriggerMinIntervalMs()) : naturalNext;
				job.state.nextRunAtMs = triggerNext;
				if (triggerNext !== void 0 || job.schedule.kind === "every") scheduleNextRun(triggerNext);
			}
		} else job.state.nextRunAtMs = void 0;
	}
	return finish();
}
/** Commits payload-script state only after the complete cron run succeeds. */
function applyScriptRunResult(job, result, opts) {
	if (opts?.triggerOwnership !== "stale" && result.status === "ok" && result.scriptStateChanged === true) job.state.triggerState = result.scriptState;
}
/** Applies a quiet trigger tick without mutating normal run-history state. */
function applyTriggerNoFireResult(state, job, result, opts) {
	const previousNextRunAtMs = job.state.nextRunAtMs;
	const previousPacedNextRunAtMs = job.state.pacedNextRunAtMs;
	const previousForcePreservedNextRunAtMs = job.state.forcePreservedNextRunAtMs;
	job.state.queuedAtMs = void 0;
	job.state.runningAtMs = void 0;
	job.state.runningReceiptId = void 0;
	delete job.state.runningScheduleChangeId;
	job.updatedAtMs = result.endedAt;
	if (!result.triggerEval.busy && opts.triggerOwnership !== "stale") {
		job.state.consecutiveErrors = 0;
		job.state.scheduleErrorCount = 0;
		applyTriggerEvaluationState(job, result.triggerEval, result.endedAt);
		maybeEmitFailureRecovery({
			job,
			alertConfig: resolveFailureAlert(state, job),
			triggerOnly: true,
			replay: opts.replay,
			deferredNotifications: opts.deferredNotifications
		});
	}
	if (opts.scheduleMode === "immediate-preserve" || opts.scheduleMode === "stale-preserve") {
		job.state.nextRunAtMs = previousNextRunAtMs;
		job.state.pacedNextRunAtMs = previousPacedNextRunAtMs;
		job.state.forcePreservedNextRunAtMs = opts.scheduleMode === "immediate-preserve" ? previousNextRunAtMs : previousForcePreservedNextRunAtMs;
		return;
	}
	job.state.pacedNextRunAtMs = void 0;
	job.state.forcePreservedNextRunAtMs = void 0;
	try {
		const naturalNext = computeJobNextRunAtMs(job, result.endedAt);
		const floorMs = Math.max(MIN_REFIRE_GAP_MS, resolveCronTriggerMinIntervalMs());
		job.state.nextRunAtMs = naturalNext;
		if (naturalNext !== void 0 || job.schedule.kind === "every") assignNextRunAtMs({
			state,
			job,
			candidate: naturalNext === void 0 ? void 0 : Math.max(naturalNext, result.endedAt + floorMs),
			deferredNotifications: opts.deferredNotifications
		});
	} catch (err) {
		recordScheduleComputeError({
			state,
			job,
			err,
			deferredNotifications: opts.deferredNotifications
		});
	}
}
async function applyOutcomeToStoredJob(state, result, opts) {
	const store = state.store;
	if (!store) {
		if (result.status === "ok" && result.triggerEval?.fired === false) await recordQuietCronEvaluation(state, result);
		return;
	}
	const jobs = store.jobs;
	const job = jobs.find((entry) => entry.id === result.jobId);
	if (!job || result.activeJobMarker?.jobRemoved === true) {
		if (result.status === "ok" && result.triggerEval?.fired === false) {
			await recordQuietCronEvaluation(state, result);
			return;
		}
		applyJobResult(state, result.job, result, {
			scheduleOwnership: "stale",
			deferredNotifications: opts.deferredNotifications
		});
		await emitCronOutcomeForJob(state, result.job, result);
		state.deps.log.info({
			jobId: result.jobId,
			status: result.status
		}, "cron: finalized run after job was removed during execution");
		return;
	}
	const shouldDelete = applyOutcomeToAuthoritativeJob(state, job, result, opts);
	await emitCronOutcomeForJob(state, job, result);
	if (shouldDelete) {
		store.jobs = jobs.filter((entry) => entry.id !== job.id);
		return job;
	}
}
/** Applies one outcome to a row already re-read under the runtime write transaction. */
function applyOutcomeToAuthoritativeJob(state, job, result, opts) {
	const scheduleOwnership = resolveCronRunScheduleOwnership({
		admittedJob: result.job,
		currentJob: job,
		activeJobMarker: result.activeJobMarker
	});
	const triggerOwnership = opts.triggerStateRetired ? "stale" : resolveCronRunTriggerOwnership({
		admittedJob: result.job,
		currentJob: job,
		activeJobMarker: result.activeJobMarker
	});
	if (result.status === "ok" && result.triggerEval && !result.triggerEval.fired) {
		applyTriggerNoFireResult(state, job, {
			startedAt: result.startedAt,
			endedAt: result.endedAt,
			triggerEval: result.triggerEval
		}, {
			scheduleMode: scheduleOwnership === "stale" ? "stale-preserve" : opts.request?.preserveCadence ? "immediate-preserve" : "advance",
			triggerOwnership,
			deferredNotifications: opts.deferredNotifications
		});
		if (!opts.request) job.state.startupCatchupAtMs = void 0;
		if (!opts.request && scheduleOwnership === "current") job.state.pacedNextRunAtMs = void 0;
		return false;
	}
	const shouldDelete = applyJobResult(state, job, result, {
		scheduleMode: opts.request?.preserveCadence && scheduleOwnership === "current" ? "preserve" : "advance",
		scheduleOwnership,
		scheduleOwnershipAtMs: opts.request?.scheduleOwnershipAtMs,
		deferredNotifications: opts.deferredNotifications
	});
	applyTriggerRunResult(job, result, {
		scheduleOwnership,
		triggerOwnership
	});
	applyScriptRunResult(job, result, { triggerOwnership });
	if (opts.request) {
		if (job.schedule.kind === "stream") job.state.nextRunAtMs = void 0;
	} else job.state.startupCatchupAtMs = void 0;
	return shouldDelete;
}
//#endregion
//#region src/cron/store/run-receipt-trigger-state.ts
const RETIREMENTS_TABLE = "cron_run_trigger_state_retirements";
function query(database) {
	return getNodeSqliteKysely(database);
}
function stateWriterQuery(database, handle) {
	return query(database).selectFrom("cron_run_receipts").where("cron_run_receipts.receipt_id", "=", handle.receiptId).where("cron_run_receipts.store_key", "=", handle.storeKey).where("cron_run_receipts.job_id", "=", handle.jobId).where("cron_run_receipts.started_at_ms", "=", handle.startedAtMs);
}
function ensureRetirementsTable(database) {
	if (tableExists(database, RETIREMENTS_TABLE)) return;
	const start = OPENCLAW_STATE_SCHEMA_SQL.indexOf(`CREATE TABLE IF NOT EXISTS ${RETIREMENTS_TABLE} (`);
	const end = OPENCLAW_STATE_SCHEMA_SQL.indexOf("\n) STRICT;", start);
	if (start < 0 || end < start) throw new Error("OpenClaw cron run trigger-state retirement schema is missing.");
	database.exec(OPENCLAW_STATE_SCHEMA_SQL.slice(start, end + 10));
}
/** Retires the exact pending state writer in the acknowledged edit's transaction. */
function retireCronRunTriggerStateInDatabase(params) {
	const { database, handle } = params;
	const receipt = executeSqliteQueryTakeFirstSync(database, stateWriterQuery(database, handle).select(["receipt_id", "started_at_ms"]));
	if (!receipt) return;
	const job = loadedCronStoreFromRows(loadCronRows(database, handle.storeKey, /* @__PURE__ */ new Set([handle.jobId]))).store.jobs[0];
	if (job?.state.runningAtMs !== receipt.started_at_ms || job.state.runningReceiptId !== void 0 && job.state.runningReceiptId !== receipt.receipt_id) return;
	ensureRetirementsTable(database);
	executeSqliteQuerySync(database, query(database).insertInto(RETIREMENTS_TABLE).values({ receipt_id: receipt.receipt_id }).onConflict((conflict) => conflict.column("receipt_id").doNothing()));
}
/** Reads retirement after write admission without changing execution authority. */
function isCronRunTriggerStateRetiredInDatabase(params) {
	const { database, handle } = params;
	if (!tableExists(database, RETIREMENTS_TABLE)) return false;
	return executeSqliteQueryTakeFirstSync(database, stateWriterQuery(database, handle).innerJoin(RETIREMENTS_TABLE, `${RETIREMENTS_TABLE}.receipt_id`, "cron_run_receipts.receipt_id").select("cron_run_receipts.receipt_id")) !== void 0;
}
//#endregion
//#region src/cron/service/run-history-recovery.ts
function receiptIdFromCronRunId(taskRunId, jobId, startedAt) {
	const prefix = `${createCronExecutionId(jobId, startedAt)}:`;
	if (!taskRunId?.startsWith(prefix)) return;
	return taskRunId.slice(prefix.length).split(":", 1)[0] || void 0;
}
function findLatestCronRunForRecovery(records, jobId, startedAt, storeKey, receiptId) {
	const executionRunId = createCronExecutionId(jobId, startedAt);
	const prefix = `${executionRunId}:`;
	const receiptRunId = receiptId ? `${prefix}${receiptId}` : void 0;
	return records.filter((record) => {
		if (record.jobId !== jobId) return false;
		const taskStoreKey = cronRunRecordStoreKey(record);
		if (receiptRunId) return taskStoreKey === storeKey && (record.runId === receiptRunId || record.runId?.startsWith(`${receiptRunId}:`));
		if (taskStoreKey === void 0) return record.runId === executionRunId;
		return taskStoreKey === storeKey && (record.runId === executionRunId || record.runId?.startsWith(prefix));
	}).toSorted((left, right) => Number(left.endedAt !== void 0) - Number(right.endedAt !== void 0) || resolveCronRunRecordTimestamp(right) - resolveCronRunRecordTimestamp(left) || right.createdAt - left.createdAt || right.id.localeCompare(left.id))[0];
}
function finalizedCronRun(record, jobId) {
	if (!record || record.jobId !== jobId || record.endedAt === void 0) return;
	const triggerEval = cronRunRecordToTriggerEval(record);
	const entry = cronRunRecordToRunLogEntry(record) ?? (record.status === "succeeded" && triggerEval?.fired === false ? {
		ts: record.endedAt,
		jobId,
		action: "finished",
		status: "ok",
		...record.startedAt === void 0 ? {} : {
			runAtMs: record.startedAt,
			durationMs: Math.max(0, record.endedAt - record.startedAt)
		}
	} : void 0);
	if (!entry?.status) return;
	const scriptResult = cronRunRecordToScriptRunResult(record);
	return {
		entry: {
			...entry,
			status: entry.status
		},
		...scriptResult ? { scriptResult } : {},
		...triggerEval ? { triggerEval } : {}
	};
}
/** Re-reads record recovery facts on the caller's exact SQLite transaction. */
function findCronRunRecoveryInDatabase(params) {
	const record = findLatestCronRunForRecovery(readCronRunRecordsInDatabase(params.database, params.jobId), params.jobId, params.startedAt, params.storeKey, params.receiptId);
	const finalized = finalizedCronRun(record, params.jobId);
	const runId = record?.runId ?? (params.receiptId ? `${createCronExecutionId(params.jobId, params.startedAt)}:${params.receiptId}` : void 0);
	const receiptId = receiptIdFromCronRunId(runId, params.jobId, params.startedAt);
	return {
		...runId ? { taskRunId: runId } : {},
		...receiptId ? { receiptId } : {},
		...finalized ? { finalized } : {}
	};
}
//#endregion
//#region src/cron/service/run-receipts.ts
function resolveCronRunReceiptAgentId(state, job) {
	return resolveCronJobEffectiveAgentId(job, state.deps.resolveDefaultAgentId ? state.deps.resolveDefaultAgentId() : state.deps.defaultAgentId);
}
/** Only receipt facts cross the reader boundary; liveness and claims stay with their owners. */
async function observeServiceCronRunReceipts(state, jobIds) {
	const context = captureOpenClawStateReadWorkerContext();
	const storeKey = cronStoreKey(state.deps.storePath);
	const assertCurrent = () => {
		context.admission.assertCurrent();
		if (resolveOpenClawStateSqlitePath() !== context.admission.databasePath || cronStoreKey(state.deps.storePath) !== storeKey) throw new Error("Cron receipt source changed during observation");
	};
	const command = {
		type: "cron.observeRunRecovery",
		storeKey,
		proposals: jobIds.map((jobId) => ({ jobId }))
	};
	const result = await executeExistingOpenClawStateRead({
		path: context.admission.databasePath,
		env: context.environment
	}, command, {
		context,
		current: true
	});
	assertCurrent();
	if (result && (!result.ok || result.type !== command.type)) throw new Error("Cron receipt observation did not return its admitted snapshot");
	const receipts = /* @__PURE__ */ new Map();
	if (result?.ok && result.type === command.type && result.observation.kind === "observed") {
		for (const proposal of result.observation.proposals) if (proposal.receipt) receipts.set(proposal.jobId, proposal.receipt);
	}
	return {
		receipts,
		assertCurrent
	};
}
/** Both admission paths bind message permissions from the same canonical occurrence. */
function markServiceCronJobActive(state, job, runReceipt) {
	return markCronJobActive(job.id, {
		agentId: runReceipt.agentId,
		declarationKey: job.declarationKey,
		preserveAcrossGenerationAdvance: !runsDetachedFromMainSession(job),
		isMessageActionAuthorityCurrent: createServiceCronRunMessageAuthorityChecker({
			state,
			job,
			handle: runReceipt,
			resolveInputs: resolveCronJobMessageToolAuthorityInputs
		}),
		isMessageSourceAuthorityCurrent: createServiceCronRunMessageAuthorityChecker({
			state,
			job,
			handle: runReceipt,
			resolveInputs: resolveCronJobMessageActionAuthorityInputs
		})
	});
}
/** Retains admission's permission facts while consulting the existing canonical receipt owner. */
function createServiceCronRunMessageAuthorityChecker(params) {
	const expected = params.resolveInputs(params.job);
	if (!expected) return;
	const { state, handle } = params;
	const admittedEnabled = isJobEnabled(params.job);
	return () => {
		let current;
		try {
			current = readCronRunReceiptCurrentJob({
				handle,
				resolveAgentId: (job) => resolveCronRunReceiptAgentId(state, job),
				isAgentAvailable: state.deps.isAgentAvailable
			});
		} catch (error) {
			if (error instanceof CronRunReceiptRevisionError) return false;
			throw error;
		}
		return current !== void 0 && (!admittedEnabled || isJobEnabled(current)) && isDeepStrictEqual(expected, params.resolveInputs(current));
	};
}
function prepareCronRunReceiptOwnerMutationHooks(params) {
	const { state, previousJob, nextJob } = params;
	const previousAgentId = resolveCronRunReceiptAgentId(state, previousJob);
	const nextAgentId = resolveCronRunReceiptAgentId(state, nextJob);
	if (previousAgentId === nextAgentId) return;
	const generation = state.lifecycleGeneration;
	return observeServiceCronRunReceipts(state, [nextJob.id]).then((observation) => {
		const assertCurrent = () => {
			observation.assertCurrent();
			if (state.lifecycleGeneration !== generation || resolveCronRunReceiptAgentId(state, previousJob) !== previousAgentId || resolveCronRunReceiptAgentId(state, nextJob) !== nextAgentId) throw new Error("Cron service or owner changed during receipt observation");
		};
		assertCurrent();
		const prepared = prepareCronRunReceiptAdjudication({
			storePath: state.deps.storePath,
			observed: observation.receipts.get(nextJob.id),
			nowMs: state.deps.nowMs()
		});
		return { beforeWrite: (database) => {
			assertCurrent();
			adjudicateActiveCronRunReceiptInDatabase({
				database,
				jobId: nextJob.id,
				prepared,
				finishedAtMs: state.deps.nowMs()
			});
		} };
	});
}
function cronRunReceiptMutationHooks(params) {
	const { ownerHooks } = params;
	if (!ownerHooks && !params.triggerStateChanged && !params.scheduleChangedJob && !params.messageActionAuthorityChanged && !params.messageSourceAuthorityChanged) return;
	return {
		...ownerHooks,
		beforeWrite: (database, receiptSchema) => {
			if (params.scheduleChangedJob) {
				if (loadedCronStoreFromRows(loadCronRows(database, cronStoreKey(params.state.deps.storePath), /* @__PURE__ */ new Set([params.jobId]))).store.jobs[0]?.state.runningAtMs !== void 0) params.scheduleChangedJob.state.runningScheduleChangeId = randomUUID();
				else delete params.scheduleChangedJob.state.runningScheduleChangeId;
			}
			if (params.triggerStateChanged) retireServiceCronRunTriggerStateInDatabase({
				...params,
				database
			});
			ownerHooks?.beforeWrite?.(database, receiptSchema);
		},
		afterCommit: () => {
			ownerHooks?.afterCommit?.();
			if (params.messageActionAuthorityChanged) noteActiveCronJobMessageActionAuthorityMutation(params.jobId);
			if (params.messageSourceAuthorityChanged) noteActiveCronJobMessageSourceAuthorityMutation(params.jobId);
			if (params.scheduleChangedJob) noteActiveCronJobScheduleMutation(params.jobId);
		}
	};
}
function retireServiceCronRunTriggerStateInDatabase(params) {
	const { database, jobId } = params;
	const storePath = params.state.deps.storePath;
	const active = findActiveCronRunReceiptInDatabase({
		database,
		storePath,
		jobId
	});
	if (active) {
		retireCronRunTriggerStateInDatabase({
			database,
			handle: active
		});
		return;
	}
	const storeKey = cronStoreKey(storePath);
	const job = loadedCronStoreFromRows(loadCronRows(database, storeKey, /* @__PURE__ */ new Set([jobId]))).store.jobs[0];
	const startedAtMs = job?.state.runningAtMs;
	if (!job || startedAtMs === void 0) return;
	const receiptId = job.state.runningReceiptId ?? findCronRunRecoveryInDatabase({
		database,
		jobId,
		storeKey,
		startedAt: startedAtMs
	}).receiptId;
	if (receiptId) retireCronRunTriggerStateInDatabase({
		database,
		handle: {
			receiptId,
			storeKey,
			jobId,
			startedAtMs
		}
	});
}
function assertServiceCronRunReceiptCurrent(state, handle, activeJobMarker) {
	assertCronRunReceiptCurrent({
		handle,
		resolveAgentId: (job) => resolveCronRunReceiptAgentId(state, job),
		isAgentAvailable: state.deps.isAgentAvailable,
		allowMissingJob: activeJobMarker?.jobId === handle.jobId && isCronSelfRemovalCurrent(activeJobMarker)
	});
}
function resolveCronRunReceiptTerminalStatus(status, triggerFired) {
	if (status === "ok") return triggerFired === false ? "skipped" : "ok";
	return status === "skipped" ? "skipped" : "error";
}
function logReceiptFinishError(state, handle, error) {
	state.deps.log.warn({
		jobId: handle.jobId,
		err: String(error)
	}, "cron: failed to finalize run receipt after execution settlement");
}
function finishReceiptAfterCommit(state, terminal) {
	try {
		finishCronRunReceipt(terminal);
	} catch (error) {
		logReceiptFinishError(state, terminal.handle, error);
	}
}
function trackServiceCronRunReceiptSettlement(params) {
	trackCronRunReceiptSettlement({
		handle: params.handle,
		settlement: params.settlement,
		onFinishError: (error) => logReceiptFinishError(params.state, params.handle, error)
	});
}
function cronRunReceiptPersistHooks(params) {
	const terminal = params.terminal ? {
		handle: params.handle,
		status: resolveCronRunReceiptTerminalStatus(params.terminal.status, params.terminal.triggerFired),
		finishedAtMs: params.terminal.finishedAtMs,
		error: params.terminal.error
	} : void 0;
	const deferTerminal = terminal && isCronRunReceiptSettlementPending(params.handle);
	return {
		beforeWrite: (database) => {
			const unavailableError = describeUnavailableCronAgent(params.handle.agentId);
			const recordsUnavailableGuard = terminal?.status === "error" && params.terminal?.disposition === "owner-unavailable";
			if (params.state.deps.isAgentAvailable?.(params.handle.agentId, database) === false && !recordsUnavailableGuard) throw new CronRunReceiptRevisionError(params.handle.receiptId, unavailableError, "owner-unavailable");
			if (params.allowMissingJob) assertCronRunReceiptOwnedInDatabase({
				database,
				handle: params.handle
			});
			else assertCronRunReceiptCurrentInDatabase({
				database,
				handle: params.handle,
				resolveAgentId: (job) => resolveCronRunReceiptAgentId(params.state, job)
			});
		},
		...terminal && !deferTerminal ? { afterWrite: (database, receiptSchema) => {
			finishCronRunReceiptInDatabase({
				receiptSchema,
				database,
				...terminal
			});
		} } : {},
		...terminal && deferTerminal ? { afterCommit: () => finishReceiptAfterCommit(params.state, terminal) } : {}
	};
}
//#endregion
//#region src/cron/service/startup-run-repair.ts
/** Repairs interrupted and finalized cron runs while the service starts. */
const STARTUP_INTERRUPTED_ERROR = "cron: job interrupted by gateway restart";
function resolveOneShotReplacementAtMs(job, runningAtMs) {
	if (job.schedule.kind !== "at" || !job.enabled) return;
	const nextRunAtMs = job.state.nextRunAtMs;
	if (typeof nextRunAtMs !== "number" || nextRunAtMs <= runningAtMs) return;
	return parseAbsoluteTimeMs(job.schedule.at) === nextRunAtMs ? nextRunAtMs : void 0;
}
function markInterruptedStartupRun(params) {
	const { job, runningAtMs, nowMs } = params;
	const replacementAtMs = resolveOneShotReplacementAtMs(job, runningAtMs);
	const previousErrors = typeof job.state.consecutiveErrors === "number" && Number.isFinite(job.state.consecutiveErrors) ? Math.max(0, Math.floor(job.state.consecutiveErrors)) : 0;
	params.state.deps.log.warn({
		jobId: job.id,
		runningAtMs
	}, "cron: marking interrupted running job failed on startup");
	job.state.runningAtMs = void 0;
	job.state.runningReceiptId = void 0;
	delete job.state.runningScheduleChangeId;
	job.state.lastRunAtMs = runningAtMs;
	job.state.lastRunStatus = "error";
	job.state.lastStatus = "error";
	job.state.lastError = STARTUP_INTERRUPTED_ERROR;
	job.state.lastErrorReason = void 0;
	job.state.lastDurationMs = Math.max(0, nowMs - runningAtMs);
	job.state.consecutiveErrors = previousErrors + 1;
	job.state.lastDelivered = false;
	job.state.lastDeliveryStatus = "unknown";
	job.state.lastDeliveryError = STARTUP_INTERRUPTED_ERROR;
	job.state.deliverySuppressionReason = void 0;
	job.state.lastFailureNotificationDelivered = void 0;
	job.state.lastFailureNotificationDeliveryStatus = "not-requested";
	job.state.lastFailureNotificationDeliveryError = void 0;
	job.state.nextRunAtMs = replacementAtMs;
	job.state.startupCatchupAtMs = void 0;
	job.updatedAtMs = nowMs;
	const alertConfig = resolveFailureAlert(params.state, job);
	const autoDisableNotificationOwnsFailure = maybeAutoDisableCronJobAfterRunFailure({
		job,
		atMs: nowMs,
		deferredNotifications: params.deferredNotifications
	});
	if (autoDisableNotificationOwnsFailure) params.state.deps.log.error({
		jobId: job.id,
		name: job.name,
		consecutiveErrors: job.state.consecutiveErrors
	}, "cron: auto-disabled interrupted job after consecutive run failures");
	finalizeCronFailureNotifications(params.state, {
		job,
		alertConfig,
		result: {
			status: "error",
			error: STARTUP_INTERRUPTED_ERROR,
			startedAt: runningAtMs
		},
		completionStatus: "failed",
		autoDisableNotificationOwnsFailure,
		deferredNotifications: params.deferredNotifications
	});
	if (job.schedule.kind === "at" && replacementAtMs === void 0 && !params.recoverInterruptedOneShot) job.enabled = false;
	return {
		jobId: job.id,
		...params.taskRunId ? { taskRunId: params.taskRunId } : {},
		...replacementAtMs === void 0 ? {} : { replacementAtMs },
		runAtMs: runningAtMs,
		durationMs: job.state.lastDurationMs
	};
}
function restoreFinalizedStartupRun(params) {
	const { state, job, runningAtMs, entry } = params;
	const triggerOwnership = params.triggerStateRetired ? "stale" : "current";
	const startedAt = asDateTimestampMs(entry.runAtMs ?? runningAtMs);
	const endedAt = asDateTimestampMs(entry.ts);
	if (startedAt === void 0 || startedAt < 0 || endedAt === void 0 || endedAt < 0) {
		state.deps.log.warn({ jobId: job.id }, "cron: ignoring finalized startup run with an invalid timestamp envelope");
		return;
	}
	const replacementAtMs = resolveOneShotReplacementAtMs(job, startedAt);
	const persistedNextRunAtMs = asDateTimestampMs(job.state.nextRunAtMs);
	const scheduleOwnership = typeof job.state.runningScheduleChangeId === "string" || job.schedule.kind === "at" && (!job.enabled || persistedNextRunAtMs !== void 0 && persistedNextRunAtMs > startedAt) ? "stale" : "current";
	const retiredTriggerStoppedSchedule = params.triggerStateRetired && params.triggerEval?.fired === true && entry.status === "ok" && entry.nextRunAtMs === void 0;
	job.state.startupCatchupAtMs = void 0;
	if (params.triggerEval?.fired === false) {
		applyTriggerNoFireResult(state, job, {
			startedAt,
			endedAt,
			triggerEval: params.triggerEval
		}, {
			scheduleMode: scheduleOwnership === "stale" ? "stale-preserve" : "advance",
			triggerOwnership,
			replay: true,
			deferredNotifications: params.deferredNotifications
		});
		return {
			shouldDelete: false,
			...replacementAtMs === void 0 ? {} : { replacementAtMs }
		};
	}
	const completionStatus = entry.completionStatus ?? resolveCronCompletionStatus({
		status: entry.status,
		delivered: entry.delivered,
		deliveryStatus: entry.deliveryStatus
	});
	const shouldDelete = applyJobResult(state, job, {
		...entry,
		completionStatus,
		deliveryState: {
			delivered: entry.delivered,
			status: entry.deliveryStatus ?? "unknown",
			error: entry.deliveryError,
			deliverySuppressionReason: entry.deliverySuppressionReason,
			failureNotification: entry.failureNotificationDelivery ?? { status: "not-requested" }
		},
		startedAt,
		endedAt
	}, {
		replay: true,
		scheduleOwnership,
		...scheduleOwnership === "current" && !retiredTriggerStoppedSchedule ? { replaySchedule: { nextRunAtMs: entry.nextRunAtMs } } : {},
		deferredNotifications: params.deferredNotifications
	});
	job.state.lastDurationMs = entry.durationMs ?? Math.max(0, endedAt - startedAt);
	job.state.lastErrorReason = entry.errorReason;
	if (entry.failureNotificationDelivery) {
		job.state.lastFailureNotificationDelivered = entry.failureNotificationDelivery.delivered;
		job.state.lastFailureNotificationDeliveryStatus = entry.failureNotificationDelivery.status;
		job.state.lastFailureNotificationDeliveryError = entry.failureNotificationDelivery.error;
		const lastAlert = job.state.lastFailureAlertAtMs;
		if (entry.failureNotificationDelivery.status !== "not-requested" && completionStatus !== "succeeded" && (lastAlert === void 0 || lastAlert < endedAt || lastAlert > state.deps.nowMs())) job.state.lastFailureAlertAtMs = endedAt;
	}
	if (params.triggerEval) applyTriggerRunResult(job, {
		status: entry.status,
		endedAt,
		triggerEval: params.triggerEval
	}, {
		scheduleOwnership,
		triggerOwnership
	});
	if (params.scriptResult) applyScriptRunResult(job, {
		status: entry.status,
		...params.scriptResult
	}, { triggerOwnership });
	state.deps.log.info({
		jobId: job.id,
		runningAtMs,
		status: entry.status
	}, "cron: restored finalized run history on startup");
	return {
		shouldDelete,
		...replacementAtMs === void 0 ? {} : { replacementAtMs }
	};
}
//#endregion
export { createCronOwnerExecutionIdentityAdmission as A, recordCronOutcomeForJob as C, MIN_REFIRE_GAP_MS as D, MAX_CRON_TIMER_DELAY_MS as E, cronFailureNotificationEventContext as F, emit as I, isImmediateCronRunMode as L, finishCronRun as M, recordQuietCronEvaluation as N, resolveMainSessionCronDeliveryContext as O, createCronServiceState as P, emitCronOutcomeEventForJob as S, DEFAULT_STARTUP_DEFERRED_MISSED_AGENT_JOB_DELAY_MS as T, normalizeQueuedSystemEventHandle as _, cronRunReceiptMutationHooks as a, resolveNextRunAtMsOrDisable as b, prepareCronRunReceiptOwnerMutationHooks as c, findCronRunRecoveryInDatabase as d, isCronRunTriggerStateRetiredInDatabase as f, isScheduledTerminalOneShotRetry as g, applyOutcomeToStoredJob as h, assertServiceCronRunReceiptCurrent as i, createCronRunHandle as j, runsDetachedFromMainSession as k, resolveCronRunReceiptTerminalStatus as l, applyOutcomeToAuthoritativeJob as m, markInterruptedStartupRun as n, cronRunReceiptPersistHooks as o, applyJobResult as p, restoreFinalizedStartupRun as r, markServiceCronJobActive as s, STARTUP_INTERRUPTED_ERROR as t, trackServiceCronRunReceiptSettlement as u, removeQueuedSystemEventHandle as v, DEFAULT_MISSED_JOB_STAGGER_MS as w, createCronOutcomeEvent as x, resolveDeliveryState as y };
