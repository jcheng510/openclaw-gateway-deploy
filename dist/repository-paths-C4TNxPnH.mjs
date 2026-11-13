import { c as normalizeGitPathForFilesystem } from "./git-exec-CTnMIsHS.mjs";
import { c as WorktreeRepositoryError } from "./git-worker-context-BSo6KDXb.mjs";
import { d as runGit, o as insideGitCheckout } from "./git-CtRrTgDk.mjs";
import fs from "node:fs/promises";
//#region src/agents/worktrees/repository-paths.ts
async function resolveCheckoutRootFromRealPath(requested, requestedLabel) {
	const rootResult = await runGit(requested, [
		"rev-parse",
		"--show-toplevel",
		"--verify",
		"HEAD^{commit}"
	]);
	if (rootResult.code !== 0) {
		if (rootResult.termination === "exit" && rootResult.stdout.trim()) {
			const head = await runGit(requested, [
				"symbolic-ref",
				"--quiet",
				"HEAD"
			]);
			const ref = head.stdout.trim();
			if (head.termination === "exit" && head.code === 0 && !head.stderr.trim() && ref.startsWith("refs/heads/")) {
				const target = await runGit(requested, [
					"show-ref",
					"--verify",
					"--quiet",
					ref
				]);
				if (target.termination === "exit" && target.code === 1 && !target.stderr.trim()) throw new WorktreeRepositoryError(`git checkout has no commits: ${requestedLabel}. Create an initial commit, then retry.`, { reason: "unborn" });
			}
		}
		if (insideGitCheckout(requested)) throw new Error(`Git metadata is unavailable for ${requested}; checkout preserved. Restore the original repository metadata, then use git worktree repair from that repository. Do not recreate its index or delete the checkout to bypass recovery.`);
		throw new WorktreeRepositoryError(`not a git checkout: ${requestedLabel}`);
	}
	const output = rootResult.stdout.replace(/\n$/, "");
	const separator = output.lastIndexOf("\n");
	const root = separator < 0 ? "" : output.slice(0, separator);
	if (!root) throw new WorktreeRepositoryError(`not a git checkout: ${requestedLabel}`);
	return await fs.realpath(normalizeGitPathForFilesystem(root));
}
//#endregion
export { resolveCheckoutRootFromRealPath as t };
