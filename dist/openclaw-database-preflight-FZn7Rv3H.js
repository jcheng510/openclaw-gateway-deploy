import { $t as init_deferred, A as init_openclaw_state_db_maintenance, An as init_path_guards, B as init_openclaw_state_ownership, Bt as _enum, D as init_openclaw_state_db_schema_repair, En as init_paths, Et as init_sqlite_user_version, Ft as init_node_sqlite, Gt as object, In as init_error_coercion, J as init_openclaw_state_db_schema_version, Jt as init_openclaw_state_db_paths, Kt as string, L as init_openclaw_state_schema_compatibility, M as init_openclaw_state_schema_publication, Mt as init_sqlite_file_generation, Nn as init_command_format, Pn as init_home_dir, Pt as init_file_descriptor, Rt as init_errors, S as init_session_sqlite_target_paths, Sn as init_session_key, St as init_runtime_process_entrypoints, T as init_openclaw_state_db_fast_path, Ut as literal, V as init_sqlite_files, Vt as discriminatedUnion, W as init_openclaw_state_schema, Wt as number, Z as init_runtime_process_url, Zt as init_openclaw_state_db_contract, _ as init_openclaw_agent_db_registry_read, at as init_openclaw_quarantine_store, c as init_openclaw_database_verify, cn as init_sqlite_error_diagnostics, d as init_openclaw_agent_db_registry, dt as init_sqlite_snapshot_source, en as init_sqlite_lifecycle_errors, et as init_openclaw_state_worker_error, f as init_agent_deletion_journal_read, fn as init_artifacts, in as init_ansi, it as init_config_env_vars, jt as init_sqlite_integrity, kt as init_sqlite_readonly_location_cleanup, ln as init_kysely_sync, mn as init_openclaw_agent_db_paths, n as init_openclaw_agent_db, nn as createSubsystemLogger, nt as init_openclaw_state_db_schema_migration_required, o as init_agent_database_admission, pt as init_sqlite_readonly_worker, qt as unknown, rn as init_subsystem, sn as init_sqlite_schema_issues, st as init_openclaw_agent_db_contract, u as init_targets, ut as init_sqlite_schema_contract, vn as init_errno, wt as init_sqlite_schema_header, x as init_openclaw_state_db, y as init_session_dirs, yn as init_agent_scope_config, yt as init_runtime_worker_url, zn as __esmMin, zt as init_zod } from "./state/openclaw-state-read.worker.js";
import "node:path";
import "node:os";
import "node:fs";
import { AsyncLocalStorage } from "node:async_hooks";
import "node:child_process";
import "node:url";
var init_agent_database_startup = __esmMin((() => {
	init_config_env_vars();
	init_errors();
	init_file_descriptor();
	init_sqlite_file_generation();
	init_sqlite_readonly_worker();
	init_subsystem();
	init_agent_database_admission();
	init_agent_deletion_journal_read();
	init_openclaw_state_db_paths();
	createSubsystemLogger("state/agent-admission");
	new AsyncLocalStorage();
}));
//#endregion
//#region src/infra/native-error-response-schema.ts
var nativeErrorDetailsSchema, nativeErrorResponseSchema;
var init_native_error_response_schema = __esmMin((() => {
	init_zod();
	nativeErrorDetailsSchema = object({
		message: string(),
		code: string().optional(),
		errcode: number().optional()
	});
	nativeErrorResponseSchema = nativeErrorDetailsSchema.extend({
		name: string(),
		cause: nativeErrorDetailsSchema.optional()
	});
}));
var init_native_error_response = __esmMin((() => {}));
var agentSchemaInspectionErrorSchema;
var init_openclaw_agent_schema_inspection_response = __esmMin((() => {
	init_zod();
	init_native_error_response_schema();
	init_native_error_response();
	init_sqlite_error_diagnostics();
	init_openclaw_state_worker_error();
	agentSchemaInspectionErrorSchema = nativeErrorResponseSchema.extend({ stateError: unknown().optional() });
}));
var init_openclaw_agent_schema_inspection_worker = __esmMin((() => {
	init_error_coercion();
	init_zod();
	init_runtime_process_url();
	init_runtime_worker_url();
	init_sqlite_file_generation();
	init_sqlite_readonly_worker();
	init_deferred();
	init_openclaw_agent_schema_inspection_response();
	discriminatedUnion("ok", [object({
		requestId: number().int().safe(),
		ok: literal(false),
		error: agentSchemaInspectionErrorSchema
	}), object({
		requestId: number().int().safe(),
		ok: literal(true),
		inspection: object({
			version: number().int().safe(),
			integrityGateOutcome: _enum(["cached", "healthy"]).optional(),
			writerAppVersion: string().optional(),
			reason: string().optional(),
			failure: agentSchemaInspectionErrorSchema.optional(),
			agentSchemaMeta: object({
				agentId: string().nullable(),
				role: string().nullable(),
				schemaVersion: number().nullable()
			}).nullable().optional()
		}).nullable()
	})]);
}));
var init_usingCtx = __esmMin((() => {}));
var init_openclaw_database_preflight_agent_scheduler = __esmMin((() => {
	init_sqlite_readonly_worker();
	init_deferred();
	init_openclaw_agent_schema_inspection_worker();
	init_usingCtx();
}));
var init_openclaw_database_preflight_cleanup = __esmMin((() => {
	init_kysely_sync();
	init_sqlite_lifecycle_errors();
	init_sqlite_readonly_location_cleanup();
}));
var init_agent_deletion_discovery = __esmMin((() => {
	init_paths();
	init_session_sqlite_target_paths();
	init_errno();
	init_home_dir();
	init_path_guards();
	init_sqlite_files();
	init_session_key();
	init_agent_deletion_journal_read();
	init_openclaw_agent_db_paths();
	init_openclaw_state_db_paths();
}));
var init_state_migrations_media_persistence_targets = __esmMin((() => {
	init_ansi();
	init_session_dirs();
	init_command_format();
	init_paths();
	init_artifacts();
	init_session_sqlite_target_paths();
	init_session_key();
	init_agent_deletion_discovery();
	init_agent_deletion_journal_read();
	init_openclaw_agent_db_registry();
	init_openclaw_agent_db_paths();
	init_errno();
	init_path_guards();
	init_sqlite_files();
}));
var init_openclaw_database_preflight_targets = __esmMin((() => {
	init_paths();
	init_session_sqlite_target_paths();
	init_state_migrations_media_persistence_targets();
	init_session_key();
	init_agent_deletion_discovery();
	init_openclaw_agent_db_paths();
}));
var init_openclaw_database_preflight_messages = __esmMin((() => {
	init_sqlite_user_version();
	init_openclaw_state_db_contract();
}));
__esmMin((() => {
	init_error_coercion();
	init_runtime_process_entrypoints();
	init_runtime_worker_url();
	init_subsystem();
	init_openclaw_agent_db();
	init_openclaw_quarantine_store();
	init_openclaw_state_db();
	init_openclaw_state_db_paths();
	createSubsystemLogger("state/database-verify");
}));
var init_openclaw_state_schema_inspection = __esmMin((() => {
	init_sqlite_schema_contract();
	init_sqlite_schema_issues();
	init_openclaw_state_db_maintenance();
	init_openclaw_state_schema_compatibility();
	init_openclaw_state_schema();
}));
__esmMin((() => {
	init_agent_scope_config();
	init_paths();
	init_targets();
	init_errors();
	init_node_sqlite();
	init_path_guards();
	init_sqlite_integrity();
	init_sqlite_schema_header();
	init_sqlite_schema_issues();
	init_sqlite_snapshot_source();
	init_sqlite_user_version();
	init_agent_database_admission();
	init_agent_database_startup();
	init_agent_deletion_journal_read();
	init_openclaw_agent_db_contract();
	init_openclaw_agent_db_registry_read();
	init_openclaw_database_preflight_agent_scheduler();
	init_openclaw_database_preflight_cleanup();
	init_openclaw_database_preflight_targets();
	init_openclaw_database_preflight_messages();
	init_openclaw_database_verify();
	init_openclaw_state_db_contract();
	init_openclaw_state_db_fast_path();
	init_openclaw_state_db_maintenance();
	init_openclaw_state_db_schema_migration_required();
	init_openclaw_state_db_schema_repair();
	init_openclaw_state_db_schema_version();
	init_openclaw_state_db_paths();
	init_openclaw_state_ownership();
	init_openclaw_state_schema_inspection();
	init_openclaw_state_schema_publication();
	init_openclaw_state_db();
}));
//#endregion
export {};
