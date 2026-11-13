import { a as isPrereleaseSemverVersion } from "./npm-registry-spec-CwucyVOH.mjs";
import { t as PLUGIN_INSTALL_ERROR_CODE } from "./install-types-auyGAGw8.mjs";
import { c as resolveNpmSpecMetadata, r as loadNpmPackageVersions } from "./install-source-utils-Bx7Wt1L7.mjs";
import { h as validateOpenClawPackageInstallCompatibility } from "./install-shared-CIfCbvAU.mjs";
import { t as comparePackageUpdateVersions } from "./package-update-utils-BiLDeudr.mjs";
//#region src/plugins/install-npm-metadata.ts
function isNpmPackageNotFoundMessage(error) {
	const normalized = error.trim();
	if (normalized.startsWith("Package not found on npm:")) return true;
	return /E404|404 not found|not in this registry/i.test(normalized);
}
async function resolveTrustedOfficialPrereleaseResolution(params) {
	if (!params.spec.name.startsWith("@openclaw/")) return null;
	const semverVersions = await loadNpmPackageVersions({
		packageName: params.spec.name,
		timeoutMs: params.timeoutMs,
		signal: params.signal,
		killProcessTree: params.killProcessTree
	});
	if (!semverVersions) return null;
	const stableVersion = semverVersions.filter((value) => !isPrereleaseSemverVersion(value)).toSorted(comparePackageUpdateVersions).at(-1);
	let version = stableVersion;
	if (!stableVersion) {
		const prereleaseVersion = semverVersions.filter(isPrereleaseSemverVersion).toSorted(comparePackageUpdateVersions).at(-1);
		if (!prereleaseVersion || !semverVersions.every(isPrereleaseSemverVersion)) return null;
		if (prereleaseVersion === params.resolvedPrereleaseVersion) {
			params.logger?.warn?.(`Resolved ${params.spec.raw} to prerelease version ${params.resolvedPrereleaseVersion}; allowing it because this trusted official OpenClaw package has no stable npm versions yet.`);
			return { kind: "allow-prerelease-only" };
		}
		version = prereleaseVersion;
	}
	const spec = `${params.spec.name}@${version}`;
	const metadataResult = await resolveNpmSpecMetadata({
		spec,
		timeoutMs: params.timeoutMs,
		signal: params.signal
	});
	if (!metadataResult.ok) return null;
	params.logger?.warn?.(stableVersion ? `Resolved ${params.spec.raw} to prerelease version ${params.resolvedPrereleaseVersion}; falling back to stable ${spec} for this trusted official OpenClaw install.` : `Resolved ${params.spec.raw} to prerelease version ${params.resolvedPrereleaseVersion}; using newest prerelease ${spec} because this trusted official OpenClaw package has no stable npm versions yet.`);
	return {
		kind: stableVersion ? "stable" : "prerelease-only",
		resolution: metadataResult.metadata
	};
}
function shouldResolveLatestCompatibleNpmVersion(spec) {
	return spec.selectorKind === "none" || spec.selectorKind === "tag" && (spec.selector ?? "").toLowerCase() === "latest";
}
function shouldResolveCompatiblePrereleaseNpmVersion(params) {
	if (!isPrereleaseSemverVersion(params.currentVersion)) return false;
	if (params.spec.selectorKind === "none") return true;
	return params.spec.selectorKind === "tag" && (params.spec.selector ?? "").toLowerCase() !== "latest";
}
function resolvePrereleaseChannel(version) {
	if (!isPrereleaseSemverVersion(version)) return null;
	return /^\s*v?\d+\.\d+\.\d+-([0-9A-Za-z]+)(?:[.-]|$)/.exec(version)?.[1]?.toLowerCase() ?? null;
}
function canResolveAroundCompatibilityError(error) {
	return error.code === PLUGIN_INSTALL_ERROR_CODE.INCOMPATIBLE_HOST_VERSION || error.code === PLUGIN_INSTALL_ERROR_CODE.INCOMPATIBLE_PLUGIN_API;
}
function validateNpmResolutionCompatibility(params) {
	return validateOpenClawPackageInstallCompatibility({
		runtime: params.runtime,
		pluginId: params.expectedPluginId ?? params.resolution.name ?? params.parsedSpec.name,
		packageMetadata: params.resolution.packageOpenClaw
	});
}
async function resolveLatestCompatibleNpmResolution(params) {
	if (!params.currentResolution.version) return null;
	const currentVersion = params.currentResolution.version;
	const allowPrereleaseCandidates = shouldResolveCompatiblePrereleaseNpmVersion({
		spec: params.parsedSpec,
		currentVersion
	});
	const prereleaseChannel = allowPrereleaseCandidates ? resolvePrereleaseChannel(currentVersion) : null;
	if (!shouldResolveLatestCompatibleNpmVersion(params.parsedSpec) && !allowPrereleaseCandidates) return null;
	const versions = await loadNpmPackageVersions({
		packageName: params.parsedSpec.name,
		timeoutMs: params.timeoutMs,
		signal: params.signal,
		killProcessTree: true
	});
	if (!versions) return null;
	const candidates = versions.filter((version) => allowPrereleaseCandidates ? resolvePrereleaseChannel(version) === prereleaseChannel : !isPrereleaseSemverVersion(version)).filter((version) => comparePackageUpdateVersions(version, currentVersion) < 0).toSorted(comparePackageUpdateVersions).toReversed();
	for (const version of candidates) {
		const spec = `${params.parsedSpec.name}@${version}`;
		const metadataResult = await resolveNpmSpecMetadata({
			spec,
			timeoutMs: params.timeoutMs,
			signal: params.signal
		});
		if (!metadataResult.ok) {
			params.logger.warn?.(`Could not inspect ${spec} while looking for a compatible plugin version: ${metadataResult.error}`);
			continue;
		}
		if (!validateNpmResolutionCompatibility({
			runtime: params.runtime,
			parsedSpec: params.parsedSpec,
			expectedPluginId: params.expectedPluginId,
			resolution: metadataResult.metadata
		})) {
			params.logger.warn?.(`Resolved ${params.parsedSpec.raw} to ${params.currentResolution.resolvedSpec ?? currentVersion}, but that version is incompatible with this OpenClaw runtime; using newest compatible ${metadataResult.metadata.resolvedSpec ?? spec}.`);
			return metadataResult.metadata;
		}
	}
	return null;
}
//#endregion
export { validateNpmResolutionCompatibility as a, resolveTrustedOfficialPrereleaseResolution as i, isNpmPackageNotFoundMessage as n, resolveLatestCompatibleNpmResolution as r, canResolveAroundCompatibilityError as t };
