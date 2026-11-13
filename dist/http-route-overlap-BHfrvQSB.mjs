import { t as prefixMatchPath } from "./http-path-prefix-BmPCnu1x.mjs";
import { t as getPluginHttpRouteCanonicalPath } from "./http-path-CmuZ01eh.mjs";
//#region src/plugins/http-route-overlap.ts
/** Detects conflicting plugin HTTP routes before Gateway registration accepts them. */
function doPluginHttpRoutesOverlap(a, b) {
	const aPath = getPluginHttpRouteCanonicalPath(a);
	const bPath = getPluginHttpRouteCanonicalPath(b);
	if (a.match === "exact" && b.match === "exact") return aPath === bPath;
	if (a.match === "prefix" && b.match === "prefix") return prefixMatchPath(aPath, bPath) || prefixMatchPath(bPath, aPath);
	return a.match === "prefix" ? prefixMatchPath(bPath, aPath) : prefixMatchPath(aPath, bPath);
}
/** Resolves the collision classes shared by static and lifecycle route registration. */
function findPluginHttpRouteRegistrationConflicts(routes, candidate) {
	const canonicalCandidatePath = getPluginHttpRouteCanonicalPath(candidate);
	let authOverlap;
	const canonicalMatches = [];
	for (const route of routes) {
		if (!authOverlap && route.auth !== candidate.auth && doPluginHttpRoutesOverlap(route, candidate)) authOverlap = route;
		if (route.match === candidate.match && getPluginHttpRouteCanonicalPath(route) === canonicalCandidatePath) canonicalMatches.push(route);
	}
	return {
		authOverlap,
		canonicalMatches
	};
}
//#endregion
export { findPluginHttpRouteRegistrationConflicts as t };
