import { r as trimToUndefined } from "./credential-planner-CU341-Uq.mjs";
import "./credentials-C36Kyy_Y.mjs";
import { n as resolveConfiguredSecretInputWithFallback } from "./resolve-configured-secret-input-string-VtvwIUX3.mjs";
//#region src/gateway/auth-token-resolution.ts
/** Resolves gateway.auth.token with configurable env fallback and SecretRef diagnostics. */
async function resolveGatewayAuthToken(params) {
	const explicitToken = trimToUndefined(params.explicitToken);
	if (explicitToken) return {
		token: explicitToken,
		source: "explicit",
		secretRefConfigured: false
	};
	const resolved = await resolveConfiguredSecretInputWithFallback({
		config: params.cfg,
		env: params.env,
		value: params.cfg.gateway?.auth?.token,
		path: "gateway.auth.token",
		unresolvedReasonStyle: params.unresolvedReasonStyle,
		...params.envFallback !== "never" ? { readFallback: () => params.env.OPENCLAW_GATEWAY_TOKEN } : {}
	});
	return {
		...resolved.value ? { token: resolved.value } : {},
		...resolved.source ? { source: resolved.source === "fallback" ? "env" : resolved.source } : {},
		secretRefConfigured: resolved.secretRefConfigured,
		...resolved.unresolvedRefReason ? { unresolvedRefReason: resolved.unresolvedRefReason } : {},
		...resolved.unresolvedRefCode ? { unresolvedRefCode: resolved.unresolvedRefCode } : {}
	};
}
//#endregion
export { resolveGatewayAuthToken as t };
