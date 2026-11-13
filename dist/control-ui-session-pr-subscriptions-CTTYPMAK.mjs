import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { t as AsyncWorkScope } from "./async-work-scope-ClifbwQr.mjs";
import { a as readDatabasePathIdentitySync } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { t as createOpenClawAgentDatabaseClaim } from "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { c as registerOpenClawAgentDatabaseSyncResource } from "./openclaw-agent-db-resources-DZhhXFbz.mjs";
import { d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { i as isIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import "./operator-scopes-D-CL26h0.mjs";
import { n as cache, p as isIncognitoOpenClawAgentDatabase, y as retainAgentDatabase } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { H as readUserProfileAliasRevision } from "./user-profiles-internal-Co87Y1ZN.mjs";
import { a as roleScopesAllow } from "./operator-scope-compat-Ci6GBcmU.mjs";
import { c as resolveUserProfileId } from "./user-profiles-BZfSkfNw.mjs";
import { t as authorizeCurrentOperatorRoleScopes, u as resolveGatewayOperatorRoleActor } from "./operator-role-policy-Cx-TzI2k.mjs";
import { i as hasCurrentGatewayOperatorAccess } from "./operator-access-policy-Dp2aDYAd.mjs";
import { n as captureSessionStoreReadCandidate } from "./session-store-read-candidates-YT_i67iQ.mjs";
import { I as getSessionRepositoryWorkspaceStore } from "./session-accessor.sqlite-entry-store-JXJQe1fh.mjs";
import { n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { E as isGatewayClientProfilePending } from "./session-sharing-policy-BALdNo4L.mjs";
import { t as CONTROL_UI_SESSION_PULL_REQUESTS_CHANGED_EVENT } from "./control-ui-contract-B_YMMx3J.mjs";
import { n as withReadySessionRows } from "./session-row-prepared-read-KCtcAa3e.mjs";
import { b as createSessionListEntryFilter } from "./session-sharing-Bhe-fXzH.mjs";
import { t as parseGitHubRemoteUrl } from "./github-remote-CloOx2kv.mjs";
import path from "node:path";
import pLimit from "p-limit";
//#region src/gateway/control-ui-session-pr-read.ts
/** Git facts and cached snapshots belong to the recorded session and workspace source. */
function resolveControlUiSessionPrTarget(selected, preparedRepository) {
	const { cfg, agentId, canonicalKey, storePath, readSource, entry } = selected;
	if (!entry?.sessionId || !storePath || !readSource) return;
	let source;
	if (entry.repositoryWorkspaceId) {
		let repository = preparedRepository;
		if (repository === void 0) {
			const workspace = getSessionRepositoryWorkspaceStore().get(entry.repositoryWorkspaceId);
			repository = workspace?.agentId === agentId && workspace.sessionKey === canonicalKey ? workspace : null;
		}
		const remote = repository ? parseGitHubRemoteUrl(repository.url) : null;
		source = remote && repository ? {
			...remote,
			branch: repository.branch
		} : null;
	} else source = normalizeOptionalString(entry.spawnedCwd) ?? normalizeOptionalString(entry.spawnedWorkspaceDir) ?? normalizeOptionalString(resolveAgentWorkspaceDir(cfg, agentId)) ?? null;
	return {
		params: {
			sessionKey: canonicalKey,
			agentId
		},
		readSource,
		identity: JSON.stringify([
			agentId,
			canonicalKey,
			storePath,
			readSource?.agentId,
			readSource?.path,
			entry.sessionId,
			entry.lifecycleRevision,
			entry.repositoryWorkspaceId,
			entry.worktree?.id,
			source
		]),
		source
	};
}
/** A watcher may follow a replaced target, but never a replacement person or access grant. */
async function prepareControlUiSessionPrRead(params) {
	const { client, sessionKey, agentId, getRuntimeConfig, getSessionRowProjection, isCurrentClient } = params;
	const actor = resolveGatewayOperatorRoleActor(client);
	const actorKind = actor?.kind;
	const actorProfile = actor?.kind === "operator" ? actor.profileId : void 0;
	const profileInput = client.authenticatedUserProfile?.profileId;
	const userInput = client.authenticatedUserId;
	const scopes = [...client.connect.scopes ?? []].toSorted().join("\0");
	const access = client.internal?.operatorAccessAuthority;
	const connectionSignal = client.connectionSignal;
	const projection = getSessionRowProjection();
	if (!projection) return;
	let aliasRevision = -1;
	const captureCurrent = () => {
		try {
			const currentActor = resolveGatewayOperatorRoleActor(client);
			if (!isCurrentClient() || client.invalidated || (client.connect.role ?? "operator") !== "operator" || client.connectionSignal !== connectionSignal || connectionSignal?.aborted || isGatewayClientProfilePending(client) || client.authenticatedUserProfile?.profileId !== profileInput || client.authenticatedUserId !== userInput || currentActor?.kind !== actorKind || (currentActor?.kind === "operator" ? currentActor.profileId : void 0) !== actorProfile || [...client.connect.scopes ?? []].toSorted().join("\0") !== scopes || client.internal?.operatorAccessAuthority !== access || !hasCurrentGatewayOperatorAccess(access)) return;
			const currentAliasRevision = readUserProfileAliasRevision();
			if (currentAliasRevision !== aliasRevision) {
				if (actorProfile && resolveUserProfileId(actorProfile) !== actorProfile) return;
				aliasRevision = currentAliasRevision;
			}
			const cfg = getRuntimeConfig();
			if (authorizeCurrentOperatorRoleScopes(client, cfg) || !roleScopesAllow({
				role: "operator",
				requestedScopes: ["operator.read"],
				allowedScopes: client.connect.scopes ?? []
			})) return;
			const requested = resolveRequestedSessionAgentId(cfg, sessionKey, agentId);
			if (!requested.ok) return;
			if (getSessionRowProjection() !== projection || projection.needsMembershipPreparation()) return;
			const query = {
				key: sessionKey,
				agentId: requested.agentId
			};
			const selected = projection.capture(query);
			if (!selected?.entry || !projection.isCurrent(selected) || createSessionListEntryFilter({
				cfg,
				client
			})?.(selected.key, selected.entry) === false) return;
			return {
				cfg,
				query,
				selected
			};
		} catch {
			return;
		}
	};
	const readPreparedCurrent = (read, captured) => {
		try {
			const current = read.describe(captured.query, captured.selected);
			const storePath = current?.storeTarget.storePath;
			if (!current || !storePath) return;
			const repository = current.materialized.row.repository ?? null;
			const target = resolveControlUiSessionPrTarget({
				cfg: captured.cfg,
				agentId: current.agentId,
				canonicalKey: current.key,
				storePath,
				readSource: {
					agentId: current.storeTarget.agentId,
					path: storePath
				},
				entry: current.entry
			}, repository);
			return target ? {
				target,
				repository
			} : void 0;
		} catch {
			return;
		}
	};
	const readCurrent = async () => {
		try {
			if (getSessionRowProjection() !== projection) return;
			const target = await withReadySessionRows(projection, (cfg) => {
				const requested = resolveRequestedSessionAgentId(cfg, sessionKey, agentId);
				return requested.ok ? [{
					key: sessionKey,
					agentId: requested.agentId
				}] : [];
			}, (read) => {
				const captured = captureCurrent();
				if (!captured) return;
				const prepared = readPreparedCurrent(read, captured);
				if (!prepared) return;
				const privateRow = isIncognitoSessionKey(captured.selected.key);
				const rowContext = projection.readPreparedRowContext();
				if (privateRow && captured.selected.entry?.repositoryWorkspaceId && !rowContext) return;
				return {
					...prepared,
					captured: privateRow ? void 0 : captured.selected,
					privateSource: privateRow ? {
						generation: captured.selected.generation,
						sessionId: captured.selected.entry?.sessionId,
						lifecycleRevision: captured.selected.entry?.lifecycleRevision,
						rowContext
					} : void 0
				};
			});
			return target ? {
				...target.target,
				assertCurrent: () => {
					const current = captureCurrent();
					const original = target.privateSource;
					if (!current) throw new Error("Session pull-request target changed");
					if (!original) {
						if (current.selected !== target.captured || !target.captured || !projection.isCurrent(target.captured)) throw new Error("Session pull-request target changed");
						return;
					}
					const { selected } = current;
					if (selected.generation !== original.generation || selected.entry?.sessionId !== original.sessionId || selected.entry?.lifecycleRevision !== original.lifecycleRevision || selected.entry?.repositoryWorkspaceId && (!original.rowContext || projection.readPreparedRowContext() !== original.rowContext) || resolveControlUiSessionPrTarget({
						cfg: current.cfg,
						agentId: selected.agentId,
						canonicalKey: selected.key,
						storePath: selected.storeTarget.storePath,
						readSource: {
							agentId: selected.storeTarget.agentId,
							path: selected.storeTarget.storePath
						},
						entry: selected.entry
					}, target.repository)?.identity !== target.target.identity) throw new Error("Session pull-request target changed");
				}
			} : void 0;
		} catch {
			return;
		}
	};
	return await readCurrent() ? readCurrent : void 0;
}
//#endregion
//#region src/gateway/control-ui-session-pr-source.ts
/** Retain source lifetime through the caller's last assertion and publication. */
async function withControlUiSessionPrSource(source, operation) {
	const target = {
		agentId: normalizeAgentId(source.agentId),
		path: path.resolve(source.path)
	};
	const unregister = [];
	let active = true;
	let releaseNative = () => {};
	const changed = () => /* @__PURE__ */ new Error("Session PR source changed or closed. Retry the request.");
	try {
		let paths;
		let assertSource;
		let sourceIdentity;
		if (isIncognitoOpenClawAgentSqlitePath(target.path, target)) {
			const database = cache.databases.get(target.path);
			if (!database?.db.isOpen || database.agentId !== target.agentId || !isIncognitoOpenClawAgentDatabase(database)) throw changed();
			releaseNative = retainAgentDatabase(database.db);
			const claim = createOpenClawAgentDatabaseClaim(database, releaseNative);
			releaseNative = claim.release;
			sourceIdentity = `incognito:${claim.incarnation}`;
			paths = [target.path];
			assertSource = () => {
				claim.assertCurrent();
				if (cache.databases.get(target.path) !== database || !isIncognitoOpenClawAgentDatabase(database)) throw changed();
			};
		} else {
			const candidate = captureSessionStoreReadCandidate(target.path);
			const identity = readDatabasePathIdentitySync(candidate.path);
			if (!identity.key.startsWith("file:") || identity.canonicalPath !== candidate.physicalPath) throw changed();
			sourceIdentity = identity.key;
			paths = [.../* @__PURE__ */ new Set([candidate.path, candidate.physicalPath])];
			assertSource = () => {
				const current = readDatabasePathIdentitySync(candidate.path);
				if (current.key !== identity.key || current.canonicalPath !== candidate.physicalPath) throw changed();
			};
		}
		for (const pathname of paths) unregister.push(registerOpenClawAgentDatabaseSyncResource({
			agentId: target.agentId,
			path: pathname,
			revoke: () => {
				active = false;
			},
			close: () => releaseNative()
		}));
		const assertCurrent = () => {
			if (!active) throw changed();
			assertSource();
		};
		assertCurrent();
		return await operation(assertCurrent, sourceIdentity);
	} finally {
		active = false;
		for (const release of unregister.toReversed()) release();
		releaseNative();
	}
}
//#endregion
//#region src/gateway/control-ui-session-pr-subscriptions.ts
const CONTROL_UI_SESSION_PR_POLL_INTERVAL_MS = 6e4;
const CONTROL_UI_SESSION_PR_REFRESH_INTERVAL_MS = 1e4;
const CONTROL_UI_SESSION_PR_LOAD_CONCURRENCY = 4;
async function loadSessionPullRequests(params, cacheSignal, read) {
	read.assertCurrent();
	const { loadControlUiSessionPullRequests } = await import("./control-ui-session-prs-BEjsag8H.mjs");
	return loadControlUiSessionPullRequests(params, {
		cacheSignal,
		read
	});
}
function pushedSnapshot(result) {
	return {
		...result,
		status: result.status ?? (result.rateLimited ? "rate-limited" : "ready")
	};
}
const UNAVAILABLE_SNAPSHOT = {
	pullRequests: [],
	rateLimited: false,
	status: "unavailable"
};
function parseSessionKeys(value) {
	if (!Array.isArray(value) || value.length > 200) return null;
	const keys = /* @__PURE__ */ new Set();
	for (const entry of value) {
		if (typeof entry !== "string") return null;
		const key = entry.trim();
		if (!key || key.length > 512) return null;
		keys.add(key);
	}
	return [...keys];
}
function parseControlUiSessionPullRequestsSubscribeParams(value) {
	if (!value || typeof value !== "object" || !("sessionKeys" in value)) return null;
	const raw = value;
	const sessionKeys = parseSessionKeys(raw.sessionKeys);
	const refreshSessionKeys = raw.refreshSessionKeys === void 0 ? [] : parseSessionKeys(raw.refreshSessionKeys);
	if (!sessionKeys || !refreshSessionKeys) return null;
	const watched = new Set(sessionKeys);
	for (const key of refreshSessionKeys) if (!watched.has(key)) return null;
	return {
		sessionKeys,
		refreshSessionKeys
	};
}
/**
* Owns the union of connection replace-sets. Only this union drives GitHub
* refreshes, so hidden/disconnected clients cannot leave orphan polling work.
*/
function createControlUiSessionPullRequestSubscriptions(deps) {
	const subscriptions = /* @__PURE__ */ new Map();
	const replacements = /* @__PURE__ */ new Set();
	const replacementGenerations = /* @__PURE__ */ new Map();
	const pendingAdmissions = /* @__PURE__ */ new Map();
	const keyStates = /* @__PURE__ */ new Map();
	const inflight = /* @__PURE__ */ new Map();
	const scheduler = deps.scheduler;
	const limit = pLimit(CONTROL_UI_SESSION_PR_LOAD_CONCURRENCY);
	const customLoad = deps.load;
	const load = customLoad ?? loadSessionPullRequests;
	const withSource = (target, operation) => customLoad ? operation(() => {}, target.identity) : withControlUiSessionPrSource(target.readSource, operation);
	let pollJob;
	const scope = new AsyncWorkScope();
	let stopPromise;
	const retireKeyStateIfUnused = (sessionKey, state) => {
		if (!state || state.connIds.size > 0 || [...pendingAdmissions.get(sessionKey) ?? []].some((isCurrent) => isCurrent())) return;
		state.cancelRefresh?.();
		state.cacheLifetime.abort(null);
		if (keyStates.get(sessionKey) === state) keyStates.delete(sessionKey);
	};
	const removeMemberships = (connId, previous, retained) => {
		for (const key of previous?.keys() ?? []) if (!retained?.has(key)) {
			const state = keyStates.get(key);
			state?.connIds.delete(connId);
			retireKeyStateIfUnused(key, state);
		}
	};
	const stateForTarget = (sessionKey, target, sourceIdentity) => {
		const previous = keyStates.get(sessionKey);
		if (previous?.target.identity === target.identity && (sourceIdentity === void 0 || previous.sourceIdentity === void 0 || previous.sourceIdentity === sourceIdentity)) {
			previous.target = target;
			previous.sourceIdentity ??= sourceIdentity;
			return previous;
		}
		previous?.cancelRefresh?.();
		previous?.cacheLifetime.abort(null);
		const state = {
			connIds: new Set(previous?.connIds),
			target,
			watchLifetime: previous?.watchLifetime ?? {},
			sourceIdentity,
			cacheLifetime: new AbortController()
		};
		keyStates.set(sessionKey, state);
		return state;
	};
	const currentWatcher = async (connId, sessionKey) => {
		const watched = subscriptions.get(connId)?.get(sessionKey);
		const target = deps.isConnectionActive?.(connId) === false ? void 0 : await watched?.readCurrent();
		const subscription = subscriptions.get(connId);
		if (scope.isClosing || subscription?.get(sessionKey) !== watched) return;
		if (deps.isConnectionActive?.(connId) === false) {
			unsubscribe(connId);
			return;
		}
		if (!watched || !target) {
			subscription?.delete(sessionKey);
			const state = keyStates.get(sessionKey);
			state?.connIds.delete(connId);
			retireKeyStateIfUnused(sessionKey, state);
			if (subscription?.size === 0) {
				subscriptions.delete(connId);
				if (subscriptions.size === 0) {
					pollJob?.cancel();
					pollJob = void 0;
				}
			}
			return;
		}
		if (watched.target.identity !== target.identity) watched.deliveredHash = void 0;
		watched.target = target;
		stateForTarget(sessionKey, target).connIds.add(connId);
		return {
			watched,
			target
		};
	};
	const currentKeyState = async (sessionKey) => {
		for (const connId of keyStates.get(sessionKey)?.connIds ?? []) await currentWatcher(connId, sessionKey);
		return keyStates.get(sessionKey);
	};
	const loadSnapshot = async (sessionKey, isCurrent, refresh) => {
		const targetState = await currentKeyState(sessionKey);
		if (scope.isClosing || !targetState || !isCurrent()) return UNAVAILABLE_SNAPSHOT;
		return withSource(targetState.target, async (assertSourceCurrent, sourceIdentity) => {
			const state = stateForTarget(sessionKey, targetState.target, sourceIdentity);
			const pending = inflight.get(sessionKey);
			if (pending) {
				if (pending.state === state && (!refresh || pending.refresh)) {
					pending.demands.add(isCurrent);
					if (refresh && refresh.watched.refreshPending === refresh.generation) pending.refreshRequests.set(refresh.watched, refresh.generation);
					return pending.promise;
				}
				await pending.promise;
				assertSourceCurrent();
				return await currentKeyState(sessionKey) === state && isCurrent() ? loadSnapshot(sessionKey, isCurrent, refresh) : UNAVAILABLE_SNAPSHOT;
			}
			const demands = /* @__PURE__ */ new Set([isCurrent]);
			const refreshRequests = /* @__PURE__ */ new Map();
			if (refresh && refresh.watched.refreshPending === refresh.generation) refreshRequests.set(refresh.watched, refresh.generation);
			const promise = scope.track(async () => {
				const delay = refresh ? (state.refreshedAt ?? -Infinity) + CONTROL_UI_SESSION_PR_REFRESH_INTERVAL_MS - scheduler.now() : 0;
				if (delay > 0) {
					await new Promise((resolve) => {
						const refreshJob = scheduler.schedule({
							id: `control-ui-session-pr-refresh:${sessionKey}`,
							delayMs: delay,
							run: resolve
						});
						state.cancelRefresh = () => {
							refreshJob.cancel();
							resolve();
						};
					});
					state.cancelRefresh = void 0;
				}
				return await limit(async () => {
					if (!Array.from(demands).some((current) => current()) || await currentKeyState(sessionKey) !== state) return UNAVAILABLE_SNAPSHOT;
					if (refresh) state.refreshedAt = scheduler.now();
					const snapshot = await load({
						...state.target.params,
						...refresh ? { refresh: true } : {}
					}, state.cacheLifetime.signal, {
						target: state.target,
						sourceIdentity,
						assertCurrent: () => {
							assertSourceCurrent();
							if (scope.isClosing || !Array.from(demands).some((current) => current()) || keyStates.get(sessionKey) !== state) throw new Error("Session pull-request watchers changed");
							for (const connId of state.connIds) {
								const watched = subscriptions.get(connId)?.get(sessionKey);
								if (!watched || watched.target.identity !== state.target.identity || deps.isConnectionActive?.(connId) === false) continue;
								try {
									watched.target.assertCurrent?.();
									return;
								} catch {}
							}
							throw new Error("Session pull-request watchers changed");
						}
					}).then(pushedSnapshot).catch(() => ({ ...UNAVAILABLE_SNAPSHOT }));
					if (await currentKeyState(sessionKey) === state) {
						assertSourceCurrent();
						state.snapshot = snapshot;
						await push(new Set(state.connIds), sessionKey, state, snapshot, assertSourceCurrent, refreshRequests);
					}
					return snapshot;
				});
			}).catch(() => UNAVAILABLE_SNAPSHOT).finally(() => {
				if (inflight.get(sessionKey)?.promise === promise) inflight.delete(sessionKey);
			});
			inflight.set(sessionKey, {
				promise,
				refresh: Boolean(refresh),
				refreshRequests,
				state,
				demands
			});
			return promise;
		}).catch(() => UNAVAILABLE_SNAPSHOT);
	};
	const push = (connIds, sessionKey, state, snapshot, assertSourceCurrent, refreshRequests) => {
		if (connIds.size === 0) return Promise.resolve();
		const hash = JSON.stringify(snapshot);
		const isDelivered = (watched) => {
			const request = refreshRequests?.get(watched);
			return (!request || watched.refreshPending !== request) && watched.deliveredHash === hash;
		};
		const stateDelivery = (state.delivery ?? Promise.resolve()).then(async () => {
			const sessions = Object.create(null);
			sessions[sessionKey] = snapshot;
			for (const connId of connIds) {
				const watched = subscriptions.get(connId)?.get(sessionKey);
				if (!watched || isDelivered(watched)) continue;
				const delivery = (watched.delivery ?? Promise.resolve()).then(async () => {
					const current = await currentWatcher(connId, sessionKey);
					if (!current || scope.isClosing || current.watched !== watched || subscriptions.get(connId)?.get(sessionKey) !== watched || deps.isConnectionActive?.(connId) === false || keyStates.get(sessionKey) !== state || isDelivered(watched)) return;
					assertSourceCurrent();
					try {
						current.target.assertCurrent?.();
					} catch {
						return;
					}
					const refreshRequest = refreshRequests?.get(watched);
					deps.broadcastToConnIds(CONTROL_UI_SESSION_PULL_REQUESTS_CHANGED_EVENT, { sessions }, /* @__PURE__ */ new Set([connId]), {
						sessionKeys: [state.target.params.sessionKey],
						agentId: state.target.params.agentId
					});
					if (subscriptions.get(connId)?.get(sessionKey) === watched) {
						watched.deliveredHash = hash;
						if (refreshRequest && watched.refreshPending === refreshRequest) delete watched.refreshPending;
					}
				}).finally(() => {
					if (watched.delivery === delivery) delete watched.delivery;
				});
				watched.delivery = delivery;
				await delivery;
			}
		}).finally(() => {
			if (state.delivery === stateDelivery) delete state.delivery;
		});
		state.delivery = stateDelivery;
		return stateDelivery;
	};
	const schedulePoll = () => {
		if (scope.isClosing || pollJob || subscriptions.size === 0) return;
		pollJob = scheduler.schedule({
			id: "control-ui-session-pr-poll",
			atMs: scheduler.now() + CONTROL_UI_SESSION_PR_POLL_INTERVAL_MS,
			everyMs: CONTROL_UI_SESSION_PR_POLL_INTERVAL_MS,
			run: pollNow
		});
	};
	const pollNow = () => {
		if (scope.isClosing) return Promise.resolve();
		return scope.track(async () => {
			await Promise.all([Promise.allSettled(replacements), Promise.all(Array.from(keyStates, ([sessionKey, state]) => {
				const watchLifetime = state.watchLifetime;
				return loadSnapshot(sessionKey, () => keyStates.get(sessionKey)?.watchLifetime === watchLifetime);
			}))]);
		});
	};
	const replace = (connId, sessionKeys, refreshSessionKeys = /* @__PURE__ */ new Set(), onAdmitted) => {
		let admitted = false;
		const admit = () => {
			if (!admitted) {
				admitted = true;
				onAdmitted?.();
			}
		};
		if (scope.isClosing) {
			admit();
			return Promise.resolve();
		}
		const normalizedConnId = connId.trim();
		if (!normalizedConnId || deps.isConnectionActive?.(normalizedConnId) === false) {
			unsubscribe(normalizedConnId);
			admit();
			return Promise.resolve();
		}
		const previousGeneration = replacementGenerations.get(normalizedConnId);
		const retainedKeys = new Set(sessionKeys.filter((key) => keyStates.has(key)));
		const generation = { retainedKeys };
		replacementGenerations.set(normalizedConnId, generation);
		for (const key of sessionKeys) {
			const watched = subscriptions.get(normalizedConnId)?.get(key);
			if (watched && refreshSessionKeys.has(key)) watched.refreshPending = generation;
		}
		const isCurrentReplacement = () => !scope.isClosing && replacementGenerations.get(normalizedConnId) === generation;
		const replacement = scope.track(async () => {
			for (const key of retainedKeys) {
				const admissions = pendingAdmissions.get(key) ?? /* @__PURE__ */ new Set();
				admissions.add(isCurrentReplacement);
				pendingAdmissions.set(key, admissions);
			}
			try {
				for (const key of previousGeneration?.retainedKeys ?? []) retireKeyStateIfUnused(key, keyStates.get(key));
				const previousSubscription = subscriptions.get(normalizedConnId);
				const subscription = /* @__PURE__ */ new Map();
				for (const key of sessionKeys) {
					const parsed = parseAgentSessionKey(key);
					const session = parsed?.rest === "global" ? {
						sessionKey: "global",
						agentId: parsed.agentId
					} : { sessionKey: key };
					const previous = previousSubscription?.get(key);
					const readCurrent = previous && await previous.readCurrent() ? previous.readCurrent : await deps.prepareRead(normalizedConnId, session);
					const target = await readCurrent?.();
					if (!readCurrent || !target) continue;
					const next = previous?.target.identity === target.identity && readCurrent === previous.readCurrent ? previous : {
						readCurrent,
						target
					};
					if (next !== previous && refreshSessionKeys.has(key)) next.refreshPending = generation;
					subscription.set(key, next);
				}
				const currentReplacement = isCurrentReplacement();
				if (!currentReplacement) {
					const current = subscriptions.get(normalizedConnId);
					for (const [key, watched] of subscription) if (!refreshSessionKeys.has(key) || current?.get(key) !== watched || watched.refreshPending !== generation) subscription.delete(key);
				}
				if (subscription.size === 0) {
					if (currentReplacement) unsubscribe(normalizedConnId);
					admit();
					return;
				}
				if (currentReplacement) {
					subscriptions.set(normalizedConnId, subscription);
					removeMemberships(normalizedConnId, previousSubscription, subscription);
					for (const [key, watched] of subscription) stateForTarget(key, watched.target).connIds.add(normalizedConnId);
					schedulePoll();
				}
				admit();
				await Promise.all(Array.from(subscription, async ([sessionKey, watched]) => {
					const targetState = await currentKeyState(sessionKey);
					if (!targetState) return;
					return withSource(targetState.target, async (assertSourceCurrent, sourceIdentity) => {
						const state = stateForTarget(sessionKey, targetState.target, sourceIdentity);
						const isCurrent = () => subscriptions.get(normalizedConnId)?.get(sessionKey) === watched;
						const refresh = refreshSessionKeys.has(sessionKey);
						const cached = refresh ? void 0 : state.snapshot;
						if (cached) {
							if (!watched.deliveredHash) await push(/* @__PURE__ */ new Set([normalizedConnId]), sessionKey, state, cached, assertSourceCurrent);
							return;
						}
						const snapshot = await loadSnapshot(sessionKey, isCurrent, refresh ? {
							watched,
							generation
						} : void 0);
						assertSourceCurrent();
						if (isCurrent() && (refresh ? watched.refreshPending === generation : !watched.deliveredHash)) await push(/* @__PURE__ */ new Set([normalizedConnId]), sessionKey, state, snapshot, assertSourceCurrent, refresh ? /* @__PURE__ */ new Map([[watched, generation]]) : void 0);
					}).catch(() => {});
				}));
			} finally {
				admit();
				for (const key of retainedKeys) {
					const admissions = pendingAdmissions.get(key);
					admissions?.delete(isCurrentReplacement);
					if (admissions?.size === 0) pendingAdmissions.delete(key);
					retireKeyStateIfUnused(key, keyStates.get(key));
				}
			}
		});
		replacements.add(replacement);
		const releaseReplacement = () => {
			replacements.delete(replacement);
			if (replacementGenerations.get(normalizedConnId) === generation) replacementGenerations.delete(normalizedConnId);
		};
		replacement.then(releaseReplacement, releaseReplacement);
		return replacement;
	};
	const unsubscribe = (connId) => {
		const normalizedConnId = connId.trim();
		if (!normalizedConnId) return;
		const generation = replacementGenerations.get(normalizedConnId);
		replacementGenerations.delete(normalizedConnId);
		removeMemberships(normalizedConnId, subscriptions.get(normalizedConnId));
		subscriptions.delete(normalizedConnId);
		for (const key of generation?.retainedKeys ?? []) retireKeyStateIfUnused(key, keyStates.get(key));
		if (subscriptions.size === 0) {
			pollJob?.cancel();
			pollJob = void 0;
		}
	};
	const stop = () => {
		if (stopPromise) return stopPromise;
		scope.beginClose();
		pollJob?.cancel();
		pollJob = void 0;
		subscriptions.clear();
		replacementGenerations.clear();
		replacements.clear();
		for (const state of keyStates.values()) {
			state.cancelRefresh?.();
			state.cacheLifetime.abort(null);
		}
		keyStates.clear();
		stopPromise = scope.drain().then(() => {
			inflight.clear();
		});
		return stopPromise;
	};
	return {
		replace,
		unsubscribe,
		pollNow,
		stop
	};
}
//#endregion
export { resolveControlUiSessionPrTarget as a, prepareControlUiSessionPrRead as i, parseControlUiSessionPullRequestsSubscribeParams as n, withControlUiSessionPrSource as r, createControlUiSessionPullRequestSubscriptions as t };
