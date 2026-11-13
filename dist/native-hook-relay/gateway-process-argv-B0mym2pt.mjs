import { i as extractErrorCode } from "./error-coercion-CwIUUFnu.mjs";
import { n as resolveDiagnosticProcessEnv } from "./process-env-DlZFJzq6.mjs";
import { n as isNodeRuntime, r as resolveRuntimeScriptPosition, t as isBunRuntime } from "./runtime-binary-ZFwXIj1k.mjs";
import { M as isRecord, N as normalizeLowercaseStringOrEmpty } from "./utils-Dor5uhSv.mjs";
import { n as isLegacyPluginSourceCaptureName } from "./plugin-source-capture-path-DFo_xBUm.mjs";
import { spawnSync } from "node:child_process";
import fsSync from "node:fs";
import path from "node:path";
const ROOT_BOOLEAN_FLAGS = /* @__PURE__ */ new Set(["--dev", "--no-color"]);
const ROOT_VALUE_FLAGS = /* @__PURE__ */ new Set([
	"--profile",
	"--log-level",
	"--container"
]);
/** Returns whether a token can be consumed as a root option value. */
function isValueToken(arg) {
	if (!arg || arg === "--") return false;
	if (!arg.startsWith("-")) return true;
	return /^-\d+(?:\.\d+)?$/.test(arg);
}
/** Consume required root values by their Commander role before startup policy is selected. */
function consumeRootCommandOptionToken(args, index) {
	return consumeKnownOptionToken(args, index, ROOT_BOOLEAN_FLAGS, ROOT_VALUE_FLAGS, "command-path");
}
/** Read positional command tokens while accepting root options at any pre-terminator position. */
function getRootOptionAwareCommandPath(argv, depth) {
	const args = argv.slice(2);
	const path = [];
	let literal = false;
	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index];
		if (!arg) break;
		if (!literal && arg === "--") {
			if (path.length > 0) break;
			literal = true;
			continue;
		}
		const consumed = literal ? 0 : consumeRootCommandOptionToken(args, index);
		if (consumed > 0) {
			index += consumed - 1;
			continue;
		}
		if (!literal && arg.startsWith("-")) continue;
		path.push(arg);
		if (path.length >= depth) break;
	}
	return path;
}
function consumeKnownOptionToken(args, index, booleanFlags, valueFlags, mode) {
	const arg = args[index];
	if (!arg || arg === "--" || !arg.startsWith("-")) return 0;
	const equalsIndex = arg.indexOf("=");
	const flag = equalsIndex === -1 ? arg : arg.slice(0, equalsIndex);
	if (booleanFlags.has(flag)) return equalsIndex === -1 ? 1 : 0;
	if (!valueFlags.has(flag)) return 0;
	if (equalsIndex !== -1) return mode === "command-path" || arg.slice(equalsIndex + 1).trim() ? 1 : 0;
	if (mode === "command-path") return args[index + 1] !== void 0 ? 2 : 0;
	return isValueToken(args[index + 1]) ? 2 : 0;
}
//#endregion
//#region src/infra/gateway-process-argv.ts
function normalizeProcArg(arg) {
	return normalizeLowercaseStringOrEmpty(arg.replaceAll("\\", "/"));
}
const ENTRY_CANDIDATES = [
	"openclaw.mjs",
	"dist/index.js",
	"dist/entry.js",
	"scripts/run-node.mjs",
	"src/entry.ts",
	"src/index.ts"
];
function readProcessWorkingDirectory(pid) {
	if (!Number.isSafeInteger(pid) || pid <= 0) return;
	try {
		if (process.platform === "linux") return fsSync.readlinkSync(`/proc/${pid}/cwd`);
		if (process.platform === "darwin") {
			const result = spawnSync("/usr/sbin/lsof", [
				"-a",
				"-p",
				String(pid),
				"-d",
				"cwd",
				"-F0n"
			], {
				encoding: "utf8",
				timeout: 1e3,
				maxBuffer: 65536,
				env: resolveDiagnosticProcessEnv()
			});
			if (result.error || result.status !== 0) return;
			const fields = result.stdout.split("\0").map((field) => field.replace(/^\n/, ""));
			const names = fields.filter((field) => field.startsWith("n"));
			if (fields[0] === `p${pid}` && names.length === 1) return names[0].slice(1);
		}
	} catch {}
}
/** Generic script names identify OpenClaw only inside a verified package root. */
function classifyEntrypoint(args, opts = {}) {
	const exe = normalizeProcArg(args[0] ?? "").replace(/\.(bat|cmd|exe)$/i, "");
	if (!opts.requirePackageIdentity && (exe.endsWith("/openclaw") || exe === "openclaw")) return {
		kind: "openclaw",
		entryIndex: 0
	};
	const entryIndex = /(?:^|\/)openclaw\.mjs$/.test(exe) ? 0 : resolveRuntimeScriptPosition(args);
	if (typeof entryIndex !== "number") return entryIndex.kind === "not-runtime" ? { kind: "other" } : entryIndex;
	const script = args[entryIndex];
	const normalized = normalizeProcArg(script);
	if (!opts.requirePackageIdentity && /(?:^|\/)openclaw\.mjs$/.test(normalized)) return {
		kind: "openclaw",
		entryIndex
	};
	const entrypoints = [...ENTRY_CANDIDATES, ...opts.additionalEntrypoints ?? []];
	let scriptPath = script;
	if (!path.isAbsolute(script)) {
		const cwd = opts.cwd ?? (opts.pid === void 0 ? void 0 : readProcessWorkingDirectory(opts.pid));
		if (!cwd || !path.isAbsolute(cwd)) return {
			kind: "unclassified",
			reason: `working directory is unavailable for ${script}`
		};
		scriptPath = path.resolve(cwd, script);
	}
	let resolved;
	try {
		resolved = fsSync.realpathSync(scriptPath);
		if (opts.requirePackageIdentity && !fsSync.statSync(resolved).isFile()) return {
			kind: "unclassified",
			reason: `entrypoint is not a regular file: ${script}`
		};
	} catch {
		return {
			kind: "unclassified",
			reason: `could not resolve script ${script}`
		};
	}
	const resolvedNormalized = normalizeProcArg(resolved);
	const entry = entrypoints.find((candidate) => resolvedNormalized.endsWith(`/${candidate}`));
	if (!entry) return { kind: "other" };
	const root = resolved.slice(0, -entry.length);
	let manifest;
	try {
		manifest = JSON.parse(fsSync.readFileSync(path.join(root, "package.json"), "utf8"));
	} catch {
		return {
			kind: "unclassified",
			reason: `could not read package identity for ${script}`
		};
	}
	return isRecord(manifest) && manifest.name === "openclaw" ? {
		kind: "openclaw",
		entryIndex,
		...opts.requirePackageIdentity ? { packageIdentity: {
			root: path.resolve(root),
			entrypoint: resolved
		} } : {}
	} : { kind: "other" };
}
/** One classification for process owners, command consumers, and diagnostics. */
function classifyOpenClawArgv(args, opts = {}) {
	const { command, owner, pid, port } = opts;
	if (!opts.requirePackageIdentity && command === "gateway" && owner?.pid === pid && owner?.state === "live" && (port === void 0 || owner.port === port)) return { kind: "openclaw" };
	const executable = normalizeProcArg(args[0] ?? "").split("/").at(-1)?.replace(/\.(exe|cmd|bat)$/, "") ?? "";
	if (!opts.requirePackageIdentity && /^openclaw-[a-z0-9-]+$/.test(executable)) return !command || executable === `openclaw-${command}` ? { kind: "openclaw" } : { kind: "other" };
	const identity = classifyEntrypoint(args, opts);
	if (command) return identity.kind === "openclaw" && normalizeProcArg(getRootOptionAwareCommandPath(["node", ...args.slice(identity.entryIndex)], 1)[0] ?? "") !== command ? { kind: "other" } : identity;
	if (identity.kind === "openclaw" || !opts.requirePackageIdentity && args.some((arg) => arg.replaceAll("\\", "/").split("/").some(isLegacyPluginSourceCaptureName))) return identity.kind === "openclaw" ? identity : { kind: "openclaw" };
	let marker = opts.serviceMarker;
	if (pid !== void 0 && process.platform === "linux" && (isNodeRuntime(executable) || isBunRuntime(executable) || executable === "tsx")) try {
		marker = fsSync.readFileSync(`/proc/${pid}/environ`, "utf8").split("\0").find((entry) => entry.startsWith("OPENCLAW_SERVICE_MARKER="))?.slice(24);
	} catch (error) {
		return {
			kind: "unclassified",
			reason: `process identity inspection failed (${extractErrorCode(error) ?? "unavailable"})`
		};
	}
	return !opts.requirePackageIdentity && marker === "openclaw" ? { kind: "openclaw" } : identity;
}
//#endregion
export { getRootOptionAwareCommandPath as n, classifyOpenClawArgv as t };
