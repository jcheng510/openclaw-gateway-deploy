import { r as collectNestedErrorCandidates } from "./error-coercion-1P2One0X.mjs";
import { r as resolveOpenClawPackageRootSync } from "./openclaw-root-3-SBP6RS.mjs";
import { d as resolveGatewayNativeServiceIdentityConflict } from "./constants-CQ41zfz1.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { c as waitForSignalExitBarriers, i as registerSignalExitBarrier } from "./signal-exit-barrier-BNMo76Rm.mjs";
import { t as exitCliAfterOutput } from "./one-shot-exit-BzmTIPQe.mjs";
import { n as resolvePathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { m as resolveConfigPath } from "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { s as formatUnsupportedNodeVersionMessage } from "./node-version-DdJ6cN09.mjs";
import { i as nodeRuntimeFailure, n as detectCurrentSqliteCapabilities } from "./node-sqlite-DWn4GVXM.mjs";
import { a as readDatabasePathIdentitySync, t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { t as VERSION } from "./version-BMuSsYfE.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { n as POST_CORE_UPDATE_ENV, t as POST_CORE_UPDATE_CHANNEL_ENV } from "./update-post-core-context-B2x24New.mjs";
import { n as readUpdateRunDriver } from "./update-run-driver-CSLAE9i6.mjs";
import { n as AUTO_UPDATE_STEP_TIMEOUT_MS } from "./update-run-timeouts-Byb-PlTk.mjs";
import { r as hasCommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { a as formatExternalSupervisorUpdateRequired, o as isGatewayExternallySupervised } from "./gateway-supervision-fKhmwUVZ.mjs";
import { r as readPackageVersion } from "./package-json-7gGhB8Vf.mjs";
import { c as normalizeUpdateChannel } from "./update-channels-YuXTW0De.mjs";
import { I as createFreeBsdPkgOwnershipInspection, P as verifyPackageUpdateRecovery, c as resolveUpdateInstallKind } from "./update-check-CJv8Mjkn.mjs";
import { t as resolveUpdateInstallRoot } from "./update-install-root-DH-onosx.mjs";
import { f as openClawStateDatabaseCache } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { r as assertOpenClawStateWriteAllowedAtPath } from "./openclaw-state-ownership-1l-TMJat.mjs";
import { r as normalizeUpdateFailureFacts, t as createUpdateErrorFact } from "./update-failure-facts-RzGaiYBm.mjs";
import { i as updateRunStepsFromResultStep, r as isUpdateGatewayReadinessPending } from "./update-run-step-BfCzkPVr.mjs";
import { r as loadInstalledPluginIndexInstallRecords } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import { i as cleanupStaleManagedServiceUpdateHandoffs } from "./update-managed-service-handoff-lease-1Q-bxDqA.mjs";
import { r as assertConfigWriteAllowedInCurrentMode } from "./config-write-guard-DgZDKy-v.mjs";
import "./config-D1R2igem.mjs";
import { t as runExistingOpenClawStateWriteTransaction } from "./openclaw-state-db-existing-write-Bs94uHSu.mjs";
import { _ as readRecoveries, a as finishInterruptedUpdatePreview, f as recordUpdateRunStep, g as inspectUpdateRecoveries, i as finishInterruptedUpdateBeforeActivation, l as recordUpdateRunPhase, n as adoptUpdateRun, o as heartbeatUpdateRun, p as recordUpdateRunVerification, r as createUpdateRun, v as UpdateRecoveryRequiredError } from "./update-run-ledger-C5c7VrBu.mjs";
import { a as recordUpdateRunDiagnostics, l as isUpdateRunVerificationConfirmed, o as updateRunLedgerSchema, t as finishUpdateRun } from "./update-run-write-rWyADCOZ.mjs";
import { o as readUpdateRunRecord } from "./update-run-read.kernel-l3RrZ-g3.mjs";
import { i as getUpdateRun } from "./update-run-reader-DZIHUks3.mjs";
import { a as resolveManagedUpdateRequester, n as createManagedUpdateRequesterAuthority, t as UpdateRequesterRevokedError } from "./update-requester-authority-jkN9ySi6.mjs";
import "./installed-plugin-index-records-DHEAmSsp.mjs";
import { f as UpdateActivationTimeoutError, p as UpdateCommandRecoveryPendingError } from "./update-command-executor-B6yk9cYV.mjs";
import { c as readControlPlaneUpdateSentinelMeta, f as normalizeControlPlaneUpdateResult, l as resolveManagedServiceUpdateFailureExitCode } from "./update-control-plane-sentinel-CB0F6AWU.mjs";
import { t as assertNoPendingPackageActivation } from "./package-update-activation-DaNpk9zG.mjs";
import { c as parseUpdateTimeoutMs, g as usesCandidateUpdateAdmission, p as resolveUpdateRoot } from "./shared-Dwr7djBO.mjs";
import { p as resolveManagedGatewayServiceCommand } from "./service-layout-BP96VEeH.mjs";
import { t as mergeGatewayServiceEnv } from "./service-env-merge-Cv0BZcEs.mjs";
import { t as disableCurrentOpenClawUpdateLaunchdJob } from "./launchd-BWtFkHdf.mjs";
import { c as withOwnedManagedUpdateEnv, i as resolveServiceRefreshEnv, n as resolveOwnedManagedUpdateEnv } from "./update-command-service-env-QsECikj0.mjs";
import { i as parseDevUpdateTargetEnv, t as UPDATE_DEV_TARGET_REF_ENV } from "./update-dev-target-D6qkuS7l.mjs";
import { t as readCurrentGitUpdateRecovery } from "./update-runner-git-recovery-DIk_H2Ti.mjs";
import { n as printResult } from "./progress-Dl6WMBUB.mjs";
import { d as resolveForegroundUpdateAdmission } from "./update-command-service-maintenance-DYkRssIw.mjs";
import { f as resolveManagedServicePackageUpdatePlan, i as assertGatewayServiceManagementAllowedForUpdate, n as GatewayServiceUpdateOwnershipError, s as isGatewayServiceManagementAllowedForUpdate, u as readManagedGatewayServiceForUpdate } from "./update-command-service-plan-CyZKQiYX.mjs";
import { n as assertUpdateRecoveryDirectoryAdmission, r as loadUpdateRecovery, t as assertUpdateRecoveryAdmission } from "./update-run-recovery-admission-D2B4sqip.mjs";
import { i as UpdateCommandPendingRecoveryFailure, m as recordUpdateResultNextAction, n as UpdateCommandFailure, o as createUpdateCommandFailureResult, r as UpdateCommandFinalizedRecoveryFailure, s as failUpdateCommandRun, t as UnreportedUpdateAdmissionOutcome, y as writeControlPlaneUpdateRestartSentinelBestEffort } from "./update-command-result-BUs0awIs.mjs";
import { o as revalidateUpdateDatabaseContext } from "./update-command-managed-context-BYvoN6HJ.mjs";
import fs from "node:fs";
import { isDeepStrictEqual } from "node:util";
//#region src/cli/update-cli/update-command-authority.ts
/** Bind requester and executor identity across discovery and delegated child admission. */
function createUpdateCommandAuthority(params, label = "Update") {
	const run = params.opts?.run;
	const runExecutorFence = run?.executorFence;
	const executorFence = runExecutorFence ?? params.executorFence;
	const runId = run?.runId;
	const requester = run?.requesterAuthority;
	let authorityFailure;
	const refuseAuthority = (error) => {
		authorityFailure ??= { error };
		params.onAuthorityRefused?.();
		throw authorityFailure.error;
	};
	const checkAuthority = (check) => {
		if (authorityFailure) throw authorityFailure.error;
		try {
			check();
		} catch (error) {
			refuseAuthority(error);
		}
	};
	const assertRequesterCurrent = () => checkAuthority(() => {
		if (params.opts?.run !== run || run?.executorFence !== runExecutorFence || run?.runId !== runId || run?.requesterAuthority !== requester || run && (!runExecutorFence || !runId?.trim())) throw new UpdateCommandRecoveryPendingError(`${label} lost its original update executor.`);
		if (requester?.isCurrent() === false) throw new UpdateRequesterRevokedError();
	});
	const assertCurrent = () => checkAuthority(() => {
		assertRequesterCurrent();
		params.assertCurrent?.();
		executorFence?.assertCurrent();
	});
	return {
		run,
		executorFence,
		runId,
		requester,
		assertCurrent,
		assertRequesterCurrent,
		refuseAuthority
	};
}
//#endregion
//#region src/cli/update-cli/suppress-deprecations.ts
function suppressDeprecations() {
	try {
		process.noDeprecation = true;
	} catch {}
	process.env.NODE_NO_WARNINGS = "1";
}
//#endregion
//#region src/cli/update-cli/update-command-mutable-signals.ts
const admissions = /* @__PURE__ */ new WeakMap();
function admitMutableUpdateSignalRun(run, record) {
	const env = { ...run.env };
	const file = fs.lstatSync(resolveOpenClawStateSqlitePath(env));
	if (!file.isFile()) throw new Error("Update admission requires its regular state database.");
	admissions.set(run, {
		record,
		env,
		dev: file.dev,
		ino: file.ino
	});
}
function retireMutableUpdateSignalRun(run) {
	admissions.delete(run);
}
async function withMutableUpdateSignals(opts, operation) {
	const run = opts.run;
	const admission = !opts.dryRun && run ? admissions.get(run) : void 0;
	if (!run || !admission || admission.active) return await operation();
	admission.active = true;
	const { env } = admission;
	const pathname = resolveOpenClawStateSqlitePath(env);
	const assertCurrent = () => {
		if (!run.executorFence) throw new Error("Interrupted update has no live installation owner.");
		run.executorFence.assertCurrent();
		const file = fs.lstatSync(pathname);
		if (!file.isFile() || file.dev !== admission.dev || file.ino !== admission.ino) throw new Error("Interrupted update's canonical state generation changed.");
	};
	const settle = () => {
		if (admissions.get(run) !== admission || process.env.OPENCLAW_UPDATE_RUN_HANDOFF === "1" || process.env.OPENCLAW_UPDATE_POST_CORE === "1" || !run.executorFence) return;
		assertCurrent();
		const expected = getUpdateRun(run.runId, { env });
		if (!expected || expected.status !== "running" || ![
			"requested",
			"staging",
			"validating"
		].includes(expected.phase) || expected.createdAtMs !== admission.record.createdAtMs) return;
		assertCurrent();
		finishInterruptedUpdateBeforeActivation(expected, assertCurrent, { env });
	};
	let shutdown;
	const onSignal = (code) => {
		if (shutdown) return;
		try {
			settle();
		} catch {
			defaultRuntime.error("Update interruption could not be recorded; history remains pending.");
		}
		shutdown = waitForSignalExitBarriers().catch(() => {
			defaultRuntime.error("Update signal cleanup did not complete.");
		}).finally(() => process.exit(code));
	};
	const onSigint = () => onSignal(130);
	const onSigterm = () => onSignal(143);
	process.on("SIGINT", onSigint);
	process.on("SIGTERM", onSigterm);
	try {
		return await operation();
	} finally {
		retireMutableUpdateSignalRun(run);
		await shutdown;
		process.off("SIGINT", onSigint);
		process.off("SIGTERM", onSigterm);
	}
}
//#endregion
//#region src/cli/update-cli/update-command-run.ts
const previewAdmissions = /* @__PURE__ */ new WeakMap();
/** Advance preview custody only across this owner's committed target writes. */
function recordUpdateCommandTarget(run, patch) {
	if (!run) return;
	let before;
	const committed = recordUpdateRunPhase(run.runId, "requested", patch, { env: run.env }, (record) => {
		before = record;
	});
	const admission = previewAdmissions.get(run);
	if (admission && isDeepStrictEqual(before, admission.record)) admission.record = committed;
}
/** Admission follows the managed service root before a redirect or discovered install. */
function resolveUpdateCommandAdmissionRoot(prepared) {
	return prepared.servicePlan?.serviceRoot ?? prepared.servicePlan?.rootRedirect?.root ?? prepared.discoveredRoot;
}
async function resolveUpdateCommandAdmissionEnv(params) {
	await (params.pkgOwnership ?? createFreeBsdPkgOwnershipInspection(12e5)).assertUnowned(params.root);
	let env = resolveServiceRefreshEnv(process.env, params.invocationCwd);
	if (await resolveForegroundUpdateAdmission({
		root: params.root,
		env,
		expectedForeground: params.expectedForeground || params.opts.run?.completionOwner === "gateway-restart" || void 0
	})) return env;
	if (!params.opts.dryRun && !env["OPENCLAW_UPDATE_RUN_ID"] && isGatewayServiceManagementAllowedForUpdate(env)) {
		const inspected = await readManagedGatewayServiceForUpdate(env, params.root, await resolveUpdateInstallKind(params.root) === "package");
		if (inspected) {
			env = resolveOwnedManagedUpdateEnv({
				processEnv: env,
				serviceEnv: mergeGatewayServiceEnv(env, inspected.command),
				serviceDefinitionEnv: resolveManagedGatewayServiceCommand(inspected.command)?.environment,
				invocationCwd: params.invocationCwd
			});
			if (resolveGatewayNativeServiceIdentityConflict(env)) assertGatewayServiceManagementAllowedForUpdate(env);
		}
	}
	return env;
}
/** Package admission must not open history or launch diagnostics on a retained operation. */
function assertUpdatePackageActivationAdmission(root, options) {
	try {
		assertNoPendingPackageActivation(resolveUpdateInstallRoot(root), options);
	} catch (cause) {
		throw new UpdateCommandPendingRecoveryFailure({
			status: "error",
			mode: "unknown",
			root,
			reason: "update-recovery-pending",
			steps: [],
			durationMs: 0
		}, formatErrorMessage(cause), { cause });
	}
	if (options?.serviceRoot && options.serviceRoot !== root) assertUpdatePackageActivationAdmission(options.serviceRoot, { continuation: options.continuation });
}
async function admitUpdateCommandRun(params) {
	assertUpdatePackageActivationAdmission(params.root, { serviceRoot: params.serviceRoot });
	const env = await resolveUpdateCommandAdmissionEnv(params);
	await assertUpdateRecoveryAdmission({ env });
	assertUpdatePackageActivationAdmission(params.root, { serviceRoot: params.serviceRoot });
	await assertOpenClawStateWriteAllowedAtPath({
		databasePath: resolveOpenClawStateSqlitePath(env),
		env,
		recoverOrphanedSidecars: false
	});
	if (params.initialization) {
		const initialized = params.initialization;
		if (resolvePathViaExistingAncestorSync(resolveOpenClawStateSqlitePath(env)) !== initialized.databasePath || resolvePathViaExistingAncestorSync(resolveConfigPath(env)) !== initialized.configPath) throw new GatewayServiceUpdateOwnershipError("Gateway state or configuration selectors changed during target initialization. Retry from the installation's current owning account.", void 0, void 0, "service-context-changed");
		await revalidateUpdateDatabaseContext({
			env,
			readEnv: env,
			config: initialized.target.configSnapshot.sourceConfig,
			configSnapshot: initialized.target.configSnapshot,
			...initialized.target.updateInstallKind === "package" && usesCandidateUpdateAdmission(params.opts, params.installKind ?? "unknown") ? { configValidation: "candidate" } : {},
			...initialized.target.legacyConfigPlan ? { legacyConfigPlan: initialized.target.legacyConfigPlan } : {}
		});
	}
	const meta = await readControlPlaneUpdateSentinelMeta(env);
	await resolveForegroundUpdateAdmission({
		root: params.root,
		env,
		meta,
		expectedForeground: params.expectedForeground || params.opts.run?.completionOwner === "gateway-restart" || void 0
	});
	assertUpdatePackageActivationAdmission(params.root, { serviceRoot: params.serviceRoot });
	const driver = readUpdateRunDriver();
	const ledgerOptions = {
		env,
		busyTimeoutMs: parseUpdateTimeoutMs(params.opts.timeout) ?? 18e5
	};
	const created = createUpdateRun({
		runId: env["OPENCLAW_UPDATE_RUN_ID"]?.trim() || params.initialization?.runId,
		trigger: "cli",
		preview: params.opts.dryRun === true,
		origin: {
			driver,
			admission: { owner: "installed" }
		},
		supersedeStaleIdentityless: !env["OPENCLAW_UPDATE_RUN_ID"]?.trim() && env["OPENCLAW_UPDATE_POST_CORE"] !== "1",
		target: {
			channel: params.opts.channel,
			tag: params.opts.tag,
			...params.installKind && params.installKind !== "unknown" ? { kind: params.installKind } : {},
			...params.installKind === "git" ? { installationMethod: "git-checkout" } : {}
		},
		before: { version: VERSION }
	}, ledgerOptions);
	const record = adoptUpdateRun(created.runId, ledgerOptions);
	const requester = resolveManagedUpdateRequester(record.origin.requester);
	const requesterAuthority = requester?.authorizationSource?.startsWith("profile:") ? Object.freeze({
		requester: Object.freeze({ ...requester }),
		isCurrent: () => {
			throw new Error("Profile update continuation has not acquired its native owner.");
		}
	}) : requester ? await createManagedUpdateRequesterAuthority(requester, env) : void 0;
	const run = {
		runId: record.runId,
		defaultStepTimeoutMs: record.trigger === "campaign" ? AUTO_UPDATE_STEP_TIMEOUT_MS : void 0,
		env,
		...record.trigger !== "cli" && meta?.runId === record.runId && meta.completionOwner === "gateway-restart" ? { completionOwner: "gateway-restart" } : {},
		...requesterAuthority ? { requesterAuthority } : {}
	};
	if (!env["OPENCLAW_UPDATE_RUN_ID"] && env.OPENCLAW_UPDATE_RUN_HANDOFF !== "1" && env["OPENCLAW_UPDATE_POST_CORE"] !== "1") {
		if (params.opts.dryRun === true) previewAdmissions.set(run, {
			record,
			env: { ...env }
		});
		else admitMutableUpdateSignalRun(run, record);
	}
	return run;
}
/** Own diagnostics only for this freshly admitted invocation's lexical lifetime. */
async function withUpdatePreviewSignals(opts, operation) {
	const admission = opts.dryRun === true && opts.run ? previewAdmissions.get(opts.run) : void 0;
	if (!admission || !opts.run || admission.active) return await withMutableUpdateSignals(opts, operation);
	admission.active = true;
	const { env } = admission;
	let interrupted = false;
	let shutdown;
	const unregister = registerSignalExitBarrier(async () => {
		if (!interrupted || process.env.OPENCLAW_UPDATE_RUN_HANDOFF === "1" || process.env["OPENCLAW_UPDATE_POST_CORE"] === "1") return;
		await assertUpdateRecoveryAdmission({ env });
		if (!isDeepStrictEqual(getUpdateRun(admission.record.runId, { env }), admission.record)) return;
		finishInterruptedUpdatePreview(admission.record, { env });
	});
	const onSignal = (code) => {
		interrupted = true;
		shutdown ??= waitForSignalExitBarriers().catch(() => {
			defaultRuntime.error("Preview interruption could not be recorded; history remains pending.");
		}).finally(() => process.exit(code));
	};
	const onSigint = () => onSignal(130);
	const onSigterm = () => onSignal(143);
	process.on("SIGINT", onSigint);
	process.on("SIGTERM", onSigterm);
	try {
		return await operation();
	} finally {
		await shutdown;
		previewAdmissions.delete(opts.run);
		process.off("SIGINT", onSigint);
		process.off("SIGTERM", onSigterm);
		unregister();
	}
}
function createUpdateRunProgress(run, progress) {
	let deferred = false;
	const driver = readUpdateRunDriver();
	const pendingSteps = [];
	const record = (step) => {
		if (deferred) {
			pendingSteps.push(step);
			return;
		}
		try {
			return recordUpdateRunStep(run.runId, step, { env: run.env });
		} catch (cause) {
			throw new Error(`Could not record update step "${step.step}" (${step.status}): ${formatErrorMessage(cause)}`, { cause });
		}
	};
	return {
		pendingSteps,
		onRollbackOutcome: (rollbackOutcome) => {
			if (!deferred) recordUpdateRunVerification(run.runId, { rollbackOutcome }, { env: run.env });
		},
		onHeartbeat() {
			if (!deferred) heartbeatUpdateRun(run.runId, driver, { env: run.env });
		},
		deferLedgerWrites() {
			deferred = true;
			retireMutableUpdateSignalRun(run);
		},
		flushLedgerWrites() {
			deferred = false;
			for (const step of pendingSteps.splice(0)) record(step);
		},
		onStepStart(step) {
			const committed = record({
				step: step.name,
				status: "in_progress",
				startedAtMs: Date.now()
			});
			progress.onStepStart?.(step, committed);
		},
		onStepComplete(step) {
			const endedAtMs = Date.now();
			let committed;
			for (const entry of updateRunStepsFromResultStep(step)) committed = record({
				...entry,
				startedAtMs: Math.max(0, endedAtMs - step.durationMs),
				endedAtMs
			});
			progress.onStepComplete?.(step, committed);
		}
	};
}
function completeUpdateCommandRun(input, run, completion = {}) {
	const result = normalizeControlPlaneUpdateResult(input);
	if (!run) return result;
	const inspected = inspectUpdateRecoveries({ env: run.env }).find((entry) => entry.record.runId === run.runId);
	const recovery = inspected?.format === "legacy-serving" ? inspected.record : loadUpdateRecovery(run.runId, { env: run.env });
	if (recovery?.terminal && getUpdateRun(run.runId, { env: run.env })?.status === recovery.terminal.status) return {
		...result,
		status: recovery.terminal.status === "succeeded" ? "ok" : "error",
		reason: recovery.terminal.status === "succeeded" ? void 0 : recovery.primaryFailure?.code ?? "update-rolled-back",
		runId: run.runId
	};
	if (recovery) return {
		...result,
		status: "error",
		reason: result.reason ?? "update-recovery-pending",
		runId: run.runId
	};
	const recordOptions = {
		env: run.env,
		redactPaths: result.root ? [result.root] : []
	};
	const helperRecoveryPending = process.env.OPENCLAW_UPDATE_RUN_HANDOFF === "1" && result.recovery?.serviceRestartSafe === true && result.recovery.packageRollbackVerified === true && result.recovery.service === void 0;
	const gatewayRestartPending = run.completionOwner === "gateway-restart" && run.gatewayRestartRequired === true && result.status === "ok" && !completion.rolledBack;
	if (!gatewayRestartPending && !helperRecoveryPending) {
		const finished = finishUpdateRun(run.runId, {
			status: completion.rolledBack ? "rolled-back" : result.status === "ok" ? "succeeded" : result.status === "error" ? "failed" : "skipped",
			diagnostics: result,
			before: result.before,
			reason: result.reason,
			after: result.after,
			downtimeMs: completion.downtimeMs
		}, recordOptions);
		if (result.verification) result.recovery = finished.verification.recovery ?? void 0;
	} else {
		recordUpdateRunPhase(run.runId, gatewayRestartPending ? "restarting" : "requested", {
			before: result.before,
			after: result.after
		}, recordOptions);
		recordUpdateRunDiagnostics(run.runId, result, defaultRuntime.error, recordOptions);
		if (!result.verification) for (const step of result.steps.flatMap(updateRunStepsFromResultStep)) recordUpdateRunStep(run.runId, step, recordOptions);
	}
	return {
		...result,
		runId: run.runId
	};
}
function readDevUpdateTarget() {
	const parsed = parseDevUpdateTargetEnv(process.env);
	if (parsed.status === "invalid") throw new Error(`Invalid internal ${UPDATE_DEV_TARGET_REF_ENV} contract; expected a plain Git ref or a supported tracked-target encoding.`);
	return parsed.status === "valid" ? parsed.target : void 0;
}
async function prepareUpdateCommand(opts) {
	const runtimeFailure = process.versions.bun ? null : nodeRuntimeFailure(process.versions.node, await detectCurrentSqliteCapabilities());
	if (runtimeFailure) {
		const error = `${runtimeFailure}\n${formatUnsupportedNodeVersionMessage(process.versions.node)}`;
		if (opts.json) defaultRuntime.writeJson({
			status: "error",
			mode: "unknown",
			reason: "node-runtime-preflight",
			error,
			steps: [],
			durationMs: 0
		});
		else defaultRuntime.error(`node-runtime-preflight: ${error}`);
		exitCliAfterOutput(defaultRuntime, 1);
	}
	const startedAt = Date.now();
	suppressDeprecations();
	const postCoreUpdateResume = process.env[POST_CORE_UPDATE_ENV] === "1";
	const postCoreUpdateChannel = process.env[POST_CORE_UPDATE_CHANNEL_ENV]?.trim();
	const timeoutMs = parseUpdateTimeoutMs(opts.timeout);
	const shouldRestart = opts.restart !== false;
	const requestedChannel = normalizeUpdateChannel(opts.channel);
	if (opts.channel !== void 0 && !requestedChannel) throw new Error(`--channel must be "stable", "extended-stable", "beta", or "dev" (got "${opts.channel}")`);
	let devTarget;
	if (requestedChannel === "dev") devTarget = readDevUpdateTarget();
	if (!postCoreUpdateResume && opts.dryRun !== true && isGatewayExternallySupervised()) throw new Error(formatExternalSupervisorUpdateRequired());
	const executingRoot = resolveOpenClawPackageRootSync({ moduleUrl: import.meta.url });
	const discoveredRoot = opts.sourceUpdate?.root ?? await resolveUpdateRoot();
	const installKind = await resolveUpdateInstallKind(discoveredRoot, { timeoutMs });
	if (opts.sourceUpdate && installKind !== "git") throw new Error("Doctor source update requires the accepted Git checkout.");
	const controlPlaneUpdateSentinelMeta = await readControlPlaneUpdateSentinelMeta();
	const foreground = !postCoreUpdateResume && await resolveForegroundUpdateAdmission({
		root: discoveredRoot,
		meta: controlPlaneUpdateSentinelMeta
	});
	const pkgOwnership = createFreeBsdPkgOwnershipInspection(timeoutMs ?? 12e5);
	await pkgOwnership.assertUnowned(discoveredRoot);
	assertUpdatePackageActivationAdmission(discoveredRoot, { continuation: postCoreUpdateResume ? opts.run?.executorFence : void 0 });
	const servicePlan = installKind === "package" && !postCoreUpdateResume && !foreground ? await resolveManagedServicePackageUpdatePlan({
		root: discoveredRoot,
		pkgOwnership,
		rebind: shouldRestart
	}) : void 0;
	const packageAdmission = {
		continuation: postCoreUpdateResume ? opts.run?.executorFence : void 0,
		serviceRoot: servicePlan?.serviceRoot ?? servicePlan?.rootRedirect?.root
	};
	assertUpdatePackageActivationAdmission(discoveredRoot, packageAdmission);
	opts.run?.executorFence?.assertCurrent();
	if (opts.dryRun !== true) await assertOpenClawStateWriteAllowedAtPath({
		databasePath: resolveOpenClawStateSqlitePath(process.env),
		recoverOrphanedSidecars: false
	});
	opts.run?.executorFence?.assertCurrent();
	const handoffRoot = controlPlaneUpdateSentinelMeta?.root;
	if (handoffRoot) {
		const { assertManagedServiceUpdateHandoffRoot } = await import("./update-managed-service-handoff-DybShBrM.mjs");
		await assertManagedServiceUpdateHandoffRoot({
			expectedRoot: handoffRoot,
			root: discoveredRoot,
			executingRoot,
			postCore: postCoreUpdateResume
		});
		opts.run?.executorFence?.assertCurrent();
	}
	assertUpdatePackageActivationAdmission(discoveredRoot, packageAdmission);
	if (opts.dryRun !== true) try {
		assertConfigWriteAllowedInCurrentMode();
	} catch (err) {
		await disableCurrentOpenClawUpdateLaunchdJob().catch(() => void 0);
		throw err;
	}
	return {
		startedAt,
		postCoreUpdateResume,
		postCoreUpdateChannel,
		timeoutMs,
		shouldRestart,
		requestedChannel,
		devTarget,
		controlPlaneUpdateSentinelMeta,
		discoveredRoot,
		installKind,
		servicePlan,
		pkgOwnership
	};
}
/** Prepare mutable runtime state only under the admitted installation owner. */
async function prepareMutableUpdateRuntime(env, fence) {
	return await withOwnedManagedUpdateEnv(env, async () => {
		fence.assertCurrent();
		await cleanupStaleManagedServiceUpdateHandoffs().catch(() => void 0);
		fence.assertCurrent();
		await assertOpenClawStateWriteAllowedAtPath({ databasePath: resolveOpenClawStateSqlitePath(process.env) });
		fence.assertCurrent();
		await disableCurrentOpenClawUpdateLaunchdJob().catch(() => void 0);
		fence.assertCurrent();
		const records = await loadInstalledPluginIndexInstallRecords();
		fence.assertCurrent();
		return records;
	});
}
//#endregion
//#region src/infra/update-run-terminal-record.ts
/** Retain a completed outcome while its updater still owns the existing state.
* Publication consumes this fact after release; it never grants recovery authority. */
function captureCompletedUpdateRun(runId, assertCurrent, options) {
	assertCurrent();
	return runExistingOpenClawStateWriteTransaction(({ db }) => {
		assertCurrent();
		if (readRecoveries(db).length > 0) return;
		const record = readUpdateRunRecord(db, runId);
		assertCurrent();
		return record?.status === "succeeded" && record.phase === "finished" ? record : void 0;
	}, options, {
		schemaSql: updateRunLedgerSchema,
		operationLabel: "update.run"
	});
}
//#endregion
//#region src/cli/update-cli/update-command-terminal-record.ts
function matchesResult(record, result) {
	if (result.status !== "ok" || result.runId && result.runId !== record.runId) return false;
	const verification = record.verification;
	if (!isUpdateRunVerificationConfirmed(verification)) return false;
	for (const key of [
		"version",
		"sha",
		"buildId"
	]) {
		const expected = result.after?.[key];
		const actual = record.after[key];
		if (expected && actual) {
			if (expected !== actual) return false;
		}
	}
	const observedVersion = verification.runningVersion;
	const observedBuild = verification.runningBuildId;
	if (record.after.version && observedVersion && record.after.version !== observedVersion || record.after.buildId && observedBuild && record.after.buildId !== observedBuild) return false;
	if (result.after?.version && observedVersion && result.after.version !== observedVersion || (result.after?.buildId ? observedBuild !== result.after.buildId : !result.after?.version || observedVersion !== result.after.version)) return false;
	const key = result.after?.buildId ? "buildId" : result.after?.sha ? "sha" : "version";
	return Boolean(result.after?.[key] && record.after[key] === result.after[key]);
}
/** Capture an already completed outcome while its real executor still owns state. */
async function captureUpdateCommandTerminalRecord(params, result, assertCurrent) {
	const run = params.opts.run;
	const executor = run?.executorFence;
	if (!run || !executor || result.status !== "ok") return;
	const pathname = resolveOpenClawStateSqlitePath(run.env);
	if (resolveOpenClawStateSqlitePath(params.ownedManagedUpdateEnv ?? run.env) !== pathname) return;
	assertCurrent();
	if (!await assertUpdateRecoveryDirectoryAdmission(pathname)) return;
	assertCurrent();
	const identity = readDatabasePathIdentitySync(pathname).key;
	const record = captureCompletedUpdateRun(run.runId, assertCurrent, {
		env: run.env,
		path: pathname
	});
	assertCurrent();
	if (!record || !matchesResult(record, result)) return;
	const captured = {
		run,
		executor,
		path: pathname,
		identity,
		record
	};
	readUpdateCommandTerminalRecord(params, result, captured);
	return captured;
}
/** Recheck identity without reopening released state or taking a live snapshot. */
function readUpdateCommandTerminalRecord(params, result, captured) {
	const run = params.opts.run;
	if (run !== captured.run || run.executorFence !== captured.executor || run.runId !== captured.record.runId || resolveOpenClawStateSqlitePath(run.env) !== captured.path || resolveOpenClawStateSqlitePath(params.ownedManagedUpdateEnv ?? run.env) !== captured.path || !matchesResult(captured.record, result)) throw new Error("Update terminal publication lost its captured outcome.");
	assertExistingDatabaseIdentity(captured.path, captured.identity);
	openClawStateDatabaseCache.assertOpenClawStateDatabaseFreshOpenAllowedAtPath(captured.path, run.env);
	return captured.record;
}
//#endregion
//#region src/cli/update-cli/update-command-terminal.ts
const terminalOwners = /* @__PURE__ */ new WeakMap();
/** Finalization prepares a report; the outer invocation owns its publication. */
function deferUpdateCommandTerminalResult(run, publish) {
	const owner = run && terminalOwners.get(run);
	if (!owner) return false;
	owner.publish = publish;
	return true;
}
function hasDeferredUpdateCommandTerminalResult(run) {
	return terminalOwners.get(run)?.publish !== void 0;
}
/** Record facts while admitted; publish only when the executor has settled. */
async function prepareUnexpectedUpdateCommandFailure(error, opts, onPublishedRecord) {
	const failure = {
		mode: "unknown",
		durationMs: 0,
		failure: { cause: error }
	};
	let fact;
	try {
		const recorded = failUpdateCommandRun(error, opts.run);
		if (!recorded) throw new Error("Update history remains with its existing recovery owner.");
		fact = recorded;
	} catch (cause) {
		return new UpdateCommandPendingRecoveryFailure(createUpdateCommandFailureResult(failure), formatErrorMessage(cause), { cause: error });
	}
	const result = createUpdateCommandFailureResult({
		...failure,
		phase: fact.check
	});
	result.failedStep.failureFacts = [fact];
	const params = {
		opts,
		root: result.root ?? ""
	};
	const publish = async (settlementFailure, onTerminalRecord) => {
		const settled = await resolveSettledUpdateCommandResult(params, result, settlementFailure);
		return publishUpdateCommandTerminalResult(params, settled.result, { rolledBack: false }, onTerminalRecord);
	};
	const published = deferUpdateCommandTerminalResult(opts.run, publish) ? result : await publish(void 0, onPublishedRecord);
	return new UpdateCommandFailure(published, 1, fact.message, { cause: error });
}
/** Enclose the real executor so its final checks and release precede terminal output. */
async function withUpdateCommandTerminalResult(operation, opts = {}) {
	const owner = {};
	let run;
	const notifyResult = (result) => {
		try {
			opts.onResult?.(result);
		} catch (cause) {
			defaultRuntime.error(`Warning: Update result observer failed: ${createUpdateErrorFact("update", cause, run?.env).message}`);
		}
	};
	let registrationOpen = true;
	const registerRun = (admitted) => {
		if (!registrationOpen || run || terminalOwners.has(admitted)) throw new Error("Update terminal publication already has an owner or has settled.");
		run = admitted;
		terminalOwners.set(admitted, owner);
	};
	let outcome;
	try {
		outcome = { value: await operation(registerRun) };
	} catch (error) {
		outcome = { error };
	} finally {
		registrationOpen = false;
		if (run) terminalOwners.delete(run);
	}
	if ("error" in outcome && hasCommandProcessCleanupError(outcome.error)) throw outcome.error;
	await run?.sourceArtifactLock?.release().catch((error) => {
		defaultRuntime.error(`Warning: Artifact lock release failed: ${formatErrorMessage(error)}`);
	});
	const activationTimeout = "error" in outcome ? collectNestedErrorCandidates(outcome.error).find((error) => error instanceof UpdateActivationTimeoutError) : void 0;
	if (run && activationTimeout && !owner.publish) {
		const admittedRun = run;
		owner.publish = async (failure) => {
			const params = {
				opts: {
					...opts,
					run: admittedRun
				},
				root: activationTimeout.root
			};
			const { result } = await resolveSettledUpdateCommandResult(params, {
				status: "error",
				mode: "unknown",
				root: activationTimeout.root,
				steps: [],
				durationMs: activationTimeout.timeoutMs
			}, failure);
			return publishUpdateCommandTerminalResult(params, result, { rolledBack: false });
		};
	}
	if (owner.publish) {
		let published;
		try {
			published = await owner.publish("error" in outcome ? outcome.error : void 0, opts.onTerminalRecord);
		} catch (error) {
			if (collectNestedErrorCandidates(error).some((cause) => cause instanceof UpdateCommandFailure)) throw error;
			outcome = { error: "error" in outcome && outcome.error !== error ? new AggregateError([outcome.error, error], "Update result publication failed", { cause: error }) : error };
			published = void 0;
		}
		if (published) notifyResult(published);
		if (published && "error" in outcome) {
			const failure = outcome.error;
			if (failure instanceof UpdateCommandPendingRecoveryFailure || failure instanceof UpdateCommandRecoveryPendingError || activationTimeout) throw new UpdateCommandFinalizedRecoveryFailure(published);
			throw new UpdateCommandFailure(published, failure instanceof UpdateCommandFailure ? failure.exitCode : 1, formatErrorMessage(failure), {
				cause: failure,
				automaticTriage: failure instanceof UpdateCommandFailure ? failure.automaticTriage : void 0
			});
		}
	}
	if (run && "error" in outcome && !(outcome.error instanceof UpdateCommandFailure)) {
		const error = outcome.error;
		if (hasCommandProcessCleanupError(error)) throw error;
		const causes = collectNestedErrorCandidates(error);
		const primaryFailure = causes.find((cause) => cause instanceof UpdateCommandFailure);
		let failure;
		try {
			if (primaryFailure || causes.some((cause) => cause instanceof UpdateCommandRecoveryPendingError || cause instanceof UpdateRecoveryRequiredError)) throw error;
			await assertUpdateRecoveryAdmission({ env: run.env });
			failure = await prepareUnexpectedUpdateCommandFailure(error, {
				...opts,
				run
			}, opts.onTerminalRecord);
		} catch (cause) {
			throw new UpdateCommandPendingRecoveryFailure(primaryFailure?.result ?? createUpdateCommandFailureResult({
				mode: "unknown",
				durationMs: 0,
				failure: { cause: error }
			}), formatErrorMessage(cause), { cause: error });
		}
		if (!(failure instanceof UpdateCommandPendingRecoveryFailure)) notifyResult(failure.result);
		throw failure;
	}
	if ("error" in outcome) throw outcome.error;
	return outcome.value;
}
/** Resolve diagnostic output without reusing a released mutation fence. */
async function resolveSettledUpdateCommandResult(params, pendingResult, failure, captured) {
	const settlementFailed = failure !== void 0 && (!(failure instanceof UpdateCommandFailure) || failure instanceof UpdateCommandPendingRecoveryFailure);
	const activationTimeout = collectNestedErrorCandidates(failure).find((error) => error instanceof UpdateActivationTimeoutError);
	const failedStep = settlementFailed ? {
		name: "update-executor-settlement",
		command: "openclaw update",
		cwd: pendingResult.root ?? params.root,
		durationMs: 0,
		exitCode: 1,
		stderrTail: activationTimeout?.message ?? formatErrorMessage(failure)
	} : void 0;
	const result = failedStep ? {
		...pendingResult,
		status: "error",
		reason: activationTimeout?.reason ?? "update-executor-settlement-failed",
		failedStep,
		steps: [...pendingResult.steps, failedStep]
	} : failure instanceof UpdateCommandFailure ? failure.result : pendingResult;
	try {
		if (failure === void 0 && captured) {
			readUpdateCommandTerminalRecord(params, result, captured);
			return {
				result,
				settlementFailed,
				captured
			};
		}
		const env = params.ownedManagedUpdateEnv ?? params.opts.run?.env;
		const targetPath = resolveOpenClawStateSqlitePath(env);
		await assertUpdateRecoveryAdmission({
			env,
			path: targetPath
		});
		if (params.opts.run) {
			if (resolveOpenClawStateSqlitePath(params.opts.run.env) !== targetPath) await assertUpdateRecoveryAdmission({ env: params.opts.run.env });
			const prior = getUpdateRun(params.opts.run.runId, { env: params.opts.run.env });
			if (prior && prior.status !== "running" && settlementFailed) throw new Error("Update history was already finalized by another owner.");
		}
	} catch (cause) {
		throw new UpdateCommandPendingRecoveryFailure(result, formatErrorMessage(cause), { cause });
	}
	return {
		result,
		settlementFailed
	};
}
/** Share verified retirement and unverified recovery retention across finalizers. */
async function recordUpdatePackageCompletion(params, result, assertCurrent) {
	const transaction = params.packageTransaction;
	if (!transaction) return;
	if (isUpdateGatewayReadinessPending(result) || result.status === "ok" && params.opts.run?.completionOwner === "gateway-restart" && params.opts.run.gatewayRestartRequired === true) {
		assertCurrent();
		const message = `Gateway readiness is pending; backup retirement deferred for ${transaction.backupRoot}. Verify readiness before cleanup.`;
		result.steps.push({
			name: "package-backup-retention",
			command: "openclaw update",
			cwd: result.root ?? params.root,
			durationMs: 0,
			exitCode: 0,
			advisory: {
				kind: "recoverable-maintenance",
				message
			}
		});
		defaultRuntime.error(message);
		return;
	}
	let cleanupFailure;
	defaultRuntime.error("Finishing update: checking package backup retention and cleanup.");
	const retained = await transaction.complete({ activationVerified: result.status === "ok" }, assertCurrent).catch((error) => {
		assertCurrent();
		if (error instanceof UpdateCommandPendingRecoveryFailure) throw error;
		cleanupFailure = error;
		return {
			name: "package-backup-retention",
			command: "openclaw update",
			cwd: result.root ?? params.root,
			durationMs: 0,
			exitCode: 1,
			stderrTail: `Update backup cleanup failed: ${formatErrorMessage(error)}. Inspect ${transaction.backupRoot} before manual cleanup.`
		};
	});
	assertCurrent();
	if (!retained) return;
	const step = {
		...retained,
		stderrTail: retained.stderrTail
	};
	if (step.exitCode !== 0) {
		const recoveryPath = `Recovery transaction backup path: ${transaction.backupRoot}`;
		if (!step.advisory) step.warnings = [...step.warnings ?? [], recoveryPath];
		if (!step.stderrTail?.includes(transaction.backupRoot)) step.stderrTail = [step.stderrTail, recoveryPath].filter(Boolean).join("\n");
	}
	result.steps = [...result.steps, step];
	if (result.status !== "ok" && !result.recovery?.packageRollbackVerified) {
		defaultRuntime.error(step.stderrTail);
		return;
	}
	if (step.exitCode !== 0 && step.advisory?.kind !== "recoverable-maintenance") return new UpdateCommandFailure({
		...result,
		status: "error",
		reason: "package-backup-retention-failed",
		failedStep: step
	}, 1, step.stderrTail ?? "Package backup completion was not verified.", { cause: cleanupFailure });
}
async function reportUnreportedUpdateAdmissionOutcome(error) {
	const candidates = collectNestedErrorCandidates(error);
	const outcome = candidates.find((candidate) => candidate instanceof UnreportedUpdateAdmissionOutcome);
	if (!outcome) throw error;
	const cleanupFailed = error !== outcome;
	const result = await publishPreMutationUpdateOutcome(cleanupFailed ? {
		...outcome.report,
		reason: "update-admission-cleanup-failed",
		stepResult: outcome.report.stepResult ? { steps: outcome.report.stepResult.steps } : void 0,
		message: candidates.filter((candidate) => candidate instanceof Error).slice(0, 8).map((candidate) => formatErrorMessage(candidate).slice(0, 2e3)).join("\n")
	} : outcome.report, async () => ({
		status: !cleanupFailed && outcome.skipped ? "skipped" : "error",
		...cleanupFailed ? { recovery: {
			serviceRestartSafe: false,
			reason: "runtime-verification-failed"
		} } : {}
	}));
	if (!cleanupFailed && outcome.skipped) return exitCliAfterOutput(defaultRuntime, outcome.skipped.exitCode);
	return exitCliAfterOutput(defaultRuntime, cleanupFailed ? 1 : resolveManagedServiceUpdateFailureExitCode(result));
}
async function reportPreMutationUpdateResult(params) {
	const result = await publishPreMutationUpdateOutcome(params, async () => ({
		status: params.status ?? "error",
		...params.opts.dryRun !== true && params.status !== "skipped" ? { recovery: await (params.installKind === "git" ? readCurrentGitUpdateRecovery(params.root, parseUpdateTimeoutMs(params.opts.timeout)) : verifyPackageUpdateRecovery(params.root)) } : {}
	}));
	if (!params.opts.run && params.opts.dryRun && params.reason === "invalid-dev-target") return exitCliAfterOutput(defaultRuntime, 1);
	throw new UpdateCommandFailure(result, params.status === "skipped" ? 0 : resolveManagedServiceUpdateFailureExitCode(result), params.message);
}
async function publishPreMutationUpdateOutcome(params, prepareOutcome) {
	const run = params.opts.run;
	const active = run ? getUpdateRun(run.runId, { env: run.env }) : void 0;
	const nextAction = params.nextAction ?? params.message;
	if (run && active && nextAction) recordUpdateRunPhase(run.runId, active.phase, {
		origin: { nextAction },
		...params.installKind !== "unknown" ? { target: { kind: params.installKind } } : {}
	}, { env: run.env });
	const outcome = await prepareOutcome();
	const stepResult = outcome.status === "error" ? params.stepResult : void 0;
	const failedStep = stepResult?.failedStep ?? (outcome.status === "error" || params.failureFacts?.length ? {
		name: outcome.status === "skipped" ? active?.phase ?? "requested" : params.reason,
		command: "openclaw update",
		cwd: params.root,
		durationMs: 0,
		exitCode: outcome.status === "error" ? 1 : 0,
		stderrTail: params.message,
		...params.recoverySteps ? { recoverySteps: params.recoverySteps } : {},
		failureFacts: normalizeUpdateFailureFacts(params.failureFacts ?? [{
			check: params.reason,
			code: params.reason,
			message: params.message
		}], run?.env)
	} : void 0);
	const result = completeUpdateCommandRun({
		...outcome,
		mode: params.mode ?? (params.installKind === "git" ? "git" : "unknown"),
		root: params.root,
		reason: params.reason,
		failedStep: outcome.status === "error" ? failedStep : void 0,
		steps: stepResult?.failedStep ? stepResult.steps : [...stepResult?.steps ?? [], ...failedStep ? [failedStep] : []],
		...outcome.status === "skipped" ? { before: { version: await readPackageVersion(params.root) } } : {},
		durationMs: 0
	}, params.opts.run);
	if (params.opts.dryRun !== true) await writeControlPlaneUpdateRestartSentinelBestEffort({
		meta: params.controlPlaneUpdateSentinelMeta,
		result,
		jsonMode: Boolean(params.opts.json),
		env: run?.env
	});
	if ((run || params.opts.dryRun) && params.reason === "invalid-dev-target" && params.message) {
		defaultRuntime.error(params.message);
		return result;
	}
	if (params.opts.json && params.message) defaultRuntime.error(params.message);
	await printResult(result, params.opts, { nextAction });
	return result;
}
/** Write the terminal ledger and its visible result together after settlement. */
async function publishUpdateCommandTerminalResult(params, input, outcome, onTerminalRecord) {
	let record;
	if (outcome.captured) try {
		record = readUpdateCommandTerminalRecord(params, input, outcome.captured);
	} catch (cause) {
		throw new UpdateCommandPendingRecoveryFailure(input, formatErrorMessage(cause), { cause });
	}
	const nextAction = recordUpdateResultNextAction(params, input, record);
	const result = record ? {
		...input,
		runId: record.runId
	} : completeUpdateCommandRun(input, params.opts.run, outcome);
	await printResult(result, params.opts, {
		nextAction,
		record
	});
	if (record) onTerminalRecord?.(record);
	return result;
}
//#endregion
export { createUpdateCommandAuthority as C, suppressDeprecations as S, readDevUpdateTarget as _, recordUpdatePackageCompletion as a, resolveUpdateCommandAdmissionRoot as b, resolveSettledUpdateCommandResult as c, admitUpdateCommandRun as d, assertUpdatePackageActivationAdmission as f, prepareUpdateCommand as g, prepareMutableUpdateRuntime as h, publishUpdateCommandTerminalResult as i, withUpdateCommandTerminalResult as l, createUpdateRunProgress as m, hasDeferredUpdateCommandTerminalResult as n, reportPreMutationUpdateResult as o, completeUpdateCommandRun as p, prepareUnexpectedUpdateCommandFailure as r, reportUnreportedUpdateAdmissionOutcome as s, deferUpdateCommandTerminalResult as t, captureUpdateCommandTerminalRecord as u, recordUpdateCommandTarget as v, withUpdatePreviewSignals as x, resolveUpdateCommandAdmissionEnv as y };
