import { i as enqueueSystemEvent } from "./system-events-DzT7qucG.mjs";
import { o as resolveFreshSessionTotalTokens } from "./types-DBHkhm7j.mjs";
import { c as loadSessionEntryReadOnly } from "./session-accessor.sqlite-entry-C87Sde4p.mjs";
import "./session-accessor-CGLseszP.mjs";
import { F as waitForEmbeddedAgentRunEnd, l as isEmbeddedAgentRunAbortableForCompaction, n as abortEmbeddedAgentRun } from "./runs-BSJKmITf.mjs";
import { t as formatTokenCount } from "./token-format-BC2cCie2.mjs";
import "./sessions-Db5eEwNA.mjs";
import { n as compactEmbeddedAgentSession } from "./embedded-agent-DsCaQmKI.mjs";
import { n as incrementCompactionCount } from "./session-updates-DGvm2oEw.mjs";
import { n as formatContextUsageShort } from "./status-message-DahAa5sW.mjs";
import "./status-CPp57hm-.mjs";
//#region src/auto-reply/reply/commands-compact.runtime.ts
function resolveCurrentSessionEntry(params) {
	const current = loadSessionEntryReadOnly(params);
	return current?.sessionId === params.expected.sessionId && current.lifecycleRevision === params.expected.lifecycleRevision ? current : void 0;
}
//#endregion
export { abortEmbeddedAgentRun, compactEmbeddedAgentSession, enqueueSystemEvent, formatContextUsageShort, formatTokenCount, incrementCompactionCount, isEmbeddedAgentRunAbortableForCompaction, resolveCurrentSessionEntry, resolveFreshSessionTotalTokens, waitForEmbeddedAgentRunEnd };
