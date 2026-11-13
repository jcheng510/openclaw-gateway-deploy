import { f as isSimpleCommandHelpInvocation, n as getCommandPathWithRootOptions } from "./argv-vtXWEchA.mjs";
//#region src/cli/precomputed-help.ts
const PRECOMPUTED_COMMAND_HELP_NAMES = /* @__PURE__ */ new Set([
	"browser",
	"secrets",
	"nodes"
]);
const PRECOMPUTED_SUBCOMMAND_HELP_COMMANDS = /* @__PURE__ */ new Set([
	"config",
	"doctor",
	"gateway",
	"models",
	"plugins",
	"sessions"
]);
function resolvePrecomputedCommandHelpName(argv, commandNames) {
	if (!isSimpleCommandHelpInvocation(argv, commandNames)) return null;
	const [commandName, extra] = getCommandPathWithRootOptions(argv, 2);
	return extra === void 0 ? [...commandNames].find((name) => name === commandName) ?? null : null;
}
async function tryOutputPrecomputedCommandHelp(argv, deps = {}) {
	const env = deps.env ?? process.env;
	if (env.OPENCLAW_DISABLE_CLI_STARTUP_HELP_FAST_PATH === "1") return false;
	const commandName = resolvePrecomputedCommandHelpName(argv, PRECOMPUTED_COMMAND_HELP_NAMES);
	const subcommandName = commandName ? null : resolvePrecomputedCommandHelpName(argv, PRECOMPUTED_SUBCOMMAND_HELP_COMMANDS);
	if (subcommandName) return (deps.outputPrecomputedSubcommandHelpText ?? (await import("./root-help-metadata-6dDW9o71.mjs")).outputPrecomputedSubcommandHelpText)(subcommandName);
	if (!commandName) return false;
	if (commandName === "nodes") {
		if (await (deps.loadRootHelpRenderOptionsForConfigSensitivePlugins ?? (await import("./root-help-live-config-DLFpCf-w.mjs")).loadRootHelpRenderOptionsForConfigSensitivePlugins)(env)) return false;
	}
	const outputName = {
		browser: "outputPrecomputedBrowserHelpText",
		secrets: "outputPrecomputedSecretsHelpText",
		nodes: "outputPrecomputedNodesHelpText"
	};
	return (deps[outputName[commandName]] ?? (await import("./root-help-metadata-6dDW9o71.mjs"))[outputName[commandName]])();
}
//#endregion
export { tryOutputPrecomputedCommandHelp as t };
