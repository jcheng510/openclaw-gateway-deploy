import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { r as resolveProviderAuthAliasMap } from "./provider-auth-aliases-jv_ENzum.mjs";
import { i as resolveManifestProviderAuthChoices } from "./provider-auth-choices-BYjVKu6M.mjs";
//#region src/agents/provider-auth-recovery-hint.ts
/**
* Provider authentication recovery hint builder.
*
* Prefers plugin manifest login commands, then falls back to configure/env-var guidance.
*/
function normalizeProviderIdForAuth(providerId, aliases) {
	const normalized = normalizeProviderId(providerId);
	return normalized ? aliases[normalized] ?? normalized : normalized;
}
function resolveProviderAuthLoginCommand(params) {
	const aliases = resolveProviderAuthAliasMap(params);
	const normalized = normalizeProviderIdForAuth(params.provider, aliases);
	const choice = resolveManifestProviderAuthChoices(params).find((candidate) => normalized && normalizeProviderIdForAuth(candidate.providerId, aliases) === normalized);
	if (!choice) return;
	const providerId = normalizeProviderIdForAuth(choice.providerId, aliases);
	return formatCliCommand(`openclaw models auth login --provider ${providerId}`);
}
/** Build a concise user-facing hint for recovering provider authentication. */
function buildProviderAuthRecoveryHint(params) {
	const loginCommand = resolveProviderAuthLoginCommand(params);
	const parts = [];
	if (loginCommand) parts.push(`Run \`${loginCommand}\``);
	if (params.includeConfigure !== false) parts.push(`\`${formatCliCommand("openclaw configure")}\``);
	if (params.includeEnvVar) parts.push("set an API key env var");
	if (parts.length === 0) return `Run \`${formatCliCommand("openclaw configure")}\`.`;
	if (parts.length === 1) return `${parts[0]}.`;
	if (parts.length === 2) return `${parts[0]} or ${parts[1]}.`;
	return `${parts[0]}, ${parts[1]}, or ${parts[2]}.`;
}
//#endregion
export { buildProviderAuthRecoveryHint as t };
