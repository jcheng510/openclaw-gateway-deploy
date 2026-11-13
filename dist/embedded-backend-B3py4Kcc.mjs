import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { i as asOptionalObjectRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { i as waitForAbortSignal } from "./abort-signal-Z3A36sLL.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { a as resolveAgentDir, d as resolveAgentWorkspaceDir, g as resolveDefaultAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey, r as agentSessionKeysMatchByRequestKey } from "./session-key-BC4m_Ly5.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { f as onAgentEvent } from "./agent-events-Cg4kQnvf.mjs";
import { r as getRuntimeConfig, x as registerConfigWriteListener } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { t as INTERNAL_MESSAGE_CHANNEL } from "./message-channel-constants-Dq-VU_KZ.mjs";
import "./message-channel-DDiCYM9I.mjs";
import { i as logWarn, r as logInfo } from "./logger-DmolGPgx.mjs";
import { X as clearEmbeddedPluginApprovalBroker, Y as EmbeddedPluginApprovalBroker, Z as setEmbeddedPluginApprovalBroker } from "./agent-tools.before-tool-call-BbipAsOC.mjs";
import { t as CHAT_HISTORY_MAX_ENTRIES } from "./chat-history-constants-C-H8nkgi.mjs";
import { o as getPreparedModelRuntimeAuthMaterializations } from "./prepared-model-runtime-auth-Cx-T0hXc.mjs";
import { r as resolvePublishedModelCatalogOwner } from "./prepared-model-catalog-owner-FEMHd_X2.mjs";
import "./model-selection-BAezv3YH.mjs";
import { r as resolveThinkingDefaultCore } from "./model-thinking-default-C5zCCiYw.mjs";
import { n as loadAgentRuntimePluginRegistryHandle } from "./runtime-plugins-CsYRgcd7.mjs";
import { v as refreshPreparedModelRuntimeSnapshots } from "./prepared-model-runtime-CiPCD0fr.mjs";
import { a as loadPreparedModelCatalogSnapshot, d as readPreparedModelCatalog, p as withPreparedModelCatalogOwner } from "./prepared-model-catalog-2PLeV8Ci.mjs";
import { i as classifyAgentRunTerminalOutcome, s as isDefinitiveRunLifecycle } from "./agent-run-terminal-outcome-B2LU37vr.mjs";
import "./session-accessor-CGLseszP.mjs";
import { l as getMaxChatHistoryMessagesBytes } from "./server-constants-BH_EolwD.mjs";
import { m as applySessionPatchProjection } from "./session-accessor.reset-xoze7eVv.mjs";
import { n as setEmbeddedMode } from "./embedded-mode--Mk71zY-.mjs";
import { n as QuestionAnswerUnconfirmedError } from "./gateway-question-dispatch-Cfwiy10V.mjs";
import { b as queueEmbeddedAgentMessageWithOutcomeAsync, r as claimPendingEmbeddedAgentQuestionAnswer } from "./runs-BSJKmITf.mjs";
import { i as resolveActiveEmbeddedRunSessionId } from "./active-run-projections-Dk8tgs6I.mjs";
import { i as resolveTextCommand } from "./commands-registry-normalize-CvFDss4T.mjs";
import "./commands-registry-8w6_PlUY.mjs";
import { n as findAgentRunTerminalOutcome } from "./agent-run-terminal-error-BYNAyPjs.mjs";
import { i as parseGoalCommand, t as executeSessionGoalCommand } from "./commands-goal-BMt3Ddqt.mjs";
import { i as buildAgentRunTerminalOutcomeFromLifecycleEvent, t as AGENT_RUN_TERMINAL_RETRY_GRACE_MS } from "./agent-run-terminal-outcome-BGbjspLO.mjs";
import { n as resolveSessionModelRef } from "./session-model-ref-BOtRIEYy.mjs";
import { i as readToolValidationErrorSummary } from "./tool-error-summary-BGZoXZWD.mjs";
import { i as isChatStopCommandText } from "./chat-abort-BvX-AFVo.mjs";
import { m as resolveEffectiveChatHistoryMaxChars } from "./chat-display-projection.helpers-CUY3usMG.mjs";
import { a as shouldSuppressAssistantEventForLiveChat, i as projectLiveAssistantBufferedText, r as normalizeLiveAssistantBufferedText, t as capLiveAssistantText } from "./live-chat-projector-BtJEJKjU.mjs";
import { d as resolveAssistantTextInput, s as mergeAssistantText } from "./server-chat-state-DOgcdniX.mjs";
import { t as ensureContextWindowCacheLoaded } from "./context-yaaDrZYQ.mjs";
import { s as bindEmbeddedSessionRowProjection } from "./openclaw-tools-BwWTN0hs.mjs";
import { c as getSubagentSessionListReadSnapshotIdentity, g as prepareOptionalSubagentSessionListReadCache } from "./subagent-registry-state-DbBqXjLM.mjs";
import { s as resolveGatewaySessionStoreTargetWithStore, t as createGatewaySessionEntryReader } from "./session-utils-store-lookup-B0P8tI_m.mjs";
import { t as capArrayByJsonBytes } from "./session-utils.fs-D_x8Wjut.mjs";
import "./session-transcript-readers-DuU1dcaM.mjs";
import { C as previewQueueSummaryPrompt, E as waitForQueueDebounce, g as applyQueueDropPolicy, v as buildCollectPrompt } from "./state-D7Sqv4oU.mjs";
import { t as resolveQueueSettingsCore } from "./settings-BYJaJkHC.mjs";
import { n as projectSessionPatchResult, t as getSessionDefaults } from "./session-utils-model-DV42Uc60.mjs";
import { i as loadGatewaySessionEntryReadOnly, n as listAgentsForGateway, o as resolveCanonicalGatewaySessionStoreKey, r as loadGatewaySessionEntry } from "./session-utils-store-DWiBeNMH.mjs";
import { N as buildGatewaySessionRow, n as withReadySessionRows } from "./session-row-prepared-read-KCtcAa3e.mjs";
import { n as listProjectedSessions } from "./session-utils-list-Cb4ohb2c.mjs";
import "./session-utils-FXsPIESl.mjs";
import "./chat-display-projection-BZOWmxhK.mjs";
import { t as GatewayScheduler } from "./gateway-scheduler-Dq116NWy.mjs";
import { t as createDefaultDeps } from "./deps-DDJuVwX7.mjs";
import { r as agentCommandFromIngress } from "./agent-command-DUhFGJSr.mjs";
import { a as createChatHistoryByteCounter, i as createChatHistoryActivityProjection, s as replaceOversizedChatHistoryMessages, t as CHAT_HISTORY_MAX_SINGLE_MESSAGE_BYTES } from "./chat-history-budget-zzuPoeCz.mjs";
import { n as enrichChatHistoryCompactionMarkers } from "./chat-history-page-kernel-JYmKBTdR.mjs";
import { t as readChatHistoryPage } from "./chat-history-pages-UsCDs89e.mjs";
import { o as performGatewaySessionReset } from "./session-reset-service-DI9k-iKE.mjs";
import { l as formatTuiErrorMessage } from "./tui-formatters-kVWvG94G.mjs";
import { a as isAgentLifecycleYieldedWaiting } from "./session-event-payload-Bd0wzlaN.mjs";
import "./chat-DGn79Um2.mjs";
import { t as buildModelsListResult } from "./models-list-result-BlmkgUrX.mjs";
import { t as createGatewaySession } from "./session-create-service-CIUmvuie.mjs";
import { n as projectSessionsPatchEntry } from "./sessions-patch-1x_kkkJb.mjs";
import { t as createSessionRowProjection } from "./session-row-projection-C0w6Zw8m.mjs";
import { i as setEmbeddedQuestionBroker, n as clearEmbeddedQuestionBroker, t as EmbeddedQuestionBroker } from "./embedded-question-broker-DWiNrEKK.mjs";
import { t as resolveLocalRunShutdownGraceMs } from "./local-run-shutdown-BYg-mXpI.mjs";
import { randomUUID } from "node:crypto";
//#region src/tui/embedded-chat-projection.ts
const TUI_STATE_BY_TERMINAL_CLASSIFICATION = {
	success: void 0,
	timeout: "error",
	cancellation: "aborted",
	failure: "error"
};
function resolveTerminalChatState(outcome) {
	return TUI_STATE_BY_TERMINAL_CLASSIFICATION[classifyAgentRunTerminalOutcome(outcome)];
}
function assistantChatMessage(text) {
	return {
		role: "assistant",
		content: [{
			type: "text",
			text
		}],
		timestamp: Date.now()
	};
}
function payloadText(parts) {
	if (!Array.isArray(parts)) return "";
	return parts.map((part) => {
		const payload = asOptionalObjectRecord(part);
		return typeof payload?.text === "string" ? payload.text.trim() : "";
	}).filter(Boolean).join("\n\n").trim();
}
function resolveDeltaPayload(text, previousText) {
	if (previousText === void 0) return { deltaText: text };
	if (!text.startsWith(previousText)) return {
		deltaText: text,
		replace: true
	};
	return { deltaText: text.slice(previousText.length) };
}
//#endregion
//#region src/tui/embedded-local-run.ts
function timeoutSecondsFromMs(timeoutMs) {
	if (typeof timeoutMs !== "number" || !Number.isFinite(timeoutMs) || timeoutMs < 0) return;
	return String(Math.max(0, Math.ceil(timeoutMs / 1e3)));
}
function buildLocalQueuedPrompt(queue) {
	return [previewQueueSummaryPrompt({
		state: queue,
		noun: "message"
	}), queue.mode === "collect" && queue.messages.length > 1 ? buildCollectPrompt({
		title: "[Queued messages while agent was busy]",
		items: queue.messages,
		renderItem: (message, index) => `---\nQueued #${index + 1}\n${message}`
	}) : queue.messages[0] ?? ""].filter(Boolean).join("\n\n");
}
async function waitForLocalRunShutdown(promises) {
	if (promises.length === 0) return true;
	const timeoutMs = resolveLocalRunShutdownGraceMs();
	if (timeoutMs <= 0) return false;
	let timeout;
	let completed = false;
	await Promise.race([Promise.allSettled(promises).then(() => {
		completed = true;
	}), new Promise((resolve) => {
		timeout = setTimeout(resolve, timeoutMs);
		timeout.unref?.();
	})]);
	if (timeout) clearTimeout(timeout);
	return completed;
}
async function waitForQueuedLocalRun(previousRun, runId) {
	await previousRun.run.queuedRunReady;
	if (previousRun.run.controller.signal.aborted && previousRun.run.queuedAfter) return await waitForQueuedLocalRun(previousRun.run.queuedAfter, runId);
	if (!previousRun.run.finishing && !previousRun.run.lifecycleEnded) {
		await previousRun.promise;
		return;
	}
	const timeoutMs = resolveLocalRunShutdownGraceMs();
	if (timeoutMs <= 0) throw new Error(`timed out waiting for previous local run to finish post-turn maintenance for ${runId}`);
	let timeout;
	try {
		await Promise.race([previousRun.promise, new Promise((_, reject) => {
			timeout = setTimeout(() => {
				reject(/* @__PURE__ */ new Error(`timed out waiting for previous local run to finish post-turn maintenance for ${runId}`));
			}, timeoutMs);
			timeout.unref?.();
		})]);
	} finally {
		if (timeout) clearTimeout(timeout);
	}
}
//#endregion
//#region src/tui/embedded-prepared-runtime.ts
var EmbeddedPreparedModelRuntimeHost = class {
	constructor() {
		this.ready = Promise.resolve();
	}
	publish(config) {
		this.ready = refreshPreparedModelRuntimeSnapshots(config);
	}
	async waitUntilReady() {
		for (;;) {
			const ready = this.ready;
			await ready;
			if (ready === this.ready) return;
		}
	}
};
//#endregion
//#region src/tui/embedded-session-reader.ts
function readEmbeddedHistorySessionInfo(projection, target, identity) {
	return withReadySessionRows(projection, () => [target], (read) => {
		const current = read.describe(target);
		return current && current.entry.sessionId === identity.sessionId && current.entry.lifecycleRevision === identity.lifecycleRevision ? read.present(current) : void 0;
	});
}
function createEmbeddedSessionReader(lifecycle) {
	const read = async (opts, key) => {
		await lifecycle.ready();
		const publication = lifecycle.projection();
		const projection = await publication;
		if (!projection || publication !== lifecycle.projection()) throw new Error("Embedded session projection is unavailable");
		const result = await listProjectedSessions({
			projection,
			opts: opts ?? {},
			...key !== void 0 ? { key } : {}
		});
		if (publication !== lifecycle.projection()) throw new Error("Embedded session projection is unavailable");
		return result;
	};
	return {
		listSessions: (opts) => read(opts),
		async describeSession(opts) {
			const selected = parseAgentSessionKey(opts.sessionKey);
			const result = await read({
				agentId: opts.agentId ?? selected?.agentId,
				includeGlobal: opts.sessionKey === "global" || selected?.rest === "global",
				includeUnknown: opts.sessionKey === "unknown" || selected?.rest === "unknown",
				limit: 1
			}, opts.sessionKey);
			return {
				session: result.sessions[0] ?? null,
				defaults: result.defaults
			};
		}
	};
}
//#endregion
//#region src/tui/embedded-backend.ts
const silentRuntime = {
	log: (..._args) => void 0,
	error: (..._args) => void 0,
	exit: (code) => {
		throw new Error(`embedded tui runtime exit ${String(code)}`);
	}
};
const embeddedSessionStartupMigrationLog = {
	info: (message) => logInfo(message, silentRuntime),
	warn: (message) => logWarn(message, silentRuntime)
};
function ensureEmbeddedHistoryRuntimePluginsLoaded(params) {
	try {
		const workspaceDir = resolveAgentWorkspaceDir(params.cfg, params.sessionAgentId);
		loadAgentRuntimePluginRegistryHandle({
			config: params.cfg,
			workspaceDir
		});
		return { status: "warmed" };
	} catch (err) {
		return {
			status: "failed",
			error: formatTuiErrorMessage(err)
		};
	}
}
var EmbeddedTuiBackend = class {
	constructor() {
		this.connection = { url: "local embedded" };
		this.deps = createDefaultDeps();
		this.runs = /* @__PURE__ */ new Map();
		this.runPromises = /* @__PURE__ */ new Map();
		this.seq = 0;
		this.pendingLifecycleErrors = /* @__PURE__ */ new Map();
		this.pluginApprovalBroker = new EmbeddedPluginApprovalBroker();
		this.scheduler = new GatewayScheduler();
		this.questionBroker = new EmbeddedQuestionBroker(this.scheduler);
		this.preparedModelRuntime = new EmbeddedPreparedModelRuntimeHost();
		this.ready = Promise.resolve();
		this.sessionReader = createEmbeddedSessionReader({
			ready: () => this.ready,
			projection: () => this.sessionProjection
		});
		this.listSessions = this.sessionReader.listSessions;
		this.describeSession = this.sessionReader.describeSession;
	}
	start() {
		if (this.unsubscribe) return;
		setEmbeddedMode(true);
		ensureContextWindowCacheLoaded();
		this.previousRuntimeLog = defaultRuntime.log;
		this.previousRuntimeError = defaultRuntime.error;
		defaultRuntime.log = silentRuntime.log;
		defaultRuntime.error = silentRuntime.error;
		this.unsubscribe = onAgentEvent((evt) => this.handleAgentEvent(evt));
		setEmbeddedPluginApprovalBroker(this.pluginApprovalBroker);
		this.unsubscribePluginApprovals = this.pluginApprovalBroker.subscribe((event) => {
			this.emit(event.event, event.payload);
		});
		setEmbeddedQuestionBroker(this.questionBroker);
		this.unsubscribeQuestions = this.questionBroker.subscribe((event) => {
			this.emit(event.event, event.payload);
		});
		const config = getRuntimeConfig();
		this.unsubscribeConfigWrites = registerConfigWriteListener((event) => {
			this.preparedModelRuntime.publish(event.runtimeConfig);
		});
		this.preparedModelRuntime.publish(config);
		this.sessionProjection = (async () => {
			const { runSessionStartupMigration } = await import("./startup-migration-C0cmuwnr.mjs");
			await runSessionStartupMigration({
				cfg: config,
				env: process.env,
				log: embeddedSessionStartupMigrationLog
			});
			return createSessionRowProjection({
				cfg: getRuntimeConfig(),
				getConfig: getRuntimeConfig
			});
		})();
		this.ready = this.sessionProjection.then(() => {});
		this.unbindSessionProjection = bindEmbeddedSessionRowProjection(this.sessionProjection);
		queueMicrotask(() => {
			this.onConnected?.();
		});
	}
	async stop() {
		this.scheduler.beginClose();
		this.unsubscribeConfigWrites?.();
		this.unsubscribeConfigWrites = void 0;
		clearEmbeddedPluginApprovalBroker(this.pluginApprovalBroker);
		this.unsubscribePluginApprovals?.();
		this.unsubscribePluginApprovals = void 0;
		clearEmbeddedQuestionBroker(this.questionBroker);
		this.unsubscribeQuestions?.();
		this.unsubscribeQuestions = void 0;
		const maintenancePromises = [];
		for (const [runId, run] of this.runs) {
			if (run.finishing || run.lifecycleEnded) {
				const promise = this.runPromises.get(runId);
				if (promise) maintenancePromises.push(promise);
				continue;
			}
			run.controller.abort();
		}
		this.pluginApprovalBroker.stop();
		this.questionBroker.stop();
		await this.scheduler.stop();
		if (!await waitForLocalRunShutdown(maintenancePromises)) {
			for (const run of this.runs.values()) if (run.finishing || run.lifecycleEnded) run.controller.abort();
		}
		this.unbindSessionProjection?.();
		this.unbindSessionProjection = void 0;
		const projection = this.sessionProjection;
		this.sessionProjection = void 0;
		await projection?.catch(() => void 0).then((value) => value?.dispose());
		this.unsubscribe?.();
		this.unsubscribe = void 0;
		this.pendingLifecycleErrors.forEach(clearTimeout);
		this.pendingLifecycleErrors.clear();
		for (const run of this.runs.values()) run.controller.abort();
		this.runs.clear();
		this.runPromises.clear();
		defaultRuntime.log = this.previousRuntimeLog ?? defaultRuntime.log;
		defaultRuntime.error = this.previousRuntimeError ?? defaultRuntime.error;
		this.previousRuntimeLog = void 0;
		this.previousRuntimeError = void 0;
		setEmbeddedMode(false);
		await this.preparedModelRuntime.waitUntilReady();
	}
	async sendChat(opts) {
		await this.ready;
		await this.preparedModelRuntime.waitUntilReady();
		const runId = opts.runId ?? randomUUID();
		const question = /^\/(?:btw|side)(?::|\s)+(.*)$/i.exec(opts.message.trim())?.[1]?.trim() || void 0;
		const isQueueCommand = resolveTextCommand(opts.message)?.command.key === "queue";
		const agentId = resolveSessionAgentId({
			sessionKey: opts.sessionKey,
			config: getRuntimeConfig(),
			agentId: opts.agentId
		});
		const runScope = {
			sessionKey: opts.sessionKey,
			agentId
		};
		const stopCommand = this.hasAbortableSessionRun(runScope) && isChatStopCommandText(opts.message);
		const queuedAfter = question || stopCommand || isQueueCommand ? void 0 : this.findQueuedSessionRunPromise(runScope);
		if (stopCommand) {
			this.abortSessionRuns(runScope);
			return { runId };
		}
		let pendingQueue;
		if (queuedAfter) {
			const loadOptions = opts.agentId ? { agentId: opts.agentId } : void 0;
			const { cfg, canonicalKey, entry } = loadGatewaySessionEntry(opts.sessionKey, loadOptions);
			const activeSessionId = resolveActiveEmbeddedRunSessionId(canonicalKey);
			if (activeSessionId) {
				const claimed = await claimPendingEmbeddedAgentQuestionAnswer(activeSessionId, opts.message);
				if (claimed) return claimed;
			}
			let queueSettings = resolveQueueSettingsCore({
				cfg,
				channel: INTERNAL_MESSAGE_CHANNEL,
				sessionEntry: entry
			});
			if (queueSettings.mode === "steer") {
				if (activeSessionId) {
					if ((await queueEmbeddedAgentMessageWithOutcomeAsync(activeSessionId, opts.message, {
						steeringMode: "all",
						debounceMs: queueSettings.debounceMs ?? 500,
						isInboundUserMessage: true
					}).catch((error) => {
						if (error instanceof QuestionAnswerUnconfirmedError) throw error;
					}))?.queued) return { runId: queuedAfter.runId };
				}
				queueSettings = {
					...queueSettings,
					mode: "followup"
				};
			}
			if (queueSettings.mode === "interrupt") this.abortSessionRuns(runScope);
			else {
				const queued = this.enqueuePendingLocalMessage({
					runScope,
					message: opts.message,
					settings: queueSettings,
					fallbackRunId: queuedAfter.runId
				});
				if (queued.kind === "handled") return { runId: queued.runId };
				pendingQueue = queued.queue;
			}
		}
		const controller = new AbortController();
		const queuedRunReadiness = createDeferredCore();
		this.runs.set(runId, {
			sessionKey: opts.sessionKey,
			agentId,
			controller,
			buffer: "",
			managedMediaUrls: /* @__PURE__ */ new Set(),
			question,
			finishing: false,
			lifecycleEnded: false,
			registered: false,
			...pendingQueue ? { pendingQueue } : {},
			...queuedAfter ? { queuedAfter } : {},
			queuedRunReady: queuedRunReadiness.promise,
			markQueuedRunReady: queuedRunReadiness.resolve
		});
		const runPromise = this.runTurn({
			runId,
			sessionKey: opts.sessionKey,
			agentId: opts.agentId,
			message: opts.message,
			thinking: opts.thinking,
			deliver: opts.deliver,
			timeoutMs: opts.timeoutMs,
			controller,
			queuedAfter
		});
		this.runPromises.set(runId, runPromise);
		runPromise.finally(() => {
			this.runPromises.delete(runId);
		});
		if (isQueueCommand) await runPromise;
		return { runId };
	}
	async abortChat(opts) {
		const runIds = [];
		const candidates = opts.runId ? [[opts.runId, this.runs.get(opts.runId)]] : this.runs;
		for (const [runId, run] of candidates) {
			if (!run || !opts.runId && run.question || run.sessionKey !== opts.sessionKey) continue;
			if (opts.sessionKey === "global") {
				const defaultAgentId = resolveDefaultAgentId(getRuntimeConfig());
				const requestedAgentId = opts.agentId ? normalizeAgentId(opts.agentId) : defaultAgentId;
				if ((run.agentId ? normalizeAgentId(run.agentId) : defaultAgentId) !== requestedAgentId) continue;
			}
			if (!this.isAbortableRun(runId, run)) continue;
			run.controller.abort();
			runIds.push(runId);
		}
		return {
			ok: true,
			aborted: runIds.length > 0,
			runIds
		};
	}
	async loadImage(opts) {
		const { loadEmbeddedImage } = await import("./embedded-image-loader-ChD3y6er.mjs");
		return await loadEmbeddedImage(opts);
	}
	async loadHistory(opts) {
		await this.ready;
		await this.preparedModelRuntime.waitUntilReady();
		if (!getSubagentSessionListReadSnapshotIdentity()) await prepareOptionalSubagentSessionListReadCache();
		const loadOptions = opts.agentId ? { agentId: opts.agentId } : void 0;
		const selected = loadGatewaySessionEntryReadOnly(opts.sessionKey, {
			...loadOptions,
			includeStoreChildEntries: true
		});
		const { cfg, agentId: sessionAgentId, storePath, store, readSource, entry, canonicalKey } = selected;
		const sessionId = entry?.sessionId;
		const runtimePluginsPrewarm = ensureEmbeddedHistoryRuntimePluginsLoaded({
			cfg,
			sessionAgentId
		});
		const resolvedSessionModel = resolveSessionModelRef(cfg, entry, sessionAgentId);
		const max = Math.min(CHAT_HISTORY_MAX_ENTRIES, typeof opts.limit === "number" ? opts.limit : 200);
		const maxHistoryBytes = getMaxChatHistoryMessagesBytes();
		const effectiveMaxChars = resolveEffectiveChatHistoryMaxChars();
		const historyPage = await readChatHistoryPage({
			entry,
			provider: resolvedSessionModel.provider,
			sessionId,
			storePath,
			sessionAgentId,
			canonicalKey,
			max,
			maxHistoryBytes,
			effectiveMaxChars,
			offset: void 0,
			messageId: void 0
		});
		const normalized = enrichChatHistoryCompactionMarkers(historyPage.messages, entry);
		const activity = createChatHistoryActivityProjection(normalized, historyPage.activity);
		const byteCounter = createChatHistoryByteCounter(activity);
		const replaced = replaceOversizedChatHistoryMessages({
			messages: normalized,
			byteCounter,
			maxSingleMessageBytes: Math.min(CHAT_HISTORY_MAX_SINGLE_MESSAGE_BYTES, maxHistoryBytes)
		});
		const messages = capArrayByJsonBytes(replaced.messages, maxHistoryBytes - byteCounter.framingBytes(replaced.messages), byteCounter.messageBytes).items;
		const newestInFlightRun = [...this.runs.entries()].findLast(([, run]) => !run.question && run.terminalState !== "final" && agentSessionKeysMatchByRequestKey(run.sessionKey, opts.sessionKey) && normalizeAgentId(run.agentId) === normalizeAgentId(sessionAgentId));
		const inFlightRun = newestInFlightRun ? {
			runId: newestInFlightRun[0],
			text: projectLiveAssistantBufferedText(normalizeLiveAssistantBufferedText(newestInFlightRun[1].buffer, { managedMediaUrls: [...newestInFlightRun[1].managedMediaUrls] }).trim(), { suppressLeadFragments: true }).text.trim()
		} : void 0;
		let thinkingLevel = entry?.thinkingLevel;
		if (!thinkingLevel) {
			const catalog = await readPreparedModelCatalog({
				config: cfg,
				agentId: sessionAgentId,
				readOnly: true
			});
			thinkingLevel = resolveThinkingDefaultCore({
				cfg,
				agentId: sessionAgentId,
				provider: resolvedSessionModel.provider,
				model: resolvedSessionModel.model,
				catalog
			});
		}
		const defaults = getSessionDefaults(cfg, void 0, { allowPluginNormalization: false });
		const projection = await this.sessionProjection;
		const target = {
			key: canonicalKey,
			agentId: sessionAgentId,
			storePath: readSource?.path ?? storePath
		};
		const sessionInfo = entry && (entry.incognito || isIncognitoSessionKey(canonicalKey)) ? buildGatewaySessionRow({
			cfg,
			storePath,
			store,
			key: canonicalKey,
			entry,
			agentId: sessionAgentId,
			modelSource: {
				entry,
				readSourceEntry: createGatewaySessionEntryReader(selected)
			},
			lightweightListRow: true,
			skipTranscriptUsageFallback: true
		}) : entry && projection ? await readEmbeddedHistorySessionInfo(projection, target, {
			sessionId,
			lifecycleRevision: entry.lifecycleRevision
		}) : void 0;
		const verboseLevel = entry?.verboseLevel ?? cfg.agents?.defaults?.verboseDefault;
		if (sessionInfo) {
			sessionInfo.thinkingLevel = thinkingLevel;
			sessionInfo.verboseLevel = verboseLevel;
		}
		return {
			sessionKey: opts.sessionKey,
			sessionId,
			messages,
			defaults,
			activity: messages.flatMap((message) => activity.get(message) ?? []),
			...sessionInfo ? { sessionInfo } : {},
			thinkingLevel,
			fastMode: entry?.fastMode,
			verboseLevel,
			runtimePluginsPrewarm,
			...inFlightRun ? { inFlightRun } : {}
		};
	}
	async listAgents() {
		return await listAgentsForGateway(getRuntimeConfig());
	}
	async patchSession(opts) {
		await this.ready;
		await this.preparedModelRuntime.waitUntilReady();
		const cfg = getRuntimeConfig();
		const target = resolveGatewaySessionStoreTargetWithStore({
			cfg,
			key: opts.key,
			agentId: opts.agentId,
			exactRead: true
		});
		const applied = await applySessionPatchProjection({
			...opts.label === void 0 ? { sessionKeys: target.storeKeys } : {},
			storePath: target.storePath,
			resolveTarget: ({ store }) => {
				const { target: migratedTarget, primaryKey } = resolveCanonicalGatewaySessionStoreKey({
					cfg,
					key: opts.key,
					store,
					agentId: opts.agentId
				});
				return {
					primaryKey,
					candidateKeys: migratedTarget.storeKeys
				};
			},
			project: async ({ primaryKey, existingEntry, isLabelInUse }) => await projectSessionsPatchEntry({
				cfg,
				existingEntry,
				isLabelInUse,
				storeKey: primaryKey,
				agentId: target.agentId,
				patch: opts,
				loadGatewayModelCatalogSnapshot: () => loadPreparedModelCatalogSnapshot({
					config: cfg,
					agentId: target.agentId,
					readOnly: true
				})
			})
		});
		if (!applied.ok) throw new Error(applied.error.message);
		const projected = projectSessionPatchResult({
			canonicalKey: target.canonicalKey ?? opts.key,
			cfg,
			entry: applied.entry,
			storePath: target.storePath,
			targetAgentId: target.agentId
		});
		return {
			...projected,
			entry: { ...projected.entry }
		};
	}
	async resetSession(key, reason, opts) {
		await this.ready;
		if (loadGatewaySessionEntryReadOnly(key, opts).entry?.incognito === true) throw new Error("Incognito sessions cannot reset in place.");
		const result = await performGatewaySessionReset({
			key,
			operatorRoleActor: { kind: "system" },
			...opts?.agentId ? { agentId: opts.agentId } : {},
			reason: reason === "new" ? "new" : "reset",
			commandSource: "tui:embedded",
			armSessionDiffBaselineCapture: true
		});
		if (!result.ok) throw new Error(result.error.message);
		if ("incognitoDeleted" in result) return {
			ok: true,
			key: result.key,
			deleted: true
		};
		return {
			ok: true,
			key: result.key,
			entry: result.entry,
			resolved: result.resolved
		};
	}
	async createSession(opts) {
		await this.ready;
		await this.preparedModelRuntime.waitUntilReady();
		const cfg = getRuntimeConfig();
		const result = await createGatewaySession({
			cfg,
			operatorRoleActor: { kind: "system" },
			...opts,
			creation: {
				via: "operator",
				actor: {
					type: "human",
					source: "unknown"
				}
			},
			armSessionDiffBaselineCapture: true,
			emitCommandHooks: Boolean(opts.parentSessionKey),
			commandSource: "tui:embedded",
			loadGatewayModelCatalogSnapshot: () => loadPreparedModelCatalogSnapshot({
				config: cfg,
				agentId: resolveSessionAgentId({
					sessionKey: opts.key,
					config: cfg,
					agentId: opts.agentId
				}),
				readOnly: true
			})
		});
		if (!result.ok) throw new Error(result.error.message);
		return {
			ok: true,
			key: result.key,
			entry: result.entry,
			resolved: result.resolved
		};
	}
	async runBtwTurn(params) {
		const loadOptions = params.agentId ? { agentId: params.agentId } : void 0;
		const { cfg, agentId: sessionAgentId, canonicalKey, storePath, store, entry } = loadGatewaySessionEntry(params.sessionKey, loadOptions);
		if (!entry?.sessionId) throw new Error("/btw requires an active session with existing context.");
		const resolvedModel = resolveSessionModelRef(cfg, entry, sessionAgentId);
		const timeoutSeconds = timeoutSecondsFromMs(params.timeoutMs);
		const { runBtwSideQuestion } = await import("./btw-CpftjVqO.mjs");
		const reply = await runBtwSideQuestion({
			cfg,
			agentId: sessionAgentId,
			agentDir: resolveAgentDir(cfg, sessionAgentId),
			provider: resolvedModel.provider,
			model: resolvedModel.model,
			question: params.question,
			sessionEntry: entry,
			sessionStore: store,
			sessionKey: canonicalKey,
			storePath,
			resolvedThinkLevel: "off",
			resolvedReasoningLevel: "off",
			opts: {
				runId: params.runId,
				abortSignal: params.controller.signal,
				...timeoutSeconds !== void 0 ? { timeoutOverrideSeconds: Number(timeoutSeconds) } : {}
			},
			isNewSession: false,
			messageChannel: INTERNAL_MESSAGE_CHANNEL,
			messageProvider: INTERNAL_MESSAGE_CHANNEL,
			currentChannelId: INTERNAL_MESSAGE_CHANNEL
		});
		const text = reply?.text?.trim() ?? "";
		if (!text) throw new Error("/btw produced no answer.");
		return {
			sessionKey: canonicalKey,
			text,
			isError: reply?.isError === true
		};
	}
	async getGatewayStatus() {
		return `local embedded mode${this.runs.size > 0 ? ` (${String(this.runs.size)} active run${this.runs.size === 1 ? "" : "s"})` : ""}`;
	}
	async listPluginApprovals() {
		return this.pluginApprovalBroker.listPending();
	}
	async listQuestions() {
		return this.questionBroker.list();
	}
	async getQuestion(id) {
		return this.questionBroker.get({ id });
	}
	async resolveQuestion(params) {
		return this.questionBroker.resolve(params);
	}
	async resolvePluginApproval(id, decision) {
		return { ok: this.pluginApprovalBroker.resolve(id, decision) };
	}
	async listModels(opts) {
		await this.ready;
		await this.preparedModelRuntime.waitUntilReady();
		const cfg = getRuntimeConfig();
		const agentId = opts?.agentId ?? resolveDefaultAgentId(cfg);
		return await withPreparedModelCatalogOwner({
			config: cfg,
			agentId,
			readOnly: true
		}, async (snapshot) => (await buildModelsListResult({
			source: {
				kind: "published",
				owner: {
					...resolvePublishedModelCatalogOwner(snapshot),
					authMaterializations: getPreparedModelRuntimeAuthMaterializations(snapshot)
				}
			},
			agentId,
			params: { includeDetails: true }
		})).models);
	}
	async runGoalCommand(opts) {
		await this.ready;
		const loadOptions = opts.agentId ? { agentId: opts.agentId } : void 0;
		const { agentId, canonicalKey, storePath, entry } = loadGatewaySessionEntry(opts.sessionKey, loadOptions);
		const parsed = parseGoalCommand(opts.command.trim());
		if (!parsed) throw new Error("invalid goal command");
		const result = await executeSessionGoalCommand({
			parsed,
			sessionKey: canonicalKey,
			storePath,
			fallbackEntry: entry ?? {
				sessionId: randomUUID(),
				updatedAt: Date.now()
			},
			agentId
		});
		return result.continuationPrompt ? {
			text: result.text,
			continuationPrompt: result.continuationPrompt
		} : { text: result.text };
	}
	async runUsageCostCommand(opts) {
		await this.ready;
		const { cfg, agentId, canonicalKey, storePath, entry } = loadGatewaySessionEntry(opts.sessionKey, opts.agentId ? { agentId: opts.agentId } : void 0);
		const { formatSessionUsageCostSummary } = await import("./commands-session-cost.runtime.js");
		return { text: await formatSessionUsageCostSummary({
			cfg,
			sessionKey: canonicalKey,
			agentId,
			sessionEntry: entry,
			storePath
		}) };
	}
	enqueuePendingLocalMessage(params) {
		const pendingMessages = this.listPendingLocalMessages(params.runScope);
		const overflowQueue = {
			items: [...pendingMessages],
			cap: params.settings.cap ?? 20,
			dropPolicy: params.settings.dropPolicy ?? "summarize",
			droppedCount: 0,
			summaryLines: []
		};
		if (!applyQueueDropPolicy({
			queue: overflowQueue,
			summarize: (item) => item.message
		})) return {
			kind: "handled",
			runId: params.fallbackRunId
		};
		const retained = new Set(overflowQueue.items);
		const droppedByRun = /* @__PURE__ */ new Map();
		for (const dropped of pendingMessages) {
			if (retained.has(dropped)) continue;
			const indices = droppedByRun.get(dropped.run) ?? [];
			indices.push(dropped.messageIndex);
			droppedByRun.set(dropped.run, indices);
		}
		const inheritedSummaryLines = [];
		for (const [run, indices] of droppedByRun) {
			for (const index of indices.toSorted((a, b) => b - a)) run.pendingQueue?.messages.splice(index, 1);
			if (run.pendingQueue?.messages.length === 0) {
				inheritedSummaryLines.push(...run.pendingQueue.summaryLines);
				overflowQueue.droppedCount += run.pendingQueue.droppedCount;
				run.controller.abort();
			}
		}
		overflowQueue.summaryLines.unshift(...inheritedSummaryLines);
		if (overflowQueue.summaryLines.length > overflowQueue.cap) overflowQueue.summaryLines.splice(0, overflowQueue.summaryLines.length - overflowQueue.cap);
		const enqueuedAt = Date.now();
		for (const run of this.runs.values()) {
			if (!this.isSameRunScope(run, params.runScope) || !run.pendingQueue) continue;
			run.pendingQueue.lastEnqueuedAt = enqueuedAt;
			run.pendingQueue.debounceMs = params.settings.debounceMs ?? 500;
		}
		if (params.settings.mode === "collect") {
			const target = [...this.runs.entries()].findLast(([, run]) => this.isSameRunScope(run, params.runScope) && run.pendingQueue);
			const targetQueue = target?.[1].pendingQueue;
			if (target && targetQueue?.mode === "collect" && !target[1].controller.signal.aborted) {
				const [targetRunId] = target;
				targetQueue.messages.push(params.message);
				targetQueue.dropPolicy = params.settings.dropPolicy ?? "summarize";
				targetQueue.droppedCount += overflowQueue.droppedCount;
				targetQueue.summaryLines.push(...overflowQueue.summaryLines);
				return {
					kind: "handled",
					runId: targetRunId
				};
			}
		}
		return {
			kind: "enqueue",
			queue: {
				mode: params.settings.mode === "collect" ? "collect" : "followup",
				messages: [params.message],
				debounceMs: params.settings.debounceMs ?? 500,
				lastEnqueuedAt: enqueuedAt,
				dropPolicy: params.settings.dropPolicy ?? "summarize",
				droppedCount: overflowQueue.droppedCount,
				summaryLines: overflowQueue.summaryLines
			}
		};
	}
	listPendingLocalMessages(params) {
		const pending = [];
		for (const run of this.runs.values()) {
			if (!this.isSameRunScope(run, params) || !run.pendingQueue) continue;
			run.pendingQueue.messages.forEach((message, messageIndex) => {
				pending.push({
					run,
					messageIndex,
					message
				});
			});
		}
		return pending;
	}
	findQueuedSessionRunPromise(params) {
		let queuedAfter;
		for (const [runId, run] of this.runs) if (this.isSameRunScope(run, params) && !run.question) {
			const promise = this.runPromises.get(runId);
			if (promise) queuedAfter = {
				runId,
				run,
				promise
			};
		}
		return queuedAfter;
	}
	abortSessionRuns(params) {
		for (const [runId, run] of this.runs) if (this.isSameRunScope(run, params) && !run.question && this.isAbortableRun(runId, run)) run.controller.abort();
	}
	hasAbortableSessionRun(params) {
		for (const [runId, run] of this.runs) if (this.isSameRunScope(run, params) && !run.question && this.isAbortableRun(runId, run)) return true;
		return false;
	}
	isSameRunScope(run, params) {
		return run.sessionKey === params.sessionKey && (params.sessionKey !== "global" || run.agentId === params.agentId);
	}
	isAbortableRun(runId, run) {
		return !run.lifecycleEnded || this.runPromises.has(runId);
	}
	emit(event, payload) {
		this.onEvent?.({
			event,
			payload,
			seq: ++this.seq
		});
	}
	clearPendingLifecycleError(runId) {
		clearTimeout(this.pendingLifecycleErrors.get(runId));
		this.pendingLifecycleErrors.delete(runId);
	}
	scheduleChatError(runId, run, errorMessage) {
		this.clearPendingLifecycleError(runId);
		const timer = setTimeout(() => {
			this.pendingLifecycleErrors.delete(runId);
			this.emitChatTerminal(runId, run, "error", errorMessage, "provisional");
		}, AGENT_RUN_TERMINAL_RETRY_GRACE_MS);
		timer.unref?.();
		this.pendingLifecycleErrors.set(runId, timer);
	}
	emitChatDelta(runId, run) {
		const normalizedText = normalizeLiveAssistantBufferedText(run.buffer, { managedMediaUrls: [...run.managedMediaUrls] }).trim();
		const projected = projectLiveAssistantBufferedText(normalizedText, { suppressLeadFragments: true });
		const text = projected.text.trim();
		if (run.buffer && (!text || projected.suppress)) return;
		const deltaPayload = resolveDeltaPayload(text, run.lastBroadcastText);
		if (!deltaPayload.deltaText && !deltaPayload.replace) return;
		run.registered = true;
		run.lastBroadcastText = text;
		this.emit("chat", {
			runId,
			sessionKey: run.sessionKey,
			agentId: run.agentId,
			state: "delta",
			...deltaPayload,
			message: assistantChatMessage(text)
		});
	}
	emitChatTerminal(runId, run, state, detail, terminalState = "final") {
		this.clearPendingLifecycleError(runId);
		if (run.terminalState === "final" || run.terminalState === terminalState) return;
		run.terminalState = terminalState;
		if (terminalState === "final") {
			run.markQueuedRunReady();
			run.finishing = false;
			run.lifecycleEnded = true;
		}
		run.registered = true;
		run.lastBroadcastText = void 0;
		const projected = projectLiveAssistantBufferedText(normalizeLiveAssistantBufferedText(run.buffer, {
			final: true,
			managedMediaUrls: [...run.managedMediaUrls]
		}).trim(), { suppressLeadFragments: false });
		const text = state === "final" && !projected.suppress ? projected.text.trim() : "";
		this.emit("chat", {
			runId,
			sessionKey: run.sessionKey,
			agentId: run.agentId,
			state,
			...state === "final" && detail ? { stopReason: detail } : {},
			...state === "final" && run.lifecycleYielded ? { yielded: true } : {},
			...text ? { message: assistantChatMessage(text) } : {},
			...state !== "final" && (detail || state === "aborted" && run.toolErrorSummary) ? { errorMessage: formatTuiErrorMessage(detail ?? run.toolErrorSummary) } : {}
		});
	}
	projectTerminalOutcome(runId, run, metadata, options = {}) {
		const terminalError = metadata.error && typeof metadata.error === "object" && "message" in metadata.error ? metadata.error.message : metadata.error;
		const outcome = options.terminalOutcome ?? buildAgentRunTerminalOutcomeFromLifecycleEvent({
			phase: metadata.phase === "error" || terminalError ? "error" : "end",
			data: {
				...metadata,
				error: terminalError ? formatTuiErrorMessage(terminalError) : void 0
			},
			abortSignal: run.controller.signal
		});
		const state = resolveTerminalChatState(outcome);
		if (!state) return false;
		const diagnostic = state === "aborted" ? readToolValidationErrorSummary(metadata.toolErrorSummary) : outcome.reason === "failed" && options.visibleText || outcome.error || (outcome.status === "timeout" ? "The provider timed out. Please try again." : "Agent run failed.");
		if (metadata.phase === "error" && !isDefinitiveRunLifecycle({
			phase: "error",
			data: metadata
		})) this.scheduleChatError(runId, run, diagnostic);
		else this.emitChatTerminal(runId, run, state, diagnostic);
		return true;
	}
	ensureRunRegistered(runId, run) {
		if (run.registered || run.question) return;
		run.registered = true;
		run.lastBroadcastText = "";
		this.emit("chat", {
			runId,
			sessionKey: run.sessionKey,
			agentId: run.agentId,
			state: "delta",
			deltaText: "",
			message: assistantChatMessage("")
		});
	}
	handleAgentEvent(evt) {
		const run = this.runs.get(evt.runId);
		if (!run) return;
		const lifecyclePhase = evt.stream === "lifecycle" && typeof evt.data?.phase === "string" ? evt.data.phase : "";
		if (evt.stream !== "lifecycle" || lifecyclePhase !== "error") this.clearPendingLifecycleError(evt.runId);
		if (evt.stream !== "assistant") this.ensureRunRegistered(evt.runId, run);
		this.emit("agent", {
			runId: evt.runId,
			sessionKey: run.sessionKey,
			agentId: run.agentId,
			stream: evt.stream,
			data: evt.data
		});
		if (evt.stream === "assistant" || evt.stream === "tool" && evt.data?.phase === "start") run.toolErrorSummary = void 0;
		else if (evt.stream === "tool" && evt.data?.phase === "result") run.toolErrorSummary = readToolValidationErrorSummary(evt.data.toolErrorSummary);
		const assistantLiveChatInput = evt.stream === "assistant" ? resolveAssistantTextInput(evt.data) : void 0;
		if (assistantLiveChatInput && !run.question && !shouldSuppressAssistantEventForLiveChat(evt.data)) {
			for (const url of assistantLiveChatInput.managedMediaUrls ?? []) run.managedMediaUrls.add(url);
			const snapshot = mergeAssistantText({
				text: run.buffer,
				scope: run.assistantScope
			}, assistantLiveChatInput, "live");
			run.assistantScope = snapshot.scope;
			run.buffer = capLiveAssistantText(snapshot);
			this.emitChatDelta(evt.runId, run);
			return;
		}
		if (evt.stream !== "lifecycle") return;
		const phase = lifecyclePhase;
		if (phase === "finishing") {
			run.finishing = true;
			run.markQueuedRunReady();
			run.lifecycleStopReason = typeof evt.data?.stopReason === "string" ? evt.data.stopReason : void 0;
			return;
		}
		if (phase !== "end" && phase !== "error") return;
		run.finishing = false;
		if (phase === "error") {
			run.buffer = "";
			delete run.assistantScope;
		}
		if (this.projectTerminalOutcome(evt.runId, run, evt.data)) return;
		run.lifecycleEnded = true;
		run.markQueuedRunReady();
		run.lifecycleStopReason = typeof evt.data?.stopReason === "string" ? evt.data.stopReason : void 0;
		run.lifecycleYielded = isAgentLifecycleYieldedWaiting(evt.data);
	}
	async runTurn(params) {
		try {
			const recheckPreparedRuntimeAtAdmission = params.queuedAfter !== void 0;
			if (params.queuedAfter) {
				try {
					await Promise.race([waitForQueuedLocalRun(params.queuedAfter, params.runId), waitForAbortSignal(params.controller.signal)]);
				} catch (error) {
					const run = this.runs.get(params.runId);
					if (run) {
						const errorMessage = error instanceof Error ? error.message : String(error);
						this.emitChatTerminal(params.runId, run, "error", `previous run did not finish cleanly: ${errorMessage}`);
					}
					return;
				}
				if (params.controller.signal.aborted) {
					const run = this.runs.get(params.runId);
					if (run) this.emitChatTerminal(params.runId, run, "aborted");
					return;
				}
			}
			const activeRun = this.runs.get(params.runId);
			delete activeRun?.queuedAfter;
			let message = params.message;
			if (activeRun?.pendingQueue) {
				await waitForQueueDebounce(activeRun.pendingQueue, params.controller.signal);
				if (params.controller.signal.aborted) {
					this.emitChatTerminal(params.runId, activeRun, "aborted");
					return;
				}
				message = buildLocalQueuedPrompt(activeRun.pendingQueue);
				delete activeRun.pendingQueue;
			}
			if (recheckPreparedRuntimeAtAdmission) {
				await this.preparedModelRuntime.waitUntilReady();
				if (params.controller.signal.aborted) {
					if (activeRun) this.emitChatTerminal(params.runId, activeRun, "aborted");
					return;
				}
			}
			if (activeRun?.question) {
				const result = await this.runBtwTurn({
					runId: params.runId,
					sessionKey: params.sessionKey,
					...params.agentId ? { agentId: params.agentId } : {},
					question: activeRun.question,
					timeoutMs: params.timeoutMs,
					controller: params.controller
				});
				const run = this.runs.get(params.runId);
				if (!run) return;
				if (params.controller.signal.aborted) {
					this.emitChatTerminal(params.runId, run, "aborted");
					return;
				}
				this.emit("chat.side_result", {
					kind: "btw",
					runId: params.runId,
					sessionKey: result.sessionKey,
					agentId: run.agentId,
					question: run.question,
					text: result.text,
					...result.isError ? { isError: true } : {}
				});
				this.emitChatTerminal(params.runId, run, "final");
				return;
			}
			const loadOptions = params.agentId ? { agentId: params.agentId } : void 0;
			const { agentId, canonicalKey, entry } = loadGatewaySessionEntry(params.sessionKey, loadOptions);
			const result = await agentCommandFromIngress({
				message,
				sessionKey: canonicalKey,
				agentId,
				...entry?.sessionId ? { sessionId: entry.sessionId } : {},
				thinking: params.thinking,
				deliver: params.deliver,
				channel: INTERNAL_MESSAGE_CHANNEL,
				runContext: { messageChannel: INTERNAL_MESSAGE_CHANNEL },
				timeout: timeoutSecondsFromMs(params.timeoutMs),
				runId: params.runId,
				abortSignal: params.controller.signal,
				allowModelOverride: false
			}, silentRuntime, this.deps);
			const run = this.runs.get(params.runId);
			if (!run) return;
			if (this.projectTerminalOutcome(params.runId, run, result?.meta ?? {}, { visibleText: payloadText(result?.payloads) })) return;
			run.lifecycleYielded ||= isAgentLifecycleYieldedWaiting({
				phase: "end",
				...result?.meta
			});
			if (run.terminalState !== "final") {
				const finalText = payloadText(result?.payloads);
				if (finalText) run.buffer = finalText;
				const stopReason = run.lifecycleStopReason ?? (typeof result?.meta?.stopReason === "string" ? result.meta.stopReason : void 0);
				this.emitChatTerminal(params.runId, run, "final", stopReason);
			}
		} catch (error) {
			const run = this.runs.get(params.runId);
			if (!run) return;
			const errorMessage = error instanceof Error ? error.message : String(error);
			const outcome = findAgentRunTerminalOutcome(error);
			this.projectTerminalOutcome(params.runId, run, outcome ?? {
				status: "error",
				error: errorMessage
			}, outcome ? { terminalOutcome: outcome } : {});
		} finally {
			this.runs.get(params.runId)?.markQueuedRunReady();
			this.runs.delete(params.runId);
		}
	}
};
//#endregion
export { EmbeddedTuiBackend };
