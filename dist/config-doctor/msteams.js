import { s as defineChannelAliasMigration } from "./runtime-doctor-migrations-BdgZ9Dfo.js";
import { t as createLegacyWebhookListenerDoctorContract } from "./legacy-webhook-listener-migration-DdZZwWrG.js";
//#region extensions/msteams/config-doctor-api.ts
const webhookMigration = createLegacyWebhookListenerDoctorContract({
	channelKey: "msteams",
	defaultPort: 3978,
	webhookKey: "webhook",
	portKey: "port",
	hostKey: null
});
const streamingAliasMigration = defineChannelAliasMigration({
	channelId: "msteams",
	streaming: { defaultMode: "partial" }
});
const legacyConfigRules = [...webhookMigration.legacyConfigRules, ...streamingAliasMigration.legacyConfigRules];
function normalizeCompatibilityConfig({ cfg }) {
	const webhook = webhookMigration.normalizeCompatibilityConfig({ cfg });
	return streamingAliasMigration.normalizeChannelConfig({
		cfg: webhook.config,
		changes: webhook.changes
	});
}
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };
