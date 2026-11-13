import { t as extractSqliteTableSchema } from "./sqlite-schema-sql-CKIqAlrf.mjs";
import { a as runSqliteImmediateTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { t as OPENCLAW_AGENT_SCHEMA_SQL } from "./openclaw-agent-schema-CV4V4sh3.mjs";
//#region src/state/openclaw-agent-session-transcript-archive-schema.ts
const SESSION_TRANSCRIPT_ARCHIVES_TABLE = "session_transcript_archives";
const ENSURED_DATABASES = /* @__PURE__ */ new WeakSet();
/** Lazily installs the additive canonical archive owner on first archive use. */
function ensureSessionTranscriptArchiveSchema(db) {
	if (ENSURED_DATABASES.has(db)) return;
	const ensure = () => {
		db.exec(extractSqliteTableSchema(OPENCLAW_AGENT_SCHEMA_SQL, SESSION_TRANSCRIPT_ARCHIVES_TABLE, {
			endMarker: "CREATE TABLE IF NOT EXISTS transcript_rewrite_watermarks (",
			includeEndMarker: false,
			errorMessage: "OpenClaw session transcript archive schema markers are missing."
		}));
	};
	if (db.isTransaction) {
		ensure();
		return;
	}
	runSqliteImmediateTransactionSync(db, ensure);
	ENSURED_DATABASES.add(db);
}
//#endregion
export { ensureSessionTranscriptArchiveSchema as n, SESSION_TRANSCRIPT_ARCHIVES_TABLE as t };
