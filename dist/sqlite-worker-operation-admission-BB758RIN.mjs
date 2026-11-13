import { u as toErrorObject } from "./error-coercion-1P2One0X.mjs";
import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as resolveIdentityPathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
import { MessageChannel, receiveMessageOnPort } from "node:worker_threads";
import { serialize } from "node:v8";
import { isNativeError, isProxy } from "node:util/types";
//#region src/infra/sqlite-worker-contract.ts
const SQLITE_WORKER_PREPARE_COMMAND = Symbol.for("openclaw.sqliteWorkerPrepareCommand");
const SQLITE_WORKER_PREPARE_ADMITTED = Symbol.for("openclaw.sqliteWorkerPrepareAdmitted");
const SQLITE_WORKER_OPERATION_CLEANUP = Symbol.for("openclaw.sqliteWorkerOperationCleanup");
const SQLITE_WORKER_CLOSE_RECEIPT = Symbol.for("openclaw.sqliteWorkerCloseReceipt");
const SQLITE_WORKER_MAX_MESSAGE_BYTES = 33554432;
const SQLITE_WORKER_MAX_RESULT_BYTES = 67108864;
const retainedWorkerErrorCode = Symbol.for("openclaw.sqliteWorkerErrorCode");
var SqliteWorkerError = class extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
		this.name = "SqliteWorkerError";
		Object.defineProperty(this, retainedWorkerErrorCode, { value: code });
	}
};
/** Carry only canonical worker classification through a local cleanup aggregate. */
function retainSqliteWorkerErrorCode(error, source) {
	let code;
	try {
		code = Object.getOwnPropertyDescriptor(source, retainedWorkerErrorCode)?.value;
	} catch {
		return error;
	}
	if (code === "closed" || code === "overloaded" || code === "unavailable" || code === "outcome-unknown") {
		Object.defineProperty(error, retainedWorkerErrorCode, { value: code });
		Object.assign(error, { code });
	}
	return error;
}
/** Recognize canonical broker errors without admitting cleanup aggregates for retry. */
function isSqliteWorkerError(error, code) {
	if (!(error instanceof Error) || error instanceof AggregateError) return false;
	try {
		return Object.getOwnPropertyDescriptor(error, retainedWorkerErrorCode)?.value === code;
	} catch {
		return false;
	}
}
/** Unknown native outcomes remain terminal through canonical cause and cleanup envelopes. */
function hasSqliteWorkerOutcomeUnknown(error) {
	const pending = [error];
	const seen = /* @__PURE__ */ new Set();
	while (pending.length > 0) {
		const current = pending.pop();
		if (seen.has(current) || isProxy(current) || !isNativeError(current)) continue;
		seen.add(current);
		if (Object.getOwnPropertyDescriptor(current, retainedWorkerErrorCode)?.value === "outcome-unknown") return true;
		const cause = Object.getOwnPropertyDescriptor(current, "cause");
		if (cause && "value" in cause) pending.push(cause.value);
		let prototype = Object.getPrototypeOf(current);
		let aggregate = false;
		while (prototype && !isProxy(prototype)) {
			const constructor = Object.getOwnPropertyDescriptor(prototype, "constructor")?.value;
			if (prototype === AggregateError.prototype || typeof constructor === "function" && !isProxy(constructor) && Object.getOwnPropertyDescriptor(constructor, "name")?.value === "AggregateError" && Object.getOwnPropertyDescriptor(constructor, "prototype")?.value === prototype && Object.getOwnPropertyDescriptor(prototype, "name")?.value === "AggregateError") {
				aggregate = true;
				break;
			}
			prototype = Object.getPrototypeOf(prototype);
		}
		if (!aggregate) continue;
		const errors = Object.getOwnPropertyDescriptor(current, "errors")?.value;
		if (isProxy(errors) || !Array.isArray(errors)) continue;
		for (const key of Object.keys(errors)) {
			if (!/^(0|[1-9][0-9]*)$/.test(key)) continue;
			const item = Object.getOwnPropertyDescriptor(errors, key);
			if (item && "value" in item) pending.push(item.value);
		}
	}
	return false;
}
//#endregion
//#region src/infra/sqlite-worker-operation-admission.ts
const REQUESTED = 0;
const GRANTED = 1;
const REFUSED = 2;
/** Only the factory's admission before agent open may certify this refusal. */
const SqliteWorkerOpenRefusedError = resolveGlobalSingleton(Symbol.for("openclaw.sqliteWorkerOpenRefusedError"), () => class OpenRefusedError extends Error {
	constructor(originalError) {
		super("SQLite worker admission was refused before agent open", { cause: originalError });
		this.originalError = originalError;
		this.name = "SqliteWorkerOpenRefusedError";
	}
});
/** The caller retains real source custody before invoking the synchronous grant. */
function createSqliteWorkerOperationAdmission(admit, attachment) {
	const { port1, port2 } = new MessageChannel();
	if (attachment !== void 0) try {
		port1.postMessage({
			kind: "sqlite-operation-attachment",
			value: attachment
		}, []);
	} catch (error) {
		port1.close();
		port2.close();
		throw error;
	}
	const inOwnerContext = AsyncLocalStorage.snapshot();
	const decisions = /* @__PURE__ */ new Set();
	const cleanupFailures = [];
	let closed = false;
	let failure;
	let committed;
	let settlement;
	let databaseAuthority;
	const waiting = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));
	const recordFailure = (error, source) => {
		if (!failure || failure.source === "domain" && source !== "domain") failure = {
			error,
			source
		};
	};
	const refuse = (decision, error, source) => {
		if (Atomics.compareExchange(decision, 0, REQUESTED, REFUSED) === REQUESTED) {
			recordFailure(error, source);
			Atomics.notify(decision, 0);
		} else if (Atomics.load(decision, 0) === GRANTED) cleanupFailures.push(error);
	};
	const receive = (message) => {
		if (isRecord(message) && message.kind === "native-commit") {
			if (!isRecord(message.committed) || settlement) {
				recordFailure(new SqliteWorkerError("SQLite worker commit receipt is invalid", "outcome-unknown"), "protocol");
				return;
			}
			committed = { facts: message.committed.facts };
			return;
		}
		if (isRecord(message) && message.kind === "native-settlement") {
			const value = message.settlement;
			if (!isRecord(value) || value.kind !== "completed" && value.kind !== "unknown" || value.committed !== void 0 && !isRecord(value.committed) || settlement) {
				recordFailure(new SqliteWorkerError("SQLite worker native settlement is invalid", "outcome-unknown"), "protocol");
				return;
			}
			if (isRecord(value.committed)) committed = { facts: value.committed.facts };
			settlement = {
				kind: value.kind,
				...committed ? { committed } : {}
			};
			return;
		}
		if (!isRecord(message) || !(message.decision instanceof SharedArrayBuffer) || message.decision.byteLength !== Int32Array.BYTES_PER_ELEMENT || message.stage !== "open" && message.stage !== "prepare" && message.stage !== "transaction" && message.stage !== "commit") {
			recordFailure(new SqliteWorkerError("SQLite worker admission request is invalid", "unavailable"), "protocol");
			return;
		}
		const decision = new Int32Array(message.decision);
		decisions.add(decision);
		if (closed) {
			refuse(decision, new SqliteWorkerError("SQLite worker admission is closed", "closed"), "authority");
			return;
		}
		const request = {
			stage: message.stage,
			facts: message.facts
		};
		const grant = () => {
			if (closed || Atomics.load(decision, 0) !== REQUESTED) return false;
			try {
				inOwnerContext(() => databaseAuthority?.assertAccess());
			} catch (error) {
				refuse(decision, error, "authority");
				return false;
			}
			const granted = Atomics.compareExchange(decision, 0, REQUESTED, GRANTED) === REQUESTED;
			if (granted) Atomics.notify(decision, 0);
			return granted;
		};
		let source = "authority";
		try {
			inOwnerContext(() => {
				databaseAuthority?.assertRequest?.();
				databaseAuthority?.assertAccess();
			});
			if (request.stage === "prepare" && isRecord(request.facts) && request.facts.kind === "schema-maintenance") {
				const authority = databaseAuthority;
				if (!authority || typeof request.facts.databasePath !== "string" || resolveIdentityPathViaExistingAncestorSync(request.facts.databasePath) !== authority.databasePath) throw new SqliteWorkerError("SQLite schema maintenance target differs from its admitted database", "closed");
				inOwnerContext(() => {
					authority.lease ??= authority.acquireSchema();
					authority.lease.assertCurrent();
					grant();
				});
			} else {
				source = "domain";
				inOwnerContext(admit, request, grant);
			}
		} catch (error) {
			refuse(decision, error, source);
			return;
		} finally {
			decisions.delete(decision);
		}
		if (Atomics.load(decision, 0) === REQUESTED) refuse(decision, new SqliteWorkerError("SQLite worker admission was not granted", "closed"), "domain");
	};
	port1.on("message", receive);
	port1.unref();
	const service = () => {
		for (let queued = receiveMessageOnPort(port1); queued; queued = receiveMessageOnPort(port1)) receive(queued.message);
	};
	return {
		port: port2,
		bindDatabaseAuthority(authority) {
			if (closed || databaseAuthority) throw new SqliteWorkerError("SQLite database authority is already bound or closed", "closed");
			databaseAuthority = {
				...authority,
				databasePath: resolveIdentityPathViaExistingAncestorSync(authority.databasePath)
			};
		},
		get failure() {
			return failure?.error;
		},
		get failureSource() {
			return failure?.source;
		},
		get cleanupFailures() {
			return cleanupFailures;
		},
		get committed() {
			service();
			return committed;
		},
		get settlement() {
			return settlement;
		},
		waitForSettlement(deadlineMs) {
			while (true) {
				service();
				if (failure !== void 0) throw toErrorObject(failure.error, "SQLite worker admission failed");
				if (settlement?.kind === "completed") return settlement;
				const remaining = deadlineMs - performance.now();
				if (settlement?.kind === "unknown" || closed || remaining <= 0) throw new SqliteWorkerError("SQLite worker native settlement is unknown", "outcome-unknown");
				Atomics.wait(waiting, 0, 0, Math.min(5, remaining));
			}
		},
		service,
		finish() {
			closed = true;
			service();
			for (const decision of decisions) if (Atomics.load(decision, 0) === REQUESTED) refuse(decision, new SqliteWorkerError("SQLite worker admission is closed", "closed"), "authority");
			port1.close();
			port2.close();
			if (databaseAuthority?.lease) try {
				databaseAuthority.lease.release();
				databaseAuthority.lease = void 0;
			} catch (error) {
				cleanupFailures.push(error);
			}
		}
	};
}
const currentAdmission = resolveGlobalSingleton(Symbol.for("openclaw.sqliteWorkerOperationAdmission"), () => new AsyncLocalStorage());
/** Install only the private port belonging to the broker's currently executing operation. */
function withSqliteWorkerOperationAdmission(owner, operation) {
	const scope = {
		owner,
		port: owner.port,
		active: true
	};
	try {
		return currentAdmission.run(scope, operation);
	} finally {
		scope.active = false;
	}
}
/** Record facts only after the real transaction commits, before native settlement is announced. */
function deferSqliteWorkerCommitReceipt(database, facts) {
	const scope = currentAdmission.getStore();
	if (!scope?.active) throw new SqliteWorkerError("SQLite receipt requires its retained admission", "unavailable");
	if (serialize(facts).byteLength > 33554432) throw new SqliteWorkerError("SQLite worker commit receipt exceeds the transport limit", "overloaded");
	const captured = structuredClone(facts);
	if (!deferSqlitePostCommitPublication(database, () => {
		scope.owner.committed = { facts: captured };
		scope.owner.port.postMessage({
			kind: "native-commit",
			committed: scope.owner.committed
		}, []);
	})) throw new Error("SQLite worker receipt requires a transaction publication owner");
}
/** The executing worker calls this only after its backend's native settlement check. */
function settleSqliteWorkerOperationContext(owner, kind) {
	if (owner.settled) return;
	owner.settled = true;
	owner.port.postMessage({
		kind: "native-settlement",
		settlement: {
			kind,
			...owner.committed ? { committed: owner.committed } : {}
		}
	}, []);
}
/** Called on the SQLite worker, after transaction entry and before its row mutation. */
function requestSqliteWorkerOperationAdmission(request, transferList = []) {
	const scope = currentAdmission.getStore();
	if (!scope?.active) throw new SqliteWorkerError("SQLite operation requires its retained admission", "unavailable");
	const decision = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT));
	scope.port.postMessage({
		...request,
		decision: decision.buffer
	}, transferList);
	while (Atomics.load(decision, 0) === REQUESTED) Atomics.wait(decision, 0, REQUESTED);
	if (Atomics.load(decision, 0) !== GRANTED) {
		const refusal = new SqliteWorkerError("SQLite transaction admission was refused", "closed");
		scope.owner.refusal = refusal;
		throw refusal;
	}
}
/** Schema work borrows live host authority through the same retained job port. */
function requestSqliteWorkerSchemaMaintenance(databasePath) {
	if (!currentAdmission.getStore()) return false;
	requestSqliteWorkerOperationAdmission({
		stage: "prepare",
		facts: {
			kind: "schema-maintenance",
			databasePath
		}
	});
	return true;
}
/** Consume owner-prepared data from this executing operation's private port. */
function takeSqliteWorkerOperationAdmissionAttachment() {
	const scope = currentAdmission.getStore();
	if (!scope?.active) throw new SqliteWorkerError("SQLite operation requires its retained admission", "unavailable");
	const message = receiveMessageOnPort(scope.port)?.message;
	if (!isRecord(message) || message.kind !== "sqlite-operation-attachment") throw new SqliteWorkerError("SQLite operation attachment is unavailable", "unavailable");
	return message.value;
}
//#endregion
export { isSqliteWorkerError as _, requestSqliteWorkerSchemaMaintenance as a, withSqliteWorkerOperationAdmission as c, SQLITE_WORKER_MAX_RESULT_BYTES as d, SQLITE_WORKER_OPERATION_CLEANUP as f, hasSqliteWorkerOutcomeUnknown as g, SqliteWorkerError as h, requestSqliteWorkerOperationAdmission as i, SQLITE_WORKER_CLOSE_RECEIPT as l, SQLITE_WORKER_PREPARE_COMMAND as m, createSqliteWorkerOperationAdmission as n, settleSqliteWorkerOperationContext as o, SQLITE_WORKER_PREPARE_ADMITTED as p, deferSqliteWorkerCommitReceipt as r, takeSqliteWorkerOperationAdmissionAttachment as s, SqliteWorkerOpenRefusedError as t, SQLITE_WORKER_MAX_MESSAGE_BYTES as u, retainSqliteWorkerErrorCode as v };
