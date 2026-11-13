import { r as getAsyncWorkSignal, t as AsyncWorkScope } from "./async-work-scope-ClifbwQr.mjs";
import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { a as getPluginRuntimeGatewayRequestScope, c as withPluginRuntimeGatewayRequestScope, i as getPluginRuntimeGatewayNodeAuthorities, u as withPluginRuntimeRegistryScope } from "./gateway-request-scope-Da9jAC9_.mjs";
import { r as isIncognitoSessionKey } from "./session-key-DDIJxXfQ.mjs";
import { A as parseAgentSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { i as getGatewayPluginMetadataSnapshot } from "./current-plugin-metadata-state-oQuFR0NJ.mjs";
import { n as sessionChanges } from "./session-row-changes-DFigA589.mjs";
import { l as getActivePluginRegistry } from "./runtime-BnZb2P5v.mjs";
import { d as isOperatorScope, t as ADMIN_SCOPE } from "./operator-scopes-D-CL26h0.mjs";
import { a as isRuntimeToolAllowed, s as isToolAllowedByPolicyName } from "./tool-policy-match-COwlx5YS.mjs";
import "./user-profile-constants-DfyZS95p.mjs";
import { L as onUserProfilesChanged } from "./user-profiles-internal-Co87Y1ZN.mjs";
import { D as tryBeginGatewayPreparedRestartRootWorkAdmission, c as getGatewaySuspendAdmissionPhase, k as tryBeginGatewayRootWorkAdmission, s as getGatewayRestartDrainSignal, u as isGatewayRestartDraining } from "./gateway-work-admission-B4bQUVQ6.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape, p as missingScopeErrorShape } from "./error-codes-DI20vDEB.mjs";
import { n as GATEWAY_SUSPEND_IDENTITY_RETRY_AFTER_MS, r as GATEWAY_SUSPEND_UNAVAILABLE_REASON, t as GATEWAY_RESTART_UNAVAILABLE_REASON } from "./restart-unavailable-D7hxHvLm.mjs";
import { a as onOperatorRolePolicyChanged, d as resolveOperatorRolePolicy, t as authorizeCurrentOperatorRoleScopes, u as resolveGatewayOperatorRoleActor } from "./operator-role-policy-Cx-TzI2k.mjs";
import { n as captureGatewayOperatorRunAuthority } from "./operator-run-authority-CZcmYuYn.mjs";
import { o as prepareUserProfileRoleAuthority } from "./user-channel-identity-operations-CyHQYsXR.mjs";
import { r as sessionDeliveryOrigin } from "./delivery-context.read-CR06zOJ4.mjs";
import { r as onSessionIdentityMutation } from "./session-lifecycle-events-Ded_zLM3.mjs";
import { m as withCanonicalSessionValidationDeferral } from "./session-canonical-key-Cjd4Pn_g.mjs";
import { i as gatewayStartupUnavailableDetails } from "./startup-unavailable-D0-EeFjq.mjs";
import { n as resolveSessionMethodScope } from "./session-method-scopes-base-CwcrKAWU.mjs";
import { c as resolveLeastPrivilegeOperatorScopesForMethod, n as authorizeOperatorScopesForMethod, r as authorizeOperatorScopesForRequiredScope } from "./method-scopes-DZtl1Vvs.mjs";
import { n as createCoreGatewayMethodDescriptors, r as isCoreGatewayMethodClassified } from "./core-method-policy-BePoiMRV.mjs";
import { a as sessionMutationTargetFields } from "./session-method-policy-5Q_p2C9o.mjs";
import { i as classifyGatewayStaleInstall } from "./stale-install-WxGvG7K9.mjs";
import { n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { i as getGatewayToolCallerIdentity, t as captureGatewayToolCallerAssertion } from "./gateway-caller-context-DQ2iIITl.mjs";
import { n as resolveSandboxRuntimeStatus } from "./runtime-status-DhbVLtao.mjs";
import { l as holdsCronManagementGrant } from "./cron-creator-authority-grant-u0vMj56w.mjs";
import { t as resolveConversationCapabilityProfile } from "./conversation-capability-profile-DC5b6Jzy.mjs";
import { n as isConversationToolAllowed } from "./conversation-tool-policy-pipeline-sb3plgU7.mjs";
import { t as SessionMutationAuthorizationChangedError } from "./session-mutation-authorization-error-CCz8QGWh.mjs";
import { a as readGatewayRequestMutationAuthority, i as captureGatewayRequestOperatorGuard, n as bindGatewayRequestHandlerMutationAuthority, o as withSessionMutationCommitGuard } from "./session-mutation-guards-D2NVekUc.mjs";
import { C as authorizeAuthenticatedProfileForMethod, D as resolveChatSendCallerContext, f as isGatewayAdmin, r as authorizeOwnSessionMutation } from "./session-sharing-policy-BALdNo4L.mjs";
import { n as getSessionRowProjection } from "./session-row-projection-access-tcGTz6Lk.mjs";
import { t as resolveSessionSelectedModelRef } from "./session-utils-model-selection-hLJPUXtO.mjs";
import { n as createExpectedProfileBinding } from "./expected-profile-DOrr_bU5.mjs";
import { S as prepareSessionSharing, o as resolveDirectIncognitoTargets, s as resolveDirectSessionTargets, t as resolveSessionMutationAuthorization } from "./session-sharing-Bhe-fXzH.mjs";
import { n as resolveControlPlaneActor, t as formatControlPlaneActor } from "./control-plane-audit-BweVk5Pg.mjs";
import { n as consumeControlPlaneWriteBudget, t as CONTROL_PLANE_RATE_LIMIT_WINDOW_MS } from "./control-plane-rate-limit-DwIXG8Gz.mjs";
import { n as createGatewayMethodRegistry, r as createPluginGatewayMethodDescriptors, t as createGatewayMethodDescriptorsFromHandlers } from "./registry-CAoo0u-p.mjs";
import { t as canSelectQuestion } from "./question-access-Zri0o4CD.mjs";
import { n as prepareGatewayRequestHandler } from "./lazy-core-handlers-CElydRLU.mjs";
import { n as gatewayRouterUploadPolicyError, t as coreGatewayHandlers } from "./core-handlers-DCdF9yY_.mjs";
import { n as parseGatewayRole, t as isRoleAuthorizedForMethod } from "./role-policy-C4wSnCoS.mjs";
import { t as isTargetedNonSafeGatewayRestartRequest } from "./restart-request-D6CBb1rS.mjs";
import { r as hasGatewayAdminScope } from "./chat-origin-routing-ERRgN7zv.mjs";
import { r as retainSessionListForegroundWork } from "./session-projection-work-BJ52HUIn.mjs";
//#region src/gateway/server-methods/method-authorization.ts
function authorizeGatewayMethod(method, client, params, methodRegistry, context) {
	if (!client?.connect || method === "health") return { error: null };
	const roleRaw = client.connect.role ?? "operator";
	const role = parseGatewayRole(roleRaw);
	if (!role) return { error: errorShape(ErrorCodes.INVALID_REQUEST, `unauthorized role: ${roleRaw}`) };
	const scopes = client.connect.scopes ?? [];
	if (!isRoleAuthorizedForMethod(role, method)) return { error: errorShape(ErrorCodes.INVALID_REQUEST, `unauthorized role: ${role}`) };
	if (role === "node") return { error: null };
	if (client.invalidated) return { error: errorShape(ErrorCodes.FORBIDDEN, "Gateway requester authority changed") };
	if (resolveGatewayOperatorRoleActor(client)?.kind === "operator") {
		const roleError = authorizeCurrentOperatorRoleScopes(client, (context.getCommittedRuntimeConfig ?? context.getRuntimeConfig)());
		if (roleError) return { error: roleError };
	}
	if (method === "device.scopes.requestUpgrade" || method === "device.scopes.waitUpgrade") return { error: null };
	if (scopes.includes("operator.admin")) return { error: null };
	const registeredScope = methodRegistry.getScope(method);
	const scopeAuth = isOperatorScope(registeredScope) ? authorizeOperatorScopesForRequiredScope(registeredScope, scopes, methodRegistry.getSessionAccess?.(method)?.allowOwnSessionScope ? "operator.sessions.write" : resolveSessionMethodScope(method, params), method) : authorizeOperatorScopesForMethod(method, scopes, params);
	if (!scopeAuth.allowed) {
		const runtimeIdentity = client.internal?.agentRuntimeIdentity;
		if (runtimeIdentity?.cronManagementGrant && holdsCronManagementGrant(runtimeIdentity.cronManagementGrant, runtimeIdentity, method)) return { error: null };
		const resolvedRequiredScopes = isOperatorScope(registeredScope) ? [registeredScope] : resolveLeastPrivilegeOperatorScopesForMethod(method, params);
		return { error: missingScopeErrorShape({
			missingScope: scopeAuth.missingScope,
			requiredScopes: resolvedRequiredScopes.length > 0 ? resolvedRequiredScopes : [scopeAuth.missingScope]
		}) };
	}
	return {
		error: null,
		sessionScope: scopeAuth.sessionScope
	};
}
//#endregion
//#region src/gateway/server-request-lifecycle.ts
function workAdmissionUnavailableError(method) {
	const restartDraining = isGatewayRestartDraining();
	return errorShape(ErrorCodes.UNAVAILABLE, `${method} unavailable during gateway ${restartDraining ? "restart" : "suspension"}`, {
		retryable: true,
		retryAfterMs: !restartDraining && method === "agent.identity.get" ? GATEWAY_SUSPEND_IDENTITY_RETRY_AFTER_MS : 1e3,
		details: {
			method,
			reason: restartDraining ? GATEWAY_RESTART_UNAVAILABLE_REASON : GATEWAY_SUSPEND_UNAVAILABLE_REASON,
			phase: getGatewaySuspendAdmissionPhase()
		}
	});
}
/** Cancels passive waiters without abandoning their owner's admitted writes. */
async function runWithGatewayObservationScope(run, requestSignals, cancelled) {
	const work = new AsyncWorkScope();
	const signal = AbortSignal.any([
		getGatewayRestartDrainSignal(),
		getAsyncWorkSignal(),
		...requestSignals
	].filter((candidate) => candidate !== void 0));
	const close = () => work.beginClose(signal.reason);
	signal.addEventListener("abort", close, { once: true });
	if (signal.aborted) close();
	try {
		work.signal.throwIfAborted();
		const result = await work.track(run);
		work.signal.throwIfAborted();
		return result;
	} catch (error) {
		if (!work.signal.aborted) throw error;
		return await cancelled();
	} finally {
		signal.removeEventListener("abort", close);
		await work.drain();
	}
}
//#endregion
//#region src/gateway/session-resource-tool-policy.ts
function denied$1(message = "The session's current tool policy does not allow this operation.") {
	throw new SessionMutationAuthorizationChangedError(errorShape(ErrorCodes.FORBIDDEN, message, { details: { code: "SESSION_RESOURCE_TOOL_POLICY" } }));
}
/** Evaluate canonical tool policy using facts already prepared by the session authority. */
function resolveSessionResourceToolPolicy(params) {
	const { config, current } = params;
	const entry = current.entry;
	if (entry.modelSelectionLocked === true) denied$1("Session-scoped resources are unavailable for sessions with locked model selection. Administrator global access remains available.");
	const readEntry = (key) => {
		const parsed = parseAgentSessionKey(key);
		if (!parsed) return;
		const related = params.readPreparedSessionEntry({
			key,
			agentId: parsed.agentId,
			...parsed.agentId === current.agentId ? { storePath: current.storePath } : {}
		});
		if (!related) denied$1();
		return related;
	};
	const store = {
		authoritative: true,
		get: readEntry,
		getById: () => void 0
	};
	const metadata = getGatewayPluginMetadataSnapshot();
	const model = resolveSessionSelectedModelRef({
		cfg: config,
		sessionKey: current.canonicalKey,
		agentId: current.agentId,
		source: {
			entry,
			readSourceEntry: readEntry
		},
		manifestPlugins: metadata ?? []
	});
	const sandbox = resolveSandboxRuntimeStatus({
		cfg: config,
		sessionKey: current.canonicalKey,
		agentId: current.agentId,
		preparedSessionEntry: entry
	});
	const caller = resolveChatSendCallerContext(params.client);
	const origin = sessionDeliveryOrigin(entry);
	const capability = resolveConversationCapabilityProfile({
		config,
		agentId: current.agentId,
		sessionKey: current.canonicalKey,
		sessionId: entry.sessionId,
		preparedSessionEntry: {
			sessionKey: current.canonicalKey,
			entry
		},
		preparedSessionCapabilityStore: store,
		spawnedBy: entry.spawnedBy,
		modelProvider: model.provider,
		modelId: model.model,
		pluginMetadataSnapshot: metadata,
		messageProvider: caller.Provider,
		messageChannel: caller.Surface,
		senderId: caller.SenderId,
		senderName: caller.SenderName,
		senderUsername: caller.SenderUsername,
		senderIsOwner: hasGatewayAdminScope(params.client),
		agentAccountId: origin?.accountId,
		groupId: entry.groupId,
		groupChannel: entry.groupChannel,
		groupSpace: entry.space,
		sandboxToolPolicy: sandbox.sandboxed ? sandbox.toolPolicy : void 0
	});
	if (!isConversationToolAllowed(capability, params.toolName)) denied$1();
	return {
		sandboxRequired: sandbox.sandboxRequired,
		sandboxed: sandbox.sandboxed
	};
}
//#endregion
//#region src/gateway/session-access-authority.ts
function denied(message = "Session access changed; reopen the session before continuing.") {
	throw new SessionMutationAuthorizationChangedError(errorShape(ErrorCodes.FORBIDDEN, message, { details: { code: "SESSION_ACCESS_CHANGED" } }));
}
var SessionAccessPreparationPendingError = class extends SessionMutationAuthorizationChangedError {
	constructor() {
		super(errorShape(ErrorCodes.UNAVAILABLE, "Session access is refreshing; retry the operation shortly.", {
			retryable: true,
			details: { code: "SESSION_ACCESS_REFRESHING" }
		}));
	}
};
/** Prepare session/profile facts through resident owners; retain the original source authority. */
async function prepareGatewaySessionAccessAuthority(request) {
	const params = {
		...request,
		policy: { ...request.policy }
	};
	const assertInvocationCurrent = params.assertInvocationCurrent;
	assertInvocationCurrent?.();
	const input = params.requestParams;
	const sessionKey = isRecord(input) && typeof input.sessionKey === "string" ? input.sessionKey : "";
	const parsed = parseAgentSessionKey(sessionKey);
	if (!parsed || sessionKey !== sessionKey.trim() || isIncognitoSessionKey(sessionKey) || isRecord(input) && input.agentId !== void 0 && input.agentId !== parsed.agentId) denied("This operation requires a canonical, non-incognito sessionKey and its matching agentId.");
	const client = params.client;
	const initialActor = resolveGatewayOperatorRoleActor(client);
	const actor = initialActor ? { ...initialActor } : void 0;
	const profileId = actor?.kind === "operator" ? actor.profileId : client?.authenticatedUserProfile?.profileId;
	const originalGrant = client?.internal?.operatorAccessAuthority;
	const originalRun = client?.internal?.operatorRunAuthority;
	const originalScopes = [...client?.connect.scopes ?? []];
	const tool = client?.internal?.agentToolCaller;
	const runtime = client?.internal?.agentRuntimeIdentity;
	const ambient = client?.internal?.syntheticClient ? getGatewayToolCallerIdentity() : void 0;
	const assertAmbient = ambient ? captureGatewayToolCallerAssertion() : void 0;
	const owner = tool ?? runtime ?? (assertAmbient ? ambient : void 0);
	const inherited = runtime?.sessionSpawnContext?.inheritedToolPolicy;
	const inheritedPolicy = inherited ? {
		allow: [...inherited.allow],
		deny: [...inherited.deny]
	} : void 0;
	if (!client || client.internal?.syntheticClient && !owner || tool && !tool.assertCurrent) denied("Session resources require an authenticated operator or an admitted agent run.");
	if (owner && (owner.sessionKey !== sessionKey || owner.agentId !== parsed.agentId)) denied("An agent can only access resources in its own conversation.");
	const assertRun = () => {
		tool?.assertCurrent?.();
		if (ambient) {
			if (!assertAmbient || ambient.agentId !== parsed.agentId || ambient.sessionKey !== sessionKey || ambient.gatewayContextResolver && ambient.gatewayContextResolver() !== params.context) denied();
			assertAmbient();
		}
		if (runtime && params.context.validateAgentRuntimeApprovalAuthority?.(runtime) !== true) denied();
		const requiredTool = params.policy.requiredTool;
		if (requiredTool && owner) {
			if (ambient) {
				if (!ambient.assertToolAllowed || !ambient.operationalRunInstance || runtime && (runtime.operationalRunInstance.instanceId !== ambient.operationalRunInstance.instanceId || runtime.operationalRunInstance.runId !== ambient.operationalRunInstance.runId)) denied();
				ambient.assertToolAllowed(requiredTool);
			} else if (!inheritedPolicy) denied();
			if (inheritedPolicy && (!isRuntimeToolAllowed(requiredTool, inheritedPolicy.allow) || !isToolAllowedByPolicyName(requiredTool, { deny: inheritedPolicy.deny }))) denied();
		}
	};
	assertRun();
	originalGrant?.assertCurrent();
	originalRun?.assertCurrent();
	const projection = getSessionRowProjection(params.context);
	if (!projection) denied("Session access is unavailable during Gateway startup; retry when it is ready.");
	const assertIngress = () => {
		assertInvocationCurrent?.();
		assertRun();
		originalGrant?.assertCurrent();
		originalRun?.assertCurrent();
		const currentActor = resolveGatewayOperatorRoleActor(client);
		if (params.hasCurrentClientAuthority?.() === false || currentActor?.kind !== actor?.kind || currentActor?.kind === "operator" && currentActor.profileId !== profileId || JSON.stringify(client.connect.scopes ?? []) !== JSON.stringify(originalScopes) || client.internal?.operatorAccessAuthority !== originalGrant || client.internal?.operatorRunAuthority !== originalRun) denied();
	};
	const captured = await captureGatewayOperatorRunAuthority({
		client,
		context: params.context,
		hasCurrentClientAuthority: params.hasCurrentClientAuthority,
		sourceAuthority: originalGrant ?? null
	});
	try {
		assertIngress();
		const profile = profileId ? await prepareUserProfileRoleAuthority(profileId) : void 0;
		assertIngress();
		captured?.authority.assertCurrent();
		if (actor?.kind !== "system" && (!profile || profile.profileId !== profileId)) denied("This operation requires a current authenticated profile.");
		await projection.prepareMembership();
		assertIngress();
		captured?.authority.assertCurrent();
		const query = {
			agentId: parsed.agentId,
			key: sessionKey
		};
		const original = projection.sharingTarget(query);
		if (!original?.entry.sessionId || original.canonicalKey !== sessionKey) denied("The requested session is unavailable; open an existing session first.");
		const target = Object.freeze({
			agentId: original.agentId,
			sessionKey: original.canonicalKey,
			sessionId: original.entry.sessionId,
			...original.entry.lifecycleRevision ? { lifecycleRevision: original.entry.lifecycleRevision } : {}
		});
		const policyClient = {
			...client,
			connect: {
				...client.connect,
				scopes: originalScopes
			},
			internal: {
				...client.internal,
				operatorRoleActor: actor,
				...captured ? { operatorRunAuthority: captured.authority } : {}
			}
		};
		const resolveToolPolicy = (current) => params.policy.requiredTool ? resolveSessionResourceToolPolicy({
			config: params.context.getRuntimeConfig(),
			client: policyClient,
			current,
			readPreparedSessionEntry: (sourceQuery) => projection.sharingTarget(sourceQuery)?.entry,
			toolName: params.policy.requiredTool
		}) : void 0;
		const toolPolicy = resolveToolPolicy(original);
		const currentRole = () => actor?.kind === "system" || profileId === "gateway-owner" ? void 0 : resolveOperatorRolePolicy(policyClient, params.context.getRuntimeConfig());
		const sandboxRequired = currentRole()?.sandbox === "required" || toolPolicy?.sandboxRequired === true;
		let sessionRetired = false;
		let actorRetired = false;
		let invocationClosed = false;
		const assertSession = () => {
			if (sessionRetired) denied();
			if (getSessionRowProjection(params.context) !== projection) {
				sessionRetired = true;
				denied();
			}
			const state = projection.sharingTargetState(query);
			if (state.status === "pending") throw new SessionAccessPreparationPendingError();
			const current = state.status === "ready" ? state.target : void 0;
			if (!current || current.storePath !== original.storePath || current.generation !== original.generation || current.entry.sessionId !== target.sessionId || current.entry.lifecycleRevision !== target.lifecycleRevision) {
				sessionRetired = true;
				denied();
			}
			return current;
		};
		const assertActor = () => {
			if (actorRetired) denied();
			try {
				captured?.authority.assertCurrent();
				originalGrant?.assertCurrent();
				if (profile && !profile.isCurrent()) denied();
				const role = currentRole();
				if (role && role.agents !== "*" && !role.agents.includes(target.agentId)) denied();
				const current = assertSession();
				const currentToolPolicy = resolveToolPolicy(current);
				if (currentToolPolicy?.sandboxRequired !== toolPolicy?.sandboxRequired || currentToolPolicy?.sandboxed !== toolPolicy?.sandboxed) denied("The session's current tool policy does not allow this operation.");
				const sharing = prepareSessionSharing({
					cfg: params.context.getRuntimeConfig(),
					client: policyClient
				}, {
					aliases: new Set(profile?.aliases ?? []),
					sessionCap: role?.sessions.others,
					isMember: (row, identity) => projection.hasMembership(row.storePath, row.storeKey, identity)
				});
				if (params.ownSessionOnly && authorizeOwnSessionMutation({
					client: policyClient,
					target: current,
					expectedProfileId: profileId,
					isCreator: sharing.isCreator
				}) || sharing.authorizeTarget(current)) denied();
			} catch (error) {
				if (error instanceof SessionAccessPreparationPendingError) throw error;
				actorRetired = true;
				throw error;
			}
		};
		const assertCurrent = () => {
			if (invocationClosed) denied();
			assertInvocationCurrent?.();
			assertRun();
			assertActor();
		};
		const retain = (sessionOnly) => {
			assertCurrent();
			const assert = sessionOnly ? assertSession : assertActor;
			assert();
			const releaseSource = sessionOnly ? void 0 : captured?.authority.retain?.();
			const controller = new AbortController();
			const releases = [];
			let released = false;
			let preparing = false;
			const release = () => {
				if (released) return;
				released = true;
				for (const unsubscribe of releases.splice(0)) unsubscribe();
				releaseSource?.();
				controller.abort(/* @__PURE__ */ new Error("Session access borrow released"));
			};
			const check = () => {
				if (released) return;
				try {
					assert();
				} catch (error) {
					if (error instanceof SessionAccessPreparationPendingError) {
						if (!preparing) {
							preparing = true;
							Promise.resolve().then(async () => {
								if (released) return;
								await projection.prepareMembership();
								preparing = false;
								if (!released) check();
							}).catch(() => {
								preparing = false;
							});
						}
						return;
					}
					controller.abort(error);
					release();
				}
			};
			releases.push(sessionChanges.subscribe(check), onSessionIdentityMutation((change) => {
				if (change.agentId === target.agentId && change.previous.sessionId === target.sessionId && change.previous.sessionKeys.includes(target.sessionKey)) sessionRetired = true;
				check();
			}));
			if (!sessionOnly) {
				releases.push(onUserProfilesChanged(check), onOperatorRolePolicyChanged(check));
				const sourceSignal = captured?.authority.signal ?? originalGrant?.signal;
				if (sourceSignal) {
					sourceSignal.addEventListener("abort", check, { once: true });
					releases.push(() => sourceSignal.removeEventListener("abort", check));
				}
			}
			check();
			return {
				signal: controller.signal,
				assertCurrent: () => {
					controller.signal.throwIfAborted();
					assert();
				},
				release
			};
		};
		assertCurrent();
		return {
			target,
			sandboxRequired,
			assertCurrent,
			retain: () => retain(false),
			retainSession: () => retain(true),
			release: () => {
				invocationClosed = true;
				captured?.release();
			}
		};
	} catch (error) {
		captured?.release();
		throw error;
	}
}
//#endregion
//#region src/gateway/server-methods.ts
const SUSPEND_CONTROL_METHODS = /* @__PURE__ */ new Set([
	"gateway.suspend.prepare",
	"gateway.suspend.status",
	"gateway.suspend.resume",
	"gateway.suspend.handoff"
]);
function runGatewayPendingWorkContinuation(params) {
	if (!isRecord(params.requestParams)) return null;
	const request = params.requestParams;
	if (params.client?.connect.role === "node") {
		if (params.admission !== "continuation" && getGatewaySuspendAdmissionPhase() !== "draining" && !isGatewayRestartDraining()) return null;
		const invokeId = params.method === "node.invoke.progress" ? request.invokeId : params.method === "node.invoke.result" ? request.id : void 0;
		if (typeof invokeId !== "string" || typeof request.nodeId !== "string") return null;
		return params.context.nodeRegistry.runPendingInvokeContinuation({
			invokeId,
			nodeId: request.nodeId,
			connId: params.client.connId,
			run: params.run
		});
	}
	if (params.admission === "continuation" || getGatewaySuspendAdmissionPhase() !== "draining" && !isGatewayRestartDraining() || params.client?.connect.role !== "operator" || typeof request.id !== "string") return null;
	if (params.method === "question.resolve" || params.method === "question.get") {
		const questionManager = params.context.questionManager;
		return questionManager && canSelectQuestion(questionManager, request.id, params.client) ? questionManager.runPendingContinuation(request.id, params.run) : null;
	}
	return (params.method === "exec.approval.resolve" ? params.context.execApprovalManager : params.method === "plugin.approval.resolve" ? params.context.pluginApprovalManager : params.method === "approval.resolve" ? request.kind === "exec" ? params.context.execApprovalManager : request.kind === "plugin" ? params.context.pluginApprovalManager : request.kind === "system-agent" ? params.context.systemAgentApprovalManager : void 0 : void 0)?.runPendingContinuation(request.id, params.run) ?? null;
}
/** Builds the per-request method registry from core, plugin, and explicit extra handlers. */
function createRequestGatewayMethodRegistry(extraHandlers) {
	const gatewayPluginRegistry = getActivePluginRegistry();
	const gatewayPluginHandlers = gatewayPluginRegistry?.gatewayHandlers ?? {};
	const extraHandlerEntries = Object.entries(extraHandlers ?? {});
	const pluginMethodNames = new Set(Object.keys(gatewayPluginHandlers));
	const coreDescriptorHandlers = { ...coreGatewayHandlers };
	for (const [method, extraHandler] of extraHandlerEntries) if (!pluginMethodNames.has(method) && isCoreGatewayMethodClassified(method)) coreDescriptorHandlers[method] = extraHandler;
	const auxHandlers = Object.fromEntries(extraHandlerEntries.filter(([method]) => !pluginMethodNames.has(method) && !isCoreGatewayMethodClassified(method)));
	return createGatewayMethodRegistry([
		...createCoreGatewayMethodDescriptors(coreDescriptorHandlers),
		...gatewayPluginRegistry ? createPluginGatewayMethodDescriptors(gatewayPluginRegistry) : [],
		...createGatewayMethodDescriptorsFromHandlers({
			handlers: auxHandlers,
			owner: {
				kind: "aux",
				area: "gateway-extra"
			},
			defaultScope: ADMIN_SCOPE
		})
	], gatewayPluginRegistry ?? void 0);
}
/** Applies the router-owned authorization fence before any transport or typed dispatch. */
async function authorizeGatewayRequestPreDispatch(params) {
	if (params.context.ensureSessionRowProjection) await params.context.ensureSessionRowProjection();
	const authorizeMethod = () => withPluginRuntimeRegistryScope(params.methodRegistry.pluginRegistry, () => authorizeGatewayMethod(params.method, params.client, params.requestParams, params.methodRegistry, params.context));
	const startupError = () => params.context.unavailableGatewayMethods?.has(params.method) ? errorShape(ErrorCodes.UNAVAILABLE, `${params.method} unavailable during gateway startup`, {
		retryable: true,
		retryAfterMs: 500,
		details: {
			...gatewayStartupUnavailableDetails(),
			method: params.method
		}
	}) : null;
	while (true) {
		const scopeAuthorization = authorizeMethod();
		if (scopeAuthorization.error) return { error: scopeAuthorization.error };
		const uploadError = gatewayRouterUploadPolicyError(params, params.methodRegistry);
		if (uploadError) return { error: uploadError };
		const profileError = await authorizeAuthenticatedProfileForMethod({
			client: params.client,
			sessionScope: scopeAuthorization.sessionScope,
			requiresProfile: () => params.expectedProfileBinding !== void 0 || params.methodRegistry.requiresAuthenticatedProfile(params.method) || resolveDirectIncognitoTargets(params.method, params.requestParams).length > 0 || sessionMutationTargetFields(params.method).length > 0 && (params.context.getCommittedRuntimeConfig ?? params.context.getRuntimeConfig)().gateway?.roles !== void 0
		});
		if (profileError) return { error: profileError };
		try {
			params.expectedProfileBinding?.assertCurrent();
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) return { error: error.error };
			throw error;
		}
		const unavailableError = startupError();
		if (unavailableError) return { error: unavailableError };
		if (params.method.startsWith("sessions.groups.")) {
			const { ensureSessionGroupCatalog } = await import("./session-group-catalog-aA5PL8-A.mjs");
			await ensureSessionGroupCatalog();
			const groupProjection = getSessionRowProjection(params.context);
			if (groupProjection) do
				await groupProjection.prepareMembership();
			while (groupProjection.needsMembershipPreparation());
			params.expectedProfileBinding?.assertCurrent();
		}
		const sessionPolicy = params.methodRegistry.getSessionAccess?.(params.method);
		const projection = !sessionPolicy && resolveDirectSessionTargets(params.method, params.requestParams).length > 0 && !isGatewayAdmin(params.client) ? getSessionRowProjection(params.context) : void 0;
		const authorizeSession = (sessionRowRead) => sessionPolicy ? { error: null } : resolveSessionMutationAuthorization({
			client: params.client ?? null,
			method: params.method,
			requestParams: params.requestParams,
			context: params.context,
			sessionRowRead,
			sessionScope: scopeAuthorization.sessionScope
		});
		const preparedSessionMutation = projection ? await projection.withPreparedExactRows((cfg) => resolveDirectSessionTargets(params.method, params.requestParams).flatMap((target) => {
			const agent = resolveRequestedSessionAgentId(cfg, target.sessionKey, target.agentId);
			return agent.ok ? [{
				key: target.sessionKey,
				agentId: agent.agentId
			}] : [];
		}), authorizeSession) : withCanonicalSessionValidationDeferral(() => authorizeSession());
		if (preparedSessionMutation.kind === "pending") {
			const { certifySessionCanonicalValidationPending } = await import("./session-canonical-validation-readiness-DEmudEsl.mjs");
			await certifySessionCanonicalValidationPending(preparedSessionMutation.database);
			continue;
		}
		const sessionMutation = preparedSessionMutation.value;
		if (sessionMutation.error) return { error: sessionMutation.error };
		let sessionAccessAuthority;
		if (sessionPolicy) try {
			sessionAccessAuthority = await prepareGatewaySessionAccessAuthority({
				policy: sessionPolicy,
				requestParams: params.requestParams,
				client: params.client ?? null,
				context: params.context,
				ownSessionOnly: scopeAuthorization.sessionScope === "operator.sessions.write",
				hasCurrentClientAuthority: params.hasCurrentClientAuthority,
				assertInvocationCurrent: params.assertInvocationCurrent
			});
			params.expectedProfileBinding?.assertCurrent();
			sessionAccessAuthority.assertCurrent();
		} catch (error) {
			sessionAccessAuthority?.release();
			if (error instanceof SessionMutationAuthorizationChangedError) return { error: error.error };
			throw error;
		}
		if (params.client?.connect.role === "node" && (!params.client.connId || !await params.context.nodeRegistry.isConnectionCurrentPairingState(params.client.connId))) return { error: errorShape(ErrorCodes.UNAVAILABLE, "node pairing changed before request dispatch", {
			retryable: true,
			details: { code: "PAIRING_CHANGED" }
		}) };
		const currentAuthorization = authorizeMethod();
		const currentError = currentAuthorization.error ?? startupError();
		if (currentError) {
			sessionAccessAuthority?.release();
			return { error: currentError };
		}
		try {
			params.expectedProfileBinding?.assertCurrent();
		} catch (error) {
			sessionAccessAuthority?.release();
			if (error instanceof SessionMutationAuthorizationChangedError) return { error: error.error };
			throw error;
		}
		if (currentAuthorization.sessionScope !== scopeAuthorization.sessionScope) {
			sessionAccessAuthority?.release();
			return { error: errorShape(ErrorCodes.FORBIDDEN, "Gateway requester authority changed") };
		}
		return {
			error: null,
			sessionScope: scopeAuthorization.sessionScope,
			...sessionAccessAuthority ? { sessionAccessAuthority } : {},
			...sessionMutation.authorization ? { sessionMutationAuthorization: sessionMutation.authorization } : {}
		};
	}
}
/** Runs admitted Gateway work inside the shared root and plugin request scopes. */
async function runWithGatewayRequestEnvelope(method, client, fn, options) {
	const rejectRateLimitedControlPlaneWrite = () => {
		if (!options.methodRegistry.isControlPlaneWrite(method)) return;
		const budget = consumeControlPlaneWriteBudget({
			client,
			method
		});
		if (budget.allowed) return;
		const actor = resolveControlPlaneActor(client);
		options.context.logGateway.warn(`control-plane write rate-limited method=${method} ${formatControlPlaneActor(actor)} retryAfterMs=${budget.retryAfterMs} key=${budget.key}`);
		return errorShape(ErrorCodes.UNAVAILABLE, `rate limit exceeded for ${method}; retry after ${Math.ceil(budget.retryAfterMs / 1e3)}s`, {
			retryable: true,
			retryAfterMs: budget.retryAfterMs,
			details: {
				method,
				limit: `30 per ${CONTROL_PLANE_RATE_LIMIT_WINDOW_MS / 1e3}s`
			}
		});
	};
	const isSuspendPrepare = method === "gateway.suspend.prepare";
	const preAdmissionRateLimitError = isSuspendPrepare ? rejectRateLimitedControlPlaneWrite() : void 0;
	if (preAdmissionRateLimitError) return await options.reject(preAdmissionRateLimitError);
	const rootWorkAdmission = options.admission === "continuation" ? null : tryBeginGatewayRootWorkAdmission(`ws:${method}`) ?? (method === "gateway.restart.request" && isTargetedNonSafeGatewayRestartRequest(options.requestParams) ? tryBeginGatewayPreparedRestartRootWorkAdmission() : null);
	if (!rootWorkAdmission) {
		const continuation = runGatewayPendingWorkContinuation({
			method,
			client,
			requestParams: options.requestParams,
			context: options.context,
			admission: options.admission,
			run: invokeWithRequestScope
		});
		if (continuation) return await continuation;
		if (options.admission === "continuation") return await options.reject(errorShape(ErrorCodes.UNAVAILABLE, `${method} unavailable during gateway shutdown`));
	}
	if (isSuspendPrepare && rootWorkAdmission && !rootWorkAdmission.ownsRoot) return await options.reject(errorShape(ErrorCodes.UNAVAILABLE, "gateway suspension cannot begin from a nested request", {
		retryable: true,
		retryAfterMs: 1e3,
		details: {
			method,
			reason: "nested-gateway-request"
		}
	}));
	const restartProgressRead = method === "update.runs.get" && getGatewayRestartDrainSignal().aborted && getGatewaySuspendAdmissionPhase() === "accepting";
	if (!rootWorkAdmission && !SUSPEND_CONTROL_METHODS.has(method) && !restartProgressRead) return await options.reject(workAdmissionUnavailableError(method));
	async function invokeWithRequestScope() {
		const postAdmissionRateLimitError = isSuspendPrepare ? void 0 : rejectRateLimitedControlPlaneWrite();
		if (postAdmissionRateLimitError) return await options.reject(postAdmissionRateLimitError);
		const releaseForegroundWork = retainSessionListForegroundWork();
		try {
			const pluginRegistry = options.methodRegistry.pluginRegistry ?? getPluginRuntimeGatewayRequestScope()?.pluginRegistry ?? getActivePluginRegistry() ?? void 0;
			const invoke = () => withPluginRuntimeGatewayRequestScope({
				context: options.context,
				resolveGatewayContext: options.context.resolveGatewayContext,
				client,
				signal: options.signal,
				hasCurrentClientAuthority: options.hasCurrentClientAuthority,
				isWebchatConnect: options.isWebchatConnect,
				...client?.internal?.nodeInvokeStream ? getPluginRuntimeGatewayNodeAuthorities() : {},
				...pluginRegistry ? { pluginRegistry } : {}
			}, fn);
			return await (options.methodRegistry.isObservation(method) ? runWithGatewayObservationScope(invoke, [options.signal, client?.connectionSignal], () => options.reject(getGatewayRestartDrainSignal().aborted ? workAdmissionUnavailableError(method) : errorShape(ErrorCodes.UNAVAILABLE, `${method} observation cancelled`, { retryable: true }))) : invoke());
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) return await options.reject(error.error);
			const staleInstall = classifyGatewayStaleInstall(error);
			if (staleInstall) return await options.reject(staleInstall.error);
			throw error;
		} finally {
			releaseForegroundWork();
		}
	}
	if (!rootWorkAdmission) return await invokeWithRequestScope();
	try {
		return await rootWorkAdmission.run(invokeWithRequestScope);
	} finally {
		rootWorkAdmission.release();
	}
}
/** Authorizes and dispatches one gateway JSON-RPC-style request. */
async function handleGatewayRequest(opts, diagnostics) {
	const { req, client, isWebchatConnect, context, signal, hasCurrentClientAuthority } = opts;
	const profileBinding = opts.expectedProfileBinding ?? (req.expectedProfileId === void 0 ? void 0 : await createExpectedProfileBinding(req.expectedProfileId, client, readGatewayRequestMutationAuthority(opts).assertLifetimeCurrent));
	const respond = profileBinding && !opts.expectedProfileBinding ? profileBinding.guardResponse(opts.respond) : opts.respond;
	const sessionMutationCommitGuard = profileBinding ? () => {
		profileBinding.assertCurrent();
		opts.sessionMutationCommitGuard?.();
	} : opts.sessionMutationCommitGuard;
	const entry = opts.requestEntry ?? context.requestEntryLifetime?.enter(opts);
	const releaseForegroundWork = retainSessionListForegroundWork();
	let sessionAccessAuthority;
	try {
		entry?.assertOpen();
		const methodRegistry = opts.methodRegistry?.getHandler(req.method) !== void 0 ? opts.methodRegistry : createRequestGatewayMethodRegistry(opts.extraHandlers);
		const requestMutationAuthority = readGatewayRequestMutationAuthority(opts);
		const requestFacts = {
			method: req.method,
			requestParams: req.params,
			client,
			context
		};
		const authorization = await authorizeGatewayRequestPreDispatch({
			...requestFacts,
			methodRegistry,
			expectedProfileBinding: profileBinding,
			hasCurrentClientAuthority,
			assertInvocationCurrent: () => {
				profileBinding?.assertCurrent();
				readGatewayRequestMutationAuthority(opts).assertOperatorCurrent?.();
				requestMutationAuthority.assertCurrent();
			}
		});
		sessionAccessAuthority = authorization.sessionAccessAuthority;
		entry?.assertOpen();
		if (authorization.error) {
			respond(false, void 0, authorization.error);
			return;
		}
		const handler = methodRegistry.getHandler(req.method);
		if (!handler) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, `unknown method: ${req.method}`));
			return;
		}
		const assertOperatorCurrent = captureGatewayRequestOperatorGuard(opts);
		const sessionMutationAuthorization = withSessionMutationCommitGuard(authorization.sessionMutationAuthorization, () => {
			assertOperatorCurrent();
			requestMutationAuthority.assertCurrent();
		}, profileBinding?.assertCurrent, requestMutationAuthority.assertAdmittedInputCurrent ? () => {
			assertOperatorCurrent();
			requestMutationAuthority.assertAdmittedInputCurrent?.();
		} : void 0);
		const respondAuthorized = authorization.sessionScope === "operator.sessions.read" ? (...response) => {
			try {
				sessionMutationAuthorization?.assertCurrent();
			} catch (error) {
				if (!(error instanceof SessionMutationAuthorizationChangedError)) throw error;
				respond(false, void 0, error.error);
				return;
			}
			respond(...response);
		} : respond;
		const observation = methodRegistry.isObservation(req.method);
		let observationResponded = false;
		const respondToHandler = observation ? (...response) => {
			getAsyncWorkSignal()?.throwIfAborted();
			respondAuthorized(...response);
			observationResponded = true;
		} : respondAuthorized;
		const invokeHandler = async () => {
			const preparedHandler = await prepareGatewayRequestHandler(handler, entry);
			const uploadError = gatewayRouterUploadPolicyError(requestFacts, methodRegistry);
			if (uploadError) {
				respond(false, void 0, uploadError);
				return;
			}
			const handlerOptions = bindGatewayRequestHandlerMutationAuthority(opts, {
				req,
				params: req.params ?? {},
				client,
				isWebchatConnect,
				respond: respondToHandler,
				acceptsSerializedJson: opts.acceptsSerializedJson,
				context,
				signal,
				...hasCurrentClientAuthority ? { hasCurrentClientAuthority } : {},
				sessionMutationCommitGuard,
				sessionMutationAuthorization,
				...authorization.sessionAccessAuthority ? { sessionAccessAuthority: authorization.sessionAccessAuthority } : {}
			}, profileBinding, authorization.sessionScope);
			sessionMutationCommitGuard?.();
			assertOperatorCurrent();
			authorization.sessionAccessAuthority?.assertCurrent();
			entry?.assertOpen();
			if (signal?.aborted) return;
			entry?.release();
			profileBinding?.markInvoked();
			return diagnostics ? diagnostics.runHandler(() => preparedHandler(handlerOptions)) : preparedHandler(handlerOptions);
		};
		if (req.method === "question.get" || req.method === "question.resolve") {
			requestMutationAuthority.assertCurrent();
			profileBinding?.assertCurrent();
		}
		await runWithGatewayRequestEnvelope(req.method, client, invokeHandler, {
			context,
			isWebchatConnect,
			signal,
			hasCurrentClientAuthority,
			methodRegistry,
			requestParams: req.params,
			admission: opts.admission,
			reject: (error) => {
				if (!observation || !observationResponded && !client?.connectionSignal?.aborted) respond(false, void 0, error);
			}
		});
	} finally {
		sessionAccessAuthority?.release();
		releaseForegroundWork();
		if (!opts.requestEntry) entry?.release();
	}
}
//#endregion
export { runWithGatewayRequestEnvelope as i, createRequestGatewayMethodRegistry as n, handleGatewayRequest as r, authorizeGatewayRequestPreDispatch as t };
