import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import "./utils-DUAwk2p5.mjs";
import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { o as resolveCompatibilityHostVersion } from "./version-BMuSsYfE.mjs";
import { c as resolveOpenClawReleaseCohortVersion, o as parseRegistryNpmSpec } from "./npm-registry-spec-CwucyVOH.mjs";
import { f as shouldDeferConfiguredPluginInstallRepair } from "./update-phase-Ibh5Kd_i.mjs";
import { l as normalizePluginsConfig, u as resolveEffectiveEnableState } from "./config-state-D-KaEbbt.mjs";
import { a as resolveDefaultPluginExtensionsDir, c as resolvePluginInstallDir, d as resolvePluginNpmPackageDir, s as resolveDefaultPluginNpmDir } from "./install-paths-BylxcuP5.mjs";
import { A as resolvePluginInstallSources, l as listOfficialExternalPluginCatalogEntries, p as resolveOfficialExternalPluginInstall } from "./official-external-plugin-catalog-VarBz9zD.mjs";
import { t as parseClawHubPluginSpec } from "./clawhub-spec-BL1Xg7rK.mjs";
import { g as resolveOfficialExternalPluginId } from "./official-external-plugin-catalog-source-CqaCy6HX.mjs";
import { s as resolveTrustedSourceLinkedOfficialNpmInstall } from "./official-external-install-records-G8hCCz_F.mjs";
import { n as expectedIntegrityForUpdate, r as isPackageVersionDowngrade } from "./package-update-utils-BiLDeudr.mjs";
import { n as isPayloadMissing } from "./payload-verification-CUA2TEpg.mjs";
import { a as collectConfiguredChannelIds, i as collectBlockedPluginIds, o as collectConfiguredPluginIds, r as resolveConfiguredPluginInstallContext, t as collectDownloadableInstallCandidates } from "./missing-configured-plugin-install.candidates-DsTe3EY0.mjs";
import { m as resolveNpmUpdateTarget } from "./update-source-D3xJKjIW.mjs";
import { r as resolveOfficialPluginCohortNpmSpecs, t as detectPluginVersionDrift } from "./plugin-version-drift-m-3EN6Uj.mjs";
import path from "node:path";
//#region src/commands/doctor/shared/missing-configured-plugin-install.records.ts
function forceNpmInstallRecordRepair(record) {
	if (record.source !== "npm") return record;
	const next = { ...record };
	delete next.resolvedSpec;
	delete next.resolvedVersion;
	return next;
}
function installPathsEqual(left, right) {
	return path.resolve(left) === path.resolve(right);
}
function resolveLegacyNpmPackageInstallPath(params) {
	return path.join(params.npmRoot, "node_modules", ...params.packageName.split("/"));
}
function collectCandidateOfficialPackageNames(candidate) {
	const names = /* @__PURE__ */ new Set();
	const npmName = candidate.npmSpec ? parseRegistryNpmSpec(candidate.npmSpec)?.name : void 0;
	const clawhubName = candidate.clawhubSpec ? parseClawHubPluginSpec(candidate.clawhubSpec)?.name : void 0;
	if (npmName) names.add(npmName);
	if (clawhubName) names.add(clawhubName);
	return names;
}
function collectInstalledRecordPackageNames(record) {
	const names = /* @__PURE__ */ new Set();
	if (record.source === "npm") {
		const specName = record.spec ? parseRegistryNpmSpec(record.spec)?.name : void 0;
		const resolvedSpecName = record.resolvedSpec ? parseRegistryNpmSpec(record.resolvedSpec)?.name : void 0;
		for (const value of [
			record.resolvedName,
			specName,
			resolvedSpecName
		]) if (value) names.add(value);
	}
	if (record.source === "clawhub") {
		const specName = record.spec ? parseClawHubPluginSpec(record.spec)?.name : void 0;
		for (const value of [record.clawhubPackage, specName]) if (value) names.add(value);
	}
	return names;
}
function isTrustedOfficialInstallRecordForCandidate(params) {
	const record = params.record;
	if (!record) return false;
	if (record.source !== "npm" && record.source !== "clawhub") return false;
	if (record.source === "clawhub" && record.clawhubChannel !== "official") return false;
	const candidatePackageNames = collectCandidateOfficialPackageNames(params.candidate);
	if (candidatePackageNames.size === 0) return false;
	for (const installedPackageName of collectInstalledRecordPackageNames(record)) if (candidatePackageNames.has(installedPackageName)) return true;
	return false;
}
function resolveSafeBrokenOfficialInstallRemovalPath(params) {
	const installPath = params.record?.installPath?.trim();
	if (!installPath) return null;
	const resolvedInstallPath = resolveUserPath(installPath, params.env);
	try {
		const extensionsDir = resolveDefaultPluginExtensionsDir(params.env);
		if (installPathsEqual(resolvedInstallPath, resolvePluginInstallDir(params.pluginId, extensionsDir))) return resolvedInstallPath;
	} catch {}
	const parsedNpmSpec = params.candidate.npmSpec ? parseRegistryNpmSpec(params.candidate.npmSpec) : null;
	if (!parsedNpmSpec?.name) return null;
	const npmRoot = resolveDefaultPluginNpmDir(params.env);
	return [resolvePluginNpmPackageDir({
		packageName: parsedNpmSpec.name,
		npmDir: npmRoot
	}), resolveLegacyNpmPackageInstallPath({
		packageName: parsedNpmSpec.name,
		npmRoot
	})].some((expectedPath) => installPathsEqual(resolvedInstallPath, expectedPath)) ? resolvedInstallPath : null;
}
function recordMatchesBundledPackage(record, bundled) {
	const packageName = bundled.packageName?.trim() || bundled.name?.trim();
	return Boolean(packageName && collectInstalledRecordPackageNames(record).has(packageName));
}
//#endregion
//#region src/commands/doctor/shared/missing-configured-plugin-install.targets.ts
function resolveConfiguredPluginRepairVersions(params) {
	const { env } = params;
	const { records, updateChannel, operatorManagedPluginIds, bundledPluginsById, officialReplacementPluginIds } = params.context;
	const coreVersion = resolveCompatibilityHostVersion(env);
	const cohortSpecs = resolveOfficialPluginCohortNpmSpecs({
		gatewayVersion: coreVersion,
		installRecords: records,
		config: params.cfg
	});
	return {
		coreVersion,
		cohortSpecs,
		newerRecordedPluginIds: new Set(updateChannel === "stable" || updateChannel === "beta" ? Object.keys(cohortSpecs).filter((pluginId) => {
			const version = records[pluginId]?.resolvedVersion ?? records[pluginId]?.version;
			return version && isPackageVersionDowngrade(resolveOpenClawReleaseCohortVersion(version), resolveOpenClawReleaseCohortVersion(coreVersion));
		}) : []),
		driftedPluginIds: new Set(params.repairVersionDrift && !shouldDeferConfiguredPluginInstallRepair(env) ? detectPluginVersionDrift({
			gatewayVersion: coreVersion,
			installRecords: records,
			config: params.cfg
		}).drifts.flatMap(({ pluginId }) => {
			const record = records[pluginId];
			if (!record || !cohortSpecs[pluginId] || operatorManagedPluginIds.has(pluginId) || bundledPluginsById.has(pluginId) || officialReplacementPluginIds.has(pluginId)) return [];
			if (resolveTrustedSourceLinkedOfficialNpmInstall({
				pluginId,
				record
			})?.replacementPluginId) {
				params.onWarning(`Plugin "${pluginId}" needs a package-id migration. Run ${formatCliCommand(`openclaw plugins update ${cohortSpecs[pluginId]}`, env)}.`, pluginId);
				return [];
			}
			return [pluginId];
		}) : [])
	};
}
function resolveRecordedInstallCandidate(params) {
	const record = params.record;
	if (!record && params.candidate.trustedSourceLinkedOfficialInstall) {
		const packageName = parseRegistryNpmSpec(params.candidate.npmSpec ?? "")?.name;
		if (packageName?.startsWith("@openclaw/") && listOfficialExternalPluginCatalogEntries().some((entry) => entry.source === "official" && entry.name === packageName && resolveOfficialExternalPluginId(entry) === params.candidate.pluginId && parseRegistryNpmSpec(resolveOfficialExternalPluginInstall(entry)?.npmSpec ?? "")?.name === packageName)) return {
			...params.candidate,
			versionBoundToOpenClaw: true
		};
	}
	const recordedSource = record?.source === "npm" || record?.source === "clawhub" ? record.source : void 0;
	const staleRuntimeRepair = params.repairReason === "stale-version-bound-runtime";
	const declaredSource = recordedSource ? resolvePluginInstallSources(params.candidate, recordedSource)[0] : void 0;
	const recordedSpec = staleRuntimeRepair ? declaredSource?.spec : record?.spec ?? declaredSource?.spec;
	return record && recordedSource ? {
		...params.candidate,
		defaultChoice: recordedSource,
		...recordedSource === "npm" ? {
			npmSpec: recordedSpec,
			clawhubSpec: void 0
		} : {
			clawhubSpec: recordedSpec,
			npmSpec: void 0
		},
		expectedIntegrity: staleRuntimeRepair ? declaredSource?.expectedIntegrity : expectedIntegrityForUpdate(record.spec, record.integrity),
		trustedSourceLinkedOfficialInstall: params.candidate.trustedSourceLinkedOfficialInstall && (!record.spec || (recordedSource === "npm" ? parseRegistryNpmSpec(record.spec)?.name === parseRegistryNpmSpec(params.candidate.npmSpec ?? "")?.name : parseClawHubPluginSpec(record.spec)?.name === parseClawHubPluginSpec(params.candidate.clawhubSpec ?? "")?.name))
	} : params.candidate;
}
/** Keep stale-runtime pin replacement behind the same repair admission as doctor. */
function resolveConfiguredPluginCandidateRepair(params) {
	const { candidate, context } = params;
	if (context.bundledPluginsById.has(candidate.pluginId)) return;
	const shouldReplaceBrokenOfficialInstall = context.officialReplacementPluginIds.has(candidate.pluginId);
	const record = params.records[candidate.pluginId];
	if (shouldReplaceBrokenOfficialInstall && (!candidate.trustedSourceLinkedOfficialInstall || !isTrustedOfficialInstallRecordForCandidate({
		record,
		candidate
	}))) return;
	const hasRecord = Object.hasOwn(params.records, candidate.pluginId);
	const hasUsableRecord = hasRecord && !isPayloadMissing(params.env, record?.installPath);
	if (!shouldReplaceBrokenOfficialInstall && (hasUsableRecord || context.knownIds.has(candidate.pluginId) && !hasRecord)) return;
	return {
		shouldReplaceBrokenOfficialInstall,
		...context.installedPluginIdsWithStaleVersionBoundRuntimePackages.has(candidate.pluginId) && !context.installedPluginIdsWithRepairablePackageDiagnostics.has(candidate.pluginId) && !context.configuredPluginIdsWithStaleDescriptors.has(candidate.pluginId) && hasUsableRecord ? { repairReason: "stale-version-bound-runtime" } : {}
	};
}
/** Metadata-only inventory for the same npm targets used by post-core sync and repair. */
async function collectConfiguredNpmPluginTargets(params) {
	const configuredPluginIds = collectConfiguredPluginIds(params.config, params.env);
	const configuredChannelIds = collectConfiguredChannelIds(params.config, params.env);
	if (configuredPluginIds.size === 0 && configuredChannelIds.size === 0) return [];
	const blockedPluginIds = collectBlockedPluginIds(params.config);
	const context = await resolveConfiguredPluginInstallContext({
		cfg: params.config,
		env: params.env,
		configuredPluginIds,
		configuredChannelIds,
		blockedPluginIds,
		baselineRecords: params.installRecords,
		coreVersion: params.targetVersion
	});
	const candidates = new Map(collectDownloadableInstallCandidates({
		cfg: params.config,
		env: params.env,
		configuredPluginIds,
		configuredChannelIds,
		configuredChannelOwnerPluginIds: context.configuredChannelOwnerPluginIds,
		blockedPluginIds,
		missingPluginIds: /* @__PURE__ */ new Set()
	}).map((candidate) => [candidate.pluginId, candidate]));
	const normalizedConfig = normalizePluginsConfig(params.config.plugins);
	const targets = [];
	const pluginIds = /* @__PURE__ */ new Set([
		...configuredPluginIds,
		...candidates.keys(),
		...[...context.configuredChannelOwnerPluginIds.values()].flatMap((ids) => Array.from(ids))
	]);
	for (const pluginId of pluginIds) {
		const record = context.records[pluginId];
		if (context.operatorManagedPluginIds.has(pluginId) || context.bundledPluginsById.has(pluginId) || record && (record.source !== "npm" || record.artifactKind || record.sourcePath) || !resolveEffectiveEnableState({
			id: pluginId,
			origin: "global",
			config: normalizedConfig,
			rootConfig: params.config
		}).enabled) continue;
		const candidate = candidates.get(pluginId);
		const repair = candidate && resolveConfiguredPluginCandidateRepair({
			candidate,
			records: context.records,
			env: params.env,
			context
		});
		if (candidate && repair) {
			const selected = resolveRecordedInstallCandidate({
				candidate,
				record,
				repairReason: repair.repairReason
			});
			const source = resolvePluginInstallSources(selected, record?.source === "npm" ? "npm" : void 0)[0];
			if (source?.source === "npm" && parseRegistryNpmSpec(source.spec)) targets.push({
				pluginId,
				spec: source.spec,
				updateChannel: params.channel,
				coreVersion: params.targetVersion,
				officialPackageName: selected.trustedSourceLinkedOfficialInstall ? parseRegistryNpmSpec(source.spec)?.name : void 0,
				versionBoundToCore: selected.versionBoundToOpenClaw
			});
		} else if (record?.source === "npm") {
			const { target } = resolveNpmUpdateTarget({
				record,
				trustedOfficialInstall: resolveTrustedSourceLinkedOfficialNpmInstall({
					pluginId,
					record
				}),
				syncOfficialPluginInstalls: true,
				updateChannel: params.channel,
				coreVersion: params.targetVersion,
				versionBoundToCore: candidate?.versionBoundToOpenClaw
			});
			if (target && parseRegistryNpmSpec(target.spec)) targets.push({
				pluginId,
				...target
			});
		}
	}
	return targets.toSorted((left, right) => left.pluginId.localeCompare(right.pluginId));
}
//#endregion
export { forceNpmInstallRecordRepair as a, resolveLegacyNpmPackageInstallPath as c, resolveRecordedInstallCandidate as i, resolveSafeBrokenOfficialInstallRemovalPath as l, resolveConfiguredPluginCandidateRepair as n, installPathsEqual as o, resolveConfiguredPluginRepairVersions as r, recordMatchesBundledPackage as s, collectConfiguredNpmPluginTargets as t };
