import { x as isIndexedSessionEntry } from "./transcript-payload-BY1k8MVa.mjs";
import { o as readTranscriptContextVersionInTransaction } from "./session-accessor.sqlite-transcript-state-C4czfjuW.mjs";
import { i as resolveSqliteSessionTranscriptReadFence } from "./session-transcript-read-fence-Bq0b1oaG.mjs";
import { t as withCurrentProjectionSnapshot } from "./session-accessor.sqlite-active-projection-Bh7j4wOo.mjs";
import { g as readTranscriptEventAtSeqInTransaction } from "./session-accessor.sqlite-read-lTzWPVDn.mjs";
import { r as readActiveTranscriptEntryAnchorInTransaction } from "./session-accessor.sqlite-transcript-anchor-D71pHf5z.mjs";
import { n as readActiveTranscriptEntryIdentityInSnapshot } from "./session-accessor.sqlite-active-events-CZQ0aW8w.mjs";
//#region src/config/sessions/session-accessor.sqlite-current-turn.ts
/** Pair one active entry with the exact hydrated view without traversing transcript history. */
function readSessionTranscriptCurrentTurnEntry(scope, options) {
	return withCurrentProjectionSnapshot(scope, (projection) => {
		const { database, resolved } = projection;
		const fence = resolveSqliteSessionTranscriptReadFence({
			database,
			...resolved
		});
		const version = readTranscriptContextVersionInTransaction(database, resolved.sessionId);
		if (version.generation !== options.version.generation || version.rawSeq !== options.version.rawSeq || version.updatedAt !== options.version.updatedAt) throw new Error("Persisted user turn changed before replay admission");
		const anchor = readActiveTranscriptEntryAnchorInTransaction({
			database,
			resolved: {
				...resolved,
				sessionKey: resolved.sessionKey ?? scope.sessionKey
			},
			entryId: options.entryId
		});
		if (fence && anchor && anchor.rawSeq >= fence.beforeRawSeq) return {
			kind: "current-turn-entry",
			version
		};
		const identity = options.includeEntry ? readActiveTranscriptEntryIdentityInSnapshot(projection, options.entryId) : void 0;
		const event = identity && (!fence || identity.seq < fence.beforeRawSeq) ? readTranscriptEventAtSeqInTransaction(database, resolved.sessionId, identity.seq)?.event : void 0;
		return {
			kind: "current-turn-entry",
			version,
			anchor,
			event: identity && isIndexedSessionEntry(event) && event.id === options.entryId && event.parentId === identity.parentId ? event : void 0
		};
	}, options);
}
//#endregion
export { readSessionTranscriptCurrentTurnEntry as t };
