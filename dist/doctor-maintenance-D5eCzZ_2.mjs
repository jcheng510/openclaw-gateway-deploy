import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { o as registerSignalExitGate } from "./signal-exit-barrier-BNMo76Rm.mjs";
import { h as sleep } from "./utils-DUAwk2p5.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { o as isDefaultInstallIdentity } from "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { r as createOpenClawDatabaseMaintenanceScope } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { l as resolveGatewayStateOwnerPath, t as GatewayStateOwnerContentionError } from "./gateway-state-owner-CPG45dwV.mjs";
import { n as openDoctorStateSchemaReadAdmission } from "./openclaw-state-db-doctor-schema-CkfI7JQa.mjs";
import { t as DoctorUnreadableStateDatabaseError } from "./state-repair-message-B5Bu99oR.mjs";
import { r as hasCommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { l as withCommandProcessScope, n as resolveCommandProcessSignal } from "./exec-spawn-B_BFgGrb.mjs";
import { n as GatewayServiceAuthorityError } from "./service-update-authority-CVLjmQiA.mjs";
import { c as hasGatewayServiceStopUnsafeError, o as findServiceOwnershipRefusal } from "./service-inspection-error-C_WINlwy.mjs";
import { r as readPackageVersion } from "./package-json-7gGhB8Vf.mjs";
import { n as readBuiltGatewayBuildId } from "./update-git-runtime-CXZMwux0.mjs";
import { s as closeOpenClawStateDatabaseByPathAsync } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { n as createUpdateFailureFact } from "./update-failure-facts-RzGaiYBm.mjs";
import { n as recordUpdateDoctorRefusal, r as resolveUpdateDoctorGitRecovery, t as formatUpdateDoctorServiceStopRefusal } from "./doctor-update-refusal-fcc9NYwe.mjs";
import { c as readStateLeaseProcessOwnerStatus } from "./openclaw-state-lease-store-mYOdDX2y.mjs";
import { o as acquireWithWait } from "./startup-migration-checkpoint-CHB08AgD.mjs";
import { a as UpdateDoctorError, d as createUpdateDoctorDatabaseWriteCapture, t as DoctorMaintenanceRefusalError } from "./update-doctor-result-BlDxecnI.mjs";
import { n as readGatewayOwnerLease } from "./gateway-owner-lease-_oTp5UxR.mjs";
import { n as GatewayLockError, o as readActiveGatewayLockIdentity, r as acquireGatewayLock } from "./gateway-lock-DhA-3HKn.mjs";
import { r as inspectUpdateRepairDriverAdmission } from "./update-run-activity-8Zl-pDYm.mjs";
import { d as recordUpdateRunRepairContinuation } from "./update-run-ledger-C5c7VrBu.mjs";
import { t as createUpdateRunAdmissionReader } from "./update-run-reader-DZIHUks3.mjs";
import { i as UPDATE_RUN_ID_ENV } from "./update-control-plane-sentinel-CB0F6AWU.mjs";
import { n as GATEWAY_SERVICE_STOP_TIMEOUT_MS, r as GATEWAY_SHUTDOWN_RESERVE_MS } from "./gateway-shutdown-budget-v-vGFkEN.mjs";
import { n as probePortUsage } from "./ports-probe-D7r0Sdxq.mjs";
import { n as resolveGatewayService } from "./service-Du2I2Kt4.mjs";
import { t as resolveGatewayRestartDeferralTimeoutMs } from "./restart-budget-BrFMgEHj.mjs";
import { m as resolveUpdatedGatewayRestartPort } from "./update-command-service-plan-CyZKQiYX.mjs";
import { n as sanitizeDoctorNote } from "./emit-notes-DnxujLhz.mjs";
import { s as inspectGatewayRestart } from "./restart-health-BtnfWS3d.mjs";
import { s as TICK_INTERVAL_MS } from "./server-constants-BH_EolwD.mjs";
import { n as readLegacyGatewayLockIdentity, t as assertLegacyGatewayStoppedForMaintenance } from "./gateway-lock-legacy-CbhEIzZK.mjs";
import { c as resolveUpdateParentGatewayActivation, l as shouldManageGatewayService, n as assertDoctorServiceSelection, o as isServiceRepairExternallyManaged } from "./doctor-service-repair-policy--7A-vlzR.mjs";
import { i as readDoctorMaintenanceRecoveryConfig, r as classifyDoctorMaintenanceRefusal, t as assertDoctorMaintenanceInspection } from "./doctor-maintenance-inspection-C_Nl6FTN.mjs";
import { n as resolveDoctorRepairMode, t as isDoctorUpdateRepairMode } from "./doctor-repair-mode-DIw4A7J0.mjs";
import path from "node:path";
//#region src/commands/doctor-agent-lease-refusal.ts
function createDoctorAgentLeaseRefusal(env, cause) {
	const message = "Doctor could not enter maintenance. An agent database is in use. Stop other OpenClaw processes using this state, then retry the update.";
	return new DoctorMaintenanceRefusalError(message, {
		kind: "deferred",
		reason: "agent-database-in-use"
	}, {
		cause,
		failureFacts: [createUpdateFailureFact({
			check: "doctor",
			code: "agent-database-lease-active",
			message
		}, env)]
	});
}
async function preflightExternalDoctorAgentLease(env) {
	const { readActiveOpenClawAgentDatabaseLeasesReadOnly } = await import("./openclaw-agent-db-lease-C2kwL6EC.mjs");
	let activeAgentLease = false;
	try {
		activeAgentLease = readActiveOpenClawAgentDatabaseLeasesReadOnly({ env }, openDoctorStateSchemaReadAdmission).length > 0;
	} catch (error) {
		if (hasCommandProcessCleanupError(error)) throw error;
	}
	if (activeAgentLease) throw createDoctorAgentLeaseRefusal(env);
}
/** The caller holds both lifecycle coordinators; this check never opens a state writer. */
async function assertDoctorAgentLeaseAdmission(env) {
	const { assertNoOpenClawAgentDatabaseLeasesReadOnly, OpenClawAgentDatabaseLeaseActiveError } = await import("./openclaw-agent-db-lease-C2kwL6EC.mjs");
	try {
		assertNoOpenClawAgentDatabaseLeasesReadOnly({ env }, openDoctorStateSchemaReadAdmission);
	} catch (error) {
		if (error instanceof OpenClawAgentDatabaseLeaseActiveError) throw createDoctorAgentLeaseRefusal(env, error);
		const { preflightOpenClawDatabaseSchemas } = await import("./openclaw-database-preflight-C1rXZ1NA.mjs");
		const unreadable = (await preflightOpenClawDatabaseSchemas({
			env,
			scope: "state",
			openStateSchemaReadAdmission: openDoctorStateSchemaReadAdmission
		})).indeterminate.find((database) => database.kind === "state");
		if (unreadable) throw new DoctorUnreadableStateDatabaseError(unreadable.path, unreadable.reason);
		throw error;
	}
}
//#endregion
//#region src/commands/doctor-maintenance-admission.ts
function resolveDoctorUpdateAdmission(env) {
	const inheritedRunId = env[UPDATE_RUN_ID_ENV]?.trim();
	const readRuns = createUpdateRunAdmissionReader({
		active: true,
		limit: 100,
		includeRunId: inheritedRunId
	}, { env }, openDoctorStateSchemaReadAdmission);
	const readAdmission = () => {
		const runs = readRuns();
		const admission = inspectUpdateRepairDriverAdmission(runs, inheritedRunId);
		if (admission.kind === "conflict") throw new Error(admission.message);
		return admission;
	};
	const admission = readAdmission();
	const continuation = admission.kind === "continuation" ? admission.run : admission.runs.find((run) => run.runId === inheritedRunId);
	return {
		assertCurrent: () => {
			readAdmission();
		},
		recordContinuation: () => {
			readAdmission();
			if (continuation?.steps.some((step) => step.step === "finalize:repair-continuation")) recordUpdateRunRepairContinuation(continuation.runId, inheritedRunId, { env });
		}
	};
}
//#endregion
//#region src/commands/doctor-maintenance-exit.ts
/** Let admitted repair work settle before restoring the service and exiting. */
function holdDoctorMaintenanceExit() {
	const prompts = new AbortController();
	const finished = createDeferredCore();
	finished.promise.catch(() => void 0);
	const unregister = registerSignalExitGate(finished.promise, () => prompts.abort());
	let active = true;
	const release = (failed = false) => {
		if (!active) return;
		active = false;
		unregister();
		if (failed) finished.reject(/* @__PURE__ */ new Error("Doctor maintenance did not complete."));
		else finished.resolve();
	};
	return {
		signal: prompts.signal,
		release
	};
}
//#endregion
//#region src/commands/doctor-maintenance-stale-service.ts
function doctorGatewayMaintenanceError(params) {
	const restart = formatCliCommand("openclaw gateway restart", params.env);
	const next = `Run ${formatCliCommand("openclaw gateway status --deep", params.env)}; resolve the reported failure, then ${formatCliCommand("openclaw doctor --fix", params.env)} and ${restart}.`;
	const message = `Doctor ${params.phase} failed. ${params.detail} ${next}`;
	const failureFacts = [createUpdateFailureFact({
		check: params.phase,
		code: params.code,
		message: params.detail
	}, params.env), createUpdateFailureFact({
		check: params.phase,
		code: "stale-gateway-recovery-command",
		message: next
	}, params.env)];
	return params.phase === "gateway-stop" ? new DoctorMaintenanceRefusalError(message, {
		kind: "data-at-risk",
		reason: "gateway-state-unverified"
	}, {
		cause: params.cause,
		failureFacts
	}) : new UpdateDoctorError(message, failureFacts, { cause: params.cause });
}
/** Identify predecessor code without requiring startup before offline migrations. */
async function inspectStaleDoctorGateway(params) {
	const { before, root, env } = params;
	const legacy = await readLegacyGatewayLockIdentity(env);
	if (!before.running && !legacy) return;
	const serviceEnv = before.serviceEnv ?? env;
	const service = resolveGatewayService();
	const [version, buildId, serviceCommand] = await Promise.all([
		readPackageVersion(root),
		readBuiltGatewayBuildId(root),
		service.readCommand(serviceEnv).catch(() => null)
	]);
	params.assertCurrent?.();
	if ((!version || !buildId) && !legacy) return;
	const port = await resolveUpdatedGatewayRestartPort({
		serviceEnv,
		serviceCommand
	});
	const health = legacy ? void 0 : await inspectGatewayRestart({
		service,
		port,
		env: serviceEnv,
		expectedVersion: version,
		expectedBuildId: buildId,
		openStateSchemaReadAdmission: openDoctorStateSchemaReadAdmission,
		requirePluginHealth: false
	});
	params.assertCurrent?.();
	if (!(legacy || health?.buildIdMismatch?.actual != null || health?.versionMismatch || health?.staleConnection !== void 0)) return;
	const pid = legacy?.pid ?? before.servicePid ?? health?.runtime.pid;
	if (before.serviceUpdateVerdict?.kind !== "owned" || !before.serviceEnv || !before.running || legacy && (legacy.state !== "alive" || legacy.pid !== before.servicePid)) throw doctorGatewayMaintenanceError({
		env,
		phase: "gateway-stop",
		code: "stale-gateway-service-unverified",
		detail: `Gateway PID ${pid ?? "unknown"} is stale, but its managed service ownership is unverified. ${before.blockMessage ?? before.serviceMutationSkipMessage ?? ""}`
	});
	if (!version || !buildId) throw doctorGatewayMaintenanceError({
		env,
		phase: "gateway-stop",
		code: "stale-gateway-identity-unavailable",
		detail: "The installed candidate's build identity is unavailable."
	});
	return {
		version,
		buildId,
		pid,
		port
	};
}
async function assertStaleDoctorGatewayStopped(params) {
	const runtime = await resolveGatewayService().readRuntime(params.env);
	const port = await probePortUsage(params.stale.port);
	const legacy = await readLegacyGatewayLockIdentity(params.env);
	params.assertCurrent?.();
	if (runtime.status !== "stopped" || (runtime.pid ?? 0) > 0 || port !== "free" || legacy) throw new Error(`Stale Gateway PID ${params.stale.pid ?? "unknown"} did not stop: service=${runtime.status}, PID=${runtime.pid ?? "none"}, port ${params.stale.port}=${port}, legacy lock owner=${legacy?.pid ?? "none"}.`);
}
//#endregion
//#region src/commands/doctor-maintenance-foreground.ts
async function acquireDoctorGatewayMaintenanceOwner(databasePath, env, params) {
	const updateRepair = isDoctorUpdateRepairMode(resolveDoctorRepairMode(params.options));
	let foreground;
	let ownerlessDeadlineMs;
	return await acquireWithWait({
		acquire: async () => {
			params.assertCurrent?.();
			try {
				const owner = await acquireGatewayLock({
					env,
					role: "sqlite-maintenance",
					allowInTests: true,
					timeoutMs: 0,
					relocatedMaintenanceOwner: params.relocatedMaintenanceOwner
				});
				if (!owner) throw new Error(`Doctor could not acquire maintenance ownership for ${databasePath}`);
				return owner;
			} catch (error) {
				if (error instanceof GatewayLockError && error.cause instanceof GatewayStateOwnerContentionError) throw error.cause;
				throw error;
			}
		},
		shouldRetry: (error) => {
			if (!updateRepair || !params.assertCurrent || !(error instanceof GatewayStateOwnerContentionError)) return false;
			params.assertCurrent();
			const current = readGatewayOwnerLease({
				env,
				current: true,
				openStateSchemaReadAdmission: openDoctorStateSchemaReadAdmission
			});
			if (!foreground) {
				if (!current) {
					if (ownerlessDeadlineMs === void 0) {
						ownerlessDeadlineMs = performance.now() + GATEWAY_SHUTDOWN_RESERVE_MS;
						params.runtime.log("Waiting for Gateway state ownership cleanup to finish.");
					}
					return performance.now() < ownerlessDeadlineMs;
				}
				if (ownerlessDeadlineMs !== void 0) return false;
				if (current.state !== "live" || current.mode !== "foreground") return false;
				foreground = current;
				params.runtime.log("Waiting for the previous foreground Gateway to release state.");
			} else if (current && (current.owner !== foreground.owner || current.pid !== foreground.pid || current.startedAt !== foreground.startedAt || current.host !== foreground.host || current.mode !== "foreground")) return false;
			return readStateLeaseProcessOwnerStatus(foreground) === "live";
		},
		deadlineMs: Math.min(params.deadlineMs ?? Infinity, performance.now() + TICK_INTERVAL_MS + resolveGatewayRestartDeferralTimeoutMs() + GATEWAY_SERVICE_STOP_TIMEOUT_MS),
		pollIntervalMs: 100,
		maxPollIntervalMs: 1e3,
		sleep: (ms) => sleep(ownerlessDeadlineMs === void 0 ? ms : Math.min(ms, Math.max(0, ownerlessDeadlineMs - performance.now())))
	});
}
//#endregion
//#region src/commands/doctor-maintenance-state.ts
/** Database custody can change paths while stopped-service custody remains with Doctor. */
function createDoctorMaintenanceState(options) {
	const { params, env, settle } = options;
	let resources;
	let owner;
	let selectedEnv = env;
	let captureAdmitted = false;
	const capture = createUpdateDoctorDatabaseWriteCapture(params.databaseGenerations, {
		env,
		root: params.root ?? void 0,
		signal: options.signal,
		assertCurrent: () => owner.run(() => options.assertCurrent?.()),
		warn: options.warn
	});
	const closeResources = async () => {
		await resources?.close();
		resources = void 0;
	};
	const settleCapture = async () => {
		if (owner && capture && captureAdmitted) {
			await settle(() => capture.settle());
			captureAdmitted = false;
		}
	};
	const enterResources = async (acquired) => {
		owner = acquired;
		try {
			options.assertCurrent?.();
			acquired.assertCurrent();
			resources = createOpenClawDatabaseMaintenanceScope({
				schemaMaintenance: true,
				assertDatabaseAccess: acquired.assertDatabaseAccess,
				assertOwnerCurrent: () => {
					acquired.run(() => {
						options.assertCurrent?.();
						options.assertReadCurrent();
						acquired.assertCurrent();
					});
				}
			});
		} catch (error) {
			await acquired.release();
			owner = void 0;
			throw error;
		}
		if (capture) {
			await settle(() => resources.run(() => capture.admit()));
			captureAdmitted = true;
		}
	};
	const state = {
		get owner() {
			return owner;
		},
		get resources() {
			return resources;
		},
		get receipt() {
			return owner ? void 0 : capture?.receipt;
		},
		async acquire(relocatedMaintenanceOwner) {
			if (resources) return;
			options.assertCurrent?.();
			const acquired = await acquireDoctorGatewayMaintenanceOwner(path.resolve(resolveOpenClawStateSqlitePath(selectedEnv)), selectedEnv, {
				...params,
				assertCurrent: options.assertCurrent,
				deadlineMs: options.deadline(),
				relocatedMaintenanceOwner
			});
			await enterResources(acquired);
		},
		async relocateLegacyRoot() {
			const { resolvePendingLegacyStateDirMigrationPaths, prepareLegacyStateDirMigration } = await import("./state-migrations.state-dir-DDhgAaEN.mjs");
			const pending = resolvePendingLegacyStateDirMigrationPaths({ env });
			const sourceDir = resolveStateDir(env);
			if (!pending || path.resolve(sourceDir) !== path.resolve(pending.source)) return;
			const { closeOpenClawAgentDatabasesAsync } = await import("./openclaw-agent-db-lifecycle-C2rozIAT.mjs");
			options.assertCurrent?.();
			owner.assertCurrent();
			const sourceDatabase = resolveOpenClawStateSqlitePath(env);
			await closeResources();
			await closeOpenClawAgentDatabasesAsync(sourceDir);
			await closeOpenClawStateDatabaseByPathAsync(sourceDatabase);
			await settleCapture();
			const migration = owner.run(() => {
				options.assertCurrent?.();
				owner.assertCurrent();
				return prepareLegacyStateDirMigration({ env });
			});
			selectedEnv = {
				...env,
				OPENCLAW_STATE_DIR: migration?.stateDir ?? sourceDir
			};
			if (resolveGatewayStateOwnerPath(resolveOpenClawStateSqlitePath(selectedEnv)) !== owner.lockPath) await state.acquire(owner);
			else await enterResources(owner);
			if (migration) {
				const result = await resources.run(() => migration.complete());
				for (const change of [...result.changes, ...result.notices ?? []]) params.runtime.log(sanitizeDoctorNote(change));
				for (const warning of result.warnings) options.warn(sanitizeDoctorNote(warning));
			}
		},
		async release() {
			await closeResources();
			await settleCapture();
			await owner?.release();
			owner = void 0;
		}
	};
	return state;
}
//#endregion
//#region src/commands/doctor-maintenance.ts
/** Coordinates explicit Doctor repair with the managed Gateway lifecycle. */
async function beginDoctorMaintenance(params) {
	if (!(params.options.repair === true || params.options.yes === true)) return;
	const env = {
		...process.env,
		...params.runId ? { [UPDATE_RUN_ID_ENV]: params.runId } : {}
	};
	const parentActivation = isDoctorUpdateRepairMode(resolveDoctorRepairMode(params.options)) ? resolveUpdateParentGatewayActivation(env) : void 0;
	let stopped;
	let stopDeadline;
	const warnings = [];
	const warn = (message) => {
		warnings.push(message);
		params.runtime.log(message);
	};
	const failureFacts = [];
	let repairStoresMayBeOpen = false;
	let retainStoppedInstallation = false;
	let inspectingActivation = false;
	let staleReplacement;
	let assertUpdateAdmissionReadCurrent;
	let assertUpdateAdmissionCurrent;
	let authorityRefused = false;
	const assertAuthority = (assertion) => {
		try {
			assertion();
		} catch (error) {
			authorityRefused = true;
			throw error;
		}
	};
	const callerAssertCurrent = params.assertCurrent;
	const assertCallerCurrent = callerAssertCurrent ? () => assertAuthority(callerAssertCurrent) : void 0;
	let cleanupFailure;
	const settle = async (operation) => {
		if (cleanupFailure) throw cleanupFailure.error;
		try {
			return await withCommandProcessScope(operation);
		} catch (error) {
			if (hasCommandProcessCleanupError(error)) cleanupFailure ??= { error };
			throw error;
		}
	};
	const acquireStoppedMaintenanceResources = () => acquireWithWait({
		acquire: () => state.acquire(),
		shouldRetry: (error) => stopped?.stopped === true && error instanceof GatewayStateOwnerContentionError,
		deadlineMs: stopDeadline ?? performance.now(),
		pollIntervalMs: 250,
		maxPollIntervalMs: 2e3
	});
	const releaseState = async () => {
		if (cleanupFailure) throw cleanupFailure.error;
		await state.release();
		repairStoresMayBeOpen = false;
	};
	const release = async (assertCustody) => {
		await settle(async () => {
			await releaseState();
			const recovery = stopped?.windowsTaskAutoStartRecovery;
			try {
				assertCustody?.();
				if (!retainStoppedInstallation) await settle(async () => {
					await recovery?.restore(true);
				});
			} finally {
				if (!cleanupFailure) await settle(async () => recovery?.complete(!retainStoppedInstallation));
			}
		});
	};
	const finish = async (cfg, assertCustody, writeConfig, assertRestoreAdmission = assertUpdateAdmissionCurrent) => {
		await release(assertCustody);
		assertCustody?.();
		const before = stopped;
		const root = params.root;
		if (!before?.serviceEnv || !root) return;
		if (!before.stopped) {
			const verdict = before.serviceUpdateVerdict;
			if (verdict?.kind === "owned" && verdict.requiresInstallRootRefresh) {
				const { inspectGatewayServiceInstallationDrift } = await import("./service-layout-jvr0-tCF.mjs");
				const drift = await inspectGatewayServiceInstallationDrift({ packageRootReal: verdict.root }, root);
				if (drift) {
					const { formatGatewayServiceInstallationDrift } = await import("./shared-Dl5LyzT6.mjs");
					const message = formatGatewayServiceInstallationDrift(drift, void 0, before.serviceEnv, {
						stopped: true,
						port: before.servicePort
					});
					warn(message);
					return;
				}
			}
			if (resolveDoctorRepairMode(params.options).updateInProgress || before.offline !== true || verdict?.kind !== "owned" || verdict.requiresInstallRootRefresh) return;
		}
		try {
			const serviceEnv = before.serviceEnv;
			const [{ restoreDoctorGatewayService }, { resolveUpdatedGatewayRestartPort }, { renderRestartDiagnostics, waitForGatewayHealthyRestart }] = await Promise.all([
				import("./doctor-maintenance-restoration-BsGJ9-le.mjs"),
				import("./update-command-service-plan-5gqpZLSA.mjs"),
				import("./restart-health-D-HSQLyW.mjs")
			]);
			const { service, state, cfg: restoredConfig } = await restoreDoctorGatewayService({
				before,
				serviceEnv,
				root,
				env,
				cfg,
				writeConfig,
				options: params.options,
				runtime: params.runtime,
				signal: exit.signal,
				warnings,
				settle,
				assertCustody,
				assertRestoreAdmission,
				assertInstallationAdmission: assertUpdateAdmissionCurrent
			});
			if (!state) return;
			const port = await resolveUpdatedGatewayRestartPort({
				config: restoredConfig,
				serviceEnv: state.env,
				serviceCommand: state.command
			});
			const health = await settle(() => waitForGatewayHealthyRestart({
				service,
				port,
				env: state.env,
				requireRunningService: true,
				...staleReplacement ? {
					expectedVersion: staleReplacement.version,
					expectedBuildId: staleReplacement.buildId,
					requirePluginHealth: false
				} : {}
			}));
			if (health.waitOutcome === "still-starting") {
				const warning = renderRestartDiagnostics(health).join(" ");
				warn(warning);
				return;
			}
			if (!health.healthy) throw doctorGatewayMaintenanceError({
				env,
				phase: "gateway-restoration",
				code: "doctor-gateway-rpc-verification-failed",
				detail: `Doctor repaired state, but the managed Gateway did not become ready: ${renderRestartDiagnostics(health).join(" ")}.`
			});
		} catch (error) {
			if (hasCommandProcessCleanupError(error)) {
				cleanupFailure ??= { error };
				throw error;
			}
			if (error instanceof GatewayServiceAuthorityError) {
				const { formatDaemonServiceInstallCommand } = await import("./shared-Dl5LyzT6.mjs");
				const serviceEnv = before.serviceEnv;
				const outcome = error.outcome ?? "recovery-pending";
				const message = `Doctor could not finish Gateway installation or activation under its maintenance authority (${outcome}). ${outcome === "unchanged" ? "The previous service definition was left unchanged." : outcome === "restored" ? "The previous service definition was restored from its captured backup." : "Restoration was not verified; inspect the current service before replacing it."} Run \`${formatCliCommand("openclaw gateway status --deep", serviceEnv)}\`; after the active maintenance or update finishes, run \`${formatDaemonServiceInstallCommand(serviceEnv, before.servicePort)}\` from the active CLI. Reason: ${error.message}`;
				failureFacts.push(createUpdateFailureFact({
					check: "gateway-restoration",
					code: `${error.code}-${outcome}`,
					message
				}, serviceEnv));
				warnings.push(message);
				params.runtime.error(message);
				if (outcome === "recovery-pending") throw new UpdateDoctorError(message, failureFacts, { cause: error });
				return;
			}
			if (error instanceof UpdateDoctorError) throw error;
			throw doctorGatewayMaintenanceError({
				env,
				phase: "gateway-restoration",
				code: findServiceOwnershipRefusal(error)?.reason ?? "doctor-gateway-restoration-failed",
				detail: `The managed Gateway could not be restored after Doctor maintenance: ${String(error)}`,
				cause: error
			});
		}
		params.runtime.log("Gateway restarted and verified after Doctor repair.");
		if (staleReplacement) {
			const warning = `Warning: Replaced stale Gateway PID ${staleReplacement.pid ?? "unknown"} through its service manager; verified ${staleReplacement.version} build ${staleReplacement.buildId} after Doctor maintenance.`;
			warn(warning);
		}
	};
	const admitRepair = async () => {
		inspectingActivation = false;
		await assertLegacyGatewayStoppedForMaintenance(env);
		await acquireStoppedMaintenanceResources();
		assertUpdateAdmissionCurrent?.();
		await assertDoctorAgentLeaseAdmission(env);
		repairStoresMayBeOpen = true;
	};
	let admissionFailureHandled = false;
	const failAdmission = async (error, assertStopCustody) => {
		admissionFailureHandled = true;
		if (hasCommandProcessCleanupError(error)) throw error;
		try {
			if (stopped?.stopped) {
				try {
					await acquireStoppedMaintenanceResources();
				} catch (ownershipError) {
					const warning = ownershipError instanceof GatewayStateOwnerContentionError ? `Warning: The stopped Gateway still holds state ownership after the service stop deadline. Shared-state repair is unsafe while that writer remains active. Restoring its service; run ${formatCliCommand("openclaw gateway status --deep", env)}, then retry ${formatCliCommand("openclaw doctor --fix", env)} after shutdown completes.` : `Warning: Doctor could not reacquire maintenance ownership: ${String(ownershipError)} Restoring its service without repairing shared state.`;
					warn(warning);
				}
				const { readConfigFileSnapshot } = await import("./config/config.js");
				await finish((await readConfigFileSnapshot({
					skipPluginValidation: true,
					observe: false
				})).config, assertStopCustody, void 0, assertStopCustody ?? assertUpdateAdmissionCurrent);
			} else await release();
		} catch (restoreError) {
			throw new AggregateError([error, restoreError], `${String(error)} ${String(restoreError)}`, { cause: restoreError });
		}
		resolveCommandProcessSignal()?.throwIfAborted();
		if (authorityRefused || error instanceof DoctorUnreadableStateDatabaseError) throw error;
		const refusal = error instanceof DoctorMaintenanceRefusalError ? error : new DoctorMaintenanceRefusalError(`Doctor could not enter maintenance. ${String(error)}${hasGatewayServiceStopUnsafeError(error) ? "" : ` Stop the Gateway service and other OpenClaw processes using this state, then run ${formatCliCommand("openclaw doctor --fix", env)} from an independent shell.`}`, classifyDoctorMaintenanceRefusal(error), {
			cause: error,
			...error instanceof UpdateDoctorError ? { failureFacts: error.failureFacts } : {}
		});
		const recovery = inspectingActivation ? await resolveUpdateDoctorGitRecovery({ root: params.root }) : void 0;
		if (recovery) {
			refusal.message += `\n${recovery.message}`;
			recordUpdateDoctorRefusal(refusal.message);
		}
		throw refusal;
	};
	const exit = holdDoctorMaintenanceExit();
	const state = createDoctorMaintenanceState({
		params,
		env,
		signal: exit.signal,
		deadline: () => stopDeadline,
		assertCurrent: assertCallerCurrent,
		assertReadCurrent: () => assertUpdateAdmissionReadCurrent?.(),
		settle,
		warn
	});
	try {
		await settle(async () => {
			const externallyManaged = isServiceRepairExternallyManaged();
			if (externallyManaged) await preflightExternalDoctorAgentLease(env);
			if (params.root && isDefaultInstallIdentity(env) && !externallyManaged && await shouldManageGatewayService(env)) {
				const { maybeStopManagedServiceBeforeMutableUpdate } = await import("./update-command-service-maintenance-BHX-JwLG.mjs");
				inspectingActivation = true;
				const inspection = await maybeStopManagedServiceBeforeMutableUpdate({
					updateInstallKind: "package",
					root: params.root,
					shouldRestart: true,
					jsonMode: true,
					phase: "inspect"
				});
				assertDoctorMaintenanceInspection(inspection, env);
				if (inspection.serviceUpdateVerdict?.kind !== "absent" && inspection.offline !== true) assertAuthority(() => {
					const admitted = resolveDoctorUpdateAdmission(env);
					assertUpdateAdmissionReadCurrent = () => assertAuthority(admitted.assertCurrent);
					const checkAndRecord = () => assertAuthority(admitted.recordContinuation);
					assertUpdateAdmissionCurrent = () => state.owner ? state.owner.run(checkAndRecord) : checkAndRecord();
				});
				if (inspection.serviceUpdateVerdict?.kind === "owned" && inspection.serviceEnv) assertDoctorServiceSelection(env, inspection.serviceEnv);
				staleReplacement = await inspectStaleDoctorGateway({
					root: params.root,
					env,
					before: inspection,
					assertCurrent: assertUpdateAdmissionCurrent
				});
				if (parentActivation !== void 0 && !staleReplacement && inspection.serviceUpdateVerdict?.kind === "owned" && inspection.offline !== true) throw new DoctorMaintenanceRefusalError(`Doctor could not enter maintenance. Error: ${await formatUpdateDoctorServiceStopRefusal(inspection.serviceEnv ?? env)}`, {
					kind: "data-at-risk",
					reason: "gateway-state-unverified"
				});
				try {
					await state.acquire();
				} catch (error) {
					if (hasCommandProcessCleanupError(error)) throw error;
					const servingOwner = readGatewayOwnerLease({
						env,
						current: true,
						openStateSchemaReadAdmission: openDoctorStateSchemaReadAdmission
					});
					const legacyGatewayLock = servingOwner ? void 0 : await readActiveGatewayLockIdentity({
						env: inspection.serviceEnv ?? env,
						requireInspection: true
					});
					if (!inspection.running || !(servingOwner?.state === "live" && servingOwner.mode === "supervised" || inspection.servicePid !== void 0 && legacyGatewayLock?.pid === inspection.servicePid)) throw error;
				}
				if (inspection.serviceUpdateVerdict?.kind === "owned") {
					inspectingActivation = false;
					if (inspection.serviceEnv) assertDoctorServiceSelection(env, inspection.serviceEnv);
					if (parentActivation === void 0 || staleReplacement) {
						inspection.serviceUpdateVerdict.refreshDefinition = inspection.serviceUpdateVerdict.requiresInstallRootRefresh === true;
						const root = params.root;
						const { withGatewayServiceOperationLock } = await import("./service-operation-lock-_cJ3XUu6.mjs");
						await withGatewayServiceOperationLock(inspection.serviceEnv ?? env, async (assertStopCustody) => {
							let assertServiceCurrent = assertUpdateAdmissionCurrent;
							try {
								await settle(async () => {
									try {
										stopDeadline = performance.now() + GATEWAY_SERVICE_STOP_TIMEOUT_MS;
										const stopService = () => maybeStopManagedServiceBeforeMutableUpdate({
											updateInstallKind: "package",
											root,
											shouldRestart: true,
											jsonMode: true,
											expectedService: inspection,
											retainNativeIdentity: true,
											assertCurrent: () => assertServiceCurrent?.(),
											warn,
											onStopped: (before) => {
												stopped = before;
											}
										});
										stopped = await (state.resources ? state.resources.run(stopService) : stopService());
										assertDoctorMaintenanceInspection(stopped, env);
										if (stopped.serviceUpdateVerdict?.kind === "unavailable") warn(stopped.serviceUpdateVerdict.message);
										if (staleReplacement && stopped.serviceEnv) await assertStaleDoctorGatewayStopped({
											stale: staleReplacement,
											env: stopped.serviceEnv,
											assertCurrent: assertUpdateAdmissionCurrent
										});
									} catch (error) {
										if (!staleReplacement || hasCommandProcessCleanupError(error)) throw error;
										throw doctorGatewayMaintenanceError({
											env,
											phase: "gateway-stop",
											code: "stale-gateway-stop-failed",
											detail: String(error),
											cause: error
										});
									}
									if (stopped?.stopped) params.runtime.log("Stopped the managed Gateway for Doctor repair.");
									await admitRepair();
									assertStopCustody();
								});
							} catch (error) {
								assertServiceCurrent = assertStopCustody;
								await failAdmission(error, assertStopCustody);
							}
						});
					}
				} else if (inspection.serviceUpdateVerdict?.kind === "unavailable") warn(inspection.serviceUpdateVerdict.message);
				else if (inspection.serviceUpdateVerdict?.kind !== "absent") params.runtime.log("The stopped Gateway service was left unchanged; repairing Doctor's selected state only.");
			}
			if (!repairStoresMayBeOpen) await admitRepair();
			stopped?.windowsTaskAutoStartRecovery?.beginMutation();
			retainStoppedInstallation = stopped?.serviceUpdateVerdict?.kind === "owned" && stopped.serviceUpdateVerdict.requiresInstallRootRefresh === true;
			await state.relocateLegacyRoot();
		});
	} catch (error) {
		try {
			if (admissionFailureHandled) throw error;
			await failAdmission(error);
		} finally {
			exit.release(true);
		}
	}
	let custody = "held";
	const maintenance = {
		signal: exit.signal,
		warnings,
		failureFacts,
		get databaseWrites() {
			return state.receipt;
		},
		run: (operation) => state.resources.run(operation),
		releaseState: () => settle(releaseState),
		async release() {
			if (this !== maintenance) throw new Error("Gateway restoration requires its original live maintenance owner.");
			custody = "released";
			try {
				await release();
			} catch (error) {
				exit.release(true);
				throw error;
			} finally {
				exit.release();
			}
		},
		async finish(initialConfig, writeConfig, failure) {
			let cfg = initialConfig;
			if (cleanupFailure) throw cleanupFailure.error;
			const assertCustody = (expected = "restoring") => {
				if (this !== maintenance || custody !== expected) throw new Error("Gateway restoration requires its original live maintenance owner.");
			};
			assertCustody("held");
			custody = "restoring";
			let failed = failure !== void 0;
			try {
				if (!cfg && !stopped?.stopped) {
					await release(assertCustody);
					return;
				}
				if (classifyDoctorMaintenanceRefusal(failure).kind === "data-at-risk") {
					retainStoppedInstallation = true;
					await release(assertCustody);
					return;
				}
				if (!cfg) try {
					cfg = await readDoctorMaintenanceRecoveryConfig(state.resources, env, params.runtime.log);
				} catch (error) {
					retainStoppedInstallation = true;
					throw new DoctorMaintenanceRefusalError(`Doctor left the Gateway stopped because persisted repair state is not ready: ${formatErrorMessage(error)}`, {
						kind: "data-at-risk",
						reason: "incomplete-migration"
					}, { cause: error });
				}
				await finish(cfg, assertCustody, writeConfig);
			} catch (restoreError) {
				failed = true;
				if (failure !== void 0) throw new AggregateError([failure, restoreError], `${formatErrorMessage(failure)} ${formatErrorMessage(restoreError)}`, { cause: restoreError });
				throw restoreError;
			} finally {
				custody = "released";
				exit.release(failed);
			}
		}
	};
	return maintenance;
}
//#endregion
export { beginDoctorMaintenance };
