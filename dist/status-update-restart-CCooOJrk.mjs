import { r as isAcknowledgedAbandonedUpdateRun } from "./update-run-record-BCEjJm1u.mjs";
import "./update-run-ledger-C5c7VrBu.mjs";
import { a as getUpdateRunAsync, i as getUpdateRun } from "./update-run-reader-DZIHUks3.mjs";
import { l as updateRunReportInputFromSentinel, o as renderUpdateRunReport } from "./update-run-report-CWzBmvi8.mjs";
import { t as readUpdateRunStatus } from "./update-run-status-C1yZyQgb.mjs";
//#region src/commands/status-update-restart.ts
function renderStatusReport(run) {
	const report = renderUpdateRunReport(run);
	const reconciled = isAcknowledgedAbandonedUpdateRun(run);
	const message = run.status === "failed" && !reconciled ? run.steps.filter((step) => step.status === "failed").flatMap((step) => step.failureFacts ?? []).find((fact) => fact.message)?.message : void 0;
	return {
		...report,
		reconciled,
		headline: message ? `${report.headline} ${message}` : report.headline
	};
}
function readReport(payload) {
	return renderStatusReport((payload.stats?.runId ? getUpdateRun(payload.stats.runId) : void 0) ?? updateRunReportInputFromSentinel(payload));
}
function formatUpdateRestartStatusValue(payload, opts = {}) {
	if (!payload || payload.kind !== "update") return null;
	return formatUpdateRestartReport(payload, readReport(payload), opts);
}
function formatUpdateRestartReport(payload, { headline, reconciled }, opts) {
	const format = reconciled ? opts.muted : payload.status === "error" ? opts.warn : payload.status === "ok" ? opts.ok : opts.muted;
	return format ? format(headline) : headline;
}
/** Keep recorded progress and history separate from the current installation's update check. */
async function buildStatusUpdateRows(payload, opts = {}) {
	const history = await readUpdateRunStatus();
	if ("runStatusError" in history) return [{
		Item: "Update run",
		Value: `Update run status unavailable: ${history.runStatusError}`
	}];
	const run = history.activeRun ?? history.lastRun;
	const rows = run ? [{
		Item: "Update run",
		Value: renderStatusReport(run).headline
	}] : [];
	if (history.runReconciliationError) rows.push({
		Item: "Update reconciliation",
		Value: `Update run reconciliation failed: ${history.runReconciliationError}`
	});
	for (const advisory of history.advisories ?? []) rows.push({
		Item: "Update advisory",
		Value: advisory.message
	});
	if (payload?.kind === "update" && (!run || payload.stats?.runId !== run.runId)) {
		const restart = formatUpdateRestartReport(payload, renderStatusReport((payload.stats?.runId ? await getUpdateRunAsync(payload.stats.runId) : void 0) ?? updateRunReportInputFromSentinel(payload)), opts);
		if (restart) rows.push({
			Item: "Update restart",
			Value: restart
		});
	}
	return rows;
}
function formatUpdateRestartActionLines(payload) {
	return payload?.kind === "update" ? readReport(payload).lines : [];
}
//#endregion
export { formatUpdateRestartActionLines as n, formatUpdateRestartStatusValue as r, buildStatusUpdateRows as t };
