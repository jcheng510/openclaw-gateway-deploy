import { Gr as validateSessionDiscussionOpenParams, Kr as validateSessionDiscussionOpenResult, Ur as validateSessionDiscussionInfoParams, Wr as validateSessionDiscussionInfoResult } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { y as formatValidationErrors } from "./worker-inference-DDewC2W1.mjs";
import { n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { a as resolveStoredSessionKeyForAgentStore } from "./session-store-key-__CfQfd2.mjs";
import { t as getSessionDiscussionProvider } from "./session-discussion-registry-BPfvGZKG.mjs";
import { t as hasExplicitSessionName } from "./session-title-state-BQCPqYS_.mjs";
import { t as formatForLog } from "./ws-log-d7CdTsJL.mjs";
import { r as emitSessionsChanged } from "./session-change-event-Biy7CorC.mjs";
import { n as defineValidatedGatewayHandler } from "./validation-B7TobU6-.mjs";
import { i as loadAccessorSessionEntryForGatewayTarget } from "./sessions-shared-Dj5YlWj4.mjs";
import { a as maybeGenerateSessionTitle } from "./dashboard-session-title-CpBR-N2J.mjs";
import { t as measureSessionCollaborationPhase } from "./sessions-collaboration-diagnostics-DxC9Aur3.mjs";
//#region src/gateway/server-methods/session-discussion.ts
const DISCUSSION_TITLE_TIMEOUT_MS = 1e4;
async function maybeGenerateTitleBeforeDiscussionOpen(params) {
	try {
		const cfg = params.context.getRuntimeConfig();
		const resolved = loadAccessorSessionEntryForGatewayTarget({
			cfg,
			key: params.sessionKey,
			agentId: params.agentId
		});
		const { entry } = resolved;
		const sessionId = entry?.sessionId;
		if (!entry || !sessionId || hasExplicitSessionName(entry)) return;
		const observedTitleRequest = maybeGenerateSessionTitle({
			cfg,
			agentId: resolved.target.agentId,
			entry,
			sessionId,
			sessionKey: resolved.canonicalKey,
			storePath: resolved.storePath,
			userMessage: ""
		}).catch((error) => {
			params.context.logGateway.warn(`dashboard session title generation failed: ${formatForLog(error)}`);
			return false;
		});
		let timeout;
		let persisted;
		try {
			persisted = await Promise.race([observedTitleRequest, new Promise((resolve) => {
				timeout = setTimeout(() => resolve(false), DISCUSSION_TITLE_TIMEOUT_MS);
				timeout.unref?.();
			})]);
		} finally {
			clearTimeout(timeout);
		}
		if (persisted) emitSessionsChanged(params.context, {
			sessionKey: resolved.canonicalKey,
			agentId: resolved.target.agentId,
			reason: "chat.title"
		});
	} catch (error) {
		params.context.logGateway.warn(`dashboard session title generation failed: ${formatForLog(error)}`);
	}
}
function sessionDiscussionHandler(operation) {
	const method = operation === "info" ? "session.discussion.info" : "session.discussion.open";
	const validateParams = operation === "info" ? validateSessionDiscussionInfoParams : validateSessionDiscussionOpenParams;
	const validateResult = operation === "info" ? validateSessionDiscussionInfoResult : validateSessionDiscussionOpenResult;
	return defineValidatedGatewayHandler(method, validateParams, async ({ params, respond, context }) => {
		const requestedAgent = resolveRequestedSessionAgentId(context.getRuntimeConfig(), params.sessionKey, params.agentId);
		if (!requestedAgent.ok) {
			respond(false, void 0, requestedAgent.error);
			return;
		}
		const provider = getSessionDiscussionProvider();
		if (!provider) {
			respond(true, { state: "none" }, void 0);
			return;
		}
		try {
			if (operation === "open") await maybeGenerateTitleBeforeDiscussionOpen({
				context,
				sessionKey: params.sessionKey,
				agentId: requestedAgent.agentId
			});
			const sessionKey = resolveStoredSessionKeyForAgentStore({
				cfg: context.getRuntimeConfig(),
				agentId: requestedAgent.agentId,
				sessionKey: params.sessionKey
			});
			const result = await measureSessionCollaborationPhase(`${method}.provider`, () => provider[operation]({
				sessionKey,
				agentId: requestedAgent.agentId
			}));
			if (!validateResult(result)) {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `invalid ${method} result: ${formatValidationErrors(validateResult.errors)}`));
				return;
			}
			respond(true, result, void 0);
		} catch (error) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error instanceof Error ? error.message : "session discussion provider failed"));
		}
	});
}
const sessionDiscussionHandlers = {
	"session.discussion.info": sessionDiscussionHandler("info"),
	"session.discussion.open": sessionDiscussionHandler("open")
};
//#endregion
export { sessionDiscussionHandlers };
