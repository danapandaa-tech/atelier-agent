import { defineTool } from "eve/tools";
import { generateText } from "ai";
import { gateway } from "@ai-sdk/gateway";

export default defineTool({
  description: "Generate a personalized outreach email using AI. Provide business name, details, and language (french/english).",
  inputSchema: {
    type: "object",
    properties: {
      business_name: { type: "string", description: "Name of the business to contact" },
      details: { type: "string", description: "Details about the business (location, services, website, etc.)" },
      language: { type: "string", description: "Language: 'french' or 'english' (default: 'french')", default: "french" },
      contact_name: { type: "string", description: "Name of the contact person (optional)" },
    },
    required: ["business_name", "details"],
  },
  async execute(input: Record<string, unknown>) {
    const business_name = input.business_name as string;
    const details = input.details as string;
    const language = (input.language as string) || "french";
    const contact_name = (input.contact_name as string) || "";

    const greeting = contact_name
      ? (language === "french" ? `Bonjour ${contact_name},` : `Hi ${contact_name},`)
      : (language === "french" ? "Bonjour," : "Hi there,");

    const systemPrompt = language === "french"
      ? `Tu es copywriter pour Indigo Atelier, agence web et SEO/AIO pour PME françaises.\nRédige un email court et personnalisé en français (max 100 mots).\nTon: professionnel mais chaleureux, pas de spam, pas d'urgence.\nOffre: audit SEO/AIO gratuit + mockup de site web personnalisé.\nSignature: Indigo S / Atelier\nLien: https://artful-launchpad-hub.lovable.app\nCommence par: "${greeting}"\nL'email doit mentionner spécifiquement l'entreprise cible et un détail observé.`
      : `You are a copywriter for Indigo Atelier, a web and SEO/AIO agency for small businesses.\nWrite a short, personalized email in English (max 100 words).\nTone: professional but warm, no spam, no urgency.\nOffer: free SEO/AIO audit + personalized website mockup.\nSign as: Indigo S / Atelier\nLink: https://artful-launchpad-hub.lovable.app\nStart with: "${greeting}"\nThe email must mention the target business specifically and one observed detail.`;

    const userPrompt = language === "french"
      ? `Entreprise: ${business_name}. Détails: ${details}. Rédige l'email de prospection.`
      : `Business: ${business_name}. Details: ${details}. Write the outreach email.`;

    try {
      const { text } = await generateText({
        model: gateway("deepseek/deepseek-v4-flash"),
        system: systemPrompt,
        prompt: userPrompt,
        maxOutputTokens: 300,
        temperature: 0.7,
      });
      return { email: text };
    } catch (err: any) {
      return { error: err.message, email: "" };
    }
  },
});
