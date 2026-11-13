import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { l as getAgentRunContext } from "./agent-run-registry-BDW3IRlF.mjs";
import { s as getReplyPayloadMetadata } from "./reply-payload-CZCVcyy_.mjs";
import { a as tryResolveSessionCompatibilityOwnerAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { t as capLiveAssistantText } from "./live-chat-projector-BtJEJKjU.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { r as loadGatewaySessionEntry } from "./session-utils-store-DWiBeNMH.mjs";
import "./session-utils-FXsPIESl.mjs";
import { a as projectChatDisplayMessage } from "./chat-display-projection.core-wI52Ji6o.mjs";
import "./chat-display-projection-BZOWmxhK.mjs";
//#region src/gateway/server-methods/chat-broadcast.ts
function nextChatSeq(context, runId) {
	const next = (context.agentRunSeq.get(runId) ?? 0) + 1;
	context.agentRunSeq.set(runId, next);
	return next;
}
function resolveGlobalAwareNodeChatDeliveryKeys(params) {
	if (parseAgentSessionKey(params.sessionKey)) return [params.sessionKey];
	const unscopedOwnerAgentId = tryResolveSessionCompatibilityOwnerAgentId(params.cfg, params.sessionKey);
	const selectedAgentId = params.agentId ?? unscopedOwnerAgentId;
	if (!selectedAgentId) return [params.sessionKey];
	const scopedAgentId = normalizeAgentId(selectedAgentId);
	const keys = [`agent:${scopedAgentId}:${params.sessionKey}`];
	if (unscopedOwnerAgentId && normalizeAgentId(unscopedOwnerAgentId) === normalizeAgentId(scopedAgentId)) keys.push(params.sessionKey);
	return keys;
}
function resolveChatSessionKeys(params) {
	return resolveGlobalAwareNodeChatDeliveryKeys({
		cfg: params.context.getRuntimeConfig?.() ?? {},
		sessionKey: params.sessionKey,
		agentId: params.agentId
	});
}
function sendGlobalAwareNodeChatPayload(params) {
	const deliveryKeys = params.opts?.sessionKeys ?? resolveChatSessionKeys({
		context: params.context,
		sessionKey: params.sessionKey,
		agentId: params.agentId
	});
	if (deliveryKeys[0]) {
		const opts = params.opts?.sessionKeys ? params.opts : {
			...params.opts,
			sessionKeys: deliveryKeys
		};
		params.context.nodeSendToSession(deliveryKeys[0], params.event, params.payload, opts);
	}
}
function broadcastChatFrame(params, liveText) {
	const visibility = getAgentRunContext(params.runId);
	if (visibility?.isControlUiVisible === false && visibility.projectSessionMessages === false) return;
	const seq = nextChatSeq(params.context, params.runId);
	const payloadAgentId = parseAgentSessionKey(params.sessionKey) ? void 0 : params.agentId;
	const frame = params.state === "delta" ? {
		state: params.state,
		deltaText: params.text,
		replace: true,
		message: projectChatDisplayMessage({
			role: "assistant",
			content: [{
				type: "text",
				text: params.text
			}]
		})
	} : params.state !== "error" ? {
		state: params.state,
		message: projectChatDisplayMessage(params.message),
		...params.stopReason ? { stopReason: params.stopReason } : {}
	} : {
		state: params.state,
		errorMessage: params.errorMessage,
		...params.stopReason ? { stopReason: params.stopReason } : {},
		...params.errorKind ? { errorKind: params.errorKind } : {}
	};
	const payload = {
		runId: params.runId,
		sessionKey: params.sessionKey,
		...payloadAgentId ? { agentId: payloadAgentId } : {},
		seq,
		...frame
	};
	const group = params.context.chatRunState?.runs.get(params.runId)?.liveTextGroup?.signal;
	const delivery = liveText ?? (group ? {
		group,
		settle: params.state === "final" || params.state === "error" ? true : void 0
	} : void 0);
	const opts = {
		...delivery ? { liveText: delivery } : {},
		...liveText ? { dropIfSlow: true } : {},
		sessionKeys: resolveChatSessionKeys({
			context: params.context,
			sessionKey: params.sessionKey,
			agentId: payloadAgentId
		})
	};
	params.context.broadcast("chat", payload, opts);
	sendGlobalAwareNodeChatPayload({
		context: params.context,
		sessionKey: params.sessionKey,
		agentId: payloadAgentId,
		event: "chat",
		payload,
		opts
	});
}
function broadcastChatDelta(params) {
	if (!params.isCurrent()) return;
	const text = capLiveAssistantText({ text: params.text });
	const run = params.context.chatRunState.getOrCreate(params.runId);
	run.buffer = text;
	run.bufferIsCurrent = params.isCurrent;
	run.liveTextGroup ??= new AbortController();
	broadcastChatFrame({
		...params,
		state: "delta",
		text
	}, {
		group: run.liveTextGroup.signal,
		isCurrent: params.isCurrent,
		coalesce: {
			key: JSON.stringify([
				"chat",
				params.sessionKey,
				params.agentId
			]),
			merge: (_previous, next) => next
		}
	});
}
function broadcastChatTerminal(params) {
	broadcastChatFrame(params);
	params.context.agentRunSeq.delete(params.runId);
}
function broadcastChatFinal(params) {
	broadcastChatTerminal({
		...params,
		state: "final"
	});
}
function isBtwReplyPayload(payload) {
	return typeof payload?.btw?.question === "string" && payload.btw.question.trim().length > 0 && typeof payload.text === "string" && payload.text.trim().length > 0;
}
function broadcastSideResult(params) {
	const seq = nextChatSeq(params.context, params.payload.runId);
	const payloadAgentId = parseAgentSessionKey(params.payload.sessionKey) ? void 0 : params.payload.agentId;
	const payload = {
		...params.payload,
		...payloadAgentId ? { agentId: payloadAgentId } : {},
		seq
	};
	params.context.broadcast("chat.side_result", payload, { sessionKeys: resolveChatSessionKeys({
		context: params.context,
		sessionKey: params.payload.sessionKey,
		agentId: payloadAgentId
	}) });
	sendGlobalAwareNodeChatPayload({
		context: params.context,
		sessionKey: params.payload.sessionKey,
		agentId: payloadAgentId,
		event: "chat.side_result",
		payload
	});
}
function broadcastChatError(params) {
	broadcastChatTerminal({
		...params,
		state: "error"
	});
}
function isSourceReplyTranscriptMirrorPayload(payload) {
	return Boolean(payload && getReplyPayloadMetadata(payload)?.sourceReplyTranscriptMirror);
}
//#endregion
//#region src/gateway/server-methods/chat-aborted-partial.ts
function withAbortedPartialPersistenceWarning(error, warning) {
	return warning ? {
		...error,
		message: `${error.message} ${warning}`
	} : error;
}
function withQueuedCollectorWarning(outcome, warning) {
	return outcome.ok ? {
		ok: true,
		value: {
			...outcome.value,
			warning
		}
	} : {
		ok: false,
		error: withAbortedPartialPersistenceWarning(outcome.error, warning)
	};
}
/** Retain a failed save when a later cancellation or terminal write also fails. */
function abortedPartialPersistenceError(error, warning) {
	if (!warning) return error;
	const message = `${formatErrorMessage(error)} ${warning}`;
	return error instanceof SessionMutationAuthorizationChangedError ? new SessionMutationAuthorizationChangedError({
		...error.error,
		message
	}) : new Error(message, { cause: error });
}
/** Capture before signaling cancellation, without loading asynchronous transcript writers. */
function captureAbortedPartial(params) {
	const { runId, abortOrigin } = params;
	try {
		const session = params.session ?? {
			ok: true,
			value: loadGatewaySessionEntry(params.sessionKey, params.agentId ? { agentId: params.agentId } : void 0)
		};
		if (!session.ok) throw session.error;
		const { cfg, storePath, entry, canonicalKey, agentId } = session.value;
		if (entry?.sessionId !== params.sessionId) throw new Error("Aborted partial transcript session changed before persistence");
		const producer = params.resolveTerminalProducer?.();
		return {
			runId,
			abortOrigin,
			ok: true,
			settlement: {
				deferred: false,
				producer: producer?.sessionId === params.sessionId && producer.sessionKey === params.sessionKey ? producer : void 0
			},
			value: {
				sessionKey: canonicalKey,
				sessionId: params.sessionId,
				expectedSessionId: params.sessionId,
				expectedLifecycleRevision: entry.lifecycleRevision ?? null,
				agentId,
				storePath,
				cfg,
				message: params.text,
				createIfMissing: true,
				idempotencyKey: `${runId}:assistant`,
				abortMeta: {
					aborted: true,
					origin: abortOrigin,
					runId
				}
			}
		};
	} catch (error) {
		return {
			runId,
			abortOrigin,
			ok: false,
			error
		};
	}
}
/** Transfer the fallback before cancellation can clear the producer's session slot. */
function deferAbortedPartialPersistence(snapshot, context) {
	if (!snapshot?.ok || snapshot.settlement.deferred || !snapshot.settlement.producer) return;
	try {
		snapshot.settlement.deferred = snapshot.settlement.producer.handoff((producerCompleted) => context.trackExecution(async () => {
			await producerCompleted;
			let warning;
			try {
				const { persistAbortedPartial } = await import("./chat-transcript-persistence-B491QE03.mjs");
				warning = await persistAbortedPartial({
					context,
					snapshot,
					producerSettled: true
				});
			} catch (error) {
				context.logGateway.warn(`chat.abort deferred transcript append failed: ${formatErrorMessage(error)}`);
				warning = ABORTED_PARTIAL_PERSISTENCE_WARNING;
			}
			if (warning) try {
				broadcastChatError({
					context,
					runId: snapshot.runId,
					sessionKey: snapshot.value.sessionKey,
					agentId: snapshot.value.agentId,
					errorMessage: warning
				});
			} catch (error) {
				context.logGateway.warn(`chat.abort persistence warning delivery failed: ${formatErrorMessage(error)}`);
			}
		}));
	} catch (error) {
		context.logGateway.warn(`chat.abort producer handoff failed: ${formatErrorMessage(error)}`);
	}
}
const ABORTED_PARTIAL_PERSISTENCE_WARNING = "Stopped, but a reply could not be saved to history. Copy any visible text before leaving this chat.";
//#endregion
export { withAbortedPartialPersistenceWarning as a, broadcastChatError as c, broadcastSideResult as d, isBtwReplyPayload as f, sendGlobalAwareNodeChatPayload as h, deferAbortedPartialPersistence as i, broadcastChatFinal as l, resolveGlobalAwareNodeChatDeliveryKeys as m, abortedPartialPersistenceError as n, withQueuedCollectorWarning as o, isSourceReplyTranscriptMirrorPayload as p, captureAbortedPartial as r, broadcastChatDelta as s, ABORTED_PARTIAL_PERSISTENCE_WARNING as t, broadcastChatTerminal as u };
