import { l as normalizeOptionalString } from "../../string-coerce-6kR-86XC.mjs";
import { n as assertOkOrThrowHttpError, p as readProviderJsonObjectResponse } from "../../provider-http-errors-CHqz_jlf.mjs";
import "../../string-coerce-runtime-B1b8UNzb.mjs";
import { d as postMultipartRequest, m as resolveProviderHttpRequestConfig, t as buildAudioTranscriptionFormData } from "../../shared-DS-nf3Kc.mjs";
import "../../provider-http-DqHHwWjj.mjs";
import { t as XAI_BASE_URL } from "../../model-definitions-CWn53fjP.mjs";
import { l as createXaiMediaUnderstandingProviderMetadata } from "../../capability-provider-metadata-factory-DKDXqC4Q.mjs";
import "../../capability-provider-metadata-BqR8piC1.mjs";
//#region extensions/xai/stt.ts
function resolveXaiSttBaseUrl(value) {
	return normalizeOptionalString(value ?? process.env.XAI_BASE_URL) ?? XAI_BASE_URL;
}
async function transcribeXaiAudio(params) {
	const fetchFn = params.fetchFn ?? fetch;
	const { baseUrl, allowPrivateNetwork, headers, dispatcherPolicy } = resolveProviderHttpRequestConfig({
		baseUrl: resolveXaiSttBaseUrl(params.baseUrl),
		defaultBaseUrl: XAI_BASE_URL,
		headers: params.headers,
		request: params.request,
		defaultHeaders: { Authorization: `Bearer ${params.apiKey}` },
		provider: "xai",
		api: "xai-stt",
		capability: "audio",
		transport: "media-understanding"
	});
	const language = normalizeOptionalString(params.language);
	const form = buildAudioTranscriptionFormData({
		buffer: params.buffer,
		fileName: params.fileName,
		mime: params.mime,
		fields: { language }
	});
	const { response, release } = await postMultipartRequest({
		url: `${baseUrl}/stt`,
		headers,
		body: form,
		timeoutMs: params.timeoutMs,
		...params.signal ? { signal: params.signal } : {},
		fetchFn,
		allowPrivateNetwork,
		dispatcherPolicy,
		auditContext: "xai stt"
	});
	try {
		await assertOkOrThrowHttpError(response, "xAI audio transcription failed");
		const payload = await readProviderJsonObjectResponse(response, "xai.stt");
		if (typeof payload.text !== "string") throw new Error("xAI transcription response missing text");
		return { text: payload.text.trim() };
	} finally {
		await release();
	}
}
function buildXaiMediaUnderstandingProvider() {
	return {
		...createXaiMediaUnderstandingProviderMetadata(),
		transcribeAudio: transcribeXaiAudio
	};
}
//#endregion
export { buildXaiMediaUnderstandingProvider };
