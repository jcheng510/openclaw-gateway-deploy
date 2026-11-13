import { d as toStringifiedError } from "./error-coercion-1P2One0X.mjs";
import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { d as getPluginMetadataSnapshotCache } from "./plugin-cache-DK2CPN_y.mjs";
import { r as racePromiseWithAbortSignal, t as createAbortError } from "./abort-signal-Z3A36sLL.mjs";
import { t as formatErrorMessage } from "./errors-YPvSaqwO.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { t as _usingCtx } from "./usingCtx-DwOBYOJf.mjs";
import { D as withAgentRosterFactsBatch } from "./agent-scope-config-Dm6T00l4.mjs";
import { a as resolveInstalledManifestRegistryIndexFingerprint } from "./plugin-control-plane-context-CCubDYEI.mjs";
import { o as settlePluginNativeAdmissions } from "./plugin-native-admission-state-BJUBAZkM.mjs";
import { l as withPluginMetadataSnapshotScope } from "./current-plugin-metadata-snapshot-CdI4MWI9.mjs";
import { u as resolvePluginMetadataSnapshot } from "./plugin-metadata-snapshot-Ctf1TsvW.mjs";
import { d as hashRuntimeConfigValue } from "./runtime-snapshot-BHGp6OxI.mjs";
import { n as withPluginRuntimeGenerationScope, t as runOutsidePluginRuntimeGenerationScope } from "./generation-scope-BTOPD8Qn.mjs";
import { t as captureRuntimeConfig } from "./runtime-source-projection-gZEHbsf4.mjs";
import { t as dedupeByKey } from "./dedupe-by-key-DnqEVrst.mjs";
import { t as createModelCatalogIdentityKeyResolver } from "./openai-model-routes-Ch36n-Vs.mjs";
import { t as runTasksWithConcurrency } from "./run-with-concurrency-Dtu208ef.mjs";
import { b as isReservedSystemAgentId } from "./agent-database-admission-CLYAvaL3.mjs";
import { b as removeRuntimeExternalProfileReferences, c as mergeAuthProfileStores } from "./persisted-DCBnTKGA.mjs";
import { A as getPreparedRuntimeAuthMaterializations, M as registerRuntimeAuthMaterializationMutationListener, a as createPreparedRuntimeAuthProfileUsageReader, x as registerRuntimeAuthProfileStoreMutationListener } from "./runtime-snapshots-CmtUlMVL.mjs";
import { t as collectConfiguredAgentHarnessRuntimes } from "./harness-runtimes-DYWrg9VX.mjs";
import { t as createPreparedModelCatalogProviderNormalizer } from "./model-catalog-provider-normalizer-Bysn3vsR.mjs";
import { a as resolveLegacyInheritedAuthDir } from "./legacy-inherited-auth-dir-5HYwj6qZ.mjs";
import { c as hasSamePreparedModelCatalogAuth, i as getPreparedModelFullCatalogAuth, r as copyPreparedModelRuntimeAuthBindings, t as bindPreparedModelRuntimeAuth, u as setPreparedModelFullCatalogAuth } from "./prepared-model-runtime-auth-Cx-T0hXc.mjs";
import { r as resolvePublishedModelCatalogOwner, t as preparePublishedModelCatalogOwnerIdentity } from "./prepared-model-catalog-owner-FEMHd_X2.mjs";
import { r as runOutsidePreparedModelRuntimePluginGenerationScope, t as getPreparedModelRuntimeBorrowedSnapshot } from "./prepared-model-runtime-generation-scope-DcgXgux2.mjs";
import { p as prepareModelCatalogThinkingPolicies } from "./thinking-hj_KWR0q.mjs";
import { L as resolveUsableAgentCredentialModes, a as preparedPluginGenerationSupportsSelections, c as publishPreparedPluginGeneration, d as retainPreparedPluginGeneration, f as retainPreparedPluginRegistry, i as preparedPluginGenerationReusesBase, l as registerPreparedPluginLifetime, m as closeEphemeralPreparedModelRuntimeResources, o as discardPreparedPluginGeneration, p as PreparedModelRuntimeBuildResources, u as releasePreparedPluginPublication } from "./prepared-model-runtime.plugin-generation-BhjdlyN-.mjs";
import { i as AuthStorage } from "./model-registry-HeKGMI8T.mjs";
import { i as listConfiguredOwnerInputs } from "./prepared-model-runtime.configured-ugZ-73Hd.mjs";
import { n as augmentPreparedModelCatalogWithAgentHarness, r as isPreparedNativeModelCatalogReady } from "./model-catalog-DV9bFvYK.mjs";
import { o as resolveSelectedAgentHarnessRuntime } from "./runtime-plugin-load-plan-ZJcpwJnb.mjs";
import { a as assertPreparedModelRuntimeInputCurrent, i as assertPreparedModelRuntimeCandidatesCurrent, o as isPreparedModelRuntimePluginLifecycleFailure, r as PreparedModelRuntimePublicationSupersededError, t as PreparedModelRuntimeOwnerNotPublishedError } from "./prepared-model-runtime.errors-Dmzyx34v.mjs";
import { a as registerPreparedModelRuntimeClose, i as createPreparedModelRuntimeReplacement, n as capturePreparedModelRuntimeLifetime, r as closePreparedModelRuntimeSnapshots, s as retirePreparedModelRuntimeGeneration, t as capturePreparedModelRuntimeGeneration } from "./prepared-model-runtime.lifecycle-DFXYGxNv.mjs";
import { a as markPreparedModelCatalogFull, c as mergePreparedNativeCatalog, d as retainPreparedModelCatalogPublication, f as selectPreparedModelCatalogInventory, i as isPreparedModelCatalogFull, l as prepareFullCatalogFacts, n as filterNativeModelCatalogScopes, o as materializePreparedModelCatalog, r as filterPreparedProviderCatalog, s as mergePreparedModelCatalogInventory, t as createPreparedModelRuntimeSnapshot, u as prepareModelCatalogPublication } from "./prepared-model-runtime.full-catalog-rANG1Oh1.mjs";
import { t as runAbortableTimeout } from "./with-timeout-C2KBO09B.mjs";
import { a as prepareWorkspaceBuildGroup, d as preparedModelRuntimeWorkspaceFactsKey, i as prepareConfiguredRuntimeFactsBatch, l as createPreparedInboundRegistryLoader, n as fingerprintPreparedRuntimeFacts, o as preparedModelInventoryKey, p as prepareConfiguredRuntimeFacts, r as prepareConfiguredModelFacts, s as preparedSyntheticAuthProviderScope } from "./prepared-model-runtime.facts-Pifkw2OK.mjs";
import { n as createPreparedModelCatalogWorker } from "./prepared-model-catalog-worker-CVNhHiZ3.mjs";
import { n as prepareModelCatalogAuthLabels } from "./model-catalog-auth-labels-CeYHOwrJ.mjs";
import { a as resetPreparedModelRuntimePublicationListenersForTest, n as notifyPreparedModelCatalogPublication, r as notifyPreparedModelRuntimePublication, t as createCatalogAttemptReporter } from "./prepared-model-runtime.publication-events-BUQJNDbK.mjs";
import { t as prepareAgentCatalogSource } from "./prepared-model-runtime.scoped-catalog-Bm9cQ18u.mjs";
import { n as setPreparedModelRuntimeStartupStatus } from "./prepared-model-runtime.startup-status-Da154XRr.mjs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { setImmediate } from "node:timers/promises";
import pLimit from "p-limit";
//#region src/agents/prepared-model-runtime.capture.ts
const catalogCaptures = /* @__PURE__ */ new WeakMap();
const admittedCatalogs = /* @__PURE__ */ new WeakMap();
/** Passive inventory captured at admission; the caller must hold the matching turn lease. */
function readCapturedPreparedModelRuntimeCatalog(snapshot) {
	return admittedCatalogs.get(snapshot);
}
/** Captures published executable and native model facts without changing any open lease. */
function capturePreparedModelRuntimeCatalog(snapshot, source) {
	const models = source?.readPublishedModels?.();
	const catalog = source?.readFullModelCatalog?.();
	let cached = catalogCaptures.get(snapshot);
	if (!cached || cached.models !== models || cached.catalog !== catalog) {
		const nativeCatalog = catalog && (catalog.entries.some((entry) => entry.nativeRuntime) || catalog.routeVariants.some((entry) => entry.nativeRuntime));
		const hasCatalogFacts = catalog && (catalog.entries.length > 0 || catalog.routeVariants.length > 0 || snapshot.modelCatalog.entries.length > 0 || snapshot.modelCatalog.routeVariants.length > 0);
		cached = {
			models,
			catalog,
			admittedCatalog: nativeCatalog ? mergePreparedNativeCatalog(catalog, {
				...catalog,
				entries: [...catalog.entries, ...snapshot.modelCatalog.entries],
				routeVariants: [...catalog.routeVariants, ...snapshot.modelCatalog.routeVariants]
			}) : catalog ?? snapshot.modelCatalog,
			capturedSnapshot: hasCatalogFacts ? Object.freeze({
				...snapshot,
				...nativeCatalog ? { modelCatalog: mergePreparedNativeCatalog(catalog, snapshot.modelCatalog) } : {}
			}) : snapshot,
			memo: cached && cached.models === models ? cached.memo : /* @__PURE__ */ new Map()
		};
		catalogCaptures.set(snapshot, cached);
	}
	const capturedNative = cached.capturedSnapshot;
	admittedCatalogs.set(capturedNative, cached.admittedCatalog);
	if (!models?.size) {
		if (capturedNative !== snapshot) copyPreparedModelRuntimeAuthBindings(snapshot, capturedNative);
		return capturedNative;
	}
	const stores = snapshot.createStores();
	const credentials = stores.authStorage.getAll();
	const registry = stores.modelRegistry.fork(stores.authStorage, models);
	const captured = Object.freeze({
		...capturedNative,
		readPublishedModels: () => models,
		routeModelResolutionMemo: cached.memo,
		createStores: () => {
			const authStorage = AuthStorage.inMemory(credentials);
			return {
				authStorage,
				modelRegistry: registry.fork(authStorage)
			};
		}
	});
	copyPreparedModelRuntimeAuthBindings(snapshot, captured);
	admittedCatalogs.set(captured, cached.admittedCatalog);
	return captured;
}
//#endregion
//#region src/agents/prepared-model-runtime.catalog-auth.ts
function replacePreparedModelCatalogAuth(previous, next, includesProvider) {
	const keep = ([provider]) => !includesProvider(provider);
	const take = ([provider]) => includesProvider(provider);
	const replace = (before, after) => Object.fromEntries([...Object.entries(before ?? {}).filter(keep), ...Object.entries(after ?? {}).filter(take)]);
	const selectStore = (store, selected) => {
		const scoped = removeRuntimeExternalProfileReferences({
			store,
			profileIds: new Set(Object.entries(store.profiles).filter(([, profile]) => includesProvider(profile.provider) !== selected).map(([id]) => id))
		});
		return {
			...scoped,
			order: scoped.order && Object.fromEntries(Object.entries(scoped.order).filter(selected ? take : keep)),
			lastGood: scoped.lastGood && Object.fromEntries(Object.entries(scoped.lastGood).filter(selected ? take : keep)),
			runtimeLocalOrderProviderIds: store.runtimeLocalOrderProviderIds?.filter((provider) => includesProvider(provider) === selected)
		};
	};
	const retained = selectStore(previous.authStore, false);
	const refreshed = selectStore(next.authStore, true);
	for (const key of ["runtimeLocalProfileIds", "runtimeLocalOrderProviderIds"]) if (retained[key] || refreshed[key]) refreshed[key] = [.../* @__PURE__ */ new Set([...retained[key] ?? [], ...refreshed[key] ?? []])];
	return {
		authStore: mergeAuthProfileStores(retained, refreshed, { preserveBaseRuntimeExternalProfiles: true }),
		credentials: replace(previous.credentials, next.credentials),
		authModes: replace(previous.authModes, next.authModes),
		providerAuthLabels: next.providerAuthLabels ? new Map([...previous.providerAuthLabels].filter(keep).concat([...next.providerAuthLabels].filter(take))) : previous.providerAuthLabels
	};
}
function prepareInitialModelCatalogAuth({ agentFacts, catalogFacts, pluginGeneration }, eligibleProviders) {
	return {
		authStore: agentFacts.authStore,
		credentials: agentFacts.credentials,
		authModes: resolveUsableAgentCredentialModes(agentFacts.credentials),
		providerAuthLabels: withPluginRuntimeGenerationScope({
			metadataSnapshot: pluginGeneration.pluginMetadataSnapshot,
			pluginRegistry: pluginGeneration.pluginRegistry
		}, () => prepareModelCatalogAuthLabels({
			...agentFacts.input,
			env: agentFacts.env,
			store: agentFacts.authStore,
			providers: [
				...eligibleProviders,
				...catalogFacts.modelCatalog.entries.map((entry) => entry.provider),
				...Object.values(agentFacts.authStore.profiles).map((profile) => profile.provider)
			]
		}))
	};
}
//#endregion
//#region src/agents/prepared-model-runtime.catalog-projection.ts
/** Composes retained discovery with current configured metadata and runtime capabilities. */
function createPreparedModelCatalogProjection(params) {
	return (catalog, configuredRuntimeModels) => {
		const configured = prepareConfiguredRuntimeFacts({
			agentFacts: params.agentFacts,
			workspaceFacts: params.pluginGeneration,
			templateModelRegistry: params.catalogFacts.templateModelRegistry,
			configuredRuntimeModels
		}).modelCatalog;
		const current = materializePreparedModelCatalog(configured, params.agentFacts.runtimeCapabilityModels);
		const projected = materializePreparedModelCatalog(catalog, params.agentFacts.runtimeCapabilityModels, current.staticEntries);
		const apiProviders = new Set(projected.providerOutcomes?.map(({ provider }) => params.normalizeProvider(provider)));
		const nativeOutcomes = Object.values(catalog.nativeProviderOutcomes ?? {}).flat().filter(({ provider }) => !apiProviders.has(params.normalizeProvider(provider)));
		if (nativeOutcomes.length) projected.providerOutcomes = [...projected.providerOutcomes ?? [], ...nativeOutcomes];
		const keyOf = createModelCatalogIdentityKeyResolver();
		projected.entries = dedupeByKey([...projected.entries, ...current.entries], keyOf);
		projected.routeVariants = dedupeByKey([...projected.routeVariants, ...current.routeVariants], (entry) => JSON.stringify([
			keyOf(entry),
			entry.api,
			entry.baseUrl,
			entry.nativeRuntime
		]));
		prepareModelCatalogThinkingPolicies({
			catalog: projected,
			metadataSnapshot: params.pluginGeneration.pluginMetadataSnapshot,
			providers: params.pluginGeneration.pluginRegistry?.providers
		});
		return projected;
	};
}
//#endregion
//#region src/agents/prepared-model-runtime.catalog-source.ts
function preparedProviderCatalogSource(facts, generation, provider, normalize) {
	const { config } = facts.input;
	const pluginIds = generation.pluginMetadataSnapshot.owners.providers.get(provider) ?? [];
	const providerEntries = (entries) => Object.fromEntries(Object.entries(entries ?? {}).filter(([id]) => normalize(id) === provider));
	return fingerprintPreparedRuntimeFacts({
		models: {
			...config.models,
			providers: providerEntries(config.models?.providers)
		},
		auth: {
			profiles: Object.fromEntries(Object.entries(config.auth?.profiles ?? {}).filter(([, profile]) => normalize(profile.provider) === provider)),
			order: providerEntries(config.auth?.order)
		},
		plugins: {
			...config.plugins,
			allow: config.plugins?.allow?.filter((id) => pluginIds.includes(id)),
			deny: config.plugins?.deny?.filter((id) => pluginIds.includes(id)),
			entries: Object.fromEntries(pluginIds.map((id) => [id, config.plugins?.entries?.[id]]))
		},
		env: {
			config: config.env,
			runtime: facts.env
		}
	});
}
function preparedProviderCatalogCredentials(source, provider, normalize) {
	const { authStore, credentials } = source;
	return fingerprintPreparedRuntimeFacts({
		profiles: Object.fromEntries(Object.entries(authStore.profiles).filter(([, profile]) => normalize(profile.provider) === provider)),
		credentials: Object.fromEntries(Object.entries(credentials ?? {}).filter(([id]) => normalize(id) === provider)),
		order: Object.fromEntries(Object.entries(authStore.order ?? {}).filter(([id]) => normalize(id) === provider))
	});
}
const limitFullModelCatalogBuild = pLimit(1);
const MODEL_CATALOG_FOREGROUND_WAIT_MS = 5e3;
function createFullModelCatalogAccess(params) {
	const readUsage = createPreparedRuntimeAuthProfileUsageReader(params.agentFacts.input.agentDir, params.agentFacts.input.inheritedAuthDir);
	const setCatalogAuth = (catalog, auth) => setPreparedModelFullCatalogAuth(catalog, auth, (store) => params.isCurrent() ? readUsage(store) : store);
	const normalizeProvider = createPreparedModelCatalogProviderNormalizer(params.pluginGeneration.pluginMetadataSnapshot, params.agentFacts.input.config, params.agentFacts.env);
	const projectInventory = createPreparedModelCatalogProjection({
		...params,
		normalizeProvider
	});
	const project = (catalog, configuredRuntimeModels = params.catalogFacts.configuredRuntimeModels) => attempt.withRefreshStatus(projectInventory(catalog, configuredRuntimeModels));
	const inventoryKey = preparedModelInventoryKey(params.agentFacts.input);
	const nativeSource = fingerprintPreparedRuntimeFacts({
		runtimePluginSelections: params.agentFacts.input.runtimePluginSelections,
		config: params.nativeConfigFingerprint,
		configuredModelRefs: params.agentFacts.configuredModelRefs
	});
	const previousInventory = params.inventoryOwner.catalogInventory;
	const previousAuth = previousInventory && getPreparedModelFullCatalogAuth(previousInventory.catalog);
	const pluginFingerprint = resolveInstalledManifestRegistryIndexFingerprint(params.pluginGeneration.pluginMetadataSnapshot.index);
	const attempt = createCatalogAttemptReporter(params.inventoryOwner, {
		key: inventoryKey,
		pluginFingerprint,
		credentials: params.agentFacts.credentials
	}, params.isCurrent, () => {
		if (published.inventory) {
			const providers = new Map(published.inventory.providers);
			for (const provider of pending?.providers ?? providers.keys()) {
				const facts = providers.get(provider);
				if (facts) {
					const { expiresAt: _expiresAt, ...retained } = facts;
					providers.set(provider, retained);
				}
			}
			published = {
				...published,
				inventory: {
					...published.inventory,
					providers
				}
			};
			params.inventoryOwner.catalogInventory = published.inventory;
		}
	});
	const eligibleProviders = [...new Set([...params.agentFacts.providerIds, ...Object.keys(params.agentFacts.credentials)].map(normalizeProvider))].toSorted();
	const providerSource = (provider) => preparedProviderCatalogSource(params.agentFacts, params.pluginGeneration, provider, normalizeProvider);
	const providerSources = new Map(eligibleProviders.map((provider) => [provider, providerSource(provider)]));
	const retainedProviders = new Set(eligibleProviders.filter((provider) => previousInventory?.pluginFingerprint === pluginFingerprint && previousInventory.providers.get(provider)?.source === providerSources.get(provider) && hasSamePreparedModelCatalogAuth(previousAuth, params.agentFacts, (id) => normalizeProvider(id) === provider)));
	const retainedInventory = previousInventory && retainedProviders.size ? {
		...selectPreparedModelCatalogInventory(previousInventory, (provider) => retainedProviders.has(normalizeProvider(provider))),
		nativeSource
	} : void 0;
	if (retainedInventory) {
		const identifiedNativeProviders = new Set(previousInventory?.nativeSource === nativeSource ? Object.entries(params.agentFacts.credentials).flatMap(([provider, credential]) => credential.type === "api_key" && credential.nativeAuth ? [] : [normalizeProvider(provider)]) : []);
		const retain = (entry) => !entry.nativeRuntime || identifiedNativeProviders.has(normalizeProvider(entry.provider));
		retainedInventory.catalog.entries = retainedInventory.catalog.entries.filter(retain);
		retainedInventory.catalog.routeVariants = retainedInventory.catalog.routeVariants.filter(retain);
		const includesNativeProvider = (provider) => identifiedNativeProviders.has(normalizeProvider(provider));
		retainedInventory.catalog.nativeProviderOutcomes = filterNativeModelCatalogScopes(retainedInventory.catalog.nativeProviderOutcomes, includesNativeProvider);
		retainedInventory.catalog.nativeHostRows = void 0;
	}
	const currentAuth = prepareInitialModelCatalogAuth(params, eligibleProviders);
	if (retainedInventory && previousAuth) setCatalogAuth(retainedInventory.catalog, currentAuth);
	const hasNativeCatalog = params.pluginGeneration.pluginRegistry?.agentHarnesses.some(({ harness }) => typeof harness.loadModelCatalog === "function");
	let published = {
		catalog: void 0,
		inventory: retainedInventory,
		configuredRuntimeModels: params.catalogFacts.configuredRuntimeModels,
		nativeCatalogAcquired: !hasNativeCatalog
	};
	let pending;
	let nativePending;
	const assertCurrent = () => assertPreparedModelRuntimeInputCurrent(params.agentFacts.input, params.isCurrent);
	const worker = createPreparedModelCatalogWorker({
		pluginRegistry: params.pluginGeneration.pluginRegistry,
		agentFacts: params.agentFacts,
		pluginMetadataSnapshot: params.pluginGeneration.pluginMetadataSnapshot,
		preferBuiltPluginArtifacts: params.pluginGeneration.preferBuiltPluginArtifacts,
		isCurrent: params.isCurrent,
		retirementSignal: params.retirementSignal
	});
	const staticCatalog = project(params.catalogFacts.modelCatalog);
	if (hasNativeCatalog) staticCatalog.authoritative = false;
	setCatalogAuth(staticCatalog, currentAuth);
	const preparePublication = (nextInventory, configuredRuntimeModels, acquiredNative) => {
		const catalog = project(nextInventory.catalog, configuredRuntimeModels);
		setCatalogAuth(catalog, getPreparedModelFullCatalogAuth(nextInventory.catalog) ?? currentAuth);
		catalog.authoritative = acquiredNative && !catalog.refreshFailed ? catalog.authoritative : false;
		if (acquiredNative && eligibleProviders.every((provider) => nextInventory.providers.has(provider))) markPreparedModelCatalogFull(catalog);
		return {
			catalog,
			inventory: nextInventory,
			configuredRuntimeModels,
			nativeCatalogAcquired: acquiredNative
		};
	};
	if (retainedInventory) published = preparePublication(retainedInventory, published.configuredRuntimeModels, published.nativeCatalogAcquired);
	const publishCatalog = (candidate, source) => {
		assertCurrent();
		const previous = published;
		let next = {
			...candidate,
			catalog: previous.catalog
		};
		if (candidate.inventory) {
			const providers = source === "provider" ? candidate.inventory : previous.inventory ?? candidate.inventory;
			const native = source === "native" ? candidate.inventory.catalog : previous.inventory?.catalog;
			const apiCatalog = source === "native" && !previous.inventory ? params.catalogFacts.modelCatalog : providers.catalog;
			const inventory = {
				...providers,
				catalog: native ? mergePreparedNativeCatalog(native, apiCatalog) : apiCatalog
			};
			setCatalogAuth(inventory.catalog, getPreparedModelFullCatalogAuth(candidate.inventory.catalog) ?? currentAuth);
			const baseline = source === "native" ? previous.catalog ?? staticCatalog : void 0;
			next = preparePublication(inventory, source === "native" ? previous.configuredRuntimeModels : candidate.configuredRuntimeModels, source === "provider" ? previous.nativeCatalogAcquired : candidate.nativeCatalogAcquired);
			assertCurrent();
			if (baseline && next.catalog) {
				baseline.authoritative = next.catalog.authoritative;
				if (isPreparedModelCatalogFull(next.catalog)) markPreparedModelCatalogFull(baseline);
				next.catalog = retainPreparedModelCatalogPublication(next.catalog, baseline);
			}
		}
		published = {
			...next,
			catalog: retainPreparedModelCatalogPublication(next.catalog, previous.catalog)
		};
		params.inventoryOwner.catalogInventory = published.inventory;
		return {
			previous,
			current: published,
			staticCatalog
		};
	};
	const acquireProviderCatalog = async (providerIds, providers) => limitFullModelCatalogBuild(async () => {
		assertCurrent();
		const { modelCatalog: workerCatalog, configuredRuntimeModels, runtimeModels, providerExpiries, hookRows } = await worker.loadCatalog(providerIds, (providerIds ?? providers).some((provider) => published.inventory?.providers.has(provider)) ? (error) => attempt.failed(error, providerIds ?? providers, "provider") : void 0);
		assertCurrent();
		const scope = new Set((providerIds ?? [
			...eligibleProviders,
			...workerCatalog.entries.map((entry) => entry.provider),
			...(workerCatalog.providerOutcomes ?? []).map((outcome) => outcome.provider)
		]).map(normalizeProvider));
		const discoveredAuth = getPreparedModelFullCatalogAuth(workerCatalog);
		if (!discoveredAuth) throw new Error("prepared model catalog worker omitted its auth generation");
		const retained = published.inventory;
		const retainedAuth = getPreparedModelFullCatalogAuth(published.catalog ?? staticCatalog) ?? currentAuth;
		const auth = providerIds ? replacePreparedModelCatalogAuth(retainedAuth, discoveredAuth, (provider) => scope.has(normalizeProvider(provider))) : discoveredAuth;
		const { legacyRows, ...publication } = prepareModelCatalogPublication(providerIds ? filterPreparedProviderCatalog(workerCatalog, (provider) => scope.has(normalizeProvider(provider))) : workerCatalog, new Map([...runtimeModels].filter(([provider]) => scope.has(normalizeProvider(provider)))), retained, auth, normalizeProvider, hookRows);
		const completedProviders = new Map([...scope].map((provider) => {
			const expiresAt = providerExpiries.get(provider);
			const failed = workerCatalog.providerOutcomes?.some((outcome) => normalizeProvider(outcome.provider) === provider && outcome.status !== "ready");
			return [provider, {
				source: providerSource(provider),
				credentials: preparedProviderCatalogCredentials(auth, provider, normalizeProvider),
				...!failed && expiresAt !== void 0 ? { expiresAt } : {},
				...legacyRows.get(provider)?.size ? { legacyRows: legacyRows.get(provider) } : {}
			}];
		}));
		const acquired = {
			...publication,
			key: inventoryKey,
			pluginFingerprint,
			nativeSource,
			providers: completedProviders
		};
		const inventory = providerIds ? mergePreparedModelCatalogInventory(retained, acquired, scope, normalizeProvider) : acquired;
		setCatalogAuth(inventory.catalog, auth);
		return {
			inventory,
			configuredRuntimeModels,
			nativeCatalogAcquired: published.nativeCatalogAcquired
		};
	});
	const acquireNativeCatalog = (providerIds, selection) => {
		const selectionReady = () => {
			assertCurrent();
			const ready = selection && isPreparedNativeModelCatalogReady({
				input: params.agentFacts.input,
				pluginGeneration: params.pluginGeneration,
				snapshot: published.catalog ?? staticCatalog,
				selection
			});
			assertCurrent();
			return ready;
		};
		if (selectionReady()) return Promise.resolve(published.catalog ?? staticCatalog);
		const previousNative = nativePending;
		let failedProviders;
		const promise = (async () => {
			try {
				var _usingCtx$3 = _usingCtx();
				await previousNative?.catch(() => void 0);
				if (selectionReady()) return published.catalog ?? staticCatalog;
				_usingCtx$3.a({ [Symbol.asyncDispose]: retainPreparedPluginGeneration(params.pluginGeneration) });
				let discoveredProviders = [];
				let completed = false;
				const failures = [];
				const startupProviders = new Set(params.agentFacts.providerIds.map(normalizeProvider));
				attempt.setPending([], "native");
				const rawCatalog = await augmentPreparedModelCatalogWithAgentHarness({
					input: params.agentFacts.input,
					nativeSelection: selection,
					snapshot: published.inventory?.catalog ?? params.catalogFacts.modelCatalog,
					normalizeProvider,
					preparedSnapshot: published.catalog ?? staticCatalog,
					pluginRegistry: params.pluginGeneration.pluginRegistry,
					isCurrent: params.isCurrent,
					includesProvider: providerIds ? (provider) => providerIds.includes(normalizeProvider(provider)) : void 0,
					onError: (error, failedProviderIds) => {
						failures.push({
							error,
							providers: failedProviderIds?.map(normalizeProvider)
						});
					},
					onDiscoveryStarted: (provider) => attempt.setPending([normalizeProvider(provider)], "native"),
					onDiscoveryCompleted: (rows) => {
						completed = true;
						discoveredProviders = [...new Set(rows.map((entry) => normalizeProvider(entry.provider)).filter((provider) => !startupProviders.has(provider)))];
					}
				});
				assertCurrent();
				if (!completed && failures.length) {
					failedProviders = failures.flatMap((failure) => failure.providers ?? []);
					throw failures[0].error;
				}
				const nativeAuth = !selection && completed && discoveredProviders.length ? await worker.loadAuth({ providerIds: discoveredProviders }) : void 0;
				assertCurrent();
				const latest = published;
				const latestInventory = latest.inventory;
				const auth = getPreparedModelFullCatalogAuth(latest.inventory?.catalog ?? staticCatalog) ?? currentAuth;
				const nativeScope = preparedSyntheticAuthProviderScope(discoveredProviders);
				const catalogAuth = nativeAuth ? replacePreparedModelCatalogAuth(auth, nativeAuth, (provider) => nativeScope.has(normalizeProvider(provider))) : auth;
				const acquiredNative = latest.nativeCatalogAcquired || !selection && (!providerIds || completed);
				const nextInventory = completed ? {
					catalog: {
						...rawCatalog,
						authoritative: (latestInventory?.catalog ?? params.catalogFacts.modelCatalog).authoritative
					},
					runtimeModels: latestInventory?.runtimeModels ?? /* @__PURE__ */ new Map(),
					key: inventoryKey,
					pluginFingerprint,
					nativeSource,
					providers: latestInventory?.providers ?? /* @__PURE__ */ new Map(),
					discoveryOrigins: latestInventory?.discoveryOrigins ?? []
				} : latestInventory;
				if (nextInventory) setCatalogAuth(nextInventory.catalog, catalogAuth);
				if (completed) attempt.published(providerIds, "native");
				else attempt.setPending(void 0, "native");
				for (const failure of failures) attempt.failed(failure.error, failure.providers, "native");
				notifyPreparedModelCatalogPublication(publishCatalog({
					...latest,
					inventory: nextInventory,
					nativeCatalogAcquired: acquiredNative
				}, "native"));
				return published.catalog ?? staticCatalog;
			} catch (_) {
				_usingCtx$3.e = _;
			} finally {
				await _usingCtx$3.d();
			}
		})().catch((error) => {
			attempt.failed(error, failedProviders ?? providerIds, "native");
			if (published.catalog) attempt.withRefreshStatus(published.catalog);
			throw error;
		}).finally(() => {
			if (nativePending === promise) nativePending = void 0;
		});
		nativePending = promise;
		return promise;
	};
	const refreshExpiredModelCatalog = () => {
		assertCurrent();
		if (pending || !published.inventory) return;
		const now = Date.now();
		const providers = [...published.inventory.providers].filter(([, { expiresAt }]) => expiresAt !== void 0 && expiresAt <= now).map(([provider]) => provider);
		if (providers.length) acquireCatalog({
			providerIds: providers,
			refresh: true
		}, false).catch(() => void 0);
	};
	const acquireCatalog = async (options = {}, acquireNative = true) => {
		assertCurrent();
		if (!options.refresh && !options.changedOnly && published.catalog && isPreparedModelCatalogFull(published.catalog)) {
			refreshExpiredModelCatalog();
			return published.catalog;
		}
		const requestedProviders = [...new Set((options.providerIds ?? (options.changedOnly ? Object.keys(params.agentFacts.credentials) : eligibleProviders)).map(normalizeProvider))];
		const providers = requestedProviders.filter((provider) => !options.changedOnly || published.inventory?.providers.get(provider)?.source !== providerSources.get(provider) || published.inventory?.providers.get(provider)?.credentials !== preparedProviderCatalogCredentials(params.agentFacts, provider, normalizeProvider));
		const fullRefresh = !options.changedOnly && !options.providerIds;
		const includeNative = acquireNative && hasNativeCatalog && (!options.changedOnly || !published.nativeCatalogAcquired);
		const nativeProviders = includeNative ? options.providerIds ? requestedProviders : void 0 : [];
		if (!providers.length && !includeNative && !fullRefresh) return published.catalog ?? staticCatalog;
		if (pending) {
			const current = pending;
			const coversProviders = current.providers === void 0 || !fullRefresh && providers.every((provider) => current.providers.includes(provider));
			const coversNative = !includeNative || current.nativeProviders === void 0 || nativeProviders !== void 0 && nativeProviders.every((provider) => current.nativeProviders.includes(provider));
			if (coversProviders && coversNative) return current.promise;
			await current.promise.catch(() => void 0);
			return acquireCatalog(options, acquireNative);
		}
		attempt.setPending(fullRefresh || providers.length ? providers : void 0);
		const promise = (async () => {
			try {
				var _usingCtx3 = _usingCtx();
				_usingCtx3.a({ [Symbol.asyncDispose]: retainPreparedPluginGeneration(params.pluginGeneration) });
				if (fullRefresh || providers.length) {
					const candidate = await acquireProviderCatalog(fullRefresh ? void 0 : providers, providers).catch((error) => {
						attempt.failed(error, providers, "provider");
						throw error;
					});
					attempt.published(fullRefresh ? void 0 : providers, "provider", () => publishCatalog(candidate, "provider"));
				}
				if (includeNative) return await acquireNativeCatalog(options.providerIds ? requestedProviders : void 0);
				return published.catalog ?? staticCatalog;
			} catch (_) {
				_usingCtx3.e = _;
			} finally {
				await _usingCtx3.d();
			}
		})().finally(() => {
			pending = void 0;
		});
		pending = {
			providers: fullRefresh ? void 0 : providers,
			nativeProviders,
			promise
		};
		return promise;
	};
	return {
		initialAuth: currentAuth,
		isCurrent: params.isCurrent,
		withRefreshStatus: attempt.withRefreshStatus,
		loadAuth: async ({ providerIds, profileIds }) => {
			try {
				var _usingCtx4 = _usingCtx();
				assertCurrent();
				_usingCtx4.a({ [Symbol.asyncDispose]: retainPreparedPluginGeneration(params.pluginGeneration) });
				const refreshed = await worker.loadAuth({
					providerIds,
					...profileIds?.length ? { profileIds } : {}
				});
				assertCurrent();
				const previous = getPreparedModelFullCatalogAuth(published.catalog ?? staticCatalog) ?? currentAuth;
				const scope = preparedSyntheticAuthProviderScope(providerIds.map(normalizeProvider));
				const { authStore, authModes } = replacePreparedModelCatalogAuth(previous, refreshed, (provider) => scope.has(normalizeProvider(provider)));
				return {
					authStore,
					authModes: Object.freeze(authModes)
				};
			} catch (_) {
				_usingCtx4.e = _;
			} finally {
				await _usingCtx4.d();
			}
		},
		readFullModelCatalog: () => {
			assertCurrent();
			return published.catalog;
		},
		refreshExpiredModelCatalog,
		readPublishedModels: () => {
			assertCurrent();
			return published.inventory?.runtimeModels;
		},
		loadNativeModelCatalog: async (selection) => await acquireNativeCatalog([normalizeProvider(selection.provider)], selection),
		loadFullModelCatalog: async (options) => {
			if (options?.refresh && params.inventoryOwner.provenance === "standalone") return await acquireCatalog(options);
			let timer;
			try {
				return await Promise.race([acquireCatalog(options), new Promise((resolve) => {
					timer = setTimeout(() => resolve(published.catalog ?? staticCatalog), MODEL_CATALOG_FOREGROUND_WAIT_MS);
					timer.unref?.();
				})]);
			} finally {
				clearTimeout(timer);
			}
		}
	};
}
//#endregion
//#region src/agents/prepared-model-runtime.build.ts
const MAX_CONCURRENT_MODEL_RUNTIME_AGENT_SOURCE_BUILDS = 2;
function groupBuildCandidates(candidates, keyOf) {
	const groups = /* @__PURE__ */ new Map();
	for (const candidate of candidates) {
		const key = keyOf(candidate);
		const group = groups.get(key) ?? [];
		group.push(candidate);
		groups.set(key, group);
	}
	return groups;
}
async function buildSnapshotBatch(requestedCandidates, registryResources, catalogMode, pluginMetadataSnapshot, onBuildStats, includeCredentialProviders = catalogMode === "live", onStage, onPrepared, signal) {
	const configs = /* @__PURE__ */ new Map();
	const candidates = requestedCandidates.map((candidate) => {
		const source = candidate.input.config;
		let shared = configs.get(source);
		if (!shared) {
			const config = captureRuntimeConfig(source);
			shared = {
				config,
				nativeConfigFingerprint: fingerprintPreparedRuntimeFacts({
					agents: config.agents,
					plugins: config.plugins
				})
			};
			configs.set(source, shared);
		}
		return {
			...candidate,
			requestedInput: candidate.input,
			input: {
				...candidate.input,
				config: shared.config
			},
			nativeConfigFingerprint: shared.nativeConfigFingerprint
		};
	});
	const candidateByInput = new Map(candidates.map((candidate) => [candidate.input, candidate]));
	const results = /* @__PURE__ */ new Map();
	const prepareSnapshot = (candidate, agentFacts, pluginGeneration, catalogFacts) => {
		const result = {
			snapshot: createPreparedModelRuntimeSnapshot(candidate.catalogOwner, agentFacts, pluginGeneration, catalogFacts, createFullModelCatalogAccess({
				agentFacts,
				nativeConfigFingerprint: candidate.nativeConfigFingerprint,
				catalogFacts,
				pluginGeneration,
				isCurrent: candidate.isGenerationCurrent ?? (() => false),
				retirementSignal: candidate.retirementSignal,
				inventoryOwner: candidate.inventoryOwner ?? {}
			}), candidate.requestedInput.config),
			pluginGeneration
		};
		results.set(candidate.input, result);
		onPrepared?.(candidate.requestedInput, result);
	};
	const assertBuildCurrent = (input) => assertPreparedModelRuntimeInputCurrent(input, candidateByInput.get(input).isBuildCurrent);
	const preparedGenerations = /* @__PURE__ */ new Set();
	try {
		const generations = groupBuildCandidates(candidates, (candidate) => candidate.pluginGeneration);
		const fresh = generations.get(void 0) ?? [];
		generations.delete(void 0);
		generations.set(void 0, fresh);
		const groups = [...generations].flatMap(([pluginGeneration, generationCandidates]) => [...groupBuildCandidates(generationCandidates, (candidate) => {
			const workspace = preparedModelRuntimeWorkspaceFactsKey(candidate.input);
			if (candidate.inspectRegistry) return `inspection\0${workspace}`;
			const kind = candidate.prepareInboundPluginRegistry ? "configured" : "dynamic";
			return pluginGeneration ? workspace : `${kind}\0${workspace}`;
		}).values()].map((groupCandidates) => ({
			groupCandidates,
			pluginGeneration
		})));
		const preparedInputs = /* @__PURE__ */ new Map();
		const requirePreparedInput = (input) => {
			const prepared = preparedInputs.get(input);
			if (!prepared) throw new Error(`prepared model runtime facts missing for ${input.agentDir}`);
			return prepared;
		};
		const loadInboundPluginRegistry = createPreparedInboundRegistryLoader();
		const configuredModelRegistries = /* @__PURE__ */ new Map();
		const configuredHarnessRuntimesByConfig = /* @__PURE__ */ new Map();
		const configuredModelFactsByConfig = /* @__PURE__ */ new Map();
		const getConfiguredModelFacts = (config, metadata) => {
			let factsByMetadata = configuredModelFactsByConfig.get(config);
			if (!factsByMetadata) {
				factsByMetadata = /* @__PURE__ */ new Map();
				configuredModelFactsByConfig.set(config, factsByMetadata);
			}
			let facts = factsByMetadata.get(metadata);
			if (!facts) {
				facts = prepareConfiguredModelFacts(config, metadata);
				factsByMetadata.set(metadata, facts);
			}
			return facts;
		};
		let runtimePluginMs = 0;
		let pluginMetadataMs = 0;
		let staticProviderCatalogMs = 0;
		let ambientCredentialsMs = 0;
		let agentFactsMs = 0;
		let configuredProjectionMs = 0;
		let runtimeRegistryCount = 0;
		let registryMs = 0;
		const preparedCatalogs = /* @__PURE__ */ new Map();
		const workspaceFactsStartedAt = performance.now();
		for (const { groupCandidates, pluginGeneration } of groups) {
			await setImmediate();
			for (const candidate of groupCandidates) assertBuildCurrent(candidate.input);
			const prepareInboundPluginRegistry = groupCandidates.some((candidate) => candidate.prepareInboundPluginRegistry);
			const preferBuiltPluginArtifacts = pluginGeneration?.preferBuiltPluginArtifacts ?? prepareInboundPluginRegistry;
			const getConfiguredHarnessRuntimes = () => {
				const config = groupCandidates[0].input.config;
				let runtimes = configuredHarnessRuntimesByConfig.get(config);
				if (!runtimes) {
					runtimes = collectConfiguredAgentHarnessRuntimes(config);
					configuredHarnessRuntimesByConfig.set(config, runtimes);
				}
				return runtimes;
			};
			const prepared = await prepareWorkspaceBuildGroup(groupCandidates.map(({ input }) => input), catalogMode, {
				preferBuiltPluginArtifacts,
				includeCredentialProviders,
				getConfiguredHarnessRuntimes,
				getConfiguredModelFacts,
				assertCurrent: assertBuildCurrent,
				onBeforeAuthCapture: (input) => candidateByInput.get(input).onBeforeAuthCapture?.(),
				onStage,
				signal,
				registryResources,
				...groupCandidates.some((candidate) => candidate.inspectRegistry) ? { loadRuntimeRegistry: registryResources.load.bind(registryResources) } : {}
			}, prepareInboundPluginRegistry ? loadInboundPluginRegistry : void 0, pluginGeneration, pluginMetadataSnapshot);
			preparedGenerations.add(prepared.pluginGeneration);
			assertPreparedModelRuntimeCandidatesCurrent(groupCandidates);
			runtimePluginMs += prepared.buildStats.runtimePluginMs;
			pluginMetadataMs += prepared.buildStats.pluginMetadataMs;
			staticProviderCatalogMs += prepared.buildStats.staticProviderCatalogMs;
			ambientCredentialsMs += prepared.buildStats.ambientCredentialsMs;
			agentFactsMs += prepared.buildStats.agentFactsMs;
			configuredProjectionMs += prepared.buildStats.configuredProjectionMs;
			for (const agentFacts of prepared.agentFacts) preparedInputs.set(agentFacts.input, {
				agentFacts,
				pluginGeneration: prepared.pluginGeneration
			});
			if (catalogMode === "static") {
				const startedAt = performance.now();
				const batch = await prepareConfiguredRuntimeFactsBatch({
					agentFacts: prepared.agentFacts,
					pluginGeneration: prepared.pluginGeneration,
					assertCurrent: assertBuildCurrent,
					registries: configuredModelRegistries
				});
				runtimeRegistryCount += batch.registryCount;
				registryMs += performance.now() - startedAt;
				for (const candidate of groupCandidates) {
					await setImmediate();
					assertBuildCurrent(candidate.input);
					const facts = batch.catalogs.get(candidate.input);
					preparedCatalogs.set(candidate.input, facts);
					prepareSnapshot(candidate, requirePreparedInput(candidate.input).agentFacts, prepared.pluginGeneration, facts);
				}
			}
			await settlePluginNativeAdmissions(getPluginMetadataSnapshotCache(prepared.pluginGeneration.pluginMetadataSnapshot));
			assertPreparedModelRuntimeCandidatesCurrent(groupCandidates);
		}
		const workspaceFactsMs = performance.now() - workspaceFactsStartedAt;
		const catalogSourceStartedAt = performance.now();
		onStage?.("agent catalog sources");
		const catalogSources = /* @__PURE__ */ new Map();
		if (catalogMode === "live") {
			const sourceCandidatesByAgentDir = groupBuildCandidates(candidates, ({ input }) => input.agentDir);
			const sourceErrors = [];
			const sourceBuild = await runTasksWithConcurrency({
				limit: MAX_CONCURRENT_MODEL_RUNTIME_AGENT_SOURCE_BUILDS,
				errorMode: "stop",
				onTaskError: (error) => {
					sourceErrors.push(error);
				},
				tasks: [...sourceCandidatesByAgentDir.values()].map((sourceCandidates) => async () => {
					for (const candidate of sourceCandidates) {
						await setImmediate();
						const { input } = candidate;
						const { agentFacts, pluginGeneration } = requirePreparedInput(input);
						assertPreparedModelRuntimeInputCurrent(input, candidate.isBuildCurrent);
						const catalogSource = await prepareAgentCatalogSource(agentFacts, pluginGeneration, catalogMode);
						assertPreparedModelRuntimeInputCurrent(input, candidate.isBuildCurrent);
						catalogSources.set(input, catalogSource);
					}
				})
			});
			if (sourceBuild.hasError) throw toStringifiedError(sourceErrors.find((error) => !(error instanceof PreparedModelRuntimePublicationSupersededError)) ?? sourceBuild.firstError);
		}
		const catalogSourceMs = performance.now() - catalogSourceStartedAt;
		const registryStartedAt = performance.now();
		onStage?.("model registries");
		if (catalogMode === "live") for (const candidate of candidates) {
			await setImmediate();
			const { input } = candidate;
			const { agentFacts, pluginGeneration } = requirePreparedInput(input);
			const catalogSource = catalogSources.get(input);
			if (!catalogSource) throw new Error(`prepared model runtime catalog source missing for ${input.agentDir}`);
			assertPreparedModelRuntimeInputCurrent(input, candidate.isBuildCurrent);
			preparedCatalogs.set(input, await prepareFullCatalogFacts(agentFacts, pluginGeneration, catalogMode, catalogSource));
			assertPreparedModelRuntimeInputCurrent(input, candidate.isBuildCurrent);
			runtimeRegistryCount += 1;
		}
		registryMs += performance.now() - registryStartedAt;
		const preparedAgentFacts = [...preparedInputs.values()].map(({ agentFacts }) => agentFacts);
		const configuredRuntimeModelCount = [...preparedCatalogs.values()].reduce((count, facts) => count + facts.configuredRuntimeModels.length, 0);
		const generatedCatalogPluginCount = new Set(preparedAgentFacts.flatMap((facts) => facts.configuredGeneratedCatalogPluginIds)).size;
		const generatedCatalogReadCount = preparedAgentFacts.reduce((count, facts) => count + facts.configuredGeneratedCatalogPluginIds.length, 0);
		onBuildStats?.({
			agentCount: candidates.length,
			workspaceGroupCount: groups.length,
			configuredFactsGroupCount: groups.length,
			catalogSourceCount: catalogMode === "live" ? preparedAgentFacts.filter(({ input }) => !input.readOnly).length : 0,
			credentialGroupCount: new Set(preparedAgentFacts.map(({ credentials }) => fingerprintPreparedRuntimeFacts(credentials))).size,
			catalogGroupCount: catalogMode === "live" ? candidates.length : 0,
			runtimeRegistryCount,
			configuredRuntimeModelCount,
			generatedCatalogPluginCount,
			generatedCatalogReadCount,
			workspaceFactsMs,
			runtimePluginMs,
			pluginMetadataMs,
			staticProviderCatalogMs,
			ambientCredentialsMs,
			agentFactsMs,
			configuredProjectionMs,
			catalogSourceMs,
			registryMs,
			sourceConcurrencyLimit: MAX_CONCURRENT_MODEL_RUNTIME_AGENT_SOURCE_BUILDS,
			fullCatalogConcurrencyLimit: 1
		});
		assertPreparedModelRuntimeCandidatesCurrent(candidates);
		for (const candidate of candidates) {
			if (results.has(candidate.input)) continue;
			await setImmediate();
			const { input } = candidate;
			assertBuildCurrent(input);
			const { agentFacts, pluginGeneration } = requirePreparedInput(input);
			const catalogFacts = preparedCatalogs.get(input);
			if (!catalogFacts) throw new Error(`prepared model runtime snapshot facts missing for ${input.agentDir}`);
			prepareSnapshot(candidate, agentFacts, pluginGeneration, catalogFacts);
		}
		assertPreparedModelRuntimeCandidatesCurrent(candidates);
		return candidates.map(({ input }) => results.get(input));
	} catch (error) {
		const failures = (await Promise.allSettled([...preparedGenerations].map(discardPreparedPluginGeneration))).flatMap((result) => result.status === "rejected" ? [result.reason] : []);
		if (failures.length) throw new AggregateError([error, ...failures], "Prepared model build and cleanup failed", { cause: error });
		throw error;
	}
}
function startSerializedSnapshotBuildBatch(candidates, agentBuildCompletions, buildTimeoutMs, catalogMode = "live", onBuildStats, pluginMetadataSnapshot, includeCredentialProviders = catalogMode === "live", progress, acquisitionSignal) {
	const cancellation = new AbortController();
	const signal = acquisitionSignal ? AbortSignal.any([acquisitionSignal, cancellation.signal]) : cancellation.signal;
	const finished = createDeferredCore();
	const unregisterClose = registerPreparedModelRuntimeClose(async (error) => {
		cancellation.abort(error);
		await finished.promise;
	});
	const agentDirs = [...new Set(candidates.map(({ input }) => input.agentDir))];
	let stage = "previous generation completion";
	const previousBuildCompletions = agentDirs.map((agentDir) => agentBuildCompletions.get(agentDir)).filter((completion) => completion !== void 0);
	const agentCompletions = progress ? new Map(agentDirs.map((agentDir) => [agentDir, createDeferredCore()])) : void 0;
	const remainingByAgent = new Map(agentDirs.map((agentDir) => [agentDir, candidates.filter(({ input }) => input.agentDir === agentDir).length]));
	const startBuild = (async () => {
		try {
			var _usingCtx$2 = _usingCtx();
			registerPreparedPluginLifetime();
			const registryResources = _usingCtx$2.a(new PreparedModelRuntimeBuildResources(retainPreparedPluginRegistry));
			if (previousBuildCompletions.length > 0) {
				await Promise.all(previousBuildCompletions);
				assertPreparedModelRuntimeCandidatesCurrent(candidates);
			}
			signal.throwIfAborted();
			return await buildSnapshotBatch(candidates, registryResources, catalogMode, pluginMetadataSnapshot, onBuildStats, includeCredentialProviders, (nextStage) => {
				stage = nextStage;
				progress?.onStage(nextStage);
			}, progress ? (input, result) => {
				progress.onPrepared(input, result);
				const remaining = remainingByAgent.get(input.agentDir) - 1;
				remainingByAgent.set(input.agentDir, remaining);
				if (remaining === 0) agentCompletions.get(input.agentDir).resolve();
			} : void 0, signal);
		} catch (_) {
			_usingCtx$2.e = _;
		} finally {
			await _usingCtx$2.d();
		}
	})();
	let abandoned = false;
	const pending = runAbortableTimeout(() => startBuild, buildTimeoutMs, () => `prepared model runtime publication (${stage})`).catch((error) => {
		abandoned = true;
		throw error;
	});
	const completion = startBuild.then(async (results) => {
		if (abandoned) await Promise.all(results.map(({ pluginGeneration }) => discardPreparedPluginGeneration(pluginGeneration)));
	}, () => {}).then(() => {}, () => {});
	for (const agentDir of agentDirs) {
		const agentCompletion = agentCompletions?.get(agentDir);
		if (agentCompletion) completion.then(() => agentCompletion.resolve());
		const ownedCompletion = agentCompletion?.promise ?? completion;
		agentBuildCompletions.set(agentDir, ownedCompletion);
		ownedCompletion.then(() => {
			if (agentBuildCompletions.get(agentDir) === ownedCompletion) agentBuildCompletions.delete(agentDir);
		});
	}
	completion.then(() => {
		unregisterClose();
		finished.resolve();
	});
	return {
		pending,
		completion
	};
}
//#endregion
//#region src/agents/prepared-model-runtime.retention.ts
function retirePreparedModelRuntimeOwnerIfUnused(owners, key, owner, retained = false) {
	if ((owner.provenance === "run" || owner.provenance === "ephemeral") && (owner.admissionCount ?? 0) === 0 && (owner.leaseCount ?? 0) === 0 && !retained) {
		if (owners.get(key) === owner) owners.delete(key);
		retirePreparedModelRuntimeGeneration(owner);
		releasePreparedPluginPublication(owner);
	}
}
var PreparedModelRuntimeOwnerRetention = class {
	#retained = /* @__PURE__ */ new Map();
	constructor(maxSize) {
		this.maxSize = maxSize;
	}
	clear(owners) {
		for (const [key, owner] of this.#retained) retirePreparedModelRuntimeOwnerIfUnused(owners, key, owner);
		this.#retained.clear();
	}
	has(key, owner) {
		return this.#retained.get(key) === owner;
	}
	retain(key, owner, owners) {
		if (owner.provenance !== "run") return;
		this.#retained.delete(key);
		this.#retained.set(key, owner);
		while (this.#retained.size > this.maxSize) {
			const oldest = this.#retained.entries().next().value;
			if (!oldest) return;
			const [oldestKey, oldestOwner] = oldest;
			this.#retained.delete(oldestKey);
			retirePreparedModelRuntimeOwnerIfUnused(owners, oldestKey, oldestOwner);
		}
	}
};
async function acquireRetainedAgentRuntimeCleanupRegistries(agentDir, context) {
	const registries = /* @__PURE__ */ new Set();
	const releases = [];
	try {
		for (const [key, owner] of context.owners) {
			const generation = owner.pluginGeneration;
			const registry = generation?.pluginRegistry;
			if (owner.input.agentDir !== agentDir || owner.input.readOnly || owner.provenance === "ephemeral" || !generation || !registry || registries.has(registry) || owner.provenance === "run" && !owner.leaseCount && !context.retainedGatewayRunOwners.has(key, owner) && !context.retainedDirectRunOwners.has(key, owner)) continue;
			releases.push(retainPreparedPluginGeneration(generation));
			registries.add(registry);
		}
	} catch (error) {
		await Promise.allSettled(releases.map((release) => release()));
		throw error;
	}
	return {
		registries: [...registries],
		async [Symbol.asyncDispose]() {
			await Promise.all(releases.map((release) => release()));
		}
	};
}
//#endregion
//#region src/agents/prepared-model-runtime.owner.ts
const ownersBySnapshot = /* @__PURE__ */ new WeakMap();
function resolvePreparedModelRuntimeOwnerBySnapshot(snapshot) {
	return ownersBySnapshot.get(snapshot);
}
function publishPreparedModelRuntimeOwnerSnapshot(owner, snapshot) {
	const published = stampPreparedModelRuntimeSnapshotConfig(snapshot, owner.input.config);
	if (owner.snapshot) ownersBySnapshot.delete(owner.snapshot);
	owner.snapshot = published;
	ownersBySnapshot.set(published, owner);
	return published;
}
function prepareModelRuntimeOwner(input, provenance, catalogMode = "live", existing) {
	return Object.assign(existing ?? {
		generation: 0,
		needsRefresh: true,
		catalogStale: false
	}, {
		input,
		catalogOwner: preparePublishedModelCatalogOwnerIdentity(input),
		environmentFingerprint: effectiveEnvironmentFingerprint(input),
		catalogMode,
		provenance
	});
}
function findConfiguredOwnerCandidates(owners, input) {
	const configured = [...owners.values()].filter((owner) => owner.provenance === "configured");
	const identityCandidates = input.agentId === void 0 ? [] : configured.filter((owner) => owner.input.agentId === input.agentId);
	const exactCandidates = identityCandidates.filter((owner) => owner.input.agentDir === input.agentDir);
	const directoryCandidates = configured.filter((owner) => owner.input.agentDir === input.agentDir);
	const canRebindByDirectory = input.agentId === void 0 || isReservedSystemAgentId(input.agentId);
	return exactCandidates.length > 0 ? exactCandidates : canRebindByDirectory && directoryCandidates.length > 0 ? directoryCandidates : identityCandidates;
}
function resolveConfiguredOwnerPublication(owners, rawInput) {
	const candidates = findConfiguredOwnerCandidates(owners, normalizePreparedModelRuntimeInput(rawInput));
	return {
		matches: candidates.length > 0,
		pending: candidates.length === 1 ? candidates[0]?.pending : void 0
	};
}
function resolveConfiguredOwner(owners, rawInput) {
	const candidates = findConfiguredOwnerCandidates(owners, normalizePreparedModelRuntimeInput(rawInput));
	return candidates.length === 1 ? candidates[0] : void 0;
}
function rebindInputToCommittedConfiguredOwner(owners, rawInput) {
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const candidates = findConfiguredOwnerCandidates(owners, input).filter((owner) => owner.snapshot && !owner.needsRefresh && !owner.pending);
	const owner = candidates.length === 1 ? candidates[0] : void 0;
	if (!owner) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model runtime owner was not committed after replacement for ${input.agentDir}`);
	const preserveWorkspaceDir = input.preserveWorkspaceDirOnRefresh === true && input.workspaceDir !== void 0;
	const agentId = input.agentId ?? owner.input.agentId;
	return normalizePreparedModelRuntimeInput({
		...input,
		...agentId ? { agentId } : {},
		agentDir: owner.input.agentDir,
		config: owner.input.config,
		inheritedAuthDir: owner.input.inheritedAuthDir,
		env: owner.input.env,
		workspaceDir: preserveWorkspaceDir ? input.workspaceDir : owner.input.workspaceDir,
		preserveWorkspaceDirOnRefresh: preserveWorkspaceDir,
		allowGatewaySubagentBinding: input.allowGatewaySubagentBinding ?? owner.input.allowGatewaySubagentBinding,
		runtimePluginSelections: input.runtimePluginSelections ?? owner.input.runtimePluginSelections
	});
}
/** Accepts canonical config clones without weakening projected-config isolation. */
function preparedModelRuntimeConfigsMatch(left, right) {
	if (left === right) return true;
	try {
		return hashRuntimeConfigValue(left) === hashRuntimeConfigValue(right);
	} catch {
		return false;
	}
}
function stampPreparedModelRuntimeSnapshotConfig(snapshot, config) {
	if (snapshot.config === config) return snapshot;
	const stamped = Object.freeze({
		...snapshot,
		config
	});
	copyPreparedModelRuntimeAuthBindings(snapshot, stamped);
	return stamped;
}
function advancePreparedModelRuntimeOwnerConfig(owner, config) {
	owner.input = {
		...owner.input,
		config
	};
	if (owner.snapshot) publishPreparedModelRuntimeOwnerSnapshot(owner, owner.snapshot);
}
function normalizeOptionalDir(dirname) {
	return dirname ? path.resolve(dirname) : void 0;
}
function normalizePreparedModelRuntimeInput(input) {
	const { inheritedAuthDir: _inheritedAuthDir, readOnly, runtimePluginSelections: _runtimePluginSelections, skipCredentials, workspaceDir: _workspaceDir, ...rest } = input;
	const inheritedAuthDir = normalizeOptionalDir(input.inheritedAuthDir ?? resolveLegacyInheritedAuthDir(input.config, input.env));
	const workspaceDir = normalizeOptionalDir(input.workspaceDir);
	const env = input.env ? Object.freeze({ ...input.env }) : void 0;
	const selections = /* @__PURE__ */ new Map();
	for (const selection of input.runtimePluginSelections ?? []) {
		const runtime = resolveSelectedAgentHarnessRuntime({
			...selection,
			agentId: selection.agentId ?? input.agentId
		}, input.config);
		const { agentId: _agentId, ...normalized } = selection;
		const entry = Object.freeze({
			...normalized,
			runtime: runtime === "auto" ? "openclaw" : runtime
		});
		selections.set(JSON.stringify(entry), entry);
	}
	const runtimePluginSelections = Object.freeze([...selections].toSorted(([left], [right]) => left.localeCompare(right)).map(([, entry]) => entry));
	return {
		...rest,
		agentDir: path.resolve(input.agentDir),
		...inheritedAuthDir ? { inheritedAuthDir } : {},
		...readOnly === true ? { readOnly: true } : {},
		...skipCredentials === true ? { skipCredentials: true } : {},
		...workspaceDir ? { workspaceDir } : {},
		...env ? { env } : {},
		...input.allowGatewaySubagentBinding === true ? { allowGatewaySubagentBinding: true } : {},
		...runtimePluginSelections?.length ? { runtimePluginSelections } : {}
	};
}
function environmentFingerprint(env) {
	return env ? hashRuntimeConfigValue(env) : void 0;
}
function effectiveEnvironmentFingerprint(input) {
	return hashRuntimeConfigValue(input.env ?? process.env);
}
function ownerKey(input) {
	return JSON.stringify({
		agentId: input.agentId,
		agentDir: input.agentDir,
		inheritedAuthDir: input.inheritedAuthDir,
		readOnly: input.readOnly === true,
		loadRuntimePlugins: input.loadRuntimePlugins === true,
		skipCredentials: input.skipCredentials === true,
		workspaceDir: input.workspaceDir,
		env: environmentFingerprint(input.env),
		allowGatewaySubagentBinding: input.allowGatewaySubagentBinding === true,
		runtimePluginSelections: input.runtimePluginSelections,
		config: input.readOnly ? hashRuntimeConfigValue(input.config) : void 0
	});
}
let activePreparedModelRuntimeReadBatch;
/** Reuse configured candidates only during synchronous reads; never publish or yield here. */
function withPreparedModelRuntimeReadBatch(read) {
	const parent = activePreparedModelRuntimeReadBatch;
	activePreparedModelRuntimeReadBatch = /* @__PURE__ */ new WeakMap();
	try {
		return read();
	} finally {
		activePreparedModelRuntimeReadBatch = parent;
	}
}
function configuredOwnerCandidates(owners, agentId) {
	const batch = activePreparedModelRuntimeReadBatch;
	if (!batch || agentId === void 0) return owners.values();
	let byAgent = batch.get(owners);
	if (!byAgent) {
		byAgent = /* @__PURE__ */ new Map();
		for (const owner of owners.values()) {
			if (owner.provenance !== "configured" || owner.input.agentId === void 0) continue;
			const matches = byAgent.get(owner.input.agentId);
			if (matches) matches.push(owner);
			else byAgent.set(owner.input.agentId, [owner]);
		}
		batch.set(owners, byAgent);
	}
	return byAgent.get(agentId) ?? [];
}
function resolvePublishedOwner(owners, input, options = {}) {
	const exact = owners.get(ownerKey(input));
	if (exact) return exact;
	if (!options.allowConfiguredWorkspaceFallback) return;
	const candidates = [...configuredOwnerCandidates(owners, input.agentId)].filter((owner) => owner.provenance === "configured" && (input.agentId === void 0 || owner.input.agentId === input.agentId) && owner.input.agentDir === input.agentDir && owner.input.inheritedAuthDir === input.inheritedAuthDir && owner.input.readOnly === input.readOnly && owner.input.loadRuntimePlugins === input.loadRuntimePlugins && owner.input.skipCredentials === input.skipCredentials && (input.allowGatewaySubagentBinding === void 0 || owner.input.allowGatewaySubagentBinding === input.allowGatewaySubagentBinding) && (input.runtimePluginSelections === void 0 || JSON.stringify(owner.input.runtimePluginSelections) === JSON.stringify(input.runtimePluginSelections)) && (input.env === void 0 || owner.environmentFingerprint === environmentFingerprint(input.env)) && (input.workspaceDir === void 0 || owner.input.workspaceDir === input.workspaceDir));
	return candidates.length === 1 ? candidates[0] : void 0;
}
/** Reads an already-published generation without admitting discovery. */
function readPublishedModelRuntimeSnapshot(owners, rawInput) {
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const owner = resolvePublishedOwner(owners, input, { allowConfiguredWorkspaceFallback: rawInput.workspaceDir === void 0 || rawInput.agentId === void 0 || rawInput.runtimePluginSelections === void 0 });
	if (!owner?.snapshot || owner.needsRefresh || owner.pending) return;
	if (input.readOnly && !preparedModelRuntimeConfigsMatch(owner.input.config, input.config)) return;
	return owner.snapshot;
}
function hasSameLifecycleInput(left, right) {
	return left.config === right.config && left.agentId === right.agentId && left.inheritedAuthDir === right.inheritedAuthDir && left.readOnly === right.readOnly && left.loadRuntimePlugins === right.loadRuntimePlugins && left.skipCredentials === right.skipCredentials && left.workspaceDir === right.workspaceDir && environmentFingerprint(left.env) === environmentFingerprint(right.env) && left.preserveWorkspaceDirOnRefresh === right.preserveWorkspaceDirOnRefresh && left.allowGatewaySubagentBinding === right.allowGatewaySubagentBinding && JSON.stringify(left.runtimePluginSelections) === JSON.stringify(right.runtimePluginSelections);
}
async function publishPreparedModelRuntimeOwnerBatch(params, settleSingleOwner) {
	try {
		var _usingCtx$1 = _usingCtx();
		const candidates = params.ownersToPublish.map((owner) => {
			const input = owner.input;
			owner.environmentFingerprint = effectiveEnvironmentFingerprint(input);
			owner.generation += 1;
			retirePreparedModelRuntimeGeneration(owner);
			owner.authCaptureStarted = false;
			owner.needsRefresh = true;
			owner.refreshError = void 0;
			owner.pendingPluginGeneration = params.selectPluginGeneration?.(owner);
			const generation = owner.generation;
			const key = ownerKey(input);
			let registered = params.owners.get(key) === owner;
			const isGenerationCurrent = () => owner.generation === generation && params.owners.get(key) === owner;
			const isCurrent = () => (params.isPublicationCurrent?.() ?? true) && isGenerationCurrent();
			return {
				catalogMode: owner.catalogMode,
				input,
				catalogOwner: owner.catalogOwner,
				inventoryOwner: owner,
				pluginGeneration: owner.pendingPluginGeneration,
				prepareInboundPluginRegistry: owner.provenance === "configured",
				inspectRegistry: owner.provenance === "run" || owner.provenance === "ephemeral" && input.readOnly === true,
				isGenerationCurrent,
				retirementSignal: capturePreparedModelRuntimeGeneration(owner),
				isBuildCurrent: params.isBuildCurrent ?? isCurrent,
				onBeforeAuthCapture: () => {
					if (owner.generation === generation) owner.authCaptureStarted = true;
				},
				isEligible: () => (params.isPublicationCurrent?.() ?? true) && owner.generation === generation && (registered ? params.owners.get(key) === owner : params.registerEntriesAfterBuildStart === true),
				isCurrent,
				key,
				generation,
				markRegistered: () => {
					registered = true;
				},
				owner
			};
		});
		const groups = /* @__PURE__ */ new Map();
		for (const candidate of candidates) {
			const group = groups.get(candidate.catalogMode);
			if (group) group.push(candidate);
			else groups.set(candidate.catalogMode, [candidate]);
		}
		const results = /* @__PURE__ */ new Map();
		const publishCandidate = (candidate) => {
			if (!candidate.isCurrent()) return;
			const result = results.get(candidate.owner);
			if (!result || candidate.owner.snapshot === result.snapshot) return;
			publishPreparedPluginGeneration(candidate.owner, result.pluginGeneration);
			const snapshot = publishPreparedModelRuntimeOwnerSnapshot(candidate.owner, result.snapshot);
			results.set(candidate.owner, {
				...result,
				snapshot
			});
			candidate.owner.pluginGeneration = result.pluginGeneration;
			candidate.owner.needsRefresh = false;
		};
		_usingCtx$1.a({ [Symbol.asyncDispose]: async () => {
			const failures = (await Promise.allSettled([...results.values()].map((result) => discardPreparedPluginGeneration(result.pluginGeneration)))).flatMap((result) => result.status === "rejected" ? [result.reason] : []);
			if (failures.length) {
				if (settleSingleOwner) throw failures[0];
				throw new AggregateError(failures, "Prepared publication cleanup failed");
			}
		} });
		try {
			while (true) {
				const attempt = candidates.filter((candidate) => candidate.isEligible() && !results.has(candidate.owner));
				if (attempt.length === 0) break;
				try {
					for (const [catalogMode, group] of groups) {
						const currentGroup = group.filter((candidate) => candidate.isEligible() && !results.has(candidate.owner));
						if (currentGroup.length === 0) continue;
						const build = startSerializedSnapshotBuildBatch(currentGroup, params.agentBuildCompletions, params.buildTimeoutMs, catalogMode, params.onBuildStats, params.pluginMetadataSnapshot, params.includeCredentialProviders, params.progress ? {
							onStage: params.progress.onStage,
							onPrepared: (input, result) => {
								const candidate = currentGroup.find((entry) => entry.input === input);
								results.set(candidate.owner, result);
								publishCandidate(candidate);
								params.progress.onPublished();
							}
						} : void 0, params.acquisitionSignal);
						for (const candidate of currentGroup) {
							if (params.registerEntriesAfterBuildStart === true) {
								const previous = params.owners.get(candidate.key);
								params.owners.set(candidate.key, candidate.owner);
								if (previous && previous !== candidate.owner) {
									retirePreparedModelRuntimeGeneration(previous);
									releasePreparedPluginPublication(previous);
								}
								candidate.markRegistered();
							}
							const completion = params.agentBuildCompletions.get(candidate.input.agentDir);
							candidate.owner.buildCompletion = completion;
							completion.then(() => {
								if (candidate.owner.buildCompletion === completion) candidate.owner.buildCompletion = void 0;
							});
						}
						const built = await build.pending;
						for (const [index, candidate] of currentGroup.entries()) if (!results.has(candidate.owner)) results.set(candidate.owner, built[index]);
					}
					break;
				} catch (error) {
					const refreshError = toStringifiedError(error);
					const lostCandidate = attempt.some((candidate) => !candidate.isCurrent());
					if (settleSingleOwner || !(refreshError instanceof PreparedModelRuntimePublicationSupersededError) || !(params.isPublicationCurrent?.() ?? true) || !lostCandidate) throw refreshError;
				}
			}
			for (const candidate of candidates) {
				if (!settleSingleOwner && candidate.owner.generation === candidate.generation) candidate.owner.pendingPluginGeneration = void 0;
				if (!candidate.isCurrent()) continue;
				if (!results.get(candidate.owner)) throw new Error(`prepared model runtime snapshot missing after auth refresh for ${candidate.input.agentDir}`);
				publishCandidate(candidate);
			}
			settleSingleOwner?.published(candidates[0].isCurrent);
		} catch (error) {
			const refreshError = toStringifiedError(error);
			for (const candidate of candidates) {
				if (candidate.owner.generation === candidate.generation) candidate.owner.pendingPluginGeneration = void 0;
				if (!candidate.isCurrent()) continue;
				if (params.progress && candidate.owner.snapshot && !candidate.owner.needsRefresh) continue;
				candidate.owner.needsRefresh = true;
				candidate.owner.refreshError = refreshError;
			}
			settleSingleOwner?.failed(refreshError, candidates[0].isCurrent);
			throw refreshError;
		}
	} catch (_) {
		_usingCtx$1.e = _;
	} finally {
		await _usingCtx$1.d();
	}
}
async function publishModelRuntimeSnapshot(input, owners, agentBuildCompletions, buildTimeoutMs, existing, provenance = "explicit", catalogMode = existing?.catalogMode ?? "live", reusablePluginGeneration, pluginMetadataSnapshot) {
	const key = ownerKey(input);
	const owner = prepareModelRuntimeOwner(input, provenance, catalogMode, existing);
	owner.pluginGeneration = void 0;
	const publication = createDeferredCore();
	owner.pending = publication.promise;
	let snapshot;
	publishPreparedModelRuntimeOwnerBatch({
		ownersToPublish: [owner],
		owners,
		agentBuildCompletions,
		buildTimeoutMs,
		registerEntriesAfterBuildStart: true,
		selectPluginGeneration: () => reusablePluginGeneration,
		pluginMetadataSnapshot
	}, {
		published: (isGenerationCurrent) => {
			assertPreparedModelRuntimeInputCurrent(input, isGenerationCurrent);
			snapshot = owner.snapshot;
			owner.pendingPluginGeneration = void 0;
			owner.pending = void 0;
		},
		failed: (refreshError, isGenerationCurrent) => {
			if (isGenerationCurrent()) {
				owner.pending = void 0;
				if (!owner.snapshot) retirePreparedModelRuntimeOwnerIfUnused(owners, key, owner);
			} else if (isPreparedModelRuntimePluginLifecycleFailure(refreshError)) throw new PreparedModelRuntimePublicationSupersededError(`prepared model runtime publication was superseded for ${input.agentDir}`, { cause: refreshError });
		}
	}).then(() => publication.resolve(snapshot), publication.reject);
	return await publication.promise;
}
//#endregion
//#region src/agents/prepared-model-runtime-auth-publication.ts
function partitionAuthMutationOwners(mutations) {
	const components = [];
	for (const invalidatedOwners of mutations) {
		const target = new Set(invalidatedOwners);
		let insertAt = components.length;
		for (let index = components.length - 1; index >= 0; index -= 1) {
			if (![...target].some((owner) => components[index].has(owner))) continue;
			insertAt = index;
			for (const owner of components[index]) target.add(owner);
			components.splice(index, 1);
		}
		components.splice(insertAt, 0, target);
	}
	return components.map((component) => Array.from(component));
}
var PreparedModelRuntimeAuthPublicationOwner = class {
	#events = [];
	#transaction;
	#drainTail = Promise.resolve();
	enqueue(invalidatedOwners, profileSetChanged = false) {
		this.#events.push([...invalidatedOwners]);
		const transaction = this.#transaction ?? (this.#transaction = {
			ownerGates: /* @__PURE__ */ new Map(),
			publicationQueued: false,
			profileSetChanged: false
		});
		transaction.profileSetChanged ||= profileSetChanged;
		for (const owner of invalidatedOwners) {
			let gate = transaction.ownerGates.get(owner);
			if (!gate) {
				gate = createDeferredCore();
				transaction.ownerGates.set(owner, gate);
				gate.promise.catch(() => void 0);
			}
			owner.pending = gate.promise;
		}
		return transaction;
	}
	claimPublication(transaction) {
		if (transaction.publicationQueued) return false;
		transaction.publicationQueued = true;
		return true;
	}
	isCurrent(transaction) {
		return this.#transaction === transaction;
	}
	adopt(gateId) {
		if (this.#transaction) this.#transaction.adoptedBy = gateId;
	}
	adoptTransaction(transaction, gateId) {
		if (this.#transaction === transaction) transaction.adoptedBy = gateId;
	}
	prepareAdoptedCommit(gateId) {
		const transaction = this.#transaction;
		if (transaction?.adoptedBy !== gateId) return;
		this.clearOwnerGates(transaction);
		return transaction;
	}
	releaseAdopted(gateId) {
		if (this.#transaction?.adoptedBy === gateId) this.#transaction.adoptedBy = void 0;
	}
	resolve(transaction, owners) {
		if (this.#transaction !== transaction) return false;
		if (transaction.adoptedBy) this.#transaction = void 0;
		else if (transaction.ownerGates.size === 0) {
			this.#transaction = void 0;
			return true;
		} else return false;
		this.clearOwnerGates(transaction);
		for (const [owner, gate] of transaction.ownerGates) {
			const published = owners.get(ownerKey(owner.input)) ?? resolveConfiguredOwner(owners, owner.input);
			if (published?.snapshot && !published.needsRefresh && !published.pending) gate.resolve(published.snapshot);
			else gate.reject(new PreparedModelRuntimePublicationSupersededError(`prepared model runtime publication was superseded for ${owner.input.agentDir}`));
		}
		return true;
	}
	settleComponent(transaction, componentOwners, owners, publishOwners) {
		if (this.#transaction !== transaction || transaction.adoptedBy) return;
		const queuedOwners = new Set(this.#events.flat());
		const completed = componentOwners.flatMap((owner) => {
			const gate = transaction.ownerGates.get(owner);
			return gate && !queuedOwners.has(owner) ? [{
				owner,
				gate
			}] : [];
		}).flatMap(({ owner, gate }) => owner.pending === gate.promise && owners.get(ownerKey(owner.input)) === owner && owner.snapshot && !owner.needsRefresh ? [{
			owner,
			gate,
			snapshot: owner.snapshot
		}] : []);
		for (const { owner } of completed) owner.pending = void 0;
		try {
			if (completed.length > 0) publishOwners(completed.map(({ owner }) => owner));
		} catch (error) {
			for (const { owner, gate } of completed) if (transaction.ownerGates.get(owner) === gate && owner.pending === void 0) owner.pending = gate.promise;
			throw error;
		}
		for (const { owner, gate, snapshot } of completed) {
			transaction.ownerGates.delete(owner);
			gate.resolve(snapshot);
		}
		this.rejectComponentOwners(transaction, componentOwners, new PreparedModelRuntimePublicationSupersededError("prepared model runtime auth publication owner was superseded"));
	}
	reject(transaction, error) {
		if (this.#transaction === transaction) this.#transaction = void 0;
		this.clearOwnerGates(transaction);
		for (const gate of transaction.ownerGates.values()) gate.reject(error);
	}
	rejectAdopted(gateId, error) {
		if (this.#transaction?.adoptedBy === gateId) this.reject(this.#transaction, error);
	}
	async drain(params) {
		const pending = this.#drainTail.then(() => this.drainNow(params));
		this.#drainTail = pending.then(() => void 0, () => void 0);
		await pending;
	}
	async drainNow(params) {
		while (this.#events.length > 0) {
			const components = partitionAuthMutationOwners(this.#events.splice(0));
			for (const componentOwners of components) {
				const owners = componentOwners.filter((owner) => params.owners.get(ownerKey(owner.input)) === owner);
				const reusedOwners = new Set(owners.filter((owner) => owner.pluginGeneration !== void 0));
				const gates = owners.flatMap((owner) => this.#transaction?.ownerGates.get(owner) ?? []);
				const retrying = gates.some((gate) => gate.retried);
				for (const gate of gates) gate.retried = retrying;
				try {
					if (owners.length > 0) {
						const publish = () => params.publish(owners, this.#transaction?.profileSetChanged === true, !retrying);
						await (retrying ? runOutsidePreparedModelRuntimePluginGenerationScope(() => runOutsidePluginRuntimeGenerationScope(publish)) : publish());
					}
					const transaction = this.#transaction;
					if (transaction) this.settleComponent(transaction, componentOwners, params.owners, params.publishOwners);
				} catch (error) {
					if (this.#transaction?.adoptedBy) throw error;
					const transaction = this.#transaction;
					const currentOwners = owners.filter((owner) => owner.pending !== void 0 && params.owners.get(ownerKey(owner.input)) === owner && transaction?.ownerGates.get(owner)?.promise === owner.pending);
					if (transaction && !retrying && isPreparedModelRuntimePluginLifecycleFailure(error) && currentOwners.some((owner) => reusedOwners.has(owner))) {
						for (const owner of currentOwners) transaction.ownerGates.get(owner).retried = true;
						this.#events.push(componentOwners);
						continue;
					}
					const failure = retrying ? new Error(`Auth-triggered model runtime refresh failed after 1 fresh-generation retry: ${toStringifiedError(error).message}`, { cause: error }) : error;
					if (transaction && this.rejectComponentOwners(transaction, componentOwners, failure, retrying) > 0) params.onOwnerFailure?.(failure);
				}
			}
		}
		params.commit?.();
	}
	reset(error) {
		if (this.#transaction) this.reject(this.#transaction, error);
		this.#events.length = 0;
	}
	clearOwnerGates(transaction) {
		for (const [owner, gate] of transaction.ownerGates) if (owner.pending === gate.promise) owner.pending = void 0;
	}
	rejectComponentOwners(transaction, componentOwners, error, recordRefreshError = false) {
		const queuedOwners = new Set(this.#events.flat());
		let rejected = 0;
		for (const owner of componentOwners) {
			if (queuedOwners.has(owner)) continue;
			const gate = transaction.ownerGates.get(owner);
			if (!gate) continue;
			if (owner.pending === gate.promise) {
				owner.pending = void 0;
				if (recordRefreshError && owner.needsRefresh) owner.refreshError = toStringifiedError(error);
			}
			transaction.ownerGates.delete(owner);
			gate.reject(error);
			rejected += 1;
		}
		return rejected;
	}
};
function invalidatePreparedModelRuntimeOwnersForAuthMutation(owners, normalizedEvent) {
	const staleError = /* @__PURE__ */ new Error("prepared model runtime owner is stale after auth mutation");
	const invalidatedOwners = [];
	const invalidatedConfiguredAgentIds = /* @__PURE__ */ new Set();
	for (const owner of owners.values()) {
		if (!owner.snapshot && owner.buildCompletion && !owner.authCaptureStarted && !owner.refreshError && owner.input.inheritedAuthDir === normalizeOptionalDir(resolveLegacyInheritedAuthDir(owner.input.config, owner.input.env)) || !normalizedEvent.affectsInheritedStores && owner.input.agentDir !== normalizedEvent.agentDir && owner.input.inheritedAuthDir !== normalizedEvent.agentDir) continue;
		invalidatedOwners.push(owner);
		owner.generation += 1;
		retirePreparedModelRuntimeGeneration(owner);
		owner.needsRefresh = true;
		owner.refreshError = staleError;
		if (normalizedEvent.profileSetChanged) owner.catalogStale = true;
		if (owner.provenance === "configured" && owner.input.agentId) invalidatedConfiguredAgentIds.add(owner.input.agentId);
	}
	for (const owner of invalidatedOwners) {
		if (owner.provenance !== "configured") continue;
		const inheritedAuthDir = normalizeOptionalDir(resolveLegacyInheritedAuthDir(owner.input.config, owner.input.env));
		if (owner.input.inheritedAuthDir === inheritedAuthDir) continue;
		const previousKey = ownerKey(owner.input);
		const input = normalizePreparedModelRuntimeInput({
			...owner.input,
			inheritedAuthDir
		});
		prepareModelRuntimeOwner(input, "configured", owner.catalogMode, owner);
		owners.delete(previousKey);
		const key = ownerKey(input);
		const previous = owners.get(key);
		owners.set(key, owner);
		if (previous && previous !== owner) retirePreparedModelRuntimeGeneration(previous);
	}
	return {
		invalidatedOwners,
		invalidatedConfiguredAgentIds
	};
}
//#endregion
//#region src/agents/prepared-model-runtime-lease.ts
/** Agent-run lease admission for lifecycle-owned prepared model runtimes. */
function createPreparedModelRuntimeAdmissionClaim(context) {
	let claimed;
	const release = () => {
		if (!claimed) return;
		const { key, owner } = claimed;
		claimed = void 0;
		owner.admissionCount = Math.max(0, (owner.admissionCount ?? 1) - 1);
		retirePreparedModelRuntimeOwnerIfUnused(context.owners, key, owner, context.retainedDirectRunOwners.has(key, owner) || context.retainedGatewayRunOwners.has(key, owner));
	};
	return {
		claim: (key, owner) => {
			if (claimed?.key === key && claimed.owner === owner) return;
			release();
			if (owner.provenance !== "run" && owner.provenance !== "ephemeral" || context.owners.get(key) !== owner) return;
			owner.admissionCount = (owner.admissionCount ?? 0) + 1;
			claimed = {
				key,
				owner
			};
		},
		release
	};
}
async function acquirePreparedModelRuntimeLeaseFromOwners(rawInput, provenance, context, options = {}) {
	const assertLifetime = context.captureLifetime();
	const assertAdmission = () => {
		assertLifetime();
		if (options.abortSignal?.aborted) throw createAbortError("Prepared model runtime lease admission aborted", { cause: options.abortSignal.reason });
	};
	const deriveSelections = options.deriveRuntimePluginSelections;
	const requestedSelections = deriveSelections ? structuredClone(rawInput.runtimePluginSelections ?? []) : [];
	let input = normalizePreparedModelRuntimeInput({
		...rawInput,
		preserveWorkspaceDirOnRefresh: rawInput.preserveWorkspaceDirOnRefresh ?? rawInput.workspaceDir !== void 0
	});
	let key = ownerKey(input);
	let owner;
	let snapshot;
	const admission = createPreparedModelRuntimeAdmissionClaim(context);
	let lastExternalPublication;
	let previousAttempt;
	let supersededPublication;
	for (;;) {
		admission.release();
		assertAdmission();
		const replacement = context.getPendingReplacement();
		const currentOwner = context.owners.get(key);
		const attempt = [
			key,
			replacement,
			currentOwner,
			currentOwner?.generation,
			currentOwner?.snapshot,
			currentOwner?.pending,
			currentOwner?.needsRefresh,
			lastExternalPublication
		];
		if (previousAttempt?.every((value, index) => value === attempt[index])) throw supersededPublication ?? new PreparedModelRuntimeOwnerNotPublishedError(`prepared model runtime lease admission made no publication progress for ${input.agentDir}; retry the request`);
		previousAttempt = attempt;
		supersededPublication = void 0;
		if (replacement) {
			lastExternalPublication = replacement.promise;
			await racePromiseWithAbortSignal(replacement.promise, options.abortSignal);
			if (context.getPendingReplacement()) continue;
			assertAdmission();
		}
		if (provenance === "run" && !options.pluginGeneration && (replacement || context.getGatewayLifecycleActive())) try {
			input = rebindInputToCommittedConfiguredOwner(context.owners, input);
		} catch (error) {
			if (replacement || !(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
			const existing = context.owners.get(ownerKey(input));
			const staleDynamicOwner = existing?.needsRefresh && !existing.pending && (existing.provenance === "run" || existing.provenance === "ephemeral");
			if (!existing || staleDynamicOwner) {
				const canActivateConfiglessSetup = input.agentId !== void 0 && isReservedSystemAgentId(input.agentId);
				const configuredOwner = resolveConfiguredOwnerPublication(context.owners, input);
				if (configuredOwner.matches || !canActivateConfiglessSetup) {
					if (configuredOwner.pending) {
						lastExternalPublication = configuredOwner.pending;
						await racePromiseWithAbortSignal(configuredOwner.pending, options.abortSignal);
						continue;
					}
					throw error;
				}
			}
		}
		let pluginMetadataSnapshot = options.pluginMetadataSnapshot;
		if (deriveSelections) {
			pluginMetadataSnapshot = options.pluginGeneration?.pluginMetadataSnapshot ?? pluginMetadataSnapshot ?? resolvePluginMetadataSnapshot({
				config: input.config,
				env: input.env,
				workspaceDir: input.workspaceDir,
				allowWorkspaceScopedCurrent: true
			});
			const metadataSnapshot = pluginMetadataSnapshot;
			input = withPluginMetadataSnapshotScope(metadataSnapshot, () => {
				const derived = deriveSelections({
					config: input.config,
					metadataSnapshot
				});
				return normalizePreparedModelRuntimeInput({
					...input,
					runtimePluginSelections: [...requestedSelections, ...derived]
				});
			}, { trustConfigIdentity: true });
		}
		key = ownerKey(input);
		if (provenance === "run" && context.getGatewayLifecycleActive() && options.pluginGeneration) {
			const configuredOwner = resolveConfiguredOwner(context.owners, input);
			if (configuredOwner?.pending) {
				lastExternalPublication = configuredOwner.pending;
				await racePromiseWithAbortSignal(configuredOwner.pending.catch(() => void 0), options.abortSignal);
				continue;
			}
			if (configuredOwner && (configuredOwner.needsRefresh || configuredOwner.pluginGeneration !== options.pluginGeneration)) {
				const borrowed = getPreparedModelRuntimeBorrowedSnapshot(options.pluginGeneration);
				if (!configuredOwner.needsRefresh && borrowed && borrowed.metadataSnapshot === options.pluginGeneration.pluginMetadataSnapshot && preparedModelRuntimeConfigsMatch(borrowed.config, input.config) && borrowed.agentId === input.agentId && borrowed.agentDir === input.agentDir && borrowed.inheritedAuthDir === input.inheritedAuthDir && borrowed.workspaceDir === input.workspaceDir && (!input.allowGatewaySubagentBinding || borrowed.allowGatewaySubagentBinding) && !input.readOnly && !input.loadRuntimePlugins && !input.skipCredentials && !input.env && preparedPluginGenerationSupportsSelections(options.pluginGeneration, input)) {
					assertAdmission();
					return {
						snapshot: borrowed,
						pluginGeneration: options.pluginGeneration,
						[Symbol.asyncDispose]: retainPreparedPluginGeneration(options.pluginGeneration)
					};
				}
				throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model runtime plugin generation was superseded for ${input.agentDir}`);
			}
		}
		if (provenance === "run" && context.getGatewayLifecycleActive() && options.catalogMode === "static" && !options.pluginGeneration && !options.pluginMetadataSnapshot && !input.readOnly && !input.loadRuntimePlugins && !input.skipCredentials) {
			const configuredOwner = resolveConfiguredOwner(context.owners, input);
			const configuredSnapshot = configuredOwner?.snapshot;
			const generation = configuredOwner?.pluginGeneration;
			if (configuredOwner && configuredSnapshot && generation && !configuredOwner.pending && !configuredOwner.needsRefresh && !configuredOwner.refreshError && configuredSnapshot.isCurrent() && configuredSnapshot.config === input.config && ownerKey({
				...configuredOwner.input,
				runtimePluginSelections: void 0
			}) === ownerKey({
				...input,
				runtimePluginSelections: void 0
			}) && (!pluginMetadataSnapshot || pluginMetadataSnapshot === generation.pluginMetadataSnapshot) && preparedPluginGenerationSupportsSelections(generation, input)) {
				owner = configuredOwner;
				snapshot = configuredSnapshot;
				break;
			}
		}
		const existing = context.owners.get(key);
		const staleDynamicOwner = existing?.needsRefresh && !existing.pending && (existing.provenance === "run" || existing.provenance === "ephemeral");
		const ownerGenerationChanged = options.pluginGeneration !== void 0 && !preparedPluginGenerationReusesBase(existing?.pending ? existing.pendingPluginGeneration : existing?.pluginGeneration, options.pluginGeneration) || options.catalogMode === "live" && existing?.catalogMode === "static";
		if (existing?.pending && ownerGenerationChanged) {
			lastExternalPublication = existing.pending;
			await racePromiseWithAbortSignal(existing.pending.catch(() => void 0), options.abortSignal);
			continue;
		}
		try {
			if (existing?.pending && !ownerGenerationChanged) {
				admission.claim(key, existing);
				lastExternalPublication = existing.pending;
				snapshot = await racePromiseWithAbortSignal(existing.pending, options.abortSignal);
				if (existing.snapshot !== snapshot || existing.needsRefresh) continue;
				owner = existing;
				break;
			}
			if (existing && !staleDynamicOwner && !ownerGenerationChanged) {
				if (existing.needsRefresh) throw existing.refreshError ?? /* @__PURE__ */ new Error("prepared model runtime refresh is pending");
				if (!existing.snapshot || input.readOnly && !preparedModelRuntimeConfigsMatch(existing.input.config, input.config)) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model runtime owner was not published for ${input.agentDir}`);
				snapshot = existing.snapshot;
			} else {
				const publication = publishModelRuntimeSnapshot(input, context.owners, context.agentBuildCompletions, context.getBuildTimeoutMs(), void 0, provenance, options.catalogMode, options.pluginGeneration, pluginMetadataSnapshot);
				const publishingOwner = context.owners.get(key);
				if (publishingOwner) admission.claim(key, publishingOwner);
				snapshot = await racePromiseWithAbortSignal(publication, options.abortSignal);
			}
		} catch (error) {
			admission.release();
			if (error instanceof PreparedModelRuntimePublicationSupersededError) {
				supersededPublication = error;
				continue;
			}
			throw error;
		}
		const published = context.owners.get(key);
		if (context.getPendingReplacement() || !published || published.snapshot !== snapshot || published.needsRefresh || published.pending) continue;
		admission.claim(key, published);
		owner = published;
		break;
	}
	try {
		assertAdmission();
		const configuredOwner = resolveConfiguredOwner(context.owners, input);
		const catalogOwner = configuredOwner && ownerKey({
			...configuredOwner.input,
			loadRuntimePlugins: false,
			runtimePluginSelections: void 0
		}) === ownerKey({
			...input,
			loadRuntimePlugins: false,
			runtimePluginSelections: void 0
		}) ? configuredOwner : owner;
		snapshot = capturePreparedModelRuntimeCatalog(snapshot, catalogOwner.snapshot);
		const pluginGeneration = owner.pluginGeneration;
		if (owner.provenance !== provenance) return {
			snapshot,
			pluginGeneration,
			[Symbol.asyncDispose]: retainPreparedPluginGeneration(pluginGeneration)
		};
		assertAdmission();
		if (provenance === "run" && options.retainIdleRunOwner) context.retainedDirectRunOwners.retain(key, owner, context.owners);
		else if (provenance === "run" && context.getGatewayLifecycleActive()) context.retainedGatewayRunOwners.retain(key, owner, context.owners);
		const releaseGeneration = retainPreparedPluginGeneration(pluginGeneration);
		owner.leaseCount = (owner.leaseCount ?? 0) + 1;
		admission.release();
		let released = false;
		return {
			snapshot,
			pluginGeneration,
			[Symbol.asyncDispose]: async () => {
				if (released) return;
				released = true;
				owner.leaseCount = Math.max(0, (owner.leaseCount ?? 1) - 1);
				retirePreparedModelRuntimeOwnerIfUnused(context.owners, key, owner, context.retainedDirectRunOwners.has(key, owner) || context.retainedGatewayRunOwners.has(key, owner));
				await releaseGeneration();
			}
		};
	} finally {
		admission.release();
	}
}
//#endregion
//#region src/agents/prepared-model-runtime-materializations.ts
function configuredOwnersAreRequestVisible(owners) {
	for (const owner of owners.values()) {
		if (owner.provenance !== "configured") continue;
		if (!owner.snapshot || owner.needsRefresh || owner.pending) return false;
	}
	return true;
}
function registerPreparedRuntimeAuthMaterializationPublisher(owners, notify) {
	return registerRuntimeAuthMaterializationMutationListener((event) => {
		const agentDir = normalizeOptionalDir(event.agentDir);
		const affectedOwners = [...owners.values()].flatMap((owner) => {
			return (event.affectsInheritedStores || owner.input.agentDir === agentDir || owner.input.inheritedAuthDir === agentDir) && owner.snapshot && !owner.pending && !owner.needsRefresh ? [{
				owner,
				snapshot: owner.snapshot
			}] : [];
		});
		if (affectedOwners.length === 0) return;
		for (const { owner, snapshot } of affectedOwners) bindPreparedModelRuntimeAuth(snapshot, { materializations: Object.freeze([...getPreparedRuntimeAuthMaterializations(owner.input.agentDir)]) });
		if (!configuredOwnersAreRequestVisible(owners)) return;
		notify({
			phase: "invalidated",
			modelFactsChanged: false
		});
		notify({
			phase: "published",
			modelFactsChanged: false
		});
	});
}
//#endregion
//#region src/agents/prepared-model-runtime.refresh-scope.ts
const log$1 = createSubsystemLogger("agents/prepared-model-runtime");
function refreshCommittedProviderCatalogs(owners) {
	for (const owner of owners) {
		if (owner.provenance !== "configured" || owner.pending || owner.needsRefresh) continue;
		owner.snapshot?.loadFullModelCatalog?.({ changedOnly: true }).catch((error) => {
			if (!(error instanceof PreparedModelRuntimePublicationSupersededError)) log$1.warn(`provider catalog refresh failed: ${formatErrorMessage(error)}`);
		});
	}
}
/** Retains provider inventory across runtime selection; rebuilds check its source and auth. */
function collectPreparedModelRuntimeInventories(owners) {
	const inventories = /* @__PURE__ */ new Map();
	for (const owner of owners) if (owner.provenance === "configured" && owner.catalogInventory) inventories.set(ownerKey({
		...owner.input,
		runtimePluginSelections: void 0
	}), owner.catalogInventory);
	return inventories;
}
/** Whether a refresh scope must replace this owner rather than retain it. */
function isPreparedModelRuntimeOwnerInRefreshScope(owner, agentIds) {
	if (!agentIds) return true;
	if (owner.input.readOnly || owner.provenance !== "configured" && owner.provenance !== "run") return true;
	return !owner.input.agentId || agentIds.has(owner.input.agentId);
}
/** Builds configured inputs while preserving the startup-selected default workspace. */
function listConfiguredRefreshInputs(config, options, owners) {
	const preservedWorkspaceByAgentDir = /* @__PURE__ */ new Map();
	for (const owner of owners.values()) {
		const { agentDir, agentId, preserveWorkspaceDirOnRefresh, workspaceDir } = owner.input;
		if (owner.provenance !== "configured" || !agentId || !preserveWorkspaceDirOnRefresh || !workspaceDir) continue;
		let workspacesByDir = preservedWorkspaceByAgentDir.get(agentId);
		if (!workspacesByDir) {
			workspacesByDir = /* @__PURE__ */ new Map();
			preservedWorkspaceByAgentDir.set(agentId, workspacesByDir);
		}
		if (!workspacesByDir.has(agentDir)) workspacesByDir.set(agentDir, workspaceDir);
	}
	return withAgentRosterFactsBatch(config, () => listConfiguredOwnerInputs(config, options.defaultWorkspaceDir, options.allowGatewaySubagentBinding, preservedWorkspaceByAgentDir).map(normalizePreparedModelRuntimeInput));
}
/** Invalidates scoped owners and optionally advances retained owners to a new config stamp. */
function updateOwnersForScopedRefresh(owners, agentIds, staleError, options = {}) {
	const retiredPublications = [];
	for (const [key, owner] of owners) {
		if (!isPreparedModelRuntimeOwnerInRefreshScope(owner, agentIds)) {
			if (options.retainedConfig) advancePreparedModelRuntimeOwnerConfig(owner, options.retainedConfig);
			continue;
		}
		if (options.retireStandalone && owner.provenance === "standalone") {
			owner.generation += 1;
			owners.delete(key);
			retirePreparedModelRuntimeGeneration(owner);
			retiredPublications.push(owner);
			continue;
		}
		owner.generation += 1;
		retirePreparedModelRuntimeGeneration(owner);
		owner.needsRefresh = true;
		owner.refreshError = staleError;
		if (options.clearPending) owner.pending = void 0;
		if (options.resetPluginGeneration) {
			owner.pluginGeneration = void 0;
			retiredPublications.push(owner);
		}
	}
	retiredPublications.forEach(releasePreparedPluginPublication);
}
/** Keeps a requested scope only when every retained owner has identical prepared dependencies. */
function resolveSafeRefreshAgentIds(config, options, owners) {
	const requested = options.agentIds;
	if (!requested) return;
	const inputs = new Map(listConfiguredRefreshInputs(config, options, owners).flatMap((input) => input.agentId ? [[input.agentId, input]] : []));
	for (const owner of owners.values()) {
		if (owner.provenance !== "configured" || !owner.input.agentId || requested.has(owner.input.agentId)) continue;
		const input = inputs.get(owner.input.agentId);
		if (!input || !owner.snapshot || owner.needsRefresh || owner.catalogMode !== (options.catalogMode ?? "live") || options.pluginMetadataSnapshot && owner.snapshot.metadataSnapshot !== options.pluginMetadataSnapshot || ownerKey({
			...owner.input,
			config: input.config
		}) !== ownerKey(input)) return;
	}
	return requested;
}
/** A failed shared catalog isolate retires its borrowers through the publication owner. */
function createPreparedModelRuntimeCatalogRecovery(owners, publish) {
	return async (borrowers) => {
		const failed = new Map(borrowers.filter((borrower) => borrower.isCurrent()).map((borrower) => [borrower.agentDir, borrower]));
		const affected = [...owners.values()].filter((owner) => owner.provenance === "configured" && !owner.needsRefresh && !owner.pending && owner.input.agentId && owner.snapshot && failed.get(owner.input.agentDir)?.isCurrent());
		const first = affected[0];
		if (!first?.snapshot) return;
		await publish(first.input.config, {
			catalogMode: "static",
			allowGatewaySubagentBinding: true,
			agentIds: new Set(affected.flatMap((owner) => owner.input.agentId ? [owner.input.agentId] : [])),
			pluginMetadataSnapshot: first.snapshot.metadataSnapshot
		});
	};
}
//#endregion
//#region src/agents/prepared-model-runtime.configured-refresh.ts
/** Rebuilds active owners after config/plugin runtime publication. */
async function refreshPreparedModelRuntimeSnapshotsNow(config, options, context) {
	const { owners, agentBuildCompletions, gatewayLifecycleActive, isPublicationCurrent, progress } = context;
	const catalogMode = options.catalogMode ?? "live";
	const staleError = /* @__PURE__ */ new Error("prepared model runtime owner is stale after config publication");
	const inventories = collectPreparedModelRuntimeInventories(owners.values());
	updateOwnersForScopedRefresh(owners, options.agentIds, staleError, { retainedConfig: config });
	const entries = [];
	const knownKeys = /* @__PURE__ */ new Set();
	for (const input of listConfiguredRefreshInputs(config, options, owners)) {
		if (options.agentIds && input.agentId && !options.agentIds.has(input.agentId)) continue;
		const key = ownerKey(input);
		if (knownKeys.has(key)) continue;
		knownKeys.add(key);
		const owner = owners.get(key);
		entries.push({
			owner,
			input
		});
	}
	for (const [key, owner] of owners) {
		if (!isPreparedModelRuntimeOwnerInRefreshScope(owner, options.agentIds)) continue;
		if (!knownKeys.has(key) && (gatewayLifecycleActive || owner.provenance === "configured")) {
			owners.delete(key);
			retirePreparedModelRuntimeGeneration(owner);
			releasePreparedPluginPublication(owner);
		}
	}
	await publishPreparedModelRuntimeOwnerBatch({
		ownersToPublish: entries.map(({ owner: existing, input }) => {
			const owner = prepareModelRuntimeOwner(input, "configured", catalogMode, existing?.provenance === "configured" ? existing : void 0);
			owner.catalogInventory = inventories.get(ownerKey({
				...input,
				runtimePluginSelections: void 0
			}));
			return owner;
		}),
		owners,
		agentBuildCompletions,
		buildTimeoutMs: progress ? void 0 : context.buildTimeoutMs,
		isPublicationCurrent,
		isBuildCurrent: isPublicationCurrent,
		onBuildStats: options.onBuildStats,
		pluginMetadataSnapshot: options.pluginMetadataSnapshot,
		registerEntriesAfterBuildStart: true,
		progress,
		acquisitionSignal: context.acquisitionSignal
	});
}
//#endregion
//#region src/agents/prepared-model-runtime.publication-queue.ts
/** Publication scheduling may finish before acquisition; shutdown joins both. */
var PreparedModelRuntimePublicationQueue = class {
	#tail = Promise.resolve();
	#pending = /* @__PURE__ */ new Set();
	#latestRefresh;
	enqueue(task, release) {
		const previous = this.#tail;
		const publication = previous.then(task);
		this.#pending.add(publication);
		const settled = () => {
			this.#pending.delete(publication);
		};
		publication.then(settled, settled);
		this.#tail = (release ? previous.then(() => Promise.race([publication, release])) : publication).then(() => void 0, () => void 0);
		return publication;
	}
	complete(publication, isCurrent, options, startup) {
		const assertLifetime = capturePreparedModelRuntimeLifetime();
		const refresh = {
			completion: publication,
			isCurrent
		};
		this.#latestRefresh = refresh;
		if (!options.joinSupersedingPublication) return startup ? startup.wait(publication) : publication;
		return (async () => {
			let current = refresh;
			for (;;) {
				assertLifetime();
				try {
					await current.completion;
				} catch (error) {
					if (!(error instanceof PreparedModelRuntimePublicationSupersededError) || !this.#latestRefresh || this.#latestRefresh === current) throw error;
				}
				assertLifetime();
				if (this.#latestRefresh && this.#latestRefresh !== current) {
					current = this.#latestRefresh;
					continue;
				}
				if (!current.isCurrent()) throw new PreparedModelRuntimePublicationSupersededError("prepared model runtime publication was superseded without a current replacement refresh");
				return;
			}
		})();
	}
	async settle() {
		this.#latestRefresh = void 0;
		await Promise.allSettled(this.#pending);
	}
};
//#endregion
//#region src/agents/prepared-model-runtime.published-owner.ts
async function refreshPublishedModelRuntimeCatalog(snapshot, owners, options) {
	const owner = resolvePreparedModelRuntimeOwnerBySnapshot(snapshot);
	if (!owner || owners.get(ownerKey(owner.input)) !== owner || !snapshot.loadFullModelCatalog) return;
	const currentCatalog = snapshot.readFullModelCatalog?.() ?? snapshot.modelCatalog;
	const refresh = options.refresh === true || owner.catalogStale;
	if (!refresh && !options.providerIds && !options.changedOnly && isPreparedModelCatalogFull(currentCatalog)) return;
	const generation = owner.generation;
	const catalog = await snapshot.loadFullModelCatalog({
		...options,
		refresh
	});
	if (owner.catalogStale && !catalog.pendingProviders?.length && owner.generation === generation && owners.get(ownerKey(owner.input)) === owner) owner.catalogStale = false;
	return catalog;
}
function retainPublishedModelRuntimeOwner(owner, snapshot) {
	const pluginGeneration = owner.pluginGeneration;
	if (!pluginGeneration) throw new Error("Published model runtime has no plugin generation");
	return {
		snapshot: capturePreparedModelRuntimeCatalog(snapshot, snapshot),
		pluginGeneration,
		[Symbol.asyncDispose]: retainPreparedPluginGeneration(pluginGeneration)
	};
}
/** Project or retain the exact published owner before its snapshot crosses an await. */
async function projectPublishedModelRuntimeOwner(rawInput, context, project) {
	const assertLifetime = context.captureLifetime();
	const replacement = context.getPendingReplacement();
	if (replacement) {
		await replacement.promise;
		assertLifetime();
		return await projectPublishedModelRuntimeOwner(rawInput, context, project);
	}
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const existing = resolvePublishedOwner(context.owners, input, { allowConfiguredWorkspaceFallback: rawInput.workspaceDir === void 0 || rawInput.agentId === void 0 || rawInput.runtimePluginSelections === void 0 });
	if (input.readOnly && existing && !preparedModelRuntimeConfigsMatch(existing.input.config, input.config)) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared read-only model runtime owner was not published for the requested config (${input.agentDir})`);
	if (existing?.pending) {
		try {
			await existing.pending;
		} catch {}
		assertLifetime();
		return await projectPublishedModelRuntimeOwner(rawInput, context, project);
	}
	if (existing?.needsRefresh) throw existing.refreshError ?? /* @__PURE__ */ new Error("prepared model runtime refresh is pending");
	if (existing?.snapshot) return project(existing, existing.snapshot);
	throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared model runtime owner was not published for ${input.agentDir}`);
}
//#endregion
//#region src/agents/prepared-model-runtime.startup.ts
/** The startup wait is bounded; each published agent still owns complete runtime/auth facts. */
var PreparedModelRuntimeStartup = class {
	#foreground;
	#stage;
	constructor(host) {
		this.host = host;
		this.#foreground = createDeferredCore();
		this.#stage = "previous generation completion";
		this.release = this.#foreground.promise;
		this.progress = {
			onStage: (stage) => {
				this.#stage = stage;
				this.update();
			},
			onPublished: () => this.update(true)
		};
	}
	update(publish = false) {
		if (!this.host.isCurrent()) return;
		const configured = [...this.host.owners()].filter((owner) => owner.provenance === "configured");
		setPreparedModelRuntimeStartupStatus({
			degraded: this.host.replacement.degraded === true,
			pendingAgents: configured.flatMap((owner) => owner.needsRefresh || !owner.snapshot || owner.pending ? [owner.input.agentId ?? owner.input.agentDir] : []),
			stage: this.#stage
		});
		if (publish && this.host.replacement.degraded) this.host.publish(configured.filter((owner) => owner.snapshot && !owner.needsRefresh && !owner.pending));
	}
	complete() {
		setPreparedModelRuntimeStartupStatus({
			degraded: false,
			pendingAgents: []
		});
	}
	wait(publication) {
		const timer = setTimeout(() => {
			if (this.host.isCurrent()) {
				this.host.replacement.degraded = true;
				this.host.onDegraded(() => this.update(true));
				this.update(true);
				const pending = [...this.host.owners()].filter((owner) => owner.needsRefresh || !owner.snapshot);
				this.host.warn(`prepared model runtime startup degraded after ${this.host.timeoutMs}ms (${this.#stage}); still acquiring agents: ${pending.map((owner) => owner.input.agentId ?? owner.input.agentDir).join(", ")}; acquisition continues in the background`);
				this.host.replacement.resolve();
			}
			this.#foreground.resolve();
		}, this.host.timeoutMs);
		timer.unref?.();
		publication.catch((error) => {
			if (this.host.replacement.degraded) this.host.warn(`background model runtime publication failed: ${String(error)}`);
		});
		return Promise.race([publication, this.release]).finally(() => clearTimeout(timer));
	}
};
//#endregion
//#region src/agents/prepared-reply-dispatch-runtime.ts
const EMPTY_REPLY_DISPATCH_PUBLICATION = Object.freeze([]);
function createReplyDispatchRuntime(runtimeOwner) {
	const snapshot = runtimeOwner.snapshot;
	const owner = resolvePublishedModelCatalogOwner(snapshot);
	const pluginGeneration = runtimeOwner.pluginGeneration;
	const inboundPluginRegistry = pluginGeneration?.inboundPluginRegistry;
	if (!pluginGeneration || !inboundPluginRegistry) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared inbound plugin registry was not published for ${snapshot.agentDir}`);
	return Object.freeze({
		agentId: owner.agentId,
		agentDir: owner.agentDir,
		workspaceDir: owner.workspaceDir,
		config: owner.config,
		modelCatalog: owner.modelCatalog,
		readFullModelCatalog: snapshot.readFullModelCatalog,
		inboundPluginRegistry,
		pluginGeneration
	});
}
function buildReplyDispatchPublication(owners) {
	const runtimes = [...owners].filter((owner) => owner.provenance === "configured").map((owner) => {
		if (!owner.snapshot || owner.needsRefresh || owner.pending) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared reply dispatch runtime owner was not published for ${owner.input.agentId ?? owner.input.agentDir}`);
		return createReplyDispatchRuntime(owner);
	}).toSorted((left, right) => left.agentId.localeCompare(right.agentId));
	if (new Set(runtimes.map((runtime) => runtime.agentId)).size !== runtimes.length) throw new PreparedModelRuntimeOwnerNotPublishedError("prepared reply dispatch runtime publication contains duplicate configured agents");
	return Object.freeze(runtimes);
}
/** Reads one immutable configured Gateway dispatch generation without activating an owner. */
var PreparedReplyDispatchPublicationOwner = class {
	#publication;
	constructor(host) {
		this.host = host;
		this.#publication = EMPTY_REPLY_DISPATCH_PUBLICATION;
		this.load = async ({ agentId, abortSignal }) => {
			for (;;) {
				if (abortSignal?.aborted) throw createAbortError("Prepared reply dispatch admission aborted", { cause: abortSignal.reason });
				if (!this.host.isGatewayLifecycleActive()) return;
				const replacement = this.host.getPendingReplacement();
				if (replacement) {
					await racePromiseWithAbortSignal(replacement, abortSignal);
					continue;
				}
				const pendingOwner = this.host.getPendingOwnerPublication(agentId);
				if (pendingOwner) {
					await racePromiseWithAbortSignal(pendingOwner, abortSignal);
					continue;
				}
				const runtime = this.#publication.find((candidate) => candidate.agentId === agentId);
				if (!runtime) throw new PreparedModelRuntimeOwnerNotPublishedError(`prepared reply dispatch runtime owner was not published for ${agentId}`);
				return runtime;
			}
		};
	}
	clear() {
		this.#publication = EMPTY_REPLY_DISPATCH_PUBLICATION;
	}
	advanceConfig(config) {
		this.#publication = Object.freeze(this.#publication.map((runtime) => Object.freeze({
			...runtime,
			config
		})));
	}
	rebuild(owners) {
		this.#publication = this.host.isGatewayLifecycleActive() ? buildReplyDispatchPublication(owners) : EMPTY_REPLY_DISPATCH_PUBLICATION;
	}
	remove(agentIds) {
		if (agentIds.size > 0) this.#publication = Object.freeze(this.#publication.filter((runtime) => !agentIds.has(runtime.agentId)));
	}
	replace(owners) {
		const replacements = buildReplyDispatchPublication(owners);
		const agentIds = new Set(replacements.map((runtime) => runtime.agentId));
		this.#publication = Object.freeze([...this.#publication.filter((runtime) => !agentIds.has(runtime.agentId)), ...replacements].toSorted((left, right) => left.agentId.localeCompare(right.agentId)));
	}
};
//#endregion
//#region src/agents/prepared-model-runtime.ts
/** Lifecycle-owned auth/model discovery snapshots for agent runs. */
const log = createSubsystemLogger("agents/prepared-model-runtime");
const DEFAULT_MODEL_RUNTIME_BUILD_TIMEOUT_MS = 12e4;
let modelRuntimeBuildTimeoutMs = DEFAULT_MODEL_RUNTIME_BUILD_TIMEOUT_MS;
const owners = /* @__PURE__ */ new Map();
const agentBuildCompletions = /* @__PURE__ */ new Map();
const standaloneActivationTails = /* @__PURE__ */ new Map();
const retainedDirectRunOwners = new PreparedModelRuntimeOwnerRetention(1);
const retainedGatewayRunOwners = new PreparedModelRuntimeOwnerRetention(8);
let gatewayLifecycleActive = false;
const publicationQueue = new PreparedModelRuntimePublicationQueue();
let refreshRequestEpoch = 0;
let refreshCancellation = new AbortController();
let pendingModelRuntimeReplacement;
const authPublication = new PreparedModelRuntimeAuthPublicationOwner();
const getBlockingReplacement = () => pendingModelRuntimeReplacement?.degraded ? void 0 : pendingModelRuntimeReplacement;
const replyDispatchPublication = new PreparedReplyDispatchPublicationOwner({
	isGatewayLifecycleActive: () => gatewayLifecycleActive,
	getPendingOwnerPublication: (agentId) => resolveConfiguredOwnerPublication(owners, {
		agentId,
		agentDir: ".",
		config: {}
	}).pending,
	getPendingReplacement: () => getBlockingReplacement()?.promise
});
const loadPublishedGatewayReplyDispatchRuntime = replyDispatchPublication.load;
let releaseProcessLifetime;
function captureModelRuntimeLifetime() {
	const assertCurrent = capturePreparedModelRuntimeLifetime();
	if (!releaseProcessLifetime) {
		refreshCancellation = new AbortController();
		releaseProcessLifetime = registerPreparedModelRuntimeClose(closeModelRuntime);
	}
	return assertCurrent;
}
/** Seal refresh admission and cancel acquisition after every Gateway fences admission. */
function cancelPreparedModelRuntimeRefresh() {
	if (releaseProcessLifetime && refreshCancellation.signal.aborted) return;
	captureModelRuntimeLifetime();
	refreshRequestEpoch += 1;
	refreshCancellation.abort(/* @__PURE__ */ new Error("prepared model runtime acquisition stopped for shutdown"));
}
async function closeModelRuntime(error) {
	refreshRequestEpoch += 1;
	authPublication.reset(error);
	pendingModelRuntimeReplacement?.reject(error);
	pendingModelRuntimeReplacement = void 0;
	setPreparedModelRuntimeStartupStatus(void 0);
	closeEphemeralPreparedModelRuntimeResources().catch(() => {});
	const closingOwners = [...owners.values()];
	owners.clear();
	closingOwners.forEach(retirePreparedModelRuntimeGeneration);
	retainedDirectRunOwners.clear(owners);
	retainedGatewayRunOwners.clear(owners);
	gatewayLifecycleActive = false;
	replyDispatchPublication.clear();
	refreshCancellation.abort(error);
	const results = await Promise.allSettled([
		publicationQueue.settle(),
		...agentBuildCompletions.values(),
		...standaloneActivationTails.values()
	]);
	closingOwners.forEach(releasePreparedPluginPublication);
	releaseProcessLifetime?.();
	releaseProcessLifetime = void 0;
	const failures = results.flatMap((result) => result.status === "rejected" ? [result.reason] : []);
	if (failures.length) throw new AggregateError(failures, "Prepared model work failed to close");
}
/** Advances model-neutral config identity without rebuilding prepared generation artifacts. */
function advancePreparedModelRuntimeConfig(config) {
	for (const owner of owners.values()) {
		if (owner.input.readOnly) continue;
		advancePreparedModelRuntimeOwnerConfig(owner, config);
	}
	replyDispatchPublication.advanceConfig(config);
}
/** Resolves a published owner or activates a standalone lifecycle owner. */
async function loadPreparedModelRuntimeSnapshot(rawInput) {
	return await loadPreparedModelRuntimeOwner(rawInput, (_owner, snapshot) => snapshot);
}
/** Borrows the selected publication without changing its activation or retention policy. */
async function acquirePublishedPreparedModelRuntime(rawInput) {
	return await loadPreparedModelRuntimeOwner(rawInput, retainPublishedModelRuntimeOwner);
}
/** Retains the selected publication without activating an unpublished owner. */
async function acquirePreparedModelRuntimeSnapshot(rawInput) {
	return await projectPublishedModelRuntimeOwner(rawInput, preparedModelRuntimeLeaseContext, retainPublishedModelRuntimeOwner);
}
/** Retains existing execution owners, including switched-away models, without loading plugins. */
async function acquireAgentRuntimeCleanupRegistries(agentDir) {
	return await acquireRetainedAgentRuntimeCleanupRegistries(normalizeOptionalDir(agentDir), preparedModelRuntimeLeaseContext);
}
async function loadPreparedModelRuntimeOwner(rawInput, project) {
	const assertLifetime = captureModelRuntimeLifetime();
	let input = normalizePreparedModelRuntimeInput({
		...rawInput,
		preserveWorkspaceDirOnRefresh: rawInput.preserveWorkspaceDirOnRefresh ?? rawInput.workspaceDir !== void 0
	});
	for (;;) {
		assertLifetime();
		const replacement = getBlockingReplacement();
		if (replacement) {
			await replacement.promise;
			if (getBlockingReplacement()) continue;
			input = rebindInputToCommittedConfiguredOwner(owners, input);
			continue;
		}
		try {
			return await projectPublishedModelRuntimeOwner(input, preparedModelRuntimeLeaseContext, project);
		} catch (error) {
			if (!(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
		}
		if (getBlockingReplacement()) continue;
		assertLifetime();
		const activated = await activateStandalonePreparedModelRuntime(input);
		if (getBlockingReplacement()) continue;
		try {
			return await projectPublishedModelRuntimeOwner(input, preparedModelRuntimeLeaseContext, project);
		} catch (error) {
			if (!activated || !(error instanceof PreparedModelRuntimeOwnerNotPublishedError)) throw error;
		}
	}
}
/** Returns an already-published generation without starting discovery. */
function getPreparedModelRuntimeSnapshot(rawInput) {
	return getBlockingReplacement() ? void 0 : readPublishedModelRuntimeSnapshot(owners, rawInput);
}
/** Reads the owner-held publication barrier without starting catalog acquisition. */
function getPendingPreparedModelRuntimeReplacement() {
	return getBlockingReplacement()?.promise;
}
/** Publishes one owner from an explicit startup/activation lifecycle boundary. */
async function publishPreparedModelRuntimeSnapshot(rawInput, options = {}) {
	captureModelRuntimeLifetime();
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const existing = owners.get(ownerKey(input));
	if (existing?.pending) {
		if (!options.force && hasSameLifecycleInput(existing.input, input)) return await existing.pending;
	} else {
		if (existing?.buildCompletion) throw existing.refreshError ?? /* @__PURE__ */ new Error(`prepared model runtime build is still settling for ${input.agentDir}`);
		if (existing?.snapshot && !existing.needsRefresh && !options.force && hasSameLifecycleInput(existing.input, input)) return existing.snapshot;
	}
	return await publishModelRuntimeSnapshot(input, owners, agentBuildCompletions, modelRuntimeBuildTimeoutMs, existing, options.provenance, options.catalogMode);
}
/** Activates lifecycle publication for direct embedded runtimes without a gateway startup. */
async function activateStandalonePreparedModelRuntime(rawInput, options = {}) {
	const assertLifetime = captureModelRuntimeLifetime();
	const input = normalizePreparedModelRuntimeInput(rawInput);
	const key = ownerKey(input);
	const activation = (standaloneActivationTails.get(key) ?? Promise.resolve()).then(async () => await activateStandalonePreparedModelRuntimeNow(input, assertLifetime, options));
	const tail = activation.then(() => void 0, () => void 0);
	standaloneActivationTails.set(key, tail);
	try {
		return await activation;
	} finally {
		if (standaloneActivationTails.get(key) === tail) standaloneActivationTails.delete(key);
	}
}
async function activateStandalonePreparedModelRuntimeNow(input, assertLifetime, options) {
	for (;;) {
		assertLifetime();
		const overlapsConfiguredOwner = [...owners.values()].some((owner) => owner.provenance === "configured" && owner.input.agentDir === input.agentDir && (input.agentId === void 0 || owner.input.agentId === input.agentId) && (input.workspaceDir === void 0 || owner.input.workspaceDir === input.workspaceDir));
		if (gatewayLifecycleActive && (!input.readOnly || overlapsConfiguredOwner)) return;
		try {
			return await publishPreparedModelRuntimeSnapshot({
				...input,
				preserveWorkspaceDirOnRefresh: input.workspaceDir !== void 0
			}, {
				...options,
				provenance: "standalone"
			});
		} catch (error) {
			if (!(error instanceof PreparedModelRuntimePublicationSupersededError)) throw error;
			const replacement = pendingModelRuntimeReplacement;
			if (replacement) await replacement.promise;
		}
	}
}
const preparedModelRuntimeLeaseContext = {
	captureLifetime: captureModelRuntimeLifetime,
	owners,
	agentBuildCompletions,
	retainedDirectRunOwners,
	retainedGatewayRunOwners,
	getBuildTimeoutMs: () => modelRuntimeBuildTimeoutMs,
	getGatewayLifecycleActive: () => gatewayLifecycleActive,
	getPendingReplacement: getBlockingReplacement
};
/** Acquires a run generation from configured facts; full catalog discovery is explicit. */
async function acquireAgentRunPreparedModelRuntime(rawInput, options = {}) {
	return await acquirePreparedModelRuntimeLeaseFromOwners(rawInput, "run", preparedModelRuntimeLeaseContext, {
		...options,
		catalogMode: options.catalogMode ?? "static"
	});
}
/** Acquires an exact read-only generation scoped to the returned lease. */
async function acquireReadOnlyPreparedModelRuntime(rawInput, options = {}) {
	return await acquirePreparedModelRuntimeLeaseFromOwners({
		...rawInput,
		readOnly: true
	}, "ephemeral", preparedModelRuntimeLeaseContext, {
		...options,
		catalogMode: options.catalogMode ?? "live"
	});
}
/** Returns the snapshot published by the lifecycle owner. Request config cannot replace it. */
async function prepareModelRuntimeSnapshot(rawInput) {
	return await projectPublishedModelRuntimeOwner(rawInput, preparedModelRuntimeLeaseContext, (_owner, snapshot) => snapshot);
}
/** Initializes or refreshes inventory on catalog demand; turn admission remains static. */
async function refreshPreparedModelRuntimeCatalog(snapshot, options = {}) {
	return await refreshPublishedModelRuntimeCatalog(snapshot, owners, options);
}
/** Invalidates every published generation before config/plugin runtime replacement. */
function markPreparedModelRuntimeSnapshotsStale(reason = "prepared model runtime owner is stale after config publication", options = {}) {
	captureModelRuntimeLifetime();
	refreshCancellation.signal.throwIfAborted();
	const previousCancellation = refreshCancellation;
	refreshCancellation = new AbortController();
	setPreparedModelRuntimeStartupStatus(void 0);
	replyDispatchPublication.clear();
	if (options.waitForReplacement) {
		const superseded = pendingModelRuntimeReplacement;
		pendingModelRuntimeReplacement = createPreparedModelRuntimeReplacement();
		authPublication.adopt(pendingModelRuntimeReplacement.gateId);
		superseded?.resolve();
	} else if (!options.preserveReplacementWait && pendingModelRuntimeReplacement) {
		const cancelled = pendingModelRuntimeReplacement;
		pendingModelRuntimeReplacement = void 0;
		cancelled.resolve();
	}
	refreshRequestEpoch += 1;
	const staleError = new Error(reason);
	updateOwnersForScopedRefresh(owners, options.agentIds, staleError, {
		retireStandalone: true,
		resetPluginGeneration: true
	});
	previousCancellation.abort(new PreparedModelRuntimePublicationSupersededError(reason));
	const replacement = getBlockingReplacement();
	notifyPreparedModelRuntimePublication({
		phase: "invalidated",
		...replacement ? { replacement: replacement.promise } : {}
	});
	if (!pendingModelRuntimeReplacement) notifyPreparedModelRuntimePublication({
		phase: "failed",
		error: staleError
	});
	return pendingModelRuntimeReplacement?.gateId;
}
/** Rejects readers waiting for a replacement when its owning reload cannot continue. */
function rejectPendingPreparedModelRuntimeReplacement(gateId, error) {
	const replacement = pendingModelRuntimeReplacement;
	if (!replacement || !gateId || replacement.gateId !== gateId) return;
	pendingModelRuntimeReplacement = void 0;
	const replacementError = toStringifiedError(error);
	authPublication.rejectAdopted(replacement.gateId, replacementError);
	replacement.reject(replacementError);
	notifyPreparedModelRuntimePublication({
		phase: "failed",
		error: replacementError
	});
}
const recoverPreparedModelRuntimeCatalogWorker = createPreparedModelRuntimeCatalogRecovery(owners, refreshPreparedModelRuntimeSnapshots);
/** Serializes config/plugin publications so only the latest completed refresh retires owners. */
function refreshPreparedModelRuntimeSnapshots(config, options = {}) {
	if (options.isPublicationCurrent?.() === false) return Promise.resolve();
	const requestedScopedRefresh = options.agentIds !== void 0;
	const initialAgentIds = typeof config === "function" ? void 0 : resolveSafeRefreshAgentIds(config, options, owners);
	const forceFullRefresh = requestedScopedRefresh && initialAgentIds === void 0;
	markPreparedModelRuntimeSnapshotsStale(void 0, {
		waitForReplacement: true,
		agentIds: initialAgentIds
	});
	const requestEpoch = refreshRequestEpoch;
	const acquisitionSignal = refreshCancellation.signal;
	const replacement = pendingModelRuntimeReplacement;
	let publicationAgentIds = initialAgentIds;
	const isPublicationCurrent = () => requestEpoch === refreshRequestEpoch && options.isPublicationCurrent?.() !== false;
	const startup = options.startup === true && options.catalogMode === "static" && replacement ? new PreparedModelRuntimeStartup({
		replacement,
		owners: () => owners.values(),
		isCurrent: () => pendingModelRuntimeReplacement === replacement && isPublicationCurrent(),
		timeoutMs: modelRuntimeBuildTimeoutMs,
		warn: (message) => log.warn(message),
		publish: (readyOwners) => {
			replyDispatchPublication.rebuild(readyOwners);
			notifyPreparedModelRuntimePublication({ phase: "published" });
		},
		onDegraded: (publish) => {
			authPublication.releaseAdopted(replacement.gateId);
			publicationQueue.enqueue(async () => {
				if (isPublicationCurrent()) await drainPendingAuthMutations(publish);
			}).catch((error) => log.warn(`startup auth refresh failed: ${String(error)}`));
		}
	}) : void 0;
	const rejectReplacement = (error) => {
		if (requestEpoch === refreshRequestEpoch) updateOwnersForScopedRefresh(owners, publicationAgentIds, error, {
			clearPending: true,
			resetPluginGeneration: true
		});
		rejectPendingPreparedModelRuntimeReplacement(replacement?.gateId, error);
	};
	const commitReplacement = () => {
		if (!replacement || pendingModelRuntimeReplacement !== replacement) return;
		if (!isPublicationCurrent()) {
			rejectReplacement(new PreparedModelRuntimePublicationSupersededError("prepared model runtime publication was superseded"));
			return;
		}
		const adoptedAuthTransaction = authPublication.prepareAdoptedCommit(replacement.gateId);
		replyDispatchPublication.rebuild(owners.values());
		pendingModelRuntimeReplacement = void 0;
		startup?.complete();
		if (adoptedAuthTransaction) authPublication.resolve(adoptedAuthTransaction, owners);
		replacement.resolve();
		notifyPreparedModelRuntimePublication({ phase: "published" });
		refreshCommittedProviderCatalogs(owners.values());
	};
	const publication = publicationQueue.enqueue(async () => {
		if (!isPublicationCurrent()) return;
		const currentConfig = typeof config === "function" ? await config() : config;
		if (!isPublicationCurrent()) return;
		publicationAgentIds = forceFullRefresh ? void 0 : resolveSafeRefreshAgentIds(currentConfig, options, owners);
		retainedGatewayRunOwners.clear(owners);
		gatewayLifecycleActive ||= options.gatewayLifecycle === true;
		await refreshPreparedModelRuntimeSnapshotsNow(currentConfig, {
			...options,
			agentIds: publicationAgentIds
		}, {
			owners,
			agentBuildCompletions,
			gatewayLifecycleActive,
			isPublicationCurrent,
			buildTimeoutMs: modelRuntimeBuildTimeoutMs,
			progress: startup?.progress,
			acquisitionSignal
		});
		if (!isPublicationCurrent()) return;
		const drain = () => drainPendingAuthMutations(commitReplacement);
		if (replacement?.degraded) await publicationQueue.enqueue(drain);
		else await drain();
	}, startup?.release).then(commitReplacement, (error) => {
		const refreshError = toStringifiedError(error);
		if (replacement?.degraded && isPublicationCurrent()) {
			startup?.update(true);
			if (pendingModelRuntimeReplacement === replacement) pendingModelRuntimeReplacement = void 0;
		} else rejectReplacement(refreshError);
		throw refreshError;
	});
	return publicationQueue.complete(publication, isPublicationCurrent, options, startup);
}
async function drainPendingAuthMutations(commit) {
	await authPublication.drain({
		owners,
		publish: async (ownersToPublish, includeCredentialProviders, reuseGenerations) => await publishPreparedModelRuntimeOwnerBatch({
			ownersToPublish,
			owners,
			agentBuildCompletions,
			buildTimeoutMs: modelRuntimeBuildTimeoutMs,
			...includeCredentialProviders ? { includeCredentialProviders: true } : {},
			selectPluginGeneration: reuseGenerations ? (owner) => owner.pluginGeneration : void 0
		}),
		publishOwners: (publishedOwners) => replyDispatchPublication.replace(publishedOwners),
		commit,
		onOwnerFailure: (error) => {
			const refreshError = toStringifiedError(error);
			notifyPreparedModelRuntimePublication({
				phase: "failed",
				error: refreshError
			});
			log.warn(`auth-triggered model runtime refresh failed: ${String(refreshError)}`);
		}
	});
}
function invalidateForAuthMutation(event) {
	const normalizedEvent = {
		...event,
		agentDir: normalizeOptionalDir(event.agentDir)
	};
	const { invalidatedOwners, invalidatedConfiguredAgentIds } = invalidatePreparedModelRuntimeOwnersForAuthMutation(owners, normalizedEvent);
	if (invalidatedOwners.length === 0) return;
	replyDispatchPublication.remove(invalidatedConfiguredAgentIds);
	const transaction = authPublication.enqueue(invalidatedOwners, normalizedEvent.profileSetChanged);
	if (getBlockingReplacement()) {
		authPublication.adoptTransaction(transaction, getBlockingReplacement().gateId);
		notifyPreparedModelRuntimePublication({ phase: "invalidated" });
		return;
	}
	if (!authPublication.claimPublication(transaction)) {
		notifyPreparedModelRuntimePublication({ phase: "invalidated" });
		return;
	}
	const publication = publicationQueue.enqueue(async () => {
		if (getBlockingReplacement()) {
			authPublication.adoptTransaction(transaction, getBlockingReplacement().gateId);
			return;
		}
		await drainPendingAuthMutations(() => {
			if (getBlockingReplacement()) {
				authPublication.adoptTransaction(transaction, getBlockingReplacement().gateId);
				return;
			}
			if (!authPublication.resolve(transaction, owners)) return;
			if (pendingModelRuntimeReplacement?.degraded || configuredOwnersAreRequestVisible(owners)) {
				notifyPreparedModelRuntimePublication({ phase: "published" });
				refreshCommittedProviderCatalogs(owners.values());
			}
		});
	});
	notifyPreparedModelRuntimePublication({ phase: "invalidated" });
	publication.catch((error) => {
		if (!authPublication.isCurrent(transaction)) return;
		if (getBlockingReplacement()) {
			authPublication.adoptTransaction(transaction, getBlockingReplacement().gateId);
			return;
		}
		if (error instanceof PreparedModelRuntimePublicationSupersededError) return;
		const refreshError = toStringifiedError(error);
		authPublication.reject(transaction, refreshError);
		notifyPreparedModelRuntimePublication({
			phase: "failed",
			error: refreshError
		});
		log.warn(`auth-triggered model runtime refresh failed: ${String(refreshError)}`);
	});
}
registerRuntimeAuthProfileStoreMutationListener(invalidateForAuthMutation);
registerPreparedRuntimeAuthMaterializationPublisher(owners, notifyPreparedModelRuntimePublication);
async function resetPreparedModelRuntimeSnapshotsForTest() {
	await closePreparedModelRuntimeSnapshots();
	resetPreparedModelRuntimePublicationListenersForTest();
	modelRuntimeBuildTimeoutMs = DEFAULT_MODEL_RUNTIME_BUILD_TIMEOUT_MS;
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.preparedModelRuntimeTestApi")] = {
	resetPreparedModelRuntimeSnapshotsForTest,
	getPreparedModelRuntimeOwnerCountForTest: () => owners.size,
	setModelRuntimeBuildTimeoutMsForTest: (timeoutMs) => {
		modelRuntimeBuildTimeoutMs = timeoutMs;
	}
};
//#endregion
export { readCapturedPreparedModelRuntimeCatalog as S, refreshPreparedModelRuntimeCatalog as _, acquireReadOnlyPreparedModelRuntime as a, preparedModelRuntimeConfigsMatch as b, cancelPreparedModelRuntimeRefresh as c, loadPreparedModelRuntimeSnapshot as d, loadPublishedGatewayReplyDispatchRuntime as f, recoverPreparedModelRuntimeCatalogWorker as g, publishPreparedModelRuntimeSnapshot as h, acquirePublishedPreparedModelRuntime as i, getPendingPreparedModelRuntimeReplacement as l, prepareModelRuntimeSnapshot as m, acquireAgentRuntimeCleanupRegistries as n, activateStandalonePreparedModelRuntime as o, markPreparedModelRuntimeSnapshotsStale as p, acquirePreparedModelRuntimeSnapshot as r, advancePreparedModelRuntimeConfig as s, acquireAgentRunPreparedModelRuntime as t, getPreparedModelRuntimeSnapshot as u, refreshPreparedModelRuntimeSnapshots as v, withPreparedModelRuntimeReadBatch as x, rejectPendingPreparedModelRuntimeReplacement as y };
