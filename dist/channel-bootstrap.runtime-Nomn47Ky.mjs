import { D as withPluginCache, c as getPluginCacheRetirementSignal, o as getPluginCache, x as retainPluginCache } from "./plugin-cache-DK2CPN_y.mjs";
import { a as getPluginRuntimeGatewayRequestScope } from "./gateway-request-scope-Da9jAC9_.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { C as tryResolveAmbientOwnerAgentId, d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { n as prepareBundledDiscoveryMode } from "./bundled-discovery-state-Dtg5G0ev.mjs";
import { l as preparePersistedInstalledPluginIndexCacheEntry } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import { t as resolvePluginMetadataEnvFingerprint } from "./plugin-metadata-env-PclSQ5Vj.mjs";
import { i as getCurrentPluginMetadataSnapshot } from "./current-plugin-metadata-snapshot-CdI4MWI9.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { d as resolveDiscoverableScopedChannelPluginIds } from "./channel-presence-policy-DBIVdr7d.mjs";
import { C as resolveRuntimeConfigCacheKey } from "./runtime-snapshot-BHGp6OxI.mjs";
import { t as PluginLruCache } from "./plugin-lru-cache-Cg7dPWCV.mjs";
import { v as isPluginRegistryRetired } from "./registry-lifecycle-D7jOZqUu.mjs";
import { d as getActivePluginRegistryVersion, l as getActivePluginRegistry } from "./runtime-BnZb2P5v.mjs";
import "./channel-plugin-ids-C18TOaQy.mjs";
import { t as applyPluginAutoEnable } from "./plugin-auto-enable-CPR_-Zij.mjs";
import { n as withActivatedPluginIds } from "./activation-context-DDaSQyA-.mjs";
import { r as loadPluginRegistryHandle } from "./loader-CLZgaF-g.mjs";
//#region src/infra/outbound/channel-bootstrap.runtime.ts
const MAX_BOOTSTRAP_CONFIG_GENERATIONS = 64;
const MAX_BOOTSTRAP_CHANNEL_OUTCOMES_PER_CONFIG = 64;
let bootstrapRegistriesByScope = /* @__PURE__ */ new WeakMap();
function resolveBootstrapRegistries(cfg, env) {
	const cache = getPluginCache();
	if (getPluginCacheRetirementSignal(cache).aborted) return;
	const metadata = cache.metadata;
	const version = getActivePluginRegistryVersion();
	const snapshot = getCurrentPluginMetadataSnapshot({
		env,
		allowScopedSnapshot: true,
		allowWorkspaceScopedSnapshot: true,
		allowSynchronousPolicyRead: false
	});
	const scope = snapshot ?? metadata;
	let state = bootstrapRegistriesByScope.get(scope);
	if (!state || state.metadata !== metadata || state.version !== version) {
		state = {
			metadata,
			version,
			configs: new PluginLruCache(MAX_BOOTSTRAP_CONFIG_GENERATIONS)
		};
		bootstrapRegistriesByScope.set(scope, state);
	}
	const configKey = resolveRuntimeConfigCacheKey(cfg);
	const key = snapshot ? configKey : JSON.stringify([configKey, resolvePluginMetadataEnvFingerprint(env)]);
	let registries = state.configs.get(key);
	if (!registries) {
		registries = new PluginLruCache(MAX_BOOTSTRAP_CHANNEL_OUTCOMES_PER_CONFIG);
		state.configs.set(key, registries);
	}
	return registries;
}
/** Clears the per-generation channel bootstrap handle cache for isolated tests. */
function resetOutboundChannelBootstrapStateForTests() {
	bootstrapRegistriesByScope = /* @__PURE__ */ new WeakMap();
}
function resolveSendCapableRegistry(registry, channel) {
	const entry = registry?.channels?.find((candidate) => candidate?.plugin?.id === channel);
	return registry && (entry?.plugin?.outbound?.sendText ?? entry?.plugin?.message?.send?.text) ? registry : void 0;
}
function resolveBootstrapPlan(params, env = process.env) {
	const cfg = params.cfg;
	if (!cfg) return {
		kind: "resolved",
		registry: void 0
	};
	const scopedRegistry = getPluginRuntimeGatewayRequestScope()?.pluginRegistry;
	const scopedEntry = scopedRegistry?.channels?.find((entry) => entry?.plugin?.id === params.channel);
	const activeSendRegistry = resolveSendCapableRegistry(scopedEntry ? scopedRegistry : getActivePluginRegistry(), params.channel);
	if (activeSendRegistry) return {
		kind: "resolved",
		registry: activeSendRegistry
	};
	const agentId = tryResolveAmbientOwnerAgentId(cfg, params.agentId);
	const outcomeKey = `${agentId ?? ""}\0${params.channel}`;
	const registries = scopedEntry ? void 0 : resolveBootstrapRegistries(cfg, env);
	if (registries) {
		const cachedRegistry = registries.get(outcomeKey);
		if (cachedRegistry !== void 0 && (cachedRegistry === null || !isPluginRegistryRetired(cachedRegistry))) return {
			kind: "resolved",
			registry: resolveSendCapableRegistry(cachedRegistry, params.channel)
		};
	}
	return {
		kind: "cold",
		cfg,
		agentId,
		outcomeKey,
		registries
	};
}
function loadBootstrapPlan(params, plan, discovery) {
	const { cfg, agentId, outcomeKey, registries } = plan;
	const env = discovery?.env;
	const autoEnabled = applyPluginAutoEnable({
		config: cfg,
		...env ? { env } : {}
	});
	const workspaceDir = discovery ? discovery.workspaceDir : agentId === void 0 ? void 0 : resolveAgentWorkspaceDir(cfg, agentId);
	const pluginIds = resolveDiscoverableScopedChannelPluginIds({
		config: autoEnabled.config,
		activationSourceConfig: cfg,
		channelIds: [params.channel],
		workspaceDir,
		env: env ?? process.env
	});
	const activatedConfig = withActivatedPluginIds({
		config: autoEnabled.config,
		pluginIds
	}) ?? autoEnabled.config;
	const activatedSourceConfig = withActivatedPluginIds({
		config: cfg,
		pluginIds
	}) ?? cfg;
	let sendRegistry;
	try {
		sendRegistry = resolveSendCapableRegistry(loadPluginRegistryHandle({
			config: activatedConfig,
			activationSourceConfig: activatedSourceConfig,
			autoEnabledReasons: autoEnabled.autoEnabledReasons,
			onlyPluginIds: pluginIds,
			workspaceDir,
			...env ? { env } : {},
			runtimeOptions: { allowGatewaySubagentBinding: true }
		}), params.channel);
	} catch {}
	registries?.set(outcomeKey, sendRegistry ?? null);
	return sendRegistry;
}
/** Loads runtime plugins on demand when a selected outbound channel has only a setup shell. */
function bootstrapOutboundChannelPlugin(params) {
	const plan = resolveBootstrapPlan(params);
	return plan.kind === "resolved" ? plan.registry : loadBootstrapPlan(params, plan);
}
/** Prepares cold SQLite metadata before the shared bootstrap decision and loader. */
async function bootstrapOutboundChannelPluginAsync(params) {
	params.assertCurrent?.();
	const initial = resolveBootstrapPlan(params);
	if (initial.kind === "resolved") return initial.registry;
	const cache = getPluginCache();
	const namespaceEnv = cloneEnvWithPlatformSemantics(process.env);
	const env = cloneEnvWithPlatformSemantics(namespaceEnv);
	env.OPENCLAW_STATE_DIR = resolveStateDir(env);
	const discovery = {
		env,
		workspaceDir: initial.agentId === void 0 ? void 0 : resolveAgentWorkspaceDir(initial.cfg, initial.agentId, env)
	};
	const release = retainPluginCache(cache);
	try {
		return await withPluginCache(cache, async () => {
			const activateDiscovery = await prepareBundledDiscoveryMode(env);
			params.assertCurrent?.();
			const installed = await preparePersistedInstalledPluginIndexCacheEntry({ env });
			params.assertCurrent?.();
			installed.assertCurrent();
			activateDiscovery();
			const plan = resolveBootstrapPlan(params, namespaceEnv);
			if (plan.kind === "resolved") return plan.registry;
			if (plan.agentId !== initial.agentId) throw new Error("Outbound plugin owner changed during metadata preparation; retry the operation.");
			return loadBootstrapPlan(params, plan, discovery);
		});
	} finally {
		release();
	}
}
//#endregion
export { bootstrapOutboundChannelPluginAsync as n, resetOutboundChannelBootstrapStateForTests as r, bootstrapOutboundChannelPlugin as t };
