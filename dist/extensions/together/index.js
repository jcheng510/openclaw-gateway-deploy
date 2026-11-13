import { t as defineSingleProviderPluginEntry } from "../../provider-entry-B4vlnjir.mjs";
import { t as openclaw_plugin_default } from "../../openclaw.plugin-DQQO5-vQ.mjs";
import { r as applyTogetherConnectionConfig } from "../../onboard-Du0bZwrt.mjs";
import { t as buildTogetherVideoGenerationProvider } from "../../video-generation-provider-DMFThqSk.mjs";
var together_default = defineSingleProviderPluginEntry({
	id: "together",
	name: "Together Provider",
	description: "Bundled Together provider plugin",
	manifest: openclaw_plugin_default,
	provider: {
		label: "Together",
		docsPath: "/providers/together",
		manifestAuth: { applyConfig: applyTogetherConnectionConfig },
		catalog: {
			liveModelDiscovery: true,
			discoveryMode: "strict"
		},
		classifyFailoverReason: ({ errorMessage }) => /\bconcurrency limit\b.*\b(?:breached|reached)\b/i.test(errorMessage) ? "rate_limit" : void 0
	},
	register(api) {
		api.registerVideoGenerationProvider(buildTogetherVideoGenerationProvider());
	}
});
//#endregion
export { together_default as default };
