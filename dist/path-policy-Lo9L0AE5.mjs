import { f as pathExistsSync } from "./fs-safe-CHQXnCPk.mjs";
import { o as normalizeWindowsPathPreservingCase } from "./path-guards-CH7noY0Z.mjs";
import { u as resolveSandboxInputPath } from "./sandbox-paths-IwSGCnhL.mjs";
import path from "node:path";
//#region src/agents/path-policy.ts
/**
* Shared workspace and sandbox path boundary helpers.
*
* Converts validated absolute or relative inputs into root-relative paths without allowing boundary escapes.
*/
/** Compare resolved runtime paths using the declared root's syntax, never the host OS. */
function relativePathInsideSandboxRoot(root, target) {
	const windows = !root.startsWith("/") && path.win32.isAbsolute(root);
	const syntax = windows ? path.win32 : path.posix;
	const normalize = windows ? normalizeWindowsPathPreservingCase : path.posix.normalize;
	const normalizedRoot = normalize(root);
	const normalizedTarget = normalize(target);
	if (!syntax.isAbsolute(normalizedRoot) || !syntax.isAbsolute(normalizedTarget) || windows && (path.win32.parse(normalizedRoot).root === "\\" || path.win32.parse(normalizedTarget).root === "\\")) return null;
	const relative = syntax.relative(normalizedRoot, normalizedTarget);
	return relative === ".." || relative.startsWith(`..${syntax.sep}`) || syntax.isAbsolute(relative) ? null : relative;
}
/** Select the deepest admitted mapping without replacing a supplied miss with a host fallback. */
function resolveSandboxPathMapping(mappings, target) {
	let selected;
	for (const mapping of mappings) {
		const relative = relativePathInsideSandboxRoot(mapping.containerRoot, target);
		if (relative === null || selected && relative.length >= selected.relative.length) continue;
		const separator = mapping.containerRoot.startsWith("/") ? "/" : "\\";
		selected = {
			mapping,
			relative,
			hostPath: path.resolve(mapping.hostRoot, ...relative.split(separator))
		};
	}
	return selected ? {
		mapping: selected.mapping,
		hostPath: selected.hostPath
	} : null;
}
function throwPathEscapesBoundary(params) {
	const boundary = params.options?.boundaryLabel ?? "workspace root";
	const suffix = params.options?.includeRootInError ? ` (${params.rootResolved})` : "";
	throw new Error(`Path escapes ${boundary}${suffix}: ${params.candidate}`);
}
function validateRelativePathWithinBoundary(params) {
	if (params.relativePath === "" || params.relativePath === ".") {
		if (params.options?.allowRoot) return "";
		throwPathEscapesBoundary({
			options: params.options,
			rootResolved: params.rootResolved,
			candidate: params.candidate
		});
	}
	if (params.relativePath === ".." || params.relativePath.startsWith("../") || params.relativePath.startsWith("..\\") || params.isAbsolutePath(params.relativePath)) throwPathEscapesBoundary({
		options: params.options,
		rootResolved: params.rootResolved,
		candidate: params.candidate
	});
	return params.relativePath;
}
function toRelativePathUnderRoot(params) {
	const resolvedInput = resolveSandboxInputPath(params.candidate, params.options?.cwd ?? params.root);
	const windows = process.platform === "win32";
	const syntax = windows ? path.win32 : path;
	const rootResolved = syntax.resolve(params.root);
	const resolvedCandidate = syntax.resolve(resolvedInput);
	return validateRelativePathWithinBoundary({
		relativePath: syntax.relative(windows ? normalizeWindowsPathPreservingCase(rootResolved) : rootResolved, windows ? normalizeWindowsPathPreservingCase(resolvedCandidate) : resolvedCandidate),
		isAbsolutePath: syntax.isAbsolute,
		options: params.options,
		rootResolved,
		candidate: params.candidate
	});
}
/**
* Return a workspace-relative path for a candidate path after rejecting paths
* that escape the workspace root.
*/
function toRelativeWorkspacePath(root, candidate, options) {
	return toRelativePathUnderRoot({
		root,
		candidate,
		options: {
			allowRoot: options?.allowRoot,
			cwd: options?.cwd,
			boundaryLabel: "workspace root"
		}
	});
}
/**
* Return a sandbox-relative path for a candidate path after rejecting paths that
* escape the sandbox root. Errors include the sandbox root for operator clarity.
*/
function toRelativeSandboxPath(root, candidate, options) {
	return toRelativePathUnderRoot({
		root,
		candidate,
		options: {
			allowRoot: options?.allowRoot,
			cwd: options?.cwd,
			boundaryLabel: "sandbox root",
			includeRootInError: true
		}
	});
}
/** Resolve a user-supplied path against `cwd` using the sandbox input rules. */
function resolvePathFromInput(filePath, cwd) {
	return path.normalize(resolveSandboxInputPath(filePath, cwd));
}
function preserveAtPrefixedRelativePath(filePath, cwd, bridge, signal) {
	if (!filePath.startsWith("@")) return filePath;
	const stripped = filePath.slice(1);
	if (!stripped || stripped === "~" || stripped.startsWith("~/") || stripped.startsWith("~\\") || /^file:\/\//i.test(stripped) || path.posix.isAbsolute(stripped) || path.win32.isAbsolute(stripped)) return filePath;
	const literalPath = `./${filePath}`;
	let literalAncestor = filePath;
	while (true) {
		const parent = path.dirname(literalAncestor);
		if (parent === "." || parent === literalAncestor) break;
		literalAncestor = parent;
	}
	const ancestorPath = literalAncestor === filePath ? void 0 : `./${literalAncestor}`;
	const mountedHostPath = bridge?.resolvePath({
		filePath: literalPath,
		cwd
	}).hostPath;
	if (!bridge || mountedHostPath) {
		const hostPath = mountedHostPath ?? path.resolve(cwd, literalPath);
		const ancestorHostPath = ancestorPath ? bridge ? bridge.resolvePath({
			filePath: ancestorPath,
			cwd
		}).hostPath : path.resolve(cwd, ancestorPath) : void 0;
		return pathExistsSync(hostPath) || ancestorHostPath && pathExistsSync(ancestorHostPath) ? literalPath : filePath;
	}
	signal?.throwIfAborted();
	return bridge.stat({
		filePath: literalPath,
		cwd,
		signal
	}).then(async (stat) => stat || ancestorPath && await bridge.stat({
		filePath: ancestorPath,
		cwd,
		signal
	}) ? literalPath : filePath);
}
//#endregion
export { toRelativeSandboxPath as a, resolveSandboxPathMapping as i, relativePathInsideSandboxRoot as n, toRelativeWorkspacePath as o, resolvePathFromInput as r, preserveAtPrefixedRelativePath as t };
