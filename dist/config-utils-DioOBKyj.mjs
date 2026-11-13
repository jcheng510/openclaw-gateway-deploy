import { i as resolveRequiredHomeDir, o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import { i as resolveStateDirFromHome } from "./state-dir-CfAW6S2K.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { s as tryResolveLegacyDataOwner } from "./agent-roster-B45JERT5.mjs";
import { t as resolveDefaultAgentWorkspaceDir$1 } from "./workspace-default-path-BG9KN4ds.mjs";
import "./root-memory-files-BUq0D-EI.mjs";
import path from "node:path";
//#region packages/memory-host-sdk/src/host/openclaw-runtime-paths.ts
/** Keep effective-home expansion at the memory-host boundary, before state selection. */
function resolveStateDir(env = process.env) {
	const override = env.OPENCLAW_STATE_DIR?.trim();
	if (override) return resolveUserPath(override, env);
	const home = resolveRequiredHomeDir(env);
	return resolveStateDirFromHome(env, () => home);
}
/** Preserve memory-host override expansion without re-expanding an effective home. */
function resolveDefaultAgentWorkspaceDir(env) {
	const workspaceDir = env.OPENCLAW_WORKSPACE_DIR?.trim();
	if (workspaceDir) return resolveUserPath(workspaceDir, env);
	if (env.OPENCLAW_STATE_DIR?.trim()) return path.join(resolveStateDir(env), "workspace");
	return resolveDefaultAgentWorkspaceDir$1(env);
}
//#endregion
//#region packages/memory-host-sdk/src/host/config-utils.ts
/** Trim and deduplicate configured extra-memory roots without losing pattern identity. */
function normalizeConfiguredMemoryExtraPaths(extraPaths) {
	const normalized = /* @__PURE__ */ new Map();
	for (const entry of extraPaths ?? []) {
		const configuredPath = (typeof entry === "string" ? entry : entry.path).trim();
		const pattern = typeof entry === "string" ? "" : entry.pattern?.trim() || "";
		if (configuredPath) normalized.set(`${configuredPath}\0${pattern}`, pattern ? {
			path: configuredPath,
			pattern
		} : configuredPath);
	}
	return Array.from(normalized.values());
}
function resolveRememberAcrossConversations(cfg, agentId) {
	const defaults = cfg.memory?.search;
	const explicit = (resolveAgentConfig(cfg, agentId)?.memory?.search)?.rememberAcrossConversations ?? defaults?.rememberAcrossConversations;
	if (explicit !== void 0) return explicit;
	return (cfg.session?.dmScope === void 0 || cfg.session.dmScope === "main") && !cfg.bindings?.some((binding) => {
		if (!binding || typeof binding !== "object") return false;
		const session = binding.session;
		return Boolean(session) && typeof session === "object" && session.dmScope !== void 0;
	});
}
/** Root memory filename used in agent workspaces. */
const MEMORY_HOST_ROOT_FILENAME = "MEMORY.md";
const DEFAULT_AGENT_ID = "main";
/** Return configured agent entries after dropping nullish placeholders. */
function listAgentEntries(cfg) {
	if (cfg.agents?.entries) return Object.entries(cfg.agents.entries).map(([id, entry]) => Object.assign({ id }, entry));
	return Array.isArray(cfg.agents?.list) ? cfg.agents.list.filter((entry) => Boolean(entry)) : [];
}
/** Resolve the default agent id from explicit default marker or first agent entry. */
function resolveDefaultAgentId(cfg) {
	const agents = listAgentEntries(cfg);
	if (agents.length === 0) return DEFAULT_AGENT_ID;
	const chosen = (agents.find((agent) => agent.default) ?? agents[0])?.id;
	return normalizeAgentId(chosen || DEFAULT_AGENT_ID);
}
/** Find one agent config by canonical id. */
function resolveAgentConfig(cfg, agentId) {
	const id = normalizeAgentId(agentId);
	return listAgentEntries(cfg).find((entry) => normalizeAgentId(entry.id) === id);
}
/** Remove null bytes before paths are handed to filesystem APIs. */
function stripNullBytes(value) {
	return value.replaceAll("\0", "");
}
/** Resolve the workspace directory for an agent id and config defaults. */
function resolveMemoryHostAgentWorkspaceDir(cfg, agentId, env = process.env) {
	const id = normalizeAgentId(agentId);
	const configured = resolveAgentConfig(cfg, id)?.workspace?.trim();
	if (configured) return stripNullBytes(resolveUserPath(configured, env));
	const fallback = cfg.agents?.defaults?.workspace?.trim();
	if (id === (cfg.agents?.ownership === "explicit" ? tryResolveLegacyDataOwner(cfg) : resolveDefaultAgentId(cfg))) return stripNullBytes(fallback ? resolveUserPath(fallback, env) : resolveDefaultAgentWorkspaceDir(env));
	if (fallback) return stripNullBytes(path.join(resolveUserPath(fallback, env), id));
	return stripNullBytes(path.join(resolveStateDir(env), `workspace-${id}`));
}
/** Resolve context limits for an agent with defaults fallback. */
function resolveMemoryHostAgentContextLimits(cfg, agentId) {
	const defaults = cfg?.agents?.defaults?.contextLimits;
	if (!cfg || !agentId) return defaults;
	return resolveAgentConfig(cfg, agentId)?.contextLimits ?? defaults;
}
/** Resolve enabled memory search config plus deduplicated extra paths for an agent. */
function resolveMemoryHostSearchPathConfig(cfg, agentId) {
	const defaults = cfg.memory?.search;
	const overrides = resolveAgentConfig(cfg, agentId)?.memory?.search;
	const enabled = overrides?.enabled ?? defaults?.enabled ?? true;
	if (!enabled) return null;
	const extraPaths = normalizeConfiguredMemoryExtraPaths([...defaults?.extraPaths ?? [], ...overrides?.extraPaths ?? []]);
	return {
		enabled,
		rememberAcrossConversations: resolveRememberAcrossConversations(cfg, agentId),
		extraPaths
	};
}
//#endregion
export { resolveMemoryHostSearchPathConfig as a, resolveMemoryHostAgentWorkspaceDir as i, normalizeConfiguredMemoryExtraPaths as n, resolveRememberAcrossConversations as o, resolveMemoryHostAgentContextLimits as r, MEMORY_HOST_ROOT_FILENAME as t };
