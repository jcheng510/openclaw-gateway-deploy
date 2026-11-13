import { r as __exportAll } from "./rolldown-runtime-Dr7-SnC6.mjs";
import { t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { i as resolveEffectiveDebugProxyUrl, n as createDebugProxyWebSocketAgent, r as resolveDebugProxySettings } from "./env-Dg3QhGtH.mjs";
import { _ as getDebugProxyCaptureStore, a as initializeDebugProxyCapture, d as isDebugProxyGlobalFetchPatchInstalled, g as closeDebugProxyCaptureStore, h as acquireDebugProxyCaptureStore, i as captureWsEventAsync, l as finalizeDebugProxyCapture, m as DebugProxyCaptureStore, n as captureHttpExchangeAsync, o as initializeDebugProxyCaptureAsync, r as captureWsEvent, t as captureHttpExchange, u as finalizeDebugProxyCaptureAsync, v as acquireDebugProxyCaptureStoreAsync } from "./runtime-DwLpmsfP.mjs";
import { r as createDebugProxyCaptureReader } from "./store.kernel-DHXp9lJv.mjs";
//#region src/proxy-capture/store-readonly.async.ts
/** Capture the read target without opening or creating its database. */
function createDebugProxyCaptureReaderAsync(params) {
	const context = captureOpenClawStateWorkerContext({ env: params.env });
	return {
		async getSessionEvents(sessionId, limit) {
			const result = await executeExistingOpenClawStateRead({
				env: context.environment,
				path: context.admission.databasePath
			}, {
				type: "capture.readOnlyEvents",
				sessionId,
				limit
			}, { context });
			context.admission.assertCurrent();
			if (result && (!result.ok || result.type !== "capture.readOnlyEvents")) throw new Error("Unexpected capture events read result");
			return result?.events ?? [];
		},
		async readBlob(blobId) {
			const result = await executeExistingOpenClawStateRead({
				env: context.environment,
				path: context.admission.databasePath
			}, {
				type: "capture.readOnlyBlob",
				blobId
			}, { context });
			context.admission.assertCurrent();
			if (result && (!result.ok || result.type !== "capture.readOnlyBlob")) throw new Error("Unexpected capture blob read result");
			return result?.blob ?? null;
		}
	};
}
//#endregion
//#region src/plugin-sdk/proxy-capture.ts
var proxy_capture_exports = /* @__PURE__ */ __exportAll({
	DebugProxyCaptureStore: () => DebugProxyCaptureStore,
	acquireDebugProxyCaptureStore: () => acquireDebugProxyCaptureStore,
	acquireDebugProxyCaptureStoreAsync: () => acquireDebugProxyCaptureStoreAsync,
	captureHttpExchange: () => captureHttpExchange,
	captureHttpExchangeAsync: () => captureHttpExchangeAsync,
	captureWsEvent: () => captureWsEvent,
	captureWsEventAsync: () => captureWsEventAsync,
	closeDebugProxyCaptureStore: () => closeDebugProxyCaptureStore,
	createDebugProxyCaptureReader: () => createDebugProxyCaptureReader,
	createDebugProxyCaptureReaderAsync: () => createDebugProxyCaptureReaderAsync,
	createDebugProxyWebSocketAgent: () => createDebugProxyWebSocketAgent,
	finalizeDebugProxyCapture: () => finalizeDebugProxyCapture,
	finalizeDebugProxyCaptureAsync: () => finalizeDebugProxyCaptureAsync,
	getDebugProxyCaptureStore: () => getDebugProxyCaptureStore,
	initializeDebugProxyCapture: () => initializeDebugProxyCapture,
	initializeDebugProxyCaptureAsync: () => initializeDebugProxyCaptureAsync,
	isDebugProxyGlobalFetchPatchInstalled: () => isDebugProxyGlobalFetchPatchInstalled,
	resolveDebugProxySettings: () => resolveDebugProxySettings,
	resolveEffectiveDebugProxyUrl: () => resolveEffectiveDebugProxyUrl
});
//#endregion
export { createDebugProxyCaptureReaderAsync as n, proxy_capture_exports as t };
