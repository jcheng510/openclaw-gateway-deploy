import { i as hashConfigRaw } from "./io.read-helpers-CgQwh9G4.mjs";
import { r as loadInstalledPluginIndexInstallRecords } from "./installed-plugin-index-record-reader-BKR65EEF.mjs";
import { c as readConfigFileSnapshot } from "./io.runtime-BOdk1dW9.mjs";
import "./config-D1R2igem.mjs";
import { r as createManagedUpdateRequesterContinuationAuthority, t as UpdateRequesterRevokedError } from "./update-requester-authority-jkN9ySi6.mjs";
import "./installed-plugin-index-records-DHEAmSsp.mjs";
import { n as UpdatePreMutationError } from "./shared-Dwr7djBO.mjs";
import { c as withOwnedManagedUpdateEnv, n as resolveOwnedManagedUpdateEnv, s as stripGatewayServiceMarkerEnv } from "./update-command-service-env-QsECikj0.mjs";
import { a as isCandidateAdmissionContextCovered, t as captureTargetDatabaseSchemaContext } from "./schema-preflight-_BPWsRCI.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/cli/update-cli/update-command-managed-context.ts
/** Resolve the service's selectors without reading or validating its configuration. */
function resolveOwnedManagedUpdatePreflightEnv(params) {
	const state = params.stopState;
	if (state?.serviceUpdateVerdict?.kind !== "owned" || !state.serviceEnv) return;
	return stripGatewayServiceMarkerEnv(resolveOwnedManagedUpdateEnv({
		processEnv: params.processEnv,
		serviceEnv: state.serviceEnv,
		serviceDefinitionEnv: state.serviceDefinitionEnv,
		invocationCwd: params.invocationCwd
	}));
}
/** Inspection uses the same service selectors as finalization, without activating config/plugins. */
async function captureOwnedManagedUpdatePreflightContext(params) {
	const env = resolveOwnedManagedUpdatePreflightEnv(params);
	return env ? captureTargetDatabaseSchemaContext(env, params) : void 0;
}
async function revalidateUpdateDatabaseContext(expected) {
	const current = await captureTargetDatabaseSchemaContext(expected.readEnv, {
		legacyConfigPlan: expected.legacyConfigPlan,
		configValidation: expected.configValidation
	});
	const before = expected.configSnapshot;
	const after = current.configSnapshot;
	if (before.path !== after.path || before.exists !== after.exists || before.raw !== after.raw || before.hash !== after.hash || !isDeepStrictEqual(before.includedPaths ?? [], after.includedPaths ?? []) || !isDeepStrictEqual(before.includeProvenance ?? [], after.includeProvenance ?? []) || !isDeepStrictEqual(before.sourceConfig, after.sourceConfig)) throw new UpdatePreMutationError("database-schema-preflight", `Update refused: configuration changed during database admission at ${before.path}. Retry against the current configuration.`);
	return current;
}
async function captureOwnedManagedUpdateContext(params) {
	const stopState = params.stopState;
	if (stopState?.inspected !== true || stopState.serviceUpdateVerdict?.kind !== "owned" || !stopState.serviceEnv) return;
	const env = stripGatewayServiceMarkerEnv(resolveOwnedManagedUpdateEnv({
		processEnv: params.processEnv,
		serviceEnv: stopState.serviceEnv,
		serviceDefinitionEnv: stopState.serviceDefinitionEnv,
		invocationCwd: params.invocationCwd
	}));
	stopState.serviceEnv = env;
	return await withOwnedManagedUpdateEnv(env, async () => {
		const configSnapshot = await readConfigFileSnapshot({
			observe: false,
			skipPluginValidation: true
		});
		const pluginInstallRecords = await loadInstalledPluginIndexInstallRecords({ env });
		return {
			env,
			configSnapshot,
			pluginInstallRecords
		};
	});
}
async function readUpdateCandidateSource(env, legacyConfigPlan, options) {
	if (legacyConfigPlan) {
		const context = await captureTargetDatabaseSchemaContext(env, {
			legacyConfigPlan,
			...options
		});
		if (context.legacyConfigPlan) return {
			config: context.config,
			hash: hashConfigRaw(context.configSnapshot.raw)
		};
	}
	const snapshot = await withOwnedManagedUpdateEnv(env, () => readConfigFileSnapshot({
		skipPluginValidation: true,
		observe: false
	}));
	return {
		config: options?.configValidation === "candidate" && isCandidateAdmissionContextCovered(env) ? snapshot.sourceConfig : snapshot.config,
		hash: hashConfigRaw(snapshot.raw)
	};
}
/** Complete native admission before any execution guard can observe the pending requester. */
async function admitUpdateRequesterContinuation(run, executor, root, serviceRoot) {
	const original = run.requesterAuthority;
	const requester = original?.requester;
	if (!requester?.authorizationSource?.startsWith("profile:")) return;
	const runId = run.runId;
	const previousFence = run.executorFence;
	const fence = await executor.enter(root, {
		preflight: true,
		serviceRoot
	});
	const assertRunCurrent = () => {
		if (run.runId !== runId || run.requesterAuthority !== original || run.executorFence !== previousFence || previousFence && previousFence !== fence) throw new UpdateRequesterRevokedError();
		fence.assertCurrent();
	};
	assertRunCurrent();
	const continued = await createManagedUpdateRequesterContinuationAuthority(requester, {
		runId,
		executor: fence
	}, run.env);
	assertRunCurrent();
	run.requesterAuthority = continued;
	run.executorFence = fence;
}
//#endregion
export { resolveOwnedManagedUpdatePreflightEnv as a, readUpdateCandidateSource as i, captureOwnedManagedUpdateContext as n, revalidateUpdateDatabaseContext as o, captureOwnedManagedUpdatePreflightContext as r, admitUpdateRequesterContinuation as t };
