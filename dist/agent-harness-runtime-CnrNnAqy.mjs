import "./utils-DUAwk2p5.mjs";
import "./errors-YPvSaqwO.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import "./version-BMuSsYfE.mjs";
import "./session-key-BC4m_Ly5.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { a as getPluginValueInstance } from "./plugin-instance-scope-Cj8gR6lP.mjs";
import "./agent-events-Cg4kQnvf.mjs";
import { d as resolveExecModePolicy } from "./exec-approvals-core-GflUelcW.mjs";
import { o as expandToolGroups } from "./tool-policy-shared-DSNSYBF4.mjs";
import { r as createToolPolicyMatcher } from "./tool-policy-match-COwlx5YS.mjs";
import "./run-cleanup-timeout-ubtWL4LL.mjs";
import { i as shouldLoadRequesterScopedMcpHarnessRuntime } from "./agent-bundle-mcp-runtime-shared-BFBNCZj0.mjs";
import "./internal-runtime-context-CLIwiurx.mjs";
import "./provider-request-config-Dg6UPApz.mjs";
import { h as listCodexAppServerExtensionFactories } from "./loader-runtime-load-DCwhg2IV.mjs";
import { p as joinPresentTextSegments } from "./hooks-BKWpaofg.mjs";
import "./registry-CmDX3rgP.mjs";
import { t as getGlobalHookRunner } from "./hook-runner-global-CwCyBBBr.mjs";
import "./reply-payload-CZCVcyy_.mjs";
import "./agent-tools.before-tool-call-BbipAsOC.mjs";
import "./registry-BDCa-WcD.mjs";
import "./model-auth-ByqXHWUV.mjs";
import { a as maxAsk, o as minSecurity } from "./exec-approvals-policy-CMlDajgd.mjs";
import "./usage-DDsrNSO2.mjs";
import "./run-termination-JCCL0TyS.mjs";
import { r as prepareMemorySystemPromptAddition } from "./delegate-Dm-RaJov.mjs";
import "./diagnostic-DLixObfX.mjs";
import "./tool-metadata--ndgGyn8.mjs";
import "./agent-tool-metadata-BZbVjjCx.mjs";
import { y as queueEmbeddedAgentMessageWithOutcome } from "./runs-BSJKmITf.mjs";
import "./active-run-projections-Dk8tgs6I.mjs";
import "./user-turn-transcript.metadata-C4MejEIQ.mjs";
import "./tool-result-error-PlIKzTNz.mjs";
import "./gateway-CnezJTJC.mjs";
import "./embedded-agent-messaging-DIGGw97w.mjs";
import "./hook-helpers-CP-hOKld.mjs";
import "./gateway-question-DxW5eUtg.mjs";
import "./ask-user-tool-normalization-kYNTJiBF.mjs";
import "./tool-display-_JBRiGGG.mjs";
import "./tool-meta-C4q9nA07.mjs";
import { c as normalizeAgentRunAttemptTerminal, l as projectAgentRunAttemptTerminal, s as mergeAgentRunAttemptTerminal, u as setAgentRunAttemptTerminalFailure } from "./agent-run-terminal-outcome-BGbjspLO.mjs";
import "./agent-scope-runtime-BIhssPWI.mjs";
import "./date-time-B8B56dzx.mjs";
import "./context-engine-lifecycle-c7v9dJay.mjs";
import "./prepare-auth-CTne_sJu.mjs";
import "./heartbeat-tool-response-CZbTMQAj.mjs";
import "./agent-tools.ring-zero-context-DcmTQndF.mjs";
import "./fs-paths-CRmrkKx4.mjs";
import "./in-process-gateway-D3MPtHXl.mjs";
import "./tool-schema-projection-D9z9oa3w.mjs";
import "./nodes-utils-4kbftX2Z.mjs";
import "./embedded-agent-message-delivery-B-OMLJ8A.mjs";
import "./execution-auth-binding-CjwVYBbm.mjs";
import "./tool-replay-safety-DTN2fsoj.mjs";
import "./logger-CRHWOiHk.mjs";
import { n as buildCurrentInboundPrompt } from "./runtime-context-prompt-K3ClPtvW.mjs";
import { c as resolveBootstrapFilesForRun, n as buildBootstrapContextForFiles } from "./bootstrap-files-CnxP5PZe.mjs";
import "./sandbox-Ck63sGje.mjs";
import "./settled-turn-finalization-result-B8lL2uN5.mjs";
import { v as wrapPluginSystemContextSection } from "./context-engine-maintenance-DKbclwGZ.mjs";
import "./tools-DJhv7AUa.mjs";
import "./attempt-tool-construction-plan-BizPvV2W.mjs";
import "./agent-activity-events-DewyZbg3.mjs";
import "./embedded-agent-tool-results-DYYbK7mR.mjs";
import "./embedded-agent-messaging-extraction-S9GoiM01.mjs";
import "./progress-card-channel-summary-BDhTB4AK.mjs";
import "./embedded-agent-message-tool-source-reply-BpslttE_.mjs";
import { s as buildAgentHookContext } from "./lifecycle-hook-helpers--jVXBi1S.mjs";
import "./attempt-thread-helpers-CEiR3k19.mjs";
import "./transcript-visibility-DaOhtUI3.mjs";
import { n as prepareWatchedSessionsPrompt, o as prepareContextFilesForPrompt, r as PERSONAL_USER_CONTEXT_INSTRUCTIONS, t as buildWatchedSessionsPromptLines } from "./watched-sessions-prompt-CC-PSkBX.mjs";
import "./tool-result-middleware-BxnU_IaD.mjs";
import "./result-fallback-classifier-D-buYOIF.mjs";
import "./build-D19xbzxS.mjs";
import "./native-hook-relay-CXUYKBKa.mjs";
import { a as isStructuredInputRecord, i as compileStructuredInputUrl, n as compileStructuredInputForm, o as snapshotStructuredInput, r as compileStructuredInputQuestions, t as runStructuredInput } from "./structured-input-execution-EmP8BLaG.mjs";
import "./projection-tool-output-CDK_z3pi.mjs";
import path from "node:path";
//#region src/agents/harness/workspace-instructions.ts
/** Projects already-bounded agent instructions without changing bootstrap budgets. */
function buildAgentWorkspaceInstructionSnapshot(contextFiles, workspaceDir) {
	const files = selectAgentWorkspaceInstructionFiles(contextFiles, workspaceDir).filter((file) => !file.content.trimStart().startsWith("[MISSING] Expected at:") && file.content.trim().length > 0);
	if (files.length === 0) return {
		files,
		instructions: ""
	};
	const lines = [
		"## OpenClaw Agent Workspace Instructions",
		"",
		"OpenClaw loaded this bounded snapshot from the configured agent workspace.",
		""
	];
	for (const file of files) lines.push(`### ${file.path}`, "", file.content, "");
	return {
		files,
		instructions: lines.join("\n").trim()
	};
}
/** Selects only the configured workspace's root instruction document. */
function selectAgentWorkspaceInstructionFiles(files, workspaceDir) {
	const instructionsPath = path.join(path.resolve(workspaceDir), "AGENTS.md");
	return files.filter((file) => path.resolve(file.path) === instructionsPath);
}
//#endregion
//#region src/agents/harness/workspace-context.ts
/** Prepares Gateway workspace facts; the harness owns their native carriers and lifetime. */
async function prepareAgentWorkspaceContext(params) {
	const bootstrapFiles = await resolveBootstrapFilesForRun(params);
	const instructionsOnly = params.scope === "instructions-only";
	const memoryToolRouted = !instructionsOnly && params.memoryToolRouted === true;
	const memoryToolRoutedBootstrapFiles = memoryToolRouted ? prepareContextFilesForPrompt(bootstrapFiles.filter((file) => isRootMemoryPath(file.path, params.workspaceDir) && !file.missing && (file.content ?? "").trim().length > 0).map((file) => Object.assign(toContextFile(file), { bootstrapFile: file })), {
		order: params.contextFileOrder,
		caseInsensitivePathOrder: true,
		trimBasename: false
	}).map(({ file }) => file.bootstrapFile) : [];
	const budgetFiles = instructionsOnly ? selectAgentWorkspaceInstructionFiles(bootstrapFiles, params.workspaceDir).filter((file) => !file.missing) : memoryToolRouted ? bootstrapFiles.filter((file) => !isRootMemoryPath(file.path, params.workspaceDir)) : bootstrapFiles;
	const contextFiles = buildBootstrapContextForFiles(budgetFiles, params).map((file) => projectContextFile(file, params.projectPath));
	const instructionSnapshot = buildAgentWorkspaceInstructionSnapshot(contextFiles, params.workspaceDir);
	if (instructionsOnly) return {
		bootstrapFiles,
		contextFiles,
		instructionSnapshot,
		personaFiles: [],
		promptContextFiles: [],
		memoryReferenceFiles: [],
		memoryToolRoutedBootstrapFiles: []
	};
	const personaFiles = sortContextFiles(contextFiles.filter((file) => PERSONA_FILE_BASENAMES.has(contextFileBasename(file.path)) && !isMissingContextFile(file) && file.content.trim().length > 0), params.contextFileOrder);
	const promptContextFiles = sortContextFiles(contextFiles.filter((file) => {
		const basename = contextFileBasename(file.path);
		const nativeProjectDocument = params.nativeProjectDocBasenames ? params.nativeProjectDocBasenames.has(basename) : selectAgentWorkspaceInstructionFiles([file], params.workspaceDir).length > 0;
		return basename.length > 0 && !nativeProjectDocument && !PERSONA_FILE_BASENAMES.has(basename) && (!memoryToolRouted || !isRootMemoryPath(file.path, params.promptMemoryWorkspaceDir ?? params.workspaceDir)) && !isMissingContextFile(file);
	}), params.contextFileOrder);
	const memoryReferenceFiles = memoryToolRoutedBootstrapFiles.map((file) => projectContextFile(toContextFile(file), params.projectPath));
	const memoryRecallInstructions = params.memoryTools ? await prepareMemorySystemPromptAddition({
		availableTools: new Set(params.memoryTools.toolNames),
		citationsMode: params.memoryTools.citationsMode,
		agentId: params.agentId,
		agentSessionKey: params.sessionKey,
		sandboxed: params.memoryTools.sandboxed
	}).catch((error) => {
		if (params.onMemoryPreparationError) params.onMemoryPreparationError(error);
		else params.warn?.(`failed to prepare workspace memory recall instructions: ${String(error)}`);
	}) : void 0;
	return {
		bootstrapFiles,
		contextFiles,
		instructionSnapshot,
		personaFiles,
		personaInstructions: renderPersonaInstructions(personaFiles),
		promptContextFiles,
		memoryReferenceFiles,
		memoryToolRoutedBootstrapFiles,
		memoryRecallInstructions
	};
}
const PERSONA_FILE_BASENAMES = /* @__PURE__ */ new Set([
	"identity.md",
	"soul.md",
	"user.md"
]);
function renderPersonaInstructions(files) {
	if (files.length === 0) return;
	const lines = [
		"## OpenClaw Agent Soul",
		"",
		"OpenClaw loaded these workspace instruction files from the active agent workspace. They are the canonical definitions of who you are, how you think and work, and the human you work alongside. Internalize and follow them accordingly." + (files.some((file) => file.personalUser === true) ? ` ${PERSONAL_USER_CONTEXT_INSTRUCTIONS}` : ""),
		"",
		"<AGENT_SOUL>",
		""
	];
	for (const file of files) lines.push(`### ${file.path}`, "", file.content, "");
	lines.push("</AGENT_SOUL>");
	return lines.join("\n").trim();
}
function sortContextFiles(files, order) {
	return prepareContextFilesForPrompt(files, {
		order,
		caseInsensitivePathOrder: true,
		trimBasename: false
	}).map(({ file }) => file);
}
function toContextFile(file) {
	return {
		path: file.path,
		content: file.content ?? "",
		...file.personalUser === true ? { personalUser: true } : {}
	};
}
function projectContextFile(file, projectPath) {
	return projectPath ? {
		...file,
		path: projectPath(file.path)
	} : file;
}
function isRootMemoryPath(filePath, workspaceDir) {
	const normalized = filePath.trim();
	if (!normalized) return false;
	return (path.isAbsolute(normalized) ? path.resolve(normalized) : path.resolve(workspaceDir, normalized)) === path.join(path.resolve(workspaceDir), "MEMORY.md");
}
function contextFileBasename(filePath) {
	return filePath.trim().replaceAll("\\", "/").toLowerCase().split("/").pop() ?? "";
}
function isMissingContextFile(file) {
	return file.content.trimStart().startsWith("[MISSING] Expected at:");
}
//#endregion
//#region src/plugin-sdk/session-write-lock-runtime.ts
const DEFAULT_SESSION_WRITE_LOCK_ACQUIRE_TIMEOUT_MS = 6e4;
const DEFAULT_SESSION_WRITE_LOCK_STALE_MS = 18e5;
const DEFAULT_SESSION_WRITE_LOCK_MAX_HOLD_MS = 3e5;
/**
* @deprecated Session write leases were removed. This compatibility stub is scheduled for
* removal in the 2026.10 release train; use the session lane and durable writer claim/fence.
*/
function resolveSessionWriteLockAcquireTimeoutMs(_config, _env) {
	return DEFAULT_SESSION_WRITE_LOCK_ACQUIRE_TIMEOUT_MS;
}
/**
* @deprecated Session write leases were removed. This compatibility stub is scheduled for
* removal in the 2026.10 release train; use the session lane and durable writer claim/fence.
*/
function resolveSessionWriteLockOptions(_config, _params = {}) {
	return {
		timeoutMs: DEFAULT_SESSION_WRITE_LOCK_ACQUIRE_TIMEOUT_MS,
		staleMs: DEFAULT_SESSION_WRITE_LOCK_STALE_MS,
		maxHoldMs: DEFAULT_SESSION_WRITE_LOCK_MAX_HOLD_MS
	};
}
/**
* @deprecated Session write leases were removed. This no-op compatibility stub is scheduled
* for removal in the 2026.10 release train; use the session lane and durable writer claim/fence.
*/
async function acquireSessionWriteLock(_params) {
	return {
		assertOwned: () => void 0,
		release: async () => void 0
	};
}
//#endregion
//#region src/agents/harness/prompt-compaction-hook-helpers.ts
const log$1 = createSubsystemLogger("agents/harness");
/** Runs before-prompt hooks and returns the adjusted prompt fields. */
async function resolveAgentHarnessBeforePromptBuildResult(params) {
	const inputPrompt = buildCurrentInboundPrompt({
		context: params.currentInboundContext,
		prompt: params.prompt
	});
	const hookRunner = getGlobalHookRunner();
	const hasHeartbeatContribution = params.ctx.trigger === "heartbeat" && Boolean(hookRunner?.hasHooks("heartbeat_prompt_contribution"));
	const hasPromptBuildHooks = Boolean(hookRunner?.hasHooks("before_prompt_build"));
	if (!hasHeartbeatContribution && !hasPromptBuildHooks) return {
		prompt: inputPrompt,
		developerInstructions: resolveDeveloperInstructions(params.developerInstructions),
		promptInputRange: {
			start: 0,
			end: inputPrompt.length
		}
	};
	const hookCtx = buildAgentHookContext(params.ctx);
	const currentUserMessage = params.currentUserMessage;
	const currentUserMessageText = typeof currentUserMessage === "string" ? currentUserMessage : currentUserMessage ? typeof currentUserMessage.content === "string" ? currentUserMessage.content : currentUserMessage.content.flatMap((part) => part.type === "text" ? [part.text] : []).join("\n") : void 0;
	const currentUserMessageId = params.currentUserMessageId ?? (typeof currentUserMessage === "object" ? currentUserMessage.idempotencyKey : void 0);
	const promptEvent = {
		prompt: inputPrompt,
		...typeof currentUserMessageText === "string" ? { currentUserMessage: currentUserMessageText } : {},
		...typeof currentUserMessageId === "string" ? { currentUserMessageId } : {},
		messages: hasPromptBuildHooks ? typeof params.messages === "function" ? await params.messages() : params.messages : []
	};
	const heartbeatResult = hasHeartbeatContribution && hookRunner ? await hookRunner.runHeartbeatPromptContribution({
		sessionKey: params.ctx.sessionKey,
		agentId: params.ctx.agentId,
		heartbeatName: "heartbeat"
	}, hookCtx).catch((error) => {
		log$1.warn(`heartbeat_prompt_contribution hook failed: ${String(error)}`);
	}) : void 0;
	const promptBuildResult = hookRunner && hasPromptBuildHooks ? await hookRunner.runBeforePromptBuild(promptEvent, hookCtx).catch((error) => {
		log$1.warn(`before_prompt_build hook failed: ${String(error)}`);
	}) : void 0;
	const developerInstructions = resolveDeveloperInstructions(params.developerInstructions, promptBuildResult?.toolsAllow);
	const toolAuthority = params.toolAuthority;
	const toolAuthorityFingerprint = toolAuthority?.fingerprint?.trim();
	const authorizedPromptBuildResult = hookRunner && toolAuthorityFingerprint && toolAuthority ? await hookRunner.runAuthorizedPromptBuild(promptEvent, hookCtx, {
		toolAuthorityFingerprint,
		activeToolNames: toolAuthority.activeToolNames(),
		assertHostActive: toolAuthority.assertActive
	}).catch((error) => {
		log$1.warn(`authorized before_prompt_build hook failed: ${String(error)}`);
	}) : void 0;
	const systemPrompt = typeof promptBuildResult?.systemPrompt === "string" ? promptBuildResult.systemPrompt : developerInstructions;
	const promptPrefix = joinPresentTextSegments([
		heartbeatResult?.prependContext,
		promptBuildResult?.prependContext,
		authorizedPromptBuildResult?.prependContext
	]);
	const promptSuffix = joinPresentTextSegments([
		heartbeatResult?.appendContext,
		promptBuildResult?.appendContext,
		authorizedPromptBuildResult?.appendContext
	]);
	const prompt = joinPresentTextSegments([
		promptPrefix,
		inputPrompt,
		promptSuffix
	]) ?? inputPrompt;
	const promptInputStart = inputPrompt.length === 0 ? promptPrefix?.length ?? 0 : promptPrefix ? promptPrefix.length + 2 : 0;
	return {
		prompt,
		...promptBuildResult?.toolsAllow !== void 0 ? { toolsAllow: promptBuildResult.toolsAllow } : {},
		developerInstructions: joinPresentTextSegments([
			wrapPluginSystemContextSection(promptBuildResult?.prependSystemContext),
			systemPrompt,
			wrapPluginSystemContextSection(promptBuildResult?.appendSystemContext)
		]) ?? systemPrompt,
		promptInputRange: {
			start: promptInputStart,
			end: promptInputStart + inputPrompt.length
		}
	};
}
function resolveDeveloperInstructions(instructions, toolsAllow) {
	return typeof instructions === "string" ? instructions : instructions.build({
		toolsAllow,
		hasToolRestrictions: toolsAllow !== void 0 && !toolsAllow.some((name) => name.trim() === "*")
	}) ?? "";
}
/** Runs best-effort before-compaction hooks for a harness session. */
async function runAgentHarnessBeforeCompactionHook(params) {
	const hookRunner = getGlobalHookRunner();
	if (!hookRunner?.hasHooks("before_compaction")) return;
	try {
		await hookRunner.runBeforeCompaction({
			messageCount: params.messages?.length ?? -1,
			...params.messages ? { messages: params.messages } : {},
			sessionFile: params.sessionFile
		}, buildAgentHookContext(params.ctx));
	} catch (error) {
		log$1.warn(`before_compaction hook failed: ${String(error)}`);
	}
}
/** Runs best-effort after-compaction hooks for a harness session. */
async function runAgentHarnessAfterCompactionHook(params) {
	const hookRunner = getGlobalHookRunner();
	if (!hookRunner?.hasHooks("after_compaction")) return;
	try {
		await hookRunner.runAfterCompaction({
			messageCount: params.messages?.length ?? -1,
			compactedCount: params.compactedCount,
			sessionFile: params.sessionFile
		}, buildAgentHookContext(params.ctx));
	} catch (error) {
		log$1.warn(`after_compaction hook failed: ${String(error)}`);
	}
}
//#endregion
//#region src/agents/harness/codex-app-server-extensions.ts
/**
* Codex app-server extension runner.
*
* Harness integration uses this to let registered extensions observe and adjust
* tool results before they are returned to the agent runtime.
*/
const log = createSubsystemLogger("agents/harness");
/** Creates a runner that applies registered Codex app-server tool-result extensions. */
function createCodexAppServerToolResultExtensionRunner(ctx, factories = listCodexAppServerExtensionFactories()) {
	const handlers = [];
	const initPromise = (async () => {
		for (const factory of factories) {
			const instance = getPluginValueInstance(factory);
			await factory({ on(event, handler) {
				if (event === "tool_result") {
					if (instance) instance.run(() => handlers.push(instance.wrap(handler)));
					else handlers.push(handler);
				}
			} });
		}
	})();
	return { async applyToolResultExtensions(event) {
		await initPromise;
		let current = event.result;
		for (const handler of handlers) try {
			const next = await handler({
				...event,
				result: current
			}, ctx);
			if (next?.result) current = next.result;
		} catch (error) {
			const detail = error instanceof Error ? error.message : String(error);
			log.warn(`[codex] tool_result extension failed for ${event.toolName}: ${detail}`);
		}
		return current;
	} };
}
//#endregion
//#region src/plugin-sdk/agent-harness-runtime.ts
/** Core exec mode algebra for plugin-owned policy adapters. */
const execPolicy = Object.freeze({
	resolveExecModePolicy,
	minSecurity,
	maxAsk
});
/**
* Renders the Watched Sessions prompt block for plugin-owned harness prompts.
* Harness runtimes that assemble their own instruction layers (e.g. Codex)
* must surface the same watched-session facts as the embedded prompt, or the
* model keeps refusing cross-session questions on those runtimes (openclaw#114797).
*/
function buildWatchedSessionsHarnessContext(params) {
	const lines = buildWatchedSessionsPromptLines(prepareWatchedSessionsPrompt({
		enabled: true,
		...params
	}));
	return lines.length > 0 ? lines.join("\n").trimEnd() : void 0;
}
const agentHarnessAttemptTerminal = {
	merge: mergeAgentRunAttemptTerminal,
	normalize: normalizeAgentRunAttemptTerminal,
	project: projectAgentRunAttemptTerminal,
	setFailure: setAgentRunAttemptTerminalFailure
};
/** Bounded structured-input compilation and execution for native agent harnesses. */
const agentHarnessStructuredInput = Object.freeze({
	compileForm: compileStructuredInputForm,
	compileQuestions: compileStructuredInputQuestions,
	compileUrl: compileStructuredInputUrl,
	isRecord: isStructuredInputRecord,
	run: runStructuredInput,
	snapshot: snapshotStructuredInput
});
/**
* @deprecated Active-run queueing is an internal runtime concern. This legacy
* boolean API only reports immediate queue eligibility and cannot observe async
* runtime rejection; runtime-owned delivery paths should use acceptance-aware
* steering instead of public SDK queueing.
*/
function queueAgentHarnessMessage(sessionId, text, options) {
	return queueEmbeddedAgentMessageWithOutcome(sessionId, text, options).queued;
}
/** Detect prompt image references and load them through the same limits used by embedded runs. */
async function detectAndLoadAgentHarnessPromptImages(params) {
	const [{ resolveImageSanitizationLimits }, { detectAndLoadPromptImages }, { MAX_IMAGE_BYTES }] = await Promise.all([
		import("./image-sanitization-DmakoKjg.mjs"),
		import("./images-BkWCZt0n.mjs"),
		import("./media-core/constants.js")
	]);
	return detectAndLoadPromptImages({
		prompt: params.prompt,
		workspaceDir: params.workspaceDir,
		agentWorkspaceDir: params.agentWorkspaceDir,
		model: params.model,
		existingImages: params.existingImages,
		imageOrder: params.imageOrder,
		media: params.media,
		userTurnTranscriptRecorder: params.userTurnTranscriptRecorder,
		maxBytes: MAX_IMAGE_BYTES,
		maxDimensionPx: resolveImageSanitizationLimits(params.config).maxDimensionPx,
		workspaceOnly: params.workspaceOnly,
		localRoots: params.localRoots,
		sandbox: params.sandbox
	});
}
/** Load Codex bundle MCP thread config without forcing the heavy config module into SDK imports. */
async function loadCodexBundleMcpThreadConfig(params) {
	const { loadCodexBundleMcpThreadConfigCore: load } = await import("./codex-mcp-config-C1erfFRj.mjs");
	return load(params);
}
/** Lazily load the strict MCP proxy client with core-owned framing, startup, and shutdown. */
const mcpStdioRuntime = Object.freeze({ async load() {
	const { createMcpStdioClient } = await import("./mcp-stdio-client-BaFGWOHc.mjs");
	return { createMcpStdioClient };
} });
/**
* Materialize an MCP App view for a tool executed by a harness-native MCP client.
* The harness supplies a runtime adapter so the view keeps using that exact connection.
*/
async function prepareHarnessNativeMcpAppPreview(params) {
	if (params.runtime.mcpAppsEnabled !== true) return;
	const { buildMcpAppCanvasPayload, fetchMcpAppView } = await import("./mcp-ui-resource-Cy5C1JED.mjs");
	const view = await fetchMcpAppView({
		runtime: params.runtime,
		agentId: params.agentId,
		serverName: params.serverName,
		toolName: params.toolName,
		uiResourceUri: params.uiResourceUri,
		toolCallId: params.toolCallId,
		toolInput: params.toolInput,
		toolResult: params.toolResult,
		allowedAppToolNames: params.allowedAppToolNames
	});
	if (!view) return;
	return { mcpAppPreview: buildMcpAppCanvasPayload({
		...view,
		...params.runtime.sessionKey ? { originSessionKey: params.runtime.sessionKey } : {},
		...params.resultMetaState ? { resultMetaState: params.resultMetaState } : {}
	}) };
}
/**
* Materialize requester-scoped MCP tools for a harness run (dynamic tools, not
* harness-native MCP config). Lazy-loaded so harness plugins avoid the MCP manager graph.
*/
async function materializeRequesterScopedMcpToolsForHarnessRun(params) {
	if (!shouldLoadRequesterScopedMcpHarnessRuntime(params)) return;
	const { materializeRequesterScopedMcpToolsForHarnessRunCore: materialize } = await import("./agent-bundle-mcp-harness-BiIBgJD-.mjs");
	return materialize(params);
}
/**
* Classify terminal harness turns that completed without assistant output that
* should advance fallback. Deliberate silent replies such as NO_REPLY count as
* intentional output, while whitespace-only text remains fallback-eligible.
*/
function classifyAgentHarnessTerminalOutcome(params) {
	if (!params.turnCompleted || params.promptError !== void 0 && params.promptError !== null || params.assistantTexts.some((text) => text.trim().length > 0)) return;
	if (params.planText?.trim()) return "planning-only";
	if (params.reasoningText?.trim()) return "reasoning-only";
	return "empty";
}
const toolPolicy = Object.freeze({
	createToolPolicyMatcher,
	expandToolGroups
});
//#endregion
export { acquireSessionWriteLock as _, detectAndLoadAgentHarnessPromptImages as a, prepareAgentWorkspaceContext as b, materializeRequesterScopedMcpToolsForHarnessRun as c, queueAgentHarnessMessage as d, toolPolicy as f, runAgentHarnessBeforeCompactionHook as g, runAgentHarnessAfterCompactionHook as h, classifyAgentHarnessTerminalOutcome as i, mcpStdioRuntime as l, resolveAgentHarnessBeforePromptBuildResult as m, agentHarnessStructuredInput as n, execPolicy as o, createCodexAppServerToolResultExtensionRunner as p, buildWatchedSessionsHarnessContext as r, loadCodexBundleMcpThreadConfig as s, agentHarnessAttemptTerminal as t, prepareHarnessNativeMcpAppPreview as u, resolveSessionWriteLockAcquireTimeoutMs as v, buildAgentWorkspaceInstructionSnapshot as x, resolveSessionWriteLockOptions as y };
