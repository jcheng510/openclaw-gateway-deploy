import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { randomUUID } from "node:crypto";
import { MessagePort } from "node:worker_threads";
import { deserialize } from "node:v8";
//#region src/cron/service/runtime-mutation.ts
/** One settlement owner serves typed cron mutations; callbacks and database handles stay local. */
async function runCronRuntimeMutation(params) {
	const nonce = randomUUID();
	let settlement;
	let native;
	let bytes;
	let published = false;
	let conflict;
	const assertCurrent = () => {
		params.context.admission.assertCurrent();
		params.assertCurrent();
	};
	const publishCommitted = () => {
		const committed = native?.committed?.facts;
		if (published || !isRecord(committed) || committed.nonce !== nonce) return;
		if (!bytes) throw new Error("Committed cron mutation lost its retained outcome");
		const outcome = deserialize(bytes);
		published = true;
		bytes = void 0;
		params.publish(outcome);
	};
	try {
		await runOpenClawStateWorkerOperation(params.context, async (scope) => {
			try {
				const command = {
					type: params.type,
					input: {
						...params.input,
						nonce
					}
				};
				const result = await scope.execute(command);
				if (result.nonce !== nonce) throw new Error("Cron mutation returned a different operation nonce");
				if ("conflict" in result) {
					if (params.type !== "cron.reserveRuns" || !params.onRolledBackConflict) throw new Error("Cron mutation returned an unexpected reservation conflict");
					conflict = result.conflict;
				}
			} finally {
				await settlement;
				publishCommitted();
			}
		}, {
			assertCurrent,
			createAdmission(retained) {
				settlement = retained.settled;
				let phase = "transaction";
				let preparation;
				const admission = createSqliteWorkerOperationAdmission((request, grant) => {
					const facts = request.facts;
					const port = isRecord(facts) && facts.preparationPort instanceof MessagePort ? facts.preparationPort : void 0;
					try {
						assertCurrent();
						if (!isRecord(facts) || facts.nonce !== nonce || request.stage !== phase) throw new Error("Cron mutation differs from its retained transaction owner");
						if (request.stage === "transaction") {
							if (!port) throw new Error("Cron mutation has no policy preparation port");
							preparation = params.prepare(facts.preparation);
							port.postMessage(preparation.value, []);
							phase = "commit";
						} else {
							if (!(facts.bytes instanceof Uint8Array) || !preparation) throw new Error("Cron mutation has no prepared outcome");
							preparation.assertCurrent();
							bytes = facts.bytes;
							phase = "settling";
						}
					} finally {
						port?.close();
					}
					if (!grant()) throw new Error("Cron mutation admission expired");
				});
				native = admission;
				return {
					nativeLocations: [params.context.admission.databasePath],
					admission
				};
			}
		});
		if (conflict) {
			const settled = await settlement;
			if (native?.committed || native?.settlement?.kind !== "completed" || settled?.kind !== "completed") throw new Error("Cron reservation conflict has no confirmed native rollback");
			params.onRolledBackConflict(conflict);
		} else if (!published) throw new Error("Cron mutation did not publish a committed outcome");
	} finally {
		const settled = await settlement;
		try {
			publishCommitted();
		} finally {
			params.onSettled?.(native?.committed ? "committed" : settled === void 0 || settled.kind === "not-entered" || native?.settlement?.kind === "completed" ? "not-committed" : "unknown");
			bytes = void 0;
		}
	}
}
//#endregion
//#region src/cron/store/run-receipt-write-admission.ts
/** Capture optional storage once at the owning write transaction's admission. */
function prepareCronRunReceiptWriteSchema(db) {
	if (!db.isTransaction) throw new Error("Cron receipt schema admission requires the owning write transaction");
	return {
		executionOwnerLifecycleBindings: tableExists(db, "execution_owner_lifecycle_bindings"),
		cronRunReceipts: tableExists(db, "cron_run_receipts")
	};
}
//#endregion
export { runCronRuntimeMutation as n, prepareCronRunReceiptWriteSchema as t };
