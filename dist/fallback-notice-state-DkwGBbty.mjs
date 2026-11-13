import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { t as areRuntimeModelRefsEquivalent } from "./model-runtime-aliases-Wn7RduAA.mjs";
//#region src/status/fallback-notice-state.ts
function resolveActiveFallbackState(params) {
	const selected = normalizeOptionalString(params.state?.fallbackNotice?.selectedModel);
	const active = normalizeOptionalString(params.state?.fallbackNotice?.activeModel);
	const reason = normalizeOptionalString(params.state?.fallbackNotice?.reason);
	const fallbackActive = selected === params.selectedModelRef && active === params.activeModelRef && !areRuntimeModelRefsEquivalent(params.selectedModelRef, params.activeModelRef, { config: params.config });
	return {
		active: fallbackActive,
		reason: fallbackActive ? reason : void 0
	};
}
//#endregion
export { resolveActiveFallbackState as t };
