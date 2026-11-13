import { n as GATEWAY_CLIENT_IDS, r as GATEWAY_CLIENT_MODES } from "./client-info-S_xwnr2o.mjs";
import { $t as validateExecApprovalsNodeSetParams, Qt as validateExecApprovalsNodeGetParams, Zt as validateExecApprovalsGetParams, en as validateExecApprovalsNodeSnapshot, tn as validateExecApprovalsSetParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { a as mergeExecApprovalsSocketDefaults } from "./exec-approvals-config-BF54IW19.mjs";
import { c as readExecApprovalsSnapshot, m as updateExecApprovals, r as ensureExecApprovalsSnapshot } from "./exec-approvals-store-D6OdMNqR.mjs";
import { i as resolveExecApprovalsFromFile, n as redactExecApprovals, t as normalizeExecApprovals } from "./exec-approvals-Dia37sqI.mjs";
import { l as resolveNodeCommandAllowlist, o as isNodeCommandAllowed } from "./node-command-policy-B8V85z2C.mjs";
import { n as respondUnavailableOnNodeInvokeErrorWithProvenance, r as parseGatewayPayload } from "./nodes.helpers-D-xrp4Rq.mjs";
import { n as defineValidatedGatewayHandler, t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { n as respondUnavailableOnThrow } from "./response-DHZKYspK.mjs";
import { t as resolveBaseHashParam } from "./base-hash-BJkn_bB6.mjs";
//#region src/gateway/server-methods/exec-approvals.ts
function requireApprovalsBaseHash(params, snapshot, respond) {
	const baseHash = resolveBaseHashParam(params);
	if (!snapshot.exists) {
		if (baseHash && baseHash !== snapshot.hash) {
			respondApprovalsChanged(respond);
			return false;
		}
		return true;
	}
	if (!snapshot.hash) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "exec approvals base hash unavailable; re-run exec.approvals.get and retry"));
		return false;
	}
	if (!baseHash) {
		respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "exec approvals base hash required; re-run exec.approvals.get and retry"));
		return false;
	}
	if (baseHash !== snapshot.hash) {
		respondApprovalsChanged(respond);
		return false;
	}
	return true;
}
function respondApprovalsChanged(respond) {
	respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "exec approvals changed since last load; re-run exec.approvals.get and retry"));
}
function toExecApprovalsPayload(snapshot) {
	return {
		...redactExecApprovals(snapshot),
		resolvedDefaults: resolveExecApprovalsFromFile({ file: snapshot.file }).defaults
	};
}
function isMacAppNode(session) {
	const platform = session?.platform?.trim().toLowerCase();
	return session?.clientId === GATEWAY_CLIENT_IDS.MACOS_APP && session.clientMode === GATEWAY_CLIENT_MODES.NODE && (platform === "macos" || platform?.startsWith("macos ") === true);
}
function execApprovalsNodeHandler(definition) {
	return defineValidatedGatewayHandler(definition.method, definition.validate, async ({ params, context, respond }) => {
		const nodeId = params.nodeId.trim();
		if (!nodeId) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "nodeId required"));
			return;
		}
		const nodeSession = context.nodeRegistry.get(nodeId);
		if (nodeSession) {
			const allowed = isNodeCommandAllowed({
				command: definition.command,
				declaredCommands: nodeSession.commands,
				allowlist: resolveNodeCommandAllowlist(context.getRuntimeConfig(), {
					...nodeSession,
					approvedCommands: nodeSession.commands
				})
			});
			if (!allowed.ok) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `node command not allowed: ${definition.command} (${allowed.reason})`, { details: {
					command: definition.command,
					reason: allowed.reason
				} }));
				return;
			}
		}
		await respondUnavailableOnThrow(respond, async () => {
			let nodeCommandDispatched = false;
			const res = await context.nodeRegistry.invoke({
				nodeId,
				...nodeSession ? {
					expectedConnId: nodeSession.connId,
					...nodeSession.pairingGeneration ? { expectedPairingGeneration: nodeSession.pairingGeneration } : {}
				} : {},
				command: definition.command,
				params: definition.commandParams(params, nodeSession),
				onDispatchReady: () => {
					nodeCommandDispatched = true;
				}
			});
			if (!respondUnavailableOnNodeInvokeErrorWithProvenance(respond, res, { nodeCommandDispatched })) return;
			const payload = res.payloadJSON ? parseGatewayPayload(res.payloadJSON) : res.payload;
			if (definition.validatePayload && !definition.validatePayload(payload)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "node returned invalid exec approvals payload"));
				return;
			}
			respond(true, payload, void 0);
		});
	});
}
const execApprovalsHandlers = {
	"exec.approvals.get": async ({ params, respond }) => {
		if (!assertValidParams(params, validateExecApprovalsGetParams, "exec.approvals.get", respond)) return;
		await respondUnavailableOnThrow(respond, async () => {
			respond(true, toExecApprovalsPayload(await ensureExecApprovalsSnapshot()), void 0);
		});
	},
	"exec.approvals.set": async ({ params, respond }) => {
		if (!assertValidParams(params, validateExecApprovalsSetParams, "exec.approvals.set", respond)) return;
		await respondUnavailableOnThrow(respond, async () => {
			const snapshot = readExecApprovalsSnapshot();
			if (!requireApprovalsBaseHash(params, snapshot, respond)) return;
			const incoming = params.file;
			if (!incoming || typeof incoming !== "object") {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "exec approvals file is required"));
				return;
			}
			const normalized = normalizeExecApprovals(incoming);
			const nextSnapshot = await updateExecApprovals({
				baseHash: snapshot.hash,
				update: (current) => mergeExecApprovalsSocketDefaults({
					normalized,
					current
				})
			});
			if (!nextSnapshot) {
				respondApprovalsChanged(respond);
				return;
			}
			respond(true, toExecApprovalsPayload(nextSnapshot), void 0);
		});
	},
	"exec.approvals.node.get": execApprovalsNodeHandler({
		method: "exec.approvals.node.get",
		validate: validateExecApprovalsNodeGetParams,
		command: "system.execApprovals.get",
		commandParams: (_parsedParams, nodeSession) => isMacAppNode(nodeSession) ? { includeResolvedDefaults: true } : {},
		validatePayload: validateExecApprovalsNodeSnapshot
	}),
	"exec.approvals.node.set": execApprovalsNodeHandler({
		method: "exec.approvals.node.set",
		validate: validateExecApprovalsNodeSetParams,
		command: "system.execApprovals.set",
		commandParams: (parsedParams) => "native" in parsedParams ? {
			...parsedParams.native,
			baseHash: parsedParams.baseHash
		} : {
			file: parsedParams.file,
			baseHash: parsedParams.baseHash
		}
	})
};
//#endregion
export { execApprovalsHandlers };
