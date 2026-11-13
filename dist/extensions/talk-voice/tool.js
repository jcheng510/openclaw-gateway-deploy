import { a as asOptionalRecord } from "../../record-coerce-TIsquoVR.mjs";
import "../../string-coerce-runtime-B1b8UNzb.mjs";
import { t as jsonResult } from "../../tool-results-BCM3fdVS.mjs";
import { h as readToolStringParam } from "../../common-CnSoEQyp.mjs";
import { t as callGatewayTool } from "../../gateway-CnezJTJC.mjs";
import "../../agent-harness-runtime-CnrNnAqy.mjs";
import "../../param-readers-CdkHMQwf.mjs";
//#region extensions/talk-voice/tool.ts
const executeTalkVoiceTool = async (_id, args, signal) => {
	const params = asOptionalRecord(args) ?? {};
	const action = readToolStringParam(params, "action", { required: true });
	let method;
	let request;
	switch (action) {
		case "list":
			method = "talk.voice.get";
			request = {};
			break;
		case "set":
			method = "talk.voice.set";
			request = { voice: readToolStringParam(params, "voice", { required: true }) };
			break;
		default: throw new Error(`Unknown Talk voice action: ${action}`);
	}
	return jsonResult(await callGatewayTool(method, { timeoutMs: 65e3 }, request, {
		requireAgentRuntimeIdentity: true,
		signal
	}));
};
//#endregion
export { executeTalkVoiceTool };
