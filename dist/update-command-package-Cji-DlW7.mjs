import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { m as resolveConfigPath } from "./paths-CtO6iw0c.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { r as hasCommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { i as runCommandWithTimeout } from "./exec-Bjx7k3vE.mjs";
import { n as readPackageName, r as readPackageVersion } from "./package-json-7gGhB8Vf.mjs";
import { A as resolveGlobalInstallTarget, P as verifyPackageUpdateRecovery, S as createGlobalInstallEnv, g as normalizeFallbackFailureReason, k as resolveGlobalInstallSpec } from "./update-check-CJv8Mjkn.mjs";
import { n as readBuiltGatewayBuildId } from "./update-git-runtime-CXZMwux0.mjs";
import { i as hashConfigRaw } from "./io.read-helpers-CgQwh9G4.mjs";
import { n as createUpdateFailureFact, r as normalizeUpdateFailureFacts } from "./update-failure-facts-RzGaiYBm.mjs";
import { i as getUpdateDoctorConfigFailureReason, r as formatUpdateDoctorConfigWriteRefusal } from "./update-doctor-config-BrLAVDg0.mjs";
import { f as createUpdatePostInstallDoctorResultPath, i as UPDATE_POST_INSTALL_DOCTOR_RESULT_PATH_ENV, l as consumeUpdatePostInstallDoctorResult } from "./update-doctor-result-BlDxecnI.mjs";
import { t as resolveNodeRunner } from "./node-runner-DIokVayT.mjs";
import { n as resolveInstallWorkTimeoutMs } from "./install-mode-options-HTpLEgtT.mjs";
import { a as resolveGatewayInstallEntrypoint } from "./gateway-entrypoint-DTaXABcS.mjs";
import { d as resolveGlobalManager, m as runUpdateStep, n as UpdatePreMutationError } from "./shared-Dwr7djBO.mjs";
import { a as resolveUpdateTargetEnv } from "./update-command-service-env-QsECikj0.mjs";
import "./progress-Dl6WMBUB.mjs";
import { n as resolveUpdateDoctorExecutionPolicy, t as buildUpdateDoctorEnv } from "./update-runner-doctor-BZuLOfvv.mjs";
import { n as createUpdateConfigSnapshot, r as readUpdateConfigSnapshot, t as captureUpdateConfigSnapshot } from "./update-command-config-snapshot-DAFe1zyY.mjs";
import { i as recordUpdateDatabaseWrites, r as withUpdateDoctorChild } from "./update-command-doctor-child-BGlkyCXI.mjs";
import { a as PackageUpdateActivationError, i as markPackagePostInstallDoctorAdvisory, r as failedPackageVerificationStep, t as runGlobalPackageUpdateSteps } from "./package-update-steps-DUyCf_no.mjs";
import { t as CLI_NAME } from "./cli-name-Dp_huZBR.mjs";
import path from "node:path";
//#region src/cli/update-cli/update-command-package.ts
async function readPackageUpdateIdentity(root) {
	const [version, buildId] = await Promise.all([readPackageVersion(root), readBuiltGatewayBuildId(root)]);
	return {
		version,
		...buildId ? { buildId } : {}
	};
}
function preparePackageDoctorContext(params) {
	params.assertCurrent();
	if (!params.capable) return;
	if (!params.runId || !params.executorFence || params.inputHash === void 0) throw new Error("Validated Doctor requires its live update executor and captured config hash.");
	return {
		runId: params.runId,
		executorFence: params.executorFence,
		requester: params.requester,
		inputHash: params.inputHash ?? hashConfigRaw(null),
		changes: params.changes,
		databaseBackup: params.databaseBackup,
		assertCurrent: params.assertCurrent,
		assertBoundChildCurrent: params.assertBoundChildCurrent,
		onStateHandoff: params.onStateHandoff
	};
}
async function runPackageUpdateDoctor(params) {
	const context = params.getDoctorContext?.();
	context?.assertCurrent();
	const entryPath = await resolveGatewayInstallEntrypoint(params.root);
	if (!entryPath) return null;
	const doctorEnv = resolveUpdateTargetEnv({
		serviceEnv: params.managedServiceEnv,
		invocationCwd: params.invocationCwd
	});
	await createUpdateConfigSnapshot(doctorEnv);
	const candidateHostVersion = await readPackageVersion(params.root);
	const doctorResultPath = createUpdatePostInstallDoctorResultPath();
	const doctorPolicy = resolveUpdateDoctorExecutionPolicy({
		targetVersion: candidateHostVersion,
		allowGatewayServiceRepair: false
	});
	const doctorArgv = [params.nodeRunner ?? resolveNodeRunner(), ...context ? [path.join(params.root, "dist", runtimeProcessEntrypoints.updateMigratedFinalize.distWorkerPath), "--doctor"] : [
		entryPath,
		"doctor",
		"--non-interactive",
		...doctorPolicy.fix ? ["--fix"] : []
	]];
	const doctorProgressInfo = {
		name: `${CLI_NAME} doctor`,
		command: doctorArgv.join(" "),
		index: 0,
		total: 0
	};
	params.progress?.onStepStart?.(doctorProgressInfo);
	const configSnapshot = params.onConfigSnapshot ? await captureUpdateConfigSnapshot(resolveConfigPath(doctorEnv), doctorEnv) : void 0;
	const completeDoctorStep = async (doctorStep, doctorResult, failure) => {
		let completionFailure = failure;
		if (context?.databaseBackup) {
			const receipt = recordUpdateDatabaseWrites(context.databaseBackup, doctorResult?.databaseWrites, doctorStep);
			if (receipt) params.progress?.onStepComplete?.({
				...receipt,
				index: 0,
				total: 0
			});
		}
		try {
			const refusal = doctorResult?.configWriteRefusal;
			const configWriteRefusal = refusal ? {
				...refusal,
				keys: [.../* @__PURE__ */ new Set([...refusal.keys, ...context?.changes.flatMap((change) => change.kind === "key" ? [change.key] : []) ?? []])].toSorted()
			} : void 0;
			Object.assign(doctorStep, markPackagePostInstallDoctorAdvisory({
				...doctorStep,
				...doctorResult?.configChanges?.length ? { configChanges: doctorResult.configChanges } : {},
				...doctorResult?.warnings?.length ? { warnings: doctorResult.warnings } : {},
				...configWriteRefusal ? {
					configWriteRefusal,
					stderrTail: formatUpdateDoctorConfigWriteRefusal(configWriteRefusal)
				} : {}
			}, doctorResult));
			if (configSnapshot?.doctorOwned === false) doctorStep.warnings = [...doctorStep.warnings ?? [], "The config include graph could not be captured before Doctor; automatic config rollback is unavailable for this update."];
			if (configWriteRefusal) {
				doctorStep.failureFacts = normalizeUpdateFailureFacts([createUpdateFailureFact({
					check: "config",
					code: configWriteRefusal.reason,
					message: formatUpdateDoctorConfigWriteRefusal(configWriteRefusal)
				}), ...doctorStep.failureFacts ?? []]);
				delete doctorStep.advisory;
			}
			if (configSnapshot) {
				const { hash } = await readUpdateConfigSnapshot(configSnapshot.path);
				const doctorHash = doctorResult?.configHash;
				const doctorInputHash = doctorResult?.configInputHash;
				const capturedPaths = /* @__PURE__ */ new Set([configSnapshot.pathSnapshot?.targetPath ?? configSnapshot.path, ...(configSnapshot.includedFiles ?? []).map((file) => file.pathSnapshot?.targetPath ?? file.path)]);
				const writesCaptured = Object.keys(doctorResult?.configFileWrites ?? {}).every((file) => capturedPaths.has(file));
				const includedFiles = [];
				for (const file of configSnapshot.includedFiles ?? []) {
					const current = await readUpdateConfigSnapshot(file.path);
					const receipt = doctorResult?.configFileWrites?.[file.pathSnapshot?.targetPath ?? file.path];
					includedFiles.push({
						...file,
						hash: current.hash,
						doctorOwned: receipt?.inputHash === void 0 ? current.hash === file.hash : receipt.inputHash === file.hash && current.hash === receipt.hash
					});
				}
				params.onConfigSnapshot?.({
					...configSnapshot,
					hash,
					...configSnapshot.includedFiles ? { includedFiles } : {},
					doctorOwned: configSnapshot.doctorOwned !== false && writesCaptured && (doctorInputHash === void 0 ? hash === configSnapshot.hash : doctorInputHash === configSnapshot.hash && hash === (doctorHash === "unchanged" ? doctorInputHash : doctorHash))
				});
			}
		} catch (error) {
			completionFailure = { error: completionFailure ? new AggregateError([completionFailure.error, error], "Doctor config attribution failed", { cause: error }) : error };
		}
		if (completionFailure) {
			Object.assign(doctorStep, failedPackageVerificationStep(params.root, completionFailure.error, doctorStep));
			delete doctorStep.advisory;
		}
		try {
			params.progress?.onStepComplete?.({
				...doctorProgressInfo,
				durationMs: doctorStep.durationMs,
				exitCode: doctorStep.exitCode,
				stdoutTail: doctorStep.stdoutTail,
				stderrTail: doctorStep.stderrTail,
				signal: doctorStep.signal,
				killed: doctorStep.killed,
				outputLimitExceeded: doctorStep.outputLimitExceeded,
				termination: doctorStep.termination,
				advisory: doctorStep.advisory,
				warnings: doctorStep.warnings,
				diagnostics: doctorStep.diagnostics,
				failureFacts: doctorStep.failureFacts,
				doctorLintFindings: doctorStep.doctorLintFindings,
				configChanges: doctorStep.configChanges,
				configWriteRefusal: doctorStep.configWriteRefusal
			});
		} catch (error) {
			if (completionFailure) throw new AggregateError([completionFailure.error, error], "Doctor progress reporting failed", { cause: error });
			throw error;
		}
		if (completionFailure) throw completionFailure.error;
		return doctorStep;
	};
	const completedSteps = [];
	const runDoctor = (runCommand) => runUpdateStep({
		name: `${CLI_NAME} doctor`,
		results: completedSteps,
		argv: doctorArgv,
		cwd: params.root,
		env: {
			...doctorEnv,
			...buildUpdateDoctorEnv({
				allowGatewayServiceRepair: false,
				allowGatewayActivation: false,
				deferConfiguredPluginInstallRepair: true,
				serviceRepairPolicy: doctorPolicy.serviceRepairPolicy,
				compatibilityHostVersion: candidateHostVersion
			}),
			[UPDATE_POST_INSTALL_DOCTOR_RESULT_PATH_ENV]: doctorResultPath
		},
		timeoutMs: resolveInstallWorkTimeoutMs(params.workTimeoutMs, params.timeoutMs),
		...runCommand ? { runCommand } : {}
	});
	let outcome;
	try {
		outcome = { step: context ? await withUpdateDoctorChild({
			root: params.root,
			context: {
				...context,
				assertRequesterCurrent: context.assertBoundChildCurrent
			},
			input: {
				configInputHash: context.inputHash,
				repair: doctorPolicy.fix,
				databaseGenerations: context.databaseBackup?.sourceGenerations
			}
		}, runDoctor) : await runDoctor() };
		context?.assertCurrent();
	} catch (error) {
		outcome = { error };
	}
	try {
		if ("error" in outcome && hasCommandProcessCleanupError(outcome.error)) throw outcome.error;
		const doctorResult = await consumeUpdatePostInstallDoctorResult(doctorResultPath);
		if ("error" in outcome) {
			const recorded = completedSteps.at(-1);
			if (!recorded) throw outcome.error;
			return await completeDoctorStep(recorded, doctorResult, outcome);
		}
		return await completeDoctorStep(outcome.step, doctorResult);
	} finally {
		params.results?.push(...completedSteps);
	}
}
/** Keep package staging open until its source owner publishes the validated checkout. */
async function prepareGitPackageExposure(params) {
	const prepared = createDeferredCore();
	const activation = createDeferredCore();
	const cancellation = /* @__PURE__ */ new Error("Source activation cancelled before global exposure");
	const completed = runGlobalPackageUpdateSteps({
		...params,
		beforeActivate: async () => {
			prepared.resolve();
			if (!await activation.promise) throw cancellation;
		}
	});
	const outcome = await Promise.race([prepared.promise.then(() => null), completed]);
	if (outcome) {
		const failure = outcome.failedStep;
		throw new UpdatePreMutationError(outcome.reason ?? (failure ? normalizeFallbackFailureReason(failure.name) : "source-exposure-preparation-failed"), failure?.stderrTail ?? "Global source exposure did not reach the activation gate", {
			failureFacts: failure?.failureFacts,
			stepResult: {
				steps: outcome.steps,
				failedStep: failure ?? void 0
			}
		});
	}
	return {
		activate: () => {
			activation.resolve(true);
			return completed;
		},
		cancel: async () => {
			activation.resolve(false);
			try {
				return await completed;
			} catch (error) {
				if (error !== cancellation) throw error;
				return {
					steps: [],
					recovery: await verifyPackageUpdateRecovery(params.installTarget.packageRoot)
				};
			}
		}
	};
}
/** Retain one staged target while its runtime initializes a fresh profile. */
async function stagePackageInstallUpdate(params) {
	const staged = createDeferredCore();
	const continuation = createDeferredCore();
	let continued = false;
	let active;
	const requireActive = () => {
		if (!active) throw new Error("Staged update has not been admitted for activation.");
		return active;
	};
	const retainCandidate = async (root) => {
		staged.resolve(root);
		active = await continuation.promise;
		if (!active) throw new Error("Staged update stopped before package activation.");
	};
	const completed = runPackageInstallUpdate({
		...params,
		get requirePackageReplacement() {
			return !params.pauseBeforeVerification || requireActive().requirePackageReplacement;
		},
		beforeVerifyCandidate: params.pauseBeforeVerification || params.beforeVerifyCandidate ? async (root) => {
			try {
				await params.beforeVerifyCandidate?.(root);
			} catch (error) {
				throw new PackageUpdateActivationError(error);
			}
			if (params.pauseBeforeVerification) await retainCandidate(root);
		} : void 0,
		resolveLifecycleNodeRunner: () => active?.nodeRunner ?? params.resolveLifecycleNodeRunner?.() ?? params.nodeRunner,
		progress: {
			onStepStart: (step) => (active?.progress ?? params.progress)?.onStepStart?.(step),
			onStepComplete: (step) => (active?.progress ?? params.progress)?.onStepComplete?.(step),
			onHeartbeat: () => (active?.progress ?? params.progress)?.onHeartbeat?.()
		},
		validateCandidate: async (root) => {
			if (!params.pauseBeforeVerification) await retainCandidate(root);
			return await requireActive().validateCandidate(root);
		},
		beforeActivate: () => requireActive().beforeActivate(),
		assertCurrent: () => requireActive().assertCurrent?.(),
		reserveInstallSlot: (root) => requireActive().reserveInstallSlot?.(root),
		getActivation: () => requireActive().getActivation?.(),
		onTransaction: (transaction) => requireActive().onTransaction(transaction),
		onConfigSnapshot: (snapshot) => requireActive().onConfigSnapshot?.(snapshot)
	}, () => requireActive());
	const ready = await Promise.race([staged.promise.then((root) => ({ root })), completed.then((result) => ({ result }))]);
	if ("result" in ready) throw new UpdatePreMutationError(ready.result.reason ?? "package-staging-failed", ready.result.failedStep?.stderrTail ?? "Package staging did not produce a target runtime.", {
		failureFacts: ready.result.failedStep?.failureFacts,
		stepResult: ready.result
	});
	return {
		root: ready.root,
		async run(next) {
			if (continued) throw new Error("A staged update can be activated only once.");
			continued = true;
			continuation.resolve(next);
			return await completed;
		},
		async close() {
			if (!continued) {
				continued = true;
				continuation.resolve(void 0);
			}
			await completed;
		}
	};
}
async function runPackageInstallUpdate(params, resolveDoctorOptions = () => params) {
	const installEnv = params.installEnv ?? await createGlobalInstallEnv();
	let installTarget = params.installTarget;
	if (!installTarget) {
		const manager = await resolveGlobalManager({
			root: params.root,
			installKind: params.installKind,
			timeoutMs: params.timeoutMs
		});
		installTarget = await resolveGlobalInstallTarget({
			manager,
			runCommand: runCommandWithTimeout,
			timeoutMs: params.timeoutMs,
			pkgRoot: params.root,
			honorPackageRoot: params.honorPackageRoot === true
		});
	}
	const pkgRoot = installTarget.packageRoot;
	const packageName = await readPackageName(pkgRoot || params.root) ?? "openclaw";
	const installSpec = params.installSpec ?? resolveGlobalInstallSpec({
		packageName,
		tag: params.tag,
		env: installEnv
	});
	const before = pkgRoot ? await readPackageUpdateIdentity(pkgRoot) : { version: null };
	const packageUpdate = await runGlobalPackageUpdateSteps({
		localOverrides: {
			reapply: params.reapplyLocalOverrides === true,
			env: resolveUpdateTargetEnv({
				serviceEnv: params.managedServiceEnv,
				invocationCwd: params.invocationCwd
			})
		},
		validateCandidate: params.validateCandidate,
		beforeVerifyCandidate: params.beforeVerifyCandidate,
		resolveLifecycleNodeRunner: params.resolveLifecycleNodeRunner ?? (() => params.nodeRunner),
		beforeActivate: params.beforeActivate,
		assertCurrent: params.assertCurrent,
		reserveInstallSlot: params.reserveInstallSlot,
		onTransaction: params.onTransaction,
		getActivation: params.getActivation,
		installTarget,
		installSpec,
		packageName,
		packageRoot: pkgRoot,
		get requirePackageReplacement() {
			return params.requirePackageReplacement === true || params.installKind === "git";
		},
		runCommand: runCommandWithTimeout,
		timeoutMs: params.timeoutMs,
		workTimeoutMs: params.workTimeoutMs,
		...installEnv === void 0 ? {} : { env: installEnv },
		runStep: (stepParams) => runUpdateStep({
			...stepParams,
			progress: params.progress
		}),
		postVerifyStep: (root, results) => runPackageUpdateDoctor({
			...resolveDoctorOptions(),
			root,
			results
		})
	});
	const afterBuildId = packageUpdate.activePackageRoot ? await readBuiltGatewayBuildId(packageUpdate.activePackageRoot) : null;
	return {
		status: packageUpdate.reason === "already-current" ? "skipped" : packageUpdate.failedStep ? "error" : "ok",
		mode: installTarget.manager,
		root: packageUpdate.activePackageRoot ?? void 0,
		reason: getUpdateDoctorConfigFailureReason(packageUpdate.failedStep?.configWriteRefusal) ?? packageUpdate.reason ?? (packageUpdate.failedStep ? normalizeFallbackFailureReason(packageUpdate.failedStep.name) : void 0),
		before,
		after: {
			version: packageUpdate.afterVersion,
			...afterBuildId ? { buildId: afterBuildId } : {}
		},
		steps: packageUpdate.steps,
		failedStep: packageUpdate.failedStep ?? void 0,
		recovery: packageUpdate.recovery,
		localOverrides: packageUpdate.localOverrides,
		durationMs: Date.now() - params.startedAt
	};
}
//#endregion
export { runPackageUpdateDoctor as a, runPackageInstallUpdate as i, preparePackageDoctorContext as n, stagePackageInstallUpdate as o, readPackageUpdateIdentity as r, prepareGitPackageExposure as t };
