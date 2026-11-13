import "./oauth-BZC1dWtw.mjs";
import "./store-BV2U29wE.mjs";
import "./profiles-CssUDvXQ.mjs";
import "./runtime-snapshots-CmtUlMVL.mjs";
import "./external-cli-discovery-DHQI45vG.mjs";
import "./order-Du3RLv_J.mjs";
import "./store-runtime-BpJB9uZ1.mjs";
import { n as resolveAuthProfileMetadata } from "./identity-D7AaFfyz.mjs";
import "./usage-ClokwkCu.mjs";
//#region src/agents/auth-profiles/display.ts
/** Builds the human-readable profile label used in status and auth listings. */
function resolveAuthProfileDisplayLabel(params) {
	const { displayName, email } = resolveAuthProfileMetadata(params);
	if (displayName) return `${params.profileId} (${displayName})`;
	if (email) return `${params.profileId} (${email})`;
	return params.profileId;
}
//#endregion
export { resolveAuthProfileDisplayLabel as t };
