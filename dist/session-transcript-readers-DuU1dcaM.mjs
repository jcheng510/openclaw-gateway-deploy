import { r as __exportAll } from "./rolldown-runtime-Dr7-SnC6.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { t as captureSessionTranscriptStorageEnvironment } from "./transcript-target-binding-Cytsl9mY.mjs";
import { o as waitForSessionTranscriptProjection } from "./session-transcript-reconcile-CihXLpUw.mjs";
import { r as isSessionTranscriptProjectionUnavailableError } from "./session-transcript-projection-error-B7C6SQei.mjs";
import { t as withCurrentProjectionSnapshot } from "./session-accessor.sqlite-active-projection-Bh7j4wOo.mjs";
import { n as readRestoredSessionTranscript } from "./session-cold-storage-read-3fnFbxmZ.mjs";
import { d as readSessionTranscriptVisibleMessageDeltaCore } from "./session-accessor.sqlite-active-events-CZQ0aW8w.mjs";
import { t as bindSessionTranscriptStoreScope } from "./session-accessor.transcript-target-Bb5PwcvU.mjs";
import { t as attachOpenClawTranscriptMeta } from "./session-transcript-entry-message-DG6i_p0U.mjs";
import { t as createSessionTranscriptReader } from "./session-transcript-read-kernel-Bwx5_ZFV.mjs";
import { n as toTranscriptReadScope, t as resolveTranscriptReadTarget } from "./session-transcript-read-target-Cbs2lkWY.mjs";
import { t as capArrayByJsonBytes } from "./session-utils.fs-D_x8Wjut.mjs";
//#region src/gateway/session-transcript-readers.ts
var session_transcript_readers_exports = /* @__PURE__ */ __exportAll({
	attachOpenClawTranscriptMeta: () => attachOpenClawTranscriptMeta,
	capArrayByJsonBytes: () => capArrayByJsonBytes,
	readRecentSessionMessagesWithStatsAsync: () => readRecentSessionMessagesWithStatsAsync,
	readSessionArtifacts: () => readSessionArtifacts,
	readSessionMessageByIdAsync: () => readSessionMessageByIdAsync,
	readSessionMessageCountAsync: () => readSessionMessageCountAsync,
	readSessionMessagesAroundIdWithStatsAsync: () => readSessionMessagesAroundIdWithStatsAsync,
	readSessionMessagesAsync: () => readSessionMessagesAsync,
	readSessionMessagesMatchingIdAsync: () => readSessionMessagesMatchingIdAsync,
	readSessionMessagesPageWithStatsAsync: () => readSessionMessagesPageWithStatsAsync,
	readSessionMessagesWithSourceAsync: () => readSessionMessagesWithSourceAsync,
	readSessionTranscriptVisibleMessageDeltaCore: () => readSessionTranscriptVisibleMessageDeltaCore,
	visitSessionMessagesAsync: () => visitSessionMessagesAsync
});
const sessionTranscriptReader = createSessionTranscriptReader({
	resolveTarget: resolveTranscriptReadTarget,
	readSnapshot: async (target, read, options) => {
		const scope = toTranscriptReadScope(target);
		return readRestoredSessionTranscript(scope, () => withCurrentProjectionSnapshot(scope, read, options), options);
	}
});
const { visitSessionMessagesAsync } = sessionTranscriptReader;
function usesProcessHeldTranscript(scope) {
	return Boolean(isIncognitoSessionKey(scope.sessionKey) || scope.storePath && isIncognitoOpenClawAgentSqlitePath(scope.storePath, {
		agentId: scope.agentId ?? resolveAgentIdFromSessionKey(scope.sessionKey),
		env: scope.env
	}));
}
function captureHistoryReadScope(scope) {
	const target = bindSessionTranscriptStoreScope(scope);
	return {
		agentId: target.agentId,
		sessionId: target.sessionId,
		sessionKey: target.sessionKey,
		storePath: target.storePath,
		...target.sessionFile ? { sessionFile: target.sessionFile } : {},
		sessionEntry: target.sessionEntry ? { sessionId: target.sessionEntry.sessionId } : void 0,
		env: captureSessionTranscriptStorageEnvironment(target.env ?? process.env)
	};
}
async function readSessionMessagesAsync(...args) {
	return (await readSessionMessagesWithSourceAsync(...args)).messages;
}
function createHistoryPageReader(readLocal, readWorker) {
	return async (scope, inputOptions) => {
		const target = captureHistoryReadScope(scope);
		const options = structuredClone(inputOptions);
		if (usesProcessHeldTranscript(target)) return readLocal(target, options);
		const { readSessionHistoryPageInWorker } = await import("./session-history-worker-runtime-B-T76Mwc.mjs");
		return readWorker(readSessionHistoryPageInWorker, target, options);
	};
}
const readSessionMessagesWithSourceAsync = createHistoryPageReader(sessionTranscriptReader.readSessionMessagesWithSourceAsync, (read, target, options) => read({
	kind: "source-messages",
	params: {
		target,
		options
	}
}));
const readRecentSessionMessagesWithStatsAsync = createHistoryPageReader(sessionTranscriptReader.readRecentSessionMessagesWithStatsAsync, (read, target, options) => read({
	kind: "recent-page",
	params: {
		target,
		options
	}
}));
const readSessionMessagesPageWithStatsAsync = createHistoryPageReader(sessionTranscriptReader.readSessionMessagesPageWithStatsAsync, (read, target, options) => read({
	kind: "message-page",
	params: {
		target,
		options
	}
}));
const readSessionMessagesAroundIdWithStatsAsync = createHistoryPageReader(sessionTranscriptReader.readSessionMessagesAroundIdWithStatsAsync, (read, target, options) => read({
	kind: "around-id",
	params: {
		target,
		options
	}
}));
async function readSessionArtifacts(scope, inputQuery) {
	const target = captureHistoryReadScope(scope);
	const query = structuredClone(inputQuery);
	if (usesProcessHeldTranscript(target)) {
		const { selectSessionArtifacts } = await import("./session-artifact-read-AukVXVTp.mjs");
		return selectSessionArtifacts(target, query, sessionTranscriptReader);
	}
	const { readSessionHistoryPageInWorker } = await import("./session-history-worker-runtime-B-T76Mwc.mjs");
	return readSessionHistoryPageInWorker({
		kind: "artifacts",
		params: {
			target,
			query
		}
	});
}
async function readSessionMessageByIdAsync(scope, messageId, options) {
	const target = captureHistoryReadScope(scope);
	if (usesProcessHeldTranscript(target)) return sessionTranscriptReader.readSessionMessageByIdAsync(target, messageId, options);
	const capturedOptions = options ? { ...options } : void 0;
	const { readSessionHistoryPageInWorker } = await import("./session-history-worker-runtime-B-T76Mwc.mjs");
	return readSessionHistoryPageInWorker({
		kind: "message-by-id",
		params: {
			target,
			messageId,
			options: capturedOptions
		}
	});
}
/** Keep exact membership and its full-history validation in the admitted history worker. */
async function readSessionMessagesMatchingIdAsync(scope, messageId) {
	const target = captureHistoryReadScope(scope);
	if (usesProcessHeldTranscript(target)) return sessionTranscriptReader.readSessionMessagesMatchingIdAsync(target, messageId);
	const { readSessionHistoryPageInWorker } = await import("./session-history-worker-runtime-B-T76Mwc.mjs");
	return readSessionHistoryPageInWorker({
		kind: "message-lookup",
		params: {
			target,
			messageId
		}
	});
}
/** Counts display messages asynchronously through the reader seam. */
async function readSessionMessageCountAsync(scope) {
	const target = captureHistoryReadScope(scope);
	const inProcess = usesProcessHeldTranscript(target);
	const readCount = async () => {
		if (inProcess) return sessionTranscriptReader.readSessionMessageCountAsync(target);
		const { readSessionHistoryPageInWorker } = await import("./session-history-worker-runtime-B-T76Mwc.mjs");
		return readSessionHistoryPageInWorker({
			kind: "message-count",
			params: { target }
		});
	};
	try {
		return await readCount();
	} catch (error) {
		if (!isSessionTranscriptProjectionUnavailableError(error)) throw error;
		await waitForSessionTranscriptProjection(target);
		return await readCount();
	}
}
//#endregion
export { readSessionMessagesAroundIdWithStatsAsync as a, readSessionMessagesPageWithStatsAsync as c, visitSessionMessagesAsync as d, readSessionMessageCountAsync as i, readSessionMessagesWithSourceAsync as l, readSessionArtifacts as n, readSessionMessagesAsync as o, readSessionMessageByIdAsync as r, readSessionMessagesMatchingIdAsync as s, readRecentSessionMessagesWithStatsAsync as t, session_transcript_readers_exports as u };
