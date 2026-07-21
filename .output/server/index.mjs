globalThis.__nitro_main__ = import.meta.url;
import { fileURLToPath as __eveFileURLToPath } from "node:url";
import { dirname as __eveDirname } from "node:path";
__eveDirname(__eveFileURLToPath(import.meta.url));
import { a as NodeResponse, i as toEventHandler, n as HTTPError, o as serve, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { a as generate_email_exports, c as dispatchChannelRequest, d as s, f as installBundledCompiledArtifacts, i as save_draft_exports, l as handleAgentInfoRequest, n as search_prospeo_exports, o as eve_exports, p as handleHomePageRequest, r as search_leads_exports, s as agent_exports, t as POST, u as health_default$1 } from "./_libs/eve.mjs";
import { promises } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
//#region #eve-route-handler/GET /
var GET__default = handleHomePageRequest;
//#endregion
//#region #eve-route-handler/GET /eve/v1/health
var health_default = health_default$1;
//#endregion
//#region #eve-route/eve/v1/info
var info_default = async (event) => handleAgentInfoRequest({
	"appRoot": "C:\\Users\\danap\\atelier-agent",
	"dev": false,
	"mode": "production"
}, event.req);
//#endregion
//#region #nitro/virtual/eve-channel/GET /eve/v1/connections/:name/callback/:token
const config$5 = {
	"appRoot": "C:\\Users\\danap\\atelier-agent",
	"dev": false
};
var _token_default$2 = (event) => dispatchChannelRequest(event, "GET /eve/v1/connections/:name/callback/:token", config$5);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/connections/:name/callback/:token
const config$4 = {
	"appRoot": "C:\\Users\\danap\\atelier-agent",
	"dev": false
};
var _token_default$1 = (event) => dispatchChannelRequest(event, "POST /eve/v1/connections/:name/callback/:token", config$4);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/callback/:token
const config$3 = {
	"appRoot": "C:\\Users\\danap\\atelier-agent",
	"dev": false
};
var _token_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/callback/:token", config$3);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session
const config$2 = {
	"appRoot": "C:\\Users\\danap\\atelier-agent",
	"dev": false
};
var session_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session", config$2);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session/:sessionId
const config$1 = {
	"appRoot": "C:\\Users\\danap\\atelier-agent",
	"dev": false
};
var _sessionId_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session/:sessionId", config$1);
//#endregion
//#region #nitro/virtual/eve-channel/GET /eve/v1/session/:sessionId/stream
const config = {
	"appRoot": "C:\\Users\\danap\\atelier-agent",
	"dev": false
};
var stream_default = (event) => dispatchChannelRequest(event, "GET /eve/v1/session/:sessionId/stream", config);
//#endregion
//#region .eve/nitro/workflow/workflows-handler.mjs
var workflows_handler_default = async ({ req }) => {
	return await POST(req);
};
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/audit-le-petit-bistrot-EN.pdf": {
		"type": "application/pdf",
		"etag": "\"1966-tj1WSoXC8I0wLC+k+VQbrbXSAtg\"",
		"mtime": "2026-07-21T08:12:09.271Z",
		"size": 6502,
		"path": "../public/audit-le-petit-bistrot-EN.pdf"
	},
	"/portfolio.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"1421-FdcDHwOYvHXu1y/JRQOsFTR7VAs\"",
		"mtime": "2026-07-21T08:12:09.272Z",
		"size": 5153,
		"path": "../public/portfolio.html"
	},
	"/audit-le-petit-bistrot-FR.pdf": {
		"type": "application/pdf",
		"etag": "\"1a06-bft+tR0tUDFZgMh2IvbUOAHhlnw\"",
		"mtime": "2026-07-21T08:12:09.271Z",
		"size": 6662,
		"path": "../public/audit-le-petit-bistrot-FR.pdf"
	},
	"/index.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"510c-OgHIYkti5e2QTqjtLyS+bXTazFQ\"",
		"mtime": "2026-07-21T08:12:09.272Z",
		"size": 20748,
		"path": "../public/index.html"
	},
	"/style.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"e5d-wto90jmW9bejsa7P9i2NMWeMETU\"",
		"mtime": "2026-07-21T08:12:09.272Z",
		"size": 3677,
		"path": "../public/style.css"
	},
	"/Mockups/Baluserv.png": {
		"type": "image/png",
		"etag": "\"a192-N9I5of4zwvduSFQHbjDIh5c4LzA\"",
		"mtime": "2026-07-21T08:12:09.263Z",
		"size": 41362,
		"path": "../public/Mockups/Baluserv.png"
	},
	"/Mockups/Anda_Lazarov_Academy.png": {
		"type": "image/png",
		"etag": "\"a7c8-lHLcZPHzyC8215yrw9tsciR/87Q\"",
		"mtime": "2026-07-21T08:12:09.262Z",
		"size": 42952,
		"path": "../public/Mockups/Anda_Lazarov_Academy.png"
	},
	"/Mockups/Biotiful.png": {
		"type": "image/png",
		"etag": "\"8d01-TjVWfP76t17YT8Sg165qRehbxcM\"",
		"mtime": "2026-07-21T08:12:09.265Z",
		"size": 36097,
		"path": "../public/Mockups/Biotiful.png"
	},
	"/Mockups/Herman_Arad.png": {
		"type": "image/png",
		"etag": "\"8d91-vio0s4Sgea9j8Yo4PJWXZCoInyI\"",
		"mtime": "2026-07-21T08:12:09.266Z",
		"size": 36241,
		"path": "../public/Mockups/Herman_Arad.png"
	},
	"/Mockups/KEO_Cosmetic_Studio.png": {
		"type": "image/png",
		"etag": "\"a6d8-t/uZ7Yq7Mnct9qVfY+DW//2tj/0\"",
		"mtime": "2026-07-21T08:12:09.267Z",
		"size": 42712,
		"path": "../public/Mockups/KEO_Cosmetic_Studio.png"
	},
	"/Mockups/Kineto_Sport_MRC___BeFit_Smile.png": {
		"type": "image/png",
		"etag": "\"b096-m3+qKJM7I0laUkkHZG3hkNdYG6g\"",
		"mtime": "2026-07-21T08:12:09.268Z",
		"size": 45206,
		"path": "../public/Mockups/Kineto_Sport_MRC___BeFit_Smile.png"
	},
	"/Mockups/Geanina_Craciun_Beauty_Clinic___Aca.png": {
		"type": "image/png",
		"etag": "\"9a4e-yltAcu+G53y2u4G0iQczFVDm53s\"",
		"mtime": "2026-07-21T08:12:09.266Z",
		"size": 39502,
		"path": "../public/Mockups/Geanina_Craciun_Beauty_Clinic___Aca.png"
	},
	"/Mockups/L__bu__e_Fericite.png": {
		"type": "image/png",
		"etag": "\"9e3a-CziykCmW0RVV95t0IZ51aYRuC5Y\"",
		"mtime": "2026-07-21T08:12:09.268Z",
		"size": 40506,
		"path": "../public/Mockups/L__bu__e_Fericite.png"
	},
	"/Mockups/Pure_Pilates_Studio.png": {
		"type": "image/png",
		"etag": "\"9c14-tnEQZ8uE+KxD6/GO8rydWa3K12E\"",
		"mtime": "2026-07-21T08:12:09.269Z",
		"size": 39956,
		"path": "../public/Mockups/Pure_Pilates_Studio.png"
	},
	"/Mockups/MIKO_Beauty_Center.png": {
		"type": "image/png",
		"etag": "\"ade4-+CScDjQ1Z0LprQQKU+5Ry/+15nw\"",
		"mtime": "2026-07-21T08:12:09.269Z",
		"size": 44516,
		"path": "../public/Mockups/MIKO_Beauty_Center.png"
	},
	"/Mockups/Salon_Infrumusetare_ANIA_STIL.png": {
		"type": "image/png",
		"etag": "\"aa39-agdARDw7c2olSIQw+I98TNsjzpc\"",
		"mtime": "2026-07-21T08:12:09.270Z",
		"size": 43577,
		"path": "../public/Mockups/Salon_Infrumusetare_ANIA_STIL.png"
	},
	"/Mockups/Viva_Stil.png": {
		"type": "image/png",
		"etag": "\"9303-25IG4B9grdnZaCBEdwuKR5TboP0\"",
		"mtime": "2026-07-21T08:12:09.271Z",
		"size": 37635,
		"path": "../public/Mockups/Viva_Stil.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
const findRoute = /* @__PURE__ */ (() => {
	const $0 = {
		route: "/",
		method: "GET",
		handler: toEventHandler(GET__default)
	}, $1 = {
		route: "/eve/v1/health",
		method: "GET",
		handler: toEventHandler(health_default)
	}, $2 = {
		route: "/eve/v1/info",
		method: "GET",
		handler: toEventHandler(info_default)
	}, $3 = {
		route: "/eve/v1/session",
		method: "POST",
		handler: toEventHandler(session_default)
	}, $4 = {
		route: "/.well-known/workflow/v1/flow",
		handler: toEventHandler(workflows_handler_default)
	}, $5 = {
		route: "/eve/v1/connections/:name/callback/:token",
		method: "GET",
		handler: toEventHandler(_token_default$2)
	}, $6 = {
		route: "/eve/v1/connections/:name/callback/:token",
		method: "POST",
		handler: toEventHandler(_token_default$1)
	}, $7 = {
		route: "/eve/v1/callback/:token",
		method: "POST",
		handler: toEventHandler(_token_default)
	}, $8 = {
		route: "/eve/v1/session/:sessionId",
		method: "POST",
		handler: toEventHandler(_sessionId_default)
	}, $9 = {
		route: "/eve/v1/session/:sessionId/stream",
		method: "GET",
		handler: toEventHandler(stream_default)
	};
	return (m, p) => {
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		if (p === "/") {
			if (m === "GET") return { data: $0 };
		} else if (p === "/eve/v1/health") {
			if (m === "GET") return { data: $1 };
		} else if (p === "/eve/v1/info") {
			if (m === "GET") return { data: $2 };
		} else if (p === "/eve/v1/session") {
			if (m === "POST") return { data: $3 };
		} else if (p === "/.well-known/workflow/v1/flow") return { data: $4 };
		let s = p.split("/"), l = s.length;
		if (l > 1) {
			if (s[1] === "eve") {
				if (l > 2) {
					if (s[2] === "v1") {
						if (l > 3) {
							if (s[3] === "connections") {
								if (l > 5) {
									if (s[5] === "callback") {
										if (l === 7 || l === 6) {
											if (m === "GET") {
												if (l > 6) return {
													data: $5,
													params: {
														"name": s[4],
														"token": s[6]
													}
												};
											}
											if (m === "POST") {
												if (l > 6) return {
													data: $6,
													params: {
														"name": s[4],
														"token": s[6]
													}
												};
											}
										}
									}
								}
							} else if (s[3] === "callback") {
								if (l === 5 || l === 4) {
									if (m === "POST") {
										if (l > 4) return {
											data: $7,
											params: { "token": s[4] }
										};
									}
								}
							} else if (s[3] === "session") {
								if (l === 5 || l === 4) {
									if (m === "POST") {
										if (l > 4) return {
											data: $8,
											params: { "sessionId": s[4] }
										};
									}
								} else if (s[5] === "stream") {
									if (l === 6) {
										if (m === "GET") return {
											data: $9,
											params: { "sessionId": s[4] }
										};
									}
								}
							}
						}
					}
				}
			}
		}
	};
})();
const globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
const errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
const errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region .eve/compile/compiled-artifacts-bootstrap.mjs
const moduleMap = Object.freeze({ "nodes": Object.freeze({ "__root__": Object.freeze({ "modules": Object.freeze({
	"agent.ts": agent_exports,
	"channels/eve.ts": eve_exports,
	"tools/generate-email.ts": generate_email_exports,
	"tools/save-draft.ts": save_draft_exports,
	"tools/search-leads.ts": search_leads_exports,
	"tools/search-prospeo.ts": search_prospeo_exports
}) }) }) });
const metadata = {
	"compile": { "moduleMap": {
		"path": ".eve/compile/module-map.mjs",
		"sha256": "cc71145c7735ca02943e23e50ab7a65c5cebc3346b42c12c22578e03b1a33be4"
	} },
	"discovery": {
		"diagnostics": {
			"path": ".eve/discovery/diagnostics.json",
			"sha256": "b26fc8e66ee943f962b1bab4a790f6a611ce7e6738aa29f83ea53b73cc362c63"
		},
		"manifest": {
			"path": ".eve/discovery/agent-discovery-manifest.json",
			"sha256": "2de15c9d36b4230fd860def7575d982bffb478d1d17dff7fd357a9d403a3ba97"
		},
		"sourceGraphHash": "b7f3c7a4964da4732774b6ca822b7c83eb25890ad1c717777afabcf6d573e0ce",
		"summary": {
			"errors": 0,
			"warnings": 0
		}
	},
	"generator": {
		"name": "eve",
		"version": "0.11.10"
	},
	"kind": "eve-compile-metadata",
	"status": "ready",
	"version": 5
};
const manifest = {
	"agentRoot": "C:\\Users\\danap\\atelier-agent\\agent",
	"appRoot": "C:\\Users\\danap\\atelier-agent",
	"channels": [
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "POST",
			"urlPath": "/eve/v1/session",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "POST",
			"urlPath": "/eve/v1/session/:sessionId",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "GET",
			"urlPath": "/eve/v1/session/:sessionId/stream",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		}
	],
	"connections": [],
	"config": {
		"compaction": {},
		"model": {
			"id": "deepseek/deepseek-v4-flash",
			"routing": {
				"kind": "gateway",
				"target": "deepseek"
			},
			"contextWindowTokens": 1e6
		},
		"name": "atelier-agent",
		"source": {
			"sourceKind": "module",
			"logicalPath": "agent.ts",
			"sourceId": "agent.ts"
		}
	},
	"diagnosticsSummary": {
		"errors": 0,
		"warnings": 0
	},
	"disabledFrameworkTools": [],
	"workflowEnabled": false,
	"dynamicInstructions": [],
	"dynamicSkills": [],
	"dynamicTools": [],
	"hooks": [],
	"remoteAgents": [],
	"sandbox": null,
	"sandboxWorkspaces": [],
	"schedules": [],
	"skills": [],
	"tools": [
		{
			"description": "Generate a personalized outreach email using AI. Provide business name, details, and language (french/english).",
			"inputSchema": {
				"type": "object",
				"properties": {
					"business_name": {
						"type": "string",
						"description": "Name of the business to contact"
					},
					"details": {
						"type": "string",
						"description": "Details about the business (location, services, website, etc.)"
					},
					"language": {
						"type": "string",
						"description": "Language: 'french' or 'english' (default: 'french')",
						"default": "french"
					},
					"contact_name": {
						"type": "string",
						"description": "Name of the contact person (optional)"
					}
				},
				"required": ["business_name", "details"]
			},
			"logicalPath": "tools/generate-email.ts",
			"name": "generate-email",
			"sourceId": "tools/generate-email.ts",
			"sourceKind": "module"
		},
		{
			"description": "Save an email draft for review. Returns the draft content with metadata.",
			"inputSchema": {
				"type": "object",
				"properties": {
					"business_name": {
						"type": "string",
						"description": "Name of the business"
					},
					"email_body": {
						"type": "string",
						"description": "The email content"
					},
					"source": {
						"type": "string",
						"description": "Lead source (e.g. 'blitz', 'prospeo', 'exa')"
					}
				},
				"required": [
					"business_name",
					"email_body",
					"source"
				]
			},
			"logicalPath": "tools/save-draft.ts",
			"name": "save-draft",
			"sourceId": "tools/save-draft.ts",
			"sourceKind": "module"
		},
		{
			"description": "Search for B2B leads using Blitz API. Provide business type/query and location. Defaults to French cities.",
			"inputSchema": {
				"type": "object",
				"properties": {
					"query": {
						"type": "string",
						"description": "Business type (e.g. 'restaurant', 'nail salon', 'boulangerie', 'cabinet dentaire', 'agence immobilière')"
					},
					"location": {
						"type": "string",
						"description": "City (default: 'Paris'). French cities: Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes, Lille, Strasbourg, Nice, Montpellier"
					},
					"max_results": {
						"type": "number",
						"description": "Max results (default 5)",
						"default": 5
					}
				},
				"required": ["query"]
			},
			"logicalPath": "tools/search-leads.ts",
			"name": "search-leads",
			"sourceId": "tools/search-leads.ts",
			"sourceKind": "module"
		},
		{
			"description": "Search for B2B leads using Prospeo API. Returns contacts with verified emails. Provide business type/query and location.",
			"inputSchema": {
				"type": "object",
				"properties": {
					"query": {
						"type": "string",
						"description": "Business type or job title (e.g. 'restaurant', 'nail salon', 'boulangerie')"
					},
					"location": {
						"type": "string",
						"description": "City or region (e.g. 'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes', 'Lille', 'Strasbourg', 'Nice', 'Montpellier')"
					},
					"max_results": {
						"type": "number",
						"description": "Max results (default 5, max 25)",
						"default": 5
					}
				},
				"required": ["query", "location"]
			},
			"logicalPath": "tools/search-prospeo.ts",
			"name": "search-prospeo",
			"sourceId": "tools/search-prospeo.ts",
			"sourceKind": "module"
		}
	],
	"workspaceResourceRoot": {
		"contentHash": "5777dd4d87493e836b5597e87f6b3d07482c551341171ea7836996b231207c7b",
		"logicalPath": "workspace-resources/__root__",
		"rootEntries": []
	},
	"instructions": {
		"name": "instructions",
		"logicalPath": "instructions.md",
		"markdown": "# Identity\r\n\r\nYou are **Tris** — Indigo Atelier's AI lead generation agent. You find B2B leads in French and English markets, generate personalized outreach emails, and save them for review. You run 24/7 on Vercel.\r\n\r\n# Your Job\r\n\r\n1. **Find leads** — search for businesses that need websites/SEO help (French market first, English second)\r\n2. **Generate emails** — write personalized outreach in French or English\r\n3. **Save drafts** — save each email draft for human review\r\n4. **Track metrics** — log how many leads found, emails generated\r\n\r\n# Target Markets\r\n\r\n**Primary: France**\r\n- Cities: Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes, Lille, Strasbourg, Nice, Montpellier\r\n- Business types: restaurants, cafés, boulangeries, salons, boutiques, garages, dental/medical practices, real estate agencies, small hotels/B&Bs\r\n- Language: French\r\n\r\n**Secondary: UK / English-speaking**\r\n- Cities: London, Manchester, Birmingham, Bristol, Edinburgh\r\n- Business types: same categories\r\n- Language: English\r\n\r\n**NOT targeting:** Romania, Eastern Europe (low ROI)\r\n\r\n# Lead Sources\r\n\r\n- **Blitz API** — set via BLITZ_API_KEY env var (5 RPS, 1k/mo free)\r\n- **Prospeo** — set via PROSPEO_API_KEY env var (1 RPS, 100 credits/mo)\r\n- **Exa** — set via EXA_API_KEY env var (backup, ~3 results/search)\r\n\r\n# Tools Available\r\n\r\n- `search_leads` — find businesses by type + location (Blitz API)\r\n- `search_prospeo` — find contacts with verified emails (Prospeo API)\r\n- `generate_email` — create personalized outreach email (French or English)\r\n- `save_draft` — save email to drafts folder\r\n\r\n# Output Format\r\n\r\nFor each lead, return:\r\n```json\r\n{\r\n  \"business\": \"Business Name\",\r\n  \"contact\": \"Contact Name\",\r\n  \"location\": \"City\",\r\n  \"email\": \"contact@email.com\",\r\n  \"draft\": \"generated email content\",\r\n  \"source\": \"blitz|prospeo\"\r\n}\r\n```\r\n\r\n# Email Rules\r\n\r\n- Default language: **French** (for French market)\r\n- Switch to **English** when targeting UK/English-speaking clients\r\n- Keep emails under 100 words\r\n- Professional but warm tone — no spam, no urgency, no pressure\r\n- Always mention the business name and one specific detail\r\n- Always offer free SEO/AIO audit + website mockup\r\n- Sign as: **Indigo S / Atelier**\r\n- Link: https://atelier-agent-mini-audit.vercel.app\r\n\r\n# Signature\r\n\r\nSign all emails as: **Indigo S / Atelier** with link to https://atelier-agent-mini-audit.vercel.app\r\n",
		"sourceId": "instructions.md",
		"sourceKind": "markdown"
	},
	"kind": "eve-agent-compiled-manifest",
	"subagentEdges": [],
	"subagents": [],
	"version": 30
};
function installCompiledArtifactsBootstrap() {
	installBundledCompiledArtifacts({
		manifest,
		metadata,
		moduleMap
	});
}
installCompiledArtifactsBootstrap();
function installCompiledArtifactsPlugin() {}
async function __eveInstallCompiledArtifactsStep() {
	return null;
}
s("step//./.eve/compile/compiled-artifacts-bootstrap//__eveInstallCompiledArtifactsStep", __eveInstallCompiledArtifactsStep);
//#endregion
//#region #nitro/virtual/plugins
const plugins = [installCompiledArtifactsPlugin];
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const hooks = new HookableCore();
	const captureError = (error, errorCtx) => {
		const promise = hooks.callHook("error", error, errorCtx)?.catch?.((hookError) => {
			console.error("Error while capturing another error", hookError);
		});
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
			if (promise && typeof errorCtx.event.req.waitUntil === "function") errorCtx.event.req.waitUntil(promise);
		}
	};
	const h3App = createH3App({ onError(error, event) {
		captureError(error, { event });
		return error_handler_default(error, event);
	} });
	h3App.config.onRequest = (event) => {
		return hooks.callHook("request", event)?.catch?.((error) => {
			captureError(error, {
				event,
				tags: ["request"]
			});
		});
	};
	h3App.config.onResponse = (res, event) => {
		return hooks.callHook("response", res, event)?.catch?.((error) => {
			captureError(error, {
				event,
				tags: ["response"]
			});
		});
	};
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks,
		captureError
	};
}
function initNitroPlugins(app) {
	for (const plugin of plugins) try {
		plugin(app);
	} catch (error) {
		app.captureError?.(error, { tags: ["plugin"] });
		throw error;
	}
	return app;
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
const APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	initNitroPlugins(instance);
	return instance;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
const tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
