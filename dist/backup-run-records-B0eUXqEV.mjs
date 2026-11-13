import { n as safeParseJsonRecord } from "./json-coercion-pfKbZnCJ.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { d as withExistingOpenClawStateDatabaseReadOnly } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { existsSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
//#region src/state/backup-run-records.contract.ts
const BACKUP_RUN_ERROR_MAX_LENGTH = 1200;
//#endregion
//#region src/state/backup-run-records.ts
function boundedText(value, maxLength) {
	const trimmed = value?.trim();
	return trimmed ? truncateUtf16Safe(trimmed, maxLength) : void 0;
}
function parseBackupRun(row) {
	if (row.status !== "ok" && row.status !== "failed") return;
	const manifest = safeParseJsonRecord(row.manifest_json);
	if (!manifest) return;
	if (manifest.kind !== "archive" && manifest.kind !== "sqlite-snapshot" && manifest.kind !== "git") return;
	return {
		id: row.id,
		createdAt: row.created_at,
		archivePath: row.archive_path,
		status: row.status,
		kind: manifest.kind,
		...typeof manifest.target === "string" ? { target: manifest.target } : {},
		...typeof manifest.error === "string" ? { error: manifest.error } : {},
		...manifest.pushFailed === true ? { pushFailed: true } : {}
	};
}
/** Record one best-effort backup outcome in the shared bounded operational log. */
async function recordBackupRunOutcome(params) {
	const databasePath = resolveOpenClawStateSqlitePath(params.env ?? process.env);
	if (!existsSync(databasePath)) return;
	const context = captureOpenClawStateWorkerContext({
		path: databasePath,
		env: params.env
	});
	const manifest = JSON.stringify({
		kind: params.kind,
		target: boundedText(params.target, 512),
		error: boundedText(params.error, BACKUP_RUN_ERROR_MAX_LENGTH),
		...params.pushFailed === true ? { pushFailed: true } : {}
	});
	const row = {
		id: randomUUID(),
		created_at: params.createdAt ?? Date.now(),
		archive_path: params.archivePath,
		status: params.status,
		manifest_json: manifest
	};
	const { runOpenClawStateWorkerOperation } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
	await runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
		type: "backup.recordOutcome",
		input: row
	}), { existingOnly: true });
}
function readBackupRun(database, status) {
	if (!tableExists(database, "backup_runs")) return;
	let query = getNodeSqliteKysely(database).selectFrom("backup_runs").selectAll();
	if (status) query = query.where("status", "=", status);
	const row = executeSqliteQueryTakeFirstSync(database, query.orderBy("created_at", "desc").orderBy("id", "desc").limit(1));
	return row ? parseBackupRun(row) : void 0;
}
/** Read backup freshness without creating or repairing an absent state database. */
async function readBackupRunFreshness(env) {
	return withExistingOpenClawStateDatabaseReadOnly(({ db }) => ({
		latest: readBackupRun(db),
		latestOk: readBackupRun(db, "ok")
	}), {
		env,
		path: resolveOpenClawStateSqlitePath(env)
	}) ?? {};
}
/** Archive parents are the fallback scratch roots when TMPDIR overlaps a source. */
function readBackupArchiveDirectories(env) {
	return withExistingOpenClawStateDatabaseReadOnly(({ db }) => {
		if (!tableExists(db, "backup_runs")) return [];
		const rows = executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("backup_runs").selectAll()).rows;
		return [...new Set(rows.flatMap((row) => {
			const record = parseBackupRun(row);
			return record?.kind === "archive" && path.isAbsolute(record.archivePath) ? [path.dirname(record.archivePath)] : [];
		}))];
	}, {
		env,
		path: resolveOpenClawStateSqlitePath(env)
	}) ?? [];
}
//#endregion
export { BACKUP_RUN_ERROR_MAX_LENGTH as i, readBackupRunFreshness as n, recordBackupRunOutcome as r, readBackupArchiveDirectories as t };
