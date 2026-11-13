import { R as timestampMsToIsoString, f as asSafeIntegerInRange, y as parseDateStringTimestampMs } from "./number-coercion-Dq1l5muL.mjs";
import { a as asOptionalRecord, c as isRecord, l as isStringRecord } from "./record-coerce-TIsquoVR.mjs";
import { j as writeExternalFileWithinRoot } from "./fs-safe-CHQXnCPk.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { a as iterateSqliteQuerySync, d as expressionBuilder, i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { i as requestSqliteWorkerOperationAdmission, n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { t as createOpenClawStateSchemaEnsurer } from "./openclaw-state-feature-schema-C1E82tS9.mjs";
import { c as TRANSCRIPTS_RESULT_MAX_BYTES, r as TRANSCRIPTS_LEGACY_MAX_UTTERANCES, t as TRANSCRIPTS_EXPORT_MAX_BYTES } from "./transcripts-PQ3p7JZB.mjs";
import { r as removePathWithinRoot } from "./fs-safe-remove-DuP7yp5L.mjs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
import fs from "node:fs/promises";
import { toUSVString } from "node:util";
import { createHash, randomUUID } from "node:crypto";
//#region src/transcripts/store-errors.ts
var TranscriptsSummaryChangedError = class extends Error {
	constructor() {
		super("Transcript changed while generating notes; summarize it again.");
	}
};
var TranscriptSessionConflictError = class extends Error {
	constructor() {
		super("Transcript session ID conflicts with another capture on this date; use a new ID.");
		this.name = "TranscriptSessionConflictError";
	}
};
//#endregion
//#region src/transcripts/sqlite-schema.ts
const ensureMeetingTranscriptsSchema = createOpenClawStateSchemaEnsurer({
	table: "meeting_transcript_sessions",
	endMarker: "  CHECK (summary_json IS NOT NULL OR markdown IS NOT NULL)\n) STRICT;\n",
	operationLabel: "meeting-transcripts.schema.ensure"
});
const TRANSCRIPT_EXPORT_FILE_NAMES = /* @__PURE__ */ new Set([
	"metadata.json",
	"summary.json",
	"summary.md",
	"transcript.jsonl"
]);
function safeTranscriptPathSegment(value) {
	let segment = value.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
	if (!segment) return "session";
	if (segment.endsWith(".") || /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/iu.test(segment)) segment = Buffer.from(segment, "utf8").toString("hex").match(/.{2}/gu).map((byte) => `%${byte.toUpperCase()}`).join("");
	if (segment.length > 255) {
		const suffix = `-${sha256Hex(value)}`;
		return `${segment.slice(0, 255 - suffix.length)}${suffix}`;
	}
	return segment;
}
function legacyTranscriptPathSegment(value) {
	return value.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "session";
}
function dateSegment(value) {
	return value?.match(/^(\d{4}-\d{2}-\d{2})T/)?.[1] ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function transcriptSessionSelector(session) {
	return `${dateSegment(session.startedAt)}/${safeTranscriptPathSegment(session.sessionId)}`;
}
function legacyTranscriptSessionSelector(session) {
	const date = dateSegment(session.startedAt);
	const segment = legacyTranscriptPathSegment(session.sessionId);
	if (segment.length > 255) return;
	if (segment === ".") return date;
	if (segment === "..") return ".";
	return `${date}/${segment}`;
}
function transcriptSessionExportKey(session) {
	return transcriptSessionSelector(session).toLowerCase();
}
function normalizeExportText(value) {
	return value.endsWith("\n") ? value : `${value}\n`;
}
async function writeTranscriptArtifact(rootDir, fileName, content) {
	await writeExternalFileWithinRoot({
		rootDir,
		path: fileName,
		write: async (tempPath) => await fs.writeFile(tempPath, content, { mode: 384 })
	});
	return sha256Hex(content);
}
async function removeTranscriptArtifact(rootDir, fileName) {
	await removePathWithinRoot({
		rootDir,
		relativePath: fileName,
		force: true
	});
}
async function isCaseSensitiveDirectory(directory) {
	const probeName = `.openclaw-case-probe-${randomUUID().toLowerCase()}`;
	const probePath = path.join(directory, probeName);
	const alternatePath = path.join(directory, probeName.toUpperCase());
	await (await fs.open(probePath, "wx", 384)).close();
	try {
		try {
			await fs.access(alternatePath);
			return false;
		} catch (error) {
			if (hasErrnoCode(error, "ENOENT")) return true;
			throw error;
		}
	} finally {
		await fs.rm(probePath, { force: true });
	}
}
//#endregion
//#region src/transcripts/store-sqlite.ts
function meetingTranscriptDb(db) {
	return getNodeSqliteKysely(db);
}
function meetingTranscriptSessionQuery(database, session) {
	return meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").where("session_id", "=", session.sessionId).where("started_at", "=", session.startedAt);
}
function transcriptSummaryInputRevisionFromRow(row) {
	return JSON.stringify({
		next_utterance_seq: row.next_utterance_seq,
		title: row.title,
		source_json: row.source_json,
		metadata_json: row.metadata_json,
		stopped_at: row.stopped_at
	});
}
function readTranscriptSummaryInputRevision(database, session) {
	const row = executeSqliteQueryTakeFirstSync(database, meetingTranscriptSessionQuery(database, session).select([
		"next_utterance_seq",
		"title",
		"source_json",
		"metadata_json",
		"stopped_at"
	]));
	return row ? transcriptSummaryInputRevisionFromRow(row) : void 0;
}
function readStoredTranscriptSummaryRevision(database, session) {
	const row = executeSqliteQueryTakeFirstSync(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_summaries").select([
		"generated_at",
		"summary_json",
		"markdown",
		"utterance_count"
	]).where("session_id", "=", session.sessionId).where("session_started_at", "=", session.startedAt));
	return row ? sha256Hex(JSON.stringify(row)) : void 0;
}
function readTranscriptSummaryKeys(database) {
	const rows = executeSqliteQuerySync(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_summaries").select(["session_id", "session_started_at"])).rows;
	return new Set(rows.map((row) => `${row.session_id}\0${row.session_started_at}`));
}
function readRecentStoppedTranscriptSession(database, source, stoppedAfter, stoppedBefore) {
	const row = executeSqliteQueryTakeFirstSync(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").selectAll().where("provider_id", "=", source.providerId).where("stopped_at", ">=", stoppedAfter).where("stopped_at", "<=", stoppedBefore).where((eb) => eb.and([
		"accountId",
		"guildId",
		"channelId",
		"meetingUrl",
		"threadTs",
		"fileId"
	].map((key) => eb(eb.fn("json_extract", [eb.ref("source_json"), eb.val(`$.${key}`)]), source[key] === void 0 ? "is" : "=", source[key] ?? null)))).orderBy("stopped_at", "desc").orderBy("started_at", "desc").orderBy("session_id", "asc").limit(1));
	return row ? {
		session: sessionFromRow(row),
		inputRevision: transcriptSummaryInputRevisionFromRow(row)
	} : void 0;
}
function meetingTranscriptUtteranceQuery(database, session) {
	return meetingTranscriptDb(database).selectFrom("meeting_transcript_utterances").where("session_id", "=", session.sessionId).where("session_started_at", "=", session.startedAt);
}
function hasExactMeetingTranscriptUtterance(params) {
	const utterance = params.utterance;
	if ([
		utterance.startedAt,
		utterance.endedAt,
		utterance.speaker?.id,
		utterance.speaker?.label,
		utterance.text
	].some((value) => value != null && toUSVString(value) !== value)) return false;
	return Boolean(executeSqliteQueryTakeFirstSync(params.database, meetingTranscriptUtteranceQuery(params.database, params.session).select("sequence").where("utterance_id", "=", utterance.id).where("started_at", "is", utterance.startedAt ?? null).where("ended_at", "is", utterance.endedAt ?? null).where("speaker_id", "is", utterance.speaker?.id ?? null).where("speaker_label", "is", utterance.speaker?.label ?? null).where("text", "=", utterance.text).where("final", "is", utterance.final === void 0 ? null : utterance.final ? 1 : 0).where("metadata_json", "is", params.metadataJson).limit(1)));
}
function appendMeetingTranscriptUtterance(params) {
	const { database, session, utterance } = params;
	const db = meetingTranscriptDb(database);
	if (utterance.id && hasExactMeetingTranscriptUtterance({
		database,
		metadataJson: params.metadataJson,
		session,
		utterance: {
			...utterance,
			id: utterance.id
		}
	})) return;
	const stored = executeSqliteQueryTakeFirstSync(database, meetingTranscriptSessionQuery(database, session).select("next_utterance_seq"));
	if (!stored) throw new Error(`transcripts session not found: ${session.sessionId}`);
	const sequence = stored.next_utterance_seq;
	executeSqliteQuerySync(database, db.insertInto("meeting_transcript_utterances").values({
		session_id: session.sessionId,
		session_started_at: session.startedAt,
		sequence,
		utterance_id: utterance.id ?? null,
		started_at: utterance.startedAt ?? null,
		ended_at: utterance.endedAt ?? null,
		speaker_id: utterance.speaker?.id ?? null,
		speaker_label: utterance.speaker?.label ?? null,
		text: utterance.text,
		final: utterance.final === void 0 ? null : utterance.final ? 1 : 0,
		metadata_json: params.metadataJson
	}));
	executeSqliteQuerySync(database, db.updateTable("meeting_transcript_sessions").set({
		next_utterance_seq: sequence + 1,
		updated_at_ms: params.now
	}).where("session_id", "=", session.sessionId).where("started_at", "=", session.startedAt));
}
function parseOptionalJsonRecord(value) {
	if (!value) return;
	return asOptionalRecord(JSON.parse(value));
}
function sessionFromRow(row) {
	const source = parseOptionalJsonRecord(row.source_json);
	const metadata = parseOptionalJsonRecord(row.metadata_json);
	if (!source || typeof source.providerId !== "string") throw new Error(`invalid meeting transcript source for ${row.session_id}`);
	return {
		sessionId: row.session_id,
		source,
		startedAt: row.started_at,
		...row.title !== null ? { title: row.title } : {},
		...row.stopped_at !== null ? { stoppedAt: row.stopped_at } : {},
		...metadata ? { metadata } : {}
	};
}
function utteranceFromRow(row) {
	const speaker = row.speaker_label !== null ? {
		label: row.speaker_label,
		...row.speaker_id !== null ? { id: row.speaker_id } : {}
	} : void 0;
	const metadata = parseOptionalJsonRecord(row.metadata_json);
	return {
		sessionId: row.session_id,
		text: row.text,
		...row.utterance_id !== null ? { id: row.utterance_id } : {},
		...row.started_at !== null ? { startedAt: row.started_at } : {},
		...row.ended_at !== null ? { endedAt: row.ended_at } : {},
		...speaker ? { speaker } : {},
		...row.final === null ? {} : { final: row.final === 1 },
		...metadata ? { metadata } : {}
	};
}
function summaryFromRow(row) {
	return row.summary_json ? JSON.parse(row.summary_json) : void 0;
}
//#endregion
//#region src/transcripts/store-export-state.ts
function parseTranscriptExportManifest(json) {
	const value = JSON.parse(json);
	if (!isStringRecord(value)) throw new TypeError("Invalid transcript export manifest: expected an object of strings.");
	return value;
}
function parseTranscriptPendingExports(json) {
	const value = JSON.parse(json);
	if (!Array.isArray(value) || !value.every((entry) => typeof entry === "string")) throw new TypeError("Invalid pending transcript exports: expected an array of strings.");
	return new Set(value);
}
//#endregion
//#region src/transcripts/store-read.ts
var TranscriptLibraryError = class extends Error {
	constructor(type, message, maxBytes) {
		super(message);
		this.type = type;
		this.maxBytes = maxBytes;
	}
};
function cursorScope(values) {
	return createHash("sha256").update(JSON.stringify(values)).digest("hex");
}
function encodeCursor(scope, position) {
	return Buffer.from(JSON.stringify([
		1,
		scope,
		...position
	])).toString("base64url");
}
function decodeCursor(cursor, scope) {
	if (cursor === void 0) return;
	try {
		if (cursor.length > 1048576 || !/^[A-Za-z0-9_-]+$/u.test(cursor)) throw new Error();
		const value = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
		if (Array.isArray(value) && value[0] === 1 && value[1] === scope) return value.slice(2);
	} catch {}
	throw new TranscriptLibraryError("transcript_invalid_cursor", "Invalid transcript cursor; restart pagination with the current filters.");
}
function transcriptPageLimit(limit = 50, max = 100) {
	if (!Number.isInteger(limit) || limit < 1 || limit > max) throw new TranscriptLibraryError("transcript_invalid_filter", `Transcript page limit must be between 1 and ${max}.`);
	return limit;
}
function assertTranscriptByteLimit(text, maxBytes = TRANSCRIPTS_RESULT_MAX_BYTES, exporting = false) {
	assertTranscriptByteCount(Buffer.byteLength(text, "utf8"), maxBytes, exporting);
}
function assertTranscriptByteCount(bytes, maxBytes = TRANSCRIPTS_RESULT_MAX_BYTES, exporting = false) {
	if (bytes > maxBytes) throw new TranscriptLibraryError(exporting ? "transcript_export_too_large" : "transcript_result_too_large", exporting ? "Transcript exceeds the download limit; use a local transcript export." : "Transcript response exceeds the read limit; request a smaller page or use a local transcript export.", maxBytes);
}
function byteLimit(purpose) {
	return purpose === "legacy" ? void 0 : purpose === "export" ? TRANSCRIPTS_EXPORT_MAX_BYTES : TRANSCRIPTS_RESULT_MAX_BYTES;
}
function assertReadBytes(bytes, purpose) {
	const maxBytes = byteLimit(purpose);
	if (maxBytes !== void 0) assertTranscriptByteCount(bytes, maxBytes, purpose === "export");
}
function textBytes(...values) {
	const eb = expressionBuilder();
	const bytes = values.reduce((sum, value) => eb(sum, "+", eb.fn.coalesce(eb.fn("octet_length", [value]), eb.val(0))), eb.val(0));
	return eb.parens(bytes);
}
function boundedText(value, bytes, maxBytes) {
	if (maxBytes === void 0) return expressionBuilder().parens(value);
	return expressionBuilder().case().when(bytes, "<=", maxBytes).then(value).else("").end();
}
function readQuery(database, query, purpose = "page") {
	const eb = expressionBuilder(query);
	const notes = eb.selectFrom("meeting_transcript_summaries as notes").whereRef("notes.session_id", "=", "meeting_transcript_sessions.session_id").whereRef("notes.session_started_at", "=", "meeting_transcript_sessions.started_at");
	const overview = notes.select((n) => n.fn("json_extract", [n.ref("notes.summary_json"), n.val("$.overview")]).as("overview")).$asScalar();
	const summarySource = notes.select((n) => n.fn("json_extract", [n.ref("notes.summary_json"), n.val("$.source")]).as("source")).$asScalar();
	const utterances = eb.selectFrom("meeting_transcript_utterances as u").whereRef("u.session_id", "=", "meeting_transcript_sessions.session_id").whereRef("u.session_started_at", "=", "meeting_transcript_sessions.started_at");
	const speakers = utterances.select("u.speaker_label").where("u.speaker_label", "is not", null).where("u.speaker_label", "!=", "").groupBy("u.speaker_label").orderBy((u) => u.fn.min("u.sequence"), "asc");
	const participants = eb.selectFrom(speakers.as("speakers")).select((s) => s.fn("json_group_array", [s.ref("speakers.speaker_label")]).as("participants")).$asScalar();
	const lastAt = utterances.select((u) => u.fn.coalesce("u.ended_at", "u.started_at").as("at")).orderBy("u.sequence", "desc").limit(1).$asScalar();
	const identityBytes = textBytes(eb.ref("session_id"), eb.ref("started_at"), eb.ref("selector"));
	const bytes = textBytes(eb.ref("session_id"), eb.ref("started_at"), eb.ref("selector"), eb.ref("source_json"), eb.ref("metadata_json"), eb.ref("title"), eb.ref("stopped_at"), lastAt, overview, summarySource, participants);
	const maxBytes = byteLimit(purpose);
	const columns = (payloadBytes) => [
		boundedText(eb.ref("session_id"), identityBytes, maxBytes).as("session_id"),
		boundedText(eb.ref("started_at"), identityBytes, maxBytes).as("started_at"),
		boundedText(eb.ref("selector"), identityBytes, maxBytes).as("selector"),
		boundedText(eb.ref("source_json"), payloadBytes, maxBytes).as("source_json"),
		boundedText(eb.ref("metadata_json"), payloadBytes, maxBytes).as("metadata_json"),
		boundedText(eb.ref("title"), payloadBytes, maxBytes).as("title"),
		boundedText(eb.ref("stopped_at"), payloadBytes, maxBytes).as("stopped_at"),
		boundedText(lastAt, payloadBytes, maxBytes).as("last_utterance_at"),
		boundedText(overview, payloadBytes, maxBytes).as("overview"),
		boundedText(summarySource, payloadBytes, maxBytes).as("summary_source"),
		boundedText(participants, payloadBytes, maxBytes).as("participants_json"),
		eb.parens(payloadBytes).as("payload_bytes"),
		identityBytes.as("identity_bytes"),
		utterances.select((u) => u.fn.countAll().as("count")).$asScalar().as("utterance_count"),
		"updated_at_ms",
		eb.exists(notes.select("notes.session_id")).as("has_summary")
	];
	if (maxBytes === void 0) return query.select(columns(bytes));
	return meetingTranscriptDb(database).with((cte) => cte("read_sizes").materialized(), () => query.select([
		"session_id as read_session_id",
		"started_at as read_started_at",
		bytes.as("payload_bytes")
	])).selectFrom("read_sizes").innerJoin("meeting_transcript_sessions", (join) => join.onRef("meeting_transcript_sessions.session_id", "=", "read_sizes.read_session_id").onRef("meeting_transcript_sessions.started_at", "=", "read_sizes.read_started_at")).select((sizes) => columns(sizes.ref("read_sizes.payload_bytes")));
}
function transcriptReadEntryFromRow(row, purpose = "page") {
	assertReadBytes(row.payload_bytes, purpose);
	const session = sessionFromRow(row);
	const summarySource = row.summary_source === "model" || row.summary_source === "heuristic" ? row.summary_source : void 0;
	return {
		session,
		selector: row.selector,
		hasSummary: Boolean(row.has_summary),
		utteranceCount: row.utterance_count,
		participants: JSON.parse(row.participants_json ?? "[]"),
		overview: typeof row.overview === "string" ? row.overview : void 0,
		summarySource,
		updatedAt: new Date(row.updated_at_ms).toISOString(),
		lastUtteranceAt: row.last_utterance_at ?? null
	};
}
const dateReaders = /* @__PURE__ */ new WeakSet();
const dateParser = new AsyncLocalStorage();
function parseTranscriptDate(value) {
	return (dateParser.getStore() ?? parseDateStringTimestampMs)(value);
}
function registerTranscriptDateReader(database) {
	if (dateReaders.has(database)) return;
	database.function("openclaw_transcript_date_ms", (value) => parseTranscriptDate(value) ?? null);
	dateReaders.add(database);
}
function transcriptStartTime(startedAt) {
	const eb = expressionBuilder();
	return eb.case().when(eb.fn("octet_length", [startedAt]), "<=", TRANSCRIPTS_RESULT_MAX_BYTES).then(eb.fn("openclaw_transcript_date_ms", [startedAt])).end();
}
/** Chronological key selection scans candidates; filters never turn into ownership. */
function* iterateTranscriptReadEntries(database, options) {
	const limit = transcriptPageLimit(options.limit, 200);
	registerTranscriptDateReader(database);
	let query = meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions");
	if (options.session) query = query.where("session_id", "=", options.session.sessionId).where("started_at", "=", options.session.startedAt);
	if (options.offset !== void 0) query = query.offset(options.offset);
	if (options.providerId) query = query.where("provider_id", "=", options.providerId);
	if (options.accountId) {
		const accountId = options.accountId;
		query = query.where((eb) => eb(eb.fn("json_extract", [eb.ref("source_json"), eb.val("$.accountId")]), "=", accountId));
	}
	if (options.agentId) {
		const agentId = options.agentId;
		query = query.where((eb) => eb(eb.fn("json_extract", [eb.ref("metadata_json"), eb.val("$.agentId")]), "=", agentId));
	}
	if (options.startedAfter) {
		const startedAfter = parseTranscriptDate(options.startedAfter) ?? null;
		query = query.where((eb) => eb(transcriptStartTime(eb.ref("started_at")), ">=", startedAfter));
	}
	if (options.startedBefore) {
		const startedBefore = parseTranscriptDate(options.startedBefore) ?? null;
		query = query.where((eb) => eb(transcriptStartTime(eb.ref("started_at")), "<", startedBefore));
	}
	if (options.after) {
		const after = options.after;
		const afterTime = parseTranscriptDate(after.startedAt);
		query = query.where((eb) => {
			const time = transcriptStartTime(eb.ref("started_at"));
			const afterIdentity = eb(eb.refTuple("session_id", "started_at"), ">", eb.tuple(after.sessionId, after.startedAt));
			return afterTime === void 0 ? eb.and([eb(time, "is", null), afterIdentity]) : eb.or([
				eb(time, "<", afterTime),
				eb(time, "is", null),
				eb.and([eb(time, "=", afterTime), afterIdentity])
			]);
		});
	}
	if (options.query) {
		const search = options.query;
		query = query.where((eb) => {
			const matches = (field) => eb(eb.fn("instr", [eb.fn("lower", [field]), eb.fn("lower", [eb.val(search)])]), ">", 0);
			const fields = [
				eb.ref("title"),
				eb.ref("session_id"),
				eb.ref("provider_id"),
				...[
					"accountId",
					"guildId",
					"channelId",
					"threadTs",
					"fileId"
				].map((key) => eb.fn("json_extract", [eb.ref("source_json"), eb.val(`$.${key}`)]))
			];
			return eb.or([
				...fields.map(matches),
				eb.exists(eb.selectFrom("meeting_transcript_summaries as notes").select("notes.session_id").whereRef("notes.session_id", "=", "meeting_transcript_sessions.session_id").whereRef("notes.session_started_at", "=", "meeting_transcript_sessions.started_at").where((notes) => notes.or([matches(notes.ref("notes.markdown")), matches(notes.fn("json_extract", [notes.ref("notes.summary_json"), notes.val("$.overview")]))]))),
				eb.exists(eb.selectFrom("meeting_transcript_utterances as utterance").select("utterance.session_id").whereRef("utterance.session_id", "=", "meeting_transcript_sessions.session_id").whereRef("utterance.session_started_at", "=", "meeting_transcript_sessions.started_at").where((utterance) => matches(utterance.ref("utterance.text"))))
			]);
		});
	}
	const keys = query.select(["session_id", "started_at"]).orderBy((eb) => transcriptStartTime(eb.ref("started_at")), "desc").orderBy("session_id", "asc").orderBy("started_at", "asc").limit(limit + 1);
	const rows = iterateSqliteQuerySync(database, readQuery(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").where((eb) => eb(eb.refTuple("session_id", "started_at"), "in", keys.$asTuple("session_id", "started_at")))).orderBy((eb) => transcriptStartTime(eb.ref("meeting_transcript_sessions.started_at")), "desc").orderBy("meeting_transcript_sessions.session_id", "asc").orderBy("meeting_transcript_sessions.started_at", "asc"));
	let count = 0;
	for (const row of rows) {
		if (count++ === limit) return true;
		yield transcriptReadEntryFromRow(row);
	}
	return false;
}
/** Selectors are unique; identity and payload bounds remain in the same SQLite statement. */
function readTranscriptEntry(database, selector, purpose = "page") {
	const row = executeSqliteQueryTakeFirstSync(database, readQuery(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").where("selector", "=", selector), purpose));
	if (!row) return;
	assertReadBytes(row.identity_bytes, purpose);
	return row.selector === selector ? transcriptReadEntryFromRow(row, purpose) : void 0;
}
function readLatestTranscriptEntry(database) {
	const row = executeSqliteQueryTakeFirstSync(database, readQuery(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").where("next_utterance_seq", ">", 0).orderBy("updated_at_ms", "desc").orderBy("meeting_transcript_sessions.started_at", "desc").orderBy("meeting_transcript_sessions.session_id", "asc").limit(1)));
	return row ? transcriptReadEntryFromRow(row) : void 0;
}
function queryTranscriptReadEntries(database, options, parseDate = parseDateStringTimestampMs) {
	return dateParser.run(parseDate, () => collectTranscriptReadEntries(database, options));
}
function collectTranscriptReadEntries(database, options) {
	const entries = [];
	let bytes = 0;
	for (const entry of iterateTranscriptReadEntries(database, options)) {
		const agentId = entry.session.metadata?.agentId;
		entry.session.metadata = typeof agentId === "string" ? { agentId } : void 0;
		bytes += Buffer.byteLength(JSON.stringify(entry), "utf8");
		assertTranscriptByteCount(bytes);
		entries.push(entry);
	}
	return entries;
}
function utteranceQuery(database, session, purpose) {
	return meetingTranscriptUtteranceQuery(database, session).select((eb) => {
		const maxBytes = byteLimit(purpose);
		const utteranceId = purpose === "legacy" ? eb.val(null) : eb.ref("utterance_id");
		const bytes = textBytes(utteranceId, eb.ref("started_at"), eb.ref("ended_at"), eb.ref("speaker_id"), eb.ref("speaker_label"), eb.ref("text"));
		return [
			boundedText(utteranceId, bytes, maxBytes).as("utterance_id"),
			boundedText(eb.ref("started_at"), bytes, maxBytes).as("started_at"),
			boundedText(eb.ref("ended_at"), bytes, maxBytes).as("ended_at"),
			boundedText(eb.ref("speaker_id"), bytes, maxBytes).as("speaker_id"),
			boundedText(eb.ref("speaker_label"), bytes, maxBytes).as("speaker_label"),
			boundedText(eb.ref("text"), bytes, maxBytes).as("text"),
			bytes.as("payload_bytes"),
			"sequence",
			"final"
		];
	});
}
function transcriptReadUtteranceFromRow(row) {
	return {
		sequence: row.sequence,
		id: row.utterance_id ?? void 0,
		startedAt: row.started_at ?? void 0,
		endedAt: row.ended_at ?? void 0,
		speakerId: row.speaker_id ?? void 0,
		speakerLabel: row.speaker_label ?? void 0,
		text: row.text,
		final: row.final === null ? void 0 : row.final === 1
	};
}
function readTranscriptUtterancePage(database, session, options, purpose = "page") {
	const recent = purpose === "legacy";
	const limit = recent ? TRANSCRIPTS_LEGACY_MAX_UTTERANCES : transcriptPageLimit(options.limit);
	let query = utteranceQuery(database, session, purpose);
	if (options.after !== void 0) query = query.where("sequence", ">", options.after);
	if (options.query) {
		const search = options.query;
		query = query.where((eb) => eb(eb.fn("instr", [eb.fn("lower", [eb.ref("text")]), eb.fn("lower", [eb.val(search)])]), ">", 0));
	}
	const rows = iterateSqliteQuerySync(database, query.orderBy("sequence", recent ? "desc" : "asc").limit(recent ? limit : limit + 1));
	const utterances = [];
	let bytes = 0;
	for (const row of rows) {
		if (utterances.length === limit) return {
			utterances,
			hasMore: true
		};
		bytes += row.payload_bytes;
		assertReadBytes(bytes, purpose);
		utterances.push(transcriptReadUtteranceFromRow(row));
	}
	return {
		utterances: recent ? utterances.toReversed() : utterances,
		hasMore: false
	};
}
/** Omit the duplicated transcript inside SQLite before materializing the stored summary. */
function readStoredTranscriptNotes(database, session, purpose = "page") {
	const row = executeSqliteQueryTakeFirstSync(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_summaries").select((eb) => {
		const summary = eb.fn("json_remove", [eb.ref("summary_json"), eb.val("$.transcript")]);
		const bytes = textBytes(summary, eb.ref("markdown"));
		return [
			boundedText(summary, bytes, byteLimit(purpose)).as("summary"),
			boundedText(eb.ref("markdown"), bytes, byteLimit(purpose)).as("markdown"),
			bytes.as("payload_bytes")
		];
	}).where("session_id", "=", session.sessionId).where("session_started_at", "=", session.startedAt));
	if (!row) return {};
	assertReadBytes(row.payload_bytes, purpose);
	let summary;
	if (row.summary) summary = JSON.parse(row.summary);
	return {
		summary,
		markdown: row.markdown ?? void 0
	};
}
function requireTranscriptReadEntry(database, selector, purpose) {
	const entry = readTranscriptEntry(database, selector, purpose);
	if (!entry) throw new TranscriptLibraryError("transcript_session_not_found", "Transcript not found; refresh the library and use its full selector.");
	return entry;
}
function readTranscriptLibraryEntry(database, params) {
	const purpose = params.limit === void 0 && params.cursor === void 0 && params.query === void 0 ? "legacy" : "page";
	const entry = requireTranscriptReadEntry(database, params.selector, purpose);
	const scope = cursorScope([
		"get",
		entry.selector,
		params.query
	]);
	const position = decodeCursor(params.cursor, scope);
	const after = asSafeIntegerInRange(position?.[0], { min: 0 });
	if (position && (position.length !== 1 || after === void 0)) throw new TranscriptLibraryError("transcript_invalid_cursor", "Invalid transcript reader cursor.");
	return {
		entry,
		page: params.includeUtterances ? readTranscriptUtterancePage(database, entry.session, {
			limit: params.limit,
			query: params.query,
			after
		}, purpose) : void 0,
		notes: readStoredTranscriptNotes(database, entry.session, purpose),
		purpose,
		scope
	};
}
/** Stream canonical rows and notes in the caller's read snapshot without materializing files. */
function* iterateTranscriptExport(database, selector, includeNotes) {
	const entry = requireTranscriptReadEntry(database, selector, "export");
	for (const row of iterateSqliteQuerySync(database, utteranceQuery(database, entry.session, "export").orderBy("sequence", "asc"))) {
		assertTranscriptByteCount(row.payload_bytes, TRANSCRIPTS_EXPORT_MAX_BYTES, true);
		yield transcriptReadUtteranceFromRow(row);
	}
	return {
		entry,
		notes: includeNotes ? readStoredTranscriptNotes(database, entry.session, "export") : void 0
	};
}
//#endregion
//#region src/transcripts/store-date-preparation.ts
/** Native Date parsing belongs to the caller: skills can temporarily change its timezone. */
function prepareTranscriptDateReader(assertOwner, databasePath) {
	const timezone = process.env.TZ;
	let usedCallerTimezone = false;
	const assertCurrent = () => {
		assertOwner();
		if (usedCallerTimezone && process.env.TZ !== timezone) throw new Error("Transcript timezone changed while reading; retry the read.");
	};
	return {
		assertCurrent,
		createAdmission: () => ({
			nativeLocations: [databasePath],
			admission: createSqliteWorkerOperationAdmission((request, grant) => {
				const facts = request.facts;
				if (request.stage !== "prepare" || !isRecord(facts) || facts.kind !== "transcript-date" || typeof facts.value !== "string" || Buffer.byteLength(facts.value, "utf8") > 1048576 || !(facts.result instanceof SharedArrayBuffer) || facts.result.byteLength !== Float64Array.BYTES_PER_ELEMENT) throw new Error("Invalid transcript date preparation request");
				usedCallerTimezone = true;
				assertCurrent();
				new Float64Array(facts.result)[0] = parseDateStringTimestampMs(facts.value) ?? NaN;
				grant();
			})
		})
	};
}
/** Reuse one bounded reply and cache across the current synchronous query only. */
function createPreparedTranscriptDateReader() {
	const result = new Float64Array(new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT));
	const dates = /* @__PURE__ */ new Map();
	return (value) => {
		if (typeof value !== "string") return;
		if (dates.has(value)) return dates.get(value);
		const nativeTimestamp = parseDateStringTimestampMs(value);
		if (nativeTimestamp !== void 0 && timestampMsToIsoString(nativeTimestamp) === value) return nativeTimestamp;
		requestSqliteWorkerOperationAdmission({
			stage: "prepare",
			facts: {
				kind: "transcript-date",
				value,
				result: result.buffer
			}
		});
		const parsed = Number.isNaN(result[0]) ? void 0 : result[0];
		if (value.length <= 256) {
			if (dates.size === 256) dates.clear();
			dates.set(value, parsed);
		}
		return parsed;
	};
}
//#endregion
export { utteranceFromRow as A, ensureMeetingTranscriptsSchema as B, readRecentStoppedTranscriptSession as C, sessionFromRow as D, readTranscriptSummaryKeys as E, removeTranscriptArtifact as F, TranscriptsSummaryChangedError as H, safeTranscriptPathSegment as I, transcriptSessionExportKey as L, isCaseSensitiveDirectory as M, legacyTranscriptSessionSelector as N, summaryFromRow as O, normalizeExportText as P, transcriptSessionSelector as R, parseOptionalJsonRecord as S, readTranscriptSummaryInputRevision as T, TranscriptSessionConflictError as V, parseTranscriptPendingExports as _, assertTranscriptByteLimit as a, meetingTranscriptSessionQuery as b, encodeCursor as c, queryTranscriptReadEntries as d, readLatestTranscriptEntry as f, parseTranscriptExportManifest as g, readTranscriptLibraryEntry as h, assertTranscriptByteCount as i, TRANSCRIPT_EXPORT_FILE_NAMES as j, transcriptSummaryInputRevisionFromRow as k, iterateTranscriptExport as l, readTranscriptEntry as m, prepareTranscriptDateReader as n, cursorScope as o, readStoredTranscriptNotes as p, TranscriptLibraryError as r, decodeCursor as s, createPreparedTranscriptDateReader as t, iterateTranscriptReadEntries as u, appendMeetingTranscriptUtterance as v, readStoredTranscriptSummaryRevision as w, meetingTranscriptUtteranceQuery as x, meetingTranscriptDb as y, writeTranscriptArtifact as z };
