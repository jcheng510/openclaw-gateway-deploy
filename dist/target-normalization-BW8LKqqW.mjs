import { c as normalizeOptionalLowercaseString, l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { c as getActivePluginChannelRegistryVersion } from "./runtime-BnZb2P5v.mjs";
import { i as getLoadedChannelPluginForRead } from "./registry-loaded-B4Apio9u.mjs";
import { t as getChannelPlugin } from "./registry-C-O7Iq84.mjs";
import "./plugins-BVrJdw4D.mjs";
import { t as captureChannelReadAuthority } from "./channel-read-authority-BBYW2wKk.mjs";
//#region src/infra/outbound/target-normalization.ts
const targetNormalizerCacheByChannelId = /* @__PURE__ */ new Map();
const preparedPluginSignatureIds = /* @__PURE__ */ new WeakMap();
let nextPreparedPluginSignatureId = 1;
function resolveChannelPluginForTargetRead(channelId) {
	return getLoadedChannelPluginForRead(channelId) ?? getChannelPlugin(channelId);
}
function stripPluginTargetPrefix(raw, plugin) {
	let target = raw.trim();
	const prefixes = [plugin.id, ...plugin.messaging?.targetPrefixes ?? []].map((prefix) => normalizeOptionalLowercaseString(String(prefix))).filter((prefix) => Boolean(prefix));
	while (target) {
		const lowered = normalizeOptionalLowercaseString(target) ?? "";
		const prefix = prefixes.find((candidate) => lowered.startsWith(`${candidate}:`));
		if (!prefix) return target;
		target = target.slice(prefix.length + 1).trim();
	}
	return target;
}
function resolveReservedTargetLiteral(params) {
	const raw = normalizeOptionalString(params.raw);
	const plugin = params.plugin;
	const reservedLiterals = plugin?.messaging?.targetResolver?.reservedLiterals;
	if (!raw || !plugin || !reservedLiterals?.length) return;
	const stripped = stripPluginTargetPrefix(raw, plugin);
	if (!stripped || /^[@#]/.test(stripped) || /^(channel|group|user):/i.test(stripped)) return;
	const normalized = normalizeOptionalLowercaseString(stripped);
	if (!normalized) return;
	return new Set(reservedLiterals.map(normalizeOptionalLowercaseString).filter((literal) => Boolean(literal))).has(normalized) ? normalized : void 0;
}
function resolveTargetNormalizer(channelId, preparedPlugin) {
	if (preparedPlugin) return preparedPlugin.messaging?.normalizeTarget;
	const version = getActivePluginChannelRegistryVersion();
	const cached = targetNormalizerCacheByChannelId.get(channelId);
	if (cached && cached.version === version) return cached.normalizer;
	const normalizer = resolveChannelPluginForTargetRead(channelId)?.messaging?.normalizeTarget;
	targetNormalizerCacheByChannelId.set(channelId, {
		version,
		normalizer
	});
	return normalizer;
}
function resolvePreparedPluginSignatureId(plugin) {
	const existing = preparedPluginSignatureIds.get(plugin);
	if (existing) return existing;
	const id = nextPreparedPluginSignatureId;
	nextPreparedPluginSignatureId += 1;
	preparedPluginSignatureIds.set(plugin, id);
	return id;
}
/**
* Applies a channel plugin normalizer and falls back to trimmed input.
*/
function normalizeTargetForProvider(provider, raw, plugin) {
	if (!raw) return;
	const fallback = normalizeOptionalString(raw);
	if (!fallback) return;
	const providerId = normalizeOptionalLowercaseString(provider);
	const normalizer = providerId ? resolveTargetNormalizer(providerId, plugin) : void 0;
	return normalizeOptionalString(normalizer?.(raw) ?? fallback);
}
/**
* Produces raw and provider-normalized forms of a nonblank target input.
*/
function resolveNormalizedTargetInput(provider, raw, plugin) {
	const trimmed = raw?.trim();
	if (!trimmed) return;
	return {
		raw: trimmed,
		normalized: normalizeTargetForProvider(provider, trimmed, plugin) ?? trimmed
	};
}
/**
* Detects whether input is specific enough to invoke plugin target resolution.
*/
function looksLikeTargetId(params) {
	const normalizedInput = params.normalized ?? normalizeTargetForProvider(params.channel, params.raw, params.plugin);
	const lookup = (params.plugin ?? resolveChannelPluginForTargetRead(params.channel))?.messaging?.targetResolver?.looksLikeId;
	if (lookup) return lookup(params.raw, normalizedInput ?? params.raw);
	return /^(channel|group|user|conversation):/i.test(params.raw) || /^[@#]/.test(params.raw) || /^\+?\d{6,}$/.test(params.raw) || params.raw.includes("@thread");
}
/**
* Resolves a normalized target through the channel plugin when a resolver is available.
*/
async function maybeResolvePluginMessagingTarget(params) {
	const normalizedInput = resolveNormalizedTargetInput(params.channel, params.input, params.plugin);
	if (!normalizedInput) return;
	const resolver = (params.plugin ?? resolveChannelPluginForTargetRead(params.channel))?.messaging?.targetResolver;
	if (!resolver?.resolveTarget) return;
	if (params.requireIdLike && !looksLikeTargetId({
		channel: params.channel,
		raw: normalizedInput.raw,
		normalized: normalizedInput.normalized,
		plugin: params.plugin
	})) return;
	captureChannelReadAuthority()?.();
	const resolved = await resolver.resolveTarget({
		cfg: params.cfg,
		accountId: params.accountId,
		input: normalizedInput.raw,
		normalized: normalizedInput.normalized,
		preferredKind: params.preferredKind
	});
	if (!resolved) return;
	return {
		to: resolved.to,
		kind: resolved.kind,
		display: resolved.display,
		source: resolved.source ?? "normalized",
		resolutionSource: "plugin"
	};
}
/**
* Builds a cache signature for target-resolution behavior exposed by a channel plugin.
*/
function buildTargetResolverSignature(channel, preparedPlugin) {
	const plugin = preparedPlugin ?? resolveChannelPluginForTargetRead(channel);
	const registryScope = preparedPlugin ? `prepared:${resolvePreparedPluginSignatureId(preparedPlugin)}` : "pinned";
	const resolver = plugin?.messaging?.targetResolver;
	const hint = resolver?.hint ?? "";
	const reserved = (resolver?.reservedLiterals ?? []).map(normalizeOptionalLowercaseString).filter((literal) => Boolean(literal)).toSorted().join(",");
	const looksLike = resolver?.looksLikeId;
	return hashSignature(`${registryScope}|${hint}|${reserved}|${looksLike ? looksLike.toString() : ""}`);
}
function hashSignature(value) {
	let hash = 5381;
	for (let i = 0; i < value.length; i += 1) hash = (hash << 5) + hash ^ value.charCodeAt(i);
	return (hash >>> 0).toString(36);
}
//#endregion
export { resolveNormalizedTargetInput as a, normalizeTargetForProvider as i, looksLikeTargetId as n, resolveReservedTargetLiteral as o, maybeResolvePluginMessagingTarget as r, buildTargetResolverSignature as t };
