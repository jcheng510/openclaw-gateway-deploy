import { c as isRecord } from "../../record-coerce-TIsquoVR.mjs";
import { a as readDatabasePathIdentitySync } from "../../sqlite-worker-identity-Dggu-rKK.mjs";
import { t as assertTransactionUsable } from "../../sqlite-transaction-2VkikDo-.mjs";
import { t as encodeOpenClawStateWorkerError } from "../../openclaw-state-worker-error-CvUWzlTD.mjs";
import { r as getSqliteWorkerStateContext } from "../../sqlite-worker-state-context-KkU943i2.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "../../openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { d as runOpenClawAgentWriteTransaction } from "../../openclaw-agent-db-CZUYuo7P.mjs";
import { a as prepareTranscriptPayloadForReuse } from "../../transcript-payload-BY1k8MVa.mjs";
import { t as SessionTranscriptWriterClaimReboundError } from "../../transcript-write-context-D53SX4tj.mjs";
import { _ as toDatabaseOptions, m as resolveSqliteTranscriptScope } from "../../session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { n as assertCanonicalSessionKeyWrite } from "../../session-canonical-key-Cjd4Pn_g.mjs";
import { a as runWithSessionTranscriptReadFence } from "../../session-transcript-read-fence-Bq0b1oaG.mjs";
import { t as readSessionTranscriptBoundedActiveContextCore } from "../../session-accessor.sqlite-active-context-CW0GiOoo.mjs";
import { t as ensureSessionEntryInTransaction } from "../../session-accessor.sqlite-initial-entry-Cnt5IctI.mjs";
import { a as appendTranscriptMessageSnapshotSync, n as appendTranscriptEventSnapshotSync, w as readTranscriptMutationAtSync } from "../../session-accessor.sqlite-transcript-write-CZkj18r-.mjs";
import { O as validatePreparedAssistantAppendSync, a as inspectTranscriptEventsSync, f as loadTranscriptReadSnapshotSync } from "../../session-accessor.sqlite-read-lTzWPVDn.mjs";
import { serialize } from "node:v8";
//#region src/agents/sessions/session-manager-metadata.worker.ts
function copyTranscriptRefusal(value) {
	if (value === void 0) return;
	if (!isRecord(value) || typeof value.agentIdHash !== "string" || typeof value.expectedSessionIdHash !== "string" || typeof value.sessionKeyHash !== "string") throw new Error("Session metadata refusal has an invalid identity");
	const identity = {
		agentIdHash: value.agentIdHash,
		expectedSessionIdHash: value.expectedSessionIdHash,
		sessionKeyHash: value.sessionKeyHash
	};
	if (value.code === "session-entry-missing") return {
		...identity,
		code: value.code
	};
	if (value.code === "session-rebound" && typeof value.actualSessionIdHash === "string") return {
		...identity,
		code: value.code,
		actualSessionIdHash: value.actualSessionIdHash
	};
	throw new Error("Session metadata refusal has an invalid kind");
}
function readCommittedMetadataView(scope, limits, admission) {
	return runWithSessionTranscriptReadFence(admission, () => {
		if (limits) return {
			kind: "bounded",
			snapshot: readSessionTranscriptBoundedActiveContextCore(scope, {
				...limits,
				...admission !== void 0 ? { ignoreReadFence: true } : {}
			})
		};
		if (admission !== void 0) {
			const inspected = inspectTranscriptEventsSync(scope);
			return {
				kind: "full",
				snapshot: {
					events: inspected.events,
					version: {
						generation: inspected.snapshot.generation,
						rawSeq: inspected.snapshot.lastSeq,
						updatedAt: inspected.snapshot.transcriptUpdatedAt
					}
				}
			};
		}
		return {
			kind: "full",
			snapshot: loadTranscriptReadSnapshotSync(scope)
		};
	});
}
/** Borrow the canonical actor's connection; this domain never opens or closes a database. */
function bindSqliteWorkerBackend(_input, context) {
	let closed = false;
	const assertOpen = () => {
		if (closed || !context.database.isOpen) throw new Error("Session metadata domain is closed");
		assertTransactionUsable(context.database);
	};
	const execute = (command) => {
		assertOpen();
		const scope = {
			...command.input.scope,
			env: getSqliteWorkerStateContext().environment
		};
		const resolved = resolveSqliteTranscriptScope(scope);
		const options = toDatabaseOptions(resolved);
		if (readDatabasePathIdentitySync(resolveOpenClawAgentSqlitePath(options)).canonicalPath !== context.databasePath) throw new Error("Session metadata target changed its database owner");
		scope.storePath = context.databasePath;
		resolved.path = context.databasePath;
		options.path = context.databasePath;
		if (command.type === "session.metadata.mutation") return {
			ok: true,
			value: readTranscriptMutationAtSync(scope)
		};
		assertCanonicalSessionKeyWrite(resolved.sessionKey, resolved.agentId);
		if (command.type === "session.transcript.appendMessage") return runOpenClawAgentWriteTransaction((database) => {
			if (database.db !== context.database) throw new Error("Session message lost its borrowed canonical connection");
			context.admit("transaction");
			let projectionNeedsReconcile = false;
			const snapshot = appendTranscriptMessageSnapshotSync(scope, {
				message: command.input.message,
				cwd: command.input.cwd
			}, void 0, {
				messageAlreadyRedacted: true,
				scheduleProjectionReconcile: false,
				onProjectionReconcileNeeded: () => {
					projectionNeedsReconcile = true;
				}
			});
			context.admit("commit");
			return {
				ok: true,
				value: {
					snapshot,
					projectionNeedsReconcile
				}
			};
		}, options, { operationLabel: command.type });
		if (command.type === "session.metadata.append" && command.input.event.type === "message") {
			const { event, message } = command.input;
			if (!message) throw new Error("Session message append requires prepared storage bytes");
			const { message: _message, ...envelope } = event;
			const eventJson = `${JSON.stringify(envelope).slice(0, -1)},"message":${message.prepared.messageJson}}`;
			message.prepared.physicalPayload = prepareTranscriptPayloadForReuse(context.database, eventJson, {
				...envelope,
				message: message.prepared.persistedMessage
			});
			if (message.validateTurn) {
				const mutationAt = validatePreparedAssistantAppendSync(scope, event.parentId, command.input.view?.admission?.entryId);
				if (mutationAt === void 0) {
					const error = /* @__PURE__ */ new Error(`SQLite transcript changed while preparing rewrite for ${scope.sessionId}`);
					error.name = "SqliteTranscriptMutationConflictError";
					throw error;
				}
				command.input.options.expectedMutationAt = mutationAt;
			}
		}
		const outcome = runOpenClawAgentWriteTransaction((database) => {
			if (database.db !== context.database) throw new Error("Session metadata lost its borrowed canonical connection");
			context.admit("transaction");
			if (command.type === "session.metadata.initialize") {
				const result = ensureSessionEntryInTransaction(database, resolved, scope, command.input.entry, command.input.initialWriterRunId);
				context.admit("commit");
				return {
					ok: true,
					value: result
				};
			}
			let projectionNeedsReconcile = false;
			const projection = {
				scheduleProjectionReconcile: false,
				onProjectionReconcileNeeded: () => {
					projectionNeedsReconcile = true;
				}
			};
			const { event, message } = command.input;
			const snapshot = event.type === "message" && message ? appendTranscriptMessageSnapshotSync(scope, {
				...command.input.options,
				message: event.message,
				eventId: event.id,
				parentId: event.parentId,
				now: Date.parse(event.timestamp),
				cwd: message.cwd,
				idempotencyLookup: message.idempotencyLookup
			}, message.prepared, projection) : appendTranscriptEventSnapshotSync(scope, event, command.input.options, projection);
			context.admit("commit");
			return {
				ok: true,
				value: {
					snapshot,
					projectionNeedsReconcile
				}
			};
		}, options, { operationLabel: command.type });
		if (command.type === "session.metadata.append" && command.input.event.type !== "session" && command.input.view && outcome.ok && "snapshot" in outcome.value && outcome.value.snapshot.ok) {
			const { event, view } = command.input;
			const committed = outcome.value.snapshot.value;
			if (!committed.result?.appended) return outcome;
			const version = view.loadedVersion;
			const effectiveParentId = committed.result.effectiveParentId;
			if (version && (committed.before.generation !== version.generation || committed.before.rawSeq !== version.rawSeq) || effectiveParentId !== void 0 && effectiveParentId !== event.parentId) try {
				outcome.value.reload = {
					ok: true,
					value: readCommittedMetadataView(scope, view.limits, view.admission)
				};
				serialize(outcome);
			} catch (error) {
				outcome.value.reload = {
					ok: false,
					error: encodeOpenClawStateWorkerError(error, { includeOrdinary: true })
				};
			}
		}
		return outcome;
	};
	return {
		execute(command) {
			try {
				return execute(command);
			} catch (error) {
				if (error instanceof SessionTranscriptWriterClaimReboundError) return {
					ok: false,
					refusal: copyTranscriptRefusal(error.cause)
				};
				throw error;
			}
		},
		assertSettled() {
			assertOpen();
			if (context.database.isTransaction) throw new Error("Session metadata command left a transaction open");
		},
		close() {
			closed = true;
		}
	};
}
//#endregion
export { bindSqliteWorkerBackend };
