import { s as toErrorObject } from "./error-coercion-CwIUUFnu.mjs";
import { a as resolveRuntimeProcessEntrypointUrl, l as runtimeNeedsTypeScriptLoader, n as createCpuTrackedWorker, s as resolveRuntimeWorkerThreadExecArgv } from "./worker-cpu-D6yL_lHz.mjs";
import { R as runInDetachedAsyncContext, l as SqliteSchemaVersionError, m as isStartupMaintenanceKind, p as StartupMaintenanceRequiredError } from "./openclaw-state-db.paths-JnUZZAu1.mjs";
import { M as isRecord } from "./utils-Dor5uhSv.mjs";
import { d as resolveGlobalSingleton } from "./redact-BwKH5fIe.mjs";
import { t as createDeferredCore } from "./deferred-D0La5CRk.mjs";
import { $t as captureOpenClawDatabaseMaintenanceResource, C as markOpenClawStateDatabaseFailure, Ct as markSqliteNativeOpenFailure, D as getExistingOpenClawStateSchemaPath, F as retainSqliteWorkerErrorCode, Ft as assertStateDatabaseAccessAllowed, I as SQLITE_IDLE_HANDLE_TTL_MS, Mt as ensureSqliteLibrarySelected, N as SQLITE_WORKER_MAX_MESSAGE_BYTES, Nt as GatewayStateOwnerContentionError, O as isExistingOpenClawStateSchema, P as SqliteWorkerError, Pt as acquireStateDatabaseSchemaLease, Qt as StateDatabaseReadAdmissionInvalidatedError, S as findOpenClawStateDatabaseFailure, a as recordOpenClawStateDatabaseOpenFailure, an as OpenClawStateOwnershipMetadataError, b as OpenClawStateDatabaseSchemaMigrationRequiredError, dn as readDatabasePathIdentity, en as getOpenClawDatabaseMaintenanceScope, i as publishOpenClawStateDatabaseWorkerAdmission, in as OpenClawStateOwnershipError, j as createSqliteWorkerOperationAdmission, ln as throwSqliteLifecycleErrors, mt as retainSqliteWriteAdmissionService, n as getOpenClawStateDatabaseTerminalFailureAsync, o as registerOpenClawStateDatabaseAsyncResource, on as SqliteCoordinatorError, r as openClawStateDatabaseCache, rn as OpenClawStateExternalOwnershipError, s as registerOpenClawStateDatabaseLifecycleListener, sn as createSqliteLifecycleAggregateError, t as captureOpenClawStateDatabaseReadAdmission, tn as isStateDatabaseReadAdmissionInvalidatedError } from "./openclaw-state-db-cache-T4jyBmuI.mjs";
import { i as getChildLogger, t as createSubsystemLogger } from "./subsystem-EYGCijzb.mjs";
import "node:fs";
import path from "node:path";
import { availableParallelism } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import "@openclaw/fs-safe/advanced";
import { createHash } from "node:crypto";
import { AsyncLocalStorage } from "node:async_hooks";
import { channel } from "node:diagnostics_channel";
import { performance } from "node:perf_hooks";
import { isMainThread, workerData } from "node:worker_threads";
import fsPromises, { realpath, stat } from "node:fs/promises";
import { isPromise } from "node:util/types";
import { deserialize, serialize } from "node:v8";
//#region src/state/session-metadata-unavailable-error.ts
var SessionMetadataUnavailableError = class extends Error {
	constructor(reason, options, missingTables = []) {
		super(`Session metadata unavailable (${[reason, ...missingTables].join(": ")}); retry after the agent store is ready.`, options);
		this.reason = reason;
		this.missingTables = missingTables;
		this.name = "SessionMetadataUnavailableError";
	}
};
//#endregion
//#region src/agents/mcp-oauth-store-error.ts
var McpOAuthStoreCorruptionError = class extends Error {
	constructor(storeKey, detail, options) {
		super(`MCP OAuth store ${storeKey} is invalid: ${detail}`, options);
		this.name = "McpOAuthStoreCorruptionError";
	}
};
//#endregion
//#region src/agents/workspace-state-identity.ts
const WORKSPACE_ALIAS_REPOINTED_ERROR_CODE = "WORKSPACE_ALIAS_REPOINTED";
var WorkspaceAliasRepointedError = class extends Error {
	constructor(params) {
		super(`workspace path alias points to a different current target: ${params.aliasPath} now resolves to ${params.currentWorkspacePath}, but its stored workspace state belongs to ${params.storedWorkspacePath}. Run \`openclaw doctor --fix\` and confirm the move, or use \`openclaw doctor --fix --force\`.`);
		this.code = WORKSPACE_ALIAS_REPOINTED_ERROR_CODE;
		this.name = "WorkspaceAliasRepointedError";
		this.aliasPath = params.aliasPath;
		this.storedWorkspacePath = params.storedWorkspacePath;
		this.currentWorkspacePath = params.currentWorkspacePath;
	}
};
//#endregion
//#region src/gateway/worker-environments/session-attachment.ts
var WorkerSessionAlreadyAttachedError = class extends Error {
	constructor(sessionId, environmentId) {
		super(`Session ${sessionId} is already attached to worker environment ${environmentId}`);
		this.sessionId = sessionId;
		this.environmentId = environmentId;
	}
};
//#endregion
//#region src/plugin-state/plugin-blob-store.types.ts
var PluginBlobStoreError = class extends Error {
	constructor(message, options) {
		super(message, { cause: options.cause });
		this.name = "PluginBlobStoreError";
		this.code = options.code;
		this.operation = options.operation;
		if (options.path) this.path = options.path;
	}
};
//#endregion
//#region src/skills/lifecycle/upload-store-error.ts
var SkillUploadRequestError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "SkillUploadRequestError";
	}
};
//#endregion
//#region src/state/openclaw-agent-db-migration-required.ts
var OpenClawAgentDatabaseMediaMigrationRequiredError = class extends StartupMaintenanceRequiredError {
	constructor(pathname, schemaVersion) {
		super("agent-media", `OpenClaw agent database ${pathname} uses schema version ${schemaVersion}; run openclaw doctor --fix to migrate persisted media before using it.`);
		this.pathname = pathname;
		this.schemaVersion = schemaVersion;
		this.name = "OpenClawAgentDatabaseMediaMigrationRequiredError";
	}
};
//#endregion
//#region src/state/openclaw-state-lease-error.ts
const leaseErrorCodes = [
	"OPENCLAW_STATE_LEASE_INVALID_INPUT",
	"OPENCLAW_STATE_LEASE_HELD",
	"OPENCLAW_STATE_LEASE_ABORTED",
	"OPENCLAW_STATE_LEASE_LOST",
	"OPENCLAW_STATE_LEASE_STORAGE_FAILED"
];
function isOpenClawStateLeaseErrorCode(value) {
	return leaseErrorCodes.some((code) => code === value);
}
var OpenClawStateLeaseError = class extends Error {
	constructor(message, options) {
		super(message, { cause: options.cause });
		this.name = "OpenClawStateLeaseError";
		this.code = options.code;
	}
};
//#endregion
//#region src/state/openclaw-state-worker-error-identity.ts
function identifyError(error) {
	if (error instanceof WorkerSessionAlreadyAttachedError) return {
		type: "worker-session-already-attached",
		sessionId: error.sessionId,
		environmentId: error.environmentId
	};
	if (error instanceof PluginBlobStoreError) return {
		type: "plugin-blob",
		blobCode: error.code,
		operation: error.operation,
		...error.path === void 0 ? {} : { path: error.path }
	};
	if (error instanceof WorkspaceAliasRepointedError) return {
		type: "workspace-alias-repointed",
		aliasPath: error.aliasPath,
		storedWorkspacePath: error.storedWorkspacePath,
		currentWorkspacePath: error.currentWorkspacePath
	};
	if (error instanceof McpOAuthStoreCorruptionError) return { type: "mcp-oauth-corruption" };
	if (error instanceof SessionMetadataUnavailableError) return {
		type: "session-metadata",
		reason: error.reason,
		missingTables: [...error.missingTables]
	};
	if (error instanceof SkillUploadRequestError) return { type: "skill-upload-request" };
	if (error instanceof GatewayStateOwnerContentionError) return {
		type: "state-owner-contention",
		databasePath: error.databasePath
	};
	if (error instanceof SqliteCoordinatorError) return { type: "coordinator" };
	if (error instanceof OpenClawStateLeaseError) return {
		type: "state-lease",
		leaseCode: error.code
	};
	if (error instanceof OpenClawStateOwnershipMetadataError) return {
		type: "ownership-metadata",
		databasePath: error.databasePath
	};
	if (error instanceof OpenClawStateExternalOwnershipError) return {
		type: "external-ownership",
		databasePath: error.databasePath,
		managerId: error.managerId
	};
	if (error instanceof OpenClawStateOwnershipError) return { type: "ownership" };
	if (error instanceof SqliteSchemaVersionError) return { type: "newer-schema" };
	if (error instanceof OpenClawStateDatabaseSchemaMigrationRequiredError) return {
		type: "state-migration",
		kind: error.kind,
		pathname: error.pathname
	};
	if (error instanceof OpenClawAgentDatabaseMediaMigrationRequiredError) return {
		type: "agent-media-migration",
		pathname: error.pathname,
		schemaVersion: error.schemaVersion
	};
	if (error instanceof StartupMaintenanceRequiredError) return {
		type: "maintenance",
		kind: error.kind
	};
	if (error instanceof RangeError) return { type: "range-error" };
	if (error instanceof SyntaxError) return { type: "syntax-error" };
	if (error instanceof TypeError) return { type: "type-error" };
	return { type: error instanceof AggregateError ? "aggregate" : "error" };
}
function isBlobCode(value) {
	return value === "PLUGIN_BLOB_OPEN_FAILED" || value === "PLUGIN_BLOB_WRITE_FAILED" || value === "PLUGIN_BLOB_READ_FAILED" || value === "PLUGIN_BLOB_CORRUPT" || value === "PLUGIN_BLOB_LIMIT_EXCEEDED" || value === "PLUGIN_BLOB_INVALID_INPUT";
}
function isBlobOperation(value) {
	return value === "open" || value === "register" || value === "lookup" || value === "delete" || value === "entries" || value === "clear" || value === "sweep";
}
function parseIdentity(node) {
	switch (node.type) {
		case "worker-session-already-attached": return typeof node.sessionId === "string" && typeof node.environmentId === "string" ? {
			type: node.type,
			sessionId: node.sessionId,
			environmentId: node.environmentId
		} : void 0;
		case "workspace-alias-repointed": return typeof node.aliasPath === "string" && typeof node.storedWorkspacePath === "string" && typeof node.currentWorkspacePath === "string" ? {
			type: node.type,
			aliasPath: node.aliasPath,
			storedWorkspacePath: node.storedWorkspacePath,
			currentWorkspacePath: node.currentWorkspacePath
		} : void 0;
		case "error":
		case "aggregate":
		case "ownership":
		case "newer-schema":
		case "coordinator":
		case "range-error":
		case "syntax-error":
		case "type-error":
		case "skill-upload-request":
		case "mcp-oauth-corruption": return { type: node.type };
		case "session-metadata": return (node.reason === "schema-missing" || node.reason === "table-missing") && Array.isArray(node.missingTables) && node.missingTables.every((table) => typeof table === "string") ? {
			type: node.type,
			reason: node.reason,
			missingTables: [...node.missingTables]
		} : void 0;
		case "state-owner-contention": return typeof node.databasePath === "string" ? {
			type: node.type,
			databasePath: node.databasePath
		} : void 0;
		case "ownership-metadata": return typeof node.databasePath === "string" ? {
			type: node.type,
			databasePath: node.databasePath
		} : void 0;
		case "external-ownership": return typeof node.databasePath === "string" && typeof node.managerId === "string" ? {
			type: node.type,
			databasePath: node.databasePath,
			managerId: node.managerId
		} : void 0;
		case "plugin-blob": return isBlobCode(node.blobCode) && node.code === node.blobCode && isBlobOperation(node.operation) && (node.path === void 0 || typeof node.path === "string") ? {
			type: node.type,
			blobCode: node.blobCode,
			operation: node.operation,
			...typeof node.path === "string" ? { path: node.path } : {}
		} : void 0;
		case "state-lease": return isOpenClawStateLeaseErrorCode(node.leaseCode) && node.code === node.leaseCode ? {
			type: node.type,
			leaseCode: node.leaseCode
		} : void 0;
		case "maintenance": return isStartupMaintenanceKind(node.kind) ? {
			type: node.type,
			kind: node.kind
		} : void 0;
		case "state-migration": return (node.kind === "agent-databases-composite-primary-key" || node.kind === "audit-events-v2" || node.kind === "legacy-cron-run-logs" || node.kind === "legacy-workshop-review-index") && typeof node.pathname === "string" ? {
			type: node.type,
			kind: node.kind,
			pathname: node.pathname
		} : void 0;
		case "agent-media-migration": return typeof node.pathname === "string" && typeof node.schemaVersion === "number" && Number.isSafeInteger(node.schemaVersion) && node.schemaVersion >= 0 ? {
			type: node.type,
			pathname: node.pathname,
			schemaVersion: node.schemaVersion
		} : void 0;
		default: return;
	}
}
function unreachableErrorNode(node) {
	throw new Error(`Unexpected shared-state worker error node: ${String(node)}`);
}
function createError(node) {
	switch (node.type) {
		case "worker-session-already-attached": return new WorkerSessionAlreadyAttachedError(node.sessionId, node.environmentId);
		case "workspace-alias-repointed": return new WorkspaceAliasRepointedError(node);
		case "session-metadata": return new SessionMetadataUnavailableError(node.reason, void 0, node.missingTables);
		case "error": return new Error(node.message);
		case "range-error": return new RangeError(node.message);
		case "syntax-error": return new SyntaxError(node.message);
		case "type-error": return new TypeError(node.message);
		case "skill-upload-request": return new SkillUploadRequestError(node.message);
		case "mcp-oauth-corruption": return new McpOAuthStoreCorruptionError("", "");
		case "aggregate": return new AggregateError([], node.message);
		case "coordinator": return new SqliteCoordinatorError(node.message);
		case "state-owner-contention": return new GatewayStateOwnerContentionError(node.databasePath);
		case "ownership": return new OpenClawStateOwnershipError(node.message);
		case "ownership-metadata": return new OpenClawStateOwnershipMetadataError(node.databasePath, "");
		case "external-ownership": return new OpenClawStateExternalOwnershipError(node.databasePath, node.managerId);
		case "newer-schema": return new SqliteSchemaVersionError(node.message);
		case "plugin-blob": return new PluginBlobStoreError(node.message, {
			code: node.blobCode,
			operation: node.operation,
			...node.path === void 0 ? {} : { path: node.path }
		});
		case "state-lease": return new OpenClawStateLeaseError(node.message, { code: node.leaseCode });
		case "maintenance": return new StartupMaintenanceRequiredError(node.kind, node.message);
		case "state-migration": return new OpenClawStateDatabaseSchemaMigrationRequiredError(node.kind, node.pathname);
		case "agent-media-migration": return new OpenClawAgentDatabaseMediaMigrationRequiredError(node.pathname, node.schemaVersion);
	}
	return unreachableErrorNode(node);
}
//#endregion
//#region src/state/openclaw-state-worker-error.ts
function isScalar(value) {
	return value === null || typeof value === "string" || typeof value === "boolean" || typeof value === "number" && Number.isFinite(value);
}
function isNativeErrorCode(value) {
	return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 2147483647;
}
function isErrorValue(value, count) {
	if (!isRecord(value) || Object.keys(value).length !== 1) return false;
	if ("ref" in value) return typeof value.ref === "number" && Number.isSafeInteger(value.ref) && value.ref >= 0 && value.ref < count;
	return "value" in value ? isScalar(value.value) : value.undefined === true;
}
function parseNode(value, count) {
	if (!isRecord(value) || typeof value.name !== "string" || typeof value.message !== "string") return;
	const identity = parseIdentity(value);
	if (!identity) return;
	const allowed = /* @__PURE__ */ new Set([
		...Object.keys(identity),
		"name",
		"message",
		"code",
		"errcode",
		"errno",
		"nativeOpen",
		"stateDatabasePath",
		"cause"
	]);
	const errors = [];
	if (identity.type === "aggregate") {
		allowed.add("errors");
		if (!Array.isArray(value.errors)) return;
		for (const entry of value.errors) {
			if (!isErrorValue(entry, count)) return;
			errors.push(entry);
		}
	}
	if (Object.keys(value).some((key) => !allowed.has(key)) || "code" in value && typeof value.code !== "string" && !(typeof value.code === "number" && Number.isFinite(value.code)) || "errcode" in value && !isNativeErrorCode(value.errcode) || "errno" in value && (typeof value.errno !== "number" || !Number.isInteger(value.errno)) || "nativeOpen" in value && value.nativeOpen !== true || "stateDatabasePath" in value && typeof value.stateDatabasePath !== "string" || "cause" in value && !isErrorValue(value.cause, count)) return;
	return {
		...identity,
		name: value.name,
		message: value.message,
		...typeof value.code === "string" || typeof value.code === "number" ? { code: value.code } : {},
		...isNativeErrorCode(value.errcode) ? { errcode: value.errcode } : {},
		...typeof value.errno === "number" ? { errno: value.errno } : {},
		...value.nativeOpen === true ? { nativeOpen: true } : {},
		...typeof value.stateDatabasePath === "string" ? { stateDatabasePath: value.stateDatabasePath } : {},
		...isErrorValue(value.cause, count) ? { cause: value.cause } : {},
		...identity.type === "aggregate" ? { errors } : {}
	};
}
function decodeErrorGraph(value, options) {
	try {
		if (!isRecord(value) || Object.keys(value).some((key) => ![
			"version",
			"root",
			"nodes"
		].includes(key)) || value.version !== 1 || !Array.isArray(value.nodes) || typeof value.root !== "number" || !Number.isSafeInteger(value.root) || value.root < 0 || value.root >= value.nodes.length) return;
		const nodes = [];
		for (const valueNode of value.nodes) {
			const node = parseNode(valueNode, value.nodes.length);
			if (!node) return;
			nodes.push(node);
		}
		const visited = /* @__PURE__ */ new Set();
		const pending = [value.root];
		let canonical = false;
		for (const ref of pending) {
			if (visited.has(ref)) continue;
			visited.add(ref);
			const node = nodes[ref];
			canonical ||= node.stateDatabasePath !== void 0 || node.nativeOpen === true || node.type === "aggregate" && node.name === "OpenClawQuarantineReadCleanupError" || node.type !== "error" && node.type !== "aggregate";
			for (const edge of [...node.cause ? [node.cause] : [], ...node.errors ?? []]) if ("ref" in edge) pending.push(edge.ref);
		}
		if (!canonical && options.includeOrdinary !== true || visited.size !== nodes.length) return;
		const errors = nodes.map(createError);
		const decodeValue = (entry) => "ref" in entry ? errors[entry.ref] : "value" in entry ? entry.value : void 0;
		for (const [index, node] of nodes.entries()) {
			const error = errors[index];
			error.name = node.name;
			error.message = node.message;
			if (node.nativeOpen) markSqliteNativeOpenFailure(error);
			if (node.stateDatabasePath !== void 0) markOpenClawStateDatabaseFailure(error, node.stateDatabasePath);
			for (const [key, propertyValue] of Object.entries({
				...node.code !== void 0 ? { code: node.code } : {},
				...node.errcode !== void 0 ? { errcode: node.errcode } : {},
				...node.errno !== void 0 ? { errno: node.errno } : {},
				...node.cause ? { cause: decodeValue(node.cause) } : {}
			})) Object.defineProperty(error, key, {
				value: propertyValue,
				configurable: true,
				writable: true
			});
			if (error instanceof AggregateError) error.errors = (node.errors ?? []).map(decodeValue);
		}
		const group = Object.freeze({});
		for (const [index, error] of errors.entries()) retainPayload(error, value, index, true, group);
		return {
			errors,
			nodes,
			root: value.root
		};
	} catch {
		return;
	}
}
const retainedPayloadKey = Symbol.for("openclaw.sharedStateWorkerErrorPayload");
function retainPayload(error, payload, node, materialized, group) {
	Object.defineProperty(error, retainedPayloadKey, { value: Object.freeze({
		payload,
		node,
		materialized,
		group
	}) });
}
/** Keep the closed wire graph without binding it to a process-global broker's classes. */
function retainOpenClawStateWorkerErrorPayload(error, payload) {
	retainPayload(error, payload, 0, false, Object.freeze({}));
}
function hydrateOpenClawStateWorkerError(value, options = {}) {
	if (!(value instanceof Error)) return value;
	const groups = /* @__PURE__ */ new Map();
	const nodes = /* @__PURE__ */ new Map();
	const queue = [];
	const add = (error) => {
		const previous = nodes.get(error);
		if (previous) return previous;
		const node = {
			source: error,
			replacement: error,
			parents: /* @__PURE__ */ new Set(),
			changed: false,
			opaque: false
		};
		nodes.set(error, node);
		queue.push(node);
		const retained = Object.getOwnPropertyDescriptor(error, retainedPayloadKey)?.value;
		if (isRecord(retained) && typeof retained.node === "number" && Number.isSafeInteger(retained.node) && retained.node >= 0 && typeof retained.materialized === "boolean" && isRecord(retained.group)) {
			if (!groups.has(retained.group)) groups.set(retained.group, decodeErrorGraph(retained.payload, options));
			const graph = groups.get(retained.group);
			const index = retained.materialized ? retained.node : graph?.root;
			const replacement = index === void 0 ? void 0 : graph?.errors[index];
			const identity = index === void 0 ? void 0 : graph?.nodes[index];
			if (replacement && identity) {
				node.replacement = replacement;
				node.opaque = !retained.materialized;
				node.changed = node.opaque || identifyError(error).type !== identity.type;
			}
		}
		return node;
	};
	const root = add(value);
	for (const node of queue) {
		if (node.opaque) continue;
		const edge = (child) => {
			if (child instanceof Error) add(child).parents.add(node);
		};
		if ("cause" in node.source) {
			node.cause = { value: node.source.cause };
			edge(node.cause.value);
		}
		if (node.source instanceof AggregateError) {
			node.errors = [...node.source.errors];
			node.errors.forEach(edge);
		}
	}
	const affected = queue.filter((node) => node.changed);
	for (const node of affected) for (const parent of node.parents) if (!parent.changed) {
		parent.changed = true;
		affected.push(parent);
	}
	if (!root.changed) return value;
	for (const node of affected) if (node.replacement === node.source) {
		node.replacement = node.source instanceof AggregateError ? new AggregateError([], node.source.message) : new Error(node.source.message);
		Object.setPrototypeOf(node.replacement, Object.getPrototypeOf(node.source));
	}
	const replace = (child) => {
		const node = child instanceof Error ? nodes.get(child) : void 0;
		return node?.changed ? node.replacement : child;
	};
	for (const node of affected) {
		if (node.opaque) continue;
		const descriptors = Object.getOwnPropertyDescriptors(node.source);
		Reflect.deleteProperty(descriptors, retainedPayloadKey);
		if (node.cause) descriptors.cause = {
			configurable: descriptors.cause?.configurable ?? true,
			enumerable: descriptors.cause?.enumerable ?? false,
			writable: descriptors.cause?.writable ?? true,
			value: replace(node.cause.value)
		};
		if (node.errors) descriptors.errors = {
			configurable: descriptors.errors?.configurable ?? true,
			enumerable: descriptors.errors?.enumerable ?? false,
			writable: descriptors.errors?.writable ?? true,
			value: node.errors.map(replace)
		};
		Object.defineProperties(node.replacement, descriptors);
	}
	return root.replacement;
}
Object.freeze([
	"activity",
	"agents",
	"ai-agents",
	"appearance",
	"approve",
	"apps",
	"ask",
	"automation",
	"automations",
	"channels",
	"chat",
	"communications",
	"config",
	"cron",
	"custodian",
	"dashboard",
	"dashboards",
	"debug",
	"focus",
	"infrastructure",
	"lobsterdex",
	"logs",
	"mcp",
	"meetings",
	"memory-import",
	"model-providers",
	"model-setup",
	"new",
	"nodes",
	"plugin",
	"plugins",
	"portals",
	"profile",
	"sessions",
	"settings",
	"share",
	"skills",
	"systems",
	"terminal",
	"usage",
	"workboard",
	"worktrees"
]);
//#endregion
//#region src/routing/session-key.ts
/** Legacy on-disk identity used only by doctor/migration and their fixtures. */
const LEGACY_IMPLICIT_AGENT_ID = "main";
(/* @__PURE__ */ new Map()).keys();
//#endregion
//#region src/infra/sqlite-worker-state-context.ts
function captureSqliteWorkerStateContext(context) {
	return {
		environment: { ...context.environment },
		...context.initializationEnvironment ? { initializationEnvironment: { ...context.initializationEnvironment } } : {},
		...context.initializationAgentPaths ? { initializationAgentPaths: [...context.initializationAgentPaths] } : {},
		existingSchemaPath: context.existingSchemaPath
	};
}
/** Charge captured initialization facts together with the request bytes retained by admission. */
function sqliteWorkerRequestBytes(input, context, preparation) {
	const agentPathBytes = context?.initializationAgentPaths?.reduce((bytes, agentPath) => bytes + Buffer.byteLength(agentPath, "utf8"), 0) ?? 0;
	return [context?.environment, context?.initializationEnvironment].reduce((bytes, environment) => Object.entries(environment ?? {}).reduce((total, [key, value]) => total + Buffer.byteLength(key, "utf8") + Buffer.byteLength(value ?? "", "utf8"), bytes), input.byteLength + (preparation?.byteLength ?? 0) + agentPathBytes);
}
const stateContexts = resolveGlobalSingleton(Symbol.for("openclaw.sqliteWorkerStateContext"), () => new AsyncLocalStorage());
/** Only cold writable opens need this factory's prior-existence constraint. */
function getSqliteWorkerExistingDatabaseIdentity(databasePath) {
	const existing = stateContexts.getStore()?.existingDatabase;
	return existing?.databasePath === databasePath ? existing.identity : void 0;
}
//#endregion
//#region src/infra/sqlite-worker-broker-admission.ts
function validateSqliteWorkerDatabaseLocator(databasePath) {
	const basename = path.basename(databasePath);
	if (!databasePath || databasePath.startsWith("file:") || basename === ":memory:" || basename === "incognito-openclaw-agent.sqlite") throw new Error("SQLite worker stores require a file-backed filesystem path; in-memory and incognito databases are not supported");
}
function captureSqliteWorkerOpen(options, stateContext, assertCurrent, custody = {}) {
	const { createAdmission, preparation, ...native } = custody;
	const inCaller = createAdmission ? AsyncLocalStorage.snapshot() : void 0;
	const ownedAdmission = options.admission;
	const assertOpening = ownedAdmission ? () => {
		assertCurrent?.();
		ownedAdmission.assertCurrent();
	} : assertCurrent;
	const databasePath = path.resolve(options.databasePath);
	if (options.admission && (!options.existingOnly || !options.admission.identity.startsWith("file:"))) throw new Error("Owned SQLite Worker admission requires an existing physical identity");
	assertOpening?.();
	const carrier = resolveRuntimeProcessEntrypointUrl("sqliteStore");
	const carrierUrl = options.runtimeGeneration?.resolve(carrier) ?? carrier;
	return {
		...native,
		maintenanceScope: custody.maintenanceScope ?? getOpenClawDatabaseMaintenanceScope(),
		...preparation !== void 0 ? { preparation: serialize(preparation) } : {},
		runtimeGeneration: options.runtimeGeneration,
		carrierUrl,
		createAdmission: createAdmission && inCaller ? (operation) => inCaller(createAdmission, operation) : void 0,
		assertCurrent: assertOpening,
		...options.admission ? {
			expectedIdentity: options.admission.identity,
			createOpenAdmission: () => {
				let granted = false;
				return {
					nativeLocations: [databasePath],
					admission: createSqliteWorkerOperationAdmission((request, grant) => {
						if (granted || request.stage !== "open") throw new Error("SQLite Worker open admission requested out of order");
						assertOpening();
						if (!grant()) throw new Error("SQLite Worker open admission expired");
						granted = true;
					})
				};
			}
		} : {},
		moduleUrl: new URL(options.moduleUrl),
		databasePath,
		input: serialize(options.input),
		existingOnly: options.existingOnly === true,
		...stateContext ? { stateContext: captureSqliteWorkerStateContext(stateContext) } : {}
	};
}
function validateSqliteWorkerModuleUrl(moduleUrl) {
	if (moduleUrl.protocol !== "file:" || moduleUrl.search || moduleUrl.hash) throw new Error("SQLite worker backend must be a static local module URL");
}
async function prepareSqliteWorkerDatabaseAdmission(options) {
	validateSqliteWorkerModuleUrl(options.moduleUrl);
	const databasePath = path.resolve(options.databasePath);
	const inputHash = createHash("sha256").update(options.input).digest("hex");
	const identity = await readDatabasePathIdentity(databasePath);
	options.assertCurrent?.();
	if (options.expectedIdentity && identity.key !== options.expectedIdentity) throw new Error("SQLite Worker path no longer matches its borrowed native owner");
	return {
		databasePath,
		inputHash,
		identity
	};
}
function captureSqliteWorkerAdmissionPaths(databasePath, identity, actors) {
	const admittedPaths = /* @__PURE__ */ new Set([databasePath, identity.canonicalPath]);
	if ([...actors].some((entry) => entry.key !== identity.key && [...admittedPaths].some((pathname) => entry.pathReferences.has(pathname)))) throw new Error("SQLite database pathname changed while its worker owner is active; close the existing store first");
	return admittedPaths;
}
function retainSqliteWorkerAdmissionCleanup(actor, retain, close) {
	retain?.({
		get pending() {
			return actor.references === 0 && actor.cleanupState === "pending";
		},
		close: () => actor.references === 0 ? close() : Promise.resolve()
	});
}
function retainSqliteWorkerAdmissionPathReferences(actor, paths) {
	for (const pathname of paths) actor.pathReferences.set(pathname, (actor.pathReferences.get(pathname) ?? 0) + 1);
	return () => {
		for (const pathname of paths) {
			const references = actor.pathReferences.get(pathname) ?? 0;
			if (references > 1) actor.pathReferences.set(pathname, references - 1);
			else actor.pathReferences.delete(pathname);
		}
	};
}
async function resolveOpenedSqliteWorkerIdentity(databasePath, previous, isOwnedElsewhere) {
	const openedIdentity = await readDatabasePathIdentity(databasePath);
	const physical = openedIdentity.key;
	if (openedIdentity.canonicalPath !== previous.canonicalPath) throw new Error("SQLite database canonical pathname changed during open");
	if (!physical.startsWith("file:")) throw new Error("SQLite worker backend did not establish its database file");
	if (isOwnedElsewhere(physical)) throw new Error("SQLite database identity collided with an existing worker owner during open");
	if (previous.key.startsWith("file:") && physical !== previous.key) throw new Error("SQLite database file identity changed during open");
	return physical;
}
function findUnclaimedSharedStateActors(actors, databasePath) {
	const pathname = path.resolve(databasePath);
	return [...actors].filter((actor) => actor.stateContext !== void 0 && actor.references === 0 && actor.cleanupState === "pending" && actor.databasePath === pathname);
}
async function closeUnclaimedSharedStateActors(actors, databasePath, close) {
	const errors = (await Promise.allSettled(findUnclaimedSharedStateActors(actors, databasePath).map(close))).flatMap((result) => result.status === "rejected" ? [result.reason] : []);
	if (errors.length) throw new AggregateError(errors, "SQLite worker unclaimed cleanup failed", { cause: errors[0] });
}
async function resolveSqliteWorkerModuleUrl(sourceUrl) {
	const modulePath = await realpath(fileURLToPath(sourceUrl));
	const moduleUrl = pathToFileURL(modulePath).href;
	if (!/\.[cm]?[jt]s$/.test(modulePath) || !(await stat(modulePath)).isFile()) throw new Error("SQLite worker backend must identify a JavaScript or TypeScript file");
	return {
		modulePath,
		moduleUrl
	};
}
function assertSqliteWorkerActorStateContext(actor, stateContext) {
	if (actor.stateContext?.existingSchemaPath !== stateContext?.existingSchemaPath) throw new Error("Shared-state worker schema policy changed; close its actor first");
}
function assertSqliteWorkerActorReusable(actor, moduleUrl, inputHash, stateContext) {
	if (actor.slot.failed) throw actor.slot.failed;
	if (actor.moduleUrl !== moduleUrl || actor.inputHash !== inputHash) throw new Error("SQLite database already belongs to another worker backend");
	assertSqliteWorkerActorStateContext(actor, stateContext);
}
function prepareSqliteWorkerActorContext(actor, job) {
	const { request } = job;
	const stateContext = request.stateContext ?? actor?.stateContext;
	if (actor && request.type !== "close") assertStateDatabaseAccessAllowed(actor.stateDatabasePath ?? actor.databasePath, { maintenanceScope: job.maintenanceScope });
	if (actor && stateContext) {
		assertSqliteWorkerActorStateContext(actor, stateContext);
		request.stateDatabasePath = actor.stateDatabasePath ?? actor.databasePath;
		request.stateContext = stateContext;
	}
}
//#endregion
//#region node-compile-cache.mjs
const MAX_BYTES = 536870912;
const MAX_AGE_MS = 6048e5;
const MAINTENANCE_INTERVAL_MS = 36e5;
const BUILD_MARKER_RE = /^(?:[a-f0-9]{16}|\d+-\d+|no-package-json|build-[A-Za-z0-9._-]+)$/;
const sanitize = (value) => {
	const segment = value.replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^_+|_+$/g, "");
	return segment && segment !== "." && segment !== ".." ? segment : "unknown";
};
function resolveSafeNodeCompileCacheDirectory(directory) {
	if (process.platform === "win32" && path.resolve(directory).length > 200) {
		process.stderr.write("[openclaw] Compile cache disabled: Windows cache path exceeds 200 characters.\n");
		return;
	}
	return directory;
}
async function maintain(directory) {
	const root = path.dirname(path.dirname(directory));
	const version = path.basename(path.dirname(directory));
	if (path.basename(root) !== "openclaw" || sanitize(version) !== version || !BUILD_MARKER_RE.test(path.basename(directory))) return;
	const now = Date.now();
	const previous = await fsPromises.lstat(root).catch(() => void 0);
	for (const target of [
		root,
		path.dirname(directory),
		directory
	]) {
		const stat = target === root ? previous : await fsPromises.lstat(target).catch(() => void 0);
		if (stat && !stat.isDirectory()) return;
	}
	await fsPromises.mkdir(directory, { recursive: true });
	let retired = false;
	for (const entry of await fsPromises.readdir(root, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const versionRoot = path.join(root, entry.name);
		for (const build of await fsPromises.readdir(versionRoot, { withFileTypes: true })) {
			const candidate = path.join(versionRoot, build.name);
			if (build.isDirectory() && candidate !== directory) {
				await fsPromises.rm(candidate, {
					recursive: true,
					force: true
				});
				retired = true;
			}
		}
		if (versionRoot !== path.dirname(directory)) await fsPromises.rmdir(versionRoot).catch(() => {});
	}
	if (!retired && previous && now - previous.mtimeMs < MAINTENANCE_INTERVAL_MS) return;
	await fsPromises.utimes(root, new Date(now), new Date(now));
	const files = [];
	let bytes = 0;
	async function visit(dir) {
		for (const entry of await fsPromises.readdir(dir, { withFileTypes: true })) {
			const file = path.join(dir, entry.name);
			if (entry.isDirectory()) await visit(file);
			else if (entry.isFile()) {
				const stat = await fsPromises.lstat(file);
				bytes += stat.size;
				files.push({
					file,
					size: stat.size,
					mtimeMs: stat.mtimeMs
				});
			}
		}
	}
	await visit(directory);
	files.sort((left, right) => left.mtimeMs - right.mtimeMs);
	for (const file of files) if (bytes > MAX_BYTES || now - file.mtimeMs > MAX_AGE_MS) {
		await fsPromises.unlink(file.file);
		bytes -= file.size;
	}
}
if (!isMainThread && typeof workerData?.openclawCompileCacheDirectory === "string") maintain(workerData.openclawCompileCacheDirectory).catch(() => {});
//#endregion
//#region src/infra/node-compile-cache-env.ts
const COMPILE_CACHE_BASE_KEY = Symbol.for("openclaw.nodeCompileCacheBase");
function compileCacheOwner() {
	return resolveGlobalSingleton(COMPILE_CACHE_BASE_KEY, () => ({}));
}
function resolveNodeCompileCacheEnv(env = process.env) {
	if (env.NODE_DISABLE_COMPILE_CACHE !== void 0) return env;
	const directory = env.NODE_COMPILE_CACHE ?? compileCacheOwner().baseDirectory;
	if (directory && !resolveSafeNodeCompileCacheDirectory(directory)) {
		const disabled = {
			...env,
			NODE_DISABLE_COMPILE_CACHE: "1"
		};
		delete disabled.NODE_COMPILE_CACHE;
		return disabled;
	}
	if (env.NODE_COMPILE_CACHE !== void 0) return env;
	return directory ? {
		...env,
		NODE_COMPILE_CACHE: directory
	} : env;
}
//#endregion
//#region src/infra/sqlite-worker-transfer.ts
const SQLITE_WORKER_TRANSFER_FRAME_BYTES = 8388608;
/** One owned result cursor; callers supply records and any associated cleanup. */
function createSqliteWorkerTransferOwner() {
	let nextId = 0;
	let current;
	const cleanup = (transfer) => {
		const errors = [];
		if (!transfer.iteratorClosed) try {
			transfer.iterator.return?.();
			transfer.iteratorClosed = true;
		} catch (error) {
			errors.push(error);
		}
		if (!transfer.cleaned) try {
			transfer.cleanup?.();
			transfer.cleaned = true;
		} catch (error) {
			errors.push(error);
		}
		if (errors.length === 1) throw errors[0];
		if (errors.length) throw new AggregateError(errors, "SQLite read transfer cleanup failed", { cause: errors[0] });
	};
	const cancel = () => {
		if (current) {
			cleanup(current);
			current = void 0;
		}
	};
	const requireTransfer = (id) => {
		if (!current || current.id !== id) throw new Error("SQLite read transfer is no longer active");
		return current;
	};
	return {
		start(iterator, options) {
			if (current) throw new Error("The preceding SQLite read transfer was not released");
			current = {
				id: ++nextId,
				iterator,
				cleanup: options.cleanup,
				iteratorClosed: false,
				cleaned: false,
				counts: new Map(options.kinds.map((kind) => [kind, 0])),
				sequence: 0,
				finished: false
			};
			return {
				id: current.id,
				kinds: [...current.counts.keys()]
			};
		},
		next(id) {
			const transfer = requireTransfer(id);
			if (transfer.finished) throw new Error("SQLite read transfer has already reached its end");
			if (transfer.record && transfer.record.offset === transfer.record.bytes.byteLength) transfer.record = void 0;
			if (!transfer.record) {
				const next = transfer.iterator.next();
				if (next.done) {
					cleanup(transfer);
					transfer.finished = true;
					return {
						id,
						sequence: transfer.sequence++,
						done: true,
						counts: [...transfer.counts]
					};
				}
				const { kind } = next.value;
				const count = transfer.counts.get(kind);
				if (count === void 0) throw new Error("SQLite read transfer returned an unexpected record kind");
				transfer.record = {
					kind,
					bytes: "serialized" in next.value ? next.value.serialized : serialize(next.value.value),
					offset: 0
				};
				transfer.counts.set(kind, count + 1);
			}
			const record = transfer.record;
			const offset = record.offset;
			const end = Math.min(record.bytes.byteLength, offset + SQLITE_WORKER_TRANSFER_FRAME_BYTES);
			record.offset = end;
			return {
				id,
				sequence: transfer.sequence++,
				done: false,
				kind: record.kind,
				recordBytes: record.bytes.byteLength,
				offset,
				recordDone: end === record.bytes.byteLength,
				bytes: new Uint8Array(record.bytes.subarray(offset, end))
			};
		},
		end(id) {
			if (!requireTransfer(id).finished) throw new Error("SQLite read transfer ended before its complete result");
			cancel();
		},
		cancel,
		close: cancel
	};
}
/** Reassembles one transfer; its caller owns transport completion and cancellation. */
function createSqliteWorkerTransferReceiver(handle, consume) {
	const counts = new Map(handle.kinds.map((kind) => [kind, 0]));
	let sequence = 0;
	let finished = false;
	let record;
	return { accept(frame) {
		try {
			if (finished || frame.id !== handle.id || frame.sequence !== sequence++) throw new Error("SQLite read transfer frame is out of order");
			if (frame.done) {
				if (record || frame.counts.length !== counts.size || frame.counts.some(([kind, count]) => counts.get(kind) !== count) || new Set(frame.counts.map(([kind]) => kind)).size !== counts.size) throw new Error("SQLite read transfer ended with an incomplete result");
				finished = true;
				return frame.counts;
			}
			const count = counts.get(frame.kind);
			if (count === void 0 || !Number.isSafeInteger(frame.recordBytes) || frame.recordBytes < 1 || !Number.isSafeInteger(frame.offset) || frame.offset < 0 || frame.bytes.byteLength < 1 || frame.bytes.byteLength > 8388608) throw new Error("SQLite read transfer returned an invalid frame");
			if (!record) {
				if (frame.offset !== 0) throw new Error("SQLite read transfer omitted the start of a record");
				record = {
					kind: frame.kind,
					bytes: new Uint8Array(frame.recordBytes),
					offset: 0
				};
			}
			const end = frame.offset + frame.bytes.byteLength;
			if (record.kind !== frame.kind || record.bytes.byteLength !== frame.recordBytes || record.offset !== frame.offset || end > frame.recordBytes || frame.recordDone !== (end === frame.recordBytes)) throw new Error("SQLite read transfer returned a discontinuous record");
			record.bytes.set(frame.bytes, frame.offset);
			record.offset = end;
			if (frame.recordDone) {
				const value = deserialize(record.bytes);
				const kind = record.kind;
				record = void 0;
				consume({
					kind,
					value
				});
				counts.set(kind, count + 1);
			}
			return;
		} catch (error) {
			record = void 0;
			finished = true;
			throw error;
		}
	} };
}
//#endregion
//#region src/infra/sqlite-worker-broker-reply.ts
function dispatchSqliteWorkerJob(slot, job, onRejected) {
	const actor = [...slot.actors].find((candidate) => candidate.id === job.request.actor);
	const assertCurrentJob = () => {
		if (slot.failed || slot.current !== job) throw slot.failed ?? new SqliteWorkerError("SQLite worker job is no longer current", "closed");
	};
	const assertDispatchable = () => {
		if (!job.nativeDispatched) job.signal?.throwIfAborted();
		job.assertCurrent?.();
		assertCurrentJob();
	};
	try {
		assertDispatchable();
		prepareSqliteWorkerActorContext(actor, job);
		job.request.operationAdmission = prepareSqliteWorkerOperationAdmission(job, actor, assertDispatchable, assertCurrentJob);
		const request = prepareSqliteWorkerRequest(job);
		assertDispatchable();
		job.nativeDispatched = true;
		job.detach();
		if (job.dispatchState) job.dispatchState.dispatched = true;
		job.requestPosted = true;
		slot.worker.postMessage(request, request.operationAdmission ? [request.operationAdmission] : []);
	} catch (error) {
		onRejected(error, job.requestPosted === true);
	}
}
function prepareSqliteWorkerOperationAdmission(job, actor, assertDispatchable, assertCurrentJob) {
	const databasePath = job.request.stateDatabasePath ?? actor?.databasePath;
	if (!job.createAdmission && !databasePath) return;
	const settlement = createDeferredCore();
	job.settleNative = settlement.resolve;
	const retained = job.createAdmission ? job.createAdmission({ settled: settlement.promise }) : {
		admission: createSqliteWorkerOperationAdmission(() => {
			throw new SqliteWorkerError("SQLite domain operation requires its own admission", "closed");
		}),
		nativeLocations: databasePath ? [databasePath] : []
	};
	try {
		if (databasePath) {
			let schemaLease;
			const assertAccess = () => {
				assertCurrentJob();
				job.maintenanceScope?.assertAdmission();
				assertStateDatabaseAccessAllowed(databasePath, {
					maintenanceScope: job.maintenanceScope,
					schemaLease
				});
			};
			retained.admission.bindDatabaseAuthority({
				databasePath,
				assertRequest: assertDispatchable,
				assertAccess,
				acquireSchema() {
					assertAccess();
					const acquire = () => acquireStateDatabaseSchemaLease(databasePath);
					const lease = job.maintenanceScope ? job.maintenanceScope.run(acquire) : acquire();
					schemaLease = lease;
					job.maintenanceScope?.own(lease, "shared-resources", () => lease.release());
					return {
						assertCurrent() {
							assertAccess();
							lease.assertCurrent();
						},
						release: () => lease.release()
					};
				}
			});
		}
	} catch (error) {
		retained.admission.finish();
		throw error;
	}
	job.operationAdmission = {
		admission: retained.admission,
		releaseService: retainSqliteWriteAdmissionService([
			...retained.nativeLocations,
			...databasePath ? [databasePath] : [],
			...actor?.pathReferences.keys() ?? []
		], () => retained.admission.service())
	};
	return retained.admission.port;
}
function prepareSqliteWorkerRequest(job) {
	if (job.request.type !== "execute" || job.request.input.byteLength <= 33554432) return job.request;
	const { input, ...request } = job.request;
	const producer = createSqliteWorkerTransferOwner();
	const transfer = producer.start([{
		kind: "command",
		serialized: input
	}].values(), { kinds: ["command"] });
	job.inputTransfer = {
		id: transfer.id,
		producer
	};
	job.request.input = /* @__PURE__ */ new Uint8Array();
	return {
		...request,
		type: "execute-start",
		transfer
	};
}
function decodeSqliteWorkerReplyValue(job, reply) {
	if (reply.input === "next") {
		const transfer = job.inputTransfer;
		if (!transfer || reply.transfer) throw new Error("SQLite worker requested unexpected command input");
		const frame = transfer.producer.next(transfer.id);
		const input = serialize(frame);
		if (input.byteLength > 33554432) throw new Error("SQLite worker input frame exceeds the transport byte limit");
		if (frame.done) {
			transfer.producer.end(transfer.id);
			job.inputTransfer = void 0;
		}
		return {
			type: "continue",
			request: {
				type: "execute-frame",
				id: job.request.id,
				actor: job.request.actor,
				input
			}
		};
	}
	if (job.inputTransfer) throw new Error("SQLite worker completed before receiving its command input");
	let value;
	if (reply.transfer === "start") {
		const handle = deserialize(reply.value);
		if (job.request.type !== "execute" || job.transfer || handle.kinds.length !== 1 || handle.kinds[0] !== "result") throw new Error("SQLite worker returned an unexpected result transfer");
		const transfer = {
			id: handle.id,
			value: void 0,
			receiver: createSqliteWorkerTransferReceiver(handle, (record) => {
				transfer.value = record.value;
			})
		};
		job.transfer = transfer;
	} else if (reply.transfer === "frame") {
		const transfer = job.transfer;
		if (!transfer) throw new Error("SQLite worker returned an unexpected result frame");
		const frame = deserialize(reply.value);
		const counts = transfer.receiver.accept(frame);
		if (counts) {
			if (counts.length !== 1 || counts[0]?.[1] !== 1) throw new Error("SQLite worker returned an incomplete result transfer");
			value = transfer.value;
			job.transfer = void 0;
		}
	} else {
		if (job.transfer) throw new Error("SQLite worker ended its result transfer without completion");
		value = deserialize(reply.value);
	}
	return job.transfer ? {
		type: "continue",
		request: {
			type: "result-next",
			id: job.request.id,
			actor: job.request.actor,
			transferId: job.transfer.id
		}
	} : {
		type: "complete",
		value
	};
}
function decodeSqliteWorkerReplyError(job, error) {
	const failure = Object.assign(new Error(error.message), {
		name: error.name,
		...error.code === void 0 ? {} : { code: error.code }
	});
	if (job.request.stateContext && error.code !== "outcome-unknown" && error.sharedState) retainOpenClawStateWorkerErrorPayload(failure, error.sharedState);
	return failure;
}
function decodeSqliteWorkerCleanupError(payload) {
	const failure = /* @__PURE__ */ new Error("SQLite worker native cleanup failed");
	retainOpenClawStateWorkerErrorPayload(failure, payload);
	return hydrateOpenClawStateWorkerError(failure, { includeOrdinary: true });
}
function receiveSqliteWorkerReply(slot, reply, owner) {
	const job = slot.current;
	if (!job || reply.id !== job.request.id) {
		owner.fail(/* @__PURE__ */ new Error("SQLite worker returned an unexpected response"));
		return;
	}
	if (!reply.ok) {
		if (reply.cleanupFailure && job.nativeDispatched && !reply.retire) {
			const admission = job.operationAdmission?.admission;
			const original = (admission?.failureSource === "domain" && !reply.admissionRefused ? void 0 : admission?.failure) ?? decodeSqliteWorkerReplyError(job, reply.error);
			owner.fail(decodeSqliteWorkerCleanupError(reply.cleanupFailure), void 0, void 0, { error: original });
			return;
		}
		if (reply.openNotEntered && job.request.type === "open" && job.dispatchState) job.dispatchState.openNotEntered = true;
		const error = decodeSqliteWorkerReplyError(job, reply.error);
		if (job.request.type === "open" && reply.openNotEntered && !reply.retire) {
			slot.current = void 0;
			const refusal = job.operationAdmission?.admission.failure ?? error;
			owner.finish(job, refusal, void 0, {
				kind: "not-entered",
				error: refusal
			});
			owner.dispatch();
			return;
		}
		if (job.request.type !== "execute" || reply.retire) {
			const refusedOpen = job.request.type === "open" && reply.openOutcome === "refused-before-agent-open";
			const failure = refusedOpen || job.request.type === "open" && reply.admissionRefused ? toErrorObject(job.operationAdmission?.admission.failure ?? error, error.message) : error;
			owner.fail(failure, job.request.type !== "execute" ? failure : void 0, refusedOpen ? "refused-before-agent-open" : void 0);
			return;
		}
		slot.current = void 0;
		owner.finish(job, job.operationAdmission?.admission.failure ?? error);
		owner.dispatch();
		return;
	}
	let value;
	try {
		const result = decodeSqliteWorkerReplyValue(job, reply);
		if (result.type === "continue") {
			slot.worker.postMessage(result.request, []);
			return;
		}
		value = result.value;
	} catch (error) {
		owner.fail(error);
		return;
	}
	if (reply.cleanupFailure) {
		const admission = job.operationAdmission?.admission;
		const failure = admission?.failureSource === "domain" ? void 0 : admission?.failure;
		owner.fail(decodeSqliteWorkerCleanupError(reply.cleanupFailure), void 0, void 0, failure === void 0 ? { value } : { error: failure });
		return;
	}
	slot.current = void 0;
	if (job.request.type === "close") owner.finish(job, void 0, value, void 0, reply.closeReceipt);
	else {
		const admission = job.operationAdmission?.admission;
		owner.finish(job, admission?.failureSource === "domain" ? void 0 : admission?.failure, value);
	}
	owner.dispatch();
}
/** Keep the original failure and outcome classification when retirement also fails. */
function withSqliteWorkerCleanupFailure(failure, cleanupError) {
	if (cleanupError === void 0) return failure;
	const combined = new AggregateError([failure, cleanupError], "SQLite worker failure and cleanup failed", { cause: failure });
	return retainSqliteWorkerErrorCode(combined, failure);
}
function settleFailedSqliteWorkerJobs({ queuedError, current, queued, error, currentError, completed, openOutcome, retire, finish }) {
	const retirement = retire();
	const finishFailed = (retired, cleanupError) => {
		if (current && completed) {
			process.emitWarning(new Error("SQLite worker operation completed before native cleanup failed", { cause: withSqliteWorkerCleanupFailure(error, cleanupError) }));
			finish(current, "error" in completed ? completed.error : void 0, "value" in completed ? completed.value : void 0, retired ? { kind: "completed" } : {
				kind: "unknown",
				error: cleanupError ?? error
			});
		} else if (current) {
			const failure = currentError ?? new SqliteWorkerError(`SQLite worker stopped before its result was received: ${error.message}`, current.request.type === "execute" && current.nativeDispatched ? "outcome-unknown" : "unavailable");
			if (!currentError) failure.cause = error;
			finish(current, withSqliteWorkerCleanupFailure(failure, cleanupError), void 0, current.nativeDispatched ? retired && openOutcome === "refused-before-agent-open" ? { kind: "completed" } : {
				kind: "unknown",
				error: currentError ?? error
			} : {
				kind: "not-entered",
				error
			});
		}
		for (const job of queued) finish(job, withSqliteWorkerCleanupFailure(queuedError, cleanupError));
	};
	retirement.then(() => finishFailed(!current?.operationAdmission?.admission.cleanupFailures.length), (cleanupError) => finishFailed(false, cleanupError));
}
function settleSqliteWorkerJob(job, error, value, settlement) {
	job.settleNative?.(settlement ?? (job.nativeDispatched ? { kind: "completed" } : {
		kind: "not-entered",
		error
	}));
	job.operationAdmission?.admission.finish();
	job.operationAdmission?.releaseService();
	let failure = error;
	const admissionCleanupFailures = job.operationAdmission?.admission.cleanupFailures ?? [];
	if (admissionCleanupFailures.length > 0) {
		const cleanupError = new AggregateError(admissionCleanupFailures, "SQLite worker admission cleanup failed");
		if (error === void 0 && job.request.type === "execute") process.emitWarning(cleanupError);
		else failure = error === void 0 ? cleanupError : withSqliteWorkerCleanupFailure(toErrorObject(error, "SQLite worker failed"), cleanupError);
	}
	job.inputTransfer?.producer.cancel();
	job.inputTransfer = void 0;
	job.transfer = void 0;
	job.detach();
	if (failure !== void 0) job.reject(failure);
	else job.resolve(value);
}
//#endregion
//#region src/infra/sqlite-worker-broker-lifecycle.ts
const runOutsideCaller = AsyncLocalStorage.snapshot();
/** The broker retains these maps; this owner drains clients before native close custody. */
function createSqliteWorkerLifecycle({ actors, slots, stores, enqueueClose, fail }) {
	function createSlot(options, borrowedGenerationSlot, createReplyOwner) {
		if (process.versions.bun && process.platform === "darwin") ensureSqliteLibrarySelected();
		options.assertCurrent?.();
		const worker = runOutsideCaller(() => createCpuTrackedWorker(options.carrierUrl, {
			resourceLimits: { maxOldGenerationSizeMb: 512 },
			env: resolveNodeCompileCacheEnv(),
			execArgv: resolveRuntimeWorkerThreadExecArgv(options.carrierUrl)
		}));
		const exited = createDeferredCore();
		const slot = {
			runtimeGeneration: options.runtimeGeneration,
			...borrowedGenerationSlot ? { borrowedGenerationSlot: true } : {},
			worker,
			receiveReply: (reply) => receiveSqliteWorkerReply(slot, reply, replyOwner),
			actors: /* @__PURE__ */ new Set(),
			queue: [],
			exit: exited.promise,
			exited: false,
			pendingOpens: 1
		};
		const replyOwner = createReplyOwner(slot);
		slots.add(slot);
		worker.on("message", (reply) => slot.receiveReply(reply));
		worker.on("error", (error) => fail(slot, error));
		worker.on("messageerror", (error) => fail(slot, error));
		worker.once("exit", (code) => {
			slot.exited = true;
			for (const actor of slot.actors) {
				actor.backendClosed = true;
				actor.markNativeStopped();
			}
			fail(slot, /* @__PURE__ */ new Error(`SQLite worker exited with code ${code}`));
			slots.delete(slot);
			exited.resolve();
		});
		worker.unref();
		return slot;
	}
	async function closeGeneration(generation) {
		const errors = (await Promise.allSettled([...actors.values()].filter((actor) => actor.runtimeGeneration === generation).map((actor) => retireActor(actor)))).flatMap((result) => result.status === "rejected" ? [result.reason] : []);
		if (errors.length) throw new AggregateError(errors, "Retained SQLite worker cleanup failed");
		await Promise.all([...slots].filter((slot) => slot.runtimeGeneration === generation).map((slot) => retireEmpty(slot)));
	}
	function releaseActorReference(actor) {
		actor.references -= 1;
		if (!actor.references) actor.onReferencesDrained?.();
	}
	async function rejectSlotAdmission(slot, error) {
		slot.pendingOpens -= 1;
		try {
			await retireEmpty(slot);
		} catch (cleanupError) {
			throw createSqliteLifecycleAggregateError([error, cleanupError], "SQLite slot admission and cleanup failed", error);
		}
		throw error;
	}
	function retireActor(identity) {
		const actor = [...actors.values()].find((entry) => entry === identity);
		if (!actor) return Promise.resolve();
		if (actor.retirement) return actor.retirement;
		actor.retirementRequested = true;
		const drained = createDeferredCore();
		actor.onReferencesDrained = drained.resolve;
		if (!actor.references) drained.resolve();
		const clients = [...stores.values()].filter((client) => client.actor === actor);
		actor.retirement = (async () => {
			const results = await Promise.allSettled(clients.map((client) => client.close()));
			await drained.promise;
			const errors = results.flatMap((result) => result.status === "rejected" ? [result.reason] : []);
			if (!errors.length) try {
				await closeActor(actor);
			} catch (error) {
				errors.push(error);
			}
			if (errors.length) throw new AggregateError(errors, "SQLite actor retirement failed", { cause: errors[0] });
		})().finally(() => {
			actor.retirement = void 0;
			actor.onReferencesDrained = void 0;
		});
		return actor.retirement;
	}
	function closeActor(actor, maintenanceScope) {
		if (actor.cleanupState === "complete") return Promise.resolve();
		if (actor.closing) return actor.closing;
		actor.cleanupState = "pending";
		actor.closing = (async () => {
			const errors = [];
			if (!actor.backendClosed) try {
				await enqueueClose(actor, maintenanceScope);
				actor.backendClosed = true;
				if (!process.versions.bun) actor.markNativeStopped();
			} catch (error) {
				errors.push(error);
				fail(actor.slot, error instanceof Error ? error : new Error(String(error)));
				await actor.slot.exit;
			}
			try {
				if (process.versions.bun || actor.slot.failed || !actor.slot.pendingOpens && [...actor.slot.actors].every((entry) => entry.backendClosed)) await retire(actor.slot);
			} catch (error) {
				errors.push(error);
			} finally {
				forget(actor);
			}
			throwSqliteLifecycleErrors(errors, "SQLite worker actor cleanup failed");
		})().finally(() => {
			actor.closing = void 0;
		});
		return actor.closing;
	}
	function forget(actor) {
		if (actors.get(actor.key) === actor) actors.delete(actor.key);
		actor.slot.actors.delete(actor);
		actor.cleanupState = "complete";
	}
	async function retireEmpty(slot) {
		if (!slot.actors.size && !slot.pendingOpens) await retire(slot);
	}
	function retire(slot) {
		slot.retiring ??= (async () => {
			const errors = [];
			if (!slot.exited) try {
				await slot.worker.terminate();
			} catch (error) {
				errors.push(error);
			}
			await slot.exit;
			throwSqliteLifecycleErrors(errors, "SQLite worker retirement cleanup failed");
		})().finally(() => {
			slot.retiring = void 0;
		});
		return slot.retiring;
	}
	return {
		createSlot,
		closeGeneration,
		releaseActorReference,
		rejectSlotAdmission,
		retireActor,
		closeActor,
		forget,
		retireEmpty,
		retire
	};
}
//#endregion
//#region src/infra/sqlite-worker-client.ts
function runSqliteWorkerClientOperation(client, operation, stateContext, track, assertCurrent, createAdmission) {
	if (!client || client.sealed) return Promise.reject(new SqliteWorkerError("SQLite worker store is closed", "closed"));
	const scope = {
		maintenanceScope: getOpenClawDatabaseMaintenanceScope(),
		createAdmission,
		assertCurrent,
		active: true,
		pending: /* @__PURE__ */ new Set(),
		...stateContext ? { stateContext: captureSqliteWorkerStateContext(stateContext) } : {}
	};
	const released = createDeferredCore();
	client.scopes.add(released.promise);
	const untrack = track(released.promise);
	return (async () => {
		try {
			const result = operation({ execute: (command, options = {}) => client.execute(command, options, scope) });
			return isPromise(result) ? await result : result;
		} finally {
			scope.active = false;
			await Promise.allSettled(scope.pending);
			client.scopes.delete(released.promise);
			untrack();
			released.resolve();
		}
	})();
}
function createSqliteWorkerClient(owner) {
	let closed;
	const pending = /* @__PURE__ */ new Set();
	const client = {
		actor: owner.actor,
		close: () => store.close(),
		sealed: owner.isDraining(),
		isAvailable: owner.isAvailable,
		scopes: /* @__PURE__ */ new Set(),
		execute: (command, options, scope) => {
			if (scope ? !scope.active : closed || client.sealed || owner.isDraining()) return Promise.reject(new SqliteWorkerError("SQLite worker store is closed", "closed"));
			if (options.signal?.aborted) return Promise.reject(toErrorObject(options.signal.reason, "SQLite worker operation canceled"));
			let payload;
			let assertCurrent;
			const admission = scope?.assertCurrent;
			const createAdmission = scope?.createAdmission;
			const inCaller = admission || createAdmission ? AsyncLocalStorage.snapshot() : void 0;
			try {
				const commandType = command.type;
				assertCurrent = admission && inCaller ? () => inCaller(admission, commandType) : void 0;
				assertCurrent?.();
				payload = serialize({
					type: commandType,
					input: command.input
				});
			} catch (error) {
				return Promise.reject(toErrorObject(error, "SQLite worker command could not be serialized"));
			}
			const operation = owner.dispatch(payload, options.signal, scope, assertCurrent, createAdmission && inCaller ? (admissionOperation) => inCaller(createAdmission, admissionOperation) : void 0);
			pending.add(operation);
			scope?.pending.add(operation);
			const settled = () => {
				pending.delete(operation);
				scope?.pending.delete(operation);
			};
			operation.then(settled, settled);
			return operation;
		}
	};
	const store = {
		execute: (command, options = {}) => client.execute(command, options),
		close: () => {
			if (!closed) {
				client.sealed = true;
				closed = (async () => {
					await Promise.allSettled(client.scopes);
					await Promise.allSettled(pending);
					await owner.release();
				})().catch((error) => {
					closed = void 0;
					throw error;
				});
			}
			return closed;
		}
	};
	return {
		store,
		client
	};
}
//#endregion
//#region src/infra/sqlite-worker-input-admission.ts
/** Retained inputs share the broker budget before they become queued jobs. */
var SqliteWorkerInputAdmission = class {
	constructor(owner) {
		this.owner = owner;
		this.bytes = 0;
		this.inputPreparationGeneration = {};
		this.inputPreparations = /* @__PURE__ */ new Set();
		this.openTail = Promise.resolve();
	}
	get retainedBytes() {
		return this.bytes;
	}
	retain(bytes) {
		this.bytes += bytes;
		let released = false;
		return () => {
			if (!released) {
				released = true;
				this.bytes -= bytes;
			}
		};
	}
	open(bytes, dispatch) {
		if (bytes > this.owner.maxMessageBytes || this.owner.queuedBytes() + this.bytes + bytes > this.owner.maxQueuedBytes) return Promise.reject(new SqliteWorkerError("SQLite worker open input capacity reached", "overloaded"));
		const previous = this.openTail;
		const settled = createDeferredCore();
		this.openTail = settled.promise;
		const release = this.retain(bytes);
		return previous.then(dispatch).finally(() => {
			release();
			settled.resolve();
		});
	}
	joinOpens() {
		return this.openTail;
	}
	invalidatePreparations() {
		this.inputPreparationGeneration = {};
	}
	async joinPreparations() {
		await Promise.allSettled(this.inputPreparations);
	}
	reserveInputPreparation(inputBytes, retention = "stream") {
		if (!Number.isSafeInteger(inputBytes) || inputBytes < 0) throw new RangeError("SQLite worker input bytes must be a non-negative safe integer");
		if (this.owner.isClosing()) throw new SqliteWorkerError("SQLite worker host is closing", "closed");
		const bytes = retention === "stream" && inputBytes > this.owner.maxQueuedInputBytes ? this.owner.maxMessageBytes : inputBytes;
		if (this.owner.queuedBytes() + this.bytes + bytes > this.owner.maxQueuedBytes) throw new SqliteWorkerError("SQLite worker input preparation capacity reached", "overloaded");
		const generation = this.inputPreparationGeneration;
		this.bytes += bytes;
		const settled = createDeferredCore();
		this.inputPreparations.add(settled.promise);
		let released = false;
		let handedOff = false;
		const release = () => {
			if (!released) {
				released = true;
				this.bytes -= bytes;
				this.inputPreparations.delete(settled.promise);
				settled.resolve();
			}
		};
		const assertCurrent = () => {
			if (!handedOff && (released || this.owner.isClosing() || generation !== this.inputPreparationGeneration)) throw new SqliteWorkerError("SQLite worker input preparation is closed", "closed");
		};
		return {
			assertCurrent,
			handoff: (dispatch) => {
				try {
					if (released) throw new SqliteWorkerError("SQLite worker input preparation is closed", "closed");
					assertCurrent();
				} catch (error) {
					release();
					throw error;
				}
				handedOff = true;
				release();
				return dispatch();
			},
			release
		};
	}
};
//#endregion
//#region src/infra/sqlite-worker-broker.ts
const ADMISSION_TIMEOUT_MS = 1e4;
const MAX_STORES = 64;
const MAX_QUEUED_COMMAND_BYTES = 67108864;
const SQLITE_WORKER_MAX_QUEUED_BYTES = 268435456;
var SqliteWorkerBroker = class {
	constructor() {
		this.maxWorkers = Math.min(8, Math.max(2, Math.floor(availableParallelism() / 8)));
		this.waiters = /* @__PURE__ */ new Map();
		this.resuming = /* @__PURE__ */ new Set();
		this.nextAdmissionWarning = 0;
		this.actors = /* @__PURE__ */ new Map();
		this.slots = /* @__PURE__ */ new Set();
		this.clients = /* @__PURE__ */ new Set();
		this.stores = /* @__PURE__ */ new Map();
		this.operations = /* @__PURE__ */ new Set();
		this.lifecycle = createSqliteWorkerLifecycle({
			actors: this.actors,
			slots: this.slots,
			stores: this.stores,
			enqueueClose: (actor, maintenanceScope) => this.enqueue(actor.slot, {
				type: "close",
				actor: actor.id
			}, 0, { maintenanceScope }),
			fail: (slot, error) => this.fail(slot, error)
		});
		this.nextActor = 0;
		this.nextRequest = 0;
		this.requests = /* @__PURE__ */ new WeakMap();
		this.bytes = 0;
		this.inputAdmission = new SqliteWorkerInputAdmission({
			queuedBytes: () => this.bytes,
			isClosing: () => this.draining !== void 0,
			maxQueuedBytes: SQLITE_WORKER_MAX_QUEUED_BYTES,
			maxQueuedInputBytes: MAX_QUEUED_COMMAND_BYTES,
			maxMessageBytes: SQLITE_WORKER_MAX_MESSAGE_BYTES
		});
	}
	reserveInputPreparation(inputBytes, retention = "stream") {
		return this.inputAdmission.reserveInputPreparation(inputBytes, retention);
	}
	open(options, stateContext, assertCurrent, custody = {}) {
		try {
			validateSqliteWorkerDatabaseLocator(options.databasePath);
		} catch (error) {
			return Promise.reject(toErrorObject(error, "SQLite worker database locator is invalid"));
		}
		if (this.draining) return Promise.reject(new SqliteWorkerError("SQLite worker host is closing", "closed"));
		if (this.clients.size >= MAX_STORES) return Promise.reject(new SqliteWorkerError("SQLite worker store capacity reached", "overloaded"));
		const client = {};
		this.clients.add(client);
		let snapshot;
		try {
			snapshot = captureSqliteWorkerOpen(options, stateContext, assertCurrent, custody);
			const generation = options.runtimeGeneration;
			generation?.retain(this, async () => {
				await this.inputAdmission.joinOpens();
				await this.lifecycle.closeGeneration(generation);
			});
		} catch (error) {
			this.clients.delete(client);
			return Promise.reject(toErrorObject(error, "SQLite worker input could not be serialized"));
		}
		return this.inputAdmission.open(sqliteWorkerRequestBytes(snapshot.input, snapshot.stateContext, snapshot.preparation), () => this.openAdmitted(snapshot, client)).catch((error) => {
			this.clients.delete(client);
			throw error;
		});
	}
	async openAdmitted(options, client) {
		options.assertCurrent?.();
		const { databasePath, inputHash, identity } = await prepareSqliteWorkerDatabaseAdmission(options);
		options.assertCurrent?.();
		assertStateDatabaseAccessAllowed(options.stateDatabasePath ?? databasePath, { maintenanceScope: options.maintenanceScope });
		const input = options.input;
		const { key } = identity;
		const admittedPaths = captureSqliteWorkerAdmissionPaths(databasePath, identity, this.actors.values());
		if (options.existingOnly && !key.startsWith("file:")) {
			this.clients.delete(client);
			return;
		}
		const { modulePath, moduleUrl } = await resolveSqliteWorkerModuleUrl(options.moduleUrl);
		options.assertCurrent?.();
		let actor = this.actors.get(key);
		if (actor?.retirementRequested) {
			if (actor.retirement) {
				await actor.retirement;
				return this.openAdmitted(options, client);
			}
			throw new SqliteWorkerError("SQLite actor retirement must finish before reopening", "closed");
		}
		if (actor?.cleanupState === "pending") {
			if (actor.closing) {
				await actor.closing;
				return this.openAdmitted(options, client);
			}
			throw new SqliteWorkerError("SQLite worker cleanup is pending; retry close before reopening", "closed");
		}
		if (actor) {
			assertSqliteWorkerActorReusable(actor, moduleUrl, inputHash, options.stateContext);
			actor.references += 1;
		} else {
			const slot = await this.acquireSlot(options);
			try {
				options.assertCurrent?.();
			} catch (error) {
				return this.lifecycle.rejectSlotAdmission(slot, error);
			}
			const nativeStopped = createDeferredCore();
			actor = {
				runtimeGeneration: options.runtimeGeneration,
				nativeStopped: nativeStopped.promise,
				markNativeStopped: nativeStopped.resolve,
				id: ++this.nextActor,
				key,
				pathReferences: new Map([...admittedPaths].map((pathname) => [pathname, 1])),
				moduleUrl,
				inputHash,
				slot,
				references: 1,
				opened: Promise.resolve(),
				openDispatch: { dispatched: false },
				initialized: false,
				backendClosed: false,
				databasePath,
				stateContext: options.stateContext,
				stateDatabasePath: options.stateDatabasePath
			};
			this.actors.set(key, actor);
			slot.actors.add(actor);
			slot.pendingOpens -= 1;
			const opening = actor;
			opening.opened = this.enqueue(slot, {
				type: "open",
				actor: actor.id,
				moduleUrl,
				databasePath,
				...options.createAdmission ? { openAdmission: "input" } : options.createOpenAdmission ? { openAdmission: "identity" } : {},
				...options.existingOnly ? { existingIdentity: key } : {},
				input,
				...options.preparation ? { preparation: options.preparation } : {},
				...runtimeNeedsTypeScriptLoader(modulePath) ? { sourceLoaderUrl: import.meta.resolve("tsx/esm/api") } : {}
			}, sqliteWorkerRequestBytes(input, options.stateContext, options.preparation), {
				dispatchState: opening.openDispatch,
				signal: options.signal,
				assertCurrent: options.assertCurrent,
				maintenanceScope: options.maintenanceScope,
				createAdmission: options.createAdmission ?? options.createOpenAdmission
			}).then(async () => {
				opening.initialized = true;
				const physical = await resolveOpenedSqliteWorkerIdentity(databasePath, identity, (id) => {
					const existing = this.actors.get(id);
					return existing !== void 0 && existing !== opening;
				});
				if (physical !== key) {
					this.actors.delete(key);
					opening.key = physical;
					this.actors.set(physical, opening);
				}
			});
		}
		const admittedActor = actor;
		try {
			retainSqliteWorkerAdmissionCleanup(admittedActor, options.retainCleanup, () => this.lifecycle.closeActor(admittedActor, options.maintenanceScope));
			options.onNativeStopped?.(actor.nativeStopped, () => admittedActor.closeReceipt);
			await actor.opened;
			options.assertCurrent?.();
			if (actor.retirementRequested) throw new SqliteWorkerError("SQLite actor retired during client admission", "closed");
			if (actor.slot.failed) throw actor.slot.failed;
		} catch (error) {
			this.lifecycle.releaseActorReference(actor);
			if (!actor.references) {
				const errors = [error];
				try {
					if (actor.initialized) await this.lifecycle.closeActor(actor, options.maintenanceScope);
					else {
						if ((!actor.openDispatch.dispatched || actor.openDispatch.openNotEntered) && !actor.slot.failed) {
							actor.backendClosed = true;
							actor.markNativeStopped();
							actor.cleanupState = "pending";
						}
						if (actor.openDispatch.dispatched && !actor.openDispatch.openNotEntered) {
							this.fail(actor.slot, error);
							await actor.slot.exit;
						}
						this.lifecycle.forget(actor);
						await this.lifecycle.retireEmpty(actor.slot);
					}
				} catch (cleanupError) {
					errors.push(cleanupError);
				}
				if (errors.length > 1) throw new AggregateError(errors, "SQLite worker admission and cleanup failed", { cause: error });
			}
			throw error;
		}
		const owned = actor;
		const releasePaths = retainSqliteWorkerAdmissionPathReferences(owned, admittedPaths);
		let referenceReleased = false;
		const { store, client: storeClient } = createSqliteWorkerClient({
			actor: owned,
			isDraining: () => this.draining !== void 0,
			isAvailable: () => !owned.slot.failed && !owned.cleanupState && !owned.retirementRequested,
			dispatch: (payload, signal, scope, assertCurrent, createAdmission) => this.enqueue(owned.slot, {
				type: "execute",
				actor: owned.id,
				input: payload,
				...scope?.stateContext ? { stateContext: scope.stateContext } : {}
			}, sqliteWorkerRequestBytes(payload, scope?.stateContext), {
				signal,
				scope,
				assertCurrent,
				createAdmission,
				maintenanceScope: scope ? scope.maintenanceScope : getOpenClawDatabaseMaintenanceScope()
			}),
			release: async () => {
				if (!referenceReleased) {
					referenceReleased = true;
					this.lifecycle.releaseActorReference(owned);
					this.stores.delete(store);
					this.clients.delete(client);
					releasePaths();
				}
				if (this.draining) await this.draining;
				else if (owned.slot.failed) await owned.slot.exit;
				if (!owned.references) await this.lifecycle.closeActor(owned, options.maintenanceScope);
			}
		});
		this.stores.set(store, storeClient);
		return store;
	}
	runOperation(store, operation, stateContext, assertCurrent, createAdmission) {
		return runSqliteWorkerClientOperation(this.draining ? void 0 : this.stores.get(store), operation, stateContext, (pending) => {
			this.operations.add(pending);
			return () => this.operations.delete(pending);
		}, assertCurrent, createAdmission);
	}
	isAvailable(store) {
		return this.stores.get(store)?.isAvailable() ?? false;
	}
	retireActor(identity) {
		return this.lifecycle.retireActor(identity);
	}
	getActorIdentity(store) {
		const client = this.stores.get(store);
		if (!client || client.sealed || !client.actor.stateContext) throw new SqliteWorkerError("SQLite shared actor binding is unavailable", "closed");
		return client.actor;
	}
	hasUnclaimedSharedStateCleanup(databasePath) {
		return findUnclaimedSharedStateActors(this.actors.values(), databasePath).length > 0;
	}
	async closeUnclaimedSharedState(databasePath) {
		await this.inputAdmission.joinOpens();
		await closeUnclaimedSharedStateActors(this.actors.values(), databasePath, (actor) => this.lifecycle.closeActor(actor));
	}
	async acquireSlot(options) {
		options.assertCurrent?.();
		const available = [...this.slots].filter((slot) => !slot.failed && !slot.retiring && slot.runtimeGeneration === options.runtimeGeneration);
		const borrowedGenerationSlot = !process.versions.bun && options.runtimeGeneration !== void 0 && available.length === 0 && this.slots.size >= this.maxWorkers && ![...this.slots].some((slot) => slot.borrowedGenerationSlot);
		if (!borrowedGenerationSlot && this.slots.size >= (process.versions.bun ? MAX_STORES : this.maxWorkers)) {
			if (!available.length || process.versions.bun) {
				const retiring = [...this.slots].filter((slot) => Boolean(slot.failed || slot.retiring));
				if (retiring.length > 0) {
					await Promise.race(retiring.map(({ exit }) => exit));
					return this.acquireSlot(options);
				}
				if (process.versions.bun) throw new SqliteWorkerError("SQLite worker store capacity reached", "overloaded");
				if (!available.length) throw new SqliteWorkerError("SQLite worker runtime capacity reached", "overloaded");
			}
			const selected = available.reduce((left, right) => left.actors.size <= right.actors.size ? left : right);
			selected.pendingOpens += 1;
			return selected;
		}
		return this.lifecycle.createSlot(options, borrowedGenerationSlot, (slot) => ({
			fail: (reason, currentError, openOutcome, completed) => this.fail(slot, reason, currentError, openOutcome, completed),
			finish: (job, error, value, settlement, closeReceipt) => {
				if (job.request.type === "close" && closeReceipt) {
					const actor = [...slot.actors].find((candidate) => candidate.id === job.request.actor);
					if (actor) actor.closeReceipt = closeReceipt;
				}
				this.finish(slot, job, error, value, settlement);
			},
			dispatch: () => this.dispatch(slot)
		}));
	}
	enqueue(slot, body, bytes, options = {}, admitted = false) {
		const { signal, dispatchState, scope, assertCurrent, createAdmission, maintenanceScope } = options;
		if (this.draining && body.type !== "close" && !scope?.active) return Promise.reject(new SqliteWorkerError("SQLite worker host is closing", "closed"));
		if (slot.failed) return Promise.reject(slot.failed);
		const activeInput = body.type === "execute" && bytes > MAX_QUEUED_COMMAND_BYTES;
		const reservedBytes = activeInput ? SQLITE_WORKER_MAX_MESSAGE_BYTES : bytes;
		if (body.type !== "close" && (body.type !== "execute" && bytes > 33554432 || activeInput && (slot.current || slot.queue.length > 0 || slot.pendingOpens > 0) || this.bytes + this.inputAdmission.retainedBytes + reservedBytes > SQLITE_WORKER_MAX_QUEUED_BYTES)) return Promise.reject(new SqliteWorkerError("SQLite worker queue capacity reached", "overloaded"));
		if (body.type !== "close" && ((this.requests.get(slot) ?? 0) >= 128 || !admitted && this.waiters.has(slot))) {
			if (activeInput || this.draining) return Promise.reject(new SqliteWorkerError("SQLite worker queue capacity reached", "overloaded"));
			return this.waitForCapacity(slot, body, bytes, options);
		}
		const result = createDeferredCore();
		const job = {
			signal,
			maintenanceScope,
			createAdmission,
			assertCurrent,
			dispatchState,
			request: {
				...body,
				id: ++this.nextRequest
			},
			bytes: reservedBytes,
			resolve: result.resolve,
			reject: result.reject,
			detach: () => signal?.removeEventListener("abort", abort)
		};
		const abort = () => {
			const index = slot.queue.indexOf(job);
			if (index >= 0) {
				slot.queue.splice(index, 1);
				this.finish(slot, job, signal?.reason ?? /* @__PURE__ */ new Error("SQLite worker operation canceled"));
			}
		};
		this.requests.set(slot, (this.requests.get(slot) ?? 0) + 1);
		this.bytes += reservedBytes;
		if (activeInput) {
			signal?.addEventListener("abort", abort, { once: true });
			if (signal?.aborted) this.finish(slot, job, signal.reason ?? /* @__PURE__ */ new Error("SQLite worker operation canceled"));
			else this.dispatchJob(slot, job);
			return result.promise;
		}
		slot.queue.push(job);
		signal?.addEventListener("abort", abort, { once: true });
		if (signal?.aborted) abort();
		this.dispatch(slot);
		return result.promise;
	}
	waitForCapacity(slot, body, bytes, options) {
		return new Promise((resolve, reject) => {
			const started = Date.now();
			const signal = options.signal;
			const waiters = this.waiters.get(slot) ?? /* @__PURE__ */ new Set();
			const resume = (error) => {
				if (!waiters.delete(resume)) return;
				if (!waiters.size) this.waiters.delete(slot);
				clearTimeout(timer);
				signal?.removeEventListener("abort", abort);
				releaseInput();
				let failure = error;
				if (failure === void 0 && Date.now() - started >= ADMISSION_TIMEOUT_MS) {
					this.warnAdmission(slot, Date.now() - started);
					failure = new SqliteWorkerError("SQLite worker queue capacity reached", "overloaded");
				}
				if (failure !== void 0) reject(toErrorObject(failure, "SQLite worker admission failed"));
				else resolve(this.enqueue(slot, body, bytes, options, true));
			};
			const abort = () => resume(signal?.reason ?? /* @__PURE__ */ new Error("SQLite worker operation canceled"));
			const timer = setTimeout(() => {
				this.warnAdmission(slot, Date.now() - started);
				resume(new SqliteWorkerError("SQLite worker queue capacity reached", "overloaded"));
			}, ADMISSION_TIMEOUT_MS);
			const releaseInput = this.inputAdmission.retain(bytes);
			waiters.add(resume);
			this.waiters.set(slot, waiters);
			signal?.addEventListener("abort", abort, { once: true });
			if (signal?.aborted) abort();
			else if (waiters.size >= 128) this.warnAdmission(slot, 0);
		});
	}
	warnAdmission(slot, waitMs) {
		const now = Date.now();
		if (now >= this.nextAdmissionWarning) {
			this.nextAdmissionWarning = now + ADMISSION_TIMEOUT_MS;
			getChildLogger({ subsystem: "infra/sqlite-worker" }).warn("SQLite worker admission delayed", {
				queueDepth: this.waiters.get(slot)?.size ?? 0,
				waitMs
			});
		}
	}
	dispatch(slot) {
		if (slot.current || slot.failed) return;
		const job = slot.queue.shift();
		if (!job) {
			slot.worker.unref();
			return;
		}
		this.dispatchJob(slot, job);
	}
	dispatchJob(slot, job) {
		slot.current = job;
		slot.worker.ref();
		dispatchSqliteWorkerJob(slot, job, (error, retire) => {
			if (slot.current !== job) return;
			if (retire) this.fail(slot, error, toErrorObject(error, "SQLite worker transfer failed"));
			else {
				slot.current = void 0;
				this.finish(slot, job, error);
				this.dispatch(slot);
			}
		});
	}
	finish(slot, job, error, value, settlement) {
		this.requests.set(slot, (this.requests.get(slot) ?? 0) - 1);
		this.bytes -= job.bytes;
		settleSqliteWorkerJob(job, error, value, settlement);
		if (!this.resuming.has(slot)) {
			this.resuming.add(slot);
			while ((this.requests.get(slot) ?? 0) < 128) {
				const resume = this.waiters.get(slot)?.values().next().value;
				if (!resume) break;
				resume();
			}
			this.resuming.delete(slot);
		}
	}
	fail(slot, reason, currentError, openOutcome, completed) {
		if (slot.failed) return;
		const error = toErrorObject(reason, "SQLite worker failed");
		slot.failed = new SqliteWorkerError(error.message, "unavailable");
		for (const resume of this.waiters.get(slot) ?? []) resume(slot.failed);
		const current = slot.current;
		slot.current = void 0;
		if (current) {
			current.inputTransfer?.producer.cancel();
			current.inputTransfer = void 0;
			current.transfer = void 0;
		}
		const queued = slot.queue.splice(0);
		settleFailedSqliteWorkerJobs({
			queuedError: slot.failed,
			current,
			queued,
			error,
			currentError,
			completed,
			openOutcome,
			retire: () => this.lifecycle.retire(slot),
			finish: (job, failure, value, settlement) => this.finish(slot, job, failure, value, settlement)
		});
	}
	close() {
		this.draining ??= (async () => {
			this.inputAdmission.invalidatePreparations();
			for (const waiters of this.waiters.values()) for (const resume of waiters) resume(new SqliteWorkerError("SQLite worker host is closing", "overloaded"));
			for (const client of this.stores.values()) client.sealed = true;
			await this.inputAdmission.joinOpens();
			await Promise.allSettled(this.operations);
			const errors = (await Promise.allSettled([...this.actors.values()].map((actor) => this.lifecycle.closeActor(actor)))).flatMap((result) => result.status === "rejected" ? [result.reason] : []);
			await this.inputAdmission.joinPreparations();
			if (errors.length) throw new AggregateError(errors, "SQLite worker host cleanup failed");
		})().finally(() => {
			this.clients.clear();
			this.stores.clear();
			this.draining = void 0;
		});
		return this.draining;
	}
};
//#endregion
//#region src/infra/sqlite-worker-store.ts
function withCallerErrors(result) {
	return result.catch((error) => {
		if (error instanceof Error) throw hydrateOpenClawStateWorkerError(error);
		throw error;
	});
}
function bindCallerExecute(scope) {
	return { execute: (command, options) => {
		const result = withCallerErrors(scope.execute(command, options));
		result.catch(() => void 0);
		return result;
	} };
}
/** Retain one actor through local reconciliation; the callback must not await its own close. */
function runSqliteWorkerStoreOperation(store, operation, stateContext, assertCurrent, createAdmission) {
	return withCallerErrors(resolveSqliteWorkerBroker().runOperation(store, (scope) => operation(bindCallerExecute(scope)), stateContext, assertCurrent, createAdmission));
}
function resolveSqliteWorkerBroker() {
	return resolveGlobalSingleton(Symbol.for("openclaw.sqliteWorkerBroker"), () => new SqliteWorkerBroker(), (broker) => withCallerErrors(broker.close()));
}
/** Charge captured input before actor preparation can yield, then hand it to normal dispatch. */
function reserveSqliteWorkerInputPreparation(bytes, retention = "stream") {
	return resolveSqliteWorkerBroker().reserveInputPreparation(bytes, retention);
}
/** Read the broker's recorded lifecycle state without probing native storage. */
function isSqliteWorkerStoreAvailable(store) {
	return resolveSqliteWorkerBroker().isAvailable(store);
}
/** Internal identity for the existing canonical actor, never a transferable authority. */
function getSqliteWorkerActorIdentity(store) {
	return resolveSqliteWorkerBroker().getActorIdentity(store);
}
function retireSqliteWorkerActor(identity) {
	return withCallerErrors(resolveSqliteWorkerBroker().retireActor(identity));
}
/** Recorded orphan custody at its original shared-state opening path. */
function hasUnclaimedSharedStateSqliteCleanup(databasePath) {
	return resolveSqliteWorkerBroker().hasUnclaimedSharedStateCleanup(databasePath);
}
/** Explicit cleanup only; referenced actors and other opening scopes are untouched. */
function closeUnclaimedSharedStateSqliteWorkers(databasePath) {
	return withCallerErrors(resolveSqliteWorkerBroker().closeUnclaimedSharedState(databasePath));
}
/** Host-internal admission for the canonical shared-state actor. */
function openSharedStateSqliteWorkerStore(options, stateContext, assertCurrent, lifecycle) {
	if (!isMainThread) return Promise.reject(new SqliteWorkerError("Shared-state admission requires the host broker", "unavailable"));
	return withCallerErrors(resolveSqliteWorkerBroker().open({
		...options,
		input: void 0
	}, stateContext, assertCurrent, lifecycle)).then((store) => {
		if (store) {
			const execute = store.execute.bind(store);
			const close = store.close.bind(store);
			store.execute = bindCallerExecute({ execute }).execute;
			store.close = () => withCallerErrors(close());
		}
		return store;
	});
}
//#endregion
//#region src/state/openclaw-state-worker-operation.ts
/** A live alias cannot authorize a worker still bound to a vanished opening path. */
function assertOpenClawStateWorkerActorPath(actor) {
	if (openClawStateDatabaseCache.getKnownOpenClawStateDatabaseIdentity(actor.databasePath)?.key !== actor.key) throw new StateDatabaseReadAdmissionInvalidatedError("Shared-state worker opening path changed");
}
function runWithCapturedWorkerContext(context, operation) {
	const maintenance = context.maintenanceScope;
	const run = () => maintenance ? maintenance.run(() => maintenance.track(operation())) : operation();
	return context.runInCapturedSchemaScope ? context.runInCapturedSchemaScope(run) : run();
}
function runWithOpenClawStateWorkerStore(store, context, operation, assertCurrent, createAdmission) {
	const { admission } = context;
	const actor = getSqliteWorkerActorIdentity(store);
	return runSqliteWorkerStoreOperation(store, operation, context, (commandType) => {
		admission.assertCurrent();
		assertOpenClawStateWorkerActorPath(actor);
		assertCurrent?.(commandType);
	}, createAdmission);
}
/** Only native opening owns the caller scope; a cached actor must not retain it. */
function captureOpenClawStateWorkerOpeningGuard(context, assertCurrent) {
	const admission = { assertCurrent };
	let captured = AsyncLocalStorage.bind(() => {
		context.admission.assertCurrent();
		try {
			assertCurrent?.();
		} catch (error) {
			admission.refusal = { error };
			throw error;
		}
	});
	return {
		admission,
		assertCurrent: () => {
			if (!captured) throw new Error("Shared-state worker opening admission is closed");
			captured();
		},
		releaseContext() {
			captured = void 0;
		}
	};
}
//#endregion
//#region src/state/openclaw-state-worker-lease.ts
/** Retain a logical actor resource while tracking only acquisition and individual commands. */
function retainOpenClawStateWorkerLease(context, owner, finalize) {
	const maintenance = context.maintenanceScope;
	context.admission.assertCurrent();
	maintenance?.assertAdmission();
	const ready = createDeferredCore();
	const admitted = createDeferredCore();
	const released = createDeferredCore();
	const invocations = /* @__PURE__ */ new Set();
	const operations = /* @__PURE__ */ new Set();
	let retained;
	let releaseOperation;
	let retirement;
	let closing;
	let sealed = false;
	let invalidated = false;
	let store;
	let scope;
	let acquisitionReady = false;
	ready.promise.catch(() => void 0);
	const assertResourceCurrent = () => resource?.assertCurrent();
	const assertInvocation = (invocation) => {
		if (invocation.phase === "closed" || invalidated) throw new SqliteWorkerError("Shared-state worker operation is closed", "closed");
		context.admission.assertCurrent();
		assertResourceCurrent();
	};
	const assertCommandAdmission = (invocation) => {
		assertInvocation(invocation);
		if (invocation.phase !== "accepting") throw new SqliteWorkerError("Shared-state worker operation is closed", "closed");
	};
	const assertNewOperation = () => {
		if (sealed) throw new SqliteWorkerError("Shared-state worker lease is closed", "closed");
		context.admission.assertCurrent();
		maintenance?.assertAdmission();
	};
	const retireNative = () => {
		retirement ??= (async () => {
			await admitted.promise.catch(() => void 0);
			released.resolve();
			const errors = [];
			try {
				await retained;
			} catch (error) {
				errors.push(error);
			}
			try {
				await releaseOperation?.();
			} catch (error) {
				errors.push(error);
			}
			throwSqliteLifecycleErrors(errors, "Shared-state worker lease retirement failed");
		})();
		retirement.catch(() => void 0);
		return retirement;
	};
	const retire = () => {
		sealed = true;
		invalidated = true;
		for (const invocation of invocations) invocation.phase = "closed";
		return retireNative();
	};
	const createOperationScope = (invocation) => ({ execute: (command, options) => {
		try {
			assertCommandAdmission(invocation);
		} catch (error) {
			const rejected = createDeferredCore();
			rejected.reject(error);
			rejected.promise.catch(() => void 0);
			return rejected.promise;
		}
		const run = async () => {
			if (!acquisitionReady) await ready.promise;
			assertInvocation(invocation);
			if (!scope) throw new SqliteWorkerError("Shared-state worker lease is not ready", "closed");
			return scope.execute(command, options);
		};
		const result = (resource ? resource.run(run) : run()).catch(async (error) => {
			if (store && !sealed && !isSqliteWorkerStoreAvailable(store)) try {
				await retire();
			} catch (cleanupError) {
				throw new AggregateError([error, cleanupError], "Shared-state operation and retirement failed", { cause: cleanupError });
			}
			throw error;
		});
		invocation.pending.add(result);
		const settled = () => invocation.pending.delete(result);
		result.then(settled, settled);
		return maintenance ? maintenance.track(result) : result;
	} });
	const runOperation = (operation) => {
		try {
			assertNewOperation();
		} catch (error) {
			const rejected = createDeferredCore();
			rejected.reject(error);
			rejected.promise.catch(() => void 0);
			return rejected.promise;
		}
		const invocation = {
			phase: "accepting",
			pending: /* @__PURE__ */ new Set()
		};
		invocations.add(invocation);
		const completion = createDeferredCore();
		operations.add(completion.promise);
		completion.promise.catch(() => void 0);
		const run = async () => {
			try {
				return await operation(createOperationScope(invocation));
			} finally {
				if (invocation.phase === "accepting") invocation.phase = "draining";
				await Promise.allSettled(invocation.pending);
				invocation.phase = "closed";
				invocations.delete(invocation);
			}
		};
		run().then((value) => {
			operations.delete(completion.promise);
			completion.resolve(value);
		}, (error) => {
			operations.delete(completion.promise);
			completion.reject(error);
		});
		return completion.promise;
	};
	const release = () => {
		if (invalidated) return retireNative();
		if (closing) return closing;
		sealed = true;
		closing = (async () => {
			const errors = [];
			const terminal = {
				phase: "accepting",
				pending: /* @__PURE__ */ new Set()
			};
			invocations.add(terminal);
			try {
				await ready.promise;
				await finalize?.(createOperationScope(terminal));
			} catch (error) {
				errors.push(error);
			} finally {
				if (terminal.phase === "accepting") terminal.phase = "draining";
				await Promise.allSettled(terminal.pending);
				terminal.phase = "closed";
				invocations.delete(terminal);
			}
			const results = await Promise.allSettled(operations);
			errors.push(...results.flatMap((result) => result.status === "rejected" ? [result.reason] : []));
			try {
				await retireNative();
			} catch (error) {
				errors.push(error);
			}
			throwSqliteLifecycleErrors(errors, "Shared-state worker lease cleanup failed");
		})();
		closing.catch(() => void 0);
		return closing;
	};
	const lease = {
		ready: ready.promise,
		execute: (command, options) => runOperation((operationScope) => operationScope.execute(command, options)),
		runOperation,
		release,
		retire
	};
	maintenance?.own(lease, "shared-resources", release);
	const resource = maintenance ? captureOpenClawDatabaseMaintenanceResource(lease, maintenance) : void 0;
	const acquire = async () => {
		try {
			const failure = await getOpenClawStateDatabaseTerminalFailureAsync(context);
			if (failure) throw failure;
			context.admission.assertCurrent();
			store = await owner.open(context);
			context.admission.assertCurrent();
			if (!store) throw new Error("Canonical shared-state worker did not open its database");
			releaseOperation = owner.retainOperation(store);
			retained = runWithOpenClawStateWorkerStore(store, context, async (operationScope) => {
				scope = operationScope;
				admitted.resolve();
				await released.promise;
			}, assertResourceCurrent);
			retained.catch(admitted.reject);
			await admitted.promise;
			context.admission.assertCurrent();
			if (invalidated) throw new SqliteWorkerError("Shared-state worker lease is closed", "closed");
		} catch (error) {
			const failure = error instanceof Error ? hydrateOpenClawStateWorkerError(error) : error;
			admitted.reject(failure);
			try {
				await retire();
			} catch (cleanupError) {
				if (cleanupError !== failure) throw new AggregateError([failure, cleanupError], "Shared-state lease acquisition failed", { cause: cleanupError });
			}
			throw failure;
		}
	};
	runWithCapturedWorkerContext(context, acquire).then(() => {
		acquisitionReady = true;
		ready.resolve();
	}, ready.reject);
	return lease;
}
//#endregion
//#region src/infra/runtime-worker-generation.ts
const scope = resolveGlobalSingleton(Symbol.for("openclaw.runtimeWorkerGeneration"), () => new AsyncLocalStorage());
/** Capture before queues or detached pool contexts discard the caller's scope. */
function captureRuntimeWorkerSource(url) {
	const generation = scope.getStore()?.generation;
	const bound = generation?.resolve(url);
	return bound && bound.href !== url.href ? {
		moduleUrl: bound,
		runtimeGeneration: generation
	} : { moduleUrl: url };
}
//#endregion
//#region src/state/openclaw-state-worker-owner.ts
const log = createSubsystemLogger("state/worker");
const SHARED_STATE_WORKER_IDLE_INSPECT_MS = 6e4;
function createSharedStateWorkerOwner() {
	const moduleUrl = resolveRuntimeProcessEntrypointUrl("sharedStateStore");
	const stores = /* @__PURE__ */ new Set();
	const activeEntries = /* @__PURE__ */ new Set();
	const retiring = /* @__PURE__ */ new Map();
	const retiringActors = /* @__PURE__ */ new Map();
	const memoryPressure = channel("openclaw.memory.critical");
	let pressureSubscribed = false;
	const refreshPressureSubscription = () => {
		const hasCustody = stores.size > 0 || retiring.size > 0 || retiringActors.size > 0 || activeEntries.size > 0;
		if (hasCustody === pressureSubscribed) return;
		pressureSubscribed = hasCustody;
		if (hasCustody) memoryPressure.subscribe(retireIdleWorkers);
		else memoryPressure.unsubscribe(retireIdleWorkers);
	};
	const matches = (entry, identity) => identity === void 0 || entry.context.admission.identity.key === identity.key;
	const hasActiveActorOperations = (entry) => [...activeEntries].some((active) => entry.actor ? active.actor === entry.actor : active === entry);
	const clearIdleRetirement = (entry) => {
		if (entry.idleTimer) {
			clearTimeout(entry.idleTimer);
			entry.idleTimer = void 0;
		}
	};
	const hasPendingCleanup = (entry) => entry.cleanup?.pending ?? (!entry.context.maintenanceScope && hasUnclaimedSharedStateSqliteCleanup(entry.context.admission.databasePath));
	const retire = (entry) => {
		clearIdleRetirement(entry);
		stores.delete(entry);
		let attempt = retiring.get(entry);
		if (!attempt) {
			attempt = {};
			retiring.set(entry, attempt);
		}
		refreshPressureSubscription();
		if (attempt.pending) return attempt.pending;
		if (entry.actor && retiringActors.has(entry.actor)) return retireActor(entry.actor, entry.context.admission.identity);
		const pending = (entry.store ? entry.store.close() : entry.opening.then((store) => store?.close(), () => entry.cleanup ? entry.cleanup.close() : entry.context.maintenanceScope ? void 0 : closeUnclaimedSharedStateSqliteWorkers(entry.context.admission.databasePath))).catch(async (error) => {
			if (!attempt.actorSettlement) throw error;
			await attempt.actorSettlement;
		});
		attempt.pending = pending;
		const settled = () => {
			attempt.pending = void 0;
			if (!hasPendingCleanup(entry)) retiring.delete(entry);
			refreshPressureSubscription();
		};
		pending.then(settled, settled);
		return pending;
	};
	const scheduleIdleRetirement = (entry) => {
		if (entry.activeOperations !== 0 || entry.idleTimer || entry.context.maintenanceScope || !entry.store || !stores.has(entry)) return;
		const store = entry.store;
		const generation = entry.operationGeneration;
		const deadline = performance.now() + SQLITE_IDLE_HANDLE_TTL_MS;
		const arm = (delay, inspect) => {
			const isCurrentIdle = () => entry.idleTimer === timer && entry.operationGeneration === generation && entry.activeOperations === 0 && stores.has(entry);
			const settle = async () => {
				if (!isCurrentIdle()) return;
				let healthy = false;
				if (inspect) try {
					healthy = await runWithCapturedWorkerContext(entry.context, () => runSqliteWorkerStoreOperation(store, (scope) => scope.execute({
						type: "database.inspectIdle",
						input: void 0
					}), entry.context, () => {
						entry.context.admission.assertCurrent();
						if (!isCurrentIdle()) throw new Error("Shared-state worker resumed before idle inspection");
					})) === "healthy" && isSqliteWorkerStoreAvailable(store);
					entry.context.admission.assertCurrent();
				} catch {
					healthy = false;
				}
				if (!isCurrentIdle()) return;
				entry.idleTimer = void 0;
				const remaining = deadline - performance.now();
				if (healthy && remaining > 0) arm(remaining, false);
				else await retire(entry);
			};
			const timer = runInDetachedAsyncContext(() => setTimeout(() => {
				settle().catch((error) => {
					log.warn("Idle shared-state worker retirement failed", {
						path: entry.context.admission.databasePath,
						error
					});
				});
			}, delay));
			entry.idleTimer = timer;
			timer.unref?.();
		};
		arm(SHARED_STATE_WORKER_IDLE_INSPECT_MS, true);
	};
	const retainOperation = (store) => {
		const entry = [...stores].find((candidate) => candidate.store === store);
		if (!entry) throw new Error("Shared-state worker operation lost its actor owner");
		clearIdleRetirement(entry);
		entry.operationGeneration += 1;
		entry.activeOperations += 1;
		activeEntries.add(entry);
		let released = false;
		return () => {
			if (released) return;
			released = true;
			entry.activeOperations -= 1;
			if (entry.activeOperations === 0) activeEntries.delete(entry);
			refreshPressureSubscription();
			if (stores.has(entry) && !isSqliteWorkerStoreAvailable(store) && !hasActiveActorOperations(entry)) {
				const pending = entry.actor ? retireActor(entry.actor, entry.context.admission.identity) : retire(entry);
				pending.catch((error) => {
					log.warn("Shared-state worker retirement failed", {
						path: entry.context.admission.databasePath,
						error
					});
				});
				return pending;
			}
			scheduleIdleRetirement(entry);
		};
	};
	const retainActorSettlement = (attempt, pending) => {
		for (const entry of attempt.entries) {
			const closing = retiring.get(entry);
			if (closing) closing.actorSettlement = pending;
		}
		return pending;
	};
	const retireActor = (actor, identity) => {
		let attempt = retiringActors.get(actor);
		if (!attempt) {
			attempt = {
				identity,
				entries: /* @__PURE__ */ new Set()
			};
			retiringActors.set(actor, attempt);
		}
		for (const entry of [...stores, ...retiring.keys()]) if (entry.actor === actor) {
			attempt.entries.add(entry);
			clearIdleRetirement(entry);
			stores.delete(entry);
		}
		refreshPressureSubscription();
		if (attempt.pending) return retainActorSettlement(attempt, attempt.pending);
		const current = attempt;
		const complete = () => {
			for (const entry of current.entries) {
				clearIdleRetirement(entry);
				stores.delete(entry);
				retiring.delete(entry);
			}
			retiringActors.delete(actor);
			refreshPressureSubscription();
		};
		const pending = retireSqliteWorkerActor(actor).then(complete, (error) => {
			current.pending = void 0;
			if (current.entries.size > 0 && [...current.entries].every((entry) => entry.cleanup?.pending === false)) {
				complete();
				return;
			}
			throw error;
		});
		current.pending = pending;
		return retainActorSettlement(current, pending);
	};
	const joinActorRetirement = async (attempt) => {
		if (!attempt.pending) throw new Error("Shared-state actor cleanup is pending; close the database before reopening");
		await attempt.pending;
	};
	const inspectInvalidEntry = (entry) => {
		const actor = entry.actor;
		let kind = "actor";
		try {
			if (entry.bound && actor) {
				assertOpenClawStateWorkerActorPath(actor);
				if (entry.store && isSqliteWorkerStoreAvailable(entry.store)) kind = "client";
			}
			entry.databaseAdmission.assertCurrent();
		} catch (error) {
			if (!isStateDatabaseReadAdmissionInvalidatedError(error)) throw error;
			if (kind === "client" && openClawStateDatabaseCache.getKnownOpenClawStateDatabaseIdentity(entry.context.admission.databasePath)?.key === actor?.key) kind = "actor";
			return {
				kind,
				error
			};
		}
	};
	const retireInvalidEntry = (entry) => {
		const invalid = inspectInvalidEntry(entry);
		if (!invalid) return;
		if (invalid.kind === "actor") {
			if (hasActiveActorOperations(entry)) throw invalid.error;
			return { pending: entry.opening.then(() => {
				if (hasActiveActorOperations(entry)) throw invalid.error;
				return entry.actor ? retireActor(entry.actor, entry.context.admission.identity) : retire(entry);
			}, () => retire(entry)) };
		}
		if (!stores.has(entry)) return;
		const closing = retire(entry);
		return { pending: entry.activeOperations === 0 ? closing : void 0 };
	};
	async function close(identity) {
		for (const entry of stores.values()) if (matches(entry, identity)) retire(entry);
		const errors = (await Promise.allSettled([...[...retiring.keys()].filter((entry) => matches(entry, identity)).map(retire), ...[...retiringActors].filter(([, attempt]) => !identity || attempt.identity.key === identity.key).map(([actor, attempt]) => retireActor(actor, attempt.identity))])).flatMap((result) => result.status === "rejected" ? [result.reason] : []);
		refreshPressureSubscription();
		if (errors.length) throw new AggregateError(errors, "Failed to close shared-state SQLite workers");
	}
	registerOpenClawStateDatabaseAsyncResource({ close });
	registerOpenClawStateDatabaseLifecycleListener((event) => {
		if (event.kind !== "opened") {
			if (!event.identity) return;
			close(event.identity).catch((error) => {
				log.warn("Shared-state worker retirement failed", {
					path: event.path,
					error
				});
			});
		}
	});
	function retireIdleWorkers() {
		for (const entry of stores) if (entry.idleTimer && entry.store && !entry.context.maintenanceScope && !hasActiveActorOperations(entry)) runInDetachedAsyncContext(() => retire(entry)).catch((error) => {
			log.warn("Idle shared-state worker retirement failed", {
				path: entry.context.admission.databasePath,
				error
			});
		});
	}
	return {
		close,
		retainOperation,
		openCleanup(databasePath, context, assertOwned) {
			return openSharedStateSqliteWorkerStore({
				...captureRuntimeWorkerSource(moduleUrl),
				databasePath,
				existingOnly: true
			}, context, assertOwned);
		},
		async open(context, options = {}) {
			const { existingOnly = false, assertCurrent, preparation } = options;
			const { admission } = context;
			const source = captureRuntimeWorkerSource(moduleUrl);
			const assertAdmission = () => {
				admission.assertCurrent();
				assertCurrent?.();
			};
			assertAdmission();
			isExistingOpenClawStateSchema(admission.databasePath);
			if (getExistingOpenClawStateSchemaPath() !== context.existingSchemaPath) throw new Error("Shared-state worker schema context does not match its caller");
			let entry;
			for (;;) {
				for (const candidate of /* @__PURE__ */ new Set([...stores, ...retiring.keys()])) {
					if (!matches(candidate, admission.identity)) continue;
					const retirement = retireInvalidEntry(candidate);
					if (retirement) {
						if (retirement.pending) await retirement.pending;
						return this.open(context, options);
					}
					if (stores.has(candidate) && (candidate.context.existingSchemaPath !== context.existingSchemaPath || candidate.source.moduleUrl.href !== source.moduleUrl.href)) {
						await retire(candidate);
						assertAdmission();
					}
				}
				for (const attempt of retiringActors.values()) if (attempt.identity.key === admission.identity.key) {
					await joinActorRetirement(attempt);
					assertAdmission();
				}
				for (const [retiringEntry, attempt] of retiring) if (matches(retiringEntry, admission.identity) && retiringEntry.context.maintenanceScope === context.maintenanceScope) {
					if (inspectInvalidEntry(retiringEntry)?.kind === "client") continue;
					if (!attempt.pending) {
						if (!hasPendingCleanup(retiringEntry)) {
							retiring.delete(retiringEntry);
							refreshPressureSubscription();
							continue;
						}
						throw new Error("Shared-state SQLite cleanup is pending; close the database before reopening");
					}
					try {
						await attempt.pending;
					} catch (error) {
						if (retiring.get(retiringEntry) === attempt) throw error;
					}
					assertAdmission();
				}
				assertAdmission();
				entry = [...stores].find((candidate) => matches(candidate, admission.identity) && candidate.context.maintenanceScope === context.maintenanceScope && candidate.context.existingSchemaPath === context.existingSchemaPath);
				if (!entry || entry.store || entry.openingAdmission.assertCurrent === assertCurrent) break;
				let rejected;
				try {
					await entry.opening;
				} catch (error) {
					rejected = { error };
				}
				assertAdmission();
				if (rejected && (!entry.openingAdmission.refusal || !Object.is(rejected.error, entry.openingAdmission.refusal.error))) throw rejected.error;
			}
			if (!entry) {
				assertAdmission();
				const databaseAdmission = captureOpenClawStateDatabaseReadAdmission(admission.databasePath);
				assertAdmission();
				const openingGuard = captureOpenClawStateWorkerOpeningGuard(context, assertCurrent);
				const open = async () => {
					try {
						return await openSharedStateSqliteWorkerStore({
							...source,
							databasePath: admission.databasePath,
							existingOnly
						}, context, openingGuard.assertCurrent, {
							maintenanceScope: context.maintenanceScope,
							preparation,
							retainCleanup: (cleanup) => {
								admitted.cleanup = cleanup;
							}
						});
					} finally {
						openingGuard.releaseContext();
					}
				};
				const admitted = {
					source,
					context,
					databaseAdmission,
					openingAdmission: openingGuard.admission,
					existingOnly,
					activeOperations: 0,
					operationGeneration: 0,
					opening: context.maintenanceScope ? open() : runInDetachedAsyncContext(open)
				};
				entry = admitted;
				admitted.opening = admitted.opening.then((store) => {
					if (store) {
						admitted.store = store;
						admitted.actor = getSqliteWorkerActorIdentity(store);
					} else {
						stores.delete(admitted);
						refreshPressureSubscription();
					}
					return store;
				});
				stores.add(entry);
				refreshPressureSubscription();
				context.maintenanceScope?.own(entry, "shared-resources", () => retire(admitted));
				entry.opening.catch(() => {
					stores.delete(admitted);
					if (hasPendingCleanup(admitted) && !retiring.has(admitted)) retiring.set(admitted, {});
					refreshPressureSubscription();
				});
			}
			const store = await entry.opening;
			try {
				admission.assertCurrent();
			} catch (error) {
				try {
					await retire(entry);
				} catch (cleanupError) {
					throw new AggregateError([error, cleanupError], "Shared-state worker admission and cleanup failed", { cause: cleanupError });
				}
				throw error;
			}
			assertCurrent?.();
			if (!store) return !existingOnly && entry.existingOnly ? this.open(context, {
				...options,
				existingOnly: false
			}) : void 0;
			if (!stores.has(entry)) return this.open(context, options);
			clearIdleRetirement(entry);
			const actorRetirement = entry.actor ? retiringActors.get(entry.actor) : void 0;
			if (entry.actor && actorRetirement) {
				actorRetirement.entries.add(entry);
				stores.delete(entry);
				refreshPressureSubscription();
				await joinActorRetirement(actorRetirement);
				return this.open(context, options);
			}
			if (!isSqliteWorkerStoreAvailable(store) && !hasActiveActorOperations(entry)) {
				await (entry.actor ? retireActor(entry.actor, admission.identity) : retire(entry));
				return this.open(context, options);
			}
			try {
				if (!entry.bound) {
					publishOpenClawStateDatabaseWorkerAdmission(entry.context.admission);
					entry.bound = true;
				}
			} catch (error) {
				try {
					await retire(entry);
				} catch (cleanupError) {
					throw new AggregateError([error, cleanupError], "Shared-state worker binding and cleanup failed", { cause: cleanupError });
				}
				throw error;
			}
			const retirement = retireInvalidEntry(entry);
			if (retirement) {
				if (retirement.pending) await retirement.pending;
				return this.open(context, options);
			}
			stores.delete(entry);
			stores.add(entry);
			return store;
		}
	};
}
function getOpenClawStateWorkerOwner() {
	return resolveGlobalSingleton(Symbol.for("openclaw.sharedStateWorkerOwner"), createSharedStateWorkerOwner, (sharedOwner) => sharedOwner.close());
}
//#endregion
//#region src/state/openclaw-state-worker-store.ts
/** Retain the canonical actor for capture callbacks and their terminal writes. */
function createOpenClawStateWorkerLease(context, finalize) {
	return retainOpenClawStateWorkerLease(context, {
		open: (captured) => getOpenClawStateWorkerOwner().open(captured),
		retainOperation: (store) => getOpenClawStateWorkerOwner().retainOperation(store)
	}, finalize);
}
async function runOpenClawStateWorkerOperation(context, operation, options) {
	return runWithCapturedWorkerContext(context, () => runAdmittedOpenClawStateWorkerOperation(context, operation, options));
}
async function runAdmittedOpenClawStateWorkerOperation(context, operation, options) {
	try {
		context.admission.assertCurrent();
		options?.assertCurrent?.();
		const failure = await getOpenClawStateDatabaseTerminalFailureAsync(context);
		if (failure) throw failure;
		context.admission.assertCurrent();
		options?.assertCurrent?.();
		const store = await getOpenClawStateWorkerOwner().open(context, options);
		context.admission.assertCurrent();
		if (!store) {
			if (options?.existingOnly) return;
			throw new Error("Canonical shared-state worker did not open its database");
		}
		const releaseOperation = getOpenClawStateWorkerOwner().retainOperation(store);
		try {
			context.admission.assertCurrent();
			options?.assertCurrent?.();
			return await runWithOpenClawStateWorkerStore(store, context, operation, options?.assertCurrent, options?.createAdmission);
		} finally {
			releaseOperation();
		}
	} catch (error) {
		const hydrated = hydrateOpenClawStateWorkerError(error);
		const failure = findOpenClawStateDatabaseFailure(hydrated, context.admission.databasePath);
		if (failure && !openClawStateDatabaseCache.getOpenClawStateDatabaseRecordedFailure(context.admission.databasePath)) {
			try {
				context.admission.assertCurrent();
			} catch {
				throw hydrated;
			}
			recordOpenClawStateDatabaseOpenFailure(context.admission.databasePath, failure);
		}
		throw hydrated;
	}
}
/** Inspect the existing file without recursively admitting a domain operation. */
async function inspectOpenClawStateDatabase(context, command) {
	return runWithCapturedWorkerContext(context, () => inspectAdmittedOpenClawStateDatabase(context, command));
}
async function inspectAdmittedOpenClawStateDatabase(context, command) {
	try {
		const store = await getOpenClawStateWorkerOwner().open(context, { existingOnly: true });
		context.admission.assertCurrent();
		if (!store) return;
		const releaseOperation = getOpenClawStateWorkerOwner().retainOperation(store);
		try {
			context.admission.assertCurrent();
			return await runWithOpenClawStateWorkerStore(store, context, (scope) => scope.execute(command));
		} finally {
			releaseOperation();
		}
	} catch (error) {
		throw hydrateOpenClawStateWorkerError(error);
	}
}
//#endregion
export { reserveSqliteWorkerInputPreparation as a, LEGACY_IMPLICIT_AGENT_ID as c, captureRuntimeWorkerSource as i, inspectOpenClawStateDatabase as n, resolveNodeCompileCacheEnv as o, runOpenClawStateWorkerOperation as r, getSqliteWorkerExistingDatabaseIdentity as s, createOpenClawStateWorkerLease as t };
