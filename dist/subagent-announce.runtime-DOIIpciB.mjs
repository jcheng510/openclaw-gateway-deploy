import "./config-D1R2igem.mjs";
import { s as loadSessionEntry } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import "./runs-BSJKmITf.mjs";
import "./sessions-Db5eEwNA.mjs";
import { t as bindGatewayLifecycleRequest } from "./server-recovery-runtime-context-4f6dl75P.mjs";
import "./server-plugin-in-process-dispatch-B5twfTO5.mjs";
import "./session-transcript-readers-DuU1dcaM.mjs";
//#region src/agents/subagents/announce/subagent-announce.runtime.ts
/**
* Runtime dependency barrel for subagent announcement/output collection.
*
* Keeping these imports behind one module lets tests replace gateway/session
* IO without changing the announce logic itself.
*/
function readSubagentSessionEntry(storePath, sessionKey) {
	return loadSessionEntry({
		storePath,
		sessionKey
	});
}
const callSubagentLifecycleGateway = (request) => bindGatewayLifecycleRequest()(request);
//#endregion
export { readSubagentSessionEntry as n, callSubagentLifecycleGateway as t };
