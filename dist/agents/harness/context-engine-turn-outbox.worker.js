import { s as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS } from "../../openclaw-state-db-contract-CQDemVBb.mjs";
import { a as runSqliteImmediateTransactionSync, t as assertTransactionUsable } from "../../sqlite-transaction-2VkikDo-.mjs";
import { O as recordContextEngineTurnOutboxSchemaCommitted } from "../../openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as executeContextEngineTurnOutboxCommand } from "../../context-engine-turn-outbox-D2nwtoiI.mjs";
//#region src/agents/harness/context-engine-turn-outbox.worker.ts
/** Borrows the canonical agent connection for one admitted outbox operation. */
function bindSqliteWorkerBackend(_input, context) {
	const db = context.database;
	return {
		execute(command) {
			return runSqliteImmediateTransactionSync(db, () => {
				context.admit("transaction");
				return executeContextEngineTurnOutboxCommand(db, command);
			}, {
				operationLabel: `context-engine.turn-outbox.${command.type}`,
				busyTimeoutMs: OPENCLAW_SQLITE_BUSY_TIMEOUT_MS,
				databaseLabel: context.databasePath,
				withCommit(commit) {
					context.admit("commit");
					commit();
					recordContextEngineTurnOutboxSchemaCommitted(db);
				}
			});
		},
		assertSettled() {
			assertTransactionUsable(db);
			if (db.isTransaction) throw new Error("Context-engine turn outbox transaction did not settle");
		},
		close() {}
	};
}
//#endregion
export { bindSqliteWorkerBackend };
