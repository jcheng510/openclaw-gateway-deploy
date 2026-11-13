import { c as normalizeOptionalLowercaseString } from "./string-coerce-6kR-86XC.mjs";
//#region src/acp/tool-status.ts
const ACP_TOOL_TERMINAL_OUTCOMES = {
	completed: "completed",
	done: "completed",
	failed: "failed",
	error: "failed",
	cancelled: "cancelled"
};
function resolveAcpToolTerminalOutcome(status) {
	const normalized = normalizeOptionalLowercaseString(status);
	if (!normalized || !Object.hasOwn(ACP_TOOL_TERMINAL_OUTCOMES, normalized)) return;
	return ACP_TOOL_TERMINAL_OUTCOMES[normalized];
}
//#endregion
export { resolveAcpToolTerminalOutcome as t };
