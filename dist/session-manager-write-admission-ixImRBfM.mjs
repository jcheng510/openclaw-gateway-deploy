import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { a as runInDetachedAsyncContext, c as trackAsyncWork } from "./async-work-scope-ClifbwQr.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { _ as registerOpenClawStateDatabaseAsyncResource, n as captureOpenClawStateDatabaseReadAdmission } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { o as registerOpenClawAgentDatabaseAsyncResource, s as registerOpenClawAgentDatabaseReadCandidateResource } from "./openclaw-agent-db-resources-DZhhXFbz.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { w as resolveUnsuffixedSqliteTargetFromSessionStorePath } from "./openclaw-state-db-DM-mSY0m.mjs";
import { p as withOpenClawAgentDatabaseAsync } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { a as runQueuedStoreWrite, r as runOpenClawAgentWriteAdmission } from "./openclaw-agent-write-admission-CDwQO6YZ.mjs";
import { i as sameSessionTranscriptTargetBinding, n as captureSessionTranscriptTargetBinding, t as captureSessionTranscriptStorageEnvironment } from "./transcript-target-binding-Cytsl9mY.mjs";
import { i as captureOwnedTranscriptWriteAssertion, u as withOwnedSessionTranscriptWriterFence } from "./transcript-write-context-D53SX4tj.mjs";
import { n as captureSessionStoreReadCandidate } from "./session-store-read-candidates-YT_i67iQ.mjs";
import { _ as toDatabaseOptions, c as resolveSqliteReadScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { a as appendTranscriptMessageSnapshotSync } from "./session-accessor.sqlite-transcript-write-CZkj18r-.mjs";
import { t as isTranscriptMessageAppendCurrentTail } from "./session-accessor.sqlite-transcript-append-result-BjgvnUCa.mjs";
import { t as SessionTranscriptMessageCommittedError } from "./session-manager-message-error-BKAU1xT3.mjs";
//#region src/agents/sessions/session-manager-write-admission.ts
const detachedWriterQueues = resolveGlobalSingleton(Symbol.for("openclaw.sessionManagerDetachedWriterQueues"), () => /* @__PURE__ */ new WeakMap());
/** Keep the manager operation, committed view adoption, and cleanup in one storage admission. */
async function withSessionManagerWrite(manager, write) {
	const target = manager.getSessionTarget();
	if (!target) {
		const sessionId = manager.getSessionId();
		const queues = detachedWriterQueues.get(manager) ?? /* @__PURE__ */ new Map();
		detachedWriterQueues.set(manager, queues);
		return await trackAsyncWork(() => runQueuedStoreWrite({
			queues,
			storePath: "session",
			label: "detached session write admission",
			reentrant: true,
			fn: async () => {
				if (manager.getSessionTarget() || manager.getSessionId() !== sessionId) throw new Error("Session manager identity changed before transcript write admission");
				return await write();
			}
		}));
	}
	const identity = { ...target };
	const assertCurrent = captureOwnedTranscriptWriteAssertion(identity);
	const options = toDatabaseOptions(resolveSqliteReadScope(identity));
	options.env = captureSessionTranscriptStorageEnvironment(options.env ?? process.env);
	options.path = resolveOpenClawAgentSqlitePath(options);
	return await trackAsyncWork(() => runOpenClawAgentWriteAdmission(options, () => withOpenClawAgentDatabaseAsync(options, (database) => {
		const current = manager.getSessionTarget();
		if (!sameSessionTranscriptTargetBinding(identity, current)) throw new Error("Session manager identity changed before transcript write admission");
		return write({
			database,
			options
		});
	}, assertCurrent), true));
}
/** Append a custom note without changing a manager's loaded view. */
async function appendSessionTranscriptNote(target, message, options) {
	const captured = withOwnedSessionTranscriptWriterFence(captureSessionTranscriptTargetBinding(target));
	if (isIncognitoSessionKey(captured.sessionKey)) {
		const snapshot = appendTranscriptMessageSnapshotSync(captured, {
			cwd: process.cwd(),
			message,
			...options?.config ? { config: options.config } : {}
		});
		if (!snapshot.ok) throw new Error("Session transcript message was not persisted", { cause: snapshot.error });
		const result = snapshot.value.result;
		if (!result) throw new Error("Session transcript message was not persisted");
		return {
			messageId: result.messageId,
			message: result.message,
			appended: result.appended,
			currentTail: isTranscriptMessageAppendCurrentTail(snapshot.value)
		};
	}
	const unresolved = resolveUnsuffixedSqliteTargetFromSessionStorePath(captured.storePath);
	const candidate = captureSessionStoreReadCandidate(unresolved.path, unresolved.agentId || captured.storePath.endsWith(".sqlite") ? void 0 : "sibling-family");
	const state = captureOpenClawStateDatabaseReadAdmission(resolveOpenClawStateSqlitePath(captured.env));
	const assertOwned = captureOwnedTranscriptWriteAssertion(captured);
	const completion = createDeferredCore();
	let revoked = false;
	const revoke = () => {
		revoked = true;
	};
	const assertCurrent = () => {
		if (revoked) throw new Error("Session transcript append was revoked before completion");
		state.assertCurrent();
		assertOwned();
		if (captureSessionStoreReadCandidate(candidate.path, candidate.scope).physicalPath !== candidate.physicalPath) throw new Error("Session store alias changed before transcript append completion");
	};
	const input = {
		target: captured,
		candidate,
		message: structuredClone(message),
		...options?.config ? { config: structuredClone(options.config) } : {},
		cwd: process.cwd(),
		assertCurrent
	};
	const releases = [];
	try {
		for (const pathname of /* @__PURE__ */ new Set([candidate.path, candidate.physicalPath])) {
			const resource = {
				path: pathname,
				revoke,
				close: () => completion.promise
			};
			releases.push(unresolved.agentId ? registerOpenClawAgentDatabaseAsyncResource({
				...resource,
				agentId: unresolved.agentId
			}) : registerOpenClawAgentDatabaseReadCandidateResource({
				...resource,
				scope: candidate.scope
			}));
		}
		releases.push(registerOpenClawStateDatabaseAsyncResource({ close: async (identity) => {
			if (!identity || identity.key === state.identity.key) {
				revoke();
				await completion.promise;
			}
		} }));
		assertCurrent();
		return await trackAsyncWork(() => runOpenClawAgentWriteAdmission({
			agentId: captured.agentId,
			path: unresolved.path,
			env: captured.env
		}, async () => {
			assertCurrent();
			const { appendSessionTranscriptMessage } = await runInDetachedAsyncContext(() => import("./session-manager-message-runtime-ByzP0344.mjs"));
			const committed = await appendSessionTranscriptMessage(input);
			try {
				assertCurrent();
			} catch (error) {
				throw new SessionTranscriptMessageCommittedError(committed.messageId, error, captured);
			}
			return committed;
		}, true));
	} finally {
		completion.resolve();
		for (const unregister of releases.toReversed()) unregister();
	}
}
//#endregion
export { withSessionManagerWrite as n, appendSessionTranscriptNote as t };
