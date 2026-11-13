import { n as resolveOpenClawPackageRoot } from "./openclaw-root-3-SBP6RS.mjs";
import { t as gitCommitPrefixesMatch } from "./git-commit-Brz49B6u.mjs";
import { t as checkUpdateStatus } from "./update-check-CJv8Mjkn.mjs";
import { n as updateInstallRootsMatch } from "./update-install-root-DH-onosx.mjs";
import { y as readVerifiedGitUpdateReceipt } from "./restart-sentinel-B8oVBXRb.mjs";
//#region src/infra/update-install-status.ts
async function resolveStartupInstallStatus(fetchRemoteGit, signal) {
	const [root, installReceipt] = await Promise.all([resolveOpenClawPackageRoot({
		moduleUrl: import.meta.url,
		argv1: process.argv[1],
		cwd: process.cwd()
	}), readVerifiedGitUpdateReceipt()]);
	const gitUpstreamFallback = installReceipt?.upstreamRef && root && updateInstallRootsMatch(root, installReceipt.root) ? {
		currentSha: installReceipt.sha,
		upstreamRef: installReceipt.upstreamRef
	} : void 0;
	const status = await checkUpdateStatus({
		root,
		signal,
		...fetchRemoteGit ? {} : { timeoutMs: 2500 },
		fetchGit: fetchRemoteGit,
		includeRegistry: false,
		...fetchRemoteGit ? { useDetachedDevUpstream: true } : {},
		...gitUpstreamFallback ? { gitUpstreamFallback } : {}
	});
	signal.throwIfAborted();
	return {
		root,
		status,
		installReceipt
	};
}
function resolveGitInstalledAtMs(git, installReceipt, root) {
	return installReceipt && root !== null && updateInstallRootsMatch(root, installReceipt.root) && git.sha && gitCommitPrefixesMatch(installReceipt.sha, git.sha) ? installReceipt.installedAtMs : void 0;
}
function resolveGitScheduleStatus(update, installReceipt, root) {
	if (update.installKind !== "git") return;
	const git = update.git;
	const installedAtMs = git ? resolveGitInstalledAtMs(git, installReceipt, root) : void 0;
	const metadata = git ? {
		...git.sha ? { currentSha: git.sha } : {},
		...typeof git.commitAtMs === "number" ? { commitAtMs: git.commitAtMs } : {},
		...installedAtMs === void 0 ? {} : { installedAtMs }
	} : {};
	if (!git || git.error || !git.sha) return {
		...metadata,
		status: "unavailable",
		reason: "git-unavailable"
	};
	if (!git.upstream) return {
		...metadata,
		status: "unavailable",
		reason: "no-upstream"
	};
	if (git.fetchOk !== true) return {
		...metadata,
		status: "unavailable",
		reason: "fetch-failed"
	};
	if (!git.upstreamSha) return {
		...metadata,
		status: "unavailable",
		reason: "no-upstream-sha"
	};
	if (git.ahead === null || git.behind === null) return {
		...metadata,
		status: "unavailable",
		reason: "comparison-failed"
	};
	const comparison = {
		...metadata,
		upstreamSha: git.upstreamSha,
		...git.repositoryUrl ? { repositoryUrl: git.repositoryUrl } : {}
	};
	if (git.ahead > 0 && git.behind > 0) return {
		...comparison,
		status: "diverged",
		commitsAhead: git.ahead,
		commitsBehind: git.behind
	};
	if (git.behind > 0) return {
		...comparison,
		status: "behind",
		commitsBehind: git.behind
	};
	if (git.ahead > 0) return {
		...comparison,
		status: "ahead",
		commitsAhead: git.ahead
	};
	return {
		...comparison,
		status: "current"
	};
}
function withUpdateInstallStatus(schedule, update, includeGitStatus, installReceipt, root) {
	const git = includeGitStatus ? resolveGitScheduleStatus(update, installReceipt, root) : void 0;
	return {
		...schedule,
		install: {
			kind: update.installKind,
			...git ? { git } : {}
		}
	};
}
//#endregion
export { withUpdateInstallStatus as n, resolveStartupInstallStatus as t };
