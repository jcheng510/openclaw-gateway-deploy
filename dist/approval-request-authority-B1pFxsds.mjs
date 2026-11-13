import { T as tryResolveLegacyCompatibilityAgentId } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { l as resolveSessionStorePathCore } from "./paths-CQ3zRaeb.mjs";
import { x as listConfiguredSessionStoreAgentIds } from "./openclaw-state-db-DM-mSY0m.mjs";
import { n as resolveSessionStoreCompatibilityAgentId } from "./legacy.default-agent-owner-C1atgXtB.mjs";
import { t as isPerAgentSessionStoreConfig } from "./session-store-config-BTa4BrjU.mjs";
import { t as resolvePersistedSessionStoreOwner } from "./session-store-owner-CqyGjSj-.mjs";
import { o as resolveSessionRoutingContract } from "./main-session-BFJFO581.mjs";
import { a as onOperatorRolePolicyChanged, u as resolveGatewayOperatorRoleActor, v as readGatewayAccessRevision } from "./operator-role-policy-Cx-TzI2k.mjs";
import { n as authorizeOperatorScopesForMethod } from "./method-scopes-DZtl1Vvs.mjs";
import { r as isGatewayAuthPolicyCurrent, t as captureGatewayAuthPolicy } from "./auth-policy-BIHLDl_p.mjs";
import { a as readGatewayRequestMutationAuthority } from "./session-mutation-guards-D2NVekUc.mjs";
import { n as canResolveOperatorApproval, r as canReviewOperatorApproval } from "./operator-approval-authorization-CSJhRQr6.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/gateway/server-methods/approval-request-authority.ts
/** Pure policy/locator facts used by approval visibility; no row or registry discovery. */
function captureApprovalConfigPolicy(config) {
	const agents = listAgentIds(config).toSorted();
	const configuredStores = listConfiguredSessionStoreAgentIds(config).toSorted();
	const compatibilityAgent = resolveSessionStoreCompatibilityAgentId(config);
	const storeAgents = [.../* @__PURE__ */ new Set([...configuredStores, compatibilityAgent])].toSorted();
	return {
		routing: resolveSessionRoutingContract(config),
		storeOwner: resolvePersistedSessionStoreOwner(config),
		compatibilityAgent,
		legacyAgent: tryResolveLegacyCompatibilityAgentId(config),
		agents,
		configuredStores,
		perAgentStore: isPerAgentSessionStoreConfig(config.session?.store),
		stores: storeAgents.map((agentId) => ({
			agentId,
			path: resolveSessionStorePathCore(config.session?.store, { agentId })
		}))
	};
}
/** Retain the original invocation; copying options loses its request-owner binding. */
function createApprovalRequestAuthority(options) {
	const authority = readGatewayRequestMutationAuthority(options);
	const { client } = options;
	const method = options.req.method;
	const profileId = client?.authenticatedUserProfile?.profileId;
	const userId = client?.authenticatedUserId;
	const role = client?.connect.role;
	const deviceId = client?.connect.device?.id;
	const approvalRuntime = client?.internal?.approvalRuntime;
	const runtimeIdentity = client?.internal?.agentRuntimeIdentity;
	const actor = resolveGatewayOperatorRoleActor(client);
	const actorKind = actor?.kind;
	const actorProfileId = actor?.kind === "operator" ? actor.profileId : void 0;
	const readRuntimeConfig = options.context.getRuntimeConfig;
	const readCommittedConfig = options.context.getCommittedRuntimeConfig;
	const resolveGatewayContext = options.context.resolveGatewayContext;
	const gatewayContext = resolveGatewayContext?.() ?? options.context;
	const getConfig = readCommittedConfig ?? readRuntimeConfig;
	const config = getConfig();
	const authPolicy = client?.authPolicy ?? captureGatewayAuthPolicy(config, null);
	const configPolicy = captureApprovalConfigPolicy(config);
	const accessRevision = readGatewayAccessRevision();
	let configRevoked = false;
	let closed = false;
	const releaseConfig = onOperatorRolePolicyChanged((change) => {
		if (change.kind !== "config" || change.context !== gatewayContext || configRevoked) return;
		try {
			const current = getConfig();
			configRevoked = !isGatewayAuthPolicyCurrent(authPolicy, current) || !isDeepStrictEqual(configPolicy, captureApprovalConfigPolicy(current));
		} catch {
			configRevoked = true;
		}
	});
	const assertPolicyCurrent = () => {
		const currentActor = resolveGatewayOperatorRoleActor(client);
		const allowed = method.startsWith("exec.approval.") || method.startsWith("plugin.approval.") ? authority.family === "native-compatibility" || authorizeOperatorScopesForMethod(method, client?.connect.scopes ?? []).allowed : method === "approval.resolve" ? canResolveOperatorApproval(client) : method === "approval.history" ? authorizeOperatorScopesForMethod(method, client?.connect.scopes ?? []).allowed : canReviewOperatorApproval(client);
		if (closed || !allowed || client?.invalidated || client?.connect.role !== role || client?.connect.device?.id !== deviceId || client?.internal?.approvalRuntime !== approvalRuntime || client?.internal?.agentRuntimeIdentity !== runtimeIdentity || currentActor?.kind !== actorKind || (currentActor?.kind === "operator" ? currentActor.profileId : void 0) !== actorProfileId || client?.authenticatedUserProfile?.profileId !== profileId || client?.authenticatedUserId !== userId || options.context.getRuntimeConfig !== readRuntimeConfig || options.context.getCommittedRuntimeConfig !== readCommittedConfig || options.context.resolveGatewayContext !== resolveGatewayContext || (resolveGatewayContext?.() ?? options.context) !== gatewayContext || configRevoked || readGatewayAccessRevision() !== accessRevision) throw new Error("Approval requester authority changed");
	};
	const assertCurrent = () => {
		authority.assertCurrent();
		authority.expectedProfileBinding?.assertCurrent();
		assertPolicyCurrent();
	};
	const guard = {
		family: authority.family,
		assertCurrent: authority.family === "native-compatibility" ? assertCurrent : () => {
			authority.assertWorkerCurrent();
			authority.expectedProfileBinding?.assertCurrent();
			assertPolicyCurrent();
		}
	};
	return {
		guard,
		assertCurrent,
		assertCommitCurrent: guard.assertCurrent,
		isCurrent: () => {
			try {
				assertCurrent();
				return true;
			} catch {
				return false;
			}
		},
		[Symbol.dispose]() {
			closed = true;
			releaseConfig();
		}
	};
}
//#endregion
export { createApprovalRequestAuthority as t };
