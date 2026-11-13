import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { o as redactSensitiveUrlLikeString } from "./redact-sensitive-url-BZmo2ydO.mjs";
import { b as redactToolPayloadText } from "./redact-CYYx6Qjc.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { ErrorCode } from "@modelcontextprotocol/sdk/types.js";
//#region src/agents/mcp-error.ts
const STREAMABLE_RESPONSE_BODY_MARKER = "Error POSTing to endpoint:";
const LEGACY_RESPONSE_BODY_RE = /Error POSTing to endpoint \(HTTP \d+\):/;
/** MCP lifecycle errors use the protocol code, including serialized SDK errors. */
function isMcpRequestTimeoutError(error) {
	return isRecord(error) && error.code === ErrorCode.RequestTimeout;
}
/** Redacts MCP diagnostics, including response bodies the SDK includes in thrown errors. */
function redactMcpDiagnosticError(error) {
	let message = formatErrorMessage(error);
	const streamableIndex = message.indexOf(STREAMABLE_RESPONSE_BODY_MARKER);
	const legacyMatch = LEGACY_RESPONSE_BODY_RE.exec(message);
	const prefixEnd = streamableIndex >= 0 ? streamableIndex + 26 : legacyMatch ? legacyMatch.index + legacyMatch[0].length : void 0;
	if (prefixEnd !== void 0) message = `${message.slice(0, prefixEnd)} [redacted response body]`;
	return redactToolPayloadText(redactSensitiveUrlLikeString(message));
}
//#endregion
export { redactMcpDiagnosticError as n, isMcpRequestTimeoutError as t };
