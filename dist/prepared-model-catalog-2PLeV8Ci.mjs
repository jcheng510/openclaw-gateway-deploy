import { t as _usingCtx } from "./usingCtx-DwOBYOJf.mjs";
import { a as resolveAgentDir, d as resolveAgentWorkspaceDir, p as resolveAmbientOwnerAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { t as resolveDefaultAgentWorkspaceDir } from "./workspace-default-path-BG9KN4ds.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { t as modelTransportRoutesMatch } from "./model-compat-catalog-C82G2MfF.mjs";
import { n as findModelInCatalog } from "./model-catalog-lookup-CDmSroVq.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { a as resolveLegacyInheritedAuthDir } from "./legacy-inherited-auth-dir-5HYwj6qZ.mjs";
import { i as getPreparedModelFullCatalogAuth, l as loadPreparedModelRuntimeAuth, o as getPreparedModelRuntimeAuthMaterializations, t as bindPreparedModelRuntimeAuth } from "./prepared-model-runtime-auth-Cx-T0hXc.mjs";
import { r as resolvePublishedModelCatalogOwner } from "./prepared-model-catalog-owner-FEMHd_X2.mjs";
import { t as PreparedModelCatalogConfigReplacedError } from "./prepared-model-catalog.errors-DftAtHN9.mjs";
import { n as getPreparedModelRuntimePluginGeneration, t as getPreparedModelRuntimeBorrowedSnapshot } from "./prepared-model-runtime-generation-scope-DcgXgux2.mjs";
import { i as normalizeThinkingCatalogProviders } from "./thinking-runtime-ZnTNCdix.mjs";
import "./workspace-CV6W-hTb.mjs";
import { r as PreparedModelRuntimePublicationSupersededError, t as PreparedModelRuntimeOwnerNotPublishedError } from "./prepared-model-runtime.errors-Dmzyx34v.mjs";
import { i as isPreparedModelCatalogFull } from "./prepared-model-runtime.full-catalog-rANG1Oh1.mjs";
import { S as readCapturedPreparedModelRuntimeCatalog, _ as refreshPreparedModelRuntimeCatalog, a as acquireReadOnlyPreparedModelRuntime, b as preparedModelRuntimeConfigsMatch, m as prepareModelRuntimeSnapshot, o as activateStandalonePreparedModelRuntime, r as acquirePreparedModelRuntimeSnapshot, t as acquireAgentRunPreparedModelRuntime, u as getPreparedModelRuntimeSnapshot } from "./prepared-model-runtime-CiPCD0fr.mjs";
import { n as prepareScopedReadOnlyModelCatalog } from "./prepared-model-runtime.scoped-catalog-Bm9cQ18u.mjs";
//#region src/agents/prepared-model-catalog.ts
/** Lifecycle-owned model catalog access. */
async function preparePublishedCatalogOwner(input) {
	return { snapshot: await prepareModelRuntimeSnapshot(input) };
}
async function materializeRequestedModelCatalog(snapshot, readOnly, refreshFullCatalog, providerIds) {
	if (!snapshot.loadFullModelCatalog) return snapshot;
	const modelCatalog = (refreshFullCatalog === true ? await refreshPreparedModelRuntimeCatalog(snapshot, {
		refresh: readOnly !== true,
		...providerIds ? { providerIds } : {}
	}) : void 0) ?? (readOnly === true ? snapshot.readFullModelCatalog?.() : await snapshot.loadFullModelCatalog({
		refresh: refreshFullCatalog === true,
		...providerIds ? { providerIds } : {}
	}));
	if (!modelCatalog) return snapshot;
	return materializePreparedModelCatalogOwner(snapshot, modelCatalog);
}
/** Carries the published catalog and paired auth while expired inventory renews separately. */
function materializePreparedModelCatalogOwner(snapshot, modelCatalog = snapshot.readFullModelCatalog?.()) {
	if (!modelCatalog) return snapshot;
	const fullAuth = getPreparedModelFullCatalogAuth(modelCatalog);
	if (!fullAuth) throw new Error("prepared full model catalog omitted its auth generation");
	const materialized = Object.freeze({
		...snapshot,
		authModes: fullAuth.authModes,
		modelCatalog
	});
	bindPreparedModelRuntimeAuth(materialized, {
		store: fullAuth.authStore,
		labels: fullAuth.providerAuthLabels,
		load: async (scope) => await loadPreparedModelRuntimeAuth(snapshot, scope) ?? fullAuth,
		materializations: getPreparedModelRuntimeAuthMaterializations(snapshot)
	});
	return materialized;
}
function acceptsPreparedSnapshotConfig(snapshot, input, policy) {
	return policy === "published" || preparedModelRuntimeConfigsMatch(snapshot.config, input.config);
}
function resolveInputs(params = {}) {
	const config = params.config ?? getRuntimeConfig();
	const explicitOrDefaultAgentId = params.agentId ?? (params.agentDir === void 0 ? resolveAmbientOwnerAgentId(config) : void 0);
	const agentDir = params.agentDir ?? resolveAgentDir(config, explicitOrDefaultAgentId, params.env);
	const matchingAgentIds = explicitOrDefaultAgentId !== void 0 ? [] : listAgentIds(config).filter((candidateAgentId) => resolveAgentDir(config, candidateAgentId, params.env) === agentDir);
	const agentId = explicitOrDefaultAgentId ?? (matchingAgentIds.length === 1 ? matchingAgentIds[0] : void 0);
	const activationWorkspaceDir = params.workspaceDir ?? (agentId ? resolveAgentWorkspaceDir(config, agentId, params.env) : void 0);
	const full = {
		...agentId ? { agentId } : {},
		agentDir,
		config,
		...params.env ? { env: params.env } : {},
		inheritedAuthDir: resolveLegacyInheritedAuthDir(config, params.env),
		...params.workspaceDir ? { workspaceDir: params.workspaceDir } : {},
		...params.allowGatewaySubagentBinding ? { allowGatewaySubagentBinding: true } : {}
	};
	const exact = params.readOnly ? {
		...full,
		readOnly: true
	} : full;
	const activationFull = activationWorkspaceDir && activationWorkspaceDir !== full.workspaceDir ? {
		...full,
		workspaceDir: activationWorkspaceDir
	} : full;
	return {
		exact,
		full,
		activationFull,
		activationExact: activationFull === full ? exact : params.readOnly ? {
			...activationFull,
			readOnly: true
		} : activationFull
	};
}
function findPreparedCatalogOwner(candidates, policy) {
	for (const candidate of new Set(candidates)) {
		const snapshot = getPreparedModelRuntimeSnapshot(candidate);
		if (snapshot && acceptsPreparedSnapshotConfig(snapshot, candidate, policy)) return snapshot;
	}
}
/** Returns the configured lifecycle owner for the current generation without starting discovery. */
function getPreparedModelCatalogOwnerSnapshot(params = {}) {
	const { activationExact, activationFull, exact, full } = resolveInputs(params);
	return findPreparedCatalogOwner([
		full,
		activationFull,
		exact,
		activationExact
	], "exact");
}
/**
* Returns the currently published lifecycle owner and its configured/static turn facts without
* config hashing, fallback construction, or full control-plane catalog materialization.
*/
function getPublishedPreparedModelCatalogOwnerSnapshot(params = {}) {
	const { activationFull, full } = resolveInputs(params);
	return findPreparedCatalogOwner([full, activationFull], "published");
}
/** Requests expiry renewal for an inventory consumer without waiting for discovery. */
function refreshExpiredPreparedModelCatalog(params = {}) {
	const owner = getPreparedModelCatalogOwnerSnapshot(params);
	owner?.refreshExpiredModelCatalog?.();
	return owner?.readFullModelCatalog?.() ?? owner?.modelCatalog;
}
/** Reads accepted inventory without starting acquisition from an observation. */
function getPreparedModelCatalogSnapshot(params = {}) {
	const owner = getPreparedModelCatalogOwnerSnapshot(params);
	return owner?.readFullModelCatalog?.() ?? owner?.modelCatalog;
}
async function resolveReadOnlyPublishedModelCatalogOwner(params, configPolicy, preparePublishedOwner = preparePublishedCatalogOwner, selection = "owner") {
	const { activationFull, full } = resolveInputs(params);
	for (const candidate of /* @__PURE__ */ new Set([full, activationFull])) try {
		const prepared = await preparePublishedOwner(candidate);
		const matches = acceptsPreparedSnapshotConfig(prepared.snapshot, candidate, configPolicy);
		if (matches && (selection === "owner" || isPreparedModelCatalogFull(prepared.snapshot.modelCatalog))) return prepared;
		await prepared.release?.();
		if (!matches && selection === "owner") throw new PreparedModelCatalogConfigReplacedError(candidate.agentDir);
	} catch (error) {
		if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
	}
}
async function resolvePreparedModelCatalogOwnerSnapshotWithPolicy(params, configPolicy, preparePublishedOwner = preparePublishedCatalogOwner) {
	const { activationExact, activationFull, exact } = resolveInputs(params);
	if (params.readOnly) {
		const prepared = await resolveReadOnlyPublishedModelCatalogOwner(params, configPolicy, preparePublishedOwner);
		if (prepared) return prepared;
		const lease = await acquireReadOnlyPreparedModelRuntime(activationExact);
		if (!acceptsPreparedSnapshotConfig(lease.snapshot, activationExact, configPolicy)) try {
			var _usingCtx$1 = _usingCtx();
			_usingCtx$1.a(lease);
			throw new PreparedModelCatalogConfigReplacedError(activationExact.agentDir);
		} catch (_) {
			_usingCtx$1.e = _;
		} finally {
			await _usingCtx$1.d();
		}
		return {
			snapshot: lease.snapshot,
			release: () => lease[Symbol.asyncDispose]()
		};
	}
	try {
		const preparedExact = await preparePublishedOwner(exact);
		if (acceptsPreparedSnapshotConfig(preparedExact.snapshot, exact, configPolicy)) return preparedExact;
		await preparedExact.release?.();
	} catch (error) {
		if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
	}
	const activated = await activateStandalonePreparedModelRuntime(activationExact, { catalogMode: "static" });
	if (activated && acceptsPreparedSnapshotConfig(activated, activationExact, configPolicy)) return { snapshot: activated };
	if (activated) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model catalog owner was not published for the requested config (${activationExact.agentDir})`);
	const lease = await acquireAgentRunPreparedModelRuntime(activationFull);
	if (!acceptsPreparedSnapshotConfig(lease.snapshot, activationFull, configPolicy)) try {
		var _usingCtx3 = _usingCtx();
		_usingCtx3.a(lease);
		throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model catalog owner was not published for the requested config (${activationFull.agentDir})`);
	} catch (_) {
		_usingCtx3.e = _;
	} finally {
		await _usingCtx3.d();
	}
	return {
		snapshot: lease.snapshot,
		release: () => lease[Symbol.asyncDispose]()
	};
}
async function withPreparedModelCatalogOwnerPolicy(params, configPolicy, read, preparePublishedOwner = preparePublishedCatalogOwner) {
	const request = {
		...params,
		readOnly: params.readOnly ?? params.refreshFullCatalog !== true
	};
	const publishedReadOnlyOwner = request.readOnly ? getPreparedModelCatalogOwnerSnapshot(request) : void 0;
	const { snapshot, release } = await resolvePreparedModelCatalogOwnerSnapshotWithPolicy(request, configPolicy, preparePublishedOwner);
	try {
		return await read(request.readOnly && !publishedReadOnlyOwner ? snapshot : await materializeRequestedModelCatalog(snapshot, request.readOnly, request.refreshFullCatalog, request.providerDiscoveryProviderIds));
	} finally {
		await release?.();
	}
}
async function loadScopedReadOnlyModelCatalog(params) {
	const { activationExact } = resolveInputs(params);
	const prepared = await resolveReadOnlyPublishedModelCatalogOwner(params, "exact", preparePublishedCatalogOwner, "completed-inventory");
	if (prepared) return prepared.snapshot.modelCatalog;
	return prepareScopedReadOnlyModelCatalog(activationExact, params.providerDiscoveryProviderIds ?? [], params.scopedLiveProviderDiscovery === true ? "live" : "static");
}
/** Reads only the generation retained by this exact, still-open turn. */
function resolveAdmittedModelCatalogOwner(params) {
	const generation = getPreparedModelRuntimePluginGeneration();
	const owner = generation && getPreparedModelRuntimeBorrowedSnapshot(generation);
	if (!generation || !owner || owner.metadataSnapshot !== generation.pluginMetadataSnapshot) return;
	const { full, activationFull } = resolveInputs(params);
	return [full, activationFull].some((input) => preparedModelRuntimeConfigsMatch(owner.config, input.config) && owner.agentId === input.agentId && owner.agentDir === input.agentDir && owner.inheritedAuthDir === input.inheritedAuthDir && owner.workspaceDir === input.workspaceDir) ? {
		generation,
		owner
	} : void 0;
}
/**
* Missing turn-path capabilities do not authorize another inventory, even without a published
* owner. Native harness observations keep their existing owner.
*/
async function loadProviderScopedThinkingCatalog(params) {
	const request = {
		...params,
		readOnly: true
	};
	const admitted = resolveAdmittedModelCatalogOwner(request);
	let snapshot;
	if (admitted) {
		snapshot = readCapturedPreparedModelRuntimeCatalog(admitted.owner) ?? admitted.owner.modelCatalog;
		if (params.agentRuntime && params.agentRuntime !== "openclaw" && admitted.owner.loadNativeModelCatalog && admitted.owner.isCurrent()) try {
			snapshot = await admitted.owner.loadNativeModelCatalog({
				provider: params.provider,
				modelId: params.model,
				runtime: params.agentRuntime
			});
		} catch (error) {
			if (!(error instanceof PreparedModelRuntimePublicationSupersededError) || admitted.owner.isCurrent()) throw error;
		}
	} else {
		const owner = (await resolveReadOnlyPublishedModelCatalogOwner(request, "published"))?.snapshot;
		if (owner && !preparedModelRuntimeConfigsMatch(owner.config, params.config)) return [];
		if (owner?.loadNativeModelCatalog && params.agentRuntime && params.agentRuntime !== "openclaw") snapshot = await owner.loadNativeModelCatalog({
			provider: params.provider,
			modelId: params.model,
			runtime: params.agentRuntime
		});
		else {
			const catalog = owner ? (await materializeRequestedModelCatalog(owner, true, void 0)).modelCatalog : {
				entries: [],
				routeVariants: []
			};
			const agentId = params.agentId ?? resolveAmbientOwnerAgentId(params.config);
			const { augmentModelCatalogWithAgentHarness } = await import("./model-catalog-CRY-yHp9.mjs");
			snapshot = await augmentModelCatalogWithAgentHarness({
				cfg: params.config,
				agentId,
				agentDir: params.agentDir ?? resolveAgentDir(params.config, agentId),
				workspaceDir: params.workspaceDir ?? resolveAgentWorkspaceDir(params.config, agentId) ?? resolveDefaultAgentWorkspaceDir(),
				defaultProvider: params.provider,
				defaultModel: `${params.provider}/${params.model}`,
				agentRuntime: params.agentRuntime,
				snapshot: catalog
			});
		}
	}
	let entries = snapshot.entries;
	if (params.agentRuntime) {
		const entry = findModelInCatalog(entries, params.provider, params.model);
		if (entry) {
			const { selectModelCatalogRuntimeEntry } = await import("./model-catalog-view-C4-fDA0-.mjs");
			const selected = selectModelCatalogRuntimeEntry({
				entry,
				routeVariants: snapshot.routeVariants,
				runtimeId: params.agentRuntime
			}).entry;
			entries = entries.map((candidate) => candidate === entry ? selected : candidate);
		}
	}
	entries = normalizeThinkingCatalogProviders(entries);
	if (admitted && getPreparedModelRuntimeBorrowedSnapshot(admitted.generation) !== admitted.owner) return [];
	if (params.requiredInputRoute !== void 0) {
		const entry = findModelInCatalog(entries, params.provider, params.model);
		if (entry?.input === void 0 || !modelTransportRoutesMatch(entry, params.requiredInputRoute)) return [];
	}
	return entries;
}
/** Retains published or temporary catalog resources through an asynchronous read. */
async function withPreparedModelCatalogOwner(params, read) {
	return await withPreparedModelCatalogOwnerPolicy(params, "exact", read, async (input) => {
		const lease = await acquirePreparedModelRuntimeSnapshot(input);
		return {
			snapshot: lease.snapshot,
			release: () => lease[Symbol.asyncDispose]()
		};
	});
}
/** Resolves the lifecycle owner for an exact caller-supplied config. */
async function loadPreparedModelCatalogOwnerSnapshot(params = {}) {
	return await withPreparedModelCatalogOwnerPolicy(params, "exact", (snapshot) => snapshot);
}
/** Resolves the currently published owner when Gateway config changes during the read. */
async function loadPublishedPreparedModelCatalogOwnerSnapshot(params = {}) {
	return await withPreparedModelCatalogOwnerPolicy(params, "published", (snapshot) => snapshot);
}
/** Resolves a complete published owner for long-lived runtime consumers. */
async function loadResolvedPublishedModelCatalogOwner(params = {}) {
	return resolvePublishedModelCatalogOwner(await loadPublishedPreparedModelCatalogOwnerSnapshot(params));
}
/** Reads one atomic catalog generation, activating a lifecycle owner when needed. */
async function loadPreparedModelCatalogSnapshot(params = {}) {
	const readOnly = params.readOnly ?? params.refreshFullCatalog !== true;
	if (readOnly && params.providerDiscoveryProviderIds) return loadScopedReadOnlyModelCatalog({
		...params,
		readOnly
	});
	return (await loadPreparedModelCatalogOwnerSnapshot(params)).modelCatalog;
}
async function readPreparedModelCatalog(params = {}) {
	return (await loadPreparedModelCatalogSnapshot(params)).entries;
}
/** Reads the committed owner generation for long-lived runtime work. */
async function loadPublishedPreparedModelCatalog(params = {}) {
	return (await loadPublishedPreparedModelCatalogOwnerSnapshot(params)).modelCatalog.entries;
}
//#endregion
export { loadPreparedModelCatalogSnapshot as a, loadPublishedPreparedModelCatalogOwnerSnapshot as c, readPreparedModelCatalog as d, refreshExpiredPreparedModelCatalog as f, loadPreparedModelCatalogOwnerSnapshot as i, loadResolvedPublishedModelCatalogOwner as l, getPreparedModelCatalogSnapshot as n, loadProviderScopedThinkingCatalog as o, withPreparedModelCatalogOwner as p, getPublishedPreparedModelCatalogOwnerSnapshot as r, loadPublishedPreparedModelCatalog as s, getPreparedModelCatalogOwnerSnapshot as t, materializePreparedModelCatalogOwner as u };
