import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { s as resolveBundledPluginsDir } from "./bundled-dir-D7bUjZsk.mjs";
import { n as listBundledChannelCatalogEntries } from "./bundled-channel-catalog-read-dhf_ivua.mjs";
import { n as CHAT_CHANNEL_ORDER } from "./ids-CVdkUIkO.mjs";
import { n as findRegisteredChannelPluginEntryById, r as listRegisteredChannelPluginEntries } from "./registry-lookup-Bsuj69mc.mjs";
import { t as buildManifestChannelMeta } from "./channel-meta-BgTks57p.mjs";
//#region src/channels/chat-meta-shared.ts
/**
* Built-in chat channel metadata builder.
*
* Converts bundled channel catalog entries into setup/status metadata records.
*/
const CHAT_CHANNEL_ID_SET = new Set(CHAT_CHANNEL_ORDER);
function toChatChannelMeta(params) {
	const label = normalizeOptionalString(params.channel.label);
	if (!label) throw new Error(`Missing label for bundled chat channel "${params.id}"`);
	return buildManifestChannelMeta({
		id: params.id,
		channel: params.channel,
		label,
		selectionLabel: normalizeOptionalString(params.channel.selectionLabel) || label,
		docsPath: normalizeOptionalString(params.channel.docsPath) || `/channels/${params.id}`,
		docsLabel: normalizeOptionalString(params.channel.docsLabel),
		blurb: normalizeOptionalString(params.channel.blurb) || "",
		detailLabel: normalizeOptionalString(params.channel.detailLabel),
		systemImage: normalizeOptionalString(params.channel.systemImage),
		arrayFieldMode: "non-empty"
	});
}
function buildChatChannelMetaById() {
	const entries = /* @__PURE__ */ new Map();
	for (const entry of listBundledChannelCatalogEntries()) {
		const rawId = normalizeOptionalString(entry.id);
		if (!rawId || !CHAT_CHANNEL_ID_SET.has(rawId)) continue;
		const id = rawId;
		entries.set(id, toChatChannelMeta({
			id,
			channel: entry.channel
		}));
	}
	return Object.freeze(Object.fromEntries(entries));
}
//#endregion
//#region src/channels/chat-meta.ts
/**
* Cached built-in chat channel metadata accessors.
*
* Provides ordered channel metadata for setup, status, and selection surfaces.
*/
let chatChannelMetaCache;
function getChatChannelMetaById() {
	const cacheKey = resolveBundledPluginsDir(process.env) ?? "";
	if (chatChannelMetaCache?.cacheKey !== cacheKey) chatChannelMetaCache = {
		cacheKey,
		metaById: buildChatChannelMetaById()
	};
	return chatChannelMetaCache.metaById;
}
/**
* Lists built-in chat channel metadata in configured display order.
*/
function listChatChannels() {
	const metaById = getChatChannelMetaById();
	return CHAT_CHANNEL_ORDER.map((id) => metaById[id]).filter((meta) => Boolean(meta));
}
/**
* Returns metadata for one built-in chat channel id.
*/
/** Drift-tolerant lookup: undefined when the id is missing from the bundled catalog. */
function findChatChannelMeta(id) {
	return getChatChannelMetaById()[id];
}
/**
* Returns metadata for one built-in chat channel id.
* Shipped plugin-SDK contract: callers pass bundled ids, so absence is an invariant
* violation; drift-tolerant core paths use findChatChannelMeta instead.
*/
function getChatChannelMeta(id) {
	return expectDefined(findChatChannelMeta(id), `chat channel meta for ${id}`);
}
//#endregion
//#region src/channels/registry.ts
/**
* Lists registered channel plugin ids without importing their runtime implementations.
*/
function listRegisteredChannelPluginIds() {
	return listRegisteredChannelPluginEntries().flatMap((entry) => {
		const id = normalizeOptionalString(entry.plugin.id);
		return id ? [id] : [];
	});
}
/**
* Returns lightweight channel metadata used by message formatting and capability checks.
*/
function getRegisteredChannelPluginMeta(id) {
	return findRegisteredChannelPluginEntryById(id)?.plugin.meta ?? null;
}
/**
* Formats a concise channel primer line for setup/status flows.
*/
function formatChannelPrimerLine(meta) {
	return `${meta.label}: ${meta.blurb}`;
}
/**
* Formats a docs-aware channel selection line for interactive setup prompts.
*/
function formatChannelSelectionLine(meta, docsLink) {
	const docsPrefix = meta.selectionDocsPrefix ?? "Docs:";
	const docsLabel = meta.docsLabel ?? meta.id;
	const docs = meta.selectionDocsOmitLabel ? docsLink(meta.docsPath) : docsLink(meta.docsPath, docsLabel);
	const extras = (meta.selectionExtras ?? []).filter(Boolean).join(" ");
	return `${meta.label} — ${meta.blurb} ${docsPrefix ? `${docsPrefix} ` : ""}${docs}${extras ? ` ${extras}` : ""}`;
}
//#endregion
export { findChatChannelMeta as a, listRegisteredChannelPluginIds as i, formatChannelSelectionLine as n, getChatChannelMeta as o, getRegisteredChannelPluginMeta as r, listChatChannels as s, formatChannelPrimerLine as t };
