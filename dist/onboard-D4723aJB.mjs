import { f as createAliasOnlyPresetAppliers } from "./provider-onboard-5d7muhIz.mjs";
//#region extensions/openrouter/onboard.ts
const OPENROUTER_DEFAULT_MODEL_REF = "openrouter/auto";
const openrouterPresetAppliers = createAliasOnlyPresetAppliers({
	modelRef: OPENROUTER_DEFAULT_MODEL_REF,
	alias: "OpenRouter"
});
function applyOpenrouterProviderConfig(cfg) {
	return openrouterPresetAppliers.applyProviderConfig(cfg);
}
function applyOpenrouterConfig(cfg) {
	return openrouterPresetAppliers.applyConfig(cfg);
}
//#endregion
export { applyOpenrouterConfig as n, applyOpenrouterProviderConfig as r, OPENROUTER_DEFAULT_MODEL_REF as t };
