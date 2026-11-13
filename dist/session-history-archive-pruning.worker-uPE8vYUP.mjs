import { n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { i as readOpenClawAgentDatabaseIdentity } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { d as runOpenClawAgentWriteTransaction } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { n as withOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { i as getSessionKysely } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import fs from "node:fs";
import path from "node:path";
//#region src/config/sessions/session-history-archive-pruning.worker.ts
function readSessionArchivePruningInDatabase(database) {
	if (!tableExists(database.db, "session_transcript_archives")) return null;
	const db = getSessionKysely(database.db);
	const row = executeSqliteQuerySync(database.db, db.selectFrom("session_transcript_archives").select([
		"archive_name",
		"archive_sha256",
		"created_at",
		"encoding",
		"generation",
		"published_at",
		"reason",
		"session_id",
		"session_key"
	]).where("published_at", "is not", null).orderBy("created_at", "asc").orderBy("session_id", "asc").orderBy("generation", "asc").limit(1)).rows[0];
	return row && row.published_at !== null ? {
		...row,
		published_at: row.published_at
	} : null;
}
function readSessionArchivePruningInWorker(request) {
	const identity = `file:${request.expectedIdentity.physicalIdentity}`;
	assertExistingDatabaseIdentity(request.database.path, identity);
	const result = withOpenClawAgentDatabaseReadOnly((database) => {
		const current = readOpenClawAgentDatabaseIdentity(database);
		if (current.identity !== request.expectedIdentity.physicalIdentity || current.filename !== request.expectedIdentity.nativeLocation) throw new Error("SQLite archive pruning database owner changed");
		const value = readSessionArchivePruningInDatabase(database);
		assertExistingDatabaseIdentity(request.database.path, identity);
		return value;
	}, {
		...request.database,
		env: request.env
	});
	if (!result.found) throw new Error(`SQLite archive pruning cannot read its database: ${result.reason}`);
	return result.value;
}
function removeLegacyArchiveFile(filePath, admitCommit) {
	let stat;
	try {
		stat = fs.statSync(filePath);
	} catch {
		admitCommit();
		return "failed";
	}
	if (!stat.isFile()) {
		admitCommit();
		return "failed";
	}
	admitCommit();
	try {
		fs.unlinkSync(filePath);
		return "removed";
	} catch {
		return "failed";
	}
}
function removeLegacySessionArchiveInDatabase(database, options, filePath, admit) {
	return runOpenClawAgentWriteTransaction((transactionDb) => {
		if (transactionDb.db !== database.db) throw new Error("SQLite archive pruning lost its database owner");
		admit("transaction");
		const db = getSessionKysely(transactionDb.db);
		if (tableExists(transactionDb.db, "session_transcript_archives") && executeSqliteQuerySync(transactionDb.db, db.selectFrom("session_transcript_archives").select("archive_name").where("archive_name", "=", path.basename(filePath)).limit(1)).rows.length > 0) {
			admit("commit");
			return "preserved";
		}
		return removeLegacyArchiveFile(filePath, () => admit("commit"));
	}, options, { operationLabel: "session.archive.remove-legacy" });
}
function deletePublishedSessionArchiveInDatabase(database, options, row, admit) {
	runOpenClawAgentWriteTransaction((transactionDb) => {
		if (transactionDb.db !== database.db) throw new Error("SQLite archive pruning lost its database owner");
		admit("transaction");
		const db = getSessionKysely(transactionDb.db);
		if (executeSqliteQuerySync(transactionDb.db, db.deleteFrom("session_transcript_archives").where("session_id", "=", row.session_id).where("generation", "=", row.generation).where("archive_name", "=", row.archive_name).where("archive_sha256", "=", row.archive_sha256).where("created_at", "=", row.created_at).where("encoding", "=", row.encoding).where("reason", "=", row.reason).where("session_key", "=", row.session_key).where("published_at", "=", row.published_at)).numAffectedRows !== 1n) throw new Error("SQLite session archive changed during pruning; retry cleanup.");
		admit("commit");
	}, options, { operationLabel: "session.archive.delete-published" });
}
function reclaimSessionArchivePagesInWorker(database, maxPages, admit) {
	return database.walMaintenance.reclaimFreePages({
		maxPages,
		beforeMutation: () => admit("transaction"),
		onCommit: () => admit("commit")
	});
}
//#endregion
export { deletePublishedSessionArchiveInDatabase, readSessionArchivePruningInDatabase, readSessionArchivePruningInWorker, reclaimSessionArchivePagesInWorker, removeLegacySessionArchiveInDatabase };
