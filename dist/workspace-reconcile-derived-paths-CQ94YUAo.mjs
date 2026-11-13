import { t as FsSafeError, w as root } from "./fs-safe-CHQXnCPk.mjs";
import { c as stagedInputDirectoriesFromEntries, i as createStagedInputPathMatcher, o as isStagedInputPath } from "./staged-inputs-DnU0MDyo.mjs";
import { i as isManagedSandboxSkillsPath } from "./sandbox-workspace-paths-8lp0pLw0.mjs";
import { h as isDerivedWorkspacePath } from "./workspace-manifest-CARUR9sD.mjs";
import path from "node:path";
import fs from "node:fs/promises";
//#region src/gateway/worker-environments/workspace-reconcile-derived-paths.ts
function reconciliationEntries(entries, stagedInputDirectories = stagedInputDirectoriesFromEntries(entries)) {
	return entries.filter((entry) => !isDerivedWorkspacePath(entry.path, isStagedInputPath(entry.path, stagedInputDirectories)));
}
function reconciliationDirectories(directories, stagedInputDirectories) {
	return (directories ?? []).filter((directory) => !isDerivedWorkspacePath(directory, isStagedInputPath(directory, stagedInputDirectories)));
}
async function removeDerivedWorkspaceDescendants(root, relativeDirectory, isRetainedInput) {
	for (const entry of await root.list(relativeDirectory, { withFileTypes: true })) {
		const child = relativeDirectory ? `${relativeDirectory}/${entry.name}` : entry.name;
		if (isManagedSandboxSkillsPath(child)) continue;
		if (isDerivedWorkspacePath(child, await isRetainedInput(child))) {
			await removeDerivedWorkspaceEntry(root, child, entry.isDirectory);
			continue;
		}
		if (entry.isDirectory) {
			await removeDerivedWorkspaceDescendants(root, child, isRetainedInput);
			if ((await root.list(child)).length === 0) await root.remove(child);
		}
	}
}
async function removeDerivedWorkspaceEntry(root, relativePath, isDirectory) {
	if (isDirectory) {
		let entries;
		try {
			entries = await root.list(relativePath, { withFileTypes: true });
		} catch (error) {
			if (!(error instanceof FsSafeError) || !["not-found", "path-alias"].includes(error.code)) throw error;
			entries = void 0;
		}
		for (const entry of entries ?? []) await removeDerivedWorkspaceEntry(root, `${relativePath}/${entry.name}`, entry.isDirectory);
	}
	await root.remove(relativePath).catch((error) => {
		if (!(error instanceof FsSafeError) || error.code !== "not-found") throw error;
	});
}
async function hasWorkspaceSymlinkAncestor(root, relativePath) {
	const segments = relativePath.split("/");
	for (let index = 1; index < segments.length; index += 1) if ((await fs.lstat(path.join(root, ...segments.slice(0, index))).catch(() => void 0))?.isSymbolicLink()) return true;
	return false;
}
async function prepareNonDirectoryTargets(root$1, entries, retainedInput, assertCurrent) {
	const workspaceRoot = await root(root$1, { assertBeforeMutation: assertCurrent });
	const isRetainedInput = retainedInput ?? createStagedInputPathMatcher(workspaceRoot);
	for (const entry of entries) {
		if (await hasWorkspaceSymlinkAncestor(root$1, entry.path)) continue;
		let stats;
		try {
			stats = await workspaceRoot.stat(entry.path);
		} catch (error) {
			if (error instanceof FsSafeError && ["not-found", "path-alias"].includes(error.code)) continue;
			throw error;
		}
		if (stats.isDirectory) {
			await removeDerivedWorkspaceDescendants(workspaceRoot, entry.path, isRetainedInput);
			if ((await workspaceRoot.list(entry.path)).length === 0) await workspaceRoot.remove(entry.path);
		}
	}
}
//#endregion
export { reconciliationDirectories as n, reconciliationEntries as r, prepareNonDirectoryTargets as t };
