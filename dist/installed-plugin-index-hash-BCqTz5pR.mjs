import { t as stableStringify } from "./stable-stringify-CkQ0IEj1.mjs";
import fs from "node:fs";
import crypto from "node:crypto";
import { safeStatSync } from "@openclaw/fs-safe/path";
//#region src/plugins/installed-plugin-index-hash.ts
function hashString(value) {
	return crypto.createHash("sha256").update(value).digest("hex");
}
/** Hashes JSON-serializable data with SHA-256. */
function hashJson(value) {
	return hashString(JSON.stringify(value));
}
/** Hashes JSON-like data independently of object property insertion order. */
function hashStableJson(value) {
	return hashString(stableStringify(value));
}
/** Safely hashes a file, optionally recording required-file diagnostics. */
function safeHashFile(params) {
	try {
		return crypto.createHash("sha256").update(fs.readFileSync(params.filePath)).digest("hex");
	} catch (err) {
		if (params.required) params.diagnostics.push({
			level: "warn",
			...params.pluginId ? { pluginId: params.pluginId } : {},
			source: params.filePath,
			message: `installed plugin index could not hash ${params.filePath}: ${err instanceof Error ? err.message : String(err)}`
		});
		return;
	}
}
/** Reads a safe file signature for installed plugin index freshness checks. */
function safeFileSignature(filePath) {
	const stat = safeStatSync(filePath);
	return stat?.isFile() ? {
		size: stat.size,
		mtimeMs: stat.mtimeMs,
		ctimeMs: stat.ctimeMs
	} : void 0;
}
//#endregion
export { safeHashFile as i, hashStableJson as n, safeFileSignature as r, hashJson as t };
