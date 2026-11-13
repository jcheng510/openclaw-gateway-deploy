import { r as ChannelAccountSnapshot } from "./types.core-CuY7f6gy.js";
import "./status-helpers-CSSOAauS.js";
//#region src/channels/account-snapshot-fields.d.ts
declare const CREDENTIAL_STATUS_KEYS: readonly ["tokenStatus", "botTokenStatus", "appTokenStatus", "signingSecretStatus", "userTokenStatus"];
type CredentialStatusKey = (typeof CREDENTIAL_STATUS_KEYS)[number];
declare const CREDENTIAL_SOURCE_KEYS: readonly ["tokenSource", "botTokenSource", "appTokenSource", "signingSecretSource", "userTokenSource", "credentialSource", "secretSource"];
type CredentialSnapshotFields = Pick<Partial<ChannelAccountSnapshot>, CredentialStatusKey | (typeof CREDENTIAL_SOURCE_KEYS)[number]>;
/** Status inspection must not redeem credentials to detect configured-but-unavailable accounts. */
declare function resolveConfiguredFromCredentialStatuses(account: unknown): boolean | undefined;
/** Infers configured state only from the credential status keys required by a channel. */
declare function resolveConfiguredFromRequiredCredentialStatuses(account: unknown, requiredKeys: CredentialStatusKey[]): boolean | undefined;
/** Projects credential source/status metadata while omitting raw credential values. */
declare function projectCredentialSnapshotFields(account: unknown): CredentialSnapshotFields;
//#endregion
export { resolveConfiguredFromCredentialStatuses as n, resolveConfiguredFromRequiredCredentialStatuses as r, projectCredentialSnapshotFields as t };