import { u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import { f as transcriptEventUtf8BytesSql } from "./transcript-payload-BY1k8MVa.mjs";
//#region src/config/sessions/session-transcript-read-bytes.ts
/** Preserve native identity accounting where a legacy row has no exact UTF-8 size. */
function transcriptEventReadBytesSql(alias = "transcript_events") {
	const identity = sql.ref(`${alias}.event_json`);
	return sql`coalesce(${transcriptEventUtf8BytesSql(alias)}, octet_length(${identity}))`;
}
//#endregion
export { transcriptEventReadBytesSql as t };
