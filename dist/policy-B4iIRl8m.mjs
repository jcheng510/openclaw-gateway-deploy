import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { n as AcpRuntimeError } from "./errors-DgzXBC-n.mjs";
import "./errors-DIxVOoMM.mjs";
//#region src/acp/policy.ts
/** Policy gates for ACP availability, dispatch, and allowed agent ids. */
const ACP_DISABLED_MESSAGE = "ACP is disabled by policy (`acp.enabled=false`).";
const ACP_DISPATCH_DISABLED_MESSAGE = "ACP dispatch is disabled by policy (`acp.dispatch.enabled=false`).";
/** Returns whether ACP is globally enabled by config policy. */
function isAcpEnabledByPolicy(cfg) {
	return cfg.acp?.enabled !== false;
}
/** Returns the operator-facing dispatch block message, if any. */
function resolveAcpDispatchPolicyMessage(cfg) {
	if (!isAcpEnabledByPolicy(cfg)) return ACP_DISABLED_MESSAGE;
	return cfg.acp?.dispatch?.enabled === false ? ACP_DISPATCH_DISABLED_MESSAGE : null;
}
/** Returns the runtime error for dispatch-blocked ACP routing, if blocked. */
function resolveAcpDispatchPolicyError(cfg) {
	const message = resolveAcpDispatchPolicyMessage(cfg);
	if (!message) return null;
	return new AcpRuntimeError("ACP_DISPATCH_DISABLED", message);
}
/** Returns the runtime error for explicit ACP turns when ACP itself is disabled. */
function resolveAcpExplicitTurnPolicyError(cfg) {
	if (isAcpEnabledByPolicy(cfg)) return null;
	return new AcpRuntimeError("ACP_DISPATCH_DISABLED", ACP_DISABLED_MESSAGE);
}
/** Returns whether an agent id passes the optional ACP allowed-agent list. */
function isAcpAgentAllowedByPolicy(cfg, agentId) {
	const allowed = (cfg.acp?.allowedAgents ?? []).map((entry) => normalizeAgentId(entry)).filter(Boolean);
	if (allowed.length === 0) return true;
	return allowed.includes(normalizeAgentId(agentId));
}
/** Returns the runtime error for agent-policy rejection, if rejected. */
function resolveAcpAgentPolicyError(cfg, agentId) {
	if (isAcpAgentAllowedByPolicy(cfg, agentId)) return null;
	return new AcpRuntimeError("ACP_SESSION_INIT_FAILED", `ACP agent "${normalizeAgentId(agentId)}" is not allowed by policy.`);
}
//#endregion
export { resolveAcpExplicitTurnPolicyError as a, resolveAcpDispatchPolicyMessage as i, resolveAcpAgentPolicyError as n, resolveAcpDispatchPolicyError as r, isAcpEnabledByPolicy as t };
