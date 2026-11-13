//#region src/infra/deferred-plugin-migration-warnings.ts
/** Match both shipped warning forms without reading retired migration reports. */
async function readResolvedDeferredPluginMigrationWarnings(messages) {
	const pluginWarnings = /* @__PURE__ */ new Map();
	for (const message of messages) {
		const pluginId = message && /^Plugin "([^"]+)" (?:state migration is pending|data\/settings upgrade is unfinished):/u.exec(message)?.[1];
		if (message && pluginId) pluginWarnings.set(message, pluginId);
	}
	if (!pluginWarnings.size) return /* @__PURE__ */ new Map();
	const { readDeferredPluginMigrationCompletionsAsync } = await import("./deferred-plugin-migrations-DAykyBFi.mjs");
	const completions = new Map((await readDeferredPluginMigrationCompletionsAsync()).map(({ pluginId, completedAtMs }) => [pluginId, completedAtMs]));
	const resolved = /* @__PURE__ */ new Map();
	for (const [message, pluginId] of pluginWarnings) {
		const completedAtMs = completions.get(pluginId);
		if (completedAtMs !== void 0) resolved.set(message, completedAtMs);
	}
	return resolved;
}
//#endregion
export { readResolvedDeferredPluginMigrationWarnings as t };
