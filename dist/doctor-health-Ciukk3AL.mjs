import { r as collectNestedErrorCandidates } from "./error-coercion-1P2One0X.mjs";
import { n as createNonExitingRuntime } from "./runtime-BC29JSZp.mjs";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CJrzFzqU.mjs";
import { r as resolveStateDir } from "./state-dir-CfAW6S2K.mjs";
import { m as resolveConfigPath } from "./paths-CtO6iw0c.mjs";
import { t as UpdateSchemaRefusalError } from "./openclaw-update-schema-refusal-B87dYIxC.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { n as createUpdateFailureFact } from "./update-failure-facts-RzGaiYBm.mjs";
import { n as formatUpdateDoctorConfigChange } from "./update-doctor-config-BrLAVDg0.mjs";
import { l as isUpdateDoctorLintPass } from "./update-phase-Ibh5Kd_i.mjs";
import { a as UpdateDoctorError, b as writeUpdatePostInstallDoctorResult, i as UPDATE_POST_INSTALL_DOCTOR_RESULT_PATH_ENV, m as normalizeUpdatePostInstallDoctorWarnings, s as captureUpdateDoctorConfigWrites, t as DoctorMaintenanceRefusalError } from "./update-doctor-result-BlDxecnI.mjs";
import { t as ConfigWritePostCommitError } from "./io.write-errors-DFZ36R-m.mjs";
import { t as formatUpdateFailureFact } from "./update-failure-facts-format-Uhxv535Y.mjs";
import { n as withPluginLoadDiagnostics } from "./load-diagnostics-D5e2-CMC.mjs";
import { r as stylePromptTitle } from "./prompt-style-zarsDmI2.mjs";
import { n as resolveDoctorRepairMode, t as isDoctorUpdateRepairMode } from "./doctor-repair-mode-DIw4A7J0.mjs";
import fs from "node:fs";
import { intro, outro } from "@clack/prompts";
//#region src/flows/doctor-health.ts
const intro$1 = (message) => intro(stylePromptTitle(message) ?? message);
const outro$1 = (message) => outro(stylePromptTitle(message) ?? message);
const loadConfigModule = createLazyRuntimeModule(() => import("./config/config.js"));
function stateDirectoryExistsAtDoctorStart() {
	try {
		return fs.statSync(resolveStateDir()).isDirectory();
	} catch {
		return false;
	}
}
/** Runs the full interactive doctor flow against the provided or default runtime. */
async function runDoctorHealthFlow(runtime, options = {}, writeAuthority, databasePreflight) {
	let preparedPreflight = databasePreflight;
	if (process.env.OPENCLAW_UPDATE_IN_PROGRESS === "1" && !writeAuthority?.postCoreSchemaRepair) {
		const { guardUpdateDoctorSchemaUpgrade, rehearseDeferredUpdateDoctorSchema } = await import("./commands/doctor-update-schema-guard.js");
		preparedPreflight = await guardUpdateDoctorSchemaUpgrade({
			schemas: preparedPreflight,
			runtime,
			json: options.json
		}) ?? preparedPreflight;
		if (preparedPreflight?.updateSchemaRehearsal) {
			await rehearseDeferredUpdateDoctorSchema(preparedPreflight, runtime);
			return;
		}
	}
	const resultPath = process.env[UPDATE_POST_INSTALL_DOCTOR_RESULT_PATH_ENV]?.trim();
	return withPluginLoadDiagnostics((diagnostics) => resultPath ? captureUpdateDoctorConfigWrites(resolveConfigPath(), (capture) => runDoctorHealthFlowWithResult(runtime, options, preparedPreflight, diagnostics, {
		resultPath,
		capture
	}, writeAuthority), writeAuthority) : runDoctorHealthFlowWithResult(runtime, options, preparedPreflight, diagnostics, void 0, writeAuthority));
}
async function runDoctorHealthFlowWithResult(runtime, options, databasePreflight, diagnostics, updateResult, writeAuthority) {
	const effectiveRuntime = runtime ?? (await import("./runtime-pvh-jBbt.mjs")).defaultRuntime;
	const repairRuntime = {
		...effectiveRuntime,
		exit: createNonExitingRuntime().exit
	};
	const stateDirExistedAtStart = stateDirectoryExistsAtDoctorStart();
	intro$1("OpenClaw doctor");
	const { resolveOpenClawPackageRoot } = await import("./openclaw-root-D9ADf4Rc.mjs");
	const root = await resolveOpenClawPackageRoot({
		moduleUrl: import.meta.url,
		argv1: process.argv[1],
		cwd: process.cwd()
	});
	if (options.repair === true || options.yes === true || options.generateGatewayToken === true) {
		const { assertConfigWriteAllowedInCurrentMode } = await import("./config-write-guard-DBmacQNl.mjs");
		assertConfigWriteAllowedInCurrentMode();
	}
	let maintenance;
	let exitCode;
	let healthContext;
	let doctorResult = { status: "error" };
	const recordConfigWriteRefusal = (ctx) => {
		if (!ctx.configWriteRefusal) return false;
		outro$1(ctx.configResultWriteCommitted === true ? "Doctor finished, but some config fixes were not applied." : "Doctor finished, but config fixes were not applied.");
		exitCode = 1;
		doctorResult = {
			status: "error",
			failureFacts: [createUpdateFailureFact({
				check: "config-write",
				code: ctx.configWriteRefusal,
				message: "Doctor config fixes were not applied."
			})]
		};
		return true;
	};
	try {
		const { beginDoctorMaintenance } = await import("./doctor-maintenance-D5eCzZ_2.mjs");
		maintenance = await beginDoctorMaintenance({
			options,
			root,
			runtime: repairRuntime,
			assertCurrent: writeAuthority?.assertCurrent,
			databaseGenerations: writeAuthority?.databaseGenerations
		});
		const runChecks = async () => {
			const doctorRuntime = maintenance ? repairRuntime : effectiveRuntime;
			const { createDoctorPrompter } = await import("./doctor-prompter-BpaqtRoX.mjs");
			const { prepareDoctorDatabasePreflight } = await import("./doctor-database-preflight-BGcb9GBu.mjs");
			const prompter = createDoctorPrompter({
				runtime: doctorRuntime,
				options,
				signal: maintenance?.signal
			});
			if (!maintenance) {
				if (!databasePreflight) await prepareDoctorDatabasePreflight({ scope: "state" });
				const { maybeOfferUpdateBeforeDoctor } = await import("./doctor-update-DOWyNJsW.mjs");
				if ((await maybeOfferUpdateBeforeDoctor({
					options,
					root,
					confirm: (p) => prompter.confirm(p),
					outro: outro$1
				})).handled) return;
			}
			const refreshRecoveryInventory = maintenance && databasePreflight?.agentDatabaseMigrationDiscovery?.discovery.deletionJournal.status === "unavailable";
			let schemas = databasePreflight && !refreshRecoveryInventory ? databasePreflight : await prepareDoctorDatabasePreflight();
			const { recordAgentDatabaseAdmissions } = await import("./agent-database-admission-CGF-BPwH.mjs");
			if (options.repair !== true && options.yes !== true) recordAgentDatabaseAdmissions(schemas.agentRefusals ?? []);
			const { guardUpdateDoctorSchemaUpgrade } = await import("./commands/doctor-update-schema-guard.js");
			let verifiedSnapshots = [];
			await guardUpdateDoctorSchemaUpgrade({
				schemas,
				runtime: doctorRuntime,
				json: options.json,
				postCoreSchemaRepair: writeAuthority?.postCoreSchemaRepair,
				onVerifiedBackup: (snapshots) => {
					verifiedSnapshots = snapshots;
				}
			});
			if (maintenance && (options.repair === true || options.yes === true)) {
				const { repairOpenClawStateDatabaseIndexesForDoctor, repairOpenClawStateDatabaseReadabilityForDoctor } = await import("./openclaw-state-db-CgJKJRub.mjs");
				let repairedState = false;
				for (const repair of [repairOpenClawStateDatabaseIndexesForDoctor, repairOpenClawStateDatabaseReadabilityForDoctor]) {
					const result = repair({ env: process.env });
					repairedState ||= result.changes.length > 0;
					if (result.warnings.length > 0) throw new Error(result.warnings.join("\n"));
					for (const change of result.changes) effectiveRuntime.log(change);
				}
				if (repairedState) schemas = await prepareDoctorDatabasePreflight();
				const { backupDoctorMigrationDatabases } = await import("./doctor-migration-backup-DHmqHMLs.mjs");
				const backups = await backupDoctorMigrationDatabases({
					env: process.env,
					pendingDatabasePaths: schemas.pendingMigrations?.map((database) => database.path) ?? [],
					verifiedSnapshots
				});
				for (const change of backups.changes) effectiveRuntime.log(change);
			}
			const { repairDoctorAgentDeletionJournal } = await import("./doctor-agent-deletion-journal-BMypySWn.mjs");
			const deletionJournal = await repairDoctorAgentDeletionJournal({
				preflight: schemas,
				shouldRepair: prompter.shouldRepair,
				env: process.env
			});
			for (const message of deletionJournal.changes) effectiveRuntime.log(message);
			for (const message of deletionJournal.warnings) effectiveRuntime.log(message);
			if (prompter.shouldRepair && deletionJournal.warnings.length > 0) {
				const failure = createUpdateFailureFact({
					check: "agent-deletion-journal",
					code: "unverified-agent-databases",
					message: deletionJournal.warnings.join("\n")
				});
				throw new DoctorMaintenanceRefusalError(formatUpdateFailureFact(failure), {
					kind: "data-at-risk",
					reason: "incomplete-migration"
				}, { failureFacts: [failure] });
			}
			const { maybeRepairUiProtocolFreshness } = await import("./doctor-ui-BdJpfHct.mjs");
			const { noteSourceInstallIssues } = await import("./doctor-install-DTRHZr3k.mjs");
			const { noteStalePluginRuntimeSymlinks } = await import("./plugin-runtime-symlinks-CQrGZUD8.mjs");
			const { noteStartupOptimizationHints } = await import("./doctor-platform-notes-7BStzbWG.mjs");
			await maybeRepairUiProtocolFreshness(doctorRuntime, prompter);
			noteSourceInstallIssues(root);
			await noteStalePluginRuntimeSymlinks(root);
			noteStartupOptimizationHints();
			const { loadAndMaybeMigrateDoctorConfig } = await import("./doctor-config-flow-Du5kmv4q.mjs");
			const configResult = await loadAndMaybeMigrateDoctorConfig({
				options,
				agentDatabaseMigrationDiscovery: schemas.agentDatabaseMigrationDiscovery,
				confirm: (p) => prompter.confirm(p),
				runtime: doctorRuntime,
				prompter
			});
			const admissionSchemas = schemas.agentDatabaseMigrationDiscovery && schemas.agentDatabaseMigrationDiscovery.stateDir !== resolveStateDir() ? await prepareDoctorDatabasePreflight({ cfg: configResult.cfg }) : schemas;
			const recoveredPaths = new Set(configResult.stateMigrationStepReceipts?.flatMap((receipt) => receipt.id === "media-persistence" ? receipt.recoveredAgentDatabasePaths ?? [] : []));
			const sourceIdentities = admissionSchemas.agentDatabaseMigrationDiscovery?.discovery.sourceIdentities;
			const agentDatabaseRefusals = (admissionSchemas.agentRefusals ?? []).filter((refusal) => !refusal.paths.every((pathname) => recoveredPaths.has(pathname) || recoveredPaths.has(sourceIdentities?.get(pathname)?.realPath ?? pathname)));
			recordAgentDatabaseAdmissions(agentDatabaseRefusals);
			const { CONFIG_PATH } = await loadConfigModule();
			const ctx = {
				runtime: doctorRuntime,
				options,
				prompter,
				configResult,
				cfg: configResult.cfg,
				cfgForPersistence: structuredClone(configResult.cfg),
				sourceConfigValid: configResult.sourceConfigValid ?? true,
				configPath: configResult.path ?? CONFIG_PATH,
				stateDirExistedAtStart,
				gatewayMaintenanceActive: maintenance !== void 0,
				agentDatabaseRefusals,
				updateWarnings: deletionJournal.warnings,
				preparedAgentCount: Math.max(admissionSchemas.agentDatabaseMigrationDiscovery?.configuredAgentDatabaseTargets.length ?? 0, admissionSchemas.agentDatabaseMigrationDiscovery?.registeredAgentDatabases.length ?? 0),
				runWithPluginMetadataSnapshot: configResult.runWithPluginMetadataSnapshot,
				invalidatePluginMetadataSnapshot: configResult.invalidatePluginMetadataSnapshot
			};
			healthContext = ctx;
			const { runDoctorHealthContributions } = await import("./doctor-health-contributions-BaY8n5k3.mjs");
			await runDoctorHealthContributions(ctx);
			if (recordConfigWriteRefusal(ctx)) return;
			if (options.repair === true || options.yes === true) {
				const { assertDoctorMaintenanceReady } = await import("./doctor-maintenance-inspection-BFllNnuP.mjs");
				await assertDoctorMaintenanceReady(ctx.cfg, process.env, effectiveRuntime.log);
				const { repairGatewayMaintenanceStartupFailures } = await import("./gateway-boot-lifecycle-B90NNdfT.mjs");
				repairGatewayMaintenanceStartupFailures();
			}
			return ctx;
		};
		let ctx;
		let failure;
		try {
			ctx = await (maintenance ? maintenance.run(runChecks) : runChecks());
		} catch (error) {
			failure = error;
			throw error;
		} finally {
			if (maintenance) {
				const completed = ctx;
				await maintenance.finish(completed?.cfg, completed ? async (nextConfig) => {
					const { writeDoctorGatewayConfig } = await import("./doctor-health-contribution-runners.gateway-CaOMVdPZ.mjs");
					return writeDoctorGatewayConfig(completed, nextConfig);
				} : void 0, failure);
			}
		}
		if (!ctx || recordConfigWriteRefusal(ctx)) return;
		const pluginWarnings = [];
		if (diagnostics.length > 0) {
			const { collectPluginLoadHealthFindings } = await import("./doctor-workspace-status-CkRcHOqf.mjs");
			const { renderStructuredHealthFindings } = await import("./doctor-health-contribution-BHLizQ7N.mjs");
			const findings = collectPluginLoadHealthFindings(diagnostics);
			renderStructuredHealthFindings(ctx, findings);
			pluginWarnings.push(...findings.map((finding) => `${finding.checkId}: ${finding.message}`));
		}
		const warnings = normalizeUpdatePostInstallDoctorWarnings([
			...pluginWarnings,
			...ctx.configResult.warnings ?? [],
			...maintenance?.warnings ?? [],
			...(ctx.configResult.stateMigrationStepReceipts ?? []).flatMap((receipt) => receipt.outcome === "warning" || receipt.outcome === "skipped" || receipt.outcome === "deferred" ? receipt.warnings : []),
			...ctx.postInstallDoctorResult?.warnings ?? []
		]);
		doctorResult = {
			...ctx.postInstallDoctorResult ?? { status: "ok" },
			...warnings.length ? { warnings } : {},
			...maintenance?.failureFacts?.length ? { failureFacts: [...maintenance.failureFacts, ...ctx.postInstallDoctorResult?.failureFacts ?? []] } : {}
		};
		if (updateResult && doctorResult.status === "advisory") {
			exitCode = 86;
			return;
		}
		if (pluginWarnings.length > 0) {
			outro$1("Doctor finished with plugin load errors.");
			if (options.nonInteractive && !isUpdateDoctorLintPass(process.env)) exitCode = 1;
			return;
		}
	} catch (error) {
		if (!maintenance && error instanceof DoctorMaintenanceRefusalError && error.refusal.kind === "deferred" && isDoctorUpdateRepairMode(resolveDoctorRepairMode(options))) {
			writeAuthority?.assertCurrent();
			const { recordUpdateDoctorRefusal } = await import("./doctor-update-refusal-C2rVBpl0.mjs");
			recordUpdateDoctorRefusal(error.message);
			effectiveRuntime.error(error.message);
			doctorResult = {
				status: "ok",
				warnings: [error.message],
				maintenanceRefusal: error.refusal
			};
			const runId = process.env.OPENCLAW_UPDATE_RUN_ID?.trim();
			if (!updateResult && runId) try {
				const { recordUpdateRunStep } = await import("./update-run-ledger-D1KjMQaH.mjs");
				recordUpdateRunStep(runId, {
					step: "warning:doctor-maintenance",
					status: "completed",
					endedAtMs: Date.now(),
					detail: error.message
				});
			} catch {
				effectiveRuntime.error("Doctor maintenance warning could not be saved to update history.");
			}
			outro$1("Doctor maintenance deferred; pending repairs remain unchanged.");
			exitCode = 0;
			return;
		}
		const { DoctorStateMigrationRefusalError } = await import("./state-migrations.messages-CZL2DT2J.mjs");
		const refusalWarnings = error instanceof DoctorStateMigrationRefusalError ? error.failureFacts.map(formatUpdateFailureFact) : [];
		if (healthContext && refusalWarnings.length > 0) {
			const { recordDoctorHealthWarnings } = await import("./doctor-health-contribution-BHLizQ7N.mjs");
			recordDoctorHealthWarnings(healthContext, [], refusalWarnings, { prepend: true });
		}
		if (error instanceof DoctorStateMigrationRefusalError) {
			const { recordUpdateDoctorRefusal, resolveUpdateDoctorGitRecovery } = await import("./doctor-update-refusal-C2rVBpl0.mjs");
			const recovery = await resolveUpdateDoctorGitRecovery({
				root,
				stateRepaired: true
			});
			if (recovery) {
				error.message += `\n${recovery.message}`;
				recordUpdateDoctorRefusal(error.message);
			}
		}
		const causes = collectNestedErrorCandidates(error);
		const { classifyDoctorMaintenanceRefusal } = await import("./doctor-maintenance-inspection-BFllNnuP.mjs");
		const maintenanceRefusal = causes.find((cause) => cause instanceof DoctorMaintenanceRefusalError && cause.refusal.kind === "data-at-risk")?.refusal ?? classifyDoctorMaintenanceRefusal(error);
		const unsafeConfigWrite = causes.find((cause) => cause instanceof ConfigWritePostCommitError && cause.rollbackStatus !== "restored");
		const schemaRefusal = causes.find((cause) => cause instanceof UpdateSchemaRefusalError);
		const refusalFacts = causes.flatMap((cause) => cause instanceof UpdateDoctorError || cause instanceof DoctorStateMigrationRefusalError ? cause.failureFacts : []);
		doctorResult = {
			status: "error",
			...maintenanceRefusal.kind === "data-at-risk" ? { maintenanceRefusal } : {},
			...!healthContext && refusalWarnings.length > 0 ? { warnings: refusalWarnings } : {},
			failureFacts: !unsafeConfigWrite && !schemaRefusal && refusalFacts.length > 0 ? refusalFacts : [createUpdateFailureFact({
				check: unsafeConfigWrite ? "config-write" : schemaRefusal ? "database-schema-preflight" : "doctor",
				code: unsafeConfigWrite ? "rollback-state-unverified" : schemaRefusal?.code ?? "doctor-failed",
				message: unsafeConfigWrite ? `${unsafeConfigWrite.publication} config publication; rollback ${unsafeConfigWrite.rollbackStatus}. ${unsafeConfigWrite.message}` : schemaRefusal?.message ?? (error instanceof Error ? error.message : String(error))
			})]
		};
		if (maintenance) {
			if (!(error instanceof DoctorStateMigrationRefusalError)) effectiveRuntime.error("Doctor could not complete maintenance. Check the reported service state and resolve the failure.");
		}
		throw error;
	} finally {
		try {
			await maintenance?.release();
		} finally {
			if (updateResult) {
				for (const change of updateResult.capture.configChanges) createSubsystemLogger("update").warn(formatUpdateDoctorConfigChange(change));
				const contributionWarnings = healthContext?.updateWarnings ?? [];
				const deferredCount = healthContext?.updateBudget?.deferred.size ?? 0;
				const warnings = normalizeUpdatePostInstallDoctorWarnings([
					...contributionWarnings.slice(0, deferredCount),
					...doctorResult.warnings ?? [],
					...(maintenance?.warnings ?? []).filter((warning) => !doctorResult.warnings?.includes(warning)),
					...contributionWarnings.slice(deferredCount)
				]);
				await writeUpdatePostInstallDoctorResult({
					resultPath: updateResult.resultPath,
					result: {
						...doctorResult,
						...maintenance?.databaseWrites ? { databaseWrites: maintenance.databaseWrites } : {},
						...updateResult.capture.fileWrites ? { configFileWrites: updateResult.capture.fileWrites } : {},
						...warnings.length ? { warnings } : {},
						...updateResult.capture.configChanges.length ? { configChanges: updateResult.capture.configChanges } : {},
						...updateResult.capture.configWriteRefusal ? { configWriteRefusal: updateResult.capture.configWriteRefusal } : {},
						configHash: updateResult.capture.hash,
						...updateResult.capture.inputHash === void 0 ? {} : { configInputHash: updateResult.capture.inputHash }
					}
				});
			}
		}
		if (exitCode !== void 0) effectiveRuntime.exit(exitCode);
	}
	outro$1("Doctor complete.");
}
//#endregion
export { runDoctorHealthFlow };
