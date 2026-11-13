import { i as isSilentReplyPayloadText } from "./tokens-BTKQYTUd.mjs";
import { i as resolveReplyExpectation } from "./reply-completion-B5n1Cnxm.mjs";
import { b as resolveSourceReplyDelivery } from "./delivery-evidence-CoApgptg.mjs";
import { n as hasCompletionMessageSessionSpawn } from "./accepted-session-spawn-D1kxYBSr.mjs";
//#region src/agents/cli-runner/delivery-evidence.ts
const CLI_MESSAGING_DELIVERY_EVIDENCE_KEY = "cliMessagingDeliveryEvidence";
function isMissingRequiredCliReply(params) {
	const { output, runParams, isolatedCompletion } = params;
	return (!output.text.trim() || isSilentReplyPayloadText(output.text)) && resolveSourceReplyDelivery(output) === "missing" && !output.toolMediaUrls?.length && !output.yielded && !hasCompletionMessageSessionSpawn(output.acceptedSessionSpawns) && !output.terminalInterruption && resolveReplyExpectation(runParams) === "required" && !(isolatedCompletion && runParams.outputTextPolicy === "strict-visible");
}
function projectCliMessagingDeliveryEvidence(output, snapshot = false) {
	const evidence = {};
	for (const key of [
		"didSendViaMessagingTool",
		"didDeliverSourceReplyViaMessageTool",
		"sourceReplyDelivered"
	]) if (output[key]) evidence[key] = true;
	for (const key of [
		"messagingToolSentTexts",
		"messagingToolSentMediaUrls",
		"messagingToolSentTargets",
		"messagingToolSourceReplyPayloads"
	]) {
		const values = output[key];
		if (values?.length) Object.assign(evidence, { [key]: snapshot ? values.slice() : values });
	}
	return evidence;
}
function snapshotCliMessagingDeliveryEvidence(output) {
	return output.didSendViaMessagingTool === true ? projectCliMessagingDeliveryEvidence(output, true) : void 0;
}
/** Attaches confirmed delivery evidence so caller retries cannot duplicate a visible send. */
function attachCliMessagingDeliveryEvidence(error, output) {
	const evidence = snapshotCliMessagingDeliveryEvidence(output);
	if (!evidence) return error;
	if (error && typeof error === "object") try {
		Object.assign(error, { [CLI_MESSAGING_DELIVERY_EVIDENCE_KEY]: evidence });
		return error;
	} catch {}
	const wrapped = new Error(error instanceof Error ? error.message : String(error), { cause: error });
	Object.assign(wrapped, { [CLI_MESSAGING_DELIVERY_EVIDENCE_KEY]: evidence });
	return wrapped;
}
/** Reads confirmed delivery evidence from a failed CLI attempt. */
function getCliMessagingDeliveryEvidence(error) {
	if (!error || typeof error !== "object") return;
	const evidence = error[CLI_MESSAGING_DELIVERY_EVIDENCE_KEY];
	return evidence && typeof evidence === "object" ? snapshotCliMessagingDeliveryEvidence(evidence) : void 0;
}
//#endregion
export { projectCliMessagingDeliveryEvidence as i, getCliMessagingDeliveryEvidence as n, isMissingRequiredCliReply as r, attachCliMessagingDeliveryEvidence as t };
