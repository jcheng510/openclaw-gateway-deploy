import { i as extractErrorCode } from "./error-coercion-1P2One0X.mjs";
import { n as tryProcessCwd } from "./safe-cwd-DOxDm8mD.mjs";
import { n as createNonExitingRuntime, r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { i as watchCliExitAfterOutput, o as getPendingCliDisposers, t as exitCliAfterOutput } from "./one-shot-exit-BzmTIPQe.mjs";
import { n as hasCliProcessScope, r as retainCliProcessJobUntilExit } from "./runtime-cleanup-scope-Bcfqw4Hq.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { o as resolveAggregateSqliteInspectionTimeoutMs } from "./sqlite-readonly-worker-cuICqy4r.mjs";
import "./update-post-core-context-B2x24New.mjs";
import { n as readUpdateRunDriver } from "./update-run-driver-CSLAE9i6.mjs";
import { a as UPDATE_RUN_HEARTBEAT_MS } from "./update-run-timeouts-Byb-PlTk.mjs";
import { r as theme } from "./theme-DzaUZY4q.mjs";
import { r as hasCommandProcessCleanupError } from "./exec-result-C1iGiwu0.mjs";
import { l as withCommandProcessScope, n as resolveCommandProcessSignal } from "./exec-spawn-B_BFgGrb.mjs";
import { r as readPackageVersion } from "./package-json-7gGhB8Vf.mjs";
import { c as normalizeUpdateChannel, i as UPDATE_EFFECTIVE_CHANNEL_ENV } from "./update-channels-YuXTW0De.mjs";
import { c as resolveUpdateInstallKind } from "./update-check-CJv8Mjkn.mjs";
import { s as redactSupportDiagnosticLine } from "./diagnostic-support-redaction-DYsNZIjV.mjs";
import { r as assertOpenClawStateWriteAllowedAtPath } from "./openclaw-state-ownership-1l-TMJat.mjs";
import { n as createUpdateFailureFact } from "./update-failure-facts-RzGaiYBm.mjs";
import { r as loadInstalledPluginIndexInstallRecords } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import { a as UpdateDoctorError, m as normalizeUpdatePostInstallDoctorWarnings, t as DoctorMaintenanceRefusalError } from "./update-doctor-result-BlDxecnI.mjs";
import { r as assertConfigWriteAllowedInCurrentMode } from "./config-write-guard-DgZDKy-v.mjs";
import { c as readConfigFileSnapshot } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { t as formatUpdateRunOwnership } from "./update-run-activity-8Zl-pDYm.mjs";
import { c as recordUpdateRunDiagnostic, d as recordUpdateRunRepairContinuation, f as recordUpdateRunStep, h as reconcileAbandonedUpdateRunsAsync, l as recordUpdateRunPhase, n as adoptUpdateRun, o as heartbeatUpdateRun, r as createUpdateRun, t as acknowledgeAbandonedUpdateRun } from "./update-run-ledger-C5c7VrBu.mjs";
import { t as finishUpdateRun } from "./update-run-write-rWyADCOZ.mjs";
import { i as getUpdateRun } from "./update-run-reader-DZIHUks3.mjs";
import { t as resolveNodeRunner } from "./node-runner-DIokVayT.mjs";
import { r as withPluginLifecycleLease } from "./plugin-lifecycle-lease-BgmqKrMY.mjs";
import "./installed-plugin-index-records-DHEAmSsp.mjs";
import { r as createUpdateOperationDeadline } from "./update-command-executor-B6yk9cYV.mjs";
import { i as UPDATE_RUN_ID_ENV } from "./update-control-plane-sentinel-CB0F6AWU.mjs";
import { c as parseUpdateTimeoutMs, h as tryWriteCompletionCache, p as resolveUpdateRoot } from "./shared-Dwr7djBO.mjs";
import { S as suppressDeprecations, o as reportPreMutationUpdateResult } from "./update-command-terminal--2X6rdAF.mjs";
import { a as preparePostCorePluginConfig, i as persistValidatedDowngradeConfig, o as readPostCorePreUpdateSourceConfig, r as persistRequestedUpdateChannel, t as capturePreUpdateSourceConfig } from "./update-command-config-BZhg-nUW.mjs";
import { a as withPrePluginUpdateDoctorEnv, i as runUpdateFinalizationDoctorInFreshProcess, n as settleUpdateDoctorMaintenance, o as UpdateFinalizationOutput, r as completePostCorePluginUpdate, s as completeSourceUpdateRuntime, t as updatePluginsAfterCoreUpdate } from "./update-command-plugins-BU_OxQ0J.mjs";
import { i as resolveServiceRefreshEnv, u as withUpdateInProgressEnv } from "./update-command-service-env-QsECikj0.mjs";
import { p as readUpdateStateDatabaseSizes } from "./update-candidate-state-DSdpv9IU.mjs";
import { n as createUpdateConfigSnapshot } from "./update-command-config-snapshot-DAFe1zyY.mjs";
import { a as collectPostCorePluginFailureFacts, i as collectPostCorePluginAdvisories } from "./update-command-plugins-internals-DKt7rsYn.mjs";
import { t as assertUpdateRecoveryAdmission } from "./update-run-recovery-admission-D2B4sqip.mjs";
import { n as UpdateCommandFailure, r as UpdateCommandFinalizedRecoveryFailure, v as withUpdateAdmissionReporting } from "./update-command-result-BUs0awIs.mjs";
import { t as readResolvedDeferredPluginMigrationWarnings } from "./deferred-plugin-migration-warnings-CzAuuLg_.mjs";
import { n as withUpdateFailureTriage } from "./update-command-triage-wiOiRZOv.mjs";
import { readlinkSync, writeSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
//#region src/cli/update-cli/update-finalization-processes.ts
const MAX_CHILD_PROCESSES = 8;
const MAX_COMMAND_LENGTH = 64;
/** Inspect names, never argv or environment, only when finalization is already stalled. */
function inspectUpdateFinalizationChildren() {
	const windows = process.platform === "win32";
	const inspector = windows ? path.win32.join(process.env.SystemRoot ?? "C:\\Windows", "System32", "WindowsPowerShell", "v1.0", "powershell.exe") : "/bin/ps";
	const args = windows ? [
		"-NoProfile",
		"-NonInteractive",
		"-Command",
		"Get-CimInstance Win32_Process | ForEach-Object { \"{0} {1} {2}\" -f $_.ProcessId,$_.ParentProcessId,$_.Name }"
	] : ["-axo", process.platform === "linux" ? "pid=,ppid=" : "pid=,ppid=,ucomm="];
	const result = spawnSync(inspector, args, {
		encoding: "utf8",
		stdio: [
			"ignore",
			"pipe",
			"ignore"
		],
		timeout: 1e3,
		killSignal: "SIGKILL",
		maxBuffer: 1048576,
		windowsHide: true
	});
	if (result.error || result.status !== 0 || !result.stdout) return {
		childProcesses: [],
		childProcessInspection: "unavailable",
		childProcessesTruncated: false
	};
	const processes = result.stdout.split("\n").flatMap((line) => {
		const match = /^\s*(\d+)\s+(\d+)(?:\s+(.+?))?\s*$/u.exec(line);
		if (!match) return [];
		const [, pid, parentPid, command = ""] = match;
		if (!pid || !parentPid || process.platform !== "linux" && !command) return [];
		return [{
			pid: Number(pid),
			parentPid: Number(parentPid),
			command
		}];
	});
	const childrenByParent = /* @__PURE__ */ new Map();
	for (const child of processes) {
		const children = childrenByParent.get(child.parentPid) ?? [];
		children.push(child);
		childrenByParent.set(child.parentPid, children);
	}
	const parents = /* @__PURE__ */ new Set([process.pid]);
	const pending = [process.pid];
	const childProcesses = [];
	for (const parentPid of pending) for (const child of childrenByParent.get(parentPid) ?? []) {
		if (parents.has(child.pid) || child.pid === result.pid) continue;
		parents.add(child.pid);
		pending.push(child.pid);
		childProcesses.push(child);
	}
	return {
		childProcesses: childProcesses.toSorted((a, b) => a.pid - b.pid).slice(0, MAX_CHILD_PROCESSES).map((child) => {
			let executable = child.command;
			if (process.platform === "linux") try {
				executable = readlinkSync(`/proc/${child.pid}/exe`);
			} catch {
				return {
					pid: child.pid,
					parentPid: child.parentPid,
					command: null
				};
			}
			return {
				pid: child.pid,
				parentPid: child.parentPid,
				command: (windows ? path.win32 : path.posix).basename(executable).slice(0, MAX_COMMAND_LENGTH)
			};
		}),
		childProcessInspection: "complete",
		childProcessesTruncated: childProcesses.length > MAX_CHILD_PROCESSES
	};
}
//#endregion
//#region src/cli/update-cli/update-finalization-lifecycle.ts
var UpdateFinalizationLifecycle = class {
	constructor(json, timeoutMs, stopChildren) {
		this.json = json;
		this.timeoutMs = timeoutMs;
		this.stopChildren = stopChildren;
		this.startedAt = performance.now();
		this.phaseTimings = [];
		this.ownsRun = false;
		this.warnedHeartbeat = false;
		this.completed = false;
	}
	get ownsUpdateRun() {
		return this.ownsRun;
	}
	attachLedger(repair = false) {
		this.driver = readUpdateRunDriver();
		const inherited = process.env[UPDATE_RUN_ID_ENV]?.trim();
		this.ledgerOptions = { env: { ...process.env } };
		const admissionOptions = {
			...this.ledgerOptions,
			busyTimeoutMs: this.budget("preflight")
		};
		this.runId = createUpdateRun({
			runId: inherited || void 0,
			trigger: "cli"
		}, admissionOptions).runId;
		this.ownsRun = !inherited;
		adoptUpdateRun(this.runId, admissionOptions);
		if (repair && this.ownsRun) recordUpdateRunRepairContinuation(this.runId, this.runId, admissionOptions);
		if (this.active) recordUpdateRunStep(this.runId, {
			step: this.active.step,
			status: "in_progress",
			startedAtMs: this.active.startedAtMs
		}, admissionOptions);
		return this.runId;
	}
	recordInstallKind(installKind, version) {
		if (this.runId && this.ownsRun && installKind !== "unknown") recordUpdateRunPhase(this.runId, "requested", {
			target: {
				kind: installKind,
				...version ? { version } : {}
			},
			...version ? { after: { version } } : {},
			...installKind === "package" && this.ledgerOptions?.env["OPENCLAW_UPDATE_POST_CORE"] !== "1" ? { step: {
				step: "finalize:package-rollback-not-needed",
				status: "skipped",
				endedAtMs: Date.now(),
				detail: "No package mutation during standalone finalization."
			} } : {}
		}, this.ledgerOptions);
	}
	record(active, status, at, detail, failureFacts, exitCode) {
		const step = {
			step: active.step,
			status,
			...detail ? { detail } : {},
			...failureFacts?.length ? { failureFacts } : {},
			...exitCode !== void 0 ? { exitCode } : {},
			...status === "failed" ? { reason: failureFacts?.find((fact) => fact.code.trim() && fact.code !== "finalization-failed")?.code ?? active.step } : {},
			...status === "in_progress" ? { startedAtMs: at } : { endedAtMs: at }
		};
		defaultRuntime.error(`[update finalize] ${JSON.stringify(step)}`);
		if (this.runId) try {
			recordUpdateRunStep(this.runId, step, this.ledgerOptions);
		} catch {
			defaultRuntime.error("[update finalize] Could not persist phase diagnostic.");
		}
	}
	recordWarnings(warnings, phase = "doctor") {
		warnings.forEach((detail, index) => {
			this.record({
				phase,
				step: `warning:finalize:${phase}:${index}`
			}, "completed", Date.now(), detail);
		});
	}
	budget(phase) {
		const budgetMs = this.timeoutMs ?? (phase === "doctor" || phase === "targetConfigConvergence" ? void 0 : phase === "plugins" ? 12e5 : this.stateBudgetMs ?? resolveAggregateSqliteInspectionTimeoutMs("update finalization", []));
		return budgetMs === void 0 ? void 0 : Math.min(budgetMs, 2147483647);
	}
	async run(phase, run, outcome, custody) {
		this.stateBudgetMs ??= this.timeoutMs ?? resolveAggregateSqliteInspectionTimeoutMs("update finalization", await readUpdateStateDatabaseSizes([resolveOpenClawStateSqlitePath(process.env)], {
			nodeRunner: process.execPath,
			sourceEnv: { ...process.env },
			stagingRoot: os.tmpdir()
		}));
		const startedAt = performance.now();
		const startedAtMs = Date.now();
		const budgetMs = phase === "plugins" && this.timeoutMs === void 0 ? void 0 : this.budget(phase);
		const active = {
			phase,
			step: `finalize:${phase}`,
			startedAtMs
		};
		this.active = active;
		this.record(active, "in_progress", startedAtMs);
		const output = new UpdateFinalizationOutput();
		const heartbeat = phase === "doctor" || phase === "targetConfigConvergence" ? void 0 : setInterval(() => {
			try {
				if (this.runId) heartbeatUpdateRun(this.runId, this.driver, this.ledgerOptions);
			} catch (error) {
				if (!this.warnedHeartbeat) {
					this.warnedHeartbeat = true;
					console.warn(`[update finalize] Could not refresh the update heartbeat; continuing: ${formatErrorMessage(error).slice(0, 500)}`);
				}
			}
		}, UPDATE_RUN_HEARTBEAT_MS);
		heartbeat?.unref();
		const end = (result, detail, failureFacts, exitCode) => {
			this.phaseTimings.push({
				phase,
				startedOffsetMs: Math.max(0, Math.round(startedAt - this.startedAt)),
				durationMs: Math.max(0, Math.round(performance.now() - startedAt)),
				outcome: result
			});
			this.record(active, result === "failed" ? "failed" : result === "deferred" ? "skipped" : "completed", Date.now(), detail, failureFacts, exitCode);
		};
		let stopPhaseChildren = () => {};
		let doctorOutput;
		const deadline = createUpdateOperationDeadline((failure) => {
			let diagnostics = {
				childProcesses: [],
				childProcessInspection: "unavailable",
				childProcessesTruncated: false
			};
			try {
				diagnostics = inspectUpdateFinalizationChildren();
			} catch {}
			doctorOutput = output.snapshot();
			stopPhaseChildren();
			this.reportTimeout = () => {
				writeSync(2, `${failure.message}\n`);
				if (doctorOutput) writeSync(2, `[update finalize] Doctor output: ${JSON.stringify(doctorOutput)}\n`);
				writeSync(2, `[update finalize] Stalled phase children: ${JSON.stringify(diagnostics)}\n`);
				this.recordDiagnostic(JSON.stringify(diagnostics));
				if (this.json) defaultRuntime.writeJson({
					status: "failed",
					mode: "finalize",
					root: this.root,
					restart: false,
					stuckPhase: phase,
					elapsedMs: Math.round(performance.now() - this.startedAt),
					error: failure.message,
					phaseTimings: this.phaseTimings,
					...diagnostics,
					...doctorOutput ? { doctorOutput } : {}
				});
			};
		});
		const scope = {
			signal: resolveCommandProcessSignal(deadline.signal) ?? deadline.signal,
			assertCurrent: () => {
				deadline.assertCurrent();
				scope.signal.throwIfAborted();
			}
		};
		try {
			await withCommandProcessScope(async () => {
				await custody?.enter?.();
			});
			if (budgetMs !== void 0 && hasCliProcessScope()) {
				const failure = new UpdateCommandFinalizedRecoveryFailure({
					status: "error",
					mode: "unknown",
					root: this.root,
					reason: "finalization-timeout",
					steps: [],
					durationMs: Math.round(performance.now() - this.startedAt)
				});
				failure.message = `Update finalization timed out in ${phase} after ${budgetMs}ms`;
				deadline.start(failure, budgetMs);
			}
			const result = await deadline.run(() => withCommandProcessScope(async (stop) => {
				stopPhaseChildren = stop;
				scope.assertCurrent();
				return await output.run(() => run(scope));
			}, scope.signal));
			await withCommandProcessScope(async () => {
				await custody?.restore?.(result);
			});
			const completed = outcome?.(result) ?? "completed";
			end(typeof completed === "string" ? completed : completed.outcome, void 0, typeof completed === "string" ? void 0 : completed.failureFacts);
			return result;
		} catch (error) {
			const failure = deadline.failure;
			if (failure) this.record({
				phase,
				step: `warning:finalize:${phase}:deadline`
			}, "completed", Date.now(), failure.message);
			const facts = failure ? [createUpdateFailureFact({
				check: phase,
				code: "finalization-timeout",
				message: failure.message
			})] : error instanceof UpdateDoctorError ? error.failureFacts : [createUpdateFailureFact({
				check: phase,
				code: extractErrorCode(error) ?? "finalization-failed",
				message: formatErrorMessage(error)
			})];
			const deferred = !failure && error instanceof DoctorMaintenanceRefusalError && error.refusal.kind === "deferred";
			end(deferred ? "deferred" : "failed", doctorOutput ? formatDoctorOutputDetail(doctorOutput) : redactSupportDiagnosticLine(formatErrorMessage(error), {
				env: process.env,
				stateDir: resolveStateDir(process.env)
			}), deferred ? void 0 : facts, !deferred && error instanceof UpdateDoctorError ? error.exitCode : void 0);
			throw error;
		} finally {
			clearInterval(heartbeat);
			this.active = void 0;
			output.close();
		}
	}
	async observeFailure(error) {
		if (!this.root || !this.runId || !this.ledgerOptions || hasCommandProcessCleanupError(error)) return;
		const { env } = this.ledgerOptions;
		const { verifyUpdateFailureRecovery } = await import("./update-command-failure-recovery-CTPMSGfR.mjs");
		const result = error instanceof UpdateCommandFailure ? error.result : {
			status: "error",
			mode: "unknown",
			root: this.root,
			steps: [],
			durationMs: Math.round(performance.now() - this.startedAt)
		};
		try {
			this.failureObservation = await verifyUpdateFailureRecovery({
				result,
				root: this.root,
				opts: {
					json: this.json,
					run: {
						runId: this.runId,
						env
					}
				},
				env,
				timeoutMs: this.timeoutMs
			});
			return this.failureObservation;
		} catch (recoveryError) {
			if (hasCommandProcessCleanupError(recoveryError) && recoveryError !== error) throw new AggregateError([error, recoveryError], "Update failure recovery did not settle", { cause: recoveryError });
			throw recoveryError;
		}
	}
	finishLedger(exitCode) {
		if (this.runId && this.ownsRun) try {
			finishUpdateRun(this.runId, {
				status: exitCode ? "failed" : "succeeded",
				diagnostics: this.failureObservation
			}, this.ledgerOptions);
		} catch {
			defaultRuntime.error("[update finalize] Could not persist final outcome.");
		}
	}
	recordDiagnostic(diagnostic) {
		if (this.runId) try {
			recordUpdateRunDiagnostic(this.runId, diagnostic, this.ledgerOptions);
		} catch {}
	}
	fail() {
		this.finishLedger(1);
	}
	finishRecovery() {
		const watch = this.deferredExitWatch;
		this.deferredExitWatch = void 0;
		watch?.();
	}
	complete(exitCode) {
		if (this.completed) return;
		this.completed = true;
		this.finishLedger(exitCode);
		this.reportTimeout?.();
		if (!hasCliProcessScope()) return;
		this.deferredExitWatch = () => watchCliExitAfterOutput(exitCode, () => {
			const diagnostic = JSON.stringify({
				activeResources: [...new Set(process.getActiveResourcesInfo())].toSorted(),
				unsettledDisposers: getPendingCliDisposers(),
				...inspectUpdateFinalizationChildren()
			});
			writeSync(2, `[update finalize] Process still alive after terminal output: ${diagnostic}\n`);
			this.recordDiagnostic(diagnostic);
			this.stopChildren();
		});
	}
};
function formatDoctorOutputDetail(output) {
	return [`Doctor ${output.phase} received output:`, ...["stdout", "stderr"].map((name) => {
		const stream = output[name];
		return `${name} ${stream.receivedBytes} bytes, last ${stream.lastOutputAgeMs ?? "none"}ms: ${"omitted" in stream ? `[omitted: ${stream.omitted}]` : stream.excerpt}`;
	})].join("\n");
}
//#endregion
//#region src/cli/update-cli/update-command-finalize.ts
async function updateFinalizeCommand(opts, recoveryRunIds) {
	const invocationCwd = tryProcessCwd();
	suppressDeprecations();
	const timeoutMs = parseUpdateTimeoutMs(opts.timeout);
	const requestedChannel = normalizeUpdateChannel(opts.channel);
	if (opts.channel !== void 0 && !requestedChannel) {
		defaultRuntime.error(`--channel must be "stable", "extended-stable", "beta", or "dev" (got "${opts.channel}")`);
		defaultRuntime.exit(1);
		return;
	}
	let exitCode;
	await withCommandProcessScope(async (stopChildren) => {
		const lifecycle = new UpdateFinalizationLifecycle(Boolean(opts.json), timeoutMs, stopChildren);
		try {
			const { root, installKind, runId } = await withUpdateAdmissionReporting(opts, () => withCommandProcessScope(() => withUpdateInProgressEnv(invocationCwd, () => lifecycle.run("preflight", async (phase) => {
				await assertUpdateRecoveryAdmission({ env: process.env });
				assertConfigWriteAllowedInCurrentMode();
				await assertOpenClawStateWriteAllowedAtPath({
					databasePath: resolveOpenClawStateSqlitePath(process.env),
					recoverOrphanedSidecars: false
				});
				await retainCliProcessJobUntilExit();
				phase.assertCurrent();
				const admittedRunId = lifecycle.attachLedger(recoveryRunIds !== void 0);
				const resolvedRoot = await resolveUpdateRoot();
				const resolvedInstallKind = await resolveUpdateInstallKind(resolvedRoot, { timeoutMs: lifecycle.budget("preflight") });
				lifecycle.recordInstallKind(resolvedInstallKind, await readPackageVersion(resolvedRoot));
				return {
					root: resolvedRoot,
					installKind: resolvedInstallKind,
					runId: admittedRunId
				};
			}))), recoveryRunIds === void 0 ? "finalize" : "unknown");
			lifecycle.root = root;
			const nodeRunner = resolveNodeRunner();
			const target = {
				root,
				nodeRunner,
				env: {
					...resolveServiceRefreshEnv(process.env, invocationCwd),
					[UPDATE_RUN_ID_ENV]: runId
				}
			};
			await withUpdateFailureTriage({
				...opts,
				invocationCwd,
				run: {
					runId,
					env: target.env
				}
			}, target, () => withUpdateInProgressEnv(invocationCwd, async () => {
				try {
					await (await withCommandProcessScope(async () => {
						return await updateFinalizeCommandInternal(opts, {
							...await lifecycle.run("targetConfigValidation", (phase) => prepareUpdateFinalization(opts, root, installKind, requestedChannel, phase)),
							nodeRunner
						}, lifecycle, recoveryRunIds ?? [], runId, recoveryRunIds !== void 0 || lifecycle.ownsUpdateRun);
					}))();
				} catch (error) {
					if (hasCommandProcessCleanupError(error)) throw error;
					if (error instanceof DoctorMaintenanceRefusalError && error.refusal.kind === "deferred") {
						const warnings = normalizeUpdatePostInstallDoctorWarnings([`Doctor and plugin maintenance remain pending. Resolve the maintenance refusal, then run ${formatCliCommand("openclaw update repair")}. ${error.message}`]);
						lifecycle.recordWarnings(warnings);
						defaultRuntime.error(warnings[0]);
						if (opts.json) defaultRuntime.writeJson({
							status: "warning",
							mode: "finalize",
							root,
							restart: false,
							phaseTimings: lifecycle.phaseTimings,
							postUpdate: { doctor: {
								status: "warning",
								warnings
							} }
						});
						else defaultRuntime.log(theme.warn("Update finalization completed with warnings."));
						lifecycle.complete(0);
						return;
					}
					if (!lifecycle.completed) target.failureResult = await lifecycle.observeFailure(error);
					if (error instanceof UpdateCommandFailure) lifecycle.complete(error.exitCode);
					else lifecycle.fail();
					throw error;
				}
			}));
		} catch (error) {
			if (hasCommandProcessCleanupError(error)) throw error;
			if (error instanceof UpdateCommandFinalizedRecoveryFailure) {
				lifecycle.complete(error.exitCode);
				exitCode = error.exitCode;
				return;
			}
			if (!lifecycle.completed) lifecycle.fail();
			throw error;
		} finally {
			lifecycle.finishRecovery();
		}
	});
	if (exitCode !== void 0) exitCliAfterOutput(defaultRuntime, exitCode);
}
async function prepareUpdateFinalization(opts, root, installKind, requestedChannel, phase) {
	await assertOpenClawStateWriteAllowedAtPath({ databasePath: resolveOpenClawStateSqlitePath(process.env) });
	let configSnapshot = await readConfigFileSnapshot({
		skipPluginValidation: true,
		observe: false
	});
	const preFinalizeConfig = await readPostCorePreUpdateSourceConfig({
		sourceConfigPath: process.env["OPENCLAW_UPDATE_POST_CORE_SOURCE_CONFIG_PATH"],
		currentSnapshot: configSnapshot
	}) ?? capturePreUpdateSourceConfig(configSnapshot);
	if (requestedChannel === "extended-stable" && installKind === "git") await reportPreMutationUpdateResult({
		root,
		installKind,
		reason: "unsupported_git_channel",
		opts,
		controlPlaneUpdateSentinelMeta: null
	});
	const storedChannel = configSnapshot.valid ? normalizeUpdateChannel(configSnapshot.config.update?.channel) : null;
	const effectiveChannel = normalizeUpdateChannel(process.env[UPDATE_EFFECTIVE_CHANNEL_ENV]?.trim());
	const channel = requestedChannel ?? storedChannel ?? effectiveChannel ?? "stable";
	if (requestedChannel) configSnapshot = await withPluginLifecycleLease(phase, async () => {
		const snapshot = await readConfigFileSnapshot({
			skipPluginValidation: true,
			observe: false
		});
		return await persistRequestedUpdateChannel({
			configSnapshot: snapshot,
			requestedChannel,
			assertCurrent: phase.assertCurrent
		});
	});
	return {
		root,
		installKind,
		configSnapshot,
		preFinalizeConfig,
		requestedChannel,
		storedChannel,
		effectiveChannel,
		channel
	};
}
async function updateFinalizeCommandInternal(opts, prepared, lifecycle, recoveryRunIds, invokingRunId, ownsMaintenance) {
	const { root, nodeRunner, preFinalizeConfig, requestedChannel, storedChannel, effectiveChannel, channel } = prepared;
	let { configSnapshot } = prepared;
	let doctorWarnings = [];
	const doctorWarningTimes = /* @__PURE__ */ new Map();
	const onDoctorWarnings = (warnings) => {
		doctorWarnings = normalizeUpdatePostInstallDoctorWarnings([.../* @__PURE__ */ new Set([...doctorWarnings, ...warnings])]);
		for (const warning of doctorWarnings) if (!doctorWarningTimes.has(warning)) doctorWarningTimes.set(warning, Date.now());
		lifecycle.recordWarnings(doctorWarnings);
	};
	let maintenance;
	const restoreMaintenance = async (cfg) => {
		const owned = maintenance;
		maintenance = void 0;
		await owned?.finish(cfg);
		if (owned?.warnings?.length) onDoctorWarnings(owned.warnings);
	};
	let outcome;
	try {
		if (prepared.installKind === "git") await withPluginLifecycleLease({}, async (lease) => {
			await withCommandProcessScope(() => completeSourceUpdateRuntime({
				root,
				timeoutMs: lifecycle.budget("plugins"),
				lease
			}));
		});
		const initialPluginUpdate = await withPrePluginUpdateDoctorEnv(async () => {
			await lifecycle.run("configSnapshot", () => createUpdateConfigSnapshot());
			await lifecycle.run("doctor", () => runUpdateFinalizationDoctorInFreshProcess({
				phase: "pre-plugin",
				root,
				nodeRunner,
				runId: invokingRunId,
				yes: opts.yes === true,
				json: opts.json === true,
				workspaceSuggestions: true,
				timeoutMs: lifecycle.budget("doctor"),
				onWarnings: onDoctorWarnings
			}), void 0, { enter: async () => {
				if (!ownsMaintenance) return;
				const { beginDoctorMaintenance } = await import("./doctor-maintenance-D5eCzZ_2.mjs");
				maintenance = await beginDoctorMaintenance({
					root,
					runId: invokingRunId,
					options: {
						repair: true,
						nonInteractive: true,
						json: opts.json
					},
					runtime: {
						...defaultRuntime,
						log: defaultRuntime.error
					}
				});
				await maintenance?.releaseState();
			} });
			return await lifecycle.run("plugins", (phase) => withPluginLifecycleLease(phase, async () => {
				return await withCommandProcessScope(async () => {
					const preparedConfig = await preparePostCorePluginConfig({
						requestedChannel,
						preUpdateConfig: preFinalizeConfig,
						assertCurrent: phase.assertCurrent
					});
					configSnapshot = preparedConfig.configSnapshot;
					const postDoctorStoredChannel = configSnapshot.valid ? normalizeUpdateChannel(configSnapshot.config.update?.channel) : null;
					const postDoctorChannel = requestedChannel ?? postDoctorStoredChannel ?? storedChannel ?? effectiveChannel ?? "stable";
					const pluginInstallRecords = await loadInstalledPluginIndexInstallRecords();
					return await updatePluginsAfterCoreUpdate({
						root,
						channel: postDoctorChannel,
						...preparedConfig,
						json: opts.json,
						acceptCapabilities: opts.acceptCapabilities,
						timeoutMs: lifecycle.budget("plugins"),
						workTimeoutMs: parseUpdateTimeoutMs(opts.timeout) ?? null,
						pluginInstallRecords,
						assertCurrent: phase.assertCurrent,
						runtime: createNonExitingRuntime()
					});
				});
			}), pluginOutcome);
		});
		const completedPluginUpdate = await lifecycle.run("targetConfigConvergence", async (phase) => {
			const result = await completePostCorePluginUpdate({
				root,
				nodeRunner,
				runId: invokingRunId,
				pluginUpdate: initialPluginUpdate,
				freshDoctorRequired: initialPluginUpdate.changed,
				yes: opts.yes === true,
				json: opts.json === true,
				timeoutMs: lifecycle.budget("targetConfigConvergence"),
				onWarnings: onDoctorWarnings
			});
			const resolvedWarnings = await readResolvedDeferredPluginMigrationWarnings(doctorWarnings);
			phase.assertCurrent();
			doctorWarnings = doctorWarnings.filter((warning) => {
				const completedAtMs = resolvedWarnings.get(warning);
				return completedAtMs === void 0 || completedAtMs < (doctorWarningTimes.get(warning) ?? Infinity);
			});
			await persistValidatedDowngradeConfig(result.configSnapshot, phase.assertCurrent);
			return result;
		}, (result) => pluginOutcome(result.pluginUpdate), { restore: (result) => restoreMaintenance(result.configSnapshot.config) });
		const pluginUpdate = completedPluginUpdate.pluginUpdate;
		lifecycle.recordWarnings(collectPostCorePluginAdvisories(pluginUpdate), "plugins");
		configSnapshot = completedPluginUpdate.configSnapshot;
		const completionBudget = lifecycle.budget("completionCache");
		const completionTimeout = completionBudget - Math.min(1e3, completionBudget / 2);
		await lifecycle.run("completionCache", async () => opts.deferCompletionCache ? "deferred" : await tryWriteCompletionCache(root, Boolean(opts.json), completionTimeout, nodeRunner), (result) => result);
		const reconciledRuns = [];
		const result = {
			status: pluginUpdate.status === "error" ? "error" : pluginUpdate.status === "warning" || doctorWarnings.length > 0 ? "warning" : "ok",
			mode: "finalize",
			root,
			channel: requestedChannel ?? (configSnapshot.valid ? normalizeUpdateChannel(configSnapshot.config.update?.channel) : null) ?? channel,
			restart: false,
			...recoveryRunIds.length ? { reconciledRuns } : {},
			phaseTimings: lifecycle.phaseTimings,
			postUpdate: {
				doctor: {
					status: doctorWarnings.length > 0 ? "warning" : "ok",
					...doctorWarnings.length > 0 ? { warnings: doctorWarnings } : {}
				},
				plugins: pluginUpdate
			}
		};
		outcome = { complete: async () => {
			if (result.status !== "error" && recoveryRunIds.length) {
				await reconcileAbandonedUpdateRunsAsync({
					explicit: true,
					runIds: recoveryRunIds
				});
				const unresolved = recoveryRunIds.map((runId) => getUpdateRun(runId)).find((run) => run?.status === "running");
				if (unresolved) throw new Error(formatUpdateRunOwnership(unresolved));
				for (const runId of recoveryRunIds) if (acknowledgeAbandonedUpdateRun(runId)) reconciledRuns.push(runId);
			}
			const failure = result.status === "error" ? new UpdateCommandFailure({
				status: "error",
				mode: "unknown",
				root,
				reason: "post-update-plugins",
				postUpdate: { plugins: pluginUpdate },
				steps: [],
				durationMs: Math.round(performance.now() - lifecycle.startedAt)
			}) : void 0;
			const observed = failure ? await lifecycle.observeFailure(failure) : void 0;
			if (opts.json) defaultRuntime.writeJson({
				...result,
				...observed ? {
					recovery: observed.recovery,
					verification: observed.verification
				} : {}
			});
			else if (result.status === "ok") defaultRuntime.log(theme.muted("Update finalization completed."));
			else if (result.status === "warning") defaultRuntime.log(theme.warn("Update finalization completed with warnings."));
			else defaultRuntime.log(theme.error("Update finalization failed."));
			lifecycle.complete(result.status === "error" ? 1 : 0);
			if (failure) throw failure;
		} };
	} catch (error) {
		outcome = { error };
	}
	if (maintenance) {
		const owned = maintenance;
		outcome = await settleUpdateDoctorMaintenance(outcome, async () => restoreMaintenance((await readConfigFileSnapshot({
			skipPluginValidation: true,
			observe: false
		})).config), () => owned.release(), "Update finalization and service restoration failed");
	}
	if ("error" in outcome) throw outcome.error;
	return outcome.complete;
}
function pluginOutcome(result) {
	return {
		outcome: result.status === "error" ? "failed" : result.status === "warning" ? "warning" : "completed",
		...result.status === "error" ? { failureFacts: collectPostCorePluginFailureFacts(result) } : {}
	};
}
//#endregion
export { updateFinalizeCommand as t };
