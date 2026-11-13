import { t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { i as runWithSqliteWorkerStateContext } from "./sqlite-worker-state-context-KkU943i2.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { h as getOperatorApprovalResolutionKey } from "./operator-approval-store.transitions-Cacs2TdE.mjs";
import { t as executeOperatorApprovalOperation } from "./operator-approval-store.operations-Ylb0OAGL.mjs";
//#region src/gateway/operator-approval-store.native.ts
function executeNativeOperatorApproval(type, input, context, assertCurrent, onCommitted) {
	context.admission.assertCurrent();
	return runWithSqliteWorkerStateContext(context, () => {
		const options = {
			env: context.environment,
			path: context.admission.databasePath
		};
		return runOpenClawStateWriteTransaction((database) => {
			assertCurrent();
			const result = executeOperatorApprovalOperation(type, input, {
				...options,
				database
			});
			if (onCommitted && type === "operatorApprovals.resolve" && "outcome" in result && result.outcome === "resolved") {
				const receipt = {
					type: "operatorApprovals.resolve",
					resolutionKey: getOperatorApprovalResolutionKey(result.record)
				};
				if (!deferSqlitePostCommitPublication(database.db, () => onCommitted(receipt))) throw new Error("Operator approval commit receipt requires a transaction owner");
			}
			assertCurrent();
			return result;
		}, options);
	});
}
//#endregion
export { executeNativeOperatorApproval };
