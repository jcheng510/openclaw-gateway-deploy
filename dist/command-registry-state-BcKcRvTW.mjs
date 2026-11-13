import { y as requireActivePluginRegistry } from "./runtime-BnZb2P5v.mjs";
import { t as listRegisteredPluginCommands } from "./plugin-command-registry-C-x5yEAn.mjs";
//#region src/plugins/agent-prompt-surface-kind.ts
/** Normalizes legacy prompt surface names to current OpenClaw surface names. */
function normalizeAgentPromptSurfaceKind(surface) {
	return surface === "pi_main" ? "openclaw_main" : surface;
}
/** True when a prompt surface targets the main OpenClaw prompt. */
function isOpenClawMainPromptSurface(surface) {
	return normalizeAgentPromptSurfaceKind(surface) === "openclaw_main";
}
//#endregion
//#region src/plugins/command-registry-state.ts
function clearPluginCommands() {
	requireActivePluginRegistry().commands.length = 0;
}
function isTrustedReservedCommandOwner(command) {
	return command.ownership === "reserved";
}
function canExposeSenderIsOwner(command) {
	return Array.isArray(command.requiredScopes) && command.requiredScopes.length > 0 || command.trustedOwnerStatusExposure === true;
}
function listRegisteredPluginAgentPromptGuidance(params) {
	const lines = /* @__PURE__ */ new Set();
	const commands = listRegisteredPluginCommands(requireActivePluginRegistry()).toSorted((left, right) => {
		if (left.pluginId !== right.pluginId) return left.pluginId < right.pluginId ? -1 : 1;
		return left.name < right.name ? -1 : left.name > right.name ? 1 : 0;
	});
	for (const command of commands) for (const entry of command.agentPromptGuidance ?? []) {
		const trimmed = resolveAgentPromptGuidanceTextForSurface(entry, {
			surface: params?.surface ? normalizeAgentPromptSurfaceKind(params.surface) : void 0,
			includeLegacyGlobalGuidance: params?.includeLegacyGlobalGuidance ?? true
		});
		if (trimmed) lines.add(trimmed);
	}
	return [...lines];
}
function resolveAgentPromptGuidanceTextForSurface(entry, params) {
	if (typeof entry === "string") return params.includeLegacyGlobalGuidance ? entry.trim() : void 0;
	const text = entry.text.trim();
	if (!params.surface) return text;
	if (!entry.surfaces || entry.surfaces.length === 0) return params.includeLegacyGlobalGuidance ? text : void 0;
	return entry.surfaces.includes(params.surface) ? text : void 0;
}
//#endregion
export { isOpenClawMainPromptSurface as a, listRegisteredPluginAgentPromptGuidance as i, clearPluginCommands as n, normalizeAgentPromptSurfaceKind as o, isTrustedReservedCommandOwner as r, canExposeSenderIsOwner as t };
