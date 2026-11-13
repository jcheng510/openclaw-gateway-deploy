import { n as serveWorkerTasks } from "./worker-task-server-Dj9rLvzH.mjs";
import "./worker-task-server-DJwlrZ2p.mjs";
import { t as prepareMemoryIndexChunks } from "./manager-index-preparation-wXpJtJiU.mjs";
//#region extensions/memory-core/src/memory/manager-index.worker.ts
serveWorkerTasks((input) => {
	const task = input;
	if (task.kind === "prepare") return {
		kind: "prepared",
		value: prepareMemoryIndexChunks(task.input)
	};
	throw new Error("Invalid memory indexing task");
});
//#endregion
export {};
