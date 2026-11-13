import { t as openNodeSqliteDatabase } from "./node-sqlite-B4hwsR7e.mjs";
import { f as withSqliteInspectionOperation } from "./sqlite-error-diagnostics-XVtvbiXE.mjs";
import { i as assertStateDatabaseAccessAllowed } from "./gateway-state-owner-CPG45dwV.mjs";
//#region src/infra/sqlite-source-handle.ts
const unclosedSourceReads = /* @__PURE__ */ new Set();
/** Closing a source in its writer's process can release that writer's POSIX locks. */
function withSqliteSourceReadDatabase(pathname, inspectionOperation, operation) {
	assertStateDatabaseAccessAllowed(pathname);
	const database = withSqliteInspectionOperation(inspectionOperation, () => openNodeSqliteDatabase(pathname, { readOnly: true }));
	try {
		assertStateDatabaseAccessAllowed(pathname);
		return operation(database);
	} finally {
		try {
			database.close();
		} finally {
			if (database.isOpen) unclosedSourceReads.add(database);
		}
	}
}
//#endregion
export { withSqliteSourceReadDatabase as t };
