import { t as resolveIdentityPathViaExistingAncestorSync } from "./boundary-path-CAv_plX7.mjs";
import { a as matchesAgentDatabaseReadCandidatePath } from "./openclaw-agent-db-resources-DZhhXFbz.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import path from "node:path";
//#region src/config/sessions/session-store-read-candidates.ts
function measureSessionStoreTargetInventoryInputBytes(request) {
	let bytes = JSON.stringify(request).length * 2;
	for (const [agentId, paths] of request.paths) bytes += 2 * (agentId.length + paths.configured.length + paths.default.length);
	return bytes;
}
function resolveCapturedSessionStorePath(store, agentId, env, paths, kind = "configured") {
	if (!paths) return resolveSessionStorePathCore(kind === "default" ? void 0 : store, {
		agentId,
		env
	});
	const captured = paths.get(agentId);
	if (!captured) throw new Error(`Session store path was not captured for ${agentId}`);
	return captured[kind];
}
/** Families follow their directory; existing file aliases get separate exact captures. */
function captureSessionStoreReadCandidate(pathname, scope) {
	const capturedPath = path.resolve(pathname);
	return {
		path: capturedPath,
		physicalPath: scope ? path.join(resolveIdentityPathViaExistingAncestorSync(path.dirname(capturedPath)), path.basename(capturedPath)) : resolveIdentityPathViaExistingAncestorSync(capturedPath),
		...scope ? { scope } : {}
	};
}
/** Native discovery may use only the captured lexical and physical family together. */
function assertSessionStoreReadCandidate(pathname, candidates) {
	const physicalPath = resolveIdentityPathViaExistingAncestorSync(pathname);
	for (const candidate of candidates) if (matchesAgentDatabaseReadCandidatePath(candidate, pathname) && matchesAgentDatabaseReadCandidatePath({
		...candidate,
		path: candidate.physicalPath
	}, physicalPath) && captureSessionStoreReadCandidate(candidate.path, candidate.scope).physicalPath === candidate.physicalPath) return physicalPath;
	throw new Error(`Session database target changed outside captured discovery custody: ${pathname}`);
}
//#endregion
export { resolveCapturedSessionStorePath as i, captureSessionStoreReadCandidate as n, measureSessionStoreTargetInventoryInputBytes as r, assertSessionStoreReadCandidate as t };
