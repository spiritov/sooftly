import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Cov_9iVb.js","_app/immutable/chunks/Dxf_SUSN.js","_app/immutable/chunks/WD35gU20.js"];
export const stylesheets = ["_app/immutable/assets/0.CbZ9wpOn.css"];
export const fonts = ["_app/immutable/assets/UbuntuMono.BfptL12z.ttf","_app/immutable/assets/Outfit.BlL8FXaZ.ttf"];
