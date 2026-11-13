import { ColumnType } from "kysely";
//#region src/state/openclaw-state-db.generated.d.ts
type Generated<T> = T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;
interface WorkerEnvironments {
  attached_session_ids_json: Generated<string>;
  bootstrap_bundle_hash: string | null;
  bootstrap_install_kind: string | null;
  bootstrap_openclaw_version: string | null;
  bootstrap_protocol_features_json: string | null;
  created_at_ms: number;
  desktop_json: string | null;
  destroy_requested_at_ms: number | null;
  environment_id: string;
  idle_since_at_ms: number | null;
  last_activated_at_ms: number | null;
  last_error: string | null;
  lease_id: string | null;
  node_device_id: string | null;
  node_setup_id: string | null;
  owner_epoch: Generated<number>;
  preparation_consumed_at_ms: number | null;
  preparation_demand_at_ms: number | null;
  preparation_expires_at_ms: number | null;
  preparation_key: string | null;
  preparation_purpose: string | null;
  profile_id: string;
  profile_snapshot_json: string;
  provider_id: string;
  provision_operation_id: string;
  shared_host: number | null;
  ssh_host: string | null;
  ssh_host_key: string | null;
  ssh_key_ref_json: string | null;
  ssh_port: number | null;
  ssh_user: string | null;
  state: string;
  state_changed_at_ms: number;
  teardown_terminal_state: string | null;
  updated_at_ms: number;
}
//#endregion
export { WorkerEnvironments as t };