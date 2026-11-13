import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { i as truncateWithMarker, r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { _ as redactSensitiveText } from "./redact-CYYx6Qjc.mjs";
import { o as isSilentReplyText } from "./tokens-BTKQYTUd.mjs";
import { t as stripInternalMetadataForDisplay } from "./display-text-sanitize-Bb1K6rso.mjs";
//#region src/agents/agent-run-terminal-receipt.ts
const AGENT_RUN_ROUTE_CHANGE_MAX_CHARS = 320;
function normalizeAgentRunTerminalReceipt(value) {
	const receipt = value;
	return receipt && typeof receipt.runId === "string" && typeof receipt.sessionId === "string" && typeof receipt.turnId === "string" && receipt.requested && receipt.effective && Array.isArray(receipt.successfulToolNames) ? receipt : void 0;
}
function formatAgentRunModelRef(value) {
	const route = redactSensitiveText(`${value.provider}/${value.model}`, { mode: "tools" }).replace(/\s+/gu, " ").trim();
	return route ? truncateUtf16Safe(route, 128) : void 0;
}
/** Normalizes the producer-owned route fact before lifecycle or prompt use. */
function normalizeAgentRunRouteChange(value) {
	const normalized = typeof value === "string" ? redactSensitiveText(value, { mode: "tools" }).replace(/\s+/gu, " ").trim() : "";
	return normalized ? truncateUtf16Safe(normalized, AGENT_RUN_ROUTE_CHANGE_MAX_CHARS) : void 0;
}
/** Formats the bounded, secret-free route fact owned by a terminal receipt. */
function formatAgentRunRouteChange(receipt, expectedRunId) {
	if (receipt?.runId !== expectedRunId || !receipt.rerouted || receipt.terminalDisposition !== "visible") return;
	const requested = formatAgentRunModelRef(receipt.requested);
	const effective = formatAgentRunModelRef({
		...receipt.effective,
		model: receipt.effective.responseModel || receipt.effective.model
	});
	return requested && effective ? `Model route changed: ${requested} → ${effective}.` : void 0;
}
//#endregion
//#region src/agents/agent-run-terminal-reply.ts
const AGENT_RUN_TERMINAL_REPLY_MAX_CHARS = 4096;
function isMessageToolNotCalledTerminalReply(reply) {
	return reply?.disposition === "empty" && reply.code === "message-tool-not-called";
}
/** Sanitizes and caps producer-owned text before it enters lifecycle or durable state. */
function sanitizeAgentRunTerminalReplyText(text) {
	return truncateWithMarker(stripInternalMetadataForDisplay(text).trim(), AGENT_RUN_TERMINAL_REPLY_MAX_CHARS, {
		marker: "…",
		reserve: 1,
		trimEnd: true
	});
}
/** Builds the authoritative terminal reply fact while raw assistant text is still available. */
function buildAgentRunTerminalReplySnapshot(params) {
	if (params.terminalReplyKind === "silent-empty" || isSilentReplyText(params.rawText ?? params.visibleText, "NO_REPLY")) return { disposition: "silent" };
	const text = sanitizeAgentRunTerminalReplyText(params.visibleText ?? "");
	return text ? {
		disposition: "visible",
		text
	} : { disposition: "empty" };
}
/** Normalizes lifecycle/RPC evidence without allowing raw or unbounded text through. */
function normalizeAgentRunTerminalReplySnapshot(value) {
	if (!isRecord(value)) return;
	const disposition = value.disposition;
	if (disposition === "silent") return { disposition };
	if (disposition === "empty") {
		if (value.code === "message-tool-not-called") return {
			disposition,
			code: "message-tool-not-called"
		};
		return { disposition };
	}
	if (disposition !== "visible") return;
	const rawText = value.text;
	if (typeof rawText !== "string") return;
	const text = sanitizeAgentRunTerminalReplyText(rawText);
	const modelRouteChange = normalizeAgentRunRouteChange(value.modelRouteChange);
	return text ? {
		disposition: "visible",
		text,
		...modelRouteChange ? { modelRouteChange } : {}
	} : { disposition: "empty" };
}
/** Reply evidence merges independently from sticky timeout/cancellation precedence. */
function mergeAgentRunTerminalReplySnapshot(existing, incoming) {
	if (!incoming || isMessageToolNotCalledTerminalReply(existing)) return existing;
	if (!existing || isMessageToolNotCalledTerminalReply(incoming) || existing.disposition === "empty") return incoming;
	return incoming.disposition === "empty" ? existing : incoming;
}
//#endregion
export { formatAgentRunRouteChange as a, sanitizeAgentRunTerminalReplyText as i, mergeAgentRunTerminalReplySnapshot as n, normalizeAgentRunRouteChange as o, normalizeAgentRunTerminalReplySnapshot as r, normalizeAgentRunTerminalReceipt as s, buildAgentRunTerminalReplySnapshot as t };
