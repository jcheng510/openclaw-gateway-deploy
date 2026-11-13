import { i as ProviderPlugin, t as CliBackendPlugin } from "../../cli-backend.types-EMzB3xUc.js";
import "../../provider-model-shared-0zXsfvUq.js";
import { a as resolveAnthropicFastMode, i as resolveAnthropicBetas, n as createAnthropicFastModeWrapper, o as resolveAnthropicServiceTier, r as createAnthropicServiceTierWrapper, s as wrapAnthropicProviderStream, t as createAnthropicBetaHeadersWrapper } from "../../stream-wrappers-CE_R9xpG.js";
//#region extensions/anthropic/cli-constants.d.ts
export declare const CLAUDE_CLI_BACKEND_ID = "claude-cli";
//#endregion
//#region extensions/anthropic/cli-shared.d.ts
export declare function isClaudeCliProvider(providerId: string): boolean;
//#endregion
//#region extensions/anthropic/cli-backend.d.ts
export declare function buildAnthropicCliBackend(options?: {
  ensureDynamicSystemPromptSectionsSupport?: () => Promise<void>;
  supportsDynamicSystemPromptSections?: () => boolean;
}): CliBackendPlugin;
//#endregion
//#region extensions/anthropic/register.runtime.d.ts
export declare function buildAnthropicProvider(): ProviderPlugin;
//#endregion
export { createAnthropicBetaHeadersWrapper, createAnthropicFastModeWrapper, createAnthropicServiceTierWrapper, resolveAnthropicBetas, resolveAnthropicFastMode, resolveAnthropicServiceTier, wrapAnthropicProviderStream };