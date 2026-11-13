import { i as getGatewayContextLifetime, r as getCanonicalGatewayContextResolver } from "./gateway-context-binding-VqB7gkMe.mjs";
import { a as getPluginRuntimeGatewayRequestScope, c as withPluginRuntimeGatewayRequestScope, n as getInProcessGatewayRequestContext } from "./gateway-request-scope-Da9jAC9_.mjs";
import { l as getActivePluginRegistry } from "./runtime-BnZb2P5v.mjs";
import { a as READ_SCOPE, d as isOperatorScope, s as SESSION_WRITE_SCOPE, t as ADMIN_SCOPE, u as WRITE_SCOPE } from "./operator-scopes-D-CL26h0.mjs";
import { a as roleScopesAllow, t as intersectOperatorScopes } from "./operator-scope-compat-Ci6GBcmU.mjs";
import { n as authorizeGatewaySessionCreation, u as resolveGatewayOperatorRoleActor } from "./operator-role-policy-Cx-TzI2k.mjs";
import { n as captureGatewayOperatorRunAuthority } from "./operator-run-authority-CZcmYuYn.mjs";
import { s as projectOperatorScopesForMethod } from "./method-scopes-DZtl1Vvs.mjs";
import { i as getGatewayToolCallerIdentity, l as withoutGatewayToolCallerIdentity, t as captureGatewayToolCallerAssertion } from "./gateway-caller-context-DQ2iIITl.mjs";
import { a as bindInProcessSubagentResume, n as mergePluginRuntimeClientInternal, o as readInProcessSubagentResume, r as projectPluginRuntimeClientExecution, t as createSyntheticPluginRuntimeClient } from "./server-plugin-runtime-client-Ba4mX9xx.mjs";
import { n as runOutsideOperatorToolGatewayAuthority, r as runWithOperatorToolGatewayAuthority, t as readOperatorToolGatewayAuthority } from "./operator-tool-gateway-authority-CgsnCzzP.mjs";
import { i as unwrapGatewayMethodDispatchResponse, n as dispatchGatewayRequestInProcessRaw, r as throwIfGatewayDispatchAborted } from "./server-in-process-dispatch-CH-7KzgJ.mjs";
import { r as registerSubagentCompletionToolHandoff, t as cancelSubagentCompletionToolHandoff } from "./subagent-completion-tool-handoff-BtTRRfum.mjs";
//#region src/gateway/in-process-agent-runtime-identity.ts
const inProcessAgentRuntimeIdentities = /* @__PURE__ */ new WeakMap();
/** Carry authenticated runtime identity without widening plugin dispatch options. */
function withInProcessAgentRuntimeIdentity(options, identity) {
	if (!identity) return options;
	const carried = { ...options };
	inProcessAgentRuntimeIdentities.set(carried, identity);
	return carried;
}
function readInProcessAgentRuntimeIdentity(options) {
	return options ? inProcessAgentRuntimeIdentities.get(options) : void 0;
}
//#endregion
//#region src/gateway/server-plugin-in-process-scopes.ts
function resolveInProcessGatewaySyntheticScopes(params) {
	const { operatorScopes, syntheticScopeMode } = params;
	const requestedSyntheticScopes = (params.syntheticScopes ?? (syntheticScopeMode === "exact" ? operatorScopes ?? params.scopedClientScopes : void 0) ?? ["operator.write"]).map((requested) => {
		const broad = requested === "operator.sessions.read" ? READ_SCOPE : requested === "operator.sessions.write" ? WRITE_SCOPE : void 0;
		return syntheticScopeMode === "minimum" && broad && operatorScopes && roleScopesAllow({
			role: "operator",
			requestedScopes: [broad],
			allowedScopes: operatorScopes
		}) ? broad : requested;
	});
	const syntheticScopes = operatorScopes ? syntheticScopeMode === "exact" ? requestedSyntheticScopes.filter((requestedScope) => roleScopesAllow({
		role: "operator",
		requestedScopes: [requestedScope],
		allowedScopes: operatorScopes
	})) : projectOperatorScopesForMethod({
		method: params.method,
		requestParams: params.requestParams,
		requestedScopes: requestedSyntheticScopes,
		allowedScopes: operatorScopes,
		...params.allowOwnSessionScope ? { sessionScope: SESSION_WRITE_SCOPE } : {},
		...isOperatorScope(params.registeredScope) ? { requiredScope: params.registeredScope } : {}
	}) : syntheticScopeMode === "exact" ? requestedSyntheticScopes : params.syntheticScopes;
	if (syntheticScopeMode !== "exact" && operatorScopes?.includes("operator.admin") && !syntheticScopes?.includes("operator.admin")) syntheticScopes?.push(ADMIN_SCOPE);
	return syntheticScopes;
}
//#endregion
//#region src/gateway/server-plugin-in-process-dispatch.ts
/** Retains operator attribution and authority only for the awaited tool invocation. */
async function withOperatorToolGatewayAuthority(authority, run) {
	const lifetime = new AbortController();
	const scope = getPluginRuntimeGatewayRequestScope();
	const context = scope?.resolveGatewayContext ? scope.resolveGatewayContext() : scope?.context;
	const captured = context && (authority.operatorRunAuthority || authority.operatorRoleActor?.kind !== "system") ? await captureGatewayOperatorRunAuthority({
		client: scope?.client && !authority.operatorRunAuthority ? scope.client : createSyntheticPluginRuntimeClient({
			authenticatedUserProfile: authority.authenticatedUserProfile,
			operatorRoleActor: authority.operatorRoleActor,
			operatorRunAuthority: authority.operatorRunAuthority,
			scopes: [...authority.scopes]
		}),
		context,
		hasCurrentClientAuthority: scope?.hasCurrentClientAuthority
	}) : void 0;
	try {
		authority.assertCurrent?.();
		captured?.authority.assertCurrent();
		return await runWithOperatorToolGatewayAuthority({
			...authority,
			operatorRunAuthority: captured?.authority ?? authority.operatorRunAuthority,
			signal: lifetime.signal
		}, () => captured && scope?.client ? withPluginRuntimeGatewayRequestScope({
			...scope,
			client: mergePluginRuntimeClientInternal(scope.client, { operatorRunAuthority: captured.authority })
		}, run) : run());
	} finally {
		lifetime.abort(/* @__PURE__ */ new Error("operator tool invocation authority expired"));
		captured?.release();
	}
}
/** Transfer bounded cleanup without retaining the finished operator invocation. */
function runWithOperatorToolGatewayCleanupContext(run) {
	const authority = readOperatorToolGatewayAuthority();
	if (!authority) return run();
	authority.signal.throwIfAborted();
	const scope = getPluginRuntimeGatewayRequestScope();
	const client = createSyntheticPluginRuntimeClient({
		authenticatedUserProfile: authority.authenticatedUserProfile,
		scopes: [...authority.scopes],
		operatorRoleActor: authority.operatorRoleActor ?? scope?.client?.internal?.operatorRoleActor ?? (authority.authenticatedUserProfile ? {
			kind: "operator",
			profileId: authority.authenticatedUserProfile.profileId
		} : void 0)
	});
	return runOutsideOperatorToolGatewayAuthority(() => withPluginRuntimeGatewayRequestScope({
		...scope,
		client,
		isWebchatConnect: scope?.isWebchatConnect ?? (() => false)
	}, run));
}
/** Captured while live; its accepting owner, not the original invocation, releases it. */
function captureOperatorToolGatewayContinuationContext() {
	const scope = getPluginRuntimeGatewayRequestScope();
	const resolveGatewayContext = getGatewayToolCallerIdentity()?.gatewayContextResolver ?? scope?.resolveGatewayContext;
	if (!getInProcessGatewayRequestContext(resolveGatewayContext)) return;
	const assertCallerCurrent = captureGatewayToolCallerAssertion();
	const resolved = resolveInProcessGatewayDispatch("agent", void 0, {
		forceSyntheticClient: true,
		operatorRoleActor: { kind: "system" },
		resolveGatewayContext,
		syntheticScopeMode: "exact"
	});
	return captureGatewayOperatorRunAuthority({
		client: resolved.operatorSourceClient,
		context: resolved.context,
		hasCurrentClientAuthority: resolved.hasCurrentClientAuthority
	}).then((captured) => {
		try {
			captured?.authority.assertCurrent();
			resolved.assertContextCurrent();
			resolved.assertInvocationCurrent();
			assertCallerCurrent?.("agent");
			const continuationScope = runWithOperatorToolGatewayCleanupContext(() => ({
				...getPluginRuntimeGatewayRequestScope(),
				client: captured ? mergePluginRuntimeClientInternal(resolved.client, { operatorRunAuthority: captured.authority }) : resolved.client,
				context: resolved.context,
				resolveGatewayContext,
				isWebchatConnect: resolved.isWebchatConnect,
				hasCurrentClientAuthority: captured ? void 0 : resolved.hasCurrentClientAuthority
			}));
			const ownerResolver = resolved.context.resolveGatewayContext ?? resolveGatewayContext;
			const gatewayOwner = ownerResolver && getCanonicalGatewayContextResolver(ownerResolver);
			const signals = [captured?.authority.signal, gatewayOwner && getGatewayContextLifetime(gatewayOwner).signal].filter((signal) => Boolean(signal));
			const lifetime = new AbortController();
			const release = () => {
				if (lifetime.signal.aborted) return;
				lifetime.abort(/* @__PURE__ */ new Error("Gateway continuation authority is no longer active"));
				for (const signal of signals) signal.removeEventListener("abort", release);
				captured?.release();
			};
			for (const signal of signals) signal.addEventListener("abort", release, { once: true });
			if (signals.some((signal) => signal.aborted)) release();
			const assertCurrent = () => {
				lifetime.signal.throwIfAborted();
				captured?.authority.assertCurrent();
				resolved.assertContextCurrent();
				lifetime.signal.throwIfAborted();
			};
			return {
				assertCurrent,
				operatorAuthority: captured?.authority,
				signal: lifetime.signal,
				release,
				run(run) {
					assertCurrent();
					return withoutGatewayToolCallerIdentity(() => runOutsideOperatorToolGatewayAuthority(() => withPluginRuntimeGatewayRequestScope(continuationScope, run)));
				}
			};
		} catch (error) {
			captured?.release();
			throw error;
		}
	});
}
/** Holds the original operator source until an accepted asynchronous follow-up settles. */
async function runWithOperatorToolGatewayContinuationContext(run) {
	const preparation = captureOperatorToolGatewayContinuationContext();
	if (!preparation) return await runWithOperatorToolGatewayCleanupContext(run);
	const captured = await preparation;
	try {
		return await captured.run(run);
	} finally {
		captured.release();
	}
}
function resolveInProcessGatewayDispatch(method, params, options) {
	const inheritedOperatorAuthority = readOperatorToolGatewayAuthority();
	const scope = getPluginRuntimeGatewayRequestScope();
	const caller = getGatewayToolCallerIdentity();
	const operatorRunAuthority = caller?.operatorAuthority ?? inheritedOperatorAuthority?.operatorRunAuthority ?? scope?.client?.internal?.operatorRunAuthority;
	const assertSettleWakeCurrent = method === "agent" ? options?.settleWakeReplay?.assertCurrent : void 0;
	const isHostOwnedAgentRun = method === "agent" && Boolean(options?.agentRunTracking || assertSettleWakeCurrent);
	const assertCallerCurrent = captureGatewayToolCallerAssertion();
	const transfersCreatedInput = method === "sessions.create" && options?.sessionCreation?.via === "spawn" && caller?.operationalRunInstance !== void 0 && assertCallerCurrent !== void 0 && options.agentToolCaller?.agentId === caller.agentId && options.agentToolCaller.sessionKey === caller.sessionKey;
	const assertInvocationCurrent = () => {
		assertSettleWakeCurrent?.();
		if (!isHostOwnedAgentRun || !operatorRunAuthority) {
			inheritedOperatorAuthority?.signal.throwIfAborted();
			inheritedOperatorAuthority?.assertCurrent?.();
		}
		operatorRunAuthority?.assertCurrent();
	};
	assertInvocationCurrent();
	if (!isHostOwnedAgentRun) assertCallerCurrent?.(method);
	const scopedOperatorProfile = scope?.client?.authenticatedUserProfile;
	const scopedRoleActor = scope?.client?.internal?.operatorRoleActor;
	const scopedActor = resolveGatewayOperatorRoleActor(scope?.client);
	const matchesOperatorSource = !operatorRunAuthority || scopedActor?.kind === "operator" && scopedActor.profileId === operatorRunAuthority.profileId;
	const explicitSystemActor = !scope?.client && !inheritedOperatorAuthority ? options?.operatorRoleActor : void 0;
	const verifiedOperatorAuthority = inheritedOperatorAuthority ?? (scopedOperatorProfile?.profileId ? {
		authenticatedUserProfile: scopedOperatorProfile,
		scopes: scope?.client?.connect.scopes ?? []
	} : void 0);
	const operatorAuthority = !isHostOwnedAgentRun && (!operatorRunAuthority || verifiedOperatorAuthority?.authenticatedUserProfile?.profileId === operatorRunAuthority.profileId) ? verifiedOperatorAuthority : void 0;
	const operatorRoleActor = (operatorRunAuthority ? {
		kind: "operator",
		profileId: operatorRunAuthority.profileId
	} : void 0) ?? inheritedOperatorAuthority?.operatorRoleActor ?? (isHostOwnedAgentRun ? inheritedOperatorAuthority?.authenticatedUserProfile ? {
		kind: "operator",
		profileId: inheritedOperatorAuthority.authenticatedUserProfile.profileId
	} : scopedRoleActor ?? (scopedOperatorProfile?.profileId ? {
		kind: "operator",
		profileId: scopedOperatorProfile.profileId
	} : scope?.client ? void 0 : explicitSystemActor ?? { kind: "system" }) : scopedRoleActor ?? explicitSystemActor);
	const resolveGatewayContext = options?.resolveGatewayContext ?? scope?.resolveGatewayContext;
	const context = getInProcessGatewayRequestContext(resolveGatewayContext);
	const isWebchatConnect = scope?.isWebchatConnect ?? (() => false);
	if (!context) throw new Error(`In-process gateway dispatch requires a gateway request scope or instance binding (method: ${method}).`);
	if (options?.requireScopedClient === true && !scope?.client) throw new Error(`In-process gateway dispatch requires an authenticated plugin request scope (method: ${method}).`);
	const pluginRuntimeOwnerId = typeof options?.pluginRuntimeOwnerId === "string" && options.pluginRuntimeOwnerId.trim() ? options.pluginRuntimeOwnerId.trim() : void 0;
	const pluginRecord = pluginRuntimeOwnerId ? getActivePluginRegistry()?.plugins.find((entry) => entry.id === pluginRuntimeOwnerId) : void 0;
	const nodeInvokeApprovalSessionKey = method === "node.invoke" && scope?.pluginId?.trim() === pluginRuntimeOwnerId && (scope?.pluginOrigin === "bundled" || scope?.pluginTrustedOfficialInstall === true || pluginRecord?.origin === "bundled" || pluginRecord?.trustedOfficialInstall === true) ? options?.nodeInvokeApprovalSessionKey : void 0;
	if (options?.nodeInvokeStream && (method !== "node.invoke" || !pluginRuntimeOwnerId || options.forceSyntheticClient !== true)) throw new Error("Node invoke streaming requires an owner-bound trusted synthetic client.");
	const delegatedToolPolicyHandoffId = options?.delegatedToolPolicyHandoff ? registerSubagentCompletionToolHandoff(options.delegatedToolPolicyHandoff) : void 0;
	const scopedSystemScopes = options?.syntheticScopeMode !== void 0 && scopedActor?.kind === "system" ? scope?.client?.connect.scopes ?? [] : void 0;
	const sourceScopes = operatorRunAuthority && scope?.client && matchesOperatorSource ? intersectOperatorScopes(operatorRunAuthority.scopes, scope.client.connect.scopes ?? []) : operatorRunAuthority?.scopes ?? operatorAuthority?.scopes ?? (options?.syntheticScopeMode !== void 0 ? inheritedOperatorAuthority?.scopes : void 0) ?? (operatorRoleActor?.kind === "operator" ? verifiedOperatorAuthority?.scopes ?? scope?.client?.connect.scopes ?? [] : void 0);
	const operatorScopes = scopedSystemScopes && sourceScopes ? intersectOperatorScopes(sourceScopes, scopedSystemScopes) : scopedSystemScopes ?? sourceScopes;
	const syntheticScopes = resolveInProcessGatewaySyntheticScopes({
		method,
		requestParams: params,
		syntheticScopes: options?.syntheticScopes,
		syntheticScopeMode: options?.syntheticScopeMode,
		operatorScopes,
		scopedClientScopes: scope?.client?.connect.scopes,
		registeredScope: context.getGatewayMethodRegistry?.().getScope(method),
		allowOwnSessionScope: context.getGatewayMethodRegistry?.().getSessionAccess?.(method)?.allowOwnSessionScope
	});
	const baseSyntheticClient = createSyntheticPluginRuntimeClient({
		...operatorAuthority ? { authenticatedUserProfile: operatorAuthority.authenticatedUserProfile } : {},
		allowModelOverride: options?.allowSyntheticModelOverride === true,
		agentToolCaller: options?.agentToolCaller,
		agentRunTracking: options?.agentRunTracking,
		...operatorRoleActor ? { operatorRoleActor } : {},
		...operatorRunAuthority ? { operatorRunAuthority } : {},
		cronRunContinuation: options?.allowSyntheticCronRunContinuation === true,
		internalDeliveryMediaUrls: options?.internalDeliveryMediaUrls,
		internalDeliverySuppressText: options?.internalDeliverySuppressText,
		...pluginRuntimeOwnerId ? { pluginRuntimeOwnerId } : {},
		...nodeInvokeApprovalSessionKey ? { nodeInvokeApprovalSessionKey } : {},
		pluginSubagentRequester: options?.pluginSubagentRequester,
		runtimePluginToolGrant: options?.runtimePluginToolGrant,
		pluginSubagentToolsAllow: options?.pluginSubagentToolsAllow,
		delegatedToolPolicyHandoffId,
		...options?.sessionCreation ? { sessionCreation: options.sessionCreation } : {},
		scopes: syntheticScopes
	});
	const scopedStreamClient = options?.nodeInvokeStream ? scope?.client : void 0;
	const syntheticClient = projectPluginRuntimeClientExecution({
		client: baseSyntheticClient,
		streamClient: scopedStreamClient,
		identity: readInProcessAgentRuntimeIdentity(options),
		nodeInvokeStream: options?.nodeInvokeStream
	});
	const scopedClient = mergePluginRuntimeClientInternal(scope?.client, pluginRuntimeOwnerId || options?.agentRunTracking || options?.pluginSubagentRequester || options?.runtimePluginToolGrant || options?.pluginSubagentToolsAllow || options?.delegatedToolPolicyHandoff || scope?.client?.internal?.delegatedToolPolicyHandoffId ? {
		...options?.agentRunTracking ? { agentRunTracking: options.agentRunTracking } : {},
		...pluginRuntimeOwnerId ? { pluginRuntimeOwnerId } : {},
		...options?.pluginSubagentRequester ? { pluginSubagentRequester: options.pluginSubagentRequester } : {},
		runtimePluginToolGrant: options?.runtimePluginToolGrant,
		pluginSubagentToolsAllow: options?.pluginSubagentToolsAllow,
		delegatedToolPolicyHandoffId
	} : void 0);
	if (options?.disableSyntheticClient === true && (!scopedClient || !matchesOperatorSource)) {
		cancelSubagentCompletionToolHandoff(delegatedToolPolicyHandoffId);
		throw new Error(`In-process gateway dispatch requires a scoped client (method: ${method}).`);
	}
	const useScopedClient = options?.forceSyntheticClient !== true && scopedClient && matchesOperatorSource;
	const client = useScopedClient ? operatorRunAuthority ? mergePluginRuntimeClientInternal(scopedClient, void 0, intersectOperatorScopes(scopedClient.connect.scopes ?? [], operatorRunAuthority.scopes)) : scopedClient : syntheticClient;
	const resume = readInProcessSubagentResume(options);
	if (resume) {
		if (method !== "agent" || options?.forceSyntheticClient !== true || !client.internal) throw new Error("Task resume requires a synthetic agent admission.");
		bindInProcessSubagentResume(client.internal, resume);
	}
	const assertSourceCurrent = () => {
		operatorRunAuthority?.assertCurrent();
		if ((resolveGatewayContext ? resolveGatewayContext() : scope?.context) !== context) throw new Error(`In-process gateway dispatch requires a current gateway instance binding (method: ${method}).`);
	};
	return {
		assertInvocationCurrent,
		assertContextCurrent: () => {
			assertSourceCurrent();
			if (method !== "agent") assertCallerCurrent?.(method);
		},
		...transfersCreatedInput ? { assertCreatedInputSourceCurrent: assertSourceCurrent } : {},
		client,
		context,
		delegatedToolPolicyHandoffId,
		isWebchatConnect,
		operatorSourceClient: operatorRunAuthority ? {
			...client,
			internal: {
				...client.internal,
				operatorRunAuthority
			}
		} : inheritedOperatorAuthority ? createSyntheticPluginRuntimeClient({
			authenticatedUserProfile: inheritedOperatorAuthority.authenticatedUserProfile,
			operatorRoleActor: inheritedOperatorAuthority.operatorRoleActor,
			scopes: [...inheritedOperatorAuthority.scopes]
		}) : scope?.client ?? client,
		hasCurrentClientAuthority: options?.hasCurrentClientAuthority ?? (operatorRunAuthority && !useScopedClient ? void 0 : scope?.hasCurrentClientAuthority)
	};
}
/** Authorizes a sessionless agent execution against its captured Gateway and caller. */
async function prepareInProcessAgentExecution(input) {
	const params = { ...input };
	const inheritedAuthority = readOperatorToolGatewayAuthority();
	const resolved = resolveInProcessGatewayDispatch("agent", { agentId: params.agentId }, {
		agentRunTracking: "plugin_subagent",
		pluginRuntimeOwnerId: params.pluginRuntimeOwnerId,
		resolveGatewayContext: params.resolveGatewayContext
	});
	const client = getPluginRuntimeGatewayRequestScope()?.client ?? resolved.client;
	let operatorSource = await captureGatewayOperatorRunAuthority({
		client: resolved.operatorSourceClient,
		context: resolved.context,
		hasCurrentClientAuthority: resolved.hasCurrentClientAuthority
	});
	const assertLifetime = () => {
		resolved.assertContextCurrent();
		resolved.assertInvocationCurrent();
		operatorSource?.authority.assertCurrent();
	};
	const assertCurrent = () => {
		assertLifetime();
		const error = authorizeGatewaySessionCreation({
			cfg: resolved.context.getRuntimeConfig(),
			agentId: params.agentId,
			client
		});
		if (error) unwrapGatewayMethodDispatchResponse("agent", {
			ok: false,
			error
		});
	};
	try {
		assertLifetime();
	} catch (error) {
		operatorSource?.release();
		throw error;
	}
	return {
		context: resolved.context,
		get operatorAuthority() {
			return operatorSource?.authority;
		},
		get signal() {
			return operatorSource?.authority.signal ? inheritedAuthority ? AbortSignal.any([inheritedAuthority.signal, operatorSource.authority.signal]) : operatorSource.authority.signal : inheritedAuthority?.signal;
		},
		release: () => operatorSource?.release(),
		assertCurrent,
		async authorize() {
			assertLifetime();
			const { authorizeGatewayRequestPreDispatch, createRequestGatewayMethodRegistry } = await import("./server-methods-CTM0-Ih6.mjs");
			assertLifetime();
			const { error } = await authorizeGatewayRequestPreDispatch({
				method: "agent",
				requestParams: { agentId: params.agentId },
				client,
				context: resolved.context,
				methodRegistry: resolved.context.getGatewayMethodRegistry?.() ?? createRequestGatewayMethodRegistry()
			});
			assertLifetime();
			if (error) unwrapGatewayMethodDispatchResponse("agent", {
				ok: false,
				error
			});
			operatorSource ??= await captureGatewayOperatorRunAuthority({
				client,
				context: resolved.context,
				hasCurrentClientAuthority: resolved.hasCurrentClientAuthority
			});
			assertCurrent();
		},
		run(run) {
			assertCurrent();
			return runOutsideOperatorToolGatewayAuthority(run);
		}
	};
}
async function withInProcessGatewayDispatch(method, params, options, run) {
	const resolved = resolveInProcessGatewayDispatch(method, params, options);
	let releaseOperatorAuthority;
	try {
		const captured = await captureGatewayOperatorRunAuthority({
			client: resolved.operatorSourceClient,
			context: resolved.context,
			hasCurrentClientAuthority: resolved.hasCurrentClientAuthority
		});
		releaseOperatorAuthority = captured?.release;
		resolved.assertContextCurrent();
		resolved.assertInvocationCurrent();
		captured?.authority.assertCurrent();
		if (captured) {
			resolved.client = mergePluginRuntimeClientInternal(resolved.client, { operatorRunAuthority: captured.authority });
			const assertContextCurrent = resolved.assertContextCurrent;
			resolved.assertContextCurrent = () => {
				assertContextCurrent();
				captured.authority.assertCurrent();
			};
			const assertCreatedInputSourceCurrent = resolved.assertCreatedInputSourceCurrent;
			if (assertCreatedInputSourceCurrent) resolved.assertCreatedInputSourceCurrent = () => {
				assertCreatedInputSourceCurrent();
				captured.authority.assertCurrent();
			};
		}
		return method === "agent" && readOperatorToolGatewayAuthority() ? await runOutsideOperatorToolGatewayAuthority(() => run(resolved)) : await run(resolved);
	} finally {
		releaseOperatorAuthority?.();
		cancelSubagentCompletionToolHandoff(resolved.delegatedToolPolicyHandoffId);
	}
}
async function dispatchGatewayMethodInProcessRaw(method, params, options) {
	return await withInProcessGatewayDispatch(method, params, options, async (resolved) => {
		const assertExplicitRequestCurrent = () => {
			throwIfGatewayDispatchAborted(method, options?.signal);
			if (resolved.hasCurrentClientAuthority?.() === false) throw new Error(`Gateway client authority closed before dispatching ${method}.`);
			options?.sessionMutationCommitGuard?.();
		};
		const assertCreatedInputSourceCurrent = resolved.assertCreatedInputSourceCurrent;
		return await dispatchGatewayRequestInProcessRaw(method, params, {
			client: resolved.client,
			context: resolved.context,
			expectFinal: options?.expectFinal,
			isWebchatConnect: resolved.isWebchatConnect,
			hasCurrentClientAuthority: resolved.hasCurrentClientAuthority,
			methodRegistry: resolved.context.getGatewayMethodRegistry?.(),
			onAccepted: options?.onAccepted,
			onExecution: options?.onExecution,
			onSignalAbort: options?.onSignalAbort,
			requestIdPrefix: "plugin-subagent",
			sessionMutationCommitGuard: () => {
				resolved.assertContextCurrent();
				resolved.assertInvocationCurrent();
				assertExplicitRequestCurrent();
			},
			...assertCreatedInputSourceCurrent ? { assertCreatedInputSourceCurrent: () => {
				assertCreatedInputSourceCurrent();
				assertExplicitRequestCurrent();
			} } : {},
			timeoutMs: options?.timeoutMs,
			...options?.signal ? { signal: options.signal } : {}
		});
	});
}
async function dispatchGatewayMethodInProcess(method, params, options) {
	if (method === "agent" || method === "agent.wait") return await withInProcessGatewayDispatch(method, params, options, async (resolved) => {
		const createAgentTurnFacade = resolved.context.createAgentTurnFacade;
		if (!createAgentTurnFacade) throw new Error(`Gateway instance agent turn facade unavailable for ${method}`);
		const facade = await createAgentTurnFacade({
			assertContextCurrent: resolved.assertContextCurrent,
			client: resolved.client,
			isWebchatConnect: resolved.isWebchatConnect
		});
		return method === "agent" ? await facade.dispatch(params, {
			assertAdmissionCurrent: () => {
				resolved.assertInvocationCurrent();
				options?.sessionMutationCommitGuard?.();
			},
			privateCompletion: options?.privateCompletion,
			settleWakeReplay: options?.settleWakeReplay,
			cancelOnDeadline: options?.cancelOnDeadline,
			expectFinal: options?.expectFinal,
			onAccepted: options?.onAccepted,
			onExecutionStarted: options?.onExecutionStarted,
			onSignalAbort: options?.onSignalAbort,
			signal: options?.signal,
			timeoutMs: options?.timeoutMs
		}) : await facade.wait(params, options?.timeoutMs, options?.signal, options?.onSignalAbort);
	});
	const response = await dispatchGatewayMethodInProcessRaw(method, params, options);
	return unwrapGatewayMethodDispatchResponse(method, response);
}
//#endregion
export { runWithOperatorToolGatewayCleanupContext as a, withInProcessAgentRuntimeIdentity as c, prepareInProcessAgentExecution as i, dispatchGatewayMethodInProcess as n, runWithOperatorToolGatewayContinuationContext as o, dispatchGatewayMethodInProcessRaw as r, withOperatorToolGatewayAuthority as s, captureOperatorToolGatewayContinuationContext as t };
