import { o as resolveExecutablePath, t as clearExecutablePathCache } from "./executable-path-D8C96q25.mjs";
import { v as resolveMutableAgentEntry } from "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-scope-L_eY3Hj7.mjs";
import { i as unsetConfigValueAtPath } from "./config-paths-DGj9QUTx.mjs";
import { n as mutateConfigFileWithRetry } from "./mutate-BrQ5d2nB.mjs";
import "./config-D1R2igem.mjs";
import { o as matchesAgentLifecycleBinding } from "./agent-lifecycle-registry-BTCyhxXt.mjs";
import { t as applyAgentConfig } from "./agents.config-BhFZR3Wn.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/gateway/github-cli-preflight.ts
const GITHUB_CLI_REQUIRED_MESSAGE = "GitHub CLI (`gh`) is required on the Gateway host. Install it and retry.";
var GitHubCliUnavailableError = class extends Error {
	constructor() {
		super(GITHUB_CLI_REQUIRED_MESSAGE);
		this.name = "GitHubCliUnavailableError";
	}
};
function assertGitHubCliAvailable(env = process.env) {
	clearExecutablePathCache();
	if (!resolveExecutablePath("gh", { env })) throw new GitHubCliUnavailableError();
}
//#endregion
//#region src/gateway/github-tool-identity-config.ts
async function updateGitHubToolIdentityConfig(params) {
	return (await mutateConfigFileWithRetry({
		afterWrite: { mode: "auto" },
		mutate: (draft) => {
			if (params.scope === "system") {
				if (params.expectedIdentity !== void 0 && !isDeepStrictEqual(draft.tools?.github ?? null, params.expectedIdentity)) throw new Error("GitHub identity changed while setup was in progress.");
				draft.tools ??= {};
				if (params.identity) draft.tools.github = params.identity;
				else unsetConfigValueAtPath(draft, ["tools", "github"]);
				return;
			}
			if (params.agentLifecycleBinding && !matchesAgentLifecycleBinding(draft, params.agentLifecycleBinding)) throw new Error("Agent changed while GitHub setup was in progress.");
			let entry = resolveMutableAgentEntry(draft, params.agentId);
			if (params.agentLifecycleBinding && !entry) throw new Error("Agent changed while GitHub setup was in progress.");
			if (params.expectedIdentity !== void 0 && !isDeepStrictEqual(entry?.tools?.github ?? null, params.expectedIdentity)) throw new Error("GitHub identity changed while setup was in progress.");
			if (!entry && params.identity && !params.agentLifecycleBinding) {
				Object.assign(draft, applyAgentConfig(draft, { agentId: params.agentId }));
				entry = resolveMutableAgentEntry(draft, params.agentId);
			}
			if (!entry) return;
			entry.tools ??= {};
			if (params.identity) entry.tools.github = params.identity;
			else unsetConfigValueAtPath(entry, ["tools", "github"]);
		}
	})).nextConfig;
}
//#endregion
export { GitHubCliUnavailableError as n, assertGitHubCliAvailable as r, updateGitHubToolIdentityConfig as t };
