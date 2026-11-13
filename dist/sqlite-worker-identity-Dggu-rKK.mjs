import { t as hasErrnoCode } from "./errno-FR4CRyya.mjs";
import { realpathSync, statSync } from "node:fs";
import path from "node:path";
import { realpath, stat } from "node:fs/promises";
//#region src/infra/sqlite-worker-identity.ts
function existingIdentity(file, canonicalFile, canonicalPath) {
	if (!file.isFile()) throw new Error("SQLite worker database path must identify a regular file");
	if (file.dev !== canonicalFile.dev || file.ino !== canonicalFile.ino || file.birthtimeNs !== canonicalFile.birthtimeNs) throw new Error("SQLite database pathname changed during admission");
	return {
		key: `file:${file.dev}:${file.ino}`,
		canonicalPath,
		birthtime: file.birthtimeNs.toString()
	};
}
/** Inspect a native-owner path without replacing its diagnostic for a non-file target. */
function inspectDatabasePathIdentitySync(databasePath) {
	const resolvedPath = path.resolve(databasePath);
	let file;
	try {
		file = statSync(resolvedPath, { bigint: true });
	} catch (error) {
		if (!hasErrnoCode(error, "ENOENT")) throw error;
	}
	if (file) {
		if (!file.isFile()) return;
		const canonicalPath = realpathSync.native(resolvedPath);
		return existingIdentity(file, statSync(canonicalPath, { bigint: true }), canonicalPath);
	}
	const missing = [];
	let ancestor = resolvedPath;
	while (true) try {
		const canonicalPath = path.join(realpathSync.native(ancestor), ...missing);
		return {
			key: `path:${canonicalPath}`,
			canonicalPath
		};
	} catch (error) {
		if (!hasErrnoCode(error, "ENOENT")) throw error;
		missing.unshift(path.basename(ancestor));
		const parent = path.dirname(ancestor);
		if (parent === ancestor) throw error;
		ancestor = parent;
	}
}
/** Capture identity before yielding; worker admission requires a regular file or absent path. */
function readDatabasePathIdentitySync(databasePath) {
	const identity = inspectDatabasePathIdentitySync(databasePath);
	if (!identity) throw new Error("SQLite worker database path must identify a regular file");
	return identity;
}
/** Inspect retained aliases only while binding a newly observed database path. */
function findChangedDatabasePaths(paths, observed) {
	return [...paths].filter((pathname) => inspectDatabasePathIdentitySync(pathname)?.key !== observed.key);
}
async function readDatabasePathIdentity(databasePath) {
	const file = await stat(databasePath, { bigint: true }).catch((error) => {
		if (hasErrnoCode(error, "ENOENT")) return;
		throw error;
	});
	if (file) try {
		const canonicalPath = await realpath(databasePath);
		return existingIdentity(file, await stat(canonicalPath, { bigint: true }), canonicalPath);
	} catch (error) {
		if (hasErrnoCode(error, "ENOENT")) throw new Error("SQLite database pathname changed during admission", { cause: error });
		throw error;
	}
	const missing = [];
	let ancestor = databasePath;
	while (true) try {
		const canonicalPath = path.join(await realpath(ancestor), ...missing);
		return {
			key: `path:${canonicalPath}`,
			canonicalPath
		};
	} catch (error) {
		if (!hasErrnoCode(error, "ENOENT")) throw error;
		missing.unshift(path.basename(ancestor));
		const parent = path.dirname(ancestor);
		if (parent === ancestor) throw error;
		ancestor = parent;
	}
}
function assertExistingDatabaseIdentity(databasePath, expected, expectedBirthtime) {
	const file = statSync(databasePath, { bigint: true });
	if (!file.isFile() || `file:${file.dev}:${file.ino}` !== expected || expectedBirthtime !== void 0 && file.birthtimeNs.toString() !== expectedBirthtime) throw new Error("SQLite database file identity changed before existing-only open");
}
//#endregion
export { readDatabasePathIdentitySync as a, readDatabasePathIdentity as i, findChangedDatabasePaths as n, inspectDatabasePathIdentitySync as r, assertExistingDatabaseIdentity as t };
