import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { a as createSqliteLifecycleAggregateError } from "./sqlite-lifecycle-errors-Q-hsFPSB.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as runtimeProcessEntrypoints } from "./runtime-process-entrypoints-CbWx0yUe.mjs";
import { r as resolveRuntimeWorkerUrl } from "./runtime-worker-url-S0NIVxUR.mjs";
import { t as SessionTranscriptWriterClaimReboundError } from "./transcript-write-context-D53SX4tj.mjs";
import { t as openOpenClawAgentSqliteWorkerStore } from "./openclaw-agent-worker-store-B8unygql.mjs";
//#region src/agents/sessions/session-manager-metadata-runtime.ts
const moduleUrl = resolveRuntimeWorkerUrl(runtimeProcessEntrypoints.sessionManagerMetadata);
const log = createSubsystemLogger("agents/session-metadata");
/** Each command settles and unbinds before the next; the enclosing manager keeps its FIFO turn. */
async function withSessionMetadataWorker(options, database, assertCurrent, operation) {
	const worker = await openOpenClawAgentSqliteWorkerStore(options, database.db, {
		moduleUrl,
		input: void 0
	});
	let result;
	try {
		result = {
			ok: true,
			value: await operation({ execute: async (command, commandOptions) => {
				const reply = await worker.execute(command, assertCurrent, commandOptions);
				if (!reply.ok) throw new SessionTranscriptWriterClaimReboundError(reply.refusal);
				return reply.value;
			} })
		};
	} catch (error) {
		result = {
			ok: false,
			error
		};
	}
	try {
		await worker.close();
	} catch (error) {
		if (!result.ok) throw createSqliteLifecycleAggregateError([result.error, error], "Session metadata operation and cleanup failed", result.error);
		try {
			log.warn(`Session metadata completed before cleanup failed: ${formatErrorMessage(error)}`);
		} catch {}
	}
	if (!result.ok) throw result.error;
	return result.value;
}
//#endregion
export { withSessionMetadataWorker };
