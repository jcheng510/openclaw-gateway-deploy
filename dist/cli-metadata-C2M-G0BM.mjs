import { t as definePluginEntry } from "./plugin-entry-BsETFXpv.mjs";
import { t as isBrowserMachineOutput } from "./cli-output-mode-DViuKRjY.mjs";
//#region extensions/browser/cli-metadata.ts
/**
* Browser CLI metadata entry. It registers the `openclaw browser` command lazily
* so command discovery does not load the full browser runtime.
*/
function registerBrowserCliMetadata(api) {
	api.registerCli(async ({ program }) => {
		const { registerBrowserCli } = await import("./browser-cli-BdWpS11C.mjs");
		registerBrowserCli(program, process.argv, api.rootDir);
	}, {
		commands: ["browser"],
		descriptors: [{
			name: "browser",
			description: "Manage OpenClaw's dedicated browser (Chrome/Chromium)",
			hasSubcommands: true,
			machineOutput: isBrowserMachineOutput
		}]
	});
}
/** Plugin entry that contributes Browser CLI commands. */
var cli_metadata_default = definePluginEntry({
	id: "browser",
	name: "Browser",
	description: "Default browser tool plugin",
	register: registerBrowserCliMetadata
});
//#endregion
export { registerBrowserCliMetadata as n, cli_metadata_default as t };
