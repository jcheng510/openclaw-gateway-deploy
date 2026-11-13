import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { a as getPluginRuntimeGatewayRequestScope, u as withPluginRuntimeRegistryScope } from "./gateway-request-scope-Da9jAC9_.mjs";
import { d as getPluginRegistryGatewayOwner, u as getPluginRegistryGatewayChannelRegistration } from "./registry-lifecycle-D7jOZqUu.mjs";
import { t as runOutsidePluginRuntimeGenerationScope } from "./generation-scope-BTOPD8Qn.mjs";
import { i as getPluginRuntimeLoadContext } from "./load-context-F71qIsqu.mjs";
import { s as getGroupThreadDispatchContext } from "./group-thread-context-BObcmb-q.mjs";
import { g as isReplyPayloadTargetSuppressed } from "./reply-payload-CZCVcyy_.mjs";
import { r as PlatformMessageNotDispatchedError } from "./deliver-types-Diy-VQKA.mjs";
import { s as resolveOutboundDurableFinalDeliverySupport } from "./deliver-prepare-dnJ48fDC.mjs";
import { t as buildOutboundSessionContext } from "./session-context-Bw5OIGO_.mjs";
import { n as sendDurableMessageBatchCore, r as sendStructuredDurableMessageBatchCore } from "./send-DuNsLhHj.mjs";
import { t as deriveDurableFinalDeliveryRequirements } from "./capabilities-74tICDa_.mjs";
import { t as normalizeDeliverableOutboundChannel } from "./channel-resolution-CsPcQJcH.mjs";
import "./deliver-84COlw9c.mjs";
import { d as createChannelPartialDeliveryError, l as createChannelDeliveryResultFromReceipt } from "./live-B9coytaZ.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/channels/turn/durable-delivery-runtime.ts
/** Final delivery is a new operation of the admitting Gateway, not of the completed model turn. */
function withDurableDeliveryRuntime(input, deliver) {
	const registry = getPluginRuntimeGatewayRequestScope()?.pluginRegistry;
	const owner = registry && getPluginRegistryGatewayOwner(registry);
	if (!registry || !owner) return deliver(input.cfg);
	const current = owner.current();
	const reject = (message) => {
		throw new PlatformMessageNotDispatchedError(message, {
			cause: new Error(message),
			retryable: false
		});
	};
	if (!current) return reject("The Gateway that admitted this reply is closing.");
	const assertCurrent = () => {
		if (owner.current() !== current) reject("The reply delivery runtime changed before sending.");
	};
	if (current === registry) return deliver(input.cfg, assertCurrent);
	const cfg = getPluginRuntimeLoadContext(current)?.rawConfig;
	const channel = current.channels.find((entry) => entry.plugin.id === input.channel);
	const prepareRuntimeHandoff = input.prepareRuntimeHandoff;
	const admittedChannel = getPluginRegistryGatewayChannelRegistration(registry, input.channel);
	const retainedChannel = channel && admittedChannel?.pluginId === channel.pluginId && admittedChannel.plugin === channel.plugin;
	if (!cfg || !isDeepStrictEqual(cfg.channels?.[input.channel], input.cfg.channels?.[input.channel]) || !isDeepStrictEqual(cfg.channels?.defaults, input.cfg.channels?.defaults) || !channel || !retainedChannel || !prepareRuntimeHandoff || !isDeepStrictEqual(cfg.plugins?.entries?.[channel.pluginId], input.cfg.plugins?.entries?.[channel.pluginId])) return reject("The reply channel changed or cannot preserve its sender; delivery was not started.");
	return runOutsidePluginRuntimeGenerationScope(() => withPluginRuntimeRegistryScope(current, () => {
		const preparedCfg = prepareRuntimeHandoff(cfg);
		assertCurrent();
		return deliver(preparedCfg, assertCurrent);
	}));
}
//#endregion
//#region src/channels/turn/durable-delivery.ts
function resolveDeliveryTarget(params) {
	return normalizeOptionalString(params.to) ?? normalizeOptionalString(params.ctxPayload.OriginatingTo) ?? normalizeOptionalString(params.ctxPayload.To);
}
function resolveDurableInboundReplyToId(params) {
	if (isReplyPayloadTargetSuppressed(params.payload)) return null;
	if (params.replyToId === null || params.payload.replyToId === null) return null;
	return normalizeOptionalString(params.replyToId) ?? normalizeOptionalString(params.payload.replyToId) ?? normalizeOptionalString(params.ctxPayload.ReplyToIdFull) ?? normalizeOptionalString(params.ctxPayload.ReplyToId);
}
function resolveDurableInboundReplyThreadId(params) {
	if ("threadId" in params) return params.threadId;
	return params.ctxPayload.MessageThreadId;
}
function stringifyThreadId(value) {
	return value == null ? void 0 : String(value);
}
function toDeliveryIntent(intent) {
	return {
		id: intent.id,
		kind: "outbound_queue",
		queuePolicy: intent.queuePolicy
	};
}
function resolveDurableSuppression(send) {
	const hookEffect = send.payloadOutcomes?.find((outcome) => outcome.status === "suppressed")?.hookEffect;
	return {
		reason: send.reason,
		...hookEffect?.cancelReason ? { cancelReason: hookEffect.cancelReason } : {},
		...hookEffect?.metadata ? { metadata: hookEffect.metadata } : {}
	};
}
/** Narrows durable delivery results that handled the payload without caller fallback. */
function isDurableInboundReplyDeliveryHandled(result) {
	return result.status === "handled_visible" || result.status === "handled_no_send";
}
/** Throws failed durable delivery results, preserving visible-send metadata when applicable. */
function throwIfDurableInboundReplyDeliveryFailed(result) {
	if (result.status === "failed") throw result.error;
}
function resolveAcceptedVisibleContent(results) {
	return results.map((result) => result.meta?.visibleText).filter((value) => typeof value === "string").join("") || void 0;
}
/** Delivers final inbound replies through the durable message-send context when supported. */
async function deliverInboundReplyWithMessageSendContextCore(params) {
	return await deliverInboundReplyWithMessageSendContext(params, sendDurableMessageBatchCore);
}
/** Delivers a prepared final reply through the same durable owner without parsing its text. */
async function deliverStructuredInboundReplyWithMessageSendContextCore(params) {
	const { plan, ...context } = params;
	return await deliverInboundReplyWithMessageSendContext({
		...context,
		payload: plan.payload
	}, ({ payloads: _payloads, ...sendParams }) => sendStructuredDurableMessageBatchCore({
		...sendParams,
		plan: [plan]
	}));
}
async function deliverInboundReplyWithMessageSendContext(input, sendBatch) {
	if (input.info.kind !== "final") return {
		status: "not_applicable",
		reason: "non_final"
	};
	try {
		return await withDurableDeliveryRuntime(input, (cfg, assertCurrent) => deliverAdmittedInboundReply({
			...input,
			cfg
		}, sendBatch, assertCurrent));
	} catch (error) {
		return {
			status: "failed",
			error
		};
	}
}
async function deliverAdmittedInboundReply(input, sendBatch, assertCurrent) {
	const group = getGroupThreadDispatchContext();
	const params = group ? {
		...input,
		agentId: group.ctx.AgentId ?? input.agentId,
		ctxPayload: group.ctx,
		runId: group.runState.runId,
		executionIdentityToken: group.runState.executionIdentityToken
	} : input;
	const channel = normalizeDeliverableOutboundChannel(params.channel);
	const to = resolveDeliveryTarget(params);
	if (!channel) return {
		status: "unsupported",
		reason: "missing_channel"
	};
	if (!to) return {
		status: "unsupported",
		reason: "missing_target"
	};
	const replyToId = resolveDurableInboundReplyToId(params);
	const threadId = resolveDurableInboundReplyThreadId(params);
	const requiredCapabilities = params.requiredCapabilities ?? deriveDurableFinalDeliveryRequirements({
		payload: params.payload,
		replyToId,
		threadId,
		silent: params.silent
	});
	const durability = requiredCapabilities.reconcileUnknownSend === true ? "required" : "best_effort";
	let support;
	try {
		support = await resolveOutboundDurableFinalDeliverySupport({
			cfg: params.cfg,
			agentId: params.agentId,
			channel,
			requirements: requiredCapabilities
		});
	} catch (err) {
		return {
			status: "failed",
			error: err
		};
	}
	if (!support.ok) return {
		status: "unsupported",
		reason: support.reason,
		...support.capability ? { capability: support.capability } : {}
	};
	const session = buildOutboundSessionContext({
		cfg: params.cfg,
		sessionKey: params.ctxPayload.SessionKey,
		policySessionKey: params.ctxPayload.RuntimePolicySessionKey,
		conversationType: params.ctxPayload.ChatType,
		agentId: params.agentId,
		requesterAccountId: params.accountId ?? params.ctxPayload.AccountId,
		requesterSenderId: params.ctxPayload.SenderId ?? params.ctxPayload.From,
		requesterSenderName: params.ctxPayload.SenderName,
		requesterSenderUsername: params.ctxPayload.SenderUsername,
		requesterSenderE164: params.ctxPayload.SenderE164
	});
	assertCurrent?.();
	const send = await sendBatch({
		assertDirectAdapterHandoff: assertCurrent,
		cfg: params.cfg,
		channel,
		to,
		accountId: params.accountId,
		payloads: [params.payload],
		...params.runId ?? params.executionIdentityToken?.runId ? { runId: params.runId ?? params.executionIdentityToken?.runId } : {},
		...params.executionIdentityToken ? { executionIdentityToken: params.executionIdentityToken } : {},
		threadId,
		replyToId,
		replyToMode: params.replyToMode,
		formatting: params.formatting,
		identity: params.identity,
		deps: params.deps,
		mediaAccess: params.mediaAccess,
		silent: params.silent,
		durability,
		...requiredCapabilities.reconcileUnknownSend === true ? { requireUnknownSendReconciliation: true } : {},
		session,
		gatewayClientScopes: params.ctxPayload.GatewayClientScopes ?? []
	});
	if (send.status === "failed") return {
		status: "failed",
		error: send.error
	};
	const content = send.status === "partial_failed" ? resolveAcceptedVisibleContent(send.results) : void 0;
	const receiptDelivery = createChannelDeliveryResultFromReceipt({
		receipt: send.receipt,
		threadId: stringifyThreadId(threadId),
		...replyToId ? { replyToId } : {},
		visibleReplySent: send.status !== "suppressed",
		...content ? { content } : {},
		...send.deliveryIntent ? { deliveryIntent: toDeliveryIntent(send.deliveryIntent) } : {}
	});
	if (send.status === "partial_failed") return {
		status: "failed",
		error: createChannelPartialDeliveryError(send.error, {
			...receiptDelivery,
			visibleReplySent: true
		}),
		sentBeforeError: true
	};
	const delivery = send.status === "suppressed" ? {
		...receiptDelivery,
		suppression: resolveDurableSuppression(send)
	} : receiptDelivery;
	if (send.status === "suppressed") return delivery.visibleReplySent === true ? {
		status: "handled_visible",
		delivery
	} : {
		status: "handled_no_send",
		reason: "no_visible_result",
		delivery
	};
	return {
		status: "handled_visible",
		delivery
	};
}
//#endregion
export { throwIfDurableInboundReplyDeliveryFailed as i, deliverStructuredInboundReplyWithMessageSendContextCore as n, isDurableInboundReplyDeliveryHandled as r, deliverInboundReplyWithMessageSendContextCore as t };
