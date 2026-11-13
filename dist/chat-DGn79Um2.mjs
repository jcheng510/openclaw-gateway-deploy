import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { d as resolveSessionWorkStartError } from "./lifecycle-DlS-bWdU.mjs";
import { r as jsonUtf8Bytes } from "./json-utf8-bytes-fm9i4b7G.mjs";
import { G as validateChatMessageGetParams, W as validateChatInjectParams, Y as validateChatToolTitlesParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { n as CHAT_PENDING_INPUT_MESSAGE_PREFIX } from "./chat-history-constants-C-H8nkgi.mjs";
import { n as beginSessionWorkAdmission } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import { X as readSessionPendingInput } from "./session-accessor-CGLseszP.mjs";
import { a as MAX_PAYLOAD_BYTES } from "./server-constants-BH_EolwD.mjs";
import { n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import "./sessions-Db5eEwNA.mjs";
import { r as augmentChatHistoryWithCanvasBlocks } from "./chat-display-projection.canvas-Bq1n-BMM.mjs";
import { m as resolveEffectiveChatHistoryMaxChars } from "./chat-display-projection.helpers-CUY3usMG.mjs";
import { a as readSessionMessagesAroundIdWithStatsAsync, r as readSessionMessageByIdAsync } from "./session-transcript-readers-DuU1dcaM.mjs";
import { d as hiddenSessionNotFound } from "./session-sharing-policy-BALdNo4L.mjs";
import { p as resolveCurrentUserProfileDisplay } from "./session-identity-projection-BpSB0ikl.mjs";
import { i as loadGatewaySessionEntryReadOnly, r as loadGatewaySessionEntry } from "./session-utils-store-DWiBeNMH.mjs";
import { r as projectOperatorModelRead } from "./operator-model-presentation-BiKS5bEN.mjs";
import { b as createSessionListEntryFilter } from "./session-sharing-Bhe-fXzH.mjs";
import "./session-utils-FXsPIESl.mjs";
import { l as prepareForwardedMessageCronJobNameResolver, r as dropPreSessionStartAnnouncePairs } from "./chat-display-projection.history-BtIa0UYa.mjs";
import { a as projectChatDisplayMessage, r as isPendingAssistantError } from "./chat-display-projection.core-wI52Ji6o.mjs";
import "./chat-display-projection-BZOWmxhK.mjs";
import { n as readChatHistoryMessageId } from "./session-history-tail-DppUL5Mp.mjs";
import "./chat-history-budget-zzuPoeCz.mjs";
import { t as readChatHistoryPage } from "./chat-history-pages-UsCDs89e.mjs";
import { t as formatForLog } from "./ws-log-d7CdTsJL.mjs";
import { h as sendGlobalAwareNodeChatPayload, m as resolveGlobalAwareNodeChatDeliveryKeys } from "./chat-aborted-partial-CnnHHzbH.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import "./chat-input-sanitize-BUL6M46s.mjs";
import { t as appendAssistantTranscriptMessage } from "./chat-transcript-persistence-XSCvorHI.mjs";
import { r as projectPendingInputMessage, t as chatHistoryHandlers } from "./chat-history-handler-7hmp7Qfv.mjs";
//#region src/gateway/server-methods/chat-message-get-handler.ts
async function isChatMessageIdVisibleAfterHistoryFilters(params) {
	if (isPendingAssistantError(params.message)) return (await readChatHistoryPage({
		entry: params.sessionEntry,
		provider: void 0,
		sessionId: params.sessionId,
		storePath: params.storePath,
		sessionAgentId: params.agentId,
		canonicalKey: params.sessionKey,
		max: 1,
		maxHistoryBytes: MAX_PAYLOAD_BYTES,
		effectiveMaxChars: MAX_PAYLOAD_BYTES,
		offset: void 0,
		messageId: params.messageId,
		ignoreCliSessionImports: true
	})).messages.some((message) => readChatHistoryMessageId(message) === params.messageId);
	if (params.sessionStartedAt === void 0) return true;
	const { messages } = await readSessionMessagesAroundIdWithStatsAsync({
		agentId: params.agentId,
		sessionEntry: params.sessionEntry,
		sessionId: params.sessionId,
		sessionKey: params.sessionKey,
		storePath: params.storePath
	}, {
		maxMessages: 1,
		messageId: params.messageId,
		...params.allowResetArchiveFallback === true ? { allowResetArchiveFallback: true } : {}
	});
	return dropPreSessionStartAnnouncePairs(messages, params.sessionStartedAt).some((message) => readChatHistoryMessageId(message) === params.messageId);
}
const chatMessageGetHandlers = { "chat.message.get": async ({ params, respond, context, client, sessionMutationAuthorization }) => {
	if (!assertValidParams(params, validateChatMessageGetParams, "chat.message.get", respond)) return;
	const { sessionKey, messageId, maxChars } = params;
	const agentIdOverride = normalizeOptionalString(params.agentId);
	const cfg = context.getRuntimeConfig();
	const requestedAgent = resolveRequestedSessionAgentId(cfg, sessionKey, agentIdOverride);
	if (!requestedAgent.ok) {
		respond(false, void 0, requestedAgent.error);
		return;
	}
	const requestedAgentId = requestedAgent.agentId;
	const session = loadGatewaySessionEntryReadOnly(sessionKey, { agentId: requestedAgentId }, cfg);
	const { agentId: sessionAgentId, storePath, entry, canonicalKey } = session;
	const sessionId = entry?.sessionId;
	if (!sessionId) {
		respond(true, {
			ok: false,
			unavailableReason: "not_found"
		});
		return;
	}
	const canReadSession = (current = loadGatewaySessionEntryReadOnly(sessionKey, {
		agentId: requestedAgentId,
		clone: false,
		projection: "list"
	})) => {
		sessionMutationAuthorization?.assertCurrent();
		if (!current.entry || current.agentId !== session.agentId || current.canonicalKey !== canonicalKey || current.storePath !== storePath || current.entry.sessionId !== sessionId || current.entry.lifecycleRevision !== entry.lifecycleRevision) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "session changed while reading history; reload the conversation", { retryable: true }));
			return false;
		}
		if (createSessionListEntryFilter({
			client,
			cfg: context.getCommittedRuntimeConfig?.() ?? current.cfg
		})?.(current.canonicalKey, current.entry) === false) {
			respond(false, void 0, hiddenSessionNotFound(canonicalKey));
			return false;
		}
		return true;
	};
	if (!canReadSession(session)) return;
	const effectiveMaxChars = maxChars ?? Math.min(26214400, 1e6);
	if (messageId.startsWith("pending:")) {
		const pending = readSessionPendingInput({
			agentId: sessionAgentId,
			sessionKey: canonicalKey,
			sessionId,
			storePath
		}, messageId.slice(CHAT_PENDING_INPUT_MESSAGE_PREFIX.length));
		if (!pending) {
			respond(true, {
				ok: false,
				unavailableReason: "not_found"
			});
			return;
		}
		const resolveCronJobName = await prepareForwardedMessageCronJobNameResolver([pending.message], context.cronStorePath);
		if (!canReadSession()) return;
		const message = projectPendingInputMessage(pending, effectiveMaxChars, void 0, resolveCronJobName);
		if (!message) {
			respond(true, {
				ok: false,
				unavailableReason: "not_visible"
			});
			return;
		}
		respond(true, jsonUtf8Bytes(message) > 26213376 ? {
			ok: false,
			unavailableReason: "oversized"
		} : {
			ok: true,
			message
		});
		return;
	}
	const resolved = await readSessionMessageByIdAsync({
		agentId: sessionAgentId,
		sessionEntry: entry,
		sessionId,
		sessionKey,
		storePath
	}, messageId, { allowResetArchiveFallback: true });
	const visible = resolved.found && await isChatMessageIdVisibleAfterHistoryFilters({
		sessionId,
		storePath,
		sessionEntry: entry,
		sessionKey,
		agentId: sessionAgentId,
		message: resolved.message,
		messageId,
		sessionStartedAt: typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0,
		allowResetArchiveFallback: true
	});
	if (!canReadSession()) return;
	if (!visible) {
		respond(true, {
			ok: false,
			unavailableReason: "not_found"
		});
		return;
	}
	if (resolved.oversized) {
		respond(true, {
			ok: false,
			unavailableReason: "oversized"
		});
		return;
	}
	const projectedMessage = resolved.message ? projectChatDisplayMessage(resolved.message, {
		maxChars: effectiveMaxChars,
		resolveCurrentUserProfileDisplay
	}) : void 0;
	const projected = projectedMessage ? augmentChatHistoryWithCanvasBlocks([projectedMessage])[0] : void 0;
	if (!projected) {
		respond(true, {
			ok: false,
			unavailableReason: "not_visible"
		});
		return;
	}
	respond(true, jsonUtf8Bytes(projected) > 26213376 ? {
		ok: false,
		unavailableReason: "oversized"
	} : projectOperatorModelRead({
		context,
		client,
		agentId: sessionAgentId
	}, {
		ok: true,
		message: projected
	}));
} };
//#endregion
//#region src/gateway/server-methods/chat.ts
const chatHandlers = {
	...chatHistoryHandlers,
	...chatMessageGetHandlers,
	"chat.toolTitles": async ({ params, respond }) => {
		if (!assertValidParams(params, validateChatToolTitlesParams, "chat.toolTitles", respond)) return;
		respond(true, {
			titles: {},
			disabled: true
		});
	},
	"chat.inject": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateChatInjectParams, "chat.inject", respond)) return;
		const p = params;
		const rawSessionKey = p.sessionKey;
		const agentIdOverride = normalizeOptionalString(p.agentId);
		const cfg = context.getRuntimeConfig();
		const requestedAgent = resolveRequestedSessionAgentId(cfg, rawSessionKey, agentIdOverride);
		if (!requestedAgent.ok) {
			respond(false, void 0, requestedAgent.error);
			return;
		}
		const sessionLoadOptions = { agentId: requestedAgent.agentId };
		const { agentId, storePath, entry, canonicalKey: sessionKey } = loadGatewaySessionEntry(rawSessionKey, sessionLoadOptions, cfg);
		const sessionId = entry?.sessionId;
		if (!sessionId || !storePath) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "session not found"));
			return;
		}
		let appended;
		try {
			const admission = await beginSessionWorkAdmission({
				scope: storePath,
				identities: [sessionKey, sessionId],
				assertAllowed: () => {
					const latestEntry = loadGatewaySessionEntry(rawSessionKey, sessionLoadOptions).entry;
					if (!latestEntry) throw new Error(`Session "${sessionKey}" was deleted while starting work. Retry.`);
					if (latestEntry.sessionId !== sessionId) throw new Error(`Session "${sessionKey}" changed while starting work. Retry.`);
					const archivedError = resolveSessionWorkStartError(sessionKey, latestEntry);
					if (archivedError) throw new Error(archivedError);
				}
			});
			try {
				appended = await admission.run(async () => await appendAssistantTranscriptMessage({
					sessionKey,
					message: p.message,
					label: p.label,
					sessionId,
					storePath,
					agentId,
					createIfMissing: true,
					cfg
				}));
			} finally {
				admission.release();
			}
		} catch (err) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, formatForLog(err)));
			return;
		}
		if (!appended.ok || !appended.messageId || !appended.message) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, `failed to write transcript: ${appended.error ?? "unknown error"}`));
			return;
		}
		const message = projectChatDisplayMessage(appended.message, { maxChars: resolveEffectiveChatHistoryMaxChars() });
		const chatPayload = {
			runId: `inject-${appended.messageId}`,
			sessionKey,
			...agentId ? { agentId } : {},
			seq: 0,
			state: "final",
			message
		};
		context.broadcast("chat", chatPayload, { sessionKeys: resolveGlobalAwareNodeChatDeliveryKeys({
			cfg,
			sessionKey,
			agentId
		}) });
		sendGlobalAwareNodeChatPayload({
			context,
			sessionKey,
			agentId,
			event: "chat",
			payload: chatPayload
		});
		respond(true, {
			ok: true,
			messageId: appended.messageId
		});
	}
};
//#endregion
export { chatHandlers as t };
