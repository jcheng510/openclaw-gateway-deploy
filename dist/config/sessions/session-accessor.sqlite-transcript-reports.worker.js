import { a as readDatabasePathIdentitySync } from "../../sqlite-worker-identity-Dggu-rKK.mjs";
import { r as runSqliteDeferredTransactionSync, t as assertTransactionUsable } from "../../sqlite-transaction-2VkikDo-.mjs";
import { n as ok, t as err } from "../../result-BQGgYouL.mjs";
import { r as getSqliteWorkerStateContext } from "../../sqlite-worker-state-context-KkU943i2.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "../../openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { d as runOpenClawAgentWriteTransaction, o as getOpenClawAgentDatabaseIfOpen } from "../../openclaw-agent-db-CZUYuo7P.mjs";
import { t as SessionTranscriptWriterClaimReboundError } from "../../transcript-write-context-D53SX4tj.mjs";
import { _ as toDatabaseOptions } from "../../session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { c as readSessionEntryRow } from "../../session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import "../../session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
import { o as readTranscriptContextVersionInTransaction } from "../../session-accessor.sqlite-transcript-state-C4czfjuW.mjs";
import { g as advanceCliHistoryBoundaryRangeInTransaction } from "../../session-accessor.sqlite-transcript-store-CPlEEZZV.mjs";
import { i as resolveTranscriptAppendRefusal } from "../../session-accessor.sqlite-transcript-write-guard-DVwEhnpz.mjs";
import { i as prepareTranscriptReportSelection, n as appendSelectedTranscriptReportInTransaction, t as appendAbortedSessionTranscriptPartialInTransaction } from "../../session-accessor.sqlite-transcript-reports.kernel-CHk6Dtpi.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/config/sessions/session-accessor.sqlite-transcript-reports.worker.ts
/** Domain binding borrows the existing SQLite broker's canonical writer. */
function bindSqliteWorkerBackend(target, context) {
	const { fence } = target;
	const resolved = {
		...target.resolved,
		env: getSqliteWorkerStateContext().environment
	};
	const options = toDatabaseOptions(resolved);
	if (readDatabasePathIdentitySync(resolveOpenClawAgentSqlitePath(options)).canonicalPath !== context.databasePath) throw new Error("Transcript report target changed its database owner");
	resolved.path = context.databasePath;
	options.path = context.databasePath;
	const database = getOpenClawAgentDatabaseIfOpen(options);
	if (!database || database.db !== context.database || database.path !== context.databasePath) throw new Error("Transcript report lost its canonical database owner");
	let closed = false;
	const assertOpen = () => {
		if (closed || !database.db.isOpen) throw new Error("Transcript report domain is closed");
		assertTransactionUsable(database.db);
	};
	const readRefusal = () => resolveTranscriptAppendRefusal(readSessionEntryRow(database, resolved.sessionKey, "list")?.entry, resolved, {
		...resolved,
		...fence
	});
	let prepared;
	return {
		execute(command) {
			assertOpen();
			if (command.type === "prepare") return runSqliteDeferredTransactionSync(database.db, () => {
				prepared = void 0;
				const refusal = readRefusal();
				if (refusal) return err(refusal);
				prepared = {
					facts: prepareTranscriptReportSelection(database, resolved, command.input),
					version: readTranscriptContextVersionInTransaction(database, resolved.sessionId)
				};
				return ok(prepared.facts);
			});
			return runOpenClawAgentWriteTransaction((current) => {
				if (current.db !== database.db) throw new Error("Transcript report lost its canonical database owner");
				context.admit("transaction");
				const refusal = readRefusal();
				if (refusal) {
					context.admit("commit");
					return err(refusal);
				}
				const firstSeq = target.cliWriter ? (readTranscriptContextVersionInTransaction(database, resolved.sessionId).rawSeq ?? -1) + 1 : void 0;
				let projectionNeedsReconcile = false;
				const projection = {
					scheduleProjectionReconcile: false,
					onProjectionReconcileNeeded: () => {
						projectionNeedsReconcile = true;
					}
				};
				let abortedPartial;
				if (command.type === "abortedPartial") abortedPartial = appendAbortedSessionTranscriptPartialInTransaction(database, resolved, command.input, command.input.preparedMessage, projection);
				else if (command.type === "assistant") {
					const facts = prepareTranscriptReportSelection(database, resolved, {
						kind: "assistant",
						responseId: command.input.message.responseId
					});
					if (!facts.suppressed) appendSelectedTranscriptReportInTransaction(database, resolved, facts.appendParentId, command.input, projection, command.input.preparedMessage);
				} else {
					const plan = prepared;
					prepared = void 0;
					if (!plan || plan.facts.suppressed) throw new Error("Transcript report append requires its prepared selection");
					const currentVersion = readTranscriptContextVersionInTransaction(database, resolved.sessionId);
					if (!isDeepStrictEqual(currentVersion, plan.version)) {
						context.admit("commit");
						return ok({
							committed: false,
							projectionNeedsReconcile: false
						});
					}
					appendSelectedTranscriptReportInTransaction(database, resolved, plan.facts.appendParentId, command.input, projection);
				}
				let commitGranted = false;
				const authorizeCommit = () => {
					if (!commitGranted) {
						context.admit("commit");
						commitGranted = true;
					}
				};
				const cliHistoryChanged = target.cliWriter && firstSeq !== void 0 ? advanceCliHistoryBoundaryRangeInTransaction(database, resolved, {
					first: firstSeq,
					last: readTranscriptContextVersionInTransaction(database, resolved.sessionId).rawSeq ?? -1
				}, target.cliWriter, authorizeCommit) : false;
				const rebound = readRefusal();
				if (rebound) throw new SessionTranscriptWriterClaimReboundError(rebound);
				authorizeCommit();
				return ok({
					committed: true,
					projectionNeedsReconcile,
					cliHistoryChanged,
					...abortedPartial ? {
						abortedPartial,
						sessionEntryChanged: !abortedPartial.skipped && abortedPartial.append.appended
					} : {}
				});
			}, options, { operationLabel: "session.transcript.report" });
		},
		assertSettled() {
			assertOpen();
			if (database.db.isTransaction) throw new Error("Transcript report command left a transaction open");
		},
		close() {
			closed = true;
			prepared = void 0;
		}
	};
}
//#endregion
export { bindSqliteWorkerBackend };
