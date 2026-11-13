import { t as collectSessionEntryLookupKeys } from "./store-entry-CBksE8pX.mjs";
import { r as assertCanonicalSqliteSessionKeysCurrent } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { X as assertLifecycleTargetSnapshotUnchanged, c as readSessionIdentitySnapshot, f as writeSessionEntry, l as readUnchangedLifecycleTargetSnapshot } from "./session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
//#region src/config/sessions/session-accessor.sqlite-entry-mutation.ts
/** The caller owns transaction admission and publication after the durable commit. */
function replaceSessionEntryInDatabase(database, sessionKey, entry) {
	const identityKeys = collectSessionEntryLookupKeys(sessionKey);
	const previous = readSessionIdentitySnapshot(database, identityKeys);
	writeSessionEntry(database, sessionKey, entry);
	return {
		previous,
		current: readSessionIdentitySnapshot(database, identityKeys)
	};
}
/** Revalidate prepared rows and apply the patch on the already-admitted connection. */
function applySessionEntryPatchInDatabase(database, params) {
	if (params.validateCanonicalKeys) assertCanonicalSqliteSessionKeysCurrent(database);
	let fresh = readUnchangedLifecycleTargetSnapshot(database, params.prepared);
	if (!fresh) {
		fresh = params.readSnapshot(database);
		assertLifecycleTargetSnapshotUnchanged(params.prepared, fresh, params.operationLabel);
	}
	params.options.assertCommitAllowed?.();
	if (!params.next) return { entry: structuredClone(params.writeBase) };
	const previous = new Map(fresh.map((row) => [row.sessionKey, row.entry]));
	const selectedPreviousEntry = fresh[0]?.entry ?? params.writeBase;
	const persisted = writeSessionEntry(database, params.sessionKey, params.next, {
		...params.options.consumePendingReset ? { consumePendingReset: true } : {},
		...params.options.providerReviewMutation ? { providerReviewMutation: true } : {},
		previousEntry: selectedPreviousEntry,
		...fresh[0]?.sessionKey === params.sessionKey ? { canonicalPreviousEntry: fresh[0].entry } : {}
	});
	const current = /* @__PURE__ */ new Map([[params.sessionKey, persisted]]);
	return {
		entry: structuredClone(persisted),
		identity: {
			previous,
			current
		}
	};
}
//#endregion
export { replaceSessionEntryInDatabase as n, applySessionEntryPatchInDatabase as t };
