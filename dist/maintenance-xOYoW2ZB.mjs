import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { o as readAgentDeletionJournal } from "./agent-deletion-journal-C9BqqBYt.mjs";
import { S as runWithGatewayIndependentRootWorkAdmission, l as isGatewayRestartDrainError } from "./gateway-work-admission-B4bQUVQ6.mjs";
import { o as resolveSqliteTargetFromSessionStorePath } from "./session-sqlite-target-YT3XOdWA.mjs";
import { a as resolveAllAgentSessionStoreTargetsSync, s as resolveConfiguredAgentDatabaseTargets } from "./targets-CxfGP2B4.mjs";
import { n as createRetainedAgentDatabaseMatcher } from "./agent-deletion-discovery-ICWhA3Rx.mjs";
import { t as resolveCronJobsStorePath } from "./paths-zJ_Rby85.mjs";
import { u as runSessionRegistryMaintenanceForStore } from "./sessions-Db5eEwNA.mjs";
import { r as loadCronJobsStore } from "./store-CbOyaAbS.mjs";
import { t as maintainCronRunHistory } from "./run-history-D6Rb8EFg.mjs";
//#region src/cron/maintenance-scheduler.ts
const CRON_SWEEP_INTERVAL_MS = 6e4;
function createCronMaintenanceScheduler(run, onError) {
	let sweepJob;
	let scheduledSweep = null;
	function startScheduledSweep(schedulerSignal) {
		if (scheduledSweep) return scheduledSweep.completion;
		const admission = new AbortController();
		const signal = AbortSignal.any([admission.signal, schedulerSignal]);
		let admitted = false;
		const completion = runWithGatewayIndependentRootWorkAdmission(async () => {
			admitted = true;
			await run();
		}, "cron:maintenance", signal).catch((error) => {
			if (admitted || !signal.aborted && !isGatewayRestartDrainError(error)) onError(error);
		}).finally(() => {
			scheduledSweep = null;
		});
		scheduledSweep = {
			completion,
			cancelAdmission: () => admission.abort()
		};
		return completion;
	}
	return {
		start(scheduler) {
			if (sweepJob) return;
			sweepJob = scheduler.schedule({
				id: "cron-maintenance",
				atMs: scheduler.now() + 5e3,
				everyMs: CRON_SWEEP_INTERVAL_MS,
				run: () => startScheduledSweep(scheduler.signal)
			});
		},
		async stop() {
			sweepJob?.cancel();
			sweepJob = void 0;
			const pending = scheduledSweep;
			pending?.cancelAdmission();
			await pending?.completion;
		}
	};
}
//#endregion
//#region src/cron/session-registry-maintenance.ts
const log$1 = createSubsystemLogger("cron/maintenance");
const SESSION_REGISTRY_RETENTION_MS = 6048e5;
function resolveExplicitCronSessionSegment(sessionKey) {
	return /^(?:agent:[^:]+:)?cron:([^:]+)$/u.exec(sessionKey?.trim() ?? "")?.[1]?.toLowerCase();
}
async function readRunningCronJobIds() {
	try {
		const cronStorePath = resolveCronJobsStorePath();
		const runningJobs = (await loadCronJobsStore(cronStorePath)).jobs.filter((job) => typeof job.state?.runningAtMs === "number");
		const ids = /* @__PURE__ */ new Set();
		for (const job of runningJobs) {
			ids.add(job.id.toLowerCase());
			if (job.sessionTarget === "main") continue;
			const explicitSessionSegment = resolveExplicitCronSessionSegment(job.sessionKey);
			if (explicitSessionSegment) ids.add(explicitSessionSegment);
		}
		return {
			ok: true,
			ids,
			count: runningJobs.length
		};
	} catch (err) {
		return {
			ok: false,
			reason: formatErrorMessage(err)
		};
	}
}
async function runSessionRegistryMaintenance(params) {
	params.assertCurrent?.();
	const cfg = getRuntimeConfig();
	const runningCronJobs = await readRunningCronJobIds();
	params.assertCurrent?.();
	if (!runningCronJobs.ok) return {
		retentionMs: SESSION_REGISTRY_RETENTION_MS,
		runningCronJobs: 0,
		pruned: 0,
		skippedStores: 0,
		stores: [],
		skippedReason: `cron store unreadable: ${runningCronJobs.reason}`
	};
	const stores = [];
	const env = process.env;
	for (const target of resolveAllAgentSessionStoreTargetsSync(cfg)) {
		params.assertCurrent?.();
		const deletion = readAgentDeletionJournal(target.agentId, { env }, "runtime");
		const databasePath = deletion ? target.storePath : resolveSqliteTargetFromSessionStorePath(target.storePath, {
			agentId: target.agentId,
			env
		}).path;
		const retained = deletion ? void 0 : createRetainedAgentDatabaseMatcher(env, () => resolveConfiguredAgentDatabaseTargets(cfg, { env }))(databasePath, target.agentId);
		if (deletion?.cleanupCompleted || typeof retained === "object") {
			stores.push({
				...target,
				skippedReason: "agent-deletion-complete"
			});
			continue;
		}
		if (deletion) throw new Error(`OpenClaw agent database is unavailable while agent ${target.agentId} is deleted.`);
		if (retained) {
			const reason = retained === "held" ? "deletion journal reconstruction" : "deletion journal unavailable";
			const warning = `Held agent ${target.agentId} database ${databasePath} (${reason}); skipped session retention. Run "${formatCliCommand("openclaw doctor --fix", env)}" for explicit restoration guidance.`;
			log$1.warn(warning);
			stores.push({
				...target,
				skippedReason: "agent-store-held",
				warning
			});
			continue;
		}
		const result = await runSessionRegistryMaintenanceForStore({
			...target,
			apply: params.apply,
			retentionMs: SESSION_REGISTRY_RETENTION_MS,
			runningCronJobIds: runningCronJobs.ids,
			assertCurrent: params.assertCurrent
		});
		params.assertCurrent?.();
		stores.push({
			agentId: target.agentId,
			storePath: target.storePath,
			beforeCount: result.beforeCount,
			afterCount: result.afterCount,
			pruned: result.pruned,
			preservedRunning: result.preservedRunning
		});
	}
	return {
		retentionMs: SESSION_REGISTRY_RETENTION_MS,
		runningCronJobs: runningCronJobs.count,
		pruned: stores.reduce((total, store) => total + ("pruned" in store ? store.pruned : 0), 0),
		skippedStores: stores.filter((store) => "skippedReason" in store).length,
		stores
	};
}
//#endregion
//#region src/cron/maintenance.ts
const log = createSubsystemLogger("cron/maintenance");
const scheduler = createCronMaintenanceScheduler(async () => {
	const context = captureOpenClawStateWorkerContext();
	const assertCurrent = () => {
		context.admission.assertCurrent();
	};
	await maintainCronRunHistory(context, assertCurrent);
	assertCurrent();
	const result = await runSessionRegistryMaintenance({
		apply: true,
		assertCurrent
	});
	assertCurrent();
	if (result.skippedReason) log.warn("Session registry maintenance skipped", { reason: result.skippedReason });
}, (error) => log.warn("Cron maintenance failed", { error }));
/** Gateway lifecycle owns retention even when scheduled execution is disabled. */
function startCronMaintenance(gatewayScheduler) {
	scheduler.start(gatewayScheduler);
}
async function stopCronMaintenance() {
	await scheduler.stop();
}
//#endregion
export { startCronMaintenance, stopCronMaintenance };
