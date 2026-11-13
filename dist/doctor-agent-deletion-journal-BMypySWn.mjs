import { t as formatCliCommand } from "./command-format-Cte1SWM4.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { n as sanitizeForLog } from "./ansi-6Z0Nu6M4.mjs";
import { s as resolveOpenClawStateSqlitePath } from "./openclaw-state-db.paths-rJI64Ab5.mjs";
import { n as quotePowerShellArg, t as quoteCliArg } from "./quote-cli-arg-BEt71TUh.mjs";
import { a as resolveAgentDir, d as resolveAgentWorkspaceDir } from "./agent-scope-config-Dm6T00l4.mjs";
import { i as listAgentIds } from "./agent-roster-B45JERT5.mjs";
import { l as runOpenClawStateWriteTransaction, y as prepareStateDatabaseInitialization } from "./openclaw-state-db-DM-mSY0m.mjs";
import { t as createConfigIO } from "./io.factory-DBfPTl1R.mjs";
import "./io-B18HRL9J.mjs";
import { r as reconstructAgentDeletionJournal } from "./agent-deletion-journal-recovery--JiHJSwq.mjs";
import path from "node:path";
//#region src/commands/doctor-agent-deletion-journal.ts
/** Doctor alone reconstructs lost deletion history and records the stores it cannot verify. */
async function repairDoctorAgentDeletionJournal(params) {
	const discovery = params.preflight.agentDatabaseMigrationDiscovery?.discovery;
	const changes = [];
	if (!discovery) return {
		changes,
		warnings: []
	};
	if (discovery.deletionJournal.status === "unavailable" && discovery.deletionJournal.cause === "unreadable") return {
		changes,
		warnings: [sanitizeForLog(`${resolveOpenClawStateSqlitePath(params.env)}: ${discovery.deletionJournal.reason}. Stores remain held; restore verified deletion history, then rerun openclaw doctor --fix.`), ...[...discovery.retainedTargets, ...discovery.unverifiedTargets].map(({ agentId, path: pathname }) => sanitizeForLog(`Held agent ${agentId} database ${pathname}; deletion history needs repair.`))]
	};
	const missing = discovery.deletionJournal.status === "unavailable";
	if (missing && discovery.unverifiedTargets.length === 0 && discovery.failures.length === 0 && prepareStateDatabaseInitialization(resolveOpenClawStateSqlitePath(params.env), params.env).kind === "fresh") return {
		changes,
		warnings: []
	};
	let held = discovery.unverifiedTargets.map(({ agentId, path: pathname }) => ({
		agentId,
		path: pathname
	}));
	if (missing && discovery.failures.length > 0) return {
		changes,
		warnings: ["Agent deletion journal missing; stores remain held because their recovery inventory is incomplete. Repair the listed paths, then rerun openclaw doctor --fix.", ...discovery.failures.map(({ path: pathname, reason }) => sanitizeForLog(`${pathname}: ${reason}`))]
	};
	if (missing && params.preflight.agentDatabaseRecoveryConfigValid !== true) return {
		changes,
		warnings: ["Agent deletion journal missing; stores remain held because the ownership configuration could not be verified. Repair the configuration, then rerun openclaw doctor --fix."]
	};
	if (missing && params.shouldRepair) {
		if (params.preflight.pendingMigrations?.some((entry) => entry.kind === "state")) {
			const { prepareLegacyStateDatabaseSchema } = await import("./state-migrations.doctor-BPAuuZrE.mjs");
			const { throwIfDoctorStateMigrationRefused } = await import("./state-migrations.messages-CZL2DT2J.mjs");
			throwIfDoctorStateMigrationRefused([await prepareLegacyStateDatabaseSchema(params.env)]);
		}
		held = runOpenClawStateWriteTransaction((database) => {
			const wasMissing = !tableExists(database.db, "agent_deletion_journal");
			const remaining = reconstructAgentDeletionJournal(database, held);
			if (wasMissing) changes.push("Reconstructed the missing agent deletion journal and recorded a Doctor receipt listing held stores.");
			return remaining;
		}, { env: params.env });
	}
	if (held.length === 0 && (!missing || params.shouldRepair)) return {
		changes,
		warnings: []
	};
	const snapshot = await createConfigIO({
		env: params.env,
		observe: false,
		pluginValidation: "core-only"
	}).readConfigFileSnapshot();
	const quote = process.platform === "win32" ? quotePowerShellArg : quoteCliArg;
	return {
		changes,
		warnings: [
			`Agent deletion journal ${missing && !params.shouldRepair ? "missing" : "reconstructed"}; ${held.length} store${held.length === 1 ? "" : "s"} held back.`,
			...held.map((target) => {
				const workspace = resolveAgentWorkspaceDir(snapshot.sourceConfig, target.agentId, params.env);
				const agentDir = listAgentIds(snapshot.sourceConfig).includes(target.agentId) ? resolveAgentDir(snapshot.sourceConfig, target.agentId, params.env) : path.dirname(target.path);
				const restore = formatCliCommand(`openclaw agents add ${quote(target.agentId)} --workspace ${quote(workspace)} --agent-dir ${quote(agentDir)} --non-interactive`, params.env);
				return sanitizeForLog(`${target.path}: ${path.basename(target.path) === "openclaw-agent.sqlite" ? "verify the workspace" : "restore the original session.store configuration for this database and verify the workspace"}, then run ${restore} to restore; use openclaw agents delete to confirm deletion instead.`);
			}),
			...missing && !params.shouldRepair ? [`Run ${formatCliCommand("openclaw doctor --fix", params.env)} to reconstruct the journal without activating held stores.`] : []
		]
	};
}
//#endregion
export { repairDoctorAgentDeletionJournal };
