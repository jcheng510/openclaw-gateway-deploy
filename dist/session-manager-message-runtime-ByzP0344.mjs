import { r as collectNestedErrorCandidates } from "./error-coercion-1P2One0X.mjs";
import { a as createSqliteLifecycleAggregateError } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { r as resolveRuntimeWorkerUrl } from "./runtime-worker-url-S0NIVxUR.mjs";
import { _ as isSqliteWorkerError } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { t as SessionTranscriptWriterClaimReboundError } from "./transcript-write-context-D53SX4tj.mjs";
import { t as captureOpenClawAgentDatabaseExecution } from "./openclaw-agent-execution-C4GB-NRD.mjs";
import { t as openOpenClawAgentSqliteWorkerStore } from "./openclaw-agent-worker-store-B8unygql.mjs";
import { t as assertSessionStoreReadCandidate } from "./session-store-read-candidates-YT_i67iQ.mjs";
import { _ as toDatabaseOptions, o as prepareSqliteTranscriptReadScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { r as startSessionTranscriptIndexReconcile } from "./session-transcript-reconcile-CihXLpUw.mjs";
import { c as redactTranscriptMessageForStorage } from "./session-accessor.sqlite-transcript-store-CPlEEZZV.mjs";
import { t as isTranscriptMessageAppendCurrentTail } from "./session-accessor.sqlite-transcript-append-result-BjgvnUCa.mjs";
import { n as recordModelFallbackStop } from "./model-fallback-stop-BspxfXU1.mjs";
import { t as SessionTranscriptMessageCommittedError } from "./session-manager-message-error-BKAU1xT3.mjs";
//#region src/agents/sessions/session-manager-message-runtime.ts
const moduleUrl = resolveRuntimeWorkerUrl(runtimeProcessEntrypoints.sessionManagerMetadata);
/** The existing session domain owns the transaction; only committed facts return to its caller. */
async function appendSessionTranscriptMessage(input) {
	const message = redactTranscriptMessageForStorage(input.message, input);
	const preparedJson = JSON.stringify(message);
	const assertPrepared = () => {
		input.assertCurrent();
		if (JSON.stringify(redactTranscriptMessageForStorage(input.message, input)) !== preparedJson) throw new Error("Transcript message redaction changed before persistence");
	};
	assertPrepared();
	const resolved = await prepareSqliteTranscriptReadScope(input.target);
	const options = toDatabaseOptions(resolved);
	const databasePath = resolveOpenClawAgentSqlitePath(options);
	const assertCurrent = () => {
		assertPrepared();
		assertSessionStoreReadCandidate(databasePath, [input.candidate]);
	};
	assertCurrent();
	const execution = captureOpenClawAgentDatabaseExecution(options);
	const { env: _env, ...writeTarget } = input.target;
	let worker;
	let committed;
	const failures = [];
	try {
		worker = await openOpenClawAgentSqliteWorkerStore(options, { execution }, {
			moduleUrl,
			input: void 0
		});
		await worker.run(async (scope) => {
			const reply = await scope.execute({
				type: "session.transcript.appendMessage",
				input: {
					scope: {
						...writeTarget,
						storePath: execution.path
					},
					message,
					cwd: input.cwd
				}
			});
			if (!reply.ok) throw new SessionTranscriptWriterClaimReboundError(reply.refusal);
			const snapshot = reply.value.snapshot;
			if (!snapshot.ok) throw new Error("Session transcript message was not persisted", { cause: snapshot.error });
			if (!snapshot.value.result) throw new Error("Session transcript message was not persisted");
			committed = {
				messageId: snapshot.value.result.messageId,
				message: snapshot.value.result.message,
				appended: snapshot.value.result.appended,
				currentTail: isTranscriptMessageAppendCurrentTail(snapshot.value),
				version: snapshot.value.after,
				lifecycleRevision: snapshot.value.lifecycleRevision
			};
			assertCurrent();
			if (reply.value.projectionNeedsReconcile) startSessionTranscriptIndexReconcile({
				...options,
				preferredSessionId: input.target.sessionId
			});
		}, assertCurrent);
	} catch (error) {
		failures.push(error);
	} finally {
		try {
			await worker?.close();
		} catch (error) {
			failures.push(error);
		}
		try {
			await execution.release();
		} catch (error) {
			failures.push(error);
		}
	}
	try {
		if (failures.length > 1) throw createSqliteLifecycleAggregateError(failures, "Session transcript append and cleanup failed", failures[0]);
		if (failures.length === 1) throw failures[0];
		assertCurrent();
	} catch (error) {
		if (committed) throw new SessionTranscriptMessageCommittedError(committed.messageId, error, input.target, committed.version, committed.lifecycleRevision);
		if (error instanceof Error && collectNestedErrorCandidates(error).some((cause) => isSqliteWorkerError(cause, "outcome-unknown"))) recordModelFallbackStop(error);
		throw error;
	}
	if (!committed) throw new Error("Session transcript message was not persisted");
	return {
		messageId: committed.messageId,
		message: committed.message,
		appended: committed.appended,
		currentTail: committed.currentTail
	};
}
//#endregion
export { appendSessionTranscriptMessage };
