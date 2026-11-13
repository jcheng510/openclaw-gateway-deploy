import { a as getPluginRuntimeGatewayRequestScope } from "./gateway-request-scope-Da9jAC9_.mjs";
import { l as getAdmittedRunSource, t as assertAdmittedRunOperatorAuthority } from "./admitted-run-context-BL8yRX2D.mjs";
import { n as operatorScopeSatisfied } from "./operator-scope-compat-Ci6GBcmU.mjs";
import { i as getGatewayToolCallerIdentity, t as captureGatewayToolCallerAssertion } from "./gateway-caller-context-DQ2iIITl.mjs";
import { t as readOperatorToolGatewayAuthority } from "./operator-tool-gateway-authority-CgsnCzzP.mjs";
//#region src/agents/tools/presence-tool-authority.ts
/** Capture the original source before the built-in adapter creates a System client. */
function capturePresenceToolAuthority(options) {
	const caller = getGatewayToolCallerIdentity();
	const assertCallerCurrent = captureGatewayToolCallerAssertion();
	const inherited = readOperatorToolGatewayAuthority();
	const scope = getPluginRuntimeGatewayRequestScope();
	const operatorAuthority = options?.operatorAuthority ?? caller?.operatorAuthority ?? inherited?.operatorRunAuthority ?? scope?.client?.internal?.operatorRunAuthority;
	const delegatedAuthority = options?.delegatedAuthority ?? caller?.approvalAuthority;
	const sourceScopes = operatorAuthority?.scopes ?? inherited?.scopes ?? (scope?.client ? scope.client.connect.role === "node" ? [] : scope.client.connect.scopes ?? [] : void 0);
	const ownerAuthority = options?.ownerAuthority;
	const ownerRunId = options?.runId;
	return () => {
		options?.assertCurrent?.();
		assertCallerCurrent?.();
		if (operatorAuthority) {
			assertAdmittedRunOperatorAuthority(operatorAuthority);
			operatorAuthority.assertCurrent();
		} else {
			inherited?.signal.throwIfAborted();
			inherited?.assertCurrent?.();
			scope?.signal?.throwIfAborted();
			if (scope?.hasCurrentClientAuthority?.() === false) throw new Error("Gateway caller authority is no longer active.");
		}
		if (sourceScopes !== void 0) {
			if (!operatorScopeSatisfied("operator.read", sourceScopes)) throw new Error("Presence requires operator.read access.");
			return;
		}
		if (delegatedAuthority && (assertCallerCurrent || options?.assertCurrent)) {
			if (ownerAuthority && ownerRunId && delegatedAuthority.operationalRunInstance.runId === ownerRunId) {
				ownerAuthority.assertActive();
				return;
			}
			if (getAdmittedRunSource(delegatedAuthority) === "operator-schedule") return;
		}
		throw new Error("Presence requires authenticated Gateway read access or a trusted operator source.");
	};
}
//#endregion
export { capturePresenceToolAuthority as t };
