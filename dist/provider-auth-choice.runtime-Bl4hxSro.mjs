import { a as loadInstalledPluginIndexWithDiscovery } from "./installed-plugin-index-CrJ6zmAL.mjs";
import { i as loadInstalledPluginIndexInstallRecordsSync } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import "./setup-registry-CUd0q44F.mjs";
import { r as resolvePluginProvidersCore } from "./providers.runtime-D8tHcZMM.mjs";
import "./provider-wizard-mOJSWtoC.mjs";
//#region src/plugins/provider-auth-choice.runtime.ts
/** Runtime wrapper for registered model provider discovery. */
function resolvePluginProviders(params, preparedInstallRecords) {
	if (!preparedInstallRecords) return resolvePluginProvidersCore(params);
	const pluginMetadataSnapshot = loadInstalledPluginIndexWithDiscovery({
		config: params.config,
		workspaceDir: params.workspaceDir,
		env: params.env,
		installRecords: {
			...loadInstalledPluginIndexInstallRecordsSync({ env: params.env }),
			...preparedInstallRecords
		}
	});
	return resolvePluginProvidersCore({
		...params,
		pluginMetadataSnapshot
	});
}
//#endregion
export { resolvePluginProviders as t };
