import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { o as providerUsageLabel, r as clampPercent } from "./provider-usage.shared-B61KyZAE.mjs";
import { i as fetchUsageJson } from "./provider-usage.fetch.shared-pcmi5D-H.mjs";
//#region src/infra/provider-usage.fetch.gemini.ts
async function fetchGeminiUsage(token, timeoutMs, fetchFn, provider) {
	const parsed = await fetchUsageJson({
		provider,
		url: "https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuota",
		init: {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: "{}"
		},
		timeoutMs,
		fetchFn
	});
	if (!parsed.ok) return parsed.snapshot;
	const buckets = isRecord(parsed.data) && Array.isArray(parsed.data.buckets) ? parsed.data.buckets : [];
	const windows = [];
	const families = [{
		label: "Pro",
		match: "pro",
		remaining: 1,
		found: false
	}, {
		label: "Flash",
		match: "flash",
		remaining: 1,
		found: false
	}];
	for (const bucket of buckets) {
		if (!isRecord(bucket)) continue;
		const model = typeof bucket.modelId === "string" ? bucket.modelId : "unknown";
		const frac = typeof bucket.remainingFraction === "number" ? bucket.remainingFraction : 1;
		const lower = normalizeLowercaseStringOrEmpty(model);
		for (const family of families) if (lower.includes(family.match)) {
			family.found = true;
			if (frac < family.remaining) family.remaining = frac;
		}
	}
	for (const family of families) if (family.found) windows.push({
		label: family.label,
		usedPercent: clampPercent((1 - family.remaining) * 100)
	});
	return {
		provider,
		displayName: expectDefined(providerUsageLabel(provider), "gemini provider usage label"),
		windows
	};
}
//#endregion
export { fetchGeminiUsage };
