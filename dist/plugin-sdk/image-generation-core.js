import { r as createLazyRuntimeModule } from "../lazy-runtime-CJrzFzqU.mjs";
import { t as createSubsystemLogger } from "../subsystem-CeqVSEVi.mjs";
import { n as normalizeGooglePreviewModelId } from "../provider-model-id-normalize-Bx8UgVVS.mjs";
import { o as resolveAgentModelFallbackValues, s as resolveAgentModelPrimaryValue } from "../model-input-DEyB5bFf.mjs";
import { a as isFailoverError } from "../error-ySnYIwkP.mjs";
import { i as describeFailoverError } from "../failover-error--wjjTO6U.mjs";
import { i as listImageGenerationProviders, t as getImageGenerationProvider } from "../registry-BXsAPb2A.mjs";
import { d as throwCapabilityGenerationFailure, i as resolveCapabilityModelCandidates, n as buildNoCapabilityModelConfiguredMessage } from "../runtime-shared-DIwRXikK.mjs";
import { t as parseGenerationModelRef } from "../model-ref-B35FHBdE.mjs";
import "../provider-model-shared-CfEgI_y7.mjs";
import { t as getProviderEnvVars } from "../provider-env-vars-B6wfm08F.mjs";
//#region src/plugin-sdk/image-generation-core.ts
/** Default OpenAI image model used when image-generation provider config omits one. */
const OPENAI_DEFAULT_IMAGE_MODEL = "gpt-image-2";
const loadImageGenerationCoreAuthRuntime = createLazyRuntimeModule(() => import("../image-generation-core.auth.runtime-BrMFBJ4i.mjs"));
/** Resolve image-generation provider API keys through the lazy auth runtime helper. */
async function resolveApiKeyForProvider(...args) {
	return (await loadImageGenerationCoreAuthRuntime()).resolveApiKeyForProvider(...args);
}
//#endregion
export { OPENAI_DEFAULT_IMAGE_MODEL, buildNoCapabilityModelConfiguredMessage, createSubsystemLogger, describeFailoverError, getImageGenerationProvider, getProviderEnvVars, isFailoverError, listImageGenerationProviders, normalizeGooglePreviewModelId as normalizeGoogleModelId, parseGenerationModelRef as parseImageGenerationModelRef, resolveAgentModelFallbackValues, resolveAgentModelPrimaryValue, resolveApiKeyForProvider, resolveCapabilityModelCandidates, throwCapabilityGenerationFailure };
