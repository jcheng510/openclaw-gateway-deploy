import { d as toStringifiedError } from "./error-coercion-1P2One0X.mjs";
import { r as formatSqliteReadOnlyInspectionFailure } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { Fn as object, Jn as string, Pn as number, sr as unknown } from "./schemas-BOYIvvln.mjs";
import { n as hydrateOpenClawStateWorkerError, r as retainOpenClawStateWorkerErrorPayload, t as encodeOpenClawStateWorkerError } from "./openclaw-state-worker-error-CvUWzlTD.mjs";
import { n as serializeNativeErrorResponse, t as restoreNativeErrorResponse } from "./native-error-response-BiwVbwPq.mjs";
//#region src/infra/native-error-response-schema.ts
const nativeErrorDetailsSchema = object({
	message: string(),
	code: string().optional(),
	errcode: number().optional()
});
//#endregion
//#region src/state/openclaw-agent-schema-inspection-response.ts
const agentSchemaInspectionErrorSchema = nativeErrorDetailsSchema.extend({
	name: string(),
	cause: nativeErrorDetailsSchema.optional()
}).extend({ stateError: unknown().optional() });
function serializeAgentSchemaInspectionError(value) {
	const error = toStringifiedError(value);
	return {
		...serializeNativeErrorResponse(error),
		message: formatSqliteReadOnlyInspectionFailure(error),
		stateError: encodeOpenClawStateWorkerError(error)
	};
}
function restoreAgentSchemaInspectionError(value) {
	const error = restoreNativeErrorResponse(value);
	if (value.stateError) retainOpenClawStateWorkerErrorPayload(error, value.stateError);
	const restored = hydrateOpenClawStateWorkerError(error);
	restored.message = value.message;
	return restored;
}
//#endregion
export { restoreAgentSchemaInspectionError as n, serializeAgentSchemaInspectionError as r, agentSchemaInspectionErrorSchema as t };
