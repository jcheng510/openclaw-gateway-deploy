import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import "./utils-DUAwk2p5.mjs";
import { i as parseModelCatalogRef } from "./model-catalog-refs-Dd-I0WMI.mjs";
import { D as withAgentRosterFactsBatch } from "./agent-scope-config-Dm6T00l4.mjs";
import { n as listAgentEntries } from "./agent-roster-B45JERT5.mjs";
import { t as splitTrailingAuthProfile } from "./model-ref-profile-BIKs-96s.mjs";
import { N as listModelRefsFromConfigValue } from "./runtime-snapshot-BHGp6OxI.mjs";
import { a as normalizeOptionalAgentRuntimeId, r as isDefaultAgentRuntimeId } from "./agent-runtime-id-D1H9nIYN.mjs";
import { r as resolveModelRuntimePolicy } from "./model-runtime-policy-CRKP2vdO.mjs";
import { t as resolveAgentHarnessPolicy } from "./policy-CR9PgpAw.mjs";
//#region src/agents/harness-runtimes.ts
/**
* Collects configured native harness runtime ids from model provider config.
*/
function isSelectablePluginRuntime(runtime) {
	return Boolean(runtime) && !isDefaultAgentRuntimeId(runtime) && normalizeOptionalAgentRuntimeId(runtime) !== "openclaw";
}
function parseConfiguredModelRef(value) {
	if (typeof value !== "string") return;
	return parseModelCatalogRef(value) ?? void 0;
}
function resolveConfiguredModelHarnessRuntime(params) {
	const parsed = parseConfiguredModelRef(params.modelRef);
	if (!parsed) return;
	const selection = params.modelRefKind === "selector" ? splitTrailingAuthProfile(params.modelRef) : void 0;
	const policyModel = selection?.profile ? parseConfiguredModelRef(selection.model) : parsed;
	if (!policyModel) return;
	const policyParams = {
		config: params.config,
		provider: parsed.provider,
		modelId: parsed.modelId,
		agentId: params.agentId
	};
	const configured = resolveModelRuntimePolicy({
		...policyParams,
		modelId: policyModel.modelId
	});
	const policy = resolveAgentHarnessPolicy(policyParams, configured);
	if (!params.includeImplicitRuntimePreferences && policy.runtimeSource === "implicit") return;
	const runtime = normalizeOptionalAgentRuntimeId(policy.runtime);
	return isSelectablePluginRuntime(runtime) ? runtime : void 0;
}
function pushConfiguredModelRuntimeIds(config, runtimes) {
	for (const providerConfig of Object.values(config.models?.providers ?? {})) {
		const providerRuntime = normalizeOptionalAgentRuntimeId(providerConfig?.agentRuntime?.id);
		if (isSelectablePluginRuntime(providerRuntime)) runtimes.add(providerRuntime);
		for (const modelConfig of providerConfig?.models ?? []) {
			const modelRuntime = normalizeOptionalAgentRuntimeId(modelConfig?.agentRuntime?.id);
			if (isSelectablePluginRuntime(modelRuntime)) runtimes.add(modelRuntime);
		}
	}
	const pushModelMapRuntimeIds = (models) => {
		if (!isRecord(models)) return;
		for (const entry of Object.values(models)) {
			if (!isRecord(entry)) continue;
			const runtime = normalizeOptionalAgentRuntimeId(isRecord(entry.agentRuntime) ? entry.agentRuntime.id : void 0);
			if (isSelectablePluginRuntime(runtime)) runtimes.add(runtime);
			for (const value of Array.isArray(entry.pickerRuntimes) ? entry.pickerRuntimes : []) {
				const pickerRuntime = normalizeOptionalAgentRuntimeId(value);
				if (isSelectablePluginRuntime(pickerRuntime)) runtimes.add(pickerRuntime);
			}
		}
	};
	pushModelMapRuntimeIds(config.agents?.defaults?.models);
	const agents = listAgentEntries(config);
	for (const agent of agents) pushModelMapRuntimeIds(isRecord(agent) ? agent.models : void 0);
}
function pushConfiguredAgentModelRuntimeIds(config, runtimes, includeImplicitRuntimePreferences) {
	const pushModelRefs = (modelRefs, modelRefKind, agentId) => {
		for (const modelRef of modelRefs) {
			const runtime = resolveConfiguredModelHarnessRuntime({
				config,
				includeImplicitRuntimePreferences,
				modelRef,
				modelRefKind,
				agentId
			});
			if (runtime) runtimes.add(runtime);
		}
	};
	const pushModelMapRefs = (models, agentId) => {
		if (!isRecord(models)) return;
		pushModelRefs(Object.keys(models), "literal", agentId);
	};
	const defaultsModel = config.agents?.defaults?.model;
	pushModelRefs(listModelRefsFromConfigValue(defaultsModel), "selector");
	pushModelMapRefs(config.agents?.defaults?.models);
	for (const agent of listAgentEntries(config)) {
		if (!isRecord(agent)) continue;
		const agentId = typeof agent.id === "string" ? agent.id : void 0;
		pushModelRefs(listModelRefsFromConfigValue(agent.model ?? defaultsModel), "selector", agentId);
		pushModelMapRefs(agent.models, agentId);
	}
}
/** Lists configured plugin harness runtime ids referenced by agent/model config. */
function collectConfiguredAgentHarnessRuntimes(config, options = {}) {
	return withAgentRosterFactsBatch(config, () => {
		const runtimes = /* @__PURE__ */ new Set();
		const includeImplicitRuntimePreferences = options.includeImplicitRuntimePreferences ?? true;
		pushConfiguredModelRuntimeIds(config, runtimes);
		pushConfiguredAgentModelRuntimeIds(config, runtimes, includeImplicitRuntimePreferences);
		return [...runtimes].toSorted((left, right) => left.localeCompare(right));
	});
}
//#endregion
export { resolveConfiguredModelHarnessRuntime as n, collectConfiguredAgentHarnessRuntimes as t };
