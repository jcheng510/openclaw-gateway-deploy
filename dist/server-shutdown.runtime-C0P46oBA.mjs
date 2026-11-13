//#region src/gateway/server-shutdown.runtime.ts
async function prepareGatewayShutdownRuntime() {
	const [{ prepareGatewayClose, completeGatewayClose, drainActiveSessionsForShutdown, runGatewayClosePrelude }, { runGlobalGatewayStopSafely }, { flushPendingSessionsChangedEvents }, { drainSessionEventPublications }, { closeMcpLoopbackServer }, { markRestartAbortedMainSessions }, { disposeAllBundleLspRuntimes }, { drainRetainedOpenAiEmbeddingProviders }, { stopGmailWatcher }, { stopCronMaintenance }, { disposeAllCodeModeRuns }, { closeProviderTransportDispatcherPool }, { prepareActivePluginRegistryShutdown }, { waitForPluginCacheRetirement }] = await Promise.all([
		import("./server-close.runtime.js"),
		import("./plugins/hook-runner-global.js"),
		import("./session-change-event-GBPRM83P.mjs"),
		import("./session-event-prepared-row-DM9jdolW.mjs"),
		import("./mcp-http-SUhdedqv.mjs"),
		import("./main-session-restart-recovery-aCkXV_UK.mjs"),
		import("./agent-bundle-lsp-runtime-oFXI3_JP.mjs"),
		import("./embeddings-provider-lifetime-DBe2bB_A.mjs"),
		import("./gmail-watcher-D2pe3brr.mjs"),
		import("./maintenance-xOYoW2ZB.mjs"),
		import("./code-mode-state-Crr0J2H6.mjs"),
		import("./provider-transport-dispatcher-pool-RafA--C1.mjs"),
		import("./runtime-DR3sS4VI.mjs"),
		import("./plugin-cache-DVfxznij.mjs")
	]);
	await prepareActivePluginRegistryShutdown();
	return {
		prepareGatewayClose,
		completeGatewayClose,
		drainActiveSessionsForShutdown,
		runGatewayClosePrelude,
		runGlobalGatewayStopSafely,
		flushPendingSessionsChangedEvents,
		drainSessionEventPublications,
		closeMcpLoopbackServer,
		markRestartAbortedMainSessions,
		disposeAllBundleLspRuntimes,
		drainRetainedOpenAiEmbeddingProviders,
		stopGmailWatcher,
		stopCronMaintenance,
		disposeAllCodeModeRuns,
		closeProviderTransportDispatcherPool,
		waitForPluginCacheRetirement
	};
}
//#endregion
export { prepareGatewayShutdownRuntime };
