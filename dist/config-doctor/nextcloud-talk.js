import { i as createLegacyPrivateNetworkDoctorContract, s as defineChannelAliasMigration } from "./runtime-doctor-migrations-BdgZ9Dfo.js";
import { t as createLegacyWebhookListenerDoctorContract } from "./legacy-webhook-listener-migration-DdZZwWrG.js";
//#region extensions/nextcloud-talk/src/doctor-contract.ts
const webhookContract = createLegacyWebhookListenerDoctorContract({
	channelKey: "nextcloud-talk",
	defaultHost: "0.0.0.0",
	defaultPort: 8788
});
const networkContract = createLegacyPrivateNetworkDoctorContract({ channelKey: "nextcloud-talk" });
const streamingAliasMigration = defineChannelAliasMigration({
	channelId: "nextcloud-talk",
	streaming: {
		defaultMode: "partial",
		deliveryOnly: true
	},
	accountStreamingReplacesRoot: true
});
const legacyConfigRules = [
	...webhookContract.legacyConfigRules,
	...networkContract.legacyConfigRules,
	...streamingAliasMigration.legacyConfigRules
];
function normalizeCompatibilityConfig({ cfg }) {
	const webhook = webhookContract.normalizeCompatibilityConfig({ cfg });
	const network = networkContract.normalizeCompatibilityConfig({ cfg: webhook.config });
	return streamingAliasMigration.normalizeChannelConfig({
		cfg: network.config,
		changes: [...webhook.changes, ...network.changes]
	});
}
//#endregion
export { legacyConfigRules, normalizeCompatibilityConfig };
