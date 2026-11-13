import { c as normalizeOptionalLowercaseString, l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { j as resolveIntegerOption, s as asFiniteNumber } from "./number-coercion-Dq1l5muL.mjs";
import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { n as sliceUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { r as isMissingPathError } from "./errno-FR4CRyya.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { i as getNodeSqliteKysely, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { t as coerceRequiredSqliteNumber } from "./sqlite-number-DZt1m75H.mjs";
import { r as normalizeAgentIdStrict } from "./agent-id-D1-Q6vR4.mjs";
import { o as resolveAgentEntry, r as resolveAgentConfig } from "./agent-scope-config-Dm6T00l4.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey, S as isSubagentSessionKey, c as normalizeOptionalAgentId, l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { n as normalizeAccountId } from "./account-id-CW6dlabA.mjs";
import { i as listAgentIds, n as listAgentEntries } from "./agent-roster-B45JERT5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { t as splitTrailingAuthProfile } from "./model-ref-profile-BIKs-96s.mjs";
import { g as resolveSessionAgentId, v as resolveSessionAgentIds } from "./agent-scope-L_eY3Hj7.mjs";
import { p as onAgentEventForRun } from "./agent-events-Cg4kQnvf.mjs";
import { t as parseDurationMs } from "./parse-duration-CBHJ2Wxa.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { d as runOpenClawAgentWriteTransaction } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { r as logVerbose } from "./globals-ChjEJkWj.mjs";
import { t as getGlobalHookRunner } from "./hook-runner-global-CwCyBBBr.mjs";
import { r as hasDeliveryTargetFields } from "./delivery-context.shared-CMOBtTen.mjs";
import { p as requestSessionEventWake, s as areSessionEventWakesEnabled } from "./heartbeat-wake-CW-obKf9.mjs";
import { o as resolveSystemEventQueueKey } from "./system-event-ownership-Bp0P_EZz.mjs";
import { i as enqueueSystemEvent } from "./system-events-DzT7qucG.mjs";
import { n as isExecutionIdentityCollectionEnabled } from "./audit-config-BXFCjLO0.mjs";
import { r as resolveChannelAccountEntry } from "./account-lookup-MX6n1-rM.mjs";
import { n as formatThinkingLevels } from "./thinking-hj_KWR0q.mjs";
import { n as resolveConfiguredSubagentSpawnModelSelection } from "./model-selection-BAezv3YH.mjs";
import { r as resolveThinkingDefaultCore } from "./model-thinking-default-C5zCCiYw.mjs";
import { t as deliveryContextFromSession } from "./delivery-context.read-CR06zOJ4.mjs";
import { i as inheritSessionGitContributorProfileIds, n as buildSessionCreationStamp } from "./session-entry-provenance-BWZtrWXT.mjs";
import { t as listSessionEntriesReadOnly } from "./session-accessor.sqlite-entry-list.read-6sJ8GFrX.mjs";
import "./heartbeat-D29f7BeR.mjs";
import { g as runExclusiveSessionLifecycleMutation } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import { a as normalizeAssistantPhase } from "./chat-message-content-C28ajso0.mjs";
import { c as loadSessionEntryReadOnly, s as loadSessionEntry, y as upsertSessionEntryCore } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { i as resolveSessionTranscriptRuntimeTarget } from "./session-accessor.transcript-target-Bb5PwcvU.mjs";
import { s as withSessionEntryReadOnlyInWorker } from "./session-entry-read-runtime-e6OehipM.mjs";
import { m as recordSubagentSpawned } from "./session-state-events-DxrQGYa3.mjs";
import { i as resolveAcpThreadSessionDetailLines, n as resolveAcpSessionCwd } from "./session-identifiers-BA-B9pR8.mjs";
import { l as isAcpOwnerRepairRequired, n as getAcpSessionManager } from "./manager-B85OKKGa.mjs";
import { n as listActiveAcpSessionsForOwner } from "./active-turns-C8VR0agY.mjs";
import { t as getAcpRuntimeBackend } from "./registry-xlVr1Zxc.mjs";
import { n as readAcpSessionMeta } from "./session-meta-C-yU0zLz.mjs";
import { d as formatAcpInheritedToolAllowError, f as formatAcpInheritedToolDenyError, l as findAcpUnsupportedInheritedToolAllow, m as inheritedToolDenyPatch, p as inheritedToolAllowPatch, s as resolveSubagentCapabilityStore, t as isSubagentEnvelopeSession, u as findAcpUnsupportedInheritedToolDeny } from "./subagent-capabilities-C-BoOoUd.mjs";
import { E as resolveInboundConversationResolution, S as isSessionBindingError, t as getSessionBindingService } from "./session-binding-service-Cm-tIhAJ.mjs";
import { n as resolveSandboxRuntimeStatus } from "./runtime-status-DhbVLtao.mjs";
import { D as resolveChannelStreamingProgressCommentary, z as truncateUtf16WithEllipsis } from "./streaming-DELQpW3p.mjs";
import { i as scopedHeartbeatWakeOptionsForPolicy, n as resolveEventSessionRoutingPolicy, t as resolveEventSessionKeyForPolicy } from "./event-session-routing-DKtD3QRJ.mjs";
import { a as getInProcessGatewayToolContext, c as runWithGatewayToolCleanupContext, r as callInProcessGatewayTool } from "./in-process-gateway-D3MPtHXl.mjs";
import { c as readGatewayRunId, d as buildSubagentExecutionSessionSpawnContext, f as withSubagentGatewayExecutionIdentity, s as callSubagentGateway, u as resolveGatewaySessionStoreTargetInWorker } from "./subagent-spawn-cleanup-Dooi9-Qf.mjs";
import { s as getSubagentRunByChildSessionKey } from "./subagent-registry-read-DgbIKTmN.mjs";
import { t as AGENT_LANE_SUBAGENT } from "./lanes-BJoXx6GG.mjs";
import { _ as readParentExecutionIdentity, a as splitModelRef, c as mintSpawnSessionKey, d as resolveSpawnChannelAccountId, f as resolveSpawnMode, g as summarizeSpawnError, h as runSpawnPipeline, l as prepareSpawnThreadBinding, m as reserveChildAdmissionSlot, n as resolveSubagentSpawnOwnership, o as resolveSubagentThinkingOverride, p as resolveSpawnSandboxError, r as resolveConfiguredSubagentRunTimeoutSeconds, s as resolveRequesterOriginForChild, t as buildSpawnThreadBinding, u as resolveSpawnAdmission } from "./spawn-thread-binding-CC3RQjiW.mjs";
import { a as resolveInternalSessionKey, o as resolveMainSessionAlias } from "./sessions-resolution-Dx_C5vfd.mjs";
import "./sessions-helpers-QGUN2_Kz.mjs";
import { n as formatConversationTarget, t as deliveryContextFromConversation } from "./route-projection-BEJZqhnZ.mjs";
import { n as waitForSessionParticipantRecording, t as recordSessionParticipantBestEffort } from "./session-participant-recording-DI3IJOWj.mjs";
import { n as resolveAcpAgentPolicyError, t as isAcpEnabledByPolicy } from "./policy-B4iIRl8m.mjs";
import { t as recordSessionCreated } from "./session-created-DvrOWezO.mjs";
import { i as resolveSpawnedWorkspaceInheritance } from "./spawned-context-Bcr1a1sX.mjs";
import { t as isHeartbeatEnabledForAgent } from "./heartbeat-summary-Dwxaojo5.mjs";
import { n as resolveAcpProjectionSettings, t as isAcpTagVisible } from "./acp-stream-settings-RVEBG4i4.mjs";
import fs from "node:fs/promises";
import crypto from "node:crypto";
//#region src/acp/control-plane/spawn.ts
/** Cleanup helpers for failed ACP spawn flows. */
/** Roll back only the provisional session owned by this failed spawn. */
async function cleanupFailedAcpSpawn(params) {
	if (!params.sessionEntry) return;
	const { sessionId, lifecycleRevision } = params.sessionEntry;
	const storePath = resolveSessionStorePathCore(params.cfg.session?.store, { agentId: params.agentId });
	const assertCurrent = () => {
		const current = loadSessionEntry({
			storePath,
			sessionKey: params.sessionKey,
			agentId: params.agentId,
			clone: false
		});
		if (current?.sessionId !== sessionId || current?.lifecycleRevision !== lifecycleRevision) throw new Error(`ACP provisional session ${params.sessionKey} changed before cleanup.`);
	};
	let deletionStarted = false;
	let deletionExecution;
	const cancellation = new AbortController();
	try {
		await runWithGatewayToolCleanupContext(async () => {
			assertCurrent();
			const context = getInProcessGatewayToolContext();
			if (!context) throw new Error("ACP provisional cleanup Gateway is unavailable.");
			await callInProcessGatewayTool("sessions.delete", {
				key: params.sessionKey,
				agentId: params.agentId,
				expectedSessionId: sessionId,
				...lifecycleRevision ? { expectedLifecycleRevision: lifecycleRevision } : {},
				deleteTranscript: params.deleteTranscript,
				emitLifecycleHooks: false
			}, {
				onExecution: (execution) => {
					deletionExecution = execution;
				},
				sessionMutationCommitGuard: () => {
					cancellation.signal.throwIfAborted();
					context.requestEntryLifetime?.signal.throwIfAborted();
					assertCurrent();
					deletionStarted = true;
				},
				signal: cancellation.signal,
				timeoutMs: 1e4
			});
		});
	} catch (error) {
		if (!deletionStarted) cancellation.abort(error);
		if (!deletionStarted && params.closeRuntimeOnFailure) await runExclusiveSessionLifecycleMutation({
			scope: storePath,
			identities: [params.sessionKey, sessionId],
			run: async () => {
				assertCurrent();
				await params.closeRuntimeOnFailure();
			}
		}).catch((releaseError) => {
			if (isAcpOwnerRepairRequired(releaseError)) throw releaseError;
			logVerbose(`acp-spawn: provisional runtime cleanup failed: ${String(releaseError)}`);
		});
		logVerbose(`acp-spawn: provisional session cleanup failed: ${String(error)}`);
	} finally {
		if (deletionStarted) await deletionExecution;
	}
}
//#endregion
//#region src/agents/subagents/spawn/acp-spawn-admission.ts
function countUntrackedActiveAcpRunsForOwner(ownerKey, pendingChildSessionKeys) {
	if (!ownerKey?.trim()) return 0;
	return new Set(listActiveAcpSessionsForOwner(ownerKey.trim()).filter((sessionKey) => {
		const run = getSubagentRunByChildSessionKey(sessionKey);
		return !pendingChildSessionKeys?.has(sessionKey) && !(run && typeof run.execution.endedAt !== "number");
	})).size;
}
//#endregion
//#region src/agents/subagents/spawn/acp-spawn-bootstrap-delivery.ts
function toGatewayImageAttachments(attachments) {
	if (!attachments || attachments.length === 0) return;
	return attachments.map((attachment) => ({
		type: "image",
		source: {
			type: "base64",
			media_type: attachment.mediaType,
			data: attachment.data
		}
	}));
}
function resolveAcpSpawnBootstrapDeliveryPlan(params) {
	const boundThreadIdRaw = params.binding?.conversation.conversationId;
	const boundThreadId = boundThreadIdRaw ? normalizeOptionalString(boundThreadIdRaw) : void 0;
	const fallbackThreadIdRaw = params.requester.origin?.threadId;
	const fallbackThreadId = fallbackThreadIdRaw != null ? normalizeOptionalString(String(fallbackThreadIdRaw)) : void 0;
	const deliveryThreadId = boundThreadId ?? fallbackThreadId;
	const requesterConversationRef = resolveInboundConversationResolution({
		cfg: params.cfg,
		channel: params.requester.origin?.channel,
		accountId: params.requester.origin?.accountId,
		threadId: fallbackThreadId,
		to: params.requester.origin?.to
	});
	const requesterAccountId = resolveSpawnChannelAccountId({
		cfg: params.cfg,
		channel: params.requester.origin?.channel,
		accountId: params.requester.origin?.accountId
	});
	const bindingMatchesRequesterConversation = Boolean(params.requester.origin?.channel && params.binding?.conversation.channel === params.requester.origin.channel && params.binding?.conversation.accountId === requesterAccountId && requesterConversationRef?.conversationId && params.binding?.conversation.conversationId === requesterConversationRef.conversationId && (params.binding?.conversation.parentConversationId ?? void 0) === (requesterConversationRef.parentConversationId ?? void 0));
	const boundDeliveryTarget = deliveryContextFromConversation(params.binding?.conversation);
	const inferredDeliveryTo = (bindingMatchesRequesterConversation ? normalizeOptionalString(params.requester.origin?.to) : void 0) ?? boundDeliveryTarget?.to ?? normalizeOptionalString(params.requester.origin?.to) ?? formatConversationTarget({
		channel: params.requester.origin?.channel,
		conversationId: deliveryThreadId
	});
	const resolvedDeliveryThreadId = bindingMatchesRequesterConversation ? fallbackThreadId : boundDeliveryTarget?.threadId ?? deliveryThreadId;
	const useInlineDelivery = Boolean(params.requester.origin?.channel && inferredDeliveryTo) && !params.effectiveStreamToParent && params.spawnMode === "session";
	return {
		useInlineDelivery,
		channel: useInlineDelivery ? params.requester.origin?.channel : void 0,
		accountId: useInlineDelivery ? requesterAccountId : void 0,
		to: useInlineDelivery ? inferredDeliveryTo : void 0,
		threadId: useInlineDelivery && resolvedDeliveryThreadId != null ? normalizeOptionalString(String(resolvedDeliveryThreadId)) : void 0
	};
}
//#endregion
//#region src/agents/subagents/spawn/acp-spawn-gateway.ts
async function launchAcpChildThroughGateway(params) {
	const promptedAt = Date.now();
	const response = await callSubagentGateway(withSubagentGatewayExecutionIdentity({
		method: "agent",
		assertDispatchCurrent: params.assertDispatchCurrent,
		params: {
			message: params.task,
			sessionKey: params.sessionKey,
			channel: params.deliveryPlan.channel,
			to: params.deliveryPlan.to,
			accountId: params.deliveryPlan.accountId,
			threadId: params.deliveryPlan.threadId,
			idempotencyKey: params.childIdem,
			deliver: params.deliveryPlan.useInlineDelivery,
			lane: AGENT_LANE_SUBAGENT,
			acpTurnSource: "manual_spawn",
			timeout: params.runTimeoutSeconds,
			label: params.label || void 0,
			...params.attachments ? { attachments: params.attachments } : {}
		},
		timeoutMs: 1e4
	}, {
		sessionSpawnContext: buildSubagentExecutionSessionSpawnContext(params.lineage),
		parentExecutionIdentityToken: params.parentExecutionIdentityToken
	}));
	recordSessionParticipantBestEffort({
		promptedAt,
		identity: {
			type: "agent",
			id: params.lineage.parentAgentId
		},
		agentId: params.lineage.targetAgentId,
		sessionKey: params.sessionKey,
		storePath: params.participantStorePath
	});
	return response;
}
//#endregion
//#region src/agents/subagents/spawn/acp-parent-stream-store.sqlite.ts
function getAcpParentStreamKysely(database) {
	return getNodeSqliteKysely(database);
}
/** Records one ordered batch in the same synchronous commit section as sequence allocation. */
function recordAcpParentStreamEvents(options) {
	if (options.events.length === 0) return;
	const prepared = options.events.flatMap((entry) => {
		try {
			const eventJson = JSON.stringify(entry.event);
			if (eventJson !== void 0) return [{
				eventJson,
				createdAt: entry.createdAt
			}];
		} catch {}
		return [];
	});
	if (prepared.length === 0) return;
	runOpenClawAgentWriteTransaction((database) => {
		const db = getAcpParentStreamKysely(database.db);
		const row = executeSqliteQueryTakeFirstSync(database.db, db.selectFrom("acp_parent_stream_events").select((eb) => eb.fn.max("seq").as("max_seq")).where("session_id", "=", options.sessionId).where("run_id", "=", options.runId));
		const firstSeq = row?.max_seq === null || row?.max_seq === void 0 ? 0 : coerceRequiredSqliteNumber(row.max_seq) + 1;
		executeSqliteQuerySync(database.db, db.insertInto("acp_parent_stream_events").values(prepared.map((entry, index) => ({
			session_id: options.sessionId,
			run_id: options.runId,
			seq: firstSeq + index,
			event_json: entry.eventJson,
			created_at: entry.createdAt
		}))));
	}, options, { operationLabel: "acp.parent-stream.record" });
}
//#endregion
//#region src/agents/subagents/spawn/acp-spawn-parent-stream.ts
/** Relays child ACP session stream updates back into the requester parent session. */
const DEFAULT_STREAM_FLUSH_MS = 2500;
const DEFAULT_NO_OUTPUT_NOTICE_MS = 6e4;
const DEFAULT_NO_OUTPUT_POLL_MS = 15e3;
const DEFAULT_MAX_RELAY_LIFETIME_MS = 216e5;
const STREAM_BUFFER_MAX_CHARS = 4e3;
const STREAM_SNIPPET_MAX_CHARS = 220;
const STREAM_LOG_BATCH_SIZE = 100;
const STREAM_LOG_FLUSH_MS = 1e3;
const STREAM_LOG_MAX_PENDING_EVENTS = 256;
const STREAM_LOG_MAX_RETRY_MS = 3e4;
const log$1 = createSubsystemLogger("agents/acp-parent-stream");
function compactWhitespace(value) {
	return value.replace(/\s+/g, " ").trim();
}
function normalizeStringArray(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((item) => typeof item === "string" && item.length > 0);
}
function formatProxyEnvSummary(keys) {
	if (keys.length === 0) return "proxy env: none";
	return `proxy env: ${keys.join(", ")}`;
}
function mergeStreamingConfig(base, override) {
	const baseRecord = asOptionalRecord(base);
	const overrideRecord = asOptionalRecord(override);
	if (!baseRecord || !overrideRecord) return override ?? base;
	const merged = {
		...baseRecord,
		...overrideRecord
	};
	const baseProgress = asOptionalRecord(baseRecord.progress);
	const overrideProgress = asOptionalRecord(overrideRecord.progress);
	if (baseProgress && overrideProgress) merged.progress = {
		...baseProgress,
		...overrideProgress
	};
	else if (overrideProgress ?? baseProgress) merged.progress = overrideProgress ?? baseProgress;
	else delete merged.progress;
	return merged;
}
function mergeStreamingEntry(base, override) {
	if (!override) return base;
	return {
		...base,
		...override,
		streaming: mergeStreamingConfig(base.streaming, override.streaming)
	};
}
function resolveParentProgressStreamingEntry(params) {
	const channelId = normalizeOptionalString(params.deliveryContext?.channel);
	if (!params.cfg || !channelId) return;
	const channelCfg = params.cfg.channels?.[channelId];
	if (!channelCfg) return;
	return mergeStreamingEntry(channelCfg, resolveChannelAccountEntry(channelCfg.accounts, normalizeAccountId(params.deliveryContext?.accountId), channelId, normalizeAccountId));
}
function resolveParentProgressCommentary(params) {
	return resolveChannelStreamingProgressCommentary(resolveParentProgressStreamingEntry(params), true);
}
/** Starts a bounded parent-session relay for child ACP output and progress notices. */
function startAcpSpawnParentStreamRelay(params) {
	const runId = normalizeOptionalString(params.runId) ?? "";
	const parentSessionKey = normalizeOptionalString(params.parentSessionKey) ?? "";
	if (!runId || !parentSessionKey) return {
		dispose: () => {},
		notifyStarted: () => {}
	};
	const streamFlushMs = resolveIntegerOption(params.streamFlushMs, DEFAULT_STREAM_FLUSH_MS, { min: 0 });
	const noOutputNoticeMs = resolveIntegerOption(params.noOutputNoticeMs, DEFAULT_NO_OUTPUT_NOTICE_MS, { min: 0 });
	const noOutputPollMs = resolveIntegerOption(params.noOutputPollMs, DEFAULT_NO_OUTPUT_POLL_MS, { min: 250 });
	const maxRelayLifetimeMs = resolveIntegerOption(params.maxRelayLifetimeMs, DEFAULT_MAX_RELAY_LIFETIME_MS, { min: 1e3 });
	const relayLabel = truncateUtf16WithEllipsis(compactWhitespace(params.agentId), 40) || "ACP child";
	const contextPrefix = `acp-spawn:${runId}`;
	const childSessionId = normalizeOptionalString(params.childSessionId);
	const stateEnv = { ...params.env ?? process.env };
	const pendingLogEvents = [];
	let logFlushTimer;
	let logFailureWarned = false;
	let logBufferWarned = false;
	let consecutiveLogFailures = 0;
	let disposed = false;
	const capPendingLogEvents = () => {
		const overflow = pendingLogEvents.length - STREAM_LOG_MAX_PENDING_EVENTS;
		if (overflow <= 0) return;
		pendingLogEvents.splice(0, overflow);
		if (!logBufferWarned) {
			log$1.warn("Capped ACP parent stream diagnostic buffer", {
				runId,
				childSessionId,
				maxPendingEvents: STREAM_LOG_MAX_PENDING_EVENTS
			});
			logBufferWarned = true;
		}
	};
	const clearLogFlushTimer = () => {
		if (!logFlushTimer) return;
		clearTimeout(logFlushTimer);
		logFlushTimer = void 0;
	};
	function flushLogEvents(options = {}) {
		clearLogFlushTimer();
		if (!childSessionId || pendingLogEvents.length === 0) return;
		const events = pendingLogEvents.splice(0);
		try {
			recordAcpParentStreamEvents({
				agentId: params.agentId,
				env: stateEnv,
				sessionId: childSessionId,
				runId,
				events
			});
			logFailureWarned = false;
			logBufferWarned = false;
			consecutiveLogFailures = 0;
		} catch (error) {
			if (!options.terminal) {
				pendingLogEvents.unshift(...events);
				capPendingLogEvents();
				consecutiveLogFailures += 1;
				scheduleLogFlush(Math.min(STREAM_LOG_FLUSH_MS * 2 ** consecutiveLogFailures, STREAM_LOG_MAX_RETRY_MS));
			}
			if (!logFailureWarned || options.terminal) {
				log$1.warn("Failed to persist ACP parent stream diagnostics", {
					runId,
					childSessionId,
					retrying: !options.terminal,
					error: String(error)
				});
				logFailureWarned = true;
			}
		}
	}
	function scheduleLogFlush(delayMs = STREAM_LOG_FLUSH_MS) {
		if (disposed || logFlushTimer || pendingLogEvents.length === 0) return;
		logFlushTimer = setTimeout(() => flushLogEvents(), delayMs);
		logFlushTimer.unref?.();
	}
	const logEvent = (kind, fields) => {
		if (!childSessionId) return;
		const createdAt = Date.now();
		pendingLogEvents.push({
			createdAt,
			event: {
				ts: new Date(createdAt).toISOString(),
				epochMs: createdAt,
				runId,
				parentSessionKey,
				childSessionKey: params.childSessionKey,
				agentId: params.agentId,
				kind,
				...fields
			}
		});
		capPendingLogEvents();
		if (consecutiveLogFailures === 0 && pendingLogEvents.length >= STREAM_LOG_BATCH_SIZE) {
			flushLogEvents();
			return;
		}
		scheduleLogFlush();
	};
	const shouldSurfaceUpdates = params.surfaceUpdates !== false;
	const shouldRelayProgressCommentary = resolveParentProgressCommentary({
		cfg: params.cfg,
		deliveryContext: params.deliveryContext
	});
	const acpProjectionSettings = resolveAcpProjectionSettings(params.cfg ?? {});
	const eventRouting = params.eventRouting ?? {
		mainKey: params.mainKey,
		sessionScope: params.sessionScope
	};
	const wake = () => {
		if (!shouldSurfaceUpdates) return;
		requestSessionEventWake(scopedHeartbeatWakeOptionsForPolicy(parentSessionKey, {
			source: "acp-spawn",
			intent: "event",
			reason: "acp:spawn:stream"
		}, eventRouting));
	};
	const emit = (text, contextKey) => {
		const cleaned = text.trim();
		if (!cleaned) return;
		logEvent("system_event", {
			contextKey,
			text: cleaned
		});
		if (!shouldSurfaceUpdates) return;
		enqueueSystemEvent(cleaned, {
			sessionKey: resolveSystemEventQueueKey(resolveEventSessionKeyForPolicy(parentSessionKey, eventRouting), resolveAgentIdFromSessionKey(parentSessionKey, params.requesterAgentId)),
			contextKey,
			deliveryContext: params.deliveryContext
		});
		wake();
	};
	const emitStartNotice = () => {
		emit(`Started ${relayLabel} session ${params.childSessionKey}. Streaming progress updates to parent session.`, `${contextPrefix}:start`);
	};
	let pendingText = "";
	let pendingProgressKind;
	let replaceableAssistantSnapshot;
	const itemProgressTextById = /* @__PURE__ */ new Map();
	let lastProgressAt = Date.now();
	let stallNotified = false;
	let promptSubmittedAt;
	let firstRuntimeEventAt;
	let firstVisibleOutputAt;
	let lastRuntimeEventType;
	let proxyEnvKeysAtPrompt = [];
	let flushTimer;
	let relayLifetimeTimer;
	const clearFlushTimer = () => {
		if (!flushTimer) return;
		clearTimeout(flushTimer);
		flushTimer = void 0;
	};
	const clearRelayLifetimeTimer = () => {
		if (!relayLifetimeTimer) return;
		clearTimeout(relayLifetimeTimer);
		relayLifetimeTimer = void 0;
	};
	const flushPending = () => {
		clearFlushTimer();
		if (!pendingText) return;
		const snippet = truncateUtf16WithEllipsis(compactWhitespace(pendingText), STREAM_SNIPPET_MAX_CHARS);
		pendingText = "";
		pendingProgressKind = void 0;
		if (!snippet) return;
		emit(`${relayLabel}: ${snippet}`, `${contextPrefix}:progress`);
	};
	const scheduleFlush = () => {
		if (disposed || flushTimer || streamFlushMs <= 0) return;
		flushTimer = setTimeout(() => {
			flushPending();
		}, streamFlushMs);
		flushTimer.unref?.();
	};
	const appendVisibleProgress = (delta, kind) => {
		if (stallNotified) {
			stallNotified = false;
			emit(`${relayLabel} resumed output.`, `${contextPrefix}:resumed`);
		}
		lastProgressAt = Date.now();
		firstVisibleOutputAt ??= lastProgressAt;
		if (pendingText && pendingProgressKind && pendingProgressKind !== kind) flushPending();
		pendingProgressKind = kind;
		pendingText += delta;
		if (pendingText.length > STREAM_BUFFER_MAX_CHARS) pendingText = sliceUtf16Safe(pendingText, -4e3);
		if (pendingText.length >= STREAM_SNIPPET_MAX_CHARS || delta.includes("\n\n")) {
			flushPending();
			return;
		}
		scheduleFlush();
	};
	const flushReplaceableAssistantSnapshot = () => {
		const snapshot = replaceableAssistantSnapshot;
		replaceableAssistantSnapshot = void 0;
		if (!snapshot?.trim()) return;
		appendVisibleProgress(snapshot, "assistant:replaceable");
	};
	const appendItemProgressSnapshot = (snapshot) => {
		const previous = itemProgressTextById.get(snapshot.itemId) ?? "";
		if (snapshot.text === previous) return;
		const kind = `item:${snapshot.itemId}`;
		const isPrefixUpdate = Boolean(previous && snapshot.text.startsWith(previous));
		if (previous && !isPrefixUpdate && pendingProgressKind === kind && Boolean(pendingText)) pendingText = "";
		itemProgressTextById.set(snapshot.itemId, snapshot.text);
		const delta = isPrefixUpdate ? snapshot.text.slice(previous.length) : snapshot.text;
		appendVisibleProgress(delta, kind);
	};
	const buildNoOutputNotice = () => {
		const seconds = Math.round(noOutputNoticeMs / 1e3);
		if (!promptSubmittedAt) return {
			summary: `No prompt submission observed for ${seconds}s after child start.`,
			text: `${relayLabel} session started but no prompt submission was observed for ${seconds}s.`
		};
		if (!firstRuntimeEventAt) {
			const proxySummary = formatProxyEnvSummary(proxyEnvKeysAtPrompt);
			return {
				summary: `Prompt submitted but no ACP runtime event for ${seconds}s (${proxySummary}).`,
				text: `${relayLabel} prompt was submitted but no ACP runtime event arrived for ${seconds}s (${proxySummary}). Check upstream connectivity, auth, or proxy/network access in the gateway child environment.`
			};
		}
		if (!firstVisibleOutputAt) {
			const lastEvent = lastRuntimeEventType ? ` Last ACP event: ${lastRuntimeEventType}.` : "";
			return {
				summary: `ACP runtime active but no visible assistant output for ${seconds}s.${lastEvent}`,
				text: `${relayLabel} has ACP runtime activity but no visible assistant output for ${seconds}s.${lastEvent} It may be working, blocked on a tool, or failing before visible output.`
			};
		}
		return {
			summary: `No visible output for ${seconds}s. It may be waiting for input.`,
			text: `${relayLabel} has produced no visible output for ${seconds}s. It may be waiting for interactive input.`
		};
	};
	const noOutputWatcherTimer = setInterval(() => {
		if (disposed || noOutputNoticeMs <= 0) return;
		if (stallNotified) return;
		if (Date.now() - lastProgressAt < noOutputNoticeMs) return;
		stallNotified = true;
		const notice = buildNoOutputNotice();
		emit(notice.text, `${contextPrefix}:stall`);
	}, noOutputPollMs);
	noOutputWatcherTimer.unref?.();
	relayLifetimeTimer = setTimeout(() => {
		if (disposed) return;
		emit(`${relayLabel} stream relay timed out after ${Math.max(1, Math.round(maxRelayLifetimeMs / 1e3))}s without completion.`, `${contextPrefix}:timeout`);
		dispose();
	}, maxRelayLifetimeMs);
	relayLifetimeTimer.unref?.();
	if (params.emitStartNotice !== false) emitStartNotice();
	const unsubscribe = onAgentEventForRun(runId, (event) => {
		if (disposed || event.runId !== runId) return;
		if (event.stream === "assistant") {
			const data = event.data;
			const assistantPhase = normalizeAssistantPhase(data.phase);
			const textCandidate = data.text;
			const deltaCandidate = data.delta;
			const snapshot = typeof textCandidate === "string" ? textCandidate : typeof deltaCandidate === "string" ? deltaCandidate : void 0;
			if (data.replaceable === true) {
				if (snapshot?.trim()) {
					replaceableAssistantSnapshot = snapshot;
					lastProgressAt = Date.now();
					logEvent("assistant_replaceable_snapshot", {
						text: snapshot,
						...assistantPhase ? { phase: assistantPhase } : {}
					});
				}
				return;
			}
			const delta = typeof deltaCandidate === "string" ? deltaCandidate : snapshot;
			if (!delta || !delta.trim()) return;
			logEvent("assistant_delta", {
				delta,
				...assistantPhase ? { phase: assistantPhase } : {}
			});
			if (assistantPhase === "commentary" && !shouldRelayProgressCommentary) {
				lastProgressAt = Date.now();
				return;
			}
			replaceableAssistantSnapshot = void 0;
			appendVisibleProgress(delta, `assistant:${assistantPhase ?? "unknown"}`);
			return;
		}
		if (event.stream === "item") {
			const data = event.data;
			const itemId = normalizeOptionalString(data?.itemId);
			const kind = normalizeOptionalString(data?.kind);
			const progressText = normalizeOptionalString(data?.progressText);
			if (kind === "preamble" && progressText) {
				lastProgressAt = Date.now();
				if (shouldRelayProgressCommentary && itemId) appendItemProgressSnapshot({
					itemId,
					text: progressText
				});
			}
			return;
		}
		if (event.stream === "acp") {
			const data = event.data;
			const phase = normalizeOptionalString(data?.phase);
			logEvent("acp", {
				phase: phase ?? "unknown",
				data: event.data
			});
			if (phase === "prompt_submitted") {
				const at = asFiniteNumber(data?.at) ?? Date.now();
				promptSubmittedAt ??= at;
				proxyEnvKeysAtPrompt = normalizeStringArray(data?.proxyEnvKeys);
				lastProgressAt = Date.now();
				return;
			}
			if (phase === "runtime_event") {
				const eventType = normalizeOptionalString(data?.eventType);
				const text = normalizeOptionalString(data?.text);
				const tag = normalizeOptionalString(data?.tag);
				firstRuntimeEventAt ??= Date.now();
				lastRuntimeEventType = eventType;
				if (shouldRelayProgressCommentary && eventType === "status" && text && isAcpTagVisible(acpProjectionSettings, tag)) {
					appendVisibleProgress(`${text}\n\n`, "acp:status");
					return;
				}
				lastProgressAt = Date.now();
				return;
			}
			return;
		}
		if (event.stream !== "lifecycle") return;
		const phase = normalizeOptionalString(event.data.phase);
		logEvent("lifecycle", {
			phase: phase ?? "unknown",
			data: event.data
		});
		if (phase === "end") {
			flushReplaceableAssistantSnapshot();
			flushPending();
			const startedAt = asFiniteNumber(event.data.startedAt);
			const endedAt = asFiniteNumber(event.data.endedAt);
			const durationMs = startedAt != null && endedAt != null && endedAt >= startedAt ? endedAt - startedAt : void 0;
			if (durationMs != null) emit(`${relayLabel} run completed in ${Math.max(1, Math.round(durationMs / 1e3))}s.`, `${contextPrefix}:done`);
			else emit(`${relayLabel} run completed.`, `${contextPrefix}:done`);
			dispose();
			return;
		}
		if (phase === "error") {
			flushReplaceableAssistantSnapshot();
			flushPending();
			const errorText = normalizeOptionalString(event.data.error);
			if (errorText) emit(`${relayLabel} run failed: ${errorText}`, `${contextPrefix}:error`);
			else emit(`${relayLabel} run failed.`, `${contextPrefix}:error`);
			dispose();
		}
	});
	const dispose = () => {
		if (disposed) return;
		disposed = true;
		clearFlushTimer();
		flushLogEvents({ terminal: true });
		clearRelayLifetimeTimer();
		clearInterval(noOutputWatcherTimer);
		unsubscribe();
	};
	return {
		dispose,
		notifyStarted: emitStartNotice
	};
}
//#endregion
//#region src/agents/subagents/spawn/acp-spawn-heartbeat.ts
function isHeartbeatEnabledForSessionAgent(params) {
	if (!areSessionEventWakesEnabled()) return false;
	if (!params.sessionKey?.trim()) return true;
	const requesterAgentId = resolveSessionAgentIds({
		config: params.cfg,
		agentId: params.requesterAgentId,
		sessionKey: params.sessionKey
	}).sessionAgentId;
	if (!isHeartbeatEnabledForAgent(params.cfg, requesterAgentId)) return false;
	const heartbeatEvery = resolveAgentConfig(params.cfg, requesterAgentId)?.heartbeat?.every ?? params.cfg.agents?.defaults?.heartbeat?.every ?? "30m";
	const trimmedEvery = normalizeOptionalString(heartbeatEvery) ?? "";
	if (!trimmedEvery) return false;
	try {
		return parseDurationMs(trimmedEvery, { defaultUnit: "m" }) > 0;
	} catch {
		return false;
	}
}
function resolveHeartbeatConfigForAgent(params) {
	const defaults = params.cfg.agents?.defaults?.heartbeat;
	const overrides = resolveAgentConfig(params.cfg, params.agentId)?.heartbeat;
	if (!defaults && !overrides) return;
	return {
		...defaults,
		...overrides
	};
}
function hasSessionLocalHeartbeatRelayRoute(params) {
	if ((params.cfg.session?.scope ?? "per-sender") === "global") return false;
	const heartbeat = resolveHeartbeatConfigForAgent({
		cfg: params.cfg,
		agentId: params.requesterAgentId
	});
	if ((heartbeat?.target ?? "none") !== "last") return false;
	if (normalizeOptionalString(heartbeat?.to)) return false;
	if (normalizeOptionalString(heartbeat?.accountId)) return false;
	const storePath = resolveSessionStorePathCore(params.cfg.session?.store, { agentId: params.requesterAgentId });
	const parentEntry = loadSessionEntryReadOnly({
		storePath,
		sessionKey: params.parentSessionKey,
		clone: false
	});
	const parentDeliveryContext = deliveryContextFromSession(parentEntry);
	return hasDeliveryTargetFields(parentDeliveryContext);
}
//#endregion
//#region src/agents/subagents/spawn/acp-spawn-requester.ts
const log = createSubsystemLogger("agents/acp-spawn");
async function readAcpSpawnParentDeliveryContext(params) {
	return await withSessionEntryReadOnlyInWorker({
		sessionKey: params.parentSessionKey,
		agentId: resolveAgentIdFromSessionKey(params.parentSessionKey, params.requesterAgentId),
		clone: false
	}, () => params.assertActive?.(), async (read) => {
		if (!read.ok) throw read.error;
		return deliveryContextFromSession(read.value);
	});
}
function resolveRequesterInternalSessionKey(params) {
	const { mainKey, alias } = resolveMainSessionAlias(params.cfg);
	const requesterSessionKey = normalizeOptionalString(params.requesterSessionKey);
	return requesterSessionKey ? resolveInternalSessionKey({
		key: requesterSessionKey,
		alias,
		mainKey
	}) : alias;
}
async function persistAcpSpawnSessionFileBestEffort(params) {
	try {
		const resolvedSessionFile = await resolveSessionTranscriptRuntimeTarget({
			sessionId: params.sessionId,
			sessionKey: params.sessionKey,
			storePath: params.storePath,
			agentId: params.agentId,
			threadId: params.threadId
		});
		return loadSessionEntryReadOnly({
			storePath: params.storePath,
			sessionKey: resolvedSessionFile.sessionKey,
			clone: false
		}) ?? params.sessionEntry;
	} catch (error) {
		log.warn(`ACP session-file persistence failed during ${params.stage} for ${params.sessionKey}: ${formatErrorMessage(error)}`);
		return params.sessionEntry;
	}
}
function resolveAcpSpawnRequesterState(params) {
	const bindingService = getSessionBindingService();
	const requesterParsedSession = parseAgentSessionKey(params.parentSessionKey);
	const isSubagentSession = Boolean(requesterParsedSession) && isSubagentSessionKey(params.parentSessionKey);
	return {
		isSubagentSession,
		hasActiveSubagentBinding: isSubagentSession && params.parentSessionKey ? bindingService.listBySession(params.parentSessionKey).some((record) => record.targetKind === "subagent" && record.status !== "ended") : false,
		hasThreadContext: typeof params.ctx.agentThreadId === "string" ? Boolean(normalizeOptionalString(params.ctx.agentThreadId)) : params.ctx.agentThreadId != null,
		heartbeatEnabled: isHeartbeatEnabledForSessionAgent({
			cfg: params.cfg,
			requesterAgentId: params.requesterAgentId,
			sessionKey: params.parentSessionKey
		}),
		heartbeatRelayRouteUsable: params.parentSessionKey && params.requesterAgentId ? hasSessionLocalHeartbeatRelayRoute({
			cfg: params.cfg,
			parentSessionKey: params.parentSessionKey,
			requesterAgentId: params.requesterAgentId
		}) : false,
		origin: resolveRequesterOriginForChild({
			cfg: params.cfg,
			targetAgentId: params.targetAgentId,
			requesterAgentId: params.requesterAgentId,
			requesterChannel: params.ctx.agentChannel,
			requesterAccountId: params.ctx.agentAccountId,
			requesterTo: params.ctx.agentTo,
			requesterThreadId: params.ctx.agentThreadId,
			requesterGroupSpace: params.ctx.agentGroupSpace,
			requesterMemberRoleIds: params.ctx.agentMemberRoleIds
		})
	};
}
function shouldStreamAcpSpawnToParent(params) {
	const implicitStreamToParent = params.spawnMode === "run" && !params.requestThreadBinding && params.requester.isSubagentSession && !params.requester.hasActiveSubagentBinding && !params.requester.hasThreadContext && params.requester.heartbeatEnabled && params.requester.heartbeatRelayRouteUsable;
	return params.streamToParentRequested || implicitStreamToParent;
}
function sessionEntryMatchesAcpResumeSessionId(acp, resumeSessionId) {
	const identity = acp?.identity;
	return normalizeOptionalString(identity?.agentSessionId) === resumeSessionId || normalizeOptionalString(identity?.acpxSessionId) === resumeSessionId;
}
function sessionEntryIsOwnedByRequester(params) {
	return params.sessionKey === params.requesterSessionKey || normalizeOptionalString(params.entry?.spawnedBy) === params.requesterSessionKey || normalizeOptionalString(params.entry?.parentSessionKey) === params.requesterSessionKey;
}
function validateAcpResumeSessionOwnership(params) {
	const resumeSessionId = normalizeOptionalString(params.resumeSessionId);
	if (!resumeSessionId) return { ok: true };
	const requesterSessionKey = normalizeOptionalString(params.requesterSessionKey);
	if (!requesterSessionKey) return {
		ok: false,
		error: "sessions_spawn resumeSessionId requires an active requester session context."
	};
	const configuredBackend = normalizeOptionalLowercaseString(params.backendId);
	const storePath = resolveSessionStorePathCore(params.cfg.session?.store, { agentId: params.targetAgentId });
	for (const { sessionKey, entry } of listSessionEntriesReadOnly({
		storePath,
		clone: false
	})) {
		const acp = readAcpSessionMeta({
			sessionKey,
			cfg: params.cfg
		});
		if (configuredBackend && normalizeOptionalLowercaseString(acp?.backend) !== configuredBackend || !sessionEntryMatchesAcpResumeSessionId(acp, resumeSessionId)) continue;
		if (sessionEntryIsOwnedByRequester({
			sessionKey,
			entry,
			requesterSessionKey
		})) return { ok: true };
		break;
	}
	return {
		ok: false,
		error: "sessions_spawn resumeSessionId is only allowed for ACP sessions previously recorded for this requester. Omit resumeSessionId to start a fresh ACP session."
	};
}
//#endregion
//#region src/agents/subagents/spawn/acp-spawn-runtime.ts
const ACP_RUNTIME_TIMEOUT_MAX_SECONDS = 86400;
async function resolveRuntimeCwdForAcpSpawn(params) {
	if (!params.resolvedCwd) return;
	if (normalizeOptionalString(params.explicitCwd)) return params.resolvedCwd;
	try {
		await fs.access(params.resolvedCwd);
		return params.resolvedCwd;
	} catch (error) {
		if (isMissingPathError(error)) return;
		throw error;
	}
}
function resolveAcpSpawnRuntimeOptions(params) {
	const policyAgentId = params.configAgentId ?? params.targetAgentId;
	const modelExplicit = normalizeOptionalString(params.model) !== void 0;
	const thinkingExplicit = normalizeOptionalString(params.thinking) !== void 0;
	const rawModel = resolveConfiguredSubagentSpawnModelSelection({
		cfg: params.cfg,
		agentId: policyAgentId,
		modelOverride: params.model,
		modelRuntime: "acp"
	});
	const modelSelection = splitTrailingAuthProfile(rawModel ?? "");
	if (modelExplicit && modelSelection.profile) return {
		ok: false,
		error: "ACP model overrides cannot select OpenClaw auth profiles; configure credentials in the ACP runtime instead."
	};
	const model = modelSelection.model || void 0;
	const targetAgentConfig = resolveAgentConfig(params.cfg, policyAgentId);
	const thinkingPlan = resolveSubagentThinkingOverride({
		cfg: params.cfg,
		targetAgentConfig,
		thinkingOverrideRaw: params.thinking
	});
	if (thinkingPlan.status === "error") {
		const { provider, model: modelId } = splitModelRef(model);
		return {
			ok: false,
			error: `Invalid thinking level "${thinkingPlan.thinkingCandidateRaw}". Use one of: ${formatThinkingLevels(provider, modelId)}.`
		};
	}
	let thinking = thinkingPlan.thinkingOverride;
	if (!thinking) {
		const { provider, model: modelId } = splitModelRef(model);
		thinking = provider && modelId ? resolveThinkingDefaultCore({
			cfg: params.cfg,
			agentId: policyAgentId,
			provider,
			model: modelId
		}) : targetAgentConfig?.thinkingDefault;
	}
	const timeoutSeconds = params.runTimeoutSeconds ? Math.min(params.runTimeoutSeconds, ACP_RUNTIME_TIMEOUT_MAX_SECONDS) : void 0;
	return {
		ok: true,
		runtimeOptions: model || thinking || timeoutSeconds ? {
			...model ? { model } : {},
			...thinking ? { thinking } : {},
			...timeoutSeconds ? { timeoutSeconds } : {}
		} : void 0,
		modelExplicit,
		thinkingExplicit
	};
}
async function initializeAcpSpawnRuntime(params) {
	params.assertActive?.();
	const storePath = resolveSessionStorePathCore(params.cfg.session?.store, { agentId: params.targetAgentId });
	let sessionEntry = loadSessionEntry({
		storePath,
		sessionKey: params.sessionKey,
		agentId: params.targetAgentId,
		clone: false
	});
	const sessionId = sessionEntry?.sessionId;
	if (sessionId) sessionEntry = await persistAcpSpawnSessionFileBestEffort({
		sessionId,
		sessionKey: params.sessionKey,
		storePath,
		sessionEntry,
		agentId: params.targetAgentId,
		stage: "spawn"
	});
	return {
		initialized: await getAcpSessionManager().initializeSession({
			assertActive: params.assertActive,
			cfg: params.cfg,
			sessionKey: params.sessionKey,
			agentId: params.targetAgentId,
			agent: params.targetAgentId,
			mode: params.runtimeMode,
			resumeSessionId: params.resumeSessionId,
			runtimeOptions: params.runtimeOptions,
			modelExplicit: params.modelExplicit,
			thinkingExplicit: params.thinkingExplicit,
			cwd: params.cwd,
			backendId: params.backendId
		}),
		sessionId,
		sessionEntry,
		storePath
	};
}
async function bindPreparedAcpThread(params) {
	const binding = await getSessionBindingService().bind(buildSpawnThreadBinding({
		cfg: params.cfg,
		sessionKey: params.sessionKey,
		targetKind: "session",
		agentId: params.targetAgentId,
		label: params.label,
		binding: params.preparedBinding,
		sessionCwd: resolveAcpSessionCwd(params.initializedRuntime.initialized.meta),
		sessionDetails: resolveAcpThreadSessionDetailLines({
			sessionKey: params.sessionKey,
			meta: params.initializedRuntime.initialized.meta
		})
	}));
	params.assertActive?.();
	if (!binding.conversation.conversationId) throw new Error(params.preparedBinding.placement === "child" ? `Failed to create and bind a ${params.preparedBinding.channel} thread for this ACP session.` : `Failed to bind the current ${params.preparedBinding.channel} conversation for this ACP session.`);
	if (params.initializedRuntime.sessionId && params.preparedBinding.placement === "child") {
		const boundThreadId = normalizeOptionalString(binding.conversation.conversationId);
		if (boundThreadId) await persistAcpSpawnSessionFileBestEffort({
			sessionId: params.initializedRuntime.sessionId,
			sessionKey: params.sessionKey,
			storePath: params.initializedRuntime.storePath,
			sessionEntry: params.initializedRuntime.sessionEntry,
			agentId: params.targetAgentId,
			threadId: boundThreadId,
			stage: "thread-bind"
		});
	}
	return binding;
}
//#endregion
//#region src/agents/subagents/spawn/acp-spawn-target.ts
function resolveAcpAgentTarget(params) {
	const backendId = normalizeOptionalString(params.agentBackend) ?? normalizeOptionalString(params.cfg.acp?.backend) ?? getAcpRuntimeBackend()?.id;
	return {
		ok: true,
		agentId: params.agentId,
		...params.configAgentId ? { configAgentId: params.configAgentId } : {},
		...backendId ? { backendId } : {}
	};
}
function resolveTargetAcpAgentId(params) {
	const normalizedRequest = params.requestedAgentId === void 0 ? null : normalizeAgentIdStrict(params.requestedAgentId);
	if (normalizedRequest && !normalizedRequest.ok) return {
		ok: false,
		error: `agentId "${params.requestedAgentId}" was not found`
	};
	const requested = normalizedRequest?.value;
	if (requested) {
		const configuredAgent = resolveAgentEntry(params.cfg, requested);
		if (configuredAgent?.runtime?.type === "acp") return resolveAcpAgentTarget({
			cfg: params.cfg,
			agentId: normalizeOptionalAgentId(configuredAgent.runtime.acp?.agent) ?? requested,
			configAgentId: requested,
			agentBackend: configuredAgent.runtime.acp?.backend
		});
		if (configuredAgent && !isExplicitlyAllowedAcpAgent(params.cfg, requested)) return {
			ok: false,
			error: `agentId "${requested}" is an OpenClaw config agent, not an ACP harness. Use runtime="subagent" or omit runtime for OpenClaw config agents. Use runtime="acp" only with external ACP harness ids such as codex, claude, droid, gemini, or opencode, or configure agents.entries.*.runtime.type="acp" with runtime.acp.agent.`
		};
		return resolveAcpAgentTarget({
			cfg: params.cfg,
			agentId: requested,
			...configuredAgent ? { configAgentId: requested } : {}
		});
	}
	const configuredDefault = normalizeOptionalAgentId(params.cfg.acp?.defaultAgent);
	if (configuredDefault) {
		const configuredAgent = resolveAgentEntry(params.cfg, configuredDefault);
		return resolveAcpAgentTarget({
			cfg: params.cfg,
			agentId: configuredDefault,
			agentBackend: configuredAgent?.runtime?.type === "acp" ? configuredAgent.runtime.acp?.backend : void 0
		});
	}
	return {
		ok: false,
		error: "ACP target agent is not configured. Pass `agentId` in `sessions_spawn` or set `acp.defaultAgent` in config."
	};
}
function isExplicitlyAllowedAcpAgent(cfg, agentId) {
	return (cfg.acp?.allowedAgents ?? []).some((entry) => {
		if (entry.trim() === "*") return true;
		return normalizeOptionalAgentId(entry) === agentId;
	});
}
function resolveConfiguredAcpSubagentTargetIds(cfg) {
	const ids = new Set(listAgentIds(cfg));
	for (const agent of listAgentEntries(cfg)) {
		if (agent.runtime?.type !== "acp") continue;
		const acpAgent = normalizeOptionalAgentId(agent.runtime.acp?.agent);
		if (acpAgent) ids.add(acpAgent);
	}
	const defaultAgent = normalizeOptionalAgentId(cfg.acp?.defaultAgent);
	if (defaultAgent) ids.add(defaultAgent);
	for (const entry of cfg.acp?.allowedAgents ?? []) {
		if (entry.trim() === "*") continue;
		const id = normalizeOptionalAgentId(entry);
		if (id) ids.add(id);
	}
	return Array.from(ids);
}
//#endregion
//#region src/agents/subagents/spawn/acp-spawn.ts
/** Implements ACP subagent/session spawning, binding, limits, and parent-stream setup. */
const ACP_SPAWN_ACCEPTED_NOTE = "initial ACP task queued in isolated session; follow-ups continue in the bound thread.";
const ACP_SPAWN_SESSION_ACCEPTED_NOTE = "thread-bound ACP session stays active after this task; continue in-thread for follow-ups.";
function resolveAcpSpawnRuntimePolicyError(params) {
	const requesterRuntime = resolveSandboxRuntimeStatus({
		cfg: params.cfg,
		sessionKey: params.requesterSessionKey,
		agentId: params.requesterAgentId
	});
	return resolveSpawnSandboxError({
		backend: "acp",
		requesterSandboxed: params.requesterSandboxed === true || requesterRuntime.sandboxed,
		sandbox: params.sandbox === "require" ? "require" : "inherit"
	});
}
async function spawnAcpDirect(params, ctx) {
	const cfg = getRuntimeConfig();
	const runTimeoutSeconds = resolveConfiguredSubagentRunTimeoutSeconds({
		cfg,
		runTimeoutSeconds: params.runTimeoutSeconds
	});
	const requesterInternalKey = resolveRequesterInternalSessionKey({
		cfg,
		requesterSessionKey: ctx.agentSessionKey
	});
	if (!isAcpEnabledByPolicy(cfg)) return {
		status: "forbidden",
		errorCode: "acp_disabled",
		error: "ACP is disabled by policy (`acp.enabled=false`)."
	};
	const streamToParentRequested = params.streamTo === "parent";
	const parentSessionKey = normalizeOptionalString(ctx.agentSessionKey);
	if (streamToParentRequested && !parentSessionKey) return {
		status: "error",
		errorCode: "requester_session_required",
		error: "sessions_spawn streamTo=\"parent\" requires an active requester session context."
	};
	const requestThreadBinding = params.thread === true;
	const requesterAgentId = resolveSessionAgentId({
		config: cfg,
		sessionKey: requesterInternalKey,
		agentId: ctx.requesterAgentIdOverride
	});
	const runtimePolicyError = resolveAcpSpawnRuntimePolicyError({
		cfg,
		requesterAgentId,
		requesterSessionKey: ctx.agentSessionKey,
		requesterSandboxed: ctx.sandboxed,
		sandbox: params.sandbox
	});
	if (runtimePolicyError) return {
		status: "forbidden",
		errorCode: "runtime_policy",
		error: runtimePolicyError
	};
	const acpUnsupportedInheritedTool = findAcpUnsupportedInheritedToolDeny(ctx.inheritedToolDenylist);
	if (acpUnsupportedInheritedTool) return {
		status: "forbidden",
		errorCode: "runtime_policy",
		error: formatAcpInheritedToolDenyError(acpUnsupportedInheritedTool)
	};
	const acpUnsupportedInheritedAllow = findAcpUnsupportedInheritedToolAllow(ctx.inheritedToolAllowlist);
	if (acpUnsupportedInheritedAllow) return {
		status: "forbidden",
		errorCode: "runtime_policy",
		error: formatAcpInheritedToolAllowError(acpUnsupportedInheritedAllow)
	};
	const spawnMode = resolveSpawnMode({
		requestedMode: params.mode,
		threadRequested: requestThreadBinding
	});
	if (spawnMode === "session" && !requestThreadBinding) return {
		status: "error",
		errorCode: "thread_required",
		error: "sessions_spawn(runtime=\"acp\", mode=\"session\") requires thread=true so the ACP session can stay bound to a channel thread. Retry with { mode: \"session\", thread: true } on a channel that exposes threads (e.g. Discord, Slack, Telegram topics), or use mode=\"run\" for one-shot work."
	};
	const targetAgentResult = resolveTargetAcpAgentId({
		requestedAgentId: params.agentId,
		cfg
	});
	if (!targetAgentResult.ok) return {
		status: "error",
		errorCode: params.agentId && normalizeOptionalAgentId(params.agentId) ? "runtime_agent_mismatch" : "target_agent_required",
		error: targetAgentResult.error
	};
	const { agentId: targetAgentId, backendId } = targetAgentResult;
	const agentPolicyError = resolveAcpAgentPolicyError(cfg, targetAgentId);
	if (agentPolicyError) return {
		status: "forbidden",
		errorCode: "agent_forbidden",
		error: agentPolicyError.message
	};
	const subagentStore = resolveSubagentCapabilityStore(parentSessionKey, { cfg });
	const requesterState = resolveAcpSpawnRequesterState({
		cfg,
		parentSessionKey,
		requesterAgentId,
		targetAgentId,
		ctx
	});
	const ownership = resolveSubagentSpawnOwnership({
		cfg,
		agentSessionKey: ctx.agentSessionKey,
		completionOwnerKey: ctx.completionOwnerKey
	});
	const requesterTarget = await resolveGatewaySessionStoreTargetInWorker({
		cfg,
		key: ownership.completionRequesterSessionKey,
		agentId: ctx.requesterAgentIdOverride,
		assertActive: ctx.assertActive
	});
	ctx.assertActive?.();
	const requesterEntry = requesterTarget.store[requesterTarget.canonicalKey];
	const completionRequesterSessionId = requesterEntry?.sessionId;
	const completionRequesterLifecycleRevision = requesterEntry?.lifecycleRevision;
	const hasSubagentEnvelope = isSubagentEnvelopeSession(requesterInternalKey, {
		cfg,
		store: subagentStore
	});
	const resolveAdmission = (pendingChildren = 0, pendingChildSessionKeys) => resolveSpawnAdmission({
		cfg,
		enabled: hasSubagentEnvelope,
		requesterSessionKey: requesterInternalKey,
		requesterAgentId,
		targetAgentId,
		requestedAgentId: params.agentId,
		configuredAgentIds: resolveConfiguredAcpSubagentTargetIds(cfg),
		additionalActiveChildren: hasSubagentEnvelope ? countUntrackedActiveAcpRunsForOwner(requesterInternalKey, pendingChildSessionKeys) + pendingChildren : 0
	});
	const rejectSubagentPolicy = (error) => ({
		status: "forbidden",
		errorCode: "subagent_policy",
		error
	});
	const admission = resolveAdmission();
	if (!admission.ok) return rejectSubagentPolicy(admission.error);
	const resumeAuthorization = validateAcpResumeSessionOwnership({
		cfg,
		targetAgentId,
		backendId,
		requesterSessionKey: requesterInternalKey,
		resumeSessionId: params.resumeSessionId
	});
	if (!resumeAuthorization.ok) return {
		status: "forbidden",
		errorCode: "resume_forbidden",
		error: resumeAuthorization.error
	};
	const runtimeOptionsResult = resolveAcpSpawnRuntimeOptions({
		cfg,
		targetAgentId,
		configAgentId: targetAgentResult.configAgentId,
		model: params.model,
		thinking: params.thinking,
		runTimeoutSeconds
	});
	if (!runtimeOptionsResult.ok) return {
		status: "error",
		errorCode: "spawn_failed",
		error: runtimeOptionsResult.error
	};
	const effectiveStreamToParent = shouldStreamAcpSpawnToParent({
		spawnMode,
		requestThreadBinding,
		streamToParentRequested,
		requester: requesterState
	});
	const sessionKey = mintSpawnSessionKey({
		targetAgentId,
		backend: "acp"
	});
	const resolvedCwd = resolveSpawnedWorkspaceInheritance({
		config: cfg,
		targetAgentId,
		requesterSessionKey: ctx.agentSessionKey,
		explicitWorkspaceDir: params.cwd
	});
	let runtimeCwd;
	try {
		runtimeCwd = await resolveRuntimeCwdForAcpSpawn({
			resolvedCwd,
			explicitCwd: params.cwd
		});
	} catch (error) {
		return {
			status: "error",
			errorCode: "cwd_resolution_failed",
			error: formatErrorMessage(error)
		};
	}
	let preparedBinding = null;
	if (requestThreadBinding) {
		const prepared = prepareSpawnThreadBinding({
			cfg,
			kind: "acp",
			mode: spawnMode,
			bindingService: getSessionBindingService(),
			channel: requesterState.origin?.channel,
			accountId: requesterState.origin?.accountId,
			to: requesterState.origin?.to,
			threadId: requesterState.origin?.threadId,
			groupId: ctx.agentGroupId
		});
		if (!prepared.ok) return {
			status: "error",
			errorCode: "thread_binding_invalid",
			error: prepared.error
		};
		preparedBinding = prepared.binding;
	}
	let childCreationEntry;
	let closeRuntimeOnFailure;
	const childIdem = crypto.randomUUID();
	const parentDeliveryCtx = effectiveStreamToParent && parentSessionKey ? await readAcpSpawnParentDeliveryContext({
		parentSessionKey,
		requesterAgentId,
		assertActive: ctx.assertActive
	}) : void 0;
	ctx.assertActive?.();
	const parentRelayStateEnv = { ...process.env };
	const parentEventRouting = parentSessionKey ? resolveEventSessionRoutingPolicy({
		cfg,
		sessionKey: parentSessionKey
	}) : void 0;
	const gatewayAttachments = toGatewayImageAttachments(params.attachments);
	const requesterOrigin = requesterState.origin;
	const progressOrigin = {
		channel: requesterOrigin?.channel,
		accountId: requesterOrigin?.accountId,
		to: ctx.currentMessagingTarget ?? ctx.currentChannelId ?? requesterOrigin?.to,
		threadId: requesterOrigin?.threadId,
		channelId: ctx.currentChannelId,
		messageId: ctx.currentMessageId
	};
	const adapter = {
		async initialize() {
			const parentTarget = await resolveGatewaySessionStoreTargetInWorker({
				cfg,
				key: requesterInternalKey,
				agentId: requesterAgentId,
				assertActive: ctx.assertActive
			});
			const parentStorePath = parentTarget.readSource?.path ?? parentTarget.storePath;
			await waitForSessionParticipantRecording({
				agentId: requesterAgentId,
				sessionKey: parentTarget.canonicalKey,
				storePath: parentStorePath
			});
			ctx.assertActive?.();
			const inheritedGitContributorProfileIds = isIncognitoSessionKey(requesterInternalKey) ? void 0 : await withSessionEntryReadOnlyInWorker({
				agentId: requesterAgentId,
				sessionKey: parentTarget.canonicalKey,
				storePath: parentStorePath
			}, () => ctx.assertActive?.(), async (read) => {
				if (!read.ok) throw read.error;
				return inheritSessionGitContributorProfileIds(read.value);
			});
			const creationStamp = buildSessionCreationStamp({
				via: "spawn",
				actor: {
					type: "agent",
					id: requesterAgentId
				},
				inheritedGitContributorProfileIds
			});
			const storePath = resolveSessionStorePathCore(cfg.session?.store, { agentId: targetAgentId });
			const childSessionPatch = admission.childSessionPatch ? {
				spawnDepth: admission.childSessionPatch.spawnDepth,
				...admission.childSessionPatch.subagentRole ? { subagentRole: admission.childSessionPatch.subagentRole } : {},
				subagentControlScope: admission.childSessionPatch.subagentControlScope
			} : {};
			childCreationEntry = await upsertSessionEntryCore({
				storePath,
				sessionKey,
				agentId: targetAgentId
			}, {
				...creationStamp,
				spawnedBy: requesterInternalKey,
				completionOwnerSessionKey: ownership.completionRequesterSessionKey,
				parentSessionKey: requesterInternalKey,
				...childSessionPatch,
				inheritedToolPolicyVersion: 1,
				...inheritedToolAllowPatch(ctx.inheritedToolAllowlist),
				...inheritedToolDenyPatch(ctx.inheritedToolDenylist),
				...params.label ? { label: params.label } : {}
			}, { assertCommitAllowed: ctx.assertActive }) ?? void 0;
			const initializedSession = await initializeAcpSpawnRuntime({
				assertActive: ctx.assertActive,
				cfg,
				sessionKey,
				targetAgentId,
				runtimeMode: spawnMode === "session" ? "persistent" : "oneshot",
				backendId,
				resumeSessionId: params.resumeSessionId,
				runtimeOptions: runtimeOptionsResult.runtimeOptions,
				modelExplicit: runtimeOptionsResult.modelExplicit,
				thinkingExplicit: runtimeOptionsResult.thinkingExplicit,
				cwd: runtimeCwd
			});
			closeRuntimeOnFailure = initializedSession.initialized.closeRuntimeOnFailure;
			ctx.assertActive?.();
			return {
				initializedSession,
				binding: preparedBinding ? await bindPreparedAcpThread({
					assertActive: ctx.assertActive,
					cfg,
					sessionKey,
					targetAgentId,
					label: params.label,
					preparedBinding,
					initializedRuntime: initializedSession
				}) : null
			};
		},
		async dispatchTurn(state) {
			state.deliveryPlan = resolveAcpSpawnBootstrapDeliveryPlan({
				cfg,
				spawnMode,
				effectiveStreamToParent,
				requester: requesterState,
				binding: state.binding
			});
			if (childCreationEntry) recordSessionCreated(cfg, {
				sessionKey,
				agentId: targetAgentId,
				entry: childCreationEntry
			});
			recordSubagentSpawned({
				childSessionKey: sessionKey,
				childRunId: childIdem,
				requesterSessionKey: requesterInternalKey,
				agentId: targetAgentId
			});
			const startParentRelay = (runId) => effectiveStreamToParent && parentSessionKey ? startAcpSpawnParentStreamRelay({
				runId,
				parentSessionKey,
				requesterAgentId,
				childSessionKey: sessionKey,
				childSessionId: state.initializedSession.sessionId,
				agentId: targetAgentId,
				env: parentRelayStateEnv,
				mainKey: cfg.session?.mainKey,
				sessionScope: cfg.session?.scope,
				eventRouting: parentEventRouting,
				deliveryContext: parentDeliveryCtx,
				emitStartNotice: false,
				cfg
			}) : void 0;
			state.parentRelay = startParentRelay(childIdem);
			const response = await launchAcpChildThroughGateway({
				assertDispatchCurrent: ctx.assertActive,
				task: params.task,
				sessionKey,
				deliveryPlan: state.deliveryPlan,
				childIdem,
				runTimeoutSeconds,
				label: params.label,
				attachments: gatewayAttachments,
				lineage: {
					enabled: isExecutionIdentityCollectionEnabled(cfg),
					backend: "acp",
					parentAgentId: requesterAgentId,
					requesterRef: requesterInternalKey,
					controllerRef: ownership.controllerSessionKey,
					depth: admission.childSessionPatch?.spawnDepth ?? 1,
					maxDepth: admission.maxSpawnDepth,
					targetAgentId,
					sandbox: params.sandbox === "require" ? "require" : "inherit",
					inheritedToolAllowlist: ctx.inheritedToolAllowlist,
					inheritedToolDenylist: ctx.inheritedToolDenylist
				},
				parentExecutionIdentityToken: readParentExecutionIdentity(ctx),
				participantStorePath: resolveSessionStorePathCore(cfg.session?.store, { agentId: targetAgentId })
			});
			const runId = readGatewayRunId(response) ?? childIdem;
			if (state.parentRelay && runId !== childIdem) {
				state.parentRelay.dispose();
				state.parentRelay = startParentRelay(runId);
			}
			state.parentRelay?.notifyStarted();
			return { runId };
		},
		async cleanupOnFailure({ state }) {
			state?.parentRelay?.dispose();
			await cleanupFailedAcpSpawn({
				cfg,
				sessionKey,
				agentId: targetAgentId,
				sessionEntry: childCreationEntry,
				deleteTranscript: true,
				closeRuntimeOnFailure
			});
		}
	};
	const { controllerSessionKey } = ownership;
	ctx.assertActive?.();
	const admissionReservation = hasSubagentEnvelope ? reserveChildAdmissionSlot({
		controllerSessionKey,
		childSessionKey: sessionKey,
		resolveAdmission
	}) : void 0;
	if (admissionReservation && !admissionReservation.ok) return rejectSubagentPolicy(admissionReservation.error);
	ctx.onSpawnEffectsStart?.();
	let expectsCompletionMessage = false;
	const pipelineResult = await runSpawnPipeline({
		adapter,
		assertActive: ctx.assertActive,
		admissionReservation,
		hookRunner: getGlobalHookRunner(),
		progressOrigin,
		progressSessionKey: ownership.completionRequesterSessionKey,
		buildRegistration: (state, runId) => {
			expectsCompletionMessage = !(state.deliveryPlan?.useInlineDelivery === true) && params.expectsCompletionMessage !== false;
			return {
				runId,
				requesterTurnRunId: ctx.requesterTurnRunId,
				childSessionKey: sessionKey,
				controllerSessionKey,
				requesterSessionKey: ownership.completionRequesterSessionKey,
				completionRequesterSessionId,
				completionRequesterLifecycleRevision,
				requesterOrigin,
				progressOrigin,
				requesterDisplayKey: ownership.completionRequesterDisplayKey,
				task: params.task,
				taskName: params.taskName,
				agentId: targetAgentId,
				requesterAgentId,
				cleanup: spawnMode === "session" ? "keep" : params.cleanup === "delete" ? "delete" : "keep",
				label: params.label,
				runTimeoutSeconds,
				expectsCompletionMessage,
				spawnMode
			};
		}
	});
	if (!pipelineResult.ok) {
		const { phase, error, runId } = pipelineResult;
		const bindingError = phase === "initialize" && isSessionBindingError(error);
		return {
			status: "error",
			errorCode: bindingError ? "thread_binding_invalid" : phase === "dispatch" ? "dispatch_failed" : "spawn_failed",
			error: bindingError ? error.message : phase === "register" ? `Failed to register ACP run: ${summarizeSpawnError(error)}. Cleanup was attempted, but the already-started ACP run may still finish in the background.` : summarizeSpawnError(error),
			...phase !== "initialize" ? { childSessionKey: sessionKey } : {},
			...phase === "register" && runId ? { runId } : {}
		};
	}
	return {
		status: "accepted",
		childSessionKey: sessionKey,
		runId: pipelineResult.runId,
		mode: spawnMode,
		runTimeoutSeconds,
		expectsCompletionMessage,
		...pipelineResult.state.deliveryPlan?.useInlineDelivery ? { inlineDelivery: true } : {},
		note: spawnMode === "session" ? ACP_SPAWN_SESSION_ACCEPTED_NOTE : ACP_SPAWN_ACCEPTED_NOTE
	};
}
//#endregion
export { cleanupFailedAcpSpawn as i, spawnAcpDirect as n, resolveRuntimeCwdForAcpSpawn as r, resolveAcpSpawnRuntimePolicyError as t };
