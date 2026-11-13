import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { d as resolveAgentWorkspaceDir, x as toAgentEntriesRecord } from "./agent-scope-config-Dm6T00l4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { n as listAgentEntries } from "./agent-roster-B45JERT5.mjs";
//#region src/config/agent-workspace-roster-transition.ts
function pinSurvivorWorkspaceForRosterCollapse(sourceConfig, targetConfig, env = process.env) {
	const sourceEntries = listAgentEntries(sourceConfig);
	const targetEntries = listAgentEntries(targetConfig);
	if (sourceEntries.length <= 1 || targetEntries.length !== 1) return {
		config: targetConfig,
		insertedPaths: []
	};
	const survivorId = normalizeAgentId(targetEntries[0].id);
	if (!sourceEntries.some((entry) => normalizeAgentId(entry.id) === survivorId)) return {
		config: targetConfig,
		insertedPaths: []
	};
	const targetAgents = targetConfig.agents ?? {};
	const entries = targetAgents.entries ? { ...targetAgents.entries } : toAgentEntriesRecord(targetEntries);
	const entryKey = Object.keys(entries).find((candidate) => normalizeAgentId(candidate) === survivorId);
	const entry = entryKey ? entries[entryKey] : void 0;
	const workspaceNeedsPin = entry !== void 0 && (!Object.hasOwn(entry, "workspace") || typeof entry.workspace === "string" && entry.workspace.trim().length === 0);
	if (!entryKey || !entry || !workspaceNeedsPin) return {
		config: targetConfig,
		insertedPaths: []
	};
	entries[entryKey] = {
		...entry,
		workspace: resolveAgentWorkspaceDir(sourceConfig, survivorId, env)
	};
	const { list: _legacyList, ...canonicalAgents } = targetAgents;
	return {
		config: {
			...targetConfig,
			agents: {
				...canonicalAgents,
				entries
			}
		},
		insertedPaths: [[
			"agents",
			"entries",
			entryKey,
			"workspace"
		]]
	};
}
//#endregion
export { pinSurvivorWorkspaceForRosterCollapse as t };
