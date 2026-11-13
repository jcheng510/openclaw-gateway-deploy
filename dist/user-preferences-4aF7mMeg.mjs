import { c as isRecord } from "./record-coerce-TIsquoVR.mjs";
import { n as ok, t as err } from "./result-BQGgYouL.mjs";
import { n as createSqliteWorkerOperationAdmission } from "./sqlite-worker-operation-admission-BB758RIN.mjs";
import { t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { l as runOpenClawStateWriteTransaction, r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { a as runOpenClawStateWorkerOperation, n as executeOpenClawStateWorker } from "./openclaw-state-worker-store-DwGcGmZn.mjs";
import "./user-profile-constants-DfyZS95p.mjs";
import { F as fenceUserProfileMutationAuthority } from "./user-profiles-internal-Co87Y1ZN.mjs";
import { A as readUserPreferences, M as writeUserPreferences, N as beginUserPreferenceMutation, O as ensureUserPreferencesSchema, P as captureUserPreferenceRead, j as updatesGitCoauthorPreference } from "./user-profile-list-y7DDikZX.mjs";
import { isDeepStrictEqual } from "node:util";
//#region src/state/user-preferences.validation.ts
function prepareEntries(entries) {
	const rawEntries = Object.entries(entries);
	if (rawEntries.length > 32) return err({ code: "invalid-entry-count" });
	const serialized = [];
	const deletionKeys = [];
	for (const [prefKey, value] of rawEntries) {
		if (!prefKey || prefKey.length > 256) return err({
			code: "invalid-key",
			key: prefKey
		});
		if (value === null) {
			deletionKeys.push(prefKey);
			continue;
		}
		let valueJson;
		try {
			valueJson = JSON.stringify(value);
		} catch {
			return err({
				code: "invalid-value",
				key: prefKey
			});
		}
		if (valueJson === void 0) return err({
			code: "invalid-value",
			key: prefKey
		});
		if (Buffer.byteLength(valueJson, "utf8") > 4096) return err({
			code: "value-too-large",
			key: prefKey
		});
		serialized.push({
			prefKey,
			valueJson
		});
	}
	return ok({
		serialized,
		deletionKeys
	});
}
function prepareUserPreferenceUpdate(entries, expectedEntries = {}) {
	const prepared = prepareEntries(entries);
	if (!prepared.ok) return prepared;
	const expected = prepareEntries(expectedEntries);
	if (!expected.ok) return expected;
	return ok({
		...prepared.value,
		expected: [...expected.value.serialized, ...expected.value.deletionKeys.map((prefKey) => ({
			prefKey,
			valueJson: null
		}))]
	});
}
//#endregion
//#region src/state/user-preferences.ts
function getUserPreferences(profileId, keys, options = {}) {
	if (keys?.length === 0) return {};
	ensureUserPreferencesSchema(options);
	return readUserPreferences(openOpenClawStateDatabase(options).db, profileId, keys);
}
/** Read one preference for a canonical profile batch without opening SQLite on the caller. */
async function getUserPreferenceValues(profileIds, key, options = {}) {
	if (profileIds.length === 0) return {
		values: /* @__PURE__ */ new Map(),
		isCurrent: () => true
	};
	const ids = [...new Set(profileIds)];
	const context = captureOpenClawStateWorkerContext(options);
	const isCurrent = await captureUserPreferenceRead(context.admission);
	const reply = await executeExistingOpenClawStateRead({
		path: context.admission.databasePath,
		env: context.environment
	}, {
		type: "userPreferences.values",
		profileIds: ids,
		key
	}, {
		context,
		current: true
	});
	if (reply && (!reply.ok || reply.type !== "userPreferences.values")) throw new Error(reply.ok ? "Unexpected user preference values reply" : reply.message);
	return {
		values: reply?.values ?? /* @__PURE__ */ new Map(),
		isCurrent
	};
}
function setUserPreferences(profileId, entries, options = {}) {
	const prepared = prepareUserPreferenceUpdate(entries, options.expectedEntries);
	if (!prepared.ok) return prepared;
	if (prepared.value.serialized.length === 0 && prepared.value.deletionKeys.length === 0 && prepared.value.expected.length === 0) return ok(void 0);
	ensureUserPreferencesSchema(options);
	return runOpenClawStateWriteTransaction(({ db }) => writeUserPreferences(db, profileId, prepared.value), options, { operationLabel: "users.preferences.set" });
}
function getCanonicalUserPreferences(profileId, keys, options = {}) {
	return executeOpenClawStateWorker(captureOpenClawStateWorkerContext(options), {
		type: "userPreferences.read",
		input: {
			profileId,
			keys
		}
	});
}
async function setCanonicalUserPreferences(profileId, entries, options = {}) {
	const prepared = prepareUserPreferenceUpdate(entries, options.expectedEntries);
	if (!prepared.ok) return prepared;
	const context = captureOpenClawStateWorkerContext(options);
	const finishMutation = beginUserPreferenceMutation(context.admission);
	let publicationSettled;
	try {
		return await runOpenClawStateWorkerOperation(context, (scope) => scope.execute({
			type: "userPreferences.write",
			input: {
				profileId,
				update: prepared.value
			}
		}), {
			assertCurrent: options.assertCurrent,
			createAdmission: (operation) => {
				let stage = "transaction";
				let pending;
				const admission = createSqliteWorkerOperationAdmission((request, grant) => {
					context.admission.assertCurrent();
					options.assertCurrent?.();
					if (stage === "transaction" && request.stage === "transaction" && request.facts === void 0) {
						stage = "commit";
						grant();
						return;
					}
					if (stage !== "commit" || request.stage !== "commit") throw new Error("Profile preference mutation requires transaction admission");
					stage = "complete";
					if (request.facts === void 0) {
						grant();
						return;
					}
					if (!updatesGitCoauthorPreference(prepared.value) || !isRecord(request.facts) || request.facts.kind !== "user-preference-coauthor" || typeof request.facts.profileId !== "string" || request.facts.profileId.length === 0) throw new Error("Profile preference mutation returned invalid authority facts");
					const facts = {
						kind: "user-preference-coauthor",
						profileId: request.facts.profileId
					};
					pending = {
						facts,
						fence: fenceUserProfileMutationAuthority(context.admission, {
							profiles: [facts.profileId],
							identities: [],
							channels: []
						}),
						granted: false
					};
					pending.granted = grant();
				});
				publicationSettled = operation.settled.then((settlement) => {
					let committed = false;
					let receiptValid = false;
					try {
						const receipt = admission.committed;
						if (receipt) {
							if (!pending || !isDeepStrictEqual(receipt.facts, pending.facts)) throw new Error("Profile preference receipt changed its prepared mutation");
							committed = true;
						}
						receiptValid = true;
					} finally {
						pending?.fence.settle(!pending.granted || committed || receiptValid && settlement.kind === "completed");
					}
				});
				publicationSettled.catch(() => void 0);
				return {
					admission,
					nativeLocations: [context.admission.databasePath]
				};
			}
		});
	} finally {
		try {
			await publicationSettled;
		} finally {
			finishMutation();
		}
	}
}
//#endregion
export { setUserPreferences as a, setCanonicalUserPreferences as i, getUserPreferenceValues as n, getUserPreferences as r, getCanonicalUserPreferences as t };
