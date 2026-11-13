import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { b as redactToolPayloadText } from "./redact-CYYx6Qjc.mjs";
import { t as ToolAuthorizationError } from "./tool-input-error-mjW74R8m.mjs";
import { n as authorizeOperatorScopesForMethod } from "./method-scopes-DZtl1Vvs.mjs";
import { i as describeFailoverError, m as resolveFailoverStatus } from "./failover-error--wjjTO6U.mjs";
import { d as sendMethodNotAllowed, f as sendMissingScopeForbidden, o as readJsonBodyOrError } from "./http-common-mSENR2Yd.mjs";
import { d as resolveTrustedHttpOperatorScopes, r as authorizeGatewayHttpRequestOrReply } from "./http-auth-utils-CMrl4gF5.mjs";
import "./http-utils-BGKndJpB.mjs";
//#region src/gateway/http-endpoint-helpers.ts
/** Handles a gateway POST JSON endpoint and returns the parsed body when authorized. */
async function handleGatewayPostJsonEndpoint(req, res, opts) {
	if (new URL(req.url ?? "/", "http://localhost").pathname !== opts.pathname) return false;
	if (req.method !== "POST") {
		sendMethodNotAllowed(res);
		return;
	}
	const requestAuth = await authorizeGatewayHttpRequestOrReply({
		...opts,
		req,
		res
	});
	if (!requestAuth) return;
	const operatorScopes = opts.resolveOperatorScopes?.(req, requestAuth) ?? resolveTrustedHttpOperatorScopes(req, requestAuth);
	if (opts.requiredOperatorMethod) {
		const scopeAuth = authorizeOperatorScopesForMethod(opts.requiredOperatorMethod, operatorScopes);
		if (!scopeAuth.allowed) {
			sendMissingScopeForbidden(res, scopeAuth.missingScope);
			return;
		}
	}
	const body = await readJsonBodyOrError(req, res, opts.maxBodyBytes);
	if (body === void 0) return;
	try {
		await requestAuth.revalidate();
	} catch (error) {
		if (res.writableEnded || res.destroyed) return;
		throw error;
	}
	return {
		body,
		requestAuth,
		operatorScopes
	};
}
//#endregion
//#region src/gateway/openai-compat-errors.ts
const ERROR_TYPE_BY_REASON = {
	auth: "authentication_error",
	auth_permanent: "permission_error",
	format: "invalid_request_error",
	rate_limit: "rate_limit_error",
	overloaded: "api_error",
	billing: "insufficient_quota",
	server_error: "api_error",
	timeout: "api_error",
	tls_certificate: "api_error",
	context_overflow: "invalid_request_error",
	model_not_found: "invalid_request_error",
	session_expired: "invalid_request_error",
	empty_response: void 0,
	no_error_details: void 0,
	unclassified: void 0,
	unknown: void 0
};
function statusForReason(reason, status) {
	if (reason === "server_error") return status && status >= 400 && status < 500 ? status : 502;
	if (reason === "timeout") return status && status >= 400 && status < 500 ? status : 504;
	return status ?? resolveFailoverStatus(reason) ?? 500;
}
function messageForReason(params) {
	if (params.reason === "server_error") return "upstream provider error";
	if (params.reason === "timeout") return "upstream provider timeout";
	if (params.reason === "overloaded") return "upstream provider overloaded";
	return params.rawError?.trim() || params.message.trim() || "request failed";
}
/** Converts a provider failover error into an OpenAI-compatible error envelope. */
function resolveOpenAiCompatError(err) {
	if (err instanceof ToolAuthorizationError) return {
		status: 403,
		error: {
			message: err.message,
			type: "permission_error"
		}
	};
	const described = describeFailoverError(err);
	const reason = described.reason;
	if (!reason) return;
	const type = ERROR_TYPE_BY_REASON[reason];
	if (!type) return;
	const status = statusForReason(reason, described.status);
	const message = messageForReason({
		reason,
		message: described.message,
		rawError: described.rawError
	});
	return {
		status,
		error: {
			message: redactToolPayloadText(message),
			type,
			...described.code ? { code: redactToolPayloadText(described.code) } : {}
		}
	};
}
/** Validates sampling ranges after the HTTP request schema admits numeric fields. */
function validateOpenAiSamplingParams(params) {
	if (params.temperature != null && (params.temperature < 0 || params.temperature > 2)) return "`temperature` must be between 0 and 2.";
	if (params.topP != null && (params.topP < 0 || params.topP > 1)) return "`top_p` must be between 0 and 1.";
	if (params.frequencyPenalty != null && (params.frequencyPenalty < -2 || params.frequencyPenalty > 2)) return "`frequency_penalty` must be between -2.0 and 2.0.";
	if (params.presencePenalty != null && (params.presencePenalty < -2 || params.presencePenalty > 2)) return "`presence_penalty` must be between -2.0 and 2.0.";
	if (params.seed != null && !Number.isInteger(params.seed)) return "`seed` must be an integer.";
}
function resolveResponseFormat(value) {
	if (value == null) return;
	if (!isRecord(value)) throw new Error("response_format must be an object");
	const obj = value;
	const type = obj.type;
	if (type !== "text" && type !== "json_object" && type !== "json_schema") throw new Error("response_format.type must be text, json_object, or json_schema");
	return obj;
}
function resolveStopSequences(value) {
	if (value == null) return;
	const list = typeof value === "string" ? [value] : value;
	if (list.length > 4) throw new Error("stop supports at most 4 sequences");
	if (list.some((item) => item.length === 0)) throw new Error("stop entries must be non-empty strings");
	return list.length > 0 ? list : void 0;
}
//#endregion
export { handleGatewayPostJsonEndpoint as a, validateOpenAiSamplingParams as i, resolveResponseFormat as n, resolveStopSequences as r, resolveOpenAiCompatError as t };
