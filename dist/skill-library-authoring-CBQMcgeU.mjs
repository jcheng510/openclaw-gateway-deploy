import { r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { b as registerAgentRunDelegatedAuthorityClosedHandler } from "./agent-run-registry-BDW3IRlF.mjs";
import { u as isAgentEventLifecycleGenerationCurrent } from "./agent-events-Cg4kQnvf.mjs";
import { s as isOperatorUiClient } from "./message-channel-DDiCYM9I.mjs";
import { h as selectResolvedUserProfileMetadataById } from "./user-profiles-internal-Co87Y1ZN.mjs";
import { c as getAdmittedRunDelegatedAuthority } from "./admitted-run-context-BL8yRX2D.mjs";
import { d as retainGatewayDeviceRevocation } from "./device-revocation-CtZLAXd7.mjs";
import { n as captureGatewayOperatorRunAuthority } from "./operator-run-authority-CZcmYuYn.mjs";
import { i as getGatewayToolCallerIdentity } from "./gateway-caller-context-DQ2iIITl.mjs";
import { h as waitForChatAbortTerminalPersistence, r as isChatAbortControllerEntryAbortable, t as abortChatRunById } from "./chat-abort-BvX-AFVo.mjs";
import { t as abortQueuedChatTurnById } from "./chat-queued-turns-Cm0nTvb6.mjs";
import { d as validateSkillLibraryPath, f as SkillLibraryError } from "./bundle-CzzuTN6V.mjs";
import { s as seedSkillLibrarySelection, v as resolveSkillLibraryActor } from "./selection-C6VzDZA6.mjs";
import { t as formatForLog } from "./ws-log-d7CdTsJL.mjs";
import { t as createChatAbortOps } from "./chat-abort-ops-lFr576Vk.mjs";
import { i as deferAbortedPartialPersistence, r as captureAbortedPartial } from "./chat-aborted-partial-CnnHHzbH.mjs";
import { a as mutateSkillLibrary, c as saveSkillLibrary, i as listSkillLibrary, n as libraryAuthority, o as readSkillLibrary, s as resolveSkillLibraryPresentation, t as activateLibrarySelection } from "./skills-library-DPeC2OPd.mjs";
//#region src/gateway/skill-library-session.ts
/** Selection is prepared from this request's real principal, never reconstructed from provenance. */
function prepareSkillLibrarySessionCreation(client, cfg, creation) {
	if (!client?.authenticatedUserProfile || client.internal?.syntheticClient || creation.via === "spawn") return creation;
	return {
		...creation,
		skillLibrarySelections: seedSkillLibrarySelection({
			profileId: client.authenticatedUserProfile.profileId,
			scopes: client.connect.scopes ?? [],
			getConfig: typeof cfg === "function" ? cfg : () => cfg,
			assertCurrent: () => {}
		})
	};
}
//#endregion
//#region src/gateway/operator-run-cancellation.ts
/** Retain authority before its execution or queue owner can arm cancellation. */
async function retainGatewayOperatorRun(params) {
	const captured = await captureGatewayOperatorRunAuthority(params);
	const releaseSource = captured?.release ?? retainGatewayDeviceRevocation(params.hasCurrentClientAuthority);
	const signal = captured?.authority.signal;
	const cancellation = signal && params.entry ? createGatewayOperatorRunCancellation({
		signal,
		runId: params.runId,
		entry: params.entry,
		context: params.context
	}) : void 0;
	return {
		authority: captured?.authority,
		armCancellation: () => cancellation?.arm(),
		retireCancellation: () => cancellation?.release(),
		release: () => {
			cancellation?.release();
			releaseSource?.();
		}
	};
}
/** Queue retirement detaches cancellation while the original authority can still settle work. */
function createGatewayOperatorRunCancellation(params) {
	const { signal, runId, entry, context } = params;
	const controller = entry.controller;
	const sessionKey = entry.sessionKey;
	const lifecycleGeneration = entry.lifecycleGeneration;
	let released = false;
	let armed = false;
	let cancellationStarted = false;
	const ownsLifetime = () => !released && (!lifecycleGeneration || isAgentEventLifecycleGenerationCurrent(lifecycleGeneration));
	const ownsActiveRun = () => ownsLifetime() && context.chatAbortControllers.get(runId) === entry && entry.controller === controller && entry.sessionKey === sessionKey && !entry.registrationCleanupRequested && entry.projectSessionTerminalPersistence === void 0 && entry.projectSessionTerminalPersisted !== true && isChatAbortControllerEntryAbortable(entry);
	const cancelQueuedTurn = () => {
		const queued = context.chatQueuedTurns.get(runId);
		if (!ownsLifetime() || queued?.controller !== controller || queued.abortable === false) return;
		abortQueuedChatTurnById(context.chatQueuedTurns, {
			runId,
			sessionKey: queued.sessionKey,
			stopReason: "rpc",
			diagnosticReason: "authority-revoked"
		});
	};
	const cancel = async () => {
		if (context.chatQueuedTurns.get(runId)?.controller === controller) {
			cancelQueuedTurn();
			return;
		}
		if (!ownsActiveRun()) return;
		const text = context.chatRunState.resolveBuffer(runId, { final: true }).text;
		const snapshot = entry.controlUiVisible !== false && text.trim() ? captureAbortedPartial({
			runId,
			sessionKey,
			sessionId: entry.sessionId,
			agentId: entry.agentId,
			text,
			abortOrigin: "rpc",
			resolveTerminalProducer: entry.resolveTerminalProducer
		}) : void 0;
		const { aborted } = abortChatRunById(createChatAbortOps(context), {
			runId,
			sessionKey,
			stopReason: "rpc",
			diagnosticReason: "authority-revoked",
			onAbortCommitted: () => deferAbortedPartialPersistence(snapshot, context)
		});
		if (!aborted) return;
		const failures = (await Promise.allSettled([waitForChatAbortTerminalPersistence(entry), ...snapshot ? [import("./chat-transcript-persistence.runtime.js").then((transcript) => transcript.persistAbortedPartials({
			context,
			snapshots: [snapshot]
		}))] : []])).flatMap((result) => result.status === "rejected" ? [result.reason] : []);
		if (failures.length === 1) throw failures[0];
		if (failures.length > 1) throw new AggregateError(failures, "Operator access cancellation did not fully settle");
	};
	const onAbort = () => {
		if (released || cancellationStarted) return;
		cancellationStarted = true;
		context.trackExecution(cancel).catch((error) => {
			context.logGateway.warn(`Operator access cancellation failed: ${formatForLog(error)}`);
		});
	};
	return {
		arm: () => {
			if (released || armed) return;
			armed = true;
			signal.addEventListener("abort", onAbort, { once: true });
			if (signal.aborted) onAbort();
		},
		release: () => {
			released = true;
			signal.removeEventListener("abort", onAbort);
		}
	};
}
//#endregion
//#region src/gateway/session-input-participant.ts
/** Only the live authenticated profile establishes a person; client metadata stays unresolved. */
function resolveGatewayInputParticipant(client, provenance) {
	if (!client || client.internal?.syntheticClient || provenance && provenance.kind !== "external_user") return;
	const profileId = client.authenticatedUserProfile?.profileId;
	if (profileId) return {
		type: "profile",
		id: profileId
	};
	const clientInfo = client.connect?.client;
	return !clientInfo || isOperatorUiClient(clientInfo) ? void 0 : {
		type: "observation",
		pluginId: null,
		accountId: null,
		senderKind: "unknown",
		id: clientInfo.id
	};
}
//#endregion
//#region src/skills/library/authoring.ts
/** Model edits are named changes; unread binary resources retain their exact bytes and modes. */
function mergeSkillLibrarySupportFiles(current, upserts = [], deletes = []) {
	const changed = /* @__PURE__ */ new Set();
	for (const filePath of [...upserts.map((file) => file.path), ...deletes]) {
		validateSkillLibraryPath(filePath);
		const folded = filePath.toLowerCase();
		if (folded === "skill.md" || changed.has(folded)) throw new SkillLibraryError("INVALID_BUNDLE", "Support edits cannot include SKILL.md, duplicate paths, or conflicting upserts and deletes. Use proposal_content for SKILL.md.");
		changed.add(folded);
	}
	const files = new Map(current.map((file) => [file.path, file]));
	for (const filePath of deletes) if (!files.delete(filePath)) throw new SkillLibraryError("INVALID_BUNDLE", `Support file not found: ${filePath}`);
	for (const file of upserts) files.set(file.path, {
		...file,
		executable: file.executable ?? files.get(file.path)?.executable
	});
	return [...files.values()];
}
//#endregion
//#region src/gateway/skill-library-authoring.ts
const active = /* @__PURE__ */ new Map();
/** A mixed-person steer revokes mutation authority without changing the session's committed pins. */
function invalidateSkillAuthoringForOtherRequester(sessionKey, profileId) {
	for (const grant of active.get(sessionKey) ?? []) if (grant.profileId !== profileId) {
		const db = openOpenClawStateDatabase().db;
		if (!profileId || selectResolvedUserProfileMetadataById(db, grant.profileId)?.id !== selectResolvedUserProfileMetadataById(db, profileId)?.id) grant.revoke();
	}
}
/** Only ordinary attributed human ingress may mint a namespace; actions remain normal tool policy. */
function prepareGatewaySkillAuthoring(options, sessionKey, isHumanTurn) {
	const client = options.client;
	if (!isHumanTurn || !client?.authenticatedUserProfile || client.internal?.syntheticClient || client.internal?.agentRuntimeIdentity || client.internal?.senderAttribution || client.internal?.pluginRuntimeOwnerId || client.internal?.approvalRuntime || client.internal?.cronRunContinuation || client.internal?.delegatedToolPolicyHandoffId) return;
	const authority = libraryAuthority(options);
	const library = resolveSkillLibraryPresentation(authority);
	if (!library.profileId || library.defaultTarget === "unavailable") return;
	const profileId = library.profileId;
	invalidateSkillAuthoringForOtherRequester(sessionKey, profileId);
	let bound;
	let revoked = false;
	let owner;
	const assertCurrent = () => {
		authority.assertCurrent();
		const caller = getGatewayToolCallerIdentity();
		if (revoked || !bound || !owner || getAdmittedRunDelegatedAuthority(bound) !== owner || caller?.operationalRunInstance !== bound.operationalRunInstance || !caller.receiptAuthority || caller.receiptAuthority() === false) throw new SkillLibraryError("AUTHORITY_EXPIRED", "Personal authoring authority expired or this turn has mixed requesters. Send a fresh attributed message requesting the change.");
	};
	const currentAuthority = {
		...authority,
		assertCurrent,
		namespace: "personal"
	};
	return {
		target: "personal",
		defaultTarget: library.defaultTarget,
		multipleProfiles: library.multipleProfiles,
		bind(context) {
			if (bound) {
				if (context !== bound) throw new SkillLibraryError("AUTHORITY_EXPIRED", "Personal authoring cannot move to a replacement run. Send a fresh message.");
				return;
			}
			bound = context;
			owner = getAdmittedRunDelegatedAuthority(context);
			if (!owner) throw new SkillLibraryError("AUTHORITY_EXPIRED", "Personal authoring run was not admitted.");
			const grant = {
				profileId,
				revoke: () => {
					revoked = true;
				}
			};
			const grants = active.get(sessionKey) ?? /* @__PURE__ */ new Set();
			grants.add(grant);
			active.set(sessionKey, grants);
			const stop = registerAgentRunDelegatedAuthorityClosedHandler((closed) => {
				if (closed !== owner) return;
				revoked = true;
				grants.delete(grant);
				if (!grants.size) active.delete(sessionKey);
				stop();
			});
		},
		assertWorkspaceCurrent() {
			assertCurrent();
			if (!resolveSkillLibraryActor(openOpenClawStateDatabase().db, authority).admin) throw new SkillLibraryError("FORBIDDEN", "Workspace authoring requires current administrator authority.");
		},
		async invoke(input) {
			assertCurrent();
			if (input.action === "list") return listSkillLibrary(currentAuthority);
			if (input.action === "read") {
				if (!input.skillId) throw new SkillLibraryError("INVALID_BUNDLE", "Choose skill_id from list.");
				return readSkillLibrary(currentAuthority, input.skillId, input.revision);
			}
			if (input.action === "activate") {
				if (!input.skillId) throw new SkillLibraryError("INVALID_BUNDLE", "Choose skill_id from list.");
				return activateLibrarySelection({
					...options,
					sessionMutationCommitGuard: assertCurrent
				}, {
					sessionKey,
					action: "attach",
					skillId: input.skillId,
					revision: input.revision
				});
			}
			if (input.action !== "create" && (!input.skillId || !input.expectedRevision)) throw new SkillLibraryError("INVALID_BUNDLE", "Read the skill first; supply skill_id and expected_revision from that read.");
			if (input.action === "create" || input.action === "update") {
				const current = input.action === "update" ? await readSkillLibrary(currentAuthority, input.skillId, input.expectedRevision) : void 0;
				const slug = input.slug ?? current?.entry.slug;
				const content = input.content ?? current?.content;
				if (!slug || !content) throw new SkillLibraryError("INVALID_BUNDLE", "Creating a skill requires name (the human slug) and complete proposal_content.");
				return saveSkillLibrary(currentAuthority, {
					slug,
					content,
					files: mergeSkillLibrarySupportFiles(current?.files ?? [], input.files, input.deleteFiles),
					skillId: input.action === "update" ? input.skillId : void 0,
					expectedRevision: input.action === "create" ? null : input.expectedRevision
				});
			}
			return mutateSkillLibrary(currentAuthority, {
				action: input.action,
				skillId: input.skillId,
				expectedRevision: input.expectedRevision,
				revision: input.revision
			});
		}
	};
}
//#endregion
export { prepareSkillLibrarySessionCreation as a, retainGatewayOperatorRun as i, prepareGatewaySkillAuthoring as n, resolveGatewayInputParticipant as r, invalidateSkillAuthoringForOtherRequester as t };
