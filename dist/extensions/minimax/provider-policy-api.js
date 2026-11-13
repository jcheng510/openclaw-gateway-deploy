import { t as resolveMinimaxFastModelId } from "../../minimax-fast-mode-CvdlXmtQ.mjs";
import "../../provider-model-metadata-0pSvKXb_.mjs";
import { t as resolveMinimaxThinkingProfile } from "../../thinking-CImIZXQq.mjs";
//#region extensions/minimax/provider-policy-api.ts
function resolveFastModeSupport(ctx) {
	if (!ctx.api || ctx.runtimeId !== "openclaw") return;
	return resolveMinimaxFastModelId({
		id: ctx.modelId,
		provider: ctx.provider,
		api: ctx.api
	}) !== void 0;
}
function resolveThinkingProfile(context) {
	return resolveMinimaxThinkingProfile(context.modelId);
}
//#endregion
export { resolveFastModeSupport, resolveThinkingProfile };
