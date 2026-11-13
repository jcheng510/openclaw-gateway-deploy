import { h as captureOpenClawStateWorkerContextWithAdmission, t as captureOpenClawStateDatabaseReadAdmission } from "./openclaw-state-db-cache-r55YXcqj.js";
import "node:path";
import "node:async_hooks";
//#region src/state/openclaw-state-worker-context.ts
function captureOpenClawStateWorkerContext(options = {}) {
	return captureOpenClawStateWorkerContextWithAdmission(options, captureOpenClawStateDatabaseReadAdmission);
}
//#endregion
export { captureOpenClawStateWorkerContext as t };
