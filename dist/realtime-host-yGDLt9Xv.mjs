import { _ as redactSensitiveText } from "./redact-CYYx6Qjc.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { h as readProviderTextResponse, m as readProviderJsonResponse, o as createProviderHttpError } from "./provider-http-errors-CHqz_jlf.mjs";
import { a as resolveAgentDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as fetchWithSsrFGuard } from "./fetch-guard-BulPh3pN.mjs";
import { d as resolveProviderRequestHeaders } from "./provider-request-config-Dg6UPApz.mjs";
import { s as warn } from "./globals-ChjEJkWj.mjs";
import { n as createDebugProxyWebSocketAgent, r as resolveDebugProxySettings } from "./env-Dg3QhGtH.mjs";
import { t as createRealtimeTranscriptionWebSocketSession } from "./websocket-session-CbIvJjIy.mjs";
import "./error-runtime-CKQUxkum.mjs";
import "./runtime-env-Bh9hwd9E.mjs";
import { t as proxy_capture_exports } from "./proxy-capture-jzlIrm8Y.mjs";
import "./agent-scope-runtime-BIhssPWI.mjs";
import { i as resolveProviderAuthProfileApiKey, n as isProviderAuthProfileConfigured } from "./provider-auth-availability-DOkAjvWP.mjs";
import "./ssrf-runtime-CaiftzgS.mjs";
import "./security-runtime-DxwQ9WKi.mjs";
import "./provider-http-DqHHwWjj.mjs";
import "./provider-auth-Q_FDaGt7.mjs";
import "./realtime-transcription-session-IhEf_qeg.mjs";
const openAIRealtimeHost = {
	resolveAgentDir,
	isProviderAuthProfileConfigured,
	resolveProviderAuthProfileApiKey,
	resolveProviderRequestHeaders,
	createRealtimeTranscriptionWebSocketSession,
	captureWsEventAsync: proxy_capture_exports.captureWsEventAsync,
	createDebugProxyWebSocketAgent,
	resolveDebugProxySettings,
	fetchWithSsrFGuard,
	createProviderHttpError,
	readProviderJsonResponse,
	readProviderTextResponse,
	formatErrorMessage,
	warn,
	redactSensitiveText
};
//#endregion
export { openAIRealtimeHost as t };
