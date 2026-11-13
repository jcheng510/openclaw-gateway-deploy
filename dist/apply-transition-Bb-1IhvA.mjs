import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { A as readProposalFrontmatter, E as dispatchSkillProposalChanged, P as stripProposalFrontmatterForSkill, S as writeSkillProposalRollback, T as createSkillProposalEvent, _ as withSkillProposalTargetLock, b as clearSkillProposalRollback, g as withSkillProposalCommitLock, v as commitPendingSkillProposalTransition, w as readSkillProposalTargetTreeSha256, y as readCommittedSkillProposalTransition } from "./store-6HwYjj1p.mjs";
import { a as isWorkspaceSkillMutationApplied, c as prepareWorkspaceSkillMutation, f as restoreWorkspaceSkillMutation, n as applyWorkspaceSkillMutation, o as isWorkspaceSkillMutationRestored, r as assertInsideSkillsRoot, u as readWorkspaceSkillFile } from "./workspace-skill-write-BcZVBI5U.mjs";
import { i as snapshotCommittedSkillArtifactBestEffort, n as hasCommittedSkillChangeHooks, t as dispatchCommittedSkillChangeBestEffort } from "./skill-change-hook-CWLu5Vob.mjs";
import { t as bumpSkillsSnapshotVersion } from "./refresh-state-Cazo5oir.mjs";
import { n as hashSkillProposalRevision, t as hashSkillProposalContent } from "./proposal-hash-DFkV3A6F.mjs";
import { n as scanProposalBundle } from "./proposal-scan-DkW27zEw.mjs";
import { t as resolveWorkshopSkillsDir } from "./skills-root-CYPE5f0c.mjs";
import { f as SKILL_WORKSHOP_ROLLBACK_SCHEMA } from "./store-record-Dxu22ebc.mjs";
import { i as readStoredProposal, t as captureSkillWorkshopStoreOptions } from "./store-client-pSi5T8mh.mjs";
//#region src/skills/workshop/apply-transition.ts
var SkillProposalLifecycleError = class extends Error {
	constructor(message, record, event) {
		super(message);
		this.record = record;
		this.event = event;
	}
};
async function applySkillProposalTransition(request, dependencies) {
	const store = captureSkillWorkshopStoreOptions(storeOptions(request.env, request.agentId, request.config));
	const input = {
		...request,
		env: store.env,
		eventActor: structuredClone(request.eventActor)
	};
	const recoveryReadOptions = {
		config: input.config,
		store
	};
	const lockedReadOptions = {
		config: input.config,
		reconcile: false
	};
	const initial = await dependencies.readRequiredProposal(input.proposalId, input.env, input.agentId, recoveryReadOptions);
	if (initial.record.status !== "pending") throw new Error(`Only pending proposals can be applied. Current status: ${initial.record.status}.`);
	dependencies.assertExpectedRevisionHash(initial.revisionHash, input.expectedRevisionHash);
	let evaluated;
	try {
		evaluated = await dependencies.evaluateSkillProposal({
			workspaceDir: input.workspaceDir,
			...input.agentId ? { agentId: input.agentId } : {},
			config: input.config,
			...input.eventActor ? { eventActor: input.eventActor } : {},
			...input.env ? { env: input.env } : {},
			proposalId: input.proposalId,
			expectedRevisionHash: initial.revisionHash,
			...input.correlationId ? { correlationId: input.correlationId } : {},
			trigger: "apply"
		}, store);
	} catch (error) {
		if (dependencies.isCreateTargetConflict(error)) await withSkillProposalLifecycleDispatch(input, withSkillProposalTargetLock(initial.record, async (lockedStore) => {
			const current = await dependencies.readRequiredProposal(input.proposalId, input.env, input.agentId, {
				...lockedReadOptions,
				store: lockedStore
			});
			if (current.record.status === "pending" && current.record.kind === "create" && await readWorkspaceSkillFile(current.record.target.skillFile) !== null) await markSkillProposalStale({
				store: lockedStore,
				record: current.record,
				reason: "Target skill was created after proposal creation.",
				message: "Target skill was created after proposal creation; proposal marked stale.",
				input
			});
			throw error;
		}, store));
		throw error;
	}
	const blocking = evaluated.evaluation.outcomes.find((outcome) => outcome.status === "completed" && outcome.result.decision === "block");
	if (blocking?.status === "completed") throw new Error(blocking.result.decisionReason || `Skill proposal apply blocked by evaluator ${blocking.evaluatorId}.`);
	const result = await withSkillProposalLifecycleDispatch(input, withSkillProposalCommitLock(evaluated.record, async (lockedStore) => {
		const read = await dependencies.readRequiredProposal(input.proposalId, input.env, input.agentId, {
			...lockedReadOptions,
			store: lockedStore
		});
		const { record, content } = read;
		if (record.status !== "pending") throw new Error(`Only pending proposals can be applied. Current status: ${record.status}.`);
		dependencies.assertExpectedRevisionHash(read.revisionHash, evaluated.evaluation.revisionHash);
		if (hashSkillProposalContent(content) !== record.draftHash) throw new Error("Proposal draft changed without updating proposal metadata.");
		const supportFiles = read.supportFiles ?? [];
		if (!readProposalFrontmatter(content)) throw new Error("Proposal draft must include proposal frontmatter.");
		const scan = scanProposalBundle(content, supportFiles);
		if (scan.state !== "clean") await quarantineSkillProposalAfterScan({
			input,
			record,
			scan,
			store: lockedStore
		});
		if (!input.agentId) throw new Error("Skill Workshop requires the active agent id.");
		const skillsRoot = resolveWorkshopSkillsDir(input.config, input.agentId, input.env);
		assertInsideSkillsRoot(skillsRoot, record.target.skillFile, "skill file");
		assertInsideSkillsRoot(skillsRoot, record.target.skillDir, "skill directory");
		if (record.evaluation?.id !== evaluated.evaluation.id) throw new Error("Skill proposal evaluation changed before apply; retry the operation.");
		if (evaluated.evaluation.targetTreeSha256) {
			let currentTargetTreeSha256;
			try {
				currentTargetTreeSha256 = await readSkillProposalTargetTreeSha256(record.target.skillDir);
			} catch {
				throw new Error("Skill target changed after evaluation; retry the operation.");
			}
			if (currentTargetTreeSha256 !== evaluated.evaluation.targetTreeSha256) throw new Error("Skill target changed after evaluation; retry the operation.");
		}
		const mutation = await prepareWorkspaceSkillMutation({
			skillsRoot,
			skillDir: record.target.skillDir,
			skillFile: record.target.skillFile,
			content: stripProposalFrontmatterForSkill(content),
			supportFiles,
			mode: record.kind
		});
		await assertApplyTargetUnchanged(record, mutation, input, lockedStore);
		const shouldDispatchSkillChange = hasCommittedSkillChangeHooks();
		const beforeSkill = shouldDispatchSkillChange && record.kind === "update" ? await snapshotCommittedSkillArtifactBestEffort({
			skillDir: record.target.skillDir,
			skillKey: record.target.skillKey,
			source: "workshop"
		}) : void 0;
		const rollback = createSkillProposalRollbackFromMutation(record, mutation);
		await writeSkillProposalRollback({
			proposalId: record.id,
			rollback,
			store: lockedStore
		});
		try {
			await applyWorkspaceSkillMutation(mutation);
		} catch (error) {
			if (await isWorkspaceSkillMutationRestored(mutation).catch(() => false)) await clearSkillProposalRollback({
				proposalId: record.id,
				expectedRecordJson: JSON.stringify(record),
				store: lockedStore
			}).catch(() => false);
			throw error;
		}
		const afterSkill = shouldDispatchSkillChange ? await snapshotCommittedSkillArtifactBestEffort({
			skillDir: record.target.skillDir,
			skillKey: record.target.skillKey,
			source: "workshop",
			sourceVersion: record.proposedVersion
		}) : void 0;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const applied = {
			...record,
			status: "applied",
			updatedAt: now,
			appliedAt: now,
			statusReason: normalizeOptionalString(input.reason),
			scan
		};
		const eventInput = createSkillProposalEvent({
			record: applied,
			type: "applied",
			actor: input.eventActor,
			...input.correlationId ? { correlationId: input.correlationId } : {},
			occurredAt: now,
			payload: { targetSkillFile: record.target.skillFile }
		});
		let commit;
		try {
			commit = await commitPendingSkillProposalTransition({
				expected: record,
				record: applied,
				event: eventInput,
				store: lockedStore,
				operationLabel: "skill-workshop.apply.commit"
			});
			if (commit.state === "conflict") throw new Error("Skill proposal changed before apply status commit.");
		} catch (error) {
			const recoveredEvent = await recoverAfterApplyCommitFailure({
				error,
				store: lockedStore,
				expected: record,
				applied,
				event: eventInput,
				mutation
			});
			if (!recoveredEvent) throw error;
			commit = {
				state: "committed",
				event: recoveredEvent
			};
		}
		bumpSkillsSnapshotVersion({
			reason: "workshop",
			changedPath: record.target.skillFile
		});
		return {
			result: {
				record: applied,
				targetSkillFile: record.target.skillFile
			},
			event: commit.event,
			skillChange: shouldDispatchSkillChange ? {
				before: beforeSkill,
				after: afterSkill
			} : void 0
		};
	}, store));
	await dispatchSkillProposalChanged({
		event: result.event,
		record: result.result.record,
		workspaceDir: input.workspaceDir,
		...input.agentId ? { agentId: input.agentId } : {}
	});
	if (result.skillChange) await dispatchCommittedSkillChangeBestEffort({
		action: result.result.record.kind === "create" ? "created" : "updated",
		source: "workshop",
		workspaceDir: input.workspaceDir,
		before: result.skillChange.before,
		after: result.skillChange.after,
		proposal: {
			id: result.result.record.id,
			revision: result.result.record.proposedVersion,
			revisionSha256: hashSkillProposalRevision(result.result.record)
		}
	});
	return result.result;
}
async function withSkillProposalLifecycleDispatch(input, operation) {
	try {
		return await operation;
	} catch (error) {
		if (error instanceof SkillProposalLifecycleError) await dispatchSkillProposalChanged({
			event: error.event,
			record: error.record,
			workspaceDir: input.workspaceDir,
			...input.agentId ? { agentId: input.agentId } : {}
		});
		throw error;
	}
}
async function assertSkillProposalSupportTargetUnchanged(params) {
	const { record, file, currentContent } = params;
	if (file.targetExisted === false ? currentContent !== null : file.targetExisted === true && (currentContent === null ? void 0 : hashSkillProposalContent(currentContent)) !== file.targetContentHash) await markSkillProposalStale({
		store: params.store,
		record,
		reason: `Target support file changed after proposal creation: ${file.path}`,
		message: "Target support file changed after proposal creation; proposal marked stale.",
		input: params.input
	});
}
async function transitionPendingSkillProposalToStale(params) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const stale = {
		...params.record,
		status: "stale",
		updatedAt: now,
		staleAt: now,
		statusReason: params.reason
	};
	const commit = await commitPendingSkillProposalTransition({
		expected: params.record,
		record: stale,
		event: createSkillProposalEvent({
			record: stale,
			type: "stale",
			actor: params.input.eventActor,
			...params.input.correlationId ? { correlationId: params.input.correlationId } : {},
			occurredAt: now
		}),
		store: params.store ?? storeOptions(params.input.env, params.input.agentId, params.input.config),
		operationLabel: "skill-workshop.stale.commit"
	});
	if (commit.state !== "committed") throw new Error("Failed to record stale Skill Workshop proposal.");
	return {
		record: stale,
		event: commit.event
	};
}
async function markSkillProposalStale(params) {
	const transition = await transitionPendingSkillProposalToStale(params);
	throw new SkillProposalLifecycleError(params.message, transition.record, transition.event);
}
async function quarantineSkillProposalAfterScan(params) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const updated = {
		...params.record,
		status: "quarantined",
		updatedAt: now,
		quarantinedAt: now,
		scan: {
			...params.scan,
			state: "quarantined"
		},
		statusReason: "Proposal scan failed."
	};
	const commit = await commitPendingSkillProposalTransition({
		expected: params.record,
		record: updated,
		event: createSkillProposalEvent({
			record: updated,
			type: "quarantined",
			actor: params.input.eventActor,
			...params.input.correlationId ? { correlationId: params.input.correlationId } : {},
			occurredAt: now
		}),
		store: params.store ?? storeOptions(params.input.env, params.input.agentId, params.input.config),
		operationLabel: "skill-workshop.quarantine.commit"
	});
	if (commit.state !== "committed") throw new Error("Failed to record quarantined Skill Workshop proposal.");
	throw new SkillProposalLifecycleError("Proposal scan failed; proposal was quarantined.", updated, commit.event);
}
async function assertApplyTargetUnchanged(record, mutation, input, store) {
	if (record.kind === "update" && record.target.currentContentHash && mutation.skillFile.previousContent !== null && hashSkillProposalContent(mutation.skillFile.previousContent) !== record.target.currentContentHash) await markSkillProposalStale({
		store,
		record,
		reason: "Target skill changed after proposal creation.",
		message: "Target skill changed after proposal creation; proposal marked stale.",
		input
	});
	for (const file of mutation.supportFiles) {
		const supportRecord = record.supportFiles?.find((entry) => entry.path === file.path);
		if (record.kind === "update" && supportRecord) await assertSkillProposalSupportTargetUnchanged({
			store,
			record,
			file: supportRecord,
			currentContent: file.previousContent,
			input
		});
	}
}
function createSkillProposalRollbackFromMutation(record, mutation) {
	return {
		schema: SKILL_WORKSHOP_ROLLBACK_SCHEMA,
		proposalId: record.id,
		writtenAt: (/* @__PURE__ */ new Date()).toISOString(),
		targetSkillFile: record.target.skillFile,
		action: record.kind,
		...mutation.skillFile.previousContent !== null ? {
			previousContent: mutation.skillFile.previousContent,
			previousContentHash: hashSkillProposalContent(mutation.skillFile.previousContent)
		} : {},
		...mutation.supportFiles.length > 0 ? { supportFiles: mutation.supportFiles.map((file) => file.previousContent === null ? {
			path: file.path,
			existed: false
		} : {
			path: file.path,
			existed: true,
			previousContent: file.previousContent,
			previousContentHash: hashSkillProposalContent(file.previousContent)
		}) } : {}
	};
}
async function recoverAfterApplyCommitFailure(params) {
	const committed = await readCommittedSkillProposalTransition({
		record: params.applied,
		event: params.event,
		store: params.store
	});
	if (committed) return committed.event;
	if ((await readStoredProposal(params.expected.id, params.store))?.record.status === "applied") throw new Error("Applied Skill Workshop transition is missing its committed event.", { cause: params.error });
	if (!await isWorkspaceSkillMutationApplied(params.mutation).catch(() => false)) return null;
	try {
		try {
			await restoreWorkspaceSkillMutation(params.mutation);
		} finally {
			bumpSkillsSnapshotVersion({
				reason: "workshop",
				changedPath: params.expected.target.skillFile
			});
		}
	} catch (restoreError) {
		const failure = new Error("Skill proposal apply failed after filesystem mutation and requires reconciliation.", { cause: params.error });
		Object.assign(failure, { restoreError });
		throw failure;
	}
	await clearSkillProposalRollback({
		proposalId: params.expected.id,
		expectedRecordJson: JSON.stringify(params.expected),
		store: params.store
	}).catch(() => false);
	return null;
}
function storeOptions(env, agentId, config) {
	return {
		...env ? { env } : {},
		...agentId ? { agentId } : {},
		config
	};
}
//#endregion
export { withSkillProposalLifecycleDispatch as a, transitionPendingSkillProposalToStale as i, assertSkillProposalSupportTargetUnchanged as n, markSkillProposalStale as r, applySkillProposalTransition as t };
