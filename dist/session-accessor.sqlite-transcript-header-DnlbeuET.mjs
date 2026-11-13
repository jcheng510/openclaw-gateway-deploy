import { r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as getSessionKysely } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { t as appendTranscriptEventInTransaction } from "./session-accessor.sqlite-transcript-store-CPlEEZZV.mjs";
import { t as createSessionTranscriptHeader } from "./transcript-header-Dher2Bur.mjs";
//#region src/config/sessions/session-accessor.sqlite-transcript-header.ts
function ensureTranscriptHeader(database, scope, cwd, projection) {
	const db = getSessionKysely(database.db);
	if (executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("transcript_events").select("seq").where("session_id", "=", scope.sessionId).limit(1))) return;
	appendTranscriptEventInTransaction(database, scope, createSessionTranscriptHeader({
		cwd,
		sessionId: scope.sessionId
	}), projection);
}
//#endregion
export { ensureTranscriptHeader as t };
