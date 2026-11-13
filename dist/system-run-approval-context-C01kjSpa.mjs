import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { _ as formatExecCommand, f as normalizeNonEmptyString, p as normalizeStringArray, v as resolveSystemRunCommandRequest } from "./system-run-approval-binding-B-39Lo0o.mjs";
import { t as normalizeSystemRunApprovalPlan } from "./system-run-approval-plan-CQnPP1Qv.mjs";
//#region src/infra/system-run-approval-context.ts
function normalizeCommandText(value) {
	return typeof value === "string" ? value : "";
}
function normalizeCommandPreview(value, authoritative) {
	const preview = normalizeNonEmptyString(value);
	if (!preview || preview === authoritative) return null;
	return preview;
}
function normalizePreparedRunExecPolicy(raw) {
	if (!isRecord(raw)) return;
	const { security, ask } = raw;
	if ((security === "deny" || security === "allowlist" || security === "full") && (ask === "off" || ask === "on-miss" || ask === "always")) return {
		security,
		ask
	};
}
function normalizeAllowAlwaysCoverage(raw) {
	if (!isRecord(raw) || !Array.isArray(raw.patterns)) return;
	const patterns = raw.patterns.flatMap((entry) => {
		if (!isRecord(entry)) return [];
		const pattern = normalizeNonEmptyString(entry.pattern);
		if (!pattern) return [];
		const argPattern = normalizeNonEmptyString(entry.argPattern);
		return [{
			pattern,
			...argPattern ? { argPattern } : {}
		}];
	});
	return {
		complete: raw.complete === true,
		patterns
	};
}
function parsePreparedSystemRunPayload(raw) {
	if (!isRecord(raw)) return null;
	const execPolicy = normalizePreparedRunExecPolicy(raw.execPolicy);
	const allowAlwaysCoverage = normalizeAllowAlwaysCoverage(raw.allowAlwaysCoverage);
	const plan = normalizeSystemRunApprovalPlan(raw.plan);
	if (plan) return {
		plan,
		...execPolicy ? { execPolicy } : {},
		...allowAlwaysCoverage ? { allowAlwaysCoverage } : {}
	};
	if (!isRecord(raw.plan)) return null;
	const legacyPlan = raw.plan;
	const argv = normalizeStringArray(legacyPlan.argv);
	const commandText = normalizeNonEmptyString(legacyPlan.rawCommand) ?? normalizeNonEmptyString(raw.commandText) ?? normalizeNonEmptyString(raw.cmdText);
	if (argv.length === 0 || !commandText) return null;
	return {
		plan: {
			argv,
			cwd: normalizeNonEmptyString(legacyPlan.cwd),
			commandText,
			commandPreview: normalizeNonEmptyString(legacyPlan.commandPreview),
			agentId: normalizeNonEmptyString(legacyPlan.agentId),
			sessionKey: normalizeNonEmptyString(legacyPlan.sessionKey)
		},
		...execPolicy ? { execPolicy } : {},
		...allowAlwaysCoverage ? { allowAlwaysCoverage } : {}
	};
}
/** Build the approval request context from tool payload fields. */
function resolveSystemRunApprovalRequestContext(params) {
	const normalizedPlan = (normalizeNonEmptyString(params.host) ?? "") === "node" ? normalizeSystemRunApprovalPlan(params.systemRunPlan) : null;
	const fallbackArgv = normalizeStringArray(params.commandArgv);
	const fallbackCommand = normalizeCommandText(params.command);
	const commandText = normalizedPlan ? normalizedPlan.commandText || formatExecCommand(normalizedPlan.argv) : fallbackCommand;
	const commandPreview = normalizedPlan ? normalizeCommandPreview(normalizedPlan.commandPreview ?? fallbackCommand, commandText) : null;
	const plan = normalizedPlan ? {
		...normalizedPlan,
		commandPreview
	} : null;
	return {
		plan,
		commandArgv: plan?.argv ?? (fallbackArgv.length > 0 ? fallbackArgv : void 0),
		commandText,
		commandPreview,
		cwd: plan?.cwd ?? normalizeNonEmptyString(params.cwd),
		agentId: plan?.agentId ?? normalizeNonEmptyString(params.agentId),
		sessionKey: plan?.sessionKey ?? normalizeNonEmptyString(params.sessionKey)
	};
}
/** Build the runtime approval context from already-normalized command inputs. */
function resolveSystemRunApprovalRuntimeContext(params) {
	const normalizedPlan = normalizeSystemRunApprovalPlan(params.plan ?? null);
	if (normalizedPlan) return {
		ok: true,
		plan: normalizedPlan,
		argv: [...normalizedPlan.argv],
		cwd: normalizedPlan.cwd,
		agentId: normalizedPlan.agentId,
		sessionKey: normalizedPlan.sessionKey,
		commandText: normalizedPlan.commandText
	};
	const command = resolveSystemRunCommandRequest({
		command: params.command,
		rawCommand: params.rawCommand
	});
	if (!command.ok) return {
		ok: false,
		message: command.message,
		details: command.details
	};
	return {
		ok: true,
		plan: null,
		argv: command.argv,
		cwd: normalizeNonEmptyString(params.cwd),
		agentId: normalizeNonEmptyString(params.agentId),
		sessionKey: normalizeNonEmptyString(params.sessionKey),
		commandText: command.commandText
	};
}
//#endregion
export { resolveSystemRunApprovalRequestContext as n, resolveSystemRunApprovalRuntimeContext as r, parsePreparedSystemRunPayload as t };
