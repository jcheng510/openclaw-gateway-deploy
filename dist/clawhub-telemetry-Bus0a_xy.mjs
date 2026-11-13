import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { a as isClawHubTelemetryDisabled, g as resolveClawHubAuthToken, n as createClawHubError, y as withClawHubResponse } from "./clawhub-client-jMrwU6Rk.mjs";
//#region src/infra/clawhub-telemetry.ts
async function reportClawHubInstallTelemetry(params, buildEvent) {
	const token = normalizeOptionalString(params.token) ?? await resolveClawHubAuthToken();
	if (!token || isClawHubTelemetryDisabled()) return;
	const json = buildEvent();
	if (!json) return;
	await withClawHubResponse({
		baseUrl: params.baseUrl,
		path: "/api/cli/telemetry/install",
		method: "POST",
		token,
		timeoutMs: params.timeoutMs,
		fetchImpl: params.fetchImpl,
		json
	}, async ({ response, url, hasToken }) => {
		if (!response.ok) throw await createClawHubError(response, url, hasToken, params.timeoutMs);
	});
}
//#endregion
export { reportClawHubInstallTelemetry as t };
