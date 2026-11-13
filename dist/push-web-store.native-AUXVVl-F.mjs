import { i as runWithSqliteWorkerStateContext } from "./sqlite-worker-state-context-KkU943i2.mjs";
import { r as openOpenClawStateDatabase } from "./openclaw-state-db-DM-mSY0m.mjs";
import { h as upsertWebPushSubscriptionInDatabase, m as setWebPushSubscriptionPreferencesInDatabase, t as deleteBoundWebPushSubscriptionInDatabase } from "./push-web-store.kernel-tQgaKGvg.mjs";
//#region src/infra/push-web-store.native.ts
function withNativeWebPushDatabase(context, operation) {
	context.admission.assertCurrent();
	return runWithSqliteWorkerStateContext(context, () => operation(openOpenClawStateDatabase({
		path: context.admission.databasePath,
		env: context.environment
	})));
}
function setNativeWebPushSubscriptionPreferences(params, context) {
	return withNativeWebPushDatabase(context, (database) => setWebPushSubscriptionPreferencesInDatabase({
		...params,
		database
	}));
}
function upsertNativeWebPushSubscription(params, context) {
	return withNativeWebPushDatabase(context, (database) => upsertWebPushSubscriptionInDatabase({
		...params,
		database
	}));
}
function deleteNativeBoundWebPushSubscription(params, context) {
	return withNativeWebPushDatabase(context, (database) => deleteBoundWebPushSubscriptionInDatabase({
		...params,
		database
	}));
}
//#endregion
export { deleteNativeBoundWebPushSubscription, setNativeWebPushSubscriptionPreferences, upsertNativeWebPushSubscription };
