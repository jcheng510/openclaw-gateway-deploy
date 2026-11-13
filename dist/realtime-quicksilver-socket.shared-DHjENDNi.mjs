import { a as OpenAIQuicksilverPendingAudio } from "./realtime-quicksilver-audio-buffer-Djyp8pva.mjs";
//#region extensions/openai/realtime-quicksilver-socket.shared.ts
const QUICKSILVER_SOCKET_CONTROL_LIMIT = 128;
const QUICKSILVER_SOCKET_CONTROL_BYTES = 1048576;
const QUICKSILVER_SOCKET_AUDIO_BYTES = 24e4;
const QUICKSILVER_SOCKET_AUDIO_BATCH_BYTES = 9600;
/** Bounded raw-byte tail: unlike PCM queues this must retain odd-length mu-law chunks. */
var QuicksilverSocketAudioQueue = class extends OpenAIQuicksilverPendingAudio {
	constructor(limit = QUICKSILVER_SOCKET_AUDIO_BYTES) {
		super(limit, 1);
	}
	take(limit = this.length) {
		const output = Buffer.alloc(Math.min(limit, this.length));
		this.readInto(output);
		return output;
	}
};
//#endregion
export { QuicksilverSocketAudioQueue as a, QUICKSILVER_SOCKET_CONTROL_LIMIT as i, QUICKSILVER_SOCKET_AUDIO_BYTES as n, QUICKSILVER_SOCKET_CONTROL_BYTES as r, QUICKSILVER_SOCKET_AUDIO_BATCH_BYTES as t };
