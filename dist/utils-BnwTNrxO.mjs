import { s as resolveProviderThinkingLevel } from "./thinking-hj_KWR0q.mjs";
//#region src/agents/embedded-agent-runner/utils.ts
/**
* Small shared normalization helpers for embedded-agent runner settings.
*/
function normalizeContextTokenBudget(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : void 0;
}
/** Converts logical product modes into provider-facing effort values. */
function mapThinkingLevelForProvider(level, model) {
	return resolveProviderThinkingLevel({
		provider: model.provider,
		model: model.id,
		catalog: [model],
		agentRuntime: "openclaw",
		level
	});
}
function mapThinkingLevel(providerLevel) {
	if (!providerLevel) return "off";
	if (providerLevel === "adaptive") return "high";
	return providerLevel;
}
//#endregion
export { mapThinkingLevelForProvider as n, normalizeContextTokenBudget as r, mapThinkingLevel as t };
