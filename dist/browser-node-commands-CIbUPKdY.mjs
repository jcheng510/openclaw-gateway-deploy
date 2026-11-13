//#region extensions/browser/src/browser-node-commands.ts
const BROWSER_PROXY_COMMAND = "browser.proxy";
const BROWSER_PROXY_UPLOAD_COMMAND = "browser.proxy.upload.v1";
function browserProxyUploadUnavailableMessage(pendingDeclaredCommands) {
	return pendingDeclaredCommands?.includes("browser.proxy.upload.v1") ? "browser node remote upload transfer is pending approval; approve the node's pending command update before retrying" : "browser node does not support remote upload transfer; update the node or approve its pending command update before retrying";
}
//#endregion
export { BROWSER_PROXY_UPLOAD_COMMAND as n, browserProxyUploadUnavailableMessage as r, BROWSER_PROXY_COMMAND as t };
