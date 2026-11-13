import { n as tryProcessCwd } from "./safe-cwd-DOxDm8mD.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as VERSION } from "./version-BMuSsYfE.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import "./update-run-timeouts-Byb-PlTk.mjs";
import { r as theme } from "./theme-DzaUZY4q.mjs";
import { r as hasCommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { l as withCommandProcessScope } from "./exec-spawn-B_BFgGrb.mjs";
import { l as withGatewayServiceUpdateAuthority } from "./service-update-authority-CVLjmQiA.mjs";
import { t as createUpdateErrorFact } from "./update-failure-facts-RzGaiYBm.mjs";
import { l as recordUpdateRunPhase, v as UpdateRecoveryRequiredError } from "./update-run-ledger-C5c7VrBu.mjs";
import { t as finishUpdateRun } from "./update-run-write-rWyADCOZ.mjs";
import { o as captureUpdateCommandExecutorAuthority, p as UpdateCommandRecoveryPendingError, t as withUpdateCommandExecutor } from "./update-command-executor-B6yk9cYV.mjs";
import { r as confirmUpdateDowngrade, u as resolveGitInstallDir } from "./shared-Dwr7djBO.mjs";
import { b as resolveUpdateCommandAdmissionRoot, d as admitUpdateCommandRun, f as assertUpdatePackageActivationAdmission, g as prepareUpdateCommand, h as prepareMutableUpdateRuntime, l as withUpdateCommandTerminalResult, m as createUpdateRunProgress, n as hasDeferredUpdateCommandTerminalResult, o as reportPreMutationUpdateResult, p as completeUpdateCommandRun, r as prepareUnexpectedUpdateCommandFailure, t as deferUpdateCommandTerminalResult, x as withUpdatePreviewSignals, y as resolveUpdateCommandAdmissionEnv } from "./update-command-terminal--2X6rdAF.mjs";
import { i as resolveServiceRefreshEnv, u as withUpdateInProgressEnv } from "./update-command-service-env-QsECikj0.mjs";
import { t as createUpdateProgress } from "./progress-Dl6WMBUB.mjs";
import { o as createUpdateConfigFailure } from "./schema-preflight-_BPWsRCI.mjs";
import { t as assertUpdateRecoveryAdmission } from "./update-run-recovery-admission-D2B4sqip.mjs";
import { i as UpdateCommandPendingRecoveryFailure, n as UpdateCommandFailure, o as createUpdateCommandFailureResult, r as UpdateCommandFinalizedRecoveryFailure, u as mergeWindowsTaskRecoveryFailure, v as withUpdateAdmissionReporting } from "./update-command-result-BUs0awIs.mjs";
import { t as admitUpdateRequesterContinuation } from "./update-command-managed-context-BYvoN6HJ.mjs";
import { t as resolveUpdateFinalizationTimeoutMs } from "./update-finalization-budget-B2E6yyKH.mjs";
import { n as withUpdateFailureTriage } from "./update-command-triage-wiOiRZOv.mjs";
import { a as preparePackageUpdateRuntime, n as preflightUpdateCommandSchemas, r as previewUpdateCommand } from "./update-command-schema-Dd9sJQYD.mjs";
import { n as resolveUpdateCommandTarget, o as withUpdateCandidateAdmission } from "./update-command-target-BGY3H7b_.mjs";
//#region src/cli/update-cli/update-command-unwind.ts
/** Unwind only legacy updates; pending publication cannot authorize compensation or diagnostics. */
async function withUpdateCommandRecoveryUnwind(opts, recoveryState, operation) {
	const run = opts.run;
	const primaryResult = (error) => error instanceof UpdateCommandFailure ? error.result : recoveryState.triageTarget.failureResult ?? {
		...createUpdateCommandFailureResult({
			mode: "unknown",
			root: recoveryState.triageTarget.root,
			durationMs: 0,
			failure: {
				cause: error,
				detail: createUpdateErrorFact("update", error, run.env).message
			}
		}),
		runId: run.runId
	};
	const settlePending = async (error) => {
		if (opts.recovery) return error;
		try {
			await recoveryState.windowsTaskAutoStartRecovery?.complete(false, { preserveState: true });
			return error;
		} catch (cause) {
			return new UpdateCommandPendingRecoveryFailure(error.result, `${formatErrorMessage(error)}; Windows suspension settlement failed: ${formatErrorMessage(cause)}`, { cause: new AggregateError([error, cause], "Pending update cleanup failed", { cause: error }) });
		}
	};
	let failure;
	try {
		await withCommandProcessScope(operation);
		run.executorFence?.assertCurrent();
	} catch (error) {
		if (hasCommandProcessCleanupError(error)) throw await settlePending(new UpdateCommandPendingRecoveryFailure(primaryResult(error), formatErrorMessage(error), { cause: error }));
		try {
			run.executorFence?.assertCurrent();
		} catch (cause) {
			throw await settlePending(new UpdateCommandPendingRecoveryFailure(primaryResult(error), formatErrorMessage(cause), { cause: new AggregateError([error, cause], "Update executor was lost", { cause: error }) }));
		}
		if (error instanceof UpdateCommandPendingRecoveryFailure || error instanceof UpdateCommandFinalizedRecoveryFailure) throw await settlePending(error);
		if (error instanceof UpdateCommandRecoveryPendingError || error instanceof UpdateRecoveryRequiredError || opts.recovery) throw await settlePending(new UpdateCommandPendingRecoveryFailure(primaryResult(error), formatErrorMessage(error), { cause: error }));
		failure = { error };
	}
	if (opts.recovery) return;
	if (recoveryState.ledgerHandoffOwned && !recoveryState.ledgerHandoffCompleted) {
		let cause = failure?.error ?? /* @__PURE__ */ new Error("Update finalization has no confirmed outcome.");
		try {
			await recoveryState.windowsTaskAutoStartRecovery?.complete(false);
		} catch (error) {
			cause = new AggregateError([cause, error], "Migrated handoff recovery remains pending", { cause });
		}
		throw new UpdateCommandPendingRecoveryFailure(primaryResult(failure?.error ?? cause), formatErrorMessage(cause), { cause });
	}
	if (!recoveryState.ledgerHandoffOwned) {
		const admitRecovery = async () => {
			const paths = /* @__PURE__ */ new Set();
			for (const env of [run.env, recoveryState.triageTarget.env]) {
				const file = resolveOpenClawStateSqlitePath(env);
				if (paths.has(file)) continue;
				paths.add(file);
				await assertUpdateRecoveryAdmission({ env });
			}
		};
		try {
			await admitRecovery();
		} catch (error) {
			const pending = new UpdateCommandPendingRecoveryFailure(primaryResult(failure?.error ?? error), formatErrorMessage(error), { cause: error });
			if (failure && !(failure.error instanceof UpdateCommandFailure) && !run.executorFence && !recoveryState.windowsTaskAutoStartRecovery && !hasDeferredUpdateCommandTerminalResult(run)) {
				const original = failure.error;
				deferUpdateCommandTerminalResult(run, async (settlementFailure, onTerminalRecord) => {
					if (settlementFailure !== pending) throw settlementFailure;
					try {
						await admitRecovery();
					} catch (cause) {
						throw new UpdateCommandPendingRecoveryFailure(primaryResult(original), formatErrorMessage(cause), { cause });
					}
					const recorded = await prepareUnexpectedUpdateCommandFailure(original, opts, onTerminalRecord);
					if (recorded instanceof UpdateCommandPendingRecoveryFailure) throw recorded;
					return recorded.result;
				});
			}
			throw await settlePending(pending);
		}
	}
	try {
		await recoveryState.windowsTaskAutoStartRecovery?.restore();
		await recoveryState.windowsTaskAutoStartRecovery?.complete();
	} catch (restoreError) {
		let error = restoreError;
		try {
			await recoveryState.windowsTaskAutoStartRecovery?.complete(false);
		} catch (compensationError) {
			error = new AggregateError([error, compensationError], `Windows task autostart recovery failed: ${formatErrorMessage(error)}; ${formatErrorMessage(compensationError)}`, { cause: error });
		}
		failure = mergeWindowsTaskRecoveryFailure(failure, error);
	}
	if (failure) {
		if (!recoveryState.ledgerHandoffOwned && !hasDeferredUpdateCommandTerminalResult(run)) {
			if (failure.error instanceof UpdateCommandFailure) completeUpdateCommandRun(failure.error.result, run);
			else failure.error = await prepareUnexpectedUpdateCommandFailure(failure.error, opts);
		}
		throw failure.error;
	}
}
//#endregion
//#region src/cli/update-cli/update-command.ts
async function updateCommand(inputOpts, executorOptions) {
	const { withRetainedUpdateRuntime } = await import("./update-retained-runtime-C_WqPFAE.mjs");
	return await withRetainedUpdateRuntime(import.meta.url, (retainRuntime) => updateCommandWithRuntime(inputOpts, retainRuntime, executorOptions));
}
async function updateCommandWithRuntime(inputOpts, retainRuntime, executorOptions) {
	const invocationCwd = tryProcessCwd();
	const recoveryState = { triageTarget: { env: resolveServiceRefreshEnv(process.env, invocationCwd) } };
	const prepared = await withUpdateAdmissionReporting(inputOpts, () => withUpdateInProgressEnv(invocationCwd, () => prepareUpdateCommand(inputOpts)));
	if (prepared.postCoreUpdateResume) return await withUpdateInProgressEnv(invocationCwd, async () => (await import("./update-execution.runtime.js")).resumePostCoreUpdate({
		root: prepared.discoveredRoot,
		channel: prepared.postCoreUpdateChannel,
		opts: inputOpts,
		timeoutMs: prepared.timeoutMs ?? 18e5
	}));
	return await withUpdateAdmissionReporting(inputOpts, async () => {
		const root = prepared.servicePlan?.rootRedirect?.root ?? prepared.discoveredRoot;
		const serviceRoot = prepared.servicePlan?.serviceRoot;
		const env = await resolveUpdateCommandAdmissionEnv({
			opts: inputOpts,
			root: resolveUpdateCommandAdmissionRoot(prepared),
			invocationCwd,
			pkgOwnership: prepared.pkgOwnership,
			expectedForeground: prepared.controlPlaneUpdateSentinelMeta?.completionOwner === "gateway-restart" || void 0
		});
		const { updateStateNeedsInitialization } = await import("./update-command-initialization-BDgiLlSm.mjs");
		assertUpdatePackageActivationAdmission(root, { serviceRoot });
		const needsInitialization = await updateStateNeedsInitialization(env);
		const execute = (initialization) => runAdmittedUpdate(inputOpts, prepared, recoveryState, invocationCwd, retainRuntime, initialization, executorOptions);
		if (needsInitialization) {
			const { initializeAndRunUpdate } = await import("./update-command-initialization-run-CgtOpFZt.mjs");
			return await initializeAndRunUpdate(inputOpts, prepared, recoveryState, invocationCwd, env, execute, executorOptions);
		}
		return await execute();
	});
}
async function runAdmittedUpdate(inputOpts, prepared, recoveryState, invocationCwd, retainRuntime, initialization, executorOptions) {
	const run = await admitUpdateCommandRun({
		opts: inputOpts,
		root: resolveUpdateCommandAdmissionRoot(prepared),
		serviceRoot: initialization?.target.managedServiceRoot ?? prepared.servicePlan?.serviceRoot,
		invocationCwd,
		initialization,
		pkgOwnership: prepared.pkgOwnership,
		expectedForeground: prepared.controlPlaneUpdateSentinelMeta?.completionOwner === "gateway-restart" || void 0,
		installKind: prepared.installKind
	});
	const opts = {
		...inputOpts,
		run
	};
	prepared.controlPlaneUpdateSentinelMeta = {
		...prepared.controlPlaneUpdateSentinelMeta,
		runId: run.runId
	};
	recoveryState.triageTarget.root = prepared.discoveredRoot;
	let disposePresentation;
	let executionStarted = false;
	try {
		await initialization?.registerRun(run);
		if (initialization?.target.updateInstallKind === "package") {
			run.executorFence = await initialization.executor.enter(initialization.target.root, {
				preflight: true,
				serviceRoot: initialization.target.managedServiceRoot
			});
			assertUpdatePackageActivationAdmission(initialization.target.root, { serviceRoot: initialization.target.managedServiceRoot });
		}
		const presentation = createUpdateProgress(!opts.json, run);
		disposePresentation = presentation.dispose;
		const executeWith = async (executor) => {
			await admitUpdateRequesterContinuation(run, executor, resolveUpdateCommandAdmissionRoot(prepared), initialization?.target.managedServiceRoot ?? prepared.servicePlan?.serviceRoot);
			const execute = () => {
				executionStarted = true;
				return withUpdateCommandRecoveryUnwind(opts, recoveryState, () => updateCommandInternal(opts, recoveryState, invocationCwd, prepared, presentation, executor, retainRuntime, initialization));
			};
			if (inputOpts.dryRun || !prepared.controlPlaneUpdateSentinelMeta?.handoffId) return execute();
			const fence = run.executorFence ?? await executor.enter(prepared.servicePlan?.rootRedirect?.root ?? prepared.discoveredRoot, {
				preflight: true,
				serviceRoot: prepared.servicePlan?.serviceRoot
			});
			run.executorFence = fence;
			const runId = run.runId;
			const assertCurrent = () => {
				if (opts.run !== run || run.runId !== runId || run.executorFence !== fence) throw new UpdateCommandRecoveryPendingError("Managed updater lost its admitted executor.");
				captureUpdateCommandExecutorAuthority(fence, runId);
			};
			return withGatewayServiceUpdateAuthority(assertCurrent, execute, { originalRoot: captureUpdateCommandExecutorAuthority(fence, runId).installKey });
		};
		await withUpdatePreviewSignals(opts, initialization ? () => executeWith(initialization.executor) : () => withUpdateFailureTriage({
			...opts,
			invocationCwd
		}, recoveryState.triageTarget, () => withUpdateInProgressEnv(invocationCwd, () => withUpdateCommandTerminalResult((registerRun) => {
			registerRun(run);
			return withUpdateCommandExecutor(run.runId, executeWith, executorOptions);
		}, opts))));
	} catch (error) {
		if (!executionStarted) throw await prepareUnexpectedUpdateCommandFailure(error, opts);
		throw error;
	} finally {
		disposePresentation?.();
	}
}
async function updateCommandInternal(opts, recoveryState, invocationCwd, prepared, presentation, executor, retainRuntime, initialization) {
	const { timeoutMs } = prepared;
	const run = opts.run;
	const updateStepTimeoutMs = timeoutMs ?? run.defaultStepTimeoutMs ?? 18e5;
	const target = initialization?.target ?? await resolveUpdateCommandTarget(opts, recoveryState, invocationCwd, prepared, executor, updateStepTimeoutMs);
	if (!target) return;
	return await withUpdateCandidateAdmission({
		target,
		prepared,
		opts,
		timeoutMs: updateStepTimeoutMs,
		invocationCwd,
		presentation,
		stagedPackage: initialization?.stagedPackage,
		candidateAdmission: initialization?.candidateAdmission
	}, (stagedPackage) => runResolvedUpdate(opts, recoveryState, invocationCwd, prepared, presentation, executor, retainRuntime, target, stagedPackage, initialization));
}
async function runResolvedUpdate(opts, recoveryState, invocationCwd, prepared, presentation, executor, retainRuntime, target, stagedPackage, initialization) {
	const { startedAt, timeoutMs, shouldRestart, requestedChannel, controlPlaneUpdateSentinelMeta, discoveredRoot, installKind } = prepared;
	const run = opts.run;
	const updateStepTimeoutMs = timeoutMs ?? run.defaultStepTimeoutMs ?? 18e5;
	const { root, mode, updateInstallKind, configSnapshot, legacyConfigPlan, storedChannel, channel, switchToGit, switchToPackage, tag, currentVersion, targetVersion, downgradeRisk, packageInstallTarget, packageAlreadyCurrent, packageRuntimeTarget, managedServiceRootRedirect, managedServiceRoot, managedServiceNodeRunner } = target;
	let { packageUpdateNodeRunner } = target;
	const refuseUpdate = async (reason, message, failureFacts, recoverySteps) => {
		await stagedPackage?.close();
		return await reportPreMutationUpdateResult({
			root,
			mode,
			installKind: updateInstallKind,
			opts,
			controlPlaneUpdateSentinelMeta,
			reason,
			message,
			failureFacts,
			recoverySteps
		});
	};
	recordUpdateRunPhase(run.runId, "staging", {
		target: {
			channel,
			tag,
			kind: updateInstallKind,
			...targetVersion ? { version: targetVersion } : {}
		},
		before: { version: currentVersion ?? VERSION }
	}, { env: run.env });
	if (opts.channel && !configSnapshot.valid && !legacyConfigPlan && !run.candidateAdmissionChecks?.includes("config")) {
		const failure = createUpdateConfigFailure(configSnapshot);
		return await refuseUpdate(failure.reason, failure.message, failure.failureFacts);
	}
	const schemaPreflight = await preflightUpdateCommandSchemas({
		...target,
		shouldRestart,
		updateStepTimeoutMs,
		invocationCwd,
		packageTargetVersion: targetVersion ?? void 0,
		opts,
		refuseUpdate
	});
	if (!schemaPreflight) return;
	if (opts.dryRun) {
		finishUpdateRun(run.runId, {
			status: "skipped",
			reason: "dry-run"
		}, { env: run.env });
		return await previewUpdateCommand({
			target,
			prepared,
			opts,
			runId: run.runId,
			updateStepTimeoutMs,
			invocationCwd,
			preflight: schemaPreflight
		});
	}
	const currentCoreFinalization = {
		legacyConfigPlan,
		root,
		previousInstallRoot: discoveredRoot,
		requestedChannel,
		storedChannel,
		channel,
		shouldRestart,
		updateStepTimeoutMs,
		invocationCwd,
		startedAt,
		controlPlaneUpdateSentinelMeta,
		packageUpdateNodeRunner: packageUpdateNodeRunner ?? managedServiceNodeRunner,
		runtimeTarget: packageRuntimeTarget,
		managedServiceRootRedirect,
		managedServiceRoot,
		stop: presentation.stop,
		refuseUpdate
	};
	const pluginCount = Object.keys(configSnapshot.config.plugins?.entries ?? {}).length;
	const activateCurrentCore = async () => {
		run.executorFence = await executor.enter(root, {
			preflight: true,
			serviceRoot: managedServiceRoot,
			activationTimeoutMs: run.activationTimeoutMs ??= timeoutMs === void 0 ? void 0 : await resolveUpdateFinalizationTimeoutMs(updateStepTimeoutMs, {
				env: run.env,
				pluginCount
			})
		});
		run.executorFence.assertCurrent();
		assertUpdatePackageActivationAdmission(root, { serviceRoot: managedServiceRoot });
	};
	if (packageAlreadyCurrent) {
		await activateCurrentCore();
		const { finishAlreadyCurrentUpdate } = await import("./update-execution.runtime.js");
		return await finishAlreadyCurrentUpdate({
			...currentCoreFinalization,
			opts,
			result: {
				status: "skipped",
				mode: packageInstallTarget?.manager ?? "unknown",
				root,
				reason: "already-current",
				before: { version: currentVersion },
				after: { version: currentVersion },
				steps: [],
				durationMs: Date.now() - startedAt
			}
		});
	}
	if (downgradeRisk && !opts.yes && !initialization?.downgradeConfirmed && !await confirmUpdateDowngrade({
		opts,
		currentVersion,
		targetVersion,
		tag
	})) return;
	if (updateInstallKind === "git" && opts.tag && !opts.json) defaultRuntime.log(theme.muted("Note: --tag applies to npm installs only; git updates ignore it."));
	if (updateInstallKind === "package") {
		const runtimePreflight = await preparePackageUpdateRuntime({
			...target,
			managedService: schemaPreflight.service,
			shouldRestart,
			opts,
			executor,
			timeoutMs: updateStepTimeoutMs
		});
		if (!runtimePreflight.ok) return await refuseUpdate("node-runtime-preflight", runtimePreflight.error, runtimePreflight.failureFacts, runtimePreflight.recoverySteps);
		packageUpdateNodeRunner = runtimePreflight.value.nodeRunner;
		recoveryState.triageTarget.nodeRunner = packageUpdateNodeRunner;
	}
	const { executeMutableUpdate, finishUpdate, finishAlreadyCurrentUpdate, continueMigratedUpdateInFreshProcess, inspectActivatedUpdateState, restoreFailedUpdateDatabases, createUpdateCommandFinalizationFence } = await import("./update-execution.runtime.js");
	const progress = createUpdateRunProgress(run, presentation.progress);
	let preUpdatePluginInstallRecords = {};
	let mutableUpdatePrepared = false;
	const prepareMutableUpdate = async (env, activationTimeoutMs, admitExecutor, installTarget) => {
		if (!mutableUpdatePrepared) assertUpdatePackageActivationAdmission(root, { serviceRoot: managedServiceRoot });
		const fence = await executor.enter(root, {
			serviceRoot: managedServiceRoot,
			activationTimeoutMs
		});
		admitExecutor(fence);
		run.activationTimeoutMs ??= activationTimeoutMs;
		fence.assertCurrent();
		if (mutableUpdatePrepared) {
			if (managedServiceRoot) assertUpdatePackageActivationAdmission(managedServiceRoot);
			return;
		}
		const installKey = captureUpdateCommandExecutorAuthority(fence).installKey;
		assertUpdatePackageActivationAdmission(installKey, { serviceRoot: managedServiceRoot });
		preUpdatePluginInstallRecords = await prepareMutableUpdateRuntime(env, fence);
		const retentionStep = {
			name: "updater-runtime-retention",
			command: "retain running updater runtime",
			index: 0,
			total: 0
		};
		const retentionStartedAt = Date.now();
		progress.onStepStart?.(retentionStep);
		const retention = await retainRuntime({
			mutationRoots: [root, ...switchToGit ? [resolveGitInstallDir()] : []],
			installTarget,
			env,
			timeoutMs: updateStepTimeoutMs,
			assertCurrent: () => fence.assertCurrent()
		});
		progress.onStepComplete?.({
			...retentionStep,
			durationMs: Date.now() - retentionStartedAt,
			exitCode: 0,
			diagnostics: retention ? [JSON.stringify(retention)] : void 0
		});
		mutableUpdatePrepared = true;
	};
	const execution = await executeMutableUpdate({
		...target,
		installKind,
		timeoutMs,
		updateStepTimeoutMs,
		startedAt,
		progress,
		stop: presentation.stop,
		opts,
		shouldRestart,
		stagedPackage,
		packageTargetVersion: targetVersion ?? void 0,
		packageUpdateNodeRunner,
		managedServiceNodeRunner,
		managedServiceRootRedirect,
		managedServiceRoot,
		invocationCwd,
		recoveryState,
		prepareMutableUpdate,
		onActivation: () => {
			presentation.suspend();
			progress.deferLedgerWrites();
		}
	});
	run.executorFence?.assertCurrent();
	if (!execution) return;
	const { ownedManagedUpdateContext, recoveryEnv, ...executionState } = execution;
	const { result } = executionState;
	result.runId = run.runId;
	if (result.status === "skipped" && result.reason === "already-current") {
		await activateCurrentCore();
		presentation.stop();
		return await finishAlreadyCurrentUpdate({
			...currentCoreFinalization,
			root: result.root ?? root,
			opts,
			result,
			ownedManagedUpdateEnv: ownedManagedUpdateContext?.env,
			packageUpdateNodeRunner: packageUpdateNodeRunner ?? managedServiceNodeRunner
		});
	}
	recoveryState.triageTarget.root = result.root ?? root;
	recoveryState.triageTarget.failureResult = result;
	recoveryState.triageTarget.env = recoveryEnv ?? ownedManagedUpdateContext?.env ?? recoveryState.triageTarget.env;
	presentation.stop();
	const finalization = {
		...executionState,
		expectedVersion: targetVersion ?? void 0,
		root,
		previousInstallRoot: discoveredRoot,
		installKindChanged: switchToGit || switchToPackage,
		configSnapshot: ownedManagedUpdateContext?.configSnapshot ?? configSnapshot,
		requestedChannel,
		storedChannel,
		channel,
		downgradeRisk,
		shouldRestart,
		opts,
		ownedManagedUpdateEnv: ownedManagedUpdateContext?.env,
		controlPlaneUpdateSentinelMeta,
		preUpdatePluginInstallRecords: ownedManagedUpdateContext?.pluginInstallRecords ?? preUpdatePluginInstallRecords,
		startedAt,
		packageUpdateNodeRunner,
		updateStepTimeoutMs,
		invocationCwd
	};
	const rollbackBlockedReason = opts.recovery ? void 0 : await inspectActivatedUpdateState({
		result,
		root,
		packageUpdateNodeRunner,
		schemaVersions: execution.schemaVersions,
		candidateSchemaVersions: execution.candidateSchemaVersions,
		config: finalization.configSnapshot.config,
		env: ownedManagedUpdateContext?.env ?? run.env,
		timeoutMs: updateStepTimeoutMs
	});
	run.executorFence?.assertCurrent();
	if (opts.recovery || rollbackBlockedReason) {
		recoveryState.ledgerHandoffOwned = true;
		const assertRollbackCurrent = createUpdateCommandFinalizationFence(finalization);
		const continued = await continueMigratedUpdateInFreshProcess({
			...finalization,
			rollbackBlockedReason
		}, progress.pendingSteps);
		if (continued.databaseRollbackAvailable && finalization.databaseBackup) {
			if (!await restoreFailedUpdateDatabases({
				backup: finalization.databaseBackup,
				result: continued.result,
				runId: run.runId,
				env: ownedManagedUpdateContext?.env ?? run.env,
				assertCurrent: assertRollbackCurrent,
				progress
			})) throw new UpdateCommandPendingRecoveryFailure(continued.result, continued.result.steps.at(-1)?.stderrTail ?? void 0);
			progress.flushLedgerWrites();
			recoveryState.ledgerHandoffOwned = false;
			presentation.resume();
			await finishUpdate({
				...finalization,
				result: continued.result
			});
			return;
		}
		recoveryState.ledgerHandoffCompleted = true;
		opts.onResult?.(continued.result);
		if (continued.exitCode !== 0) throw new UpdateCommandFailure(continued.result, continued.exitCode, void 0, { automaticTriage: continued.automaticTriage });
		return;
	}
	progress.flushLedgerWrites();
	presentation.resume();
	await finishUpdate(finalization);
}
//#endregion
export { updateCommand };
