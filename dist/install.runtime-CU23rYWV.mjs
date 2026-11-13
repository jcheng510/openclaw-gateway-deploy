import { d as pathExists } from "./fs-safe-CHQXnCPk.mjs";
import { m as isPathInsideWithRealpath, p as isPathInside } from "./includes-Dj3t0m8d.mjs";
import { i as readJson } from "./json-files-Br8qKrAz.mjs";
import { i as isPrereleaseResolutionAllowed, l as validateRegistryNpmSpec, n as formatPrereleaseResolutionError, o as parseRegistryNpmSpec } from "./npm-registry-spec-CwucyVOH.mjs";
import { f as resolveArchiveKind } from "./archive-DqZZMnnW.mjs";
import { r as resolveTimedInstallModeOptions, t as resolveInstallModeOptions } from "./install-mode-options-HTpLEgtT.mjs";
import { a as packNpmSpecToArchive, l as withInstallWorkspace, o as resolveArchiveSourcePath } from "./install-source-utils-Bx7Wt1L7.mjs";
import { r as installPackageDir } from "./install-package-dir-B3XJuWfa.mjs";
import { t as resolveNpmIntegrityDriftWithDefaultMessage } from "./npm-integrity-B2cxrzSS.mjs";
import { n as withExtractedArchiveRoot, t as resolveExistingInstallPath } from "./install-flow-DfgqB7LP.mjs";
import { n as resolveCanonicalInstallTarget, t as ensureInstallTargetAvailable } from "./install-target-DJwA2bqv.mjs";
//#region src/infra/install-from-npm-spec.ts
function isSuccessfulInstallResult(result) {
	return result.ok;
}
async function installFromValidatedNpmSpecArchive(params) {
	const spec = params.spec.trim();
	const specError = validateRegistryNpmSpec(spec);
	if (specError) return {
		ok: false,
		error: specError
	};
	const flowResult = await withInstallWorkspace(params.tempDirPrefix, async (tmpDir) => {
		const parsedSpec = parseRegistryNpmSpec(spec);
		if (!parsedSpec) return {
			ok: false,
			error: "unsupported npm spec"
		};
		const packedResult = await packNpmSpecToArchive({
			spec,
			timeoutMs: params.timeoutMs,
			workTimeoutMs: params.workTimeoutMs,
			cwd: tmpDir
		});
		if (!packedResult.ok) return packedResult;
		const npmResolution = {
			...packedResult.metadata,
			resolvedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (npmResolution.version && !isPrereleaseResolutionAllowed({
			spec: parsedSpec,
			resolvedVersion: npmResolution.version
		})) return {
			ok: false,
			error: formatPrereleaseResolutionError({
				spec: parsedSpec,
				resolvedVersion: npmResolution.version
			})
		};
		const driftResult = await resolveNpmIntegrityDriftWithDefaultMessage({
			spec,
			expectedIntegrity: params.expectedIntegrity,
			resolution: npmResolution,
			onIntegrityDrift: params.onIntegrityDrift,
			warn: params.warn
		});
		if (driftResult.error) return {
			ok: false,
			error: driftResult.error
		};
		return {
			ok: true,
			installResult: await params.installFromArchive({
				archivePath: packedResult.archivePath,
				...params.archiveInstallParams
			}),
			npmResolution,
			integrityDrift: driftResult.integrityDrift
		};
	});
	if (!flowResult.ok) return flowResult;
	const installResult = flowResult.installResult;
	if (!isSuccessfulInstallResult(installResult)) return installResult;
	return {
		...installResult,
		npmResolution: flowResult.npmResolution,
		...flowResult.integrityDrift ? { integrityDrift: flowResult.integrityDrift } : {}
	};
}
//#endregion
export { ensureInstallTargetAvailable, pathExists as fileExists, installFromValidatedNpmSpecArchive, installPackageDir, isPathInside, isPathInsideWithRealpath, readJson as readJsonFile, resolveArchiveKind, resolveArchiveSourcePath, resolveCanonicalInstallTarget, resolveExistingInstallPath, resolveInstallModeOptions, resolveTimedInstallModeOptions, withExtractedArchiveRoot };
