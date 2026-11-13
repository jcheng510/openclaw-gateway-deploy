import { n as createReadonlySessionHistoryReader } from "./session-history-readonly-reader-qbPwlfKY.mjs";
import { r as resolveGatewaySessionStoreReadSources } from "./session-utils-store-sources-CkoYwMAP.mjs";
//#region src/gateway/session-history-worker-reader.ts
/** Dispatch only inside the history worker's admitted database lifetime. */
async function readSessionHistoryRequest(request, readTarget) {
	const { sourceDiscovery, ...readerTarget } = readTarget;
	const options = {
		readers: createReadonlySessionHistoryReader(readerTarget, sourceDiscovery ? () => resolveGatewaySessionStoreReadSources(sourceDiscovery).sources : void 0),
		readOnly: true,
		deferProfileDisplay: true,
		resolveCronJobName: () => void 0
	};
	if (request.kind === "artifacts") {
		const { selectSessionArtifacts } = await import("./session-artifact-read-AukVXVTp.mjs");
		const query = request.params.query;
		return {
			kind: "artifacts",
			result: query.kind === "list" && query.includeDownloadData === false && !query.downloadArtifactIds ? {
				kind: "list",
				artifacts: await options.readers.readArtifactSummaries(query)
			} : await selectSessionArtifacts(request.params.target, query, options.readers)
		};
	}
	if (request.kind === "message-page") return {
		kind: "message-page",
		result: await options.readers.readSessionMessagesPageWithStatsAsync(request.params.target, request.params.options)
	};
	if (request.kind === "around-id") return {
		kind: "around-id",
		result: await options.readers.readSessionMessagesAroundIdWithStatsAsync(request.params.target, request.params.options)
	};
	if (request.kind === "source-messages") return {
		kind: "source-messages",
		result: await options.readers.readSessionMessagesWithSourceAsync(request.params.target, request.params.options)
	};
	if (request.kind === "recent-page") return {
		kind: "recent-page",
		result: await options.readers.readRecentSessionMessagesWithStatsAsync(request.params.target, request.params.options)
	};
	if (request.kind === "transcript-binding") return {
		kind: "transcript-binding",
		binding: options.readers.readTranscriptBinding()
	};
	if (request.kind === "message-by-id") {
		const { target, messageId, options: lookupOptions } = request.params;
		return {
			kind: "message-by-id",
			result: await options.readers.readSessionMessageByIdAsync(target, messageId, lookupOptions)
		};
	}
	if (request.kind === "message-count") return {
		kind: "message-count",
		count: await options.readers.readSessionMessageCountAsync(request.params.target)
	};
	if (request.kind === "message-lookup") return {
		kind: "message-lookup",
		messages: await options.readers.readSessionMessagesMatchingIdAsync(request.params.target, request.params.messageId)
	};
	if (request.kind === "recent") {
		const { target, ...limits } = request.params;
		const { messages } = await options.readers.readRecentSessionMessagesWithStatsAsync(target, limits);
		return {
			kind: "recent",
			messages
		};
	}
	if (request.kind === "delta") {
		const { prepareSessionHistoryDelta } = await import("./session-history-delta-visibility-aiwnVU0P.mjs");
		return {
			kind: "delta",
			...prepareSessionHistoryDelta(options.readers.readTranscriptDisplayDelta(request.params.limits), options.readers.subagentCoordination)
		};
	}
	if (request.kind === "rpc") {
		const { readChatHistoryPageKernel } = await import("./chat-history-page-kernel-gh_PCxrt.mjs");
		const { encodeChatHistoryResponsePage } = await import("./chat-history-response-page-D3LRr_Gv.mjs");
		return {
			kind: "rpc",
			page: encodeChatHistoryResponsePage(await readChatHistoryPageKernel(request.params, options), request.params)
		};
	}
	const { readSessionHistorySnapshotKernel } = await import("./session-history-snapshot-CmdZzk4t.mjs");
	return {
		kind: "http",
		snapshot: await readSessionHistorySnapshotKernel(request.params, options)
	};
}
//#endregion
export { readSessionHistoryRequest };
