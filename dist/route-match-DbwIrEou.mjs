import { t as prefixMatchPath } from "./http-path-prefix-BmPCnu1x.mjs";
import { t as getPluginHttpRouteCanonicalPath } from "./http-path-CmuZ01eh.mjs";
import { n as resolvePluginRoutePathContext } from "./path-context-DrlVq_tQ.mjs";
//#region src/gateway/server/plugins-http/route-match.ts
/** Finds matching plugin routes with exact matches ordered before prefix matches. */
function findMatchingPluginHttpRoutes(registry, context) {
	const routes = registry.httpRoutes ?? [];
	if (routes.length === 0) return [];
	const exactMatches = [];
	const prefixMatches = [];
	for (const route of routes) {
		const routePath = getPluginHttpRouteCanonicalPath(route);
		const prefix = route.match === "prefix";
		if (context.candidates.some((candidate) => prefix ? prefixMatchPath(candidate, routePath) : candidate === routePath)) (prefix ? prefixMatches : exactMatches).push(route);
	}
	exactMatches.sort((a, b) => b.path.length - a.path.length);
	prefixMatches.sort((a, b) => b.path.length - a.path.length);
	return [...exactMatches, ...prefixMatches];
}
/** Returns the first registered plugin HTTP route for a raw request path. */
function findRegisteredPluginHttpRoute(registry, pathname) {
	return findMatchingPluginHttpRoutes(registry, resolvePluginRoutePathContext(pathname))[0];
}
/** Convenience predicate for checking whether a raw path is a plugin HTTP route. */
function isRegisteredPluginHttpRoutePath(registry, pathname) {
	return findRegisteredPluginHttpRoute(registry, pathname) !== void 0;
}
//#endregion
export { findRegisteredPluginHttpRoute as n, isRegisteredPluginHttpRoutePath as r, findMatchingPluginHttpRoutes as t };
