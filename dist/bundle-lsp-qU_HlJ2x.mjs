import { s as pluginCacheExistsSync } from "./package-manifest-MF4xNi-g.mjs";
import { c as normalizeBundlePathList, n as CLAUDE_BUNDLE_MANIFEST_RELATIVE_PATH, s as mergeBundlePathLists } from "./bundle-manifest-DtjqvBG-.mjs";
import { t as applyMergePatch } from "./merge-patch-B0Q0c4qF.mjs";
import { i as resolveBundleJsonOpenFailure, n as loadEnabledBundleConfig, r as readBundleJsonObject, t as extractBundleServerMap } from "./bundle-config-shared-CxmAzpFo.mjs";
import path from "node:path";
//#region src/plugins/bundle-lsp.ts
function resolveBundleLspConfigPaths(params) {
	const declared = normalizeBundlePathList(params.raw.lspServers);
	const defaults = pluginCacheExistsSync(path.join(params.rootDir, ".lsp.json")) ? [".lsp.json"] : [];
	return mergeBundlePathLists(defaults, declared);
}
function loadBundleLspConfigFile(params) {
	const result = readBundleJsonObject({
		rootDir: params.rootDir,
		relativePath: params.relativePath,
		onOpenFailure: (failure) => resolveBundleJsonOpenFailure({
			failure,
			relativePath: params.relativePath,
			allowMissing: true
		})
	});
	if (!result.ok) return {
		config: { lspServers: {} },
		diagnostics: [result.reason === "open" ? result.error : `unable to read ${params.relativePath}: ${result.error}`]
	};
	return {
		config: { lspServers: extractBundleServerMap(result.raw, ["lspServers"]) },
		diagnostics: []
	};
}
function loadBundleLspConfig(params) {
	if (params.bundleFormat !== "claude") return {
		config: { lspServers: {} },
		diagnostics: []
	};
	const manifestLoaded = readBundleJsonObject({
		rootDir: params.rootDir,
		relativePath: CLAUDE_BUNDLE_MANIFEST_RELATIVE_PATH
	});
	if (!manifestLoaded.ok) return {
		config: { lspServers: {} },
		diagnostics: [manifestLoaded.error]
	};
	let merged = { lspServers: {} };
	const filePaths = resolveBundleLspConfigPaths({
		raw: manifestLoaded.raw,
		rootDir: params.rootDir
	});
	const diagnostics = [];
	for (const relativePath of filePaths) {
		const loaded = loadBundleLspConfigFile({
			rootDir: params.rootDir,
			relativePath
		});
		diagnostics.push(...loaded.diagnostics);
		merged = applyMergePatch(merged, loaded.config);
	}
	return {
		config: merged,
		diagnostics
	};
}
/** Inspects whether one plugin bundle has supported LSP runtime servers. */
function inspectBundleLspRuntimeSupport(params) {
	const { config, diagnostics } = loadBundleLspConfig(params);
	const supportedServerNames = [];
	const unsupportedServerNames = [];
	for (const [name, server] of Object.entries(config.lspServers)) (typeof server.command === "string" && server.command.trim().length > 0 ? supportedServerNames : unsupportedServerNames).push(name);
	return {
		hasStdioServer: supportedServerNames.length > 0,
		supportedServerNames,
		unsupportedServerNames,
		diagnostics
	};
}
/** Loads and merges enabled bundle LSP config across plugin manifests. */
function loadEnabledBundleLspConfig(params) {
	return loadEnabledBundleConfig({
		workspaceDir: params.workspaceDir,
		cfg: params.cfg,
		manifestRegistry: params.manifestRegistry,
		createEmptyConfig: () => ({ lspServers: {} }),
		loadBundleConfig: loadBundleLspConfig,
		createDiagnostic: (pluginId, message) => ({
			pluginId,
			message
		})
	});
}
//#endregion
export { loadEnabledBundleLspConfig as n, inspectBundleLspRuntimeSupport as t };
