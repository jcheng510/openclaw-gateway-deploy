import { p as sanitizeConfiguredModelProviderRequest } from "./provider-request-config-Dg6UPApz.mjs";
import { m as resolveProviderHttpRequestConfig } from "./shared-DS-nf3Kc.mjs";
import { a as resolveApiKeyForProvider } from "./provider-auth-runtime-CnOX0YtK.mjs";
import "./provider-http-DqHHwWjj.mjs";
import { t as OPENROUTER_BASE_URL } from "./provider-defaults-ilQX6q3J.mjs";
import "./provider-catalog-DLhme6xC.mjs";
//#region extensions/openrouter/generation-request-context.ts
async function resolveOpenRouterGenerationRequestContext(params) {
	const auth = await resolveApiKeyForProvider({
		provider: "openrouter",
		cfg: params.cfg,
		agentDir: params.agentDir,
		store: params.authStore
	});
	if (!auth.apiKey) throw new Error("OpenRouter API key missing");
	return resolveProviderHttpRequestConfig({
		baseUrl: params.cfg.models?.providers?.openrouter?.baseUrl,
		defaultBaseUrl: OPENROUTER_BASE_URL,
		allowPrivateNetwork: false,
		defaultHeaders: {
			Authorization: `Bearer ${auth.apiKey}`,
			...params.jsonContentType ? { "Content-Type": "application/json" } : {},
			"HTTP-Referer": "https://openclaw.ai",
			"X-OpenRouter-Title": "OpenClaw"
		},
		request: sanitizeConfiguredModelProviderRequest(params.cfg.models?.providers?.openrouter?.request),
		provider: "openrouter",
		capability: params.capability,
		transport: "http"
	});
}
//#endregion
export { resolveOpenRouterGenerationRequestContext as t };
