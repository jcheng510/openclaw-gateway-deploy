import { i as extractErrorCode, r as collectNestedErrorCandidates } from "./error-coercion-1P2One0X.mjs";
import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CJrzFzqU.mjs";
import { u as sql } from "./kysely-sync-Y4_ti-rQ.mjs";
import "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import "./sqlite-number-DZt1m75H.mjs";
import { c as isStateDatabaseReadAdmissionInvalidatedError } from "./openclaw-state-db-async-lifecycle-D4cx8OBO.mjs";
import { t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { l as reserveSqliteWorkerInputPreparation, n as createSqliteWorkerWriteAdmission } from "./sqlite-worker-store-DNLj-iuz.mjs";
import { a as runOpenClawStateWorkerOperation } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import { t as createKeyedFifoLeaseRegistry } from "./keyed-fifo-lease-BbGhj9IJ.mjs";
import { d as decodeOperatorApprovalHistoryCursor } from "./operator-approval-store.transitions-Cacs2TdE.mjs";
import "node:crypto";
import { serialize } from "node:v8";
sql`operator_approvals.presentation_json`, sql`operator_approvals.reviewer_device_ids_json`, sql`operator_approvals.audience_session_keys_json`;
//#endregion
//#region src/gateway/operator-approval-store.ts
/** Storage admission failure is not evidence that a pending row is corrupt. */
function isOperatorApprovalStoreRefusal(error) {
	return collectNestedErrorCandidates(error).some((cause) => isStateDatabaseReadAdmissionInvalidatedError(cause) || [
		"closed",
		"overloaded",
		"unavailable"
	].includes(extractErrorCode(cause) ?? ""));
}
function isOperatorApprovalStoreOutcomeUnknown(error) {
	return collectNestedErrorCandidates(error).some((cause) => extractErrorCode(cause) === "outcome-unknown");
}
const loadNativeStore = createLazyRuntimeModule(() => import("./operator-approval-store.native-DkWqeOqf.mjs"));
const leases = createKeyedFifoLeaseRegistry(Symbol.for("openclaw.operatorApprovalStoreLeases"));
async function runApprovalStoreOperation(context, input, operation, options, assertCurrent) {
	context.admission.assertCurrent();
	const preparation = reserveSqliteWorkerInputPreparation(serialize(input).byteLength);
	const lease = expectDefined(leases.reserve([context.admission.identity.key, `path:${context.admission.identity.canonicalPath}`]), "Operator approval storage lease");
	try {
		await lease.wait();
		preparation.assertCurrent();
		context.admission.assertCurrent();
		assertCurrent?.();
		return await runOpenClawStateWorkerOperation(context, (scope) => operation(scope, preparation), options);
	} finally {
		preparation.release();
		lease.release();
	}
}
function execute(type, input, { databaseOptions, assertCurrent, guard }, onCommitted) {
	const context = captureOpenClawStateWorkerContext({
		...databaseOptions,
		path: databaseOptions?.database?.path ?? databaseOptions?.path
	});
	const captured = structuredClone(input);
	const assertOperationCurrent = () => {
		context.admission.assertCurrent();
		guard?.assertCurrent();
		assertCurrent?.();
	};
	const native = guard?.family === "native-compatibility";
	let admission;
	const createWriteAdmission = createSqliteWorkerWriteAdmission(assertOperationCurrent, [context.admission.databasePath]);
	const createAdmission = (operation) => {
		const retained = createWriteAdmission(operation);
		admission = retained.admission;
		return retained;
	};
	const publishCommitted = (facts) => {
		if (onCommitted && isRecord(facts) && facts.type === "operatorApprovals.resolve" && typeof facts.resolutionKey === "string") onCommitted(facts.resolutionKey);
	};
	return runApprovalStoreOperation(context, captured, async (scope, preparation) => {
		if (native) {
			const store = await loadNativeStore();
			preparation.assertCurrent();
			assertOperationCurrent();
			preparation.release();
			return store.executeNativeOperatorApproval(type, captured, context, assertOperationCurrent, onCommitted ? publishCommitted : void 0);
		}
		try {
			return await preparation.handoff(() => scope.execute({
				type,
				input: captured
			}));
		} finally {
			publishCommitted(admission?.committed?.facts);
		}
	}, {
		assertCurrent: native ? void 0 : assertOperationCurrent,
		...native ? {} : { createAdmission }
	}, assertOperationCurrent);
}
function insertOperatorApproval(params) {
	const { databaseOptions, assertCurrent, guard, ...input } = params;
	return execute("operatorApprovals.insert", input, {
		databaseOptions,
		assertCurrent,
		guard
	});
}
function getOperatorApprovalDetailed(params) {
	const { databaseOptions, assertCurrent, guard, ...input } = params;
	return execute("operatorApprovals.get", input, {
		databaseOptions,
		assertCurrent,
		guard
	});
}
function listPendingOperatorApprovals(params = {}) {
	const { databaseOptions, assertCurrent, guard, ...input } = params;
	return execute("operatorApprovals.pending", input, {
		databaseOptions,
		assertCurrent,
		guard
	});
}
function resolveOperatorApproval(params) {
	const { databaseOptions, assertCurrent, guard, onCommitted, ...input } = params;
	return execute("operatorApprovals.resolve", input, {
		databaseOptions,
		assertCurrent,
		guard
	}, onCommitted);
}
function forceDenyOperatorApproval(params) {
	const { databaseOptions, assertCurrent, guard, ...input } = params;
	return execute("operatorApprovals.deny", input, {
		databaseOptions,
		assertCurrent,
		guard
	});
}
function expireDueOperatorApprovals(params) {
	const { databaseOptions, assertCurrent, guard, ...input } = params;
	return execute("operatorApprovals.expire", input, {
		databaseOptions,
		assertCurrent,
		guard
	});
}
function consumeOperatorApprovalAllowOnce(params) {
	const { databaseOptions, assertCurrent, guard, ...input } = params;
	return execute("operatorApprovals.consume", input, {
		databaseOptions,
		assertCurrent,
		guard
	});
}
async function listTerminalOperatorApprovals(params = {}) {
	const { databaseOptions, assertCurrent, guard, ...input } = params;
	if (input.cursor !== void 0) decodeOperatorApprovalHistoryCursor(input.cursor);
	const context = captureOpenClawStateWorkerContext({
		...databaseOptions,
		path: databaseOptions?.database?.path ?? databaseOptions?.path
	});
	const captured = structuredClone(input);
	const assertOperationCurrent = () => {
		context.admission.assertCurrent();
		guard?.assertCurrent();
		assertCurrent?.();
	};
	return runApprovalStoreOperation(context, captured, async (_scope, preparation) => {
		preparation.assertCurrent();
		assertOperationCurrent();
		preparation.release();
		const result = await executeExistingOpenClawStateRead({
			env: context.environment,
			path: context.admission.databasePath
		}, {
			type: "operatorApprovals.history",
			input: captured
		});
		assertOperationCurrent();
		if (result?.ok && result.type === "operatorApprovals.history") return result.history;
		throw new Error("Operator approval history database became unavailable");
	}, void 0, assertOperationCurrent);
}
//#endregion
export { insertOperatorApproval as a, listPendingOperatorApprovals as c, getOperatorApprovalDetailed as i, listTerminalOperatorApprovals as l, expireDueOperatorApprovals as n, isOperatorApprovalStoreOutcomeUnknown as o, forceDenyOperatorApproval as r, isOperatorApprovalStoreRefusal as s, consumeOperatorApprovalAllowOnce as t, resolveOperatorApproval as u };
