import { r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { d as normalizeStringEntries } from "./string-normalization-YMwDjufr.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import { b as writeMemoryCoreWorkspaceEntries, i as DREAMING_SESSION_INGESTION_SEEN_NAMESPACE, r as DREAMING_SESSION_INGESTION_FILES_NAMESPACE, t as DREAMING_DAILY_INGESTION_NAMESPACE, y as readMemoryCoreWorkspaceEntries } from "./dreaming-state-VYUvbU-n.mjs";
//#region extensions/memory-core/src/dreaming-ingestion-state.ts
const DAILY_MEMORY_FILENAME_RE = /^(\d{4}-\d{2}-\d{2})(?:-[^/]+)?\.md$/i;
function parseDailyMemoryFileName(fileName) {
	const day = fileName.match(DAILY_MEMORY_FILENAME_RE)?.[1];
	return day ? {
		fileName,
		day,
		canonical: fileName.toLowerCase() === `${day}.md`
	} : null;
}
function compareDailyMemoryFilesByNewestDay(left, right) {
	const dayOrder = right.day.localeCompare(left.day);
	if (dayOrder !== 0) return dayOrder;
	if (left.canonical !== right.canonical) return left.canonical ? -1 : 1;
	return left.fileName.localeCompare(right.fileName);
}
const MEMORY_DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const SESSION_INGESTION_MAX_TRACKED_MESSAGES_PER_SESSION = 4096;
function normalizeMemoryDay(value) {
	if (typeof value !== "string") return;
	const day = value.trim();
	return MEMORY_DAY_RE.test(day) ? day : void 0;
}
function normalizeDailyIngestionState(raw) {
	const record = asNullableRecord(raw);
	const filesRaw = asNullableRecord(record?.files);
	if (!filesRaw) return {
		version: 1,
		files: {}
	};
	const files = {};
	for (const [key, value] of Object.entries(filesRaw)) {
		const file = asNullableRecord(value);
		if (!file || typeof key !== "string" || key.trim().length === 0) continue;
		const mtimeMs = Number(file.mtimeMs);
		const size = Number(file.size);
		if (!Number.isFinite(mtimeMs) || mtimeMs < 0 || !Number.isFinite(size) || size < 0) continue;
		const lastDreamingDayIngested = normalizeMemoryDay(file.lastDreamingDayIngested);
		files[key] = {
			mtimeMs: Math.floor(mtimeMs),
			size: Math.floor(size),
			...lastDreamingDayIngested ? { lastDreamingDayIngested } : {}
		};
	}
	return {
		version: 1,
		files
	};
}
function normalizeSessionIngestionState(raw) {
	const record = asNullableRecord(raw);
	const filesRaw = asNullableRecord(record?.files);
	const files = {};
	if (filesRaw) for (const [key, value] of Object.entries(filesRaw)) {
		const file = asNullableRecord(value);
		if (!file || key.trim().length === 0) continue;
		const mtimeMs = Number(file.mtimeMs);
		const size = Number(file.size);
		if (!Number.isFinite(mtimeMs) || mtimeMs < 0 || !Number.isFinite(size) || size < 0) continue;
		const lineCountRaw = Number(file.lineCount);
		const lastContentLineRaw = Number(file.lastContentLine);
		const lineCount = Number.isFinite(lineCountRaw) && lineCountRaw >= 0 ? Math.floor(lineCountRaw) : 0;
		const lastContentLine = Number.isFinite(lastContentLineRaw) && lastContentLineRaw >= 0 ? Math.floor(lastContentLineRaw) : 0;
		files[key] = {
			mtimeMs: Math.floor(mtimeMs),
			size: Math.floor(size),
			contentHash: typeof file.contentHash === "string" ? file.contentHash.trim() : "",
			lineCount,
			lastContentLine: Math.min(lineCount, lastContentLine),
			...typeof file.excludedReason === "string" && file.excludedReason.trim() ? { excludedReason: file.excludedReason.trim() } : {}
		};
	}
	const seenMessagesRaw = asNullableRecord(record?.seenMessages);
	const seenMessages = {};
	if (seenMessagesRaw) for (const [scope, value] of Object.entries(seenMessagesRaw)) {
		if (scope.trim().length === 0 || !Array.isArray(value)) continue;
		const unique = normalizeStringEntries([...new Set(value.filter((entry) => typeof entry === "string"))]).slice(-4096);
		if (unique.length > 0) seenMessages[scope] = unique;
	}
	return {
		version: 3,
		files,
		seenMessages
	};
}
async function readDailyIngestionState(workspaceDir) {
	const entries = await readMemoryCoreWorkspaceEntries({
		namespace: DREAMING_DAILY_INGESTION_NAMESPACE,
		workspaceDir
	});
	return normalizeDailyIngestionState({
		version: 1,
		files: Object.fromEntries(entries.map((entry) => [entry.key, entry.value]))
	});
}
async function writeDailyIngestionState(workspaceDir, state) {
	await writeMemoryCoreWorkspaceEntries({
		namespace: DREAMING_DAILY_INGESTION_NAMESPACE,
		workspaceDir,
		entries: Object.entries(state.files).map(([key, value]) => ({
			key,
			value
		}))
	});
}
async function readSessionIngestionState(workspaceDir) {
	const [files, seenChunks] = await Promise.all([readMemoryCoreWorkspaceEntries({
		namespace: DREAMING_SESSION_INGESTION_FILES_NAMESPACE,
		workspaceDir
	}), readMemoryCoreWorkspaceEntries({
		namespace: DREAMING_SESSION_INGESTION_SEEN_NAMESPACE,
		workspaceDir
	})]);
	const seenMessages = {};
	for (const { value } of seenChunks.toSorted((a, b) => a.value.index - b.value.index)) {
		if (!value.scope.trim()) continue;
		seenMessages[value.scope] = [...seenMessages[value.scope] ?? [], ...value.hashes];
	}
	return normalizeSessionIngestionState({
		version: 3,
		files: Object.fromEntries(files.map((entry) => [entry.key, entry.value])),
		seenMessages
	});
}
async function writeSessionIngestionState(workspaceDir, state) {
	const seenEntries = Object.entries(state.seenMessages).flatMap(([scope, hashes]) => Array.from({ length: Math.ceil(hashes.length / 512) }, (_, index) => ({
		key: `${scope}:${index}`,
		value: {
			scope,
			index,
			hashes: hashes.slice(index * 512, (index + 1) * 512)
		}
	})));
	const writes = [writeMemoryCoreWorkspaceEntries({
		namespace: DREAMING_SESSION_INGESTION_FILES_NAMESPACE,
		workspaceDir,
		entries: Object.entries(state.files).map(([key, value]) => ({
			key,
			value
		}))
	}), writeMemoryCoreWorkspaceEntries({
		namespace: DREAMING_SESSION_INGESTION_SEEN_NAMESPACE,
		workspaceDir,
		entries: seenEntries
	})];
	try {
		await Promise.all(writes);
	} finally {
		await Promise.allSettled(writes);
	}
}
//#endregion
export { normalizeMemoryDay as a, readDailyIngestionState as c, writeSessionIngestionState as d, normalizeDailyIngestionState as i, readSessionIngestionState as l, SESSION_INGESTION_MAX_TRACKED_MESSAGES_PER_SESSION as n, normalizeSessionIngestionState as o, compareDailyMemoryFilesByNewestDay as r, parseDailyMemoryFileName as s, DAILY_MEMORY_FILENAME_RE as t, writeDailyIngestionState as u };
