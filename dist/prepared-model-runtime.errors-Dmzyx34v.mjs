import { k as PluginInstanceUnavailableError } from "./plugin-cache-DK2CPN_y.mjs";
//#region src/agents/prepared-model-runtime.errors.ts
var PreparedModelRuntimeOwnerNotPublishedError = class extends Error {};
var PreparedModelRuntimePublicationSupersededError = class extends PreparedModelRuntimeOwnerNotPublishedError {};
var PreparedModelRuntimePluginGenerationRetiredError = class extends Error {};
function isPreparedModelRuntimePluginLifecycleFailure(error) {
	return error instanceof PluginInstanceUnavailableError || error instanceof PreparedModelRuntimePluginGenerationRetiredError || error instanceof PreparedModelRuntimePublicationSupersededError;
}
function assertPreparedModelRuntimeInputCurrent(input, isCurrent) {
	if (isCurrent && !isCurrent()) throw new PreparedModelRuntimePublicationSupersededError(`prepared model runtime publication was superseded for ${input.agentDir}`);
}
function assertPreparedModelRuntimeCandidatesCurrent(candidates) {
	for (const candidate of candidates) assertPreparedModelRuntimeInputCurrent(candidate.input, candidate.isBuildCurrent);
}
//#endregion
export { assertPreparedModelRuntimeInputCurrent as a, assertPreparedModelRuntimeCandidatesCurrent as i, PreparedModelRuntimePluginGenerationRetiredError as n, isPreparedModelRuntimePluginLifecycleFailure as o, PreparedModelRuntimePublicationSupersededError as r, PreparedModelRuntimeOwnerNotPublishedError as t };
