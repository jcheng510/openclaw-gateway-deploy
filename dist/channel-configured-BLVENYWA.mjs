import { i as listBundledChannelIdsForPackageState, n as hasBundledChannelPackageState } from "./package-state-probes-lVVxSHM8.mjs";
import { r as resolveChannelConfigRecord, t as hasMeaningfulChannelConfigShallow } from "./channel-config-activation-D7BTlH2V.mjs";
import { t as getBootstrapChannelPlugin } from "./bootstrap-registry-B_Z4D93x.mjs";
//#region src/config/channel-configured.ts
/** Resolves whether a channel has enough config, env, or plugin state to be considered setup. */
function isChannelConfigured(cfg, channelId, env = process.env) {
	if (hasMeaningfulChannelConfigShallow(resolveChannelConfigRecord(cfg, channelId))) return true;
	if (listBundledChannelIdsForPackageState("configuredState").includes(channelId.trim())) return hasBundledChannelPackageState({
		metadataKey: "configuredState",
		channelId,
		cfg,
		env
	});
	const plugin = getBootstrapChannelPlugin(channelId);
	return Boolean(plugin?.config?.hasConfiguredState?.({
		cfg,
		env
	}));
}
//#endregion
export { isChannelConfigured as t };
