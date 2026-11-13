import { i as normalizeChannelId, t as getChannelPlugin } from "./registry-C-O7Iq84.mjs";
//#region src/channels/plugins/tts-capabilities.ts
function resolveChannelTtsVoiceDelivery(channel) {
	const channelId = normalizeChannelId(channel);
	if (!channelId) return;
	return getChannelPlugin(channelId)?.capabilities.tts?.voice;
}
//#endregion
export { resolveChannelTtsVoiceDelivery as t };
