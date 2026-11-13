import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import { t as isBlockedObjectKey } from "./prototype-keys-CuYw53fZ.mjs";
import { r as normalizeAgentIdStrict } from "./agent-id-D1-Q6vR4.mjs";
//#region src/routing/account-id.ts
const DEFAULT_ACCOUNT_ID = "default";
const ACCOUNT_ID_CACHE_MAX = 512;
const normalizedAccountIdCache = /* @__PURE__ */ new Map();
function normalizeCanonicalAccountId(value) {
	const canonical = normalizeAgentIdStrict(value);
	return canonical.ok && !isBlockedObjectKey(canonical.value) ? canonical.value : void 0;
}
function resolveCachedCanonicalAccountId(value) {
	if (normalizedAccountIdCache.has(value)) return normalizedAccountIdCache.get(value);
	const normalized = normalizeCanonicalAccountId(value);
	normalizedAccountIdCache.set(value, normalized);
	pruneMapToMaxSize(normalizedAccountIdCache, ACCOUNT_ID_CACHE_MAX);
	return normalized;
}
function normalizeAccountId(value) {
	return normalizeOptionalAccountId(value) ?? "default";
}
function normalizeOptionalAccountId(value) {
	const trimmed = (value ?? "").trim();
	if (!trimmed) return;
	return resolveCachedCanonicalAccountId(trimmed);
}
//#endregion
export { normalizeAccountId as n, normalizeOptionalAccountId as r, DEFAULT_ACCOUNT_ID as t };
