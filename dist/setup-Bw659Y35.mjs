import "./utils-DUAwk2p5.mjs";
import "./types.secrets-BXEuin38.mjs";
import "./session-key-BC4m_Ly5.mjs";
import "./detect-binary-CYArgZQe.mjs";
import "./setup-helpers-BOexW8HC.mjs";
import "./setup-wizard-helpers-Xm-xALzN.mjs";
import "./setup-credential-CNudvpDC.mjs";
//#region src/plugin-sdk/resolution-notes.ts
/** Format a short note that separates successfully resolved targets from unresolved passthrough values. */
function formatResolvedUnresolvedNote(params) {
	if (params.resolved.length === 0 && params.unresolved.length === 0) return;
	return [params.resolved.length > 0 ? `Resolved: ${params.resolved.join(", ")}` : void 0, params.unresolved.length > 0 ? `Unresolved (kept as typed): ${params.unresolved.join(", ")}` : void 0].filter(Boolean).join("\n");
}
//#endregion
export { formatResolvedUnresolvedNote as t };
