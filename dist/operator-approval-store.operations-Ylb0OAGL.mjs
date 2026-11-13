import { s as normalizeNullableString } from "./string-coerce-6kR-86XC.mjs";
import { _ as normalizeUniqueTrimmedStringList } from "./string-normalization-YMwDjufr.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { t as buildApprovalResolutionRef } from "./approval-resolution-ref-BMBlVd2b.mjs";
import { l as runOpenClawStateWriteTransaction } from "./openclaw-state-db-DM-mSY0m.mjs";
import { C as selectOperatorApprovalRowByLocator, S as selectOperatorApprovalRow, _ as inputMatchesExistingRow, b as requireApprovalId, c as OPERATOR_APPROVAL_MAX_LIST_LIMIT, f as decodeOperatorApprovalRow, g as hasApprovalLocatorNamespaceConflict, i as forceDenyOperatorApprovalInDatabase, l as OPERATOR_APPROVAL_TERMINAL_RETENTION_MS, m as expirePendingRow, n as consumeOperatorApprovalAllowOnceInDatabase, o as resolveOperatorApprovalInDatabase, p as denyCorruptPendingRow, r as expireDueOperatorApprovalsInDatabase, s as OPERATOR_APPROVAL_EXECUTION_IDENTITY_SCHEMA_SQL, v as isValidTimestamp, w as stringifyPresentation, x as requireString, y as normalizeExecutionIdentityBinding } from "./operator-approval-store.transitions-Cacs2TdE.mjs";
import { t as matchesOperatorApprovalReviewerBinding } from "./operator-approval-reviewer-binding-CRKs8ZbC.mjs";
//#region src/gateway/operator-approval-store.kernel.ts
function insertOperatorApprovalInDatabase(params) {
	const input = params.approval;
	const id = requireApprovalId(input.id);
	const resolutionRef = buildApprovalResolutionRef({
		approvalId: id,
		approvalKind: input.kind
	});
	const runtimeEpoch = requireString(input.runtimeEpoch, "operator approval runtime epoch");
	if (!isValidTimestamp(input.createdAtMs) || !isValidTimestamp(input.expiresAtMs)) throw new Error("operator approval timestamps must be non-negative safe integers");
	if (input.expiresAtMs < input.createdAtMs) throw new Error("operator approval expiry cannot precede creation");
	const presentationJson = stringifyPresentation(input.presentation);
	if (input.presentation.kind !== input.kind) throw new Error("operator approval kind must match its safe presentation");
	const reviewerDeviceIdsJson = JSON.stringify(normalizeUniqueTrimmedStringList(input.reviewerDeviceIds));
	const audienceSessionKeys = normalizeUniqueTrimmedStringList(input.audienceSessionKeys);
	if (audienceSessionKeys.length > 64) throw new Error(`operator approval audience exceeds 64 sessions`);
	const audienceSessionKeysJson = JSON.stringify(audienceSessionKeys);
	const serialized = {
		presentationJson,
		reviewerDeviceIdsJson,
		audienceSessionKeysJson
	};
	const executionIdentityBinding = normalizeExecutionIdentityBinding(input);
	return runOpenClawStateWriteTransaction((database) => {
		const stateDb = getNodeSqliteKysely(database.db);
		executeSqliteQuerySync(database.db, stateDb.deleteFrom("operator_approvals").where("status", "!=", "pending").where("resolved_at_ms", "is not", null).where("resolved_at_ms", "<=", input.createdAtMs - OPERATOR_APPROVAL_TERMINAL_RETENTION_MS));
		if (hasApprovalLocatorNamespaceConflict({
			database,
			id,
			resolutionRef
		})) return { outcome: "conflict" };
		const source = input.source ?? {};
		const result = executeSqliteQuerySync(database.db, stateDb.insertInto("operator_approvals").values({
			approval_id: id,
			resolution_ref: resolutionRef,
			kind: input.kind,
			status: "pending",
			presentation_json: presentationJson,
			requested_by_device_id: normalizeNullableString(input.requester?.deviceId),
			requested_by_client_id: normalizeNullableString(input.requester?.clientId),
			requested_by_device_token_auth: input.requester?.deviceTokenAuth === true ? 1 : 0,
			reviewer_device_ids_json: reviewerDeviceIdsJson,
			source_agent_id: normalizeNullableString(source.agentId),
			source_session_key: normalizeNullableString(source.sessionKey),
			source_session_id: normalizeNullableString(source.sessionId),
			source_run_id: normalizeNullableString(source.runId),
			source_tool_call_id: normalizeNullableString(source.toolCallId),
			source_tool_name: normalizeNullableString(source.toolName),
			audience_session_keys_json: audienceSessionKeysJson,
			runtime_epoch: runtimeEpoch,
			created_at_ms: input.createdAtMs,
			expires_at_ms: input.expiresAtMs,
			updated_at_ms: input.createdAtMs,
			decision: null,
			terminal_reason: null,
			resolved_at_ms: null,
			resolver_kind: null,
			resolver_id: null,
			consumed_at_ms: null,
			consumed_by: null
		}).onConflict((conflict) => conflict.column("approval_id").doNothing()));
		const row = selectOperatorApprovalRow(database, id);
		if (!row) throw new Error(`operator approval '${id}' was not readable after insert`);
		const record = decodeOperatorApprovalRow(row);
		if (!record) {
			denyCorruptPendingRow({
				database,
				id,
				nowMs: input.createdAtMs,
				createdAtMs: row.created_at_ms
			});
			return { outcome: "conflict" };
		}
		if (result.numAffectedRows === 1n) {
			if (executionIdentityBinding) {
				database.db.exec(OPERATOR_APPROVAL_EXECUTION_IDENTITY_SCHEMA_SQL);
				executeSqliteQuerySync(database.db, stateDb.insertInto("operator_approval_execution_identities").values({
					approval_id: id,
					source_context_id: executionIdentityBinding.sourceContextId,
					source_execution_id: executionIdentityBinding.sourceExecutionId
				}));
			}
			return {
				outcome: "inserted",
				record
			};
		}
		if (!inputMatchesExistingRow(input, row, serialized)) return { outcome: "conflict" };
		if (executionIdentityBinding) {
			if (!tableExists(database.db, "operator_approval_execution_identities")) return { outcome: "conflict" };
			const existingBinding = executeSqliteQueryTakeFirstSync(database.db, stateDb.selectFrom("operator_approval_execution_identities").select(["source_context_id", "source_execution_id"]).where("approval_id", "=", id));
			if (existingBinding?.source_context_id !== executionIdentityBinding.sourceContextId || existingBinding.source_execution_id !== executionIdentityBinding.sourceExecutionId) return { outcome: "conflict" };
		}
		return {
			outcome: "existing",
			record
		};
	}, params.databaseOptions);
}
function getOperatorApprovalDetailedInDatabase(params) {
	const locator = requireApprovalId(params.id);
	return runOpenClawStateWriteTransaction((database) => {
		const nowMs = params.nowMs ?? Date.now();
		let row = params.allowTransportRef ? selectOperatorApprovalRowByLocator(database, locator) : selectOperatorApprovalRow(database, locator);
		if (!row) return { outcome: "not-found" };
		const id = row.approval_id;
		if (row.status === "pending" && row.expires_at_ms <= nowMs) {
			row = expirePendingRow({
				database,
				id,
				nowMs,
				createdAtMs: row.created_at_ms
			});
			if (!row) return { outcome: "not-found" };
		}
		const record = decodeOperatorApprovalRow(row);
		if (record) return {
			outcome: "found",
			record
		};
		denyCorruptPendingRow({
			database,
			id,
			nowMs,
			createdAtMs: row.created_at_ms
		});
		return params.allowTransportRef ? {
			outcome: "corrupt",
			id
		} : { outcome: "corrupt" };
	}, params.databaseOptions);
}
function listPendingOperatorApprovalsInDatabase(params = {}) {
	expireDueOperatorApprovalsInDatabase({
		nowMs: params.nowMs,
		databaseOptions: params.databaseOptions
	});
	return runOpenClawStateWriteTransaction((database) => {
		const nowMs = params.nowMs ?? Date.now();
		const stateDb = getNodeSqliteKysely(database.db);
		const resultLimit = Math.max(1, Math.min(params.limit ?? 1e3, OPERATOR_APPROVAL_MAX_LIST_LIMIT));
		const audienceSessionKey = params.audienceSessionKey === void 0 ? void 0 : requireString(params.audienceSessionKey, "operator approval audience session key");
		const requiresPostFilter = audienceSessionKey !== void 0 || params.reviewerDeviceId !== void 0;
		const records = [];
		let cursor;
		while (records.length < resultLimit) {
			let query = stateDb.selectFrom("operator_approvals").selectAll().where("status", "=", "pending").where("expires_at_ms", ">", nowMs).orderBy("created_at_ms", "asc").orderBy("approval_id", "asc").limit(requiresPostFilter ? 256 : resultLimit);
			if (params.kind) query = query.where("kind", "=", params.kind);
			if (params.sourceSessionKey) query = query.where("source_session_key", "=", params.sourceSessionKey);
			if (cursor) {
				const pageCursor = cursor;
				query = query.where((eb) => eb.or([eb("created_at_ms", ">", pageCursor.createdAtMs), eb.and([eb("created_at_ms", "=", pageCursor.createdAtMs), eb("approval_id", ">", pageCursor.id)])]));
			}
			const rows = executeSqliteQuerySync(database.db, query).rows;
			for (const row of rows) {
				const record = decodeOperatorApprovalRow(row);
				if (!record) {
					denyCorruptPendingRow({
						database,
						id: row.approval_id,
						nowMs,
						createdAtMs: row.created_at_ms
					});
					continue;
				}
				const matchesAudience = !audienceSessionKey || record.audienceSessionKeys.includes(audienceSessionKey);
				const matchesReviewer = params.reviewerDeviceId === void 0 || matchesOperatorApprovalReviewerBinding(record, params.reviewerDeviceId);
				if (matchesAudience && matchesReviewer) {
					records.push(record);
					if (records.length === resultLimit) break;
				}
			}
			const last = rows.at(-1);
			if (!requiresPostFilter || rows.length < 256 || !last) break;
			cursor = {
				createdAtMs: last.created_at_ms,
				id: last.approval_id
			};
		}
		return records;
	}, params.databaseOptions);
}
//#endregion
//#region src/gateway/operator-approval-store.operations.ts
const operations = {
	"operatorApprovals.insert": insertOperatorApprovalInDatabase,
	"operatorApprovals.get": getOperatorApprovalDetailedInDatabase,
	"operatorApprovals.pending": listPendingOperatorApprovalsInDatabase,
	"operatorApprovals.resolve": resolveOperatorApprovalInDatabase,
	"operatorApprovals.deny": forceDenyOperatorApprovalInDatabase,
	"operatorApprovals.expire": expireDueOperatorApprovalsInDatabase,
	"operatorApprovals.consume": consumeOperatorApprovalAllowOnceInDatabase
};
function isOperatorApprovalOperation(type) {
	return Object.hasOwn(operations, type);
}
function executeOperatorApprovalOperation(type, input, databaseOptions) {
	return operations[type]({
		...input,
		databaseOptions
	});
}
//#endregion
export { isOperatorApprovalOperation as n, executeOperatorApprovalOperation as t };
