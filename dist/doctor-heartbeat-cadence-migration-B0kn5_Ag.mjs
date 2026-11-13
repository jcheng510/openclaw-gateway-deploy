import { p as shortenHomePath } from "./utils-DUAwk2p5.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { C as tryResolveAmbientOwnerAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import { t as formatDurationCompact } from "./format-duration-BIQQYTeV.mjs";
import { t as note } from "./note-BpWs6H5N.mjs";
import { n as resolveCronJobsStorePathFromConfig } from "./paths-zJ_Rby85.mjs";
import { t as GatewayScheduler } from "./gateway-scheduler-Dq116NWy.mjs";
import { n as loadCronJobsStoreWithConfigJobsReadOnly } from "./read-only-CgIcbGc8.mjs";
import "./store-CbOyaAbS.mjs";
import { t as CronService } from "./service-m6MonO39.mjs";
import { n as resolveHeartbeatSchedulerSeed } from "./heartbeat-schedule-D__QWJhj.mjs";
import { i as resolveHeartbeatMonitorPlan, n as heartbeatMonitorAddOptions, t as applyHeartbeatMonitorJobs } from "./heartbeat-monitor-ro5UESq_.mjs";
//#region src/commands/doctor-heartbeat-cadence-migration.ts
/** Doctor-owned materialization of heartbeat cadence config into cron monitor rows. */
const HEARTBEAT_CADENCE_MIGRATION_CHECK_ID = "core/doctor/heartbeat-cadence-migration";
function createDoctorCronService(storePath, cfg, scheduler) {
	const noop = () => {};
	const log = {
		debug: noop,
		info: noop,
		warn: noop,
		error: noop
	};
	return new CronService({
		scheduler,
		storePath,
		cronEnabled: false,
		cronConfig: cfg.cron,
		resolveDefaultAgentId: () => tryResolveAmbientOwnerAgentId(cfg),
		log,
		enqueueSystemEvent: () => false,
		requestHeartbeat: noop,
		runIsolatedAgentJob: async () => ({
			status: "skipped",
			error: "doctor does not execute automations"
		})
	});
}
async function loadHeartbeatMonitorPlanReadOnly(cfg, storePath, env) {
	const loaded = await loadCronJobsStoreWithConfigJobsReadOnly(storePath, env);
	const schedulerSeed = resolveHeartbeatSchedulerSeed(void 0, {
		env,
		readOnly: true
	});
	return resolveHeartbeatMonitorPlan(cfg, loaded.store.jobs, { schedulerSeed });
}
function describePlannedChange(change) {
	if (change.kind === "remove") return `Remove stale heartbeat monitor for agent "${change.agentId}".`;
	const schedule = change.input.schedule;
	const cadence = schedule.kind === "every" ? formatDurationCompact(schedule.everyMs) : schedule.kind;
	const action = change.kind === "create" ? "Create" : "Update";
	const state = change.input.enabled ? `at ${cadence}` : "as disabled";
	return `${action} heartbeat monitor for agent "${change.agentId}" ${state}.`;
}
function noteWarnings(warnings, storePath) {
	if (warnings.length === 0) return;
	note(`${warnings.join("\n")}\nCron store: ${shortenHomePath(storePath)}`, "Doctor warnings");
}
function cadenceFinding(params) {
	return {
		checkId: HEARTBEAT_CADENCE_MIGRATION_CHECK_ID,
		severity: "warning",
		message: describePlannedChange(params.change),
		path: params.storePath,
		target: params.change.agentId,
		requirement: `heartbeat-monitor-${params.change.kind}`,
		fixHint: `Run ${formatCliCommand("openclaw doctor --fix")} to materialize heartbeat cadence in cron.`
	};
}
/** Reports heartbeat monitor rows that do not yet match cadence config. */
async function collectHeartbeatCadenceMigrationFindings(cfg, env = process.env) {
	const storePath = resolveCronJobsStorePathFromConfig(cfg, env);
	try {
		return (await loadHeartbeatMonitorPlanReadOnly(cfg, storePath, env)).changes.map((change) => cadenceFinding({
			storePath,
			change
		}));
	} catch (error) {
		return [{
			checkId: HEARTBEAT_CADENCE_MIGRATION_CHECK_ID,
			severity: "error",
			message: `Heartbeat cadence could not be inspected: ${formatErrorMessage(error)}`,
			path: storePath,
			requirement: "heartbeat-monitor-inspection",
			fixHint: `Run ${formatCliCommand("openclaw doctor --fix")} after resolving the cron store error.`
		}];
	}
}
/** Creates or updates the stable monitor rows used by heartbeat execution. */
async function ensureHeartbeatMonitorJobs(cfg, storePath, env = process.env) {
	const scheduler = new GatewayScheduler();
	const cron = createDoctorCronService(storePath, cfg, scheduler);
	try {
		const jobs = await cron.list({ includeDisabled: true });
		const schedulerSeed = resolveHeartbeatSchedulerSeed(void 0, { env });
		const { specs } = resolveHeartbeatMonitorPlan(cfg, jobs, { schedulerSeed });
		const monitors = /* @__PURE__ */ new Map();
		for (const spec of specs) {
			const result = await cron.add(spec.input, heartbeatMonitorAddOptions(spec.agentId));
			const job = "job" in result ? result.job : result;
			monitors.set(spec.agentId, job);
		}
		return monitors;
	} finally {
		cron.stop();
		await scheduler.stop();
	}
}
/** Previews or applies config-to-cron heartbeat cadence materialization. */
async function maybeMigrateHeartbeatCadenceToCron(params) {
	const env = params.env ?? process.env;
	const storePath = resolveCronJobsStorePathFromConfig(params.cfg, env);
	const changes = [];
	const warnings = [];
	if (!params.shouldRepair) {
		try {
			const plan = await loadHeartbeatMonitorPlanReadOnly(params.cfg, storePath, env);
			if (plan.changes.length > 0) note(plan.changes.map(describePlannedChange).join("\n"), "Heartbeat cadence migration preview");
		} catch (error) {
			warnings.push(`Could not inspect heartbeat monitor jobs: ${formatErrorMessage(error)}`);
		}
		noteWarnings(warnings, storePath);
		return {
			changes,
			warnings
		};
	}
	const scheduler = new GatewayScheduler();
	const cron = createDoctorCronService(storePath, params.cfg, scheduler);
	try {
		const schedulerSeed = resolveHeartbeatSchedulerSeed(void 0, { env });
		const result = await applyHeartbeatMonitorJobs({
			cron,
			cfg: params.cfg,
			schedulerSeed
		});
		changes.push(...result.applied.map(describePlannedChange));
		for (const failure of result.failures) warnings.push(failure.change ? `Heartbeat monitor for agent "${failure.change.agentId}" was not migrated: ${formatErrorMessage(failure.error)}` : `Could not inspect heartbeat monitor jobs: ${formatErrorMessage(failure.error)}`);
	} finally {
		cron.stop();
		await scheduler.stop();
	}
	if (changes.length > 0) note(changes.join("\n"), "Doctor changes");
	noteWarnings(warnings, storePath);
	return {
		changes,
		warnings
	};
}
//#endregion
export { ensureHeartbeatMonitorJobs as n, maybeMigrateHeartbeatCadenceToCron as r, collectHeartbeatCadenceMigrationFindings as t };
