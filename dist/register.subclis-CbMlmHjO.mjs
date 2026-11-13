import { Q as removeCommandByName, b as loadPrivateQaCliModule, v as getSubCliEntriesCore } from "./argv-vtXWEchA.mjs";
import { t as resolveCliArgvInvocation } from "./argv-invocation-vUYXxKSU.mjs";
import { t as createLazyImportLoader } from "./lazy-promise-DGqyc4Y4.mjs";
import { n as shouldEagerRegisterSubcommands } from "./command-registration-policy-CYjEvuOd.mjs";
import { t as resolveCliCommandPathPolicy } from "./command-path-policy-C4lL_l55.mjs";
import { i as registerCommandGroups, r as registerCommandGroupByName, t as findCommandGroupEntry } from "./register-command-groups-Cm47j9gY.mjs";
import { t as buildCommandGroupEntries } from "./command-group-descriptors-DsGlvOmH.mjs";
//#region src/cli/program/register.subclis.ts
const pluginCliLoader = createLazyImportLoader(() => import("./cli-BU6-Speb.mjs"));
function shouldRegisterGatewayRunOnly(name, argv) {
	if (name !== "gateway") return false;
	const invocation = resolveCliArgvInvocation(argv);
	if (invocation.hasHelpOrVersion || invocation.commandPath[0] !== "gateway") return false;
	return invocation.commandPath.length === 1 || invocation.commandPath[1] === "run";
}
async function registerGatewayRunOnly(program) {
	const { addGatewayRunCommand } = await import("./run-command-DT-y0Dw9.mjs");
	removeCommandByName(program, "gateway");
	addGatewayRunCommand(addGatewayRunCommand(program.command("gateway").description("Run, inspect, and query the WebSocket Gateway")).command("run").description("Run the WebSocket Gateway (foreground)"));
}
async function registerSubCliWithPluginCommands(program, argv, registerSubCli, pluginCliPosition) {
	const invocation = resolveCliArgvInvocation(argv);
	const shouldRegisterPluginCommands = !invocation.hasHelpOrVersion && resolveCliCommandPathPolicy(invocation.commandPath).loadPlugins !== "never";
	if (pluginCliPosition === "before" && shouldRegisterPluginCommands) {
		const { registerPluginCliCommandsFromValidatedConfig } = await pluginCliLoader.load();
		await registerPluginCliCommandsFromValidatedConfig(program);
	}
	await registerSubCli();
	if (pluginCliPosition === "after" && shouldRegisterPluginCommands) {
		const { registerPluginCliCommandsFromValidatedConfig } = await pluginCliLoader.load();
		await registerPluginCliCommandsFromValidatedConfig(program);
	}
}
const entrySpecs = [
	[["acp"], async (program) => (await import("./acp-cli-CRyHcJsD.mjs")).registerAcpCli(program)],
	[["gateway"], async (program) => (await import("./gateway-cli-D_7tPFxy.mjs")).registerGatewayCli(program)],
	[["daemon"], async (program) => (await import("./cli/daemon-cli.js")).registerDaemonCli(program)],
	[["logs"], async (program) => (await import("./logs-cli-DOcuP6IS.mjs")).registerLogsCli(program)],
	[["system"], async (program) => (await import("./system-cli-CRyGTyOw.mjs")).registerSystemCli(program)],
	[["models"], async (program) => (await import("./models-cli-JEX4MZBC.mjs")).registerModelsCli(program)],
	[["promos"], async (program) => (await import("./promos-cli-C_vmpB4e.mjs")).registerPromosCli(program)],
	[["telemetry"], async (program) => (await import("./telemetry-cli-CIcos_qt.mjs")).registerTelemetryCli(program)],
	[["infer", "capability"], async (program, argv) => (await import("./capability-cli-BlUgzVt2.mjs")).registerCapabilityCli(program, argv)],
	[["approvals", "exec-approvals"], async (program) => (await import("./exec-approvals-cli-DMW7-2JA.mjs")).registerExecApprovalsCli(program)],
	[["exec-policy"], async (program) => (await import("./exec-policy-cli-CnWeKN3b.mjs")).registerExecPolicyCli(program)],
	[["nodes"], async (program, argv) => (await import("./nodes-cli-TwYkDHOS.mjs")).registerNodesCli(program, argv)],
	[["devices"], async (program) => (await import("./devices-cli-Dnv1deWr.mjs")).registerDevicesCli(program)],
	[["users"], async (program) => (await import("./users-cli-DrgJ0oHj.mjs")).registerUsersCli(program)],
	[["node"], async (program) => (await import("./node-cli-JexWW1YA.mjs")).registerNodeCli(program)],
	[["connect"], async (program) => (await import("./connect-cli-BEEQ9nYa.mjs")).registerConnectCli(program)],
	[["worker"], async (program) => (await import("./worker-cli-nxdP_6SE.mjs")).registerWorkerCli(program)],
	[["sandbox"], async (program) => (await import("./sandbox-cli-CFjxT4xB.mjs")).registerSandboxCli(program)],
	[["fleet"], async (program) => (await import("./fleet-cli-Bd-jUqQP.mjs")).registerFleetCli(program)],
	[["worktrees"], async (program) => (await import("./worktrees-cli-CD3YCYuQ.mjs")).registerWorktreesCli(program)],
	[["attach"], async (program) => (await import("./attach-cli-JDDOnUq4.mjs")).registerAttachCli(program)],
	[[
		"tui",
		"terminal",
		"chat"
	], async (program) => (await import("./tui-cli-Dy5ecSP9.mjs")).registerTuiCli(program)],
	[["resume"], async (program) => (await import("./resume-cli-DEDzLdFT.mjs")).registerResumeCli(program)],
	[["cron", "automations"], async (program) => (await import("./cron-cli-D9jTSG4u.mjs")).registerCronCli(program)],
	[["dns"], async (program) => (await import("./dns-cli-Cu-Gw3IA.mjs")).registerDnsCli(program)],
	[["docs"], async (program) => (await import("./docs-cli-ZdRV9JTu.mjs")).registerDocsCli(program)],
	[["qa"], async (program) => {
		const { registerQaLabCli } = await loadPrivateQaCliModule();
		if (typeof registerQaLabCli !== "function") throw new Error("Missing program command registrar: registerQaLabCli");
		await registerQaLabCli(program);
	}],
	[["proxy"], async (program) => (await import("./proxy-cli-BPxrOAmM.mjs")).registerProxyCli(program)],
	[["hooks"], async (program) => (await import("./hooks-cli-DTfIIMWh.mjs")).registerHooksCli(program)],
	[["webhooks"], async (program) => (await import("./webhooks-cli-0DIgGxJB.mjs")).registerWebhooksCli(program)],
	[["qr"], async (program) => (await import("./qr-cli-Dy6W81Yq.mjs")).registerQrCli(program)],
	[["clawbot"], async (program) => (await import("./clawbot-cli-BIMZesDF.mjs")).registerClawbotCli(program)],
	[["pairing"], async (program, argv) => {
		await registerSubCliWithPluginCommands(program, argv, async () => (await import("./pairing-cli-wO44dqt5.mjs")).registerPairingCli(program), "before");
	}],
	[["plugins"], async (program, argv) => {
		await registerSubCliWithPluginCommands(program, argv, async () => (await import("./plugins-cli-B-WxY4ja.mjs")).registerPluginsCli(program), "after");
	}],
	[["channels"], async (program, argv, context) => (await import("./channels-cli-DSaio7Se.mjs")).registerChannelsCli(program, argv, { includeSetupOptions: context.purpose === "completion" })],
	[["directory"], async (program) => (await import("./directory-cli-zhOFgi3n.mjs")).registerDirectoryCli(program)],
	[["security"], async (program) => (await import("./security-cli-CLNfjVO1.mjs")).registerSecurityCli(program)],
	[["secrets"], async (program) => (await import("./secrets-cli-CL6tGIYP.mjs")).registerSecretsCli(program)],
	[["skills"], async (program) => (await import("./skills-cli-TNhY19qH.mjs")).registerSkillsCli(program)],
	[["update"], async (program) => (await import("./update-cli-DboMO5NW.mjs")).registerUpdateCli(program)],
	[["completion"], async (program) => (await import("./completion-cli-BUnzgaaU.mjs")).registerCompletionCli(program)]
];
function resolveSubCliCommandGroups(argv, context = {}) {
	const descriptors = getSubCliEntriesCore();
	const descriptorNames = new Set(descriptors.map((descriptor) => descriptor.name));
	return buildCommandGroupEntries(descriptors, entrySpecs.filter(([commandNames]) => commandNames.every((name) => descriptorNames.has(name))), argv, context);
}
function getSubCliCompletionGroups(argv = process.argv) {
	const entries = resolveSubCliCommandGroups(argv, { purpose: "completion" });
	const groups = [];
	let previous;
	for (const { name } of getSubCliEntriesCore()) {
		const entry = name === "completion" ? void 0 : findCommandGroupEntry(entries, name);
		if (entry && entry !== previous) groups.push({
			name,
			entry
		});
		previous = entry;
	}
	return groups;
}
async function registerSubCliByName(program, name, argv = process.argv, context = {}) {
	if (shouldRegisterGatewayRunOnly(name, argv)) {
		await registerGatewayRunOnly(program);
		return true;
	}
	return registerCommandGroupByName(program, resolveSubCliCommandGroups(argv, context), name);
}
function registerSubCliCommands(program, argv = process.argv) {
	const { primary } = resolveCliArgvInvocation(argv);
	const entries = resolveSubCliCommandGroups(argv);
	const completion = findCommandGroupEntry(entries, "completion");
	const options = {
		eager: shouldEagerRegisterSubcommands(),
		primary,
		registerPrimaryOnly: true
	};
	registerCommandGroups(program, entries.filter((entry) => entry !== completion), options);
	if (completion) registerCommandGroups(program, [completion], options);
}
//#endregion
export { registerSubCliByName as n, registerSubCliCommands as r, getSubCliCompletionGroups as t };
