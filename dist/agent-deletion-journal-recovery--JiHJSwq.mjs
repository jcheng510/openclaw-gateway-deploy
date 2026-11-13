import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as resolveOpenClawRegisteredAgentDatabasePath, r as resolveOpenClawAgentDatabaseStoredPath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { r as createOpenClawAgentDatabasePathMatcher } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { t as assertAgentDeletionJournalAvailable, y as reconstructAgentDeletionJournalSchema } from "./openclaw-state-db-schema-additive-Dxdw3FOE.mjs";
import { a as recordLegacyMigrationReceipt, r as readLegacyMigrationReceiptFromDatabase } from "./state-migrations.receipts-hdU93ZN1.mjs";
import { randomUUID } from "node:crypto";
//#region src/state/agent-deletion-journal-recovery.ts
const SOURCE_KEY = "agent-deletion-journal-reconstruction";
const JOURNAL_TABLE = "agent_deletion_journal";
const DESCRIPTION = "Reconstructed the missing agent deletion journal; held databases require explicit agent restore or delete.";
function readReport(database) {
	const receipt = readLegacyMigrationReceiptFromDatabase(database.db, SOURCE_KEY);
	if (!receipt) return;
	const report = JSON.parse(receipt.reportJson);
	if (!isRecord(report) || typeof report.description !== "string" || !Array.isArray(report.held)) throw new Error("Invalid agent deletion journal reconstruction receipt.");
	const held = report.held.map((entry) => {
		if (!isRecord(entry) || typeof entry.agentId !== "string" || entry.agentId !== normalizeAgentId(entry.agentId) || typeof entry.path !== "string" || !entry.path.trim()) throw new Error("Invalid agent database hold in deletion journal reconstruction receipt.");
		return {
			agentId: entry.agentId,
			path: entry.path
		};
	});
	return {
		description: report.description,
		held
	};
}
function decodeHolds(database, held) {
	return held.map((entry) => ({
		agentId: entry.agentId,
		path: resolveOpenClawRegisteredAgentDatabasePath(database.path, entry.path)
	}));
}
/** Read recovery facts from this exact shared-state generation without opening another database. */
function readAgentDeletionRecoveryHolds(database) {
	return decodeHolds(database, readReport(database)?.held ?? []);
}
/** Schema and Doctor producers cannot infer permission to repair an unverified store. */
function assertAgentDeletionRecoveryAllowsMutation(database, pathname) {
	assertAgentDeletionJournalAvailable(database.db);
	const samePath = createOpenClawAgentDatabasePathMatcher();
	const held = readAgentDeletionRecoveryHolds(database).find((entry) => samePath(entry.path, pathname));
	if (held) throw new Error(`Agent database ${held.path} is held after deletion journal reconstruction. Run openclaw doctor --fix for explicit restoration guidance before repairing agent ${held.agentId}.`);
}
/** The caller's transaction commits canonical reconstruction and its receipt together. */
function reconstructAgentDeletionJournal(database, held, now = Date.now()) {
	if (!database.db.isTransaction) throw new Error("Agent deletion journal reconstruction requires a shared-state transaction.");
	const previous = readReport(database);
	if (!reconstructAgentDeletionJournalSchema(database.db, database.path)) return decodeHolds(database, previous?.held ?? []);
	const entries = /* @__PURE__ */ new Map();
	for (const entry of [...previous?.held ?? [], ...held.map((target) => ({
		agentId: normalizeAgentId(target.agentId),
		path: resolveOpenClawAgentDatabaseStoredPath(database.path, target.path)
	}))]) entries.set(JSON.stringify([entry.agentId, entry.path]), entry);
	const report = {
		description: DESCRIPTION,
		held: [...entries.values()]
	};
	recordLegacyMigrationReceipt(database.db, {
		sourceKey: SOURCE_KEY,
		migrationKind: SOURCE_KEY,
		sourcePath: database.path,
		targetTable: JOURNAL_TABLE,
		sourceSha256: null,
		sourceSizeBytes: null,
		sourceRecordCount: null,
		runId: `${SOURCE_KEY}:${randomUUID()}`,
		now,
		reportJson: JSON.stringify(report),
		upsert: true
	});
	return decodeHolds(database, report.held);
}
/** Resolve only explicit targets; the immutable run report keeps the original reconstruction. */
function resolveAgentDeletionRecoveryHolds(database, agentId, targetPaths) {
	if (!database.db.isTransaction) throw new Error("Agent deletion recovery resolution requires a shared-state transaction.");
	const report = readReport(database);
	if (!report) return 0;
	const id = normalizeAgentId(agentId);
	const targets = new Set(targetPaths.map((pathname) => resolveOpenClawAgentDatabaseStoredPath(database.path, pathname)));
	const held = report.held.filter((entry) => entry.agentId !== id || !targets.has(entry.path));
	const removed = report.held.length - held.length;
	if (removed > 0) executeSqliteQuerySync(database.db, getNodeSqliteKysely(database.db).updateTable("migration_sources").set({ report_json: JSON.stringify({
		...report,
		held
	}) }).where("source_key", "=", SOURCE_KEY));
	return removed;
}
//#endregion
export { resolveAgentDeletionRecoveryHolds as i, readAgentDeletionRecoveryHolds as n, reconstructAgentDeletionJournal as r, assertAgentDeletionRecoveryAllowsMutation as t };
