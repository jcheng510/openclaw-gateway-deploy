import { _ as issueProviderReviewAcknowledgment, b as retireProviderReviewAcknowledgment, v as readProviderReviewAcknowledgment } from "./lifecycle-DlS-bWdU.mjs";
import { s as isOperatorUiClient } from "./message-channel-DDiCYM9I.mjs";
import { ea as validateSessionsProviderReviewContinueParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { _ as resolveSessionSharingTarget } from "./session-sharing-policy-BALdNo4L.mjs";
import { t as resolveSessionMutationAuthorization } from "./session-sharing-Bhe-fXzH.mjs";
import { n as defineValidatedGatewayHandler } from "./validation-B7TobU6-.mjs";
//#region src/gateway/server-methods/sessions-provider-review.ts
const sessionProviderReviewHandlers = { "sessions.providerReview.continue": defineValidatedGatewayHandler("sessions.providerReview.continue", validateSessionsProviderReviewContinueParams, async (options) => {
	const { params, client, context, respond } = options;
	if (!client || !isOperatorUiClient(client.connect.client) || client.internal?.syntheticClient || client.internal?.senderAttribution) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "Review and acknowledge the findings in chat."));
		return;
	}
	let acknowledgment;
	let handedOff = false;
	try {
		const authorization = options.sessionMutationAuthorization ? {
			authorization: options.sessionMutationAuthorization,
			error: null
		} : resolveSessionMutationAuthorization({
			client,
			method: "sessions.providerReview.continue",
			requestParams: params,
			context
		});
		if (authorization.error) {
			respond(false, void 0, authorization.error);
			return;
		}
		const cfg = context.getRuntimeConfig();
		const requested = resolveRequestedSessionAgentId(cfg, params.sessionKey, params.agentId);
		if (!requested.ok) {
			respond(false, void 0, requested.error);
			return;
		}
		const target = resolveSessionSharingTarget({
			cfg,
			sessionKey: params.sessionKey,
			agentId: requested.agentId
		});
		if (!target || target.entry.sessionId !== params.sessionId) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "The session changed; refresh its findings."));
			return;
		}
		const assertCurrent = () => {
			options.signal?.throwIfAborted();
			if (options.hasCurrentClientAuthority?.() === false) throw new Error("Provider review caller authority is no longer current");
			(authorization.authorization?.assertAdmittedInputCurrent ?? authorization.authorization?.assertCurrent)?.();
		};
		acknowledgment = await issueProviderReviewAcknowledgment({
			target: {
				agentId: target.agentId,
				storePath: target.storePath,
				sessionKey: target.storeKey,
				sessionId: target.entry.sessionId,
				lifecycleRevision: target.entry.lifecycleRevision
			},
			reviewId: params.reviewId,
			nextRunId: params.idempotencyKey,
			assertCurrent
		});
		const { review } = readProviderReviewAcknowledgment(acknowledgment);
		const message = review.review?.continuation?.message;
		if (message === void 0) throw new Error("Provider review has no continuation");
		const { handleProviderReviewContinuationChat } = await import("./chat-send-handler-B1S9aBTR.mjs");
		assertCurrent();
		handedOff = true;
		await handleProviderReviewContinuationChat({
			...options,
			sessionMutationAuthorization: authorization.authorization,
			params: {
				sessionKey: target.canonicalKey,
				agentId: target.agentId,
				sessionId: target.entry.sessionId,
				message,
				idempotencyKey: params.idempotencyKey,
				deliver: false
			}
		}, acknowledgment);
	} catch (error) {
		if (error instanceof SessionMutationAuthorizationChangedError) respond(false, void 0, error.error);
		else respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "Could not continue this chat. Refresh its current findings before trying again."));
	} finally {
		if (acknowledgment && !handedOff) retireProviderReviewAcknowledgment(acknowledgment);
	}
}) };
//#endregion
export { sessionProviderReviewHandlers };
