import { n as serveWorkerTasks } from "../../worker-task-server-Dj9rLvzH.mjs";
import { t as prepareProviderPrompt } from "../../provider-prompt-serialization-BXk-yfVT.mjs";
//#region src/agents/embedded-agent-runner/provider-prompt-state.worker.ts
serveWorkerTasks((input) => prepareProviderPrompt(input), { transferList: (result) => result.encoded ? [result.encoded.body.buffer] : [] });
//#endregion
export {};
