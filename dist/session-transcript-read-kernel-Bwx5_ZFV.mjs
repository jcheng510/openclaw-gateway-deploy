import { j as resolveIntegerOption } from "./number-coercion-Dq1l5muL.mjs";
import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { n as SessionTranscriptStorageUnavailableError } from "./session-transcript-projection-error-B7C6SQei.mjs";
import { i as iterateVisibleMessageRange, u as resolveVisibleMessagePositions } from "./session-accessor.sqlite-reset-window-aHCfqvV_.mjs";
import { a as readSessionTranscriptHistoryEventPageFromProjection, i as readSessionTranscriptHistoryEventLookupFromProjection, l as resolveVisibleHistoryEventCount, n as readSessionTranscriptHistoryAnchorPageFromProjection, o as readSessionTranscriptHistoryEventsFromProjection, r as readSessionTranscriptHistoryEventByIdFromProjection, t as readRecentSessionTranscriptHistoryEventsFromProjection } from "./session-accessor.sqlite-history-query-C4OrjAh-.mjs";
import { i as sqliteMessageEventWithSeq } from "./session-transcript-entry-message-DG6i_p0U.mjs";
import { t as ArchivedTranscriptReader } from "./session-transcript-archive-reader-DsHVyA18.mjs";
//#region src/gateway/session-transcript-read-kernel.ts
function archivedTranscriptReader(target) {
	return new ArchivedTranscriptReader({
		agentId: target.agentId,
		sessionId: target.sessionId,
		storePath: target.storePath
	});
}
function projectSqliteHistoryEvents(entries) {
	const messages = [];
	for (const entry of entries) {
		const message = sqliteMessageEventWithSeq(entry);
		if (message) messages.push(message);
	}
	return messages;
}
function normalizeRecentSqliteReadOptions(opts) {
	const maxMessages = Math.max(0, Math.floor(opts?.maxMessages ?? 0));
	return {
		maxMessages,
		maxBytes: resolveIntegerOption(opts?.maxBytes, 8388608, { min: 1024 }),
		maxLines: resolveIntegerOption(opts?.maxLines, maxMessages * 20 + 20, { min: maxMessages }),
		captureReadWindow: opts?.captureReadWindow,
		expectedReadWindow: opts?.expectedReadWindow,
		readOnly: opts?.readOnly
	};
}
function readRecentSqliteMessageRecords(projection, opts) {
	const normalized = normalizeRecentSqliteReadOptions(opts);
	const page = readRecentSessionTranscriptHistoryEventsFromProjection(projection, normalized);
	return {
		...page.activeLeafEntryId !== void 0 ? { activeLeafEntryId: page.activeLeafEntryId } : {},
		...page.deltaCursor ? { deltaCursor: page.deltaCursor } : {},
		displaySource: page.displaySource,
		...page.readWindow ? { readWindow: page.readWindow } : {},
		...page.windowReset ? { windowReset: true } : {},
		messages: projectSqliteHistoryEvents(page.events),
		totalMessages: page.totalMessages
	};
}
/** Share pagination and archive policy while the caller owns acquisition and restoration. */
function createSessionTranscriptReader(access) {
	async function visitSessionMessagesAsync(scope, visit) {
		const target = await access.resolveTarget(scope);
		return access.readSnapshot(target, (projection) => {
			let count = 0;
			const visible = resolveVisibleMessagePositions(projection);
			for (const entry of iterateVisibleMessageRange(projection, 0, visible.total)) {
				const message = asOptionalRecord(entry.event)?.message;
				if (message !== void 0) {
					visit(message, entry.seq);
					count += 1;
				}
			}
			return count;
		});
	}
	async function readSnapshotIfPresent(target, read, options) {
		try {
			return await access.readSnapshot(target, read, options);
		} catch (error) {
			if (error instanceof SessionTranscriptStorageUnavailableError && error.reason === "database-missing" && (options === void 0 || options.allowResetArchiveFallback === true) && !options?.readOnly) return;
			throw error;
		}
	}
	async function readSessionMessageCountAsync(scope) {
		return await readSnapshotIfPresent(await access.resolveTarget(scope), resolveVisibleHistoryEventCount) ?? 0;
	}
	async function readSessionMessagesAsync(scope, opts) {
		return (await readSessionMessagesWithSourceAsync(scope, opts)).messages;
	}
	async function readSessionMessagesWithSourceAsync(scope, opts) {
		const target = await access.resolveTarget(scope);
		const messages = await readSnapshotIfPresent(target, (projection) => opts.mode === "recent" ? readRecentSqliteMessageRecords(projection, opts).messages : projectSqliteHistoryEvents(readSessionTranscriptHistoryEventsFromProjection(projection)), opts) ?? [];
		if (messages.length === 0 && opts.allowResetArchiveFallback === true) return await archivedTranscriptReader(target).read(opts);
		return {
			messages,
			transcriptPath: target.sessionFile
		};
	}
	async function readSessionMessageByIdAsync(scope, messageId, opts) {
		const target = await access.resolveTarget(scope);
		const foundEvent = await readSnapshotIfPresent(target, (projection) => readSessionTranscriptHistoryEventByIdFromProjection(projection, messageId, opts));
		if (foundEvent) return {
			found: true,
			message: sqliteMessageEventWithSeq(foundEvent),
			oversized: false,
			seq: foundEvent.seq,
			...foundEvent.serializedBytes !== void 0 ? { serializedBytes: foundEvent.serializedBytes } : {}
		};
		if (opts?.allowResetArchiveFallback === true && !opts.currentOnly) return await archivedTranscriptReader(target).readById(messageId);
		return {
			found: false,
			oversized: false
		};
	}
	/** Read exact membership while retaining full-history validity and empty-only archive fallback. */
	async function readSessionMessagesMatchingIdAsync(scope, messageId) {
		const target = await access.resolveTarget(scope);
		const lookup = await access.readSnapshot(target, (projection) => readSessionTranscriptHistoryEventLookupFromProjection(projection, messageId));
		return (lookup.hasDisplayMessages ? projectSqliteHistoryEvents(lookup.events) : await archivedTranscriptReader(target).readMessageCandidatesById(messageId)).filter((message) => asOptionalRecord(asOptionalRecord(message)?.["__openclaw"])?.id === messageId);
	}
	async function readRecentSessionMessagesWithStatsAsync(scope, opts) {
		const target = await access.resolveTarget(scope);
		const page = await readSnapshotIfPresent(target, (projection) => readRecentSqliteMessageRecords(projection, opts), opts) ?? {
			messages: [],
			totalMessages: 0
		};
		if (!page.windowReset && page.totalMessages === 0 && page.messages.length === 0 && opts.allowResetArchiveFallback === true) return await archivedTranscriptReader(target).readRecentWithStats(opts);
		return {
			...page,
			transcriptPath: target.sessionFile,
			transcriptSource: "active"
		};
	}
	async function readSessionMessagesPageWithStatsAsync(scope, opts) {
		const target = await access.resolveTarget(scope);
		const page = await readSnapshotIfPresent(target, (projection) => readSessionTranscriptHistoryEventPageFromProjection(projection, opts), opts);
		if ((!page || page.totalMessages === 0 && !page.windowReset) && opts.allowResetArchiveFallback === true) return await archivedTranscriptReader(target).readPage(opts);
		if (!page) return {
			messages: [],
			totalMessages: 0,
			transcriptPath: target.sessionFile,
			transcriptSource: "active"
		};
		return {
			...Object.hasOwn(page, "activeLeafEntryId") ? { activeLeafEntryId: page.activeLeafEntryId } : {},
			...page.olderOffset !== void 0 ? { olderOffset: page.olderOffset } : {},
			...page.deltaCursor ? { deltaCursor: page.deltaCursor } : {},
			...page.omittedOversized ? { omittedOversized: true } : {},
			messages: projectSqliteHistoryEvents(page.events),
			displaySource: page.displaySource,
			...page.readWindow ? { readWindow: page.readWindow } : {},
			...page.windowReset ? { windowReset: true } : {},
			totalMessages: page.totalMessages,
			transcriptPath: target.sessionFile,
			transcriptSource: "active"
		};
	}
	/** Reads one message-id-anchored page from a single transcript snapshot. */
	async function readSessionMessagesAroundIdWithStatsAsync(scope, opts) {
		const target = await access.resolveTarget(scope);
		const sessionFile = !scope.sessionFile && scope.sessionEntry?.sessionId && scope.sessionEntry.sessionId !== scope.sessionId ? void 0 : target.sessionFile;
		const page = await readSnapshotIfPresent(target, (projection) => readSessionTranscriptHistoryAnchorPageFromProjection(projection, opts), opts);
		if (!page?.found) {
			if (opts.allowResetArchiveFallback === true) return await new ArchivedTranscriptReader({
				agentId: target.agentId,
				sessionFile,
				sessionId: target.sessionId,
				storePath: target.storePath
			}).readAroundId(opts);
			return {
				found: false,
				hasOverreadContext: false,
				messages: [],
				offset: 0,
				totalMessages: page?.totalMessages ?? 0,
				transcriptPath: target.sessionFile
			};
		}
		return {
			found: true,
			...page.windowReset ? { windowReset: true } : {},
			...page.readWindow ? { readWindow: page.readWindow } : {},
			displaySource: page.displaySource,
			hasOverreadContext: page.hasOverreadContext,
			messages: page.events.map(sqliteMessageEventWithSeq).filter((message) => message !== void 0),
			offset: page.offset,
			totalMessages: page.totalMessages,
			transcriptPath: target.sessionFile
		};
	}
	return {
		visitSessionMessagesAsync,
		readSessionMessageCountAsync,
		readSessionMessagesAsync,
		readSessionMessagesWithSourceAsync,
		readSessionMessageByIdAsync,
		readSessionMessagesMatchingIdAsync,
		readRecentSessionMessagesWithStatsAsync,
		readSessionMessagesPageWithStatsAsync,
		readSessionMessagesAroundIdWithStatsAsync
	};
}
//#endregion
export { createSessionTranscriptReader as t };
