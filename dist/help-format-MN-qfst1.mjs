import { r as theme } from "./theme-DzaUZY4q.mjs";
import { t as formatDocsLink } from "./links-4Bgsoz0M.mjs";
//#region src/cli/help-format.ts
function formatDocsHelp(path) {
	return `\n${theme.muted("Docs:")} ${formatDocsLink(path, `docs.openclaw.ai${path}`)}\n`;
}
function formatHelpExample(command, description) {
	return `  ${theme.command(command)}\n    ${theme.muted(description)}`;
}
function formatHelpExampleLine(command, description) {
	if (!description) return `  ${theme.command(command)}`;
	return `  ${theme.command(command)} ${theme.muted(`# ${description}`)}`;
}
/** Render help examples in stacked or inline comment style. */
function formatHelpExamples(examples, inline = false) {
	const formatter = inline ? formatHelpExampleLine : formatHelpExample;
	return examples.map(([command, description]) => formatter(command, description)).join("\n");
}
//#endregion
export { formatHelpExamples as n, formatDocsHelp as t };
