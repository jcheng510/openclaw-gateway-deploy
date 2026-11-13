import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { Fo as validateToolsGitHubConfigureParams, Io as validateToolsGitHubStatusParams, No as validateToolsGitHubAuthorizeStartParams, jo as validateToolsGitHubAuthorizePollParams, ko as validateToolsGitHubAuthorizeCancelParams } from "./src-D2gvuSyP.mjs";
import { o as getActiveSecretsRuntimeConfigSnapshot } from "./runtime-state-I0A0iuwu.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { n as consumeGitHubSetupHandoff } from "./secret-store-CMzjGrRp.mjs";
import { g as resolveManagedGitHubProfileDir, m as resolveGitHubToolIdentityStatus, n as createManagedGitHubProfileId, p as resolveConfiguredGitHubToolIdentity, r as installManagedGitHubProfile } from "./github-tool-identity-fecb-JRm.mjs";
import { n as GitHubCliUnavailableError, t as updateGitHubToolIdentityConfig } from "./github-tool-identity-config-BsyCjG4t.mjs";
import { n as defineValidatedGatewayHandler } from "./validation-B7TobU6-.mjs";
import { t as resolveAgentIdOrRespondError } from "./agent-id-shared-Ed1g6nj_.mjs";
//#region src/gateway/server-methods/tools-github.ts
const toolsGitHubHandlers = {
	"tools.github.status": defineValidatedGatewayHandler("tools.github.status", validateToolsGitHubStatusParams, async ({ params, respond, context }) => {
		const resolved = resolveAgentIdOrRespondError({
			rawAgentId: params.agentId,
			respond,
			cfg: context.getRuntimeConfig(),
			normalize: normalizeOptionalString
		});
		if (!resolved) return;
		respond(true, await resolveGitHubToolIdentityStatus({
			config: resolved.cfg,
			sourceConfig: getActiveSecretsRuntimeConfigSnapshot()?.sourceConfig ?? resolved.cfg,
			agentId: resolved.agentId,
			selectedScope: params.selectedScope
		}));
	}),
	"tools.github.configure": defineValidatedGatewayHandler("tools.github.configure", validateToolsGitHubConfigureParams, async ({ params, respond, context }) => {
		const resolved = resolveAgentIdOrRespondError({
			rawAgentId: params.agentId,
			respond,
			cfg: context.getRuntimeConfig(),
			normalize: normalizeOptionalString
		});
		if (!resolved) return;
		try {
			const previousIdentity = resolveConfiguredGitHubToolIdentity({
				config: resolved.cfg,
				agentId: resolved.agentId,
				scope: params.scope
			});
			if (params.mode === "inherit") {
				const nextConfig = await updateGitHubToolIdentityConfig({
					scope: params.scope,
					agentId: resolved.agentId,
					expectedIdentity: previousIdentity ?? null
				});
				if (previousIdentity?.kind === "oauth") context.githubOAuthService?.retireProfile(previousIdentity.profileId);
				respond(true, await resolveGitHubToolIdentityStatus({
					config: nextConfig,
					agentId: resolved.agentId,
					selectedScope: params.scope
				}));
				return;
			}
			const gitAuthor = params.gitAuthor ? {
				...params.gitAuthor.name !== void 0 ? { name: params.gitAuthor.name.trim() } : {},
				...params.gitAuthor.email !== void 0 ? { email: params.gitAuthor.email.trim() } : {}
			} : void 0;
			const token = consumeGitHubSetupHandoff({ name: params.secretName });
			if (!token) throw new Error("temporary GitHub credential is unavailable");
			const profileId = createManagedGitHubProfileId();
			const profileDir = resolveManagedGitHubProfileDir({
				agentId: resolved.agentId,
				scope: params.scope,
				profileId
			});
			let nextConfig = resolved.cfg;
			await installManagedGitHubProfile({
				profileDir,
				token,
				commitConfig: async (account) => {
					const identity = {
						profileId,
						gitAuthor: gitAuthor ?? {
							name: account.login,
							email: `${account.accountId}+${account.login}@users.noreply.github.com`
						}
					};
					nextConfig = await updateGitHubToolIdentityConfig({
						scope: params.scope,
						agentId: resolved.agentId,
						identity,
						expectedIdentity: previousIdentity ?? null
					});
				}
			});
			if (previousIdentity?.kind === "oauth") context.githubOAuthService?.retireProfile(previousIdentity.profileId);
			respond(true, await resolveGitHubToolIdentityStatus({
				config: nextConfig,
				agentId: resolved.agentId,
				selectedScope: params.scope
			}));
		} catch {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "GitHub identity setup failed"));
		}
	}),
	"tools.github.authorize.start": defineValidatedGatewayHandler("tools.github.authorize.start", validateToolsGitHubAuthorizeStartParams, async ({ params, respond, context }) => {
		const resolved = resolveAgentIdOrRespondError({
			rawAgentId: params.agentId,
			respond,
			cfg: context.getRuntimeConfig(),
			normalize: normalizeOptionalString
		});
		if (!resolved) return;
		try {
			const service = context.githubOAuthService;
			if (!service) throw new Error("GitHub authorization lifecycle is unavailable.");
			respond(true, await service.startAuthorization({
				scope: params.scope,
				agentId: resolved.agentId
			}));
		} catch (error) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, error instanceof GitHubCliUnavailableError ? error.message : "GitHub authorization could not start"));
		}
	}),
	"tools.github.authorize.poll": defineValidatedGatewayHandler("tools.github.authorize.poll", validateToolsGitHubAuthorizePollParams, async ({ params, respond, context }) => {
		try {
			const service = context.githubOAuthService;
			if (!service) throw new Error("GitHub authorization lifecycle is unavailable.");
			respond(true, await service.pollAuthorization(params.requestId));
		} catch {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "GitHub authorization polling failed"));
		}
	}),
	"tools.github.authorize.cancel": defineValidatedGatewayHandler("tools.github.authorize.cancel", validateToolsGitHubAuthorizeCancelParams, ({ params, respond, context }) => {
		const service = context.githubOAuthService;
		if (!service) {
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, "GitHub authorization lifecycle is unavailable"));
			return;
		}
		respond(true, { cancelled: service.cancelAuthorization(params.requestId) });
	})
};
//#endregion
export { toolsGitHubHandlers };
