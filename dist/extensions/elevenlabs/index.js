import { t as definePluginEntry } from "../../plugin-entry-BsETFXpv.mjs";
import { t as elevenLabsMediaUnderstandingProvider } from "../../media-understanding-provider-CM7SRvu9.mjs";
import { t as buildElevenLabsRealtimeTranscriptionProvider } from "../../realtime-transcription-provider-factory-CY_81CLC.mjs";
import { t as buildElevenLabsSpeechProvider } from "../../speech-provider-factory-f18hqZAo.mjs";
//#region extensions/elevenlabs/index.ts
var elevenlabs_default = definePluginEntry({
	id: "elevenlabs",
	name: "ElevenLabs Speech",
	description: "Bundled ElevenLabs speech provider",
	register(api) {
		api.registerSpeechProvider(buildElevenLabsSpeechProvider);
		api.registerMediaUnderstandingProvider(elevenLabsMediaUnderstandingProvider);
		api.registerRealtimeTranscriptionProvider(buildElevenLabsRealtimeTranscriptionProvider);
	}
});
//#endregion
export { elevenlabs_default as default };
