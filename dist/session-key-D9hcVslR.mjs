import { c as normalizeOptionalLowercaseString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { c as normalizeE164 } from "./utils-DUAwk2p5.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { i as normalizeMainKey, n as buildAgentMainSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { O as normalizeSessionKeyPreservingOpaquePeerIds } from "./session-key-BC4m_Ly5.mjs";
import { n as normalizeMessageChannel } from "./message-channel-core-CQXI3ZKP.mjs";
import "./message-channel-DDiCYM9I.mjs";
import { n as getLoadedChannelPlugin, r as listChannelPlugins } from "./registry-C-O7Iq84.mjs";
import { r as resolveGroupSessionKey } from "./group-CFZ0UG5F.mjs";
import "./plugins-BVrJdw4D.mjs";
//#region src/config/sessions/explicit-session-key-normalization.ts
function resolveExplicitSessionKeyNormalizerCandidates(sessionKey, ctx) {
	const normalizedProvider = normalizeOptionalLowercaseString(ctx.Provider);
	const normalizedSurface = normalizeOptionalLowercaseString(ctx.Surface);
	const normalizedFrom = normalizeLowercaseStringOrEmpty(ctx.From);
	const candidates = /* @__PURE__ */ new Set();
	const maybeAdd = (value) => {
		const normalized = normalizeMessageChannel(value);
		if (normalized) candidates.add(normalized);
	};
	maybeAdd(normalizedSurface);
	maybeAdd(normalizedProvider);
	maybeAdd(normalizedFrom.split(":", 1)[0]);
	for (const plugin of listChannelPlugins()) {
		const pluginId = normalizeMessageChannel(plugin.id);
		if (!pluginId) continue;
		if (sessionKey.startsWith(`${pluginId}:`) || sessionKey.includes(`:${pluginId}:`)) candidates.add(pluginId);
	}
	return [...candidates];
}
/** Normalizes caller-supplied session keys through the matching channel plugin when available. */
function normalizeExplicitSessionKey(sessionKey, ctx) {
	const normalized = normalizeSessionKeyPreservingOpaquePeerIds(sessionKey);
	for (const channelId of resolveExplicitSessionKeyNormalizerCandidates(normalized, ctx)) {
		const normalize = getLoadedChannelPlugin(channelId)?.messaging?.normalizeExplicitSessionKey;
		const next = normalize?.({
			sessionKey: normalized,
			ctx
		});
		if (typeof next === "string" && next.trim()) return normalizeSessionKeyPreservingOpaquePeerIds(next);
	}
	return normalized;
}
//#endregion
//#region src/config/sessions/session-key.ts
/**
* Derives the raw session bucket from message context before agent/main-key normalization.
*
* Direct chats use sender identity, groups use channel-owned group keys, and global scope bypasses
* sender routing entirely.
*/
function deriveSessionKey(scope, ctx) {
	if (scope === "global") return "global";
	const resolvedGroup = resolveGroupSessionKey(ctx);
	if (resolvedGroup) return resolvedGroup.key;
	return (ctx.From ? normalizeE164(ctx.From) : "") || "unknown";
}
/**
* Resolves the persisted session-store key for an inbound message.
*
* Explicit session keys pass through the compatibility normalizer, direct chats collapse to the
* agent's canonical main bucket, and group/channel sessions stay isolated under the same agent.
*/
function resolveSessionKey(scope, ctx, mainKey, agentId) {
	const explicit = ctx.SessionKey?.trim();
	if (explicit) return normalizeExplicitSessionKey(explicit, ctx);
	const raw = deriveSessionKey(scope, ctx);
	if (scope === "global") return raw;
	if (!agentId?.trim()) throw new Error("Session key resolution requires an explicit configured agent id.");
	const canonicalAgentId = normalizeAgentId(agentId);
	const canonicalMainKey = normalizeMainKey(mainKey);
	const canonical = buildAgentMainSessionKey({
		agentId: canonicalAgentId,
		mainKey: canonicalMainKey
	});
	if (!(raw.includes(":group:") || raw.includes(":channel:"))) return canonical;
	return `agent:${canonicalAgentId}:${raw}`;
}
//#endregion
export { resolveSessionKey as n, normalizeExplicitSessionKey as r, deriveSessionKey as t };
