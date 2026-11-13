import { o as loadExecApprovalsReadOnlyAsync } from "./exec-approvals-store-D6OdMNqR.mjs";
//#region src/infra/exec-approvals-mcp.ts
/** Snapshot exact-agent grants at thread/registration preparation, never on tool calls. */
async function loadMcpToolGrants(agentId, options) {
	return agentId === "*" ? [] : (await loadExecApprovalsReadOnlyAsync(options)).agents?.[agentId]?.mcpTools ?? [];
}
//#endregion
export { loadMcpToolGrants as t };
