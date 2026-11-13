import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { t as SessionTranscriptColdError } from "./session-cold-storage-state-DkGnIhMN.mjs";
import { x as readTranscriptExportSnapshotReadOnlySync } from "./session-accessor.sqlite-read-lTzWPVDn.mjs";
import { n as readRestoredSessionTranscript } from "./session-cold-storage-read-3fnFbxmZ.mjs";
import { o as readSessionResetRecallCutoffInWorker } from "./openclaw-runtime-session-ChxMRGGT.mjs";
import { t as resolveSessionResetRecallCutoff } from "./session-reset-recall-ZlAM1yc3.mjs";
//#region packages/memory-host-sdk/src/host/session-reset-recall-read.ts
/** Read only reset navigation; transcript bodies are irrelevant to recall visibility. */
function readSessionResetRecallCutoffInProcess(scope) {
	const snapshot = readTranscriptExportSnapshotReadOnlySync(scope, { projection: "reset-boundary" });
	return snapshot ? resolveSessionResetRecallCutoff(snapshot.events) : { state: "invalid" };
}
async function readSessionResetRecallCutoff(scope) {
	const read = () => isIncognitoSessionKey(scope.sessionKey) || isIncognitoOpenClawAgentSqlitePath(scope.storePath, { agentId: scope.agentId }) ? readSessionResetRecallCutoffInProcess(scope) : readSessionResetRecallCutoffInWorker(scope);
	try {
		return await read();
	} catch (error) {
		if (!(error instanceof SessionTranscriptColdError) || error.sessionId !== scope.sessionId) throw error;
		return readRestoredSessionTranscript(scope, read);
	}
}
//#endregion
export { readSessionResetRecallCutoffInProcess as n, readSessionResetRecallCutoff as t };
