//#region src/shared/google-turn-ordering.ts
const GOOGLE_TURN_ORDER_BOOTSTRAP_TEXT = "(session bootstrap)";
/** Add a synthetic user bootstrap when Google-style providers receive assistant-first turns. */
function sanitizeGoogleAssistantFirstOrdering(messages) {
	if (messages[0]?.role !== "assistant") return messages;
	return [{
		role: "user",
		content: GOOGLE_TURN_ORDER_BOOTSTRAP_TEXT,
		timestamp: Date.now()
	}, ...messages];
}
//#endregion
export { sanitizeGoogleAssistantFirstOrdering as t };
