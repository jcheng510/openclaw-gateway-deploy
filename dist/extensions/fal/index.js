import { t as definePluginEntry } from "../../plugin-entry-BsETFXpv.mjs";
import { t as buildFalImageGenerationProvider } from "../../image-generation-provider-yv5qWPPS.mjs";
import { t as buildFalMusicGenerationProvider } from "../../music-generation-provider-BXmJYLyq.mjs";
import { t as createFalProvider } from "../../provider-registration-BFWfPyeZ.mjs";
import { t as buildFalVideoGenerationProvider } from "../../video-generation-provider-CE0GBBc9.mjs";
var fal_default = definePluginEntry({
	id: "fal",
	name: "fal Provider",
	description: "Bundled fal image, video, and music generation provider",
	register(api) {
		api.registerProvider(createFalProvider());
		api.registerImageGenerationProvider(buildFalImageGenerationProvider());
		api.registerMusicGenerationProvider(buildFalMusicGenerationProvider());
		api.registerVideoGenerationProvider(buildFalVideoGenerationProvider());
	}
});
//#endregion
export { fal_default as default };
