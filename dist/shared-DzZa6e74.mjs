import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { a as createLazyRuntimeSurface, r as createLazyRuntimeModule } from "./lazy-runtime-CJrzFzqU.mjs";
import { r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import "./provider-model-metadata-0pSvKXb_.mjs";
import { i as classifyOpenAIBaseUrl, o as isOpenAICodexBaseUrl } from "./base-url-CwyeI_Ld.mjs";
import "./token-sharing-CmBELw8t.mjs";
import { t as buildOpenAIReplayPolicy } from "./replay-policy-DNHotlc4.mjs";
import { t as resolveOpenAITransportTurnState } from "./transport-policy-DnrtrHN-.mjs";
//#region extensions/openai/shared.ts
const OPENAI_DEFAULT_RUNTIME_CONTEXT_TOKENS = 272e3;
function resolveConfiguredOpenAIBaseUrl(cfg) {
	return normalizeOptionalString(cfg?.models?.providers?.openai?.baseUrl) ?? "https://api.openai.com/v1";
}
function hasSupportedOpenAIResponsesTransport(transport) {
	return transport === "auto" || transport === "sse" || transport === "websocket" || transport === "websocket-cached";
}
function defaultOpenAIResponsesExtraParams(extraParams, options) {
	const hasSupportedTransport = hasSupportedOpenAIResponsesTransport(extraParams?.transport);
	const defaultTransport = options?.transport ?? "auto";
	if (hasSupportedTransport) return extraParams;
	return {
		...extraParams,
		transport: defaultTransport
	};
}
const loadResponsesStream = createLazyRuntimeModule(() => import("./extensions/openai/responses-stream.runtime.js"));
const wrapOpenAIResponsesProviderStreamFn = (ctx) => {
	const loadStream = createLazyRuntimeSurface(loadResponsesStream, (runtime) => runtime.wrapOpenAIResponsesStream(ctx));
	return async (...args) => (await loadStream())(...args);
};
function buildOpenAIResponsesProviderHooks(options) {
	return {
		isCacheTtlEligible: ({ provider, baseUrl, supportsPromptCacheKey }) => normalizeProviderId(provider) === "openai" && (supportsPromptCacheKey ?? (classifyOpenAIBaseUrl(baseUrl) === "platform" || isOpenAICodexBaseUrl(baseUrl))),
		buildReplayPolicy: buildOpenAIReplayPolicy,
		prepareExtraParams: (ctx) => defaultOpenAIResponsesExtraParams(ctx.extraParams, options),
		wrapStreamFn: wrapOpenAIResponsesProviderStreamFn,
		wrapSimpleCompletionStreamFn: (ctx) => ctx.auth?.mode === "oauth" && ctx.auth.authFlow === "chatgpt-token-sharing" ? wrapOpenAIResponsesProviderStreamFn({
			...ctx,
			nativeWebSearchAllowedByToolPolicy: false
		}) : void 0,
		resolveTransportTurnState: resolveOpenAITransportTurnState
	};
}
//#endregion
export { buildOpenAIResponsesProviderHooks as n, resolveConfiguredOpenAIBaseUrl as r, OPENAI_DEFAULT_RUNTIME_CONTEXT_TOKENS as t };
