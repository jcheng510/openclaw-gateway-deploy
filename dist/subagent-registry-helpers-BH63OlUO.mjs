import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { t as FsSafeError, w as root } from "./fs-safe-CHQXnCPk.mjs";
import { n as computeBackoff } from "./src-DqaLEvc_.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { t as truncateUtf8Prefix } from "./utf8-truncate-_hf7tp13.mjs";
import "./backoff-DG9ukw7j.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import "./validation-core-YrPXii0X.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { w as applySessionEntryExactReplacements } from "./session-accessor.reset-xoze7eVv.mjs";
import { s as withSessionEntryReadOnlyInWorker } from "./session-entry-read-runtime-e6OehipM.mjs";
import { a as getErrnoCode, d as resolveDeliveryRecoveryDeadlineMs, n as createDeliveryRecoveryCoordinator, r as createEmptyDeliveryRecoverySummary, s as isDeliveryRecoveryRetryEligible, t as computeBackoffMs } from "./delivery-recovery.shared-CI_hIUE1.mjs";
import "./sessions-Db5eEwNA.mjs";
import { m as getSubagentRunsForChildSession, v as subagentRuns } from "./subagent-run-liveness-CjqSkJZp.mjs";
import "./subagent-lifecycle-events-CDQCTuLB.mjs";
import { c as loadPendingSessionDelivery, f as moveSessionDeliveryToFailed, n as completeSessionDelivery, o as failSessionDelivery, s as loadPendingSessionDeliveries, u as markSessionDeliverySettlement } from "./session-delivery-queue-storage-D5pkrc1d.mjs";
import { a as SessionDeliveryDeferredError, i as SessionDeliveryDeadLetteredError, n as SessionDeliveryAcknowledgementFinalizeError, o as SessionDeliveryRetryChargedError, r as SessionDeliveryAttemptStartError, s as SessionDeliverySafeRetryError } from "./session-delivery-queue.records-CjQTBb2t.mjs";
import { C as getDeliveryLastError, S as getDeliveryAttemptCount, _ as rowToSubagentRunRecord } from "./subagent-registry.store.sqlite-DQWBMoqK.mjs";
import { j as withSubagentRegistryWriteAuthority, y as publishSubagentRunsAfterAtomicStore } from "./subagent-registry-state-DbBqXjLM.mjs";
import { t as compareSubagentRunGeneration } from "./subagent-run-generation-DCkOHoP9.mjs";
import { n as retiredCancellationEndedAt } from "./subagent-completion-mutation.kernel-Bqg06zzb.mjs";
import { r as resolveSubagentSessionAttachmentRootDir } from "./subagent-attachment-paths-RH3egeZ6.mjs";
import { i as resolveSubagentSessionStatus, n as getSubagentSessionStartedAt, t as getSubagentSessionRuntimeMs } from "./subagent-session-metrics-BQO41Z67.mjs";
import { n as resolveSessionRunError, t as recordGatewaySessionRunFailure } from "./session-run-error-BblM2a37.mjs";
import { r as resolveCompletionFromSessionEntry } from "./subagent-session-reconciliation-qIgO4pZl.mjs";
import { isDeepStrictEqual } from "node:util";
import { randomUUID } from "node:crypto";
//#region src/infra/session-delivery-queue-recovery.ts
const MAX_SESSION_DELIVERY_RETRIES = 5;
const recoveryCoordinator = createDeliveryRecoveryCoordinator();
async function finalizeSessionDeliverySettlement(params) {
	try {
		params.queueContext.admission.assertCurrent();
		await params.onSettled?.(params.entry, params.outcome, params.queueContext);
	} catch (error) {
		params.log.error(`session delivery: settled callback failed for ${params.entry.id}: ${String(error)}`);
		return false;
	}
	try {
		if (params.outcome === "recovered") await completeSessionDelivery(params.entry.id, params.queueContext);
		else await moveSessionDeliveryToFailed(params.entry.id, params.queueContext);
		return true;
	} catch (error) {
		params.log.error(`session delivery: ${params.outcome} finalization failed for ${params.entry.id}: ${String(error)}`);
		return false;
	}
}
function resolvePendingSettlementOutcome(entry) {
	return entry.settlementOutcome ?? (entry.acknowledgedAt !== void 0 ? "recovered" : void 0);
}
function resolveSessionDeliveryMaxRetries(entry) {
	return entry.maxRetries ?? MAX_SESSION_DELIVERY_RETRIES;
}
function canReconcileStartedAgentAttemptAtRetryLimit(entry) {
	return entry.kind === "agentTurn" && entry.deliveryStartedAt !== void 0 && entry.retryCount === resolveSessionDeliveryMaxRetries(entry);
}
function resolveSessionRetryEligibility(entry, now) {
	if (entry.kind === "agentTurn" && entry.owner?.kind === "subagent_completion") {
		if (now >= entry.owner.deadlineAt) return { eligible: true };
		const remainingBackoffMs = Math.max(0, (entry.availableAt ?? 0) - now);
		return remainingBackoffMs > 0 ? {
			eligible: false,
			remainingBackoffMs
		} : { eligible: true };
	}
	return isDeliveryRecoveryRetryEligible(entry, now);
}
async function processPendingSessionDelivery(opts) {
	const { entry, context } = opts;
	const pendingSettlementOutcome = resolvePendingSettlementOutcome(entry);
	if (pendingSettlementOutcome) return {
		status: pendingSettlementOutcome,
		finalized: await finalizeSessionDeliverySettlement({
			...context,
			entry,
			outcome: pendingSettlementOutcome
		})
	};
	if (!canReconcileStartedAgentAttemptAtRetryLimit(entry) && entry.retryCount >= resolveSessionDeliveryMaxRetries(entry)) {
		await markSessionDeliverySettlement(entry, "moved-to-failed", context.queueContext);
		return {
			status: "max-retries",
			finalized: await finalizeSessionDeliverySettlement({
				...context,
				entry,
				outcome: "moved-to-failed"
			})
		};
	}
	if (!opts.bypassBackoff) {
		const retryEligibility = resolveSessionRetryEligibility(entry, (context.now ?? Date.now)());
		if (!retryEligibility.eligible) return {
			status: "backoff",
			remainingMs: retryEligibility.remainingBackoffMs
		};
	}
	if (await opts.beforeDelivery?.() === "stop") return { status: "stop" };
	let result;
	try {
		context.queueContext.admission.assertCurrent();
		await context.deliver(entry, { queueContext: context.queueContext });
		await markSessionDeliverySettlement(entry, "recovered", context.queueContext);
		result = "recovered";
	} catch (err) {
		if (err instanceof SessionDeliveryDeadLetteredError) {
			try {
				await markSessionDeliverySettlement(entry, "moved-to-failed", context.queueContext);
			} catch (markError) {
				if (markError instanceof SessionDeliveryAcknowledgementFinalizeError) return { status: "deferred" };
				throw markError;
			}
			result = "moved-to-failed";
		} else if (err instanceof SessionDeliveryDeferredError || err instanceof SessionDeliveryAcknowledgementFinalizeError || err instanceof SessionDeliveryAttemptStartError) return { status: "deferred" };
		else {
			const errMsg = formatErrorMessage(err);
			opts.onFailed?.(entry, errMsg);
			if (err instanceof SessionDeliveryRetryChargedError) return { status: "failed" };
			try {
				await failSessionDelivery(entry.id, errMsg, context.queueContext, { releaseAttemptOwnership: err instanceof SessionDeliverySafeRetryError });
			} catch (failErr) {
				if (getErrnoCode(failErr) === "ENOENT") return { status: "already-gone" };
				throw failErr;
			}
			return { status: "failed" };
		}
	}
	const finalized = await finalizeSessionDeliverySettlement({
		...context,
		entry,
		outcome: result
	});
	return {
		status: result,
		finalized
	};
}
async function processDrainedSessionDelivery(entry, context, bypassBackoff) {
	const result = await processPendingSessionDelivery({
		entry,
		context,
		bypassBackoff,
		onFailed: (failedEntry, errMsg) => {
			context.log.warn(`${context.logLabel}: retry failed for entry ${failedEntry.id}: ${errMsg}`);
		}
	});
	if (result.status === "max-retries" && result.finalized) context.log.warn(`${context.logLabel}: entry ${entry.id} exceeded max retries and was moved to failed`);
	else if (result.status === "backoff") context.log.info(`${context.logLabel}: entry ${entry.id} not ready for retry yet — backoff ${result.remainingMs}ms remaining`);
	return result;
}
/** Drain one exact queued session delivery and return its final pending state. */
async function drainPendingSessionDelivery(opts) {
	const claim = await recoveryCoordinator.withClaim(opts.id, async () => {
		const entry = await loadPendingSessionDelivery(opts.id, opts.queueContext);
		if (!entry) return null;
		const result = await processDrainedSessionDelivery(entry, opts, opts.bypassBackoff);
		if (result.status === "already-gone" || "finalized" in result && result.finalized) return null;
		return result.status === "backoff" ? entry : loadPendingSessionDelivery(opts.id, opts.queueContext);
	});
	if (claim.status === "claimed-by-other-owner") {
		opts.log.info(`${opts.logLabel}: entry ${opts.id} is already being recovered`);
		return loadPendingSessionDelivery(opts.id, opts.queueContext);
	}
	return claim.value;
}
/** Replay pending session deliveries until the recovery budget is exhausted. */
async function recoverPendingSessionDeliveries(opts) {
	const pending = (await loadPendingSessionDeliveries(opts.queueContext)).filter((entry) => opts.maxEnqueuedAt == null || entry.enqueuedAt <= opts.maxEnqueuedAt);
	if (pending.length === 0) return createEmptyDeliveryRecoverySummary();
	const summary = createEmptyDeliveryRecoverySummary();
	const deadline = resolveDeliveryRecoveryDeadlineMs(opts.maxRecoveryMs);
	const onDeadlineExceeded = () => {
		opts.log.warn("Session delivery recovery time budget exceeded — remaining entries deferred");
	};
	const context = {
		...opts,
		logLabel: "Session delivery"
	};
	const beforeDelivery = async () => {
		if (await recoveryCoordinator.waitForReplay(deadline) === "deadline-exceeded") {
			onDeadlineExceeded();
			return "stop";
		}
		return "continue";
	};
	const onFailed = (_failedEntry, errMsg) => {
		summary.failed += 1;
		opts.log.warn(`Session delivery retry failed: ${errMsg}`);
	};
	await recoveryCoordinator.scan({
		entries: pending,
		loadEntry: (id) => loadPendingSessionDelivery(id, opts.queueContext),
		deadlineMs: deadline,
		onDeadlineExceeded,
		onEntry: async (currentEntry) => {
			if (opts.maxEnqueuedAt != null && currentEntry.enqueuedAt > opts.maxEnqueuedAt) return "continue";
			const result = await processPendingSessionDelivery({
				entry: currentEntry,
				context,
				beforeDelivery,
				onFailed
			});
			if (result.status === "max-retries") {
				summary.skippedMaxRetries += 1;
				return "continue";
			}
			if (result.status === "backoff") {
				summary.deferredBackoff += 1;
				return "continue";
			}
			if (result.status === "stop") return "stop";
			if (result.status === "recovered" && result.finalized) {
				summary.recovered += 1;
				opts.log.info(`Recovered session delivery ${currentEntry.id}`);
			}
			return "continue";
		}
	});
	return summary;
}
//#endregion
//#region src/infra/session-delivery-queue-runtime.ts
const RUNTIME_RELOAD_RETRY_MS = 1e3;
let runtime;
let runtimeGeneration = 0;
const scheduledEntries = /* @__PURE__ */ new Map();
let pendingScan;
function clearScheduledEntries() {
	for (const scheduled of scheduledEntries.values()) scheduled.cancel();
	scheduledEntries.clear();
	pendingScan?.cancel();
	pendingScan = void 0;
}
function armPendingScan(generation) {
	if (!runtime || generation !== runtimeGeneration || pendingScan) return;
	pendingScan = runtime.scheduler.schedule({
		id: "session-delivery:scan",
		delayMs: RUNTIME_RELOAD_RETRY_MS,
		run: () => {
			pendingScan = void 0;
			return schedulePendingSessionDeliveries();
		}
	});
}
function resolveRetryDelayMs(entry, now) {
	const claimDelayMs = Math.max(0, (entry.availableAt ?? 0) - now);
	if (entry.kind === "agentTurn" && entry.owner?.kind === "subagent_completion") return Math.min(claimDelayMs, Math.max(0, entry.owner.deadlineAt - now));
	if (entry.retryCount <= 0) return claimDelayMs;
	const attemptedAt = entry.lastAttemptAt ?? entry.enqueuedAt;
	return Math.max(claimDelayMs, attemptedAt + computeBackoffMs(entry.retryCount) - now);
}
function armSessionDeliveryId(id, delayMs, generation) {
	if (!runtime || generation !== runtimeGeneration) return;
	const job = runtime.scheduler.schedule({
		id: `session-delivery:${id}`,
		delayMs,
		mode: "earliest",
		run: () => {
			scheduledEntries.delete(id);
			return runScheduledSessionDelivery(id, generation);
		}
	});
	scheduledEntries.set(id, job);
}
function armSessionDelivery(entry, generation, minimumDelayMs = 0) {
	if (!runtime || runtime.runningEntries.has(entry.id)) return;
	armSessionDeliveryId(entry.id, Math.max(minimumDelayMs, resolveRetryDelayMs(entry, runtime.scheduler.now())), generation);
}
async function runScheduledSessionDelivery(id, generation) {
	const activeRuntime = runtime;
	if (!activeRuntime || generation !== runtimeGeneration) return;
	if (activeRuntime.runningEntries.has(id)) return;
	const settled = createDeferredCore();
	activeRuntime.runningEntries.set(id, settled.promise);
	let pending = null;
	try {
		pending = await (activeRuntime.drain ?? drainPendingSessionDelivery)({
			id,
			queueContext: activeRuntime.queueContext,
			now: () => activeRuntime.scheduler.now(),
			logLabel: "session delivery",
			log: activeRuntime.log,
			deliver: activeRuntime.deliver,
			onSettled: activeRuntime.onSettled
		});
	} catch (error) {
		activeRuntime.log.error(`session delivery: runtime drain failed for ${id}: ${String(error)}`);
		if (runtime && generation === runtimeGeneration) armSessionDeliveryId(id, RUNTIME_RELOAD_RETRY_MS, generation);
	} finally {
		activeRuntime.runningEntries.delete(id);
		settled.resolve();
	}
	if (!runtime || generation !== runtimeGeneration) return;
	if (pending) armSessionDelivery(pending, generation, RUNTIME_RELOAD_RETRY_MS);
}
/** Register callbacks; stop fences scheduling and joins admitted reads and drains. */
function startSessionDeliveryRuntime(params) {
	runtimeGeneration += 1;
	const generation = runtimeGeneration;
	clearScheduledEntries();
	const activeRuntime = {
		...params,
		runningEntries: /* @__PURE__ */ new Map(),
		pendingSchedules: /* @__PURE__ */ new Set()
	};
	runtime = activeRuntime;
	let stopPromise;
	return () => {
		if (runtimeGeneration === generation) {
			runtimeGeneration += 1;
			runtime = void 0;
			clearScheduledEntries();
		}
		stopPromise ??= Promise.all([...activeRuntime.runningEntries.values(), ...activeRuntime.pendingSchedules]).then(() => {});
		return stopPromise;
	};
}
/** Schedule one durable entry when a gateway runtime is available. */
async function scheduleSessionDelivery(id, queueContext) {
	const generation = runtimeGeneration;
	const activeRuntime = runtime;
	if (!activeRuntime) return false;
	try {
		queueContext.admission.assertCurrent();
		activeRuntime.queueContext.admission.assertCurrent();
		if (queueContext.admission.identity.key !== activeRuntime.queueContext.admission.identity.key) {
			activeRuntime.log.error(`session delivery: ${id} belongs to another state database`);
			return false;
		}
	} catch (error) {
		activeRuntime.log.error(`session delivery: cannot schedule ${id} for a retired state owner: ${String(error)}`);
		return false;
	}
	const settled = createDeferredCore();
	activeRuntime.pendingSchedules.add(settled.promise);
	try {
		let entry;
		try {
			entry = await (activeRuntime.reloadPending ?? loadPendingSessionDelivery)(id, activeRuntime.queueContext);
		} catch (error) {
			activeRuntime.log.error(`session delivery: failed to load ${id}: ${String(error)}`);
			armSessionDeliveryId(id, RUNTIME_RELOAD_RETRY_MS, generation);
			return true;
		}
		if (!entry || !runtime || generation !== runtimeGeneration) return !entry;
		armSessionDelivery(entry, generation);
		return true;
	} finally {
		activeRuntime.pendingSchedules.delete(settled.promise);
		settled.resolve();
	}
}
/** Schedule every pending entry after startup recovery installs the runtime owner. */
async function schedulePendingSessionDeliveries() {
	const generation = runtimeGeneration;
	const activeRuntime = runtime;
	if (!activeRuntime) return;
	const settled = createDeferredCore();
	activeRuntime.pendingSchedules.add(settled.promise);
	try {
		let entries;
		try {
			entries = await (activeRuntime.listPending ?? loadPendingSessionDeliveries)(activeRuntime.queueContext);
		} catch (error) {
			activeRuntime.log.error(`session delivery: failed to scan pending entries: ${String(error)}`);
			armPendingScan(generation);
			return;
		}
		if (!runtime || generation !== runtimeGeneration) return;
		for (const entry of entries) armSessionDelivery(entry, generation);
	} finally {
		activeRuntime.pendingSchedules.delete(settled.promise);
		settled.resolve();
	}
}
//#endregion
//#region src/agents/subagents/completion/subagent-completion-admission.store.ts
const log = createSubsystemLogger("subagents/completion");
var SubagentCompletionSourceChangedError = class extends Error {};
function replaceCommittedSubagent(subagent) {
	const live = subagentRuns.get(subagent.runId);
	if (live) {
		for (const key of Object.keys(live)) Reflect.deleteProperty(live, key);
		Object.assign(live, subagent);
	} else subagentRuns.set(subagent.runId, subagent);
}
function publishCommittedRecords(subagent, databasePath) {
	replaceCommittedSubagent(subagent);
	const events = [];
	publishSubagentRunsAfterAtomicStore(subagentRuns, [subagent.runId], events, databasePath);
	events.forEach((emit) => emit());
}
function parseNativeRow(row) {
	if (!isRecord(row) || typeof row.run_id !== "string" || typeof row.child_session_key !== "string" || typeof row.requester_session_key !== "string" || typeof row.created_at !== "number" || typeof row.payload_json !== "string" || row.controller_session_key !== null && typeof row.controller_session_key !== "string" || row.requester_store_path !== null && typeof row.requester_store_path !== "string" || row.controller_store_path !== null && typeof row.controller_store_path !== "string") throw new Error("Subagent completion acknowledgment has an invalid native record");
	return {
		run_id: row.run_id,
		child_session_key: row.child_session_key,
		requester_session_key: row.requester_session_key,
		controller_session_key: row.controller_session_key,
		requester_store_path: row.requester_store_path,
		controller_store_path: row.controller_store_path,
		created_at: row.created_at,
		payload_json: row.payload_json
	};
}
function parseAdmissionReceipt(value, writeId, runId) {
	if (!isRecord(value) || value.writeId !== writeId || typeof value.claimed !== "boolean" || typeof value.status !== "string") throw new Error("Subagent completion acknowledgment does not identify its write");
	const row = parseNativeRow(value.row);
	if (row.run_id !== runId) throw new Error("Subagent completion acknowledged another native owner");
	return {
		writeId,
		claimed: value.claimed,
		status: value.status,
		row
	};
}
function parseMutationReceipt(value, writeId, runIds) {
	if (!isRecord(value) || value.writeId !== writeId || typeof value.applied !== "boolean" && value.applied !== null || !Array.isArray(value.records) || !Array.isArray(value.retiredRunIds) || !Array.isArray(value.queueIds) || !value.retiredRunIds.every((id) => typeof id === "string" && runIds.includes(id)) || !value.queueIds.every((id) => typeof id === "string")) throw new Error("Subagent completion mutation acknowledgment does not identify its write");
	const records = value.records.map((record) => {
		if (!isRecord(record) || record.cleanupHandled !== void 0 && typeof record.cleanupHandled !== "boolean") throw new Error("Subagent completion acknowledgment has invalid publication facts");
		const row = parseNativeRow(record.row);
		if (!runIds.includes(row.run_id)) throw new Error("Subagent completion acknowledged another native owner");
		return {
			row,
			cleanupHandled: record.cleanupHandled
		};
	});
	return {
		writeId,
		applied: value.applied,
		records,
		retiredRunIds: value.retiredRunIds,
		queueIds: value.queueIds
	};
}
async function executeCompletionCommand(context, command, assertCurrent, parse) {
	let admission;
	try {
		return await runOpenClawStateWorkerOperation(context, async (scope) => parse(await scope.execute(command)), {
			assertCurrent,
			createAdmission: () => {
				let phase = "waiting";
				admission = createSqliteWorkerOperationAdmission((request, grant) => {
					if (request.facts !== command.input.writeId || !(phase === "waiting" && request.stage === "transaction" || phase === "transaction" && request.stage === "commit")) throw new Error("Subagent completion write authority requested out of order");
					assertCurrent();
					if (!grant()) throw new Error("Subagent completion write authority expired");
					phase = request.stage === "transaction" ? "transaction" : "commit";
				});
				return {
					admission,
					nativeLocations: [context.admission.databasePath, context.admission.identity.canonicalPath]
				};
			}
		});
	} catch (error) {
		const committed = admission?.committed;
		if (!committed) throw error;
		return parse(committed.facts);
	}
}
async function admitSubagentCompletionDelivery(params) {
	const input = structuredClone({
		writeId: randomUUID(),
		queueEntry: params.queueEntry,
		expected: params.expected,
		subagent: params.subagent
	});
	const receipt = await executeCompletionCommand(params.context, {
		type: "sessionDelivery.admitSubagentCompletion",
		input
	}, params.assertCurrent, (value) => parseAdmissionReceipt(value, input.writeId, input.subagent.runId));
	const subagent = rowToSubagentRunRecord(receipt.row);
	if (!subagent) throw new Error("Subagent completion acknowledged an undecodable native record");
	return {
		claimed: receipt.claimed,
		status: receipt.status,
		subagent
	};
}
async function mutateCompletion(entries, mutation, options = {}) {
	const selected = entries.map((entry) => ({
		entry,
		snapshot: structuredClone(entry)
	}));
	const runIds = selected.map(({ snapshot }) => snapshot.runId);
	const context = options.context ?? captureOpenClawStateWorkerContext({
		path: options.databaseOptions?.database?.path ?? options.databaseOptions?.path,
		env: options.databaseOptions?.env
	});
	const input = structuredClone({
		writeId: randomUUID(),
		mutation
	});
	const sourceIsCurrent = () => selected.every(({ entry, snapshot }) => subagentRuns.get(snapshot.runId) === entry && isDeepStrictEqual(entry, snapshot) && (retiredCancellationEndedAt(snapshot, Date.now()) === void 0 || ![...getSubagentRunsForChildSession(snapshot.childSessionKey)].some((candidate) => compareSubagentRunGeneration(candidate, snapshot) > 0)));
	return withSubagentRegistryWriteAuthority(runIds, {
		context,
		assertCurrent: () => {
			options.assertCurrent?.();
			if (!sourceIsCurrent()) throw new SubagentCompletionSourceChangedError("Subagent completion source changed during mutation");
		}
	}, async (authority) => {
		const receipt = await executeCompletionCommand(context, {
			type: "sessionDelivery.mutateSubagentCompletion",
			input
		}, authority.assertCurrent, (value) => parseMutationReceipt(value, input.writeId, runIds));
		try {
			authority.assertDatabase();
			options.assertCurrent?.();
		} catch {
			return receipt.applied;
		}
		if (receipt.applied === true && authority.currentRunIds().length === runIds.length && sourceIsCurrent()) {
			const changed = [...receipt.records.map(({ row }) => row.run_id), ...receipt.retiredRunIds];
			receipt.records.map(({ row, cleanupHandled }) => {
				const record = rowToSubagentRunRecord(row);
				if (!record) throw new Error("Subagent completion acknowledged an undecodable native record");
				record.cleanupHandled = cleanupHandled;
				return record;
			}).forEach(replaceCommittedSubagent);
			receipt.retiredRunIds.forEach((id) => subagentRuns.delete(id));
			if (changed.length) {
				const events = [];
				publishSubagentRunsAfterAtomicStore(subagentRuns, changed, events, context.admission.databasePath);
				events.forEach((emit) => emit());
			}
		}
		for (const id of receipt.queueIds) try {
			await scheduleSessionDelivery(id, context);
		} catch (error) {
			log.warn("Subagent completion remains queued after scheduling failed", {
				queueId: id,
				error
			});
		}
		return receipt.applied;
	});
}
async function settleSubagentCompletionDelivery(params) {
	const current = subagentRuns.get(params.subagent.runId);
	if (!current) throw new Error("Subagent completion owner is unavailable");
	const subagent = structuredClone(params.subagent);
	await mutateCompletion([current], {
		kind: "settle",
		queueId: params.queueId,
		expected: structuredClone(current),
		subagent
	}, params);
}
async function blockSubagentCompletionDelivery(params) {
	if (subagentRuns.get(params.subagent.runId) !== params.subagent) return false;
	if (params.storeReplaced) subagentRuns.retireCompletionAuthority(params.subagent);
	const { context: _context, databaseOptions: _databaseOptions, assertCurrent: _assertCurrent, ...request } = params;
	return await mutateCompletion([params.subagent], {
		kind: "block",
		params: request,
		now: Date.now()
	}, params) === true;
}
async function reconcileRetiredSubagentCancellation(expected, now) {
	if (retiredCancellationEndedAt(expected, now) === void 0 || !expected.killReconciliation) return;
	if (subagentRuns.get(expected.runId) !== expected) return false;
	try {
		return await mutateCompletion([expected], {
			kind: "reconcileCancelled",
			expected,
			now
		}) ?? void 0;
	} catch (error) {
		if (error instanceof SubagentCompletionSourceChangedError) return false;
		throw error;
	}
}
async function settleRequesterCompletionBatch(params) {
	await mutateCompletion(params.entries.map(({ subagent }) => subagent), {
		kind: "requesterBatch",
		entries: params.entries,
		outcome: params.outcome,
		now: Date.now()
	}, {
		databaseOptions: params.databaseOptions,
		assertCurrent: () => {
			if (!params.isCurrent()) throw new Error("Subagent completion owner changed before settlement");
		}
	});
}
//#endregion
//#region src/agents/subagents/subagent-attachment-cleanup.ts
/** Removes host-owned subagent attachment artifacts by generated identity. */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
async function removeSubagentAttachmentTree(rootDir, attachmentId, assertBeforeMutation) {
	if (!UUID_RE.test(attachmentId)) throw new Error("invalid subagent attachment identity");
	assertBeforeMutation?.();
	try {
		await (await root(rootDir)).remove(attachmentId, {
			recursive: true,
			force: true,
			...assertBeforeMutation ? { assertBeforeMutation } : {}
		});
	} catch (error) {
		if (!(error instanceof FsSafeError && error.code === "not-found")) throw error;
	}
}
async function cleanupMaterializedSubagentAttachments(params) {
	const rootDir = resolveSubagentSessionAttachmentRootDir({
		agentId: resolveAgentIdFromSessionKey(params.childSessionKey),
		childSessionKey: params.childSessionKey
	});
	const isCurrent = params.isCurrent;
	await removeSubagentAttachmentTree(rootDir, params.attachmentId, isCurrent ? () => {
		if (!isCurrent()) throw new Error("subagent attachment cleanup owner is no longer current");
	} : void 0);
}
//#endregion
//#region src/agents/subagents/registry/subagent-registry-helpers.ts
/**
* Subagent registry persistence and recovery helpers.
*
* Handles frozen results, attachment cleanup, timing persistence, and announce retry logging.
*/
const PROVISIONAL_KILL_RECONCILIATION_MS = 3e5;
const MIN_ANNOUNCE_RETRY_DELAY_MS = 15e3;
const MAX_ANNOUNCE_RETRY_DELAY_MS = 3e5;
const ANNOUNCE_RETRY_JITTER = .2;
const ANNOUNCE_EXPIRY_MS = 3e5;
const ANNOUNCE_COMPLETION_HARD_EXPIRY_MS = 18e5;
const ANNOUNCE_RETRY_BACKOFF = {
	initialMs: MIN_ANNOUNCE_RETRY_DELAY_MS,
	maxMs: MAX_ANNOUNCE_RETRY_DELAY_MS,
	factor: 2,
	jitter: ANNOUNCE_RETRY_JITTER
};
const FROZEN_RESULT_TEXT_MAX_BYTES = 102400;
/** Caps frozen completion text stored for later announce/recovery delivery. */
function capFrozenResultText(resultText) {
	const trimmed = resultText.trim();
	if (!trimmed) return "";
	const totalBytes = Buffer.byteLength(trimmed, "utf8");
	if (totalBytes <= FROZEN_RESULT_TEXT_MAX_BYTES) return trimmed;
	const notice = `\n\n[truncated: frozen completion output exceeded ${Math.round(FROZEN_RESULT_TEXT_MAX_BYTES / 1024)}KB (${Math.round(totalBytes / 1024)}KB)]`;
	const maxPayloadBytes = Math.max(0, FROZEN_RESULT_TEXT_MAX_BYTES - Buffer.byteLength(notice, "utf8"));
	return `${truncateUtf8Prefix(trimmed, maxPayloadBytes)}${notice}`;
}
/** Computes bounded exponential backoff for subagent announce retries. */
function resolveAnnounceRetryDelayMs(retryCount) {
	return computeBackoff(ANNOUNCE_RETRY_BACKOFF, Math.max(1, retryCount));
}
function formatAnnounceGiveUpLogField(value) {
	const normalized = value.replace(/\s+/g, " ").trim();
	return JSON.stringify(normalized.length > 2e3 ? `${truncateUtf16Safe(normalized, 2e3)}…` : normalized);
}
/** Logs a sanitized final give-up line for failed subagent announce delivery. */
function logAnnounceGiveUp(entry, reason) {
	const retryCount = getDeliveryAttemptCount(entry);
	const endedAt = entry.execution.endedAt;
	const endedAgoMs = typeof endedAt === "number" ? Math.max(0, Date.now() - endedAt) : void 0;
	const endedAgoLabel = endedAgoMs != null ? `${Math.round(endedAgoMs / 1e3)}s` : "n/a";
	const lastDeliveryError = getDeliveryLastError(entry);
	const deliveryError = lastDeliveryError ? ` deliveryError=${formatAnnounceGiveUpLogField(lastDeliveryError)}` : "";
	defaultRuntime.log(`[warn] Subagent announce give up (${reason}) run=${entry.runId} child=${entry.childSessionKey} requester=${entry.requesterSessionKey} retries=${retryCount} endedAgo=${endedAgoLabel}${deliveryError}`);
}
/** Persists child session timing/status derived from the subagent registry row. */
async function persistSubagentSessionTiming(entry, options) {
	const childSessionKey = entry.childSessionKey?.trim();
	if (!childSessionKey || options?.isCurrentGeneration?.() === false) return;
	const cfg = getRuntimeConfig();
	const agentId = resolveAgentIdFromSessionKey(childSessionKey);
	const storePath = options?.session?.storePath ?? resolveSessionStorePathCore(cfg.session?.store, { agentId });
	const refused = /* @__PURE__ */ new Error("Subagent timing owner changed before commit");
	const assertGenerationCurrent = () => {
		if (options?.isCurrentGeneration?.() === false) throw refused;
		options?.assertCommitAllowed?.();
	};
	const persist = async (selected, assertSessionCurrent) => {
		assertGenerationCurrent();
		assertSessionCurrent();
		if (!selected) return;
		const sessionId = selected.sessionId;
		const lifecycleRevision = selected.lifecycleRevision;
		const assertCommitAllowed = () => {
			assertGenerationCurrent();
			assertSessionCurrent();
		};
		const startedAt = getSubagentSessionStartedAt(entry);
		const endedAt = typeof entry.execution.endedAt === "number" && Number.isFinite(entry.execution.endedAt) ? entry.execution.endedAt : void 0;
		const runtimeMs = endedAt !== void 0 ? getSubagentSessionRuntimeMs(entry, endedAt) : getSubagentSessionRuntimeMs(entry);
		const status = resolveSubagentSessionStatus(entry);
		const lastRunError = status ? resolveSessionRunError(entry.execution.outcome ?? {}, status) : void 0;
		const update = (sessionEntry) => {
			if (sessionEntry.sessionId !== sessionId || sessionEntry.lifecycleRevision !== lifecycleRevision || options?.isCurrentGeneration?.() === false) return null;
			if (status === "killed") {
				const existingCompletion = resolveCompletionFromSessionEntry(sessionEntry, Date.now(), { notBeforeMs: entry.execution.startedAt ?? entry.createdAt });
				if (existingCompletion && existingCompletion.reason !== "subagent-killed") {
					if (sessionEntry.abortedLastRun !== true) return null;
					const completedEntry = { ...sessionEntry };
					delete completedEntry.abortedLastRun;
					return completedEntry;
				}
			}
			const next = { ...sessionEntry };
			if (typeof startedAt === "number" && Number.isFinite(startedAt)) next.startedAt = startedAt;
			else delete next.startedAt;
			if (typeof endedAt === "number" && Number.isFinite(endedAt)) next.endedAt = endedAt;
			else delete next.endedAt;
			if (typeof runtimeMs === "number" && Number.isFinite(runtimeMs)) next.runtimeMs = runtimeMs;
			else delete next.runtimeMs;
			if (status) next.status = status;
			else delete next.status;
			if (lastRunError) next.lastRunError = lastRunError;
			else if (status === "done" || status === "interrupted") delete next.lastRunError;
			if (status && status !== "killed") delete next.abortedLastRun;
			return next;
		};
		const persisted = await applySessionEntryExactReplacements({
			storePath,
			agentId,
			sessionKeys: [childSessionKey],
			activeSessionKey: childSessionKey,
			requireWriteSuccess: true,
			skipMaintenance: true,
			assertCommitAllowed,
			update(entries) {
				const current = entries.find(({ sessionKey }) => sessionKey === childSessionKey)?.entry;
				const next = current ? update(current) : null;
				return {
					result: next,
					replacements: next ? [{
						sessionKey: childSessionKey,
						entry: next
					}] : []
				};
			}
		});
		if (persisted && lastRunError) await recordGatewaySessionRunFailure({
			target: {
				agentId,
				storePath,
				sessionKey: childSessionKey,
				sessionId: persisted.sessionId,
				expectedLifecycleRevision: persisted.lifecycleRevision
			},
			runId: entry.runId,
			error: entry.execution.outcome?.error,
			assertCommitAllowed
		});
	};
	try {
		if (options?.session) {
			await persist(options.session.entry, options.session.assertCurrent);
			return;
		}
		await withSessionEntryReadOnlyInWorker({
			storePath,
			sessionKey: childSessionKey,
			agentId
		}, assertGenerationCurrent, async (read, owner) => {
			if (!read.ok) throw read.error;
			await persist(read.value, owner.assertCurrent);
		});
	} catch (error) {
		if (error !== refused) throw error;
	}
}
/** Best-effort async removal for a subagent attachment directory. */
async function safeRemoveAttachmentsDir(entry) {
	if (!entry.attachmentId) return true;
	try {
		await cleanupMaterializedSubagentAttachments({
			childSessionKey: entry.childSessionKey,
			attachmentId: entry.attachmentId
		});
		return true;
	} catch {
		return false;
	}
}
/** Resolves the completed subagent archive delay from config. */
function resolveArchiveAfterMs(cfg) {
	const minutes = (cfg ?? getRuntimeConfig()).agents?.defaults?.subagents?.archiveAfterMinutes ?? 60;
	if (!Number.isFinite(minutes) || minutes < 0) return;
	if (minutes === 0) return;
	return Math.max(1, Math.floor(minutes)) * 6e4;
}
/** Arms retention only after the run or its waitable collector result has completed. */
function updateSubagentArchiveAtMs(entry, cfg) {
	const endedAt = typeof entry.execution.endedAt === "number" && Number.isFinite(entry.execution.endedAt) ? entry.execution.endedAt : void 0;
	const completedAt = entry.collect ? endedAt === void 0 && !entry.collectorCompletion ? void 0 : typeof entry.completion?.capturedAt === "number" && Number.isFinite(entry.completion.capturedAt) ? entry.completion.capturedAt : endedAt : entry.cleanup === "delete" && entry.pauseReason !== "sessions_yield" ? entry.delivery?.discardReason === "task-missing" ? entry.delivery.discardedAt ?? endedAt : endedAt : void 0;
	const archiveAfterMs = entry.spawnMode === "session" || completedAt === void 0 ? void 0 : resolveArchiveAfterMs(cfg);
	const expectedArchiveAt = completedAt !== void 0 && archiveAfterMs !== void 0 ? completedAt + archiveAfterMs : void 0;
	if (entry.archiveAtMs === expectedArchiveAt) return false;
	if (expectedArchiveAt === void 0) delete entry.archiveAtMs;
	else entry.archiveAtMs = expectedArchiveAt;
	return true;
}
//#endregion
export { recoverPendingSessionDeliveries as C, drainPendingSessionDelivery as S, settleRequesterCompletionBatch as _, capFrozenResultText as a, scheduleSessionDelivery as b, resolveAnnounceRetryDelayMs as c, cleanupMaterializedSubagentAttachments as d, removeSubagentAttachmentTree as f, reconcileRetiredSubagentCancellation as g, publishCommittedRecords as h, PROVISIONAL_KILL_RECONCILIATION_MS as i, safeRemoveAttachmentsDir as l, blockSubagentCompletionDelivery as m, ANNOUNCE_EXPIRY_MS as n, logAnnounceGiveUp as o, admitSubagentCompletionDelivery as p, MIN_ANNOUNCE_RETRY_DELAY_MS as r, persistSubagentSessionTiming as s, ANNOUNCE_COMPLETION_HARD_EXPIRY_MS as t, updateSubagentArchiveAtMs as u, settleSubagentCompletionDelivery as v, startSessionDeliveryRuntime as x, schedulePendingSessionDeliveries as y };
