import { t as GOOGLE_GEMINI_CLI_PROVIDER_ID } from "./gemini-cli-auth-home-CXgkYWW_.mjs";
import { t as formatGoogleOauthApiKey } from "./oauth-token-shared-LqSy8lwB.mjs";
import { t as createGoogleGeminiCliProvider } from "./provider-contract-api-C20GRskC.mjs";
import { t as GOOGLE_GEMINI_PROVIDER_HOOKS } from "./provider-hooks-BuqttznX.mjs";
import { i as resolveGoogleGeminiForwardCompatModel, r as isModernGoogleModel } from "./provider-models-BxPGa-3N.mjs";
//#region extensions/google/gemini-cli-provider.ts
function buildGoogleGeminiCliProvider() {
	return {
		...createGoogleGeminiCliProvider(),
		resolveDynamicModel: (ctx) => resolveGoogleGeminiForwardCompatModel({
			providerId: GOOGLE_GEMINI_CLI_PROVIDER_ID,
			ctx
		}),
		...GOOGLE_GEMINI_PROVIDER_HOOKS,
		isModernModelRef: ({ modelId }) => isModernGoogleModel(modelId),
		formatApiKey: formatGoogleOauthApiKey
	};
}
//#endregion
export { buildGoogleGeminiCliProvider as t };
