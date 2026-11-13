import { createAsyncLock as createAsyncLock$1 } from "@openclaw/fs-safe/advanced";
import { JsonFileReadError, readJson, readJson as readJsonFileStrict, readJsonIfExists, readJsonIfExists as readDurableJsonFile, readJsonSync, readRootJsonObjectSync as readRootJsonObjectSync$1, readRootJsonSync, readRootStructuredFileSync, tryReadJson, tryReadJson as readJsonFile, tryReadJsonSync as readJsonFileSync, tryReadJsonSync as tryReadJsonSync$1, writeJson, writeJson as writeJsonAtomic, writeJsonSync as writeJsonSync$1 } from "@openclaw/fs-safe/json";
import { writeTextAtomic } from "@openclaw/fs-safe/atomic";
//#region src/infra/json-files.ts
const writeTextAtomic$1 = async (filePath, content, options) => {
	await writeTextAtomic(filePath, content, {
		mode: options?.mode,
		dirMode: options?.dirMode,
		trailingNewline: options?.trailingNewline,
		durable: options?.durable,
		beforeRename: options?.beforeRename || void 0,
		tempPrefix: options?.tempPrefix || void 0
	});
};
//#endregion
export { writeJsonSync$1 as _, readJsonFile as a, readJsonIfExists as c, readRootJsonSync as d, readRootStructuredFileSync as f, writeJsonAtomic as g, writeJson as h, readJson as i, readJsonSync as l, tryReadJsonSync$1 as m, createAsyncLock$1 as n, readJsonFileStrict as o, tryReadJson as p, readDurableJsonFile as r, readJsonFileSync as s, JsonFileReadError as t, readRootJsonObjectSync$1 as u, writeTextAtomic$1 as v };
