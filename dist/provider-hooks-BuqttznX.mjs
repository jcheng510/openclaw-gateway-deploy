import { R as sanitizeGoogleThinkingPayload, d as createPayloadPatchStreamWrapper } from "./provider-stream-shared-HDHyzkG2.mjs";
import { a as buildProviderReplayFamilyHooks } from "./provider-model-shared-CfEgI_y7.mjs";
import { r as buildProviderToolCompatFamilyHooks } from "./provider-tools-CQ4ILRNN.mjs";
import { t as stripGoogleProviderPrefix } from "./model-id-DkJxcDe6.mjs";
import { i as resolveGoogleThinkingProfile } from "./provider-policy-BArC7quk.mjs";
import "./thinking-api-CaP1ZSlZ.mjs";
//#region extensions/google/provider-hooks.ts
function classifyGoogleFailoverCode(code) {
	switch (code?.trim().toUpperCase()) {
		case "UNAVAILABLE": return "overloaded";
		case "DEADLINE_EXCEEDED": return "timeout";
		case "INTERNAL": return "server_error";
		default: return;
	}
}
function wrapGoogleThinkingStream(ctx) {
	return createPayloadPatchStreamWrapper(ctx.streamFn, ({ payload, model }) => {
		if (model.api !== "google-generative-ai" && model.api !== "google-vertex") return;
		sanitizeGoogleThinkingPayload({
			payload,
			modelId: stripGoogleProviderPrefix(model.id).replace(/^models\//u, ""),
			thinkingLevel: ctx.thinkingLevel
		});
	});
}
const GOOGLE_GEMINI_PROVIDER_HOOKS = {
	...buildProviderReplayFamilyHooks({ family: "google-gemini" }),
	...buildProviderToolCompatFamilyHooks("gemini"),
	resolveThinkingProfile: resolveGoogleThinkingProfile,
	wrapStreamFn: wrapGoogleThinkingStream,
	classifyFailoverReason: ({ code }) => classifyGoogleFailoverCode(code)
};
//#endregion
export { GOOGLE_GEMINI_PROVIDER_HOOKS as t };
