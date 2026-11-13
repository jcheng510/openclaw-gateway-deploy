import "./sandbox-paths-IwSGCnhL.mjs";
import "./common-CnSoEQyp.mjs";
import "./date-time-B8B56dzx.mjs";
import "./typebox-CIc89Etv.mjs";
import "./reaction-message-id-BNJzLV8t.mjs";
//#region src/channels/plugins/actions/shared.ts
/**
* Filters out accounts explicitly marked as tokenless.
*/
function listTokenSourcedAccounts(accounts) {
	return accounts.filter((account) => account.tokenSource !== "none");
}
/**
* Creates an action gate that is enabled when any account-level gate enables the action.
*/
function createUnionActionGate(accounts, createGate) {
	const gates = accounts.map((account) => createGate(account));
	return (key, defaultValue = true) => gates.some((gate) => gate(key, defaultValue));
}
//#endregion
export { listTokenSourcedAccounts as n, createUnionActionGate as t };
