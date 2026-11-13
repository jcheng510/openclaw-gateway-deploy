import { G as getCommanderErrorCommandPath, K as getCommanderSubcommandFact, T as isModelsPlainMachineOutput, U as getCommanderCommandPath, W as getCommanderErrorCommandNames, Y as setCommanderErrorCommand, l as isHelpOrVersionInvocation, o as getVerboseFlag, q as hasCommanderOptionToken } from "./argv-vtXWEchA.mjs";
import { t as resolveCliArgvInvocation } from "./argv-invocation-vUYXxKSU.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { r as setVerbose } from "./global-state-BAD7XgmL.mjs";
import { t as VERSION } from "./version-BMuSsYfE.mjs";
import { n as inheritOptionFromParent } from "./command-options-BDuSHeWG.mjs";
import "./globals-ChjEJkWj.mjs";
import { t as CLI_NAME } from "./cli-name-Dp_huZBR.mjs";
import { r as isJsonOutputModeActive, t as applyResolvedCommandOutputMode } from "./json-output-mode-VgNFmvRv.mjs";
import { t as resolveCliCommandPathPolicy } from "./command-path-policy-C4lL_l55.mjs";
import { t as resolveCliStartupPolicy } from "./command-startup-policy-DMpbiC4i.mjs";
import { n as ensureCliExecutionBootstrap, t as applyCliExecutionStartupPresentation } from "./command-execution-startup-DIoZZzG8.mjs";
import { a as resolvePluginInstallRequestContext, i as resolvePluginInstallInvalidConfigPolicy } from "./install-config-BdfsZd-g.mjs";
import { n as resolveCliChannelOptions } from "./channel-options-lKPXvVVK.mjs";
import { n as isParentDefaultHelpAction } from "./parent-default-help-udre-2i5.mjs";
import { r as registerCoreCliCommands } from "./command-registry-core-B73q_l2O.mjs";
import { n as setProgramContext } from "./program-context-VEhF8JxS.mjs";
import { r as registerSubCliCommands } from "./register.subclis-CbMlmHjO.mjs";
import { t as isCommandJsonOutputMode } from "./json-mode-vV644Ia6.mjs";
import { t as forceFreePort } from "./ports-CcuGXVAo.mjs";
import { t as configureProgramHelp } from "./help-CGfP5SI1.mjs";
import { t as createCliParseError } from "./error-output-Dk_xXZfM.mjs";
import process$1 from "node:process";
import { Command, CommanderError } from "commander";
//#region src/cli/program/context.ts
/** Create a program context that resolves channel options once on first use. */
function createProgramContext(prepared = {}) {
	let cachedChannelOptions;
	const getChannelOptions = () => {
		if (cachedChannelOptions === void 0) cachedChannelOptions = resolveCliChannelOptions();
		return cachedChannelOptions;
	};
	return {
		...prepared,
		programVersion: VERSION,
		get messageChannelOptions() {
			return getChannelOptions().join("|");
		},
		get agentChannelOptions() {
			return ["last", ...getChannelOptions()].join("|");
		}
	};
}
//#endregion
//#region src/cli/program/openclaw-command.ts
var OpenClawCommand = class OpenClawCommand extends Command {
	createCommand(name) {
		return new OpenClawCommand(name);
	}
	error(message, errorOptions) {
		const restoreErrorCommand = setCommanderErrorCommand(this);
		try {
			return super.error(message, errorOptions);
		} catch (error) {
			if (error instanceof CommanderError && error.exitCode !== 0 && (isJsonOutputModeActive(process.argv) || isCommandJsonOutputMode(this, process.argv))) {
				if (!isCommandJsonOutputMode(this, process.argv) && !hasCommanderOptionToken(this, process.argv, /* @__PURE__ */ new Set(["--json"]), "flag")) {
					applyResolvedCommandOutputMode(false);
					throw error;
				}
				applyResolvedCommandOutputMode(true);
				throw createCliParseError(message, {
					argv: process.argv,
					commandPath: getCommanderErrorCommandPath(this),
					commandNames: getCommanderErrorCommandNames(this)
				}, { humanOutputWritten: true });
			}
			throw error;
		} finally {
			restoreErrorCommand();
		}
	}
	_outputHelpIfRequested(args) {
		const subcommandFact = getCommanderSubcommandFact(this, args);
		if (subcommandFact?.kind === "defer") return;
		if (subcommandFact?.kind === "unknown") this.error(`error: unknown command '${subcommandFact.name}'`, { code: "commander.unknownCommand" });
		super._outputHelpIfRequested(args);
	}
};
//#endregion
//#region src/cli/plugin-install-config-policy.ts
function resolvePluginInstallArgvTokens(commandPath, argv) {
	const args = argv.slice(2);
	let cursor = 0;
	for (const segment of commandPath) {
		while (cursor < args.length && args[cursor] !== segment) cursor += 1;
		if (cursor >= args.length) return [];
		cursor += 1;
	}
	return args.slice(cursor);
}
function resolvePluginInstallArgvRequest(commandPath, argv) {
	const tokens = resolvePluginInstallArgvTokens(commandPath, argv);
	let rawSpec = null;
	let marketplace;
	for (let index = 0; index < tokens.length; index += 1) {
		const token = tokens.at(index);
		if (token === void 0) break;
		if (token.startsWith("--marketplace=")) {
			marketplace = token.slice(14);
			continue;
		}
		if (token === "--marketplace") {
			const value = tokens[index + 1];
			if (typeof value === "string") {
				marketplace = value;
				index += 1;
			}
			continue;
		}
		if (token.startsWith("-")) continue;
		rawSpec ??= token;
	}
	return rawSpec ? {
		rawSpec,
		marketplace
	} : null;
}
/** Recover the plugin install request from Commander state plus raw argv fallback parsing. */
function resolvePluginInstallPreactionRequest(params) {
	if (params.commandPath[0] !== "plugins" || params.commandPath[1] !== "install") return null;
	const argvRequest = resolvePluginInstallArgvRequest(params.commandPath, params.argv);
	const opts = params.actionCommand.opts();
	const marketplace = (typeof opts.marketplace === "string" && opts.marketplace.trim() ? opts.marketplace : argvRequest?.marketplace) || void 0;
	const rawSpec = (typeof params.actionCommand.processedArgs?.[0] === "string" ? params.actionCommand.processedArgs[0] : argvRequest?.rawSpec) ?? null;
	if (!rawSpec) return null;
	const request = resolvePluginInstallRequestContext({
		rawSpec,
		marketplace
	});
	return request.ok ? request.request : null;
}
//#endregion
//#region src/cli/program/preaction.ts
const HELP_OR_VERSION_FLAGS = /* @__PURE__ */ new Set([
	"-h",
	"--help",
	"-V",
	"--version"
]);
function setProcessTitleForCommand() {
	if (process.title !== "openclaw") process.title = CLI_NAME;
}
function shouldAllowInvalidConfigForAction(actionCommand, commandPath) {
	return commandPath[0] === "update" || resolvePluginInstallInvalidConfigPolicy(resolvePluginInstallPreactionRequest({
		actionCommand,
		commandPath,
		argv: process.argv
	})) === "allow-plugin-recovery";
}
function getCliLogLevel(actionCommand) {
	if (actionCommand.getOptionValueSourceWithGlobals("logLevel") !== "cli") return;
	const logLevel = actionCommand.optsWithGlobals().logLevel;
	return typeof logLevel === "string" ? logLevel : void 0;
}
function getCommandAgentId(actionCommand) {
	if (!actionCommand.options.some((option) => option.attributeName() === "agent")) return;
	const value = actionCommand.getOptionValueSource("agent") === "cli" ? actionCommand.getOptionValue("agent") : inheritOptionFromParent(actionCommand, "agent", "cli");
	return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function isBareParentDefaultHelpInvocation(actionCommand, argv) {
	if (!isParentDefaultHelpAction(actionCommand)) return false;
	const { commandPath } = resolveCliArgvInvocation(argv);
	const [primary, extra] = commandPath;
	if (extra !== void 0 || !primary) return false;
	return primary === actionCommand.name() || actionCommand.aliases().includes(primary);
}
function isGuidedConfigAction(actionCommand) {
	return actionCommand.name() === "config" && !actionCommand.parent?.parent;
}
function isGuidedConfigCommandPath(commandPath) {
	const [primary, secondary, extra] = commandPath;
	if (primary !== "config" || extra !== void 0) return false;
	return secondary !== "get" && secondary !== "set" && secondary !== "patch" && secondary !== "unset" && secondary !== "file" && secondary !== "schema" && secondary !== "validate";
}
function isGatewayRunAction(actionCommand) {
	if (actionCommand.name() === "gateway") return actionCommand.parent?.parent === null;
	return actionCommand.name() === "run" && actionCommand.parent?.name() === "gateway" && actionCommand.parent.parent?.parent === null;
}
async function runStateStoreGuard(commandPath) {
	if (resolveCliCommandPathPolicy(commandPath).stateStoreGuard !== "run") return;
	let outcome;
	try {
		const { checkCliGatewayStateDir } = await import("./state-dir-gateway-check--C8ojm5a.mjs");
		outcome = await checkCliGatewayStateDir({ command: `openclaw ${commandPath.join(" ")}` });
	} catch (error) {
		const { formatErrorMessage } = await import("./infra/errors.js");
		const { logDebug } = await import("./logger-DAGjG-Zq.mjs");
		logDebug(`state-store guard unavailable: ${formatErrorMessage(error)}`);
		return;
	}
	if (outcome.kind === "warn") defaultRuntime.log(outcome.message);
	else if (outcome.kind === "refuse") throw new Error(outcome.message);
}
/** Register global pre-action bootstrap hooks for every non-help command invocation. */
function registerPreActionHooks(program, programVersion) {
	program.hook("preAction", async (_thisCommand, actionCommand) => {
		setProcessTitleForCommand();
		const argv = process.argv;
		const helpOrVersionWasOptionValue = hasCommanderOptionToken(actionCommand, argv, HELP_OR_VERSION_FLAGS, "value");
		if (isHelpOrVersionInvocation(argv) && !helpOrVersionWasOptionValue || isBareParentDefaultHelpInvocation(actionCommand, argv)) return;
		const commandPath = getCommanderCommandPath(actionCommand);
		const nativeUpdateExecutorCheck = commandPath.length === 2 && (commandPath[0] === "gateway" || commandPath[0] === "daemon") && [
			"install",
			"restart",
			"stop"
		].includes(commandPath[1] ?? "") && actionCommand.args.length === 0 && actionCommand.getOptionValueSource("updateExecutor") === "cli" && actionCommand.getOptionValue("updateExecutor") === "check";
		const jsonOutputMode = nativeUpdateExecutorCheck || isCommandJsonOutputMode(actionCommand, argv);
		const machineOutputMode = jsonOutputMode || isModelsPlainMachineOutput(argv, actionCommand);
		applyResolvedCommandOutputMode(jsonOutputMode, machineOutputMode);
		const startupPolicy = resolveCliStartupPolicy({
			argv,
			options: actionCommand.opts(),
			commandPath,
			jsonOutputMode,
			machineOutputMode,
			env: process.env,
			nativeUpdateExecutorCheck
		});
		await applyCliExecutionStartupPresentation({
			startupPolicy,
			version: programVersion
		});
		const verbose = getVerboseFlag(argv, { includeDebug: true });
		setVerbose(verbose);
		const cliLogLevel = getCliLogLevel(actionCommand);
		if (cliLogLevel) process.env.OPENCLAW_LOG_LEVEL = cliLogLevel;
		if (!verbose) process.env.NODE_NO_WARNINGS ??= "1";
		if (nativeUpdateExecutorCheck || isGuidedConfigAction(actionCommand) || isGuidedConfigCommandPath(commandPath)) return;
		await runStateStoreGuard(commandPath);
		if (startupPolicy.skipConfigGuard) {
			await ensureCliExecutionBootstrap({
				runtime: defaultRuntime,
				commandPath,
				startupPolicy,
				skipConfigGuard: true
			});
			return;
		}
		let beforeStatePreparation;
		let allowInvalid = shouldAllowInvalidConfigForAction(actionCommand, commandPath);
		if (isGatewayRunAction(actionCommand)) {
			const { prepareGatewayRunBootstrap, recheckGatewayRunBootstrap } = await import("./pre-bootstrap-57Z4vCmY.mjs");
			const { resolveGatewayRunOptions } = await import("./run-options-Z77J6fEM.mjs");
			const resolvedOptions = resolveGatewayRunOptions(actionCommand.opts(), actionCommand);
			allowInvalid ||= resolvedOptions.allowUnconfigured === true;
			const opts = resolvedOptions;
			if (!await prepareGatewayRunBootstrap({
				opts,
				runtime: defaultRuntime
			})) return;
			beforeStatePreparation = (snapshot) => recheckGatewayRunBootstrap({
				opts,
				runtime: defaultRuntime,
				...snapshot ? { snapshot } : {}
			});
		}
		const commandAgentId = getCommandAgentId(actionCommand);
		if (commandAgentId) {
			const existingGuard = beforeStatePreparation;
			beforeStatePreparation = async (snapshot) => {
				if (snapshot) {
					const { isValidAgentId, normalizeAgentId } = await import("./normalization-core/agent-id.js");
					if (isValidAgentId(commandAgentId)) {
						const [{ listAgentIds }, { retainLegacyDefaultAgentId }] = await Promise.all([import("./agent-scope-config-zhU6xZV8.mjs"), import("./legacy.default-agent-owner-BoQnkHtn.mjs")]);
						const agentId = normalizeAgentId(commandAgentId);
						if (listAgentIds(snapshot.sourceConfig).includes(agentId)) retainLegacyDefaultAgentId(snapshot.sourceConfig, agentId);
					}
				}
				return await existingGuard?.(snapshot) ?? true;
			};
		}
		await ensureCliExecutionBootstrap({
			runtime: defaultRuntime,
			commandPath,
			startupPolicy,
			allowInvalid,
			...beforeStatePreparation ? { beforeStatePreparation } : {}
		});
		if (beforeStatePreparation && isGatewayRunAction(actionCommand)) {
			const { reloadTrustedGatewayRunEnvironment } = await import("./pre-bootstrap-57Z4vCmY.mjs");
			await reloadTrustedGatewayRunEnvironment({ runtime: defaultRuntime });
		}
	});
}
//#endregion
//#region src/cli/program/build-program.ts
function buildProgram(prepared) {
	const program = new OpenClawCommand();
	program.enablePositionalOptions();
	program.exitOverride((err) => {
		process$1.exitCode = typeof err.exitCode === "number" ? err.exitCode : 1;
		throw err;
	});
	const ctx = createProgramContext(prepared);
	const argv = process$1.argv;
	setProgramContext(program, ctx);
	configureProgramHelp(program, ctx);
	registerPreActionHooks(program, ctx.programVersion);
	registerCoreCliCommands(program, ctx, argv);
	registerSubCliCommands(program, argv);
	return program;
}
//#endregion
export { buildProgram, forceFreePort };
