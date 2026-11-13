import { O as walkDirectory, d as pathExists, t as FsSafeError, w as root } from "./fs-safe-CHQXnCPk.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { i as logWarn } from "./logger-DmolGPgx.mjs";
import { n as withOpenClawStateLeaseAsync } from "./openclaw-state-lease-dtaWMPu_.mjs";
import { t as getGlobalHookRunner } from "./hook-runner-global-CwCyBBBr.mjs";
import { u as extractFrontmatterBlock } from "./frontmatter-Bibn4xoJ.mjs";
import { t as retainMutationAuthority } from "./mutation-authority-E8BC9dNY.mjs";
import { t as parseSkillFrontmatter } from "./frontmatter-CP-MKgNH.mjs";
import { d as readWorkspaceSupportFile, f as restoreWorkspaceSkillMutation, i as assertWorkspaceSkillSupportPathSetIsFileOnly, l as prepareWorkspaceSkillRestoration, r as assertInsideSkillsRoot, s as normalizeWorkspaceSkillSupportPath, t as MAX_WORKSPACE_SKILL_SUPPORT_FILE_BYTES, u as readWorkspaceSkillFile } from "./workspace-skill-write-BcZVBI5U.mjs";
import { t as bumpSkillsSnapshotVersion } from "./refresh-state-Cazo5oir.mjs";
import { n as hashSkillProposalRevision, t as hashSkillProposalContent } from "./proposal-hash-DFkV3A6F.mjs";
import { t as resolveWorkshopSkillsDir } from "./skills-root-CYPE5f0c.mjs";
import { d as SKILL_WORKSHOP_MANIFEST_SCHEMA, n as PROPOSAL_DRAFT_FILE, r as assertProposalId } from "./store-record-Dxu22ebc.mjs";
import { a as cleanupSkillProposalGenerations, c as proposalBundleRelativePath, i as readStoredProposal, l as resolveSkillWorkshopStateDir, n as ensureSkillWorkshopStore, r as executeSkillWorkshopOperation, s as discardSkillProposalGeneration, t as captureSkillWorkshopStoreOptions, u as stageSkillProposalGeneration } from "./store-client-pSi5T8mh.mjs";
import { a as normalizeSkillIndexName } from "./skill-index-ZDYIG8ML.mjs";
import path from "node:path";
import crypto, { randomUUID } from "node:crypto";
import { isUtf8 } from "node:buffer";
//#region src/skills/workshop/frontmatter.ts
function resolveSkillProposalName(kind, target) {
	return kind === "create" ? target.skillKey : target.skillName;
}
/** Renders proposal markdown while preserving allowed original frontmatter fields. */
function renderProposalMarkdown(params) {
	const extracted = extractFrontmatterBlock(params.content);
	const originalFrontmatter = extracted?.block ?? (params.fallbackFrontmatterContent ? extractFrontmatterBlock(params.fallbackFrontmatterContent)?.block : void 0);
	const keptFrontmatter = originalFrontmatter ? filterFrontmatterBlock(originalFrontmatter, [
		"name",
		"description",
		"status",
		"version",
		"date"
	]) : "";
	const body = (extracted?.body ?? normalizeNewlines(params.content)).trimStart();
	const version = params.version ?? "v1";
	const date = params.date ?? (/* @__PURE__ */ new Date()).toISOString();
	const markdown = `---\n${[
		`name: ${JSON.stringify(params.name)}`,
		`description: ${JSON.stringify(params.description)}`,
		"status: proposal",
		`version: ${JSON.stringify(version)}`,
		`date: ${JSON.stringify(date)}`,
		keptFrontmatter
	].filter(Boolean).join("\n")}\n---\n\n${body}`;
	return markdown.endsWith("\n") ? markdown : `${markdown}\n`;
}
function readProposalFrontmatter(content) {
	const frontmatter = parseSkillFrontmatter(content);
	const name = frontmatter.name?.trim();
	const description = frontmatter.description?.trim();
	const status = frontmatter.status?.trim().toLowerCase();
	if (!name || !description || status !== "proposal") return null;
	return {
		name,
		description
	};
}
function stripProposalFrontmatterForSkill(content) {
	const normalized = normalizeNewlines(content);
	const extracted = extractFrontmatterBlock(normalized);
	if (!extracted) return normalized.endsWith("\n") ? normalized : `${normalized}\n`;
	const body = extracted.body.replace(/^\n+/, "");
	const keptLines = extracted.block.split("\n").filter((line) => {
		const key = line.match(/^([\w-]+):/)?.[1]?.toLowerCase();
		return key !== "status" && key !== "version" && key !== "date";
	}).join("\n").trim();
	const result = keptLines ? `---\n${keptLines}\n---\n\n${body}` : body;
	return result.endsWith("\n") ? result : `${result}\n`;
}
function filterFrontmatterBlock(block, keysToDrop) {
	const drop = new Set(keysToDrop.map((key) => key.toLowerCase()));
	const lines = block.split("\n");
	const kept = [];
	let dropping = false;
	for (const line of lines) {
		const key = line.match(/^([\w-]+):/)?.[1]?.toLowerCase();
		if (key) dropping = drop.has(key);
		if (!dropping) kept.push(line);
	}
	return kept.join("\n").trim();
}
function extractFrontmatterDescription(content) {
	if (!content) return;
	try {
		const trimmed = parseSkillFrontmatter(content).description?.trim();
		return trimmed ? trimmed : void 0;
	} catch {
		return;
	}
}
/**
* Resolves the description that apply writes into SKILL.md frontmatter.
*
* The proposal listing label never replaces the skill description: the drafted
* content (or the current live skill, when the draft is body-only) stays
* authoritative, and the label is only proposal listing metadata.
*/
function resolveDraftedSkillDescription(params) {
	return params.explicitDescription ?? extractFrontmatterDescription(params.content) ?? extractFrontmatterDescription(params.fallbackContent) ?? params.label;
}
function normalizeNewlines(content) {
	return content.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}
//#endregion
//#region src/skills/workshop/plugin-hooks.ts
const MAX_SKILL_PROPOSAL_CORRELATION_ID_LENGTH = 256;
function normalizeSkillProposalCorrelationId(value) {
	const normalized = value?.trim();
	if (!normalized) return;
	if (Array.from(normalized).length > MAX_SKILL_PROPOSAL_CORRELATION_ID_LENGTH) throw new Error(`Skill proposal correlation id exceeds ${MAX_SKILL_PROPOSAL_CORRELATION_ID_LENGTH} characters.`);
	return normalized;
}
function createSkillProposalEvent(params) {
	const correlationId = normalizeSkillProposalCorrelationId(params.correlationId);
	return {
		eventId: randomUUID(),
		proposalId: params.record.id,
		proposedVersion: params.record.proposedVersion,
		revisionHash: hashSkillProposalRevision(params.record),
		type: params.type,
		occurredAt: params.occurredAt ?? (/* @__PURE__ */ new Date()).toISOString(),
		actor: params.actor ?? { type: "system" },
		...correlationId ? { correlationId } : {},
		...params.payload ? { payload: params.payload } : {},
		...params.evaluation ? { evaluation: params.evaluation } : {}
	};
}
function hasSkillProposalEvaluators() {
	return getGlobalHookRunner()?.hasHooks("skill_proposal_evaluate") ?? false;
}
async function runSkillProposalEvaluators(event, ctx) {
	const runner = getGlobalHookRunner();
	if (!runner?.hasHooks("skill_proposal_evaluate")) return [];
	return await runner.runSkillProposalEvaluate(event, ctx);
}
async function dispatchSkillProposalChanged(params) {
	const runner = getGlobalHookRunner();
	if (!runner?.hasHooks("skill_proposal_changed")) return;
	await runner.runSkillProposalChanged({
		eventId: params.event.eventId,
		sequence: params.event.sequence,
		action: params.event.type,
		occurredAt: params.event.occurredAt,
		...params.event.correlationId ? { correlationId: params.event.correlationId } : {},
		proposal: {
			id: params.record.id,
			kind: params.record.kind,
			status: params.record.status,
			revision: params.record.proposedVersion,
			revisionSha256: params.event.revisionHash,
			skillName: params.record.target.skillName,
			skillKey: params.record.target.skillKey,
			skillFile: params.record.target.skillFile,
			...params.record.target.source ? { source: params.record.target.source } : {}
		},
		...params.evaluations ? { evaluations: params.evaluations } : {}
	}, {
		workspaceDir: params.workspaceDir,
		...params.agentId ? { agentId: params.agentId } : {}
	});
}
//#endregion
//#region src/skills/workshop/proposal-bundle.ts
const MAX_EVALUATION_FILES = 256;
const MAX_EVALUATION_FILE_BYTES = 1048576;
const MAX_EVALUATION_BUNDLE_BYTES = 8388608;
const MAX_EVALUATION_PATH_DEPTH = 16;
const EXCLUDED_ROOT_DIRS = /* @__PURE__ */ new Set([
	".clawhub",
	".clawdhub",
	".openclaw"
]);
async function buildSkillProposalEvaluationBundles(params) {
	const targetFiles = await readSkillTreeFiles(params.proposal.record.target.skillDir);
	const targetTreeSha256 = hashSkillTree(targetFiles);
	const skillMdPath = params.proposal.record.kind === "create" ? "SKILL.md" : resolveTargetSkillRelativePath(params.proposal, targetFiles, { recordedTargetExists: await pathExists(params.proposal.record.target.skillFile) });
	const candidateSkillMd = fileFromBuffer(skillMdPath, Buffer.from(stripProposalFrontmatterForSkill(params.proposal.content), "utf8"));
	const proposedFiles = params.supportFiles.map((file) => fileFromBuffer(file.path, Buffer.from(file.content, "utf8")));
	let baseline;
	if (params.proposal.record.kind === "create") {
		if (await pathExists(params.proposal.record.target.skillFile)) throw new Error(`Target skill already exists: ${params.proposal.record.target.skillFile}`);
		for (const file of proposedFiles) {
			const targetFile = path.join(params.proposal.record.target.skillDir, file.path);
			if (await pathExists(targetFile)) throw new Error(`Target support file already exists: ${targetFile}`);
		}
	} else baseline = snapshotFromFiles(targetFiles, skillMdPath);
	const candidateFiles = new Map([
		...targetFiles,
		candidateSkillMd,
		...proposedFiles
	].map((file) => [file.path, file]));
	return {
		...baseline ? { baseline } : {},
		candidate: snapshotFromFiles([...candidateFiles.values()], skillMdPath),
		targetTreeSha256
	};
}
async function readSkillProposalTargetTreeSha256(skillDir, options = {}) {
	return hashSkillTree(await readSkillTreeFiles(skillDir, options.includeRootMetadata));
}
async function readSkillTreeFiles(skillDir, includeRootMetadata = false) {
	const include = (entry) => includeRootMetadata || entry.depth > 1 || !EXCLUDED_ROOT_DIRS.has(entry.name);
	const scanned = await walkDirectory(skillDir, {
		maxDepth: 17,
		maxEntries: MAX_EVALUATION_FILES * 2,
		symlinks: "include",
		include,
		descend: include
	});
	if (scanned.truncated || scanned.entries.some((entry) => entry.depth > MAX_EVALUATION_PATH_DEPTH)) throw new Error("Skill evaluation bundle exceeds traversal limits.");
	const failed = scanned.failedDirs[0];
	if (failed) {
		if (!failed.relativePath && hasErrnoCode(failed.error, "ENOENT")) return [];
		throw failed.error;
	}
	const skillRoot = await root(skillDir);
	const files = [];
	let totalBytes = 0;
	for (const entry of scanned.entries.toSorted((a, b) => a.relativePath.localeCompare(b.relativePath))) {
		if (entry.kind === "directory") continue;
		const portablePath = entry.relativePath.split(path.sep).join("/");
		if (entry.kind !== "file") throw new Error(`Skill evaluation bundle contains unsupported entry: ${portablePath}`);
		const read = await skillRoot.read(entry.relativePath, {
			hardlinks: "reject",
			maxBytes: MAX_EVALUATION_FILE_BYTES,
			symlinks: "reject"
		});
		totalBytes += read.buffer.byteLength;
		if (totalBytes > MAX_EVALUATION_BUNDLE_BYTES) throw new Error(`Skill evaluation bundle exceeds ${MAX_EVALUATION_BUNDLE_BYTES} total bytes.`);
		files.push(fileFromBuffer(portablePath, read.buffer));
	}
	return files;
}
function fileFromBuffer(relativePath, content) {
	const encoding = !content.includes(0) && isUtf8(content) ? "utf8" : "base64";
	return {
		path: relativePath,
		content: content.toString(encoding),
		encoding,
		sha256: sha256Hex(content),
		sizeBytes: content.byteLength
	};
}
function snapshotFromFiles(inputFiles, skillMdPath) {
	const files = inputFiles.toSorted((a, b) => a.path.localeCompare(b.path));
	assertEvaluationBundleWithinLimits(files);
	const skillMd = files.find((file) => file.path === skillMdPath);
	if (!skillMd) throw new Error(`Skill evaluation bundle is missing ${skillMdPath}.`);
	return {
		skillMd,
		files: files.filter((file) => file.path !== skillMdPath),
		treeSha256: hashSkillTree(files)
	};
}
function assertEvaluationBundleWithinLimits(files) {
	if (files.length > MAX_EVALUATION_FILES) throw new Error(`Skill evaluation bundle exceeds ${MAX_EVALUATION_FILES} files.`);
	let totalBytes = 0;
	for (const file of files) {
		if (file.sizeBytes > MAX_EVALUATION_FILE_BYTES) throw new Error(`Skill evaluation bundle file exceeds ${MAX_EVALUATION_FILE_BYTES} bytes: ${file.path}.`);
		totalBytes += file.sizeBytes;
	}
	if (totalBytes > MAX_EVALUATION_BUNDLE_BYTES) throw new Error(`Skill evaluation bundle exceeds ${MAX_EVALUATION_BUNDLE_BYTES} total bytes.`);
}
function hashSkillTree(files) {
	return sha256Hex(JSON.stringify(files.toSorted((a, b) => a.path.localeCompare(b.path)).map((file) => ({
		path: file.path,
		sha256: file.sha256,
		sizeBytes: file.sizeBytes
	}))));
}
function resolveTargetSkillRelativePath(proposal, targetFiles, options) {
	const relativePath = path.relative(path.resolve(proposal.record.target.skillDir), path.resolve(proposal.record.target.skillFile));
	if (!relativePath || path.isAbsolute(relativePath) || relativePath.startsWith(`..${path.sep}`)) throw new Error("Skill evaluation target file must be inside the skill directory.");
	const portablePath = relativePath.split(path.sep).join("/");
	if (targetFiles.some((file) => file.path === portablePath)) return portablePath;
	if (!options.recordedTargetExists) return portablePath;
	const caseMatches = targetFiles.filter((file) => file.path.toLowerCase() === portablePath.toLowerCase());
	if (caseMatches.length === 1) return caseMatches[0].path;
	if (caseMatches.length > 1) throw new Error(`Skill evaluation target filename is ambiguous: ${portablePath}.`);
	return portablePath;
}
//#endregion
//#region src/skills/workshop/store-rollback.ts
async function writeSkillProposalRollback(params) {
	assertProposalId(params.proposalId);
	return executeSkillWorkshopOperation("workshop.rollback.write", {
		proposalId: params.proposalId,
		rollback: params.rollback
	}, params.store);
}
async function readSkillProposalRollback(proposalId, options = {}) {
	assertProposalId(proposalId);
	return executeSkillWorkshopOperation("workshop.rollback.read", proposalId, options);
}
async function clearSkillProposalRollback(params) {
	assertProposalId(params.proposalId);
	return executeSkillWorkshopOperation("workshop.rollback.clear", {
		proposalId: params.proposalId,
		expectedRecordJson: params.expectedRecordJson
	}, params.store);
}
//#endregion
//#region src/skills/workshop/store-transition.ts
function commitPendingSkillProposalTransition(params) {
	return executeSkillWorkshopOperation("workshop.transition.commit", {
		expected: params.expected,
		record: params.record,
		event: params.event,
		operationLabel: params.operationLabel,
		invalidateRollback: params.invalidateRollback
	}, params.store, params.assertCommitAllowed);
}
function readCommittedSkillProposalTransition(params) {
	return executeSkillWorkshopOperation("workshop.transition.committed", {
		record: params.record,
		event: params.event
	}, params.store);
}
//#endregion
//#region src/skills/workshop/target-lock.ts
const TARGET_LEASE_MS = 6e4;
const TARGET_LEASE_WAIT_MS = 5e3;
const COLLECTION_LEASE_MS = 6e5;
function requireAgentId(options) {
	if (!options.agentId) throw new Error("Skill Workshop requires an agent id for storage ownership.");
	return options.agentId;
}
/** Each agent owns one collection lease; writers for different agents do not contend. */
async function withSkillCollectionLock(fn, options = {}) {
	const store = captureSkillWorkshopStoreOptions(options);
	const key = requireAgentId(store);
	await ensureSkillWorkshopStore(store);
	return withOpenClawStateLeaseAsync({
		scope: "skill-collection",
		key,
		leaseMs: COLLECTION_LEASE_MS,
		waitMs: TARGET_LEASE_WAIT_MS,
		leaseLabel: "skill collection lease",
		operationLabel: "skill-collection.commit"
	}, store.execution.context, (lease) => fn({
		...store,
		execution: {
			...store.execution,
			leases: [...store.execution.leases, lease]
		}
	}));
}
async function withSkillProposalTargetLock(record, fn, options = {}) {
	const store = captureSkillWorkshopStoreOptions(options);
	const key = `${requireAgentId(store)}:${hashSkillProposalContent(record.target.skillFile)}`;
	await ensureSkillWorkshopStore(store);
	return withOpenClawStateLeaseAsync({
		scope: "skill-workshop-target",
		key,
		leaseMs: TARGET_LEASE_MS,
		waitMs: TARGET_LEASE_WAIT_MS,
		leaseLabel: "Skill Workshop target lease",
		operationLabel: "skill-workshop.target-lease"
	}, store.execution.context, (lease) => fn({
		...store,
		execution: {
			...store.execution,
			leases: [...store.execution.leases, lease]
		}
	}));
}
function withSkillProposalCommitLock(record, fn, options = {}) {
	return withSkillCollectionLock((store) => withSkillProposalTargetLock(record, fn, store), options);
}
//#endregion
//#region src/skills/workshop/reconcile-transition.ts
async function reconcileInterruptedSkillProposalApply(request) {
	const { store: options, ...input } = request;
	const params = {
		...structuredClone(input),
		store: captureSkillWorkshopStoreOptions(options)
	};
	return await withSkillProposalCommitLock(params.record, async (store) => {
		const stored = await readStoredProposal(params.record.id, store);
		if (!stored || stored.record.status !== "pending" || stored.row.record_json !== params.expectedRecordJson) return false;
		assertInsideSkillsRoot(params.skillsRoot, stored.record.target.skillDir, "skill directory");
		assertInsideSkillsRoot(params.skillsRoot, stored.record.target.skillFile, "skill file");
		const rollback = await readSkillProposalRollback(params.record.id, store);
		if (!rollback || !resolveRecoveryRollback(stored.record, rollback)) return false;
		if (hashSkillProposalContent(params.draftContent) !== stored.record.draftHash) return false;
		let proposedContent;
		try {
			proposedContent = stripProposalFrontmatterForSkill(params.draftContent);
		} catch {
			return false;
		}
		const recovery = await inspectInterruptedApplyState({
			record: stored.record,
			rollback,
			proposedContent
		}).catch(() => null);
		if (!recovery) return false;
		if (recovery.state === "proposed") {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const applied = {
				...stored.record,
				status: "applied",
				updatedAt: now,
				appliedAt: now
			};
			if ((await commitPendingSkillProposalTransition({
				expected: stored.record,
				record: applied,
				event: createSkillProposalEvent({
					record: applied,
					type: "applied",
					occurredAt: now,
					payload: { recovered: true }
				}),
				store,
				operationLabel: "skill-workshop.apply.reconcile"
			})).state !== "committed") return false;
			bumpSkillsSnapshotVersion({
				reason: "workshop",
				changedPath: stored.record.target.skillFile
			});
			return true;
		}
		if (recovery.state === "partial") {
			const restoration = await prepareWorkspaceSkillRestoration({
				skillsRoot: params.skillsRoot,
				skillDir: stored.record.target.skillDir,
				skillFile: stored.record.target.skillFile,
				previousContent: rollback.previousContent ?? null,
				proposedContentHash: hashSkillProposalContent(proposedContent),
				supportFiles: recovery.supportFiles,
				mode: stored.record.kind
			});
			try {
				await restoreWorkspaceSkillMutation(restoration);
			} finally {
				bumpSkillsSnapshotVersion({
					reason: "workshop",
					changedPath: stored.record.target.skillFile
				});
			}
		}
		return await clearSkillProposalRollback({
			proposalId: stored.record.id,
			expectedRecordJson: params.expectedRecordJson,
			store
		});
	}, params.store).catch(() => false);
}
function resolveRecoveryRollback(record, rollback) {
	if (rollback.proposalId !== record.id || rollback.action !== record.kind || path.resolve(rollback.targetSkillFile) !== path.resolve(record.target.skillFile)) return null;
	if (record.kind === "create") {
		if (rollback.previousContent !== void 0 || rollback.previousContentHash !== void 0) return null;
	} else if (rollback.previousContent === void 0 || rollback.previousContentHash === void 0 || hashSkillProposalContent(rollback.previousContent) !== rollback.previousContentHash) return null;
	const proposedSupport = new Map((record.supportFiles ?? []).map((file) => [file.path, file]));
	const rollbackSupport = /* @__PURE__ */ new Set();
	for (const file of rollback.supportFiles ?? []) {
		let normalizedPath;
		try {
			normalizedPath = normalizeWorkspaceSkillSupportPath(file.path);
		} catch {
			return null;
		}
		if (normalizedPath !== file.path || !proposedSupport.has(normalizedPath) || rollbackSupport.has(normalizedPath) || file.existed && (file.previousContent === void 0 || file.previousContentHash === void 0 || hashSkillProposalContent(file.previousContent) !== file.previousContentHash) || !file.existed && (file.previousContent !== void 0 || file.previousContentHash !== void 0)) return null;
		rollbackSupport.add(normalizedPath);
	}
	if ([...proposedSupport.keys()].some((filePath) => !rollbackSupport.has(filePath))) return null;
	return rollback;
}
async function inspectInterruptedApplyState(params) {
	const mainState = classifyRecoveryFileState({
		currentContent: await readWorkspaceSkillFile(params.record.target.skillFile),
		previousContent: params.rollback.previousContent ?? null,
		proposedHash: hashSkillProposalContent(params.proposedContent)
	});
	if (!mainState) throw new Error("Interrupted Skill Workshop apply target does not match recovery facts.");
	const rollbackSupport = new Map((params.rollback.supportFiles ?? []).map((file) => [file.path, file]));
	const supportFiles = [];
	const supportStates = [];
	for (const file of params.record.supportFiles ?? []) {
		const rollbackFile = rollbackSupport.get(file.path);
		if (!rollbackFile) throw new Error(`Missing rollback facts for support file: ${file.path}`);
		const currentSupportContent = await readWorkspaceSupportFile({
			skillDir: params.record.target.skillDir,
			relativePath: file.path
		});
		const previousSupportContent = rollbackFile.previousContent ?? null;
		const state = classifyRecoveryFileState({
			currentContent: currentSupportContent,
			previousContent: previousSupportContent,
			proposedHash: file.hash
		});
		if (!state) throw new Error(`Interrupted Skill Workshop support target does not match recovery facts: ${file.path}`);
		supportStates.push(state);
		supportFiles.push({
			path: file.path,
			previousContent: previousSupportContent,
			proposedContentHash: file.hash
		});
	}
	const states = [mainState, ...supportStates];
	return {
		state: states.every((state) => state === "proposed") ? "proposed" : states.every((state) => state === "previous") ? "previous" : "partial",
		supportFiles
	};
}
function classifyRecoveryFileState(params) {
	if (params.currentContent === params.previousContent) return "previous";
	if (params.currentContent !== null && hashSkillProposalContent(params.currentContent) === params.proposedHash) return "proposed";
	return null;
}
//#endregion
//#region src/skills/workshop/store.ts
const MAX_PROPOSAL_BYTES = 1048576;
const MAX_PROPOSAL_SUPPORT_FILES_TOTAL_BYTES = 2097152;
function createSkillProposalId(name, now = /* @__PURE__ */ new Date()) {
	const normalized = normalizeSkillIndexName(name) || "skill";
	const date = now.toISOString().slice(0, 10).replaceAll("-", "");
	const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 10);
	return `${normalized.slice(0, 60)}-${date}-${suffix}`;
}
function assertSkillProposalContentSize(content) {
	if (Buffer.byteLength(content, "utf8") > MAX_PROPOSAL_BYTES) throw new Error("Skill proposal is too large.");
}
function prepareSkillProposalSupportFiles(input) {
	if (!input || input.length === 0) return [];
	if (input.length > 64) throw new Error(`A skill proposal can include at most 64 files.`);
	const seen = /* @__PURE__ */ new Set();
	let totalBytes = 0;
	const files = [];
	for (const file of input) {
		const filePath = normalizeWorkspaceSkillSupportPath(file.path);
		if (seen.has(filePath)) throw new Error(`Duplicate support file path: ${filePath}`);
		seen.add(filePath);
		const sizeBytes = Buffer.byteLength(file.content, "utf8");
		if (sizeBytes > 262144) throw new Error(`Support file is too large: ${filePath}`);
		if (file.content.includes("\0")) throw new Error(`Support files must be UTF-8 text: ${filePath}`);
		totalBytes += sizeBytes;
		if (totalBytes > MAX_PROPOSAL_SUPPORT_FILES_TOTAL_BYTES) throw new Error("Skill proposal support files exceed the total size limit.");
		files.push({
			path: filePath,
			sizeBytes,
			hash: hashSkillProposalContent(file.content),
			content: file.content
		});
	}
	assertWorkspaceSkillSupportPathSetIsFileOnly(files.map((file) => file.path));
	return files;
}
function resolveSkillProposalTarget(params) {
	const skillKey = normalizeSkillIndexName(params.skillName);
	if (!skillKey) throw new Error("Skill name must contain at least one letter or number.");
	const skillsRoot = resolveWorkshopSkillsDir(params.config, params.agentId, params.env);
	const skillDir = path.resolve(skillsRoot, skillKey);
	const skillFile = path.join(skillDir, "SKILL.md");
	assertInsideSkillsRoot(skillsRoot, skillDir, "skill directory");
	assertInsideSkillsRoot(skillsRoot, skillFile, "skill file");
	return {
		skillKey,
		skillDir,
		skillFile
	};
}
function isStoredProposalVisible(row, scope) {
	return row.owner_agent_id !== null && (!scope.agentId || row.owner_agent_id === scope.agentId);
}
var SkillProposalDraftMissingError = class extends Error {
	constructor(proposalId, options) {
		super(`Skill proposal draft is missing: ${proposalId}. Run openclaw doctor --fix for recovery.`, options);
		this.proposalId = proposalId;
	}
};
async function readSkillProposal(proposalId, sourceOptions, lookupScope, readRequest) {
	const options = captureSkillWorkshopStoreOptions(sourceOptions);
	const scope = { agentId: lookupScope.agentId };
	const readOptions = {
		config: readRequest.config,
		reconcile: readRequest.reconcile
	};
	let stored = await readStoredProposal(proposalId, options);
	if (!stored || !isStoredProposalVisible(stored.row, scope)) return null;
	const scopedOptions = {
		...options,
		config: readOptions.config,
		...scope.agentId ? { agentId: scope.agentId } : stored.row.owner_agent_id ? { agentId: stored.row.owner_agent_id } : {}
	};
	if (readOptions.reconcile === false || stored.record.status !== "pending") return await readSkillProposalBundle(stored.record, options);
	if (await reconcileInterruptedApply(proposalId, scopedOptions)) {
		stored = await readStoredProposal(proposalId, options);
		if (!stored || !isStoredProposalVisible(stored.row, scope)) return null;
	}
	return await withSkillProposalTargetLock(stored.record, async (store) => {
		const current = await readStoredProposal(proposalId, store);
		return current && isStoredProposalVisible(current.row, scope) ? await readSkillProposalBundle(current.record, store) : null;
	}, scopedOptions);
}
async function readSkillProposalRecord(proposalId, sourceOptions, lookupScope, readRequest) {
	const options = captureSkillWorkshopStoreOptions(sourceOptions);
	const scope = { agentId: lookupScope.agentId };
	const readOptions = {
		config: readRequest.config,
		reconcile: readRequest.reconcile
	};
	let stored = await readStoredProposal(proposalId, options);
	if (!stored || !isStoredProposalVisible(stored.row, scope)) return null;
	if (stored.record.status !== "pending") return stored.record;
	const scopedOptions = {
		...options,
		config: readOptions.config,
		...scope.agentId ? { agentId: scope.agentId } : stored.row.owner_agent_id ? { agentId: stored.row.owner_agent_id } : {}
	};
	if (readOptions.reconcile !== false) await reconcileInterruptedApply(proposalId, scopedOptions);
	stored = await readStoredProposal(proposalId, options);
	return stored && isStoredProposalVisible(stored.row, scope) ? stored.record : null;
}
async function writeSkillProposal(request) {
	assertProposalId(request.record.id);
	assertSkillProposalContentSize(request.content);
	const params = {
		assertCommitAllowed: request.assertCommitAllowed ? retainMutationAuthority(request.assertCommitAllowed) : void 0,
		...structuredClone({
			record: request.record,
			content: request.content,
			supportFiles: request.supportFiles,
			ownerAgentId: request.ownerAgentId,
			maxPending: request.maxPending,
			event: request.event
		}),
		store: captureSkillWorkshopStoreOptions(request.store ?? {})
	};
	await ensureSkillWorkshopStore(params.store);
	await stageSkillProposalGeneration(params);
	try {
		return await executeSkillWorkshopOperation("workshop.proposal.create", {
			record: params.record,
			ownerAgentId: params.ownerAgentId,
			maxPending: params.maxPending,
			event: params.event
		}, params.store, params.assertCommitAllowed);
	} catch (error) {
		const committed = await readCommittedSkillProposalTransition({
			record: params.record,
			event: params.event,
			store: params.store
		});
		if (committed) return committed.event;
		if ((await readStoredProposal(params.record.id, params.store))?.row.record_json === JSON.stringify(params.record)) throw new Error("Created Skill Workshop proposal is missing its committed event.", { cause: error });
		await discardSkillProposalGeneration(params.record, params.store).catch(() => void 0);
		throw error;
	}
}
async function replaceSkillProposalDraft(request) {
	assertProposalId(request.record.id);
	assertSkillProposalContentSize(request.content);
	const params = {
		assertCommitAllowed: request.assertCommitAllowed ? retainMutationAuthority(request.assertCommitAllowed) : void 0,
		...structuredClone({
			expected: request.expected,
			record: request.record,
			content: request.content,
			supportFiles: request.supportFiles,
			event: request.event
		}),
		store: captureSkillWorkshopStoreOptions(request.store ?? {})
	};
	await cleanupSkillProposalGenerations(params.expected, params.store).catch((error) => {
		logWarn(`skill-workshop: failed to clean unowned proposal generations: ${String(error)}`);
	});
	await stageSkillProposalGeneration(params);
	let commit;
	try {
		commit = await commitPendingSkillProposalTransition({
			expected: params.expected,
			record: params.record,
			event: params.event,
			store: params.store,
			assertCommitAllowed: params.assertCommitAllowed,
			operationLabel: "skill-workshop.revision.commit",
			invalidateRollback: true
		});
	} catch (error) {
		const committed = await readCommittedSkillProposalTransition({
			record: params.record,
			event: params.event,
			store: params.store
		});
		if (!committed) {
			if ((await readStoredProposal(params.record.id, params.store))?.row.record_json === JSON.stringify(params.record)) throw new Error("Revised Skill Workshop proposal is missing its committed event.", { cause: error });
			await discardSkillProposalGeneration(params.record, params.store).catch(() => void 0);
			throw error;
		}
		commit = committed;
	}
	if (commit.state === "conflict") {
		await discardSkillProposalGeneration(params.record, params.store).catch(() => void 0);
		throw new Error("Skill proposal changed before revision commit.");
	}
	await cleanupSkillProposalGenerations(params.record, params.store).catch((error) => {
		logWarn(`skill-workshop: failed to retire prior proposal generation: ${String(error)}`);
	});
	return commit.event;
}
async function updateSkillProposalRecord(params) {
	assertProposalId(params.record.id);
	return executeSkillWorkshopOperation("workshop.proposal.update", {
		record: params.record,
		ownerAgentId: params.ownerAgentId,
		invalidateRollback: params.invalidateRollback,
		event: params.event
	}, params.store);
}
async function readSkillProposalManifest(sourceOptions, lookupScope = {}) {
	const options = captureSkillWorkshopStoreOptions(sourceOptions);
	const scope = {
		agentId: lookupScope.agentId,
		status: lookupScope.status
	};
	const before = await executeSkillWorkshopOperation("workshop.proposals.list", {
		agentId: scope.agentId,
		status: "pending"
	}, options);
	await Promise.all(before.map(({ record, row }) => reconcileInterruptedApply(record.id, {
		...options,
		...scope.agentId ? { agentId: scope.agentId } : row.owner_agent_id ? { agentId: row.owner_agent_id } : {}
	})));
	const proposals = (await executeSkillWorkshopOperation("workshop.proposals.list", scope, options)).map(({ record }) => manifestEntryFromRecord(record));
	return {
		schema: SKILL_WORKSHOP_MANIFEST_SCHEMA,
		updatedAt: proposals[0]?.updatedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
		proposals
	};
}
async function reconcileInterruptedApply(proposalId, options) {
	const stored = await readStoredProposal(proposalId, options);
	if (!stored || stored.record.status !== "pending" || !options.agentId) return false;
	if (!await readSkillProposalRollback(proposalId, options)) return false;
	let draftContent;
	try {
		draftContent = await readSkillProposalDraft(stored.record, options);
	} catch {
		return false;
	}
	return await reconcileInterruptedSkillProposalApply({
		record: stored.record,
		expectedRecordJson: stored.row.record_json,
		draftContent,
		skillsRoot: resolveWorkshopSkillsDir(options.config, options.agentId, options.env),
		store: options
	});
}
async function readProposalSupportFiles(record, stateRoot) {
	const out = [];
	for (const file of record.supportFiles ?? []) {
		const filePath = normalizeWorkspaceSkillSupportPath(file.path);
		const content = (await stateRoot.read(proposalBundleRelativePath(record, filePath), {
			hardlinks: "reject",
			maxBytes: MAX_WORKSPACE_SKILL_SUPPORT_FILE_BYTES,
			symlinks: "reject"
		})).buffer.toString("utf8");
		const sizeBytes = Buffer.byteLength(content, "utf8");
		const hash = hashSkillProposalContent(content);
		if (file.sizeBytes !== sizeBytes || file.hash !== hash) throw new Error(`Proposal support file changed without updating metadata: ${filePath}`);
		out.push({
			path: filePath,
			sizeBytes,
			hash,
			content
		});
	}
	assertWorkspaceSkillSupportPathSetIsFileOnly(out.map((file) => file.path));
	return out;
}
async function readSkillProposalDraft(record, options) {
	const stateRoot = await root(resolveSkillWorkshopStateDir(options));
	try {
		return (await stateRoot.read(proposalBundleRelativePath(record, PROPOSAL_DRAFT_FILE), {
			hardlinks: "reject",
			maxBytes: MAX_PROPOSAL_BYTES,
			symlinks: "reject"
		})).buffer.toString("utf8");
	} catch (error) {
		if (error instanceof FsSafeError && error.code === "not-found") throw new SkillProposalDraftMissingError(record.id, { cause: error });
		throw error;
	}
}
async function readSkillProposalBundle(record, options) {
	const content = await readSkillProposalDraft(record, options);
	const supportFiles = await readProposalSupportFiles(record, await root(resolveSkillWorkshopStateDir(options)));
	return {
		record,
		revisionHash: hashSkillProposalRevision(record),
		content,
		...supportFiles.length > 0 ? { supportFiles } : {}
	};
}
async function importLegacySkillProposal(params) {
	assertProposalId(params.record.id);
	return executeSkillWorkshopOperation("workshop.proposal.import", {
		record: params.record,
		rollback: params.rollback,
		ownerAgentId: params.ownerAgentId
	}, params.store);
}
function manifestEntryFromRecord(record) {
	return {
		id: record.id,
		kind: record.kind,
		status: record.status,
		title: record.title,
		description: record.description,
		skillName: record.target.skillName,
		skillKey: record.target.skillKey,
		createdAt: record.createdAt,
		updatedAt: record.updatedAt,
		scanState: record.scan.state,
		revisionHash: hashSkillProposalRevision(record)
	};
}
//#endregion
export { readProposalFrontmatter as A, buildSkillProposalEvaluationBundles as C, hasSkillProposalEvaluators as D, dispatchSkillProposalChanged as E, resolveDraftedSkillDescription as M, resolveSkillProposalName as N, normalizeSkillProposalCorrelationId as O, stripProposalFrontmatterForSkill as P, writeSkillProposalRollback as S, createSkillProposalEvent as T, withSkillProposalTargetLock as _, readSkillProposal as a, clearSkillProposalRollback as b, readSkillProposalManifest as c, resolveSkillProposalTarget as d, updateSkillProposalRecord as f, withSkillProposalCommitLock as g, withSkillCollectionLock as h, prepareSkillProposalSupportFiles as i, renderProposalMarkdown as j, runSkillProposalEvaluators as k, readSkillProposalRecord as l, reconcileInterruptedSkillProposalApply as m, createSkillProposalId as n, readSkillProposalBundle as o, writeSkillProposal as p, importLegacySkillProposal as r, readSkillProposalDraft as s, SkillProposalDraftMissingError as t, replaceSkillProposalDraft as u, commitPendingSkillProposalTransition as v, readSkillProposalTargetTreeSha256 as w, readSkillProposalRollback as x, readCommittedSkillProposalTransition as y };
