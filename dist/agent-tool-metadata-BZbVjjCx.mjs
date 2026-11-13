import { i as resolveGlobalSingleton } from "./global-singleton-BfHBYj6Y.mjs";
import { n as PluginHostObject } from "./plugin-instance-owned-values-2v8jCt6Q.mjs";
import { a as createToolExecutionMatcher } from "./tool-policy-shared-DSNSYBF4.mjs";
import { r as copyCodeModeControlToolIdentity } from "./code-mode-control-tools-C5LVeeKh.mjs";
import { n as copyPluginToolMeta, r as getPluginToolMeta } from "./tool-metadata--ndgGyn8.mjs";
import { t as copyCronScheduledToolProjection } from "./exec-tool-target-pinning-CTUpUcAa.mjs";
import { c as copyInternalToolExecutionPreparer } from "./internal-hooks-DUPhyX-W.mjs";
//#region src/agents/agent-tool-availability.ts
const availabilityBindings = /* @__PURE__ */ new WeakMap();
function bindAgentToolAvailability(tool, binding) {
	availabilityBindings.set(tool, { binding });
	return tool;
}
function getAgentToolAvailabilityBinding(tool) {
	return availabilityBindings.get(tool)?.binding;
}
function copyAgentToolAvailability(source, target) {
	const metadata = availabilityBindings.get(source);
	if (metadata) availabilityBindings.set(target, metadata);
	return target;
}
/** Record an executor denial so later schema-only catalog projections cannot undo it. */
function markAgentToolExecutionUnavailable(tool) {
	const metadata = availabilityBindings.get(tool);
	if (metadata) availabilityBindings.set(tool, {
		...metadata,
		executionDenied: true
	});
	return tool;
}
/** Finalize owner-controlled affordances after filtering; never rebind or grant tools. */
function finalizeAgentToolAvailability(tools, options) {
	const winners = new Map(tools.map((tool) => [tool.name, tool]));
	const executionAllowed = options?.toolExecutionAllow ? createToolExecutionMatcher(options.toolExecutionAllow) : void 0;
	const callableTools = /* @__PURE__ */ new Map();
	for (const callableTool of [...winners.values()].filter((tool) => !availabilityBindings.get(tool)?.executionDenied && (!executionAllowed || executionAllowed(tool.name)))) callableTools.set(callableTool.name, callableTool);
	for (const tool of tools) {
		const binding = availabilityBindings.get(tool)?.binding;
		if (binding) {
			binding.prepare(tool, callableTools);
			options?.onPrepared?.(tool);
		}
	}
	return [...tools];
}
function resolveAgentToolExecutionSchema(tool, schema) {
	return availabilityBindings.get(tool)?.binding.executionSchema?.(schema) ?? schema;
}
//#endregion
//#region src/agents/before-tool-call-metadata.ts
const BEFORE_TOOL_CALL_WRAPPED = Symbol.for("openclaw.beforeToolCallWrapped");
const BEFORE_TOOL_CALL_SOURCE_TOOL = Symbol.for("openclaw.beforeToolCallSourceTool");
const metadataByMarker = resolveGlobalSingleton(Symbol.for("openclaw.beforeToolCallMetadata"), () => /* @__PURE__ */ new WeakMap());
function withBeforeToolCallMetadata(tool) {
	return tool;
}
function getBeforeToolCallMetadata(tool) {
	const marker = withBeforeToolCallMetadata(tool)[BEFORE_TOOL_CALL_WRAPPED];
	return marker ? metadataByMarker.get(marker) : void 0;
}
function bindBeforeToolCallMetadata(tool, { sourceTool, ...metadata }) {
	const marker = Object.freeze({});
	metadataByMarker.set(marker, metadata);
	Object.defineProperties(tool, {
		[BEFORE_TOOL_CALL_WRAPPED]: {
			value: marker,
			enumerable: true
		},
		[BEFORE_TOOL_CALL_SOURCE_TOOL]: {
			value: sourceTool,
			enumerable: false
		}
	});
}
function getBeforeToolCallSourceTool(tool) {
	return withBeforeToolCallMetadata(tool)[BEFORE_TOOL_CALL_SOURCE_TOOL];
}
function getBeforeToolCallExecutionWrappers(tool) {
	return getBeforeToolCallMetadata(tool)?.executionWrappers ?? [];
}
function getBeforeToolCallHookContext(tool) {
	return getBeforeToolCallMetadata(tool)?.hookContext;
}
function clearBeforeToolCallWrappedMarker(tool) {
	delete withBeforeToolCallMetadata(tool)[BEFORE_TOOL_CALL_WRAPPED];
}
/** Return true when a tool already carries the before_tool_call wrapper state. */
function isToolWrappedWithBeforeToolCallHook(tool) {
	return getBeforeToolCallMetadata(tool) !== void 0;
}
/** Toggle diagnostic event emission on an existing before_tool_call wrapper. */
function setBeforeToolCallDiagnosticsEnabled(tool, enabled) {
	const options = getBeforeToolCallMetadata(tool)?.options;
	if (options) options.emitDiagnostics = enabled;
}
function getBeforeToolCallDiagnosticOptions(tool) {
	return getBeforeToolCallMetadata(tool)?.options;
}
/** Preserve exact hook state and the guarded source edge when another wrapper replaces a tool. */
function copyBeforeToolCallMetadata(source, target, wrapExecution) {
	const sourceMarker = withBeforeToolCallMetadata(source)[BEFORE_TOOL_CALL_WRAPPED];
	const metadata = getBeforeToolCallMetadata(source);
	if (!sourceMarker || !metadata) return;
	const marker = wrapExecution ? Object.freeze({}) : sourceMarker;
	if (wrapExecution) metadataByMarker.set(marker, {
		...metadata,
		executionWrappers: Object.freeze([...metadata.executionWrappers ?? [], wrapExecution])
	});
	Object.defineProperty(target, BEFORE_TOOL_CALL_WRAPPED, {
		value: marker,
		enumerable: true
	});
	const sourceTool = getBeforeToolCallSourceTool(source);
	if (sourceTool) Object.defineProperty(target, BEFORE_TOOL_CALL_SOURCE_TOOL, {
		value: sourceTool,
		enumerable: false
	});
}
//#endregion
//#region src/agents/channel-tool-metadata.ts
const channelAgentToolMeta = /* @__PURE__ */ new WeakMap();
/** Read channel metadata attached to a channel-owned agent tool. */
function getChannelAgentToolMeta(tool) {
	return channelAgentToolMeta.get(tool);
}
/** Attach channel ownership metadata to a concrete agent tool. */
function setChannelAgentToolMeta(tool, meta) {
	channelAgentToolMeta.set(tool, meta);
}
/** Copy channel metadata when wrapping or replacing a channel-owned tool. */
function copyChannelAgentToolMeta(source, target) {
	const meta = channelAgentToolMeta.get(source);
	if (meta) channelAgentToolMeta.set(target, meta);
}
//#endregion
//#region src/agents/tool-terminal-presentation.ts
const terminalPresentationByTool = /* @__PURE__ */ new WeakMap();
function setToolTerminalPresentation(tool, formatter) {
	terminalPresentationByTool.set(tool, formatter);
	return tool;
}
function getToolTerminalPresentation(tool) {
	return terminalPresentationByTool.get(tool);
}
function copyToolTerminalPresentation(source, target) {
	const formatter = terminalPresentationByTool.get(source);
	if (formatter) terminalPresentationByTool.set(target, formatter);
}
//#endregion
//#region src/agents/agent-tool-metadata.ts
var ToolActionMetadata = class ToolActionMetadata extends PluginHostObject {
	#descriptor;
	constructor(tool, descriptor) {
		super(tool);
		this.#descriptor = descriptor;
	}
	static get(tool) {
		return #descriptor in tool ? tool.#descriptor : void 0;
	}
	static set(tool, descriptor) {
		if (#descriptor in tool) tool.#descriptor = descriptor;
		else new ToolActionMetadata(tool, descriptor);
	}
};
const memoryAction = Object.freeze({
	family: "data",
	operation: "memory"
});
const openclawAction = Object.freeze({
	family: "tool",
	operation: "openclaw"
});
function bindAgentToolActionDescriptor(tool, descriptor) {
	ToolActionMetadata.set(tool, descriptor);
}
function getAgentToolActionDescriptor(tool) {
	return ToolActionMetadata.get(tool);
}
function copyAgentToolActionDescriptor(source, target) {
	const descriptor = getAgentToolActionDescriptor(source);
	if (descriptor) bindAgentToolActionDescriptor(target, descriptor);
}
/** Preserve only the metadata owned by a before-tool-call wrapper rebuild. */
function copyBeforeToolCallWrapperMetadata(source, target) {
	copyPluginToolMeta(source, target);
	copyChannelAgentToolMeta(source, target);
	copyToolTerminalPresentation(source, target);
	copyAgentToolActionDescriptor(source, target);
	copyAgentToolAvailability(source, target);
}
/** Bind the broad family at final assembly from private, process-stable owner metadata. */
function bindAssembledAgentToolActionDescriptor(tool) {
	if (getAgentToolActionDescriptor(tool)) return;
	const kind = getPluginToolMeta(tool)?.kind;
	bindAgentToolActionDescriptor(tool, kind === "memory" || Array.isArray(kind) && kind.includes("memory") ? memoryAction : openclawAction);
}
/**
* Preserve identity-backed tool metadata that object spread cannot carry.
* Losing it detaches policy, hooks, presentation, and control-flow ownership.
*/
function copyAgentToolMetadata(source, target, wrapExecution) {
	if (source === target) return target;
	copyPluginToolMeta(source, target);
	copyChannelAgentToolMeta(source, target);
	copyBeforeToolCallMetadata(source, target, wrapExecution);
	copyToolTerminalPresentation(source, target);
	copyCodeModeControlToolIdentity(source, target);
	copyCronScheduledToolProjection(source, target);
	copyInternalToolExecutionPreparer(source, target);
	copyAgentToolActionDescriptor(source, target);
	copyAgentToolAvailability(source, target);
	return target;
}
//#endregion
export { resolveAgentToolExecutionSchema as C, markAgentToolExecutionUnavailable as S, setBeforeToolCallDiagnosticsEnabled as _, getAgentToolActionDescriptor as a, finalizeAgentToolAvailability as b, getChannelAgentToolMeta as c, clearBeforeToolCallWrappedMarker as d, getBeforeToolCallDiagnosticOptions as f, isToolWrappedWithBeforeToolCallHook as g, getBeforeToolCallSourceTool as h, copyBeforeToolCallWrapperMetadata as i, setChannelAgentToolMeta as l, getBeforeToolCallHookContext as m, bindAssembledAgentToolActionDescriptor as n, getToolTerminalPresentation as o, getBeforeToolCallExecutionWrappers as p, copyAgentToolMetadata as r, setToolTerminalPresentation as s, bindAgentToolActionDescriptor as t, bindBeforeToolCallMetadata as u, bindAgentToolAvailability as v, getAgentToolAvailabilityBinding as x, copyAgentToolAvailability as y };
