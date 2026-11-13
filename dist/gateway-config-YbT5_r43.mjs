import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { a as createGatewayEnvSecretRef, l as isValidEnvSecretRefId } from "./ref-contract-D0kWy5jy.mjs";
import { p as resolveSecretInputRef } from "./types.secrets-BXEuin38.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { r as formatInvalidPortOption } from "./error-format-DiuKk5bW.mjs";
import { t as randomToken } from "./random-token-B1woZa_H.mjs";
import { s as normalizeGatewayTokenInput } from "./onboard-helpers-N8In1kzD.mjs";
import { t as validateDottedDecimalIPv4Input } from "./ipv4-BKy_pO1_.mjs";
import { t as rejectOnboardingOption } from "./onboard-options-BCCsdqTN.mjs";
import { t as provisionGatewayTokenStoreRef } from "./auth-token-store-ref-BsmDfnjS.mjs";
//#region src/commands/onboard-non-interactive/local/gateway-config.ts
/**
* Gateway config mutation for local non-interactive onboarding.
*
* This module owns port/bind/auth validation and existing-setting preservation
* before the final config write happens.
*/
/** Resolves what `gateway.auth.token` should hold once setup owns the token value. */
function resolveGeneratedTokenInput(params) {
	if (params.secretInputMode !== "ref") return params.token ?? randomToken();
	if (params.ambientEnvOnly) return createGatewayEnvSecretRef(params.config, "OPENCLAW_GATEWAY_TOKEN");
	return provisionGatewayTokenStoreRef({
		config: params.config,
		...params.token ? { token: params.token } : {}
	}).ref;
}
/** Applies gateway CLI options to the pending config and returns normalized runtime settings. */
function applyNonInteractiveGatewayConfig(params) {
	const { opts, runtime } = params;
	const gatewayPort = opts.gatewayPort;
	if (gatewayPort !== void 0 && (!Number.isFinite(gatewayPort) || gatewayPort <= 0 || gatewayPort > 65535)) {
		rejectOnboardingOption(opts, runtime, formatInvalidPortOption("--gateway-port"));
		return null;
	}
	const existingGateway = params.nextConfig.gateway;
	const port = gatewayPort ?? params.defaultPort;
	let bind = opts.gatewayBind ?? existingGateway?.bind ?? "loopback";
	const explicitAuthMode = opts.gatewayAuth;
	if (explicitAuthMode !== void 0 && explicitAuthMode !== "token" && explicitAuthMode !== "password") {
		rejectOnboardingOption(opts, runtime, "Invalid --gateway-auth. Use \"token\" or \"password\".");
		return null;
	}
	const hasExplicitTokenAuthInput = opts.gatewayToken !== void 0 || opts.gatewayTokenRefEnv !== void 0;
	let authMode = explicitAuthMode ?? (hasExplicitTokenAuthInput ? "token" : opts.gatewayPassword !== void 0 ? "password" : existingGateway?.auth?.mode) ?? "token";
	const tailscaleMode = opts.tailscale ?? existingGateway?.tailscale?.mode ?? "off";
	if ((opts.gatewayBind !== void 0 || opts.tailscale !== void 0) && tailscaleMode !== "off" && bind !== "loopback") bind = "loopback";
	if (bind === "custom") {
		const customBindHostIssue = validateDottedDecimalIPv4Input(normalizeOptionalString(existingGateway?.customBindHost ?? ""));
		if (customBindHostIssue) {
			const setCommand = formatCliCommand("openclaw config set gateway.customBindHost <ipv4>");
			const interactiveCommand = formatCliCommand("openclaw onboard");
			rejectOnboardingOption(opts, runtime, `--gateway-bind custom requires gateway.customBindHost: ${customBindHostIssue}. Set it with ${setCommand} and rerun, or run ${interactiveCommand} interactively to be prompted for it.`);
			return null;
		}
	}
	const changesAuthOrTailscale = explicitAuthMode !== void 0 || hasExplicitTokenAuthInput || opts.tailscale !== void 0;
	if (changesAuthOrTailscale && tailscaleMode === "serve" && authMode === "none") authMode = "token";
	if (changesAuthOrTailscale && tailscaleMode === "funnel" && authMode !== "password") authMode = "password";
	const nextConfig = params.nextConfig;
	let auth = existingGateway?.auth;
	const explicitGatewayToken = normalizeGatewayTokenInput(opts.gatewayToken);
	const envGatewayToken = normalizeGatewayTokenInput(process.env.OPENCLAW_GATEWAY_TOKEN);
	const existingTokenInput = nextConfig.gateway?.auth?.token;
	const existingTokenRef = resolveSecretInputRef({
		value: existingTokenInput,
		defaults: nextConfig.secrets?.defaults
	}).ref;
	const existingPlaintextToken = normalizeGatewayTokenInput(existingTokenInput);
	const gatewayToken = explicitGatewayToken || existingPlaintextToken || envGatewayToken || void 0;
	const gatewayTokenRefEnv = normalizeOptionalString(opts.gatewayTokenRefEnv ?? "") ?? "";
	if (authMode === "token") {
		auth = {
			...auth,
			mode: "token"
		};
		if (gatewayTokenRefEnv) {
			if (!isValidEnvSecretRefId(gatewayTokenRefEnv)) {
				rejectOnboardingOption(opts, runtime, "Invalid --gateway-token-ref-env. Use an environment variable name like OPENCLAW_GATEWAY_TOKEN.");
				return null;
			}
			if (explicitGatewayToken) {
				rejectOnboardingOption(opts, runtime, "Use either --gateway-token or --gateway-token-ref-env, not both. Prefer --gateway-token-ref-env to avoid writing plaintext tokens.");
				return null;
			}
			if (!process.env[gatewayTokenRefEnv]?.trim()) {
				rejectOnboardingOption(opts, runtime, `Environment variable "${gatewayTokenRefEnv}" is missing or empty. Export it first, then rerun ${formatCliCommand("openclaw onboard --non-interactive")}.`);
				return null;
			}
			auth.token = createGatewayEnvSecretRef(nextConfig, gatewayTokenRefEnv);
		} else if (explicitGatewayToken || !existingTokenRef) auth.token = resolveGeneratedTokenInput({
			config: nextConfig,
			secretInputMode: opts.secretInputMode,
			token: gatewayToken,
			ambientEnvOnly: !explicitGatewayToken && !existingPlaintextToken && Boolean(envGatewayToken)
		});
	}
	if (authMode === "password") {
		const input = opts.gatewayPassword;
		const password = input === void 0 ? nextConfig.gateway?.auth?.password ?? normalizeOptionalString(process.env.OPENCLAW_GATEWAY_PASSWORD) : normalizeOptionalString(input);
		if (!password) {
			rejectOnboardingOption(opts, runtime, "Missing --gateway-password for password auth. Pass --gateway-password or use --gateway-auth token.");
			return null;
		}
		auth = {
			...auth,
			mode: "password",
			...input !== void 0 ? { password: opts.secretInputMode === "ref" ? createGatewayEnvSecretRef(nextConfig, "OPENCLAW_GATEWAY_PASSWORD") : password } : {}
		};
	}
	return {
		nextConfig: {
			...nextConfig,
			gateway: {
				...existingGateway,
				...auth ? { auth } : {},
				port,
				bind,
				tailscale: {
					...existingGateway?.tailscale,
					mode: tailscaleMode
				}
			}
		},
		port,
		bind,
		authMode,
		tailscaleMode
	};
}
//#endregion
export { applyNonInteractiveGatewayConfig as t };
