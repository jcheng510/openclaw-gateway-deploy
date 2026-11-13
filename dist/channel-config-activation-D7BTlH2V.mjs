import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
//#region src/config/channel-config-activation.ts
/** Returns a channel config object when `channels.<id>` is present and object-shaped. */
function resolveChannelConfigRecord(cfg, channelId) {
	const entry = cfg.channels?.[channelId];
	return isRecord(entry) ? entry : null;
}
/** Checks whether a shallow channel config contains activation-relevant values. */
function hasMeaningfulChannelConfigShallow(value) {
	if (!isRecord(value)) return false;
	const keys = Object.keys(value);
	if (keys.length === 1 && keys[0] === "enabled") return value.enabled === true;
	return keys.some((key) => key !== "enabled");
}
/** Channel configuration can admit bundled plugin capabilities through an allowlist. */
function resolveChannelConfigActivationFacts(config) {
	return Object.keys(config.channels ?? {}).filter((channelId) => {
		const channel = resolveChannelConfigRecord(config, channelId);
		return channel?.enabled !== false && hasMeaningfulChannelConfigShallow(channel);
	}).toSorted();
}
//#endregion
export { resolveChannelConfigActivationFacts as n, resolveChannelConfigRecord as r, hasMeaningfulChannelConfigShallow as t };
