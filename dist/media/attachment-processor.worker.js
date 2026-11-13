import { n as serveWorkerTasks } from "../worker-task-server-Dj9rLvzH.mjs";
import { r as prepareAttachment } from "../attachment-processor.runtime-D_bZuMCs.mjs";
//#region src/media/attachment-processor.worker.ts
serveWorkerTasks((input) => prepareAttachment(input), { transferList: (reply) => reply.buffer ? [reply.buffer.buffer] : [] });
//#endregion
export {};
