import { t as configureRuntimeActionDecisionSink } from "./runtime-action-decision-D4muORMj.mjs";
import { i as hasExecutionIdentityAdmissionSink, t as configureExecutionIdentityAdmissionSink } from "./execution-identity-admission-DtBXJ8et.mjs";
import { t as configureExecutionDecisionWorkSink } from "./execution-decision-work-Bup1dI6D.mjs";
import { t as GatewayScheduler } from "./gateway-scheduler-Dq116NWy.mjs";
import { t as createAuditEventRecorder } from "./audit-recorder-3ttoiiH6.mjs";
//#region src/commands/agent-local-audit.ts
/** Direct-local agent audit writer lifecycle shared by CLI entrypoints. */
/** Own one direct-process writer unless a surrounding runtime already owns it. */
function startAgentLocalAuditWriter(config, options = {}) {
	if (hasExecutionIdentityAdmissionSink()) return;
	const scheduler = new GatewayScheduler();
	const recorder = createAuditEventRecorder({
		scheduler,
		getConfig: () => config,
		...options.stateDir ? { stateDir: options.stateDir } : {}
	});
	const clearAdmissionSink = configureExecutionIdentityAdmissionSink(recorder.recordExecutionIdentity);
	const clearDecisionWorkSink = configureExecutionDecisionWorkSink(recorder.recordExecutionDecisionWork);
	const clearRuntimeActionSink = configureRuntimeActionDecisionSink(recorder.recordExecutionDecision);
	return async () => {
		scheduler.beginClose();
		clearRuntimeActionSink();
		clearDecisionWorkSink();
		clearAdmissionSink();
		try {
			await recorder.stop();
		} finally {
			await scheduler.stop();
		}
	};
}
//#endregion
export { startAgentLocalAuditWriter };
