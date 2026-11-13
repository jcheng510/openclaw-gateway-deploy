//#region src/agents/subagents/registry/subagent-run-generation.ts
function normalizeGeneration(entry) {
	return typeof entry.generation === "number" && Number.isFinite(entry.generation) ? entry.generation : 0;
}
/** Orders runs that share a child session, including legacy rows without a generation. */
function compareSubagentRunGeneration(left, right) {
	const generationDelta = normalizeGeneration(left) - normalizeGeneration(right);
	if (generationDelta !== 0) return generationDelta;
	const createdAtDelta = left.createdAt - right.createdAt;
	if (createdAtDelta !== 0) return createdAtDelta;
	return left.runId.localeCompare(right.runId);
}
/** Keeps the newest generation at the grouping key prepared by the caller. */
function recordLatestSubagentRun(map, key, entry) {
	const existing = map.get(key);
	if (!existing || compareSubagentRunGeneration(entry, existing) > 0) map.set(key, entry);
}
/** Selects the newest matching generation from an existing group. */
function latestSubagentRun(runs, matches) {
	let latest;
	for (const entry of runs) if ((!matches || matches(entry)) && (!latest || compareSubagentRunGeneration(entry, latest) > 0)) latest = entry;
	return latest;
}
/** Allocates a durable monotonic generation within one child session. */
function nextSubagentRunGeneration(runs, childSessionKey) {
	let generation = 0;
	for (const entry of runs) if (entry.childSessionKey === childSessionKey) generation = Math.max(generation, normalizeGeneration(entry));
	return generation + 1;
}
//#endregion
export { recordLatestSubagentRun as i, latestSubagentRun as n, nextSubagentRunGeneration as r, compareSubagentRunGeneration as t };
