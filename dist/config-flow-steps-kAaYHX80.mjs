import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { t as cloneConfigWithResolutionFacts } from "./resolution-facts-CYe39-eJ.mjs";
import { t as coerceConfig } from "./io.read-helpers-CgQwh9G4.mjs";
import { t as discoverConfiguredPluginLoadPaths, u as findUninspectedPluginDiagnostic } from "./discovery-BePzXbRd.mjs";
import { n as formatConfigIssueLines } from "./issue-format-IKggtHBm.mjs";
import { n as validateConfigObjectRawWithPlugins } from "./validation-D_X_aeNf.mjs";
import { t as inheritLegacyDefaultAgentId } from "./legacy.default-agent-owner-C1atgXtB.mjs";
import { t as isChannelConfigMetadataKey } from "./config-metadata-aX1D2IMg.mjs";
import { i as isPluginSourceModulePath, u as tryNativeRequireModule } from "./native-module-require-CSZ6a26X.mjs";
import { t as getCachedPluginModuleLoader } from "./plugin-module-loader-cache-Bs0f_Kt6.mjs";
import { o as preparePluginLoaderAliases } from "./sdk-alias-DsyJKD8M.mjs";
import { n as getDeferredPluginMigrationConfigFacts, o as setDeferredPluginMigrationConfigFacts } from "./deferred-plugin-migration-config-BbOrU7ue.mjs";
import { t as getBootstrapChannelPlugin } from "./bootstrap-registry-B_Z4D93x.mjs";
import { i as collectToolPolicyConflictWarnings, r as LEGACY_CONFIG_MIGRATIONS } from "./legacy-BsVKffEe.mjs";
import "./legacy-config-migrations.runtime.models-Dl5Y6YWP.mjs";
import { n as containsAuthoredInclude, t as classifyOtelGrpcMigrationOwnership } from "./include-migration-ownership-CmcqCsxa.mjs";
import { o as restoreEnvVarRefsFromResolved } from "./io.types-BjaggY16.mjs";
import { r as projectAuthoredAgentRosterForWrite } from "./io.write-prepare-dZ_zf9J0.mjs";
import { n as createMergePatch } from "./merge-patch-B0Q0c4qF.mjs";
import { o as migratePluginConfigId } from "./update-config-cXeyJDOT.mjs";
import { n as protectActiveAuthProfileConfig } from "./doctor-auth-profile-config-Bu17M0gd.mjs";
import { d as stripUnknownConfigKeys } from "./doctor-config-analysis-yucbqgfG.mjs";
import { t as loadBundledChannelDoctorContractApi } from "./doctor-contract-api-DVcjybk0.mjs";
import { i as isPluginDoctorMigrationDeferred, m as applyPluginDoctorCompatibilityMigration, n as applyPluginDoctorCompatibilityMigrations, r as collectDoctorConfigRepairPluginIds } from "./doctor-contract-registry-C87v36Ap.mjs";
import { t as listDoctorConfiguredChannelIds } from "./configured-channel-ids-XADU8iWJ.mjs";
import { t as resolveChannelAccountBindingRepairInput } from "./legacy-config-binding-repair-input-CZe5BL4p.mjs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
//#region src/commands/doctor/shared/channel-legacy-config-migrate.ts
const log = createSubsystemLogger("plugins/doctor-contracts");
function migrateHeartbeatVisibility(raw, changes) {
	const channels = isRecord(raw.channels) ? raw.channels : null;
	if (!channels) return;
	const migrateEntry = (entry, path, preserveEmptyPluginBlock = false) => {
		const heartbeat = isRecord(entry.heartbeat) ? entry.heartbeat : null;
		const keys = heartbeat ? Object.keys(heartbeat) : [];
		if (!heartbeat || preserveEmptyPluginBlock && keys.length === 0 || keys.some((key) => key !== "showOk" && key !== "showAlerts" && key !== "useIndicator")) return;
		if (entry.heartbeatVisibility === void 0) {
			entry.heartbeatVisibility = entry.heartbeat;
			changes.push(`Moved ${path}.heartbeat → ${path}.heartbeatVisibility.`);
		} else changes.push(`Removed ${path}.heartbeat (${path}.heartbeatVisibility already set).`);
		delete entry.heartbeat;
	};
	const defaults = isRecord(channels.defaults) ? channels.defaults : null;
	if (defaults) migrateEntry(defaults, "channels.defaults");
	for (const [channelId, value] of Object.entries(channels)) {
		if (!channelId.trim() || isChannelConfigMetadataKey(channelId) || !isRecord(value)) continue;
		const preserveEmptyPluginBlock = channelId === "feishu";
		migrateEntry(value, `channels.${channelId}`, preserveEmptyPluginBlock);
		const accounts = isRecord(value.accounts) ? value.accounts : null;
		if (!accounts) continue;
		for (const [accountId, account] of Object.entries(accounts)) if (isRecord(account)) migrateEntry(account, `channels.${channelId}.accounts.${accountId}`, preserveEmptyPluginBlock);
	}
}
function resolveBundledChannelCompatibilityNormalizer(channelId) {
	if (isPluginDoctorMigrationDeferred(channelId)) return;
	const contractNormalizer = loadBundledChannelDoctorContractApi(channelId)?.normalizeCompatibilityConfig;
	if (typeof contractNormalizer === "function") return contractNormalizer;
	return getBootstrapChannelPlugin(channelId)?.doctor?.normalizeCompatibilityConfig;
}
function collectPluginDoctorCompatibilityIds(params) {
	return [.../* @__PURE__ */ new Set([...params.unresolvedChannelIds, ...collectDoctorConfigRepairPluginIds(params.raw)])].toSorted();
}
/** Apply bundled and plugin channel compatibility migrations to a legacy config object. */
function applyChannelDoctorCompatibilityMigrations(cfg, options) {
	let nextCfg = cfg;
	const loadPaths = nextCfg.plugins?.load?.paths ?? [];
	if (loadPaths.length > 0) {
		const warning = findUninspectedPluginDiagnostic(discoverConfiguredPluginLoadPaths({ loadPaths }).diagnostics);
		if (warning) {
			log.warn(warning.message);
			return {
				next: cfg,
				changes: []
			};
		}
	}
	const changes = [];
	const warnings = [];
	migrateHeartbeatVisibility(cfg, changes);
	const unresolvedChannelIds = [];
	for (const channelId of listDoctorConfiguredChannelIds(cfg, {
		configEntryPolicy: "raw",
		sort: "codepoint"
	})) {
		const normalizeCompatibilityConfig = resolveBundledChannelCompatibilityNormalizer(channelId);
		if (!normalizeCompatibilityConfig) {
			unresolvedChannelIds.push(channelId);
			continue;
		}
		const mutation = applyPluginDoctorCompatibilityMigration({
			pluginId: channelId,
			config: nextCfg,
			normalize: normalizeCompatibilityConfig
		});
		nextCfg = mutation.config;
		changes.push(...mutation.changes);
		warnings.push(...mutation.warnings ?? []);
	}
	const pluginIds = options?.pluginContracts === false ? [] : collectPluginDoctorCompatibilityIds({
		raw: cfg,
		unresolvedChannelIds
	});
	if (pluginIds.length > 0) {
		const compat = applyPluginDoctorCompatibilityMigrations(nextCfg, {
			config: cfg,
			pluginIds
		});
		nextCfg = compat.config;
		changes.push(...compat.changes);
		warnings.push(...compat.warnings ?? []);
	}
	return {
		next: nextCfg,
		changes,
		...warnings.length ? { warnings } : {}
	};
}
//#endregion
//#region src/commands/doctor/shared/legacy-config-compat.ts
const require = createRequire(import.meta.url);
function loadBindingRepair() {
	const source = isPluginSourceModulePath(fileURLToPath(import.meta.url));
	const modulePath = fileURLToPath(new URL(source ? "./legacy-config-binding-repair.runtime.ts" : "./legacy-config-binding-repair.runtime.js", import.meta.url));
	const native = source ? tryNativeRequireModule(modulePath, { aliasMap: preparePluginLoaderAliases({
		modulePath,
		moduleUrl: import.meta.url
	}).resolveAlias }) : void 0;
	return native?.ok ? native.moduleExport : source ? getCachedPluginModuleLoader({
		modulePath,
		importerUrl: import.meta.url,
		tryNative: false
	})(modulePath) : require(modulePath);
}
/** Apply all legacy doctor migrations to raw config, returning null when nothing changed. */
function applyLegacyDoctorMigrations(raw, options) {
	if (!raw || typeof raw !== "object") return {
		next: null,
		changes: []
	};
	const original = raw;
	const next = cloneConfigWithResolutionFacts(original);
	const changes = [];
	for (const migration of LEGACY_CONFIG_MIGRATIONS) migration.apply(next, changes, options.context);
	const compat = applyChannelDoctorCompatibilityMigrations(next, { pluginContracts: options.pluginContracts !== false });
	changes.push(...compat.changes);
	const ownership = options.pluginContracts !== false && resolveChannelAccountBindingRepairInput(compat.next) ? loadBindingRepair().repairUnownedChannelAccountBindings({
		config: compat.next,
		sourceConfigBeforeMigrations: options.sourceConfigBeforeMigrations
	}) : {
		config: compat.next,
		changes: []
	};
	changes.push(...ownership.changes);
	const warnings = [
		...compat.warnings ?? [],
		...ownership.warnings ?? [],
		...collectToolPolicyConflictWarnings(ownership.config)
	];
	return {
		next: changes.length > 0 ? inheritLegacyDefaultAgentId(original, ownership.config) : null,
		changes,
		...warnings.length ? { warnings } : {}
	};
}
//#endregion
//#region src/commands/doctor/shared/legacy-config-migrate.ts
/** Apply legacy migrations and validate the resulting OpenClaw config shape when possible. */
function migrateLegacyConfig(raw, options) {
	const { context } = options;
	const { next, changes, warnings } = applyLegacyDoctorMigrations(raw, options);
	const diagnostics = {
		changes,
		...warnings?.length ? { warnings } : {}
	};
	if (!next) return {
		config: null,
		...diagnostics
	};
	const resolvedCandidate = context ? applyLegacyDoctorMigrations(context.resolvedRaw, options).next ?? context.resolvedRaw : next;
	const validated = validateConfigObjectRawWithPlugins(resolvedCandidate, { deferredPluginMigrations: getDeferredPluginMigrationConfigFacts(context?.resolvedRaw ?? raw) });
	if (!validated.ok) {
		changes.push("Migration applied; other validation issues remain — run doctor to review.");
		return {
			config: next,
			...diagnostics,
			partiallyValid: true
		};
	}
	return {
		config: validated.config,
		sourceConfig: next,
		...diagnostics
	};
}
//#endregion
//#region src/commands/doctor/shared/config-flow-steps.ts
/** Apply legacy config migrations and update preview/fix state for doctor config flow. */
function applyLegacyCompatibilityStep(params) {
	if (params.snapshot.legacyIssues.length === 0) return {
		state: params.state,
		issueLines: [],
		changeLines: []
	};
	const issueLines = formatConfigIssueLines(params.snapshot.legacyIssues, "-");
	const otelOwnership = classifyOtelGrpcMigrationOwnership({
		snapshot: params.snapshot,
		authoredConfig: params.snapshot.parsed,
		resolvedConfig: params.snapshot.sourceConfig
	});
	if (otelOwnership?.kind === "manual") {
		const otelPath = "diagnostics.otel.protocol";
		const targets = otelOwnership.targetPaths.length > 0 ? ` Inspect these candidate source files and remove or replace ${otelPath} = "grpc" from every definition: ${otelOwnership.targetPaths.join(", ")}.` : ` Remove or replace ${otelPath} = "grpc" in the owning $include directive or included file.`;
		return {
			state: params.state,
			issueLines: [...issueLines, `- ${otelPath}: Doctor cannot safely rewrite this $include ownership.${targets} No config files were changed.`],
			changeLines: [],
			blocksWrite: true
		};
	}
	const hasAuthoredIncludes = containsAuthoredInclude(params.snapshot.parsed);
	const { config: migrated, sourceConfig: migratedSource, changes, warnings, partiallyValid } = migrateLegacyConfig(params.snapshot.sourceConfig, {
		sourceConfigBeforeMigrations: params.snapshot.sourceConfigBeforeMigrations,
		context: {
			authoredRaw: params.snapshot.parsed,
			resolvedRaw: params.snapshot.sourceConfig
		}
	});
	const migrationCandidate = migratedSource ?? migrated;
	const hasLegacyChanges = changes.length > 0 || !isDeepStrictEqual(params.snapshot.sourceConfigBeforeMigrations ?? (hasAuthoredIncludes ? params.snapshot.sourceConfig : params.snapshot.parsed), params.snapshot.sourceConfig);
	return {
		state: {
			...params.state,
			...migrationCandidate ? {
				cfg: migrationCandidate,
				candidate: migrationCandidate
			} : {},
			pendingChanges: params.state.pendingChanges || hasLegacyChanges,
			fixHints: params.shouldRepair || !hasLegacyChanges ? params.state.fixHints : [...params.state.fixHints, `Run "${params.doctorFixCommand}" to ${partiallyValid ? "finish fixing" : "migrate"} legacy config keys.`]
		},
		issueLines: [...issueLines, ...warnings ?? []],
		changeLines: changes,
		partiallyValid: partiallyValid === true ? true : void 0
	};
}
/** Strip unknown config keys while preserving active auth profile settings. */
function applyUnknownConfigKeyStep(params) {
	const unknown = stripUnknownConfigKeys(params.state.candidate);
	if (unknown.removed.length === 0) return {
		state: params.state,
		removed: [],
		repairs: [],
		warnings: []
	};
	const protectedAuth = protectActiveAuthProfileConfig({
		before: params.state.candidate,
		after: unknown.config
	});
	return {
		state: {
			cfg: params.shouldRepair ? protectedAuth.config : params.state.cfg,
			candidate: protectedAuth.config,
			pendingChanges: true,
			fixHints: params.shouldRepair ? params.state.fixHints : [...params.state.fixHints, `Run "${params.doctorFixCommand}" to remove these keys.`]
		},
		removed: unknown.removed,
		repairs: protectedAuth.repairs,
		warnings: protectedAuth.warnings
	};
}
/** Keep the matched planning read independent of later write receipts and environment changes. */
function prepareDoctorConfigReferenceSource(snapshot) {
	if (!snapshot.authoredConfig || !snapshot.sourceConfigBeforeMigrations) return;
	return {
		authored: structuredClone(snapshot.authoredConfig),
		resolved: cloneConfigWithResolutionFacts(snapshot.sourceConfigBeforeMigrations),
		parsed: structuredClone(snapshot.parsed)
	};
}
/** A moved template must still have its original read-time value after migration. */
function retainValuePreservingMigrationRefs(template, migratedResolved, source) {
	const values = /* @__PURE__ */ new Map();
	const ambiguous = /* @__PURE__ */ new Set();
	const collect = (authored, resolved) => {
		if (typeof authored === "string" && /\$\{[A-Z_][A-Z0-9_]*\}/.test(authored)) {
			if (values.has(authored) && !isDeepStrictEqual(values.get(authored), resolved)) ambiguous.add(authored);
			values.set(authored, resolved);
		} else if (authored && typeof authored === "object") for (const [key, value] of Object.entries(authored)) collect(value, resolved && typeof resolved === "object" ? resolved[key] : void 0);
	};
	collect(source.authored, source.resolved);
	const retain = (authored, resolved) => {
		if (typeof authored === "string" && /\$\{[A-Z_][A-Z0-9_]*\}/.test(authored)) return values.has(authored) && !ambiguous.has(authored) && isDeepStrictEqual(values.get(authored), resolved) ? authored : void 0;
		if (Array.isArray(authored)) return authored.map((value, index) => retain(value, Array.isArray(resolved) ? resolved[index] : void 0));
		if (authored && typeof authored === "object") return Object.fromEntries(Object.entries(authored).map(([key, value]) => [key, retain(value, resolved && typeof resolved === "object" ? resolved[key] : void 0)]));
		return authored;
	};
	return retain(template, migratedResolved);
}
/** Restore unchanged and moved references without substituting a later environment. */
function restoreDoctorConfigEnvRefs(candidate, source, explicitSetPaths, migrationOptions = {}) {
	if (!source) return candidate;
	const canonicalAuthored = projectAuthoredAgentRosterForWrite({
		rootAuthoredConfig: source.authored,
		sourceConfigBeforeMigrations: source.resolved
	});
	const canonicalResolved = projectAuthoredAgentRosterForWrite({
		rootAuthoredConfig: source.resolved,
		sourceConfigBeforeMigrations: source.resolved
	});
	const unchanged = restoreEnvVarRefsFromResolved(candidate, canonicalAuthored, canonicalResolved, explicitSetPaths);
	const options = {
		sourceConfigBeforeMigrations: source.resolved,
		context: {
			authoredRaw: source.parsed,
			resolvedRaw: source.resolved
		}
	};
	const migratedAuthored = applyLegacyDoctorMigrations(canonicalAuthored, options);
	const migratedResolved = applyLegacyDoctorMigrations(canonicalResolved, options);
	const authoredView = migratedAuthored.next ?? canonicalAuthored;
	const resolvedView = migratedResolved.next ?? canonicalResolved;
	if (!isRecord(authoredView) || !isRecord(resolvedView)) throw new Error("Doctor reference migrations must preserve config object roots.");
	const migratedAuthoredConfig = coerceConfig(authoredView);
	const migratedResolvedConfig = coerceConfig(resolvedView);
	const referenceTemplate = createMergePatch(canonicalAuthored, migratedAuthoredConfig);
	const resolvedTemplate = createMergePatch(canonicalResolved, migratedResolvedConfig);
	const restored = restoreEnvVarRefsFromResolved(unchanged, retainValuePreservingMigrationRefs(referenceTemplate, resolvedTemplate, source), resolvedTemplate, explicitSetPaths);
	let movedAuthored = migratedAuthoredConfig;
	let movedResolved = migratedResolvedConfig;
	const pluginIdMigrations = new Map(Object.entries(migrationOptions.appliedPluginIdMigrations ?? {}));
	for (const [legacyId, owner] of source.installedPluginIdRecovery ?? []) pluginIdMigrations.set(legacyId, owner.pluginId);
	for (const [legacyId, pluginId] of pluginIdMigrations) {
		movedAuthored = migratePluginConfigId(movedAuthored, legacyId, pluginId);
		movedResolved = migratePluginConfigId(movedResolved, legacyId, pluginId);
	}
	const pluginReferences = createMergePatch(migratedAuthoredConfig.plugins?.entries ?? {}, movedAuthored.plugins?.entries ?? {});
	const pluginValues = createMergePatch(migratedResolvedConfig.plugins?.entries ?? {}, movedResolved.plugins?.entries ?? {});
	const recovered = restoreEnvVarRefsFromResolved(restored, { plugins: { entries: pluginReferences } }, { plugins: { entries: pluginValues } }, explicitSetPaths);
	if (!isRecord(recovered)) throw new Error("Doctor reference restoration must preserve the config object root.");
	const recoveredConfig = coerceConfig(recovered);
	setDeferredPluginMigrationConfigFacts(recoveredConfig, getDeferredPluginMigrationConfigFacts(candidate));
	return recoveredConfig;
}
//#endregion
export { migrateLegacyConfig as a, restoreDoctorConfigEnvRefs as i, applyUnknownConfigKeyStep as n, applyLegacyDoctorMigrations as o, prepareDoctorConfigReferenceSource as r, applyChannelDoctorCompatibilityMigrations as s, applyLegacyCompatibilityStep as t };
