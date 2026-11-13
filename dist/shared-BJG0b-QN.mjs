import { g as resolveGatewayWindowsTaskName, m as resolveGatewaySystemdServiceName, u as resolveGatewayLaunchAgentLabel } from "./constants-CQ41zfz1.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { n as resolveGatewayService } from "./service-Du2I2Kt4.mjs";
//#region src/cli/gateway-cli/shared.ts
function renderGatewayServiceStopHints(env = process.env) {
	const profile = env.OPENCLAW_PROFILE;
	const hints = [`Tip: ${formatCliCommand("openclaw gateway stop")}`];
	switch (process.platform) {
		case "darwin":
			hints.push(`Or: launchctl bootout gui/$UID/${resolveGatewayLaunchAgentLabel(profile)}`);
			break;
		case "linux":
			hints.push(`Or: systemctl --user stop ${resolveGatewaySystemdServiceName(profile)}.service`);
			break;
		case "win32": hints.push(`Or: schtasks /End /TN "${resolveGatewayWindowsTaskName(profile)}"`);
	}
	return hints;
}
async function maybeExplainGatewayServiceStop() {
	const service = resolveGatewayService();
	let loaded;
	try {
		loaded = await service.isLoaded({ env: process.env });
	} catch {
		loaded = null;
	}
	if (loaded === false) return;
	defaultRuntime.error(loaded ? `Gateway service appears ${service.loadedText}. Stop it first.` : "Gateway service status unknown; if supervised, stop it first.");
	for (const hint of renderGatewayServiceStopHints()) defaultRuntime.error(hint);
}
//#endregion
export { maybeExplainGatewayServiceStop };
