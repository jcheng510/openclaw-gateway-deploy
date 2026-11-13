import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { m as readProviderJsonResponse, n as assertOkOrThrowHttpError } from "./provider-http-errors-CHqz_jlf.mjs";
import { p as sanitizeConfiguredModelProviderRequest } from "./provider-request-config-Dg6UPApz.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import { n as resolveGeneratedMediaMaxBytes } from "./configured-max-bytes-CRx1HNe6.mjs";
import { d as postMultipartRequest, g as resolveProviderOperationTimeoutMs, m as resolveProviderHttpRequestConfig, r as createProviderOperationDeadline, u as postJsonRequest } from "./shared-DS-nf3Kc.mjs";
import { t as isProviderApiKeyConfigured } from "./provider-auth-availability-DOkAjvWP.mjs";
import { a as resolveApiKeyForProvider } from "./provider-auth-runtime-CnOX0YtK.mjs";
import "./provider-http-DqHHwWjj.mjs";
import { c as resolveInlineImageJsonResponseMaxBytes, s as parseOpenAiCompatibleImageResponse } from "./image-assets-0f0B2Wnj.mjs";
//#region src/image-generation/openai-compatible-image-provider.ts
function resolveDefaultModel(model, fallback) {
	return normalizeOptionalString(model) ?? fallback;
}
function appendImagesPath(baseUrl, mode) {
	return `${baseUrl.replace(/\/+$/u, "")}/images/${mode === "edit" ? "edits" : "generations"}`;
}
function resolveRequestTimeoutMs(params) {
	if (params.options.defaultTimeoutMs === void 0) return params.req.timeoutMs;
	const label = params.mode === "edit" ? params.options.failureLabels?.edit ?? `${params.options.label} image edit` : params.options.failureLabels?.generate ?? `${params.options.label} image generation`;
	const deadline = createProviderOperationDeadline({
		timeoutMs: params.req.timeoutMs,
		label
	});
	return resolveProviderOperationTimeoutMs({
		deadline,
		defaultTimeoutMs: params.options.defaultTimeoutMs
	});
}
function resolveResponseMaxImages(params) {
	return params.options.capabilities[params.mode].maxCount ?? params.count;
}
/** Creates an image-generation provider backed by OpenAI-style image endpoints. */
function createOpenAiCompatibleImageGenerationProvider(options) {
	const providerConfigKey = options.providerConfigKey ?? options.id;
	const normalizeModel = options.normalizeModel ?? resolveDefaultModel;
	const resolveCount = options.resolveCount ?? (({ req }) => req.count ?? 1);
	return {
		id: options.id,
		label: options.label,
		defaultModel: options.defaultModel,
		...options.defaultTimeoutMs !== void 0 ? { defaultTimeoutMs: options.defaultTimeoutMs } : {},
		models: [...options.models],
		isConfigured: (ctx) => isProviderApiKeyConfigured({
			provider: options.id,
			...ctx
		}),
		capabilities: options.capabilities,
		async generateImage(req) {
			const inputImages = req.inputImages ?? [];
			const mode = inputImages.length > 0 ? "edit" : "generate";
			const maxInputImages = options.capabilities.edit.maxInputImages;
			if (mode === "edit" && !options.capabilities.edit.enabled) throw new Error(`${options.label} image editing is not supported.`);
			if (mode === "edit" && maxInputImages !== void 0 && inputImages.length > maxInputImages) throw new Error(options.tooManyInputImagesError ?? `${options.label} image editing supports up to ${maxInputImages} reference image${maxInputImages === 1 ? "" : "s"}.`);
			const auth = await resolveApiKeyForProvider({
				provider: options.id,
				cfg: req.cfg,
				agentDir: req.agentDir,
				store: req.authStore
			});
			if (!auth.apiKey) throw new Error(options.missingApiKeyError ?? `${options.label} API key missing`);
			const providerConfig = req.cfg?.models?.providers?.[providerConfigKey];
			const resolvedBaseUrl = options.resolveBaseUrl?.({
				req,
				providerConfig,
				defaultBaseUrl: options.defaultBaseUrl
			}) ?? normalizeOptionalString(providerConfig?.baseUrl) ?? options.defaultBaseUrl;
			const allowPrivateNetwork = options.resolveAllowPrivateNetwork?.({
				baseUrl: resolvedBaseUrl,
				req,
				providerConfig
			});
			const { baseUrl, allowPrivateNetwork: resolvedAllowPrivateNetwork, headers, dispatcherPolicy } = resolveProviderHttpRequestConfig({
				baseUrl: resolvedBaseUrl,
				defaultBaseUrl: options.defaultBaseUrl,
				allowPrivateNetwork,
				request: options.useConfiguredRequest ? sanitizeConfiguredModelProviderRequest(providerConfig?.request) : void 0,
				defaultHeaders: { Authorization: `Bearer ${auth.apiKey}` },
				provider: options.id,
				capability: "image",
				transport: "http"
			});
			const model = normalizeModel(req.model, options.defaultModel);
			const count = resolveCount({
				req,
				mode
			});
			const requestParams = {
				req,
				inputImages,
				model,
				count,
				mode
			};
			const requestBody = mode === "edit" ? options.buildEditRequest({
				...requestParams,
				mode
			}) : options.buildGenerateRequest({
				...requestParams,
				mode
			});
			const timeoutMs = resolveRequestTimeoutMs({
				options,
				req,
				mode
			});
			const requestOptions = {
				url: appendImagesPath(baseUrl, mode),
				headers: new Headers(headers),
				timeoutMs,
				fetchFn: fetch,
				allowPrivateNetwork: resolvedAllowPrivateNetwork,
				ssrfPolicy: req.ssrfPolicy,
				dispatcherPolicy
			};
			if (requestBody.kind === "multipart") requestOptions.headers.delete("Content-Type");
			else requestOptions.headers.set("Content-Type", "application/json");
			const { response, release } = await (requestBody.kind === "multipart" ? postMultipartRequest({
				...requestOptions,
				body: requestBody.form
			}) : postJsonRequest({
				...requestOptions,
				body: requestBody.body
			}));
			try {
				await assertOkOrThrowHttpError(response, mode === "edit" ? options.failureLabels?.edit ?? `${options.label} image edit failed` : options.failureLabels?.generate ?? `${options.label} image generation failed`);
				const payload = await readProviderJsonResponse(response, `${options.id}.image-generation`, { maxBytes: resolveInlineImageJsonResponseMaxBytes(resolveResponseMaxImages({
					count,
					mode,
					options
				}), resolveGeneratedMediaMaxBytes(req.cfg, "image")) });
				const images = parseOpenAiCompatibleImageResponse(payload, {
					...options.response,
					malformedResponseError: mode === "edit" ? `${options.label} image edit response malformed` : `${options.label} image generation response malformed`
				});
				if (images.length === 0) throw new Error(options.emptyResponseError ?? (mode === "edit" ? `${options.label} image edit response missing image data` : `${options.label} image generation response missing image data`));
				return {
					images,
					model
				};
			} finally {
				await release();
			}
		}
	};
}
//#endregion
export { createOpenAiCompatibleImageGenerationProvider as t };
