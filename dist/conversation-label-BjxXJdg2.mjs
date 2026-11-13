import { l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { t as normalizeChatType } from "./chat-type-Dw-QySg9.mjs";
//#region src/channels/conversation-label.ts
/**
* Conversation label resolver.
*
* Builds readable labels from inbound context while preserving useful id disambiguators.
*/
function extractConversationId(from) {
	const trimmed = normalizeOptionalString(from);
	if (!trimmed) return;
	const parts = trimmed.split(":").filter(Boolean);
	return parts.length > 0 ? parts[parts.length - 1] : trimmed;
}
function shouldAppendId(id) {
	return /^[0-9]+$/.test(id) || /^[^\s:@]+@[^\s:@]+$/.test(id);
}
/**
* Resolves the most readable conversation label from normalized inbound message context.
*/
function resolveConversationLabel(ctx) {
	const explicit = normalizeOptionalString(ctx.ConversationLabel);
	if (explicit) return explicit;
	const threadLabel = normalizeOptionalString(ctx.ThreadLabel);
	if (threadLabel) return threadLabel;
	if (normalizeChatType(ctx.ChatType) === "direct") return normalizeOptionalString(ctx.SenderName) ?? normalizeOptionalString(ctx.From);
	const base = normalizeOptionalString(ctx.GroupChannel) || normalizeOptionalString(ctx.GroupSubject) || normalizeOptionalString(ctx.GroupSpace) || normalizeOptionalString(ctx.From) || "";
	if (!base) return;
	const id = extractConversationId(ctx.From);
	if (!id) return base;
	if (!shouldAppendId(id)) return base;
	if (base.includes(id)) return base;
	if (normalizeLowercaseStringOrEmpty(base).includes(" id:")) return base;
	if (base.startsWith("#") || base.startsWith("@")) return base;
	return `${base} id:${id}`;
}
//#endregion
export { resolveConversationLabel as t };
