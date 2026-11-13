import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { D as resolveExpiresAtMsFromDurationMs, o as asDateTimestampMs } from "./number-coercion-Dq1l5muL.mjs";
import { n as createLazyPromise } from "./lazy-promise-DGqyc4Y4.mjs";
import { P as normalizeExecutableToken, f as resolveShellWrapperTransportArgv, t as POSIX_PARSEABLE_SHELL_WRAPPERS, u as isShellWrapperExecutable } from "./shell-wrapper-resolution-B-_X4KDu.mjs";
import { t as isApprovalNotFoundError } from "./approval-errors-BiXAEeLr.mjs";
import { t as markToolDecisionRecorded } from "./agent-tools.before-tool-call.decision-h72czYCB.mjs";
import { t as callGatewayTool } from "./gateway-CnezJTJC.mjs";
import { n as DEFAULT_APPROVAL_TIMEOUT_MS, t as DEFAULT_APPROVAL_REQUEST_TIMEOUT_MS } from "./bash-tools.exec-runtime-Bo6Qm2VC.mjs";
//#region src/agents/bash-tools.exec-approval-request.ts
/**
* Exec approval request client.
* Registers two-phase approval requests with the gateway, waits for decisions,
* and builds host/node payloads with optional command highlighting.
*/
const POSIX_COMMAND_HIGHLIGHT_SHELLS = POSIX_PARSEABLE_SHELL_WRAPPERS;
const loadExecApprovalCommandSpansRuntime = createLazyPromise(() => import("./bash-tools.exec-approval-request.runtime.js"), { cacheRejections: true });
function parseDecision(value) {
	if (!value || typeof value !== "object") return {
		present: false,
		value: null
	};
	if (!Object.hasOwn(value, "decision")) return {
		present: false,
		value: null
	};
	const decision = value.decision;
	return {
		present: true,
		value: typeof decision === "string" ? decision : null
	};
}
function resolveDefaultExecApprovalExpiresAtMs() {
	return resolveExpiresAtMsFromDurationMs(DEFAULT_APPROVAL_TIMEOUT_MS) ?? 0;
}
var ExecApprovalRunAbortedError = class extends Error {
	constructor() {
		super("Exec approval cancelled because its run was aborted");
		this.name = "ExecApprovalRunAbortedError";
	}
};
function isExecApprovalRunAbortedError(error) {
	return error instanceof ExecApprovalRunAbortedError;
}
/** Registers a two-phase exec approval request with the gateway. */
async function registerExecApprovalRequest(params) {
	const registrationResult = await callGatewayTool("exec.approval.request", { timeoutMs: DEFAULT_APPROVAL_REQUEST_TIMEOUT_MS }, params, { expectFinal: false });
	markToolDecisionRecorded();
	const decision = parseDecision(registrationResult);
	const id = normalizeOptionalString(registrationResult?.id) ?? params.id;
	const expiresAtMs = asDateTimestampMs(registrationResult?.expiresAtMs) ?? resolveDefaultExecApprovalExpiresAtMs();
	if (decision.present) return {
		id,
		expiresAtMs,
		finalDecision: decision.value
	};
	return {
		id,
		expiresAtMs
	};
}
/** Uses a pre-resolved decision or waits for the registered approval id. */
async function resolveRegisteredExecApprovalDecision(params) {
	if (params.preResolvedDecision !== void 0) return params.preResolvedDecision ?? null;
	try {
		const decisionResult = await callGatewayTool("exec.approval.waitDecision", { timeoutMs: DEFAULT_APPROVAL_REQUEST_TIMEOUT_MS }, { id: params.approvalId });
		if (decisionResult && typeof decisionResult === "object" && decisionResult.terminalReason === "run-aborted") throw new ExecApprovalRunAbortedError();
		return parseDecision(decisionResult).value;
	} catch (err) {
		if (isApprovalNotFoundError(err)) return null;
		throw err;
	}
}
/** Builds originating channel context for approval delivery/routing. */
function buildExecApprovalTurnSourceContext(params) {
	return {
		turnSourceChannel: params.turnSourceChannel,
		turnSourceTo: params.turnSourceTo,
		turnSourceAccountId: params.turnSourceAccountId,
		turnSourceThreadId: params.turnSourceThreadId
	};
}
async function resolveCommandSpans(command) {
	if (!command) return;
	try {
		const { resolveExecApprovalCommandSpans } = await loadExecApprovalCommandSpansRuntime();
		return await resolveExecApprovalCommandSpans(command);
	} catch {
		return;
	}
}
function hasUnsupportedShellArgv(argv) {
	if (!argv?.length) return false;
	const executable = (resolveShellWrapperTransportArgv([...argv]) ?? argv)[0];
	if (!executable) return false;
	const normalizedExecutable = normalizeExecutableToken(executable);
	return isShellWrapperExecutable(normalizedExecutable) && !POSIX_COMMAND_HIGHLIGHT_SHELLS.has(normalizedExecutable);
}
function shouldSkipGeneratedCommandSpans(params) {
	if (params.host === "gateway" && process.platform === "win32") return true;
	return hasUnsupportedShellArgv(params.commandArgv?.length ? params.commandArgv : params.systemRunPlan?.argv);
}
async function buildHostApprovalDecisionParams(params) {
	const commandSpans = params.commandHighlighting === true ? params.commandSpans ?? (shouldSkipGeneratedCommandSpans(params) ? void 0 : await resolveCommandSpans(params.command ?? params.systemRunPlan?.commandText)) : void 0;
	return {
		id: params.approvalId,
		...params.command ? { command: params.command } : {},
		...params.commandArgv ? { commandArgv: params.commandArgv } : {},
		systemRunPlan: params.systemRunPlan,
		env: params.env,
		cwd: params.workdir,
		nodeId: params.nodeId,
		host: params.host,
		security: params.security,
		ask: params.ask,
		warningText: params.warningText,
		commandSpans,
		...params.unavailableDecisions?.length ? { unavailableDecisions: params.unavailableDecisions } : {},
		agentId: params.agentId,
		sessionKey: params.sessionKey,
		resolvedPath: params.resolvedPath,
		sessionId: params.sessionId,
		runId: params.runId,
		toolCallId: params.toolCallId,
		requireDeliveryRoute: params.requireDeliveryRoute,
		suppressDelivery: params.suppressDelivery === true || params.trigger === "cron" && params.host !== "gateway" ? true : void 0,
		deliverToApprovalClientsOnly: params.trigger === "cron" && params.host === "gateway" ? true : void 0,
		approvalReviewerDeviceIds: params.approvalReviewerDeviceIds,
		...buildExecApprovalTurnSourceContext(params),
		timeoutMs: DEFAULT_APPROVAL_TIMEOUT_MS,
		twoPhase: true
	};
}
/** Registers a host/node approval request and wraps failures for exec callers. */
async function registerExecApprovalRequestForHostOrThrow(params) {
	try {
		return await registerExecApprovalRequest(await buildHostApprovalDecisionParams(params));
	} catch (err) {
		throw new Error(`Exec approval registration failed: ${String(err)}`, { cause: err });
	}
}
//#endregion
export { resolveRegisteredExecApprovalDecision as i, isExecApprovalRunAbortedError as n, registerExecApprovalRequestForHostOrThrow as r, buildExecApprovalTurnSourceContext as t };
