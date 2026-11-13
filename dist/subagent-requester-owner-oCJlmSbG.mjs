import { T as tryResolveLegacyCompatibilityAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import "./legacy.default-agent-owner-C1atgXtB.mjs";
import { n as resolvePersistedSessionStoreOwnerForKey } from "./session-store-owner-CqyGjSj-.mjs";
//#region src/agents/subagent-requester-owner.ts
/** Resolves the durable requester owner for legacy rows that predate requesterAgentId. */
function resolveSubagentRequesterAgentId(cfg, entry) {
	if (entry.requesterAgentId) return entry.requesterAgentId;
	const parsedAgentId = parseAgentSessionKey(entry.requesterSessionKey)?.agentId;
	if (parsedAgentId) return parsedAgentId;
	const persisted = resolvePersistedSessionStoreOwnerForKey(cfg, entry.requesterSessionKey);
	return persisted.kind === "configured" ? persisted.agentId : persisted.kind === "none" ? tryResolveLegacyCompatibilityAgentId(cfg) : void 0;
}
/** Materializes the compatibility owner once so every registry selector sees the same tuple. */
function backfillSubagentRequesterAgentIds(cfg, entries) {
	let changed = 0;
	for (const entry of entries) {
		if (entry.requesterAgentId) continue;
		const requesterAgentId = resolveSubagentRequesterAgentId(cfg, entry);
		if (!requesterAgentId) continue;
		entry.requesterAgentId = requesterAgentId;
		changed += 1;
	}
	return changed;
}
//#endregion
export { resolveSubagentRequesterAgentId as n, backfillSubagentRequesterAgentIds as t };
