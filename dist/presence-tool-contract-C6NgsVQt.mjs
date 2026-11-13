//#region src/agents/tools/presence-tool-contract.ts
const PRESENCE_QUERY_TIMEOUT_MS = 3e5;
const PRESENCE_TOOL_DESCRIPTION = "Read live people, connected devices, and observed activity on this Gateway. list (default): who is online, one entry per person. person: inspect me, a profile ID, or an unambiguous name. device: inspect a deviceId returned by presence. Include devices for recent activity and its source, network for IP addresses, or location for approximate IP geography (not GPS). Online means connected, not necessarily active. Unknown activity is not inactivity. Shared or unidentified machines remain separate from people; list with devices includes them. This is a current snapshot, not activity history or permission to control a device.";
//#endregion
export { PRESENCE_TOOL_DESCRIPTION as n, PRESENCE_QUERY_TIMEOUT_MS as t };
