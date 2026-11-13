import { _ as resolvePrimaryStringValue } from "./string-coerce-6kR-86XC.mjs";
import { r as resolveAgentConfig, s as resolveAgentModelConfigForRuntime } from "./agent-scope-config-Dm6T00l4.mjs";
import { n as DEFAULT_MODEL, r as DEFAULT_PROVIDER } from "./defaults-BbU4k6fu.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { h as resolveConfiguredModelRef } from "./model-selection-shared-dOoB6UQS.mjs";
//#region src/agents/model-selection-config.ts
function resolveDefaultModelForAgent(params) {
	return resolveConfiguredModelRef({
		...params,
		defaultProvider: DEFAULT_PROVIDER,
		defaultModel: DEFAULT_MODEL
	});
}
function resolveSubagentConfiguredModelSelection(params) {
	const agentConfig = resolveAgentConfig(params.cfg, params.agentId);
	return resolvePrimaryStringValue(agentConfig?.subagents?.model) ?? resolvePrimaryStringValue(params.cfg.agents?.defaults?.subagents?.model) ?? (params.includeAgentPrimary === false ? void 0 : resolvePrimaryStringValue(resolveAgentModelConfigForRuntime(agentConfig, params.modelRuntime)));
}
//#endregion
export { resolveSubagentConfiguredModelSelection as n, resolveDefaultModelForAgent as t };
