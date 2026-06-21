import { defineTool } from "eve/tools";

export default defineTool({
  description: "Search for B2B leads using Blitz API. Provide business type/query and location. Defaults to French cities.",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Business type (e.g. 'restaurant', 'nail salon', 'boulangerie', 'cabinet dentaire', 'agence immobilière')" },
      location: { type: "string", description: "City (default: 'Paris'). French cities: Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes, Lille, Strasbourg, Nice, Montpellier" },
      max_results: { type: "number", description: "Max results (default 5)", default: 5 },
    },
    required: ["query"],
  },
  async execute(input: Record<string, unknown>) {
    const query = input.query as string;
    const location = (input.location as string) || "Paris";
    const max_results = (input.max_results as number) || 5;
    const BLITZ_KEY = process.env.BLITZ_API_KEY;
    if (!BLITZ_KEY) return { error: "BLITZ_API_KEY not set", leads: [], count: 0 };

    try {
      const resp = await fetch("https://api.blitz-api.ai/v2/search/people", {
        method: "POST",
        headers: { "x-api-key": BLITZ_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          company: { location: { include: [location] } },
          person: {
            title: { include: query.split(" ") },
            seniority: { include: ["manager", "director", "vp", "owner", "founder"] },
          },
          limit: max_results,
        }),
      });
      if (!resp.ok) return { error: `Blitz API error: ${resp.status}`, leads: [], count: 0 };
      const data = await resp.json();
      const leads = (data?.data || []).map((r: any) => ({
        name: r.name || "",
        company: r.company || "",
        email: r.email || null,
        location,
        source: "blitz",
      }));
      return { leads, count: leads.length };
    } catch (err: any) {
      return { error: err.message, leads: [], count: 0 };
    }
  },
});
