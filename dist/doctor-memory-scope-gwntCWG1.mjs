import { a as resolveAgentDir, d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
//#region src/commands/doctor-memory-scope.ts
function resolveMemoryDoctorAgentScopes(cfg) {
	return listAgentIds(cfg).map((agentId) => ({
		agentId,
		agentDir: resolveAgentDir(cfg, agentId),
		workspaceDir: resolveAgentWorkspaceDir(cfg, agentId)
	}));
}
function formatMemoryDoctorAgentMessage(agentId, labelAgent, message) {
	return `${labelAgent ? `Agent "${agentId}": ` : ""}${message}`;
}
//#endregion
export { resolveMemoryDoctorAgentScopes as n, formatMemoryDoctorAgentMessage as t };
