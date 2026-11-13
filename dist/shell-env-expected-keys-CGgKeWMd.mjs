import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { n as listKnownChannelEnvVarNames } from "./channel-env-vars-BNKLQpCu.mjs";
import { r as listKnownProviderAuthEnvVarNamesCore } from "./provider-env-vars-BPrlF8Sq.mjs";
//#region src/config/shell-env-expected-keys.ts
const CORE_SHELL_ENV_EXPECTED_KEYS = ["OPENCLAW_GATEWAY_TOKEN", "OPENCLAW_GATEWAY_PASSWORD"];
/** Includes configured plugin paths when selecting keys for login-shell import. */
function resolveShellEnvExpectedKeys(env, config) {
	return uniqueStrings([
		...listKnownProviderAuthEnvVarNamesCore({
			config,
			env
		}),
		...listKnownChannelEnvVarNames({
			config,
			env
		}),
		...CORE_SHELL_ENV_EXPECTED_KEYS
	]);
}
//#endregion
export { resolveShellEnvExpectedKeys as t };
