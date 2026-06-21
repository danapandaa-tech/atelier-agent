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

const blitz = new BlitzAPI(process.env.BLITZ_API_KEY || "");
const prospeo = new ProspeoAPI(process.env.PROSPEO_API_KEY || "");
const exa = new ExaAPI(process.env.EXA_API_KEY || "");

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
