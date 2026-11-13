import { u as upsertAuthProfileWithLockOrThrow } from "./profiles-CssUDvXQ.mjs";
import { t as applyPrimaryModel } from "./provider-model-primary-DhFI720j.mjs";
import { n as buildApiKeyCredential, t as applyAuthProfileConfig } from "./provider-auth-helpers-BGg9ZlUJ.mjs";
import { c as validateApiKeyInput, i as normalizeApiKeyInput, n as ensureApiKeyFromOptionEnvOrPrompt } from "./provider-auth-input-zO_onUrN.mjs";
//#region src/plugins/provider-api-key-auth.runtime.ts
/** Runtime API-key auth helper bundle exposed to provider setup code. */
const providerApiKeyAuthRuntime = {
	upsertAuthProfileWithLockOrThrow,
	applyAuthProfileConfig,
	applyPrimaryModel,
	buildApiKeyCredential,
	ensureApiKeyFromOptionEnvOrPrompt,
	normalizeApiKeyInput,
	validateApiKeyInput
};
//#endregion
export { providerApiKeyAuthRuntime };
