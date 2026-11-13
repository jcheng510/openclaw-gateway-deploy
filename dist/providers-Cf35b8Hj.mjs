import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { t as withPluginMigrationProviders } from "./migration-provider-runtime-D5139Ta6.mjs";
import { t as buildMigrationContext } from "./context-CEjjxBBl.mjs";
//#region src/commands/migrate/providers.ts
/** Migration provider lookup, option shaping, and plan creation helpers. */
/** Borrow a selected provider for the complete consuming operation. */
async function withMigrationProvider(providerId, config, run) {
	return await withPluginMigrationProviders({
		cfg: config ?? getRuntimeConfig(),
		providerId
	}, async (providers) => {
		const provider = providers.find((entry) => entry.id === providerId);
		if (!provider) {
			const available = providers.map((entry) => entry.id);
			const suffix = available.length > 0 ? ` Available providers: ${available.join(", ")}.` : " No providers found.";
			throw new Error(`Unknown migration provider "${providerId}".${suffix}`);
		}
		return await run(provider);
	});
}
/** Builds provider-specific options from shared migrate CLI flags. */
function buildMigrationProviderOptions(opts, providerId = opts.provider) {
	const options = {};
	if (providerId === "codex" && opts.verifyPluginApps === true) options.verifyPluginApps = true;
	if (providerId === "codex" && opts.configPatchMode) options.configPatchMode = opts.configPatchMode;
	return Object.keys(options).length > 0 ? options : void 0;
}
/** Creates a migration plan after validating provider-specific flag support. */
async function createMigrationPlan(runtime, opts, provider) {
	if (opts.verifyPluginApps && opts.provider !== "codex") throw new Error("--verify-plugin-apps is only supported for Codex migrations.");
	const ctx = buildMigrationContext({
		...opts,
		providerOptions: buildMigrationProviderOptions(opts),
		runtime
	});
	return await provider.plan(ctx);
}
//#endregion
export { createMigrationPlan as n, withMigrationProvider as r, buildMigrationProviderOptions as t };
