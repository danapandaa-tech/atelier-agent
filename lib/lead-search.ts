/**
 * Lead Search Library
 * Supports Blitz API, Prospeo, and Exa as lead sources
 */

import { BlitzAPI } from "./sources/blitz";
import { ProspeoAPI } from "./sources/prospeo";
import { ExaAPI } from "./sources/exa";

export interface SearchParams {
  query: string;
  location: string;
  language: "romanian" | "french";
  maxResults: number;
  source: "blitz" | "prospeo" | "exa";
}

export interface Lead {
  name: string;
  company: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  location: string;
  source: string;
  details: string;
}

const blitz = new BlitzAPI(process.env.BLITZ_API_KEY || "blitz-019ee77a-81f8-73bd-b023-cc9652024dcb");
const prospeo = new ProspeoAPI(process.env.PROSPEO_API_KEY || "pk_63ecd04c486d350417661f2cc2f5a398b529ec91e3dbc46f4d6ab00d918c4144");
const exa = new ExaAPI(process.env.EXA_API_KEY || "47a504ab-feb4-434f-bda0-b356232cc287");

export const leadSearch = {
  async search(params: SearchParams): Promise<Lead[]> {
    switch (params.source) {
      case "blitz":
        return blitz.searchPeople(params.query, params.location, params.maxResults);
      case "prospeo":
        return prospeo.searchPeople(params.query, params.location, params.maxResults);
      case "exa":
      default:
        return exa.searchBusinesses(params.query, params.location, params.maxResults);
    }
  },
};
