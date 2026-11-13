import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { t as resolveLegacyOutboundSendDepKeys } from "./send-deps-BMukjUa9.mjs";
//#region src/cli/outbound-send-mapping.ts
function resolveChannelIdFromLegacySourceKey(key) {
	const match = key.match(/^sendMessage(.+)$/);
	if (!match) return;
	return normalizeLowercaseStringOrEmpty(match[1]).replace(/[-_]/g, "") || void 0;
}
/** Preserve explicit dependencies while filling channel and legacy aliases. */
function createOutboundSendDepsFromCliSource(deps) {
	const outbound = { ...deps };
	for (const legacySourceKey of Object.keys(deps)) {
		const channelId = resolveChannelIdFromLegacySourceKey(legacySourceKey);
		if (!channelId) continue;
		const sourceValue = deps[legacySourceKey];
		if (sourceValue !== void 0 && outbound[channelId] === void 0) outbound[channelId] = sourceValue;
	}
	for (const channelId of Object.keys(outbound)) {
		const sourceValue = outbound[channelId];
		if (sourceValue === void 0) continue;
		for (const legacyDepKey of resolveLegacyOutboundSendDepKeys(channelId)) if (outbound[legacyDepKey] === void 0) outbound[legacyDepKey] = sourceValue;
	}
	return outbound;
}
//#endregion
export { createOutboundSendDepsFromCliSource as t };
