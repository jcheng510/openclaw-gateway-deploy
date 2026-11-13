import { n as GOOGLE_GEMINI_MANIFEST_PROVIDER } from "./provider-discovery-DvgXQHXZ.mjs";
import { t as parseGeminiAuth } from "./gemini-auth-C4siUxjy.mjs";
import { a as DEFAULT_GOOGLE_API_BASE_URL, r as resolveGoogleApiClientHeaders, s as normalizeGoogleGenerativeAiBaseUrl } from "./thinking-api-CKPqtNNm.mjs";
import "openclaw/plugin-sdk/string-coerce-runtime";
import { resolveProviderHttpRequestConfig } from "openclaw/plugin-sdk/provider-http";
import "openclaw/plugin-sdk/provider-onboard";
import "openclaw/plugin-sdk/provider-stream-shared";
import "openclaw/plugin-sdk/llm";
import "openclaw/plugin-sdk/number-runtime";
import "openclaw/plugin-sdk/provider-auth-runtime";
import "openclaw/plugin-sdk/provider-transport-runtime";
import { buildProviderReplayFamilyHooks } from "openclaw/plugin-sdk/provider-model-shared";
import "openclaw/plugin-sdk/extension-shared";
import "openclaw/plugin-sdk/response-limit-runtime";
import "openclaw/plugin-sdk/text-utility-runtime";
import { buildProviderToolCompatFamilyHooks } from "openclaw/plugin-sdk/provider-tools";
import "openclaw/plugin-sdk/provider-catalog-live-runtime";
import "openclaw/plugin-sdk/provider-entry";
//#region extensions/google/vertex-adc.ts
const VERTEX_ADC_TEST_API_KEY = Symbol.for("openclaw.google.vertexAdcTestApi");
function resetGoogleVertexAuthorizedUserTokenCacheForTest() {}
if (process.env.VITEST) globalThis[VERTEX_ADC_TEST_API_KEY] = { reset: resetGoogleVertexAuthorizedUserTokenCacheForTest };
({
	...buildProviderReplayFamilyHooks({ family: "google-gemini" }),
	...buildProviderToolCompatFamilyHooks("gemini")
});
`${GOOGLE_GEMINI_MANIFEST_PROVIDER.baseUrl}`;
//#endregion
//#region extensions/google/api.ts
function resolveTrustedGoogleGenerativeAiBaseUrl(baseUrl) {
	const normalized = normalizeGoogleGenerativeAiBaseUrl(baseUrl) ?? "https://generativelanguage.googleapis.com/v1beta";
	let url;
	try {
		url = new URL(normalized);
	} catch {
		throw new Error("Google Generative AI baseUrl must be a valid https URL on generativelanguage.googleapis.com");
	}
	if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "generativelanguage.googleapis.com") throw new Error("Google Generative AI baseUrl must use https://generativelanguage.googleapis.com");
	return normalized;
}
function resolveGoogleGenerativeAiHttpRequestConfig(params) {
	const baseUrl = resolveTrustedGoogleGenerativeAiBaseUrl(params.baseUrl);
	return resolveProviderHttpRequestConfig({
		baseUrl,
		defaultBaseUrl: DEFAULT_GOOGLE_API_BASE_URL,
		allowPrivateNetwork: params.request?.allowPrivateNetwork,
		headers: params.headers,
		request: params.request,
		defaultHeaders: {
			...parseGeminiAuth(params.apiKey).headers,
			...resolveGoogleApiClientHeaders({
				baseUrl,
				api: "google-generative-ai",
				capability: params.capability,
				transport: params.transport
			})
		},
		provider: "google",
		api: "google-generative-ai",
		capability: params.capability,
		transport: params.transport
	});
}
//#endregion
export { resolveGoogleGenerativeAiHttpRequestConfig };
