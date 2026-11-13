import { n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { n as getInvalidPersistedCronJobReason } from "./persisted-shape-Cj2JMPzw.mjs";
import { b as tryParseJsonObject } from "./row-codec-BoajbjTy.mjs";
import { r as getCronStoreKysely } from "./schema-D1_BNlXk.mjs";
//#region src/cron/store/doctor-inventory.ts
/** Raw inspection deliberately bypasses runtime loading and its repair/filter policies. */
function inspectCronRowsForDoctor(db) {
	if (!tableExists(db, "cron_jobs")) return [];
	return executeSqliteQuerySync(db, getCronStoreKysely(db).selectFrom("cron_jobs").select([
		"store_key",
		"job_id",
		"declaration_key",
		"job_json",
		"state_json",
		"sort_order"
	]).orderBy("store_key").orderBy("sort_order").orderBy("job_id")).rows.map((row) => {
		const definition = tryParseJsonObject(row.job_json) ?? null;
		const state = tryParseJsonObject(row.state_json);
		const invalidReason = !definition ? "invalid-definition-json" : definition.id !== row.job_id ? "job-id-mismatch" : (definition.declarationKey ?? null) !== row.declaration_key ? "declaration-key-mismatch" : !state ? "invalid-state-json" : getInvalidPersistedCronJobReason({
			...definition,
			state
		});
		const inspected = {
			storeKey: row.store_key,
			id: row.job_id,
			sortOrder: row.sort_order,
			definitionJson: row.job_json,
			definition
		};
		if (invalidReason) inspected.invalidReason = invalidReason;
		return inspected;
	});
}
//#endregion
export { inspectCronRowsForDoctor as t };
