import { t as isFastTestRuntimeEnv } from "./test-runtime-env-mVzBKwSd.mjs";
import "./env-SuLFUnAK.mjs";
import { _ as projectCompactionAccountingPatch } from "./session-accessor.sqlite-transcript-write-CZkj18r-.mjs";
import { s as loadSessionEntry, u as patchSessionEntryCore } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { c as updateSessionEntry } from "./session-accessor.reset-xoze7eVv.mjs";
import { i as resolveNodeExecEligibility } from "./exec-defaults-DGSh4Lk5.mjs";
import { t as getRemoteSkillEligibility } from "./remote-CgP2ocY0.mjs";
import { t as resolveReusableWorkspaceSkillSnapshot } from "./session-snapshot-WufXqxBz.mjs";
import crypto from "node:crypto";
//#region src/auto-reply/reply/session-updates.ts
/** Session update helpers for skill snapshots and completed compaction accounting. */
function publishSessionEntry(params, entry) {
	if (entry) {
		if (params.sessionEntryHandle) params.sessionEntryHandle.replaceCurrent(entry);
		else if (params.sessionStore && params.sessionKey) params.sessionStore[params.sessionKey] = entry;
	} else {
		params.sessionEntryHandle?.clearCurrent();
		if (params.sessionStore && params.sessionKey) delete params.sessionStore[params.sessionKey];
	}
}
async function persistSkillSnapshot(params) {
	const updates = {
		sessionId: params.sessionId ?? params.currentEntry.sessionId ?? crypto.randomUUID(),
		updatedAt: Date.now(),
		...params.isFirstTurnInSession ? { systemSent: true } : {},
		skillsSnapshot: params.skillsSnapshot
	};
	if (!params.sessionEntryHandle && (!params.sessionStore || !params.sessionKey)) return {
		entry: void 0,
		updated: false
	};
	if (!params.storePath || !params.sessionKey) {
		const current = params.sessionEntryHandle ? params.sessionKey ? params.sessionEntryHandle.get(params.sessionKey) : params.sessionEntryHandle.getCurrent() : params.sessionKey ? params.sessionStore?.[params.sessionKey] : void 0;
		if (current?.sessionId !== params.expectedSession?.sessionId || current?.lifecycleRevision !== params.expectedSession?.lifecycleRevision) return {
			entry: current,
			updated: false
		};
		const nextEntry = {
			...current ?? params.currentEntry,
			...updates
		};
		publishSessionEntry(params, nextEntry);
		return {
			entry: nextEntry,
			updated: true
		};
	}
	let updated = false;
	const persistedEntry = await updateSessionEntry({
		storePath: params.storePath,
		sessionKey: params.sessionKey
	}, (entry) => {
		updated = entry.sessionId === params.expectedSession?.sessionId && entry.lifecycleRevision === params.expectedSession?.lifecycleRevision;
		return updated ? updates : null;
	});
	publishSessionEntry(params, persistedEntry ?? void 0);
	if (persistedEntry) return {
		entry: persistedEntry,
		updated
	};
	return {
		entry: void 0,
		updated: false
	};
}
/** Ensures a session entry has the reusable skill snapshot needed for reply runs. */
async function ensureSkillSnapshot(params) {
	if (isFastTestRuntimeEnv()) return {
		sessionEntry: params.sessionEntry,
		skillsSnapshot: params.sessionEntry?.skillsSnapshot,
		systemSent: params.sessionEntry?.systemSent ?? false
	};
	const { agentId, sessionEntry, sessionEntryHandle, sessionStore, sessionKey, storePath, sessionId, isFirstTurnInSession, workspaceDir, cfg, skillFilter, skillOverrides } = params;
	let nextEntry = sessionEntryHandle?.getCurrent() ?? sessionEntry;
	const expectedSession = nextEntry && {
		sessionId: nextEntry.sessionId,
		lifecycleRevision: nextEntry.lifecycleRevision
	};
	let systemSent = sessionEntry?.systemSent ?? false;
	const nodeSkillsEligibility = resolveNodeExecEligibility({
		cfg,
		sessionEntry,
		sessionKey,
		agentId,
		execOverrides: params.execOverrides
	});
	const existingSnapshot = nextEntry?.skillsSnapshot;
	const resolveSnapshot = (snapshot) => resolveReusableWorkspaceSkillSnapshot({
		workspaceDir,
		...params.executionWorkspaceDir ? { executionWorkspaceDir: params.executionWorkspaceDir } : {},
		config: cfg,
		agentId,
		skillFilter,
		skillOverrides,
		resolveEligibility: () => ({
			nodeSkills: nodeSkillsEligibility,
			remote: getRemoteSkillEligibility({ advertiseExecNode: nodeSkillsEligibility.canExec })
		}),
		existingSnapshot: snapshot,
		librarySelections: nextEntry?.skillLibrarySelections
	});
	const initialSnapshotState = await resolveSnapshot(existingSnapshot);
	const shouldRefreshSnapshot = initialSnapshotState.shouldRefresh;
	if (isFirstTurnInSession && (sessionEntryHandle || sessionStore) && sessionKey) {
		const current = nextEntry ?? sessionEntryHandle?.get(sessionKey) ?? sessionStore?.[sessionKey] ?? {
			sessionId: sessionId ?? crypto.randomUUID(),
			updatedAt: Date.now()
		};
		const { entry: persistedEntry, updated } = await persistSkillSnapshot({
			expectedSession,
			sessionEntryHandle,
			sessionStore,
			sessionKey,
			sessionId,
			storePath,
			currentEntry: current,
			skillsSnapshot: !current.skillsSnapshot || shouldRefreshSnapshot ? initialSnapshotState.snapshot : (await resolveSnapshot(current.skillsSnapshot)).snapshot,
			isFirstTurnInSession
		});
		if (!updated) return {
			sessionEntry: persistedEntry,
			skillsSnapshot: persistedEntry?.skillsSnapshot,
			systemSent: persistedEntry?.systemSent ?? false
		};
		nextEntry = persistedEntry;
		systemSent = persistedEntry?.systemSent ?? systemSent;
	}
	const skillsSnapshot = nextEntry?.skillsSnapshot && (nextEntry.skillsSnapshot !== existingSnapshot || !shouldRefreshSnapshot) ? (await resolveSnapshot(nextEntry.skillsSnapshot)).snapshot : initialSnapshotState.snapshot;
	if (skillsSnapshot && (sessionEntryHandle || sessionStore) && sessionKey && !isFirstTurnInSession && (!nextEntry?.skillsSnapshot || shouldRefreshSnapshot)) {
		const { entry: persistedEntry, updated } = await persistSkillSnapshot({
			expectedSession,
			sessionEntryHandle,
			sessionStore,
			sessionKey,
			sessionId,
			storePath,
			currentEntry: nextEntry ?? {
				sessionId: sessionId ?? crypto.randomUUID(),
				updatedAt: Date.now()
			},
			skillsSnapshot,
			isFirstTurnInSession
		});
		if (!updated) return {
			sessionEntry: persistedEntry,
			skillsSnapshot: persistedEntry?.skillsSnapshot,
			systemSent: persistedEntry?.systemSent ?? false
		};
		nextEntry = persistedEntry;
	}
	if (sessionKey && (sessionEntryHandle || sessionStore)) {
		const current = storePath ? loadSessionEntry({
			storePath,
			sessionKey
		}) : sessionEntryHandle ? sessionEntryHandle.get(sessionKey) : sessionStore?.[sessionKey];
		if (storePath) publishSessionEntry(params, current);
		if (current?.sessionId !== expectedSession?.sessionId || current?.lifecycleRevision !== expectedSession?.lifecycleRevision) return {
			sessionEntry: current,
			skillsSnapshot: current?.skillsSnapshot,
			systemSent: current?.systemSent ?? false
		};
		nextEntry = current;
		systemSent = current?.systemSent ?? false;
	}
	return {
		sessionEntry: nextEntry,
		skillsSnapshot,
		systemSent
	};
}
/** Accounts completed compaction without creating or changing session ownership. */
async function incrementCompactionCount(params) {
	const { sessionStore, sessionKey, storePath, authorize } = params;
	if (!sessionKey || !storePath) return;
	const cachedEntry = sessionStore?.[sessionKey] ?? params.sessionEntry;
	const initial = params.expectedSession ?? cachedEntry;
	if (!initial) return;
	const expected = {
		sessionId: initial.sessionId,
		lifecycleRevision: initial.lifecycleRevision,
		activeWriterRunId: initial.activeWriterRunId
	};
	const update = (current) => {
		if (!(authorize?.() ?? true) || current.sessionId !== expected.sessionId || current.lifecycleRevision !== expected.lifecycleRevision || current.activeWriterRunId !== expected.activeWriterRunId) return null;
		return projectCompactionAccountingPatch(current, params);
	};
	let committed = false;
	const authorityRevoked = /* @__PURE__ */ new Error("compaction accounting authority revoked");
	let persisted;
	try {
		persisted = await patchSessionEntryCore({
			agentId: params.agentId,
			storePath,
			sessionKey
		}, update, {
			onCommitted: (entry) => {
				committed = true;
				if (sessionStore) sessionStore[sessionKey] = entry;
			},
			...authorize ? { assertCommitAllowed: () => {
				if (!authorize()) throw authorityRevoked;
			} } : {}
		});
	} catch (error) {
		if (error === authorityRevoked) return;
		throw error;
	}
	if (!committed || !persisted) return;
	return persisted.compactionCount;
}
//#endregion
export { incrementCompactionCount as n, ensureSkillSnapshot as t };
