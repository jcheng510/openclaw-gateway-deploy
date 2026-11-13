import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { D as resolveProviderReasoningOutputModeWithPlugin } from "./provider-runtime-BvRBy5Mc.mjs";
import { d as readPersistedMediaFacts, s as isMeaningfulMediaFact } from "./media-facts-CYny4oQ-.mjs";
//#region src/sessions/user-turn-media.ts
const MEDIA_ONLY_USER_TEXT = "[User sent media without caption]";
function hasPersistedMedia(message) {
	if (!message || typeof message !== "object" || Array.isArray(message)) return false;
	return (readPersistedMediaFacts(message) ?? []).some(isMeaningfulMediaFact);
}
//#endregion
//#region src/utils/provider-utils.ts
/**
* Provider behavior helpers shared by reply runners, embedded agents, and provider plugins.
* Keep policy here generic; provider-specific reasoning rules belong in provider runtime hooks.
*/
/**
* Returns true if the provider requires reasoning to be wrapped in tags
* (e.g. <think> and <final>) in the text stream, rather than using native
* API fields for reasoning/thinking.
*/
function isReasoningTagProvider(provider, options) {
	const normalizedProvider = normalizeOptionalString(provider);
	if (!normalizedProvider) return false;
	const { config, workspaceDir, env, runtimeHandle, modelId, modelApi, model } = options ?? {};
	return resolveProviderReasoningOutputModeWithPlugin({
		provider: normalizedProvider,
		config,
		workspaceDir,
		env,
		runtimeHandle,
		context: {
			config,
			workspaceDir,
			env,
			provider: normalizedProvider,
			modelId,
			modelApi,
			model
		}
	}) === "tagged";
}
//#endregion
export { MEDIA_ONLY_USER_TEXT as n, hasPersistedMedia as r, isReasoningTagProvider as t };
