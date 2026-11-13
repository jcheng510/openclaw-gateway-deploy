import { d as resolveAgentWorkspaceDir, l as resolveAgentOperationAgentId, m as resolveConfiguredAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
//#region src/commands/channel-setup/owner.ts
/** Validate the selected operation owner before using its workspace for discovery. */
function resolveChannelSetupOwner(cfg, requestedAgentId) {
	const requested = requestedAgentId?.trim();
	if (requestedAgentId !== void 0 && !requested) throw new Error("--agent must not be blank");
	const agentId = resolveConfiguredAgentId(cfg, requested ?? resolveAgentOperationAgentId(cfg, void 0, {
		surface: "channel plugin discovery",
		hint: "Pass --agent <id> to channels commands or set agents.defaults.systemAgent.agentId."
	}));
	return {
		agentId,
		workspaceDir: resolveAgentWorkspaceDir(cfg, agentId)
	};
}
//#endregion
export { resolveChannelSetupOwner as t };
