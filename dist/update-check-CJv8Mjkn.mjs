import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { i as extractErrorCode } from "./error-coercion-1P2One0X.mjs";
import { t as containsAsciiControlCharacter } from "./string-normalization-YMwDjufr.mjs";
import { c as isPathInside } from "./fs-safe-CHQXnCPk.mjs";
import { l as pathExists$1 } from "./utils-DUAwk2p5.mjs";
import { t as hasNodeErrorCode } from "./path-guards-CH7noY0Z.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { i as normalizeLegacyDotBetaVersion, n as compareValidSemver } from "./semver-aYpwYdrQ.mjs";
import { i as stripAnsi } from "./ansi-6Z0Nu6M4.mjs";
import { a as UPDATE_RUN_HEARTBEAT_MS } from "./update-run-timeouts-Byb-PlTk.mjs";
import { n as awaitWithinDeadline, t as ABSOLUTE_DEADLINE_EXPIRED } from "./absolute-deadline-C4A1_R9J.mjs";
import { i as runCommandWithTimeout, t as runCommandBuffered } from "./exec-Bjx7k3vE.mjs";
import { t as truncateUtf8Prefix } from "./utf8-truncate-_hf7tp13.mjs";
import { f as createUpdatePreflightFailure } from "./service-inspection-error-C_WINlwy.mjs";
import { i as executeGitCommand, n as createGitCommandError } from "./git-exec-CTnMIsHS.mjs";
import { n as readPackageName, r as readPackageVersion } from "./package-json-7gGhB8Vf.mjs";
import { i as resolveBunGlobalInstallOwner, n as resolvePnpmGlobalDirFromGlobalRoot, r as detectPackageManager } from "./update-native-package-owner-BSb9WTCB.mjs";
import { t as compareOpenClawReleaseVersions } from "./npm-registry-spec-CwucyVOH.mjs";
import { a as channelToNpmTag, n as DEV_BRANCH, p as selectNpmChannelVersion } from "./update-channels-YuXTW0De.mjs";
import { n as applyPosixNpmScriptShellEnv, r as createNpmFreshnessBypassArgs, t as applyNpmFreshnessBypassEnv } from "./npm-install-env-BzCWZDMx.mjs";
import { t as fetchNpmPackageTargetStatus } from "./update-check-package-target-CIb_syPF.mjs";
import { i as collectPackageDistInventory, o as readPackageDistInventoryIfPresent, t as PACKAGE_DIST_INVENTORY_RELATIVE_PATH } from "./package-dist-inventory-C9sjjuhV.mjs";
import { a as readGitRuntimeArtifactStatus, r as readBuiltRuntimeCommit, t as collectGitRuntimeErrors } from "./update-git-runtime-CXZMwux0.mjs";
import { t as applyPathPrepend } from "./path-prepend-D4FR37qV.mjs";
import { o as parseSemver } from "./runtime-guard-Be896Oh5.mjs";
import { s as redactSupportDiagnosticLine, t as normalizeSupportDiagnosticErrorCode } from "./diagnostic-support-redaction-DYsNZIjV.mjs";
import { i as resolveNpmGlobalPrefixLayoutFromGlobalRoot, n as probeNpmGlobalPrefix, r as readPackageManagerProbeValue, t as inspectNpmLauncher } from "./update-npm-prefix-CF30_dC3.mjs";
import { n as updateInstallRootsMatch } from "./update-install-root-DH-onosx.mjs";
import { t as isContainerEnvironment } from "./container-environment-e2wGNmXf.mjs";
import { w as trimLogTail } from "./restart-sentinel-B8oVBXRb.mjs";
import { n as createUpdateFailureFact, t as createUpdateErrorFact } from "./update-failure-facts-RzGaiYBm.mjs";
import { n as isFailedUpdateStep } from "./update-run-step-BfCzkPVr.mjs";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs$1 from "node:fs/promises";
import os from "node:os";
import { sameFileIdentity } from "@openclaw/fs-safe/advanced";
import { valid } from "semver";
import { isUtf8 } from "node:buffer";
import hostedGitInfo from "hosted-git-info";
//#region src/infra/update-git-metadata.ts
const DEV_COMMIT_LIMIT = 5;
const DEV_COMMIT_SUBJECT_MAX_LENGTH = 120;
const DEV_COMMIT_LOG_MAX_OUTPUT_BYTES = 8192;
/** Select source authority before requiring its local tracking ref to exist. */
async function readGitBranchFetchTarget(readGit, branch) {
	const [remote, mergeRefs] = await Promise.all([readGit("config", "--get", `branch.${branch}.remote`), readGit("config", "--get-all", `branch.${branch}.merge`)]);
	const mergeRef = mergeRefs?.split("\n")[0];
	if (remote && mergeRef) return {
		remote,
		mergeRef
	};
	return null;
}
function matchRefspec(pattern, ref) {
	const star = pattern.indexOf("*");
	if (star < 0) return pattern === ref ? "" : void 0;
	const prefix = pattern.slice(0, star);
	const suffix = pattern.slice(star + 1);
	return ref.startsWith(prefix) && ref.endsWith(suffix) && ref.length >= prefix.length + suffix.length ? ref.slice(prefix.length, ref.length - suffix.length) : void 0;
}
/** Receipts retain only a destination; require one configured source before fetching it. */
async function readGitReceiptFetchTarget(readGit, display, fetchRemote) {
	const resolved = await readGit("rev-parse", "--symbolic-full-name", "--verify", "--end-of-options", display);
	const revisions = resolved ? [resolved] : (await Promise.all((display.startsWith("refs/") ? [display] : [
		`refs/${display}`,
		`refs/tags/${display}`,
		`refs/heads/${display}`,
		`refs/remotes/${display}`,
		`refs/remotes/${display}/HEAD`
	]).map((ref) => readGit("check-ref-format", "--normalize", ref)))).filter((ref) => ref !== null);
	const refspecs = (await readGit("config", "--get-regexp", "^remote\\..*\\.fetch$"))?.split("\n") ?? [];
	const targets = refspecs.flatMap((line) => {
		const [, remote, source, destination] = /^remote\.(.+)\.fetch \+?([^:]+):(.+)$/.exec(line) ?? [];
		return revisions.flatMap((revision) => {
			const matched = destination ? matchRefspec(destination, revision) : void 0;
			return remote && source && matched !== void 0 ? [{
				remote,
				mergeRef: source.replace("*", matched),
				revision
			}] : [];
		});
	});
	const eligible = targets.filter((target) => {
		const prefix = `remote.${target.remote}.fetch ^`;
		return !refspecs.some((line) => line.startsWith(prefix) && matchRefspec(line.slice(prefix.length), target.mergeRef) !== void 0);
	});
	let unique = [...new Map(eligible.map((target) => [JSON.stringify(target), target])).values()];
	if (targets.length === 0 && resolved?.startsWith("refs/heads/")) return {
		remote: ".",
		mergeRef: resolved,
		revision: resolved
	};
	if (!resolved && !display.startsWith("refs/") && unique.length > 1) {
		const remotes = new Set(unique.map((target) => target.remote));
		const [remote] = remotes;
		if (!fetchRemote || !remote || remotes.size !== 1 || new Set(unique.map((target) => target.revision)).size !== unique.length) return null;
		const advertised = await readGit("ls-remote", "--refs", "--", remote, ...new Set(unique.map((target) => target.mergeRef)));
		const refs = new Set(advertised?.split("\n").map((line) => line.split("	")[1]));
		unique = unique.filter((target) => refs.has(target.mergeRef));
	}
	return unique.length === 1 ? unique[0] ?? null : null;
}
async function resolveGitRepositoryMetadata(readGit, target) {
	const remote = target?.remote;
	const remoteUrl = remote && remote !== "." ? await readGit("remote", "get-url", "--", remote) : null;
	const repository = remoteUrl && /^(?:(?:https?|ssh|git):\/\/|git@github\.com:)/u.test(remoteUrl) ? hostedGitInfo.fromUrl(remoteUrl) : void 0;
	const repositoryUrl = repository?.type === "github" ? repository.browse({ noCommittish: true }) : void 0;
	return repositoryUrl ? { repositoryUrl } : {};
}
async function resolveDevGitCommits(params) {
	const result = await executeGitCommand(params.root, [
		"log",
		"--format=%h%x09%s",
		`--max-count=${DEV_COMMIT_LIMIT}`,
		`${params.currentSha}..${params.upstreamSha}`
	], {
		timeoutMs: 2500,
		signal: params.signal,
		killProcessTree: true,
		maxOutputBytes: {
			stdout: DEV_COMMIT_LOG_MAX_OUTPUT_BYTES,
			stderr: 1024
		}
	}).catch(() => null);
	if (!result || result.code !== 0 || result.termination !== "exit") return [];
	return result.stdout.split("\n").flatMap((line) => {
		const separator = line.indexOf("	");
		const sha = separator < 0 ? "" : line.slice(0, separator).trim();
		if (!sha) return [];
		return [{
			sha,
			subject: line.slice(separator + 1).trim().slice(0, DEV_COMMIT_SUBJECT_MAX_LENGTH)
		}];
	}).slice(0, DEV_COMMIT_LIMIT);
}
//#endregion
//#region scripts/lib/bundled-runtime-sidecar-paths.json
var bundled_runtime_sidecar_paths_default = [
	"dist/extensions/a2a/runtime-api.js",
	"dist/extensions/browser/runtime-api.js",
	"dist/extensions/canvas/runtime-api.js",
	"dist/extensions/copilot-proxy/runtime-api.js",
	"dist/extensions/google/runtime-api.js",
	"dist/extensions/lmstudio/runtime-api.js",
	"dist/extensions/memory-core/runtime-api.js",
	"dist/extensions/ollama/runtime-api.js",
	"dist/extensions/reef/runtime-api.js",
	"dist/extensions/telegram/runtime-api.js",
	"dist/extensions/telegram/runtime-setter-api.js",
	"dist/extensions/workboard/runtime-api.js"
];
//#endregion
//#region src/plugins/runtime-sidecar-paths.ts
function assertUniqueValues(values, label) {
	const seen = /* @__PURE__ */ new Set();
	const duplicates = /* @__PURE__ */ new Set();
	for (const value of values) {
		if (seen.has(value)) {
			duplicates.add(value);
			continue;
		}
		seen.add(value);
	}
	if (duplicates.size > 0) throw new Error(`Duplicate ${label}: ${Array.from(duplicates).join(", ")}`);
	return values;
}
const BUNDLED_RUNTIME_SIDECAR_PATHS = assertUniqueValues(bundled_runtime_sidecar_paths_default, "bundled runtime sidecar path");
//#endregion
//#region src/infra/update-freebsd-pkg-ownership.ts
const PKG_INSPECTION_TIMEOUT_MS = 3e4;
var FreeBsdPkgOwnershipError = class extends Error {
	constructor(reason, source = "database", diagnostic) {
		const code = diagnostic && "code" in diagnostic ? normalizeSupportDiagnosticErrorCode(diagnostic.code) : void 0;
		const prefix = !diagnostic ? "" : "budgetMs" in diagnostic ? `FreeBSD pkg inspection exhausted its shared ${diagnostic.budgetMs} ms budget during ${diagnostic.operation}. ` : `FreeBSD pkg inspection failed during ${diagnostic.operation}${code ? ` (${code})` : ""}. `;
		super(prefix + (reason === "pkg-owned-install" ? "This installation contains files owned by FreeBSD pkg. Update it through pkg or the Ports deployment that owns it; openclaw update will not replace package-owned files." : source === "paths" ? "FreeBSD pkg paths could not be inspected completely. Check access to the registered package directories and installation paths, and resolve any inspection timeout before retrying." : "FreeBSD pkg ownership could not be verified. Restore access to the active pkg database and configuration, then retry."));
		this.reason = reason;
		this.name = "FreeBsdPkgOwnershipError";
	}
};
async function readPkgFiles(timeoutMs) {
	const result = await runCommandBuffered([
		"/usr/sbin/pkg",
		"-N",
		"query",
		"-a",
		"%Fp"
	], {
		timeoutMs,
		env: {
			ALIAS: "query=query",
			PKG_ENABLE_PLUGINS: "no"
		},
		maxOutputBytes: {
			stdout: 16777216,
			stderr: 65536
		}
	});
	if (result.termination !== "exit" || result.code !== 0 || result.stderr.length !== 0 || !isUtf8(result.stdout)) throw new FreeBsdPkgOwnershipError("pkg-ownership-unavailable", "database", {
		operation: "pkg query",
		...result.termination === "timeout" ? { budgetMs: timeoutMs } : { code: extractErrorCode(result.error) }
	});
	const output = result.stdout.toString("utf8");
	if (output !== "" && !output.endsWith("\n")) throw new FreeBsdPkgOwnershipError("pkg-ownership-unavailable", "database", { operation: "pkg query" });
	const files = output === "" ? [] : output.slice(0, -1).split("\n");
	if (files.length > 25e4 || files.some((file) => !path.isAbsolute(file) || containsAsciiControlCharacter(file))) throw new FreeBsdPkgOwnershipError("pkg-ownership-unavailable", "database", { operation: "pkg query" });
	return files;
}
/** One planning snapshot; create a fresh inspection before installation effects. */
function createFreeBsdPkgOwnershipInspection(timeoutMs = PKG_INSPECTION_TIMEOUT_MS) {
	let files;
	const directories = /* @__PURE__ */ new Map();
	const assertions = /* @__PURE__ */ new Map();
	const budget = Number.isFinite(timeoutMs) ? Math.min(PKG_INSPECTION_TIMEOUT_MS, Math.max(1, timeoutMs)) : PKG_INSPECTION_TIMEOUT_MS;
	let deadline;
	let pathReads = 0;
	const read = async (source, label, operation) => {
		try {
			const value = await awaitWithinDeadline(operation, deadline);
			if (value !== ABSOLUTE_DEADLINE_EXPIRED) return value;
		} catch (error) {
			if (error instanceof FreeBsdPkgOwnershipError) throw error;
			throw new FreeBsdPkgOwnershipError("pkg-ownership-unavailable", source, {
				operation: label,
				code: extractErrorCode(error)
			});
		}
		throw new FreeBsdPkgOwnershipError("pkg-ownership-unavailable", source, {
			operation: label,
			budgetMs: budget
		});
	};
	const readPath = (label, operation) => read("paths", label, () => {
		if (++pathReads > 5e4) throw new FreeBsdPkgOwnershipError("pkg-ownership-unavailable", "paths");
		return operation();
	});
	const canonicalDirectory = (directory) => read("paths", "directory resolution", () => {
		let canonical = directories.get(directory);
		if (!canonical) {
			canonical = (async () => {
				let ancestor = directory;
				while (!await readPath("lstat", () => fs$1.lstat(ancestor).then(() => true, (error) => {
					if (hasNodeErrorCode(error, "ENOENT")) return false;
					throw error;
				}))) {
					const parent = path.dirname(ancestor);
					if (parent === ancestor) throw new FreeBsdPkgOwnershipError("pkg-ownership-unavailable", "paths");
					ancestor = parent;
				}
				return path.resolve(await readPath("realpath", () => fs$1.realpath(ancestor)), path.relative(ancestor, directory));
			})();
			directories.set(directory, canonical);
		}
		return canonical;
	});
	const assertUnowned = async (lexicalRoot, entryOnly) => {
		const inventory = await read("database", "pkg query", () => files ??= readPkgFiles(budget));
		const matches = (candidate, file) => entryOnly ? candidate === file : isPathInside(candidate, file);
		if (inventory.some((file) => matches(lexicalRoot, file))) throw new FreeBsdPkgOwnershipError("pkg-owned-install");
		const rootEntry = path.join(await canonicalDirectory(path.dirname(lexicalRoot)), path.basename(lexicalRoot));
		const canonicalRoot = entryOnly ? rootEntry : await canonicalDirectory(lexicalRoot);
		for (const file of inventory) {
			const canonicalFile = path.join(await canonicalDirectory(path.dirname(file)), path.basename(file));
			if (canonicalFile === rootEntry || matches(canonicalRoot, canonicalFile)) throw new FreeBsdPkgOwnershipError("pkg-owned-install");
		}
	};
	const inspect = (root, entryOnly = false) => {
		if (process.platform !== "freebsd" || !root) return Promise.resolve();
		const resolvedRoot = path.resolve(root);
		const key = `${entryOnly}:${resolvedRoot}`;
		const cached = assertions.get(key);
		if (cached) return cached;
		deadline ??= Date.now() + budget;
		if (Date.now() >= deadline) return Promise.reject(new FreeBsdPkgOwnershipError("pkg-ownership-unavailable", "paths", {
			operation: "path inspection",
			budgetMs: budget
		}));
		const assertion = assertUnowned(resolvedRoot, entryOnly);
		assertions.set(key, assertion);
		return assertion;
	};
	return {
		assertUnowned: (root) => inspect(root),
		assertEntryUnowned: (file) => inspect(file, true)
	};
}
//#endregion
//#region src/infra/update-global.ts
const PRIMARY_PACKAGE_NAME = "openclaw";
const GLOBAL_RENAME_PREFIX = ".";
/** npm-compatible spec used when the user asks to install the moving main branch. */
const OPENCLAW_MAIN_PACKAGE_SPEC = "github:openclaw/openclaw#main";
const COREPACK_ENABLE_DOWNLOAD_PROMPT_DEFAULT = "0";
const NPM_GLOBAL_INSTALL_QUIET_FLAGS = [
	"--no-fund",
	"--no-audit",
	"--loglevel=error"
];
const PNPM_OPENCLAW_BUILD_ALLOWLIST_FLAG = `--allow-build=${PRIMARY_PACKAGE_NAME}`;
const BUN_OPENCLAW_TRUST_FLAG = "--trust";
const FIRST_PACKAGED_DIST_INVENTORY_VERSION = {
	major: 2026,
	minor: 4,
	patch: 15
};
function resolveNpmLifecyclePolicy(version) {
	const parsed = parseSemver(version);
	if (!parsed) return null;
	return parsed.major >= 12 ? "allow-scripts" : parsed.major === 11 && parsed.minor >= 16 ? "allow-scripts-advisory" : "unflagged";
}
/** Resolves the owning npm policy once, before any update mutation. */
function resolveNpmLifecyclePolicyGate(installTarget) {
	if (installTarget.manager !== "npm") return {
		policy: null,
		error: null
	};
	const policy = installTarget.npmOwner?.lifecyclePolicy ?? null;
	if (policy === "unflagged" || policy === "allow-scripts-advisory" || policy === "allow-scripts") return {
		policy,
		error: null
	};
	return {
		policy: null,
		error: `Unable to determine the owning npm version before updating; no package changes were made.${installTarget.npmOwner?.probeError ? ` ${installTarget.npmOwner.probeError}` : ""}`
	};
}
async function resolveNpmOwner(params) {
	const result = await params.runCommand([params.command, "--version"], { timeoutMs: params.timeoutMs }).catch((error) => ({
		stdout: "",
		stderr: error instanceof Error ? error.message : String(error),
		code: 1
	}));
	const version = result.code === 0 ? readPackageManagerProbeValue(result.stdout) : "";
	return {
		version: version || null,
		lifecyclePolicy: version ? resolveNpmLifecyclePolicy(version) : null,
		...result.code === 0 || !result.stderr ? {} : { probeError: result.stderr }
	};
}
function normalizePackageVersionForComparison(value) {
	const trimmed = value?.trim();
	if (!trimmed) return null;
	return trimmed.replace(/^[vV](?=\d)/, "");
}
function isMainPackageTarget(value) {
	return normalizeLowercaseStringOrEmpty(value) === "main";
}
function isExplicitPackageInstallSpec(value) {
	const trimmed = value.trim();
	if (!trimmed) return false;
	return /\.(?:tgz|tar\.gz)$/iu.test(trimmed) || trimmed.includes("://") || trimmed.includes("#") || /^(?:file|github|git\+ssh|git\+https|git\+http|git\+file|npm):/i.test(trimmed);
}
function isRelativePackageInstallPath(value) {
	return /^(?:\.{1,2})(?:[\\/]|$)/u.test(value);
}
function resolveNpmInstallScriptsAllowFlag(spec, installCwd, policy) {
	const normalized = spec.trim();
	const unaliased = stripPrimaryPackageAlias(normalized);
	let identity = isExplicitPackageInstallSpec(normalized) || isExplicitPackageInstallSpec(unaliased) || isRelativePackageInstallPath(unaliased) || path.isAbsolute(normalized) || path.isAbsolute(unaliased) ? unaliased : PRIMARY_PACKAGE_NAME;
	const alias = resolveNpmAliasPackageName(identity);
	identity = alias ?? identity;
	const filePrefix = /^file:/iu.test(identity) ? "file:" : "";
	const archivePath = identity.slice(filePrefix.length);
	const gitShorthand = !/^~[\\/]/u.test(identity) && /^[^./@\s:#][^/\s:@#]*\/[^/\s:@#]+(?:#[\s\S]*)?$/u.test(identity);
	const localArchive = !alias && !gitShorthand && /\.(?:tgz|tar\.gz|tar)$/iu.test(archivePath) && (filePrefix || path.isAbsolute(archivePath) || !/^[a-z][a-z0-9+.-]*:/iu.test(archivePath));
	let absoluteArchive = "";
	if (localArchive) {
		const npmPath = process.platform === "win32" ? archivePath.replaceAll("\\", "/") : archivePath;
		let fileUrl = `file:${encodeURI(npmPath).replace(/[?#]/gu, encodeURIComponent)}`;
		fileUrl = fileUrl.replace(/^file:\/\/(?=[^/])/u, "file:/").replace(/^file:\/{1,3}(?=\.\.?(?:\/|$))/u, "file:");
		const specPath = decodeURIComponent(new URL(fileUrl).pathname);
		let resolvedPath = decodeURIComponent(new URL(fileUrl, `${pathToFileURL(path.resolve(installCwd || process.cwd())).href}/`).pathname);
		if (process.platform === "win32") resolvedPath = resolvedPath.replace(/^\/+([a-z]:\/)/iu, "$1");
		absoluteArchive = /^\/~(?:\/|$)/u.test(specPath) ? path.resolve(os.homedir(), specPath.slice(3)) : path.resolve(installCwd || process.cwd(), resolvedPath);
	}
	if (absoluteArchive && (policy !== "allow-scripts-advisory" || !absoluteArchive.includes(","))) identity = `${filePrefix}${absoluteArchive}`;
	else if (installCwd && path.isAbsolute(identity)) {
		const relativeIdentity = path.relative(installCwd, identity) || ".";
		identity = path.isAbsolute(relativeIdentity) || relativeIdentity === "." || relativeIdentity === ".." || relativeIdentity.startsWith(`..${path.sep}`) ? relativeIdentity : `./${relativeIdentity}`;
	}
	if (identity.includes(",")) throw new Error("npm cannot allow lifecycle scripts for this install target; use a package URL or local path without commas");
	return `--allow-scripts=${identity || PRIMARY_PACKAGE_NAME}`;
}
function resolveNpmAliasPackageName(spec) {
	if (!/^npm:/i.test(spec)) return null;
	const target = spec.slice(spec.indexOf(":") + 1).trim();
	if (target.startsWith("@")) {
		const scopeSeparator = target.indexOf("/");
		if (scopeSeparator <= 1) return null;
		const versionSeparator = target.indexOf("@", scopeSeparator + 1);
		return versionSeparator === -1 ? target : target.slice(0, versionSeparator);
	}
	const versionSeparator = target.indexOf("@");
	return (versionSeparator === -1 ? target : target.slice(0, versionSeparator)) || null;
}
function stripPrimaryPackageAlias(spec) {
	const normalized = spec.trim();
	const prefix = `${PRIMARY_PACKAGE_NAME}@`;
	return normalized.toLowerCase().startsWith(prefix) ? normalized.slice(prefix.length).trim() : normalized;
}
/**
* Extracts a pinned installed version from package specs like `openclaw@1.2.3`.
* Moving tags, URLs, git refs, and aliases return null because they cannot be
* compared reliably after install.
*/
function resolveExpectedInstalledVersionFromSpec(packageName, spec) {
	const normalizedPackageName = packageName.trim();
	const normalizedSpec = spec.trim();
	if (!normalizedPackageName || !normalizedSpec.startsWith(`${normalizedPackageName}@`)) return null;
	const rawVersion = normalizedSpec.slice(normalizedPackageName.length + 1).trim();
	return valid(rawVersion, true);
}
/**
* Verifies packaged installs, or the exact checkout built by a Git update.
* An explicit package spec alone never authorizes a source checkout.
*/
async function collectInstalledGlobalPackageErrors(params) {
	const errors = [];
	if (params.expectedGitCheckout) {
		const installedRoot = await fs$1.realpath(params.packageRoot).catch(() => null);
		if (installedRoot !== params.expectedGitCheckout.root) errors.push(`expected checkout ${params.expectedGitCheckout.root}, found ${installedRoot ?? "<missing>"}`);
		else {
			errors.push(...await collectGitRuntimeErrors(params.expectedGitCheckout));
			if (!await pathExists$1(path.join(installedRoot, "openclaw.mjs"))) errors.push(`missing ${path.join(installedRoot, "openclaw.mjs")}`);
		}
	} else errors.push(...await collectSourceCheckoutInstallErrors(params.packageRoot));
	const installedVersion = await readPackageVersion(params.packageRoot);
	const expectedComparable = normalizePackageVersionForComparison(params.expectedVersion);
	const installedComparable = normalizePackageVersionForComparison(installedVersion);
	if (expectedComparable && installedComparable !== expectedComparable) errors.push(`expected installed version ${expectedComparable}, found ${installedComparable ?? "<missing>"}`);
	if (!params.expectedGitCheckout) errors.push(...await collectInstalledPackageDistErrors({
		packageRoot: params.packageRoot,
		installedVersion,
		expectedVersion: params.expectedVersion
	}));
	return errors;
}
async function verifyPackageUpdateRecovery(root) {
	const version = root ? await readPackageVersion(root).catch(() => null) : null;
	if (root && version && (await collectInstalledGlobalPackageErrors({
		packageRoot: root,
		expectedVersion: version
	}).catch(() => ["verification failed"])).length === 0) return {
		serviceRestartSafe: true,
		version
	};
	return {
		serviceRestartSafe: false,
		reason: "runtime-verification-failed"
	};
}
async function collectSourceCheckoutInstallErrors(packageRoot) {
	const realPackageRoot = await tryRealpath(packageRoot);
	return (await pathExists$1(path.join(realPackageRoot, ".git")) || await pathExists$1(path.join(realPackageRoot, "pnpm-workspace.yaml"))) && await pathExists$1(path.join(realPackageRoot, "src")) && await pathExists$1(path.join(realPackageRoot, "extensions")) ? [`global package root resolves to source checkout: ${realPackageRoot}`] : [];
}
function shouldRequirePackagedDistInventory(version) {
	const parsed = parseSemver(version ?? null);
	if (!parsed) return false;
	if (parsed.major !== FIRST_PACKAGED_DIST_INVENTORY_VERSION.major) return parsed.major > FIRST_PACKAGED_DIST_INVENTORY_VERSION.major;
	if (parsed.minor !== FIRST_PACKAGED_DIST_INVENTORY_VERSION.minor) return parsed.minor > FIRST_PACKAGED_DIST_INVENTORY_VERSION.minor;
	return parsed.patch >= FIRST_PACKAGED_DIST_INVENTORY_VERSION.patch;
}
async function collectInstalledPackageDistErrors(params) {
	const criticalPaths = await collectCriticalInstalledPackageDistPaths(params.packageRoot);
	let inventoryFiles = null;
	let inventoryError = null;
	try {
		inventoryFiles = await readPackageDistInventoryIfPresent(params.packageRoot);
	} catch {
		inventoryError = `invalid package dist inventory ${PACKAGE_DIST_INVENTORY_RELATIVE_PATH}`;
	}
	if (inventoryFiles !== null) {
		const actualFiles = await collectPackageDistInventory(params.packageRoot);
		const inventoryErrors = await collectInstalledPathErrors({
			packageRoot: params.packageRoot,
			expectedFiles: inventoryFiles,
			actualFiles,
			missingMessage: (relativePath) => `missing packaged dist file ${relativePath}`,
			unexpectedMessage: (relativePath) => `unexpected packaged dist file ${relativePath}`
		});
		const inventorySet = new Set(inventoryFiles);
		const supplementalCriticalPaths = criticalPaths.filter((relativePath) => !inventorySet.has(relativePath));
		if (supplementalCriticalPaths.length === 0) return inventoryErrors;
		return [...inventoryErrors, ...await collectInstalledPathErrors({
			packageRoot: params.packageRoot,
			expectedFiles: supplementalCriticalPaths,
			actualFiles,
			missingMessage: (relativePath) => `missing bundled runtime sidecar ${relativePath}`
		})];
	}
	const criticalErrors = await collectInstalledPathErrors({
		packageRoot: params.packageRoot,
		expectedFiles: criticalPaths,
		actualFiles: null,
		missingMessage: (relativePath) => `missing bundled runtime sidecar ${relativePath}`
	});
	if (inventoryError) return [inventoryError, ...criticalErrors];
	if (shouldRequirePackagedDistInventory(params.installedVersion) || shouldRequirePackagedDistInventory(params.expectedVersion)) return [`missing package dist inventory ${PACKAGE_DIST_INVENTORY_RELATIVE_PATH}`, ...criticalErrors];
	return criticalErrors;
}
async function collectCriticalInstalledPackageDistPaths(packageRoot) {
	const expectedFiles = /* @__PURE__ */ new Set();
	await Promise.all(BUNDLED_RUNTIME_SIDECAR_PATHS.map(async (relativePath) => {
		const pluginRoot = /^dist\/extensions\/[^/]+/u.exec(relativePath)?.[0];
		if (!pluginRoot) return;
		if (await pathExists$1(path.join(packageRoot, pluginRoot, "package.json")) || await pathExists$1(path.join(packageRoot, pluginRoot, "openclaw.plugin.json"))) expectedFiles.add(relativePath);
	}));
	return [...expectedFiles].toSorted((left, right) => left.localeCompare(right));
}
async function collectInstalledPathErrors(params) {
	const errors = [];
	const actualSet = params.actualFiles ? new Set(params.actualFiles) : null;
	for (const relativePath of params.expectedFiles) if (!(actualSet !== null ? actualSet.has(relativePath) : await pathExists$1(path.join(params.packageRoot, relativePath)))) errors.push(params.missingMessage(relativePath));
	if (actualSet !== null && params.unexpectedMessage) {
		const expectedSet = new Set(params.expectedFiles);
		for (const relativePath of params.actualFiles ?? []) if (!expectedSet.has(relativePath)) errors.push(params.unexpectedMessage(relativePath));
	}
	return errors;
}
/**
* Returns true when a target can be resolved through npm registry metadata.
* Explicit tarball, URL, git, and main-branch specs bypass registry lookup.
*/
function canResolveRegistryVersionForPackageTarget(value) {
	const trimmed = stripPrimaryPackageAlias(value);
	if (!trimmed) return true;
	return !isMainPackageTarget(trimmed) && !isExplicitPackageInstallSpec(trimmed);
}
/** Same-version registry targets are no-ops; explicit artifacts still require validation/install. */
function isPackageTargetAlreadyCurrent(params) {
	return params.currentVersion !== null && params.targetVersion !== null && params.currentVersion === params.targetVersion && canResolveRegistryVersionForPackageTarget(params.target);
}
async function resolvePortableGitPathPrepend() {
	if (process.platform !== "win32") return [];
	const localAppData = process.env.LOCALAPPDATA?.trim();
	if (!localAppData) return [];
	const portableGitRoot = path.join(localAppData, "OpenClaw", "deps", "portable-git");
	const candidates = [
		path.join(portableGitRoot, "mingw64", "bin"),
		path.join(portableGitRoot, "usr", "bin"),
		path.join(portableGitRoot, "cmd"),
		path.join(portableGitRoot, "bin")
	];
	const existing = [];
	for (const candidate of candidates) if (await pathExists$1(candidate)) existing.push(candidate);
	return existing;
}
function applyWindowsPackageInstallEnv(env) {
	if (process.platform !== "win32") return;
	env.NPM_CONFIG_UPDATE_NOTIFIER = "false";
	env.NPM_CONFIG_FUND = "false";
	env.NPM_CONFIG_AUDIT = "false";
}
function applyCorepackDownloadPromptEnv(env) {
	if (!env.COREPACK_ENABLE_DOWNLOAD_PROMPT?.trim()) env.COREPACK_ENABLE_DOWNLOAD_PROMPT = COREPACK_ENABLE_DOWNLOAD_PROMPT_DEFAULT;
}
function resolveGlobalInstallSpec(params) {
	const override = params.env?.OPENCLAW_UPDATE_PACKAGE_SPEC?.trim() || process.env.OPENCLAW_UPDATE_PACKAGE_SPEC?.trim();
	if (override) return override;
	const target = params.tag.trim();
	if (isMainPackageTarget(target)) return OPENCLAW_MAIN_PACKAGE_SPEC;
	if (isExplicitPackageInstallSpec(target)) return target;
	return `${params.packageName}@${target}`;
}
/**
* Builds the package-manager environment used for global installs.
* It keeps caller env values, adds platform-specific install defaults, and
* disables npm/corepack prompts that would otherwise hang unattended updates.
*/
async function createGlobalInstallEnv(env, options = {}) {
	const pathPrepend = await resolvePortableGitPathPrepend();
	const sourceEnv = env ?? process.env;
	const merged = Object.fromEntries(Object.entries(sourceEnv).filter(([, value]) => value != null).map(([key, value]) => [key, String(value)]));
	applyPathPrepend(merged, pathPrepend);
	applyWindowsPackageInstallEnv(merged);
	applyCorepackDownloadPromptEnv(merged);
	if (options.manager !== "bun") applyNpmFreshnessBypassEnv(merged);
	applyPosixNpmScriptShellEnv(merged);
	if (process.versions.bun) merged.OPENCLAW_PACKAGE_BUN_LAUNCHER = process.execPath;
	return merged;
}
async function tryRealpath(targetPath) {
	try {
		return await fs$1.realpath(targetPath);
	} catch {
		return path.resolve(targetPath);
	}
}
function resolveBunGlobalRoot() {
	return resolveBunGlobalInstallOwner()?.globalRoot ?? path.join(os.homedir(), ".bun", "install", "global", "node_modules");
}
function inferNpmPrefixFromPackageRoot(pkgRoot) {
	return resolveNpmGlobalPrefixLayoutFromGlobalRoot(inferGlobalRootFromPackageRoot(pkgRoot))?.prefix ?? null;
}
function splitNormalizedPathParts(value) {
	return path.resolve(value).split(path.sep).filter(Boolean).map((part) => normalizeLowercaseStringOrEmpty(part));
}
function isNodeVersionPathPart(value) {
	return value !== void 0 && /^v?\d+(?:\.\d+){0,3}(?:[-+][0-9a-z.-]+)?$/u.test(value);
}
function hasPathSequence(parts, sequence) {
	const lastStart = parts.length - sequence.length;
	for (let index = 0; index <= lastStart; index += 1) if (sequence.every((part, offset) => parts[index + offset] === part)) return true;
	return false;
}
function isEphemeralNodeManagedNpmPrefix(prefix) {
	const parts = splitNormalizedPathParts(prefix);
	const basename = parts.at(-1);
	const parent = parts.at(-2);
	const grandparent = parts.at(-3);
	if (isNodeVersionPathPart(basename) && grandparent === "cellar") return true;
	if (isNodeVersionPathPart(basename) && (hasPathSequence(parts, [
		".nvm",
		"versions",
		"node"
	]) || hasPathSequence(parts, [
		"n",
		"versions",
		"node"
	]) || hasPathSequence(parts, [
		".asdf",
		"installs",
		"nodejs"
	]) || hasPathSequence(parts, [
		".volta",
		"tools",
		"image",
		"node"
	]))) return true;
	return basename === "installation" && isNodeVersionPathPart(parent) && grandparent === "node-versions";
}
function resolveNpmCommandBesidePackageRoot(pkgRoot) {
	const prefix = inferNpmPrefixFromPackageRoot(pkgRoot);
	if (!prefix) return null;
	const candidate = process.platform === "win32" ? path.join(prefix, "npm.cmd") : path.join(prefix, "bin", "npm");
	return fs.existsSync(candidate) ? candidate : null;
}
function resolvePreferredNpmCommand(pkgRoot) {
	const prefix = inferNpmPrefixFromPackageRoot(pkgRoot);
	if (prefix && isEphemeralNodeManagedNpmPrefix(prefix)) return null;
	return resolveNpmCommandBesidePackageRoot(pkgRoot);
}
function inferGlobalRootFromPackageRoot(pkgRoot) {
	const trimmed = pkgRoot?.trim();
	if (!trimmed) return null;
	const normalized = path.resolve(trimmed);
	let globalRoot = path.dirname(normalized);
	if (path.basename(globalRoot).startsWith("@")) globalRoot = path.dirname(globalRoot);
	return path.basename(globalRoot) === "node_modules" ? globalRoot : null;
}
function resolvePackageRootFromGlobalRoot(params) {
	const parts = (params.packageName?.trim() || PRIMARY_PACKAGE_NAME).split("/");
	const hasSafeSegments = parts.length > 0 && parts.length <= 2 && parts.every((part) => part.length > 0 && part !== "." && part !== ".." && !part.includes("\\")) && (parts.length === 1 || parts[0]?.startsWith("@"));
	return path.join(params.globalRoot, ...hasSafeSegments ? parts : [PRIMARY_PACKAGE_NAME]);
}
function isDirectNpmNodeModulesRoot(globalRoot) {
	return globalRoot !== null && resolveNpmGlobalPrefixLayoutFromGlobalRoot(globalRoot) === null && resolveNpmGlobalPrefixLayoutFromGlobalRoot(globalRoot, { allowDirectNodeModulesRoot: true }) !== null;
}
function inferBunGlobalRootFromPackageRoot(pkgRoot, env) {
	return pkgRoot ? resolveBunGlobalInstallOwner(pkgRoot, env)?.globalRoot ?? null : null;
}
function inferPnpmGlobalRootFromPackageRoot(pkgRoot) {
	const isolatedGlobalRoot = inferPnpmIsolatedGlobalRootFromPackageRoot(pkgRoot);
	if (isolatedGlobalRoot) return isolatedGlobalRoot;
	const directGlobalRoot = inferGlobalRootFromPackageRoot(pkgRoot);
	if (resolvePnpmGlobalDirFromGlobalRoot(directGlobalRoot)) return directGlobalRoot;
	const trimmed = pkgRoot?.trim();
	if (!trimmed) return null;
	const parts = path.resolve(trimmed).split(path.sep);
	const pnpmIndex = parts.lastIndexOf(".pnpm");
	if (pnpmIndex <= 0) return null;
	if (parts[pnpmIndex + 2] !== "node_modules") return null;
	const layoutDir = parts.slice(0, pnpmIndex).join(path.sep) || path.sep;
	const globalRoot = path.basename(layoutDir) === "node_modules" ? layoutDir : path.join(layoutDir, "node_modules");
	return resolvePnpmGlobalDirFromGlobalRoot(globalRoot) ? globalRoot : null;
}
function resolvePnpmIsolatedLayoutVersion(globalRoot) {
	const trimmed = globalRoot?.trim();
	const match = trimmed ? /^v(\d+)$/u.exec(path.basename(path.resolve(trimmed))) : null;
	return match ? Number.parseInt(match[1] ?? "", 10) : null;
}
function inferPnpmIsolatedGlobalRootFromPackageRoot(pkgRoot) {
	const nodeModulesRoot = inferGlobalRootFromPackageRoot(pkgRoot);
	if (!nodeModulesRoot) return null;
	const globalRoot = path.dirname(path.dirname(nodeModulesRoot));
	return resolvePnpmIsolatedLayoutVersion(globalRoot) === null ? null : globalRoot;
}
async function hasPnpmIsolatedProjectMetadata(pkgRoot, packageName = PRIMARY_PACKAGE_NAME) {
	if (!inferPnpmIsolatedGlobalRootFromPackageRoot(pkgRoot)) return false;
	const nodeModulesRoot = inferGlobalRootFromPackageRoot(pkgRoot);
	if (!nodeModulesRoot) return false;
	const installDir = path.dirname(nodeModulesRoot);
	const manifest = await fs$1.readFile(path.join(installDir, "package.json"), "utf8").then((raw) => JSON.parse(raw)).catch(() => null);
	return Boolean(manifest?.dependencies && packageName in manifest.dependencies && await pathExists$1(path.join(installDir, "pnpm-lock.yaml")));
}
/** Resolves the pnpm project owner without following its shared-store package symlink. */
async function resolvePnpmIsolatedInstallOwner(pkgRoot) {
	const nodeModulesRoot = inferGlobalRootFromPackageRoot(pkgRoot);
	if (!nodeModulesRoot) return null;
	return path.resolve(await tryRealpath(path.dirname(nodeModulesRoot)));
}
async function listPnpmIsolatedGlobalPackages(params) {
	const globalRoot = params.globalRoot?.trim();
	const layoutVersion = resolvePnpmIsolatedLayoutVersion(globalRoot);
	if (!globalRoot || layoutVersion === null) return [];
	const packageName = params.packageName?.trim() || PRIMARY_PACKAGE_NAME;
	const entries = await fs$1.readdir(globalRoot, { withFileTypes: true }).catch(() => []);
	const packages = [];
	for (const entry of entries.toSorted((a, b) => a.name.localeCompare(b.name))) {
		if (!entry.isSymbolicLink()) continue;
		const installDir = await fs$1.realpath(path.join(globalRoot, entry.name)).catch(() => null);
		if (!installDir) continue;
		const manifest = await fs$1.readFile(path.join(installDir, "package.json"), "utf8").then((raw) => JSON.parse(raw)).catch(() => null);
		if (!manifest?.dependencies || !(packageName in manifest.dependencies)) continue;
		const packageRoot = resolvePackageRootFromGlobalRoot({
			globalRoot: path.join(installDir, "node_modules"),
			packageName
		});
		if (await pathExists$1(packageRoot)) packages.push({
			globalRoot: path.resolve(globalRoot),
			packageRoot,
			layoutVersion,
			packageNames: Object.keys(manifest.dependencies).toSorted((a, b) => a.localeCompare(b))
		});
	}
	return packages;
}
async function listActivePnpmIsolatedGlobalPackages(params) {
	return (await listPnpmIsolatedGlobalPackages(params)).map((entry) => ({
		packageRoot: entry.packageRoot,
		packageNames: entry.packageNames
	}));
}
async function resolvePnpmIsolatedGlobalPackage(params) {
	const packages = await listPnpmIsolatedGlobalPackages(params);
	const requestedPackageRoot = params.pkgRoot ? path.resolve(params.pkgRoot) : null;
	const requestedOwnerRoot = inferPnpmIsolatedGlobalRootFromPackageRoot(params.pkgRoot);
	const globalRoot = params.globalRoot?.trim();
	const canonicalRequestedOwnerRoot = requestedOwnerRoot ? path.resolve(await tryRealpath(requestedOwnerRoot)) : null;
	const canonicalGlobalRoot = globalRoot ? path.resolve(await tryRealpath(globalRoot)) : null;
	const requestedInstallOwner = requestedPackageRoot && canonicalRequestedOwnerRoot !== null && canonicalRequestedOwnerRoot === canonicalGlobalRoot ? await resolvePnpmIsolatedInstallOwner(requestedPackageRoot) : null;
	for (const entry of packages) {
		const packageRoot = entry.packageRoot;
		if (requestedPackageRoot) {
			const installOwner = await resolvePnpmIsolatedInstallOwner(packageRoot);
			if (requestedInstallOwner === null || installOwner !== requestedInstallOwner) continue;
		}
		return entry;
	}
	return null;
}
async function isPnpmIsolatedGlobalPackageRoot(pkgRoot) {
	const globalRoot = inferPnpmIsolatedGlobalRootFromPackageRoot(pkgRoot);
	if (!globalRoot) return false;
	return Boolean(await resolvePnpmIsolatedGlobalPackage({
		globalRoot,
		pkgRoot
	}));
}
async function isPnpmGlobalPackageRoot(pkgRoot) {
	if (await isPnpmIsolatedGlobalPackageRoot(pkgRoot)) return true;
	if (await hasPnpmIsolatedProjectMetadata(pkgRoot)) return true;
	const globalRoot = inferPnpmGlobalRootFromPackageRoot(pkgRoot);
	if (!globalRoot) return false;
	const layoutDir = path.dirname(globalRoot);
	if (!await pathExists$1(path.join(globalRoot, ".modules.yaml"))) return false;
	return await pathExists$1(path.join(layoutDir, "pnpm-lock.yaml")) || await pathExists$1(path.join(layoutDir, "package.json"));
}
/** Resolves an installed pnpm project's identity and its active OpenClaw package link. */
async function resolvePnpmGlobalInstallOwner(pkgRoot) {
	const globalRoot = inferPnpmGlobalRootFromPackageRoot(pkgRoot);
	if (!globalRoot || await readPackageName(pkgRoot) !== PRIMARY_PACKAGE_NAME) return null;
	let ownerRoot;
	let packageRoot;
	if (inferPnpmIsolatedGlobalRootFromPackageRoot(pkgRoot)) {
		const active = await resolvePnpmIsolatedGlobalPackage({
			globalRoot,
			pkgRoot
		});
		if (!active) return null;
		ownerRoot = await resolvePnpmIsolatedInstallOwner(active.packageRoot);
		packageRoot = active.packageRoot;
	} else {
		if (!await isPnpmGlobalPackageRoot(pkgRoot)) return null;
		ownerRoot = await fs$1.realpath(path.dirname(globalRoot)).catch(() => null);
		packageRoot = resolvePackageRootFromGlobalRoot({ globalRoot });
	}
	if (!ownerRoot || await readPackageName(packageRoot) !== PRIMARY_PACKAGE_NAME) return null;
	return {
		ownerRoot,
		packageRoot
	};
}
function normalizeGlobalInstallCommand(managerOrCommand, pkgRoot) {
	return typeof managerOrCommand === "string" ? {
		manager: managerOrCommand,
		command: managerOrCommand === "npm" ? resolvePreferredNpmCommand(pkgRoot) ?? managerOrCommand : managerOrCommand === "bun" && process.versions.bun ? process.execPath : managerOrCommand
	} : managerOrCommand;
}
function resolveBunGlobalInstallSpec(spec) {
	const trimmed = spec.trim();
	if (normalizeLowercaseStringOrEmpty(trimmed).startsWith(`${PRIMARY_PACKAGE_NAME}@`)) return trimmed;
	const isWindowsAbsolutePath = /^[a-z]:[\\/]/iu.test(trimmed);
	const hasScheme = /^[a-z][a-z0-9+.-]*:/iu.test(trimmed) && !isWindowsAbsolutePath;
	const target = /\.(?:tgz|tar\.gz)$/iu.test(trimmed) && !hasScheme ? `file:${trimmed}` : trimmed;
	return `${PRIMARY_PACKAGE_NAME}@${target}`;
}
function resolveInstallCommandForManager(managerOrCommand, manager, pkgRoot) {
	const normalized = normalizeGlobalInstallCommand(managerOrCommand, pkgRoot);
	return normalized.manager === manager ? normalized : normalizeGlobalInstallCommand(manager, pkgRoot);
}
/**
* Reads the global `node_modules` root for a package manager command.
* Bun uses its deterministic install root because it has no `root -g` command.
*/
async function resolveGlobalRoot(managerOrCommand, runCommand, timeoutMs, pkgRoot) {
	const resolved = normalizeGlobalInstallCommand(managerOrCommand, pkgRoot);
	if (resolved.manager === "bun") return inferBunGlobalRootFromPackageRoot(pkgRoot) ?? resolveBunGlobalRoot();
	const res = await runCommand([
		resolved.command,
		"root",
		"-g"
	], { timeoutMs }).catch(() => null);
	if (!res || res.code !== 0) return null;
	return readPackageManagerProbeValue(res.stdout) || null;
}
/**
* Resolves the effective global install target, honoring an existing package
* root when requested and detecting pnpm or bun layouts before command probes.
*/
async function resolveGlobalInstallTarget(params) {
	await (params.pkgOwnership ?? createFreeBsdPkgOwnershipInspection(params.timeoutMs)).assertUnowned(params.pkgRoot);
	const requestedCommand = normalizeGlobalInstallCommand(params.manager, params.pkgRoot);
	const requestedPnpmGlobalRoot = requestedCommand.manager === "pnpm" ? await resolveGlobalRoot(requestedCommand, params.runCommand, params.timeoutMs, params.pkgRoot) : null;
	const inferredPnpmIsolatedGlobalRoot = inferPnpmIsolatedGlobalRootFromPackageRoot(params.pkgRoot);
	const pnpmIsolatedPackage = await resolvePnpmIsolatedGlobalPackage({
		globalRoot: inferredPnpmIsolatedGlobalRoot || requestedPnpmGlobalRoot,
		packageName: params.packageName,
		pkgRoot: params.pkgRoot
	});
	const hasPnpmIsolatedMetadata = pnpmIsolatedPackage ? true : await hasPnpmIsolatedProjectMetadata(params.pkgRoot, params.packageName);
	const verifiedPnpmIsolatedGlobalRoot = pnpmIsolatedPackage?.globalRoot ?? (hasPnpmIsolatedMetadata ? inferredPnpmIsolatedGlobalRoot : null);
	const honoredPackageRootGlobalRoot = params.honorPackageRoot ? inferGlobalRootFromPackageRoot(params.pkgRoot) : null;
	const pnpmPackageRootGlobalRoot = verifiedPnpmIsolatedGlobalRoot || await isPnpmGlobalPackageRoot(params.pkgRoot) ? inferPnpmGlobalRootFromPackageRoot(params.pkgRoot) : null;
	const bunPackageRootGlobalRoot = inferBunGlobalRootFromPackageRoot(params.pkgRoot, params.env);
	const honoredDirectNpmRoot = verifiedPnpmIsolatedGlobalRoot === null && pnpmIsolatedPackage === null && pnpmPackageRootGlobalRoot === null && bunPackageRootGlobalRoot === null && isDirectNpmNodeModulesRoot(honoredPackageRootGlobalRoot);
	const command = bunPackageRootGlobalRoot ? resolveInstallCommandForManager(params.manager, "bun", params.pkgRoot) : verifiedPnpmIsolatedGlobalRoot || pnpmPackageRootGlobalRoot ? resolveInstallCommandForManager(params.manager, "pnpm", params.pkgRoot) : honoredDirectNpmRoot ? resolveInstallCommandForManager(params.manager, "npm", params.pkgRoot) : normalizeGlobalInstallCommand(params.manager, params.pkgRoot);
	const pkgRootGlobalRoot = command.manager === "pnpm" ? pnpmPackageRootGlobalRoot : null;
	const npmPackageRootGlobalRoot = command.manager === "npm" && inferNpmPrefixFromPackageRoot(params.pkgRoot) ? inferGlobalRootFromPackageRoot(params.pkgRoot) : null;
	const targetGlobalRoot = (command.manager === "bun" ? bunPackageRootGlobalRoot : null) ?? (command.manager === "pnpm" ? verifiedPnpmIsolatedGlobalRoot : null) ?? pkgRootGlobalRoot ?? (command.manager === "npm" ? honoredPackageRootGlobalRoot : null) ?? npmPackageRootGlobalRoot ?? (requestedCommand.manager === "pnpm" && command.manager === requestedCommand.manager && command.command === requestedCommand.command ? requestedPnpmGlobalRoot : await resolveGlobalRoot(command, params.runCommand, params.timeoutMs, params.pkgRoot));
	const pnpmIsolatedLayoutVersion = pnpmIsolatedPackage?.layoutVersion ?? resolvePnpmIsolatedLayoutVersion(verifiedPnpmIsolatedGlobalRoot);
	const fallbackPackageRoot = targetGlobalRoot ? resolvePackageRootFromGlobalRoot({
		globalRoot: targetGlobalRoot,
		packageName: params.packageName
	}) : null;
	const packageRoot = command.manager === "pnpm" ? pnpmIsolatedPackage?.packageRoot ?? (verifiedPnpmIsolatedGlobalRoot && params.pkgRoot ? params.pkgRoot : fallbackPackageRoot) : fallbackPackageRoot;
	if (process.platform === "freebsd" && !packageRoot) throw new FreeBsdPkgOwnershipError("pkg-ownership-unavailable", "paths");
	await createFreeBsdPkgOwnershipInspection(params.timeoutMs).assertUnowned(packageRoot);
	const npmOwner = command.manager === "npm" ? await resolveNpmOwner({
		command: command.command,
		runCommand: params.runCommand,
		timeoutMs: params.timeoutMs
	}) : null;
	return {
		...command,
		...command.manager === "pnpm" && pnpmIsolatedLayoutVersion !== null ? { pnpmIsolated: { layoutVersion: pnpmIsolatedLayoutVersion } } : {},
		globalRoot: targetGlobalRoot,
		packageRoot,
		...npmOwner ? { npmOwner } : {},
		...honoredPackageRootGlobalRoot && targetGlobalRoot === honoredPackageRootGlobalRoot && honoredDirectNpmRoot ? { directNodeModulesRoot: true } : {}
	};
}
async function inspectNpmGlobalOwner(runCommand, pkgRoot, timeoutMs, diagnostics) {
	const layout = resolveNpmGlobalPrefixLayoutFromGlobalRoot(inferGlobalRootFromPackageRoot(pkgRoot));
	if (!layout) {
		diagnostics.push("npm install layout: no global prefix");
		return false;
	}
	const selected = await probeNpmGlobalPrefix(runCommand, timeoutMs, resolvePreferredNpmCommand(pkgRoot) ?? "npm", diagnostics);
	const pkgReal = await tryRealpath(pkgRoot);
	if (selected && await tryRealpath(path.join(selected.globalRoot, PRIMARY_PACKAGE_NAME)) === pkgReal) return true;
	const { launcher, launcherTarget } = await inspectNpmLauncher(layout);
	diagnostics.push(`npm install prefix: ${layout.prefix}`, `npm launcher: ${launcher}`);
	if (!launcherTarget) return false;
	const relative = path.relative(pkgReal, launcherTarget);
	return relative !== "" && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}
async function detectGlobalInstallManagerForRoot(runCommand, pkgRoot, timeoutMs, diagnostics = []) {
	const pkgReal = await tryRealpath(pkgRoot);
	diagnostics.push(`package root: ${pkgRoot} (resolved: ${pkgReal})`);
	if (resolveBunGlobalInstallOwner(pkgRoot) ?? resolveBunGlobalInstallOwner(pkgReal)) return await isPnpmGlobalPackageRoot(pkgRoot) ? "pnpm" : "bun";
	for (const { manager, argv } of [{
		manager: "npm",
		argv: [
			"npm",
			"root",
			"-g"
		]
	}, {
		manager: "pnpm",
		argv: [
			"pnpm",
			"root",
			"-g"
		]
	}]) {
		const res = await runCommand(argv, { timeoutMs }).catch(() => null);
		const globalRoot = res?.code === 0 ? readPackageManagerProbeValue(res.stdout) : "";
		diagnostics.push(`${argv.join(" ")}: ${globalRoot || "unavailable"}`);
		if (!res || res.code !== 0) continue;
		if (!globalRoot) continue;
		const globalReal = await tryRealpath(globalRoot);
		if (manager === "pnpm" && await resolvePnpmIsolatedGlobalPackage({
			globalRoot,
			pkgRoot
		})) return "pnpm";
		const expectedReal = await tryRealpath(path.join(globalReal, PRIMARY_PACKAGE_NAME));
		if (path.resolve(expectedReal) === path.resolve(pkgReal)) return manager;
	}
	if (await isPnpmGlobalPackageRoot(pkgRoot)) return "pnpm";
	if (resolveNpmCommandBesidePackageRoot(pkgRoot)) return "npm";
	return await inspectNpmGlobalOwner(runCommand, pkgRoot, timeoutMs, diagnostics) ? "npm" : null;
}
/**
* Detects an installed global OpenClaw package by probing package-manager roots
* when no trusted package root is already available.
*/
async function detectGlobalInstallManagerByPresence(runCommand, timeoutMs) {
	for (const manager of ["npm", "pnpm"]) {
		const root = await resolveGlobalRoot(manager, runCommand, timeoutMs);
		if (!root) continue;
		if (await pathExists$1(path.join(root, PRIMARY_PACKAGE_NAME))) return manager;
	}
	const bunRoot = resolveBunGlobalRoot();
	if (await pathExists$1(path.join(bunRoot, PRIMARY_PACKAGE_NAME))) return "bun";
	return null;
}
/**
* Builds the primary package-manager argv for a global OpenClaw install.
* npm receives quiet/freshness-bypass flags; pnpm and Bun approve OpenClaw's lifecycle.
*/
function globalInstallArgs(managerOrCommand, spec, pkgRoot, installPrefix, installCwd, npmLifecyclePolicy = "allow-scripts") {
	const resolved = normalizeGlobalInstallCommand(managerOrCommand, pkgRoot);
	if (resolved.manager === "pnpm") return [
		resolved.command,
		"add",
		"-g",
		PNPM_OPENCLAW_BUILD_ALLOWLIST_FLAG,
		spec
	];
	if (resolved.manager === "bun") return [
		resolved.command,
		"add",
		"-g",
		BUN_OPENCLAW_TRUST_FLAG,
		resolveBunGlobalInstallSpec(spec)
	];
	return [
		resolved.command,
		"i",
		"-g",
		...npmLifecyclePolicy !== "unflagged" ? [resolveNpmInstallScriptsAllowFlag(spec, installCwd, npmLifecyclePolicy)] : [],
		...installPrefix ? ["--prefix", installPrefix] : [],
		spec,
		...NPM_GLOBAL_INSTALL_QUIET_FLAGS,
		...createNpmFreshnessBypassArgs(process.env, /* @__PURE__ */ new Date(), { npmConfigPrefix: installPrefix })
	];
}
async function cleanupGlobalRenameDirs(params) {
	const removed = [];
	const root = params.globalRoot.trim();
	const name = params.packageName.trim();
	if (!root || !name) return { removed };
	const prefix = `${GLOBAL_RENAME_PREFIX}${name}-`;
	const inspectionDeadline = Date.now() + PKG_INSPECTION_TIMEOUT_MS;
	let entries;
	try {
		entries = await fs$1.readdir(root);
	} catch {
		return { removed };
	}
	for (const entry of entries) {
		if (!entry.startsWith(prefix)) continue;
		const target = path.join(root, entry);
		try {
			const stat = await fs$1.lstat(target);
			if (!stat.isDirectory()) continue;
			if (process.platform === "freebsd") {
				const remainingMs = inspectionDeadline - Date.now();
				if (remainingMs <= 0) break;
				await createFreeBsdPkgOwnershipInspection(remainingMs).assertUnowned(target);
				const current = await fs$1.lstat(target);
				if (!current.isDirectory() || !sameFileIdentity(stat, current)) continue;
			}
			await fs$1.rm(target, {
				recursive: true,
				force: true
			});
			removed.push(entry);
		} catch (error) {
			if (error instanceof FreeBsdPkgOwnershipError && error.reason === "pkg-ownership-unavailable") break;
		}
	}
	return { removed };
}
//#endregion
//#region src/infra/update-npm-failure.ts
const NPM_FAILURE_CODES = [
	"EACCES",
	"EPERM",
	"ENOTEMPTY",
	"EEXIST",
	"ENOENT",
	"E404",
	"ETARGET",
	"ENOSPC",
	"ENOTFOUND",
	"EAI_AGAIN",
	"ECONNREFUSED",
	"ECONNRESET",
	"ETIMEDOUT",
	"ENETUNREACH",
	"EHOSTUNREACH",
	"EPIPE",
	"E401",
	"E403",
	"EOTP",
	"ERESOLVE",
	"EBADENGINE",
	"EINTEGRITY",
	"EUSAGE",
	"EOVERRIDE",
	"EINVALIDTAGNAME",
	"EUNSUPPORTEDPROTOCOL",
	"CERT_HAS_EXPIRED",
	"UNABLE_TO_VERIFY_LEAF_SIGNATURE",
	"SELF_SIGNED_CERT_IN_CHAIN",
	"DEPTH_ZERO_SELF_SIGNED_CERT",
	"unknown"
];
function npmFailureCode(value) {
	return NPM_FAILURE_CODES.find((code) => code === value) ?? "unknown";
}
function sanitizeNpmLines(lines, context) {
	const marker = " …[truncated]";
	return lines.slice(0, 5).map((line) => {
		const message = redactSupportDiagnosticLine(line, context, Number.MAX_SAFE_INTEGER).replace(/^(npm (?:ERR!|error) code)\s+\S+/u, (_match, prefix) => `${prefix} ${npmFailureCode(line.split(/\s+/u)[3])}`);
		return Buffer.byteLength(message) > 200 ? `${truncateUtf8Prefix(message, 200 - Buffer.byteLength(marker))}${marker}` : message;
	});
}
/** Capture npm's error lines before command tails or permission guidance replace them. */
function createNpmFailureFacts(stdout, stderr, env = process.env) {
	const lines = stripAnsi(`${stderr}\n${stdout}`).split(/[\r\n\u2028\u2029]/u).map((line) => line.trim()).filter((line) => /^npm (?:ERR!|error)(?:\s|$)/u.test(line));
	const code = npmFailureCode(lines.map((line) => /^npm (?:ERR!|error) code (\S+)/u.exec(line)?.[1]).find(Boolean));
	const context = {
		env,
		stateDir: resolveStateDir(env)
	};
	return sanitizeNpmLines(lines.length ? lines : ["npm error (no error lines captured)"], context).map((message) => ({
		check: "npm",
		code,
		message
	}));
}
function formatNpmFailureFacts(facts, context) {
	const npm = facts.filter((fact) => fact.check === "npm").slice(0, 5);
	if (!npm.length) return [];
	const code = npmFailureCode(npm[0]?.code);
	const remedy = code === "EACCES" || code === "EPERM" ? "Check the npm global prefix and run the update as its owning account: https://docs.openclaw.ai/cli/update." : code === "ENOSPC" ? "Free disk space on the npm prefix and cache volumes, then retry the update." : code === "E404" || code === "ETARGET" ? "Check the configured npm registry and requested package version or tag, then retry the update." : void 0;
	return [
		`npm failure code: ${code}`,
		...sanitizeNpmLines(npm.flatMap((fact) => fact.message ? [fact.message] : []), context),
		...remedy ? [`Next step: ${remedy}`] : []
	];
}
//#endregion
//#region src/infra/update-runner-command.ts
const MAX_LOG_CHARS = 8e3;
const warnedHeartbeats = /* @__PURE__ */ new WeakSet();
async function runStep(opts) {
	const { runCommand, name, argv, cwd, timeoutMs, env, progress, stepIndex, totalSteps } = opts;
	const command = argv.join(" ");
	const stepInfo = {
		name,
		command,
		index: stepIndex,
		total: totalSteps
	};
	progress?.onStepStart?.(stepInfo);
	const started = Date.now();
	const onHeartbeat = progress?.onHeartbeat;
	const heartbeat = onHeartbeat ? setInterval(() => {
		try {
			onHeartbeat();
		} catch (error) {
			if (!warnedHeartbeats.has(onHeartbeat)) {
				warnedHeartbeats.add(onHeartbeat);
				console.warn(`[update] Could not refresh the update heartbeat; continuing the command: ${trimLogTail(formatErrorMessage(error), 500)}`);
			}
		}
	}, UPDATE_RUN_HEARTBEAT_MS) : void 0;
	heartbeat?.unref();
	let result;
	let commandError;
	let failureFacts;
	try {
		result = await runCommand(argv, {
			cwd,
			timeoutMs,
			env
		});
	} catch (error) {
		commandError = { cause: error };
		const fact = createUpdateErrorFact(name, error, env);
		failureFacts = [fact];
		result = {
			code: 1,
			stdout: "",
			stderr: fact.message ?? ""
		};
	} finally {
		clearInterval(heartbeat);
	}
	const durationMs = Date.now() - started;
	const stdoutTail = trimLogTail(result.stdout, MAX_LOG_CHARS);
	const stderrTail = trimLogTail(result.stderr, MAX_LOG_CHARS);
	if (!failureFacts && result.code !== 0 && [
		"package-install",
		"package-install-omit-optional",
		"package-pack"
	].includes(name) && (/(?:^|[\\/])npm(?:\.cmd|\.exe)?$/iu.test(argv[0] ?? "") || /\bnpm (?:ERR!|error)(?:\s|$)/u.test(`${result.stderr}\n${result.stdout}`))) failureFacts = createNpmFailureFacts(result.stdout, result.stderr, env);
	failureFacts ??= isFailedUpdateStep({
		exitCode: result.code,
		killed: result.killed,
		outputLimitExceeded: result.outputLimitExceeded,
		termination: result.termination
	}) ? [createUpdateFailureFact({
		check: name,
		code: result.stderr.match(/\bnpm (?:ERR!|error) code ([A-Z][A-Z0-9_]+)/u)?.[1] ?? (result.termination && result.termination !== "exit" ? result.termination : "command-failed"),
		message: result.stderr
	}, env)] : void 0;
	const completion = {
		name,
		command,
		durationMs,
		exitCode: result.code,
		stdoutTail,
		stderrTail,
		signal: result.signal,
		killed: result.killed,
		outputLimitExceeded: result.outputLimitExceeded,
		termination: result.termination,
		...failureFacts ? { failureFacts } : {}
	};
	progress?.onStepComplete?.({
		...stepInfo,
		...completion
	});
	const stepResult = {
		...completion,
		cwd
	};
	opts.results?.push(stepResult);
	if (commandError) throw commandError.cause;
	return stepResult;
}
function normalizeFallbackFailureReason(stepName) {
	switch (stepName) {
		case "package-install":
		case "package-install-omit-optional":
		case "package-stage":
		case "package-verify":
		case "package-swap": return "global-install-failed";
		case "openclaw doctor": return "doctor-failed";
		case "post-install-verify": return "runtime-verification-failed";
		case "post-doctor-ui-build": return "ui-build-failed";
		default: return "unexpected-error";
	}
}
async function buildUpdateCommandRunner(runCommand) {
	const defaultCommandEnv = await createGlobalInstallEnv();
	return {
		defaultCommandEnv,
		runCommand: runCommand ?? (async (argv, options) => await runCommandWithTimeout(argv, {
			...options,
			env: defaultCommandEnv && options.env ? {
				...defaultCommandEnv,
				...options.env
			} : defaultCommandEnv ?? options.env,
			killProcessTree: true
		}))
	};
}
//#endregion
//#region src/infra/update-runner-install-surface.ts
function resolveUnmanagedUpdateInstallReason() {
	return isContainerEnvironment() ? "container-image-install" : "unmanaged-package-install";
}
async function looksLikeGitCheckout(root) {
	try {
		await fs$1.access(path.join(root, ".git"));
		return true;
	} catch {
		return false;
	}
}
/** Evidence for an unresolved owner, not permission to mutate an arbitrary directory. */
async function describeUpdateInstallRoot(root) {
	const [git, modules, packageName] = await Promise.all([
		looksLikeGitCheckout(root),
		fs$1.stat(path.join(root, "node_modules")).then((entry) => entry.isDirectory(), () => false),
		readPackageName(root)
	]);
	return `Root: ${root}; Git metadata: ${git ? "present" : "absent or unreadable"}; node_modules layout: ${root.split(path.sep).includes("node_modules") ? "package under node_modules" : "outside node_modules"}, local node_modules ${modules ? "present" : "absent or unreadable"}; package.json name: ${packageName ?? "missing or unreadable"}.`;
}
async function resolveUpdateInstallSurface(opts) {
	const root = opts.root;
	if (!root || opts.installKind === "unknown") return {
		kind: "missing",
		mode: "unknown"
	};
	if (opts.installKind === "git") return {
		kind: "git",
		mode: "git",
		root,
		packageRoot: root
	};
	const { runCommand } = await buildUpdateCommandRunner(opts.runCommand);
	const globalManager = await detectGlobalInstallManagerForRoot(runCommand, root, opts.timeoutMs ?? 12e5);
	if (globalManager) return {
		kind: "global",
		mode: globalManager,
		root,
		packageRoot: root
	};
	return {
		kind: "package-root",
		mode: "unknown",
		root,
		packageRoot: root
	};
}
//#endregion
//#region src/infra/update-check.ts
const PUBLIC_NPM_REGISTRY_URL = "https://registry.npmjs.org/";
const PUBLIC_NPM_PACKAGE_NAME = "openclaw";
function isLoopbackNpmRegistry(raw) {
	try {
		const url = new URL(raw);
		return (url.protocol === "http:" || url.protocol === "https:") && (url.hostname === "127.0.0.1" || url.hostname === "localhost" || url.hostname === "[::1]");
	} catch {
		return false;
	}
}
function resolveUpdateRegistryTarget(params = {}) {
	const env = params.env ?? process.env;
	const packageName = params.packageName?.trim() || PUBLIC_NPM_PACKAGE_NAME;
	const packageSpecOverride = env.OPENCLAW_UPDATE_PACKAGE_SPEC?.trim();
	const registryOverride = env.NPM_CONFIG_REGISTRY?.trim() || env.npm_config_registry?.trim() || "";
	if (packageSpecOverride === packageName && isLoopbackNpmRegistry(registryOverride)) return {
		registryUrl: registryOverride,
		packageName
	};
	return {
		registryUrl: PUBLIC_NPM_REGISTRY_URL,
		packageName: PUBLIC_NPM_PACKAGE_NAME
	};
}
/** Resolves the extended-stable selector and verifies its exact package manifest. */
async function resolveExtendedStablePackage(params) {
	if (params.installKind === "git") return {
		status: "failed",
		reason: "unsupported_git_channel"
	};
	const timeoutMs = params.timeoutMs ?? 3e5;
	const registryTarget = resolveUpdateRegistryTarget(params);
	const selector = await fetchNpmPackageTargetStatus({
		target: "extended-stable",
		timeoutMs,
		...registryTarget
	});
	if (!selector.version) return {
		status: "failed",
		reason: selector.error === "HTTP 404" ? "selector_missing" : "selector_query_failed"
	};
	if ((await fetchNpmPackageTargetStatus({
		target: selector.version,
		timeoutMs,
		...registryTarget
	})).version !== selector.version) return {
		status: "failed",
		reason: "exact_package_mismatch"
	};
	return {
		status: "resolved",
		selector: "extended-stable",
		version: selector.version,
		packageSpec: `${registryTarget.packageName}@${selector.version}`
	};
}
function formatGitInstallLabel(update) {
	if (update.installKind !== "git") return null;
	const shortSha = update.git?.sha ? update.git.sha.slice(0, 8) : null;
	const branch = update.git?.branch && update.git.branch !== "HEAD" ? update.git.branch : null;
	const tag = update.git?.tag ?? null;
	return [
		branch ?? (tag ? "detached" : "git"),
		tag ? `tag ${tag}` : null,
		shortSha ? `@ ${shortSha}` : null
	].filter(Boolean).join(" · ");
}
async function exists(p) {
	try {
		await fs$1.access(p);
		return true;
	} catch {
		return false;
	}
}
/** Classify installation ownership without reading Git history or dependency state. */
async function resolveUpdateInstallKind(root, options = {}) {
	options.signal?.throwIfAborted();
	if (!root) return "unknown";
	const result = await runUpdateGitCommand(root, ["rev-parse", "--show-toplevel"], {
		...options,
		timeoutMs: options.timeoutMs ?? 12e5
	});
	options.signal?.throwIfAborted();
	if (result?.termination === "timeout") throw createGitCommandError("git rev-parse --show-toplevel", result);
	const gitRoot = result?.code === 0 ? result.stdout.trim() : "";
	if (gitRoot && updateInstallRootsMatch(gitRoot, root)) return "git";
	const packageName = await readPackageName(root);
	options.signal?.throwIfAborted();
	return packageName === PUBLIC_NPM_PACKAGE_NAME ? "package" : "unknown";
}
/** Read the install and local Git identity needed to select an update channel. */
async function resolveUpdateInstallIdentity(params) {
	const { root, ...options } = params;
	const installKind = await resolveUpdateInstallKind(root, options);
	const git = installKind === "git" && root ? await readGitUpdateIdentity(root, options) : void 0;
	options.signal?.throwIfAborted();
	return {
		installKind,
		git
	};
}
async function runUpdateGitCommand(root, args, options) {
	if (options.signal?.aborted) return null;
	const { onGitProbeTimeout, ...commandOptions } = options;
	const result = await executeGitCommand(root, args, {
		...commandOptions,
		killProcessTree: true
	}).catch(() => null);
	if (result?.termination === "timeout" && args[0] !== "fetch") onGitProbeTimeout?.(result.timeoutMs);
	return result;
}
async function readGitUpdateIdentity(root, options = {}) {
	const [branch, tag] = await Promise.all([[
		"rev-parse",
		"--abbrev-ref",
		"HEAD"
	], [
		"describe",
		"--tags",
		"--exact-match"
	]].map((args) => runUpdateGitCommand(root, args, {
		...options,
		timeoutMs: options.timeoutMs ?? 6e3
	})));
	return branch?.code === 0 ? {
		branch: branch.stdout.trim() || null,
		tag: tag?.code === 0 ? tag.stdout.trim() || null : null
	} : {
		branch: null,
		tag: null,
		error: branch?.stderr?.trim() || "git unavailable"
	};
}
async function checkGitUpdateStatus(params) {
	const timeoutMs = params.timeoutMs ?? (params.fetch ? 3e5 : 6e3);
	const root = path.resolve(params.root);
	const runGit = (...args) => runUpdateGitCommand(root, args, {
		timeoutMs,
		signal: params.signal,
		onGitProbeTimeout: params.onGitProbeTimeout
	});
	const readGit = async (...args) => {
		const result = await runGit(...args);
		return result?.code === 0 ? result.stdout.trim() || null : null;
	};
	const base = {
		root,
		sha: null,
		tag: null,
		branch: null,
		upstream: null,
		upstreamSha: null,
		commitAtMs: null,
		dirty: null,
		ahead: null,
		behind: null,
		fetchOk: null
	};
	const [{ branch, tag, error }, sha, commitAtRaw, dirtyRes] = await Promise.all([
		params.identity,
		readGit("rev-parse", "HEAD"),
		readGit("show", "-s", "--format=%ct", "HEAD"),
		runGit("status", "--porcelain", "--", ":!dist/control-ui/")
	]);
	if (error) return {
		...base,
		error
	};
	const trackingBranch = branch === "HEAD" ? params.useDetachedDevUpstream ? DEV_BRANCH : null : branch;
	let tracking = trackingBranch ? await readGitBranchFetchTarget(readGit, trackingBranch) : null;
	const commitAtSeconds = Number.parseInt(commitAtRaw ?? "", 10);
	const commitAtMs = Number.isSafeInteger(commitAtSeconds) ? commitAtSeconds * 1e3 : null;
	const receiptUpstream = !tracking && branch === "HEAD" && sha && params.upstreamFallback?.currentSha.trim().toLowerCase() === sha.toLowerCase() ? params.upstreamFallback.upstreamRef.trim() || null : null;
	const receiptTarget = receiptUpstream ? await readGitReceiptFetchTarget(readGit, receiptUpstream, Boolean(params.fetch)) : null;
	if (!tracking && !receiptUpstream && branch === "HEAD" && trackingBranch && await readGit("remote", "get-url", "--", "origin")) tracking = {
		remote: "origin",
		mergeRef: `refs/heads/${trackingBranch}`
	};
	const fetchTarget = tracking ?? receiptTarget;
	const dirty = dirtyRes && dirtyRes.code === 0 ? dirtyRes.stdout.trim().length > 0 : null;
	let fetchOk = null;
	let fetchedCommit = null;
	if (params.fetch && fetchTarget) {
		if (fetchTarget.remote === ".") fetchOk = true;
		else {
			const exclusions = (await readGit("config", "--get-all", `remote.${fetchTarget.remote}.fetch`))?.split("\n").filter((refspec) => refspec.startsWith("^")) ?? [];
			const fetched = await runGit("fetch", "--quiet", "--no-tags", "--no-prune", "--no-prune-tags", "--no-recurse-submodules", "--", fetchTarget.remote, fetchTarget.mergeRef, ...exclusions);
			fetchedCommit = fetched?.code === 0 ? await readGit("rev-parse", "--verify", "FETCH_HEAD^{commit}") : null;
			fetchOk = fetched?.code === 0 && fetchedCommit !== null;
		}
	}
	const trackingRevision = tracking && trackingBranch ? await readGit("-c", `branch.${trackingBranch}.remote=${tracking.remote}`, "-c", `branch.${trackingBranch}.merge=${tracking.mergeRef}`, "rev-parse", "--symbolic-full-name", `${trackingBranch}@{upstream}`) : null;
	const upstream = trackingRevision ? await readGit("rev-parse", "--abbrev-ref", "--symbolic-full-name", trackingRevision) : receiptUpstream;
	const upstreamSource = trackingRevision ? "tracking" : receiptUpstream ? "receipt" : void 0;
	const upstreamRevision = `${trackingRevision ?? receiptTarget?.revision ?? upstream}^{commit}`;
	let upstreamCommit = (!params.fetch || fetchOk === true) && upstream && sha ? await readGit("rev-parse", "--verify", upstreamRevision) : null;
	if (params.fetch && fetchTarget?.remote !== "." && upstreamCommit !== fetchedCommit) upstreamCommit = null;
	const mergeBase = sha && upstreamCommit ? await readGit("merge-base", sha, upstreamCommit) : null;
	const parsed = (sha && upstreamCommit && mergeBase ? await readGit("rev-list", "--left-right", "--count", `${sha}...${upstreamCommit}`) : null)?.match(/^(\d+)\s+(\d+)$/u);
	return {
		root,
		sha,
		tag,
		branch,
		upstream,
		...upstreamSource ? { upstreamSource } : {},
		upstreamSha: upstreamCommit,
		...await resolveGitRepositoryMetadata(readGit, fetchTarget),
		commitAtMs,
		dirty,
		ahead: parsed ? Number(parsed[1]) : null,
		behind: parsed ? Number(parsed[2]) : null,
		fetchOk,
		builtSha: await readBuiltRuntimeCommit(root),
		artifacts: await readGitRuntimeArtifactStatus({
			root,
			sha
		})
	};
}
async function checkDepsStatus(params) {
	const root = path.resolve(params.root);
	const manager = params.manager;
	if (manager === "unknown") return {
		manager,
		lockfilePath: null,
		markerPath: null,
		status: "unknown",
		reason: "unknown package manager"
	};
	const lockfile = manager === "pnpm" ? "pnpm-lock.yaml" : manager === "npm" ? "package-lock.json" : await exists(path.join(root, "bun.lock")) ? "bun.lock" : "bun.lockb";
	const lockfilePath = path.join(root, lockfile);
	const markerPath = path.join(root, "node_modules", ...manager === "pnpm" ? [".modules.yaml"] : []);
	const paths = {
		manager,
		lockfilePath,
		markerPath
	};
	const lockExists = await exists(lockfilePath);
	const markerExists = await exists(markerPath);
	if (!lockExists) return {
		...paths,
		status: "unknown",
		reason: "lockfile missing"
	};
	if (!markerExists) return {
		...paths,
		status: "missing",
		reason: "node_modules marker missing"
	};
	return {
		...paths,
		status: "ok"
	};
}
async function fetchNpmTagVersion(params) {
	const { tag, ...options } = params;
	const res = await fetchNpmPackageTargetStatus({
		...options,
		target: tag
	});
	return {
		tag,
		version: res.version,
		error: res.error,
		metadata: res
	};
}
async function resolveNpmChannelTag(params) {
	const { channel, ...options } = params;
	const channelTag = channelToNpmTag(channel);
	if (channel === "extended-stable") {
		const resolved = await resolveExtendedStablePackage({
			installKind: "package",
			timeoutMs: params.timeoutMs
		});
		return resolved.status === "resolved" ? {
			tag: resolved.selector,
			version: resolved.version
		} : {
			tag: channelTag,
			version: null,
			reason: resolved.reason
		};
	}
	const fetchTag = (tag) => fetchNpmTagVersion({
		...options,
		tag
	});
	if (channel !== "beta") return await fetchTag(channelTag);
	const [channelStatus, latestStatus] = await Promise.all([fetchTag(channelTag), fetchTag("latest")]);
	return selectNpmChannelVersion(channelStatus, latestStatus);
}
function compareSemverStrings(a, b) {
	if (a && b) {
		const openClawReleaseCmp = compareOpenClawReleaseVersions(a, b);
		if (openClawReleaseCmp != null) return openClawReleaseCmp;
	}
	const normalizedA = a ? normalizeLegacyDotBetaVersion(a) : null;
	const normalizedB = b ? normalizeLegacyDotBetaVersion(b) : null;
	return normalizedA && normalizedB ? compareValidSemver(normalizedA, normalizedB) : null;
}
async function checkUpdateStatus(params) {
	params.signal?.throwIfAborted();
	const timeoutMs = params.timeoutMs ?? 3e5;
	const resolveRegistryChannel = (status) => params.registryChannel ?? params.resolveRegistryChannel?.(status);
	const fetchRegistry = async (channel) => {
		const result = await resolveNpmChannelTag({
			channel: channel ?? "stable",
			timeoutMs
		});
		return {
			latestVersion: result.version,
			...channel ? { tag: result.tag } : {},
			error: result.error,
			...result.reason ? {
				error: result.reason,
				reason: result.reason
			} : {}
		};
	};
	const root = params.root ? path.resolve(params.root) : null;
	if (!root) {
		const registryChannel = resolveRegistryChannel({ installKind: "unknown" });
		const registry = params.includeRegistry ? await fetchRegistry(registryChannel) : void 0;
		params.signal?.throwIfAborted();
		return {
			root: null,
			installKind: "unknown",
			packageManager: "unknown",
			registry
		};
	}
	const installKind = await resolveUpdateInstallKind(root, {
		signal: params.signal,
		timeoutMs: params.timeoutMs,
		onGitProbeTimeout: params.onGitProbeTimeout
	});
	const isGit = installKind === "git";
	if (installKind === "unknown") {
		const failure = createUpdatePreflightFailure("installation-unclassified", `${await describeUpdateInstallRoot(root)} Service unit target: not inspected by update status installation checks; run openclaw gateway status --deep.`);
		params.signal?.throwIfAborted();
		return {
			root,
			installKind,
			packageManager: "unknown",
			error: {
				status: "unknown",
				code: "installation-unclassified",
				message: failure.message
			}
		};
	}
	const packageManager = isGit ? await detectPackageManager(root) ?? "unknown" : await detectGlobalInstallManagerForRoot(async (argv, options) => {
		params.signal?.throwIfAborted();
		return runCommandWithTimeout(argv, {
			...options,
			signal: params.signal,
			killProcessTree: true
		});
	}, root, timeoutMs) ?? "unknown";
	params.signal?.throwIfAborted();
	const identity = isGit ? readGitUpdateIdentity(root, {
		timeoutMs: params.timeoutMs ?? (params.fetchGit ? 3e5 : 6e3),
		signal: params.signal,
		onGitProbeTimeout: params.onGitProbeTimeout
	}) : void 0;
	const registryPromise = Promise.resolve(identity).then((git) => {
		if (params.signal?.aborted) return;
		const registryChannel = resolveRegistryChannel({
			installKind,
			git
		});
		return params.includeRegistry ? registryChannel === "extended-stable" && isGit ? {
			latestVersion: null,
			tag: "extended-stable",
			error: "unsupported_git_channel",
			reason: "unsupported_git_channel"
		} : fetchRegistry(registryChannel) : void 0;
	});
	const [git, deps, registry] = await Promise.all([
		identity ? checkGitUpdateStatus({
			root,
			identity,
			timeoutMs: params.timeoutMs,
			signal: params.signal,
			onGitProbeTimeout: params.onGitProbeTimeout,
			fetch: Boolean(params.fetchGit),
			useDetachedDevUpstream: params.useDetachedDevUpstream,
			upstreamFallback: params.gitUpstreamFallback
		}) : Promise.resolve(void 0),
		checkDepsStatus({
			root,
			manager: packageManager
		}),
		registryPromise
	]);
	params.signal?.throwIfAborted();
	return {
		root,
		installKind,
		packageManager,
		git,
		deps,
		registry
	};
}
//#endregion
export { resolveGlobalInstallTarget as A, detectGlobalInstallManagerByPresence as C, listActivePnpmIsolatedGlobalPackages as D, isPackageTargetAlreadyCurrent as E, FreeBsdPkgOwnershipError as F, createFreeBsdPkgOwnershipInspection as I, resolveDevGitCommits as L, resolvePnpmGlobalInstallOwner as M, resolvePnpmIsolatedInstallOwner as N, resolveExpectedInstalledVersionFromSpec as O, verifyPackageUpdateRecovery as P, createGlobalInstallEnv as S, globalInstallArgs as T, runStep as _, resolveExtendedStablePackage as a, cleanupGlobalRenameDirs as b, resolveUpdateInstallKind as c, looksLikeGitCheckout as d, resolveUnmanagedUpdateInstallReason as f, normalizeFallbackFailureReason as g, buildUpdateCommandRunner as h, formatGitInstallLabel as i, resolveNpmLifecyclePolicyGate as j, resolveGlobalInstallSpec as k, resolveUpdateRegistryTarget as l, MAX_LOG_CHARS as m, compareSemverStrings as n, resolveNpmChannelTag as o, resolveUpdateInstallSurface as p, fetchNpmTagVersion as r, resolveUpdateInstallIdentity as s, checkUpdateStatus as t, describeUpdateInstallRoot as u, formatNpmFailureFacts as v, detectGlobalInstallManagerForRoot as w, collectInstalledGlobalPackageErrors as x, canResolveRegistryVersionForPackageTarget as y };
