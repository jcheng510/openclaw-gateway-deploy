import { n as buildPluginConfigSchema } from "../../config-schema-B0JF2tyt.mjs";
import { t as definePluginEntry } from "../../plugin-entry-BsETFXpv.mjs";
import { t as agentsApiConfigSchema } from "../../config-F4JNS3Fd.mjs";
import { t as createAgentsApiHarness } from "../../agentsapi-harness-CWw5CKql.mjs";
//#region extensions/agentsapi/index.ts
var agentsapi_default = definePluginEntry({
	id: "agentsapi",
	name: "OpenAI Agents API",
	description: "OpenAI Agents API harness with hosted or self-hosted sessions.",
	configSchema: buildPluginConfigSchema(agentsApiConfigSchema),
	register(api) {
		api.registerAgentHarness(createAgentsApiHarness(api.runtime));
	}
});
//#endregion
export { agentsapi_default as default };
