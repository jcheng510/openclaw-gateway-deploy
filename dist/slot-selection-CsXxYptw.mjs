import { t as applyExclusiveSlotSelection } from "./slots-CSgIxf6O.mjs";
import { o as loadPluginMetadataSnapshot } from "./plugin-metadata-snapshot-Ctf1TsvW.mjs";
import { r as isBundledManifestOwner } from "./manifest-owner-policy-DyoKFqGS.mjs";
//#region src/plugins/slot-selection.ts
async function applySlotSelectionForPlugin(config, pluginId, preparedMetadata, beforeRuntimeInspection) {
	const metadataSnapshot = preparedMetadata ?? loadPluginMetadataSnapshot({
		allowCurrent: false,
		config,
		env: process.env
	});
	const plugin = metadataSnapshot.plugins.find((entry) => entry.id === pluginId);
	if (!plugin) return {
		config,
		warnings: []
	};
	if (!plugin.kind && !isBundledManifestOwner(plugin)) {
		const { withPluginDiagnosticsReport } = await import("./status--1EOmBqL.mjs");
		beforeRuntimeInspection?.();
		return await withPluginDiagnosticsReport({
			config,
			onlyPluginIds: [plugin.id],
			metadataSnapshot,
			loadMode: "validate"
		}, (runtimeReport) => {
			const runtimePlugin = runtimeReport.plugins.find((entry) => entry.id === plugin.id);
			const result = applyExclusiveSlotSelection({
				config,
				selectedId: plugin.id,
				selectedKind: runtimePlugin?.kind ?? plugin.kind
			});
			return {
				config: result.config,
				warnings: result.warnings
			};
		});
	}
	const result = applyExclusiveSlotSelection({
		config,
		selectedId: plugin.id,
		selectedKind: plugin.kind
	});
	return {
		config: result.config,
		warnings: result.warnings
	};
}
//#endregion
export { applySlotSelectionForPlugin as t };
