import { a as asOptionalRecord } from "../../record-coerce-TIsquoVR.mjs";
import "../../llm-Dd2jPJpI.mjs";
import "../../string-coerce-runtime-B1b8UNzb.mjs";
import { i as streamSimple } from "../../stream-1HH_h55S.mjs";
import { c as buildProviderStreamFamilyHooks } from "../../provider-stream-Dxv8qvCK.mjs";
import "../../provider-stream-family-Cbj9taJJ.mjs";
import "../../token-sharing-CmBELw8t.mjs";
import { t as createOpenAINativeWebSearchWrapper } from "../../native-web-search-DNA0H3gA.mjs";
//#region extensions/openai/responses-stream.runtime.ts
const { wrapStreamFn } = buildProviderStreamFamilyHooks("openai-responses-defaults");
const SIWC_SERVICE_TIERS = [
	"default",
	"priority",
	"ultrafast",
	"slow"
];
function wrapOpenAIResponsesStream(ctx) {
	let streamContext = ctx;
	if (ctx.auth?.mode === "oauth" && ctx.auth.authFlow === "chatgpt-token-sharing") {
		const underlying = ctx.streamFn ?? streamSimple;
		streamContext = {
			...ctx,
			extraParams: {
				...ctx.extraParams,
				transport: "sse",
				responsesServerCompaction: false
			},
			streamFn: (model, context, options) => {
				const headers = new Headers(options?.headers);
				headers.set("x-openai-chatpass-test", "codex-direct");
				const sharingOptions = {
					...options,
					headers: Object.fromEntries(headers.entries()),
					transport: "sse",
					replayResponsesItemIds: false,
					onPayload: async (payload, payloadModel) => {
						const transformed = await options?.onPayload?.(payload, payloadModel);
						const request = asOptionalRecord(transformed ?? payload);
						if (!request) throw new Error("ChatGPT token sharing requires a Responses request object.");
						if (request.service_tier != null && !SIWC_SERVICE_TIERS.some((tier) => tier === request.service_tier)) throw new Error(`Sign in with ChatGPT does not support this service tier. Remove serviceTier/service_tier from the model params or select one of: ${SIWC_SERVICE_TIERS.join(", ")}.`);
						request.store = false;
						for (const field of [
							"context_management",
							"metadata",
							"max_output_tokens",
							"temperature",
							"top_p",
							"prompt_cache_retention"
						]) delete request[field];
						return request;
					}
				};
				return underlying(model, context, sharingOptions);
			}
		};
	}
	return createOpenAINativeWebSearchWrapper(wrapStreamFn?.(streamContext) ?? streamContext.streamFn, {
		config: ctx.config,
		agentId: ctx.agentId,
		nativeWebSearchAllowedByToolPolicy: ctx.nativeWebSearchAllowedByToolPolicy
	});
}
//#endregion
export { wrapOpenAIResponsesStream };
