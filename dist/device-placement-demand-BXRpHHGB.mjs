import { r as captureGatewaySessionWorkAdmissions } from "./session-lifecycle-admission-6HF8YqSN.mjs";
import { S as loadExactSessionEntryReadOnly } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import "./session-accessor-CGLseszP.mjs";
import "./device-provider-identity-v6nXqNq_.mjs";
import { i as isExactAttachedEnvironment } from "./placement-dispatch-failure-D-azDDm0.mjs";
//#region src/gateway/worker-environments/device-placement-demand.ts
/** Projects admitted session work without turning idle placements into slot reservations. */
function createDevicePlacementDemandReader(sources) {
	return (excludeSessionId) => {
		const params = {
			...sources,
			excludeSessionId
		};
		const demand = /* @__PURE__ */ new Map();
		if (!params.resolveGatewayContext()) return demand;
		const admissions = captureGatewaySessionWorkAdmissions(params.resolveGatewayContext);
		const targets = /* @__PURE__ */ new Set();
		for (const identities of admissions.targets.values()) for (const identity of identities) targets.add(identity);
		if (targets.size === 0) return demand;
		const placements = params.placements.getMany([...targets]);
		const countedEnvironments = /* @__PURE__ */ new Set();
		for (const [scope, identities] of admissions.targets) for (const identity of identities) {
			const placement = placements.get(identity);
			if (!placement || placement.sessionId === params.excludeSessionId || placement.state !== "active" || placement.executionMode !== "worker-turn" || countedEnvironments.has(placement.environmentId) || !admissions.isActive({
				scope,
				sessionKey: placement.sessionKey,
				sessionId: placement.sessionId
			})) continue;
			if (loadExactSessionEntryReadOnly({
				storePath: scope,
				sessionKey: placement.sessionKey,
				agentId: placement.agentId,
				projection: "list"
			})?.entry.sessionId !== placement.sessionId) continue;
			const environment = params.environments.get(placement.environmentId);
			if (environment?.providerId !== "device" || !environment.nodeDeviceId || !isExactAttachedEnvironment(environment, placement)) continue;
			countedEnvironments.add(environment.environmentId);
			demand.set(environment.nodeDeviceId, (demand.get(environment.nodeDeviceId) ?? 0) + 1);
		}
		return demand;
	};
}
//#endregion
export { createDevicePlacementDemandReader };
