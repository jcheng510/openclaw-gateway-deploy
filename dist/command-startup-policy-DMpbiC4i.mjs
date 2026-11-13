import { n as isTruthyEnvValue } from "./env-SuLFUnAK.mjs";
import { t as resolveCliCommandPathPolicy } from "./command-path-policy-C4lL_l55.mjs";
//#region src/cli/command-startup-policy.ts
function shouldLoadPlugins(params) {
	const loadPlugins = params.loadPlugins;
	if (typeof loadPlugins === "function") return loadPlugins({
		argv: params.argv ?? [],
		commandPath: params.commandPath,
		jsonOutputMode: params.jsonOutputMode
	});
	return loadPlugins === "always" || loadPlugins === "text-only" && !params.jsonOutputMode;
}
function resolveCliStartupPolicy(params) {
	const commandPolicy = resolveCliCommandPathPolicy(params.commandPath);
	const nativeCheck = params.nativeUpdateExecutorCheck === true;
	const machineOutputMode = nativeCheck || params.jsonOutputMode || params.machineOutputMode === true;
	const suppressDoctorStdout = machineOutputMode || commandPolicy.ownsProtocolStdout;
	const configGuard = typeof commandPolicy.configGuard === "function" ? commandPolicy.configGuard({
		argv: params.argv ?? [],
		commandPath: params.commandPath,
		options: params.options
	}) : commandPolicy.configGuard;
	const env = params.env ?? process.env;
	return {
		suppressDoctorStdout,
		hideBanner: machineOutputMode || commandPolicy.hideBanner || isTruthyEnvValue(env.OPENCLAW_HIDE_BANNER),
		skipConfigGuard: nativeCheck || configGuard === "skip" || configGuard === "defer" || configGuard === "when-suppressed" && suppressDoctorStdout,
		...configGuard === "validate" || configGuard === "defer" ? { validateConfigOnly: true } : {},
		loadPlugins: !nativeCheck && shouldLoadPlugins({
			argv: params.argv,
			commandPath: params.commandPath,
			jsonOutputMode: params.jsonOutputMode,
			loadPlugins: commandPolicy.loadPlugins
		}),
		pluginRegistry: commandPolicy.pluginRegistry
	};
}
//#endregion
export { resolveCliStartupPolicy as t };
