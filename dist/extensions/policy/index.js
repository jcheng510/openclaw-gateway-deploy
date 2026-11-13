import { t as definePluginEntry } from "../../plugin-entry-BsETFXpv.mjs";
import { t as POLICY_CLI_DESCRIPTOR } from "../../cli-output-mode-BBFJN3Xe.mjs";
import { t as registerPolicyDoctorChecks } from "../../register-L-BzD2qR.mjs";
//#region extensions/policy/index.ts
var policy_default = definePluginEntry({
	id: "policy",
	name: "Policy",
	description: "Adds policy-backed doctor checks for workspace conformance.",
	register(api) {
		api.registerCli(async ({ program }) => {
			const { registerPolicyCli } = await import("../../cli-D2o3EcF5.mjs");
			registerPolicyCli(program);
		}, { descriptors: [POLICY_CLI_DESCRIPTOR] });
		registerPolicyDoctorChecks();
	}
});
//#endregion
export { policy_default as default };
