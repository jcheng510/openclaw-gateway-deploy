import { a as readDatabasePathIdentitySync } from "../../sqlite-worker-identity-Dggu-rKK.mjs";
import { s as OPENCLAW_SQLITE_BUSY_TIMEOUT_MS } from "../../openclaw-state-db-contract-CQDemVBb.mjs";
import { a as withSqlitePostCommitPublications } from "../../sqlite-post-commit-Dih1WMKX.mjs";
import { a as runSqliteImmediateTransactionSync, r as runSqliteDeferredTransactionSync, t as assertTransactionUsable } from "../../sqlite-transaction-2VkikDo-.mjs";
import { c as resolveOpenClawAgentSqlitePath } from "../../openclaw-agent-db.paths-Dv3PPTNK.mjs";
import { n as sessionChanges } from "../../session-row-changes-DFigA589.mjs";
import { o as getOpenClawAgentDatabaseIfOpen } from "../../openclaw-agent-db-CZUYuo7P.mjs";
import { _ as toDatabaseOptions, l as resolveSqliteScope } from "../../session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { h as readSqliteSessionParticipantProjection } from "../../session-accessor.sqlite-entry-read-oKmXbFma.mjs";
import { i as recordSessionParticipant, n as removeSessionMember, t as addSessionMember } from "../../session-sharing-store.native-ASuaDH4r.mjs";
import { n as assertSessionGroupCategoryDestination, r as prepareSessionGroupCategoryMutation, t as applySessionGroupCategoryMutation } from "../../session-group-categories.kernel-B4xX34DA.mjs";
//#region src/config/sessions/session-sharing-store.worker.ts
/** The canonical agent executor retains the connection and both live admission checks. */
function bindSqliteWorkerBackend(_input, context) {
	const db = context.database;
	let categoryPlan;
	const categoryDatabase = (scope) => {
		const database = getOpenClawAgentDatabaseIfOpen(toDatabaseOptions(resolveSqliteScope(scope)));
		if (!database || database.db !== db || database.path !== context.databasePath) throw new Error("Session group category write lost its physical store owner");
		return database;
	};
	return {
		execute(command) {
			const scope = { ...command.input.scope };
			const target = resolveOpenClawAgentSqlitePath(toDatabaseOptions(resolveSqliteScope(scope)));
			if (readDatabasePathIdentitySync(target).canonicalPath !== context.databasePath) throw new Error("Session collaboration target changed its database owner");
			scope.storePath = context.databasePath;
			if (command.type === "category.prepare") {
				const database = categoryDatabase(scope);
				return withSqlitePostCommitPublications(db, () => runSqliteDeferredTransactionSync(db, () => {
					categoryPlan = {
						from: command.input.from,
						storePath: database.path,
						rows: prepareSessionGroupCategoryMutation(database, command.input.from)
					};
					return [...categoryPlan.rows.keys()];
				}));
			}
			let participantResult;
			let membershipResult;
			const unsubscribe = command.type !== "category.apply" ? sessionChanges.subscribeFacts((change) => {
				if ("sessionKey" in change && change.sessionKey === command.input.scope.sessionKey && change.storePath === context.databasePath) {
					if (participantResult && change.facts?.kind === "participants") participantResult.projectionChanged = true;
					if (membershipResult && change.facts?.kind === "member") membershipResult.facts = change.facts;
				}
			}) : void 0;
			try {
				return withSqlitePostCommitPublications(db, () => runSqliteImmediateTransactionSync(db, () => {
					context.admit("transaction");
					if (command.type === "category.apply") {
						const database = categoryDatabase(scope);
						if (!categoryPlan || categoryPlan.from !== command.input.from || categoryPlan.storePath !== database.path) throw new Error("Session group category mutation has no matching prepared rows");
						return applySessionGroupCategoryMutation(database, categoryPlan.rows, command.input.to, scope.env ?? process.env);
					}
					if (command.type === "participant") {
						participantResult = {
							value: recordSessionParticipant(scope, command.input.params),
							projectionChanged: false,
							participants: readSqliteSessionParticipantProjection(db, scope.sessionKey)
						};
						return participantResult;
					}
					if (command.type === "add") {
						const result = { value: addSessionMember(scope, command.input.params) };
						membershipResult = result;
						return result;
					}
					const result = { value: removeSessionMember(scope, command.input.identityId, command.input.expected, command.input.expectedSessionId, command.input.expectedEntry) };
					membershipResult = result;
					return result;
				}, {
					operationLabel: `sessions.${command.type}`,
					busyTimeoutMs: OPENCLAW_SQLITE_BUSY_TIMEOUT_MS,
					databaseLabel: context.databasePath,
					withCommit(commit) {
						context.admit("commit");
						if (command.type === "category.apply") assertSessionGroupCategoryDestination(command.input.to, command.input.scope.env ?? process.env);
						commit();
					}
				}));
			} finally {
				unsubscribe?.();
			}
		},
		assertSettled() {
			assertTransactionUsable(db);
			if (db.isTransaction) throw new Error("Session collaboration transaction did not settle");
		},
		close() {}
	};
}
//#endregion
export { bindSqliteWorkerBackend };
