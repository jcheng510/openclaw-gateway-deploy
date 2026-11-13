import { o as getRuntimeConfigSnapshot } from "../../runtime-snapshot-BHGp6OxI.mjs";
import { t as jsonResult } from "../../tool-results-BCM3fdVS.mjs";
import { h as readToolStringParam } from "../../common-CnSoEQyp.mjs";
import "../../runtime-config-snapshot-DPPwvFCZ.mjs";
import "../../provider-web-search-BTNsybGu.mjs";
import { n as createCodeExecutionToolDefinition, t as buildMissingCodeExecutionApiKeyPayload } from "../../code-execution-tool-shared-CeAkKo1Y.mjs";
import { a as XAI_DEFAULT_MODEL_ID } from "../../model-definitions-CWn53fjP.mjs";
import { r as resolveXaiToolApiKeyWithAuth } from "../../tool-auth-shared-aR8eNsFy.mjs";
import { n as readPluginCodeExecutionConfig, r as resolveCodeExecutionEnabled, t as readCodeExecutionConfigRecord } from "../../code-execution-config-Dcp0KSwv.mjs";
import { a as requestXaiResponsesTool, i as XAI_RESPONSES_ENDPOINT, l as resolveXaiToolDefaultReasoningEffort, n as resolveNormalizedXaiToolModel, o as requireXaiResponseTextAndCitations, r as resolvePositiveIntegerToolConfig } from "../../tool-config-shared-CfrdtR-J.mjs";
//#region extensions/xai/src/code-execution-shared.ts
function resolveXaiCodeExecutionModel(config) {
	return resolveNormalizedXaiToolModel({
		config,
		defaultModel: XAI_DEFAULT_MODEL_ID
	});
}
function resolveXaiCodeExecutionMaxTurns(config) {
	return resolvePositiveIntegerToolConfig(config, "maxTurns");
}
async function requestXaiCodeExecution(params) {
	return await requestXaiResponsesTool({
		...params,
		endpoint: XAI_RESPONSES_ENDPOINT,
		inputText: params.task,
		tools: [{ type: "code_interpreter" }],
		reasoningEffort: resolveXaiToolDefaultReasoningEffort(params.model, "low"),
		errorLabel: "xAI code execution failed"
	}, (data) => {
		const { content, citations } = requireXaiResponseTextAndCitations(data, "xAI code execution failed");
		const outputTypes = Array.isArray(data.output) ? [...new Set(data.output.map((entry) => entry?.type).filter((value) => Boolean(value)))] : [];
		return {
			content,
			citations,
			usedCodeExecution: outputTypes.includes("code_interpreter_call"),
			outputTypes
		};
	});
}
//#endregion
//#region extensions/xai/code-execution.ts
function createCodeExecutionTool(options) {
	const runtimeConfig = options?.runtimeConfig ?? getRuntimeConfigSnapshot();
	const codeExecutionConfig = readPluginCodeExecutionConfig(runtimeConfig ?? void 0) ?? readPluginCodeExecutionConfig(options?.config);
	if (!resolveCodeExecutionEnabled({
		sourceConfig: options?.config,
		runtimeConfig: runtimeConfig ?? void 0,
		config: codeExecutionConfig,
		auth: options?.auth
	})) return null;
	return createCodeExecutionToolDefinition(async (_toolCallId, args) => {
		const apiKey = await resolveXaiToolApiKeyWithAuth({
			runtimeConfig: runtimeConfig ?? void 0,
			sourceConfig: options?.config,
			auth: options?.auth
		});
		if (!apiKey) return jsonResult(buildMissingCodeExecutionApiKeyPayload());
		const task = readToolStringParam(args, "task", { required: true });
		const codeExecutionConfigRecord = readCodeExecutionConfigRecord(codeExecutionConfig);
		const model = resolveXaiCodeExecutionModel(codeExecutionConfigRecord);
		const maxTurns = resolveXaiCodeExecutionMaxTurns(codeExecutionConfigRecord);
		const timeoutSeconds = typeof codeExecutionConfigRecord?.timeoutSeconds === "number" && Number.isFinite(codeExecutionConfigRecord.timeoutSeconds) ? codeExecutionConfigRecord.timeoutSeconds : 30;
		const startedAt = Date.now();
		const result = await requestXaiCodeExecution({
			apiKey,
			model,
			timeoutSeconds,
			maxTurns,
			task
		});
		return jsonResult({
			task,
			provider: "xai",
			model,
			tookMs: Date.now() - startedAt,
			...result
		});
	});
}
//#endregion
export { createCodeExecutionTool };
