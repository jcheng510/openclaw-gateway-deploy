import { a as resolveAgentDir } from "./agent-scope-config-Dm6T00l4.mjs";
import "./agent-scope-runtime-BIhssPWI.mjs";
import { n as isProviderAuthProfileConfigured, t as isProviderApiKeyConfigured } from "./provider-auth-availability-DOkAjvWP.mjs";
import "./provider-auth-Q_FDaGt7.mjs";
import { d as createXaiRealtimeVoiceProviderMetadata$1, f as createXaiVideoGenerationProviderMetadata$1 } from "./capability-provider-metadata-factory-DKDXqC4Q.mjs";
//#region extensions/xai/capability-provider-metadata.ts
function createXaiVideoGenerationProviderMetadata() {
	return createXaiVideoGenerationProviderMetadata$1({ isProviderApiKeyConfigured });
}
function createXaiRealtimeVoiceProviderMetadata() {
	return createXaiRealtimeVoiceProviderMetadata$1({
		isProviderAuthProfileConfigured,
		resolveAgentDir
	});
}
//#endregion
export { createXaiVideoGenerationProviderMetadata as n, createXaiRealtimeVoiceProviderMetadata as t };
