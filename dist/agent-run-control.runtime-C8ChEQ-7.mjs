import { M as resolveActiveReplyRunOwnerForSignal } from "./reply-run-registry.state-mU82bRXR.mjs";
import { a as getDiagnosticSessionActivitySnapshot } from "./diagnostic-run-activity-CwdtVcLR.mjs";
import { T as resolveActiveEmbeddedRunOwnerByRunId, b as queueEmbeddedAgentMessageWithOutcomeAsync, n as abortEmbeddedAgentRun, x as queueGuardedEmbeddedAgentMessageWithOutcomeAsync } from "./runs-BSJKmITf.mjs";
import { i as resolveActiveEmbeddedRunSessionId } from "./active-run-projections-Dk8tgs6I.mjs";
//#region src/talk/agent-run-control.runtime.ts
const realtimeVoiceControlRuntime = {
	abortEmbeddedAgentRun,
	queueEmbeddedAgentMessageWithOutcomeAsync,
	queueGuardedEmbeddedAgentMessageWithOutcomeAsync,
	resolveActiveEmbeddedRunOwnerByRunId,
	resolveActiveEmbeddedRunSessionId,
	resolveActiveReplyRunOwnerForSignal,
	getDiagnosticSessionActivitySnapshot
};
//#endregion
export { realtimeVoiceControlRuntime };
