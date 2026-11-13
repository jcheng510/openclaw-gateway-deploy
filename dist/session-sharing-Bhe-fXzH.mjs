import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
import { _ as normalizeUniqueTrimmedStringList } from "./string-normalization-YMwDjufr.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as assertExistingDatabaseIdentity } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { m as resolveConfiguredAgentId, p as resolveAmbientOwnerAgentId, t as AgentSelectionRequiredError } from "./agent-scope-config-Dm6T00l4.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { n as resolvePersistedSessionStoreOwnerForKey } from "./session-store-owner-CqyGjSj-.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { c as openOpenClawAgentDatabase, d as runOpenClawAgentWriteTransaction } from "./openclaw-agent-db-CZUYuo7P.mjs";
import { r as resolveAgentMainSessionKey } from "./main-session-BFJFO581.mjs";
import { n as operatorScopeSatisfied } from "./operator-scope-compat-Ci6GBcmU.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { f as resolveOperatorRolePolicyForAssignment, n as authorizeGatewaySessionCreation, o as operatorSessionCap, t as authorizeCurrentOperatorRoleScopes, u as resolveGatewayOperatorRoleActor } from "./operator-role-policy-Cx-TzI2k.mjs";
import { _ as toDatabaseOptions, l as resolveSqliteScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { n as publishSessionEntryCacheCategoryUpdate } from "./session-accessor.sqlite-entry-cache-DYTBofzQ.mjs";
import { r as prepareSessionGroupCategoryMutation, t as applySessionGroupCategoryMutation } from "./session-group-categories.kernel-B4xX34DA.mjs";
import { n as resolveSessionMethodScope } from "./session-method-scopes-base-CwcrKAWU.mjs";
import { a as sessionMutationTargetFields, i as isSessionProfileDependentMethod, n as isApprovalSessionTargetMethod, r as isRequiredSessionTargetMethod, t as isAgentRunStartMethod } from "./session-method-policy-5Q_p2C9o.mjs";
import { U as runSessionCollaborationWrite } from "./session-accessor-CGLseszP.mjs";
import { n as resolveRequestedSessionAgentId, r as resolveRequestedSessionAgentInput } from "./session-request-agent-DFWpsx2m.mjs";
import { r as resolveSessionStoreIdentity, t as canonicalizeSessionKeyForAgent } from "./session-store-key-__CfQfd2.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { o as resolveGatewaySessionStoreTarget, s as resolveGatewaySessionStoreTargetWithStore } from "./session-utils-store-lookup-B0P8tI_m.mjs";
import { E as isGatewayClientProfilePending, S as authenticatedProfileUnavailableError, T as gatewayClientSessionCreator, _ as resolveSessionSharingTarget, b as isSessionCreatorProfile, d as hiddenSessionNotFound, f as isGatewayAdmin, g as resolveSessionSharingRole, l as canManageSessionSharing, n as authorizeIncognitoSessionTarget, o as authorizeSessionAgentRun, r as authorizeOwnSessionMutation, s as authorizeSessionSharingTarget, v as resolveSessionVisibility, x as prepareSessionCreatorProfile, y as sharingIdentity } from "./session-sharing-policy-BALdNo4L.mjs";
import { n as getSessionRowProjection } from "./session-row-projection-access-tcGTz6Lk.mjs";
import { r as prepareGatewayRecipientProfile } from "./expected-profile-DOrr_bU5.mjs";
import { s as resolveAuthorizedBoardViewTicketClaims } from "./board-view-ticket-CDFB0J9z.mjs";
import { i as readSessionGroupMembershipInWorker, n as mutateSessionGroupCatalog, r as readSessionGroupCatalog, t as ensureSessionGroupCatalog } from "./session-group-catalog-_0wFjk_O.mjs";
import { s as resolveUnifiedTalkSessionTarget } from "./session-registry-B9F6R14z.mjs";
//#region src/gateway/session-sharing-snapshot-cache.ts
const SNAPSHOT_CACHE_LIMIT = 2048;
const snapshotCache = /* @__PURE__ */ new Map();
const snapshotAliases = /* @__PURE__ */ new Map();
const snapshotKeysBySessionKey = /* @__PURE__ */ new Map();
const aliasKeysBySessionKey = /* @__PURE__ */ new Map();
const aliasKeysByCanonicalKey = /* @__PURE__ */ new Map();
function snapshotKey(sessionKey, agentId) {
	return `${agentId ?? ""}\0${sessionKey}`;
}
function logicalSessionKey(key) {
	return key.slice(key.lastIndexOf("\0") + 1);
}
function addReverseIndex(index, key, value) {
	const values = index.get(key) ?? /* @__PURE__ */ new Set();
	values.add(value);
	index.set(key, values);
}
function removeReverseIndex(index, key, value) {
	const values = index.get(key);
	values?.delete(value);
	if (values?.size === 0) index.delete(key);
}
function removeSnapshotAlias(alias) {
	const canonical = snapshotAliases.get(alias);
	if (!canonical) return;
	snapshotAliases.delete(alias);
	removeReverseIndex(aliasKeysBySessionKey, logicalSessionKey(alias), alias);
	removeReverseIndex(aliasKeysByCanonicalKey, canonical, alias);
}
function removeSnapshot(key) {
	if (!snapshotCache.delete(key)) return;
	removeReverseIndex(snapshotKeysBySessionKey, logicalSessionKey(key), key);
	for (const alias of aliasKeysByCanonicalKey.get(key) ?? []) removeSnapshotAlias(alias);
}
function rememberSnapshot(key, snapshot) {
	const known = snapshotCache.delete(key);
	snapshotCache.set(key, snapshot);
	if (!known) addReverseIndex(snapshotKeysBySessionKey, logicalSessionKey(key), key);
	if (snapshotCache.size <= SNAPSHOT_CACHE_LIMIT) return;
	const oldest = snapshotCache.keys().next().value;
	if (oldest) removeSnapshot(oldest);
}
function rememberSnapshotAlias(alias, canonical) {
	removeSnapshotAlias(alias);
	snapshotAliases.set(alias, canonical);
	addReverseIndex(aliasKeysBySessionKey, logicalSessionKey(alias), alias);
	addReverseIndex(aliasKeysByCanonicalKey, canonical, alias);
	if (snapshotAliases.size <= SNAPSHOT_CACHE_LIMIT * 2) return;
	const oldest = snapshotAliases.keys().next().value;
	if (oldest) removeSnapshotAlias(oldest);
}
function invalidateSessionSharingSnapshot(sessionKey) {
	if (sessionKey) {
		const matchingCanonicalKeys = new Set(snapshotKeysBySessionKey.get(sessionKey));
		for (const alias of aliasKeysBySessionKey.get(sessionKey) ?? []) {
			const canonical = snapshotAliases.get(alias);
			if (canonical) matchingCanonicalKeys.add(canonical);
		}
		for (const key of matchingCanonicalKeys) removeSnapshot(key);
		return;
	}
	snapshotCache.clear();
	snapshotAliases.clear();
	snapshotKeysBySessionKey.clear();
	aliasKeysBySessionKey.clear();
	aliasKeysByCanonicalKey.clear();
}
function loadCachedSessionSharingSnapshot(params) {
	const requestedKey = snapshotKey(params.sessionKey, params.agentId);
	const aliasedKey = snapshotAliases.get(requestedKey);
	const cached = snapshotCache.get(aliasedKey ?? requestedKey);
	if (cached) return cached;
	const resolved = params.resolve();
	const canonicalKey = snapshotKey(resolved.canonicalKey, resolved.canonicalAgentId);
	const canonicalCached = snapshotCache.get(canonicalKey);
	if (!canonicalCached) rememberSnapshot(canonicalKey, resolved.snapshot);
	if (requestedKey !== canonicalKey) rememberSnapshotAlias(requestedKey, canonicalKey);
	return canonicalCached ?? resolved.snapshot;
}
//#endregion
//#region src/gateway/session-sharing-read.ts
function loadSharingSnapshot(params) {
	const { sessionKey, agentId } = params;
	return loadCachedSessionSharingSnapshot({
		agentId,
		sessionKey,
		resolve: () => {
			const target = resolveSessionSharingTarget(params);
			return {
				canonicalKey: target?.canonicalKey ?? sessionKey,
				canonicalAgentId: target?.agentId ?? agentId,
				snapshot: {
					visibility: target ? resolveSessionVisibility(target.entry) : "draft",
					incognito: target ? target.entry.incognito === true || isIncognitoSessionKey(target.canonicalKey) : isIncognitoSessionKey(sessionKey),
					...target ? { createdActor: target.entry.createdActor } : {}
				}
			};
		}
	});
}
function canReceiveSessionEvent(params) {
	const { cfg, policyConfig = cfg, client, sessionKeys, event } = params;
	const operatorActor = resolveGatewayOperatorRoleActor(client);
	if (operatorActor?.kind === "operator" && authorizeCurrentOperatorRoleScopes(client, policyConfig)) return false;
	if (isGatewayAdmin(client)) return true;
	const identity = sharingIdentity(client, operatorActor);
	if (!identity) return (!operatorScopeSatisfied("operator.sessions.read", client.connect.scopes ?? []) || operatorActor?.kind === "system" || operatorScopeSatisfied("operator.read", client.connect.scopes ?? [])) && (!policyConfig.gateway?.roles || operatorActor?.kind === "system") && event !== "session.suggestion" && event !== "session.typing";
	const sharing = params.prepared?.sharing ?? prepareSessionSharing({
		cfg: policyConfig,
		client
	});
	const hidesForeignSessions = (params.prepared ? sharing.sessionCap : operatorSessionCap(client, policyConfig)) === "none";
	const lookup = params.prepared ? void 0 : {
		agentId: params.agentId,
		exactRead: sessionKeys.length === 1,
		storeCache: /* @__PURE__ */ new Map(),
		targetDiscoveryCache: /* @__PURE__ */ new Map()
	};
	const resolveTarget = (sessionKey) => params.prepared ? params.prepared.target(sessionKey, params.agentId) : resolveSessionSharingTarget({
		cfg,
		...lookup,
		sessionKey
	});
	const visible = sessionKeys.every((sessionKey) => {
		const target = params.prepared ? resolveTarget(sessionKey) : void 0;
		const snapshot = params.prepared ? {
			visibility: target ? resolveSessionVisibility(target.entry) : "draft",
			incognito: target ? target.entry.incognito === true || isIncognitoSessionKey(target.canonicalKey) : isIncognitoSessionKey(sessionKey),
			createdActor: target?.entry.createdActor
		} : loadSharingSnapshot({
			cfg,
			...lookup,
			sessionKey
		});
		const isCreator = sharing.isCreator(snapshot.createdActor);
		if (snapshot.incognito || hidesForeignSessions && !isCreator) return false;
		if (snapshot.visibility !== "draft" || isCreator) return true;
		if (event !== "session.typing") return false;
		const typingTarget = resolveTarget(sessionKey);
		return typingTarget !== null && canManageSessionSharing(sharing.roleForTarget(typingTarget));
	});
	if (!visible || event !== "session.suggestion") return visible;
	if ((params.payload && typeof params.payload === "object" ? params.payload.suggestion?.author?.id : void 0) === identity.id) return true;
	return sessionKeys.every((sessionKey) => {
		const target = resolveTarget(sessionKey);
		return target !== null && sharing.roleForTarget(target) !== "viewer";
	});
}
/** Share caller facts across synchronous selection/role projection, never across an await. */
function prepareSessionSharing(params, prepared) {
	const identity = sharingIdentity(params.client, resolveGatewayOperatorRoleActor(params.client));
	const isCreator = prepareSessionCreatorProfile(identity?.id, prepared?.aliases);
	const roleForTarget = (target, isMember) => resolveSessionSharingRole({
		...params,
		target,
		isMember: isMember ?? (prepared && Boolean(identity && prepared.isMember(target, identity.id)))
	}, prepared && { value: prepared.sessionCap }, isCreator);
	return {
		isCreator,
		sessionCap: prepared?.sessionCap,
		entryFilter: createSessionListEntryFilter(params, isCreator, prepared),
		roleForTarget,
		authorizeTarget: (target) => authorizeSessionSharingTarget({
			...params,
			target
		}, prepared && {
			value: prepared.sessionCap,
			role: roleForTarget(target)
		})
	};
}
function prepareProjectedSessionSharing(params) {
	const { cfg, client, isMember } = params;
	if (client?.internal?.syntheticClient) prepareGatewayRecipientProfile(client);
	const actor = resolveGatewayOperatorRoleActor(client);
	const identity = sharingIdentity(client, actor);
	const retained = client?.preparedSessionProfile;
	const profile = identity && retained?.aliases.has(identity.id) ? retained : void 0;
	const roleProfile = actor?.kind === "operator" && retained?.aliases.has(actor.profileId) ? retained : void 0;
	const sessionCap = actor?.kind === "system" ? void 0 : resolveOperatorRolePolicyForAssignment(roleProfile?.profileId, roleProfile?.role ?? null, cfg)?.sessions.others;
	return prepareSessionSharing(params, {
		aliases: profile?.aliases ?? /* @__PURE__ */ new Set(),
		sessionCap,
		isMember
	});
}
function createSessionListEntryFilter(params, isCreator, prepared) {
	const operatorActor = resolveGatewayOperatorRoleActor(params.client);
	const identity = sharingIdentity(params.client, operatorActor);
	if (isGatewayAdmin(params.client) || !identity && operatorActor?.kind === "system") return;
	if (!identity) return params.cfg?.gateway?.roles ? () => false : void 0;
	const sessionCap = prepared ? prepared.sessionCap : params.cfg && operatorSessionCap(params.client, params.cfg);
	return createProfileSessionEntryFilter({
		profileId: identity.id,
		sessionCap
	}, isCreator);
}
function createProfileSessionEntryFilter(params, isCreator) {
	const creatorMatches = isCreator ?? ((actor) => isSessionCreatorProfile(actor, params.profileId));
	return (sessionKey, entry) => entry.incognito !== true && !isIncognitoSessionKey(sessionKey) && (creatorMatches(entry.createdActor) || params.sessionCap !== "none" && resolveSessionVisibility(entry) !== "draft");
}
//#endregion
//#region src/config/sessions/session-group-categories.ts
/** Prepared rows stay with the broker; only target identities cross the admission boundary. */
function updateSessionGroupCategoriesInWorker(params) {
	const { scope, from, to, assertTargetCurrent } = params;
	const agentId = scope.agentId;
	let keys = [];
	const superseded = /* @__PURE__ */ new Set();
	let releasePublicationFence;
	const assertCurrent = () => {
		for (const sessionKey of keys) assertTargetCurrent?.({
			agentId,
			sessionKey
		});
	};
	return runSessionCollaborationWrite(scope, {
		type: "category.apply",
		input: {
			scope,
			from,
			to
		}
	}, (capturedScope) => {
		const options = toDatabaseOptions(resolveSqliteScope(capturedScope));
		const database = openOpenClawAgentDatabase(options);
		const planned = prepareSessionGroupCategoryMutation(database, from);
		keys = [...planned.keys()];
		assertCurrent();
		return runOpenClawAgentWriteTransaction((current) => {
			assertCurrent();
			return applySessionGroupCategoryMutation(current, planned, to, capturedScope.env ?? process.env).length;
		}, options, { operationLabel: "session.group-categories.update" });
	}, (changed, location, database) => {
		releasePublicationFence?.();
		publishSessionEntryCacheCategoryUpdate(database, changed.filter(({ sessionKey }) => !superseded.has(sessionKey)), to);
		sessionChanges.emitBatch(changed.map(({ sessionKey, sessionId }) => ({
			agentId: location.agentId,
			storePath: location.storePath,
			sessionKey,
			...superseded.has(sessionKey) ? { factsInvalidated: true } : { facts: {
				kind: "category",
				sessionId,
				category: to?.trim() || null
			} }
		})));
		return changed.length;
	}, assertCurrent, async (operation, preparedScope) => {
		keys = await operation.execute({
			type: "category.prepare",
			input: {
				scope: preparedScope,
				from
			}
		});
		assertCurrent();
		const targets = new Set(keys);
		releasePublicationFence = sessionChanges.subscribeFacts((change) => {
			if ("all" in change) for (const key of targets) superseded.add(key);
			else if (targets.has(change.sessionKey) && change.scope !== "automation" && (change.factsInvalidated || change.facts && change.facts.kind !== "unchanged" && change.facts.kind !== "member" && change.facts.kind !== "participants")) superseded.add(change.sessionKey);
		});
	}).finally(() => releasePublicationFence?.());
}
//#endregion
//#region src/gateway/session-groups.ts
var SessionGroupNotFoundError = class extends Error {
	constructor(name) {
		super(`unknown session group: ${name}`);
		this.name = "SessionGroupNotFoundError";
	}
};
var SessionGroupNotEmptyError = class extends Error {
	constructor(groups) {
		super(`sessions.groups.put cannot drop groups that still have member sessions: ${groups.map((group) => `"${group.name}" (${group.memberSessions})`).join(", ")}; include them in names or remove them via sessions.groups.delete`);
		this.groups = groups;
		this.name = "SessionGroupNotEmptyError";
	}
};
function normalizeSidebarSectionOrder(sectionOrder, groupNames) {
	const groups = new Set(groupNames);
	const normalized = /* @__PURE__ */ new Set();
	for (const raw of sectionOrder) {
		const sectionId = raw.trim();
		let canonical = null;
		if (sectionId === "ungrouped" || sectionId === "groups" || sectionId === "work") canonical = sectionId;
		else if (sectionId.startsWith("category:")) {
			const name = normalizeOptionalString(sectionId.slice(9));
			if (name && groups.has(name)) canonical = `category:${name}`;
		} else if (sectionId.startsWith("catalog:")) {
			const catalogId = normalizeOptionalString(sectionId.slice(8));
			if (catalogId) canonical = `catalog:${catalogId}`;
		}
		if (canonical) normalized.add(canonical);
	}
	return [...normalized];
}
function listSessionGroups(env = process.env) {
	return readSessionGroupCatalog(env).groups;
}
function listSessionGroupDefaults(env = process.env) {
	return readSessionGroupCatalog(env).defaults;
}
function listSidebarSectionOrder(env = process.env) {
	return readSessionGroupCatalog(env).sectionOrder;
}
/**
* Replaces the ordered catalog. Dropping a name whose group still has member
* sessions is rejected: member sweeps stay owned by sessions.groups.delete,
* so a put can never leave dangling categories that resurrect the group.
*/
async function putSessionGroups(params) {
	const { cfg, names, sectionOrder, env = process.env } = params;
	await ensureSessionGroupCatalog(env);
	const normalized = normalizeUniqueTrimmedStringList(names);
	const normalizedSectionOrder = sectionOrder === void 0 ? void 0 : normalizeSidebarSectionOrder(sectionOrder, normalized);
	const result = await mutateSessionGroupCatalog({
		kind: "put",
		names: normalized,
		sectionOrder: normalizedSectionOrder,
		cfg: {
			agents: cfg.agents,
			session: cfg.session
		}
	}, env, (facts) => {
		params.assertCurrent?.();
		for (const [, targets] of facts?.groups ?? []) for (const target of targets) params.assertTargetCurrent?.(target);
	});
	if (result.nonEmpty?.length) throw new SessionGroupNotEmptyError(result.nonEmpty);
	return result.snapshot.groups;
}
/**
* Absorbs a category assigned through sessions.patch so the catalog keeps
* covering every group an operator UI can observe, appended at the end.
*/
async function ensureSessionGroupRegistered(name, env = process.env, assertCurrent) {
	const normalized = normalizeOptionalString(name);
	if (!normalized) return false;
	return (await mutateSessionGroupCatalog({
		kind: "register",
		name: normalized
	}, env, assertCurrent)).changed;
}
async function updateSessionGroupDefaults(name, defaults, env = process.env, assertCurrent, cfg = {}) {
	const normalized = normalizeOptionalString(name);
	if (!normalized) throw new Error("group defaults update requires a non-empty name");
	const result = await mutateSessionGroupCatalog({
		kind: "defaults",
		cfg: {
			agents: cfg.agents,
			session: cfg.session
		},
		name: normalized,
		cwd: normalizeOptionalString(defaults.cwd) ?? null,
		worktree: defaults.worktree
	}, env, (facts) => assertCurrent?.(facts?.groups?.find(([group]) => group === normalized)?.[1]));
	return result.changed ? result.snapshot.defaults : null;
}
/**
* Bulk-updates member session categories across every agent store without
* bumping updatedAt: group maintenance must not reshuffle recency ordering.
*/
async function updateMemberCategories(cfg, from, to, env, assertTargetCurrent) {
	let updated = 0;
	const { stores } = await readSessionGroupMembershipInWorker(cfg, env);
	for (const target of stores) updated += await updateSessionGroupCategoriesInWorker({
		scope: {
			...target,
			sessionKey: "",
			env
		},
		from,
		to,
		assertTargetCurrent
	});
	return updated;
}
async function mutateSessionGroup(params, action) {
	const env = params.env ?? process.env;
	await ensureSessionGroupCatalog(env);
	const from = normalizeOptionalString(params.name);
	const to = action === "rename" ? normalizeOptionalString(params.to) : void 0;
	if (!from || action === "rename" && !to) throw new Error(action === "rename" ? "group rename requires non-empty names" : "group delete requires a non-empty name");
	let updatedSessions = 0;
	if (from !== to) {
		params.assertCurrent?.();
		const prepared = await mutateSessionGroupCatalog({
			kind: "prepare",
			name: from,
			to
		}, env, params.assertCurrent);
		if (prepared.missingName) throw new SessionGroupNotFoundError(prepared.missingName);
		const source = prepared.source;
		try {
			updatedSessions = await updateMemberCategories(params.cfg, from, to, env, params.assertTargetCurrent);
			params.assertCurrent?.();
			const retired = await mutateSessionGroupCatalog({
				kind: "retire",
				name: from,
				to,
				source,
				cfg: {
					agents: params.cfg.agents,
					session: params.cfg.session
				}
			}, env, params.assertCurrent);
			if (retired.missingName) throw new SessionGroupNotFoundError(retired.missingName);
		} catch (error) {
			const message = `${formatErrorMessage(error)}. Group changes may be partial; reload groups and retry the same operation.`;
			if (error instanceof SessionMutationAuthorizationChangedError) throw new SessionMutationAuthorizationChangedError({
				...error.error,
				message
			});
			throw new Error(message, { cause: error });
		}
	}
	return {
		groups: listSessionGroups(env),
		sectionOrder: listSidebarSectionOrder(env),
		updatedSessions
	};
}
async function renameSessionGroup(params) {
	return await mutateSessionGroup(params, "rename");
}
async function deleteSessionGroup(params) {
	return await mutateSessionGroup(params, "delete");
}
//#endregion
//#region src/gateway/session-sharing-target-input.ts
function resolveDirectSessionTargets(method, params) {
	if (method === "sessions.create" || method === "sessions.list") return [];
	const record = asOptionalRecord(params);
	if (!record) return [];
	const candidates = [record.key, record.sessionKey];
	if (method.startsWith("sessions.") && Array.isArray(record.keys)) candidates.push(...record.keys);
	if (Array.isArray(record.sessionKeys)) candidates.push(...record.sessionKeys);
	const agentId = normalizeOptionalString(record.agentId);
	return candidates.flatMap((candidate) => typeof candidate === "string" ? [{
		sessionKey: candidate,
		...agentId ? { agentId } : {}
	}] : []);
}
function resolveDirectIncognitoTargets(method, params) {
	return resolveDirectSessionTargets(method, params).filter((target) => isIncognitoSessionKey(canonicalizeSessionKeyForAgent(target.agentId ?? "main", target.sessionKey)));
}
function readSessionSharingStringParam(params, key) {
	return normalizeOptionalString(asOptionalRecord(params)?.[key]);
}
function preparedGroupTargets(context) {
	const projection = getSessionRowProjection(context);
	if (!projection) throw new Error("Session group membership is unavailable during Gateway startup");
	return projection.sessionGroupTargets();
}
function resolveSessionGroupsPutMutationTargets(context, requestParams) {
	const names = requestParams && typeof requestParams === "object" && "names" in requestParams ? requestParams.names : void 0;
	if (!Array.isArray(names)) return;
	const requested = new Set(normalizeUniqueTrimmedStringList(names));
	const dropped = listSessionGroups().map((group) => group.name).filter((name) => !requested.has(name));
	if (dropped.length === 0) return [];
	const byName = preparedGroupTargets(context);
	return dropped.flatMap((name) => byName.get(name) ?? []);
}
function resolveApprovalSessionTarget(method, params, context) {
	const id = readSessionSharingStringParam(params, "id");
	if (!id) return;
	const kind = readSessionSharingStringParam(params, "kind");
	const manager = method === "plugin.approval.resolve" || kind === "plugin" ? context.pluginApprovalManager : method === "approval.resolve" && kind === "system-agent" ? context.systemAgentApprovalManager : context.execApprovalManager;
	const resolvedId = manager?.lookupLocalApprovalId(id, { includeResolved: true });
	const recordId = resolvedId?.kind === "exact" || resolvedId?.kind === "prefix" ? resolvedId.id : id;
	const request = manager?.getLocalSnapshot(recordId)?.request;
	const sessionKey = readSessionSharingStringParam(request, "sessionKey");
	const agentId = readSessionSharingStringParam(request, "agentId");
	return sessionKey ? {
		sessionKey,
		...agentId ? { agentId } : {}
	} : void 0;
}
/** Realtime creates authorize their effective default; transcription stays sessionless. */
function resolveTalkSessionTargetInput(method, params, connId) {
	if (method === "talk.session.steer") {
		const sessionId = readSessionSharingStringParam(params, "sessionId");
		const retained = sessionId ? resolveUnifiedTalkSessionTarget(sessionId, connId) : void 0;
		return retained ? {
			kind: "relay",
			...retained
		} : void 0;
	}
	if (method !== "talk.client.create" && method !== "talk.client.toolCall" && method !== "talk.session.create" && method !== "talk.client.transcript" && method !== "talk.client.close" && method !== "talk.client.steer") return;
	const sessionKey = readSessionSharingStringParam(params, "sessionKey");
	if (sessionKey) return {
		kind: "request",
		sessionKey
	};
	if (method === "talk.client.create") return { kind: "request" };
	if (method === "talk.session.create" && (readSessionSharingStringParam(params, "mode") ?? "realtime") === "realtime" && readSessionSharingStringParam(params, "transport") !== "managed-room") return { kind: "request" };
}
function resolveSessionMutationTargets(params) {
	if (params.method === "sessions.patchMany") {
		const targets = params.requestParams && typeof params.requestParams === "object" && "targets" in params.requestParams ? params.requestParams.targets : void 0;
		return Array.isArray(targets) ? targets.slice(0, 101).flatMap((target) => {
			const sessionKey = readSessionSharingStringParam(target, "key");
			const agentId = readSessionSharingStringParam(target, "agentId");
			return sessionKey ? [{
				sessionKey,
				...agentId ? { agentId } : {}
			}] : [];
		}) : void 0;
	}
	if (params.method === "sessions.groups.rename" || params.method === "sessions.groups.delete" || params.method === "sessions.groups.update") {
		const groupName = readSessionSharingStringParam(params.requestParams, "name");
		return groupName ? [...preparedGroupTargets(params.context).get(groupName) ?? []] : void 0;
	}
	if (params.method === "sessions.groups.put") return resolveSessionGroupsPutMutationTargets(params.context, params.requestParams);
	if (isApprovalSessionTargetMethod(params.method)) {
		const target = resolveApprovalSessionTarget(params.method, params.requestParams, params.context);
		return target ? [target] : void 0;
	}
	const requestedAgentId = readSessionSharingStringParam(params.requestParams, "agentId");
	const directTargets = [];
	for (const field of sessionMutationTargetFields(params.method)) {
		const sessionKey = readSessionSharingStringParam(params.requestParams, field);
		if (!sessionKey) continue;
		const parentUsesRequestedAgent = field !== "parentSessionKey" || ["global", "unknown"].includes(sessionKey.toLowerCase());
		directTargets.push({
			sessionKey,
			...requestedAgentId && parentUsesRequestedAgent ? { agentId: requestedAgentId } : {}
		});
	}
	if (directTargets.length) return directTargets;
	if (params.method === "board.event" || params.method === "board.action") {
		const ticket = readSessionSharingStringParam(params.requestParams, "ticket");
		const claims = ticket ? resolveAuthorizedBoardViewTicketClaims(ticket, { gatewayContext: params.context }) : void 0;
		if (!claims || requestedAgentId && requestedAgentId !== claims.agentId) return;
		return [{
			sessionKey: claims.sessionKey,
			...claims.agentId ? { agentId: claims.agentId } : {}
		}];
	}
	if (params.method !== "sessions.abort") return;
	const runId = readSessionSharingStringParam(params.requestParams, "runId");
	const run = runId ? params.context.chatAbortControllers.get(runId) : void 0;
	return run ? [{
		sessionKey: run.sessionKey,
		...run.agentId ? { agentId: run.agentId } : {}
	}] : void 0;
}
//#endregion
//#region src/gateway/session-sharing-target-read.ts
const readProjectedSessionMutationTarget = (targetRef, cfg, projection) => {
	const agent = resolveRequestedSessionAgentId(cfg, targetRef.sessionKey, targetRef.agentId);
	if (!agent.ok) return { status: "unavailable" };
	const query = {
		key: targetRef.sessionKey,
		agentId: agent.agentId
	};
	const state = projection.sharingTargetState(query);
	if (state.status !== "ready") return { status: state.status === "pending" ? "pending" : "unavailable" };
	const readSource = projection.readSource({
		...query,
		storePath: state.target.storePath
	});
	if (!readSource || readSource.path !== state.target.storePath || typeof readSource.databaseIdentity !== "string") return { status: "unavailable" };
	assertExistingDatabaseIdentity(readSource.path, `file:${readSource.databaseIdentity}`, readSource.databaseBirthtime);
	return {
		status: "ready",
		target: {
			...state.target,
			readSource
		}
	};
};
function readSessionMutationTarget(params) {
	const input = resolveRequestedSessionAgentInput(params.targetRef.sessionKey, params.targetRef.agentId);
	if (!input.ok) return { error: input.error };
	try {
		const projection = getSessionRowProjection(params.context);
		const projected = projection && readProjectedSessionMutationTarget(params.targetRef, params.cfg, projection);
		if (projected?.status === "ready" && (!params.expectedTarget || projected.target.storePath === params.expectedTarget.storePath)) return {
			target: projected.target,
			preparedReadSource: projected.target.readSource,
			projection
		};
		if (params.sessionRowRead && resolveDirectSessionTargets(params.method, params.requestParams).some((direct) => direct.sessionKey === params.targetRef.sessionKey && direct.agentId === params.targetRef.agentId)) {
			const agent = resolveRequestedSessionAgentId(params.sessionRowRead.state.cfg, params.targetRef.sessionKey, params.targetRef.agentId);
			if (!agent.ok) return { error: agent.error };
			const row = params.sessionRowRead.describe({
				key: params.targetRef.sessionKey,
				agentId: agent.agentId
			});
			if (!row && params.sessionScope === "operator.sessions.read") return { error: hiddenSessionNotFound(params.targetRef.sessionKey) };
			const readSource = row && params.sessionRowRead.readSource(row);
			return {
				preparedReadSource: readSource,
				target: row?.storedEntry ? {
					agentId: row.agentId,
					canonicalKey: row.key,
					storeKey: row.key,
					storeKeys: [row.key],
					storePath: row.storeTarget.storePath,
					readSource,
					entry: row.storedEntry
				} : null
			};
		}
		return { target: resolveSessionSharingTarget({
			cfg: params.cfg,
			sessionKey: params.targetRef.sessionKey,
			agentId: input.value,
			...params.lookupCaches(),
			exactRead: params.targetCount === 1
		}) };
	} catch (error) {
		if (error instanceof AgentSelectionRequiredError) return { error: errorShape(ErrorCodes.INVALID_REQUEST, error.message) };
		throw error;
	}
}
//#endregion
//#region src/talk/agent-target.ts
/** Agent-scoped keys own their Talk session; legacy/unscoped aliases use the Talk target. */
function resolveTalkSessionAgentId(config, sessionKey) {
	const normalizedSessionKey = sessionKey ?? void 0;
	const scopedAgentId = parseAgentSessionKey(normalizedSessionKey)?.agentId;
	if (scopedAgentId) return normalizeAgentId(scopedAgentId);
	return resolvePersistedSessionStoreOwnerForKey(config, normalizedSessionKey).kind === "none" ? resolveAmbientOwnerAgentId(config, config.talk?.agentId, {
		surface: "Talk session ownership",
		hint: "Set talk.agentId to the agent that owns unscoped Talk sessions."
	}) : resolveSessionAgentId({
		config,
		sessionKey: normalizedSessionKey
	});
}
//#endregion
//#region src/gateway/talk/session-target.ts
function requirePreparedTalkSessionTarget(target) {
	if (!target) throw new Error("Talk session target was not prepared by the Gateway");
	return target;
}
/** Resolve Talk ownership before aliases collapse, then retain the exact storage target. */
function prepareTalkSessionTarget(cfg, requestedSessionKey) {
	const requestedKey = normalizeOptionalString(requestedSessionKey);
	const owner = resolveTalkSessionAgentId(cfg, requestedKey ?? "main");
	const sessionKey = requestedKey ?? resolveAgentMainSessionKey({
		cfg,
		agentId: owner
	});
	const { agentId, canonicalKey, storePath } = resolveTalkSessionStorageTarget(cfg, sessionKey, owner);
	return Object.freeze({
		agentId,
		sessionKey,
		canonicalKey,
		storePath
	});
}
/** Revalidate a retained owner without consulting the current ambient Talk default. */
function assertTalkSessionStorageTarget(cfg, target) {
	const current = resolveTalkSessionStorageTarget(cfg, target.canonicalKey, target.agentId);
	if (current.agentId !== target.agentId || current.canonicalKey !== target.canonicalKey || current.storePath !== target.storePath) throw new Error("Talk session storage target changed; retry the request");
}
function resolveTalkSessionStorageTarget(cfg, sessionKey, owner) {
	const { agentId, canonicalKey } = resolveSessionStoreIdentity({
		cfg,
		sessionKey,
		agentId: resolveConfiguredAgentId(cfg, owner)
	});
	return {
		agentId,
		canonicalKey,
		storePath: resolveGatewaySessionStoreTargetWithStore({
			cfg,
			key: canonicalKey,
			agentId,
			readOnly: true,
			exactRead: true
		}).storePath
	};
}
//#endregion
//#region src/gateway/session-sharing.ts
function sessionMutationTargetChanged(method, sessionKey) {
	return new SessionMutationAuthorizationChangedError(errorShape(ErrorCodes.INVALID_REQUEST, `session changed before ${method}; retry the request`, { details: {
		code: "SESSION_MUTATION_AUTHORIZATION_CHANGED",
		method,
		sessionKey
	} }));
}
function expectedSessionMutationTargetError(expected, target, method) {
	return expected && (!target || target.agentId !== expected.agentId || target.canonicalKey !== expected.sessionKey || target.storePath !== expected.storePath || target.entry.sessionId?.trim() !== expected.sessionId) ? sessionMutationTargetChanged(method, expected.sessionKey).error : null;
}
const VISIBILITY_AUTHORIZED_METHODS = /* @__PURE__ */ new Set(["sessions.assignOwner"]);
function resolveSessionMutationAuthorization(params) {
	const authorizesAgentRun = isAgentRunStartMethod(params.method, params.requestParams);
	const authorizesRead = resolveSessionMethodScope(params.method, params.requestParams) === "operator.sessions.read";
	const bindsProgressLifecycle = params.method === "progressCard.put" || params.method === "progressCard.refresh";
	const adminBypass = isGatewayAdmin(params.client) && !authorizesAgentRun;
	if (adminBypass && !bindsProgressLifecycle && !params.expectedTarget) return { error: null };
	if (!adminBypass && isGatewayClientProfilePending(params.client) && isSessionProfileDependentMethod(params.method)) return { error: authenticatedProfileUnavailableError() };
	if (params.method === "sessions.describe") {
		const projection = params.sessionRowRead ?? getSessionRowProjection(params.context);
		if (projection) {
			const { cfg, policyConfig } = projection.state;
			for (const target of resolveDirectSessionTargets(params.method, params.requestParams)) {
				const agent = resolveRequestedSessionAgentId(cfg, target.sessionKey, target.agentId);
				if (!agent.ok) return { error: agent.error };
				const row = projection.describe({
					key: target.sessionKey,
					agentId: agent.agentId
				});
				const sharing = prepareProjectedSessionSharing({
					cfg: policyConfig,
					client: params.client,
					isMember: (_target, identityId) => row?.membership.has(identityId) ?? false
				});
				if (row && gatewayClientSessionCreator(params.client) && sharing.sessionCap === "none" && !sharing.isCreator(row.entry.createdActor)) return { error: hiddenSessionNotFound(target.sessionKey) };
			}
		}
		return { error: null };
	}
	if (params.method === "sessions.list") return { error: null };
	let cachedCfg;
	const getCfg = () => cachedCfg ??= params.context.getRuntimeConfig();
	const getPolicyConfig = () => params.context.getCommittedRuntimeConfig?.() ?? getCfg();
	const authorizeTargetAccess = (cfg, target, projection) => {
		const identity = sharingIdentity(params.client, resolveGatewayOperatorRoleActor(params.client));
		return authorizesRead ? createSessionListEntryFilter({
			cfg,
			client: params.client
		})?.(target.storeKey, target.entry) === false ? hiddenSessionNotFound(target.canonicalKey) : null : authorizeSessionSharingTarget({
			cfg,
			client: params.client,
			target,
			isMember: projection ? Boolean(identity && projection.hasMembership(target.storePath, target.storeKey, identity.id)) : void 0
		});
	};
	const createLookupCaches = () => ({
		storeCache: /* @__PURE__ */ new Map(),
		targetDiscoveryCache: /* @__PURE__ */ new Map()
	});
	let lookupCaches;
	const resolveAuthorizedTarget = (targetRef, targetCount) => readSessionMutationTarget({
		...params,
		cfg: getCfg(),
		targetRef,
		targetCount,
		lookupCaches: () => lookupCaches ??= createLookupCaches()
	});
	let talkInput;
	let talkSessionTarget;
	try {
		talkInput = resolveTalkSessionTargetInput(params.method, params.requestParams, params.client?.connId);
		if (talkInput?.kind === "relay") {
			assertTalkSessionStorageTarget(getCfg(), talkInput.target);
			talkSessionTarget = talkInput.target;
		} else talkSessionTarget = talkInput && prepareTalkSessionTarget(getCfg(), talkInput.sessionKey);
	} catch (error) {
		return { error: errorShape(ErrorCodes.INVALID_REQUEST, String(error instanceof Error ? error.message : error)) };
	}
	const talkTargets = talkSessionTarget ? [{
		sessionKey: talkSessionTarget.canonicalKey,
		agentId: talkSessionTarget.agentId
	}] : void 0;
	const directTargets = talkTargets ?? resolveDirectSessionTargets(params.method, params.requestParams);
	const hidesForeignSessions = !adminBypass && directTargets.length > 0 && gatewayClientSessionCreator(params.client) && operatorSessionCap(params.client, getPolicyConfig()) === "none";
	const protectedTargets = hidesForeignSessions ? directTargets : talkTargets?.filter((target) => isIncognitoSessionKey(target.sessionKey)) ?? resolveDirectIncognitoTargets(params.method, params.requestParams);
	for (const targetRef of protectedTargets) {
		const resolved = resolveAuthorizedTarget(targetRef, protectedTargets.length);
		if ("error" in resolved) return { error: resolved.error };
		const target = resolved.target;
		const error = authorizeIncognitoSessionTarget({
			client: params.client,
			sessionKey: targetRef.sessionKey,
			target
		});
		if (error) return { error };
		if (hidesForeignSessions && target && !isSessionCreatorProfile(target.entry.createdActor, params.client?.authenticatedUserProfile?.profileId)) return { error: hiddenSessionNotFound(targetRef.sessionKey) };
	}
	const bindsOwnProfile = params.sessionScope === "operator.sessions.write";
	const actor = resolveGatewayOperatorRoleActor(params.client);
	const ownSessionProfileId = bindsOwnProfile && actor?.kind === "operator" ? actor.profileId : void 0;
	const ownProfileError = bindsOwnProfile ? ownSessionProfileId ? authorizeOwnSessionMutation({
		client: params.client,
		target: null,
		expectedProfileId: ownSessionProfileId
	}) : authenticatedProfileUnavailableError() : null;
	if (ownProfileError) return { error: ownProfileError };
	const requestedCreateKey = params.requestParams && typeof params.requestParams === "object" && "key" in params.requestParams ? normalizeOptionalString(params.requestParams.key) : void 0;
	const permitsGeneratedSession = params.method === "sessions.create" && !requestedCreateKey;
	const targetRefs = talkTargets ?? resolveSessionMutationTargets({
		method: params.method,
		requestParams: params.requestParams,
		context: params.context
	}) ?? (bindsOwnProfile && !isRequiredSessionTargetMethod(params.method) ? [] : void 0);
	if (params.expectedTarget && targetRefs?.length !== 1) return { error: sessionMutationTargetChanged(params.method, params.expectedTarget.sessionKey).error };
	if (!targetRefs) {
		if (isRequiredSessionTargetMethod(params.method)) return { error: errorShape(ErrorCodes.INVALID_REQUEST, "session mutation target is unavailable", { details: {
			code: "SESSION_MUTATION_TARGET_REQUIRED",
			method: params.method
		} }) };
		return { error: null };
	}
	if (talkSessionTarget && authorizesAgentRun) {
		const error = authorizeGatewaySessionCreation({
			cfg: getCfg(),
			client: params.client,
			agentId: talkSessionTarget.agentId
		});
		if (error) return { error };
	}
	const authorizedTargets = [];
	for (const targetRef of targetRefs) {
		const resolved = resolveAuthorizedTarget(targetRef, targetRefs.length);
		if ("error" in resolved) return { error: resolved.error };
		const target = resolved.target;
		if (bindsOwnProfile && (params.method === "sessions.patch" || params.method === "sessions.patchMany") && !target) return { error: hiddenSessionNotFound(targetRef.sessionKey) };
		const error = expectedSessionMutationTargetError(params.expectedTarget, target, params.method) ?? authorizeOwnSessionMutation({
			client: params.client,
			target,
			expectedProfileId: ownSessionProfileId
		}) ?? (target && authorizesAgentRun ? authorizeSessionAgentRun({
			cfg: getPolicyConfig(),
			client: params.client,
			target
		}) : null) ?? authorizeIncognitoSessionTarget({
			client: params.client,
			sessionKey: targetRef.sessionKey,
			target
		}) ?? (target && !(VISIBILITY_AUTHORIZED_METHODS.has(params.method) && (operatorSessionCap(params.client, getPolicyConfig()) ?? "write") === "write") ? authorizeTargetAccess(getPolicyConfig(), target, resolved.projection) : null);
		if (error) return { error };
		authorizedTargets.push({
			...targetRef,
			projection: resolved.projection,
			resolved: target ? {
				agentId: target.agentId,
				canonicalKey: target.canonicalKey,
				storeKey: target.storeKey,
				storePath: target.storePath,
				readSource: resolved.preparedReadSource
			} : null,
			sessionId: target?.entry.sessionId?.trim() || null,
			...!target && ["sessions.send", "sessions.create"].includes(params.method) ? { absentTarget: resolveGatewaySessionStoreTarget({
				cfg: getCfg(),
				key: targetRef.sessionKey,
				agentId: targetRef.agentId
			}) } : {},
			...bindsProgressLifecycle || bindsOwnProfile ? { lifecycleRevision: target?.entry.lifecycleRevision } : {}
		});
	}
	return {
		error: null,
		authorization: (() => {
			const targetChanged = (sessionKey) => sessionMutationTargetChanged(params.method, sessionKey);
			const assertTalkTargetCurrent = (cfg) => {
				if (!talkInput || !talkSessionTarget) return;
				let current;
				try {
					if (talkInput.kind === "relay") {
						if (!talkInput.isCurrent()) throw targetChanged(talkSessionTarget.sessionKey);
						assertTalkSessionStorageTarget(cfg, talkSessionTarget);
						current = talkSessionTarget;
					} else current = prepareTalkSessionTarget(cfg, talkInput.sessionKey);
				} catch {
					throw targetChanged(talkSessionTarget.sessionKey);
				}
				if (current.agentId !== talkSessionTarget.agentId || current.sessionKey !== talkSessionTarget.sessionKey || current.canonicalKey !== talkSessionTarget.canonicalKey || current.storePath !== talkSessionTarget.storePath) throw targetChanged(talkSessionTarget.sessionKey);
				const error = authorizesAgentRun && authorizeGatewaySessionCreation({
					cfg: params.context.getCommittedRuntimeConfig?.() ?? cfg,
					client: params.client,
					agentId: current.agentId
				});
				if (error) throw new SessionMutationAuthorizationChangedError(error);
			};
			const assertTargetCurrent = (targetRef, expected, currentCfg, currentLookupCaches, ensuredSessionId) => {
				if (expected?.absentTarget && !expected.created) {
					const currentRoute = resolveGatewaySessionStoreTarget({
						cfg: currentCfg,
						key: targetRef.sessionKey,
						agentId: targetRef.agentId
					});
					if (currentRoute.agentId !== expected.absentTarget.agentId || currentRoute.canonicalKey !== expected.absentTarget.canonicalKey || currentRoute.storePath !== expected.absentTarget.storePath) throw targetChanged(targetRef.sessionKey);
				}
				if (expected?.projection && getSessionRowProjection(params.context) !== expected.projection) throw targetChanged(targetRef.sessionKey);
				const projected = expected?.projection ? readProjectedSessionMutationTarget(targetRef, currentCfg, expected.projection) : void 0;
				if (expected?.projection && projected?.status === "unavailable") throw targetChanged(targetRef.sessionKey);
				const current = projected?.status === "ready" ? projected.target : resolveSessionSharingTarget({
					cfg: currentCfg,
					sessionKey: targetRef.sessionKey,
					agentId: targetRef.agentId,
					...currentLookupCaches,
					exactRead: Boolean(expected?.resolved?.readSource) || !currentLookupCaches || authorizedTargets.length === 1
				});
				const ensuredTarget = talkSessionTarget && authorizesAgentRun && expected?.sessionId === null && ensuredSessionId ? {
					agentId: talkSessionTarget.agentId,
					canonicalKey: talkSessionTarget.canonicalKey,
					storeKey: talkSessionTarget.canonicalKey,
					storePath: talkSessionTarget.storePath
				} : void 0;
				const expectedResolved = expected?.resolved ?? ensuredTarget;
				const expectedReadSource = expected?.resolved?.readSource;
				const expectedSessionId = expected?.sessionId ?? (ensuredTarget ? ensuredSessionId : null);
				if (!(expected !== void 0 && (current === null ? expected.resolved === null && !ensuredSessionId : expectedResolved !== void 0 && expectedResolved !== null && current.agentId === expectedResolved.agentId && current.canonicalKey === expectedResolved.canonicalKey && current.storeKey === expectedResolved.storeKey && (expectedReadSource ? current.readSource?.databaseIdentity === expectedReadSource.databaseIdentity && current.readSource.databaseBirthtime === expectedReadSource.databaseBirthtime && current.readSource.agentId === expectedReadSource.agentId : current.storePath === expectedResolved.storePath) && (current.entry.sessionId?.trim() || null) === expectedSessionId && (!(bindsProgressLifecycle || bindsOwnProfile || expected.created) || current.entry.lifecycleRevision === expected.lifecycleRevision)))) throw targetChanged(targetRef.sessionKey);
				const ownershipError = authorizeOwnSessionMutation({
					client: params.client,
					target: current,
					expectedProfileId: ownSessionProfileId
				});
				if (ownershipError) throw new SessionMutationAuthorizationChangedError(ownershipError);
				if (!current) return;
				const policyConfig = params.context.getCommittedRuntimeConfig?.() ?? currentCfg;
				const visibilityAuthorized = VISIBILITY_AUTHORIZED_METHODS.has(params.method) && (operatorSessionCap(params.client, policyConfig) ?? "write") === "write";
				const error = (authorizesAgentRun ? authorizeSessionAgentRun({
					cfg: policyConfig,
					client: params.client,
					target: current
				}) : null) ?? authorizeIncognitoSessionTarget({
					client: params.client,
					sessionKey: targetRef.sessionKey,
					target: current
				}) ?? (visibilityAuthorized ? null : authorizeTargetAccess(policyConfig, current, projected?.status === "ready" ? expected?.projection : void 0));
				if (error) throw new SessionMutationAuthorizationChangedError(error);
			};
			let createdSessionRecorded = false;
			return {
				...talkSessionTarget ? { talkSessionTarget } : {},
				...authorizedTargets.length === 1 && authorizedTargets[0]?.resolved && authorizedTargets[0].sessionId ? { admittedTarget: Object.freeze({
					agentId: authorizedTargets[0].resolved.agentId,
					sessionKey: authorizedTargets[0].resolved.canonicalKey,
					sessionId: authorizedTargets[0].sessionId
				}) } : {},
				recordCreatedSession: (created) => {
					if (createdSessionRecorded) return;
					let expected = authorizedTargets.find((target) => target.sessionId === null && target.absentTarget?.agentId === created.agentId && target.absentTarget.canonicalKey === created.sessionKey && target.absentTarget.storePath === created.storePath);
					if (!expected && permitsGeneratedSession) {
						expected = {
							sessionKey: created.sessionKey,
							agentId: created.agentId,
							resolved: null,
							sessionId: null
						};
						authorizedTargets.push(expected);
					}
					if (!expected) return;
					createdSessionRecorded = true;
					expected.resolved = {
						agentId: created.agentId,
						canonicalKey: created.sessionKey,
						storeKey: created.sessionKey,
						storePath: created.storePath
					};
					expected.sessionId = created.sessionId;
					expected.lifecycleRevision = created.lifecycleRevision;
					expected.created = true;
				},
				assertCurrent: () => {
					const error = ownSessionProfileId ? authorizeOwnSessionMutation({
						client: params.client,
						target: null,
						expectedProfileId: ownSessionProfileId
					}) : null;
					if (error) throw new SessionMutationAuthorizationChangedError(error);
					const currentCfg = params.context.getRuntimeConfig();
					assertTalkTargetCurrent(currentCfg);
					const currentLookupCaches = createLookupCaches();
					for (const authorized of authorizedTargets) assertTargetCurrent(authorized, authorized, currentCfg, currentLookupCaches);
				},
				assertTargetCurrent: (targetRef) => {
					const sessionKey = normalizeOptionalString(targetRef.sessionKey);
					const agentId = normalizeOptionalString(targetRef.agentId);
					const normalizedTarget = {
						sessionKey: sessionKey ?? targetRef.sessionKey,
						agentId
					};
					const expected = authorizedTargets.find((target) => target.sessionKey === sessionKey && target.agentId === agentId);
					const currentCfg = params.context.getRuntimeConfig();
					assertTalkTargetCurrent(currentCfg);
					assertTargetCurrent(normalizedTarget, expected, currentCfg, void 0, targetRef.ensuredSessionId);
				}
			};
		})()
	};
}
//#endregion
export { invalidateSessionSharingSnapshot as C, prepareSessionSharing as S, updateSessionGroupDefaults as _, resolveTalkSessionAgentId as a, createSessionListEntryFilter as b, SessionGroupNotEmptyError as c, ensureSessionGroupRegistered as d, listSessionGroupDefaults as f, renameSessionGroup as g, putSessionGroups as h, requirePreparedTalkSessionTarget as i, SessionGroupNotFoundError as l, listSidebarSectionOrder as m, assertTalkSessionStorageTarget as n, resolveDirectIncognitoTargets as o, listSessionGroups as p, prepareTalkSessionTarget as r, resolveDirectSessionTargets as s, resolveSessionMutationAuthorization as t, deleteSessionGroup as u, canReceiveSessionEvent as v, prepareProjectedSessionSharing as x, createProfileSessionEntryFilter as y };
