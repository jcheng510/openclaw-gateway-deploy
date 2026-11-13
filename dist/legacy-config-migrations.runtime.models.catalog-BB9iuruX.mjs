import { r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { a as resolveUniqueCatalogModelRoute, t as modelTransportRoutesMatch } from "./model-compat-catalog-C82G2MfF.mjs";
import { r as isModelThinkingFormat } from "./model-config-vocabulary-DKKMQG9F.mjs";
import { n as planManifestModelCatalogRows } from "./manifest-planner-jaL2TnGz.mjs";
import { a as resolveProviderModelRoutes } from "./provider-model-routes-BLsfrAyg.mjs";
import "./types.models-Cp8mc9VC.mjs";
import { t as listOpenClawPluginManifestMetadata } from "./manifest-metadata-scan-A2PFiFYG.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/commands/doctor/shared/legacy-config-migrations.runtime.models.catalog.ts
const STALE_CONTEXT_WINDOW_FIXES = {
	"deepseek/deepseek-v4-flash": {
		stale: 2e5,
		correct: 1e6
	},
	"xai/grok-4.20-0309-reasoning": {
		stale: 2e6,
		correct: 1e6
	},
	"xai/grok-4.20-0309-non-reasoning": {
		stale: 2e6,
		correct: 1e6
	},
	"xai/grok-4.20-beta-latest-reasoning": {
		stale: 2e6,
		correct: 1e6
	},
	"xai/grok-4.20-beta-latest-non-reasoning": {
		stale: 2e6,
		correct: 1e6
	},
	"xai/grok-4.20-experimental-beta-0304-reasoning": {
		stale: 2e6,
		correct: 1e6
	},
	"xai/grok-4.20-experimental-beta-0304-non-reasoning": {
		stale: 2e6,
		correct: 1e6
	},
	"xai/grok-4.20-reasoning": {
		stale: 2e6,
		correct: 1e6
	},
	"xai/grok-4.20-non-reasoning": {
		stale: 2e6,
		correct: 1e6
	}
};
const DEAD_MODEL_COMPAT_KEYS = ["nativeWebSearchTool", "requiresMistralToolIds"];
function* providerModelEntries(providers) {
	for (const [providerId, value] of Object.entries(asNullableRecord(providers) ?? {})) {
		const provider = asNullableRecord(value);
		if (!provider || !Array.isArray(provider.models)) continue;
		for (const [modelIndex, modelValue] of provider.models.entries()) {
			const model = asNullableRecord(modelValue);
			if (model) yield {
				providerId,
				provider,
				modelIndex,
				model
			};
		}
	}
}
function normalizedCatalogModelKey(provider, modelId) {
	const normalizedProvider = normalizeProviderId(provider);
	const normalizedId = modelId.trim().toLowerCase();
	const providerPrefix = `${normalizedProvider}/`;
	return `${normalizedProvider}::${normalizedId.startsWith(providerPrefix) ? normalizedId.slice(providerPrefix.length) : normalizedId}`;
}
const modelCompatCatalogRowsByProvider = /* @__PURE__ */ new Map();
let modelCompatCatalogPlugins;
function getModelCompatCatalogPlugins() {
	modelCompatCatalogPlugins ??= listOpenClawPluginManifestMetadata().flatMap(({ manifest }) => {
		const id = typeof manifest.id === "string" ? manifest.id.trim() : "";
		const modelCatalog = asNullableRecord(manifest.modelCatalog);
		if (!id || !modelCatalog) return [];
		return [{
			id,
			providers: Array.isArray(manifest.providers) ? manifest.providers.filter((value) => typeof value === "string") : [],
			modelCatalog
		}];
	});
	return modelCompatCatalogPlugins;
}
function buildConfiguredProviderCatalogRows(providers) {
	const rows = /* @__PURE__ */ new Map();
	for (const providerId of Object.keys(providers)) {
		const normalizedProviderId = normalizeProviderId(providerId);
		let providerRows = modelCompatCatalogRowsByProvider.get(normalizedProviderId);
		if (!providerRows) {
			providerRows = planManifestModelCatalogRows({
				registry: { plugins: getModelCompatCatalogPlugins() },
				providerFilter: normalizedProviderId
			}).rows;
			modelCompatCatalogRowsByProvider.set(normalizedProviderId, providerRows);
		}
		for (const row of providerRows) {
			const key = normalizedCatalogModelKey(row.provider, row.id);
			const variants = rows.get(key) ?? [];
			variants.push(row);
			rows.set(key, variants);
		}
	}
	return rows;
}
/** Resolves one catalog identity and whether its configured route remains provider-owned. */
function resolveConfiguredModelCatalogOwnership(params) {
	const modelId = typeof params.model.id === "string" ? params.model.id : "";
	if (!modelId) return;
	const rows = buildConfiguredProviderCatalogRows({ [params.providerId]: params.provider }).get(normalizedCatalogModelKey(params.providerId, modelId));
	const catalogRow = rows?.length === 1 ? rows[0] : void 0;
	if (!catalogRow) return;
	const configuredRoute = {
		api: params.model.api ?? params.provider.api,
		baseUrl: params.model.baseUrl ?? params.provider.baseUrl
	};
	const exactCatalogRoute = modelTransportRoutesMatch(catalogRow, configuredRoute);
	const providerRoutes = resolveProviderModelRoutes({
		provider: params.providerId,
		modelId,
		env: {}
	});
	const providerOwnedRoute = providerRoutes?.kind === "routes" && providerRoutes.routes.some((route) => modelTransportRoutesMatch(route, configuredRoute));
	return {
		catalogRow,
		ownsRoute: exactCatalogRoute || providerOwnedRoute
	};
}
function inspectModelCompatOverrides(providersValue, onEntry) {
	const providers = asNullableRecord(providersValue);
	const total = {
		dead: 0,
		divergent: 0,
		matching: 0
	};
	if (!providers) return total;
	const entries = [...providerModelEntries(providers)];
	if (!entries.some(({ model }) => Boolean(asNullableRecord(model.compat)))) return total;
	const catalogRows = buildConfiguredProviderCatalogRows(providers);
	for (const { providerId, provider, modelIndex, model } of entries) {
		const compat = asNullableRecord(model.compat);
		const modelId = typeof model.id === "string" ? model.id : "";
		if (!compat || !modelId) continue;
		const state = {
			dead: 0,
			divergent: 0,
			matching: 0
		};
		for (const key of DEAD_MODEL_COMPAT_KEYS) if (Object.hasOwn(compat, key)) state.dead += 1;
		const configuredRoute = {
			api: model.api ?? provider.api,
			baseUrl: model.baseUrl ?? provider.baseUrl
		};
		const catalogRow = resolveUniqueCatalogModelRoute(catalogRows.get(normalizedCatalogModelKey(providerId, modelId)), configuredRoute);
		if (catalogRow !== void 0) {
			const catalogCompat = catalogRow.compat ?? {};
			for (const [key, value] of Object.entries(compat)) {
				if (DEAD_MODEL_COMPAT_KEYS.includes(key)) continue;
				if (isDeepStrictEqual(value, catalogCompat[key])) state.matching += 1;
				else state.divergent += 1;
			}
		}
		total.dead += state.dead;
		total.divergent += state.divergent;
		total.matching += state.matching;
		onEntry?.({
			catalogRow,
			compat,
			model,
			modelIndex,
			provider,
			providerId,
			state
		});
	}
	return total;
}
const MODEL_COMPAT_CATALOG_RULES = [
	{
		path: ["models", "providers"],
		message: "nativeWebSearchTool and requiresMistralToolIds are unused and retired; run \"openclaw doctor --fix\" to remove them.",
		match: (value) => inspectModelCompatOverrides(value).dead > 0
	},
	{
		path: ["models", "providers"],
		message: "Catalog-known model compat values are provider-owned; run \"openclaw doctor --fix\" to remove matching config overrides.",
		match: (value) => inspectModelCompatOverrides(value).matching > 0
	},
	{
		path: ["models", "providers"],
		message: "Catalog-known model compat differs from the provider catalog and was preserved for review. Use a distinct custom route when the endpoint really has different capabilities.",
		match: (value) => inspectModelCompatOverrides(value).divergent > 0
	}
];
function migrateModelCompatCatalogOwnership(raw, changes) {
	inspectModelCompatOverrides(asNullableRecord(asNullableRecord(raw.models)?.providers), ({ catalogRow, compat, model, modelIndex, provider, providerId }) => {
		const removed = [];
		for (const key of DEAD_MODEL_COMPAT_KEYS) if (Object.hasOwn(compat, key)) {
			delete compat[key];
			removed.push(key);
		}
		if (catalogRow && modelTransportRoutesMatch(catalogRow, {
			api: model.api ?? provider.api ?? catalogRow.api,
			baseUrl: model.baseUrl ?? provider.baseUrl ?? catalogRow.baseUrl
		})) {
			const catalogCompat = catalogRow.compat ?? {};
			for (const [key, value] of Object.entries(compat)) if (isDeepStrictEqual(value, catalogCompat[key])) {
				delete compat[key];
				removed.push(key);
			}
		}
		if (removed.length === 0) return;
		if (Object.keys(compat).length === 0) delete model.compat;
		changes.push(`Removed models.providers.${providerId}.models.${modelIndex}.compat catalog/dead overrides: ${removed.toSorted().join(", ")}.`);
	});
}
function resolveStaleContextWindowFix(params) {
	const providerId = params.providerId.trim().toLowerCase();
	const modelId = params.modelId.trim().toLowerCase();
	const providerPrefix = `${providerId}/`;
	const scopedModelId = `${providerId}/${modelId.startsWith(providerPrefix) ? modelId.slice(providerPrefix.length) : modelId}`;
	const fix = STALE_CONTEXT_WINDOW_FIXES[scopedModelId];
	return fix && params.contextWindow === fix.stale ? fix : void 0;
}
function hasStaleContextWindowValue(providers) {
	for (const { providerId, model } of providerModelEntries(providers)) {
		const modelId = typeof model.id === "string" ? model.id : void 0;
		const contextWindow = model.contextWindow;
		if (!modelId || typeof contextWindow !== "number" || !Number.isFinite(contextWindow)) continue;
		if (resolveStaleContextWindowFix({
			providerId,
			modelId,
			contextWindow
		})) return true;
	}
	return false;
}
function hasInvalidThinkingFormat(providers) {
	for (const { model } of providerModelEntries(providers)) {
		const thinkingFormat = asNullableRecord(model.compat)?.thinkingFormat;
		if (typeof thinkingFormat === "string" && !isModelThinkingFormat(thinkingFormat)) return true;
	}
	return false;
}
//#endregion
export { providerModelEntries as a, migrateModelCompatCatalogOwnership as i, hasInvalidThinkingFormat as n, resolveConfiguredModelCatalogOwnership as o, hasStaleContextWindowValue as r, resolveStaleContextWindowFix as s, MODEL_COMPAT_CATALOG_RULES as t };
