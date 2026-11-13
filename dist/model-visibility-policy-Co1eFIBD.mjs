import { r as resolveAgentConfig } from "./agent-scope-config-Dm6T00l4.mjs";
import { o as resolveAgentModelFallbackValues, s as resolveAgentModelPrimaryValue } from "./model-input-DEyB5bFf.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { a as createModelVisibilityPolicyWithFallbacks } from "./model-selection-shared-dOoB6UQS.mjs";
import { n as resolveConfiguredModelFallbacks } from "./model-selection-resolve-BrT0ZD04.mjs";
//#region src/agents/model-visibility-policy.ts
/**
* Builds model visibility policies while retaining configured automatic fallbacks.
*/
const RUNTIME_MODEL_VISIBILITY_NORMALIZATION = {
	allowManifestNormalization: true,
	allowPluginNormalization: true
};
function resolveAdditionalConfiguredModelRefs(params) {
	const defaults = params.cfg.agents?.defaults;
	const agent = params.agentId ? resolveAgentConfig(params.cfg, params.agentId) : void 0;
	return [
		resolveAgentModelPrimaryValue(defaults?.model),
		...resolveAgentModelFallbackValues(defaults?.model),
		resolveAgentModelPrimaryValue(agent?.model),
		...resolveAgentModelFallbackValues(agent?.model),
		...Object.keys(defaults?.models ?? {}),
		...Object.keys(agent?.models ?? {}),
		agent?.utilityModel ?? defaults?.utilityModel,
		resolveAgentModelPrimaryValue(defaults?.imageModel),
		...resolveAgentModelFallbackValues(defaults?.imageModel),
		resolveAgentModelPrimaryValue(defaults?.pdfModel),
		...resolveAgentModelFallbackValues(defaults?.pdfModel)
	].filter((ref) => typeof ref === "string");
}
function createModelVisibilityPolicy(params) {
	return createModelVisibilityPolicyWithFallbacks({
		...params,
		fallbackModels: resolveConfiguredModelFallbacks(params),
		additionalConfiguredModelRefs: resolveAdditionalConfiguredModelRefs(params),
		allowManifestNormalization: params.allowManifestNormalization ?? false,
		allowPluginNormalization: params.allowPluginNormalization ?? false
	});
}
//#endregion
export { createModelVisibilityPolicy as n, RUNTIME_MODEL_VISIBILITY_NORMALIZATION as t };
