import { r as isMissingPathError } from "./errno-FR4CRyya.mjs";
import "./errors-YPvSaqwO.mjs";
import { n as resolvePreferredOpenClawTmpDir } from "./tmp-openclaw-dir-BSb3HetY.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { r as removeTemporaryArtifacts } from "./temp-artifact-cleanup-DA2wQVhY.mjs";
import { r as acquireFileLock } from "./file-lock-B1Bd3Xow.mjs";
import "./file-lock-C-MFU0Wb.mjs";
import "./skill-library-_14Y6Z0i.mjs";
import { i as getAgentWorkspaceAccess, t as WorkspaceAccessUnavailableError } from "./workspace-access-DIRgQG5g.mjs";
import { n as createSyntheticSourceInfo } from "./source-info-CcFiWAof.mjs";
import { f as SkillLibraryError, i as prepareSkillBundle, l as skillLibraryRevisionDir, n as SkillTreeDirectoryError, o as readSkillBundleTree, s as readSkillLibraryManifestTree } from "./bundle-CzzuTN6V.mjs";
import { E as readSkillLibrarySelectionManifests, a as prepareSkillLibrarySelection, n as captureSkillLibrarySelection } from "./selection-C6VzDZA6.mjs";
import { t as resolveSkillResourceCandidates } from "./resource-candidates-C5O2TUrB.mjs";
import { a as normalizeSkillIndexName } from "./skill-index-ZDYIG8ML.mjs";
import { a as shouldSyncSkillPath, l as loadSingleSkillDirectory } from "./skill-paths-BcXtEU9H.mjs";
import { t as formatSkillsForPromptBounded } from "./skill-prompt-limits-C-s0zftf.mjs";
import { n as SkillResourceDeliverySchema } from "./skill-resources-Dy3IiPns.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";
import { Value } from "typebox/value";
//#region src/skills/runtime/resources.ts
const log = createSubsystemLogger("skills/resources");
function contextualizeSkillResourceError(skill, error) {
	const detail = error instanceof Error ? error.message : String(error);
	const message = `Failed to prepare skill resources: skill=${JSON.stringify(skill.name)} root=${JSON.stringify(skill.baseDir)} error=${detail}`;
	if (error instanceof SkillLibraryError) return new SkillLibraryError(error.code, message, error.currentRevision, { cause: error });
	return new SkillLibraryError("INVALID_BUNDLE", message, void 0, { cause: error });
}
function isMissingDiscoveredSkillRoot(error) {
	return error instanceof SkillTreeDirectoryError && path.resolve(error.failedPath) === path.resolve(error.rootPath) && isMissingPathError(error.cause);
}
async function resolveExplicitSkillResource(selection) {
	const skillDir = path.dirname(selection.path);
	const rootRealPath = await fs.realpath(skillDir);
	return loadSingleSkillDirectory({
		skillDir,
		rootRealPath,
		source: "openclaw-resources",
		maxBytes: 1048576
	})?.skill ?? null;
}
async function readSkillResourceFiles(skill, options) {
	try {
		return await readSkillBundleTree(skill.baseDir, shouldSyncSkillPath, {
			symlinks: "follow-within-root",
			assertFileAccess: options.assertFileAccess
		});
	} catch (error) {
		if (options.allowMissingRoot && isMissingDiscoveredSkillRoot(error)) {
			log.warn("Skipping stale discovered skill during worker resource preparation.", {
				skill: skill.name,
				root: skill.baseDir,
				failedPath: error.failedPath,
				error: error.message
			});
			return null;
		}
		throw error;
	}
}
const localSkillResourceReader = {
	readInstructions: (filePath, options) => fs.readFile(filePath, {
		...options,
		encoding: "utf8"
	}),
	resolveExplicitSkill: resolveExplicitSkillResource,
	readSkillFiles: readSkillResourceFiles
};
async function prepareSkillResourceDelivery(inputSnapshot, assertCurrent, inputExplicitSelections = [], workspaceDir) {
	if (!inputSnapshot) return;
	assertCurrent();
	if (!inputSnapshot.resolvedSkills?.length && !inputSnapshot.librarySelections?.length && !inputExplicitSelections.length) return;
	const snapshot = {
		...inputSnapshot,
		librarySelections: captureSkillLibrarySelection(inputSnapshot.librarySelections ?? []),
		skills: inputSnapshot.skills.map((skill) => ({ ...skill })),
		resolvedSkills: inputSnapshot.resolvedSkills?.map((skill) => ({ ...skill })),
		skillRoots: inputSnapshot.skillRoots && { ...inputSnapshot.skillRoots }
	};
	const explicitSelections = inputExplicitSelections.map((selection) => ({ ...selection }));
	let sourceReader;
	const getSourceReader = (skill) => {
		if (skill?.fileHost === "gateway") return localSkillResourceReader;
		if (!sourceReader) {
			const sourceWorkspace = snapshot.skillRoots?.agentWorkspaceDir ?? workspaceDir;
			const access = sourceWorkspace ? getAgentWorkspaceAccess(sourceWorkspace, "loadSkills") : void 0;
			if (access?.loadSkills && !access.skillResources) throw new WorkspaceAccessUnavailableError("Remote workspace skill resources are unavailable");
			sourceReader = (access?.loadSkills ? access.skillResources : void 0) ?? localSkillResourceReader;
		}
		return sourceReader;
	};
	const skills = [];
	let total = 0;
	const libraryContext = snapshot.librarySelections?.length ? captureOpenClawStateWorkerContext() : void 0;
	const assertLibraryCurrent = () => {
		assertCurrent();
		libraryContext?.maintenanceScope?.assertAdmission();
		libraryContext?.admission.assertCurrent();
	};
	const libraryOptions = { env: libraryContext?.environment };
	const libraryEntries = libraryContext ? await prepareSkillLibrarySelection(snapshot.librarySelections ?? [], libraryOptions, assertLibraryCurrent) : [];
	assertLibraryCurrent();
	const candidates = resolveSkillResourceCandidates(snapshot, libraryEntries);
	for (const selected of explicitSelections) {
		if (selected.path.startsWith("node://") || candidates.some((skill) => skill.filePath === selected.path)) continue;
		const skillDir = path.dirname(selected.path);
		const gatewayOwned = snapshot.skills.some((skill) => skill.gatewayFilePath === selected.path);
		let loaded;
		try {
			loaded = await (gatewayOwned ? localSkillResourceReader : getSourceReader()).resolveExplicitSkill(selected);
			if (loaded) loaded = {
				...loaded,
				fileHost: gatewayOwned ? "gateway" : "workspace"
			};
		} catch (error) {
			throw contextualizeSkillResourceError({
				name: selected.name,
				baseDir: skillDir
			}, error);
		}
		assertLibraryCurrent();
		if (!loaded || loaded.filePath !== selected.path || !snapshot.skills.some((skill) => skill.name === loaded.name) || candidates.some((skill) => skill.name === loaded.name)) throw new Error(`Explicit skill no longer matches the prepared catalog: skill=${JSON.stringify(selected.name)} root=${JSON.stringify(skillDir)} path=${JSON.stringify(selected.path)}. Refresh skill selection and retry.`);
		candidates.push(loaded);
	}
	const pins = [...new Set(candidates.flatMap((skill) => {
		const pin = !skill.filePath.startsWith("node://") && snapshot.librarySelections?.find((selection) => selection.name === skill.name);
		return pin ? [pin] : [];
	}))];
	let manifests;
	for (const skill of candidates) {
		if (skill.filePath.startsWith("node://")) continue;
		const pin = snapshot.librarySelections?.find((selection) => selection.name === skill.name);
		const explicitlySelected = explicitSelections.some((selection) => selection.path === skill.filePath);
		let files;
		try {
			if (pin) {
				assertLibraryCurrent();
				if (!manifests) {
					manifests = await readSkillLibrarySelectionManifests(pins, libraryOptions);
					assertLibraryCurrent();
				}
				const manifest = manifests?.[pins.indexOf(pin)];
				if (!manifest) throw new SkillLibraryError("NOT_FOUND", "Selected skill revision is unavailable.");
				files = await readSkillLibraryManifestTree(skillLibraryRevisionDir(pin.skillId, pin.revision, libraryContext?.environment), manifest.files_json, pin.revision);
			} else files = await getSourceReader(skill).readSkillFiles(skill, { allowMissingRoot: !explicitlySelected });
		} catch (error) {
			throw contextualizeSkillResourceError(skill, error);
		}
		assertLibraryCurrent();
		if (files === null) {
			if (explicitlySelected) throw contextualizeSkillResourceError(skill, /* @__PURE__ */ new Error("Explicit skill root is unavailable"));
			continue;
		}
		let bundle;
		try {
			bundle = prepareSkillBundle(files);
		} catch (error) {
			throw contextualizeSkillResourceError(skill, error);
		}
		total += bundle.files.reduce((sum, file) => sum + file.sizeBytes, 0);
		if (total > 8388608) throw new Error("Selected skill resources exceed the worker delivery limit (8 MiB). Select fewer skills before retrying.");
		skills.push({
			name: skill.name,
			sourcePath: skill.filePath,
			modelVisible: (snapshot.resolvedSkills?.some((selected) => selected.filePath === skill.filePath) ?? false) || explicitlySelected,
			...skill.displayName ? { displayName: skill.displayName } : {},
			description: skill.description,
			revision: bundle.revision,
			files
		});
	}
	const delivery = {
		version: 1,
		skills
	};
	if (!Value.Check(SkillResourceDeliverySchema, delivery)) throw new Error("Selected skill catalog exceeds the worker resource contract.");
	return delivery;
}
/** Owns private turn inputs independently of credential-bearing worker state. */
async function materializeSkillResources(delivery, assertCurrent, scope) {
	if (!Value.Check(SkillResourceDeliverySchema, delivery)) throw new Error("Invalid skill resource delivery.");
	const bundles = delivery.skills.map((skill) => ({
		skill,
		bundle: prepareSkillBundle(skill.files)
	})).toSorted((left, right) => {
		const a = JSON.stringify([
			left.skill.name,
			left.skill.sourcePath,
			left.bundle.revision
		]);
		const b = JSON.stringify([
			right.skill.name,
			right.skill.sourcePath,
			right.bundle.revision
		]);
		return a < b ? -1 : a > b ? 1 : 0;
	});
	if (bundles.some(({ skill, bundle }) => skill.revision !== bundle.revision) || bundles.reduce((sum, { bundle }) => sum + bundle.files.reduce((bytes, file) => bytes + file.sizeBytes, 0), 0) > 8388608) throw new Error("Skill resource integrity or delivery limit check failed.");
	assertCurrent();
	const directory = scope ? path.join(resolvePreferredOpenClawTmpDir(), `skill-resources-${sha256Hex(JSON.stringify([scope.sessionId, scope.workspaceDir])).slice(0, 16)}`) : await fs.mkdtemp(path.join(os.tmpdir(), "openclaw-skill-resources-"));
	const lock = scope ? await acquireFileLock(directory, {
		retries: {
			retries: 0,
			factor: 1,
			minTimeout: 0,
			maxTimeout: 0
		},
		stale: 0,
		staleRecovery: "remove-if-definitely-stale"
	}) : void 0;
	let cleanupPromise;
	const cleanup = () => cleanupPromise ??= (async () => {
		try {
			await removeTemporaryArtifacts(directory, "Materialized skill");
		} finally {
			await lock?.release();
		}
	})();
	try {
		if (scope) {
			assertCurrent();
			await fs.rm(directory, {
				recursive: true,
				force: true
			});
			assertCurrent();
			await fs.mkdir(directory, { mode: 448 });
		}
		const pathMappings = [];
		const resolvedSkills = [];
		for (const { skill, bundle } of bundles) {
			const name = normalizeSkillIndexName(skill.name).slice(0, 40) || "skill";
			const baseDir = path.join(directory, `${name}-${sha256Hex(JSON.stringify([
				skill.name,
				skill.sourcePath,
				bundle.revision
			])).slice(0, 12)}`);
			for (const file of bundle.files) {
				assertCurrent();
				const target = path.join(baseDir, file.path);
				await fs.mkdir(path.dirname(target), {
					recursive: true,
					mode: 448
				});
				assertCurrent();
				await fs.writeFile(target, file.bytes, {
					mode: file.executable ? 320 : 256,
					flag: "wx"
				});
			}
			const filePath = path.join(baseDir, "SKILL.md");
			if (skill.sourcePath) {
				pathMappings.push([skill.sourcePath, filePath]);
				pathMappings.push([skill.sourcePath.slice(0, -8), `${baseDir}${path.sep}`]);
			}
			resolvedSkills.push({
				name: skill.name,
				displayName: skill.displayName,
				description: skill.description,
				contentHash: bundle.revision,
				filePath,
				baseDir,
				source: "openclaw-resources",
				sourceInfo: createSyntheticSourceInfo(filePath, {
					source: "openclaw-resources",
					baseDir
				}),
				disableModelInvocation: skill.modelVisible === false
			});
		}
		assertCurrent();
		return {
			directory,
			snapshot: {
				skills: resolvedSkills.map((skill) => ({
					name: skill.name,
					skillKey: skill.name
				})),
				resolvedSkills,
				prompt: formatSkillsForPromptBounded({
					skills: resolvedSkills.filter((skill) => !skill.disableModelInvocation),
					preserveOrder: true
				})
			},
			rewriteReferences: (text) => pathMappings.reduce((rewritten, [source, target]) => rewritten.replaceAll(source, target), text),
			cleanup
		};
	} catch (error) {
		await cleanup();
		throw error;
	}
}
//#endregion
export { resolveExplicitSkillResource as i, prepareSkillResourceDelivery as n, readSkillResourceFiles as r, materializeSkillResources as t };
