import { m as resolveConfigPath } from "./paths-CtO6iw0c.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import path from "node:path";
//#region src/claws/monitor-cleanup-binding.ts
/** Claw files remain local; the serving monitor owner must use that same state and config. */
function resolveClawMonitorCleanupBinding(cronStorePath) {
	return {
		configPath: path.resolve(resolveConfigPath()),
		statePath: path.resolve(resolveOpenClawStateSqlitePath()),
		cronStorePath: path.resolve(cronStorePath)
	};
}
//#endregion
export { resolveClawMonitorCleanupBinding as t };
