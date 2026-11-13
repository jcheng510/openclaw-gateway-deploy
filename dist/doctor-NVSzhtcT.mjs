import { t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as loadCronRows, h as upsertCronJobRow, n as deleteCronJobRowInDatabase, p as rowToCronJob } from "./row-codec-BoajbjTy.mjs";
import { t as inspectCronRowsForDoctor } from "./doctor-inventory-DqCiHZyQ.mjs";
import { t as createVerifiedSqliteSnapshot } from "./sqlite-snapshot-DzSJnhxt.mjs";
import { t as inspectCronJobsReadOnly } from "./read-only-CgIcbGc8.mjs";
import { o as noteCronJobsStoreCommit } from "./store-CbOyaAbS.mjs";
import { n as sanitizeOpenClawStateLeaseRows } from "./openclaw-state-snapshot-sanitizer-BeUtAd1G.mjs";
import { isDeepStrictEqual } from "node:util";
import { randomUUID } from "node:crypto";
//#region src/cron/store/doctor.ts
async function inspectCronJobsForDoctor(scope) {
	return { jobs: await inspectCronJobsReadOnly(scope.env) };
}
function definitionEvidence(jobs) {
	return jobs.map(({ storeKey, id, sortOrder, definitionJson }) => ({
		storeKey,
		id,
		sortOrder,
		definitionJson
	}));
}
/** One host-owned repair transaction; plugins choose rows, never database paths or SQL. */
async function repairCronJobsForDoctor(scope, authority, inspected, requested) {
	authority.assertCurrent();
	const inventory = structuredClone(inspected);
	const changes = structuredClone(requested).filter((change) => change.definition === null || !isDeepStrictEqual(change.job.definition, change.definition));
	if (changes.length === 0) return { changed: 0 };
	const seen = /* @__PURE__ */ new Set();
	for (const change of changes) {
		const key = JSON.stringify([change.job.storeKey, change.job.id]);
		if (seen.has(key) || !inventory.jobs.some((job) => isDeepStrictEqual(job, change.job))) throw new Error("Cron Doctor repair requires distinct inspected rows.");
		if (change.definition && change.definition.id !== change.job.id) throw new Error("Cron Doctor repair must preserve job IDs.");
		seen.add(key);
	}
	const expected = definitionEvidence(inventory.jobs);
	const assertRowsUnchanged = (db) => {
		if (!isDeepStrictEqual(definitionEvidence(inspectCronRowsForDoctor(db)), expected)) throw new Error("Cron definitions changed during Doctor repair; inspect again before retrying.");
	};
	const sourcePath = resolveOpenClawStateSqlitePath(scope.env);
	const backupPath = `${sourcePath}.doctor-cron-${Date.now()}-${randomUUID()}.bak`;
	await createVerifiedSqliteSnapshot({
		sourcePath,
		targetPath: backupPath,
		preserveRowIds: true,
		transform: sanitizeOpenClawStateLeaseRows,
		requireNonEmptySource: true,
		validate: assertRowsUnchanged,
		beforePublish: () => authority.assertCurrent(),
		afterPublish: (guard) => guard.assertTargetUnchanged(() => authority.assertCurrent())
	});
	try {
		authority.assertCurrent();
		runOpenClawStateWriteTransaction(({ db }) => {
			authority.assertOwnedInTransaction(db);
			assertRowsUnchanged(db);
			for (const { job, definition } of changes) {
				if (!definition) {
					deleteCronJobRowInDatabase(db, job.storeKey, job.id);
					continue;
				}
				const row = loadCronRows(db, job.storeKey, /* @__PURE__ */ new Set([job.id]))[0];
				const replacement = row && rowToCronJob(row, definition);
				if (!replacement) throw new Error(`Cron Doctor repair cannot persist job ${job.id}; backup retained at ${backupPath}.`);
				upsertCronJobRow(db, job.storeKey, replacement, job.sortOrder, { preserveRuntimeState: true });
			}
			for (const storeKey of new Set(changes.map(({ job }) => job.storeKey))) deferSqlitePostCommitPublication(db, () => noteCronJobsStoreCommit(storeKey));
		}, { env: scope.env }, { operationLabel: "cron.doctor-repair" });
	} catch (error) {
		throw new Error(`Cron Doctor repair failed; verified backup retained at ${backupPath}: ${String(error)}`, { cause: error });
	}
	return {
		changed: changes.length,
		backupPath
	};
}
//#endregion
export { inspectCronJobsForDoctor, repairCronJobsForDoctor };
