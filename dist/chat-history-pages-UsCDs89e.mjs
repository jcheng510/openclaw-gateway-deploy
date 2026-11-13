import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { n as getCliSessionBinding } from "./cli-session-binding-Xt6nY3mk.mjs";
import { r as augmentChatHistoryWithCanvasBlocks } from "./chat-display-projection.canvas-Bq1n-BMM.mjs";
import { o as readSessionMessagesAsync, u as session_transcript_readers_exports } from "./session-transcript-readers-DuU1dcaM.mjs";
import { p as resolveCurrentUserProfileDisplay } from "./session-identity-projection-BpSB0ikl.mjs";
import { r as dropPreSessionStartAnnouncePairs, u as projectForwardedMessages } from "./chat-display-projection.history-BtIa0UYa.mjs";
import { n as createCurrentUserProfileMessageProjector, s as projectChatDisplayMessagesWithState } from "./chat-display-projection.core-wI52Ji6o.mjs";
import { a as readTranscriptDisplayPosition } from "./transcript-image-artifacts-JZUt0-cM.mjs";
import { n as readChatHistoryMessageId } from "./session-history-tail-DppUL5Mp.mjs";
import { r as readChatHistoryPageKernel } from "./chat-history-page-kernel-JYmKBTdR.mjs";
import { t as createSessionHistorySubagentProjection } from "./session-history-subagent-projection-Cvs74LEJ.mjs";
//#region src/gateway/server-methods/chat-history-pages.ts
function readCliIdentityProjectionKey(message) {
	const id = readChatHistoryMessageId(message);
	if (id) return `id:${id}`;
	const record = asOptionalRecord(message);
	const meta = asOptionalRecord(record?.["__openclaw"]);
	const position = readTranscriptDisplayPosition(meta?.transcriptPosition);
	if (!record || !position) return;
	return JSON.stringify([
		position,
		record.role,
		record.text,
		record.content
	]);
}
function projectCliIdentityOntoPagedMessages(params) {
	const importedMetaByKey = /* @__PURE__ */ new Map();
	for (const message of params.completeMessages) {
		const key = readCliIdentityProjectionKey(message);
		const meta = asOptionalRecord(asOptionalRecord(message)?.["__openclaw"]);
		if (key && meta) importedMetaByKey.set(key, meta);
	}
	return params.pagedMessages.map((message) => {
		const record = asOptionalRecord(message);
		const key = readCliIdentityProjectionKey(message);
		const importedMeta = key ? importedMetaByKey.get(key) : void 0;
		if (!record || !importedMeta) return message;
		const localMeta = asOptionalRecord(record["__openclaw"]);
		return {
			...record,
			__openclaw: {
				...localMeta,
				importedFrom: importedMeta.importedFrom,
				externalId: importedMeta.externalId,
				cliSessionId: importedMeta.cliSessionId
			}
		};
	});
}
async function readChatHistoryPage(params, signal) {
	signal?.throwIfAborted();
	if (!params.sessionId || !params.storePath || params.entry?.incognito || isIncognitoSessionKey(params.canonicalKey) || getCliSessionBinding(params.entry, "claude-cli")?.sessionId) {
		const page = await readChatHistoryPageLocal(params);
		return {
			...page,
			messages: refreshForwardedLabels(page.messages)
		};
	}
	const { readSessionHistoryPageInWorker } = await import("./session-history-worker-runtime-B-T76Mwc.mjs");
	const page = await readSessionHistoryPageInWorker({
		kind: "rpc",
		params: {
			...params,
			sessionId: params.sessionId,
			storePath: params.storePath,
			entry: params.entry ? {
				sessionId: params.entry.sessionId,
				updatedAt: params.entry.updatedAt,
				sessionStartedAt: params.entry.sessionStartedAt
			} : void 0
		}
	}, signal);
	if (page.encodedResponse) return page;
	const project = createCurrentUserProfileMessageProjector(resolveCurrentUserProfileDisplay);
	return {
		...page,
		messages: refreshForwardedLabels(page.messages).map((message) => {
			const record = asOptionalRecord(message);
			return record ? project(record) : message;
		})
	};
}
function refreshForwardedLabels(messages) {
	return projectForwardedMessages(messages.filter((message) => asOptionalRecord(message) !== void 0));
}
async function readChatHistoryPageLocal(params) {
	const { entry, provider, effectiveMaxChars, offset, messageId, sessionId, storePath } = params;
	const cliSessionId = params.ignoreCliSessionImports ? void 0 : getCliSessionBinding(entry, "claude-cli")?.sessionId;
	const subagentCoordination = sessionId && storePath && !entry?.incognito && !isIncognitoSessionKey(params.canonicalKey) ? createSessionHistorySubagentProjection({
		agentId: params.sessionAgentId,
		sessionId,
		sessionKey: params.canonicalKey,
		storePath,
		sessionEntry: entry
	}) : void 0;
	const page = await readChatHistoryPageKernel(params, {
		readers: {
			...session_transcript_readers_exports,
			subagentCoordination
		},
		resolveCurrentUserProfileDisplay,
		...cliSessionId ? {
			cliSessionId,
			readCliTailPage: async ({ readScope, incrementalTail, activeLeafEntryId, buildTailPage }) => {
				const { readChatHistoryCliSessionImportSnapshot, resolveChatHistoryWithCliSessionImports } = await import("./cli-session-history-DSBsYy1i.mjs");
				const importedMessages = await readChatHistoryCliSessionImportSnapshot({
					entry,
					provider,
					localMessages: incrementalTail.rawMessages
				});
				const cliHistory = resolveChatHistoryWithCliSessionImports({
					entry,
					provider,
					localMessages: incrementalTail.rawMessages,
					preparedImportedMessages: importedMessages
				});
				if ((offset !== void 0 || messageId) && !cliHistory.imported) return readChatHistoryPageLocal({
					...params,
					ignoreCliSessionImports: true
				});
				if (cliHistory.expanded || messageId) {
					const completeLocalMessages = dropPreSessionStartAnnouncePairs(await readSessionMessagesAsync(readScope, {
						mode: "full",
						reason: "chat.history CLI import merge",
						allowResetArchiveFallback: true
					}), typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0);
					const completeCliHistory = resolveChatHistoryWithCliSessionImports({
						entry,
						provider,
						localMessages: completeLocalMessages,
						preparedImportedMessages: importedMessages
					});
					if (!completeCliHistory.imported) return readChatHistoryPageLocal({
						...params,
						ignoreCliSessionImports: true
					});
					const mergedMessages = dropPreSessionStartAnnouncePairs(completeCliHistory.messages, typeof entry?.sessionStartedAt === "number" ? entry.sessionStartedAt : void 0);
					const { messages: displayMessages, activity } = projectChatDisplayMessagesWithState(mergedMessages, {
						subagentCoordination,
						includeCommentaryFallbacks: true,
						maxChars: effectiveMaxChars,
						resolveCurrentUserProfileDisplay
					});
					if (!completeCliHistory.expanded && !messageId) {
						const localPage = await readChatHistoryPageLocal({
							...params,
							ignoreCliSessionImports: true
						});
						return {
							...localPage,
							messages: projectCliIdentityOntoPagedMessages({
								pagedMessages: localPage.messages,
								completeMessages: displayMessages
							})
						};
					}
					if (messageId && !displayMessages.some((message) => readChatHistoryMessageId(message) === messageId)) return { messages: [] };
					return {
						activeLeafEntryId,
						messages: augmentChatHistoryWithCanvasBlocks(displayMessages),
						activity,
						completeCliImport: true,
						pagination: {
							offset: 0,
							totalMessages: mergedMessages.length,
							rawPageMessages: mergedMessages.length,
							exhausted: true
						}
					};
				}
				return buildTailPage(cliHistory.imported ? projectCliIdentityOntoPagedMessages({
					pagedMessages: incrementalTail.projected,
					completeMessages: cliHistory.messages
				}) : incrementalTail.projected);
			}
		} : {}
	});
	subagentCoordination?.assertCurrent?.();
	return page;
}
//#endregion
export { readChatHistoryPage as t };
