import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import "./src-SskUVPJG.mjs";
import { t as expectDefined } from "./expect-lbe3Hgrh.mjs";
import { r as isPathInside } from "./path-guards-CH7noY0Z.mjs";
import { E as dispatchSkillProposalChanged, N as resolveSkillProposalName, a as readSkillProposal, c as readSkillProposalManifest, g as withSkillProposalCommitLock, l as readSkillProposalRecord, s as readSkillProposalDraft, t as SkillProposalDraftMissingError, x as readSkillProposalRollback } from "./store-6HwYjj1p.mjs";
import { r as assertInsideSkillsRoot, u as readWorkspaceSkillFile } from "./workspace-skill-write-BcZVBI5U.mjs";
import { t as resolveWorkshopSkillsDir } from "./skills-root-CYPE5f0c.mjs";
import { t as captureSkillWorkshopStoreOptions } from "./store-client-pSi5T8mh.mjs";
import { i as transitionPendingSkillProposalToStale } from "./apply-transition-Bb-1IhvA.mjs";
import { a as normalizeSkillIndexName } from "./skill-index-ZDYIG8ML.mjs";
//#region src/skills/workshop/service-query.ts
async function listSkillProposals(options) {
	const store = captureSkillWorkshopStoreOptions(options);
	const manifest = await readSkillProposalManifest(store, {
		agentId: store.agentId,
		status: "pending"
	});
	const missingDrafts = /* @__PURE__ */ new Set();
	for (const proposal of manifest.proposals) {
		if (proposal.status !== "pending") continue;
		try {
			const record = await readSkillProposalRecord(proposal.id, store, store, { config: store.config });
			if (record) await reconcilePendingSkillProposal(record, store);
		} catch (error) {
			if (!(error instanceof SkillProposalDraftMissingError)) throw error;
			missingDrafts.add(error.proposalId);
		}
	}
	const reconciled = await readSkillProposalManifest(store, { agentId: store.agentId });
	for (const proposal of reconciled.proposals) if (missingDrafts.has(proposal.id)) proposal.degradedState = "draft-missing";
	return reconciled;
}
async function inspectSkillProposal(proposalId, options) {
	const store = captureSkillWorkshopStoreOptions(options);
	const record = await readSkillProposalRecord(proposalId, store, store, { config: store.config });
	if (!record) return null;
	await reconcilePendingSkillProposal(record, store);
	return await readSkillProposal(proposalId, store, store, { config: store.config });
}
async function resolvePendingSkillProposal(input) {
	const store = captureSkillWorkshopStoreOptions(input);
	let proposalId = normalizeOptionalString(input.proposalId);
	if (!proposalId) {
		const name = normalizeOptionalString(input.name);
		if (!name) throw new Error("proposal_id or name required.");
		const matches = (await listSkillProposals(store)).proposals.filter((proposal) => proposal.status === "pending" && proposalMatchesName(proposal, name));
		if (matches.length === 0) throw new Error(`No pending skill proposal matched: ${name}`);
		if (matches.length > 1) {
			const candidates = matches.slice(0, 8).map((proposal) => `${proposal.id} (${resolveSkillProposalName(proposal.kind, proposal)})`).join(", ");
			throw new Error(`Multiple pending skill proposals matched ${name}: ${candidates}`);
		}
		proposalId = expectDefined(matches[0], "matches capture group 0").id;
	}
	const matched = await inspectSkillProposal(proposalId, store);
	if (!matched) throw new Error(`Skill proposal not found: ${proposalId}`);
	if (matched.record.status !== "pending") throw new Error(`Only pending proposals can be revised. Current status: ${matched.record.status}.`);
	return matched;
}
async function readRequiredProposal(proposalId, env, agentId, readOptions) {
	const read = await readSkillProposal(proposalId, {
		...readOptions.store,
		env: readOptions.store?.env ?? env,
		agentId,
		config: readOptions.config
	}, { agentId }, readOptions);
	if (!read) throw new Error(`Skill proposal not found: ${proposalId}`);
	return read;
}
async function reconcilePendingSkillProposal(record, options) {
	if (record.status !== "pending") return;
	const workshopDir = resolveWorkshopSkillsDir(options.config, options.agentId, options.env);
	const transition = await withSkillProposalCommitLock(record, async (store) => {
		const current = await readSkillProposalRecord(record.id, {
			...store,
			config: options.config
		}, options, {
			config: options.config,
			reconcile: false
		});
		if (!current || current.status !== "pending") return;
		await readSkillProposalDraft(current, store);
		if (current.kind !== "create" || !isPathInside(workshopDir, current.target.skillFile) || await readSkillProposalRollback(current.id, store)) return;
		assertInsideSkillsRoot(workshopDir, current.target.skillFile, "skill file");
		if (await readWorkspaceSkillFile(current.target.skillFile) === null) return;
		return transitionPendingSkillProposalToStale({
			record: current,
			store,
			reason: "Target skill was created after proposal creation.",
			input: {
				agentId: options.agentId,
				config: options.config,
				eventActor: { type: "system" },
				...options.env ? { env: options.env } : {}
			}
		});
	}, options);
	if (transition) await dispatchSkillProposalChanged({
		event: transition.event,
		record: transition.record,
		workspaceDir: workshopDir,
		agentId: options.agentId
	});
}
function proposalMatchesName(proposal, name) {
	const normalizedName = normalizeSkillIndexName(name);
	return [
		proposal.id,
		proposal.skillName,
		proposal.skillKey,
		proposal.title,
		proposal.description
	].some((candidate) => {
		if (!candidate) return false;
		if (candidate === name || candidate.toLowerCase() === name.toLowerCase()) return true;
		const normalizedCandidate = normalizeSkillIndexName(candidate);
		return Boolean(normalizedName && normalizedCandidate && (normalizedCandidate === normalizedName || normalizedCandidate.includes(normalizedName) || normalizedName.includes(normalizedCandidate)));
	});
}
//#endregion
export { resolvePendingSkillProposal as i, listSkillProposals as n, readRequiredProposal as r, inspectSkillProposal as t };
