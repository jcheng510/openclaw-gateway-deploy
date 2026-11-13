import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { a as iterateSqliteQuerySync, c as prepareSqliteQueryTakeFirstSync, u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { d as sqlitePrimaryResultCode } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { o as classifyOpenClawAgentDatabaseReadError } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as openOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-open-BuSJ-FUr.mjs";
import { o as readTranscriptStorageEncoding, s as transcriptEventJsonSql } from "./transcript-payload-BY1k8MVa.mjs";
import "./openclaw-agent-db-readonly-CkWWSfuG.mjs";
import { _ as toDatabaseOptions } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { n as assertSessionTranscriptHot } from "./session-cold-storage-state-DkGnIhMN.mjs";
import { o as readTranscriptContextVersionInTransaction } from "./session-accessor.sqlite-transcript-state-C4czfjuW.mjs";
import { n as SessionTranscriptStorageUnavailableError } from "./session-transcript-projection-error-B7C6SQei.mjs";
import { i as resolveSqliteSessionTranscriptReadFence } from "./session-transcript-read-fence-Bq0b1oaG.mjs";
import { i as sessionHistoryCleanupError } from "./session-history-worker-errors-BIrOr1iJ.mjs";
import { p as prepareTranscriptEventReadQuery } from "./session-accessor.sqlite-read-lTzWPVDn.mjs";
//#region src/config/sessions/session-transcript-hydration.worker.ts
const SLICE_BYTES = 65536;
const CHUNK_BYTES = 1048576;
const CHUNK_FRAMES = 128;
/** One task owns its snapshot through every acknowledged frame and native cleanup. */
async function streamSessionTranscriptHydration(request, channel, control) {
	return await control.runNativeSection(async () => {
		const opened = openOpenClawAgentDatabaseReadOnly(toDatabaseOptions(request.resolvedScope));
		if (!opened.found) throw new SessionTranscriptStorageUnavailableError(opened.reason);
		const { database } = opened;
		let outcome;
		try {
			database.db.exec("BEGIN DEFERRED");
			const fence = resolveSqliteSessionTranscriptReadFence({
				database,
				...request.resolvedScope
			});
			assertSessionTranscriptHot(database.db, request.resolvedScope.sessionId);
			const version = readTranscriptContextVersionInTransaction(database, request.resolvedScope.sessionId);
			const encoding = readTranscriptStorageEncoding(database.db);
			const source = prepareTranscriptEventReadQuery(database, request.resolvedScope.sessionId, {
				...request.target,
				beforeEventSeq: fence?.beforeRawSeq
			});
			const readPart = prepareSqliteQueryTakeFirstSync(database.db, (parameter) => source.select(sql`substr(CAST(${transcriptEventJsonSql(database.db)} AS BLOB), ${parameter((value) => value.offset)}, ${SLICE_BYTES})`.as("data")).where("seq", "=", parameter((value) => value.seq)));
			let frames = [];
			let bytes = 0;
			let eventCount = 0;
			const flush = async () => {
				if (frames.length === 0) return;
				(await channel.request({
					kind: "transcript-hydration-chunk",
					encoding,
					frames
				})).consumed();
				frames = [];
				bytes = 0;
				control.throwIfCancelled();
			};
			for (const row of iterateSqliteQuerySync(database.db, source.select("seq").orderBy("seq", "asc"))) for (let offset = 1;; offset += SLICE_BYTES) {
				control.throwIfCancelled();
				const { data } = expectDefined(readPart({
					seq: row.seq,
					offset
				}), "transcript snapshot row");
				if (bytes + data.byteLength > CHUNK_BYTES) await flush();
				const endOfEvent = data.byteLength < SLICE_BYTES;
				frames.push({
					data,
					endOfEvent
				});
				bytes += data.byteLength;
				if (bytes >= CHUNK_BYTES || frames.length >= CHUNK_FRAMES) await flush();
				if (endOfEvent) {
					eventCount++;
					break;
				}
			}
			await flush();
			control.throwIfCancelled();
			outcome = { value: {
				kind: "full",
				version,
				eventCount
			} };
		} catch (error) {
			outcome = { error: sqlitePrimaryResultCode(error) === 1 ? classifyOpenClawAgentDatabaseReadError(database.db, error) : error };
		}
		try {
			try {
				if (database.db.isTransaction) database.db.exec("ROLLBACK");
			} finally {
				database.close();
			}
		} catch (cleanupError) {
			throw "error" in outcome ? sessionHistoryCleanupError(outcome.error, cleanupError, "database close") : cleanupError;
		}
		if ("error" in outcome) throw outcome.error;
		return outcome.value;
	});
}
//#endregion
export { streamSessionTranscriptHydration };
