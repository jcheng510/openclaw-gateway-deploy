import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { l as sqliteStringSet, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { d as withExistingOpenClawStateDatabaseReadOnly, t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as getCronStoreKysely } from "./schema-D1_BNlXk.mjs";
import { t as resolveCronJobsStorePath } from "./paths-zJ_Rby85.mjs";
import { toUSVString } from "node:util";
//#region src/cron/store/job-name.ts
function readCronJobNamesInDatabase(db, jobIds, storePath) {
	const rows = executeSqliteQuerySync(db, getCronStoreKysely(db).selectFrom("cron_jobs").select(["job_id", "name"]).where("store_key", "=", storePath).where("job_id", "in", sqliteStringSet(jobIds))).rows;
	return new Map(rows.map((row) => [row.job_id, normalizeOptionalString(row.name)]));
}
async function prepareCronJobNameResolver(jobIds, storePath) {
	const reply = jobIds.length ? await executeExistingOpenClawStateRead({}, {
		type: "cron.jobNames",
		jobIds,
		storePath
	}) : void 0;
	if (reply && (!reply.ok || reply.type !== "cron.jobNames")) throw new Error("Unexpected cron job names result");
	return (jobId) => reply?.names.get(toUSVString(jobId));
}
/** Read display metadata without loading payloads or running cron store repairs. */
function createCronJobNameResolver(jobIds) {
	let names;
	return (jobId) => {
		if (!names) {
			const storePath = resolveCronJobsStorePath();
			names = withExistingOpenClawStateDatabaseReadOnly(({ db }) => {
				if (!tableExists(db, "cron_jobs")) return /* @__PURE__ */ new Map();
				return readCronJobNamesInDatabase(db, jobIds, storePath);
			}) ?? /* @__PURE__ */ new Map();
		}
		return names.get(toUSVString(jobId));
	};
}
//#endregion
export { prepareCronJobNameResolver as n, createCronJobNameResolver as t };
