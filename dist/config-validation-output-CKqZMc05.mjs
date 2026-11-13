import { a as writeRuntimeJson } from "./runtime-BC29JSZp.mjs";
import { p as shortenHomePath } from "./utils-DUAwk2p5.mjs";
import { r as formatCliJsonFailure } from "./failure-output-D0uJQEzS.mjs";
import { i as normalizeConfigIssues } from "./issue-format-IKggtHBm.mjs";
import { t as configFailureHeading } from "./io.invalid-config-DkKUeCUl.mjs";
//#region src/cli/config-validation-output.ts
/** Render one failure document; the caller retains its existing exit and recovery policy. */
function writeInvalidConfigCliJson(runtime, snapshot) {
	writeRuntimeJson(runtime, {
		...formatCliJsonFailure(`${configFailureHeading(snapshot)}: ${shortenHomePath(snapshot.path)}`),
		issues: normalizeConfigIssues(snapshot.issues)
	});
}
//#endregion
export { writeInvalidConfigCliJson as t };
