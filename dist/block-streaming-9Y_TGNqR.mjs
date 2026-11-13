import "./session-key-BC4m_Ly5.mjs";
import { n as normalizeAccountId } from "./account-id-CW6dlabA.mjs";
import { n as normalizeMessageChannel } from "./message-channel-core-CQXI3ZKP.mjs";
import "./message-channel-DDiCYM9I.mjs";
import { r as resolveChannelAccountEntry } from "./account-lookup-MX6n1-rM.mjs";
import { i as normalizeChannelId, t as getChannelPlugin } from "./registry-C-O7Iq84.mjs";
import "./plugins-BVrJdw4D.mjs";
import { c as resolveTextChunkLimit, s as resolveChunkMode } from "./chunk-D0mMM4nT.mjs";
import { x as resolveChannelStreamingBlockCoalesce } from "./streaming-DELQpW3p.mjs";
//#region src/auto-reply/reply/block-streaming.ts
const DEFAULT_BLOCK_STREAM_MIN = 800;
const DEFAULT_BLOCK_STREAM_MAX = 1200;
const DEFAULT_BLOCK_STREAM_COALESCE_IDLE_MS = 1e3;
function resolveProviderChunkContext(cfg, provider, accountId) {
	const providerKey = provider ? normalizeMessageChannel(provider) : void 0;
	const providerId = providerKey ? normalizeChannelId(providerKey) : null;
	const providerChunkLimit = providerId ? getChannelPlugin(providerId)?.outbound?.textChunkLimit : void 0;
	return {
		providerKey,
		providerId,
		textLimit: resolveTextChunkLimit(cfg, providerKey, accountId, { fallbackLimit: providerChunkLimit })
	};
}
function resolveProviderBlockStreamingCoalesce(params) {
	const { cfg, providerKey, accountId } = params;
	if (!cfg || !providerKey) return;
	const providerCfg = cfg.channels?.[providerKey];
	if (!providerCfg || typeof providerCfg !== "object") return;
	const normalizedAccountId = normalizeAccountId(accountId);
	const typed = providerCfg;
	const accountCfg = resolveChannelAccountEntry(typed.accounts, normalizedAccountId, providerKey);
	const channelCoalesce = resolveChannelStreamingBlockCoalesce(typed);
	const accountCoalesce = accountCfg ? resolveChannelStreamingBlockCoalesce(accountCfg) : void 0;
	if (channelCoalesce || accountCoalesce) return {
		...channelCoalesce,
		...accountCoalesce
	};
}
function clampPositiveInteger(value, fallback, bounds) {
	if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
	const rounded = Math.round(value);
	return rounded < bounds.min ? bounds.min : Math.min(rounded, bounds.max);
}
function resolveEffectiveBlockStreamingConfig(params) {
	const { textLimit } = resolveProviderChunkContext(params.cfg, params.provider, params.accountId);
	const chunkingDefaults = params.chunking ?? resolveBlockStreamingChunking(params.cfg, params.provider, params.accountId);
	const chunkingMax = clampPositiveInteger(params.maxChunkChars, chunkingDefaults.maxChars, {
		min: 1,
		max: Math.max(1, textLimit)
	});
	const chunking = {
		...chunkingDefaults,
		minChars: Math.min(chunkingDefaults.minChars, chunkingMax),
		maxChars: chunkingMax
	};
	const coalescingDefaults = resolveBlockStreamingCoalescing(params.cfg, params.provider, params.accountId, chunking);
	const coalescingMax = Math.max(1, Math.min(coalescingDefaults.maxChars, chunking.maxChars));
	return {
		chunking,
		coalescing: {
			minChars: Math.min(coalescingDefaults.minChars, coalescingMax),
			maxChars: coalescingMax,
			idleMs: clampPositiveInteger(params.coalesceIdleMs, coalescingDefaults.idleMs, {
				min: 0,
				max: 5e3
			}),
			joiner: coalescingDefaults.joiner
		}
	};
}
function resolveBlockStreamingChunking(cfg, provider, accountId) {
	const { providerKey, textLimit } = resolveProviderChunkContext(cfg, provider, accountId);
	const chunkCfg = cfg?.agents?.defaults?.blockStreamingChunk;
	const chunkMode = resolveChunkMode(cfg, providerKey, accountId);
	const maxRequested = Math.max(1, Math.floor(chunkCfg?.maxChars ?? DEFAULT_BLOCK_STREAM_MAX));
	const maxChars = Math.max(1, Math.min(maxRequested, textLimit));
	const minRequested = Math.max(1, Math.floor(chunkCfg?.minChars ?? DEFAULT_BLOCK_STREAM_MIN));
	return {
		minChars: Math.min(minRequested, maxChars),
		maxChars,
		breakPreference: chunkCfg?.breakPreference === "newline" || chunkCfg?.breakPreference === "sentence" ? chunkCfg.breakPreference : "paragraph",
		flushOnParagraph: chunkMode === "newline"
	};
}
function resolveBlockStreamingCoalescing(cfg, provider, accountId, chunking) {
	const { providerKey, providerId, textLimit } = resolveProviderChunkContext(cfg, provider, accountId);
	const providerDefaults = providerId ? getChannelPlugin(providerId)?.streaming?.blockStreamingCoalesceDefaults : void 0;
	const coalesceCfg = resolveProviderBlockStreamingCoalesce({
		cfg,
		providerKey,
		accountId
	}) ?? cfg?.agents?.defaults?.blockStreamingCoalesce;
	const minRequested = Math.max(1, Math.floor(coalesceCfg?.minChars ?? providerDefaults?.minChars ?? chunking?.minChars ?? DEFAULT_BLOCK_STREAM_MIN));
	const maxRequested = Math.max(1, Math.floor(coalesceCfg?.maxChars ?? textLimit));
	const maxChars = Math.max(1, Math.min(maxRequested, textLimit));
	const minChars = Math.min(minRequested, maxChars);
	const idleMs = Math.max(0, Math.floor(coalesceCfg?.idleMs ?? providerDefaults?.idleMs ?? DEFAULT_BLOCK_STREAM_COALESCE_IDLE_MS));
	const preference = chunking?.breakPreference ?? "paragraph";
	return {
		minChars,
		maxChars,
		idleMs,
		joiner: preference === "sentence" ? " " : preference === "newline" ? "\n" : "\n\n"
	};
}
//#endregion
export { resolveEffectiveBlockStreamingConfig as n, resolveBlockStreamingChunking as t };
