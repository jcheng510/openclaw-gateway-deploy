import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { o as resolveCompatibilityHostVersion } from "./version-BMuSsYfE.mjs";
import { i as isPrereleaseResolutionAllowed, o as parseRegistryNpmSpec, r as isExactSemverVersion, t as compareOpenClawReleaseVersions } from "./npm-registry-spec-CwucyVOH.mjs";
import { n as satisfiesPluginApiRange, t as resolvePackagePluginApiRange } from "./package-compat-qQaLgNbY.mjs";
import { o as unscopedPackageName } from "./install-safe-path-CvmSx2MJ.mjs";
import { D as resolveClawHubInstallSpecsForUpdateChannel, O as resolveDefaultNpmSpec, k as resolveNpmInstallSpecsForUpdateChannel, p as resolveOfficialExternalPluginInstall, r as getOfficialExternalPluginCatalogEntry } from "./official-external-plugin-catalog-VarBz9zD.mjs";
import { t as parseClawHubPluginSpec } from "./clawhub-spec-BL1Xg7rK.mjs";
import { c as resolveTrustedSourceLinkedOfficialNpmSpec, s as resolveTrustedSourceLinkedOfficialNpmInstall } from "./official-external-install-records-G8hCCz_F.mjs";
import { t as checkMinHostVersion } from "./min-host-version-CLkL1CSt.mjs";
import { c as resolveNpmSpecMetadata } from "./install-source-utils-Bx7Wt1L7.mjs";
import { n as expectedIntegrityForUpdate, t as comparePackageUpdateVersions } from "./package-update-utils-BiLDeudr.mjs";
import { i as resolveTrustedOfficialPrereleaseResolution } from "./install-npm-metadata-ciLHCGIk.mjs";
import { n as fetchClawHubPackageDetail, s as resolveLatestVersionFromPackage } from "./clawhub-packages-BteTFvQs.mjs";
//#region src/plugins/update-source.ts
function isPluginInstallRecordUpdateSource(record) {
	return record?.source === "npm" || record?.source === "marketplace" || record?.source === "clawhub" || record?.source === "git";
}
/** Return whether update identity compatibility can migrate an unscoped install key. */
function pluginInstallRecordMayMigrateConfigId(params) {
	if (!isPluginInstallRecordUpdateSource(params.record)) return false;
	if (params.record?.source !== "npm") return !params.pluginId.includes("/");
	const packageName = resolveNpmSpecPackageName(params.specOverride ?? params.record.spec) ?? params.record.resolvedName ?? resolveNpmSpecPackageName(params.record.resolvedSpec);
	return packageName !== void 0 && packageName !== params.pluginId && unscopedPackageName(packageName) === params.pluginId || resolveTrustedSourceLinkedOfficialNpmInstall({
		pluginId: params.pluginId,
		record: params.record
	})?.replacementPluginId !== void 0;
}
function shouldSkipUnchangedNpmInstall(params) {
	if (!params.currentVersion || params.currentVersion !== params.metadata.version) return false;
	if (!params.record.resolvedName || !params.record.resolvedSpec || !params.record.resolvedVersion) return false;
	return (!params.metadata.integrity || params.record.integrity === params.metadata.integrity) && (!params.metadata.shasum || params.record.shasum === params.metadata.shasum) && params.record.resolvedName === params.metadata.name && params.record.resolvedSpec === params.metadata.resolvedSpec && params.record.resolvedVersion === params.metadata.version;
}
function shouldBypassTrustedOfficialUnchangedNpmCheck(params) {
	if (!params.trustedSourceLinkedOfficialInstall || !params.metadata.version) return false;
	const parsedSpec = parseRegistryNpmSpec(params.spec);
	return Boolean(parsedSpec && !isPrereleaseResolutionAllowed({
		spec: parsedSpec,
		resolvedVersion: params.metadata.version
	}));
}
function expectedIntegrityForNpmUpdate(params) {
	if (params.record.source !== "npm") return;
	if (params.effectiveSpec === params.record.spec) return expectedIntegrityForUpdate(params.record.spec, params.record.integrity);
	if (!params.trustedSourceLinkedOfficialInstall || !params.metadata) return;
	const metadataName = params.metadata.name ?? resolveNpmSpecPackageName(params.effectiveSpec);
	const recordName = params.record.resolvedName ?? resolveNpmSpecPackageName(params.record.resolvedSpec) ?? resolveNpmSpecPackageName(params.record.spec);
	if (!metadataName || metadataName !== recordName) return;
	if (!params.metadata.version || params.metadata.version !== params.record.resolvedVersion) return;
	return expectedIntegrityForUpdate(params.record.resolvedSpec ?? params.record.spec, params.record.integrity);
}
async function resolveNewerExactPinnedNpmDefaultLine(params) {
	if (!params.currentVersion || !params.probeNpmVersion || !params.recordedSpec) return;
	const packageName = resolveNpmSpecPackageName(params.recordedSpec);
	const exactVersion = resolveExactNpmSpecVersion(params.recordedSpec);
	const probeNpmVersion = normalizeExactSemverVersion(params.probeNpmVersion);
	if (!packageName || !exactVersion || probeNpmVersion !== exactVersion) return;
	const specs = await resolveNpmInstallSpecsForUpdateChannel({
		spec: packageName,
		updateChannel: params.updateChannel,
		timeoutMs: params.timeoutMs
	}).catch(() => void 0);
	if (!specs) return;
	const registryLine = specs.channelTag ?? "latest";
	const metadataResult = specs.npmResolution ? {
		ok: true,
		metadata: specs.npmResolution
	} : await resolveNpmSpecMetadata({
		spec: specs.installSpec,
		timeoutMs: params.timeoutMs
	}).catch(() => void 0);
	if (!metadataResult?.ok || metadataResult.metadata.name !== packageName || !metadataResult.metadata.version) return;
	return comparePackageUpdateVersions(metadataResult.metadata.version, params.currentVersion) > 0 ? {
		packageName,
		registryLine,
		version: metadataResult.metadata.version
	} : void 0;
}
async function resolveNewerExactPinnedClawHubDefaultLine(params) {
	if (!params.currentVersion || !params.probeClawHubVersion || !params.recordedSpec) return;
	const parsed = parseClawHubPluginSpec(params.recordedSpec);
	const exactVersion = normalizeExactSemverVersion(parsed?.version);
	const probeClawHubVersion = normalizeExactSemverVersion(params.probeClawHubVersion);
	if (!parsed?.name || !parsed.version || !exactVersion || !probeClawHubVersion || probeClawHubVersion !== exactVersion) return;
	const detail = await fetchClawHubPackageDetail({
		name: parsed.name,
		baseUrl: params.baseUrl,
		timeoutMs: params.timeoutMs
	}).catch(() => void 0);
	if (!detail?.package || detail.package.name !== parsed.name) return;
	if (detail.package.tags?.[parsed.version] != null) return;
	const betaVersion = detail.package.tags?.beta;
	const registryLine = params.updateChannel === "beta" && betaVersion ? "beta" : "latest";
	const version = registryLine === "beta" ? betaVersion : resolveLatestVersionFromPackage(detail);
	if (!version || comparePackageUpdateVersions(version, params.currentVersion) <= 0) return;
	return {
		packageName: parsed.name,
		registryLine,
		version
	};
}
async function resolveTrustedOfficialPrereleaseFallbackMetadataForUpdate(params) {
	const parsedSpec = parseRegistryNpmSpec(params.spec);
	if (!parsedSpec || !parsedSpec.name.startsWith("@openclaw/") || !params.metadata.version || isPrereleaseResolutionAllowed({
		spec: parsedSpec,
		resolvedVersion: params.metadata.version
	})) return;
	const fallback = await resolveTrustedOfficialPrereleaseResolution({
		spec: parsedSpec,
		resolvedPrereleaseVersion: params.metadata.version,
		timeoutMs: params.timeoutMs
	});
	if (!fallback) return;
	return fallback.kind === "allow-prerelease-only" ? {
		kind: "prerelease-only",
		metadata: params.metadata
	} : {
		kind: fallback.kind,
		metadata: fallback.resolution
	};
}
function isNpmMetadataCompatibleWithCurrentHost(metadata, options = {}) {
	const hostVersion = options.hostVersion ?? resolveCompatibilityHostVersion();
	const installMetadata = metadata.packageOpenClaw?.install;
	if (!checkMinHostVersion({
		currentVersion: hostVersion,
		minHostVersion: isRecord(installMetadata) ? installMetadata.minHostVersion : void 0,
		allowLegacyBareSemver: options.allowLegacyBareSemver
	}).ok) return false;
	const pluginApiRangeCheck = resolvePackagePluginApiRange(metadata.packageOpenClaw);
	if (!pluginApiRangeCheck.ok) return false;
	const pluginApiRange = pluginApiRangeCheck.range;
	if (!pluginApiRange) return true;
	return satisfiesPluginApiRange(hostVersion, pluginApiRange);
}
function formatBetaChannelFallbackOutcomeSuffix(params) {
	if (!params.fallbackSpec) return "";
	const betaTarget = params.fallbackLabel ?? "beta target";
	return ` (warning: beta channel fallback ${params.verb} ${params.fallbackSpec} because ${betaTarget} could not be used).`;
}
function resolveNpmSpecPackageName(spec) {
	return spec ? parseRegistryNpmSpec(spec)?.name : void 0;
}
function resolveExactNpmSpecVersion(spec) {
	const parsed = spec ? parseRegistryNpmSpec(spec) : null;
	return parsed?.selectorKind === "exact-version" ? normalizeExactSemverVersion(parsed.selector) : void 0;
}
function normalizeExactSemverVersion(value) {
	if (!value) return;
	const trimmed = value.trim();
	if (!isExactSemverVersion(trimmed)) return;
	return trimmed.startsWith("v") ? trimmed.slice(1) : trimmed;
}
function isTrustedSourceLinkedOfficialNpmUpdate(params) {
	const officialPackageName = resolveNpmSpecPackageName(resolveTrustedSourceLinkedOfficialNpmSpec(params));
	const requestedPackageName = resolveNpmSpecPackageName(params.spec);
	return Boolean(officialPackageName && requestedPackageName === officialPackageName);
}
function isTrustedSourceLinkedOfficialBridgeNpmInstall(params) {
	const entry = getOfficialExternalPluginCatalogEntry(params.targetPluginId);
	if (!entry) return false;
	const officialPackageName = resolveNpmSpecPackageName(resolveOfficialExternalPluginInstall(entry)?.npmSpec);
	const requestedPackageName = resolveNpmSpecPackageName(params.npmSpec);
	return Boolean(officialPackageName && requestedPackageName === officialPackageName);
}
/** Older managed releases resume the catalog's update policy after a successful update. */
function resolveUnpinnedOfficialReleaseSpec(params) {
	const recorded = params.spec ? parseRegistryNpmSpec(params.spec) : null;
	const official = params.officialSpec ? resolveDefaultNpmSpec(params.officialSpec) : null;
	const pinnedVersion = normalizeExactSemverVersion(recorded?.selector);
	const coreVersion = normalizeExactSemverVersion(params.coreVersion);
	if (recorded?.selectorKind !== "exact-version" || !pinnedVersion || !official?.name.startsWith("@openclaw/") || recorded.name !== official.name || !coreVersion) return;
	const order = compareOpenClawReleaseVersions(pinnedVersion, coreVersion);
	return order !== null && order <= 0 ? official.raw : void 0;
}
/** Apply selector and release-pin policy before automatic cohort targets. */
function resolveNpmUpdateTarget(params) {
	const official = params.trustedOfficialInstall;
	const specOverride = params.specOverride ?? (official?.replacementPluginId || official?.replaceNpmPackage ? official.npmSpec : void 0) ?? resolveUnpinnedOfficialReleaseSpec({
		spec: params.record.spec,
		officialSpec: official?.npmSpec,
		coreVersion: resolveExactNpmSpecVersion(params.installSpecOverride) ?? params.coreVersion
	});
	const spec = specOverride ?? params.record.spec ?? (params.syncOfficialPluginInstalls ? official?.npmSpec : void 0);
	return {
		specOverride,
		target: spec ? {
			spec,
			installSpecOverride: !params.specOverride && resolveDefaultNpmSpec(spec) ? params.installSpecOverride : void 0,
			updateChannel: params.updateChannel,
			officialPackageName: resolveNpmSpecPackageName(official?.npmSpec),
			coreVersion: params.coreVersion,
			versionBoundToCore: params.versionBoundToCore,
			timeoutMs: params.timeoutMs
		} : void 0
	};
}
function resolveClawHubUpdateSpecs(params) {
	const clawhubPackage = params.record.clawhubPackage ?? parseClawHubPluginSpec(params.record.spec ?? "")?.name ?? parseClawHubPluginSpec(params.record.resolvedSpec ?? "")?.name;
	if (!params.officialSpecOverride && !clawhubPackage) return {};
	const recordSpec = params.record.spec ?? params.officialSpecOverride ?? params.record.resolvedSpec ?? `clawhub:${clawhubPackage}`;
	const recorded = parseClawHubPluginSpec(recordSpec);
	const official = params.officialSpec ? parseClawHubPluginSpec(params.officialSpec) : null;
	const unpinnedSpec = recorded && official ? resolveUnpinnedOfficialReleaseSpec({
		spec: `${recorded.name}${recorded.version ? `@${recorded.version}` : ""}`,
		officialSpec: `${official.name}${official.version ? `@${official.version}` : ""}`,
		coreVersion: params.coreVersion
	}) : void 0;
	return resolveClawHubInstallSpecsForUpdateChannel({
		spec: unpinnedSpec ? `clawhub:${unpinnedSpec}` : recordSpec,
		updateChannel: params.updateChannel,
		officialPackageName: params.officialPackageName,
		coreVersion: params.coreVersion,
		versionBoundToCore: params.versionBoundToCore
	});
}
/** Identity matching permits id/path cleanup, never an implicit registry-source switch. */
function isBridgeRegistryInstall(bridge, record) {
	if (record.source === "npm") {
		const packageName = resolveNpmSpecPackageName(bridge.npmSpec);
		const recordedName = record.resolvedName ?? resolveNpmSpecPackageName(record.spec) ?? resolveNpmSpecPackageName(record.resolvedSpec);
		return Boolean(packageName && packageName === recordedName);
	}
	const packageName = parseClawHubPluginSpec(bridge.clawhubSpec ?? "")?.name;
	const recordedName = record.clawhubPackage ?? parseClawHubPluginSpec(record.spec ?? "")?.name;
	return record.source === "clawhub" && Boolean(packageName && packageName === recordedName);
}
//#endregion
export { shouldSkipUnchangedNpmInstall as _, isPluginInstallRecordUpdateSource as a, pluginInstallRecordMayMigrateConfigId as c, resolveNewerExactPinnedClawHubDefaultLine as d, resolveNewerExactPinnedNpmDefaultLine as f, shouldBypassTrustedOfficialUnchangedNpmCheck as g, resolveTrustedOfficialPrereleaseFallbackMetadataForUpdate as h, isNpmMetadataCompatibleWithCurrentHost as i, resolveClawHubUpdateSpecs as l, resolveNpmUpdateTarget as m, formatBetaChannelFallbackOutcomeSuffix as n, isTrustedSourceLinkedOfficialBridgeNpmInstall as o, resolveNpmSpecPackageName as p, isBridgeRegistryInstall as r, isTrustedSourceLinkedOfficialNpmUpdate as s, expectedIntegrityForNpmUpdate as t, resolveExactNpmSpecVersion as u };
