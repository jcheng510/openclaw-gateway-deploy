import { t as resolveMemoryBackendConfig } from "./backend-config-D3tXhXDP.mjs";
import "./memory-core-host-runtime-files-C_h6usaq.mjs";
import { p as configureMemoryCoreDreamingState } from "./dreaming-state-VYUvbU-n.mjs";
import { r as prepareMemoryManagerReload } from "./lifecycle-BUZOaWsy.mjs";
import { n as closeMemorySearchManager, r as getMemorySearchManager, t as closeAllMemorySearchManagers } from "./memory-4ppjX--_.mjs";
import { t as classifyWorkspaceMemoryPaths } from "./workspace-path-classifier-yE5zVnDk.mjs";
//#region extensions/memory-core/src/runtime-provider.ts
function createMemoryRuntime(host = {}) {
	if (host.openKeyedStore) configureMemoryCoreDreamingState(host.openKeyedStore);
	return {
		prepareReload: prepareMemoryManagerReload,
		async getMemorySearchManager(params) {
			const { manager, debug, error } = await getMemorySearchManager({
				...params,
				...host.acquireLocalService ? { acquireLocalService: host.acquireLocalService } : {}
			});
			return {
				manager,
				debug,
				error
			};
		},
		resolveMemoryBackendConfig,
		async authorizeSearchHits(params) {
			const { filterMemorySearchHitsBySessionVisibility } = await import("./session-search-visibility-DG_HIgoi.mjs");
			return await filterMemorySearchHitsBySessionVisibility(params);
		},
		supportsWorkspaceMemoryReadSources: true,
		classifyWorkspaceMemoryPaths,
		closeAllMemorySearchManagers,
		closeMemorySearchManager
	};
}
const memoryRuntime = createMemoryRuntime();
//#endregion
export { memoryRuntime as n, createMemoryRuntime as t };
