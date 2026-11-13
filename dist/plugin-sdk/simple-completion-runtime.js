import { i as getLegacyPluginSdkResourceHost } from "../legacy-sdk-resource-host-CYqyTaJu.mjs";
import { t as bindModelCompletionOwner } from "../model-runtime-binding-DgnrsJj9.mjs";
import { s as extractEmbeddedAssistantText } from "../embedded-agent-utils-D8ZFH1d0.mjs";
import { t as completeWithPreparedSimpleCompletionModel } from "../simple-completion-execution-DrTniyOr.mjs";
import { t as runHostPreparedIsolatedCompletion } from "../host-prepared-isolated-completion-Ca8Dx8gn.mjs";
//#region src/plugin-sdk/simple-completion-runtime.ts
/** Preparation owns model/auth discovery; prepared execution must not cold-load it. */
const prepareSimpleCompletionModelForAgent = async (params) => {
	const host = getLegacyPluginSdkResourceHost();
	return await host.track(async () => {
		const { acquireSimpleCompletionModelForAgent } = await import("../simple-completion-runtime-BTAEnaUX.mjs");
		host.assertOpen();
		const acquired = await acquireSimpleCompletionModelForAgent(params);
		if ("error" in acquired) return acquired;
		const claim = { release: async () => await acquired[Symbol.asyncDispose]() };
		try {
			host.assertOpen();
			const { [Symbol.asyncDispose]: _dispose, ...prepared } = acquired;
			const model = bindModelCompletionOwner(prepared.model, {
				run: (run) => host.track(run),
				assertCurrent: () => host.assertOpen()
			});
			host.adopt(model, claim);
			return {
				...prepared,
				model
			};
		} catch (error) {
			host.releaseClaim(claim);
			throw error;
		}
	});
};
//#endregion
export { completeWithPreparedSimpleCompletionModel, extractEmbeddedAssistantText as extractAssistantText, prepareSimpleCompletionModelForAgent, runHostPreparedIsolatedCompletion };
