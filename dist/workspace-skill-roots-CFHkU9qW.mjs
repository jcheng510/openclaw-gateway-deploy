import path from "node:path";
//#region src/skills/loading/workspace-skill-roots.ts
function normalizeWorkspaceSkillRoots(roots) {
	const agentWorkspaceDir = path.resolve(roots.agentWorkspaceDir);
	const executionWorkspaceDir = roots.executionWorkspaceDir ? path.resolve(roots.executionWorkspaceDir) : void 0;
	return executionWorkspaceDir && executionWorkspaceDir !== agentWorkspaceDir ? {
		agentWorkspaceDir,
		executionWorkspaceDir
	} : { agentWorkspaceDir };
}
function resolveWorkspaceSkillDirectories(workspaceDir, workspaceOnly = false) {
	const workspace = {
		dir: path.resolve(workspaceDir, "skills"),
		source: "openclaw-workspace"
	};
	return workspaceOnly ? [workspace] : [{
		dir: path.resolve(workspaceDir, ".agents", "skills"),
		source: "agents-skills-project"
	}, workspace];
}
//#endregion
export { resolveWorkspaceSkillDirectories as n, normalizeWorkspaceSkillRoots as t };
