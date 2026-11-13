import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { r as resolveOpenClawPackageRootSync } from "./openclaw-root-3-SBP6RS.mjs";
import { c as isRecord, s as filterStringRecord } from "./record-coerce-TIsquoVR.mjs";
import { n as filterStringEntries } from "./string-normalization-YMwDjufr.mjs";
import { n as isNotFoundPathError } from "./path-guards-CH7noY0Z.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import "./errors-YPvSaqwO.mjs";
import { i as runCommandWithTimeout } from "./exec-Bjx7k3vE.mjs";
import { c as readJsonIfExists, h as writeJson, i as readJson, t as JsonFileReadError } from "./json-files-Br8qKrAz.mjs";
import { o as parseRegistryNpmSpec } from "./npm-registry-spec-CwucyVOH.mjs";
import { a as resolveNpmCommand } from "./npm-install-env-BzCWZDMx.mjs";
import { f as resolvePluginNpmProjectDir, l as resolvePluginNpmGenerationProjectDir, u as resolvePluginNpmGenerationProjectDirPrefix } from "./install-paths-BylxcuP5.mjs";
import { l as listNpmPackageDirs } from "./plugin-peer-link-DN_8KvHE.mjs";
import { r as hasRetainedManagedNpmInstallMarker } from "./managed-npm-retention-DS6eymKz.mjs";
import { n as resolveInstallWorkTimeoutMs } from "./install-mode-options-HTpLEgtT.mjs";
import { o as createSafeNpmInstallArgs, s as createSafeNpmInstallEnv } from "./install-package-dir-B3XJuWfa.mjs";
import { u as resolveEffectiveInstallMode } from "./install-shared-CIfCbvAU.mjs";
import { constants } from "node:fs";
import path from "node:path";
import fs$1 from "node:fs/promises";
import os from "node:os";
import { randomUUID } from "node:crypto";
import { replaceFileAtomicSync } from "@openclaw/fs-safe/atomic";
import { parse as parse$1 } from "yaml";
//#region src/plugins/install-managed-npm-state.ts
const MANAGED_NPM_PROJECT_QUARANTINE_DIR = "_openclaw-quarantined-npm-projects";
const MANAGED_NPM_PROJECT_REBUILD_ARTIFACTS = [
	"node_modules",
	"package-lock.json",
	"npm-shrinkwrap.json"
];
/** Preserve npm project policy and relative archive inputs without copying its installed tree. */
async function copyManagedNpmProjectInputs(params) {
	for (const name of [
		"package.json",
		"package-lock.json",
		"npm-shrinkwrap.json",
		".npmrc",
		"_openclaw-pack-archives"
	]) try {
		await fs$1.cp(path.join(params.npmRoot, name), path.join(params.stageDir, name), {
			recursive: true,
			dereference: true
		});
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}
}
function isNpmAliasOverrideCompatibilityError(result) {
	return `${result.stderr}\n${result.stdout}`.includes("Invalid comparator: npm:");
}
async function resolveManagedNpmRootDependencySpecForInstall(params) {
	if (params.prepareDependencySpec) try {
		return await params.prepareDependencySpec({ npmRoot: params.npmRoot });
	} catch (error) {
		return {
			ok: false,
			error: `Failed to prepare managed npm dependency for ${params.packageName}: ${String(error)}`
		};
	}
	if (params.dependencySpec === void 0) return {
		ok: false,
		error: `missing managed npm dependency spec for ${params.packageName}`
	};
	return {
		ok: true,
		dependencySpec: params.dependencySpec
	};
}
function isManagedNpmProjectCorruptionInstallFailure(result) {
	const output = `${result.stderr}\n${result.stdout}`;
	return output.includes("ERR_INVALID_ARG_TYPE") && output.includes("\"from\" argument") && output.includes("Received undefined");
}
function formatManagedNpmProjectQuarantineArtifacts(artifactNames) {
	return artifactNames.length > 0 ? artifactNames.join(", ") : "no rebuild artifacts";
}
async function quarantineManagedNpmProjectRebuildArtifacts(params) {
	await fs$1.mkdir(params.npmRoot, { recursive: true });
	const quarantineParent = path.join(path.dirname(params.npmRoot), MANAGED_NPM_PROJECT_QUARANTINE_DIR);
	await fs$1.mkdir(quarantineParent, { recursive: true });
	const quarantineDir = await fs$1.mkdtemp(path.join(quarantineParent, "corrupt-"));
	const movedArtifactNames = [];
	for (const artifactName of MANAGED_NPM_PROJECT_REBUILD_ARTIFACTS) {
		const source = path.join(params.npmRoot, artifactName);
		try {
			await fs$1.rename(source, path.join(quarantineDir, artifactName));
			movedArtifactNames.push(artifactName);
		} catch (error) {
			if (error.code !== "ENOENT") throw error;
		}
	}
	return {
		quarantineDir,
		movedArtifactNames
	};
}
async function listManagedNpmRootPackageNames(npmRoot) {
	const packageDirs = await listNpmPackageDirs(npmRoot, {
		sortEntries: true,
		includeEntry: (entry, scoped) => (scoped || entry.name !== ".bin" && entry.name !== "openclaw") && (!scoped && entry.name.startsWith("@") || entry.isDirectory() || entry.isSymbolicLink())
	});
	return new Set(packageDirs.map((dir) => path.relative(path.join(npmRoot, "node_modules"), dir).split(path.sep).join("/")));
}
function resolveManagedNpmRootPackageDir(npmRoot, packageName) {
	return path.join(npmRoot, "node_modules", ...packageName.split("/"));
}
function resolveManagedNpmRootGenerationKey(params) {
	return [
		params.npmResolution.name ?? params.packageName,
		params.npmResolution.version ?? "",
		params.npmResolution.resolvedSpec ?? "",
		params.npmResolution.integrity ?? "",
		params.npmResolution.shasum ?? ""
	].join("\n");
}
function resolveManagedNpmRootForInstall(params) {
	if (!params.useGeneration) return resolvePluginNpmProjectDir({
		npmDir: params.npmBaseDir,
		packageName: params.packageName
	});
	return resolvePluginNpmGenerationProjectDir({
		npmDir: params.npmBaseDir,
		packageName: params.packageName,
		generationKey: resolveManagedNpmRootGenerationKey({
			packageName: params.packageName,
			npmResolution: params.npmResolution
		})
	});
}
function resolveManagedNpmInstallRoot(params) {
	const generationKey = resolveManagedNpmRootGenerationKey({
		packageName: params.packageName,
		npmResolution: params.npmResolution
	});
	const npmRoot = resolveManagedNpmRootForInstall(params);
	const installRoot = resolveManagedNpmRootPackageDir(npmRoot, params.packageName);
	if (!hasRetainedManagedNpmInstallMarker(installRoot)) return npmRoot;
	return resolvePluginNpmGenerationProjectDir({
		npmDir: params.npmBaseDir,
		packageName: params.packageName,
		generationKey: `${generationKey}\nactivation\n${randomUUID()}`
	});
}
async function listManagedNpmPackageDirsForPackage(params) {
	const packageDirs = [];
	const legacyProjectRoot = resolvePluginNpmProjectDir({
		npmDir: params.npmBaseDir,
		packageName: params.packageName
	});
	const legacyPackageDir = resolveManagedNpmRootPackageDir(legacyProjectRoot, params.packageName);
	if (await params.runtime.fileExists(legacyPackageDir)) packageDirs.push(legacyPackageDir);
	const projectsDir = path.dirname(legacyProjectRoot);
	const generationPrefix = resolvePluginNpmGenerationProjectDirPrefix(params.packageName);
	let entries;
	try {
		entries = await fs$1.readdir(projectsDir, { withFileTypes: true });
	} catch (error) {
		if (isNotFoundPathError(error)) return packageDirs;
		throw error;
	}
	for (const entry of entries) {
		if (!entry.isDirectory() || !entry.name.startsWith(generationPrefix)) continue;
		const packageDir = resolveManagedNpmRootPackageDir(path.join(projectsDir, entry.name), params.packageName);
		if (await params.runtime.fileExists(packageDir)) packageDirs.push(packageDir);
	}
	return packageDirs;
}
async function resolveManagedNpmGenerationUseForInstall(params) {
	const packageDirs = await listManagedNpmPackageDirsForPackage({
		runtime: params.runtime,
		npmBaseDir: params.npmBaseDir,
		packageName: params.packageName
	});
	const hasNonRetainedPackageDir = packageDirs.some((packageDir) => !hasRetainedManagedNpmInstallMarker(packageDir));
	if (packageDirs.length > 0 && !hasNonRetainedPackageDir) return "retained-install";
	const generationUse = params.requestedMode === "update" && hasNonRetainedPackageDir ? "update" : "none";
	if (params.npmResolution) {
		const candidatePackageDir = resolveManagedNpmRootPackageDir(resolveManagedNpmRootForInstall({
			npmBaseDir: params.npmBaseDir,
			packageName: params.packageName,
			npmResolution: params.npmResolution,
			useGeneration: generationUse !== "none"
		}), params.packageName);
		if (hasRetainedManagedNpmInstallMarker(candidatePackageDir)) return "retained-install";
	}
	return generationUse;
}
async function resolveManagedNpmInstallPlan(params) {
	const generationUse = await resolveManagedNpmGenerationUseForInstall(params);
	const npmRoot = resolveManagedNpmInstallRoot({
		...params,
		useGeneration: generationUse !== "none"
	});
	const installRoot = resolveManagedNpmRootPackageDir(npmRoot, params.packageName);
	const targetMode = generationUse === "retained-install" && hasRetainedManagedNpmInstallMarker(installRoot) ? "update" : await resolveEffectiveInstallMode({
		runtime: params.runtime,
		requestedMode: params.requestedMode,
		targetPath: installRoot
	});
	return {
		npmRoot,
		installRoot,
		targetMode,
		policyMode: generationUse === "update" ? "update" : generationUse === "retained-install" ? "install" : targetMode
	};
}
function resolveRequiredPlatformPackageNames(packageMetadata) {
	const raw = packageMetadata?.install?.requiredPlatformPackages;
	if (raw === void 0) return {
		ok: true,
		packageNames: []
	};
	if (!Array.isArray(raw)) return {
		ok: false,
		error: "package.json openclaw.install.requiredPlatformPackages must be an array"
	};
	const packageNames = /* @__PURE__ */ new Set();
	for (const value of raw) {
		if (typeof value !== "string") return {
			ok: false,
			error: "package.json openclaw.install.requiredPlatformPackages must contain only npm package names"
		};
		const parsed = parseRegistryNpmSpec(value);
		if (!parsed || parsed.selectorKind !== "none") return {
			ok: false,
			error: `package.json openclaw.install.requiredPlatformPackages contains invalid package name: ${value}`
		};
		packageNames.add(parsed.name);
	}
	return {
		ok: true,
		packageNames: [...packageNames]
	};
}
//#endregion
//#region src/infra/npm-managed-peer-plan.ts
function createManagedNpmPeerPlanArgs(params) {
	return resolveNpmCommand([
		"install",
		"--package-lock-only",
		...params?.force ? ["--force"] : [],
		...createSafeNpmInstallArgs({
			omitDev: true,
			omitPeer: true,
			legacyPeerDeps: params?.legacyPeerDeps,
			loglevel: "error",
			ignoreWorkspaces: true,
			noAudit: true,
			noFund: true
		}).slice(1)
	]);
}
//#endregion
//#region src/infra/npm-managed-root.ts
function readDependencyRecord(value) {
	return filterStringRecord(value) ?? {};
}
function isSafePackageName(name) {
	if (name.startsWith("@")) {
		const parts = name.split("/");
		return parts.length === 2 && parts.every((part) => part.length > 0 && part !== "." && part !== "..");
	}
	return name.length > 0 && !name.includes("/") && !name.includes("\\") && name !== "." && name !== "..";
}
function readOverrideRecord(value) {
	if (!isRecord(value)) return {};
	const overrides = {};
	for (const [key, raw] of Object.entries(value)) if (key.trim()) overrides[key] = raw;
	return overrides;
}
function readManagedKeys(value, key) {
	return filterStringEntries(isRecord(value) ? value[key] : void 0);
}
function buildManagedNpmRootManifest(params) {
	const metadata = isRecord(params.manifest.openclaw) ? { ...params.manifest.openclaw } : {};
	if (params.managedOverrideKeys.length > 0) metadata.managedOverrides = params.managedOverrideKeys;
	else delete metadata.managedOverrides;
	const managedPeerDependencyKeys = params.managedPeerDependencyKeys;
	if (managedPeerDependencyKeys.length > 0) metadata.managedPeerDependencies = managedPeerDependencyKeys;
	else delete metadata.managedPeerDependencies;
	const next = {
		...params.manifest,
		private: true,
		dependencies: params.dependencies
	};
	if (Object.keys(params.overrides).length > 0) next.overrides = params.overrides;
	else delete next.overrides;
	if (Object.keys(metadata).length > 0) next.openclaw = metadata;
	else delete next.openclaw;
	return next;
}
async function readManagedNpmRootManifest(filePath) {
	const parsed = await readJsonIfExists(filePath);
	return isRecord(parsed) ? { ...parsed } : {};
}
async function readHostWorkspaceOverrides(packageRoot) {
	const workspace = parse$1(await fs$1.readFile(path.join(packageRoot, "pnpm-workspace.yaml"), "utf8"));
	return isRecord(workspace) ? readOverrideRecord(workspace.overrides) : {};
}
function resolveHostOverrideReferences(value, manifest) {
	if (typeof value === "string" && value.startsWith("$")) {
		const packageName = value.slice(1);
		return manifest.dependencies?.[packageName] ?? manifest.optionalDependencies?.[packageName] ?? manifest.peerDependencies?.[packageName] ?? manifest.devDependencies?.[packageName] ?? value;
	}
	if (!isRecord(value)) return value;
	const resolved = {};
	for (const [key, nested] of Object.entries(value)) resolved[key] = resolveHostOverrideReferences(nested, manifest);
	return resolved;
}
function isPnpmParentChildOverrideSelector(key) {
	return /[^ |@]>/u.test(key);
}
function filterUnsupportedManagedNpmRootOverrides(value, omitNpmAliases = false) {
	const overrides = readOverrideRecord(value);
	const filtered = {};
	for (const [key, raw] of Object.entries(overrides)) {
		if (isPnpmParentChildOverrideSelector(key) || omitNpmAliases && typeof raw === "string" && raw.trim().startsWith("npm:")) continue;
		if (isRecord(raw)) {
			const nested = filterUnsupportedManagedNpmRootOverrides(raw, omitNpmAliases);
			if (Object.keys(nested).length > 0) filtered[key] = nested;
			continue;
		}
		filtered[key] = raw;
	}
	return filtered;
}
function readRootOverrideSpec(value) {
	if (typeof value === "string") return value;
	if (isRecord(value) && typeof value["."] === "string") return value["."];
}
/**
* npm rejects manifests where an override changes the effective spec of a root direct
* dependency (Arborist EOVERRIDE), which bricks every later install in the managed root.
* Managed peer pins follow the override; for owned root deps the managed override yields.
*/
function reconcileManagedNpmRootOverrideConflicts(params) {
	for (const [packageName, overrideValue] of Object.entries(params.overrides)) {
		const dependencySpec = params.dependencies[packageName];
		if (dependencySpec === void 0) continue;
		const overrideSpec = readRootOverrideSpec(overrideValue);
		if (overrideSpec === void 0 || overrideSpec === "*" || overrideSpec.startsWith("$") || overrideSpec === dependencySpec) continue;
		if (params.managedDependencyNames.has(packageName)) {
			params.dependencies[packageName] = overrideSpec;
			continue;
		}
		if (!params.managedOverrideNames.has(packageName)) continue;
		if (isRecord(overrideValue)) {
			const trimmed = { ...overrideValue };
			delete trimmed["."];
			if (Object.keys(trimmed).length > 0) {
				params.overrides[packageName] = trimmed;
				continue;
			}
		}
		delete params.overrides[packageName];
	}
}
/** Merge managed overrides into a managed root manifest's override record and keep the
* EOVERRIDE invariant plus metadata (keys actually written) consistent in one place. */
function applyManagedNpmRootOverrides(params) {
	const overrides = readOverrideRecord(params.manifest.overrides);
	for (const key of readManagedKeys(params.manifest.openclaw, "managedOverrides")) delete overrides[key];
	Object.assign(overrides, params.managedOverrides);
	reconcileManagedNpmRootOverrideConflicts({
		dependencies: params.dependencies,
		overrides,
		managedDependencyNames: params.managedDependencyNames,
		managedOverrideNames: new Set(Object.keys(params.managedOverrides))
	});
	return {
		overrides,
		managedOverrideKeys: Object.keys(params.managedOverrides).filter((key) => Object.hasOwn(overrides, key)).toSorted()
	};
}
/** Read host OpenClaw pnpm overrides for reuse inside a managed npm root. */
async function readOpenClawManagedNpmRootOverrides(params) {
	const packageRoot = params?.packageRoot ?? resolveOpenClawPackageRootSync({
		argv1: params?.argv1 ?? process.argv[1],
		moduleUrl: params?.moduleUrl ?? import.meta.url,
		cwd: params?.cwd ?? process.cwd()
	});
	if (!packageRoot) return {};
	try {
		const manifest = JSON.parse(await fs$1.readFile(path.join(packageRoot, "package.json"), "utf8"));
		if (!isRecord(manifest)) return {};
		const hostManifest = manifest;
		const overrides = filterUnsupportedManagedNpmRootOverrides(await readHostWorkspaceOverrides(packageRoot));
		return Object.fromEntries(Object.entries(overrides).map(([key, value]) => [key, resolveHostOverrideReferences(value, hostManifest)]));
	} catch {
		return {};
	}
}
/** Resolve the dependency spec to write for a parsed registry package. */
function resolveManagedNpmRootDependencySpec(params) {
	return params.resolution.version ?? params.parsedSpec.selector ?? "latest";
}
/** Insert or update a dependency and managed override metadata in package.json. */
async function upsertManagedNpmRootDependency(params) {
	await fs$1.mkdir(params.npmRoot, { recursive: true });
	const manifestPath = path.join(params.npmRoot, "package.json");
	const manifest = await readManagedNpmRootManifest(manifestPath);
	const dependencies = readDependencyRecord(manifest.dependencies);
	const managedOverrides = filterUnsupportedManagedNpmRootOverrides(params.managedOverrides, params.omitNpmAliasOverrides);
	const nextDependencies = {
		...dependencies,
		[params.packageName]: params.dependencySpec
	};
	const managedDependencyNames = new Set(readManagedKeys(manifest.openclaw, "managedPeerDependencies"));
	managedDependencyNames.delete(params.packageName);
	const { overrides, managedOverrideKeys } = applyManagedNpmRootOverrides({
		manifest,
		managedOverrides,
		dependencies: nextDependencies,
		managedDependencyNames
	});
	const next = buildManagedNpmRootManifest({
		manifest,
		dependencies: nextDependencies,
		overrides,
		managedOverrideKeys,
		managedPeerDependencyKeys: [...managedDependencyNames].toSorted()
	});
	await writeJson(manifestPath, next, { trailingNewline: true });
}
function isOptionalPeerDependency(manifest, peerName) {
	if (!isRecord(manifest.peerDependenciesMeta)) return false;
	const peerMetadata = manifest.peerDependenciesMeta[peerName];
	return isRecord(peerMetadata) && peerMetadata.optional === true;
}
function readStringList(value) {
	const values = typeof value === "string" ? [value] : filterStringEntries(value);
	return values.length > 0 ? values : void 0;
}
function matchesNpmPlatformList(value, list) {
	if (!list || list.length === 1 && list[0] === "any") return true;
	if (!value) return false;
	const allowed = list.filter((entry) => !entry.startsWith("!"));
	return !list.includes(`!${value}`) && (allowed.length === 0 || allowed.includes(value));
}
function resolveCurrentLibc() {
	if (process.platform !== "linux") return;
	const report = process.report?.getReport();
	const header = isRecord(report) ? report.header : void 0;
	if (isRecord(header) && header.glibcVersionRuntime) return "glibc";
	const sharedObjects = isRecord(report) ? report.sharedObjects : void 0;
	if (Array.isArray(sharedObjects) && sharedObjects.some((file) => typeof file === "string" && file.includes("musl"))) return "musl";
}
function isUnsupportedOptionalLockPackage(value) {
	if (!isRecord(value) || value.optional !== true) return false;
	return !matchesNpmPlatformList(process.platform, readStringList(value.os)) || !matchesNpmPlatformList(process.arch, readStringList(value.cpu)) || !matchesNpmPlatformList(resolveCurrentLibc(), readStringList(value.libc));
}
function hasNpmPlatformConstraint(value) {
	return value.os !== void 0 || value.cpu !== void 0 || value.libc !== void 0;
}
function readLockPackageLocationName(location) {
	const parts = location.split("/");
	for (let index = parts.length - 1; index >= 0; index -= 1) {
		if (parts[index] !== "node_modules") continue;
		const first = parts[index + 1];
		if (!first) return;
		if (!first.startsWith("@")) return first;
		const second = parts[index + 2];
		return second ? `${first}/${second}` : void 0;
	}
}
function readLockPackageName(location, value) {
	if (isRecord(value)) {
		const packageName = normalizeOptionalString(value.name);
		if (packageName) return packageName;
	}
	return readLockPackageLocationName(location);
}
function resolveManagedNpmLockPackagePath(params) {
	const npmRoot = path.resolve(params.npmRoot);
	const packagePath = path.resolve(npmRoot, ...params.location.split("/"));
	const relativePath = path.relative(npmRoot, packagePath);
	if (!relativePath || relativePath === ".." || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) return;
	return packagePath;
}
function isTopLevelLockPackageLocation(location) {
	return location.split("/").filter((part) => part === "node_modules").length === 1;
}
async function isRequiredPlatformPackageComplete(params) {
	let manifest;
	try {
		manifest = await readJsonIfExists(path.join(params.packagePath, "package.json"));
	} catch (error) {
		if (error instanceof JsonFileReadError && error.reason === "parse") return false;
		throw error;
	}
	if (!isRecord(manifest)) return false;
	const packageName = normalizeOptionalString(manifest.name);
	if (!packageName || !isSafePackageName(packageName)) return false;
	if (!Array.isArray(manifest.files) || !manifest.files.includes("vendor")) return true;
	const executableName = packageName.split("/").at(-1);
	const ownsNativeExecutable = Object.entries(params.lockPackages).some(([location, entry]) => readLockPackageLocationName(location) === packageName && isRecord(entry) && (typeof entry.bin === "string" || isRecord(entry.bin) && typeof entry.bin[executableName ?? ""] === "string"));
	if (!executableName || !ownsNativeExecutable) return true;
	let vendorEntries;
	try {
		vendorEntries = await fs$1.readdir(path.join(params.packagePath, "vendor"), { withFileTypes: true });
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) return false;
		throw error;
	}
	const executableFilename = process.platform === "win32" ? `${executableName}.exe` : executableName;
	for (const target of vendorEntries) {
		if (!target.isDirectory()) continue;
		try {
			await fs$1.access(path.join(params.packagePath, "vendor", target.name, "bin", executableFilename), constants.X_OK);
			return true;
		} catch (error) {
			if (!hasErrnoCode(error, "ENOENT") && !hasErrnoCode(error, "EACCES")) throw error;
		}
	}
	return false;
}
/** Lists explicitly required current-platform packages that npm left missing or incomplete. */
async function listMissingRequiredPlatformPackages(params) {
	const requiredPackageNames = new Set(params.requiredPackageNames);
	if (requiredPackageNames.size === 0) return [];
	const lockPath = path.join(params.npmRoot, "package-lock.json");
	const parsed = await readJson(lockPath);
	if (!isRecord(parsed) || !isRecord(parsed.packages)) return [];
	const missing = [];
	for (const [location, value] of Object.entries(parsed.packages)) {
		if (!isRecord(value) || value.optional !== true || !hasNpmPlatformConstraint(value) || isUnsupportedOptionalLockPackage(value)) continue;
		const name = readLockPackageLocationName(location);
		const packagePath = resolveManagedNpmLockPackagePath({
			npmRoot: params.npmRoot,
			location
		});
		if (!name || !requiredPackageNames.has(name) || !isSafePackageName(name) || !packagePath) continue;
		if (!await isRequiredPlatformPackageComplete({
			packagePath,
			lockPackages: parsed.packages
		})) missing.push({
			name,
			packagePath
		});
	}
	return missing.toSorted((left, right) => left.packagePath.localeCompare(right.packagePath));
}
function findLockPackageVersion(params) {
	if (!isRecord(params.lockfile.packages)) return;
	const preferredLocation = `node_modules/${params.packageName}`;
	const preferredPackage = params.lockfile.packages[preferredLocation];
	if (isRecord(preferredPackage) && preferredPackage.dev !== true && !isUnsupportedOptionalLockPackage(preferredPackage)) return normalizeOptionalString(preferredPackage.version);
}
function collectNpmLockPeerDependencyPins(params) {
	const pins = /* @__PURE__ */ new Map();
	const packages = isRecord(params.lockfile.packages) ? params.lockfile.packages : {};
	for (const [location, value] of Object.entries(packages).toSorted(([left], [right]) => left.localeCompare(right))) {
		if (location === "" || !isRecord(value) || value.dev === true || isUnsupportedOptionalLockPackage(value)) continue;
		if (readLockPackageName(location, value) === "openclaw") continue;
		const peerDependencies = readDependencyRecord(value.peerDependencies);
		for (const [peerName, peerRange] of Object.entries(peerDependencies)) {
			if (peerName === "openclaw" || pins.has(peerName) || !isSafePackageName(peerName)) continue;
			const version = findLockPackageVersion({
				lockfile: params.lockfile,
				packageName: peerName
			});
			if (!version && isOptionalPeerDependency(value, peerName)) continue;
			if (!version && !isTopLevelLockPackageLocation(location)) continue;
			pins.set(peerName, version ?? peerRange);
		}
	}
	return Object.fromEntries([...pins.entries()].toSorted(([left], [right]) => left.localeCompare(right)));
}
async function copyPathIfExists(source, destination) {
	try {
		await fs$1.cp(source, destination, { recursive: true });
	} catch (err) {
		if (err.code === "ENOENT") return;
		throw err;
	}
}
function scrubHostPeerFromLockPackage(value) {
	if (!isRecord(value)) return false;
	let changed = false;
	for (const key of ["peerDependencies", "peerDependenciesMeta"]) {
		const peers = value[key];
		if (isRecord(peers) && "openclaw" in peers) {
			const remaining = { ...peers };
			delete remaining.openclaw;
			if (Object.keys(remaining).length > 0) value[key] = remaining;
			else delete value[key];
			changed = true;
		}
	}
	return changed;
}
async function scrubHostPeerFromTempPackageLock(lockPath) {
	const parsed = await readJsonIfExists(lockPath);
	if (!isRecord(parsed)) return;
	let changed = false;
	for (const packages of [parsed.packages, parsed.dependencies]) if (isRecord(packages)) for (const value of Object.values(packages)) changed = scrubHostPeerFromLockPackage(value) || changed;
	if (changed) await writeJson(lockPath, parsed, { trailingNewline: true });
}
function isHostPeerResolutionFailure(result) {
	const output = `${result.stdout}\n${result.stderr}`;
	return /(^|[^@\w.-])openclaw(?=$|[@\s:,"'])/i.test(output);
}
async function collectNpmResolvedManagedNpmRootPeerDependencyPins(params) {
	const manifest = params.manifest;
	const dependencies = readDependencyRecord(manifest.dependencies);
	const previousManagedPeerDependencies = readManagedKeys(manifest.openclaw, "managedPeerDependencies");
	const fallbackPeerPins = {};
	for (const packageName of previousManagedPeerDependencies) {
		const dependencySpec = dependencies[packageName];
		if (dependencySpec) fallbackPeerPins[packageName] = dependencySpec;
	}
	for (const packageName of previousManagedPeerDependencies) delete dependencies[packageName];
	const tempRoot = await fs$1.mkdtemp(path.join(os.tmpdir(), "openclaw-managed-peer-plan-"));
	try {
		delete dependencies.openclaw;
		await writeJson(path.join(tempRoot, "package.json"), {
			...manifest,
			private: true,
			dependencies
		}, { trailingNewline: true });
		await copyPathIfExists(path.join(params.npmRoot, "package-lock.json"), path.join(tempRoot, "package-lock.json"));
		const tempLockPath = path.join(tempRoot, "package-lock.json");
		await scrubHostPeerFromTempPackageLock(tempLockPath);
		await copyPathIfExists(path.join(params.npmRoot, ".npmrc"), path.join(tempRoot, ".npmrc"));
		await copyPathIfExists(path.join(params.npmRoot, "_openclaw-pack-archives"), path.join(tempRoot, "_openclaw-pack-archives"));
		const command = params.runCommand ?? runCommandWithTimeout;
		const runPeerPlan = (legacyPeerDeps) => command(createManagedNpmPeerPlanArgs({
			force: true,
			legacyPeerDeps
		}), {
			cwd: tempRoot,
			timeoutMs: resolveInstallWorkTimeoutMs(params.workTimeoutMs, params.timeoutMs ?? 3e5),
			signal: params.signal,
			killProcessTree: true,
			env: createSafeNpmInstallEnv(process.env, {
				legacyPeerDeps,
				npmConfigCwd: tempRoot,
				packageLock: true,
				quiet: true
			})
		});
		let result = await runPeerPlan(false);
		if (result.code !== 0 && isHostPeerResolutionFailure(result)) result = await runPeerPlan(true);
		if (result.code !== 0) return fallbackPeerPins;
		return collectNpmLockPeerDependencyPins({ lockfile: await readManagedNpmRootManifest(tempLockPath) });
	} finally {
		await fs$1.rm(tempRoot, {
			recursive: true,
			force: true
		});
	}
}
/** Sync package.json with peer dependency pins resolved from npm's lock plan. */
async function syncManagedNpmRootPeerDependencies(params) {
	const manifestPath = path.join(params.npmRoot, "package.json");
	const manifest = await readManagedNpmRootManifest(manifestPath);
	const dependencies = readDependencyRecord(manifest.dependencies);
	const previousManagedPeerDependencies = readManagedKeys(manifest.openclaw, "managedPeerDependencies");
	const previousManagedPeerDependencySet = new Set(previousManagedPeerDependencies);
	const managedOverrides = filterUnsupportedManagedNpmRootOverrides(params.managedOverrides, params.omitNpmAliasOverrides);
	const plannedOverrides = applyManagedNpmRootOverrides({
		manifest,
		managedOverrides,
		dependencies: { ...dependencies },
		managedDependencyNames: previousManagedPeerDependencySet
	}).overrides;
	const peerPins = await collectNpmResolvedManagedNpmRootPeerDependencyPins({
		npmRoot: params.npmRoot,
		manifest: {
			...manifest,
			overrides: plannedOverrides
		},
		runCommand: params.runCommand,
		timeoutMs: params.timeoutMs,
		workTimeoutMs: params.workTimeoutMs,
		signal: params.signal
	});
	const managedPeerDependencyNames = new Set(Object.keys(peerPins).filter((packageName) => previousManagedPeerDependencySet.has(packageName) || !Object.hasOwn(dependencies, packageName)));
	const nextDependencies = { ...dependencies };
	for (const packageName of previousManagedPeerDependencies) if (!Object.hasOwn(peerPins, packageName)) delete nextDependencies[packageName];
	for (const [packageName, dependencySpec] of Object.entries(peerPins)) if (managedPeerDependencyNames.has(packageName)) nextDependencies[packageName] = dependencySpec;
	const { overrides, managedOverrideKeys } = applyManagedNpmRootOverrides({
		manifest,
		managedOverrides,
		dependencies: nextDependencies,
		managedDependencyNames: managedPeerDependencyNames
	});
	const next = buildManagedNpmRootManifest({
		manifest,
		dependencies: nextDependencies,
		overrides,
		managedOverrideKeys,
		managedPeerDependencyKeys: [...managedPeerDependencyNames].toSorted()
	});
	const changed = JSON.stringify(next) !== JSON.stringify(manifest);
	if (changed) {
		params.beforePersistentApply?.();
		replaceFileAtomicSync({
			filePath: manifestPath,
			content: `${JSON.stringify(next, null, 2)}\n`,
			mode: 384,
			dirMode: 511 & ~process.umask(),
			copyFallbackOnPermissionError: true,
			syncTempFile: true,
			syncParentDir: true
		});
	}
	return changed;
}
/** Remove stale managed-root openclaw peer installs while preserving active host links. */
async function repairManagedNpmRootOpenClawPeer(params) {
	await fs$1.mkdir(params.npmRoot, { recursive: true });
	const activeHostState = await readManagedNpmRootOpenClawHostState({
		npmRoot: params.npmRoot,
		packageRoot: params.packageRoot
	});
	if (activeHostState === "managed-active-host") return false;
	const hasManifestDependency = "openclaw" in readDependencyRecord((await readManagedNpmRootManifest(path.join(params.npmRoot, "package.json"))).dependencies);
	const hasLockDependency = await managedNpmRootLockfileHasOpenClawPeer(params.npmRoot);
	const hasPackageDir = await lstatIfExists(path.join(params.npmRoot, "node_modules", "openclaw")) !== null;
	const preserveActiveHostLink = activeHostState === "linked-active-host";
	if (!hasManifestDependency && !hasLockDependency && (!hasPackageDir || preserveActiveHostLink)) return false;
	if (preserveActiveHostLink) {
		await scrubManagedNpmRootOpenClawPeer({
			npmRoot: params.npmRoot,
			preservePackageDir: true
		});
		return true;
	}
	const command = params.runCommand ?? runCommandWithTimeout;
	const npmArgs = resolveNpmCommand([
		hasManifestDependency ? "uninstall" : "prune",
		"--loglevel=error",
		"--legacy-peer-deps",
		"--ignore-scripts",
		"--no-audit",
		"--no-fund",
		...hasManifestDependency ? ["openclaw"] : []
	]);
	try {
		const result = await command(npmArgs, {
			cwd: params.npmRoot,
			timeoutMs: resolveInstallWorkTimeoutMs(params.workTimeoutMs, Math.max(params.timeoutMs ?? 3e5, 3e5)),
			signal: params.signal,
			killProcessTree: true,
			env: createSafeNpmInstallEnv(process.env, {
				legacyPeerDeps: true,
				npmConfigCwd: params.npmRoot,
				packageLock: true,
				quiet: true
			})
		});
		if (result.code !== 0) params.logger?.warn?.(`npm ${hasManifestDependency ? "uninstall openclaw" : "prune"} failed while repairing managed npm root; falling back to direct cleanup: ${result.stderr.trim() || result.stdout.trim()}`);
	} catch (error) {
		params.logger?.warn?.(`npm ${hasManifestDependency ? "uninstall openclaw" : "prune"} failed while repairing managed npm root; falling back to direct cleanup: ${String(error)}`);
	}
	await scrubManagedNpmRootOpenClawPeer({ npmRoot: params.npmRoot });
	return true;
}
async function readManagedNpmRootOpenClawHostState(params) {
	const packageRoot = params.packageRoot === void 0 ? resolveOpenClawPackageRootSync({
		argv1: process.argv[1],
		moduleUrl: import.meta.url,
		cwd: process.cwd()
	}) : params.packageRoot;
	if (!packageRoot) return "none";
	const managedOpenClawPackageDir = path.join(params.npmRoot, "node_modules", "openclaw");
	const [hostPackageRoot, managedPackageRoot, managedPackageStat] = await Promise.all([
		realpathIfExists(packageRoot),
		realpathIfExists(managedOpenClawPackageDir),
		lstatIfExists(managedOpenClawPackageDir)
	]);
	if (hostPackageRoot === null || hostPackageRoot !== managedPackageRoot) return "none";
	return managedPackageStat?.isSymbolicLink() ? "linked-active-host" : "managed-active-host";
}
async function managedNpmRootLockfileHasOpenClawPeer(npmRoot) {
	const lockPath = path.join(npmRoot, "package-lock.json");
	try {
		const parsed = JSON.parse(await fs$1.readFile(lockPath, "utf8"));
		if (isRecord(parsed.packages)) {
			const rootPackage = parsed.packages[""];
			if (isRecord(rootPackage) && isRecord(rootPackage.dependencies) && "openclaw" in rootPackage.dependencies) return true;
			if ("node_modules/openclaw" in parsed.packages) return true;
		}
		return isRecord(parsed.dependencies) && "openclaw" in parsed.dependencies;
	} catch (err) {
		if (err.code === "ENOENT") return false;
		throw err;
	}
}
async function realpathIfExists(filePath) {
	try {
		return await fs$1.realpath(filePath);
	} catch (err) {
		if (err.code === "ENOENT") return null;
		throw err;
	}
}
async function lstatIfExists(filePath) {
	try {
		return await fs$1.lstat(filePath);
	} catch (err) {
		if (err.code === "ENOENT") return null;
		throw err;
	}
}
async function scrubManagedNpmRootOpenClawPeer(params) {
	const manifestPath = path.join(params.npmRoot, "package.json");
	const manifest = await readManagedNpmRootManifest(manifestPath);
	const dependencies = readDependencyRecord(manifest.dependencies);
	if ("openclaw" in dependencies) {
		const { openclaw: _removed, ...nextDependencies } = dependencies;
		await fs$1.writeFile(manifestPath, `${JSON.stringify({
			...manifest,
			private: true,
			dependencies: nextDependencies
		}, null, 2)}\n`, "utf8");
	}
	const lockPath = path.join(params.npmRoot, "package-lock.json");
	try {
		const parsed = JSON.parse(await fs$1.readFile(lockPath, "utf8"));
		let lockChanged = false;
		if (isRecord(parsed.packages)) {
			const rootPackage = parsed.packages[""];
			if (isRecord(rootPackage) && isRecord(rootPackage.dependencies)) {
				const dependenciesValue = { ...rootPackage.dependencies };
				if ("openclaw" in dependenciesValue) {
					delete dependenciesValue.openclaw;
					parsed.packages[""] = {
						...rootPackage,
						dependencies: dependenciesValue
					};
					lockChanged = true;
				}
			}
			if ("node_modules/openclaw" in parsed.packages) {
				delete parsed.packages["node_modules/openclaw"];
				lockChanged = true;
			}
		}
		if (isRecord(parsed.dependencies) && "openclaw" in parsed.dependencies) {
			const dependenciesLocal = { ...parsed.dependencies };
			delete dependenciesLocal.openclaw;
			parsed.dependencies = dependenciesLocal;
			lockChanged = true;
		}
		if (lockChanged) await fs$1.writeFile(lockPath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
	} catch (err) {
		if (err.code !== "ENOENT") throw err;
	}
	const openclawPackageDir = path.join(params.npmRoot, "node_modules", "openclaw");
	if (!params.preservePackageDir && await lstatIfExists(openclawPackageDir)) await fs$1.rm(openclawPackageDir, {
		recursive: true,
		force: true
	});
	const binDir = path.join(params.npmRoot, "node_modules", ".bin");
	await Promise.all([
		"openclaw",
		"openclaw.cmd",
		"openclaw.ps1"
	].map((binName) => fs$1.rm(path.join(binDir, binName), { force: true })));
	await fs$1.rm(path.join(params.npmRoot, "node_modules", ".package-lock.json"), { force: true });
}
/** Read lockfile metadata for an installed dependency in the managed root. */
async function readManagedNpmRootInstalledDependency(params) {
	const lockPath = path.join(params.npmRoot, "package-lock.json");
	const parsed = await readJson(lockPath);
	if (!isRecord(parsed) || !isRecord(parsed.packages)) return null;
	const entry = parsed.packages[`node_modules/${params.packageName}`];
	if (!isRecord(entry)) return null;
	return {
		version: normalizeOptionalString(entry.version),
		integrity: normalizeOptionalString(entry.integrity),
		resolved: normalizeOptionalString(entry.resolved)
	};
}
//#endregion
export { resolveRequiredPlatformPackageNames as _, resolveManagedNpmRootDependencySpec as a, copyManagedNpmProjectInputs as c, isNpmAliasOverrideCompatibilityError as d, listManagedNpmRootPackageNames as f, resolveManagedNpmRootPackageDir as g, resolveManagedNpmRootDependencySpecForInstall as h, repairManagedNpmRootOpenClawPeer as i, formatManagedNpmProjectQuarantineArtifacts as l, resolveManagedNpmInstallPlan as m, readManagedNpmRootInstalledDependency as n, syncManagedNpmRootPeerDependencies as o, quarantineManagedNpmProjectRebuildArtifacts as p, readOpenClawManagedNpmRootOverrides as r, upsertManagedNpmRootDependency as s, listMissingRequiredPlatformPackages as t, isManagedNpmProjectCorruptionInstallFailure as u };
