import { i as readDatabasePathIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { s as throwSqliteLifecycleErrors } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { c as invalidateOpenClawAgentDatabaseValidation } from "./openclaw-agent-db-validation-cache-C348cqkT.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { d as runSqliteWorkerStoreOperation } from "./sqlite-worker-store-DNLj-iuz.mjs";
import { i as openOpenClawStateWorkerCleanupStore } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
//#region src/state/openclaw-agent-execution-cleanup.ts
/** Release only this owner's prepared lease after the broker certifies native retirement. */
async function cleanupRetiredAgentDatabaseLease(params) {
	params.assertOwned();
	await params.stopped;
	params.assertOwned();
	if ((await readDatabasePathIdentity(params.lease.sharedStatePath)).key !== params.lease.sharedStateIdentity) throw new Error("Retired agent cleanup cannot adopt a replacement shared database");
	const context = {
		environment: params.context.environment,
		existingSchemaPath: params.context.existingSchemaPath
	};
	const store = await openOpenClawStateWorkerCleanupStore(params.lease.sharedStatePath, context, () => params.assertOwned()).catch((error) => {
		if (error instanceof Error) {
			error.message += ` (leaseId=${params.lease.leaseId}, path=${params.lease.path})`;
			error.stack = `${error.name}: ${error.message}\n${error.stack ?? ""}`;
		}
		throw error;
	});
	if (!store) throw new Error("Retired agent cleanup lost its original shared database");
	const errors = [];
	try {
		await runSqliteWorkerStoreOperation(store, (scope) => scope.execute({
			type: "agentDatabases.releaseExitedLease",
			input: params.lease
		}), context, () => params.assertOwned(), () => ({
			nativeLocations: [params.lease.sharedStatePath],
			admission: createSqliteWorkerOperationAdmission((request, grant) => {
				params.assertOwned();
				if (request.stage === "prepare" && request.facts === "agent-integrity-invalidated") invalidateOpenClawAgentDatabaseValidation(params.lease.path);
				grant();
			})
		}));
	} catch (error) {
		errors.push(error);
	}
	try {
		await store.close();
	} catch (error) {
		errors.push(error);
	}
	throwSqliteLifecycleErrors(errors, "Retired agent lease cleanup and Worker close failed");
}
//#endregion
export { cleanupRetiredAgentDatabaseLease as t };
