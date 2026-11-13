import { Ci as validateSessionsCompanionStateParams, Si as validateSessionsCompanionResetParams, xi as validateSessionsCompanionAskParams } from "./src-D2gvuSyP.mjs";
import { r as GatewayErrorDetailCodes, t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { n as captureGatewayOperatorRunAuthority } from "./operator-run-authority-CZcmYuYn.mjs";
import { n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { i as resolveSessionStoreKey } from "./session-store-key-__CfQfd2.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { _ as resolveSessionSharingTarget, d as hiddenSessionNotFound } from "./session-sharing-policy-BALdNo4L.mjs";
import { S as prepareSessionSharing } from "./session-sharing-Bhe-fXzH.mjs";
import { a as captureGatewayClientUploadCommitGuard } from "./upload-policy-D2eRzQeB.mjs";
import { n as defineValidatedGatewayHandler } from "./validation-B7TobU6-.mjs";
import { t as SessionCompanionAskError } from "./session-companion-errors-CRRY_D3O.mjs";
//#region src/gateway/session-companion-rpc.ts
function resolveCompanionTarget(params, context) {
	const cfg = context.getRuntimeConfig();
	const requested = resolveRequestedSessionAgentId(cfg, params.sessionKey, params.agentId);
	if (!requested.ok) return requested;
	return {
		ok: true,
		agentId: requested.agentId,
		sessionKey: resolveSessionStoreKey({
			cfg,
			sessionKey: params.sessionKey,
			storeAgentId: requested.agentId
		})
	};
}
function companionTargetIsVisible(target, client, context) {
	if (client?.connId && context.isConnectionActive?.(client.connId) === false) return false;
	const cfg = context.getRuntimeConfig();
	const sharingTarget = resolveSessionSharingTarget({
		cfg,
		sessionKey: target.sessionKey,
		agentId: target.agentId
	});
	if (!sharingTarget) return cfg.gateway?.roles === void 0;
	return prepareSessionSharing({
		client,
		cfg
	}).entryFilter?.(sharingTarget.storeKey, sharingTarget.entry) !== false;
}
const sessionCompanionHandlers = {
	"sessions.companion.ask": defineValidatedGatewayHandler("sessions.companion.ask", validateSessionsCompanionAskParams, async ({ params, respond, client, context, signal, hasCurrentClientAuthority }) => {
		const { sessionKey, agentId, question, selectionContext, attachments } = params;
		if (!question.trim()) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "question must contain non-whitespace text"));
			return;
		}
		if (!client?.connId) {
			respond(false, void 0, errorShape(ErrorCodes.FORBIDDEN, "Side chat questions require a connected client."));
			return;
		}
		if (!context.sessionCompanion) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Side chat is unavailable."));
			return;
		}
		const target = resolveCompanionTarget({
			sessionKey,
			agentId
		}, context);
		if (!target.ok) {
			respond(false, void 0, target.error);
			return;
		}
		if (!companionTargetIsVisible(target, client, context)) {
			respond(false, void 0, hiddenSessionNotFound(target.sessionKey));
			return;
		}
		const companion = context.sessionCompanion;
		const connId = client.connId;
		const originalAttachments = attachments?.length ? structuredClone(attachments) : void 0;
		const assertInputCurrent = captureGatewayClientUploadCommitGuard({
			method: "sessions.companion.ask",
			requestParams: { attachments: originalAttachments },
			client,
			context
		});
		const assertSourceCurrent = () => {
			signal?.throwIfAborted();
			if (context.sessionCompanion !== companion || client.connId !== connId || client.invalidated || hasCurrentClientAuthority?.() === false || !companionTargetIsVisible(target, client, context)) throw new SessionCompanionAskError("session-missing", "Side chat is unavailable.");
		};
		let capturedOperator;
		try {
			assertInputCurrent?.();
			capturedOperator = await captureGatewayOperatorRunAuthority({
				client,
				context,
				hasCurrentClientAuthority,
				invocationAuthority: {
					assertCurrent: assertSourceCurrent,
					signal
				}
			});
			assertSourceCurrent();
			assertInputCurrent?.();
			const result = await companion.ask({
				sessionKey: target.sessionKey,
				agentId: target.agentId,
				question,
				...selectionContext ? { selectionContext } : {},
				...originalAttachments ? { attachments: originalAttachments } : {},
				connId,
				assertSourceCurrent,
				...assertInputCurrent ? { assertInputCurrent } : {},
				...capturedOperator ? { operatorAuthority: capturedOperator.authority } : {},
				...signal ? { signal } : {}
			});
			capturedOperator?.authority.assertCurrent();
			respond(true, result);
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) {
				respond(false, void 0, error.error);
				return;
			}
			if (!(error instanceof SessionCompanionAskError)) {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Side chat could not answer right now."));
				return;
			}
			if (error.reason === "busy") {
				respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error.message, {
					details: { code: GatewayErrorDetailCodes.SESSION_COMPANION_BUSY },
					retryable: true
				}));
				return;
			}
			const retryable = error.reason === "rate-limited" || error.reason === "context-unavailable";
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error.message, {
				details: { reason: error.reason },
				retryable,
				...error.retryAfterMs ? { retryAfterMs: error.retryAfterMs } : {}
			}));
		} finally {
			capturedOperator?.release();
		}
	}),
	"sessions.companion.state": defineValidatedGatewayHandler("sessions.companion.state", validateSessionsCompanionStateParams, ({ params, respond, client, context }) => {
		if (!context.sessionCompanion) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Side chat is unavailable."));
			return;
		}
		const { sessionKey, agentId } = params;
		const target = resolveCompanionTarget({
			sessionKey,
			agentId
		}, context);
		if (!target.ok) {
			respond(false, void 0, target.error);
			return;
		}
		if (!companionTargetIsVisible(target, client, context)) {
			respond(false, void 0, hiddenSessionNotFound(target.sessionKey));
			return;
		}
		respond(true, context.sessionCompanion.state({
			agentId: target.agentId,
			sessionKey: target.sessionKey
		}));
	}),
	"sessions.companion.reset": defineValidatedGatewayHandler("sessions.companion.reset", validateSessionsCompanionResetParams, ({ params, respond, context }) => {
		if (!context.sessionCompanion) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "Side chat is unavailable."));
			return;
		}
		const { sessionKey, agentId } = params;
		const target = resolveCompanionTarget({
			sessionKey,
			agentId
		}, context);
		if (!target.ok) {
			respond(false, void 0, target.error);
			return;
		}
		context.sessionCompanion.reset({
			agentId: target.agentId,
			sessionKey: target.sessionKey
		});
		respond(true, { ok: true });
	})
};
//#endregion
export { sessionCompanionHandlers };
