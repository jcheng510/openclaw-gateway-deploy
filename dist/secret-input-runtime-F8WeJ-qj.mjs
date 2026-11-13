import { a as getPluginRuntimeGatewayRequestScope } from "./gateway-request-scope-Da9jAC9_.mjs";
import { i as parseConcreteConfigPathTokens, n as formatConcreteConfigPath } from "./dot-path-CVD5Jolm.mjs";
import { a as coerceSecretRef } from "./types.secrets-BXEuin38.mjs";
import { s as getAuthoredConfigSecretRef } from "./resolution-facts-CYe39-eJ.mjs";
import { o as hasCurrentPluginInstanceAuthority } from "./plugin-instance-scope-Cj8gR6lP.mjs";
import { r as assertSecretOwnerAvailable, u as isSecretOwnerAvailable } from "./runtime-degraded-state-oevwKU3u.mjs";
import { l as getActiveSecretsRuntimeSnapshotRevisionState, o as getActiveSecretsRuntimeConfigSnapshot } from "./runtime-state-I0A0iuwu.mjs";
import "./resolve-configured-secret-input-string-VtvwIUX3.mjs";
//#region src/secrets/prepared-plugin-input.ts
/** Read a manifest-prepared capability credential. Never resolves a cold reference or environment. */
function getPreparedPluginSecretInput(pluginId, path) {
	const revision = getActiveSecretsRuntimeSnapshotRevisionState();
	if (getPluginRuntimeGatewayRequestScope()?.pluginId !== pluginId || !hasCurrentPluginInstanceAuthority(pluginId)) return { revision };
	const snapshot = getActiveSecretsRuntimeConfigSnapshot();
	if (!snapshot?.configRefsPrepared || snapshot.config.plugins?.enabled === false || snapshot.config.plugins?.entries?.[pluginId]?.enabled === false) return { revision };
	const tokens = [
		"plugins",
		"entries",
		pluginId,
		"config",
		...parseConcreteConfigPathTokens(path)
	];
	const fullPath = formatConcreteConfigPath(tokens);
	if (!isSecretOwnerAvailable("capability", fullPath)) return { revision };
	const read = (root) => {
		let value = root;
		for (const token of tokens) {
			if (!value || typeof value !== "object" || !Object.hasOwn(value, token)) return;
			value = Reflect.get(value, token);
		}
		return value;
	};
	const source = read(snapshot.sourceConfig);
	if (!coerceSecretRef(source, snapshot.sourceConfig.secrets?.defaults) && !getAuthoredConfigSecretRef(snapshot.sourceConfig, fullPath)) return { revision };
	const value = read(snapshot.config);
	return typeof value === "string" && value.trim() ? {
		value,
		revision
	} : { revision };
}
//#endregion
//#region src/plugin-sdk/secret-input-runtime.ts
/**
* Runtime SDK subpath for secret input normalization and configured secret resolution.
*/
/** Reject use of a manifest-owned plugin capability whose startup secret is unavailable. */
function assertPluginCapabilitySecretAvailable(ownerId) {
	assertSecretOwnerAvailable("capability", ownerId);
}
//#endregion
export { getPreparedPluginSecretInput as n, assertPluginCapabilitySecretAvailable as t };
