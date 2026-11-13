import { r as defaultRuntime } from "./runtime-BC29JSZp.mjs";
import { n as renderTable, t as getTerminalTableWidth } from "./table-BI11wcy5.mjs";
import { t as applyParentDefaultHelpAction } from "./parent-default-help-udre-2i5.mjs";
import { Option } from "commander";
//#region src/cli/worktrees-cli.ts
async function readExactStateRequest(filename) {
	if (!filename) return;
	const { readFile } = await import("node:fs/promises");
	const { exactStateRetirementSchema } = await import("./snapshot-exact-state-contract-DiDtFYuk.mjs");
	return exactStateRetirementSchema.parse(JSON.parse(await readFile(filename, "utf8")));
}
function printRecord(record, json) {
	if (json) {
		defaultRuntime.writeJson(record);
		return;
	}
	defaultRuntime.log(`${record.id}\t${record.path}`);
}
function registerWorktreesCli(program) {
	const worktrees = program.command("worktrees").description("Create, inspect, restore, and clean up managed worktrees");
	worktrees.command("list").description("List active and restorable managed worktrees").option("--json", "Output JSON", false).action(async (opts) => {
		const { managedWorktrees } = await import("./service-h6h6s_dQ.mjs");
		const records = await managedWorktrees.list();
		if (opts.json) {
			defaultRuntime.writeJson({ worktrees: records });
			return;
		}
		if (records.length === 0) {
			defaultRuntime.log("No managed worktrees.");
			return;
		}
		defaultRuntime.log(renderTable({
			width: getTerminalTableWidth(),
			columns: [
				{
					key: "ID",
					header: "ID",
					minWidth: 16,
					flex: true
				},
				{
					key: "Repo",
					header: "Repo",
					minWidth: 18,
					flex: true
				},
				{
					key: "Branch",
					header: "Branch",
					minWidth: 18,
					flex: true
				},
				{
					key: "Status",
					header: "Status",
					minWidth: 10
				}
			],
			rows: records.map((record) => ({
				ID: record.id,
				Repo: record.repoRoot,
				Branch: record.branch,
				Status: record.removedAt ? "restorable" : "active"
			}))
		}).trimEnd());
	});
	worktrees.command("create").description("Create a managed worktree").argument("<repoRoot>", "Source git checkout").option("--name <name>", "Managed worktree name").option("--base-ref <ref>", "Git ref to branch from").option("--source-profile <name>", "Repository source profile; repeat to combine (default: full source)", (value, previous) => [...previous ?? [], value]).option("--json", "Output JSON", false).action(async (repoRoot, opts) => {
		const { managedWorktrees } = await import("./service-h6h6s_dQ.mjs");
		printRecord(await managedWorktrees.create({
			repoRoot,
			name: opts.name,
			baseRef: opts.baseRef,
			...opts.sourceProfile?.length ? { profiles: opts.sourceProfile } : {},
			ownerKind: "manual"
		}), opts.json === true);
	});
	worktrees.command("remove").description("Snapshot and remove a managed worktree").argument("<id>", "Managed worktree id").option("--force", "Remove even if snapshot creation fails", false).addOption(new Option("--if-lossless", "Remove without force only when clean and published").conflicts("force")).addOption(new Option("--exact-state <file>", "Retire detached checkout using an owner-fenced exact-state JSON request").conflicts(["force", "ifLossless"])).option("--json", "Output JSON", false).action(async (id, opts) => {
		const { managedWorktrees } = await import("./service-h6h6s_dQ.mjs");
		if (opts.ifLossless) {
			const removed = await managedWorktrees.removeIfLossless(id);
			const cleanup = (await managedWorktrees.listRegistryRecords()).find((record) => record.id === id)?.runEndCleanup;
			if (opts.json) defaultRuntime.writeJson({
				removed,
				cleanup
			});
			else defaultRuntime.log(removed ? `Removed ${id} without force.` : `Retained ${id}: ${cleanup?.outcome ?? "cleanup not admitted"}.`);
			return;
		}
		const exactState = await readExactStateRequest(opts.exactState);
		const result = await managedWorktrees.remove({
			id,
			...exactState ? { exactState } : {},
			reason: "manual-delete",
			allowSnapshotLoss: opts.force
		});
		if (opts.json) defaultRuntime.writeJson(result);
		else defaultRuntime.log(result.recoveryPath ? `Retired ${id}; original source retained at ${result.recoveryPath} for the snapshot recovery period.` : result.snapshotError ? `Removed ${id} without a snapshot: ${result.snapshotError}` : `Removed ${id}.`);
	});
	worktrees.command("retire-snapshot").description("Retire one removed snapshot whose source is retained elsewhere").argument("<id>", "Removed managed worktree id").requiredOption("--expected-ref <ref>", "Exact snapshot ref").requiredOption("--expected-oid <oid>", "Exact snapshot commit").requiredOption("--removed-at <milliseconds>", "Exact recorded removal time").requiredOption("--retained-ref <ref>", "Retained branch or remote-tracking source ref").requiredOption("--retained-oid <oid>", "Exact retained source commit").option("--json", "Output JSON", false).action(async (id, opts) => {
		const { retireManagedWorktreeSnapshotById } = await import("./snapshot-host-Bcyye0ea.mjs");
		const result = await retireManagedWorktreeSnapshotById({
			id,
			expectedSnapshotRef: opts.expectedRef,
			expectedSnapshotOid: opts.expectedOid,
			expectedRemovedAt: Number(opts.removedAt),
			retainedSourceRef: opts.retainedRef,
			expectedRetainedSourceOid: opts.retainedOid
		});
		if (opts.json) defaultRuntime.writeJson(result);
		else defaultRuntime.log(`Retired snapshot ${id}.`);
	});
	worktrees.command("recover-removal").description("Resume interrupted removal from its original clean snapshot").argument("<id>", "Managed worktree id").requiredOption("--snapshot <oid>", "Expected pending snapshot commit").option("--json", "Output JSON", false).action(async (id, opts) => {
		const { managedWorktrees } = await import("./service-h6h6s_dQ.mjs");
		const result = await managedWorktrees.recoverRemoval({
			id,
			snapshot: opts.snapshot
		});
		if (opts.json) defaultRuntime.writeJson(result);
		else defaultRuntime.log(`Completed removal of ${id}; original snapshot retained.`);
	});
	worktrees.command("restore").description("Restore a managed worktree from its snapshot").option("--recover-exact-state <file>", "Reconcile a completed but unfinalized exact-state retirement using its original JSON request").argument("<id>", "Managed worktree id").option("--json", "Output JSON", false).action(async (id, opts) => {
		const { managedWorktrees } = await import("./service-h6h6s_dQ.mjs");
		const recoverExactState = await readExactStateRequest(opts.recoverExactState);
		printRecord(await managedWorktrees.restore({
			id,
			...recoverExactState ? { recoverExactState } : {}
		}), opts.json === true);
	});
	worktrees.command("gc").description("Run managed worktree cleanup now").option("--json", "Output JSON", false).action(async (opts) => {
		const { formatWorktreeGcResult } = await import("./gc-result-BSEBg1zq.mjs");
		const { createManagedWorktreeOwnerPolicy } = await import("./owner-protection-BMBW064T.mjs");
		const { managedWorktrees, resolveWorktreeCleanupLimits } = await import("./service-h6h6s_dQ.mjs");
		const { getRuntimeConfig } = await import("./config/config.js");
		const cfg = getRuntimeConfig();
		const limits = resolveWorktreeCleanupLimits();
		const result = await managedWorktrees.gc({
			limits,
			retryDeferred: true,
			...createManagedWorktreeOwnerPolicy(cfg)
		});
		if (opts.json) defaultRuntime.writeJson(result);
		else defaultRuntime.log(formatWorktreeGcResult(result));
		if (result.outcome === "partial") {
			const { exitCliAfterOutput } = await import("./one-shot-exit-CQQ5ZQ-i.mjs");
			exitCliAfterOutput(defaultRuntime, 1);
		}
	});
	applyParentDefaultHelpAction(worktrees);
}
//#endregion
export { registerWorktreesCli };
