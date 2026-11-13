//#region src/gateway/session-method-policy.ts
const SESSION_TARGET_POLICY_BY_METHOD = /* @__PURE__ */ new Map([
	["skills.library.activate", {
		fields: ["sessionKey"],
		required: true
	}],
	["agent", {
		fields: ["sessionKey"],
		runStart: true
	}],
	["board.event", {
		fields: ["sessionKey"],
		required: true
	}],
	["board.update", {
		fields: ["sessionKey"],
		required: true
	}],
	["board.widget.grant", {
		fields: ["sessionKey"],
		required: true
	}],
	["board.widget.put", {
		fields: ["sessionKey"],
		required: true
	}],
	["chat.abort", {
		fields: ["sessionKey"],
		required: true
	}],
	["chat.inject", {
		fields: ["sessionKey"],
		required: true
	}],
	["chat.send", {
		fields: ["sessionKey"],
		required: true,
		runStart: true
	}],
	["mcp.app.callTool", {
		fields: ["sessionKey"],
		required: true
	}],
	["mcp.app.updateModelContext", {
		fields: ["sessionKey"],
		required: true
	}],
	["message.action", {
		fields: ["sessionKey"],
		runStart: true
	}],
	["plugins.sessionAction", { fields: ["sessionKey"] }],
	["progressCard.get", {
		fields: ["sessionKey"],
		required: true
	}],
	["progressCard.put", {
		fields: ["sessionKey"],
		required: true
	}],
	["progressCard.refresh", {
		fields: ["sessionKey"],
		required: true,
		runStart: true
	}],
	["send", {
		fields: ["sessionKey"],
		runStart: true
	}],
	["session.discussion.open", {
		fields: ["sessionKey"],
		required: true
	}],
	["sessions.abort", {
		fields: ["key"],
		required: true
	}],
	["sessions.assignOwner", {
		fields: ["key"],
		required: true
	}],
	["sessions.setInvolvement", {
		fields: ["key"],
		readOnly: true
	}],
	["sessions.companion.ask", {
		fields: ["sessionKey"],
		readOnly: true
	}],
	["sessions.companion.reset", {
		fields: ["sessionKey"],
		required: true
	}],
	["sessions.companion.state", {
		fields: ["sessionKey"],
		readOnly: true
	}],
	["sessions.compact", {
		fields: ["key"],
		required: true
	}],
	["sessions.create", { fields: ["key", "parentSessionKey"] }],
	["sessions.messages.subscribe", {
		fields: ["key"],
		required: true
	}],
	["sessions.delete", {
		fields: ["key"],
		required: true
	}],
	["sessions.dispatch", {
		fields: ["key"],
		required: true,
		runStart: true
	}],
	["sessions.files.set", {
		fields: ["sessionKey"],
		required: true
	}],
	["sessions.github.publish", {
		fields: ["sessionKey"],
		required: true
	}],
	["sessions.github.confirm", {
		fields: ["sessionKey"],
		required: true
	}],
	["sessions.fork", {
		fields: ["sessionKey"],
		required: true
	}],
	["sessions.patch", {
		fields: ["key"],
		required: true
	}],
	["sessions.goal.update", {
		fields: ["sessionKey"],
		required: true
	}],
	["sessions.goal.clear", {
		fields: ["sessionKey"],
		required: true
	}],
	["sessions.providerReview.continue", {
		fields: ["sessionKey"],
		required: true,
		runStart: true
	}],
	["sessions.pluginPatch", {
		fields: ["key"],
		required: true
	}],
	["sessions.recover", {
		fields: ["key"],
		required: true
	}],
	["sessions.reset", {
		fields: ["key"],
		required: true
	}],
	["sessions.rewind", {
		fields: ["sessionKey"],
		required: true
	}],
	["sessions.send", {
		fields: ["key"],
		required: true,
		runStart: true
	}],
	["sessions.steer", {
		fields: ["key"],
		required: true,
		runStart: true
	}],
	["sessions.branches.switch", {
		fields: ["sessionKey"],
		required: true
	}],
	["talk.voice.set", { fields: ["sessionKey"] }],
	["tools.invoke", {
		fields: ["sessionKey"],
		runStart: true
	}],
	["sessions.move", {
		fields: ["key"],
		required: true
	}],
	["sessions.reclaim", {
		fields: ["key"],
		required: true
	}],
	["taskSuggestions.create", {
		fields: ["sessionKey"],
		required: true
	}],
	["talk.client.close", {
		fields: ["sessionKey"],
		required: true,
		profileIndependent: true
	}],
	["talk.client.create", {
		fields: ["sessionKey"],
		profileIndependent: true,
		runStart: true
	}],
	["talk.client.steer", {
		fields: ["sessionKey"],
		required: true,
		profileIndependent: true
	}],
	["talk.client.toolCall", {
		fields: ["sessionKey"],
		required: true,
		profileIndependent: true,
		runStart: true
	}],
	["talk.client.transcript", {
		fields: ["sessionKey"],
		required: true,
		profileIndependent: true
	}],
	["talk.session.create", {
		fields: ["sessionKey"],
		profileIndependent: true,
		runStart: true
	}],
	["talk.session.steer", {
		fields: ["sessionKey"],
		profileIndependent: true
	}],
	["wake", {
		fields: ["sessionKey"],
		profileIndependent: true,
		runStart: true
	}],
	["board.action", { required: true }],
	["sessions.groups.delete", { required: true }],
	["sessions.groups.rename", { required: true }],
	["sessions.groups.update", { required: true }],
	["approval.resolve", { approval: true }],
	["exec.approval.resolve", { approval: true }],
	["plugin.approval.resolve", { approval: true }]
]);
function sessionMutationTargetFields(method) {
	const policy = SESSION_TARGET_POLICY_BY_METHOD.get(method);
	return policy?.readOnly ? [] : policy?.fields ?? [];
}
function isRequiredSessionTargetMethod(method) {
	return SESSION_TARGET_POLICY_BY_METHOD.get(method)?.required === true;
}
function isApprovalSessionTargetMethod(method) {
	return SESSION_TARGET_POLICY_BY_METHOD.get(method)?.approval === true;
}
function isSessionProfileDependentMethod(method) {
	if (SESSION_TARGET_POLICY_BY_METHOD.get(method)?.profileIndependent) return false;
	return SESSION_TARGET_POLICY_BY_METHOD.has(method) || method === "sessions.patchMany";
}
/** Run starts require participation even when the operator has admin scope. */
function isAgentRunStartMethod(method, requestParams) {
	return SESSION_TARGET_POLICY_BY_METHOD.get(method)?.runStart === true || method === "sessions.goal.update" && typeof requestParams === "object" && requestParams !== null && "action" in requestParams && requestParams.action === "resume";
}
//#endregion
export { sessionMutationTargetFields as a, isSessionProfileDependentMethod as i, isApprovalSessionTargetMethod as n, isRequiredSessionTargetMethod as r, isAgentRunStartMethod as t };
