import { a as iterateSqliteQuerySync, i as getNodeSqliteKysely } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { a as readCurrentOpenClawStateDatabaseContentVersion, c as withExistingOpenClawStateDatabaseArtifactPreservingReadOnly, o as withArtifactPreservingStateReads, t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as isAcknowledgedAbandonedUpdateRun } from "./update-run-record-BCEjJm1u.mjs";
import { i as readActiveUpdateRun, n as decodeRun, o as readUpdateRunRecord, s as readUpdateRuns } from "./update-run-read.kernel-l3RrZ-g3.mjs";
//#region src/infra/update-run-reader.ts
function getUpdateRun(runId, options = {}) {
	return withExistingOpenClawStateDatabaseArtifactPreservingReadOnly(({ db }) => tableExists(db, "update_runs") ? readUpdateRunRecord(db, runId) : void 0, options);
}
function findActiveUpdateRun(options = {}) {
	return withExistingOpenClawStateDatabaseArtifactPreservingReadOnly(({ db }) => readActiveUpdateRun(db), options);
}
/** Previews and acknowledged abandonment cannot replace failure or completion evidence. */
function readUpdateRunResolutionHistory(options = {}) {
	return withExistingOpenClawStateDatabaseArtifactPreservingReadOnly(({ db }) => {
		if (!tableExists(db, "update_runs")) return {};
		const latest = (failedOnly) => {
			const query = getNodeSqliteKysely(db).selectFrom("update_runs").selectAll().where("status", failedOnly ? "=" : "!=", failedOnly ? "failed" : "skipped").orderBy("created_at_ms", "desc").orderBy("run_id", "desc");
			for (const row of iterateSqliteQuerySync(db, query)) {
				const run = decodeRun(row);
				if (!isAcknowledgedAbandonedUpdateRun(run)) return run;
			}
		};
		return {
			failure: latest(true),
			outcome: latest(false)
		};
	}, options) ?? {};
}
async function getUpdateRunAsync(runId, options = {}) {
	const reply = await withArtifactPreservingStateReads(() => executeExistingOpenClawStateRead(options, {
		type: "updateRuns.get",
		runId
	}, { preferIndependentWarmRead: true }));
	if (!reply) return;
	if (!reply.ok || reply.type !== "updateRuns.get") throw new Error("Unexpected update run lookup result");
	return reply.run;
}
function listUpdateRuns(input = {}, options = {}, openStateSchemaReadAdmission) {
	return withExistingOpenClawStateDatabaseArtifactPreservingReadOnly(({ db }) => readUpdateRuns(db, input), options, openStateSchemaReadAdmission) ?? [];
}
/** Reuse decoded rows only after a fresh observation of every authoritative source byte.
* The caller still evaluates admission on every invocation; no grant is cached.
* This closure owns only rows, never a native handle, child, or temporary snapshot.
*/
function createUpdateRunAdmissionReader(input, options, openStateSchemaReadAdmission) {
	const query = { ...input };
	let previous;
	return () => {
		const version = readCurrentOpenClawStateDatabaseContentVersion(options);
		if (version !== void 0 && previous?.version === version) return structuredClone(previous.runs);
		previous = void 0;
		const runs = listUpdateRuns(query, options, openStateSchemaReadAdmission);
		if (version !== void 0 && version === readCurrentOpenClawStateDatabaseContentVersion(options)) previous = {
			version,
			runs: structuredClone(runs)
		};
		return runs;
	};
}
/** Keep the fixed status projection in one read-worker snapshot. */
async function getUpdateRunStatusAsync(options = {}) {
	const reply = await withArtifactPreservingStateReads(() => executeExistingOpenClawStateRead(options, { type: "updateRuns.status" }, { preferIndependentWarmRead: true }));
	if (!reply) return {};
	if (!reply.ok || reply.type !== "updateRuns.status") throw new Error("Unexpected update run status result");
	return reply.status;
}
async function getUpdateRunHistoryStatusAsync(options = {}) {
	const reply = await withArtifactPreservingStateReads(() => executeExistingOpenClawStateRead(options, { type: "updateRuns.historyStatus" }, { preferIndependentWarmRead: true }));
	if (!reply) return {};
	if (!reply.ok || reply.type !== "updateRuns.historyStatus") throw new Error("Unexpected update run history status result");
	return reply.status;
}
/** Doctor retains its maintenance owner while the worker reads the private snapshot. */
async function listUpdateRunsAsync(input = {}, options = {}) {
	const reply = await withArtifactPreservingStateReads(() => executeExistingOpenClawStateRead(options, {
		type: "updateRuns.list",
		input: { ...input }
	}, { preferIndependentWarmRead: true }));
	if (!reply) return [];
	if (!reply.ok || reply.type !== "updateRuns.list") throw new Error("Unexpected update run list result");
	return reply.runs;
}
/** Only a later recorded fetch completion clears an updater fetch failure. */
function getLatestUpdateFetchFailure(options = {}) {
	return withExistingOpenClawStateDatabaseArtifactPreservingReadOnly(({ db }) => {
		if (!tableExists(db, "update_runs")) return;
		const query = getNodeSqliteKysely(db).selectFrom("update_runs").selectAll().orderBy("created_at_ms", "desc").orderBy("run_id", "desc");
		let latestAtMs = -Infinity;
		let latestFailure;
		for (const row of iterateSqliteQuerySync(db, query)) {
			const run = decodeRun(row);
			const fetchSteps = run.steps.filter(({ step }) => /^git (?:fetch(?:\s|$)|target inspection fetch$)/u.test(step) || step === "git import admitted target");
			const failed = fetchSteps.findLast((step) => step.status === "failed");
			if (run.reason === "fetch-failed" || failed) {
				const failedAtMs = failed?.endedAtMs ?? run.finishedAtMs ?? run.updatedAtMs;
				if (failedAtMs < latestAtMs) continue;
				const detail = failed?.detail ?? "";
				latestAtMs = failedAtMs;
				latestFailure = {
					reason: "fetch-failed",
					failedAtMs,
					detail: /would clobber existing tag/iu.test(detail) ? "tag conflict" : /authentication|permission denied|could not read Username|access denied/iu.test(detail) ? "authentication failed" : /resolve host|network|timed? out|timeout|unreachable/iu.test(detail) ? "network error" : "fetch-failed",
					runId: run.runId
				};
			} else for (const step of fetchSteps) {
				if (step.status !== "completed" || step.endedAtMs === void 0) continue;
				const completedAtMs = step.endedAtMs;
				if (completedAtMs > latestAtMs) {
					latestAtMs = completedAtMs;
					latestFailure = void 0;
				}
			}
		}
		return latestFailure;
	}, options);
}
//#endregion
export { getUpdateRunAsync as a, listUpdateRuns as c, getUpdateRun as i, listUpdateRunsAsync as l, findActiveUpdateRun as n, getUpdateRunHistoryStatusAsync as o, getLatestUpdateFetchFailure as r, getUpdateRunStatusAsync as s, createUpdateRunAdmissionReader as t, readUpdateRunResolutionHistory as u };
