import "./src-SskUVPJG.mjs";
import { t as stableStringify } from "./stable-stringify-CkQ0IEj1.mjs";
import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import { i as matchesSkillFilter } from "./agent-filter-Com2ua2W.mjs";
import { t as normalizeWorkspaceSkillRoots } from "./workspace-skill-roots-CFHkU9qW.mjs";
import { d as shouldRefreshSnapshotForVersion, i as getSkillsSourceVersion, r as getSkillsSnapshotVersion } from "./refresh-state-Cazo5oir.mjs";
import { c as fingerprintSkillSnapshotConfig } from "./workspace-skill-loader-D-k9b5PP.mjs";
import { n as prepareRemoteSkillConnections } from "./remote-skills-Co_eXsF5.mjs";
import { t as buildSkillSnapshot } from "./workspace-skill-prompt-DVPD6XZz.mjs";
import { n as ensureSkillsWatcher } from "./refresh-BVJA_wY3.mjs";
//#region src/skills/runtime/session-snapshot.ts
const skillSnapshotCache = /* @__PURE__ */ new Map();
const pendingSkillSnapshots = /* @__PURE__ */ new Map();
const SKILL_SNAPSHOT_CACHE_MAX = 10;
async function resolveReusableWorkspaceSkillSnapshot(params) {
	params.assertCurrent?.();
	const normalizedRoots = normalizeWorkspaceSkillRoots({
		agentWorkspaceDir: params.workspaceDir,
		executionWorkspaceDir: params.executionWorkspaceDir
	});
	const skillRoots = normalizedRoots.executionWorkspaceDir ? {
		agentWorkspaceDir: normalizedRoots.agentWorkspaceDir,
		executionWorkspaceDir: normalizedRoots.executionWorkspaceDir
	} : void 0;
	const watcherWorkspaceDir = skillRoots?.agentWorkspaceDir ?? params.workspaceDir;
	const versionBeforePreparation = getSkillsSnapshotVersion(watcherWorkspaceDir);
	await prepareRemoteSkillConnections();
	params.assertCurrent?.();
	const requestedSnapshotVersion = getSkillsSnapshotVersion(watcherWorkspaceDir) === versionBeforePreparation ? params.snapshotVersion : void 0;
	const eligibility = params.resolveEligibility?.() ?? params.eligibility;
	if (params.watch !== false) ensureSkillsWatcher({
		workspaceDir: watcherWorkspaceDir,
		...skillRoots ? { executionWorkspaceDir: skillRoots.executionWorkspaceDir } : {},
		config: params.config,
		agentId: params.agentId,
		...params.pluginMetadataSnapshot ? { pluginMetadataSnapshot: params.pluginMetadataSnapshot } : {}
	});
	const snapshotVersion = requestedSnapshotVersion ?? getSkillsSnapshotVersion(watcherWorkspaceDir);
	const promptFormatChanged = params.existingSnapshot?.promptFormatVersion !== 6;
	const skillVersionChanged = shouldRefreshSnapshotForVersion(params.existingSnapshot?.version, snapshotVersion);
	const nodeSkillsEligibilityChanged = stableStringify(params.existingSnapshot?.nodeSkillsEligibility) !== stableStringify(eligibility?.nodeSkills);
	const skillOverridesChanged = stableStringify(params.existingSnapshot?.skillOverrides) !== stableStringify(params.skillOverrides);
	const skillRootsChanged = stableStringify(params.existingSnapshot?.skillRoots) !== stableStringify(skillRoots);
	const librarySelections = params.librarySelections ?? params.existingSnapshot?.librarySelections;
	const shouldRefresh = stableStringify(librarySelections) !== stableStringify(params.existingSnapshot?.librarySelections) || promptFormatChanged || skillVersionChanged || nodeSkillsEligibilityChanged || skillRootsChanged || !matchesSkillFilter(params.existingSnapshot?.skillFilter, params.skillFilter) || skillOverridesChanged;
	if (params.existingSnapshot && !shouldRefresh && (params.hydrateExisting === false || params.existingSnapshot.resolvedSkills !== void 0)) return {
		snapshot: params.existingSnapshot,
		shouldRefresh,
		snapshotVersion
	};
	const sourceScope = {
		executionWorkspaceDir: normalizedRoots.executionWorkspaceDir,
		agentId: params.agentId
	};
	const sourceVersion = getSkillsSourceVersion(watcherWorkspaceDir, sourceScope);
	const effectiveVersion = getSkillsSnapshotVersion(watcherWorkspaceDir);
	const eligibilityKey = stableStringify(eligibility);
	const projectionIsCurrent = () => getSkillsSourceVersion(watcherWorkspaceDir, sourceScope) === sourceVersion && getSkillsSnapshotVersion(watcherWorkspaceDir) === effectiveVersion && stableStringify(params.resolveEligibility?.() ?? params.eligibility) === eligibilityKey;
	const buildSnapshot = async (assertCurrent) => {
		return {
			...await buildSkillSnapshot(normalizedRoots.agentWorkspaceDir, {
				executionWorkspaceDir: normalizedRoots.executionWorkspaceDir,
				librarySelections,
				config: params.config,
				preserveEntryOrder: Boolean(skillRoots),
				agentId: params.agentId,
				skillFilter: params.skillFilter,
				skillOverrides: params.skillOverrides,
				eligibility,
				assertCurrent,
				pluginMetadataSnapshot: params.pluginMetadataSnapshot,
				snapshotVersion
			}),
			...skillRoots ? { skillRoots } : {},
			...librarySelections ? { librarySelections } : {}
		};
	};
	const cachedRebuild = async () => {
		const snapshotCacheKey = JSON.stringify([
			params.workspaceDir,
			librarySelections,
			skillRoots,
			snapshotVersion,
			params.skillFilter,
			params.skillOverrides,
			params.agentId,
			eligibility,
			fingerprintSkillSnapshotConfig(params.config)
		]);
		const cachedSnapshot = skillSnapshotCache.get(snapshotCacheKey);
		if (cachedSnapshot) return cachedSnapshot;
		const assertCurrent = () => params.assertCurrent?.();
		let pending = pendingSkillSnapshots.get(snapshotCacheKey);
		if (!pending) {
			const waiters = /* @__PURE__ */ new Set([assertCurrent]);
			const assertLiveWaiter = () => {
				let failure;
				for (const waiter of waiters) try {
					waiter();
				} catch (error) {
					waiters.delete(waiter);
					failure = error;
				}
				if (waiters.size === 0) throw failure;
			};
			pending = {
				promise: buildSnapshot(assertLiveWaiter).then((snapshot) => {
					assertLiveWaiter();
					if (!projectionIsCurrent()) return;
					skillSnapshotCache.set(snapshotCacheKey, snapshot);
					pruneMapToMaxSize(skillSnapshotCache, SKILL_SNAPSHOT_CACHE_MAX);
					return snapshot;
				}),
				waiters
			};
			pendingSkillSnapshots.set(snapshotCacheKey, pending);
		} else if (pending.waiters.size > 0) pending.waiters.add(assertCurrent);
		try {
			const snapshot = await pending.promise;
			assertCurrent();
			return snapshot;
		} catch (error) {
			assertCurrent();
			if (pending.waiters.size === 0) return;
			throw error;
		} finally {
			pending.waiters.delete(assertCurrent);
			if (pendingSkillSnapshots.get(snapshotCacheKey) === pending) pendingSkillSnapshots.delete(snapshotCacheKey);
		}
	};
	const snapshot = !params.existingSnapshot || shouldRefresh ? await cachedRebuild() : await cachedRebuild().then((rebuilt) => rebuilt && {
		...params.existingSnapshot,
		resolvedSkills: rebuilt.resolvedSkills
	});
	if (!snapshot || !projectionIsCurrent()) {
		const currentVersion = getSkillsSnapshotVersion(watcherWorkspaceDir);
		return resolveReusableWorkspaceSkillSnapshot({
			...params,
			watch: false,
			snapshotVersion: currentVersion
		});
	}
	params.assertCurrent?.();
	return {
		snapshot,
		shouldRefresh,
		snapshotVersion
	};
}
//#endregion
export { resolveReusableWorkspaceSkillSnapshot as t };
