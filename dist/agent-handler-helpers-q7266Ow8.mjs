import { t as setSafeTimeout } from "./timer-delay-D19PisE-.mjs";
import { d as resolveSessionWorkStartError } from "./lifecycle-DlS-bWdU.mjs";
import { t as ADMIN_SCOPE } from "./operator-scopes-D-CL26h0.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import "./model-selection-BAezv3YH.mjs";
import { t as isCliProvider } from "./model-selection-cli-DYyt406M.mjs";
import { n as getCliSessionBinding } from "./cli-session-binding-Xt6nY3mk.mjs";
import { l as resolveAgentHarnessSessionContextError, u as resolveAgentHarnessSessionIdMismatchError } from "./agent-harness-session-key-BypxcwJ7.mjs";
import { s as resolveCliRuntimeExecutionProvider } from "./model-runtime-aliases-Wn7RduAA.mjs";
import "./method-scopes-DZtl1Vvs.mjs";
import "./sessions-Db5eEwNA.mjs";
import "./cli-session-CuXTit63.mjs";
import "./internal-event-contract-pF6FHp8g.mjs";
import { c as resolveDeletedAgentIdFromSessionKey, r as loadGatewaySessionEntry } from "./session-utils-store-DWiBeNMH.mjs";
import "./session-utils-FXsPIESl.mjs";
import { i as emitGatewaySessionStartPluginHook, r as emitGatewaySessionEndPluginHook } from "./session-reset-service-DI9k-iKE.mjs";
//#region src/gateway/agent-turn/agent-handler-helpers.ts
const CRON_CONTINUATION_RELEASE_RECOVERY_DELAYS_MS = [
	250,
	1e3,
	4e3,
	15e3
];
function clientHasAdminScope(client) {
	return (Array.isArray(client?.connect?.scopes) ? client.connect.scopes : []).includes(ADMIN_SCOPE);
}
function respondDeletedAgentSession(params) {
	const deletedAgentId = resolveDeletedAgentIdFromSessionKey(params.cfg, params.canonicalKey, params.entry, { acpMetadataSessionKey: params.acpMetadataSessionKey ?? params.canonicalKey });
	if (deletedAgentId === null) return false;
	params.respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `Agent "${deletedAgentId}" no longer exists in configuration`));
	return true;
}
function respondUnavailableAgentSessionForKey(params) {
	const { cfg, entry, canonicalKey, legacyKey } = loadGatewaySessionEntry(params.sessionKey, {
		...params.agentId ? { agentId: params.agentId } : {},
		clone: false,
		projection: "list"
	});
	if (respondDeletedAgentSession({
		cfg,
		canonicalKey,
		entry,
		acpMetadataSessionKey: legacyKey,
		respond: params.respond
	})) return true;
	const sessionError = resolveAgentHarnessSessionContextError(canonicalKey, entry) || resolveAgentHarnessSessionIdMismatchError(entry, params.requestedSessionId) || (params.isRawModelRun && entry?.modelSelectionLocked === true ? "Agent harness-owned sessions cannot be used for one-shot model runs." : void 0) || resolveSessionWorkStartError(canonicalKey, entry);
	if (!sessionError) return false;
	params.respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, sessionError));
	return true;
}
function cronContinuationHasReusableRuntime(params) {
	const executionProvider = resolveCliRuntimeExecutionProvider({
		provider: params.provider,
		cfg: params.cfg,
		agentId: params.agentId,
		modelId: params.model
	}) ?? params.provider;
	return !isCliProvider(executionProvider, params.cfg) || Boolean(getCliSessionBinding(params.entry, executionProvider)?.sessionId);
}
function withoutCronRunContinuation(entry) {
	const { cronRunContinuation: _cronRunContinuation, ...baseEntry } = entry;
	return baseEntry;
}
function emitAgentSendSessionLifecycleTransition(transition) {
	if (!transition) return;
	if (transition.previousSessionId) emitGatewaySessionEndPluginHook({
		cfg: transition.cfg,
		sessionKey: transition.sessionKey,
		sessionId: transition.previousSessionId,
		storePath: transition.storePath,
		sessionFile: transition.previousSessionFile,
		agentId: transition.agentId,
		workspaceDir: transition.workspaceDir,
		reason: transition.previousEndReason ?? "unknown",
		nextSessionId: transition.sessionId,
		nextSessionKey: transition.sessionKey
	});
	emitGatewaySessionStartPluginHook({
		cfg: transition.cfg,
		sessionKey: transition.sessionKey,
		sessionId: transition.sessionId,
		resumedFrom: transition.previousSessionId,
		storePath: transition.storePath,
		sessionFile: transition.sessionFile,
		agentId: transition.agentId
	});
}
function shouldSuppressAgentPromptPersistence(params) {
	return params.inputProvenance?.kind === "inter_session" && params.inputProvenance.sourceTool === "subagent_announce" && params.internalEvents?.some((event) => event.type === "task_completion" && event.source === "subagent") === true;
}
function yieldAfterAgentAcceptedAck() {
	return new Promise((resolve) => {
		setTimeout(resolve, 10);
	});
}
function waitForCronContinuationReleaseRecovery(delayMs) {
	return new Promise((resolve) => {
		setSafeTimeout(resolve, delayMs).unref?.();
	});
}
//#endregion
export { respondDeletedAgentSession as a, waitForCronContinuationReleaseRecovery as c, emitAgentSendSessionLifecycleTransition as i, withoutCronRunContinuation as l, clientHasAdminScope as n, respondUnavailableAgentSessionForKey as o, cronContinuationHasReusableRuntime as r, shouldSuppressAgentPromptPersistence as s, CRON_CONTINUATION_RELEASE_RECOVERY_DELAYS_MS as t, yieldAfterAgentAcceptedAck as u };
