import { t as coerceErrorMessage } from "./error-coercion-1P2One0X.mjs";
import { n as hydrateOpenClawStateWorkerError, r as retainOpenClawStateWorkerErrorPayload, t as encodeOpenClawStateWorkerError } from "./openclaw-state-worker-error-CvUWzlTD.mjs";
import { t as SessionTranscriptColdError } from "./session-cold-storage-state-DkGnIhMN.mjs";
import { n as SessionTranscriptStorageUnavailableError, t as SessionTranscriptProjectionUnavailableError } from "./session-transcript-projection-error-B7C6SQei.mjs";
import { t as SessionTranscriptReadFenceError } from "./session-transcript-read-fence-Bq0b1oaG.mjs";
//#region src/config/sessions/session-history-worker-errors.ts
/** A later display reset may leave this failed visibility lookup unconsumed. */
var SessionHistoryDeltaPreparationError = class extends Error {
	constructor(partial, cause) {
		super("Session history visibility preparation failed", { cause });
		this.partial = partial;
	}
};
function encodeSessionTranscriptWorkerError(error) {
	if (error instanceof SessionTranscriptStorageUnavailableError) return {
		kind: "storage",
		reason: error.reason
	};
	if (error instanceof SessionTranscriptColdError) return {
		kind: "cold",
		sessionId: error.sessionId
	};
	if (error instanceof SessionTranscriptProjectionUnavailableError) return {
		kind: "projection",
		sessionId: error.sessionId,
		...error.reason === "window-changed" ? { reason: error.reason } : {}
	};
	if (error instanceof SessionTranscriptReadFenceError) return {
		kind: "fence",
		message: error.message
	};
	const payload = encodeOpenClawStateWorkerError(error, { includeOrdinary: true });
	return payload ? {
		kind: "read-error",
		message: coerceErrorMessage(error),
		payload
	} : void 0;
}
function unwrapSessionTranscriptWorkerReply(reply) {
	if (reply.ok) return reply.value;
	if (reply.error.kind === "delta-visibility") throw new SessionHistoryDeltaPreparationError(reply.error.partial);
	throw decodeSessionTranscriptWorkerReadError(reply.error);
}
/** Decode a positively identified domain failure without classifying transport rejections. */
function decodeSessionTranscriptWorkerReadError(failure) {
	if (failure.kind === "read-error") {
		const error = new Error(failure.message);
		retainOpenClawStateWorkerErrorPayload(error, failure.payload);
		return hydrateOpenClawStateWorkerError(error, { includeOrdinary: true });
	}
	if (failure.kind === "storage") return new SessionTranscriptStorageUnavailableError(failure.reason);
	if (failure.kind === "cold") return new SessionTranscriptColdError(failure.sessionId);
	if (failure.kind === "projection") return new SessionTranscriptProjectionUnavailableError(failure.sessionId, failure.reason);
	if (failure.kind === "syntax") return new SyntaxError(failure.message);
	return new SessionTranscriptReadFenceError(failure.message);
}
/** Keep read and cleanup failures together through the worker error graph. */
function sessionHistoryCleanupError(error, cleanupError, stage) {
	return new AggregateError([error, cleanupError], `${coerceErrorMessage(error)}; ${stage} failed: ${coerceErrorMessage(cleanupError)}`, { cause: cleanupError });
}
//#endregion
export { unwrapSessionTranscriptWorkerReply as a, sessionHistoryCleanupError as i, decodeSessionTranscriptWorkerReadError as n, encodeSessionTranscriptWorkerError as r, SessionHistoryDeltaPreparationError as t };
