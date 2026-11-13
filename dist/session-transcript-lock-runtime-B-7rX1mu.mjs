import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { f as withTranscriptWriteLock } from "./session-accessor.sqlite-transcript-write-CZkj18r-.mjs";
import { p as publishTranscriptUpdate } from "./session-history-eviction-BJoKqhi_.mjs";
import "./session-accessor-CGLseszP.mjs";
import { i as resolveSessionTranscriptRuntimeTarget } from "./session-accessor.transcript-target-Bb5PwcvU.mjs";
import { t as formatSessionTranscriptMemoryHitKey } from "./session-transcript-memory-hit-4RwQHW_e.mjs";
//#region src/plugin-sdk/session-transcript-lock-runtime.ts
/** Resolves, locks, and publishes one projected transcript write context. */
async function withProjectedSessionTranscriptWriteLock(params, run, projectContext) {
	const storageTarget = await resolveSessionTranscriptRuntimeTarget(params, params.config);
	const agentId = normalizeAgentId(storageTarget.agentId);
	const target = {
		agentId,
		memoryKey: formatSessionTranscriptMemoryHitKey({
			agentId,
			sessionId: storageTarget.sessionId
		}),
		sessionId: storageTarget.sessionId,
		sessionKey: storageTarget.sessionKey,
		targetKind: "runtime-session"
	};
	const boundScope = {
		...params,
		...storageTarget
	};
	const queuedUpdates = [];
	const result = await withTranscriptWriteLock(boundScope, async (locked) => await run(projectContext({
		target,
		readEvents: locked.readEvents,
		appendMessage: (options) => locked.appendMessage({
			...options,
			...params.config !== void 0 ? { config: params.config } : {}
		}),
		publishUpdate: async (update) => {
			queuedUpdates.push(update ? { ...update } : void 0);
		}
	}, locked)));
	for (const update of queuedUpdates) await publishTranscriptUpdate(boundScope, update);
	return result;
}
//#endregion
export { withProjectedSessionTranscriptWriteLock as t };
