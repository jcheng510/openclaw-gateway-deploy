import { i as extractErrorCode } from "../../error-coercion-1P2One0X.mjs";
import { r as asNullableRecord } from "../../record-coerce-TIsquoVR.mjs";
import "../../error-runtime-CKQUxkum.mjs";
import "../../runtime-doctor-migrations-CQb3xZx6.mjs";
import path from "node:path";
import fs from "node:fs/promises";
/** Retired Active Memory QMD override detected before strict manifest validation. */
const legacyConfigRules = [{
	path: [
		"plugins",
		"entries",
		"active-memory",
		"config",
		"qmd"
	],
	message: "plugins.entries.active-memory.config.qmd is retired because the QMD memory backend was removed. Run \"openclaw doctor --fix\"."
}];
/** Removes the retired plugin-owned QMD override. */
function normalizeCompatibilityConfig({ cfg }) {
	const entry = asNullableRecord(cfg.plugins?.entries?.["active-memory"]);
	const pluginConfig = asNullableRecord(entry?.config);
	if (!pluginConfig || !Object.hasOwn(pluginConfig, "qmd")) return {
		config: cfg,
		changes: []
	};
	const nextConfig = structuredClone(cfg);
	const nextEntry = asNullableRecord(nextConfig.plugins?.entries?.["active-memory"]);
	const nextPluginConfig = asNullableRecord(nextEntry?.config);
	if (!nextPluginConfig) return {
		config: cfg,
		changes: []
	};
	delete nextPluginConfig.qmd;
	return {
		config: nextConfig,
		changes: ["Removed retired Active Memory QMD search-mode configuration."]
	};
}
async function collectRetiredToggleWarnings(stateDir) {
	const source = path.join(stateDir, "plugins", "active-memory", "session-toggles.json");
	try {
		await fs.lstat(source);
	} catch (error) {
		if (extractErrorCode(error) !== "ENOENT") throw error;
		return [];
	}
	return [`Preserved retired Active Memory JSON state at ${source}. Run openclaw doctor --fix on 2026.9.5 before upgrading to latest: https://docs.openclaw.ai/install/updating#upgrading-very-old-versions`];
}
const stateMigrations = [{
	id: "active-memory-session-toggles-json-to-plugin-state",
	label: "Retired Active Memory session toggles",
	async detectLegacyState({ stateDir }) {
		const preview = await collectRetiredToggleWarnings(stateDir);
		return preview.length > 0 ? { preview } : null;
	},
	async migrateLegacyState({ stateDir }) {
		return {
			changes: [],
			warnings: await collectRetiredToggleWarnings(stateDir)
		};
	}
}];
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig, stateMigrations };
