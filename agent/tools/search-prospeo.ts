import { defineTool } from "eve/tools";

export default defineTool({
  description: "Search for B2B leads using Prospeo API. Returns contacts with verified emails. Provide business type/query and location.",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Business type or job title (e.g. 'restaurant', 'nail salon', 'boulangerie')" },
      location: { type: "string", description: "City or region (e.g. 'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes', 'Lille', 'Strasbourg', 'Nice', 'Montpellier')" },
      max_results: { type: "number", description: "Max results (default 5, max 25)", default: 5 },
    },
    required: ["query", "location"],
  },
  async execute(input: Record<string, unknown>) {
    const query = input.query as string;
    const location = input.location as string;
    const max_results = Math.min((input.max_results as number) || 5, 25);
    const PROSPEO_KEY = process.env.PROSPEO_API_KEY || "pk_63ecd04c486d350417661f2cc2f5a398b529ec91e3dbc46f4d6ab00d918c4144";

    try {
      const resp = await fetch("https://api.prospeo.io/search-person", {
        method: "POST",
        headers: {
          "X-KEY": PROSPEO_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          filters: {
            person_search: { query: `${query} ${location}` },
            person_seniority: { include: ["Founder/Owner", "Director", "Manager", "VP"] },
            person_contact_details: { email: ["VERIFIED"], operator: "AND" },
            max_person_per_company: 1,
          },
        }),
      });

      if (!resp.ok) return { error: `Prospeo API error: ${resp.status}`, leads: [], count: 0 };

      const data = await resp.json();
      const results = data?.results || [];

      const leads = results.slice(0, max_results).map((r: any) => ({
        name: r.person?.name || `${r.person?.first_name || ""} ${r.person?.last_name || ""}`.trim(),
        company: r.company?.name || r.company?.website || "",
        email: r.person?.email || null,
        location,
        source: "prospeo",
        title: r.person?.job_title || "",
      }));

      return { leads, count: leads.length };
    } catch (err: any) {
      return { error: err.message, leads: [], count: 0 };
    }
  },
});
