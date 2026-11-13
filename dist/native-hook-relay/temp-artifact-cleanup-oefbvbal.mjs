import { d as resolveGlobalSingleton, lt as truncateUtf16Safe } from "./redact-BwKH5fIe.mjs";
import { t as formatErrorMessage } from "./errors-C_Op1bVg.mjs";
import { t as runBestEffortCleanup } from "./non-fatal-cleanup-BoCq8AND.mjs";
import { t as createSubsystemLogger } from "./subsystem-EYGCijzb.mjs";
import "node:path";
import "node:os";
import fsPromises from "node:fs/promises";
//#region src/infra/temp-artifact-cleanup.ts
const log = createSubsystemLogger("infra:temp-artifacts");
resolveGlobalSingleton(Symbol.for("openclaw.retainedUpdateRuntimes"), () => /* @__PURE__ */ new Set());
function removeTemporaryArtifacts(directory, owner, onError = (error) => log.warn(truncateUtf16Safe(formatErrorMessage(`${owner} cleanup failed; files may remain in ${directory}. After the worker or session stops, check permissions and remove the retained directory: ${formatErrorMessage(error)}`), 1024))) {
	return runBestEffortCleanup({
		cleanup: () => fsPromises.rm(directory, {
			recursive: true,
			force: true
		}),
		onError
	});
}
//#endregion
export { removeTemporaryArtifacts as t };
