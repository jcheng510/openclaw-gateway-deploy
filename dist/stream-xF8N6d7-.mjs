import { N as applyAnthropicEphemeralCacheControlMarkers, w as projectCopilotRequestFacts } from "./provider-stream-shared-HDHyzkG2.mjs";
import { t as buildCopilotRuntimeHeaders } from "./runtime-identity-DTUr0WkG.mjs";
import { r as stripCopilotAssistantThinkingMessages } from "./replay-policy-J9DidFL2.mjs";
import { t as sanitizeCopilotReplayResponsePayload } from "./connection-bound-ids-gmBLPztv.mjs";
//#region extensions/github-copilot/stream.ts
function patchOnPayloadResult(result, patchPayload, fallbackPayload) {
	if (result && typeof result === "object" && "then" in result) return Promise.resolve(result).then((next) => {
		patchPayload(next === void 0 ? fallbackPayload : next);
		return next;
	});
	patchPayload(result === void 0 ? fallbackPayload : result);
	return result;
}
function normalizeCopilotAnthropicToolIds(messages) {
	const blocks = [];
	for (const message of messages) {
		if (!message || typeof message !== "object") continue;
		const content = message.content;
		if (!Array.isArray(content)) continue;
		for (const block of content) {
			if (!block || typeof block !== "object") continue;
			const record = block;
			const idKey = record.type === "tool_use" ? "id" : record.type === "tool_result" ? "tool_use_id" : null;
			const rawId = idKey ? record[idKey] : void 0;
			if (idKey && typeof rawId === "string") blocks.push({
				record,
				idKey,
				rawId
			});
		}
	}
	const validId = /^[a-zA-Z0-9_-]{1,64}$/;
	const reserved = new Set(blocks.filter((block) => block.idKey === "id" && validId.test(block.rawId)).map((block) => block.rawId));
	const used = new Set(reserved);
	const claimedValid = /* @__PURE__ */ new Set();
	const pendingByRawId = /* @__PURE__ */ new Map();
	const lastResolvedByRawId = /* @__PURE__ */ new Map();
	const allocate = (rawId) => {
		if (validId.test(rawId) && !claimedValid.has(rawId)) {
			claimedValid.add(rawId);
			return rawId;
		}
		const base = rawId.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 64) || "tool";
		if (!used.has(base)) {
			used.add(base);
			return base;
		}
		for (let occurrence = 2;; occurrence += 1) {
			const suffix = `_${occurrence}`;
			const candidate = `${base.slice(0, 64 - suffix.length)}${suffix}`;
			if (!used.has(candidate)) {
				used.add(candidate);
				return candidate;
			}
		}
	};
	for (const block of blocks) {
		if (block.idKey === "id") {
			const wireId = allocate(block.rawId);
			const pending = pendingByRawId.get(block.rawId);
			if (pending) pending.push(wireId);
			else pendingByRawId.set(block.rawId, [wireId]);
			block.record.id = wireId;
			continue;
		}
		const pending = pendingByRawId.get(block.rawId);
		const wireId = pending?.shift() ?? lastResolvedByRawId.get(block.rawId) ?? allocate(block.rawId);
		if (pending?.length === 0) pendingByRawId.delete(block.rawId);
		lastResolvedByRawId.set(block.rawId, wireId);
		block.record.tool_use_id = wireId;
	}
}
function patchCopilotAnthropicPayload(payload) {
	if (!payload || typeof payload !== "object") return;
	const record = payload;
	if (Array.isArray(record.messages)) {
		const messages = stripCopilotAssistantThinkingMessages(record.messages);
		record.messages = messages;
		normalizeCopilotAnthropicToolIds(messages);
	}
	applyAnthropicEphemeralCacheControlMarkers(record);
}
function wrapCopilotProviderStream(ctx) {
	const stream = ctx.streamFn;
	if (!stream) return;
	return (model, context, options) => {
		if (model.provider !== "github-copilot" || ![
			"anthropic-messages",
			"openai-responses",
			"openai-completions"
		].includes(model.api)) return stream(model, context, options);
		const facts = projectCopilotRequestFacts(context.messages, "nested");
		const anthropic = model.api === "anthropic-messages";
		const originalOnPayload = options?.onPayload;
		const patchPayload = anthropic ? patchCopilotAnthropicPayload : model.api === "openai-responses" ? sanitizeCopilotReplayResponsePayload : void 0;
		return stream(model, context, {
			...options,
			headers: buildCopilotRuntimeHeaders({
				config: ctx.config,
				headers: {
					...model.headers,
					"x-initiator": facts.initiator,
					...facts.hasImages ? { "Copilot-Vision-Request": "true" } : {},
					...options?.headers
				}
			}),
			...patchPayload ? { onPayload: (payload, payloadModel) => {
				patchPayload(payload);
				return patchOnPayloadResult(originalOnPayload?.(payload, anthropic ? model : payloadModel), patchPayload, payload);
			} } : {}
		});
	};
}
//#endregion
export { wrapCopilotProviderStream as t };
