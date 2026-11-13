import { Et as _enum, Fn as object, Jn as string, Lt as boolean, Nt as array, Pn as number, Un as record, or as union, xn as literal } from "./schemas-BOYIvvln.mjs";
import { I as MentionPatternsPolicySchema, P as DmConfigSchema, a as ContextVisibilityModeSchema, b as TextChunkModeSchema, c as GroupPolicySchema, g as ReplyToModeSchema, i as ChannelStreamingBlockSchema, o as DmPolicySchema, p as MarkdownConfigSchema, r as ChannelDeliveryStreamingConfigSchema, t as BlockStreamingChunkSchema } from "./zod-schema.core-BwZ4os81.mjs";
import "./zod-schema.agent-runtime-BVnAAfQo.mjs";
import { n as ChannelHealthMonitorSchema, o as NativeExecApprovalEnableModeSchema, r as ChannelHeartbeatVisibilitySchema } from "./zod-schema.implicit-mentions-D-t-tYKa.mjs";
import "./config-schema-BvxvK-vW.mjs";
//#region src/config/zod-schema.channel-messaging-common.ts
const UnifiedStreamingModeSchema = _enum([
	"off",
	"partial",
	"block",
	"progress"
]);
const ChannelStreamingPreviewSchema = object({
	chunk: BlockStreamingChunkSchema.optional(),
	toolProgress: boolean().optional(),
	commandText: _enum(["raw", "status"]).optional()
}).strict();
const ChannelStreamingProgressSchema = object({
	label: union([string(), literal(false)]).optional(),
	labels: array(string()).optional(),
	maxLines: number().int().positive().optional(),
	maxLineChars: number().int().positive().optional(),
	toolProgress: boolean().optional(),
	commandText: _enum(["raw", "status"]).optional(),
	commentary: boolean().optional(),
	narration: boolean().optional()
}).strict();
const ChannelPreviewStreamingConfigSchema = object({
	mode: UnifiedStreamingModeSchema.optional(),
	chunkMode: TextChunkModeSchema.optional(),
	preview: ChannelStreamingPreviewSchema.optional(),
	progress: ChannelStreamingProgressSchema.optional(),
	block: ChannelStreamingBlockSchema.optional()
}).strict();
const CommonCapabilitiesSchema = array(string()).optional();
const CommonIdListSchema = array(union([string(), number()])).optional();
const CommonDefaultToSchema = string().optional();
const CommonMentionPatternsSchema = MentionPatternsPolicySchema.optional();
const CommonStreamingSchema = ChannelDeliveryStreamingConfigSchema.optional();
const CommonMediaMaxMbSchema = number().positive().optional();
const CommonReplyToModeSchema = ReplyToModeSchema.optional();
const ChannelAccountPolicyDefaults = {
	dmPolicy: DmPolicySchema.optional().default("pairing"),
	groupPolicy: GroupPolicySchema.optional().default("allowlist")
};
/** Canonical optional account contract shared by bundled messaging channels. */
const CommonChannelAccountSchema = object({
	name: string().optional(),
	capabilities: CommonCapabilitiesSchema,
	markdown: MarkdownConfigSchema,
	configWrites: boolean().optional(),
	enabled: boolean().optional(),
	dmPolicy: DmPolicySchema.optional(),
	allowFrom: CommonIdListSchema,
	defaultTo: CommonDefaultToSchema,
	groupAllowFrom: CommonIdListSchema,
	groupPolicy: GroupPolicySchema.optional(),
	mentionPatterns: CommonMentionPatternsSchema,
	contextVisibility: ContextVisibilityModeSchema.optional(),
	historyLimit: number().int().min(0).optional(),
	dmHistoryLimit: number().int().min(0).optional(),
	dms: record(string(), DmConfigSchema.optional()).optional(),
	textChunkLimit: number().int().positive().optional(),
	streaming: CommonStreamingSchema,
	heartbeatVisibility: ChannelHeartbeatVisibilitySchema,
	healthMonitor: ChannelHealthMonitorSchema,
	responsePrefix: string().optional(),
	mediaMaxMb: CommonMediaMaxMbSchema,
	replyToMode: CommonReplyToModeSchema
}).strict();
/** Build optional account leaves and separate root-only policy defaults. */
function buildChannelAccountSchemaParts(options = {}) {
	const shape = {
		...CommonChannelAccountSchema.shape,
		capabilities: options.capabilities ?? CommonCapabilitiesSchema,
		allowFrom: options.allowFrom ?? CommonIdListSchema,
		defaultTo: options.defaultTo ?? CommonDefaultToSchema,
		groupAllowFrom: options.groupAllowFrom ?? CommonIdListSchema,
		mentionPatterns: options.mentionPatterns ?? CommonMentionPatternsSchema,
		streaming: options.streaming ?? CommonStreamingSchema,
		mediaMaxMb: options.mediaMaxMb ?? CommonMediaMaxMbSchema,
		replyToMode: options.replyToMode ?? CommonReplyToModeSchema
	};
	const omitted = new Set(options.omit ?? []);
	return {
		accountShape: Object.fromEntries(Object.entries(shape).filter(([key]) => !omitted.has(key))),
		rootPolicyShape: ChannelAccountPolicyDefaults
	};
}
const ChannelDangerouslyAllowNameMatchingSchema = boolean().optional();
const ChannelSendReadReceiptsSchema = boolean().optional();
function buildChannelAllowBotsSchema(options) {
	return options?.allowMentions ? union([boolean(), literal("mentions")]).optional() : boolean().optional();
}
/** Build native exec-approval routing with channel-specific approver ids and extras. */
function buildChannelExecApprovalsSchema(approverSchema, extraShape) {
	return object({
		enabled: NativeExecApprovalEnableModeSchema.optional(),
		approvers: array(approverSchema).optional(),
		agentFilter: array(string()).optional(),
		sessionFilter: array(string()).optional(),
		target: _enum([
			"dm",
			"channel",
			"both"
		]).optional(),
		...extraShape ?? {}
	}).strict().optional();
}
/** Build the repeated reaction leaves while retaining each channel's exact enum. */
function buildChannelReactionShape(options) {
	return {
		...options.notificationModes ? { reactionNotifications: _enum(options.notificationModes).optional() } : {},
		...options.reactionAllowlist ? { reactionAllowlist: array(union([string(), number()])).optional() } : {},
		...options.reactionLevels ? { reactionLevel: _enum(options.reactionLevels).optional() } : {},
		...options.ackReaction ? { ackReaction: options.ackReaction } : {}
	};
}
//#endregion
export { ChannelStreamingProgressSchema as a, buildChannelAllowBotsSchema as c, ChannelStreamingPreviewSchema as i, buildChannelExecApprovalsSchema as l, ChannelPreviewStreamingConfigSchema as n, UnifiedStreamingModeSchema as o, ChannelSendReadReceiptsSchema as r, buildChannelAccountSchemaParts as s, ChannelDangerouslyAllowNameMatchingSchema as t, buildChannelReactionShape as u };
