import { t as normalizeAnyChannelId } from "./registry-normalize-BnQO61Jh.mjs";
import { i as getLoadedChannelPluginForRead } from "./registry-loaded-B4Apio9u.mjs";
import { i as enqueueSystemEvent } from "./system-events-DzT7qucG.mjs";
import { t as buildOutboundSessionContext } from "./session-context-Bw5OIGO_.mjs";
import { n as sendDurableMessageBatchCore, t as durableMessageBatchMayHaveReachedRecipient } from "./send-DuNsLhHj.mjs";
import "./runtime-E5CEMZS3.mjs";
import { r as createChannelReplyTransform } from "./reply-transform-DgXLo0px.mjs";
import { n as resolveAgentOutboundIdentity } from "./identity-QLTcMk8S.mjs";
import { t as createOutboundSendDepsFromCliSource } from "./outbound-send-mapping-B9jR7tfu.mjs";
//#region src/cron/isolated-agent/delivery-outbound.runtime.ts
function resolveCronChannelReplyTransform(params) {
	const channelId = normalizeAnyChannelId(params.channel) ?? params.channel;
	const messaging = getLoadedChannelPluginForRead(channelId)?.messaging;
	const transform = createChannelReplyTransform({
		...params,
		messaging
	});
	return transform ? { apply: transform } : void 0;
}
//#endregion
export { buildOutboundSessionContext, createOutboundSendDepsFromCliSource as createOutboundSendDeps, durableMessageBatchMayHaveReachedRecipient, enqueueSystemEvent, resolveAgentOutboundIdentity, resolveCronChannelReplyTransform, sendDurableMessageBatchCore };
