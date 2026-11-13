import { I as getCoreCliCommandDescriptors, L as getCoreCliCommandNamesCore } from "./argv-vtXWEchA.mjs";
import { t as resolveCliArgvInvocation } from "./argv-invocation-vUYXxKSU.mjs";
import { i as registerCommandGroups, r as registerCommandGroupByName, t as findCommandGroupEntry } from "./register-command-groups-Cm47j9gY.mjs";
import { t as buildCommandGroupEntries } from "./command-group-descriptors-DsGlvOmH.mjs";
//#region src/cli/program/command-registry-core.ts
const coreEntrySpecs = [
	[["setup", "crestodian"], async (program) => (await import("./register.setup-BIVRXBA5.mjs")).registerSetupCommand(program)],
	[["onboard"], async (program) => (await import("./register.onboard-BfhS0--W.mjs")).registerOnboardCommand(program)],
	[["configure"], async (program) => (await import("./register.configure-Dw8Wpe0G.mjs")).registerConfigureCommand(program)],
	[["config"], async (program) => (await import("./config-cli-C9pH_B0o.mjs")).registerConfigCli(program)],
	[["claws"], async (program) => (await import("./claws-cli-pADbk6aY.mjs")).registerClawsCli(program)],
	[["backup"], async (program) => (await import("./register.backup-BRhYs0S7.mjs")).registerBackupCommand(program)],
	[["database"], async (program) => (await import("./register.database-lo1ncCRJ.mjs")).registerDatabaseCommand(program)],
	[["migrate"], async (program) => (await import("./register.migrate-C98NIfWz.mjs")).registerMigrateCommand(program)],
	[["audit"], async (program) => (await import("./register.audit-CrlJD5mL.mjs")).registerAuditCommand(program)],
	[[
		"doctor",
		"triage",
		"dashboard",
		"reset",
		"uninstall"
	], async (program, ctx) => (await import("./register.maintenance-CIC1ppsS.mjs")).registerMaintenanceCommands(program, ctx)],
	[["message"], async (program, ctx) => (await import("./register.message-GvWtp_Tb.mjs")).registerMessageCommands(program, ctx)],
	[["mcp"], async (program) => (await import("./mcp-cli-mMr5DNVo.mjs")).registerMcpCli(program)],
	[["transcripts"], async (program) => (await import("./register.transcripts-B8nxrCn7.mjs")).registerTranscriptsCli(program)],
	[["agent"], async (program, ctx) => (await import("./register.agent-turn-DaBvW3UZ.mjs")).registerAgentTurnCommand(program, { agentChannelOptions: ctx.agentChannelOptions })],
	[["agents"], async (program) => (await import("./register.agent-BkTmqsFg.mjs")).registerAgentsCommands(program)],
	[[
		"status",
		"health",
		"sessions"
	], async (program) => (await import("./register.status-health-sessions-CUjj5-HO.mjs")).registerStatusHealthSessionsCommands(program)]
];
function resolveCoreCommandGroups(ctx) {
	const descriptors = getCoreCliCommandDescriptors();
	const visibleCommandNames = new Set(descriptors.map((descriptor) => descriptor.name));
	const visibleEntrySpecs = coreEntrySpecs.filter(([commandNames]) => commandNames.every((name) => visibleCommandNames.has(name)));
	return buildCommandGroupEntries(descriptors, visibleEntrySpecs, ctx);
}
function getCoreCliCompletionGroups(ctx) {
	const entries = resolveCoreCommandGroups(ctx);
	return getCoreCliCommandNamesCore().map((name) => findCommandGroupEntry(entries, name)).filter((entry, index, groups) => entry !== void 0 && entry !== groups[index - 1]);
}
async function registerCoreCliByName(program, ctx, name) {
	return registerCommandGroupByName(program, resolveCoreCommandGroups(ctx), name);
}
function registerCoreCliCommands(program, ctx, argv) {
	const { primary } = resolveCliArgvInvocation(argv);
	registerCommandGroups(program, resolveCoreCommandGroups(ctx), {
		eager: false,
		primary,
		registerPrimaryOnly: true
	});
}
//#endregion
export { registerCoreCliByName as n, registerCoreCliCommands as r, getCoreCliCompletionGroups as t };
