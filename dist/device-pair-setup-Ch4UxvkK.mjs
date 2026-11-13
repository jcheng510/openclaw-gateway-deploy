import { i as runCommandWithTimeout } from "./exec-Bjx7k3vE.mjs";
import { Mt as validateDevicePairSetupCodeParams, Nt as validateDevicePairSetupStatusParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { s as isLoopbackHost } from "./net-BD0odJBF.mjs";
import { a as NODE_PAIRING_SETUP_BOOTSTRAP_PROFILE, o as PAIRING_SETUP_BOOTSTRAP_PROFILE, s as VOICE_NODE_PAIRING_SETUP_BOOTSTRAP_PROFILE } from "./device-bootstrap-profile-DV7lvW3L.mjs";
import { n as renderQrPngDataUrl } from "./qr-image-Gsr0r1z5.mjs";
import { u as readDevicePairSetupCompletion } from "./device-bootstrap-CYq2QTOv.mjs";
import { i as resolveConfiguredPairingPublicUrl, o as resolvePairingSetupFromConfig, r as encodePairingSetupCode } from "./setup-code-9lPnaxhu.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { n as registerDevicePairingJoinCode } from "./device-pairing-join-code-BXCR473G.mjs";
import { n as respondUnavailableOnThrow } from "./response-DHZKYspK.mjs";
//#region src/gateway/server-methods/device-pair-setup.ts
const MAX_QR_DATA_URL_LENGTH = 16384;
function resolveDevicePairingJoinBaseUrl(payload) {
	for (const candidate of payload.urls ?? [payload.url]) {
		const parsed = new URL(candidate);
		if (parsed.protocol === "wss:") {
			parsed.protocol = "https:";
			return parsed;
		}
		if (parsed.protocol === "ws:" && isLoopbackHost(parsed.hostname)) {
			parsed.protocol = "http:";
			return parsed;
		}
	}
	throw new Error("Join URLs require a TLS gateway endpoint, except for loopback. Use the setup code directly for plaintext LAN pairing.");
}
/** Gateway handler for producing a device-pairing setup code + connect QR. */
const devicePairSetupHandlers = {
	"device.pair.setupCode": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateDevicePairSetupCodeParams, "device.pair.setupCode", respond)) return;
		await respondUnavailableOnThrow(respond, async () => {
			if (params.joinUrl === true && params.bootstrapProfile !== void 0 && params.bootstrapProfile !== "node") {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "Join URLs require bootstrapProfile=node."));
				return;
			}
			const config = context.getRuntimeConfig();
			const requestPublicUrl = typeof params.publicUrl === "string" ? params.publicUrl : void 0;
			const configuredPublicUrl = params.preferRemoteUrl === true ? void 0 : resolveConfiguredPairingPublicUrl(config);
			const publicUrl = requestPublicUrl ?? configuredPublicUrl;
			const resolved = await resolvePairingSetupFromConfig(config, {
				env: process.env,
				publicUrl,
				preferRemoteUrl: params.preferRemoteUrl === true,
				useLocalGateway: config.gateway?.mode === "remote" && params.preferRemoteUrl !== true,
				localTlsFingerprint: context.gatewayTlsFingerprint,
				...params.joinUrl === true || params.bootstrapProfile ? { bootstrapProfile: params.joinUrl === true || params.bootstrapProfile === "node" ? NODE_PAIRING_SETUP_BOOTSTRAP_PROFILE : params.bootstrapProfile === "voice-node" ? VOICE_NODE_PAIRING_SETUP_BOOTSTRAP_PROFILE : PAIRING_SETUP_BOOTSTRAP_PROFILE } : {},
				runCommandWithTimeout: async (argv, runOpts) => await runCommandWithTimeout(argv, { timeoutMs: runOpts.timeoutMs })
			});
			if (!resolved.ok) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, resolved.error));
				return;
			}
			const setupCode = encodePairingSetupCode(resolved.payload);
			let joinUrl;
			if (params.joinUrl === true) {
				const parsedJoinUrl = resolveDevicePairingJoinBaseUrl(resolved.payload);
				const shortcode = registerDevicePairingJoinCode({
					payload: resolved.payload,
					expiresAtMs: resolved.expiresAtMs
				});
				parsedJoinUrl.pathname = `${parsedJoinUrl.pathname.replace(/\/+$/u, "")}/j/${shortcode}`;
				parsedJoinUrl.search = "";
				parsedJoinUrl.hash = "";
				joinUrl = parsedJoinUrl.toString();
			}
			const renderedQr = params.includeQr !== false ? await renderQrPngDataUrl(setupCode).catch(() => void 0) : void 0;
			const qrDataUrl = renderedQr && renderedQr.length <= MAX_QR_DATA_URL_LENGTH ? renderedQr : void 0;
			respond(true, {
				setupId: resolved.setupId,
				expiresAtMs: resolved.expiresAtMs,
				setupCode,
				...joinUrl ? { joinUrl } : {},
				...qrDataUrl ? { qrDataUrl } : {},
				gatewayUrl: resolved.payload.url,
				...resolved.payload.urls ? { gatewayUrls: resolved.payload.urls } : {},
				auth: resolved.authLabel,
				urlSource: requestPublicUrl ? "request.publicUrl" : resolved.urlSource,
				access: resolved.access,
				...resolved.accessDowngraded ? { accessDowngraded: true } : {}
			}, void 0);
		});
	},
	"device.pair.setupStatus": async ({ params, respond }) => {
		if (!assertValidParams(params, validateDevicePairSetupStatusParams, "device.pair.setupStatus", respond)) return;
		await respondUnavailableOnThrow(respond, async () => {
			const completion = await readDevicePairSetupCompletion({ setupId: params.setupId });
			respond(true, completion ? (() => {
				const payload = {
					setupId: completion.setupId,
					deviceId: completion.deviceId,
					...completion.deviceName ? { deviceName: completion.deviceName } : {},
					access: completion.access,
					ts: completion.completedAtMs
				};
				return completion.deliveryState === "confirmed" ? { completion: payload } : { deliveryUncertain: payload };
			})() : {}, void 0);
		});
	}
};
//#endregion
export { devicePairSetupHandlers };
