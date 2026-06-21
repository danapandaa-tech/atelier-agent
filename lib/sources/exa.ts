/**
 * Exa API Client
 * Backup lead source — finds businesses by search query
 */

import type { Lead } from "../lead-search";

const BASE_URL = "https://api.exa.ai";

export class ExaAPI {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async searchBusinesses(query: string, location: string, limit: number): Promise<Lead[]> {
    try {
      const resp = await fetch(`${BASE_URL}/search`, {
        method: "POST",
        headers: {
          "x-api-key": this.key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `${query} ${location} Romania`,
          type: "auto",
          numResults: limit,
          contents: { highlights: true },
        }),
      });

      if (!resp.ok) {
        console.error(`Exa API error: ${resp.status}`);
        return [];
      }

      const data = await resp.json();
      const results = data?.results || [];

      return results.map((r: any) => ({
        name: r.title || r.name || "Unknown",
        company: r.title || r.name || "",
        email: r.email,
        linkedin: r.linkedin,
        location,
        source: "exa",
        details: (r.highlights || []).join(" ").substring(0, 200),
      }));
    } catch (err) {
      console.error("Exa search failed:", err);
      return [];
    }
  }
}
