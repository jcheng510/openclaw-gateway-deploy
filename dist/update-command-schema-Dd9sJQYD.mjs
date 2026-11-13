import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import "./update-candidate-canary-progress-C1ekjra3.mjs";
import { r as signalProcessTree } from "./kill-tree-BDAzGPyP.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { r as theme } from "./theme-DzaUZY4q.mjs";
import { t as CommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { i as runCommandWithTimeout } from "./exec-Bjx7k3vE.mjs";
import { f as createUpdatePreflightFailure } from "./service-inspection-error-C_WINlwy.mjs";
import { p as tryReadJson } from "./json-files-Br8qKrAz.mjs";
import { n as parsePackageOpenClawSchemaVersions } from "./openclaw-schema-versions-PVhojTxP.mjs";
import { y as canResolveRegistryVersionForPackageTarget } from "./update-check-CJv8Mjkn.mjs";
import { t as applyPathPrepend } from "./path-prepend-D4FR37qV.mjs";
import { s as redactSupportDiagnosticLine } from "./diagnostic-support-redaction-DYsNZIjV.mjs";
import { a as UPDATE_GLOBAL_PERMISSION_REASON } from "./update-outcome-BHX5xsqd.mjs";
import { l as recordUpdateRunPhase } from "./update-run-ledger-C5c7VrBu.mjs";
import { i as getUpdateRun } from "./update-run-reader-DZIHUks3.mjs";
import { t as resolveNodeRunner } from "./node-runner-DIokVayT.mjs";
import { d as withUpdateCommandExecutorChild } from "./update-command-executor-B6yk9cYV.mjs";
import { n as UpdatePreMutationError, u as resolveGitInstallDir } from "./shared-Dwr7djBO.mjs";
import { C as createUpdateCommandAuthority } from "./update-command-terminal--2X6rdAF.mjs";
import { n as printResult } from "./progress-Dl6WMBUB.mjs";
import { p as resolvePackageRuntimePreflight } from "./update-command-service-plan-CyZKQiYX.mjs";
import { g as prepareUpdateCommandNativeGate } from "./update-command-verification-DZ0ylhUs.mjs";
import { c as readUpdateStateSchemaVersions, u as resolveUpdateStateContentVersion } from "./update-candidate-state-DSdpv9IU.mjs";
import { a as isCandidateAdmissionContextCovered, i as hasSchemaRefusal, n as checkTargetDatabaseSchemasForContexts, r as formatSchemaRefusalLines } from "./schema-preflight-_BPWsRCI.mjs";
import { o as checkGlobalPackageUpdatePermissions } from "./package-update-steps-DUyCf_no.mjs";
import path from "node:path";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
//#region src/infra/update-candidate-canary-process.ts
function launchCanary(params) {
	const { entry, args, env, capture } = params;
	params.assertCurrent?.();
	const child = spawn(params.nodeRunner ?? process.execPath, [entry, ...args], {
		cwd: params.root,
		env,
		detached: process.platform !== "win32",
		stdio: [
			"ignore",
			"pipe",
			"pipe"
		],
		windowsHide: true
	});
	let stdout = "";
	let firstStderrLine;
	let cliReason;
	const captureStderr = (line) => {
		if (!line.trim() || line.startsWith("openclaw-update-canary-progress: ")) return;
		const safe = redactSupportDiagnosticLine(line, {
			env,
			stateDir: params.stateDir
		});
		firstStderrLine ??= safe;
		if (line.startsWith("[openclaw] Reason: ")) cliReason ??= safe.replace(/^\[openclaw\] Reason: /u, "");
	};
	let stdoutBytes = 0;
	let outputExceeded = false;
	const flushers = [child.stdout, child.stderr].map((stream) => {
		stream.setEncoding("utf8");
		let pending = "";
		let droppingLine = false;
		const captureLine = (line) => {
			if (stream === child.stderr) captureStderr(line);
			capture(line);
			params.onLine?.(line);
		};
		stream.on("data", (chunk) => {
			let text = chunk;
			if (droppingLine) {
				const newline = text.indexOf("\n");
				if (newline < 0) return;
				text = text.slice(newline + 1);
				droppingLine = false;
			}
			pending += text;
			const lines = pending.split(/\r?\n/u);
			pending = lines.pop() ?? "";
			for (const line of lines) captureLine(line);
			if (pending.length > 65536) {
				pending = "";
				droppingLine = true;
				if (stream === child.stderr) firstStderrLine ??= "[oversized log line omitted]";
				capture("[oversized log line omitted]");
			}
		});
		return () => {
			if (pending) {
				captureLine(pending);
				pending = "";
			}
		};
	});
	child.stdout.on("data", (chunk) => {
		stdoutBytes += Buffer.byteLength(chunk);
		if (stdoutBytes <= 1048576) {
			stdout += chunk;
			params.onStdout?.(stdout);
		} else outputExceeded = true;
	});
	let exited = false;
	let processExited = false;
	return {
		child,
		result: new Promise((resolve) => {
			child.once("exit", (code) => {
				processExited = true;
				if (code !== 0) resolve(code);
			});
			child.once("error", (error) => {
				captureStderr(error.message);
				capture(error.message);
				exited = true;
				resolve(null);
			});
			child.once("close", (code) => {
				for (const flush of flushers) flush();
				exited = true;
				resolve(code);
			});
		}),
		closed: new Promise((resolve) => {
			child.once("close", () => resolve());
		}),
		hasExited: () => exited,
		processExited: () => processExited,
		stdout: () => stdout,
		firstStderrLine: () => cliReason ?? firstStderrLine,
		outputExceeded: () => outputExceeded
	};
}
async function waitBounded(promise, milliseconds, signal) {
	let timer;
	let abort;
	try {
		return await Promise.race([promise.then((value) => ({
			status: "completed",
			value
		})), new Promise((resolve) => {
			timer = setTimeout(() => resolve({ status: "deadline" }), Math.max(0, milliseconds));
			abort = () => resolve({ status: "aborted" });
			signal?.addEventListener("abort", abort, { once: true });
			if (signal?.aborted) abort();
		})]);
	} finally {
		clearTimeout(timer);
		if (abort) signal?.removeEventListener("abort", abort);
	}
}
async function terminateCanary(child, closed, deadline) {
	if (!child.pid) return true;
	const options = { detached: process.platform !== "win32" };
	const signal = (kind) => new Promise((resolve) => {
		signalProcessTree(child.pid, kind, {
			...options,
			onComplete: resolve
		});
	});
	const term = signal("SIGTERM");
	await waitBounded(Promise.all([term, closed]), Math.min(1e3, Math.max(0, deadline - Date.now())));
	return (await waitBounded(Promise.all([
		term,
		signal("SIGKILL"),
		closed
	]), Math.min(1e3, Math.max(0, deadline - Date.now())))).status === "completed";
}
//#endregion
//#region src/cli/update-cli/update-command-node-runtime.ts
/** Only a live updater may provision; discovery never reads dotenv-selected paths. */
function createPackageRuntimeRecovery(params) {
	const authority = createUpdateCommandAuthority(params, "Node runtime provisioning");
	const executor = authority.executorFence;
	return {
		env: params.opts.runtimeRecoveryEnv ?? {},
		...executor ? { installCommand: async (command, args, env) => {
			authority.assertCurrent();
			const installResult = await withUpdateCommandExecutorChild(executor, params.root, async (_grant, bindChild) => {
				authority.assertRequesterCurrent();
				const gate = prepareUpdateCommandNativeGate(randomUUID(), [env]);
				const result = await runCommandWithTimeout([
					process.execPath,
					"--input-type=module",
					"-e",
					gate.source,
					"--",
					command,
					...args
				], {
					baseEnv: {},
					env: gate.env,
					cwd: params.root,
					input: gate.input,
					beforeInput: (pid, argv) => {
						authority.assertRequesterCurrent();
						bindChild(pid, argv);
					},
					timeoutMs: params.timeoutMs,
					killProcessTree: true,
					requireProcessTreeExtinction: true,
					maxOutputBytes: 65536
				});
				if (result.cleanup === "forced" || result.cleanup === "uncertain") throw new CommandProcessCleanupError();
				authority.assertRequesterCurrent();
				if (result.code !== 0 || result.termination !== "exit" || result.signal !== null || result.killed || result.cleanup !== "normal" && result.cleanup !== "cooperative" || result.outputLimitExceeded || result.outputErrorStream) throw new Error("Private Node runtime provisioning did not complete successfully.");
				return result;
			}, { auxiliaryPreflight: true });
			authority.assertCurrent();
			return installResult.code;
		} } : {}
	};
}
function reportPackageRuntimeSelection(selection, opts) {
	if (!selection.replacedNodeRunner || opts.json) return;
	defaultRuntime.log(theme.warn(`Managed gateway service Node (${selection.replacedNodeRunner}) cannot run openclaw@${selection.targetVersion ?? opts.tag}.`));
	defaultRuntime.log(theme.muted(`Using compatible Node (${selection.nodeRunner}) for the update and managed service refresh.`));
}
/** The same target-runtime owner serves admitted updates and target-owned initialization. */
async function preparePackageUpdateRuntime(params) {
	const managedServiceNodeRunner = params.managedService?.serviceNodeRunner ?? params.managedServiceNodeRunner;
	const canRefreshManagedServiceNode = params.shouldRestart && params.managedService?.serviceUpdateVerdict?.kind === "owned" && params.managedService.serviceUpdateVerdict.refreshDefinition && params.managedService.serviceMutationAllowed !== false;
	const fence = await params.executor.enter(params.root, {
		preflight: true,
		serviceRoot: params.managedServiceRoot
	});
	if (params.opts.run) params.opts.run.executorFence = fence;
	const result = await resolvePackageRuntimePreflight({
		root: params.root,
		service: params.managedService,
		shouldRestart: params.shouldRestart,
		invocationCwd: params.invocationCwd,
		channel: params.channel,
		requestedChannel: params.requestedChannel,
		target: params.packageRuntimeTarget,
		timeoutMs: params.timeoutMs,
		nodeRunner: params.managedServiceRoot && canRefreshManagedServiceNode ? params.packageUpdateNodeRunner : managedServiceNodeRunner ?? params.packageUpdateNodeRunner,
		fallbackNodeRunner: canRefreshManagedServiceNode && !process.versions.bun ? resolveNodeRunner() : void 0,
		runtimeRecovery: !managedServiceNodeRunner || canRefreshManagedServiceNode ? createPackageRuntimeRecovery({
			root: params.root,
			opts: params.opts,
			timeoutMs: params.timeoutMs,
			executorFence: fence
		}) : void 0
	});
	fence.assertCurrent();
	if (result.ok) {
		if (params.packageInstallEnv && result.value.nodeRunner) applyPathPrepend(params.packageInstallEnv, [path.dirname(result.value.nodeRunner)]);
		reportPackageRuntimeSelection(result.value, {
			json: params.opts.json,
			tag: params.tag
		});
	}
	return result;
}
//#endregion
//#region src/cli/update-cli/update-command-dry-run.ts
async function handleDryRunPreflightError(error, notes, refuseUpdate) {
	if (!(error instanceof UpdatePreMutationError)) throw error;
	if (error.reason === "database-schema-preflight" || error.reason === "target-metadata-preflight" || error.reason === "invalid-config" || error.reason === "config-read-failed") {
		notes.push(error.message.replace(/^Update refused:/u, "Would refuse update:"));
		return {
			incompatible: [],
			indeterminate: []
		};
	}
	await refuseUpdate(error.reason, error.message, error.failureFacts, error.recoverySteps);
	return {
		incompatible: [],
		indeterminate: []
	};
}
function printDryRunPreview(preview, jsonMode) {
	if (jsonMode) {
		defaultRuntime.writeJson(preview);
		return;
	}
	defaultRuntime.log(theme.heading("Update dry-run"));
	defaultRuntime.log(theme.muted("No changes were applied."));
	defaultRuntime.log("");
	defaultRuntime.log(`  Root: ${theme.muted(preview.root)}`);
	defaultRuntime.log(`  Install kind: ${theme.muted(preview.installKind)}`);
	defaultRuntime.log(`  Mode: ${theme.muted(preview.mode)}`);
	defaultRuntime.log(`  Channel: ${theme.muted(preview.effectiveChannel)}`);
	defaultRuntime.log(`  Tag/spec: ${theme.muted(preview.tag)}`);
	if (preview.currentVersion) defaultRuntime.log(`  Current version: ${theme.muted(preview.currentVersion)}`);
	if (preview.targetVersion) defaultRuntime.log(`  Target version: ${theme.muted(preview.targetVersion)}`);
	else if (preview.targetVersionReason) defaultRuntime.log(`  Target version: unresolved (${preview.targetVersionReason})`);
	if (preview.downgradeRisk) defaultRuntime.log(theme.warn("  Downgrade confirmation would be required in a real run."));
	defaultRuntime.log("");
	defaultRuntime.log(theme.heading("Planned actions:"));
	for (const action of preview.actions) defaultRuntime.log(`  - ${action}`);
	if (preview.notes.length > 0) {
		defaultRuntime.log("");
		defaultRuntime.log(theme.heading("Notes:"));
		for (const note of preview.notes) defaultRuntime.log(`  - ${theme.muted(note)}`);
	}
}
async function printUpdateDryRun(params) {
	const actions = [];
	if (params.requestedChannel && params.requestedChannel !== params.storedChannel) actions.push(`Persist update.channel=${params.requestedChannel} in config`);
	if (params.switchToGit) actions.push("Switch install mode from package to git checkout (dev channel)");
	else if (params.switchToPackage) actions.push(`Switch install mode from git to package manager (${params.mode})`);
	else if (params.updateInstallKind === "git") actions.push(`Run git update flow on channel ${params.channel} (fetch/rebase/build/doctor)`);
	else if (params.packageAlreadyCurrent) actions.push(`Refresh package install with spec ${params.packageInstallSpec ?? params.tag}; current version already matches ${params.targetVersion}`);
	else actions.push(`Run global package manager update with spec ${params.packageInstallSpec ?? params.tag}`);
	actions.push("Run plugin update sync after core update");
	actions.push("Refresh shell completion cache (if needed)");
	actions.push(params.shouldRestart ? "Restart gateway service and run doctor checks" : "Skip restart (because --no-restart is set)");
	const notes = [...params.preflightNotes ?? []];
	if (params.opts.tag && params.updateInstallKind === "git") notes.push("--tag applies to npm installs only; git updates ignore it.");
	if (params.fallbackToLatest) notes.push("Beta channel resolves to latest for this run (fallback).");
	if (params.managedServiceRoot) actions.push(`Rebind the managed Gateway from ${params.managedServiceRoot} to ${params.root} after verification.`);
	if (params.managedServiceRootRedirect) notes.push(`Package update targets managed service root ${params.managedServiceRootRedirect.root} instead of invoking root ${params.managedServiceRootRedirect.previousRoot}.`);
	if (params.explicitTag && !canResolveRegistryVersionForPackageTarget(params.tag)) notes.push("Non-registry package specs skip npm version lookup and downgrade previews.");
	if (hasSchemaRefusal(params.packageSchemaPreflight)) notes.push(...formatSchemaRefusalLines(params.packageSchemaPreflight, true));
	if (params.updateInstallKind === "git") notes.push("Git preview does not execute target scripts or select a build-tested development fallback. The real update repeats database admission before executing each update.");
	const run = getUpdateRun(params.runId, { env: params.opts.run?.env });
	const targetVersionReason = params.targetVersion ? void 0 : params.updateInstallKind === "git" ? "Git dry-runs do not select a build-tested target version." : canResolveRegistryVersionForPackageTarget(params.packageInstallSpec ?? params.tag) ? "The package target version could not be resolved." : "The package artifact is not staged during a dry-run.";
	printDryRunPreview({
		runId: params.runId,
		run,
		dryRun: true,
		root: params.root,
		installKind: params.installKind,
		mode: params.mode,
		updateInstallKind: params.updateInstallKind,
		switchToGit: params.switchToGit,
		switchToPackage: params.switchToPackage,
		restart: params.shouldRestart,
		requestedChannel: params.requestedChannel,
		storedChannel: params.storedChannel,
		effectiveChannel: params.channel,
		tag: params.packageInstallSpec ?? params.tag,
		currentVersion: run?.before?.version ?? params.currentVersion,
		targetVersion: params.targetVersion,
		...targetVersionReason ? { targetVersionReason } : {},
		downgradeRisk: params.downgradeRisk,
		actions,
		notes,
		...params.preflightFailures?.length ? { failures: params.preflightFailures } : {}
	}, Boolean(params.opts.json));
	if (!params.opts.json) await printResult({
		runId: params.runId,
		status: "skipped",
		mode: params.mode,
		reason: "dry-run",
		steps: [],
		durationMs: 0
	}, params.opts);
}
//#endregion
//#region src/cli/update-cli/update-command-schema.ts
/** Render prepared preview facts without initializing runtime state. */
async function previewUpdateCommand(params) {
	const { target, prepared, opts } = params;
	const preflight = params.preflight ?? await preflightUpdateCommandSchemas({
		...target,
		shouldRestart: prepared.shouldRestart,
		updateStepTimeoutMs: params.updateStepTimeoutMs,
		invocationCwd: params.invocationCwd,
		packageTargetVersion: target.targetVersion ?? void 0,
		opts,
		expectedForeground: prepared.controlPlaneUpdateSentinelMeta?.completionOwner === "gateway-restart" || void 0
	});
	if (preflight) {
		if (target.inspectionWarning) preflight.preflightNotes.push(target.inspectionWarning);
		if (target.packageInstallTarget && !target.packageAlreadyCurrent && preflight.preflightFailures.length === 0) {
			const permissions = await checkGlobalPackageUpdatePermissions(target.packageInstallTarget);
			if (permissions?.stderrTail) {
				preflight.preflightFailures.push({
					reason: UPDATE_GLOBAL_PERMISSION_REASON,
					message: permissions.stderrTail,
					failureFacts: permissions.failureFacts
				});
				preflight.preflightNotes.push(`Would refuse update: ${permissions.stderrTail}`);
			}
		}
		await printUpdateDryRun({
			...target,
			...preflight,
			runId: params.runId,
			installKind: prepared.installKind,
			mode: target.updateInstallKind === "git" ? "git" : target.packageInstallTarget?.manager ?? "unknown",
			shouldRestart: prepared.shouldRestart,
			requestedChannel: prepared.requestedChannel,
			opts
		});
	}
}
/** Record validation, then inspect package admission or Git previews before mutation. */
async function preflightUpdateCommandSchemas(params) {
	const { root, updateInstallKind, switchToGit, shouldRestart, updateStepTimeoutMs, invocationCwd, managedServiceRootRedirect, channel, devTarget, packageTargetSchemaVersions, opts, refuseUpdate } = params;
	const run = opts.run;
	const candidateAdmissionChecks = updateInstallKind === "package" && !opts.dryRun ? params.candidateAdmissionChecks ?? run?.candidateAdmissionChecks : void 0;
	if (run) recordUpdateRunPhase(run.runId, "validating", void 0, { env: run.env });
	let packageSchemaPreflight = {
		incompatible: [],
		indeterminate: []
	};
	const preflightNotes = [];
	const preflightFailures = [];
	let service;
	if ((opts.dryRun || updateInstallKind === "package") && updateInstallKind !== "unknown") try {
		const { inspectUpdateDatabaseContexts } = await import("./update-command-database-context-mdp3xJz3.mjs");
		const { inspectGitDryRunTargetSchemaVersions } = await import("./update-command-git-DgmcHr_p.mjs");
		const admission = await inspectUpdateDatabaseContexts({
			roots: switchToGit ? [root, resolveGitInstallDir()] : [root],
			updateInstallKind,
			shouldRestart,
			jsonMode: Boolean(opts.json),
			timeoutMs: updateStepTimeoutMs,
			invocationCwd,
			managedServiceRootRedirect,
			managedServiceRoot: params.managedServiceRoot,
			legacyConfigPlan: params.legacyConfigPlan,
			candidateAdmissionChecks,
			expectedForeground: params.expectedForeground || run?.completionOwner === "gateway-restart" || void 0
		});
		service = admission.foreground ? void 0 : admission.service ?? admission.services.get(root);
		for (const inspectedService of admission.services.values()) if (inspectedService.serviceUpdateVerdict?.kind === "unavailable") preflightNotes.push(inspectedService.serviceUpdateVerdict.message);
		else if (inspectedService.serviceUpdateVerdict?.kind === "owned" && inspectedService.serviceUpdateVerdict.requiresInstallRootRefresh) preflightNotes.push(`Gateway service targets ${inspectedService.serviceUpdateVerdict.root}; ${shouldRestart ? "would reconcile it with" : `restart is disabled; run ${formatCliCommand("openclaw doctor --fix", inspectedService.serviceEnv)} to reconcile it with`} the active installation ${root}.`);
		const target = updateInstallKind === "git" ? await inspectGitDryRunTargetSchemaVersions({
			root: switchToGit ? resolveGitInstallDir() : root,
			timeoutMs: updateStepTimeoutMs,
			channel,
			devTarget
		}) : { schemaVersions: packageTargetSchemaVersions };
		if ("metadataUnreadable" in target && target.metadataUnreadable) {
			const failure = createUpdatePreflightFailure("failureCode" in target && target.failureCode ? target.failureCode : "target-git-metadata", target.metadataUnreadable);
			throw new UpdatePreMutationError("target-metadata-preflight", failure.message, { failureFacts: failure.failureFacts });
		}
		const installedContexts = candidateAdmissionChecks?.includes("database-schema") ? admission.contexts.filter((context) => !isCandidateAdmissionContextCovered(context.env)) : admission.contexts;
		packageSchemaPreflight = await checkTargetDatabaseSchemasForContexts(target.schemaVersions, installedContexts);
		if (opts.dryRun && updateInstallKind === "package") {
			const runtime = await resolvePackageRuntimePreflight({
				...params,
				target: params.packageRuntimeTarget,
				nodeRunner: params.managedServiceNodeRunner,
				timeoutMs: updateStepTimeoutMs,
				alreadyCurrent: params.packageAlreadyCurrent,
				service,
				installedRoot: params.packageAlreadyCurrent ? root : void 0
			});
			if (!runtime.ok) {
				preflightNotes.push(`Would refuse update: ${runtime.error}`);
				preflightFailures.push({
					reason: "node-runtime-preflight",
					message: runtime.error,
					failureFacts: runtime.failureFacts,
					recoverySteps: runtime.recoverySteps
				});
			} else if (runtime.value.replacedNodeRunner) preflightNotes.push(`Would replace managed gateway service Node (${runtime.value.replacedNodeRunner}) with current Node (${runtime.value.nodeRunner}) for openclaw@${runtime.value.targetVersion}.`);
			if (params.packageInstallSpec && !canResolveRegistryVersionForPackageTarget(params.packageInstallSpec)) preflightNotes.push("Configured plugin availability will be checked against the staged package before update checks or activation; this preview does not stage the target.");
			else {
				const { preflightConfiguredNpmPluginTargets } = await import("./update-command-plugin-preflight-BGlwCaSF.mjs");
				const context = admission.contexts.at(-1);
				const pluginWarnings = await preflightConfiguredNpmPluginTargets({
					config: context.configSnapshot.sourceConfig,
					env: context.env,
					targetVersion: params.packageTargetVersion ?? null,
					channel,
					timeoutMs: updateStepTimeoutMs
				});
				preflightNotes.push(...pluginWarnings.map((warning) => warning.message));
			}
		}
	} catch (error) {
		if (!opts.dryRun) {
			if (error instanceof UpdatePreMutationError) {
				await refuseUpdate(error.reason, error.message, error.failureFacts, error.recoverySteps);
				return;
			}
			throw error;
		}
		packageSchemaPreflight = await handleDryRunPreflightError(error, preflightNotes, refuseUpdate);
		if (error instanceof UpdatePreMutationError && error.reason === "target-metadata-preflight") preflightFailures.push({
			reason: error.reason,
			message: error.message,
			failureFacts: error.failureFacts
		});
	}
	if (!opts.dryRun && hasSchemaRefusal(packageSchemaPreflight)) {
		await refuseUpdate("database-schema-preflight", formatSchemaRefusalLines(packageSchemaPreflight).join("\n"));
		return;
	}
	return {
		packageSchemaPreflight,
		preflightNotes,
		preflightFailures,
		service
	};
}
function assertForegroundUpdateSchemaSupport(run, candidate, schemas, gatewayRestartCompletion) {
	if (run?.completionOwner !== "gateway-restart" || gatewayRestartCompletion || !candidate) return;
	const sharedPath = resolveOpenClawStateSqlitePath(run.env);
	if (schemas?.some((entry) => {
		const version = resolveUpdateStateContentVersion(entry);
		return version !== null && version !== candidate[entry.path === sharedPath ? "state" : "agent"];
	})) throw new UpdatePreMutationError("target-native-unsupported", "Target runtime cannot preserve the foreground Gateway's completion owner after state migration; refusing activation.");
}
async function captureUpdateActivationSchemas(params) {
	const previousSchemaVersions = parsePackageOpenClawSchemaVersions(await tryReadJson(path.join(params.root, "package.json")));
	const schemaVersions = params.candidateSchemaVersions ? await readUpdateStateSchemaVersions({
		stateDir: resolveStateDir(params.env),
		config: params.config,
		env: params.env,
		timeoutMs: params.timeoutMs
	}) : void 0;
	assertForegroundUpdateSchemaSupport(params.run, params.candidateSchemaVersions, schemaVersions, params.gatewayRestartCompletion);
	return {
		previousSchemaVersions,
		schemaVersions
	};
}
//#endregion
export { preparePackageUpdateRuntime as a, waitBounded as c, createPackageRuntimeRecovery as i, preflightUpdateCommandSchemas as n, launchCanary as o, previewUpdateCommand as r, terminateCanary as s, captureUpdateActivationSchemas as t };
