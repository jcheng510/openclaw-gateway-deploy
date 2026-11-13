import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { i as isTransientSqliteError } from "./unhandled-rejections-C-EBtZNc.mjs";
import { i as readSessionCostUsageRefreshLockInDatabase } from "./session-cost-usage-cache.kernel-D1pvgiYd.mjs";
//#region src/infra/session-cost-usage-cache-read.ts
/** File-backed calls belong to the transcript worker; incognito retains its process-held owner. */
function readSessionCostUsageCache(options, request) {
	try {
		const result = withOpenClawAgentDatabaseReadOnly((database) => ({
			kind: request.kind,
			value: readSessionCostUsageRefreshLockInDatabase(database.db)
		}), {
			...options,
			env: cloneEnvWithPlatformSemantics(options.env ?? process.env)
		});
		if (result.found) return result.value;
	} catch (error) {
		if (!isTransientSqliteError(error)) throw error;
	}
	return {
		kind: request.kind,
		value: null
	};
}
//#endregion
export { readSessionCostUsageCache };
