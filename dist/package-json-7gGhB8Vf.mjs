import { s as normalizeNullableString } from "./string-coerce-6kR-86XC.mjs";
import { r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { p as tryReadJson } from "./json-files-Br8qKrAz.mjs";
import path from "node:path";
//#region src/infra/package-json.ts
/** Reads package.json as a loose object, returning null for missing or invalid manifests. */
async function readPackageJson(root, options) {
	return asNullableRecord(await tryReadJson(path.join(root, "package.json"), options));
}
/** Reads and trims the package version string, returning null for blank or non-string values. */
async function readPackageVersion(root, options) {
	return normalizeNullableString((await readPackageJson(root, options))?.version);
}
/** Reads and trims the package name string, returning null for blank or non-string values. */
async function readPackageName(root) {
	return normalizeNullableString((await readPackageJson(root))?.name);
}
/** Reads and trims the packageManager spec, returning null for blank or non-string values. */
async function readPackageManagerSpec(root) {
	return normalizeNullableString((await readPackageJson(root))?.packageManager);
}
//#endregion
export { readPackageName as n, readPackageVersion as r, readPackageManagerSpec as t };
