import "./openclaw-agent-db-identity-ChZ28OhF.mjs";
import { r as cloneEnvWithPlatformSemantics } from "./config-env-vars-C__rW8Th.mjs";
import { D as withAgentRosterFactsBatch } from "./agent-scope-config-Dm6T00l4.mjs";
import { r as createOpenClawAgentDatabasePathMatcher } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { x as listConfiguredSessionStoreAgentIds } from "./openclaw-state-db-DM-mSY0m.mjs";
import { n as resolveSessionStoreCompatibilityAgentId } from "./legacy.default-agent-owner-C1atgXtB.mjs";
import { a as listOpenClawRegisteredAgentDatabases, o as prepareOpenClawAgentDatabaseRegistrySnapshotRead, s as readOpenClawAgentDatabaseRegistryToken, t as AgentDatabaseRegistryChangedError } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import { t as captureSessionTranscriptStorageEnvironment } from "./transcript-target-binding-Cytsl9mY.mjs";
import { n as captureSessionStoreReadCandidate, t as assertSessionStoreReadCandidate } from "./session-store-read-candidates-YT_i67iQ.mjs";
import { o as resolveSqliteTargetFromSessionStorePath } from "./session-sqlite-target-YT3XOdWA.mjs";
import { t as createExistingAgentSessionStoreTargetResolver, u as shouldSkipDiscoveryError } from "./targets-CxfGP2B4.mjs";
import { n as prepareSessionStoreTargetInventory } from "./session-store-target-inventory-DQQNzqyR.mjs";
import { a as resolveGatewaySessionStoreLookupCandidates } from "./session-utils-store-lookup-B0P8tI_m.mjs";
//#region src/gateway/session-utils-store-sources.ts
function captureSessionStoreRouting(cfg) {
	return withAgentRosterFactsBatch(cfg, () => ({
		agentIds: listConfiguredSessionStoreAgentIds(cfg),
		store: cfg.session?.store,
		compatibilityAgentId: resolveSessionStoreCompatibilityAgentId(cfg)
	}));
}
function sessionStoreRoutingConfig(routing) {
	return {
		agents: {
			ownership: "explicit",
			entries: Object.fromEntries(routing.agentIds.map((agentId) => [agentId, {}])),
			defaults: { sessionStore: { agentId: routing.compatibilityAgentId } }
		},
		session: { store: routing.store }
	};
}
function sameRegistrations(left, right) {
	return left.length === right.length && left.every((entry, index) => {
		const previous = right[index];
		return entry.agentId === previous.agentId && entry.path === previous.path && entry.schemaVersion === previous.schemaVersion;
	});
}
function storeChanged() {
	return /* @__PURE__ */ new Error("Session store changed while preparing its metadata. Retry the request.");
}
/** Native discovery policy shared by synchronous readers and the admitted history worker. */
function resolveGatewaySessionStoreReadSources(params) {
	const cfg = sessionStoreRoutingConfig(params.routing);
	return withAgentRosterFactsBatch(cfg, () => {
		const registered = params.registeredDatabases.filter((entry) => entry.schemaVersion === 24);
		const agentIds = /* @__PURE__ */ new Set([...listConfiguredSessionStoreAgentIds(cfg), ...registered.map((entry) => entry.agentId)]);
		const isSameDatabasePath = createOpenClawAgentDatabasePathMatcher();
		const resolveExistingTargets = createExistingAgentSessionStoreTargetResolver(cfg, {
			env: params.env,
			registeredDatabases: registered,
			readCandidates: params.candidates,
			isSameDatabasePath
		});
		const sources = /* @__PURE__ */ new Map();
		const bindCurrentSource = (source) => {
			if (params.candidates) assertSessionStoreReadCandidate(source.path, params.candidates);
			isSameDatabasePath(source.path, source.path);
			return source.agentId === params.currentSource.agentId && isSameDatabasePath(source.path, params.currentSource.path) ? params.currentSource : source;
		};
		for (const agentId of agentIds) {
			let resolved;
			let exactRegisteredSources = false;
			try {
				const { candidates, readSources } = resolveGatewaySessionStoreLookupCandidates({
					...params,
					cfg,
					agentId,
					registeredDatabases: registered,
					resolveExistingTargets
				});
				resolved = [];
				if (readSources) {
					exactRegisteredSources = true;
					resolved = readSources;
				} else for (const candidate of candidates) {
					const target = resolveSqliteTargetFromSessionStorePath(candidate.storePath, {
						agentId: candidate.agentId,
						defaultAgentId: resolveSessionStoreCompatibilityAgentId(cfg),
						env: params.env,
						registeredDatabases: registered,
						readCandidates: params.candidates,
						isSameDatabasePath
					});
					if (target.ownerSource === "ambiguous-registry") {
						resolved.length = 0;
						break;
					}
					resolved.push({
						agentId: target.agentId ?? candidate.agentId,
						path: target.path
					});
				}
				const bound = [];
				for (const source of resolved) {
					const current = bindCurrentSource(source);
					if (!bound.some((previous) => (!exactRegisteredSources || previous.agentId === current.agentId) && isSameDatabasePath(previous.path, current.path))) bound.push(current);
				}
				sources.set(agentId, bound);
			} catch {
				sources.set(agentId, []);
				continue;
			}
		}
		return {
			sources: Object.fromEntries(sources),
			isCurrent: () => isSameDatabasePath.isCurrent()
		};
	});
}
/** Bind candidate addresses once; registry metadata uses its existing invalidation owner. */
function prepareGatewaySessionStoreReadSources(params) {
	const registryOptions = {
		env: cloneEnvWithPlatformSemantics(params.env),
		path: params.registryPath,
		includeIncompatibleSchemaVersions: true
	};
	const currentSource = params.currentSource;
	const currentSourceAgentId = currentSource.agentId;
	const currentSourcePath = currentSource.path;
	let discoveryIsCurrent;
	let registryToken = readOpenClawAgentDatabaseRegistryToken(registryOptions);
	const assertCurrent = () => {
		const currentToken = readOpenClawAgentDatabaseRegistryToken(registryOptions);
		if (currentToken === registryToken) return;
		try {
			if (discoveryIsCurrent?.()) {
				registryToken = currentToken;
				return;
			}
		} catch {}
		throw new Error("Session store changed while preparing its metadata. Retry the request.");
	};
	const bindSources = () => withAgentRosterFactsBatch(params.cfg, () => {
		let registered;
		try {
			registered = listOpenClawRegisteredAgentDatabases(registryOptions);
		} catch {
			return {};
		}
		const registryFacts = registered;
		const resolved = resolveGatewaySessionStoreReadSources({
			routing: captureSessionStoreRouting(params.cfg),
			currentSource,
			env: params.env,
			registeredDatabases: registered
		});
		discoveryIsCurrent = () => {
			const current = listOpenClawRegisteredAgentDatabases(registryOptions);
			return currentSource.agentId === currentSourceAgentId && currentSource.path === currentSourcePath && sameRegistrations(current, registryFacts) && resolved.isCurrent();
		};
		return resolved.sources;
	});
	let sources = params.deferSources ? void 0 : bindSources();
	return {
		get sources() {
			if (!sources) {
				assertCurrent();
				sources = bindSources();
			}
			return sources;
		},
		assertCurrent
	};
}
/** Capture source routing for the existing history worker; no native discovery runs here. */
async function prepareGatewaySessionStoreReadSourcesAsync(params) {
	const routing = captureSessionStoreRouting(params.cfg);
	const env = captureSessionTranscriptStorageEnvironment(params.env);
	const inventory = prepareSessionStoreTargetInventory(sessionStoreRoutingConfig(routing), routing.agentIds, env);
	const currentSource = { ...params.currentSource };
	const paths = createOpenClawAgentDatabasePathMatcher();
	paths(currentSource.path, currentSource.path);
	const candidates = /* @__PURE__ */ new Map();
	const unavailablePaths = /* @__PURE__ */ new Set();
	const capture = (candidate) => {
		if (unavailablePaths.has(candidate.path)) return;
		try {
			paths(candidate.path, candidate.path);
		} catch (error) {
			if (!shouldSkipDiscoveryError(error)) throw error;
			unavailablePaths.add(candidate.path);
			return;
		}
		candidates.set(JSON.stringify(candidate), candidate);
	};
	inventory.candidates.forEach(capture);
	capture(captureSessionStoreReadCandidate(currentSource.path));
	const registryRead = prepareOpenClawAgentDatabaseRegistrySnapshotRead({
		env,
		path: params.registryPath,
		includeIncompatibleSchemaVersions: true
	});
	const assertSourceCurrent = () => {
		if (params.currentSource.agentId !== currentSource.agentId || params.currentSource.path !== currentSource.path || !paths.isCurrent()) throw storeChanged();
	};
	const readRegistry = async (assertCallerCurrent) => {
		for (let attempt = 0;; attempt++) {
			assertCallerCurrent?.();
			assertSourceCurrent();
			try {
				const current = await registryRead.read();
				assertCallerCurrent?.();
				assertSourceCurrent();
				current.assertCurrent();
				return current;
			} catch (error) {
				if (!(error instanceof AgentDatabaseRegistryChangedError) || attempt >= 2) throw error;
			}
		}
	};
	let registry = await readRegistry();
	const original = registry.result;
	const assertCurrent = () => {
		assertSourceCurrent();
		try {
			registry.assertCurrent();
		} catch (error) {
			if (error instanceof AgentDatabaseRegistryChangedError) throw storeChanged();
			throw error;
		}
	};
	assertCurrent();
	const registeredDatabases = original.status === "available" ? original.entries.map(({ agentId, path, schemaVersion }) => ({
		agentId,
		path,
		schemaVersion
	})) : void 0;
	for (const registered of registeredDatabases ?? []) if (registered.schemaVersion === 24) capture(captureSessionStoreReadCandidate(registered.path));
	return {
		request: registeredDatabases ? {
			routing,
			currentSource,
			env,
			registeredDatabases,
			candidates: [...candidates.values()]
		} : void 0,
		assertSourceCurrent,
		assertCurrent,
		async revalidate(assertCallerCurrent) {
			assertCallerCurrent();
			assertSourceCurrent();
			try {
				registry.assertCurrent();
				return;
			} catch (error) {
				if (!(error instanceof AgentDatabaseRegistryChangedError)) throw error;
			}
			const current = await readRegistry(assertCallerCurrent);
			assertCallerCurrent();
			assertSourceCurrent();
			current.assertCurrent();
			if (current.result.status !== original.status || current.result.status === "available" && original.status === "available" && !sameRegistrations(current.result.entries, original.entries)) throw storeChanged();
			registry = current;
		}
	};
}
//#endregion
export { prepareGatewaySessionStoreReadSourcesAsync as n, resolveGatewaySessionStoreReadSources as r, prepareGatewaySessionStoreReadSources as t };
