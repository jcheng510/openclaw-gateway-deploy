import { t as assertAdmittedRunOperatorAuthority } from "./admitted-run-context-BL8yRX2D.mjs";
import { m as resolveSandboxedSessionCreation, n as authorizeGatewaySessionCreation } from "./operator-role-policy-Cx-TzI2k.mjs";
import { t as ToolAuthorizationError } from "./tool-input-error-mjW74R8m.mjs";
import { t as createSyntheticPluginRuntimeClient } from "./server-plugin-runtime-client-Ba4mX9xx.mjs";
import { o as authorizeSessionAgentRun } from "./session-sharing-policy-BALdNo4L.mjs";
//#region src/gateway/operator-session-run.ts
/** Binds create-on-run provenance and row admission to the original operator. */
function prepareGatewayOperatorSessionRun(params) {
	assertAdmittedRunOperatorAuthority(params.authority);
	const assertCurrent = () => {
		params.assertSourceCurrent();
		params.authority.assertCurrent();
	};
	assertCurrent();
	const client = createSyntheticPluginRuntimeClient({
		operatorRoleActor: {
			kind: "operator",
			profileId: params.authority.profileId
		},
		scopes: [...params.authority.scopes]
	});
	const creation = resolveSandboxedSessionCreation({ authenticatedUserProfile: { profileId: params.authority.profileId } }, params.cfg);
	return {
		creation: creation ? {
			...creation,
			via: "run"
		} : void 0,
		assertCurrent,
		assertAuthorized: (entry) => {
			assertCurrent();
			const error = entry ? authorizeSessionAgentRun({
				cfg: params.cfg,
				client,
				target: {
					agentId: params.agentId,
					canonicalKey: params.sessionKey,
					entry
				}
			}) : authorizeGatewaySessionCreation({
				cfg: params.cfg,
				client,
				agentId: params.agentId
			});
			if (error) throw new ToolAuthorizationError(error.message);
		}
	};
}
//#endregion
export { prepareGatewayOperatorSessionRun };
