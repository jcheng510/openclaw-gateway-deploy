import { normalizeOptionalString } from "openclaw/plugin-sdk/string-coerce-runtime";
import { resolveProviderRequestHeaders } from "openclaw/plugin-sdk/provider-http";
import { isGoogleGemini3ProModel, isGoogleGemini3ThinkingLevelModel } from "openclaw/plugin-sdk/provider-thinking-runtime";
import { normalizeGooglePreviewModelId as normalizeGoogleModelId } from "openclaw/plugin-sdk/model-ref-parse";
import { resolveGoogleGemini3ThinkingLevel, sanitizeGoogleThinkingPayload } from "openclaw/plugin-sdk/provider-stream-shared";
//#region extensions/google/model-id.ts
const GOOGLE_PROVIDER_PREFIX = "google/";
function stripGoogleProviderPrefix(id) {
	return id.startsWith(GOOGLE_PROVIDER_PREFIX) ? id.slice(7) : id;
}
//#endregion
//#region extensions/google/src/google-api-base-url.ts
const DEFAULT_GOOGLE_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
function trimTrailingSlashes(value) {
	return value.replace(/\/+$/, "");
}
function isCanonicalGoogleApiOriginShorthand(value) {
	return /^https:\/\/generativelanguage\.googleapis\.com\/?$/i.test(value);
}
function isGoogleGenerativeAiUrl(url) {
	return url.protocol === "https:" && url.hostname.toLowerCase() === "generativelanguage.googleapis.com";
}
function stripUrlUserInfo(url) {
	url.username = "";
	url.password = "";
}
function normalizeGoogleApiBaseUrl(baseUrl) {
	const raw = trimTrailingSlashes(normalizeOptionalString(baseUrl) || "https://generativelanguage.googleapis.com/v1beta");
	try {
		const url = new URL(raw);
		url.hash = "";
		url.search = "";
		stripUrlUserInfo(url);
		if (isGoogleGenerativeAiUrl(url)) url.pathname = trimTrailingSlashes(url.pathname || "") || "/v1beta";
		return trimTrailingSlashes(url.toString());
	} catch {
		if (isCanonicalGoogleApiOriginShorthand(raw)) return DEFAULT_GOOGLE_API_BASE_URL;
		return raw;
	}
}
function normalizeGoogleGenerativeAiBaseUrl(baseUrl) {
	const raw = normalizeOptionalString(baseUrl);
	if (!raw) return;
	const normalized = normalizeGoogleApiBaseUrl(raw);
	try {
		const url = new URL(normalized);
		stripUrlUserInfo(url);
		if (isGoogleGenerativeAiUrl(url)) {
			url.pathname = trimTrailingSlashes(url.pathname || "").replace(/\/openai$/i, "") || "/v1beta";
			return trimTrailingSlashes(url.toString());
		}
	} catch {}
	return normalized;
}
//#endregion
//#region extensions/google/provider-policy.ts
function resolveGoogleThinkingProfile({ modelId, reasoning }) {
	const normalizedModelId = normalizeGoogleModelId(modelId);
	const isGemini3ThinkingModel = isGoogleGemini3ThinkingLevelModel(normalizedModelId);
	if (reasoning === false && !isGemini3ThinkingModel) return;
	return {
		levels: isGoogleGemini3ProModel(normalizedModelId) ? [
			{ id: "off" },
			{ id: "low" },
			{ id: "adaptive" },
			{ id: "high" }
		] : [
			{ id: "off" },
			{ id: "minimal" },
			{ id: "low" },
			{ id: "medium" },
			{ id: "adaptive" },
			{ id: "high" }
		],
		...isGemini3ThinkingModel ? { preserveWhenCatalogReasoningFalse: true } : {}
	};
}
//#endregion
//#region extensions/google/google-api-client-header.ts
function resolveGoogleApiClientHeaders(params) {
	return resolveProviderRequestHeaders({
		provider: "google",
		api: params?.api ?? "google-generative-ai",
		baseUrl: params?.baseUrl ?? "https://generativelanguage.googleapis.com/v1beta",
		capability: params?.capability ?? "other",
		transport: params?.transport ?? "http"
	}) ?? {};
}
//#endregion
export { DEFAULT_GOOGLE_API_BASE_URL as a, normalizeGoogleModelId as c, resolveGoogleThinkingProfile as i, stripGoogleProviderPrefix as l, sanitizeGoogleThinkingPayload as n, normalizeGoogleApiBaseUrl as o, resolveGoogleApiClientHeaders as r, normalizeGoogleGenerativeAiBaseUrl as s, resolveGoogleGemini3ThinkingLevel as t };
