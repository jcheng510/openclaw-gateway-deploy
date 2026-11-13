import { t as ADMIN_SCOPE } from "./operator-scopes-D-CL26h0.mjs";
import { i as GATEWAY_CLIENT_NAMES, r as GATEWAY_CLIENT_MODES } from "./client-info-S_xwnr2o.mjs";
import { a as roleScopesAllow } from "./operator-scope-compat-Ci6GBcmU.mjs";
import { o as publicKeyRawBase64UrlFromPem, r as loadOrCreateDeviceIdentity } from "./device-identity-CkZMmlTW.mjs";
import { d as storeDeviceAuthToken } from "./device-auth-store-Df72yJrR.mjs";
import { t as resolveGatewayClientPlatformIdentity } from "./gateway-client-platform-h2QbDjYZ.mjs";
import { t as getPairedDevice, u as requestDevicePairing } from "./device-pairing-CmhQf_CF.mjs";
import { n as approveDevicePairing } from "./device-pairing-approval-BwdCs1md.mjs";
//#region src/gateway/startup-local-cli-pairing.ts
async function cacheOperatorToken(params) {
	const token = params.paired?.tokens?.operator;
	if (!token?.token || !roleScopesAllow({
		role: "operator",
		requestedScopes: ["operator.admin"],
		allowedScopes: token.scopes
	})) return false;
	await storeDeviceAuthToken({
		deviceId: params.deviceId,
		role: "operator",
		token: token.token,
		scopes: token.scopes
	});
	return true;
}
/**
* Runtime-only auth has no shared secret a sibling CLI process can read. Bind
* the canonical same-user device identity before readiness instead, preserving
* authenticated loopback access without writing generated auth into config.
*/
async function ensureStartupLocalCliPairing() {
	const identity = loadOrCreateDeviceIdentity();
	const publicKey = publicKeyRawBase64UrlFromPem(identity.publicKeyPem);
	const existing = await getPairedDevice(identity.deviceId);
	if (existing) {
		if (existing.publicKey !== publicKey) throw new Error("local CLI pairing identity does not match the canonical device key");
		return await cacheOperatorToken({
			deviceId: identity.deviceId,
			paired: existing
		}) ? "reused" : "unavailable";
	}
	const pairing = await requestDevicePairing({
		deviceId: identity.deviceId,
		publicKey,
		displayName: "OpenClaw CLI",
		...resolveGatewayClientPlatformIdentity(process.platform),
		clientId: GATEWAY_CLIENT_NAMES.CLI,
		clientMode: GATEWAY_CLIENT_MODES.CLI,
		role: "operator",
		scopes: [ADMIN_SCOPE],
		remoteIp: "127.0.0.1",
		silent: true
	});
	const approved = await approveDevicePairing(pairing.request.requestId, {
		callerScopes: [ADMIN_SCOPE],
		approvedVia: "silent",
		accessMetadata: {
			displayName: "OpenClaw CLI",
			remoteIp: "127.0.0.1",
			lastSeenAtMs: Date.now(),
			lastSeenReason: "runtime-token-startup"
		}
	});
	if (approved?.status === "approved") {
		if (!await cacheOperatorToken({
			deviceId: identity.deviceId,
			paired: approved.device
		})) throw new Error("local CLI pairing approval did not issue an operator token");
		return "created";
	}
	const pairedAfterApproval = await getPairedDevice(identity.deviceId);
	if (pairedAfterApproval?.publicKey === publicKey && await cacheOperatorToken({
		deviceId: identity.deviceId,
		paired: pairedAfterApproval
	})) return "reused";
	return "unavailable";
}
//#endregion
export { ensureStartupLocalCliPairing };
