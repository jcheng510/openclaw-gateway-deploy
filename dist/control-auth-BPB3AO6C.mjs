import { l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import { r as resolveGatewayAuth } from "./auth-resolve-D9ECYnSv.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import "./runtime-config-snapshot-DPPwvFCZ.mjs";
import { t as ensureGatewayStartupAuth } from "./startup-auth-CVrlvMRc.mjs";
import "./gateway-runtime-Bj4ovX3U.mjs";
import { r as persistBrowserControlCredential } from "./config-mutations-BHwRSo4X.mjs";
import crypto from "node:crypto";
//#region extensions/browser/src/browser/control-auth.ts
/** Resolve browser-control auth material from config and environment. */
function resolveBrowserControlAuth(cfg, env = process.env) {
	const auth = resolveGatewayAuth({
		authConfig: cfg?.gateway?.auth,
		env,
		tailscaleMode: cfg?.gateway?.tailscale?.mode
	});
	const token = normalizeOptionalString(auth.token);
	const password = normalizeOptionalString(auth.password);
	switch (auth.mode) {
		case "password":
		case "trusted-proxy": return { password };
		case "token":
		case "none": return { token };
		default: return {};
	}
}
/** Return true when startup may auto-generate browser-control auth. */
function shouldAutoGenerateBrowserAuth(env) {
	if (normalizeLowercaseStringOrEmpty(env.NODE_ENV) === "test") return false;
	const vitest = normalizeLowercaseStringOrEmpty(env.VITEST);
	if (vitest && vitest !== "0" && vitest !== "false" && vitest !== "off") return false;
	return true;
}
function hasExplicitNonStringGatewayCredentialForMode(params) {
	const { cfg, mode } = params;
	const auth = cfg?.gateway?.auth;
	if (!auth) return false;
	if (mode === "none") return auth.token != null && typeof auth.token !== "string";
	return auth.password != null && typeof auth.password !== "string";
}
async function generateAndPersistBrowserControlCredential(params) {
	const credential = crypto.randomBytes(24).toString("hex");
	await persistBrowserControlCredential({
		kind: params.kind,
		value: credential
	});
	const persistedAuth = resolveBrowserControlAuth(getRuntimeConfig(), params.env);
	if (persistedAuth.token || persistedAuth.password) return {
		auth: persistedAuth,
		generatedToken: persistedAuth[params.kind] === credential ? credential : void 0
	};
	return {
		auth: { [params.kind]: credential },
		generatedToken: credential
	};
}
/** Ensure browser-control auth exists, generating and persisting it when allowed. */
async function ensureBrowserControlAuth(params) {
	const env = params.env ?? process.env;
	const auth = resolveBrowserControlAuth(params.cfg, env);
	if (auth.token || auth.password) return { auth };
	if (!shouldAutoGenerateBrowserAuth(env)) return { auth };
	if (params.cfg.gateway?.auth?.mode === "password") return { auth };
	const latestCfg = getRuntimeConfig();
	const latestAuth = resolveBrowserControlAuth(latestCfg, env);
	if (latestAuth.token || latestAuth.password) return { auth: latestAuth };
	if (latestCfg.gateway?.auth?.mode === "password") return { auth: latestAuth };
	const latestMode = latestCfg.gateway?.auth?.mode;
	if (latestMode === "none" || latestMode === "trusted-proxy") {
		if (hasExplicitNonStringGatewayCredentialForMode({
			cfg: latestCfg,
			mode: latestMode
		})) return { auth: latestAuth };
		return await generateAndPersistBrowserControlCredential({
			kind: latestMode === "trusted-proxy" ? "password" : "token",
			env
		});
	}
	const ensured = await ensureGatewayStartupAuth({
		cfg: latestCfg,
		env,
		persist: true
	});
	return {
		auth: {
			token: ensured.auth.token,
			password: ensured.auth.password
		},
		generatedToken: ensured.generatedToken
	};
}
//#endregion
export { resolveBrowserControlAuth as n, shouldAutoGenerateBrowserAuth as r, ensureBrowserControlAuth as t };
