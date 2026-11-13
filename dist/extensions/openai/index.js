import { c as resolveGpt5SystemPromptContribution, s as resolveGpt5PromptOverlayMode } from "../../gpt5-prompt-overlay-4NAHljmU.mjs";
import { t as definePluginEntry } from "../../plugin-entry-BsETFXpv.mjs";
import { r as resolvePluginConfigObject } from "../../plugin-config-runtime-D_KiiATx.mjs";
import "../../provider-model-metadata-0pSvKXb_.mjs";
import { r as buildProviderToolCompatFamilyHooks } from "../../provider-tools-CQ4ILRNN.mjs";
import { t as buildOpenAIImageGenerationProvider } from "../../image-generation-provider-DIL95N-R.mjs";
import { t as openaiMediaUnderstandingProvider } from "../../media-understanding-provider-Bg9eo4R9.mjs";
import { t as openAiMemoryEmbeddingProviderAdapter } from "../../memory-embedding-adapter-C1CW_JvQ.mjs";
import { t as buildOpenAIProvider } from "../../openai-provider-BPBUqhq9.mjs";
import { t as OPENAI_QUICKSILVER_OFFER_PATH } from "../../realtime-quicksilver-session-DPeQyKs7.mjs";
import { n as releaseOpenAIQuicksilverBrowserSessionBroker, t as acquireOpenAIQuicksilverBrowserSessionBroker } from "../../realtime-quicksilver-session-owner-AhMz-EUe.mjs";
import { t as buildOpenAIRealtimeTranscriptionProvider } from "../../realtime-transcription-provider-factory-01Klu1BD.mjs";
import { t as buildOpenAIRealtimeVoiceProvider } from "../../realtime-voice-provider-factory-0Pnm_3hz.mjs";
import { t as buildOpenAISpeechProvider } from "../../speech-provider-CzCRLW2s.mjs";
//#region extensions/openai/index.ts
var openai_default = definePluginEntry({
	id: "openai",
	name: "OpenAI Provider",
	description: "Bundled OpenAI provider plugins",
	register(api) {
		const { ensureAuthProfileStore, listProfilesForProvider, isProviderApiKeyConfigured } = api.runtime.modelAuth;
		const openAIToolCompatHooks = buildProviderToolCompatFamilyHooks("openai");
		const provider = buildOpenAIProvider();
		api.registerProvider({
			...provider,
			...openAIToolCompatHooks,
			resolveSystemPromptContribution: (ctx) => {
				const pluginConfig = resolvePluginConfigObject(ctx.config, "openai") ?? (ctx.config ? void 0 : api.pluginConfig);
				return resolveGpt5SystemPromptContribution({
					config: ctx.config,
					legacyPluginConfig: { personality: resolveGpt5PromptOverlayMode(void 0, pluginConfig) },
					modelId: ctx.modelId,
					trigger: ctx.trigger
				});
			}
		});
		api.registerEmbeddingProvider(openAiMemoryEmbeddingProviderAdapter);
		api.registerImageGenerationProvider(buildOpenAIImageGenerationProvider({
			ensureAuthProfileStore,
			listProfilesForProvider,
			isProviderApiKeyConfigured
		}));
		api.registerRealtimeTranscriptionProvider(buildOpenAIRealtimeTranscriptionProvider);
		api.registerRealtimeVoiceProvider((context) => {
			const quicksilverSession = api.registrationMode === "full" ? acquireOpenAIQuicksilverBrowserSessionBroker({
				getConfig: () => api.runtime.config.current(),
				logger: api.logger
			}, context) : void 0;
			if (quicksilverSession) {
				api.registerHttpRoute({
					path: OPENAI_QUICKSILVER_OFFER_PATH,
					auth: "plugin",
					match: "exact",
					handler: quicksilverSession.handler
				});
				api.lifecycle.registerRuntimeLifecycle({
					id: "openai-quicksilver-realtime-browser-session",
					description: "Close OpenAI browser sidebands when the plugin stops",
					cleanup: (ctx) => {
						if (ctx.reason !== "disable") return;
						return releaseOpenAIQuicksilverBrowserSessionBroker(quicksilverSession);
					}
				});
			}
			return buildOpenAIRealtimeVoiceProvider(context, {
				quicksilverBrowserSessionBroker: quicksilverSession?.broker,
				logger: api.logger
			});
		});
		api.registerSpeechProvider(buildOpenAISpeechProvider());
		api.registerMediaUnderstandingProvider(openaiMediaUnderstandingProvider);
	}
});
//#endregion
export { openai_default as default };
