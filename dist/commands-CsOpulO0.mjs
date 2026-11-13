import { y as requireActivePluginRegistry } from "./runtime-BnZb2P5v.mjs";
import "./command-registry-state-BcKcRvTW.mjs";
import { t as listRegisteredPluginCommands } from "./plugin-command-registry-C-x5yEAn.mjs";
import "./command-registration-DeCeMznv.mjs";
import { t as executeRegisteredPluginCommand } from "./plugin-command-execution-CgNRFYmI.mjs";
import { t as matchRegisteredPluginCommand } from "./plugin-command-matcher-CILtOL33.mjs";
//#region src/plugins/commands.ts
/** Match one compatibility command invocation against the current command registry. */
function matchPluginCommand(commandBody, options = {}) {
	const registry = requireActivePluginRegistry();
	return matchRegisteredPluginCommand({
		commands: listRegisteredPluginCommands(registry),
		commandBody,
		channel: options.channel,
		aliasScope: { kind: "all" }
	});
}
async function executePluginCommand(params) {
	return await executeRegisteredPluginCommand(requireActivePluginRegistry(), params);
}
/** List registered plugin commands for help and command discovery. */
function listPluginCommands() {
	return listRegisteredPluginCommands(requireActivePluginRegistry()).map((command) => ({
		name: command.name,
		description: command.description,
		pluginId: command.pluginId,
		acceptsArgs: command.acceptsArgs ?? false
	}));
}
//#endregion
export { listPluginCommands as n, matchPluginCommand as r, executePluginCommand as t };
