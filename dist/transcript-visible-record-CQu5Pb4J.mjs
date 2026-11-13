import { a as asOptionalRecord, c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import "./internal-runtime-context-CLIwiurx.mjs";
import { c as resolveTerminalAssistantTranscriptRunId, o as readSessionTranscriptRunId } from "./transcript-events-kaZ2Mm4l.mjs";
import { o as isSilentReplyText } from "./tokens-BTKQYTUd.mjs";
import { a as isOpenClawDeliveryMirrorAssistantMessage } from "./transcript-only-openclaw-assistant-CVgy4bjA.mjs";
import { t as extractStoredAssistantText } from "./chat-history-text-DKSl3rkY.mjs";
//#region src/sessions/transcript-visible-record.ts
function isVisibleTranscriptRecord(value) {
	const record = asOptionalRecord(value);
	return Boolean(record?.message) || record?.type === "compaction" || record?.type === "reset" || record?.type === "custom_message" && record.display === true && record.customType !== "openclaw.runtime-context";
}
function isVisibleAssistantResultEventForRun(event, runId) {
	if (!isRecord(event) || !isRecord(event.message) || readSessionTranscriptRunId(event.message) !== runId || resolveTerminalAssistantTranscriptRunId(event.message, runId) === void 0) return false;
	const mirror = event.message.openclawDeliveryMirror;
	if (isRecord(mirror) && mirror.kind === "message-tool-source-reply" && mirror.final !== true) return false;
	const text = extractStoredAssistantText(event.message);
	return Boolean(text?.trim()) && !isSilentReplyText(text, "NO_REPLY");
}
/** Match content before checking any active-branch identity in the same snapshot. */
function matchesTranscriptEvent(event, match) {
	if (match.kind === "latest") return true;
	if (match.kind === "visible-final") return isVisibleAssistantResultEventForRun(event, match.runId);
	const message = asOptionalRecord(asOptionalRecord(event)?.message);
	if (match.kind === "idempotency") return message?.idempotencyKey === match.key && (!match.assistant || message.role === "assistant") && (match.runId === void 0 || readSessionTranscriptRunId(message) === match.runId) && (!match.deliveryMirror || isOpenClawDeliveryMirrorAssistantMessage(message));
	return message?.role === "assistant" && readSessionTranscriptRunId(message) === match.runId;
}
//#endregion
export { isVisibleTranscriptRecord as n, matchesTranscriptEvent as r, isVisibleAssistantResultEventForRun as t };
