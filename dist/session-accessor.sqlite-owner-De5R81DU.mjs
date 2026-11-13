import { n as executeSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { n as ensureColumn } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { E as SESSION_OWNER_COLUMN_DEFINITIONS } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { d as runOpenClawAgentWriteTransaction } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { _ as toDatabaseOptions, i as getSessionKysely, l as resolveSqliteScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { y as hasSqliteSessionOwnerColumns } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { c as trackSessionEntryCacheWrite, r as publishSessionEntryCacheInvalidation } from "./session-accessor.sqlite-entry-cache-DYTBofzQ.mjs";
//#region src/config/sessions/session-accessor.sqlite-owner.ts
function replaceSessionOwnerInTransaction(database, sessionKey, owner) {
	if (!hasSqliteSessionOwnerColumns(database.db)) {
		if (!owner?.actor.id) return false;
		for (const { columnName, dataType, tableName } of SESSION_OWNER_COLUMN_DEFINITIONS) ensureColumn(database.db, tableName, `${columnName} ${dataType}`);
	}
	let updated;
	const writeGeneration = trackSessionEntryCacheWrite(database, () => {
		updated = executeSqliteQuerySync(database.db, getSessionKysely(database.db).updateTable("session_nodes").set({
			owner_actor_type: owner?.actor.type ?? null,
			owner_actor_id: owner?.actor.id ?? null,
			owner_assigned_by_type: owner?.assignedBy?.type ?? null,
			owner_assigned_by_id: owner?.assignedBy?.id ?? null,
			owner_assigned_at: owner?.assignedAt ?? null
		}).where("session_key", "=", sessionKey).returning((eb) => ["current_session_id", eb.fn("json_extract", [eb.ref("entry_json"), eb.val("$.lifecycleRevision")]).as("lifecycle_revision")])).rows[0];
	});
	if (!updated) return false;
	publishSessionEntryCacheInvalidation(database, {
		sessionKey,
		facts: {
			kind: "owner",
			sessionId: updated.current_session_id,
			lifecycleRevision: updated.lifecycle_revision,
			owner
		}
	}, writeGeneration);
	return true;
}
function assignSessionOwner(scope, params) {
	const resolved = resolveSqliteScope(scope);
	const options = toDatabaseOptions(resolved);
	const owner = {
		actor: params.owner,
		assignedBy: params.assignedBy,
		assignedAt: params.assignedAt ?? Date.now()
	};
	return runOpenClawAgentWriteTransaction((database) => {
		params.assertCurrent?.();
		return replaceSessionOwnerInTransaction(database, resolved.sessionKey, owner);
	}, options, { operationLabel: "sessions.assign-owner" }) ? owner : null;
}
//#endregion
export { replaceSessionOwnerInTransaction as n, assignSessionOwner as t };
