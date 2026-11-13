import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { t as pruneMapToMaxSize } from "./map-size-CNcWiFKu.mjs";
import { n as normalizeAgentId } from "./agent-id-D1-Q6vR4.mjs";
import { t as AgentSelectionRequiredError } from "./agent-scope-config-Dm6T00l4.mjs";
import { A as parseAgentSessionKey, _ as toAgentStoreSessionKey, l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { g as resolveSessionAgentId } from "./agent-scope-L_eY3Hj7.mjs";
import { s as readSessionTranscriptUpdateVersion } from "./transcript-events-kaZ2Mm4l.mjs";
import { _ as validateArtifactsGetParams, g as validateArtifactsDownloadParams, v as validateArtifactsListParams } from "./src-D2gvuSyP.mjs";
import { t as ErrorCodes } from "./gateway-error-details-DIefe7Zy.mjs";
import { f as errorShape } from "./error-codes-DI20vDEB.mjs";
import { r as isSessionTranscriptProjectionUnavailableError } from "./session-transcript-projection-error-B7C6SQei.mjs";
import { r as resolveSessionTranscriptReadFence } from "./session-transcript-read-fence-Bq0b1oaG.mjs";
import { a as tryResolveSessionCompatibilityOwnerAgentId, n as resolveRequestedSessionAgentId } from "./session-request-agent-DFWpsx2m.mjs";
import { a as resolveStoredSessionKeyForAgentStore, n as resolveSessionStoreAgentId } from "./session-store-key-__CfQfd2.mjs";
import "./session-accessor.sqlite-active-events-CZQ0aW8w.mjs";
import { a as readGatewayRequestMutationAuthority } from "./session-mutation-guards-D2NVekUc.mjs";
import { n as readSessionArtifacts } from "./session-transcript-readers-DuU1dcaM.mjs";
import { _ as resolveSessionSharingTarget, n as authorizeIncognitoSessionTarget } from "./session-sharing-policy-BALdNo4L.mjs";
import { n as getSessionRowProjection } from "./session-row-projection-access-tcGTz6Lk.mjs";
import { i as loadGatewaySessionEntryReadOnly } from "./session-utils-store-DWiBeNMH.mjs";
import { b as createSessionListEntryFilter } from "./session-sharing-Bhe-fXzH.mjs";
import "./session-utils-FXsPIESl.mjs";
import { t as parseTranscriptImageArtifactId } from "./transcript-image-artifacts-JZUt0-cM.mjs";
import { f as resolveManagedOutgoingMediaArtifactDownload, p as resolveManagedOutgoingMediaUrlDownload } from "./managed-image-attachments-4pWK6g39.mjs";
import { i as parseManagedOutgoingArtifactId } from "./managed-outgoing-artifact-id-D000BooM.mjs";
import { t as assertValidParams } from "./validation-B7TobU6-.mjs";
import { n as createArtifactDownload, t as canCreateArtifactDownload } from "./artifact-downloads-Bavj7GJo.mjs";
import { i as toArtifactSummary } from "./artifacts-content-nSEZ5B0t.mjs";
import { t as resolveSessionKeyForRun } from "./server-session-key-DyC-B7jB.mjs";
import { randomUUID } from "node:crypto";
//#region src/gateway/server-methods/artifacts-session-resolution.ts
function resolveArtifactSessionAgentId(sessionKey, cfg) {
	const key = normalizeOptionalString(sessionKey);
	if (!key) return;
	const parsed = parseAgentSessionKey(key);
	if (!parsed && key.toLowerCase().startsWith("agent:")) return;
	if (cfg) {
		const owner = resolveRequestedSessionAgentId(cfg, key);
		if (!owner.ok) throw new ArtifactSessionResolutionError(owner.error);
		return owner.agentId;
	}
	return parsed?.agentId ?? resolveAgentIdFromSessionKey(key);
}
function resolveScopedArtifactSessionKey(sessionKey, agentId, cfg) {
	const key = normalizeOptionalString(sessionKey);
	if (!key) return;
	const scopedAgentId = normalizeOptionalString(agentId);
	if (!scopedAgentId) return key;
	const parsed = parseAgentSessionKey(key);
	if (!parsed && key.toLowerCase().startsWith("agent:")) return;
	if (!cfg) return parsed && parsed.agentId !== normalizeAgentId(scopedAgentId) ? void 0 : toAgentStoreSessionKey({
		agentId: scopedAgentId,
		requestKey: key
	});
	const scopedKey = resolveStoredSessionKeyForAgentStore({
		cfg,
		agentId: scopedAgentId,
		sessionKey: key
	});
	return scopedKey !== "global" && scopedKey !== "unknown" && resolveSessionStoreAgentId(cfg, scopedKey) !== normalizeAgentId(scopedAgentId) ? void 0 : scopedKey;
}
function resolveQuerySession(query, cfg, projection) {
	if (query.sessionKey) {
		const sessionKey = resolveScopedArtifactSessionKey(query.sessionKey, query.agentId, cfg);
		return sessionKey ? {
			sessionKey,
			...query.agentId ? { agentId: query.agentId } : {}
		} : void 0;
	}
	if (query.runId) {
		const sessionKey = resolveSessionKeyForRun(query.runId, {
			...query.agentId ? { agentId: query.agentId } : {},
			...projection ? { projection } : {}
		});
		const agentId = query.agentId ?? resolveArtifactSessionAgentId(sessionKey, cfg) ?? resolveSessionAgentId({ config: cfg });
		const scopedSessionKey = resolveScopedArtifactSessionKey(sessionKey, agentId, cfg);
		return scopedSessionKey ? {
			sessionKey: scopedSessionKey,
			agentId
		} : void 0;
	}
}
var ArtifactSessionResolutionError = class extends Error {
	constructor(shape) {
		super(shape.message);
		this.shape = shape;
	}
};
function artifactResponseIsCurrent(found, respond) {
	try {
		found.assertCurrent?.();
		return true;
	} catch (error) {
		if (!(error instanceof ArtifactSessionResolutionError)) throw error;
		respond(false, void 0, error.shape);
		return false;
	}
}
async function prepareArtifactSessionResolution(input, projection) {
	const query = { ...input };
	if (!query.sessionKey && query.runId && projection?.sharingRevision === void 0) await projection?.ensureMaterialized();
	return (cfg, client) => {
		const sessionKey = normalizeOptionalString(query.sessionKey);
		let scopedQuery = query;
		if (sessionKey && cfg) {
			const owner = resolveRequestedSessionAgentId(cfg, sessionKey, query.agentId);
			if (!owner.ok) throw new ArtifactSessionResolutionError(owner.error);
			scopedQuery = {
				...query,
				agentId: owner.agentId
			};
		}
		const resolved = resolveQuerySession(scopedQuery, cfg, projection);
		if (!resolved) return;
		const target = resolveSessionSharingTarget({
			cfg: cfg ?? {},
			sessionKey: resolved.sessionKey,
			agentId: resolved.agentId
		});
		const error = authorizeIncognitoSessionTarget({
			client,
			sessionKey: query.sessionKey ?? resolved.sessionKey,
			target
		});
		const visibilityDenied = Boolean(target && createSessionListEntryFilter({
			client,
			cfg
		})?.(target.storeKey, target.entry) === false);
		if (!error && !visibilityDenied) return resolved;
		throw new ArtifactSessionResolutionError(query.sessionKey && error ? error : errorShape(ErrorCodes.INVALID_REQUEST, "no session found for artifact query", { details: { type: "artifact_scope_not_found" } }));
	};
}
//#endregion
//#region src/gateway/server-methods/artifacts-image-page.ts
const CURSOR_TTL_MS = 9e5;
const cursors = /* @__PURE__ */ new WeakMap();
const internalCaller = {};
async function readArtifactImagePage(params) {
	const owner = params.client ?? internalCaller;
	let state = cursors.get(owner);
	if (!state) {
		state = /* @__PURE__ */ new Map();
		cursors.set(owner, state);
	}
	const now = Date.now();
	for (const [key, value] of state) if (value.expiresAt <= now) state.delete(key);
	const cursor = params.cursor ? state.get(params.cursor) : void 0;
	if (params.cursor && (!cursor || cursor.binding !== params.binding)) throw new ArtifactSessionResolutionError(errorShape(ErrorCodes.INVALID_REQUEST, "Image cursor expired or belongs to another session; restart artifacts.list", { details: { type: "artifact_cursor_invalid" } }));
	const page = await readSessionArtifacts(params.scope, {
		kind: "image-page",
		sessionKey: params.sessionKey,
		...params.filters,
		limit: params.limit,
		beforeSeq: cursor?.beforeSeq,
		imageOffset: cursor?.imageOffset,
		readWindow: cursor?.readWindow
	}).catch((error) => {
		if (cursor && isSessionTranscriptProjectionUnavailableError(error)) throw new ArtifactSessionResolutionError(errorShape(ErrorCodes.INVALID_REQUEST, "Transcript changed; restart artifacts.list", { details: { type: "artifact_cursor_invalid" } }));
		throw error;
	});
	let nextCursor;
	if (page.next) {
		nextCursor = randomUUID();
		state.set(nextCursor, {
			...page.next,
			binding: params.binding,
			expiresAt: now + CURSOR_TTL_MS
		});
		pruneMapToMaxSize(state, 128);
	}
	return {
		artifacts: page.artifacts,
		...nextCursor ? { nextCursor } : {},
		...page.omittedOversized ? { omittedOversized: true } : {}
	};
}
//#endregion
//#region src/gateway/server-methods/artifacts-session-read.ts
/** Retain the selected physical transcript independently of later query resolution. */
async function prepareArtifactSessionRead(query, getRuntimeConfig, client, projection) {
	const resolveSession = await prepareArtifactSessionResolution(query, projection);
	const resolved = resolveSession(getRuntimeConfig(), client);
	if (!resolved) return;
	const { sessionKey } = resolved;
	const unscopedAgentId = parseAgentSessionKey(sessionKey) ? void 0 : resolved.agentId;
	const readEntry = () => unscopedAgentId ? loadGatewaySessionEntryReadOnly(sessionKey, { agentId: unscopedAgentId }) : loadGatewaySessionEntryReadOnly(sessionKey);
	const { storePath, entry } = readEntry();
	const sessionId = entry?.sessionId;
	if (!sessionId || !storePath) return { sessionKey };
	const lifecycleRevision = entry.lifecycleRevision;
	return {
		sessionKey,
		scope: {
			agentId: resolved.agentId ?? resolveAgentIdFromSessionKey(sessionKey),
			sessionEntry: entry,
			sessionId,
			sessionKey,
			storePath
		},
		assertCurrent: () => {
			const authorized = resolveSession(getRuntimeConfig(), client);
			const current = readEntry();
			if (authorized?.sessionKey !== sessionKey || authorized.agentId !== resolved.agentId || current.storePath !== storePath || current.entry?.sessionId !== sessionId || current.entry.lifecycleRevision !== lifecycleRevision) throw new ArtifactSessionResolutionError(errorShape(ErrorCodes.UNAVAILABLE, "session changed while reading artifact; reload the conversation", { retryable: true }));
		}
	};
}
//#endregion
//#region src/gateway/server-methods/artifacts-transcript-images.ts
/** Recover only the referenced persisted bitmap; transcript bytes remain in their existing owner. */
async function findTranscriptImageArtifact(params, getRuntimeConfig, includeData, client, projection) {
	const selected = await prepareArtifactSessionRead(params, getRuntimeConfig, client, projection);
	if (!selected?.scope) return { sessionKey: selected?.sessionKey };
	const { artifact } = await readSessionArtifacts(selected.scope, {
		kind: "image",
		sessionKey: selected.sessionKey,
		artifactId: params.artifactId,
		includeData,
		runId: params.runId,
		messageRole: params.messageRole
	});
	selected.assertCurrent();
	return {
		sessionKey: selected.sessionKey,
		assertCurrent: selected.assertCurrent,
		artifact
	};
}
//#endregion
//#region src/gateway/server-methods/artifacts.ts
const queuedArtifactDownloads = /* @__PURE__ */ new Map();
function createArtifactRequestAccess(request) {
	const { assertCurrent } = readGatewayRequestMutationAuthority(request);
	const { context, respond } = request;
	assertCurrent();
	return {
		assertCurrent,
		projection: getSessionRowProjection(context),
		getRuntimeConfig: () => {
			assertCurrent();
			return context.getRuntimeConfig?.();
		},
		respond: (...args) => {
			assertCurrent();
			respond(...args);
		}
	};
}
function artifactError(type, message, details) {
	return errorShape(ErrorCodes.INVALID_REQUEST, message, { details: {
		type,
		...details
	} });
}
/** Loads artifacts from the transcript selected by sessionKey or runId. */
async function loadArtifacts(query, getRuntimeConfig, opts = {}, client = null) {
	const selected = await prepareArtifactSessionRead(query, getRuntimeConfig, client, opts.projection);
	if (!selected?.scope) return {
		sessionKey: selected?.sessionKey,
		artifacts: []
	};
	const { sessionKey, scope, assertCurrent } = selected;
	const { storePath, sessionId, sessionEntry: entry } = scope;
	if (query.type === "image") {
		const page = await readArtifactImagePage({
			scope,
			binding: JSON.stringify([
				sessionKey,
				scope.agentId,
				sessionId,
				query.runId,
				query.messageRole
			]),
			client,
			cursor: query.cursor,
			limit: query.limit ?? 4,
			sessionKey,
			filters: {
				runId: query.runId,
				messageRole: query.messageRole
			}
		});
		assertCurrent();
		return {
			...page,
			sessionKey,
			assertCurrent
		};
	}
	const downloadIds = opts.downloadArtifactId ? /* @__PURE__ */ new Set([opts.downloadArtifactId]) : void 0;
	const queuedKey = downloadIds && !resolveSessionTranscriptReadFence(scope) ? JSON.stringify([
		storePath,
		scope.agentId,
		sessionKey,
		sessionId,
		entry?.lifecycleRevision,
		query.runId,
		query.messageRole,
		readSessionTranscriptUpdateVersion()
	]) : void 0;
	const queued = queuedKey ? queuedArtifactDownloads.get(queuedKey) : void 0;
	if (queued && opts.downloadArtifactId) {
		queued.ids.add(opts.downloadArtifactId);
		const loaded = await queued.result;
		assertCurrent();
		return {
			...loaded,
			assertCurrent
		};
	}
	const collect = async () => {
		if (queuedKey) queuedArtifactDownloads.delete(queuedKey);
		const { artifacts } = await readSessionArtifacts(scope, {
			kind: "list",
			sessionKey,
			runId: query.runId,
			messageRole: query.messageRole,
			includeDownloadData: opts.includeDownloadData,
			downloadArtifactIds: downloadIds ? [...downloadIds] : void 0
		});
		return {
			sessionKey,
			artifacts
		};
	};
	const result = queuedKey && downloadIds ? Promise.resolve().then(collect) : collect();
	if (queuedKey && downloadIds) queuedArtifactDownloads.set(queuedKey, {
		ids: downloadIds,
		result
	});
	const loaded = await result;
	assertCurrent();
	return {
		...loaded,
		assertCurrent
	};
}
function requireQueryable(params, respond) {
	if (params.sessionKey || params.runId) return true;
	respond(false, void 0, artifactError("artifact_query_unsupported", "artifacts require sessionKey or runId"));
	return false;
}
function respondArtifactNotFound(respond, requestedArtifactId) {
	respond(false, void 0, artifactError("artifact_not_found", "artifact not found", { artifactId: requestedArtifactId }));
}
async function runArtifactSessionOperation(respond, operation) {
	try {
		return {
			ok: true,
			value: await operation()
		};
	} catch (error) {
		if (error instanceof ArtifactSessionResolutionError) {
			respond(false, void 0, error.shape);
			return { ok: false };
		}
		if (error instanceof AgentSelectionRequiredError) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, error.message));
			return { ok: false };
		}
		throw error;
	}
}
async function findArtifact(params, getRuntimeConfig, opts = {}, client = null) {
	if (parseTranscriptImageArtifactId(params.artifactId)) return findTranscriptImageArtifact(params, getRuntimeConfig, opts.includeDownloadData !== false, client, opts.projection);
	const loaded = await loadArtifacts(params, getRuntimeConfig, opts, client);
	return {
		sessionKey: loaded.sessionKey,
		artifact: loaded.artifacts.find((artifact) => artifact.id === params.artifactId),
		assertCurrent: loaded.assertCurrent
	};
}
async function prepareDownload(query, getRuntimeConfig, client, projection) {
	const selected = await prepareArtifactSessionRead(query, getRuntimeConfig, client, projection);
	if (!selected?.scope) return { sessionKey: selected?.sessionKey };
	const { selection } = await readSessionArtifacts(selected.scope, {
		...query,
		kind: "download-grant",
		sessionKey: selected.sessionKey
	});
	selected.assertCurrent();
	return {
		sessionKey: selected.sessionKey,
		assertCurrent: selected.assertCurrent,
		...selection?.kind === "prepared" ? {
			artifact: selection.download.artifact,
			download: selection.download
		} : { artifact: selection?.artifact }
	};
}
async function respondManagedArtifactDownload(query, getRuntimeConfig, client, respond, projection, matched) {
	await runArtifactSessionOperation(respond, async () => {
		const resolveSession = await prepareArtifactSessionResolution(query, projection);
		const cfg = getRuntimeConfig();
		const resolved = resolveSession(cfg, client);
		const defaultAgentId = resolved ? tryResolveSessionCompatibilityOwnerAgentId(cfg ?? {}, resolved.sessionKey) : void 0;
		const managed = resolved && (!matched || matched.sessionKey === resolved.sessionKey) ? await resolveManagedOutgoingMediaArtifactDownload({
			sessionKey: resolved.sessionKey,
			...resolved.agentId ? { agentId: resolved.agentId } : {},
			...defaultAgentId ? { defaultAgentId } : {},
			artifactId: query.artifactId
		}) : null;
		if (!managed) {
			respondArtifactNotFound(respond, query.artifactId);
			return;
		}
		respond(true, {
			artifact: {
				id: managed.artifactId,
				type: managed.type,
				title: managed.title,
				...managed.mimeType ? { mimeType: managed.mimeType } : {},
				...managed.sizeBytes !== void 0 ? { sizeBytes: managed.sizeBytes } : {},
				sessionKey: managed.sessionKey,
				...matched?.runId ? { runId: matched.runId } : {},
				...matched?.messageSeq !== void 0 ? { messageSeq: matched.messageSeq } : {},
				source: "session-transcript",
				download: { mode: "url" }
			},
			url: managed.url,
			expiresAt: managed.expiresAt
		});
	});
}
/** Gateway handlers for listing, summarizing, and downloading transcript artifacts. */
const artifactsHandlers = {
	"artifacts.list": async (request) => {
		const { params, client } = request;
		const { getRuntimeConfig, respond, projection } = createArtifactRequestAccess(request);
		if (!assertValidParams(params, validateArtifactsListParams, "artifacts.list", respond)) return;
		if (!requireQueryable(params, respond)) return;
		if (params.type !== "image" && (params.limit !== void 0 || params.cursor !== void 0)) {
			respond(false, void 0, artifactError("artifact_query_unsupported", "limit and cursor require type image"));
			return;
		}
		const query = { ...params };
		const loaded = await runArtifactSessionOperation(respond, () => loadArtifacts(query, getRuntimeConfig, {
			includeDownloadData: false,
			projection
		}, client));
		if (!loaded.ok) return;
		const { artifacts, sessionKey, nextCursor, omittedOversized } = loaded.value;
		if (!sessionKey && query.runId) {
			respond(false, void 0, artifactError("artifact_scope_not_found", "no session found for artifact query"));
			return;
		}
		respond(true, {
			artifacts: artifacts.map(toArtifactSummary),
			...nextCursor ? { nextCursor } : {},
			...omittedOversized ? { omittedOversized: true } : {}
		});
	},
	"artifacts.get": async (request) => {
		const { params, client } = request;
		const { getRuntimeConfig, respond, projection } = createArtifactRequestAccess(request);
		if (!assertValidParams(params, validateArtifactsGetParams, "artifacts.get", respond)) return;
		if (!requireQueryable(params, respond)) return;
		const query = { ...params };
		const found = await runArtifactSessionOperation(respond, () => findArtifact(query, getRuntimeConfig, {
			includeDownloadData: false,
			projection
		}, client));
		if (!found.ok) return;
		const { artifact } = found.value;
		if (!artifact) {
			respondArtifactNotFound(respond, query.artifactId);
			return;
		}
		if (artifactResponseIsCurrent(found.value, respond)) respond(true, { artifact: toArtifactSummary(artifact) });
	},
	"artifacts.download": async (request) => {
		const { params, client } = request;
		const { getRuntimeConfig, respond, assertCurrent, projection } = createArtifactRequestAccess(request);
		if (!assertValidParams(params, validateArtifactsDownloadParams, "artifacts.download", respond)) return;
		if (!requireQueryable(params, respond)) return;
		const query = { ...params };
		if (query.sessionKey && !query.runId && !query.messageRole && parseManagedOutgoingArtifactId(query.artifactId)) {
			await respondManagedArtifactDownload(query, getRuntimeConfig, client, respond, projection);
			return;
		}
		let found = await runArtifactSessionOperation(respond, () => query.transport === "http" && canCreateArtifactDownload(client) ? prepareDownload(query, getRuntimeConfig, client, projection) : findArtifact(query, getRuntimeConfig, {
			downloadArtifactId: query.artifactId,
			projection
		}, client));
		assertCurrent();
		if (found.ok && found.value.download && !canCreateArtifactDownload(client)) {
			found = await runArtifactSessionOperation(respond, () => findArtifact(query, getRuntimeConfig, {
				downloadArtifactId: query.artifactId,
				projection
			}, client));
			assertCurrent();
		}
		if (!found.ok) return;
		const { artifact } = found.value;
		if (!artifact) {
			respondArtifactNotFound(respond, query.artifactId);
			return;
		}
		if (parseManagedOutgoingArtifactId(artifact.id)) {
			await respondManagedArtifactDownload(query, getRuntimeConfig, client, respond, projection, artifact);
			return;
		}
		if (artifact.download.mode === "unsupported") {
			respond(false, void 0, artifactError("artifact_download_unsupported", "artifact download is unsupported", { artifactId: artifact.id }));
			return;
		}
		if (found.value.download) {
			const assertArtifactCurrent = found.value.assertCurrent;
			const download = createArtifactDownload({
				client,
				prepared: found.value.download,
				assertCurrent: () => {
					assertCurrent();
					assertArtifactCurrent?.();
				},
				read: async (response) => {
					const selected = await prepareArtifactSessionRead(query, getRuntimeConfig, client, projection);
					if (!selected?.scope) return;
					const current = await readSessionArtifacts(selected.scope, {
						...query,
						kind: "download-response",
						sessionKey: selected.sessionKey,
						response
					});
					selected.assertCurrent();
					return current.response;
				}
			});
			respond(true, {
				artifact: {
					...toArtifactSummary(artifact),
					download: { mode: "url" }
				},
				...download
			});
			return;
		}
		const managedUrl = artifact.download.mode === "url" && artifact.url && artifact.sessionKey ? await resolveManagedOutgoingMediaUrlDownload({
			sessionKey: artifact.sessionKey,
			url: artifact.url
		}) : null;
		if (!artifactResponseIsCurrent(found.value, respond)) return;
		respond(true, {
			artifact: toArtifactSummary(artifact),
			...artifact.download.mode === "bytes" ? {
				encoding: "base64",
				data: artifact.data
			} : {},
			...artifact.download.mode === "url" ? {
				url: managedUrl?.url ?? artifact.url,
				...managedUrl ? { expiresAt: managedUrl.expiresAt } : {}
			} : {}
		});
	}
};
//#endregion
export { artifactsHandlers };
