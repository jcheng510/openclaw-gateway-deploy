import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { u as normalizeVerboseLevel } from "./thinking.shared-Dc3B6FDH.mjs";
import { i as buildModelAliasIndex, v as resolveModelRefFromString } from "./model-selection-shared-dOoB6UQS.mjs";
import { t as resolveDefaultModelForAgent } from "./model-selection-config-rcK5tFX8.mjs";
import { a as resolveCoreToolProfilePolicy } from "./tool-catalog-D1rzNkvG.mjs";
import { o as isToolAllowedByPolicies } from "./tool-policy-match-COwlx5YS.mjs";
import { l as mergeAlsoAllowPolicy } from "./tool-policy-C57wduz9.mjs";
import "./message-channel-constants-Dq-VU_KZ.mjs";
import "./message-channel-DDiCYM9I.mjs";
import { t as normalizeChatType } from "./chat-type-Dw-QySg9.mjs";
import { r as logVerbose } from "./globals-ChjEJkWj.mjs";
import "./thinking-hj_KWR0q.mjs";
import "./model-selection-BAezv3YH.mjs";
import { h as resolveSessionPinnedHarnessId } from "./agent-harness-session-key-BypxcwJ7.mjs";
import { i as resolveSessionRuntimeOverrideForProvider } from "./session-runtime-compat-XDo2BOLz.mjs";
import { n as sessionDeliveryChannel, r as sessionDeliveryOrigin, t as deliveryContextFromSession } from "./delivery-context.read-CR06zOJ4.mjs";
import { r as resolveGroupSessionKey } from "./group-CFZ0UG5F.mjs";
import { c as loadSessionEntryReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { a as isNativeCommandTurn, c as resolveCommandTurnContext } from "./command-turn-context-CSgWM9bZ.mjs";
import { s as resolveSubagentCapabilityStore, t as isSubagentEnvelopeSession } from "./subagent-capabilities-C-BoOoUd.mjs";
import { a as resolveSubagentToolPolicyForSession, i as resolveInheritedToolPolicyForSession, n as resolveEffectiveToolPolicy, r as resolveGroupToolPolicy } from "./agent-tools.policy-EL9_7uA2.mjs";
import "./internal-hooks-C3e5o6Hw.mjs";
import { n as resolveAgentHarnessDeliveryDefaults } from "./selection-decision-CgiQJFvc.mjs";
import { t as resolveChannelModelOverride } from "./model-overrides-yR5W4Yp7.mjs";
import { n as resolveStoredModelOverride } from "./stored-model-overrides-FHu3r-Hz.mjs";
import { t as resolveOriginMessageProvider } from "./origin-routing-B4z8Pt1m.mjs";
import { i as resolveSourceReplyDeliveryMode } from "./source-reply-delivery-mode-e82qWm8O.mjs";
//#region src/auto-reply/reply/dispatch-from-config.runtime.ts
/** Runtime-only dispatch dependencies shared by config-driven reply delivery. */
function loadSessionStoreEntry(params) {
	return loadSessionEntryReadOnly(params);
}
//#endregion
//#region src/auto-reply/reply/dispatch-from-config.harness-defaults.ts
function createShouldEmitVerboseProgress(params) {
	let runVerbosity;
	const resolveCurrentExplicitLevel = () => {
		if (params.sessionKey && params.storePath) try {
			const entry = loadSessionStoreEntry({
				...params.agentId ? { agentId: params.agentId } : {},
				storePath: params.storePath,
				sessionKey: params.sessionKey,
				readConsistency: "latest",
				clone: false
			});
			return normalizeVerboseLevel(entry?.verboseLevel ?? "");
		} catch {}
		return normalizeVerboseLevel(params.initialExplicitLevel ?? "");
	};
	const resolveLevel = () => runVerbosity?.verboseLevelOverride ?? resolveCurrentExplicitLevel() ?? runVerbosity?.resolvedVerboseLevel ?? normalizeVerboseLevel(params.fallbackLevel) ?? "off";
	return {
		noteRunVerbosity: (settings) => {
			runVerbosity = settings;
		},
		shouldEmit: () => resolveLevel() !== "off",
		shouldEmitFull: () => resolveLevel() === "full"
	};
}
function resolveTurnModelOverride(replyOptions) {
	if (replyOptions?.isHeartbeat !== true) return;
	return normalizeOptionalString(replyOptions.heartbeatModelOverride);
}
function resolveChannelModelCandidate(params) {
	if (!params.cfg.channels?.modelByChannel) return;
	const originatingChannel = typeof params.ctx.OriginatingChannel === "string" ? params.ctx.OriginatingChannel : void 0;
	const channelModelOverride = resolveChannelModelOverride({
		cfg: params.cfg,
		channel: sessionDeliveryChannel(params.entry) ?? originatingChannel ?? params.ctx.Provider ?? params.ctx.Surface,
		groupId: params.entry?.groupId,
		groupChatType: params.entry?.chatType ?? params.ctx.ChatType,
		groupChannel: params.entry?.groupChannel ?? params.ctx.GroupChannel,
		groupSubject: params.entry?.subject ?? params.ctx.GroupSubject,
		parentSessionKey: params.parentSessionKey,
		directUserIds: [
			sessionDeliveryOrigin(params.entry)?.nativeDirectUserId,
			sessionDeliveryOrigin(params.entry)?.from,
			sessionDeliveryOrigin(params.entry)?.to,
			params.ctx.OriginatingTo,
			params.ctx.From,
			params.ctx.SenderId
		]
	});
	if (!channelModelOverride) return;
	return resolveModelRefFromString({
		raw: channelModelOverride.model,
		defaultProvider: params.defaultProvider,
		aliasIndex: params.aliasIndex
	})?.ref;
}
function resolveStoredModelCandidate(params) {
	const storedModelRef = resolveStoredModelOverride({
		loadSessionEntry: (sessionKey) => {
			const agentId = resolveSessionAgentId({
				sessionKey,
				config: params.cfg,
				fallbackAgentId: params.sessionAgentId
			});
			return loadSessionStoreEntry({
				agentId,
				storePath: resolveSessionStorePathCore(params.cfg.session?.store, { agentId }),
				sessionKey,
				readConsistency: "latest",
				clone: false
			});
		},
		sessionEntry: params.entry,
		sessionStore: params.sessionStore,
		sessionKey: params.sessionKey,
		parentSessionKey: params.parentSessionKey,
		defaultProvider: params.defaultProvider
	});
	if (!storedModelRef) return;
	return {
		provider: storedModelRef.provider ?? params.defaultProvider,
		model: storedModelRef.model
	};
}
/**
* Resolves the configured visible-replies mode plus the guarded harness
* default. One owner for dispatch and synthetic-turn binding facts: both must
* derive the same session-stable delivery mode or CLI session bindings
* ping-pong across turn kinds (#121485).
*/
function resolveVisibleRepliesPolicy(params) {
	const configuredVisibleReplies = params.chatType === "group" || params.chatType === "channel" ? params.cfg.messages?.groupChat?.visibleReplies ?? params.cfg.messages?.visibleReplies : params.cfg.messages?.visibleReplies;
	return {
		configuredVisibleReplies,
		harnessDefaultVisibleReplies: configuredVisibleReplies === void 0 && params.chatType !== "group" && params.chatType !== "channel" ? resolveHarnessSourceVisibleRepliesDefault({
			cfg: params.cfg,
			ctx: params.ctx,
			entry: params.entry,
			sessionAgentId: params.sessionAgentId,
			sessionKey: params.sessionKey,
			sessionStore: params.sessionStore,
			turnModelOverride: params.turnModelOverride
		}) : void 0
	};
}
function resolveHarnessSourceVisibleRepliesDefault(params) {
	if (isNativeCommandTurn(resolveCommandTurnContext(params.ctx))) return;
	try {
		const defaultModelRef = resolveDefaultModelForAgent({
			cfg: params.cfg,
			agentId: params.sessionAgentId
		});
		const aliasIndex = buildModelAliasIndex({
			cfg: params.cfg,
			agentId: params.sessionAgentId,
			defaultProvider: defaultModelRef.provider
		});
		const parentSessionKey = params.entry?.parentSessionKey ?? params.ctx.ModelParentSessionKey ?? params.ctx.ParentSessionKey;
		const channelModelCandidate = resolveChannelModelCandidate({
			aliasIndex,
			cfg: params.cfg,
			ctx: params.ctx,
			defaultProvider: defaultModelRef.provider,
			entry: params.entry,
			parentSessionKey
		});
		const storedModelCandidate = resolveStoredModelCandidate({
			cfg: params.cfg,
			defaultProvider: defaultModelRef.provider,
			entry: params.entry,
			parentSessionKey,
			sessionAgentId: params.sessionAgentId,
			sessionKey: params.sessionKey,
			sessionStore: params.sessionStore
		});
		const turnModelCandidate = params.turnModelOverride ? resolveModelRefFromString({
			raw: params.turnModelOverride,
			defaultProvider: defaultModelRef.provider,
			aliasIndex
		})?.ref : void 0;
		const resolveCandidateDefault = (candidate) => {
			const agentHarnessRuntimeOverride = resolveSessionRuntimeOverrideForProvider({
				provider: candidate.provider,
				entry: params.entry,
				cfg: params.cfg
			});
			const defaults = resolveAgentHarnessDeliveryDefaults({
				provider: candidate.provider,
				modelId: candidate.model,
				config: params.cfg,
				agentId: params.sessionAgentId,
				sessionKey: params.sessionKey,
				agentHarnessId: resolveSessionPinnedHarnessId(params.entry),
				agentHarnessRuntimeOverride
			});
			return defaults?.visibleReplies ?? defaults?.sourceVisibleReplies;
		};
		const selectedModelCandidate = turnModelCandidate ?? storedModelCandidate ?? channelModelCandidate;
		if (selectedModelCandidate) return resolveCandidateDefault(selectedModelCandidate);
		const sourceProvider = normalizeOptionalString(sessionDeliveryOrigin(params.entry)?.provider ?? params.ctx.Provider ?? params.ctx.Surface);
		if (sourceProvider) {
			const sourceDefault = resolveCandidateDefault({ provider: sourceProvider });
			if (sourceDefault) return sourceDefault;
		}
		return resolveCandidateDefault(defaultModelRef);
	} catch (error) {
		logVerbose(`dispatch-from-config: could not resolve harness visible-reply defaults: ${formatErrorMessage(error)}`);
		return;
	}
}
//#endregion
//#region src/auto-reply/reply/session-stable-reply-mode.ts
/**
* Resolves the session's stable source-reply mode the way dispatch does, from
* a synthetic turn's restored context plus persisted session facts. Synthetic
* turns keep their effective delivery mode, but CLI session reuse belongs to
* the session's normal source-reply policy — every turn kind must derive the
* same messageToolPolicyHash, or chat and heartbeat turns ping-pong the CLI
* binding on each transition (#121485).
*/
function resolveSessionStableReplyMode(params) {
	const { cfg, ctx, sessionEntry } = params;
	const chatType = normalizeChatType(ctx.ChatType) ?? normalizeChatType(sessionEntry.chatType) ?? void 0;
	const stableReplyContext = {
		CommandAuthorized: false,
		ChatType: chatType,
		Provider: normalizeOptionalString(ctx.Provider) ?? sessionDeliveryOrigin(sessionEntry)?.provider ?? "webchat",
		Surface: normalizeOptionalString(ctx.Surface) ?? sessionDeliveryChannel(sessionEntry),
		ExplicitDeliverRoute: ctx.ExplicitDeliverRoute
	};
	const { harnessDefaultVisibleReplies } = resolveVisibleRepliesPolicy({
		cfg,
		chatType,
		ctx,
		entry: sessionEntry,
		sessionAgentId: params.sessionAgentId,
		sessionKey: params.sessionKey,
		sessionStore: params.sessionStore,
		turnModelOverride: params.turnModelOverride
	});
	const candidateMode = resolveSourceReplyDeliveryMode({
		cfg,
		ctx: stableReplyContext,
		defaultVisibleReplies: harnessDefaultVisibleReplies
	});
	if (candidateMode !== "message_tool_only") return candidateMode;
	return resolveStableMessageToolAvailability(params) ? candidateMode : "automatic";
}
/**
* Sender-independent message-tool availability for the session-stable mode.
* One owner for dispatch's stable-mode downgrade and synthetic-turn binding
* facts: sender-scoped denials apply to the sender's turn, never to the
* session policy every turn kind must hash identically (#121485).
*/
function resolveStableMessageToolAvailability(params) {
	const { cfg, ctx, sessionEntry } = params;
	const { globalPolicy, globalProviderPolicy, agentPolicy, agentProviderPolicy, profile, providerProfile, profileAlsoAllow, providerProfileAlsoAllow } = resolveEffectiveToolPolicy({
		config: cfg,
		sessionKey: params.sessionKey,
		agentId: params.sessionAgentId
	});
	const profilePolicy = mergeAlsoAllowPolicy(resolveCoreToolProfilePolicy(profile), [...profileAlsoAllow ?? [], "message"]);
	const providerProfilePolicy = mergeAlsoAllowPolicy(resolveCoreToolProfilePolicy(providerProfile), [...providerProfileAlsoAllow ?? [], "message"]);
	const groupPolicy = resolveGroupToolPolicy({
		config: cfg,
		sessionKey: params.sessionKey,
		messageProvider: resolveOriginMessageProvider({
			originatingChannel: ctx.OriginatingChannel ?? (sessionEntry ? sessionDeliveryChannel(sessionEntry) : void 0),
			provider: normalizeOptionalString(ctx.Provider ?? ctx.Surface) ?? (sessionEntry ? sessionDeliveryOrigin(sessionEntry)?.provider : void 0)
		}),
		groupId: resolveGroupSessionKey(ctx)?.id ?? sessionEntry?.groupId,
		groupChannel: normalizeOptionalString(ctx.GroupChannel) ?? normalizeOptionalString(ctx.GroupSubject) ?? normalizeOptionalString(sessionEntry?.groupChannel) ?? normalizeOptionalString(sessionEntry?.subject),
		groupSpace: normalizeOptionalString(ctx.GroupSpace),
		accountId: ctx.AccountId ?? (sessionEntry ? deliveryContextFromSession(sessionEntry)?.accountId : void 0)
	});
	const subagentStore = resolveSubagentCapabilityStore(params.sessionKey, { cfg });
	const subagentPolicy = params.sessionKey && isSubagentEnvelopeSession(params.sessionKey, {
		cfg,
		store: subagentStore
	}) ? resolveSubagentToolPolicyForSession(cfg, params.sessionKey, { store: subagentStore }) : void 0;
	const inheritedToolPolicy = resolveInheritedToolPolicyForSession(cfg, params.sessionKey, { store: subagentStore });
	return isToolAllowedByPolicies("message", [
		profilePolicy,
		providerProfilePolicy,
		globalProviderPolicy,
		agentProviderPolicy,
		globalPolicy,
		agentPolicy,
		groupPolicy,
		subagentPolicy,
		inheritedToolPolicy
	]);
}
//#endregion
export { resolveVisibleRepliesPolicy as a, resolveTurnModelOverride as i, resolveStableMessageToolAvailability as n, loadSessionStoreEntry as o, createShouldEmitVerboseProgress as r, resolveSessionStableReplyMode as t };
