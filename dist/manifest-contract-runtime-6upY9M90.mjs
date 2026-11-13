import { v as sortUniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { o as loadPluginMetadataSnapshot } from "./plugin-metadata-snapshot-Ctf1TsvW.mjs";
import { i as listAvailableManifestContractPlugins, t as hasManifestContractValue } from "./manifest-contract-eligibility-BmLsQ18-.mjs";
//#region src/plugins/manifest-contract-runtime.ts
function resolveManifestContractRuntimePluginResolution(params) {
	const snapshot = loadPluginMetadataSnapshot({
		config: params.cfg ?? {},
		env: process.env
	});
	const allContractPlugins = snapshot.plugins.filter((plugin) => hasManifestContractValue({
		plugin,
		contract: params.contract,
		value: params.value
	}));
	const bundledCompatPluginIds = allContractPlugins.filter((plugin) => plugin.origin === "bundled").map((plugin) => plugin.id);
	const pluginIds = listAvailableManifestContractPlugins({
		snapshot: {
			index: snapshot.index,
			plugins: allContractPlugins
		},
		contract: params.contract,
		value: params.value,
		config: params.cfg
	}).map((plugin) => plugin.id);
	return {
		pluginIds: sortUniqueStrings(pluginIds),
		bundledCompatPluginIds: sortUniqueStrings(bundledCompatPluginIds),
		plugins: allContractPlugins
	};
}
//#endregion
export { resolveManifestContractRuntimePluginResolution as t };
