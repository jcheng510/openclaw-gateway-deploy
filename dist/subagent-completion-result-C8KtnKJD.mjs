import { n as SILENT_REPLY_TOKEN, o as isSilentReplyText, t as HEARTBEAT_TOKEN } from "./tokens-BTKQYTUd.mjs";
//#region src/agents/tools/sessions-send-tokens.ts
/** Suppresses a subagent completion announcement. */
const ANNOUNCE_SKIP_TOKEN = "ANNOUNCE_SKIP";
const NON_DELIVERABLE_REPLY_TOKENS = [SILENT_REPLY_TOKEN, HEARTBEAT_TOKEN];
function isAnnounceSkip(text) {
	return (text ?? "").trim() === ANNOUNCE_SKIP_TOKEN;
}
function isNonDeliverableSessionsReply(text) {
	return NON_DELIVERABLE_REPLY_TOKENS.some((token) => isSilentReplyText(text, token));
}
/** Selects a deliverable reply while allowing NO_REPLY to use captured fallback output. */
function selectDeliverableSessionsReply(primary, fallback) {
	const primaryReply = primary?.trim();
	if (primaryReply && !isNonDeliverableSessionsReply(primaryReply)) return primaryReply;
	if (primaryReply && !isSilentReplyText(primaryReply, "NO_REPLY")) return;
	const fallbackReply = fallback?.trim();
	return fallbackReply && !isNonDeliverableSessionsReply(fallbackReply) ? fallbackReply : void 0;
}
//#endregion
//#region src/agents/subagents/completion/subagent-completion-result.ts
/** Selects the canonical operator-visible result from captured completion state. */
function resolveSubagentCompletionResultText(entry) {
	const terminalReply = entry.completion?.terminalReply;
	if (terminalReply) return terminalReply.disposition === "visible" ? terminalReply.text : void 0;
	const primary = entry.completion?.resultText;
	const fallback = entry.completion?.fallbackResultText;
	if (entry.execution.outcome?.status === "ok") return selectDeliverableSessionsReply(primary, fallback);
	return primary?.trim() || fallback?.trim() || void 0;
}
//#endregion
export { selectDeliverableSessionsReply as i, isAnnounceSkip as n, isNonDeliverableSessionsReply as r, resolveSubagentCompletionResultText as t };
