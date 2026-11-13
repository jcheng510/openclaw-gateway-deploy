import { a as asOptionalRecord } from "../../record-coerce-TIsquoVR.mjs";
import { r as declareAgentWorkspaceAccess, s as registerAgentWorkspaceAccess } from "../../workspace-access-DIRgQG5g.mjs";
import "../../string-coerce-runtime-B1b8UNzb.mjs";
import { t as definePluginEntry } from "../../plugin-entry-BsETFXpv.mjs";
import { i as createWorkspaceAttachmentPreparer } from "../../agent-workspace-runtime-hBTYterP.mjs";
import { t as FILE_TRANSFER_NODE_INVOKE_COMMANDS } from "../../node-invoke-policy-commands-BEizdTVP.mjs";
import { l as FILE_WRITE_TOOL_DESCRIPTOR, o as FILE_FETCH_TOOL_DESCRIPTOR, r as DIR_LIST_TOOL_DESCRIPTOR, t as DIR_FETCH_TOOL_DESCRIPTOR } from "../../descriptors-B5OrYtkR.mjs";
import path from "node:path";
//#region extensions/file-transfer/src/shared/lazy-node-invoke-policy.ts
const loadFileTransferNodeInvokePolicy = async () => {
	const { createFileTransferNodeInvokePolicy } = await import("../../node-invoke-policy-Dsu_7txn.mjs");
	return createFileTransferNodeInvokePolicy();
};
function createLazyFileTransferNodeInvokePolicy(loadPolicy = loadFileTransferNodeInvokePolicy) {
	let policyPromise;
	return {
		commands: [...FILE_TRANSFER_NODE_INVOKE_COMMANDS],
		async handle(ctx) {
			let policy;
			try {
				policyPromise ??= loadPolicy();
				policy = await policyPromise;
			} catch (error) {
				return {
					ok: false,
					code: "PLUGIN_POLICY_UNAVAILABLE",
					message: `file-transfer PLUGIN_POLICY_UNAVAILABLE: node.invoke policy unavailable: ${error instanceof Error && error.message ? error.message : String(error)}`,
					unavailable: true
				};
			}
			return await policy.handle(ctx);
		}
	};
}
//#endregion
//#region extensions/file-transfer/src/workspace-service.ts
function readWorkspaces(config) {
	const workspaces = asOptionalRecord(asOptionalRecord(config)?.workspaces) ?? {};
	return Object.entries(workspaces).map(([agentId, value]) => {
		const entry = asOptionalRecord(value);
		if (!entry || typeof entry.nodeId !== "string" || !entry.nodeId.trim() || typeof entry.remoteRoot !== "string" || !path.posix.isAbsolute(entry.remoteRoot) || entry.remoteRoot.includes("\0")) throw new Error(`Invalid file-transfer workspace configuration for ${agentId}`);
		return {
			agentId,
			nodeId: entry.nodeId,
			remoteRoot: path.posix.resolve(entry.remoteRoot)
		};
	});
}
function registerNodeWorkspaces(api) {
	if (api.registrationMode !== "full") return;
	for (const { agentId } of readWorkspaces(api.pluginConfig)) declareAgentWorkspaceAccess(api.runtime.agent.resolveAgentWorkspaceDir(api.config, agentId));
	let lifetime;
	const releases = [];
	const stop = () => {
		lifetime?.abort(/* @__PURE__ */ new Error("Node workspace service stopped"));
		for (const release of releases.splice(0)) release();
	};
	api.registerService({
		id: "file-transfer-workspaces",
		reload: { configPrefixes: ["plugins.entries.file-transfer.config.workspaces", "agents"] },
		async start(ctx) {
			stop();
			const controller = new AbortController();
			lifetime = controller;
			const configured = readWorkspaces(ctx.config.plugins?.entries?.["file-transfer"]?.config).map((entry) => ({
				agentId: entry.agentId,
				nodeId: entry.nodeId,
				remoteRoot: entry.remoteRoot,
				workspaceDir: path.resolve(api.runtime.agent.resolveAgentWorkspaceDir(ctx.config, entry.agentId))
			}));
			for (const entry of configured) declareAgentWorkspaceAccess(entry.workspaceDir);
			if (configured.length === 0) return;
			try {
				const bindings = /* @__PURE__ */ new Map();
				for (const entry of configured) {
					const previous = bindings.get(entry.workspaceDir);
					if (previous && (previous.nodeId !== entry.nodeId || previous.remoteRoot !== entry.remoteRoot)) throw new Error(`Conflicting node workspace mappings for ${entry.workspaceDir}`);
					bindings.set(entry.workspaceDir, entry);
				}
				const invoke = ctx.invokeNode;
				if (!invoke) throw new Error("Node workspaces require Gateway service node access");
				const { createNodeWorkspaceBridge } = await import("../../workspace-bridge-jdgmyYcZ.mjs");
				const { createNodeWorkspaceMemory } = await import("../../workspace-memory-BPFBej3g.mjs");
				const { createNodeWorkspaceSkills } = await import("../../workspace-skills-BMXRoyBR.mjs");
				controller.signal.throwIfAborted();
				for (const entry of bindings.values()) {
					const bridge = createNodeWorkspaceBridge({
						...entry,
						invoke,
						signal: controller.signal,
						openDuplex: ctx.openNodeDuplex
					});
					releases.push(registerAgentWorkspaceAccess(entry.workspaceDir, {
						...ctx.openNodeDuplex ? {
							...createNodeWorkspaceSkills({
								...entry,
								signal: controller.signal,
								openDuplex: ctx.openNodeDuplex
							}),
							memoryFiles: createNodeWorkspaceMemory({
								...entry,
								signal: controller.signal,
								openDuplex: ctx.openNodeDuplex
							})
						} : {},
						...ctx.openNodeDuplex ? { prepareTurnAttachments: createWorkspaceAttachmentPreparer({
							remoteRoot: entry.remoteRoot,
							createBridge: (assertCurrent, signal) => createNodeWorkspaceBridge({
								...entry,
								invoke,
								signal: AbortSignal.any([controller.signal, signal]),
								openDuplex: ctx.openNodeDuplex,
								assertCurrent
							})
						}) } : {},
						bridge,
						outboundMedia: {
							localRoots: [entry.workspaceDir],
							readFile: (filePath, maxBytes) => bridge.readFile({
								filePath,
								cwd: entry.workspaceDir,
								maxBytes
							})
						}
					}));
				}
			} catch (error) {
				if (lifetime === controller) stop();
				throw error;
			}
		},
		stop
	});
}
//#endregion
//#region extensions/file-transfer/index.ts
function readNodeCommandParams(paramsJSON) {
	return paramsJSON ? JSON.parse(paramsJSON) : {};
}
function createLazyTool(descriptor, loadTool) {
	let toolPromise;
	return {
		...descriptor,
		async execute(toolCallId, args, signal, onUpdate) {
			return await (await (toolPromise ??= loadTool())).execute(toolCallId, args, signal, onUpdate);
		}
	};
}
var file_transfer_default = definePluginEntry({
	id: "file-transfer",
	name: "File Transfer",
	description: "Fetch, list, and write files on paired nodes via dedicated node commands.",
	nodeHostCommands: [
		{
			command: "file.stat",
			hasActiveWork: () => false,
			cap: "file",
			dangerous: true,
			handle: async (paramsJSON) => {
				const { handleFileStat } = await import("../../file-stat-Bsj9vq0B.mjs");
				const params = asOptionalRecord(readNodeCommandParams(paramsJSON)) ?? {};
				return JSON.stringify(await handleFileStat(params));
			}
		},
		{
			command: "file.fetch",
			hasActiveWork: () => false,
			duplex: "optional",
			cap: "file",
			dangerous: true,
			handle: async (paramsJSON, io) => {
				const { handleFileFetch } = await import("../../file-fetch-DnTQdAhf.mjs");
				const result = await handleFileFetch(readNodeCommandParams(paramsJSON), io);
				return JSON.stringify(result);
			}
		},
		{
			command: "dir.list",
			hasActiveWork: () => false,
			cap: "file",
			dangerous: true,
			handle: async (paramsJSON) => {
				const { handleDirList } = await import("../../dir-list-BVh3c_2F.mjs");
				const result = await handleDirList(readNodeCommandParams(paramsJSON));
				return JSON.stringify(result);
			}
		},
		{
			command: "dir.fetch",
			hasActiveWork: () => false,
			cap: "file",
			dangerous: true,
			handle: async (paramsJSON) => {
				const { handleDirFetch } = await import("../../dir-fetch-BSSh4ZT_.mjs");
				const result = await handleDirFetch(readNodeCommandParams(paramsJSON));
				return JSON.stringify(result);
			}
		},
		{
			command: "file.create",
			hasActiveWork: () => false,
			cap: "file",
			dangerous: true,
			duplex: true,
			handle: async (paramsJSON, io) => {
				const { handleFileCreate } = await import("../../file-create-8pFLZSyH.mjs");
				const params = asOptionalRecord(readNodeCommandParams(paramsJSON)) ?? {};
				return JSON.stringify(await handleFileCreate(params, io));
			}
		},
		{
			command: "file.write",
			hasActiveWork: () => false,
			cap: "file",
			dangerous: true,
			handle: async (paramsJSON) => {
				const { handleFileWrite } = await import("../../file-write-B17kmLFX.mjs");
				const result = await handleFileWrite(readNodeCommandParams(paramsJSON));
				return JSON.stringify(result);
			}
		}
	],
	register(api) {
		for (const kind of ["memory", "skills"]) {
			api.registerNodeHostCommand({
				command: `workspace.${kind}`,
				hasActiveWork: () => false,
				cap: "file",
				dangerous: true,
				duplex: true,
				handle: async (...args) => {
					const { createWorkspaceCommand } = await import("../../workspace-memory-ayEAH6j2.mjs");
					return await createWorkspaceCommand(api, kind).handle(...args);
				}
			});
			api.registerNodeInvokePolicy({
				commands: [`workspace.${kind}`],
				dangerous: true,
				async handle(ctx) {
					const { createWorkspaceWorkerPolicy } = await import("../../workspace-memory-policy-B5t6rkoD.mjs");
					return await createWorkspaceWorkerPolicy(kind).handle(ctx);
				}
			});
		}
		registerNodeWorkspaces(api);
		api.registerCli(async ({ program }) => {
			const { registerFileTransferCli } = await import("../../cli-CAhuRle6.mjs");
			registerFileTransferCli(program);
		}, { descriptors: [{
			name: "file-transfer",
			description: "Review file-transfer standing approvals",
			hasSubcommands: true
		}] });
		api.registerNodeInvokePolicy(createLazyFileTransferNodeInvokePolicy());
		api.registerTool(createLazyTool(FILE_FETCH_TOOL_DESCRIPTOR, async () => {
			const { createFileFetchTool } = await import("../../file-fetch-tool-DsFqDTBI.mjs");
			return createFileFetchTool();
		}));
		api.registerTool(createLazyTool(DIR_LIST_TOOL_DESCRIPTOR, async () => {
			const { createDirListTool } = await import("../../dir-list-tool-Dlx-jXRj.mjs");
			return createDirListTool();
		}));
		api.registerTool(createLazyTool(DIR_FETCH_TOOL_DESCRIPTOR, async () => {
			const { createDirFetchTool } = await import("../../dir-fetch-tool-B4qBoeiZ.mjs");
			return createDirFetchTool();
		}));
		api.registerTool(createLazyTool(FILE_WRITE_TOOL_DESCRIPTOR, async () => {
			const { createFileWriteTool } = await import("../../file-write-tool-BgQjxn5D.mjs");
			return createFileWriteTool();
		}));
	}
});
//#endregion
export { file_transfer_default as default };
