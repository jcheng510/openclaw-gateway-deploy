import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import "./paths-CtO6iw0c.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { x as listConfiguredSessionStoreAgentIds } from "./openclaw-state-db-DM-mSY0m.mjs";
import { h as readAgentDatabaseAdmissionRefusal } from "./agent-database-admission-CLYAvaL3.mjs";
import { o as resolveSqliteTargetFromSessionStorePath } from "./session-sqlite-target-YT3XOdWA.mjs";
import { t as resolveAgentSessionDirs } from "./session-dirs-SATsXf4g.mjs";
import { a as resolveAllAgentSessionStoreTargetsSync } from "./targets-CxfGP2B4.mjs";
import { t as hasSessionEntriesByStatusReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import "./sessions-Db5eEwNA.mjs";
import path from "node:path";
//#region src/agents/main-session-recovery/main-session-restart-recovery-shared.ts
const mainSessionRecoveryLog = createSubsystemLogger("main-session-restart-recovery");
const DEFAULT_RECOVERY_DELAY_MS = 5e3;
function resolveRestartRecoveryTerminalClientRunId(entry) {
	return entry.restartRecoverySourceIngress === "control-ui" ? normalizeOptionalString(entry.restartRecoveryDeliverySourceRunId) : void 0;
}
async function discoverRestartRecoveryStoreTargets(params) {
	const storeTargets = [];
	const stateDir = params.stateDir ?? resolveStateDir(process.env);
	const env = {
		...process.env,
		OPENCLAW_STATE_DIR: stateDir
	};
	if (params.cfg) {
		const configuredAgentIds = listConfiguredSessionStoreAgentIds(params.cfg);
		const configuredStorePaths = new Set(configuredAgentIds.map((agentId) => path.resolve(resolveSessionStorePathCore(params.cfg?.session?.store, {
			agentId,
			env
		}))));
		const configuredAgentIdSet = new Set(configuredAgentIds);
		for (const target of resolveAllAgentSessionStoreTargetsSync(params.cfg, { env })) {
			const storePath = path.resolve(target.storePath);
			if (!configuredAgentIdSet.has(target.agentId) && !configuredStorePaths.has(storePath)) continue;
			storeTargets.push({
				...target,
				storePath
			});
		}
	} else for (const sessionsDir of await resolveAgentSessionDirs(stateDir)) {
		const storePath = path.join(sessionsDir, "sessions.json");
		storeTargets.push({
			agentId: resolveSqliteTargetFromSessionStorePath(storePath).agentId ?? "main",
			storePath
		});
	}
	return storeTargets.filter((target) => !readAgentDatabaseAdmissionRefusal(target.agentId, { env }) && (!params.statuses || hasSessionEntriesByStatusReadOnly({
		...target,
		env
	}, params.statuses))).toSorted((a, b) => a.storePath.localeCompare(b.storePath) || a.agentId.localeCompare(b.agentId));
}
//#endregion
export { resolveRestartRecoveryTerminalClientRunId as i, discoverRestartRecoveryStoreTargets as n, mainSessionRecoveryLog as r, DEFAULT_RECOVERY_DELAY_MS as t };
