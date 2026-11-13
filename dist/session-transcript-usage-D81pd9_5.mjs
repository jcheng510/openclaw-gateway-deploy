import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { r as resolveConcreteSessionStorePath } from "./paths-CQ3zRaeb.mjs";
import { n as readRestoredSessionTranscript } from "./session-cold-storage-read-3fnFbxmZ.mjs";
import { a as readRecentSessionTranscriptMessageEvents, f as visitSessionTranscriptMessageEvents } from "./session-accessor.sqlite-active-events-CZQ0aW8w.mjs";
import { r as resolveSessionTranscriptReadTarget } from "./session-accessor.transcript-target-Bb5PwcvU.mjs";
import { n as toTranscriptReadScope } from "./session-transcript-read-target-Cbs2lkWY.mjs";
import { i as createSessionTranscriptUsageAccumulator, n as readLatestSessionUsageFromTranscriptFileAsync, r as aggregateSessionTranscriptUsage } from "./session-utils.fs-D_x8Wjut.mjs";
import path from "node:path";
//#region src/gateway/session-transcript-usage.ts
/** Reads aggregate usage from a full transcript asynchronously through the reader seam. */
async function readLatestSessionUsageFromTranscriptAsync(scope) {
	const artifactFile = scope.sessionFile?.trim();
	const concreteStorePath = resolveConcreteSessionStorePath(scope.storePath);
	const targetAgentId = scope.agentId?.trim() || resolveAgentIdFromSessionKey(scope.sessionKey);
	if (!Boolean(targetAgentId && scope.sessionKey?.trim() && concreteStorePath) && artifactFile && path.isAbsolute(artifactFile) && artifactFile.endsWith(".jsonl")) return await readLatestSessionUsageFromTranscriptFileAsync(scope.sessionId, concreteStorePath, artifactFile, void 0);
	const target = resolveSessionTranscriptReadTarget(scope);
	const transcriptScope = toTranscriptReadScope(target);
	return readRestoredSessionTranscript(transcriptScope, () => {
		const usage = createSessionTranscriptUsageAccumulator();
		visitSessionTranscriptMessageEvents(transcriptScope, (entry) => {
			usage.add(asOptionalRecord(entry.event)?.message);
		});
		return usage.finish();
	});
}
/** Reads aggregate usage from a bounded transcript tail synchronously through the reader seam. */
function readRecentSessionUsageFromTranscript(scope, maxBytes) {
	const target = resolveSessionTranscriptReadTarget(scope);
	const page = readRecentSessionTranscriptMessageEvents(toTranscriptReadScope(target), {
		maxBytes: Math.max(1024, Math.floor(Number.isFinite(maxBytes) ? maxBytes : 8388608)),
		maxLines: 1e3,
		maxMessages: 1e3
	});
	return aggregateSessionTranscriptUsage(page.events.map((entry) => asOptionalRecord(entry.event)?.message));
}
//#endregion
export { readRecentSessionUsageFromTranscript as n, readLatestSessionUsageFromTranscriptAsync as t };
