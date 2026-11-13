import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { o as hasConfiguredSecretInput } from "./types.secrets-BXEuin38.mjs";
import { r as theme } from "./theme-DzaUZY4q.mjs";
import { i as runCommandWithTimeout } from "./exec-Bjx7k3vE.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { r as trimToUndefined } from "./credential-planner-CU341-Uq.mjs";
import "./credentials-C36Kyy_Y.mjs";
import { r as resolveRequiredConfiguredSecretRefInputString } from "./resolve-configured-secret-input-string-VtvwIUX3.mjs";
import { t as inspectGatewayTlsCertificate } from "./gateway-Bp8uOI6s.mjs";
import { t as resolveCommandSecretRefsViaGateway } from "./command-secret-gateway-CAcANqOK.mjs";
import { l as getQrRemoteCommandSecretTargetIds } from "./command-secret-targets-VjuVjcxK.mjs";
import { o as PAIRING_SETUP_BOOTSTRAP_PROFILE, s as VOICE_NODE_PAIRING_SETUP_BOOTSTRAP_PROFILE } from "./device-bootstrap-profile-DV7lvW3L.mjs";
import { t as renderQrTerminal } from "./qr-terminal-BJZxPpi0.mjs";
import { n as runCommandWithRuntime } from "./cli-utils-SHz2hPC9.mjs";
import { t as formatDocsHelp } from "./help-format-MN-qfst1.mjs";
import { o as resolvePairingSetupFromConfig, r as encodePairingSetupCode } from "./setup-code-9lPnaxhu.mjs";
//#region src/cli/qr-cli.ts
const LIMITED_TRANSPORT_WARNING = "This Gateway URL uses plaintext ws://, so the setup code was limited for safety. Use wss:// or Tailscale Serve, then generate a new code for full access.";
function shouldResolveLocalGatewayPasswordSecret(cfg, env) {
	if (trimToUndefined(env.OPENCLAW_GATEWAY_PASSWORD)) return false;
	const authMode = cfg.gateway?.auth?.mode;
	if (authMode === "password") return true;
	if (authMode === "token" || authMode === "none" || authMode === "trusted-proxy") return false;
	const envToken = trimToUndefined(env.OPENCLAW_GATEWAY_TOKEN);
	const configTokenConfigured = hasConfiguredSecretInput(cfg.gateway?.auth?.token, cfg.secrets?.defaults);
	return !envToken && !configTokenConfigured;
}
async function resolveLocalGatewayPasswordSecretIfNeeded(cfg) {
	const resolvedPassword = await resolveRequiredConfiguredSecretRefInputString({
		config: cfg,
		env: process.env,
		value: cfg.gateway?.auth?.password,
		path: "gateway.auth.password"
	});
	if (!resolvedPassword) return;
	if (!cfg.gateway?.auth) return;
	cfg.gateway.auth.password = resolvedPassword;
}
function emitQrSecretResolveDiagnostics(diagnostics, opts) {
	const toStderr = opts.json === true || opts.setupCodeOnly === true;
	for (const entry of diagnostics) {
		const message = theme.warn(`[secrets] ${entry}`);
		if (toStderr) defaultRuntime.error(message);
		else defaultRuntime.log(message);
	}
}
function registerQrCli(program) {
	program.command("qr").description("Generate a mobile pairing QR code and setup code").addHelpText("after", () => formatDocsHelp("/cli/qr")).option("--remote", "Use gateway.remote.url and gateway.remote token/password (ignores device-pair publicUrl)", false).option("--url <url>", "Override gateway URL used in the setup payload").option("--public-url <url>", "Override gateway public URL used in the setup payload").option("--token <token>", "Override gateway token for setup payload").option("--password <password>", "Override gateway password for setup payload").option("--limited", "Pair with limited operator access (omit operator.admin)", false).option("--voice-node", "Pair a voice node with node, read, and Talk access only", false).option("--setup-code-only", "Print only the setup code", false).option("--no-ascii", "Skip ASCII QR rendering").option("--json", "Output JSON", false).action(async (opts) => {
		await runCommandWithRuntime(defaultRuntime, async () => {
			if (opts.token && opts.password) throw new Error("Use either --token or --password, not both.");
			if (opts.limited && opts.voiceNode) throw new Error("Use either --limited or --voice-node, not both.");
			const token = trimToUndefined(opts.token) ?? "";
			const password = trimToUndefined(opts.password) ?? "";
			const wantsRemote = opts.remote === true;
			const loadedRaw = getRuntimeConfig();
			if (wantsRemote && !opts.url && !opts.publicUrl) {
				const tailscaleMode = loadedRaw.gateway?.tailscale?.mode ?? "off";
				const remoteUrl = loadedRaw.gateway?.remote?.url;
				if (!Boolean(trimToUndefined(remoteUrl)) && !(tailscaleMode === "serve" || tailscaleMode === "funnel")) throw new Error("qr --remote requires gateway.remote.url (or gateway.tailscale.mode=serve/funnel).");
			}
			let loaded = loadedRaw;
			let remoteDiagnostics = [];
			if (wantsRemote && !token && !password) {
				const resolvedRemote = await resolveCommandSecretRefsViaGateway({
					config: loadedRaw,
					commandName: "qr --remote",
					targetIds: getQrRemoteCommandSecretTargetIds()
				});
				loaded = resolvedRemote.resolvedConfig;
				remoteDiagnostics = resolvedRemote.diagnostics;
			}
			const cfg = {
				...loaded,
				gateway: {
					...loaded.gateway,
					auth: { ...loaded.gateway?.auth }
				}
			};
			emitQrSecretResolveDiagnostics(remoteDiagnostics, opts);
			const authToken = token || (wantsRemote && !password ? trimToUndefined(cfg.gateway.remote?.token) : "");
			const authPassword = password || (wantsRemote && !token ? trimToUndefined(cfg.gateway.remote?.password) : "");
			if (authToken) {
				cfg.gateway.auth.mode = "token";
				cfg.gateway.auth.token = authToken;
				cfg.gateway.auth.password = void 0;
			} else if (authPassword) {
				cfg.gateway.auth.mode = "password";
				cfg.gateway.auth.password = authPassword;
				cfg.gateway.auth.token = void 0;
			}
			if (!wantsRemote && !password && !token && shouldResolveLocalGatewayPasswordSecret(cfg, process.env)) await resolveLocalGatewayPasswordSecretIfNeeded(cfg);
			const publicUrl = trimToUndefined(opts.url) ?? trimToUndefined(opts.publicUrl) ?? (wantsRemote ? void 0 : trimToUndefined(cfg.plugins?.entries?.["device-pair"]?.config?.["publicUrl"]));
			const resolved = await resolvePairingSetupFromConfig(cfg, {
				publicUrl,
				preferRemoteUrl: wantsRemote,
				...opts.voiceNode ? { bootstrapProfile: VOICE_NODE_PAIRING_SETUP_BOOTSTRAP_PROFILE } : opts.limited ? { bootstrapProfile: PAIRING_SETUP_BOOTSTRAP_PROFILE } : {},
				runCommandWithTimeout: async (argv, runOpts) => await runCommandWithTimeout(argv, { timeoutMs: runOpts.timeoutMs }),
				loadLocalTlsFingerprint: async () => {
					const certificate = await inspectGatewayTlsCertificate(cfg.gateway?.tls);
					return certificate.ok ? certificate.value.fingerprintSha256 : void 0;
				}
			});
			if (!resolved.ok) throw new Error(resolved.error);
			const setupCode = encodePairingSetupCode(resolved.payload);
			if (opts.json) {
				defaultRuntime.writeJson({
					setupCode,
					gatewayUrl: resolved.payload.url,
					...resolved.payload.urls ? { gatewayUrls: resolved.payload.urls } : {},
					auth: resolved.authLabel,
					urlSource: resolved.urlSource,
					access: resolved.access,
					...resolved.accessDowngraded ? { accessDowngraded: true } : {}
				});
				return;
			}
			if (opts.setupCodeOnly) {
				if (resolved.accessDowngraded) defaultRuntime.error(theme.warn(LIMITED_TRANSPORT_WARNING));
				defaultRuntime.log(setupCode);
				return;
			}
			const lines = [
				theme.heading("Pairing QR"),
				"Scan this with the OpenClaw mobile app (Onboarding -> Scan QR).",
				""
			];
			if (opts.ascii !== false) {
				const qrAscii = await renderQrTerminal(setupCode, { small: true });
				lines.push(qrAscii.trimEnd(), "");
			}
			lines.push(`${theme.muted("Setup code:")} ${setupCode}`, `${theme.muted("Gateway:")} ${resolved.payload.url}`, ...resolved.payload.urls?.slice(1).map((url) => `${theme.muted("Fallback:")} ${url}`) ?? [], `${theme.muted("Auth:")} ${resolved.authLabel}`, `${theme.muted("Access:")} ${resolved.access}`, ...resolved.accessDowngraded ? [theme.warn(LIMITED_TRANSPORT_WARNING)] : [], `${theme.muted("Source:")} ${resolved.urlSource}`, "", "Approve after scan with:", `  ${theme.command("openclaw devices list")}`, `  ${theme.command("openclaw devices approve <requestId>")}`);
			defaultRuntime.log(lines.join("\n"));
		});
	});
}
//#endregion
export { registerQrCli as t };
