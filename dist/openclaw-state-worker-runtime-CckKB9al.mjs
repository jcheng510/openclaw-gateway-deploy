import { l as normalizeOptionalString } from "./string-coerce-6kR-86XC.mjs";
import { D as resolveExpiresAtMsFromDurationMs, N as resolveOptionalIntegerOption, g as isFutureDateTimestampMs, o as asDateTimestampMs, s as asFiniteNumber } from "./number-coercion-Dq1l5muL.mjs";
import { c as isRecord, r as asNullableRecord } from "./record-coerce-TIsquoVR.mjs";
import { r as createLazyRuntimeModule } from "./lazy-runtime-CJrzFzqU.mjs";
import { n as computeBackoff } from "./src-DqaLEvc_.mjs";
import { n as ENV_SECRET_REF_ID_RE } from "./ref-contract-D0kWy5jy.mjs";
import "./types.secrets-BXEuin38.mjs";
import { a as iterateSqliteQuerySync, c as prepareSqliteQueryTakeFirstSync, i as getNodeSqliteKysely, l as sqliteStringSet, n as executeSqliteQuerySync, r as executeSqliteQueryTakeFirstSync, s as prepareSqliteQuerySync } from "./kysely-sync-Y4_ti-rQ.mjs";
import { s as runSqlitePinnedReadSnapshotSync } from "./sqlite-schema-facts-DwsuACBg.mjs";
import { t as extractSqliteTableSchema } from "./sqlite-schema-sql-CKIqAlrf.mjs";
import { a as readDatabasePathIdentitySync } from "./sqlite-worker-identity-Dggu-rKK.mjs";
import { t as SqliteSnapshotCleanupError } from "./sqlite-readonly-location-cleanup-HvAn98XM.mjs";
import { i as tableExists } from "./openclaw-state-db-schema-helpers-C29HKgWe.mjs";
import { t as createSubsystemLogger } from "./subsystem-CeqVSEVi.mjs";
import { i as stageSqliteTransactionState, t as deferSqlitePostCommitPublication } from "./sqlite-post-commit-Dih1WMKX.mjs";
import { r as runSqliteDeferredTransactionSync } from "./sqlite-transaction-2VkikDo-.mjs";
import { t as coerceRequiredSqliteNumber } from "./sqlite-number-DZt1m75H.mjs";
import { n as sha256Hex } from "./node-crypto-BInnzoVt.mjs";
import "./crypto-digest-y6oZN-_F.mjs";
import { Dr as ZodError } from "./schemas-BOYIvvln.mjs";
import { r as prepareSqliteReadOnlyLocationSync } from "./sqlite-snapshot-source-DgqadUes.mjs";
import { D as assertOpenClawStateDatabaseOwner, r as openOpenClawStateReadConnection } from "./openclaw-state-db-read-connection-DJObJIAO.mjs";
import { o as isGatewayExternallySupervised } from "./gateway-supervision-fKhmwUVZ.mjs";
import { i as sameSqliteFileGeneration, r as readStableSqliteFileGeneration } from "./sqlite-file-generation-Z_oSlnyK.mjs";
import { y as requireOpenClawStateDatabaseIdentity } from "./openclaw-state-db-cache-IAib4pqp.mjs";
import { n as ok } from "./result-BQGgYouL.mjs";
import { i as requestSqliteWorkerOperationAdmission, r as deferSqliteWorkerCommitReceipt, s as takeSqliteWorkerOperationAdmissionAttachment } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { c as withExistingOpenClawStateDatabaseArtifactPreservingReadOnly, d as withExistingOpenClawStateDatabaseReadOnly, f as withOpenClawStateDatabaseReadOnly, o as withArtifactPreservingStateReads } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { T as upsertBoundDeliveryQueueEntryInDatabase, _ as bindDeliveryQueueEntry, f as OPENCLAW_STATE_SCHEMA_SQL, p as hasLiveDeliveryQueueClaim, x as loadDeliveryQueueEntryInDatabase } from "./openclaw-state-db-legacy-backfills-xddLXhvs.mjs";
import { o as isOpenClawStateWriteContentionError } from "./openclaw-state-ownership-1l-TMJat.mjs";
import { i as SkillUploadRequestError, o as WorkerSessionAlreadyAttachedError, t as encodeOpenClawStateWorkerError } from "./openclaw-state-worker-error-CvUWzlTD.mjs";
import { r as getSqliteWorkerStateContext } from "./sqlite-worker-state-context-KkU943i2.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase, u as runWithOpenClawStateBusyTimeout } from "./openclaw-state-db-DM-mSY0m.mjs";
import { d as ensureMcpOAuthPendingSchema, g as ensureSecretStoreSchema, v as ensureWorkerEnvironmentNodeEnrollmentSchema } from "./openclaw-state-db-schema-additive-Dxdw3FOE.mjs";
import "./update-run-legacy-expiry-BU1v4N5g.mjs";
import { t as finishUpdateRunRecord } from "./update-run-record-BCEjJm1u.mjs";
import { c as readDeferredPluginMigrations, d as recordDeferredPluginMigrationsInTransaction, o as readDeferredPluginMigrationCompletions, t as DeferredPluginMigrationConflictError } from "./deferred-plugin-migrations-Ds53ELH9.mjs";
import { n as readConfigMachineState, r as readConfigMachineStateRowInDatabase } from "./config-machine-state-BqX6N2Zu.mjs";
import { f as parseOfficialExternalPluginCatalogTimestamp, l as isOfficialExternalPluginCatalogRollback, n as HostedCatalogSignedFeedMonotonicityError, u as isOfficialExternalPluginCatalogSequence } from "./official-external-plugin-catalog-source-CqaCy6HX.mjs";
import { n as createSqliteAuditRecordKernel } from "./sqlite-audit-record-store-WaODeKFT.mjs";
import { r as upsertConfigSnapshotAuditRecordInDatabase } from "./config-journal-snapshot.kernel-BJSovrZl.mjs";
import { r as readConfigHealthSnapshotInDatabase, t as patchConfigHealthEntryInDatabase } from "./io.health-state.kernel-DmCHBLAj.mjs";
import { a as writeConfigMachineState, i as updateConfigMachineStateInDatabase, r as updateConfigMachineState, t as deleteConfigMachineState } from "./config-machine-state-write-tS4cIRjk.mjs";
import { n as readRemoteModelCatalog } from "./remote-store-Btflk7Yw.mjs";
import { t as runExistingOpenClawStateWriteTransaction } from "./openclaw-state-db-existing-write-Bs94uHSu.mjs";
import { i as inspectUpdateRunAbandonment, n as inspectNewerRecoveryHistory, s as needsPostCoreRepair } from "./update-run-activity-8Zl-pDYm.mjs";
import { i as persistRun, o as updateRunLedgerSchema, s as upsertStep } from "./update-run-write-rWyADCOZ.mjs";
import { o as readUpdateRunRecord, r as hasStoredUpdateRecovery, s as readUpdateRuns, t as canReconcileUpdateRunCandidates } from "./update-run-read.kernel-l3RrZ-g3.mjs";
import { i as replaceMcpOAuthStoreInDatabase, r as readMcpOAuthStoreInDatabase, t as MCP_OAUTH_PENDING_STATE_TTL_MS } from "./mcp-oauth-store.kernel-BKgn9Xzs.mjs";
import { n as applyMcpOAuthMutation } from "./mcp-oauth-store.mutations-DZoBeJ4v.mjs";
import { l as readAuthProfileRows, m as isMissingDatabasePath, n as SHARED_AUTH_STORE_STATE_KEY } from "./sqlite-json-CAAg0TX9.mjs";
import { _ as readAgentProvenanceBatchInDatabase, g as listAgentProvenanceInDatabase, h as ensureAgentProvenanceSchema } from "./agent-deletion-journal-C9BqqBYt.mjs";
import { i as withFreshOpenClawAgentDatabaseReadOnly } from "./openclaw-agent-db-readonly-open-BuSJ-FUr.mjs";
import { c as readRegisteredAgentDatabases } from "./openclaw-agent-db-registry-listing-DKcT5BJS.mjs";
import { a as generateSecureUuid } from "./secure-random-DiIgddjs.mjs";
import { C as UserProfileMergeError, D as ensureUserProfilesSchema, S as userProfilesDb, T as UserProfileOwnerError, a as inspectProfileAvatarInDatabase, c as projectUserProfileDisplay, f as selectProfileDisplayEntries, h as selectResolvedUserProfileMetadataById, m as selectResolvedUserProfileById, u as requireResolvedUserProfileMetadataById, w as UserProfileNotFoundError, y as toUserProfile } from "./user-profiles-internal-Co87Y1ZN.mjs";
import { c as readUserModelAuthProfile } from "./user-model-accounts-TezCccjj.mjs";
import { a as roleScopesAllow, i as resolveScopeOutsideRequestedRoles, r as resolveMissingRequestedScope } from "./operator-scope-compat-Ci6GBcmU.mjs";
import { A as readUserPreferences, E as selectStoredGitHubIdentities, M as writeUserPreferences, O as ensureUserPreferencesSchema, g as listUserProfilesSync, j as updatesGitCoauthorPreference, y as readUserProfileEmailBindings } from "./user-profile-list-y7DDikZX.mjs";
import { _ as validateWorkerInferenceTerminalOutcome } from "./worker-inference-DDewC2W1.mjs";
import { a as linkUserChannelIdentity, c as publishUserChannelPolicyInDatabase, f as unlinkUserChannelIdentity, n as UserChannelIdentityConflictError, p as userChannelIdentitySubject, r as authorizeUserChannelIdentityInDatabase } from "./user-channel-identities-CUKW0ayO.mjs";
import { d as setUserProfileRole, f as syncGitHubIdentity, n as ensureProfileForEmail, o as linkEmail, r as ensureProfileForTailscaleIdentity, s as mergeProfiles, t as ensureGatewayOwnerProfile } from "./user-profiles-BZfSkfNw.mjs";
import { c as parseFailedPayload, n as baseRecord, o as decodeClaimColumns, r as claimedRecord, t as FAILED_NULL_PAYLOAD_SENTINEL } from "./ingress-queue.codec-BSYlAVif.mjs";
import { c as pluginBlobDeleteExpiredKeyInDatabase, d as pluginBlobRegisterInDatabase, f as wrapPluginBlobError, l as pluginBlobDeleteInDatabase, n as pluginBlobWorkerOperations, o as pluginBlobClearInDatabase, s as pluginBlobDeleteExpiredInDatabase, t as isPluginBlobWorkerCommand, u as pluginBlobRegisterIfAbsentInDatabase } from "./plugin-blob-worker-contract-DFR2Crtc.mjs";
import { u as replaceWorkspaceAttestationInDatabase } from "./workspace-state-store.kernel-CyIpx4Yp.mjs";
import { t as readClawInstallSchemaVersionRows } from "./provenance-runtime-read.kernel-CC2k3vfe.mjs";
import { u as resolveSqliteSessionKey } from "./session-accessor.sqlite-scope-AxUEwRt8.mjs";
import { n as serializeCronLoadError } from "./load-error-Hk_r_XY_.mjs";
import { t as loadCronStoreFromDatabase } from "./load.kernel-D0YbW3jN.mjs";
import { i as recordCronRunInDatabase } from "./run-history.kernel--Y98rxfv.mjs";
import { c as resolveExecApprovalsDisplayPath } from "./exec-approvals-config-BF54IW19.mjs";
import { t as applyExecAuthorizationCommit } from "./exec-approvals-authorization.kernel-Db7QwOJk.mjs";
import { n as assertNoPendingLegacyExecApprovals } from "./exec-approvals-migration-gate-Buu906aC.mjs";
import { c as serializeExecApprovals, l as snapshotFromExecApprovalsRow, n as assertExecApprovalsMutationAllowed, t as ExecApprovalsMutationFencedError, u as writeExecApprovalsConfigRow } from "./exec-approvals-sqlite-B4bfpQoE.mjs";
import { p as snapshotFromExecApprovalsDatabase } from "./exec-approvals-store-D6OdMNqR.mjs";
import { a as normalizeDevicePublicKeyBase64Url } from "./device-identity-CkZMmlTW.mjs";
import { n as assertOpenClawStateLeaseWorkerOwnedInTransaction, r as assertOpenClawStateLeasesWorkerOwnedInTransaction } from "./openclaw-state-lease-worker-CDPqrA5D.mjs";
import { t as mutateSessionGroupCatalogInDatabase } from "./session-group-catalog.kernel-Cov7RRef.mjs";
import { c as legacyAcpMigrationBindingMatches, d as recordLegacyAcpMigrationCompletion, r as readLegacyAcpMigrationContextInDatabase } from "./session-accessor.sqlite-acp-provenance-CyWEIJx3.mjs";
import { r as persistInterruptedUpdateObservation } from "./update-run-interruption-store-D6ojtEY-.mjs";
import { n as normalizeDeviceAuthScopes } from "./device-auth-C-STNejO.mjs";
import { a as readDeviceAuthTokensFromDatabase, c as storeOriginDeviceTokenInDatabase, i as readDeviceAuthTokenObservationFromDatabase, n as clearOriginDeviceTokenInDatabase, o as readOriginDeviceTokenObservationFromDatabase, s as storeDeviceAuthTokenInDatabase, t as clearDeviceAuthTokenFromDatabase } from "./device-auth-store.kernel--BididKx.mjs";
import { n as purgeExpiredSecretStoreEntriesInDatabase } from "./secret-store-expiry.kernel-C6ejt1uu.mjs";
import { r as mergeSessionEntry } from "./types-DBHkhm7j.mjs";
import { a as isSessionStateUpstreamCurrentInDatabase, l as recordSessionStateEventInDatabase, n as hasSessionStateWatchersInDatabase, s as pruneSessionStateEventsInDatabase } from "./session-state-events.kernel-D8yu7kie.mjs";
import { t as listWatchedSessionUpstreamLinksInDatabase } from "./session-upstream-links.kernel-p__7blNX.mjs";
import { c as selectAcpSessionRow, l as selectAcpSessionRowForRead, n as buildAcpDatabaseSessionKey, s as resolveReadableAcpSessionRow, t as acpSessionRowMatchesEntry } from "./session-meta-keys-Cf_DSUTp.mjs";
import { i as resolveAcpSessionControlOwner, r as matchesAcpSessionRuntimeLocator, t as assertAcpSessionMutationEntry } from "./session-meta-entry.kernel-DrHH2dcF.mjs";
import { r as rowToAcpSessionMeta } from "./session-meta-readonly-Bf4Y50W_.mjs";
import { t as applyAcpSessionMutation } from "./session-meta-write.kernel-C-ccc3R8.mjs";
import { a as deleteDeliveryQueueEntryInDatabase, c as getDeliveryQueueEntriesOwnersInDatabase, d as prepareDeliveryQueueTerminalEntry, f as pruneExpiredDeliveryQueueTombstonesInDatabase, g as upsertDeliveryQueueEntryInDatabase, h as updateDeliveryQueueEntryInDatabase, l as getDeliveryQueueEntryOwnersInDatabase, m as terminalizePendingDeliveryQueueEntryInDatabase, n as completeLoadedDeliveryQueueEntryInDatabase, o as deliveryQueueEntryNotFoundError, p as reserveDeliveryQueueEntryAttemptInDatabase, r as countFailedDeliveryQueueEntriesInDatabase, s as expireStagingAndLoadDeliveryQueueEntriesInDatabase, t as completeDeliveryQueueEntryInDatabase, u as loadDeliveryQueueEntriesInDatabase } from "./delivery-queue-sqlite.kernel-B9U98VOY.mjs";
import { c as pruneCurrentConversationBindingListInTransaction, d as readCurrentConversationBindingSelectionInDatabase, f as updateCurrentConversationBindingRecordInDatabase, l as readCurrentConversationBindingListInDatabase, u as readCurrentConversationBindingResolutionInDatabase } from "./current-conversation-bindings.kernel-B2KGmM7n.mjs";
import { n as recordExecutionDecisionFactInDatabase, t as pruneExpiredExecutionDecisionFactsInDatabase } from "./execution-decision-facts-Ch1dY0Te.mjs";
import { r as processExecutionDecisionWorkInDatabase } from "./execution-decision-work-Bup1dI6D.mjs";
import { i as acceptedPreparedOutboundEntries, n as encodeOutboundDeliverySnapshot, r as projectOutboundDelivery, t as decodeOutboundDeliverySnapshot } from "./delivery-queue-projection-DGMogjeu.mjs";
import { a as promoteDeliveryQueueEntryPlatformSendInDatabase, i as dispatchDeliveryQueueEntryPlatformSendInDatabase, n as claimDeliveryQueueEntryPlatformSendInDatabase, o as renewDeliveryQueueEntryPlatformSendLeaseInDatabase, s as transitionOwnedDeliveryQueueEntryInDatabase } from "./delivery-queue-sqlite-claim.kernel-PhaUB18V.mjs";
import { n as collectEntrySpoolPaths } from "./delivery-queue-media-paths-Bz6d1hDo.mjs";
import { a as OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME, c as OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME, i as OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME, l as outboundDeliveryQueueName, n as DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME, o as OUTBOUND_DELIVERY_QUEUE_NAME, r as LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME, s as OUTBOUND_EXECUTABLE_QUEUE_NAMES } from "./delivery-queue-namespaces-DE2c296l.mjs";
import { t as hasActiveDeliveryOwner } from "./delivery-queue-types-BchW2gIY.mjs";
import { r as isFailedWorkerPlacementEnvironmentGone } from "./session-placement-lifecycle-BqtqNz6X.mjs";
import { r as normalizeChannel } from "./conversation-binding-session-key-CU5LTd0A.mjs";
import { c as normalizeIdentity, o as nextGeneration, u as normalizeWorkerPlacementExecutionMode } from "./placement-record-CfXaWmIw.mjs";
import { a as query$5, i as getRequired, t as ensureLocal } from "./placement-row-codec-VEfceuUb.mjs";
import { i as createWorkerEnvironmentCommitAdmission } from "./store-native-publication-PEwxtDg3.mjs";
import { a as normalizeBootstrapReceipt, c as normalizeRpcSetVersion, d as requireWorkerEnvironmentString, f as canTransitionWorkerEnvironment, i as normalizeAttachedSessionIds, l as normalizeSessionId, n as assertCredentialSessionBinding, o as normalizeCredentialHash, p as parseWorkerEnvironmentState, r as assertShape, s as normalizeExpiry, t as TERMINAL_STATES, u as normalizeWorkerSshEndpoint } from "./store-validation-DuOEOgFn.mjs";
import { c as isCurrentWorkerWorkspacePendingResultOwner, n as createPlacementWorkspaceResultOps, o as hasWorkerWorkspacePendingResult, u as readWorkerWorkspaceReconciliationFacts } from "./placement-workspace-result-fPBcZ3tM.mjs";
import { n as readWorkerPlacementMovesReadOnly } from "./placement-move-intent-Dt4RAeIf.mjs";
import { n as assertSessionWorkspaceUnreserved } from "./placement-workspace-reservation-BPEl88PB.mjs";
import { n as createPlacementTurnClaimOps } from "./placement-turn-claims-29eNxuPh.mjs";
import { c as workerEnvironmentPreparationColumns, o as readWorkerEnvironmentPreparation, r as createPreparedEnvironmentStoreOps, t as assertPreparedEnvironmentAttachment } from "./prepared-environment-store-Cc6aw6It.mjs";
import { t as SESSION_DELIVERY_QUEUE_NAME } from "./session-delivery-queue.records-CjQTBb2t.mjs";
import { _ as rowToSubagentRunRecord, d as upsertSubagentRunRowInDatabase, f as writeSubagentRunValuesInDatabase, g as bindSubagentRunRecord } from "./subagent-registry.store.sqlite-DQWBMoqK.mjs";
import { t as compareSubagentRunGeneration } from "./subagent-run-generation-DCkOHoP9.mjs";
import { t as mutateSubagentCompletionInDatabase } from "./subagent-completion-mutation.kernel-Bqg06zzb.mjs";
import { i as insertSandboxRegistryRowIfMissingInDatabase, u as writeSandboxRegistryInDatabase } from "./registry.kernel-gI4IBM7a.mjs";
import { A as utteranceFromRow, B as ensureMeetingTranscriptsSchema, C as readRecentStoppedTranscriptSession, D as sessionFromRow, E as readTranscriptSummaryKeys, H as TranscriptsSummaryChangedError, L as transcriptSessionExportKey, O as summaryFromRow, S as parseOptionalJsonRecord, T as readTranscriptSummaryInputRevision, V as TranscriptSessionConflictError, _ as parseTranscriptPendingExports, b as meetingTranscriptSessionQuery, d as queryTranscriptReadEntries, f as readLatestTranscriptEntry, g as parseTranscriptExportManifest, h as readTranscriptLibraryEntry, k as transcriptSummaryInputRevisionFromRow, m as readTranscriptEntry, p as readStoredTranscriptNotes, r as TranscriptLibraryError, t as createPreparedTranscriptDateReader, v as appendMeetingTranscriptUtterance, w as readStoredTranscriptSummaryRevision, x as meetingTranscriptUtteranceQuery, y as meetingTranscriptDb } from "./store-date-preparation-CgzfOoYj.mjs";
import { t as resolveNodePairApprovalScopes } from "./node-pairing-authz-KyMm4tmF.mjs";
import { n as hashSkillProposalRevision, t as hashSkillProposalContent } from "./proposal-hash-DFkV3A6F.mjs";
import { a as parseSkillProposalEvaluation, c as validateSkillProposalRecord, f as SKILL_WORKSHOP_ROLLBACK_SCHEMA, i as assertSkillProposalEvaluationWithinLimit, r as assertProposalId, s as parseSkillProposalRollback, t as MAX_SKILL_PROPOSAL_EVALUATION_BYTES } from "./store-record-Dxu22ebc.mjs";
import { n as ensureSkillWorkshopSchemaInDatabase } from "./store-sqlite-schema-Bxff4_rg.mjs";
import { _ as worktreeGcRevision, d as getRegistryWorktreeProvisionedChunkInDatabase, f as getRegistryWorktreeProvisionedPathsInDatabase, g as rowToRecord, h as listRegistryWorktreesInDatabase, l as WORKTREE_RECORD_COLUMNS, m as listLiveRegistryWorktreeIdsInDatabase, n as releaseWorktreeRunLeaseInDatabase, p as getRegistryWorktreeProvisionedStateInDatabase, s as reapWorktreeRunLeasesInDatabase, t as admitWorktreeRunLeaseInDatabase, u as getRegistryWorktreeInDatabase } from "./run-lease-store.kernel-BenxyUvM.mjs";
import { _ as resolveDeviceProfileScopes, c as deviceBootstrapProfilesEqual, f as normalizeDeviceBootstrapHandoffProfile, g as resolveDeviceProfileRoleScopes, m as resolveBootstrapProfileScopesForRole, p as normalizeDeviceBootstrapProfile, r as CONTROL_UI_OWNER_BOOTSTRAP_PROFILE } from "./device-bootstrap-profile-DV7lvW3L.mjs";
import { C as persistDevicePairingStoreState, D as updatePairedDeviceInTransaction, E as readPairedDevicePairingRecordsFromDatabase, O as withDevicePairingStoreDatabase, S as persistDeviceBootstrapTokenRecords, T as readDevicePairingStoreStateFromDatabase, _ as confirmDevicePairSetupCompletionDeliveryInTransaction, a as resolveNodePairingGeneration, b as loadDevicePairSetupCompletionRecord, c as loadDevicePairingStateForMutation, d as normalizeDevicePairingId, f as normalizeDevicePairingRole, g as sameDevicePairingStringSet, h as resolveRequestedDeviceRoles, k as resolveDevicePairingStoreRevision, l as mergeDevicePairingRoles, m as resolvePairingRequestExpiry, o as resolveNodePairingState, p as preserveDeviceRoleScopes, r as listApprovedPairedDeviceRoles, s as cloneDevicePairingTokens, t as clearNodePairingGenerationState, u as mergeDevicePairingScopes, v as consumeDeviceBootstrapTokenWithSetupCompletionInTransaction, w as pruneExpiredDevicePairSetupCompletionRecords, x as loadPairedDevicePairingStoreRecordFromDatabase, y as loadDeviceBootstrapTokenRecords } from "./device-pairing-identity-DEwtmAba.mjs";
import { n as nextApnsRegistrationVersion } from "./push-apns-store-transaction-ZePjrYjx.mjs";
import { r as pruneExpiredPending } from "./pairing-files-DdxuFZBY.mjs";
import { c as toPublicPendingRequest, i as samePendingApprovalSurface, o as toPairedNode, r as refreshPendingNodeSurface, s as toPendingSnapshot, t as buildPendingNodeSurface } from "./device-pairing-node.records-DLGJck_x.mjs";
import { i as nodeWorkerTurnMatchesIdentity } from "./node-supervisor-protocol-D9bUyOKY.mjs";
import { t as NodeWorkerPreparedWorkspaceKernel } from "./node-worker-prepared-workspace-store.kernel-BbG5RTJN.mjs";
import { t as prepareCronRunReceiptWriteSchema } from "./run-receipt-write-admission-C_bxAGc4.mjs";
import { i as saveCronStoreInDatabase, l as serializeCronSaveError, r as saveCronStoreChangesInDatabase } from "./save.kernel-BKRAPiix.mjs";
import { f as ensureCronRunReceiptSchema, l as bindCronRunReceiptExecutionInDatabase } from "./run-receipt-store-C5VImo6M.mjs";
import { t as DEVICE_BOOTSTRAP_TOKEN_TTL_MS } from "./device-bootstrap.worker-types-B_8ydFBr.mjs";
import { a as readNativeHookRelayBridgeSnapshotFromDatabase, i as pruneNativeHookRelayBridgeRecordsInDatabase, n as deleteNativeHookRelayBridgeRecordIfOwnedInDatabase, o as renewOrRestoreNativeHookRelayBridgeRecordInDatabase, r as listNativeHookRelayBridgeSnapshotsInDatabase, s as writeNativeHookRelayBridgeRecordInDatabase } from "./native-hook-relay-store.kernel-5nEdTSKA.mjs";
import { t as hasLocalWorkspaceProjectionInDatabase } from "./local-workspace-store-BWCmD7C5.mjs";
import { n as verifyPairingToken, t as generatePairingToken } from "./pairing-token-CzXJ-1-p.mjs";
import { n as resolveRoleTokenScopes, t as createDeviceAuthToken } from "./device-pairing-token-utils-DMt1Yqt3.mjs";
import { c as allocateHostPort } from "./cell-profile-CMF_XQjA.mjs";
import { a as updateProposal, i as readStoredProposalInDatabase, n as parseJson, r as parseSkillProposalRow, t as insertProposal } from "./store-sqlite-record-kn0pyZrp.mjs";
import { m as readApnsRegistrationsFromDatabase, p as readApnsRegistrationFromDatabase, v as apnsRegistrationToRow } from "./push-apns-store-CSxQW9m6.mjs";
import { n as isManagedImageRecordCommand, t as executeManagedImageRecordCommand } from "./managed-image-record-store.kernel-DA_OEjYO.mjs";
import { r as WebPushSubscriptionBindingError } from "./push-web-store.records-BrXjpBzn.mjs";
import { a as findBoundWebPushSubscriptionByEndpointInDatabase, c as listBoundWebPushSubscriptionsInDatabase, d as listWebPushSubscriptionsInDatabase, f as prepareWebPushApprovalDeliveriesInDatabase, h as upsertWebPushSubscriptionInDatabase, l as listTerminalWebPushApprovalDeliveryIdsInDatabase, m as setWebPushSubscriptionPreferencesInDatabase, n as deleteWebPushApprovalDeliveryTargetsInDatabase, o as hasBoundWebPushSubscriptionsInDatabase, p as readPersistedVapidKeyPairInDatabase, r as deleteWebPushSubscriptionIfCurrentInDatabase, s as insertVapidKeyPairIfAbsentInDatabase, t as deleteBoundWebPushSubscriptionInDatabase, u as listWebPushApprovalDeliveryTargetsInDatabase } from "./push-web-store.kernel-tQgaKGvg.mjs";
import { n as formatAuditWriterRequestError, t as formatAuditWriterError } from "./audit-event-writer.errors-Dcf_5Est.mjs";
import { a as removeProjectRegistryInDatabase, c as resolveRecordedProjectRootInDatabase, n as insertProjectRegistryInDatabase, o as resolveProjectCloneRefreshOwnerInDatabase, r as listProjectRegistryInDatabase, s as resolveProjectRegistryInDatabase, t as ensureProjectRegistrySchema } from "./project-registry.kernel-CDYR2szp.mjs";
import { t as isOnboardingRecommendationWriteCommand } from "./onboarding-recommendations.contract.js";
import { h as getOperatorApprovalResolutionKey } from "./operator-approval-store.transitions-Cacs2TdE.mjs";
import { n as isOperatorApprovalOperation, t as executeOperatorApprovalOperation } from "./operator-approval-store.operations-Ylb0OAGL.mjs";
import { c as AUDIT_EVENT_RETENTION_MS, d as recordAuditEventInDatabase, f as rowToAuditEvent, n as processExecutionIdentityAdmissionWorkInDatabase, o as pruneExpiredOutboundMessageProgressInDatabase, p as isOutboundMessageProgressInput, r as pruneExpiredExecutionIdentityContextsInDatabase, s as recordOutboundMessageProgressInDatabase, u as pruneExpiredAuditEventsInDatabase } from "./execution-identity-context-D1Y_Xgc7.mjs";
import { t as prepareDevicePairingBinding } from "./device-pairing-binding-5Ql6Z7mg.mjs";
import { t as matchesWorkerPlacementTarget } from "./placement-reclaim-contract-BNCBrypU.mjs";
import { a as deleteSkillUploadState, c as renewSkillUploadInstallLease, d as selectSkillUploadMetadata, i as deleteOwnedSkillUpload, l as requireUploadMetadata, n as assertNotExpired, o as hasLiveSkillUploadInstallLease, r as deleteExpiredSkillUploadUnlessLeasedInDatabase, s as readSkillUploadArchiveChunks, t as SKILL_UPLOAD_LEASE_SCOPE } from "./upload-store.sqlite-BsX_vTyg.mjs";
import { r as readPendingRepositoryGitHubPublicationInDatabase } from "./github-repository-publication.kernel-BpXCb5QQ.mjs";
import { t as normalizeWorkerDesktopEndpoint } from "./desktop-endpoint-Ch_NTZeg.mjs";
import { a as upsertDeliveryQueueEntryOnceAcrossNamespacesInDatabase, i as replacePendingDeliveryQueueEntryInDatabase, n as completePendingDeliveryQueueEntryInDatabase, r as movePendingDeliveryQueueEntryNamespaceInDatabase, t as commitStagedDeliveryQueueEntryOnceAcrossNamespacesInDatabase } from "./delivery-queue-sqlite-namespace.kernel-BsXLxue8.mjs";
import fs from "node:fs";
import path from "node:path";
import { AsyncLocalStorage } from "node:async_hooks";
import { isDeepStrictEqual } from "node:util";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { MessageChannel, receiveMessageOnPort } from "node:worker_threads";
//#region src/acp/runtime/session-meta-source.worker.ts
/** Reuse the metadata writer's exact physical-source and lifecycle admission. */
function readAcpSessionSourceInWorker(input, phase) {
	const source = input.source;
	const assertSource = () => {
		const observed = readDatabasePathIdentitySync(source.path);
		if (observed.key !== source.identity.key || observed.canonicalPath !== source.identity.canonicalPath || observed.birthtime !== source.identity.birthtime) throw new Error(`Canonical ACP session changed before ${phase}.`);
	};
	assertSource();
	const read = withFreshOpenClawAgentDatabaseReadOnly((agent) => readLegacyAcpMigrationContextInDatabase(agent, resolveSqliteSessionKey(input.sessionKey, input.agentId)), {
		agentId: source.agentId,
		path: source.path,
		env: getSqliteWorkerStateContext().environment
	});
	assertSource();
	if (!read.found && read.reason !== "database-missing") throw new Error("Canonical ACP session is unavailable before source consumption");
	const current = read.found ? read.value : {
		entry: void 0,
		sources: []
	};
	assertAcpSessionMutationEntry(current.entry, input.entry ?? null, input.expectedControlBinding, phase);
	return current;
}
/** Session mutations consume current rows; this constraint never grants authority. */
function readAcpSessionControlInWorker(database, input) {
	const shared = readDatabasePathIdentitySync(database.path);
	if (shared.key !== input.sharedSource.identity.key || shared.canonicalPath !== input.sharedSource.identity.canonicalPath || shared.birthtime !== input.sharedSource.identity.birthtime) throw new Error("Canonical ACP metadata source changed before control read.");
	const { entry } = readAcpSessionSourceInWorker(input, "control read");
	if (resolveAcpSessionControlOwner(entry) !== input.ownerKey) throw new Error("Canonical ACP session owner changed before control read.");
	const row = resolveReadableAcpSessionRow({
		row: selectAcpSessionRowForRead(database.db, {
			...input.read,
			entry
		}),
		entry
	});
	if (input.runtimeLocator && !matchesAcpSessionRuntimeLocator(row ? {
		backend: row.backend,
		runtimeSessionName: row.runtime_session_name
	} : void 0, input.runtimeLocator)) throw new Error("Canonical ACP runtime locator changed before control read.");
	return {
		entry,
		row
	};
}
//#endregion
//#region src/acp/runtime/session-meta-write.worker.ts
function executeAcpSessionMutationInWorker(database, command) {
	return command.type === "acp.prepareMutation" ? prepareAcpSessionMutationInWorker(database, command.input) : commitAcpSessionMutationInWorker(database, command.input);
}
function readControlledAcpSessionMutation(database, control) {
	const { entry, row } = readAcpSessionControlInWorker(database, control);
	if (!entry || !row) throw new Error("ACP controlled metadata is no longer present before mutation");
	const destination = selectAcpSessionRow(database.db, buildAcpDatabaseSessionKey(control.sessionKey, control.agentId));
	if (destination && !acpSessionRowMatchesEntry(destination, entry)) throw new Error("ACP controlled metadata destination binding changed before mutation");
	return {
		entry,
		row
	};
}
function prepareAcpSessionMutationInWorker(database, input) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const controlled = input.control ? readControlledAcpSessionMutation(database, input.control) : void 0;
		const { entry } = controlled ?? readAcpSessionSourceInWorker(input, "metadata preparation");
		if (controlled) assertAcpSessionMutationEntry(entry, input.entry ?? null, input.expectedControlBinding, "metadata preparation");
		const row = controlled?.row ?? selectAcpSessionRowForRead(db, {
			...input.read,
			entry
		});
		const preparation = {
			entry,
			current: row ? rowToAcpSessionMeta(row) : void 0,
			currentRowKey: row?.session_key,
			currentRowSessionId: row?.session_id,
			preparedEntry: mergeSessionEntry(entry, {
				updatedAt: input.updatedAt,
				...entry ? {} : { lifecycleRevision: randomUUID() }
			})
		};
		const { port1, port2 } = new MessageChannel();
		try {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: {
					nonce: input.nonce,
					preparation,
					preparationPort: port2
				}
			}, [port2]);
			if (!receiveMessageOnPort(port1)?.message) throw new Error("ACP metadata callback returned no admitted decision");
			requestSqliteWorkerOperationAdmission({
				stage: "commit",
				facts: { nonce: input.nonce }
			});
			return preparation;
		} finally {
			port1.close();
			port2.close();
		}
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "acp.metadata.prepare" });
}
function consumeSources(database, input) {
	const current = readAcpSessionSourceInWorker(input, "legacy source consumption");
	for (const source of current.sources) if (legacyAcpMigrationBindingMatches(source, current.entry)) recordLegacyAcpMigrationCompletion(database.db, source, input.updatedAt);
}
function commitAcpSessionMutationInWorker(database, input) {
	return runOpenClawStateWriteTransaction((current) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: { nonce: input.nonce }
		});
		if (input.control) {
			const { row } = readControlledAcpSessionMutation(current, input.control);
			if (row.session_key !== input.currentRowKey || row.session_id !== input.currentRowSessionId) throw new Error("ACP controlled metadata binding changed before commit");
		}
		consumeSources(current, input);
		const db = current.db;
		applyAcpSessionMutation(db, input);
		const receipt = { nonce: input.nonce };
		deferSqliteWorkerCommitReceipt(db, receipt);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: receipt
		});
		return receipt;
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "acp.metadata.commit" });
}
//#endregion
//#region src/agents/harness/native-hook-relay-store.worker.ts
function executeNativeHookRelayMutation(command, options) {
	return runOpenClawStateWriteTransaction((database) => {
		switch (command.type) {
			case "nativeHookRelay.write":
			case "nativeHookRelay.renew":
				requestSqliteWorkerOperationAdmission({
					stage: "transaction",
					facts: void 0
				});
				return command.type === "nativeHookRelay.write" ? writeNativeHookRelayBridgeRecordInDatabase(database, command.input) : renewOrRestoreNativeHookRelayBridgeRecordInDatabase(database, command.input);
			case "nativeHookRelay.deleteOwned": return deleteNativeHookRelayBridgeRecordIfOwnedInDatabase(database, command.input);
			case "nativeHookRelay.prune": return pruneNativeHookRelayBridgeRecordsInDatabase(database, command.input.candidates, command.input.nowMs);
		}
	}, options);
}
//#endregion
//#region src/agents/mcp-oauth-store.worker.ts
/** Select this feature's commands from the typed shared-state wire contract. */
function isMcpOAuthWorkerCommand(command) {
	switch (command.type) {
		case "mcpOAuth.read":
		case "mcpOAuth.mutate":
		case "mcpOAuth.consumePending":
		case "mcpOAuth.writePending":
		case "mcpOAuth.deletePending":
		case "mcpOAuth.clear":
		case "mcpOAuth.clearPendingPrefix": return true;
		default: return false;
	}
}
function assertStoreLease(database, input, stage = "transaction") {
	if (input.identity.scope !== "core:mcp-oauth" || input.identity.key !== input.storeKey) throw new Error("MCP OAuth mutation requires its exact store lease");
	assertOpenClawStateLeaseWorkerOwnedInTransaction(database, input.identity, "write", stage);
}
const pendingSchemaDatabases = /* @__PURE__ */ new WeakSet();
function ensurePendingSchema(database) {
	if (pendingSchemaDatabases.has(database)) return;
	ensureMcpOAuthPendingSchema(database);
	deferSqlitePostCommitPublication(database, () => pendingSchemaDatabases.add(database));
}
/** Keep feature reads and writes on the shared-state worker's retained database. */
function executeMcpOAuthWorkerCommand(database, command) {
	if (command.type === "mcpOAuth.read") return readMcpOAuthStoreInDatabase(database.db, command.input);
	return runOpenClawStateWriteTransaction(({ db }) => {
		const result = executeMcpOAuthWriteInTransaction(db, command);
		if (command.type === "mcpOAuth.clearPendingPrefix") requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		else assertStoreLease(db, command.input, "commit");
		return result;
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	});
}
function executeMcpOAuthWriteInTransaction(database, command) {
	const kysely = getNodeSqliteKysely(database);
	if (command.type === "mcpOAuth.clearPendingPrefix") {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		ensurePendingSchema(database);
		executeSqliteQuerySync(database, kysely.deleteFrom("mcp_oauth_pending_authorizations").where("store_key", "like", `${command.input}%`));
		return;
	}
	const { storeKey } = command.input;
	const assertOwned = () => assertStoreLease(database, command.input);
	if (command.type === "mcpOAuth.mutate") {
		const result = applyMcpOAuthMutation(readMcpOAuthStoreInDatabase(database, storeKey), command.input.mutation);
		replaceMcpOAuthStoreInDatabase(database, storeKey, result.store, assertOwned);
		return result;
	}
	assertOwned();
	ensurePendingSchema(database);
	const deletePending = () => {
		assertOwned();
		executeSqliteQuerySync(database, kysely.deleteFrom("mcp_oauth_pending_authorizations").where("store_key", "=", storeKey));
	};
	switch (command.type) {
		case "mcpOAuth.consumePending":
			assertOwned();
			return executeSqliteQuerySync(database, kysely.deleteFrom("mcp_oauth_pending_authorizations").where("store_key", "=", storeKey).where("state", "=", command.input.state).where("create_time", ">", Date.now() - MCP_OAUTH_PENDING_STATE_TTL_MS)).numAffectedRows === 1n;
		case "mcpOAuth.writePending": {
			const now = Date.now();
			assertOwned();
			executeSqliteQuerySync(database, kysely.deleteFrom("mcp_oauth_pending_authorizations").where("create_time", "<=", now - MCP_OAUTH_PENDING_STATE_TTL_MS));
			deletePending();
			assertOwned();
			executeSqliteQuerySync(database, kysely.insertInto("mcp_oauth_pending_authorizations").values({
				state: command.input.state,
				store_key: storeKey,
				create_time: now
			}));
			return;
		}
		case "mcpOAuth.deletePending":
			deletePending();
			return;
		case "mcpOAuth.clear":
			replaceMcpOAuthStoreInDatabase(database, storeKey, { credentialState: "cleared" }, assertOwned);
			deletePending();
			return;
	}
	throw new Error("Unknown MCP OAuth write command");
}
//#endregion
//#region src/agents/sandbox/registry-import.worker.ts
function importSandboxRegistryRow(row, options) {
	runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		insertSandboxRegistryRowIfMissingInDatabase(db, row);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
	}, options);
}
//#endregion
//#region src/agents/sandbox/registry-write.worker.ts
function writeSandboxRegistry(write, options) {
	runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		writeSandboxRegistryInDatabase(db, write);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
	}, options, { operationLabel: `sandbox.registry.${write.operation}` });
}
//#endregion
//#region src/agents/worktrees/registry-read.worker.ts
function isWorktreeRegistryReadCommand(command) {
	switch (command.type) {
		case "worktrees.get":
		case "worktrees.list":
		case "worktrees.liveIds":
		case "worktrees.provisionedPaths":
		case "worktrees.provisionedState":
		case "worktrees.provisionedChunk": return true;
		default: return false;
	}
}
function executeWorktreeRegistryReadCommand(database, command) {
	if (command.type === "worktrees.get") return getRegistryWorktreeInDatabase(database, command.input.id);
	if (command.type === "worktrees.list") return listRegistryWorktreesInDatabase(database, command.input);
	if (command.type === "worktrees.liveIds") return listLiveRegistryWorktreeIdsInDatabase(database);
	if (command.type === "worktrees.provisionedPaths") return getRegistryWorktreeProvisionedPathsInDatabase(database, command.input.id);
	if (command.type === "worktrees.provisionedState") return getRegistryWorktreeProvisionedStateInDatabase(database, command.input.id);
	return getRegistryWorktreeProvisionedChunkInDatabase(database, command.input);
}
//#endregion
//#region src/agents/worktrees/registry-retirement.worker.ts
function deferWorktreeCleanupInWorker({ observed, reason }, options) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const current = getRegistryWorktreeInDatabase(db, observed.id);
		const revision = worktreeGcRevision(observed);
		if (!current || current.removedAt !== void 0 || worktreeGcRevision(current) !== revision) return false;
		executeSqliteQuerySync(db, getNodeSqliteKysely(db).updateTable("worktrees").set({ gc_protection_json: reason === null ? null : JSON.stringify({
			revision,
			reason
		}) }).where("id", "=", observed.id));
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return true;
	}, options, { operationLabel: "worktrees.deferCleanup" });
}
function retireMissingWorktreeInWorker({ observed, removedAt }, options) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		if (hasLocalWorkspaceProjectionInDatabase(db, observed.id)) return {
			record: getRegistryWorktreeInDatabase(db, observed.id),
			protection: "local-workspace-projection"
		};
		const retired = executeSqliteQuerySync(db, getNodeSqliteKysely(db).updateTable("worktrees").set({ removed_at: removedAt }).where("id", "=", observed.id).where("removed_at", "is", null).where((eb) => eb.or([eb("snapshot_ref", "is", null), eb("snapshot_ref", "not like", "refs/openclaw/snapshots/exact-%")])).where("path", "=", observed.path).where("last_active_at", "=", observed.lastActiveAt).where("repo_root", "=", observed.repoRoot).where("repo_fingerprint", "=", observed.repoFingerprint).returning(WORKTREE_RECORD_COLUMNS)).rows[0];
		const record = retired ? rowToRecord(retired) : getRegistryWorktreeInDatabase(db, observed.id);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return { record };
	}, options, { operationLabel: "worktrees.retireMissing" });
}
//#endregion
//#region src/agents/worktrees/run-lease-store.worker.ts
function executeWorktreeRunLeaseCommand(command, options) {
	runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		if (command.type === "worktrees.admitRunLease") admitWorktreeRunLeaseInDatabase(db, command.input);
		else if (command.type === "worktrees.reapRunLeases") reapWorktreeRunLeasesInDatabase(db, command.input.scopes);
		else releaseWorktreeRunLeaseInDatabase(db, command.input.worktreeId, command.input.token);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
	}, options, { operationLabel: command.type });
}
//#endregion
//#region src/agents/worktrees/dispatch.worker.ts
function isWorktreeWorkerCommand(command) {
	return isWorktreeRegistryReadCommand(command) || command.type === "worktrees.retireMissing" || command.type === "worktrees.deferCleanup" || command.type === "worktrees.admitRunLease" || command.type === "worktrees.releaseRunLease" || command.type === "worktrees.reapRunLeases";
}
function executeWorktreeWorkerCommand(command, options) {
	if (isWorktreeRegistryReadCommand(command)) return executeWorktreeRegistryReadCommand(options.database.db, command);
	if (command.type === "worktrees.retireMissing") return retireMissingWorktreeInWorker(command.input, options);
	if (command.type === "worktrees.deferCleanup") return deferWorktreeCleanupInWorker(command.input, options);
	return executeWorktreeRunLeaseCommand(command, options);
}
//#endregion
//#region src/audit/audit-event-read.kernel.ts
/** Connection-bound query kernel; production list reads execute only in the state worker. */
function listAuditEventsInDatabase(db, params) {
	const filters = params.filters ?? {};
	const retainedAfter = params.now - AUDIT_EVENT_RETENTION_MS;
	let query = getNodeSqliteKysely(db).selectFrom("audit_events").selectAll().where("occurred_at", ">=", retainedAfter).where("action", "not in", ["message.outbound.queued", "message.outbound.platform-started"]);
	if (params.cursor !== void 0) query = query.where("sequence", "<", params.cursor);
	if (filters.agentId) query = query.where("agent_id", "=", filters.agentId);
	if (filters.sessionKey) query = query.where("session_key", "=", filters.sessionKey);
	if (filters.runId) query = query.where("run_id", "=", filters.runId);
	if (filters.kind) query = query.where("kind", "=", filters.kind);
	else if (filters.includeMessages !== true) query = query.where("kind", "!=", "message");
	if (filters.status) query = query.where("status", "=", filters.status);
	if (filters.direction) query = query.where("direction", "=", filters.direction);
	if (filters.channel) query = query.where("channel", "=", filters.channel);
	if (filters.after !== void 0) query = query.where("occurred_at", ">=", filters.after);
	if (filters.before !== void 0) query = query.where("occurred_at", "<=", filters.before);
	const rows = executeSqliteQuerySync(db, query.orderBy("sequence", "desc").limit(params.limit + 1)).rows;
	const hasMore = rows.length > params.limit;
	const events = (hasMore ? rows.slice(0, params.limit) : rows).map(rowToAuditEvent);
	return {
		events,
		...hasMore && events.length > 0 ? { nextCursor: events[events.length - 1]?.sequence } : {}
	};
}
//#endregion
//#region src/audit/audit-event-writer.worker.ts
/** Execute one FIFO attempt on the shared actor, including fail-fast first use. */
function executeAuditWriterCommand(command, options, retainDatabase) {
	try {
		return runWithOpenClawStateBusyTimeout(() => {
			const database = {
				...options,
				database: retainDatabase()
			};
			if (command.type === "audit.writer.prune") {
				const maintenance = {
					events: pruneExpiredAuditEventsInDatabase,
					identity: pruneExpiredExecutionIdentityContextsInDatabase,
					decisions: pruneExpiredExecutionDecisionFactsInDatabase,
					progress: pruneExpiredOutboundMessageProgressInDatabase
				}[command.input];
				return {
					status: "settled",
					deleted: maintenance({ database })
				};
			}
			const request = command.input;
			if (request.type === "record-event") {
				if (isOutboundMessageProgressInput(request.input)) recordOutboundMessageProgressInDatabase(request.input, database);
				else recordAuditEventInDatabase(request.input, database);
			} else if (request.type === "record-execution-identity") processExecutionIdentityAdmissionWorkInDatabase(request.work, database);
			else if (request.type === "record-execution-decision-work") processExecutionDecisionWorkInDatabase(request.work, database);
			else recordExecutionDecisionFactInDatabase(request.receipt, database);
			return { status: "settled" };
		}, options, 0);
	} catch (error) {
		if (isOpenClawStateWriteContentionError(error)) return { status: "retry" };
		return {
			status: "settled",
			error: command.type === "audit.writer.process" ? formatAuditWriterRequestError(command.input, error) : formatAuditWriterError(error)
		};
	}
}
//#endregion
//#region src/channels/message/ingress-queue.kernel.ts
const getQueue = (db) => getNodeSqliteKysely(db);
const affectedRows = (result) => Number(result.numAffectedRows ?? 0n);
const LIST_PENDING_BATCH_SIZE = 100;
function normalizeLimit$1(limit) {
	return limit === "all" ? Number.MAX_SAFE_INTEGER : Math.max(1, Math.floor(limit ?? 100));
}
function selectRow(db, queueName, id) {
	return executeSqliteQueryTakeFirstSync(db, getQueue(db).selectFrom("channel_ingress_events").selectAll().where("queue_name", "=", queueName).where("event_id", "=", id));
}
function readChannelIngressClaimSnapshotInDatabase(db, input) {
	const base = getQueue(db).selectFrom("channel_ingress_events").selectAll().where("queue_name", "=", input.queueName);
	const claimed = input.candidateIds?.length ? executeSqliteQuerySync(db, base.where("status", "=", "claimed").where("event_id", "in", input.candidateIds).orderBy("event_id", "asc")).rows : [];
	if (input.candidateIds?.length === 0) return {
		pending: [],
		claimed
	};
	let pending = base.where("status", "=", "pending");
	if (input.candidateIds) pending = pending.where("event_id", "in", input.candidateIds);
	const blocked = [.../* @__PURE__ */ new Set([...input.blockedLaneKeys, ...claimed.flatMap((row) => row.lane_key ? [row.lane_key] : [])])];
	if (!input.deriveLaneKey && blocked.length) pending = pending.where((eb) => eb.or([eb("lane_key", "is", null), eb("lane_key", "not in", blocked)]));
	const ordered = input.orderBy === "id" ? pending.orderBy("event_id", "asc") : pending.orderBy("received_at", "asc").orderBy("event_id", "asc");
	return {
		claimed,
		pending: executeSqliteQuerySync(db, ordered.limit(normalizeLimit$1(input.scanLimit) + 100)).rows
	};
}
function tombstoneCorruptRow(db, row, now, reason) {
	executeSqliteQuerySync(db, getQueue(db).updateTable("channel_ingress_events").set((eb) => ({
		status: "failed",
		failed_at: now,
		failed_reason: reason,
		last_error: null,
		...reason === "corrupt_payload" ? {
			payload_json: "null",
			metadata_json: null
		} : { payload_json: eb.case().when("payload_json", "=", "null").then(FAILED_NULL_PAYLOAD_SENTINEL).else(eb.ref("payload_json")).end() },
		claim_token: null,
		claim_owner: null,
		claimed_at: null,
		updated_at: now
	})).where("queue_name", "=", row.queue_name).where("event_id", "=", row.event_id));
}
function enqueueChannelIngressInDatabase(db, input) {
	const inserted = executeSqliteQuerySync(db, getQueue(db).insertInto("channel_ingress_events").values({
		queue_name: input.queueName,
		event_id: input.id,
		channel_id: input.channelId,
		account_id: input.accountId,
		status: "pending",
		lane_key: input.laneKey ?? null,
		payload_json: input.payloadJson,
		metadata_json: input.metadataJson,
		received_at: input.receivedAt,
		updated_at: input.now,
		attempts: 0
	}).onConflict((conflict) => conflict.columns(["queue_name", "event_id"]).doNothing()));
	let row = selectRow(db, input.queueName, input.id);
	if (!row) throw new Error(`Failed to read channel ingress event ${input.queueName}/${input.id}`);
	const accepted = affectedRows(inserted) > 0;
	if (accepted && !baseRecord(row)) throw new Error(`Corrupt payload_json in channel ingress event ${input.queueName}/${input.id}`);
	if (row.status === "claimed" && !claimedRecord(row)) throw new Error(`Corrupt claimed channel ingress event ${input.queueName}/${input.id}`);
	if (row.status === "pending" && !baseRecord(row)) {
		tombstoneCorruptRow(db, row, input.now, "corrupt_payload");
		row = selectRow(db, input.queueName, input.id);
		if (!row) throw new Error(`Failed to read corrupt ingress tombstone ${input.queueName}/${input.id}`);
	}
	return {
		accepted,
		row
	};
}
function claimChannelIngressInDatabase(db, input, now = Date.now) {
	const transitionAt = now();
	const row = selectRow(db, input.queueName, input.id);
	if (!row || row.status !== "pending") return null;
	if (!baseRecord(row)) {
		tombstoneCorruptRow(db, row, transitionAt, "corrupt_payload");
		return null;
	}
	executeSqliteQuerySync(db, getQueue(db).updateTable("channel_ingress_events").set({
		status: "claimed",
		claim_token: randomUUID(),
		claim_owner: input.ownerId,
		claimed_at: transitionAt,
		updated_at: transitionAt,
		...input.laneKey ? { lane_key: input.laneKey } : {}
	}).where("queue_name", "=", input.queueName).where("event_id", "=", input.id).where("status", "=", "pending"));
	return selectRow(db, input.queueName, input.id) ?? null;
}
function claimNextChannelIngressInDatabase(db, input, now = Date.now) {
	const current = readChannelIngressClaimSnapshotInDatabase(db, input.request);
	if (JSON.stringify(current) !== JSON.stringify(input.snapshot)) return { kind: "conflict" };
	const transitionAt = now();
	const corrupt = new Set(input.selection.corruptIds);
	for (const row of current.pending) if (corrupt.has(row.event_id)) tombstoneCorruptRow(db, row, transitionAt, "corrupt_payload");
	const selected = input.selection.selected;
	return {
		kind: "claimed",
		row: selected ? claimChannelIngressInDatabase(db, {
			queueName: input.request.queueName,
			...selected,
			ownerId: input.ownerId
		}, () => transitionAt) : null
	};
}
function recoverChannelIngressClaimInDatabase(db, input) {
	const current = selectRow(db, input.row.queue_name, input.row.event_id);
	if (!current || JSON.stringify(current) !== JSON.stringify(input.row)) return false;
	const claim = decodeClaimColumns(current);
	if (!claim || !claimedRecord(current)) {
		tombstoneCorruptRow(db, current, input.now, claim ? "corrupt_payload" : "corrupt_claim");
		return true;
	}
	return affectedRows(executeSqliteQuerySync(db, getQueue(db).updateTable("channel_ingress_events").set((eb) => ({
		status: "pending",
		claim_token: null,
		claim_owner: null,
		claimed_at: null,
		attempts: eb("attempts", "+", 1),
		last_attempt_at: input.now,
		updated_at: input.now
	})).where("queue_name", "=", current.queue_name).where("event_id", "=", current.event_id).where("status", "=", "claimed").where("claim_token", "=", claim.token).where("claimed_at", "<=", input.cutoff))) > 0;
}
function selectedMutation(db, input) {
	const base = getQueue(db).updateTable("channel_ingress_events").where("queue_name", "=", input.queueName).where("event_id", "=", input.id);
	return input.token === null ? base.where("status", "=", "pending") : base.where("status", "=", "claimed").where("claim_token", "=", input.token);
}
function refreshChannelIngressClaimInDatabase(db, input) {
	return affectedRows(executeSqliteQuerySync(db, selectedMutation(db, input).set({
		claimed_at: input.now,
		updated_at: input.now
	}))) > 0;
}
function completeChannelIngressInDatabase(db, input) {
	const update = executeSqliteQuerySync(db, selectedMutation(db, input).set({
		status: "completed",
		completed_at: input.now,
		completed_metadata_json: input.metadataJson,
		payload_json: "null",
		metadata_json: null,
		claim_token: null,
		claim_owner: null,
		claimed_at: null,
		last_attempt_at: null,
		last_error: null,
		updated_at: input.now
	}));
	if (affectedRows(update) > 0) return true;
	if (input.token !== null) return false;
	return affectedRows(executeSqliteQuerySync(db, getQueue(db).insertInto("channel_ingress_events").values({
		queue_name: input.queueName,
		event_id: input.id,
		channel_id: input.channelId,
		account_id: input.accountId,
		status: "completed",
		lane_key: null,
		payload_json: "null",
		metadata_json: null,
		received_at: input.now,
		updated_at: input.now,
		attempts: 0,
		completed_at: input.now,
		completed_metadata_json: input.metadataJson
	}).onConflict((conflict) => conflict.columns(["queue_name", "event_id"]).doNothing()))) > 0;
}
function releaseChannelIngressInDatabase(db, input) {
	return affectedRows(executeSqliteQuerySync(db, selectedMutation(db, input).set((eb) => ({
		status: "pending",
		claim_token: null,
		claim_owner: null,
		claimed_at: null,
		...input.recordAttempt === false ? {} : {
			attempts: eb("attempts", "+", 1),
			last_attempt_at: input.now
		},
		...input.lastError === void 0 ? {} : { last_error: input.lastError },
		updated_at: input.now
	})))) > 0;
}
function failChannelIngressInDatabase(db, input) {
	return affectedRows(executeSqliteQuerySync(db, selectedMutation(db, input).set((eb) => ({
		status: "failed",
		failed_at: input.now,
		failed_reason: input.reason,
		last_error: input.message ?? null,
		payload_json: eb.case().when("payload_json", "=", "null").then(FAILED_NULL_PAYLOAD_SENTINEL).else(eb.ref("payload_json")).end(),
		claim_token: null,
		claim_owner: null,
		claimed_at: null,
		updated_at: input.now
	})))) > 0;
}
function pruneChannelIngressInDatabase(db, input) {
	const kysely = getQueue(db);
	const protectedIds = (input.options.protectIds ?? []).map((id) => id.trim()).filter(Boolean);
	const protectedMaxIds = protectedIds.filter((id) => id.isWellFormed());
	let deleted = 0;
	const policies = [
		{
			status: "pending",
			column: "updated_at",
			ttl: input.options.pendingTtlMs,
			max: input.options.pendingMaxEntries
		},
		{
			status: "completed",
			column: "completed_at",
			ttl: input.options.completedTtlMs,
			max: input.options.completedMaxEntries
		},
		{
			status: "failed",
			column: "failed_at",
			ttl: input.options.failedTtlMs,
			max: input.options.failedMaxEntries
		}
	];
	for (const policy of policies) {
		if (policy.ttl !== void 0) {
			let query = kysely.deleteFrom("channel_ingress_events").where("queue_name", "=", input.queueName).where("status", "=", policy.status).where(policy.column, "<", input.now - policy.ttl);
			if (protectedIds.length) query = query.where("event_id", "not in", protectedIds);
			deleted += affectedRows(executeSqliteQuerySync(db, query));
		}
		if (policy.max === void 0) continue;
		const candidates = kysely.selectFrom("channel_ingress_events").select("event_id").where("queue_name", "=", input.queueName).where("status", "=", policy.status).orderBy("updated_at", "desc").orderBy("event_id", "desc").limit(500).offset(Math.max(0, Math.floor(policy.max)));
		let query = kysely.deleteFrom("channel_ingress_events").where("queue_name", "=", input.queueName).where("status", "=", policy.status).where("event_id", "in", candidates);
		if (protectedMaxIds.length) query = query.where("event_id", "not in", sqliteStringSet(protectedMaxIds));
		while (true) {
			const removed = affectedRows(executeSqliteQuerySync(db, query));
			if (!removed) break;
			deleted += removed;
		}
	}
	return deleted;
}
function listStaleChannelIngressClaimsInDatabase(db, input) {
	return executeSqliteQuerySync(db, getQueue(db).selectFrom("channel_ingress_events").selectAll().where("queue_name", "=", input.queueName).where("status", "=", "claimed").where((eb) => eb.or([
		eb("claimed_at", "<=", input.cutoff),
		eb("claimed_at", "is", null),
		eb("claim_token", "is", null),
		eb("claim_owner", "is", null),
		eb("claim_token", "=", ""),
		eb("claim_owner", "=", "")
	]))).rows;
}
function deleteChannelIngressInDatabase(db, input) {
	const base = getQueue(db).deleteFrom("channel_ingress_events").where("queue_name", "=", input.queueName).where("event_id", "=", input.id);
	return affectedRows(executeSqliteQuerySync(db, input.token === null ? base.where("status", "=", "pending") : base.where("status", "=", "claimed").where("claim_token", "=", input.token))) > 0;
}
function resubmitChannelIngressInDatabase(db, input) {
	const row = selectRow(db, input.queueName, input.id);
	if (!row) return { kind: "not-found" };
	if (row.status === "completed") return {
		kind: "completed",
		row
	};
	if (row.status !== "failed") return {
		kind: "active",
		status: row.status === "claimed" ? "claimed" : "pending"
	};
	if (row.payload_json === "null" || !parseFailedPayload(row.payload_json).ok) return {
		kind: "unrecoverable",
		row
	};
	executeSqliteQuerySync(db, getQueue(db).updateTable("channel_ingress_events").set({
		status: "pending",
		payload_json: row.payload_json === "OPENCLAW_CHANNEL_INGRESS_FAILED_NULL_V1" ? "null" : row.payload_json,
		received_at: input.now,
		updated_at: input.now,
		attempts: 0,
		last_attempt_at: null,
		last_error: null,
		failed_at: null,
		failed_reason: null,
		claim_token: null,
		claim_owner: null,
		claimed_at: null,
		completed_at: null,
		completed_metadata_json: null
	}).where("queue_name", "=", input.queueName).where("event_id", "=", input.id).where("status", "=", "failed"));
	const updated = selectRow(db, input.queueName, input.id);
	if (!updated) throw new Error(`Failed to read resubmitted channel ingress event ${input.queueName}/${input.id}`);
	return {
		kind: "resubmitted",
		row: updated,
		previous: row
	};
}
function purgeChannelIngressInDatabase(db, input) {
	return affectedRows(executeSqliteQuerySync(db, getQueue(db).deleteFrom("channel_ingress_events").where("queue_name", "=", input.queueName)));
}
function listChannelIngressRowsInDatabase(db, input) {
	const select = getQueue(db).selectFrom("channel_ingress_events").selectAll().where("queue_name", "=", input.queueName).where("status", "in", input.status === "unsettled" ? ["pending", "claimed"] : [input.status]);
	if (input.status === "claimed") return executeSqliteQuerySync(db, select.orderBy("claimed_at", "asc").orderBy("received_at", "asc").orderBy("event_id", "asc")).rows;
	if (input.status === "failed") return executeSqliteQuerySync(db, select.orderBy("failed_at", "asc").orderBy("event_id", "asc").limit(normalizeLimit$1(input.limit))).rows;
	const ordered = input.orderBy === "id" ? select.orderBy("event_id", "asc") : select.orderBy("received_at", "asc").orderBy("event_id", "asc");
	if (input.status === "unsettled") return executeSqliteQuerySync(db, ordered).rows;
	const limit = normalizeLimit$1(input.limit);
	const result = [];
	let last;
	while (result.length < limit) {
		let page = ordered;
		if (last) {
			const cursor = last;
			page = input.orderBy === "id" ? page.where("event_id", ">", cursor.event_id) : page.where((eb) => eb.or([eb("received_at", ">", cursor.received_at), eb.and([eb("received_at", "=", cursor.received_at), eb("event_id", ">", cursor.event_id)])]));
		}
		const rows = executeSqliteQuerySync(db, page.limit(LIST_PENDING_BATCH_SIZE)).rows;
		for (const row of rows) if (baseRecord(row)) {
			result.push(row);
			if (result.length === limit) break;
		}
		if (rows.length < LIST_PENDING_BATCH_SIZE) break;
		last = rows.at(-1);
	}
	return result;
}
//#endregion
//#region src/channels/message/ingress-queue.worker.ts
const kernels = {
	"channelIngress.list": listChannelIngressRowsInDatabase,
	"channelIngress.claimSnapshot": readChannelIngressClaimSnapshotInDatabase,
	"channelIngress.staleClaims": listStaleChannelIngressClaimsInDatabase,
	"channelIngress.enqueue": enqueueChannelIngressInDatabase,
	"channelIngress.claim": claimChannelIngressInDatabase,
	"channelIngress.claimNext": claimNextChannelIngressInDatabase,
	"channelIngress.recover": recoverChannelIngressClaimInDatabase,
	"channelIngress.refresh": refreshChannelIngressClaimInDatabase,
	"channelIngress.complete": completeChannelIngressInDatabase,
	"channelIngress.release": releaseChannelIngressInDatabase,
	"channelIngress.fail": failChannelIngressInDatabase,
	"channelIngress.delete": deleteChannelIngressInDatabase,
	"channelIngress.resubmit": resubmitChannelIngressInDatabase,
	"channelIngress.prune": pruneChannelIngressInDatabase,
	"channelIngress.purge": purgeChannelIngressInDatabase
};
function isChannelIngressCommand(command) {
	return Object.hasOwn(kernels, command.type);
}
function executeChannelIngressCommand(command, options, open) {
	if (command.type === "channelIngress.list") {
		const read = ({ db }) => runSqlitePinnedReadSnapshotSync(db, () => listChannelIngressRowsInDatabase(db, command.input));
		return command.input.readOnly ? withExistingOpenClawStateDatabaseArtifactPreservingReadOnly(read, options) ?? [] : read(open());
	}
	const database = open();
	if (command.type === "channelIngress.claimSnapshot") return runSqlitePinnedReadSnapshotSync(database.db, () => readChannelIngressClaimSnapshotInDatabase(database.db, command.input));
	if (command.type === "channelIngress.staleClaims") return listStaleChannelIngressClaimsInDatabase(database.db, command.input);
	let transitionClock;
	if ((command.type === "channelIngress.claim" || command.type === "channelIngress.claimNext") && command.input.customClock) {
		const attachment = takeSqliteWorkerOperationAdmissionAttachment();
		if (!(attachment instanceof Float64Array) || !(attachment.buffer instanceof SharedArrayBuffer) || attachment.length !== 1) throw new Error("Channel ingress claim requires its admitted clock attachment");
		transitionClock = attachment;
	}
	return runOpenClawStateWriteTransaction(({ db }) => {
		let admitted = false;
		const admitTransaction = () => {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: void 0
			});
			admitted = true;
		};
		if (command.type !== "channelIngress.claim" && command.type !== "channelIngress.claimNext") admitTransaction();
		const result = executeInTransaction(db, command, () => {
			admitTransaction();
			return transitionClock?.[0] ?? Date.now();
		});
		if (!admitted) admitTransaction();
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return result;
	}, {
		path: database.path,
		env: options.env
	});
}
function executeInTransaction(db, command, now) {
	return kernels[command.type](db, command.input, now);
}
//#endregion
//#region src/commands/doctor-db-bloat.read.ts
function readSqliteBloatStats(pathname) {
	let fileBytes;
	try {
		fileBytes = fs.statSync(pathname, { throwIfNoEntry: false })?.size ?? 0;
	} catch {
		return null;
	}
	if (fileBytes <= 0) return null;
	let connection;
	try {
		connection = openOpenClawStateReadConnection(pathname, prepareSqliteReadOnlyLocationSync(pathname));
		const db = connection.database.db;
		const pageSize = readPragmaNumber(db, "page_size") ?? 4096;
		const freelistCount = readPragmaNumber(db, "freelist_count") ?? 0;
		const autoVacuum = readPragmaNumber(db, "auto_vacuum") ?? 0;
		return {
			fileBytes,
			freeBytes: freelistCount * pageSize,
			incrementalAutoVacuum: autoVacuum === 2
		};
	} catch (error) {
		if (error instanceof SqliteSnapshotCleanupError) throw error;
		return null;
	} finally {
		connection?.close();
	}
}
function readPragmaNumber(db, pragma) {
	const row = db.prepare(`PRAGMA ${pragma}`).get();
	return asFiniteNumber(row?.[pragma]) ?? null;
}
function readSqliteDatabaseBloat(params) {
	const results = [];
	const stateStats = readSqliteBloatStats(params.path);
	if (stateStats) results.push({
		label: "state DB",
		stats: stateStats
	});
	const registered = withArtifactPreservingStateReads(() => readRegisteredAgentDatabases(params, false));
	for (const entry of registered) {
		const stats = readSqliteBloatStats(entry.path);
		if (stats) results.push({
			label: `agent DB (${entry.agentId})`,
			stats
		});
	}
	return results;
}
//#endregion
//#region src/skills/workshop/store-sqlite-event.ts
const STORED_EVENT_DATA_VERSION = 1;
const MAX_SKILL_PROPOSAL_EVENT_DATA_BYTES = MAX_SKILL_PROPOSAL_EVALUATION_BYTES + 65536;
const MAX_SKILL_PROPOSAL_EVENTS_RESPONSE_BYTES = 2097152;
function appendSkillProposalEvent(database, event) {
	if (event.evaluation) assertSkillProposalEvaluationWithinLimit(event.evaluation);
	const storedData = event.payload || event.evaluation ? JSON.stringify([
		STORED_EVENT_DATA_VERSION,
		event.payload ?? null,
		event.evaluation ?? null
	]) : null;
	if (storedData && Buffer.byteLength(storedData, "utf8") > MAX_SKILL_PROPOSAL_EVENT_DATA_BYTES) throw new Error(`Skill proposal event data exceeds ${MAX_SKILL_PROPOSAL_EVENT_DATA_BYTES} bytes.`);
	const kysely = getNodeSqliteKysely(database);
	const inserted = executeSqliteQueryTakeFirstSync(database, kysely.insertInto("skill_workshop_proposal_events").values({
		event_id: event.eventId,
		proposal_id: event.proposalId,
		proposed_version: event.proposedVersion,
		revision_hash: event.revisionHash,
		event_type: event.type,
		occurred_at: event.occurredAt,
		actor_json: JSON.stringify(event.actor),
		correlation_id: event.correlationId ?? null,
		payload_json: storedData
	}).returning("sequence"));
	if (!inserted) throw new Error(`Failed to append Skill Workshop event: ${event.eventId}`);
	return {
		...event,
		sequence: inserted.sequence
	};
}
function readStoredSkillProposalEventInDatabase(database, eventId) {
	const kysely = getNodeSqliteKysely(database);
	const row = executeSqliteQueryTakeFirstSync(database, kysely.selectFrom("skill_workshop_proposal_events").selectAll().where("event_id", "=", eventId));
	return row ? parseStoredSkillProposalEventRow(row) : null;
}
function listStoredSkillProposalEventsInDatabase(database, input) {
	const kysely = getNodeSqliteKysely(database);
	const limit = Math.min(Math.max(input.limit ?? 100, 1), 200);
	let query = kysely.selectFrom("skill_workshop_proposal_events").innerJoin("skill_workshop_proposals", "skill_workshop_proposals.proposal_id", "skill_workshop_proposal_events.proposal_id").selectAll("skill_workshop_proposal_events").where("skill_workshop_proposal_events.sequence", ">", input.afterSequence ?? 0);
	if (input.proposalId) query = query.where("skill_workshop_proposal_events.proposal_id", "=", input.proposalId);
	if (input.agentId) query = query.where("skill_workshop_proposals.owner_agent_id", "=", input.agentId);
	else query = query.where("skill_workshop_proposals.owner_agent_id", "is not", null);
	const rows = executeSqliteQuerySync(database, query.orderBy("skill_workshop_proposal_events.sequence", "asc").limit(limit + 1)).rows;
	let hasMore = rows.length > limit;
	let responseBytes = 2;
	const events = [];
	for (const row of rows.slice(0, limit)) {
		const event = parseStoredSkillProposalEventRow(row);
		if (!event) continue;
		const eventBytes = Buffer.byteLength(JSON.stringify(event), "utf8") + 1;
		if (events.length > 0 && responseBytes + eventBytes > MAX_SKILL_PROPOSAL_EVENTS_RESPONSE_BYTES) {
			hasMore = true;
			break;
		}
		events.push(event);
		responseBytes += eventBytes;
	}
	return {
		events,
		...hasMore && events.length > 0 ? { nextSequence: events[events.length - 1].sequence } : {}
	};
}
/** Reads apply provenance through the caller's existing connection without opening a writable store. */
function readAppliedSkillProposalEvents(database) {
	const kysely = getNodeSqliteKysely(database);
	return executeSqliteQuerySync(database, kysely.selectFrom("skill_workshop_proposal_events").selectAll().where("event_type", "=", "applied").orderBy("sequence", "asc")).rows.flatMap((row) => {
		const event = parseStoredSkillProposalEventRow(row);
		return event ? [event] : [];
	});
}
function parseStoredSkillProposalEventRow(row) {
	const actor = parseSkillProposalEventActor(parseJson(row.actor_json));
	if (!actor || !isSkillProposalEventType(row.event_type)) return null;
	if (row.payload_json && Buffer.byteLength(row.payload_json, "utf8") > MAX_SKILL_PROPOSAL_EVENT_DATA_BYTES) throw new Error(`Stored Skill Workshop event ${row.event_id} exceeds ${MAX_SKILL_PROPOSAL_EVENT_DATA_BYTES} bytes and cannot be replayed safely.`);
	const storedData = parseSkillProposalEventData(parseJson(row.payload_json));
	return {
		sequence: row.sequence,
		eventId: row.event_id,
		proposalId: row.proposal_id,
		proposedVersion: row.proposed_version,
		revisionHash: row.revision_hash,
		type: row.event_type,
		occurredAt: row.occurred_at,
		actor,
		...row.correlation_id ? { correlationId: row.correlation_id } : {},
		...storedData.payload ? { payload: storedData.payload } : {},
		...storedData.evaluation ? { evaluation: storedData.evaluation } : {}
	};
}
function isSkillProposalEventType(value) {
	return [
		"created",
		"revised",
		"evaluation_completed",
		"applied",
		"rejected",
		"quarantined",
		"stale"
	].includes(value);
}
function parseSkillProposalEventActor(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const actor = value;
	if (![
		"agent",
		"gateway",
		"plugin",
		"system"
	].includes(actor.type) || actor.id !== void 0 && typeof actor.id !== "string") return null;
	return actor;
}
function parseSkillProposalEventData(value) {
	if (value === void 0) return {};
	if (Array.isArray(value)) {
		if (value.length !== 3 || value[0] !== STORED_EVENT_DATA_VERSION) return {};
		const payload = parseSkillProposalEventPayload(value[1]);
		const evaluation = parseSkillProposalEvaluation(value[2]) ?? void 0;
		return {
			...payload ? { payload } : {},
			...evaluation ? { evaluation } : {}
		};
	}
	const payload = parseSkillProposalEventPayload(value);
	return payload ? { payload } : {};
}
function parseSkillProposalEventPayload(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return;
	const entries = Object.entries(value);
	if (entries.length > 32 || entries.some(([key, item]) => !key || key.length > 80 || item !== null && typeof item !== "string" && typeof item !== "number" && typeof item !== "boolean")) return;
	return Object.fromEntries(entries);
}
//#endregion
//#region src/commands/doctor-skill-workshop-read.kernel.ts
function readWorkshopMigrationRecordsInDatabase(database, includeEvents) {
	let records = [];
	let appliedEvents = [];
	if (tableExists(database, "skill_workshop_proposals")) {
		const kysely = getNodeSqliteKysely(database);
		records = executeSqliteQuerySync(database, kysely.selectFrom("skill_workshop_proposals").select(["record_json", "owner_agent_id"])).rows.flatMap((row) => {
			try {
				const parsed = validateSkillProposalRecord(JSON.parse(row.record_json));
				return parsed.ok ? [{
					record: parsed.value,
					ownerAgentId: row.owner_agent_id
				}] : [];
			} catch {
				return [];
			}
		});
		if (includeEvents && tableExists(database, "skill_workshop_proposal_events")) appliedEvents = readAppliedSkillProposalEvents(database);
	}
	return {
		records,
		appliedEvents
	};
}
//#endregion
//#region src/cron/store/load.worker.ts
function loadMutableCronStoreInWorker(database, storeKey) {
	let repairCommits = 0;
	try {
		return {
			ok: true,
			loaded: loadCronStoreFromDatabase(database.db, storeKey, {
				write: (operation, operationLabel) => runOpenClawStateWriteTransaction(({ db }) => operation(db), {
					database,
					env: getSqliteWorkerStateContext().environment
				}, { operationLabel }),
				committed: () => {
					repairCommits += 1;
				}
			}),
			repairCommits
		};
	} catch (error) {
		return {
			ok: false,
			error: serializeCronLoadError(error),
			repairCommits
		};
	}
}
//#endregion
//#region src/cron/store/save.worker.ts
function executeCronStoreSaveCommand(command, database) {
	let committed = false;
	try {
		return {
			ok: true,
			value: runOpenClawStateWriteTransaction(({ db }) => {
				let value;
				if (command.type === "cron.saveChanges") value = saveCronStoreChangesInDatabase(db, command.input.storeKey, command.input.storeKey, command.input.changes, command.input.options);
				else saveCronStoreInDatabase(database, command.input.storeKey, command.input.store, command.input.options);
				deferSqlitePostCommitPublication(db, () => {
					committed = true;
				});
				return value;
			}, {
				database,
				env: getSqliteWorkerStateContext().environment
			}, command.type === "cron.saveChanges" ? { operationLabel: "cron.config-mutation" } : void 0),
			committed
		};
	} catch (error) {
		return {
			ok: false,
			error: serializeCronSaveError(error, command.input.storeKey),
			committed
		};
	}
}
//#endregion
//#region src/cron/store/dispatch.worker.ts
const loadAdmission = createLazyRuntimeModule(() => import("./run-admission.worker-avdGJ0ma.mjs"));
let admission$1;
const loadRecovery = createLazyRuntimeModule(() => import("./run-recovery.worker-CA4jFIN_.mjs"));
let recovery;
const loadMaintenance = createLazyRuntimeModule(() => import("./runtime-maintenance.worker-DPwsYtsR.mjs"));
let maintenance;
function prepareCronStateWorkerCommand(type) {
	if ([
		"cron.reserveRuns",
		"cron.activateRun",
		"cron.releaseReservations",
		"cron.finishReceipt",
		"cron.removeStaleFamily"
	].includes(String(type)) && !admission$1) return loadAdmission().then((loaded) => {
		admission$1 = loaded;
	});
	if ((type === "cron.scheduleUnowned" || type === "cron.recordFailureAlertOutcome" || type === "cron.maintainHistory") && !maintenance) return loadMaintenance().then((loaded) => {
		maintenance = loaded;
	});
	if (type !== "cron.repairRun" || recovery) return;
	return loadRecovery().then((loaded) => {
		recovery = loaded;
	});
}
function isCronStateWorkerCommand(command) {
	switch (command.type) {
		case "cron.reserveRuns":
		case "cron.recordRun":
		case "cron.activateRun":
		case "cron.releaseReservations":
		case "cron.finishReceipt":
		case "cron.removeStaleFamily":
		case "cron.loadMutable":
		case "cron.initializeRunReceipts":
		case "cron.repairRun":
		case "cron.scheduleUnowned":
		case "cron.maintainHistory":
		case "cron.recordFailureAlertOutcome":
		case "cron.save":
		case "cron.saveChanges":
		case "cron.bindReceiptExecution": return true;
		default: return false;
	}
}
function executeCronStateCommand(command, database) {
	switch (command.type) {
		case "cron.recordRun": return runOpenClawStateWriteTransaction(({ db }) => {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: void 0
			});
			const result = recordCronRunInDatabase(db, command.input);
			requestSqliteWorkerOperationAdmission({
				stage: "commit",
				facts: void 0
			});
			return result;
		}, {
			database,
			path: database.path,
			env: getSqliteWorkerStateContext().environment
		}, { operationLabel: command.type });
		case "cron.reserveRuns":
		case "cron.activateRun":
		case "cron.releaseReservations":
		case "cron.finishReceipt":
		case "cron.removeStaleFamily":
			if (!admission$1) throw new Error("Cron admission worker is not prepared");
			switch (command.type) {
				case "cron.reserveRuns": return admission$1.reserveCronRunsInWorker(database, command.input);
				case "cron.activateRun": return admission$1.activateCronRunInWorker(database, command.input);
				case "cron.releaseReservations": return admission$1.releaseCronReservationsInWorker(database, command.input);
				case "cron.finishReceipt": return admission$1.finishCronReceiptInWorker(database, command.input);
				case "cron.removeStaleFamily": return admission$1.removeStaleCronFamilyInWorker(database, command.input);
			}
		case "cron.loadMutable": return loadMutableCronStoreInWorker(database, command.input.storeKey);
		case "cron.repairRun":
			if (!recovery) throw new Error("Cron recovery worker is not prepared");
			return recovery.repairCronRunInWorker(database, command.input);
		case "cron.scheduleUnowned":
		case "cron.maintainHistory":
		case "cron.recordFailureAlertOutcome":
			if (!maintenance) throw new Error("Cron maintenance worker is not prepared");
			if (command.type === "cron.maintainHistory") return maintenance.maintainCronRunHistoryInWorker(database, command.input);
			return command.type === "cron.scheduleUnowned" ? maintenance.scheduleUnownedCronJobsInWorker(database, command.input) : maintenance.recordCronFailureAlertOutcomeInWorker(database, command.input);
		case "cron.initializeRunReceipts": return runOpenClawStateWriteTransaction(({ db }) => {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: void 0
			});
			ensureCronRunReceiptSchema(db);
			requestSqliteWorkerOperationAdmission({
				stage: "commit",
				facts: void 0
			});
		}, {
			database,
			path: database.path,
			env: getSqliteWorkerStateContext().environment
		}, { operationLabel: "cron.run-receipt.initialize" });
		case "cron.save":
		case "cron.saveChanges": return executeCronStoreSaveCommand(command, database);
		case "cron.bindReceiptExecution": return runOpenClawStateWriteTransaction(({ db }) => {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: void 0
			});
			const result = bindCronRunReceiptExecutionInDatabase(db, command.input.handle, command.input.binding, prepareCronRunReceiptWriteSchema(db));
			requestSqliteWorkerOperationAdmission({
				stage: "commit",
				facts: void 0
			});
			return result;
		}, {
			database,
			path: database.path,
			env: getSqliteWorkerStateContext().environment
		}, { operationLabel: "cron.run-receipt.execution-binding" });
		default: throw new Error("Unknown Cron shared-state worker command");
	}
}
//#endregion
//#region src/fleet/registry.kernel.ts
const FLEET_OPERATION_LEASE_SCOPE = "fleet-cell-operation";
const FLEET_OPERATION_LEASE_TTL_MS = 3e5;
/** The live caller scope and this transaction jointly fence a queued cell mutation. */
function assertFleetCellOperationInDatabase(db, tenantId, owner) {
	if (owner === void 0) return;
	if (!executeSqliteQueryTakeFirstSync(db, kyselyFor(db).selectFrom("state_leases").select("owner").where("scope", "=", FLEET_OPERATION_LEASE_SCOPE).where("lease_key", "=", tenantId).where("owner", "=", owner).where("expires_at", ">", Date.now()))) throw new Error(`Fleet operation lease was lost for ${tenantId}.`);
}
function kyselyFor(db) {
	return getNodeSqliteKysely(db);
}
function recordToRow(record) {
	return {
		tenant_id: record.tenantId,
		created_at_ms: record.createdAtMs,
		image: record.image,
		runtime: record.runtime,
		host_port: record.hostPort,
		container_name: record.containerName,
		data_dir: record.dataDir
	};
}
function reserveFleetCellInDatabase(db, params) {
	const kysely = kyselyFor(db);
	if (executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("fleet_cells").select("tenant_id").where("tenant_id", "=", params.tenantId))) throw new Error(`Fleet cell already exists: ${params.tenantId}`);
	const usedPorts = executeSqliteQuerySync(db, kysely.selectFrom("fleet_cells").select("host_port")).rows.map((row) => row.host_port);
	const hostPort = allocateHostPort(usedPorts, params.requestedPort);
	const record = {
		tenantId: params.tenantId,
		createdAtMs: params.createdAtMs,
		image: params.image,
		runtime: params.runtime,
		hostPort,
		containerName: params.containerName,
		dataDir: params.dataDir
	};
	executeSqliteQuerySync(db, kysely.insertInto("fleet_cells").values(recordToRow(record)));
	return record;
}
function updateFleetCellImageInDatabase(db, tenantId, image) {
	if (executeSqliteQuerySync(db, kyselyFor(db).updateTable("fleet_cells").set({ image }).where("tenant_id", "=", tenantId)).numAffectedRows !== 1n) throw new Error(`Fleet cell disappeared before its image could be updated: ${tenantId}`);
}
function acquireFleetCellOperationInDatabase(db, params) {
	const nowMs = params.nowMs ?? Date.now();
	const expiresAt = nowMs + FLEET_OPERATION_LEASE_TTL_MS;
	const kysely = kyselyFor(db);
	executeSqliteQuerySync(db, kysely.deleteFrom("state_leases").where("scope", "=", FLEET_OPERATION_LEASE_SCOPE).where("lease_key", "=", params.tenantId).where("expires_at", "<=", nowMs));
	const existing = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("state_leases").select(["expires_at", "payload_json"]).where("scope", "=", FLEET_OPERATION_LEASE_SCOPE).where("lease_key", "=", params.tenantId));
	if (existing) {
		let operation = "fleet operation";
		try {
			const payload = existing.payload_json ? JSON.parse(existing.payload_json) : void 0;
			if (typeof payload === "object" && payload !== null && "operation" in payload && typeof payload.operation === "string") operation = `fleet ${payload.operation}`;
		} catch {}
		throw new Error(`Another ${operation} is already running for ${params.tenantId}; retry after ${new Date(existing.expires_at ?? expiresAt).toISOString()}.`);
	}
	executeSqliteQuerySync(db, kysely.insertInto("state_leases").values({
		scope: FLEET_OPERATION_LEASE_SCOPE,
		lease_key: params.tenantId,
		owner: params.owner,
		expires_at: expiresAt,
		heartbeat_at: nowMs,
		payload_json: JSON.stringify({ operation: params.operation }),
		created_at: nowMs,
		updated_at: nowMs
	}));
}
function heartbeatFleetCellOperationInDatabase(db, params) {
	const nowMs = params.nowMs ?? Date.now();
	const expiresAt = nowMs + FLEET_OPERATION_LEASE_TTL_MS;
	if (executeSqliteQuerySync(db, kyselyFor(db).updateTable("state_leases").set({
		expires_at: expiresAt,
		heartbeat_at: nowMs,
		updated_at: nowMs
	}).where("scope", "=", FLEET_OPERATION_LEASE_SCOPE).where("lease_key", "=", params.tenantId).where("owner", "=", params.owner).where("expires_at", ">", nowMs)).numAffectedRows !== 1n) throw new Error(`Fleet operation lease was lost for ${params.tenantId}.`);
}
function releaseFleetCellOperationInDatabase(db, params) {
	executeSqliteQuerySync(db, kyselyFor(db).deleteFrom("state_leases").where("scope", "=", FLEET_OPERATION_LEASE_SCOPE).where("lease_key", "=", params.tenantId).where("owner", "=", params.owner));
}
function deleteFleetCellInDatabase(db, tenantId) {
	executeSqliteQuerySync(db, kyselyFor(db).deleteFrom("fleet_cells").where("tenant_id", "=", tenantId));
}
//#endregion
//#region src/fleet/registry.worker.ts
function executeFleetRegistryCommand(command, options) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		switch (command.type) {
			case "fleet.cell.reserve":
				assertFleetCellOperationInDatabase(db, command.input.tenantId, command.input.operationOwner);
				return reserveFleetCellInDatabase(db, command.input);
			case "fleet.cell.updateImage":
				assertFleetCellOperationInDatabase(db, command.input.tenantId, command.input.operationOwner);
				return updateFleetCellImageInDatabase(db, command.input.tenantId, command.input.image);
			case "fleet.cell.delete":
				assertFleetCellOperationInDatabase(db, command.input.tenantId, command.input.operationOwner);
				return deleteFleetCellInDatabase(db, command.input.tenantId);
			case "fleet.operation.acquire": return acquireFleetCellOperationInDatabase(db, command.input);
			case "fleet.operation.heartbeat": return heartbeatFleetCellOperationInDatabase(db, command.input);
			case "fleet.operation.release": return releaseFleetCellOperationInDatabase(db, command.input);
		}
	}, options);
}
//#endregion
//#region src/gateway/operator-approval-store.worker.ts
function isOperatorApprovalCommand(command) {
	return isOperatorApprovalOperation(command.type);
}
function executeOperatorApprovalCommand(command, databaseOptions) {
	return runOpenClawStateWriteTransaction((database) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const options = {
			...databaseOptions,
			database
		};
		const result = executeOperatorApprovalOperation(command.type, command.input, options);
		if (command.type === "operatorApprovals.resolve" && "outcome" in result && result.outcome === "resolved") deferSqliteWorkerCommitReceipt(database.db, {
			type: command.type,
			resolutionKey: getOperatorApprovalResolutionKey(result.record)
		});
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return result;
	}, databaseOptions);
}
//#endregion
//#region src/gateway/worker-environments/inference-store.worker-contract.ts
function isWorkerInferenceStoreCommand(command) {
	return command.type === "workerInference.begin" || command.type === "workerInference.complete" || command.type === "workerInference.cancelPending" || command.type === "workerInference.recoverPending";
}
//#endregion
//#region src/gateway/worker-environments/inference-store.kernel.ts
const REQUEST_HASH_PATTERN = /^[a-f0-9]{64}$/u;
const DEFAULT_RETENTION = {
	maxAgeMs: 864e5,
	maxRows: 256,
	maxBytes: 67108864
};
function required(value, field) {
	if (typeof value !== "string" || !value.trim()) throw new Error(`Worker inference turn ${field} must be a non-empty string`);
	return value.trim();
}
function nonNegativeInteger(value, field) {
	if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error(`Worker inference turn ${field} must be a non-negative integer`);
	return value;
}
function normalizeRequestHash(value) {
	if (typeof value !== "string" || !REQUEST_HASH_PATTERN.test(value)) throw new Error("Worker inference turn request hash must be lowercase SHA-256 hex");
	return value;
}
function normalizeInput(input, nowMs) {
	return {
		environmentId: required(input.environmentId, "environment id"),
		sessionId: required(input.sessionId, "session id"),
		runEpoch: nonNegativeInteger(input.runEpoch, "run epoch"),
		runId: required(input.runId, "run id"),
		turnId: required(input.turnId, "turn id"),
		requestHash: normalizeRequestHash(input.requestHash),
		nowMs: nonNegativeInteger(nowMs, "timestamp")
	};
}
function parseTerminalJson(value) {
	let parsed;
	try {
		parsed = JSON.parse(value);
	} catch (error) {
		throw new Error("Worker inference cached terminal outcome is invalid", { cause: error });
	}
	if (!validateWorkerInferenceTerminalOutcome(parsed)) throw new Error("Worker inference cached terminal outcome is invalid");
	return parsed;
}
function serializeTerminalOutcome(outcome) {
	if (!validateWorkerInferenceTerminalOutcome(outcome)) throw new Error("Worker inference terminal outcome is invalid");
	const serialized = JSON.stringify(outcome);
	if (!serialized) throw new Error("Worker inference terminal outcome is not serializable");
	return serialized;
}
const query$4 = (db) => getNodeSqliteKysely(db);
function findTurn(db, input) {
	return executeSqliteQueryTakeFirstSync(db, query$4(db).selectFrom("worker_inference_turns").selectAll().where("session_id", "=", input.sessionId).where("run_epoch", "=", input.runEpoch).where("run_id", "=", input.runId).where("turn_id", "=", input.turnId));
}
function findPendingTurn(db, input) {
	return executeSqliteQueryTakeFirstSync(db, query$4(db).selectFrom("worker_inference_turns").selectAll().where("session_id", "=", input.sessionId).where("run_epoch", "=", input.runEpoch).where("run_id", "=", input.runId).where("state", "=", "pending"));
}
function classifyExistingTurn(row, input) {
	if (!row) return;
	if (row.environment_id !== input.environmentId || row.request_hash !== input.requestHash) return {
		kind: "rejected",
		reason: "conflict"
	};
	if (row.state === "pending" && row.terminal_json === null) return { kind: "recover" };
	if (row.state === "terminal" && row.terminal_json !== null) return {
		kind: "replay",
		outcome: parseTerminalJson(row.terminal_json)
	};
	throw new Error("Worker inference turn row has invalid terminal state");
}
function insertPendingTurn(db, input) {
	const turn = {
		session_id: input.sessionId,
		run_epoch: input.runEpoch,
		run_id: input.runId,
		turn_id: input.turnId,
		environment_id: input.environmentId,
		request_hash: input.requestHash,
		state: "pending",
		terminal_json: null,
		created_at_ms: input.nowMs,
		updated_at_ms: input.nowMs
	};
	executeSqliteQuerySync(db, query$4(db).insertInto("worker_inference_turns").values(turn));
}
function deleteTurn(db, row) {
	executeSqliteQuerySync(db, query$4(db).deleteFrom("worker_inference_turns").where("session_id", "=", row.session_id).where("run_epoch", "=", row.run_epoch).where("run_id", "=", row.run_id).where("turn_id", "=", row.turn_id).where("state", "=", "terminal"));
}
function pruneTerminalTurns(params) {
	const db = query$4(params.db);
	const utf8 = executeSqliteQueryTakeFirstSync(params.db, db.selectFrom("pragma_encoding").select("encoding"))?.encoding === "UTF-8";
	const retained = db.selectFrom("worker_inference_turns").select([
		"session_id",
		"run_epoch",
		"run_id",
		"turn_id",
		"updated_at_ms"
	]).where("state", "=", "terminal").orderBy("updated_at_ms", "desc").orderBy("session_id", "asc").orderBy("run_epoch", "desc").orderBy("run_id", "asc").orderBy("turn_id", "asc");
	const rows = utf8 ? executeSqliteQuerySync(params.db, retained.select((eb) => eb.fn("octet_length", ["terminal_json"]).as("terminal_bytes"))).rows : executeSqliteQuerySync(params.db, retained.select("terminal_json")).rows.map((row) => ({
		session_id: row.session_id,
		run_epoch: row.run_epoch,
		run_id: row.run_id,
		turn_id: row.turn_id,
		updated_at_ms: row.updated_at_ms,
		terminal_bytes: Buffer.byteLength(row.terminal_json ?? "", "utf8")
	}));
	const isPreserved = (row) => params.preserve !== void 0 && row.session_id === params.preserve.sessionId && row.run_epoch === params.preserve.runEpoch && row.run_id === params.preserve.runId && row.turn_id === params.preserve.turnId;
	rows.sort((left, right) => Number(isPreserved(right)) - Number(isPreserved(left)));
	const cutoffMs = Math.max(0, params.nowMs - params.policy.maxAgeMs);
	let retainedRows = 0;
	let retainedBytes = 0;
	for (const row of rows) {
		const terminalBytes = row.terminal_bytes;
		const preserve = isPreserved(row);
		const expired = row.updated_at_ms < cutoffMs;
		const exceedsRows = retainedRows >= params.policy.maxRows;
		const exceedsBytes = retainedRows > 0 && retainedBytes + terminalBytes > params.policy.maxBytes;
		if (!preserve && (expired || exceedsRows || exceedsBytes)) {
			deleteTurn(params.db, row);
			continue;
		}
		retainedRows += 1;
		retainedBytes += terminalBytes;
	}
}
/** The shared-state worker supplies the already-admitted transaction connection. */
function createWorkerInferenceStoreKernel(options) {
	const now = options.now;
	const retention = {
		...DEFAULT_RETENTION,
		...options.retention
	};
	const begin = (rawInput) => {
		const input = normalizeInput(rawInput, now());
		const db = options.db;
		pruneTerminalTurns({
			db,
			nowMs: input.nowMs,
			policy: retention
		});
		const existing = classifyExistingTurn(findTurn(db, input), input);
		if (existing) return existing;
		if (findPendingTurn(db, input)) return {
			kind: "rejected",
			reason: "conflict"
		};
		insertPendingTurn(db, input);
		return { kind: "claimed" };
	};
	const complete = (rawInput) => {
		const input = normalizeInput(rawInput, now());
		const terminalJson = serializeTerminalOutcome(rawInput.outcome);
		const db = options.db;
		const existing = classifyExistingTurn(findTurn(db, input), input);
		if (!existing) throw new Error("Worker inference turn must begin before terminal completion");
		if (existing.kind === "rejected") throw new Error(`Worker inference terminal completion rejected: ${existing.reason}`);
		if (existing.kind === "replay") return existing.outcome;
		if (executeSqliteQuerySync(db, query$4(db).updateTable("worker_inference_turns").set({
			state: "terminal",
			terminal_json: terminalJson,
			updated_at_ms: input.nowMs
		}).where("session_id", "=", input.sessionId).where("run_epoch", "=", input.runEpoch).where("run_id", "=", input.runId).where("turn_id", "=", input.turnId).where("environment_id", "=", input.environmentId).where("request_hash", "=", input.requestHash).where("state", "=", "pending")).numAffectedRows !== 1n) throw new Error("Worker inference turn changed during terminal completion");
		pruneTerminalTurns({
			db,
			nowMs: input.nowMs,
			policy: retention,
			preserve: input
		});
		return rawInput.outcome;
	};
	const cancelPending = (params) => {
		const nowMs = nonNegativeInteger(now(), "timestamp");
		const terminalJson = serializeTerminalOutcome(params.outcome);
		const identity = {
			environmentId: required(params.environmentId, "environment id"),
			sessionId: required(params.sessionId, "session id"),
			runEpoch: nonNegativeInteger(params.runEpoch, "run epoch"),
			runId: required(params.runId, "run id"),
			turnId: required(params.turnId, "turn id")
		};
		const db = options.db;
		executeSqliteQuerySync(db, query$4(db).updateTable("worker_inference_turns").set({
			state: "terminal",
			terminal_json: terminalJson,
			updated_at_ms: nowMs
		}).where("session_id", "=", identity.sessionId).where("run_epoch", "=", identity.runEpoch).where("run_id", "=", identity.runId).where("turn_id", "=", identity.turnId).where("environment_id", "=", identity.environmentId).where("state", "=", "pending"));
		pruneTerminalTurns({
			db,
			nowMs,
			policy: retention,
			preserve: identity
		});
	};
	const recoverPending = (outcome) => {
		const nowMs = nonNegativeInteger(now(), "timestamp");
		const terminalJson = serializeTerminalOutcome(outcome);
		const db = options.db;
		executeSqliteQuerySync(db, query$4(db).updateTable("worker_inference_turns").set({
			state: "terminal",
			terminal_json: terminalJson,
			updated_at_ms: nowMs
		}).where("state", "=", "pending"));
		pruneTerminalTurns({
			db,
			nowMs,
			policy: retention
		});
	};
	return {
		begin,
		cancelPending,
		complete,
		recoverPending
	};
}
//#endregion
//#region src/gateway/worker-environments/inference-store.worker.ts
function executeWorkerInferenceStoreCommand(command, database) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const store = createWorkerInferenceStoreKernel({
			db,
			now: () => command.input.nowMs,
			retention: command.input.retention
		});
		const result = (() => {
			switch (command.type) {
				case "workerInference.begin": return store.begin(command.input.input);
				case "workerInference.complete": return store.complete(command.input.input);
				case "workerInference.cancelPending": return store.cancelPending(command.input.input);
				case "workerInference.recoverPending": return store.recoverPending(command.input.input);
			}
		})();
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return result;
	}, { database }, { operationLabel: command.type });
}
//#endregion
//#region src/gateway/worker-environments/session-attachment-store.ts
const query$3 = (db) => getNodeSqliteKysely(db);
const WORKER_ENVIRONMENT_SESSION_ATTACHMENTS_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS worker_environment_session_attachments (
  session_id TEXT PRIMARY KEY,
  session_key TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  session_lifecycle_revision TEXT,
  environment_id TEXT NOT NULL UNIQUE,
  generation INTEGER NOT NULL CHECK (generation >= 1),
  created_at_ms INTEGER NOT NULL,
  last_used_at_ms INTEGER NOT NULL,
  closed_at_ms INTEGER,
  FOREIGN KEY (environment_id) REFERENCES worker_environments(environment_id) ON DELETE CASCADE
) STRICT;
CREATE INDEX IF NOT EXISTS worker_environment_session_attachments_session_key
ON worker_environment_session_attachments(agent_id, session_key);
`;
function fromRow(row) {
	return {
		sessionId: row.session_id,
		sessionKey: row.session_key,
		agentId: row.agent_id,
		...row.session_lifecycle_revision ? { sessionLifecycleRevision: row.session_lifecycle_revision } : {},
		environmentId: row.environment_id,
		generation: row.generation,
		createdAtMs: row.created_at_ms,
		lastUsedAtMs: row.last_used_at_ms,
		closedAtMs: row.closed_at_ms
	};
}
function get(db, sessionId) {
	const row = executeSqliteQueryTakeFirstSync(db, query$3(db).selectFrom("worker_environment_session_attachments").selectAll().where("session_id", "=", sessionId));
	return row ? fromRow(row) : void 0;
}
function readWorkerEnvironmentSessionAttachments(db, ids) {
	if (ids?.length === 0) return [];
	const rows = query$3(db).selectFrom("worker_environment_session_attachments").selectAll();
	return executeSqliteQuerySync(db, ids ? rows.where("environment_id", "in", ids) : rows).rows.map(fromRow);
}
function hasWorkerEnvironmentSessionAttachment(db, environmentId) {
	return Boolean(executeSqliteQueryTakeFirstSync(db, query$3(db).selectFrom("worker_environment_session_attachments").select("session_id").where("environment_id", "=", environmentId)));
}
function createWorkerEnvironmentSessionAttachmentStore(options) {
	const { read, write, now } = options;
	const assertIdentity = (record, expected) => {
		if (record.sessionId !== expected.sessionId || record.sessionKey !== expected.sessionKey || record.agentId !== expected.agentId) throw new Error("Conversation environment identity changed");
	};
	return {
		getSessionAttachmentRecord: (sessionId) => get(read(), sessionId),
		createSessionAttachmentIntent(input, assertCurrent) {
			return write((db) => {
				assertCurrent();
				const previous = get(db, input.sessionId);
				if (previous) {
					assertIdentity(previous, input);
					const environment = options.getEnvironment(db, previous.environmentId);
					if (environment && !["destroyed", "failed"].includes(environment.state)) throw new Error("Conversation already owns a worker environment; stop it before replacing it");
					if (previous.environmentId === input.environmentId) throw new Error("This environment request was already stopped; use a new idempotency key");
				}
				const environment = options.createIntent(db, input);
				if (environment.state !== "requested") throw new Error("Environment request already belongs to an earlier allocation");
				const at = now();
				executeSqliteQuerySync(db, query$3(db).insertInto("worker_environment_session_attachments").values({
					session_id: input.sessionId,
					session_key: input.sessionKey,
					agent_id: input.agentId,
					session_lifecycle_revision: input.sessionLifecycleRevision ?? null,
					environment_id: input.environmentId,
					generation: (previous?.generation ?? 0) + 1,
					created_at_ms: at,
					last_used_at_ms: at,
					closed_at_ms: null
				}).onConflict((oc) => oc.column("session_id").doUpdateSet({
					environment_id: input.environmentId,
					generation: (previous?.generation ?? 0) + 1,
					session_lifecycle_revision: input.sessionLifecycleRevision ?? null,
					created_at_ms: at,
					last_used_at_ms: at,
					closed_at_ms: null
				})));
				return {
					attachment: get(db, input.sessionId),
					environment
				};
			});
		},
		closeSessionAttachment(sessionId, assertCurrent = () => {}) {
			return write((db) => {
				assertCurrent();
				const current = get(db, sessionId);
				if (!current || current.closedAtMs !== null) return current;
				executeSqliteQuerySync(db, query$3(db).updateTable("worker_environment_session_attachments").set({ closed_at_ms: now() }).where("session_id", "=", sessionId));
				return get(db, sessionId);
			});
		},
		cancelSessionAttachmentReservation(record) {
			write((db) => {
				const current = get(db, record.sessionId);
				const environment = options.getEnvironment(db, record.environmentId);
				if (!current || current.environmentId !== record.environmentId || current.generation !== record.generation || !environment || environment.state !== "requested" || environment.leaseId !== null) throw new Error("Conversation environment reservation changed before cancellation");
				const at = now();
				executeSqliteQuerySync(db, query$3(db).updateTable("worker_environment_session_attachments").set({ closed_at_ms: current.closedAtMs ?? at }).where("session_id", "=", current.sessionId));
				executeSqliteQuerySync(db, query$3(db).updateTable("worker_environments").set({
					destroy_requested_at_ms: environment.destroyRequestedAtMs ?? at,
					teardown_terminal_state: "destroyed",
					updated_at_ms: at
				}).where("environment_id", "=", environment.environmentId).where("state", "=", "requested"));
			});
		},
		touchSessionAttachment(record, assertCurrent) {
			write((db) => {
				assertCurrent();
				const current = get(db, record.sessionId);
				if (!current || current.environmentId !== record.environmentId || current.generation !== record.generation || current.closedAtMs !== null) throw new Error("Conversation environment attachment is no longer current");
				executeSqliteQuerySync(db, query$3(db).updateTable("worker_environment_session_attachments").set({ last_used_at_ms: now() }).where("session_id", "=", record.sessionId));
			});
		}
	};
}
//#endregion
//#region src/gateway/worker-environments/terminal-environment-retention.ts
function normalizeLimit(value) {
	if (!Number.isSafeInteger(value) || value < 1 || value > 1e3) throw new Error("Worker environment prune limit must be between 1 and 1000");
	return value;
}
function pruneObservedTerminalWorkerEnvironments(params) {
	if (params.observed.length === 0) return 0;
	normalizeLimit(params.observed.length);
	return params.write((db) => {
		const currentQuery = getNodeSqliteKysely(db);
		let deleted = 0;
		for (const observed of params.observed) {
			const current = executeSqliteQueryTakeFirstSync(db, currentQuery.selectFrom("worker_environments").selectAll().where("environment_id", "=", observed.environment_id).where((eb) => eb.not(eb.exists(eb.selectFrom("worker_session_placements").select("session_id").whereRef("environment_id", "=", "worker_environments.environment_id")))));
			if (current && isDeepStrictEqual({ ...current }, { ...observed })) {
				const result = executeSqliteQuerySync(db, currentQuery.deleteFrom("worker_environments").where("environment_id", "=", observed.environment_id));
				deleted += Number(result.numAffectedRows ?? 0n);
			}
		}
		return deleted;
	});
}
//#endregion
//#region src/gateway/worker-environments/store-row-codec.ts
function teardownTerminalStateFrom(value) {
	if (value === null || value === "destroyed" || value === "failed") return value;
	throw new Error("Worker environment teardown terminal state is invalid");
}
function endpointFrom(row, fallbackPorts) {
	const { ssh_host: host, ssh_port: port, ssh_user: user, ssh_host_key: hostKey, ssh_key_ref_json: encoded } = row;
	if (host === null || port === null || user === null || hostKey === null || encoded === null) return null;
	return normalizeWorkerSshEndpoint({
		host,
		port,
		...fallbackPorts.length > 0 ? { fallbackPorts } : {},
		user,
		hostKey,
		keyRef: JSON.parse(encoded)
	});
}
function desktopFrom(row) {
	if (row.desktop_json === null) return null;
	return normalizeWorkerDesktopEndpoint(JSON.parse(row.desktop_json));
}
function bootstrapReceiptFrom(row) {
	const { bootstrap_bundle_hash: bundleHash, bootstrap_openclaw_version: openclawVersion, bootstrap_protocol_features_json: encodedFeatures, bootstrap_install_kind: installKind } = row;
	if (bundleHash === null && openclawVersion === null && encodedFeatures === null) return null;
	if (bundleHash === null || openclawVersion === null || encodedFeatures === null) throw new Error("Worker environment bootstrap receipt is incomplete");
	return normalizeBootstrapReceipt({
		bundleHash,
		openclawVersion,
		protocolFeatures: JSON.parse(encodedFeatures),
		...installKind === null ? {} : { installKind }
	});
}
function decodeWorkerEnvironmentRow(row, fallbackPorts) {
	const record = {
		environmentId: row.environment_id,
		providerId: row.provider_id,
		profileId: row.profile_id,
		profileSnapshot: JSON.parse(row.profile_snapshot_json),
		preparation: readWorkerEnvironmentPreparation(row),
		provisionOperationId: row.provision_operation_id,
		nodeSetupId: row.node_setup_id,
		nodeDeviceId: row.node_device_id,
		sharedHost: row.shared_host === null ? null : row.shared_host === 1,
		leaseId: row.lease_id,
		sshEndpoint: endpointFrom(row, fallbackPorts),
		desktop: desktopFrom(row),
		bootstrapReceipt: bootstrapReceiptFrom(row),
		ownerEpoch: row.owner_epoch,
		teardownTerminalState: teardownTerminalStateFrom(row.teardown_terminal_state),
		state: parseWorkerEnvironmentState(row.state),
		attachedSessionIds: normalizeAttachedSessionIds(JSON.parse(row.attached_session_ids_json)),
		createdAtMs: row.created_at_ms,
		updatedAtMs: row.updated_at_ms,
		stateChangedAtMs: row.state_changed_at_ms,
		lastActivatedAtMs: row.last_activated_at_ms,
		idleSinceAtMs: row.idle_since_at_ms,
		destroyRequestedAtMs: row.destroy_requested_at_ms,
		lastError: row.last_error
	};
	assertShape(record.state, record.leaseId, record.nodeDeviceId, record.sshEndpoint, record.desktop, record.bootstrapReceipt, record.attachedSessionIds);
	return record;
}
function credentialFromRow(row) {
	return {
		environmentId: row.environment_id,
		credentialHash: normalizeCredentialHash(row.credential_hash),
		bundleHash: row.bundle_hash,
		sessionId: row.session_id,
		rpcSetVersion: row.rpc_set_version,
		ownerEpoch: row.owner_epoch,
		expiresAtMs: row.expires_at_ms,
		deliveredAtMs: row.delivered_at_ms
	};
}
function json(value) {
	const encoded = JSON.stringify(value);
	if (encoded === void 0) throw new Error("Worker environment value must be JSON serializable");
	return encoded;
}
const queryWorkerEnvironmentStore = (db) => getNodeSqliteKysely(db);
function environmentRows(db) {
	return queryWorkerEnvironmentStore(db).selectFrom("worker_environments").selectAll("worker_environments").select((eb) => eb.selectFrom("worker_environment_ssh_fallback_ports").select(({ fn }) => fn.agg("json_group_array", ["port"]).orderBy("position").as("ports")).whereRef("worker_environment_ssh_fallback_ports.environment_id", "=", "worker_environments.environment_id").$asScalar().as("ssh_fallback_ports_json"));
}
function recordsFromRows(rows) {
	return rows.map((row) => decodeWorkerEnvironmentRow(row, JSON.parse(row.ssh_fallback_ports_json)));
}
function findWorkerEnvironment(db, environmentId) {
	const rows = executeSqliteQuerySync(db, environmentRows(db).where("worker_environments.environment_id", "=", environmentId)).rows;
	return recordsFromRows(rows)[0];
}
function findCredential(db, environmentId) {
	const row = executeSqliteQueryTakeFirstSync(db, queryWorkerEnvironmentStore(db).selectFrom("worker_environment_credentials").selectAll().where("environment_id", "=", environmentId));
	return row ? credentialFromRow(row) : void 0;
}
function getRequiredWorkerEnvironment(db, environmentId) {
	const record = findWorkerEnvironment(db, environmentId);
	if (!record) throw new Error(`Unknown worker environment: ${environmentId}`);
	return record;
}
function listRows(db) {
	const rows = executeSqliteQuerySync(db, environmentRows(db).orderBy("worker_environments.created_at_ms").orderBy("worker_environments.environment_id")).rows;
	return recordsFromRows(rows);
}
/** Prepared inside the owning transaction; absent rows are explicit deletion facts. */
function readWorkerEnvironmentFacts(db, ids) {
	const environments = ids ? ids.flatMap((id) => {
		const row = findWorkerEnvironment(db, id);
		return row ? [row] : [];
	}) : listRows(db);
	const credentialQuery = queryWorkerEnvironmentStore(db).selectFrom("worker_environment_credentials").selectAll();
	const credentials = ids?.length === 0 ? [] : executeSqliteQuerySync(db, ids ? credentialQuery.where("environment_id", "in", ids) : credentialQuery).rows.map(credentialFromRow);
	const attachments = readWorkerEnvironmentSessionAttachments(db, ids);
	return {
		ids: ids ? [...ids] : environments.map((row) => row.environmentId),
		environments,
		credentials,
		attachments
	};
}
//#endregion
//#region src/gateway/worker-environments/placement-dispatch-store.worker.ts
function startWorkerPlacementDispatchInWorker(input, database) {
	const identity = normalizeIdentity(input.placement);
	const executionMode = normalizeWorkerPlacementExecutionMode(input.placement.executionMode);
	return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const current = ensureLocal(db, identity, input.nowMs);
		assertSessionWorkspaceUnreserved(db, identity.sessionId);
		if (current.state !== "local" && current.state !== "reclaimed" && current.state !== "failed") throw new Error(`Cannot dispatch session ${identity.sessionId} from placement ${current.state}`);
		const expected = input.placement.expectedPlacement;
		if (expected) {
			if (!matchesWorkerPlacementTarget(current, expected) || current.executionMode !== executionMode || current.state !== "reclaimed" && current.state !== "failed" || current.turnClaim) throw new Error(`Worker placement ${identity.sessionId} changed before redispatch`);
			const journal = executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("worker_workspace_reconciliations").select("session_id").where("session_id", "=", identity.sessionId)).rows[0];
			if (hasWorkerWorkspacePendingResult(db, identity.sessionId) || journal || readWorkerPlacementMovesReadOnly(db, [identity.sessionId]).has(identity.sessionId)) throw new Error(`Worker placement ${identity.sessionId} still has pending workspace recovery`);
			if (current.state === "failed") {
				const environment = current.environmentId ? findWorkerEnvironment(db, current.environmentId) : void 0;
				if (current.activeOwnerEpoch === null || !environment || !isFailedWorkerPlacementEnvironmentGone({
					environmentService: { get: () => environment },
					placement: current
				})) throw new Error(`Failed worker placement ${identity.sessionId} still requires recovery`);
			}
		}
		if (executeSqliteQuerySync(db, query$5(db).updateTable("worker_session_placements").set({
			state: "requested",
			execution_mode: executionMode,
			environment_id: null,
			transition_generation: nextGeneration(current.generation),
			active_owner_epoch: null,
			workspace_base_manifest_ref: null,
			remote_workspace_dir: null,
			worker_bundle_hash: null,
			last_transcript_ack_cursor: null,
			last_live_event_ack_cursor: null,
			recovery_error: null,
			terminal_reason: null,
			terminal_at_ms: null,
			updated_at_ms: input.nowMs,
			state_changed_at_ms: input.nowMs
		}).where("session_id", "=", current.sessionId).where("state", "=", current.state).where("transition_generation", "=", current.generation)).numAffectedRows !== 1n) throw new Error(`Session ${identity.sessionId} placement changed during dispatch barrier`);
		const updated = getRequired(db, identity.sessionId);
		deferSqliteWorkerCommitReceipt(db, updated);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: updated.turnClaim
		});
		return updated;
	}, { database }, { operationLabel: "workerPlacements.startDispatch" });
}
//#endregion
//#region src/gateway/worker-environments/placement-turn-claims.worker-contract.ts
function isPlacementTurnClaimCommand(command) {
	return command.type === "placementTurns.claim" || command.type === "placementTurns.release" || command.type === "placementTurns.releaseIfOwned" || command.type === "placementTurns.recoverWorkspace" || command.type === "placementTurns.handoffRuntimeRefreshResult";
}
//#endregion
//#region src/gateway/worker-environments/placement-turn-claims.worker.ts
function executePlacementTurnClaimCommand(command, database) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const runtime = {
			path: database.path,
			instanceId: command.type === "placementTurns.recoverWorkspace" || command.type === "placementTurns.handoffRuntimeRefreshResult" ? command.input.gatewayInstanceId : "",
			now: () => command.input.nowMs ?? Date.now(),
			read: () => db,
			write: (operation) => operation(db)
		};
		const claims = createPlacementTurnClaimOps(runtime);
		let receipt;
		if (command.type === "placementTurns.claim") {
			const claim = claims.claimTurn(command.input.claim);
			receipt = {
				claim,
				placement: getRequired(db, claim.sessionId)
			};
		} else if (command.type === "placementTurns.recoverWorkspace") {
			const results = createPlacementWorkspaceResultOps(runtime);
			results.markWorkspaceResultPending(command.input.claim);
			results.handoffWorkspaceResultRecovery(command.input.claim);
			receipt = { placement: getRequired(db, command.input.claim.sessionId) };
		} else if (command.type === "placementTurns.handoffRuntimeRefreshResult") {
			const placement = getRequired(db, command.input.claim.sessionId);
			if (placement.state !== "active" || placement.generation !== command.input.expectedGeneration || command.input.claim.owner.kind !== "worker") throw new Error("Worker runtime refresh lost its workspace result owner");
			createPlacementWorkspaceResultOps(runtime).handoffWorkspaceResultRecovery(command.input.claim);
			receipt = { placement };
		} else if (command.type === "placementTurns.releaseIfOwned" && !claims.validateTurnClaim(command.input.claim)) receipt = {};
		else receipt = { placement: claims.releaseTurn(command.input.claim) };
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: receipt
		});
		deferSqliteWorkerCommitReceipt(db, receipt);
		return receipt;
	}, { database }, { operationLabel: command.type });
}
//#endregion
//#region src/gateway/worker-environments/store-worker-contract.ts
function isWorkerEnvironmentCommand(command) {
	return command.type.startsWith("workerEnvironments.");
}
//#endregion
//#region src/gateway/worker-environments/store-mutations.ts
function nextGlobalOwnerEpoch(db) {
	const latestEnvironment = executeSqliteQueryTakeFirstSync(db, queryWorkerEnvironmentStore(db).selectFrom("worker_environments").select(({ fn }) => fn.max("owner_epoch").as("owner_epoch")));
	const latestTranscriptCommit = executeSqliteQueryTakeFirstSync(db, queryWorkerEnvironmentStore(db).selectFrom("worker_transcript_commit_heads").select(({ fn }) => fn.max("run_epoch").as("run_epoch")));
	const next = Math.max(latestEnvironment?.owner_epoch ?? 0, latestTranscriptCommit?.run_epoch ?? 0) + 1;
	if (!Number.isSafeInteger(next)) throw new Error("Worker environment owner epoch is exhausted");
	return next;
}
function updateRow(db, id, state, values) {
	if (executeSqliteQuerySync(db, queryWorkerEnvironmentStore(db).updateTable("worker_environments").set(values).where("environment_id", "=", id).where("state", "=", state)).numAffectedRows !== 1n) throw new Error(`Worker environment ${id} changed during update`);
}
function updateWorkerEnvironmentRecord(db, id, state, values) {
	updateRow(db, id, state, values);
	return getRequiredWorkerEnvironment(db, id);
}
function replaceSshFallbackPorts(db, environmentId, ports) {
	executeSqliteQuerySync(db, queryWorkerEnvironmentStore(db).deleteFrom("worker_environment_ssh_fallback_ports").where("environment_id", "=", environmentId));
	if (ports.length === 0) return;
	const rows = ports.map((port, position) => ({
		environment_id: environmentId,
		position,
		port
	}));
	executeSqliteQuerySync(db, queryWorkerEnvironmentStore(db).insertInto("worker_environment_ssh_fallback_ports").values(rows));
}
function revokeCredential(db, environmentId) {
	executeSqliteQuerySync(db, queryWorkerEnvironmentStore(db).deleteFrom("worker_environment_credentials").where("environment_id", "=", environmentId));
}
function upsertCredential(db, credential) {
	executeSqliteQuerySync(db, queryWorkerEnvironmentStore(db).insertInto("worker_environment_credentials").values(credential).onConflict((conflict) => conflict.column("environment_id").doUpdateSet({
		credential_hash: credential.credential_hash,
		bundle_hash: credential.bundle_hash,
		session_id: credential.session_id,
		rpc_set_version: credential.rpc_set_version,
		owner_epoch: credential.owner_epoch,
		expires_at_ms: credential.expires_at_ms,
		delivered_at_ms: credential.delivered_at_ms
	})));
}
function credentialInsert(params) {
	const sessionId = normalizeSessionId(params.input.sessionId);
	assertCredentialSessionBinding(params.attachedSessionIds, sessionId);
	const expiresAtMs = normalizeExpiry(params.input.expiresAtMs);
	if (expiresAtMs <= params.nowMs) throw new Error("Worker credential expiry must be in the future");
	return {
		environment_id: params.environmentId,
		credential_hash: normalizeCredentialHash(params.input.credentialHash),
		bundle_hash: params.bundleHash,
		session_id: sessionId,
		rpc_set_version: normalizeRpcSetVersion(params.input.rpcSetVersion),
		owner_epoch: params.ownerEpoch,
		expires_at_ms: expiresAtMs,
		delivered_at_ms: null
	};
}
function compareAttachmentAuthority(left, right) {
	if (left.ownerEpoch !== right.ownerEpoch) return left.ownerEpoch > right.ownerEpoch ? -1 : 1;
	if (left.stateChangedAtMs !== right.stateChangedAtMs) return left.stateChangedAtMs > right.stateChangedAtMs ? -1 : 1;
	if (left.environmentId === right.environmentId) return 0;
	return left.environmentId < right.environmentId ? -1 : 1;
}
function reconcileAttachedSessionOwners(db, nowMs) {
	const ownersBySession = /* @__PURE__ */ new Map();
	const changed = [];
	for (const record of listRows(db)) {
		if (record.state !== "attached" || record.destroyRequestedAtMs !== null) continue;
		const sessionId = record.attachedSessionIds[0];
		if (!sessionId) continue;
		const owners = ownersBySession.get(sessionId) ?? [];
		owners.push(record);
		ownersBySession.set(sessionId, owners);
	}
	for (const owners of ownersBySession.values()) {
		if (owners.length < 2) continue;
		const [, ...duplicates] = owners.toSorted(compareAttachmentAuthority);
		for (const duplicate of duplicates) {
			updateWorkerEnvironmentRecord(db, duplicate.environmentId, "attached", {
				owner_epoch: nextGlobalOwnerEpoch(db),
				state: "idle",
				attached_session_ids_json: json([]),
				updated_at_ms: nowMs,
				state_changed_at_ms: nowMs,
				idle_since_at_ms: nowMs
			});
			revokeCredential(db, duplicate.environmentId);
			changed.push(duplicate.environmentId);
		}
	}
	return changed;
}
//#endregion
//#region src/gateway/worker-environments/store-write.ts
function readTotalChanges(db) {
	const row = executeSqliteQueryTakeFirstSync(db, getNodeSqliteKysely(db).selectNoFrom((eb) => eb.fn("total_changes", []).as("value")));
	if (typeof row?.value !== "number") throw new Error("SQLite did not return a numeric total_changes() value");
	return row.value;
}
//#endregion
//#region src/gateway/worker-environments/store-schema.ts
const ensuredDatabases = /* @__PURE__ */ new WeakSet();
const WORKER_ENVIRONMENT_SSH_FALLBACK_PORTS_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS worker_environment_ssh_fallback_ports (
  environment_id TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position >= 0 AND position <= 9),
  port INTEGER NOT NULL CHECK (port >= 1 AND port <= 65535),
  PRIMARY KEY (environment_id, position),
  UNIQUE (environment_id, port),
  FOREIGN KEY (environment_id) REFERENCES worker_environments(environment_id) ON DELETE CASCADE
) STRICT;
`;
/** The worker store prepares its additive companion tables together on first use. */
function ensureWorkerEnvironmentStoreSchema(database) {
	if (ensuredDatabases.has(database.db)) return;
	runOpenClawStateWriteTransaction(({ db }) => {
		db.exec(`${WORKER_ENVIRONMENT_SSH_FALLBACK_PORTS_SCHEMA_SQL}\n${WORKER_ENVIRONMENT_SESSION_ATTACHMENTS_SCHEMA_SQL}`);
	}, { database }, { operationLabel: "worker-environments.companion.schema.ensure" });
	const remember = () => {
		ensuredDatabases.add(database.db);
	};
	if (!stageSqliteTransactionState(database.db, {
		stage: remember,
		rollback: () => {
			ensuredDatabases.delete(database.db);
		},
		commit: remember
	})) remember();
}
//#endregion
//#region src/gateway/worker-environments/store-transitions.ts
function createWorkerEnvironmentTransitionOps({ now, write }) {
	return {
		refreshBootstrapReceipt(input) {
			const environmentId = requireWorkerEnvironmentString(input.environmentId, "id");
			const expectedReceipt = normalizeBootstrapReceipt(input.expectedBootstrapReceipt);
			const receipt = normalizeBootstrapReceipt(input.bootstrapReceipt);
			return write((db) => {
				input.assertCurrent();
				const current = getRequiredWorkerEnvironment(db, environmentId);
				if (current.state !== input.expectedState || current.ownerEpoch !== input.expectedOwnerEpoch || current.nodeDeviceId !== input.expectedNodeDeviceId || current.destroyRequestedAtMs !== null || !current.leaseId || !current.nodeDeviceId && !current.sshEndpoint || !isDeepStrictEqual(current.bootstrapReceipt, expectedReceipt)) throw new Error("Worker environment changed during runtime refresh");
				if (findCredential(db, environmentId)) throw new Error("Worker runtime refresh requires its previous credential to be revoked");
				const updatedAtMs = now();
				if (input.expectedState === "attached") {
					const attachedSessionId = current.attachedSessionIds[0];
					const placements = executeSqliteQuerySync(db, queryWorkerEnvironmentStore(db).selectFrom("worker_session_placements").selectAll().where("environment_id", "=", environmentId).where("state", "=", input.expectedReclaimResult ? "draining" : "active")).rows;
					const placement = placements.length === 1 ? placements[0] : void 0;
					if (current.attachedSessionIds.length !== 1 || !placement || placement.session_id !== attachedSessionId || placement.active_owner_epoch !== current.ownerEpoch || placement.transition_generation !== input.expectedPlacementGeneration || placement.worker_bundle_hash !== expectedReceipt.bundleHash) throw new Error("Worker placement changed during runtime refresh");
					if (input.expectedReclaimResult) {
						const retained = readWorkerWorkspaceReconciliationFacts(db, [placement.session_id]);
						const pending = retained.pendingResults.get(placement.session_id);
						if (!pending || pending.claimId !== pending.runId || !pending.claimId.startsWith("reclaim-") || !isDeepStrictEqual(pending, input.expectedReclaimResult) || !isCurrentWorkerWorkspacePendingResultOwner(retained.placements.get(placement.session_id), pending)) throw new Error("Worker runtime refresh lost its retained Stop result");
					}
					if (executeSqliteQueryTakeFirstSync(db, queryWorkerEnvironmentStore(db).selectFrom("worker_session_placement_moves").select("session_id").where("session_id", "=", placement.session_id))) throw new Error("Cannot refresh a worker runtime while its session is moving");
					executeSqliteQuerySync(db, queryWorkerEnvironmentStore(db).updateTable("worker_session_placements").set({
						worker_bundle_hash: receipt.bundleHash,
						updated_at_ms: updatedAtMs
					}).where("session_id", "=", placement.session_id));
				}
				updateRow(db, environmentId, current.state, {
					bootstrap_bundle_hash: receipt.bundleHash,
					bootstrap_openclaw_version: receipt.openclawVersion,
					bootstrap_protocol_features_json: json(receipt.protocolFeatures),
					bootstrap_install_kind: receipt.installKind ?? null,
					updated_at_ms: updatedAtMs,
					last_error: null
				});
				return getRequiredWorkerEnvironment(db, environmentId);
			});
		},
		transition(input) {
			const { from, to, patch = {} } = input;
			if (!canTransitionWorkerEnvironment(from, to)) throw new Error(`Illegal worker environment transition: ${from} -> ${to}`);
			const environmentId = requireWorkerEnvironmentString(input.environmentId, "id");
			const updatedAtMs = now();
			return write((db) => {
				const current = getRequiredWorkerEnvironment(db, environmentId);
				if (current.state !== from) throw new Error(`Worker environment ${environmentId} state conflict: expected ${from}, found ${current.state}`);
				if (input.expectedOwnerEpoch !== void 0 && current.ownerEpoch !== input.expectedOwnerEpoch) throw new Error(`Worker environment ${environmentId} owner epoch changed`);
				if (to === "attached" && current.destroyRequestedAtMs !== null) throw new Error("Cannot attach worker after destroy is requested");
				if (to === "attached") {
					if (hasWorkerEnvironmentSessionAttachment(db, environmentId)) throw new Error("Conversation-attached environments cannot be adopted for session placement");
					const sessionId = patch.attachedSessionIds?.[0];
					if (current.preparation && !sessionId) throw new Error("Prepared worker attachment requires its exact session");
					if (sessionId) assertPreparedEnvironmentAttachment(db, current, sessionId, input.placementBinding);
				}
				const clearsLeaseAfterTeardownFailure = to === "failed" && from === "destroying";
				if (clearsLeaseAfterTeardownFailure && (current.destroyRequestedAtMs === null || current.teardownTerminalState !== "failed")) throw new Error("Failed bootstrap transition requires durable provider teardown intent");
				if (clearsLeaseAfterTeardownFailure && (patch.leaseId !== null || patch.sshEndpoint !== null)) throw new Error("Failed bootstrap transition requires explicit lease clearing after provider teardown");
				const leaseId = patch.leaseId === void 0 ? current.leaseId : patch.leaseId === null ? null : requireWorkerEnvironmentString(patch.leaseId, "lease id");
				if (current.leaseId && leaseId !== current.leaseId && !clearsLeaseAfterTeardownFailure) throw new Error("Worker environment provider lease id is immutable once persisted");
				const nodeDeviceId = patch.nodeDeviceId === void 0 ? current.nodeDeviceId ?? null : patch.nodeDeviceId === null ? null : requireWorkerEnvironmentString(patch.nodeDeviceId, "node device id");
				if (current.nodeDeviceId && nodeDeviceId !== current.nodeDeviceId && !clearsLeaseAfterTeardownFailure) throw new Error("Worker environment node device id is immutable once persisted");
				const sshEndpoint = patch.sshEndpoint === void 0 ? current.sshEndpoint : patch.sshEndpoint === null ? null : normalizeWorkerSshEndpoint(patch.sshEndpoint);
				const sharedHost = leaseId === null ? null : patch.sharedHost ?? current.sharedHost;
				const desktop = leaseId === null ? null : patch.desktop === void 0 ? current.desktop : patch.desktop === null ? null : normalizeWorkerDesktopEndpoint(patch.desktop);
				const acceptsBootstrapReceipt = to === "ready" && (from === "bootstrapping" || from === "provisioning" && sshEndpoint === null);
				if (to === "ready" && !acceptsBootstrapReceipt) throw new Error("Ready worker transition requires bootstrap proof or a node lease");
				if (patch.bootstrapReceipt !== void 0 && !acceptsBootstrapReceipt) throw new Error("Bootstrap receipt can only be recorded when a worker becomes ready");
				if (acceptsBootstrapReceipt && patch.bootstrapReceipt === void 0) throw new Error("Ready worker transition requires a bootstrap receipt");
				const acceptsAttachedCredential = to === "attached";
				const acceptsCredential = acceptsBootstrapReceipt || acceptsAttachedCredential;
				if (patch.credential !== void 0 && !acceptsCredential) throw new Error("Worker credential cannot be minted during this transition");
				if (acceptsCredential && patch.credential === void 0) throw new Error(`${to === "ready" ? "Ready" : "Attached"} worker transition requires a worker credential`);
				const clearsBootstrapReceipt = to === "bootstrapping" && (from === "ready" || from === "idle");
				const bootstrapReceipt = clearsBootstrapReceipt ? null : patch.bootstrapReceipt === void 0 ? current.bootstrapReceipt : normalizeBootstrapReceipt(patch.bootstrapReceipt);
				if (acceptsCredential && !bootstrapReceipt) throw new Error(`${to === "ready" ? "Ready" : "Attached"} worker requires bootstrap proof`);
				const attachedSessionIds = to !== "attached" ? [] : patch.attachedSessionIds === void 0 ? current.attachedSessionIds : normalizeAttachedSessionIds(patch.attachedSessionIds);
				assertShape(to, leaseId, nodeDeviceId, sshEndpoint, desktop, bootstrapReceipt, attachedSessionIds);
				const [attachedSessionId] = attachedSessionIds;
				if (to === "attached" && attachedSessionId) {
					const existingOwner = listRows(db).find((record) => record.environmentId !== environmentId && record.state === "attached" && record.destroyRequestedAtMs === null && record.attachedSessionIds[0] === attachedSessionId);
					if (existingOwner) throw new WorkerSessionAlreadyAttachedError(attachedSessionId, existingOwner.environmentId);
				}
				const revokesCredential = clearsBootstrapReceipt || to === "attached" || from === "attached" && to === "idle" || to === "draining" || to === "destroyed" || to === "failed" || to === "orphaned";
				const ownerEpoch = acceptsBootstrapReceipt ? Math.max(1, current.ownerEpoch) : acceptsAttachedCredential || (from === "ready" || from === "idle" || from === "attached") && (to === "bootstrapping" || from === "attached" && to === "idle" || to === "draining" || to === "destroyed" || to === "failed" || to === "orphaned") ? nextGlobalOwnerEpoch(db) : current.ownerEpoch;
				updateRow(db, environmentId, from, {
					lease_id: leaseId,
					node_device_id: nodeDeviceId,
					shared_host: sharedHost === null ? null : sharedHost ? 1 : 0,
					ssh_host: sshEndpoint?.host ?? null,
					ssh_port: sshEndpoint?.port ?? null,
					ssh_user: sshEndpoint?.user ?? null,
					ssh_host_key: sshEndpoint?.hostKey ?? null,
					ssh_key_ref_json: sshEndpoint ? json(sshEndpoint.keyRef) : null,
					desktop_json: desktop ? json(desktop) : null,
					bootstrap_bundle_hash: bootstrapReceipt?.bundleHash ?? null,
					bootstrap_openclaw_version: bootstrapReceipt?.openclawVersion ?? null,
					bootstrap_protocol_features_json: bootstrapReceipt ? json(bootstrapReceipt.protocolFeatures) : null,
					bootstrap_install_kind: bootstrapReceipt?.installKind ?? null,
					owner_epoch: ownerEpoch,
					state: to,
					attached_session_ids_json: json(attachedSessionIds),
					updated_at_ms: updatedAtMs,
					state_changed_at_ms: updatedAtMs,
					idle_since_at_ms: to === "idle" ? updatedAtMs : null,
					last_error: "lastError" in patch ? patch.lastError?.trim() || null : null
				});
				if (patch.sshEndpoint !== void 0) replaceSshFallbackPorts(db, environmentId, sshEndpoint?.fallbackPorts ?? []);
				if (revokesCredential) revokeCredential(db, environmentId);
				if (patch.credential && bootstrapReceipt) upsertCredential(db, credentialInsert({
					input: patch.credential,
					environmentId,
					bundleHash: bootstrapReceipt.bundleHash,
					attachedSessionIds,
					ownerEpoch,
					nowMs: updatedAtMs
				}));
				return getRequiredWorkerEnvironment(db, environmentId);
			});
		}
	};
}
//#endregion
//#region src/gateway/worker-environments/store.kernel.ts
function createWorkerEnvironmentStoreKernel(options) {
	const database = options.database;
	ensureWorkerEnvironmentStoreSchema(database);
	const now = options.now ?? Date.now;
	const read = () => database.db;
	const write = options.write;
	const createIntent = (db, input) => {
		const environmentId = requireWorkerEnvironmentString(input.environmentId, "id");
		const createdAtMs = now();
		executeSqliteQuerySync(db, queryWorkerEnvironmentStore(db).insertInto("worker_environments").values({
			environment_id: environmentId,
			provider_id: requireWorkerEnvironmentString(input.providerId, "provider id"),
			profile_id: requireWorkerEnvironmentString(input.profileId, "profile id"),
			profile_snapshot_json: json(input.profileSnapshot),
			...workerEnvironmentPreparationColumns(input.preparation),
			last_activated_at_ms: null,
			provision_operation_id: requireWorkerEnvironmentString(input.provisionOperationId, "provision operation id"),
			lease_id: null,
			node_setup_id: null,
			node_device_id: null,
			shared_host: null,
			ssh_host: null,
			ssh_port: null,
			ssh_user: null,
			ssh_host_key: null,
			ssh_key_ref_json: null,
			desktop_json: null,
			bootstrap_bundle_hash: null,
			bootstrap_openclaw_version: null,
			bootstrap_protocol_features_json: null,
			bootstrap_install_kind: null,
			owner_epoch: 0,
			teardown_terminal_state: null,
			state: "requested",
			created_at_ms: createdAtMs,
			updated_at_ms: createdAtMs,
			state_changed_at_ms: createdAtMs,
			idle_since_at_ms: null,
			destroy_requested_at_ms: null,
			last_error: null
		}));
		return getRequiredWorkerEnvironment(db, environmentId);
	};
	return {
		...createPreparedEnvironmentStoreOps({
			now,
			write,
			createIntent,
			get: findWorkerEnvironment
		}),
		...createWorkerEnvironmentSessionAttachmentStore({
			now,
			read,
			write,
			createIntent,
			getEnvironment: findWorkerEnvironment
		}),
		...createWorkerEnvironmentTransitionOps({
			now,
			write
		}),
		createIntent(input) {
			return write((db) => createIntent(db, input));
		},
		ensureNodeEnrollment(environmentIdInput) {
			const environmentId = requireWorkerEnvironmentString(environmentIdInput, "id");
			return write((db) => {
				ensureWorkerEnvironmentNodeEnrollmentSchema(db);
				const current = getRequiredWorkerEnvironment(db, environmentId);
				if (TERMINAL_STATES.includes(current.state) || current.destroyRequestedAtMs !== null) throw new Error(`Worker environment ${environmentId} cannot begin node enrollment`);
				const setupId = current.nodeSetupId ?? randomUUID();
				const completedDeviceId = executeSqliteQueryTakeFirstSync(db, queryWorkerEnvironmentStore(db).selectFrom("device_pair_setup_completions").select("device_id").where("setup_id", "=", setupId))?.device_id ?? null;
				if (current.nodeDeviceId !== null && completedDeviceId !== null && current.nodeDeviceId !== completedDeviceId) throw new Error(`Worker environment ${environmentId} node enrollment identity changed`);
				const nodeDeviceId = current.nodeDeviceId ?? completedDeviceId;
				if (current.nodeSetupId === setupId && current.nodeDeviceId === nodeDeviceId) return current;
				return updateWorkerEnvironmentRecord(db, environmentId, current.state, {
					node_setup_id: setupId,
					node_device_id: nodeDeviceId,
					updated_at_ms: now()
				});
			});
		},
		revokeEnvironmentCredential(input) {
			const environmentId = requireWorkerEnvironmentString(input.environmentId, "id");
			return write((db) => {
				if (input.expectedOwnerEpoch !== void 0 && getRequiredWorkerEnvironment(db, environmentId).ownerEpoch !== input.expectedOwnerEpoch) throw new Error(`Worker environment ${environmentId} owner epoch changed`);
				revokeCredential(db, environmentId);
			});
		},
		reconcileSharedHost(input) {
			const environmentId = requireWorkerEnvironmentString(input.environmentId, "id");
			const leaseId = requireWorkerEnvironmentString(input.leaseId, "lease id");
			return write((db) => {
				const current = getRequiredWorkerEnvironment(db, environmentId);
				if (current.state !== input.state || current.leaseId !== leaseId) throw new Error(`Worker environment ${environmentId} lease changed during inspection`);
				if (current.sharedHost === input.sharedHost) return current;
				return updateWorkerEnvironmentRecord(db, environmentId, current.state, {
					shared_host: input.sharedHost ? 1 : 0,
					updated_at_ms: now()
				});
			});
		},
		adoptProvisionCleanupFailure(input) {
			const environmentId = requireWorkerEnvironmentString(input.environmentId, "id");
			const leaseId = requireWorkerEnvironmentString(input.leaseId, "lease id");
			const lastError = requireWorkerEnvironmentString(input.lastError, "last error");
			return write((db) => {
				const current = getRequiredWorkerEnvironment(db, environmentId);
				if (current.state !== "provisioning" || current.leaseId !== null) throw new Error(`Worker environment ${environmentId} cannot adopt provision cleanup`);
				const updatedAtMs = now();
				return updateWorkerEnvironmentRecord(db, environmentId, current.state, {
					lease_id: leaseId,
					state: "destroying",
					updated_at_ms: updatedAtMs,
					state_changed_at_ms: updatedAtMs,
					destroy_requested_at_ms: current.destroyRequestedAtMs ?? updatedAtMs,
					teardown_terminal_state: current.teardownTerminalState ?? "failed",
					last_error: lastError
				});
			});
		},
		requestDestroy(input) {
			const environmentId = requireWorkerEnvironmentString(input.environmentId, "id");
			return write((db) => {
				const current = getRequiredWorkerEnvironment(db, environmentId);
				if (current.state !== input.state) throw new Error(`Worker environment ${environmentId} changed before destroy request`);
				if (current.destroyRequestedAtMs !== null) return current;
				const requestedAtMs = now();
				const terminalState = input.terminalState ?? "destroyed";
				return updateWorkerEnvironmentRecord(db, environmentId, input.state, {
					updated_at_ms: requestedAtMs,
					destroy_requested_at_ms: requestedAtMs,
					teardown_terminal_state: terminalState,
					...input.lastError === void 0 ? {} : { last_error: requireWorkerEnvironmentString(input.lastError, "last error") }
				});
			});
		},
		renewCredential(input) {
			const environmentId = requireWorkerEnvironmentString(input.environmentId, "id");
			return write((db) => {
				const current = getRequiredWorkerEnvironment(db, environmentId);
				if (current.ownerEpoch !== input.expectedOwnerEpoch) throw new Error(`Worker environment ${environmentId} owner epoch changed`);
				if (current.state !== "ready" && current.state !== "idle" && current.state !== "attached") throw new Error(`Cannot mint worker credential in state ${current.state}`);
				if (current.destroyRequestedAtMs !== null) throw new Error("Cannot mint worker credential after destroy is requested");
				if (!current.bootstrapReceipt) throw new Error("Worker environment has no admitted bootstrap identity");
				const updatedAtMs = now();
				const ownerEpoch = Math.max(1, current.ownerEpoch);
				if (ownerEpoch !== current.ownerEpoch) updateWorkerEnvironmentRecord(db, environmentId, current.state, {
					owner_epoch: ownerEpoch,
					updated_at_ms: updatedAtMs
				});
				upsertCredential(db, credentialInsert({
					input,
					environmentId,
					bundleHash: current.bootstrapReceipt.bundleHash,
					attachedSessionIds: current.attachedSessionIds,
					ownerEpoch,
					nowMs: updatedAtMs
				}));
				const credential = findCredential(db, environmentId);
				if (!credential) throw new Error("Worker credential persistence failed");
				return credential;
			});
		},
		markCredentialDelivered(input) {
			const environmentId = requireWorkerEnvironmentString(input.environmentId, "id");
			return write((db) => {
				const environment = getRequiredWorkerEnvironment(db, environmentId);
				const credential = findCredential(db, environmentId);
				if (!credential || environment.state !== "ready" && environment.state !== "idle" && environment.state !== "attached" || environment.destroyRequestedAtMs !== null || credential.credentialHash !== normalizeCredentialHash(input.credentialHash) || credential.ownerEpoch !== input.ownerEpoch || environment.ownerEpoch !== input.ownerEpoch || credential.sessionId !== normalizeSessionId(input.sessionId)) throw new Error(`Worker environment ${environmentId} credential changed`);
				const deliveredAtMs = normalizeExpiry(input.deliveredAtMs);
				if (deliveredAtMs >= credential.expiresAtMs) throw new Error("Expired worker credential cannot be marked delivered");
				if (executeSqliteQuerySync(db, queryWorkerEnvironmentStore(db).updateTable("worker_environment_credentials").set({ delivered_at_ms: deliveredAtMs }).where("environment_id", "=", environmentId).where("credential_hash", "=", credential.credentialHash).where("owner_epoch", "=", credential.ownerEpoch)).numAffectedRows !== 1n) throw new Error(`Worker environment ${environmentId} credential changed`);
			});
		},
		recordError(input) {
			return write((db) => updateWorkerEnvironmentRecord(db, requireWorkerEnvironmentString(input.environmentId, "id"), input.state, {
				updated_at_ms: now(),
				last_error: requireWorkerEnvironmentString(input.error, "last error")
			}));
		}
	};
}
//#endregion
//#region src/gateway/worker-environments/store.worker.ts
const admitted = () => {};
function executeWorkerEnvironmentCommand(command, database) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const now = () => command.input.nowMs ?? Date.now();
		const store = createWorkerEnvironmentStoreKernel({
			database,
			now,
			write: (operation) => operation(db)
		});
		const changesBefore = readTotalChanges(db);
		const touched = /* @__PURE__ */ new Set();
		const touch = (id) => touched.add(id.trim());
		const receipt = {
			result: (() => {
				switch (command.type) {
					case "workerEnvironments.initialize":
						for (const id of reconcileAttachedSessionOwners(db, now())) touch(id);
						return;
					case "workerEnvironments.createIntent":
						touch(command.input.input.environmentId);
						return store.createIntent(command.input.input);
					case "workerEnvironments.ensureNodeEnrollment":
						touch(command.input.input);
						return store.ensureNodeEnrollment(command.input.input);
					case "workerEnvironments.revokeEnvironmentCredential":
						touch(command.input.input.environmentId);
						return store.revokeEnvironmentCredential(command.input.input);
					case "workerEnvironments.reconcileSharedHost":
						touch(command.input.input.environmentId);
						return store.reconcileSharedHost(command.input.input);
					case "workerEnvironments.adoptProvisionCleanupFailure":
						touch(command.input.input.environmentId);
						return store.adoptProvisionCleanupFailure(command.input.input);
					case "workerEnvironments.requestDestroy":
						touch(command.input.input.environmentId);
						return store.requestDestroy(command.input.input);
					case "workerEnvironments.refreshBootstrapReceipt":
						touch(command.input.input.environmentId);
						return store.refreshBootstrapReceipt({
							...command.input.input,
							assertCurrent: admitted
						});
					case "workerEnvironments.transition": {
						const input = command.input.input;
						touch(input.environmentId);
						return store.transition({
							...input,
							placementBinding: input.placementBinding ? {
								...input.placementBinding,
								assertCurrent: admitted
							} : void 0
						});
					}
					case "workerEnvironments.renewCredential":
						touch(command.input.input.environmentId);
						return store.renewCredential(command.input.input);
					case "workerEnvironments.markCredentialDelivered":
						touch(command.input.input.environmentId);
						return store.markCredentialDelivered(command.input.input);
					case "workerEnvironments.recordError":
						touch(command.input.input.environmentId);
						return store.recordError(command.input.input);
					case "workerEnvironments.ensurePreparedIntent": {
						const value = store.ensurePreparedIntent({
							...command.input.input,
							assertCurrent: admitted
						});
						touch(command.input.input.intent.environmentId);
						if (value) touch(value.environmentId);
						return value;
					}
					case "workerEnvironments.requestPreparedDestroy":
						touch(command.input.input.environmentId);
						return store.requestPreparedDestroy({
							...command.input.input,
							assertCurrent: admitted
						});
					case "workerEnvironments.createSessionAttachmentIntent": {
						const previous = store.getSessionAttachmentRecord(command.input.input.sessionId);
						if (previous) touch(previous.environmentId);
						touch(command.input.input.environmentId);
						return store.createSessionAttachmentIntent(command.input.input, admitted);
					}
					case "workerEnvironments.closeSessionAttachment": {
						const value = store.closeSessionAttachment(command.input.input, admitted);
						if (value) touch(value.environmentId);
						return value;
					}
					case "workerEnvironments.cancelSessionAttachmentReservation":
						touch(command.input.input.environmentId);
						return store.cancelSessionAttachmentReservation(command.input.input);
					case "workerEnvironments.touchSessionAttachment":
						touch(command.input.input.environmentId);
						return store.touchSessionAttachment(command.input.input, admitted);
					case "workerEnvironments.pruneTerminalEnvironments": {
						const { approved } = command.input.input;
						for (const row of approved) touch(row.environment_id);
						return pruneObservedTerminalWorkerEnvironments({
							observed: approved,
							write: (operation) => operation(db)
						});
					}
				}
			})(),
			changed: readTotalChanges(db) !== changesBefore,
			facts: readWorkerEnvironmentFacts(db, [...touched])
		};
		deferSqliteWorkerCommitReceipt(db, receipt);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: createWorkerEnvironmentCommitAdmission(receipt.facts)
		});
		return receipt;
	}, { database }, { operationLabel: command.type });
}
//#endregion
//#region src/infra/deferred-plugin-migrations.worker.ts
function readDeferredPluginMigrationsInWorker(command, options) {
	return command.type === "plugins.deferredMigrations.read" ? readDeferredPluginMigrations({
		...options,
		artifactPreservingReadOnly: command.input.artifactPreservingReadOnly
	}) : readDeferredPluginMigrationCompletions(options);
}
function recordDeferredPluginMigrationsInWorker(input, options) {
	try {
		return runOpenClawStateWriteTransaction(({ db }) => {
			assertOpenClawStateLeaseWorkerOwnedInTransaction(db, input.identity);
			const transitions = recordDeferredPluginMigrationsInTransaction(db, input);
			assertOpenClawStateLeaseWorkerOwnedInTransaction(db, input.identity, "write", "commit");
			return {
				kind: "recorded",
				transitions
			};
		}, options, { operationLabel: "state.plugin-migration-deferral" });
	} catch (error) {
		if (error instanceof DeferredPluginMigrationConflictError) return {
			kind: "conflict",
			pending: error.pending
		};
		if (error instanceof ZodError) return {
			kind: "invalid",
			issues: error.issues
		};
		throw error;
	}
}
//#endregion
//#region src/infra/outbound/delivery-queue-media-staging.kernel.ts
function entryPayloads(entry) {
	if (Array.isArray(entry.payloads)) return entry.payloads;
	return (entry.preparedBatch?.entries ?? []).flatMap((prepared) => prepared.status === "accepted" && prepared.payload ? [prepared.payload] : []);
}
function createDeliveryQueueMediaRetentionInDatabase(database, artifacts, entryKind, prepared = {
	id: generateSecureUuid(),
	enqueuedAt: Date.now()
}) {
	const { id, enqueuedAt } = prepared;
	const entry = {
		id,
		enqueuedAt,
		retryCount: 0,
		artifacts: [...artifacts]
	};
	if (!upsertDeliveryQueueEntryInDatabase({
		queueName: "outbound-media-staging",
		entry,
		metadata: { entryKind },
		insertOnly: true
	}, database)) throw new Error(`Delivery queue media stage already exists: ${id}`);
	return id;
}
/**
* Atomically expire abandoned stages and return every artifact still owned by
* either a replayable outbound row or a producer that may still commit one.
*/
function loadDeliveryQueueMediaRetentionSnapshotInDatabase(database, params) {
	const snapshot = expireStagingAndLoadDeliveryQueueEntriesInDatabase(database, {
		queueNames: [
			...OUTBOUND_EXECUTABLE_QUEUE_NAMES,
			LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME,
			OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
			OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME
		],
		stagingQueueName: DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME,
		expireBeforeMs: params.expireBeforeMs
	});
	const { rows: migrationRows } = executeSqliteQuerySync(database.db, getNodeSqliteKysely(database.db).selectFrom("migration_sources").select("report_json").where("migration_kind", "=", "delivery-queues").where("removed_source", "=", 0));
	const migrationMedia = migrationRows.flatMap((row) => {
		const report = asNullableRecord(JSON.parse(row.report_json));
		if (report?.mediaPreserved === true) return [];
		const paths = report?.mediaPaths;
		if (!Array.isArray(paths) || !paths.every((value) => typeof value === "string")) throw new Error("Cannot safely collect queue media with an invalid migration receipt");
		return paths;
	});
	return {
		payloads: snapshot.entries.map((entry) => entryPayloads(entry)),
		stagedArtifacts: snapshot.stagingEntries.flatMap((entry) => {
			const artifacts = entry.artifacts;
			return Array.isArray(artifacts) ? artifacts.filter((artifact) => typeof artifact === "string") : [];
		}).concat(migrationMedia)
	};
}
//#endregion
//#region src/infra/outbound/delivery-queue-ownership.kernel.ts
const OUTBOUND_DELIVERY_NAMESPACE_DESCRIPTORS = [
	...OUTBOUND_EXECUTABLE_QUEUE_NAMES.map((queueName) => ({
		queueName,
		namespace: "prepared",
		retired: false
	})),
	{
		queueName: OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
		namespace: "preparing",
		retired: true
	},
	{
		queueName: OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME,
		namespace: "migration",
		retired: true
	},
	{
		queueName: OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
		namespace: "legacy-preparing",
		retired: true
	},
	{
		queueName: LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME,
		namespace: "legacy",
		retired: true
	}
];
/** Exact IDs share one custody owner across the executable outbound formats. */
function resolveOutboundDeliveryQueueNameInDatabase(database, id) {
	const owners = getDeliveryQueueEntriesOwnersInDatabase(database, OUTBOUND_EXECUTABLE_QUEUE_NAMES, [id]).get(id);
	if (owners && owners.size > 1) throw new Error(`Ambiguous outbound delivery custody: ${id}`);
	return owners?.keys().next().value ?? "outbound-prepared-v1";
}
function findDeliveryIntentOwnersInDatabase(database, params) {
	const owners = getDeliveryQueueEntriesOwnersInDatabase(database, OUTBOUND_DELIVERY_NAMESPACE_DESCRIPTORS.map(({ queueName }) => queueName), params.ids);
	return params.ids.map((id) => {
		const namespaces = owners.get(id);
		if (OUTBOUND_EXECUTABLE_QUEUE_NAMES.filter((queueName) => namespaces?.has(queueName)).length > 1) throw new Error(`Ambiguous outbound delivery custody: ${id}`);
		for (const descriptor of OUTBOUND_DELIVERY_NAMESPACE_DESCRIPTORS) {
			const owner = namespaces?.get(descriptor.queueName);
			if (owner) return {
				...descriptor,
				...owner
			};
		}
		return null;
	});
}
//#endregion
//#region src/infra/outbound/delivery-queue-ack.kernel.ts
/** Retires an unsent live claim while its adapter preparation still owns resources. */
function retireUnsentDeliveryInDatabase(database, params, terminalOutcome) {
	const stateDir = params.stateDir;
	const queueName = resolveOutboundDeliveryQueueNameInDatabase(database, params.id);
	let retired;
	transitionOwnedDeliveryQueueEntryInDatabase(database, {
		queueName,
		id: params.id,
		platformSendAttemptId: params.producerClaimId
	}, (current) => {
		if (current.recoveryState !== "producer_claimed" || current.platformSendAttemptId !== void 0 || current.platformSendStartedAt !== void 0 || !hasLiveDeliveryQueueClaim(current, params.producerClaimId, Date.now())) return;
		const entry = current;
		if (terminalOutcome === "failed" && entry.deliveryCompletion) return;
		const artifacts = collectEntrySpoolPaths(acceptedPreparedOutboundEntries(entry.preparedBatch).map((prepared) => prepared.payload), stateDir);
		if (terminalOutcome === "failed" && terminalizePendingDeliveryQueueEntryInDatabase(database, prepareDeliveryQueueTerminalEntry({
			queueName,
			id: entry.id,
			entry,
			expectedStatus: "pending"
		})).status !== "terminalized") return;
		const retention = artifacts.length ? createDeliveryQueueMediaRetentionInDatabase(database, artifacts, "outbound-media-recovery-lease") : void 0;
		if (terminalOutcome !== "failed") deleteDeliveryQueueEntryInDatabase(database, queueName, entry.id);
		retired = {
			spoolPaths: artifacts,
			retention
		};
	});
	return retired;
}
function ackDeliveryInDatabase(database, id, requestedStateDir, options) {
	const stateDir = requestedStateDir;
	const queueName = resolveOutboundDeliveryQueueNameInDatabase(database, id);
	let spoolPaths = [];
	const settle = (current) => {
		spoolPaths = current ? collectEntrySpoolPaths(acceptedPreparedOutboundEntries(current.preparedBatch).map((prepared) => prepared.payload), stateDir) : [];
		if (current?.completionRetention && options?.suppressCompletionReceipt !== true) {
			if (options && "expectedPlatformSendAttemptId" in options) completeLoadedDeliveryQueueEntryInDatabase(database, queueName, id, current);
			else completeDeliveryQueueEntryInDatabase(database, queueName, id);
		} else deleteDeliveryQueueEntryInDatabase(database, queueName, id);
	};
	const platformSendAttemptId = options && "expectedPlatformSendAttemptId" in options ? options.expectedPlatformSendAttemptId ?? null : null;
	if (!transitionOwnedDeliveryQueueEntryInDatabase(database, {
		queueName,
		id,
		platformSendAttemptId,
		allowMissingEntry: !(options && "expectedPlatformSendAttemptId" in options)
	}, (entry) => {
		settle(entry);
	})) throw new Error(`Delivery platform claim was lost: ${id}`);
	return spoolPaths;
}
/** Conditionally dead-letter a freshly re-read pending entry without a claimed state. */
function failPendingDeliveryInDatabase(database, params, preparedTerminal) {
	const queueName = outboundDeliveryQueueName(params.entry);
	const terminal = {
		queueName,
		id: params.id,
		entry: params.entry
	};
	const prepared = params.expectedPlatformSendAttemptId === void 0 ? preparedTerminal ?? prepareDeliveryQueueTerminalEntry(terminal) : void 0;
	let terminalized = false;
	const terminalize = () => {
		terminalized = terminalizePendingDeliveryQueueEntryInDatabase(database, prepared ?? prepareDeliveryQueueTerminalEntry(terminal)).status === "terminalized";
	};
	if (params.expectedPlatformSendAttemptId !== void 0) transitionOwnedDeliveryQueueEntryInDatabase(database, {
		queueName,
		id: params.id,
		platformSendAttemptId: params.expectedPlatformSendAttemptId
	}, terminalize);
	else terminalize();
	if (terminalized) return { status: "failed" };
	return { status: "not_pending" };
}
//#endregion
//#region src/infra/outbound/delivery-queue-ack.worker.ts
function executeDeliveryQueueAck(input, writeOptions) {
	const { id, stateDir, options } = input;
	return runOpenClawStateWriteTransaction((writer) => ackDeliveryInDatabase(writer, id, stateDir, options), writeOptions, { operationLabel: `mutate owned ${OUTBOUND_DELIVERY_QUEUE_NAME} delivery platform send` });
}
//#endregion
//#region src/infra/outbound/delivery-queue-enqueue.worker.ts
function executeDeliveryQueueEnqueue(input, writeOptions) {
	const entry = JSON.parse(input.entryJson);
	const queueName = outboundDeliveryQueueName(entry);
	const conflictQueueNames = [
		...OUTBOUND_EXECUTABLE_QUEUE_NAMES.filter((name) => name !== queueName),
		OUTBOUND_DELIVERY_MIGRATION_QUEUE_NAME,
		OUTBOUND_LEGACY_PREPARATION_QUEUE_NAME,
		LEGACY_OUTBOUND_DELIVERY_QUEUE_NAME
	];
	const transaction = { outcome: "unobserved" };
	try {
		return runOpenClawStateWriteTransaction((database) => {
			stageSqliteTransactionState(database.db, {
				stage: () => {
					transaction.outcome = "pending";
				},
				commit: () => {
					transaction.outcome = "committed";
				},
				rollback: () => {
					transaction.outcome = "rolled-back";
				}
			});
			if (input.kind === "random" && !input.mediaStageId) {
				upsertDeliveryQueueEntryInDatabase({
					queueName,
					entry
				}, database);
				return "created";
			}
			if (input.kind === "prepared") return movePendingDeliveryQueueEntryNamespaceInDatabase(database, {
				sourceQueueName: OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
				destinationQueueName: queueName,
				conflictQueueNames,
				expectedSourceEntry: JSON.parse(input.preparationJson),
				destinationEntry: entry,
				...input.mediaStageId ? {
					stagingQueueName: DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME,
					stagingId: input.mediaStageId
				} : {}
			});
			const params = {
				queueName,
				conflictQueueNames: input.kind === "stable" ? [...conflictQueueNames, OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME] : [],
				entry
			};
			if (input.mediaStageId) return commitStagedDeliveryQueueEntryOnceAcrossNamespacesInDatabase(database, {
				...params,
				stagingId: input.mediaStageId,
				stagingQueueName: DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME
			});
			return upsertDeliveryQueueEntryOnceAcrossNamespacesInDatabase(database, params) ? "created" : "existing";
		}, writeOptions, { operationLabel: "enqueue outbound delivery" });
	} catch (cause) {
		if (transaction.outcome === "rolled-back") {
			const error = encodeOpenClawStateWorkerError(cause, { includeOrdinary: true });
			if (error) return {
				status: "not-published",
				error
			};
		}
		throw cause;
	}
}
//#endregion
//#region src/infra/outbound/delivery-queue-pending-failure.worker.ts
function executePendingDeliveryFailure(input, writeOptions) {
	const entry = JSON.parse(input.entryJson);
	const params = {
		...input,
		entry
	};
	const result = input.expectedPlatformSendAttemptId !== void 0 ? runOpenClawStateWriteTransaction((writer) => failPendingDeliveryInDatabase(writer, params, input.prepared), writeOptions, { operationLabel: `mutate owned ${OUTBOUND_DELIVERY_QUEUE_NAME} delivery platform send` }) : failPendingDeliveryInDatabase(writeOptions.database, params, input.prepared);
	return {
		result,
		spoolPaths: result.status === "failed" && input.retainSpoolArtifacts !== true ? collectEntrySpoolPaths(acceptedPreparedOutboundEntries(entry.preparedBatch).map((prepared) => prepared.payload), input.stateDir) : []
	};
}
//#endregion
//#region src/infra/outbound/delivery-queue-platform-lease.worker.ts
function executeDeliveryQueuePlatformLeaseCommand(command, options) {
	return runOpenClawStateWriteTransaction((database) => command.type === "deliveryQueue.claimPlatformSend" ? claimDeliveryQueueEntryPlatformSendInDatabase(database, {
		...command.input,
		queueName: resolveOutboundDeliveryQueueNameInDatabase(database, command.input.id)
	}, command.input.claimId) : renewDeliveryQueueEntryPlatformSendLeaseInDatabase(database, {
		...command.input,
		queueName: resolveOutboundDeliveryQueueNameInDatabase(database, command.input.id)
	}), options, { operationLabel: command.type });
}
//#endregion
//#region src/infra/outbound/delivery-queue-storage.kernel.ts
/** Restore the exact pre-attempt row while its original owner still holds custody. */
function restoreDeliveryAttemptBeforeDispatchInDatabase(database, entry, reservedAttemptCount, claimedAttemptId) {
	const queueName = outboundDeliveryQueueName(entry);
	if (!transitionOwnedDeliveryQueueEntryInDatabase(database, {
		queueName,
		id: entry.id,
		platformSendAttemptId: claimedAttemptId ?? null
	}, (currentRow) => {
		const current = currentRow;
		if (current.attemptCount !== reservedAttemptCount) throw new Error(`Delivery attempt reservation changed before rollback: ${entry.id}`);
		const restoredEntry = {
			...current,
			attemptCount: entry.attemptCount,
			availableAt: entry.availableAt,
			producerClaimId: entry.producerClaimId,
			platformSendAttemptId: entry.platformSendAttemptId,
			platformSendStartedAt: entry.platformSendStartedAt,
			effectiveReplyToId: entry.effectiveReplyToId,
			recoveryState: entry.recoveryState
		};
		upsertDeliveryQueueEntryInDatabase({
			queueName,
			entry: restoredEntry
		}, database);
	})) throw new Error(`Delivery platform claim was lost: ${entry.id}`);
}
function loadOutboundDeliveryInDatabase(database, id, mode) {
	const queueName = resolveOutboundDeliveryQueueNameInDatabase(database, id);
	const entry = loadDeliveryQueueEntryInDatabase(database, queueName, id, mode);
	if (!entry) return null;
	return projectOutboundDelivery(queueName, entry);
}
//#endregion
//#region src/infra/outbound/delivery-queue-storage.worker.ts
function claimPreparation(database, id) {
	const now = Date.now();
	const proposed = {
		id,
		enqueuedAt: now,
		retryCount: 0,
		attemptCount: 0,
		retainOnFailure: true,
		preparationState: "claimed",
		preparationOwnerId: randomUUID(),
		preparationLeaseExpiresAt: now + 3e5
	};
	const queueName = OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME;
	if (upsertDeliveryQueueEntryOnceAcrossNamespacesInDatabase(database, {
		queueName,
		entry: proposed,
		conflictQueueNames: [
			...OUTBOUND_EXECUTABLE_QUEUE_NAMES,
			"outbound-prepared-migration-v1",
			"outbound-legacy-preparing-v1",
			"outbound"
		]
	})) return {
		status: "claimed",
		entry: proposed
	};
	const current = loadDeliveryQueueEntryInDatabase(database, queueName, id, "pending");
	if (!current || (current.preparationLeaseExpiresAt ?? 0) > Date.now()) return { status: "existing" };
	if (current.preparationState !== "claimed") {
		terminalizePendingDeliveryQueueEntryInDatabase(database, prepareDeliveryQueueTerminalEntry({
			queueName,
			id,
			entry: current
		}));
		return { status: "existing" };
	}
	return replacePendingDeliveryQueueEntryInDatabase(database, {
		queueName,
		expectedEntry: current,
		replacementEntry: proposed
	}) ? {
		status: "claimed",
		entry: proposed
	} : { status: "existing" };
}
function mutateOutbound(database, input) {
	const queueName = resolveOutboundDeliveryQueueNameInDatabase(database, input.id);
	const claimId = input.expectedPlatformSendAttemptId;
	if ((input.kind === "start" || input.kind === "dispatch") && typeof claimId === "string") {
		if (!(input.kind === "start" ? promoteDeliveryQueueEntryPlatformSendInDatabase : dispatchDeliveryQueueEntryPlatformSendInDatabase)(database, {
			queueName,
			id: input.id,
			claimId,
			route: input.route
		})) throw new Error(`Delivery platform claim was lost: ${input.id}`);
		return;
	}
	const update = (entry) => {
		const now = Date.now();
		switch (input.kind) {
			case "fail":
			case "fail-before-send":
			case "fail-after-send": return {
				...entry,
				retryCount: entry.retryCount + 1,
				lastAttemptAt: now,
				lastError: input.error,
				availableAt: void 0,
				producerClaimId: void 0,
				...input.kind === "fail-before-send" ? {
					platformSendAttemptId: void 0,
					platformSendStartedAt: void 0,
					recoveryState: void 0
				} : input.kind === "fail-after-send" ? {
					platformSendStartedAt: entry.platformSendStartedAt ?? now,
					recoveryState: "unknown_after_send"
				} : { recoveryState: entry.recoveryState === "producer_claimed" ? void 0 : entry.recoveryState }
			};
			case "start":
			case "dispatch": return {
				...entry,
				availableAt: void 0,
				producerClaimId: void 0,
				platformSendStartedAt: input.kind === "dispatch" ? now : entry.platformSendStartedAt ?? now,
				...input.route && "replyToId" in input.route ? { effectiveReplyToId: input.route.replyToId ?? null } : {},
				recoveryState: input.kind === "dispatch" && entry.recoveryState === "unknown_after_send" ? entry.recoveryState : "send_attempt_started"
			};
			case "unknown": return {
				...entry,
				availableAt: claimId && entry.requiresProducerClaim === true && entry.platformSendAttemptId === claimId ? entry.availableAt : void 0,
				producerClaimId: void 0,
				platformSendStartedAt: entry.platformSendStartedAt ?? now,
				recoveryState: "unknown_after_send"
			};
		}
		return input;
	};
	if (claimId !== void 0) {
		if (!transitionOwnedDeliveryQueueEntryInDatabase(database, {
			queueName,
			id: input.id,
			platformSendAttemptId: claimId
		}, (entry) => {
			upsertDeliveryQueueEntryInDatabase({
				queueName,
				entry: update(projectOutboundDelivery(queueName, entry))
			}, database);
		})) throw new Error(`Delivery platform claim was lost: ${input.id}`);
	} else updateDeliveryQueueEntryInDatabase(database, queueName, input.id, (entry) => {
		return update(projectOutboundDelivery(queueName, entry));
	});
}
function stageFailure(database, input) {
	const { entry, settlement, claimedAttemptId } = input;
	const queueName = outboundDeliveryQueueName(entry);
	if (entry.settlement) {
		const current = loadOutboundDeliveryInDatabase(database, entry.id, "unfinished");
		return current && JSON.stringify(current) === JSON.stringify(entry) ? current : void 0;
	}
	const reclaim = entry.recoveryState === "producer_claimed" && claimedAttemptId === void 0;
	const attemptId = reclaim ? claimDeliveryQueueEntryPlatformSendInDatabase(database, {
		queueName,
		id: entry.id
	}) : claimedAttemptId ?? entry.platformSendAttemptId ?? null;
	if (reclaim && !attemptId) return;
	let staged;
	transitionOwnedDeliveryQueueEntryInDatabase(database, {
		queueName,
		id: entry.id,
		platformSendAttemptId: attemptId ?? null
	}, (current) => {
		if (!reclaim && claimedAttemptId === void 0 && hasActiveDeliveryOwner(current, Date.now())) return;
		staged = {
			...projectOutboundDelivery(queueName, current),
			recoveryState: "settlement_pending",
			settlement
		};
		upsertDeliveryQueueEntryInDatabase({
			queueName,
			entry: staged,
			status: "failed",
			updatePendingOnly: true
		}, database);
	});
	return staged;
}
function executeOutboundDeliveryStorageCommand(command, options) {
	return runOpenClawStateWriteTransaction((database) => {
		switch (command.type) {
			case "deliveryQueue.claimPreparation": return claimPreparation(database, command.input.id);
			case "deliveryQueue.replacePreparation": return replacePendingDeliveryQueueEntryInDatabase(database, {
				queueName: OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
				...command.input
			});
			case "deliveryQueue.completePreparation": return completePendingDeliveryQueueEntryInDatabase(database, {
				queueName: OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
				...command.input
			});
			case "deliveryQueue.failPreparation":
				terminalizePendingDeliveryQueueEntryInDatabase(database, prepareDeliveryQueueTerminalEntry({
					queueName: OUTBOUND_DELIVERY_PREPARATION_QUEUE_NAME,
					id: command.input.entry.id,
					entry: command.input.entry
				}));
				return;
			case "deliveryQueue.mutateOutbound": return mutateOutbound(database, command.input);
			case "deliveryQueue.reserveOutbound": return reserveDeliveryQueueEntryAttemptInDatabase(database, {
				...command.input,
				queueName: resolveOutboundDeliveryQueueNameInDatabase(database, command.input.id)
			});
			case "deliveryQueue.restoreOutbound": return restoreDeliveryAttemptBeforeDispatchInDatabase(database, decodeOutboundDeliverySnapshot(command.input.entry), command.input.reservedAttemptCount, command.input.claimedAttemptId);
			case "deliveryQueue.stageFailure": {
				const entry = decodeOutboundDeliverySnapshot(command.input.entry);
				const settlementEntry = decodeOutboundDeliverySnapshot(command.input.settlementEntry);
				if (settlementEntry.id !== entry.id || command.input.settlementEntry.queueName !== command.input.entry.queueName || !settlementEntry.settlement) throw new Error(`Invalid outbound delivery settlement snapshot: ${entry.id}`);
				const staged = stageFailure(database, {
					entry,
					settlement: settlementEntry.settlement,
					claimedAttemptId: command.input.claimedAttemptId
				});
				return staged && encodeOutboundDeliverySnapshot(staged);
			}
			case "deliveryQueue.finalizeFailure": {
				const entry = decodeOutboundDeliverySnapshot(command.input.entry);
				return terminalizePendingDeliveryQueueEntryInDatabase(database, prepareDeliveryQueueTerminalEntry({
					queueName: outboundDeliveryQueueName(entry),
					id: entry.id,
					entry,
					expectedStatus: "failed"
				})).status === "terminalized";
			}
			case "deliveryQueue.retireUnsent": return retireUnsentDeliveryInDatabase(database, command.input, command.input.terminalOutcome);
		}
	}, options, { operationLabel: command.type });
}
//#endregion
//#region src/infra/delivery-queue.worker.ts
function isDeliveryQueueCommand(command) {
	return command.type === "deliveryQueue.claimPreparation" || command.type === "deliveryQueue.replacePreparation" || command.type === "deliveryQueue.completePreparation" || command.type === "deliveryQueue.failPreparation" || command.type === "deliveryQueue.mutateOutbound" || command.type === "deliveryQueue.reserveOutbound" || command.type === "deliveryQueue.restoreOutbound" || command.type === "deliveryQueue.stageFailure" || command.type === "deliveryQueue.finalizeFailure" || command.type === "deliveryQueue.retireUnsent" || command.type === "deliveryQueue.claimPlatformSend" || command.type === "deliveryQueue.renewPlatformSendLease" || command.type === "deliveryQueue.ack" || command.type === "deliveryQueue.enqueue" || command.type === "deliveryQueue.failPending" || command.type === "deliveryQueue.countFailed" || command.type === "deliveryQueue.findIntentOwners" || command.type === "deliveryQueue.pruneTombstones" || command.type === "deliveryQueue.createMediaRetention" || command.type === "deliveryQueue.cancelMediaRetention" || command.type === "deliveryQueue.mediaRetentionSnapshot";
}
function executeDeliveryQueueCommand(command, options) {
	switch (command.type) {
		case "deliveryQueue.claimPreparation":
		case "deliveryQueue.replacePreparation":
		case "deliveryQueue.completePreparation":
		case "deliveryQueue.failPreparation":
		case "deliveryQueue.mutateOutbound":
		case "deliveryQueue.reserveOutbound":
		case "deliveryQueue.restoreOutbound":
		case "deliveryQueue.stageFailure":
		case "deliveryQueue.finalizeFailure":
		case "deliveryQueue.retireUnsent": return executeOutboundDeliveryStorageCommand(command, options);
		case "deliveryQueue.claimPlatformSend":
		case "deliveryQueue.renewPlatformSendLease": return executeDeliveryQueuePlatformLeaseCommand(command, options);
		case "deliveryQueue.ack": return executeDeliveryQueueAck(command.input, options);
		case "deliveryQueue.enqueue": return executeDeliveryQueueEnqueue(command.input, options);
		case "deliveryQueue.failPending": return executePendingDeliveryFailure(command.input, options);
		case "deliveryQueue.findIntentOwners": return findDeliveryIntentOwnersInDatabase(options.database, command.input);
		case "deliveryQueue.countFailed": return countFailedDeliveryQueueEntriesInDatabase(options.database);
		case "deliveryQueue.pruneTombstones": return pruneExpiredDeliveryQueueTombstonesInDatabase(options.database);
		case "deliveryQueue.createMediaRetention": return runOpenClawStateWriteTransaction((database) => createDeliveryQueueMediaRetentionInDatabase(database, command.input.artifacts, command.input.entryKind, command.input.prepared), options, { operationLabel: "deliveryQueue.createMediaRetention" });
		case "deliveryQueue.cancelMediaRetention": return runOpenClawStateWriteTransaction((database) => deleteDeliveryQueueEntryInDatabase(database, DELIVERY_QUEUE_MEDIA_STAGING_QUEUE_NAME, command.input.id), options, { operationLabel: "deliveryQueue.cancelMediaRetention" });
		case "deliveryQueue.mediaRetentionSnapshot": return loadDeliveryQueueMediaRetentionSnapshotInDatabase(options.database, command.input);
	}
}
//#endregion
//#region src/infra/device-pairing-mutation.worker.ts
const admission = new AsyncLocalStorage();
/** Recheck live host custody while the authoritative SQLite rows remain locked. */
function requestDevicePairingMutationAdmission(facts) {
	const requests = admission.getStore();
	if (!requests) throw new Error("Pairing mutation requires its worker transaction");
	const captured = structuredClone(facts);
	requestSqliteWorkerOperationAdmission({
		stage: "transaction",
		facts: [captured]
	});
	requests.push(captured);
}
function withDevicePairingMutationAdmission(operate) {
	return admission.run([], () => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: []
		});
		const result = operate();
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: admission.getStore()
		});
		return result;
	});
}
//#endregion
//#region src/infra/device-bootstrap.worker-kernel.ts
const DEVICE_PAIR_SETUP_COMPLETION_RETENTION_MS = 2 * DEVICE_BOOTSTRAP_TOKEN_TTL_MS;
function resolvePersistedPendingProfile(record) {
	return record.pendingProfile ? normalizeDeviceBootstrapProfile(record.pendingProfile) : null;
}
function resolveRequestedBootstrapProfile(params) {
	return normalizeDeviceBootstrapProfile({
		roles: [params.role],
		scopes: resolveBootstrapProfileScopesForRole(params.role, params.scopes, params.purpose),
		purpose: params.purpose
	});
}
function bootstrapProfileAllowsRequest(params) {
	return params.allowedProfile.roles.includes(params.requestedRole) && roleScopesAllow({
		role: params.requestedRole,
		requestedScopes: params.requestedScopes,
		allowedScopes: params.allowedProfile.scopes
	});
}
function bootstrapProfileSatisfiesProfile(params) {
	for (const requiredRole of params.requiredProfile.roles) {
		if (!params.actualProfile.roles.includes(requiredRole)) return false;
		const requiredScopes = resolveBootstrapProfileScopesForRole(requiredRole, params.requiredProfile.scopes, params.requiredProfile.purpose);
		if (requiredScopes.length > 0 && !bootstrapProfileAllowsRequest({
			allowedProfile: params.actualProfile,
			requestedRole: requiredRole,
			requestedScopes: requiredScopes
		})) return false;
	}
	return true;
}
function normalizeBootstrapPublicKey(publicKey) {
	const trimmed = publicKey.trim();
	if (!trimmed) return "";
	if (trimmed.includes("BEGIN") || /[+/=]/.test(trimmed)) return normalizeDevicePublicKeyBase64Url(trimmed) ?? trimmed;
	return trimmed;
}
function loadState(nowMs) {
	const state = loadDeviceBootstrapTokenRecords();
	pruneExpiredPending(state, asDateTimestampMs(nowMs) ?? 0, DEVICE_BOOTSTRAP_TOKEN_TTL_MS);
	return state;
}
function issueDeviceBootstrapTokenRecord(params, state = loadState(params.nowMs)) {
	const token = generatePairingToken();
	const issuedAtMs = asDateTimestampMs(params.nowMs);
	const expiresAtMs = issuedAtMs === void 0 ? void 0 : resolveExpiresAtMsFromDurationMs(DEVICE_BOOTSTRAP_TOKEN_TTL_MS, { nowMs: issuedAtMs });
	if (issuedAtMs === void 0 || expiresAtMs === void 0) throw new Error("Device bootstrap token expiry could not be resolved.");
	state[token] = {
		token,
		...params.setupId ? { setupId: params.setupId } : {},
		ts: issuedAtMs,
		profile: params.profile,
		redeemedProfile: normalizeDeviceBootstrapProfile(void 0),
		issuedAtMs
	};
	persistDeviceBootstrapTokenRecords(state);
	return {
		token,
		expiresAtMs
	};
}
/** Reuse one environment-owned setup credential across provider replay. */
function ensureDevicePairSetupBootstrapToken(params) {
	const setupId = params.setupId.trim();
	if (!setupId) throw new Error("Device setup id must be non-empty.");
	const completion = loadDevicePairSetupCompletionRecord(setupId, params.nowMs);
	if (completion) return {
		status: "completed",
		setupId,
		deviceId: completion.deviceId
	};
	const state = loadState(params.nowMs);
	const existing = Object.values(state).find((record) => record.setupId === setupId);
	const profile = normalizeDeviceBootstrapHandoffProfile(params.profile);
	if (existing) {
		if (!deviceBootstrapProfilesEqual(existing.profile, profile)) throw new Error("Device setup profile changed during replay.");
		return {
			status: "pending",
			token: existing.token,
			expiresAtMs: existing.issuedAtMs + DEVICE_BOOTSTRAP_TOKEN_TTL_MS,
			setupId
		};
	}
	return {
		status: "pending",
		...issueDeviceBootstrapTokenRecord({
			profile,
			setupId,
			nowMs: params.nowMs
		}, state),
		setupId
	};
}
/**
* Record that credential delivery is not yet known. Only cloud-worker setup
* keeps its device-bound bearer until delivery is confirmed, allowing the same
* worker to retry when its credential-bearing response never arrives.
*/
function consumeDeviceBootstrapTokenWithSetupCompletion(params, recordWorkerEnvironment) {
	const nowMs = params.nowMs;
	return consumeDeviceBootstrapTokenWithSetupCompletionInTransaction({
		token: params.token,
		deviceId: params.deviceId,
		completedAtMs: params.completedAtMs,
		recordWorkerEnvironment,
		oldestValidIssuedAtMs: nowMs - DEVICE_BOOTSTRAP_TOKEN_TTL_MS,
		retentionNowMs: nowMs,
		retainUntilMs: nowMs + DEVICE_PAIR_SETUP_COMPLETION_RETENTION_MS,
		pairedDeviceMatches: (pairedDevice, record) => {
			requestDevicePairingMutationAdmission({
				kind: "bootstrap.consume",
				pairedDevice,
				issuedAtMs: record.issuedAtMs
			});
			return true;
		}
	});
}
/** Remove every outstanding bootstrap token from the pairing state file. */
function clearDeviceBootstrapTokens(params) {
	const state = loadState(params.nowMs);
	const removed = Object.keys(state).length;
	persistDeviceBootstrapTokenRecords({});
	return { removed };
}
/** Revoke one bootstrap token and return its record for best-effort restore flows. */
function revokeDeviceBootstrapToken(params) {
	const providedToken = params.token.trim();
	if (!providedToken) return { removed: false };
	const state = loadState(params.nowMs);
	const found = Object.entries(state).find(([, candidate]) => verifyPairingToken(providedToken, candidate.token));
	if (!found) return { removed: false };
	const [tokenKey, record] = found;
	delete state[tokenKey];
	persistDeviceBootstrapTokenRecords(state);
	return {
		removed: true,
		record
	};
}
/** Revoke bootstrap credentials inside the rejected request's pairing transaction. */
function revokeDeviceBootstrapTokensForDeviceInDatabase(database, params) {
	withDevicePairingStoreDatabase(database, () => {
		const deviceId = params.deviceId.trim();
		const publicKey = normalizeBootstrapPublicKey(params.publicKey);
		if (!deviceId || !publicKey) return;
		const state = loadState(params.nowMs);
		let removed = false;
		for (const [tokenKey, record] of Object.entries(state)) {
			const recordPublicKey = typeof record.publicKey === "string" ? normalizeBootstrapPublicKey(record.publicKey) : void 0;
			if (record.deviceId?.trim() === deviceId && recordPublicKey === publicKey) {
				delete state[tokenKey];
				removed = true;
			}
		}
		if (removed) persistDeviceBootstrapTokenRecords(state);
	});
}
/** Restore an uncorrelated bootstrap bearer when its credential response was not delivered. */
function restoreGenericDeviceBootstrapToken(params) {
	if (params.record.setupId) return false;
	const state = loadState(params.nowMs);
	state[params.record.token] = params.record;
	persistDeviceBootstrapTokenRecords(state);
	return true;
}
/** Record that one role/scope leg of a multi-role bootstrap handoff was redeemed. */
function redeemDeviceBootstrapTokenProfile(params) {
	const providedToken = params.token.trim();
	if (!providedToken) return {
		recorded: false,
		fullyRedeemed: false
	};
	const state = loadState(params.nowMs);
	const found = Object.entries(state).find(([, candidate]) => verifyPairingToken(providedToken, candidate.token));
	if (!found) return {
		recorded: false,
		fullyRedeemed: false
	};
	const [tokenKey, record] = found;
	const issuedProfile = normalizeDeviceBootstrapProfile(record.profile);
	requestDevicePairingMutationAdmission({
		kind: "bootstrap.token",
		issuedAtMs: record.issuedAtMs
	});
	const pendingProfile = resolvePersistedPendingProfile(record);
	const previousRedeemedProfile = normalizeDeviceBootstrapProfile(record.redeemedProfile);
	const redeemedProfile = normalizeDeviceBootstrapProfile({
		roles: [...previousRedeemedProfile.roles, params.role],
		scopes: [...previousRedeemedProfile.scopes, ...resolveBootstrapProfileScopesForRole(params.role, params.scopes, issuedProfile.purpose)],
		purpose: issuedProfile.purpose
	});
	const nextPendingProfile = pendingProfile && !bootstrapProfileSatisfiesProfile({
		actualProfile: redeemedProfile,
		requiredProfile: pendingProfile
	}) ? pendingProfile : void 0;
	const nextRecord = {
		...record,
		profile: issuedProfile,
		redeemedProfile
	};
	if (nextPendingProfile) nextRecord.pendingProfile = nextPendingProfile;
	else delete nextRecord.pendingProfile;
	state[tokenKey] = nextRecord;
	persistDeviceBootstrapTokenRecords(state);
	return {
		recorded: true,
		fullyRedeemed: bootstrapProfileSatisfiesProfile({
			actualProfile: redeemedProfile,
			requiredProfile: issuedProfile
		})
	};
}
/** Verify a bootstrap token, bind it to the first device identity, and stage requested scopes. */
function verifyDeviceBootstrapToken(params) {
	const state = loadState(params.nowMs);
	const providedToken = params.token.trim();
	if (!providedToken) return {
		ok: false,
		reason: "bootstrap_token_invalid"
	};
	const found = Object.entries(state).find(([, candidate]) => verifyPairingToken(providedToken, candidate.token));
	if (!found) return {
		ok: false,
		reason: "bootstrap_token_invalid"
	};
	const [tokenKey, record] = found;
	const deviceId = params.deviceId.trim();
	const publicKey = normalizeBootstrapPublicKey(params.publicKey);
	const role = params.role.trim();
	if (!deviceId || !publicKey || !role) return {
		ok: false,
		reason: "bootstrap_token_invalid"
	};
	const allowedProfile = normalizeDeviceBootstrapProfile(record.profile);
	const requestedProfile = resolveRequestedBootstrapProfile({
		role,
		scopes: params.scopes,
		purpose: allowedProfile.purpose
	});
	if (allowedProfile.roles.length === 0 || deviceBootstrapProfilesEqual(allowedProfile, CONTROL_UI_OWNER_BOOTSTRAP_PROFILE) && !deviceBootstrapProfilesEqual(requestedProfile, CONTROL_UI_OWNER_BOOTSTRAP_PROFILE) || !bootstrapProfileAllowsRequest({
		allowedProfile,
		requestedRole: role,
		requestedScopes: params.scopes
	})) return {
		ok: false,
		reason: "bootstrap_token_invalid"
	};
	requestDevicePairingMutationAdmission({
		kind: "bootstrap.token",
		issuedAtMs: record.issuedAtMs
	});
	const boundDeviceId = record.deviceId?.trim();
	const boundPublicKey = typeof record.publicKey === "string" ? normalizeBootstrapPublicKey(record.publicKey) : void 0;
	let pendingProfile = requestedProfile;
	if (boundDeviceId || boundPublicKey) {
		if (boundDeviceId !== deviceId || boundPublicKey !== publicKey) return {
			ok: false,
			reason: "bootstrap_token_invalid"
		};
		const existingPendingProfile = resolvePersistedPendingProfile(record);
		if (existingPendingProfile && !deviceBootstrapProfilesEqual(existingPendingProfile, requestedProfile)) return {
			ok: false,
			reason: "bootstrap_token_invalid"
		};
		pendingProfile = existingPendingProfile ?? requestedProfile;
	}
	state[tokenKey] = {
		...record,
		profile: allowedProfile,
		pendingProfile,
		deviceId,
		publicKey,
		lastUsedAtMs: params.nowMs
	};
	persistDeviceBootstrapTokenRecords(state);
	return { ok: true };
}
function executeDeviceBootstrapMutation(command, database, recordWorkerEnvironment) {
	return withDevicePairingStoreDatabase(database, () => {
		switch (command.type) {
			case "bootstrap.issue": return issueDeviceBootstrapTokenRecord(command.input);
			case "bootstrap.ensure": return ensureDevicePairSetupBootstrapToken(command.input);
			case "bootstrap.consume": return consumeDeviceBootstrapTokenWithSetupCompletion(command.input, recordWorkerEnvironment);
			case "bootstrap.confirm": return confirmDevicePairSetupCompletionDeliveryInTransaction(command.input);
			case "bootstrap.readCompletion": return loadDevicePairSetupCompletionRecord(command.input.setupId, command.input.nowMs);
			case "bootstrap.prune": return pruneExpiredDevicePairSetupCompletionRecords(command.input.nowMs);
			case "bootstrap.clear": return clearDeviceBootstrapTokens(command.input);
			case "bootstrap.revoke": return revokeDeviceBootstrapToken(command.input);
			case "bootstrap.restore": return restoreGenericDeviceBootstrapToken(command.input);
			case "bootstrap.redeem": return redeemDeviceBootstrapTokenProfile(command.input);
			case "bootstrap.verify": return verifyDeviceBootstrapToken(command.input);
		}
		throw new Error("Unsupported device bootstrap command");
	});
}
//#endregion
//#region src/infra/device-pairing-approval.kernel.ts
const OPERATOR_ROLE = "operator";
const OPERATOR_SCOPE_PREFIX = "operator.";
function mergeApprovalKind(existing, incoming) {
	if (incoming === "owner" || !existing) return incoming;
	if (existing.approvedVia === void 0) return incoming === "bootstrap" ? "bootstrap" : void 0;
	if (existing.approvedVia === "owner" || existing.approvedVia === "bootstrap") return existing.approvedVia;
	return incoming;
}
function buildApprovedPairedDevice(params) {
	return {
		deviceId: params.pending.deviceId,
		publicKey: params.pending.publicKey,
		displayName: params.accessMetadata?.displayName ?? params.pending.displayName,
		platform: params.pending.platform,
		deviceFamily: params.pending.deviceFamily,
		clientId: params.pending.clientId,
		clientMode: params.pending.clientMode,
		browserOrigin: params.pending.browserOrigin,
		role: params.pending.role,
		roles: params.roles,
		scopes: params.approvedScopes,
		approvedScopes: params.approvedScopes,
		remoteIp: params.accessMetadata?.remoteIp ?? params.pending.remoteIp,
		tokens: params.tokens,
		approvedVia: mergeApprovalKind(params.existing, params.approvedVia),
		...params.existing?.nodeSurface ? { nodeSurface: params.existing.nodeSurface } : {},
		...params.existing?.pendingNodeSurface ? { pendingNodeSurface: params.existing.pendingNodeSurface } : {},
		...params.existing?.operatorLabel ? { operatorLabel: params.existing.operatorLabel } : {},
		createdAtMs: params.existing?.createdAtMs ?? params.now,
		approvedAtMs: params.now,
		lastSeenAtMs: params.accessMetadata?.lastSeenAtMs ?? params.existing?.lastSeenAtMs,
		lastSeenReason: params.accessMetadata?.lastSeenReason ?? params.existing?.lastSeenReason
	};
}
function commitApprovedDevicePairing(params) {
	const { state, requestId, device, baseDir } = params;
	const existing = state.pairedByDeviceId[device.deviceId];
	const previousNodeGeneration = resolveNodePairingGeneration(existing ?? null);
	const nextNodeGeneration = resolveNodePairingGeneration(device);
	const nodePairingGenerationChanged = Boolean(previousNodeGeneration && previousNodeGeneration.key !== nextNodeGeneration?.key);
	clearNodePairingGenerationState(device, previousNodeGeneration);
	const installationIdentityChanged = Boolean(existing && existing.publicKey !== device.publicKey);
	delete state.pendingById[requestId];
	state.pairedByDeviceId[device.deviceId] = device;
	persistDevicePairingStoreState(state, baseDir, "both", installationIdentityChanged ? { clearApnsNodeIds: [device.deviceId] } : void 0);
	return {
		status: "approved",
		requestId,
		device,
		...nodePairingGenerationChanged ? { nodePairingGenerationChanged: true } : {}
	};
}
function resolveApprovedTokenScopes(params) {
	const pendingScopes = resolveRoleTokenScopes(params.role, params.pending.scopes);
	if (pendingScopes.length > 0) {
		const approvedBaseline = resolveRoleTokenScopes(params.role, params.existing?.approvedScopes ?? params.existing?.scopes);
		const requestedScopeDelta = params.existingToken && approvedBaseline.length > 0 ? pendingScopes.filter((scope) => !approvedBaseline.includes(scope)) : pendingScopes;
		if (requestedScopeDelta.length === 0 && params.existingToken) return resolveRoleTokenScopes(params.role, params.existingToken.scopes);
		return resolveRoleTokenScopes(params.role, mergeDevicePairingScopes(params.existingToken?.scopes, requestedScopeDelta));
	}
	return resolveRoleTokenScopes(params.role, params.existingToken?.scopes ?? params.approvedScopes ?? params.existing?.approvedScopes ?? params.existing?.scopes);
}
function withPendingDevicePairingApproval(requestId, nowMs, baseDir, approve) {
	const state = loadDevicePairingStateForMutation(nowMs, baseDir);
	const pending = state.pendingById[requestId];
	if (!pending) return null;
	const existing = state.pairedByDeviceId[pending.deviceId];
	requestDevicePairingMutationAdmission({
		kind: "pairing-approval",
		pending,
		existing
	});
	return approve(state, pending, existing);
}
/** Approve an authoritative pending row inside the admitted pairing transaction. */
function approveDevicePairingInWorker(requestId, options, nowMs, baseDir) {
	return withPendingDevicePairingApproval(requestId, nowMs, baseDir, (state, pendingRecord, existing) => {
		const autoApproveScopes = options?.autoApproveNewDeviceScopes;
		const requestedRoles = resolveRequestedDeviceRoles(pendingRecord);
		const trustedProxySameKeyDevice = options?.approvedVia === "trusted-proxy" && existing !== void 0 && existing.publicKey === pendingRecord.publicKey;
		if (autoApproveScopes && ((pendingRecord.isRepair || existing) && !trustedProxySameKeyDevice || !sameDevicePairingStringSet(requestedRoles, [OPERATOR_ROLE]))) return null;
		const pending = autoApproveScopes ? {
			...pendingRecord,
			scopes: [...autoApproveScopes]
		} : pendingRecord;
		const requestedScopes = normalizeDeviceAuthScopes(pending.scopes);
		const roleMismatchScope = resolveScopeOutsideRequestedRoles({
			requestedRoles,
			requestedScopes
		});
		if (roleMismatchScope) return {
			status: "forbidden",
			reason: "scope-outside-requested-roles",
			scope: roleMismatchScope
		};
		const now = nowMs;
		const roles = mergeDevicePairingRoles(existing?.roles, existing?.role, pending.roles, pending.role);
		const approvedScopes = mergeDevicePairingScopes(existing?.approvedScopes ?? existing?.scopes, pending.scopes);
		const tokens = existing?.tokens ? { ...existing.tokens } : {};
		const nextTokenScopesByRole = /* @__PURE__ */ new Map();
		for (const roleForToken of requestedRoles) {
			const existingToken = tokens[roleForToken];
			const nextScopes = resolveApprovedTokenScopes({
				role: roleForToken,
				pending,
				existingToken,
				approvedScopes,
				existing
			});
			nextTokenScopesByRole.set(roleForToken, nextScopes);
			if (roleForToken === OPERATOR_ROLE && nextScopes.length > 0) {
				const callerRequiredScopes = mergeDevicePairingScopes(resolveRoleTokenScopes(roleForToken, pending.scopes), nextScopes) ?? nextScopes;
				if (!options?.callerScopes) return {
					status: "forbidden",
					reason: "caller-scopes-required",
					scope: callerRequiredScopes[0]
				};
				const missingScope = resolveMissingRequestedScope({
					role: OPERATOR_ROLE,
					requestedScopes: callerRequiredScopes,
					allowedScopes: options.callerScopes
				});
				if (missingScope) return {
					status: "forbidden",
					reason: "caller-missing-scope",
					scope: missingScope
				};
			}
		}
		for (const [roleForToken, nextScopes] of nextTokenScopesByRole) {
			const existingToken = tokens[roleForToken];
			const tokenNow = nowMs;
			tokens[roleForToken] = createDeviceAuthToken({
				role: roleForToken,
				scopes: nextScopes,
				existing: existingToken,
				preserveExistingIssuer: true,
				now: tokenNow,
				rotatedAtMs: existingToken ? tokenNow : void 0
			});
		}
		return commitApprovedDevicePairing({
			state,
			requestId,
			device: buildApprovedPairedDevice({
				pending,
				existing,
				roles,
				approvedScopes,
				tokens,
				now,
				approvedVia: options?.approvedVia ?? "owner",
				accessMetadata: options?.accessMetadata
			}),
			baseDir
		});
	});
}
/** Approve one bounded bootstrap grant inside the admitted pairing transaction. */
function approveBootstrapDevicePairingInWorker(requestId, bootstrapProfile, options, nowMs, baseDir) {
	let replacedRoles = [];
	const approvedRoles = mergeDevicePairingRoles(bootstrapProfile.roles) ?? [];
	const approvedScopes = resolveDeviceProfileScopes(bootstrapProfile, approvedRoles);
	return {
		result: withPendingDevicePairingApproval(requestId, nowMs, baseDir, (state, pending, existing) => {
			const requestedRoles = resolveRequestedDeviceRoles(pending);
			const missingRole = requestedRoles.find((role) => !approvedRoles.includes(role));
			if (missingRole) return {
				status: "forbidden",
				reason: "bootstrap-role-not-allowed",
				role: missingRole
			};
			const requestedOperatorScopes = normalizeDeviceAuthScopes(pending.scopes).filter((scope) => scope.startsWith(OPERATOR_SCOPE_PREFIX));
			const missingScope = resolveMissingRequestedScope({
				role: OPERATOR_ROLE,
				requestedScopes: requestedOperatorScopes,
				allowedScopes: approvedScopes
			});
			if (missingScope) return {
				status: "forbidden",
				reason: "bootstrap-scope-not-allowed",
				scope: missingScope
			};
			const now = nowMs;
			const grantedRoles = requestedRoles;
			const grantedScopes = resolveDeviceProfileScopes(bootstrapProfile, grantedRoles, pending.scopes ?? []);
			const grantedRoleSet = new Set(grantedRoles);
			const preservedExistingScopes = (mergeDevicePairingRoles(existing?.roles, existing?.role) ?? []).flatMap((existingRole) => grantedRoleSet.has(existingRole) ? [] : preserveDeviceRoleScopes(existingRole, existing?.approvedScopes ?? existing?.scopes));
			const roles = mergeDevicePairingRoles(existing?.roles, existing?.role, pending.roles, pending.role);
			const nextApprovedScopes = mergeDevicePairingScopes(preservedExistingScopes, grantedScopes);
			const tokens = existing?.tokens ? { ...existing.tokens } : {};
			for (const roleForToken of grantedRoles) {
				const existingToken = tokens[roleForToken];
				const tokenScopes = roleForToken === OPERATOR_ROLE ? resolveDeviceProfileRoleScopes(bootstrapProfile, roleForToken, grantedScopes) : [];
				tokens[roleForToken] = createDeviceAuthToken({
					role: roleForToken,
					scopes: tokenScopes,
					existing: existingToken,
					now,
					...existingToken ? { rotatedAtMs: now } : {}
				});
			}
			const approved = commitApprovedDevicePairing({
				state,
				requestId,
				device: buildApprovedPairedDevice({
					pending,
					existing,
					roles,
					approvedScopes: nextApprovedScopes,
					tokens,
					now,
					approvedVia: "bootstrap",
					accessMetadata: options?.accessMetadata
				}),
				baseDir
			});
			replacedRoles = grantedRoles.filter((role) => existing?.tokens?.[role]);
			return approved;
		}),
		replacedRoles
	};
}
//#endregion
//#region src/infra/device-pairing-core.kernel.ts
function canRefreshPendingDevicePairingRequest(existing, incoming) {
	if (existing.publicKey !== incoming.publicKey) return false;
	if (existing.browserOrigin !== incoming.browserOrigin) return false;
	if (normalizeDevicePairingRole(existing.role) !== normalizeDevicePairingRole(incoming.role)) return false;
	const incomingRoles = resolveRequestedDeviceRoles(incoming);
	const existingRoles = resolveRequestedDeviceRoles(existing);
	const incomingScopes = normalizeDeviceAuthScopes(incoming.scopes);
	const existingScopes = normalizeDeviceAuthScopes(existing.scopes);
	if (sameDevicePairingStringSet(existingRoles, incomingRoles) && sameDevicePairingStringSet(existingScopes, incomingScopes)) return true;
	const existingRoleSet = new Set(existingRoles);
	if (!incomingRoles.every((role) => existingRoleSet.has(role))) return false;
	return incomingScopes.every((scope) => incomingRoles.some((role) => roleScopesAllow({
		role,
		requestedScopes: [scope],
		allowedScopes: existingScopes
	})));
}
function refreshPendingDevicePairingRequest(existing, incoming, isRepair, nowMs) {
	return {
		...existing,
		publicKey: incoming.publicKey,
		displayName: incoming.displayName ?? existing.displayName,
		platform: incoming.platform ?? existing.platform,
		deviceFamily: incoming.deviceFamily ?? existing.deviceFamily,
		clientId: incoming.clientId ?? existing.clientId,
		clientMode: incoming.clientMode ?? existing.clientMode,
		browserOrigin: existing.browserOrigin,
		remoteIp: incoming.remoteIp ?? existing.remoteIp,
		silent: Boolean(existing.silent && incoming.silent),
		isRepair: existing.isRepair || isRepair,
		ts: existing.ts,
		refreshedAtMs: nowMs
	};
}
function toPublicPendingDevicePairingRequest(pending) {
	const { refreshedAtMs: _refreshedAtMs, ...request } = pending;
	return request;
}
function buildPendingDevicePairingRequest(params) {
	const role = normalizeDevicePairingRole(params.req.role) ?? void 0;
	return {
		requestId: randomUUID(),
		deviceId: params.deviceId,
		publicKey: params.req.publicKey,
		displayName: params.req.displayName,
		platform: params.req.platform,
		deviceFamily: params.req.deviceFamily,
		clientId: params.req.clientId,
		clientMode: params.req.clientMode,
		browserOrigin: params.req.browserOrigin,
		role,
		roles: mergeDevicePairingRoles(params.req.roles, role),
		scopes: mergeDevicePairingScopes(params.req.scopes),
		remoteIp: params.req.remoteIp,
		silent: params.req.silent,
		isRepair: params.isRepair,
		ts: params.nowMs
	};
}
/** Create or refresh a pending device pairing request for owner approval. */
function requestDevicePairingInWorker(req, nowMs, baseDir) {
	const state = loadDevicePairingStateForMutation(nowMs, baseDir);
	const deviceId = normalizeDevicePairingId(req.deviceId);
	if (!deviceId) throw new Error("deviceId required");
	const isRepair = Boolean(state.pairedByDeviceId[deviceId]);
	const pendingForDevice = Object.values(state.pendingById).filter((pending) => pending.deviceId === deviceId).toSorted((left, right) => right.ts - left.ts);
	const latestPending = pendingForDevice[0];
	let request;
	let created = false;
	if (pendingForDevice.length === 1 && latestPending && canRefreshPendingDevicePairingRequest(latestPending, req)) request = refreshPendingDevicePairingRequest(latestPending, req, isRepair, nowMs);
	else {
		for (const pending of pendingForDevice) delete state.pendingById[pending.requestId];
		request = buildPendingDevicePairingRequest({
			nowMs,
			deviceId,
			isRepair,
			req: {
				...req,
				role: normalizeDevicePairingRole(req.role) ?? latestPending?.role,
				roles: mergeDevicePairingRoles(...pendingForDevice.flatMap((pending) => [pending.roles, pending.role]), req.roles, req.role),
				scopes: mergeDevicePairingScopes(...pendingForDevice.map((pending) => pending.scopes), req.scopes),
				silent: Boolean(req.silent && pendingForDevice.every((pending) => pending.silent === true))
			}
		});
		created = true;
	}
	state.pendingById[request.requestId] = request;
	persistDevicePairingStoreState(state, baseDir, "pending");
	const superseded = created ? pendingForDevice.filter((pending) => pending.requestId !== request.requestId).map((pending) => ({
		requestId: pending.requestId,
		deviceId: pending.deviceId
	})) : [];
	return {
		status: "pending",
		request: toPublicPendingDevicePairingRequest(request),
		created,
		expiresAtMs: resolvePairingRequestExpiry(request.refreshedAtMs ?? request.ts),
		...superseded.length > 0 ? { superseded } : {}
	};
}
/** Reject a pending request and revoke matching bootstrap tokens for that device. */
function rejectDevicePairingInWorker(database, requestId, nowMs, baseDir) {
	const state = loadDevicePairingStateForMutation(nowMs, baseDir);
	const pending = state.pendingById[requestId];
	if (!pending) return null;
	delete state.pendingById[requestId];
	persistDevicePairingStoreState(state, baseDir, "pending");
	revokeDeviceBootstrapTokensForDeviceInDatabase(database, {
		deviceId: pending.deviceId,
		publicKey: pending.publicKey,
		nowMs
	});
	return {
		requestId,
		deviceId: pending.deviceId
	};
}
/** Remove a paired device and any pending repair requests for the same device id. */
function removePairedDeviceInWorker(deviceId, nowMs, baseDir) {
	const state = loadDevicePairingStateForMutation(nowMs, baseDir);
	const normalized = normalizeDevicePairingId(deviceId);
	if (!normalized || !state.pairedByDeviceId[normalized]) return null;
	delete state.pairedByDeviceId[normalized];
	for (const [requestId, pending] of Object.entries(state.pendingById)) if (pending.deviceId === normalized) delete state.pendingById[requestId];
	persistDevicePairingStoreState(state, baseDir, "both", { clearApnsNodeIds: [normalized] });
	return { deviceId: normalized };
}
function silentPairingClusterKey(device) {
	const clientId = device.clientId?.trim().toLowerCase() ?? "";
	const clientMode = device.clientMode?.trim().toLowerCase() ?? "";
	const displayName = device.displayName?.trim().toLowerCase() ?? "";
	if (!clientId && !clientMode && !displayName) return null;
	return `${clientId}\0${clientMode}\0${displayName}`;
}
const PRUNE_RECENT_APPROVAL_GRACE_MS = 6e4;
/**
* Remove silent-approved sibling records superseded by a newly approved silent
* pairing of the same client cluster. Only records whose latest approval was
* same-host local ("silent") are eligible, as anchor and as victim: local
* clients re-pair silently by construction and share the gateway host, so the
* metadata cluster key cannot match a different machine. Currently connected
* devices are skipped so concurrent sessions with distinct state dirs keep
* their tokens while live.
*/
function pruneSupersededSilentPairedDevicesInWorker(params) {
	const state = loadDevicePairingStateForMutation(params.nowMs, params.baseDir);
	const anchor = state.pairedByDeviceId[normalizeDevicePairingId(params.deviceId)];
	if (!anchor || anchor.approvedVia !== "silent") return [];
	const anchorKey = silentPairingClusterKey(anchor);
	if (!anchorKey) return [];
	const nowMs = params.nowMs;
	const protectedDeviceIds = new Set(params.protectedDeviceIds);
	const removed = [];
	for (const device of Object.values(state.pairedByDeviceId)) {
		if (device.deviceId === anchor.deviceId) continue;
		if (device.approvedVia !== "silent") continue;
		if (silentPairingClusterKey(device) !== anchorKey) continue;
		if (nowMs - device.approvedAtMs < PRUNE_RECENT_APPROVAL_GRACE_MS) continue;
		if (protectedDeviceIds.has(device.deviceId)) continue;
		delete state.pairedByDeviceId[device.deviceId];
		for (const [requestId, pending] of Object.entries(state.pendingById)) if (pending.deviceId === device.deviceId) delete state.pendingById[requestId];
		removed.push({
			deviceId: device.deviceId,
			roles: listApprovedPairedDeviceRoles(device)
		});
	}
	if (removed.length === 0) return [];
	requestDevicePairingMutationAdmission({
		kind: "pairing-prune",
		deviceIds: removed.map((entry) => entry.deviceId)
	});
	persistDevicePairingStoreState(state, params.baseDir, "both", { clearApnsNodeIds: removed.map((entry) => entry.deviceId) });
	return removed;
}
/** Remove one approved paired-device role while preserving unrelated role tokens. */
function removePairedDeviceRoleInWorker(params) {
	const state = loadDevicePairingStateForMutation(params.nowMs, params.baseDir);
	const normalizedDeviceId = normalizeDevicePairingId(params.deviceId);
	const role = normalizeDevicePairingRole(params.role);
	const device = state.pairedByDeviceId[normalizedDeviceId];
	if (!device || !role || !listApprovedPairedDeviceRoles(device).includes(role)) return null;
	const tokens = cloneDevicePairingTokens(device);
	delete tokens[role];
	const remainingRoles = listApprovedPairedDeviceRoles(device).filter((entry) => entry !== role);
	if (remainingRoles.length === 0) {
		for (const [requestId, pending] of Object.entries(state.pendingById)) if (pending.deviceId === normalizedDeviceId) delete state.pendingById[requestId];
		delete state.pairedByDeviceId[normalizedDeviceId];
		persistDevicePairingStoreState(state, params.baseDir, "both", { clearApnsNodeIds: [normalizedDeviceId] });
		return {
			deviceId: normalizedDeviceId,
			role,
			removedDevice: true
		};
	}
	for (const [requestId, pending] of Object.entries(state.pendingById)) {
		if (pending.deviceId !== normalizedDeviceId) continue;
		const pendingRoles = resolveRequestedDeviceRoles(pending);
		if (!pendingRoles.includes(role)) continue;
		const nextPendingRoles = pendingRoles.filter((entry) => entry !== role);
		if (nextPendingRoles.length === 0) {
			delete state.pendingById[requestId];
			continue;
		}
		const pendingScopes = Array.isArray(pending.scopes) ? mergeDevicePairingScopes(...nextPendingRoles.map((entry) => preserveDeviceRoleScopes(entry, pending.scopes))) : void 0;
		state.pendingById[requestId] = {
			...pending,
			role: nextPendingRoles[0],
			roles: nextPendingRoles,
			scopes: pendingScopes
		};
	}
	const scopeBaseline = device.approvedScopes ?? device.scopes;
	const preservedScopes = Array.isArray(scopeBaseline) ? mergeDevicePairingScopes(...remainingRoles.map((entry) => preserveDeviceRoleScopes(entry, scopeBaseline))) : void 0;
	const next = {
		...device,
		role: remainingRoles[0],
		roles: remainingRoles,
		...preservedScopes !== void 0 ? {
			scopes: preservedScopes,
			approvedScopes: preservedScopes
		} : {},
		tokens: Object.keys(tokens).length > 0 ? tokens : void 0
	};
	if (role === "node") {
		delete next.nodeSurface;
		delete next.pendingNodeSurface;
	}
	state.pairedByDeviceId[normalizedDeviceId] = next;
	persistDevicePairingStoreState(state, params.baseDir, "both");
	return {
		deviceId: normalizedDeviceId,
		role,
		removedDevice: false
	};
}
/** Update non-auth metadata for a paired device presence/status refresh. */
function updatePairedDeviceMetadataInWorker(deviceId, patch, baseDir) {
	return updatePairedDeviceInTransaction(deviceId, baseDir, (device) => {
		if (!device) return { value: false };
		const next = {};
		if ("displayName" in patch) next.displayName = patch.displayName;
		if ("operatorLabel" in patch) next.operatorLabel = patch.operatorLabel;
		if ("platform" in patch) next.platform = patch.platform;
		if ("clientId" in patch) next.clientId = patch.clientId;
		if ("clientMode" in patch) next.clientMode = patch.clientMode;
		if ("remoteIp" in patch) next.remoteIp = patch.remoteIp;
		if ("lastSeenAtMs" in patch) next.lastSeenAtMs = patch.lastSeenAtMs;
		if ("lastSeenReason" in patch) next.lastSeenReason = patch.lastSeenReason;
		return {
			value: true,
			patch: next
		};
	});
}
/** Update paired-device presence only while the authenticated node generation still owns it. */
function updatePairedDevicePresenceInWorker(deviceId, patch, expectedPairingGeneration, baseDir) {
	return updatePairedDeviceInTransaction(deviceId, baseDir, (device) => {
		const currentPairingGeneration = resolveNodePairingGeneration(device);
		if (!device || expectedPairingGeneration.nodeId !== device.deviceId || currentPairingGeneration?.key !== expectedPairingGeneration.key) return { value: false };
		return {
			value: true,
			patch: {
				lastSeenAtMs: patch.lastSeenAtMs,
				lastSeenReason: patch.lastSeenReason
			}
		};
	});
}
//#endregion
//#region src/infra/device-pairing-tokens.kernel.ts
const SHARED_GATEWAY_AUTH_ISSUER_KIND = "shared-gateway-auth";
const BROWSER_DEVICE_CLIENT_IDS = /* @__PURE__ */ new Set(["openclaw-control-ui", "webchat-ui"]);
const BROWSER_DEVICE_CLIENT_MODE = "webchat";
function getPairedDeviceFromState(state, deviceId) {
	return state.pairedByDeviceId[normalizeDevicePairingId(deviceId)] ?? null;
}
function isBrowserRelatedPairedDevice(device) {
	if (device.clientMode?.trim().toLowerCase() === BROWSER_DEVICE_CLIENT_MODE) return true;
	const clientId = device.clientId?.trim().toLowerCase();
	return clientId ? BROWSER_DEVICE_CLIENT_IDS.has(clientId) : false;
}
function deviceTokenIssuerMatches(entry, issuer) {
	if (!issuer) return !entry.issuer;
	return entry.issuer?.kind === issuer.kind && entry.issuer.generation === issuer.generation;
}
function resolveApprovedDeviceScopeBaseline(device) {
	const baseline = device.approvedScopes ?? device.scopes;
	if (!Array.isArray(baseline)) return null;
	return normalizeDeviceAuthScopes(baseline);
}
function scopesWithinApprovedDeviceBaseline(params) {
	if (!params.approvedScopes) return false;
	return roleScopesAllow({
		role: params.role,
		requestedScopes: params.scopes,
		allowedScopes: params.approvedScopes
	});
}
/** Verify a device role token, scope it to the approval baseline, and mark last use. */
function verifyDeviceTokenInWorker(params) {
	return updatePairedDeviceInTransaction(params.deviceId, params.baseDir, (device) => {
		if (!device) return { value: {
			ok: false,
			reason: "device-not-paired"
		} };
		const role = normalizeDevicePairingRole(params.role);
		if (!role) return { value: {
			ok: false,
			reason: "role-missing"
		} };
		const entry = device.tokens?.[role];
		if (!entry) return { value: {
			ok: false,
			reason: "token-missing"
		} };
		if (entry.revokedAtMs) return { value: {
			ok: false,
			reason: "token-revoked"
		} };
		if (!verifyPairingToken(params.token, entry.token)) return { value: {
			ok: false,
			reason: "token-mismatch"
		} };
		if (entry.issuer?.kind === SHARED_GATEWAY_AUTH_ISSUER_KIND && entry.issuer.generation !== params.requiredSharedGatewaySessionGeneration) return { value: {
			ok: false,
			reason: "issuer-generation-stale"
		} };
		if (!entry.issuer && params.requiredSharedGatewaySessionGeneration !== void 0 && isBrowserRelatedPairedDevice(device)) return { value: {
			ok: false,
			reason: "legacy-browser-token"
		} };
		const approvedScopes = resolveApprovedDeviceScopeBaseline(device);
		if (!scopesWithinApprovedDeviceBaseline({
			role,
			scopes: entry.scopes,
			approvedScopes
		})) return { value: {
			ok: false,
			reason: "scope-mismatch"
		} };
		const requestedScopes = normalizeDeviceAuthScopes(params.scopes);
		if (!roleScopesAllow({
			role,
			requestedScopes,
			allowedScopes: entry.scopes
		})) return { value: {
			ok: false,
			reason: "scope-mismatch"
		} };
		return {
			value: entry.issuer ? {
				ok: true,
				issuer: entry.issuer
			} : { ok: true },
			patch: {
				tokens: {
					...device.tokens,
					[role]: {
						...entry,
						lastUsedAtMs: params.nowMs
					}
				},
				lastSeenAtMs: params.nowMs,
				lastSeenReason: "device-token-auth"
			}
		};
	});
}
/** Return a reusable token for a role or issue one within the approved scope baseline. */
function ensureDeviceTokenInWorker(params) {
	return updatePairedDeviceInTransaction(params.deviceId, params.baseDir, (paired) => {
		requestDevicePairingMutationAdmission({ kind: "pairing-token-issuance" });
		const requestedScopes = normalizeDeviceAuthScopes(params.scopes);
		const context = resolveDeviceTokenUpdateContext({
			device: paired,
			role: params.role
		});
		if (!context) return { value: null };
		const { device, role, tokens, existing } = context;
		const previousNodeGeneration = resolveNodePairingGeneration(device);
		const approvedScopes = resolveApprovedDeviceScopeBaseline(device);
		if (!scopesWithinApprovedDeviceBaseline({
			role,
			scopes: requestedScopes,
			approvedScopes
		})) return { value: null };
		if (existing && !existing.revokedAtMs) {
			const existingWithinApproved = scopesWithinApprovedDeviceBaseline({
				role,
				scopes: existing.scopes,
				approvedScopes
			});
			const issuerAllowsReuse = deviceTokenIssuerMatches(existing, params.issuer);
			if (existingWithinApproved && issuerAllowsReuse && roleScopesAllow({
				role,
				requestedScopes,
				allowedScopes: existing.scopes
			})) return { value: existing };
		}
		const now = params.nowMs;
		const next = createDeviceAuthToken({
			role,
			scopes: requestedScopes,
			issuer: params.issuer,
			existing,
			now,
			rotatedAtMs: existing ? now : void 0
		});
		tokens[role] = next;
		device.tokens = tokens;
		clearNodePairingGenerationState(device, previousNodeGeneration);
		return {
			value: next,
			patch: {
				tokens,
				nodeSurface: device.nodeSurface
			}
		};
	});
}
function resolveDeviceTokenUpdateContext(params) {
	const device = params.device;
	if (!device) return null;
	const role = normalizeDevicePairingRole(params.role);
	if (!role) return null;
	if (!listApprovedPairedDeviceRoles(device).includes(role)) return null;
	const tokens = cloneDevicePairingTokens(device);
	return {
		device,
		role,
		tokens,
		existing: tokens[role]
	};
}
/** Rotate a role token inside the device's approved scope baseline. */
function rotateDeviceTokenInWorker(params) {
	const state = loadDevicePairingStateForMutation(params.nowMs, params.baseDir);
	const context = resolveDeviceTokenUpdateContext({
		device: getPairedDeviceFromState(state, params.deviceId),
		role: params.role
	});
	if (!context) return {
		ok: false,
		reason: "unknown-device-or-role"
	};
	const { device, role, tokens, existing } = context;
	const previousNodeGeneration = resolveNodePairingGeneration(device);
	const requestedScopes = normalizeDeviceAuthScopes(params.scopes ?? existing?.scopes ?? device.scopes);
	const approvedScopes = resolveApprovedDeviceScopeBaseline(device);
	if (!approvedScopes) return {
		ok: false,
		reason: "missing-approved-scope-baseline"
	};
	if (!scopesWithinApprovedDeviceBaseline({
		role,
		scopes: requestedScopes,
		approvedScopes
	})) return {
		ok: false,
		reason: "scope-outside-approved-baseline"
	};
	if (params.callerScopes) {
		const missingScope = resolveMissingRequestedScope({
			role,
			requestedScopes,
			allowedScopes: params.callerScopes
		});
		if (missingScope) return {
			ok: false,
			reason: "caller-missing-scope",
			scope: missingScope
		};
	}
	const now = params.nowMs;
	const next = createDeviceAuthToken({
		role,
		scopes: requestedScopes,
		existing,
		preserveExistingIssuer: true,
		now,
		rotatedAtMs: now
	});
	tokens[role] = next;
	device.tokens = tokens;
	clearNodePairingGenerationState(device, previousNodeGeneration);
	state.pairedByDeviceId[device.deviceId] = device;
	const retiredNodeToken = role === "node" && params.scopes !== void 0 && requestedScopes.length === 0 && existing && !scopesWithinApprovedDeviceBaseline({
		role,
		scopes: existing.scopes,
		approvedScopes
	}) ? {
		deviceId: device.deviceId,
		expectedToken: existing.token
	} : void 0;
	persistDevicePairingStoreState(state, params.baseDir, "paired", { retiredNodeToken });
	return {
		ok: true,
		entry: next
	};
}
/** Revoke one active role token after optional caller-scope authorization. */
function revokeDeviceTokenInWorker(params) {
	const state = loadDevicePairingStateForMutation(params.nowMs, params.baseDir);
	const context = resolveDeviceTokenUpdateContext({
		device: getPairedDeviceFromState(state, params.deviceId),
		role: params.role
	});
	if (!context || !context.existing) return {
		ok: false,
		reason: "unknown-device-or-role"
	};
	const { device, role, tokens, existing } = context;
	const previousNodeGeneration = resolveNodePairingGeneration(device);
	const targetScopes = normalizeDeviceAuthScopes(Array.isArray(existing.scopes) ? existing.scopes : device.scopes);
	if (params.callerScopes) {
		const missingScope = resolveMissingRequestedScope({
			role,
			requestedScopes: targetScopes,
			allowedScopes: params.callerScopes
		});
		if (missingScope) return {
			ok: false,
			reason: "caller-missing-scope",
			scope: missingScope
		};
	}
	const entry = {
		...existing,
		revokedAtMs: params.nowMs
	};
	tokens[role] = entry;
	device.tokens = tokens;
	clearNodePairingGenerationState(device, previousNodeGeneration);
	state.pairedByDeviceId[device.deviceId] = device;
	persistDevicePairingStoreState(state, params.baseDir, "paired");
	return {
		ok: true,
		entry
	};
}
//#endregion
//#region src/infra/device-pairing-core.worker.ts
function executeDevicePairingCoreMutation(command, database) {
	switch (command.type) {
		case "devicePairing.request": return requestDevicePairingInWorker(command.input.request, command.input.nowMs);
		case "devicePairing.reject": return rejectDevicePairingInWorker(database, command.input.requestId, command.input.nowMs);
		case "devicePairing.remove": return removePairedDeviceInWorker(command.input.deviceId, command.input.nowMs);
		case "devicePairing.pruneSilent": return pruneSupersededSilentPairedDevicesInWorker(command.input);
		case "devicePairing.removeRole": return removePairedDeviceRoleInWorker(command.input);
		case "devicePairing.updateMetadata": return updatePairedDeviceMetadataInWorker(command.input.deviceId, command.input.patch);
		case "devicePairing.updatePresence": return updatePairedDevicePresenceInWorker(command.input.deviceId, command.input.patch, command.input.expectedPairingGeneration);
		case "devicePairing.approve": return approveDevicePairingInWorker(command.input.requestId, command.input.options, command.input.nowMs);
		case "devicePairing.approveBootstrap": return approveBootstrapDevicePairingInWorker(command.input.requestId, command.input.bootstrapProfile, { accessMetadata: command.input.accessMetadata }, command.input.nowMs);
		case "devicePairing.verifyToken": return verifyDeviceTokenInWorker(command.input);
		case "devicePairing.ensureToken": return ensureDeviceTokenInWorker(command.input);
		case "devicePairing.rotateToken": return rotateDeviceTokenInWorker(command.input);
		case "devicePairing.revokeToken": return revokeDeviceTokenInWorker(command.input);
	}
	throw new Error("Unsupported device pairing mutation");
}
//#endregion
//#region src/infra/device-pairing-node.worker.ts
function mutatePairedDevices(database, operate) {
	const state = readDevicePairingStoreStateFromDatabase(database.db);
	const result = operate(state.pairedByDeviceId);
	if (result.persist) persistDevicePairingStoreState(state, void 0, "paired");
	return result.value;
}
/** Root pairing admission holds the exact database transaction through all row decisions. */
function executeDevicePairingNodeMutation(command, database) {
	switch (command.type) {
		case "node.request": {
			const { req, nowMs } = command.input;
			const nodeId = req.nodeId.trim();
			if (!nodeId) throw new Error("nodeId required");
			return mutatePairedDevices(database, (paired) => {
				const device = paired[nodeId];
				if (!device) throw new Error("node pairing requires a paired device");
				requestDevicePairingMutationAdmission({
					kind: "node-surface",
					nodeId
				});
				const existing = device.pendingNodeSurface;
				if (existing && samePendingApprovalSurface(existing, {
					...req,
					nodeId
				})) {
					const refreshed = refreshPendingNodeSurface(existing, req, nowMs);
					device.pendingNodeSurface = refreshed;
					return {
						value: {
							status: "pending",
							request: toPublicPendingRequest(device, refreshed),
							created: false
						},
						persist: true
					};
				}
				const replacement = buildPendingNodeSurface({
					req: {
						...req,
						nodeId
					},
					nowMs
				});
				device.pendingNodeSurface = replacement;
				const superseded = existing ? [{
					requestId: existing.requestId,
					nodeId
				}] : [];
				return {
					value: {
						status: "pending",
						request: toPublicPendingRequest(device, replacement),
						created: true,
						...superseded.length > 0 ? { superseded } : {}
					},
					persist: true
				};
			});
		}
		case "node.finalizeCleanup": {
			const { observed } = command.input;
			return mutatePairedDevices(database, (paired) => {
				const device = paired[observed.nodeId.trim()];
				const pending = device?.pendingNodeSurface;
				if (!device || !pending || observed.requestId !== pending.requestId || observed.revision !== pending.revision) return {
					value: [],
					persist: false
				};
				requestDevicePairingMutationAdmission({
					kind: "node-pending",
					...toPendingSnapshot(device, pending)
				});
				delete device.pendingNodeSurface;
				return {
					value: [{
						requestId: pending.requestId,
						nodeId: device.deviceId
					}],
					persist: true
				};
			});
		}
		case "node.approve": {
			const { requestId, callerScopes, nowMs } = command.input;
			return mutatePairedDevices(database, (paired) => {
				const device = Object.values(paired).find((entry) => entry.pendingNodeSurface?.requestId === requestId);
				const pending = device?.pendingNodeSurface;
				if (!device || !pending) return {
					value: null,
					persist: false
				};
				requestDevicePairingMutationAdmission({
					kind: "node-pending",
					...toPendingSnapshot(device, pending)
				});
				const missingScope = resolveMissingRequestedScope({
					role: "operator",
					requestedScopes: resolveNodePairApprovalScopes(pending.commands ?? []),
					allowedScopes: callerScopes ?? []
				});
				if (missingScope) return {
					value: {
						status: "forbidden",
						missingScope
					},
					persist: false
				};
				const previousPairingGeneration = resolveNodePairingGeneration(device);
				const now = Math.max(nowMs, (device.nodeSurface?.approvedAtMs ?? -1) + 1);
				device.nodeSurface = {
					displayName: device.nodeSurface?.displayName ?? pending.displayName,
					version: pending.version,
					coreVersion: pending.coreVersion,
					uiVersion: pending.uiVersion,
					modelIdentifier: pending.modelIdentifier,
					caps: pending.caps,
					commands: pending.commands,
					permissions: pending.permissions,
					bins: device.nodeSurface?.bins,
					createdAtMs: device.nodeSurface?.createdAtMs ?? now,
					approvedAtMs: now,
					lastConnectedAtMs: device.nodeSurface?.lastConnectedAtMs,
					lastHostStats: device.nodeSurface?.lastHostStats
				};
				delete device.pendingNodeSurface;
				const nextPairingState = resolveNodePairingState(device);
				const nextPairingGeneration = nextPairingState?.generation?.key;
				if (!nextPairingState || !nextPairingGeneration) return {
					value: null,
					persist: false
				};
				clearNodePairingGenerationState(device, previousPairingGeneration);
				const node = toPairedNode(device);
				return node ? {
					value: {
						requestId,
						node,
						pairingIdentity: nextPairingState.identity.key,
						nextPairingGeneration,
						...previousPairingGeneration ? { previousPairingGeneration: previousPairingGeneration.key } : {}
					},
					persist: true
				} : {
					value: null,
					persist: false
				};
			});
		}
		case "node.reject": {
			const { requestId } = command.input;
			return mutatePairedDevices(database, (paired) => {
				const device = Object.values(paired).find((entry) => entry.pendingNodeSurface?.requestId === requestId);
				const pending = device?.pendingNodeSurface;
				if (!device || !pending) return {
					value: null,
					persist: false
				};
				requestDevicePairingMutationAdmission({
					kind: "node-pending",
					...toPendingSnapshot(device, pending)
				});
				delete device.pendingNodeSurface;
				return {
					value: {
						requestId,
						nodeId: device.deviceId
					},
					persist: true
				};
			});
		}
		case "node.rename": {
			const displayName = command.input.displayName.trim();
			if (!displayName) throw new Error("displayName required");
			return mutatePairedDevices(database, (paired) => {
				const device = paired[command.input.nodeId.trim()];
				if (!device?.nodeSurface) return {
					value: null,
					persist: false
				};
				requestDevicePairingMutationAdmission({
					kind: "node-surface",
					nodeId: device.deviceId,
					pairingGeneration: resolveNodePairingGeneration(device)?.key
				});
				device.nodeSurface = {
					...device.nodeSurface,
					displayName
				};
				return {
					value: toPairedNode(device),
					persist: true
				};
			});
		}
		case "node.recordConnection": {
			const { nodeId, connectedAtMs, expectedPairingGeneration } = command.input;
			return updatePairedDeviceInTransaction(nodeId, void 0, (device) => {
				if (!device?.nodeSurface || expectedPairingGeneration && (expectedPairingGeneration.nodeId !== device.deviceId || resolveNodePairingGeneration(device)?.key !== expectedPairingGeneration.key)) return { value: { recorded: false } };
				requestDevicePairingMutationAdmission({
					kind: "node-surface",
					nodeId: device.deviceId,
					pairingGeneration: resolveNodePairingGeneration(device)?.key
				});
				const firstConnection = device.nodeSurface.lastConnectedAtMs === void 0;
				const lastConnectedAtMs = Math.max(device.nodeSurface.lastConnectedAtMs ?? connectedAtMs, connectedAtMs);
				const clearsDisconnect = device.nodeSurface.lastDisconnectedAtMs !== void 0 && connectedAtMs > device.nodeSurface.lastDisconnectedAtMs;
				return {
					value: {
						recorded: true,
						firstConnection
					},
					patch: { nodeSurface: {
						...device.nodeSurface,
						lastConnectedAtMs,
						...clearsDisconnect ? { lastDisconnectedAtMs: void 0 } : {}
					} }
				};
			});
		}
		default: {
			const { nodeId, expectedPairingGeneration } = command.input;
			return updatePairedDeviceInTransaction(nodeId, void 0, (device) => {
				const surface = device?.nodeSurface;
				if (!device || !surface || expectedPairingGeneration.nodeId !== device.deviceId || resolveNodePairingGeneration(device)?.key !== expectedPairingGeneration.key) return { value: false };
				if (command.type === "node.recordDisconnection" && (surface.lastConnectedAtMs !== command.input.connectedAtMs || command.input.disconnectedAtMs < command.input.connectedAtMs)) return { value: false };
				requestDevicePairingMutationAdmission({
					kind: "node-surface",
					nodeId: device.deviceId,
					pairingGeneration: expectedPairingGeneration.key
				});
				switch (command.type) {
					case "node.recordDisconnection": return {
						value: true,
						patch: { nodeSurface: {
							...surface,
							lastDisconnectedAtMs: Math.max(surface.lastDisconnectedAtMs ?? command.input.disconnectedAtMs, command.input.disconnectedAtMs)
						} }
					};
					case "node.recordHostStats": return {
						value: true,
						patch: { nodeSurface: {
							...surface,
							lastHostStats: command.input.hostStats
						} }
					};
					case "node.updateBins": return {
						value: true,
						patch: { nodeSurface: {
							...surface,
							bins: command.input.bins
						} }
					};
					case "node.updateSessionHost": return {
						value: true,
						patch: { nodeSurface: {
							...surface,
							sessionHost: command.input.sessionHost
						} }
					};
				}
				throw new Error("Unsupported paired node surface mutation");
			});
		}
	}
}
//#endregion
//#region src/infra/device-pairing-dispatch.worker.ts
function execute(command, database, recordTokenReplacement, recordWorkerEnvironment) {
	switch (command.type) {
		case "devicePairing.request":
		case "devicePairing.reject":
		case "devicePairing.remove":
		case "devicePairing.pruneSilent":
		case "devicePairing.removeRole":
		case "devicePairing.updateMetadata":
		case "devicePairing.updatePresence":
		case "devicePairing.approve":
		case "devicePairing.verifyToken":
		case "devicePairing.ensureToken":
		case "devicePairing.rotateToken":
		case "devicePairing.revokeToken": return executeDevicePairingCoreMutation(command, database);
		case "devicePairing.approveBootstrap": {
			const result = executeDevicePairingCoreMutation(command, database);
			if (result.result?.status === "approved" && result.replacedRoles.length > 0) recordTokenReplacement({
				deviceId: result.result.device.deviceId,
				roles: result.replacedRoles
			});
			return result;
		}
		case "node.request":
		case "node.finalizeCleanup":
		case "node.approve":
		case "node.reject":
		case "node.recordConnection":
		case "node.recordDisconnection":
		case "node.recordHostStats":
		case "node.updateBins":
		case "node.updateSessionHost":
		case "node.rename": return executeDevicePairingNodeMutation(command, database);
		default: return executeDeviceBootstrapMutation(command, database, recordWorkerEnvironment);
	}
}
function executeDevicePairingMutationInWorker(command, database) {
	return runOpenClawStateWriteTransaction(() => withDevicePairingStoreDatabase(database, () => withDevicePairingMutationAdmission(() => {
		const before = readPairedDevicePairingRecordsFromDatabase(database.db);
		let tokensReplaced;
		let workerEnvironment;
		const result = execute(command, database, (facts) => {
			tokensReplaced = facts;
		}, (facts) => {
			workerEnvironment = facts;
		});
		const after = readPairedDevicePairingRecordsFromDatabase(database.db);
		const changed = [];
		for (const deviceId of /* @__PURE__ */ new Set([...Object.keys(before), ...Object.keys(after)])) if (JSON.stringify(before[deviceId]) !== JSON.stringify(after[deviceId])) changed.push(prepareDevicePairingBinding(deviceId, after[deviceId] ?? null));
		deferSqliteWorkerCommitReceipt(database.db, {
			kind: "devicePairing",
			beforeRevision: resolveDevicePairingStoreRevision(before),
			revision: resolveDevicePairingStoreRevision(after),
			changed,
			...tokensReplaced ? { tokensReplaced } : {},
			...workerEnvironment ? { workerEnvironment } : {}
		});
		return result;
	})), {
		database,
		env: getSqliteWorkerStateContext().environment
	});
}
//#endregion
//#region src/infra/device-pairing-worker-contract.ts
function isDevicePairingMutationCommand(command) {
	return command.type.startsWith("devicePairing.") || command.type.startsWith("node.") || command.type.startsWith("bootstrap.");
}
//#endregion
//#region src/infra/exec-approvals-authorization.worker.ts
function applyAuthorizationBatch(db, initial, items) {
	let current = initial;
	const outcomes = items.map((item) => {
		let next;
		try {
			next = applyExecAuthorizationCommit(structuredClone(current.file), item);
		} catch (error) {
			return {
				ok: false,
				message: error instanceof Error ? error.message : String(error)
			};
		}
		if (next !== null) {
			try {
				assertExecApprovalsMutationAllowed({
					db,
					current: current.file,
					next
				});
			} catch (error) {
				if (!(error instanceof ExecApprovalsMutationFencedError)) throw error;
				return {
					ok: false,
					message: error.message
				};
			}
			const raw = serializeExecApprovals(next);
			if (!current.exists || current.raw !== raw) current = snapshotFromExecApprovalsRow({
				path: current.path,
				row: { raw_json: raw }
			});
		}
		return {
			ok: true,
			snapshot: current
		};
	});
	return {
		snapshot: current,
		outcomes
	};
}
function commitExecAuthorizationsInWorker(input, options) {
	assertNoPendingLegacyExecApprovals({ env: options.env });
	const database = openOpenClawStateDatabase(options);
	const read = () => snapshotFromExecApprovalsDatabase(database.db, resolveExecApprovalsDisplayPath(options.env));
	const initial = read();
	const prepared = applyAuthorizationBatch(database.db, initial, input.items);
	if (prepared.snapshot.raw === initial.raw) return prepared.outcomes;
	return runOpenClawStateWriteTransaction(({ db }) => {
		const current = read();
		const committed = applyAuthorizationBatch(db, current, input.items);
		if (committed.snapshot.raw !== current.raw) writeExecApprovalsConfigRow({
			db,
			file: committed.snapshot.file,
			raw: committed.snapshot.raw ?? void 0
		});
		return committed.outcomes;
	}, {
		...options,
		database
	}, { operationLabel: "exec-approvals.commit-authorizations" });
}
//#endregion
//#region src/infra/outbound/current-conversation-bindings.worker.ts
/** Worker-local reads cannot inherit the host's retained discovery snapshot. */
function readSelection(conversations, databasePath) {
	return withExistingOpenClawStateDatabaseReadOnly(({ db }) => readCurrentConversationBindingSelectionInDatabase(db, conversations), {
		path: databasePath,
		env: getSqliteWorkerStateContext().environment
	}) ?? conversations.map(() => null);
}
/** The caller holds the shared-state write transaction and current host admission. */
function touchCurrentConversationBindingInDatabase(db, input) {
	const conversation = input.conversation;
	return updateCurrentConversationBindingRecordInDatabase(db, conversation, (current) => {
		if (current?.bindingId !== input.bindingId) return current;
		if (!input.accountPolicy) return {
			...current,
			metadata: {
				...current.metadata,
				lastActivityAt: input.at
			}
		};
		const { idleTimeoutMs, maxAgeMs } = input.accountPolicy;
		const idleExpiresAt = idleTimeoutMs > 0 ? input.at + idleTimeoutMs : void 0;
		const maxAgeExpiresAt = maxAgeMs > 0 ? current.boundAt + maxAgeMs : void 0;
		return {
			bindingId: `${conversation.accountId}:${conversation.conversationId}`,
			targetSessionKey: current.targetSessionKey,
			targetKind: input.accountPolicy.targetKinds[current.targetKind],
			conversation,
			status: "active",
			boundAt: current.boundAt,
			expiresAt: idleExpiresAt != null && maxAgeExpiresAt != null ? Math.min(idleExpiresAt, maxAgeExpiresAt) : idleExpiresAt ?? maxAgeExpiresAt,
			metadata: {
				...current.metadata,
				agentId: typeof current.metadata?.agentId === "string" ? current.metadata.agentId : void 0,
				label: typeof current.metadata?.label === "string" ? current.metadata.label : void 0,
				boundBy: typeof current.metadata?.boundBy === "string" ? current.metadata.boundBy : void 0,
				lastActivityAt: input.at,
				idleTimeoutMs,
				maxAgeMs
			}
		};
	}).current;
}
function isWriteCommand(command) {
	return command.type === "conversationBindings.listBySession" || command.type === "conversationBindings.resolve" || command.type === "conversationBindings.touch";
}
function executeCommand(command, options) {
	if (command.type === "conversationBindings.listBySession") return listCurrentConversationBindingsInWorker(command.input, options);
	if (command.type === "conversationBindings.resolve") {
		const result = readCurrentConversationBindingResolutionInDatabase(options.database.db, command.input);
		if (!result.repair) return result.record;
	}
	return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const result = command.type === "conversationBindings.resolve" ? updateCurrentConversationBindingRecordInDatabase(db, command.input, (current) => current).current : touchCurrentConversationBindingInDatabase(db, command.input);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return result;
	}, options);
}
/** List and expiry repair stay at the same shared-state owner and physical worker context. */
function listCurrentConversationBindingsInWorker(input, options) {
	const prepared = readCurrentConversationBindingListInDatabase(options.database.db, input.targetSessionKey, input.scope);
	if (!prepared.requiresPrune) return prepared.records;
	return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const records = pruneCurrentConversationBindingListInTransaction(db, input.targetSessionKey, input.scope);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return records;
	}, options);
}
//#endregion
//#region src/infra/promotions-feed.kernel.ts
const PROMOTIONS_FEED_STATE_KEY = "clawhub.promotionsFeed";
function markPromotionSlugsNotifiedInDatabase(database, incoming, now) {
	updateConfigMachineStateInDatabase(database, PROMOTIONS_FEED_STATE_KEY, (existing) => ({
		etag: existing?.etag ?? null,
		sequence: existing?.sequence ?? null,
		payloadJson: existing?.payloadJson ?? null,
		lastCheckedAtMs: existing?.lastCheckedAtMs ?? null,
		notifiedSlugs: [.../* @__PURE__ */ new Set([...existing?.notifiedSlugs ?? [], ...incoming])].toSorted()
	}), now);
}
function recordPromotionClaimInDatabase(database, record) {
	const db = getNodeSqliteKysely(database);
	const values = {
		slug: record.slug,
		provider: record.provider,
		model_keys_json: record.modelKeysJson,
		ends_at_ms: record.endsAtMs,
		claimed_at_ms: record.claimedAtMs
	};
	executeSqliteQuerySync(database, db.insertInto("clawhub_promotion_claims").values(values).onConflict((conflict) => conflict.column("slug").doUpdateSet(values)));
}
//#endregion
//#region src/infra/promotions-feed.worker.ts
function executePromotionCommand(command, options, openDatabase) {
	if (command.type === "promotions.markNotified") {
		const stored = readConfigMachineState(PROMOTIONS_FEED_STATE_KEY, options);
		const known = new Set(stored?.notifiedSlugs ?? []);
		const incoming = command.input.slugs.filter((slug) => !known.has(slug));
		if (incoming.length > 0) runOpenClawStateWriteTransaction(({ db }) => markPromotionSlugsNotifiedInDatabase(db, incoming, command.input.now), {
			...options,
			database: openDatabase()
		}, { operationLabel: "config-machine-state.update" });
		return true;
	}
	return runOpenClawStateWriteTransaction(({ db }) => recordPromotionClaimInDatabase(db, command.input), {
		...options,
		database: openDatabase()
	});
}
//#endregion
//#region src/infra/push-apns-store.worker-contract.ts
function isApnsRegistrationWorkerCommand(command) {
	return command.type === "apns.registration.register" || command.type === "apns.registration.read" || command.type === "apns.registrations.read";
}
//#endregion
//#region src/infra/push-apns-store.worker.ts
function registerApnsRegistrationInDatabase(database, input) {
	const { candidate } = input;
	const { nodeId } = candidate;
	return runOpenClawStateWriteTransaction(({ db }) => {
		if (input.expectedPairingGeneration) {
			if (resolveNodePairingGeneration(loadPairedDevicePairingStoreRecordFromDatabase(db, nodeId))?.key !== input.expectedPairingGeneration) return { status: "pairing-changed" };
		}
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const stateDb = getNodeSqliteKysely(db);
		const current = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("apns_registrations").select("updated_at_ms").where("node_id", "=", nodeId));
		const tombstone = executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("apns_registration_tombstones").select("deleted_at_ms").where("node_id", "=", nodeId));
		const previousVersions = [current?.updated_at_ms, tombstone?.deleted_at_ms].filter((version) => version !== void 0);
		const next = {
			...candidate,
			updatedAtMs: nextApnsRegistrationVersion(nodeId, previousVersions, input.nowMs)
		};
		const row = apnsRegistrationToRow(next);
		const { node_id: _nodeId, ...updates } = row;
		executeSqliteQuerySync(db, stateDb.insertInto("apns_registrations").values(row).onConflict((conflict) => conflict.column("node_id").doUpdateSet(updates)));
		executeSqliteQuerySync(db, stateDb.deleteFrom("apns_registration_tombstones").where("node_id", "=", nodeId));
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return {
			status: "registered",
			registration: next
		};
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	});
}
function executeApnsRegistrationCommand(command, database) {
	switch (command.type) {
		case "apns.registration.register": return registerApnsRegistrationInDatabase(database, command.input);
		case "apns.registration.read": return readApnsRegistrationFromDatabase(database.db, command.input);
		case "apns.registrations.read": return readApnsRegistrationsFromDatabase(database.db, command.input);
	}
	throw new Error("Unsupported APNs registration command");
}
//#endregion
//#region src/infra/push-web-store.worker.ts
function isWebPushCommand(command) {
	return command.type === "webPush.findBoundWebPushSubscriptionByEndpoint" || command.type === "webPush.setWebPushSubscriptionPreferences" || command.type === "webPush.listWebPushSubscriptions" || command.type === "webPush.hasBoundWebPushSubscriptions" || command.type === "webPush.listBoundWebPushSubscriptions" || command.type === "webPush.prepareWebPushApprovalDeliveries" || command.type === "webPush.listWebPushApprovalDeliveryTargets" || command.type === "webPush.deleteWebPushApprovalDeliveryTargets" || command.type === "webPush.listTerminalWebPushApprovalDeliveryIds" || command.type === "webPush.upsertWebPushSubscription" || command.type === "webPush.deleteBoundWebPushSubscription" || command.type === "webPush.deleteWebPushSubscriptionIfCurrent" || command.type === "webPush.insertVapidKeyPairIfAbsent";
}
function executeWebPushCommand(command, database) {
	switch (command.type) {
		case "webPush.findBoundWebPushSubscriptionByEndpoint": return findBoundWebPushSubscriptionByEndpointInDatabase({
			...command.input,
			database
		});
		case "webPush.setWebPushSubscriptionPreferences": return setWebPushSubscriptionPreferencesInDatabase({
			...command.input,
			database
		});
		case "webPush.listWebPushSubscriptions": return listWebPushSubscriptionsInDatabase(database);
		case "webPush.hasBoundWebPushSubscriptions": return hasBoundWebPushSubscriptionsInDatabase(database);
		case "webPush.listBoundWebPushSubscriptions": return listBoundWebPushSubscriptionsInDatabase(database);
		case "webPush.prepareWebPushApprovalDeliveries": return prepareWebPushApprovalDeliveriesInDatabase({
			...command.input,
			database
		});
		case "webPush.listWebPushApprovalDeliveryTargets": return listWebPushApprovalDeliveryTargetsInDatabase({
			...command.input,
			database
		});
		case "webPush.deleteWebPushApprovalDeliveryTargets": return deleteWebPushApprovalDeliveryTargetsInDatabase({
			...command.input,
			database
		});
		case "webPush.listTerminalWebPushApprovalDeliveryIds": return listTerminalWebPushApprovalDeliveryIdsInDatabase({
			...command.input,
			database
		});
		case "webPush.upsertWebPushSubscription": try {
			return { subscription: upsertWebPushSubscriptionInDatabase({
				...command.input,
				database
			}) };
		} catch (error) {
			if (error instanceof WebPushSubscriptionBindingError) return { bindingError: error.message };
			throw error;
		}
		case "webPush.deleteBoundWebPushSubscription": return deleteBoundWebPushSubscriptionInDatabase({
			...command.input,
			database
		});
		case "webPush.deleteWebPushSubscriptionIfCurrent": return deleteWebPushSubscriptionIfCurrentInDatabase({
			...command.input,
			database
		});
		case "webPush.insertVapidKeyPairIfAbsent": return insertVapidKeyPairIfAbsentInDatabase({
			...command.input,
			database
		});
	}
}
//#endregion
//#region src/infra/session-delivery-queue.worker-contract.ts
function isSessionDeliveryCommand(command) {
	return command.type === "sessionDelivery.mutateSubagentCompletion" || command.type === "sessionDelivery.admitSubagentCompletion" || command.type === "sessionDelivery.enqueue" || command.type === "sessionDelivery.enqueueClaimed" || command.type === "sessionDelivery.releaseClaim" || command.type === "sessionDelivery.defer" || command.type === "sessionDelivery.advanceAgentRun" || command.type === "sessionDelivery.mergePreparedMedia" || command.type === "sessionDelivery.markAttemptStarted" || command.type === "sessionDelivery.markSettlement" || command.type === "sessionDelivery.complete" || command.type === "sessionDelivery.fail" || command.type === "sessionDelivery.load" || command.type === "sessionDelivery.list" || command.type === "sessionDelivery.moveToFailed";
}
//#endregion
//#region src/agents/subagents/completion/subagent-completion-admission.worker.ts
const query$2 = (db) => getNodeSqliteKysely(db);
/** The shared-state worker owns queue insertion and its exact native completion owner. */
function admitSubagentCompletionInWorker(input, database) {
	const { expected, subagent, queueEntry, writeId } = input;
	const owner = queueEntry.kind === "agentTurn" ? queueEntry.owner : void 0;
	const delivery = subagent.delivery;
	if (!owner || owner.kind !== "subagent_completion" || owner.runId !== subagent.runId || subagent.runId !== expected.runId || owner.generation !== delivery?.generation || owner.deadlineAt !== delivery.deadlineAt || queueEntry.id !== delivery.queueId) throw new Error("subagent completion admission records do not share one owner generation");
	const boundQueue = bindDeliveryQueueEntry({
		queueName: SESSION_DELIVERY_QUEUE_NAME,
		entry: queueEntry,
		insertOnly: true
	});
	const expectedPayload = bindSubagentRunRecord(expected).payload_json;
	const boundSubagent = bindSubagentRunRecord(subagent);
	const readRow = () => executeSqliteQuerySync(database.db, query$2(database.db).selectFrom("subagent_runs").selectAll().where("run_id", "=", expected.runId)).rows[0];
	return runOpenClawStateWriteTransaction(() => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: writeId
		});
		const originalRow = readRow();
		const current = originalRow && rowToSubagentRunRecord(originalRow);
		if (!current || compareSubagentRunGeneration(current, expected) !== 0 || current.childSessionKey !== expected.childSessionKey || current.requesterSessionKey !== expected.requesterSessionKey || current.requesterStorePath !== expected.requesterStorePath) throw new Error("subagent completion owner changed before admission");
		const siblings = executeSqliteQuerySync(database.db, query$2(database.db).selectFrom("subagent_runs").selectAll().where("child_session_key", "=", expected.childSessionKey)).rows;
		for (const row of siblings) {
			const candidate = rowToSubagentRunRecord(row);
			if (!candidate || compareSubagentRunGeneration(candidate, expected) > 0) throw new Error("subagent completion owner was replaced before admission");
		}
		const claimed = upsertBoundDeliveryQueueEntryInDatabase(boundQueue, database);
		const status = getDeliveryQueueEntryOwnersInDatabase(database, ["session"], queueEntry.id).get("session")?.status ?? "pending";
		if (claimed) {
			if (bindSubagentRunRecord(current).payload_json !== expectedPayload) throw new Error("subagent completion state changed before admission");
			upsertSubagentRunRowInDatabase(database, boundSubagent);
		} else {
			const existing = loadDeliveryQueueEntryInDatabase(database, SESSION_DELIVERY_QUEUE_NAME, queueEntry.id);
			const existingOwner = existing?.kind === "agentTurn" ? existing.owner : void 0;
			if (!existingOwner || existingOwner.kind !== owner.kind || existingOwner.runId !== owner.runId || existingOwner.taskId !== owner.taskId || existingOwner.generation !== owner.generation || existingOwner.deadlineAt !== owner.deadlineAt || existing?.sessionKey !== queueEntry.sessionKey || existing.kind === "agentTurn" && queueEntry.kind === "agentTurn" && !isDeepStrictEqual(existing.requesterBinding, queueEntry.requesterBinding) || (current.delivery?.generation ?? 1) !== owner.generation || status === "pending" && (current.delivery?.queueId !== queueEntry.id || current.delivery.deadlineAt !== owner.deadlineAt)) throw new Error(`session delivery queue conflict for ${queueEntry.id}`);
		}
		const row = readRow();
		if (!row) throw new Error("subagent completion owner disappeared during admission");
		const receipt = {
			writeId,
			claimed,
			status,
			row
		};
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: writeId
		});
		deferSqliteWorkerCommitReceipt(database.db, receipt);
		return receipt;
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "subagent completion delivery admission" });
}
function mutateSubagentCompletionInWorker(input, database) {
	return runOpenClawStateWriteTransaction(() => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: input.writeId
		});
		const receipt = {
			writeId: input.writeId,
			...mutateSubagentCompletionInDatabase(database, input.mutation)
		};
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: input.writeId
		});
		deferSqliteWorkerCommitReceipt(database.db, receipt);
		return receipt;
	}, {
		database,
		path: database.path,
		env: getSqliteWorkerStateContext().environment
	}, { operationLabel: "subagent completion " + input.mutation.kind });
}
//#endregion
//#region src/infra/session-delivery-queue.worker.ts
function readSessionDelivery(database, id) {
	return loadDeliveryQueueEntryInDatabase(database, SESSION_DELIVERY_QUEUE_NAME, id, "pending");
}
function executeSessionDeliveryCommand(command, database) {
	const readStatus = (id) => getDeliveryQueueEntryOwnersInDatabase(database, [SESSION_DELIVERY_QUEUE_NAME], id).get(SESSION_DELIVERY_QUEUE_NAME)?.status;
	const update = (id, transform) => updateDeliveryQueueEntryInDatabase(database, SESSION_DELIVERY_QUEUE_NAME, id, (entry) => transform(entry));
	const finalize = (id, status, transition) => {
		try {
			transition();
		} catch (error) {
			try {
				if (readStatus(id) === status) return;
			} catch {}
			throw error;
		}
	};
	switch (command.type) {
		case "sessionDelivery.mutateSubagentCompletion": return mutateSubagentCompletionInWorker(command.input, database);
		case "sessionDelivery.admitSubagentCompletion": return admitSubagentCompletionInWorker(command.input, database);
		case "sessionDelivery.enqueue":
		case "sessionDelivery.enqueueClaimed": return runOpenClawStateWriteTransaction(() => {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: void 0
			});
			const id = command.input.row.id;
			const claimed = upsertBoundDeliveryQueueEntryInDatabase(command.input, database);
			if (command.type === "sessionDelivery.enqueue") {
				requestSqliteWorkerOperationAdmission({
					stage: "commit",
					facts: void 0
				});
				return;
			}
			let status;
			try {
				status = claimed ? "pending" : readStatus(id) ?? "completed";
			} catch {
				status = "unknown";
			}
			requestSqliteWorkerOperationAdmission({
				stage: "commit",
				facts: void 0
			});
			return {
				id,
				claimed,
				status
			};
		}, {
			database,
			path: database.path,
			env: getSqliteWorkerStateContext().environment
		}, { operationLabel: command.type });
		case "sessionDelivery.releaseClaim":
			update(command.input.id, (entry) => ({
				...entry,
				availableAt: Date.now()
			}));
			return;
		case "sessionDelivery.defer": {
			const { id, delayMs } = command.input;
			update(id, (entry) => ({
				...entry,
				availableAt: Date.now() + Math.max(0, delayMs)
			}));
			return;
		}
		case "sessionDelivery.advanceAgentRun": {
			const { id, updates } = command.input;
			update(id, (entry) => entry.kind !== "agentTurn" ? entry : {
				...entry,
				agentRunAttempt: (entry.agentRunAttempt ?? 0) + 1,
				deliveryStartedAt: void 0,
				...updates?.message ? { message: updates.message } : {},
				...updates?.expectedMediaUrls ? { expectedMediaUrls: updates.expectedMediaUrls } : {},
				...updates?.suppressTextDelivery === true ? { suppressTextDelivery: true } : {}
			});
			return;
		}
		case "sessionDelivery.mergePreparedMedia": {
			const { id, mediaUrl, blocksJson } = command.input;
			let result = { source: "input" };
			update(id, (entry) => {
				if (entry.kind !== "agentTurn") return entry;
				const stored = entry.preparedMediaBlocks?.[mediaUrl];
				const blocks = stored ?? JSON.parse(blocksJson);
				if (stored != null) result = {
					source: "stored",
					blocks: stored
				};
				return {
					...entry,
					preparedMediaBlocks: {
						...entry.preparedMediaBlocks,
						[mediaUrl]: blocks
					}
				};
			});
			return result;
		}
		case "sessionDelivery.markAttemptStarted":
			if (!upsertBoundDeliveryQueueEntryInDatabase(command.input, database)) throw new Error(`Session delivery ${command.input.row.id} is no longer pending`);
			return;
		case "sessionDelivery.markSettlement": {
			const id = command.input.row.id;
			return finalize(id, "completed", () => {
				if (upsertBoundDeliveryQueueEntryInDatabase(command.input, database) || readStatus(id) === "completed") return;
				throw new Error(`Session delivery ${id} is no longer pending`);
			});
		}
		case "sessionDelivery.complete": {
			const { id } = command.input;
			return finalize(id, "completed", () => {
				completeDeliveryQueueEntryInDatabase(database, SESSION_DELIVERY_QUEUE_NAME, id);
			});
		}
		case "sessionDelivery.fail": {
			const { id, error, releaseAttemptOwnership } = command.input;
			update(id, (entry) => {
				const retryCount = entry.retryCount + 1;
				const now = Date.now();
				return {
					...entry,
					retryCount,
					...entry.kind === "agentTurn" ? { lastChargedAgentRunAttempt: entry.agentRunAttempt ?? 0 } : {},
					...releaseAttemptOwnership === true ? { deliveryStartedAt: void 0 } : {},
					lastAttemptAt: now,
					...entry.kind === "agentTurn" && entry.owner?.kind === "subagent_completion" ? { availableAt: now + computeBackoff({
						initialMs: 15e3,
						factor: 2,
						maxMs: 3e5,
						jitter: .2
					}, retryCount) } : {},
					lastError: error
				};
			});
			return;
		}
		case "sessionDelivery.load": return readSessionDelivery(database, command.input.id);
		case "sessionDelivery.list": return loadDeliveryQueueEntriesInDatabase(database, SESSION_DELIVERY_QUEUE_NAME);
		case "sessionDelivery.moveToFailed": {
			const { id } = command.input;
			return finalize(id, "failed", () => {
				const entry = readSessionDelivery(database, id);
				if (!entry) throw deliveryQueueEntryNotFoundError(SESSION_DELIVERY_QUEUE_NAME, id);
				if (terminalizePendingDeliveryQueueEntryInDatabase(database, prepareDeliveryQueueTerminalEntry({
					queueName: "session",
					id,
					entry
				})).status !== "terminalized") throw deliveryQueueEntryNotFoundError(SESSION_DELIVERY_QUEUE_NAME, id);
			});
		}
	}
}
//#endregion
//#region src/infra/telemetry-store.kernel.ts
const TELEMETRY_STATE_KEY = "telemetry.updateCheck";
function readTelemetryStateInWorker(options) {
	const state = readConfigMachineState(TELEMETRY_STATE_KEY, options);
	return state && isRecord(state) ? state : {};
}
function countRecentTelemetrySessionsInDatabase(database, sinceMs) {
	const db = getNodeSqliteKysely(database);
	return executeSqliteQueryTakeFirstSync(database, db.selectFrom("session_state_events").select((builder) => builder.fn.countAll().as("count")).where("kind", "=", "created").where("occurred_at", ">=", sinceMs))?.count ?? 0;
}
function persistTelemetrySuccessInDatabase(database, state, updatedAtMs) {
	return updateConfigMachineStateInDatabase(database, TELEMETRY_STATE_KEY, (current) => current?.lastPingAt !== void 0 && current.lastPingAt >= state.lastPingAt ? current : state, updatedAtMs);
}
//#endregion
//#region src/infra/update-run-reconciliation.read.ts
function inspectUpdateRunReconciliation(db, record, input) {
	return {
		record,
		rule: hasStoredUpdateRecovery(db, record.runId) ? void 0 : inspectUpdateRunAbandonment(record, input)
	};
}
//#endregion
//#region src/infra/update-run-reconciliation.worker.ts
function reconcileUpdateRunCandidatesInWorker(command, stateOptions, assertCurrent) {
	const { candidates, selection: input, busyTimeoutMs, redactPaths } = command;
	const options = {
		...stateOptions,
		busyTimeoutMs,
		redactPaths
	};
	return runExistingOpenClawStateWriteTransaction(({ db }) => {
		assertCurrent("transaction");
		const selected = candidates.flatMap(({ record }) => {
			const current = readUpdateRunRecord(db, record.runId);
			return current ? [inspectUpdateRunReconciliation(db, current, input)] : [];
		});
		const current = selected.map(({ record }) => record);
		if (input.repairHistorySinceMs !== void 0) {
			const history = inspectNewerRecoveryHistory(input.repairHistorySinceMs, readUpdateRuns(db, { limit: 100 }));
			if (current.some((record) => record.status === "running" && needsPostCoreRepair(record)) || history.postCoreRuns.length || history.incomplete) throw new Error("Update history changed during inspection and now needs post-core maintenance. Retry openclaw update repair; if the managed Gateway cannot stop, run openclaw gateway stop first.");
		}
		if (!canReconcileUpdateRunCandidates(selected, input) || input.requireAllActive && executeSqliteQueryTakeFirstSync(db, getNodeSqliteKysely(db).selectFrom("update_runs").select("run_id").where("status", "=", "running").where("run_id", "not in", candidates.map(({ record }) => record.runId)).limit(1))) {
			assertCurrent("commit");
			return {
				current,
				reconciled: []
			};
		}
		const reconciled = [];
		const result = {
			current: selected.map(({ record, rule }) => {
				if (!rule || input.legacyOnly && rule !== "legacy-driver-expired") return record;
				upsertStep(record, {
					step: "reconcile:abandoned",
					status: "failed",
					endedAtMs: Date.now(),
					detail: rule
				});
				finishUpdateRunRecord(record, {
					status: "failed",
					reason: rule === "legacy-driver-expired" ? rule : "abandoned"
				});
				const saved = persistRun(db, record, options);
				reconciled.push(saved);
				return saved;
			}),
			reconciled
		};
		assertCurrent("commit");
		return result;
	}, options, {
		schemaSql: updateRunLedgerSchema,
		operationLabel: "update.run",
		busyTimeoutMs: options.busyTimeoutMs
	});
}
//#endregion
//#region src/node-host/node-worker-journal.worker-contract.ts
function isNodeWorkerJournalCommand(command) {
	return Object.hasOwn(nodeWorkerJournalCommands, command.type);
}
const nodeWorkerJournalCommands = {
	"nodeWorker.prepared.find": true,
	"nodeWorker.prepared.list": true,
	"nodeWorker.prepared.register": true,
	"nodeWorker.prepared.bind": true,
	"nodeWorker.prepared.retire": true,
	"nodeWorker.prepared.completeMutation": true,
	"nodeWorker.launch.claimObservation": true,
	"nodeWorker.launch.claim": true,
	"nodeWorker.launch.listNonterminal": true,
	"nodeWorker.launch.nonterminalCount": true,
	"nodeWorker.launch.pruneExpiredTerminal": true,
	"nodeWorker.launch.get": true,
	"nodeWorker.launch.getMatching": true,
	"nodeWorker.launch.cleanupBinding": true,
	"nodeWorker.launch.finishCancelled": true,
	"nodeWorker.launch.markRunning": true,
	"nodeWorker.launch.finish": true,
	"nodeWorker.turn.claim": true,
	"nodeWorker.turn.get": true,
	"nodeWorker.turn.finish": true
};
//#endregion
//#region src/node-host/node-worker-launch-receipt.ts
function isNodeWorkerTerminalState(value) {
	return value === "completed" || value === "failed" || value === "interrupted" || value === "cancelled";
}
function validateNodeWorkerContainerIdentity(identity) {
	if (identity.engine !== "docker" && identity.engine !== "podman") throw new Error("node worker container engine must be docker or podman");
	if (!/^[a-f0-9]{64}$/u.test(identity.containerId)) throw new Error("node worker container id must contain exactly 64 lowercase hexadecimal digits");
	if (!/^[a-f0-9]{64}$/u.test(identity.engineTarget)) throw new Error("node worker container engine target must contain exactly 64 lowercase hexadecimal digits");
}
function containerIdentity(value) {
	if (value == null) return null;
	let parsed;
	try {
		parsed = JSON.parse(value);
	} catch {
		throw new Error("invalid node worker container identity");
	}
	if (!isRecord(parsed) || Object.keys(parsed).length !== 3 || parsed.engine !== "docker" && parsed.engine !== "podman" || typeof parsed.containerId !== "string" || typeof parsed.engineTarget !== "string") throw new Error("invalid node worker container identity");
	const identity = {
		engine: parsed.engine,
		containerId: parsed.containerId,
		engineTarget: parsed.engineTarget
	};
	validateNodeWorkerContainerIdentity(identity);
	return identity;
}
function nodeWorkerLaunchReceiptFromRow(row) {
	if (row.state !== "pending" && row.state !== "running" && !isNodeWorkerTerminalState(row.state)) throw new Error(`invalid node worker launch state ${row.state}`);
	const container = containerIdentity(row.container_json);
	const cleanupMode = row.cleanup_mode ?? null;
	if (cleanupMode !== null && cleanupMode !== "process-group" && cleanupMode !== "owned-anchor") throw new Error("invalid node worker cleanup mode");
	return {
		launchId: row.launch_id,
		planHash: row.plan_hash,
		gatewayNamespace: row.gateway_namespace,
		environmentId: row.environment_id,
		sessionId: row.session_id,
		ownerEpoch: row.owner_epoch,
		placementGeneration: row.placement_generation,
		runId: row.run_id,
		state: row.state,
		supervisor: {
			pid: row.supervisor_pid,
			startTime: row.supervisor_start_time
		},
		worker: row.worker_pid === null || row.worker_start_time === null ? null : {
			pid: row.worker_pid,
			startTime: row.worker_start_time
		},
		workerCleanupMode: cleanupMode,
		workerLineageSettled: row.lineage_settled === 1,
		...container ? { container } : {},
		resultJson: row.result_json,
		errorText: row.error_text,
		completedAtMs: row.completed_at_ms,
		createdAtMs: row.created_at_ms,
		updatedAtMs: row.updated_at_ms
	};
}
//#endregion
//#region src/node-host/node-worker-launch-store.kernel.ts
const NODE_WORKER_LAUNCH_SCHEMA_END = "\n  WHERE completed_at_ms IS NOT NULL;";
const initializedDatabases$1 = /* @__PURE__ */ new WeakSet();
const TERMINAL_RECEIPT_RETENTION_MS$1 = 864e5;
const TERMINAL_PRUNE_BATCH_LIMIT$1 = 256;
function ensureNodeWorkerLaunchSchema(database, table) {
	database.exec(extractSqliteTableSchema(OPENCLAW_STATE_SCHEMA_SQL, table, { endMarker: table === "node_worker_launches" ? NODE_WORKER_LAUNCH_SCHEMA_END : void 0 }));
}
function query$1(database) {
	return getNodeSqliteKysely(database);
}
function selectLaunchRows(database) {
	return query$1(database).selectFrom("node_worker_launches").selectAll("node_worker_launches").$if(tableExists(database, "node_worker_launch_containers"), (selection) => selection.leftJoin("node_worker_launch_containers", "node_worker_launch_containers.launch_id", "node_worker_launches.launch_id").select("node_worker_launch_containers.container_json")).$if(tableExists(database, "node_worker_launch_cleanup"), (selection) => selection.leftJoin("node_worker_launch_cleanup", "node_worker_launch_cleanup.launch_id", "node_worker_launches.launch_id").select(["node_worker_launch_cleanup.cleanup_mode", "node_worker_launch_cleanup.lineage_settled"]));
}
function readRow$1(database, launchId) {
	return executeSqliteQueryTakeFirstSync(database, selectLaunchRows(database).where("node_worker_launches.launch_id", "=", launchId));
}
function readNonterminalCount(database) {
	return executeSqliteQueryTakeFirstSync(database, query$1(database).selectFrom("node_worker_launches").select((expression) => expression.fn.countAll().as("count")).where("state", "in", ["pending", "running"]))?.count ?? 0;
}
function readNonterminalRows(database) {
	return executeSqliteQuerySync(database, selectLaunchRows(database).where("node_worker_launches.state", "in", ["pending", "running"]).orderBy("node_worker_launches.launch_id", "asc")).rows;
}
function pruneTerminalRows(params) {
	let candidates = query$1(params.database).selectFrom("node_worker_launches").select("launch_id").where("state", "in", [
		"completed",
		"failed",
		"interrupted",
		"cancelled"
	]).where("completed_at_ms", "<=", params.cutoffMs).orderBy("completed_at_ms", "asc").orderBy("launch_id", "asc").limit(params.limit);
	if (params.excludeLaunchId) candidates = candidates.where("launch_id", "!=", params.excludeLaunchId);
	const launchIds = executeSqliteQuerySync(params.database, candidates).rows.map((row) => row.launch_id);
	if (launchIds.length === 0) return 0;
	if (tableExists(params.database, "node_worker_launch_containers")) executeSqliteQuerySync(params.database, query$1(params.database).deleteFrom("node_worker_launch_containers").where("launch_id", "in", launchIds));
	const result = executeSqliteQuerySync(params.database, query$1(params.database).deleteFrom("node_worker_launches").where("launch_id", "in", launchIds).where("state", "in", [
		"completed",
		"failed",
		"interrupted",
		"cancelled"
	]).where("completed_at_ms", "<=", params.cutoffMs));
	return Number(result.numAffectedRows ?? 0n);
}
/** Read the authoritative physical owner within an already-open journal transaction. */
function readNodeWorkerLaunchReceipt(database, launchId) {
	if (!tableExists(database, "node_worker_launches")) return;
	const row = readRow$1(database, launchId);
	return row ? nodeWorkerLaunchReceiptFromRow(row) : void 0;
}
/** Physical extinction closes unfinished turns, never a result already recorded by the worker. */
function settleNodeWorkerActiveTurns(database, owner) {
	if (owner.state === "pending" || owner.state === "running" || !tableExists(database, "node_worker_turns")) return;
	executeSqliteQuerySync(database, query$1(database).updateTable("node_worker_turns").set((expression) => {
		const completedAt = expression.fn("max", [
			"created_at_ms",
			"updated_at_ms",
			expression.val(owner.updatedAtMs)
		]);
		return {
			state: owner.state === "completed" ? "interrupted" : owner.state,
			result_json: null,
			error_text: owner.errorText ?? "node worker stopped before its turn completed",
			completed_at_ms: completedAt,
			updated_at_ms: completedAt
		};
	}).where("owner_launch_id", "=", owner.launchId).where("state", "=", "running"));
}
function validateIdentifier(value, label) {
	if (!value || value.trim() !== value || value.length > 256 || value.includes("\0")) throw new Error(`${label} must be a bounded non-empty identifier`);
}
function validatePlanHash(value) {
	if (!/^[a-f0-9]{64}$/u.test(value)) throw new Error("node worker plan hash must be 64 lowercase hexadecimal characters");
}
function validateTimestamp(value) {
	if (!Number.isSafeInteger(value) || value < 0) throw new Error("node worker launch timestamp must be a non-negative safe integer");
}
function validatePruneLimit(limit) {
	if (!Number.isSafeInteger(limit) || limit < 1 || limit > 1e3) throw new Error("node worker launch prune limit must be between 1 and 1000");
}
function validateProcessIdentity(identity) {
	if (!Number.isSafeInteger(identity.pid) || identity.pid <= 0 || identity.pid > 2147483647 || !Number.isSafeInteger(identity.startTime) || identity.startTime < 0) throw new Error("node worker process identity must contain a bounded pid and start time");
}
function requireMatchingRow(database, launchId, planHash) {
	const row = readRow$1(database, launchId);
	if (!row) throw new Error(`node worker launch ${launchId} does not exist`);
	if (row.plan_hash !== planHash) throw new Error(`node worker launch ${launchId} was replayed with a different plan`);
	return row;
}
function rowHasSupervisor(row, identity) {
	return row.supervisor_pid === identity.pid && row.supervisor_start_time === identity.startTime;
}
function rowHasWorker(row, identity) {
	return identity === null ? row.worker_pid === null && row.worker_start_time === null : row.worker_pid === identity.pid && row.worker_start_time === identity.startTime;
}
function sameObservedOwner(current, observed) {
	return current.state === observed.state && current.supervisor_pid === observed.supervisor_pid && current.supervisor_start_time === observed.supervisor_start_time && current.worker_pid === observed.worker_pid && current.worker_start_time === observed.worker_start_time;
}
function rowMatchesImmutableIdentity(row, expected) {
	return row.launch_id === expected.launchId && row.plan_hash === expected.planHash && row.environment_id === expected.environmentId && row.session_id === expected.sessionId && row.owner_epoch === expected.ownerEpoch && row.placement_generation === expected.placementGeneration && row.run_id === expected.runId;
}
function finishOwnedRow(database, current, params, nowMs, expected) {
	if (isNodeWorkerTerminalState(current.state) || !rowHasSupervisor(current, params.supervisor) || !rowHasWorker(current, params.worker)) return;
	const completedAtMs = Math.max(nowMs, current.created_at_ms, current.updated_at_ms);
	let update = query$1(database).updateTable("node_worker_launches").set({
		state: params.state,
		result_json: params.state === "completed" ? params.resultJson ?? null : null,
		error_text: params.state === "completed" ? null : params.errorText ?? null,
		completed_at_ms: completedAtMs,
		updated_at_ms: completedAtMs
	}).where("launch_id", "=", current.launch_id).where("plan_hash", "=", current.plan_hash);
	if (expected) update = update.where("environment_id", "=", expected.environmentId).where("session_id", "=", expected.sessionId).where("owner_epoch", "=", expected.ownerEpoch).where("placement_generation", "=", expected.placementGeneration).where("run_id", "=", expected.runId);
	update = update.where("state", "in", ["pending", "running"]).where("supervisor_pid", "=", params.supervisor.pid).where("supervisor_start_time", "=", params.supervisor.startTime);
	update = params.worker ? update.where("worker_pid", "=", params.worker.pid).where("worker_start_time", "=", params.worker.startTime) : update.where("worker_pid", "is", null).where("worker_start_time", "is", null);
	const updated = executeSqliteQueryTakeFirstSync(database, update.returning([
		"state",
		"result_json",
		"error_text",
		"completed_at_ms",
		"updated_at_ms"
	]));
	return updated ? {
		...current,
		...updated
	} : void 0;
}
/** Connection-bound launch journal; every operation retains its original write transaction. */
var NodeWorkerLaunchKernel = class {
	constructor(options) {
		this.databaseOptions = options;
	}
	write(operationLabel, operation) {
		let initializedDatabase;
		const result = runOpenClawStateWriteTransaction(({ db, path }) => {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: { kind: "node-worker-journal" }
			});
			if (!initializedDatabases$1.has(db)) {
				ensureNodeWorkerLaunchSchema(db, "node_worker_launches");
				initializedDatabase = db;
			}
			return operation(db, path);
		}, this.databaseOptions, { operationLabel });
		if (initializedDatabase) initializedDatabases$1.add(initializedDatabase);
		return result;
	}
	claimObservation(claim, supervisor, capacity, nowMs = Date.now()) {
		validateIdentifier(claim.launchId, "node worker launch id");
		validatePlanHash(claim.planHash);
		validateTimestamp(nowMs);
		validateProcessIdentity(supervisor);
		if (!Number.isSafeInteger(capacity) || capacity < 1) throw new Error("node worker capacity must be a positive safe integer");
		return this.write("node-worker-launch.claim-inspect", (database) => {
			const observed = readRow$1(database, claim.launchId);
			if (!observed) return;
			const { plan_hash, state, supervisor_pid, supervisor_start_time, worker_pid, worker_start_time } = observed;
			return {
				plan_hash,
				state,
				supervisor_pid,
				supervisor_start_time,
				worker_pid,
				worker_start_time
			};
		});
	}
	claim(claim, supervisor, capacity, nowMs, observed, observedSupervisorState) {
		return this.write("node-worker-launch.claim", (database) => {
			const finalize = (result) => {
				pruneTerminalRows({
					database,
					cutoffMs: Math.max(0, nowMs - TERMINAL_RECEIPT_RETENTION_MS$1),
					limit: TERMINAL_PRUNE_BATCH_LIMIT$1,
					excludeLaunchId: claim.launchId
				});
				return result;
			};
			let current = readRow$1(database, claim.launchId);
			let action = "replay";
			if (!current) {
				const nonterminalCount = readNonterminalCount(database);
				if (nonterminalCount >= capacity) return finalize({
					action: "at-capacity",
					nonterminalCount
				});
				executeSqliteQuerySync(database, query$1(database).insertInto("node_worker_launches").values({
					launch_id: claim.launchId,
					plan_hash: claim.planHash,
					gateway_namespace: claim.gatewayNamespace,
					environment_id: claim.environmentId,
					session_id: claim.sessionId,
					owner_epoch: claim.ownerEpoch,
					placement_generation: claim.placementGeneration,
					run_id: claim.runId,
					state: "pending",
					supervisor_pid: supervisor.pid,
					supervisor_start_time: supervisor.startTime,
					worker_pid: null,
					worker_start_time: null,
					result_json: null,
					error_text: null,
					completed_at_ms: null,
					created_at_ms: nowMs,
					updated_at_ms: nowMs
				}));
				current = requireMatchingRow(database, claim.launchId, claim.planHash);
				action = "start";
			} else if (current.plan_hash !== claim.planHash) throw new Error(`node worker launch ${claim.launchId} was replayed with a different plan`);
			else if (observed && sameObservedOwner(current, observed) && (observedSupervisorState === "dead" || observedSupervisorState === "reused")) {
				if (current.state === "pending") {
					const updatedAtMs = Math.max(nowMs, current.created_at_ms, current.updated_at_ms);
					executeSqliteQuerySync(database, query$1(database).updateTable("node_worker_launches").set({
						supervisor_pid: supervisor.pid,
						supervisor_start_time: supervisor.startTime,
						updated_at_ms: updatedAtMs
					}).where("launch_id", "=", claim.launchId).where("plan_hash", "=", claim.planHash).where("state", "=", "pending").where("supervisor_pid", "=", observed.supervisor_pid).where("supervisor_start_time", "=", observed.supervisor_start_time).where("worker_pid", "is", null).where("worker_start_time", "is", null));
					current = requireMatchingRow(database, claim.launchId, claim.planHash);
					action = rowHasSupervisor(current, supervisor) ? "start" : "replay";
				} else if (current.state === "running") action = "recover";
			}
			return finalize({
				action,
				receipt: nodeWorkerLaunchReceiptFromRow(current),
				nonterminalCount: readNonterminalCount(database)
			});
		});
	}
	listNonterminal() {
		return this.write("node-worker-launch.list-nonterminal", (database) => readNonterminalRows(database).map(nodeWorkerLaunchReceiptFromRow));
	}
	nonterminalCount() {
		return this.write("node-worker-launch.count-nonterminal", readNonterminalCount);
	}
	pruneExpiredTerminal(params = {}) {
		const nowMs = params.nowMs ?? Date.now();
		const limit = params.limit ?? TERMINAL_PRUNE_BATCH_LIMIT$1;
		validateTimestamp(nowMs);
		validatePruneLimit(limit);
		return this.write("node-worker-launch.prune-terminal", (database) => pruneTerminalRows({
			database,
			cutoffMs: Math.max(0, nowMs - TERMINAL_RECEIPT_RETENTION_MS$1),
			limit
		}));
	}
	get(launchId) {
		validateIdentifier(launchId, "node worker launch id");
		return this.write("node-worker-launch.get", (database) => {
			const row = readRow$1(database, launchId);
			return row ? nodeWorkerLaunchReceiptFromRow(row) : void 0;
		});
	}
	getMatching(expected) {
		validateIdentifier(expected.launchId, "node worker launch id");
		validatePlanHash(expected.planHash);
		return this.write("node-worker-launch.get-matching", (database) => {
			const row = readRow$1(database, expected.launchId);
			return row && rowMatchesImmutableIdentity(row, expected) ? nodeWorkerLaunchReceiptFromRow(row) : void 0;
		});
	}
	cleanupBinding(params) {
		return this.write("node-worker-launch.cleanup-binding", (database, databasePath) => {
			const current = requireMatchingRow(database, params.launchId, params.planHash);
			if (isNodeWorkerTerminalState(current.state) || !rowHasSupervisor(current, params.supervisor)) throw new Error("node worker cleanup binding no longer owns its launch");
			return {
				databasePath,
				externallySupervised: isGatewayExternallySupervised(this.databaseOptions.env),
				launchId: params.launchId,
				planHash: params.planHash,
				supervisor: { ...params.supervisor }
			};
		});
	}
	finishCancelled(params) {
		const nowMs = params.nowMs ?? Date.now();
		validateTimestamp(nowMs);
		validateProcessIdentity(params.supervisor);
		if (params.worker) validateProcessIdentity(params.worker);
		return this.write("node-worker-launch.finish-cancelled", (database) => {
			const current = readRow$1(database, params.expected.launchId);
			if (!current || !rowMatchesImmutableIdentity(current, params.expected)) return;
			const settled = finishOwnedRow(database, current, {
				supervisor: params.supervisor,
				worker: params.worker,
				state: "cancelled",
				errorText: "node worker launch cancelled"
			}, nowMs, params.expected) ?? current;
			if (!rowMatchesImmutableIdentity(settled, params.expected)) return;
			const receipt = nodeWorkerLaunchReceiptFromRow(settled);
			settleNodeWorkerActiveTurns(database, receipt);
			return receipt;
		});
	}
	markRunning(params) {
		const nowMs = params.nowMs ?? Date.now();
		validateTimestamp(nowMs);
		validateProcessIdentity(params.supervisor);
		validateProcessIdentity(params.worker);
		if (params.container) validateNodeWorkerContainerIdentity(params.container);
		return this.write("node-worker-launch.mark-running", (database) => {
			const current = requireMatchingRow(database, params.launchId, params.planHash);
			if (isNodeWorkerTerminalState(current.state)) return nodeWorkerLaunchReceiptFromRow(current);
			if (current.state === "running") return nodeWorkerLaunchReceiptFromRow(current);
			if (!rowHasSupervisor(current, params.supervisor) || !rowHasWorker(current, null)) return nodeWorkerLaunchReceiptFromRow(current);
			if (params.container) {
				ensureNodeWorkerLaunchSchema(database, "node_worker_launch_containers");
				executeSqliteQuerySync(database, query$1(database).insertInto("node_worker_launch_containers").values({
					launch_id: params.launchId,
					container_json: JSON.stringify({
						engine: params.container.engine,
						containerId: params.container.containerId,
						engineTarget: params.container.engineTarget
					})
				}));
			}
			if (params.cleanupMode !== null) {
				ensureNodeWorkerLaunchSchema(database, "node_worker_launch_cleanup");
				executeSqliteQuerySync(database, query$1(database).insertInto("node_worker_launch_cleanup").values({
					launch_id: params.launchId,
					cleanup_mode: params.cleanupMode,
					lineage_settled: null
				}));
			}
			const updatedAtMs = Math.max(nowMs, current.created_at_ms, current.updated_at_ms);
			executeSqliteQuerySync(database, query$1(database).updateTable("node_worker_launches").set({
				state: "running",
				worker_pid: params.worker.pid,
				worker_start_time: params.worker.startTime,
				updated_at_ms: updatedAtMs
			}).where("launch_id", "=", params.launchId).where("plan_hash", "=", params.planHash).where("state", "=", "pending").where("supervisor_pid", "=", params.supervisor.pid).where("supervisor_start_time", "=", params.supervisor.startTime).where("worker_pid", "is", null).where("worker_start_time", "is", null));
			return nodeWorkerLaunchReceiptFromRow(requireMatchingRow(database, params.launchId, params.planHash));
		});
	}
	finish(params) {
		const nowMs = params.nowMs ?? Date.now();
		validateTimestamp(nowMs);
		validateProcessIdentity(params.supervisor);
		if (params.worker) validateProcessIdentity(params.worker);
		return this.write("node-worker-launch.finish", (database) => {
			const current = requireMatchingRow(database, params.launchId, params.planHash);
			const receipt = nodeWorkerLaunchReceiptFromRow(finishOwnedRow(database, current, params, nowMs) ?? current);
			settleNodeWorkerActiveTurns(database, receipt);
			return receipt;
		});
	}
};
//#endregion
//#region src/node-host/node-worker-turn-store.kernel.ts
const initializedDatabases = /* @__PURE__ */ new WeakSet();
const TERMINAL_RECEIPT_RETENTION_MS = 864e5;
const TERMINAL_PRUNE_BATCH_LIMIT = 256;
function query(database) {
	return getNodeSqliteKysely(database);
}
function ensureTurnSchema(database) {
	database.exec(extractSqliteTableSchema(OPENCLAW_STATE_SCHEMA_SQL, "node_worker_turns", {
		endMarker: "\n  WHERE state = 'running';",
		errorMessage: "OpenClaw node worker turn schema marker is missing."
	}));
}
function readRow(database, turnId) {
	return executeSqliteQueryTakeFirstSync(database, query(database).selectFrom("node_worker_turns").selectAll().where("turn_id", "=", turnId));
}
function readReceipt(database, turnId) {
	let turn = readRow(database, turnId);
	if (!turn) return;
	const owner = readNodeWorkerLaunchReceipt(database, turn.owner_launch_id);
	if (!owner) throw new Error(`node worker turn ${turnId} has no physical owner`);
	if (turn.state === "running" && owner.state !== "pending" && owner.state !== "running") {
		settleNodeWorkerActiveTurns(database, owner);
		turn = readRow(database, turnId);
	}
	return turnReceiptFromRow(turn, owner);
}
function turnReceiptFromRow(turn, owner) {
	const state = turn.state === "running" && owner.state === "pending" ? "pending" : turn.state;
	if (state !== "pending" && state !== "running" && !isNodeWorkerTerminalState(state)) throw new Error(`invalid node worker turn state ${state}`);
	return {
		...owner,
		ownerLaunchId: turn.owner_launch_id,
		launchId: turn.turn_id,
		planHash: turn.plan_hash,
		runId: turn.run_id,
		state,
		resultJson: turn.result_json,
		errorText: turn.error_text,
		completedAtMs: turn.completed_at_ms,
		createdAtMs: turn.created_at_ms,
		updatedAtMs: turn.updated_at_ms
	};
}
function matchesProcess(receipt, supervisor, worker) {
	return receipt.supervisor.pid === supervisor.pid && receipt.supervisor.startTime === supervisor.startTime && receipt.worker?.pid === worker?.pid && receipt.worker?.startTime === worker?.startTime;
}
function pruneTerminal(database, nowMs, excludeTurnId) {
	executeSqliteQuerySync(database, query(database).deleteFrom("node_worker_turns").where("turn_id", "in", query(database).selectFrom("node_worker_turns").select("turn_id").where("completed_at_ms", "<=", Math.max(0, nowMs - TERMINAL_RECEIPT_RETENTION_MS)).where("turn_id", "!=", excludeTurnId).orderBy("completed_at_ms", "asc").orderBy("turn_id", "asc").limit(TERMINAL_PRUNE_BATCH_LIMIT)));
}
/** Immutable turn outcomes attached to a separately supervised physical worker. */
var NodeWorkerTurnKernel = class {
	constructor(options) {
		this.databaseOptions = options;
	}
	write(operationLabel, operation) {
		let initialized;
		const result = runOpenClawStateWriteTransaction(({ db }) => {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: { kind: "node-worker-journal" }
			});
			if (!initializedDatabases.has(db)) {
				ensureTurnSchema(db);
				initialized = db;
			}
			return operation(db);
		}, this.databaseOptions, { operationLabel });
		if (initialized) initializedDatabases.add(initialized);
		return result;
	}
	claim(params) {
		const { claim, ownerLaunchId, supervisor } = params;
		const nowMs = params.nowMs ?? Date.now();
		return this.write("node-worker-turn.claim", (database) => {
			const existing = readReceipt(database, claim.launchId);
			if (existing) {
				if (!nodeWorkerTurnMatchesIdentity(existing, claim) || existing.gatewayNamespace !== claim.gatewayNamespace || existing.ownerLaunchId !== ownerLaunchId) throw new Error(`node worker turn ${claim.launchId} was replayed with a different plan or owner`);
				pruneTerminal(database, nowMs, claim.launchId);
				return {
					action: "replay",
					receipt: existing
				};
			}
			const owner = readNodeWorkerLaunchReceipt(database, ownerLaunchId);
			if (!owner || owner.state !== "pending" && owner.state !== "running" || !matchesProcess(owner, supervisor, params.worker ?? null) || owner.gatewayNamespace !== claim.gatewayNamespace || owner.environmentId !== claim.environmentId || owner.sessionId !== claim.sessionId || owner.ownerEpoch !== claim.ownerEpoch || owner.placementGeneration !== claim.placementGeneration || owner.state === "pending" && owner.launchId !== claim.launchId || owner.launchId === claim.launchId && (owner.state !== "pending" || owner.planHash !== claim.planHash || owner.runId !== claim.runId)) throw new Error(`node worker turn ${claim.launchId} does not match its live physical owner`);
			const turn = executeSqliteQueryTakeFirstSync(database, query(database).insertInto("node_worker_turns").values({
				turn_id: claim.launchId,
				owner_launch_id: ownerLaunchId,
				plan_hash: claim.planHash,
				run_id: claim.runId,
				state: "running",
				result_json: null,
				error_text: null,
				completed_at_ms: null,
				created_at_ms: nowMs,
				updated_at_ms: nowMs
			}).returningAll());
			pruneTerminal(database, nowMs, claim.launchId);
			return {
				action: "start",
				receipt: turnReceiptFromRow(turn, owner)
			};
		});
	}
	get(turnId) {
		return this.write("node-worker-turn.get", (database) => readReceipt(database, turnId));
	}
	finish(params) {
		return this.write("node-worker-turn.finish", (database) => {
			const receipt = readReceipt(database, params.expected.launchId);
			if (!receipt || !nodeWorkerTurnMatchesIdentity(receipt, params.expected) || receipt.ownerLaunchId !== params.ownerLaunchId) return;
			if (receipt.state !== "pending" && receipt.state !== "running" || !matchesProcess(receipt, params.supervisor, params.worker)) return receipt;
			const nowMs = params.nowMs ?? Date.now();
			const completedAtMs = Math.max(nowMs, receipt.createdAtMs, receipt.updatedAtMs);
			const turn = executeSqliteQueryTakeFirstSync(database, query(database).updateTable("node_worker_turns").set({
				state: params.state,
				result_json: params.state === "completed" ? params.resultJson ?? null : null,
				error_text: params.state === "completed" ? null : params.errorText ?? null,
				completed_at_ms: completedAtMs,
				updated_at_ms: completedAtMs
			}).where("turn_id", "=", receipt.launchId).where("state", "=", "running").returningAll());
			pruneTerminal(database, nowMs, receipt.launchId);
			return turnReceiptFromRow(turn, receipt);
		});
	}
};
//#endregion
//#region src/node-host/node-worker-journal.worker.ts
function executeNodeWorkerJournalCommand(command, databasePath, open) {
	const contextOptions = {
		path: databasePath,
		env: getSqliteWorkerStateContext().environment
	};
	if (command.type === "nodeWorker.prepared.find") return new NodeWorkerPreparedWorkspaceKernel(contextOptions).find(...command.input);
	if (command.type === "nodeWorker.prepared.list") return new NodeWorkerPreparedWorkspaceKernel(contextOptions).list(...command.input);
	const options = {
		...contextOptions,
		database: open()
	};
	switch (command.type) {
		case "nodeWorker.prepared.register": return new NodeWorkerPreparedWorkspaceKernel(options).register(...command.input);
		case "nodeWorker.prepared.bind": return new NodeWorkerPreparedWorkspaceKernel(options).bind(...command.input);
		case "nodeWorker.prepared.retire": return new NodeWorkerPreparedWorkspaceKernel(options).retire(...command.input);
		case "nodeWorker.prepared.completeMutation": return new NodeWorkerPreparedWorkspaceKernel(options).completeMutation(...command.input);
		case "nodeWorker.launch.claimObservation": return new NodeWorkerLaunchKernel(options).claimObservation(...command.input);
		case "nodeWorker.launch.claim": return new NodeWorkerLaunchKernel(options).claim(...command.input);
		case "nodeWorker.launch.listNonterminal": return new NodeWorkerLaunchKernel(options).listNonterminal(...command.input);
		case "nodeWorker.launch.nonterminalCount": return new NodeWorkerLaunchKernel(options).nonterminalCount(...command.input);
		case "nodeWorker.launch.pruneExpiredTerminal": return new NodeWorkerLaunchKernel(options).pruneExpiredTerminal(...command.input);
		case "nodeWorker.launch.get": return new NodeWorkerLaunchKernel(options).get(...command.input);
		case "nodeWorker.launch.getMatching": return new NodeWorkerLaunchKernel(options).getMatching(...command.input);
		case "nodeWorker.launch.cleanupBinding": return new NodeWorkerLaunchKernel(options).cleanupBinding(...command.input);
		case "nodeWorker.launch.finishCancelled": return new NodeWorkerLaunchKernel(options).finishCancelled(...command.input);
		case "nodeWorker.launch.markRunning": return new NodeWorkerLaunchKernel(options).markRunning(...command.input);
		case "nodeWorker.launch.finish": return new NodeWorkerLaunchKernel(options).finish(...command.input);
		case "nodeWorker.turn.claim": return new NodeWorkerTurnKernel(options).claim(...command.input);
		case "nodeWorker.turn.get": return new NodeWorkerTurnKernel(options).get(...command.input);
		case "nodeWorker.turn.finish": return new NodeWorkerTurnKernel(options).finish(...command.input);
	}
	throw new Error("Unsupported node worker journal command");
}
//#endregion
//#region src/plugin-state/plugin-blob-store.worker.ts
function executePluginBlobCommand(command, databasePath, openDatabase) {
	const options = {
		path: databasePath,
		env: getSqliteWorkerStateContext().environment
	};
	const description = pluginBlobWorkerOperations[command.type];
	let opened = false;
	try {
		const database = openDatabase();
		opened = true;
		return runOpenClawStateWriteTransaction(({ db }) => {
			switch (command.type) {
				case "pluginBlob.register": return pluginBlobRegisterInDatabase(db, {
					...command.input,
					env: options.env
				});
				case "pluginBlob.registerIfAbsent": return pluginBlobRegisterIfAbsentInDatabase(db, {
					...command.input,
					env: options.env
				});
				case "pluginBlob.delete": return pluginBlobDeleteInDatabase(db, command.input);
				case "pluginBlob.deleteExpiredKey": return pluginBlobDeleteExpiredKeyInDatabase(db, {
					...command.input,
					env: options.env
				});
				case "pluginBlob.deleteExpired": return pluginBlobDeleteExpiredInDatabase(db, {
					...command.input,
					env: options.env
				});
				case "pluginBlob.clear": return pluginBlobClearInDatabase(db, command.input);
			}
		}, {
			...options,
			database
		});
	} catch (error) {
		throw wrapPluginBlobError(error, description.operation, opened ? "PLUGIN_BLOB_WRITE_FAILED" : "PLUGIN_BLOB_OPEN_FAILED", opened ? description.message : "Failed to open plugin blob store.", options.env, options.path);
	}
}
//#endregion
//#region src/plugins/conversation-binding-state.kernel.ts
function readPluginBindingApprovalsInDatabase(db) {
	const approvalsDb = getNodeSqliteKysely(db);
	return executeSqliteQuerySync(db, approvalsDb.selectFrom("plugin_binding_approvals").select([
		"plugin_root",
		"plugin_id",
		"plugin_name",
		"channel",
		"account_id",
		"approved_at"
	]).orderBy("plugin_root", "asc").orderBy("channel", "asc").orderBy("account_id", "asc")).rows.map((row) => ({
		pluginRoot: row.plugin_root,
		pluginId: row.plugin_id,
		pluginName: row.plugin_name ?? void 0,
		channel: normalizeChannel(row.channel),
		accountId: normalizeOptionalString(row.account_id) ?? "default",
		approvedAt: row.approved_at
	}));
}
function upsertPluginBindingApprovalInDatabase(db, entry) {
	const row = {
		plugin_root: entry.pluginRoot,
		channel: normalizeChannel(entry.channel),
		account_id: entry.accountId.trim() || "default",
		plugin_id: entry.pluginId,
		plugin_name: entry.pluginName ?? null,
		approved_at: entry.approvedAt
	};
	const approvalsDb = getNodeSqliteKysely(db);
	executeSqliteQuerySync(db, approvalsDb.insertInto("plugin_binding_approvals").values(row).onConflict((conflict) => conflict.columns([
		"plugin_root",
		"channel",
		"account_id"
	]).doUpdateSet({
		plugin_id: (eb) => eb.ref("excluded.plugin_id"),
		plugin_name: (eb) => eb.ref("excluded.plugin_name"),
		approved_at: (eb) => eb.ref("excluded.approved_at")
	})));
}
//#endregion
//#region src/plugins/official-external-plugin-catalog-snapshot-store.kernel.ts
/** Connection-bound hosted catalog snapshot SQL and monotonicity checks. */
function rowToTrustState(row) {
	if (row.trust_mode !== "signed" || !row.trust_key_id || row.trust_signature_count === null || row.trust_threshold === null || !row.trust_verified_at) return;
	return {
		mode: "signed",
		signedBy: row.trust_key_id,
		signatureCount: coerceRequiredSqliteNumber(row.trust_signature_count),
		threshold: coerceRequiredSqliteNumber(row.trust_threshold),
		verifiedAt: row.trust_verified_at
	};
}
function decodeBase64Payload(payload) {
	const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
	return Buffer.from(normalized, "base64").toString("utf8");
}
function readMonotonicStateFromBody(body) {
	try {
		const document = JSON.parse(body);
		if (!isRecord(document)) return;
		const payload = typeof document.payload === "string" ? decodeBase64Payload(document.payload) : body;
		const feed = typeof document.payload === "string" ? JSON.parse(payload) : document;
		if (!isRecord(feed) || !isOfficialExternalPluginCatalogSequence(feed.sequence)) return;
		if (typeof feed.generatedAt !== "string" || parseOfficialExternalPluginCatalogTimestamp(feed.generatedAt) === void 0) return {
			sequence: feed.sequence,
			payloadSha256: createHash("sha256").update(payload).digest("hex")
		};
		return {
			sequence: feed.sequence,
			generatedAt: feed.generatedAt,
			payloadSha256: createHash("sha256").update(payload).digest("hex")
		};
	} catch {
		return;
	}
}
function assertSignedSnapshotWriteIsMonotonic(params) {
	if (params.candidate?.mode !== "signed-feed" || params.current?.trust_mode !== "signed") return;
	const current = readMonotonicStateFromBody(params.current.body);
	if (!current) return;
	if (isOfficialExternalPluginCatalogRollback({
		candidate: params.candidate,
		current
	})) throw new HostedCatalogSignedFeedMonotonicityError("hosted catalog signed feed sequence is older than current snapshot");
	if (params.candidate.sequence !== current.sequence || current.generatedAt === void 0) return;
	const candidate = readMonotonicStateFromBody(params.candidateBody);
	if (candidate?.sequence === params.candidate.sequence && candidate.payloadSha256 !== current.payloadSha256) throw new HostedCatalogSignedFeedMonotonicityError("hosted catalog signed feed payload changed without a sequence increment");
}
function rowToSnapshot(row) {
	if (!row) return null;
	const metadata = {
		url: row.feed_url,
		status: coerceRequiredSqliteNumber(row.status),
		checksum: row.checksum,
		...row.etag ? { etag: row.etag } : {},
		...row.last_modified ? { lastModified: row.last_modified } : {}
	};
	const trust = rowToTrustState(row);
	const storedMonotonic = trust ? readMonotonicStateFromBody(row.body) : void 0;
	const monotonic = storedMonotonic ? {
		mode: "signed-feed",
		sequence: storedMonotonic.sequence,
		...storedMonotonic.generatedAt ? { generatedAt: storedMonotonic.generatedAt } : {}
	} : void 0;
	return {
		body: row.body,
		metadata,
		savedAt: row.saved_at,
		...trust ? { trust } : {},
		...monotonic ? { monotonic } : {}
	};
}
function readHostedCatalogSnapshotRow(db, url) {
	const stateDb = getNodeSqliteKysely(db);
	return executeSqliteQueryTakeFirstSync(db, stateDb.selectFrom("official_external_plugin_catalog_snapshots").select([
		"feed_url",
		"body",
		"status",
		"etag",
		"last_modified",
		"checksum",
		"saved_at",
		"trust_mode",
		"trust_key_id",
		"trust_signature_count",
		"trust_threshold",
		"trust_verified_at"
	]).where("feed_url", "=", url));
}
function readHostedCatalogSnapshotInDatabase(db, url) {
	return rowToSnapshot(readHostedCatalogSnapshotRow(db, url));
}
/** The caller owns the write transaction containing the reread and upsert. */
function writeHostedCatalogSnapshotInDatabase(db, snapshot, now) {
	const stateDb = getNodeSqliteKysely(db);
	assertSignedSnapshotWriteIsMonotonic({
		candidate: snapshot.monotonic,
		candidateBody: snapshot.body,
		current: readHostedCatalogSnapshotRow(db, snapshot.metadata.url)
	});
	const values = {
		body: snapshot.body,
		status: snapshot.metadata.status,
		etag: snapshot.metadata.etag ?? null,
		last_modified: snapshot.metadata.lastModified ?? null,
		checksum: snapshot.metadata.checksum,
		saved_at: snapshot.savedAt,
		updated_at_ms: now,
		trust_mode: snapshot.trust?.mode ?? null,
		trust_key_id: snapshot.trust?.signedBy ?? null,
		trust_signature_count: snapshot.trust?.signatureCount ?? null,
		trust_threshold: snapshot.trust?.threshold ?? null,
		trust_verified_at: snapshot.trust?.verifiedAt ?? null
	};
	executeSqliteQuerySync(db, stateDb.insertInto("official_external_plugin_catalog_snapshots").values({
		feed_url: snapshot.metadata.url,
		...values
	}).onConflict((conflict) => conflict.column("feed_url").doUpdateSet(values)));
}
//#endregion
//#region src/projects/project-registry.worker.ts
function isProjectRegistryCommand(command) {
	switch (command.type) {
		case "projects.findRoot":
		case "projects.list":
		case "projects.resolve":
		case "projects.insert":
		case "projects.remove":
		case "projects.resolveRefreshOwner": return true;
		default: return false;
	}
}
function executeProjectRegistryCommand(command, options) {
	if (command.type === "projects.remove") return runCheckoutLeaseTransaction(command.input, options, "projects.registry.remove", (db) => removeProjectRegistryInDatabase(db, command.input.project));
	ensureProjectRegistrySchema(options);
	const db = options.database.db;
	if (command.type === "projects.findRoot") return resolveRecordedProjectRootInDatabase(db, command.input.repoRoot);
	if (command.type === "projects.list") return listProjectRegistryInDatabase(db);
	if (command.type === "projects.resolve") return resolveProjectRegistryInDatabase(db, command.input.id);
	if (command.type === "projects.insert") return runCheckoutLeaseTransaction(command.input, options, "projects.registry.insert", (tx) => insertProjectRegistryInDatabase(tx, command.input.project));
	return runCheckoutLeaseTransaction(command.input, options, "projects.registry.refresh-owner.resolve", (tx) => resolveProjectCloneRefreshOwnerInDatabase(tx, command.input.project));
}
function runCheckoutLeaseTransaction(input, options, operationLabel, operation) {
	return runOpenClawStateWriteTransaction(({ db }) => {
		const { project, lease } = input;
		if (lease.scope !== "projects.checkout" || lease.key !== project.repoRoot) throw new Error("Project registry write requires its checkout lifecycle lease");
		assertOpenClawStateLeaseWorkerOwnedInTransaction(db, lease);
		return operation(db);
	}, options, { operationLabel });
}
//#endregion
//#region src/secrets/store/secret-store-config-ref.kernel.ts
const TEAM_SCOPE = {
	scopeKind: "team",
	scopeId: ""
};
/** 16 hex characters (64 random bits) after `_` still fit the 128-character name limit. */
const CONFIG_REF_NAME_BASE_MAX = 111;
const CONFIG_REF_NAME_MINT_ATTEMPTS = 4;
/**
* Saves a chat-provided secret for one config key under a freshly minted name,
* `NAME_<16 random hex>`. A predictable name could match a stale SecretRef
* whose entry was removed and purged, handing that consumer this key; a random
* suffix never names an entry anything already points at. No existing row is
* touched. `admit` fences the write with the requester's live authority at
* transaction and commit.
*/
function writeSecretStoreEntryForConfigRefInDatabase(input, databaseOptions, admit) {
	const base = input.baseName.slice(0, CONFIG_REF_NAME_BASE_MAX);
	if (!ENV_SECRET_REF_ID_RE.test(base)) throw new Error(`Secret store name "${base}" is invalid.`);
	return runOpenClawStateWriteTransaction(({ db: sqlite }) => {
		admit?.("transaction");
		ensureSecretStoreSchema(sqlite);
		const db = getNodeSqliteKysely(sqlite);
		for (let attempt = 0; attempt < CONFIG_REF_NAME_MINT_ATTEMPTS; attempt += 1) {
			const name = `${base}_${randomBytes(8).toString("hex").toUpperCase()}`;
			if (executeSqliteQueryTakeFirstSync(sqlite, db.selectFrom("secret_store_entries").select("name").where("scope_kind", "=", TEAM_SCOPE.scopeKind).where("scope_id", "=", TEAM_SCOPE.scopeId).where("name", "=", name))) continue;
			executeSqliteQuerySync(sqlite, db.insertInto("secret_store_entries").values({
				scope_kind: TEAM_SCOPE.scopeKind,
				scope_id: TEAM_SCOPE.scopeId,
				name,
				value: input.value,
				kind: "secret",
				created_at_ms: input.now,
				updated_at_ms: input.now,
				updated_by: input.writer,
				deleted_at_ms: null,
				allowed_hosts: null
			}));
			admit?.("commit");
			return { name };
		}
		throw new Error("Could not mint an unused secret store name; try again.");
	}, databaseOptions, { operationLabel: "secrets.store.write-config-ref" });
}
//#endregion
//#region src/sessions/session-state-events.worker.ts
function executeSessionStateCommand(command, options) {
	if (command.type === "sessionState.prune") return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		pruneSessionStateEventsInDatabase(db, command.input.now);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
	}, options);
	const { event, now, onlyIfWatched, expectedUpstream, acpControl } = command.input;
	const assertAcpControl = () => {
		if (acpControl && !readAcpSessionControlInWorker(options.database, acpControl).row) throw new Error("ACP task owner could not be verified.");
	};
	const current = (db) => (!onlyIfWatched || hasSessionStateWatchersInDatabase(db, event.sessionKey)) && (!expectedUpstream || isSessionStateUpstreamCurrentInDatabase(db, expectedUpstream));
	if (!current(options.database.db)) return { notices: [] };
	return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		assertAcpControl();
		if (!current(db)) return { notices: [] };
		const recorded = recordSessionStateEventInDatabase(db, event, now);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		assertAcpControl();
		return recorded;
	}, options);
}
//#endregion
//#region src/skills/lifecycle/upload-store-commit.ts
function assembleArchive(chunks, expectedSize) {
	let offset = 0;
	const buffers = [];
	for (const chunk of chunks) {
		const bytes = chunk.chunk_blob;
		if (chunk.byte_offset !== offset || chunk.size_bytes !== bytes.length || bytes.length < 1) throw new SkillUploadRequestError("uploaded archive chunks are incomplete");
		buffers.push(bytes);
		offset += bytes.length;
	}
	if (offset !== expectedSize) throw new SkillUploadRequestError("uploaded archive chunks are incomplete");
	return Buffer.concat(buffers, expectedSize);
}
function toCommitResult(row, requestedSha) {
	if (!row.actual_sha256) throw new SkillUploadRequestError("committed upload is missing sha256");
	if (requestedSha && requestedSha !== row.actual_sha256) throw new SkillUploadRequestError("upload sha256 mismatch");
	return {
		uploadId: row.upload_id,
		receivedBytes: row.received_bytes,
		sha256: row.actual_sha256,
		expiresAt: row.expires_at
	};
}
function commitSkillUploadInDatabase(params, options, admit) {
	const { uploadId, requestedSha } = params;
	const row = requireUploadMetadata(uploadId, options);
	assertNotExpired(row, Date.now(), options);
	if (row.committed === 1) return toCommitResult(row, requestedSha);
	if (row.received_bytes !== row.size_bytes) throw new SkillUploadRequestError(`upload size mismatch: expected ${row.size_bytes}, got ${row.received_bytes}`);
	if (row.sha256 && requestedSha && row.sha256 !== requestedSha) throw new SkillUploadRequestError("upload sha256 does not match begin sha256");
	let archive;
	try {
		archive = assembleArchive(readSkillUploadArchiveChunks(uploadId, options), row.size_bytes);
	} catch (err) {
		const current = requireUploadMetadata(uploadId, options);
		if (current.committed === 1) {
			assertNotExpired(current, Date.now(), options);
			return toCommitResult(current, requestedSha);
		}
		throw err;
	}
	const actualSha256 = sha256Hex(archive);
	const expectedSha = requestedSha ?? row.sha256 ?? void 0;
	if (expectedSha && expectedSha !== actualSha256) throw new SkillUploadRequestError("upload sha256 mismatch");
	const outcome = runOpenClawStateWriteTransaction(({ db }) => {
		admit?.("transaction");
		const kysely = getNodeSqliteKysely(db);
		const current = executeSqliteQueryTakeFirstSync(db, selectSkillUploadMetadata(kysely).where("upload_id", "=", uploadId));
		if (!current) throw new SkillUploadRequestError(`upload not found: ${uploadId}`);
		const committedAt = Date.now();
		if (!isFutureDateTimestampMs(current.expires_at, { nowMs: committedAt })) {
			deleteExpiredSkillUploadUnlessLeasedInDatabase(db, {
				uploadId,
				nowMs: committedAt
			});
			admit?.("commit");
			return { expired: true };
		}
		if (current.committed === 1) {
			admit?.("commit");
			return {
				expired: false,
				result: toCommitResult(current, requestedSha)
			};
		}
		if (current.received_bytes !== current.size_bytes || current.size_bytes !== archive.length) throw new SkillUploadRequestError("uploaded archive chunks changed during commit");
		executeSqliteQuerySync(db, kysely.updateTable("skill_uploads").set({
			actual_sha256: actualSha256,
			archive_blob: archive,
			committed: 1,
			committed_at: committedAt
		}).where("upload_id", "=", uploadId));
		executeSqliteQuerySync(db, kysely.deleteFrom("skill_upload_chunks").where("upload_id", "=", uploadId));
		admit?.("commit");
		return {
			expired: false,
			result: {
				uploadId,
				receivedBytes: current.received_bytes,
				sha256: actualSha256,
				expiresAt: current.expires_at
			}
		};
	}, options);
	if (outcome.expired) throw new SkillUploadRequestError("upload has expired");
	return outcome.result;
}
//#endregion
//#region src/skills/lifecycle/upload-store.kernel.ts
function matchesBegin(row, params) {
	return row.kind === params.kind && row.slug === params.slug && row.force === (params.force ? 1 : 0) && row.size_bytes === params.sizeBytes && (row.sha256 ?? void 0) === params.sha256;
}
function beginSkillUploadInDatabase(params, options, admit) {
	const { slug, force, sizeBytes, sha256, keyHash, ttlMs } = params;
	return runOpenClawStateWriteTransaction(({ db }) => {
		admit?.("transaction");
		const createdAt = Date.now();
		const expiresAt = resolveExpiresAtMsFromDurationMs(ttlMs, { nowMs: createdAt });
		if (expiresAt === void 0) throw new SkillUploadRequestError("invalid upload expiry");
		const kysely = getNodeSqliteKysely(db);
		if (keyHash) {
			const existing = executeSqliteQueryTakeFirstSync(db, selectSkillUploadMetadata(kysely).where("idempotency_key_hash", "=", keyHash));
			if (existing) {
				if (!matchesBegin(existing, {
					kind: params.kind,
					slug,
					force,
					sizeBytes,
					sha256
				})) throw new SkillUploadRequestError("idempotencyKey conflicts with a different upload");
				if (isFutureDateTimestampMs(existing.expires_at, { nowMs: createdAt })) {
					admit?.("commit");
					return {
						uploadId: existing.upload_id,
						receivedBytes: existing.received_bytes,
						expiresAt: existing.expires_at
					};
				}
				if (hasLiveSkillUploadInstallLease(db, kysely, existing.upload_id, createdAt)) throw new SkillUploadRequestError("upload is already being installed");
				deleteSkillUploadState(db, kysely, existing.upload_id);
			}
		}
		if (executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_uploads").select((eb) => eb.val(1).as("present")).where("expires_at", ">", createdAt).offset(31).limit(1))) throw new SkillUploadRequestError("too many active skill uploads");
		const uploadId = randomUUID();
		executeSqliteQuerySync(db, kysely.insertInto("skill_uploads").values({
			upload_id: uploadId,
			kind: params.kind,
			slug,
			force: force ? 1 : 0,
			size_bytes: sizeBytes,
			sha256: sha256 ?? null,
			actual_sha256: null,
			received_bytes: 0,
			archive_blob: Buffer.alloc(0),
			created_at: createdAt,
			expires_at: expiresAt,
			committed: 0,
			committed_at: null,
			idempotency_key_hash: keyHash ?? null
		}));
		admit?.("commit");
		return {
			uploadId,
			receivedBytes: 0,
			expiresAt
		};
	}, options);
}
function appendSkillUploadChunkInDatabase(params, options, admit) {
	const { uploadId, offset, decoded } = params;
	assertNotExpired(requireUploadMetadata(uploadId, options), Date.now(), options);
	return runOpenClawStateWriteTransaction(({ db }) => {
		admit?.("transaction");
		const kysely = getNodeSqliteKysely(db);
		const row = executeSqliteQueryTakeFirstSync(db, selectSkillUploadMetadata(kysely).where("upload_id", "=", uploadId));
		if (!row) throw new SkillUploadRequestError(`upload not found: ${uploadId}`);
		const validNow = asDateTimestampMs(Date.now());
		if (validNow === void 0 || !isFutureDateTimestampMs(row.expires_at, { nowMs: validNow })) throw new SkillUploadRequestError("upload has expired");
		if (row.committed === 1) throw new SkillUploadRequestError("upload is already committed");
		if (offset !== row.received_bytes) throw new SkillUploadRequestError(`upload offset mismatch: expected ${row.received_bytes}, got ${offset}`);
		const nextSize = row.received_bytes + decoded.length;
		if (nextSize > row.size_bytes) throw new SkillUploadRequestError("upload chunk exceeds declared size");
		executeSqliteQuerySync(db, kysely.insertInto("skill_upload_chunks").values({
			upload_id: uploadId,
			byte_offset: offset,
			size_bytes: decoded.length,
			chunk_blob: decoded
		}));
		executeSqliteQuerySync(db, kysely.updateTable("skill_uploads").set({ received_bytes: nextSize }).where("upload_id", "=", uploadId));
		admit?.("commit");
		return {
			uploadId,
			receivedBytes: nextSize,
			expiresAt: row.expires_at
		};
	}, options);
}
function claimSkillUploadInDatabase(params, options) {
	const { uploadId, leaseOwner, installLeaseMs } = params;
	assertNotExpired(requireUploadMetadata(uploadId, options), Date.now(), options);
	return runOpenClawStateWriteTransaction(({ db }) => {
		const kysely = getNodeSqliteKysely(db);
		const current = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_uploads").selectAll().where("upload_id", "=", uploadId));
		if (!current) throw new SkillUploadRequestError(`upload not found: ${uploadId}`);
		const currentTime = Date.now();
		const validNow = asDateTimestampMs(currentTime);
		if (validNow === void 0 || !isFutureDateTimestampMs(current.expires_at, { nowMs: validNow })) throw new SkillUploadRequestError("upload has expired");
		if (current.committed !== 1) throw new SkillUploadRequestError("upload is not committed");
		if (!current.actual_sha256) throw new SkillUploadRequestError("committed upload is missing sha256");
		if (current.archive_blob.byteLength !== current.size_bytes) throw new SkillUploadRequestError("uploaded archive is missing or incomplete");
		executeSqliteQuerySync(db, kysely.deleteFrom("state_leases").where("scope", "=", SKILL_UPLOAD_LEASE_SCOPE).where("lease_key", "=", uploadId).where("expires_at", "<=", currentTime));
		if (executeSqliteQuerySync(db, kysely.insertInto("state_leases").values({
			scope: "skill-upload-install",
			lease_key: uploadId,
			owner: leaseOwner,
			expires_at: currentTime + installLeaseMs,
			heartbeat_at: currentTime,
			payload_json: null,
			created_at: currentTime,
			updated_at: currentTime
		}).onConflict((conflict) => conflict.doNothing())).numAffectedRows !== 1n) throw new SkillUploadRequestError("upload is already being installed");
		return current;
	}, options);
}
function listExpiredSkillUploadsInDatabase(_input, options) {
	const now = asDateTimestampMs(Date.now());
	if (now === void 0) return [];
	const { db } = options.database;
	return executeSqliteQuerySync(db, getNodeSqliteKysely(db).selectFrom("skill_uploads").select("upload_id").where("expires_at", "<=", now)).rows.map((row) => row.upload_id);
}
function deleteExpiredSkillUploadInDatabase(params, options) {
	return runOpenClawStateWriteTransaction(({ db }) => deleteExpiredSkillUploadUnlessLeasedInDatabase(db, {
		uploadId: params.uploadId,
		nowMs: Date.now()
	}), options);
}
function releaseSkillUploadInDatabase(params, options) {
	runOpenClawStateWriteTransaction((current) => {
		if (requireOpenClawStateDatabaseIdentity(current).key !== params.sharedStateIdentity) throw new Error("Skill upload cleanup cannot adopt a replacement shared database");
		const { db } = current;
		executeSqliteQuerySync(db, getNodeSqliteKysely(db).deleteFrom("state_leases").where("scope", "=", SKILL_UPLOAD_LEASE_SCOPE).where("lease_key", "=", params.uploadId).where("owner", "=", params.owner));
	}, options);
}
//#endregion
//#region src/skills/lifecycle/upload-store.worker.ts
function isSkillUploadCommand(command) {
	return command.type === "skillUploads.begin" || command.type === "skillUploads.chunk" || command.type === "skillUploads.commit" || command.type === "skillUploads.expired" || command.type === "skillUploads.deleteExpired" || command.type === "skillUploads.claim" || command.type === "skillUploads.renew" || command.type === "skillUploads.consume" || command.type === "skillUploads.release";
}
function executeSkillUploadCommand(command, options) {
	const admit = (stage) => requestSqliteWorkerOperationAdmission({
		stage,
		facts: void 0
	});
	switch (command.type) {
		case "skillUploads.begin": return beginSkillUploadInDatabase(command.input, options, admit);
		case "skillUploads.chunk": return appendSkillUploadChunkInDatabase(command.input, options, admit);
		case "skillUploads.commit": return commitSkillUploadInDatabase(command.input, options, admit);
		case "skillUploads.expired": return listExpiredSkillUploadsInDatabase(command.input, options);
		case "skillUploads.deleteExpired": return deleteExpiredSkillUploadInDatabase(command.input, options);
		case "skillUploads.claim": return claimSkillUploadInDatabase(command.input, options);
		case "skillUploads.renew": return renewSkillUploadInstallLease({
			...command.input,
			options
		});
		case "skillUploads.consume": return deleteOwnedSkillUpload(command.input.uploadId, command.input.owner, options);
		case "skillUploads.release": return releaseSkillUploadInDatabase(command.input, options);
	}
}
//#endregion
//#region src/skills/workshop/collection-review.kernel.ts
const SKILL_COLLECTION_REVIEW_HISTORY_LIMIT = 20;
function experienceReviewKey(agentId, workspaceDir) {
	return sha256Hex(`${agentId}\0${path.resolve(workspaceDir)}`);
}
function readSkillCuratorReviewStatusInDatabase(database) {
	const row = readConfigMachineStateRowInDatabase(database.db, "skills.curatorState");
	const state = row ? JSON.parse(row.value_json) : void 0;
	return {
		lastAttemptAtMs: state?.lastAttemptAtMs ?? null,
		lastSuccessAtMs: state?.lastSuccessAtMs ?? null,
		lastError: state?.lastError ?? null,
		collectionReviews: state?.lastResult.collectionReviews ?? {},
		experienceReviews: state?.lastResult.experienceReviews ?? {}
	};
}
function recordSkillExperienceReviewOutcomeInDatabase(database, input) {
	const entryKey = experienceReviewKey(input.agentId, input.workspaceDir);
	const now = Date.now();
	updateConfigMachineStateInDatabase(database.db, "skills.curatorState", (current) => {
		const state = current?.lastResult;
		return {
			lastAttemptAtMs: 0,
			lastSuccessAtMs: null,
			lastError: null,
			...current,
			lastResult: {
				...state,
				experienceReviews: {
					...state?.experienceReviews,
					[entryKey]: input.review
				}
			}
		};
	}, now);
}
function parseStoredNames(value, field) {
	const parsed = JSON.parse(value);
	if (!Array.isArray(parsed) || !parsed.every((entry) => typeof entry === "string")) throw new Error(`Invalid ${field} in stored skill collection review.`);
	return parsed;
}
function parseStoredDrops(value) {
	const parsed = JSON.parse(value);
	if (!Array.isArray(parsed)) throw new Error("Invalid dropped entries in stored skill collection review.");
	return parsed.map((entry) => {
		const record = asNullableRecord(entry);
		if (!record || typeof record.name !== "string" || typeof record.reason !== "string") throw new Error("Invalid dropped entry in stored skill collection review.");
		return {
			name: record.name,
			reason: record.reason
		};
	});
}
function readSkillCollectionBackupDropsInDatabase(database, input) {
	const kysely = getNodeSqliteKysely(database);
	const rows = executeSqliteQuerySync(database, kysely.selectFrom("skill_workshop_collection_reviews").select("dropped_json").where("owner_agent_id", "=", input.agentId).where("backup_id", "=", input.backupId)).rows;
	return new Set(rows.flatMap((row) => parseStoredDrops(row.dropped_json).map((drop) => drop.name)));
}
function listSkillCollectionReviewOutcomesInDatabase(database, agentId) {
	const kysely = getNodeSqliteKysely(database);
	return executeSqliteQuerySync(database, kysely.selectFrom("skill_workshop_collection_reviews").select([
		"backup_id",
		"create_time",
		"kept_names_json",
		"written_names_json",
		"dropped_json"
	]).where("owner_agent_id", "=", agentId).orderBy("create_time", "desc").orderBy("review_id", "desc").limit(SKILL_COLLECTION_REVIEW_HISTORY_LIMIT)).rows.map((row) => ({
		createTime: row.create_time,
		backupId: row.backup_id,
		kept: parseStoredNames(row.kept_names_json, "kept names"),
		written: parseStoredNames(row.written_names_json, "written names"),
		dropped: parseStoredDrops(row.dropped_json)
	}));
}
//#endregion
//#region src/skills/workshop/curator.kernel.ts
function readSkillCuratorStateInDatabase(database, skillFiles) {
	const kysely = getNodeSqliteKysely(database.db);
	const reviewStatus = readSkillCuratorReviewStatusInDatabase(database);
	return {
		proposalRows: executeSqliteQuerySync(database.db, kysely.selectFrom("skill_workshop_proposals").selectAll().where("kind", "=", "create").where("status", "=", "applied").orderBy("applied_at", "asc").orderBy("proposal_id", "asc")).rows,
		usageRows: skillFiles.length ? executeSqliteQuerySync(database.db, kysely.selectFrom("skill_usage").select([
			"skill_file",
			"last_used_at_ms",
			"use_count"
		]).where("skill_file", "in", skillFiles)).rows : [],
		reviewStatus
	};
}
function recordSkillUsageInDatabase(database, event) {
	const kysely = getNodeSqliteKysely(database.db);
	executeSqliteQuerySync(database.db, kysely.insertInto("skill_usage").values({
		skill_file: event.skillFile,
		skill_key: event.skillKey,
		skill_name: event.skillName,
		skill_source: event.skillSource,
		first_used_at_ms: event.ts,
		last_used_at_ms: event.ts,
		use_count: 1,
		last_agent_id: event.agentId ?? null
	}).onConflict((conflict) => conflict.column("skill_file").doUpdateSet((eb) => ({
		skill_key: event.skillKey,
		skill_name: event.skillName,
		skill_source: event.skillSource,
		first_used_at_ms: eb.fn("min", [eb.ref("first_used_at_ms"), eb.val(event.ts)]),
		last_used_at_ms: eb.fn("max", [eb.ref("last_used_at_ms"), eb.val(event.ts)]),
		use_count: eb("use_count", "+", 1),
		last_agent_id: eb.case().when("last_used_at_ms", "<=", event.ts).then(event.agentId ?? null).else(eb.ref("last_agent_id")).end()
	}))));
}
//#endregion
//#region src/skills/workshop/store-evaluation.kernel.ts
function recordSkillProposalEvaluationInDatabase(db, params) {
	assertProposalId(params.proposalId);
	const current = readStoredProposalInDatabase(db, params.proposalId);
	if (!current) throw new Error(`Skill proposal not found: ${params.proposalId}`);
	const { record } = current;
	if (record.status !== "pending" || record.proposedVersion !== params.expectedProposedVersion || hashSkillProposalRevision(record) !== params.expectedRevisionHash) throw new Error("Skill proposal changed while evaluation was running; discard the stale evaluation and retry.");
	const next = {
		...record,
		updatedAt: params.evaluation.completedAt,
		evaluation: params.evaluation
	};
	updateProposal(db, current.row, next);
	return {
		record: next,
		event: appendSkillProposalEvent(db, params.event)
	};
}
//#endregion
//#region src/skills/workshop/store-sqlite-rollback.ts
function skillProposalRollbackValues(rollback) {
	return {
		written_at: rollback.writtenAt,
		target_skill_file: rollback.targetSkillFile,
		action: rollback.action,
		previous_content_hash: rollback.previousContentHash ?? null,
		previous_content: rollback.previousContent ?? null,
		support_files_json: rollback.supportFiles ? JSON.stringify(rollback.supportFiles) : null
	};
}
function removeOtherPendingTargetRollbacks(database, params) {
	const kysely = getNodeSqliteKysely(database);
	const rows = executeSqliteQuerySync(database, kysely.selectFrom("skill_workshop_proposal_rollbacks").innerJoin("skill_workshop_proposals", "skill_workshop_proposals.proposal_id", "skill_workshop_proposal_rollbacks.proposal_id").select("skill_workshop_proposal_rollbacks.proposal_id as proposalId").where("skill_workshop_proposal_rollbacks.target_skill_file", "=", params.targetSkillFile).where("skill_workshop_proposals.status", "=", "pending").where("skill_workshop_proposals.proposal_id", "!=", params.proposalId)).rows;
	for (const row of rows) executeSqliteQuerySync(database, kysely.deleteFrom("skill_workshop_proposal_rollbacks").where("proposal_id", "=", row.proposalId));
}
function writeSkillProposalRollbackInDatabase(db, params) {
	assertProposalId(params.proposalId);
	const kysely = getNodeSqliteKysely(db);
	const proposal = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_workshop_proposals").select([
		"proposal_id",
		"kind",
		"status"
	]).where("proposal_id", "=", params.proposalId));
	if (!proposal) throw new Error(`Skill proposal not found: ${params.proposalId}`);
	if (proposal.status !== "pending") throw new Error(`Only pending proposals can be applied. Current status: ${proposal.status}.`);
	removeOtherPendingTargetRollbacks(db, {
		proposalId: params.proposalId,
		targetSkillFile: params.rollback.targetSkillFile
	});
	const values = skillProposalRollbackValues(params.rollback);
	executeSqliteQuerySync(db, kysely.insertInto("skill_workshop_proposal_rollbacks").values({
		proposal_id: params.proposalId,
		...values
	}).onConflict((conflict) => conflict.column("proposal_id").doUpdateSet(values)));
}
function readSkillProposalRollbackInDatabase(database, proposalId) {
	assertProposalId(proposalId);
	const kysely = getNodeSqliteKysely(database);
	const row = executeSqliteQueryTakeFirstSync(database, kysely.selectFrom("skill_workshop_proposal_rollbacks").selectAll().where("proposal_id", "=", proposalId));
	if (!row) return null;
	return parseSkillProposalRollback({
		schema: SKILL_WORKSHOP_ROLLBACK_SCHEMA,
		proposalId: row.proposal_id,
		writtenAt: row.written_at,
		targetSkillFile: row.target_skill_file,
		action: row.action,
		...row.previous_content_hash ? { previousContentHash: row.previous_content_hash } : {},
		...row.previous_content !== null ? { previousContent: row.previous_content } : {},
		...row.support_files_json ? { supportFiles: parseJson(row.support_files_json) } : {}
	});
}
function clearSkillProposalRollbackInDatabase(db, params) {
	assertProposalId(params.proposalId);
	const kysely = getNodeSqliteKysely(db);
	const proposal = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_workshop_proposals").select(["record_json", "status"]).where("proposal_id", "=", params.proposalId));
	if (!proposal || proposal.status !== "pending" || proposal.record_json !== params.expectedRecordJson) return false;
	executeSqliteQuerySync(db, kysely.deleteFrom("skill_workshop_proposal_rollbacks").where("proposal_id", "=", params.proposalId));
	return true;
}
//#endregion
//#region src/skills/workshop/store-proposal.kernel.ts
function createSkillProposalInDatabase(db, params) {
	assertProposalId(params.record.id);
	const kysely = getNodeSqliteKysely(db);
	if (executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_workshop_proposals").select("proposal_id").where("proposal_id", "=", params.record.id))) throw new Error(`Skill proposal already exists: ${params.record.id}`);
	if ((executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_workshop_proposals").select((eb) => eb.fn.countAll().as("count")).where("owner_agent_id", "=", params.ownerAgentId).where("status", "in", ["pending", "quarantined"]))?.count ?? 0) >= params.maxPending) throw new Error(`Skill Workshop pending proposal limit reached (${params.maxPending}).`);
	insertProposal(db, {
		record: params.record,
		ownerAgentId: params.ownerAgentId
	});
	return appendSkillProposalEvent(db, params.event);
}
function updateSkillProposalRecordInDatabase(db, params) {
	assertProposalId(params.record.id);
	const kysely = getNodeSqliteKysely(db);
	const current = readStoredProposalInDatabase(db, params.record.id);
	if (!current) throw new Error(`Skill proposal not found: ${params.record.id}`);
	if (current.row.status === "pending" && (params.record.status === "rejected" || params.record.status === "quarantined") && executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_workshop_proposal_rollbacks").select("proposal_id").where("proposal_id", "=", params.record.id))) throw new Error("Skill proposal has unfinished apply recovery. Run openclaw doctor --fix and restore the files it identifies before retrying.");
	if (params.invalidateRollback) executeSqliteQuerySync(db, kysely.deleteFrom("skill_workshop_proposal_rollbacks").where("proposal_id", "=", params.record.id));
	updateProposal(db, current.row, params.record, params.ownerAgentId);
	return params.event ? appendSkillProposalEvent(db, params.event) : void 0;
}
function listStoredSkillProposalsInDatabase(database, scope) {
	let query = getNodeSqliteKysely(database).selectFrom("skill_workshop_proposals").selectAll();
	if (scope.kind) query = query.where("kind", "=", scope.kind);
	if (scope.status) query = query.where("status", "=", scope.status);
	if (scope.agentId) query = query.where("owner_agent_id", "=", scope.agentId);
	else query = query.where("owner_agent_id", "is not", null);
	return executeSqliteQuerySync(database, query.orderBy("updated_at", "desc").orderBy("proposal_id", "asc")).rows.flatMap((row) => {
		const record = parseSkillProposalRow(row);
		return record ? [{
			record,
			row
		}] : [];
	});
}
function importLegacySkillProposalInDatabase(db, params) {
	assertProposalId(params.record.id);
	const kysely = getNodeSqliteKysely(db);
	const current = executeSqliteQueryTakeFirstSync(db, kysely.selectFrom("skill_workshop_proposals").selectAll().where("proposal_id", "=", params.record.id));
	if (current) {
		const existing = parseSkillProposalRow(current);
		if (!existing || existing.draftHash !== params.record.draftHash || existing.target.skillFile !== params.record.target.skillFile) throw new Error(`Legacy skill proposal conflicts with SQLite: ${params.record.id}`);
	} else insertProposal(db, {
		record: params.record,
		ownerAgentId: params.ownerAgentId
	});
	if (params.rollback) executeSqliteQuerySync(db, kysely.insertInto("skill_workshop_proposal_rollbacks").values({
		proposal_id: params.record.id,
		...skillProposalRollbackValues(params.rollback)
	}).onConflict((conflict) => conflict.column("proposal_id").doNothing()));
	return current ? "already-imported" : "imported";
}
//#endregion
//#region src/skills/workshop/store-sqlite-transition.ts
function commitPendingSkillProposalTransitionInDatabase(db, params) {
	const kysely = getNodeSqliteKysely(db);
	const current = readStoredProposalInDatabase(db, params.expected.id);
	if (!current || current.record.status !== "pending" || current.row.record_json !== JSON.stringify(params.expected)) return {
		state: "conflict",
		...current ? { current: current.record } : {}
	};
	if (params.invalidateRollback) executeSqliteQuerySync(db, kysely.deleteFrom("skill_workshop_proposal_rollbacks").where("proposal_id", "=", params.expected.id));
	updateProposal(db, current.row, params.record);
	return {
		state: "committed",
		event: appendSkillProposalEvent(db, params.event)
	};
}
function readCommittedSkillProposalTransitionInDatabase(db, params) {
	const stored = readStoredProposalInDatabase(db, params.record.id);
	if (!stored || stored.row.record_json !== JSON.stringify(params.record)) return null;
	const event = readStoredSkillProposalEventInDatabase(db, params.event.eventId);
	if (!event || event.proposalId !== params.event.proposalId || event.proposedVersion !== params.event.proposedVersion || event.revisionHash !== params.event.revisionHash || event.type !== params.event.type) return null;
	return {
		state: "committed",
		event
	};
}
//#endregion
//#region src/skills/workshop/store.worker.ts
function isSkillWorkshopCommand(command) {
	switch (command.type) {
		case "skills.curator.read":
		case "skills.usage.record":
		case "workshop.events.list":
		case "workshop.schema.ensure":
		case "workshop.proposal.read":
		case "workshop.proposals.list":
		case "workshop.proposal.create":
		case "workshop.proposal.update":
		case "workshop.proposal.import":
		case "workshop.proposal.evaluate":
		case "workshop.transition.commit":
		case "workshop.transition.committed":
		case "workshop.rollback.read":
		case "workshop.rollback.write":
		case "workshop.rollback.clear":
		case "workshop.collection.list":
		case "workshop.collection.drops":
		case "workshop.experience.record": return true;
		default: return false;
	}
}
function executeSkillWorkshopCommand(command, database, databasePath) {
	if (command.type === "skills.curator.read") return readSkillCuratorStateInDatabase(database, command.input.skillFiles);
	const options = {
		database,
		path: databasePath,
		env: getSqliteWorkerStateContext().environment
	};
	if (command.type === "skills.usage.record") return runOpenClawStateWriteTransaction((current) => recordSkillUsageInDatabase(current, command.input), options);
	if (command.type === "workshop.events.list") {
		ensureSkillWorkshopSchemaInDatabase(database, options);
		return listStoredSkillProposalEventsInDatabase(database.db, command.input);
	}
	const { leaseIdentities } = command.input;
	const assertWrite = (db, stage) => {
		if (leaseIdentities) assertOpenClawStateLeasesWorkerOwnedInTransaction(db, leaseIdentities, stage);
		else requestSqliteWorkerOperationAdmission({
			stage,
			facts: void 0
		});
	};
	if (command.type === "workshop.schema.ensure") return ensureSkillWorkshopSchemaInDatabase(database, options, assertWrite);
	const write = (operationLabel, operation, proposalId) => runOpenClawStateWriteTransaction(({ db }) => {
		assertWrite(db, "transaction");
		if (leaseIdentities) {
			const stored = proposalId ? readStoredProposalInDatabase(db, proposalId) : null;
			const agentId = command.input.agentId;
			for (const identity of leaseIdentities) if (!agentId || (identity.scope === "skill-collection" ? identity.key !== agentId : identity.scope !== "skill-workshop-target" || !stored || identity.key !== `${agentId}:${hashSkillProposalContent(stored.record.target.skillFile)}`) || stored !== null && stored.row.owner_agent_id !== null && stored.row.owner_agent_id !== agentId) throw new Error("Skill Workshop lease does not match its proposal target.");
		}
		const result = operation();
		assertWrite(db, "commit");
		return result;
	}, options, { operationLabel });
	switch (command.type) {
		case "workshop.proposal.read": return readStoredProposalInDatabase(database.db, command.input.value);
		case "workshop.proposals.list": return listStoredSkillProposalsInDatabase(database.db, command.input.value);
		case "workshop.proposal.create": return write("skill-workshop.proposal.create", () => createSkillProposalInDatabase(database.db, command.input.value));
		case "workshop.proposal.update": return write("skill-workshop.proposal.update", () => updateSkillProposalRecordInDatabase(database.db, command.input.value), command.input.value.record.id);
		case "workshop.proposal.import": return write("doctor.skill-workshop.import", () => importLegacySkillProposalInDatabase(database.db, command.input.value));
		case "workshop.proposal.evaluate": return write("skill-workshop.proposal.evaluate", () => recordSkillProposalEvaluationInDatabase(database.db, command.input.value), command.input.value.proposalId);
		case "workshop.transition.commit": return write(command.input.value.operationLabel, () => commitPendingSkillProposalTransitionInDatabase(database.db, command.input.value), command.input.value.expected.id);
		case "workshop.transition.committed": return readCommittedSkillProposalTransitionInDatabase(database.db, command.input.value);
		case "workshop.rollback.read": return readSkillProposalRollbackInDatabase(database.db, command.input.value);
		case "workshop.rollback.write": return write("skill-workshop.rollback.write", () => writeSkillProposalRollbackInDatabase(database.db, command.input.value), command.input.value.proposalId);
		case "workshop.rollback.clear": return write("skill-workshop.rollback.clear", () => clearSkillProposalRollbackInDatabase(database.db, command.input.value), command.input.value.proposalId);
		case "workshop.collection.list": return listSkillCollectionReviewOutcomesInDatabase(database.db, command.input.value);
		case "workshop.collection.drops": return readSkillCollectionBackupDropsInDatabase(database.db, command.input.value);
		case "workshop.experience.record": return write("skill-workshop.experience.record", () => recordSkillExperienceReviewOutcomeInDatabase(database, command.input.value));
	}
}
//#endregion
//#region src/transcripts/store-sqlite-read.ts
function readTranscriptCanonicalSessionRow(database, selector) {
	return executeSqliteQueryTakeFirstSync(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").selectAll().where("selector", "=", selector));
}
function readTranscriptExportOwnership(database, session) {
	return executeSqliteQueryTakeFirstSync(database, meetingTranscriptSessionQuery(database, session).select(["export_manifest_json", "export_pending_json"]));
}
function readTranscriptExportPathCollisions(database, exportKey) {
	return executeSqliteQuerySync(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").select([
		"session_id",
		"started_at",
		"selector",
		"export_pending_json"
	]).where("export_key", "=", exportKey).orderBy("selector", "asc")).rows;
}
function readTranscriptExportPathOwners(database, exportKey) {
	return executeSqliteQuerySync(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").select([
		"session_id",
		"started_at",
		"export_manifest_json",
		"export_pending_json"
	]).where("export_key", "=", exportKey).orderBy("selector", "asc")).rows;
}
const summarySnapshotQueries = /* @__PURE__ */ new WeakMap();
/** Runs inside the read worker's transaction so input and replacement basis agree. */
function readTranscriptSummarySnapshot(database, session, maxUtterances) {
	let read = summarySnapshotQueries.get(database);
	if (!read) {
		read = prepareSqliteQueryTakeFirstSync(database, (parameter) => meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").where("session_id", "=", parameter((value) => value.sessionId)).where("started_at", "=", parameter((value) => value.startedAt)).select([
			"next_utterance_seq",
			"title",
			"source_json",
			"metadata_json",
			"stopped_at",
			"created_at_ms",
			"updated_at_ms"
		]));
		summarySnapshotQueries.set(database, read);
	}
	const row = read(session);
	if (!row) return;
	const summaryRevision = readStoredTranscriptSummaryRevision(database, session);
	return {
		inputRevision: transcriptSummaryInputRevisionFromRow(row),
		nextSequence: row.next_utterance_seq,
		stoppedAt: row.stopped_at ?? void 0,
		summaryRevision: summaryRevision ?? "",
		utterances: readTranscriptUtterances(database, session, maxUtterances)
	};
}
function readTranscriptSessionEntries(database) {
	const rows = executeSqliteQuerySync(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").selectAll().orderBy("started_at", "desc").orderBy("session_id", "asc")).rows;
	const summaryKeys = readTranscriptSummaryKeys(database);
	return rows.map((row) => ({
		session: sessionFromRow(row),
		selector: row.selector,
		hasSummary: summaryKeys.has(`${row.session_id}\0${row.started_at}`)
	}));
}
const sessionMatchQueries = /* @__PURE__ */ new WeakMap();
function createTranscriptSessionMatchQueries(database) {
	const query = meetingTranscriptDb(database).selectFrom("meeting_transcript_sessions").select([
		"session_id",
		"started_at",
		"selector",
		"title",
		"source_json",
		"metadata_json",
		"stopped_at",
		"next_utterance_seq",
		"created_at_ms",
		"updated_at_ms"
	]).select((eb) => eb.exists(eb.selectFrom("meeting_transcript_summaries").select("session_id").whereRef("meeting_transcript_summaries.session_id", "=", "meeting_transcript_sessions.session_id").whereRef("meeting_transcript_summaries.session_started_at", "=", "meeting_transcript_sessions.started_at")).as("has_summary")).orderBy("started_at", "desc").limit(2);
	return {
		canonical: prepareSqliteQuerySync(database, (parameter) => query.where("selector", "=", parameter((value) => value))),
		rawId: prepareSqliteQuerySync(database, (parameter) => query.where("session_id", "=", parameter((value) => value))),
		slug: prepareSqliteQuerySync(database, (parameter) => query.where("session_slug", "=", parameter((value) => value)).where("session_id", "!=", parameter((value) => value))),
		dated: prepareSqliteQuerySync(database, (parameter) => query.where("session_id", "=", parameter((value) => value.sessionId)).where("started_at", "like", parameter((value) => `${value.date}T%`)))
	};
}
function readTranscriptSessionMatches(database, value) {
	let queries = sessionMatchQueries.get(database);
	if (!queries) {
		queries = createTranscriptSessionMatchQueries(database);
		sessionMatchQueries.set(database, queries);
	}
	const entries = (result) => result.rows.map((row) => ({
		session: sessionFromRow(row),
		selector: row.selector,
		hasSummary: Boolean(row.has_summary),
		inputRevision: transcriptSummaryInputRevisionFromRow(row)
	}));
	const canonical = entries(queries.canonical(value))[0];
	const date = value.match(/^(\d{4}-\d{2}-\d{2})\//u)?.[1];
	return {
		qualified: canonical ? [canonical] : date ? entries(queries.dated({
			sessionId: value.slice(11),
			date
		})) : [],
		unqualified: [...entries(queries.rawId(value)), ...entries(queries.slug(value))]
	};
}
function readTranscriptSessionByIdentity(database, session) {
	const row = executeSqliteQueryTakeFirstSync(database, meetingTranscriptSessionQuery(database, session).selectAll());
	return row ? sessionFromRow(row) : void 0;
}
function readTranscriptUtterances(database, session, maxUtterances) {
	const limit = resolveOptionalIntegerOption(maxUtterances, { min: 1 });
	const query = meetingTranscriptUtteranceQuery(database, session).selectAll();
	if (limit === void 0) return executeSqliteQuerySync(database, query.orderBy("sequence", "asc")).rows.map(utteranceFromRow);
	return executeSqliteQuerySync(database, query.orderBy("sequence", "desc").limit(limit)).rows.toReversed().map(utteranceFromRow);
}
function readStoredTranscriptSummary(database, session) {
	const row = executeSqliteQueryTakeFirstSync(database, meetingTranscriptDb(database).selectFrom("meeting_transcript_summaries").selectAll().where("session_id", "=", session.sessionId).where("session_started_at", "=", session.startedAt));
	if (!row) return {};
	const summary = summaryFromRow(row);
	return {
		...summary ? { summary } : {},
		...row.markdown !== null ? { markdown: row.markdown } : {}
	};
}
function readTranscriptJsonlDigest(database, session) {
	const query = meetingTranscriptUtteranceQuery(database, session).selectAll().orderBy("sequence", "asc");
	const digest = createHash("sha256");
	for (const row of iterateSqliteQuerySync(database, query)) digest.update(`${JSON.stringify(utteranceFromRow(row))}\n`);
	return digest.digest("hex");
}
//#endregion
//#region src/transcripts/store-worker-read.ts
/** Expected reader refusals retain their domain type; native failures use the shared codec. */
function executeTranscriptRead(target, command) {
	ensureMeetingTranscriptsSchema({
		...target,
		env: getSqliteWorkerStateContext().environment,
		readOnly: command.input.readOnly
	});
	const database = target.database.db;
	try {
		switch (command.type) {
			case "transcripts.canonicalSessionRow": return ok(readTranscriptCanonicalSessionRow(database, command.input.params.selector));
			case "transcripts.readEntries": return ok(queryTranscriptReadEntries(database, command.input.params, createPreparedTranscriptDateReader()));
			case "transcripts.exportOwnership": return ok(readTranscriptExportOwnership(database, command.input.params.session));
			case "transcripts.exportPathCollisions": return ok(readTranscriptExportPathCollisions(database, command.input.params.exportKey));
			case "transcripts.exportPathOwners": return ok(readTranscriptExportPathOwners(database, command.input.params.exportKey));
			case "transcripts.summarySnapshot": return ok(runSqliteDeferredTransactionSync(database, () => readTranscriptSummarySnapshot(database, command.input.params.session, command.input.params.maxUtterances)));
			case "transcripts.sessionEntries": return ok(runSqliteDeferredTransactionSync(database, () => readTranscriptSessionEntries(database)));
			case "transcripts.matches": return ok(runSqliteDeferredTransactionSync(database, () => readTranscriptSessionMatches(database, command.input.params.value)));
			case "transcripts.session": return ok(readTranscriptSessionByIdentity(database, command.input.params.session));
			case "transcripts.entry": return ok(readTranscriptEntry(database, command.input.params.selector, command.input.params.purpose));
			case "transcripts.latest": return ok(readLatestTranscriptEntry(database));
			case "transcripts.notes": return ok(readStoredTranscriptNotes(database, command.input.params.session, command.input.params.purpose));
			case "transcripts.libraryEntry": return ok(runSqliteDeferredTransactionSync(database, () => readTranscriptLibraryEntry(database, command.input.params)));
			case "transcripts.recentStopped": return ok(readRecentStoppedTranscriptSession(database, command.input.params.source, command.input.params.stoppedAfter, command.input.params.stoppedBefore));
			case "transcripts.summaryRevision": return ok(readTranscriptSummaryInputRevision(database, command.input.params.session));
			case "transcripts.utterances": return ok(readTranscriptUtterances(database, command.input.params.session, command.input.params.maxUtterances));
			case "transcripts.summary": return ok(readStoredTranscriptSummary(database, command.input.params.session));
			case "transcripts.exportDigest": return ok(readTranscriptJsonlDigest(database, command.input.params.session));
			default: throw new Error("Unknown transcript SQLite command");
		}
	} catch (error) {
		if (!(error instanceof TranscriptLibraryError)) throw error;
		return {
			ok: false,
			error: {
				type: error.type,
				message: error.message,
				maxBytes: error.maxBytes
			}
		};
	}
}
//#endregion
//#region src/transcripts/store-sqlite-write.ts
function assertMeetingTranscriptSelectorAvailableInDatabase(database, session, selector) {
	const owner = readTranscriptCanonicalSessionRow(database, selector);
	if (owner && (owner.session_id !== session.sessionId || owner.started_at !== session.startedAt)) throw new TranscriptSessionConflictError();
}
function writeMeetingTranscriptSessionInDatabase(database, params) {
	const { session, sessionValues, now, expectedInputRevision } = params;
	if (expectedInputRevision !== void 0 && readTranscriptSummaryInputRevision(database, session) !== expectedInputRevision) throw new TranscriptsSummaryChangedError();
	assertMeetingTranscriptSelectorAvailableInDatabase(database, session, sessionValues.selector);
	const previous = executeSqliteQueryTakeFirstSync(database, meetingTranscriptSessionQuery(database, session).selectAll());
	if (previous) {
		const admittedMetadata = sessionFromRow(previous).metadata;
		let metadata = parseOptionalJsonRecord(sessionValues.metadata_json);
		if (admittedMetadata && Object.hasOwn(admittedMetadata, "sessionIdOrigin")) metadata = {
			...metadata,
			sessionIdOrigin: admittedMetadata.sessionIdOrigin
		};
		else if (metadata) delete metadata.sessionIdOrigin;
		sessionValues.metadata_json = metadata ? JSON.stringify(metadata) : null;
	}
	executeSqliteQuerySync(database, meetingTranscriptDb(database).insertInto("meeting_transcript_sessions").values({
		session_id: session.sessionId,
		started_at: session.startedAt,
		...sessionValues,
		export_manifest_json: "{}",
		export_pending_json: "[]",
		next_utterance_seq: 0,
		created_at_ms: now,
		updated_at_ms: now
	}).onConflict((conflict) => conflict.columns(["session_id", "started_at"]).doUpdateSet({
		...sessionValues,
		updated_at_ms: now
	})));
}
function writeMeetingTranscriptSummaryInDatabase(database, session, summaryValues, guard) {
	if (guard) {
		const row = executeSqliteQueryTakeFirstSync(database, meetingTranscriptSessionQuery(database, session).selectAll());
		if (!row || guard.allowAppends && row.stopped_at !== null || row.next_utterance_seq < guard.nextSequence || transcriptSummaryInputRevisionFromRow({
			...row,
			...guard.allowAppends ? { next_utterance_seq: guard.nextSequence } : {}
		}) !== guard.inputRevision || (readStoredTranscriptSummaryRevision(database, session) ?? "") !== guard.summaryRevision) throw new TranscriptsSummaryChangedError();
	}
	executeSqliteQuerySync(database, meetingTranscriptDb(database).insertInto("meeting_transcript_summaries").values({
		session_id: session.sessionId,
		session_started_at: session.startedAt,
		...summaryValues
	}).onConflict((conflict) => conflict.columns(["session_id", "session_started_at"]).doUpdateSet(summaryValues)));
}
function updateMeetingTranscriptExportState(database, session, update) {
	const stored = readTranscriptExportOwnership(database, session);
	executeSqliteQuerySync(database, meetingTranscriptDb(database).updateTable("meeting_transcript_sessions").set(update(stored)).where("session_id", "=", session.sessionId).where("started_at", "=", session.startedAt));
}
function updateMeetingTranscriptExportManifestInDatabase(database, session, exportedHashes, removedExports) {
	updateMeetingTranscriptExportState(database, session, (stored) => {
		const manifest = stored ? parseTranscriptExportManifest(stored.export_manifest_json) : {};
		const pending = stored ? parseTranscriptPendingExports(stored.export_pending_json) : /* @__PURE__ */ new Set();
		for (const fileName of removedExports) delete manifest[fileName];
		for (const fileName of [...Object.keys(exportedHashes), ...removedExports]) pending.delete(fileName);
		return {
			export_manifest_json: JSON.stringify({
				...manifest,
				...exportedHashes
			}),
			export_pending_json: JSON.stringify([...pending].toSorted())
		};
	});
}
function markMeetingTranscriptPendingExportsInDatabase(database, session, fileNames) {
	updateMeetingTranscriptExportState(database, session, (stored) => {
		if (!stored) throw new Error(`transcripts session not found: ${session.sessionId}`);
		const pending = parseTranscriptPendingExports(stored.export_pending_json);
		for (const fileName of fileNames) pending.add(fileName);
		return { export_pending_json: JSON.stringify([...pending].toSorted()) };
	});
}
//#endregion
//#region src/transcripts/store-worker-write.ts
const operationLabels = {
	"transcripts.append": "meeting-transcripts.utterance.append",
	"transcripts.writeSummary": "meeting-transcripts.summary.write",
	"transcripts.writeSession": "meeting-transcripts.session.write",
	"transcripts.markPendingExports": "meeting-transcripts.export.pending",
	"transcripts.recordExportManifest": "meeting-transcripts.export.record"
};
function isTranscriptWriteCommand(command) {
	return Object.hasOwn(operationLabels, command.type);
}
function executeTranscriptWrite(command, target) {
	const options = {
		...target,
		env: getSqliteWorkerStateContext().environment,
		readOnly: command.input.readOnly
	};
	ensureMeetingTranscriptsSchema(options);
	try {
		runOpenClawStateWriteTransaction(({ db }) => {
			const lease = command.type === "transcripts.markPendingExports" || command.type === "transcripts.recordExportManifest" ? command.input.lease : void 0;
			const assertLease = () => {
				if (!lease) return;
				if (lease.scope !== "meeting-transcript.export" || lease.key !== transcriptSessionExportKey(command.input.session)) throw new Error("Transcript export lease does not match its session");
				assertOpenClawStateLeaseWorkerOwnedInTransaction(db, lease);
			};
			if (lease) assertLease();
			else requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: void 0
			});
			switch (command.type) {
				case "transcripts.append":
					appendMeetingTranscriptUtterance({
						...command.input,
						database: db
					});
					break;
				case "transcripts.writeSummary": {
					const { session, summaryValues, guard } = command.input;
					writeMeetingTranscriptSummaryInDatabase(db, session, summaryValues, guard);
					break;
				}
				case "transcripts.writeSession":
					writeMeetingTranscriptSessionInDatabase(db, command.input);
					break;
				case "transcripts.markPendingExports":
					markMeetingTranscriptPendingExportsInDatabase(db, command.input.session, command.input.fileNames);
					break;
				case "transcripts.recordExportManifest": updateMeetingTranscriptExportManifestInDatabase(db, command.input.session, command.input.exportedHashes, new Set(command.input.removedExports));
			}
			if (lease) assertLease();
			else requestSqliteWorkerOperationAdmission({
				stage: "commit",
				facts: void 0
			});
		}, options, { operationLabel: operationLabels[command.type] });
		return command.type === "transcripts.writeSummary" || command.type === "transcripts.writeSession" ? { ok: true } : void 0;
	} catch (error) {
		if ((command.type === "transcripts.writeSummary" || command.type === "transcripts.writeSession") && error instanceof TranscriptsSummaryChangedError) return {
			ok: false,
			reason: "changed"
		};
		if (command.type === "transcripts.writeSession" && error instanceof TranscriptSessionConflictError) return {
			ok: false,
			reason: "conflict"
		};
		throw error;
	}
}
//#endregion
//#region src/tui/tui-last-session.kernel.ts
function clearRetiredTuiPointers(stateKeys, retiredSessionKeys, options) {
	let cleared = 0;
	for (const stateKey of stateKeys) updateConfigMachineState(stateKey, (current) => {
		if (typeof current === "string" && retiredSessionKeys.has(current)) {
			cleared += 1;
			return;
		}
		return current;
	}, options);
	return cleared;
}
//#endregion
//#region src/state/backup-run-records.kernel.ts
/** The caller owns one transaction for both insertion and retention. */
function recordBackupRunInDatabase(db, row) {
	const kysely = getNodeSqliteKysely(db);
	executeSqliteQuerySync(db, kysely.insertInto("backup_runs").values(row));
	executeSqliteQuerySync(db, kysely.deleteFrom("backup_runs").where("id", "in", kysely.selectFrom("backup_runs").select("id").orderBy("created_at", "desc").orderBy("id", "desc").limit(2147483647).offset(200)));
}
//#endregion
//#region src/state/onboarding-recommendations.kernel.ts
function matchesExpectedOnboardingRecommendations(current, expected) {
	return current.inventoryHash === expected.inventoryHash && JSON.stringify(current.matches) === JSON.stringify(expected.matches) && current.offeredAt === expected.offeredAt && current.acceptedAt === expected.acceptedAt && current.updatedAt === expected.updatedAt;
}
function writeOnboardingRecommendationsOffer(configKey, params, databaseOptions = {}) {
	const nowMs = params.nowMs;
	const inventoryHash = params.inventoryHash;
	const matches = params.matches;
	const acceptedAt = params.answered ? nowMs : null;
	return updateConfigMachineState(configKey, (existing) => {
		if (typeof existing?.acceptedAt === "number") return existing;
		return {
			inventoryHash,
			matches,
			offeredAt: nowMs,
			acceptedAt,
			updatedAt: nowMs
		};
	}, databaseOptions);
}
function acknowledgeOnboardingRecommendations(configKey, params = {}, databaseOptions = {}) {
	const nowMs = params.nowMs ?? Date.now();
	let acknowledged = null;
	updateConfigMachineState(configKey, (existing) => {
		if (!existing) return;
		if (params.expected && !matchesExpectedOnboardingRecommendations(existing, params.expected)) return existing;
		acknowledged = typeof existing.acceptedAt === "number" ? existing : {
			...existing,
			acceptedAt: nowMs,
			updatedAt: nowMs
		};
		return acknowledged;
	}, databaseOptions);
	return acknowledged;
}
function updatePendingOnboardingRecommendations(configKey, params, databaseOptions = {}) {
	const nowMs = params.nowMs;
	const matches = params.matches;
	let updated = null;
	updateConfigMachineState(configKey, (existing) => {
		if (!existing || typeof existing.acceptedAt === "number" || !matchesExpectedOnboardingRecommendations(existing, params.expected)) return existing;
		updated = {
			...existing,
			matches,
			updatedAt: nowMs
		};
		return updated;
	}, databaseOptions);
	return updated;
}
function clearPendingOnboardingRecommendations(configKey, params, databaseOptions = {}) {
	let cleared = false;
	updateConfigMachineState(configKey, (existing) => {
		if (!existing || existing.acceptedAt !== null || !matchesExpectedOnboardingRecommendations(existing, params.expected)) return existing;
		cleared = true;
	}, databaseOptions);
	return cleared;
}
function executeOnboardingRecommendationCommand(command, database) {
	switch (command.type) {
		case "onboardingRecommendations.writeOffer": return writeOnboardingRecommendationsOffer(command.input.configKey, command.input.params, database);
		case "onboardingRecommendations.acknowledge": return acknowledgeOnboardingRecommendations(command.input.configKey, command.input.params, database);
		case "onboardingRecommendations.updatePending": return updatePendingOnboardingRecommendations(command.input.configKey, command.input.params, database);
		case "onboardingRecommendations.clearPending": return clearPendingOnboardingRecommendations(command.input.configKey, command.input.params, database);
		case "onboardingRecommendations.clear": return deleteConfigMachineState(command.input.configKey, database);
	}
	throw new Error("Unexpected onboarding recommendation write command");
}
//#endregion
//#region src/state/user-preferences.worker.ts
function executeUserPreferenceCommand(command, options) {
	ensureUserProfilesSchema(options);
	if (command.type === "userPreferences.write") {
		const { update } = command.input;
		if (update.serialized.length === 0 && update.deletionKeys.length === 0 && update.expected.length === 0) {
			const profile = selectResolvedUserProfileMetadataById(openOpenClawStateDatabase(options).db, command.input.profileId);
			return profile ? ok({ profileId: profile.id }) : void 0;
		}
		ensureUserPreferencesSchema(options);
		return runOpenClawStateWriteTransaction(({ db }) => {
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts: void 0
			});
			const profile = selectResolvedUserProfileMetadataById(db, command.input.profileId);
			if (!profile) return;
			const result = writeUserPreferences(db, profile.id, command.input.update);
			const facts = result.ok && updatesGitCoauthorPreference(update) ? {
				kind: "user-preference-coauthor",
				profileId: profile.id
			} : void 0;
			requestSqliteWorkerOperationAdmission({
				stage: "commit",
				facts
			});
			if (facts) deferSqliteWorkerCommitReceipt(db, facts);
			return result.ok ? ok({ profileId: profile.id }) : result;
		}, options, { operationLabel: "users.preferences.set" });
	}
	if (command.input.keys?.length !== 0) ensureUserPreferencesSchema(options);
	const { db } = openOpenClawStateDatabase(options);
	return runSqliteDeferredTransactionSync(db, () => {
		const profile = selectResolvedUserProfileMetadataById(db, command.input.profileId);
		return profile ? {
			profileId: profile.id,
			entries: readUserPreferences(db, profile.id, command.input.keys)
		} : void 0;
	});
}
//#endregion
//#region src/state/user-channel-identities.worker.ts
function readUserChannelIdentityResult(operation) {
	try {
		return {
			ok: true,
			value: operation()
		};
	} catch (error) {
		if (error instanceof UserChannelIdentityConflictError) return {
			ok: false,
			kind: "conflict"
		};
		if (error instanceof UserProfileNotFoundError) return {
			ok: false,
			kind: "not-found"
		};
		if (error instanceof UserProfileOwnerError) return {
			ok: false,
			kind: "owner",
			code: error.code
		};
		throw error;
	}
}
function executeUserChannelIdentityChange(input, options) {
	const subject = "identity" in input ? userChannelIdentitySubject(input.identity) : void 0;
	const facts = {
		kind: "channel-identity",
		action: input.action,
		subject,
		profiles: [],
		channels: subject === void 0 ? [] : [subject]
	};
	let changed = false;
	const mutationOptions = {
		...options,
		beforeChange() {
			changed = true;
			requestSqliteWorkerOperationAdmission({
				stage: "transaction",
				facts
			});
		}
	};
	if (input.action !== "policy") ensureUserProfilesSchema(options);
	return readUserChannelIdentityResult(() => runOpenClawStateWriteTransaction(({ db }) => {
		if (input.action === "policy" || input.action === "authorize") mutationOptions.beforeChange();
		if (input.action === "policy") Object.assign(facts, publishUserChannelPolicyInDatabase(db, input.policy, input.configuredOwnersHash));
		const value = input.action === "policy" ? { kind: "policy" } : input.action === "authorize" ? {
			kind: "authorized",
			reference: authorizeUserChannelIdentityInDatabase(db, input)
		} : input.action === "link" ? {
			kind: "linked",
			link: linkUserChannelIdentity(input.profileId, input.identity, mutationOptions)
		} : {
			kind: "unlinked",
			removed: unlinkUserChannelIdentity(input.profileId, input.identity, mutationOptions)
		};
		if (changed) {
			requestSqliteWorkerOperationAdmission({
				stage: "commit",
				facts
			});
			deferSqliteWorkerCommitReceipt(db, facts);
		}
		return value;
	}, options, { operationLabel: "user-profiles.channel-identity-change" }));
}
//#endregion
//#region src/state/user-profile-writes.worker.ts
function isUserProfileWriteCommand(command) {
	return command.type === "userProfiles.setRole" || command.type === "userProfiles.linkEmail" || command.type === "userProfiles.merge" || command.type === "userProfiles.ensureEmail" || command.type === "userProfiles.ensureTailscale" || command.type === "userProfiles.syncGitHub" || command.type === "userProfiles.ensureOwner";
}
function executeUserProfileWrite(command, options) {
	let pending;
	let sequence = 0;
	const committed = [];
	let linkedDisplay;
	const mutation = {
		runTransaction(db, operation) {
			if (pending) return operation();
			const current = {
				before: /* @__PURE__ */ new Map(),
				emailBindings: /* @__PURE__ */ new Map(),
				display: /* @__PURE__ */ new Set(),
				profiles: /* @__PURE__ */ new Set(),
				identities: /* @__PURE__ */ new Set()
			};
			pending = current;
			try {
				requestSqliteWorkerOperationAdmission({
					stage: "transaction",
					facts: {
						kind: "user-profile-write",
						operation: command.type
					}
				});
				const value = operation();
				if (command.type === "userProfiles.linkEmail" || command.type === "userProfiles.merge") {
					const linked = requireResolvedUserProfileMetadataById(db, command.input.targetProfileId);
					const row = selectProfileDisplayEntries(db, [linked.id])[0]?.[1];
					if (!row) throw new UserProfileNotFoundError(linked.id);
					linkedDisplay = projectUserProfileDisplay(row);
				}
				const afterBindings = new Map(readUserProfileEmailBindings(db, [...current.before.keys()]).map((binding) => [binding.email, binding]));
				const emailBindings = [.../* @__PURE__ */ new Set([...current.emailBindings.keys(), ...afterBindings.keys()])].flatMap((email) => {
					const before = current.emailBindings.get(email) ?? null;
					const after = afterBindings.get(email) ?? null;
					if (before?.profileId === after?.profileId && before?.bindingId === after?.bindingId) return [];
					for (const binding of [before, after]) if (binding) {
						current.display.add(binding.profileId);
						current.profiles.add(binding.profileId);
					}
					return [{
						email,
						before,
						after
					}];
				});
				const ids = [...current.display];
				const after = new Map(ids.length ? selectProfileDisplayEntries(db, ids) : []);
				const publication = {
					kind: "user-profile-mutation",
					sequence: ++sequence,
					changes: {
						profiles: [...current.profiles],
						identities: [...current.identities],
						channels: []
					},
					before: ids.map((id) => {
						if (!current.before.has(id)) throw new Error("Profile publication requires its transaction's original row");
						return [id, current.before.get(id)];
					}),
					after: ids.map((id) => [id, after.get(id)]),
					emailBindings
				};
				requestSqliteWorkerOperationAdmission({
					stage: "commit",
					facts: publication
				});
				deferSqlitePostCommitPublication(db, () => committed.push(publication));
				deferSqliteWorkerCommitReceipt(db, {
					kind: "user-profile-commits",
					publications: [...committed, publication]
				});
				return value;
			} finally {
				pending = void 0;
			}
		},
		before(db, ...ids) {
			const current = pending;
			if (!current) throw new Error("Profile mutation requires its original transaction");
			const missing = ids.filter((id) => !current.before.has(id));
			const rows = new Map(missing.length ? selectProfileDisplayEntries(db, missing) : []);
			for (const id of missing) current.before.set(id, rows.get(id));
			for (const binding of readUserProfileEmailBindings(db, missing)) if (!current.emailBindings.has(binding.email)) current.emailBindings.set(binding.email, binding);
		},
		authority: (...ids) => ids.forEach((id) => pending?.profiles.add(id)),
		identity: (...ids) => ids.forEach((id) => pending?.identities.add(id)),
		publish: (...ids) => ids.forEach((id) => pending?.display.add(id))
	};
	const owned = {
		...options,
		mutation
	};
	try {
		switch (command.type) {
			case "userProfiles.setRole": return {
				ok: true,
				value: setUserProfileRole(command.input.profileId, command.input.role, owned)
			};
			case "userProfiles.linkEmail": {
				const profile = linkEmail(command.input.email, command.input.targetProfileId, owned);
				if (!linkedDisplay) throw new Error("Linked profile publication is unavailable");
				return {
					ok: true,
					value: {
						profile,
						display: linkedDisplay
					}
				};
			}
			case "userProfiles.merge": {
				const result = mergeProfiles(command.input.sourceProfileId, command.input.targetProfileId, owned);
				if (!linkedDisplay) throw new Error("Merged profile publication is unavailable");
				return {
					ok: true,
					value: {
						...result,
						display: linkedDisplay
					}
				};
			}
			case "userProfiles.ensureEmail": return {
				ok: true,
				value: ensureProfileForEmail(command.input.email, {
					...owned,
					expectedGitHubAccountId: command.input.expectedGitHubAccountId
				})
			};
			case "userProfiles.ensureTailscale": return {
				ok: true,
				value: ensureProfileForTailscaleIdentity(command.input, owned)
			};
			case "userProfiles.syncGitHub": return {
				ok: true,
				value: syncGitHubIdentity(command.input, owned)
			};
			case "userProfiles.ensureOwner": return {
				ok: true,
				value: ensureGatewayOwnerProfile(command.input.displayName, owned)
			};
		}
		return command;
	} catch (error) {
		if (error instanceof UserProfileNotFoundError) return {
			ok: false,
			kind: "not-found",
			profileId: error.profileId
		};
		if (error instanceof UserProfileMergeError) return {
			ok: false,
			kind: "merge",
			message: error.message
		};
		if (error instanceof UserProfileOwnerError) return {
			ok: false,
			kind: "owner",
			code: error.code
		};
		throw error;
	}
}
//#endregion
//#region src/state/user-profiles.worker.ts
function executeUserProfileReadCommand(command, options) {
	if (command.type === "userProfiles.list") return listUserProfilesSync(options);
	const database = openOpenClawStateDatabase(options);
	ensureUserProfilesSchema(options, database);
	return runSqliteDeferredTransactionSync(database.db, () => {
		const profiles = executeSqliteQuerySync(database.db, userProfilesDb(database.db).selectFrom("user_profiles").select("id").where("merged_into", "is", null).orderBy("created_at", "asc").orderBy("id", "asc").limit(command.input.limit + 1)).rows;
		const selected = profiles.slice(0, command.input.limit);
		const identities = selectStoredGitHubIdentities(database.db, selected.map(({ id }) => id));
		return {
			profiles: selected.map(({ id }) => ({
				id,
				logins: identities.get(id)?.accounts.map((account) => account.login) ?? []
			})),
			truncated: profiles.length > command.input.limit
		};
	}, {
		databaseLabel: database.path,
		operationLabel: "user-profiles.directory"
	});
}
function executeUserProfileAvatarCommand(command, options) {
	if (command.type === "userProfiles.avatar.inspect") return inspectProfileAvatarInDatabase(openOpenClawStateDatabase(options).db, command.input.profileId);
	const { input } = command;
	const sha256 = createHash("sha256").update(input.bytes).digest("hex");
	return runOpenClawStateWriteTransaction(({ db }) => {
		const profile = selectResolvedUserProfileById(db, input.profileId);
		if (!profile) return { profile: void 0 };
		if (profile.avatar !== null) return { profile: toUserProfile(profile) };
		const before = selectProfileDisplayEntries(db, [profile.id])[0][1];
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: {
				kind: "profile-avatar",
				before
			}
		});
		executeSqliteQuerySync(db, userProfilesDb(db).updateTable("user_profiles").set({
			avatar: input.bytes,
			avatar_mime: input.mime,
			avatar_sha256: sha256,
			updated_at: input.now
		}).where("id", "=", profile.id));
		const committed = selectProfileDisplayEntries(db, [profile.id])[0][1];
		return {
			profile: toUserProfile({
				...profile,
				avatar_mime: input.mime,
				updated_at: input.now
			}),
			committed
		};
	}, options, { operationLabel: "user-profiles.adopt-avatar" });
}
function isUserProfileCommand(command) {
	return isUserProfileWriteCommand(command) || command.type === "userProfiles.list" || command.type === "userProfiles.directory" || command.type === "userProfiles.channelIdentity.change" || command.type === "userProfiles.avatar.inspect" || command.type === "userProfiles.avatar.adopt";
}
function executeUserProfileCommand(command, options) {
	if (isUserProfileWriteCommand(command)) return executeUserProfileWrite(command, options);
	if (command.type === "userProfiles.channelIdentity.change") return executeUserChannelIdentityChange(command.input, options);
	if (command.type === "userProfiles.list" || command.type === "userProfiles.directory") return executeUserProfileReadCommand(command, options);
	return executeUserProfileAvatarCommand(command, options);
}
//#endregion
//#region src/state/openclaw-state-worker-runtime.ts
const log = createSubsystemLogger("state/worker");
const loadPluginIndexWriter = createLazyRuntimeModule(() => import("./installed-plugin-index-store-write-ByQFu-oS.mjs"));
let pluginIndexWriter;
function prepareSharedStateCommand(type) {
	if (type === "plugins.metadata.sourceAdmission.publish" && !pluginIndexWriter) return loadPluginIndexWriter().then((loaded) => {
		pluginIndexWriter = loaded;
	});
	return prepareCronStateWorkerCommand(type);
}
function executeSharedStateCommand(command, context, open) {
	if (command.type === "deviceAuth.prepare") return;
	const stateOptions = () => ({
		path: context.databasePath,
		env: getSqliteWorkerStateContext().environment
	});
	if (isMcpOAuthWorkerCommand(command)) return executeMcpOAuthWorkerCommand(open(), command);
	if (command.type === "execApprovals.commitAuthorizations" || isOperatorApprovalCommand(command)) {
		const databaseOptions = {
			database: open(),
			...stateOptions()
		};
		return command.type === "execApprovals.commitAuthorizations" ? commitExecAuthorizationsInWorker(command.input, databaseOptions) : executeOperatorApprovalCommand(command, databaseOptions);
	}
	if (isDevicePairingMutationCommand(command)) return executeDevicePairingMutationInWorker(command, open());
	if (isWorkerInferenceStoreCommand(command)) return executeWorkerInferenceStoreCommand(command, open());
	if (isPlacementTurnClaimCommand(command)) return executePlacementTurnClaimCommand(command, open());
	if (isWorkerEnvironmentCommand(command)) return executeWorkerEnvironmentCommand(command, open());
	if (command.type === "workerPlacements.startDispatch") return startWorkerPlacementDispatchInWorker(command.input, open());
	if (command.type === "audit.events.list") return listAuditEventsInDatabase(open().db, command.input);
	if (command.type === "conversationBindings.readSelection") return readSelection(command.input, context.databasePath);
	if (command.type === "audit.writer.process" || command.type === "audit.writer.prune") return executeAuditWriterCommand(command, stateOptions(), open);
	if (command.type === "authProfiles.read" || command.type === "authProfiles.sharedOwnership" || command.type === "authProfiles.personal") {
		const read = () => {
			const options = stateOptions();
			if (command.type === "authProfiles.sharedOwnership") return readConfigMachineState(SHARED_AUTH_STORE_STATE_KEY, options);
			if (command.type === "authProfiles.personal") return readUserModelAuthProfile(command.input.profileId, options);
			const missing = {
				store: {
					status: "missing",
					reason: "database"
				},
				state: {
					status: "missing",
					reason: "database"
				},
				cacheable: false
			};
			try {
				return withExistingOpenClawStateDatabaseReadOnly(({ db }) => readAuthProfileRows(db, context.databasePath, "shared-state"), options) ?? missing;
			} catch {
				return isMissingDatabasePath(context.databasePath) ? missing : {
					store: { status: "unreadable" },
					state: { status: "unreadable" },
					cacheable: false
				};
			}
		};
		return command.input.artifactPreserving ? withArtifactPreservingStateReads(read) : read();
	}
	if (command.type === "promotions.markNotified" || command.type === "promotions.recordClaim") return executePromotionCommand(command, stateOptions(), open);
	if (command.type === "doctor.databaseBloat") return readSqliteDatabaseBloat(stateOptions());
	if (command.type === "telemetry.readState") return readTelemetryStateInWorker(stateOptions());
	if (command.type === "telemetry.countRecentSessions") return withExistingOpenClawStateDatabaseReadOnly(({ db }) => countRecentTelemetrySessionsInDatabase(db, command.input.sinceMs), stateOptions()) ?? 0;
	if (command.type === "webPush.readPersistedVapidKeyPair") return readPersistedVapidKeyPairInDatabase(stateOptions());
	if (isWebPushCommand(command)) return executeWebPushCommand(command, open());
	if (command.type === "nativeHookRelay.read") return withOpenClawStateDatabaseReadOnly((database) => readNativeHookRelayBridgeSnapshotFromDatabase({
		database,
		relayId: command.input.relayId
	})?.record, stateOptions());
	if (command.type === "doctor.workshopMigrationRecords.read") return withExistingOpenClawStateDatabaseArtifactPreservingReadOnly(({ db }) => readWorkshopMigrationRecordsInDatabase(db, command.input.includeEvents), stateOptions());
	if (command.type === "modelCatalog.remote.read") {
		const read = () => readRemoteModelCatalog(stateOptions());
		return command.input.artifactPreservingReadOnly ? withArtifactPreservingStateReads(read) : read();
	}
	if (command.type === "acp.prepareMutation" || command.type === "acp.commitMutation") return executeAcpSessionMutationInWorker(open(), command);
	if (command.type === "plugins.conversationBindingApprovals.read") return readPluginBindingApprovalsInDatabase(open().db);
	if (command.type === "plugins.conversationBindingApprovals.upsert") {
		const database = open();
		return runOpenClawStateWriteTransaction(({ db }) => upsertPluginBindingApprovalInDatabase(db, command.input), {
			database,
			path: context.databasePath,
			env: getSqliteWorkerStateContext().environment
		});
	}
	if (command.type === "updateRuns.reconcile") return reconcileUpdateRunCandidatesInWorker(command.input, stateOptions(), (stage) => requestSqliteWorkerOperationAdmission({
		stage,
		facts: void 0
	}));
	if (command.type === "updateRuns.reconcileInterrupted") return persistInterruptedUpdateObservation(command.input, stateOptions(), (stage) => requestSqliteWorkerOperationAdmission({
		stage,
		facts: void 0
	}));
	if (command.type === "plugins.deferredMigrations.read" || command.type === "plugins.deferredMigrations.completions.read") return readDeferredPluginMigrationsInWorker(command, stateOptions());
	if (command.type === "claws.install-schema-versions") return (command.input.artifactPreservingReadOnly ? withExistingOpenClawStateDatabaseArtifactPreservingReadOnly : withExistingOpenClawStateDatabaseReadOnly)(({ db, path: pathname }) => {
		assertOpenClawStateDatabaseOwner(db, { pathname });
		return readClawInstallSchemaVersionRows(db);
	}, stateOptions());
	if (command.type === "database.generationMatches") return sameSqliteFileGeneration(command.input.generation, readStableSqliteFileGeneration(context.databasePath));
	if (isOnboardingRecommendationWriteCommand(command)) return executeOnboardingRecommendationCommand(command, {
		database: open(),
		...stateOptions()
	});
	if (command.type === "userPreferences.read" || command.type === "userPreferences.write") return executeUserPreferenceCommand(command, {
		database: open(),
		...stateOptions()
	});
	if (isUserProfileCommand(command)) return executeUserProfileCommand(command, {
		database: open(),
		...stateOptions()
	});
	if (isPluginBlobWorkerCommand(command)) return executePluginBlobCommand(command, context.databasePath, open);
	if (command.type === "config.health.read") return (command.input.artifactPreserving ? withExistingOpenClawStateDatabaseArtifactPreservingReadOnly : withExistingOpenClawStateDatabaseReadOnly)(({ db }) => readConfigHealthSnapshotInDatabase(db), stateOptions()) ?? {
		state: {},
		basis: {}
	};
	if (isNodeWorkerJournalCommand(command)) return executeNodeWorkerJournalCommand(command, context.databasePath, open);
	if (isChannelIngressCommand(command)) return executeChannelIngressCommand(command, {
		path: context.databasePath,
		env: getSqliteWorkerStateContext().environment
	}, open);
	if (command.type === "deviceAuth.read" || command.type === "deviceAuth.readOrigin") {
		const read = (db) => command.type === "deviceAuth.read" ? readDeviceAuthTokenObservationFromDatabase(db, command.input) : readOriginDeviceTokenObservationFromDatabase(db, command.input);
		return command.input.readOnly ? withExistingOpenClawStateDatabaseArtifactPreservingReadOnly(({ db }) => read(db), stateOptions()) ?? {
			entry: null,
			expectedToken: null
		} : read(open().db);
	}
	const database = open();
	if (command.type === "githubRepository.personalPending") return readPendingRepositoryGitHubPublicationInDatabase(database.db, command.input);
	if (isSkillWorkshopCommand(command)) return executeSkillWorkshopCommand(command, database, context.databasePath);
	if (command.type === "deviceAuth.list") return readDeviceAuthTokensFromDatabase(database.db, command.input);
	if (isTranscriptWriteCommand(command)) return executeTranscriptWrite(command, {
		database,
		path: context.databasePath
	});
	switch (command.type) {
		case "transcripts.canonicalSessionRow":
		case "transcripts.readEntries":
		case "transcripts.exportOwnership":
		case "transcripts.exportPathCollisions":
		case "transcripts.exportPathOwners":
		case "transcripts.sessionEntries":
		case "transcripts.matches":
		case "transcripts.session":
		case "transcripts.entry":
		case "transcripts.latest":
		case "transcripts.notes":
		case "transcripts.libraryEntry":
		case "transcripts.recentStopped":
		case "transcripts.summaryRevision":
		case "transcripts.summarySnapshot":
		case "transcripts.utterances":
		case "transcripts.exportDigest":
		case "transcripts.summary": return executeTranscriptRead({
			database,
			path: context.databasePath
		}, command);
	}
	if (isManagedImageRecordCommand(command)) return executeManagedImageRecordCommand(command, database);
	if (isApnsRegistrationWorkerCommand(command)) return executeApnsRegistrationCommand(command, database);
	if (command.type === "plugins.catalogSnapshot.read") return readHostedCatalogSnapshotInDatabase(database.db, command.input.url);
	if (command.type === "nativeHookRelay.listSnapshots") return listNativeHookRelayBridgeSnapshotsInDatabase(database);
	if (command.type === "sessionUpstream.listWatched") return listWatchedSessionUpstreamLinksInDatabase(database.db);
	if (isCronStateWorkerCommand(command)) return executeCronStateCommand(command, database);
	if (isSessionDeliveryCommand(command)) return executeSessionDeliveryCommand(command, database);
	const writeOptions = {
		database,
		...stateOptions()
	};
	if (command.type === "plugins.deferredMigrations.record") return recordDeferredPluginMigrationsInWorker(command.input, writeOptions);
	if (command.type === "nativeHookRelay.write" || command.type === "nativeHookRelay.renew" || command.type === "nativeHookRelay.deleteOwned" || command.type === "nativeHookRelay.prune") return executeNativeHookRelayMutation(command, writeOptions);
	if (command.type === "tui.lastSession.write") return writeConfigMachineState(command.input.stateKey, command.input.sessionKey, writeOptions);
	if (command.type === "tui.lastSession.clear") return clearRetiredTuiPointers(command.input.stateKeys, new Set(command.input.retiredSessionKeys), writeOptions);
	if (command.type === "sandboxRegistry.insertIfMissing") return importSandboxRegistryRow(command.input, writeOptions);
	if (command.type === "workspace.replaceAttestation") return runOpenClawStateWriteTransaction((writer) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const result = replaceWorkspaceAttestationInDatabase(writer, command.input);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return result;
	}, writeOptions);
	if (command.type === "sandboxRegistry.write") return writeSandboxRegistry(command.input, writeOptions);
	if (command.type === "secrets.purge") return purgeExpiredSecretStoreEntriesInDatabase(command.input, writeOptions);
	if (command.type === "secrets.writeForConfigRef") return writeSecretStoreEntryForConfigRefInDatabase(command.input, writeOptions, (stage) => requestSqliteWorkerOperationAdmission({
		stage,
		facts: void 0
	}));
	if (isWriteCommand(command)) return executeCommand(command, writeOptions);
	if (command.type === "sessionGroups.mutate") return mutateSessionGroupCatalogInDatabase(database, command.input, writeOptions.env);
	if (isDeliveryQueueCommand(command)) return executeDeliveryQueueCommand(command, writeOptions);
	if (isSkillUploadCommand(command)) return executeSkillUploadCommand(command, writeOptions);
	if (command.type === "deviceAuth.store" || command.type === "deviceAuth.storeOrigin" || command.type === "deviceAuth.clear" || command.type === "deviceAuth.clearOrigin") return runOpenClawStateWriteTransaction(({ db }) => {
		requestSqliteWorkerOperationAdmission({
			stage: "transaction",
			facts: void 0
		});
		const result = command.type === "deviceAuth.store" ? storeDeviceAuthTokenInDatabase(db, command.input) : command.type === "deviceAuth.storeOrigin" ? storeOriginDeviceTokenInDatabase(db, command.input) : command.type === "deviceAuth.clear" ? clearDeviceAuthTokenFromDatabase(db, command.input) : clearOriginDeviceTokenInDatabase(db, command.input);
		requestSqliteWorkerOperationAdmission({
			stage: "commit",
			facts: void 0
		});
		return result;
	}, writeOptions);
	if (command.type === "fleet.cell.reserve" || command.type === "fleet.cell.updateImage" || command.type === "fleet.cell.delete" || command.type === "fleet.operation.acquire" || command.type === "fleet.operation.heartbeat" || command.type === "fleet.operation.release") return executeFleetRegistryCommand(command, writeOptions);
	if (command.type === "agentProvenance.readBatch" || command.type === "agentProvenance.list") {
		ensureAgentProvenanceSchema(writeOptions);
		return command.type === "agentProvenance.readBatch" ? readAgentProvenanceBatchInDatabase(database.db, command.input.agentIds) : listAgentProvenanceInDatabase(database.db);
	}
	if (command.type === "telemetry.persistSuccess") return runOpenClawStateWriteTransaction(({ db }) => persistTelemetrySuccessInDatabase(db, command.input.state, command.input.updatedAtMs), writeOptions, { operationLabel: "config-machine-state.update" });
	if (command.type === "sessionState.record" || command.type === "sessionState.prune") return executeSessionStateCommand(command, writeOptions);
	if (command.type === "plugins.catalogSnapshot.write") try {
		runOpenClawStateWriteTransaction(({ db }) => writeHostedCatalogSnapshotInDatabase(db, command.input.snapshot, command.input.now), writeOptions);
		return { ok: true };
	} catch (error) {
		if (error instanceof HostedCatalogSignedFeedMonotonicityError) return {
			ok: false,
			message: error.message
		};
		throw error;
	}
	if (command.type === "plugins.metadata.sourceAdmission.publish") {
		if (!pluginIndexWriter) throw new Error("Plugin source admission writer is not prepared");
		const { publishPluginSourceAdmissionInDatabase } = pluginIndexWriter;
		return runOpenClawStateWriteTransaction(({ db }) => publishPluginSourceAdmissionInDatabase(db, command.input), writeOptions);
	}
	if (command.type === "subagents.persistChanges") {
		const { writeId, values, deleteRunIds } = command.input;
		let committed = false;
		try {
			runOpenClawStateWriteTransaction((writer) => {
				requestSqliteWorkerOperationAdmission({
					stage: "transaction",
					facts: writeId
				});
				writeSubagentRunValuesInDatabase(writer, values, deleteRunIds);
				requestSqliteWorkerOperationAdmission({
					stage: "commit",
					facts: writeId
				});
				deferSqlitePostCommitPublication(writer.db, () => {
					committed = true;
				});
			}, writeOptions);
		} catch (error) {
			if (!committed) throw error;
			log.warn("Subagent registry write committed before cleanup failed", { error });
		}
		return { writeId };
	}
	if (command.type === "backup.recordOutcome") return runOpenClawStateWriteTransaction(({ db }) => recordBackupRunInDatabase(db, command.input), writeOptions);
	if (isWorktreeWorkerCommand(command)) return executeWorktreeWorkerCommand(command, writeOptions);
	if (isProjectRegistryCommand(command)) return executeProjectRegistryCommand(command, writeOptions);
	if (command.type === "config.health.patch") {
		const { configPath, patch, expected, updatedAtMs } = command.input;
		return runOpenClawStateWriteTransaction(({ db }) => {
			return patchConfigHealthEntryInDatabase(db, configPath, patch, expected, updatedAtMs);
		}, writeOptions);
	}
	if (command.type === "diagnostic.register") {
		const { scope, maxEntries, record } = command.input;
		return runOpenClawStateWriteTransaction(({ db }) => {
			createSqliteAuditRecordKernel(db, {
				scope,
				maxEntries
			}).register(record);
		}, writeOptions);
	}
	if (command.type === "config.snapshot.upsert") return runOpenClawStateWriteTransaction(({ db }) => upsertConfigSnapshotAuditRecordInDatabase(db, command.input), writeOptions);
	throw new Error("Unknown shared-state SQLite command");
}
//#endregion
export { executeSharedStateCommand, prepareSharedStateCommand };
