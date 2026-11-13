import { l as normalizeOptionalString, o as normalizeLowercaseStringOrEmpty } from "./string-coerce-6kR-86XC.mjs";
import { M as resolveNonNegativeIntegerOption } from "./number-coercion-Dq1l5muL.mjs";
import "./src-SskUVPJG.mjs";
import { t as stableStringify } from "./stable-stringify-CkQ0IEj1.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { d as listMediaGenerationOperations } from "./media-generation-activity-8_KIfY-s.mjs";
import { n as sanitizeForPromptLiteral } from "./sanitize-for-prompt-bzCyHFCH.mjs";
//#region src/agents/session-async-task-status.ts
/** Build tool details that point callers at the already-active async task. */
function buildSessionAsyncTaskStatusDetails(task) {
	return {
		async: true,
		active: true,
		existingTask: true,
		status: task.status,
		task: {
			taskId: task.taskId,
			...task.runId ? { runId: task.runId } : {}
		},
		...task.taskKind ? { taskKind: task.taskKind } : {},
		...task.progressSummary ? { progressSummary: task.progressSummary } : {},
		...task.sourceId ? { sourceId: task.sourceId } : {}
	};
}
//#endregion
//#region src/agents/media-generation-task-status-shared.ts
/**
* Shared media generation task status and duplicate-guard helpers.
*
* Image/video task modules use this to track recent starts, find active
* background tasks, and build consistent user/prompt status messages.
*/
/** Marks media as ready while requester delivery is still being confirmed. */
const MEDIA_GENERATION_DELIVERING_COMPLETION_PROGRESS = "Generated media; delivering completion";
const recentMediaGenerationTaskStarts = /* @__PURE__ */ new Map();
const RECENT_MEDIA_GENERATION_TASK_START_CACHE_MS = 12e4;
/** Builds a stable request key for media generation duplicate detection. */
function buildMediaGenerationRequestKey(value) {
	return stableStringify(value);
}
function buildRecentMediaGenerationTaskKey(params) {
	const sessionKey = normalizeOptionalString(params.sessionKey);
	const taskKind = normalizeOptionalString(params.taskKind);
	const sourcePrefix = normalizeOptionalString(params.sourcePrefix);
	if (!sessionKey || !taskKind || !sourcePrefix) return;
	return `${params.agentId?.trim() ?? "unknown"}\0${sessionKey}\0${taskKind}\0${sourcePrefix}`;
}
function isRecentMediaGenerationMediaGenerationOperation(params) {
	const activityAt = params.task.endedAt ?? params.task.lastEventAt ?? params.task.startedAt ?? params.task.createdAt;
	return Number.isFinite(activityAt) && params.nowMs - activityAt <= params.maxAgeMs;
}
function pruneRecentMediaGenerationTaskStarts(params) {
	for (const [key, entries] of recentMediaGenerationTaskStarts.entries()) {
		if (params.preserveKey === key) continue;
		const freshEntries = entries.filter((entry) => isRecentMediaGenerationMediaGenerationOperation({
			task: entry.task,
			...params
		}));
		if (freshEntries.length > 0) recentMediaGenerationTaskStarts.set(key, freshEntries);
		else recentMediaGenerationTaskStarts.delete(key);
	}
}
function mediaGenerationSourceMatches(task, sourcePrefix) {
	const sourceId = task.sourceId?.trim() ?? "";
	return sourceId === sourcePrefix || sourceId.startsWith(`${sourcePrefix}:`);
}
function mediaGenerationTaskLabelMatches(task, taskLabel) {
	return normalizeOptionalString(task.task) === taskLabel;
}
function resolveMediaGenerationTaskRequesterAgentId(task) {
	const explicit = normalizeOptionalString(task.requesterAgentId);
	if (explicit) return explicit;
	const ownerKey = normalizeOptionalString(task.requesterSessionKey);
	const parsed = parseAgentSessionKey(ownerKey)?.agentId;
	if (parsed) return parsed;
}
function isTaskStillBlockingDuplicateGuard(task) {
	return task.status === "queued" || task.status === "running";
}
function isTaskRecentSuccessfulDuplicate(params) {
	return params.task.status === "succeeded" && params.task.terminalOutcome !== "blocked" && Boolean(params.requestKey && params.cachedRequestKey === params.requestKey) && isRecentMediaGenerationMediaGenerationOperation({
		task: params.task,
		maxAgeMs: params.maxAgeMs,
		nowMs: params.nowMs
	});
}
function recentMediaGenerationTaskStartMatches(left, right) {
	if (left.requestKey && right.requestKey) return left.requestKey === right.requestKey;
	if (left.task.runId && right.task.runId) return left.task.runId === right.task.runId;
	return left.task.taskId === right.task.taskId;
}
function findPersistedTaskForRecentMediaGenerationStart(params) {
	return params.tasks.find((task) => {
		if (task.taskKind !== params.taskKind || !mediaGenerationSourceMatches(task, params.sourcePrefix) || params.agentId && resolveMediaGenerationTaskRequesterAgentId(task) !== params.agentId) return false;
		if (task.taskId === params.cachedTask.taskId) return true;
		return Boolean(task.runId && task.runId === params.cachedTask.runId);
	});
}
/** Correlates a request with its already-admitted native media operation. */
function recordRecentMediaGenerationTaskStartForSession(params) {
	const key = buildRecentMediaGenerationTaskKey(params);
	const sessionKey = normalizeOptionalString(params.sessionKey);
	if (!key || !sessionKey) return;
	const nowMs = params.nowMs ?? Date.now();
	pruneRecentMediaGenerationTaskStarts({
		maxAgeMs: RECENT_MEDIA_GENERATION_TASK_START_CACHE_MS,
		nowMs,
		preserveKey: key
	});
	const entry = {
		requestKey: normalizeOptionalString(params.requestKey),
		task: {
			taskId: params.taskId,
			taskKind: params.taskKind,
			sourceId: params.providerId?.trim() ? `${params.sourcePrefix}:${params.providerId.trim()}` : params.sourcePrefix,
			requesterSessionKey: sessionKey,
			requesterAgentId: params.agentId,
			...params.runId ? { runId: params.runId } : {},
			task: params.taskLabel,
			status: "running",
			createdAt: nowMs,
			startedAt: nowMs,
			lastEventAt: nowMs,
			progressSummary: params.progressSummary
		}
	};
	const previousEntries = (recentMediaGenerationTaskStarts.get(key) ?? []).filter((entryLocal) => isRecentMediaGenerationMediaGenerationOperation({
		task: entryLocal.task,
		maxAgeMs: RECENT_MEDIA_GENERATION_TASK_START_CACHE_MS,
		nowMs
	}));
	recentMediaGenerationTaskStarts.set(key, [...previousEntries.filter((previousEntry) => !recentMediaGenerationTaskStartMatches(previousEntry, entry)), entry]);
}
/** Finds a recent matching request only while its native operation is retained. */
function findRecentStartedMediaGenerationTaskForSession(params) {
	const key = buildRecentMediaGenerationTaskKey(params);
	const sessionKey = normalizeOptionalString(params.sessionKey);
	if (!key || !sessionKey) return;
	const nowMs = params.nowMs ?? Date.now();
	const maxAgeMs = resolveNonNegativeIntegerOption(params.maxAgeMs, 0);
	const taskLabel = normalizeOptionalString(params.taskLabel);
	pruneRecentMediaGenerationTaskStarts({
		maxAgeMs,
		nowMs,
		preserveKey: key
	});
	const entries = recentMediaGenerationTaskStarts.get(key);
	if (!entries?.length) return;
	const retainedEntries = [];
	for (const entry of entries.toReversed()) {
		const task = entry.task;
		const persistedTask = findPersistedTaskForRecentMediaGenerationStart({
			agentId: params.agentId,
			tasks: params.tasks,
			cachedTask: task,
			taskKind: params.taskKind,
			sourcePrefix: params.sourcePrefix
		});
		if (persistedTask) {
			const persistedTaskLabelMatches = !taskLabel || mediaGenerationTaskLabelMatches(persistedTask, taskLabel);
			if (isTaskStillBlockingDuplicateGuard(persistedTask) && persistedTaskLabelMatches) return persistedTask;
			if (isTaskRecentSuccessfulDuplicate({
				task: persistedTask,
				requestKey: params.requestKey,
				cachedRequestKey: entry.requestKey,
				maxAgeMs,
				nowMs
			})) return persistedTask;
			if (isRecentMediaGenerationMediaGenerationOperation({
				task: persistedTask,
				maxAgeMs,
				nowMs
			})) retainedEntries.push(entry);
			continue;
		}
	}
	if (retainedEntries.length > 0) recentMediaGenerationTaskStarts.set(key, retainedEntries.toReversed());
	else recentMediaGenerationTaskStarts.delete(key);
}
/** Clears in-memory duplicate guards between tests. */
function resetRecentMediaGenerationDuplicateGuardsForTests() {
	recentMediaGenerationTaskStarts.clear();
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.mediaGenerationDuplicateGuardTestApi")] = { resetRecentMediaGenerationDuplicateGuardsForTests };
/** Extracts a provider id from a media task source id with the given prefix. */
function getMediaGenerationTaskProviderId(task, sourcePrefix) {
	const sourceId = task.sourceId?.trim() ?? "";
	if (!sourceId.startsWith(`${sourcePrefix}:`)) return;
	return sourceId.slice(`${sourcePrefix}:`.length).trim() || void 0;
}
/** Lists active media generation tasks for a session, preferring running tasks. */
async function listActiveMediaGenerationTasksForSession(params) {
	const sessionKey = normalizeOptionalString(params.sessionKey);
	if (!sessionKey) return [];
	return selectActiveMediaGenerationTasks(params, listMediaGenerationOperations(sessionKey, params.agentId));
}
function selectActiveMediaGenerationTasks(params, tasks) {
	const taskLabel = normalizeOptionalString(params.taskLabel);
	const sourcePrefix = normalizeOptionalString(params.sourcePrefix);
	const matches = tasks.filter((task) => {
		if (task.taskKind !== params.taskKind || !isTaskStillBlockingDuplicateGuard(task)) return false;
		if (params.agentId && resolveMediaGenerationTaskRequesterAgentId(task) !== params.agentId) return false;
		if (sourcePrefix && !mediaGenerationSourceMatches(task, sourcePrefix)) return false;
		if (taskLabel && !mediaGenerationTaskLabelMatches(task, taskLabel)) return false;
		if (params.excludeDeliveringCompletion && task.progressSummary === "Generated media; delivering completion") return false;
		return true;
	});
	return [...matches.filter((task) => task.status === "running"), ...matches.filter((task) => task.status !== "running")];
}
/** Finds a task that should block duplicate media generation for a session. */
async function findDuplicateGuardMediaGenerationTaskForSession(params) {
	const sessionKey = normalizeOptionalString(params.sessionKey);
	if (!sessionKey) return;
	const tasks = listMediaGenerationOperations(sessionKey, params.agentId);
	return findRecentStartedMediaGenerationTaskForSession({
		...params,
		sessionKey,
		tasks
	}) ?? selectActiveMediaGenerationTasks(params, tasks)[0];
}
/** Builds structured status details for one media generation task. */
function buildMediaGenerationTaskStatusDetails(params) {
	const provider = getMediaGenerationTaskProviderId(params.task, params.sourcePrefix);
	return {
		...buildSessionAsyncTaskStatusDetails(params.task),
		active: isTaskStillBlockingDuplicateGuard(params.task),
		...provider ? { provider } : {}
	};
}
/** Builds structured status details for a list of media generation tasks. */
function buildMediaGenerationTaskStatusListDetails(params) {
	return {
		async: true,
		active: true,
		existingTask: true,
		taskCount: params.tasks.length,
		tasks: params.tasks.map((task) => buildMediaGenerationTaskStatusDetails({
			task,
			sourcePrefix: params.sourcePrefix
		}))
	};
}
/** Builds user-facing status text for one media generation task. */
function buildMediaGenerationTaskStatusText(params) {
	const provider = getMediaGenerationTaskProviderId(params.task, params.sourcePrefix);
	const active = params.task.status === "queued" || params.task.status === "running" || params.task.terminalOutcome === "blocked";
	return [
		active ? `${params.nounLabel} task ${params.task.taskId} is already ${params.task.status}${provider ? ` with ${provider}` : ""}.` : `${params.nounLabel} task ${params.task.taskId} recently ${params.task.status}${provider ? ` with ${provider}` : ""}.`,
		params.task.progressSummary ? `Progress: ${params.task.progressSummary}.` : null,
		params.duplicateGuard ? active ? `Do not call ${params.toolName} again for this request. Wait for the completion event; the completion agent will send the finished ${params.completionLabel} here.` : `Do not call ${params.toolName} again for the same request; this recent ${params.completionLabel} generation already completed.` : `Wait for the completion event; the completion agent will send the finished ${params.completionLabel} here when it's ready.`
	].filter((entry) => Boolean(entry)).join("\n");
}
/** Builds user-facing status text for multiple active media generation tasks. */
function buildMediaGenerationTaskStatusListText(params) {
	const nounLabel = normalizeLowercaseStringOrEmpty(params.nounLabel);
	return [
		`${params.tasks.length} active ${nounLabel} tasks are queued or running for this session.`,
		...params.tasks.map((task) => {
			const provider = getMediaGenerationTaskProviderId(task, params.sourcePrefix);
			const runId = task.runId ? ` (run ${task.runId})` : "";
			const progress = task.progressSummary ? ` Progress: ${task.progressSummary}.` : "";
			return `- Task ${task.taskId}${runId} is ${task.status}${provider ? ` with ${provider}` : ""}.${progress}`;
		}),
		`Wait for the completion events; the completion agent will send the finished ${params.completionLabel} here when each is ready.`,
		`Only start a new ${params.toolName} call if the user clearly asks for different/new ${params.completionLabel}.`
	].join("\n");
}
/** Builds bounded current-turn facts without instructions or elapsed-time fields. */
function buildActiveMediaGenerationTaskPromptContext(params) {
	const tasks = selectActiveMediaGenerationTasks({
		...params,
		excludeDeliveringCompletion: true
	}, params.tasks);
	if (tasks.length === 0) return;
	const boundedLiteral = (value, maxChars) => truncateUtf16Safe(sanitizeForPromptLiteral(value), maxChars);
	const lines = tasks.toSorted((a, b) => a.taskId < b.taskId ? -1 : a.taskId > b.taskId ? 1 : 0).slice(0, 8).map((task) => {
		const provider = getMediaGenerationTaskProviderId(task, params.sourcePrefix);
		return [
			`- tool=${params.sourcePrefix}`,
			`task=${boundedLiteral(task.taskId, 128)}`,
			`status=${task.status}`,
			...provider ? [`provider_json=${JSON.stringify(boundedLiteral(provider, 128))}`] : [],
			...task.progressSummary ? [`progress_json=${JSON.stringify(boundedLiteral(task.progressSummary, 320))}`] : []
		].join("; ");
	});
	if (tasks.length > lines.length) lines.push(`- additional_tasks=${tasks.length - lines.length}`);
	return lines.join("\n");
}
/** Specializes shared task lookup, duplicate guards, and status text for one media tool. */
function createMediaGenerationTaskStatusOwner(params) {
	const taskIdentity = {
		taskKind: params.taskKind,
		sourcePrefix: params.toolName
	};
	const taskPresentation = {
		sourcePrefix: params.toolName,
		nounLabel: params.nounLabel,
		toolName: params.toolName
	};
	return {
		async findActiveTaskForSession(sessionKey, request) {
			return (await listActiveMediaGenerationTasksForSession({
				...taskIdentity,
				sessionKey,
				taskLabel: request?.prompt,
				agentId: request?.agentId
			}))[0];
		},
		listActiveTasksForSession(sessionKey, agentId) {
			return listActiveMediaGenerationTasksForSession({
				...taskIdentity,
				sessionKey,
				agentId
			});
		},
		findDuplicateGuardTaskForSession(sessionKey, request) {
			return findDuplicateGuardMediaGenerationTaskForSession({
				...taskIdentity,
				sessionKey,
				taskLabel: request?.prompt,
				requestKey: request?.requestKey,
				agentId: request?.agentId,
				maxAgeMs: RECENT_MEDIA_GENERATION_TASK_START_CACHE_MS
			});
		},
		buildTaskStatusDetails(task) {
			return buildMediaGenerationTaskStatusDetails({
				task,
				sourcePrefix: params.toolName
			});
		},
		buildTaskStatusListDetails(tasks) {
			return buildMediaGenerationTaskStatusListDetails({
				tasks,
				sourcePrefix: params.toolName
			});
		},
		buildTaskStatusText(task, options) {
			return buildMediaGenerationTaskStatusText({
				...taskPresentation,
				task,
				completionLabel: params.completionLabel,
				duplicateGuard: options?.duplicateGuard
			});
		},
		buildTaskStatusListText(tasks) {
			return buildMediaGenerationTaskStatusListText({
				...taskPresentation,
				tasks,
				completionLabel: params.promptCompletionLabel
			});
		}
	};
}
//#endregion
//#region src/agents/media-generation-task-status.ts
/**
* Image generation task status helpers.
*
* These wrap the shared media task status helpers with image-specific task kind,
* source id, duplicate-guard timing, and prompt/status wording.
*/
const IMAGE_GENERATION_TASK_KIND = "image_generation";
/** Image generation keeps multi-task status and prompt-specific duplicate lookup. */
const { listActiveTasksForSession: listActiveImageGenerationTasksForSession, findDuplicateGuardTaskForSession: findDuplicateGuardImageGenerationTaskForSession, buildTaskStatusDetails: buildImageGenerationTaskStatusDetails, buildTaskStatusListDetails: buildImageGenerationTaskStatusListDetails, buildTaskStatusText: buildImageGenerationTaskStatusText, buildTaskStatusListText: buildImageGenerationTaskStatusListText } = createMediaGenerationTaskStatusOwner({
	taskKind: IMAGE_GENERATION_TASK_KIND,
	toolName: "image_generate",
	nounLabel: "Image generation",
	completionLabel: "image",
	promptCompletionLabel: "images"
});
/**
* Music-generation task status adapters. The module specializes the shared
* media-generation task helpers with music task ids, duplicate guards, and
* user-facing status text.
*/
const MUSIC_GENERATION_TASK_KIND = "music_generation";
/** Binds music-specific task identity, duplicate guards, and visible status text. */
const { findActiveTaskForSession: findActiveMusicGenerationTaskForSession, findDuplicateGuardTaskForSession: findDuplicateGuardMusicGenerationTaskForSession, buildTaskStatusDetails: buildMusicGenerationTaskStatusDetails, buildTaskStatusText: buildMusicGenerationTaskStatusText } = createMediaGenerationTaskStatusOwner({
	taskKind: MUSIC_GENERATION_TASK_KIND,
	toolName: "music_generate",
	nounLabel: "Music generation",
	completionLabel: "music",
	promptCompletionLabel: "music tracks"
});
/**
* Video generation task status helpers.
*
* These wrap the generic media task status helpers with video-specific kind,
* source, labels, duplicate-guard timing, and prompt-context wording.
*/
const VIDEO_GENERATION_TASK_KIND = "video_generation";
/** Binds video-specific task identity, duplicate guards, and visible status text. */
const { findActiveTaskForSession: findActiveVideoGenerationTaskForSession, findDuplicateGuardTaskForSession: findDuplicateGuardVideoGenerationTaskForSession, buildTaskStatusDetails: buildVideoGenerationTaskStatusDetails, buildTaskStatusText: buildVideoGenerationTaskStatusText } = createMediaGenerationTaskStatusOwner({
	taskKind: VIDEO_GENERATION_TASK_KIND,
	toolName: "video_generate",
	nounLabel: "Video generation",
	completionLabel: "video",
	promptCompletionLabel: "videos"
});
/** Shared by embedded and CLI prompts; all sections use this turn's owner snapshot. */
async function buildMediaTaskRuntimeContext(params) {
	const enabled = [
		["image_generate", IMAGE_GENERATION_TASK_KIND],
		["music_generate", MUSIC_GENERATION_TASK_KIND],
		["video_generate", VIDEO_GENERATION_TASK_KIND]
	].filter(([tool]) => params.capabilityToolNames.has(tool));
	if (enabled.length === 0) return;
	const sessionKey = normalizeOptionalString(params.sessionKey);
	const tasks = sessionKey ? listMediaGenerationOperations(sessionKey, params.agentId) : [];
	return ["## Media Generation Tasks", ...enabled.map(([tool, taskKind]) => buildActiveMediaGenerationTaskPromptContext({
		tasks,
		agentId: params.agentId,
		taskKind,
		sourcePrefix: tool
	}) ?? `- tool=${tool}; none`)].join("\n");
}
//#endregion
export { findDuplicateGuardVideoGenerationTaskForSession as _, buildImageGenerationTaskStatusListDetails as a, buildMediaGenerationRequestKey as b, buildMediaTaskRuntimeContext as c, buildVideoGenerationTaskStatusDetails as d, buildVideoGenerationTaskStatusText as f, findDuplicateGuardMusicGenerationTaskForSession as g, findDuplicateGuardImageGenerationTaskForSession as h, buildImageGenerationTaskStatusDetails as i, buildMusicGenerationTaskStatusDetails as l, findActiveVideoGenerationTaskForSession as m, MUSIC_GENERATION_TASK_KIND as n, buildImageGenerationTaskStatusListText as o, findActiveMusicGenerationTaskForSession as p, VIDEO_GENERATION_TASK_KIND as r, buildImageGenerationTaskStatusText as s, IMAGE_GENERATION_TASK_KIND as t, buildMusicGenerationTaskStatusText as u, listActiveImageGenerationTasksForSession as v, recordRecentMediaGenerationTaskStartForSession as x, MEDIA_GENERATION_DELIVERING_COMPLETION_PROGRESS as y };
