import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { a as runSqliteImmediateTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { a as deleteDeliveryQueueEntryInDatabase, g as upsertDeliveryQueueEntryInDatabase, l as getDeliveryQueueEntryOwnersInDatabase, t as completeDeliveryQueueEntryInDatabase } from "./delivery-queue-sqlite.kernel-B9U98VOY.mjs";
//#region src/infra/delivery-queue-sqlite-namespace.kernel.ts
/** Atomically publishes one staged owner only when retired namespaces do not own its id. */
function commitStagedDeliveryQueueEntryOnceAcrossNamespacesInDatabase(database, params) {
	return runSqliteImmediateTransactionSync(database.db, () => {
		const queueDb = getNodeSqliteKysely(database.db);
		if (!executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select("id").where("queue_name", "=", params.stagingQueueName).where("id", "=", params.stagingId).where("status", "=", "pending"))) return "missing";
		if (getDeliveryQueueEntryOwnersInDatabase(database, [params.queueName, ...params.conflictQueueNames], params.entry.id).size > 0) return "existing";
		if (!upsertDeliveryQueueEntryInDatabase({
			queueName: params.queueName,
			entry: params.entry,
			insertOnly: true
		}, database)) return "existing";
		if (executeSqliteQuerySync(database.db, queueDb.deleteFrom("delivery_queue_entries").where("queue_name", "=", params.stagingQueueName).where("id", "=", params.stagingId).where("status", "=", "pending")).numAffectedRows !== 1n) throw new Error(`Delivery queue staging row changed during commit: ${params.stagingQueueName}/${params.stagingId}`);
		return "created";
	}, {
		databaseLabel: database.path,
		operationLabel: "commit staged stable delivery queue owner"
	});
}
/** Inserts one stable owner only when no current or retired namespace owns its id. */
function upsertDeliveryQueueEntryOnceAcrossNamespacesInDatabase(database, params) {
	return runSqliteImmediateTransactionSync(database.db, () => {
		if (getDeliveryQueueEntryOwnersInDatabase(database, [params.queueName, ...params.conflictQueueNames], params.entry.id).size > 0) return false;
		return upsertDeliveryQueueEntryInDatabase({
			queueName: params.queueName,
			entry: params.entry,
			insertOnly: true
		}, database);
	}, {
		databaseLabel: database.path,
		operationLabel: "insert stable delivery queue owner"
	});
}
function matchesPendingDeliveryQueueEntry(database, queueName, expectedEntry) {
	const source = executeSqliteQueryTakeFirstSync(database.db, getNodeSqliteKysely(database.db).selectFrom("delivery_queue_entries").select(["entry_json", "status"]).where("queue_name", "=", queueName).where("id", "=", expectedEntry.id));
	return source != null && source.status === "pending" && source.entry_json === JSON.stringify(expectedEntry);
}
/** Replaces a pending entry only while its authoritative serialized value is unchanged. */
function replacePendingDeliveryQueueEntryInDatabase(database, params) {
	if (params.expectedEntry.id !== params.replacementEntry.id) throw new Error(`Delivery queue replacement id mismatch: ${params.expectedEntry.id} != ${params.replacementEntry.id}`);
	return runSqliteImmediateTransactionSync(database.db, () => {
		if (!matchesPendingDeliveryQueueEntry(database, params.queueName, params.expectedEntry)) return false;
		return upsertDeliveryQueueEntryInDatabase({
			queueName: params.queueName,
			entry: params.replacementEntry,
			updatePendingOnly: true
		}, database);
	}, {
		databaseLabel: database.path,
		operationLabel: "replace pending delivery queue entry"
	});
}
/** Completes a pending entry only while its authoritative serialized value is unchanged. */
function completePendingDeliveryQueueEntryInDatabase(database, params) {
	return runSqliteImmediateTransactionSync(database.db, () => {
		if (!matchesPendingDeliveryQueueEntry(database, params.queueName, params.expectedEntry)) return false;
		completeDeliveryQueueEntryInDatabase(database, params.queueName, params.expectedEntry.id);
		return true;
	}, {
		databaseLabel: database.path,
		operationLabel: "complete pending delivery queue entry"
	});
}
/**
* Commits an asynchronously prepared replacement only if the authoritative
* source row is unchanged, then removes or terminally fences the old owner.
*/
function movePendingDeliveryQueueEntryNamespaceInDatabase(database, params) {
	return runSqliteImmediateTransactionSync(database.db, () => {
		const queueDb = getNodeSqliteKysely(database.db);
		if (!matchesPendingDeliveryQueueEntry(database, params.sourceQueueName, params.expectedSourceEntry)) return "source-changed";
		if (getDeliveryQueueEntryOwnersInDatabase(database, [params.destinationQueueName, ...params.conflictQueueNames ?? []], params.destinationEntry.id).size > 0) return "destination-exists";
		if (params.stagingId && params.stagingQueueName) {
			if (!executeSqliteQueryTakeFirstSync(database.db, queueDb.selectFrom("delivery_queue_entries").select("id").where("queue_name", "=", params.stagingQueueName).where("id", "=", params.stagingId).where("status", "=", "pending"))) return "staging-missing";
		}
		if (!upsertDeliveryQueueEntryInDatabase({
			queueName: params.destinationQueueName,
			entry: params.destinationEntry,
			insertOnly: true
		}, database)) return "destination-exists";
		if (params.retainSourceCompletionFence) completeDeliveryQueueEntryInDatabase(database, params.sourceQueueName, params.expectedSourceEntry.id);
		else deleteDeliveryQueueEntryInDatabase(database, params.sourceQueueName, params.expectedSourceEntry.id);
		if (params.stagingId && params.stagingQueueName) deleteDeliveryQueueEntryInDatabase(database, params.stagingQueueName, params.stagingId);
		return "moved";
	}, {
		databaseLabel: database.path,
		operationLabel: "migrate delivery queue namespace"
	});
}
//#endregion
export { upsertDeliveryQueueEntryOnceAcrossNamespacesInDatabase as a, replacePendingDeliveryQueueEntryInDatabase as i, completePendingDeliveryQueueEntryInDatabase as n, movePendingDeliveryQueueEntryNamespaceInDatabase as r, commitStagedDeliveryQueueEntryOnceAcrossNamespacesInDatabase as t };
