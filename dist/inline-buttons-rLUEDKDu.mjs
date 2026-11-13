import { c as normalizeOptionalLowercaseString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import { r as listTelegramAccountIds } from "./accounts-CNK3nIbK.mjs";
import { r as inspectTelegramAccount } from "./account-inspect-BS5mY2sn.mjs";
import "./topic-conversation-b8gpxp5f.mjs";
//#region extensions/telegram/src/inline-buttons.ts
const DEFAULT_INLINE_BUTTONS_SCOPE = "allowlist";
function normalizeInlineButtonsScope(value) {
	const trimmed = normalizeOptionalLowercaseString(value);
	if (trimmed === "off" || trimmed === "dm" || trimmed === "group" || trimmed === "all" || trimmed === "allowlist") return trimmed;
}
function readInlineButtonsCapability(value) {
	if (!value || Array.isArray(value) || typeof value !== "object" || !("inlineButtons" in value)) return;
	return value.inlineButtons;
}
function resolveTelegramInlineButtonsConfigScope(capabilities) {
	return normalizeInlineButtonsScope(readInlineButtonsCapability(capabilities));
}
function resolveTelegramInlineButtonsScopeFromCapabilities(capabilities) {
	if (!capabilities) return DEFAULT_INLINE_BUTTONS_SCOPE;
	if (Array.isArray(capabilities)) {
		if (capabilities.length === 0) return DEFAULT_INLINE_BUTTONS_SCOPE;
		return capabilities.some((entry) => normalizeLowercaseStringOrEmpty(String(entry)) === "inlinebuttons") ? "all" : "off";
	}
	if (typeof capabilities === "object") return resolveTelegramInlineButtonsConfigScope(capabilities) ?? DEFAULT_INLINE_BUTTONS_SCOPE;
	return DEFAULT_INLINE_BUTTONS_SCOPE;
}
function resolveTelegramInlineButtonsScope(params) {
	return resolveTelegramInlineButtonsScopeFromCapabilities(inspectTelegramAccount({
		cfg: params.cfg,
		accountId: params.accountId
	}).config.capabilities);
}
function isTelegramInlineButtonsEnabled(params) {
	if (params.accountId) return resolveTelegramInlineButtonsScope(params) !== "off";
	const accountIds = listTelegramAccountIds(params.cfg);
	if (accountIds.length === 0) return resolveTelegramInlineButtonsScope(params) !== "off";
	return accountIds.some((accountId) => resolveTelegramInlineButtonsScope({
		cfg: params.cfg,
		accountId
	}) !== "off");
}
//#endregion
export { resolveTelegramInlineButtonsScopeFromCapabilities as i, resolveTelegramInlineButtonsConfigScope as n, resolveTelegramInlineButtonsScope as r, isTelegramInlineButtonsEnabled as t };
