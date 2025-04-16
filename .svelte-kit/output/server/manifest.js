export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "jump-tourney-overlay/_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.B0jjJs2R.js",app:"_app/immutable/entry/app.DtxSLyuN.js",imports:["_app/immutable/entry/start.B0jjJs2R.js","_app/immutable/chunks/DWxl6TRJ.js","_app/immutable/chunks/WD35gU20.js","_app/immutable/chunks/CilybHQR.js","_app/immutable/entry/app.DtxSLyuN.js","_app/immutable/chunks/WD35gU20.js","_app/immutable/chunks/DsodSxZ3.js","_app/immutable/chunks/Dxf_SUSN.js","_app/immutable/chunks/RSlsrzv8.js","_app/immutable/chunks/C3AU2ht9.js","_app/immutable/chunks/CilybHQR.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/jump-tourney-overlay/","/jump-tourney-overlay/overlay"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
