/**
 * Blitz API Client
 * Docs: https://docs.blitz-api.ai
 * Rate limit: 5 requests/second
 */

import type { Lead } from "../lead-search";

const BASE_URL = "https://api.blitz-api.ai";

export class BlitzAPI {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async searchPeople(query: string, location: string, limit: number): Promise<Lead[]> {
    try {
      const resp = await fetch(`${BASE_URL}/v2/search/people`, {
        method: "POST",
        headers: {
          "x-api-key": this.key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: {
            location: { include: [location] },
          },
          person: {
            title: { include: query.split(" ") },
            seniority: { include: ["manager", "director", "vp", "head", "chief", "owner", "founder"] },
          },
          limit,
        }),
      });

      if (!resp.ok) {
        console.error(`Blitz API error: ${resp.status} ${resp.statusText}`);
        return [];
      }

      const data = await resp.json();
      const results = data?.data || data?.results || [];

      return results.map((r: any) => ({
        name: r.name || r.fullName || `${r.firstName || ""} ${r.lastName || ""}`.trim(),
        company: r.company || r.companyName || r.organization || "",
        email: r.email || r.workEmail,
        phone: r.phone || r.mobile,
        linkedin: r.linkedin || r.linkedinUrl,
        location: r.location || location,
        source: "blitz",
        details: r.title || r.jobTitle || query,
      }));
    } catch (err) {
      console.error("Blitz search failed:", err);
      return [];
    }
  }

  async enrichEmail(linkedinUrl: string): Promise<string | undefined> {
    try {
      const resp = await fetch(`${BASE_URL}/v2/enrichment/email`, {
        method: "POST",
        headers: {
          "x-api-key": this.key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ linkedin_url: linkedinUrl }),
      });
      const data = await resp.json();
      return data?.email || data?.workEmail;
    } catch {
      return undefined;
    }
  }
}
