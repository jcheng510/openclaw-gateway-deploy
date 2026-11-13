import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { i as truncateWithMarker } from "./utf16-slice-D_ngcYKd.mjs";
import "./fs-safe-CHQXnCPk.mjs";
import "./redact-CYYx6Qjc.mjs";
import "./path-guards-CH7noY0Z.mjs";
import "./errors-YPvSaqwO.mjs";
import "./proxy-env-DxV5eJIK.mjs";
import "./ssrf-D9VemJFV.mjs";
import "./private-file-store-DM0i141q.mjs";
import { a as wrapExternalContent } from "./external-content-CmQTCbqd.mjs";
import "./dm-policy-shared-BV1FjVP9.mjs";
import "./ports-GYhwG94t.mjs";
import "./file-access-runtime-ClDR2VUS.mjs";
import { pathScope as pathScope$1, resolveExistingPathsWithinRoot, resolveStrictExistingPathsWithinRoot, sanitizeUntrustedFileName as sanitizeUntrustedFileName$1 } from "@openclaw/fs-safe/advanced";
import { movePathWithCopyFallback as movePathWithCopyFallback$1, replaceFileAtomic as replaceFileAtomic$1 } from "@openclaw/fs-safe/atomic";
//#region src/security/channel-metadata.ts
const DEFAULT_MAX_CHARS = 800;
const DEFAULT_MAX_ENTRY_CHARS = 400;
function normalizeEntry(entry) {
	return entry.replace(/\s+/g, " ").trim();
}
function truncateText(value, maxChars) {
	if (maxChars <= 0) return "";
	return truncateWithMarker(value, maxChars, {
		marker: "...",
		reserve: 3,
		trimEnd: true
	});
}
/**
* Build bounded, externally wrapped channel metadata for prompt context.
* Channel-provided labels can be user-controlled, so keep the result externally wrapped.
*/
function buildChannelMetadata(params) {
	const cleaned = params.entries.map((entry) => typeof entry === "string" ? normalizeEntry(entry) : "").filter((entry) => Boolean(entry)).map((entry) => truncateText(entry, DEFAULT_MAX_ENTRY_CHARS));
	const deduped = uniqueStrings(cleaned);
	if (deduped.length === 0) return;
	const body = deduped.join("\n");
	const truncated = truncateText(`${`Channel metadata (${params.source})`}\n${`${params.label}:\n${body}`}`, params.maxChars ?? DEFAULT_MAX_CHARS);
	return wrapExternalContent(truncated, {
		source: "channel_metadata",
		includeWarning: false
	});
}
/** @deprecated Use buildChannelMetadata. Removal: after 2026-09-08 (see sdk-untrusted-context-identifier-aliases). */
const buildUntrustedChannelMetadata = buildChannelMetadata;
//#endregion
export { resolveStrictExistingPathsWithinRoot as a, buildUntrustedChannelMetadata as c, resolveExistingPathsWithinRoot as i, pathScope$1 as n, sanitizeUntrustedFileName$1 as o, replaceFileAtomic$1 as r, buildChannelMetadata as s, movePathWithCopyFallback$1 as t };
