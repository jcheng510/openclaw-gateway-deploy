import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { n as createSqliteWorkerWriteAdmission } from "./sqlite-worker-store-DNLj-iuz.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { f as isCronJobActive } from "./active-jobs-CTCtrefd.mjs";
import { n as runCronRuntimeMutation } from "./run-receipt-write-admission-C_bxAGc4.mjs";
import { v as isCronRunReceiptOwnerStale } from "./run-receipt-store-C5VImo6M.mjs";
//#region src/cron/store/run-history.ts
async function maintainCronRunHistory(context, assertCurrent) {
	await runCronRuntimeMutation({
		context,
		type: "cron.maintainHistory",
		input: {},
		assertCurrent,
		prepare({ jobIds, receipts }) {
			const protectedJobs = () => /* @__PURE__ */ new Set([...jobIds.filter(isCronJobActive), ...receipts.filter((receipt) => !isCronRunReceiptOwnerStale(receipt, Date.now())).map((receipt) => receipt.jobId)]);
			const protectedJobIds = protectedJobs();
			return {
				value: {
					nowMs: Date.now(),
					protectedJobIds: [...protectedJobIds]
				},
				assertCurrent() {
					assertCurrent();
					const current = protectedJobs();
					if (current.size !== protectedJobIds.size || [...current].some((id) => !protectedJobIds.has(id))) throw new Error("Cron history backing ownership changed before commit");
				}
			};
		},
		publish() {}
	});
}
async function recordCronRun(input) {
	const context = captureOpenClawStateWorkerContext();
	const captured = structuredClone(input);
	const assertCurrent = () => context.admission.assertCurrent();
	await runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
		type: "cron.recordRun",
		input: captured
	}), {
		assertCurrent,
		createAdmission: createSqliteWorkerWriteAdmission(assertCurrent, [context.admission.databasePath])
	});
}
//#endregion
export { recordCronRun as n, maintainCronRunHistory as t };
