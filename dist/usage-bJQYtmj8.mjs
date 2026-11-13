import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { m as readProviderJsonResponse } from "./provider-http-errors-CHqz_jlf.mjs";
import { r as clampPercent, t as PROVIDER_LABELS } from "./provider-usage.shared-B61KyZAE.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import { s as buildCopilotIdeHeaders } from "./copilot-dynamic-headers-C8eJEO7a.mjs";
import "./provider-http-DqHHwWjj.mjs";
import "./provider-auth-Q_FDaGt7.mjs";
import "./provider-usage-tR845NjB.mjs";
import { n as buildUsageHttpErrorSnapshot, r as fetchJson } from "./provider-usage.fetch.shared-pcmi5D-H.mjs";
import { t as PUBLIC_GITHUB_COPILOT_DOMAIN } from "./domain-BVQmabjd.mjs";
//#region extensions/github-copilot/usage.ts
async function fetchCopilotUsage(token, timeoutMs, fetchFn, githubDomain = PUBLIC_GITHUB_COPILOT_DOMAIN) {
	const res = await fetchJson(`https://api.${githubDomain}/copilot_internal/user`, { headers: {
		Authorization: `token ${token}`,
		...buildCopilotIdeHeaders({ includeApiVersion: true })
	} }, timeoutMs, fetchFn);
	if (!res.ok) {
		await res.body?.cancel().catch(() => void 0);
		return buildUsageHttpErrorSnapshot({
			provider: "github-copilot",
			status: res.status
		});
	}
	const payload = await readProviderJsonResponse(res, "github-copilot-usage");
	const data = isRecord(payload) ? payload : {};
	const windows = [];
	for (const [key, label] of [["premium_interactions", "Premium"], ["chat", "Chat"]]) {
		const quota = data.quota_snapshots?.[key];
		if (quota) windows.push({
			label,
			usedPercent: clampPercent(100 - (quota.percent_remaining ?? 0))
		});
	}
	return {
		provider: "github-copilot",
		displayName: PROVIDER_LABELS["github-copilot"],
		windows,
		plan: data.copilot_plan
	};
}
//#endregion
export { fetchCopilotUsage as t };
