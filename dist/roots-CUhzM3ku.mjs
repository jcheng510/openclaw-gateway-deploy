import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import { d as normalizeStringEntries } from "./string-normalization-YMwDjufr.mjs";
import "./utils-DUAwk2p5.mjs";
import { s as resolveBundledPluginsDir } from "./bundled-dir-D7bUjZsk.mjs";
import { a as resolveDefaultPluginExtensionsDir } from "./install-paths-BylxcuP5.mjs";
import { i as resolveOpenClawDevSourceRoot } from "./dev-source-root-BtW2e9RT.mjs";
import path from "node:path";
//#region src/plugins/roots.ts
function resolvePluginSourceRoots(params) {
	const env = params.env ?? process.env;
	const workspaceRoot = params.workspaceDir ? resolveUserPath(params.workspaceDir, env) : void 0;
	return {
		stock: resolveBundledPluginsDir(env),
		global: resolveDefaultPluginExtensionsDir(env),
		workspace: workspaceRoot ? path.join(workspaceRoot, ".openclaw", "extensions") : void 0
	};
}
function resolvePluginCacheInputs(params) {
	const env = params.env ?? process.env;
	return {
		roots: resolvePluginSourceRoots({
			workspaceDir: params.workspaceDir,
			env
		}),
		loadPaths: normalizeStringEntries((params.loadPaths ?? []).filter((entry) => typeof entry === "string")).map((entry) => resolveUserPath(entry, env)),
		devSourceRoot: resolveOpenClawDevSourceRoot(env)
	};
}
//#endregion
export { resolvePluginSourceRoots as n, resolvePluginCacheInputs as t };
