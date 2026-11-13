import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { d as listSessionSqliteMigrationManifestPaths, p as readSessionSqliteMigrationManifest } from "./session-sqlite-migration-manifest-DKGkeF0m.mjs";
import { t as isSessionSqliteMigrationWarning } from "./session-sqlite-migration-issues-D9wJdaiX.mjs";
//#region src/commands/doctor-session-sqlite-warnings.ts
const HISTORICAL_WARNING_EXAMPLES = 5;
function formatSessionSqliteMigrationWarnings(targets, env = process.env) {
	return targets.flatMap((target) => {
		let historicalCount = 0;
		const warnings = target.issues.filter(isSessionSqliteMigrationWarning).flatMap((issue) => {
			if (issue.code === "historical_transcript_deferred" && ++historicalCount > HISTORICAL_WARNING_EXAMPLES) return [];
			return [`${target.storePath}: [${issue.code}] ${issue.message}`];
		});
		if (historicalCount > HISTORICAL_WARNING_EXAMPLES) warnings.unshift(`${target.storePath}: Deferred ${historicalCount} historical transcript claim(s); showing ${HISTORICAL_WARNING_EXAMPLES} example(s), ${historicalCount - HISTORICAL_WARNING_EXAMPLES} omitted. Available originals and migration manifests remain protected. Inspect all findings with "${formatCliCommand("openclaw doctor --session-sqlite dry-run --session-sqlite-all-agents --json", env)}".`);
		return warnings;
	});
}
/** Published updaters may predate the warning result channel; Doctor owns this durable report. */
function readSessionSqliteMigrationWarnings(env = process.env) {
	const warnings = [];
	const seen = /* @__PURE__ */ new Set();
	for (const manifestPath of listSessionSqliteMigrationManifestPaths(env)) {
		const manifest = readSessionSqliteMigrationManifest(manifestPath);
		if (!manifest?.completedAt) continue;
		for (const target of manifest.targets) {
			const key = JSON.stringify([
				target.agentId,
				target.storePath,
				target.sqlitePath
			]);
			if (seen.has(key)) continue;
			seen.add(key);
			warnings.push(...formatSessionSqliteMigrationWarnings([target], env));
		}
	}
	return warnings;
}
//#endregion
export { readSessionSqliteMigrationWarnings as n, formatSessionSqliteMigrationWarnings as t };
