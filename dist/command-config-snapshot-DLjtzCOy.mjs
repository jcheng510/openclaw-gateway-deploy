import { t as adoptCurrentPluginMetadataSnapshotIfAbsent } from "./current-plugin-metadata-snapshot-CdI4MWI9.mjs";
import { n as completePluginMetadataSnapshot } from "./plugin-metadata-snapshot-Ctf1TsvW.mjs";
import { d as readConfigFileSnapshotWithPluginMetadata } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
//#region src/cli/command-config-snapshot.ts
/** Reads full command config and adopts its metadata without replacing an existing owner. */
async function readCommandConfigSnapshot(options) {
	const read = await readConfigFileSnapshotWithPluginMetadata(options);
	const pluginMetadataSnapshot = completePluginMetadataSnapshot({
		snapshot: read.pluginMetadataSnapshot,
		config: read.snapshot.sourceConfig,
		env: process.env,
		workspaceDir: read.pluginMetadataSnapshot?.workspaceDir
	});
	if (pluginMetadataSnapshot) adoptCurrentPluginMetadataSnapshotIfAbsent(pluginMetadataSnapshot, {
		config: read.snapshot.sourceConfig,
		compatibleConfigs: [read.snapshot.config, read.snapshot.runtimeConfig],
		env: process.env,
		workspaceDir: pluginMetadataSnapshot.workspaceDir
	});
	return {
		...read,
		pluginMetadataSnapshot
	};
}
//#endregion
export { readCommandConfigSnapshot };
