import { n as buildManifestModelProviderConfig } from "./provider-catalog-Sn7qzHke.mjs";
import "./provider-catalog-shared-CeJ9H010.mjs";
import { t as openclaw_plugin_default } from "./openclaw.plugin-DQQO5-vQ.mjs";
//#region extensions/together/provider-catalog.ts
function buildTogetherProvider() {
	return buildManifestModelProviderConfig({
		providerId: "together",
		catalog: openclaw_plugin_default.modelCatalog.providers.together
	});
}
//#endregion
export { buildTogetherProvider as t };
