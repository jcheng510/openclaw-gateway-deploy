import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import "./utils-DUAwk2p5.mjs";
import { a as resolveAgentDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { t as cloneConfigWithResolutionFacts } from "./resolution-facts-CYe39-eJ.mjs";
import { c as resolveSharedAuthStorePath } from "./path-resolve-CkbtowIT.mjs";
import { h as resolveAuthProfileDatabasePath } from "./sqlite-bVIXwkEM.mjs";
import { c as getRuntimeAuthProfileStoreCredentialsRevision, m as getRuntimeAuthProfileStoreSnapshotsRevision } from "./runtime-snapshots-CmtUlMVL.mjs";
import { u as prepareRuntimeAuthProfileStoreSnapshots } from "./runtime-snapshot-owner-qZEXvQLj.mjs";
import { r as resolveLegacyInheritedAuthAgentDir } from "./legacy-inherited-auth-dir-5HYwj6qZ.mjs";
import { n as hasSecretRefCandidate, t as hasCredentialBearingObjectValue } from "./runtime-secret-scan-_rt5Se8s.mjs";
import { existsSync } from "node:fs";
//#region src/secrets/runtime-fast-path.ts
/** Detects when secrets runtime preparation can safely use a fast path. */
const RUNTIME_PATH_ENV_KEYS = [
	"HOME",
	"USERPROFILE",
	"HOMEDRIVE",
	"HOMEPATH",
	"OPENCLAW_HOME",
	"OPENCLAW_STATE_DIR",
	"OPENCLAW_CONFIG_PATH",
	"OPENCLAW_AGENT_DIR"
];
/**
* Merges caller env with process path env needed for config and agent-dir resolution.
*/
function mergeSecretsRuntimeEnv(env) {
	const merged = { ...env ?? process.env };
	for (const key of RUNTIME_PATH_ENV_KEYS) {
		if (merged[key] !== void 0) continue;
		const processValue = process.env[key];
		if (processValue !== void 0) merged[key] = processValue;
	}
	return merged;
}
/**
* Collects default and named agent directories that may contain auth profile stores.
*/
function collectCandidateAgentDirs(config, env = process.env) {
	const dirs = /* @__PURE__ */ new Set();
	dirs.add(resolveUserPath(resolveAgentDir(config, "main", env), env));
	dirs.add(resolveUserPath(resolveLegacyInheritedAuthAgentDir(config, env), env));
	for (const agentId of listAgentIds(config)) dirs.add(resolveUserPath(resolveAgentDir(config, agentId, env), env));
	return [...dirs];
}
/**
* Combines explicit refresh agent dirs with config-derived dirs for runtime refresh.
*/
function resolveRefreshAgentDirs(config, context) {
	const configDerived = collectCandidateAgentDirs(config, context.env);
	if (!context.explicitAgentDirs || context.explicitAgentDirs.length === 0) return configDerived;
	return uniqueStrings([...context.explicitAgentDirs, ...configDerived]);
}
function resolveCandidateAgentDirs(params) {
	return params.agentDirs?.length ? uniqueStrings(params.agentDirs.map((entry) => resolveUserPath(entry, params.env))) : collectCandidateAgentDirs(params.config, params.env);
}
function hasCandidateAuthProfileStoreSource(agentDir) {
	return existsSync(resolveAuthProfileDatabasePath(agentDir));
}
/**
* Returns whether canonical auth-profile databases exist for candidate agent dirs.
*/
function hasCandidateAuthProfileStoreSources(params) {
	return resolveCandidateAgentDirs(params).some((agentDir) => hasCandidateAuthProfileStoreSource(agentDir)) || existsSync(resolveSharedAuthStorePath(params.env));
}
/**
* Creates empty web-tool metadata for snapshots that do not need secret resolution.
*/
function createEmptyRuntimeWebToolsMetadata() {
	return {
		search: {
			providerSource: "none",
			diagnostics: []
		},
		fetch: {
			providerSource: "none",
			diagnostics: []
		},
		diagnostics: []
	};
}
function hasActiveRuntimeWebFetchProviderSurface(fetch, defaults) {
	if (!isRecord(fetch)) return false;
	const fetchConfig = fetch;
	if (fetchConfig.enabled === false) return false;
	if (typeof fetchConfig.provider === "string" && fetchConfig.provider.trim()) return true;
	return hasCredentialBearingObjectValue(fetchConfig, defaults);
}
function hasRuntimeWebToolConfigSurface(config) {
	const web = config.tools?.web;
	const defaults = config.secrets?.defaults;
	const fetchExplicitlyDisabled = isRecord(web) && typeof web.fetch === "object" && web.fetch?.enabled === false;
	if (isRecord(web)) {
		const webRecord = web;
		if ("search" in webRecord) return true;
		if ("fetch" in webRecord && hasActiveRuntimeWebFetchProviderSurface(webRecord.fetch, defaults)) return true;
	}
	const entries = config.plugins?.entries;
	if (!isRecord(entries)) return false;
	return Object.values(entries).some((entry) => {
		if (!isRecord(entry)) return false;
		const pluginConfig = entry.config;
		return isRecord(pluginConfig) && ("webSearch" in pluginConfig || !fetchExplicitlyDisabled && "webFetch" in pluginConfig);
	});
}
/** Returns whether current config/auth/plugin state allows skipping full secret preparation. */
function canUseSecretsRuntimeFastPath(params) {
	if (hasRuntimeWebToolConfigSurface(params.sourceConfig)) return false;
	const defaults = params.sourceConfig.secrets?.defaults;
	if (hasSecretRefCandidate(params.sourceConfig, defaults)) return false;
	return !params.authStores.some((entry) => hasSecretRefCandidate(entry.store, defaults));
}
/**
* Prepares a runtime snapshot without resolving refs when config and auth stores contain none.
*/
function prepareSecretsRuntimeFastPathSnapshot(params) {
	const runtimeEnv = mergeSecretsRuntimeEnv(params.env);
	const authStoreCredentialsRevision = getRuntimeAuthProfileStoreCredentialsRevision();
	const authStoreSnapshotsRevision = getRuntimeAuthProfileStoreSnapshotsRevision();
	const sourceConfig = cloneConfigWithResolutionFacts(params.config);
	const resolvedConfig = cloneConfigWithResolutionFacts(params.config);
	const includeAuthStoreRefs = params.includeAuthStoreRefs ?? true;
	const candidateDirs = resolveCandidateAgentDirs({
		config: resolvedConfig,
		env: runtimeEnv,
		agentDirs: params.agentDirs
	});
	let authStores = [];
	if (includeAuthStoreRefs) {
		if (!params.loadAuthStore) {
			if (hasCandidateAuthProfileStoreSources({
				config: resolvedConfig,
				env: runtimeEnv,
				agentDirs: candidateDirs
			})) return null;
			authStores = candidateDirs.map((agentDir) => ({
				agentDir,
				store: {
					version: 1,
					profiles: {}
				}
			}));
		} else {
			const loadAuthStore = params.loadAuthStore;
			authStores = candidateDirs.map((agentDir) => ({
				agentDir,
				store: structuredClone(loadAuthStore(agentDir))
			}));
		}
	}
	if (!canUseSecretsRuntimeFastPath({
		sourceConfig,
		authStores
	})) return null;
	return {
		snapshot: {
			sourceConfig,
			config: resolvedConfig,
			authStores: prepareRuntimeAuthProfileStoreSnapshots(authStores, runtimeEnv),
			authStoreCredentialsRevision,
			authStoreSnapshotsRevision,
			warnings: [],
			degradedOwners: [],
			secretOwners: [],
			webTools: createEmptyRuntimeWebToolsMetadata()
		},
		usesAuthStoreFallback: !params.loadAuthStore,
		refreshContext: {
			env: runtimeEnv,
			explicitAgentDirs: params.agentDirs?.length ? [...candidateDirs] : null,
			includeAuthStoreRefs,
			loadablePluginOrigins: params.loadablePluginOrigins ?? /* @__PURE__ */ new Map(),
			...params.manifestRegistry ? { manifestRegistry: params.manifestRegistry } : {},
			...params.loadAuthStore ? { loadAuthStore: params.loadAuthStore } : {}
		}
	};
}
//#endregion
export { prepareSecretsRuntimeFastPathSnapshot as a, mergeSecretsRuntimeEnv as i, collectCandidateAgentDirs as n, resolveRefreshAgentDirs as o, createEmptyRuntimeWebToolsMetadata as r, canUseSecretsRuntimeFastPath as t };
