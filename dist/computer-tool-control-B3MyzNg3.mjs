import { u as ScreenSnapshotParamsSchema } from "./computer-use-contract-BA1SbL9L.mjs";
import { Type } from "typebox";
//#region src/agents/tools/computer-tool-control.ts
/** Gateway-owned desktop arbitration; never forwarded to a computer provider. */
const ComputerTakeControlParamsSchema = Type.Object({
	action: Type.Literal("__take_control"),
	...Type.Required(Type.Pick(ScreenSnapshotParamsSchema, ["executionId"])).properties
}, { additionalProperties: false });
//#endregion
export { ComputerTakeControlParamsSchema as t };
