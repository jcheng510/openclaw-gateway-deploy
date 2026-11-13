import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { r as resolveRuntimeScriptPosition, t as isBunRuntime } from "./runtime-binary-ZFwXIj1k.mjs";
import { n as consumeRootCommandOptionToken } from "./cli-root-options-DGcy1qRg.mjs";
import { d as pathExists } from "./fs-safe-CHQXnCPk.mjs";
import { t as quoteCliArg } from "./quote-cli-arg-BEt71TUh.mjs";
import { n as readPackageName, r as readPackageVersion } from "./package-json-7gGhB8Vf.mjs";
import path from "node:path";
import fs from "node:fs/promises";
//#region src/daemon/service-types.ts
const SERVICE_DEFINITION_ARTIFACTS = {
	"service-directory": "service directory (~/.config/systemd/user) or its nearest existing ancestor",
	"state-directory": "service state directory or its nearest existing ancestor",
	"definition-directory": "loaded service definition directory",
	"service-file": "service file"
};
const SERVICE_DEFINITION_REASONS = {
	"unsafe-permissions": "is group/world-writable. Inspect ownership and permissions locally. If the path is yours and not intentionally shared, remove group/other write access with chmod go-w <path>, then retry. Use 0700 for private directories; ask the deployment owner about shared paths. Do not use recursive chmod or sudo to bypass this check.",
	"invalid-artifact": "has an unexpected file type. Inspect the service directories and files locally; have their owner repair the layout before retrying. Changing permissions alone will not repair it.",
	symlink: "is a symbolic link. Ask the deployment owner to replace the managed file through the deployment process; OpenClaw will not rewrite the link or its target.",
	"foreign-owner": "belongs to another account. Ask the privileged deployment owner to repair or replace it; do not take ownership or use --force to bypass this check.",
	"sealed-mount": "cannot be replaced on its mount. Ask the deployment owner to update the mounted artifact or deployment; chmod and --force cannot make it replaceable.",
	"system-owned": "is owned by a system service. Ask the privileged deployment owner to update it; do not create a competing user service.",
	"system-ownership-unverified": "has unverifiable system-service ownership. Restore system service-manager and filesystem inspection access from the service account, then retry; do not create a competing user service.",
	"inspection-failed": "cannot be safely inspected. Inspect service definition access and native service-manager availability from the service account, then retry. Do not share config or environment contents."
};
function assertServiceDefinitionWritable(capability) {
	if (capability.kind === "writable") return;
	const reason = Object.hasOwn(SERVICE_DEFINITION_REASONS, capability.reason) ? capability.reason : "inspection-failed";
	const artifact = capability.artifact && Object.hasOwn(SERVICE_DEFINITION_ARTIFACTS, capability.artifact) ? SERVICE_DEFINITION_ARTIFACTS[capability.artifact] : "service definition";
	const code = capability.kind === "sealed" ? "SERVICE_DEFINITION_SEALED" : "SERVICE_DEFINITION_UNKNOWN";
	const location = capability.path ? ` ${JSON.stringify(capability.path)}` : "";
	throw new Error(`${code}: [${reason}] The ${artifact}${location} ${SERVICE_DEFINITION_REASONS[reason]}`);
}
function resolveManagedGatewayServiceCommand(command) {
	return command?.managedDefinition ?? command ?? null;
}
/** Empty inspected overrides are ordinary metadata; a base without inspection is unknown. */
function hasGatewayServiceDefinitionOverrides(command) {
	return command?.managedOverrides ? Object.keys(command.managedOverrides).length > 0 : Boolean(command?.managedDefinition);
}
/** Operator-owned launcher overrides cannot be repaired by rewriting the managed base. */
function hasGatewayServiceLauncherOverride(command, options) {
	const managedOverrides = command?.managedOverrides;
	const includeWorkingDirectory = options?.includeWorkingDirectory !== false;
	if (managedOverrides) return Boolean(managedOverrides.launcher && (includeWorkingDirectory || managedOverrides.launcher !== "working-directory"));
	const managedDefinition = command?.managedDefinition;
	return Boolean(managedDefinition && (includeWorkingDirectory && managedDefinition.workingDirectory !== command.workingDirectory || managedDefinition.programArguments.join("\0") !== command.programArguments.join("\0")));
}
function hasGatewayServiceEnvironmentOverride(command, keys, options) {
	const managedOverrides = command?.managedOverrides;
	if (!managedOverrides) return hasGatewayServiceEnvironmentDifference(command, keys);
	const environment = managedOverrides.environment;
	if (environment === true || !environment) return environment === true && keys.length > 0;
	const normalize = options?.normalizeKey ?? ((key) => key);
	const ownedKeys = new Set(environment.keys?.map(normalize));
	const sources = options?.environmentValueSources ?? command.managedDefinition?.environmentValueSources;
	return keys.some((key) => {
		const normalized = normalize(key);
		if (normalized !== null && ownedKeys.has(normalized)) return true;
		if (options?.ignoreResets) return false;
		const source = sources?.[key] ?? (options?.normalizeKey && Object.entries(sources ?? {}).find(([rawKey]) => normalize(rawKey) === normalized)?.[1]) ?? "inline";
		return Boolean(environment.resetInline && source !== "file" || environment.resetFiles && source !== "inline");
	});
}
function hasGatewayServiceEnvironmentDifference(command, keys) {
	const managedDefinition = command?.managedDefinition;
	return Boolean(managedDefinition && keys.some((key) => command.environment?.[key] !== managedDefinition.environment?.[key] || (command.environmentValueSources?.[key] ?? "inline") !== (managedDefinition.environmentValueSources?.[key] ?? "inline")));
}
/** Remove inherited operator overrides before a managed definition is rewritten. */
function resolveManagedGatewayServiceProcessEnv(command, processEnv) {
	const overrides = command?.managedOverrides?.environment;
	if (overrides === true || overrides?.resetInline || overrides?.resetFiles) return null;
	const managedEnvironment = resolveManagedGatewayServiceCommand(command)?.environment;
	const environment = {
		...processEnv,
		...managedEnvironment
	};
	for (const key of [...Object.keys(command?.environment ?? {}), ...overrides?.keys ?? []]) if (!Object.hasOwn(managedEnvironment ?? {}, key)) delete environment[key];
	return environment;
}
//#endregion
//#region src/daemon/service-layout.ts
/** Summarizes installed service command paths and OpenClaw package layout. */
/** Shared admission for moving a verified packaged launcher onto the active CLI. */
async function resolveGatewayServiceInstallationRefreshRoot(params) {
	const { root, state } = params;
	const { command } = state;
	const managerUid = state.runtime?.systemd?.managerUid;
	if (!root || !command || isBunRuntime(command.programArguments[0] ?? "") || state.loadState.status === "unknown" || state.runtime?.status !== "running" && state.runtime?.status !== "stopped" || process.platform === "linux" && (managerUid === void 0 || !Number.isInteger(managerUid) || managerUid < 0 || managerUid >= 4294967295) || (state.definitionMutationCapability?.kind ?? "writable") !== "writable" || hasGatewayServiceLauncherOverride(command) || resolveManagedGatewayServiceProcessEnv(command, state.env) === null || await readPackageName(root) !== "openclaw" || await isGatewayServiceSourceCheckoutRoot(root)) return;
	const layout = await summarizeGatewayServiceLayout(command);
	return layout?.entrypointSourceCheckout ? void 0 : layout?.packageRootReal;
}
function resolveManagedServiceNodeRunner(command) {
	const args = command?.programArguments ?? [];
	const runner = args.indexOf("gateway") > 1 ? args[0] : void 0;
	const executable = normalizeOptionalString(runner ? path.basename(runner) : void 0);
	return ["node", "node.exe"].includes(executable?.toLowerCase() ?? "") ? runner : void 0;
}
/** Local package evidence remains available when the Gateway cannot answer a probe. */
async function inspectGatewayServiceInstallationDrift(layout, activeRoot) {
	const serviceRoot = layout?.packageRootReal;
	const activeRootReal = await tryRealpath(activeRoot);
	if (!serviceRoot || !activeRootReal || serviceRoot === activeRootReal) return;
	const [serviceStat, activeStat] = await Promise.all([serviceRoot, activeRootReal].map((root) => fs.stat(root).catch(() => void 0)));
	if (serviceStat && activeStat && serviceStat.dev === activeStat.dev && serviceStat.ino === activeStat.ino) return;
	const activeVersion = await readPackageVersion(activeRootReal) ?? void 0;
	return {
		serviceRoot,
		activeRoot: activeRootReal,
		serviceVersion: layout.packageVersion ?? await readPackageVersion(serviceRoot) ?? void 0,
		activeVersion
	};
}
function resolveSystemdScopeFromServicePath(sourcePath) {
	const normalized = sourcePath?.replaceAll("\\", "/") ?? "";
	if (!normalized.endsWith(".service")) return;
	if (normalized.startsWith("/etc/systemd/") || normalized.startsWith("/usr/lib/systemd/") || normalized.startsWith("/lib/systemd/")) return "system";
	return "user";
}
function resolveServiceEntrypointIndex(programArguments) {
	const args = [...programArguments];
	const script = resolveRuntimeScriptPosition(args);
	if (typeof script !== "number" && script.kind === "other") return;
	const first = typeof script === "number" ? script : 0;
	const last = typeof script === "number" ? script : args.length - 1;
	for (let entrypoint = first; entrypoint <= last; entrypoint++) {
		const argument = args[entrypoint];
		if (!argument || argument.startsWith("-")) continue;
		let command = entrypoint + 1;
		while (command < args.length) {
			if (args[command] === "--") {
				command++;
				break;
			}
			const consumed = consumeRootCommandOptionToken(args, command);
			if (!consumed) break;
			command += consumed;
		}
		if (args[command] === "gateway" || args[command] === "node" && args[command + 1] === "run") return entrypoint;
	}
}
function resolveServiceEntrypoint(command) {
	const entrypointIndex = resolveServiceEntrypointIndex(command.programArguments);
	if (entrypointIndex === void 0) return;
	const entrypoint = command.programArguments[entrypointIndex];
	if (!entrypoint) return;
	if (path.isAbsolute(entrypoint) || path.win32.isAbsolute(entrypoint)) return entrypoint;
	const workingDirectory = command.workingDirectory?.trim();
	if (!workingDirectory) return;
	if (path.isAbsolute(workingDirectory)) return path.resolve(workingDirectory, entrypoint);
	if (path.win32.isAbsolute(workingDirectory)) return path.win32.resolve(workingDirectory, entrypoint);
}
async function tryRealpath(value) {
	if (!value) return;
	const resolved = path.resolve(value);
	try {
		return await fs.realpath(resolved);
	} catch {
		return resolved;
	}
}
async function isGatewayServiceSourceCheckoutRoot(candidate) {
	if (!(await pathExists(path.join(candidate, ".git")) || await pathExists(path.join(candidate, "pnpm-workspace.yaml")))) return false;
	return await pathExists(path.join(candidate, "src")) && await pathExists(path.join(candidate, "extensions"));
}
async function resolveOpenClawPackageRoot(entrypoint) {
	let current = path.dirname(path.resolve(entrypoint));
	for (let depth = 0; depth < 8; depth += 1) {
		const packageJson = path.join(current, "package.json");
		if (await pathExists(packageJson)) {
			if (await readPackageName(current) === "openclaw") return current;
		}
		const next = path.dirname(current);
		if (next === current) return;
		current = next;
	}
}
async function summarizeGatewayServiceLayout(command) {
	if (!command) return;
	const sourcePath = command.sourcePath?.trim() || void 0;
	const entrypoint = resolveServiceEntrypoint(command);
	const [sourcePathReal, entrypointReal] = await Promise.all([tryRealpath(sourcePath), tryRealpath(entrypoint)]);
	const packageRoot = entrypointReal ? await resolveOpenClawPackageRoot(entrypointReal) : void 0;
	const packageRootReal = await tryRealpath(packageRoot);
	const packageVersion = packageRoot ? await readPackageVersion(packageRoot) ?? void 0 : void 0;
	const entrypointSourceCheckout = packageRootReal ? await isGatewayServiceSourceCheckoutRoot(packageRootReal) : void 0;
	return {
		execStart: command.programArguments.map(quoteCliArg).join(" "),
		...sourcePath ? { sourcePath } : {},
		...sourcePathReal ? { sourcePathReal } : {},
		...sourcePath ? { sourceScope: resolveSystemdScopeFromServicePath(sourcePath) } : {},
		...entrypoint ? { entrypoint } : {},
		...entrypointReal ? { entrypointReal } : {},
		...packageRoot ? { packageRoot } : {},
		...packageRootReal ? { packageRootReal } : {},
		...packageVersion ? { packageVersion } : {},
		...entrypointSourceCheckout !== void 0 ? { entrypointSourceCheckout } : {}
	};
}
/** Compare an already inspected launcher with one installation; no service discovery or effects. */
async function gatewayServiceCommandMatchesRoot(root, command) {
	const expectedRoot = normalizeOptionalString(root);
	if (!expectedRoot) return null;
	const layout = await summarizeGatewayServiceLayout(command);
	const serviceRoot = layout?.packageRoot;
	const serviceEntrypoint = layout?.entrypoint;
	if (!serviceRoot || !serviceEntrypoint || !path.isAbsolute(serviceEntrypoint) && !path.win32.isAbsolute(serviceEntrypoint)) return null;
	const [expectedRootReal, serviceRootReal] = await Promise.all([tryRealpath(expectedRoot), tryRealpath(serviceRoot)]);
	if (expectedRootReal === serviceRootReal) return true;
	const [expected, actual] = await Promise.all([expectedRootReal, serviceRootReal].map((directory) => fs.stat(directory).catch(() => null)));
	if (expected && actual && expected.dev === actual.dev && expected.ino === actual.ino) return true;
	const managed = command?.managedDefinition;
	if (!managed || await gatewayServiceCommandMatchesRoot(expectedRoot, managed) !== true) return false;
	const namespace = path.dirname(expectedRootReal);
	const managedLayout = await summarizeGatewayServiceLayout(managed);
	if (serviceEntrypoint !== path.join(namespace, "current", "dist", path.basename(managedLayout?.entrypoint ?? ""))) return false;
	const releases = path.join(namespace, "releases");
	if (serviceRootReal.startsWith(`${releases}${path.sep}`)) return true;
	try {
		for await (const entry of await fs.opendir(releases)) {
			const candidate = await fs.lstat(path.join(releases, entry.name));
			if (actual && candidate.dev === actual.dev && candidate.ino === actual.ino) return true;
		}
	} catch {}
	return false;
}
//#endregion
export { resolveServiceEntrypoint as a, assertServiceDefinitionWritable as c, hasGatewayServiceEnvironmentOverride as d, hasGatewayServiceLauncherOverride as f, resolveManagedServiceNodeRunner as i, hasGatewayServiceDefinitionOverrides as l, resolveManagedGatewayServiceProcessEnv as m, inspectGatewayServiceInstallationDrift as n, resolveServiceEntrypointIndex as o, resolveManagedGatewayServiceCommand as p, resolveGatewayServiceInstallationRefreshRoot as r, summarizeGatewayServiceLayout as s, gatewayServiceCommandMatchesRoot as t, hasGatewayServiceEnvironmentDifference as u };
