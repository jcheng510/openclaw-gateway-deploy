import { o as resolveUserPath } from "./home-dir-CjKH62jd.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import "./utils-DUAwk2p5.mjs";
import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { t as KeyedAsyncQueue } from "./keyed-async-queue-CTreGrmR.mjs";
import { h as writeJson, p as tryReadJson } from "./json-files-Br8qKrAz.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { d as resolveSandboxPath } from "./sandbox-paths-IwSGCnhL.mjs";
import { n as resolveSkillTelemetrySource } from "./source-DeRhM-ro.mjs";
import { t as canonicalizePath } from "./paths-CIwQeLl6.mjs";
import { r as resolveSkillKey } from "./frontmatter-CP-MKgNH.mjs";
import { i as loadSkillLibrarySelection, o as readSelectedSkillLibraryFiles } from "./selection-C6VzDZA6.mjs";
import { n as getSkillsResourceVersion, r as getSkillsSnapshotVersion } from "./refresh-state-Cazo5oir.mjs";
import { a as prepareWorkspaceSkills, c as fingerprintSkillSnapshotConfig } from "./workspace-skill-loader-D-k9b5PP.mjs";
import { a as shouldSyncSkillPath } from "./skill-paths-BcXtEU9H.mjs";
import { t as ensureWritableSkillDirectories } from "./skill-directory-modes-BBU-i9ys.mjs";
import fs from "node:fs";
import path from "node:path";
//#region src/skills/loading/workspace-skill-sync.runtime.ts
const fsp = fs.promises;
const skillsLogger = createSubsystemLogger("skills");
const skillsSyncQueue = new KeyedAsyncQueue();
function resolveUniqueSyncedSkillDirName(base, used) {
	if (!used.has(base)) {
		used.add(base);
		return base;
	}
	for (let index = 2;; index += 1) {
		const candidate = `${base}-${index}`;
		if (!used.has(candidate)) {
			used.add(candidate);
			return candidate;
		}
	}
}
const SYNCED_SKILLS_MANIFEST_NAME = ".openclaw-sync.json";
const syncedSkillsUsageCache = /* @__PURE__ */ new Map();
function resolveSyncedSkillIdentity(skillKey, skillName) {
	return JSON.stringify([skillKey, skillName]);
}
function parseSyncedSkillsManifest(value) {
	if (!isRecord(value) || typeof value.skillsVersion !== "number" || !Number.isFinite(value.skillsVersion) || typeof value.skillRootsFingerprint !== "string" || !Array.isArray(value.entryKeys) || !value.entryKeys.every((entry) => typeof entry === "string")) return null;
	return {
		entryKeys: value.entryKeys,
		skillRootsFingerprint: value.skillRootsFingerprint,
		skillsVersion: value.skillsVersion
	};
}
function resolveSyncedSkillsManifestKey(manifest) {
	return JSON.stringify([
		manifest.skillsVersion,
		manifest.skillRootsFingerprint,
		manifest.entryKeys
	]);
}
function resolveSyncedSkillDestinationPath(params) {
	const sourceDirName = (params.entry.syncDirName ?? path.basename(params.entry.skill.baseDir)).trim();
	if (!sourceDirName || sourceDirName === "." || sourceDirName === "..") return null;
	const uniqueDirName = resolveUniqueSyncedSkillDirName(sourceDirName, params.usedDirNames);
	return resolveSandboxPath({
		filePath: uniqueDirName,
		cwd: params.targetSkillsDir,
		root: params.targetSkillsDir
	}).resolved;
}
async function ensureSyncedSkillsDirectory(targetSkillsDir) {
	let stats;
	try {
		stats = await fsp.lstat(targetSkillsDir);
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
		await fsp.mkdir(targetSkillsDir, { recursive: true });
		return;
	}
	if (!stats.isDirectory() || stats.isSymbolicLink()) {
		await fsp.rm(targetSkillsDir, {
			recursive: true,
			force: true
		});
		await fsp.mkdir(targetSkillsDir, { recursive: true });
	}
}
async function syncWorkspaceSkills(params) {
	const sourceDir = resolveUserPath(params.sourceWorkspaceDir);
	const targetDir = resolveUserPath(params.targetWorkspaceDir);
	if (sourceDir === targetDir) return [];
	return await skillsSyncQueue.enqueue(`syncSkills:${targetDir}`, async () => {
		const targetSkillsDir = path.join(targetDir, "skills");
		const manifestPath = path.join(targetSkillsDir, SYNCED_SKILLS_MANIFEST_NAME);
		const skillsSnapshot = params.skillsSnapshot;
		const skillRoots = skillsSnapshot?.skillRoots;
		const sourceWorkspace = skillRoots?.agentWorkspaceDir ?? sourceDir;
		const sourceScope = {
			executionWorkspaceDir: skillRoots?.executionWorkspaceDir,
			agentId: params.agentId
		};
		const skillRootsFingerprint = sha256Hex(JSON.stringify([
			sourceDir,
			params.agentId ? normalizeAgentId(params.agentId) : void 0,
			params.config ? fingerprintSkillSnapshotConfig(params.config) : void 0,
			params.managedSkillsDir,
			params.bundledSkillsDir,
			params.pluginSkillsDir,
			skillRoots?.agentWorkspaceDir,
			skillRoots?.executionWorkspaceDir,
			skillsSnapshot?.librarySelections
		]));
		await ensureSyncedSkillsDirectory(targetSkillsDir);
		const manifest = parseSyncedSkillsManifest(await tryReadJson(manifestPath));
		let sourceVersion = getSkillsResourceVersion(sourceWorkspace, sourceScope);
		let skillsVersion = getSkillsSnapshotVersion(skillRoots?.agentWorkspaceDir ?? sourceDir);
		const expectedManifestKey = skillsSnapshot?.version === skillsVersion ? resolveSyncedSkillsManifestKey({
			entryKeys: skillsSnapshot.skills.map((skill) => resolveSyncedSkillIdentity(skill.skillKey ?? skill.name, skill.name)).toSorted(),
			skillRootsFingerprint,
			skillsVersion
		}) : void 0;
		const cachedUsage = syncedSkillsUsageCache.get(targetSkillsDir);
		const manifestKey = manifest ? resolveSyncedSkillsManifestKey(manifest) : void 0;
		if (expectedManifestKey && manifestKey === expectedManifestKey && cachedUsage?.manifestKey === manifestKey && cachedUsage.sourceVersion === sourceVersion) return cachedUsage.skillUsagePaths.map((entry) => ({ ...entry }));
		const loadOptions = {
			config: params.config,
			skillFilter: params.skillFilter,
			agentId: params.agentId,
			eligibility: params.eligibility,
			managedSkillsDir: params.managedSkillsDir,
			bundledSkillsDir: params.bundledSkillsDir,
			pluginSkillsDir: params.pluginSkillsDir,
			...skillsSnapshot?.skillFilter ? { skillFilter: skillsSnapshot.skillFilter } : {},
			...skillsSnapshot?.skillOverrides ? { skillOverrides: skillsSnapshot.skillOverrides } : {}
		};
		let entries;
		for (;;) {
			sourceVersion = getSkillsResourceVersion(sourceWorkspace, sourceScope);
			skillsVersion = getSkillsSnapshotVersion(skillRoots?.agentWorkspaceDir ?? sourceDir);
			entries = await prepareWorkspaceSkills(skillRoots?.agentWorkspaceDir ?? sourceDir, {
				...loadOptions,
				executionWorkspaceDir: skillRoots?.executionWorkspaceDir
			});
			if (getSkillsSnapshotVersion(sourceWorkspace) === skillsVersion && getSkillsResourceVersion(sourceWorkspace, sourceScope) === sourceVersion) break;
		}
		if (skillsSnapshot?.librarySelections?.length) {
			const selectedNames = new Set(skillsSnapshot.skills.map((skill) => skill.name));
			entries.push(...loadSkillLibrarySelection(skillsSnapshot.librarySelections).filter((entry) => selectedNames.has(entry.skill.name)));
		}
		const usedDirNames = /* @__PURE__ */ new Set();
		const plans = [];
		for (const entry of entries) {
			const identity = resolveSyncedSkillIdentity(resolveSkillKey(entry.skill, entry), entry.skill.name);
			if (entry.skill.filePath.startsWith("node://")) {
				plans.push({
					entry,
					identity
				});
				continue;
			}
			let destinationPath;
			try {
				destinationPath = resolveSyncedSkillDestinationPath({
					targetSkillsDir,
					entry,
					usedDirNames
				});
			} catch (error) {
				const message = error instanceof Error ? error.message : JSON.stringify(error);
				skillsLogger.warn(`Failed to resolve safe destination for ${entry.skill.name}: ${message}`);
				continue;
			}
			if (!destinationPath) {
				skillsLogger.warn(`Failed to resolve safe destination for ${entry.skill.name}: invalid source directory name`);
				continue;
			}
			plans.push({
				destinationPath,
				entry,
				identity
			});
		}
		await fsp.rm(manifestPath, { force: true });
		const previousUsage = cachedUsage && manifest?.skillsVersion === skillsVersion && manifest.skillRootsFingerprint === skillRootsFingerprint && cachedUsage.manifestKey === manifestKey && cachedUsage.sourceVersion === sourceVersion ? cachedUsage : void 0;
		syncedSkillsUsageCache.delete(targetSkillsDir);
		const preservedDestinations = new Set(plans.flatMap((plan) => {
			const destination = plan.destinationPath ? path.basename(plan.destinationPath) : null;
			return previousUsage?.destinations.get(plan.identity) === destination ? destination ? [destination] : [] : [];
		}));
		for (const child of await fsp.readdir(targetSkillsDir)) if (!preservedDestinations.has(child)) {
			const childPath = path.join(targetSkillsDir, child);
			try {
				await fsp.rm(childPath, {
					recursive: true,
					force: true
				});
			} catch (error) {
				const permissionDenied = hasErrnoCode(error, "EACCES") || hasErrnoCode(error, "EPERM");
				if (process.platform === "win32" || !permissionDenied) throw error;
				await ensureWritableSkillDirectories(targetSkillsDir, child);
				await fsp.rm(childPath, {
					recursive: true,
					force: true
				});
			}
		}
		const skillUsagePaths = [];
		let copyFailed = false;
		for (const plan of plans) {
			const { destinationPath, entry } = plan;
			if (!destinationPath) continue;
			if (!preservedDestinations.has(path.basename(destinationPath))) try {
				const pin = skillsSnapshot?.librarySelections?.find((selection) => selection.name === entry.skill.name);
				if (pin) {
					const files = await readSelectedSkillLibraryFiles(pin);
					for (const file of files) {
						const target = path.join(destinationPath, file.path);
						await fsp.mkdir(path.dirname(target), {
							recursive: true,
							mode: 448
						});
						await fsp.writeFile(target, Buffer.from(file.content, file.encoding === "base64" ? "base64" : "utf8"), {
							mode: file.executable ? 320 : 256,
							flag: "wx"
						});
					}
				} else {
					const syncSourceDir = entry.syncSourceDir ?? entry.skill.baseDir;
					await fsp.cp(syncSourceDir, destinationPath, {
						recursive: true,
						force: true,
						filter: shouldSyncSkillPath
					});
					await ensureWritableSkillDirectories(targetSkillsDir, path.basename(destinationPath));
				}
			} catch (error) {
				if (entry.skill.source === "openclaw-library") throw error;
				copyFailed = true;
				const message = error instanceof Error ? error.message : JSON.stringify(error);
				skillsLogger.warn(`Failed to copy ${entry.skill.name} to sandbox: ${message}`);
				continue;
			}
			skillUsagePaths.push({
				readPath: path.join(destinationPath, path.relative(entry.skill.baseDir, entry.skill.filePath)),
				skillFile: canonicalizePath(entry.skill.filePath),
				skillName: entry.skill.name,
				skillSource: resolveSkillTelemetrySource(entry.skill)
			});
		}
		if (!copyFailed) {
			const nextManifest = {
				entryKeys: plans.map((plan) => plan.identity).toSorted(),
				skillRootsFingerprint,
				skillsVersion
			};
			await writeJson(manifestPath, nextManifest, { trailingNewline: true });
			syncedSkillsUsageCache.set(targetSkillsDir, {
				destinations: new Map(plans.flatMap((plan) => plan.destinationPath ? [[plan.identity, path.basename(plan.destinationPath)]] : [])),
				manifestKey: resolveSyncedSkillsManifestKey(nextManifest),
				sourceVersion,
				skillUsagePaths
			});
			pruneMapToMaxSize(syncedSkillsUsageCache, 100);
		}
		return skillUsagePaths;
	});
}
//#endregion
export { syncWorkspaceSkills };
