import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { b as supportsClaudeNativeMaxEffort, v as supportsClaudeAdaptiveThinking, x as supportsClaudeNativeXhighEffort } from "./anthropic-BosOSZ2f.mjs";
import "./string-coerce-runtime-B1b8UNzb.mjs";
import "./provider-model-shared-CfEgI_y7.mjs";
//#region extensions/anthropic/live-model-contract-gate.ts
function readCapabilityFlag(root, path) {
	let current = root;
	for (const key of path) {
		if (!isRecord(current)) return;
		current = current[key];
	}
	return typeof current === "boolean" ? current : void 0;
}
const CLAUDE_CONTRACT_CAPABILITY_CHECKS = [
	{
		path: [
			"thinking",
			"types",
			"adaptive",
			"supported"
		],
		matches: supportsClaudeAdaptiveThinking
	},
	{
		path: [
			"effort",
			"xhigh",
			"supported"
		],
		matches: supportsClaudeNativeXhighEffort
	},
	{
		path: [
			"effort",
			"max",
			"supported"
		],
		matches: supportsClaudeNativeMaxEffort
	}
];
function acceptsAnthropicLiveModelContract(params) {
	const capabilities = params.record.capabilities;
	if (!isRecord(capabilities)) return false;
	const ref = { id: params.id };
	return CLAUDE_CONTRACT_CAPABILITY_CHECKS.every((check) => {
		const advertised = readCapabilityFlag(capabilities, check.path);
		return advertised !== void 0 && advertised === check.matches(ref);
	});
}
//#endregion
export { acceptsAnthropicLiveModelContract as t };
