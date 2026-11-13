import { n as runCommandWithRuntime } from "./cli-utils-SHz2hPC9.mjs";
import { t as formatDocsHelp } from "./help-format-MN-qfst1.mjs";
import { t as collectOption } from "./helpers-Bd2A8dod.mjs";
import { n as CONFIGURE_WIZARD_SECTIONS } from "./configure.shared-B8xXlJed.mjs";
//#region src/cli/program/register.configure.ts
/** Register the interactive `configure` command and section filter flag. */
function registerConfigureCommand(program) {
	program.command("configure").description("Interactive configuration for credentials, channels, gateway, and agent defaults").addHelpText("after", () => formatDocsHelp("/cli/configure")).option("--section <section>", `Configuration sections (repeatable). Options: ${CONFIGURE_WIZARD_SECTIONS.join(", ")}`, collectOption, []).action(async (opts) => {
		const { defaultRuntime } = await import("./runtime-pvh-jBbt.mjs");
		await runCommandWithRuntime(defaultRuntime, async () => {
			const { configureCommandFromSectionsArg } = await import("./configure.commands-nliWU3TQ.mjs");
			await configureCommandFromSectionsArg(opts.section, defaultRuntime);
		});
	});
}
//#endregion
export { registerConfigureCommand };
