import { d as toStringifiedError } from "../../error-coercion-1P2One0X.mjs";
import { n as serveWorkerTasks } from "../../worker-task-server-Dj9rLvzH.mjs";
import "../../error-runtime-CKQUxkum.mjs";
import "../../worker-task-server-DJwlrZ2p.mjs";
import { t as extractPdfContent } from "../../document-extractor.runtime-BPxC2U8g.mjs";
//#region extensions/document-extract/document-extractor.worker.ts
serveWorkerTasks(async (input, _progress, control) => {
	const request = input;
	const imageErrors = [];
	try {
		return {
			status: "ok",
			result: await extractPdfContent({
				...request,
				onImageExtractionError: (error) => imageErrors.push(toStringifiedError(error))
			}, control),
			imageErrors
		};
	} catch (error) {
		return {
			status: "failed",
			error: toStringifiedError(error),
			imageErrors
		};
	}
});
//#endregion
export {};
