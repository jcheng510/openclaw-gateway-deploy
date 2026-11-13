import { t as isMainModule } from "./is-main-DYSvvM1W.mjs";
import { b as resolveGatewayPort } from "./paths-CtO6iw0c.mjs";
import { r as getRuntimeConfig } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { s as readActiveGatewayLockPort } from "./gateway-lock-DhA-3HKn.mjs";
import { fileURLToPath } from "node:url";
//#region src/docker-healthcheck.ts
async function resolveDockerHealthcheckPort(deps = {}) {
	const env = deps.env ?? process.env;
	const readActivePort = deps.readActiveGatewayLockPort ?? readActiveGatewayLockPort;
	try {
		const activePort = await readActivePort({ env });
		if (activePort !== void 0) return activePort;
	} catch {}
	const config = (deps.getRuntimeConfig ?? (() => getRuntimeConfig({
		pin: false,
		skipPluginValidation: true,
		skipShellEnvFallback: true
	})))();
	return (deps.resolveGatewayPort ?? resolveGatewayPort)(config, env);
}
async function probeDockerGatewayHealth(deps = {}) {
	try {
		const port = await resolveDockerHealthcheckPort(deps);
		return (await (deps.fetch ?? globalThis.fetch)(`http://127.0.0.1:${port}/healthz`)).ok;
	} catch {
		return false;
	}
}
if (isMainModule({ currentFile: fileURLToPath(import.meta.url) })) probeDockerGatewayHealth().then((healthy) => {
	process.exitCode = healthy ? 0 : 1;
});
//#endregion
export { probeDockerGatewayHealth };
