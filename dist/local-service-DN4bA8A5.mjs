import { a as getResolvedLoggerSettings, l as toPinoLikeLogger, r as getChildLogger } from "./logger-DabFgCLJ.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { C as tryResolveAmbientOwnerAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { i as tryGetLegacyDefaultAgentId } from "./legacy.default-agent-owner-C1atgXtB.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { a as isAgentDeletionBlocked } from "./agent-lifecycle-registry-BTCyhxXt.mjs";
import { t as resolveCronJobsStorePath } from "./paths-zJ_Rby85.mjs";
import { t as GatewayScheduler } from "./gateway-scheduler-Dq116NWy.mjs";
import "./store-CbOyaAbS.mjs";
import { t as CronService } from "./service-m6MonO39.mjs";
//#region src/cron/local-service.ts
async function withLocalAgentCronJobsRemoved(agentId, getRuntimeConfig, commit) {
	const cfg = getRuntimeConfig();
	const storePath = resolveCronJobsStorePath();
	const scheduler = new GatewayScheduler();
	const service = new CronService({
		scheduler,
		storePath,
		cronEnabled: cfg.cron?.enabled ?? true,
		cronConfig: cfg.cron,
		log: toPinoLikeLogger(getChildLogger({
			module: "cron",
			storeKey: storePath
		}), getResolvedLoggerSettings().level),
		defaultAgentId: tryResolveAmbientOwnerAgentId(cfg),
		legacyDefaultAgentId: tryGetLegacyDefaultAgentId(cfg),
		resolveDefaultAgentId: () => tryResolveAmbientOwnerAgentId(getRuntimeConfig()),
		isAgentAvailable: (id, database, facts) => !(facts?.deletionBlocked ?? isAgentDeletionBlocked(id, {}, database)) && listAgentIds(getRuntimeConfig()).some((configuredId) => normalizeAgentId(configuredId) === id),
		enqueueSystemEvent: () => false,
		requestHeartbeat: () => {},
		runIsolatedAgentJob: async () => {
			throw new Error("Cron execution is unavailable in local service context.");
		}
	});
	try {
		return await service.removeAgentJobsTransactional(agentId, commit);
	} finally {
		service.stop();
		await scheduler.stop();
	}
}
//#endregion
export { withLocalAgentCronJobsRemoved as t };
