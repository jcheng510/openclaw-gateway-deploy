import { l as resolveAgentIdFromSessionKey } from "./session-key-BC4m_Ly5.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "./openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { a as resolveExplicitSessionStorePathForScope, r as resolveConcreteSessionStorePath } from "./paths-CQ3zRaeb.mjs";
import "./openclaw-agent-db-CZUYuo7P.mjs";
import { _ as toDatabaseOptions, m as resolveSqliteTranscriptScope } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { E as resolveSessionEntry } from "./session-accessor.sqlite-pending-inputs-BdT_Tg9N.mjs";
import { D as resolveSessionStorePathForScope, g as resolveSessionKeyBySessionId } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor.entry-D9NYIhaA.mjs";
//#region src/config/sessions/session-accessor.transcript-read-target.ts
function prepareSessionTranscriptReadTargetCore(scope, resolveDefaultStorePath) {
	const sessionKey = scope.sessionKey?.trim();
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(sessionKey);
	if (!agentId) throw new Error(`Cannot resolve transcript scope without an agent id: ${sessionKey}`);
	const boundScope = {
		...scope,
		agentId,
		sessionKey,
		storePath: resolveConcreteSessionStorePath(scope.storePath)
	};
	const storePath = resolveExplicitSessionStorePathForScope(boundScope) ?? resolveDefaultStorePath?.(boundScope);
	if (!storePath) throw new Error("Transcript reads require a concrete session store path");
	return {
		agentId,
		sessionKey,
		storePath,
		entryValidationScope: sessionKey && scope.sessionEntry?.sessionId !== scope.sessionId ? {
			agentId,
			...scope.env ? { env: scope.env } : {},
			sessionKey,
			storePath
		} : void 0
	};
}
/** Resolve a prepared store directly; only unbound callers need runtime configuration. */
function resolveSessionTranscriptReadTargetCore(scope, resolveDefaultStorePath) {
	const { agentId, sessionKey, storePath, entryValidationScope } = prepareSessionTranscriptReadTargetCore(scope, resolveDefaultStorePath);
	const resolvedSessionKey = (entryValidationScope ? resolveSessionEntry(entryValidationScope, { readOnly: true }) : void 0)?.normalizedKey ?? sessionKey;
	return {
		agentId,
		sessionId: scope.sessionId,
		storePath,
		...resolvedSessionKey ? { sessionKey: resolvedSessionKey } : {}
	};
}
//#endregion
//#region src/config/sessions/session-accessor.transcript-target.ts
/** Binds runtime storage without changing keys that raw ownership checks and read fences validate. */
function bindSessionTranscriptStoreScope(scope, config) {
	return {
		...scope,
		storePath: resolveSessionStorePathForScope({
			...scope,
			storePath: resolveConcreteSessionStorePath(scope.storePath)
		}, config)
	};
}
/** Resolves the canonical SQLite identity for runtime transcript access. */
async function resolveSessionTranscriptRuntimeTarget(scope, config, options = {}) {
	const agentId = scope.agentId ?? resolveAgentIdFromSessionKey(scope.sessionKey);
	if (!agentId) throw new Error(`Cannot resolve transcript scope without an agent id: ${scope.sessionKey}`);
	const { storePath } = bindSessionTranscriptStoreScope({
		...scope,
		agentId
	}, config);
	const persistedSessionKey = resolveSessionKeyBySessionId({
		agentId,
		...scope.env ? { env: scope.env } : {},
		sessionId: scope.sessionId,
		storePath
	});
	const selected = persistedSessionKey && !options.keyFormat ? void 0 : resolveSessionEntry({
		agentId,
		...scope.env ? { env: scope.env } : {},
		sessionKey: persistedSessionKey ?? scope.sessionKey,
		storePath
	}, {
		readOnly: true,
		keyFormat: options.keyFormat,
		allowCanonicalMove: !persistedSessionKey
	});
	const sessionKey = persistedSessionKey ?? selected?.normalizedKey ?? scope.sessionKey;
	return {
		agentId,
		sessionId: scope.sessionId,
		sessionKey,
		storePath,
		...options.keyFormat ? {
			selectedSessionId: selected?.existing?.sessionId ?? null,
			selectedLifecycleRevision: selected?.existing?.lifecycleRevision ?? null
		} : {}
	};
}
/** Resolves the physical agent database that owns one runtime transcript. */
function resolveSessionTranscriptDatabasePath(target) {
	const resolved = resolveSqliteTranscriptScope(target);
	return resolveOpenClawAgentSqlitePath(toDatabaseOptions(resolved));
}
function resolveSessionTranscriptReadTarget(scope) {
	return resolveSessionTranscriptReadTargetCore(scope, resolveSessionStorePathForScope);
}
//#endregion
export { prepareSessionTranscriptReadTargetCore as a, resolveSessionTranscriptRuntimeTarget as i, resolveSessionTranscriptDatabasePath as n, resolveSessionTranscriptReadTargetCore as o, resolveSessionTranscriptReadTarget as r, bindSessionTranscriptStoreScope as t };
