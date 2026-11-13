import { n as resolvePathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { m as resolveConfigPath } from "./paths-CtO6iw0c.mjs";
import "./openclaw-state-db-contract-CQDemVBb.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import "./update-run-timeouts-Byb-PlTk.mjs";
import { y as canResolveRegistryVersionForPackageTarget } from "./update-check-CJv8Mjkn.mjs";
import { t as withUpdateCommandExecutor } from "./update-command-executor-B6yk9cYV.mjs";
import { g as usesCandidateUpdateAdmission, n as UpdatePreMutationError } from "./shared-Dwr7djBO.mjs";
import { f as assertUpdatePackageActivationAdmission, l as withUpdateCommandTerminalResult, s as reportUnreportedUpdateAdmissionOutcome, v as recordUpdateCommandTarget } from "./update-command-terminal--2X6rdAF.mjs";
import { a as resolveUpdateTargetEnv, c as withOwnedManagedUpdateEnv, u as withUpdateInProgressEnv } from "./update-command-service-env-QsECikj0.mjs";
import { t as createUpdateProgress } from "./progress-Dl6WMBUB.mjs";
import { t as UnreportedUpdateAdmissionOutcome } from "./update-command-result-BUs0awIs.mjs";
import { a as withUpdateInitializationCleanup, n as confirmFreshUpdateDowngrade, r as initializeUpdateStateFromTarget, t as acquireLegacyUpdateInitializationFence } from "./update-command-initialization-Ch-GxSh9.mjs";
import { n as withPrivateStagedPackageInstall } from "./update-command-artifact-DPMG0oBO.mjs";
import { t as prepareUpdateCommandFailureTriage } from "./update-command-triage-wiOiRZOv.mjs";
import { a as preparePackageUpdateRuntime, n as preflightUpdateCommandSchemas, r as previewUpdateCommand } from "./update-command-schema-Dd9sJQYD.mjs";
import { a as inspectStagedUpdateCandidateAdmission, i as assertUpdateAdmissionConfigUnchanged, n as resolveUpdateCommandTarget, r as applyUpdateCandidateAdmission, t as resolveFreshUpdateMetadata } from "./update-command-target-BGY3H7b_.mjs";
import { randomUUID } from "node:crypto";
//#region src/cli/update-cli/update-command-initialization-run.ts
async function initializeAndRunUpdate(opts, prepared, recoveryState, invocationCwd, env, runInitialized, executorOptions) {
	const targetEnv = resolveUpdateTargetEnv({
		baseEnv: env,
		nodeRunner: process.execPath
	});
	const runId = env.OPENCLAW_UPDATE_RUN_ID?.trim() || randomUUID();
	let handleFailure;
	try {
		await withUpdateCommandTerminalResult((registerRun) => withUpdateInProgressEnv(invocationCwd, () => withUpdateCommandExecutor(runId, async (executor) => {
			const target = await withOwnedManagedUpdateEnv(targetEnv, () => resolveUpdateCommandTarget(opts, recoveryState, invocationCwd, prepared, executor, prepared.timeoutMs ?? 18e5));
			if (!target) return;
			const packageAdmission = { serviceRoot: target.managedServiceRoot };
			const initialization = {
				env,
				runId,
				executor,
				registerRun: async (run) => {
					registerRun(run);
					if (target.inspectionWarning) recordUpdateCommandTarget(run, { step: {
						step: "warning:installation-inspection",
						status: "completed",
						detail: target.inspectionWarning
					} });
					handleFailure = await prepareUpdateCommandFailureTriage({
						...opts,
						invocationCwd,
						run
					}, recoveryState.triageTarget);
				},
				target,
				databasePath: resolvePathViaExistingAncestorSync(resolveOpenClawStateSqlitePath(env)),
				configPath: resolvePathViaExistingAncestorSync(resolveConfigPath(env))
			};
			if (opts.dryRun) return await previewUpdateCommand({
				target,
				prepared,
				opts,
				runId,
				invocationCwd,
				updateStepTimeoutMs: prepared.timeoutMs ?? 18e5
			});
			const artifact = target.updateInstallKind === "package" && !canResolveRegistryVersionForPackageTarget(target.packageInstallSpec ?? target.tag);
			const candidateAdmissionEnabled = usesCandidateUpdateAdmission(opts, prepared.installKind) && target.updateInstallKind === "package";
			const stageParams = (presentation) => ({
				reapplyLocalOverrides: opts.reapplyLocalOverrides,
				root: target.root,
				installKind: prepared.installKind,
				tag: target.tag,
				installSpec: target.packageInstallSpec ?? void 0,
				timeoutMs: prepared.timeoutMs ?? 18e5,
				workTimeoutMs: prepared.timeoutMs ?? null,
				startedAt: prepared.startedAt,
				progress: presentation.progress,
				managedServiceEnv: env,
				invocationCwd,
				honorPackageRoot: target.managedServiceRootRedirect !== null || target.managedServiceNodeRunner !== void 0,
				nodeRunner: target.packageUpdateNodeRunner,
				installEnv: resolveUpdateTargetEnv({
					baseEnv: target.packageInstallEnv,
					serviceEnv: env,
					invocationCwd
				}),
				installTarget: target.packageInstallTarget,
				requirePackageReplacement: target.managedServiceRoot !== void 0,
				...candidateAdmissionEnabled ? {
					resolveLifecycleNodeRunner: () => target.packageUpdateNodeRunner,
					beforeVerifyCandidate: async (candidateRoot) => {
						const fence = await executor.enter(target.root, {
							preflight: true,
							serviceRoot: target.managedServiceRoot
						});
						const assertCurrent = () => {
							fence.assertCurrent();
							assertUpdatePackageActivationAdmission(target.root, packageAdmission);
						};
						try {
							initialization.candidateAdmission = await inspectStagedUpdateCandidateAdmission({
								target,
								prepared,
								opts,
								timeoutMs: prepared.timeoutMs ?? 18e5,
								invocationCwd,
								presentation,
								candidateRoot,
								runId,
								env,
								assertCurrent
							});
							applyUpdateCandidateAdmission({
								target,
								opts,
								result: initialization.candidateAdmission
							});
						} catch (error) {
							if (!(error instanceof UpdatePreMutationError)) throw error;
							throw new UnreportedUpdateAdmissionOutcome({
								root: target.root,
								mode: target.mode,
								installKind: target.updateInstallKind,
								opts,
								controlPlaneUpdateSentinelMeta: prepared.controlPlaneUpdateSentinelMeta,
								reason: error.reason,
								message: error.message,
								nextAction: error.nextAction,
								failureFacts: error.failureFacts,
								stepResult: error.stepResult,
								recoverySteps: error.recoverySteps
							});
						}
					}
				} : {}
			});
			const runSelectedTarget = async () => {
				assertUpdatePackageActivationAdmission(target.root, packageAdmission);
				if (target.updateInstallKind !== "package") return await runInitialized(initialization);
				const metadata = await resolveFreshUpdateMetadata(target);
				if (!metadata) return;
				const { version: targetVersion, schemaVersions: schemas } = metadata;
				if (schemas.state >= 19 && !artifact) return await runInitialized(initialization);
				const timeoutMs = prepared.timeoutMs ?? 18e5;
				const selectedStoredChannel = target.storedChannel;
				const candidateAdmissionChecks = initialization.candidateAdmission?.verdict?.verdict === "admit" ? initialization.candidateAdmission.verdict.facts.checks.map((check) => check.name) : void 0;
				const checkSchemas = async (phase) => {
					const { readUpdateChannelConfig } = await import("./update-command-config-CFtVG3bz.mjs");
					const config = await withOwnedManagedUpdateEnv(env, () => readUpdateChannelConfig(Boolean(opts.channel), { tolerateReadFailure: candidateAdmissionChecks?.includes("config") }));
					if (candidateAdmissionChecks?.includes("config") && phase !== "after") assertUpdateAdmissionConfigUnchanged(target.configSnapshot, config.configSnapshot);
					if (!opts.channel && config.storedChannel !== selectedStoredChannel) await target.refuseUpdate("update-channel-changed", "Stored update channel changed after target selection. Rerun the update, or specify --channel explicitly.");
					Object.assign(target, config);
					return await preflightUpdateCommandSchemas({
						...target,
						shouldRestart: prepared.shouldRestart,
						updateStepTimeoutMs: timeoutMs,
						invocationCwd,
						packageTargetVersion: target.targetVersion ?? void 0,
						opts,
						candidateAdmissionChecks,
						expectedForeground: prepared.controlPlaneUpdateSentinelMeta?.completionOwner === "gateway-restart" || void 0
					});
				};
				const schemaPreflight = await checkSchemas();
				if (!schemaPreflight) return;
				await confirmFreshUpdateDowngrade({
					target,
					opts,
					controlPlaneUpdateSentinelMeta: prepared.controlPlaneUpdateSentinelMeta
				});
				initialization.downgradeConfirmed = true;
				const runtime = await preparePackageUpdateRuntime({
					...target,
					managedService: schemaPreflight.service,
					shouldRestart: prepared.shouldRestart,
					opts,
					executor,
					timeoutMs
				});
				if (!runtime.ok) return await target.refuseUpdate("node-runtime-preflight", runtime.error, runtime.failureFacts, runtime.recoverySteps);
				target.packageUpdateNodeRunner = runtime.value.nodeRunner;
				if (schemas.state >= 19) return await runInitialized(initialization);
				const fence = await executor.enter(target.root, {
					preflight: true,
					serviceRoot: target.managedServiceRoot
				});
				const { stagePackageInstallUpdate } = await import("./update-command-package-DQ9duhv1.mjs");
				fence.assertCurrent();
				assertUpdatePackageActivationAdmission(target.root, packageAdmission);
				const legacyFence = acquireLegacyUpdateInitializationFence({
					env,
					targetVersion,
					targetSchemas: schemas
				});
				let initializationStage;
				const assertCurrent = () => {
					fence.assertCurrent();
					assertUpdatePackageActivationAdmission(target.root, packageAdmission);
					legacyFence?.assertCurrent();
				};
				await withUpdateInitializationCleanup(async () => {
					const initialize = async () => {
						const presentation = createUpdateProgress(!opts.json);
						try {
							await checkSchemas();
							assertCurrent();
							if (!target.packageAlreadyCurrent && !initialization.stagedPackage) {
								initializationStage = await stagePackageInstallUpdate(stageParams(presentation));
								initialization.stagedPackage = initializationStage;
							}
							assertCurrent();
							await initializeUpdateStateFromTarget({
								root: initialization.stagedPackage?.root ?? target.root,
								env,
								timeoutMs,
								workTimeoutMs: prepared.timeoutMs ?? null,
								nodeRunner: target.packageUpdateNodeRunner,
								invocationCwd,
								progress: presentation.progress,
								assertCurrent,
								checkSchemas: async (phase) => void await checkSchemas(phase)
							});
						} finally {
							presentation.dispose();
						}
					};
					await withUpdateInitializationCleanup(() => legacyFence ? legacyFence.run(initialize) : initialize(), () => legacyFence?.release());
					await runInitialized(initialization);
				}, () => initializationStage?.close());
			};
			const runWithSelectedProfile = async () => {
				if (artifact) {
					const { runFreshUpdateArtifact } = await import("./update-command-artifact-Dw7-Tfkj.mjs");
					return await runFreshUpdateArtifact({
						initialization,
						stageParams,
						json: Boolean(opts.json)
					}, runSelectedTarget);
				}
				if (candidateAdmissionEnabled && target.packageTargetSchemaVersions && target.packageTargetSchemaVersions.state < 19) {
					const presentation = createUpdateProgress(!opts.json);
					try {
						return await withPrivateStagedPackageInstall(stageParams(presentation), async ({ stage }) => {
							initialization.stagedPackage = stage;
							return await runSelectedTarget();
						});
					} finally {
						presentation.dispose();
					}
				}
				return await runSelectedTarget();
			};
			return candidateAdmissionEnabled ? await withOwnedManagedUpdateEnv(env, () => withUpdateInProgressEnv(invocationCwd, runWithSelectedProfile)) : await runWithSelectedProfile();
		}, executorOptions)), opts);
	} catch (error) {
		if (!handleFailure) return await reportUnreportedUpdateAdmissionOutcome(error);
		await handleFailure(error);
	}
}
//#endregion
export { initializeAndRunUpdate };
