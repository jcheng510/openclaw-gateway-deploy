import { d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { l as tryResolveSoleAgentId } from "./agent-roster-B45JERT5.mjs";
import { s as isLegacyParentWritableUpdateDoctorPass } from "./update-phase-Ibh5Kd_i.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
//#region src/flows/doctor-health-contribution-utils.ts
function isUpdateDoctorRun(env) {
	const value = env.OPENCLAW_UPDATE_IN_PROGRESS;
	return value === "1" || value === "true";
}
function resolveDoctorMode(cfg) {
	return cfg.gateway?.mode === "remote" ? "remote" : "local";
}
function resolveDoctorWorkspaceDir(cfg, env = process.env) {
	const agentId = tryResolveSoleAgentId(cfg);
	return agentId ? resolveAgentWorkspaceDir(cfg, agentId, env) : void 0;
}
function resolveLegacyParentVersionOverride(ctx) {
	if (!isLegacyParentWritableUpdateDoctorPass(ctx.env ?? process.env)) return {};
	const version = ctx.configResult.sourceLastTouchedVersion?.trim();
	return version ? { lastTouchedVersionOverride: version } : {};
}
//#endregion
export { resolveLegacyParentVersionOverride as i, resolveDoctorMode as n, resolveDoctorWorkspaceDir as r, isUpdateDoctorRun as t };
