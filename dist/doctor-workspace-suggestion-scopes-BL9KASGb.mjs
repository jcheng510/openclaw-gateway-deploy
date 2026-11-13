import { d as resolveAgentWorkspaceDir, g as resolveDefaultAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
//#region src/flows/doctor-workspace-suggestion-scopes.ts
/** Resolves every configured agent workspace while preserving invalid empty-roster failures. */
function resolveDoctorWorkspaceSuggestionScopes(cfg) {
	const listedAgentIds = listAgentIds(cfg);
	const agentIds = listedAgentIds.length > 0 ? listedAgentIds : [resolveDefaultAgentId(cfg)];
	const labelAgent = agentIds.length > 1;
	return agentIds.map((agentId) => ({
		agentId,
		workspaceDir: resolveAgentWorkspaceDir(cfg, agentId),
		labelAgent
	}));
}
//#endregion
export { resolveDoctorWorkspaceSuggestionScopes as t };
