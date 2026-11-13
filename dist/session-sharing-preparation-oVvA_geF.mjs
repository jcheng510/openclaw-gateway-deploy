import { a as readDatabasePathIdentitySync } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { n as ok } from "./result-BQGgYouL.mjs";
import { a as matchesAgentDatabaseReadCandidatePath, o as registerOpenClawAgentDatabaseAsyncResource, s as registerOpenClawAgentDatabaseReadCandidateResource } from "./openclaw-agent-db-resources-DZhhXFbz.mjs";
import "./agent-scope-config-Dm6T00l4.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { s as resolveIncognitoOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { n as sessionChanges, t as isSessionStoreTopologyChange } from "./session-row-changes-DFigA589.mjs";
import { u as getOpenIncognitoAgentDatabase } from "./openclaw-agent-db-lifecycle-CCXA1nI8.mjs";
import { o as prepareOpenClawAgentDatabaseRegistrySnapshotRead } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import { n as captureSessionStoreReadCandidate } from "./session-store-read-candidates-YT_i67iQ.mjs";
import { r as onSessionIdentityMutation } from "./session-lifecycle-events-Ded_zLM3.mjs";
import { b as projectSessionSharingEntry, g as retainPreparedSessionSharingFacts, l as assertSessionEntryCreationPublication, m as readSessionEntryCreationTransition, p as readCommittedIncognitoSessionSharing, u as isPreparedSessionSharingChange } from "./session-accessor.sqlite-entry-cache-DYTBofzQ.mjs";
import { n as prepareSessionStoreTargetInventory } from "./session-store-target-inventory-DQQNzqyR.mjs";
import { m as withSessionHistoryWorkerReadCandidates } from "./session-transcript-worker-resources-DLvHY0vJ.mjs";
import { r as resolveSessionStoreIdentity } from "./session-store-key-__CfQfd2.mjs";
import { n as readSessionEntriesFromStoreInWorker } from "./session-entry-read-runtime-e6OehipM.mjs";
import { r as prepareGatewaySessionStoreTargetReadOnly } from "./session-utils-store-lookup-B0P8tI_m.mjs";
import { t as findCanonicalStoreMatch } from "./session-utils-store-selection-fXGPFfH8.mjs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";
//#region src/gateway/session-sharing-preparation.ts
var SessionMutationFactsUnavailableError = class extends Error {
	constructor(options) {
		super("Session access facts are unavailable; retry after session storage is ready.", options);
		this.name = "SessionMutationFactsUnavailableError";
	}
};
function routeFacts(cfg) {
	return {
		agents: listAgentIds(cfg),
		store: cfg.session?.store,
		mainKey: cfg.session?.mainKey,
		scope: cfg.session?.scope
	};
}
function captureSessionMutationRouting(cfg) {
	const route = routeFacts(cfg);
	return (current) => {
		if (!isDeepStrictEqual(routeFacts(current), route)) throw new SessionMutationFactsUnavailableError();
	};
}
async function prepareSessionMutationFacts(params) {
	const assertRoutingCurrent = captureSessionMutationRouting(params.cfg);
	const { canonicalKey, agentId } = resolveSessionStoreIdentity(params);
	const initialStoreKeys = [params.sessionKey.trim(), canonicalKey];
	const incognito = isIncognitoSessionKey(canonicalKey);
	const releases = [];
	let active = true;
	let beforeDiscovery = params.storageReady !== void 0;
	let waitingForStorage = false;
	let invalidated = false;
	let facts;
	let creation;
	let expectedPlaceholder;
	let assertSource;
	const selectedPaths = /* @__PURE__ */ new Set();
	const acquiringPaths = /* @__PURE__ */ new Set();
	const acquiringReads = /* @__PURE__ */ new Map();
	const initializedReads = /* @__PURE__ */ new Set();
	const acquireSource = (sourcePath, sessionKeys) => {
		const identity = readDatabasePathIdentitySync(sourcePath);
		if (identity.birthtime === void 0) return;
		acquiringPaths.add(path.resolve(sourcePath));
		acquiringPaths.add(identity.canonicalPath);
		for (const sessionKey of sessionKeys) {
			const key = `${identity.key}\0${sessionKey}`;
			if (!acquiringReads.has(key)) {
				const retained = retainPreparedSessionSharingFacts({
					databaseIdentity: identity.key,
					sessionKey,
					acquiring: true
				});
				acquiringReads.set(key, retained);
				releases.push(retained.release);
			}
		}
		return identity;
	};
	const release = () => {
		if (active) {
			active = false;
			for (const stop of releases.splice(0).toReversed()) stop();
		}
	};
	const retainCandidate = (candidate) => {
		for (const pathname of /* @__PURE__ */ new Set([candidate.path, candidate.physicalPath])) releases.push(registerOpenClawAgentDatabaseReadCandidateResource({
			...candidate,
			path: pathname,
			revoke: release,
			close: async () => release()
		}));
	};
	const assertActive = () => {
		if (!active || invalidated) throw new SessionMutationFactsUnavailableError();
	};
	const invalidate = () => {
		invalidated = true;
	};
	const changed = (change) => {
		if ("all" in change) {
			if (isSessionStoreTopologyChange(change)) {
				if (!beforeDiscovery && !incognito) invalidate();
				return;
			}
			if (typeof change.scope === "string" && [
				"profiles",
				"catalog",
				"acp",
				"agent-runs",
				"subagent-runs",
				"worker-placements",
				"worker-environments",
				"config",
				"config-presentation",
				"config-profiles"
			].includes(change.scope)) return;
			if (typeof change.scope === "object" && change.scope.agentId && change.scope.agentId !== agentId) return;
			invalidate();
			return;
		}
		if (change.scope === "automation" || change.agentId && change.agentId !== agentId && !change.storePath || ![...initialStoreKeys, ...facts?.target?.storeKeys ?? []].includes(change.sessionKey)) return;
		if (!change.storePath) return;
		if (!change.factsInvalidated && (change.facts?.kind === "unchanged" || change.facts?.kind === "participants" || change.facts?.kind === "category")) return;
		if (active && !invalidated && facts?.target === null && creation && selectedPaths.has(path.resolve(change.storePath))) {
			const placeholder = readSessionEntryCreationTransition(change, creation);
			if (placeholder) try {
				assertSource();
				expectedPlaceholder = placeholder;
				return;
			} catch {
				invalidate();
				return;
			}
		}
		if (!facts && acquiringPaths.has(path.resolve(change.storePath)) && isPreparedSessionSharingChange(change)) return;
		if (!facts || facts.target === null || !selectedPaths.has(path.resolve(change.storePath)) || !isPreparedSessionSharingChange(change)) invalidate();
	};
	releases.push(sessionChanges.subscribeFacts(changed), onSessionIdentityMutation((change) => {
		if (change.agentId === agentId && change.previous.sessionKeys.some((key) => initialStoreKeys.includes(key))) invalidate();
	}));
	try {
		const parsedAgent = parseAgentSessionKey(params.sessionKey)?.agentId;
		const discoveryInventory = incognito ? void 0 : prepareSessionStoreTargetInventory(params.cfg, [agentId, ...parsedAgent ? [parsedAgent] : []]);
		const candidateIdentities = (discoveryInventory?.candidates ?? []).map((candidate) => ({
			candidate,
			identity: readDatabasePathIdentitySync(candidate.path)
		}));
		const missingCandidates = candidateIdentities.filter(({ identity }) => identity.birthtime === void 0);
		for (const { candidate, identity } of candidateIdentities) if (identity.birthtime !== void 0) {
			retainCandidate(candidate);
			acquireSource(candidate.path, initialStoreKeys);
		}
		if (params.storageReady) {
			waitingForStorage = true;
			await params.storageReady;
			waitingForStorage = false;
			beforeDiscovery = false;
			for (const captured of missingCandidates) captured.identity = readDatabasePathIdentitySync(captured.candidate.path);
		}
		assertActive();
		for (const { candidate } of missingCandidates) {
			retainCandidate(candidate);
			acquireSource(candidate.path, initialStoreKeys);
		}
		let storageTarget;
		let readFacts = () => facts;
		if (!discoveryInventory) {
			const storePath = resolveIncognitoOpenClawAgentSqlitePath({ agentId });
			storageTarget = Object.freeze({
				agentId,
				canonicalKey,
				storePath
			});
			let database = getOpenIncognitoAgentDatabase(agentId, storePath);
			const initial = database && readCommittedIncognitoSessionSharing(database.db, canonicalKey);
			if (!initial?.entry && !params.allowMissing) throw new SessionMutationFactsUnavailableError();
			const sessionId = initial?.entry?.sessionId;
			const lifecycleRevision = initial?.entry?.lifecycleRevision;
			expectedPlaceholder = initial?.placeholder;
			selectedPaths.add(path.resolve(storePath));
			releases.push(registerOpenClawAgentDatabaseAsyncResource({
				agentId,
				path: storePath,
				revoke: release,
				close: async () => release()
			}));
			assertSource = () => {
				const current = getOpenIncognitoAgentDatabase(agentId, storePath);
				database ??= current;
				if (current !== database) throw new SessionMutationFactsUnavailableError();
			};
			readFacts = () => {
				const current = database && readCommittedIncognitoSessionSharing(database.db, canonicalKey);
				if (current?.entry?.sessionId !== sessionId || current?.entry?.lifecycleRevision !== lifecycleRevision || current?.placeholder !== expectedPlaceholder) {
					invalidate();
					throw new SessionMutationFactsUnavailableError();
				}
				if (!current?.entry) return {
					target: null,
					membership: /* @__PURE__ */ new Set()
				};
				return {
					sourcePath: storePath,
					sourceAgentId: agentId,
					target: {
						agentId,
						canonicalKey,
						storeKey: canonicalKey,
						storeKeys: [canonicalKey],
						storePath,
						entry: current.entry
					},
					membership: current.membership
				};
			};
			facts = readFacts();
		} else {
			const { candidates: discoveryCandidates, ...inventory } = discoveryInventory;
			const registry = prepareOpenClawAgentDatabaseRegistrySnapshotRead({ env: inventory.env });
			let assertRegistry;
			const members = /* @__PURE__ */ new Map();
			const retainedReads = /* @__PURE__ */ new Map();
			const selected = await withSessionHistoryWorkerReadCandidates(discoveryCandidates, async (discovery) => {
				let sources = await discovery.readTargetInventory({
					...inventory,
					registeredDatabases: { status: "deferred" }
				});
				if (sources.kind === "session-target-registry-required") {
					const current = await registry.read();
					assertRegistry = current.assertCurrent;
					current.assertCurrent();
					sources = await discovery.readTargetInventory({
						...inventory,
						registeredDatabases: current.result.status === "available" ? current.result.entries : { status: "unavailable" }
					});
				}
				if (sources.kind !== "session-target-inventory") throw new SessionMutationFactsUnavailableError();
				const targetDiscoveryCache = /* @__PURE__ */ new Map();
				for (const source of sources.agents) {
					if (!source.result.available && source.result.reason !== "database-missing") throw new SessionMutationFactsUnavailableError();
					targetDiscoveryCache.set(source.agentId, {
						existing: source.result.available ? source.result.targets : [],
						fallback: {
							agentId: source.agentId,
							storePath: inventory.paths.get(source.agentId).configured
						}
					});
				}
				const target = await prepareGatewaySessionStoreTargetReadOnly({
					cfg: inventory.config,
					key: params.sessionKey,
					agentId,
					env: inventory.env,
					targetDiscoveryCache
				}, async (reads, select) => {
					for (const read of reads) {
						assertActive();
						const loaded = await readSessionEntriesFromStoreInWorker({
							agentId: read.agentId ?? agentId,
							storePath: read.storePath,
							sessionKeys: read.options.exactKeys,
							projection: "sharing",
							env: inventory.env
						}, (source) => {
							assertActive();
							if (acquireSource(source.path, read.options.exactKeys)) acquiringPaths.add(path.resolve(read.storePath));
						});
						const store = Object.fromEntries(loaded.entries.map(({ sessionKey, entry }) => [sessionKey, entry]));
						read.result = ok(store);
						if (loaded.sharing) {
							read.readSource = loaded.sharing.source;
							members.set(read.storePath, loaded.sharing);
							for (const sessionKey of read.options.exactKeys) {
								const key = `${loaded.sharing.databaseIdentity}\0${sessionKey}`;
								const retained = acquiringReads.get(key);
								if (!retained) throw new SessionMutationFactsUnavailableError();
								retainedReads.set(key, retained);
								if (!initializedReads.has(key)) {
									const entry = store[sessionKey];
									retained.initialize({
										entry: entry ? projectSessionSharingEntry(entry) : void 0,
										placeholder: loaded.sharing.placeholders.find((row) => row.sessionKey === sessionKey),
										membership: new Set(loaded.sharing.members.find((row) => row.sessionKey === sessionKey)?.identityIds)
									});
									initializedReads.add(key);
								}
								const current = retained.readCurrent();
								if (!current) throw new SessionMutationFactsUnavailableError();
								if (current.entry) store[sessionKey] = current.entry;
							}
						}
					}
					return select();
				});
				discovery.assertCurrent();
				assertRegistry?.();
				return target;
			});
			assertActive();
			storageTarget = Object.freeze({
				agentId: selected.agentId,
				canonicalKey: selected.canonicalKey,
				storePath: selected.storePath
			});
			const match = findCanonicalStoreMatch(selected.store, selected.storeKeys);
			const sharing = members.get(selected.storePath);
			selectedPaths.add(path.resolve(selected.storePath));
			if (sharing) selectedPaths.add(path.resolve(sharing.source.path));
			if (!match) {
				if (!params.allowMissing) throw new SessionMutationFactsUnavailableError();
				facts = {
					target: null,
					membership: /* @__PURE__ */ new Set()
				};
				const retained = sharing && retainedReads.get(`${sharing.databaseIdentity}\0${canonicalKey}`);
				expectedPlaceholder = retained?.readCurrent()?.placeholder;
				readFacts = () => {
					const current = retained?.readCurrent();
					if (retained && !current || current?.entry || current?.placeholder?.sessionId !== expectedPlaceholder?.sessionId) throw new SessionMutationFactsUnavailableError();
					return {
						target: null,
						membership: /* @__PURE__ */ new Set()
					};
				};
			} else {
				if (!sharing) throw new SessionMutationFactsUnavailableError();
				const target = {
					agentId: selected.agentId,
					canonicalKey: selected.canonicalKey,
					storePath: selected.storePath,
					storeKeys: selected.storeKeys,
					entry: projectSessionSharingEntry(match.entry),
					storeKey: match.key
				};
				facts = {
					sourcePath: sharing.source.path,
					sourceAgentId: sharing.source.agentId,
					target,
					membership: new Set(sharing.members.find((member) => member.sessionKey === match.key)?.identityIds)
				};
				selectedPaths.add(path.resolve(selected.storePath));
				selectedPaths.add(path.resolve(sharing.source.path));
				const sourceCandidates = discoveryCandidates.filter((candidate) => matchesAgentDatabaseReadCandidatePath({
					...candidate,
					path: candidate.physicalPath
				}, sharing.source.path));
				if (sourceCandidates.length === 0) throw new SessionMutationFactsUnavailableError();
				for (const candidate of sourceCandidates) selectedPaths.add(path.resolve(candidate.path));
				const retained = retainedReads.get(`${sharing.databaseIdentity}\0${target.storeKey}`);
				if (!retained) throw new SessionMutationFactsUnavailableError();
				readFacts = () => {
					const current = retained.readCurrent();
					if (!current?.entry) throw new SessionMutationFactsUnavailableError();
					return {
						sourcePath: sharing.source.path,
						sourceAgentId: sharing.source.agentId,
						target: {
							...target,
							entry: current.entry
						},
						membership: current.membership
					};
				};
			}
			assertSource = () => {
				assertRegistry?.();
				for (const { candidate, identity } of candidateIdentities) if (captureSessionStoreReadCandidate(candidate.path, candidate.scope).physicalPath !== candidate.physicalPath || !isDeepStrictEqual(readDatabasePathIdentitySync(candidate.path), identity)) throw new SessionMutationFactsUnavailableError();
				for (const read of members.values()) if (readDatabasePathIdentitySync(read.source.path).key !== read.databaseIdentity) throw new SessionMutationFactsUnavailableError();
				for (const read of retainedReads.values()) if (!read.readCurrent()) throw new SessionMutationFactsUnavailableError();
			};
		}
		const readCurrent = (cfg) => {
			try {
				assertActive();
				assertRoutingCurrent(cfg);
				const currentIdentity = resolveSessionStoreIdentity({
					...params,
					cfg
				});
				if (currentIdentity.agentId !== agentId || currentIdentity.canonicalKey !== canonicalKey) throw new SessionMutationFactsUnavailableError();
				assertSource();
				if (creation) assertSessionEntryCreationPublication(creation, {
					agentId,
					sessionKey: canonicalKey,
					paths: selectedPaths
				});
				return readFacts();
			} catch (error) {
				throw error instanceof SessionMutationFactsUnavailableError ? error : new SessionMutationFactsUnavailableError({ cause: error });
			}
		};
		readCurrent(params.cfg);
		const bindCreation = (operation) => {
			readCurrent(params.cfg);
			if (creation && creation !== operation) throw new SessionMutationFactsUnavailableError();
			assertSessionEntryCreationPublication(operation, {
				agentId,
				sessionKey: canonicalKey,
				paths: selectedPaths
			});
			creation = operation;
		};
		return {
			storageTarget,
			bindCreation,
			readCurrent,
			release
		};
	} catch (error) {
		release();
		throw waitingForStorage || error instanceof SessionMutationFactsUnavailableError ? error : new SessionMutationFactsUnavailableError({ cause: error });
	}
}
//#endregion
export { captureSessionMutationRouting as n, prepareSessionMutationFacts as r, SessionMutationFactsUnavailableError as t };
