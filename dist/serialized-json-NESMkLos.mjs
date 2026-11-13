import { a as asOptionalRecord } from "./record-coerce-TIsquoVR.mjs";
//#region src/gateway/serialized-json.ts
/** The history worker owns these already-validated JSON array bytes. */
var SerializedJsonArray = class {
	constructor(bytes) {
		this.bytes = bytes;
	}
	materialize() {
		const { bytes } = this;
		const value = JSON.parse(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString("utf8"));
		if (!Array.isArray(value)) throw new TypeError("Serialized history JSON must contain an array");
		return value;
	}
	toJSON() {
		return this.materialize();
	}
};
function fieldJson(key, value) {
	return JSON.stringify({ [key]: value }).slice(1, -1);
}
function serializeGatewayFrame(value) {
	const frame = asOptionalRecord(value);
	const payload = frame?.type === "res" ? asOptionalRecord(frame.payload) : void 0;
	if (!frame || !payload || typeof frame.toJSON === "function" || typeof payload.toJSON === "function" || !Object.keys(payload).some((key) => Object.getOwnPropertyDescriptor(payload, key)?.value instanceof SerializedJsonArray)) return JSON.stringify(value);
	const chunks = [];
	const appendObject = (record, isPayload) => {
		chunks.push(Buffer.from("{"));
		let separator = "";
		for (const key of Object.keys(record)) {
			const field = record[key];
			const rawArray = isPayload && field instanceof SerializedJsonArray ? field : void 0;
			const nestedPayload = !isPayload && key === "payload";
			const encoded = rawArray || nestedPayload ? `${JSON.stringify(key)}:` : fieldJson(key, field);
			if (!encoded) continue;
			chunks.push(Buffer.from(`${separator}${encoded}`));
			separator = ",";
			if (rawArray) chunks.push(rawArray.bytes);
			else if (nestedPayload) appendObject(payload, true);
		}
		chunks.push(Buffer.from("}"));
	};
	appendObject(frame, false);
	return Buffer.concat(chunks);
}
//#endregion
export { serializeGatewayFrame as n, SerializedJsonArray as t };
