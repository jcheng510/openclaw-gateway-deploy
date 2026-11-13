import { c as normalizeOptionalLowercaseString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { N as resolveOptionalIntegerOption, s as asFiniteNumber } from "./number-coercion-Dq1l5muL.mjs";
import { n as resolvePreferredOpenClawTmpDir } from "./tmp-openclaw-dir-BSb3HetY.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.mjs";
import { r as MAX_IMAGE_BYTES } from "./constants-GzjKtFvA.mjs";
import { t as resolveDefaultModelForAgent } from "./model-selection-config-rcK5tFX8.mjs";
import { i as listRegisteredPluginAgentPromptGuidance } from "./command-registry-state-BcKcRvTW.mjs";
import { r as detectRuntimeShell } from "./shell-utils-C78RwNdY.mjs";
import "./model-selection-BAezv3YH.mjs";
import { r as extensionForMime } from "./mime-CGDYrRzL.mjs";
import { t as privateFileStore } from "./private-file-store-DM0i141q.mjs";
import { i as resolveRuntimeOsLabel } from "./os-summary-Dtr7EZKM.mjs";
import { t as AGENT_LANE_SUBAGENT } from "./lanes-BJoXx6GG.mjs";
import { t as isAcpRuntimeSpawnAvailable } from "./availability-cD_0S0xD.mjs";
import { n as detectAndLoadPromptImages, r as detectImageReferences } from "./images-B_8zJlPf.mjs";
import { i as buildConfiguredAgentSystemPrompt, t as buildSystemPromptParams } from "./system-prompt-params-QzMF23Cp.mjs";
import { t as formatTomlConfigOverride } from "./toml-inline-nu7ilue8.mjs";
import { t as formatCliImageTurnContext } from "./cli-image-turn-correlation-BVXO9f3I.mjs";
import { n as cliBackendLog } from "./log-Db8XPmer.mjs";
import { n as CLI_RESUME_WATCHDOG_DEFAULTS, r as CLI_WATCHDOG_MIN_TIMEOUT_MS, t as CLI_FRESH_WATCHDOG_DEFAULTS } from "./cli-watchdog-defaults-CzmnkdzO.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
import crypto from "node:crypto";
import { tempWorkspace } from "@openclaw/fs-safe/temp";
import { stripSystemPromptCacheBoundary } from "@openclaw/ai/internal/shared";
import { fileStore } from "@openclaw/fs-safe/store";
//#region src/agents/cli-runner/reliability.ts
/**
* Watchdog and supervisor key helpers for CLI runner reliability.
*/
function pickWatchdogProfile(backend, useResume, trigger, hasExplicitRunTimeout) {
	const configured = useResume ? backend.reliability?.watchdog?.resume : backend.reliability?.watchdog?.fresh;
	const defaults = useResume && !configured && (trigger === "cron" || hasExplicitRunTimeout === true) ? CLI_FRESH_WATCHDOG_DEFAULTS : useResume ? CLI_RESUME_WATCHDOG_DEFAULTS : CLI_FRESH_WATCHDOG_DEFAULTS;
	const ratio = asFiniteNumber(configured?.noOutputTimeoutRatio);
	const minMs = resolveOptionalIntegerOption(configured?.minMs, { min: 1e3 }) ?? defaults.minMs;
	const maxMs = resolveOptionalIntegerOption(configured?.maxMs, { min: 1e3 }) ?? defaults.maxMs;
	return {
		noOutputTimeoutRatio: ratio === void 0 ? defaults.noOutputTimeoutRatio : Math.max(.05, Math.min(.95, ratio)),
		minMs: Math.min(minMs, maxMs),
		maxMs: Math.max(minMs, maxMs)
	};
}
/** Resolves the no-output watchdog timeout for a fresh or resumed CLI run. */
function resolveCliNoOutputTimeoutMs(params) {
	if (params.expectedQuiet) return params.timeoutMs;
	const hasExplicitRunTimeout = typeof params.runTimeoutOverrideMs === "number" && Number.isFinite(params.runTimeoutOverrideMs) && params.runTimeoutOverrideMs > 0;
	const profile = pickWatchdogProfile(params.backend, params.useResume, params.trigger, hasExplicitRunTimeout);
	const cap = Math.max(CLI_WATCHDOG_MIN_TIMEOUT_MS, params.timeoutMs - 1e3);
	const computed = Math.floor(params.timeoutMs * profile.noOutputTimeoutRatio);
	const bounded = Math.min(profile.maxMs, Math.max(profile.minMs, computed));
	return Math.min(bounded, cap);
}
function resolveCliRunTimeoutOverrideMs(params) {
	if (params.runTimeoutOverrideMs !== void 0) return params.runTimeoutOverrideMs;
	const configuredTimeoutSeconds = params.config?.agents?.defaults?.timeoutSeconds;
	return params.lane !== AGENT_LANE_SUBAGENT && typeof configuredTimeoutSeconds === "number" && Number.isFinite(configuredTimeoutSeconds) && configuredTimeoutSeconds > 0 ? params.timeoutMs : void 0;
}
/** Builds a supervisor scope key for session-owned CLI processes. */
function buildCliSupervisorScopeKey(params) {
	const commandToken = normalizeLowercaseStringOrEmpty(path.basename(params.backend.command ?? ""));
	const backendToken = normalizeLowercaseStringOrEmpty(params.backendId);
	const sessionToken = params.cliSessionId?.trim();
	if (!sessionToken) return;
	return `cli:${backendToken}:${commandToken}:${sessionToken}`;
}
//#endregion
//#region src/agents/cli-runner/helpers.ts
const CLI_RUN_QUEUE = new KeyedAsyncQueue();
const CLI_IMAGE_SWEEP_TTL_MS = 6048e5;
const sweptCliImageRoots = /* @__PURE__ */ new Set();
function isClaudeCliBackendId(providerId) {
	return normalizeOptionalLowercaseString(providerId) === "claude-cli";
}
function enqueueCliRun(key, task) {
	return CLI_RUN_QUEUE.enqueue(key, task);
}
function resolveCliRunQueueKey(params) {
	const requiresLiveSessionSerialization = params.liveSession !== void 0;
	if (params.serialize === false && !requiresLiveSessionSerialization) return `${params.backendId}:${params.runId}`;
	const ownerKey = params.ownerKey?.trim();
	if (requiresLiveSessionSerialization && ownerKey) return `${params.backendId}:owner:${ownerKey}`;
	if (isClaudeCliBackendId(params.backendId)) {
		const sessionId = params.cliSessionId?.trim();
		if (sessionId) return `${params.backendId}:session:${sessionId}`;
		if (ownerKey) return `${params.backendId}:owner:${ownerKey}`;
		const workspaceDir = params.workspaceDir.trim();
		if (workspaceDir) return `${params.backendId}:workspace:${workspaceDir}`;
	}
	return params.backendId;
}
function buildCliAgentSystemPrompt(params) {
	const runtimeCwd = params.cwd?.trim() || params.workspaceDir;
	const defaultModelRef = resolveDefaultModelForAgent({
		cfg: params.config ?? {},
		agentId: params.agentId
	});
	const defaultModelLabel = `${defaultModelRef.provider}/${defaultModelRef.model}`;
	const { runtimeInfo, userTimezone, userDate } = buildSystemPromptParams({
		config: params.config,
		agentId: params.agentId,
		workspaceDir: runtimeCwd,
		cwd: runtimeCwd,
		preparedGitCoauthorPrompt: params.preparedGitCoauthorPrompt,
		requesterProfileId: params.requesterProfileId,
		runtime: {
			sessionKey: params.sessionKey,
			sessionId: params.sessionId,
			host: "openclaw",
			os: resolveRuntimeOsLabel(),
			arch: os.arch(),
			node: process.version,
			model: params.modelDisplay,
			defaultModel: defaultModelLabel,
			shell: detectRuntimeShell(),
			channel: params.runtimeChannel,
			chatType: params.runtimeChatType,
			capabilities: params.runtimeCapabilities
		}
	});
	return buildConfiguredAgentSystemPrompt({
		config: params.config,
		preparedModelRuntime: params.preparedModelRuntime,
		agentId: params.agentId,
		workspaceDir: params.workspaceDir,
		runtimeCwd,
		extraSystemPrompt: params.extraSystemPrompt,
		sourceReplyDeliveryMode: params.sourceReplyDeliveryMode,
		requireExplicitMessageTarget: params.requireExplicitMessageTarget,
		silentReplyPromptMode: params.silentReplyPromptMode,
		ownerNumbers: params.ownerNumbers,
		reasoningTagHint: false,
		docsPath: params.docsPath,
		sourcePath: params.sourcePath,
		acpEnabled: isAcpRuntimeSpawnAvailable({ config: params.config }),
		promptSurface: "cli_backend",
		nativeCommandGuidanceLines: listRegisteredPluginAgentPromptGuidance({ surface: "cli_backend" }),
		runtimeInfo,
		toolNames: params.tools.map((tool) => tool.name),
		messageTool: params.tools.find((tool) => tool.name.trim().toLowerCase() === "message"),
		skillsPrompt: params.skillsPrompt,
		userTimezone,
		userDate,
		contextFiles: params.contextFiles,
		bootstrapMode: params.bootstrapMode,
		bootstrapTruncationNotice: params.bootstrapTruncationNotice
	});
}
function normalizeCliModel(modelId, backend) {
	const trimmed = modelId.trim();
	if (!trimmed) return trimmed;
	return backend.modelAliases?.[trimmed] || backend.modelAliases?.[normalizeLowercaseStringOrEmpty(trimmed)] || trimmed;
}
function resolveSystemPromptUsage(params) {
	const systemPrompt = params.systemPrompt?.trim();
	if (!systemPrompt) return null;
	const when = params.backend.systemPromptWhen ?? "first";
	if (when === "never") return null;
	if (when === "first" && !params.isNewSession) return null;
	if (!params.backend.systemPromptArg?.trim() && !params.backend.systemPromptFileArg?.trim() && !params.backend.systemPromptFileConfigKey?.trim()) return null;
	return systemPrompt;
}
function resolveSessionIdToSend(params) {
	const mode = params.backend.sessionMode ?? "always";
	const existing = params.cliSessionId?.trim();
	if (mode === "none") return {
		sessionId: void 0,
		isNew: !existing
	};
	if (mode === "existing") return {
		sessionId: existing,
		isNew: !existing
	};
	if (existing) return {
		sessionId: existing,
		isNew: false
	};
	return {
		sessionId: crypto.randomUUID(),
		isNew: true
	};
}
function resolvePromptInput(params) {
	if (params.backend.input === "stdin" || params.backend.maxPromptArgChars && params.prompt.length > params.backend.maxPromptArgChars) return { stdin: params.prompt };
	return { argsPrompt: params.prompt };
}
function resolveCliImageFileName(image) {
	const ext = extensionForMime(image.mimeType) ?? ".bin";
	return `${sha256Hex(`${image.mimeType}\0${image.data}`)}${ext}`;
}
async function sweepCliImageRoot(imageRoot) {
	if (sweptCliImageRoots.has(imageRoot)) return;
	sweptCliImageRoots.add(imageRoot);
	try {
		await fileStore({ rootDir: imageRoot }).pruneExpired({ ttlMs: CLI_IMAGE_SWEEP_TTL_MS });
	} catch (error) {
		cliBackendLog.debug(`cli image cache sweep failed: ${String(error)}`);
	}
}
function appendImagePathsToPrompt(prompt, paths, prefix = "") {
	if (!paths.length) return prompt;
	const trimmed = prompt.trimEnd();
	return `${trimmed}${trimmed ? "\n\n" : ""}${paths.map((entry) => `${prefix}${entry}`).join("\n")}`;
}
async function writeCliImages(params) {
	const imageRoot = params.backend.imagePathScope === "workspace" ? path.join(params.workspaceDir, ".openclaw-cli-images") : path.join(resolvePreferredOpenClawTmpDir(), "openclaw-cli-images");
	await fs.mkdir(imageRoot, {
		recursive: true,
		mode: 448
	});
	await sweepCliImageRoot(imageRoot);
	const store = privateFileStore(imageRoot);
	const paths = [];
	for (const image of params.images) {
		const fileName = resolveCliImageFileName(image);
		const buffer = Buffer.from(image.data, "base64");
		await store.writeText(fileName, buffer);
		paths.push(store.path(fileName));
	}
	return {
		paths,
		cleanup: async () => {}
	};
}
async function writeCliSystemPromptFile(params) {
	if (!params.backend.systemPromptFileArg?.trim() && !params.backend.systemPromptFileConfigKey?.trim()) return { cleanup: async () => {} };
	const workspace = await tempWorkspace({
		rootDir: resolvePreferredOpenClawTmpDir(),
		prefix: "openclaw-cli-system-prompt-"
	});
	return {
		filePath: await workspace.write("system-prompt.md", stripSystemPromptCacheBoundary(params.systemPrompt)),
		cleanup: () => workspace.cleanup().then(() => void 0)
	};
}
async function prepareCliPromptImagePayload(params) {
	let prompt = params.prompt;
	const imagePrompt = params.imagePrompt ?? prompt;
	const imageResult = params.imagePrompt !== void 0 || Boolean(params.media?.length) || Boolean(params.mediaImageLayout) || !params.images?.length && detectImageReferences(imagePrompt).length > 0 ? await detectAndLoadPromptImages({
		prompt: imagePrompt,
		media: params.media,
		workspaceDir: params.workspaceDir,
		model: { input: ["text", "image"] },
		existingImages: params.images,
		imageOrder: params.imageOrder,
		mediaImageLayout: params.mediaImageLayout,
		maxBytes: MAX_IMAGE_BYTES,
		localRoots: params.localRoots
	}) : void 0;
	if (imageResult?.failedMediaCount) throw new Error(`failed to hydrate ${imageResult.failedMediaCount} structured image attachment(s) for CLI input`);
	const resolvedImages = imageResult?.images ?? params.images ?? [];
	if (resolvedImages.length === 0) return { prompt };
	const imagePayload = await writeCliImages({
		backend: params.backend,
		workspaceDir: params.workspaceDir,
		images: resolvedImages
	});
	const imagePaths = imagePayload.paths;
	if (!params.backend.imageArg || params.backend.input === "stdin" || params.backend.imageArg === "@") {
		if (params.imageTurnKey) prompt = `${prompt.trimEnd()}\n\n${formatCliImageTurnContext(params.imageTurnKey)}`;
		prompt = appendImagePathsToPrompt(prompt, imagePaths, params.backend.imageArg === "@" ? "@" : "");
	}
	return {
		prompt,
		imagePaths,
		cleanupImages: imagePayload.cleanup
	};
}
function buildCliArgs(params) {
	const args = [...params.baseArgs];
	const shouldSendSystemPrompt = !params.useResume || params.backend.systemPromptWhen === "always" || params.sendSystemPromptOnResume;
	if (params.backend.modelArg && params.modelId) args.push(params.backend.modelArg, params.modelId);
	if (shouldSendSystemPrompt && params.systemPrompt) {
		if (params.systemPromptFilePath && params.backend.systemPromptFileArg) args.push(params.backend.systemPromptFileArg, params.systemPromptFilePath);
		else if (params.systemPromptFilePath && params.backend.systemPromptFileConfigKey) args.push(params.backend.systemPromptFileConfigArg ?? "-c", formatTomlConfigOverride(params.backend.systemPromptFileConfigKey, params.systemPromptFilePath));
		else if (params.backend.systemPromptArg) args.push(params.backend.systemPromptArg, stripSystemPromptCacheBoundary(params.systemPrompt));
	}
	if (!params.useResume && params.sessionId) for (const entry of params.backend.sessionArgs ?? []) args.push(entry.replaceAll("{sessionId}", params.sessionId));
	if (params.useResume && params.forkResume) {
		if (!params.backend.forkArg) throw new Error("CLI backend does not support forked session resume");
		args.push(params.backend.forkArg);
	}
	if (params.resumeAt) {
		if (!params.useResume || !params.backend.resumeAtArg) throw new Error("CLI backend does not support checkpointed session resume");
		args.push(params.backend.resumeAtArg, params.resumeAt);
	}
	if (params.promptArg !== void 0) {
		let replacedPromptPlaceholder = false;
		for (let i = 0; i < args.length; i += 1) if (args[i] === "{prompt}") {
			args[i] = params.promptArg;
			replacedPromptPlaceholder = true;
		}
		if (!replacedPromptPlaceholder) args.push(params.promptArg);
	}
	const imageArg = params.backend.imageArg;
	if (params.imagePaths?.length && imageArg && imageArg !== "@") {
		if (params.backend.imageMode === "list") args.push(imageArg, params.imagePaths.join(","));
		else for (const imagePath of params.imagePaths) args.push(imageArg, imagePath);
	}
	return args;
}
//#endregion
export { normalizeCliModel as a, resolvePromptInput as c, writeCliSystemPromptFile as d, buildCliSupervisorScopeKey as f, isClaudeCliBackendId as i, resolveSessionIdToSend as l, resolveCliRunTimeoutOverrideMs as m, buildCliArgs as n, prepareCliPromptImagePayload as o, resolveCliNoOutputTimeoutMs as p, enqueueCliRun as r, resolveCliRunQueueKey as s, buildCliAgentSystemPrompt as t, resolveSystemPromptUsage as u };
