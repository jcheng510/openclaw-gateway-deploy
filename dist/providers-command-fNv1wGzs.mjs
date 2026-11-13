import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { n as runCommandWithRuntime } from "./cli-utils-SHz2hPC9.mjs";
import { t as emitJsonOrText } from "./output-BaRjhBNO.mjs";
//#region src/cli/capability-cli/providers-command.ts
function runCapabilityCommand(json, format, run) {
	return runCommandWithRuntime(defaultRuntime, async () => {
		emitJsonOrText(defaultRuntime, Boolean(json), await run(), format ?? ((value) => JSON.stringify(value, null, 2)));
	});
}
function registerLocalProvidersCommand(parent, description, collect, format) {
	parent.command("providers").description(description).option("--agent <id>", "Agent whose provider state should be inspected").option("--json", "Output JSON", false).action((opts, command) => runCapabilityCommand(opts.json, format, async () => {
		const { getRuntimeConfig } = await import("./config/config.js");
		const { resolveCapabilityProviderAgentId, resolveCapabilityAgentOption } = await import("./shared-Csc_Vdki.mjs");
		const cfg = getRuntimeConfig();
		return collect(cfg, resolveCapabilityProviderAgentId(cfg, resolveCapabilityAgentOption(command, opts.agent)));
	}));
}
//#endregion
export { runCapabilityCommand as n, registerLocalProvidersCommand as t };
