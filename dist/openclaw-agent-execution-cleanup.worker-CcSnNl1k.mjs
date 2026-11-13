import { y as requireOpenClawStateDatabaseIdentity } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { i as requestSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { h as releaseExitedOpenClawAgentDatabaseLeaseInDatabase } from "./openclaw-agent-db-lease-B-E6z2mk.mjs";
//#region src/state/openclaw-agent-execution-cleanup.worker.ts
function executeAgentDatabaseCleanupCommand(command, database, env) {
	runOpenClawStateWriteTransaction((current) => {
		if (current.path !== command.input.sharedStatePath || requireOpenClawStateDatabaseIdentity(current).key !== command.input.sharedStateIdentity) throw new Error("Retired agent cleanup cannot adopt a replacement shared database");
		releaseExitedOpenClawAgentDatabaseLeaseInDatabase(current.db, command.input, () => requestSqliteWorkerOperationAdmission({
			stage: "prepare",
			facts: "agent-integrity-invalidated"
		}));
	}, {
		database,
		path: database.path,
		env
	});
}
//#endregion
export { executeAgentDatabaseCleanupCommand };
