import { createAsyncLock } from "@openclaw/fs-safe/advanced";
import { WriteTextAtomicOptions, writeTextAtomic } from "@openclaw/fs-safe/atomic";
import { JsonFileReadError, readJson, readJson as readJsonFileStrict, readJsonIfExists, readJsonIfExists as readDurableJsonFile, readJsonSync, readRootJsonObjectSync, readRootJsonSync, readRootStructuredFileSync, tryReadJson, tryReadJson as readJsonFile, tryReadJsonSync, tryReadJsonSync as readJsonFileSync, writeJson, writeJson as writeJsonAtomic, writeJsonSync } from "@openclaw/fs-safe/json";
//#region src/infra/json-files.d.ts
declare const writeTextAtomic$1: typeof writeTextAtomic;
//#endregion
export { writeJsonAtomic as _, readJson as a, readJsonFileSync as c, readRootJsonObjectSync as d, readRootJsonSync as f, writeJson as g, tryReadJsonSync as h, readDurableJsonFile as i, readJsonIfExists as l, tryReadJson as m, WriteTextAtomicOptions as n, readJsonFile as o, readRootStructuredFileSync as p, createAsyncLock as r, readJsonFileStrict as s, JsonFileReadError as t, readJsonSync as u, writeJsonSync as v, writeTextAtomic$1 as y };