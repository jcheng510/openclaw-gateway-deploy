import { o as isDefaultInstallIdentity } from "./paths-CtO6iw0c.mjs";
import { n as NON_DEFAULT_INSTALL_SERVICE_SKIP_REASON } from "./gateway-supervision-fKhmwUVZ.mjs";
import { t as note } from "./note-BpWs6H5N.mjs";
import { l as shouldManageGatewayService } from "./doctor-service-repair-policy--7A-vlzR.mjs";
import { n as resolveDoctorMode } from "./doctor-health-contribution-utils-CR9PiTel.mjs";
import { n as recordDoctorHealthWarnings } from "./doctor-health-contribution-DZyZeEtu.mjs";
import { t as runCoreContributionHealth } from "./doctor-health-contribution-core-GjO3B_yb.mjs";
import { a as runWriteConfigHealth } from "./doctor-health-contribution-runners.config-BjBMeH8Q.mjs";
//#region src/flows/doctor-health-contribution-runners.gateway.ts
async function runCommandOwnerHealth(ctx) {
	const { noteCommandOwnerHealth } = await import("./doctor-command-owner-C-C11qwF.mjs");
	noteCommandOwnerHealth(ctx.cfg);
}
async function runClaudeCliHealth(ctx) {
	const { noteClaudeCliHealth } = await import("./doctor-claude-cli-Cp3cWt6L.mjs");
	noteClaudeCliHealth(ctx.cfg);
}
async function writeDoctorGatewayConfig(ctx, nextConfig) {
	const previous = ctx.cfg;
	ctx.cfg = nextConfig;
	try {
		if (!await runWriteConfigHealth(ctx, { runPostWriteRepairs: false })) throw new Error("Doctor did not persist the gateway token; service repair was skipped.");
		return ctx.cfg;
	} catch (error) {
		ctx.cfg = previous;
		throw error;
	}
}
async function runGatewayServicesHealth(ctx) {
	const { noteMacForeignLaunchdJobs } = await import("./doctor-foreign-launchd-jobs-Vu_V87Iy.mjs");
	await noteMacForeignLaunchdJobs(ctx.options, ctx.runtime, ctx.env ?? process.env);
	if (ctx.gatewayMaintenanceActive) return;
	if (!isDefaultInstallIdentity(ctx.env ?? process.env)) {
		note(NON_DEFAULT_INSTALL_SERVICE_SKIP_REASON, "Gateway");
		return;
	}
	if (!await shouldManageGatewayService(ctx.env ?? process.env)) return;
	const { maybeRepairGatewayServiceConfig, maybeResolveDuelingSystemdGatewayScopes, maybeScanExtraGatewayServices } = await import("./doctor-gateway-services-DxtrpQxY.mjs");
	const { noteMacLaunchAgentOverrides, noteMacLaunchctlGatewayEnvOverrides, noteMacStaleOpenClawUpdateLaunchdJobs } = await import("./doctor-platform-notes-7BStzbWG.mjs");
	await maybeScanExtraGatewayServices(ctx.options, ctx.runtime, ctx.prompter);
	await maybeResolveDuelingSystemdGatewayScopes(ctx.runtime, ctx.prompter);
	ctx.cfg = await maybeRepairGatewayServiceConfig(ctx.cfg, resolveDoctorMode(ctx.cfg), ctx.runtime, ctx.prompter, {
		allowExecSecretRefs: ctx.options.allowExec === true,
		writeConfig: (nextConfig) => writeDoctorGatewayConfig(ctx, nextConfig)
	});
	await noteMacLaunchAgentOverrides();
	await noteMacStaleOpenClawUpdateLaunchdJobs();
	await noteMacLaunchctlGatewayEnvOverrides(ctx.cfg);
}
async function runHostDesktopHealth(ctx) {
	const { noteHostDesktopHealth } = await import("./doctor-host-desktop-BYkgC81l.mjs");
	await noteHostDesktopHealth(ctx.cfg, { prompter: ctx.prompter });
}
async function runStartupChannelMaintenanceHealth(ctx) {
	const { maybeRunDoctorStartupChannelMaintenance } = await import("./doctor-startup-channel-maintenance-B74hrTvK.mjs");
	await maybeRunDoctorStartupChannelMaintenance({
		cfg: ctx.cfg,
		env: process.env,
		runtime: ctx.runtime,
		shouldRepair: ctx.prompter.shouldRepair
	});
}
async function runSecurityHealth(ctx) {
	const { noteInstallPolicyHealth } = await import("./doctor-install-policy-BZ6I6tI4.mjs");
	const { noteSecurityWarnings } = await import("./doctor-security-C8u6cYS_.mjs");
	const { securityAuditFindingToHealthFinding } = await import("./health-check-adapter-0ejtAZwG.mjs");
	const findings = await noteSecurityWarnings(ctx.cfg);
	recordDoctorHealthWarnings(ctx, findings.map(securityAuditFindingToHealthFinding));
	await noteInstallPolicyHealth(ctx.cfg, {
		deep: ctx.options.deep === true,
		env: ctx.env
	});
}
async function runWebFetchProxyHealth(ctx) {
	if (!isDefaultInstallIdentity(ctx.env ?? process.env)) return;
	const { noteWebFetchProxyDiagnostic } = await import("./doctor-web-fetch-proxy-CARQ6ar4.mjs");
	await noteWebFetchProxyDiagnostic({
		cfg: ctx.cfg,
		env: ctx.env ?? process.env
	});
}
async function runGitHubProjectHealth(ctx) {
	const { hasConfiguredGitHubApiCredential } = await import("./github-public-api-DghIfWvF.mjs");
	if (!hasConfiguredGitHubApiCredential(ctx.env ?? process.env, ctx.cfg)) note("Prefer gateway.controlUi.github.token for Gateway-owned GitHub project access, or set GH_TOKEN/GITHUB_TOKEN in the shared Gateway process environment. Without either, search is public-only.", "GitHub projects");
}
async function runBrowserHealth(ctx) {
	const { noteChromeMcpBrowserReadiness } = await import("./doctor-browser-rngenoi1.mjs");
	await runCoreContributionHealth(ctx, ["core/doctor/browser-clawd-profile-residue"]);
	await noteChromeMcpBrowserReadiness(ctx.cfg);
}
async function runOpenAIOAuthTlsHealth(ctx) {
	const { noteOpenAIOAuthTlsPrerequisites } = await import("./provider-openai-chatgpt-oauth-tls-DlPWOqc4.mjs");
	await noteOpenAIOAuthTlsPrerequisites({
		cfg: ctx.cfg,
		deep: ctx.options.deep === true
	});
}
async function runWhatsappResponsivenessHealth(ctx) {
	const { noteWhatsappResponsivenessHealth } = await import("./doctor-whatsapp-responsiveness-DWhA3RfB.mjs");
	noteWhatsappResponsivenessHealth({
		cfg: ctx.cfg,
		status: ctx.gatewayStatus
	});
}
async function runDevicePairingHealth(ctx) {
	const { noteDevicePairingHealth } = await import("./doctor-device-pairing-CH2Er2mv.mjs");
	await noteDevicePairingHealth({
		cfg: ctx.cfg,
		healthOk: ctx.healthOk ?? false,
		env: ctx.env
	});
}
async function runGatewayDaemonHealth(ctx) {
	if (!isDefaultInstallIdentity(ctx.env ?? process.env)) return;
	if (ctx.cfg.gateway?.mode !== "remote") {
		const { noteMacDisabledGatewayLaunchAgent } = await import("./doctor-platform-notes-7BStzbWG.mjs");
		await noteMacDisabledGatewayLaunchAgent(ctx.env ?? process.env);
	}
	if (ctx.gatewayMaintenanceActive) return;
	const { maybeRepairGatewayDaemon } = await import("./doctor-gateway-daemon-flow-BcdQI9gg.mjs");
	await maybeRepairGatewayDaemon({
		cfg: ctx.cfg,
		runtime: ctx.runtime,
		prompter: ctx.prompter,
		options: ctx.options,
		gatewayDetailsMessage: ctx.gatewayDetails?.message ?? "",
		healthOk: ctx.healthOk ?? false,
		healthSkipped: ctx.gatewayHealthSkipped === true
	});
}
//#endregion
export { runGatewayDaemonHealth as a, runHostDesktopHealth as c, runStartupChannelMaintenanceHealth as d, runWebFetchProxyHealth as f, runDevicePairingHealth as i, runOpenAIOAuthTlsHealth as l, writeDoctorGatewayConfig as m, runClaudeCliHealth as n, runGatewayServicesHealth as o, runWhatsappResponsivenessHealth as p, runCommandOwnerHealth as r, runGitHubProjectHealth as s, runBrowserHealth as t, runSecurityHealth as u };
