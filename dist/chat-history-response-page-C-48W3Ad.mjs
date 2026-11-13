import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { l as getMaxChatHistoryMessagesBytes } from "./server-constants-BH_EolwD.mjs";
import { f as isForwardedUserMessage, p as isProjectedForwardedMessage } from "./chat-display-projection.helpers-CUY3usMG.mjs";
import { t as capArrayByJsonBytes } from "./session-utils.fs-D_x8Wjut.mjs";
import "./session-transcript-readers-DuU1dcaM.mjs";
import { i as composeTranscriptDisplay } from "./transcript-image-artifacts-JZUt0-cM.mjs";
import { a as createChatHistoryByteCounter, i as createChatHistoryActivityProjection, l as trimChatHistoryActivity, s as replaceOversizedChatHistoryMessages, t as CHAT_HISTORY_MAX_SINGLE_MESSAGE_BYTES } from "./chat-history-budget-zzuPoeCz.mjs";
import { i as resolveChatHistoryNextOffset, n as enrichChatHistoryCompactionMarkers, t as capChatHistoryAroundMessage } from "./chat-history-page-kernel-JYmKBTdR.mjs";
//#region src/gateway/server-methods/chat-history-response-page.ts
function prepareChatHistoryResponsePage(historyPage, { entry: historyEntry, maxHistoryBytes, messageId }) {
	const normalized = enrichChatHistoryCompactionMarkers(historyPage.messages, historyEntry);
	const responseHistoryBytes = historyPage.completeCliImport ? getMaxChatHistoryMessagesBytes() : maxHistoryBytes;
	const activity = createChatHistoryActivityProjection(normalized, historyPage.activity);
	const byteCounter = createChatHistoryByteCounter(activity);
	const replaced = replaceOversizedChatHistoryMessages({
		byteCounter,
		messages: normalized,
		maxSingleMessageBytes: Math.min(CHAT_HISTORY_MAX_SINGLE_MESSAGE_BYTES, getMaxChatHistoryMessagesBytes())
	});
	const prioritized = historyPage.completeCliImport && !messageId ? trimChatHistoryActivity({
		messages: replaced.messages,
		maxBytes: responseHistoryBytes,
		byteCounter
	}) : replaced.messages;
	const capped = messageId ? capChatHistoryAroundMessage({
		messages: prioritized,
		messageId,
		maxCost: responseHistoryBytes - 1 - byteCounter.framingBytes(prioritized),
		messageCost: (message) => byteCounter.messageBytes(message) + 1
	}) : capArrayByJsonBytes(prioritized, responseHistoryBytes - byteCounter.framingBytes(prioritized), byteCounter.messageBytes).items;
	const historyBudgetPreserved = replaced.replacedCount === 0 && capped.length === normalized.length && capped.every((message, index) => message === normalized[index]);
	const pagination = historyPage.pagination;
	const candidateNextOffset = pagination === void 0 ? void 0 : resolveChatHistoryNextOffset({
		messages: capped,
		totalMessages: pagination.totalMessages,
		offset: pagination.offset,
		rawPageMessages: pagination.rawPageMessages,
		projected: normalized
	});
	const hasMore = pagination !== void 0 && candidateNextOffset !== void 0 ? pagination.exhausted !== true && candidateNextOffset < pagination.totalMessages : void 0;
	const survivors = new Set(capped);
	const omittedCount = normalized.reduce((count, message) => count + (survivors.has(message) ? 0 : 1), 0);
	return {
		messages: composeTranscriptDisplay(capped),
		...capped.some((message) => activity.has(message)) ? { activity: capped.flatMap((message) => activity.get(message) ?? []) } : {},
		messagesBytes: byteCounter.messagesBytes(capped),
		...omittedCount > 0 ? { omission: {
			omittedCount,
			normalizedBytes: byteCounter.messagesBytes(normalized)
		} } : {},
		responseHistoryBytes,
		...hasMore ? { nextOffset: candidateNextOffset } : {},
		...hasMore !== void 0 ? { hasMore } : {},
		...pagination !== void 0 ? { totalMessages: pagination.totalMessages } : {},
		...historyPage.completeCliImport && !hasMore && historyBudgetPreserved ? { completeSnapshot: true } : {}
	};
}
/** Keep host-owned live labels and legacy enrichment on the object path. */
function encodeChatHistoryResponsePage(page, params) {
	if (!params.encodeResponse || page.messages.some((value) => {
		const message = asOptionalRecord(value);
		const metadata = asOptionalRecord(message?.["__openclaw"]);
		return !message || isForwardedUserMessage(message) || isProjectedForwardedMessage(message) || metadata?.kind === "compaction" || message.role === "user" && asOptionalRecord(metadata?.senderIdentity)?.type === "profile";
	})) return page;
	const response = prepareChatHistoryResponsePage(page, params);
	if ((response.omission?.normalizedBytes ?? response.messagesBytes) < 131072 || response.messagesBytes > getMaxChatHistoryMessagesBytes()) return page;
	return {
		...page,
		messages: [],
		activity: void 0,
		encodedResponse: {
			...response,
			messages: new TextEncoder().encode(JSON.stringify(response.messages))
		}
	};
}
//#endregion
export { prepareChatHistoryResponsePage as n, encodeChatHistoryResponsePage as t };
