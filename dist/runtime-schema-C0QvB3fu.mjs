import { n as resolveConfigWidePluginManifestRegistry } from "./io.plugin-metadata-Dh6QPasb.mjs";
import { c as collectPluginSchemaMetadataCore, o as resolveChannelSchemaSelection, s as collectChannelSchemaMetadataCore } from "./validation-D_X_aeNf.mjs";
import { c as readConfigFileSnapshot, r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { t as buildConfigSchemaCore } from "./schema-NqC6_AOV.mjs";
//#region src/config/runtime-schema.ts
/** Builds one config schema from an exact manifest registry. */
function buildRuntimeConfigSchemaFromRegistry(registry, config) {
	return buildConfigSchemaCore({
		plugins: collectPluginSchemaMetadataCore(registry),
		channels: collectChannelSchemaMetadataCore(registry, resolveChannelSchemaSelection(registry, config))
	});
}
/** Builds the config schema from the active runtime config and plugin metadata. */
function loadGatewayRuntimeConfigSchema() {
	const config = getRuntimeConfig();
	return buildRuntimeConfigSchemaFromRegistry(resolveConfigWidePluginManifestRegistry({
		config,
		env: process.env
	}), config);
}
async function readBestEffortRuntimeConfigSchema() {
	const snapshot = await readConfigFileSnapshot({ observe: false });
	const config = snapshot.valid ? snapshot.sourceConfig : {
		agents: { list: [{ id: "main" }] },
		plugins: { enabled: true }
	};
	const registry = resolveConfigWidePluginManifestRegistry({
		config,
		env: process.env
	});
	return buildConfigSchemaCore({
		plugins: snapshot.valid ? collectPluginSchemaMetadataCore(registry) : [],
		channels: collectChannelSchemaMetadataCore(registry, resolveChannelSchemaSelection(registry, config))
	});
}
//#endregion
export { loadGatewayRuntimeConfigSchema as n, readBestEffortRuntimeConfigSchema as r, buildRuntimeConfigSchemaFromRegistry as t };
