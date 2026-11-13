import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { Fn as object, Jn as string } from "./schemas-BOYIvvln.mjs";
import { t as inspectUpdateRunDriver } from "./update-run-driver-CSLAE9i6.mjs";
import { t as finishUpdateRunRecord } from "./update-run-record-BCEjJm1u.mjs";
import { t as runExistingOpenClawStateWriteTransaction } from "./openclaw-state-db-existing-write-Bs94uHSu.mjs";
import { c as recordedUpdateRunDrivers } from "./update-run-activity-8Zl-pDYm.mjs";
import { d as encodeRun, i as persistRun, o as updateRunLedgerSchema, s as upsertStep, u as recordUpdateRunVerificationRecord } from "./update-run-write-rWyADCOZ.mjs";
import { a as readLatestUpdateRun, i as readActiveUpdateRun, o as readUpdateRunRecord, r as hasStoredUpdateRecovery } from "./update-run-read.kernel-l3RrZ-g3.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/infra/update-run-interruption-store.ts
const installedUpdateCandidateSchema = object({
	version: string().trim().min(1).max(1024),
	buildId: string().trim().min(1).max(96)
});
function readInstalledUpdateCandidate(run) {
	const receipt = run.steps.find((step) => step.step === "finalize:installed-candidate" && step.status === "completed");
	if (!receipt?.detail) return;
	try {
		const parsed = installedUpdateCandidateSchema.safeParse(JSON.parse(receipt.detail));
		return parsed.success ? parsed.data : void 0;
	} catch {
		return;
	}
}
function canSettleInterruptedUpdate(run) {
	const abandoned = run.status === "failed" && run.reason === "abandoned";
	if (!(run.status === "running" && run.phase === "verifying" && !run.reason) && !abandoned) return false;
	const drivers = recordedUpdateRunDrivers(run);
	return drivers.length > 0 && drivers.every((driver) => inspectUpdateRunDriver(driver) === "dead") && run.repair.length === 0 && run.steps.some((step) => step.step === "post-update verification" && step.status === "completed") && !run.steps.some((step) => step.step === "driver:identity-unavailable" || step.step === "reconcile:acknowledged" || step.step === "package rollback" || step.step === "previous generation restoration" || step.status === "failed" && !(abandoned && (step.step === "reconcile:abandoned" || step.step === "verifying" && !step.detail && !step.failureFacts?.length))) && readInstalledUpdateCandidate(run) !== void 0;
}
/** Revalidate the captured run and recovery exclusion inside the worker's transaction. */
function persistInterruptedUpdateObservation(input, options, assertCurrent) {
	return runExistingOpenClawStateWriteTransaction(({ db }) => {
		assertCurrent("transaction");
		const accept = (run) => {
			assertCurrent("commit");
			return {
				accepted: true,
				run
			};
		};
		const current = readLatestUpdateRun(db);
		const active = readActiveUpdateRun(db);
		if (!current || !isDeepStrictEqual(current, input.expected) || active && active.runId !== current.runId || hasStoredUpdateRecovery(db, current.runId)) return { accepted: false };
		const previous = current.steps.find((step) => step.step === "reconcile:settle");
		if (!canSettleInterruptedUpdate(previous?.status === "failed" && (input.cleanup === "unknown" || input.cleanup === "confirmed") ? {
			...current,
			steps: current.steps.filter((step) => step !== previous)
		} : current)) return { accepted: false };
		const uncertain = input.cleanup === "pending" || input.cleanup === "unknown";
		const verification = uncertain ? void 0 : input.verification;
		if (!verification && previous && input.cleanup === void 0) return {
			accepted: true,
			run: current
		};
		upsertStep(current, {
			step: "reconcile:settle",
			status: uncertain ? "failed" : "completed",
			endedAtMs: previous?.endedAtMs ?? Date.now(),
			detail: input.detail
		});
		if (!verification && previous) {
			const row = encodeRun(current, options);
			executeSqliteQuerySync(db, getNodeSqliteKysely(db).updateTable("update_runs").set({ steps_json: row.steps_json }).where("run_id", "=", current.runId));
			return accept(readUpdateRunRecord(db, current.runId));
		}
		if (!verification) return accept(persistRun(db, current, options));
		const candidate = readInstalledUpdateCandidate(current);
		if (!candidate) return { accepted: false };
		if (current.status === "failed") {
			current.status = "running";
			current.phase = "verifying";
			current.finishedAtMs = null;
			for (const step of current.steps) if (step.step === "reconcile:abandoned") step.status = "completed";
		}
		recordUpdateRunVerificationRecord(current, verification);
		upsertStep(current, {
			step: "warning:finalize:interrupted-completion",
			status: "completed",
			endedAtMs: Date.now(),
			detail: `Updater exited before recording completion; installed and serving candidate build ${candidate.buildId} verified.`
		});
		finishUpdateRunRecord(current, {
			status: "succeeded",
			after: candidate
		});
		return accept(persistRun(db, current, options));
	}, options, {
		schemaSql: updateRunLedgerSchema,
		operationLabel: "update.run"
	});
}
//#endregion
export { readInstalledUpdateCandidate as i, installedUpdateCandidateSchema as n, persistInterruptedUpdateObservation as r, canSettleInterruptedUpdate as t };
