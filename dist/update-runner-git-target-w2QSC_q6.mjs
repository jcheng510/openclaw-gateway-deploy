import { s as normalizeNullableString } from "./string-coerce-6kR-86XC.mjs";
import { r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { d as normalizeStringEntries } from "./string-normalization-YMwDjufr.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { i as stripAnsi } from "./ansi-6Z0Nu6M4.mjs";
import { n as quotePowerShellArg, t as quoteCliArg } from "./quote-cli-arg-BEt71TUh.mjs";
import { c as normalizeGitPathForFilesystem, i as executeGitCommand, s as gitNullConfigPath } from "./git-exec-CTnMIsHS.mjs";
import { l as resolveDevUpstreamRefs, n as DEV_BRANCH, o as isBetaTag, p as selectNpmChannelVersion, s as isStableTag } from "./update-channels-YuXTW0De.mjs";
import { n as parsePackageOpenClawSchemaVersions } from "./openclaw-schema-versions-PVhojTxP.mjs";
import { _ as runStep, m as MAX_LOG_CHARS, n as compareSemverStrings } from "./update-check-CJv8Mjkn.mjs";
import { o as resolveControlUiAssetHealth } from "./control-ui-assets-B7w4moSp.mjs";
import { w as trimLogTail } from "./restart-sentinel-B8oVBXRb.mjs";
import { n as isFailedUpdateStep } from "./update-run-step-BfCzkPVr.mjs";
import { n as cleanupUpdateTemporaryDirectory, r as formatUpdateCleanupCommand } from "./update-maintenance-DSvsYfBL.mjs";
import { a as resolveDevUpdateTargetRevision } from "./update-dev-target-D6qkuS7l.mjs";
import { a as resolveUpdateBuildManager, i as resolvePnpmCandidateEnv, n as managerInstallIgnoreScriptsArgs, r as managerScriptArgs, t as managerInstallArgs } from "./update-package-manager-B6hhhP0n.mjs";
import { t as checkGitCandidateNodeRuntime } from "./update-runner-git-node-preflight-CfsnQr81.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
import { parseDocument } from "yaml";
//#region src/infra/update-runner-git-commands.ts
const BUILD_MAX_OLD_SPACE_MB = 8192;
const DEV_PREFLIGHT_LINT_ENV = {
	OPENCLAW_LOCAL_CHECK: "1",
	OPENCLAW_LOCAL_CHECK_MODE: "throttled"
};
const DEV_PREFLIGHT_LINT_OPT_IN_ENV = "OPENCLAW_UPDATE_PREFLIGHT_LINT";
function shouldInstallWithoutScriptsOnWindows(manager) {
	return process.platform === "win32" && manager === "pnpm";
}
function resolveBuildNodeOptions(baseOptions) {
	const current = baseOptions?.trim() ?? "";
	const desired = `--max-old-space-size=${BUILD_MAX_OLD_SPACE_MB}`;
	const existingMatch = /(?:^|\s)--max-old-space-size=(\d+)(?=\s|$)/.exec(current);
	if (!existingMatch) return current ? `${current} ${desired}` : desired;
	const existingValue = Number(existingMatch[1]);
	if (Number.isFinite(existingValue) && existingValue >= BUILD_MAX_OLD_SPACE_MB) return current;
	return current.replace(/(?:^|\s)--max-old-space-size=\d+(?=\s|$)/, ` ${desired}`).trim();
}
function resolveBuildEnv(env = process.env, buildCacheRoot) {
	return {
		...env,
		OPENCLAW_UPDATE_IN_PROGRESS: "1",
		NODE_OPTIONS: resolveBuildNodeOptions(env.NODE_OPTIONS ?? process.env.NODE_OPTIONS),
		...buildCacheRoot ? { BUILD_ALL_CACHE_ROOT: buildCacheRoot } : {}
	};
}
function gitCleanCheckArgs(gitRoot, sourceTreeStagingPaths = []) {
	return [
		"git",
		"-C",
		gitRoot,
		"status",
		"--porcelain",
		"--",
		":!dist/control-ui/",
		...sourceTreeStagingPaths.map((relative) => `:(top,exclude,literal)${relative}`)
	];
}
async function hasExplicitPnpmPreferOfflineConfig(params) {
	try {
		const result = await params.runCommand([
			"pnpm",
			"config",
			"get",
			"prefer-offline"
		], {
			cwd: params.cwd,
			timeoutMs: params.timeoutMs,
			env: params.env
		});
		if (result.code !== 0) return true;
		const value = result.stdout.trim();
		return value !== "" && value !== "undefined" && value !== "null";
	} catch {
		return true;
	}
}
async function prepareCandidateCommandEnv(manager, env, cwd, runCommand, timeoutMs) {
	const effectiveEnv = {
		...env ?? process.env,
		OPENCLAW_DEV_SOURCE_ROOT: cwd
	};
	if (manager !== "pnpm") return { env: effectiveEnv };
	const hasExplicitPreferOffline = effectiveEnv.pnpm_config_prefer_offline !== void 0 || effectiveEnv.PNPM_CONFIG_PREFER_OFFLINE !== void 0;
	const hasConfigPreferOffline = hasExplicitPreferOffline ? false : await hasExplicitPnpmPreferOfflineConfig({
		runCommand,
		cwd,
		timeoutMs,
		env: effectiveEnv
	});
	const candidateEnv = {
		...resolvePnpmCandidateEnv(effectiveEnv, "node_modules/.pnpm"),
		PNPM_CONFIG_RESOLUTION_MODE: env?.PNPM_CONFIG_RESOLUTION_MODE ?? "highest",
		npm_config_resolution_mode: env?.npm_config_resolution_mode ?? "highest",
		pnpm_config_resolution_mode: env?.pnpm_config_resolution_mode ?? "highest"
	};
	if (!hasExplicitPreferOffline && !hasConfigPreferOffline) {
		candidateEnv.PNPM_CONFIG_PREFER_OFFLINE = "true";
		candidateEnv.pnpm_config_prefer_offline = "true";
	}
	const workspaceFile = path.join(cwd, "pnpm-workspace.yaml");
	const original = await fs.readFile(workspaceFile, "utf8").catch((error) => {
		if (hasErrnoCode(error, "ENOENT")) return;
		throw error;
	});
	if (original === void 0) return { env: candidateEnv };
	const workspace = parseDocument(original);
	workspace.set("virtualStoreDir", "node_modules/.pnpm");
	const isolated = workspace.toString();
	const backupDirectory = await fs.mkdtemp(path.join(path.dirname(cwd), "workspace-original-"));
	const backupFile = path.join(backupDirectory, "pnpm-workspace.yaml");
	await fs.rename(workspaceFile, backupFile);
	await fs.writeFile(workspaceFile, isolated);
	return {
		env: candidateEnv,
		restoreWorkspace: async () => {
			if ((await fs.lstat(workspaceFile)).isFile() && await fs.readFile(workspaceFile, "utf8") === isolated) await fs.rename(backupFile, workspaceFile);
			await fs.rm(backupDirectory, {
				recursive: true,
				force: true
			});
		}
	};
}
function shouldRunDevPreflightLint(env = process.env) {
	const value = env[DEV_PREFLIGHT_LINT_OPT_IN_ENV]?.trim().toLowerCase();
	return value === "1" || value === "true";
}
function resolveDevPreflightLintEnv(env) {
	return {
		...env,
		...DEV_PREFLIGHT_LINT_ENV
	};
}
//#endregion
//#region src/infra/update-runner-git-cleanup.ts
const PREFLIGHT_CLEANUP_TIMEOUT_MS = 6e4;
async function repairPreflightCleanup(worktreeDir, preflightRoot) {
	try {
		await fs.rm(worktreeDir, {
			recursive: true,
			force: true,
			maxRetries: 3,
			retryDelay: 200
		});
		await fs.rm(preflightRoot, {
			recursive: true,
			force: true,
			maxRetries: 3,
			retryDelay: 200
		});
		return true;
	} catch {
		return false;
	}
}
async function cleanupGitPreflight(options, worktreeDir, preflightRoot) {
	const cleanupSignal = new AbortController().signal;
	const cleanupTimeoutMs = Math.min(options.timeoutMs ?? PREFLIGHT_CLEANUP_TIMEOUT_MS, PREFLIGHT_CLEANUP_TIMEOUT_MS);
	const runCleanupCommand = (argv, commandOptions) => options.runCommand(argv, {
		...commandOptions,
		signal: cleanupSignal,
		timeoutMs: cleanupTimeoutMs
	});
	const removeStep = await runStep({
		...options,
		progress: {
			...options.progress,
			onStepComplete: void 0
		},
		runCommand: runCleanupCommand,
		timeoutMs: cleanupTimeoutMs
	});
	if (removeStep.exitCode !== 0 && await repairPreflightCleanup(worktreeDir, preflightRoot)) {
		removeStep.exitCode = 0;
		const message = process.platform === "win32" ? "windows fallback cleanup removed preflight tree" : "fallback cleanup removed preflight tree";
		removeStep.stderrTail = trimLogTail([removeStep.stderrTail, message].filter(Boolean).join("\n"), MAX_LOG_CHARS);
	}
	if (removeStep.exitCode !== 0) removeStep.advisory = {
		kind: "recoverable-maintenance",
		message: `Skipped preflight cleanup. Remove the retained temporary copy with: ${formatUpdateCleanupCommand(preflightRoot)}. Reason: ${removeStep.stderrTail || "temporary worktree removal failed"}`
	};
	await runCleanupCommand([
		"git",
		"-C",
		options.cwd,
		"worktree",
		"prune"
	], { cwd: options.cwd }).catch(() => null);
	await fs.rm(preflightRoot, {
		recursive: true,
		force: true,
		maxRetries: 3,
		retryDelay: 200
	}).catch(() => {});
	options.progress?.onStepComplete?.({
		...removeStep,
		index: options.stepIndex,
		total: options.totalSteps
	});
}
//#endregion
//#region src/infra/update-runner-git-steps.ts
async function runGitCleanCheckStep(options) {
	const result = await runStep({
		...options,
		progress: {
			...options.progress,
			onStepComplete: void 0
		}
	});
	const dirty = !isFailedUpdateStep(result) && Boolean(result.stdoutTail?.trim());
	if (dirty) {
		result.exitCode = 1;
		result.stderrTail = "This checkout has local changes. Installation has not started.";
	}
	options.progress?.onStepComplete?.({
		...result,
		index: options.stepIndex,
		total: options.totalSteps
	});
	return {
		result,
		dirty
	};
}
async function runGitUpstreamStep(options) {
	const upstreamStep = await runStep({
		...options,
		progress: {
			...options.progress,
			onStepComplete: void 0
		}
	});
	if (typeof upstreamStep.exitCode === "number" && upstreamStep.exitCode !== 0 && !upstreamStep.signal && !upstreamStep.killed && !upstreamStep.outputLimitExceeded && (!upstreamStep.termination || upstreamStep.termination === "exit") && upstreamStep.exitCode !== 130 && upstreamStep.exitCode !== 143) {
		const quote = process.platform === "win32" ? quotePowerShellArg : quoteCliArg;
		upstreamStep.advisory = {
			kind: "recoverable-maintenance",
			message: `Skipped Git upstream tracking setup. Complete it with: git ${options.argv.slice(1).map(quote).join(" ")}. Reason: ${upstreamStep.stderrTail || "git branch failed"}`
		};
	}
	options.progress?.onStepComplete?.({
		...upstreamStep,
		index: options.stepIndex,
		total: options.totalSteps
	});
	return upstreamStep;
}
async function runGitActivationBranchCheckStep(stepOptions, branch) {
	const devBranchRef = `refs/heads/${branch}`;
	return runStep({
		...stepOptions,
		runCommand: async (argv, options) => {
			const exists = await stepOptions.runCommand([
				"git",
				"-C",
				stepOptions.cwd,
				"show-ref",
				"--verify",
				"--quiet",
				devBranchRef
			], options);
			if (exists.code === 1) return {
				...exists,
				code: 0,
				stdout: "",
				stderr: ""
			};
			if (exists.code !== 0) return {
				...exists,
				stdout: "",
				stderr: `Could not inspect local branch ${branch} before activation. Resolve the Git branch error, then rerun openclaw update.`
			};
			const result = await stepOptions.runCommand(argv, options);
			const sanitized = {
				...result,
				stdout: ""
			};
			return result.code !== 0 ? {
				...sanitized,
				stderr: `Cannot activate this dev update because a Git worktree uses or reserves branch ${branch}. Finish or abort its rebase or bisect, or move it off ${branch}, then rerun openclaw update.`
			} : sanitized;
		}
	});
}
async function runGitRollbackSteps({ beforeSha, branch, gitRoot, createdDevBranchDuringUpdate, sourceTreeStagingPaths, recoveryStep, checkSourceUnchanged, assertCurrent, activatedSource }) {
	if (!beforeSha) return false;
	let source = activatedSource;
	const assertSourceCurrent = async () => {
		assertCurrent();
		if (source && await checkSourceUnchanged(source.sha, source.branch, assertCurrent)) throw new Error("Git checkout changed after activation; retained rollback was refused.");
		assertCurrent();
	};
	const execute = async (name, args, expectedSource = source, refChange) => {
		if (source) await assertSourceCurrent();
		assertCurrent();
		const stepOptions = recoveryStep(name, refChange === "keep" ? args : [
			"git",
			"-C",
			gitRoot,
			...args
		], gitRoot);
		const result = await runStep({
			...stepOptions,
			progress: {
				...stepOptions.progress,
				onStepComplete: void 0
			},
			runCommand: async (argv, options) => {
				assertCurrent();
				if (refChange === "keep") return {
					code: 0,
					stdout: "",
					stderr: ""
				};
				const commandResult = await stepOptions.runCommand(argv, options);
				if (refChange === "rewrite" && source && branch && commandResult.code === 0) {
					const ref = `refs/heads/${branch}`;
					const previous = await stepOptions.runCommand([
						"git",
						"-C",
						gitRoot,
						"rev-parse",
						"--verify",
						`${ref}@{1}`
					], options);
					const current = await stepOptions.runCommand([
						"git",
						"-C",
						gitRoot,
						"rev-parse",
						"--verify",
						ref
					], options);
					assertCurrent();
					const previousSha = previous.code === 0 ? previous.stdout.trim() : void 0;
					const currentSha = current.code === 0 ? current.stdout.trim() : void 0;
					if (previousSha !== source.sha || currentSha !== beforeSha) {
						const quote = process.platform === "win32" ? quotePowerShellArg : quoteCliArg;
						const recovery = currentSha === beforeSha && previousSha && previousSha !== source.sha ? `After inspecting the reflog and preserving local edits, detach with: git checkout --detach --no-overwrite-ignore. If the branch still points to ${beforeSha}, restore the intended ref with: git branch -f ${quote(branch)} ${previousSha}` : `Inspect git reflog ${quote(branch)} and keep the newest intended commit.`;
						return {
							...commandResult,
							code: 1,
							stderr: `Cannot verify rollback branch transition: expected ${source.sha} -> ${beforeSha}, observed ${previousSha || "unavailable reflog"} -> ${currentSha || "unreadable ref"}. Previous runtime retained. ${recovery}`
						};
					}
				}
				return commandResult;
			}
		});
		if (refChange === "keep" && activatedSource) {
			const quote = process.platform === "win32" ? quotePowerShellArg : quoteCliArg;
			result.advisory = {
				kind: "recoverable-maintenance",
				message: `Kept branch ${DEV_BRANCH} created by this update at ${activatedSource.sha}. Once no worktree uses it, remove it with: git branch -d ${quote(DEV_BRANCH)}`
			};
		} else if (refChange === "detach" && source && branch && !isFailedUpdateStep(result)) {
			const quote = process.platform === "win32" ? quotePowerShellArg : quoteCliArg;
			const git = `git -C ${quote(gitRoot)}`;
			result.advisory = {
				kind: "recoverable-maintenance",
				message: `Restored ${quote(gitRoot)} to ${beforeSha} on a detached HEAD; branch ${quote(branch)} still points to ${source.sha} because it has no reflog to verify a rollback rewrite. Once no worktree uses it, restore it with: ${git} update-ref ${quote(`refs/heads/${branch}`)} ${beforeSha} ${source.sha}, then ${git} switch ${quote(branch)}. Enable reflogs with: ${git} config core.logAllRefUpdates true`
			};
		}
		stepOptions.progress?.onStepComplete?.({
			...result,
			index: stepOptions.stepIndex,
			total: stepOptions.totalSteps
		});
		assertCurrent();
		if (source) {
			if (isFailedUpdateStep(result)) throw new Error(`Git source rollback failed at ${name}; previous runtime retained.${result.stderrTail ? ` ${result.stderrTail}` : ""}`);
			source = expectedSource;
			await assertSourceCurrent();
		}
		return result;
	};
	const restore = async (name, args, expectedSource = source, refChange) => !isFailedUpdateStep(await execute(name, args, expectedSource, refChange));
	let restored = true;
	if (!source) {
		restored = await restore("git-rollback-clean", ["reset", "--hard"]);
		restored = await restore("git-rollback-clean-untracked", [
			"clean",
			"-fd",
			"-e",
			"dist/control-ui/",
			...sourceTreeStagingPaths?.flatMap((relative) => ["-e", `/${relative}/`]) ?? []
		]) && restored;
	}
	const attached = branch && branch !== "HEAD";
	const checkedOut = await restore("git-rollback-checkout", attached ? [
		"checkout",
		source ? "--no-overwrite-ignore" : "--force",
		branch
	] : [
		"checkout",
		"--detach",
		...source ? ["--no-overwrite-ignore"] : [],
		beforeSha
	], source ? {
		sha: attached && branch === source.branch ? source.sha : beforeSha,
		branch: attached ? branch : "HEAD"
	} : void 0);
	if (attached && checkedOut) {
		if (source) {
			if (source.sha !== beforeSha) {
				const { runCommand, cwd, timeoutMs } = recoveryStep("git-rollback-source", [], gitRoot);
				const options = {
					cwd,
					timeoutMs
				};
				const ref = `refs/heads/${branch}`;
				const reflog = await runCommand([
					"git",
					"-C",
					gitRoot,
					"reflog",
					"exists",
					ref
				], options);
				assertCurrent();
				const latest = reflog.code === 0 ? await runCommand([
					"git",
					"-C",
					gitRoot,
					"rev-parse",
					"--verify",
					`${ref}@{0}`
				], options) : reflog;
				assertCurrent();
				const rewrite = latest.code === 0 && Boolean(latest.stdout.trim());
				await restore("git-rollback-source", rewrite ? [
					"checkout",
					"--no-overwrite-ignore",
					"-B",
					branch,
					beforeSha
				] : [
					"checkout",
					"--detach",
					"--no-overwrite-ignore",
					beforeSha
				], {
					sha: beforeSha,
					branch: rewrite ? branch : "HEAD"
				}, rewrite ? "rewrite" : "detach");
			}
		} else restored = await restore("git-rollback-reset", [
			"reset",
			"--hard",
			beforeSha
		]) && restored;
	}
	if (createdDevBranchDuringUpdate && (!attached || checkedOut)) {
		if (activatedSource) await execute("git-rollback-keep-branch", [
			"keep",
			"branch",
			DEV_BRANCH
		], source, "keep");
		else await restore("git-rollback-delete-branch", [
			"branch",
			"-D",
			DEV_BRANCH
		]);
	}
	const head = await execute("git-rollback-verify-head", ["rev-parse", "HEAD"]);
	const verified = !isFailedUpdateStep(head) && head.stdoutTail?.trim() === beforeSha;
	head.exitCode = verified ? 0 : 1;
	if (!verified) head.stderrTail = `expected ${beforeSha}, found ${head.stdoutTail?.trim() || "unreadable HEAD"}`;
	return restored && checkedOut && verified;
}
//#endregion
//#region src/infra/update-runner-git-preflight.ts
const PREFLIGHT_MAX_COMMITS = 10;
const PREFLIGHT_TEMP_PREFIX = process.platform === "win32" ? "ocu-pf-" : ".openclaw-update-preflight-";
const PREFLIGHT_WORKTREE_DIRNAME = process.platform === "win32" ? "wt" : "worktree";
const WINDOWS_PREFLIGHT_BASE_DIR = "ocu";
function looksLikeFullCommitSha(value) {
	return /^[0-9a-f]{40}$/i.test(value.trim());
}
function resolveTagFetchRef(candidate) {
	const ref = candidate.endsWith("^{}") ? candidate.slice(0, -3) : candidate;
	return ref.startsWith("refs/tags/") ? ref : null;
}
function buildDevTargetRefResolutionCandidates(devTargetRef) {
	const trimmed = devTargetRef.trim();
	if (looksLikeFullCommitSha(trimmed) || trimmed.startsWith("refs/remotes/")) return [trimmed];
	if (trimmed.startsWith("refs/heads/")) return [`refs/remotes/origin/${trimmed.slice(11)}`];
	if (trimmed.startsWith("origin/")) return [`refs/remotes/${trimmed}`];
	if (trimmed.startsWith("refs/tags/")) return [`${trimmed}^{}`, trimmed];
	return [
		`refs/remotes/origin/${trimmed}`,
		`refs/tags/${trimmed}^{}`,
		`refs/tags/${trimmed}`
	];
}
async function createPreflightRoot(artifactRoot) {
	const baseDir = process.platform === "win32" && path.sep === "\\" ? path.win32.join(process.env.SystemDrive ?? "C:", WINDOWS_PREFLIGHT_BASE_DIR) : path.join(await fs.realpath(artifactRoot), ".artifacts");
	await fs.mkdir(baseDir, { recursive: true });
	return fs.mkdtemp(path.join(baseDir, PREFLIGHT_TEMP_PREFIX));
}
async function resetPreflightCandidateWorktree(worktreeDir, step) {
	const resetStep = await runStep(step("preflight-reset", [
		"git",
		"-C",
		worktreeDir,
		"reset",
		"--hard"
	], worktreeDir));
	if (isFailedUpdateStep(resetStep)) return false;
	const cleanStep = await runStep(step("preflight-clean", [
		"git",
		"-C",
		worktreeDir,
		"clean",
		"-fdx"
	], worktreeDir));
	return !isFailedUpdateStep(cleanStep);
}
async function resolveExplicitTarget(params) {
	const warnings = [];
	for (const candidate of buildDevTargetRefResolutionCandidates(params.devTargetRef)) {
		if (candidate.startsWith("refs/remotes/") && !params.refreshedRemotes.some((remote) => candidate.startsWith(`refs/remotes/${remote}/`))) continue;
		const tagFetchRef = resolveTagFetchRef(candidate);
		if (tagFetchRef) {
			const remoteStep = await runStep(params.step("git-remote", [
				"git",
				"-C",
				params.gitRoot,
				"remote"
			], params.gitRoot));
			if (isFailedUpdateStep(remoteStep)) return null;
			const remotes = normalizeStringEntries((remoteStep.stdoutTail ?? "").split("\n"));
			let fetchedTag = false;
			for (const remote of remotes) {
				const options = params.workStep("git-fetch-target-tag", [
					"git",
					"-C",
					params.gitRoot,
					"fetch",
					remote,
					`+${tagFetchRef}:${tagFetchRef}`
				], params.gitRoot);
				const fetchStep = await runStep({
					...options,
					progress: {
						...options.progress,
						onStepComplete: void 0
					}
				});
				const interrupted = fetchStep.termination === "signal" || fetchStep.exitCode === 130 || fetchStep.exitCode === 143;
				const fetchedSuccessfully = fetchStep.exitCode === 0 && !isFailedUpdateStep(fetchStep);
				if (!fetchedSuccessfully && !interrupted) {
					fetchStep.advisory = {
						kind: "recoverable-maintenance",
						message: `Could not fetch the requested tag from ${remote}; trying another remote. ${fetchStep.stderrTail ?? ""}`
					};
					warnings.push(fetchStep.advisory.message);
				}
				if (warnings.length > 0) fetchStep.warnings = [...warnings];
				options.progress?.onStepComplete?.({
					...fetchStep,
					index: options.stepIndex,
					total: options.totalSteps
				});
				if (interrupted) return null;
				if (fetchedSuccessfully) {
					fetchedTag = true;
					break;
				}
			}
			if (remotes.length > 0 && !fetchedTag) continue;
		}
		const shaStep = await runStep(params.step("git-resolve-target", [
			"git",
			"-C",
			params.gitRoot,
			"rev-parse",
			candidate
		], params.gitRoot));
		const sha = shaStep.stdoutTail?.trim();
		if (!isFailedUpdateStep(shaStep) && sha) return sha;
	}
	return null;
}
async function resolveUpstreamCandidates(params) {
	let localDevBranchExists = null;
	let remoteBranchRefs = [];
	if (params.needsCheckoutMain) localDevBranchExists = (await runStep(params.step("git-show-branch", [
		"git",
		"-C",
		params.gitRoot,
		"show-ref",
		"--verify",
		`refs/heads/${DEV_BRANCH}`
	], params.gitRoot))).exitCode === 0;
	if (params.needsCheckoutMain && localDevBranchExists === false) remoteBranchRefs = params.refreshedRemotes.map((remote) => `refs/remotes/${remote}/${DEV_BRANCH}`);
	const upstreamRefs = resolveDevUpstreamRefs(params.needsCheckoutMain, remoteBranchRefs);
	let upstreamSha = null;
	let selectedDevUpstream = null;
	let sawResolvableUpstreamRef = false;
	for (const upstreamRef of upstreamRefs) {
		let resolvedUpstreamRef = upstreamRef;
		if (upstreamRef.endsWith("@{upstream}")) {
			const upstreamStep = await runStep(params.step("upstream-check", [
				"git",
				"-C",
				params.gitRoot,
				"rev-parse",
				"--symbolic-full-name",
				upstreamRef
			], params.gitRoot));
			if (isFailedUpdateStep(upstreamStep)) continue;
			sawResolvableUpstreamRef = true;
			resolvedUpstreamRef = upstreamStep.stdoutTail?.trim() ?? upstreamRef;
		}
		const shaStep = await runStep(params.step("git-resolve-upstream", [
			"git",
			"-C",
			params.gitRoot,
			"rev-parse",
			upstreamRef
		], params.gitRoot));
		const sha = shaStep.stdoutTail?.trim();
		if (!isFailedUpdateStep(shaStep) && sha) {
			upstreamSha = sha;
			selectedDevUpstream = /^refs\/remotes\/(.+)$/u.exec(resolvedUpstreamRef)?.[1] ?? null;
			break;
		}
		if (!isFailedUpdateStep(shaStep)) sawResolvableUpstreamRef = true;
	}
	if (!upstreamSha) return sawResolvableUpstreamRef ? {
		status: "error",
		reason: "no-upstream-sha"
	} : {
		status: "skipped",
		reason: "no-upstream"
	};
	const revListStep = await runStep(params.step("git-rev-list", [
		"git",
		"-C",
		params.gitRoot,
		"rev-list",
		`--max-count=${PREFLIGHT_MAX_COMMITS}`,
		upstreamSha
	], params.gitRoot));
	if (isFailedUpdateStep(revListStep)) return {
		status: "error",
		reason: "preflight-revlist-failed"
	};
	const candidates = normalizeStringEntries((revListStep.stdoutTail ?? "").split("\n"));
	if (candidates.length === 0) return {
		status: "error",
		reason: "preflight-no-candidates"
	};
	return {
		status: "ok",
		sha: upstreamSha,
		candidates,
		selectedDevUpstream,
		localDevBranchExists
	};
}
function classifyPreflightFailure(step) {
	const output = stripAnsi(`${step.stdoutTail ?? ""}\n${step.stderrTail ?? ""}`);
	const nodeNoSpace = /^\s*(?:\[(?:ERR_PNPM_)?ENOSPC\][^\r\n]*|(?:Error:\s*)?)ENOSPC: no space left on device(?:,|$)/m.test(output);
	const gitNoSpace = /^(?:fatal|error): (?:cannot|could not|unable to) [^\r\n]+: No space left on device$/m.test(output);
	return nodeNoSpace || gitNoSpace ? "insufficient-space" : "failed";
}
async function testPreflightCandidate(params) {
	if (!await resetPreflightCandidateWorktree(params.worktreeDir, params.workStep)) return { status: "failed" };
	const runCandidateCheck = async (name, argv, env, factory = params.workStep) => {
		const check = factory(`preflight-${name}`, argv, params.worktreeDir, env);
		const result = await runStep(check);
		return isFailedUpdateStep(result) ? result : null;
	};
	const checkout = await runCandidateCheck("checkout", [
		"git",
		"-C",
		params.worktreeDir,
		"checkout",
		"--detach",
		params.sha
	]);
	if (checkout) return { status: classifyPreflightFailure(checkout) };
	if (params.rebaseFrom) {
		const rebase = await runCandidateCheck("local-checkout", [
			"git",
			"-C",
			params.worktreeDir,
			"checkout",
			"--detach",
			params.rebaseFrom
		]) ?? await runCandidateCheck("rebase", [
			"git",
			"-C",
			params.worktreeDir,
			"rebase",
			params.sha
		]);
		if (rebase) {
			await runCandidateCheck("rebase-abort", [
				"git",
				"-C",
				params.worktreeDir,
				"rebase",
				"--abort"
			], void 0, params.step);
			return { status: classifyPreflightFailure(rebase) };
		}
	}
	const candidateHead = await params.runCommand([
		"git",
		"-C",
		params.worktreeDir,
		"rev-parse",
		"HEAD"
	], {
		cwd: params.worktreeDir,
		timeoutMs: params.timeoutMs
	});
	if (candidateHead.code !== 0 || !candidateHead.stdout.trim()) return { status: "failed" };
	const candidateSha = candidateHead.stdout.trim();
	await params.beforeCandidate(candidateSha);
	const nodeRuntimeStep = await checkGitCandidateNodeRuntime(params.worktreeDir);
	if (nodeRuntimeStep) {
		params.steps.push(nodeRuntimeStep);
		return { status: "node-runtime-incompatible" };
	}
	const manager = await resolveUpdateBuildManager(params.runCommand, params.worktreeDir, params.timeoutMs, params.defaultCommandEnv, { timeoutMs: params.workTimeoutMs });
	if (manager.kind === "missing-required") {
		params.steps.push({
			name: "preflight-package-manager",
			command: `resolve ${manager.preferred} package manager`,
			cwd: params.worktreeDir,
			durationMs: 0,
			exitCode: 1,
			stderrTail: manager.reason
		});
		return {
			status: "manager-unavailable",
			reason: manager.reason
		};
	}
	try {
		const preferIgnoreScripts = shouldInstallWithoutScriptsOnWindows(manager.manager);
		const installArgv = preferIgnoreScripts ? managerInstallIgnoreScriptsArgs(manager.manager) : managerInstallArgs(manager.manager, { compatFallback: manager.fallback && manager.manager === "npm" });
		const installName = preferIgnoreScripts ? "deps-install-ignore-scripts" : "deps-install";
		const candidateCommand = await prepareCandidateCommandEnv(manager.manager, manager.env ?? params.defaultCommandEnv, params.worktreeDir, params.runCommand, params.timeoutMs);
		const buildArgs = managerScriptArgs(manager.manager, "build");
		const buildEnv = resolveBuildEnv(candidateCommand.env, path.join(params.artifactRoot, ".artifacts", "build-all-cache"));
		buildEnv.sourceRuntimePrepared = params.sourceRuntimePrepared?.toString();
		const lintArgs = managerScriptArgs(manager.manager, "lint");
		let failure = await runCandidateCheck(installName, installArgv, candidateCommand.env) ?? await runCandidateCheck("build", buildArgs, buildEnv);
		if (!failure && (await resolveControlUiAssetHealth({ root: params.worktreeDir })).kind !== "ready") failure = await runCandidateCheck("ui-build", managerScriptArgs(manager.manager, "ui:build"), candidateCommand.env);
		if (!failure && (await resolveControlUiAssetHealth({ root: params.worktreeDir })).kind !== "ready") {
			params.steps.push({
				name: "preflight-ui-assets-verify",
				command: "verify startup assets",
				cwd: params.worktreeDir,
				durationMs: 0,
				exitCode: 1,
				stderrTail: "Update Control UI startup assets are missing or incomplete"
			});
			return { status: "failed" };
		}
		if (!failure && params.runLint) failure = await runCandidateCheck("lint", lintArgs, resolveDevPreflightLintEnv(candidateCommand.env));
		if (failure) return { status: classifyPreflightFailure(failure) };
		await params.prepareGitExposure?.(params.worktreeDir, candidateSha, candidateCommand.env);
		await candidateCommand.restoreWorkspace?.();
		await params.validateCandidate(params.worktreeDir);
		const { result: cleanCheck } = await runGitCleanCheckStep(params.step("preflight-update-clean-check", gitCleanCheckArgs(params.worktreeDir), params.worktreeDir));
		if (isFailedUpdateStep(cleanCheck)) return { status: "failed" };
		const sourceCheck = await runCandidateCheck("update-source-check", [
			"git",
			"-C",
			params.worktreeDir,
			"diff",
			"--quiet",
			candidateSha,
			"--"
		], void 0, params.step);
		if (sourceCheck) {
			sourceCheck.stderrTail = "Update source differs from the selected commit. Repair the source revision before retrying the update.";
			return { status: "failed" };
		}
		await params.prepareCandidate?.(params.worktreeDir, params.preflightRoot);
		return {
			status: "ok",
			candidateSha
		};
	} finally {
		await manager.cleanup?.();
	}
}
async function runGitCandidatePreflight(params) {
	const devTargetRef = params.devTarget ? normalizeNullableString(resolveDevUpdateTargetRevision(params.devTarget)) : null;
	let preflightBaseSha;
	let candidates;
	let selectedDevUpstream = null;
	let localDevBranchExists = null;
	if (params.targetRevision) {
		const result = await params.runCommand([
			"git",
			"-C",
			params.gitRoot,
			"rev-parse",
			`${params.targetRevision}^{commit}`
		], {
			cwd: params.gitRoot,
			timeoutMs: params.timeoutMs
		});
		if (result.code !== 0 || !result.stdout.trim()) return {
			status: "error",
			reason: "no-target-sha"
		};
		preflightBaseSha = result.stdout.trim();
		candidates = [preflightBaseSha];
	} else if (devTargetRef) {
		const targetSha = await resolveExplicitTarget({
			...params,
			devTargetRef
		});
		if (!targetSha) return {
			status: "error",
			reason: "no-target-sha"
		};
		preflightBaseSha = targetSha;
		candidates = [targetSha];
		if (params.devTarget?.mode === "tracked") {
			const ancestryStep = await runStep(params.step("tracked-target-ancestry", [
				"git",
				"-C",
				params.gitRoot,
				"merge-base",
				"--is-ancestor",
				targetSha,
				`${params.devTarget.upstreamRef}^{commit}`
			], params.gitRoot));
			if (isFailedUpdateStep(ancestryStep)) return {
				status: "error",
				reason: "tracked-upstream-invalid"
			};
		}
	} else {
		const upstream = await resolveUpstreamCandidates(params);
		if (upstream.status !== "ok") return upstream;
		preflightBaseSha = upstream.sha;
		candidates = upstream.candidates;
		selectedDevUpstream = upstream.selectedDevUpstream;
		localDevBranchExists = upstream.localDevBranchExists;
	}
	const canSkipActivation = !params.prepareGitExposure && params.beforeRuntimeVerified;
	if (canSkipActivation && preflightBaseSha === params.beforeSha) return {
		status: "skipped",
		reason: "already-current"
	};
	if (params.beforeGitStaging) {
		const admission = await params.beforeGitStaging();
		params.steps.push(admission.step);
		if (isFailedUpdateStep(admission.step)) return {
			status: "error",
			reason: admission.failureReason
		};
	}
	const rebaseFrom = !params.targetRevision && !params.devTarget && localDevBranchExists !== false ? params.needsCheckoutMain ? DEV_BRANCH : params.beforeSha ?? void 0 : void 0;
	await params.beforeCandidate(preflightBaseSha);
	let preflightRoot;
	try {
		preflightRoot = await createPreflightRoot(params.artifactRoot);
	} catch (error) {
		return {
			status: "error",
			reason: hasErrnoCode(error, "ENOSPC") ? "preflight-insufficient-space" : "preflight-worktree-failed"
		};
	}
	const worktreeDir = path.join(preflightRoot, PREFLIGHT_WORKTREE_DIRNAME);
	let tested;
	try {
		const worktreeStep = await runStep(params.workStep("preflight-worktree", [
			"git",
			"-C",
			params.gitRoot,
			"worktree",
			"add",
			"--detach",
			worktreeDir,
			preflightBaseSha
		], params.gitRoot));
		if (isFailedUpdateStep(worktreeStep)) return {
			status: "error",
			reason: classifyPreflightFailure(worktreeStep) === "insufficient-space" ? "preflight-insufficient-space" : "preflight-worktree-failed"
		};
		for (const sha of candidates) {
			if (canSkipActivation && sha === params.beforeSha) return {
				status: "skipped",
				reason: "already-current"
			};
			if (sha !== preflightBaseSha) await params.beforeCandidate(sha);
			const candidate = await testPreflightCandidate({
				...params,
				worktreeDir,
				preflightRoot,
				sha,
				rebaseFrom,
				runLint: !params.targetRevision && shouldRunDevPreflightLint()
			});
			if (candidate.status === "ok" || candidate.status === "insufficient-space") {
				tested = candidate;
				break;
			}
			const runtimeMismatch = candidate.status === "node-runtime-incompatible";
			if (tested?.status !== "failed" && (!runtimeMismatch || !tested)) tested = candidate;
		}
	} finally {
		await cleanupGitPreflight({
			...params.step("preflight-cleanup", [
				"git",
				"-C",
				params.gitRoot,
				"worktree",
				"remove",
				"--force",
				"--force",
				worktreeDir
			], params.gitRoot),
			runCommand: params.runCommand
		}, worktreeDir, preflightRoot);
	}
	if (tested?.status !== "ok") return {
		status: "error",
		reason: tested?.status === "insufficient-space" ? "preflight-insufficient-space" : tested?.status === "manager-unavailable" ? tested.reason : tested?.status === "node-runtime-incompatible" ? "preflight-node-runtime-incompatible" : "preflight-no-good-commit"
	};
	return {
		status: "ok",
		candidateSha: tested.candidateSha,
		selectedDevUpstream,
		localDevBranchExists
	};
}
//#endregion
//#region src/infra/update-runner-git-target.ts
const UNVERIFIED_GIT_CORRUPTION = /(?:in the commit graph file but not in the object database|probably due to repo corruption)/iu;
const VERIFIED_GIT_CORRUPTION = /(?:broken link from|dangling (?:commit|tree|blob)|hash mismatch|invalid sha1 pointer|missing (?:blob|commit|tree)|object corrupt)/iu;
/** Replace Git's unverified corruption guess when promised objects may be intentionally absent. */
async function classifyPartialCloneGitFailure(params) {
	if (params.result.code === 0 || !UNVERIFIED_GIT_CORRUPTION.test(params.result.stderr)) return params.result;
	const promisorConfig = await params.runCommand([
		"git",
		"-C",
		params.root,
		"config",
		"--includes",
		"--get-regexp",
		"^remote\\..*\\.promisor$"
	], {
		cwd: params.root,
		timeoutMs: params.timeoutMs
	}).catch(() => void 0);
	if (promisorConfig?.code === 0 && promisorConfig.stdout.split("\n").some((line) => /\s(?:true|yes|on|1)$/iu.test(line.trim()))) return {
		...params.result,
		stderr: "Git could not resolve one or more promised objects in this partial clone. This does not by itself indicate repository corruption. Bulk-fetch the missing object IDs from the configured promisor remote, then retry the update (for example: git rev-list --objects --missing=print --all | sed -n 's/^?//p' | git fetch \"<promisor-remote>\" --stdin)."
	};
	const fsck = await params.runCommand([
		"git",
		"--no-lazy-fetch",
		"-C",
		params.root,
		"fsck",
		"--connectivity-only",
		"--no-dangling"
	], {
		cwd: params.root,
		timeoutMs: params.timeoutMs
	}).catch(() => void 0);
	const fsckOutput = `${fsck?.stdout ?? ""}\n${fsck?.stderr ?? ""}`.trim();
	if (fsck?.code !== 0 && VERIFIED_GIT_CORRUPTION.test(fsckOutput)) return {
		...params.result,
		stderr: `Git verified repository corruption with git fsck: ${fsckOutput}`
	};
	return {
		...params.result,
		stderr: "Git reported an object-database inconsistency, but OpenClaw did not verify repository corruption with git fsck. Retry the update; if it recurs, inspect the repository with git fsck before attempting repair."
	};
}
function quoteGitConfig(value) {
	return `"${value.replace(/\\/gu, "\\\\").replace(/"/gu, "\\\"").replace(/\n/gu, "\\n").replace(/\t/gu, "\\t").replaceAll("\b", "\\b")}"`;
}
function gitConfigEntry(key, value) {
	const match = /^([a-z][a-z0-9-]*)\.(?:(.*)\.)?([a-z][a-z0-9-]*)$/iu.exec(key);
	if (!match || /[\r\n]/u.test(match[2] ?? "")) throw new Error("Could not preserve Git target inspection configuration");
	return `[${match[1]}${match[2] === void 0 ? "" : ` ${quoteGitConfig(match[2])}`}]\n\t${match[3]} = ${quoteGitConfig(value)}\n`;
}
/** Fetch and candidate selection must not update the installed repository before admission. */
async function withGitTargetInspectionRoot(params, inspect) {
	const temporaryRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openclaw-git-admission-"));
	const inspectionRoot = path.join(temporaryRoot, "repository.git");
	const command = async (root, args, allowMissing = false, options = { timeoutMs: params.timeoutMs }) => {
		const result = await params.runCommand([
			"git",
			"-C",
			root,
			...args
		], {
			cwd: root,
			terminateOnOutputLimit: true,
			...options
		});
		if (result.killed || result.signal || result.termination && result.termination !== "exit" || result.code !== 0 && !(allowMissing && result.code === 1)) throw new Error(`Git target inspection ${args[0]} failed (exit ${result.code})`);
		return result.stdout;
	};
	try {
		const head = (await command(params.root, ["rev-parse", "HEAD"])).trim();
		const headRef = (await command(params.root, [
			"symbolic-ref",
			"-q",
			"HEAD"
		], true)).trim();
		const objects = normalizeGitPathForFilesystem((await command(params.root, [
			"rev-parse",
			"--git-path",
			"objects"
		])).trim());
		const shallow = normalizeGitPathForFilesystem((await command(params.root, [
			"rev-parse",
			"--git-path",
			"shallow"
		])).trim());
		const refs = await command(params.root, ["for-each-ref", "--format=%(objectname) %(refname)"]);
		await command(params.root, [
			"init",
			"--bare",
			"--template=",
			inspectionRoot
		], false, {
			...params.work ?? { timeoutMs: params.timeoutMs },
			env: {
				GIT_DEFAULT_HASH: head.length === 64 ? "sha256" : "sha1",
				GIT_DEFAULT_REF_FORMAT: "files"
			}
		});
		await fs.writeFile(path.join(inspectionRoot, "objects", "info", "alternates"), `${quoteGitConfig(path.resolve(params.root, objects))}\n`);
		await fs.copyFile(path.resolve(params.root, shallow), path.join(inspectionRoot, "shallow")).catch((error) => {
			if (!hasErrnoCode(error, "ENOENT")) throw error;
		});
		const objectIds = /* @__PURE__ */ new Set();
		const branchObjects = /* @__PURE__ */ new Set();
		for (const ref of refs.trim().split("\n").filter(Boolean)) {
			const separator = ref.indexOf(" ");
			const oid = ref.slice(0, separator);
			objectIds.add(oid);
			if (ref.slice(separator + 1).startsWith("refs/heads/")) branchObjects.add(oid);
		}
		if (objectIds.size > 0) {
			const ids = [...objectIds];
			const checkedObjects = (await command(inspectionRoot, ["cat-file", "--batch-check=%(objectname) %(objecttype)"], false, {
				timeoutMs: params.timeoutMs,
				input: ids.map((oid) => `${oid}^{object}\n`).join("")
			})).trimEnd().split("\n");
			if (checkedObjects.length !== ids.length || ids.some((oid, index) => ![
				"commit",
				"tree",
				"blob",
				"tag"
			].some((type) => checkedObjects[index] === `${oid} ${type}` && (!branchObjects.has(oid) || type === "commit")))) throw new Error("Git target inspection references an invalid object");
		}
		await fs.writeFile(path.join(inspectionRoot, "packed-refs"), refs);
		await command(inspectionRoot, headRef ? [
			"symbolic-ref",
			"HEAD",
			headRef
		] : [
			"update-ref",
			"--no-deref",
			"HEAD",
			head
		]);
		const config = await command(params.root, [
			"config",
			"--includes",
			"--null",
			"--get-regexp",
			"^((remote|branch|url|http|credential|protocol|filter|fetch|transfer|ssh|user|author|committer|gpg)\\.|commit\\.gpgsign$|core\\.(sshcommand|gitproxy|askpass)$)"
		], true);
		const entries = [];
		for (const entry of config.split("\0").filter(Boolean)) {
			const separator = entry.indexOf("\n");
			const key = separator === -1 ? entry : entry.slice(0, separator);
			const value = separator === -1 ? "true" : entry.slice(separator + 1);
			entries.push(gitConfigEntry(key, value));
		}
		await fs.appendFile(path.join(inspectionRoot, "config"), entries.join(""), { mode: 384 });
		const runInspectionCommand = (argv, options) => params.runCommand(argv[0] === "git" && argv[1] === "-C" && argv[2] === inspectionRoot ? [
			"git",
			"-C",
			argv[3] === "worktree" && (argv[4] === "remove" || argv[4] === "prune") ? inspectionRoot : params.root,
			`--git-dir=${inspectionRoot}`,
			...argv.slice(3)
		] : argv, argv[0] === "git" ? {
			...options,
			env: {
				...options.env,
				GIT_CONFIG_NOSYSTEM: "1",
				GIT_CONFIG_GLOBAL: gitNullConfigPath(),
				GIT_CONFIG_COUNT: "0"
			}
		} : options);
		return await inspect(inspectionRoot, runInspectionCommand);
	} finally {
		await cleanupUpdateTemporaryDirectory({
			directory: temporaryRoot,
			root: params.root,
			name: "git-target-inspection-cleanup",
			onWarning: params.onWarning
		});
	}
}
async function readGitTargetSchemaVersions(params) {
	let result;
	try {
		result = await params.runCommand([
			"git",
			"-C",
			params.root,
			"show",
			`${params.revision}:package.json`
		], {
			cwd: params.root,
			timeoutMs: params.timeoutMs
		});
	} catch (error) {
		return {
			status: "unreadable",
			reason: String(error)
		};
	}
	if (result.code !== 0) return {
		status: "unreadable",
		reason: `git show ${params.revision}:package.json exited ${result.code}`
	};
	try {
		const manifest = JSON.parse(result.stdout);
		const schemaVersions = parsePackageOpenClawSchemaVersions(manifest);
		const version = normalizeNullableString(asNullableRecord(manifest)?.version);
		return {
			status: "ok",
			...version ? { version } : {},
			...schemaVersions ? { schemaVersions } : {}
		};
	} catch (error) {
		return {
			status: "unreadable",
			reason: `target package.json unparseable: ${String(error)}`
		};
	}
}
async function prepareGitMutation(params) {
	const target = await readGitTargetSchemaVersions(params);
	const sha = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/iu.test(params.revision) ? params.revision.toLowerCase() : void 0;
	await params.beforeGitMutation({
		...sha ? { sha } : {},
		...target.status === "ok" ? {
			...target.version ? { version: target.version } : {},
			...target.schemaVersions ? { schemaVersions: target.schemaVersions } : {}
		} : { metadataUnreadable: target.reason }
	});
}
async function selectGitInspectionTarget(params) {
	const tag = params.channel === "dev" ? void 0 : await resolveChannelTag(params.runCommand, params.gitRoot, params.timeoutMs, params.channel);
	if (params.channel !== "dev" && !tag) return {
		status: "error",
		reason: "no-release-tag"
	};
	return runGitCandidatePreflight({
		...params,
		targetRevision: tag ?? void 0
	});
}
async function readBranchName(runCommand, root, timeoutMs) {
	const result = await runCommand([
		"git",
		"-C",
		root,
		"rev-parse",
		"--abbrev-ref",
		"HEAD"
	], { timeoutMs }).catch(() => null);
	return (result?.code === 0 ? result.stdout.trim() : "") || null;
}
async function resolveChannelTag(runCommand, root, timeoutMs, channel) {
	const result = await runCommand([
		"git",
		"-C",
		root,
		"tag",
		"--list",
		"v*",
		"--sort=-v:refname"
	], { timeoutMs }).catch(() => null);
	return selectChannelTag(result?.code === 0 ? normalizeStringEntries(result.stdout.split("\n")) : [], channel);
}
/**
* Picks the single remote release tags are force-fetched from. The checkout's
* retained tracking remote (`branch.<main>.remote`) wins when it is still
* declared, because a detached release checkout keeps that config and a fork
* `origin` can be tag-less; otherwise the clone's canonical `origin`, then the
* only declared remote. Multiple non-origin remotes need explicit tracking.
*/
function resolveReleaseTagRemote(remotes, trackedUpdateRemote) {
	if (trackedUpdateRemote && remotes.includes(trackedUpdateRemote)) return trackedUpdateRemote;
	return remotes.includes("origin") ? "origin" : remotes.length === 1 ? remotes[0] : void 0;
}
async function fetchGitUpdateTarget(params) {
	const { root, channel, devTarget, name, step: targetStep, workStep, steps } = params;
	const refreshedRemotes = [];
	const result = (ok) => ({
		ok,
		refreshedRemotes
	});
	const remote = await runStep(targetStep("git-remote", [
		"git",
		"-C",
		root,
		"remote"
	], root));
	if (remote.exitCode !== 0) return result(false);
	const remotes = normalizeStringEntries((remote.stdoutTail ?? "").split("\n"));
	const tracked = await runStep(targetStep("git-config-update-upstream", [
		"git",
		"-C",
		root,
		"config",
		"--get",
		`branch.${DEV_BRANCH}.remote`
	], root));
	if (tracked.exitCode !== 0 && tracked.exitCode !== 1) return result(false);
	const trackedRemote = (tracked.stdoutTail ?? "").trim();
	const targetRef = devTarget?.mode === "tracked" ? devTarget.upstreamRef : devTarget?.ref;
	const remoteRef = devTarget?.mode === "tracked" || targetRef?.startsWith("refs/remotes/") || targetRef?.startsWith("origin/") ? targetRef?.replace(/^refs\/remotes\//u, "") : void 0;
	const targetRemote = remoteRef ? remotes.toSorted((left, right) => right.length - left.length).find((candidate) => remoteRef.startsWith(`${candidate}/`)) : void 0;
	const tagRemote = resolveReleaseTagRemote(remotes, trackedRemote);
	const authority = channel !== "dev" ? tagRemote : devTarget ? targetRemote ?? (targetRef?.startsWith("refs/heads/") ? "origin" : void 0) : trackedRemote || void 0;
	if (channel === "dev" && !devTarget && !authority) {
		if ((await runStep(targetStep("git-show-branch", [
			"git",
			"-C",
			root,
			"show-ref",
			"--verify",
			`refs/heads/main`
		], root))).exitCode === 0) return result(true);
	}
	const fetchRemotes = authority ? [authority] : channel !== "dev" || remoteRef || targetRef?.startsWith("refs/tags/") ? [] : targetRef && !/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/iu.test(targetRef) ? remotes.filter((candidate) => candidate === "origin") : remotes;
	for (const fetchRemote of fetchRemotes) {
		if (fetchRemote === ".") continue;
		const options = workStep(authority ? name : `${name}:${fetchRemote}`, [
			"git",
			"-C",
			root,
			"fetch",
			fetchRemote,
			"--prune",
			"--no-tags",
			"--no-prune-tags"
		], root);
		const fetch = await runStep({
			...options,
			progress: {
				...options.progress,
				onStepComplete: void 0
			}
		});
		const interrupted = fetch.termination === "signal" || fetch.exitCode === 130 || fetch.exitCode === 143;
		const fetchedSuccessfully = fetch.exitCode === 0 && !isFailedUpdateStep(fetch);
		if (fetchedSuccessfully && !interrupted) {
			refreshedRemotes.push(fetchRemote);
			if (authority && remotes.some((candidate) => candidate !== authority)) fetch.warnings = [`Fetched only the update remote ${authority}; unrelated remotes were left untouched.`];
		} else if (!authority && !interrupted) fetch.advisory = {
			kind: "recoverable-maintenance",
			message: `Could not refresh optional target remote ${fetchRemote}; continuing target resolution. ${fetch.stderrTail ?? ""}`
		};
		options.progress?.onStepComplete?.({
			...fetch,
			index: options.stepIndex,
			total: options.totalSteps
		});
		if (interrupted || !fetchedSuccessfully && authority) return result(false);
	}
	if (channel === "dev") return result(true);
	if (!tagRemote) {
		steps.push({
			name: "git-release-remote",
			command: "git remote",
			cwd: root,
			durationMs: 0,
			exitCode: 1,
			stderrTail: "Cannot determine the release remote. Set branch.main.remote to the remote that publishes releases."
		});
		return result(false);
	}
	const tags = await runStep(workStep("git-fetch-tags", [
		"git",
		"-C",
		root,
		"fetch",
		"--no-tags",
		"--no-prune",
		"--no-prune-tags",
		tagRemote,
		"+refs/tags/*:refs/tags/*"
	], root));
	return {
		...result(tags.exitCode === 0 && !isFailedUpdateStep(tags)),
		releaseRemote: tagRemote
	};
}
/** Observe the preferred release without entering candidate admission or changing installed refs. */
async function readPreferredGitChannelTarget(params) {
	const runGit = async (argv, options) => {
		const root = argv[2];
		if (argv[0] !== "git" || argv[1] !== "-C" || !root) throw new Error("Expected a Git target inspection command");
		const result = await executeGitCommand(root, argv.slice(3), {
			...options,
			killProcessTree: true,
			terminateOnOutputLimit: true
		});
		if (result.killed || result.signal || result.outputLimitExceeded || result.termination && result.termination !== "exit") throw new Error("Git target observation did not complete");
		return result;
	};
	let cleanupFailed = false;
	const target = await withGitTargetInspectionRoot({
		...params,
		runCommand: runGit,
		onWarning: () => {
			cleanupFailed = true;
		}
	}, async (root, runCommand) => {
		const step = (name, argv, cwd) => ({
			name,
			argv,
			cwd,
			runCommand,
			timeoutMs: params.timeoutMs,
			stepIndex: 0,
			totalSteps: 0
		});
		const fetched = await fetchGitUpdateTarget({
			root,
			channel: params.channel,
			name: "git-status-target-fetch",
			step,
			workStep: step,
			steps: []
		});
		if (!fetched.ok || !fetched.releaseRemote) return;
		const tag = await resolveChannelTag(runCommand, root, params.timeoutMs, params.channel);
		if (!tag) return;
		const ref = `refs/tags/${tag}`;
		const resolved = await runCommand([
			"git",
			"-C",
			root,
			"rev-parse",
			"--verify",
			`${ref}^{commit}`
		], { timeoutMs: params.timeoutMs });
		const sha = resolved.code === 0 ? resolved.stdout.trim() : "";
		if (!/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/iu.test(sha)) return;
		const advertised = await runCommand([
			"git",
			"-C",
			root,
			"ls-remote",
			"--tags",
			"--",
			fetched.releaseRemote,
			ref,
			`${ref}^{}`
		], { timeoutMs: params.timeoutMs });
		if (advertised.code !== 0) return;
		const refs = new Map(advertised.stdout.trim().split("\n").map((line) => {
			const [oid, name] = line.split("	");
			return [name, oid];
		}));
		return (refs.get(`${ref}^{}`) ?? refs.get(ref)) === sha ? {
			channel: params.channel,
			tag,
			sha
		} : void 0;
	});
	if (!target || cleanupFailed) return;
	const [head, dirty] = await Promise.all([runGit([
		"git",
		"-C",
		params.root,
		"rev-parse",
		"HEAD"
	], { timeoutMs: params.timeoutMs }).catch(() => null), runGit(gitCleanCheckArgs(params.root), { timeoutMs: params.timeoutMs }).catch(() => null)]);
	return head?.code === 0 && head.stdout.trim() === params.sha && dirty?.code === 0 && !dirty.stdout.trim() ? target : void 0;
}
function selectChannelTag(tags, channel) {
	const orderedTags = normalizeStringEntries(tags).toSorted((left, right) => {
		const comparison = compareSemverStrings(left, right);
		return comparison == null ? right.localeCompare(left) : -comparison;
	});
	if (channel === "beta") return selectNpmChannelVersion({ version: orderedTags.find(isBetaTag) ?? null }, { version: orderedTags.find(isStableTag) ?? null }).version;
	return orderedTags.find(isStableTag) ?? null;
}
//#endregion
export { readGitTargetSchemaVersions as a, selectGitInspectionTarget as c, runGitCleanCheckStep as d, runGitRollbackSteps as f, readBranchName as i, withGitTargetInspectionRoot as l, gitCleanCheckArgs as m, fetchGitUpdateTarget as n, readPreferredGitChannelTarget as o, runGitUpstreamStep as p, prepareGitMutation as r, selectChannelTag as s, classifyPartialCloneGitFailure as t, runGitActivationBranchCheckStep as u };
