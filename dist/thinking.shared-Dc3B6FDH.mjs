import { c as normalizeOptionalLowercaseString } from "./string-coerce-6kR-86XC.mjs";
const THINKING_LEVELS_HELP = [
	"off",
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
	"adaptive",
	"max",
	"ultra"
].join("|");
const BASE_THINKING_LEVELS = [
	"off",
	"minimal",
	"low",
	"medium",
	"high"
];
const THINKING_LEVEL_RANKS = {
	off: 0,
	minimal: 10,
	low: 20,
	medium: 30,
	high: 40,
	adaptive: 30,
	xhigh: 60,
	max: 70,
	ultra: 80
};
/** Normalizes user-provided thinking level strings to the canonical enum. */
function normalizeThinkLevel(raw) {
	const key = normalizeOptionalLowercaseString(raw);
	if (!key) return;
	const collapsed = key.replace(/[\s_-]+/g, "");
	if (collapsed === "adaptive" || collapsed === "auto") return "adaptive";
	if (collapsed === "max" || collapsed === "maximum") return "max";
	if (collapsed === "ultra") return "ultra";
	if (collapsed === "xhigh" || collapsed === "extrahigh") return "xhigh";
	if (["off", "none"].includes(key)) return "off";
	if ([
		"on",
		"enable",
		"enabled"
	].includes(key)) return "low";
	if (["min", "minimal"].includes(key)) return "minimal";
	if ([
		"low",
		"thinkhard",
		"think-hard",
		"think_hard"
	].includes(key)) return "low";
	if ([
		"mid",
		"med",
		"medium",
		"thinkharder",
		"think-harder",
		"harder"
	].includes(key)) return "medium";
	if ([
		"high",
		"ultrathink",
		"thinkhardest",
		"highest"
	].includes(key)) return "high";
	if (["think"].includes(key)) return "minimal";
}
/** Returns true for command values that clear an inherited session override. */
function isSessionDefaultDirectiveValue(raw) {
	const key = normalizeOptionalLowercaseString(raw);
	if (!key) return false;
	return [
		"default",
		"inherit",
		"inherited",
		"clear",
		"reset",
		"unpin"
	].includes(key);
}
function normalizeAliasedLevel(raw, aliases) {
	const key = normalizeOptionalLowercaseString(raw);
	return key ? aliases.find((group) => group.includes(key))?.[0] : void 0;
}
/** Normalizes /verbose values. */
function normalizeVerboseLevel(raw) {
	return normalizeAliasedLevel(raw, [
		[
			"off",
			"false",
			"no",
			"0"
		],
		[
			"full",
			"all",
			"everything"
		],
		[
			"on",
			"minimal",
			"true",
			"yes",
			"1"
		]
	]);
}
/** Normalizes /trace values. */
function normalizeTraceLevel(raw) {
	return normalizeAliasedLevel(raw, [
		[
			"off",
			"false",
			"no",
			"0"
		],
		[
			"on",
			"true",
			"yes",
			"1"
		],
		["raw", "unfiltered"]
	]);
}
/** Normalizes response usage display values. */
function normalizeUsageDisplay(raw) {
	return normalizeAliasedLevel(raw, [
		[
			"off",
			"false",
			"no",
			"0",
			"disable",
			"disabled"
		],
		[
			"tokens",
			"token",
			"tok",
			"minimal",
			"min",
			"on",
			"true",
			"yes",
			"1",
			"enable",
			"enabled"
		],
		["full", "session"]
	]);
}
/** Resolves response usage display mode with the persisted default. */
function resolveResponseUsageMode(raw) {
	return normalizeUsageDisplay(raw) ?? "off";
}
function resolveMessagesResponseUsageDefault(configured, channel) {
	if (typeof configured === "string") return configured;
	if (configured && typeof configured === "object") return (channel ? configured[channel] : void 0) ?? configured.default;
}
function resolveEffectiveResponseUsage(sessionRaw, configured, channel) {
	const sessionNormalized = normalizeUsageDisplay(sessionRaw);
	if (sessionNormalized !== void 0) return sessionNormalized;
	return resolveResponseUsageMode(resolveMessagesResponseUsageDefault(configured, channel));
}
/** Normalizes elevated execution policy values. */
function normalizeElevatedLevel(raw) {
	return normalizeAliasedLevel(raw, [
		[
			"off",
			"false",
			"no",
			"0"
		],
		[
			"full",
			"auto",
			"auto-approve",
			"autoapprove"
		],
		[
			"ask",
			"prompt",
			"approval",
			"approve"
		],
		[
			"on",
			"true",
			"yes",
			"1"
		]
	]);
}
/** Normalizes reasoning visibility values. */
function normalizeReasoningLevel(raw) {
	return normalizeAliasedLevel(raw, [
		[
			"off",
			"false",
			"no",
			"0",
			"hide",
			"hidden",
			"disable",
			"disabled"
		],
		[
			"on",
			"true",
			"yes",
			"1",
			"show",
			"visible",
			"enable",
			"enabled"
		],
		[
			"stream",
			"streaming",
			"draft",
			"live"
		]
	]);
}
//#endregion
export { normalizeElevatedLevel as a, normalizeTraceLevel as c, resolveEffectiveResponseUsage as d, resolveResponseUsageMode as f, isSessionDefaultDirectiveValue as i, normalizeUsageDisplay as l, THINKING_LEVELS_HELP as n, normalizeReasoningLevel as o, THINKING_LEVEL_RANKS as r, normalizeThinkLevel as s, BASE_THINKING_LEVELS as t, normalizeVerboseLevel as u };
