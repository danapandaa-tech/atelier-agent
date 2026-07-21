globalThis.__nitro_main__ = import.meta.url;
import { fileURLToPath as __eveFileURLToPath } from "node:url";
import { dirname as __eveDirname } from "node:path";
__eveDirname(__eveFileURLToPath(import.meta.url));
import { n as __exportAll } from "./_runtime.mjs";
import { a as NodeResponse, i as toEventHandler, n as HTTPError, o as serve, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { $t as localDev, G as defineTool, H as installEveWorkflowQueueNamespace, I as sandboxShutdownPlugin, J as ba, K as Xn, L as validateWorkflowWorld, Qt as eveChannel, R as resolveLocalWorkflowWorldDataDirectory, U as dispatchChannelRequest, V as defineAgent, W as health_default$2, en as none, nn as installBundledCompiledArtifacts, q as Zn, rn as handleHomePageRequest, tn as vercelOidc, z as br } from "./_libs/eve+zod.mjs";
import { i as gateway } from "./_libs/@ai-sdk/gateway+[...].mjs";
import { O as generateText } from "./_libs/ai.mjs";
import { promises } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
//#region #eve-route/
var _eve_route_default = async (event) => handleHomePageRequest({ "agentName": "atelier-agent" }, event.req);
//#endregion
//#region #eve-route-handler/GET /eve/v1/health
var health_default$1 = health_default$2;
//#endregion
//#region #eve-route-handler/HEAD /eve/v1/health
var health_default = health_default$2;
//#endregion
//#region #nitro/virtual/eve-channel/GET /eve/v1/connections/:name/callback/:token
const config$7 = { "kind": "production" };
var _token_default$2 = (event) => dispatchChannelRequest(event, "GET /eve/v1/connections/:name/callback/:token", config$7);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/connections/:name/callback/:token
const config$6 = { "kind": "production" };
var _token_default$1 = (event) => dispatchChannelRequest(event, "POST /eve/v1/connections/:name/callback/:token", config$6);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/callback/:token
const config$5 = { "kind": "production" };
var _token_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/callback/:token", config$5);
//#endregion
//#region #nitro/virtual/eve-channel/GET /eve/v1/info
const config$4 = { "kind": "production" };
var info_default = (event) => dispatchChannelRequest(event, "GET /eve/v1/info", config$4);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session
const config$3 = { "kind": "production" };
var session_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session", config$3);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session/:sessionId
const config$2 = { "kind": "production" };
var _sessionId_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session/:sessionId", config$2);
//#endregion
//#region #nitro/virtual/eve-channel/POST /eve/v1/session/:sessionId/cancel
const config$1 = { "kind": "production" };
var cancel_default = (event) => dispatchChannelRequest(event, "POST /eve/v1/session/:sessionId/cancel", config$1);
//#endregion
//#region #nitro/virtual/eve-channel/GET /eve/v1/session/:sessionId/stream
const config = { "kind": "production" };
var stream_default = (event) => dispatchChannelRequest(event, "GET /eve/v1/session/:sessionId/stream", config);
//#endregion
//#region agent/agent.ts
var agent_exports = /* @__PURE__ */ __exportAll({ default: () => agent_default });
var agent_default = defineAgent({ model: "deepseek/deepseek-v4-flash" });
//#endregion
//#region agent/channels/eve.ts
var eve_exports = /* @__PURE__ */ __exportAll({ default: () => eve_default });
var eve_default = eveChannel({ auth: [
	localDev(),
	vercelOidc(),
	none()
] });
//#endregion
//#region agent/tools/generate-email.ts
var generate_email_exports = /* @__PURE__ */ __exportAll({ default: () => generate_email_default });
var generate_email_default = defineTool({
	description: "Generate a personalized outreach email using AI. Provide business name, details, and language (french/english).",
	inputSchema: {
		type: "object",
		properties: {
			business_name: {
				type: "string",
				description: "Name of the business to contact"
			},
			details: {
				type: "string",
				description: "Details about the business (location, services, website, etc.)"
			},
			language: {
				type: "string",
				description: "Language: 'french' or 'english' (default: 'french')",
				default: "french"
			},
			contact_name: {
				type: "string",
				description: "Name of the contact person (optional)"
			}
		},
		required: ["business_name", "details"]
	},
	async execute(input) {
		const business_name = input.business_name;
		const details = input.details;
		const language = input.language || "french";
		const contact_name = input.contact_name || "";
		const greeting = contact_name ? language === "french" ? `Bonjour ${contact_name},` : `Hi ${contact_name},` : language === "french" ? "Bonjour," : "Hi there,";
		const systemPrompt = language === "french" ? `Tu es copywriter pour Indigo Atelier, agence web et SEO/AIO pour PME françaises.\nRédige un email court et personnalisé en français (max 100 mots).\nTon: professionnel mais chaleureux, pas de spam, pas d'urgence.\nOffre: audit SEO/AIO gratuit + mockup de site web personnalisé.\nSignature: Indigo S / Atelier\nLien: https://atelier-agent-mini-audit.vercel.app\nCommence par: "${greeting}"\nL'email doit mentionner spécifiquement l'entreprise cible et un détail observé.` : `You are a copywriter for Indigo Atelier, a web and SEO/AIO agency for small businesses.\nWrite a short, personalized email in English (max 100 words).\nTone: professional but warm, no spam, no urgency.\nOffer: free SEO/AIO audit + personalized website mockup.\nSign as: Indigo S / Atelier\nLink: https://atelier-agent-mini-audit.vercel.app\nStart with: "${greeting}"\nThe email must mention the target business specifically and one observed detail.`;
		const userPrompt = language === "french" ? `Entreprise: ${business_name}. Détails: ${details}. Rédige l'email de prospection.` : `Business: ${business_name}. Details: ${details}. Write the outreach email.`;
		try {
			const { text } = await generateText({
				model: gateway("deepseek/deepseek-v4-flash"),
				system: systemPrompt,
				prompt: userPrompt,
				maxOutputTokens: 300,
				temperature: .7
			});
			return { email: text };
		} catch (err) {
			return {
				error: err.message,
				email: ""
			};
		}
	}
});
//#endregion
//#region agent/tools/save-draft.ts
var save_draft_exports = /* @__PURE__ */ __exportAll({ default: () => save_draft_default });
var save_draft_default = defineTool({
	description: "Save an email draft for review. Returns the draft content with metadata.",
	inputSchema: {
		type: "object",
		properties: {
			business_name: {
				type: "string",
				description: "Name of the business"
			},
			email_body: {
				type: "string",
				description: "The email content"
			},
			source: {
				type: "string",
				description: "Lead source (e.g. 'blitz', 'prospeo', 'exa')"
			}
		},
		required: [
			"business_name",
			"email_body",
			"source"
		]
	},
	async execute(input) {
		const business_name = input.business_name;
		const email_body = input.email_body;
		const source = input.source;
		return {
			saved: true,
			filename: `${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").substring(0, 19)}_${business_name.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 30)}.md`,
			content: `# ${business_name}\nSource: ${source}\n\n${email_body}`
		};
	}
});
//#endregion
//#region agent/tools/search-leads.ts
var search_leads_exports = /* @__PURE__ */ __exportAll({ default: () => search_leads_default });
var search_leads_default = defineTool({
	description: "Search for B2B leads using Blitz API. Provide business type/query and location. Defaults to French cities.",
	inputSchema: {
		type: "object",
		properties: {
			query: {
				type: "string",
				description: "Business type (e.g. 'restaurant', 'nail salon', 'boulangerie', 'cabinet dentaire', 'agence immobilière')"
			},
			location: {
				type: "string",
				description: "City (default: 'Paris'). French cities: Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes, Lille, Strasbourg, Nice, Montpellier"
			},
			max_results: {
				type: "number",
				description: "Max results (default 5)",
				default: 5
			}
		},
		required: ["query"]
	},
	async execute(input) {
		const query = input.query;
		const location = input.location || "Paris";
		const max_results = input.max_results || 5;
		const BLITZ_KEY = process.env.blitz_api_key;
		if (!BLITZ_KEY) return {
			error: "BLITZ_API_KEY not set",
			leads: [],
			count: 0
		};
		try {
			const resp = await fetch("https://api.blitz-api.ai/v2/search/people", {
				method: "POST",
				headers: {
					"x-api-key": BLITZ_KEY,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					company: { location: { include: [location] } },
					person: {
						title: { include: query.split(" ") },
						seniority: { include: [
							"manager",
							"director",
							"vp",
							"owner",
							"founder"
						] }
					},
					limit: max_results
				})
			});
			if (!resp.ok) return {
				error: `Blitz API error: ${resp.status}`,
				leads: [],
				count: 0
			};
			const leads = ((await resp.json())?.data || []).map((r) => ({
				name: r.name || "",
				company: r.company || "",
				email: r.email || null,
				location,
				source: "blitz"
			}));
			return {
				leads,
				count: leads.length
			};
		} catch (err) {
			return {
				error: err.message,
				leads: [],
				count: 0
			};
		}
	}
});
//#endregion
//#region agent/tools/search-prospeo.ts
var search_prospeo_exports = /* @__PURE__ */ __exportAll({ default: () => search_prospeo_default });
var search_prospeo_default = defineTool({
	description: "Search for B2B leads using Prospeo API. Returns contacts with verified emails. Provide business type/query and location.",
	inputSchema: {
		type: "object",
		properties: {
			query: {
				type: "string",
				description: "Business type or job title (e.g. 'restaurant', 'nail salon', 'boulangerie')"
			},
			location: {
				type: "string",
				description: "City or region (e.g. 'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes', 'Lille', 'Strasbourg', 'Nice', 'Montpellier')"
			},
			max_results: {
				type: "number",
				description: "Max results (default 5, max 25)",
				default: 5
			}
		},
		required: ["query", "location"]
	},
	async execute(input) {
		const query = input.query;
		const location = input.location;
		const max_results = Math.min(input.max_results || 5, 25);
		const PROSPEO_KEY = process.env.prospeo_api_key;
		if (!PROSPEO_KEY) return {
			error: "PROSPEO_API_KEY not set",
			leads: [],
			count: 0
		};
		try {
			const resp = await fetch("https://api.prospeo.io/search-person", {
				method: "POST",
				headers: {
					"X-KEY": PROSPEO_KEY,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					page: 1,
					filters: {
						person_search: { query: `${query} ${location}` },
						person_seniority: { include: [
							"Founder/Owner",
							"Director",
							"Manager",
							"VP"
						] },
						person_contact_details: {
							email: ["VERIFIED"],
							operator: "AND"
						},
						max_person_per_company: 1
					}
				})
			});
			if (!resp.ok) return {
				error: `Prospeo API error: ${resp.status}`,
				leads: [],
				count: 0
			};
			const leads = ((await resp.json())?.results || []).slice(0, max_results).map((r) => ({
				name: r.person?.name || `${r.person?.first_name || ""} ${r.person?.last_name || ""}`.trim(),
				company: r.company?.name || r.company?.website || "",
				email: r.person?.email || null,
				location,
				source: "prospeo",
				title: r.person?.job_title || ""
			}));
			return {
				leads,
				count: leads.length
			};
		} catch (err) {
			return {
				error: err.message,
				leads: [],
				count: 0
			};
		}
	}
});
//#endregion
//#region .eve/builds/mrudzgqh-04f710d0-6415-430e-bff4-3287454401fa/host/compiled-artifacts-bootstrap.mjs
installEveWorkflowQueueNamespace("atelier-agent");
const moduleMap$1 = Object.freeze({ "nodes": Object.freeze({ "__root__": Object.freeze({ "modules": Object.freeze({
	"agent.ts": agent_exports,
	"channels/eve.ts": eve_exports,
	"tools/generate-email.ts": generate_email_exports,
	"tools/save-draft.ts": save_draft_exports,
	"tools/search-leads.ts": search_leads_exports,
	"tools/search-prospeo.ts": search_prospeo_exports
}) }) }) });
const metadata$1 = {
	"compile": { "moduleMap": {
		"path": ".output/.eve/compile/module-map.mjs",
		"sha256": "67dd3ffbe348a6d64e14dd600c7653d960e0778535f70417e46e993a42642260"
	} },
	"discovery": {
		"diagnostics": {
			"path": ".output/.eve/discovery/diagnostics.json",
			"sha256": "b26fc8e66ee943f962b1bab4a790f6a611ce7e6738aa29f83ea53b73cc362c63"
		},
		"manifest": {
			"path": ".output/.eve/discovery/agent-discovery-manifest.json",
			"sha256": "3b3a11ac487ecee1c7512aa4c382c0a3311f9b2afedf2c7fa71ca14b47096149"
		},
		"sourceGraphHash": "161fad02d1bcdc58be27d52e1436e9a964e81eaf11f000e8d4abfd22464fb236",
		"summary": {
			"errors": 0,
			"warnings": 0
		}
	},
	"generator": {
		"name": "eve",
		"version": "0.26.1"
	},
	"kind": "eve-compile-metadata",
	"status": "ready",
	"version": 5
};
const manifest$1 = {
	"agentRoot": "C:\\Users\\danap\\atelier-agent\\agent",
	"appRoot": "C:\\Users\\danap\\atelier-agent",
	"channels": [
		{
			"kind": "channel",
			"name": "eve",
			"logicalPath": "channels/eve.ts",
			"method": "GET",
			"urlPath": "/eve/v1/info",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
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
			"method": "POST",
			"urlPath": "/eve/v1/session/:sessionId/cancel",
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
	"extensionMounts": [],
	"subagentEdges": [],
	"subagents": [],
	"version": 36
};
function installCompiledArtifactsBootstrap$1() {
	installBundledCompiledArtifacts({
		manifest: manifest$1,
		metadata: metadata$1,
		moduleMap: moduleMap$1
	});
}
installCompiledArtifactsBootstrap$1();
const POST = ba(Buffer.from([
	"Z2xvYmFsVGhpcy5fX3ByaXZhdGVfd29ya2Zsb3dzID0gbmV3IE1hcCgpOwovLyNyZWdpb24gZGlzdC9zcmMvc2hhcmVkL2d1YXJkcy5qcwpmdW5jdGlvbiBpc09iamVjdChlKSB7CglyZXR1cm4gdHlwZW9mIGUgPT0gYG9iamVjdGAgJiYgISFlICYmICFBcnJheS5pc0FycmF5KGUpOwp9CmZ1bmN0aW9uIGlzTm9uRW1wdHlTdHJpbmcoZSkgewoJcmV0dXJuIHR5cGVvZiBlID09IGBzdHJpbmdgICYmIGUubGVuZ3RoID4gMDsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL3NoYXJlZC9lcnJvcnMuanMKZnVuY3Rpb24gdG9FcnJvck1lc3NhZ2UodCkgewoJcmV0dXJuIHQgaW5zdGFuY2VvZiBFcnJvciA/IHQubWVzc2FnZSA6IHR5cGVvZiB0ID09IGBzdHJpbmdgID8gdCA6IHQgPT0gbnVsbCA/IFN0cmluZyh0KSA6IGlzT2JqZWN0KHQpID8gdHlwZW9mIHQubWVzc2FnZSA9PSBgc3RyaW5nYCAmJiB0Lm1lc3NhZ2UubGVuZ3RoID4gMCA/IHQubWVzc2FnZSA6IHNhZmVKc29uU3RyaW5naWZ5KHQpIDogU3RyaW5nKHQpOwp9CmZ1bmN0aW9uIHNhZmVKc29uU3RyaW5naWZ5KGUpIHsKCXRyeSB7CgkJcmV0dXJuIEpTT04uc3RyaW5naWZ5KGUpID8/IFN0cmluZyhlKTsKCX0gY2F0Y2ggewoJCXJldHVybiBTdHJpbmcoZSk7Cgl9Cn0KbmV3IFRleHRFbmNvZGVyKCk7Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvcnVudGltZS9hY3Rpb25zL2tleXMuanMKZnVuY3Rpb24gZ2V0UnVudGltZUFjdGlvblJlc3VsdEtleShlKSB7Cglzd2l0Y2ggKGUua2luZCkgewoJCWNhc2UgYGxvYWQtc2tpbGwtcmVzdWx0YDogcmV0dXJuIGBydW50aW1lLWFjdGlvbjpsb2FkLXNraWxsOiR7ZS5jYWxsSWR9YDsKCQljYXNlIGBzdWJhZ2VudC1yZXN1bHRgOiByZXR1cm4gYHN1YmFnZW50LWNhbGw6JHtlLnN1YmFnZW50TmFtZX06JHtlLmNhbGxJZH1gOwoJCWNhc2UgYHRvb2wtcmVzdWx0YDogcmV0dXJuIGB0b29sLWNhbGw6JHtlLnRvb2xOYW1lfToke2UuY2FsbElkfWA7Cgl9Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9oYXJuZXNzL3J1bnRpbWUtYWN0aW9ucy5qcwpmdW5jdGlvbiByZXNvbHZlUnVudGltZUFjdGlvblJlc3VsdHNGb3JLZXlzKGUpIHsKCWxldCB0ID0gbmV3IFNldChlLnBlbmRpbmdLZXlzKSwgbiA9IG5ldyBNYXAoKTsKCWZvciAobGV0IHIgb2YgZS5yZXN1bHRzKSB7CgkJbGV0IGUgPSBnZXRSdW50aW1lQWN0aW9uUmVzdWx0S2V5KHIpOwoJCXQuaGFzKGUpICYmIG4uc2V0KGUsIHIpOwoJfQoJbGV0IHIgPSBbXTsKCWZvciAobGV0IHQgb2YgZS5wZW5kaW5nS2V5cykgewoJCWxldCBlID0gbi5nZXQodCk7CgkJaWYgKGUgPT09IHZvaWQgMCkgcmV0dXJuOwoJCXIucHVzaChlKTsKCX0KCXJldHVybiByOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL2Rpc3BhdGNoLXJ1bnRpbWUtYWN0aW9ucy1zdGVwLmpzCnZhciBkaXNwYXRjaFJ1bnRpbWVBY3Rpb25zU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjI2LjEvL2Rpc3BhdGNoUnVudGltZUFjdGlvbnNTdGVwIik7Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3dvcmtmbG93LWNhbGxiYWNrLXVybC5qcwpmdW5jdGlvbiByZXNvbHZlVmVyY2VsUHJvZHVjdGlvbkNhbGxiYWNrQmFzZVVybCgpIHsKCXJldHVybiBwcm9jZXNzLmVudi5WRVJDRUxfRU5WID09PSBgcHJvZHVjdGlvbmAgJiYgcHJvY2Vzcy5lbnYuVkVSQ0VMX1BST0pFQ1RfUFJPRFVDVElPTl9VUkwgPyBgaHR0cHM6Ly8ke3Byb2Nlc3MuZW52LlZFUkNFTF9QUk9KRUNUX1BST0RVQ1RJT05fVVJMfWAgOiBudWxsOwp9CmZ1bmN0aW9uIHJlc29sdmVXb3JrZmxvd0NhbGxiYWNrQmFzZVVybChlKSB7CglsZXQgdCA9IHByb2Nlc3MuZW52LldPUktGTE9XX0xPQ0FMX0JBU0VfVVJMPy50cmltKCkgfHwgdm9pZCAwOwoJcmV0dXJuIChyZXNvbHZlVmVyY2VsUHJvZHVjdGlvbkNhbGxiYWNrQmFzZVVybCgpID8/IHQgPz8gZSkucmVwbGFjZSgvXC8kLywgYGApOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3dvcmtmbG93LXN0ZXBzLmpzCnZhciB0dXJuU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjI2LjEvL3R1cm5TdGVwIik7CnZhciByb3V0ZVByb3hpZWREZWxpdmVyU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjI2LjEvL3JvdXRlUHJveGllZERlbGl2ZXJTdGVwIik7CnZhciBkaXNwYXRjaFR1cm5TdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMjYuMS8vZGlzcGF0Y2hUdXJuU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2ludGVybmFsL3dvcmtmbG93LWJ1bmRsZS93b3JrZmxvdy1jb3JlLXNoaW0uanMKY29uc3QgV09SS0ZMT1dfQ09OVEVYVF9TWU1CT0wgPSBTeW1ib2wuZm9yKGBXT1JLRkxPV19DT05URVhUYCksIFdPUktGTE9XX0NSRUFURV9IT09LID0gU3ltYm9sLmZvcihgV09SS0ZMT1dfQ1JFQVRFX0hPT0tgKSwgV09SS0ZMT1dfR0VUX1NUUkVBTV9JRCA9IFN5bWJvbC5mb3IoYFdPUktGTE9XX0dFVF9TVFJFQU1fSURgKSwgU1RSRUFNX05BTUVfU1lNQk9MID0gU3ltYm9sLmZvcihgV09SS0ZMT1dfU1RSRUFNX05BTUVgKSwgd29ya2Zsb3dHbG9iYWwgPSBnbG9iYWxUaGlzOwpmdW5jdGlvbiBjcmVhdGVIb29rKGUpIHsKCWxldCBuID0gd29ya2Zsb3dHbG9iYWxbV09SS0ZMT1dfQ1JFQVRFX0hPT0tdOwoJaWYgKG4gPT09IHZvaWQgMCkgdGhyb3cgRXJyb3IoImBjcmVhdGVIb29rKClgIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgYSB3b3JrZmxvdyBmdW5jdGlvbiIpOwoJcmV0dXJuIG4oZSk7Cn0KZnVuY3Rpb24gZ2V0V29ya2Zsb3dNZXRhZGF0YSgpIHsKCWxldCB0ID0gd29ya2Zsb3dHbG9iYWxbV09SS0ZMT1dfQ09OVEVYVF9TWU1CT0xdOwoJaWYgKHQgPT09IHZvaWQgMCkgdGhyb3cgRXJyb3IoImBnZXRXb3JrZmxvd01ldGFkYXRhKClgIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgYSB3b3JrZmxvdyBvciBzdGVwIGZ1bmN0aW9uIik7CglyZXR1cm4gdDsKfQpmdW5jdGlvbiBnZXRXcml0YWJsZShlID0ge30pIHsKCWxldCB0ID0gd29ya2Zsb3dHbG9iYWxbV09SS0ZMT1dfR0VUX1NUUkVBTV9JRF07CglpZiAodCA9PT0gdm9pZCAwKSB0aHJvdyBFcnJvcigiYGdldFdyaXRhYmxlKClgIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgYSB3b3JrZmxvdyBmdW5jdGlvbiIpOwoJbGV0IHIgPSB0KGUubmFtZXNwYWNlKTsKCXJldHVybiBPYmplY3QuY3JlYXRlKGdsb2JhbFRoaXMuV3JpdGFibGVTdHJlYW0ucHJvdG90eXBlLCB7IFtTVFJFQU1fTkFNRV9TWU1CT0xdOiB7CgkJdmFsdWU6IHIsCgkJd3JpdGFibGU6ICExCgl9IH0pOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL2hvb2stb3duZXJzaGlwLmpzCmFzeW5jIGZ1bmN0aW9uIGNsYWltSG9va093bmVyc2hpcChlKSB7CglsZXQgdDsKCXRyeSB7CgkJdCA9IGF3YWl0IGUuZ2V0Q29uZmxpY3QoKTsKCX0gY2F0Y2ggKHQpIHsKCQlyZXR1cm4gYXdhaXQgZGlzcG9zZUFuZFRocm93KGUsIG5vcm1hbGl6ZUhvb2tDbGFpbUVycm9yKHQsIGUudG9rZW4pKTsKCX0KCWlmICh0ICE9PSBudWxsKSByZXR1cm4gYXdhaXQgZGlzcG9zZUFuZFRocm93KGUsIGNyZWF0ZUhvb2tDb25mbGljdEVycm9yKGUudG9rZW4sIHQucnVuSWQpKTsKfQphc3luYyBmdW5jdGlvbiBjbG9zZUhvb2tJdGVyYXRvcihlKSB7Cgl0eXBlb2YgZS5yZXR1cm4gPT0gYGZ1bmN0aW9uYCAmJiBhd2FpdCBlLnJldHVybih2b2lkIDApOwp9CmFzeW5jIGZ1bmN0aW9uIGRpc3Bvc2VIb29rKGUpIHsKCWxldCB0ID0gZS5kaXNwb3NlOwoJaWYgKHR5cGVvZiB0ID09IGBmdW5jdGlvbmApIHsKCQlhd2FpdCB0LmNhbGwoZSk7CgkJcmV0dXJuOwoJfQoJbGV0IG4gPSBlW1N5bWJvbC5kaXNwb3NlXTsKCXR5cGVvZiBuID09IGBmdW5jdGlvbmAgJiYgYXdhaXQgbi5jYWxsKGUpOwp9CmFzeW5jIGZ1bmN0aW9uIGRpc3Bvc2VBbmRUaHJvdyhlLCB0KSB7Cgl0cnkgewoJCWF3YWl0IGRpc3Bvc2VIb29rKGUpOwoJfSBjYXRjaCB7fQoJdGhyb3cgdDsKfQpmdW5jdGlvbiBub3JtYWxpemVIb29rQ2xhaW1FcnJvcihlLCB0KSB7CglyZXR1cm4gaXNIb29rQ29uZmxpY3RFcnJvcihlKSA/IGNyZWF0ZUhvb2tDb25mbGljdEVycm9yKHR5cGVvZiBlLnRva2VuID09IGBzdHJpbmdgID8gZS50b2tlbiA6IHQsIHR5cGVvZiBlLmNvbmZsaWN0aW5nUnVuSWQgPT0gYHN0cmluZ2AgPyBlLmNvbmZsaWN0aW5nUnVuSWQgOiB2b2lkIDApIDogZTsKfQpmdW5jdGlvbiBpc0hvb2tDb25mbGljdEVycm9yKGUpIHsKCXJldHVybiB0eXBlb2YgZSA9PSBgb2JqZWN0YCAmJiAhIWUgJiYgYG5hbWVgIGluIGUgJiYgZS5uYW1lID09PSBgSG9va0NvbmZsaWN0RXJyb3JgOwp9CmZ1bmN0aW9uIGNyZWF0ZUhvb2tDb25mbGljdEVycm9yKGUsIHQpIHsKCWxldCBuID0gdCA9PT0gdm9pZCAwID8gYGAgOiBgIChydW4gIiR7dH0iKWA7CglyZXR1cm4gT2JqZWN0LmFzc2lnbihFcnJvcihgSG9vayB0b2tlbiAiJHtlfSIgaXMgYWxyZWFkeSBpbiB1c2Uke259YCksIHsKCQljb25mbGljdGluZ1J1bklkOiB0LAoJCW5hbWU6IGBIb29rQ29uZmxpY3RFcnJvcmAsCgkJdG9rZW46IGUKCX0pOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3dvcmtmbG93LWVycm9ycy5qcwpmdW5jdGlvbiBub3JtYWxpemVTZXJpYWxpemFibGVFcnJvcihlKSB7CglyZXR1cm4gZSBpbnN0YW5jZW9mIEVycm9yID8gewoJCS4uLk9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhlKSksCgkJY2F1c2U6IGUuY2F1c2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG5vcm1hbGl6ZVNlcmlhbGl6YWJsZUVycm9yKGUuY2F1c2UpLAoJCW1lc3NhZ2U6IGUubWVzc2FnZSwKCQluYW1lOiBlLm5hbWUsCgkJc3RhY2s6IGUuc3RhY2sKCX0gOiBlOwp9CmZ1bmN0aW9uIHJlYnVpbGRTZXJpYWxpemFibGVFcnJvcihlKSB7CglpZiAoIWlzUmVjb3JkKGUpKSByZXR1cm4gRXJyb3IoU3RyaW5nKGUpKTsKCWxldCB0ID0gdHlwZW9mIGUubWVzc2FnZSA9PSBgc3RyaW5nYCA/IGUubWVzc2FnZSA6IFN0cmluZyhlKSwgbiA9IEVycm9yKHQpOwoJdHlwZW9mIGUubmFtZSA9PSBgc3RyaW5nYCAmJiAobi5uYW1lID0gZS5uYW1lKSwgdHlwZW9mIGUuc3RhY2sgPT0gYHN0cmluZ2AgJiYgKG4uc3RhY2sgPSBlLnN0YWNrKSwgYGNhdXNlYCBpbiBlICYmIChuLmNhdXNlID0gaXNSZWNvcmQoZS5jYXVzZSkgPyByZWJ1aWxkU2VyaWFsaXphYmxlRXJyb3IoZS5jYXVzZSkgOiBlLmNhdXNlKTsKCWxldCByID0gbjsKCWZvciAobGV0IFt0LCBuXSBvZiBPYmplY3QuZW50cmllcyhlKSkgdCA9PT0gYG1lc3NhZ2VgIHx8IHQgPT09IGBuYW1lYCB8fCB0ID09PSBgc3RhY2tgIHx8IHQgPT09IGBjYXVzZWAgfHwgKHJbdF0gPSBuKTsKCXJldHVybiBuOwp9CmZ1bmN0aW9uIGlzUmVjb3JkKGUpIHsKCXJldHVybiB0eXBlb2YgZSA9PSBgb2JqZWN0YCAmJiAhIWU7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vdHVybi1jb250cm9sLXByb3RvY29sLmpzCnZhciBzZW5kVHVybkNvbnRyb2xTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMjYuMS8vc2VuZFR1cm5Db250cm9sU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9jYW5jZWwtZGVzY2VuZGFudC10dXJucy1zdGVwLmpzCnZhciBjYW5jZWxEZXNjZW5kYW50VHVybnNTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMjYuMS8vY2FuY2VsRGVzY2VuZGFudFR1cm5zU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9kaXNwYXRjaC13b3JrZmxvdy1ydW50aW1lLWFjdGlvbnMtc3RlcC5qcwp2YXIgZGlzcGF0Y2hXb3JrZmxvd1J1bnRpbWVBY3Rpb25zU3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjI2LjEvL2Rpc3BhdGNoV29ya2Zsb3dSdW50aW1lQWN0aW9uc1N0ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vZHVyYWJsZS1zZXNzaW9uLW1pZ3JhdGlvbnMvY2hhaW4uanMKZnVuY3Rpb24gcnVuTWlncmF0aW9uQ2hhaW4oZSkgewoJaWYgKHR5cGVvZiBlLnZhbHVlICE9IGBvYmplY3RgIHx8IGUudmFsdWUgPT09IG51bGwpIHRocm93IEVycm9yKGAke2UubGFiZWx9OiB2YWx1ZSBoYXMgbm8gbnVtZXJpYyAidmVyc2lvbiIgZmllbGQuYCk7CglsZXQgdCA9IGUudmFsdWUudmVyc2lvbiwgbjsKCWlmICh0eXBlb2YgdCA9PSBgbnVtYmVyYCkgbiA9IGUudmFsdWU7CgllbHNlIGlmICghKGB2ZXJzaW9uYCBpbiBlLnZhbHVlKSAmJiBlLmluaXRpYWxWZXJzaW9uICE9PSB2b2lkIDApIG4gPSB7CgkJLi4uZS52YWx1ZSwKCQl2ZXJzaW9uOiBlLmluaXRpYWxWZXJzaW9uCgl9OwoJZWxzZSB0aHJvdyBFcnJvcihgJHtlLmxhYmVsfTogdmFsdWUgaGFzIG5vIG51bWVyaWMgInZlcnNpb24iIGZpZWxkLmApOwoJbGV0IHIgPSBlLmluaXRpYWxWZXJzaW9uID8/IDE7CglpZiAoIU51bWJlci5pc0ludGVnZXIobi52ZXJzaW9uKSB8fCBuLnZlcnNpb24gPCByKSB0aHJvdyBFcnJvcihgJHtlLmxhYmVsfTogdmVyc2lvbiAke24udmVyc2lvbn0gaXMgbm90IGEgcG9zaXRpdmUgaW50ZWdlci5gKTsKCWlmIChuLnZlcnNpb24gPiBlLnRhcmdldFZlcnNpb24pIHRocm93IEVycm9yKGAke2UubGFiZWx9OiBlbmNvdW50ZXJlZCB2ZXJzaW9uICR7bi52ZXJzaW9ufSwgd2hpY2ggaXMgbmV3ZXIgdGhhbiB0aGUgc3VwcG9ydGVkIHZlcnNpb24gJHtlLnRhcmdldFZlcnNpb259LiBUaGlzIHVzdWFsbHkgaW5kaWNhdGVzIHRoZSB3aXJlIHdhcyB3cml0dGVuIGJ5IGEgbmV3ZXIgZXZlIGRlcGxveW1lbnQgdGhhbiB0aGUgb25lIHJlYWRpbmcgaXQuYCk7Cglmb3IgKDsgbi52ZXJzaW9uIDwgZS50YXJnZXRWZXJzaW9uOykgewoJCWxldCB0ID0gZS5taWdyYXRpb25zLmZpbmQoKGUpID0+IGUuZnJvbSA9PT0gbi52ZXJzaW9uKTsKCQlpZiAoIXQpIHRocm93IEVycm9yKGAke2UubGFiZWx9OiBubyBtaWdyYXRpb24gcmVnaXN0ZXJlZCBmb3IgdmVyc2lvbiAke24udmVyc2lvbn0g4oaSICR7bi52ZXJzaW9uICsgMX0uYCk7CgkJaWYgKHQudG8gIT09IHQuZnJvbSArIDEpIHRocm93IEVycm9yKGAke2UubGFiZWx9OiBtaWdyYXRpb24gJHt0LmZyb219IOKGkiAke3QudG99IG11c3Qgc3RlcCBleGFjdGx5IG9uZSB2ZXJzaW9uIGF0IGEgdGltZS5gKTsKCQlsZXQgciA9IHQubWlncmF0ZShuKTsKCQlpZiAoci52ZXJzaW9uICE9PSB0LnRvKSB0aHJvdyBFcnJvcihgJHtlLmxhYmVsfTogbWlncmF0aW9uICR7dC5mcm9tfSDihpIgJHt0LnRvfSBwcm9kdWNlZCBhIHZhbHVlIHdpdGggdmVyc2lvbiAke3IudmVyc2lvbn0uYCk7CgkJbiA9IHI7Cgl9CglyZXR1cm4gbjsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9kdXJhYmxlLXNlc3Npb24tbWlncmF0aW9ucy90dXJuLXdvcmtmbG93LXYwLXRvLXYxLmpzCmNvbnN0IHR1cm5Xb3JrZmxvd0lucHV0VjBUb1YxID0gewoJZnJvbTogMCwKCW1pZ3JhdGUoZSkgewoJCWlmICghaXNQcmVWZXJzaW9uVHVybldvcmtmbG93SW5wdXQoZSkpIHRocm93IEVycm9yKGB0dXJuIHdvcmtmbG93IGlucHV0OiB2ZXJzaW9uIDAgdmFsdWUgaXMgbm90IGEgcmVjb2duaXplZCBwcmUtdmVyc2lvbiBzaGFwZS5gKTsKCQlyZXR1cm4gewoJCQljYXBhYmlsaXRpZXM6IGUuY2FwYWJpbGl0aWVzLAoJCQljb21wbGV0aW9uVG9rZW46IGUuY29tcGxldGlvblRva2VuLAoJCQltb2RlOiBlLm1vZGUsCgkJCXN0ZXBJbnB1dDogewoJCQkJaW5wdXQ6IGUuZGVsaXZlcnksCgkJCQlwYXJlbnRXcml0YWJsZTogZS5wYXJlbnRXcml0YWJsZSwKCQkJCXNlcmlhbGl6ZWRDb250ZXh0OiBlLnNlcmlhbGl6ZWRDb250ZXh0LAoJCQkJc2Vzc2lvblN0YXRlOiBlLnNlc3Npb25TdGF0ZQoJCQl9LAoJCQl2ZXJzaW9uOiAxCgkJfTsKCX0sCgl0bzogMQp9OwpmdW5jdGlvbiBpc1ByZVZlcnNpb25UdXJuV29ya2Zsb3dJbnB1dChlKSB7CglyZXR1cm4gdHlwZW9mIGUgPT0gYG9iamVjdGAgJiYgISFlICYmIGBkZWxpdmVyeWAgaW4gZTsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9kdXJhYmxlLXNlc3Npb24tbWlncmF0aW9ucy90dXJuLXdvcmtmbG93LmpzCmNvbnN0IHR1cm5Xb3JrZmxvd0lucHV0TWlncmF0aW9ucyA9IFt0dXJuV29ya2Zsb3dJbnB1dFYwVG9WMV07CmZ1bmN0aW9uIG1pZ3JhdGVUdXJuV29ya2Zsb3dJbnB1dCh0KSB7CglyZXR1cm4gcnVuTWlncmF0aW9uQ2hhaW4oewoJCWluaXRpYWxWZXJzaW9uOiAwLAoJCWxhYmVsOiBgdHVybiB3b3JrZmxvdyBpbnB1dGAsCgkJbWlncmF0aW9uczogdHVybldvcmtmbG93SW5wdXRNaWdyYXRpb25zLAoJCXRhcmdldFZlcnNpb246IDEsCgkJdmFsdWU6IHQKCX0pOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL2RlbGl2ZXItcGF5bG9hZHMuanMKZnVuY3Rpb24gY29hbGVzY2VEZWxpdmVyUGF5bG9hZHMoZSkgewoJaWYgKGUubGVuZ3RoID09PSAwKSByZXR1cm4ge307CglpZiAoZS5sZW5ndGggPT09IDEpIHJldHVybiBlWzBdID8/IHt9OwoJbGV0IHQgPSB7fSwgbiA9IFtdOwoJZm9yIChsZXQgciBvZiBlKSB7CgkJZm9yIChsZXQgW2UsIG5dIG9mIE9iamVjdC5lbnRyaWVzKHIpKSBlICE9PSBgaW5wdXRSZXNwb25zZXNgICYmIG4gIT09IHZvaWQgMCAmJiAodFtlXSA9IG4pOwoJCXIuaW5wdXRSZXNwb25zZXMgIT09IHZvaWQgMCAmJiBuLnB1c2goLi4uci5pbnB1dFJlc3BvbnNlcyk7Cgl9CglyZXR1cm4gbi5sZW5ndGggPiAwICYmICh0LmlucHV0UmVzcG9uc2VzID0gbiksIHQ7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vcm91dGUtY2hpbGQtZGVsaXZlcnkuanMKYXN5bmMgZnVuY3Rpb24gcm91dGVEZWxpdmVyVG9DaGlsZHJlbihlKSB7CglsZXQgdCA9IGNvYWxlc2NlRGVsaXZlclBheWxvYWRzKGUucGF5bG9hZHMpOwoJcmV0dXJuIGUuc2Vzc2lvblN0YXRlLmhhc1Byb3h5SW5wdXRSZXF1ZXN0cyA/IChhd2FpdCByb3V0ZVByb3hpZWREZWxpdmVyU3RlcCh7CgkJYXV0aDogZS5hdXRoLAoJCXBhcmVudFdyaXRhYmxlOiBlLnBhcmVudFdyaXRhYmxlLAoJCXBheWxvYWQ6IHQsCgkJc2Vzc2lvblN0YXRlOiBlLnNlc3Npb25TdGF0ZQoJfSkpLnJlbWFpbmRlciA6IHQ7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vc3ViYWdlbnQtZXZlbnQtcHJveHktc3RlcC5qcwp2YXIgcnVuUHJveHlTdWJhZ2VudEV2ZW50U3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjI2LjEvL3J1blByb3h5U3ViYWdlbnRFdmVudFN0ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vdHVybi1jYW5jZWxsYXRpb24tdG9rZW4uanMKZnVuY3Rpb24gc2Vzc2lvbkNhbmNlbEhvb2tUb2tlbihlKSB7CglyZXR1cm4gYCR7ZX06Y2FuY2VsYDsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2hhcm5lc3MvdHVybi1jYW5jZWxsYXRpb24uanMKY29uc3QgVFVSTl9DQU5DRUxMRURfRVJST1JfTkFNRSA9IGBUdXJuQ2FuY2VsbGVkRXJyb3JgOwp2YXIgVHVybkNhbmNlbGxlZEVycm9yID0gY2xhc3MgZXh0ZW5kcyBFcnJvciB7Cgljb25zdHJ1Y3Rvcih0ID0gYFRoZSB0dXJuIHdhcyBjYW5jZWxsZWQuYCkgewoJCXN1cGVyKHQpLCB0aGlzLm5hbWUgPSBUVVJOX0NBTkNFTExFRF9FUlJPUl9OQU1FOwoJfQp9OwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi90dXJuLWNhbmNlbGxhdGlvbi1jb250cm9sLmpzCmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVR1cm5DYW5jZWxsYXRpb25Db250cm9sKHIpIHsKCWxldCBpID0gY3JlYXRlSG9vayh7IHRva2VuOiBzZXNzaW9uQ2FuY2VsSG9va1Rva2VuKHIuc2Vzc2lvbklkKSB9KSwgYSA9IGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCk7Cgl0cnkgewoJCWF3YWl0IGNsYWltSG9va093bmVyc2hpcChpKTsKCX0gY2F0Y2ggKGUpIHsKCQlpZiAoaXNIb29rQ29uZmxpY3RFcnJvcihlKSkgcmV0dXJuOwoJCXRocm93IGU7Cgl9CglsZXQgbyA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKSwgcyA9IGNvbnN1bWVNYXRjaGluZ0NhbmNlbChhLCByLmV4cGVjdGVkVHVybklkKS50aGVuKCgpID0+IChvLmFib3J0KG5ldyBUdXJuQ2FuY2VsbGVkRXJyb3IoKSksIGBjYW5jZWxgKSksIGMgPSAhMTsKCXJldHVybiB7CgkJc2lnbmFsOiBvLnNpZ25hbCwKCQlyZXF1ZXN0ZWQ6IHMsCgkJYXN5bmMgZGlzcG9zZSgpIHsKCQkJYyB8fCAoYyA9ICEwLCBhd2FpdCBkaXNwb3NlSG9vayhpKSk7CgkJfQoJfTsKfQphc3luYyBmdW5jdGlvbiBjb25zdW1lTWF0Y2hpbmdDYW5jZWwoZSwgdCkgewoJZm9yICg7OykgewoJCWxldCBuID0gYXdhaXQgZS5uZXh0KCk7CgkJaWYgKG4uZG9uZSkgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKCgpID0+IHt9KTsKCQlpZiAobWF0Y2hlc0FjdGl2ZVR1cm4obi52YWx1ZSwgdCkpIHJldHVybjsKCX0KfQpmdW5jdGlvbiBtYXRjaGVzQWN0aXZlVHVybihlLCB0KSB7CglpZiAodHlwZW9mIGUgIT0gYG9iamVjdGAgfHwgIWUpIHJldHVybiAhMDsKCWxldCBuID0gZS50dXJuSWQ7CglyZXR1cm4gbiA9PT0gdm9pZCAwIHx8IG4gPT09IHQ7Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vdHVybi1leGVjdXRpb24tY3Vyc29yLmpzCnZhciBUdXJuRXhlY3V0aW9uQ3Vyc29yID0gY2xhc3MgewoJY29udHJvbFRva2VuOwoJcGFyZW50V3JpdGFibGU7CgljdXJyZW50U2VyaWFsaXplZENvbnRleHQ7CgljdXJyZW50U2Vzc2lvblN0YXRlOwoJbGFzdFJlcG9ydGVkQ29udGludWF0aW9uVG9rZW47Cgljb25zdHJ1Y3RvcihlKSB7CgkJdGhpcy5jb250cm9sVG9rZW4gPSBlLmNvbnRyb2xUb2tlbiwgdGhpcy5jdXJyZW50U2VyaWFsaXplZENvbnRleHQgPSBlLnNlcmlhbGl6ZWRDb250ZXh0LCB0aGlzLmN1cnJlbnRTZXNzaW9uU3RhdGUgPSBlLnNlc3Npb25TdGF0ZSwgdGhpcy5sYXN0UmVwb3J0ZWRDb250aW51YXRpb25Ub2tlbiA9IGUuc2Vzc2lvblN0YXRlLmNvbnRpbnVhdGlvblRva2VuLCB0aGlzLnBhcmVudFdyaXRhYmxlID0gZS5wYXJlbnRXcml0YWJsZTsKCX0KCWdldCBzZXJpYWxpemVkQ29udGV4dCgpIHsKCQlyZXR1cm4gdGhpcy5jdXJyZW50U2VyaWFsaXplZENvbnRleHQ7Cgl9CglnZXQgc2Vzc2lvblN0YXRlKCkgewoJCXJldHVybiB0aGlzLmN1cnJlbnRTZXNzaW9uU3RhdGU7Cgl9Cglhc3luYyBhZG9wdChlKSB7CgkJdGhpcy5zZXRTdGF0ZShlKTsKCQlsZXQgdCA9IGUuc2Vzc2lvblN0YXRlLmNvbnRpbnVhdGlvblRva2VuOwoJCXQgPT09IGBgIHx8IHQgPT09IHRoaXMubGFzdFJlcG9ydGVkQ29udGludWF0aW9uVG9rZW4gfHwgKHRoaXMubGFzdFJlcG9ydGVkQ29udGludWF0aW9uVG9rZW4gPSB0LCBhd2FpdCB0aGlzLnNlbmQoewoJCQljb250aW51YXRpb25Ub2tlbjogdCwKCQkJa2luZDogYHR1cm4tY29udGludWF0aW9uLXRva2VuYAoJCX0pKTsKCX0KCWNyZWF0ZVN0ZXBJbnB1dChlLCB0KSB7CgkJcmV0dXJuIHsKCQkJYWJvcnRTaWduYWw6IHQsCgkJCWlucHV0OiBlLAoJCQlwYXJlbnRXcml0YWJsZTogdGhpcy5wYXJlbnRXcml0YWJsZSwKCQkJc2VyaWFsaXplZENvbnRleHQ6IHRoaXMuY3VycmVudFNlcmlhbGl6ZWRDb250ZXh0LAoJCQlzZXNzaW9uU3RhdGU6IHRoaXMuY3VycmVudFNlc3Npb25TdGF0ZQoJCX07Cgl9Cglhc3luYyBmaW5pc2goZSwgdCwgbikgewoJCXRoaXMuc2V0U3RhdGUoZSksIGF3YWl0IHRoaXMuc2VuZCh7CgkJCWFjdGlvbjogewoJCQkJLi4udCwKCQkJCXNlcmlhbGl6ZWRDb250ZXh0OiB0aGlzLmN1cnJlbnRTZXJpYWxpemVkQ29udGV4dCwKCQkJCXNlc3Npb25TdGF0ZTogdGhpcy5jdXJyZW50U2Vzc2lvblN0YXRlCgkJCX0sCgkJCWJ1ZmZlcmVkRGVsaXZlcmllczogbi5sZW5n",
	"dGggPT09IDAgPyB2b2lkIDAgOiBbLi4ubl0sCgkJCWtpbmQ6IGB0dXJuLXJlc3VsdGAKCQl9KTsKCX0KCWFzeW5jIHNlbmQodCkgewoJCWF3YWl0IHNlbmRUdXJuQ29udHJvbFN0ZXAoewoJCQljb250cm9sVG9rZW46IHRoaXMuY29udHJvbFRva2VuLAoJCQlwYXlsb2FkOiB0CgkJfSk7Cgl9CglzZXRTdGF0ZShlKSB7CgkJdGhpcy5jdXJyZW50U2VyaWFsaXplZENvbnRleHQgPSBlLnNlcmlhbGl6ZWRDb250ZXh0ID8/IHRoaXMuY3VycmVudFNlcmlhbGl6ZWRDb250ZXh0LCB0aGlzLmN1cnJlbnRTZXNzaW9uU3RhdGUgPSBlLnNlc3Npb25TdGF0ZTsKCX0KfTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9oYXJuZXNzL2FjdGl2ZS10dXJuLWlkLmpzCmZ1bmN0aW9uIGFjdGl2ZVR1cm5JZChlKSB7CglyZXR1cm4gZS50dXJuSWQgPT09IGBgID8gYHR1cm5fJHtlLnNlcXVlbmNlfWAgOiBlLnR1cm5JZDsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi90dXJuLXdvcmtmbG93LmpzCmNvbnN0IFRBU0tfTU9ERV9XQUlUX0VSUk9SX01FU1NBR0UgPSAiVGFzayBtb2RlIGNhbm5vdCB3YWl0IGZvciBmb2xsb3ctdXAgaW5wdXQgKGBuZXh0OiBudWxsYCkuIjsKZnVuY3Rpb24gY2FuU2V0dGxlQ2FuY2VsbGVkVHVybkFzUGFyayhlKSB7CglyZXR1cm4gZS5tb2RlID09PSBgY29udmVyc2F0aW9uYCB8fCBlLnN0ZXBJbnB1dC5zZXNzaW9uU3RhdGUuY29udGludWF0aW9uVG9rZW4gIT09IGBgOwp9CmFzeW5jIGZ1bmN0aW9uIHR1cm5Xb3JrZmxvdyhlKSB7CglsZXQgdCA9IG1pZ3JhdGVUdXJuV29ya2Zsb3dJbnB1dChlKTsKCXJldHVybiB0LmRyaXZlckNhcGFiaWxpdGllcz8udHVybkluYm94ID09PSAhMCA/IHJ1blR1cm5Pd25lZFdvcmtmbG93KHQpIDogcnVuTGVnYWN5VHVybldvcmtmbG93KHQpOwp9CmFzeW5jIGZ1bmN0aW9uIHJ1blR1cm5Pd25lZFdvcmtmbG93KGUpIHsKCWxldCBjID0gY3JlYXRlSG9vayh7IHRva2VuOiBgJHtlLmNvbXBsZXRpb25Ub2tlbn06aW5ib3hgIH0pLCBsID0gY1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKSwgdSA9IG5ldyBUdXJuRXhlY3V0aW9uQ3Vyc29yKHsKCQljb250cm9sVG9rZW46IGUuY29tcGxldGlvblRva2VuLAoJCXBhcmVudFdyaXRhYmxlOiBlLnN0ZXBJbnB1dC5wYXJlbnRXcml0YWJsZSwKCQlzZXJpYWxpemVkQ29udGV4dDogZS5zdGVwSW5wdXQuc2VyaWFsaXplZENvbnRleHQsCgkJc2Vzc2lvblN0YXRlOiBlLnN0ZXBJbnB1dC5zZXNzaW9uU3RhdGUKCX0pLCBkID0gMCwgbmV4dERlbGl2ZXJ5UmVxdWVzdElkID0gKCkgPT4gYCR7Yy50b2tlbn06ZGVsaXZlcnk6JHtTdHJpbmcoZCsrKX1gLCBmID0gW10sIHAgPSBlLnN0ZXBJbnB1dC5pbnB1dCwgbSA9ICExLCBoOwoJdHJ5IHsKCQl0cnkgewoJCQlhd2FpdCBjbGFpbUhvb2tPd25lcnNoaXAoYyksIG0gPSAhMDsKCQl9IGNhdGNoIChlKSB7CgkJCWlmIChpc0hvb2tDb25mbGljdEVycm9yKGUpKSByZXR1cm47CgkJCXRocm93IGU7CgkJfQoJCWZvciAoZS5kcml2ZXJDYXBhYmlsaXRpZXM/LmNhbmNlbGxlZFR1cm5TZXR0bGUgPT09ICEwICYmIGNhblNldHRsZUNhbmNlbGxlZFR1cm5Bc1BhcmsoZSkgJiYgKGggPSBhd2FpdCBjcmVhdGVUdXJuQ2FuY2VsbGF0aW9uQ29udHJvbCh7CgkJCWV4cGVjdGVkVHVybklkOiBhY3RpdmVUdXJuSWQoZS5zdGVwSW5wdXQuc2Vzc2lvblN0YXRlLmVtaXNzaW9uU3RhdGUpLAoJCQlzZXNzaW9uSWQ6IGUuc3RlcElucHV0LnNlc3Npb25TdGF0ZS5zZXNzaW9uSWQKCQl9KSk7OykgewoJCQlsZXQgaSA9IGF3YWl0IHR1cm5TdGVwKHUuY3JlYXRlU3RlcElucHV0KHAsIGg/LnNpZ25hbCkpOwoJCQlpZiAoaS5hY3Rpb24gPT09IGBjYW5jZWxsZWRgKSB7CgkJCQlhd2FpdCBjYW5jZWxEZXNjZW5kYW50VHVybnNTdGVwKHsKCQkJCQlzZXJpYWxpemVkQ29udGV4dDogdS5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQlzZXNzaW9uU3RhdGU6IHUuc2Vzc2lvblN0YXRlCgkJCQl9KSwgYXdhaXQgaD8uZGlzcG9zZSgpLCBhd2FpdCB1LmZpbmlzaCh7IHNlc3Npb25TdGF0ZTogdS5zZXNzaW9uU3RhdGUgfSwgewoJCQkJCWNhbmNlbGxlZDogITAsCgkJCQkJa2luZDogYHBhcmtgCgkJCQl9LCBmKTsKCQkJCXJldHVybjsKCQkJfQoJCQlpZiAoaS5hY3Rpb24gPT09IGBkb25lYCkgewoJCQkJYXdhaXQgaD8uZGlzcG9zZSgpLCBhd2FpdCB1LmZpbmlzaChpLCB7CgkJCQkJa2luZDogYGRvbmVgLAoJCQkJCW91dHB1dDogaS5vdXRwdXQgPz8gYGAsCgkJCQkJaXNFcnJvcjogaS5pc0Vycm9yLAoJCQkJCXVzYWdlOiBpLnVzYWdlCgkJCQl9LCBmKTsKCQkJCXJldHVybjsKCQkJfQoJCQlsZXQgbyA9IGkuYWN0aW9uID09PSBgZGlzcGF0Y2gtd29ya2Zsb3ctcnVudGltZS1hY3Rpb25zYCB8fCBpLmFjdGlvbiA9PT0gYHBhcmtgID8gaS5wZW5kaW5nUnVudGltZUFjdGlvbktleXMgOiB2b2lkIDA7CgkJCWlmIChvICE9PSB2b2lkIDApIHsKCQkJCWF3YWl0IHUuYWRvcHQoaSk7CgkJCQlsZXQgZSA9IGF3YWl0IChpLmFjdGlvbiA9PT0gYGRpc3BhdGNoLXdvcmtmbG93LXJ1bnRpbWUtYWN0aW9uc2AgPyBkaXNwYXRjaFdvcmtmbG93UnVudGltZUFjdGlvbnNTdGVwIDogZGlzcGF0Y2hSdW50aW1lQWN0aW9uc1N0ZXApKHsKCQkJCQljYWxsYmFja0Jhc2VVcmw6IHJlc29sdmVXb3JrZmxvd0NhbGxiYWNrQmFzZVVybChnZXRXb3JrZmxvd01ldGFkYXRhKCkudXJsKSwKCQkJCQlwYXJlbnRDb250aW51YXRpb25Ub2tlbjogYy50b2tlbiwKCQkJCQlwYXJlbnRXcml0YWJsZTogdS5wYXJlbnRXcml0YWJsZSwKCQkJCQlzZXJpYWxpemVkQ29udGV4dDogdS5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQlzZXNzaW9uU3RhdGU6IHUuc2Vzc2lvblN0YXRlCgkJCQl9KTsKCQkJCWF3YWl0IHUuYWRvcHQoZSk7CgkJCQlsZXQgciA9IGF3YWl0IHdhaXRGb3JSdW50aW1lQWN0aW9uUmVzdWx0cyh7CgkJCQkJYnVmZmVyZWREZWxpdmVyaWVzOiBmLAoJCQkJCWNhbmNlbGxhdGlvbjogaCwKCQkJCQljdXJzb3I6IHUsCgkJCQkJaW5ib3hUb2tlbjogYy50b2tlbiwKCQkJCQlpbml0aWFsUmVzdWx0czogZS5yZXN1bHRzLAoJCQkJCWl0ZXJhdG9yOiBsLAoJCQkJCW5leHREZWxpdmVyeVJlcXVlc3RJZCwKCQkJCQlwZW5kaW5nQWN0aW9uS2V5czogbwoJCQkJfSk7CgkJCQlpZiAociA9PT0gYGNhbmNlbGxlZGApIHsKCQkJCQlwID0gdm9pZCAwOwoJCQkJCWNvbnRpbnVlOwoJCQkJfQoJCQkJcCA9IHsKCQkJCQlraW5kOiBgcnVudGltZS1hY3Rpb24tcmVzdWx0YCwKCQkJCQlyZXN1bHRzOiByCgkJCQl9OwoJCQkJY29udGludWU7CgkJCX0KCQkJaWYgKGkuYWN0aW9uID09PSBgcGFya2ApIHsKCQkJCWlmICghKGkuaGFzUGVuZGluZ0F1dGhvcml6YXRpb24gfHwgaS5oYXNQZW5kaW5nSW5wdXRCYXRjaCAmJiBlLmNhcGFiaWxpdGllcz8ucmVxdWVzdElucHV0ID09PSAhMCB8fCBlLm1vZGUgPT09IGBjb252ZXJzYXRpb25gKSkgdGhyb3cgRXJyb3IoVEFTS19NT0RFX1dBSVRfRVJST1JfTUVTU0FHRSk7CgkJCQlhd2FpdCBoPy5kaXNwb3NlKCksIGF3YWl0IHUuZmluaXNoKGksIHsKCQkJCQlhdXRob3JpemF0aW9uTmFtZXM6IGkuYXV0aG9yaXphdGlvbk5hbWVzLAoJCQkJCWtpbmQ6IGBwYXJrYAoJCQkJfSwgZik7CgkJCQlyZXR1cm47CgkJCX0KCQkJYXdhaXQgdS5hZG9wdChpKSwgcCA9IHZvaWQgMDsKCQl9Cgl9IGNhdGNoIChlKSB7CgkJdGhyb3cgYXdhaXQgdS5zZW5kKHsKCQkJZXJyb3I6IG5vcm1hbGl6ZVNlcmlhbGl6YWJsZUVycm9yKGUpLAoJCQlraW5kOiBgdHVybi1lcnJvcmAKCQl9KSwgZTsKCX0gZmluYWxseSB7CgkJaCAhPT0gdm9pZCAwICYmIGF3YWl0IGguZGlzcG9zZSgpLCBtICYmIGF3YWl0IGRpc3Bvc2VIb29rKGMpOwoJfQp9CmFzeW5jIGZ1bmN0aW9uIHdhaXRGb3JSdW50aW1lQWN0aW9uUmVzdWx0cyh0KSB7CglsZXQgbiwgciA9IFsuLi50LmluaXRpYWxSZXN1bHRzXTsKCWZvciAoOzspIHsKCQlsZXQgaSA9IHJlc29sdmVSdW50aW1lQWN0aW9uUmVzdWx0c0ZvcktleXMoewoJCQlwZW5kaW5nS2V5czogdC5wZW5kaW5nQWN0aW9uS2V5cywKCQkJcmVzdWx0czogcgoJCX0pOwoJCWlmIChpICE9PSB2b2lkIDApIHJldHVybiBuICE9PSB2b2lkIDAgJiYgYXdhaXQgdC5jdXJzb3Iuc2VuZCh7CgkJCWtpbmQ6IGB0dXJuLWRlbGl2ZXJ5LWNhbmNlbGxlZGAsCgkJCXJlcXVlc3RJZDogbgoJCX0pLCBpOwoJCXQuY3Vyc29yLnNlc3Npb25TdGF0ZS5oYXNQcm94eUlucHV0UmVxdWVzdHMgJiYgbiA9PT0gdm9pZCAwICYmIChuID0gdC5uZXh0RGVsaXZlcnlSZXF1ZXN0SWQoKSwgYXdhaXQgdC5jdXJzb3Iuc2VuZCh7CgkJCWNvbnRpbnVhdGlvblRva2VuOiB0LmN1cnNvci5zZXNzaW9uU3RhdGUuY29udGludWF0aW9uVG9rZW4sCgkJCWluYm94VG9rZW46IHQuaW5ib3hUb2tlbiwKCQkJa2luZDogYHR1cm4tZGVsaXZlcnktcmVxdWVzdGAsCgkJCXJlcXVlc3RJZDogbgoJCX0pKTsKCQlsZXQgYSA9IHQuaXRlcmF0b3IubmV4dCgpOwoJCWEuY2F0Y2goKCkgPT4ge30pOwoJCWxldCBvID0gYXdhaXQgKHQuY2FuY2VsbGF0aW9uID09PSB2b2lkIDAgPyBhIDogUHJvbWlzZS5yYWNlKFthLCB0LmNhbmNlbGxhdGlvbi5yZXF1ZXN0ZWRdKSk7CgkJaWYgKG8gPT09IGBjYW5jZWxgKSByZXR1cm4gbiAhPT0gdm9pZCAwICYmIGF3YWl0IHQuY3Vyc29yLnNlbmQoewoJCQlraW5kOiBgdHVybi1kZWxpdmVyeS1jYW5jZWxsZWRgLAoJCQlyZXF1ZXN0SWQ6IG4KCQl9KSwgYGNhbmNlbGxlZGA7CgkJaWYgKG8uZG9uZSkgdGhyb3cgRXJyb3IoYFR1cm4gaW5ib3ggY2xvc2VkIGJlZm9yZSBydW50aW1lIGFjdGlvbnMgY29tcGxldGVkLmApOwoJCWxldCBzID0gby52YWx1ZTsKCQlpZiAocy5raW5kID09PSBgcnVudGltZS1hY3Rpb24tcmVzdWx0YCkgewoJCQlyLnB1c2goLi4ucy5yZXN1bHRzKTsKCQkJY29udGludWU7CgkJfQoJCWlmIChzLmtpbmQgPT09IGBzdWJhZ2VudC1pbnB1dC1yZXF1ZXN0YCB8fCBzLmtpbmQgPT09IGBzdWJhZ2VudC1hdXRob3JpemF0aW9uLWV2ZW50YCkgewoJCQlsZXQgZSA9IGF3YWl0IHJ1blByb3h5U3ViYWdlbnRFdmVudFN0ZXAoewoJCQkJaG9va1BheWxvYWQ6IHMsCgkJCQlwYXJlbnRXcml0YWJsZTogdC5jdXJzb3IucGFyZW50V3JpdGFibGUsCgkJCQlzZXJpYWxpemVkQ29udGV4dDogdC5jdXJzb3Iuc2VyaWFsaXplZENvbnRleHQsCgkJCQlzZXNzaW9uU3RhdGU6IHQuY3Vyc29yLnNlc3Npb25TdGF0ZQoJCQl9KTsKCQkJYXdhaXQgdC5jdXJzb3IuYWRvcHQoZSk7CgkJCWNvbnRpbnVlOwoJCX0KCQlpZiAocy5raW5kID09PSBgZHJpdmVyLWRlbGl2ZXJ5YCAmJiBzLnJlcXVlc3RJZCA9PT0gbikgewoJCQlhd2FpdCB0LmN1cnNvci5zZW5kKHsKCQkJCWtpbmQ6IGB0dXJuLWRlbGl2ZXJ5LWFjY2VwdGVkYCwKCQkJCXJlcXVlc3RJZDogcy5yZXF1ZXN0SWQKCQkJfSksIG4gPSB2b2lkIDA7CgkJCWxldCBlID0gYXdhaXQgcm91dGVEZWxpdmVyVG9DaGlsZHJlbih7CgkJCQlhdXRoOiBzLmRlbGl2ZXJ5LmF1dGgsCgkJCQlwYXJlbnRXcml0YWJsZTogdC5jdXJzb3IucGFyZW50V3JpdGFibGUsCgkJCQlwYXlsb2Fkczogcy5kZWxpdmVyeS5wYXlsb2FkcywKCQkJCXNlc3Npb25TdGF0ZTogdC5jdXJzb3Iuc2Vzc2lvblN0YXRlCgkJCX0pOwoJCQllICE9PSB2b2lkIDAgJiYgdC5idWZmZXJlZERlbGl2ZXJpZXMucHVzaCh7CgkJCQkuLi5zLmRlbGl2ZXJ5LAoJCQkJcGF5bG9hZHM6IFtlXQoJCQl9KTsKCQl9Cgl9Cn0KYXN5bmMgZnVuY3Rpb24gcnVuTGVnYWN5VHVybldvcmtmbG93KGUpIHsKCWxldCB0ID0gZS5zdGVwSW5wdXQ7Cgl0cnkgewoJCWZvciAoOzspIHsKCQkJbGV0IG4gPSBhd2FpdCB0dXJuU3RlcCh0KTsKCQkJaWYgKG4uYWN0aW9uID09PSBgZG9uZWApIHsKCQkJCWF3YWl0IHNlbmRUdXJuQ29udHJvbFN0ZXAoewoJCQkJCWNvbnRyb2xUb2tlbjogZS5jb21wbGV0aW9uVG9rZW4sCgkJCQkJcGF5bG9hZDogewoJCQkJCQlhY3Rpb246IHsKCQkJCQkJCWtpbmQ6IGBkb25lYCwKCQkJCQkJCW91dHB1dDogbi5vdXRwdXQgPz8gYGAsCgkJCQkJCQlpc0Vycm9yOiBuLmlzRXJyb3IsCgkJCQkJCQlzZXJpYWxpemVkQ29udGV4dDogbi5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQkJCXNlc3Npb25TdGF0ZTogbi5zZXNzaW9uU3RhdGUsCgkJCQkJCQl1c2FnZTogbi51c2FnZQoJCQkJCQl9LAoJCQkJCQlraW5kOiBgdHVybi1yZXN1bHRgCgkJCQkJfQoJCQkJfSk7CgkJCQlyZXR1cm47CgkJCX0KCQkJaWYgKG4uYWN0aW9uID09PSBgZGlzcGF0Y2gtd29ya2Zsb3ctcnVudGltZS1hY3Rpb25zYCkgewoJCQkJYXdhaXQgc2VuZFR1cm5Db250cm9sU3RlcCh7CgkJCQkJY29udHJvbFRva2VuOiBlLmNvbXBsZXRpb25Ub2tlbiwKCQkJCQlwYXlsb2FkOiB7CgkJCQkJCWFjdGlvbjogewoJCQkJCQkJa2luZDogYGRpc3BhdGNoLXdvcmtmbG93LXJ1bnRpbWUtYWN0aW9uc2AsCgkJCQkJCQlwZW5kaW5nQWN0aW9uS2V5czogbi5wZW5kaW5nUnVudGltZUFjdGlvbktleXMsCgkJCQkJCQlzZXJpYWxpemVkQ29udGV4dDogbi5zZXJpYWxpemVkQ29udGV4dCwKCQkJCQkJCXNlc3Npb25TdGF0ZTogbi5zZXNzaW9uU3RhdGUKCQkJCQkJfSwKCQkJCQkJa2luZDogYHR1cm4tcmVzdWx0YAoJCQkJCX0KCQkJCX0pOwoJCQkJcmV0dXJuOwoJCQl9CgkJCWlmIChuLmFjdGlvbiA9PT0gYHBhcmtgKSB7CgkJCQlsZXQgdCA9IG4ucGVuZGluZ1J1bnRpbWVBY3Rpb25LZXlzOwoJCQkJaWYgKCEodCAhPT0gdm9pZCAwIHx8IG4uaGFzUGVuZGluZ0F1dGhvcml6YXRpb24gfHwgbi5oYXNQZW5kaW5nSW5wdXRCYXRjaCAmJiBlLmNhcGFiaWxpdGllcz8ucmVxdWVzdElucHV0ID09PSAhMCB8fCBlLm1vZGUgPT09IGBjb252ZXJzYXRpb25gKSkgdGhyb3cgRXJyb3IoVEFTS19NT0RFX1dBSVRfRVJST1JfTUVTU0FHRSk7CgkJCQlsZXQgciA9IHQgPT09IHZvaWQgMCA/IHsKCQkJCQlraW5kOiBgcGFya2AsCgkJCQkJc2VyaWFsaXplZENvbnRleHQ6IG4uc2VyaWFsaXplZENvbnRleHQsCgkJCQkJc2Vzc2lvblN0YXRlOiBuLnNlc3Npb25TdGF0ZSwKCQkJCQlhdXRob3JpemF0aW9uTmFtZXM6IG4uYXV0aG9yaXphdGlvbk5hbWVzCgkJCQl9IDogewoJCQkJCWtpbmQ6IGBkaXNwYXRjaC1ydW50aW1lLWFjdGlvbnNgLAoJCQkJCXBlbmRpbmdBY3Rpb25LZXlzOiB0LAoJCQkJCXNlcmlhbGl6ZWRDb250ZXh0OiBuLnNlcmlhbGl6ZWRDb250ZXh0LAoJCQkJCXNlc3Npb25TdGF0ZTogbi5zZXNzaW9uU3RhdGUKCQkJCX07CgkJCQlhd2FpdCBzZW5kVHVybkNvbnRyb2xTdGVwKHsKCQkJCQljb250cm9sVG9rZW46IGUuY29tcGxldGlvblRva2VuLAoJCQkJCXBheWxvYWQ6IHsKCQkJCQkJYWN0aW9uOiByLAoJCQkJCQlraW5kOiBgdHVybi1yZXN1bHRgCgkJCQkJfQoJCQkJfSk7CgkJCQlyZXR1cm47CgkJCX0KCQkJdCA9IHsKCQkJCWlucHV0OiB2b2lkIDAsCgkJCQlwYXJlbnRXcml0YWJsZTogdC5wYXJlbnRXcml0YWJsZSwKCQkJCXNlcmlhbGl6ZWRDb250ZXh0OiBuLnNlcmlhbGl6ZWRDb250ZXh0LAoJCQkJc2Vzc2lvblN0YXRlOiBuLnNlc3Npb25TdGF0ZQoJCQl9OwoJCX0KCX0gY2F0Y2ggKHQpIHsKCQl0aHJvdyBhd2FpdCBzZW5kVHVybkNvbnRyb2xTdGVwKHsKCQkJY29udHJvbFRva2VuOiBlLmNvbXBsZXRpb25Ub2tlbiwKCQkJcGF5bG9hZDogewoJCQkJZXJyb3I6IG5vcm1hbGl6ZVNlcmlhbGl6YWJsZUVycm9yKHQpLAoJCQkJa2luZDogYHR1cm4tZXJyb3JgCgkJCX0KCQl9KSwgdDsKCX0KfQp0dXJuV29ya2Zsb3cud29ya2Zsb3dJZCA9ICJ3b3JrZmxvdy8vZXZlLy90dXJuV29ya2Zsb3ciOwpnbG9iYWxUaGlzLl9fcHJpdmF0ZV93b3JrZmxvd3Muc2V0KCJ3b3JrZmxvdy8vZXZlLy90dXJuV29ya2Zsb3ciLCB0dXJuV29ya2Zsb3cpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2NvbnRleHQva2V5LmpzCmNvbnN0IEtFWV9SRUdJU1RSWV9HTE9CQUxfS0VZID0gU3ltYm9sLmZvcihgZXZlLmNvbnRleHQta2V5LXJlZ2lzdHJ5YCksIGdsb2JhbEtleVJlZ2lzdHJ5Q29udGFpbmVyID0gZ2xvYmFsVGhpczsKZ2xvYmFsS2V5UmVnaXN0cnlDb250YWluZXJbS0VZX1JFR0lTVFJZX0dMT0JBTF9LRVldID09PSB2b2lkIDAgJiYgKGdsb2JhbEtleVJlZ2lzdHJ5Q29udGFpbmVyW0tFWV9SRUdJU1RSWV9HTE9CQUxfS0VZXSA9IG5ldyBNYXAoKSk7CmNvbnN0IGtleVJlZ2lzdHJ5ID0gZ2xvYmFsS2V5UmVnaXN0cnlDb250YWluZXJbS0VZX1JFR0lTVFJZX0dMT0JBTF9LRVldOwp2YXIgQ29udGV4dEtleSA9IGNsYXNzIHsKCW5hbWU7Cgljb2RlYzsKCWNvbnN0cnVjdG9yKGUsIHQgPSB7fSkgewoJCXRoaXMubmFtZSA9IGUsIHRoaXMuY29kZWMgPSB0LmNvZGVjOwoJCWxldCBuID0ga2V5UmVnaXN0cnkuZ2V0KGUpOwoJCWlmIChuICE9PSB2b2lkIDAgJiYgbi5jb2RlYyA9PT0gdm9pZCAwICE9ICh0aGlzLmNvZGVjID09PSB2b2lkIDApKSB0aHJvdyBFcnJvcihgQ29udGV4dEtleSBuYW1lIGNvbGxpc2lvbjogIiR7ZX0iIGlzIGFscmVhZHkgcmVnaXN0ZXJlZCAke24uY29kZWMgPyBgd2l0aGAgOiBgd2l0aG91dGB9IGEgY29kZWMsIGJ1dCBhIGtleSAke3RoaXMuY29kZWMgPyBgd2l0aGAgOiBgd2l0aG91dGB9IGEgY29kZWMgaXMgYmVpbmcgcmVnaXN0ZXJlZCB1bmRlciB0aGUgc2FtZSBuYW1lLiBUaGlzIHNpbGVudGx5IGJyZWFrcyBjb250ZXh0IHNlcmlhbGl6YXRpb24g4oCUIHVzZSBhIGRpc3RpbmN0IG5hbWUuYCk7CgkJa2V5UmVnaXN0cnkuc2V0KGUsIHRoaXMpOwoJfQp9OwpuZXcgQ29udGV4dEtleShgZXZlLmF1dGhgKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5pbml0aWF0b3JBdXRoYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuc2Vzc2lvbklkYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuY29udGludWF0aW9uVG9rZW5gKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9jb250ZXh0L2tleXMuanMKY29uc3QgQ2hhbm5lbFJlcXVlc3RJZEtleSA9IG5ldyBDb250ZXh0S2V5KGBldmUuY2hhbm5lbFJlcXVlc3RJZGApOwpuZXcgQ29udGV4dEtleShgZXZlLmNoYW5uZWxJbnN0cnVtZW50YXRpb25gKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5tb2RlYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUucGFyZW50U2Vzc2lvbmApOwpjb25zdCBTdWJhZ2VudERlcHRoS2V5ID0gbmV3IENvbnRleHRLZXkoYGV2ZS5zdWJhZ2VudERlcHRoYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuY2FwYWJpbGl0aWVzYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuc2Vzc2lvbkNhbGxiYWNrYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuc2Vzc2lvbmApOwpuZXcgQ29udGV4dEtleShgZXZlLnNhbmRib3hgKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5zZXNzaW9uRHluYW1pY01vZGVsUmVmZXJlbmNlYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUudHVybkR5bmFtaWNNb2RlbFJlZmVyZW5jZWApOwpuZXcgQ29udGV4dEtleShgZXZlLmxpdmVTdGVwRHluYW1pY01vZGVsU2VsZWN0aW9uYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUuc2Vzc2lvbkR5bmFtaWNUb29sTWV0YWRhdGFgKTsKbmV3IENvbnRleHRLZXkoYGV2ZS50dXJuRHluYW1pY1Rvb2xNZXRhZGF0YWApOwpuZXcgQ29udGV4dEtleShgZXZlLmxpdmVTdGVwVG9vbHNgKTsKbmV3IENvbnRleHRLZXkoYGV2ZS5keW5hbWljU2tpbGxNYW5pZmVzdGApOwpuZXcgQ29udGV4dEtleShgZXZlLnNlc3Npb25EeW5hbWljSW5zdHJ1Y3Rpb25zYCk7Cm5ldyBDb250ZXh0S2V5KGBldmUudHVybkR5bmFtaWNJbnN0cnVjdGlvbnNgKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9oYXJuZXNzL3N1YmFnZW50LWRlcHRoLmpzCmZ1bmN0aW9uIHJlYWRTZXJpYWxpemVkU3ViYWdlbnREZXB0aCh0KSB7CglsZXQgbiA9IHBhcnNlU3ViYWdlbnREZXB0aCh0W1N1YmFnZW50RGVwdGhLZXkubmFtZV0pOwoJcmV0dXJuIG4gPT09IDAgPyB2b2lkIDAgOiBuOwp9CmZ1bmN0aW9uIHBhcnNlU3ViYWdlbnREZXB0aChlKSB7CglyZXR1cm4gdHlwZW9mIGUgPT0gYG51bWJlcmAgJiYgTnVtYmVyLmlzSW50ZWdlcihlKSAmJiBlID4gMCA/IGUgOiAwOwp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvaGFybmVzcy9tZXNzYWdlcy5qcwpmdW5jdGlvbiBjb2FsZXNjZURlbGl2ZXJpZXMoZSkgewoJbGV0IFt0LCAuLi5uXSA9IGU7CglpZiAodCA9PT0gdm9pZCAwKSB0aHJvdyBFcnJvcihgQ2Fubm90IGNvYWxlc2NlIGFuIGVtcHR5IGRlbGl2ZXJ5IGJhdGNoLmApOwoJbGV0IHIgPSB0LmF1dGgsIGkgPSBbLi4udC5wYXlsb2Fkc107Cglmb3IgKGxldCBlIG9mIG4pIGUuYXV0aCAhPT0gdm9pZCAwICYmIChyID0gZS5hdXRoKSwgaS5wdXNoKC4uLmUucGF5bG9hZHMpOwoJcmV0dXJuIHsKCQkuLi50LAoJCWF1dGg6IHIsCgkJcGF5bG9hZHM6IGkKCX07Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vZXZlLXdvcmtmbG93LWF0dHJpYnV0ZXMuanMKZnVuY3Rpb24gcmVhZFBhcmVudExpbmVhZ2UoZSkgewoJbGV0IG4gPSBlW2BldmUucGFyZW50U2Vzc2lvbmBdLCByID0gbj8uY2FsbElkLCBpID0gbj8ucm9vdFNlc3Npb25JZCwgYSA9IG4/LnNlc3Npb25JZCwgbyA9IG4/LnR1cm4/LmlkOwoJcmV0dXJuIHsKCQljYWxsSWQ6IGlzTm9uRW1wdHlTdHJpbmcocikgPyByIDogdm9pZCAwLAoJCXJvb3RTZXNzaW9uSWQ6IGlzTm9uRW1wdHlTdHJpbmcoaSkgPyBpIDogdm9pZCAwLAoJCXNlc3Npb25JZDogaXNOb25FbXB0eVN0cmluZyhhKSA/IGEgOiB2b2lkIDAsCgkJdHVybklkOiBpc05vbkVtcHR5U3RyaW5nKG8pID8gbyA6IHZvaWQgMAoJfTsKfQpmdW5jdGlvbiByZWFkUm9vdFNlc3Npb25JZChlKSB7CglyZXR1cm4gcmVhZFBhcmVudExpbmVhZ2UoZSkucm9vdFNlc3Npb25JZDsKfQpmdW5jdGlvbiByZWFkQ2hhbm5lbFJlcXVlc3RJZChuKSB7CglsZXQgciA9IG5bQ2hhbm5lbFJlcXVlc3RJZEtleS5uYW1lXTsKCXJldHVybiBpc05vbkVtcHR5U3RyaW5nKHIpID8gciA6IHZvaWQgMDsKfQovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9kZWxlZ2F0ZWQtcGFyZW50LW5vdGlmaWNhdGlvbi5qcwp2YXIgbm90aWZ5RGVsZWdhdGVkUGFyZW50U3RlcCA9IGdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjI2LjEvL25vdGlmeURlbGVnYXRlZFBhcmVudFN0ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vc3ViYWdlbnQtYWRhcHRlci5qcwpjb25zdCBTVUJBR0VOVF9BREFQVEVSX0tJTkQgPSBgc3ViYWdlbnRgOwpnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4yNi4xLy9mb3J3YXJkU3ViYWdlbnRBdXRob3JpemF0aW9uRXZlbnRTdGVwIik7Cmdsb2JhbFRoaXNbU3ltYm9sLmZvcigiV09SS0ZMT1dfVVNFX1NURVAiKV0oInN0ZXAvL2V2ZUAwLjI2LjEvL2ZvcndhcmRTdWJhZ2VudElucHV0UmVxdWVzdFN0ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vZGVsZWdhdGVkLXBhcmVudC1yZXN1bHQuanMKZnVuY3Rpb24gY3JlYXRlRGVsZWdhdGVkU3ViYWdlbnRTdWNjZXNzUmVzdWx0KGUsIG4pIHsKCWxldCByID0gZVtgZXZlLmNoYW5uZWxgXTsKCWlmIChyPy5raW5kID09PSBTVUJBR0VOVF9BREFQVEVSX0tJTkQpIHJldHVybiB7CgkJY2FsbElkOiBTdHJpbmcoci5zdGF0ZT8uY2FsbElkID8/IGBgKSwKCQlraW5kOiBgc3ViYWdlbnQtcmVzdWx0YCwKCQlvdXRwdXQ6IG4sCgkJc3ViYWdlbnROYW1lOiBTdHJpbmcoci5zdGF0ZT8uc3ViYWdlbnROYW1lID8/IGBgKQoJfTsKfQpmdW5jdGlvbiBjcmVhdGVEZWxlZ2F0ZWRTdWJhZ2VudEVycm9yUmVzdWx0KHQsIG4pIHsKCWxldCByID0gY3JlYXRlRGVsZWdhdGVkU3ViYWdlbnRTdWNjZXNzUmVzdWx0KHQsIGBgKTsKCWlmIChyICE9PSB2b2lkIDApIHJldHVybiB7CgkJLi4uciwKCQlpc0Vycm9yOiAhMCwKCQlvdXRwdXQ6IHsKCQkJY29kZTogYFNVQkFHRU5UX0VYRUNVVElPTl9GQUlMRURgLAoJCQltZXNzYWdlOiB0b0Vycm9yTWVzc2FnZShuKQoJCX0KCX07Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vZm9yd2FyZC10dXJuLWRlbGl2ZXJ5LXN0ZXAuanMKdmFyIGZvcndhcmRUdXJuRGVsaXZlcnlTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMjYuMS8vZm9yd2FyZFR1cm5EZWxpdmVyeVN0",
	"ZXAiKTsKLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vdHVybi1jb250cm9sLXJlY2VpdmVyLmpzCnZhciBUdXJuQ29udHJvbFJlY2VpdmVyID0gY2xhc3MgewoJYnVmZmVyZWREZWxpdmVyaWVzOwoJY29udHJvbDsKCWNvbnRyb2xJdGVyYXRvcjsKCWRlbGl2ZXJ5SG9vazsKCXBlbmRpbmdDb250cm9sID0gbnVsbDsKCWNvbnN0cnVjdG9yKHQpIHsKCQl0aGlzLmJ1ZmZlcmVkRGVsaXZlcmllcyA9IHQuYnVmZmVyZWREZWxpdmVyaWVzLCB0aGlzLmNvbnRyb2wgPSBjcmVhdGVIb29rKHsgdG9rZW46IHQudG9rZW4gfSksIHRoaXMuY29udHJvbEl0ZXJhdG9yID0gdGhpcy5jb250cm9sW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpLCB0aGlzLmRlbGl2ZXJ5SG9vayA9IHQuZGVsaXZlcnlIb29rOwoJfQoJZ2V0IHRva2VuKCkgewoJCXJldHVybiB0aGlzLmNvbnRyb2wudG9rZW47Cgl9Cglhc3luYyBkaXNwb3NlKCkgewoJCWF3YWl0IGNsb3NlSG9va0l0ZXJhdG9yKHRoaXMuY29udHJvbEl0ZXJhdG9yKSwgYXdhaXQgZGlzcG9zZUhvb2sodGhpcy5jb250cm9sKTsKCX0KCWFzeW5jIHdhaXRGb3JBY3Rpb24oKSB7CgkJZm9yICg7OykgewoJCQlsZXQgZSA9IGF3YWl0IHRoaXMubmV4dENvbnRyb2woYFR1cm4gY29udHJvbCBob29rIGNsb3NlZCBiZWZvcmUgZGVsaXZlcmluZyBhIHJlc3VsdC5gKSwgdCA9IHRoaXMucmVhZFRlcm1pbmFsQ29udHJvbChlKTsKCQkJaWYgKHQgIT09IHZvaWQgMCkgcmV0dXJuIHQ7CgkJCWlmIChlLmtpbmQgPT09IGB0dXJuLWRlbGl2ZXJ5LXJlcXVlc3RgKSB7CgkJCQlsZXQgdCA9IGF3YWl0IHRoaXMuc2VydmljZURlbGl2ZXJ5UmVxdWVzdChlKTsKCQkJCWlmICh0ICE9PSB2b2lkIDApIHJldHVybiB0OwoJCQl9CgkJfQoJfQoJYnVmZmVyVHVybkRlbGl2ZXJpZXMoZSkgewoJCWUuYnVmZmVyZWREZWxpdmVyaWVzICE9PSB2b2lkIDAgJiYgdGhpcy5idWZmZXJlZERlbGl2ZXJpZXMudW5zaGlmdCguLi5lLmJ1ZmZlcmVkRGVsaXZlcmllcyk7Cgl9Cgljb25zdW1lQ29udHJvbCgpIHsKCQl0aGlzLnBlbmRpbmdDb250cm9sID0gbnVsbDsKCX0KCWdldENvbnRyb2xQcm9taXNlKCkgewoJCXJldHVybiB0aGlzLnBlbmRpbmdDb250cm9sID8/PSB0aGlzLmNvbnRyb2xJdGVyYXRvci5uZXh0KCksIHRoaXMucGVuZGluZ0NvbnRyb2w7Cgl9Cglhc3luYyBuZXh0Q29udHJvbChlKSB7CgkJZm9yICg7OykgewoJCQlsZXQgdCA9IGF3YWl0IHRoaXMuZ2V0Q29udHJvbFByb21pc2UoKTsKCQkJaWYgKHRoaXMuY29uc3VtZUNvbnRyb2woKSwgdC5kb25lKSB0aHJvdyBFcnJvcihlKTsKCQkJbGV0IG4gPSB0LnZhbHVlOwoJCQlpZiAobi5raW5kID09PSBgdHVybi1lcnJvcmApIHRocm93IHJlYnVpbGRTZXJpYWxpemFibGVFcnJvcihuLmVycm9yKTsKCQkJaWYgKG4ua2luZCA9PT0gYHR1cm4tY29udGludWF0aW9uLXRva2VuYCkgewoJCQkJYXdhaXQgdGhpcy5kZWxpdmVyeUhvb2sucmVrZXkobi5jb250aW51YXRpb25Ub2tlbik7CgkJCQljb250aW51ZTsKCQkJfQoJCQlyZXR1cm4gbjsKCQl9Cgl9CglyZWFkVGVybWluYWxDb250cm9sKGUpIHsKCQlpZiAoZS5raW5kID09PSBgdHVybi1lcnJvcmApIHRocm93IHJlYnVpbGRTZXJpYWxpemFibGVFcnJvcihlLmVycm9yKTsKCQlpZiAoZS5raW5kID09PSBgdHVybi1yZXN1bHRgKSByZXR1cm4gdGhpcy5idWZmZXJUdXJuRGVsaXZlcmllcyhlKSwgZS5hY3Rpb247Cgl9Cglhc3luYyBzZXJ2aWNlRGVsaXZlcnlSZXF1ZXN0KGUpIHsKCQlhd2FpdCB0aGlzLmRlbGl2ZXJ5SG9vay5yZWtleShlLmNvbnRpbnVhdGlvblRva2VuKTsKCQlsZXQgdCA9IHRoaXMuYnVmZmVyZWREZWxpdmVyaWVzLnNoaWZ0KCk7CgkJZm9yICg7IHQgPT09IHZvaWQgMDspIHsKCQkJbGV0IG4gPSBhd2FpdCBQcm9taXNlLnJhY2UoW3RoaXMuZ2V0Q29udHJvbFByb21pc2UoKS50aGVuKChlKSA9PiAoewoJCQkJa2luZDogYGNvbnRyb2xgLAoJCQkJdmFsdWU6IGUKCQkJfSkpLCB0aGlzLmRlbGl2ZXJ5SG9vay5uZXh0KCkudGhlbigoZSkgPT4gKHsKCQkJCWtpbmQ6IGBkZWxpdmVyeWAsCgkJCQl2YWx1ZTogZQoJCQl9KSldKTsKCQkJaWYgKG4ua2luZCA9PT0gYGNvbnRyb2xgKSB7CgkJCQlpZiAodGhpcy5jb25zdW1lQ29udHJvbCgpLCBuLnZhbHVlLmRvbmUpIHRocm93IEVycm9yKGBUdXJuIGNvbnRyb2wgaG9vayBjbG9zZWQgZHVyaW5nIGEgZGVsaXZlcnkgcmVxdWVzdC5gKTsKCQkJCWlmIChuLnZhbHVlLnZhbHVlLmtpbmQgPT09IGB0dXJuLWNvbnRpbnVhdGlvbi10b2tlbmApIHsKCQkJCQlhd2FpdCB0aGlzLmRlbGl2ZXJ5SG9vay5yZWtleShuLnZhbHVlLnZhbHVlLmNvbnRpbnVhdGlvblRva2VuKTsKCQkJCQljb250aW51ZTsKCQkJCX0KCQkJCWxldCB0ID0gdGhpcy5yZWFkVGVybWluYWxDb250cm9sKG4udmFsdWUudmFsdWUpOwoJCQkJaWYgKHQgIT09IHZvaWQgMCkgcmV0dXJuIHQ7CgkJCQlpZiAobi52YWx1ZS52YWx1ZS5raW5kID09PSBgdHVybi1kZWxpdmVyeS1jYW5jZWxsZWRgICYmIG4udmFsdWUudmFsdWUucmVxdWVzdElkID09PSBlLnJlcXVlc3RJZCkgcmV0dXJuOwoJCQkJY29udGludWU7CgkJCX0KCQkJaWYgKG4udmFsdWUuZG9uZSkgdGhyb3cgRXJyb3IoYFNlc3Npb24gZGVsaXZlcnkgaG9vayBjbG9zZWQgZHVyaW5nIGEgdHVybiBkZWxpdmVyeSByZXF1ZXN0LmApOwoJCQl0aGlzLmRlbGl2ZXJ5SG9vay5jb25zdW1lTmV4dCgpLCBuLnZhbHVlLnZhbHVlLmtpbmQgPT09IGBkZWxpdmVyYCAmJiAodCA9IG4udmFsdWUudmFsdWUpOwoJCX0KCQl0cnkgewoJCQlhd2FpdCBmb3J3YXJkVHVybkRlbGl2ZXJ5U3RlcCh7CgkJCQlpbmJveFRva2VuOiBlLmluYm94VG9rZW4sCgkJCQlwYXlsb2FkOiB7CgkJCQkJZGVsaXZlcnk6IHQsCgkJCQkJa2luZDogYGRyaXZlci1kZWxpdmVyeWAsCgkJCQkJcmVxdWVzdElkOiBlLnJlcXVlc3RJZAoJCQkJfQoJCQl9KTsKCQl9IGNhdGNoIChlKSB7CgkJCWlmICghKGUgaW5zdGFuY2VvZiBFcnJvciAmJiBlLm5hbWUgPT09IGBIb29rTm90Rm91bmRFcnJvcmApKSB0aHJvdyBlOwoJCX0KCQlyZXR1cm4gYXdhaXQgdGhpcy5hd2FpdEZvcndhcmRlZERlbGl2ZXJ5KGUucmVxdWVzdElkLCB0KTsKCX0KCWFzeW5jIGF3YWl0Rm9yd2FyZGVkRGVsaXZlcnkoZSwgdCkgewoJCWZvciAoOzspIHsKCQkJbGV0IG4gPSBhd2FpdCB0aGlzLm5leHRDb250cm9sKGBUdXJuIGNvbnRyb2wgaG9vayBjbG9zZWQgYmVmb3JlIHJlc29sdmluZyBhIGZvcndhcmRlZCBkZWxpdmVyeS5gKTsKCQkJaWYgKG4ua2luZCA9PT0gYHR1cm4tZGVsaXZlcnktYWNjZXB0ZWRgKSB7CgkJCQlpZiAobi5yZXF1ZXN0SWQgPT09IGUpIHJldHVybjsKCQkJCWNvbnRpbnVlOwoJCQl9CgkJCWlmIChuLmtpbmQgPT09IGB0dXJuLWRlbGl2ZXJ5LWNhbmNlbGxlZGAgJiYgbi5yZXF1ZXN0SWQgPT09IGUpIHsKCQkJCXRoaXMuYnVmZmVyZWREZWxpdmVyaWVzLnVuc2hpZnQodCk7CgkJCQlyZXR1cm47CgkJCX0KCQkJbi5raW5kID09PSBgdHVybi1yZXN1bHRgICYmIHRoaXMuYnVmZmVyZWREZWxpdmVyaWVzLnVuc2hpZnQodCk7CgkJCWxldCByID0gdGhpcy5yZWFkVGVybWluYWxDb250cm9sKG4pOwoJCQlpZiAociAhPT0gdm9pZCAwKSByZXR1cm4gcjsKCQl9Cgl9Cn07Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3R1cm4tZGlzcGF0Y2guanMKYXN5bmMgZnVuY3Rpb24gZGlzcGF0Y2hBbmRBd2FpdFR1cm4odCkgewoJbGV0IG4gPSBuZXcgVHVybkNvbnRyb2xSZWNlaXZlcih7CgkJYnVmZmVyZWREZWxpdmVyaWVzOiB0LmJ1ZmZlcmVkRGVsaXZlcmllcywKCQlkZWxpdmVyeUhvb2s6IHQuZGVsaXZlcnlIb29rLAoJCXRva2VuOiB0LmNvbnRyb2xUb2tlbgoJfSk7Cgl0cnkgewoJCXJldHVybiBhd2FpdCBkaXNwYXRjaFR1cm5TdGVwKHsKCQkJY2FwYWJpbGl0aWVzOiB0LmNhcGFiaWxpdGllcywKCQkJY29tcGxldGlvblRva2VuOiBuLnRva2VuLAoJCQlkZWxpdmVyeTogdC5kZWxpdmVyeSwKCQkJbW9kZTogdC5tb2RlLAoJCQlwYXJlbnRXcml0YWJsZTogdC5wYXJlbnRXcml0YWJsZSwKCQkJc2VyaWFsaXplZENvbnRleHQ6IHQuc2VyaWFsaXplZENvbnRleHQsCgkJCXNlc3Npb25TdGF0ZTogdC5zZXNzaW9uU3RhdGUKCQl9KSwgewoJCQlhY3Rpb246IGF3YWl0IG4ud2FpdEZvckFjdGlvbigpLAoJCQlkaXNwb3NlOiAoKSA9PiBuLmRpc3Bvc2UoKQoJCX07Cgl9IGNhdGNoIChlKSB7CgkJdGhyb3cgYXdhaXQgbi5kaXNwb3NlKCksIGU7Cgl9Cn0KLy8jZW5kcmVnaW9uCi8vI3JlZ2lvbiBkaXN0L3NyYy9leGVjdXRpb24vY3JlYXRlLXNlc3Npb24tc3RlcC5qcwp2YXIgY3JlYXRlU2Vzc2lvblN0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4yNi4xLy9jcmVhdGVTZXNzaW9uU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9zZXR0bGUtY2FuY2VsbGVkLXR1cm4tc3RlcC5qcwp2YXIgc2V0dGxlQ2FuY2VsbGVkVHVyblN0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4yNi4xLy9zZXR0bGVDYW5jZWxsZWRUdXJuU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi90ZXJtaW5hbC1zZXNzaW9uLWZhaWx1cmUtc3RlcC5qcwp2YXIgZW1pdFRlcm1pbmFsU2Vzc2lvbkZhaWx1cmVTdGVwID0gZ2xvYmFsVGhpc1tTeW1ib2wuZm9yKCJXT1JLRkxPV19VU0VfU1RFUCIpXSgic3RlcC8vZXZlQDAuMjYuMS8vZW1pdFRlcm1pbmFsU2Vzc2lvbkZhaWx1cmVTdGVwIik7Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3Nlc3Npb24tY2FsbGJhY2stc3RlcC5qcwp2YXIgZmlyZVNlc3Npb25DYWxsYmFja1N0ZXAgPSBnbG9iYWxUaGlzW1N5bWJvbC5mb3IoIldPUktGTE9XX1VTRV9TVEVQIildKCJzdGVwLy9ldmVAMC4yNi4xLy9maXJlU2Vzc2lvbkNhbGxiYWNrU3RlcCIpOwovLyNlbmRyZWdpb24KLy8jcmVnaW9uIGRpc3Qvc3JjL2V4ZWN1dGlvbi9zZXNzaW9uLWRlbGl2ZXJ5LWhvb2suanMKZnVuY3Rpb24gY3JlYXRlU2Vzc2lvbkRlbGl2ZXJ5SG9vayhyKSB7CglsZXQgaSwgYSA9IFtdLCBvID0gW10sIHMgPSAwLCBjID0gbnVsbCwgbCwgdSwgZW5xdWV1ZSA9IChlKSA9PiB7CgkJby5wdXNoKGUpLCBvLnNvcnQoKGUsIHQpID0+IGUub3JkZXIgLSB0Lm9yZGVyKSwgdT8uKCksIHUgPSB2b2lkIDA7Cgl9LCBhcm0gPSAoZSkgPT4gewoJCWUuY2xvc2VkIHx8IGUucGVuZGluZyB8fCAoZS5wZW5kaW5nID0gITAsIGUucmVzb2x2ZWQgPSB2b2lkIDAsIChlLnJldGlyZWQgPyBQcm9taXNlLnJlc29sdmUoZS5ob29rKS50aGVuKChlKSA9PiAoewoJCQlkb25lOiAhMSwKCQkJdmFsdWU6IGUKCQl9KSkgOiBlLml0ZXJhdG9yLm5leHQoKSkudGhlbigodCkgPT4gewoJCQlsZXQgbiA9IHsKCQkJCW9yZGVyOiBzKyssCgkJCQlyZXN1bHQ6IHQsCgkJCQlzdGF0ZTogZQoJCQl9OwoJCQllLnJlc29sdmVkID0gbiwgZS5lbmFibGVkICYmIGVucXVldWUobik7CgkJfSwgKCkgPT4ge30pKTsKCX0sIGVuYWJsZSA9IChlKSA9PiB7CgkJZS5lbmFibGVkID0gITAsIGUucmVzb2x2ZWQgIT09IHZvaWQgMCAmJiBlbnF1ZXVlKGUucmVzb2x2ZWQpOwoJfSwgZHJhaW5SZWFkeSA9IGFzeW5jICgpID0+IHsKCQlpZiAoYyA9PT0gbnVsbCkgZm9yIChhd2FpdCBQcm9taXNlLnJlc29sdmUoKTsgby5sZW5ndGggPiAwOykgewoJCQlsZXQgZSA9IG8uc2hpZnQoKTsKCQkJZS5zdGF0ZS5wZW5kaW5nID0gITEsIGUuc3RhdGUucmVzb2x2ZWQgPSB2b2lkIDAsIGUucmVzdWx0LmRvbmUgPyBlLnN0YXRlLmNsb3NlZCA9ICEwIDogZS5yZXN1bHQudmFsdWUua2luZCA9PT0gYGRlbGl2ZXJgICYmIHIucHVzaChlLnJlc3VsdC52YWx1ZSksIGFybShlLnN0YXRlKSwgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKCk7CgkJfQoJfTsKCXJldHVybiB7CgkJY29uc3VtZU5leHQoKSB7CgkJCWlmIChsID09PSB2b2lkIDApIHRocm93IEVycm9yKGBDYW5ub3QgY29uc3VtZSBhIHB1YmxpYyBkZWxpdmVyeSBiZWZvcmUgaXQgcmVzb2x2ZXMuYCk7CgkJCWwuc3RhdGUucGVuZGluZyA9ICExLCBsLnN0YXRlLnJlc29sdmVkID0gdm9pZCAwLCBsLnJlc3VsdC5kb25lICYmIChsLnN0YXRlLmNsb3NlZCA9ICEwKSwgbCA9IHZvaWQgMCwgYyA9IG51bGw7CgkJfSwKCQlhc3luYyBkaXNwb3NlKCkgewoJCQlpICE9PSB2b2lkIDAgJiYgKGF3YWl0IGRpc3Bvc2VIb29rKGkuaG9vayksIGkgPSB2b2lkIDApOwoJCX0sCgkJbmV4dCgpIHsKCQkJaWYgKGkgPT09IHZvaWQgMCkgdGhyb3cgRXJyb3IoYENhbm5vdCB3YWl0IGZvciBkZWxpdmVyaWVzIGJlZm9yZSBhIGNvbnRpbnVhdGlvbiB0b2tlbiBpcyBhdmFpbGFibGUuYCk7CgkJCWlmIChjICE9PSBudWxsKSByZXR1cm4gYzsKCQkJYXJtKGkpOwoJCQlmb3IgKGxldCBlIG9mIGEpIGFybShlKTsKCQkJcmV0dXJuIGkuY2xvc2VkICYmIGEuZXZlcnkoKGUpID0+IGUuY2xvc2VkKSA/IChsID0gewoJCQkJb3JkZXI6IHMrKywKCQkJCXJlc3VsdDogewoJCQkJCWRvbmU6ICEwLAoJCQkJCXZhbHVlOiB2b2lkIDAKCQkJCX0sCgkJCQlzdGF0ZTogaQoJCQl9LCBjID0gUHJvbWlzZS5yZXNvbHZlKGwucmVzdWx0KSwgYykgOiAoYyA9IChhc3luYyAoKSA9PiB7CgkJCQlmb3IgKDsgby5sZW5ndGggPT09IDA7KSBhd2FpdCBuZXcgUHJvbWlzZSgoZSkgPT4gewoJCQkJCXUgPSBlOwoJCQkJfSk7CgkJCQlsZXQgZSA9IG8uc2hpZnQoKTsKCQkJCXJldHVybiBsID0gZSwgZS5yZXN1bHQ7CgkJCX0pKCksIGMpOwoJCX0sCgkJYXN5bmMgcmVrZXkocikgewoJCQlpZiAoIXIgfHwgaT8uaG9vay50b2tlbiA9PT0gcikgcmV0dXJuOwoJCQlsZXQgbyA9IGNyZWF0ZUhvb2soeyB0b2tlbjogciB9KSwgcyA9IHsKCQkJCWNsb3NlZDogITEsCgkJCQllbmFibGVkOiAhMSwKCQkJCWhvb2s6IG8sCgkJCQlpdGVyYXRvcjogb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKSwKCQkJCXBlbmRpbmc6ICExLAoJCQkJcmV0aXJlZDogITEKCQkJfTsKCQkJaWYgKGkgPT09IHZvaWQgMCkgewoJCQkJYXdhaXQgY2xhaW1Ib29rT3duZXJzaGlwKHMuaG9vayksIGVuYWJsZShzKSwgaSA9IHM7CgkJCQlyZXR1cm47CgkJCX0KCQkJbGV0IGMgPSBpOwoJCQlhcm0oYyksIGFybShzKSwgYXdhaXQgY2xhaW1Ib29rT3duZXJzaGlwKHMuaG9vayksIGVuYWJsZShzKSwgYXdhaXQgZHJhaW5SZWFkeSgpOwoJCQl0cnkgewoJCQkJYXdhaXQgZGlzcG9zZUhvb2soYy5ob29rKTsKCQkJfSBjYXRjaCAoZSkgewoJCQkJaSA9IHZvaWQgMDsKCQkJCXRyeSB7CgkJCQkJYXdhaXQgZGlzcG9zZUhvb2socy5ob29rKTsKCQkJCX0gY2F0Y2gge30KCQkJCXRocm93IGU7CgkJCX0KCQkJYy5yZXRpcmVkID0gITAsIGEucHVzaChjKSwgaSA9IHMsIGF3YWl0IGRyYWluUmVhZHkoKTsKCQl9Cgl9Owp9Ci8vI2VuZHJlZ2lvbgovLyNyZWdpb24gZGlzdC9zcmMvZXhlY3V0aW9uL3dvcmtmbG93LWVudHJ5LmpzCmFzeW5jIGZ1bmN0aW9uIHdvcmtmbG93RW50cnkodCkgewoJbGV0IHsgd29ya2Zsb3dSdW5JZDogaSB9ID0gZ2V0V29ya2Zsb3dNZXRhZGF0YSgpLCBvID0gdC5zZXJpYWxpemVkQ29udGV4dFtgZXZlLmNvbnRpbnVhdGlvblRva2VuYF0gfHwgYGAsIHMgPSB0LnNlcmlhbGl6ZWRDb250ZXh0W2BldmUubW9kZWBdLCB1ID0gdC5zZXJpYWxpemVkQ29udGV4dFtgZXZlLmNhcGFiaWxpdGllc2BdLCBkID0gdC5zZXJpYWxpemVkQ29udGV4dFtgZXZlLmJ1bmRsZWBdOwoJdC5zZXJpYWxpemVkQ29udGV4dFtgZXZlLnNlc3Npb25JZGBdID0gaTsKCWxldCBmID0gZ2V0V3JpdGFibGUoKTsKCXRyeSB7CgkJbGV0IG4gPSByZWFkUm9vdFNlc3Npb25JZCh0LnNlcmlhbGl6ZWRDb250ZXh0KSwgciA9IHJlYWRTZXJpYWxpemVkU3ViYWdlbnREZXB0aCh0LnNlcmlhbGl6ZWRDb250ZXh0KSwgeyBzdGF0ZTogYSB9ID0gYXdhaXQgY3JlYXRlU2Vzc2lvblN0ZXAoewoJCQljb21waWxlZEFydGlmYWN0c1NvdXJjZTogZC5zb3VyY2UsCgkJCWNvbnRpbnVhdGlvblRva2VuOiBvLAoJCQlpbmhlcml0ZWRMaW1pdHM6IHQubGltaXRzLAoJCQlub2RlSWQ6IGQubm9kZUlkLAoJCQlvdXRwdXRTY2hlbWE6IHQuaW5wdXQub3V0cHV0U2NoZW1hLAoJCQlyb290U2Vzc2lvbklkOiBuLAoJCQlzZXNzaW9uSWQ6IGksCgkJCXN1YmFnZW50RGVwdGg6IHIKCQl9KTsKCQlyZXR1cm4gYXdhaXQgcnVuRHJpdmVyTG9vcCh7CgkJCWNhcGFiaWxpdGllczogdSwKCQkJZHJpdmVyV3JpdGFibGU6IGYsCgkJCWluaXRpYWxJbnB1dDogewoJCQkJa2luZDogYGRlbGl2ZXJgLAoJCQkJcGF5bG9hZHM6IFt7CgkJCQkJbWVzc2FnZTogdC5pbnB1dC5tZXNzYWdlLAoJCQkJCWNvbnRleHQ6IHQuaW5wdXQuY29udGV4dCwKCQkJCQlvdXRwdXRTY2hlbWE6IHQuaW5wdXQub3V0cHV0U2NoZW1hCgkJCQl9XSwKCQkJCXJlcXVlc3RJZDogcmVhZENoYW5uZWxSZXF1ZXN0SWQodC5zZXJpYWxpemVkQ29udGV4dCkKCQkJfSwKCQkJbW9kZTogcywKCQkJc2VyaWFsaXplZENvbnRleHQ6IHQuc2VyaWFsaXplZENvbnRleHQsCgkJCXNlc3Npb25TdGF0ZTogYQoJCX0pOwoJfSBjYXRjaCAoZSkgewoJCXRocm93IGF3YWl0IGVtaXRUZXJtaW5hbFNlc3Npb25GYWlsdXJlU3RlcCh7CgkJCWVycm9yOiBub3JtYWxpemVTZXJpYWxpemFibGVFcnJvcihlKSwKCQkJcGFyZW50V3JpdGFibGU6IGYsCgkJCXNlcmlhbGl6ZWRDb250ZXh0OiB0LnNlcmlhbGl6ZWRDb250ZXh0CgkJfSksIGF3YWl0IGZpcmVTZXNzaW9uQ2FsbGJhY2tTdGVwKHsKCQkJZXJyb3I6IG5vcm1hbGl6ZVNlcmlhbGl6YWJsZUVycm9yKGUpLAoJCQlzZXJpYWxpemVkQ29udGV4dDogdC5zZXJpYWxpemVkQ29udGV4dCwKCQkJc3RhdHVzOiBgZmFpbGVkYAoJCX0pLCBhd2FpdCBub3RpZnlEZWxlZ2F0ZWRQYXJlbnRTdGVwKHsKCQkJcmVzdWx0OiBjcmVhdGVEZWxlZ2F0ZWRTdWJhZ2VudEVycm9yUmVzdWx0KHQuc2VyaWFsaXplZENvbnRleHQsIGUpLAoJCQlzZXJpYWxpemVkQ29udGV4dDogdC5zZXJpYWxpemVkQ29udGV4dAoJCX0pLCBlOwoJfQp9CmFzeW5jIGZ1bmN0aW9uIHJ1bkRyaXZlckxvb3AoZSkgewoJbGV0IG4gPSBjcmVhdGVIb29rKHsgdG9rZW46IGAke2Uuc2Vzc2lvblN0YXRlLnNlc3Npb25JZH06YXV0aGAgfSksIHIgPSBuW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpLCBhID0gMCwgbmV4dFR1cm5Db250cm9sVG9rZW4gPSAoKSA9PiBgJHtlLnNlc3Npb25TdGF0ZS5zZXNzaW9uSWR9OnR1cm4tY29udHJvbDoke1N0cmluZyhhKyspfWAsIHMgPSBbXSwgYyA9IGNyZWF0ZVNlc3Npb25EZWxpdmVyeUhvb2socyksIGwsIHJ1blR1cm4gPSBhc3luYyAodCkgPT4gewoJCWxldCBuID0gYXdhaXQgZGlzcGF0Y2hBbmRBd2FpdFR1cm4oewoJCQlidWZmZXJlZERlbGl2ZXJpZXM6IHMsCgkJCWNhcGFiaWxpdGllczogZS5jYXBhYmlsaXRpZXMsCgkJCWNvbnRyb2xUb2tlbjogbmV4dFR1cm5Db250cm9sVG9rZW4oKSwKCQkJZGVsaXZlcnk6IHQuZGVsaXZlcnksCgkJCWRlbGl2ZXJ5SG9vazogYywKCQkJbW9kZTogZS5tb2RlLAoJCQlwYXJlbnRXcml0YWJsZTogZS5kcml2ZXJXcml0YWJsZSwKCQkJc2VyaWFsaXplZENvbnRleHQ6IHQuc2VyaWFsaXplZENvbnRleHQsCgkJCXNlc3Npb25TdGF0ZTogdC5zZXNzaW9uU3RhdGUKCQl9KTsKCQlyZXR1cm4gYXdhaXQgbD8uKCksIGwgPSBuLmRpc3Bvc2UsIG4uYWN0aW9uOwoJfTsKCXRyeSB7CgkJZS5zZXNzaW9uU3RhdGUuY29udGludWF0aW9uVG9rZW4gJiYgYXdhaXQgYy5yZWtleShlLnNlc3Npb25TdGF0ZS5jb250aW51YXRpb25Ub2tlbik7CgkJbGV0IHQgPSBhd2FpdCBydW5UdXJuKHsKCQkJZGVsaXZlcnk6IGUuaW5pdGlhbElucHV0LAoJCQlzZXJpYWxpemVkQ29udGV4dDogZS5zZXJpYWxpemVkQ29udGV4dCwKCQkJc2Vzc2lvblN0YXRlOiBlLnNlc3Npb25TdGF0ZQoJCX0pOwoJCWZvciAoOzspIHsKCQkJaWYgKHQua2luZCA9PT0gYGRvbmVgKSByZXR1cm4gYXdhaXQgZmluYWxpemVEb25lKHsKCQkJCWFjdGlvbjogdCwKCQkJCWRyaXZlcldyaXRhYmxlOiBlLmRyaXZlcldyaXRhYmxlCgkJCX0pOwoJCQlpZiAodC5raW5kICE9PSBgcGFya2ApIHRocm93IEVycm9yKGBEcml2ZXIgcmVjZWl2ZWQgdW5leHBlY3RlZCB0dXJuIGFjdGlvbiAiJHt0LmtpbmR9Ii5gKTsKCQkJaWYgKHQuY2FuY2VsbGVkID09PSAhMCkgewoJCQkJbGV0IG4gPSBhd2FpdCBzZXR0bGVDYW5jZWxsZWRUdXJuU3RlcCh7CgkJCQkJcGFyZW50V3JpdGFibGU6IGUuZHJpdmVyV3JpdGFibGUsCgkJCQkJc2VyaWFsaXplZENvbnRleHQ6IHQuc2VyaWFsaXplZENvbnRleHQsCgkJCQkJc2Vzc2lvblN0YXRlOiB0LnNlc3Npb25TdGF0ZQoJCQkJfSk7CgkJCQl0ID0gewoJCQkJCS4uLnQsCgkJCQkJc2VyaWFsaXplZENvbnRleHQ6IG4uc2VyaWFsaXplZENvbnRleHQsCgkJCQkJc2Vzc2lvblN0YXRlOiBuLnNlc3Npb25TdGF0ZQoJCQkJfTsKCQkJfQoJCQlpZiAoIXQuc2Vzc2lvblN0YXRlLmNvbnRpbnVhdGlvblRva2VuKSB0aHJvdyBFcnJvcigiQ2Fubm90IHBhcms6IG5vIGNvbnRpbnVhdGlvbiB0b2tlbiBhdmFpbGFibGUuIFRoZSBjaGFubmVsIG11c3QgcG9zdCB0aGUgZmlyc3QgbWVzc2FnZSBkdXJpbmcgdGhlIGluaXRpYWwgdHVybiAoYW5jaG9yaW5nIHRoZSBzZXNzaW9uKSBvciBgc2VuZCgpYCBtdXN0IGJlIGNhbGxlZCB3aXRoIGFuIGV4cGxpY2l0IGNvbnRpbnVhdGlvblRva2VuLiIpOwoJCQlpZiAoYXdhaXQgYy5yZWtleSh0LnNlc3Npb25TdGF0ZS5jb250aW51YXRpb25Ub2tlbiksIHQuYXV0aG9yaXphdGlvbk5hbWVzICYmIHQuYXV0aG9yaXphdGlvbk5hbWVzLmxlbmd0aCA+IDApIHsKCQkJCWxldCBlID0gdC5hdXRob3JpemF0aW9uTmFtZXMubGVuZ3RoLCBuID0gW107CgkJCQlmb3IgKDsgbi5sZW5ndGggPCBlOykgewoJCQkJCWxldCBlID0gYXdhaXQgci5uZXh0KCk7CgkJCQkJaWYgKGUuZG9uZSkgYnJlYWs7CgkJCQkJZS52YWx1ZS5raW5kID09PSBgZGVsaXZlcmAgJiYgbi5wdXNoKC4uLmUudmFsdWUucGF5bG9hZHMpOwoJCQkJfQoJCQkJdCA9IGF3YWl0IHJ1blR1cm4oewoJCQkJCWRlbGl2ZXJ5OiB7CgkJCQkJCWtpbmQ6IGBkZWxpdmVyYCwKCQkJCQkJcGF5bG9hZHM6IG4KCQkJCQl9LAoJCQkJCXNlcmlhbGl6ZWRDb250ZXh0OiB0LnNlcmlhbGl6ZWRDb250ZXh0LAoJCQkJCXNlc3Npb25TdGF0ZTogdC5zZXNzaW9uU3RhdGUKCQkJCX0pOwoJCQkJY29udGludWU7CgkJCX0KCQkJbGV0IG4gPSBhd2FpdCB3YWl0Rm9yTmV4dERlbGl2ZXIoewoJCQkJYnVmZmVyZWREZWxpdmVyaWVzOiBzLAoJCQkJZGVsaXZlcnlIb29rOiBjCgkJCX0pOwoJCQlpZiAobiA9PT0gbnVsbCkgcmV0dXJuIHsgb3V0cHV0OiBgYCB9OwoJCQlsZXQgaSA9IGF3YWl0IHJvdXRlRGVsaXZlclRvQ2hpbGRyZW4oewoJCQkJYXV0aDogbi5hdXRoLAoJCQkJcGFyZW50V3JpdGFibGU6IGUuZHJpdmVyV3JpdGFibGUsCgkJCQlwYXlsb2Fkczogbi5wYXlsb2FkcywKCQkJCXNlc3Npb25TdGF0ZTogdC5zZXNzaW9uU3RhdGUKCQkJfSk7CgkJCWkgIT09IHZvaWQgMCAmJiAodCA9IGF3YWl0IHJ1blR1cm4oewoJCQkJZGVsaXZlcnk6IHsKCQkJCQlhdXRoOiBuLmF1dGgsCgkJCQkJa2luZDogYGRlbGl2ZXJgLAoJCQkJCXBheWxvYWRzOiBbaV0sCgkJCQkJcmVxdWVzdElkOiBuLnJlcXVlc3RJZAoJCQkJfSwKCQkJCXNlcmlhbGl6ZWRDb250ZXh0OiB0LnNlcmlhbGl6ZWRDb250ZXh0LAoJCQkJc2Vzc2lvblN0YXRlOiB0LnNlc3Npb25TdGF0ZQoJCQl9KSk7CgkJfQoJfSBmaW5hbGx5IHsKCQlhd2FpdCBsPy4oKSwgYXdhaXQgYy5kaXNwb3NlKCksIGF3YWl0IGRpc3Bvc2VIb29rKG4pOwoJfQp9CmFzeW5jIGZ1bmN0aW9uIGZpbmFsaXplRG9uZShlKSB7CglsZXQgeyBvdXRwdXQ6IHQsIHNlcmlhbGl6ZWRDb250ZXh0OiBuIH0gPSBlLmFjdGlvbiwgciA9IGUuYWN0aW9uLmlzRXJyb3IgPT09ICEwOwoJcmV0dXJuIGF3YWl0IGZpcmVTZXNzaW9uQ2FsbGJhY2tTdGVwKHsKCQllcnJvcjogciA/IHQgOiB2b2lkIDAsCgkJb3V0cHV0OiByID8gdm9pZCAwIDogdCwKCQlzZXJpYWxpemVkQ29udGV4dDogbiwKCQlzdGF0dXM6IHIgPyBgZmFpbGVkYCA6IGBjb21wbGV0ZWRgLAoJCXVzYWdlOiByID8gdm9pZCAwIDogZS5hY3Rpb24udXNhZ2UKCX0pLCBhd2FpdCBub3RpZnlEZWxlZ2F0ZWRQYXJlbnRTdGVwKHsKCQlyZXN1bHQ6IHIgPyBjcmVhdGVEZWxl",
	"Z2F0ZWRTdWJhZ2VudEVycm9yUmVzdWx0KG4sIHQpIDogY3JlYXRlRGVsZWdhdGVkU3ViYWdlbnRTdWNjZXNzUmVzdWx0KG4sIHQpLAoJCXNlcmlhbGl6ZWRDb250ZXh0OiBuLAoJCXVzYWdlOiByID8gdm9pZCAwIDogZS5hY3Rpb24udXNhZ2UKCX0pLCB7IG91dHB1dDogdCB9Owp9CmFzeW5jIGZ1bmN0aW9uIHdhaXRGb3JOZXh0RGVsaXZlcihlKSB7CglpZiAoZS5idWZmZXJlZERlbGl2ZXJpZXMubGVuZ3RoID4gMCkgcmV0dXJuIGNvYWxlc2NlRGVsaXZlcmllcyhlLmJ1ZmZlcmVkRGVsaXZlcmllcy5zcGxpY2UoMCkpOwoJZm9yICg7OykgewoJCWxldCB0ID0gYXdhaXQgZS5kZWxpdmVyeUhvb2submV4dCgpOwoJCWlmIChlLmRlbGl2ZXJ5SG9vay5jb25zdW1lTmV4dCgpLCB0LmRvbmUpIHJldHVybiBudWxsOwoJCWlmICh0LnZhbHVlLmtpbmQgIT09IGBkZWxpdmVyYCkgY29udGludWU7CgkJbGV0IG4gPSB0LnZhbHVlOwoJCWZvciAoOzspIHsKCQkJbGV0IHQgPSBhd2FpdCB0YWtlUmVhZHlQYXlsb2FkKGUuZGVsaXZlcnlIb29rLm5leHQoKSk7CgkJCWlmICh0ID09PSBOT19SRUFEWV9NRVNTQUdFIHx8IChlLmRlbGl2ZXJ5SG9vay5jb25zdW1lTmV4dCgpLCB0LmRvbmUpKSBicmVhazsKCQkJdC52YWx1ZS5raW5kID09PSBgZGVsaXZlcmAgJiYgKG4gPSBjb2FsZXNjZURlbGl2ZXJpZXMoW24sIHQudmFsdWVdKSk7CgkJfQoJCXJldHVybiBuOwoJfQp9CmNvbnN0IE5PX1JFQURZX01FU1NBR0UgPSBTeW1ib2woYG5vLXJlYWR5LW1lc3NhZ2VgKTsKYXN5bmMgZnVuY3Rpb24gdGFrZVJlYWR5UGF5bG9hZChlKSB7CglyZXR1cm4gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKCksIGF3YWl0IFByb21pc2UucmFjZShbZSwgUHJvbWlzZS5yZXNvbHZlKE5PX1JFQURZX01FU1NBR0UpXSk7Cn0Kd29ya2Zsb3dFbnRyeS53b3JrZmxvd0lkID0gIndvcmtmbG93Ly9ldmUvL3dvcmtmbG93RW50cnkiOwpnbG9iYWxUaGlzLl9fcHJpdmF0ZV93b3JrZmxvd3Muc2V0KCJ3b3JrZmxvdy8vZXZlLy93b3JrZmxvd0VudHJ5Iiwgd29ya2Zsb3dFbnRyeSk7Ci8vI2VuZHJlZ2lvbgoKLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lYMlYyWlMxM2IzSnJabXh2ZHkxbGJuUnllUzVxY3lJc0ltNWhiV1Z6SWpwYlhTd2ljMjkxY21ObGN5STZXeUp6Y21NdmMyaGhjbVZrTDJkMVlYSmtjeTVxY3lJc0luTnlZeTl6YUdGeVpXUXZaWEp5YjNKekxtcHpJaXdpYzNKakwzQnliM1J2WTI5c0wyMWxjM05oWjJVdWFuTWlMQ0p6Y21NdmNuVnVkR2x0WlM5aFkzUnBiMjV6TDJ0bGVYTXVhbk1pTENKemNtTXZhR0Z5Ym1WemN5OXlkVzUwYVcxbExXRmpkR2x2Ym5NdWFuTWlMQ0p6Y21NdlpYaGxZM1YwYVc5dUwyUnBjM0JoZEdOb0xYSjFiblJwYldVdFlXTjBhVzl1Y3kxemRHVndMbXB6SWl3aWMzSmpMMlY0WldOMWRHbHZiaTkzYjNKclpteHZkeTFqWVd4c1ltRmpheTExY213dWFuTWlMQ0p6Y21NdlpYaGxZM1YwYVc5dUwzZHZjbXRtYkc5M0xYTjBaWEJ6TG1weklpd2ljM0pqTDJsdWRHVnlibUZzTDNkdmNtdG1iRzkzTFdKMWJtUnNaUzkzYjNKclpteHZkeTFqYjNKbExYTm9hVzB1YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDJodmIyc3RiM2R1WlhKemFHbHdMbXB6SWl3aWMzSmpMMlY0WldOMWRHbHZiaTkzYjNKclpteHZkeTFsY25KdmNuTXVhbk1pTENKemNtTXZaWGhsWTNWMGFXOXVMM1IxY200dFkyOXVkSEp2YkMxd2NtOTBiMk52YkM1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dlkyRnVZMlZzTFdSbGMyTmxibVJoYm5RdGRIVnlibk10YzNSbGNDNXFjeUlzSW5OeVl5OWxlR1ZqZFhScGIyNHZaR2x6Y0dGMFkyZ3RkMjl5YTJac2IzY3RjblZ1ZEdsdFpTMWhZM1JwYjI1ekxYTjBaWEF1YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDJSMWNtRmliR1V0YzJWemMybHZiaTF0YVdkeVlYUnBiMjV6TDJOb1lXbHVMbXB6SWl3aWMzSmpMMlY0WldOMWRHbHZiaTlrZFhKaFlteGxMWE5sYzNOcGIyNHRiV2xuY21GMGFXOXVjeTkwZFhKdUxYZHZjbXRtYkc5M0xYWXdMWFJ2TFhZeExtcHpJaXdpYzNKakwyVjRaV04xZEdsdmJpOWtkWEpoWW14bExYTmxjM05wYjI0dGJXbG5jbUYwYVc5dWN5OTBkWEp1TFhkdmNtdG1iRzkzTG1weklpd2ljM0pqTDJWNFpXTjFkR2x2Ymk5a1pXeHBkbVZ5TFhCaGVXeHZZV1J6TG1weklpd2ljM0pqTDJWNFpXTjFkR2x2Ymk5eWIzVjBaUzFqYUdsc1pDMWtaV3hwZG1WeWVTNXFjeUlzSW5OeVl5OWxlR1ZqZFhScGIyNHZjM1ZpWVdkbGJuUXRaWFpsYm5RdGNISnZlSGt0YzNSbGNDNXFjeUlzSW5OeVl5OWxlR1ZqZFhScGIyNHZkSFZ5YmkxallXNWpaV3hzWVhScGIyNHRkRzlyWlc0dWFuTWlMQ0p6Y21NdmFHRnlibVZ6Y3k5MGRYSnVMV05oYm1ObGJHeGhkR2x2Ymk1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dmRIVnliaTFqWVc1alpXeHNZWFJwYjI0dFkyOXVkSEp2YkM1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dmRIVnliaTFsZUdWamRYUnBiMjR0WTNWeWMyOXlMbXB6SWl3aWMzSmpMMmhoY201bGMzTXZZV04wYVhabExYUjFjbTR0YVdRdWFuTWlMQ0p6Y21NdlpYaGxZM1YwYVc5dUwzUjFjbTR0ZDI5eWEyWnNiM2N1YW5NaUxDSnpjbU12WTI5dWRHVjRkQzlyWlhrdWFuTWlMQ0p6Y21NdlkyOXVkR1Y0ZEM5clpYbHpMbXB6SWl3aWMzSmpMMmhoY201bGMzTXZjM1ZpWVdkbGJuUXRaR1Z3ZEdndWFuTWlMQ0p6Y21NdmFHRnlibVZ6Y3k5dFpYTnpZV2RsY3k1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dlpYWmxMWGR2Y210bWJHOTNMV0YwZEhKcFluVjBaWE11YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDJSbGJHVm5ZWFJsWkMxd1lYSmxiblF0Ym05MGFXWnBZMkYwYVc5dUxtcHpJaXdpYzNKakwyVjRaV04xZEdsdmJpOXpkV0poWjJWdWRDMWhaR0Z3ZEdWeUxtcHpJaXdpYzNKakwyVjRaV04xZEdsdmJpOWtaV3hsWjJGMFpXUXRjR0Z5Wlc1MExYSmxjM1ZzZEM1cWN5SXNJbk55WXk5bGVHVmpkWFJwYjI0dlptOXlkMkZ5WkMxMGRYSnVMV1JsYkdsMlpYSjVMWE4wWlhBdWFuTWlMQ0p6Y21NdlpYaGxZM1YwYVc5dUwzUjFjbTR0WTI5dWRISnZiQzF5WldObGFYWmxjaTVxY3lJc0luTnlZeTlsZUdWamRYUnBiMjR2ZEhWeWJpMWthWE53WVhSamFDNXFjeUlzSW5OeVl5OWxlR1ZqZFhScGIyNHZZM0psWVhSbExYTmxjM05wYjI0dGMzUmxjQzVxY3lJc0luTnlZeTlsZUdWamRYUnBiMjR2YzJWMGRHeGxMV05oYm1ObGJHeGxaQzEwZFhKdUxYTjBaWEF1YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDNSbGNtMXBibUZzTFhObGMzTnBiMjR0Wm1GcGJIVnlaUzF6ZEdWd0xtcHpJaXdpYzNKakwyVjRaV04xZEdsdmJpOXpaWE56YVc5dUxXTmhiR3hpWVdOckxYTjBaWEF1YW5NaUxDSnpjbU12WlhobFkzVjBhVzl1TDNObGMzTnBiMjR0WkdWc2FYWmxjbmt0YUc5dmF5NXFjeUlzSW5OeVl5OWxlR1ZqZFhScGIyNHZkMjl5YTJac2IzY3RaVzUwY25rdWFuTWlYU3dpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpWm5WdVkzUnBiMjRnYVhOUFltcGxZM1FvWlNsN2NtVjBkWEp1SUhSNWNHVnZaaUJsUFQxZ2IySnFaV04wWUNZbUlTRmxKaVloUVhKeVlYa3VhWE5CY25KaGVTaGxLWDFtZFc1amRHbHZiaUJwYzA1dmJrVnRjSFI1VTNSeWFXNW5LR1VwZTNKbGRIVnliaUIwZVhCbGIyWWdaVDA5WUhOMGNtbHVaMkFtSm1VdWJHVnVaM1JvUGpCOVpuVnVZM1JwYjI0Z2FYTlVhR1Z1WVdKc1pTaGxLWHR5WlhSMWNtNGdhWE5QWW1wbFkzUW9aU2ttSm5SNWNHVnZaaUJsTG5Sb1pXNDlQV0JtZFc1amRHbHZibUI5Wm5WdVkzUnBiMjRnYVhORmNuSnViME52WkdVb1pTeDBLWHR5WlhSMWNtNGdaU0JwYm5OMFlXNWpaVzltSUVWeWNtOXlKaVpnWTI5a1pXQnBiaUJsSmlabExtTnZaR1U5UFQxMGZXWjFibU4wYVc5dUlHbHpVR3hoYVc1U1pXTnZjbVFvWlNsN2FXWW9JV2x6VDJKcVpXTjBLR1VwS1hKbGRIVnliaUV4TzJ4bGRDQjBQVTlpYW1WamRDNW5aWFJRY205MGIzUjVjR1ZQWmlobEtUdHlaWFIxY200Z2REMDlQVTlpYW1WamRDNXdjbTkwYjNSNWNHVjhmSFE5UFQxdWRXeHNmV1Y0Y0c5eWRIdHBjMFZ5Y201dlEyOWtaU3hwYzA1dmJrVnRjSFI1VTNSeWFXNW5MR2x6VDJKcVpXTjBMR2x6VUd4aGFXNVNaV052Y21Rc2FYTlVhR1Z1WVdKc1pYMDdJaXdpYVcxd2IzSjBlMmx6VDJKcVpXTjBmV1p5YjIxY0lpTnphR0Z5WldRdlozVmhjbVJ6TG1welhDSTdablZ1WTNScGIyNGdkRzlGY25KdmNrMWxjM05oWjJVb2RDbDdjbVYwZFhKdUlIUWdhVzV6ZEdGdVkyVnZaaUJGY25KdmNqOTBMbTFsYzNOaFoyVTZkSGx3Wlc5bUlIUTlQV0J6ZEhKcGJtZGdQM1E2ZEQwOWJuVnNiRDlUZEhKcGJtY29kQ2s2YVhOUFltcGxZM1FvZENrL2RIbHdaVzltSUhRdWJXVnpjMkZuWlQwOVlITjBjbWx1WjJBbUpuUXViV1Z6YzJGblpTNXNaVzVuZEdnK01EOTBMbTFsYzNOaFoyVTZjMkZtWlVwemIyNVRkSEpwYm1kcFpua29kQ2s2VTNSeWFXNW5LSFFwZldaMWJtTjBhVzl1SUhSdlJYSnliM0lvZENsN2FXWW9kQ0JwYm5OMFlXNWpaVzltSUVWeWNtOXlLWEpsZEhWeWJpQjBPMnhsZENCdVBVVnljbTl5S0hSdlJYSnliM0pOWlhOellXZGxLSFFwS1R0eVpYUjFjbTRnYVhOUFltcGxZM1FvZENrL0tIUjVjR1Z2WmlCMExtNWhiV1U5UFdCemRISnBibWRnSmlaMExtNWhiV1V1YkdWdVozUm9QakFtSmlodUxtNWhiV1U5ZEM1dVlXMWxLU3gwZVhCbGIyWWdkQzV6ZEdGamF6MDlZSE4wY21sdVoyQW1KblF1YzNSaFkyc3ViR1Z1WjNSb1BqQW1KaWh1TG5OMFlXTnJQWFF1YzNSaFkyc3BMR0JqWVhWelpXQnBiaUIwSmlaMExtTmhkWE5sSVQwOWRtOXBaQ0F3SmlaMExtTmhkWE5sSVQwOWRDWW1LRzR1WTJGMWMyVTlkQzVqWVhWelpTa3NiaWs2Ym4xbWRXNWpkR2x2YmlwM1lXeHJRMkYxYzJWRGFHRnBiaWgwS1h0c1pYUWdiajF1WlhjZ1UyVjBMSEk5ZER0bWIzSW9PMmx6VDJKcVpXTjBLSElwSmlZaGJpNW9ZWE1vY2lrN0tXNHVZV1JrS0hJcExIbHBaV3hrSUhJc2NqMXlMbU5oZFhObGZXWjFibU4wYVc5dUlITmhabVZLYzI5dVUzUnlhVzVuYVdaNUtHVXBlM1J5ZVh0eVpYUjFjbTRnU2xOUFRpNXpkSEpwYm1kcFpua29aU2svUDFOMGNtbHVaeWhsS1gxallYUmphSHR5WlhSMWNtNGdVM1J5YVc1bktHVXBmWDFsZUhCdmNuUjdkRzlGY25KdmNpeDBiMFZ5Y205eVRXVnpjMkZuWlN4M1lXeHJRMkYxYzJWRGFHRnBibjA3SWl3aWFXMXdiM0owZTNSdlEyaGhibTVsYkV4dlkyRnNRMjl1ZEdsdWRXRjBhVzl1Vkc5clpXNTlabkp2YlZ3aUkzTm9ZWEpsWkM5amIyNTBhVzUxWVhScGIyNHRkRzlyWlc0dWFuTmNJanRwYlhCdmNuUjdaR1Z6WlhKcFlXeHBlbVZWY214R2FXeGxVR0Z5ZEN4b1lYTkpiblJsY201aGJGSmxabE5qYUdWdFpTeHBjMU5sY21saGJHbDZaV1JWY214R2FXeGxVR0Z5ZEgxbWNtOXRYQ0lqYVc1MFpYSnVZV3d2WVhSMFlXTm9iV1Z1ZEhNdmRYSnNMWEpsWm5NdWFuTmNJanRwYlhCdmNuUjdaR1ZqYjJSbFUyRnVaR0p2ZUZKbFppeHBjMU5oYm1SaWIzaFNaV1pWY214OVpuSnZiVndpSTJsdWRHVnlibUZzTDJGMGRHRmphRzFsYm5SekwzTmhibVJpYjNndGNtVm1jeTVxYzF3aU8yTnZibk4wSUVWV1JWOVRSVk5UU1U5T1gwbEVYMGhGUVVSRlVqMWdlQzFsZG1VdGMyVnpjMmx2YmkxcFpHQXNSVlpGWDFOVVVrVkJUVjlHVDFKTlFWUmZTRVZCUkVWU1BXQjRMV1YyWlMxemRISmxZVzB0Wm05eWJXRjBZQ3hGVmtWZlUxUlNSVUZOWDFaRlVsTkpUMDVmU0VWQlJFVlNQV0I0TFdWMlpTMXpkSEpsWVcwdGRtVnljMmx2Ym1Bc1JWWkZYMDFGVTFOQlIwVmZVMVJTUlVGTlgwTlBUbFJGVGxSZlZGbFFSVDFnWVhCd2JHbGpZWFJwYjI0dmVDMXVaR3B6YjI0N0lHTm9ZWEp6WlhROWRYUm1MVGhnTEVWV1JWOU5SVk5UUVVkRlgxTlVVa1ZCVFY5R1QxSk5RVlE5WUc1a2FuTnZibUFzUlZaRlgwMUZVMU5CUjBWZlUxUlNSVUZOWDFaRlVsTkpUMDQ5WURFNVlDeDBaWGgwUlc1amIyUmxjajF1WlhjZ1ZHVjRkRVZ1WTI5a1pYSTdablZ1WTNScGIyNGdhWE5EZFhKeVpXNTBWSFZ5YmtKdmRXNWtZWEo1UlhabGJuUW9aU2w3Y21WMGRYSnVJR1V1ZEhsd1pUMDlQV0J6WlhOemFXOXVMbU52YlhCc1pYUmxaR0I4ZkdVdWRIbHdaVDA5UFdCelpYTnphVzl1TG1aaGFXeGxaR0I4ZkdVdWRIbHdaVDA5UFdCelpYTnphVzl1TG5kaGFYUnBibWRnZldaMWJtTjBhVzl1SUdselZIVnlia1poYVd4MWNtVkZkbVZ1ZENobEtYdHlaWFIxY200Z1pTNTBlWEJsUFQwOVlITmxjM05wYjI0dVptRnBiR1ZrWUh4OFpTNTBlWEJsUFQwOVlITjBaWEF1Wm1GcGJHVmtZSHg4WlM1MGVYQmxQVDA5WUhSMWNtNHVabUZwYkdWa1lIMW1kVzVqZEdsdmJpQmpjbVZoZEdWVFpYTnphVzl1VTNSaGNuUmxaRVYyWlc1MEtHVXBlMnhsZENCMFBYdDlPM0psZEhWeWJpQmxQeTVwYm5adlkyRjBhVzl1SVQwOWRtOXBaQ0F3SmlZb2RDNXBiblp2WTJGMGFXOXVQV1V1YVc1MmIyTmhkR2x2Ymlrc1pUOHVjblZ1ZEdsdFpTRTlQWFp2YVdRZ01DWW1LSFF1Y25WdWRHbHRaVDFsTG5KMWJuUnBiV1VwTEh0a1lYUmhPblFzZEhsd1pUcGdjMlZ6YzJsdmJpNXpkR0Z5ZEdWa1lIMTlablZ1WTNScGIyNGdZM0psWVhSbFZIVnlibE4wWVhKMFpXUkZkbVZ1ZENobEtYdHlaWFIxY201N1pHRjBZVHA3YzJWeGRXVnVZMlU2WlM1elpYRjFaVzVqWlN4MGRYSnVTV1E2WlM1MGRYSnVTV1I5TEhSNWNHVTZZSFIxY200dWMzUmhjblJsWkdCOWZXWjFibU4wYVc5dUlHTnlaV0YwWlUxbGMzTmhaMlZTWldObGFYWmxaRVYyWlc1MEtHVXBlM0psZEhWeWJudGtZWFJoT250dFpYTnpZV2RsT25OMWJXMWhjbWw2WlZWelpYSkRiMjUwWlc1MEtHVXViV1Z6YzJGblpTa3NjR0Z5ZEhNNmNISnZhbVZqZEZWelpYSkRiMjUwWlc1MFVHRnlkSE1vWlM1dFpYTnpZV2RsS1N4elpYRjFaVzVqWlRwbExuTmxjWFZsYm1ObExIUjFjbTVKWkRwbExuUjFjbTVKWkgwc2RIbHdaVHBnYldWemMyRm5aUzV5WldObGFYWmxaR0I5ZldaMWJtTjBhVzl1SUhOMWJXMWhjbWw2WlZWelpYSkRiMjUwWlc1MEtHVXBlMmxtS0hSNWNHVnZaaUJsUFQxZ2MzUnlhVzVuWUNseVpYUjFjbTRnWlR0c1pYUWdkRDFiWFR0bWIzSW9iR1YwSUc0Z2IyWWdaU2xwWmlodUxuUjVjR1U5UFQxZ2RHVjRkR0FwZEM1d2RYTm9LRzR1ZEdWNGRDazdaV3h6WlNCcFppaHVMblI1Y0dVOVBUMWdabWxzWldBcGUyeGxkQ0JsUFc0dVptbHNaVzVoYldVL1AyNHViV1ZrYVdGVWVYQmxPM1F1Y0hWemFDaGdXMlpwYkdVNklDUjdaWDBnS0NSN2JpNXRaV1JwWVZSNWNHVjlLVjFnS1gxbGJITmxJRzR1ZEhsd1pUMDlQV0JwYldGblpXQW1KblF1Y0hWemFDaGdXMmx0WVdkbE9pQWtlMjR1YldWa2FXRlVlWEJsUHo5Z2FXMWhaMlZnZlYxZ0tUdHlaWFIxY200Z2RDNXFiMmx1S0dCY2JtQXBmV1oxYm1OMGFXOXVJSEJ5YjJwbFkzUlZjMlZ5UTI5dWRHVnVkRkJoY25SektHVXBlMmxtS0hSNWNHVnZaaUJsUFQxZ2MzUnlhVzVuWUNseVpYUjFjbTViZTNSbGVIUTZaU3gwZVhCbE9tQjBaWGgwWUgxZE8yeGxkQ0IwUFZ0ZE8yWnZjaWhzWlhRZ2JpQnZaaUJsS1c0dWRIbHdaVDA5UFdCMFpYaDBZRDkwTG5CMWMyZ29lM1JsZUhRNmJpNTBaWGgwTEhSNWNHVTZZSFJsZUhSZ2ZTazZiaTUwZVhCbFBUMDlZR1pwYkdWZ1AzUXVjSFZ6YUNod2NtOXFaV04wUm1sc1pVeHBhMlZRWVhKMEtHNHVaR0YwWVN4dUxtMWxaR2xoVkhsd1pTeHVMbVpwYkdWdVlXMWxLU2s2Ymk1MGVYQmxQVDA5WUdsdFlXZGxZQ1ltZEM1d2RYTm9LSEJ5YjJwbFkzUkdhV3hsVEdsclpWQmhjblFvYmk1cGJXRm5aU3h1TG0xbFpHbGhWSGx3WlQ4L1lHRndjR3hwWTJGMGFXOXVMMjlqZEdWMExYTjBjbVZoYldBc2RtOXBaQ0F3S1NrN2NtVjBkWEp1SUhSOVpuVnVZM1JwYjI0Z2NISnZhbVZqZEVacGJHVk1hV3RsVUdGeWRDaGxMSFFzYmlsN2FXWW9hWE5UWVc1a1ltOTRVbVZtVlhKc0tHVXBLWHRzWlhRZ2REMWtaV052WkdWVFlXNWtZbTk0VW1WbUtHVXBPM0psZEhWeWJpQmpjbVZoZEdWUWNtOXFaV04wWldSR2FXeGxVR0Z5ZENoN1ptbHNaVzVoYldVNlltRnpaVzVoYldWUFppaHVQejkwTG5CaGRHZ3BMRzFsWkdsaFZIbHdaVHAwTG0xbFpHbGhWSGx3WlN4emFYcGxPblF1YzJsNlpYMHBmV3hsZENCeVBYQnliMnBsWTNSVVlXZG5aV1JHYVd4bFJHRjBZU2hsTEhRc2JpazdhV1lvY2lFOVBYWnZhV1FnTUNseVpYUjFjbTRnY2p0c1pYUWdhVDFpZVhSbFRHVnVaM1JvVDJZb1pTazdjbVYwZFhKdUlHTnlaV0YwWlZCeWIycGxZM1JsWkVacGJHVlFZWEowS0drOVBUMTJiMmxrSURBL2UyWnBiR1Z1WVcxbE9tNHNiV1ZrYVdGVWVYQmxPblFzTGk0dVkyeHBaVzUwVlhKc1JuSmhaMjFsYm5Rb1pTbDlPbnRtYVd4bGJtRnRaVHB1TEcxbFpHbGhWSGx3WlRwMExITnBlbVU2YVgwcGZXWjFibU4wYVc5dUlIQnliMnBsWTNSVVlXZG5aV1JHYVd4bFJHRjBZU2hsTEhRc2JpbDdhV1lvYVhOVVlXZG5aV1JHYVd4bFJHRjBZU2hsS1NsemQybDBZMmdvWlM1MGVYQmxLWHRqWVhObFlHUmhkR0ZnT250c1pYUWdjajFpZVhSbFRHVnVaM1JvVDJZb1pTNWtZWFJoS1R0eVpYUjFjbTRnWTNKbFlYUmxVSEp2YW1WamRHVmtSbWxzWlZCaGNuUW9jajA5UFhadmFXUWdNRDk3Wm1sc1pXNWhiV1U2Yml4dFpXUnBZVlI1Y0dVNmRIMDZlMlpwYkdWdVlXMWxPbTRzYldWa2FXRlVlWEJsT25Rc2MybDZaVHB5ZlNsOVkyRnpaV0J5WldabGNtVnVZMlZnT21OaGMyVmdkR1Y0ZEdBNmNtVjBkWEp1SUdOeVpXRjBaVkJ5YjJwbFkzUmxaRVpwYkdWUVlYSjBLSHRtYVd4bGJtRnRaVHB1TEcxbFpHbGhWSGx3WlRwMGZTazdZMkZ6WldCMWNteGdPbkpsZEhWeWJpQmpjbVZoZEdWUWNtOXFaV04wWldSR2FXeGxVR0Z5ZENoN1ptbHNaVzVoYldVNmJpeHRaV1JwWVZSNWNHVTZkQ3d1TGk1amJHbGxiblJWY214R2NtRm5iV1Z1ZENobExuVnliQ2w5S1gxOVpuVnVZM1JwYjI0Z1kzSmxZWFJsVUhKdmFtVmpkR1ZrUm1sc1pWQmhjblFvWlNsN2JHVjBJSFE5ZTIxbFpHbGhWSGx3WlRwbExtMWxaR2xoVkhsd1pTeDBlWEJsT21CbWFXeGxZSDA3Y21WMGRYSnVJR1V1Wm1sc1pXNWhiV1VoUFQxMmIybGtJREFtSmloMExtWnBiR1Z1WVcxbFBXVXVabWxzWlc1aGJXVXBMR1V1YzJsNlpTRTlQWFp2YVdRZ01DWW1LSFF1YzJsNlpUMWxMbk5wZW1VcExHVXVkWEpzSVQwOWRtOXBaQ0F3SmlZb2RDNTFjbXc5WlM1MWNtd3BMSFI5Wm5WdVkzUnBiMjRnYVhOVVlXZG5aV1JHYVd4bFJHRjBZU2hsS1h0cFppaDBlWEJsYjJZZ1pTRTlZRzlpYW1WamRHQjhmQ0ZsS1hKbGRIVnliaUV4TzJ4bGRDQjBQV1V1ZEhsd1pUdHlaWFIxY200Z2REMDlQV0JrWVhSaFlIeDhkRDA5UFdCeVpXWmxjbVZ1WTJWZ2ZIeDBQVDA5WUhSbGVIUmdmSHgwUFQwOVlIVnliR0I5Wm5WdVkzUnBiMjRnWW5sMFpVeGxibWQwYUU5bUtHVXBlMmxtS0dVZ2FXNXpkR0Z1WTJWdlppQlZhVzUwT0VGeWNtRjVmSHhsSUdsdWMzUmhibU5sYjJZZ1FYSnlZWGxDZFdabVpYSXBjbVYwZFhKdUlHVXVZbmwwWlV4bGJtZDBhSDFtZFc1amRHbHZiaUJqYkdsbGJuUlZjbXhHY21GbmJXVnVkQ2hsS1h0cFppaHBjMU5sY21saGJHbDZaV1JWY214R2FXeGxVR0Z5ZENobEtTbDBjbmw3YkdWMElHNDlaR1Z6WlhKcFlXeHBlbVZWY214R2FXeGxVR0Z5ZENobEtUdHlaWFIxY200Z2FYTkRiR2xsYm5SU1pYTnZiSFpoWW14bFZYSnNLRzRwUDN0MWNtdzZiaTVvY21WbWZUcDdmWDFqWVhSamFIdHlaWFIxY201N2ZYMXBaaWhsSUdsdWMzUmhibU5sYjJZZ1ZWSk1LWEpsZEhWeWJpQnBjME5zYVdWdWRGSmxjMjlzZG1GaWJHVlZjbXdvWlNrL2UzVnliRHBsTG1oeVpXWjlPbnQ5TzJsbUtIUjVjR1Z2WmlCbElUMWdjM1J5YVc1bllIeDhhR0Z6U1c1MFpYSnVZV3hTWldaVFkyaGxiV1VvWlNrcGNtVjBkWEp1ZTMwN2FXWW9aUzV6ZEdGeWRITlhhWFJvS0dCa1lYUmhPbUFwS1hKbGRIVnlibnQxY213NlpYMDdkSEo1ZTJ4bGRDQjBQVzVsZHlCVlVrd29aU2s3Y21WMGRYSnVJR2x6UTJ4cFpXNTBVbVZ6YjJ4MllXSnNaVlZ5YkNoMEtUOTdkWEpzT25RdWFISmxabjA2ZTMxOVkyRjBZMmg3Y21WMGRYSnVlMzE5ZldaMWJtTjBhVzl1SUdselEyeHBaVzUwVW1WemIyeDJZV0pzWlZWeWJDaGxLWHR5WlhSMWNtNGdaUzV3Y205MGIyTnZiRDA5UFdCb2RIUndPbUI4ZkdVdWNISnZkRzlqYjJ3OVBUMWdhSFIwY0hNNllIeDhaUzV3Y205MGIyTnZiRDA5UFdCa1lYUmhPbUI5Wm5WdVkzUnBiMjRnWW1GelpXNWhiV1ZQWmlobEtYdHNaWFFnZEQxbExuSmxjR3hoWTJWQmJHd29ZRnhjWEZ4Z0xHQXZZQ2tzYmoxMExuTnNhV05sS0hRdWJHRnpkRWx1WkdWNFQyWW9ZQzlnS1NzeEtUdHlaWFIxY200Z2JpNXNaVzVuZEdnK01EOXVPbVY5Wm5WdVkzUnBiMjRnWTNKbFlYUmxRV04wYVc5dWMxSmxjWFZsYzNSbFpFVjJaVzUwS0dVcGUzSmxkSFZ5Ym50a1lYUmhPbnRoWTNScGIyNXpPbVV1WVdOMGFXOXVjeXh6WlhGMVpXNWpaVHBsTG5ObGNYVmxibU5sTEhOMFpYQkpibVJsZURwbExuTjBaWEJKYm1SbGVDeDBkWEp1U1dRNlpTNTBkWEp1U1dSOUxIUjVjR1U2WUdGamRHbHZibk11Y21WeGRXVnpkR1ZrWUgxOVpuVnVZM1JwYjI0Z1kzSmxZWFJsUVhWMGFHOXlhWHBoZEdsdmJsSmxjWFZwY21Wa1JYWmxiblFvWlNsN2JHVjBJSFE5ZTJSbGMyTnlhWEIwYVc5dU9tVXVaR1Z6WTNKcGNIUnBiMjRzYm1GdFpUcGxMbTVoYldVc2MyVnhkV1Z1WTJVNlpTNXpaWEYxWlc1alpTeHpkR1Z3U1c1a1pYZzZaUzV6ZEdWd1NXNWtaWGdzZEhWeWJrbGtPbVV1ZEhWeWJrbGtmVHR5WlhSMWNtNGdaUzVoZFhSb2IzSnBlbUYwYVc5dUlUMDlkbTlwWkNBd0ppWW9kQzVoZFhSb2IzSnBlbUYwYVc5dVBXVXVZWFYwYUc5eWFYcGhkR2x2Ymlrc1pTNTNaV0pvYjI5clZYSnNJVDA5ZG05cFpDQXdKaVlvZEM1M1pXSm9iMjlyVlhKc1BXVXVkMlZpYUc5dmExVnliQ2tzZTJSaGRHRTZkQ3gwZVhCbE9tQmhkWFJvYjNKcGVtRjBhVzl1TG5KbGNYVnBjbVZrWUgxOVpuVnVZM1JwYjI0Z1kzSmxZWFJsUVhWMGFHOXlhWHBoZEdsdmJrTnZiWEJzWlhSbFpFVjJaVzUwS0dVcGUyeGxkQ0IwUFh0dVlXMWxPbVV1Ym1GdFpTeHZkWFJqYjIxbE9tVXViM1YwWTI5dFpTeHpaWEYxWlc1alpUcGxMbk5sY1hWbGJtTmxMSE4wWlhCSmJtUmxlRHBsTG5OMFpYQkpibVJsZUN4MGRYSnVTV1E2WlM1MGRYSnVTV1I5TzNKbGRIVnliaUJsTG1GMWRHaHZjbWw2WVhScGIyNGhQVDEyYjJsa0lEQW1KaWgwTG1GMWRHaHZjbWw2WVhScGIyNDlaUzVoZFhSb2IzSnBlbUYwYVc5dUtTeGxMbkpsWVhOdmJpRTlQWFp2YVdRZ01DWW1LSFF1Y21WaGMyOXVQV1V1Y21WaGMyOXVLU3g3WkdGMFlUcDBMSFI1Y0dVNllHRjFkR2h2Y21sNllYUnBiMjR1WTI5dGNHeGxkR1ZrWUgxOVpuVnVZM1JwYjI0Z1kzSmxZWFJsU1c1d2RYUlNaWEYxWlhOMFpXUkZkbVZ1ZENobEtYdHlaWFIxY201N1pHRjBZVHA3Y21WeGRXVnpkSE02WlM1eVpYRjFaWE4wY3l4elpYRjFaVzVqWlRwbExuTmxjWFZsYm1ObExITjBaWEJKYm1SbGVEcGxMbk4wWlhCSmJtUmxlQ3gwZFhKdVNXUTZaUzUwZFhKdVNXUjlMSFI1Y0dVNllHbHVjSFYwTG5KbGNYVmxjM1JsWkdCOWZXWjFibU4wYVc5dUlHTnlaV0YwWlVGamRHbHZibEpsYzNWc2RFVjJaVzUwS0dVcGUyeGxkQ0IwUFdVdWNtVnFaV04wWldROVBUMGhNRDk3WlhKeWIzSTZZblZwYkdSQlkzUnBiMjVTWlhOMWJIUkZjbkp2Y2lobExuSmxjM1ZzZENrc2MzUmhkSFZ6T21CeVpXcGxZM1JsWkdCOU9tNXZjbTFoYkdsNlpVRmpkR2x2YmxKbGMzVnNkRTkxZEdOdmJXVW9aUzV5WlhOMWJIUXBPM0psZEhWeWJudGtZWFJoT250bGNuSnZjanAwTG1WeWNtOXlMSEpsYzNWc2REcGxMbkpsYzNWc2RDeHpaWEYxWlc1alpUcGxMbk5sY1hWbGJtTmxMSE4wWlhCSmJtUmxlRHBsTG5OMFpYQkpibVJsZUN4emRHRjBkWE02ZEM1emRHRjBkWE1zZEhWeWJrbGtPbVV1ZEhWeWJrbGtmU3gwZVhCbE9tQmhZM1JwYjI0dWNtVnpkV3gwWUgxOVpuVnVZM1JwYjI0Z1kzSmxZWFJsVTNWaVlXZGxiblJEWVd4c1pXUkZkbVZ1ZENobEtYdHlaWFIxY201N1pHRjBZVHA3WTJGc2JFbGtPbVV1WTJGc2JFbGtMR05vYVd4a1UyVnpjMmx2Ymtsa09tVXVZMmhwYkdSVFpYTnphVzl1U1dRc2MyVnpjMmx2Ymtsa09tVXVjMlZ6YzJsdmJrbGtMSE5sY1hWbGJtTmxPbVV1YzJWeGRXVnVZMlVzYm1GdFpUcGxMbTVoYldVc2NtVnRiM1JsT21VdWNtVnRiM1JsTEhSdmIyeE9ZVzFsT21VdWRHOXZiRTVoYldVc2RIVnlia2xrT21VdWRIVnlia2xrTEhkdmNtdG1iRzkzU1dRNlpTNTNiM0pyWm14dmQwbGtmU3gwZVhCbE9tQnpkV0poWjJWdWRDNWpZV3hzWldSZ2ZYMW1kVzVqZEdsdmJpQmpjbVZoZEdWTlpYTnpZV2RsUVhCd1pXNWtaV1JGZG1WdWRDaGxLWHR5WlhSMWNtNTdaR0YwWVRwN2JXVnpjMkZuWlVSbGJIUmhPbVV1YldWemMyRm5aVVJsYkhSaExHMWxjM05oWjJW",
	"VGIwWmhjanBsTG0xbGMzTmhaMlZUYjBaaGNpeHpaWEYxWlc1alpUcGxMbk5sY1hWbGJtTmxMSE4wWlhCSmJtUmxlRHBsTG5OMFpYQkpibVJsZUN4MGRYSnVTV1E2WlM1MGRYSnVTV1I5TEhSNWNHVTZZRzFsYzNOaFoyVXVZWEJ3Wlc1a1pXUmdmWDFtZFc1amRHbHZiaUJqY21WaGRHVlNaV0Z6YjI1cGJtZEJjSEJsYm1SbFpFVjJaVzUwS0dVcGUzSmxkSFZ5Ym50a1lYUmhPbnR5WldGemIyNXBibWRFWld4MFlUcGxMbkpsWVhOdmJtbHVaMFJsYkhSaExISmxZWE52Ym1sdVoxTnZSbUZ5T21VdWNtVmhjMjl1YVc1blUyOUdZWElzYzJWeGRXVnVZMlU2WlM1elpYRjFaVzVqWlN4emRHVndTVzVrWlhnNlpTNXpkR1Z3U1c1a1pYZ3NkSFZ5Ymtsa09tVXVkSFZ5Ymtsa2ZTeDBlWEJsT21CeVpXRnpiMjVwYm1jdVlYQndaVzVrWldSZ2ZYMW1kVzVqZEdsdmJpQmpjbVZoZEdWTlpYTnpZV2RsUTI5dGNHeGxkR1ZrUlhabGJuUW9aU2w3Y21WMGRYSnVlMlJoZEdFNmUyWnBibWx6YUZKbFlYTnZianBsTG1acGJtbHphRkpsWVhOdmJqOC9ZSE4wYjNCZ0xHMWxjM05oWjJVNlpTNXRaWE56WVdkbExITmxjWFZsYm1ObE9tVXVjMlZ4ZFdWdVkyVXNjM1JsY0VsdVpHVjRPbVV1YzNSbGNFbHVaR1Y0TEhSMWNtNUpaRHBsTG5SMWNtNUpaSDBzZEhsd1pUcGdiV1Z6YzJGblpTNWpiMjF3YkdWMFpXUmdmWDFtZFc1amRHbHZiaUJqY21WaGRHVlNaV0Z6YjI1cGJtZERiMjF3YkdWMFpXUkZkbVZ1ZENobEtYdHlaWFIxY201N1pHRjBZVHA3Y21WaGMyOXVhVzVuT21VdWNtVmhjMjl1YVc1bkxITmxjWFZsYm1ObE9tVXVjMlZ4ZFdWdVkyVXNjM1JsY0VsdVpHVjRPbVV1YzNSbGNFbHVaR1Y0TEhSMWNtNUpaRHBsTG5SMWNtNUpaSDBzZEhsd1pUcGdjbVZoYzI5dWFXNW5MbU52YlhCc1pYUmxaR0I5ZldaMWJtTjBhVzl1SUdOeVpXRjBaVkpsYzNWc2RFTnZiWEJzWlhSbFpFVjJaVzUwS0dVcGUzSmxkSFZ5Ym50a1lYUmhPbnR5WlhOMWJIUTZaUzV5WlhOMWJIUXNjMlZ4ZFdWdVkyVTZaUzV6WlhGMVpXNWpaU3h6ZEdWd1NXNWtaWGc2WlM1emRHVndTVzVrWlhnc2RIVnlia2xrT21VdWRIVnlia2xrZlN4MGVYQmxPbUJ5WlhOMWJIUXVZMjl0Y0d4bGRHVmtZSDE5Wm5WdVkzUnBiMjRnWTNKbFlYUmxVM1JsY0ZOMFlYSjBaV1JGZG1WdWRDaGxLWHR5WlhSMWNtNTdaR0YwWVRwN2MyVnhkV1Z1WTJVNlpTNXpaWEYxWlc1alpTeHpkR1Z3U1c1a1pYZzZaUzV6ZEdWd1NXNWtaWGdzZEhWeWJrbGtPbVV1ZEhWeWJrbGtmU3gwZVhCbE9tQnpkR1Z3TG5OMFlYSjBaV1JnZlgxbWRXNWpkR2x2YmlCamNtVmhkR1ZUZEdWd1EyOXRjR3hsZEdWa1JYWmxiblFvWlNsN2JHVjBJSFE5ZTJacGJtbHphRkpsWVhOdmJqcGxMbVpwYm1semFGSmxZWE52Yml4elpYRjFaVzVqWlRwbExuTmxjWFZsYm1ObExITjBaWEJKYm1SbGVEcGxMbk4wWlhCSmJtUmxlQ3gwZFhKdVNXUTZaUzUwZFhKdVNXUjlPM0psZEhWeWJpQmxMblZ6WVdkbElUMDlkbTlwWkNBd0ppWW9kQzUxYzJGblpUMWxMblZ6WVdkbEtTeGxMbkJ5YjNacFpHVnlUV1YwWVdSaGRHRWhQVDEyYjJsa0lEQW1KaWgwTG5CeWIzWnBaR1Z5VFdWMFlXUmhkR0U5WlM1d2NtOTJhV1JsY2sxbGRHRmtZWFJoS1N4N1pHRjBZVHAwTEhSNWNHVTZZSE4wWlhBdVkyOXRjR3hsZEdWa1lIMTlablZ1WTNScGIyNGdZM0psWVhSbFUzUmxjRVpoYVd4bFpFVjJaVzUwS0dVcGUzSmxkSFZ5Ym50a1lYUmhPbnRqYjJSbE9tVXVZMjlrWlN4a1pYUmhhV3h6T21VdVpHVjBZV2xzY3l4dFpYTnpZV2RsT21VdWJXVnpjMkZuWlN4elpYRjFaVzVqWlRwbExuTmxjWFZsYm1ObExITjBaWEJKYm1SbGVEcGxMbk4wWlhCSmJtUmxlQ3gwZFhKdVNXUTZaUzUwZFhKdVNXUjlMSFI1Y0dVNllITjBaWEF1Wm1GcGJHVmtZSDE5Wm5WdVkzUnBiMjRnWTNKbFlYUmxWSFZ5YmtOdmJYQnNaWFJsWkVWMlpXNTBLR1VwZTNKbGRIVnlibnRrWVhSaE9udHpaWEYxWlc1alpUcGxMbk5sY1hWbGJtTmxMSFIxY201SlpEcGxMblIxY201SlpIMHNkSGx3WlRwZ2RIVnliaTVqYjIxd2JHVjBaV1JnZlgxbWRXNWpkR2x2YmlCamNtVmhkR1ZVZFhKdVJtRnBiR1ZrUlhabGJuUW9aU2w3Y21WMGRYSnVlMlJoZEdFNmUyTnZaR1U2WlM1amIyUmxMR1JsZEdGcGJITTZaUzVrWlhSaGFXeHpMRzFsYzNOaFoyVTZaUzV0WlhOellXZGxMSE5sY1hWbGJtTmxPbVV1YzJWeGRXVnVZMlVzZEhWeWJrbGtPbVV1ZEhWeWJrbGtmU3gwZVhCbE9tQjBkWEp1TG1aaGFXeGxaR0I5ZldaMWJtTjBhVzl1SUdOeVpXRjBaVlIxY201RFlXNWpaV3hzWldSRmRtVnVkQ2hsS1h0eVpYUjFjbTU3WkdGMFlUcDdjMlZ4ZFdWdVkyVTZaUzV6WlhGMVpXNWpaU3gwZFhKdVNXUTZaUzUwZFhKdVNXUjlMSFI1Y0dVNllIUjFjbTR1WTJGdVkyVnNiR1ZrWUgxOVpuVnVZM1JwYjI0Z1kzSmxZWFJsUTI5dGNHRmpkR2x2YmxKbGNYVmxjM1JsWkVWMlpXNTBLR1VwZTNKbGRIVnlibnRrWVhSaE9udHRiMlJsYkVsa09tVXViVzlrWld4SlpDeHpaWEYxWlc1alpUcGxMbk5sY1hWbGJtTmxMSE5sYzNOcGIyNUpaRHBsTG5ObGMzTnBiMjVKWkN4MGRYSnVTV1E2WlM1MGRYSnVTV1FzZFhOaFoyVkpibkIxZEZSdmEyVnVjenBsTG5WellXZGxTVzV3ZFhSVWIydGxibk0vUDI1MWJHeDlMSFI1Y0dVNllHTnZiWEJoWTNScGIyNHVjbVZ4ZFdWemRHVmtZSDE5Wm5WdVkzUnBiMjRnWTNKbFlYUmxRMjl0Y0dGamRHbHZia052YlhCc1pYUmxaRVYyWlc1MEtHVXBlM0psZEhWeWJudGtZWFJoT250dGIyUmxiRWxrT21VdWJXOWtaV3hKWkN4elpYRjFaVzVqWlRwbExuTmxjWFZsYm1ObExITmxjM05wYjI1SlpEcGxMbk5sYzNOcGIyNUpaQ3gwZFhKdVNXUTZaUzUwZFhKdVNXUjlMSFI1Y0dVNllHTnZiWEJoWTNScGIyNHVZMjl0Y0d4bGRHVmtZSDE5Wm5WdVkzUnBiMjRnWTNKbFlYUmxVMlZ6YzJsdmJsZGhhWFJwYm1kRmRtVnVkQ2gwS1h0eVpYUjFjbTU3WkdGMFlUcDdZMjl1ZEdsdWRXRjBhVzl1Vkc5clpXNDZkRzlEYUdGdWJtVnNURzlqWVd4RGIyNTBhVzUxWVhScGIyNVViMnRsYmloMEtTeDNZV2wwT21CdVpYaDBMWFZ6WlhJdGJXVnpjMkZuWldCOUxIUjVjR1U2WUhObGMzTnBiMjR1ZDJGcGRHbHVaMkI5ZldaMWJtTjBhVzl1SUdOeVpXRjBaVk5sYzNOcGIyNUdZV2xzWldSRmRtVnVkQ2hsS1h0eVpYUjFjbTU3WkdGMFlUcDdZMjlrWlRwbExtTnZaR1VzWkdWMFlXbHNjenBsTG1SbGRHRnBiSE1zYldWemMyRm5aVHBsTG0xbGMzTmhaMlVzYzJWemMybHZia2xrT21VdWMyVnpjMmx2Ymtsa2ZTeDBlWEJsT21CelpYTnphVzl1TG1aaGFXeGxaR0I5ZldaMWJtTjBhVzl1SUdOeVpXRjBaVk5sYzNOcGIyNURiMjF3YkdWMFpXUkZkbVZ1ZENncGUzSmxkSFZ5Ym50MGVYQmxPbUJ6WlhOemFXOXVMbU52YlhCc1pYUmxaR0I5ZldaMWJtTjBhVzl1SUhScGJXVnpkR0Z0Y0VoaGJtUnNaVTFsYzNOaFoyVlRkSEpsWVcxRmRtVnVkQ2hsTEhROWJtVjNJRVJoZEdVb0tTNTBiMGxUVDFOMGNtbHVaeWdwS1h0eVpYUjFjbTU3TGk0dVpTeHRaWFJoT250aGREcDBmWDE5Wm5WdVkzUnBiMjRnWlc1amIyUmxUV1Z6YzJGblpWTjBjbVZoYlVWMlpXNTBLR1VwZTNKbGRIVnliaUIwWlhoMFJXNWpiMlJsY2k1bGJtTnZaR1VvWUNSN1NsTlBUaTV6ZEhKcGJtZHBabmtvWlNsOVhGeHVZQ2w5Wm5WdVkzUnBiMjRnYm05eWJXRnNhWHBsUVdOMGFXOXVVbVZ6ZFd4MFQzVjBZMjl0WlNobEtYdHBaaWhsTG1selJYSnliM0k5UFQwaE1DbHlaWFIxY201N1pYSnliM0k2WW5WcGJHUkJZM1JwYjI1U1pYTjFiSFJGY25KdmNpaGxLU3h6ZEdGMGRYTTZZR1poYVd4bFpHQjlPMnhsZENCMFBYSmxZV1JCWTNScGIyNVNaWE4xYkhSUGRYUndkWFJGY25KdmNpaGxMbTkxZEhCMWRDazdjbVYwZFhKdUlIUTlQVDEyYjJsa0lEQS9lM04wWVhSMWN6cGdZMjl0Y0d4bGRHVmtZSDA2ZTJWeWNtOXlPblFzYzNSaGRIVnpPbUJtWVdsc1pXUmdmWDFtZFc1amRHbHZiaUJpZFdsc1pFRmpkR2x2YmxKbGMzVnNkRVZ5Y205eUtHVXBlMnhsZENCMFBYSmxZV1JCWTNScGIyNVNaWE4xYkhSUGRYUndkWFJGY25KdmNpaGxMbTkxZEhCMWRDazdjbVYwZFhKdUlIUTlQVDEyYjJsa0lEQS9lMk52WkdVNllFRkRWRWxQVGw5U1JWTlZURlJmUmtGSlRFVkVZQ3h0WlhOellXZGxPbVp2Y20xaGRFRmpkR2x2YmxKbGMzVnNkRTkxZEhCMWRDaGxMbTkxZEhCMWRDbDlPblI5Wm5WdVkzUnBiMjRnY21WaFpFRmpkR2x2YmxKbGMzVnNkRTkxZEhCMWRFVnljbTl5S0dVcGUyeGxkQ0IwUFhCaGNuTmxRV04wYVc5dVVtVnpkV3gwVDNWMGNIVjBVbVZqYjNKa0tHVXBPMmxtS0hROVBUMTJiMmxrSURBcGNtVjBkWEp1TzJ4bGRDQnVQWFI1Y0dWdlppQjBMbU52WkdVOVBXQnpkSEpwYm1kZ0ppWjBMbU52WkdVdWJHVnVaM1JvUGpBL2RDNWpiMlJsT25admFXUWdNQ3h5UFhSNWNHVnZaaUIwTG0xbGMzTmhaMlU5UFdCemRISnBibWRnSmlaMExtMWxjM05oWjJVdWJHVnVaM1JvUGpBL2RDNXRaWE56WVdkbE9uWnZhV1FnTUR0cFppZ2hLRzQ5UFQxMmIybGtJREI4ZkhJOVBUMTJiMmxrSURBcEtYSmxkSFZ5Ym50amIyUmxPbTRzYldWemMyRm5aVHB5ZlgxbWRXNWpkR2x2YmlCd1lYSnpaVUZqZEdsdmJsSmxjM1ZzZEU5MWRIQjFkRkpsWTI5eVpDaGxLWHRwWmloMGVYQmxiMllnWlQwOVlHOWlhbVZqZEdBbUptVXBjbVYwZFhKdUlHVTdhV1lvZEhsd1pXOW1JR1VoUFdCemRISnBibWRnS1hKbGRIVnlianRzWlhRZ2REMWxMblJ5YVcwb0tUdHBaaWgwTG14bGJtZDBhQ0U5UFRBcGRISjVlMnhsZENCbFBVcFRUMDR1Y0dGeWMyVW9kQ2s3YVdZb2RIbHdaVzltSUdVOVBXQnZZbXBsWTNSZ0ppWmxLWEpsZEhWeWJpQmxmV05oZEdOb2UzSmxkSFZ5Ym4xOVpuVnVZM1JwYjI0Z1ptOXliV0YwUVdOMGFXOXVVbVZ6ZFd4MFQzVjBjSFYwS0dVcGUybG1LSFI1Y0dWdlppQmxQVDFnYzNSeWFXNW5ZQ2x5WlhSMWNtNGdaVHRzWlhRZ2REMUtVMDlPTG5OMGNtbHVaMmxtZVNobEtUdHlaWFIxY200Z2RIbHdaVzltSUhROVBXQnpkSEpwYm1kZ0ppWjBMbXhsYm1kMGFENHdQM1E2WUVGamRHbHZiaUJtWVdsc1pXUXVZSDFsZUhCdmNuUjdSVlpGWDAxRlUxTkJSMFZmVTFSU1JVRk5YME5QVGxSRlRsUmZWRmxRUlN4RlZrVmZUVVZUVTBGSFJWOVRWRkpGUVUxZlJrOVNUVUZVTEVWV1JWOU5SVk5UUVVkRlgxTlVVa1ZCVFY5V1JWSlRTVTlPTEVWV1JWOVRSVk5UU1U5T1gwbEVYMGhGUVVSRlVpeEZWa1ZmVTFSU1JVRk5YMFpQVWsxQlZGOUlSVUZFUlZJc1JWWkZYMU5VVWtWQlRWOVdSVkpUU1U5T1gwaEZRVVJGVWl4amNtVmhkR1ZCWTNScGIyNVNaWE4xYkhSRmRtVnVkQ3hqY21WaGRHVkJZM1JwYjI1elVtVnhkV1Z6ZEdWa1JYWmxiblFzWTNKbFlYUmxRWFYwYUc5eWFYcGhkR2x2YmtOdmJYQnNaWFJsWkVWMlpXNTBMR055WldGMFpVRjFkR2h2Y21sNllYUnBiMjVTWlhGMWFYSmxaRVYyWlc1MExHTnlaV0YwWlVOdmJYQmhZM1JwYjI1RGIyMXdiR1YwWldSRmRtVnVkQ3hqY21WaGRHVkRiMjF3WVdOMGFXOXVVbVZ4ZFdWemRHVmtSWFpsYm5Rc1kzSmxZWFJsU1c1d2RYUlNaWEYxWlhOMFpXUkZkbVZ1ZEN4amNtVmhkR1ZOWlhOellXZGxRWEJ3Wlc1a1pXUkZkbVZ1ZEN4amNtVmhkR1ZOWlhOellXZGxRMjl0Y0d4bGRHVmtSWFpsYm5Rc1kzSmxZWFJsVFdWemMyRm5aVkpsWTJWcGRtVmtSWFpsYm5Rc1kzSmxZWFJsVW1WaGMyOXVhVzVuUVhCd1pXNWtaV1JGZG1WdWRDeGpjbVZoZEdWU1pXRnpiMjVwYm1kRGIyMXdiR1YwWldSRmRtVnVkQ3hqY21WaGRHVlNaWE4xYkhSRGIyMXdiR1YwWldSRmRtVnVkQ3hqY21WaGRHVlRaWE56YVc5dVEyOXRjR3hsZEdWa1JYWmxiblFzWTNKbFlYUmxVMlZ6YzJsdmJrWmhhV3hsWkVWMlpXNTBMR055WldGMFpWTmxjM05wYjI1VGRHRnlkR1ZrUlhabGJuUXNZM0psWVhSbFUyVnpjMmx2YmxkaGFYUnBibWRGZG1WdWRDeGpjbVZoZEdWVGRHVndRMjl0Y0d4bGRHVmtSWFpsYm5Rc1kzSmxZWFJsVTNSbGNFWmhhV3hsWkVWMlpXNTBMR055WldGMFpWTjBaWEJUZEdGeWRHVmtSWFpsYm5Rc1kzSmxZWFJsVTNWaVlXZGxiblJEWVd4c1pXUkZkbVZ1ZEN4amNtVmhkR1ZVZFhKdVEyRnVZMlZzYkdWa1JYWmxiblFzWTNKbFlYUmxWSFZ5YmtOdmJYQnNaWFJsWkVWMlpXNTBMR055WldGMFpWUjFjbTVHWVdsc1pXUkZkbVZ1ZEN4amNtVmhkR1ZVZFhKdVUzUmhjblJsWkVWMlpXNTBMR1Z1WTI5a1pVMWxjM05oWjJWVGRISmxZVzFGZG1WdWRDeHBjME4xY25KbGJuUlVkWEp1UW05MWJtUmhjbmxGZG1WdWRDeHBjMVIxY201R1lXbHNkWEpsUlhabGJuUXNkR2x0WlhOMFlXMXdTR0Z1Wkd4bFRXVnpjMkZuWlZOMGNtVmhiVVYyWlc1MGZUc2lMQ0ptZFc1amRHbHZiaUJuWlhSU2RXNTBhVzFsUVdOMGFXOXVVbVZ4ZFdWemRFdGxlU2hsS1h0emQybDBZMmdvWlM1cmFXNWtLWHRqWVhObFlHeHZZV1F0YzJ0cGJHeGdPbkpsZEhWeWJtQnlkVzUwYVcxbExXRmpkR2x2Ympva2UyVXVhMmx1WkgwNkpIdGxMbU5oYkd4SlpIMWdPMk5oYzJWZ2NtVnRiM1JsTFdGblpXNTBMV05oYkd4Z09uSmxkSFZ5Ym1CemRXSmhaMlZ1ZEMxallXeHNPaVI3WlM1eVpXMXZkR1ZCWjJWdWRFNWhiV1Y5T2lSN1pTNWpZV3hzU1dSOVlEdGpZWE5sWUhOMVltRm5aVzUwTFdOaGJHeGdPbkpsZEhWeWJtQnpkV0poWjJWdWRDMWpZV3hzT2lSN1pTNXpkV0poWjJWdWRFNWhiV1Y5T2lSN1pTNWpZV3hzU1dSOVlEdGpZWE5sWUhSdmIyd3RZMkZzYkdBNmNtVjBkWEp1WUhSdmIyd3RZMkZzYkRva2UyVXVkRzl2YkU1aGJXVjlPaVI3WlM1allXeHNTV1I5WUgxOVpuVnVZM1JwYjI0Z1oyVjBVblZ1ZEdsdFpVRmpkR2x2YmxKbGMzVnNkRXRsZVNobEtYdHpkMmwwWTJnb1pTNXJhVzVrS1h0allYTmxZR3h2WVdRdGMydHBiR3d0Y21WemRXeDBZRHB5WlhSMWNtNWdjblZ1ZEdsdFpTMWhZM1JwYjI0NmJHOWhaQzF6YTJsc2JEb2tlMlV1WTJGc2JFbGtmV0E3WTJGelpXQnpkV0poWjJWdWRDMXlaWE4xYkhSZ09uSmxkSFZ5Ym1CemRXSmhaMlZ1ZEMxallXeHNPaVI3WlM1emRXSmhaMlZ1ZEU1aGJXVjlPaVI3WlM1allXeHNTV1I5WUR0allYTmxZSFJ2YjJ3dGNtVnpkV3gwWURweVpYUjFjbTVnZEc5dmJDMWpZV3hzT2lSN1pTNTBiMjlzVG1GdFpYMDZKSHRsTG1OaGJHeEpaSDFnZlgxbGVIQnZjblI3WjJWMFVuVnVkR2x0WlVGamRHbHZibEpsY1hWbGMzUkxaWGtzWjJWMFVuVnVkR2x0WlVGamRHbHZibEpsYzNWc2RFdGxlWDA3SWl3aWFXMXdiM0owZTJOeVpXRjBaVUZqZEdsdmJsSmxjM1ZzZEVWMlpXNTBmV1p5YjIxY0lpTndjbTkwYjJOdmJDOXRaWE56WVdkbExtcHpYQ0k3YVcxd2IzSjBlM0JoY25ObFNuTnZiazlpYW1WamRIMW1jbTl0WENJamMyaGhjbVZrTDJwemIyNHVhbk5jSWp0cGJYQnZjblI3WTJ4bFlYSlFjbTk0ZVVsdWNIVjBVbVZ4ZFdWemRITkdiM0pEYUdsc1pIMW1jbTl0WENJamFHRnlibVZ6Y3k5d2NtOTRlUzFwYm5CMWRDMXlaWEYxWlhOMGN5NXFjMXdpTzJsdGNHOXlkSHRoWTJOMWJYVnNZWFJsVTJWemMybHZibFZ6WVdkbExHZGxkRlIxY201VmMyRm5aVk4wWVhSbExITmxkRlIxY201VmMyRm5aVk4wWVhSbGZXWnliMjFjSWlOb1lYSnVaWE56TDNSMWNtNHRkR0ZuTFhOMFlYUmxMbXB6WENJN2FXMXdiM0owZTJkbGRGSjFiblJwYldWQlkzUnBiMjVTWlhGMVpYTjBTMlY1TEdkbGRGSjFiblJwYldWQlkzUnBiMjVTWlhOMWJIUkxaWGw5Wm5KdmJWd2lJM0oxYm5ScGJXVXZZV04wYVc5dWN5OXJaWGx6TG1welhDSTdZMjl1YzNRZ1VFVk9SRWxPUjE5U1ZVNVVTVTFGWDBGRFZFbFBUbDlDUVZSRFNGOUxSVms5WUdWMlpTNXlkVzUwYVcxbExuQmxibVJwYm1kQlkzUnBiMjVDWVhSamFHQTdablZ1WTNScGIyNGdaMlYwVUdWdVpHbHVaMUoxYm5ScGJXVkJZM1JwYjI1Q1lYUmphQ2hsS1h0c1pYUWdkRDFsUHk1YlVFVk9SRWxPUjE5U1ZVNVVTVTFGWDBGRFZFbFBUbDlDUVZSRFNGOUxSVmxkTzJsbUtIUjVjR1Z2WmlCMElUMWdiMkpxWldOMFlIeDhJWFFwY21WMGRYSnVPMnhsZENCdVBYUTdhV1lvSVNnaFFYSnlZWGt1YVhOQmNuSmhlU2h1TG1GamRHbHZibk1wZkh3aFFYSnlZWGt1YVhOQmNuSmhlU2h1TG5KbGMzQnZibk5sVFdWemMyRm5aWE1wZkh4MGVYQmxiMllnYmk1bGRtVnVkQ0U5WUc5aWFtVmpkR0I4Zkc0dVpYWmxiblE5UFQxdWRXeHNLU2x5WlhSMWNtNGdibjFtZFc1amRHbHZiaUJvWVhOUVpXNWthVzVuVW5WdWRHbHRaVUZqZEdsdmJrSmhkR05vS0dVcGUzSmxkSFZ5YmlCblpYUlFaVzVrYVc1blVuVnVkR2x0WlVGamRHbHZia0poZEdOb0tHVXBJVDA5ZG05cFpDQXdmV1oxYm1OMGFXOXVJR05zWldGeVVHVnVaR2x1WjFKMWJuUnBiV1ZCWTNScGIyNUNZWFJqYUNobEtYdHBaaWhsTG5OMFlYUmxQeTViVUVWT1JFbE9SMTlTVlU1VVNVMUZYMEZEVkVsUFRsOUNRVlJEU0Y5TFJWbGRQVDA5ZG05cFpDQXdLWEpsZEhWeWJpQmxPMnhsZENCMFBYc3VMaTVsTG5OMFlYUmxmVHR5WlhSMWNtNGdaR1ZzWlhSbElIUmJVRVZPUkVsT1IxOVNWVTVVU1UxRlgwRkRWRWxQVGw5Q1FWUkRTRjlMUlZsZExIc3VMaTVsTEhOMFlYUmxPazlpYW1WamRDNXJaWGx6S0hRcExteGxibWQwYUQ0d1AzUTZkbTlwWkNBd2ZYMW1kVzVqZEdsdmJpQnpaWFJRWlc1a2FXNW5VblZ1ZEdsdFpVRmpkR2x2YmtKaGRHTm9LR1VwZTJ4bGRDQjBQWHN1TGk1bExuTmxjM05wYjI0dWMzUmhkR1Y5TzNKbGRIVnliaUIwVzFCRlRrUkpUa2RmVWxWT1ZFbE5SVjlCUTFSSlQwNWZRa0ZVUTBoZlMwVlpYVDE3WVdOMGFXOXVjenBiTGk0dVpTNWhZM1JwYjI1elhTeGxkbVZ1ZERwbExtVjJaVzUwTEhKbGMzQnZibk5sVFdWemMyRm5aWE02V3k0dUxtVXVjbVZ6Y0c5dWMyVk5aWE56WVdkbGMxMTlMSHN1TGk1bExuTmxjM05wYjI0c2MzUmhkR1U2ZEgxOVpuVnVZM1JwYjI0Z2NtVmpiM0prVUdWdVpHbHVaMU4xWW1GblpXNTBRMmhwYkdRb1pTbDdiR1YwSUhROVoyVjBVR1Z1WkdsdVoxSjFiblJwYldWQlkzUnBiMjVDWVhSamFDaGxMbk5sYzNOcGIyNHVjM1JoZEdVcE8ybG1LSFE5UFQxMmIybGtJREFwY21WMGRYSnVJR1V1YzJWemMybHZianRzWlhRZ2JqMTdMaTR1WlM1elpYTnphVzl1TG5OMFlYUmxmVHR5WlhSMWNtNGdibHRRUlU1RVNVNUhYMUpWVGxSSlRVVmZRVU5VU1U5T1gwSkJWRU5JWDB0RldWMDlleTR1TG5Rc0xpNHVaUzVqYUdsc1pDNXJhVzVrUFQwOVlHeHZZMkZzWUQ5N1kyaHBiR1JEYjI1MGFXNTFZWFJwYjI1VWIydGxibk02ZXk0dUxuUXVZMmhwYkdSRGIyNTBhVzUxWVhScGIyNVViMnRsYm5Nc1cyVXVZMkZzYkVsa1hUcGxMbU5vYVd4a0xtTnZiblJwYm5WaGRHbHZibFJ2YTJWdWZYMDZlMzBzWTJocGJHUlRaWE56YVc5dVNXUnpPbnN1TGk1MExtTm9hV3hrVTJWemMybHZia2xrY3l4YlpTNWpZV3hzU1dSZE9tVXVZMmhwYkdRdWMyVnpjMmx2Ymtsa2ZYMHNleTR1TG1VdWMyVnpjMmx2Yml4emRHRjBaVHB1ZlgxbWRXNWpkR2x2YmlCeVpYTnZiSFpsVW1WaFpIbFNkVzUwYVcxbFFXTjBhVzl1VW1WemRXeDBjeWhsS1h0c1pYUWdkRDFuWlhSUVpXNWthVzVuVW5WdWRHbHRaVUZqZEdsdmJrSmhkR05vS0dVdWMyVnpjMmx2Ymk1emRHRjBaU2s3YVdZb2RDRTlQWFp2YVdRZ01DbHlaWFIxY200Z2NtVnpiMngyWlZKMWJuUnBiV1ZCWTNScGIyNVNaWE4xYkhSelJtOXlRbUYwWTJnb2UySmhkR05vT25Rc2NtVnpkV3gwY3pwbExuSmxjM1ZzZEhOOUtYMW1kVzVqZEdsdmJpQnlaWE52YkhabFVuVnVkR2x0WlVGamRHbHZibEpsYzNWc2RITkdiM0pDWVhSamFDaGxLWHR5WlhSMWNtNGdjbVZ6YjJ4MlpWSjFiblJwYldWQlkzUnBiMjVTWlhOMWJIUnpSbTl5UzJWNWN5aDdjR1Z1WkdsdVowdGxlWE02WlM1aVlYUmphQzVoWTNScGIyNXpMbTFoY0NobFBUNW5aWFJTZFc1MGFXMWxRV04wYVc5dVVtVnhkV1Z6ZEV0bGVTaGxLU2tzY21WemRXeDBjenBsTG5KbGMzVnNkSE45S1gxbWRXNWpkR2x2YmlCeVpYTnZiSFpsVW5WdWRHbHRaVUZqZEdsdmJsSmxjM1ZzZEhOR2IzSkxaWGx6S0dVcGUyeGxkQ0IwUFc1bGR5QlRaWFFvWlM1d1pXNWthVzVuUzJWNWN5a3NiajF1WlhjZ1RXRndPMlp2Y2loc1pYUWdjaUJ2WmlCbExuSmxjM1ZzZEhNcGUyeGxkQ0JsUFdkbGRGSjFiblJwYldWQlkzUnBiMjVTWlhOMWJIUkxaWGtvY2lrN2RDNW9ZWE1vWlNrbUptNHVjMlYwS0dVc2NpbDliR1YwSUhJOVcxMDdabTl5S0d4bGRDQjBJRzltSUdVdWNHVnVaR2x1WjB0bGVYTXBlMnhsZENCbFBXNHVaMlYwS0hRcE8ybG1LR1U5UFQxMmIybGtJREFwY21WMGRYSnVPM0l1Y0hWemFDaGxLWDF5WlhSMWNtNGdjbjFoYzNsdVl5Qm1kVzVqZEdsdmJpQnlaWE52YkhabFVHVnVaR2x1WjFKMWJuUnBiV1ZCWTNScGIyNXpLSFFwZTJ4bGRDQnBQV2RsZEZCbGJtUnBibWRTZFc1MGFXMWxRV04wYVc5dVFtRjBZMmdvZEM1elpYTnphVzl1TG5OMFlYUmxLVHRwWmlocFBUMDlkbTlwWkNBd0tYSmxkSFZ5Ym50dFpYTnpZV2RsY3pwYkxpNHVkQzV6WlhOemFXOXVMbWhwYzNSdmNubGRMRzkxZEdOdmJXVTZZR052Ym5ScGJuVmxZQ3h6WlhOemFXOXVPblF1YzJWemMybHZibjA3YkdWMElHRTljbVZ6YjJ4MlpWSmxZV1I1VW5WdWRHbHRaVUZqZEdsdmJsSmxjM1ZzZEhNb2UzSmxjM1ZzZEhNNmRDNXpkR1Z3U1c1d2RYUS9MbkoxYm5ScGJXVkJZM1JwYjI1U1pYTjFiSFJ6UHo5YlhTeHpaWE56YVc5dU9uUXVjMlZ6YzJsdmJuMHBPMmxtS0dFOVBUMTJiMmxrSURBcGNtVjBkWEp1ZTIxbGMzTmhaMlZ6T2xzdUxpNTBMbk5sYzNOcGIyNHVhR2x6ZEc5eWVWMHNiM1YwWTI5dFpUcGdkVzV5WlhOdmJIWmxaR0FzYzJWemMybHZianAwTG5ObGMzTnBiMjU5TzJsbUtIUXVaVzFwZENFOVBYWnZhV1FnTUNsbWIzSW9iR1YwSUc0Z2IyWWdZU2x1TG10cGJtUTlQVDFnYzNWaVlXZGxiblF0Y21WemRXeDBZQ1ltYmk1cGMwVnljbTl5SVQwOUlUQW1KbUYzWVdsMElIUXVaVzFwZENoN1pHRjBZVHA3WTJGc2JFbGtPbTR1WTJGc2JFbGtMRzkxZEhCMWREcDBlWEJsYjJZZ2JpNXZkWFJ3ZFhROVBXQnpkSEpwYm1kZ1AyNHViM1YwY0hWME9rcFRUMDR1YzNSeWFXNW5hV1o1S0c0dWIzVjBjSFYwS1N4emRXSmhaMlZ1ZEU1aGJXVTZiaTV6ZFdKaFoyVnVkRTVoYldWOUxIUjVjR1U2WUhOMVltRm5aVzUwTG1OdmJYQnNaWFJsWkdCOUtTeGhkMkZwZENCMExtVnRhWFFvWTNKbFlYUmxRV04wYVc5dVVtVnpkV3gwUlhabGJuUW9lM0psYzNWc2REcHVMSE5sY1hWbGJtTmxPbWt1WlhabGJuUXVjMlZ4ZFdWdVkyVXNjM1JsY0VsdVpHVjRPbWt1WlhabGJuUXVjM1JsY0VsdVpHVjRMSFIxY201SlpEcHBMbVYyWlc1MExuUjFjbTVKWkgwcEtUdHNaWFFnYnoxN0xpNHVkQzV6WlhOemFXOXVMbk4wWVhSbGZUdGtaV3hsZEdVZ2IxdFFSVTVFU1U1SFgxSlZUbFJKVFVWZlFVTlVTVTlPWDBKQlZFTklYMHRGV1YwN2JHVjBJSE05ZXk0dUxuUXVjMlZ6YzJsdmJpeHpkR0YwWlRwUFltcGxZM1F1YTJWNWN5aHZLUzVzWlc1bmRHZytNRDl2T25admFXUWdNSDBzWXoxcExtTm9hV3hrUTI5dWRHbHVkV0YwYVc5dVZHOXJaVzV6TzJsbUtHTWhQVDEyYjJsa0lEQXBabTl5S0d4bGRDQmxJRzltSUdFcGUybG1LR1V1YTJsdVpDRTlQV0J6ZFdKaFoyVnVkQzF5WlhOMWJIUmdLV052Ym5ScGJuVmxPMnhsZENCMFBXTmJaUzVqWVd4c1NXUmRPM1FoUFQxMmIybGtJREFtSmloelBXTnNaV0Z5VUhKdmVIbEpibkIxZEZKbGNYVmxjM1J6Um05eVEyaHBiR1FvY3l4MEtTbDlabTl5S0d4bGRDQmxJRzltSUdFcFpTNXJhVzVrSVQwOVlITjFZbUZuWlc1MExYSmxjM1ZzZEdCOGZHVXVkWE5oWjJVOVBUMTJiMmxrSURCOGZDaHpQWE5sZEZSMWNtNVZjMkZuWlZOMFlYUmxLSE1zWVdOamRXMTFiR0YwWlZObGMzTnBiMjVWYzJGblpTaDdjSEpsZG1sdmRYTTZaMlYwVkhWeWJsVnpZV2RsVTNSaGRHVW9jeTV6ZEdGMFpTa3NkWE5oWjJVNlpTNTFjMkZuWlgwcEtTazdiR1YwSUd3OVlTNXRZWEFvWlQwK2UzTjNhWFJqYUNobExtdHBibVFwZTJOaGMyVmdiRzloWkMxemEybHNiQzF5WlhOMWJIUmdPbkpsZEhWeWJudHZkWFJ3ZFhRNmRHOVViMjlzVW1WemRXeDBUM1YwY0hWMEtHVXBMSFJ2YjJ4RFlXeHNTV1E2WlM1allXeHNTV1FzZEc5dmJFNWhiV1U2WUd4dllXUmZjMnRwYkd4Z0xIUjVjR1U2WUhSdmIyd3RjbVZ6ZFd4MFlIMDdZMkZ6WldCemRXSmhaMlZ1ZEMxeVpYTjFiSFJnT25KbGRIVnlibnR2ZFhSd2RYUTZkRzlVYjI5c1VtVnpkV3gwVDNWMGNIVjBLR1VwTEhSdmIyeERZV3hzU1dRNlpTNWpZV3hzU1dRc2RHOXZiRTVoYldVNlpTNXpkV0poWjJWdWRFNWhiV1VzZEhsd1pUcGdkRzl2YkMxeVpYTjFiSFJnZlR0allYTmxZSFJ2YjJ3dGNtVnpkV3gwWURweVpYUjFjbTU3YjNWMGNIVjBPblJ2Vkc5dmJGSmxjM1ZzZEU5MWRIQjFkQ2hsS1N4MGIyOXNRMkZzYkVsa09tVXVZMkZzYkVsa0xIUnZiMnhPWVcxbE9tVXVkRzl2YkU1aGJXVXNkSGx3WlRwZ2RHOXZiQzF5WlhOMWJIUmdmWDEwYUhKdmR5QkZjbkp2Y2loZ1ZXNXpkWEJ3YjNKMFpXUWdjblZ1ZEdsdFpTQmhZM1JwYjI0",
	"Z2NtVnpkV3gwSUd0cGJtUWdYQ0lrZTFOMGNtbHVaeWhsS1gxY0lpNWdLWDBwTEhVOVd5NHVMbk11YUdsemRHOXllU3d1TGk1cExuSmxjM0J2Ym5ObFRXVnpjMkZuWlhOZE8zSmxkSFZ5YmlCc0xteGxibWQwYUQ0d0ppWjFMbkIxYzJnb2UyTnZiblJsYm5RNmJDeHliMnhsT21CMGIyOXNZSDBwTEh0dFpYTnpZV2RsY3pwMUxHOTFkR052YldVNllISmxjMjlzZG1Wa1lDeHpaWE56YVc5dU9uTjlmV1oxYm1OMGFXOXVJR055WldGMFpWSjFiblJwYldWQlkzUnBiMjVTWlhGMVpYTjBSbkp2YlZSdmIyeERZV3hzS0dVcGUyeGxkQ0IwUFdVdWRHOXZiSE11WjJWMEtHVXVkRzl2YkVOaGJHd3VkRzl2YkU1aGJXVXBPM0psZEhWeWJpQjBQeTV5ZFc1MGFXMWxRV04wYVc5dVB5NXJhVzVrUFQwOVlITjFZbUZuWlc1MExXTmhiR3hnUDN0allXeHNTV1E2WlM1MGIyOXNRMkZzYkM1MGIyOXNRMkZzYkVsa0xHUmxjMk55YVhCMGFXOXVPblF1WkdWelkzSnBjSFJwYjI0c2FXNXdkWFE2Y21WemIyeDJaVlJ2YjJ4RFlXeHNTVzV3ZFhSUFltcGxZM1FvWlM1MGIyOXNRMkZzYkM1cGJuQjFkQ3g3WTJGc2JFbGtPbVV1ZEc5dmJFTmhiR3d1ZEc5dmJFTmhiR3hKWkN4MGIyOXNUbUZ0WlRwbExuUnZiMnhEWVd4c0xuUnZiMnhPWVcxbGZTa3NhMmx1WkRwZ2MzVmlZV2RsYm5RdFkyRnNiR0FzYm1GdFpUcDBMbTVoYldVc2JtOWtaVWxrT25RdWNuVnVkR2x0WlVGamRHbHZiaTV1YjJSbFNXUXNjM1ZpWVdkbGJuUk9ZVzFsT25RdWNuVnVkR2x0WlVGamRHbHZiaTV6ZFdKaFoyVnVkRTVoYldWOU9uUS9MbkoxYm5ScGJXVkJZM1JwYjI0L0xtdHBibVE5UFQxZ2NtVnRiM1JsTFdGblpXNTBMV05oYkd4Z1AzdGpZV3hzU1dRNlpTNTBiMjlzUTJGc2JDNTBiMjlzUTJGc2JFbGtMR1JsYzJOeWFYQjBhVzl1T25RdVpHVnpZM0pwY0hScGIyNHNhVzV3ZFhRNmNtVnpiMngyWlZSdmIyeERZV3hzU1c1d2RYUlBZbXBsWTNRb1pTNTBiMjlzUTJGc2JDNXBibkIxZEN4N1kyRnNiRWxrT21VdWRHOXZiRU5oYkd3dWRHOXZiRU5oYkd4SlpDeDBiMjlzVG1GdFpUcGxMblJ2YjJ4RFlXeHNMblJ2YjJ4T1lXMWxmU2tzYTJsdVpEcGdjbVZ0YjNSbExXRm5aVzUwTFdOaGJHeGdMRzVoYldVNmRDNXVZVzFsTEc1dlpHVkpaRHAwTG5KMWJuUnBiV1ZCWTNScGIyNHVibTlrWlVsa0xISmxiVzkwWlVGblpXNTBUbUZ0WlRwMExuSjFiblJwYldWQlkzUnBiMjR1Y21WdGIzUmxRV2RsYm5ST1lXMWxQejkwTG01aGJXVjlPbnRqWVd4c1NXUTZaUzUwYjI5c1EyRnNiQzUwYjI5c1EyRnNiRWxrTEdsdWNIVjBPbkpsYzI5c2RtVlViMjlzUTJGc2JFbHVjSFYwVDJKcVpXTjBLR1V1ZEc5dmJFTmhiR3d1YVc1d2RYUXNlMk5oYkd4SlpEcGxMblJ2YjJ4RFlXeHNMblJ2YjJ4RFlXeHNTV1FzZEc5dmJFNWhiV1U2WlM1MGIyOXNRMkZzYkM1MGIyOXNUbUZ0WlgwcExHdHBibVE2WUhSdmIyd3RZMkZzYkdBc2RHOXZiRTVoYldVNlpTNTBiMjlzUTJGc2JDNTBiMjlzVG1GdFpYMTlablZ1WTNScGIyNGdjbVZ6YjJ4MlpWUnZiMnhEWVd4c1NXNXdkWFJQWW1wbFkzUW9aU3h1S1h0cFppaGxQVDF1ZFd4c0tYSmxkSFZ5Ym50OU8zUnllWHR5WlhSMWNtNGdjR0Z5YzJWS2MyOXVUMkpxWldOMEtHVXBmV05oZEdOb0tHVXBlMnhsZENCMFBXVWdhVzV6ZEdGdVkyVnZaaUJGY25KdmNqOWxMbTFsYzNOaFoyVTZVM1J5YVc1bktHVXBPM1JvY205M0lGUjVjR1ZGY25KdmNpaGdSbUZwYkdWa0lIUnZJSEJoY25ObElIUnZiMnd0WTJGc2JDQmhjbWQxYldWdWRITWdabTl5SUZ3aUpIdHVMblJ2YjJ4T1lXMWxmVndpSUNna2UyNHVZMkZzYkVsa2ZTazZJQ1I3ZEgxZ0xIdGpZWFZ6WlRwbGZTbDlmV1oxYm1OMGFXOXVJSFJ2Vkc5dmJGSmxjM1ZzZEU5MWRIQjFkQ2hsS1h0eVpYUjFjbTRnZEhsd1pXOW1JR1V1YjNWMGNIVjBQVDFnYzNSeWFXNW5ZRDlsTG1selJYSnliM0k5UFQwaE1EOTdkSGx3WlRwZ1pYSnliM0l0ZEdWNGRHQXNkbUZzZFdVNlpTNXZkWFJ3ZFhSOU9udDBlWEJsT21CMFpYaDBZQ3gyWVd4MVpUcGxMbTkxZEhCMWRIMDZaUzVwYzBWeWNtOXlQVDA5SVRBL2UzUjVjR1U2WUdWeWNtOXlMV3B6YjI1Z0xIWmhiSFZsT25SdlRYVjBZV0pzWlVwemIyNVdZV3gxWlNobExtOTFkSEIxZENsOU9udDBlWEJsT21CcWMyOXVZQ3gyWVd4MVpUcDBiMDExZEdGaWJHVktjMjl1Vm1Gc2RXVW9aUzV2ZFhSd2RYUXBmWDFtZFc1amRHbHZiaUIwYjAxMWRHRmliR1ZLYzI5dVZtRnNkV1VvWlNsN2FXWW9aVDA5UFc1MWJHeDhmSFI1Y0dWdlppQmxQVDFnYzNSeWFXNW5ZSHg4ZEhsd1pXOW1JR1U5UFdCdWRXMWlaWEpnZkh4MGVYQmxiMllnWlQwOVlHSnZiMnhsWVc1Z0tYSmxkSFZ5YmlCbE8ybG1LRUZ5Y21GNUxtbHpRWEp5WVhrb1pTa3BjbVYwZFhKdUlHVXViV0Z3S0dVOVBuUnZUWFYwWVdKc1pVcHpiMjVXWVd4MVpTaGxLU2s3YkdWMElIUTllMzA3Wm05eUtHeGxkRnR1TEhKZGIyWWdUMkpxWldOMExtVnVkSEpwWlhNb1pTa3BkRnR1WFQxMGIwMTFkR0ZpYkdWS2MyOXVWbUZzZFdVb2NpazdjbVYwZFhKdUlIUjlaWGh3YjNKMGUyTnNaV0Z5VUdWdVpHbHVaMUoxYm5ScGJXVkJZM1JwYjI1Q1lYUmphQ3hqY21WaGRHVlNkVzUwYVcxbFFXTjBhVzl1VW1WeGRXVnpkRVp5YjIxVWIyOXNRMkZzYkN4blpYUlFaVzVrYVc1blVuVnVkR2x0WlVGamRHbHZia0poZEdOb0xHaGhjMUJsYm1ScGJtZFNkVzUwYVcxbFFXTjBhVzl1UW1GMFkyZ3NjbVZqYjNKa1VHVnVaR2x1WjFOMVltRm5aVzUwUTJocGJHUXNjbVZ6YjJ4MlpWQmxibVJwYm1kU2RXNTBhVzFsUVdOMGFXOXVjeXh5WlhOdmJIWmxVblZ1ZEdsdFpVRmpkR2x2YmxKbGMzVnNkSE5HYjNKTFpYbHpMSEpsYzI5c2RtVlViMjlzUTJGc2JFbHVjSFYwVDJKcVpXTjBMSE5sZEZCbGJtUnBibWRTZFc1MGFXMWxRV04wYVc5dVFtRjBZMmg5T3lJc0lpOHFLbDlmYVc1MFpYSnVZV3hmZDI5eWEyWnNiM2R6ZTF3aWMzUmxjSE5jSWpwN1hDSmthWE4wTDNOeVl5OWxlR1ZqZFhScGIyNHZaR2x6Y0dGMFkyZ3RjblZ1ZEdsdFpTMWhZM1JwYjI1ekxYTjBaWEF1YW5OY0lqcDdYQ0prYVhOd1lYUmphRkoxYm5ScGJXVkJZM1JwYjI1elUzUmxjRndpT250Y0luTjBaWEJKWkZ3aU9sd2ljM1JsY0M4dlpYWmxRREF1TWpZdU1TOHZaR2x6Y0dGMFkyaFNkVzUwYVcxbFFXTjBhVzl1YzFOMFpYQmNJbjE5ZlgwcUx6dGNibVY0Y0c5eWRDQjJZWElnWkdsemNHRjBZMmhTZFc1MGFXMWxRV04wYVc5dWMxTjBaWEFnUFNCbmJHOWlZV3hVYUdselcxTjViV0p2YkM1bWIzSW9YQ0pYVDFKTFJreFBWMTlWVTBWZlUxUkZVRndpS1Ywb1hDSnpkR1Z3THk5bGRtVkFNQzR5Tmk0eEx5OWthWE53WVhSamFGSjFiblJwYldWQlkzUnBiMjV6VTNSbGNGd2lLVHRjYmlJc0ltWjFibU4wYVc5dUlISmxjMjlzZG1WV1pYSmpaV3hRY205a2RXTjBhVzl1UTJGc2JHSmhZMnRDWVhObFZYSnNLQ2w3Y21WMGRYSnVJSEJ5YjJObGMzTXVaVzUyTGxaRlVrTkZURjlGVGxZOVBUMWdjSEp2WkhWamRHbHZibUFtSm5CeWIyTmxjM011Wlc1MkxsWkZVa05GVEY5UVVrOUtSVU5VWDFCU1QwUlZRMVJKVDA1ZlZWSk1QMkJvZEhSd2N6b3ZMeVI3Y0hKdlkyVnpjeTVsYm5ZdVZrVlNRMFZNWDFCU1QwcEZRMVJmVUZKUFJGVkRWRWxQVGw5VlVreDlZRHB1ZFd4c2ZXWjFibU4wYVc5dUlISmxjMjlzZG1WWGIzSnJabXh2ZDBOaGJHeGlZV05yUW1GelpWVnliQ2hsS1h0c1pYUWdkRDF3Y205alpYTnpMbVZ1ZGk1WFQxSkxSa3hQVjE5TVQwTkJURjlDUVZORlgxVlNURDh1ZEhKcGJTZ3BmSHgyYjJsa0lEQTdjbVYwZFhKdUtISmxjMjlzZG1WV1pYSmpaV3hRY205a2RXTjBhVzl1UTJGc2JHSmhZMnRDWVhObFZYSnNLQ2svUDNRL1AyVXBMbkpsY0d4aFkyVW9MMXhjTHlRdkxHQmdLWDFtZFc1amRHbHZiaUJqY21WaGRHVlhiM0pyWm14dmQwTmhiR3hpWVdOclZYSnNLR1VzZENsN2JHVjBJRzQ5Ym1WM0lGVlNUQ2gwTEdVcExISTljSEp2WTJWemN5NWxibll1VmtWU1EwVk1YMEZWVkU5TlFWUkpUMDVmUWxsUVFWTlRYMU5GUTFKRlZEOHVkSEpwYlNncE8zSmxkSFZ5YmlCeUppWnVMbk5sWVhKamFGQmhjbUZ0Y3k1elpYUW9ZSGd0ZG1WeVkyVnNMWEJ5YjNSbFkzUnBiMjR0WW5sd1lYTnpZQ3h5S1N4dUxuUnZVM1J5YVc1bktDbDlaWGh3YjNKMGUyTnlaV0YwWlZkdmNtdG1iRzkzUTJGc2JHSmhZMnRWY213c2NtVnpiMngyWlZabGNtTmxiRkJ5YjJSMVkzUnBiMjVEWVd4c1ltRmphMEpoYzJWVmNtd3NjbVZ6YjJ4MlpWZHZjbXRtYkc5M1EyRnNiR0poWTJ0Q1lYTmxWWEpzZlRzaUxDSXZLaXBmWDJsdWRHVnlibUZzWDNkdmNtdG1iRzkzYzN0Y0luTjBaWEJ6WENJNmUxd2laR2x6ZEM5emNtTXZaWGhsWTNWMGFXOXVMM2R2Y210bWJHOTNMWE4wWlhCekxtcHpYQ0k2ZTF3aWRIVnlibE4wWlhCY0lqcDdYQ0p6ZEdWd1NXUmNJanBjSW5OMFpYQXZMMlYyWlVBd0xqSTJMakV2TDNSMWNtNVRkR1Z3WENKOUxGd2ljbTkxZEdWUWNtOTRhV1ZrUkdWc2FYWmxjbE4wWlhCY0lqcDdYQ0p6ZEdWd1NXUmNJanBjSW5OMFpYQXZMMlYyWlVBd0xqSTJMakV2TDNKdmRYUmxVSEp2ZUdsbFpFUmxiR2wyWlhKVGRHVndYQ0o5TEZ3aVpHbHpjR0YwWTJoVWRYSnVVM1JsY0Z3aU9udGNJbk4wWlhCSlpGd2lPbHdpYzNSbGNDOHZaWFpsUURBdU1qWXVNUzh2WkdsemNHRjBZMmhVZFhKdVUzUmxjRndpZlgxOWZTb3ZPMXh1Wlhod2IzSjBJSFpoY2lCMGRYSnVVM1JsY0NBOUlHZHNiMkpoYkZSb2FYTmJVM2x0WW05c0xtWnZjaWhjSWxkUFVrdEdURTlYWDFWVFJWOVRWRVZRWENJcFhTaGNJbk4wWlhBdkwyVjJaVUF3TGpJMkxqRXZMM1IxY201VGRHVndYQ0lwTzF4dVpYaHdiM0owSUhaaGNpQnliM1YwWlZCeWIzaHBaV1JFWld4cGRtVnlVM1JsY0NBOUlHZHNiMkpoYkZSb2FYTmJVM2x0WW05c0xtWnZjaWhjSWxkUFVrdEdURTlYWDFWVFJWOVRWRVZRWENJcFhTaGNJbk4wWlhBdkwyVjJaVUF3TGpJMkxqRXZMM0p2ZFhSbFVISnZlR2xsWkVSbGJHbDJaWEpUZEdWd1hDSXBPMXh1Wlhod2IzSjBJSFpoY2lCa2FYTndZWFJqYUZSMWNtNVRkR1Z3SUQwZ1oyeHZZbUZzVkdocGMxdFRlVzFpYjJ3dVptOXlLRndpVjA5U1MwWk1UMWRmVlZORlgxTlVSVkJjSWlsZEtGd2ljM1JsY0M4dlpYWmxRREF1TWpZdU1TOHZaR2x6Y0dGMFkyaFVkWEp1VTNSbGNGd2lLVHRjYmlJc0ltTnZibk4wSUZkUFVrdEdURTlYWDBOUFRsUkZXRlJmVTFsTlFrOU1QVk41YldKdmJDNW1iM0lvWUZkUFVrdEdURTlYWDBOUFRsUkZXRlJnS1N4WFQxSkxSa3hQVjE5RFVrVkJWRVZmU0U5UFN6MVRlVzFpYjJ3dVptOXlLR0JYVDFKTFJreFBWMTlEVWtWQlZFVmZTRTlQUzJBcExGZFBVa3RHVEU5WFgwZEZWRjlUVkZKRlFVMWZTVVE5VTNsdFltOXNMbVp2Y2loZ1YwOVNTMFpNVDFkZlIwVlVYMU5VVWtWQlRWOUpSR0FwTEZkUFVrdEdURTlYWDFWVFJWOVRWRVZRUFZONWJXSnZiQzVtYjNJb1lGZFBVa3RHVEU5WFgxVlRSVjlUVkVWUVlDa3NVMVJTUlVGTlgwNUJUVVZmVTFsTlFrOU1QVk41YldKdmJDNW1iM0lvWUZkUFVrdEdURTlYWDFOVVVrVkJUVjlPUVUxRllDa3NkMjl5YTJac2IzZEhiRzlpWVd3OVoyeHZZbUZzVkdocGN6dDJZWElnVW1WMGNubGhZbXhsUlhKeWIzSTlZMnhoYzNNZ1pYaDBaVzVrY3lCRmNuSnZjbnQ5TEVaaGRHRnNSWEp5YjNJOVkyeGhjM01nWlhoMFpXNWtjeUJGY25KdmNudDlPMloxYm1OMGFXOXVJR055WldGMFpVaHZiMnNvWlNsN2JHVjBJRzQ5ZDI5eWEyWnNiM2RIYkc5aVlXeGJWMDlTUzBaTVQxZGZRMUpGUVZSRlgwaFBUMHRkTzJsbUtHNDlQVDEyYjJsa0lEQXBkR2h5YjNjZ1JYSnliM0lvWENKZ1kzSmxZWFJsU0c5dmF5Z3BZQ0JqWVc0Z2IyNXNlU0JpWlNCallXeHNaV1FnYVc1emFXUmxJR0VnZDI5eWEyWnNiM2NnWm5WdVkzUnBiMjVjSWlrN2NtVjBkWEp1SUc0b1pTbDlablZ1WTNScGIyNGdaMlYwVjI5eWEyWnNiM2ROWlhSaFpHRjBZU2dwZTJ4bGRDQjBQWGR2Y210bWJHOTNSMnh2WW1Gc1cxZFBVa3RHVEU5WFgwTlBUbFJGV0ZSZlUxbE5RazlNWFR0cFppaDBQVDA5ZG05cFpDQXdLWFJvY205M0lFVnljbTl5S0Z3aVlHZGxkRmR2Y210bWJHOTNUV1YwWVdSaGRHRW9LV0FnWTJGdUlHOXViSGtnWW1VZ1kyRnNiR1ZrSUdsdWMybGtaU0JoSUhkdmNtdG1iRzkzSUc5eUlITjBaWEFnWm5WdVkzUnBiMjVjSWlrN2NtVjBkWEp1SUhSOVpuVnVZM1JwYjI0Z1oyVjBWM0pwZEdGaWJHVW9aVDE3ZlNsN2JHVjBJSFE5ZDI5eWEyWnNiM2RIYkc5aVlXeGJWMDlTUzBaTVQxZGZSMFZVWDFOVVVrVkJUVjlKUkYwN2FXWW9kRDA5UFhadmFXUWdNQ2wwYUhKdmR5QkZjbkp2Y2loY0ltQm5aWFJYY21sMFlXSnNaU2dwWUNCallXNGdiMjVzZVNCaVpTQmpZV3hzWldRZ2FXNXphV1JsSUdFZ2QyOXlhMlpzYjNjZ1puVnVZM1JwYjI1Y0lpazdiR1YwSUhJOWRDaGxMbTVoYldWemNHRmpaU2s3Y21WMGRYSnVJRTlpYW1WamRDNWpjbVZoZEdVb1oyeHZZbUZzVkdocGN5NVhjbWwwWVdKc1pWTjBjbVZoYlM1d2NtOTBiM1I1Y0dVc2UxdFRWRkpGUVUxZlRrRk5SVjlUV1UxQ1QweGRPbnQyWVd4MVpUcHlMSGR5YVhSaFlteGxPaUV4ZlgwcGZXWjFibU4wYVc5dUlHTnlaV0YwWlZkbFltaHZiMnNvWlNsN2JHVjBJSFE5WTNKbFlYUmxTRzl2YXlobEtTeHVQV2RsZEZkdmNtdG1iRzkzVFdWMFlXUmhkR0VvS1R0eVpYUjFjbTRnZEM1MWNtdzlZQ1I3ZEhsd1pXOW1JRzR1ZFhKc1BUMWdjM1J5YVc1bllEOXVMblZ5YkRwZ1lIMHZMbmRsYkd3dGEyNXZkMjR2ZDI5eWEyWnNiM2N2ZGpFdmQyVmlhRzl2YXk4a2UyVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaDBMblJ2YTJWdUtYMWdMSFI5Wm5WdVkzUnBiMjRnWkdWbWFXNWxTRzl2YXlncGUzSmxkSFZ5Ym50amNtVmhkR1U2WTNKbFlYUmxTRzl2YXl4eVpYTjFiV1VvS1h0MGFISnZkeUJGY25KdmNpaGNJbUJrWldacGJtVkliMjlyS0NrdWNtVnpkVzFsS0NsZ0lHTmhiaUJ2Ym14NUlHSmxJR05oYkd4bFpDQm1jbTl0SUdWNGRHVnlibUZzSUdOdmJuUmxlSFJ6TGx3aUtYMTlmV1oxYm1OMGFXOXVJSE5zWldWd0tDbDdkR2h5YjNjZ1JYSnliM0lvWENKZ2MyeGxaWEFvS1dBZ2FYTWdibTkwSUdGMllXbHNZV0pzWlNCcGJpQmxkbVVnZDI5eWEyWnNiM2NnWW05a2VTQmlkVzVrYkdWelhDSXBmV1oxYm1OMGFXOXVJSEpsYzNWdFpVaHZiMnNvS1h0MGFISnZkeUJGY25KdmNpaGNJbUJ5WlhOMWJXVkliMjlyS0NsZ0lHTmhiaUJ2Ym14NUlHSmxJR05oYkd4bFpDQm1jbTl0SUc5MWRITnBaR1VnWVNCM2IzSnJabXh2ZHlCbWRXNWpkR2x2Ymx3aUtYMW1kVzVqZEdsdmJpQm5aWFJUZEdWd1RXVjBZV1JoZEdFb0tYdDBhSEp2ZHlCRmNuSnZjaWhjSW1CblpYUlRkR1Z3VFdWMFlXUmhkR0VvS1dBZ1kyRnVJRzl1YkhrZ1ltVWdZMkZzYkdWa0lHbHVjMmxrWlNCaElITjBaWEFnWm5WdVkzUnBiMjVjSWlsOVlYTjVibU1nWm5WdVkzUnBiMjRnWlhod1pYSnBiV1Z1ZEdGc1gzTmxkRUYwZEhKcFluVjBaWE1vWlN4MFBYdDlLWHRzWlhRZ2JqMVBZbXBsWTNRdVpXNTBjbWxsY3lobEtUdHBaaWh1TG14bGJtZDBhRDA5UFRBcGNtVjBkWEp1TzJ4bGRDQnBQWGR2Y210bWJHOTNSMnh2WW1Gc1cxZFBVa3RHVEU5WFgxVlRSVjlUVkVWUVhUdHBaaWhwUFQwOWRtOXBaQ0F3S1hSb2NtOTNJRVZ5Y205eUtGd2lZR1Y0Y0dWeWFXMWxiblJoYkY5elpYUkJkSFJ5YVdKMWRHVnpLQ2xnSUdOaGJpQnZibXg1SUdKbElHTmhiR3hsWkNCcGJuTnBaR1VnWVNCM2IzSnJabXh2ZHlCeWRXNTBhVzFsSUdOdmJuUmxlSFJjSWlrN2JHVjBJR0U5Ymk1dFlYQW9LRnRsTEhSZEtUMCtLSHRyWlhrNlpTeDJZV3gxWlRwMFBUMDlkbTlwWkNBd1AyNTFiR3c2ZEgwcEtTeHZQWFF1WVd4c2IzZFNaWE5sY25abFpFRjBkSEpwWW5WMFpYTTlQVDBoTUQ5N1lXeHNiM2RTWlhObGNuWmxaRUYwZEhKcFluVjBaWE02SVRCOU9udDlPMkYzWVdsMElHa29ZRjlmWW5WcGJIUnBibDl6WlhSZllYUjBjbWxpZFhSbGMyQXBLR0VzYnlsOVpYaHdiM0owZTBaaGRHRnNSWEp5YjNJc1VtVjBjbmxoWW14bFJYSnliM0lzWTNKbFlYUmxTRzl2YXl4amNtVmhkR1ZYWldKb2IyOXJMR1JsWm1sdVpVaHZiMnNzWlhod1pYSnBiV1Z1ZEdGc1gzTmxkRUYwZEhKcFluVjBaWE1zWjJWMFUzUmxjRTFsZEdGa1lYUmhMR2RsZEZkdmNtdG1iRzkzVFdWMFlXUmhkR0VzWjJWMFYzSnBkR0ZpYkdVc2NtVnpkVzFsU0c5dmF5eHpiR1ZsY0gwN0lpd2lZWE41Ym1NZ1puVnVZM1JwYjI0Z1kyeGhhVzFJYjI5clQzZHVaWEp6YUdsd0tHVXBlMnhsZENCME8zUnllWHQwUFdGM1lXbDBJR1V1WjJWMFEyOXVabXhwWTNRb0tYMWpZWFJqYUNoMEtYdHlaWFIxY200Z1lYZGhhWFFnWkdsemNHOXpaVUZ1WkZSb2NtOTNLR1VzYm05eWJXRnNhWHBsU0c5dmEwTnNZV2x0UlhKeWIzSW9kQ3hsTG5SdmEyVnVLU2w5YVdZb2RDRTlQVzUxYkd3cGNtVjBkWEp1SUdGM1lXbDBJR1JwYzNCdmMyVkJibVJVYUhKdmR5aGxMR055WldGMFpVaHZiMnREYjI1bWJHbGpkRVZ5Y205eUtHVXVkRzlyWlc0c2RDNXlkVzVKWkNrcGZXRnplVzVqSUdaMWJtTjBhVzl1SUdOc2IzTmxTRzl2YTBsMFpYSmhkRzl5S0dVcGUzUjVjR1Z2WmlCbExuSmxkSFZ5YmowOVlHWjFibU4wYVc5dVlDWW1ZWGRoYVhRZ1pTNXlaWFIxY200b2RtOXBaQ0F3S1gxaGMzbHVZeUJtZFc1amRHbHZiaUJrYVhOd2IzTmxTRzl2YXlobEtYdHNaWFFnZEQxbExtUnBjM0J2YzJVN2FXWW9kSGx3Wlc5bUlIUTlQV0JtZFc1amRHbHZibUFwZTJGM1lXbDBJSFF1WTJGc2JDaGxLVHR5WlhSMWNtNTliR1YwSUc0OVpWdFRlVzFpYjJ3dVpHbHpjRzl6WlYwN2RIbHdaVzltSUc0OVBXQm1kVzVqZEdsdmJtQW1KbUYzWVdsMElHNHVZMkZzYkNobEtYMWhjM2x1WXlCbWRXNWpkR2x2YmlCa2FYTndiM05sUVc1a1ZHaHliM2NvWlN4MEtYdDBjbmw3WVhkaGFYUWdaR2x6Y0c5elpVaHZiMnNvWlNsOVkyRjBZMmg3ZlhSb2NtOTNJSFI5Wm5WdVkzUnBiMjRnYm05eWJXRnNhWHBsU0c5dmEwTnNZV2x0UlhKeWIzSW9aU3gwS1h0eVpYUjFjbTRnYVhOSWIyOXJRMjl1Wm14cFkzUkZjbkp2Y2lobEtUOWpjbVZoZEdWSWIyOXJRMjl1Wm14cFkzUkZjbkp2Y2loMGVYQmxiMllnWlM1MGIydGxiajA5WUhOMGNtbHVaMkEvWlM1MGIydGxianAwTEhSNWNHVnZaaUJsTG1OdmJtWnNhV04wYVc1blVuVnVTV1E5UFdCemRISnBibWRnUDJVdVkyOXVabXhwWTNScGJtZFNkVzVKWkRwMmIybGtJREFwT21WOVpuVnVZM1JwYjI0Z2FYTkliMjlyUTI5dVpteHBZM1JGY25KdmNpaGxLWHR5WlhSMWNtNGdkSGx3Wlc5bUlHVTlQV0J2WW1wbFkzUmdKaVloSVdVbUptQnVZVzFsWUdsdUlHVW1KbVV1Ym1GdFpUMDlQV0JJYjI5clEyOXVabXhwWTNSRmNuSnZjbUI5Wm5WdVkzUnBiMjRnWTNKbFlYUmxTRzl2YTBOdmJtWnNhV04wUlhKeWIzSW9aU3gwS1h0c1pYUWdiajEwUFQwOWRtOXBaQ0F3UDJCZ09tQWdLSEoxYmlCY0lpUjdkSDFjSWlsZ08zSmxkSFZ5YmlCUFltcGxZM1F1WVhOemFXZHVLRVZ5Y205eUtHQkliMjlySUhSdmEyVnVJRndpSkh0bGZWd2lJR2x6SUdGc2NtVmhaSGtnYVc0Z2RYTmxKSHR1ZldBcExIdGpiMjVtYkdsamRHbHVaMUoxYmtsa09uUXNibUZ0WlRwZ1NHOXZhME52Ym1ac2FXTjBSWEp5YjNKZ0xIUnZhMlZ1T21WOUtYMWxlSEJ2Y25SN1kyeGhhVzFJYjI5clQzZHVaWEp6YUdsd0xHTnNiM05sU0c5dmEwbDBaWEpoZEc5eUxHUnBjM0J2YzJWSWIyOXJMR2x6U0c5dmEwTnZibVpzYVdOMFJYSnliM0o5T3lJc0ltWjFibU4wYVc5dUlHNXZjbTFoYkdsNlpWTmxjbWxoYkdsNllXSnNaVVZ5Y205eUtHVXBlM0psZEhWeWJpQmxJR2x1YzNSaGJtTmxiMllnUlhKeWIzSS9leTR1TGs5aWFtVmpkQzVtY205dFJXNTBjbWxsY3loUFltcGxZM1F1Wlc1MGNtbGxjeWhsS1Nrc1kyRjFjMlU2WlM1allYVnpaVDA5UFhadmFXUWdNRDkyYjJsa0lEQTZibTl5YldGc2FYcGxVMlZ5YVdGc2FYcGhZbXhsUlhKeWIzSW9aUzVqWVhWelpTa3NiV1Z6YzJGblpUcGxMbTFsYzNOaFoyVXNibUZ0WlRwbExtNWhiV1VzYzNSaFkyczZaUzV6ZEdGamEzMDZaWDFtZFc1amRHbHZiaUJ5WldKMWFXeGtVMlZ5YVdGc2FYcGhZbXhsUlhKeWIzSW9aU2w3YVdZb0lXbHpVbVZqYjNKa0tHVXBLWEpsZEhWeWJpQkZjbkp2Y2loVGRISnBibWNvWlNrcE8yeGxkQ0IwUFhSNWNHVnZaaUJsTG0xbGMzTmhaMlU5UFdCemRISnBibWRnUDJVdWJXVnpjMkZuWlRwVGRISnBibWNvWlNrc2JqMUZjbkp2Y2loMEtUdDBlWEJsYjJZZ1pTNXVZVzFsUFQxZ2MzUnlhVzVuWUNZbUtHNHVibUZ0WlQxbExtNWhiV1VwTEhSNWNHVnZaaUJsTG5OMFlXTnJQVDFnYzNSeWFXNW5ZQ1ltS0c0dWMzUmhZMnM5WlM1emRHRmpheWtzWUdOaGRYTmxZR2x1SUdVbUppaHVMbU5oZFhObFBXbHpVbVZqYjNKa0tHVXVZMkYxYzJVcFAzSmxZblZwYkdSVFpYSnBZV3hwZW1GaWJHVkZjbkp2Y2lobExtTmhkWE5sS1RwbExtTmhkWE5sS1R0c1pYUWdjajF1TzJadmNpaHNaWFJiZEN4dVhXOW1JRTlpYW1WamRDNWxiblJ5YVdWektHVXBLWFE5UFQxZ2JXVnpjMkZuWldCOGZIUTlQVDFnYm1GdFpXQjhmSFE5UFQxZ2MzUmhZMnRnZkh4MFBUMDlZR05oZFhObFlIeDhLSEpiZEYwOWJpazdjbVYwZFhKdUlHNTlablZ1WTNScGIyNGdhWE5TWldOdmNtUW9aU2w3Y21WMGRYSnVJSFI1Y0dWdlppQmxQVDFnYjJKcVpXTjBZQ1ltSVNGbGZXVjRjRzl5ZEh0dWIzSnRZV3hwZW1WVFpYSnBZV3hwZW1GaWJHVkZjbkp2Y2l4eVpXSjFhV3hrVTJWeWFXRnNhWHBoWW14bFJYSnliM0o5T3lJc0lpOHFLbDlmYVc1MFpYSnVZV3hmZDI5eWEyWnNiM2R6ZTF3aWMzUmxjSE5jSWpwN1hDSmthWE4wTDNOeVl5OWxlR1ZqZFhScGIyNHZkSFZ5YmkxamIyNTBjbTlzTFhCeWIzUnZZMjlzTG1welhDSTZlMXdpYzJWdVpGUjFjbTVEYjI1MGNtOXNVM1JsY0Z3aU9udGNJbk4wWlhCSlpGd2lPbHdpYzNSbGNDOHZaWFpsUURBdU1qWXVNUzh2YzJWdVpGUjFjbTVEYjI1MGNtOXNVM1JsY0Z3aWZYMTlmU292TzF4dVpYaHdiM0owSUhaaGNpQnpaVzVrVkhWeWJrTnZiblJ5YjJ4VGRHVndJRDBnWjJ4dlltRnNWR2hwYzF0VGVXMWliMnd1Wm05eUtGd2lWMDlTUzBaTVQxZGZWVk5GWDFOVVJWQmNJaWxkS0Z3aWMzUmxjQzh2WlhabFFEQXVNall1TVM4dmMyVnVaRlIxY201RGIyNTBjbTlzVTNSbGNGd2lLVHRjYmlJc0lpOHFLbDlmYVc1MFpYSnVZV3hmZDI5eWEyWnNiM2R6ZTF3aWMzUmxjSE5jSWpwN1hDSmthWE4wTDNOeVl5OWxlR1ZqZFhScGIyNHZZMkZ1WTJWc0xXUmxjMk5sYm1SaGJuUXRkSFZ5Ym5NdGMzUmxjQzVxYzF3aU9udGNJbU5oYm1ObGJFUmxjMk5sYm1SaGJuUlVkWEp1YzFOMFpYQmNJanA3WENKemRHVndTV1JjSWpwY0luTjBaWEF2TDJWMlpVQXdMakkyTGpFdkwyTmhibU5sYkVSbGMyTmxibVJoYm5SVWRYSnVjMU4wWlhCY0luMTlmWDBxTHp0Y2JtVjRjRzl5ZENCMllYSWdZMkZ1WTJWc1JHVnpZMlZ1WkdGdWRGUjFjbTV6VTNSbGNDQTlJR2RzYjJKaGJGUm9hWE5iVTNsdFltOXNMbVp2Y2loY0lsZFBVa3RHVEU5WFgxVlRSVjlUVkVWUVhDSXBYU2hjSW5OMFpYQXZMMlYyWlVBd0xqSTJMakV2TDJOaGJtTmxiRVJsYzJObGJtUmhiblJVZFhKdWMxTjBaWEJjSWlrN1hHNGlMQ0l2S2lwZlgybHVkR1Z5Ym1Gc1gzZHZjbXRtYkc5M2MzdGNJbk4wWlhCelhDSTZlMXdpWkdsemRDOXpjbU12WlhobFkzVjBhVzl1TDJScGMzQmhkR05vTFhkdmNtdG1iRzkzTFhKMWJuUnBiV1V0WVdOMGFXOXVjeTF6ZEdWd0xtcHpYQ0k2ZTF3aVpHbHpjR0YwWTJoWGIzSnJabXh2ZDFKMWJuUnBiV1ZCWTNScGIyNXpVM1JsY0Z3aU9udGNJbk4wWlhCSlpGd2lPbHdpYzNSbGNDOHZaWFpsUURBdU1qWXVNUzh2WkdsemNHRjBZMmhYYjNKclpteHZkMUoxYm5ScGJXVkJZM1JwYjI1elUzUmxjRndpZlgxOWZTb3ZPMXh1Wlhod2IzSjBJSFpoY2lCa2FYTndZWFJqYUZkdmNtdG1iRzkzVW5WdWRHbHRaVUZqZEdsdmJuTlRkR1Z3SUQwZ1oyeHZZbUZzVkdocGMxdFRlVzFpYjJ3dVptOXlLRndpVjA5U1MwWk1UMWRmVlZORlgxTlVSVkJjSWlsZEtGd2ljM1JsY0M4dlpYWmxRREF1TWpZdU1TOHZaR2x6Y0dGMFkyaFhiM0pyWm14dmQxSjFiblJwYldWQlkzUnBiMjV6VTNSbGNGd2lLVHRjYmlJc0ltWjFibU4wYVc5dUlISjFiazFwWjNKaGRHbHZia05vWVdsdUtHVXBlMmxtS0hSNWNHVnZaaUJsTG5aaGJIVmxJVDFnYjJKcVpXTjBZSHg4WlM1MllXeDFaVDA5UFc1MWJHd3BkR2h5YjNjZ1JYSnliM0lvWUNSN1pTNXNZV0psYkgwNklIWmhiSFZsSUdoaGN5QnVieUJ1ZFcxbGNtbGpJRndpZG1WeWMybHZibHdpSUdacFpXeGtMbUFwTzJ4bGRDQjBQV1V1ZG1Gc2RXVXVkbVZ5YzJsdmJpeHVPMmxtS0hSNWNHVnZaaUIwUFQxZ2JuVnRZbVZ5WUNsdVBXVXVkbUZzZFdVN1pXeHpaU0JwWmlnaEtHQjJaWEp6YVc5dVlHbHVJR1V1ZG1Gc2RXVXBKaVpsTG1sdWFYUnBZV3hXWlhKemFXOXVJVDA5ZG05cFpDQXdLVzQ5ZXk0dUxtVXVkbUZzZFdVc2RtVnljMmx2Ympw",
	"bExtbHVhWFJwWVd4V1pYSnphVzl1ZlR0bGJITmxJSFJvY205M0lFVnljbTl5S0dBa2UyVXViR0ZpWld4OU9pQjJZV3gxWlNCb1lYTWdibThnYm5WdFpYSnBZeUJjSW5abGNuTnBiMjVjSWlCbWFXVnNaQzVnS1R0c1pYUWdjajFsTG1sdWFYUnBZV3hXWlhKemFXOXVQejh4TzJsbUtDRk9kVzFpWlhJdWFYTkpiblJsWjJWeUtHNHVkbVZ5YzJsdmJpbDhmRzR1ZG1WeWMybHZianh5S1hSb2NtOTNJRVZ5Y205eUtHQWtlMlV1YkdGaVpXeDlPaUIyWlhKemFXOXVJQ1I3Ymk1MlpYSnphVzl1ZlNCcGN5QnViM1FnWVNCd2IzTnBkR2wyWlNCcGJuUmxaMlZ5TG1BcE8ybG1LRzR1ZG1WeWMybHZiajVsTG5SaGNtZGxkRlpsY25OcGIyNHBkR2h5YjNjZ1JYSnliM0lvWUNSN1pTNXNZV0psYkgwNklHVnVZMjkxYm5SbGNtVmtJSFpsY25OcGIyNGdKSHR1TG5abGNuTnBiMjU5TENCM2FHbGphQ0JwY3lCdVpYZGxjaUIwYUdGdUlIUm9aU0J6ZFhCd2IzSjBaV1FnZG1WeWMybHZiaUFrZTJVdWRHRnlaMlYwVm1WeWMybHZibjB1SUZSb2FYTWdkWE4xWVd4c2VTQnBibVJwWTJGMFpYTWdkR2hsSUhkcGNtVWdkMkZ6SUhkeWFYUjBaVzRnWW5rZ1lTQnVaWGRsY2lCbGRtVWdaR1Z3Ykc5NWJXVnVkQ0IwYUdGdUlIUm9aU0J2Ym1VZ2NtVmhaR2x1WnlCcGRDNWdLVHRtYjNJb08yNHVkbVZ5YzJsdmJqeGxMblJoY21kbGRGWmxjbk5wYjI0N0tYdHNaWFFnZEQxbExtMXBaM0poZEdsdmJuTXVabWx1WkNobFBUNWxMbVp5YjIwOVBUMXVMblpsY25OcGIyNHBPMmxtS0NGMEtYUm9jbTkzSUVWeWNtOXlLR0FrZTJVdWJHRmlaV3g5T2lCdWJ5QnRhV2R5WVhScGIyNGdjbVZuYVhOMFpYSmxaQ0JtYjNJZ2RtVnljMmx2YmlBa2UyNHVkbVZ5YzJsdmJuMGc0b2FTSUNSN2JpNTJaWEp6YVc5dUt6RjlMbUFwTzJsbUtIUXVkRzhoUFQxMExtWnliMjByTVNsMGFISnZkeUJGY25KdmNpaGdKSHRsTG14aFltVnNmVG9nYldsbmNtRjBhVzl1SUNSN2RDNW1jbTl0ZlNEaWhwSWdKSHQwTG5SdmZTQnRkWE4wSUhOMFpYQWdaWGhoWTNSc2VTQnZibVVnZG1WeWMybHZiaUJoZENCaElIUnBiV1V1WUNrN2JHVjBJSEk5ZEM1dGFXZHlZWFJsS0c0cE8ybG1LSEl1ZG1WeWMybHZiaUU5UFhRdWRHOHBkR2h5YjNjZ1JYSnliM0lvWUNSN1pTNXNZV0psYkgwNklHMXBaM0poZEdsdmJpQWtlM1F1Wm5KdmJYMGc0b2FTSUNSN2RDNTBiMzBnY0hKdlpIVmpaV1FnWVNCMllXeDFaU0IzYVhSb0lIWmxjbk5wYjI0Z0pIdHlMblpsY25OcGIyNTlMbUFwTzI0OWNuMXlaWFIxY200Z2JuMWxlSEJ2Y25SN2NuVnVUV2xuY21GMGFXOXVRMmhoYVc1OU95SXNJbU52Ym5OMElIUjFjbTVYYjNKclpteHZkMGx1Y0hWMFZqQlViMVl4UFh0bWNtOXRPakFzYldsbmNtRjBaU2hsS1h0cFppZ2hhWE5RY21WV1pYSnphVzl1VkhWeWJsZHZjbXRtYkc5M1NXNXdkWFFvWlNrcGRHaHliM2NnUlhKeWIzSW9ZSFIxY200Z2QyOXlhMlpzYjNjZ2FXNXdkWFE2SUhabGNuTnBiMjRnTUNCMllXeDFaU0JwY3lCdWIzUWdZU0J5WldOdloyNXBlbVZrSUhCeVpTMTJaWEp6YVc5dUlITm9ZWEJsTG1BcE8zSmxkSFZ5Ym50allYQmhZbWxzYVhScFpYTTZaUzVqWVhCaFltbHNhWFJwWlhNc1kyOXRjR3hsZEdsdmJsUnZhMlZ1T21VdVkyOXRjR3hsZEdsdmJsUnZhMlZ1TEcxdlpHVTZaUzV0YjJSbExITjBaWEJKYm5CMWREcDdhVzV3ZFhRNlpTNWtaV3hwZG1WeWVTeHdZWEpsYm5SWGNtbDBZV0pzWlRwbExuQmhjbVZ1ZEZkeWFYUmhZbXhsTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT21VdWMyVnlhV0ZzYVhwbFpFTnZiblJsZUhRc2MyVnpjMmx2YmxOMFlYUmxPbVV1YzJWemMybHZibE4wWVhSbGZTeDJaWEp6YVc5dU9qRjlmU3gwYnpveGZUdG1kVzVqZEdsdmJpQnBjMUJ5WlZabGNuTnBiMjVVZFhKdVYyOXlhMlpzYjNkSmJuQjFkQ2hsS1h0eVpYUjFjbTRnZEhsd1pXOW1JR1U5UFdCdlltcGxZM1JnSmlZaElXVW1KbUJrWld4cGRtVnllV0JwYmlCbGZXVjRjRzl5ZEh0MGRYSnVWMjl5YTJac2IzZEpibkIxZEZZd1ZHOVdNWDA3SWl3aWFXMXdiM0owZTNKMWJrMXBaM0poZEdsdmJrTm9ZV2x1ZldaeWIyMWNJaTR2WTJoaGFXNHVhbk5jSWp0cGJYQnZjblI3ZEhWeWJsZHZjbXRtYkc5M1NXNXdkWFJXTUZSdlZqRjlabkp2YlZ3aUxpOTBkWEp1TFhkdmNtdG1iRzkzTFhZd0xYUnZMWFl4TG1welhDSTdZMjl1YzNRZ1ZGVlNUbDlYVDFKTFJreFBWMTlKVGxCVlZGOVdSVkpUU1U5T1BURXNkSFZ5YmxkdmNtdG1iRzkzU1c1d2RYUk5hV2R5WVhScGIyNXpQVnQwZFhKdVYyOXlhMlpzYjNkSmJuQjFkRll3Vkc5V01WMDdablZ1WTNScGIyNGdZM0psWVhSbFZIVnlibGR2Y210bWJHOTNTVzV3ZFhRb1pTbDdjbVYwZFhKdWUyTmhjR0ZpYVd4cGRHbGxjenBsTG1OaGNHRmlhV3hwZEdsbGN5eGpiMjF3YkdWMGFXOXVWRzlyWlc0NlpTNWpiMjF3YkdWMGFXOXVWRzlyWlc0c1pISnBkbVZ5UTJGd1lXSnBiR2wwYVdWek9udGpZVzVqWld4c1pXUlVkWEp1VTJWMGRHeGxPaUV3TEhSMWNtNUpibUp2ZURvaE1IMHNiVzlrWlRwbExtMXZaR1VzYzNSbGNFbHVjSFYwT250cGJuQjFkRHBsTG1SbGJHbDJaWEo1TEhCaGNtVnVkRmR5YVhSaFlteGxPbVV1Y0dGeVpXNTBWM0pwZEdGaWJHVXNjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZaUzV6WlhKcFlXeHBlbVZrUTI5dWRHVjRkQ3h6WlhOemFXOXVVM1JoZEdVNlpTNXpaWE56YVc5dVUzUmhkR1Y5TEhabGNuTnBiMjQ2TVgxOVpuVnVZM1JwYjI0Z2JXbG5jbUYwWlZSMWNtNVhiM0pyWm14dmQwbHVjSFYwS0hRcGUzSmxkSFZ5YmlCeWRXNU5hV2R5WVhScGIyNURhR0ZwYmloN2FXNXBkR2xoYkZabGNuTnBiMjQ2TUN4c1lXSmxiRHBnZEhWeWJpQjNiM0pyWm14dmR5QnBibkIxZEdBc2JXbG5jbUYwYVc5dWN6cDBkWEp1VjI5eWEyWnNiM2RKYm5CMWRFMXBaM0poZEdsdmJuTXNkR0Z5WjJWMFZtVnljMmx2YmpveExIWmhiSFZsT25SOUtYMWxlSEJ2Y25SN1ZGVlNUbDlYVDFKTFJreFBWMTlKVGxCVlZGOVdSVkpUU1U5T0xHTnlaV0YwWlZSMWNtNVhiM0pyWm14dmQwbHVjSFYwTEcxcFozSmhkR1ZVZFhKdVYyOXlhMlpzYjNkSmJuQjFkSDA3SWl3aVpuVnVZM1JwYjI0Z1kyOWhiR1Z6WTJWRVpXeHBkbVZ5VUdGNWJHOWhaSE1vWlNsN2FXWW9aUzVzWlc1bmRHZzlQVDB3S1hKbGRIVnlibnQ5TzJsbUtHVXViR1Z1WjNSb1BUMDlNU2x5WlhSMWNtNGdaVnN3WFQ4L2UzMDdiR1YwSUhROWUzMHNiajFiWFR0bWIzSW9iR1YwSUhJZ2IyWWdaU2w3Wm05eUtHeGxkRnRsTEc1ZGIyWWdUMkpxWldOMExtVnVkSEpwWlhNb2Npa3BaU0U5UFdCcGJuQjFkRkpsYzNCdmJuTmxjMkFtSm00aFBUMTJiMmxrSURBbUppaDBXMlZkUFc0cE8zSXVhVzV3ZFhSU1pYTndiMjV6WlhNaFBUMTJiMmxrSURBbUptNHVjSFZ6YUNndUxpNXlMbWx1Y0hWMFVtVnpjRzl1YzJWektYMXlaWFIxY200Z2JpNXNaVzVuZEdnK01DWW1LSFF1YVc1d2RYUlNaWE53YjI1elpYTTliaWtzZEgxbGVIQnZjblI3WTI5aGJHVnpZMlZFWld4cGRtVnlVR0Y1Ykc5aFpITjlPeUlzSW1sdGNHOXlkSHRqYjJGc1pYTmpaVVJsYkdsMlpYSlFZWGxzYjJGa2MzMW1jbTl0WENJalpYaGxZM1YwYVc5dUwyUmxiR2wyWlhJdGNHRjViRzloWkhNdWFuTmNJanRwYlhCdmNuUjdjbTkxZEdWUWNtOTRhV1ZrUkdWc2FYWmxjbE4wWlhCOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5M2IzSnJabXh2ZHkxemRHVndjeTVxYzF3aU8yRnplVzVqSUdaMWJtTjBhVzl1SUhKdmRYUmxSR1ZzYVhabGNsUnZRMmhwYkdSeVpXNG9aU2w3YkdWMElIUTlZMjloYkdWelkyVkVaV3hwZG1WeVVHRjViRzloWkhNb1pTNXdZWGxzYjJGa2N5azdjbVYwZFhKdUlHVXVjMlZ6YzJsdmJsTjBZWFJsTG1oaGMxQnliM2g1U1c1d2RYUlNaWEYxWlhOMGN6OG9ZWGRoYVhRZ2NtOTFkR1ZRY205NGFXVmtSR1ZzYVhabGNsTjBaWEFvZTJGMWRHZzZaUzVoZFhSb0xIQmhjbVZ1ZEZkeWFYUmhZbXhsT21VdWNHRnlaVzUwVjNKcGRHRmliR1VzY0dGNWJHOWhaRHAwTEhObGMzTnBiMjVUZEdGMFpUcGxMbk5sYzNOcGIyNVRkR0YwWlgwcEtTNXlaVzFoYVc1a1pYSTZkSDFsZUhCdmNuUjdjbTkxZEdWRVpXeHBkbVZ5Vkc5RGFHbHNaSEpsYm4wN0lpd2lMeW9xWDE5cGJuUmxjbTVoYkY5M2IzSnJabXh2ZDNON1hDSnpkR1Z3YzF3aU9udGNJbVJwYzNRdmMzSmpMMlY0WldOMWRHbHZiaTl6ZFdKaFoyVnVkQzFsZG1WdWRDMXdjbTk0ZVMxemRHVndMbXB6WENJNmUxd2ljblZ1VUhKdmVIbFRkV0poWjJWdWRFVjJaVzUwVTNSbGNGd2lPbnRjSW5OMFpYQkpaRndpT2x3aWMzUmxjQzh2WlhabFFEQXVNall1TVM4dmNuVnVVSEp2ZUhsVGRXSmhaMlZ1ZEVWMlpXNTBVM1JsY0Z3aWZYMTlmU292TzF4dVpYaHdiM0owSUhaaGNpQnlkVzVRY205NGVWTjFZbUZuWlc1MFJYWmxiblJUZEdWd0lEMGdaMnh2WW1Gc1ZHaHBjMXRUZVcxaWIyd3VabTl5S0Z3aVYwOVNTMFpNVDFkZlZWTkZYMU5VUlZCY0lpbGRLRndpYzNSbGNDOHZaWFpsUURBdU1qWXVNUzh2Y25WdVVISnZlSGxUZFdKaFoyVnVkRVYyWlc1MFUzUmxjRndpS1R0Y2JpSXNJbVoxYm1OMGFXOXVJSE5sYzNOcGIyNURZVzVqWld4SWIyOXJWRzlyWlc0b1pTbDdjbVYwZFhKdVlDUjdaWDA2WTJGdVkyVnNZSDFsZUhCdmNuUjdjMlZ6YzJsdmJrTmhibU5sYkVodmIydFViMnRsYm4wN0lpd2lZMjl1YzNRZ1ZGVlNUbDlEUVU1RFJVeE1SVVJmUlZKU1QxSmZUa0ZOUlQxZ1ZIVnlia05oYm1ObGJHeGxaRVZ5Y205eVlEdDJZWElnVkhWeWJrTmhibU5sYkd4bFpFVnljbTl5UFdOc1lYTnpJR1Y0ZEdWdVpITWdSWEp5YjNKN1kyOXVjM1J5ZFdOMGIzSW9kRDFnVkdobElIUjFjbTRnZDJGeklHTmhibU5sYkd4bFpDNWdLWHR6ZFhCbGNpaDBLU3gwYUdsekxtNWhiV1U5VkZWU1RsOURRVTVEUlV4TVJVUmZSVkpTVDFKZlRrRk5SWDE5TzJaMWJtTjBhVzl1SUdselZIVnlia05oYm1ObGJHeGhkR2x2YmloMEtYdHNaWFFnYmoxMExISTlibVYzSUZObGREdG1iM0lvTzNSNWNHVnZaaUJ1UFQxZ2IySnFaV04wWUNZbWJpWW1JWEl1YUdGektHNHBPeWw3YVdZb2NpNWhaR1FvYmlrc2JpNXVZVzFsUFQwOVZGVlNUbDlEUVU1RFJVeE1SVVJmUlZKU1QxSmZUa0ZOUlNseVpYUjFjbTRoTUR0dVBXNHVZMkYxYzJWOWNtVjBkWEp1SVRGOVpuVnVZM1JwYjI0Z2RHaHliM2RKWmxSMWNtNUJZbTl5ZEdWa0tHVXBlMmxtS0dVL0xtRmliM0owWldROVBUMGhNQ2wwYUhKdmR5QnBjMVIxY201RFlXNWpaV3hzWVhScGIyNG9aUzV5WldGemIyNHBQMlV1Y21WaGMyOXVPbTVsZHlCVWRYSnVRMkZ1WTJWc2JHVmtSWEp5YjNKOVpYaHdiM0owZTFSMWNtNURZVzVqWld4c1pXUkZjbkp2Y2l4cGMxUjFjbTVEWVc1alpXeHNZWFJwYjI0c2RHaHliM2RKWmxSMWNtNUJZbTl5ZEdWa2ZUc2lMQ0pwYlhCdmNuUjdZM0psWVhSbFNHOXZhMzFtY205dFhDSWpZMjl0Y0dsc1pXUXZRSGR2Y210bWJHOTNMMk52Y21VdmFXNWtaWGd1YW5OY0lqdHBiWEJ2Y25SN1kyeGhhVzFJYjI5clQzZHVaWEp6YUdsd0xHUnBjM0J2YzJWSWIyOXJMR2x6U0c5dmEwTnZibVpzYVdOMFJYSnliM0o5Wm5KdmJWd2lJMlY0WldOMWRHbHZiaTlvYjI5ckxXOTNibVZ5YzJocGNDNXFjMXdpTzJsdGNHOXlkSHR6WlhOemFXOXVRMkZ1WTJWc1NHOXZhMVJ2YTJWdWZXWnliMjFjSWlObGVHVmpkWFJwYjI0dmRIVnliaTFqWVc1alpXeHNZWFJwYjI0dGRHOXJaVzR1YW5OY0lqdHBiWEJ2Y25SN1ZIVnlia05oYm1ObGJHeGxaRVZ5Y205eWZXWnliMjFjSWlOb1lYSnVaWE56TDNSMWNtNHRZMkZ1WTJWc2JHRjBhVzl1TG1welhDSTdZWE41Ym1NZ1puVnVZM1JwYjI0Z1kzSmxZWFJsVkhWeWJrTmhibU5sYkd4aGRHbHZia052Ym5SeWIyd29jaWw3YkdWMElHazlZM0psWVhSbFNHOXZheWg3ZEc5clpXNDZjMlZ6YzJsdmJrTmhibU5sYkVodmIydFViMnRsYmloeUxuTmxjM05wYjI1SlpDbDlLU3hoUFdsYlUzbHRZbTlzTG1GemVXNWpTWFJsY21GMGIzSmRLQ2s3ZEhKNWUyRjNZV2wwSUdOc1lXbHRTRzl2YTA5M2JtVnljMmhwY0NocEtYMWpZWFJqYUNobEtYdHBaaWhwYzBodmIydERiMjVtYkdsamRFVnljbTl5S0dVcEtYSmxkSFZ5Ymp0MGFISnZkeUJsZld4bGRDQnZQVzVsZHlCQlltOXlkRU52Ym5SeWIyeHNaWElzY3oxamIyNXpkVzFsVFdGMFkyaHBibWREWVc1alpXd29ZU3h5TG1WNGNHVmpkR1ZrVkhWeWJrbGtLUzUwYUdWdUtDZ3BQVDRvYnk1aFltOXlkQ2h1WlhjZ1ZIVnlia05oYm1ObGJHeGxaRVZ5Y205eUtTeGdZMkZ1WTJWc1lDa3BMR005SVRFN2NtVjBkWEp1ZTNOcFoyNWhiRHB2TG5OcFoyNWhiQ3h5WlhGMVpYTjBaV1E2Y3l4aGMzbHVZeUJrYVhOd2IzTmxLQ2w3WTN4OEtHTTlJVEFzWVhkaGFYUWdaR2x6Y0c5elpVaHZiMnNvYVNrcGZYMTlZWE41Ym1NZ1puVnVZM1JwYjI0Z1kyOXVjM1Z0WlUxaGRHTm9hVzVuUTJGdVkyVnNLR1VzZENsN1ptOXlLRHM3S1h0c1pYUWdiajFoZDJGcGRDQmxMbTVsZUhRb0tUdHBaaWh1TG1SdmJtVXBjbVYwZFhKdUlHRjNZV2wwSUc1bGR5QlFjbTl0YVhObEtDZ3BQVDU3ZlNrN2FXWW9iV0YwWTJobGMwRmpkR2wyWlZSMWNtNG9iaTUyWVd4MVpTeDBLU2x5WlhSMWNtNTlmV1oxYm1OMGFXOXVJRzFoZEdOb1pYTkJZM1JwZG1WVWRYSnVLR1VzZENsN2FXWW9kSGx3Wlc5bUlHVWhQV0J2WW1wbFkzUmdmSHdoWlNseVpYUjFjbTRoTUR0c1pYUWdiajFsTG5SMWNtNUpaRHR5WlhSMWNtNGdiajA5UFhadmFXUWdNSHg4YmowOVBYUjlaWGh3YjNKMGUyTnlaV0YwWlZSMWNtNURZVzVqWld4c1lYUnBiMjVEYjI1MGNtOXNmVHNpTENKcGJYQnZjblI3YzJWdVpGUjFjbTVEYjI1MGNtOXNVM1JsY0gxbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDNSMWNtNHRZMjl1ZEhKdmJDMXdjbTkwYjJOdmJDNXFjMXdpTzNaaGNpQlVkWEp1UlhobFkzVjBhVzl1UTNWeWMyOXlQV05zWVhOemUyTnZiblJ5YjJ4VWIydGxianR3WVhKbGJuUlhjbWwwWVdKc1pUdGpkWEp5Wlc1MFUyVnlhV0ZzYVhwbFpFTnZiblJsZUhRN1kzVnljbVZ1ZEZObGMzTnBiMjVUZEdGMFpUdHNZWE4wVW1Wd2IzSjBaV1JEYjI1MGFXNTFZWFJwYjI1VWIydGxianRqYjI1emRISjFZM1J2Y2lobEtYdDBhR2x6TG1OdmJuUnliMnhVYjJ0bGJqMWxMbU52Ym5SeWIyeFViMnRsYml4MGFHbHpMbU4xY25KbGJuUlRaWEpwWVd4cGVtVmtRMjl1ZEdWNGREMWxMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMSFJvYVhNdVkzVnljbVZ1ZEZObGMzTnBiMjVUZEdGMFpUMWxMbk5sYzNOcGIyNVRkR0YwWlN4MGFHbHpMbXhoYzNSU1pYQnZjblJsWkVOdmJuUnBiblZoZEdsdmJsUnZhMlZ1UFdVdWMyVnpjMmx2YmxOMFlYUmxMbU52Ym5ScGJuVmhkR2x2YmxSdmEyVnVMSFJvYVhNdWNHRnlaVzUwVjNKcGRHRmliR1U5WlM1d1lYSmxiblJYY21sMFlXSnNaWDFuWlhRZ2MyVnlhV0ZzYVhwbFpFTnZiblJsZUhRb0tYdHlaWFIxY200Z2RHaHBjeTVqZFhKeVpXNTBVMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUjlaMlYwSUhObGMzTnBiMjVUZEdGMFpTZ3BlM0psZEhWeWJpQjBhR2x6TG1OMWNuSmxiblJUWlhOemFXOXVVM1JoZEdWOVlYTjVibU1nWVdSdmNIUW9aU2w3ZEdocGN5NXpaWFJUZEdGMFpTaGxLVHRzWlhRZ2REMWxMbk5sYzNOcGIyNVRkR0YwWlM1amIyNTBhVzUxWVhScGIyNVViMnRsYmp0MFBUMDlZR0I4ZkhROVBUMTBhR2x6TG14aGMzUlNaWEJ2Y25SbFpFTnZiblJwYm5WaGRHbHZibFJ2YTJWdWZId29kR2hwY3k1c1lYTjBVbVZ3YjNKMFpXUkRiMjUwYVc1MVlYUnBiMjVVYjJ0bGJqMTBMR0YzWVdsMElIUm9hWE11YzJWdVpDaDdZMjl1ZEdsdWRXRjBhVzl1Vkc5clpXNDZkQ3hyYVc1a09tQjBkWEp1TFdOdmJuUnBiblZoZEdsdmJpMTBiMnRsYm1COUtTbDlZM0psWVhSbFUzUmxjRWx1Y0hWMEtHVXNkQ2w3Y21WMGRYSnVlMkZpYjNKMFUybG5ibUZzT25Rc2FXNXdkWFE2WlN4d1lYSmxiblJYY21sMFlXSnNaVHAwYUdsekxuQmhjbVZ1ZEZkeWFYUmhZbXhsTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT25Sb2FYTXVZM1Z5Y21WdWRGTmxjbWxoYkdsNlpXUkRiMjUwWlhoMExITmxjM05wYjI1VGRHRjBaVHAwYUdsekxtTjFjbkpsYm5SVFpYTnphVzl1VTNSaGRHVjlmV0Z6ZVc1aklHWnBibWx6YUNobExIUXNiaWw3ZEdocGN5NXpaWFJUZEdGMFpTaGxLU3hoZDJGcGRDQjBhR2x6TG5ObGJtUW9lMkZqZEdsdmJqcDdMaTR1ZEN4elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZERwMGFHbHpMbU4xY25KbGJuUlRaWEpwWVd4cGVtVmtRMjl1ZEdWNGRDeHpaWE56YVc5dVUzUmhkR1U2ZEdocGN5NWpkWEp5Wlc1MFUyVnpjMmx2YmxOMFlYUmxmU3hpZFdabVpYSmxaRVJsYkdsMlpYSnBaWE02Ymk1c1pXNW5kR2c5UFQwd1AzWnZhV1FnTURwYkxpNHVibDBzYTJsdVpEcGdkSFZ5YmkxeVpYTjFiSFJnZlNsOVlYTjVibU1nYzJWdVpDaDBLWHRoZDJGcGRDQnpaVzVrVkhWeWJrTnZiblJ5YjJ4VGRHVndLSHRqYjI1MGNtOXNWRzlyWlc0NmRHaHBjeTVqYjI1MGNtOXNWRzlyWlc0c2NHRjViRzloWkRwMGZTbDljMlYwVTNSaGRHVW9aU2w3ZEdocGN5NWpkWEp5Wlc1MFUyVnlhV0ZzYVhwbFpFTnZiblJsZUhROVpTNXpaWEpwWVd4cGVtVmtRMjl1ZEdWNGREOC9kR2hwY3k1amRYSnlaVzUwVTJWeWFXRnNhWHBsWkVOdmJuUmxlSFFzZEdocGN5NWpkWEp5Wlc1MFUyVnpjMmx2YmxOMFlYUmxQV1V1YzJWemMybHZibE4wWVhSbGZYMDdaWGh3YjNKMGUxUjFjbTVGZUdWamRYUnBiMjVEZFhKemIzSjlPeUlzSW1aMWJtTjBhVzl1SUdGamRHbDJaVlIxY201SlpDaGxLWHR5WlhSMWNtNGdaUzUwZFhKdVNXUTlQVDFnWUQ5Z2RIVnlibDhrZTJVdWMyVnhkV1Z1WTJWOVlEcGxMblIxY201SlpIMWxlSEJ2Y25SN1lXTjBhWFpsVkhWeWJrbGtmVHNpTENJdktpcGZYMmx1ZEdWeWJtRnNYM2R2Y210bWJHOTNjM3RjSW5kdmNtdG1iRzkzYzF3aU9udGNJbVJwYzNRdmMzSmpMMlY0WldOMWRHbHZiaTkwZFhKdUxYZHZjbXRtYkc5M0xtcHpYQ0k2ZTF3aWRIVnlibGR2Y210bWJHOTNYQ0k2ZTF3aWQyOXlhMlpzYjNkSlpGd2lPbHdpZDI5eWEyWnNiM2N2TDJWMlpTOHZkSFZ5YmxkdmNtdG1iRzkzWENKOWZYMTlLaTg3WEc1cGJYQnZjblI3Y21WemIyeDJaVkoxYm5ScGJXVkJZM1JwYjI1U1pYTjFiSFJ6Um05eVMyVjVjMzFtY205dFhDSWphR0Z5Ym1WemN5OXlkVzUwYVcxbExXRmpkR2x2Ym5NdWFuTmNJanRwYlhCdmNuUjdaR2x6Y0dGMFkyaFNkVzUwYVcxbFFXTjBhVzl1YzFOMFpYQjlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOWthWE53WVhSamFDMXlkVzUwYVcxbExXRmpkR2x2Ym5NdGMzUmxjQzVxYzF3aU8ybHRjRzl5ZEh0eVpYTnZiSFpsVjI5eWEyWnNiM2REWVd4c1ltRmphMEpoYzJWVmNteDlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOTNiM0pyWm14dmR5MWpZV3hzWW1GamF5MTFjbXd1YW5OY0lqdHBiWEJ2Y25SN2RIVnlibE4wWlhCOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5M2IzSnJabXh2ZHkxemRHVndjeTVxYzF3aU8ybHRjRzl5ZEh0amNtVmhkR1ZJYjI5ckxHZGxkRmR2Y210bWJHOTNUV1YwWVdSaGRHRjlabkp2YlZ3aUkyTnZiWEJwYkdWa0wwQjNiM0pyWm14dmR5OWpiM0psTDJsdVpHVjRMbXB6WENJN2FXMXdiM0owZTJOc1lXbHRTRzl2YTA5M2JtVnljMmhwY0N4a2FYTndiM05sU0c5dmF5eHBjMGh2YjJ0RGIyNW1iR2xqZEVWeWNtOXlmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZhRzl2YXkxdmQyNWxjbk5vYVhBdWFuTmNJanRwYlhCdmNuUjdibTl5YldGc2FYcGxVMlZ5YVdGc2FYcGhZbXhsUlhKeWIzSjlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOTNiM0pyWm14dmR5MWxjbkp2Y25NdWFuTmNJanRwYlhCdmNuUjdjMlZ1WkZSMWNtNURiMjUwY205c1UzUmxjSDFtY205dFhDSWpaWGhsWTNWMGFXOXVMM1IxY200dFkyOXVkSEp2YkMxd2NtOTBiMk52YkM1cWMxd2lPMmx0Y0c5eWRIdGpZVzVqWld4RVpYTmpaVzVrWVc1MFZIVnlibk5UZEdWd2ZXWnliMjFjSWlObGVHVmpkWFJwYjI0dlkyRnVZMlZzTFdSbGMyTmxibVJoYm5RdGRIVnlibk10YzNSbGNDNXFjMXdpTzJsdGNHOXlkSHRrYVhOd1lYUmphRmR2Y210bWJHOTNVblZ1ZEdsdFpVRmpkR2x2Ym5OVGRHVndmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZaR2x6Y0dGMFkyZ3RkMjl5YTJac2IzY3RjblZ1ZEdsdFpTMWhZM1JwYjI1ekxYTjBaWEF1YW5OY0lqdHBiWEJ2Y25SN2JXbG5jbUYwWlZSMWNtNVhiM0pyWm14dmQwbHVjSFYwZldaeWIyMWNJaU5sZUdWamRYUnBiMjR2WkhWeVlXSnNaUzF6WlhOemFXOXVMVzFwWjNKaGRHbHZibk12ZEhWeWJpMTNiM0pyWm14dmR5NXFjMXdpTzJsdGNHOXlkSHR5YjNWMFpVUmxiR2wyWlhKVWIwTm9hV3hrY21WdWZXWnliMjFjSWlObGVHVmpkWFJwYjI0dmNtOTFkR1V0WTJocGJHUXRaR1ZzYVhabGNua3Vhbk5jSWp0cGJYQnZjblI3Y25WdVVISnZlSGxUZFdKaFoyVnVkRVYyWlc1MFUzUmxjSDFtY205dFhDSWpaWGhsWTNWMGFXOXVMM04xWW1GblpXNTBMV1YyWlc1MExYQnliM2g1TFhOMFpYQXVhbk5jSWp0cGJYQnZjblI3WTNKbFlYUmxWSFZ5YmtOaGJtTmxiR3hoZEdsdmJrTnZiblJ5YjJ4OVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5MGRYSnVMV05oYm1ObGJHeGhkR2x2YmkxamIyNTBjbTlzTG1welhDSTdhVzF3YjNKMGUxUjFjbTVGZUdWamRYUnBiMjVEZFhKemIzSjlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOTBkWEp1TFdWNFpXTjFkR2x2YmkxamRYSnpiM0l1YW5OY0lqdHBiWEJ2Y25SN1lXTjBhWFpsVkhWeWJrbGtmV1p5YjIxY0lpTm9ZWEp1WlhOekwyRmpkR2wyWlMxMGRYSnVMV2xrTG1welhDSTdZMjl1YzNRZ1ZFRlRTMTlOVDBSRlgxZEJTVlJmUlZKU1QxSmZUVVZUVTBGSFJUMWNJbFJoYzJzZ2JXOWtaU0JqWVc1dWIzUWdkMkZwZENCbWIzSWdabTlzYkc5M0xYVndJR2x1Y0hWMElDaGdibVY0ZERvZ2JuVnNiR0FwTGx3aU8yWjFibU4wYVc5dUlHTmhibE5sZEhSc1pVTmhibU5sYkd4bFpGUjFjbTVCYzFCaGNtc29aU2w3Y21WMGRYSnVJR1V1Ylc5a1pUMDlQV0JqYjI1MlpYSnpZWFJwYjI1Z2ZIeGxMbk4wWlhCSmJuQjFkQzV6WlhOemFXOXVVM1JoZEdVdVkyOXVkR2x1ZFdGMGFXOXVWRzlyWlc0aFBUMWdZSDFoYzNsdVl5Qm1kVzVqZEdsdmJpQjBkWEp1VjI5eWEyWnNiM2NvWlNsN2JHVjBJSFE5YldsbmNtRjBaVlIxY201WGIzSnJabXh2ZDBsdWNIVjBLR1VwTzNKbGRIVnliaUIwTG1SeWFYWmxja05oY0dGaWFXeHBkR2xsY3o4dWRIVnlia2x1WW05NFBUMDlJVEEvY25WdVZIVnliazkzYm1Wa1YyOXlhMlpzYjNjb2RDazZjblZ1VEdWbllXTjVWSFZ5YmxkdmNtdG1iRzkzS0hRcGZXRnplVzVqSUdaMWJtTjBhVzl1SUhKMWJsUjFjbTVQZDI1bFpGZHZjbXRtYkc5M0tHVXBlMnhsZENCalBXTnlaV0YwWlVodmIyc29lM1J2YTJWdU9tQWtlMlV1WTI5dGNHeGxkR2x2YmxSdmEyVnVmVHBwYm1KdmVHQjlLU3hzUFdOYlUzbHRZbTlzTG1GemVXNWpTWFJsY21GMGIzSmRLQ2tzZFQxdVpYY2dWSFZ5YmtWNFpXTjFkR2x2YmtOMWNuTnZjaWg3WTI5dWRISnZiRlJ2YTJWdU9tVXVZMjl0Y0d4bGRHbHZibFJ2YTJWdUxIQmhjbVZ1ZEZkeWFYUmhZbXhsT21VdWMzUmxjRWx1Y0hWMExuQmhjbVZ1ZEZkeWFYUmhZbXhsTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT21VdWMzUmxjRWx1Y0hWMExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMExITmxjM05wYjI1VGRHRjBaVHBsTG5OMFpYQkpibkIxZEM1elpYTnphVzl1VTNSaGRHVjlLU3hrUFRBc2JtVjRkRVJsYkdsMlpYSjVVbVZ4ZFdWemRFbGtQU2dwUFQ1Z0pIdGpMblJ2YTJWdWZUcGtaV3hwZG1WeWVUb2tlMU4wY21sdVp5aGtLeXNwZldBc1pqMWJYU3h3UFdVdWMzUmxjRWx1Y0hWMExtbHVjSFYwTEcwOUlURXNhRHQwY25sN2RISjVlMkYzWVdsMElHTnNZV2x0U0c5dmEwOTNibVZ5YzJocGNDaGpLU3h0UFNFd2ZXTmhkR05vS0dVcGUybG1LR2x6U0c5dmEwTnZibVpzYVdOMFJYSnliM0lvWlNrcGNtVjBkWEp1TzNSb2NtOTNJR1Y5Wm05eUtHVXVaSEpwZG1WeVEyRndZV0pwYkdsMGFXVnpQeTVqWVc1alpXeHNaV1JVZFhKdVUyVjBkR3hsUFQwOUlUQW1KbU5oYmxObGRIUnNaVU5oYm1ObGJHeGxaRlIxY201QmMxQmhjbXNvWlNrbUppaG9QV0YzWVdsMElHTnlaV0YwWlZSMWNtNURZVzVqWld4c1lYUnBiMjVEYjI1MGNtOXNLSHRsZUhCbFkzUmxaRlIxY201SlpEcGhZM1JwZG1WVWRYSnVTV1FvWlM1emRHVndTVzV3ZFhRdWMyVnpjMmx2YmxOMFlYUmxMbVZ0YVhOemFXOXVVM1JoZEdVcExITmxjM05wYjI1SlpEcGxMbk4wWlhCSmJuQjFkQzV6WlhOemFXOXVVM1JoZEdVdWMyVnpjMmx2Ymtsa2ZTa3BPenNwZTJ4bGRDQnBQV0YzWVdsMElIUjFjbTVUZEdWd0tIVXVZM0psWVhSbFUzUmxjRWx1Y0hWMEtIQXNhRDh1YzJsbmJtRnNLU2s3YVdZb2FTNWhZM1JwYjI0OVBUMWdZMkZ1WTJWc2JHVmtZQ2w3WVhkaGFYUWdZMkZ1WTJWc1JHVnpZMlZ1WkdGdWRGUjFjbTV6VTNSbGNDaDdjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZkUzV6WlhKcFlXeHBlbVZrUTI5",
	"dWRHVjRkQ3h6WlhOemFXOXVVM1JoZEdVNmRTNXpaWE56YVc5dVUzUmhkR1Y5S1N4aGQyRnBkQ0JvUHk1a2FYTndiM05sS0Nrc1lYZGhhWFFnZFM1bWFXNXBjMmdvZTNObGMzTnBiMjVUZEdGMFpUcDFMbk5sYzNOcGIyNVRkR0YwWlgwc2UyTmhibU5sYkd4bFpEb2hNQ3hyYVc1a09tQndZWEpyWUgwc1ppazdjbVYwZFhKdWZXbG1LR2t1WVdOMGFXOXVQVDA5WUdSdmJtVmdLWHRoZDJGcGRDQm9QeTVrYVhOd2IzTmxLQ2tzWVhkaGFYUWdkUzVtYVc1cGMyZ29hU3g3YTJsdVpEcGdaRzl1WldBc2IzVjBjSFYwT21rdWIzVjBjSFYwUHo5Z1lDeHBjMFZ5Y205eU9ta3VhWE5GY25KdmNpeDFjMkZuWlRwcExuVnpZV2RsZlN4bUtUdHlaWFIxY201OWJHVjBJRzg5YVM1aFkzUnBiMjQ5UFQxZ1pHbHpjR0YwWTJndGQyOXlhMlpzYjNjdGNuVnVkR2x0WlMxaFkzUnBiMjV6WUh4OGFTNWhZM1JwYjI0OVBUMWdjR0Z5YTJBL2FTNXdaVzVrYVc1blVuVnVkR2x0WlVGamRHbHZia3RsZVhNNmRtOXBaQ0F3TzJsbUtHOGhQVDEyYjJsa0lEQXBlMkYzWVdsMElIVXVZV1J2Y0hRb2FTazdiR1YwSUdVOVlYZGhhWFFvYVM1aFkzUnBiMjQ5UFQxZ1pHbHpjR0YwWTJndGQyOXlhMlpzYjNjdGNuVnVkR2x0WlMxaFkzUnBiMjV6WUQ5a2FYTndZWFJqYUZkdmNtdG1iRzkzVW5WdWRHbHRaVUZqZEdsdmJuTlRkR1Z3T21ScGMzQmhkR05vVW5WdWRHbHRaVUZqZEdsdmJuTlRkR1Z3S1NoN1kyRnNiR0poWTJ0Q1lYTmxWWEpzT25KbGMyOXNkbVZYYjNKclpteHZkME5oYkd4aVlXTnJRbUZ6WlZWeWJDaG5aWFJYYjNKclpteHZkMDFsZEdGa1lYUmhLQ2t1ZFhKc0tTeHdZWEpsYm5SRGIyNTBhVzUxWVhScGIyNVViMnRsYmpwakxuUnZhMlZ1TEhCaGNtVnVkRmR5YVhSaFlteGxPblV1Y0dGeVpXNTBWM0pwZEdGaWJHVXNjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZkUzV6WlhKcFlXeHBlbVZrUTI5dWRHVjRkQ3h6WlhOemFXOXVVM1JoZEdVNmRTNXpaWE56YVc5dVUzUmhkR1Y5S1R0aGQyRnBkQ0IxTG1Ga2IzQjBLR1VwTzJ4bGRDQnlQV0YzWVdsMElIZGhhWFJHYjNKU2RXNTBhVzFsUVdOMGFXOXVVbVZ6ZFd4MGN5aDdZblZtWm1WeVpXUkVaV3hwZG1WeWFXVnpPbVlzWTJGdVkyVnNiR0YwYVc5dU9tZ3NZM1Z5YzI5eU9uVXNhVzVpYjNoVWIydGxianBqTG5SdmEyVnVMR2x1YVhScFlXeFNaWE4xYkhSek9tVXVjbVZ6ZFd4MGN5eHBkR1Z5WVhSdmNqcHNMRzVsZUhSRVpXeHBkbVZ5ZVZKbGNYVmxjM1JKWkN4d1pXNWthVzVuUVdOMGFXOXVTMlY1Y3pwdmZTazdhV1lvY2owOVBXQmpZVzVqWld4c1pXUmdLWHR3UFhadmFXUWdNRHRqYjI1MGFXNTFaWDF3UFh0cmFXNWtPbUJ5ZFc1MGFXMWxMV0ZqZEdsdmJpMXlaWE4xYkhSZ0xISmxjM1ZzZEhNNmNuMDdZMjl1ZEdsdWRXVjlhV1lvYVM1aFkzUnBiMjQ5UFQxZ2NHRnlhMkFwZTJsbUtDRW9hUzVvWVhOUVpXNWthVzVuUVhWMGFHOXlhWHBoZEdsdmJueDhhUzVvWVhOUVpXNWthVzVuU1c1d2RYUkNZWFJqYUNZbVpTNWpZWEJoWW1sc2FYUnBaWE0vTG5KbGNYVmxjM1JKYm5CMWREMDlQU0V3Zkh4bExtMXZaR1U5UFQxZ1kyOXVkbVZ5YzJGMGFXOXVZQ2twZEdoeWIzY2dSWEp5YjNJb1ZFRlRTMTlOVDBSRlgxZEJTVlJmUlZKU1QxSmZUVVZUVTBGSFJTazdZWGRoYVhRZ2FEOHVaR2x6Y0c5elpTZ3BMR0YzWVdsMElIVXVabWx1YVhOb0tHa3NlMkYxZEdodmNtbDZZWFJwYjI1T1lXMWxjenBwTG1GMWRHaHZjbWw2WVhScGIyNU9ZVzFsY3l4cmFXNWtPbUJ3WVhKcllIMHNaaWs3Y21WMGRYSnVmV0YzWVdsMElIVXVZV1J2Y0hRb2FTa3NjRDEyYjJsa0lEQjlmV05oZEdOb0tHVXBlM1JvY205M0lHRjNZV2wwSUhVdWMyVnVaQ2g3WlhKeWIzSTZibTl5YldGc2FYcGxVMlZ5YVdGc2FYcGhZbXhsUlhKeWIzSW9aU2tzYTJsdVpEcGdkSFZ5YmkxbGNuSnZjbUI5S1N4bGZXWnBibUZzYkhsN2FDRTlQWFp2YVdRZ01DWW1ZWGRoYVhRZ2FDNWthWE53YjNObEtDa3NiU1ltWVhkaGFYUWdaR2x6Y0c5elpVaHZiMnNvWXlsOWZXRnplVzVqSUdaMWJtTjBhVzl1SUhkaGFYUkdiM0pTZFc1MGFXMWxRV04wYVc5dVVtVnpkV3gwY3loMEtYdHNaWFFnYml4eVBWc3VMaTUwTG1sdWFYUnBZV3hTWlhOMWJIUnpYVHRtYjNJb096c3BlMnhsZENCcFBYSmxjMjlzZG1WU2RXNTBhVzFsUVdOMGFXOXVVbVZ6ZFd4MGMwWnZja3RsZVhNb2UzQmxibVJwYm1kTFpYbHpPblF1Y0dWdVpHbHVaMEZqZEdsdmJrdGxlWE1zY21WemRXeDBjenB5ZlNrN2FXWW9hU0U5UFhadmFXUWdNQ2x5WlhSMWNtNGdiaUU5UFhadmFXUWdNQ1ltWVhkaGFYUWdkQzVqZFhKemIzSXVjMlZ1WkNoN2EybHVaRHBnZEhWeWJpMWtaV3hwZG1WeWVTMWpZVzVqWld4c1pXUmdMSEpsY1hWbGMzUkpaRHB1ZlNrc2FUdDBMbU4xY25OdmNpNXpaWE56YVc5dVUzUmhkR1V1YUdGelVISnZlSGxKYm5CMWRGSmxjWFZsYzNSekppWnVQVDA5ZG05cFpDQXdKaVlvYmoxMExtNWxlSFJFWld4cGRtVnllVkpsY1hWbGMzUkpaQ2dwTEdGM1lXbDBJSFF1WTNWeWMyOXlMbk5sYm1Rb2UyTnZiblJwYm5WaGRHbHZibFJ2YTJWdU9uUXVZM1Z5YzI5eUxuTmxjM05wYjI1VGRHRjBaUzVqYjI1MGFXNTFZWFJwYjI1VWIydGxiaXhwYm1KdmVGUnZhMlZ1T25RdWFXNWliM2hVYjJ0bGJpeHJhVzVrT21CMGRYSnVMV1JsYkdsMlpYSjVMWEpsY1hWbGMzUmdMSEpsY1hWbGMzUkpaRHB1ZlNrcE8yeGxkQ0JoUFhRdWFYUmxjbUYwYjNJdWJtVjRkQ2dwTzJFdVkyRjBZMmdvS0NrOVBudDlLVHRzWlhRZ2J6MWhkMkZwZENoMExtTmhibU5sYkd4aGRHbHZiajA5UFhadmFXUWdNRDloT2xCeWIyMXBjMlV1Y21GalpTaGJZU3gwTG1OaGJtTmxiR3hoZEdsdmJpNXlaWEYxWlhOMFpXUmRLU2s3YVdZb2J6MDlQV0JqWVc1alpXeGdLWEpsZEhWeWJpQnVJVDA5ZG05cFpDQXdKaVpoZDJGcGRDQjBMbU4xY25OdmNpNXpaVzVrS0h0cmFXNWtPbUIwZFhKdUxXUmxiR2wyWlhKNUxXTmhibU5sYkd4bFpHQXNjbVZ4ZFdWemRFbGtPbTU5S1N4Z1kyRnVZMlZzYkdWa1lEdHBaaWh2TG1SdmJtVXBkR2h5YjNjZ1JYSnliM0lvWUZSMWNtNGdhVzVpYjNnZ1kyeHZjMlZrSUdKbFptOXlaU0J5ZFc1MGFXMWxJR0ZqZEdsdmJuTWdZMjl0Y0d4bGRHVmtMbUFwTzJ4bGRDQnpQVzh1ZG1Gc2RXVTdhV1lvY3k1cmFXNWtQVDA5WUhKMWJuUnBiV1V0WVdOMGFXOXVMWEpsYzNWc2RHQXBlM0l1Y0hWemFDZ3VMaTV6TG5KbGMzVnNkSE1wTzJOdmJuUnBiblZsZldsbUtITXVhMmx1WkQwOVBXQnpkV0poWjJWdWRDMXBibkIxZEMxeVpYRjFaWE4wWUh4OGN5NXJhVzVrUFQwOVlITjFZbUZuWlc1MExXRjFkR2h2Y21sNllYUnBiMjR0WlhabGJuUmdLWHRzWlhRZ1pUMWhkMkZwZENCeWRXNVFjbTk0ZVZOMVltRm5aVzUwUlhabGJuUlRkR1Z3S0h0b2IyOXJVR0Y1Ykc5aFpEcHpMSEJoY21WdWRGZHlhWFJoWW14bE9uUXVZM1Z5YzI5eUxuQmhjbVZ1ZEZkeWFYUmhZbXhsTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT25RdVkzVnljMjl5TG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwTEhObGMzTnBiMjVUZEdGMFpUcDBMbU4xY25OdmNpNXpaWE56YVc5dVUzUmhkR1Y5S1R0aGQyRnBkQ0IwTG1OMWNuTnZjaTVoWkc5d2RDaGxLVHRqYjI1MGFXNTFaWDFwWmloekxtdHBibVE5UFQxZ1pISnBkbVZ5TFdSbGJHbDJaWEo1WUNZbWN5NXlaWEYxWlhOMFNXUTlQVDF1S1h0aGQyRnBkQ0IwTG1OMWNuTnZjaTV6Wlc1a0tIdHJhVzVrT21CMGRYSnVMV1JsYkdsMlpYSjVMV0ZqWTJWd2RHVmtZQ3h5WlhGMVpYTjBTV1E2Y3k1eVpYRjFaWE4wU1dSOUtTeHVQWFp2YVdRZ01EdHNaWFFnWlQxaGQyRnBkQ0J5YjNWMFpVUmxiR2wyWlhKVWIwTm9hV3hrY21WdUtIdGhkWFJvT25NdVpHVnNhWFpsY25rdVlYVjBhQ3h3WVhKbGJuUlhjbWwwWVdKc1pUcDBMbU4xY25OdmNpNXdZWEpsYm5SWGNtbDBZV0pzWlN4d1lYbHNiMkZrY3pwekxtUmxiR2wyWlhKNUxuQmhlV3h2WVdSekxITmxjM05wYjI1VGRHRjBaVHAwTG1OMWNuTnZjaTV6WlhOemFXOXVVM1JoZEdWOUtUdGxJVDA5ZG05cFpDQXdKaVowTG1KMVptWmxjbVZrUkdWc2FYWmxjbWxsY3k1d2RYTm9LSHN1TGk1ekxtUmxiR2wyWlhKNUxIQmhlV3h2WVdSek9sdGxYWDBwZlgxOVlYTjVibU1nWm5WdVkzUnBiMjRnY25WdVRHVm5ZV041VkhWeWJsZHZjbXRtYkc5M0tHVXBlMnhsZENCMFBXVXVjM1JsY0VsdWNIVjBPM1J5ZVh0bWIzSW9PenNwZTJ4bGRDQnVQV0YzWVdsMElIUjFjbTVUZEdWd0tIUXBPMmxtS0c0dVlXTjBhVzl1UFQwOVlHUnZibVZnS1h0aGQyRnBkQ0J6Wlc1a1ZIVnlia052Ym5SeWIyeFRkR1Z3S0h0amIyNTBjbTlzVkc5clpXNDZaUzVqYjIxd2JHVjBhVzl1Vkc5clpXNHNjR0Y1Ykc5aFpEcDdZV04wYVc5dU9udHJhVzVrT21Ca2IyNWxZQ3h2ZFhSd2RYUTZiaTV2ZFhSd2RYUS9QMkJnTEdselJYSnliM0k2Ymk1cGMwVnljbTl5TEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT200dWMyVnlhV0ZzYVhwbFpFTnZiblJsZUhRc2MyVnpjMmx2YmxOMFlYUmxPbTR1YzJWemMybHZibE4wWVhSbExIVnpZV2RsT200dWRYTmhaMlY5TEd0cGJtUTZZSFIxY200dGNtVnpkV3gwWUgxOUtUdHlaWFIxY201OWFXWW9iaTVoWTNScGIyNDlQVDFnWkdsemNHRjBZMmd0ZDI5eWEyWnNiM2N0Y25WdWRHbHRaUzFoWTNScGIyNXpZQ2w3WVhkaGFYUWdjMlZ1WkZSMWNtNURiMjUwY205c1UzUmxjQ2g3WTI5dWRISnZiRlJ2YTJWdU9tVXVZMjl0Y0d4bGRHbHZibFJ2YTJWdUxIQmhlV3h2WVdRNmUyRmpkR2x2YmpwN2EybHVaRHBnWkdsemNHRjBZMmd0ZDI5eWEyWnNiM2N0Y25WdWRHbHRaUzFoWTNScGIyNXpZQ3h3Wlc1a2FXNW5RV04wYVc5dVMyVjVjenB1TG5CbGJtUnBibWRTZFc1MGFXMWxRV04wYVc5dVMyVjVjeXh6WlhKcFlXeHBlbVZrUTI5dWRHVjRkRHB1TG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwTEhObGMzTnBiMjVUZEdGMFpUcHVMbk5sYzNOcGIyNVRkR0YwWlgwc2EybHVaRHBnZEhWeWJpMXlaWE4xYkhSZ2ZYMHBPM0psZEhWeWJuMXBaaWh1TG1GamRHbHZiajA5UFdCd1lYSnJZQ2w3YkdWMElIUTliaTV3Wlc1a2FXNW5VblZ1ZEdsdFpVRmpkR2x2Ymt0bGVYTTdhV1lvSVNoMElUMDlkbTlwWkNBd2ZIeHVMbWhoYzFCbGJtUnBibWRCZFhSb2IzSnBlbUYwYVc5dWZIeHVMbWhoYzFCbGJtUnBibWRKYm5CMWRFSmhkR05vSmlabExtTmhjR0ZpYVd4cGRHbGxjejh1Y21WeGRXVnpkRWx1Y0hWMFBUMDlJVEI4ZkdVdWJXOWtaVDA5UFdCamIyNTJaWEp6WVhScGIyNWdLU2wwYUhKdmR5QkZjbkp2Y2loVVFWTkxYMDFQUkVWZlYwRkpWRjlGVWxKUFVsOU5SVk5UUVVkRktUdHNaWFFnY2oxMFBUMDlkbTlwWkNBd1AzdHJhVzVrT21Cd1lYSnJZQ3h6WlhKcFlXeHBlbVZrUTI5dWRHVjRkRHB1TG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwTEhObGMzTnBiMjVUZEdGMFpUcHVMbk5sYzNOcGIyNVRkR0YwWlN4aGRYUm9iM0pwZW1GMGFXOXVUbUZ0WlhNNmJpNWhkWFJvYjNKcGVtRjBhVzl1VG1GdFpYTjlPbnRyYVc1a09tQmthWE53WVhSamFDMXlkVzUwYVcxbExXRmpkR2x2Ym5OZ0xIQmxibVJwYm1kQlkzUnBiMjVMWlhsek9uUXNjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZiaTV6WlhKcFlXeHBlbVZrUTI5dWRHVjRkQ3h6WlhOemFXOXVVM1JoZEdVNmJpNXpaWE56YVc5dVUzUmhkR1Y5TzJGM1lXbDBJSE5sYm1SVWRYSnVRMjl1ZEhKdmJGTjBaWEFvZTJOdmJuUnliMnhVYjJ0bGJqcGxMbU52YlhCc1pYUnBiMjVVYjJ0bGJpeHdZWGxzYjJGa09udGhZM1JwYjI0NmNpeHJhVzVrT21CMGRYSnVMWEpsYzNWc2RHQjlmU2s3Y21WMGRYSnVmWFE5ZTJsdWNIVjBPblp2YVdRZ01DeHdZWEpsYm5SWGNtbDBZV0pzWlRwMExuQmhjbVZ1ZEZkeWFYUmhZbXhsTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT200dWMyVnlhV0ZzYVhwbFpFTnZiblJsZUhRc2MyVnpjMmx2YmxOMFlYUmxPbTR1YzJWemMybHZibE4wWVhSbGZYMTlZMkYwWTJnb2RDbDdkR2h5YjNjZ1lYZGhhWFFnYzJWdVpGUjFjbTVEYjI1MGNtOXNVM1JsY0NoN1kyOXVkSEp2YkZSdmEyVnVPbVV1WTI5dGNHeGxkR2x2YmxSdmEyVnVMSEJoZVd4dllXUTZlMlZ5Y205eU9tNXZjbTFoYkdsNlpWTmxjbWxoYkdsNllXSnNaVVZ5Y205eUtIUXBMR3RwYm1RNllIUjFjbTR0WlhKeWIzSmdmWDBwTEhSOWZXVjRjRzl5ZEh0MGRYSnVWMjl5YTJac2IzZDlPMXh1ZEhWeWJsZHZjbXRtYkc5M0xuZHZjbXRtYkc5M1NXUWdQU0JjSW5kdmNtdG1iRzkzTHk5bGRtVXZMM1IxY201WGIzSnJabXh2ZDF3aU8xeHVaMnh2WW1Gc1ZHaHBjeTVmWDNCeWFYWmhkR1ZmZDI5eWEyWnNiM2R6TG5ObGRDaGNJbmR2Y210bWJHOTNMeTlsZG1VdkwzUjFjbTVYYjNKclpteHZkMXdpTENCMGRYSnVWMjl5YTJac2IzY3BPMXh1SWl3aVkyOXVjM1FnUzBWWlgxSkZSMGxUVkZKWlgwZE1UMEpCVEY5TFJWazlVM2x0WW05c0xtWnZjaWhnWlhabExtTnZiblJsZUhRdGEyVjVMWEpsWjJsemRISjVZQ2tzWjJ4dlltRnNTMlY1VW1WbmFYTjBjbmxEYjI1MFlXbHVaWEk5WjJ4dlltRnNWR2hwY3p0bmJHOWlZV3hMWlhsU1pXZHBjM1J5ZVVOdmJuUmhhVzVsY2x0TFJWbGZVa1ZIU1ZOVVVsbGZSMHhQUWtGTVgwdEZXVjA5UFQxMmIybGtJREFtSmlobmJHOWlZV3hMWlhsU1pXZHBjM1J5ZVVOdmJuUmhhVzVsY2x0TFJWbGZVa1ZIU1ZOVVVsbGZSMHhQUWtGTVgwdEZXVjA5Ym1WM0lFMWhjQ2s3WTI5dWMzUWdhMlY1VW1WbmFYTjBjbms5WjJ4dlltRnNTMlY1VW1WbmFYTjBjbmxEYjI1MFlXbHVaWEpiUzBWWlgxSkZSMGxUVkZKWlgwZE1UMEpCVEY5TFJWbGRPM1poY2lCRGIyNTBaWGgwUzJWNVBXTnNZWE56ZTI1aGJXVTdZMjlrWldNN1kyOXVjM1J5ZFdOMGIzSW9aU3gwUFh0OUtYdDBhR2x6TG01aGJXVTlaU3gwYUdsekxtTnZaR1ZqUFhRdVkyOWtaV003YkdWMElHNDlhMlY1VW1WbmFYTjBjbmt1WjJWMEtHVXBPMmxtS0c0aFBUMTJiMmxrSURBbUptNHVZMjlrWldNOVBUMTJiMmxrSURBaFBTaDBhR2x6TG1OdlpHVmpQVDA5ZG05cFpDQXdLU2wwYUhKdmR5QkZjbkp2Y2loZ1EyOXVkR1Y0ZEV0bGVTQnVZVzFsSUdOdmJHeHBjMmx2YmpvZ1hDSWtlMlY5WENJZ2FYTWdZV3h5WldGa2VTQnlaV2RwYzNSbGNtVmtJQ1I3Ymk1amIyUmxZejlnZDJsMGFHQTZZSGRwZEdodmRYUmdmU0JoSUdOdlpHVmpMQ0JpZFhRZ1lTQnJaWGtnSkh0MGFHbHpMbU52WkdWalAyQjNhWFJvWURwZ2QybDBhRzkxZEdCOUlHRWdZMjlrWldNZ2FYTWdZbVZwYm1jZ2NtVm5hWE4wWlhKbFpDQjFibVJsY2lCMGFHVWdjMkZ0WlNCdVlXMWxMaUJVYUdseklITnBiR1Z1ZEd4NUlHSnlaV0ZyY3lCamIyNTBaWGgwSUhObGNtbGhiR2w2WVhScGIyNGc0b0NVSUhWelpTQmhJR1JwYzNScGJtTjBJRzVoYldVdVlDazdhMlY1VW1WbmFYTjBjbmt1YzJWMEtHVXNkR2hwY3lsOWZUdG1kVzVqZEdsdmJpQnlaWE52YkhabFMyVjVLR1VwZTNKbGRIVnliaUJyWlhsU1pXZHBjM1J5ZVM1blpYUW9aU2w5Wlhod2IzSjBlME52Ym5SbGVIUkxaWGtzY21WemIyeDJaVXRsZVgwN0lpd2lhVzF3YjNKMGUwTnZiblJsZUhSTFpYbDlabkp2YlZ3aUkyTnZiblJsZUhRdmEyVjVMbXB6WENJN1kyOXVjM1FnUVhWMGFFdGxlVDF1WlhjZ1EyOXVkR1Y0ZEV0bGVTaGdaWFpsTG1GMWRHaGdLU3hKYm1sMGFXRjBiM0pCZFhSb1MyVjVQVzVsZHlCRGIyNTBaWGgwUzJWNUtHQmxkbVV1YVc1cGRHbGhkRzl5UVhWMGFHQXBMRk5sYzNOcGIyNUpaRXRsZVQxdVpYY2dRMjl1ZEdWNGRFdGxlU2hnWlhabExuTmxjM05wYjI1SlpHQXBMRU52Ym5ScGJuVmhkR2x2YmxSdmEyVnVTMlY1UFc1bGR5QkRiMjUwWlhoMFMyVjVLR0JsZG1VdVkyOXVkR2x1ZFdGMGFXOXVWRzlyWlc1Z0tTeERhR0Z1Ym1Wc1VtVnhkV1Z6ZEVsa1MyVjVQVzVsZHlCRGIyNTBaWGgwUzJWNUtHQmxkbVV1WTJoaGJtNWxiRkpsY1hWbGMzUkpaR0FwTEVOb1lXNXVaV3hKYm5OMGNuVnRaVzUwWVhScGIyNUxaWGs5Ym1WM0lFTnZiblJsZUhSTFpYa29ZR1YyWlM1amFHRnVibVZzU1c1emRISjFiV1Z1ZEdGMGFXOXVZQ2tzVFc5a1pVdGxlVDF1WlhjZ1EyOXVkR1Y0ZEV0bGVTaGdaWFpsTG0xdlpHVmdLU3hRWVhKbGJuUlRaWE56YVc5dVMyVjVQVzVsZHlCRGIyNTBaWGgwUzJWNUtHQmxkbVV1Y0dGeVpXNTBVMlZ6YzJsdmJtQXBMRk4xWW1GblpXNTBSR1Z3ZEdoTFpYazlibVYzSUVOdmJuUmxlSFJMWlhrb1lHVjJaUzV6ZFdKaFoyVnVkRVJsY0hSb1lDa3NRMkZ3WVdKcGJHbDBhV1Z6UzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXVZMkZ3WVdKcGJHbDBhV1Z6WUNrc1UyVnpjMmx2YmtOaGJHeGlZV05yUzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXVjMlZ6YzJsdmJrTmhiR3hpWVdOcllDa3NVMlZ6YzJsdmJrdGxlVDF1WlhjZ1EyOXVkR1Y0ZEV0bGVTaGdaWFpsTG5ObGMzTnBiMjVnS1N4VFlXNWtZbTk0UzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXVjMkZ1WkdKdmVHQXBMRk5sYzNOcGIyNUVlVzVoYldsalRXOWtaV3hTWldabGNtVnVZMlZMWlhrOWJtVjNJRU52Ym5SbGVIUkxaWGtvWUdWMlpTNXpaWE56YVc5dVJIbHVZVzFwWTAxdlpHVnNVbVZtWlhKbGJtTmxZQ2tzVkhWeWJrUjVibUZ0YVdOTmIyUmxiRkpsWm1WeVpXNWpaVXRsZVQxdVpYY2dRMjl1ZEdWNGRFdGxlU2hnWlhabExuUjFjbTVFZVc1aGJXbGpUVzlrWld4U1pXWmxjbVZ1WTJWZ0tTeE1hWFpsVTNSbGNFUjVibUZ0YVdOTmIyUmxiRk5sYkdWamRHbHZia3RsZVQxdVpYY2dRMjl1ZEdWNGRFdGxlU2hnWlhabExteHBkbVZUZEdWd1JIbHVZVzFwWTAxdlpHVnNVMlZzWldOMGFXOXVZQ2tzVTJWemMybHZia1I1Ym1GdGFXTlViMjlzVFdWMFlXUmhkR0ZMWlhrOWJtVjNJRU52Ym5SbGVIUkxaWGtvWUdWMlpTNXpaWE56YVc5dVJIbHVZVzFwWTFSdmIyeE5aWFJoWkdGMFlXQXBMRlIxY201RWVXNWhiV2xqVkc5dmJFMWxkR0ZrWVhSaFMyVjVQVzVsZHlCRGIyNTBaWGgwUzJWNUtHQmxkbVV1ZEhWeWJrUjVibUZ0YVdOVWIyOXNUV1YwWVdSaGRHRmdLU3hNYVhabFUzUmxjRlJ2YjJ4elMyVjVQVzVsZHlCRGIyNTBaWGgwUzJWNUtHQmxkbVV1YkdsMlpWTjBaWEJVYjI5c2MyQXBMRVI1Ym1GdGFXTlRhMmxzYkUxaGJtbG1aWE4wUzJWNVBXNWxkeUJEYjI1MFpYaDBTMlY1S0dCbGRtVXVaSGx1WVcxcFkxTnJhV3hzVFdGdWFXWmxjM1JnS1N4VFpYTnphVzl1UkhsdVlXMXBZMGx1YzNSeWRXTjBhVzl1YzB0bGVUMXVaWGNnUTI5dWRHVjRkRXRsZVNoZ1pYWmxMbk5sYzNOcGIyNUVlVzVoYldsalNXNXpkSEoxWTNScGIyNXpZQ2tzVkhWeWJrUjVibUZ0YVdOSmJuTjBjblZqZEdsdmJuTkxaWGs5Ym1WM0lFTnZiblJsZUhSTFpYa29ZR1YyWlM1MGRYSnVSSGx1WVcxcFkwbHVjM1J5ZFdOMGFXOXVjMkFwTzJWNGNHOXlkSHRCZFhSb1MyVjVMRU5oY0dGaWFXeHBkR2xsYzB0bGVTeERhR0Z1Ym1Wc1NXNXpkSEoxYldWdWRHRjBhVzl1UzJWNUxFTm9ZVzV1Wld4U1pYRjFaWE4wU1dSTFpYa3NRMjl1ZEdsdWRXRjBhVzl1Vkc5clpXNUxaWGtzUkhsdVlXMXBZMU5yYVd4c1RXRnVhV1psYzNSTFpYa3NTVzVwZEdsaGRHOXlRWFYwYUV0bGVTeE1hWFpsVTNSbGNFUjVibUZ0YVdOTmIyUmxiRk5sYkdWamRHbHZia3RsZVN4TWFYWmxVM1JsY0ZSdmIyeHpTMlY1TEUxdlpHVkxaWGtzVUdGeVpXNTBVMlZ6YzJsdmJrdGxlU3hUWVc1a1ltOTRTMlY1TEZObGMzTnBiMjVEWVd4c1ltRmphMHRsZVN4VFpYTnphVzl1UkhsdVlXMXBZMGx1YzNSeWRXTjBhVzl1YzB0bGVTeFRaWE56YVc5dVJIbHVZVzFwWTAxdlpHVnNVbVZtWlhKbGJtTmxTMlY1TEZObGMzTnBiMjVFZVc1aGJXbGpWRzl2YkUxbGRHRmtZWFJoUzJWNUxGTmxjM05wYjI1SlpFdGxlU3hUWlhOemFXOXVTMlY1TEZOMVltRm5aVzUwUkdWd2RHaExaWGtzVkhWeWJrUjVibUZ0YVdOSmJuTjBjblZqZEdsdmJuTkxaWGtzVkhWeWJrUjVibUZ0YVdOTmIyUmxiRkpsWm1WeVpXNWpaVXRsZVN4VWRYSnVSSGx1WVcxcFkxUnZiMnhOWlhSaFpHRjBZVXRsZVgwN0lpd2lhVzF3YjNKMGUxTjFZbUZuWlc1MFJHVndkR2hMWlhsOVpuSnZiVndpSTJOdmJuUmxlSFF2YTJWNWN5NXFjMXdpTzJaMWJtTjBhVzl1SUhKbGMyOXNkbVZUZFdKaFoyVnVkRVJsY0hSb0tHVXBlMnhsZENCMFBYQmhjbk5sVTNWaVlXZGxiblJFWlhCMGFDaGxMbk4xWW1GblpXNTBSR1Z3ZEdncE8zSmxkSFZ5Ym50amRYSnlaVzUwUkdWd2RHZzZkQ3h1WlhoMFEyaHBiR1JFWlhCMGFEcDBLekY5ZldaMWJtTjBhVzl1SUhKbFlXUlRaWEpwWVd4cGVtVmtVM1ZpWVdkbGJuUkVaWEIwYUNoMEtYdHNaWFFnYmoxd1lYSnpaVk4xWW1GblpXNTBSR1Z3ZEdnb2RGdFRkV0poWjJWdWRFUmxjSFJvUzJWNUxtNWhiV1ZkS1R0eVpYUjFjbTRnYmowOVBUQS9kbTlwWkNBd09tNTlablZ1WTNScGIyNGdhWE5UZFdKaFoyVnVkRVJsYkdWbllYUnBiMjVCWTNScGIyNG9aU2w3Y21WMGRYSnVJR1V1YTJsdVpEMDlQV0J6ZFdKaFoyVnVkQzFqWVd4c1lIeDhaUzVyYVc1a1BUMDlZSEpsYlc5MFpTMWhaMlZ1ZEMxallXeHNZSDFtZFc1amRHbHZiaUJuWlhSVGRXSmhaMlZ1ZEVSbGJHVm5ZWFJwYjI1T1lXMWxLR1VwZTNOM2FYUmphQ2hsTG10cGJtUXBlMk5oYzJWZ2NtVnRiM1JsTFdGblpXNTBMV05oYkd4Z09uSmxkSFZ5YmlCbExuSmxiVzkwWlVGblpXNTBUbUZ0WlR0allYTmxZSE4xWW1GblpXNTBMV05oYkd4Z09uSmxkSFZ5YmlCbExuTjFZbUZuWlc1MFRtRnRaVHRrWldaaGRXeDBPbkpsZEhWeWJpQmxmWDFtZFc1amRHbHZiaUJ3WVhKelpWTjFZbUZuWlc1MFJHVndkR2dvWlNsN2NtVjBkWEp1SUhSNWNHVnZaaUJsUFQxZ2JuVnRZbVZ5WUNZbVRuVnRZbVZ5TG1selNXNTBaV2RsY2lobEtTWW1aVDR3UDJVNk1IMWxlSEJ2Y25SN1oyVjBVM1ZpWVdkbGJuUkVaV3hsWjJGMGFXOXVUbUZ0WlN4cGMxTjFZbUZuWlc1MFJHVnNaV2RoZEdsdmJrRmpkR2x2Yml4eVpXRmtVMlZ5YVdGc2FYcGxaRk4xWW1GblpXNTBSR1Z3ZEdnc2NtVnpiMngyWlZOMVltRm5aVzUwUkdWd2RHaDlPeUlzSW1aMWJtTjBhVzl1SUdOdllXeGxjMk5sVkhWeWJrbHVjSFYwY3lobExIUXBlMnhsZENCdVBXTnZZV3hsYzJObFNXNXdkWFJTWlhOd2IyNXpaWE1vZTJFNlpTNXBibkIxZEZKbGMzQnZibk5sY3l4aU9uUXVhVzV3ZFhSU1pYTndiMjV6WlhOOUtTeHlQV052WVd4bGMyTmxUV1Z6YzJGblpTaDdZVHBsTG0xbGMzTmhaMlVzWWpwMExtMWxjM05oWjJWOUtTeHBQV052WVd4bGMyTmxRMjl1ZEdWNGRDaDdZVHBsTG1OdmJuUmxlSFFzWWpwMExtTnZiblJsZUhSOUtTeGhQWFF1YjNWMGNIVjBVMk5vWlcxaFB6OWxMbTkxZEhCMWRGTmphR1Z0WVN4dlBYdDlPM0psZEhWeWJpQnVJVDA5ZG05cFpDQXdKaVlvYnk1cGJuQjFkRkpsYzNCdmJuTmxjejF1S1N4eUlUMDlkbTlwWkNBd0ppWW9ieTV0WlhOellXZGxQWElwTEdraFBUMTJiMmxrSURBbUppaHZMbU52Ym5SbGVIUTlhU2tzWVNFOVBYWnZhV1FnTUNZbUtHOHViM1YwY0hWMFUyTm9aVzFoUFdFcExHOTlablZ1WTNScGIyNGdjbVZ6YjJ4MlpVRnpjMmx6ZEdGdWRGTjBaWEJVWlhoMEtHVXNkQ2w3Wm05eUtHeGxkQ0IwUFdVdWJHVnVaM1JvTFRFN2RENDlNRHN0TFhRcGUyeGxkQ0J1UFdWYmRGMDdhV1lvYmo4dWNtOXNaU0U5UFdCaGMzTnBjM1JoYm5SZ0tXTnZiblJwYm5WbE8yeGxkQ0J5UFdWNGRISmhZM1JOWlhOellXZGxWR1Y0ZENodUtUdHBaaWh5TG5SeWFXMG9LUzVzWlc1bmRHZytNQ2x5WlhSMWNtNGdjbjF5WlhSMWNtNGdkQ0U5UFhadmFXUWdNQ1ltZEM1MGNtbHRLQ2t1YkdWdVozUm9QakEvZERwdWRXeHNmV1oxYm1OMGFXOXVJR1Y0ZEhKaFkzUk5aWE56WVdkbFZHVjRkQ2hsS1h0eVpYUjFjbTRnZEhsd1pXOW1JR1V1WTI5dWRHVnVkRDA5WUhOMGNtbHVaMkEvWlM1amIyNTBaVzUwT2tGeWNtRjVMbWx6UVhKeVlYa29aUzVqYjI1MFpXNTBLVDlsTG1OdmJuUmxiblF1Wm14aGRFMWhjQ2hsUFQ1MGVYQmxiMllnWlQwOVlITjBjbWx1WjJBL1cyVmRPbUIwZVhCbFlHbHVJR1VtSm1VdWRIbHdaVDA5UFdCMFpYaDBZQ1ltZEhsd1pXOW1JR1V1ZEdWNGREMDlZSE4wY21sdVoyQS9XMlV1ZEdWNGRGMDZXMTBwTG1wdmFXNG9ZR0FwT21CZ2ZXWjFibU4wYVc5dUlHTnZZV3hsYzJObFNXNXdkWFJTWlhOd2IyNXpaWE1vWlNsN2JHVjBJSFE5WlM1aFB6OWJYU3h1UFdVdVlqOC9XMTA3YVdZb0lTaDBMbXhsYm1kMGFEMDlQVEFtSm00dWJHVnVaM1JvUFQwOU1Da3BjbVYwZFhKdVd5NHVMblFzTGk0dWJsMTlablZ1WTNScGIyNGdZMjloYkdWelkyVkRiMjUwWlhoMEtHVXBlMnhsZENCMFBXVXVZVDgvVzEwc2JqMWxMbUkvUDF0ZE8ybG1LQ0VvZEM1c1pXNW5kR2c5UFQwd0ppWnVMbXhsYm1kMGFEMDlQVEFwS1hKbGRIVnlibHN1TGk1MExDNHVMbTVkZldaMWJtTjBhVzl1SUdOdllXeGxjMk5sVFdWemMyRm5aU2hsS1h0eVpYUjFjbTRnWlM1aFBUMDlkbTlwWkNBd1AyVXVZanBsTG1JOVBUMTJiMmxrSURBL1pTNWhPbUZ3Y0dWdVpGVnpaWEpEYjI1",
	"MFpXNTBLSHRoY0hCbGJtUmxaRHBsTG1Jc1pYaHBjM1JwYm1jNlpTNWhmU2w5Wm5WdVkzUnBiMjRnWVhCd1pXNWtWWE5sY2tOdmJuUmxiblFvWlNsN2NtVjBkWEp1SUhSNWNHVnZaaUJsTG1WNGFYTjBhVzVuUFQxZ2MzUnlhVzVuWUNZbWRIbHdaVzltSUdVdVlYQndaVzVrWldROVBXQnpkSEpwYm1kZ1AyQWtlMlV1WlhocGMzUnBibWQ5WEZ4dVhGeHVKSHRsTG1Gd2NHVnVaR1ZrZldBNld5NHVMblJ2VlhObGNrTnZiblJsYm5SQmNuSmhlU2hsTG1WNGFYTjBhVzVuS1N3dUxpNTBiMVZ6WlhKRGIyNTBaVzUwUVhKeVlYa29aUzVoY0hCbGJtUmxaQ2xkZldaMWJtTjBhVzl1SUhSdlZYTmxja052Ym5SbGJuUkJjbkpoZVNobEtYdHlaWFIxY200Z2RIbHdaVzltSUdVOVBXQnpkSEpwYm1kZ1AyVXViR1Z1WjNSb1BqQS9XM3QwZVhCbE9tQjBaWGgwWUN4MFpYaDBPbVY5WFRwYlhUcEJjbkpoZVM1cGMwRnljbUY1S0dVcFAxc3VMaTVsWFRwYlhYMW1kVzVqZEdsdmJpQmpiMkZzWlhOalpVUmxiR2wyWlhKcFpYTW9aU2w3YkdWMFczUXNMaTR1YmwwOVpUdHBaaWgwUFQwOWRtOXBaQ0F3S1hSb2NtOTNJRVZ5Y205eUtHQkRZVzV1YjNRZ1kyOWhiR1Z6WTJVZ1lXNGdaVzF3ZEhrZ1pHVnNhWFpsY25rZ1ltRjBZMmd1WUNrN2JHVjBJSEk5ZEM1aGRYUm9MR2s5V3k0dUxuUXVjR0Y1Ykc5aFpITmRPMlp2Y2loc1pYUWdaU0J2WmlCdUtXVXVZWFYwYUNFOVBYWnZhV1FnTUNZbUtISTlaUzVoZFhSb0tTeHBMbkIxYzJnb0xpNHVaUzV3WVhsc2IyRmtjeWs3Y21WMGRYSnVleTR1TG5Rc1lYVjBhRHB5TEhCaGVXeHZZV1J6T21sOWZXVjRjRzl5ZEh0aGNIQmxibVJWYzJWeVEyOXVkR1Z1ZEN4amIyRnNaWE5qWlVSbGJHbDJaWEpwWlhNc1kyOWhiR1Z6WTJWVWRYSnVTVzV3ZFhSekxISmxjMjlzZG1WQmMzTnBjM1JoYm5SVGRHVndWR1Y0ZEgwN0lpd2lhVzF3YjNKMGUwTm9ZVzV1Wld4U1pYRjFaWE4wU1dSTFpYbDlabkp2YlZ3aUkyTnZiblJsZUhRdmEyVjVjeTVxYzF3aU8ybHRjRzl5ZEh0cGMwNXZia1Z0Y0hSNVUzUnlhVzVuZldaeWIyMWNJaU56YUdGeVpXUXZaM1ZoY21SekxtcHpYQ0k3Wm5WdVkzUnBiMjRnY21WaFpFTm9ZVzV1Wld4TGFXNWtLR1VwZTJ4bGRDQnVQV1ZiWUdWMlpTNWphR0Z1Ym1Wc1lGMC9MbXRwYm1RN2NtVjBkWEp1SUdselRtOXVSVzF3ZEhsVGRISnBibWNvYmlrL2JqcDJiMmxrSURCOVpuVnVZM1JwYjI0Z2NtVmhaRkJoY21WdWRFeHBibVZoWjJVb1pTbDdiR1YwSUc0OVpWdGdaWFpsTG5CaGNtVnVkRk5sYzNOcGIyNWdYU3h5UFc0L0xtTmhiR3hKWkN4cFBXNC9Mbkp2YjNSVFpYTnphVzl1U1dRc1lUMXVQeTV6WlhOemFXOXVTV1FzYnoxdVB5NTBkWEp1UHk1cFpEdHlaWFIxY201N1kyRnNiRWxrT21selRtOXVSVzF3ZEhsVGRISnBibWNvY2lrL2NqcDJiMmxrSURBc2NtOXZkRk5sYzNOcGIyNUpaRHBwYzA1dmJrVnRjSFI1VTNSeWFXNW5LR2twUDJrNmRtOXBaQ0F3TEhObGMzTnBiMjVKWkRwcGMwNXZia1Z0Y0hSNVUzUnlhVzVuS0dFcFAyRTZkbTlwWkNBd0xIUjFjbTVKWkRwcGMwNXZia1Z0Y0hSNVUzUnlhVzVuS0c4cFAyODZkbTlwWkNBd2ZYMW1kVzVqZEdsdmJpQnlaV0ZrVUdGeVpXNTBVMlZ6YzJsdmJrbGtLR1VwZTNKbGRIVnliaUJ5WldGa1VHRnlaVzUwVEdsdVpXRm5aU2hsS1M1elpYTnphVzl1U1dSOVpuVnVZM1JwYjI0Z2NtVmhaRkp2YjNSVFpYTnphVzl1U1dRb1pTbDdjbVYwZFhKdUlISmxZV1JRWVhKbGJuUk1hVzVsWVdkbEtHVXBMbkp2YjNSVFpYTnphVzl1U1dSOVpuVnVZM1JwYjI0Z2NtVmhaRU5vWVc1dVpXeFNaWEYxWlhOMFNXUW9iaWw3YkdWMElISTlibHREYUdGdWJtVnNVbVZ4ZFdWemRFbGtTMlY1TG01aGJXVmRPM0psZEhWeWJpQnBjMDV2YmtWdGNIUjVVM1J5YVc1bktISXBQM0k2ZG05cFpDQXdmV052Ym5OMElFVldSVjlUUlZOVFNVOU9YMVJKVkV4RlgwMUJXRjlEU0VGU1V6MHhNalU3Wm5WdVkzUnBiMjRnWkdWeWFYWmxVMlZ6YzJsdmJsUnBkR3hsS0dVcGUyeGxkQ0IwUFdOdmJHeGxZM1JOWlhOellXZGxWR1Y0ZENobEtUdHBaaWgwUFQwOWRtOXBaQ0F3Zkh4MExteGxibWQwYUQwOVBUQXBjbVYwZFhKdU8yeGxkQ0J1UFhRdWNtVndiR0ZqWlNndlhGeHpLeTluZFN4Z0lHQXBMblJ5YVcwb0tUdHBaaWh1TG14bGJtZDBhRDA5UFRBcGNtVjBkWEp1TzJ4bGRDQnlQVUZ5Y21GNUxtWnliMjBvYmlrN2NtVjBkWEp1SUhJdWJHVnVaM1JvUEQweE1qVS9ianBnSkh0eUxuTnNhV05sS0RBc01USTBLUzVxYjJsdUtHQmdLWDNpZ0taZ2ZXWjFibU4wYVc5dUlHTnZiR3hsWTNSTlpYTnpZV2RsVkdWNGRDaGxLWHRwWmloMGVYQmxiMllnWlQwOVlITjBjbWx1WjJBcGNtVjBkWEp1SUdVN2FXWW9JVUZ5Y21GNUxtbHpRWEp5WVhrb1pTa3BjbVYwZFhKdU8yeGxkQ0IwUFZ0ZE8yWnZjaWhzWlhRZ2JpQnZaaUJsS1c0bUpuUjVjR1Z2WmlCdVBUMWdiMkpxWldOMFlDWW1iaTUwZVhCbFBUMDlZSFJsZUhSZ0ppWjBlWEJsYjJZZ2JpNTBaWGgwUFQxZ2MzUnlhVzVuWUNZbWRDNXdkWE5vS0c0dWRHVjRkQ2s3Y21WMGRYSnVJSFF1YkdWdVozUm9QakEvZEM1cWIybHVLR0FnWUNrNmRtOXBaQ0F3ZldaMWJtTjBhVzl1SUdKMWFXeGtVMlZ6YzJsdmJrRjBkSEpwWW5WMFpYTW9aU2w3Y21WMGRYSnVlMXdpSkdWMlpTNWphR0Z1Ym1Wc1gzSmxjWFZsYzNSZmFXUmNJanB5WldGa1EyaGhibTVsYkZKbGNYVmxjM1JKWkNobExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMEtTeGNJaVJsZG1VdWRIbHdaVndpT21CelpYTnphVzl1WUN4Y0lpUmxkbVV1ZEhKcFoyZGxjbHdpT25KbFlXUkRhR0Z1Ym1Wc1MybHVaQ2hsTG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwS1N4Y0lpUmxkbVV1ZEdsMGJHVmNJanBrWlhKcGRtVlRaWE56YVc5dVZHbDBiR1VvWlM1cGJuQjFkRTFsYzNOaFoyVXBmWDFtZFc1amRHbHZiaUJpZFdsc1pGTjFZbUZuWlc1MFVtOXZkRUYwZEhKcFluVjBaWE1vWlNsN2NtVjBkWEp1ZTF3aUpHVjJaUzVqYUdGdWJtVnNYM0psY1hWbGMzUmZhV1JjSWpweVpXRmtRMmhoYm01bGJGSmxjWFZsYzNSSlpDaGxMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBLU3hjSWlSbGRtVXVkSGx3WlZ3aU9tQnpkV0poWjJWdWRHQXNYQ0lrWlhabExuQmhjbVZ1ZEZ3aU9tVXVjR0Z5Wlc1MFUyVnpjMmx2Ymtsa0xGd2lKR1YyWlM1d1lYSmxiblJmWTJGc2JGd2lPbVV1Y0dGeVpXNTBRMkZzYkVsa0xGd2lKR1YyWlM1d1lYSmxiblJmZEhWeWJsd2lPbVV1Y0dGeVpXNTBWSFZ5Ymtsa0xGd2lKR1YyWlM1eWIyOTBYQ0k2WlM1eWIyOTBVMlZ6YzJsdmJrbGtMRndpSkdWMlpTNXpkV0poWjJWdWRGd2lPbVV1YVdSbGJuUnBkSGt1Ym05a1pVbGtMRndpSkdWMlpTNTBjbWxuWjJWeVhDSTZjbVZoWkVOb1lXNXVaV3hMYVc1a0tHVXVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUXBmWDFtZFc1amRHbHZiaUJpZFdsc1pGUjFjbTVCZEhSeWFXSjFkR1Z6S0dVcGUzSmxkSFZ5Ym50Y0lpUmxkbVV1WTJoaGJtNWxiRjl5WlhGMVpYTjBYMmxrWENJNlpTNXlaWEYxWlhOMFNXUXNYQ0lrWlhabExuUjVjR1ZjSWpwZ2RIVnlibUFzWENJa1pYWmxMbkJoY21WdWRGd2lPbVV1Y0dGeVpXNTBVMlZ6YzJsdmJrbGtMRndpSkdWMlpTNXliMjkwWENJNlpTNXliMjkwVTJWemMybHZia2xrZlgxbGVIQnZjblI3UlZaRlgxTkZVMU5KVDA1ZlZFbFVURVZmVFVGWVgwTklRVkpUTEdKMWFXeGtVMlZ6YzJsdmJrRjBkSEpwWW5WMFpYTXNZblZwYkdSVGRXSmhaMlZ1ZEZKdmIzUkJkSFJ5YVdKMWRHVnpMR0oxYVd4a1ZIVnlia0YwZEhKcFluVjBaWE1zWkdWeWFYWmxVMlZ6YzJsdmJsUnBkR3hsTEhKbFlXUkRhR0Z1Ym1Wc1MybHVaQ3h5WldGa1EyaGhibTVsYkZKbGNYVmxjM1JKWkN4eVpXRmtVR0Z5Wlc1MFRHbHVaV0ZuWlN4eVpXRmtVR0Z5Wlc1MFUyVnpjMmx2Ymtsa0xISmxZV1JTYjI5MFUyVnpjMmx2Ymtsa2ZUc2lMQ0l2S2lwZlgybHVkR1Z5Ym1Gc1gzZHZjbXRtYkc5M2MzdGNJbk4wWlhCelhDSTZlMXdpWkdsemRDOXpjbU12WlhobFkzVjBhVzl1TDJSbGJHVm5ZWFJsWkMxd1lYSmxiblF0Ym05MGFXWnBZMkYwYVc5dUxtcHpYQ0k2ZTF3aWJtOTBhV1o1UkdWc1pXZGhkR1ZrVUdGeVpXNTBVM1JsY0Z3aU9udGNJbk4wWlhCSlpGd2lPbHdpYzNSbGNDOHZaWFpsUURBdU1qWXVNUzh2Ym05MGFXWjVSR1ZzWldkaGRHVmtVR0Z5Wlc1MFUzUmxjRndpZlgxOWZTb3ZPMXh1Wlhod2IzSjBJSFpoY2lCdWIzUnBabmxFWld4bFoyRjBaV1JRWVhKbGJuUlRkR1Z3SUQwZ1oyeHZZbUZzVkdocGMxdFRlVzFpYjJ3dVptOXlLRndpVjA5U1MwWk1UMWRmVlZORlgxTlVSVkJjSWlsZEtGd2ljM1JsY0M4dlpYWmxRREF1TWpZdU1TOHZibTkwYVdaNVJHVnNaV2RoZEdWa1VHRnlaVzUwVTNSbGNGd2lLVHRjYmlJc0lpOHFLbDlmYVc1MFpYSnVZV3hmZDI5eWEyWnNiM2R6ZTF3aWMzUmxjSE5jSWpwN1hDSmthWE4wTDNOeVl5OWxlR1ZqZFhScGIyNHZjM1ZpWVdkbGJuUXRZV1JoY0hSbGNpNXFjMXdpT250Y0ltWnZjbmRoY21SVGRXSmhaMlZ1ZEVGMWRHaHZjbWw2WVhScGIyNUZkbVZ1ZEZOMFpYQmNJanA3WENKemRHVndTV1JjSWpwY0luTjBaWEF2TDJWMlpVQXdMakkyTGpFdkwyWnZjbmRoY21SVGRXSmhaMlZ1ZEVGMWRHaHZjbWw2WVhScGIyNUZkbVZ1ZEZOMFpYQmNJbjBzWENKbWIzSjNZWEprVTNWaVlXZGxiblJKYm5CMWRGSmxjWFZsYzNSVGRHVndYQ0k2ZTF3aWMzUmxjRWxrWENJNlhDSnpkR1Z3THk5bGRtVkFNQzR5Tmk0eEx5OW1iM0ozWVhKa1UzVmlZV2RsYm5SSmJuQjFkRkpsY1hWbGMzUlRkR1Z3WENKOWZYMTlLaTg3WEc1amIyNXpkQ0JUVlVKQlIwVk9WRjlCUkVGUVZFVlNYMHRKVGtROVlITjFZbUZuWlc1MFlEdGNibVY0Y0c5eWRDQjdJRk5WUWtGSFJVNVVYMEZFUVZCVVJWSmZTMGxPUkNCOU8xeHVkbUZ5SUdadmNuZGhjbVJUZFdKaFoyVnVkRUYxZEdodmNtbDZZWFJwYjI1RmRtVnVkRk4wWlhBZ1BTQm5iRzlpWVd4VWFHbHpXMU41YldKdmJDNW1iM0lvWENKWFQxSkxSa3hQVjE5VlUwVmZVMVJGVUZ3aUtWMG9YQ0p6ZEdWd0x5OWxkbVZBTUM0eU5pNHhMeTltYjNKM1lYSmtVM1ZpWVdkbGJuUkJkWFJvYjNKcGVtRjBhVzl1UlhabGJuUlRkR1Z3WENJcE8xeHVkbUZ5SUdadmNuZGhjbVJUZFdKaFoyVnVkRWx1Y0hWMFVtVnhkV1Z6ZEZOMFpYQWdQU0JuYkc5aVlXeFVhR2x6VzFONWJXSnZiQzVtYjNJb1hDSlhUMUpMUmt4UFYxOVZVMFZmVTFSRlVGd2lLVjBvWENKemRHVndMeTlsZG1WQU1DNHlOaTR4THk5bWIzSjNZWEprVTNWaVlXZGxiblJKYm5CMWRGSmxjWFZsYzNSVGRHVndYQ0lwTzF4dUlpd2lhVzF3YjNKMGUzUnZSWEp5YjNKTlpYTnpZV2RsZldaeWIyMWNJaU56YUdGeVpXUXZaWEp5YjNKekxtcHpYQ0k3YVcxd2IzSjBlMU5WUWtGSFJVNVVYMEZFUVZCVVJWSmZTMGxPUkgxbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDNOMVltRm5aVzUwTFdGa1lYQjBaWEl1YW5OY0lqdG1kVzVqZEdsdmJpQmpjbVZoZEdWRVpXeGxaMkYwWldSVGRXSmhaMlZ1ZEZOMVkyTmxjM05TWlhOMWJIUW9aU3h1S1h0c1pYUWdjajFsVzJCbGRtVXVZMmhoYm01bGJHQmRPMmxtS0hJL0xtdHBibVE5UFQxVFZVSkJSMFZPVkY5QlJFRlFWRVZTWDB0SlRrUXBjbVYwZFhKdWUyTmhiR3hKWkRwVGRISnBibWNvY2k1emRHRjBaVDh1WTJGc2JFbGtQejlnWUNrc2EybHVaRHBnYzNWaVlXZGxiblF0Y21WemRXeDBZQ3h2ZFhSd2RYUTZiaXh6ZFdKaFoyVnVkRTVoYldVNlUzUnlhVzVuS0hJdWMzUmhkR1UvTG5OMVltRm5aVzUwVG1GdFpUOC9ZR0FwZlgxbWRXNWpkR2x2YmlCamNtVmhkR1ZFWld4bFoyRjBaV1JUZFdKaFoyVnVkRVZ5Y205eVVtVnpkV3gwS0hRc2JpbDdiR1YwSUhJOVkzSmxZWFJsUkdWc1pXZGhkR1ZrVTNWaVlXZGxiblJUZFdOalpYTnpVbVZ6ZFd4MEtIUXNZR0FwTzJsbUtISWhQVDEyYjJsa0lEQXBjbVYwZFhKdWV5NHVMbklzYVhORmNuSnZjam9oTUN4dmRYUndkWFE2ZTJOdlpHVTZZRk5WUWtGSFJVNVVYMFZZUlVOVlZFbFBUbDlHUVVsTVJVUmdMRzFsYzNOaFoyVTZkRzlGY25KdmNrMWxjM05oWjJVb2JpbDlmWDFsZUhCdmNuUjdZM0psWVhSbFJHVnNaV2RoZEdWa1UzVmlZV2RsYm5SRmNuSnZjbEpsYzNWc2RDeGpjbVZoZEdWRVpXeGxaMkYwWldSVGRXSmhaMlZ1ZEZOMVkyTmxjM05TWlhOMWJIUjlPeUlzSWk4cUtsOWZhVzUwWlhKdVlXeGZkMjl5YTJac2IzZHplMXdpYzNSbGNITmNJanA3WENKa2FYTjBMM055WXk5bGVHVmpkWFJwYjI0dlptOXlkMkZ5WkMxMGRYSnVMV1JsYkdsMlpYSjVMWE4wWlhBdWFuTmNJanA3WENKbWIzSjNZWEprVkhWeWJrUmxiR2wyWlhKNVUzUmxjRndpT250Y0luTjBaWEJKWkZ3aU9sd2ljM1JsY0M4dlpYWmxRREF1TWpZdU1TOHZabTl5ZDJGeVpGUjFjbTVFWld4cGRtVnllVk4wWlhCY0luMTlmWDBxTHp0Y2JtVjRjRzl5ZENCMllYSWdabTl5ZDJGeVpGUjFjbTVFWld4cGRtVnllVk4wWlhBZ1BTQm5iRzlpWVd4VWFHbHpXMU41YldKdmJDNW1iM0lvWENKWFQxSkxSa3hQVjE5VlUwVmZVMVJGVUZ3aUtWMG9YQ0p6ZEdWd0x5OWxkbVZBTUM0eU5pNHhMeTltYjNKM1lYSmtWSFZ5YmtSbGJHbDJaWEo1VTNSbGNGd2lLVHRjYmlJc0ltbHRjRzl5ZEh0amNtVmhkR1ZJYjI5cmZXWnliMjFjSWlOamIyMXdhV3hsWkM5QWQyOXlhMlpzYjNjdlkyOXlaUzlwYm1SbGVDNXFjMXdpTzJsdGNHOXlkSHRqYkc5elpVaHZiMnRKZEdWeVlYUnZjaXhrYVhOd2IzTmxTRzl2YTMxbWNtOXRYQ0lqWlhobFkzVjBhVzl1TDJodmIyc3RiM2R1WlhKemFHbHdMbXB6WENJN2FXMXdiM0owZTJadmNuZGhjbVJVZFhKdVJHVnNhWFpsY25sVGRHVndmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZabTl5ZDJGeVpDMTBkWEp1TFdSbGJHbDJaWEo1TFhOMFpYQXVhbk5jSWp0cGJYQnZjblI3Y21WaWRXbHNaRk5sY21saGJHbDZZV0pzWlVWeWNtOXlmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZkMjl5YTJac2IzY3RaWEp5YjNKekxtcHpYQ0k3ZG1GeUlGUjFjbTVEYjI1MGNtOXNVbVZqWldsMlpYSTlZMnhoYzNON1luVm1abVZ5WldSRVpXeHBkbVZ5YVdWek8yTnZiblJ5YjJ3N1kyOXVkSEp2YkVsMFpYSmhkRzl5TzJSbGJHbDJaWEo1U0c5dmF6dHdaVzVrYVc1blEyOXVkSEp2YkQxdWRXeHNPMk52Ym5OMGNuVmpkRzl5S0hRcGUzUm9hWE11WW5WbVptVnlaV1JFWld4cGRtVnlhV1Z6UFhRdVluVm1abVZ5WldSRVpXeHBkbVZ5YVdWekxIUm9hWE11WTI5dWRISnZiRDFqY21WaGRHVkliMjlyS0h0MGIydGxianAwTG5SdmEyVnVmU2tzZEdocGN5NWpiMjUwY205c1NYUmxjbUYwYjNJOWRHaHBjeTVqYjI1MGNtOXNXMU41YldKdmJDNWhjM2x1WTBsMFpYSmhkRzl5WFNncExIUm9hWE11WkdWc2FYWmxjbmxJYjI5clBYUXVaR1ZzYVhabGNubEliMjlyZldkbGRDQjBiMnRsYmlncGUzSmxkSFZ5YmlCMGFHbHpMbU52Ym5SeWIyd3VkRzlyWlc1OVlYTjVibU1nWkdsemNHOXpaU2dwZTJGM1lXbDBJR05zYjNObFNHOXZhMGwwWlhKaGRHOXlLSFJvYVhNdVkyOXVkSEp2YkVsMFpYSmhkRzl5S1N4aGQyRnBkQ0JrYVhOd2IzTmxTRzl2YXloMGFHbHpMbU52Ym5SeWIyd3BmV0Z6ZVc1aklIZGhhWFJHYjNKQlkzUnBiMjRvS1h0bWIzSW9PenNwZTJ4bGRDQmxQV0YzWVdsMElIUm9hWE11Ym1WNGRFTnZiblJ5YjJ3b1lGUjFjbTRnWTI5dWRISnZiQ0JvYjI5cklHTnNiM05sWkNCaVpXWnZjbVVnWkdWc2FYWmxjbWx1WnlCaElISmxjM1ZzZEM1Z0tTeDBQWFJvYVhNdWNtVmhaRlJsY20xcGJtRnNRMjl1ZEhKdmJDaGxLVHRwWmloMElUMDlkbTlwWkNBd0tYSmxkSFZ5YmlCME8ybG1LR1V1YTJsdVpEMDlQV0IwZFhKdUxXUmxiR2wyWlhKNUxYSmxjWFZsYzNSZ0tYdHNaWFFnZEQxaGQyRnBkQ0IwYUdsekxuTmxjblpwWTJWRVpXeHBkbVZ5ZVZKbGNYVmxjM1FvWlNrN2FXWW9kQ0U5UFhadmFXUWdNQ2x5WlhSMWNtNGdkSDE5ZldKMVptWmxjbFIxY201RVpXeHBkbVZ5YVdWektHVXBlMlV1WW5WbVptVnlaV1JFWld4cGRtVnlhV1Z6SVQwOWRtOXBaQ0F3SmlaMGFHbHpMbUoxWm1abGNtVmtSR1ZzYVhabGNtbGxjeTUxYm5Ob2FXWjBLQzR1TG1VdVluVm1abVZ5WldSRVpXeHBkbVZ5YVdWektYMWpiMjV6ZFcxbFEyOXVkSEp2YkNncGUzUm9hWE11Y0dWdVpHbHVaME52Ym5SeWIydzliblZzYkgxblpYUkRiMjUwY205c1VISnZiV2x6WlNncGUzSmxkSFZ5YmlCMGFHbHpMbkJsYm1ScGJtZERiMjUwY205c1B6ODlkR2hwY3k1amIyNTBjbTlzU1hSbGNtRjBiM0l1Ym1WNGRDZ3BMSFJvYVhNdWNHVnVaR2x1WjBOdmJuUnliMng5WVhONWJtTWdibVY0ZEVOdmJuUnliMndvWlNsN1ptOXlLRHM3S1h0c1pYUWdkRDFoZDJGcGRDQjBhR2x6TG1kbGRFTnZiblJ5YjJ4UWNtOXRhWE5sS0NrN2FXWW9kR2hwY3k1amIyNXpkVzFsUTI5dWRISnZiQ2dwTEhRdVpHOXVaU2wwYUhKdmR5QkZjbkp2Y2lobEtUdHNaWFFnYmoxMExuWmhiSFZsTzJsbUtHNHVhMmx1WkQwOVBXQjBkWEp1TFdWeWNtOXlZQ2wwYUhKdmR5QnlaV0oxYVd4a1UyVnlhV0ZzYVhwaFlteGxSWEp5YjNJb2JpNWxjbkp2Y2lrN2FXWW9iaTVyYVc1a1BUMDlZSFIxY200dFkyOXVkR2x1ZFdGMGFXOXVMWFJ2YTJWdVlDbDdZWGRoYVhRZ2RHaHBjeTVrWld4cGRtVnllVWh2YjJzdWNtVnJaWGtvYmk1amIyNTBhVzUxWVhScGIyNVViMnRsYmlrN1kyOXVkR2x1ZFdWOWNtVjBkWEp1SUc1OWZYSmxZV1JVWlhKdGFXNWhiRU52Ym5SeWIyd29aU2w3YVdZb1pTNXJhVzVrUFQwOVlIUjFjbTR0WlhKeWIzSmdLWFJvY205M0lISmxZblZwYkdSVFpYSnBZV3hwZW1GaWJHVkZjbkp2Y2lobExtVnljbTl5S1R0cFppaGxMbXRwYm1ROVBUMWdkSFZ5YmkxeVpYTjFiSFJnS1hKbGRIVnliaUIwYUdsekxtSjFabVpsY2xSMWNtNUVaV3hwZG1WeWFXVnpLR1VwTEdVdVlXTjBhVzl1ZldGemVXNWpJSE5sY25acFkyVkVaV3hwZG1WeWVWSmxjWFZsYzNRb1pTbDdZWGRoYVhRZ2RHaHBjeTVrWld4cGRtVnllVWh2YjJzdWNtVnJaWGtvWlM1amIyNTBhVzUxWVhScGIyNVViMnRsYmlrN2JHVjBJSFE5ZEdocGN5NWlkV1ptWlhKbFpFUmxiR2wyWlhKcFpYTXVjMmhwWm5Rb0tUdG1iM0lvTzNROVBUMTJiMmxrSURBN0tYdHNaWFFnYmoxaGQyRnBkQ0JRY205dGFYTmxMbkpoWTJVb1czUm9hWE11WjJWMFEyOXVkSEp2YkZCeWIyMXBjMlVvS1M1MGFHVnVLR1U5UGloN2EybHVaRHBnWTI5dWRISnZiR0FzZG1Gc2RXVTZaWDBwS1N4MGFHbHpMbVJsYkdsMlpYSjVTRzl2YXk1dVpYaDBLQ2t1ZEdobGJpaGxQVDRvZTJ0cGJtUTZZR1JsYkdsMlpYSjVZQ3gyWVd4MVpUcGxmU2twWFNrN2FXWW9iaTVyYVc1a1BUMDlZR052Ym5SeWIyeGdLWHRwWmloMGFHbHpMbU52Ym5OMWJXVkRiMjUwY205c0tDa3NiaTUyWVd4MVpTNWtiMjVsS1hSb2NtOTNJRVZ5Y205eUtHQlVkWEp1SUdOdmJuUnliMndnYUc5dmF5QmpiRzl6WldRZ1pIVnlhVzVuSUdFZ1pHVnNhWFpsY25rZ2NtVnhkV1Z6ZEM1Z0tUdHBaaWh1TG5aaGJIVmxMblpoYkhWbExtdHBibVE5UFQxZ2RIVnliaTFqYjI1MGFXNTFZWFJwYjI0dGRHOXJaVzVnS1h0aGQyRnBkQ0IwYUdsekxtUmxiR2wyWlhKNVNHOXZheTV5Wld0bGVTaHVMblpoYkhWbExuWmhiSFZsTG1OdmJuUnBiblZoZEdsdmJsUnZhMlZ1S1R0amIyNTBhVzUxWlgxc1pYUWdkRDEwYUdsekxuSmxZV1JVWlhKdGFXNWhiRU52Ym5SeWIyd29iaTUyWVd4MVpTNTJZV3gxWlNrN2FXWW9kQ0U5UFhadmFXUWdNQ2x5WlhSMWNtNGdkRHRwWmlodUxuWmhiSFZsTG5aaGJIVmxMbXRwYm1ROVBUMWdkSFZ5Ymkxa1pXeHBkbVZ5ZVMxallXNWpaV3hzWldSZ0ppWnVMblpoYkhWbExuWmhiSFZsTG5KbGNYVmxjM1JKWkQwOVBXVXVjbVZ4ZFdWemRFbGtLWEpsZEhWeWJqdGpiMjUwYVc1MVpYMXBaaWh1TG5aaGJIVmxMbVJ2Ym1VcGRHaHliM2NnUlhKeWIzSW9ZRk5sYzNOcGIyNGdaR1ZzYVhabGNua2dhRzl2YXlCamJHOXpaV1FnWkhWeWFXNW5JR0VnZEhWeWJpQmtaV3hwZG1WeWVTQnlaWEYxWlhOMExtQXBPM1JvYVhNdVpHVnNhWFpsY25sSWIyOXJMbU52Ym5OMWJXVk9aWGgwS0Nrc2JpNTJZV3gxWlM1MllXeDFaUzVyYVc1a1BUMDlZR1JsYkdsMlpYSmdKaVlvZEQxdUxuWmhiSFZsTG5aaGJIVmxLWDEwY25sN1lYZGhhWFFnWm05eWQyRnlaRlIxY201RVpXeHBkbVZ5ZVZOMFpYQW9lMmx1WW05NFZHOXJaVzQ2WlM1cGJtSnZlRlJ2YTJWdUxIQmhlV3h2WVdRNmUyUmxiR2wyWlhKNU9uUXNhMmx1WkRwZ1pISnBkbVZ5TFdSbGJHbDJaWEo1WUN4eVpYRjFaWE4wU1dRNlpTNXlaWEYxWlhOMFNXUjlmU2w5WTJGMFkyZ29aU2w3YVdZb0lTaGxJR2x1YzNSaGJtTmxiMllnUlhKeWIzSW1KbVV1Ym1GdFpUMDlQV0JJYjI5clRtOTBSbTkxYm1SRmNuSnZjbUFwS1hSb2NtOTNJR1Y5Y21WMGRYSnVJR0YzWVdsMElIUm9hWE11WVhkaGFYUkdiM0ozWVhKa1pXUkVaV3hwZG1WeWVTaGxMbkpsY1hWbGMzUkpaQ3gwS1gxaGMzbHVZeUJoZDJGcGRFWnZjbmRoY21SbFpFUmxiR2wyWlhKNUtHVXNkQ2w3Wm05eUtEczdLWHRzWlhRZ2JqMWhkMkZwZENCMGFHbHpMbTVsZUhSRGIyNTBjbTlzS0dCVWRYSnVJR052Ym5SeWIyd2dhRzl2YXlCamJHOXpaV1FnWW1WbWIzSmxJSEpsYzI5c2RtbHVaeUJoSUdadmNuZGhjbVJsWkNCa1pXeHBkbVZ5ZVM1Z0tUdHBaaWh1TG10cGJtUTlQVDFnZEhWeWJpMWtaV3hwZG1WeWVTMWhZMk5sY0hSbFpHQXBlMmxtS0c0dWNtVnhkV1Z6ZEVsa1BUMDlaU2x5WlhSMWNtNDdZMjl1ZEdsdWRXVjlhV1lvYmk1cmFXNWtQVDA5WUhSMWNtNHRaR1ZzYVhabGNua3RZMkZ1WTJWc2JHVmtZQ1ltYmk1eVpYRjFaWE4wU1dROVBUMWxLWHQwYUdsekxtSjFabVpsY21Wa1JHVnNhWFpsY21sbGN5NTFibk5vYVdaMEtIUXBPM0psZEhWeWJuMXVMbXRwYm1ROVBUMWdkSFZ5YmkxeVpYTjFiSFJnSmlaMGFHbHpMbUoxWm1abGNtVmtSR1ZzYVhabGNtbGxjeTUxYm5Ob2FXWjBLSFFwTzJ4bGRDQnlQWFJvYVhNdWNtVmhaRlJsY20xcGJtRnNRMjl1ZEhKdmJDaHVLVHRwWmloeUlUMDlkbTlwWkNBd0tYSmxkSFZ5YmlCeWZYMTlPMlY0Y0c5eWRIdFVkWEp1UTI5dWRISnZiRkpsWTJWcGRtVnlmVHNpTENKcGJYQnZjblI3WkdsemNHRjBZMmhVZFhKdVUzUmxjSDFtY205dFhDSWpaWGhsWTNWMGFXOXVMM2R2Y210bWJHOTNMWE4wWlhCekxtcHpYQ0k3YVcxd2IzSjBlMVIxY201RGIyNTBjbTlzVW1WalpXbDJaWEo5Wm5KdmJWd2lJMlY0WldOMWRHbHZiaTkwZFhKdUxXTnZiblJ5YjJ3dGNtVmpaV2wyWlhJdWFuTmNJanRoYzNsdVl5Qm1kVzVqZEdsdmJpQmthWE53WVhSamFFRnVaRUYzWVdsMFZIVnliaWgwS1h0c1pYUWdiajF1WlhjZ1ZIVnlia052Ym5SeWIyeFNaV05sYVhabGNpaDdZblZtWm1WeVpXUkVaV3hwZG1WeWFXVnpPblF1WW5WbVptVnlaV1JFWld4cGRtVnlhV1Z6TEdSbGJHbDJaWEo1U0c5dmF6cDBMbVJsYkdsMlpYSjVTRzl2YXl4MGIydGxianAwTG1OdmJuUnliMnhVYjJ0bGJuMHBPM1J5ZVh0eVpYUjFjbTRnWVhkaGFYUWdaR2x6Y0dGMFkyaFVkWEp1VTNSbGNDaDdZMkZ3WVdKcGJHbDBhV1Z6T25RdVkyRndZV0pwYkdsMGFXVnpMR052YlhCc1pYUnBiMjVVYjJ0bGJqcHVMblJ2YTJWdUxHUmxiR2wyWlhKNU9uUXVaR1ZzYVhabGNua3NiVzlrWlRwMExtMXZaR1VzY0dGeVpXNTBWM0pwZEdGaWJHVTZkQzV3WVhKbGJuUlhjbWwwWVdKc1pTeHpaWEpwWVd4cGVtVmtRMjl1ZEdWNGREcDBMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMSE5sYzNOcGIyNVRkR0YwWlRwMExuTmxjM05wYjI1VGRHRjBaWDBwTEh0aFkzUnBiMjQ2WVhkaGFYUWdiaTUzWVdsMFJtOXlRV04wYVc5dUtDa3NaR2x6Y0c5elpUb29LVDArYmk1a2FYTndiM05sS0NsOWZXTmhkR05vS0dVcGUzUm9jbTkzSUdGM1lXbDBJRzR1WkdsemNHOXpaU2dwTEdWOWZXVjRjRzl5ZEh0a2FYTndZWFJqYUVGdVpFRjNZV2wwVkhWeWJuMDdJaXdpTHlvcVgxOXBiblJsY201aGJGOTNiM0pyWm14dmQzTjdYQ0p6ZEdWd2Mxd2lPbnRjSW1ScGMzUXZjM0pqTDJWNFpXTjFkR2x2Ymk5amNtVmhkR1V0YzJWemMybHZiaTF6ZEdWd0xtcHpYQ0k2ZTF3aVkzSmxZWFJsVTJWemMybHZibE4wWlhCY0lqcDdYQ0p6ZEdWd1NXUmNJanBjSW5OMFpYQXZMMlYyWlVBd0xqSTJMakV2TDJOeVpXRjBaVk5sYzNOcGIyNVRkR1Z3WENKOWZYMTlLaTg3WEc1bGVIQnZjblFnZG1GeUlHTnlaV0YwWlZObGMzTnBiMjVUZEdWd0lEMGdaMnh2WW1Gc1ZHaHBjMXRUZVcxaWIyd3VabTl5S0Z3aVYwOVNTMFpNVDFkZlZWTkZYMU5VUlZCY0lpbGRLRndpYzNSbGNDOHZaWFpsUURBdU1qWXVNUzh2WTNKbFlYUmxVMlZ6YzJsdmJsTjBaWEJjSWlrN1hHNGlMQ0l2S2lwZlgybHVkR1Z5Ym1Gc1gzZHZjbXRtYkc5M2MzdGNJbk4wWlhCelhDSTZlMXdpWkdsemRDOXpjbU12WlhobFkzVjBhVzl1TDNObGRIUnNaUzFqWVc1alpXeHNaV1F0ZEhWeWJpMXpkR1Z3TG1welhDSTZlMXdpYzJWMGRHeGxRMkZ1WTJWc2JHVmtWSFZ5YmxOMFpYQmNJanA3WENKemRHVndTV1JjSWpw",
	"Y0luTjBaWEF2TDJWMlpVQXdMakkyTGpFdkwzTmxkSFJzWlVOaGJtTmxiR3hsWkZSMWNtNVRkR1Z3WENKOWZYMTlLaTg3WEc1bGVIQnZjblFnZG1GeUlITmxkSFJzWlVOaGJtTmxiR3hsWkZSMWNtNVRkR1Z3SUQwZ1oyeHZZbUZzVkdocGMxdFRlVzFpYjJ3dVptOXlLRndpVjA5U1MwWk1UMWRmVlZORlgxTlVSVkJjSWlsZEtGd2ljM1JsY0M4dlpYWmxRREF1TWpZdU1TOHZjMlYwZEd4bFEyRnVZMlZzYkdWa1ZIVnlibE4wWlhCY0lpazdYRzRpTENJdktpcGZYMmx1ZEdWeWJtRnNYM2R2Y210bWJHOTNjM3RjSW5OMFpYQnpYQ0k2ZTF3aVpHbHpkQzl6Y21NdlpYaGxZM1YwYVc5dUwzUmxjbTFwYm1Gc0xYTmxjM05wYjI0dFptRnBiSFZ5WlMxemRHVndMbXB6WENJNmUxd2laVzFwZEZSbGNtMXBibUZzVTJWemMybHZia1poYVd4MWNtVlRkR1Z3WENJNmUxd2ljM1JsY0Vsa1hDSTZYQ0p6ZEdWd0x5OWxkbVZBTUM0eU5pNHhMeTlsYldsMFZHVnliV2x1WVd4VFpYTnphVzl1Um1GcGJIVnlaVk4wWlhCY0luMTlmWDBxTHp0Y2JtVjRjRzl5ZENCMllYSWdaVzFwZEZSbGNtMXBibUZzVTJWemMybHZia1poYVd4MWNtVlRkR1Z3SUQwZ1oyeHZZbUZzVkdocGMxdFRlVzFpYjJ3dVptOXlLRndpVjA5U1MwWk1UMWRmVlZORlgxTlVSVkJjSWlsZEtGd2ljM1JsY0M4dlpYWmxRREF1TWpZdU1TOHZaVzFwZEZSbGNtMXBibUZzVTJWemMybHZia1poYVd4MWNtVlRkR1Z3WENJcE8xeHVJaXdpTHlvcVgxOXBiblJsY201aGJGOTNiM0pyWm14dmQzTjdYQ0p6ZEdWd2Mxd2lPbnRjSW1ScGMzUXZjM0pqTDJWNFpXTjFkR2x2Ymk5elpYTnphVzl1TFdOaGJHeGlZV05yTFhOMFpYQXVhbk5jSWpwN1hDSm1hWEpsVTJWemMybHZia05oYkd4aVlXTnJVM1JsY0Z3aU9udGNJbk4wWlhCSlpGd2lPbHdpYzNSbGNDOHZaWFpsUURBdU1qWXVNUzh2Wm1seVpWTmxjM05wYjI1RFlXeHNZbUZqYTFOMFpYQmNJbjE5ZlgwcUx6dGNibVY0Y0c5eWRDQjJZWElnWm1seVpWTmxjM05wYjI1RFlXeHNZbUZqYTFOMFpYQWdQU0JuYkc5aVlXeFVhR2x6VzFONWJXSnZiQzVtYjNJb1hDSlhUMUpMUmt4UFYxOVZVMFZmVTFSRlVGd2lLVjBvWENKemRHVndMeTlsZG1WQU1DNHlOaTR4THk5bWFYSmxVMlZ6YzJsdmJrTmhiR3hpWVdOclUzUmxjRndpS1R0Y2JpSXNJbWx0Y0c5eWRIdGpjbVZoZEdWSWIyOXJmV1p5YjIxY0lpTmpiMjF3YVd4bFpDOUFkMjl5YTJac2IzY3ZZMjl5WlM5cGJtUmxlQzVxYzF3aU8ybHRjRzl5ZEh0amJHRnBiVWh2YjJ0UGQyNWxjbk5vYVhBc1pHbHpjRzl6WlVodmIydDlabkp2YlZ3aUkyVjRaV04xZEdsdmJpOW9iMjlyTFc5M2JtVnljMmhwY0M1cWMxd2lPMloxYm1OMGFXOXVJR055WldGMFpWTmxjM05wYjI1RVpXeHBkbVZ5ZVVodmIyc29jaWw3YkdWMElHa3NZVDFiWFN4dlBWdGRMSE05TUN4alBXNTFiR3dzYkN4MUxHVnVjWFZsZFdVOVpUMCtlMjh1Y0hWemFDaGxLU3h2TG5OdmNuUW9LR1VzZENrOVBtVXViM0prWlhJdGRDNXZjbVJsY2lrc2RUOHVLQ2tzZFQxMmIybGtJREI5TEdGeWJUMWxQVDU3WlM1amJHOXpaV1I4ZkdVdWNHVnVaR2x1WjN4OEtHVXVjR1Z1WkdsdVp6MGhNQ3hsTG5KbGMyOXNkbVZrUFhadmFXUWdNQ3dvWlM1eVpYUnBjbVZrUDFCeWIyMXBjMlV1Y21WemIyeDJaU2hsTG1odmIyc3BMblJvWlc0b1pUMCtLSHRrYjI1bE9pRXhMSFpoYkhWbE9tVjlLU2s2WlM1cGRHVnlZWFJ2Y2k1dVpYaDBLQ2twTG5Sb1pXNG9kRDArZTJ4bGRDQnVQWHR2Y21SbGNqcHpLeXNzY21WemRXeDBPblFzYzNSaGRHVTZaWDA3WlM1eVpYTnZiSFpsWkQxdUxHVXVaVzVoWW14bFpDWW1aVzV4ZFdWMVpTaHVLWDBzS0NrOVBudDlLU2w5TEdWdVlXSnNaVDFsUFQ1N1pTNWxibUZpYkdWa1BTRXdMR1V1Y21WemIyeDJaV1FoUFQxMmIybGtJREFtSm1WdWNYVmxkV1VvWlM1eVpYTnZiSFpsWkNsOUxHUnlZV2x1VW1WaFpIazlZWE41Ym1Nb0tUMCtlMmxtS0dNOVBUMXVkV3hzS1dadmNpaGhkMkZwZENCUWNtOXRhWE5sTG5KbGMyOXNkbVVvS1R0dkxteGxibWQwYUQ0d095bDdiR1YwSUdVOWJ5NXphR2xtZENncE8yVXVjM1JoZEdVdWNHVnVaR2x1WnowaE1TeGxMbk4wWVhSbExuSmxjMjlzZG1Wa1BYWnZhV1FnTUN4bExuSmxjM1ZzZEM1a2IyNWxQMlV1YzNSaGRHVXVZMnh2YzJWa1BTRXdPbVV1Y21WemRXeDBMblpoYkhWbExtdHBibVE5UFQxZ1pHVnNhWFpsY21BbUpuSXVjSFZ6YUNobExuSmxjM1ZzZEM1MllXeDFaU2tzWVhKdEtHVXVjM1JoZEdVcExHRjNZV2wwSUZCeWIyMXBjMlV1Y21WemIyeDJaU2dwZlgwN2NtVjBkWEp1ZTJOdmJuTjFiV1ZPWlhoMEtDbDdhV1lvYkQwOVBYWnZhV1FnTUNsMGFISnZkeUJGY25KdmNpaGdRMkZ1Ym05MElHTnZibk4xYldVZ1lTQndkV0pzYVdNZ1pHVnNhWFpsY25rZ1ltVm1iM0psSUdsMElISmxjMjlzZG1WekxtQXBPMnd1YzNSaGRHVXVjR1Z1WkdsdVp6MGhNU3hzTG5OMFlYUmxMbkpsYzI5c2RtVmtQWFp2YVdRZ01DeHNMbkpsYzNWc2RDNWtiMjVsSmlZb2JDNXpkR0YwWlM1amJHOXpaV1E5SVRBcExHdzlkbTlwWkNBd0xHTTliblZzYkgwc1lYTjVibU1nWkdsemNHOXpaU2dwZTJraFBUMTJiMmxrSURBbUppaGhkMkZwZENCa2FYTndiM05sU0c5dmF5aHBMbWh2YjJzcExHazlkbTlwWkNBd0tYMHNibVY0ZENncGUybG1LR2s5UFQxMmIybGtJREFwZEdoeWIzY2dSWEp5YjNJb1lFTmhibTV2ZENCM1lXbDBJR1p2Y2lCa1pXeHBkbVZ5YVdWeklHSmxabTl5WlNCaElHTnZiblJwYm5WaGRHbHZiaUIwYjJ0bGJpQnBjeUJoZG1GcGJHRmliR1V1WUNrN2FXWW9ZeUU5UFc1MWJHd3BjbVYwZFhKdUlHTTdZWEp0S0drcE8yWnZjaWhzWlhRZ1pTQnZaaUJoS1dGeWJTaGxLVHR5WlhSMWNtNGdhUzVqYkc5elpXUW1KbUV1WlhabGNua29aVDArWlM1amJHOXpaV1FwUHloc1BYdHZjbVJsY2pwekt5c3NjbVZ6ZFd4ME9udGtiMjVsT2lFd0xIWmhiSFZsT25admFXUWdNSDBzYzNSaGRHVTZhWDBzWXoxUWNtOXRhWE5sTG5KbGMyOXNkbVVvYkM1eVpYTjFiSFFwTEdNcE9paGpQU2hoYzNsdVl5Z3BQVDU3Wm05eUtEdHZMbXhsYm1kMGFEMDlQVEE3S1dGM1lXbDBJRzVsZHlCUWNtOXRhWE5sS0dVOVBudDFQV1Y5S1R0c1pYUWdaVDF2TG5Ob2FXWjBLQ2s3Y21WMGRYSnVJR3c5WlN4bExuSmxjM1ZzZEgwcEtDa3NZeWw5TEdGemVXNWpJSEpsYTJWNUtISXBlMmxtS0NGeWZIeHBQeTVvYjI5ckxuUnZhMlZ1UFQwOWNpbHlaWFIxY200N2JHVjBJRzg5WTNKbFlYUmxTRzl2YXloN2RHOXJaVzQ2Y24wcExITTllMk5zYjNObFpEb2hNU3hsYm1GaWJHVmtPaUV4TEdodmIyczZieXhwZEdWeVlYUnZjanB2VzFONWJXSnZiQzVoYzNsdVkwbDBaWEpoZEc5eVhTZ3BMSEJsYm1ScGJtYzZJVEVzY21WMGFYSmxaRG9oTVgwN2FXWW9hVDA5UFhadmFXUWdNQ2w3WVhkaGFYUWdZMnhoYVcxSWIyOXJUM2R1WlhKemFHbHdLSE11YUc5dmF5a3NaVzVoWW14bEtITXBMR2s5Y3p0eVpYUjFjbTU5YkdWMElHTTlhVHRoY20wb1l5a3NZWEp0S0hNcExHRjNZV2wwSUdOc1lXbHRTRzl2YTA5M2JtVnljMmhwY0NoekxtaHZiMnNwTEdWdVlXSnNaU2h6S1N4aGQyRnBkQ0JrY21GcGJsSmxZV1I1S0NrN2RISjVlMkYzWVdsMElHUnBjM0J2YzJWSWIyOXJLR011YUc5dmF5bDlZMkYwWTJnb1pTbDdhVDEyYjJsa0lEQTdkSEo1ZTJGM1lXbDBJR1JwYzNCdmMyVkliMjlyS0hNdWFHOXZheWw5WTJGMFkyaDdmWFJvY205M0lHVjlZeTV5WlhScGNtVmtQU0V3TEdFdWNIVnphQ2hqS1N4cFBYTXNZWGRoYVhRZ1pISmhhVzVTWldGa2VTZ3BmWDE5Wlhod2IzSjBlMk55WldGMFpWTmxjM05wYjI1RVpXeHBkbVZ5ZVVodmIydDlPeUlzSWk4cUtsOWZhVzUwWlhKdVlXeGZkMjl5YTJac2IzZHplMXdpZDI5eWEyWnNiM2R6WENJNmUxd2laR2x6ZEM5emNtTXZaWGhsWTNWMGFXOXVMM2R2Y210bWJHOTNMV1Z1ZEhKNUxtcHpYQ0k2ZTF3aWQyOXlhMlpzYjNkRmJuUnllVndpT250Y0luZHZjbXRtYkc5M1NXUmNJanBjSW5kdmNtdG1iRzkzTHk5bGRtVXZMM2R2Y210bWJHOTNSVzUwY25sY0luMTlmWDBxTHp0Y2JtbHRjRzl5ZEh0eVpXRmtVMlZ5YVdGc2FYcGxaRk4xWW1GblpXNTBSR1Z3ZEdoOVpuSnZiVndpSTJoaGNtNWxjM012YzNWaVlXZGxiblF0WkdWd2RHZ3Vhbk5jSWp0cGJYQnZjblI3WTNKbFlYUmxTRzl2YXl4blpYUlhiM0pyWm14dmQwMWxkR0ZrWVhSaExHZGxkRmR5YVhSaFlteGxmV1p5YjIxY0lpTmpiMjF3YVd4bFpDOUFkMjl5YTJac2IzY3ZZMjl5WlM5cGJtUmxlQzVxYzF3aU8ybHRjRzl5ZEh0a2FYTndiM05sU0c5dmEzMW1jbTl0WENJalpYaGxZM1YwYVc5dUwyaHZiMnN0YjNkdVpYSnphR2x3TG1welhDSTdhVzF3YjNKMGUyNXZjbTFoYkdsNlpWTmxjbWxoYkdsNllXSnNaVVZ5Y205eWZXWnliMjFjSWlObGVHVmpkWFJwYjI0dmQyOXlhMlpzYjNjdFpYSnliM0p6TG1welhDSTdhVzF3YjNKMGUzSnZkWFJsUkdWc2FYWmxjbFJ2UTJocGJHUnlaVzU5Wm5KdmJWd2lJMlY0WldOMWRHbHZiaTl5YjNWMFpTMWphR2xzWkMxa1pXeHBkbVZ5ZVM1cWMxd2lPMmx0Y0c5eWRIdGpiMkZzWlhOalpVUmxiR2wyWlhKcFpYTjlabkp2YlZ3aUkyaGhjbTVsYzNNdmJXVnpjMkZuWlhNdWFuTmNJanRwYlhCdmNuUjdjbVZoWkVOb1lXNXVaV3hTWlhGMVpYTjBTV1FzY21WaFpGSnZiM1JUWlhOemFXOXVTV1I5Wm5KdmJWd2lJMlY0WldOMWRHbHZiaTlsZG1VdGQyOXlhMlpzYjNjdFlYUjBjbWxpZFhSbGN5NXFjMXdpTzJsdGNHOXlkSHR1YjNScFpubEVaV3hsWjJGMFpXUlFZWEpsYm5SVGRHVndmV1p5YjIxY0lpTmxlR1ZqZFhScGIyNHZaR1ZzWldkaGRHVmtMWEJoY21WdWRDMXViM1JwWm1sallYUnBiMjR1YW5OY0lqdHBiWEJ2Y25SN1kzSmxZWFJsUkdWc1pXZGhkR1ZrVTNWaVlXZGxiblJGY25KdmNsSmxjM1ZzZEN4amNtVmhkR1ZFWld4bFoyRjBaV1JUZFdKaFoyVnVkRk4xWTJObGMzTlNaWE4xYkhSOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5a1pXeGxaMkYwWldRdGNHRnlaVzUwTFhKbGMzVnNkQzVxYzF3aU8ybHRjRzl5ZEh0a2FYTndZWFJqYUVGdVpFRjNZV2wwVkhWeWJuMW1jbTl0WENJalpYaGxZM1YwYVc5dUwzUjFjbTR0WkdsemNHRjBZMmd1YW5OY0lqdHBiWEJ2Y25SN1kzSmxZWFJsVTJWemMybHZibE4wWlhCOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5amNtVmhkR1V0YzJWemMybHZiaTF6ZEdWd0xtcHpYQ0k3YVcxd2IzSjBlM05sZEhSc1pVTmhibU5sYkd4bFpGUjFjbTVUZEdWd2ZXWnliMjFjSWlObGVHVmpkWFJwYjI0dmMyVjBkR3hsTFdOaGJtTmxiR3hsWkMxMGRYSnVMWE4wWlhBdWFuTmNJanRwYlhCdmNuUjdaVzFwZEZSbGNtMXBibUZzVTJWemMybHZia1poYVd4MWNtVlRkR1Z3ZldaeWIyMWNJaU5sZUdWamRYUnBiMjR2ZEdWeWJXbHVZV3d0YzJWemMybHZiaTFtWVdsc2RYSmxMWE4wWlhBdWFuTmNJanRwYlhCdmNuUjdabWx5WlZObGMzTnBiMjVEWVd4c1ltRmphMU4wWlhCOVpuSnZiVndpSTJWNFpXTjFkR2x2Ymk5elpYTnphVzl1TFdOaGJHeGlZV05yTFhOMFpYQXVhbk5jSWp0cGJYQnZjblI3WTNKbFlYUmxVMlZ6YzJsdmJrUmxiR2wyWlhKNVNHOXZhMzFtY205dFhDSWpaWGhsWTNWMGFXOXVMM05sYzNOcGIyNHRaR1ZzYVhabGNua3RhRzl2YXk1cWMxd2lPMkZ6ZVc1aklHWjFibU4wYVc5dUlIZHZjbXRtYkc5M1JXNTBjbmtvZENsN2JHVjBlM2R2Y210bWJHOTNVblZ1U1dRNmFYMDlaMlYwVjI5eWEyWnNiM2ROWlhSaFpHRjBZU2dwTEc4OWRDNXpaWEpwWVd4cGVtVmtRMjl1ZEdWNGRGdGdaWFpsTG1OdmJuUnBiblZoZEdsdmJsUnZhMlZ1WUYxOGZHQmdMSE05ZEM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEZ0Z1pYWmxMbTF2WkdWZ1hTeDFQWFF1YzJWeWFXRnNhWHBsWkVOdmJuUmxlSFJiWUdWMlpTNWpZWEJoWW1sc2FYUnBaWE5nWFN4a1BYUXVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUmJZR1YyWlM1aWRXNWtiR1ZnWFR0MExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMFcyQmxkbVV1YzJWemMybHZia2xrWUYwOWFUdHNaWFFnWmoxblpYUlhjbWwwWVdKc1pTZ3BPM1J5ZVh0c1pYUWdiajF5WldGa1VtOXZkRk5sYzNOcGIyNUpaQ2gwTG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwS1N4eVBYSmxZV1JUWlhKcFlXeHBlbVZrVTNWaVlXZGxiblJFWlhCMGFDaDBMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBLU3g3YzNSaGRHVTZZWDA5WVhkaGFYUWdZM0psWVhSbFUyVnpjMmx2YmxOMFpYQW9lMk52YlhCcGJHVmtRWEowYVdaaFkzUnpVMjkxY21ObE9tUXVjMjkxY21ObExHTnZiblJwYm5WaGRHbHZibFJ2YTJWdU9tOHNhVzVvWlhKcGRHVmtUR2x0YVhSek9uUXViR2x0YVhSekxHNXZaR1ZKWkRwa0xtNXZaR1ZKWkN4dmRYUndkWFJUWTJobGJXRTZkQzVwYm5CMWRDNXZkWFJ3ZFhSVFkyaGxiV0VzY205dmRGTmxjM05wYjI1SlpEcHVMSE5sYzNOcGIyNUpaRHBwTEhOMVltRm5aVzUwUkdWd2RHZzZjbjBwTzNKbGRIVnliaUJoZDJGcGRDQnlkVzVFY21sMlpYSk1iMjl3S0h0allYQmhZbWxzYVhScFpYTTZkU3hrY21sMlpYSlhjbWwwWVdKc1pUcG1MR2x1YVhScFlXeEpibkIxZERwN2EybHVaRHBnWkdWc2FYWmxjbUFzY0dGNWJHOWhaSE02VzN0dFpYTnpZV2RsT25RdWFXNXdkWFF1YldWemMyRm5aU3hqYjI1MFpYaDBPblF1YVc1d2RYUXVZMjl1ZEdWNGRDeHZkWFJ3ZFhSVFkyaGxiV0U2ZEM1cGJuQjFkQzV2ZFhSd2RYUlRZMmhsYldGOVhTeHlaWEYxWlhOMFNXUTZjbVZoWkVOb1lXNXVaV3hTWlhGMVpYTjBTV1FvZEM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZENsOUxHMXZaR1U2Y3l4elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZERwMExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMExITmxjM05wYjI1VGRHRjBaVHBoZlNsOVkyRjBZMmdvWlNsN2RHaHliM2NnWVhkaGFYUWdaVzFwZEZSbGNtMXBibUZzVTJWemMybHZia1poYVd4MWNtVlRkR1Z3S0h0bGNuSnZjanB1YjNKdFlXeHBlbVZUWlhKcFlXeHBlbUZpYkdWRmNuSnZjaWhsS1N4d1lYSmxiblJYY21sMFlXSnNaVHBtTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT25RdWMyVnlhV0ZzYVhwbFpFTnZiblJsZUhSOUtTeGhkMkZwZENCbWFYSmxVMlZ6YzJsdmJrTmhiR3hpWVdOclUzUmxjQ2g3WlhKeWIzSTZibTl5YldGc2FYcGxVMlZ5YVdGc2FYcGhZbXhsUlhKeWIzSW9aU2tzYzJWeWFXRnNhWHBsWkVOdmJuUmxlSFE2ZEM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEN4emRHRjBkWE02WUdaaGFXeGxaR0I5S1N4aGQyRnBkQ0J1YjNScFpubEVaV3hsWjJGMFpXUlFZWEpsYm5SVGRHVndLSHR5WlhOMWJIUTZZM0psWVhSbFJHVnNaV2RoZEdWa1UzVmlZV2RsYm5SRmNuSnZjbEpsYzNWc2RDaDBMbk5sY21saGJHbDZaV1JEYjI1MFpYaDBMR1VwTEhObGNtbGhiR2w2WldSRGIyNTBaWGgwT25RdWMyVnlhV0ZzYVhwbFpFTnZiblJsZUhSOUtTeGxmWDFoYzNsdVl5Qm1kVzVqZEdsdmJpQnlkVzVFY21sMlpYSk1iMjl3S0dVcGUyeGxkQ0J1UFdOeVpXRjBaVWh2YjJzb2UzUnZhMlZ1T21Ba2UyVXVjMlZ6YzJsdmJsTjBZWFJsTG5ObGMzTnBiMjVKWkgwNllYVjBhR0I5S1N4eVBXNWJVM2x0WW05c0xtRnplVzVqU1hSbGNtRjBiM0pkS0Nrc1lUMHdMRzVsZUhSVWRYSnVRMjl1ZEhKdmJGUnZhMlZ1UFNncFBUNWdKSHRsTG5ObGMzTnBiMjVUZEdGMFpTNXpaWE56YVc5dVNXUjlPblIxY200dFkyOXVkSEp2YkRva2UxTjBjbWx1WnloaEt5c3BmV0FzY3oxYlhTeGpQV055WldGMFpWTmxjM05wYjI1RVpXeHBkbVZ5ZVVodmIyc29jeWtzYkN4eWRXNVVkWEp1UFdGemVXNWpJSFE5UG50c1pYUWdiajFoZDJGcGRDQmthWE53WVhSamFFRnVaRUYzWVdsMFZIVnliaWg3WW5WbVptVnlaV1JFWld4cGRtVnlhV1Z6T25Nc1kyRndZV0pwYkdsMGFXVnpPbVV1WTJGd1lXSnBiR2wwYVdWekxHTnZiblJ5YjJ4VWIydGxianB1WlhoMFZIVnlia052Ym5SeWIyeFViMnRsYmlncExHUmxiR2wyWlhKNU9uUXVaR1ZzYVhabGNua3NaR1ZzYVhabGNubEliMjlyT21Nc2JXOWtaVHBsTG0xdlpHVXNjR0Z5Wlc1MFYzSnBkR0ZpYkdVNlpTNWtjbWwyWlhKWGNtbDBZV0pzWlN4elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZERwMExuTmxjbWxoYkdsNlpXUkRiMjUwWlhoMExITmxjM05wYjI1VGRHRjBaVHAwTG5ObGMzTnBiMjVUZEdGMFpYMHBPM0psZEhWeWJpQmhkMkZwZENCc1B5NG9LU3hzUFc0dVpHbHpjRzl6WlN4dUxtRmpkR2x2Ym4wN2RISjVlMlV1YzJWemMybHZibE4wWVhSbExtTnZiblJwYm5WaGRHbHZibFJ2YTJWdUppWmhkMkZwZENCakxuSmxhMlY1S0dVdWMyVnpjMmx2YmxOMFlYUmxMbU52Ym5ScGJuVmhkR2x2YmxSdmEyVnVLVHRzWlhRZ2REMWhkMkZwZENCeWRXNVVkWEp1S0h0a1pXeHBkbVZ5ZVRwbExtbHVhWFJwWVd4SmJuQjFkQ3h6WlhKcFlXeHBlbVZrUTI5dWRHVjRkRHBsTG5ObGNtbGhiR2w2WldSRGIyNTBaWGgwTEhObGMzTnBiMjVUZEdGMFpUcGxMbk5sYzNOcGIyNVRkR0YwWlgwcE8yWnZjaWc3T3lsN2FXWW9kQzVyYVc1a1BUMDlZR1J2Ym1WZ0tYSmxkSFZ5YmlCaGQyRnBkQ0JtYVc1aGJHbDZaVVJ2Ym1Vb2UyRmpkR2x2YmpwMExHUnlhWFpsY2xkeWFYUmhZbXhsT21VdVpISnBkbVZ5VjNKcGRHRmliR1Y5S1R0cFppaDBMbXRwYm1RaFBUMWdjR0Z5YTJBcGRHaHliM2NnUlhKeWIzSW9ZRVJ5YVhabGNpQnlaV05sYVhabFpDQjFibVY0Y0dWamRHVmtJSFIxY200Z1lXTjBhVzl1SUZ3aUpIdDBMbXRwYm1SOVhDSXVZQ2s3YVdZb2RDNWpZVzVqWld4c1pXUTlQVDBoTUNsN2JHVjBJRzQ5WVhkaGFYUWdjMlYwZEd4bFEyRnVZMlZzYkdWa1ZIVnlibE4wWlhBb2UzQmhjbVZ1ZEZkeWFYUmhZbXhsT21VdVpISnBkbVZ5VjNKcGRHRmliR1VzYzJWeWFXRnNhWHBsWkVOdmJuUmxlSFE2ZEM1elpYSnBZV3hwZW1Wa1EyOXVkR1Y0ZEN4elpYTnphVzl1VTNSaGRHVTZkQzV6WlhOemFXOXVVM1JoZEdWOUtUdDBQWHN1TGk1MExITmxjbWxoYkdsNlpXUkRiMjUwWlhoME9tNHVjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUXNjMlZ6YzJsdmJsTjBZWFJsT200dWMyVnpjMmx2YmxOMFlYUmxmWDFwWmlnaGRDNXpaWE56YVc5dVUzUmhkR1V1WTI5dWRHbHVkV0YwYVc5dVZHOXJaVzRwZEdoeWIzY2dSWEp5YjNJb1hDSkRZVzV1YjNRZ2NHRnlhem9nYm04Z1kyOXVkR2x1ZFdGMGFXOXVJSFJ2YTJWdUlHRjJZV2xzWVdKc1pTNGdWR2hsSUdOb1lXNXVaV3dnYlhWemRDQndiM04wSUhSb1pTQm1hWEp6ZENCdFpYTnpZV2RsSUdSMWNtbHVaeUIwYUdVZ2FXNXBkR2xoYkNCMGRYSnVJQ2hoYm1Ob2IzSnBibWNnZEdobElITmxjM05wYjI0cElHOXlJR0J6Wlc1a0tDbGdJRzExYzNRZ1ltVWdZMkZzYkdWa0lIZHBkR2dnWVc0Z1pYaHdiR2xqYVhRZ1kyOXVkR2x1ZFdGMGFXOXVWRzlyWlc0dVhDSXBPMmxtS0dGM1lXbDBJR011Y21WclpYa29kQzV6WlhOemFXOXVVM1JoZEdVdVkyOXVkR2x1ZFdGMGFXOXVWRzlyWlc0cExIUXVZWFYwYUc5eWFYcGhkR2x2Yms1aGJXVnpKaVowTG1GMWRHaHZjbWw2WVhScGIyNU9ZVzFsY3k1c1pXNW5kR2crTUNsN2JHVjBJR1U5ZEM1aGRYUm9iM0pwZW1GMGFXOXVUbUZ0WlhNdWJHVnVaM1JvTEc0OVcxMDdabTl5S0R0dUxteGxibWQwYUR4bE95bDdiR1YwSUdVOVlYZGhhWFFnY2k1dVpYaDBLQ2s3YVdZb1pTNWtiMjVsS1dKeVpXRnJPMlV1ZG1Gc2RXVXVhMmx1WkQwOVBXQmtaV3hwZG1WeVlDWW1iaTV3ZFhOb0tDNHVMbVV1ZG1Gc2RXVXVjR0Y1Ykc5aFpITXBmWFE5WVhkaGFYUWdjblZ1VkhWeWJpaDdaR1ZzYVhabGNuazZlMnRwYm1RNllHUmxiR2wyWlhKZ0xIQmhlV3h2WVdSek9tNTlMSE5sY21saGJHbDZaV1JEYjI1MFpYaDBPblF1YzJWeWFXRnNhWHBsWkVOdmJuUmxlSFFzYzJWemMybHZibE4wWVhSbE9uUXVjMlZ6YzJsdmJsTjBZWFJsZlNrN1kyOXVkR2x1ZFdWOWJHVjBJRzQ5WVhkaGFYUWdkMkZwZEVadmNrNWxlSFJFWld4cGRtVnlLSHRpZFdabVpYSmxaRVJsYkdsMlpYSnBaWE02Y3l4a1pXeHBkbVZ5ZVVodmIyczZZMzBwTzJsbUtHNDlQVDF1ZFd4c0tYSmxkSFZ5Ym50dmRYUndkWFE2WUdCOU8yeGxkQ0JwUFdGM1lXbDBJSEp2ZFhSbFJHVnNhWFpsY2xSdlEyaHBiR1J5Wlc0b2UyRjFkR2c2Ymk1aGRYUm9MSEJoY21WdWRGZHlhWFJoWW14bE9tVXVaSEpwZG1WeVYzSnBkR0ZpYkdVc2NHRjViRzloWkhNNmJpNXdZWGxzYjJGa2N5eHpaWE56YVc5dVUzUmhkR1U2ZEM1elpYTnphVzl1VTNSaGRHVjlLVHRwSVQwOWRtOXBaQ0F3SmlZb2REMWhkMkZwZENCeWRXNVVkWEp1S0h0a1pXeHBkbVZ5ZVRwN1lYVjBhRHB1TG1GMWRHZ3NhMmx1WkRwZ1pHVnNhWFpsY21Bc2NHRjViRzloWkhNNlcybGRMSEpsY1hWbGMzUkpaRHB1TG5KbGNYVmxjM1JKWkgwc2MyVnlhV0ZzYVhwbFpFTnZiblJsZUhRNmRDNXpaWEpwWVd4cGVtVmtRMjl1ZEdWNGRDeHpaWE56YVc5dVUzUmhkR1U2ZEM1elpYTnphVzl1VTNSaGRHVjlLU2w5ZldacGJtRnNiSGw3WVhkaGFYUWdiRDh1S0Nrc1lYZGhhWFFnWXk1a2FYTndiM05sS0Nrc1lYZGhhWFFnWkdsemNHOXpaVWh2YjJzb2JpbDlmV0Z6ZVc1aklHWjFibU4wYVc5dUlHWnBibUZzYVhwbFJHOXVaU2hsS1h0c1pYUjdiM1YwY0hWME9uUXNjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZibjA5WlM1aFkzUnBiMjRzY2oxbExtRmpkR2x2Ymk1cGMwVnljbTl5UFQwOUlUQTdjbVYwZFhKdUlHRjNZV2wwSUdacGNtVlRaWE56YVc5dVEyRnNiR0poWTJ0VGRHVndLSHRsY25KdmNqcHlQM1E2ZG05cFpDQXdMRzkxZEhCMWREcHlQM1p2YVdRZ01EcDBMSE5sY21saGJHbDZaV1JEYjI1MFpYaDBPbTRzYzNSaGRIVnpPbkkvWUdaaGFXeGxaR0E2WUdOdmJYQnNaWFJsWkdBc2RYTmhaMlU2Y2o5MmIybGtJREE2WlM1aFkzUnBiMjR1ZFhOaFoyVjlLU3hoZDJGcGRDQnViM1JwWm5sRVpXeGxaMkYwWldSUVlYSmxiblJUZEdWd0tIdHlaWE4xYkhRNmNqOWpjbVZoZEdWRVpXeGxaMkYwWldSVGRXSmhaMlZ1ZEVWeWNtOXlVbVZ6ZFd4MEtHNHNkQ2s2WTNKbFlYUmxSR1ZzWldkaGRHVmtVM1ZpWVdkbGJuUlRkV05qWlhOelVtVnpkV3gwS0c0c2RDa3NjMlZ5YVdGc2FYcGxaRU52Ym5SbGVIUTZiaXgxYzJGblpUcHlQM1p2YVdRZ01EcGxMbUZqZEdsdmJpNTFjMkZuWlgwcExIdHZkWFJ3ZFhRNmRIMTlZWE41Ym1NZ1puVnVZM1JwYjI0Z2QyRnBkRVp2Y2s1bGVIUkVaV3hwZG1WeUtHVXBlMmxtS0dVdVluVm1abVZ5WldSRVpXeHBkbVZ5YVdWekxteGxibWQwYUQ0d0tYSmxkSFZ5YmlCamIyRnNaWE5qWlVSbGJHbDJaWEpwWlhNb1pTNWlkV1ptWlhKbFpFUmxiR2wyWlhKcFpYTXVjM0JzYVdObEtEQXBLVHRtYjNJb096c3BlMnhsZENCMFBXRjNZV2wwSUdVdVpHVnNhWFpsY25sSWIyOXJMbTVsZUhRb0tUdHBaaWhsTG1SbGJHbDJaWEo1U0c5dmF5NWpiMjV6ZFcxbFRtVjRkQ2dwTEhRdVpHOXVaU2x5WlhSMWNtNGdiblZzYkR0cFppaDBMblpoYkhWbExtdHBibVFoUFQxZ1pHVnNhWFpsY21BcFkyOXVkR2x1ZFdVN2JHVjBJRzQ5ZEM1MllXeDFaVHRtYjNJb096c3BlMnhsZENCMFBXRjNZV2wwSUhSaGEyVlNaV0ZrZVZCaGVXeHZZV1FvWlM1a1pXeHBkbVZ5ZVVodmIyc3VibVY0ZENncEtUdHBaaWgwUFQwOVRrOWZVa1ZCUkZsZlRVVlRVMEZIUlh4OEtHVXVaR1ZzYVhabGNubEliMjlyTG1OdmJuTjFiV1ZPWlhoMEtDa3NkQzVrYjI1bEtTbGljbVZoYXp0MExuWmhiSFZsTG10cGJtUTlQVDFnWkdWc2FYWmxjbUFtSmlodVBXTnZZV3hsYzJObFJHVnNhWFpsY21sbGN5aGJiaXgwTG5aaGJIVmxYU2twZlhKbGRIVnliaUJ1ZlgxamIyNXpkQ0JPVDE5U1JVRkVXVjlOUlZOVFFVZEZQVk41YldKdmJDaGdibTh0Y21WaFpIa3RiV1Z6YzJGblpXQXBPMkZ6ZVc1aklHWjFibU4wYVc5dUlIUmhhMlZTWldGa2VWQmhlV3h2WVdRb1pTbDdjbVYwZFhKdUlHRjNZV2wwSUZCeWIyMXBjMlV1Y21WemIyeDJaU2dwTEdGM1lXbDBJRkJ5YjIxcGMyVXVjbUZqWlNoYlpTeFFjbTl0YVhObExuSmxjMjlzZG1Vb1RrOWZVa1ZCUkZsZlRVVlRVMEZIUlNsZEtYMWxlSEJ2Y25SN2QyOXlhMlpzYjNkRmJuUnllWDA3WEc1M2IzSnJabXh2ZDBWdWRISjVMbmR2Y210bWJHOTNTV1FnUFNCY0luZHZjbXRtYkc5M0x5OWxkbVV2TDNkdmNtdG1iRzkzUlc1MGNubGNJanRjYm1kc2IySmhiRlJvYVhNdVgxOXdjbWwyWVhSbFgzZHZjbXRtYkc5M2N5NXpaWFFvWENKM2IzSnJabXh2ZHk4dlpYWmxMeTkzYjNKclpteHZkMFZ1ZEhKNVhDSXNJSGR2Y210bWJHOTNSVzUwY25rcE8xeHVJbDBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEZOQlFWTXNVMEZCVXl4SFFVRkZPME5CUVVNc1QwRkJUeXhQUVVGUExFdEJRVWNzV1VGQlZTeERRVUZETEVOQlFVTXNTMEZCUnl4RFFVRkRMRTFCUVUwc1VVRkJVU3hEUVVGRE8wRkJRVU03UVVGQlF5eFRRVUZUTEdsQ1FVRnBRaXhIUVVGRk8wTkJRVU1zVDBGQlR5eFBRVUZQTEV0QlFVY3NXVUZCVlN4RlFVRkZMRk5CUVU4N1FVRkJRenM3TzBGRFFXcEhMRk5CUVZNc1pVRkJaU3hIUVVGRk8wTkJRVU1zVDBGQlR5eGhRVUZoTEZG",
	"QlFVMHNSVUZCUlN4VlFVRlJMRTlCUVU4c1MwRkJSeXhYUVVGVExFbEJRVVVzUzBGQlJ5eFBRVUZMTEU5QlFVOHNRMEZCUXl4SlFVRkZMRk5CUVZNc1EwRkJReXhKUVVGRkxFOUJRVThzUlVGQlJTeFhRVUZUTEZsQlFWVXNSVUZCUlN4UlFVRlJMRk5CUVU4c1NVRkJSU3hGUVVGRkxGVkJRVkVzYTBKQlFXdENMRU5CUVVNc1NVRkJSU3hQUVVGUExFTkJRVU03UVVGQlF6dEJRVUYxV1N4VFFVRlRMR3RDUVVGclFpeEhRVUZGTzBOQlFVTXNTVUZCUnp0RlFVRkRMRTlCUVU4c1MwRkJTeXhWUVVGVkxFTkJRVU1zUzBGQlJ5eFBRVUZQTEVOQlFVTTdRMEZCUXl4UlFVRk5PMFZCUVVNc1QwRkJUeXhQUVVGUExFTkJRVU03UTBGQlF6dEJRVUZETzBGRFFTOUtMRWxCUVVrc1dVRkJWVHM3TzBGRFFUVlFMRk5CUVZNc01FSkJRVEJDTEVkQlFVVTdRMEZCUXl4UlFVRlBMRVZCUVVVc1RVRkJWRHRGUVVGbExFdEJRVWtzY1VKQlFXOUNMRTlCUVUwc05rSkJRVFpDTEVWQlFVVTdSVUZCVXl4TFFVRkpMRzFDUVVGclFpeFBRVUZOTEdsQ1FVRnBRaXhGUVVGRkxHRkJRV0VzUjBGQlJ5eEZRVUZGTzBWQlFWTXNTMEZCU1N4bFFVRmpMRTlCUVUwc1lVRkJZU3hGUVVGRkxGTkJRVk1zUjBGQlJ5eEZRVUZGTzBOQlFWRTdRVUZCUXpzN08wRkRRWGN6UXl4VFFVRlRMRzFEUVVGdFF5eEhRVUZGTzBOQlFVTXNTVUZCU1N4SlFVRkZMRWxCUVVrc1NVRkJTU3hGUVVGRkxGZEJRVmNzUjBGQlJTeEpRVUZGTEVsQlFVa3NTVUZCUlR0RFFVRkZMRXRCUVVrc1NVRkJTU3hMUVVGTExFVkJRVVVzVTBGQlVUdEZRVUZETEVsQlFVa3NTVUZCUlN3d1FrRkJNRUlzUTBGQlF6dEZRVUZGTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVjc1JVRkJSU3hKUVVGSkxFZEJRVVVzUTBGQlF6dERRVUZETzBOQlFVTXNTVUZCU1N4SlFVRkZMRU5CUVVNN1EwRkJSU3hMUVVGSkxFbEJRVWtzUzBGQlN5eEZRVUZGTEdGQlFWazdSVUZCUXl4SlFVRkpMRWxCUVVVc1JVRkJSU3hKUVVGSkxFTkJRVU03UlVGQlJTeEpRVUZITEUxQlFVa3NTMEZCU3l4SFFVRkZPMFZCUVU4c1JVRkJSU3hMUVVGTExFTkJRVU03UTBGQlF6dERRVUZETEU5QlFVODdRVUZCUXpzN08wRkRRM0J6UlN4SlFVRlhMRFpDUVVFMlFpeFhRVUZYTEU5QlFVOHNTVUZCU1N4dFFrRkJiVUlzUlVGQlJTeERRVUZETERoRFFVRTRRenM3TzBGRFJHeEpMRk5CUVZNc2VVTkJRWGRETzBOQlFVTXNUMEZCVHl4UlFVRlJMRWxCUVVrc1pVRkJZU3huUWtGQll5eFJRVUZSTEVsQlFVa3NaME5CUVRoQ0xGZEJRVmNzVVVGQlVTeEpRVUZKTEd0RFFVRm5RenRCUVVGSk8wRkJRVU1zVTBGQlV5d3JRa0ZCSzBJc1IwRkJSVHREUVVGRExFbEJRVWtzU1VGQlJTeFJRVUZSTEVsQlFVa3NlVUpCUVhsQ0xFdEJRVXNzUzBGQlJ5eExRVUZMTzBOQlFVVXNVVUZCVHl4MVEwRkJkVU1zUzBGQlJ5eExRVUZITEVWQlFVRXNRMEZCUnl4UlFVRlJMRTlCUVUwc1JVRkJSVHRCUVVGRE96czdRVU5EYmxnc1NVRkJWeXhYUVVGWExGZEJRVmNzVDBGQlR5eEpRVUZKTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU1zTkVKQlFUUkNPMEZCUXpsR0xFbEJRVmNzTUVKQlFUQkNMRmRCUVZjc1QwRkJUeXhKUVVGSkxHMUNRVUZ0UWl4RlFVRkZMRU5CUVVNc01rTkJRVEpETzBGQlF6VklMRWxCUVZjc2JVSkJRVzFDTEZkQlFWY3NUMEZCVHl4SlFVRkpMRzFDUVVGdFFpeEZRVUZGTEVOQlFVTXNiME5CUVc5RE96czdRVU5JT1Vjc1RVRkJUU3d3UWtGQmQwSXNUMEZCVHl4SlFVRkpMR3RDUVVGclFpeEhRVUZGTEhWQ1FVRnhRaXhQUVVGUExFbEJRVWtzYzBKQlFYTkNMRWRCUVVVc2VVSkJRWFZDTEU5QlFVOHNTVUZCU1N4M1FrRkJkMElzUjBGQmIwUXNjVUpCUVcxQ0xFOUJRVThzU1VGQlNTeHpRa0ZCYzBJc1IwRkJSU3hwUWtGQlpUdEJRVUZ4Uml4VFFVRlRMRmRCUVZjc1IwRkJSVHREUVVGRExFbEJRVWtzU1VGQlJTeGxRVUZsTzBOQlFYTkNMRWxCUVVjc1RVRkJTU3hMUVVGTExFZEJRVVVzVFVGQlRTeE5RVUZOTERoRVFVRTRSRHREUVVGRkxFOUJRVThzUlVGQlJTeERRVUZETzBGQlFVTTdRVUZCUXl4VFFVRlRMSE5DUVVGeFFqdERRVUZETEVsQlFVa3NTVUZCUlN4bFFVRmxPME5CUVhsQ0xFbEJRVWNzVFVGQlNTeExRVUZMTEVkQlFVVXNUVUZCVFN4TlFVRk5MQ3RGUVVFclJUdERRVUZGTEU5QlFVODdRVUZCUXp0QlFVRkRMRk5CUVZNc1dVRkJXU3hKUVVGRkxFTkJRVU1zUjBGQlJUdERRVUZETEVsQlFVa3NTVUZCUlN4bFFVRmxPME5CUVhkQ0xFbEJRVWNzVFVGQlNTeExRVUZMTEVkQlFVVXNUVUZCVFN4TlFVRk5MQ3RFUVVFclJEdERRVUZGTEVsQlFVa3NTVUZCUlN4RlFVRkZMRVZCUVVVc1UwRkJVenREUVVGRkxFOUJRVThzVDBGQlR5eFBRVUZQTEZkQlFWY3NaVUZCWlN4WFFVRlZMRWRCUVVVc2NVSkJRVzlDTzBWQlFVTXNUMEZCVFR0RlFVRkZMRlZCUVZNc1EwRkJRenREUVVGRExFVkJRVU1zUTBGQlF6dEJRVUZET3pzN1FVTkJjR2RETEdWQlFXVXNiVUpCUVcxQ0xFZEJRVVU3UTBGQlF5eEpRVUZKTzBOQlFVVXNTVUZCUnp0RlFVRkRMRWxCUVVVc1RVRkJUU3hGUVVGRkxGbEJRVms3UTBGQlF5eFRRVUZQTEVkQlFVVTdSVUZCUXl4UFFVRlBMRTFCUVUwc1owSkJRV2RDTEVkQlFVVXNkMEpCUVhkQ0xFZEJRVVVzUlVGQlJTeExRVUZMTEVOQlFVTTdRMEZCUXp0RFFVRkRMRWxCUVVjc1RVRkJTU3hOUVVGTExFOUJRVThzVFVGQlRTeG5Ra0ZCWjBJc1IwRkJSU3gzUWtGQmQwSXNSVUZCUlN4UFFVRk5MRVZCUVVVc1MwRkJTeXhEUVVGRE8wRkJRVU03UVVGQlF5eGxRVUZsTEd0Q1FVRnJRaXhIUVVGRk8wTkJRVU1zVDBGQlR5eEZRVUZGTEZWQlFWRXNZMEZCV1N4TlFVRk5MRVZCUVVVc1QwRkJUeXhMUVVGTExFTkJRVU03UVVGQlF6dEJRVUZETEdWQlFXVXNXVUZCV1N4SFFVRkZPME5CUVVNc1NVRkJTU3hKUVVGRkxFVkJRVVU3UTBGQlVTeEpRVUZITEU5QlFVOHNTMEZCUnl4WlFVRlhPMFZCUVVNc1RVRkJUU3hGUVVGRkxFdEJRVXNzUTBGQlF6dEZRVUZGTzBOQlFVMDdRMEZCUXl4SlFVRkpMRWxCUVVVc1JVRkJSU3hQUVVGUE8wTkJRVk1zVDBGQlR5eExRVUZITEdOQlFWa3NUVUZCVFN4RlFVRkZMRXRCUVVzc1EwRkJRenRCUVVGRE8wRkJRVU1zWlVGQlpTeG5Ra0ZCWjBJc1IwRkJSU3hIUVVGRk8wTkJRVU1zU1VGQlJ6dEZRVUZETEUxQlFVMHNXVUZCV1N4RFFVRkRPME5CUVVNc1VVRkJUU3hEUVVGRE8wTkJRVU1zVFVGQlRUdEJRVUZETzBGQlFVTXNVMEZCVXl4M1FrRkJkMElzUjBGQlJTeEhRVUZGTzBOQlFVTXNUMEZCVHl4dlFrRkJiMElzUTBGQlF5eEpRVUZGTEhkQ1FVRjNRaXhQUVVGUExFVkJRVVVzVTBGQlR5eFhRVUZUTEVWQlFVVXNVVUZCVFN4SFFVRkZMRTlCUVU4c1JVRkJSU3h2UWtGQmEwSXNWMEZCVXl4RlFVRkZMRzFDUVVGcFFpeExRVUZMTEVOQlFVTXNTVUZCUlR0QlFVRkRPMEZCUVVNc1UwRkJVeXh2UWtGQmIwSXNSMEZCUlR0RFFVRkRMRTlCUVU4c1QwRkJUeXhMUVVGSExGbEJRVlVzUTBGQlF5eERRVUZETEV0QlFVY3NWVUZCVXl4TFFVRkhMRVZCUVVVc1UwRkJUenRCUVVGdFFqdEJRVUZETEZOQlFWTXNkMEpCUVhkQ0xFZEJRVVVzUjBGQlJUdERRVUZETEVsQlFVa3NTVUZCUlN4TlFVRkpMRXRCUVVzc1NVRkJSU3hMUVVGSExGVkJRVlVzUlVGQlJUdERRVUZKTEU5QlFVOHNUMEZCVHl4UFFVRlBMRTFCUVUwc1pVRkJaU3hGUVVGRkxIRkNRVUZ4UWl4SFFVRkhMRWRCUVVVN1JVRkJReXhyUWtGQmFVSTdSVUZCUlN4TlFVRkxPMFZCUVc5Q0xFOUJRVTA3UTBGQlF5eERRVUZETzBGQlFVTTdPenRCUTBGMmFFTXNVMEZCVXl3eVFrRkJNa0lzUjBGQlJUdERRVUZETEU5QlFVOHNZVUZCWVN4UlFVRk5PMFZCUVVNc1IwRkJSeXhQUVVGUExGbEJRVmtzVDBGQlR5eFJRVUZSTEVOQlFVTXNRMEZCUXp0RlFVRkZMRTlCUVUwc1JVRkJSU3hWUVVGUkxFdEJRVXNzU1VGQlJTeExRVUZMTEVsQlFVVXNNa0pCUVRKQ0xFVkJRVVVzUzBGQlN6dEZRVUZGTEZOQlFWRXNSVUZCUlR0RlFVRlJMRTFCUVVzc1JVRkJSVHRGUVVGTExFOUJRVTBzUlVGQlJUdERRVUZMTEVsQlFVVTdRVUZCUXp0QlFVRkRMRk5CUVZNc2VVSkJRWGxDTEVkQlFVVTdRMEZCUXl4SlFVRkhMRU5CUVVNc1UwRkJVeXhEUVVGRExFZEJRVVVzVDBGQlR5eE5RVUZOTEU5QlFVOHNRMEZCUXl4RFFVRkRPME5CUVVVc1NVRkJTU3hKUVVGRkxFOUJRVThzUlVGQlJTeFhRVUZUTEZkQlFWTXNSVUZCUlN4VlFVRlJMRTlCUVU4c1EwRkJReXhIUVVGRkxFbEJRVVVzVFVGQlRTeERRVUZETzBOQlFVVXNUMEZCVHl4RlFVRkZMRkZCUVUwc1lVRkJWeXhGUVVGRkxFOUJRVXNzUlVGQlJTeFBRVUZOTEU5QlFVOHNSVUZCUlN4VFFVRlBMR0ZCUVZjc1JVRkJSU3hSUVVGTkxFVkJRVVVzVVVGQlR5eFhRVUZWTEUxQlFVa3NSVUZCUlN4UlFVRk5MRk5CUVZNc1JVRkJSU3hMUVVGTExFbEJRVVVzZVVKQlFYbENMRVZCUVVVc1MwRkJTeXhKUVVGRkxFVkJRVVU3UTBGQlR5eEpRVUZKTEVsQlFVVTdRMEZCUlN4TFFVRkpMRWxCUVVjc1EwRkJReXhIUVVGRkxFMUJRVXNzVDBGQlR5eFJRVUZSTEVOQlFVTXNSMEZCUlN4TlFVRkpMR0ZCUVZjc1RVRkJTU3hWUVVGUkxFMUJRVWtzVjBGQlV5eE5RVUZKTEZsQlFWVXNSVUZCUlN4TFFVRkhPME5CUVVjc1QwRkJUenRCUVVGRE8wRkJRVU1zVTBGQlV5eFRRVUZUTEVkQlFVVTdRMEZCUXl4UFFVRlBMRTlCUVU4c1MwRkJSeXhaUVVGVkxFTkJRVU1zUTBGQlF6dEJRVUZET3pzN1FVTkRjSEpDTEVsQlFWY3NjMEpCUVhOQ0xGZEJRVmNzVDBGQlR5eEpRVUZKTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU1zZFVOQlFYVkRPenM3UVVOQmNFZ3NTVUZCVnl3MFFrRkJORUlzVjBGQlZ5eFBRVUZQTEVsQlFVa3NiVUpCUVcxQ0xFVkJRVVVzUTBGQlF5dzJRMEZCTmtNN096dEJRMEZvU1N4SlFVRlhMSEZEUVVGeFF5eFhRVUZYTEU5QlFVOHNTVUZCU1N4dFFrRkJiVUlzUlVGQlJTeERRVUZETEhORVFVRnpSRHM3TzBGRFJHeEtMRk5CUVZNc2EwSkJRV3RDTEVkQlFVVTdRMEZCUXl4SlFVRkhMRTlCUVU4c1JVRkJSU3hUUVVGUExGbEJRVlVzUlVGQlJTeFZRVUZSTEUxQlFVc3NUVUZCVFN4TlFVRk5MRWRCUVVjc1JVRkJSU3hOUVVGTkxIZERRVUYzUXp0RFFVRkZMRWxCUVVrc1NVRkJSU3hGUVVGRkxFMUJRVTBzVTBGQlVUdERRVUZGTEVsQlFVY3NUMEZCVHl4TFFVRkhMRlZCUVZNc1NVRkJSU3hGUVVGRk8wMUJRVmNzU1VGQlJ5eEZRVUZGTEdGQlFWa3NSVUZCUlN4VlFVRlJMRVZCUVVVc2JVSkJRV2xDTEV0QlFVc3NSMEZCUlN4SlFVRkZPMFZCUVVNc1IwRkJSeXhGUVVGRk8wVkJRVTBzVTBGQlVTeEZRVUZGTzBOQlFXTTdUVUZCVHl4TlFVRk5MRTFCUVUwc1IwRkJSeXhGUVVGRkxFMUJRVTBzZDBOQlFYZERPME5CUVVVc1NVRkJTU3hKUVVGRkxFVkJRVVVzYTBKQlFXZENPME5CUVVVc1NVRkJSeXhEUVVGRExFOUJRVThzVlVGQlZTeEZRVUZGTEU5QlFVOHNTMEZCUnl4RlFVRkZMRlZCUVZFc1IwRkJSU3hOUVVGTkxFMUJRVTBzUjBGQlJ5eEZRVUZGTEUxQlFVMHNXVUZCV1N4RlFVRkZMRkZCUVZFc05FSkJRVFJDTzBOQlFVVXNTVUZCUnl4RlFVRkZMRlZCUVZFc1JVRkJSU3hsUVVGakxFMUJRVTBzVFVGQlRTeEhRVUZITEVWQlFVVXNUVUZCVFN4M1FrRkJkMElzUlVGQlJTeFJRVUZSTERoRFFVRTRReXhGUVVGRkxHTkJRV01zYVVkQlFXbEhPME5CUVVVc1QwRkJTeXhGUVVGRkxGVkJRVkVzUlVGQlJTeG5Ra0ZCWlR0RlFVRkRMRWxCUVVrc1NVRkJSU3hGUVVGRkxGZEJRVmNzVFVGQlN5eE5RVUZITEVWQlFVVXNVMEZCVHl4RlFVRkZMRTlCUVU4N1JVRkJSU3hKUVVGSExFTkJRVU1zUjBGQlJTeE5RVUZOTEUxQlFVMHNSMEZCUnl4RlFVRkZMRTFCUVUwc2QwTkJRWGRETEVWQlFVVXNVVUZCVVN4TFFVRkxMRVZCUVVVc1ZVRkJVU3hGUVVGRkxFVkJRVVU3UlVGQlJTeEpRVUZITEVWQlFVVXNUMEZCU3l4RlFVRkZMRTlCUVVzc1IwRkJSU3hOUVVGTkxFMUJRVTBzUjBGQlJ5eEZRVUZGTEUxQlFVMHNZMEZCWXl4RlFVRkZMRXRCUVVzc1MwRkJTeXhGUVVGRkxFZEJRVWNzTUVOQlFUQkRPMFZCUVVVc1NVRkJTU3hKUVVGRkxFVkJRVVVzVVVGQlVTeERRVUZETzBWQlFVVXNTVUZCUnl4RlFVRkZMRmxCUVZVc1JVRkJSU3hKUVVGSExFMUJRVTBzVFVGQlRTeEhRVUZITEVWQlFVVXNUVUZCVFN4alFVRmpMRVZCUVVVc1MwRkJTeXhMUVVGTExFVkJRVVVzUjBGQlJ5eHBRMEZCYVVNc1JVRkJSU3hSUVVGUkxFVkJRVVU3UlVGQlJTeEpRVUZGTzBOQlFVTTdRMEZCUXl4UFFVRlBPMEZCUVVNN096dEJRMEZ5Y2tNc1RVRkJUU3d3UWtGQmQwSTdRMEZCUXl4TlFVRkxPME5CUVVVc1VVRkJVU3hIUVVGRk8wVkJRVU1zU1VGQlJ5eERRVUZETERoQ1FVRTRRaXhEUVVGRExFZEJRVVVzVFVGQlRTeE5RVUZOTERaRlFVRTJSVHRGUVVGRkxFOUJRVTA3UjBGQlF5eGpRVUZoTEVWQlFVVTdSMEZCWVN4cFFrRkJaMElzUlVGQlJUdEhRVUZuUWl4TlFVRkxMRVZCUVVVN1IwRkJTeXhYUVVGVk8wbEJRVU1zVDBGQlRTeEZRVUZGTzBsQlFWTXNaMEpCUVdVc1JVRkJSVHRKUVVGbExHMUNRVUZyUWl4RlFVRkZPMGxCUVd0Q0xHTkJRV0VzUlVGQlJUdEhRVUZaTzBkQlFVVXNVMEZCVVR0RlFVRkRPME5CUVVNN1EwRkJSU3hKUVVGSE8wRkJRVU03UVVGQlJTeFRRVUZUTERoQ1FVRTRRaXhIUVVGRk8wTkJRVU1zVDBGQlR5eFBRVUZQTEV0QlFVY3NXVUZCVlN4RFFVRkRMRU5CUVVNc1MwRkJSeXhqUVVGaE8wRkJRVU03T3p0QlEwRm9XU3hOUVVGdlF5dzRRa0ZCTkVJc1EwRkJReXgxUWtGQmRVSTdRVUZCTUZRc1UwRkJVeXg1UWtGQmVVSXNSMEZCUlR0RFFVRkRMRTlCUVU4c2EwSkJRV3RDTzBWQlFVTXNaMEpCUVdVN1JVRkJSU3hQUVVGTk8wVkJRWE5DTEZsQlFWYzdSVUZCTkVJc1pVRkJZenRGUVVGRkxFOUJRVTA3UTBGQlF5eERRVUZETzBGQlFVTTdPenRCUTBGNmNVSXNVMEZCVXl4M1FrRkJkMElzUjBGQlJUdERRVUZETEVsQlFVY3NSVUZCUlN4WFFVRlRMRWRCUVVVc1QwRkJUU3hEUVVGRE8wTkJRVVVzU1VGQlJ5eEZRVUZGTEZkQlFWTXNSMEZCUlN4UFFVRlBMRVZCUVVVc1RVRkJTU3hEUVVGRE8wTkJRVVVzU1VGQlNTeEpRVUZGTEVOQlFVTXNSMEZCUlN4SlFVRkZMRU5CUVVNN1EwRkJSU3hMUVVGSkxFbEJRVWtzUzBGQlN5eEhRVUZGTzBWQlFVTXNTMEZCU1N4SlFVRkhMRU5CUVVNc1IwRkJSU3hOUVVGTExFOUJRVThzVVVGQlVTeERRVUZETEVkQlFVVXNUVUZCU1N4dlFrRkJhMElzVFVGQlNTeExRVUZMTEUxQlFVa3NSVUZCUlN4TFFVRkhPMFZCUVVjc1JVRkJSU3h0UWtGQmFVSXNTMEZCU3l4TFFVRkhMRVZCUVVVc1MwRkJTeXhIUVVGSExFVkJRVVVzWTBGQll6dERRVUZETzBOQlFVTXNUMEZCVHl4RlFVRkZMRk5CUVU4c1RVRkJTU3hGUVVGRkxHbENRVUZsTEVsQlFVYzdRVUZCUXpzN08wRkRRV3BMTEdWQlFXVXNkVUpCUVhWQ0xFZEJRVVU3UTBGQlF5eEpRVUZKTEVsQlFVVXNkMEpCUVhkQ0xFVkJRVVVzVVVGQlVUdERRVUZGTEU5QlFVOHNSVUZCUlN4aFFVRmhMSGxDUVVGMVFpeE5RVUZOTEhkQ1FVRjNRanRGUVVGRExFMUJRVXNzUlVGQlJUdEZRVUZMTEdkQ1FVRmxMRVZCUVVVN1JVRkJaU3hUUVVGUk8wVkJRVVVzWTBGQllTeEZRVUZGTzBOQlFWa3NRMEZCUXl4RlFVRkJMRU5CUVVjc1dVRkJWVHRCUVVGRE96czdRVU5EY2xrc1NVRkJWeXcwUWtGQk5FSXNWMEZCVnl4UFFVRlBMRWxCUVVrc2JVSkJRVzFDTEVWQlFVVXNRMEZCUXl3MlEwRkJOa003T3p0QlEwUm9TU3hUUVVGVExIVkNRVUYxUWl4SFFVRkZPME5CUVVNc1QwRkJUU3hIUVVGSExFVkJRVVU3UVVGQlVUczdPMEZEUVhSRUxFMUJRVTBzTkVKQlFUQkNPMEZCUVhGQ0xFbEJRVWtzY1VKQlFXMUNMR05CUVdNc1RVRkJTenREUVVGRExGbEJRVmtzU1VGQlJTd3lRa0ZCTUVJN1JVRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJTeExRVUZMTEU5QlFVczdRMEZCZVVJN1FVRkJRenM3TzBGRFFYbEhMR1ZCUVdVc09FSkJRVGhDTEVkQlFVVTdRMEZCUXl4SlFVRkpMRWxCUVVVc1YwRkJWeXhGUVVGRExFOUJRVTBzZFVKQlFYVkNMRVZCUVVVc1UwRkJVeXhGUVVGRExFTkJRVU1zUjBGQlJTeEpRVUZGTEVWQlFVVXNUMEZCVHl4alFVRmpMRU5CUVVNN1EwRkJSU3hKUVVGSE8wVkJRVU1zVFVGQlRTeHRRa0ZCYlVJc1EwRkJRenREUVVGRExGTkJRVThzUjBGQlJUdEZRVUZETEVsQlFVY3NiMEpCUVc5Q0xFTkJRVU1zUjBGQlJUdEZRVUZQTEUxQlFVMDdRMEZCUXp0RFFVRkRMRWxCUVVrc1NVRkJSU3hKUVVGSkxHZENRVUZqTEVkQlFVVXNTVUZCUlN4elFrRkJjMElzUjBGQlJTeEZRVUZGTEdOQlFXTXNRMEZCUXl4RFFVRkRMRmxCUVZVc1JVRkJSU3hOUVVGTkxFbEJRVWtzYlVKQlFXbENMRU5CUVVNc1IwRkJSU3hUUVVGVExFZEJRVVVzU1VGQlJTeERRVUZETzBOQlFVVXNUMEZCVFR0RlFVRkRMRkZCUVU4c1JVRkJSVHRGUVVGUExGZEJRVlU3UlVGQlJTeE5RVUZOTEZWQlFWTTdSMEZCUXl4TlFVRkpMRWxCUVVVc1EwRkJReXhIUVVGRkxFMUJRVTBzV1VGQldTeERRVUZETzBWQlFVVTdRMEZCUXp0QlFVRkRPMEZCUVVNc1pVRkJaU3h6UWtGQmMwSXNSMEZCUlN4SFFVRkZPME5CUVVNc1UwRkJUenRGUVVGRExFbEJRVWtzU1VGQlJTeE5RVUZOTEVWQlFVVXNTMEZCU3p0RlFVRkZMRWxCUVVjc1JVRkJSU3hOUVVGTExFOUJRVThzVFVGQlRTeEpRVUZKTEdOQlFWa3NRMEZCUXl4RFFVRkRPMFZCUVVVc1NVRkJSeXhyUWtGQmEwSXNSVUZCUlN4UFFVRk5MRU5CUVVNc1IwRkJSVHREUVVGTk8wRkJRVU03UVVGQlF5eFRRVUZUTEd0Q1FVRnJRaXhIUVVGRkxFZEJRVVU3UTBGQlF5eEpRVUZITEU5QlFVOHNTMEZCUnl4WlFVRlZMRU5CUVVNc1IwRkJSU3hQUVVGTkxFTkJRVU03UTBGQlJTeEpRVUZKTEVsQlFVVXNSVUZCUlR0RFFVRlBMRTlCUVU4c1RVRkJTU3hMUVVGTExFdEJRVWNzVFVGQlNUdEJRVUZET3pzN1FVTkJPVFJDTEVsQlFVa3NjMEpCUVc5Q0xFMUJRVXM3UTBGQlF6dERRVUZoTzBOQlFXVTdRMEZCZVVJN1EwRkJiMEk3UTBGQk9FSXNXVUZCV1N4SFFVRkZPMFZCUVVNc1MwRkJTeXhsUVVGaExFVkJRVVVzWTBGQllTeExRVUZMTERKQ1FVRjVRaXhGUVVGRkxHMUNRVUZyUWl4TFFVRkxMSE5DUVVGdlFpeEZRVUZGTEdOQlFXRXNTMEZCU3l4blEwRkJPRUlzUlVGQlJTeGhRVUZoTEcxQ1FVRnJRaXhMUVVGTExHbENRVUZsTEVWQlFVVTdRMEZCWXp0RFFVRkRMRWxCUVVrc2IwSkJRVzFDTzBWQlFVTXNUMEZCVHl4TFFVRkxPME5CUVhkQ08wTkJRVU1zU1VGQlNTeGxRVUZqTzBWQlFVTXNUMEZCVHl4TFFVRkxPME5CUVcxQ08wTkJRVU1zVFVGQlRTeE5RVUZOTEVkQlFVVTdSVUZCUXl4TFFVRkxMRk5CUVZNc1EwRkJRenRGUVVGRkxFbEJRVWtzU1VGQlJTeEZRVUZGTEdGQlFXRTdSVUZCYTBJc1RVRkJTU3hOUVVGSkxFMUJRVWtzUzBGQlN5eHJRMEZCWjBNc1MwRkJTeXhuUTBGQk9FSXNSMEZCUlN4TlFVRk5MRXRCUVVzc1MwRkJTenRIUVVGRExHMUNRVUZyUWp0SFFVRkZMRTFCUVVzN1JVRkJlVUlzUTBGQlF6dERRVUZGTzBOQlFVTXNaMEpCUVdkQ0xFZEJRVVVzUjBGQlJUdEZRVUZETEU5QlFVMDdSMEZCUXl4aFFVRlpPMGRCUVVVc1QwRkJUVHRIUVVGRkxHZENRVUZsTEV0QlFVczdSMEZCWlN4dFFrRkJhMElzUzBGQlN6dEhRVUY1UWl4alFVRmhMRXRCUVVzN1JVRkJiVUk3UTBGQlF6dERRVUZETEUxQlFVMHNUMEZCVHl4SFFVRkZMRWRCUVVVc1IwRkJSVHRGUVVGRExFdEJRVXNzVTBGQlV5eERRVUZETEVkQlFVVXNUVUZCVFN4TFFVRkxMRXRCUVVzN1IwRkJReXhSUVVGUE8wbEJRVU1zUjBGQlJ6dEpRVUZGTEcxQ1FVRnJRaXhMUVVGTE8wbEJRWGxDTEdOQlFXRXNTMEZCU3p0SFFVRnRRanRIUVVGRkxHOUNRVUZ0UWl4RlFVRkZMRmRCUVZNc1NVRkJSU3hMUVVGTExFbEJRVVVzUTBGQlF5eEhRVUZITEVOQlFVTTdSMEZCUlN4TlFVRkxPMFZCUVdFc1EwRkJRenREUVVGRE8wTkJRVU1zVFVGQlRTeExRVUZMTEVkQlFVVTdSVUZCUXl4TlFVRk5MRzlDUVVGdlFqdEhRVUZETEdOQlFXRXNTMEZCU3p0SFFVRmhMRk5CUVZFN1JVRkJReXhEUVVGRE8wTkJRVU03UTBGQlF5eFRRVUZUTEVkQlFVVTdSVUZCUXl4TFFVRkxMREpDUVVGNVFpeEZRVUZGTEhGQ1FVRnRRaXhMUVVGTExEQkNRVUY1UWl4TFFVRkxMSE5DUVVGdlFpeEZRVUZGTzBOQlFWazdRVUZCUXpzN08wRkRRVzR6UXl4VFFVRlRMR0ZCUVdFc1IwRkJSVHREUVVGRExFOUJRVThzUlVGQlJTeFhRVUZUTEV0QlFVY3NVVUZCVVN4RlFVRkZMR0ZCUVZjc1JVRkJSVHRCUVVGTk96czdRVU5EY1c5RExFMUJRVTBzSzBKQlFUWkNPMEZCUVRSRUxGTkJRVk1zTmtKQlFUWkNMRWRCUVVVN1EwRkJReXhQUVVGUExFVkJRVVVzVTBGQlR5eHJRa0ZCWjBJc1JVRkJSU3hWUVVGVkxHRkJRV0VzYzBKQlFXOUNPMEZCUVVVN1FVRkJReXhsUVVGbExHRkJRV0VzUjBGQlJUdERRVUZETEVsQlFVa3NTVUZCUlN4NVFrRkJlVUlzUTBGQlF6dERRVUZGTEU5QlFVOHNSVUZCUlN4dlFrRkJiMElzWTBGQldTeERRVUZETEVsQlFVVXNjVUpCUVhGQ0xFTkJRVU1zU1VGQlJTeHpRa0ZCYzBJc1EwRkJRenRCUVVGRE8wRkJRVU1zWlVGQlpTeHhRa0ZCY1VJc1IwRkJSVHREUVVGRExFbEJRVWtzU1VGQlJTeFhRVUZYTEVWQlFVTXNUMEZCVFN4SFFVRkhMRVZCUVVVc1owSkJRV2RDTEZGQlFVOHNRMEZCUXl4SFFVRkZMRWxCUVVVc1JVRkJSU3hQUVVGUExHTkJRV01zUTBGQlF5eEhRVUZGTEVsQlFVVXNTVUZCU1N4dlFrRkJiMEk3UlVGQlF5eGpRVUZoTEVWQlFVVTdSVUZCWjBJc1owSkJRV1VzUlVGQlJTeFZRVUZWTzBWQlFXVXNiVUpCUVd0Q0xFVkJRVVVzVlVGQlZUdEZRVUZyUWl4alFVRmhMRVZCUVVVc1ZVRkJWVHREUVVGWkxFTkJRVU1zUjBGQlJTeEpRVUZGTEVkQlFVVXNPRUpCUVRCQ0xFZEJRVWNzUlVGQlJTeE5RVUZOTEZsQlFWa3NUMEZCVHl4SFFVRkhMRXRCUVVrc1NVRkJSU3hEUVVGRExFZEJRVVVzU1VGQlJTeEZRVUZGTEZWQlFWVXNUMEZCVFN4SlFVRkZMRU5CUVVNc1IwRkJSVHREUVVGRkxFbEJRVWM3UlVGQlF5eEpRVUZITzBkQlFVTXNUVUZCVFN4dFFrRkJiVUlzUTBGQlF5eEhRVUZGTEVsQlFVVXNRMEZCUXp0RlFVRkRMRk5CUVU4c1IwRkJSVHRIUVVGRExFbEJRVWNzYjBKQlFXOUNMRU5CUVVNc1IwRkJSVHRIUVVGUExFMUJRVTA3UlVGQlF6dEZRVUZETEV0QlFVa3NSVUZCUlN4dlFrRkJiMElzZDBKQlFYTkNMRU5CUVVNc1MwRkJSeXcyUWtGQk5rSXNRMEZCUXl4TlFVRkpMRWxCUVVVc1RVRkJUU3c0UWtGQk9FSTdSMEZCUXl4blFrRkJaU3hoUVVGaExFVkJRVVVzVlVGQlZTeGhRVUZoTEdGQlFXRTdSMEZCUlN4WFFVRlZMRVZCUVVVc1ZVRkJWU3hoUVVGaE8wVkJRVk1zUTBGQlF5eE5RVUZMTzBkQlFVTXNTVUZCU1N4SlFVRkZMRTFCUVUwc1UwRkJVeXhGUVVGRkxHZENRVUZuUWl4SFFVRkZMRWRCUVVjc1RVRkJUU3hEUVVGRE8wZEJRVVVzU1VGQlJ5eEZRVUZGTEZkQlFWTXNZVUZCV1R0SlFVRkRMRTFCUVUwc01FSkJRVEJDTzB0QlFVTXNiVUpCUVd0Q0xFVkJRVVU3UzBGQmEwSXNZMEZCWVN4RlFVRkZPMGxCUVZrc1EwRkJReXhIUVVGRkxFMUJRVTBzUjBGQlJ5eFJRVUZSTEVkQlFVVXNUVUZCVFN4RlFVRkZMRTlCUVU4c1JVRkJReXhqUVVGaExFVkJRVVVzWVVGQldTeEhRVUZGTzB0QlFVTXNWMEZCVlN4RFFVRkRPMHRCUVVVc1RVRkJTenRKUVVGTkxFZEJRVVVzUTBGQlF6dEpRVUZGTzBkQlFVMDdSMEZCUXl4SlFVRkhMRVZCUVVVc1YwRkJVeXhSUVVGUE8wbEJRVU1zVFVGQlRTeEhRVUZITEZGQlFWRXNSMEZCUlN4TlFVRk5MRVZCUVVVc1QwRkJUeXhIUVVGRk8wdEJRVU1zVFVGQlN6dExRVUZQTEZGQlFVOHNSVUZCUlN4VlFVRlJPMHRCUVVjc1UwRkJVU3hGUVVGRk8wdEJRVkVzVDBGQlRTeEZRVUZGTzBsQlFVc3NSMEZCUlN4RFFVRkRPMGxCUVVVN1IwRkJUVHRIUVVGRExFbEJRVWtzU1VGQlJTeEZRVUZGTEZkQlFWTXNkVU5CUVhGRExFVkJRVVVzVjBGQlV5eFRRVUZQTEVWQlFVVXNNa0pCUVhsQ0xFdEJRVXM3UjBGQlJTeEpRVUZITEUxQlFVa3NTMEZCU3l4SFFVRkZPMGxCUVVNc1RVRkJUU3hGUVVGRkxFMUJRVTBzUTBGQlF6dEpRVUZGTEVsQlFVa3NTVUZCUlN4UFFVRk5MRVZCUVVVc1YwRkJVeXh6UTBGQmIwTXNjVU5CUVcxRExESkNRVUZCTEVOQlFUUkNPMHRCUVVNc2FVSkJRV2RDTEN0Q1FVRXJRaXh2UWtGQmIwSXNRMEZCUXl4RFFVRkRMRWRCUVVjN1MwRkJSU3g1UWtGQmQwSXNSVUZCUlR0TFFVRk5MR2RDUVVGbExFVkJRVVU3UzBGQlpTeHRRa0ZCYTBJc1JVRkJSVHRMUVVGclFpeGpRVUZoTEVWQlFVVTdTVUZCV1N4RFFVRkRPMGxCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUTBGQlF6dEpRVUZGTEVsQlFVa3NTVUZCUlN4TlFVRk5MRFJDUVVFMFFqdExRVUZETEc5Q1FVRnRRanRMUVVGRkxHTkJRV0U3UzBGQlJTeFJRVUZQTzB0QlFVVXNXVUZCVnl4RlFVRkZPMHRCUVUwc1owSkJRV1VzUlVGQlJUdExRVUZSTEZWQlFWTTdTMEZCUlR0TFFVRnpRaXh0UWtGQmEwSTdTVUZCUXl4RFFVRkRPMGxCUVVV",
	"c1NVRkJSeXhOUVVGSkxHRkJRVms3UzBGQlF5eEpRVUZGTEV0QlFVczdTMEZCUlR0SlFVRlJPMGxCUVVNc1NVRkJSVHRMUVVGRExFMUJRVXM3UzBGQmQwSXNVMEZCVVR0SlFVRkRPMGxCUVVVN1IwRkJVVHRIUVVGRExFbEJRVWNzUlVGQlJTeFhRVUZUTEZGQlFVODdTVUZCUXl4SlFVRkhMRVZCUVVVc1JVRkJSU3d5UWtGQmVVSXNSVUZCUlN4M1FrRkJjMElzUlVGQlJTeGpRVUZqTEdsQ1FVRmxMRU5CUVVNc1MwRkJSeXhGUVVGRkxGTkJRVThzYVVKQlFXZENMRTFCUVUwc1RVRkJUU3cwUWtGQk5FSTdTVUZCUlN4TlFVRk5MRWRCUVVjc1VVRkJVU3hIUVVGRkxFMUJRVTBzUlVGQlJTeFBRVUZQTEVkQlFVVTdTMEZCUXl4dlFrRkJiVUlzUlVGQlJUdExRVUZ0UWl4TlFVRkxPMGxCUVUwc1IwRkJSU3hEUVVGRE8wbEJRVVU3UjBGQlRUdEhRVUZETEUxQlFVMHNSVUZCUlN4TlFVRk5MRU5CUVVNc1IwRkJSU3hKUVVGRkxFdEJRVXM3UlVGQlF6dERRVUZETEZOQlFVOHNSMEZCUlR0RlFVRkRMRTFCUVUwc1RVRkJUU3hGUVVGRkxFdEJRVXM3UjBGQlF5eFBRVUZOTERKQ1FVRXlRaXhEUVVGRE8wZEJRVVVzVFVGQlN6dEZRVUZaTEVOQlFVTXNSMEZCUlR0RFFVRkRMRlZCUVZFN1JVRkJReXhOUVVGSkxFdEJRVXNzUzBGQlJ5eE5RVUZOTEVWQlFVVXNVVUZCVVN4SFFVRkZMRXRCUVVjc1RVRkJUU3haUVVGWkxFTkJRVU03UTBGQlF6dEJRVUZETzBGQlFVTXNaVUZCWlN3MFFrRkJORUlzUjBGQlJUdERRVUZETEVsQlFVa3NSMEZCUlN4SlFVRkZMRU5CUVVNc1IwRkJSeXhGUVVGRkxHTkJRV003UTBGQlJTeFRRVUZQTzBWQlFVTXNTVUZCU1N4SlFVRkZMRzFEUVVGdFF6dEhRVUZETEdGQlFWa3NSVUZCUlR0SFFVRnJRaXhUUVVGUk8wVkJRVU1zUTBGQlF6dEZRVUZGTEVsQlFVY3NUVUZCU1N4TFFVRkxMRWRCUVVVc1QwRkJUeXhOUVVGSkxFdEJRVXNzUzBGQlJ5eE5RVUZOTEVWQlFVVXNUMEZCVHl4TFFVRkxPMGRCUVVNc1RVRkJTenRIUVVFd1FpeFhRVUZWTzBWQlFVTXNRMEZCUXl4SFFVRkZPMFZCUVVVc1JVRkJSU3hQUVVGUExHRkJRV0VzZVVKQlFYVkNMRTFCUVVrc1MwRkJTeXhOUVVGSkxFbEJRVVVzUlVGQlJTeHpRa0ZCYzBJc1IwRkJSU3hOUVVGTkxFVkJRVVVzVDBGQlR5eExRVUZMTzBkQlFVTXNiVUpCUVd0Q0xFVkJRVVVzVDBGQlR5eGhRVUZoTzBkQlFXdENMRmxCUVZjc1JVRkJSVHRIUVVGWExFMUJRVXM3UjBGQmQwSXNWMEZCVlR0RlFVRkRMRU5CUVVNN1JVRkJSeXhKUVVGSkxFbEJRVVVzUlVGQlJTeFRRVUZUTEV0QlFVczdSVUZCUlN4RlFVRkZMRmxCUVZVc1EwRkJReXhEUVVGRE8wVkJRVVVzU1VGQlNTeEpRVUZGTEU5QlFVMHNSVUZCUlN4cFFrRkJaU3hMUVVGTExFbEJRVVVzU1VGQlJTeFJRVUZSTEV0QlFVc3NRMEZCUXl4SFFVRkZMRVZCUVVVc1lVRkJZU3hUUVVGVExFTkJRVU03UlVGQlJ5eEpRVUZITEUxQlFVa3NWVUZCVXl4UFFVRlBMRTFCUVVrc1MwRkJTeXhMUVVGSExFMUJRVTBzUlVGQlJTeFBRVUZQTEV0QlFVczdSMEZCUXl4TlFVRkxPMGRCUVRCQ0xGZEJRVlU3UlVGQlF5eERRVUZETEVkQlFVVTdSVUZCV1N4SlFVRkhMRVZCUVVVc1RVRkJTeXhOUVVGTkxFMUJRVTBzY1VSQlFYRkVPMFZCUVVVc1NVRkJTU3hKUVVGRkxFVkJRVVU3UlVGQlRTeEpRVUZITEVWQlFVVXNVMEZCVHl4NVFrRkJkMEk3UjBGQlF5eEZRVUZGTEV0QlFVc3NSMEZCUnl4RlFVRkZMRTlCUVU4N1IwRkJSVHRGUVVGUk8wVkJRVU1zU1VGQlJ5eEZRVUZGTEZOQlFVOHNORUpCUVRCQ0xFVkJRVVVzVTBGQlR5eG5RMEZCSzBJN1IwRkJReXhKUVVGSkxFbEJRVVVzVFVGQlRTd3dRa0ZCTUVJN1NVRkJReXhoUVVGWk8wbEJRVVVzWjBKQlFXVXNSVUZCUlN4UFFVRlBPMGxCUVdVc2JVSkJRV3RDTEVWQlFVVXNUMEZCVHp0SlFVRnJRaXhqUVVGaExFVkJRVVVzVDBGQlR6dEhRVUZaTEVOQlFVTTdSMEZCUlN4TlFVRk5MRVZCUVVVc1QwRkJUeXhOUVVGTkxFTkJRVU03UjBGQlJUdEZRVUZSTzBWQlFVTXNTVUZCUnl4RlFVRkZMRk5CUVU4c2NVSkJRVzFDTEVWQlFVVXNZMEZCV1N4SFFVRkZPMGRCUVVNc1RVRkJUU3hGUVVGRkxFOUJRVThzUzBGQlN6dEpRVUZETEUxQlFVczdTVUZCZVVJc1YwRkJWU3hGUVVGRk8wZEJRVk1zUTBGQlF5eEhRVUZGTEVsQlFVVXNTMEZCU3p0SFFVRkZMRWxCUVVrc1NVRkJSU3hOUVVGTkxIVkNRVUYxUWp0SlFVRkRMRTFCUVVzc1JVRkJSU3hUUVVGVE8wbEJRVXNzWjBKQlFXVXNSVUZCUlN4UFFVRlBPMGxCUVdVc1ZVRkJVeXhGUVVGRkxGTkJRVk03U1VGQlV5eGpRVUZoTEVWQlFVVXNUMEZCVHp0SFFVRlpMRU5CUVVNN1IwRkJSU3hOUVVGSkxFdEJRVXNzUzBGQlJ5eEZRVUZGTEcxQ1FVRnRRaXhMUVVGTE8wbEJRVU1zUjBGQlJ5eEZRVUZGTzBsQlFWTXNWVUZCVXl4RFFVRkRMRU5CUVVNN1IwRkJReXhEUVVGRE8wVkJRVU03UTBGQlF6dEJRVUZETzBGQlFVTXNaVUZCWlN4elFrRkJjMElzUjBGQlJUdERRVUZETEVsQlFVa3NTVUZCUlN4RlFVRkZPME5CUVZVc1NVRkJSenRGUVVGRExGTkJRVTg3UjBGQlF5eEpRVUZKTEVsQlFVVXNUVUZCVFN4VFFVRlRMRU5CUVVNN1IwRkJSU3hKUVVGSExFVkJRVVVzVjBGQlV5eFJRVUZQTzBsQlFVTXNUVUZCVFN4dlFrRkJiMEk3UzBGQlF5eGpRVUZoTEVWQlFVVTdTMEZCWjBJc1UwRkJVVHROUVVGRExGRkJRVTg3VDBGQlF5eE5RVUZMTzA5QlFVOHNVVUZCVHl4RlFVRkZMRlZCUVZFN1QwRkJSeXhUUVVGUkxFVkJRVVU3VDBGQlVTeHRRa0ZCYTBJc1JVRkJSVHRQUVVGclFpeGpRVUZoTEVWQlFVVTdUMEZCWVN4UFFVRk5MRVZCUVVVN1RVRkJTenROUVVGRkxFMUJRVXM3UzBGQllUdEpRVUZETEVOQlFVTTdTVUZCUlR0SFFVRk5PMGRCUVVNc1NVRkJSeXhGUVVGRkxGZEJRVk1zY1VOQlFXOURPMGxCUVVNc1RVRkJUU3h2UWtGQmIwSTdTMEZCUXl4alFVRmhMRVZCUVVVN1MwRkJaMElzVTBGQlVUdE5RVUZETEZGQlFVODdUMEZCUXl4TlFVRkxPMDlCUVc5RExHMUNRVUZyUWl4RlFVRkZPMDlCUVhsQ0xHMUNRVUZyUWl4RlFVRkZPMDlCUVd0Q0xHTkJRV0VzUlVGQlJUdE5RVUZaTzAxQlFVVXNUVUZCU3p0TFFVRmhPMGxCUVVNc1EwRkJRenRKUVVGRk8wZEJRVTA3UjBGQlF5eEpRVUZITEVWQlFVVXNWMEZCVXl4UlFVRlBPMGxCUVVNc1NVRkJTU3hKUVVGRkxFVkJRVVU3U1VGQmVVSXNTVUZCUnl4RlFVRkZMRTFCUVVrc1MwRkJTeXhMUVVGSExFVkJRVVVzTWtKQlFYbENMRVZCUVVVc2QwSkJRWE5DTEVWQlFVVXNZMEZCWXl4cFFrRkJaU3hEUVVGRExFdEJRVWNzUlVGQlJTeFRRVUZQTEdsQ1FVRm5RaXhOUVVGTkxFMUJRVTBzTkVKQlFUUkNPMGxCUVVVc1NVRkJTU3hKUVVGRkxFMUJRVWtzUzBGQlN5eEpRVUZGTzB0QlFVTXNUVUZCU3p0TFFVRlBMRzFDUVVGclFpeEZRVUZGTzB0QlFXdENMR05CUVdFc1JVRkJSVHRMUVVGaExHOUNRVUZ0UWl4RlFVRkZPMGxCUVd0Q0xFbEJRVVU3UzBGQlF5eE5RVUZMTzB0QlFUSkNMRzFDUVVGclFqdExRVUZGTEcxQ1FVRnJRaXhGUVVGRk8wdEJRV3RDTEdOQlFXRXNSVUZCUlR0SlFVRlpPMGxCUVVVc1RVRkJUU3h2UWtGQmIwSTdTMEZCUXl4alFVRmhMRVZCUVVVN1MwRkJaMElzVTBGQlVUdE5RVUZETEZGQlFVODdUVUZCUlN4TlFVRkxPMHRCUVdFN1NVRkJReXhEUVVGRE8wbEJRVVU3UjBGQlRUdEhRVUZETEVsQlFVVTdTVUZCUXl4UFFVRk5MRXRCUVVzN1NVRkJSU3huUWtGQlpTeEZRVUZGTzBsQlFXVXNiVUpCUVd0Q0xFVkJRVVU3U1VGQmEwSXNZMEZCWVN4RlFVRkZPMGRCUVZrN1JVRkJRenREUVVGRExGTkJRVThzUjBGQlJUdEZRVUZETEUxQlFVMHNUVUZCVFN4dlFrRkJiMEk3UjBGQlF5eGpRVUZoTEVWQlFVVTdSMEZCWjBJc1UwRkJVVHRKUVVGRExFOUJRVTBzTWtKQlFUSkNMRU5CUVVNN1NVRkJSU3hOUVVGTE8wZEJRVms3UlVGQlF5eERRVUZETEVkQlFVVTdRMEZCUXp0QlFVRkRPMEZCUTNnelRpeGhRVUZoTEdGQlFXRTdRVUZETVVJc1YwRkJWeXh2UWtGQmIwSXNTVUZCU1N3clFrRkJLMElzV1VGQldUczdPMEZEU0RsRkxFMUJRVTBzTUVKQlFYZENMRTlCUVU4c1NVRkJTU3d3UWtGQk1FSXNSMEZCUlN3MlFrRkJNa0k3UVVGQlZ5d3lRa0ZCTWtJc05rSkJRVEpDTEV0QlFVc3NUVUZCU1N3eVFrRkJNa0lzTWtKQlFYbENMRWxCUVVrc1NVRkJSVHRCUVVGSExFMUJRVTBzWTBGQldTd3lRa0ZCTWtJN1FVRkJlVUlzU1VGQlNTeGhRVUZYTEUxQlFVczdRMEZCUXp0RFFVRkxPME5CUVUwc1dVRkJXU3hIUVVGRkxFbEJRVVVzUTBGQlF5eEhRVUZGTzBWQlFVTXNTMEZCU3l4UFFVRkxMRWRCUVVVc1MwRkJTeXhSUVVGTkxFVkJRVVU3UlVGQlRTeEpRVUZKTEVsQlFVVXNXVUZCV1N4SlFVRkpMRU5CUVVNN1JVRkJSU3hKUVVGSExFMUJRVWtzUzBGQlN5eExRVUZITEVWQlFVVXNWVUZCVVN4TFFVRkxMRTFCUVVrc1MwRkJTeXhWUVVGUkxFdEJRVXNzU1VGQlJ5eE5RVUZOTEUxQlFVMHNLMEpCUVN0Q0xFVkJRVVVzTUVKQlFUQkNMRVZCUVVVc1VVRkJUU3hUUVVGUExGVkJRVlVzYzBKQlFYTkNMRXRCUVVzc1VVRkJUU3hUUVVGUExGVkJRVlVzYjBoQlFXOUlPMFZCUVVVc1dVRkJXU3hKUVVGSkxFZEJRVVVzU1VGQlNUdERRVUZETzBGQlFVTTdRVU5CTVhKQ0xFbEJRVWtzVjBGQlZ5eFZRVUZWTzBGQlFXMUNMRWxCUVVrc1YwRkJWeXh0UWtGQmJVSTdRVUZCWlN4SlFVRkpMRmRCUVZjc1pVRkJaVHRCUVVGMVFpeEpRVUZKTEZkQlFWY3NkVUpCUVhWQ096czdRVUZCZEUwc1RVRkJkMDBzYzBKQlFXOUNMRWxCUVVrc1YwRkJWeXh6UWtGQmMwSTdRVUZCTkVJc1NVRkJTU3hYUVVGWExEUkNRVUUwUWp0QlFVRlZMRWxCUVVrc1YwRkJWeXhWUVVGVk8wRkJRVzFDTEVsQlFVa3NWMEZCVnl4dFFrRkJiVUk3UVVGQmFHRXNUVUZCYTJFc2JVSkJRV2xDTEVsQlFVa3NWMEZCVnl4dFFrRkJiVUk3UVVGQmEwSXNTVUZCU1N4WFFVRlhMR3RDUVVGclFqdEJRVUZ4UWl4SlFVRkpMRmRCUVZjc2NVSkJRWEZDTzBGQlFXRXNTVUZCU1N4WFFVRlhMR0ZCUVdFN1FVRkJZU3hKUVVGSkxGZEJRVmNzWVVGQllUdEJRVUZyUXl4SlFVRkpMRmRCUVZjc2EwTkJRV3RETzBGQlFTdENMRWxCUVVrc1YwRkJWeXdyUWtGQkswSTdRVUZCYlVNc1NVRkJTU3hYUVVGWExHMURRVUZ0UXp0QlFVRm5ReXhKUVVGSkxGZEJRVmNzWjBOQlFXZERPMEZCUVRaQ0xFbEJRVWtzVjBGQlZ5dzJRa0ZCTmtJN1FVRkJiVUlzU1VGQlNTeFhRVUZYTEcxQ1FVRnRRanRCUVVFd1FpeEpRVUZKTEZkQlFWY3NNRUpCUVRCQ08wRkJRV2RETEVsQlFVa3NWMEZCVnl4blEwRkJaME03UVVGQk5rSXNTVUZCU1N4WFFVRlhMRFpDUVVFMlFqczdPMEZEUVhCeVF5eFRRVUZUTERSQ1FVRTBRaXhIUVVGRk8wTkJRVU1zU1VGQlNTeEpRVUZGTEcxQ1FVRnRRaXhGUVVGRkxHbENRVUZwUWl4TFFVRkxPME5CUVVVc1QwRkJUeXhOUVVGSkxFbEJRVVVzUzBGQlN5eEpRVUZGTzBGQlFVTTdRVUZCZDFFc1UwRkJVeXh0UWtGQmJVSXNSMEZCUlR0RFFVRkRMRTlCUVU4c1QwRkJUeXhMUVVGSExGbEJRVlVzVDBGQlR5eFZRVUZWTEVOQlFVTXNTMEZCUnl4SlFVRkZMRWxCUVVVc1NVRkJSVHRCUVVGRE96czdRVU5CWjNwQ0xGTkJRVk1zYlVKQlFXMUNMRWRCUVVVN1EwRkJReXhKUVVGSExFTkJRVU1zUjBGQlJTeEhRVUZITEV0QlFVYzdRMEZCUlN4SlFVRkhMRTFCUVVrc1MwRkJTeXhIUVVGRkxFMUJRVTBzVFVGQlRTd3dRMEZCTUVNN1EwRkJSU3hKUVVGSkxFbEJRVVVzUlVGQlJTeE5RVUZMTEVsQlFVVXNRMEZCUXl4SFFVRkhMRVZCUVVVc1VVRkJVVHREUVVGRkxFdEJRVWtzU1VGQlNTeExRVUZMTEVkQlFVVXNSVUZCUlN4VFFVRlBMRXRCUVVzc1RVRkJTU3hKUVVGRkxFVkJRVVVzVDBGQlRTeEZRVUZGTEV0QlFVc3NSMEZCUnl4RlFVRkZMRkZCUVZFN1EwRkJSU3hQUVVGTk8wVkJRVU1zUjBGQlJ6dEZRVUZGTEUxQlFVczdSVUZCUlN4VlFVRlRPME5CUVVNN1FVRkJRenM3TzBGRFFYQTVReXhUUVVGVExHdENRVUZyUWl4SFFVRkZPME5CUVVNc1NVRkJTU3hKUVVGRkxFVkJRVVVzYzBKQlFYRkNMRWxCUVVVc1IwRkJSeXhSUVVGUExFbEJRVVVzUjBGQlJ5eGxRVUZqTEVsQlFVVXNSMEZCUnl4WFFVRlZMRWxCUVVVc1IwRkJSeXhOUVVGTk8wTkJRVWNzVDBGQlRUdEZRVUZETEZGQlFVOHNhVUpCUVdsQ0xFTkJRVU1zU1VGQlJTeEpRVUZGTEV0QlFVczdSVUZCUlN4bFFVRmpMR2xDUVVGcFFpeERRVUZETEVsQlFVVXNTVUZCUlN4TFFVRkxPMFZCUVVVc1YwRkJWU3hwUWtGQmFVSXNRMEZCUXl4SlFVRkZMRWxCUVVVc1MwRkJTenRGUVVGRkxGRkJRVThzYVVKQlFXbENMRU5CUVVNc1NVRkJSU3hKUVVGRkxFdEJRVXM3UTBGQlF6dEJRVUZETzBGQlFYVkZMRk5CUVZNc2EwSkJRV3RDTEVkQlFVVTdRMEZCUXl4UFFVRlBMR3RDUVVGclFpeERRVUZETEVOQlFVTXNRMEZCUXp0QlFVRmhPMEZCUVVNc1UwRkJVeXh4UWtGQmNVSXNSMEZCUlR0RFFVRkRMRWxCUVVrc1NVRkJSU3hGUVVGRkxHOUNRVUZ2UWp0RFFVRk5MRTlCUVU4c2FVSkJRV2xDTEVOQlFVTXNTVUZCUlN4SlFVRkZMRXRCUVVzN1FVRkJRenM3TzBGRFF6VnpRaXhKUVVGWExEUkNRVUUwUWl4WFFVRlhMRTlCUVU4c1NVRkJTU3h0UWtGQmJVSXNSVUZCUlN4RFFVRkRMRFpEUVVFMlF6czdPMEZEUVdoSkxFMUJRVTBzZDBKQlFYTkNPMEZCUldkQ0xGZEJRVmNzVDBGQlR5eEpRVUZKTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU1zZVVSQlFYbEVPMEZCUXpOSExGZEJRVmNzVDBGQlR5eEpRVUZKTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU1zYlVSQlFXMUVPenM3UVVOS2NrSXNVMEZCVXl4eFEwRkJjVU1zUjBGQlJTeEhRVUZGTzBOQlFVTXNTVUZCU1N4SlFVRkZMRVZCUVVVN1EwRkJaU3hKUVVGSExFZEJRVWNzVTBGQlR5eDFRa0ZCYzBJc1QwRkJUVHRGUVVGRExGRkJRVThzVDBGQlR5eEZRVUZGTEU5QlFVOHNWVUZCVVN4RlFVRkZPMFZCUVVVc1RVRkJTenRGUVVGclFpeFJRVUZQTzBWQlFVVXNZMEZCWVN4UFFVRlBMRVZCUVVVc1QwRkJUeXhuUWtGQll5eEZRVUZGTzBOQlFVTTdRVUZCUXp0QlFVRkRMRk5CUVZNc2JVTkJRVzFETEVkQlFVVXNSMEZCUlR0RFFVRkRMRWxCUVVrc1NVRkJSU3h4UTBGQmNVTXNSMEZCUlN4RlFVRkZPME5CUVVVc1NVRkJSeXhOUVVGSkxFdEJRVXNzUjBGQlJTeFBRVUZOTzBWQlFVTXNSMEZCUnp0RlFVRkZMRk5CUVZFc1EwRkJRenRGUVVGRkxGRkJRVTg3UjBGQlF5eE5RVUZMTzBkQlFUUkNMRk5CUVZFc1pVRkJaU3hEUVVGRE8wVkJRVU03UTBGQlF6dEJRVUZET3pzN1FVTkRiR2xDTEVsQlFWY3NNRUpCUVRCQ0xGZEJRVmNzVDBGQlR5eEpRVUZKTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU1zTWtOQlFUSkRPenM3UVVORWQwb3NTVUZCU1N4elFrRkJiMElzVFVGQlN6dERRVUZETzBOQlFXMUNPME5CUVZFN1EwRkJaMEk3UTBGQllTeHBRa0ZCWlR0RFFVRkxMRmxCUVZrc1IwRkJSVHRGUVVGRExFdEJRVXNzY1VKQlFXMUNMRVZCUVVVc2IwSkJRVzFDTEV0QlFVc3NWVUZCVVN4WFFVRlhMRVZCUVVNc1QwRkJUU3hGUVVGRkxFMUJRVXNzUTBGQlF5eEhRVUZGTEV0QlFVc3NhMEpCUVdkQ0xFdEJRVXNzVVVGQlVTeFBRVUZQTEdOQlFXTXNRMEZCUXl4SFFVRkZMRXRCUVVzc1pVRkJZU3hGUVVGRk8wTkJRVms3UTBGQlF5eEpRVUZKTEZGQlFVODdSVUZCUXl4UFFVRlBMRXRCUVVzc1VVRkJVVHREUVVGTE8wTkJRVU1zVFVGQlRTeFZRVUZUTzBWQlFVTXNUVUZCVFN4clFrRkJhMElzUzBGQlN5eGxRVUZsTEVkQlFVVXNUVUZCVFN4WlFVRlpMRXRCUVVzc1QwRkJUenREUVVGRE8wTkJRVU1zVFVGQlRTeG5Ra0ZCWlR0RlFVRkRMRk5CUVU4N1IwRkJReXhKUVVGSkxFbEJRVVVzVFVGQlRTeExRVUZMTEZsQlFWa3NjMFJCUVhORUxFZEJRVVVzU1VGQlJTeExRVUZMTEc5Q1FVRnZRaXhEUVVGRE8wZEJRVVVzU1VGQlJ5eE5RVUZKTEV0QlFVc3NSMEZCUlN4UFFVRlBPMGRCUVVVc1NVRkJSeXhGUVVGRkxGTkJRVThzZVVKQlFYZENPMGxCUVVNc1NVRkJTU3hKUVVGRkxFMUJRVTBzUzBGQlN5eDFRa0ZCZFVJc1EwRkJRenRKUVVGRkxFbEJRVWNzVFVGQlNTeExRVUZMTEVkQlFVVXNUMEZCVHp0SFFVRkRPMFZCUVVNN1EwRkJRenREUVVGRExIRkNRVUZ4UWl4SFFVRkZPMFZCUVVNc1JVRkJSU3gxUWtGQmNVSXNTMEZCU3l4TFFVRkhMRXRCUVVzc2JVSkJRVzFDTEZGQlFWRXNSMEZCUnl4RlFVRkZMR3RDUVVGclFqdERRVUZETzBOQlFVTXNhVUpCUVdkQ08wVkJRVU1zUzBGQlN5eHBRa0ZCWlR0RFFVRkpPME5CUVVNc2IwSkJRVzFDTzBWQlFVTXNUMEZCVHl4TFFVRkxMRzFDUVVGcFFpeExRVUZMTEdkQ1FVRm5RaXhMUVVGTExFZEJRVVVzUzBGQlN6dERRVUZqTzBOQlFVTXNUVUZCVFN4WlFVRlpMRWRCUVVVN1JVRkJReXhUUVVGUE8wZEJRVU1zU1VGQlNTeEpRVUZGTEUxQlFVMHNTMEZCU3l4clFrRkJhMEk3UjBGQlJTeEpRVUZITEV0QlFVc3NaVUZCWlN4SFFVRkZMRVZCUVVVc1RVRkJTeXhOUVVGTkxFMUJRVTBzUTBGQlF6dEhRVUZGTEVsQlFVa3NTVUZCUlN4RlFVRkZPMGRCUVUwc1NVRkJSeXhGUVVGRkxGTkJRVThzWTBGQllTeE5RVUZOTEhsQ1FVRjVRaXhGUVVGRkxFdEJRVXM3UjBGQlJTeEpRVUZITEVWQlFVVXNVMEZCVHl3eVFrRkJNRUk3U1VGQlF5eE5RVUZOTEV0QlFVc3NZVUZCWVN4TlFVRk5MRVZCUVVVc2FVSkJRV2xDTzBsQlFVVTdSMEZCVVR0SFFVRkRMRTlCUVU4N1JVRkJRenREUVVGRE8wTkJRVU1zYjBKQlFXOUNMRWRCUVVVN1JVRkJReXhKUVVGSExFVkJRVVVzVTBGQlR5eGpRVUZoTEUxQlFVMHNlVUpCUVhsQ0xFVkJRVVVzUzBGQlN6dEZRVUZGTEVsQlFVY3NSVUZCUlN4VFFVRlBMR1ZCUVdNc1QwRkJUeXhMUVVGTExIRkNRVUZ4UWl4RFFVRkRMRWRCUVVVc1JVRkJSVHREUVVGTk8wTkJRVU1zVFVGQlRTeDFRa0ZCZFVJc1IwRkJSVHRGUVVGRExFMUJRVTBzUzBGQlN5eGhRVUZoTEUxQlFVMHNSVUZCUlN4cFFrRkJhVUk3UlVGQlJTeEpRVUZKTEVsQlFVVXNTMEZCU3l4dFFrRkJiVUlzVFVGQlRUdEZRVUZGTEU5QlFVc3NUVUZCU1N4TFFVRkxMRWxCUVVjN1IwRkJReXhKUVVGSkxFbEJRVVVzVFVGQlRTeFJRVUZSTEV0QlFVc3NRMEZCUXl4TFFVRkxMR3RDUVVGclFpeERRVUZETEVOQlFVTXNUVUZCU3l4UFFVRkpPMGxCUVVNc1RVRkJTenRKUVVGVkxFOUJRVTA3UjBGQlF5eEZRVUZGTEVkQlFVVXNTMEZCU3l4aFFVRmhMRXRCUVVzc1EwRkJReXhEUVVGRExFMUJRVXNzVDBGQlNUdEpRVUZETEUxQlFVczdTVUZCVnl4UFFVRk5PMGRCUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03UjBGQlJTeEpRVUZITEVWQlFVVXNVMEZCVHl4WFFVRlZPMGxCUVVNc1NVRkJSeXhMUVVGTExHVkJRV1VzUjBGQlJTeEZRVUZGTEUxQlFVMHNUVUZCU3l4TlFVRk5MRTFCUVUwc2NVUkJRWEZFTzBsQlFVVXNTVUZCUnl4RlFVRkZMRTFCUVUwc1RVRkJUU3hUUVVGUExESkNRVUV3UWp0TFFVRkRMRTFCUVUwc1MwRkJTeXhoUVVGaExFMUJRVTBzUlVGQlJTeE5RVUZOTEUxQlFVMHNhVUpCUVdsQ08wdEJRVVU3U1VGQlVUdEpRVUZETEVsQlFVa3NTVUZCUlN4TFFVRkxMRzlDUVVGdlFpeEZRVUZGTEUxQlFVMHNTMEZCU3p0SlFVRkZMRWxCUVVjc1RVRkJTU3hMUVVGTExFZEJRVVVzVDBGQlR6dEpRVUZGTEVsQlFVY3NSVUZCUlN4TlFVRk5MRTFCUVUwc1UwRkJUeXcyUWtGQk1rSXNSVUZCUlN4TlFVRk5MRTFCUVUwc1kwRkJXU3hGUVVGRkxGZEJRVlU3U1VGQlR6dEhRVUZSTzBkQlFVTXNTVUZCUnl4RlFVRkZMRTFCUVUwc1RVRkJTeXhOUVVGTkxFMUJRVTBzT0VSQlFUaEVPMGRCUVVVc1MwRkJTeXhoUVVGaExGbEJRVmtzUjBGQlJTeEZRVUZGTEUxQlFVMHNUVUZCVFN4VFFVRlBMR05CUVZrc1NVRkJSU3hGUVVGRkxFMUJRVTA3UlVGQlRUdEZRVUZETEVsQlFVYzdSMEZCUXl4TlFVRk5MSGRDUVVGM1FqdEpRVUZETEZsQlFWY3NSVUZCUlR0SlFVRlhMRk5CUVZFN1MwRkJReXhWUVVGVE8wdEJRVVVzVFVGQlN6dExRVUZyUWl4WFFVRlZMRVZCUVVVN1NVRkJVenRIUVVGRExFTkJRVU03UlVGQlF5eFRRVUZQTEVkQlFVVTdSMEZCUXl4SlFVRkhMRVZCUVVVc1lVRkJZU3hUUVVGUExFVkJRVVVzVTBGQlR5eHpRa0ZCY1VJc1RVRkJUVHRGUVVGRE8wVkJRVU1zVDBGQlR5eE5RVUZOTEV0QlFVc3NkVUpCUVhWQ0xFVkJRVVVzVjBGQlZTeERRVUZETzBOQlFVTTdRMEZCUXl4TlFVRk5MSFZDUVVGMVFpeEhRVUZGTEVkQlFVVTdSVUZCUXl4VFFVRlBPMGRCUVVNc1NVRkJTU3hKUVVGRkxFMUJRVTBzUzBGQlN5eFpRVUZaTEdsRlFVRnBSVHRIUVVGRkxFbEJRVWNzUlVGQlJTeFRRVUZQTERCQ1FVRjVRanRKUVVGRExFbEJRVWNzUlVGQlJTeGpRVUZaTEVkQlFVVTdTVUZCVHp0SFFVRlJPMGRCUVVNc1NVRkJSeXhGUVVGRkxGTkJRVThzTmtKQlFUSkNMRVZCUVVVc1kwRkJXU3hIUVVGRk8wbEJRVU1zUzBGQlN5eHRRa0ZCYlVJc1VVRkJVU3hEUVVGRE8wbEJRVVU3UjBGQlRUdEhRVUZETEVWQlFVVXNVMEZCVHl4cFFrRkJaU3hMUVVGTExHMUNRVUZ0UWl4UlFVRlJMRU5CUVVNN1IwRkJSU3hKUVVGSkxFbEJRVVVzUzBGQlN5eHZRa0ZCYjBJc1EwRkJRenRIUVVGRkxFbEJRVWNzVFVGQlNTeExRVUZMTEVkQlFVVXNUMEZCVHp0RlFVRkRPME5CUVVNN1FVRkJRenM3TzBGRFFUVnFSeXhsUVVGbExIRkNRVUZ4UWl4SFFVRkZPME5CUVVNc1NVRkJTU3hKUVVGRkxFbEJRVWtzYjBKQlFXOUNPMFZCUVVNc2IwSkJRVzFDTEVWQlFVVTdSVUZCYlVJc1kwRkJZU3hGUVVGRk8wVkJRV0VzVDBGQlRTeEZRVUZGTzBOQlFWa3NRMEZCUXp0RFFVRkZMRWxCUVVjN1JVRkJReXhQUVVGUExFMUJRVTBzYVVKQlFXbENPMGRCUVVNc1kwRkJZU3hGUVVGRk8wZEJRV0VzYVVKQlFXZENMRVZCUVVVN1IwRkJUU3hWUVVGVExFVkJRVVU3UjBGQlV5eE5RVUZMTEVWQlFVVTdSMEZCU3l4blFrRkJaU3hGUVVGRk8wZEJRV1VzYlVKQlFXdENMRVZCUVVVN1IwRkJhMElzWTBGQllTeEZRVUZGTzBWQlFWa3NRMEZCUXl4SFFVRkZPMGRCUVVNc1VVRkJUeXhOUVVGTkxFVkJRVVVzWTBGQll6dEhRVUZGTEdWQlFWa3NSVUZCUlN4UlFVRlJPMFZCUVVNN1EwRkJReXhUUVVGUExFZEJRVVU3UlVGQlF5eE5RVUZOTEUxQlFVMHNSVUZCUlN4UlFVRlJMRWRCUVVVN1EwRkJRenRCUVVGRE96czdRVU5EZUd4Q0xFbEJRVmNzYjBKQlFXOUNMRmRCUVZjc1QwRkJUeXhKUVVGSkxHMUNRVUZ0UWl4RlFVRkZMRU5CUVVNc2NVTkJRWEZET3pzN1FVTkJhRWdzU1VGQlZ5d3dRa0ZCTUVJc1YwRkJWeXhQUVVGUExFbEJRVWtzYlVKQlFXMUNMRVZCUVVVc1EwRkJReXd5UTBGQk1rTTdPenRCUTBFMVNDeEpRVUZYTEdsRFFVRnBReXhYUVVGWExFOUJRVThzU1VGQlNTeHRRa0ZCYlVJc1JVRkJSU3hEUVVGRExHdEVRVUZyUkRzN08wRkRRVEZKTEVsQlFWY3NNRUpCUVRCQ0xGZEJRVmNzVDBGQlR5eEpRVUZKTEcxQ1FVRnRRaXhGUVVGRkxFTkJRVU1zTWtOQlFUSkRPenM3UVVORVR5eFRRVUZUTERCQ1FVRXdRaXhIUVVGRk8wTkJRVU1zU1VGQlNTeEhRVUZGTEVsQlFVVXNRMEZCUXl4SFFVRkZMRWxCUVVVc1EwRkJReXhIUVVGRkxFbEJRVVVzUjBGQlJTeEpRVUZGTEUxQlFVc3NSMEZCUlN4SFFVRkZMRmRCUVZFc1RVRkJSenRGUVVGRExFVkJRVVVzUzBGQlN5eERRVUZETEVkQlFVVXNSVUZCUlN4TlFVRk5MRWRCUVVVc1RVRkJTU3hGUVVGRkxGRkJRVTBzUlVGQlJTeExRVUZMTEVkQlFVVXNTVUZCU1N4SFFVRkZMRWxCUVVVc1MwRkJTenREUVVGRExFZEJRVVVzVDBGQlNTeE5RVUZITzBWQlFVTXNSVUZCUlN4VlFVRlJMRVZCUVVVc1dVRkJWU3hGUVVGRkxGVkJRVkVzUTBGQlF5eEhRVUZGTEVWQlFVVXNWMEZCVXl4TFFVRkxMRWxCUVVjc1JVRkJSU3hWUVVGUkxGRkJRVkVzVVVGQlVTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRMRTFCUVVzc1QwRkJTVHRIUVVGRExFMUJRVXNzUTBGQlF6dEhRVUZGTEU5QlFVMDdSVUZCUXl4RlFVRkZMRWxCUVVVc1JVRkJSU3hUUVVGVExFdEJRVXNzUlVGQlFTeERRVUZITEUxQlFVc3NUVUZCUnp0SFFVRkRMRWxCUVVrc1NVRkJSVHRKUVVGRExFOUJRVTA3U1VGQlNTeFJRVUZQTzBsQlFVVXNUMEZCVFR0SFFVRkRPMGRCUVVVc1JVRkJSU3hYUVVGVExFZEJRVVVzUlVGQlJTeFhRVUZUTEZGQlFWRXNRMEZCUXp0RlFVRkRMRk5CUVUwc1EwRkJReXhEUVVGRE8wTkJRVVVzUjBGQlJTeFZRVUZQTEUxQlFVYzdSVUZCUXl4RlFVRkZMRlZCUVZFc1EwRkJReXhIUVVGRkxFVkJRVVVzWVVGQlZ5eExRVUZMTEV0QlFVY3NVVUZCVVN4RlFVRkZMRkZCUVZFN1EwRkJReXhIUVVGRkxHRkJRVmNzV1VGQlV6dEZRVUZETEVsQlFVY3NUVUZCU1N4TlFVRkxMRXRCUVVrc1RVRkJUU3hSUVVGUkxGRkJRVkVzUjBGQlJTeEZRVUZGTEZOQlFVOHNTVUZCUnp0SFFVRkRMRWxCUVVrc1NVRkJSU3hGUVVGRkxFMUJRVTA3UjBGQlJTeEZRVUZGTEUxQlFVMHNWVUZCVVN4RFFVRkRMRWRCUVVVc1JVRkJSU3hOUVVGTkxGZEJRVk1zUzBGQlN5eEhRVUZGTEVWQlFVVXNUMEZCVHl4UFFVRkxMRVZCUVVVc1RVRkJUU3hUUVVGUExFTkJRVU1zU1VG",
	"QlJTeEZRVUZGTEU5QlFVOHNUVUZCVFN4VFFVRlBMR0ZCUVZjc1JVRkJSU3hMUVVGTExFVkJRVVVzVDBGQlR5eExRVUZMTEVkQlFVVXNTVUZCU1N4RlFVRkZMRXRCUVVzc1IwRkJSU3hOUVVGTkxGRkJRVkVzVVVGQlVUdEZRVUZETzBOQlFVTTdRMEZCUlN4UFFVRk5PMFZCUVVNc1kwRkJZVHRIUVVGRExFbEJRVWNzVFVGQlNTeExRVUZMTEVkQlFVVXNUVUZCVFN4TlFVRk5MSE5FUVVGelJEdEhRVUZGTEVWQlFVVXNUVUZCVFN4VlFVRlJMRU5CUVVNc1IwRkJSU3hGUVVGRkxFMUJRVTBzVjBGQlV5eExRVUZMTEVkQlFVVXNSVUZCUlN4UFFVRlBMRk5CUVU4c1JVRkJSU3hOUVVGTkxGTkJRVThzUTBGQlF5eEpRVUZITEVsQlFVVXNTMEZCU3l4SFFVRkZMRWxCUVVVN1JVRkJTVHRGUVVGRkxFMUJRVTBzVlVGQlV6dEhRVUZETEUxQlFVa3NTMEZCU3l4TlFVRkpMRTFCUVUwc1dVRkJXU3hGUVVGRkxFbEJRVWtzUjBGQlJTeEpRVUZGTEV0QlFVczdSVUZCUlR0RlFVRkZMRTlCUVUwN1IwRkJReXhKUVVGSExFMUJRVWtzUzBGQlN5eEhRVUZGTEUxQlFVMHNUVUZCVFN4elJVRkJjMFU3UjBGQlJTeEpRVUZITEUxQlFVa3NUVUZCU3l4UFFVRlBPMGRCUVVVc1NVRkJTU3hEUVVGRE8wZEJRVVVzUzBGQlNTeEpRVUZKTEV0QlFVc3NSMEZCUlN4SlFVRkpMRU5CUVVNN1IwRkJSU3hQUVVGUExFVkJRVVVzVlVGQlVTeEZRVUZGTEU5QlFVMHNUVUZCUnl4RlFVRkZMRTFCUVUwc1MwRkJSeXhKUVVGRk8wbEJRVU1zVDBGQlRUdEpRVUZKTEZGQlFVODdTMEZCUXl4TlFVRkxMRU5CUVVNN1MwRkJSU3hQUVVGTkxFdEJRVXM3U1VGQlF6dEpRVUZGTEU5QlFVMDdSMEZCUXl4SFFVRkZMRWxCUVVVc1VVRkJVU3hSUVVGUkxFVkJRVVVzVFVGQlRTeEhRVUZGTEUxQlFVa3NTMEZCUnl4WlFVRlRPMGxCUVVNc1QwRkJTeXhGUVVGRkxGZEJRVk1zU1VGQlJ5eE5RVUZOTEVsQlFVa3NVMEZCVVN4TlFVRkhPMHRCUVVNc1NVRkJSVHRKUVVGRExFTkJRVU03U1VGQlJTeEpRVUZKTEVsQlFVVXNSVUZCUlN4TlFVRk5PMGxCUVVVc1QwRkJUeXhKUVVGRkxFZEJRVVVzUlVGQlJUdEhRVUZOTEVWQlFVRXNRMEZCUnl4SFFVRkZPMFZCUVVVN1JVRkJSU3hOUVVGTkxFMUJRVTBzUjBGQlJUdEhRVUZETEVsQlFVY3NRMEZCUXl4TFFVRkhMRWRCUVVjc1MwRkJTeXhWUVVGUkxFZEJRVVU3UjBGQlR5eEpRVUZKTEVsQlFVVXNWMEZCVnl4RlFVRkRMRTlCUVUwc1JVRkJReXhEUVVGRExFZEJRVVVzU1VGQlJUdEpRVUZETEZGQlFVOHNRMEZCUXp0SlFVRkZMRk5CUVZFc1EwRkJRenRKUVVGRkxFMUJRVXM3U1VGQlJTeFZRVUZUTEVWQlFVVXNUMEZCVHl4alFVRmpMRU5CUVVNN1NVRkJSU3hUUVVGUkxFTkJRVU03U1VGQlJTeFRRVUZSTEVOQlFVTTdSMEZCUXp0SFFVRkZMRWxCUVVjc1RVRkJTU3hMUVVGTExFZEJRVVU3U1VGQlF5eE5RVUZOTEcxQ1FVRnRRaXhGUVVGRkxFbEJRVWtzUjBGQlJTeFBRVUZQTEVOQlFVTXNSMEZCUlN4SlFVRkZPMGxCUVVVN1IwRkJUVHRIUVVGRExFbEJRVWtzU1VGQlJUdEhRVUZGTEVsQlFVa3NRMEZCUXl4SFFVRkZMRWxCUVVrc1EwRkJReXhIUVVGRkxFMUJRVTBzYlVKQlFXMUNMRVZCUVVVc1NVRkJTU3hIUVVGRkxFOUJRVThzUTBGQlF5eEhRVUZGTEUxQlFVMHNWMEZCVnp0SFFVRkZMRWxCUVVjN1NVRkJReXhOUVVGTkxGbEJRVmtzUlVGQlJTeEpRVUZKTzBkQlFVTXNVMEZCVHl4SFFVRkZPMGxCUVVNc1NVRkJSU3hMUVVGTE8wbEJRVVVzU1VGQlJ6dExRVUZETEUxQlFVMHNXVUZCV1N4RlFVRkZMRWxCUVVrN1NVRkJReXhSUVVGTkxFTkJRVU03U1VGQlF5eE5RVUZOTzBkQlFVTTdSMEZCUXl4RlFVRkZMRlZCUVZFc1EwRkJReXhIUVVGRkxFVkJRVVVzUzBGQlN5eERRVUZETEVkQlFVVXNTVUZCUlN4SFFVRkZMRTFCUVUwc1YwRkJWenRGUVVGRE8wTkJRVU03UVVGQlF6czdPMEZEUTNKNFFpeGxRVUZsTEdOQlFXTXNSMEZCUlR0RFFVRkRMRWxCUVVjc1JVRkJReXhsUVVGakxFMUJRVWNzYjBKQlFXOUNMRWRCUVVVc1NVRkJSU3hGUVVGRkxHdENRVUZyUWl3MFFrRkJNRUlzU1VGQlJ5eEpRVUZGTEVWQlFVVXNhMEpCUVd0Q0xHRkJRVmtzU1VGQlJTeEZRVUZGTEd0Q1FVRnJRaXh4UWtGQmIwSXNTVUZCUlN4RlFVRkZMR3RDUVVGclFqdERRVUZqTEVWQlFVVXNhMEpCUVd0Q0xHMUNRVUZwUWp0RFFVRkZMRWxCUVVrc1NVRkJSU3haUVVGWk8wTkJRVVVzU1VGQlJ6dEZRVUZETEVsQlFVa3NTVUZCUlN4clFrRkJhMElzUlVGQlJTeHBRa0ZCYVVJc1IwRkJSU3hKUVVGRkxEUkNRVUUwUWl4RlFVRkZMR2xDUVVGcFFpeEhRVUZGTEVWQlFVTXNUMEZCVFN4TlFVRkhMRTFCUVUwc2EwSkJRV3RDTzBkQlFVTXNlVUpCUVhkQ0xFVkJRVVU3UjBGQlR5eHRRa0ZCYTBJN1IwRkJSU3hwUWtGQlowSXNSVUZCUlR0SFFVRlBMRkZCUVU4c1JVRkJSVHRIUVVGUExHTkJRV0VzUlVGQlJTeE5RVUZOTzBkQlFXRXNaVUZCWXp0SFFVRkZMRmRCUVZVN1IwRkJSU3hsUVVGak8wVkJRVU1zUTBGQlF6dEZRVUZGTEU5QlFVOHNUVUZCVFN4alFVRmpPMGRCUVVNc1kwRkJZVHRIUVVGRkxHZENRVUZsTzBkQlFVVXNZMEZCWVR0SlFVRkRMRTFCUVVzN1NVRkJWU3hWUVVGVExFTkJRVU03UzBGQlF5eFRRVUZSTEVWQlFVVXNUVUZCVFR0TFFVRlJMRk5CUVZFc1JVRkJSU3hOUVVGTk8wdEJRVkVzWTBGQllTeEZRVUZGTEUxQlFVMDdTVUZCV1N4RFFVRkRPMGxCUVVVc1YwRkJWU3h4UWtGQmNVSXNSVUZCUlN4cFFrRkJhVUk3UjBGQlF6dEhRVUZGTEUxQlFVczdSMEZCUlN4dFFrRkJhMElzUlVGQlJUdEhRVUZyUWl4alFVRmhPMFZCUVVNc1EwRkJRenREUVVGRExGTkJRVThzUjBGQlJUdEZRVUZETEUxQlFVMHNUVUZCVFN3clFrRkJLMEk3UjBGQlF5eFBRVUZOTERKQ1FVRXlRaXhEUVVGRE8wZEJRVVVzWjBKQlFXVTdSMEZCUlN4dFFrRkJhMElzUlVGQlJUdEZRVUZwUWl4RFFVRkRMRWRCUVVVc1RVRkJUU3gzUWtGQmQwSTdSMEZCUXl4UFFVRk5MREpDUVVFeVFpeERRVUZETzBkQlFVVXNiVUpCUVd0Q0xFVkJRVVU3UjBGQmEwSXNVVUZCVHp0RlFVRlJMRU5CUVVNc1IwRkJSU3hOUVVGTkxEQkNRVUV3UWp0SFFVRkRMRkZCUVU4c2JVTkJRVzFETEVWQlFVVXNiVUpCUVd0Q0xFTkJRVU03UjBGQlJTeHRRa0ZCYTBJc1JVRkJSVHRGUVVGcFFpeERRVUZETEVkQlFVVTdRMEZCUXp0QlFVRkRPMEZCUVVNc1pVRkJaU3hqUVVGakxFZEJRVVU3UTBGQlF5eEpRVUZKTEVsQlFVVXNWMEZCVnl4RlFVRkRMRTlCUVUwc1IwRkJSeXhGUVVGRkxHRkJRV0VzVlVGQlZTeFBRVUZOTEVOQlFVTXNSMEZCUlN4SlFVRkZMRVZCUVVVc1QwRkJUeXhqUVVGakxFTkJRVU1zUjBGQlJTeEpRVUZGTEVkQlFVVXNOa0pCUVhsQ0xFZEJRVWNzUlVGQlJTeGhRVUZoTEZWQlFWVXNaMEpCUVdkQ0xFOUJRVThzUjBGQlJ5eExRVUZKTEVsQlFVVXNRMEZCUXl4SFFVRkZMRWxCUVVVc01FSkJRVEJDTEVOQlFVTXNSMEZCUlN4SFFVRkZMRlZCUVZFc1QwRkJUU3hOUVVGSE8wVkJRVU1zU1VGQlNTeEpRVUZGTEUxQlFVMHNjVUpCUVhGQ08wZEJRVU1zYjBKQlFXMUNPMGRCUVVVc1kwRkJZU3hGUVVGRk8wZEJRV0VzWTBGQllTeHhRa0ZCY1VJN1IwRkJSU3hWUVVGVExFVkJRVVU3UjBGQlV5eGpRVUZoTzBkQlFVVXNUVUZCU3l4RlFVRkZPMGRCUVVzc1owSkJRV1VzUlVGQlJUdEhRVUZsTEcxQ1FVRnJRaXhGUVVGRk8wZEJRV3RDTEdOQlFXRXNSVUZCUlR0RlFVRlpMRU5CUVVNN1JVRkJSU3hQUVVGUExFMUJRVTBzU1VGQlNTeEhRVUZGTEVsQlFVVXNSVUZCUlN4VFFVRlJMRVZCUVVVN1EwRkJUVHREUVVGRkxFbEJRVWM3UlVGQlF5eEZRVUZGTEdGQlFXRXNjVUpCUVcxQ0xFMUJRVTBzUlVGQlJTeE5RVUZOTEVWQlFVVXNZVUZCWVN4cFFrRkJhVUk3UlVGQlJTeEpRVUZKTEVsQlFVVXNUVUZCVFN4UlFVRlJPMGRCUVVNc1ZVRkJVeXhGUVVGRk8wZEJRV0VzYlVKQlFXdENMRVZCUVVVN1IwRkJhMElzWTBGQllTeEZRVUZGTzBWQlFWa3NRMEZCUXp0RlFVRkZMRk5CUVU4N1IwRkJReXhKUVVGSExFVkJRVVVzVTBGQlR5eFJRVUZQTEU5QlFVOHNUVUZCVFN4aFFVRmhPMGxCUVVNc1VVRkJUenRKUVVGRkxHZENRVUZsTEVWQlFVVTdSMEZCWXl4RFFVRkRPMGRCUVVVc1NVRkJSeXhGUVVGRkxGTkJRVThzVVVGQlR5eE5RVUZOTEUxQlFVMHNNa05CUVRKRExFVkJRVVVzUzBGQlN5eEhRVUZITzBkQlFVVXNTVUZCUnl4RlFVRkZMR05CUVZrc1EwRkJReXhIUVVGRk8wbEJRVU1zU1VGQlNTeEpRVUZGTEUxQlFVMHNkMEpCUVhkQ08wdEJRVU1zWjBKQlFXVXNSVUZCUlR0TFFVRmxMRzFDUVVGclFpeEZRVUZGTzB0QlFXdENMR05CUVdFc1JVRkJSVHRKUVVGWkxFTkJRVU03U1VGQlJTeEpRVUZGTzB0QlFVTXNSMEZCUnp0TFFVRkZMRzFDUVVGclFpeEZRVUZGTzB0QlFXdENMR05CUVdFc1JVRkJSVHRKUVVGWk8wZEJRVU03UjBGQlF5eEpRVUZITEVOQlFVTXNSVUZCUlN4aFFVRmhMRzFDUVVGclFpeE5RVUZOTEUxQlFVMHNjMDFCUVhOTk8wZEJRVVVzU1VGQlJ5eE5RVUZOTEVWQlFVVXNUVUZCVFN4RlFVRkZMR0ZCUVdFc2FVSkJRV2xDTEVkQlFVVXNSVUZCUlN4elFrRkJiMElzUlVGQlJTeHRRa0ZCYlVJc1UwRkJUeXhIUVVGRk8wbEJRVU1zU1VGQlNTeEpRVUZGTEVWQlFVVXNiVUpCUVcxQ0xGRkJRVThzU1VGQlJTeERRVUZETzBsQlFVVXNUMEZCU3l4RlFVRkZMRk5CUVU4c1NVRkJSenRMUVVGRExFbEJRVWtzU1VGQlJTeE5RVUZOTEVWQlFVVXNTMEZCU3p0TFFVRkZMRWxCUVVjc1JVRkJSU3hOUVVGTE8wdEJRVTBzUlVGQlJTeE5RVUZOTEZOQlFVOHNZVUZCVnl4RlFVRkZMRXRCUVVzc1IwRkJSeXhGUVVGRkxFMUJRVTBzVVVGQlVUdEpRVUZETzBsQlFVTXNTVUZCUlN4TlFVRk5MRkZCUVZFN1MwRkJReXhWUVVGVE8wMUJRVU1zVFVGQlN6dE5RVUZWTEZWQlFWTTdTMEZCUXp0TFFVRkZMRzFDUVVGclFpeEZRVUZGTzB0QlFXdENMR05CUVdFc1JVRkJSVHRKUVVGWkxFTkJRVU03U1VGQlJUdEhRVUZSTzBkQlFVTXNTVUZCU1N4SlFVRkZMRTFCUVUwc2JVSkJRVzFDTzBsQlFVTXNiMEpCUVcxQ08wbEJRVVVzWTBGQllUdEhRVUZETEVOQlFVTTdSMEZCUlN4SlFVRkhMRTFCUVVrc1RVRkJTeXhQUVVGTkxFVkJRVU1zVVVGQlR5eEhRVUZGTzBkQlFVVXNTVUZCU1N4SlFVRkZMRTFCUVUwc2RVSkJRWFZDTzBsQlFVTXNUVUZCU3l4RlFVRkZPMGxCUVVzc1owSkJRV1VzUlVGQlJUdEpRVUZsTEZWQlFWTXNSVUZCUlR0SlFVRlRMR05CUVdFc1JVRkJSVHRIUVVGWkxFTkJRVU03UjBGQlJTeE5RVUZKTEV0QlFVc3NUVUZCU1N4SlFVRkZMRTFCUVUwc1VVRkJVVHRKUVVGRExGVkJRVk03UzBGQlF5eE5RVUZMTEVWQlFVVTdTMEZCU3l4TlFVRkxPMHRCUVZVc1ZVRkJVeXhEUVVGRExFTkJRVU03UzBGQlJTeFhRVUZWTEVWQlFVVTdTVUZCVXp0SlFVRkZMRzFDUVVGclFpeEZRVUZGTzBsQlFXdENMR05CUVdFc1JVRkJSVHRIUVVGWkxFTkJRVU03UlVGQlJUdERRVUZETEZWQlFWRTdSVUZCUXl4TlFVRk5MRWxCUVVrc1IwRkJSU3hOUVVGTkxFVkJRVVVzVVVGQlVTeEhRVUZGTEUxQlFVMHNXVUZCV1N4RFFVRkRPME5CUVVNN1FVRkJRenRCUVVGRExHVkJRV1VzWVVGQllTeEhRVUZGTzBOQlFVTXNTVUZCUnl4RlFVRkRMRkZCUVU4c1IwRkJSU3h0UWtGQmEwSXNUVUZCUnl4RlFVRkZMRkZCUVU4c1NVRkJSU3hGUVVGRkxFOUJRVThzV1VGQlZTeERRVUZETzBOQlFVVXNUMEZCVHl4TlFVRk5MSGRDUVVGM1FqdEZRVUZETEU5QlFVMHNTVUZCUlN4SlFVRkZMRXRCUVVzN1JVRkJSU3hSUVVGUExFbEJRVVVzUzBGQlN5eEpRVUZGTzBWQlFVVXNiVUpCUVd0Q08wVkJRVVVzVVVGQlR5eEpRVUZGTEZkQlFWTTdSVUZCV1N4UFFVRk5MRWxCUVVVc1MwRkJTeXhKUVVGRkxFVkJRVVVzVDBGQlR6dERRVUZMTEVOQlFVTXNSMEZCUlN4TlFVRk5MREJDUVVFd1FqdEZRVUZETEZGQlFVOHNTVUZCUlN4dFEwRkJiVU1zUjBGQlJTeERRVUZETEVsQlFVVXNjVU5CUVhGRExFZEJRVVVzUTBGQlF6dEZRVUZGTEcxQ1FVRnJRanRGUVVGRkxFOUJRVTBzU1VGQlJTeExRVUZMTEVsQlFVVXNSVUZCUlN4UFFVRlBPME5CUVVzc1EwRkJReXhIUVVGRkxFVkJRVU1zVVVGQlR5eEZRVUZETzBGQlFVTTdRVUZCUXl4bFFVRmxMRzFDUVVGdFFpeEhRVUZGTzBOQlFVTXNTVUZCUnl4RlFVRkZMRzFDUVVGdFFpeFRRVUZQTEVkQlFVVXNUMEZCVHl4dFFrRkJiVUlzUlVGQlJTeHRRa0ZCYlVJc1QwRkJUeXhEUVVGRExFTkJRVU03UTBGQlJTeFRRVUZQTzBWQlFVTXNTVUZCU1N4SlFVRkZMRTFCUVUwc1JVRkJSU3hoUVVGaExFdEJRVXM3UlVGQlJTeEpRVUZITEVWQlFVVXNZVUZCWVN4WlFVRlpMRWRCUVVVc1JVRkJSU3hOUVVGTExFOUJRVTg3UlVGQlN5eEpRVUZITEVWQlFVVXNUVUZCVFN4VFFVRlBMRmRCUVZVN1JVRkJVeXhKUVVGSkxFbEJRVVVzUlVGQlJUdEZRVUZOTEZOQlFVODdSMEZCUXl4SlFVRkpMRWxCUVVVc1RVRkJUU3hwUWtGQmFVSXNSVUZCUlN4aFFVRmhMRXRCUVVzc1EwRkJRenRIUVVGRkxFbEJRVWNzVFVGQlNTeHhRa0ZCYlVJc1JVRkJSU3hoUVVGaExGbEJRVmtzUjBGQlJTeEZRVUZGTEU5QlFVMDdSMEZCVFN4RlFVRkZMRTFCUVUwc1UwRkJUeXhqUVVGWkxFbEJRVVVzYlVKQlFXMUNMRU5CUVVNc1IwRkJSU3hGUVVGRkxFdEJRVXNzUTBGQlF6dEZRVUZGTzBWQlFVTXNUMEZCVHp0RFFVRkRPMEZCUVVNN1FVRkJReXhOUVVGTkxHMUNRVUZwUWl4UFFVRlBMR3RDUVVGclFqdEJRVUZGTEdWQlFXVXNhVUpCUVdsQ0xFZEJRVVU3UTBGQlF5eFBRVUZQTEUxQlFVMHNVVUZCVVN4UlFVRlJMRWRCUVVVc1RVRkJUU3hSUVVGUkxFdEJRVXNzUTBGQlF5eEhRVUZGTEZGQlFWRXNVVUZCVVN4blFrRkJaMElzUTBGQlF5eERRVUZETzBGQlFVTTdRVUZEYW5OTUxHTkJRV01zWVVGQllUdEJRVU16UWl4WFFVRlhMRzlDUVVGdlFpeEpRVUZKTEdkRFFVRm5ReXhoUVVGaEluMD0K"
].join(""), "base64").toString("utf8"), { namespace: "eve6174656c6965722d6167656e74" });
//#endregion
//#region .eve/builds/mrudzgqh-04f710d0-6415-430e-bff4-3287454401fa/nitro/workflow/workflows-handler.mjs
var workflows_handler_default = async ({ req }) => {
	return await POST(req);
};
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/style.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"e5d-wto90jmW9bejsa7P9i2NMWeMETU\"",
		"mtime": "2026-07-21T08:12:09.272Z",
		"size": 3677,
		"path": "../public/style.css"
	},
	"/audit-le-petit-bistrot-FR.pdf": {
		"type": "application/pdf",
		"etag": "\"1a06-bft+tR0tUDFZgMh2IvbUOAHhlnw\"",
		"mtime": "2026-07-21T08:12:09.271Z",
		"size": 6662,
		"path": "../public/audit-le-petit-bistrot-FR.pdf"
	},
	"/portfolio.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"1421-FdcDHwOYvHXu1y/JRQOsFTR7VAs\"",
		"mtime": "2026-07-21T08:12:09.272Z",
		"size": 5153,
		"path": "../public/portfolio.html"
	},
	"/audit-le-petit-bistrot-EN.pdf": {
		"type": "application/pdf",
		"etag": "\"1966-tj1WSoXC8I0wLC+k+VQbrbXSAtg\"",
		"mtime": "2026-07-21T08:12:09.271Z",
		"size": 6502,
		"path": "../public/audit-le-petit-bistrot-EN.pdf"
	},
	"/Mockups/Biotiful.png": {
		"type": "image/png",
		"etag": "\"8d01-TjVWfP76t17YT8Sg165qRehbxcM\"",
		"mtime": "2026-07-21T08:12:09.265Z",
		"size": 36097,
		"path": "../public/Mockups/Biotiful.png"
	},
	"/Mockups/Baluserv.png": {
		"type": "image/png",
		"etag": "\"a192-N9I5of4zwvduSFQHbjDIh5c4LzA\"",
		"mtime": "2026-07-21T08:12:09.263Z",
		"size": 41362,
		"path": "../public/Mockups/Baluserv.png"
	},
	"/index.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"510c-OgHIYkti5e2QTqjtLyS+bXTazFQ\"",
		"mtime": "2026-07-21T08:12:09.272Z",
		"size": 20748,
		"path": "../public/index.html"
	},
	"/Mockups/Anda_Lazarov_Academy.png": {
		"type": "image/png",
		"etag": "\"a7c8-lHLcZPHzyC8215yrw9tsciR/87Q\"",
		"mtime": "2026-07-21T08:12:09.262Z",
		"size": 42952,
		"path": "../public/Mockups/Anda_Lazarov_Academy.png"
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
	"/Mockups/Kineto_Sport_MRC___BeFit_Smile.png": {
		"type": "image/png",
		"etag": "\"b096-m3+qKJM7I0laUkkHZG3hkNdYG6g\"",
		"mtime": "2026-07-21T08:12:09.268Z",
		"size": 45206,
		"path": "../public/Mockups/Kineto_Sport_MRC___BeFit_Smile.png"
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
		handler: toEventHandler(_eve_route_default)
	}, $1 = {
		route: "/eve/v1/health",
		method: "GET",
		handler: toEventHandler(health_default$1)
	}, $2 = {
		route: "/eve/v1/health",
		method: "HEAD",
		handler: toEventHandler(health_default)
	}, $3 = {
		route: "/eve/v1/info",
		method: "GET",
		handler: toEventHandler(info_default)
	}, $4 = {
		route: "/eve/v1/session",
		method: "POST",
		handler: toEventHandler(session_default)
	}, $5 = {
		route: "/.well-known/workflow/v1/flow",
		handler: toEventHandler(workflows_handler_default)
	}, $6 = {
		route: "/eve/v1/connections/:name/callback/:token",
		method: "GET",
		handler: toEventHandler(_token_default$2)
	}, $7 = {
		route: "/eve/v1/connections/:name/callback/:token",
		method: "POST",
		handler: toEventHandler(_token_default$1)
	}, $8 = {
		route: "/eve/v1/callback/:token",
		method: "POST",
		handler: toEventHandler(_token_default)
	}, $9 = {
		route: "/eve/v1/session/:sessionId",
		method: "POST",
		handler: toEventHandler(_sessionId_default)
	}, $10 = {
		route: "/eve/v1/session/:sessionId/cancel",
		method: "POST",
		handler: toEventHandler(cancel_default)
	}, $11 = {
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
			if (m === "HEAD") return { data: $2 };
		} else if (p === "/eve/v1/info") {
			if (m === "GET") return { data: $3 };
		} else if (p === "/eve/v1/session") {
			if (m === "POST") return { data: $4 };
		} else if (p === "/.well-known/workflow/v1/flow") return { data: $5 };
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
													data: $6,
													params: {
														"name": s[4],
														"token": s[6]
													}
												};
											}
											if (m === "POST") {
												if (l > 6) return {
													data: $7,
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
											data: $8,
											params: { "token": s[4] }
										};
									}
								}
							} else if (s[3] === "session") {
								if (l === 5 || l === 4) {
									if (m === "POST") {
										if (l > 4) return {
											data: $9,
											params: { "sessionId": s[4] }
										};
									}
								} else if (s[5] === "cancel") {
									if (l === 6) {
										if (m === "POST") return {
											data: $10,
											params: { "sessionId": s[4] }
										};
									}
								} else if (s[5] === "stream") {
									if (l === 6) {
										if (m === "GET") return {
											data: $11,
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
//#region .eve/builds/mrudzgqh-04f710d0-6415-430e-bff4-3287454401fa/host/compiled-artifacts-bootstrap.mjs
installEveWorkflowQueueNamespace("atelier-agent");
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
		"path": ".output/.eve/compile/module-map.mjs",
		"sha256": "67dd3ffbe348a6d64e14dd600c7653d960e0778535f70417e46e993a42642260"
	} },
	"discovery": {
		"diagnostics": {
			"path": ".output/.eve/discovery/diagnostics.json",
			"sha256": "b26fc8e66ee943f962b1bab4a790f6a611ce7e6738aa29f83ea53b73cc362c63"
		},
		"manifest": {
			"path": ".output/.eve/discovery/agent-discovery-manifest.json",
			"sha256": "3b3a11ac487ecee1c7512aa4c382c0a3311f9b2afedf2c7fa71ca14b47096149"
		},
		"sourceGraphHash": "161fad02d1bcdc58be27d52e1436e9a964e81eaf11f000e8d4abfd22464fb236",
		"summary": {
			"errors": 0,
			"warnings": 0
		}
	},
	"generator": {
		"name": "eve",
		"version": "0.26.1"
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
			"method": "GET",
			"urlPath": "/eve/v1/info",
			"sourceId": "channels/eve.ts",
			"sourceKind": "module",
			"adapterKind": "http"
		},
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
			"method": "POST",
			"urlPath": "/eve/v1/session/:sessionId/cancel",
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
	"extensionMounts": [],
	"subagentEdges": [],
	"subagents": [],
	"version": 36
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
//#endregion
//#region .eve/builds/mrudzgqh-04f710d0-6415-430e-bff4-3287454401fa/host/compiled-artifacts-workflow-world.mjs
const workflowWorld = await br({ dataDir: resolveLocalWorkflowWorldDataDirectory(process.cwd()) });
validateWorkflowWorld({
	packageName: void 0,
	world: workflowWorld
});
Zn(workflowWorld);
await Xn();
await workflowWorld.start?.();
function installWorkflowWorldPlugin() {}
//#endregion
//#region #nitro/virtual/plugins
const plugins = [
	installCompiledArtifactsPlugin,
	installWorkflowWorldPlugin,
	sandboxShutdownPlugin
];
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
