/**
 * Prospeo API Client
 * Docs: https://prospeo.io/api-docs
 * Rate limit: 1 request/second, 20/min, 50/day (free)
 */

import type { Lead } from "../lead-search";

const BASE_URL = "https://api.prospeo.io";

export class ProspeoAPI {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async searchPeople(query: string, location: string, limit: number): Promise<Lead[]> {
    try {
      const resp = await fetch(`${BASE_URL}/v2/search/people`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `${query} ${location}`,
          limit,
          offset: 0,
        }),
      });

      if (!resp.ok) {
        console.error(`Prospeo API error: ${resp.status}`);
        return [];
      }

      const data = await resp.json();
      const results = data?.results || data?.data || [];

      return results.map((r: any) => ({
        name: r.name || r.fullName || `${r.firstName || ""} ${r.lastName || ""}`.trim(),
        company: r.company || r.companyName || r.organization || "",
        email: r.email || r.workEmail,
        phone: r.phone || r.mobile,
        linkedin: r.linkedin || r.linkedinUrl,
        location: r.location || location,
        source: "prospeo",
        details: r.title || r.jobTitle || query,
      }));
    } catch (err) {
      console.error("Prospeo search failed:", err);
      return [];
    }
  }
}
