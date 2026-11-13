import { n as normalizeGooglePreviewModelId } from "./provider-model-id-normalize-Bx8UgVVS.mjs";
import { n as createProviderApiKeyAuthMethod } from "./provider-api-key-auth-DIuMKMrZ.mjs";
import { h as runLiveProviderCatalog } from "./provider-catalog-live-runtime-C-m4H1hp.mjs";
import "./provider-entry-B4vlnjir.mjs";
import "./model-id-DkJxcDe6.mjs";
import { d as isOfficialGoogleAiStudioBaseUrl, l as isGoogleVertexBaseUrl, r as resolveGoogleGenerativeAiTransport, t as normalizeGoogleProviderConfig } from "./provider-policy-BArC7quk.mjs";
import { t as GOOGLE_GEMINI_PROVIDER_HOOKS } from "./provider-hooks-BuqttznX.mjs";
import { i as resolveGoogleGeminiForwardCompatModel, r as isModernGoogleModel, t as isGoogleNativeVideoModelId } from "./provider-models-BxPGa-3N.mjs";
import { n as applyGoogleGeminiModelDefault, t as GOOGLE_GEMINI_DEFAULT_MODEL } from "./onboard-9j50yGT0.mjs";
import { a as buildGoogleStaticCatalogProvider, o as buildGoogleVertexStaticCatalogProvider } from "./provider-catalog-BP_eQM7G.mjs";
import { t as buildGoogleLiveCatalogProvider } from "./provider-catalog-runtime-D0j5HCt-.mjs";
import { i as resolveGoogleVertexConfigApiKey } from "./vertex-adc-config-7_PqVxOy.mjs";
import { n as createGoogleGenerativeAiTransportStreamFn, r as createGoogleVertexTransportStreamFn } from "./transport-stream-D0yOwz78.mjs";
//#region extensions/google/provider-discovery.ts
const googleProviderDiscovery = {
	id: "google",
	label: "Google AI Studio",
	docsPath: "/providers/models",
	auth: [],
	resolveConfigApiKey: ({ provider, env }) => provider === "google-vertex" ? resolveGoogleVertexConfigApiKey(env) : void 0,
	staticCatalog: {
		order: "simple",
		run: async () => ({ providers: {
			google: buildGoogleStaticCatalogProvider(),
			"google-vertex": buildGoogleVertexStaticCatalogProvider()
		} })
	}
};
//#endregion
//#region extensions/google/provider-registration.ts
function normalizeGoogleVideoInput(ctx) {
	const input = ctx.model.input.filter((type) => type !== "video");
	const supportsVideo = ctx.provider === "google" && ctx.model.api === "google-generative-ai" && isOfficialGoogleAiStudioBaseUrl(ctx.model.baseUrl) && isGoogleNativeVideoModelId(ctx.modelId);
	return {
		...ctx.model,
		input: supportsVideo ? [...input, "video"] : input
	};
}
function resolveGoogleReasoningOutputMode(ctx) {
	if (ctx.provider === "google" || ctx.provider === "google-vertex" || ctx.provider === "google-interactions") {
		const api = ctx.model?.api ?? ctx.modelApi;
		if (!api || api === "google-generative-ai" || api === "google-vertex" || api === "google-interactions") return "native";
	}
	return "tagged";
}
function buildGoogleProvider() {
	return {
		...googleProviderDiscovery,
		hookAliases: [
			"google-antigravity",
			"google-vertex",
			"google-interactions"
		],
		envVars: ["GEMINI_API_KEY", "GOOGLE_API_KEY"],
		auth: [createProviderApiKeyAuthMethod({
			providerId: "google",
			methodId: "api-key",
			label: "Google AI Studio API key",
			hint: "Supported API-key access from aistudio.google.com/apikey",
			optionKey: "geminiApiKey",
			flagName: "--gemini-api-key",
			envVar: "GEMINI_API_KEY",
			promptMessage: "Enter Google AI Studio API key",
			defaultModel: GOOGLE_GEMINI_DEFAULT_MODEL,
			expectedProviders: ["google"],
			applyConfig: (cfg) => applyGoogleGeminiModelDefault(cfg).next,
			wizard: {
				choiceId: "gemini-api-key",
				choiceLabel: "Google AI Studio API key",
				groupId: "google",
				groupLabel: "Google",
				groupHint: "Supported API-key setup"
			}
		})],
		normalizeTransport: ({ provider, api, baseUrl }) => resolveGoogleGenerativeAiTransport({
			provider,
			api,
			baseUrl
		}),
		normalizeConfig: ({ provider, providerConfig }) => normalizeGoogleProviderConfig(provider, providerConfig),
		catalog: {
			order: "simple",
			run: async (ctx) => {
				if (ctx.providerIds && !ctx.providerIds.includes("google")) return null;
				const auth = ctx.resolveProviderApiKey("google");
				if (!auth.apiKey) return null;
				return await runLiveProviderCatalog({
					providerId: "google",
					profileId: auth.profileId,
					run: async () => ({ providers: { google: await buildGoogleLiveCatalogProvider({
						discoveryMode: "strict",
						apiKey: auth.apiKey,
						discoveryApiKey: auth.discoveryApiKey
					}) } })
				});
			}
		},
		normalizeModelId: ({ modelId }) => normalizeGooglePreviewModelId(modelId),
		normalizeResolvedModel: normalizeGoogleVideoInput,
		resolveDynamicModel: (ctx) => resolveGoogleGeminiForwardCompatModel({
			providerId: ctx.provider,
			ctx
		}),
		createStreamFn: ({ model }) => {
			if (model.api === "google-vertex" || model.api === "google-generative-ai" && (model.provider === "google-vertex" || isGoogleVertexBaseUrl(model.baseUrl))) return createGoogleVertexTransportStreamFn();
			if (model.api === "google-generative-ai") return createGoogleGenerativeAiTransportStreamFn();
		},
		...GOOGLE_GEMINI_PROVIDER_HOOKS,
		resolveReasoningOutputMode: resolveGoogleReasoningOutputMode,
		isModernModelRef: ({ modelId }) => isModernGoogleModel(modelId)
	};
}
//#endregion
export { buildGoogleProvider as t };
