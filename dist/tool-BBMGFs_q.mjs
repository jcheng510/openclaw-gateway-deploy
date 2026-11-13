import { a as addTimerTimeoutGraceMs, p as clampPositiveTimerTimeoutMs } from "./number-coercion-Dq1l5muL.mjs";
import { t as jsonResult } from "./tool-results-BCM3fdVS.mjs";
import { c as readFiniteNumberParam, d as readPositiveIntegerParam, h as readToolStringParam } from "./common-CnSoEQyp.mjs";
import { t as callGatewayTool } from "./gateway-CnezJTJC.mjs";
import "./number-runtime-DyNDaYIV.mjs";
import { n as listNodes } from "./nodes-utils-4kbftX2Z.mjs";
import "./agent-harness-runtime-CnrNnAqy.mjs";
import "./channel-actions-B4LfC_3Y.mjs";
import "./param-readers-CdkHMQwf.mjs";
import { i as canvasToolDefinition, r as resolveCanvasNodeFromList, t as CANVAS_PRESENT_COMMAND } from "./node-eligibility-DWlz2PlY.mjs";
import { randomUUID } from "node:crypto";
//#region extensions/canvas/src/tool.ts
const DEFAULT_CANVAS_NODE_INVOKE_TIMEOUT_MS = 3e4;
const CANVAS_NODE_INVOKE_TRANSPORT_GRACE_MS = 1e4;
function readGatewayCallOptions(params) {
	return {
		gatewayUrl: readToolStringParam(params, "gatewayUrl", { trim: false }),
		gatewayToken: readToolStringParam(params, "gatewayToken", { trim: false }),
		timeoutMs: readPositiveIntegerParam(params, "timeoutMs")
	};
}
function createCanvasTool(options) {
	return {
		...canvasToolDefinition,
		execute: async (_toolCallId, args) => {
			const params = args;
			const action = readToolStringParam(params, "action", { required: true });
			const gatewayOpts = readGatewayCallOptions(params);
			const nodeQuery = readToolStringParam(params, "node", { trim: true });
			const invoke = async (command, invokeParams) => {
				const nodeId = resolveCanvasNodeFromList(await listNodes(gatewayOpts), nodeQuery).nodeId;
				const timeoutMs = clampPositiveTimerTimeoutMs(gatewayOpts.timeoutMs ?? DEFAULT_CANVAS_NODE_INVOKE_TIMEOUT_MS) ?? DEFAULT_CANVAS_NODE_INVOKE_TIMEOUT_MS;
				const transportTimeoutMs = addTimerTimeoutGraceMs(timeoutMs, CANVAS_NODE_INVOKE_TRANSPORT_GRACE_MS) ?? timeoutMs;
				return {
					node: nodeId,
					result: await callGatewayTool("node.invoke", {
						...gatewayOpts,
						timeoutMs: transportTimeoutMs
					}, {
						nodeId,
						command,
						params: invokeParams,
						timeoutMs,
						idempotencyKey: randomUUID(),
						...options?.agentSessionKey ? { sessionKey: options.agentSessionKey } : {}
					})
				};
			};
			switch (action) {
				case "present": {
					const placement = {
						x: readFiniteNumberParam(params, "x"),
						y: readFiniteNumberParam(params, "y"),
						width: readFiniteNumberParam(params, "width"),
						height: readFiniteNumberParam(params, "height")
					};
					const invokeParams = {};
					const presentTarget = readToolStringParam(params, "target", { trim: true }) ?? readToolStringParam(params, "url", { trim: true });
					if (presentTarget) invokeParams.url = presentTarget;
					if (Object.values(placement).some(Number.isFinite)) invokeParams.placement = placement;
					const { node } = await invoke(CANVAS_PRESENT_COMMAND, invokeParams);
					return jsonResult({
						ok: true,
						node,
						...presentTarget ? { url: presentTarget } : {}
					});
				}
				case "hide": {
					const { node } = await invoke("canvas.hide", void 0);
					return jsonResult({
						ok: true,
						node
					});
				}
				case "navigate": {
					const url = readToolStringParam(params, "url", { trim: true }) ?? readToolStringParam(params, "target", {
						required: true,
						trim: true,
						label: "url"
					});
					const { node } = await invoke("canvas.navigate", { url });
					return jsonResult({
						ok: true,
						node,
						url
					});
				}
				default: throw new Error(`Unknown action: ${action}`);
			}
		}
	};
}
//#endregion
export { createCanvasTool };
