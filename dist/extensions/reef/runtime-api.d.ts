import { r as PluginRuntime } from "../../cli-backend.types-EMzB3xUc.js";
import { n as ReviewApprovalStore, r as ReefFriendManager, t as ReefMessageFlow } from "../../flow-DT9S9eh1.js";
//#region extensions/reef/src/runtime.d.ts
type ActiveReef = {
  flow: ReefMessageFlow;
  friends: ReefFriendManager;
  reviews: ReviewApprovalStore;
};
declare const { setRuntime: setReefRuntime, tryGetRuntime: getOptionalReefRuntime, getRuntime: getReefRuntime }: {
  setRuntime: (next: PluginRuntime) => void;
  clearRuntime: () => void;
  tryGetRuntime: () => PluginRuntime | null;
  getRuntime: () => PluginRuntime;
};
export declare function getActiveReef(): ActiveReef;
//#endregion
export { getReefRuntime, setReefRuntime };