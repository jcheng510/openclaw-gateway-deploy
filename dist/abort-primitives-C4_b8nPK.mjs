import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { n as resolveGlobalMap } from "./global-singleton-BfHBYj6Y.mjs";
import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import { r as normalizeCommandBody } from "./commands-registry-normalize-CvFDss4T.mjs";
import { n as normalizeAbortTriggerText, t as isAbortTrigger } from "./abort-trigger-text-lTiWnvSe.mjs";
//#region src/auto-reply/reply/abort-primitives.ts
const ABORT_MEMORY = resolveGlobalMap(Symbol.for("openclaw.abortMemory"), "close-and-restart");
const ABORT_MEMORY_MAX = 2e3;
function isAbortRequestText(text, options) {
	if (!text) return false;
	const normalized = normalizeCommandBody(text, options).trim();
	if (!normalized) return false;
	const normalizedLower = normalizeLowercaseStringOrEmpty(normalized);
	return normalizedLower === "/stop" || normalizeAbortTriggerText(normalizedLower) === "/stop" || isAbortTrigger(normalizedLower);
}
function getAbortMemory(key) {
	const normalized = key.trim();
	if (!normalized) return;
	return ABORT_MEMORY.get(normalized);
}
function setAbortMemory(key, value) {
	const normalized = key.trim();
	if (!normalized) return;
	if (!value) {
		ABORT_MEMORY.delete(normalized);
		return;
	}
	if (ABORT_MEMORY.has(normalized)) ABORT_MEMORY.delete(normalized);
	ABORT_MEMORY.set(normalized, true);
	pruneMapToMaxSize(ABORT_MEMORY, ABORT_MEMORY_MAX);
}
//#endregion
export { isAbortRequestText as n, setAbortMemory as r, getAbortMemory as t };
