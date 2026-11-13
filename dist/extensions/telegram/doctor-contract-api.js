import { n as normalizeCompatibilityConfig, t as legacyConfigRules } from "../../doctor-contract-BghECgZo.mjs";
//#region extensions/telegram/doctor-contract-api.ts
const stateMigrations = [{
	id: "telegram-legacy-state",
	label: "Retired Telegram JSON state",
	async detectLegacyState(params) {
		const { telegramRetiredStateMigration } = await import("../../state-migrations-7RWpcEo4.mjs");
		return telegramRetiredStateMigration.detectLegacyState(params);
	},
	async migrateLegacyState(params) {
		const { telegramRetiredStateMigration } = await import("../../state-migrations-7RWpcEo4.mjs");
		return telegramRetiredStateMigration.migrateLegacyState(params);
	}
}];
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig, stateMigrations };
