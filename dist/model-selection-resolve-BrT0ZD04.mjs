import "./model-ref-shared-BvpLLy4_.mjs";
import { r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { o as resolveAgentModelFallbackValues } from "./model-input-DEyB5bFf.mjs";
import { u as resolveAgentModelFallbacksOverride } from "./agent-scope-L_eY3Hj7.mjs";
import { f as resolveAllowedModelRefFromAliasIndex, i as buildModelAliasIndex, s as getModelRefStatus, v as resolveModelRefFromString } from "./model-selection-shared-dOoB6UQS.mjs";
//#region src/agents/model-selection-resolve.ts
/**
* Model selection resolution facade.
*
* This module resolves configured fallbacks and explicit model selections.
*/
/** Resolves legacy provider/model pairs whose model field may still contain an alias. */
function resolveModelAliasFromPair(params) {
	const bareAlias = resolveModelRefFromString({
		...params,
		raw: params.model,
		defaultProvider: params.provider
	});
	const providerAlias = resolveModelRefFromString({
		...params,
		raw: `${params.provider}/${params.model}`
	});
	if (providerAlias?.alias) return providerAlias.ref;
	const provider = normalizeProviderId(params.provider);
	return bareAlias?.alias && (normalizeProviderId(bareAlias.ref.provider) === provider || provider === normalizeProviderId(params.defaultProvider)) ? bareAlias.ref : null;
}
/** Resolve agent-owned fallback overrides without loading the full selection facade. */
function resolveConfiguredModelFallbacks(params) {
	if (params.agentId) {
		const override = resolveAgentModelFallbacksOverride(params.cfg, params.agentId);
		if (override !== void 0) return override;
	}
	return resolveAgentModelFallbackValues(params.cfg.agents?.defaults?.model);
}
/** Resolves a raw model string into an allowed model ref or an explanatory error. */
function resolveAllowedModelRefCore(params) {
	return resolveAllowedModelRefFromAliasIndex({
		...params,
		aliasIndex: buildModelAliasIndex(params),
		getStatus: (ref) => getModelRefStatus({
			...params,
			ref
		})
	});
}
//#endregion
export { resolveConfiguredModelFallbacks as n, resolveModelAliasFromPair as r, resolveAllowedModelRefCore as t };
