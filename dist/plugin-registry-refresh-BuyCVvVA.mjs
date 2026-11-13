import { t as resolveInstalledPluginIndexStateDatabaseOptions } from "./installed-plugin-index-store-path-C8scpqW1.mjs";
import { s as resolveControlPlaneRegistryParams } from "./plugin-registry-snapshot-DVTgCzjl.mjs";
import { r as withPluginLifecycleLease } from "./plugin-lifecycle-lease-BgmqKrMY.mjs";
import { n as refreshPersistedInstalledPluginIndex } from "./installed-plugin-index-store-write-COsuotm6.mjs";
//#region src/plugins/plugin-registry-refresh.ts
/** Refreshes the persisted plugin registry for mutation and doctor flows. */
async function refreshPluginRegistry(params) {
	return await withPluginLifecycleLease(resolveInstalledPluginIndexStateDatabaseOptions(params), async () => refreshPersistedInstalledPluginIndex(params.config ? resolveControlPlaneRegistryParams(params) : params));
}
//#endregion
export { refreshPluginRegistry as t };
