import { t as formatDocsHelp } from "./help-format-MN-qfst1.mjs";
import { t as registerQrCli } from "./qr-cli-eaMqmqWu.mjs";
//#region src/cli/clawbot-cli.ts
function registerClawbotCli(program) {
	const clawbot = program.command("clawbot").description("Legacy clawbot command aliases").addHelpText("after", () => formatDocsHelp("/cli/clawbot"));
	registerQrCli(clawbot);
}
//#endregion
export { registerClawbotCli };
