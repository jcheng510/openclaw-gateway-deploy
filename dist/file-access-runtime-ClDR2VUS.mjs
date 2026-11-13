import { D as statRegularFileSync } from "./fs-safe-CHQXnCPk.mjs";
import "./path-guards-CH7noY0Z.mjs";
import "./boundary-file-read-CCth2Hwg.mjs";
import "./directory-durability-fWp4i1Sl.mjs";
import "./file-descriptor-B4yBUiAP.mjs";
import { r as removePathWithinRoot$1 } from "./fs-safe-remove-DuP7yp5L.mjs";
import "./file-range-jGKnMXJ2.mjs";
import "./staged-inputs-DnU0MDyo.mjs";
import { assertNoSymlinkParents as assertNoSymlinkParents$1, assertNoSymlinkParentsSync as assertNoSymlinkParentsSync$1, basenameFromMediaSource as basenameFromMediaSource$1, readFileHandleBounded as readFileHandleBounded$1, readFileWindowFully as readFileWindowFully$1, resolvePathPrefixSync as resolvePathPrefixSync$1, safeFileURLToPath as safeFileURLToPath$1, tempFile as tempFile$1 } from "@openclaw/fs-safe/advanced";
import { inspectPathPermissions as inspectPathPermissions$1 } from "@openclaw/fs-safe/permissions";
//#region src/plugin-sdk/file-access-runtime.ts
/** Return whether a path resolves to a regular file, treating filesystem errors as missing. */
function fileExists(filePath) {
	try {
		return !statRegularFileSync(filePath).missing;
	} catch {
		return false;
	}
}
const removePathWithinRoot = removePathWithinRoot$1;
//#endregion
export { inspectPathPermissions$1 as a, removePathWithinRoot as c, tempFile$1 as d, fileExists as i, resolvePathPrefixSync$1 as l, assertNoSymlinkParentsSync$1 as n, readFileHandleBounded$1 as o, basenameFromMediaSource$1 as r, readFileWindowFully$1 as s, assertNoSymlinkParents$1 as t, safeFileURLToPath$1 as u };
