import { l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { p as recordSessionStateEventAsync } from "./session-state-events-DxrQGYa3.mjs";
//#region src/sessions/subagent-terminal-state.ts
const SUBAGENT_TERMINAL_SUMMARY = {
	ok: "child run completed",
	error: "child run failed",
	timeout: "child run timed out",
	cancelled: "child run cancelled"
};
/** Project an already-normalized subagent terminal outcome into the signal log. */
async function recordSubagentTerminalState(params, assertCurrent, acpControl) {
	await recordSessionStateEventAsync({
		sessionKey: params.childSessionKey,
		agentId: resolveAgentIdFromSessionKey(params.childSessionKey),
		kind: params.outcomeStatus === "ok" ? "run_completed" : "run_failed",
		actorType: "system",
		runId: params.runId,
		dedupeKey: `run-terminal:${params.runId}`,
		summary: SUBAGENT_TERMINAL_SUMMARY[params.outcomeStatus],
		...params.outcomeStatus === "ok" ? {} : { payload: { outcome: params.outcomeStatus } },
		watcherSessionKeys: [params.requesterSessionKey]
	}, {
		assertCurrent,
		acpControl
	});
}
//#endregion
export { recordSubagentTerminalState as t };
