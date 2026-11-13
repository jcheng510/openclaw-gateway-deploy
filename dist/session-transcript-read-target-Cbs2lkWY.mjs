import { r as resolveConcreteSessionStorePath } from "./paths-CQ3zRaeb.mjs";
import { o as resolveSessionTranscriptReadTargetCore } from "./session-accessor.transcript-target-Bb5PwcvU.mjs";
//#region src/gateway/session-transcript-read-target.ts
async function resolveTranscriptReadTarget(scope) {
	const storePath = resolveConcreteSessionStorePath(scope.storePath);
	const target = storePath ? resolveSessionTranscriptReadTargetCore({
		...scope,
		storePath
	}) : (await import("./session-accessor.transcript-target-C2pnm1do.mjs")).resolveSessionTranscriptReadTarget(scope);
	return {
		agentId: target.agentId,
		sessionFile: target.sessionKey ?? target.sessionId,
		sessionId: target.sessionId,
		...target.sessionKey ? { sessionKey: target.sessionKey } : {},
		storePath: target.storePath
	};
}
function toTranscriptReadScope(target) {
	return {
		...target.agentId ? { agentId: target.agentId } : {},
		sessionId: target.sessionId,
		...target.sessionKey ? { sessionKey: target.sessionKey } : {},
		...target.storePath ? { storePath: target.storePath } : {}
	};
}
//#endregion
export { toTranscriptReadScope as n, resolveTranscriptReadTarget as t };
