import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { a as openRootFile, i as matchRootFileOpenFailure } from "./boundary-file-read-CCth2Hwg.mjs";
import { i as resolveRootPath } from "./boundary-path-CAv_plX7.mjs";
import { a as checkPluginCacheEntry, r as getPackageManifestMetadata, s as pluginCacheExistsSync } from "./package-manifest-MF4xNi-g.mjs";
import { n as listBuiltRuntimeEntryCandidates, t as isTypeScriptPackageEntry } from "./package-entrypoints-BfOpsr9M.mjs";
import "./manifest-BocQ5UD3.mjs";
import fs from "node:fs";
import path from "node:path";
//#region src/plugins/package-entry-resolution.ts
function resolvePackageRuntimeExtensionEntries(params) {
	const declared = getPackageManifestMetadata(params.manifest ?? void 0)?.runtimeExtensions;
	const runtimeExtensions = [];
	if (!Array.isArray(declared)) return {
		ok: true,
		runtimeExtensions
	};
	for (const [index, entry] of declared.entries()) {
		const normalized = normalizeOptionalString(entry);
		if (!normalized) return {
			ok: false,
			error: `package.json openclaw.runtimeExtensions[${index}] must be a non-empty string`
		};
		runtimeExtensions.push(normalized);
	}
	if (runtimeExtensions.length > 0 && runtimeExtensions.length !== params.extensions.length) return {
		ok: false,
		error: `package.json openclaw.runtimeExtensions length (${runtimeExtensions.length}) must match openclaw.extensions length (${params.extensions.length})`
	};
	return {
		ok: true,
		runtimeExtensions
	};
}
function missingCompiledRuntimeEntryMessage(params) {
	const label = params.context === "install" ? "package install" : "installed plugin package";
	const recovery = params.context === "install" ? "retry installation after the publisher ships compiled JavaScript" : "update or reinstall the plugin after the publisher ships compiled JavaScript, or disable/uninstall the plugin until then";
	return `${label} requires compiled runtime output for TypeScript entry ${params.entry}: expected ${params.candidates.join(", ")}. This is a plugin packaging issue, not a local config problem; ${recovery}. TypeScript source fallback is only supported for source checkouts and local development paths.`;
}
async function validatePackageExtensionEntry(params) {
	const absolutePath = path.resolve(params.packageDir, params.entry);
	try {
		if (!(await resolveRootPath({
			absolutePath,
			rootPath: params.packageDir,
			boundaryLabel: "plugin package directory"
		})).exists) return params.requireExisting ? {
			ok: false,
			error: `${params.label} not found: ${params.entry}`
		} : {
			ok: true,
			exists: false
		};
	} catch {
		return {
			ok: false,
			error: `${params.label} escapes plugin directory: ${params.entry}`
		};
	}
	const opened = await openRootFile({
		absolutePath,
		rootPath: params.packageDir,
		boundaryLabel: "plugin package directory"
	});
	if (!opened.ok) return matchRootFileOpenFailure(opened, {
		path: () => ({
			ok: false,
			error: `${params.label} not found: ${params.entry}`
		}),
		io: () => ({
			ok: false,
			error: `${params.label} unreadable: ${params.entry}`
		}),
		validation: () => ({
			ok: false,
			error: `${params.label} failed plugin directory boundary checks: ${params.entry}`
		}),
		fallback: () => ({
			ok: false,
			error: `${params.label} failed plugin directory boundary checks: ${params.entry}`
		})
	});
	fs.closeSync(opened.fd);
	return {
		ok: true,
		exists: true
	};
}
async function validatePackageEntryForInstall(params) {
	const sourceEntry = await validatePackageExtensionEntry({
		packageDir: params.packageDir,
		entry: params.entry,
		label: `${params.entryKind} entry`,
		requireExisting: false
	});
	if (!sourceEntry.ok) return sourceEntry;
	if (params.runtimeEntry) {
		const runtimeResult = await validatePackageExtensionEntry({
			packageDir: params.packageDir,
			entry: params.runtimeEntry,
			label: `runtime ${params.entryKind} entry`,
			requireExisting: true
		});
		return runtimeResult.ok ? { ok: true } : runtimeResult;
	}
	const builtEntryCandidates = listBuiltRuntimeEntryCandidates(params.entry);
	for (const builtEntry of builtEntryCandidates) {
		const builtResult = await validatePackageExtensionEntry({
			packageDir: params.packageDir,
			entry: builtEntry,
			label: `inferred runtime ${params.entryKind} entry`,
			requireExisting: false
		});
		if (!builtResult.ok) return builtResult;
		if (builtResult.exists) return { ok: true };
	}
	if (sourceEntry.exists && (!isTypeScriptPackageEntry(params.entry) || params.allowSourceTypeScriptEntries)) return { ok: true };
	if (builtEntryCandidates.length > 0) return {
		ok: false,
		error: missingCompiledRuntimeEntryMessage({
			context: "install",
			entry: params.entry,
			candidates: builtEntryCandidates
		})
	};
	return {
		ok: false,
		error: `${params.entryKind} entry not found: ${params.entry}`
	};
}
/** Validates package extension/setup entries before installing a plugin package. */
async function validatePackageExtensionEntriesForInstall(params) {
	const runtimeResolution = resolvePackageRuntimeExtensionEntries(params);
	if (!runtimeResolution.ok) return runtimeResolution;
	for (const [index, entry] of params.extensions.entries()) {
		const result = await validatePackageEntryForInstall({
			packageDir: params.packageDir,
			entry,
			runtimeEntry: runtimeResolution.runtimeExtensions[index],
			entryKind: "extension",
			allowSourceTypeScriptEntries: params.allowSourceTypeScriptEntries
		});
		if (!result.ok) return result;
	}
	const packageManifest = getPackageManifestMetadata(params.manifest);
	const setupEntry = normalizeOptionalString(packageManifest?.setupEntry);
	const runtimeSetupEntry = normalizeOptionalString(packageManifest?.runtimeSetupEntry);
	if (runtimeSetupEntry && !setupEntry) return {
		ok: false,
		error: "package.json openclaw.runtimeSetupEntry requires openclaw.setupEntry"
	};
	if (setupEntry) return await validatePackageEntryForInstall({
		packageDir: params.packageDir,
		entry: setupEntry,
		runtimeEntry: runtimeSetupEntry,
		entryKind: "setup",
		allowSourceTypeScriptEntries: params.allowSourceTypeScriptEntries
	});
	return { ok: true };
}
function resolvePackageEntrySource(params) {
	const source = path.resolve(params.packageDir, params.entryPath);
	const rejectHardlinks = params.rejectHardlinks ?? true;
	const candidates = [source];
	const openCandidate = (absolutePath) => {
		const opened = checkPluginCacheEntry({
			rootDir: params.packageDir,
			relativePath: path.relative(params.packageDir, absolutePath),
			rootRealPath: params.packageRootRealPath,
			rejectHardlinks
		});
		if (!opened.ok) return matchRootFileOpenFailure(opened, {
			path: () => null,
			io: () => {
				params.diagnostics.push({
					level: "warn",
					...params.pluginIdHint ? { pluginId: params.pluginIdHint } : {},
					message: `extension entry unreadable (I/O error): ${params.entryPath}`,
					source: params.sourceLabel
				});
				return null;
			},
			fallback: () => {
				params.diagnostics.push({
					level: "error",
					...params.pluginIdHint ? { pluginId: params.pluginIdHint } : {},
					message: `extension entry escapes package directory: ${params.entryPath}`,
					source: params.sourceLabel
				});
				return null;
			}
		});
		return opened.exists ? opened.path : null;
	};
	if (!rejectHardlinks) {
		const builtCandidate = source.replace(/\.[^.]+$/u, ".js");
		if (builtCandidate !== source) candidates.push(builtCandidate);
	}
	for (const candidate of candidates) {
		if (!pluginCacheExistsSync(candidate)) continue;
		return openCandidate(candidate);
	}
	return openCandidate(source);
}
function resolveSafePackageEntry(params) {
	const absolutePath = path.resolve(params.packageDir, params.entryPath);
	if (pluginCacheExistsSync(absolutePath)) {
		const existingSource = resolvePackageEntrySource(params);
		if (!existingSource) return null;
		return {
			relativePath: path.relative(params.packageDir, absolutePath).replace(/\\/g, "/"),
			existingSource
		};
	}
	if (!checkPluginCacheEntry({
		rootDir: params.packageDir,
		relativePath: params.entryPath,
		rootRealPath: params.packageRootRealPath,
		rejectHardlinks: params.rejectHardlinks ?? true
	}).ok) {
		params.diagnostics.push({
			level: "error",
			...params.pluginIdHint ? { pluginId: params.pluginIdHint } : {},
			message: `extension entry escapes package directory: ${params.entryPath}`,
			source: params.sourceLabel
		});
		return null;
	}
	return { relativePath: path.relative(params.packageDir, absolutePath).replace(/\\/g, "/") };
}
function resolveOptionalExistingPackageEntrySource(params) {
	const source = path.resolve(params.packageDir, params.entryPath);
	if (!pluginCacheExistsSync(source)) return { status: "missing" };
	const resolved = resolvePackageEntrySource(params);
	return resolved ? {
		status: "resolved",
		source: resolved
	} : { status: "invalid" };
}
function resolvePackageRuntimeEntrySource(params) {
	const safeEntry = resolveSafePackageEntry(params);
	if (!safeEntry) return null;
	if (params.runtimeEntryPath) {
		const runtimeSource = resolvePackageEntrySource({
			...params,
			entryPath: params.runtimeEntryPath
		});
		if (runtimeSource) return runtimeSource;
		params.diagnostics.push({
			level: "error",
			...params.pluginIdHint ? { pluginId: params.pluginIdHint } : {},
			message: `${params.runtimeEntryLabel ?? "runtime entry"} not found: ${params.runtimeEntryPath}`,
			source: params.sourceLabel
		});
		return null;
	}
	if (params.origin === "config" || params.origin === "global") {
		const builtEntryCandidates = listBuiltRuntimeEntryCandidates(safeEntry.relativePath);
		for (const candidate of builtEntryCandidates) {
			const runtimeSource = resolveOptionalExistingPackageEntrySource({
				...params,
				entryPath: candidate
			});
			if (runtimeSource.status === "resolved") return runtimeSource.source;
			if (runtimeSource.status === "invalid") return null;
		}
		if ((params.requireBuiltRuntimeEntry ?? params.origin === "global") && isTypeScriptPackageEntry(safeEntry.relativePath)) {
			params.diagnostics.push({
				level: "warn",
				...params.pluginIdHint ? { pluginId: params.pluginIdHint } : {},
				message: missingCompiledRuntimeEntryMessage({
					context: "installed",
					entry: safeEntry.relativePath,
					candidates: builtEntryCandidates
				}),
				source: params.sourceLabel
			});
			return null;
		}
	}
	if (safeEntry.existingSource) return safeEntry.existingSource;
	if (params.rejectHardlinks === false) {
		const trustedFallbackSource = resolvePackageEntrySource(params);
		if (trustedFallbackSource) return trustedFallbackSource;
	}
	params.diagnostics.push({
		level: "error",
		...params.pluginIdHint ? { pluginId: params.pluginIdHint } : {},
		message: `${params.sourceEntryLabel ?? "extension entry"} not found: ${safeEntry.relativePath}`,
		source: params.sourceLabel
	});
	return null;
}
/** Resolves the runtime setup source for a plugin package manifest. */
function resolvePackageSetupSource(params) {
	const packageManifest = getPackageManifestMetadata(params.manifest ?? void 0);
	const setupEntryPath = normalizeOptionalString(packageManifest?.setupEntry);
	if (!setupEntryPath) return null;
	return resolvePackageRuntimeEntrySource({
		...params,
		entryPath: setupEntryPath,
		sourceEntryLabel: "setup entry",
		runtimeEntryPath: normalizeOptionalString(packageManifest?.runtimeSetupEntry),
		runtimeEntryLabel: "runtime setup entry",
		pluginIdHint: params.pluginIdHint ?? normalizeOptionalString(packageManifest?.plugin?.id) ?? normalizeOptionalString(packageManifest?.channel?.id)
	});
}
/** Resolves runtime extension sources for a plugin package manifest. */
function resolvePackageRuntimeExtensionSources(params) {
	return resolvePackageRuntimeExtensions(params).map((entry) => entry.source);
}
/** Keeps declarations paired with their runtime sources when earlier entries cannot resolve. */
function resolvePackageRuntimeExtensions(params) {
	const runtimeResolution = resolvePackageRuntimeExtensionEntries(params);
	if (!runtimeResolution.ok) {
		params.diagnostics.push({
			level: "error",
			...params.pluginIdHint ? { pluginId: params.pluginIdHint } : {},
			message: runtimeResolution.error,
			source: params.sourceLabel
		});
		return [];
	}
	return params.extensions.flatMap((entryPath, index) => {
		const source = resolvePackageRuntimeEntrySource({
			...params,
			entryPath,
			sourceEntryLabel: "extension entry",
			runtimeEntryPath: runtimeResolution.runtimeExtensions[index],
			runtimeEntryLabel: "runtime extension entry"
		});
		return source ? [{
			entryPath,
			source
		}] : [];
	});
}
//#endregion
export { validatePackageExtensionEntriesForInstall as i, resolvePackageRuntimeExtensions as n, resolvePackageSetupSource as r, resolvePackageRuntimeExtensionSources as t };
