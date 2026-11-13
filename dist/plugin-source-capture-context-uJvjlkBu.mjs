import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region src/plugins/plugin-source-capture-context.ts
const runInPluginSourceCaptureContext = resolveGlobalSingleton(Symbol.for("openclaw.pluginSourceCaptureContext"), () => AsyncLocalStorage.snapshot());
/** Capture custody can outlive a caller's disposable database inspection state. */
const pluginSourceCaptureStateDir = resolveGlobalSingleton(Symbol.for("openclaw.pluginSourceCaptureStateDir"), () => new AsyncLocalStorage());
/** Executable CLI ownership follows profile selection to each acquired capture root. */
const pluginSourceCaptureMaintenance = resolveGlobalSingleton(Symbol.for("openclaw.pluginSourceCaptureMaintenance"), () => new AsyncLocalStorage());
//#endregion
export { pluginSourceCaptureStateDir as n, runInPluginSourceCaptureContext as r, pluginSourceCaptureMaintenance as t };
