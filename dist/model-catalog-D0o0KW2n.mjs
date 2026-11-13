import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as VERSION } from "./version-BMuSsYfE.mjs";
import { Et as _enum, Fn as object, Jn as string, Ln as partialRecord, Lt as boolean, Nt as array, Pn as number, Un as record, Yt as discriminatedUnion, nr as tuple, or as union, sr as unknown, xn as literal } from "./schemas-BOYIvvln.mjs";
import { t as compareOpenClawVersions } from "./version-ByD9iTct.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { r as normalizeProviderId } from "./provider-id-BIyeXQag.mjs";
import { n as buildModelCatalogRef } from "./model-catalog-refs-Dd-I0WMI.mjs";
import { n as MODEL_CATALOG_THINKING_LEVELS, t as MODEL_CATALOG_APIS } from "./model-catalog-types-BUOf2O4u.mjs";
import "./model-catalog-normalize-CVo8l4mj.mjs";
import { r as isProviderCatalogSourceAllowed } from "./provider-config-owner-9diICrQg.mjs";
import { n as planManifestModelCatalogRows } from "./manifest-planner-jaL2TnGz.mjs";
import { n as readRemoteModelCatalog, r as readRemoteModelCatalogAsync } from "./remote-store-Btflk7Yw.mjs";
import { createRequire } from "node:module";
import { getEnvironmentData, setEnvironmentData } from "node:worker_threads";
//#region src/model-catalog/bundled-catalog-stamp.ts
const BUILD_INFO_CANDIDATES = [
	"../build-info.json",
	"../../build-info.json",
	"./build-info.json"
];
/** Reads the package build stamp once through Node's JSON module cache. */
function bundledCatalogGeneratedAt(moduleUrl = import.meta.url) {
	const require = createRequire(moduleUrl);
	for (const candidate of BUILD_INFO_CANDIDATES) try {
		const info = require(candidate);
		if (typeof info.builtAt !== "string") continue;
		const generatedAt = Date.parse(info.builtAt);
		if (Number.isFinite(generatedAt) && generatedAt > 0) return generatedAt;
	} catch {}
}
//#endregion
//#region packages/model-catalog-core/src/remote-catalog-bundle.ts
const REMOTE_CATALOG_MAX_FUTURE_SKEW_MS = 864e5;
const stringMapSchema = record(string(), string());
const pricingTierSchema = object({
	input: number().finite().nonnegative(),
	output: number().finite().nonnegative(),
	cacheRead: number().finite().nonnegative(),
	cacheWrite: number().finite().nonnegative(),
	range: union([tuple([number().finite().nonnegative()]), tuple([number().finite().nonnegative(), number().finite().nonnegative()])])
}).strict();
const costSchema = object({
	input: number().finite().nonnegative().optional(),
	output: number().finite().nonnegative().optional(),
	cacheRead: number().finite().nonnegative().optional(),
	cacheWrite: number().finite().nonnegative().optional(),
	tieredPricing: array(pricingTierSchema).optional()
}).strict();
const hostedPricingSchema = object({
	input: number().finite().nonnegative(),
	output: number().finite().nonnegative(),
	cacheRead: number().finite().nonnegative().optional(),
	cacheWrite: number().finite().nonnegative().optional(),
	tieredPricing: array(pricingTierSchema).optional()
}).strict();
const contextWindowOptionSchema = object({
	id: string().trim().min(1),
	label: string().trim().min(1),
	contextWindow: number().int().positive()
}).strict();
const modelFieldsSchema = object({
	id: string().trim().min(1),
	name: string().optional(),
	api: _enum(MODEL_CATALOG_APIS).optional(),
	baseUrl: string().optional(),
	headers: stringMapSchema.optional(),
	input: array(_enum([
		"text",
		"image",
		"document"
	])).optional(),
	reasoning: boolean().optional(),
	contextWindow: number().finite().positive().optional(),
	contextWindows: array(contextWindowOptionSchema).max(16).optional(),
	contextWindowDefault: string().trim().min(1).optional(),
	contextTokens: number().int().positive().optional(),
	maxTokens: number().finite().positive().optional(),
	thinkingLevelMap: partialRecord(_enum(MODEL_CATALOG_THINKING_LEVELS), string().nullable()).optional(),
	cost: costSchema.optional(),
	compat: record(string(), unknown()).optional(),
	mediaInput: record(string(), unknown()).optional(),
	status: _enum([
		"available",
		"preview",
		"deprecated",
		"disabled"
	]).optional(),
	statusReason: string().optional(),
	replaces: array(string()).optional(),
	replacedBy: string().optional(),
	tags: array(string()).optional()
});
function validateContextWindowDefault(model, context) {
	if (model.contextWindowDefault && !model.contextWindows?.some((option) => option.id === model.contextWindowDefault)) context.addIssue({
		code: "custom",
		message: "contextWindowDefault must reference a declared contextWindows option",
		path: ["contextWindowDefault"]
	});
}
const modelSchema = modelFieldsSchema.superRefine(validateContextWindowDefault);
const remoteModelCatalogProviderSchema = object({
	baseUrl: string().optional(),
	api: _enum(MODEL_CATALOG_APIS).optional(),
	headers: stringMapSchema.optional(),
	defaultModel: string().optional(),
	defaultUtilityModel: string().optional(),
	models: array(modelSchema).min(1)
}).strict().superRefine((provider, context) => {
	const seen = /* @__PURE__ */ new Set();
	for (const [index, model] of provider.models.entries()) {
		if (seen.has(model.id)) context.addIssue({
			code: "custom",
			message: `duplicate model id: ${model.id}`,
			path: [
				"models",
				index,
				"id"
			]
		});
		seen.add(model.id);
	}
});
const remoteModelCatalogBundleSchema = object({
	schemaVersion: literal(1),
	generatedAt: number().int().positive().refine((value) => value <= Date.now() + REMOTE_CATALOG_MAX_FUTURE_SKEW_MS, { message: "generatedAt is implausibly far in the future" }),
	minVersion: string().trim().min(1).optional(),
	sourceCommit: string().trim().min(1),
	providers: record(string().trim().min(1), remoteModelCatalogProviderSchema),
	pricing: record(string().trim().min(1), hostedPricingSchema).optional()
}).strict();
const knownPricingV2Schema = costSchema.extend({
	status: literal("known"),
	currency: literal("USD"),
	unit: literal("million_tokens"),
	source: string().trim().min(1).optional()
}).refine((pricing) => pricing.input !== void 0 || pricing.output !== void 0 || pricing.cacheRead !== void 0 || pricing.cacheWrite !== void 0 || Boolean(pricing.tieredPricing?.length), { message: "known pricing must contain rates" });
const pricingV2Schema = discriminatedUnion("status", [knownPricingV2Schema, object({
	status: _enum(["unknown", "unavailable"]),
	source: string().trim().min(1).optional()
}).strict()]);
const sourcedPricingV2Schema = hostedPricingSchema.extend({ source: string().trim().min(1) }).strict();
const upstreamPricingV2Schema = sourcedPricingV2Schema.extend({
	passthroughOnly: literal(true).optional(),
	alternatives: array(sourcedPricingV2Schema).min(1).optional()
}).strict();
const standalonePricingKeySchema = string().regex(/^[^/\s]+\/\S+$/u, "standalone pricing keys must be provider/model");
const modelV2Schema = modelFieldsSchema.omit({
	cost: true,
	baseUrl: true,
	headers: true
}).extend({
	provider: string().trim().min(1),
	pricing: pricingV2Schema
}).strict().superRefine(validateContextWindowDefault);
const remoteModelCatalogBundleV2Schema = remoteModelCatalogBundleSchema.omit({
	providers: true,
	pricing: true
}).extend({
	schemaVersion: literal(2),
	providers: record(string().trim().min(1), object({
		api: _enum(MODEL_CATALOG_APIS).optional(),
		defaultModel: string().optional(),
		defaultUtilityModel: string().optional(),
		recommendedModels: array(string().trim().min(1)).refine((ids) => new Set(ids).size === ids.length, "duplicate recommended model id").optional()
	}).strict()),
	models: array(modelV2Schema).min(1),
	upstreamPricing: record(standalonePricingKeySchema, upstreamPricingV2Schema).optional(),
	providerPricing: record(standalonePricingKeySchema, sourcedPricingV2Schema).optional()
}).superRefine((bundle, context) => {
	const providers = /* @__PURE__ */ new Map();
	for (const [index, model] of bundle.models.entries()) {
		if (!Object.hasOwn(bundle.providers, model.provider)) context.addIssue({
			code: "custom",
			message: `undeclared model provider: ${model.provider}`,
			path: [
				"models",
				index,
				"provider"
			]
		});
		const ids = providers.get(model.provider) ?? /* @__PURE__ */ new Set();
		if (ids.has(model.id)) context.addIssue({
			code: "custom",
			message: `duplicate provider/model: ${model.provider}/${model.id}`,
			path: [
				"models",
				index,
				"id"
			]
		});
		ids.add(model.id);
		providers.set(model.provider, ids);
	}
	for (const [provider, entry] of Object.entries(bundle.providers)) for (const [index, id] of (entry.recommendedModels ?? []).entries()) if (!providers.get(provider)?.has(id)) context.addIssue({
		code: "custom",
		message: `recommended model must reference a model of provider ${provider}: ${id}`,
		path: [
			"providers",
			provider,
			"recommendedModels",
			index
		]
	});
});
function parseRemoteModelCatalogBundleV2(value) {
	return remoteModelCatalogBundleV2Schema.parse(value);
}
function parseRemoteModelCatalogBundle(value) {
	return remoteModelCatalogBundleSchema.parse(value);
}
function stripRemoteTransportOverrides(value) {
	if (Array.isArray(value)) return value.map(stripRemoteTransportOverrides);
	if (!value || typeof value !== "object") return value;
	const entries = Object.entries(value);
	let kept = 0;
	for (const entry of entries) if (entry[0] !== "baseUrl" && entry[0] !== "headers") {
		entry[1] = stripRemoteTransportOverrides(entry[1]);
		entries[kept++] = entry;
	}
	entries.length = kept;
	return Object.fromEntries(entries);
}
/** Removes every transport endpoint/header override before remote data reaches persistence. */
function sanitizeRemoteModelCatalogBundle(bundle) {
	return stripRemoteTransportOverrides(bundle);
}
function validateAndSanitizeRemoteModelCatalogBundle(value) {
	return sanitizeRemoteModelCatalogBundle(parseRemoteModelCatalogBundle(value));
}
function validateAndSanitizeRemoteModelCatalogBundleV2(value) {
	const bundle = parseRemoteModelCatalogBundleV2(value);
	return {
		...bundle,
		models: bundle.models.map((model) => {
			return stripRemoteTransportOverrides(model);
		})
	};
}
//#endregion
//#region src/model-catalog/remote-bundle.ts
/** Configured v1 mirrors remain a public input contract; runtime uses one projection. */
function parseRemoteModelCatalogWireBundle(value) {
	return isRecord(value) && value.schemaVersion === 2 ? validateAndSanitizeRemoteModelCatalogBundleV2(value) : validateAndSanitizeRemoteModelCatalogBundle(value);
}
function projectRemoteModelCatalog(bundle) {
	if (bundle.schemaVersion === 1) return {
		providers: bundle.providers,
		pricing: Object.fromEntries(Object.entries(bundle.pricing ?? {}).map(([key, cost]) => [key, {
			cost,
			explicit: false
		}])),
		upstreamPricing: {}
	};
	const providers = Object.fromEntries(Object.entries(bundle.providers).map(([id, provider]) => [id, {
		...provider,
		models: []
	}]));
	const rowKeys = new Set(bundle.models.map(({ provider, id }) => buildModelCatalogRef(provider, id)));
	const prices = Object.entries(bundle.providerPricing ?? {}).filter(([key]) => !rowKeys.has(key)).map(([key, { source: _source, ...cost }]) => [key, {
		cost,
		explicit: false
	}]);
	for (const { provider, pricing, ...model } of bundle.models) {
		let cost;
		if (pricing.status === "known") {
			const { status: _status, currency: _currency, unit: _unit, source: _source, ...rates } = pricing;
			cost = rates;
			prices.push([buildModelCatalogRef(provider, model.id), {
				cost,
				explicit: true
			}]);
		}
		providers[provider].models.push({
			...model,
			...cost ? { cost } : {}
		});
	}
	return {
		providers,
		pricing: Object.fromEntries(prices),
		upstreamPricing: Object.fromEntries(Object.entries(bundle.upstreamPricing ?? {}).map(([key, { source, passthroughOnly = false, alternatives = [], ...cost }]) => [key, {
			rates: [{
				source,
				cost
			}, ...alternatives.map(({ source: alternative, ...rates }) => ({
				source: alternative,
				cost: rates
			}))],
			passthroughOnly: passthroughOnly || rowKeys.has(key)
		}]))
	};
}
//#endregion
//#region src/model-catalog/remote-config.ts
const DEFAULT_REMOTE_MODEL_CATALOG_URL = "https://catalog.openclaw.ai/models/v2/catalog.json";
const RETIRED_DEFAULT_REMOTE_MODEL_CATALOG_URL = "https://catalog.openclaw.ai/models/v1/catalog.json";
function isRemoteModelCatalogRefreshEnabled(config) {
	return config.models?.catalogRefresh?.enabled !== false;
}
function resolveRemoteCatalogUrl(config) {
	return config.models?.catalogRefresh?.url?.trim() || DEFAULT_REMOTE_MODEL_CATALOG_URL;
}
/** Whether a catalog downloaded from `sourceUrl` may serve the configured source. */
function isRemoteCatalogSourceActive(config, sourceUrl) {
	const url = resolveRemoteCatalogUrl(config);
	return sourceUrl === url || url === DEFAULT_REMOTE_MODEL_CATALOG_URL && sourceUrl === RETIRED_DEFAULT_REMOTE_MODEL_CATALOG_URL;
}
//#endregion
//#region src/model-catalog/remote-overlay.ts
const STARTUP_SNAPSHOT_KEY = "openclaw.remoteModelCatalogStartupSnapshot";
let readBundledGeneratedAt = bundledCatalogGeneratedAt;
let readStoredCatalog = readRemoteModelCatalog;
let readStoredCatalogAsync = readRemoteModelCatalogAsync;
function isCompatible(bundle, bundledGeneratedAt) {
	if (bundle.generatedAt <= bundledGeneratedAt) return false;
	if (!bundle.minVersion) return true;
	const comparison = compareOpenClawVersions(VERSION, bundle.minVersion);
	return comparison !== null && comparison >= 0;
}
function readCompatibleRemoteModelCatalog() {
	const bundledGeneratedAt = readBundledGeneratedAt();
	if (bundledGeneratedAt === void 0) return null;
	return selectCompatibleRemoteModelCatalog(readStoredCatalog(), bundledGeneratedAt);
}
function readCompatibleRemoteModelCatalogMetadata() {
	const bundledGeneratedAt = readBundledGeneratedAt();
	if (bundledGeneratedAt === void 0) return null;
	const stored = readStoredCatalog();
	if (!stored) return null;
	const bundle = parseRemoteModelCatalogWireBundle(JSON.parse(stored.bundle_json));
	return isCompatible(bundle, bundledGeneratedAt) ? {
		sourceUrl: stored.source_url,
		generatedAt: bundle.generatedAt
	} : null;
}
function selectCompatibleRemoteModelCatalog(stored, bundledGeneratedAt) {
	if (!stored) return null;
	const bundle = parseRemoteModelCatalogWireBundle(JSON.parse(stored.bundle_json));
	if (!isCompatible(bundle, bundledGeneratedAt)) return null;
	return {
		sourceUrl: stored.source_url,
		generatedAt: bundle.generatedAt,
		...projectRemoteModelCatalog(bundle)
	};
}
function inheritedRemoteModelCatalogStartupSnapshot() {
	return getEnvironmentData(STARTUP_SNAPSHOT_KEY);
}
function publishRemoteModelCatalogStartupSnapshot(snapshot) {
	const inherited = inheritedRemoteModelCatalogStartupSnapshot();
	if (inherited !== void 0) return inherited.catalog;
	setEnvironmentData(STARTUP_SNAPSHOT_KEY, { catalog: snapshot });
	return snapshot;
}
function captureRemoteModelCatalogStartupSnapshot() {
	const inherited = inheritedRemoteModelCatalogStartupSnapshot();
	if (inherited !== void 0) return inherited.catalog;
	let snapshot;
	try {
		snapshot = readCompatibleRemoteModelCatalog();
	} catch {
		snapshot = null;
	}
	return publishRemoteModelCatalogStartupSnapshot(snapshot);
}
/** Prepare the same first-winner startup pair without host-thread SQLite reads. */
async function prepareRemoteModelCatalogStartupSnapshot(options = {}) {
	const inherited = inheritedRemoteModelCatalogStartupSnapshot();
	if (inherited !== void 0) return inherited.catalog;
	let bundledGeneratedAt;
	try {
		bundledGeneratedAt = readBundledGeneratedAt();
	} catch {
		return publishRemoteModelCatalogStartupSnapshot(null);
	}
	if (bundledGeneratedAt === void 0) return publishRemoteModelCatalogStartupSnapshot(null);
	const context = captureOpenClawStateWorkerContext(options);
	let snapshot;
	try {
		snapshot = selectCompatibleRemoteModelCatalog(await readStoredCatalogAsync(context), bundledGeneratedAt);
	} catch {
		snapshot = null;
	}
	context.admission.assertCurrent();
	return publishRemoteModelCatalogStartupSnapshot(snapshot);
}
function getActiveRemoteModelCatalog(config) {
	if (!isRemoteModelCatalogRefreshEnabled(config)) return;
	const snapshot = captureRemoteModelCatalogStartupSnapshot();
	return snapshot && isRemoteCatalogSourceActive(config, snapshot.sourceUrl) ? snapshot : void 0;
}
/** Inspects a completed check without activating its download or replacing the startup pair. */
function checkRemoteModelCatalogUpdate(config, expected) {
	if (!isRemoteModelCatalogRefreshEnabled(config) || resolveRemoteCatalogUrl(config) !== expected.sourceUrl) return "superseded";
	const active = getActiveRemoteModelCatalog(config);
	if (active?.sourceUrl === expected.sourceUrl && active.generatedAt === expected.generatedAt) return "unchanged";
	const stored = readCompatibleRemoteModelCatalogMetadata();
	if (!stored) return "unchanged";
	return stored.sourceUrl === expected.sourceUrl && stored.generatedAt === expected.generatedAt ? "restart-required" : "superseded";
}
function getRemoteModelCatalogProviderOverlay(config, provider) {
	const providerId = normalizeProviderId(provider);
	return providerId ? getActiveRemoteModelCatalog(config)?.providers[providerId] : void 0;
}
function getRemoteModelCatalogPricing(config) {
	return getActiveRemoteModelCatalog(config)?.pricing;
}
function getRemoteModelCatalogUpstreamPricing(config) {
	return getActiveRemoteModelCatalog(config)?.upstreamPricing;
}
function setRemoteModelCatalogOverlaySourcesForTest(sources) {
	setEnvironmentData(STARTUP_SNAPSHOT_KEY, void 0);
	readBundledGeneratedAt = sources?.bundledGeneratedAt ?? bundledCatalogGeneratedAt;
	readStoredCatalog = sources?.readStoredCatalog ?? readRemoteModelCatalog;
	const readTestCatalog = sources?.readStoredCatalog;
	readStoredCatalogAsync = readTestCatalog ? async () => readTestCatalog() : readRemoteModelCatalogAsync;
}
if (process.env.VITEST || false) globalThis[Symbol.for("openclaw.remoteModelCatalogOverlayTestApi")] = { setRemoteModelCatalogOverlaySourcesForTest };
//#endregion
//#region src/model-catalog/index.ts
function planEffectiveModelCatalogRows(params) {
	return planManifestModelCatalogRows({
		registry: params.registry,
		includeProvider: (provider, plugin) => isProviderCatalogSourceAllowed({
			provider,
			plugin,
			config: params.config
		}),
		...params.providerFilter ? { providerFilter: params.providerFilter } : {},
		...params.providerFilters ? { providerFilters: params.providerFilters } : {},
		...params.mergeKeyFilter ? { mergeKeyFilter: params.mergeKeyFilter } : {},
		resolveRemoteProvider: (provider) => getRemoteModelCatalogProviderOverlay(params.config, provider),
		...params.selection ? { selection: params.selection } : {}
	});
}
//#endregion
export { getRemoteModelCatalogUpstreamPricing as a, resolveRemoteCatalogUrl as c, getRemoteModelCatalogPricing as i, parseRemoteModelCatalogWireBundle as l, captureRemoteModelCatalogStartupSnapshot as n, prepareRemoteModelCatalogStartupSnapshot as o, checkRemoteModelCatalogUpdate as r, isRemoteModelCatalogRefreshEnabled as s, planEffectiveModelCatalogRows as t, bundledCatalogGeneratedAt as u };
