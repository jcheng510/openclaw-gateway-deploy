import { s as resolveAgentModelConfigForRuntime } from "./agent-scope-config-Dm6T00l4.mjs";
import { l as toAgentModelListLike } from "./model-input-DEyB5bFf.mjs";
import { l as getRuntimeConfigSourceSnapshot, o as getRuntimeConfigSnapshot, w as selectApplicableRuntimeConfig } from "./runtime-snapshot-BHGp6OxI.mjs";
import "./config-D1R2igem.mjs";
//#region src/cron/isolated-agent/run-config.ts
/** Selects the active reloadable config when it descends from the cron caller's snapshot. */
function resolveCronActiveRuntimeConfig(cfg) {
	const runtimeConfig = getRuntimeConfigSnapshot();
	const runtimeSourceConfig = getRuntimeConfigSourceSnapshot();
	if (!runtimeConfig || !runtimeSourceConfig) return cfg;
	return selectApplicableRuntimeConfig({
		inputConfig: cfg,
		runtimeConfig,
		runtimeSourceConfig
	}) ?? cfg;
}
/** Derives isolated cron agent defaults from one immutable config snapshot. */
function resolveCronAgentConfigFromSnapshot(params) {
	const runtimeConfig = params.config;
	const { model: _agentModelOverride, sandbox: _agentSandboxOverride, memory: _agentMemoryOverride, models: _agentModelsOverride, params: _agentParamsOverride, ...agentOverrideRest } = params.agentConfigOverride ?? {};
	const overrideModel = resolveAgentModelConfigForRuntime(params.agentConfigOverride);
	const definedOverrides = Object.fromEntries(Object.entries(agentOverrideRest).filter(([, value]) => value !== void 0));
	const agentDefaults = { ...Object.assign({}, runtimeConfig.agents?.defaults, definedOverrides) };
	const existingModel = toAgentModelListLike(agentDefaults.model) ?? {};
	if (typeof overrideModel === "string") agentDefaults.model = {
		...existingModel,
		primary: overrideModel
	};
	else if (overrideModel) agentDefaults.model = {
		...existingModel,
		...overrideModel
	};
	return {
		runtimeConfig,
		agentDefaults,
		cfgWithAgentDefaults: {
			...runtimeConfig,
			agents: Object.assign({}, runtimeConfig.agents, { defaults: agentDefaults })
		}
	};
}
/** Selects the active runtime snapshot before deriving isolated cron agent defaults. */
function resolveCronAgentConfig(params) {
	return resolveCronAgentConfigFromSnapshot({
		...params,
		config: resolveCronActiveRuntimeConfig(params.config)
	});
}
//#endregion
export { resolveCronAgentConfig as n, resolveCronAgentConfigFromSnapshot as r, resolveCronActiveRuntimeConfig as t };
