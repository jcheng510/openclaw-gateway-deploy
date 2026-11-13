//#region extensions/crabbox/cli-runtime-api.ts
async function ensureManagedCrabboxBinary(params) {
	return (await import("./crabbox-managed-binary-C2N7Nk_f.mjs")).ensureManagedCrabboxBinary(params);
}
//#endregion
export { ensureManagedCrabboxBinary as t };
