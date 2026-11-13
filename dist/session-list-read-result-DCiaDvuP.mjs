import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { a as tryResolveSessionCompatibilityOwnerAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { T as gatewayClientSessionCreator, n as authorizeIncognitoSessionTarget, v as resolveSessionVisibility } from "./session-sharing-policy-BALdNo4L.mjs";
import { o as projectSessionParticipant, u as projectSessionProfileInvolvement } from "./session-identity-projection-BpSB0ikl.mjs";
import { L as projectGatewaySessionActiveRun, n as withReadySessionRows } from "./session-row-prepared-read-KCtcAa3e.mjs";
import { n as prepareOperatorModelPresentation } from "./operator-model-presentation-BiKS5bEN.mjs";
import { x as prepareProjectedSessionSharing } from "./session-sharing-Bhe-fXzH.mjs";
//#region src/gateway/session-row-presentation.ts
function toProjectedSessionSharingTarget(record) {
	return {
		agentId: record.agentId,
		canonicalKey: record.key,
		entry: record.entry,
		storeKey: record.key,
		storeKeys: [record.key],
		storePath: record.storeTarget.storePath
	};
}
/** Sharing decisions remain recipient-local; only their identical presented results are reused. */
function prepareSessionRowPublication(projection, now) {
	let context;
	let revision;
	let rows = /* @__PURE__ */ new WeakMap();
	let subagentRuns;
	const view = (current) => {
		const sharingRevision = projection.sharingRevision;
		if (context !== current || revision !== sharingRevision || sharingRevision === void 0) {
			context = current;
			revision = sharingRevision;
			rows = /* @__PURE__ */ new WeakMap();
			subagentRuns = current.subagentRuns.atTime(now);
		}
		return {
			rows,
			subagentRuns
		};
	};
	return (client, projectRun) => prepareProjectedSessionPresentation(projection, client, now, projectRun, view);
}
/** Recreate after yields: the caller identity and clock belong to one synchronous presentation. */
function prepareProjectedSessionPresentation(projection, client, now = Date.now(), projectRun, publication) {
	const { cfg, policyConfig, rowContext } = projection.state;
	const models = client === void 0 ? void 0 : prepareOperatorModelPresentation({
		cfg,
		policyConfig,
		client
	});
	const shared = publication?.(rowContext);
	const publicationRows = shared?.rows;
	const subagentRuns = shared?.subagentRuns ?? rowContext.subagentRuns.atTime(now);
	const active = (key, entry, agentId) => projectRun?.({
		requestedKey: key,
		canonicalKey: key,
		sessionId: entry.sessionId,
		agentId,
		defaultAgentId: tryResolveSessionCompatibilityOwnerAgentId(cfg, key)
	});
	const target = (query) => {
		const record = projection.describe(query);
		return record ? toProjectedSessionSharingTarget(record) : null;
	};
	const sharing = prepareProjectedSessionSharing({
		cfg: policyConfig,
		client: client ?? null,
		isMember: (value, identityId) => projection.readMembership({
			agentId: value.agentId,
			key: value.storeKey,
			storePath: value.storePath
		})?.has(identityId) ?? false
	});
	const profile = gatewayClientSessionCreator(client ?? null);
	const profiles = rowContext.userProfileIdentityById;
	const profileId = profile ? projectSessionParticipant({
		type: "profile",
		id: profile.id
	}, profiles).identity.id : void 0;
	const viewer = (value) => ({
		visibility: resolveSessionVisibility(value.entry),
		...profileId && !value.entry.incognito && !isIncognitoSessionKey(value.canonicalKey) ? { hiddenFromInvolvingMe: projectSessionProfileInvolvement(value.entry, profileId, profiles)?.hidden ?? false } : {},
		sharingRole: sharing.roleForTarget(value)
	});
	const present = (captured, options = {}) => {
		const record = projection.describe({
			agentId: captured.agentId,
			key: captured.key,
			storePath: captured.storeTarget.storePath
		}, captured);
		if (!record) return null;
		const run = active(record.key, record.entry, record.agentId);
		let excludedChildKeys = options.excludedChildKeys;
		if (!excludedChildKeys && client !== void 0) {
			let excluded;
			for (const { key, entry } of record.materialized.source.childLinks ?? []) if (sharing.entryFilter?.(key, entry) === false) (excluded ??= /* @__PURE__ */ new Set()).add(key);
			excludedChildKeys = excluded;
		}
		const sourceSwarm = record.materialized.row.swarm;
		let excludedSwarmKeys;
		for (const group of sourceSwarm?.groups ?? []) for (const { sessionKey } of group.children ?? []) if (excludedChildKeys?.has(sessionKey) || client !== void 0 && projection.selectEntries({ key: sessionKey }).some((child) => sharing.entryFilter?.(child.key, child.entry) === false)) (excludedSwarmKeys ??= /* @__PURE__ */ new Set()).add(sessionKey);
		let published = publicationRows?.get(record);
		if (publicationRows) {
			const facts = [
				record.materialized,
				record.materializedSequence,
				record.profileRevision,
				record.subagentRevision,
				record.lastMessagePreview,
				record.fallbackModel,
				sourceSwarm
			];
			const previous = published?.facts;
			if (!previous || !facts.every((fact, index) => fact === previous[index])) {
				published = {
					facts,
					views: /* @__PURE__ */ new Map(),
					target: toProjectedSessionSharingTarget(record)
				};
				publicationRows.set(record, published);
			}
		}
		const views = published?.views;
		const value = published?.target ?? toProjectedSessionSharingTarget(record);
		const viewerFacts = client === void 0 ? void 0 : viewer(value);
		const preparedFacts = record.facts?.present();
		const canEnsure = client !== void 0 && preparedFacts?.activitySummary ? !authorizeIncognitoSessionTarget({
			client: client ?? null,
			sessionKey: value.canonicalKey,
			target: value
		}) && !sharing.authorizeTarget(value) : void 0;
		const signature = views && JSON.stringify([
			options.includeDerivedTitles,
			options.includeLastMessage,
			options.includeActivitySummary,
			excludedChildKeys?.size ? [...excludedChildKeys] : void 0,
			excludedSwarmKeys && [...excludedSwarmKeys],
			run,
			viewerFacts,
			preparedFacts,
			canEnsure
		]);
		const cached = signature === void 0 ? void 0 : views?.get(signature);
		const projectModels = (row) => {
			const projected = models?.session(row) ?? row;
			if (projected === row || !views || signature === void 0) return projected;
			const modelSignature = signature + JSON.stringify([
				projected.modelProvider,
				projected.model,
				projected.activeModelProvider,
				projected.activeModel,
				projected.contextBudgetStatus
			]);
			const existing = views.get(modelSignature);
			if (existing) return existing;
			views.set(modelSignature, projected);
			return projected;
		};
		if (cached) return projectModels(cached);
		const row = projection.present(record, {
			...options,
			now,
			subagentRuns,
			active: run?.active,
			excludedChildKeys,
			preparedFacts
		});
		if (sourceSwarm) {
			row.swarm = {
				...sourceSwarm,
				groups: []
			};
			for (const group of sourceSwarm.groups) row.swarm.groups.push({
				...group,
				children: group.children?.filter(({ sessionKey }) => !excludedSwarmKeys?.has(sessionKey))
			});
		}
		if (run) Object.assign(row, projectGatewaySessionActiveRun(run, row.status), run.runIds === void 0 ? {} : { activeRunIds: run.runIds });
		if (options.includeActivitySummary === false) row.activitySummary = void 0;
		if (viewerFacts) {
			Object.assign(row, viewerFacts);
			if (row.activitySummary) row.activitySummary = {
				...row.activitySummary,
				canEnsure: canEnsure === true
			};
		}
		if (signature !== void 0) views?.set(signature, row);
		return projectModels(row);
	};
	return {
		rowContext: {
			...rowContext,
			subagentRuns
		},
		active,
		sharing,
		target,
		present,
		snapshot(query, options = {}) {
			const record = projection.describe(query);
			return record ? {
				row: present(record, options),
				lifecycleRunId: record.entry.lifecycleRunId
			} : { row: null };
		},
		authorizeDescription(query) {
			return authorizeIncognitoSessionTarget({
				client: client ?? null,
				sessionKey: query.key,
				target: isIncognitoSessionKey(query.key) ? null : target(query)
			});
		}
	};
}
//#endregion
//#region src/gateway/session-list-read-result.ts
const reads = /* @__PURE__ */ new WeakMap();
function bindSessionListRowRead(row, read) {
	reads.set(row, {
		projection: new WeakRef(read.projection),
		client: read.client,
		agentId: read.record.agentId,
		key: read.record.key,
		storePath: read.record.storeTarget.storePath,
		storeAgentId: read.record.storeTarget.agentId,
		generation: read.record.generation,
		sessionId: read.record.entry.sessionId,
		lifecycleRevision: read.record.entry.lifecycleRevision
	});
}
/** Explicit tool enrichment reads the selected physical owner, never a wire-provided path. */
async function readSessionListRowTitleFields(row, requireOwner) {
	const selected = reads.get(row);
	if (!selected) {
		if (requireOwner) throw new Error("Session enrichment requires its Gateway or embedded read owner");
		return;
	}
	if (!await withCurrentSessionListRows([row], ([allowed]) => allowed, true)) return null;
	const { readSessionTitleFieldsFromTranscriptAsync } = await import("./session-transcript-title-reader-Bce0j4ga.mjs");
	return await readSessionTitleFieldsFromTranscriptAsync({
		agentId: selected.storeAgentId,
		sessionKey: selected.key,
		sessionId: selected.sessionId,
		storePath: selected.storePath,
		sessionEntry: { sessionId: selected.sessionId }
	});
}
/** Finalize buffered enrichment inside one current owner read, without a later await. */
async function withCurrentSessionListRows(rows, consume, requireOwner) {
	if (rows.length === 0) return consume([]);
	const captured = rows.map((row) => reads.get(row));
	if (!requireOwner && captured.every((read) => !read)) return consume(rows.map(() => true));
	const selected = captured.map((read) => {
		if (!read) throw new Error("Session enrichment requires its Gateway or embedded read owner");
		return read;
	});
	const projection = selected[0].projection.deref();
	if (!projection || selected.some((read) => read.projection.deref() !== projection)) throw new Error("Gateway changed while preparing session inventory; retry the request");
	return withReadySessionRows(projection, () => selected.map(({ agentId, key }) => ({
		agentId,
		key
	})), (read) => {
		const presentations = /* @__PURE__ */ new Map();
		return consume(selected.map((selectedRead) => {
			const { agentId, key, client } = selectedRead;
			const query = {
				agentId,
				key
			};
			const record = read.describe(query);
			if (!record || record.agentId !== agentId || record.key !== key || record.storeTarget.storePath !== selectedRead.storePath || record.storeTarget.agentId !== selectedRead.storeAgentId || record.generation !== selectedRead.generation || record.entry.sessionId !== selectedRead.sessionId || record.entry.lifecycleRevision !== selectedRead.lifecycleRevision) return false;
			if (client === void 0) return true;
			let presentation = presentations.get(client);
			if (!presentation) {
				presentation = prepareProjectedSessionPresentation(read, client);
				presentations.set(client, presentation);
			}
			return !presentation.authorizeDescription(query) && presentation.sharing.entryFilter?.(record.key, record.entry) !== false;
		}));
	});
}
//#endregion
export { prepareSessionRowPublication as a, prepareProjectedSessionPresentation as i, readSessionListRowTitleFields as n, withCurrentSessionListRows as r, bindSessionListRowRead as t };
