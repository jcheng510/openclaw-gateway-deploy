import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { i as truncateWithMarker } from "./utf16-slice-D_ngcYKd.mjs";
import { a as escapeInternalRuntimeContextDelimiters, n as INTERNAL_RUNTIME_CONTEXT_END, t as INTERNAL_RUNTIME_CONTEXT_BEGIN } from "./internal-runtime-context-CLIwiurx.mjs";
import { t as normalizeChatType } from "./chat-type-Dw-QySg9.mjs";
import { t as deriveSessionChatTypeFromKey } from "./session-chat-type-shared-Buo9x_XW.mjs";
import { t as basenameFromAnyPath } from "./file-name-CKnWacTs.mjs";
import { r as sessionDeliveryOrigin } from "./delivery-context.read-CR06zOJ4.mjs";
import { a as annotateInterSessionPromptText } from "./input-provenance-v8gTqxPd.mjs";
import { i as resolveSourceReplyDeliveryMode } from "./source-reply-delivery-mode-e82qWm8O.mjs";
import { r as hasGeneratedMediaCompletionEvent } from "./internal-event-contract-pF6FHp8g.mjs";
import { m as getSubagentRunsForChildSession, v as subagentRuns } from "./subagent-run-liveness-CjqSkJZp.mjs";
import { n as sanitizeForPromptLiteral, r as wrapPromptDataBlock } from "./sanitize-for-prompt-bzCyHFCH.mjs";
import { m as withSessionDeliveryEnqueueAdmission } from "./session-delivery-queue-storage-D5pkrc1d.mjs";
import { a as SessionDeliveryDeferredError, c as prepareClaimedSessionDelivery, i as SessionDeliveryDeadLetteredError } from "./session-delivery-queue.records-CjQTBb2t.mjs";
import { h as publishCommittedRecords, m as blockSubagentCompletionDelivery, p as admitSubagentCompletionDelivery, v as settleSubagentCompletionDelivery } from "./subagent-registry-helpers-BH63OlUO.mjs";
import { o as normalizeAgentRunRouteChange } from "./agent-run-terminal-reply-DV0cZr9u.mjs";
import { D as loadPendingFinalDeliveryPayload, x as ensureDeliveryState } from "./subagent-registry.store.sqlite-DQWBMoqK.mjs";
import { C as readFullSubagentRuns, E as assertSubagentRegistryWriteSourceCurrent, S as assertSubagentReadContext, j as withSubagentRegistryWriteAuthority } from "./subagent-registry-state-DbBqXjLM.mjs";
import { t as compareSubagentRunGeneration } from "./subagent-run-generation-DCkOHoP9.mjs";
import { t as resolveSubagentCompletionResultText } from "./subagent-completion-result-C8KtnKJD.mjs";
import { t as SUBAGENT_COMPLETION_OUTCOME_INSTRUCTION } from "./subagent-completion-instructions-B70YK2BV.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/agents/generated-attachments.ts
function generatedAttachmentReference(attachment) {
	return normalizeOptionalString(attachment.path ?? attachment.url ?? attachment.mediaUrl ?? attachment.filePath);
}
/** Return unique media URLs/paths from generated attachments. */
function mediaUrlsFromGeneratedAttachments(attachments) {
	return uniqueStrings(attachments?.flatMap((attachment) => generatedAttachmentReference(attachment) ?? []) ?? []);
}
function nameFromGeneratedAttachment(attachment) {
	return normalizeOptionalString(attachment.name) ?? basenameFromAnyPath(generatedAttachmentReference(attachment) ?? "");
}
function neutralizeEscapedGeneratedMediaDirective(value) {
	return value.replace(/((?:\\r\\n|\\n|\\r)[^\S\r\n]*)(media):/giu, "$1$2：").replace(/((?:\\r\\n|\\n|\\r) {0,3})(`{3,}|~{3,})/gu, "$1>$2");
}
/** Escape provider-controlled summary text without changing its structured result. */
function sanitizeGeneratedMediaDisplayText(value) {
	let sanitized = "";
	for (const char of value) switch (char) {
		case "\\":
			sanitized += "\\\\";
			break;
		case "\r":
			sanitized += "\\r";
			break;
		case "\n":
			sanitized += "\\n";
			break;
		case "	":
			sanitized += "\\t";
			break;
		default: {
			const code = char.charCodeAt(0);
			sanitized += code <= 31 || code === 127 || code === 8232 || code === 8233 ? `\\u${code.toString(16).padStart(4, "0")}` : char;
		}
	}
	return neutralizeEscapedGeneratedMediaDirective(sanitizeForPromptLiteral(sanitized)).replaceAll("[[", "［[").replaceAll("![", "!［");
}
function quoteGeneratedAttachmentDisplay(value) {
	return neutralizeEscapedGeneratedMediaDirective(JSON.stringify(sanitizeForPromptLiteral(value))).replaceAll("[", "\\u005b");
}
/** Format generated attachment metadata as prompt-safe text lines. */
function formatGeneratedAttachmentLines(attachments) {
	if (!attachments?.length) return [];
	const lines = ["Attachments:"];
	for (const [index, attachment] of attachments.entries()) {
		const parts = [`${index + 1}.`];
		const type = normalizeOptionalString(attachment.type);
		const name = nameFromGeneratedAttachment(attachment);
		const mimeType = normalizeOptionalString(attachment.mimeType);
		const path = normalizeOptionalString(attachment.path ?? attachment.filePath);
		const url = normalizeOptionalString(attachment.url ?? attachment.mediaUrl);
		if (type) parts.push(`type=${quoteGeneratedAttachmentDisplay(type).slice(1, -1)}`);
		if (name) parts.push(`name=${quoteGeneratedAttachmentDisplay(name)}`);
		if (mimeType) parts.push(`mimeType=${quoteGeneratedAttachmentDisplay(mimeType).slice(1, -1)}`);
		if (path) parts.push(`path=${quoteGeneratedAttachmentDisplay(path)}`);
		else if (url) parts.push(`mediaUrl=${quoteGeneratedAttachmentDisplay(url)}`);
		lines.push(parts.join(" "));
	}
	return lines;
}
//#endregion
//#region src/agents/internal-events.ts
/**
* Internal runtime event prompt formatting.
* Sanitizes background task completion events into protected runtime-context
* blocks or plain prompt text.
*/
const MAX_TASK_COMPLETION_STATUS_LABEL_CHARS = 500;
const TASK_COMPLETION_STATUS_LABEL_TRUNCATION_MARKER = "…[truncated]";
const MEDIA_DIRECTIVE_CONTROL_CHARS = new RegExp(String.raw`[\u0000-\u001f\u007f]`, "g");
/** Collect ordered media descriptors and per-reference trust from internal events. */
function collectAgentInternalEventMedia(events) {
	const mediaUrls = [];
	const attachments = [];
	const indexByUrl = /* @__PURE__ */ new Map();
	const trustByUrl = /* @__PURE__ */ new Map();
	for (const event of events ?? []) {
		const generatedMediaEvent = hasGeneratedMediaCompletionEvent([event]);
		const attachmentByUrl = new Map((event.attachments ?? []).flatMap((attachment) => {
			const reference = normalizeOptionalString(attachment.path ?? attachment.url ?? attachment.mediaUrl ?? attachment.filePath);
			return reference ? [[reference, attachment]] : [];
		}));
		for (const mediaUrl of [...Array.isArray(event.mediaUrls) ? event.mediaUrls : [], ...mediaUrlsFromGeneratedAttachments(event.attachments)]) {
			const normalized = normalizeOptionalString(mediaUrl);
			if (!normalized) continue;
			const metadata = attachmentByUrl.get(normalized);
			const existingIndex = indexByUrl.get(normalized);
			if (existingIndex !== void 0) {
				trustByUrl.set(normalized, trustByUrl.get(normalized) === true || generatedMediaEvent);
				if (metadata && Object.keys(attachments[existingIndex] ?? {}).length === 0) attachments[existingIndex] = metadata;
				continue;
			}
			indexByUrl.set(normalized, mediaUrls.length);
			trustByUrl.set(normalized, generatedMediaEvent);
			mediaUrls.push(normalized);
			attachments.push(metadata ?? {});
		}
	}
	return {
		mediaUrls,
		attachments,
		trustByUrl
	};
}
function sanitizeSingleLineField(value, fallback, raw = false) {
	return (raw ? value : escapeInternalRuntimeContextDelimiters(value)).replace(/\r?\n+/g, " ").trim() || fallback;
}
function sanitizeMultilineField(value) {
	return escapeInternalRuntimeContextDelimiters(value).replace(/\r\n/g, "\n").trim();
}
function sanitizeMediaDirectiveValue(value, raw = false) {
	return (raw ? value : escapeInternalRuntimeContextDelimiters(value)).replace(/\r?\n/g, " ").replace(MEDIA_DIRECTIVE_CONTROL_CHARS, " ").trim() || null;
}
function formatChildResultDataBlock(value) {
	return wrapPromptDataBlock({
		label: "Child result",
		text: value
	}) || "Child result: (no output)";
}
function formatGeneratedMediaDirectiveLines(event, raw = false, label = "Generated media:") {
	const mediaUrls = Array.from(new Set([...event.mediaUrls ?? [], ...mediaUrlsFromGeneratedAttachments(event.attachments)].map((value) => sanitizeMediaDirectiveValue(value, raw)).filter((value) => value !== null)));
	if (mediaUrls.length === 0) return [];
	return [label, ...mediaUrls.map((mediaUrl) => {
		return `MEDIA:${mediaUrl.includes("\"") || /[`'\\})\],]$/u.test(mediaUrl) ? `"${mediaUrl}"` : mediaUrl}`;
	})];
}
function formatTaskCompletionEvent(event, mode) {
	const singleLine = (value, fallback) => sanitizeSingleLineField(value, fallback, mode === "data");
	const sessionKey = singleLine(event.childSessionKey, "unknown");
	const sessionId = singleLine(event.childSessionId ?? "unknown", "unknown");
	const announceType = singleLine(event.announceType, "unknown");
	const taskLabel = singleLine(event.taskLabel, "unnamed task");
	const statusLabel = truncateWithMarker(singleLine(event.statusLabel, event.status), MAX_TASK_COMPLETION_STATUS_LABEL_CHARS, {
		marker: TASK_COMPLETION_STATUS_LABEL_TRUNCATION_MARKER,
		reserve: 12,
		trimEnd: true
	});
	const result = mode === "data" ? event.result || "(no output)" : formatChildResultDataBlock(event.result);
	const modelRouteChange = normalizeAgentRunRouteChange(event.modelRouteChange);
	const attachmentLines = formatGeneratedAttachmentLines(event.attachments);
	const mediaDirectiveLines = formatGeneratedMediaDirectiveLines(event, mode === "data");
	const lines = mode !== "plain" ? ["[Internal task completion event]"] : ["A background task completed. Use this result to reply to the user in your normal assistant voice.", ""];
	lines.push(`source: ${event.source}`, `session_key: ${sessionKey}`, `session_id: ${sessionId}`, `type: ${announceType}`, `task: ${taskLabel}`, `status: ${statusLabel}`, "", result);
	if (modelRouteChange) lines.push("", modelRouteChange);
	if (attachmentLines.length > 0) lines.push("", ...attachmentLines);
	if (mediaDirectiveLines.length > 0) lines.push("", ...mediaDirectiveLines);
	if (event.statsLine?.trim()) lines.push("", mode === "data" ? event.statsLine : sanitizeMultilineField(event.statsLine));
	if (mode !== "data") lines.push("", mode === "protected" ? "Action:" : "Instruction:", sanitizeMultilineField(event.replyInstruction));
	return lines.join("\n");
}
/** Provenance comes from the producer event; child output and labels remain data. */
function buildAgentInternalEventContext(events, legacy = false) {
	if (legacy) {
		const text = formatAgentInternalEventsForPrompt(events);
		return text ? [{
			kind: "runtime-instruction",
			text
		}] : [];
	}
	return (events ?? []).flatMap((event) => [
		{
			kind: "runtime-instruction",
			text: "A background task completed. Keep internal details private and use its result to reply in your normal assistant voice."
		},
		{
			kind: "conversation-data",
			text: formatTaskCompletionEvent(event, "data")
		},
		{
			kind: "runtime-instruction",
			text: event.replyInstruction
		}
	]);
}
function buildGeneratedMediaDeliveryContext(mediaUrls, retry) {
	return [{
		kind: "runtime-instruction",
		text: retry ? "Deliver only the generated media listed below. Do not resend any other attachment." : "Deliver the generated media listed below to the user."
	}, {
		kind: "conversation-data",
		text: formatGeneratedMediaDirectiveLines({
			mediaUrls,
			attachments: []
		}, true).join("\n")
	}];
}
/** Format internal runtime events for the protected runtime-context prompt block. */
function formatAgentInternalEventsForPrompt(events) {
	const blocks = (events ?? []).filter((event) => event.type === "task_completion").map((event) => formatTaskCompletionEvent(event, "protected"));
	if (blocks.length === 0) return "";
	return [
		INTERNAL_RUNTIME_CONTEXT_BEGIN,
		"OpenClaw runtime context (internal):",
		"This context is runtime-generated, not user-authored. Keep internal details private.",
		"",
		blocks.join("\n\n---\n\n"),
		INTERNAL_RUNTIME_CONTEXT_END
	].join("\n");
}
/** Build a protected follow-up that can retry only media proven missing from a partial send. */
function formatGeneratedMediaDeliveryRetryForPrompt(mediaUrls) {
	const mediaDirectiveLines = formatGeneratedMediaDirectiveLines({ mediaUrls }, false, "Generated media still missing:");
	if (mediaDirectiveLines.length === 0) return "";
	return [
		INTERNAL_RUNTIME_CONTEXT_BEGIN,
		"OpenClaw runtime context (internal):",
		"This context is runtime-generated, not user-authored. Keep internal details private.",
		"",
		"[Generated media delivery retry]",
		"A previous agent turn delivered only part of this generated-media result.",
		"",
		...mediaDirectiveLines,
		"",
		"Action:",
		"Deliver only the generated media listed above. Do not resend any other attachment.",
		INTERNAL_RUNTIME_CONTEXT_END
	].join("\n");
}
/** Format internal runtime events for plain prompts that lack context delimiters. */
function formatAgentInternalEventsForPlainPrompt(events) {
	return (events ?? []).filter((event) => event.type === "task_completion").map((event) => formatTaskCompletionEvent(event, "plain")).join("\n\n---\n\n");
}
/** Keep the existing event carrier for runtimes that own their prompt assembly. */
function prependInternalEventContext(body, events, inputProvenance) {
	const rendered = formatAgentInternalEventsForPrompt(events);
	return !rendered || resolveInternalEventPromptBody(body, events, inputProvenance) !== body ? body : [rendered, body].filter(Boolean).join("\n\n");
}
/** Remove only the canonical duplicate carried by the existing internal-events API. */
function resolveInternalEventPromptBody(body, events, inputProvenance, retainProvenance = false) {
	const rendered = formatAgentInternalEventsForPrompt(events);
	if (rendered) {
		for (const carrier of [rendered, annotateInterSessionPromptText(rendered, inputProvenance)]) if (body === carrier || body.startsWith(`${carrier}\n\n`)) return [retainProvenance ? carrier.slice(0, -rendered.length).trimEnd() : "", body.slice(carrier.length).trimStart()].filter(Boolean).join("\n\n");
	}
	return body;
}
/** Plain runtimes and transcripts retain the existing visible event representation. */
function resolveAcpPromptBody(body, events, inputProvenance) {
	const rendered = formatAgentInternalEventsForPlainPrompt(events);
	return rendered ? [rendered, resolveInternalEventPromptBody(body, events, inputProvenance, true)].filter(Boolean).join("\n\n") : body;
}
function resolveInternalEventTranscriptBody(body, events, inputProvenance) {
	return resolveInternalEventPromptBody(body, events, inputProvenance) === body ? body : resolveAcpPromptBody(body, events, inputProvenance);
}
//#endregion
//#region src/auto-reply/reply/completion-delivery-policy.ts
function resolveCompletionChatType(params) {
	const explicit = normalizeChatType(params.requesterEntry?.chatType ?? sessionDeliveryOrigin(params.requesterEntry)?.chatType);
	if (explicit) return explicit;
	for (const key of [params.targetRequesterSessionKey, params.requesterSessionKey]) {
		const derived = deriveSessionChatTypeFromKey(key);
		if (derived !== "unknown") return derived;
	}
	return inferCompletionChatTypeFromTarget(params.directOrigin?.to ?? params.requesterSessionOrigin?.to);
}
function completionRequiresMessageToolDelivery(params) {
	return resolveSourceReplyDeliveryMode({
		cfg: params.cfg,
		ctx: { ChatType: resolveCompletionChatType(params) },
		messageToolAvailable: params.messageToolAvailable
	}) === "message_tool_only";
}
/** Resolve transport authority for a durable, fixed-route agent completion. */
function resolveDurableCompletionDeliveryMode(sourceReplyDeliveryMode) {
	return sourceReplyDeliveryMode === "message_tool_only" ? "host_owned" : "automatic";
}
function inferCompletionChatTypeFromTarget(to) {
	const normalized = to?.trim().toLowerCase();
	if (!normalized) return "unknown";
	if (normalized.startsWith("group:")) return "group";
	if (normalized.startsWith("channel:") || normalized.startsWith("thread:")) return "channel";
	if (normalized.startsWith("dm:") || normalized.startsWith("direct:") || normalized.startsWith("user:")) return "direct";
	return "unknown";
}
//#endregion
//#region src/agents/subagents/completion/subagent-completion-delivery.ts
const CLAIM_LEASE_MS = 125e3;
const CANONICAL_RESULT_PROMPT = `A completed subagent task is ready for parent review. ${SUBAGENT_COMPLETION_OUTCOME_INSTRUCTION} The canonical result follows.`;
/** Atomically admits a queue generation and publishes process mirrors only after commit. */
async function admitCorrelatedSubagentSessionDelivery(params) {
	const payload = structuredClone(params.payload);
	const runId = params.runId;
	const context = params.queueContext;
	return withSessionDeliveryEnqueueAdmission(payload, context, async (assertCurrent) => {
		assertCurrent();
		const current = subagentRuns.get(runId);
		if (!current) throw new Error(`subagent completion owner not found: ${runId}`);
		const expected = structuredClone(current);
		const sourceIsCurrent = () => subagentRuns.get(runId) === current && isDeepStrictEqual(current, expected) && ![...getSubagentRunsForChildSession(expected.childSessionKey)].some((candidate) => compareSubagentRunGeneration(candidate, expected) > 0);
		return withSubagentRegistryWriteAuthority([runId], {
			context,
			assertCurrent: () => {
				assertCurrent();
				if (!sourceIsCurrent()) throw new Error("Subagent completion source changed during admission");
			}
		}, async (authority) => {
			const now = Date.now();
			const subagent = structuredClone(expected);
			const delivery = ensureDeliveryState(subagent);
			const generation = delivery.generation ?? 1;
			const windowStartedAt = delivery.windowStartedAt ?? subagent.execution.endedAt ?? now;
			const deadlineAt = delivery.deadlineAt ?? windowStartedAt + 18e5;
			const generationSuffix = generation > 1 ? `:generation:${generation}` : "";
			const queueEntry = prepareClaimedSessionDelivery({
				...payload,
				idempotencyKey: `${payload.idempotencyKey ?? payload.messageId}${generationSuffix}`,
				messageId: `${payload.messageId}${generationSuffix}`,
				message: CANONICAL_RESULT_PROMPT,
				maxRetries: Number.MAX_SAFE_INTEGER,
				owner: {
					kind: "subagent_completion",
					runId: subagent.runId,
					taskId: subagent.taskRunId ?? subagent.runId,
					generation,
					deadlineAt
				}
			}, CLAIM_LEASE_MS, now);
			Object.assign(delivery, {
				status: "in_progress",
				disposition: "session_queued",
				generation,
				queueId: queueEntry.id,
				windowStartedAt,
				deadlineAt,
				nextAttemptAt: queueEntry.availableAt,
				enqueuedAt: now
			});
			delivery.payload ??= loadPendingFinalDeliveryPayload(subagent);
			const admission = await admitSubagentCompletionDelivery({
				queueEntry,
				expected,
				subagent,
				context,
				assertCurrent: authority.assertCurrent
			});
			const result = {
				id: queueEntry.id,
				claimed: admission.claimed,
				status: admission.status
			};
			try {
				authority.assertDatabase();
			} catch {
				return result;
			}
			if (authority.currentRunIds().includes(runId) && sourceIsCurrent()) {
				admission.subagent.cleanupHandled = current.cleanupHandled;
				publishCommittedRecords(admission.subagent, context.admission.databasePath);
			}
			return result;
		});
	});
}
function resolveCorrelatedSubagentDelivery(queued) {
	if (queued.kind !== "agentTurn" || queued.owner?.kind !== "subagent_completion") return queued;
	if (Date.now() >= queued.owner.deadlineAt) throw new SessionDeliveryDeadLetteredError("correlated subagent completion delivery deadline expired");
	const entry = subagentRuns.get(queued.owner.runId);
	if (!entry || entry.delivery?.queueId !== queued.id || entry.delivery.generation !== queued.owner.generation || entry.delivery.deadlineAt !== queued.owner.deadlineAt) throw new SessionDeliveryDeferredError("correlated subagent delivery owner mismatch");
	const result = resolveSubagentCompletionResultText(entry) ?? "(no output)";
	return {
		...queued,
		message: `${CANONICAL_RESULT_PROMPT}\n\n${result}`,
		runtimeContextFragments: [{
			kind: "runtime-instruction",
			text: CANONICAL_RESULT_PROMPT
		}, {
			kind: "conversation-data",
			text: result
		}]
	};
}
async function settleCorrelatedSubagentDelivery(queued, outcome, queueContext) {
	if (queued.kind !== "agentTurn" || queued.owner?.kind !== "subagent_completion") return;
	const queueOwner = queued.owner;
	assertSubagentReadContext(queueContext);
	if (!subagentRuns.has(queued.owner.runId)) {
		const persisted = await readFullSubagentRuns(queueContext, {
			kind: "ids",
			runIds: [queued.owner.runId]
		}, { current: true });
		assertSubagentReadContext(queueContext);
		if (persisted.has(queued.owner.runId) && !subagentRuns.has(queued.owner.runId)) throw new Error("Subagent completion recovery is waiting for registry restoration");
	}
	const current = subagentRuns.get(queued.owner.runId);
	const alreadyDelivered = outcome === "recovered" && current?.delivery?.status === "delivered" && current.delivery.queueId === void 0;
	if (!current || current.delivery?.generation !== queued.owner.generation || !alreadyDelivered && current.delivery.queueId !== queued.id) return;
	const now = Date.now();
	const subagent = structuredClone(current);
	const source = Object.freeze({
		runId: current.runId,
		createdAt: current.createdAt,
		generation: current.generation,
		childSessionKey: current.childSessionKey,
		requesterSessionKey: current.requesterSessionKey,
		requesterStorePath: current.requesterStorePath
	});
	const readMatchingDeliveryOwner = () => {
		const latest = subagentRuns.get(source.runId);
		if (!latest) throw new Error("Subagent completion recovery is waiting for registry restoration");
		if (compareSubagentRunGeneration(latest, source) !== 0 || latest.childSessionKey !== source.childSessionKey || latest.requesterSessionKey !== source.requesterSessionKey || latest.requesterStorePath !== source.requesterStorePath || latest.delivery?.generation !== queueOwner.generation) return;
		return latest;
	};
	const delivery = ensureDeliveryState(subagent);
	if (outcome !== "recovered") {
		await blockSubagentCompletionDelivery({
			context: queueContext,
			subagent: current,
			reason: queued.lastError ?? "completion delivery failed",
			suspendedReason: "permanent_failure"
		});
		return;
	}
	if (!alreadyDelivered) {
		Object.assign(delivery, {
			status: "delivered",
			disposition: "delivered",
			deliveredAt: now,
			announcedAt: now,
			lastError: void 0,
			nextAttemptAt: void 0,
			queueId: void 0
		});
		delivery.payload = void 0;
	}
	await settleSubagentCompletionDelivery({
		subagent,
		queueId: queued.id,
		context: queueContext
	});
	assertSubagentRegistryWriteSourceCurrent(queueContext);
	const published = readMatchingDeliveryOwner();
	if (!published) return;
	if (published !== current || published.delivery?.status !== "delivered" || published.delivery.queueId !== void 0) throw new Error("Subagent completion recovery is waiting for committed publication");
	const committed = structuredClone(published);
	const { resumeSubagentRun } = await import("./subagent-registry-Dy6CO-Wk.mjs");
	assertSubagentRegistryWriteSourceCurrent(queueContext);
	const latest = readMatchingDeliveryOwner();
	if (!latest) return;
	if (latest !== published || !isDeepStrictEqual(latest, committed)) throw new Error("Subagent completion recovery owner changed before cleanup resumed");
	resumeSubagentRun(subagent.runId);
}
//#endregion
export { sanitizeGeneratedMediaDisplayText as _, resolveDurableCompletionDeliveryMode as a, collectAgentInternalEventMedia as c, prependInternalEventContext as d, resolveAcpPromptBody as f, mediaUrlsFromGeneratedAttachments as g, formatGeneratedAttachmentLines as h, completionRequiresMessageToolDelivery as i, formatAgentInternalEventsForPrompt as l, resolveInternalEventTranscriptBody as m, resolveCorrelatedSubagentDelivery as n, buildAgentInternalEventContext as o, resolveInternalEventPromptBody as p, settleCorrelatedSubagentDelivery as r, buildGeneratedMediaDeliveryContext as s, admitCorrelatedSubagentSessionDelivery as t, formatGeneratedMediaDeliveryRetryForPrompt as u };
