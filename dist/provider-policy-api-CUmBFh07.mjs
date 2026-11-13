import { d as resolveClaudeMythos5ModelIdentity, u as resolveClaudeModelIdentity } from "./anthropic-BosOSZ2f.mjs";
import { n as resolveClaudeThinkingProfile } from "./provider-claude-thinking-B0ojN0I1.mjs";
import { l as CLAUDE_CLI_OFF_THINKING_PROFILE, u as CLAUDE_CLI_PROFILE_ID } from "./cli-constants-DGQcCbXK.mjs";
import { n as normalizeAnthropicProviderConfigForProvider } from "./config-defaults-BsJgflVL.mjs";
//#region extensions/anthropic/provider-policy-api.ts
/**
* Provider-policy API for Anthropic and Claude CLI. Core calls this lightweight
* path for config defaults and thinking profiles.
*/
const normalizeConfig = normalizeAnthropicProviderConfigForProvider;
/** Profile ids that native Claude auth has retired from OpenClaw ownership. */
const deprecatedProfileIds = [CLAUDE_CLI_PROFILE_ID];
/** Resolve Claude thinking profile for Anthropic or Claude CLI providers. */
function resolveThinkingProfile(params) {
	const contractModelId = resolveClaudeModelIdentity({
		id: params.modelId,
		params: params.params
	});
	const provider = params.provider.trim().toLowerCase();
	switch (provider) {
		case "anthropic":
		case "claude-cli":
			if (provider === "claude-cli" && resolveClaudeMythos5ModelIdentity({ id: contractModelId })) return CLAUDE_CLI_OFF_THINKING_PROFILE;
			return resolveClaudeThinkingProfile(contractModelId, void 0, { includeNativeMax: true });
		default: return null;
	}
}
//#endregion
export { normalizeConfig as n, resolveThinkingProfile as r, deprecatedProfileIds as t };
