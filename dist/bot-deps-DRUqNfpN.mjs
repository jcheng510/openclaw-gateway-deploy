import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import { i as enqueueRoutedSystemEvent } from "./system-events-BJCXS4dW.mjs";
import { n as deliverStructuredInboundReplyWithMessageSendContext } from "./channel-outbound-CCQE5Z22.mjs";
import { s as resolveInboundLastRouteSessionKey } from "./resolve-route-210zK8ng.mjs";
import { n as loadWebMedia } from "./web-media-D9Tmjk8m.mjs";
import "./routing-BjYztQ6O.mjs";
import { t as buildChannelInboundEventContext } from "./context-JJ6udMBj.mjs";
import { t as recordInboundSession } from "./session-DtiLRiR0.mjs";
import { n as recordChannelActivity } from "./channel-activity-KGHrbxIK.mjs";
import { d as upsertChannelPairingRequest, s as readChannelAllowFromStore } from "./pairing-store-Bvqa0taN.mjs";
import { i as resolvePinnedMainDmOwnerFromAllowlist } from "./dm-policy-shared-BV1FjVP9.mjs";
import { n as resolveApprovalOverGateway } from "./approval-gateway-resolver-BQM1Yc2a.mjs";
import "./approval-gateway-runtime-DO-d-JW4.mjs";
import { n as resolveAmbientTranscriptWatermarkKey } from "./ambient-transcript-watermark-mOcSr6Jz.mjs";
import { h as resolveStorePath, i as getSessionEntry, l as readAmbientTranscriptWatermark, u as readSessionUpdatedAt } from "./session-store-runtime-DWxMQz8C.mjs";
import { t as dispatchReplyWithBufferedBlockDispatcher } from "./reply-dispatch-runtime-b16SsZ4D.mjs";
import { t as createChannelReplyPipeline } from "./reply-pipeline-DeDXmgbU.mjs";
import "./channel-inbound-B070Jrcu.mjs";
import "./web-media-BtV6PUpM.mjs";
import "./system-event-runtime-B4f3OuwT.mjs";
import "./runtime-config-snapshot-DPPwvFCZ.mjs";
import "./conversation-runtime-BTiRmJeW.mjs";
import "./security-runtime-DxwQ9WKi.mjs";
import { t as listSkillCommandsForAgents } from "./chat-commands-DBAiju2K.mjs";
import { a as buildPreparedModelsProviderData } from "./commands-models-C4V2PXbS.mjs";
import "./models-provider-runtime-BuwjoLi4.mjs";
import "./skill-commands-runtime-C2z1H4Wg.mjs";
import { J as wasSentByBot, Q as recordOutboundMessageForPromptContext, w as editMessageTelegram } from "./send-CPt-k6Q3.mjs";
import { r as syncTelegramMenuCommands } from "./bot-native-command-menu-DTJCMHXS.mjs";
import { a as emitTelegramMessageSentHooks, n as deliverStructuredReplies, t as deliverReplies } from "./delivery-DbGTwwaO.mjs";
import { t as createTelegramDraftStream } from "./draft-stream-CvEDeVXo.mjs";
//#region extensions/telegram/src/bot-deps.ts
const defaultTelegramBotDeps = {
	get getRuntimeConfig() {
		return getRuntimeConfig;
	},
	get resolveStorePath() {
		return resolveStorePath;
	},
	get getSessionEntry() {
		return getSessionEntry;
	},
	get readChannelAllowFromStore() {
		return readChannelAllowFromStore;
	},
	get readSessionUpdatedAt() {
		return readSessionUpdatedAt;
	},
	get readAmbientTranscriptWatermark() {
		return readAmbientTranscriptWatermark;
	},
	get resolveAmbientTranscriptWatermarkKey() {
		return resolveAmbientTranscriptWatermarkKey;
	},
	get recordInboundSession() {
		return recordInboundSession;
	},
	get recordChannelActivity() {
		return recordChannelActivity;
	},
	get resolveInboundLastRouteSessionKey() {
		return resolveInboundLastRouteSessionKey;
	},
	get resolvePinnedMainDmOwnerFromAllowlist() {
		return resolvePinnedMainDmOwnerFromAllowlist;
	},
	get buildChannelInboundEventContext() {
		return buildChannelInboundEventContext;
	},
	get upsertChannelPairingRequest() {
		return upsertChannelPairingRequest;
	},
	get enqueueRoutedSystemEvent() {
		return enqueueRoutedSystemEvent;
	},
	get dispatchReplyWithBufferedBlockDispatcher() {
		return dispatchReplyWithBufferedBlockDispatcher;
	},
	get loadWebMedia() {
		return loadWebMedia;
	},
	get buildModelsProviderData() {
		return buildPreparedModelsProviderData;
	},
	get listSkillCommandsForAgents() {
		return listSkillCommandsForAgents;
	},
	get syncTelegramMenuCommands() {
		return syncTelegramMenuCommands;
	},
	get wasSentByBot() {
		return wasSentByBot;
	},
	get resolveApproval() {
		return resolveApprovalOverGateway;
	},
	get createTelegramDraftStream() {
		return createTelegramDraftStream;
	},
	get deliverReplies() {
		return deliverReplies;
	},
	get deliverStructuredReplies() {
		return deliverStructuredReplies;
	},
	get deliverStructuredInboundReplyWithMessageSendContext() {
		return deliverStructuredInboundReplyWithMessageSendContext;
	},
	get emitTelegramMessageSentHooks() {
		return emitTelegramMessageSentHooks;
	},
	get editMessageTelegram() {
		return editMessageTelegram;
	},
	get recordOutboundMessageForPromptContext() {
		return recordOutboundMessageForPromptContext;
	},
	get createChannelMessageReplyPipeline() {
		return createChannelReplyPipeline;
	}
};
//#endregion
export { defaultTelegramBotDeps as t };
