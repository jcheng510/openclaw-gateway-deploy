import { c as stripLeadingSilentToken, i as isSilentReplyPayloadText, l as stripSilentToken, n as SILENT_REPLY_TOKEN, o as isSilentReplyText, s as startsWithSilentToken } from "./tokens-BTKQYTUd.mjs";
import { u as stripHeartbeatToken } from "./heartbeat-D29f7BeR.mjs";
import { c as trimTextPreservingCode } from "./text-projection-CNGD_ARQ.mjs";
import { t as stripInternalMetadataForDisplay } from "./display-text-sanitize-Bb1K6rso.mjs";
//#region src/auto-reply/reply/pending-final-delivery-state.ts
const PENDING_FINAL_DELIVERY_CLEAR_PATCH = { pendingFinalDelivery: void 0 };
function classifyHeartbeatPendingFinalDelivery(text, ackMaxChars) {
	const stripped = stripHeartbeatToken(text, {
		mode: "heartbeat",
		maxAckChars: ackMaxChars
	});
	return {
		shouldClear: stripped.shouldSkip,
		replayText: stripped.didStrip && stripped.text ? stripped.text : text
	};
}
/** Sanitizes pending final delivery text before channel-visible output. */
function sanitizePendingFinalDeliveryText(text) {
	let stripped = trimTextPreservingCode(stripInternalMetadataForDisplay(text));
	if (isSilentReplyPayloadText(stripped, "NO_REPLY")) return "";
	if (stripped && !isSilentReplyText(stripped, "NO_REPLY")) {
		const hasLeadingSilentToken = startsWithSilentToken(stripped, SILENT_REPLY_TOKEN);
		if (hasLeadingSilentToken) stripped = stripLeadingSilentToken(stripped, SILENT_REPLY_TOKEN);
		if (hasLeadingSilentToken || stripped.toLowerCase().includes("NO_REPLY".toLowerCase())) stripped = stripSilentToken(stripped, SILENT_REPLY_TOKEN);
	}
	if (!stripped.trim()) return "";
	return isSilentReplyPayloadText(stripped, "NO_REPLY") ? "" : trimTextPreservingCode(stripped);
}
//#endregion
export { classifyHeartbeatPendingFinalDelivery as n, sanitizePendingFinalDeliveryText as r, PENDING_FINAL_DELIVERY_CLEAR_PATCH as t };
