import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { r as truncateUtf16Safe } from "./utf16-slice-D_ngcYKd.mjs";
import { O as walkDirectory, h as readLocalFileSafely, w as root } from "./fs-safe-CHQXnCPk.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { t as resolveSkillWorkshopConfig } from "./config-C8iJzbV2.mjs";
import { C as buildSkillProposalEvaluationBundles, D as hasSkillProposalEvaluators, E as dispatchSkillProposalChanged, M as resolveDraftedSkillDescription, N as resolveSkillProposalName, O as normalizeSkillProposalCorrelationId, P as stripProposalFrontmatterForSkill, T as createSkillProposalEvent, _ as withSkillProposalTargetLock, d as resolveSkillProposalTarget, f as updateSkillProposalRecord, i as prepareSkillProposalSupportFiles, j as renderProposalMarkdown, k as runSkillProposalEvaluators, l as readSkillProposalRecord, n as createSkillProposalId, p as writeSkillProposal, u as replaceSkillProposalDraft, w as readSkillProposalTargetTreeSha256 } from "./store-6HwYjj1p.mjs";
import { d as readWorkspaceSupportFile, r as assertInsideSkillsRoot, s as normalizeWorkspaceSkillSupportPath, t as MAX_WORKSPACE_SKILL_SUPPORT_FILE_BYTES, u as readWorkspaceSkillFile } from "./workspace-skill-write-BcZVBI5U.mjs";
import { n as hashSkillProposalRevision, t as hashSkillProposalContent } from "./proposal-hash-DFkV3A6F.mjs";
import { n as scanProposalBundle, t as assertProposalContainsNoLiteralSecrets } from "./proposal-scan-DkW27zEw.mjs";
import { t as resolveWorkshopSkillsDir } from "./skills-root-CYPE5f0c.mjs";
import { i as assertSkillProposalEvaluationWithinLimit, p as SKILL_WORKSHOP_SCHEMA, r as assertProposalId } from "./store-record-Dxu22ebc.mjs";
import { o as createSkillProposalGenerationDraftFile, r as executeSkillWorkshopOperation, t as captureSkillWorkshopStoreOptions } from "./store-client-pSi5T8mh.mjs";
import { a as withSkillProposalLifecycleDispatch, n as assertSkillProposalSupportTargetUnchanged, r as markSkillProposalStale, t as applySkillProposalTransition } from "./apply-transition-Bb-1IhvA.mjs";
import { r as readRequiredProposal } from "./service-query-Ci9vUcQ3.mjs";
import { n as readWritableWorkshopSkill } from "./workspace-skill-read-WQySWcpN.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { isUtf8 } from "node:buffer";
//#region src/skills/workshop/proposal-draft.ts
const MAX_PROPOSAL_DRAFT_BYTES = 1048576;
const MAX_PROPOSAL_DIRECTORY_ENTRIES = 256;
const MAX_PROPOSAL_DIRECTORY_DEPTH = 8;
const MAX_SKILL_PROPOSAL_DESCRIPTION_BYTES = 160;
function prepareSkillProposalDraft(input) {
	try {
		assertProposalDescriptionWithinLimit(input.description);
		assertProposalContentWithinLimit(input.content, input.maxSkillBytes);
		const supportFiles = prepareSkillProposalSupportFiles(input.supportFiles);
		const content = renderProposalMarkdown({
			name: input.name,
			description: input.skillDescription,
			content: input.content,
			fallbackFrontmatterContent: input.fallbackFrontmatterContent,
			version: input.version,
			date: input.date
		});
		const goal = normalizeOptionalString(input.goal);
		const evidence = normalizeOptionalString(input.evidence);
		const scan = scanProposalBundle(content, supportFiles, [
			...input.secretScanMetadata ?? [],
			{
				file: "description",
				content: input.description
			},
			{
				file: "skill-description",
				content: input.skillDescription
			},
			{
				file: "goal",
				content: goal
			},
			{
				file: "evidence",
				content: evidence
			}
		]);
		assertProposalContainsNoLiteralSecrets(scan);
		return ok({
			content,
			description: input.description,
			draftHash: hashSkillProposalContent(content),
			scan,
			supportFiles,
			...goal ? { goal } : {},
			...evidence ? { evidence } : {}
		});
	} catch (cause) {
		const error = cause instanceof Error ? cause : new Error(String(cause));
		return err({
			cause: error,
			message: error.message
		});
	}
}
function resolveUpdateProposalDescription(inputDescription, currentDescription) {
	const supplied = normalizeOptionalString(inputDescription);
	if (supplied) return supplied;
	return truncateUtf8(currentDescription.trim(), MAX_SKILL_PROPOSAL_DESCRIPTION_BYTES);
}
function nextProposalVersion(version) {
	const match = /^v(\d+)$/.exec(version.trim());
	if (!match) return "v2";
	const current = Number.parseInt(match[1] ?? "1", 10);
	return `v${Number.isSafeInteger(current) && current > 0 ? current + 1 : 2}`;
}
async function readSkillProposalDraftFile(filePath) {
	return decodeProposalTextFile((await readLocalFileSafely({
		filePath,
		maxBytes: MAX_PROPOSAL_DRAFT_BYTES
	})).buffer, filePath);
}
async function readSkillProposalDraftDirectory(dirPath) {
	const absoluteDir = path.resolve(dirPath);
	const draftRoot = await root(absoluteDir);
	const proposal = await draftRoot.read("PROPOSAL.md", {
		hardlinks: "reject",
		maxBytes: MAX_PROPOSAL_DRAFT_BYTES,
		symlinks: "reject"
	});
	const scanned = await walkDirectory(absoluteDir, {
		maxDepth: 9,
		maxEntries: MAX_PROPOSAL_DIRECTORY_ENTRIES,
		symlinks: "include"
	});
	if (scanned.truncated || scanned.entries.some((entry) => entry.depth > MAX_PROPOSAL_DIRECTORY_DEPTH)) throw new Error("Proposal directory exceeds traversal limits.");
	const failed = scanned.failedDirs[0];
	if (failed) throw failed.error;
	const supportFiles = [];
	for (const entry of scanned.entries.toSorted((a, b) => a.relativePath.localeCompare(b.relativePath))) {
		const relativePath = entry.relativePath.split(path.sep).join("/");
		if (!relativePath || relativePath === "PROPOSAL.md") continue;
		if (entry.kind === "directory") continue;
		if (entry.kind !== "file") throw new Error(`Proposal support file must be a regular file: ${relativePath}`);
		const supportPath = normalizeWorkspaceSkillSupportPath(relativePath);
		if (((await fs.stat(entry.path)).mode & 73) !== 0) throw new Error(`Proposal support files must not be executable: ${relativePath}`);
		const read = await draftRoot.read(relativePath, {
			hardlinks: "reject",
			maxBytes: MAX_WORKSPACE_SKILL_SUPPORT_FILE_BYTES,
			symlinks: "reject"
		});
		supportFiles.push({
			path: supportPath,
			content: decodeProposalTextFile(read.buffer, relativePath)
		});
	}
	return {
		content: decodeProposalTextFile(proposal.buffer, "PROPOSAL.md"),
		supportFiles
	};
}
function decodeProposalTextFile(buffer, label) {
	if (!isUtf8(buffer) || buffer.includes(0)) throw new Error(`Proposal files must be UTF-8 text: ${label}`);
	return buffer.toString("utf8");
}
function assertProposalDescriptionWithinLimit(description) {
	const sizeBytes = Buffer.byteLength(description, "utf8");
	if (sizeBytes > MAX_SKILL_PROPOSAL_DESCRIPTION_BYTES) throw new Error(`Skill proposal description is too large (${sizeBytes} bytes, max ${MAX_SKILL_PROPOSAL_DESCRIPTION_BYTES}).`);
}
function assertProposalContentWithinLimit(content, maxSkillBytes) {
	const sizeBytes = Buffer.byteLength(content, "utf8");
	if (sizeBytes > maxSkillBytes) throw new Error(`Skill proposal content is too large (${sizeBytes} bytes, max ${maxSkillBytes}).`);
}
function truncateUtf8(value, maxBytes) {
	let out = "";
	let sizeBytes = 0;
	for (const char of value) {
		const charBytes = Buffer.byteLength(char, "utf8");
		if (sizeBytes + charBytes > maxBytes) break;
		out += char;
		sizeBytes += charBytes;
	}
	return out.trimEnd();
}
//#endregion
//#region src/skills/workshop/store-evaluation.ts
async function recordSkillProposalEvaluation(params) {
	assertProposalId(params.proposalId);
	return executeSkillWorkshopOperation("workshop.proposal.evaluate", {
		proposalId: params.proposalId,
		expectedProposedVersion: params.expectedProposedVersion,
		expectedRevisionHash: params.expectedRevisionHash,
		evaluation: params.evaluation,
		event: params.event
	}, params.store);
}
async function readSkillProposalEvents(input, options = {}) {
	const context = captureSkillWorkshopStoreOptions(options).execution.context;
	const query = {
		agentId: input.agentId,
		proposalId: input.proposalId,
		afterSequence: input.afterSequence,
		limit: input.limit
	};
	const { executeOpenClawStateWorker } = await import("./openclaw-state-worker-store-Bp_XCEWM.mjs");
	return await executeOpenClawStateWorker(context, {
		type: "workshop.events.list",
		input: query
	});
}
//#endregion
//#region src/skills/workshop/service-evaluation.ts
const MAX_EVALUATION_OUTCOMES = 64;
const MAX_EVALUATION_FINDINGS = 200;
const MAX_EVALUATION_METRICS = 64;
var SkillProposalCreateTargetConflictError = class extends Error {};
var SkillProposalRevisionChangedError = class extends Error {
	constructor(expectedRevisionHash, currentRevisionHash) {
		super(`Skill proposal revision changed (expected ${expectedRevisionHash}, current ${currentRevisionHash}); reload and retry.`);
		this.expectedRevisionHash = expectedRevisionHash;
		this.currentRevisionHash = currentRevisionHash;
		this.name = "SkillProposalRevisionChangedError";
	}
};
async function evaluateSkillProposal(input, options = {}) {
	const store = captureSkillWorkshopStoreOptions({
		...options,
		env: options.env ?? input.env,
		agentId: input.agentId,
		config: input.config
	});
	const request = {
		...input,
		env: store.env,
		eventActor: structuredClone(input.eventActor)
	};
	const correlationId = normalizeSkillProposalCorrelationId(request.correlationId);
	const shouldRunEvaluators = hasSkillProposalEvaluators();
	const initial = await readRequiredProposal(request.proposalId, request.env, request.agentId, {
		config: request.config,
		store
	});
	const { read, bundles } = await withSkillProposalTargetLock(initial.record, async (lockedStore) => {
		const read = await readRequiredProposal(request.proposalId, request.env, request.agentId, {
			config: request.config,
			reconcile: false,
			store: lockedStore
		});
		if (read.record.status !== "pending") throw new Error(`Only pending proposals can be evaluated. Current status: ${read.record.status}.`);
		assertExpectedRevisionHash(read.revisionHash, request.expectedRevisionHash);
		if (hashSkillProposalContent(read.content) !== read.record.draftHash) throw new Error("Proposal draft changed without updating proposal metadata.");
		if (shouldRunEvaluators && read.record.kind === "create" && await readWorkspaceSkillFile(read.record.target.skillFile) !== null) throw new SkillProposalCreateTargetConflictError(`Skill proposal ${read.record.id} changed before evaluation started.`);
		return {
			read,
			bundles: shouldRunEvaluators ? await buildSkillProposalEvaluationBundles({
				proposal: read,
				supportFiles: read.supportFiles ?? []
			}) : void 0
		};
	}, store);
	const startedAt = (/* @__PURE__ */ new Date()).toISOString();
	const rawOutcomes = bundles ? await runSkillProposalEvaluators({
		...correlationId ? { correlationId } : {},
		proposal: {
			id: read.record.id,
			kind: read.record.kind,
			revision: read.record.proposedVersion,
			revisionSha256: read.revisionHash,
			...read.record.target.currentContentHash ? { targetCurrentSha256: read.record.target.currentContentHash } : {}
		},
		skill: {
			name: read.record.target.skillName,
			skillKey: read.record.target.skillKey,
			description: read.record.description,
			...read.record.target.source ? { source: read.record.target.source } : {}
		},
		candidate: bundles.candidate,
		...bundles.baseline ? { baseline: bundles.baseline } : {},
		reason: request.trigger === "apply" ? "apply" : "manual"
	}, {
		workspaceDir: request.workspaceDir,
		...request.agentId ? { agentId: request.agentId } : {}
	}) : [];
	const completedAt = (/* @__PURE__ */ new Date()).toISOString();
	const evaluation = {
		id: randomUUID(),
		proposedVersion: read.record.proposedVersion,
		revisionHash: read.revisionHash,
		trigger: request.trigger ?? "manual",
		startedAt,
		completedAt,
		...correlationId ? { correlationId } : {},
		...bundles ? { targetTreeSha256: bundles.targetTreeSha256 } : {},
		outcomes: normalizeEvaluationOutcomes(rawOutcomes)
	};
	assertSkillProposalEvaluationWithinLimit(evaluation);
	const pendingRecord = {
		...read.record,
		evaluation
	};
	const eventInput = createSkillProposalEvent({
		record: pendingRecord,
		type: "evaluation_completed",
		actor: request.eventActor,
		...correlationId ? { correlationId } : {},
		occurredAt: completedAt,
		payload: {
			evaluationId: evaluation.id,
			trigger: evaluation.trigger,
			outcomeCount: evaluation.outcomes.length
		},
		evaluation
	});
	const stored = await withSkillProposalTargetLock(read.record, async (lockedStore) => {
		const current = await readRequiredProposal(request.proposalId, request.env, request.agentId, {
			config: request.config,
			reconcile: false,
			store: lockedStore
		});
		if (current.record.status !== "pending" || current.record.proposedVersion !== read.record.proposedVersion || current.revisionHash !== read.revisionHash || hashSkillProposalContent(current.content) !== current.record.draftHash) throw new Error(`Skill proposal ${read.record.id} changed while evaluation was running.`);
		if (bundles) {
			let currentTargetTreeSha256;
			try {
				currentTargetTreeSha256 = await readSkillProposalTargetTreeSha256(current.record.target.skillDir);
			} catch {
				throw new Error(`Skill proposal ${read.record.id} changed while evaluation was running.`);
			}
			if (currentTargetTreeSha256 !== bundles.targetTreeSha256) throw new Error(`Skill proposal ${read.record.id} changed while evaluation was running.`);
		}
		return recordSkillProposalEvaluation({
			proposalId: read.record.id,
			expectedProposedVersion: read.record.proposedVersion,
			expectedRevisionHash: read.revisionHash,
			evaluation,
			event: eventInput,
			store: lockedStore
		});
	}, store);
	await dispatchSkillProposalChanged({
		event: stored.event,
		record: stored.record,
		workspaceDir: request.workspaceDir,
		...request.agentId ? { agentId: request.agentId } : {},
		evaluations: evaluation.outcomes
	});
	return {
		record: stored.record,
		evaluation
	};
}
async function listSkillProposalEvents(input) {
	return await readSkillProposalEvents(input, {
		env: input.env,
		agentId: input.agentId,
		config: input.config
	});
}
function assertExpectedRevisionHash(actual, expected) {
	const normalized = normalizeOptionalString(expected);
	if (normalized && normalized !== actual) throw new SkillProposalRevisionChangedError(normalized, actual);
}
function normalizeEvaluationOutcomes(outcomes) {
	if (outcomes.length > MAX_EVALUATION_OUTCOMES) throw new Error(`Skill proposal evaluation returned more than ${MAX_EVALUATION_OUTCOMES} outcomes.`);
	return outcomes.map((outcome) => {
		const attribution = {
			evaluatorId: boundedRequired(outcome.evaluatorId, 128, outcome.pluginId),
			pluginId: boundedRequired(outcome.pluginId, 128, "unknown-plugin"),
			...outcome.pluginVersion ? { pluginVersion: boundedRequired(outcome.pluginVersion, 128, "unknown") } : {}
		};
		if (outcome.status === "skipped") return {
			...attribution,
			status: "skipped"
		};
		if (outcome.status === "error") return {
			...attribution,
			status: "error",
			error: boundedRequired(outcome.error, 2e3, "Evaluator failed.")
		};
		const result = normalizeEvaluationResult(outcome.result);
		return result ? {
			...attribution,
			status: "completed",
			result
		} : {
			...attribution,
			status: "error",
			error: "Evaluator returned an invalid result."
		};
	});
}
function normalizeEvaluationResult(result) {
	if (!result || typeof result !== "object" || Array.isArray(result)) return null;
	const findings = normalizeFindings(result.findings);
	const metrics = normalizeMetrics(result.metrics);
	if (result.findings !== void 0 && !findings) return null;
	if (result.metrics !== void 0 && !metrics) return null;
	if (result.decision !== void 0 && ![
		"pass",
		"revise",
		"block"
	].includes(result.decision)) return null;
	const summary = boundedOptional(result.summary, 8e3);
	const evaluatorVersion = boundedOptional(result.evaluatorVersion, 128);
	const mode = boundedOptional(result.mode, 128);
	const decisionReason = boundedOptional(result.decisionReason, 2e3);
	return {
		...summary ? { summary } : {},
		...findings ? { findings } : {},
		...metrics ? { metrics } : {},
		...evaluatorVersion ? { evaluatorVersion } : {},
		...mode ? { mode } : {},
		...result.decision ? { decision: result.decision } : {},
		...decisionReason ? { decisionReason } : {}
	};
}
function normalizeFindings(findings) {
	if (findings === void 0) return;
	if (!Array.isArray(findings) || findings.length > MAX_EVALUATION_FINDINGS) return;
	const normalized = [];
	for (const finding of findings) {
		if (!finding || typeof finding !== "object" || ![
			"info",
			"warn",
			"critical"
		].includes(finding.severity) || !finding.ruleId || !finding.message || finding.line !== void 0 && (!Number.isSafeInteger(finding.line) || finding.line < 1)) return;
		const file = boundedOptional(finding.file, 1024);
		normalized.push({
			ruleId: boundedRequired(finding.ruleId, 256, "unknown"),
			severity: finding.severity,
			message: boundedRequired(finding.message, 4e3, "Invalid finding."),
			...file ? { file } : {},
			...finding.line !== void 0 ? { line: finding.line } : {}
		});
	}
	return normalized;
}
function normalizeMetrics(metrics) {
	if (metrics === void 0) return;
	if (!metrics || typeof metrics !== "object" || Array.isArray(metrics)) return;
	const entries = Object.entries(metrics);
	if (entries.length > MAX_EVALUATION_METRICS) return;
	const normalized = {};
	for (const [key, value] of entries) {
		if (!key || key.length > 128 || typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean" || typeof value === "number" && !Number.isFinite(value)) return;
		normalized[key] = typeof value === "string" ? truncateUtf16Safe(value, 4e3) : value;
	}
	return normalized;
}
function boundedRequired(value, maxLength, fallback) {
	const normalized = normalizeOptionalString(value) ?? fallback;
	return truncateUtf16Safe(normalized, maxLength);
}
function boundedOptional(value, maxLength) {
	const normalized = normalizeOptionalString(value);
	return normalized === void 0 ? void 0 : truncateUtf16Safe(normalized, maxLength);
}
//#endregion
//#region src/skills/workshop/service-propose.ts
var SkillProposalStaleTargetError = class extends Error {};
function normalizeProposalOrigin(origin) {
	const agentId = normalizeOptionalString(origin?.agentId);
	const sessionKey = normalizeOptionalString(origin?.sessionKey);
	const runId = normalizeOptionalString(origin?.runId);
	const messageId = normalizeOptionalString(origin?.messageId);
	if (!agentId && !sessionKey && !runId && !messageId) return;
	return {
		...agentId ? { agentId } : {},
		...sessionKey ? { sessionKey } : {},
		...runId ? { runId } : {},
		...messageId ? { messageId } : {}
	};
}
function mergeProposalOriginRunProvenance(record, origin) {
	const ids = new Set(record?.originRunIds);
	const counts = { ...record?.originRunMutationCounts };
	if (record?.origin?.runId) ids.add(record.origin.runId);
	for (const runId of ids) counts[runId] ??= 1;
	if (origin?.runId) {
		ids.add(origin.runId);
		counts[origin.runId] = (counts[origin.runId] ?? 0) + 1;
	}
	if (ids.size > 4096) throw new Error("Skill proposal run provenance exceeds the supported limit.");
	return {
		...ids.size > 0 ? { originRunIds: [...ids] } : {},
		...Object.keys(counts).length > 0 ? { originRunMutationCounts: counts } : {}
	};
}
async function proposeCreateSkill(input) {
	const store = captureSkillWorkshopStoreOptions({
		env: input.env,
		agentId: input.agentId,
		config: input.config
	});
	const request = {
		...input,
		env: store.env,
		supportFiles: structuredClone(input.supportFiles),
		origin: structuredClone(input.origin),
		eventActor: structuredClone(input.eventActor)
	};
	const name = normalizeRequired(request.name, "Skill name");
	const description = normalizeRequired(request.description, "Skill description");
	const config = resolveSkillWorkshopConfig(request.config);
	const agentId = requireWorkshopAgentId(request.agentId);
	const target = resolveSkillProposalTarget({
		skillName: name,
		config: request.config,
		agentId,
		...request.env ? { env: request.env } : {}
	});
	if (await readWorkspaceSkillFile(target.skillFile) !== null) throw new Error(`Skill already exists at ${target.skillFile}.`);
	return await createPendingSkillProposal(request, {
		store,
		config,
		agentId,
		kind: "create",
		draft: {
			name: target.skillKey,
			description,
			skillDescription: resolveDraftedSkillDescription({
				content: request.content,
				label: description
			}),
			content: request.content,
			secretScanMetadata: [{
				file: "skill-name",
				content: name
			}]
		},
		target: {
			skillName: name,
			skillKey: target.skillKey,
			skillDir: target.skillDir,
			skillFile: target.skillFile,
			source: "openclaw-workshop"
		}
	});
}
function composeSkillBodyPatch(body, patch) {
	if (!patch.oldString) {
		if (!patch.newString.trim()) throw new Error("Patch newString must not be empty when appending.");
		return `${body.trimEnd()}\n\n${patch.newString.trim()}\n`;
	}
	const { start, end } = findUniqueSkillPatchSpan(body, patch.oldString);
	return `${body.slice(0, start)}${patch.newString}${body.slice(end)}`;
}
function findUniqueSkillPatchSpan(body, oldString) {
	const first = body.indexOf(oldString);
	if (first === -1) throw new Error("Patch oldString not found in the live skill body. Read the skill and quote the exact current text.");
	if (body.includes(oldString, first + 1)) throw new Error("Patch oldString matches more than once in the live skill body. Quote a longer unique span.");
	return {
		start: first,
		end: first + oldString.length
	};
}
async function proposeUpdateSkill(input) {
	const store = captureSkillWorkshopStoreOptions({
		env: input.env,
		agentId: input.agentId,
		config: input.config
	});
	const captured = {
		...input,
		env: store.env,
		supportFiles: structuredClone(input.supportFiles),
		origin: structuredClone(input.origin),
		eventActor: structuredClone(input.eventActor)
	};
	const request = {
		...captured,
		composePatch: structuredClone(captured.composePatch)
	};
	const skillName = normalizeRequired(request.skillName, "Skill name");
	const config = resolveSkillWorkshopConfig(request.config);
	const agentId = requireWorkshopAgentId(request.agentId);
	const target = await readWritableWorkshopSkill(skillName, {
		config: request.config,
		agentId,
		env: request.env
	});
	const currentContent = target.content;
	if (request.expectedCurrentContentHash !== void 0 && sha256Hex(currentContent) !== request.expectedCurrentContentHash) throw new SkillProposalStaleTargetError("Skill changed since the reviewer's read: read it again and redraft the update.");
	const draftContent = request.composePatch !== void 0 ? composeSkillBodyPatch(stripProposalFrontmatterForSkill(currentContent), request.composePatch) : request.content;
	if (draftContent === void 0) throw new Error("Update proposal requires content or composePatch.");
	const description = resolveUpdateProposalDescription(request.description, target.description);
	return await createPendingSkillProposal(request, {
		store,
		config,
		agentId,
		kind: "update",
		draft: {
			name: target.skillName,
			description,
			skillDescription: resolveDraftedSkillDescription({
				content: draftContent,
				fallbackContent: currentContent,
				label: description
			}),
			content: draftContent,
			fallbackFrontmatterContent: currentContent
		},
		target: {
			skillName: target.skillName,
			skillKey: target.skillKey,
			skillDir: target.baseDir,
			skillFile: target.skillFile,
			source: "openclaw-workshop",
			currentContentHash: hashSkillProposalContent(currentContent)
		}
	});
}
async function createPendingSkillProposal(input, params) {
	const { config, agentId, kind, target, draft } = params;
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const prepared = prepareSkillProposalDraft({
		...draft,
		date: now,
		maxSkillBytes: config.maxSkillBytes,
		supportFiles: input.supportFiles,
		goal: input.goal,
		evidence: input.evidence
	});
	if (!prepared.ok) throw prepared.error.cause;
	const { content, draftHash, evidence, goal, scan, supportFiles } = prepared.value;
	const id = createSkillProposalId(kind === "create" ? target.skillName : target.skillKey);
	const origin = normalizeProposalOrigin({
		...input.origin,
		agentId: input.origin?.agentId ?? input.agentId
	});
	const originRunProvenance = mergeProposalOriginRunProvenance(void 0, origin);
	const record = {
		schema: SKILL_WORKSHOP_SCHEMA,
		id,
		kind,
		status: "pending",
		title: `${kind === "create" ? "Create" : "Update"} ${target.skillName}`,
		description: draft.description,
		createdAt: now,
		updatedAt: now,
		createdBy: input.createdBy ?? "skill-workshop",
		...input.autonomousCapture ? { autonomousCapture: true } : {},
		...origin ? { origin } : {},
		...originRunProvenance,
		proposedVersion: "v1",
		draftFile: createSkillProposalGenerationDraftFile(),
		draftHash,
		target,
		scan,
		...supportFiles.length > 0 ? { supportFiles: await buildSupportFileMetadata(supportFiles, kind === "update" ? target.skillDir : void 0) } : {},
		...goal ? { goal } : {},
		...evidence ? { evidence } : {}
	};
	const event = await writeSkillProposal({
		assertCommitAllowed: input.assertCommitAllowed,
		record,
		content,
		supportFiles,
		ownerAgentId: agentId,
		maxPending: config.maxPending,
		event: createSkillProposalEvent({
			record,
			type: "created",
			actor: input.eventActor
		}),
		store: params.store
	});
	await dispatchSkillProposalChanged({
		event,
		record,
		workspaceDir: input.workspaceDir,
		...input.agentId ? { agentId: input.agentId } : {}
	});
	return {
		record,
		revisionHash: hashSkillProposalRevision(record),
		content
	};
}
function requireWorkshopAgentId(agentId) {
	if (!agentId) throw new Error("Skill Workshop requires the active agent id.");
	return agentId;
}
async function buildSupportFileMetadata(files, targetSkillDir) {
	const out = [];
	for (const file of files) {
		const metadata = {
			path: file.path,
			sizeBytes: file.sizeBytes,
			hash: file.hash
		};
		if (targetSkillDir) {
			const targetContent = await readWorkspaceSupportFile({
				skillDir: targetSkillDir,
				relativePath: file.path
			});
			metadata.targetExisted = targetContent !== null;
			if (targetContent !== null) metadata.targetContentHash = hashSkillProposalContent(targetContent);
		}
		out.push(metadata);
	}
	return out;
}
function normalizeRequired(value, label) {
	const normalized = normalizeOptionalString(value);
	if (!normalized) throw new Error(`${label} is required.`);
	return normalized;
}
//#endregion
//#region src/skills/workshop/service.ts
function proposalStoreOptions(env, agentId, config) {
	if (!agentId) throw new Error("Skill Workshop requires the active agent id.");
	return {
		...env ? { env } : {},
		agentId,
		config
	};
}
function workshopSkillsDir(input) {
	if (!input.agentId) throw new Error("Skill Workshop requires the active agent id.");
	return resolveWorkshopSkillsDir(input.config, input.agentId, input.env);
}
const APPLY_TRANSITION_DEPENDENCIES = {
	assertExpectedRevisionHash,
	evaluateSkillProposal,
	isCreateTargetConflict: (error) => error instanceof SkillProposalCreateTargetConflictError,
	readRequiredProposal
};
async function reviseSkillProposal(input) {
	if (input.content === void 0 && input.supportFiles === void 0 && input.description === void 0 && input.goal === void 0 && input.evidence === void 0) throw new Error("Skill proposal revision requires at least one changed field.");
	const request = {
		...input,
		supportFiles: structuredClone(input.supportFiles),
		origin: structuredClone(input.origin),
		eventActor: structuredClone(input.eventActor)
	};
	const config = resolveSkillWorkshopConfig(request.config);
	const revision = withPendingSkillProposalRevision(request, async (read, store) => {
		const lockedRequest = {
			...request,
			env: store.env
		};
		const { record } = read;
		const skillsRoot = workshopSkillsDir(lockedRequest);
		assertInsideSkillsRoot(skillsRoot, record.target.skillFile, "skill file");
		assertInsideSkillsRoot(skillsRoot, record.target.skillDir, "skill directory");
		const currentContent = await readWorkspaceSkillFile(record.target.skillFile);
		if (record.kind === "create") {
			if (currentContent !== null) await markSkillProposalStale({
				store,
				record,
				reason: "Target skill was created after proposal creation.",
				message: "Target skill was created after proposal creation; proposal marked stale.",
				input: lockedRequest
			});
		} else {
			if (currentContent === null) throw new Error(`Target skill is missing: ${record.target.skillFile}`);
			if (record.target.currentContentHash && hashSkillProposalContent(currentContent) !== record.target.currentContentHash) await markSkillProposalStale({
				store,
				record,
				reason: "Target skill changed after proposal creation.",
				message: "Target skill changed after proposal creation; proposal marked stale.",
				input: lockedRequest
			});
			await assertSupportTargetsUnchanged(record, lockedRequest, store);
		}
		const supportFiles = lockedRequest.supportFiles === void 0 ? read.supportFiles ?? [] : lockedRequest.supportFiles;
		const requestedContent = lockedRequest.content ?? read.content;
		const nextVersion = nextProposalVersion(record.proposedVersion);
		const explicitDescription = normalizeOptionalString(lockedRequest.description);
		const description = explicitDescription ?? record.description;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const prepared = prepareSkillProposalDraft({
			name: resolveSkillProposalName(record.kind, record.target),
			description,
			skillDescription: resolveDraftedSkillDescription({
				content: requestedContent,
				fallbackContent: read.content,
				label: description,
				...record.kind === "create" && explicitDescription ? { explicitDescription } : {}
			}),
			content: requestedContent,
			fallbackFrontmatterContent: read.content,
			version: nextVersion,
			date: now,
			maxSkillBytes: config.maxSkillBytes,
			supportFiles,
			goal: lockedRequest.goal === void 0 ? record.goal : lockedRequest.goal,
			evidence: lockedRequest.evidence === void 0 ? record.evidence : lockedRequest.evidence
		});
		if (!prepared.ok) throw prepared.error.cause;
		const { content: proposalContent, draftHash, evidence, goal, scan, supportFiles: preparedSupportFiles } = prepared.value;
		const supportFileMetadata = preparedSupportFiles.length > 0 ? await buildSupportFileMetadata(preparedSupportFiles, record.kind === "update" ? record.target.skillDir : void 0) : [];
		const origin = normalizeProposalOrigin(lockedRequest.origin);
		const originRunProvenance = mergeProposalOriginRunProvenance(record, origin);
		const revised = {
			...record,
			description,
			updatedAt: now,
			proposedVersion: nextVersion,
			draftFile: createSkillProposalGenerationDraftFile(),
			draftHash,
			scan,
			...origin ? { origin } : {},
			...originRunProvenance
		};
		delete revised.evaluation;
		if (preparedSupportFiles.length > 0) revised.supportFiles = supportFileMetadata;
		else delete revised.supportFiles;
		if (goal) revised.goal = goal;
		else delete revised.goal;
		if (evidence) revised.evidence = evidence;
		else delete revised.evidence;
		const event = await replaceSkillProposalDraft({
			assertCommitAllowed: lockedRequest.assertCommitAllowed,
			expected: record,
			record: revised,
			content: proposalContent,
			supportFiles: preparedSupportFiles,
			event: createSkillProposalEvent({
				record: revised,
				type: "revised",
				actor: lockedRequest.eventActor,
				...lockedRequest.correlationId ? { correlationId: lockedRequest.correlationId } : {},
				occurredAt: now
			}),
			store
		});
		return {
			read: {
				record: revised,
				revisionHash: hashSkillProposalRevision(revised),
				content: proposalContent
			},
			event
		};
	});
	const revisedResult = await withSkillProposalLifecycleDispatch(request, revision);
	await dispatchSkillProposalChanged({
		event: revisedResult.event,
		record: revisedResult.read.record,
		workspaceDir: request.workspaceDir,
		...request.agentId ? { agentId: request.agentId } : {}
	});
	return revisedResult.read;
}
async function rejectSkillProposal(input) {
	return await markProposal(input, "rejected");
}
async function quarantineSkillProposal(input) {
	return await markProposal(input, "quarantined");
}
async function applySkillProposal(input) {
	return await applySkillProposalTransition(input, APPLY_TRANSITION_DEPENDENCIES);
}
async function markProposal(input, status) {
	const store = captureSkillWorkshopStoreOptions(proposalStoreOptions(input.env, input.agentId, input.config));
	const request = {
		...input,
		env: store.env,
		eventActor: structuredClone(input.eventActor)
	};
	const scope = request.agentId ? { agentId: request.agentId } : {};
	const initial = await readSkillProposalRecord(request.proposalId, store, scope, { config: request.config });
	if (!initial) throw new Error(`Skill proposal not found: ${request.proposalId}`);
	const result = await withSkillProposalTargetLock(initial, async (lockedStore) => {
		const current = await readSkillProposalRecord(request.proposalId, {
			...lockedStore,
			config: request.config
		}, scope, {
			config: request.config,
			reconcile: false
		});
		if (!current) throw new Error(`Skill proposal not found: ${request.proposalId}`);
		if (current.status !== "pending") throw new Error(`Only pending proposals can be ${status}. Current status: ${current.status}.`);
		assertExpectedRevisionHash(hashSkillProposalRevision(current), request.expectedRevisionHash);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const base = {
			...current,
			status,
			updatedAt: now,
			statusReason: normalizeOptionalString(request.reason)
		};
		const record = status === "rejected" ? {
			...base,
			rejectedAt: now
		} : {
			...base,
			quarantinedAt: now,
			scan: {
				...current.scan,
				state: "quarantined"
			}
		};
		return {
			record,
			event: await updateSkillProposalRecord({
				record,
				event: createSkillProposalEvent({
					record,
					type: status,
					actor: request.eventActor,
					...request.correlationId ? { correlationId: request.correlationId } : {},
					occurredAt: now
				}),
				store: lockedStore
			})
		};
	}, store);
	if (result.event) await dispatchSkillProposalChanged({
		event: result.event,
		record: result.record,
		workspaceDir: request.workspaceDir,
		...request.agentId ? { agentId: request.agentId } : {}
	});
	return result.record;
}
async function withPendingSkillProposalRevision(input, fn) {
	const store = captureSkillWorkshopStoreOptions(proposalStoreOptions(input.env, input.agentId, input.config));
	const request = {
		...input,
		env: store.env
	};
	const recoveryReadOptions = {
		config: request.config,
		store
	};
	const lockedReadOptions = {
		config: request.config,
		reconcile: false
	};
	const initial = await readRequiredProposal(request.proposalId, request.env, request.agentId, recoveryReadOptions);
	return await withSkillProposalTargetLock(initial.record, async (lockedStore) => {
		const read = await readRequiredProposal(request.proposalId, request.env, request.agentId, {
			...lockedReadOptions,
			store: lockedStore
		});
		if (read.record.status !== "pending") throw new Error(`Only pending proposals can be revised. Current status: ${read.record.status}.`);
		assertExpectedRevisionHash(read.revisionHash, request.expectedRevisionHash);
		if (hashSkillProposalContent(read.content) !== read.record.draftHash) throw new Error("Proposal draft changed without updating proposal metadata.");
		return await fn(read, lockedStore);
	}, store);
}
async function assertSupportTargetsUnchanged(record, input, store) {
	if (record.kind !== "update" || !record.supportFiles) return;
	for (const file of record.supportFiles) {
		if (file.targetExisted === void 0) continue;
		const currentContent = await readWorkspaceSupportFile({
			skillDir: record.target.skillDir,
			relativePath: file.path
		});
		await assertSkillProposalSupportTargetUnchanged({
			store,
			record,
			file,
			currentContent,
			input
		});
	}
}
//#endregion
export { SkillProposalStaleTargetError as a, proposeCreateSkill as c, assertExpectedRevisionHash as d, evaluateSkillProposal as f, readSkillProposalDraftFile as g, readSkillProposalDraftDirectory as h, reviseSkillProposal as i, proposeUpdateSkill as l, prepareSkillProposalDraft as m, quarantineSkillProposal as n, composeSkillBodyPatch as o, listSkillProposalEvents as p, rejectSkillProposal as r, findUniqueSkillPatchSpan as s, applySkillProposal as t, SkillProposalRevisionChangedError as u };
