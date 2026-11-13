import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { g as resolveDefaultAgentId, t as AgentSelectionRequiredError } from "./agent-scope-config-Dm6T00l4.mjs";
import { A as parseAgentSessionKey, g as toAgentRequestSessionKey } from "./session-key-BC4m_Ly5.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { l as getAgentRunContext } from "./agent-run-registry-BDW3IRlF.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./io-B18HRL9J.mjs";
import { r as resolveSessionStoreIdentity } from "./session-store-key-__CfQfd2.mjs";
import { t as resolvePreferredSessionKeyForSessionIdMatches } from "./session-id-resolution-BFn3udT1.mjs";
//#region src/gateway/server-session-key.ts
function sessionKeyMatchesAgent(sessionKey, agentId, cfg) {
	if (cfg.session?.scope === "global" && sessionKey.trim().toLowerCase() === "global") return true;
	const normalizedAgentId = normalizeAgentId(agentId);
	if (!parseAgentSessionKey(sessionKey) && sessionKey.trim().toLowerCase().startsWith("agent:")) return false;
	try {
		return resolveSessionStoreIdentity({
			cfg,
			sessionKey,
			agentId
		}).agentId === normalizedAgentId;
	} catch (error) {
		if (error instanceof AgentSelectionRequiredError) return false;
		throw error;
	}
}
function resolveRunSessionKeyForCaller(storeKey) {
	return toAgentRequestSessionKey(storeKey) ?? storeKey;
}
/** Resolves live runs or the resident current-session ID index without storage reads. */
function resolveSessionKeyForRun(runId, opts = {}) {
	const context = getAgentRunContext(runId);
	if (context && !context.sessionKey) return;
	const explicitAgentId = opts.agentId?.trim() ? normalizeAgentId(opts.agentId) : void 0;
	const cached = context?.sessionKey;
	if (!explicitAgentId && cached) return cached;
	const cfg = getRuntimeConfig();
	const requestedAgentId = explicitAgentId ?? normalizeAgentId(resolveDefaultAgentId(cfg));
	if (cached && sessionKeyMatchesAgent(cached, requestedAgentId, cfg)) return resolveRunSessionKeyForCaller(cached);
	const matches = [];
	for (const row of opts.projection?.findBySessionId({
		sessionId: runId,
		agentId: requestedAgentId,
		federated: true
	}) ?? []) {
		const entry = row.sharingEntry ?? row.entry;
		if (entry?.sessionId === runId && sessionKeyMatchesAgent(row.key, requestedAgentId, cfg)) matches.push([row.key, entry]);
	}
	const storeKey = resolvePreferredSessionKeyForSessionIdMatches(matches, runId);
	return storeKey ? resolveRunSessionKeyForCaller(storeKey) : void 0;
}
//#endregion
export { resolveSessionKeyForRun as t };
