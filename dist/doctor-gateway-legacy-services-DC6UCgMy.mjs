import { o as LEGACY_GATEWAY_SYSTEMD_SERVICE_NAMES } from "./constants-CQ41zfz1.mjs";
//#region src/commands/doctor-gateway-legacy-services.ts
function classifyLegacyServices(legacyServices) {
	const darwinUserServices = [];
	const linuxUserServices = [];
	const failed = [];
	for (const svc of legacyServices) {
		const userServices = svc.platform === "darwin" ? darwinUserServices : svc.platform === "linux" ? linuxUserServices : void 0;
		if (userServices && svc.scope === "user") {
			if (svc.platform === "linux" && !LEGACY_GATEWAY_SYSTEMD_SERVICE_NAMES.some((name) => svc.label === `${name}.service`)) failed.push(`${svc.label} (legacy unit name not recognized)`);
			else userServices.push(svc);
		} else failed.push(`${svc.label} (${userServices ? svc.scope : svc.platform})`);
	}
	return {
		darwinUserServices,
		linuxUserServices,
		failed
	};
}
//#endregion
export { classifyLegacyServices as t };
