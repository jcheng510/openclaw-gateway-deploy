import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { l as normalizePluginsConfig } from "./config-state-D-KaEbbt.mjs";
import { i as getCurrentPluginMetadataSnapshot } from "./current-plugin-metadata-snapshot-CdI4MWI9.mjs";
import { i as isPluginMetadataSnapshotCompatible } from "./plugin-metadata-snapshot-Ctf1TsvW.mjs";
import { n as isManifestPluginAvailableForControlPlane } from "./manifest-contract-eligibility-BmLsQ18-.mjs";
import { a as sanitizeServerName } from "./agent-bundle-mcp-names-D6NILiBV.mjs";
import { n as matchesAnyGlobPattern, t as compileGlobPatterns } from "./glob-pattern-DrwZe41_.mjs";
import { l as normalizeToolPolicyName } from "./tool-policy-shared-DSNSYBF4.mjs";
import { t as createMcpServerToolDenyMatcher } from "./tool-policy-match-COwlx5YS.mjs";
import "./tool-policy-C57wduz9.mjs";
import { r as normalizeConfiguredMcpServers } from "./mcp-config-normalize-ClbRP1WZ.mjs";
import { t as hasManifestToolAvailability } from "./manifest-tool-availability-CWNDUk77.mjs";
//#region src/agents/tool-policy-declared-context.ts
function denylistBlocksName(name, denylist) {
	const normalized = normalizeToolPolicyName(name);
	return normalized ? matchesAnyGlobPattern(normalized, denylist) : false;
}
function denylistBlocksPlugin(params) {
	return denylistBlocksName(params.pluginId, params.denylist) || matchesAnyGlobPattern("group:plugins", params.denylist);
}
function collectConfiguredMcpServerNames(params) {
	const servers = normalizeConfiguredMcpServers(params.config?.mcp?.servers);
	const isDenied = createMcpServerToolDenyMatcher(params.toolDenylist);
	const usedServerNames = /* @__PURE__ */ new Set();
	const names = [];
	for (const [name, value] of Object.entries(servers)) {
		if (!isRecord(value) || value.enabled === false || !name.trim()) continue;
		const safeServerName = sanitizeServerName(name, usedServerNames);
		if (isDenied(safeServerName)) continue;
		names.push(safeServerName);
	}
	return names;
}
function collectAvailableManifestToolNames(params) {
	return (params.plugin.contracts?.tools ?? []).filter((toolName) => !denylistBlocksName(toolName, params.denylist)).filter((toolName) => hasManifestToolAvailability({
		plugin: params.plugin,
		toolNames: [toolName],
		config: params.config,
		env: params.env
	})).map(normalizeToolPolicyName).filter(Boolean);
}
function collectDeclaredPluginContext(params) {
	if (params.config?.plugins?.enabled === false) return {};
	const env = params.env ?? process.env;
	const snapshot = (params.metadataSnapshot && params.metadataSnapshot.pluginIds === void 0 && isPluginMetadataSnapshotCompatible({
		snapshot: params.metadataSnapshot,
		config: params.config,
		env,
		workspaceDir: params.workspaceDir
	}) ? params.metadataSnapshot : void 0) ?? getCurrentPluginMetadataSnapshot({
		config: params.config,
		...params.workspaceDir ? { workspaceDir: params.workspaceDir } : {},
		env
	});
	if (!snapshot) return {};
	const normalizedPlugins = normalizePluginsConfig(params.config?.plugins);
	const denylist = compileGlobPatterns({
		raw: params.toolDenylist,
		normalize: normalizeToolPolicyName
	});
	const pluginIds = /* @__PURE__ */ new Set();
	const pluginToolNames = /* @__PURE__ */ new Set();
	for (const plugin of snapshot.manifestRegistry.plugins) {
		if (!isManifestPluginAvailableForControlPlane({
			snapshot,
			plugin,
			config: params.config,
			normalizedConfig: normalizedPlugins
		}) || denylistBlocksPlugin({
			pluginId: plugin.id,
			denylist
		})) continue;
		const availableToolNames = collectAvailableManifestToolNames({
			plugin,
			config: params.config,
			env,
			denylist
		});
		if (availableToolNames.length === 0) continue;
		pluginIds.add(plugin.id);
		for (const toolName of availableToolNames) pluginToolNames.add(toolName);
	}
	return {
		pluginIds,
		pluginToolNames
	};
}
function buildDeclaredToolAllowlistContext(params) {
	const mcpServerNames = collectConfiguredMcpServerNames(params);
	const pluginContext = collectDeclaredPluginContext(params);
	const pluginIds = [...pluginContext.pluginIds ?? []];
	const pluginToolNames = [...pluginContext.pluginToolNames ?? []];
	if (mcpServerNames.length === 0 && pluginIds.length === 0 && pluginToolNames.length === 0) return;
	return {
		...pluginIds.length > 0 ? { pluginIds } : {},
		...pluginToolNames.length > 0 ? { pluginToolNames } : {},
		...mcpServerNames.length > 0 ? { mcpServerNames } : {}
	};
}
//#endregion
export { buildDeclaredToolAllowlistContext as t };
