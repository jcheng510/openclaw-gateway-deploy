import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { j as resolveIntegerOption } from "./number-coercion-Dq1l5muL.mjs";
import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { p as normalizeTrimmedStringList } from "./string-normalization-YMwDjufr.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { t as bindGatewayContextResolver } from "./gateway-context-binding-VqB7gkMe.mjs";
import "./gateway-request-scope-Da9jAC9_.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./io-B18HRL9J.mjs";
import { u as resolveGatewayOperatorRoleActor } from "./operator-role-policy-Cx-TzI2k.mjs";
import { n as captureGatewayOperatorRunAuthority } from "./operator-run-authority-CZcmYuYn.mjs";
import { t as ToolAuthorizationError } from "./tool-input-error-mjW74R8m.mjs";
import { o as buildHistoryContext } from "./history-mAfsnQBJ.mjs";
import { R as extractTextFromChatContent } from "./user-facing-text-BaKj5H4e.mjs";
import { o as hasNonzeroUsage, u as normalizeUsage } from "./usage-DDsrNSO2.mjs";
import { n as readAgentRunTerminalOutcome } from "./agent-run-terminal-outcome-BOQC0T2X.mjs";
import { c as normalizeMimeList, l as resolveInputFileLimits, n as DEFAULT_INPUT_IMAGE_MIMES } from "./input-files-CXUGXPvQ.mjs";
import { t as createSyntheticPluginRuntimeClient } from "./server-plugin-runtime-client-Ba4mX9xx.mjs";
import { t as createDefaultDeps } from "./deps-DDJuVwX7.mjs";
import { n as agentCommandFromGatewayIngress } from "./agent-command-DUhFGJSr.mjs";
import "./agent-CwYoGxCC.mjs";
import { u as sendJson } from "./http-common-mSENR2Yd.mjs";
import { n as GATEWAY_UPLOADS_DISABLED_MESSAGE, r as areGatewayUploadsEnabled, t as GATEWAY_UPLOADS_DISABLED_CODE } from "./upload-policy-D2eRzQeB.mjs";
import { STREAM_ERROR_FALLBACK_TEXT } from "@openclaw/ai/internal/shared";
//#region src/gateway/agent-prompt.ts
function renderConversationToolCall(call) {
	return `tool_call id=${call.id ?? ""} name=${call.name} arguments=${call.arguments}`;
}
const IMAGE_ONLY_USER_MESSAGE = "User sent image(s) with no text.";
/** Normalize content-array bodies and omit provenance-marked stream-error placeholders. */
function toPromptBody(entry) {
	const raw = entry.entry.body;
	const body = typeof raw === "string" ? raw : extractTextFromChatContent(raw) ?? "";
	return entry.role === "assistant" && entry.internalStreamError === true && body.trim() === STREAM_ERROR_FALLBACK_TEXT ? null : body;
}
/** Build the prompt text sent to an agent from ordered conversation entries. */
function buildAgentMessageFromConversationEntries(entries) {
	let currentIndex = entries.findLastIndex((entry) => entry?.role === "user" || entry?.role === "tool");
	if (currentIndex < 0) currentIndex = entries.length - 1;
	const currentConversationEntry = entries[currentIndex];
	const currentEntry = currentConversationEntry?.entry;
	if (!currentConversationEntry || !currentEntry) return "";
	const historyLines = [];
	for (let index = 0; index < currentIndex; index += 1) {
		const entry = entries[index];
		const body = toPromptBody(entry);
		if (body !== null) historyLines.push(`${entry.entry.sender}: ${body}`);
	}
	const currentBody = toPromptBody(currentConversationEntry);
	if (currentBody === null) return "";
	if (historyLines.length === 0 && currentConversationEntry.role !== "tool") return currentBody;
	return buildHistoryContext({
		historyText: historyLines.join("\n"),
		currentMessage: `${currentEntry.sender}: ${currentBody}`
	});
}
//#endregion
//#region src/gateway/http-upload-policy.ts
/** Recheck the current client-upload policy before HTTP media preparation and dispatch. */
function rejectDisabledGatewayUpload(res, hasMedia) {
	if (!hasMedia || areGatewayUploadsEnabled(getRuntimeConfig())) return false;
	sendJson(res, 403, { error: {
		message: GATEWAY_UPLOADS_DISABLED_MESSAGE,
		type: "forbidden",
		code: GATEWAY_UPLOADS_DISABLED_CODE
	} });
	return true;
}
//#endregion
//#region src/gateway/openai-agent-run-usage.ts
/** Shared agent-run usage selection for OpenAI-compatible Gateway endpoints. */
/** Prefer a nonzero aggregate snapshot, then the latest model-call snapshot. */
function resolveAgentRunUsage(result) {
	const agentMeta = result?.meta?.agentMeta;
	const aggregate = normalizeUsage(agentMeta?.usage);
	if (hasNonzeroUsage(aggregate)) return aggregate;
	const lastCall = normalizeUsage(agentMeta?.lastCallUsage);
	if (hasNonzeroUsage(lastCall)) return lastCall;
	return aggregate ?? lastCall;
}
//#endregion
//#region src/gateway/openai-compatible-agent-run.ts
function readOpenAiHttpRunTerminal(result) {
	const meta = asOptionalRecord(asOptionalRecord(result)?.meta);
	const stopReasonRaw = meta?.stopReason;
	const stopReason = typeof stopReasonRaw === "string" ? stopReasonRaw : void 0;
	const pendingRaw = meta?.pendingToolCalls;
	const pendingToolCalls = Array.isArray(pendingRaw) ? pendingRaw.flatMap((call) => {
		const record = asOptionalRecord(call);
		const id = typeof record?.id === "string" ? record.id.trim() : "";
		const name = typeof record?.name === "string" ? record.name.trim() : "";
		const argsValue = record?.arguments;
		const argumentsValue = typeof argsValue === "string" ? argsValue : argsValue == null ? "" : JSON.stringify(argsValue);
		return id && name ? [{
			id,
			name,
			arguments: argumentsValue
		}] : [];
	}) : void 0;
	return {
		runFailed: readAgentRunTerminalOutcome(result) === "failed",
		stopReason,
		pendingToolCalls
	};
}
async function runOpenAiCompatibleAgentCommand(params) {
	params.abortSignal?.throwIfAborted();
	let admitted = false;
	const assertSourceCurrent = () => {
		if (!admitted && params.hasClientUploads && !areGatewayUploadsEnabled(getRuntimeConfig())) throw new ToolAuthorizationError(GATEWAY_UPLOADS_DISABLED_MESSAGE);
		if (!admitted && params.hasCurrentClientAuthority?.() === false) throw new ToolAuthorizationError("Gateway requester authority changed");
	};
	assertSourceCurrent();
	const client = createSyntheticPluginRuntimeClient({
		authenticatedUserProfile: params.requestAuth.authenticatedUserProfile,
		operatorRoleActor: params.requestAuth.operatorRoleActor,
		scopes: [...params.operatorScopes]
	});
	const operator = resolveGatewayOperatorRoleActor(client)?.kind === "operator";
	const gatewayContext = operator ? params.resolveGatewayContext?.() : void 0;
	if (operator && !gatewayContext) throw new Error("OpenAI-compatible operator execution requires a current Gateway context.");
	const captured = gatewayContext ? await captureGatewayOperatorRunAuthority({
		client,
		context: {
			getRuntimeConfig: gatewayContext.getRuntimeConfig,
			getCommittedRuntimeConfig: gatewayContext.getCommittedRuntimeConfig,
			resolveGatewayContext: params.resolveGatewayContext
		},
		sourceAuthority: params.requestAuth.operatorAccessAuthority
	}) : void 0;
	try {
		assertSourceCurrent();
		captured?.authority.assertCurrent();
		const sourceSignal = captured?.authority.signal;
		const abortSignal = params.abortSignal && sourceSignal ? AbortSignal.any([params.abortSignal, sourceSignal]) : params.abortSignal ?? sourceSignal;
		abortSignal?.throwIfAborted();
		const result = await agentCommandFromGatewayIngress({
			message: params.message,
			images: params.images?.length ? params.images : void 0,
			clientTools: params.clientTools?.length ? params.clientTools : void 0,
			extraSystemPrompt: params.extraSystemPrompt || void 0,
			model: params.modelOverride,
			streamParams: params.streamParams,
			sessionKey: params.sessionKey,
			runId: params.runId,
			deliver: false,
			messageChannel: params.messageChannel,
			senderIsOwner: params.senderIsOwner,
			bestEffortDeliver: false,
			allowModelOverride: params.modelOverride !== void 0,
			abortSignal,
			operatorAuthority: captured?.authority,
			assertSourceCurrent,
			onAdmittedRunContext: (context) => {
				assertSourceCurrent();
				bindGatewayContextResolver(context, params.resolveGatewayContext);
				admitted = true;
			}
		}, defaultRuntime, createDefaultDeps(), {});
		captured?.authority.assertCurrent();
		return result;
	} finally {
		captured?.release();
	}
}
//#endregion
//#region src/gateway/input-allowlist.ts
/**
* Normalize optional gateway URL-input hostname allowlists.
*
* Semantics are intentionally:
* - missing / empty / whitespace-only list => no hostname allowlist restriction
* - deny-all URL fetching => use the corresponding `allowUrl: false` switch
*/
function normalizeInputHostnameAllowlist(values) {
	if (!values || values.length === 0) return;
	const normalized = normalizeTrimmedStringList(values);
	return normalized.length > 0 ? normalized : void 0;
}
//#endregion
//#region src/gateway/openai-compatible-input-limits.ts
const DEFAULT_OPENAI_CHAT_COMPLETIONS_BODY_BYTES = 20971520;
const DEFAULT_OPENAI_MAX_IMAGE_PARTS = 8;
const DEFAULT_OPENAI_MAX_TOTAL_IMAGE_BYTES = 20971520;
function resolveOpenAiChatCompletionsLimits(config) {
	const imageConfig = config?.images;
	return {
		maxBodyBytes: DEFAULT_OPENAI_CHAT_COMPLETIONS_BODY_BYTES,
		maxImageParts: DEFAULT_OPENAI_MAX_IMAGE_PARTS,
		maxTotalImageBytes: DEFAULT_OPENAI_MAX_TOTAL_IMAGE_BYTES,
		images: {
			allowUrl: imageConfig?.allowUrl ?? false,
			urlAllowlist: normalizeInputHostnameAllowlist(imageConfig?.urlAllowlist),
			allowedMimes: normalizeMimeList(imageConfig?.allowedMimes, DEFAULT_INPUT_IMAGE_MIMES),
			maxBytes: imageConfig?.maxBytes ?? 10485760,
			maxRedirects: imageConfig?.maxRedirects ?? 3,
			timeoutMs: imageConfig?.timeoutMs ?? 1e4
		}
	};
}
const DEFAULT_BODY_BYTES = 20971520;
const DEFAULT_MAX_URL_PARTS = 8;
function resolveResponsesLimits(config) {
	const files = config?.files;
	const images = config?.images;
	const fileLimits = resolveInputFileLimits(files);
	return {
		maxBodyBytes: DEFAULT_BODY_BYTES,
		maxUrlParts: resolveIntegerOption(config?.maxUrlParts, DEFAULT_MAX_URL_PARTS, { min: 0 }),
		files: {
			...fileLimits,
			urlAllowlist: normalizeInputHostnameAllowlist(files?.urlAllowlist)
		},
		images: {
			allowUrl: images?.allowUrl ?? true,
			urlAllowlist: normalizeInputHostnameAllowlist(images?.urlAllowlist),
			allowedMimes: normalizeMimeList(images?.allowedMimes, DEFAULT_INPUT_IMAGE_MIMES),
			maxBytes: images?.maxBytes ?? 10485760,
			maxRedirects: images?.maxRedirects ?? 3,
			timeoutMs: images?.timeoutMs ?? 1e4
		}
	};
}
//#endregion
//#region src/gateway/openai-tool-choice.ts
function resolveChatToolChoice(toolChoice) {
	if (toolChoice == null || toolChoice === "auto") return;
	if (toolChoice === "none") return "none";
	if (toolChoice === "required") return { type: "required" };
	const choice = asOptionalRecord(toolChoice);
	if (!choice) throw new Error("tool_choice must be a string or object");
	const choiceType = choice.type;
	if (choiceType === "function") {
		const targetName = normalizeOptionalString(asOptionalRecord(choice.function)?.name);
		if (!targetName) throw new Error("tool_choice.function.name is required");
		return {
			type: "function",
			name: targetName
		};
	}
	if (typeof choiceType !== "string") throw new Error("unsupported tool_choice type");
	throw new Error(`tool_choice ${choiceType} is not supported`);
}
function resolveResponsesToolChoice(toolChoice) {
	if (!toolChoice) return;
	if (toolChoice === "none") return "none";
	if (toolChoice === "required") return { type: "required" };
	if (typeof toolChoice === "object" && toolChoice.type === "function") {
		const targetName = ("name" in toolChoice ? toolChoice.name : toolChoice.function.name).trim();
		if (!targetName) throw new Error("tool_choice.name is required");
		return {
			type: "function",
			name: targetName
		};
	}
}
function applyToolChoice(tools, choice) {
	if (!choice) return { tools };
	if (choice === "none") return { tools: [] };
	const selectedTools = choice.type === "function" ? tools.filter((tool) => tool.function.name === choice.name) : tools;
	if (selectedTools.length === 0) throw new Error(choice.type === "function" ? `tool_choice requested unknown tool: ${choice.name}` : "tool_choice=required but no tools were provided");
	return {
		tools: selectedTools,
		extraSystemPrompt: choice.type === "function" ? `You must call the ${choice.name} tool before responding.` : "You must call one of the available tools before responding.",
		constraint: choice
	};
}
function isToolChoiceConstraintSatisfied(params) {
	const { constraint, pendingToolCalls } = params;
	if (!constraint) return true;
	return Boolean(pendingToolCalls?.length && (constraint.type === "required" || pendingToolCalls.some((call) => call.name === constraint.name)));
}
function resolveUnsatisfiedToolChoiceMessage(constraint) {
	return constraint.type === "function" ? `tool_choice required a ${constraint.name} tool call, but the agent did not produce one` : "tool_choice=required was not satisfied by the agent response";
}
//#endregion
export { resolveUnsatisfiedToolChoiceMessage as a, readOpenAiHttpRunTerminal as c, rejectDisabledGatewayUpload as d, IMAGE_ONLY_USER_MESSAGE as f, resolveResponsesToolChoice as i, runOpenAiCompatibleAgentCommand as l, renderConversationToolCall as m, isToolChoiceConstraintSatisfied as n, resolveOpenAiChatCompletionsLimits as o, buildAgentMessageFromConversationEntries as p, resolveChatToolChoice as r, resolveResponsesLimits as s, applyToolChoice as t, resolveAgentRunUsage as u };
