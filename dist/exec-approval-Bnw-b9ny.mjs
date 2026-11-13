import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { y as uniqueStrings } from "./string-normalization-YMwDjufr.mjs";
import { t as _usingCtx } from "./usingCtx-DwOBYOJf.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import "./session-key-BC4m_Ly5.mjs";
import { o as normalizeExecSecurity, r as normalizeExecAsk, t as DEFAULT_EXEC_APPROVAL_TIMEOUT_MS } from "./exec-approvals-core-GflUelcW.mjs";
import { Jt as validateExecApprovalGrantsRevokeParams, Kt as validateExecApprovalGetParams, Xt as validateExecApprovalResolveParams, Yt as validateExecApprovalRequestParams, qt as validateExecApprovalGrantsListParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { i as detectCommandCarrierArgv, o as detectInlineEvalInSegments } from "./risks-CKMjRFLY.mjs";
import { s as normalizeExecApprovalUnavailableDecisions, u as resolveExecApprovalRequestAllowedDecisions } from "./exec-approvals-policy-CMlDajgd.mjs";
import "./exec-approvals-Dia37sqI.mjs";
import { i as sanitizeExecApprovalWarningText, n as sanitizeExecApprovalDisplayText, r as sanitizeExecApprovalDisplayTextWithStatus } from "./exec-approval-text-sanitize-ByDPsdlJ.mjs";
import { t as sanitizeApprovalScope } from "./approval-scope-DxU7eGbw.mjs";
import { n as buildSystemRunApprovalBinding, r as buildSystemRunApprovalEnvBinding } from "./system-run-approval-binding-B-39Lo0o.mjs";
import { t as analyzeCommandForPolicy } from "./policy-BUqvnSSU.mjs";
import { t as resolveExecCommandHighlighting } from "./exec-command-highlighting-Bfmzsy7k.mjs";
import { t as resolveExecApprovalCommandDisplay } from "./exec-approval-command-display-DsoX56Go.mjs";
import { a as parseCronExecOperationBinding, o as revokeCronStandingGrant, r as listCronStandingGrants, t as buildCronExecOperationBinding } from "./operator-approval-standing-grants-Cvo6su4C.mjs";
import { t as lookupCronRunExecSource } from "./cron-run-exec-source-BYare2tS.mjs";
import { n as resolveSystemRunApprovalRequestContext } from "./system-run-approval-context-C01kjSpa.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { i as resolvePendingApprovalRecord, o as respondPendingApprovalLookupError, r as listVisiblePendingApprovalRequests } from "./approval-record-lookup-DRSaCky7.mjs";
import { t as InvalidApprovalIdError } from "./exec-approval-registration-CEIh2U1F.mjs";
import { a as handleApprovalResolve, c as registerPendingApprovalRecord, l as resolveApprovalDecisionParams, n as bindApprovalReviewerDeviceIds, o as handleApprovalWaitDecision, t as bindApprovalRequesterMetadata } from "./approval-shared-B1XBogsp.mjs";
import { t as createApprovalRequestAuthority } from "./approval-request-authority-B1pFxsds.mjs";
import { t as handlePendingApprovalRequestWithDelivery } from "./approval-request-delivery-DfssUR4f.mjs";
import { t as resolveGrantExpiryDaysConfig } from "./standing-grant-expiry-config-CqUe6ux8.mjs";
//#region src/infra/command-analysis/explain.ts
function riskLabel(risk) {
	switch (risk.kind) {
		case "inline-eval": return `${risk.command} ${risk.flag}`;
		case "shell-wrapper": return `${risk.executable} ${risk.flag}`;
		case "command-carrier": return risk.flag ? `${risk.command} ${risk.flag}` : risk.command;
		case "dynamic-argument": return `${risk.command} dynamic argument`;
		case "source": return risk.command;
		case "function-definition": return risk.name;
		default: return risk.kind;
	}
}
/** Summarizes parsed shell-command explanation data for display. */
function summarizeCommandExplanation(explanation) {
	const riskKinds = uniqueStrings(explanation.risks.map((risk) => risk.kind));
	const warningLines = explanation.risks.map((risk) => {
		const label = riskLabel(risk);
		return label === risk.kind ? `Contains ${risk.kind}` : `Contains ${risk.kind}: ${label}`;
	});
	return {
		commandCount: explanation.topLevelCommands.length,
		nestedCommandCount: explanation.nestedCommands.length,
		riskKinds,
		warningLines: uniqueStrings(warningLines)
	};
}
function summarizeCommandSegmentsForDisplay(segments) {
	const riskKinds = [];
	const warningLines = [];
	const inlineEval = detectInlineEvalInSegments(segments);
	if (inlineEval) {
		riskKinds.push("inline-eval");
		warningLines.push(`Contains inline-eval: ${inlineEval.normalizedExecutable} ${inlineEval.flag}`);
	}
	for (const segment of segments) {
		const effectiveArgv = segment.resolution?.effectiveArgv ?? segment.argv;
		for (const hit of detectCommandCarrierArgv(effectiveArgv)) {
			riskKinds.push("command-carrier");
			warningLines.push(hit.flag ? `Contains command-carrier: ${hit.command} ${hit.flag}` : `Contains command-carrier: ${hit.command}`);
		}
	}
	return {
		commandCount: segments.length,
		nestedCommandCount: 0,
		riskKinds: uniqueStrings(riskKinds),
		warningLines: uniqueStrings(warningLines)
	};
}
async function resolveCommandAnalysisSummaryForDisplay(params) {
	const summary = params.host === "node" ? (() => {
		if (!Array.isArray(params.commandArgv) || params.commandArgv.length === 0) return null;
		const analysis = analyzeCommandForPolicy({
			source: "argv",
			argv: params.commandArgv,
			cwd: params.cwd ?? void 0
		});
		return analysis.ok ? summarizeCommandSegmentsForDisplay(analysis.segments) : null;
	})() : (await explainCommandForDisplay(params.commandText))?.summary;
	if (!summary) return null;
	const sanitizeText = params.sanitizeText;
	if (!sanitizeText) return summary;
	return {
		commandCount: summary.commandCount,
		nestedCommandCount: summary.nestedCommandCount,
		riskKinds: summary.riskKinds.map((kind) => sanitizeText(kind)),
		warningLines: summary.warningLines.map((line) => sanitizeText(line))
	};
}
async function explainCommandForDisplay(command) {
	try {
		const { explainShellCommand } = await import("./extract-DTCR86IO.mjs");
		const explanation = await explainShellCommand(command);
		return {
			explanation,
			summary: summarizeCommandExplanation(explanation)
		};
	} catch {
		return null;
	}
}
//#endregion
//#region src/gateway/server-methods/exec-approval.ts
const APPROVAL_ALLOW_ALWAYS_UNAVAILABLE_DETAILS = { reason: "APPROVAL_ALLOW_ALWAYS_UNAVAILABLE" };
const RESERVED_PLUGIN_APPROVAL_ID_PREFIX = "plugin:";
function normalizeCommandSpans(spans, commandLength) {
	if (!spans) return;
	const candidates = spans.filter((span) => Number.isSafeInteger(span.startIndex) && Number.isSafeInteger(span.endIndex) && span.startIndex >= 0 && span.endIndex > span.startIndex && span.endIndex <= commandLength).toSorted((a, b) => a.startIndex - b.startIndex || b.endIndex - a.endIndex);
	const accepted = [];
	let cursor = 0;
	for (const span of candidates) {
		if (span.startIndex < cursor) continue;
		accepted.push({
			startIndex: span.startIndex,
			endIndex: span.endIndex
		});
		cursor = span.endIndex;
	}
	return accepted.length > 0 ? accepted : void 0;
}
function createExecApprovalHandlers(manager, opts) {
	return {
		"exec.approval.get": async (options) => {
			try {
				var _usingCtx$1 = _usingCtx();
				const authority = _usingCtx$1.u(createApprovalRequestAuthority(options));
				const { params, respond, client, context } = options;
				if (!assertValidParams(params, validateExecApprovalGetParams, "exec.approval.get", respond)) return;
				const resolved = await resolvePendingApprovalRecord({
					authority,
					manager,
					inputId: params.id,
					client,
					...client?.authenticatedUserProfile ? { getCfg: context.getRuntimeConfig } : {},
					exposeAmbiguousPrefixError: true
				});
				authority.assertCurrent();
				if (!resolved.ok) {
					respondPendingApprovalLookupError({
						respond,
						response: resolved.response
					});
					return;
				}
				const { commandText, commandPreview } = resolveExecApprovalCommandDisplay(resolved.snapshot.request);
				respond(true, {
					id: resolved.approvalId,
					commandText,
					commandPreview,
					allowedDecisions: resolveExecApprovalRequestAllowedDecisions(resolved.snapshot.request),
					host: resolved.snapshot.request.host ?? null,
					nodeId: resolved.snapshot.request.nodeId ?? null,
					agentId: resolved.snapshot.request.agentId ?? null,
					expiresAtMs: resolved.snapshot.expiresAtMs
				}, void 0);
			} catch (_) {
				_usingCtx$1.e = _;
			} finally {
				_usingCtx$1.d();
			}
		},
		"exec.approval.list": async (options) => {
			try {
				var _usingCtx3 = _usingCtx();
				const authority = _usingCtx3.u(createApprovalRequestAuthority(options));
				const { respond, client, context } = options;
				const approvals = await listVisiblePendingApprovalRequests({
					authority,
					manager,
					client,
					approvalKind: "exec",
					...client?.authenticatedUserProfile ? { getCfg: context.getRuntimeConfig } : {}
				});
				authority.assertCurrent();
				respond(true, approvals, void 0);
			} catch (_) {
				_usingCtx3.e = _;
			} finally {
				_usingCtx3.d();
			}
		},
		"exec.approval.request": async ({ params, respond, context, client }) => {
			if (!assertValidParams(params, validateExecApprovalRequestParams, "exec.approval.request", respond)) return;
			const p = params;
			const twoPhase = p.twoPhase === true;
			const timeoutMs = typeof p.timeoutMs === "number" ? p.timeoutMs : DEFAULT_EXEC_APPROVAL_TIMEOUT_MS;
			const explicitId = p.id ?? null;
			const host = normalizeOptionalString(p.host) ?? "";
			const nodeId = normalizeOptionalString(p.nodeId) ?? "";
			const trustedAgentRuntime = client?.internal?.agentRuntimeIdentity;
			if (trustedAgentRuntime && context.validateAgentRuntimeApprovalAuthority?.(trustedAgentRuntime) !== true) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "agent runtime approval authority is no longer active"));
				return;
			}
			const approvalContext = resolveSystemRunApprovalRequestContext({
				host,
				command: p.command,
				commandArgv: p.commandArgv,
				systemRunPlan: p.systemRunPlan,
				cwd: p.cwd,
				agentId: trustedAgentRuntime?.agentId ?? p.agentId,
				sessionKey: trustedAgentRuntime?.sessionKey ?? p.sessionKey
			});
			const effectiveCommandArgv = approvalContext.commandArgv;
			const effectiveCwd = approvalContext.cwd;
			const effectiveAgentId = approvalContext.agentId;
			const effectiveSessionKey = approvalContext.sessionKey;
			const effectiveCommandText = approvalContext.commandText;
			const requestRunId = trustedAgentRuntime?.operationalRunInstance.runId ?? normalizeOptionalString(p.runId);
			if (host === "node" && !nodeId) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "nodeId is required for host=node"));
				return;
			}
			if (host === "node" && !approvalContext.plan) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "systemRunPlan is required for host=node"));
				return;
			}
			if (effectiveCommandText.trim().length === 0) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "command is required"));
				return;
			}
			if (explicitId?.startsWith(RESERVED_PLUGIN_APPROVAL_ID_PREFIX)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `approval ids starting with ${RESERVED_PLUGIN_APPROVAL_ID_PREFIX} are reserved`));
				return;
			}
			if (host === "node" && (!Array.isArray(effectiveCommandArgv) || effectiveCommandArgv.length === 0)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "commandArgv is required for host=node"));
				return;
			}
			const envBinding = buildSystemRunApprovalEnvBinding(p.env);
			const warningText = normalizeOptionalString(p.warningText);
			const runtimeConfig = typeof context.getRuntimeConfig === "function" ? context.getRuntimeConfig() : {};
			const commandHighlighting = resolveExecCommandHighlighting({
				config: runtimeConfig,
				agentId: effectiveAgentId
			});
			const sanitizedCommandDisplay = sanitizeExecApprovalDisplayTextWithStatus(effectiveCommandText);
			if (sanitizedCommandDisplay.truncated || sanitizedCommandDisplay.oversized) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "command exceeds exec approval display limit", { details: { reason: "EXEC_APPROVAL_COMMAND_DISPLAY_LIMIT" } }));
				return;
			}
			const sanitizedCommandText = sanitizedCommandDisplay.text;
			const commandAnalysis = await resolveCommandAnalysisSummaryForDisplay({
				host,
				commandText: effectiveCommandText,
				commandArgv: effectiveCommandArgv,
				cwd: effectiveCwd,
				sanitizeText: sanitizeExecApprovalWarningText
			});
			const commandSpans = commandHighlighting && sanitizedCommandText === effectiveCommandText ? normalizeCommandSpans(p.commandSpans, sanitizedCommandText.length) : void 0;
			const systemRunBinding = host === "node" ? buildSystemRunApprovalBinding({
				argv: effectiveCommandArgv,
				cwd: effectiveCwd,
				agentId: effectiveAgentId,
				sessionKey: effectiveSessionKey,
				env: p.env
			}) : null;
			if (explicitId && await manager.getSnapshot(explicitId)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "approval id already pending"));
				return;
			}
			const unavailableDecisions = normalizeExecApprovalUnavailableDecisions(p.unavailableDecisions);
			const cronRunExecSource = host === "gateway" && requestRunId ? lookupCronRunExecSource(requestRunId) : void 0;
			const cronExecutionSource = cronRunExecSource && effectiveAgentId && cronRunExecSource.agentId === effectiveAgentId ? {
				jobId: cronRunExecSource.jobId,
				jobConfigRevision: cronRunExecSource.jobConfigRevision
			} : null;
			const grantDefaultExpiryDays = cronExecutionSource ? resolveGrantExpiryDaysConfig(context.getRuntimeConfig()) : null;
			const standingGrantScope = cronExecutionSource && cronRunExecSource && effectiveCommandText ? {
				kind: "standing-grant",
				automation: sanitizeExecApprovalDisplayText(cronRunExecSource.jobName).slice(0, 128),
				command: sanitizeExecApprovalDisplayText(effectiveCommandText).slice(0, 256),
				...grantDefaultExpiryDays !== null ? { expiresInDays: grantDefaultExpiryDays } : {}
			} : null;
			const request = {
				command: sanitizedCommandText,
				commandPreview: host === "node" || !approvalContext.commandPreview ? void 0 : sanitizeExecApprovalDisplayText(approvalContext.commandPreview),
				commandArgv: host === "node" ? void 0 : effectiveCommandArgv,
				envKeys: envBinding.envKeys.length > 0 ? envBinding.envKeys : void 0,
				systemRunBinding: systemRunBinding?.binding ?? null,
				systemRunPlan: approvalContext.plan,
				cwd: effectiveCwd ? sanitizeExecApprovalDisplayText(effectiveCwd) : null,
				nodeId: host === "node" ? nodeId : null,
				host: host ? sanitizeExecApprovalDisplayText(host) : null,
				security: normalizeExecSecurity(p.security) ?? null,
				ask: normalizeExecAsk(p.ask) ?? null,
				warningText: warningText ? sanitizeExecApprovalWarningText(warningText) : null,
				scope: standingGrantScope ?? (p.scope ? sanitizeApprovalScope(p.scope) : null),
				commandAnalysis,
				commandSpans,
				unavailableDecisions: unavailableDecisions.length > 0 ? unavailableDecisions : void 0,
				allowedDecisions: resolveExecApprovalRequestAllowedDecisions({
					ask: p.ask ?? null,
					unavailableDecisions
				}),
				agentId: effectiveAgentId ?? null,
				resolvedPath: p.resolvedPath ? sanitizeExecApprovalDisplayText(p.resolvedPath) : null,
				sessionKey: effectiveSessionKey ?? null,
				sessionId: trustedAgentRuntime ? null : normalizeOptionalString(p.sessionId) ?? null,
				runId: requestRunId ?? null,
				toolCallId: normalizeOptionalString(p.toolCallId) ?? null,
				turnSourceChannel: trustedAgentRuntime ? trustedAgentRuntime.turnSourceChannel ?? null : normalizeOptionalString(p.turnSourceChannel) ?? null,
				turnSourceTo: trustedAgentRuntime ? trustedAgentRuntime.turnSourceTo ?? null : normalizeOptionalString(p.turnSourceTo) ?? null,
				turnSourceAccountId: trustedAgentRuntime ? trustedAgentRuntime.turnSourceAccountId ?? null : normalizeOptionalString(p.turnSourceAccountId) ?? null,
				turnSourceThreadId: trustedAgentRuntime ? trustedAgentRuntime.turnSourceThreadId ?? null : p.turnSourceThreadId ?? null,
				cronExecutionSource,
				cronOperationBinding: cronExecutionSource ? buildCronExecOperationBinding({
					command: effectiveCommandText,
					cwd: effectiveCwd,
					env: p.env
				}) : null
			};
			if (requestRunId && context.chatRunState.hasAbortMarker(requestRunId)) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "approval run already aborted", { details: { reason: "EXEC_APPROVAL_RUN_ABORTED" } }));
				return;
			}
			let record;
			try {
				record = manager.create(request, timeoutMs, explicitId);
			} catch (error) {
				if (error instanceof InvalidApprovalIdError) {
					respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, error.message, { details: {
						code: error.code,
						reason: error.reason
					} }));
					return;
				}
				throw error;
			}
			bindApprovalRequesterMetadata({
				record,
				client
			});
			if (trustedAgentRuntime) record.agentRuntimeDelegatedAuthority = trustedAgentRuntime.delegatedAuthority;
			const trustedExecutionIdentity = trustedAgentRuntime?.executionIdentity;
			if (trustedExecutionIdentity && requestRunId === trustedExecutionIdentity.runId) record.executionIdentityToken = trustedExecutionIdentity;
			if (client?.internal?.approvalRuntime === true) bindApprovalReviewerDeviceIds({
				record,
				deviceIds: p.approvalReviewerDeviceIds
			});
			if (!await registerPendingApprovalRecord({
				manager,
				record,
				timeoutMs,
				respond,
				context
			})) return;
			await handlePendingApprovalRequestWithDelivery({
				approvalKind: "exec",
				manager,
				record,
				respond,
				context,
				clientConnId: client?.connId,
				twoPhase,
				requireDeliveryRoute: p.requireDeliveryRoute,
				suppressDelivery: p.suppressDelivery,
				deliverToApprovalClientsOnly: p.deliverToApprovalClientsOnly === true || cronExecutionSource !== null,
				forwardRequest: opts?.forwarder?.handleRequested.bind(opts.forwarder),
				getIosPushDelivery: () => opts?.iosPushDelivery
			});
		},
		"exec.approval.waitDecision": async (options) => {
			try {
				var _usingCtx4 = _usingCtx();
				const authority = _usingCtx4.u(createApprovalRequestAuthority(options));
				const { params, respond, client, context } = options;
				await handleApprovalWaitDecision({
					authority,
					manager,
					inputId: params.id,
					client,
					...client?.authenticatedUserProfile ? { getCfg: context.getRuntimeConfig } : {},
					respond,
					resolveTerminalReason: (snapshot) => {
						const runId = normalizeOptionalString(snapshot.request.runId);
						return runId && context.chatRunState.hasAbortMarker(runId) ? "run-aborted" : void 0;
					}
				});
			} catch (_) {
				_usingCtx4.e = _;
			} finally {
				_usingCtx4.d();
			}
		},
		"exec.approval.grants.list": async ({ params, respond }) => {
			if (!assertValidParams(params, validateExecApprovalGrantsListParams, "exec.approval.grants.list", respond)) return;
			const p = params;
			respond(true, { grants: listCronStandingGrants(p.limit ? { limit: p.limit } : {}).map((grant) => {
				const operation = parseCronExecOperationBinding(grant.operationBinding);
				return {
					grantId: grant.grantId,
					mintedByApprovalId: grant.mintedByApprovalId,
					agentId: grant.agentId,
					cronJobId: grant.cronJobId,
					cronJobName: grant.cronJobName,
					command: sanitizeExecApprovalDisplayText(operation?.command ?? "(unreadable)").slice(0, 512),
					cwd: operation?.cwd ? sanitizeExecApprovalDisplayText(operation.cwd).slice(0, 512) : null,
					createdAtMs: grant.createdAtMs,
					expiresAtMs: grant.expiresAtMs,
					revokedAtMs: grant.revokedAtMs,
					revokedBy: grant.revokedBy,
					lastUsedAtMs: grant.lastUsedAtMs,
					useCount: grant.useCount
				};
			}) }, void 0);
		},
		"exec.approval.grants.revoke": async ({ params, respond, client }) => {
			if (!assertValidParams(params, validateExecApprovalGrantsRevokeParams, "exec.approval.grants.revoke", respond)) return;
			const p = params;
			const revokedBy = client?.connect?.client?.displayName ?? client?.connect?.client?.id ?? "operator";
			respond(true, { outcome: revokeCronStandingGrant({
				grantId: p.grantId,
				revokedBy
			}).outcome }, void 0);
		},
		"exec.approval.resolve": async (options) => {
			try {
				var _usingCtx5 = _usingCtx();
				const authority = _usingCtx5.u(createApprovalRequestAuthority(options));
				const { params, respond, client, context } = options;
				const resolveParams = resolveApprovalDecisionParams({
					rawParams: params,
					validate: validateExecApprovalResolveParams,
					methodName: "exec.approval.resolve",
					respond
				});
				if (!resolveParams) return;
				const { inputId, decision, reviewer } = resolveParams;
				const overrideDays = params.grantExpiresInDays;
				const grantExpiresAtMs = decision === "allow-always" && typeof overrideDays === "number" ? Date.now() + Math.floor(overrideDays) * 864e5 : void 0;
				let autoReviewResolution = false;
				await handleApprovalResolve({
					approvalKind: "exec",
					authority,
					manager,
					inputId,
					decision,
					respond,
					context,
					client,
					reviewer,
					exposeAmbiguousPrefixError: true,
					validateDecision: (snapshot) => {
						const autoReviewIdentity = client?.internal?.approvalRuntime === true ? client.internal.agentRuntimeIdentity : void 0;
						if (autoReviewIdentity) {
							const requestAgentId = normalizeAgentId(snapshot.request.agentId ?? void 0);
							const requestSessionKey = normalizeOptionalString(snapshot.request.sessionKey);
							if (decision !== "allow-once" || snapshot.request.host !== "node" || requestAgentId !== autoReviewIdentity.agentId || requestSessionKey !== autoReviewIdentity.sessionKey) return {
								message: "auto-review approval identity does not match request",
								details: { reason: "AUTO_REVIEW_APPROVAL_IDENTITY_MISMATCH" }
							};
							autoReviewResolution = true;
						}
						return resolveExecApprovalRequestAllowedDecisions(snapshot.request).includes(decision) ? null : {
							message: "allow-always is unavailable for this command",
							details: APPROVAL_ALLOW_ALWAYS_UNAVAILABLE_DETAILS
						};
					},
					resolveRecord: async ({ approvalId, decision: decisionLocal, resolvedBy, resolver, guard }) => {
						if (autoReviewResolution) return manager.resolveAutoReview(approvalId, resolvedBy, void 0, guard);
						const grantOptions = {
							guard,
							...grantExpiresAtMs !== void 0 ? { grantExpiresAtMs } : {}
						};
						return resolver ? (await manager.resolveDetailed(approvalId, decisionLocal, resolver, resolvedBy, "operator", grantOptions)).outcome === "resolved" : manager.resolve(approvalId, decisionLocal, resolvedBy, grantOptions);
					},
					forwardResolved: (resolvedEvent) => opts?.forwarder?.handleResolved(resolvedEvent),
					forwardResolvedErrorLabel: "exec approvals: forward resolve failed",
					extraResolvedHandlers: opts?.iosPushDelivery?.handleResolved ? [{
						run: (resolvedEvent) => opts.iosPushDelivery.handleResolved(resolvedEvent),
						errorLabel: "exec approvals: iOS push resolve failed"
					}] : void 0
				});
			} catch (_) {
				_usingCtx5.e = _;
			} finally {
				_usingCtx5.d();
			}
		}
	};
}
//#endregion
export { createExecApprovalHandlers };
