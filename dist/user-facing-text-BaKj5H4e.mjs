import { o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import "./src-SskUVPJG.mjs";
import { t as stableStringify } from "./stable-stringify-CkQ0IEj1.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { A as formatRawAssistantErrorForUi, D as extractLeadingHttpStatus, E as extractErrorHttpStatus, F as parseApiErrorInfo, I as parseApiErrorPayload, M as isCloudflareOrHtmlErrorPage, N as isGenericProviderInternalError, T as MALFORMED_STREAMING_FRAGMENT_ERROR_MESSAGE, j as formatTransportErrorCopy } from "./redact-CYYx6Qjc.mjs";
import { t as escapeRegExp } from "./regexp-BZyMFTlj.mjs";
import { n as formatCommandErrorForUser } from "./command-error-DUhFKi3T.mjs";
import { i as OPENCLAW_RUNTIME_CONTEXT_NOTICE, n as INTERNAL_RUNTIME_CONTEXT_END, p as stripInternalRuntimeContext, t as INTERNAL_RUNTIME_CONTEXT_BEGIN } from "./internal-runtime-context-CLIwiurx.mjs";
import { l as isProviderCompletedErrorFinishReasonMessage, s as isPeriodicUsageLimitErrorMessage } from "./message-patterns-yTrz0EZT.mjs";
import { i as isAgentHarnessPreflightError } from "./errors-Bd6GQRkh.mjs";
import { a as isInsideCode, o as stripLinesOutsideCode, r as findCodeRegions } from "./code-regions-CjBR1D_6.mjs";
import { a as duplicateParagraphTextFilter, o as leadingEmptyLinesTextFilter, t as applyTextFilters } from "./text-projection-CNGD_ARQ.mjs";
import { _ as stripFinalTags, a as plainToolCallTextFilter, i as minimaxToolCallTextFilter, p as toolCallXmlTextFilter, r as legacyBracketToolCallTextFilter, t as assistantTraceTextFilter } from "./assistant-visible-text-B6pwaO0P.mjs";
import "./history-mAfsnQBJ.mjs";
import { i as stripInboundMetadata, t as INBOUND_METADATA_MARKERS } from "./strip-inbound-meta-CRySRUKv.mjs";
import { t as classifyFailoverReasonCore } from "./classify-core-CgEi3jxh.mjs";
import { a as renderFormatErrorCopy, t as ERROR_PREFIX_RE } from "./assistant-request-failure-copy--HTs1v1S.mjs";
//#region src/shared/chat-content.ts
/** Coerces arbitrary provider content values into displayable text without throwing. */
function coerceChatContentText(value) {
	if (typeof value === "string") return value;
	if (value == null) return "";
	if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || typeof value === "symbol") return String(value);
	if (typeof value === "object") try {
		return JSON.stringify(value) ?? "";
	} catch {
		return "";
	}
	return "";
}
/** Extracts normalized plain text from string content or OpenAI-style text blocks. */
function extractTextFromChatContent(content, opts) {
	const normalize = opts?.normalizeText ?? ((text) => text.replace(/\s+/g, " ").trim());
	const joinWith = opts?.joinWith ?? " ";
	const sanitize = (text) => {
		const raw = coerceChatContentText(text);
		return opts?.sanitizeText ? opts.sanitizeText(raw) : raw;
	};
	if (typeof content === "string") {
		const normalized = normalize(sanitize(content));
		return normalized ? normalized : null;
	}
	if (!Array.isArray(content)) return null;
	const chunks = [];
	for (const block of content) {
		if (!block || typeof block !== "object") continue;
		if (block.type !== "text") continue;
		const text = block.text;
		const value = sanitize(text);
		if (value.trim()) chunks.push(value);
	}
	const joined = normalize(chunks.join(joinWith));
	return joined ? joined : null;
}
//#endregion
//#region src/agents/bash-tools.exec-output.ts
const EXEC_NO_OUTPUT_PLACEHOLDER = "(no output)";
const EXEC_TIMEOUT_RETRY_GUIDANCE = "The command was terminated, but external side effects may already have completed. Verify the resulting state before retrying. Do not automatically rerun non-idempotent commands. Use a higher timeout only when the command is known to be safe to retry.";
const EXEC_RETENTION_CAP_NOTE = "[earlier output was discarded at the retention cap and cannot be recovered]\n\n";
/** Render command output with a stable placeholder for empty output. */
function renderExecOutputText(value) {
	return value || "(no output)";
}
/** Render the authoritative process exit without inventing a successful code. */
function renderExecExitLabel(exit) {
	if (exit.exitSignal != null) return `signal ${exit.exitSignal}`;
	return typeof exit.exitCode === "number" ? `code ${exit.exitCode}` : "unknown exit code";
}
/** Render the text shown in exec progress updates, including warnings first. */
function renderExecUpdateText(params) {
	return (params.warnings.length ? `${params.warnings.join("\n")}\n\n` : "") + renderExecOutputText(params.tailText);
}
/** Add retry-safety guidance only for supervisor timeout exits. */
function appendExecTimeoutRetryGuidance(text, exitReason) {
	if (exitReason !== "overall-timeout" && exitReason !== "no-output-timeout") return text;
	return `${text}\n\n${EXEC_TIMEOUT_RETRY_GUIDANCE}`;
}
//#endregion
//#region src/agents/embedded-agent-helpers/sanitize-user-facing-text.ts
/** Strips internal scaffolding from text before user-facing delivery. */
const TOOL_CALLS_OMITTED_PLACEHOLDER_LINE_RE = /^[ \t]*\[tool calls omitted\][ \t]*$/i;
function stripInternalPlaceholderLines(text) {
	if (!text.toLowerCase().includes("[tool calls omitted]") && !text.includes("(no output)")) return text;
	return stripLinesOutsideCode(text, (line) => TOOL_CALLS_OMITTED_PLACEHOLDER_LINE_RE.test(line) || line.trim() === "(no output)");
}
const MARKDOWN_LINE_PREFIX = "[ \\t]*(?:(?:>|[-+*](?=[ \\t])|#{1,6}(?=[ \\t])|\\d{1,9}[.)](?=[ \\t]))[ \\t]*)*";
function hasConversationContextMarker(text) {
	return text.includes("[Chat messages since your last reply - for context]") || text.includes("[Recent chat messages - for context]") || text.includes("[Current message - respond to this]");
}
function prepareVerifiedConversationContext(source) {
	if (!source || !hasConversationContextMarker(source)) return;
	const sourceCodeRegions = findCodeRegions(source);
	if (![
		"[Chat messages since your last reply - for context]",
		"[Recent chat messages - for context]",
		"[Current message - respond to this]"
	].some((marker) => {
		let markerOffset = source.indexOf(marker);
		while (markerOffset !== -1) {
			const markerEnd = markerOffset + marker.length;
			const startsLine = markerOffset === 0 || source[markerOffset - 1] === "\n";
			const endsLine = markerEnd === source.length || source[markerEnd] === "\n" || source[markerEnd] === "\r";
			if (startsLine && endsLine && !isInsideCode(markerOffset, sourceCodeRegions)) return true;
			markerOffset = source.indexOf(marker, markerEnd);
		}
		return false;
	})) return;
	return { normalizedSource: source.replace(/\r\n?/gu, "\n") };
}
function stripVerifiedConversationContext(text, context, streaming = false) {
	if (!context) return text;
	const { normalizedSource } = context;
	let result = text;
	if (hasConversationContextMarker(text)) {
		if (!context.copiedPrompt) {
			const promptPattern = (context.sourceLines ??= normalizedSource.split("\n")).map(escapeRegExp).join(`(?:\\r\\n?|\\n)${MARKDOWN_LINE_PREFIX}`);
			context.copiedPrompt = new RegExp(`(?:^${MARKDOWN_LINE_PREFIX})?${promptPattern}`, "gmu");
		}
		result = text.replace(context.copiedPrompt, "");
	}
	if (!streaming) return result;
	const sourceStart = normalizedSource.charAt(0);
	const firstSourceLine = context.firstSourceLine ??= normalizedSource.split("\n", 1)[0] ?? normalizedSource;
	const completedSourceStart = result.indexOf(firstSourceLine);
	const searchStart = completedSourceStart === -1 ? Math.max(0, result.length - normalizedSource.length * 2) : completedSourceStart;
	const markdownWrapper = context.markdownWrapper ??= new RegExp(`^${MARKDOWN_LINE_PREFIX}$`, "u");
	const incompleteMarkdownWrapper = context.incompleteMarkdownWrapper ??= new RegExp(`^${MARKDOWN_LINE_PREFIX}(?:[-+*]|#{1,6}|\\d{1,9}[.)]?)?$`, "u");
	let candidateStart = result.indexOf(sourceStart, searchStart);
	let completedCandidates = 0;
	while (candidateStart !== -1) {
		if (!(result.length - candidateStart >= firstSourceLine.length ? result.startsWith(firstSourceLine, candidateStart) : firstSourceLine.startsWith(result.slice(candidateStart)))) {
			candidateStart = result.indexOf(sourceStart, candidateStart + 1);
			continue;
		}
		if (++completedCandidates > 16) return result.slice(0, searchStart);
		const suffix = result.slice(candidateStart).replace(/\r\n?/gu, "\n");
		const sourceLines = context.sourceLines ??= normalizedSource.split("\n");
		let lineIndex = 0;
		const unwrappedSuffix = suffix.replace(/\n([^\n]*)/gu, (_match, line) => {
			const sourceLine = sourceLines[++lineIndex];
			if (sourceLine === void 0) return `\n${line}`;
			if (!sourceLine) return incompleteMarkdownWrapper.test(line) ? "\n" : `\n${line}`;
			const sourceLineStart = sourceLine.charAt(0);
			let contentStart = line.indexOf(sourceLineStart);
			while (contentStart !== -1) {
				const content = line.slice(contentStart);
				if (sourceLine.startsWith(content) && markdownWrapper.test(line.slice(0, contentStart))) return `\n${content}`;
				contentStart = line.indexOf(sourceLineStart, contentStart + 1);
			}
			return incompleteMarkdownWrapper.test(line) ? "\n" : `\n${line}`;
		});
		if (suffix.length < normalizedSource.length && normalizedSource.startsWith(suffix) || unwrappedSuffix.length < normalizedSource.length && normalizedSource.startsWith(unwrappedSuffix)) return result.slice(0, candidateStart);
		candidateStart = result.indexOf(sourceStart, candidateStart + 1);
	}
	return result;
}
function createVerifiedConversationContextStreamFilter(getConversationContext) {
	let accumulatedText = "";
	let releasedText = "";
	let conversationContextSource;
	let preparedConversationContext;
	return (delta) => {
		accumulatedText += delta;
		const conversationContext = getConversationContext?.();
		const sourceChanged = conversationContext !== conversationContextSource;
		if (sourceChanged) {
			preparedConversationContext = prepareVerifiedConversationContext(conversationContext?.trim());
			conversationContextSource = conversationContext;
		}
		const safeText = stripVerifiedConversationContext(accumulatedText, preparedConversationContext, true);
		if (releasedText === null || (sourceChanged || preparedConversationContext) && !safeText.startsWith(releasedText)) {
			releasedText = null;
			return "";
		}
		const newlySafeText = safeText.slice(releasedText.length);
		releasedText = safeText;
		return newlySafeText;
	};
}
const userFacingFilters = {};
function userFacingTextFilters(errorContext = false, streaming = false) {
	const key = `${errorContext ? "error" : "normal"}${streaming ? "-stream" : ""}`;
	return userFacingFilters[key] ??= [
		{
			transform: stripFinalTags,
			activationTokens: ["<"]
		},
		{
			transform: streaming ? (text) => stripInternalRuntimeContext(text, { streaming: true }) : stripInternalRuntimeContext,
			activationTokens: [
				streaming ? "<" : INTERNAL_RUNTIME_CONTEXT_BEGIN,
				INTERNAL_RUNTIME_CONTEXT_END,
				OPENCLAW_RUNTIME_CONTEXT_NOTICE
			]
		},
		{
			transform: stripInboundMetadata,
			activationTokens: INBOUND_METADATA_MARKERS
		},
		minimaxToolCallTextFilter,
		toolCallXmlTextFilter({ stripFunctionCallsXmlPayloads: true }),
		{
			transform: stripInternalPlaceholderLines,
			activationTokens: [EXEC_NO_OUTPUT_PLACEHOLDER, "[tool calls omitted]"]
		},
		...errorContext ? [assistantTraceTextFilter] : [],
		legacyBracketToolCallTextFilter,
		plainToolCallTextFilter,
		leadingEmptyLinesTextFilter,
		duplicateParagraphTextFilter
	];
}
function sanitizeUserFacingText(text, opts) {
	const raw = coerceChatContentText(text);
	if (!raw) return raw;
	const conversationContext = opts?.conversationContext?.trim();
	const withoutConversationContext = conversationContext && (opts?.streaming || hasConversationContextMarker(raw)) ? stripVerifiedConversationContext(raw, prepareVerifiedConversationContext(conversationContext), opts?.streaming) : raw;
	return applyTextFilters(withoutConversationContext, userFacingTextFilters(opts?.errorContext, opts?.streaming));
}
//#endregion
//#region src/agents/exec-approval-result.ts
/**
* Parses exec approval tool output and formats denial messages for users.
*/
const EXEC_COMPLETED_RE = /^exec completed:\s*([\s\S]*)$/i;
const APPROVAL_METADATA_SOURCE_RE = /^(?:gateway\s+id=|node=)/i;
function parseExecApprovalResultWithMetadata(raw, prefix, bodySeparator) {
	const normalizedRaw = normalizeLowercaseStringOrEmpty(raw);
	const normalizedPrefix = normalizeLowercaseStringOrEmpty(prefix);
	if (!normalizedRaw.startsWith(normalizedPrefix)) return null;
	const metadataStart = prefix.length;
	let depth = 1;
	let metadataEnd = -1;
	for (let index = metadataStart; index < raw.length; index += 1) {
		const char = raw[index];
		if (char === "(") {
			depth += 1;
			continue;
		}
		if (char === ")") {
			depth -= 1;
			if (depth === 0) {
				metadataEnd = index;
				break;
			}
		}
	}
	if (metadataEnd < 0) return null;
	const metadata = raw.slice(metadataStart, metadataEnd).trim();
	if (!APPROVAL_METADATA_SOURCE_RE.test(metadata)) return null;
	const remainder = raw.slice(metadataEnd + 1);
	if (bodySeparator === ":") {
		if (!remainder.startsWith(":")) return null;
		return {
			metadata,
			body: remainder.slice(1).trim()
		};
	}
	if (remainder && !remainder.startsWith("\n")) return null;
	return {
		metadata,
		body: remainder.startsWith("\n") ? remainder.slice(1).trim() : ""
	};
}
function parseExecApprovalResultText(resultText) {
	const raw = resultText.trim();
	if (!raw) return {
		kind: "other",
		raw
	};
	for (const [kind, prefix, separator] of [
		[
			"denied",
			"Exec denied (",
			":"
		],
		[
			"finished",
			"Exec finished (",
			"\n"
		],
		[
			"outcome-unknown",
			"Exec outcome unknown (",
			"\n"
		],
		[
			"not-dispatched",
			"Exec not dispatched (",
			"\n"
		]
	]) {
		const result = parseExecApprovalResultWithMetadata(raw, prefix, separator);
		if (result) return {
			kind,
			raw,
			...result
		};
	}
	const completedMatch = EXEC_COMPLETED_RE.exec(raw);
	if (completedMatch) return {
		kind: "completed",
		raw,
		body: completedMatch[1]?.trim() ?? ""
	};
	return {
		kind: "other",
		raw
	};
}
function isExecDeniedResultText(resultText) {
	return parseExecApprovalResultText(resultText).kind === "denied";
}
function formatExecDeniedUserMessage(resultText) {
	const parsed = parseExecApprovalResultText(resultText);
	if (parsed.kind !== "denied") return null;
	const metadata = normalizeLowercaseStringOrEmpty(parsed.metadata);
	if (metadata.includes("approval-timeout")) return "Command did not run: approval timed out.";
	if (metadata.includes("user-denied")) return "Command did not run: approval was denied.";
	if (metadata.includes("allowlist-miss")) return "Command did not run: approval is required.";
	if (metadata.includes("approval-request-failed")) return "Command did not run: approval request failed.";
	return "Command did not run.";
}
//#endregion
//#region src/agents/failover/request-error-facets.ts
/** Classify copy-sensitive provider-request facts that are finer than FailoverReason. */
function classifyProviderRequestFacets(signal) {
	const message = signal.message ?? "";
	const lower = normalizeLowercaseStringOrEmpty(message);
	const genericProviderError = lower.includes("an error occurred while processing your request") || lower.includes("something went wrong while processing your request");
	const providerInternal503 = signal.status === 503 || /\b(?:(?:unexpected\s+status|http)\s*503|503\s+service unavailable)\b|["'](?:status|code)["']\s*:\s*503\b/iu.test(message);
	if (genericProviderError && (signal.status === 429 || /\b(?:http\s*)?429\b|["'](?:status|code)["']\s*:\s*429\b/iu.test(message))) return "quota-429";
	if (isProviderConversationStateError(lower)) return "conversation-state";
	if (providerInternal503) return "provider-internal-503";
	return lower.includes("the ai service returned an internal error") || lower.includes("provider returned an internal error") || genericProviderError && (lower.includes("server_error") || lower.includes("internal error")) ? "provider-internal" : null;
}
function isProviderConversationStateError(lower) {
	return lower.includes("custom tool call output is missing") && lower.includes("call id") || lower.includes("toolresult") && lower.includes("tooluse") && lower.includes("exceeds the number") && lower.includes("previous turn") || lower.includes("tool_use") && lower.includes("tool_result") && lower.includes("without") || lower.includes("function call turn comes immediately after") || lower.includes("incorrect role information") || lower.includes("roles must alternate") || lower.includes("invalid_replay_transcript");
}
//#endregion
//#region src/agents/failover/user-copy.ts
const RATE_LIMIT_ERROR_USER_MESSAGE = "⚠️ API rate limit reached. Please try again later.";
const AUTH_INVALID_TOKEN_USER_TEXT = "Authentication failed (provider returned HTTP 401). Your provider token may have expired — try the request again in a moment. If the failure persists, re-authenticate this provider.";
const SELECTED_AUTH_PROFILE_UNAVAILABLE_USER_TEXT = "The selected auth profile is unavailable in this agent's OpenClaw credential store. Import or migrate that credential into the agent, select another configured profile, or run `openclaw configure`, then retry.";
const renderFailoverCodeUserCopy = (code) => code === "selected_auth_profile_unavailable" ? SELECTED_AUTH_PROFILE_UNAVAILABLE_USER_TEXT : void 0;
const MODEL_CAPACITY_ERROR_USER_MESSAGE = "⚠️ Selected model is at capacity. Try a different model, or wait and retry.";
const OVERLOADED_ERROR_USER_MESSAGE = "The AI service is temporarily overloaded. Please try again in a moment.";
const RATE_LIMIT_RETRY_MESSAGE = "⚠️ The model request was rate-limited. Please try again in a few minutes.";
const MODEL_CAPACITY_ERROR_RE = /\b(?:selected\s+)?model\s+(?:is\s+)?at capacity\b/i;
const RATE_LIMIT_SPECIFIC_HINT_RE = /\bmin(ute)?s?\b|\bhours?\b|\bseconds?\b|\btry again in\b|\bresets?\b|\bplan\b|\bquota\b/i;
const CONTEXT_OVERFLOW_ERROR_HEAD_RE = /^(?:context overflow:|request_too_large\b|request size exceeds\b|request exceeds the maximum size\b|context length exceeded\b|maximum context length\b|prompt is too long\b|exceeds model context window\b)/i;
const NON_ERROR_PROVIDER_PAYLOAD_MAX_LENGTH = 16384;
const NON_ERROR_PROVIDER_PAYLOAD_PREFIX_RE = /^codex\s*error(?:\s+\d{3})?[:\s-]+/i;
/** Format billing copy with optional provider/model and credential context. */
function formatBillingErrorMessage(provider, model, authMode) {
	const providerName = provider?.trim();
	const modelName = model?.trim();
	const providerLabel = providerName && modelName ? `${providerName} (${modelName})` : providerName || void 0;
	if (authMode === "oauth" || authMode === "token") return providerLabel ? `⚠️ ${providerLabel} returned a billing error — check your account for subscription or usage limits, then try again.` : "⚠️ API provider returned a billing error — check your account for subscription or usage limits, then try again.";
	return providerLabel ? `⚠️ ${providerLabel} returned a billing error — your API key has run out of credits or has an insufficient balance. Check your ${providerName} billing dashboard and top up or switch to a different API key.` : "⚠️ API provider returned a billing error — your API key has run out of credits or has an insufficient balance. Check your provider's billing dashboard and top up or switch to a different API key.";
}
const BILLING_ERROR_USER_MESSAGE = formatBillingErrorMessage();
function extractProviderRateLimitMessage(raw) {
	const withoutPrefix = raw.replace(ERROR_PREFIX_RE, "").trim();
	const candidate = (parseApiErrorInfo(raw) ?? parseApiErrorInfo(withoutPrefix))?.message ?? (extractLeadingHttpStatus(withoutPrefix)?.rest || withoutPrefix);
	if (!candidate || !RATE_LIMIT_SPECIFIC_HINT_RE.test(candidate)) return;
	if (isCloudflareOrHtmlErrorPage(withoutPrefix)) return;
	const trimmed = candidate.trim();
	if (trimmed.length > 300 || trimmed.startsWith("{") || /^(?:<!doctype\s+html\b|<html\b)/i.test(trimmed)) return;
	return `⚠️ ${trimmed}`;
}
function renderRateLimitBaseCopy(context) {
	const raw = context.raw ?? "";
	if (MODEL_CAPACITY_ERROR_RE.test(raw)) return MODEL_CAPACITY_ERROR_USER_MESSAGE;
	return extractProviderRateLimitMessage(raw) ?? RATE_LIMIT_ERROR_USER_MESSAGE;
}
const FAILOVER_REASON_BASE_COPY = {
	auth: () => AUTH_INVALID_TOKEN_USER_TEXT,
	auth_permanent: () => AUTH_INVALID_TOKEN_USER_TEXT,
	format: (context) => renderFormatErrorCopy(context.raw ?? ""),
	rate_limit: renderRateLimitBaseCopy,
	overloaded: (context) => MODEL_CAPACITY_ERROR_RE.test(context.raw ?? "") ? MODEL_CAPACITY_ERROR_USER_MESSAGE : OVERLOADED_ERROR_USER_MESSAGE,
	billing: (context) => formatBillingErrorMessage(context.provider, context.model, context.authMode),
	server_error: () => "LLM request failed: provider returned an internal error.",
	timeout: () => "LLM request timed out.",
	tls_certificate: () => "LLM request failed: TLS certificate validation rejected the provider endpoint. Check the endpoint hostname, proxy, and local certificate trust.",
	context_overflow: () => "Context overflow: prompt too large for the model. Try /reset (or /new) to start a fresh session, or use a larger-context model.",
	model_not_found: () => "The selected model was not found by the provider. Check the model id or choose a different model.",
	session_expired: () => "The provider session expired. Start a new session and try again.",
	empty_response: () => "The model returned an empty response. Please try again.",
	no_error_details: () => "LLM request failed with an unknown error.",
	unclassified: () => "LLM request failed.",
	unknown: () => "LLM request failed with an unknown error."
};
/** Render rate-limit versus overload copy from the canonical classified reason. */
function renderRateLimitOrOverloadedCopy(params) {
	return FAILOVER_REASON_BASE_COPY[params.reason]({ raw: params.raw });
}
function formatDiskSpaceErrorCopy(raw) {
	const lower = normalizeLowercaseStringOrEmpty(raw);
	return /\benospc\b/i.test(raw) || lower.includes("no space left on device") || lower.includes("disk full") ? "OpenClaw could not write local session data because the disk is full. Free some disk space and try again." : void 0;
}
function isInvalidStreamingEventOrderError(raw) {
	const lower = normalizeLowercaseStringOrEmpty(raw);
	return lower.includes("unexpected event order") && lower.includes("message_start") && lower.includes("message_stop");
}
function isStreamingJsonParseError(raw) {
	return raw.trim() === MALFORMED_STREAMING_FRAGMENT_ERROR_MESSAGE;
}
function getApiErrorPayloadFingerprint(raw) {
	if (!raw) return null;
	const payload = parseApiErrorPayload(raw);
	return payload ? stableStringify(payload) : null;
}
function isRawApiErrorPayload(raw) {
	return getApiErrorPayloadFingerprint(raw) !== null;
}
/** Recognize provider HTTP/HTML failures from canonical classification facts. */
function isLikelyHttpErrorText(raw) {
	if (isCloudflareOrHtmlErrorPage(raw)) return true;
	const status = extractLeadingHttpStatus(raw);
	return Boolean(status && status.code >= 400 && (classifyFailoverReasonCore(raw) !== null || classifyProviderRequestFacets({
		status: status.code,
		message: raw
	}) !== null));
}
function shouldRewriteRawPayloadWithoutErrorContext(raw) {
	if (raw.length > NON_ERROR_PROVIDER_PAYLOAD_MAX_LENGTH || !NON_ERROR_PROVIDER_PAYLOAD_PREFIX_RE.test(raw)) return false;
	const info = parseApiErrorInfo(raw);
	if (normalizeLowercaseStringOrEmpty(info?.type).endsWith("_error")) return true;
	const code = Number(info?.httpCode);
	return Number.isFinite(code) && code >= 400;
}
/** Sanitize presentation text, then render error copy from classified facts when requested. */
function renderSanitizedUserFacingText(sanitized, opts) {
	if (!sanitized) return sanitized;
	const trimmed = sanitized.trim();
	if (!opts?.errorContext) return shouldRewriteRawPayloadWithoutErrorContext(trimmed) ? formatRawAssistantErrorForUi(trimmed) : sanitized;
	const commandError = formatCommandErrorForUser(trimmed);
	if (commandError) return commandError;
	const execDenied = formatExecDeniedUserMessage(trimmed);
	if (execDenied) return execDenied;
	const diskSpace = formatDiskSpaceErrorCopy(trimmed);
	if (diskSpace) return diskSpace;
	if (/incorrect role information|roles must alternate/i.test(trimmed)) return "Message ordering conflict - please try again. If this persists, use /new to start a fresh session.";
	const reason = classifyFailoverReasonCore(trimmed);
	const status = extractLeadingHttpStatus(trimmed);
	const rawPayload = isRawApiErrorPayload(trimmed);
	if (reason === "context_overflow" && (rawPayload || status && status.code >= 400 || ERROR_PREFIX_RE.test(trimmed) || CONTEXT_OVERFLOW_ERROR_HEAD_RE.test(trimmed))) return FAILOVER_REASON_BASE_COPY.context_overflow();
	if (reason === "billing" || reason === "rate_limit" || reason === "overloaded") return FAILOVER_REASON_BASE_COPY[reason]({ raw: trimmed });
	const providerRequestCode = resolveProviderRequestFailureCode({
		classification: reason ? {
			kind: "reason",
			reason
		} : null,
		facet: null,
		status: extractErrorHttpStatus(trimmed)?.code
	});
	if (providerRequestCode) return PROVIDER_REQUEST_COPY[providerRequestCode];
	if (isGenericProviderInternalError(trimmed)) return formatRawAssistantErrorForUi(trimmed);
	if (isInvalidStreamingEventOrderError(trimmed)) return "LLM request failed: provider returned an invalid streaming response. Please try again.";
	if (rawPayload || status && status.code >= 400 && reason) return formatRawAssistantErrorForUi(trimmed);
	if (isStreamingJsonParseError(trimmed)) return "LLM streaming response contained a malformed fragment. Please try again.";
	if (ERROR_PREFIX_RE.test(trimmed)) {
		const transport = formatTransportErrorCopy(trimmed);
		if (transport) return transport;
		if (isProviderCompletedErrorFinishReasonMessage(trimmed)) return formatRawAssistantErrorForUi(trimmed);
		if (reason === "timeout") return FAILOVER_REASON_BASE_COPY.timeout();
		return formatRawAssistantErrorForUi(trimmed);
	}
	return sanitized;
}
const GENERIC_EXTERNAL_RUN_FAILURE_TEXT = "⚠️ Something went wrong while processing your request. Please try again, or use /new to start a fresh session.";
const HEARTBEAT_FAILURE_LEAD = "⚠️ Heartbeat check failed before it could produce an update";
const HEARTBEAT_FAILURE_TAIL = "The main chat session remains available.";
const HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT = `${HEARTBEAT_FAILURE_LEAD}. ${HEARTBEAT_FAILURE_TAIL}`;
/** `reason` is the failure-reply owner's already sanitized and capped detail. */
function renderHeartbeatRunFailureCopy(reason) {
	if (!reason) return HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT;
	const terminator = /[.!?]$/u.test(reason) ? "" : ".";
	return `${HEARTBEAT_FAILURE_LEAD}: ${reason}${terminator} ${HEARTBEAT_FAILURE_TAIL}`;
}
const PROVIDER_CONVERSATION_STATE_ERROR_USER_MESSAGE = "⚠️ The model provider rejected the conversation state. Please try again, or use /new to start a fresh session.";
const PROVIDER_REQUEST_COPY = {
	provider_authentication_error: `⚠️ ${AUTH_INVALID_TOKEN_USER_TEXT}`,
	provider_conversation_state_error: PROVIDER_CONVERSATION_STATE_ERROR_USER_MESSAGE,
	provider_internal_error: "⚠️ The model provider returned a temporary internal error before replying. Try again in a moment, or switch to another model if it keeps happening.",
	provider_model_unavailable: "⚠️ The selected model is unavailable from the provider — it may have been renamed, retired, or is not offered on this account. Select an available model or update the model configuration, then try again.",
	provider_rate_limit_or_quota_error: "⚠️ The model provider returned HTTP 429 before replying. This can mean rate limiting, exhausted quota, or an account balance/billing issue. Check the selected provider/model, API key, and provider billing/quota dashboard, then try again."
};
function resolveProviderRequestFailureCode(params) {
	const reason = params.classification?.kind === "reason" ? params.classification.reason : void 0;
	if (reason === "auth" && params.status === 401) return "provider_authentication_error";
	if (reason === "model_not_found") return "provider_model_unavailable";
	switch (params.facet) {
		case "quota-429": return "provider_rate_limit_or_quota_error";
		case "conversation-state": return "provider_conversation_state_error";
		case "provider-internal":
		case "provider-internal-503": return "provider_internal_error";
		default: return;
	}
}
function resolveProviderRequestFailureCopy(params) {
	const code = resolveProviderRequestFailureCode(params);
	if (!code) return;
	return {
		code,
		userMessage: PROVIDER_REQUEST_COPY[code],
		technicalMessage: params.technicalMessage
	};
}
function extractCodexUsageLimitErrorMessage(attempts, directMessage, directReason, directProvider, sanitizeText) {
	const text = attempts.find((candidate) => candidate.provider === "openai" && candidate.reason === "rate_limit" && candidate.error)?.error ?? (directProvider === "openai" && directReason === "rate_limit" ? directMessage : void 0);
	if (!text) return;
	const message = renderSanitizedUserFacingText(sanitizeText?.(text) ?? text, { errorContext: true }).split(/\r?\n/u).map((line) => line.trim()).filter(Boolean).join(" ").trim();
	if (!message) return;
	const truncated = message.length > 500 ? `${truncateUtf16Safe(message, 497)}...` : message;
	return truncated.startsWith("⚠️") ? truncated : `⚠️ ${truncated}`;
}
/** Render the reply surface's rate-limit copy, including structured cooldown context. */
function renderRateLimitReplyCopy(params) {
	const attempts = params.attempts ?? [];
	const usageLimit = extractCodexUsageLimitErrorMessage(attempts, params.message, params.reason, params.provider, params.sanitizeText);
	if (usageLimit) return usageLimit;
	if (attempts.some((attempt) => attempt.reason === "billing") || params.reason === "billing") return BILLING_ERROR_USER_MESSAGE;
	if (attempts.length === 0) {
		if (params.reason === "rate_limit" && isPeriodicUsageLimitErrorMessage(params.message)) {
			const providerMessage = renderSanitizedUserFacingText(params.sanitizeText?.(params.message) ?? params.message, { errorContext: true });
			return providerMessage.startsWith("⚠️") ? providerMessage : `⚠️ ${providerMessage}`;
		}
		return RATE_LIMIT_RETRY_MESSAGE;
	}
	const expiry = params.cooldownExpiry;
	const nowMs = params.nowMs ?? Date.now();
	if (typeof expiry === "number" && expiry > nowMs) {
		const secsLeft = Math.max(1, Math.ceil((expiry - nowMs) / 1e3));
		return secsLeft <= 60 ? `⚠️ Rate-limited — ready in ~${secsLeft}s. Please wait a moment.` : `⚠️ Rate-limited — ready in ~${Math.ceil(secsLeft / 60)} min. Please try again shortly.`;
	}
	return new Set(attempts.map((attempt) => `${attempt.provider}/${attempt.model}`)).size > 1 && attempts.every((attempt) => attempt.reason === "rate_limit" || attempt.reason === "overloaded") ? "⚠️ All attempted models were rate-limited or overloaded. Please try again in a few minutes." : RATE_LIMIT_RETRY_MESSAGE;
}
function renderBillingReplyCopy(params) {
	const attempts = params.attempts ?? [];
	const billingFailure = attempts.length > 0 ? attempts.find((attempt) => attempt.reason === "billing" && (attempt.authMode === "oauth" || attempt.authMode === "token")) : params.authMode === "oauth" || params.authMode === "token" ? params : void 0;
	return billingFailure ? formatBillingErrorMessage(billingFailure.provider, billingFailure.model, billingFailure.authMode) : BILLING_ERROR_USER_MESSAGE;
}
const SAFE_MISSING_API_KEY_PROVIDERS = /* @__PURE__ */ new Set([
	"anthropic",
	"google",
	"openai"
]);
function renderMissingApiKeyReplyCopy(params) {
	const provider = params?.provider.trim().toLowerCase();
	if (!provider) return null;
	if (provider === "openai" && params?.providerGuidance) return "⚠️ Missing API key for OpenAI on the gateway. Use `openai/gpt-6-astra` with the OpenAI OAuth profile, or set `OPENAI_API_KEY` for direct OpenAI API-key runs.";
	if (provider === "openai") return "⚠️ Missing API key for provider \"openai\". Run `openclaw doctor --fix` to repair stale OpenAI model/session routes, restart the gateway if doctor asks, then try again. If doctor has nothing to repair or the error persists, re-auth with `openclaw models auth login --provider openai` or run `openclaw configure`.";
	return SAFE_MISSING_API_KEY_PROVIDERS.has(provider) ? `⚠️ Missing API key for provider "${provider}". Configure the gateway auth for that provider, then try again.` : "⚠️ Missing API key for the selected provider on the gateway. Configure provider auth, then try again.";
}
const CLI_BACKEND_NO_OUTPUT_STALL_RE = /\bCLI produced no output for\s+(\d+)\s*s\s+and was terminated\b/iu;
const CLI_BACKEND_OVERALL_TIMEOUT_RE = /\bCLI exceeded timeout\s*\(\s*(\d+)\s*s\s*\)\s+and was terminated\b/iu;
const CLI_BACKEND_ROUTING_REF_BEFORE_ERROR_RE = /\b([\w.-]+\/[A-Za-z][\w.-]*)\s*:\s*CLI\b/iu;
function renderCliTimeoutReplyCopy(params) {
	const stall = params.message.match(CLI_BACKEND_NO_OUTPUT_STALL_RE);
	const overall = params.message.match(CLI_BACKEND_OVERALL_TIMEOUT_RE);
	const timeout = params.cliTimeout;
	const seconds = timeout?.timeoutSeconds ?? Number((stall ?? overall)?.[1]);
	if (!Number.isFinite(seconds)) return null;
	const routedModelRef = params.message.match(CLI_BACKEND_ROUTING_REF_BEFORE_ERROR_RE)?.[1];
	const routingSuffix = routedModelRef ? ` (routing ${routedModelRef})` : "";
	const mode = timeout?.mode ?? (stall ? "no-output" : "overall");
	const stoppedWork = [];
	if (timeout?.backgroundTaskCount) stoppedWork.push(`${timeout.backgroundTaskCount} CLI background ${timeout.backgroundTaskCount === 1 ? "task" : "tasks"}`);
	if (timeout?.activeToolCount) stoppedWork.push(`${timeout.activeToolCount} active CLI tool ${timeout.activeToolCount === 1 ? "call" : "calls"}`);
	let workStatus = stoppedWork.length > 0 ? ` It also stopped ${stoppedWork.join(" and ")}; that work shares the parent CLI process. Effects may be partial; check before retrying.` : timeout?.observedActivity ? " The CLI had already begun work, so effects may be partial; check before retrying." : "";
	if (params.replayPrevented) workStatus += " OpenClaw did not replay this turn automatically.";
	return mode === "no-output" ? `⚠️ CLI subprocess${routingSuffix}: no output for ${seconds}s, so the no-output watchdog stopped it. This is separate from the overall agent timeout; the gateway is unaffected.${workStatus} Check for an interactive prompt. The CLI backend ${params.provider ?? "<id>"} produced no output before its watchdog expired.` : `⚠️ CLI turn${routingSuffix}: timed out after ${seconds}s (overall turn limit). The gateway is unaffected.${workStatus} For long work, use a detached OpenClaw sub-agent (no run timeout by default), or raise \`agents.defaults.timeoutSeconds\`.`;
}
const authProfileUnavailableCopy = (provider) => `Couldn't reach ${provider} with any of your saved logins right now.`;
const AUTH_PROFILE_COOLDOWN_COPY = {
	auth: (provider) => `Couldn't sign in to ${provider}. Your saved login looks expired or no longer works.`,
	auth_permanent: (provider) => `${provider} isn't accepting your saved login anymore.`,
	format: authProfileUnavailableCopy,
	rate_limit: (provider) => `${provider} is asking us to slow down. Please wait a moment before trying again.`,
	overloaded: (provider) => `${provider} is overloaded right now. Please wait a moment before trying again.`,
	billing: (provider) => `${provider} rejected the request — looks like a billing issue on the account.`,
	server_error: (provider) => `${provider} is having issues right now. Please wait a moment before trying again.`,
	timeout: (provider) => `${provider} hasn't been responding. Please wait a moment before trying again.`,
	tls_certificate: authProfileUnavailableCopy,
	context_overflow: authProfileUnavailableCopy,
	model_not_found: (provider) => `${provider} can't find the model you're using right now.`,
	session_expired: (provider) => `Couldn't sign in to ${provider}. Your saved login looks expired or no longer works.`,
	empty_response: authProfileUnavailableCopy,
	no_error_details: authProfileUnavailableCopy,
	unclassified: authProfileUnavailableCopy,
	unknown: authProfileUnavailableCopy
};
const AUTH_PROFILE_DIRECT_COPY = {
	auth: AUTH_PROFILE_COOLDOWN_COPY.auth,
	auth_permanent: (provider) => `${provider} isn't accepting your saved login.`,
	billing: AUTH_PROFILE_COOLDOWN_COPY.billing,
	session_expired: AUTH_PROFILE_COOLDOWN_COPY.session_expired
};
const AUTH_PROFILE_RECOVERY_REASONS = /* @__PURE__ */ new Set([
	"auth",
	"auth_permanent",
	"billing",
	"context_overflow",
	"session_expired",
	"empty_response",
	"no_error_details",
	"unclassified",
	"unknown"
]);
function renderAuthProfileFailoverCopy(params) {
	const description = params.allInCooldown ? AUTH_PROFILE_COOLDOWN_COPY[params.reason](params.provider) : AUTH_PROFILE_DIRECT_COPY[params.reason]?.(params.provider);
	if (!description) return params.causeText?.trim() || authProfileUnavailableCopy(params.provider);
	const hint = AUTH_PROFILE_RECOVERY_REASONS.has(params.reason) ? params.recoveryHint : null;
	const causeText = params.causeText?.trim() ?? "";
	const suffix = causeText && !description.includes(causeText) ? ` (${causeText})` : "";
	return `${[description, hint].filter(Boolean).join(" ")}${suffix}`;
}
const CONTROL_UI_LOG_HINT = "To view logs, run `openclaw logs --follow` in a terminal.";
function renderControlUiAgentFailureCopy(errorText) {
	return `⚠️ Agent failed before reply: ${errorText.trim().replace(/\.\s*$/, "")}.\n${CONTROL_UI_LOG_HINT}`;
}
function replaceGenericExternalRunFailureText(text) {
	const start = text.indexOf(GENERIC_EXTERNAL_RUN_FAILURE_TEXT);
	if (start < 0 || text.slice(start + 110).trim()) return {
		text,
		replaced: false
	};
	const prefix = text.slice(0, start).trimEnd();
	return {
		text: prefix ? `${prefix} ${HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT}` : HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT,
		replaced: true
	};
}
//#endregion
//#region src/agents/embedded-agent-helpers/user-facing-text.ts
/** Compose internal-text stripping with the canonical failover copy renderer. */
function renderUserFacingText(text, opts) {
	return renderSanitizedUserFacingText(sanitizeUserFacingText(text, opts), opts);
}
/** Only an explicit preflight copy can replace private diagnostic detail. */
function renderAgentHarnessPreflightUserMessage(error) {
	if (!isAgentHarnessPreflightError(error) || error.userMessage === void 0) return;
	return renderUserFacingText(error.userMessage, { errorContext: true });
}
//#endregion
export { sanitizeUserFacingText as A, replaceGenericExternalRunFailureText as C, isExecDeniedResultText as D, formatExecDeniedUserMessage as E, renderExecOutputText as F, renderExecUpdateText as I, coerceChatContentText as L, EXEC_RETENTION_CAP_NOTE as M, appendExecTimeoutRetryGuidance as N, parseExecApprovalResultText as O, renderExecExitLabel as P, extractTextFromChatContent as R, renderRateLimitReplyCopy as S, classifyProviderRequestFacets as T, renderControlUiAgentFailureCopy as _, HEARTBEAT_EXTERNAL_RUN_FAILURE_TEXT as a, renderMissingApiKeyReplyCopy as b, formatDiskSpaceErrorCopy as c, isLikelyHttpErrorText as d, isRawApiErrorPayload as f, renderCliTimeoutReplyCopy as g, renderBillingReplyCopy as h, GENERIC_EXTERNAL_RUN_FAILURE_TEXT as i, userFacingTextFilters as j, createVerifiedConversationContextStreamFilter as k, getApiErrorPayloadFingerprint as l, renderAuthProfileFailoverCopy as m, renderUserFacingText as n, PROVIDER_CONVERSATION_STATE_ERROR_USER_MESSAGE as o, isStreamingJsonParseError as p, AUTH_INVALID_TOKEN_USER_TEXT as r, formatBillingErrorMessage as s, renderAgentHarnessPreflightUserMessage as t, isInvalidStreamingEventOrderError as u, renderFailoverCodeUserCopy as v, resolveProviderRequestFailureCopy as w, renderRateLimitOrOverloadedCopy as x, renderHeartbeatRunFailureCopy as y };
