import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import "./message-channel-constants-Dq-VU_KZ.mjs";
import { n as normalizeMessageChannel } from "./message-channel-core-CQXI3ZKP.mjs";
import "./message-channel-DDiCYM9I.mjs";
import { t as normalizeChatType } from "./chat-type-Dw-QySg9.mjs";
import { c as resolveCommandTurnContext, i as isExplicitCommandTurn, s as resolveCommandBody } from "./command-turn-context-CSgWM9bZ.mjs";
import { p as isProgressCardRefreshInputProvenance } from "./input-provenance-v8gTqxPd.mjs";
import { t as isSyntheticSourceReplyTurn } from "./reply-completion-B5n1Cnxm.mjs";
import { n as classifySilentReplyConversationType, t as resolveSilentReplySettings } from "./silent-reply-BZn2_4aR.mjs";
import { r as isControlCommandMessage } from "./command-detection-BBT2k2J9.mjs";
//#region src/auto-reply/command-turn-detection.ts
/** Fallback command-turn detection for mixed native/text channel metadata. */
function resolveVisibleMessageBody(input) {
	if (typeof input.rawText === "string") return input.rawText;
	return normalizeOptionalString(input.RawBody) ?? normalizeOptionalString(input.Body);
}
function resolveStructuredNormalFallbackBody(input) {
	const visibleBody = resolveVisibleMessageBody(input);
	if (!/^[!/]/.test(visibleBody ?? "")) return;
	return resolveCommandBody(input) ?? visibleBody;
}
function hasCommandSourceMetadata(input) {
	return input.CommandSource === "native" || input.CommandSource === "text" || input.CommandSource === "message";
}
/** Returns true when inbound metadata or command text identifies an explicit command turn. */
function isExplicitCommandTurnContext(input, cfg) {
	if (isExplicitCommandTurn(resolveCommandTurnContext(input))) return true;
	if (input.CommandSource === "native" || input.CommandSource === "text") return false;
	const fallbackBody = input.CommandTurn !== void 0 || hasCommandSourceMetadata(input) ? resolveStructuredNormalFallbackBody(input) : resolveCommandBody(input);
	return input.CommandAuthorized === true && isControlCommandMessage(fallbackBody, cfg, { botUsername: normalizeOptionalString(input.BotUsername) });
}
//#endregion
//#region src/auto-reply/reply/source-reply-delivery-mode.ts
/** Source-reply visibility and suppression policy for auto-reply delivery. */
function toSessionStableDeliveryModeContext(ctx) {
	return {
		ChatType: ctx.ChatType,
		Provider: ctx.Provider,
		Surface: ctx.Surface,
		ExplicitDeliverRoute: ctx.ExplicitDeliverRoute
	};
}
/** Returns true when the turn explicitly invoked a source-visible command. */
function isExplicitSourceReplyCommand(ctx, cfg) {
	return isExplicitCommandTurnContext(ctx, cfg);
}
/** Returns true for text slash commands that lack authorization metadata. */
function isUnauthorizedTextSlashCommand(ctx) {
	const commandTurn = resolveCommandTurnContext(ctx);
	return commandTurn.kind === "text-slash" && !commandTurn.authorized && (commandTurn.commandName !== void 0 || commandTurn.body?.trim().startsWith("/") === true);
}
function isInternalRoomEvent(ctx) {
	return ctx.InboundEventKind === "room_event" && isInternalSourceReplyChannel(ctx);
}
/** Returns true for internal message-channel turns that should remain local. */
function isInternalSourceReplyChannel(ctx) {
	const providerChannel = normalizeMessageChannel(ctx.Provider);
	const surfaceChannel = normalizeMessageChannel(ctx.Surface);
	return (providerChannel ?? surfaceChannel) === "webchat" && (surfaceChannel === "webchat" || !surfaceChannel) && ctx.ExplicitDeliverRoute !== true;
}
/** Resolves whether normal final text should auto-deliver or require the message tool. */
function resolveSourceReplyDeliveryMode(params) {
	if (params.strictMessageToolOnly === true) return "message_tool_only";
	if (params.ctx.InboundEventKind === "room_event" && !isInternalRoomEvent(params.ctx)) return "message_tool_only";
	if (params.requested && (params.requested !== "message_tool_only" || params.messageToolAvailable !== false)) return params.requested;
	if (isExplicitSourceReplyCommand(params.ctx, params.cfg)) return "automatic";
	const chatType = normalizeChatType(params.ctx.ChatType);
	if ((chatType === "group" || chatType === "channel") && isUnauthorizedTextSlashCommand(params.ctx)) return "message_tool_only";
	const mode = (chatType === "group" || chatType === "channel" ? params.cfg.messages?.groupChat?.visibleReplies ?? params.cfg.messages?.visibleReplies : params.cfg.messages?.visibleReplies ?? (isInternalSourceReplyChannel(params.ctx) ? "automatic" : params.defaultVisibleReplies)) === "message_tool" ? "message_tool_only" : "automatic";
	if (mode === "message_tool_only" && params.messageToolAvailable === false) return "automatic";
	return mode;
}
/** Selects reply requiredness at admission, preserving configured ambient group silence. */
function resolveSourceReplyExpectation(params) {
	if (isSyntheticSourceReplyTurn({
		inputProvenance: params.ctx.InputProvenance,
		isHeartbeat: params.isHeartbeat
	})) return "optional";
	if (isExplicitSourceReplyCommand(params.ctx, params.cfg)) return "required";
	if (params.ctx.InboundEventKind === "room_event") return "optional";
	const chatType = normalizeChatType(params.ctx.ChatType);
	if (classifySilentReplyConversationType({
		conversationType: chatType === "group" || chatType === "channel" ? "group" : chatType,
		sessionKey: params.ctx.SessionKey,
		surface: params.ctx.Surface ?? params.ctx.Provider
	}) === "group" && params.ctx.WasMentioned !== true && resolveSilentReplySettings({
		cfg: params.cfg,
		surface: params.ctx.Surface ?? params.ctx.Provider,
		conversationType: "group"
	}).policy === "allow") return "optional";
	return "required";
}
/** Resolves source delivery, hooks, lifecycle, and typing suppression flags. */
function resolveSourceReplyVisibilityPolicy(params) {
	const sourceReplyDeliveryMode = resolveSourceReplyDeliveryMode({
		cfg: params.cfg,
		ctx: params.ctx,
		requested: params.requested,
		strictMessageToolOnly: params.strictMessageToolOnly,
		messageToolAvailable: params.messageToolAvailable,
		defaultVisibleReplies: params.defaultVisibleReplies
	});
	const sessionStableSourceReplyDeliveryMode = !isSyntheticSourceReplyTurn({
		inputProvenance: params.ctx.InputProvenance,
		isHeartbeat: params.isHeartbeat
	}) && (params.requested !== void 0 || isExplicitSourceReplyCommand(params.ctx, params.cfg)) ? sourceReplyDeliveryMode : resolveSourceReplyDeliveryMode({
		cfg: params.cfg,
		ctx: toSessionStableDeliveryModeContext(params.ctx),
		messageToolAvailable: params.sessionStableMessageToolAvailable ?? params.messageToolAvailable,
		defaultVisibleReplies: params.defaultVisibleReplies
	});
	const sendPolicyDenied = params.sendPolicy === "deny";
	const progressRefresh = isProgressCardRefreshInputProvenance(params.ctx.InputProvenance);
	const suppressAutomaticSourceDelivery = progressRefresh || sourceReplyDeliveryMode === "message_tool_only";
	const suppressDelivery = sendPolicyDenied || suppressAutomaticSourceDelivery;
	const deliverySuppressionReason = sendPolicyDenied ? "sendPolicy: deny" : progressRefresh ? "progress card refresh" : suppressAutomaticSourceDelivery ? "sourceReplyDeliveryMode: message_tool_only" : "";
	const suppressTyping = progressRefresh || sendPolicyDenied || params.explicitSuppressTyping === true || params.shouldSuppressTyping === true;
	return {
		sourceReplyDeliveryMode,
		sessionStableSourceReplyDeliveryMode,
		sendPolicyDenied,
		suppressAutomaticSourceDelivery,
		suppressDelivery,
		suppressHookUserDelivery: params.suppressAcpChildUserDelivery === true || suppressDelivery,
		suppressHookReplyLifecycle: suppressTyping || params.suppressAcpChildUserDelivery === true,
		suppressTyping,
		deliverySuppressionReason
	};
}
//#endregion
export { resolveSourceReplyExpectation as a, resolveSourceReplyDeliveryMode as i, isInternalSourceReplyChannel as n, resolveSourceReplyVisibilityPolicy as o, isUnauthorizedTextSlashCommand as r, isExplicitSourceReplyCommand as t };
