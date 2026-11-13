import { a as captureRuntimeStateEnvironment } from "./paths-CtO6iw0c.mjs";
import { _ as resolveEffectiveAgentDir } from "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-runtime-id-D1H9nIYN.mjs";
import { i as resolveLegacyInheritedAuthAgentId } from "./legacy-inherited-auth-dir-5HYwj6qZ.mjs";
import { n as getRegisteredAgentHarness } from "./registry-BDCa-WcD.mjs";
import { t as isCliProvider } from "./model-selection-cli-DYyt406M.mjs";
import { h as resolveSessionPinnedHarnessId } from "./agent-harness-session-key-BypxcwJ7.mjs";
import { s as resolveCliRuntimeExecutionProvider } from "./model-runtime-aliases-Wn7RduAA.mjs";
import { i as resolveSessionRuntimeOverrideForProvider } from "./session-runtime-compat-XDo2BOLz.mjs";
import { o as resolveEffectiveAgentRuntime } from "./thinking-runtime-ZnTNCdix.mjs";
import { s as resolveGatewaySessionStoreTargetWithStore, t as createGatewaySessionEntryReader } from "./session-utils-store-lookup-B0P8tI_m.mjs";
import { t as resolveSessionSelectedModelRef } from "./session-utils-model-selection-hLJPUXtO.mjs";
//#region src/gateway/worker-environments/placement-capabilities.ts
/** Returns the bounded placement contract declared by one active agent runtime. */
function resolveWorkerPlacementCapabilities(runtime) {
	const runtimeId = runtime.trim();
	if (runtimeId === "openclaw") return {
		executionMode: "worker-turn",
		devicePlacement: {
			requiredNodeCommands: [],
			consumesWorkerSlot: true
		}
	};
	const placement = getRegisteredAgentHarness(runtimeId)?.harness.cloudPlacement;
	if (!placement) return {};
	const requirement = placement.devicePlacement;
	if (!requirement) return { executionMode: placement.mode };
	const requiredNodeCommands = [...new Set(requirement.requiredNodeCommands)].toSorted();
	if (requiredNodeCommands.length > 32 || requiredNodeCommands.some((command) => command.length === 0 || command.length > 128 || command.trim() !== command)) return { executionMode: placement.mode };
	return {
		executionMode: placement.mode,
		devicePlacement: {
			requiredNodeCommands,
			consumesWorkerSlot: requirement.consumesWorkerSlot
		}
	};
}
//#endregion
//#region src/gateway/worker-environments/placement-session-runtime.ts
function resolveWorkerPlacementSessionRuntime(params) {
	const { provider, model } = resolveSessionSelectedModelRef({
		...params,
		source: {
			entry: params.entry,
			readSourceEntry: (key) => {
				const target = resolveGatewaySessionStoreTargetWithStore({
					...params,
					key: params.sessionKey,
					clone: false,
					readOnly: true,
					exactRead: true
				});
				return createGatewaySessionEntryReader({
					...target,
					cfg: params.cfg
				})(key);
			}
		}
	});
	return resolveWorkerPlacementModelRuntime({
		...params,
		provider,
		model
	});
}
function resolveWorkerPlacementModelRuntime(params) {
	const sessionRuntimeOverride = resolveSessionRuntimeOverrideForProvider(params);
	const pinnedHarnessId = resolveSessionPinnedHarnessId(params.entry);
	const pinnedCliRuntime = !(pinnedHarnessId !== void 0 && pinnedHarnessId === sessionRuntimeOverride) && sessionRuntimeOverride && isCliProvider(sessionRuntimeOverride, params.cfg, params.metadataSnapshot) ? sessionRuntimeOverride : void 0;
	const cliExecutionProvider = pinnedCliRuntime ?? (sessionRuntimeOverride ? void 0 : resolveCliRuntimeExecutionProvider({
		...params,
		modelId: params.model,
		authProfileId: params.entry.authProfileOverride,
		preparedAuthDirectories: {
			env: params.preparedEnvironment ?? captureRuntimeStateEnvironment(),
			get agentDir() {
				return resolveEffectiveAgentDir(params.cfg, params.agentId, { env: this.env });
			},
			get inheritedAuthDir() {
				return resolveEffectiveAgentDir(params.cfg, resolveLegacyInheritedAuthAgentId(params.cfg), { env: this.env });
			}
		}
	}));
	return pinnedCliRuntime !== void 0 || !sessionRuntimeOverride && isCliProvider(cliExecutionProvider ?? params.provider, params.cfg, params.metadataSnapshot) ? cliExecutionProvider ?? params.provider : resolveEffectiveAgentRuntime({
		cfg: params.cfg,
		provider: params.provider,
		modelId: params.model,
		agentScope: {
			kind: "prepared",
			agentId: params.agentId
		},
		sessionKey: params.sessionKey,
		sessionEntry: params.entry
	});
}
function resolveWorkerPlacementExecutionMode(runtime) {
	return resolveWorkerPlacementCapabilities(runtime).executionMode;
}
function resolveWorkerPlacementSessionRuntimeCapabilities(params) {
	return resolveWorkerPlacementCapabilities(resolveWorkerPlacementSessionRuntime(params));
}
function projectWorkerPlacementAgentRuntime(runtime) {
	const { source, ...identity } = runtime;
	const { executionMode, devicePlacement } = resolveWorkerPlacementCapabilities(runtime.id);
	return {
		...identity,
		cloudPlacementSupported: executionMode !== void 0,
		...executionMode ? { cloudPlacementExecutionMode: executionMode } : {},
		...devicePlacement ? { devicePlacement } : {},
		devicePlacementSupported: devicePlacement !== void 0,
		source
	};
}
//#endregion
export { resolveWorkerPlacementSessionRuntimeCapabilities as a, resolveWorkerPlacementSessionRuntime as i, resolveWorkerPlacementExecutionMode as n, resolveWorkerPlacementCapabilities as o, resolveWorkerPlacementModelRuntime as r, projectWorkerPlacementAgentRuntime as t };
