import { a as createLazyRuntimeSurface } from "../../lazy-runtime-CJrzFzqU.mjs";
import { t as definePluginEntry } from "../../plugin-entry-BsETFXpv.mjs";
import { t as buildGoogleGeminiCliBackend } from "../../cli-backend-_dS2dNnJ.mjs";
import { t as buildGoogleGeminiCliProvider } from "../../gemini-cli-provider-CRqtJv-U.mjs";
import { d as createGoogleImageGenerationProviderMetadata, f as createGoogleMediaUnderstandingProviderMetadata, m as createGoogleVideoGenerationProviderMetadata, p as createGoogleMusicGenerationProviderMetadata } from "../../generation-provider-metadata-m74QAwTN.mjs";
import { t as geminiMemoryEmbeddingProviderAdapter } from "../../memory-embedding-adapter-5rjFBvtu.mjs";
import { t as buildGoogleProvider } from "../../provider-registration-BF1xASJC.mjs";
import { t as createLazyGoogleRealtimeVoiceProvider } from "../../realtime-voice-lazy-GWyU6PIa.mjs";
import { t as buildGoogleSpeechProvider } from "../../speech-provider-BbvyA0Tv.mjs";
import { t as createGeminiWebSearchProvider } from "../../gemini-web-search-provider-BAAjdXgC.mjs";
//#region extensions/google/index.ts
const loadGoogleImageGenerationProvider = createLazyRuntimeSurface(() => import("./image-generation-provider.js"), (mod) => mod.buildGoogleImageGenerationProvider());
const loadGoogleMediaUnderstandingProvider = createLazyRuntimeSurface(() => import("./media-understanding-provider.js"), (mod) => mod.googleMediaUnderstandingProvider);
const loadGoogleMusicGenerationProvider = createLazyRuntimeSurface(() => import("./music-generation-provider.js"), (mod) => mod.buildGoogleMusicGenerationProvider());
const loadGoogleVideoGenerationProvider = createLazyRuntimeSurface(() => import("./video-generation-provider.js"), (mod) => mod.buildGoogleVideoGenerationProvider());
var google_default = definePluginEntry({
	id: "google",
	name: "Google Plugin",
	description: "Bundled Google plugin",
	register(api) {
		api.registerCliBackend(buildGoogleGeminiCliBackend());
		api.registerProvider(buildGoogleGeminiCliProvider());
		api.registerProvider(buildGoogleProvider());
		api.registerEmbeddingProvider(geminiMemoryEmbeddingProviderAdapter);
		api.registerImageGenerationProvider({
			...createGoogleImageGenerationProviderMetadata(),
			generateImage: async (req) => (await loadGoogleImageGenerationProvider()).generateImage(req)
		});
		api.registerMediaUnderstandingProvider({
			...createGoogleMediaUnderstandingProviderMetadata(),
			transcribeAudio: async (...args) => (await loadGoogleMediaUnderstandingProvider()).transcribeAudio(...args),
			describeVideo: async (...args) => (await loadGoogleMediaUnderstandingProvider()).describeVideo(...args)
		});
		api.registerMusicGenerationProvider({
			...createGoogleMusicGenerationProviderMetadata(),
			generateMusic: async (req) => (await loadGoogleMusicGenerationProvider()).generateMusic(req)
		});
		api.registerRealtimeVoiceProvider(createLazyGoogleRealtimeVoiceProvider());
		api.registerSpeechProvider(buildGoogleSpeechProvider());
		api.registerVideoGenerationProvider({
			...createGoogleVideoGenerationProviderMetadata(),
			generateVideo: async (req) => (await loadGoogleVideoGenerationProvider()).generateVideo(req)
		});
		api.registerWebSearchProvider(createGeminiWebSearchProvider());
	}
});
//#endregion
export { google_default as default };
