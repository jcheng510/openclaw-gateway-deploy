import { Et as _enum, Jn as string, Nt as array, qn as strictObject } from "./schemas-BOYIvvln.mjs";
import path from "node:path";
//#region extensions/agentsapi/config.ts
const agentsApiConfigSchema = strictObject({
	environment: _enum(["openai_hosted", "self_hosted"]).default("openai_hosted"),
	hostExecutorSkillDirectories: array(string().regex(/^(?:\/|[A-Za-z]:[\\/]|\\\\[^\\/]+[\\/][^\\/]+)/).refine((directory) => !directory.split(directory.startsWith("/") ? "/" : /[\\/]/).some((segment) => segment === "." || segment === ".."), "Executor skill directories cannot contain . or .. path segments")).max(32).refine((directories) => new Set(directories).size === directories.length, "Executor skill directories must be unique").optional()
});
function resolveAgentsApiEnvironment(pluginConfig, workspaceDir) {
	const parsed = agentsApiConfigSchema.parse(pluginConfig ?? {});
	return parsed.environment === "self_hosted" ? {
		type: "self_hosted",
		workspace_directory: path.resolve(workspaceDir),
		...parsed.hostExecutorSkillDirectories?.length ? { capability_directories: parsed.hostExecutorSkillDirectories } : {}
	} : { type: "openai_hosted" };
}
//#endregion
export { resolveAgentsApiEnvironment as n, agentsApiConfigSchema as t };
