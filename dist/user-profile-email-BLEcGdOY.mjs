import { t as executeExistingOpenClawStateRead } from "./openclaw-state-db-readonly-DE3MB0wy.mjs";
import { r as captureOpenClawStateWorkerContext } from "./openclaw-state-worker-context-C_iAE7YK.mjs";
import { n as normalizeProfileEmail } from "./user-profile-email.kernel-CYKBP8yI.mjs";
//#region src/state/user-profile-email.ts
/** Legacy email authentication keeps creation with the existing profile owner. */
async function ensureProfileIdForEmail(email, options = {}, assertCurrent) {
	assertCurrent?.();
	const normalized = normalizeProfileEmail(email);
	const context = captureOpenClawStateWorkerContext(options);
	const selected = {
		...options,
		path: context.admission.databasePath
	};
	const observed = await executeExistingOpenClawStateRead(selected, {
		type: "userProfiles.email.resolve",
		email: normalized
	});
	context.admission.assertCurrent();
	assertCurrent?.();
	if (observed && (!observed.ok || observed.type !== "userProfiles.email.resolve")) throw new Error("Unexpected profile email lookup reply");
	if (observed?.profileId) return observed.profileId;
	const { ensureCanonicalUserProfileForEmail } = await import("./user-profile-writes-aQybjyTt.mjs");
	return (await ensureCanonicalUserProfileForEmail(normalized, {
		...selected,
		assertCurrent: () => {
			context.admission.assertCurrent();
			assertCurrent?.();
		}
	})).id;
}
//#endregion
export { ensureProfileIdForEmail as t };
