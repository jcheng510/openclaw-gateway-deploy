//#region src/flows/doctor-gateway-exec-credential.ts
async function hasActiveGatewayExecCredential(params) {
	const [{ resolveSecretInputRef }, { gatewaySecretInputPathCanWin }, secretPaths] = await Promise.all([
		import("./types.secrets-B_AhXmRW.mjs"),
		import("./credentials-secret-inputs-CuRZgXB8.mjs"),
		import("./secret-input-paths-8k35UmUA.mjs")
	]);
	const mode = params.cfg.gateway?.mode === "remote" ? "remote" : "local";
	const hasExecCredential = secretPaths.ALL_GATEWAY_SECRET_INPUT_PATHS.some((path) => {
		if (!gatewaySecretInputPathCanWin({
			config: params.cfg,
			env: params.env ?? process.env,
			modeOverride: mode,
			path
		})) return false;
		return resolveSecretInputRef({
			value: secretPaths.readGatewaySecretInputValue(params.cfg, path),
			defaults: params.cfg.secrets?.defaults
		}).ref?.source === "exec";
	});
	if (hasExecCredential || !params.cfg.gateway?.remote?.edgeAuth) return hasExecCredential;
	const [{ buildGatewayProbeConnectionDetails }, edgeAuth] = await Promise.all([import("./call-ByHajTTE.mjs"), import("./edge-auth-v4BVAM8M.mjs")]);
	const targetUrl = params.targetUrl ?? (await buildGatewayProbeConnectionDetails({ config: params.cfg })).url;
	const { gatewayEdgeAuthValueForTarget, normalizeEdgeAuthHeadersConfig } = edgeAuth;
	const headers = normalizeEdgeAuthHeadersConfig(gatewayEdgeAuthValueForTarget({
		config: params.cfg,
		targetUrl
	}));
	return Object.values(headers ?? {}).some((value) => resolveSecretInputRef({
		value,
		defaults: params.cfg.secrets?.defaults
	}).ref?.source === "exec");
}
//#endregion
export { hasActiveGatewayExecCredential as t };
