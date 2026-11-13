import { g as readStringValue } from "./string-coerce-6kR-86XC.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as setSafeTimeout } from "./timer-delay-D19PisE-.mjs";
import { A as parseAgentSessionKey, C as parseCronRunScopeSuffix, S as isSubagentSessionKey, y as isAcpSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { F as projectedAgentRunInputKey, N as getAgentRunContextOwnerStatus, l as getAgentRunContext } from "./agent-run-registry-BDW3IRlF.mjs";
import { u as normalizeVerboseLevel } from "./thinking.shared-Dc3B6FDH.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./io-B18HRL9J.mjs";
import { t as GATEWAY_CLIENT_CAPS } from "./client-info-S_xwnr2o.mjs";
import { i as logWarn, n as logError } from "./logger-DmolGPgx.mjs";
import { t as boundedJsonUtf8Bytes } from "./json-utf8-bytes-fm9i4b7G.mjs";
import { It as projectChatErrorDetail, jt as ChatStatusEventSchema } from "./sessions-Bw59kgfQ.mjs";
import "./thinking-hj_KWR0q.mjs";
import { s as isTimeoutError } from "./error-ySnYIwkP.mjs";
import { u as stripHeartbeatToken } from "./heartbeat-D29f7BeR.mjs";
import { i as classifyAgentRunTerminalOutcome, s as isDefinitiveRunLifecycle } from "./agent-run-terminal-outcome-B2LU37vr.mjs";
import { c as resolveAssistantEventPhase } from "./chat-message-content-C28ajso0.mjs";
import { a as tryResolveSessionCompatibilityOwnerAgentId, s as resolveSessionSubscriptionKeys } from "./session-request-agent-DFWpsx2m.mjs";
import { c as isActiveEmbeddedRunId } from "./runs-BSJKmITf.mjs";
import { p as resolveFailoverReasonFromError } from "./failover-error--wjjTO6U.mjs";
import { m as normalizeAgentPlanSteps } from "./streaming-DELQpW3p.mjs";
import { i as buildAgentRunTerminalOutcomeFromLifecycleEvent, t as AGENT_RUN_TERMINAL_RETRY_GRACE_MS } from "./agent-run-terminal-outcome-BGbjspLO.mjs";
import { i as readToolValidationErrorSummary } from "./tool-error-summary-BGZoXZWD.mjs";
import { a as extractChatToolResultCanvasPreview, n as appendChatCanvasBlocksToMessage, t as appendChatCanvasBlocks } from "./chat-display-projection.canvas-Bq1n-BMM.mjs";
import { a as shouldSuppressAssistantEventForLiveChat, i as projectLiveAssistantBufferedText } from "./live-chat-projector-BtJEJKjU.mjs";
import { a as createSessionMessageSubscriberRegistry, d as resolveAssistantTextInput, i as createSessionEventSubscriberRegistry, n as createChatAbortMarker, o as isChatAbortMarkerCurrent, r as createChatRunState } from "./server-chat-state-DOgcdniX.mjs";
import { i as loadGatewaySessionEntryReadOnly } from "./session-utils-store-DWiBeNMH.mjs";
import "./session-utils-FXsPIESl.mjs";
import { t as resolveHeartbeatVisibility } from "./heartbeat-visibility-G7vehvUT.mjs";
import { t as formatForLog } from "./ws-log-d7CdTsJL.mjs";
import { t as hasSessionChangeReceivers } from "./session-change-receivers-CRdu4xcE.mjs";
import { a as isAgentLifecycleYieldedWaiting, i as persistGatewaySessionLifecycleEvent, r as isRestartRecoveryLifecycleEvent, t as buildGatewaySessionSnapshot } from "./session-event-payload-Bd0wzlaN.mjs";
import { r as withPreparedSessionEventRow } from "./session-event-prepared-row-DEoKnbRD.mjs";
import { i as roundedChatSendTimingMs } from "./chat-server-timing-soo795Of.mjs";
import { performance } from "node:perf_hooks";
import { Value } from "typebox/value";
//#region src/gateway/server-chat-heartbeat.ts
function resolveHeartbeatFlag(runId, sourceRunId, captured) {
	const primary = getAgentRunContext(runId);
	const source = sourceRunId && sourceRunId !== runId ? getAgentRunContext(sourceRunId) : primary;
	if (primary?.isHeartbeat || source?.isHeartbeat) return true;
	return source ? primary?.isHeartbeat : captured ?? primary?.isHeartbeat;
}
/**
* Check if heartbeat ACK/noise should be hidden from interactive chat surfaces.
*/
function shouldHideHeartbeatChatOutput(runId, sourceRunId, captured) {
	if (!resolveHeartbeatFlag(runId, sourceRunId, captured)) return false;
	try {
		const cfg = getRuntimeConfig();
		return !resolveHeartbeatVisibility({
			cfg,
			channel: "webchat"
		}).showOk;
	} catch {
		return true;
	}
}
function normalizeHeartbeatChatFinalText(params) {
	if (!shouldHideHeartbeatChatOutput(params.runId, params.sourceRunId, params.isHeartbeat)) return {
		suppress: false,
		text: params.text
	};
	const stripped = stripHeartbeatToken(params.text, {
		mode: "heartbeat",
		maxAckChars: 300
	});
	if (!stripped.didStrip) return {
		suppress: false,
		text: params.text
	};
	if (stripped.shouldSkip) return {
		suppress: true,
		text: ""
	};
	return {
		suppress: false,
		text: stripped.text
	};
}
//#endregion
//#region src/gateway/server-chat-lifecycle-publication.ts
function createSessionLifecyclePublisher(deps) {
	const publishedModelInputs = /* @__PURE__ */ new WeakMap();
	return ({ event, phase, sessionKey, agentId, clientRunId, runContext }) => {
		if (phase === "start") deps.persistGatewaySessionLifecycleEventForEvent({
			sessionKey,
			agentId,
			event: {
				...event,
				...clientRunId !== event.runId ? { clientRunId } : {}
			}
		}).catch((err) => {
			logError(`gateway: start session persistence failed session=${formatForLog(sessionKey)} run=${formatForLog(event.runId)} error=${formatForLog(err)}`);
		});
		const sessionEventConnIds = deps.sessionEventSubscribers.getAll();
		if (!hasSessionChangeReceivers(sessionEventConnIds)) return;
		const readModelInput = () => phase === "model" && runContext ? JSON.stringify([
			sessionKey,
			agentId,
			projectedAgentRunInputKey(runContext)
		]) : void 0;
		const observedModelInput = readModelInput();
		if (runContext && observedModelInput && publishedModelInputs.get(runContext) === observedModelInput) return;
		const publish = () => {
			const modelInput = readModelInput();
			if (runContext && modelInput && publishedModelInputs.get(runContext) === modelInput) return;
			deps.broadcastToConnIds("sessions.changed", {
				sessionKey,
				...agentId ? { agentId } : {},
				phase,
				runId: event.runId,
				...clientRunId !== event.runId ? { clientRunId } : {},
				ts: event.ts,
				...deps.buildSnapshot(sessionKey, event, agentId, phase)
			}, sessionEventConnIds, { dropIfSlow: true });
			if (runContext && modelInput) publishedModelInputs.set(runContext, modelInput);
		};
		withPreparedSessionEventRow(deps.getSessionRowProjection?.(), sessionKey, agentId, publish).catch((error) => logError(`gateway: session snapshot publication failed: ${formatErrorMessage(error)}`));
	};
}
//#endregion
//#region src/gateway/server-chat-live-text.ts
function projectChatWireDelta(value) {
	const { message: _message, ...payload } = value;
	return payload;
}
function projectAssistantWireDelta(value) {
	const payload = value;
	const { text: _text, ...data } = payload.data;
	return {
		...payload,
		data
	};
}
function liveTextDelivery(state, runId, coalesce, isCurrent, projection) {
	const run = coalesce || projection ? state.getOrCreate(runId) : state.runs.get(runId);
	const group = run && (coalesce || projection ? run.liveTextGroup ??= new AbortController() : run.liveTextGroup);
	return group ? {
		group: group.signal,
		sourceEpoch: run?.liveTextEpoch,
		coalesce,
		projection,
		isCurrent: coalesce || projection ? isCurrent : void 0
	} : void 0;
}
function chatWireProjection(params) {
	return {
		key: params.key,
		delta: projectChatWireDelta,
		version: params.canvasBlocks,
		snapshot: params.replace,
		snapshotBytes: (_payload, deltaBytes) => deltaBytes + Buffer.byteLength(",\"message\":") + params.text.length * 6 + Buffer.byteLength(JSON.stringify(appendChatCanvasBlocksToMessage({
			role: "assistant",
			content: [{
				type: "text",
				text: ""
			}],
			timestamp: params.now
		}, params.canvasBlocks ?? [])))
	};
}
function assistantWireProjection(payload, sessionKey, agentId, controlUiVisible) {
	const text = payload.data.text;
	if (payload.stream !== "assistant" || typeof text !== "string") return;
	return {
		key: JSON.stringify([
			"agent",
			"assistant",
			sessionKey,
			agentId,
			controlUiVisible
		]),
		version: payload.data.itemId,
		delta: projectAssistantWireDelta,
		text: {
			snapshot: text,
			delta: typeof payload.data.delta === "string" ? payload.data.delta : ""
		},
		snapshot: payload.data.replace === true || typeof payload.data.delta !== "string" || payload.data.delta === "" || typeof payload.data.mediaUrl === "string" || Array.isArray(payload.data.mediaUrls) && payload.data.mediaUrls.length > 0,
		snapshotBytes: (_payload, deltaBytes) => deltaBytes + Buffer.byteLength(",\"text\":\"\"") + text.length * 6
	};
}
function prepareAgentWirePayload(event, clientRunId, state, isCurrent) {
	let payload = event.runId === clientRunId ? event : {
		...event,
		runId: clientRunId
	};
	if (event.stream === "assistant") {
		const input = resolveAssistantTextInput(event.data);
		if (input) {
			const run = state.getOrCreate(clientRunId);
			const textState = (run.agentText ??= {}).assistant ??= {};
			const previous = textState.snapshot;
			const text = input.text ?? (input.replace || previous?.itemId !== input.itemId ? "" : previous?.text ?? "") + (input.delta ?? "");
			textState.snapshot = {
				text,
				itemId: input.itemId
			};
			run.bufferIsCurrent = isCurrent;
			if (input.text === void 0) payload = {
				...payload,
				data: {
					...event.data,
					text
				}
			};
		}
	}
	return payload;
}
function mergeAgentTextPayload(previous, next) {
	const payload = next;
	const delta = previous.data.delta;
	const nextDelta = payload.data.delta;
	return payload.stream !== "item" && typeof delta === "string" && typeof nextDelta === "string" ? {
		...payload,
		data: {
			...payload.data,
			delta: `${delta}${nextDelta}`
		}
	} : payload;
}
function mergeChatTextPayload(previous, next) {
	const payload = next;
	return {
		...payload,
		deltaText: `${previous.deltaText}${payload.deltaText}`
	};
}
function cancelPendingLiveTextFlush(run, stream) {
	const pending = run.pendingTextFlushes?.[stream];
	if (!pending) return;
	clearTimeout(pending.timer);
	delete run.pendingTextFlushes?.[stream];
	if (run.pendingTextFlushes && Object.keys(run.pendingTextFlushes).length === 0) delete run.pendingTextFlushes;
}
function scheduleLiveTextFlush(run, stream, delayMs, flush) {
	const pendingFlushes = run.pendingTextFlushes ??= {};
	const existing = pendingFlushes[stream];
	if (existing) {
		existing.flush = flush;
		return;
	}
	const timer = setSafeTimeout(() => {
		const pending = run.pendingTextFlushes?.[stream];
		if (!pending || pending.timer !== timer) return;
		cancelPendingLiveTextFlush(run, stream);
		pending.flush();
	}, delayMs);
	timer.unref?.();
	pendingFlushes[stream] = {
		timer,
		flush
	};
}
//#endregion
//#region src/gateway/server-chat.ts
const CHAT_STATE_BY_TERMINAL_CLASSIFICATION = {
	success: "done",
	timeout: "error",
	cancellation: "aborted",
	failure: "error"
};
const RESTART_RECOVERY_LIFECYCLE_PHASES = /* @__PURE__ */ new Set([
	"start",
	"end",
	"error"
]);
const MAX_LIVE_CANVAS_BYTES = 65536;
function shouldMirrorAssistantEventToHiddenSessionMessages(data) {
	if (!data || typeof data !== "object") return false;
	const record = data;
	const hasText = typeof record.text === "string" && record.text.length > 0;
	const hasDelta = typeof record.delta === "string" && record.delta.length > 0;
	if (!hasText && !hasDelta) return false;
	return resolveAssistantEventPhase(data) === "commentary";
}
function shouldMirrorAgentEventToHiddenSessionMessages(evt) {
	return evt.stream === "thinking" || evt.stream === "approval" || evt.stream === "lifecycle";
}
const LIVE_TEXT_PACING_MS = 75;
const CHAT_ERROR_KINDS = /* @__PURE__ */ new Set([
	"refusal",
	"timeout",
	"rate_limit",
	"context_length",
	"unknown"
]);
const CHAT_ERROR_KIND_BY_FAILOVER_REASON = {
	auth: void 0,
	auth_permanent: void 0,
	format: void 0,
	rate_limit: "rate_limit",
	overloaded: "rate_limit",
	billing: void 0,
	server_error: void 0,
	timeout: void 0,
	tls_certificate: void 0,
	context_overflow: "context_length",
	model_not_found: void 0,
	session_expired: void 0,
	empty_response: void 0,
	no_error_details: void 0,
	unclassified: void 0,
	unknown: void 0
};
function readChatErrorKind(value) {
	return typeof value === "string" && CHAT_ERROR_KINDS.has(value) ? value : void 0;
}
function resolveChatErrorKindFromError(error) {
	if (error === void 0) return;
	const message = formatErrorMessage(error).toLowerCase();
	if (message.includes("refusal") || message.includes("content_filter") || message.includes("sensitive") || message.includes("unhandled stop reason: refusal_policy")) return "refusal";
	const reason = resolveFailoverReasonFromError(error);
	if (reason) {
		const errorKind = CHAT_ERROR_KIND_BY_FAILOVER_REASON[reason];
		if (errorKind) return errorKind;
	}
	return isTimeoutError(error) ? "timeout" : void 0;
}
function excludeConnIds(connIds, excludedConnIds) {
	if (!excludedConnIds || excludedConnIds.size === 0 || connIds.size === 0) return connIds;
	const filtered = /* @__PURE__ */ new Set();
	for (const connId of connIds) if (!excludedConnIds.has(connId)) filtered.add(connId);
	return filtered;
}
function createAgentEventHandler({ broadcast, broadcastToConnIds, nodeSendToSession, nodeHasSessionSubscribers, agentRunSeq, chatRunState, resolveSessionKeyForRun, clearAgentRunContext, toolEventRecipients, sessionEventSubscribers, sessionMessageSubscribers, loadGatewaySessionLifecycleSnapshotForEvent = () => ({ row: null }), getSessionRowProjection, persistGatewaySessionLifecycleEventForEvent = persistGatewaySessionLifecycleEvent, lifecycleErrorRetryGraceMs = AGENT_RUN_TERMINAL_RETRY_GRACE_MS, isChatSendRunActive = () => false, clearTrackedActiveRun, settleTrackedTerminal, trackTrackedRunTerminalPersistence, resolveActiveLifecycleGenerationForRun = () => void 0, updateRunToolErrorSummary, resolveSessionActiveRunState }) {
	const shouldProcessOwnedEvent = (runId, claimId, lifecycleGeneration) => !claimId || Boolean(lifecycleGeneration && getAgentRunContextOwnerStatus(runId, claimId, lifecycleGeneration) === "active");
	const clearRunContextForEvent = (evt) => {
		if (evt.contextClaimId) {
			clearAgentRunContext(evt.runId, evt.lifecycleGeneration, evt.contextClaimId);
			return;
		}
		clearAgentRunContext(evt.runId);
	};
	const resolveEventSession = (evt) => {
		const chatLink = evt.contextClaimId ? void 0 : chatRunState.registry.peek(evt.runId);
		const sessionAgentId = chatLink?.agentId ?? evt.agentId;
		const eventSessionKey = evt.deliverySessionKey ?? (typeof evt.sessionKey === "string" && evt.sessionKey.trim() ? evt.sessionKey : void 0);
		return {
			chatLink,
			sessionAgentId,
			eventSessionKey,
			sessionKey: chatLink?.sessionKey ?? eventSessionKey ?? getAgentRunContext(evt.runId)?.sessionKey ?? resolveSessionKeyForRun(evt.runId, sessionAgentId ? { agentId: sessionAgentId } : void 0)
		};
	};
	const pendingTerminalLifecycleErrors = /* @__PURE__ */ new Map();
	const cancelPendingChatDeltaFlush = (clientRunId) => {
		const record = chatRunState.runs.get(clientRunId);
		if (record) cancelPendingLiveTextFlush(record, "chat");
	};
	const clearPendingTerminalLifecycleError = (runId, lifecycleGeneration) => {
		const pending = pendingTerminalLifecycleErrors.get(runId);
		if (!pending) return;
		if (lifecycleGeneration && pending.event.lifecycleGeneration && lifecycleGeneration !== pending.event.lifecycleGeneration) return;
		clearTimeout(pending.timer);
		pendingTerminalLifecycleErrors.delete(runId);
	};
	const resolveRestartRecoveryLifecycleState = (sessionKey, agentId, event) => {
		try {
			const { entry } = loadGatewaySessionEntryReadOnly(sessionKey, {
				...agentId ? { agentId } : {},
				clone: false
			});
			return { suppress: isRestartRecoveryLifecycleEvent({
				entry,
				event
			}) };
		} catch {
			return { suppress: false };
		}
	};
	const resolveSpawnedBy = (sessionKey) => {
		const parsed = parseAgentSessionKey(sessionKey);
		const isDashboardSession = parsed?.rest.startsWith("dashboard:") === true;
		if (!isSubagentSessionKey(sessionKey) && !isAcpSessionKey(sessionKey) && !isDashboardSession) return null;
		const agentId = parsed?.agentId ?? tryResolveSessionCompatibilityOwnerAgentId(getRuntimeConfig(), sessionKey);
		return agentId ? getSessionRowProjection?.()?.readPreparedSpawnedBy({
			key: sessionKey,
			agentId
		}) ?? null : null;
	};
	const buildSessionEventSnapshot = (sessionKey, evt, agentId, includeActiveRunState = false, lifecycleProjection = false, ownerEvent = evt) => {
		const { lifecycleRunId, row } = loadGatewaySessionLifecycleSnapshotForEvent(sessionKey, agentId || ownerEvent ? {
			...agentId ? { agentId } : {},
			...ownerEvent ? { ownerEvent } : {}
		} : void 0);
		const activeRunState = includeActiveRunState ? resolveSessionActiveRunState?.({
			requestedKey: sessionKey,
			canonicalKey: row?.key ?? sessionKey,
			...row?.sessionId ? { sessionId: row.sessionId } : {},
			...agentId ? { agentId } : {}
		}) : void 0;
		return buildGatewaySessionSnapshot({
			sessionRow: row,
			agentId,
			includeSession: true,
			lifecycle: lifecycleProjection,
			event: evt,
			lifecycleRunId,
			activeRunState
		});
	};
	const publishSessionLifecycle = createSessionLifecyclePublisher({
		broadcastToConnIds,
		sessionEventSubscribers,
		getSessionRowProjection,
		persistGatewaySessionLifecycleEventForEvent,
		buildSnapshot: (sessionKey, event, agentId, phase) => buildSessionEventSnapshot(sessionKey, event, agentId, true, phase === "start")
	});
	const resolveSessionDeliveryKeys = (sessionKey, agentId) => {
		if (sessionKey.trim().toLowerCase() !== "global") return [sessionKey];
		const compatibilityOwnerAgentId = tryResolveSessionCompatibilityOwnerAgentId(getRuntimeConfig(), sessionKey);
		const deliveryAgentId = agentId ?? compatibilityOwnerAgentId;
		return deliveryAgentId ? resolveSessionSubscriptionKeys(sessionKey, deliveryAgentId, compatibilityOwnerAgentId) : [];
	};
	const emitFirstAssistantChatSendTiming = (chatLink) => {
		const timing = chatLink?.chatSendTiming;
		if (!timing || timing.firstAssistantEventSent) return;
		timing.firstAssistantEventSent = true;
		const nowMs = performance.now();
		broadcastToConnIds("chat.send_timing", {
			phase: "first-assistant-event",
			runId: chatLink.clientRunId,
			sessionKey: chatLink.sessionKey,
			...chatLink.agentId ? { agentId: chatLink.agentId } : {},
			ackToPhaseMs: roundedChatSendTimingMs(nowMs - timing.ackedAtMs),
			receivedToPhaseMs: roundedChatSendTimingMs(nowMs - timing.receivedAtMs),
			...timing.dispatchStartedAtMs !== void 0 ? { dispatchStartedToPhaseMs: roundedChatSendTimingMs(nowMs - timing.dispatchStartedAtMs) } : {}
		}, /* @__PURE__ */ new Set([timing.connId]), { dropIfSlow: true });
	};
	const finalizeLifecycleEvent = (evt, opts) => {
		if (!shouldProcessOwnedEvent(evt.runId, evt.contextClaimId, evt.lifecycleGeneration)) return;
		const lifecyclePhase = evt.stream === "lifecycle" && typeof evt.data?.phase === "string" ? evt.data.phase : null;
		if (lifecyclePhase !== "end" && lifecyclePhase !== "error") return;
		const currentRunContext = getAgentRunContext(evt.runId);
		const activeLifecycleGeneration = resolveActiveLifecycleGenerationForRun(evt.runId);
		const currentLifecycleGeneration = activeLifecycleGeneration ?? currentRunContext?.lifecycleGeneration;
		const { chatLink, sessionAgentId, eventSessionKey, sessionKey } = resolveEventSession(evt);
		const isControlUiVisible = evt.controlUiVisible ?? currentRunContext?.isControlUiVisible ?? true;
		const projectSessionLifecycle = evt.projectSessionLifecycle ?? currentRunContext?.projectSessionLifecycle ?? true;
		const projectSessionMessages = evt.projectSessionMessages ?? currentRunContext?.projectSessionMessages ?? true;
		const restartRecoverySessionKey = eventSessionKey ?? sessionKey;
		const restartRecoveryAgentId = evt.agentId ?? sessionAgentId;
		const clientRunId = chatLink?.clientRunId ?? evt.runId;
		const eventRunId = chatLink?.clientRunId ?? evt.runId;
		const isAborted = isChatAbortMarkerCurrent(chatRunState.runs.get(clientRunId)?.abortMarker, chatLink) || isChatAbortMarkerCurrent(chatRunState.runs.get(evt.runId)?.abortMarker, chatLink);
		const lifecycleAborted = evt.data?.aborted === true;
		const replyDispatchOwnsCompletion = evt.data?.completionSource === "reply-dispatch";
		const deliverySessionKeys = sessionKey ? resolveSessionDeliveryKeys(sessionKey, sessionAgentId) : [];
		const restartRecoveryState = opts?.restartRecoveryState ?? (restartRecoverySessionKey ? resolveRestartRecoveryLifecycleState(restartRecoverySessionKey, restartRecoveryAgentId, evt) : void 0);
		const suppressRestartRecoveryProjection = opts?.suppressRestartRecoveryProjection === true || Boolean(evt.lifecycleGeneration && activeLifecycleGeneration && evt.lifecycleGeneration !== activeLifecycleGeneration) || restartRecoveryState?.suppress === true;
		if (suppressRestartRecoveryProjection && Boolean(evt.lifecycleGeneration && currentLifecycleGeneration && evt.lifecycleGeneration !== currentLifecycleGeneration)) return;
		clearPendingTerminalLifecycleError(evt.runId, evt.lifecycleGeneration);
		let terminalPersistence;
		if (!replyDispatchOwnsCompletion && !suppressRestartRecoveryProjection && sessionKey && (isControlUiVisible || projectSessionMessages && deliverySessionKeys.some((deliverySessionKey) => sessionMessageSubscribers.get(deliverySessionKey).size > 0))) {
			if (!isAborted) {
				const finished = chatLink ? chatRunState.registry.shift(evt.runId) : void 0;
				const terminalSessionKey = finished?.sessionKey ?? sessionKey;
				const terminalRunId = finished?.clientRunId ?? eventRunId;
				const terminalAgentId = finished?.agentId ?? sessionAgentId;
				const terminalOutcome = buildAgentRunTerminalOutcomeFromLifecycleEvent({
					phase: lifecyclePhase,
					data: evt.data,
					endedAt: evt.data?.endedAt ?? evt.ts
				});
				const yieldedWaiting = isAgentLifecycleYieldedWaiting({
					phase: lifecyclePhase,
					yielded: evt.data?.yielded,
					livenessState: evt.data?.livenessState,
					stopReason: terminalOutcome.stopReason,
					aborted: lifecycleAborted,
					status: evt.data?.status,
					timeoutPhase: evt.data?.timeoutPhase,
					error: evt.data?.error
				});
				const terminalClassification = classifyAgentRunTerminalOutcome(terminalOutcome);
				const terminalState = CHAT_STATE_BY_TERMINAL_CLASSIFICATION[terminalClassification];
				if (!(opts?.skipChatErrorFinal && terminalState === "error")) emitChatTerminal(terminalSessionKey, terminalRunId, evt.runId, evt.seq, terminalState, terminalOutcome.error ?? evt.data?.error, terminalOutcome.stopReason, terminalClassification === "timeout" ? "timeout" : readChatErrorKind(evt.data?.errorKind) ?? resolveChatErrorKindFromError(evt.data?.error), {
					agentId: terminalAgentId,
					controlUiVisible: isControlUiVisible,
					isHeartbeat: resolveHeartbeatFlag(clientRunId, evt.runId, evt.isHeartbeat),
					firstAssistantTimingEntry: finished,
					abortErrorMessage: readToolValidationErrorSummary(evt.data?.toolErrorSummary),
					yielded: yieldedWaiting ? true : void 0,
					errorObservation: evt.data?.errorObservation,
					assistantTranscriptIdempotencyKey: readStringValue(evt.data?.assistantTranscriptIdempotencyKey)
				});
			} else if (chatLink) chatRunState.registry.remove(evt.runId, clientRunId, sessionKey);
		}
		toolEventRecipients.markFinal(evt.runId);
		if (!replyDispatchOwnsCompletion) {
			chatRunState.clearRun(clientRunId);
			if (suppressRestartRecoveryProjection && chatLink) chatRunState.registry.remove(evt.runId, clientRunId, sessionKey);
			if (!evt.contextClaimId) clearRunContextForEvent(evt);
			agentRunSeq.delete(evt.runId);
			agentRunSeq.delete(clientRunId);
		}
		if (sessionKey) {
			clearTrackedActiveRun?.({
				runId: evt.runId,
				clientRunId,
				sessionKey
			});
			if (!suppressRestartRecoveryProjection && projectSessionLifecycle) {
				const projection = getSessionRowProjection?.();
				const persistence = persistGatewaySessionLifecycleEventForEvent({
					sessionKey,
					agentId: sessionAgentId,
					event: {
						...evt,
						...evt.contextClaimId ? { contextClaimId: evt.contextClaimId } : {},
						...eventRunId !== evt.runId ? { clientRunId: eventRunId } : {},
						...evt.lifecycleGeneration ? { lifecycleGeneration: evt.lifecycleGeneration } : {},
						...evt.mainSessionRestartRecovery === true ? { mainSessionRestartRecovery: true } : {}
					}
				});
				terminalPersistence = persistence;
				trackTrackedRunTerminalPersistence?.({
					runId: evt.runId,
					clientRunId,
					sessionKey,
					sessionId: evt.sessionId,
					persistence
				});
				const broadcastSessionChange = (snapshotEvent) => {
					if (parseCronRunScopeSuffix(sessionKey).runId) return;
					const sessionEventConnIds = sessionEventSubscribers.getAll();
					if (!hasSessionChangeReceivers(sessionEventConnIds)) return;
					broadcastToConnIds("sessions.changed", {
						sessionKey,
						...sessionAgentId ? { agentId: sessionAgentId } : {},
						phase: lifecyclePhase,
						runId: evt.runId,
						...eventRunId !== evt.runId ? { clientRunId: eventRunId } : {},
						ts: evt.ts,
						...buildSessionEventSnapshot(sessionKey, snapshotEvent, sessionAgentId, true, true, evt)
					}, sessionEventConnIds, { dropIfSlow: true });
				};
				persistence.then(async () => {
					await withPreparedSessionEventRow(projection, sessionKey, sessionAgentId, broadcastSessionChange);
				}, async (err) => {
					logError(`gateway: terminal session persistence failed session=${formatForLog(sessionKey)} run=${formatForLog(evt.runId)} error=${formatForLog(err)}`);
					await withPreparedSessionEventRow(projection, sessionKey, sessionAgentId, () => broadcastSessionChange(evt));
				}).catch((error) => {
					logError(`gateway: terminal session snapshot publication failed: ${formatErrorMessage(error)}`);
				});
			} else settleTrackedTerminal?.({
				runId: evt.runId,
				clientRunId,
				sessionKey
			});
		}
		if (!replyDispatchOwnsCompletion && evt.contextClaimId) {
			if (terminalPersistence) {
				const clearOwnedRunContext = () => clearRunContextForEvent(evt);
				terminalPersistence.then(clearOwnedRunContext, clearOwnedRunContext);
			} else clearRunContextForEvent(evt);
		}
	};
	const scheduleTerminalLifecycleError = (evt, opts) => {
		clearPendingTerminalLifecycleError(evt.runId);
		const timer = setSafeTimeout(() => {
			const pending = pendingTerminalLifecycleErrors.get(evt.runId);
			if (!pending || pending.timer !== timer) return;
			pendingTerminalLifecycleErrors.delete(evt.runId);
			finalizeLifecycleEvent(pending.event, pending.opts);
		}, lifecycleErrorRetryGraceMs);
		timer.unref?.();
		pendingTerminalLifecycleErrors.set(evt.runId, {
			timer,
			event: evt,
			opts
		});
	};
	const broadcastChatDelta = (sessionKey, agentId, clientRunId, sourceRunId, seq, text, opts) => {
		cancelPendingChatDeltaFlush(clientRunId);
		const run = chatRunState.getOrCreate(clientRunId);
		const broadcastDelta = chatRunState.takeBufferDelta(clientRunId, text);
		if (!broadcastDelta) return;
		const now = Date.now();
		run.deltaSentAt = now;
		const spawnedBy = resolveSpawnedBy(sessionKey);
		const deliveryKey = JSON.stringify([
			"chat",
			sessionKey,
			agentId,
			opts?.controlUiVisible ?? true
		]);
		const canvasBlocks = run.canvasBlocks;
		const payload = {
			runId: clientRunId,
			sessionKey,
			...agentId ? { agentId } : {},
			...spawnedBy && { spawnedBy },
			seq,
			state: "delta",
			deltaText: broadcastDelta.deltaText,
			...broadcastDelta.replace ? { replace: true } : {},
			message: appendChatCanvasBlocksToMessage({
				role: "assistant",
				content: [{
					type: "text",
					text
				}],
				timestamp: now
			}, canvasBlocks ?? [])
		};
		emitFirstAssistantChatSendTiming(opts?.firstAssistantTimingEntry ?? chatRunState.registry.peek(sourceRunId));
		sendLivePayload("chat", sessionKey, payload, {
			agentId,
			controlUiVisible: opts?.controlUiVisible ?? true,
			dropIfSlow: true,
			liveText: liveTextDelivery(chatRunState, clientRunId, broadcastDelta.replace ? void 0 : {
				key: deliveryKey,
				merge: mergeChatTextPayload
			}, run.bufferIsCurrent, chatWireProjection({
				key: deliveryKey,
				text,
				now,
				canvasBlocks,
				replace: broadcastDelta.replace
			}))
		});
	};
	const scheduleChatDeltaFlush = (sessionKey, agentId, clientRunId, sourceRunId, seq, delayMs, controlUiVisible, isHeartbeat) => {
		const run = chatRunState.getOrCreate(clientRunId);
		const flush = () => {
			if (run.bufferIsCurrent?.() === false) {
				chatRunState.clearRun(clientRunId);
				agentRunSeq.delete(sourceRunId);
				return;
			}
			const projected = chatRunState.resolveBuffer(clientRunId);
			if (shouldHideHeartbeatChatOutput(clientRunId, sourceRunId, isHeartbeat)) return;
			const mergedText = projected.suppress ? "" : projected.text;
			broadcastChatDelta(sessionKey, agentId, clientRunId, sourceRunId, seq, mergedText, { controlUiVisible });
		};
		scheduleLiveTextFlush(run, "chat", delayMs, flush);
	};
	const emitChatDelta = (sessionKey, agentId, clientRunId, sourceRunId, seq, input, opts) => {
		const run = chatRunState.getOrCreate(clientRunId);
		const previousRawText = run.rawBuffer ?? "";
		const mergedRawText = chatRunState.updateBuffer(clientRunId, input);
		if (!mergedRawText && !previousRawText) return;
		const now = Date.now();
		run.bufferIsCurrent = opts?.isCurrent;
		if (!mergedRawText) {
			broadcastChatDelta(sessionKey, agentId, clientRunId, sourceRunId, seq, "", opts);
			return;
		}
		if (run.deltaSentAt !== void 0) {
			scheduleChatDeltaFlush(sessionKey, agentId, clientRunId, sourceRunId, seq, LIVE_TEXT_PACING_MS - (now - run.deltaSentAt), opts?.controlUiVisible, opts?.isHeartbeat);
			return;
		}
		const projected = chatRunState.resolveBuffer(clientRunId);
		if (shouldHideHeartbeatChatOutput(clientRunId, sourceRunId, opts?.isHeartbeat)) return;
		const mergedText = projected.suppress ? "" : projected.text;
		broadcastChatDelta(sessionKey, agentId, clientRunId, sourceRunId, seq, mergedText, opts);
	};
	const resolveBufferedChatTextState = (clientRunId, sourceRunId, options) => {
		const normalizedHeartbeatText = normalizeHeartbeatChatFinalText({
			runId: clientRunId,
			sourceRunId,
			text: chatRunState.resolveBuffer(clientRunId, { final: options?.final }).text.trim(),
			isHeartbeat: options?.isHeartbeat
		});
		const projected = projectLiveAssistantBufferedText(normalizedHeartbeatText.text.trim(), { suppressLeadFragments: options?.suppressLeadFragments });
		return {
			text: projected.text.trim(),
			shouldSuppressSilent: normalizedHeartbeatText.suppress || projected.suppress
		};
	};
	const flushBufferedChatDeltaIfNeeded = (sessionKey, agentId, clientRunId, sourceRunId, seq, opts, resolved) => {
		cancelPendingChatDeltaFlush(clientRunId);
		const streamed = resolved ? projectLiveAssistantBufferedText(resolved.text, { suppressLeadFragments: true }) : void 0;
		const { text, shouldSuppressSilent } = streamed ? {
			text: streamed.text.trim(),
			shouldSuppressSilent: resolved?.shouldSuppressSilent || streamed.suppress
		} : resolveBufferedChatTextState(clientRunId, sourceRunId, {
			suppressLeadFragments: true,
			isHeartbeat: opts?.isHeartbeat
		});
		if (shouldHideHeartbeatChatOutput(clientRunId, sourceRunId, opts?.isHeartbeat)) return;
		broadcastChatDelta(sessionKey, agentId, clientRunId, sourceRunId, seq, shouldSuppressSilent ? "" : text, opts);
	};
	const sendLivePayload = (event, sessionKey, payload, opts) => {
		const visible = opts?.controlUiVisible ?? true;
		const deliverySessionKeys = sessionKey ? resolveSessionDeliveryKeys(sessionKey, opts?.agentId) : void 0;
		const liveText = opts?.liveText ?? liveTextDelivery(chatRunState, payload.runId);
		const broadcastOpts = {
			dropIfSlow: event === "agent" && visible ? void 0 : opts?.dropIfSlow,
			excludeClientCapability: event === "agent" && "stream" in payload && payload.stream === "assistant" && (typeof payload.data.text === "string" || typeof payload.data.delta === "string") ? GATEWAY_CLIENT_CAPS.CHAT_ONLY_ASSISTANT_TEXT : void 0,
			sessionKeys: deliverySessionKeys,
			liveText: liveText && event === "chat" && "state" in payload && (payload.state === "final" || payload.state === "error") ? {
				...liveText,
				settle: true
			} : liveText
		};
		if (visible) {
			broadcast(event, payload, broadcastOpts);
			if (deliverySessionKeys?.[0]) nodeSendToSession(deliverySessionKeys[0], event, payload, broadcastOpts);
			return;
		}
		const recipients = /* @__PURE__ */ new Set();
		for (const deliveryKey of deliverySessionKeys ?? []) for (const connId of sessionMessageSubscribers.get(deliveryKey)) recipients.add(connId);
		if (recipients.size > 0) broadcastToConnIds(event, event === "agent" && sessionKey ? {
			...payload,
			...buildSessionEventSnapshot(sessionKey, void 0, opts?.agentId)
		} : payload, recipients, {
			...broadcastOpts,
			sessionSubscriptionVerified: true
		});
	};
	const emitChatTerminal = (sessionKey, clientRunId, sourceRunId, seq, jobState, error, stopReason, errorKind, opts) => {
		const { text, shouldSuppressSilent } = resolveBufferedChatTextState(clientRunId, sourceRunId, {
			final: true,
			suppressLeadFragments: false,
			isHeartbeat: opts?.isHeartbeat
		});
		flushBufferedChatDeltaIfNeeded(sessionKey, opts?.agentId, clientRunId, sourceRunId, seq, opts, {
			text,
			shouldSuppressSilent
		});
		const spawnedBy = resolveSpawnedBy(sessionKey);
		const terminalPayload = {
			runId: clientRunId,
			sessionKey,
			...opts?.agentId ? { agentId: opts.agentId } : {},
			...spawnedBy && { spawnedBy },
			seq
		};
		const createTerminalMessage = (canvasBlocks) => appendChatCanvasBlocksToMessage({
			role: "assistant",
			content: text ? [{
				type: "text",
				text
			}] : [],
			timestamp: Date.now(),
			...opts?.assistantTranscriptIdempotencyKey ? { __openclaw: {
				runId: clientRunId,
				idempotencyKey: opts.assistantTranscriptIdempotencyKey
			} } : {}
		}, canvasBlocks);
		if (jobState !== "error") {
			const run = chatRunState.runs.get(clientRunId);
			const canvasBlocks = run?.canvasBlocks ?? [];
			const canvasOnly = jobState === "done" && canvasBlocks.length > 0 && !(run?.rawBuffer ?? run?.buffer ?? "").trim();
			const payload = {
				...terminalPayload,
				state: jobState === "done" ? "final" : "aborted",
				...jobState === "aborted" && opts?.abortErrorMessage ? { errorMessage: opts.abortErrorMessage } : {},
				...stopReason && { stopReason },
				...jobState === "done" && opts?.yielded ? { yielded: true } : {},
				message: text && !shouldSuppressSilent || canvasOnly ? createTerminalMessage(canvasBlocks) : void 0
			};
			if (payload.message) emitFirstAssistantChatSendTiming(opts?.firstAssistantTimingEntry);
			sendLivePayload("chat", sessionKey, payload, opts);
			chatRunState.clearRun(clientRunId);
			return;
		}
		const errorDetail = projectChatErrorDetail(opts?.errorObservation);
		const payload = {
			...terminalPayload,
			state: "error",
			...opts?.assistantTranscriptIdempotencyKey && text && !shouldSuppressSilent ? { message: createTerminalMessage(chatRunState.runs.get(clientRunId)?.canvasBlocks ?? []) } : {},
			errorMessage: error ? formatForLog(error) : void 0,
			...errorKind && { errorKind },
			...errorDetail ? { errorDetail } : {},
			...stopReason && { stopReason }
		};
		sendLivePayload("chat", sessionKey, payload, opts);
		chatRunState.clearRun(clientRunId);
	};
	const sendAgentPayload = (sessionKey, payload, opts) => {
		const stream = resolveAgentTextThrottleStream(payload);
		const deliveryKey = JSON.stringify([
			"agent",
			stream,
			payload.data.itemId,
			sessionKey,
			opts?.agentId,
			opts?.controlUiVisible ?? true
		]);
		const liveText = liveTextDelivery(chatRunState, payload.runId, stream && opts?.coalesce ? {
			key: deliveryKey,
			merge: mergeAgentTextPayload
		} : void 0, opts?.isCurrent, assistantWireProjection(payload, sessionKey, opts?.agentId, opts?.controlUiVisible ?? true));
		if (liveText && opts?.settle) liveText.settle = true;
		sendLivePayload("agent", sessionKey, payload, {
			...opts,
			liveText
		});
	};
	const flushBufferedAgentDeltaIfNeeded = (clientRunId) => {
		const run = chatRunState.runs.get(clientRunId);
		if (run) cancelPendingLiveTextFlush(run, "agent");
		const states = Object.values(run?.agentText ?? {});
		states.sort((a, b) => (a.bufferedEvent?.payload.seq ?? 0) - (b.bufferedEvent?.payload.seq ?? 0));
		for (const state of states) {
			const buffered = state.bufferedEvent;
			if (!buffered) continue;
			delete state.bufferedEvent;
			if (buffered.isCurrent?.() === false) continue;
			state.lastSentAt = Date.now();
			sendAgentPayload(buffered.sessionKey, buffered.payload, {
				agentId: buffered.agentId,
				controlUiVisible: buffered.controlUiVisible,
				dropIfSlow: buffered.controlUiVisible === false,
				coalesce: true,
				isCurrent: buffered.isCurrent
			});
		}
	};
	const resolveAgentTextThrottleStream = (evt) => {
		if (evt.stream === "assistant" || evt.stream === "thinking") {
			const stream = evt.stream === "assistant" ? "assistant" : "thinking";
			return typeof evt.data.delta === "string" || evt.data.replace === true ? stream : null;
		}
		const { kind, phase, status, itemId, progressText } = evt.data;
		return evt.stream === "item" && phase === "update" && (kind === "preamble" || kind === "answer_candidate" && status === "candidate") && typeof itemId === "string" && typeof progressText === "string" ? kind : null;
	};
	const shouldCoalesceAgentTextEvent = (evt) => !(Array.isArray(evt.data.mediaUrls) && evt.data.mediaUrls.length > 0) && typeof evt.data.mediaUrl !== "string" && evt.data.replace !== true && (evt.stream === "item" || typeof evt.data.text === "string" && typeof evt.data.delta === "string" && evt.data.delta.length > 0 && (evt.stream !== "assistant" || !shouldSuppressAssistantEventForLiveChat(evt.data)));
	const sendOrBufferAgentTextEvent = (clientRunId, next, settle) => {
		const { payload } = next;
		const stream = resolveAgentTextThrottleStream(payload);
		const now = Date.now();
		const run = stream ? chatRunState.getOrCreate(clientRunId) : void 0;
		const state = run && stream ? (run.agentText ??= {})[stream] ??= {} : void 0;
		const last = state?.lastSentAt;
		const previous = state?.bufferedEvent;
		if (run && state && last !== void 0 && shouldCoalesceAgentTextEvent(payload) && (!previous || previous.payload.data.itemId === payload.data.itemId && previous.sessionKey === next.sessionKey && previous.agentId === next.agentId && previous.controlUiVisible === next.controlUiVisible && previous.isCurrent?.() !== false)) {
			state.bufferedEvent = {
				...next,
				payload: previous ? mergeAgentTextPayload(previous.payload, payload) : payload
			};
			scheduleLiveTextFlush(run, "agent", LIVE_TEXT_PACING_MS - (now - last), () => flushBufferedAgentDeltaIfNeeded(clientRunId));
			return;
		}
		flushBufferedAgentDeltaIfNeeded(clientRunId);
		sendAgentPayload(next.sessionKey, payload, {
			agentId: next.agentId,
			controlUiVisible: next.controlUiVisible,
			dropIfSlow: next.controlUiVisible === false,
			isCurrent: next.isCurrent,
			settle
		});
		if (state) state.lastSentAt = now;
	};
	const resolveToolVerboseLevel = (event, sessionKey, agentId) => {
		const runContext = getAgentRunContext(event.runId);
		const runVerbose = normalizeVerboseLevel(runContext?.verboseLevel ?? event.verboseLevel);
		const registeredAt = runContext?.registeredAt ?? event.registeredAt;
		try {
			const { cfg, entry } = loadGatewaySessionEntryReadOnly(sessionKey, {
				agentId,
				clone: false
			});
			const sessionVerbose = normalizeVerboseLevel(entry?.verboseLevel);
			const sessionUpdatedAt = typeof entry?.updatedAt === "number" ? entry.updatedAt : void 0;
			if (sessionVerbose && (!runVerbose || sessionUpdatedAt !== void 0 && registeredAt !== void 0 && sessionUpdatedAt >= registeredAt)) return sessionVerbose;
			if (runVerbose) return runVerbose;
			return normalizeVerboseLevel(cfg.agents?.defaults?.verboseDefault) ?? "off";
		} catch {
			return runVerbose ?? "off";
		}
	};
	const sendNodeToolPayload = (event, sessionKey, agentId, payload) => {
		const deliveryKeys = resolveSessionDeliveryKeys(sessionKey, agentId).filter(nodeHasSessionSubscribers);
		const firstDeliveryKey = deliveryKeys[0];
		if (!firstDeliveryKey) return;
		const verbose = resolveToolVerboseLevel(event, sessionKey, agentId);
		if (verbose === "off") return;
		let channelPayload = payload;
		if (verbose !== "full") {
			const data = { ...event.data };
			delete data.result;
			delete data.partialResult;
			channelPayload = {
				...payload,
				data
			};
		}
		nodeSendToSession(firstDeliveryKey, "agent", {
			...channelPayload,
			...buildSessionEventSnapshot(sessionKey, void 0, agentId)
		}, { sessionKeys: deliveryKeys });
	};
	const handleEvent = (event) => {
		const evt = event;
		const isCurrent = shouldProcessOwnedEvent.bind(null, evt.runId, evt.contextClaimId, evt.lifecycleGeneration);
		if (!isCurrent()) return;
		const lifecyclePhase = evt.stream === "lifecycle" && typeof evt.data?.phase === "string" ? evt.data.phase : null;
		const { chatLink, sessionAgentId, eventSessionKey, sessionKey } = resolveEventSession(evt);
		const runContext = getAgentRunContext(evt.runId);
		const activeLifecycleGeneration = resolveActiveLifecycleGenerationForRun(evt.runId);
		const isControlUiVisible = evt.controlUiVisible ?? runContext?.isControlUiVisible ?? true;
		const projectSessionLifecycle = evt.projectSessionLifecycle ?? runContext?.projectSessionLifecycle ?? true;
		const projectSessionMessages = evt.projectSessionMessages ?? runContext?.projectSessionMessages ?? true;
		const restartRecoverySessionKey = RESTART_RECOVERY_LIFECYCLE_PHASES.has(lifecyclePhase ?? "") ? eventSessionKey ?? sessionKey : void 0;
		const restartRecoveryAgentId = evt.agentId ?? sessionAgentId;
		const clientRunId = chatLink?.clientRunId ?? evt.runId;
		const isHeartbeat = runContext?.isHeartbeat ?? evt.isHeartbeat;
		const heartbeatPolicy = resolveHeartbeatFlag(clientRunId, evt.runId, evt.isHeartbeat);
		if (chatRunState.runs.get(clientRunId)?.bufferIsCurrent?.() === false) {
			chatRunState.clearRun(clientRunId);
			agentRunSeq.delete(evt.runId);
		}
		const eventRunId = chatLink?.clientRunId ?? evt.runId;
		const eventForClients = prepareAgentWirePayload(evt, eventRunId, chatRunState, isCurrent);
		const isAborted = isChatAbortMarkerCurrent(chatRunState.runs.get(clientRunId)?.abortMarker, chatLink) || isChatAbortMarkerCurrent(chatRunState.runs.get(evt.runId)?.abortMarker, chatLink);
		const recordsEmbeddedProgress = !chatLink && isActiveEmbeddedRunId(evt.runId);
		const recordsInFlightProgress = Boolean(chatLink) && isControlUiVisible || recordsEmbeddedProgress;
		const restartRecoveryState = restartRecoverySessionKey ? resolveRestartRecoveryLifecycleState(restartRecoverySessionKey, restartRecoveryAgentId, evt) : void 0;
		if (lifecyclePhase !== null && (Boolean(evt.lifecycleGeneration && activeLifecycleGeneration && evt.lifecycleGeneration !== activeLifecycleGeneration) || restartRecoveryState?.suppress === true)) {
			clearPendingTerminalLifecycleError(evt.runId, evt.lifecycleGeneration);
			if (lifecyclePhase === "end" || lifecyclePhase === "error") finalizeLifecycleEvent(evt, {
				suppressRestartRecoveryProjection: true,
				restartRecoveryState
			});
			return;
		}
		if (lifecyclePhase !== null && lifecyclePhase !== "error") clearPendingTerminalLifecycleError(evt.runId);
		const spawnedBy = sessionKey ? resolveSpawnedBy(sessionKey) : null;
		const agentPayload = sessionKey ? {
			...eventForClients,
			sessionKey,
			...sessionAgentId ? { agentId: sessionAgentId } : {},
			...spawnedBy && { spawnedBy },
			...isHeartbeat !== void 0 && { isHeartbeat }
		} : {
			...eventForClients,
			...isHeartbeat !== void 0 && { isHeartbeat }
		};
		const hasSessionMessageSubscribers = projectSessionMessages && sessionKey ? resolveSessionDeliveryKeys(sessionKey, sessionAgentId).some((deliverySessionKey) => sessionMessageSubscribers.get(deliverySessionKey).size > 0) : false;
		const last = agentRunSeq.get(evt.runId) ?? 0;
		const isToolEvent = evt.stream === "tool";
		const isItemEvent = evt.stream === "item";
		const suppressHeartbeatToolEvents = isToolEvent && heartbeatPolicy === true;
		if (last > 0 && evt.seq !== last + 1) {
			flushBufferedAgentDeltaIfNeeded(clientRunId);
			if (isControlUiVisible) broadcast("agent", {
				runId: eventRunId,
				stream: "error",
				ts: Date.now(),
				sessionKey,
				...spawnedBy && { spawnedBy },
				...isHeartbeat !== void 0 && { isHeartbeat },
				data: {
					reason: "seq gap",
					expected: last + 1,
					received: evt.seq
				}
			}, {
				sessionKeys: sessionKey ? resolveSessionDeliveryKeys(sessionKey, sessionAgentId) : void 0,
				liveText: liveTextDelivery(chatRunState, clientRunId)
			});
			const run = chatRunState.runs.get(clientRunId);
			if (run) run.liveTextEpoch = {};
		}
		agentRunSeq.set(evt.runId, evt.seq);
		if (evt.stream === "assistant") updateRunToolErrorSummary?.({
			runId: evt.runId,
			clientRunId,
			summary: void 0
		});
		if (evt.stream === "plan" && evt.data?.phase === "update") {
			const steps = normalizeAgentPlanSteps(evt.data.steps) ?? [];
			const explanation = typeof evt.data.explanation === "string" ? evt.data.explanation.trim() : "";
			chatRunState.getOrCreate(clientRunId).planSnapshot = {
				steps,
				...explanation ? { explanation } : {}
			};
		}
		if (recordsInFlightProgress && !isAborted && !suppressHeartbeatToolEvents) chatRunState.recordProgressEvent(clientRunId, agentPayload, recordsEmbeddedProgress ? "summary" : "full");
		if (evt.stream === "run_status" && chatLink && isControlUiVisible && sessionKey && !isAborted) {
			const payload = {
				runId: clientRunId,
				sessionKey,
				...sessionAgentId ? { agentId: sessionAgentId } : {},
				...spawnedBy && { spawnedBy },
				seq: evt.seq,
				state: "status",
				...evt.data.phase === "retrying" ? {
					phase: "starting_model",
					...evt.data.reason === "rate_limit" ? { retry: {
						attempt: evt.data.attempt,
						maxAttempts: evt.data.maxAttempts,
						reason: evt.data.reason
					} } : {}
				} : { phase: evt.data.phase }
			};
			if (Value.Check(ChatStatusEventSchema, payload)) sendLivePayload("chat", sessionKey, payload, {
				agentId: sessionAgentId,
				controlUiVisible: true,
				dropIfSlow: true
			});
		}
		if (isToolEvent) {
			const toolPhase = typeof evt.data?.phase === "string" ? evt.data.phase : "";
			if (toolPhase === "start") updateRunToolErrorSummary?.({
				runId: evt.runId,
				clientRunId,
				summary: void 0
			});
			else if (toolPhase === "result") updateRunToolErrorSummary?.({
				runId: evt.runId,
				clientRunId,
				summary: readToolValidationErrorSummary(evt.data?.toolErrorSummary)
			});
			if (toolPhase === "start" && (isControlUiVisible || hasSessionMessageSubscribers) && sessionKey && !isAborted && !suppressHeartbeatToolEvents) {
				flushBufferedChatDeltaIfNeeded(sessionKey, sessionAgentId, clientRunId, evt.runId, evt.seq, { controlUiVisible: isControlUiVisible });
				flushBufferedAgentDeltaIfNeeded(clientRunId);
			}
			const runToolRecipients = toolEventRecipients.get(evt.runId);
			if (isControlUiVisible && !suppressHeartbeatToolEvents && runToolRecipients && runToolRecipients.size > 0) broadcastToConnIds("agent", sessionKey ? {
				...agentPayload,
				...buildSessionEventSnapshot(sessionKey, void 0, sessionAgentId)
			} : agentPayload, runToolRecipients, {
				sessionKeys: sessionKey ? resolveSessionDeliveryKeys(sessionKey, sessionAgentId) : void 0,
				liveText: liveTextDelivery(chatRunState, clientRunId)
			});
			if (!isControlUiVisible && sessionKey && hasSessionMessageSubscribers && !suppressHeartbeatToolEvents) sendAgentPayload(sessionKey, agentPayload, {
				agentId: sessionAgentId,
				controlUiVisible: false,
				dropIfSlow: true
			});
			if (isControlUiVisible && sessionKey && !suppressHeartbeatToolEvents) {
				const sessionSubscribers = excludeConnIds(sessionEventSubscribers.getAll(), runToolRecipients);
				if (sessionSubscribers.size > 0) broadcastToConnIds("session.tool", {
					...agentPayload,
					...buildSessionEventSnapshot(sessionKey, void 0, sessionAgentId)
				}, sessionSubscribers, {
					dropIfSlow: true,
					liveText: liveTextDelivery(chatRunState, clientRunId)
				});
			}
		} else {
			if (((isItemEvent && typeof evt.data?.phase === "string" ? evt.data.phase : "") === "start" || lifecyclePhase === "error" && evt.data.completionSource !== "reply-dispatch") && (isControlUiVisible || hasSessionMessageSubscribers) && !isAborted) {
				if (sessionKey) flushBufferedChatDeltaIfNeeded(sessionKey, sessionAgentId, clientRunId, evt.runId, evt.seq, {
					controlUiVisible: isControlUiVisible,
					isHeartbeat: heartbeatPolicy
				});
				flushBufferedAgentDeltaIfNeeded(clientRunId);
			}
			if (isControlUiVisible || sessionKey && hasSessionMessageSubscribers && (isItemEvent || shouldMirrorAgentEventToHiddenSessionMessages(evt) || !isAborted && evt.stream === "assistant" && shouldMirrorAssistantEventToHiddenSessionMessages(evt.data))) sendOrBufferAgentTextEvent(clientRunId, {
				sessionKey,
				agentId: sessionAgentId,
				controlUiVisible: isControlUiVisible,
				payload: agentPayload,
				isCurrent
			}, lifecyclePhase === "end" && !isAborted && evt.data.aborted !== true ? true : void 0);
		}
		if ((isControlUiVisible || hasSessionMessageSubscribers) && sessionKey) {
			if (isToolEvent && evt.data.phase === "result" && !evt.data.isError && !isAborted && !suppressHeartbeatToolEvents) {
				const result = extractChatToolResultCanvasPreview(evt.data.result);
				if (result?.preview.surface === "assistant_message") {
					const blocks = appendChatCanvasBlocks(chatRunState.runs.get(clientRunId)?.canvasBlocks ?? [], [{
						preview: result.preview,
						rawText: null
					}]).slice(-32);
					if (!boundedJsonUtf8Bytes(blocks, MAX_LIVE_CANVAS_BYTES).complete) {
						do
							blocks.shift();
						while (blocks.length > 0 && !boundedJsonUtf8Bytes(blocks, MAX_LIVE_CANVAS_BYTES).complete);
						logWarn("Live chat canvas preview omitted: display descriptors exceed the 64 KiB limit.");
					}
					const run = chatRunState.getOrCreate(clientRunId);
					run.canvasBlocks = blocks;
					run.bufferIsCurrent = isCurrent;
				}
			}
			if (isControlUiVisible && isToolEvent && !suppressHeartbeatToolEvents) sendNodeToolPayload(evt, sessionKey, sessionAgentId, agentPayload);
			const assistantLiveChatInput = evt.stream === "assistant" ? resolveAssistantTextInput(evt.data) : void 0;
			const suppressAssistant = shouldSuppressAssistantEventForLiveChat(evt.data);
			if (!isAborted && assistantLiveChatInput && (!suppressAssistant || assistantLiveChatInput.itemId)) emitChatDelta(sessionKey, sessionAgentId, clientRunId, evt.runId, evt.seq, suppressAssistant ? {
				...assistantLiveChatInput,
				text: "",
				delta: ""
			} : assistantLiveChatInput, {
				controlUiVisible: isControlUiVisible,
				isCurrent,
				isHeartbeat: heartbeatPolicy
			});
		}
		if (lifecyclePhase === "error") {
			const skipChatErrorFinal = isChatSendRunActive(evt.runId) && !chatLink;
			const definitiveTerminal = isDefinitiveRunLifecycle({
				phase: lifecyclePhase,
				data: evt.data
			});
			if (isAborted || definitiveTerminal || lifecycleErrorRetryGraceMs <= 0) finalizeLifecycleEvent(evt, {
				skipChatErrorFinal,
				restartRecoveryState
			});
			else {
				if (evt.data.completionSource !== "reply-dispatch") chatRunState.clearRun(clientRunId);
				scheduleTerminalLifecycleError(evt, {
					skipChatErrorFinal,
					restartRecoveryState
				});
			}
			return;
		}
		if (lifecyclePhase === "end") {
			finalizeLifecycleEvent(evt, { restartRecoveryState });
			return;
		}
		if (projectSessionLifecycle && sessionKey && (lifecyclePhase === "start" || lifecyclePhase === "model" && runContext && isControlUiVisible)) publishSessionLifecycle({
			event: evt,
			phase: lifecyclePhase,
			sessionKey,
			agentId: sessionAgentId,
			clientRunId: eventRunId,
			runContext
		});
	};
	return Object.assign(handleEvent, { dispose: () => {
		for (const pending of pendingTerminalLifecycleErrors.values()) clearTimeout(pending.timer);
		pendingTerminalLifecycleErrors.clear();
	} });
}
//#endregion
export { createAgentEventHandler, createChatAbortMarker, createChatRunState, createSessionEventSubscriberRegistry, createSessionMessageSubscriberRegistry, resolveChatErrorKindFromError };
