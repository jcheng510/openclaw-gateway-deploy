import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { n as isNodeRuntime, t as isBunRuntime } from "./runtime-binary-ZFwXIj1k.mjs";
import { t as buildParseArgv } from "./argv-vtXWEchA.mjs";
import { c as isGatewayServiceEnv } from "./constants-CQ41zfz1.mjs";
import { t as normalizeHomeDirValue } from "./home-dir-D0b-ywue.mjs";
import { i as resolveRequiredHomeDir } from "./home-dir-CjKH62jd.mjs";
import { n as normalizeProfileName, t as isValidProfileName } from "./profile-utils-C6wleDCE.mjs";
import { n as parseCliProfileArgs, t as applyCliProfileEnv } from "./profile-DP60mtnX.mjs";
import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { r as isMissingPathError, t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { r as parseTcpPortFromArgs } from "./tcp-port-DAu3gF8F.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { c as isNamedProfile, d as parseGatewayPortEnvValue, h as resolveConfigPathCandidate, o as isDefaultInstallIdentity } from "./paths-CtO6iw0c.mjs";
import "./errors-YPvSaqwO.mjs";
import { n as sanitizeForLog } from "./ansi-6Z0Nu6M4.mjs";
import { t as quoteCliArg } from "./quote-cli-arg-BEt71TUh.mjs";
import { t as resolveDaemonHomeDir } from "./paths-Ix3a0B74.mjs";
import { i as ServiceOwnershipRefusalError, o as findServiceOwnershipRefusal, r as ServiceInspectionError } from "./service-inspection-error-C_WINlwy.mjs";
import { o as resolveServiceEntrypointIndex, s as summarizeGatewayServiceLayout } from "./service-layout-BP96VEeH.mjs";
import { I as isRunningAsRoot, N as execSystemctl, W as readSystemctlDetail, i as resolveInstalledSystemdServiceNameCandidates, j as execBusctlSystem, l as resolveSystemdUnitPathForName, r as readSystemdServiceExecStart, s as resolveSystemdServiceName, z as isSystemdUnitActive } from "./systemd-service-files-CS2rOHBM.mjs";
import { r as resolveSystemdUnitLoadPaths } from "./systemd-unit-load-paths-5tqHLXY1.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
//#region src/daemon/systemd-system.ts
/** Detects system-scope systemd ownership before mutating a user gateway unit. */
function formatUnknownError(error) {
	const raw = error instanceof Error ? error.message : String(error);
	return truncateUtf16Safe(sanitizeForLog(raw), 500);
}
function unverifiableSystemOwnership(unitName, detail, operation = "systemctl") {
	return {
		status: "unverifiable",
		unitName,
		operation,
		detail
	};
}
async function querySystemManager(unitName, run = execSystemctl) {
	const result = await run([
		"show",
		"--property=LoadState",
		"--value",
		unitName
	]);
	const loadState = result.stdout.trim().toLowerCase();
	if (result.code === 0) {
		if (loadState === "not-found") return {
			status: "absent",
			unitName
		};
		if (loadState) return {
			status: "loaded",
			unitName
		};
		return unverifiableSystemOwnership(unitName, "systemctl returned no LoadState");
	}
	const detail = readSystemctlDetail(result) || `systemctl exited with code ${result.code}`;
	const normalizedDetail = detail.toLowerCase();
	if (result.termination === "exit" && normalizedDetail.includes(unitName.toLowerCase()) && /not[- ]found|could not be found/i.test(normalizedDetail)) return {
		status: "absent",
		unitName
	};
	return unverifiableSystemOwnership(unitName, detail);
}
async function findInstalledSystemUnit(unitName, run = execSystemctl) {
	const result = await run([
		"show",
		"--property=UnitPath",
		"--value"
	]);
	if (result.code !== 0) return unverifiableSystemOwnership(unitName, readSystemctlDetail(result) || `systemctl exited with code ${result.code}`);
	const loadPaths = [...new Set(result.stdout.split(/\s+/).filter(path.posix.isAbsolute))];
	if (loadPaths.length === 0) return unverifiableSystemOwnership(unitName, "systemctl returned no system manager unit load paths");
	return await findInstalledSystemUnitInPaths(unitName, loadPaths);
}
async function findInstalledSystemUnitInPaths(unitName, loadPaths) {
	for (const dir of loadPaths) {
		const unitPath = path.posix.join(dir, unitName);
		try {
			await fs.lstat(unitPath);
			return {
				status: "installed",
				unitName,
				unitPath
			};
		} catch (error) {
			if (isMissingPathError(error)) continue;
			return unverifiableSystemOwnership(unitName, `${unitPath}: ${formatUnknownError(error)}`, "filesystem");
		}
	}
	return {
		status: "absent",
		unitName
	};
}
/** Do not activate a system manager or load a unit during update admission. */
async function inspectLoadedSystemOwnership(unitName, timeoutMs) {
	const manager = "org.freedesktop.systemd1";
	const bus = "org.freedesktop.DBus";
	const missingUnit = Symbol("affirmative native absence");
	const deadline = performance.now() + (timeoutMs && Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 5e3);
	const unavailable = () => /* @__PURE__ */ new Error("Non-loading system manager inspection unavailable.");
	const query = async (args, signature, allowMissing = false) => {
		const remaining = deadline - performance.now();
		if (remaining <= 0) throw unavailable();
		const result = await execBusctlSystem([
			"--auto-start=no",
			"--json=short",
			...args
		], remaining);
		if (result.termination !== "exit" || performance.now() >= deadline) throw unavailable();
		if (result.code !== 0) {
			if (allowMissing && [`Call failed: Unit ${unitName} not loaded.`, `Call failed: Unit ${unitName} not found.`].includes(result.stderr.trim())) return missingUnit;
			throw unavailable();
		}
		const parsed = asOptionalRecord(JSON.parse(result.stdout));
		if (parsed?.type !== signature) throw unavailable();
		return parsed.data;
	};
	const readOwner = async () => {
		const value = await query([
			"call",
			bus,
			"/org/freedesktop/DBus",
			bus,
			"GetNameOwner",
			"s",
			manager
		], "s");
		if (!Array.isArray(value) || value.length !== 1 || typeof value[0] !== "string" || !/^:[0-9]+\.[0-9]+$/.test(value[0])) throw unavailable();
		return value[0];
	};
	try {
		if (path.posix.basename(unitName) !== unitName) throw unavailable();
		const owner = await readOwner();
		const readLoaded = async () => {
			const value = await query([
				"call",
				owner,
				"/org/freedesktop/systemd1",
				`${manager}.Manager`,
				"GetUnit",
				"s",
				unitName
			], "o", true);
			if (value === missingUnit) return false;
			if (!Array.isArray(value) || value.length !== 1 || typeof value[0] !== "string" || !/^\/org\/freedesktop\/systemd1\/unit\/[A-Za-z0-9_]+$/.test(value[0])) throw unavailable();
			return true;
		};
		if (await readLoaded()) return {
			status: "loaded",
			unitName
		};
		const paths = await query([
			"get-property",
			owner,
			"/org/freedesktop/systemd1",
			`${manager}.Manager`,
			"UnitPath"
		], "as");
		if (!Array.isArray(paths) || paths.length === 0 || !paths.every((entry) => typeof entry === "string" && path.posix.isAbsolute(entry) && !entry.includes("\0"))) throw unavailable();
		const installed = await findInstalledSystemUnitInPaths(unitName, [...new Set(paths)]);
		if (installed.status !== "absent") return installed;
		if (await readLoaded()) return {
			status: "loaded",
			unitName
		};
		if (owner !== await readOwner()) throw unavailable();
		return {
			status: "absent",
			unitName
		};
	} catch (error) {
		return unverifiableSystemOwnership(unitName, formatUnknownError(error), "busctl");
	}
}
async function inspectSystemSystemdOwnership(unitName, timeoutMs, options) {
	if (process.platform !== "linux") return {
		status: "absent",
		unitName
	};
	if (options?.requireLoaded) return await inspectLoadedSystemOwnership(unitName, timeoutMs);
	const deadline = timeoutMs && timeoutMs > 0 ? performance.now() + timeoutMs : void 0;
	const remaining = () => deadline ? Math.max(1, deadline - performance.now()) : void 0;
	const run = (args) => execSystemctl(args, void 0, remaining());
	const initialQuery = await querySystemManager(unitName, run);
	if (initialQuery.status !== "absent") return initialQuery;
	const installed = await findInstalledSystemUnit(unitName, run);
	if (installed.status !== "absent") return installed;
	return await querySystemManager(unitName, run);
}
function formatSystemSystemdOwnershipError(ownership) {
	const privilegePrefix = isRunningAsRoot() ? "" : "sudo ";
	const unitName = quoteCliArg(ownership.unitName);
	const summary = ownership.status === "loaded" ? `System systemd unit ${ownership.unitName} already owns this gateway unit name.` : ownership.status === "installed" ? `System systemd unit ${ownership.unitPath} already owns this gateway unit name.` : `System systemd ownership for ${ownership.unitName} could not be verified: ${ownership.detail}`;
	const installedInAdministratorPath = ownership.status === "installed" && (ownership.unitPath.startsWith("/etc/systemd/system/") || ownership.unitPath.startsWith("/etc/systemd/system.control/"));
	return [
		summary,
		"Refusing to create or activate a user systemd unit with the same name because duplicate managers can restart-loop the gateway.",
		"OpenClaw does not manage system-scope units, and --force does not override system ownership.",
		ownership.status === "loaded" ? `Keep it as the sole gateway manager, or inspect it with \`${privilegePrefix}systemctl cat ${unitName}\`, then disable it and uninstall or reconfigure the package, generator, or administrator unit that owns it before retrying.` : installedInAdministratorPath ? `Keep it as the sole gateway manager, or run \`${privilegePrefix}systemctl disable --now ${unitName}\`, \`${privilegePrefix}rm ${quoteCliArg(ownership.unitPath)}\`, and \`${privilegePrefix}systemctl daemon-reload\` before retrying.` : ownership.status === "installed" ? `Keep it as the sole gateway manager, or inspect it with \`${privilegePrefix}systemctl cat ${unitName}\`, then uninstall or reconfigure the package, generator, or runtime owner of ${quoteCliArg(ownership.unitPath)} before retrying.` : "Fix the reported systemctl or filesystem access error, then retry."
	].join("\n");
}
var SystemSystemdOwnershipError = class extends ServiceOwnershipRefusalError {
	constructor(ownership) {
		super("systemd-competing-managers", formatSystemSystemdOwnershipError(ownership));
		this.ownership = ownership;
		this.code = "SYSTEM_SYSTEMD_OWNERSHIP";
		this.name = "SystemSystemdOwnershipError";
	}
};
function isSystemSystemdOwnershipError(error) {
	return error instanceof SystemSystemdOwnershipError;
}
async function assertNoSystemSystemdOwnership(unitName, timeoutMs, options) {
	const ownership = await inspectSystemSystemdOwnership(unitName, timeoutMs, options);
	if (ownership.status !== "absent") throw new SystemSystemdOwnershipError(ownership);
}
//#endregion
//#region src/daemon/systemd-scope.ts
/** Installed systemd scope discovery and dueling-manager diagnostics. */
const SYSTEM_SYSTEMD_UNIT_DIRS = [
	"/etc/systemd/system",
	"/usr/lib/systemd/system",
	"/lib/systemd/system"
];
/** Proves service absence without interpreting failed manager commands as absence. */
async function isSystemdServiceAbsent(env, opts) {
	if (opts?.strictCommandAbsent) {
		try {
			await assertNoSystemSystemdOwnership(`${resolveSystemdServiceName(env)}.service`, opts.timeoutMs, { requireLoaded: true });
		} catch (error) {
			if (isSystemSystemdOwnershipError(error)) return false;
			throw error;
		}
		return await findInstalledSystemdGatewayScope(env, {
			requireLoaded: true,
			timeoutMs: opts.timeoutMs
		}) === null;
	}
	if (env.DBUS_SESSION_BUS_ADDRESS || env.DBUS_SYSTEM_BUS_ADDRESS || env.SYSTEMD_UNIT_PATH || env.SUDO_USER || isGatewayServiceEnv(env) || typeof process.geteuid !== "function") return false;
	const home = resolveDaemonHomeDir(env);
	const { runtimeRoots, userRoots, systemRoots } = resolveSystemdUnitLoadPaths(env, home, process.geteuid());
	const unitName = `${resolveSystemdServiceName(env)}.service`;
	if (![...runtimeRoots, ...userRoots].every((dir) => path.posix.isAbsolute(dir))) return false;
	const absentPaths = [
		"/run/systemd",
		...runtimeRoots.map((dir) => path.posix.join(dir, "systemd")),
		...userRoots.flatMap((dir) => [
			"user",
			"user.control",
			"user.attached"
		].map((scope) => path.posix.join(dir, "systemd", scope, unitName))),
		...systemRoots.filter((dir) => dir !== "/run").flatMap((dir) => [
			"system",
			"system.control",
			"system.attached"
		].map((scope) => path.posix.join(dir, "systemd", scope, unitName)))
	];
	for (const candidate of absentPaths) try {
		await fs.lstat(candidate);
		return false;
	} catch (error) {
		if (!hasErrnoCode(error, "ENOENT")) return false;
	}
	return await findInstalledSystemdGatewayScope(env) === null;
}
function unitBaseName(label) {
	return label.endsWith(".service") ? label.slice(0, -8) : label;
}
function systemdTemplatePrefix(base) {
	const cut = base.indexOf("@");
	if (cut <= 0) return null;
	return {
		template: base.slice(0, cut),
		instance: base.slice(cut + 1)
	};
}
function systemdInstalledNameProbes(names) {
	const probes = new Set(names);
	for (const name of names) {
		const parsed = systemdTemplatePrefix(name);
		if (parsed?.instance) probes.add(`${parsed.template}@`);
	}
	return [...probes];
}
function systemdUnitMatchesIdentity(label, allowedNames, explicit) {
	const base = unitBaseName(label);
	if (allowedNames.has(base)) return true;
	const parsed = systemdTemplatePrefix(base);
	if (!parsed) return false;
	const { template, instance } = parsed;
	if (!explicit && allowedNames.has(template) && (instance === "" || instance === "gateway")) return true;
	if (instance !== "") return false;
	const prefix = `${template}@`;
	for (const name of allowedNames) if (name.startsWith(prefix) && name.length > prefix.length) return true;
	return false;
}
function resolveSystemdTemplateInstanceName(unitName, env) {
	if (!unitName.endsWith("@.service")) return unitName;
	const template = unitName.slice(0, -9);
	const parsed = systemdTemplatePrefix(resolveSystemdServiceName(env));
	return `${template}@${parsed && parsed.template === template && parsed.instance ? parsed.instance : os.userInfo().username}.service`;
}
async function findSystemSystemdUnitPath(env) {
	const candidates = systemdInstalledNameProbes(resolveInstalledSystemdServiceNameCandidates(env));
	for (const name of candidates) {
		const serviceFile = `${name}.service`;
		for (const dir of SYSTEM_SYSTEMD_UNIT_DIRS) {
			const candidate = path.posix.join(dir, serviceFile);
			try {
				await fs.access(candidate);
				return {
					unitName: serviceFile,
					unitPath: candidate
				};
			} catch {
				continue;
			}
		}
	}
	return null;
}
async function assertNoSystemGatewayOwnership(env, timeoutMs) {
	if (env.OPENCLAW_SERVICE_KIND?.trim() === "node") return;
	await assertNoSystemSystemdOwnership(`${resolveSystemdServiceName(env)}.service`, timeoutMs);
}
/**
* Activation admission after the system-scope probe refused. An unverifiable
* probe cannot make a loaded user unit whose artifacts this account owns a
* competing manager; a proven system owner and an unloaded or foreign user unit
* still refuse with the original error.
*/
async function admitUserUnitActivationPastUnverifiableOwnership(env, error, timeoutMs) {
	if (!isSystemSystemdOwnershipError(error) || error.ownership.status !== "unverifiable") throw error;
	const { readSystemdDefinitionMutationCapability } = await import("./systemd-definition-mutation-G9vBzKwX.mjs");
	if ((await readSystemdDefinitionMutationCapability(env, {
		requireLoaded: true,
		...timeoutMs !== void 0 ? { timeoutMs } : {}
	}).catch(() => void 0))?.kind !== "writable") throw error;
}
async function assertNoSystemGatewayOwnershipForActivation(env, timeoutMs) {
	try {
		await assertNoSystemGatewayOwnership(env, timeoutMs);
	} catch (error) {
		await admitUserUnitActivationPastUnverifiableOwnership(env, error, timeoutMs);
	}
}
async function readSystemdGatewayCommand(env, target, options) {
	let command;
	try {
		command = await readSystemdServiceExecStart(env, {
			...options,
			systemdReadTarget: target,
			requireEffective: true
		});
	} catch (error) {
		if (findServiceOwnershipRefusal(error)?.reason === "systemd-account-refused") return null;
		throw error;
	}
	if (!command) return null;
	const serviceEnv = { ...command.environment };
	const accountHome = () => os.userInfo().homedir;
	const cwd = command.workingDirectory || (target.scope === "system" ? "/" : accountHome());
	for (const key of [
		"HOME",
		"USERPROFILE",
		"OPENCLAW_HOME",
		"OPENCLAW_STATE_DIR",
		"OPENCLAW_CONFIG_PATH"
	]) {
		const value = key === "OPENCLAW_STATE_DIR" || key === "OPENCLAW_CONFIG_PATH" ? serviceEnv[key]?.trim() : normalizeHomeDirValue(serviceEnv[key]);
		if (value && !path.isAbsolute(value) && !/^~(?:$|[\\/])/.test(value)) serviceEnv[key] = path.resolve(cwd, value);
	}
	const kind = serviceEnv.OPENCLAW_SERVICE_KIND?.trim();
	if (kind && kind !== "gateway") return null;
	const executable = command.programArguments[0] ?? "";
	const runtime = isNodeRuntime(executable) || isBunRuntime(executable);
	const profile = parseCliProfileArgs(buildParseArgv(command.programArguments, runtime ? "openclaw" : executable));
	if (!profile.ok) throw new Error("Systemd Gateway profile could not be inspected. Set OPENCLAW_SYSTEMD_UNIT.");
	if (profile.profile) applyCliProfileEnv({
		profile: profile.profile,
		env: serviceEnv,
		homedir: accountHome
	});
	const programArguments = runtime ? profile.argv : [executable, ...profile.argv.slice(2)];
	const entrypointIndex = resolveServiceEntrypointIndex(programArguments);
	if (entrypointIndex !== void 0 && programArguments[entrypointIndex + 1] === "node") return null;
	return {
		...command,
		programArguments,
		environment: serviceEnv
	};
}
async function inspectSystemdGatewayCommandLayout(command) {
	const executable = command.programArguments[0] ?? "";
	const runtime = isNodeRuntime(executable) || isBunRuntime(executable);
	const entrypointIndex = resolveServiceEntrypointIndex(command.programArguments);
	if (!(await summarizeGatewayServiceLayout(command))?.packageRoot || !runtime && entrypointIndex !== 0) throw new Error("Systemd Gateway launcher identity is unknown. Set OPENCLAW_SYSTEMD_UNIT.");
	if (!command.sourcePath) throw new Error("Systemd Gateway definition could not be inspected. Set OPENCLAW_SYSTEMD_UNIT.");
	return command.sourcePath;
}
async function systemdInstallationIdentity(env) {
	const profile = env.OPENCLAW_PROFILE?.trim();
	if (profile && !isValidProfileName(profile)) throw new Error("Systemd Gateway profile could not be inspected.");
	const home = () => os.userInfo().homedir;
	const paths = await Promise.all([
		resolveRequiredHomeDir(env, home),
		resolveStateDir(env, home),
		resolveConfigPathCandidate(env, home)
	].map(async (pathname) => {
		try {
			return await fs.realpath(pathname);
		} catch (error) {
			if (!hasErrnoCode(error, "ENOENT")) throw error;
			return path.resolve(pathname);
		}
	}));
	return JSON.stringify([normalizeProfileName(profile), ...paths]);
}
function systemdGatewayCommandPort(command) {
	const port = parseTcpPortFromArgs(command.programArguments);
	const envPort = command.environment?.OPENCLAW_GATEWAY_PORT?.trim();
	if (command.programArguments.some((arg) => arg === "--port" || arg.startsWith("--port=")) && port === null) throw new Error("Systemd Gateway port could not be inspected.");
	return port ?? parseGatewayPortEnvValue(envPort);
}
async function systemdUnitsShareInstallation(env, user, system, options, deadline) {
	const inspection = options?.loadForInspection;
	const assertInspectionCurrent = inspection?.assertReadCurrent ?? inspection?.assertCurrent;
	const assertCurrent = () => {
		assertInspectionCurrent?.();
		if (deadline !== void 0 && performance.now() >= deadline) throw new ServiceInspectionError("systemd-inspection-deadline-exceeded");
	};
	assertCurrent();
	const selected = await systemdInstallationIdentity(env);
	assertCurrent();
	let port;
	for (const target of [system, user]) {
		assertCurrent();
		const remaining = deadline === void 0 ? void 0 : deadline - performance.now();
		if (remaining !== void 0 && remaining <= 0) throw new ServiceInspectionError("systemd-inspection-deadline-exceeded");
		const command = await readSystemdGatewayCommand(env, target, {
			requireLoaded: true,
			timeoutMs: remaining
		});
		assertCurrent();
		if (!command) return false;
		const identity = await systemdInstallationIdentity(command.environment);
		assertCurrent();
		if (identity !== selected) return false;
		await inspectSystemdGatewayCommandLayout(command);
		assertCurrent();
		const commandPort = systemdGatewayCommandPort(command);
		if (port !== void 0 && port !== commandPort) return false;
		port = commandPort;
	}
	return true;
}
async function findMarkerOwnedSystemSystemdUnit(env, options, discoverCustom) {
	const deadline = options?.timeoutMs && options.timeoutMs > 0 ? performance.now() + options.timeoutMs : void 0;
	const allowedNames = new Set(resolveInstalledSystemdServiceNameCandidates(env));
	const allowCustom = discoverCustom && !env.OPENCLAW_SYSTEMD_UNIT?.trim() && !isNamedProfile(env) && isDefaultInstallIdentity(env);
	const custom = /* @__PURE__ */ new Map();
	const { findSystemGatewayServices } = await import("./inspect-BRayseMT.mjs");
	let services;
	try {
		services = await findSystemGatewayServices();
	} catch {
		return null;
	}
	for (const svc of services) {
		if (svc.platform !== "linux" || svc.scope !== "system" || svc.marker !== "openclaw" || !svc.label?.endsWith(".service")) continue;
		const unitPath = /^unit:\s*(.+)$/.exec(svc.detail.trim())?.[1]?.trim();
		if (unitPath) {
			const target = {
				scope: "system",
				unitName: resolveSystemdTemplateInstanceName(svc.label, env),
				unitPath
			};
			if (systemdUnitMatchesIdentity(svc.label, allowedNames, Boolean(env.OPENCLAW_SYSTEMD_UNIT?.trim()))) return target;
			if (allowCustom && !custom.has(target.unitName)) custom.set(target.unitName, target);
		}
	}
	let found = null;
	for (const target of custom.values()) {
		const remaining = deadline === void 0 ? void 0 : deadline - performance.now();
		if (remaining !== void 0 && remaining <= 0) throw new ServiceInspectionError("systemd-inspection-deadline-exceeded");
		const command = await readSystemdGatewayCommand(env, target, {
			...options,
			timeoutMs: remaining ?? options?.timeoutMs
		});
		if (!command || isNamedProfile(command.environment) || !isDefaultInstallIdentity(command.environment)) continue;
		const sourcePath = await inspectSystemdGatewayCommandLayout(command);
		if (found) throw new Error("Multiple systemd Gateway units use this installation. Set OPENCLAW_SYSTEMD_UNIT.");
		found = {
			...target,
			unitPath: sourcePath
		};
	}
	return found;
}
async function findUserSystemdGatewayScope(env) {
	const candidates = resolveInstalledSystemdServiceNameCandidates(env);
	for (const name of candidates) try {
		const userPath = resolveSystemdUnitPathForName(env, name);
		await fs.access(userPath);
		return {
			scope: "user",
			unitName: `${name}.service`,
			unitPath: userPath
		};
	} catch {
		continue;
	}
	return null;
}
async function findSystemSystemdGatewayScope(env, options, discoverCustom) {
	const systemUnit = await findSystemSystemdUnitPath(env);
	if (systemUnit) return {
		scope: "system",
		unitName: resolveSystemdTemplateInstanceName(systemUnit.unitName, env),
		unitPath: systemUnit.unitPath
	};
	if (env.OPENCLAW_SERVICE_KIND?.trim() === "node") return null;
	return await findMarkerOwnedSystemSystemdUnit(env, options, discoverCustom);
}
/** Keep matching user/system units visible so Doctor can diagnose dueling managers. */
async function findSystemdGatewayInstallation(env, options) {
	const deadline = options?.timeoutMs && options.timeoutMs > 0 ? performance.now() + options.timeoutMs : void 0;
	const user = await findUserSystemdGatewayScope(env);
	const system = await findSystemSystemdGatewayScope(env, options, !user);
	if (user) {
		if (system && await systemdUnitsShareInstallation(env, user, system, options, deadline)) return {
			kind: "dueling",
			user,
			system
		};
		return {
			kind: "user",
			user
		};
	}
	if (system) return {
		kind: "system",
		system
	};
	return { kind: "none" };
}
/** Lifecycle stays user-first; Doctor separately resolves matching dueling units. */
async function findInstalledSystemdGatewayScope(env, options) {
	const user = await findUserSystemdGatewayScope(env);
	if (user) return user;
	return await findSystemSystemdGatewayScope(env, options, true);
}
/** Doctor may remove a duplicate only when the system unit runs now and survives reboot. */
async function isSystemUnitActiveAndEnabled(env, unitName) {
	const active = await isSystemdUnitActive(env, unitName, "system");
	if (!active.ok || !active.value) return false;
	const res = await execSystemctl(["is-enabled", unitName], env);
	if (res.code !== 0) return false;
	return normalizeLowercaseStringOrEmpty(res.stdout) === "enabled";
}
function formatDuelingScopesWarning(installation, port) {
	if (installation.kind !== "dueling") return null;
	const { user, system } = installation;
	return `detected BOTH a user-scope (${user.unitPath}) and a system-scope (${system.unitPath}) gateway unit bound to port ${port}; they will SIGTERM each other in a restart loop. Run \`openclaw doctor\` interactively to inspect both scopes and review supported cleanup.`;
}
//#endregion
export { findSystemdGatewayInstallation as a, isSystemdServiceAbsent as c, isSystemSystemdOwnershipError as d, findInstalledSystemdGatewayScope as i, resolveSystemdTemplateInstanceName as l, assertNoSystemGatewayOwnership as n, formatDuelingScopesWarning as o, assertNoSystemGatewayOwnershipForActivation as r, isSystemUnitActiveAndEnabled as s, admitUserUnitActivationPastUnverifiableOwnership as t, assertNoSystemSystemdOwnership as u };
