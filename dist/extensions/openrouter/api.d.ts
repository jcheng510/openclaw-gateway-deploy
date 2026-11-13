import { ia as OpenClawConfig, ua as ModelProviderDeclarationConfig } from "../../config-contracts-LN7GOWFb.js";
import { Ht as SpeechProviderPlugin, Ut as MusicGenerationProvider, Wt as ImageGenerationProvider } from "../../runtime-api-CrlhpSXA.js";
import "../../provider-model-shared-vTls5CPj.js";
import "../../provider-onboard-cRcDNzR6.js";
import "@openclaw/ai/internal/shared";
//#region extensions/openrouter/image-generation-provider.d.ts
export declare function buildOpenRouterImageGenerationProvider(): ImageGenerationProvider;
//#endregion
//#region extensions/openrouter/music-generation-provider.d.ts
export declare function buildOpenRouterMusicGenerationProvider(): MusicGenerationProvider;
//#endregion
//#region extensions/openrouter/provider-catalog.d.ts
export declare function isOpenRouterProxyReasoningUnsupportedModel(modelId: string | undefined): boolean;
export declare function buildOpenrouterProvider(): ModelProviderDeclarationConfig;
//#endregion
//#region extensions/openrouter/speech-provider.d.ts
export declare function buildOpenRouterSpeechProvider(): SpeechProviderPlugin;
//#endregion
//#region extensions/openrouter/onboard.d.ts
export declare const OPENROUTER_DEFAULT_MODEL_REF = "openrouter/auto";
export declare function applyOpenrouterProviderConfig(cfg: OpenClawConfig): OpenClawConfig;
export declare function applyOpenrouterConfig(cfg: OpenClawConfig): OpenClawConfig;
//#endregion