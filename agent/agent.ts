import { defineAgent } from "eve";
import { generateText } from "ai";
import { createOpenRouter } from "@ai-sdk/openrouter";

const openrouter = createOpenRouter({ 
  apiKey: process.env.OPENROUTER_API_KEY 
});

export default defineAgent({
  // Use OpenRouter free model as primary (works 24/7)
  model: "google/gemma-4-31b-it:free",
  
  // System prompt for when Hermes is offline
  system: `You are Tris, Indigo Atelier's AI assistant. You are running on EVE (Vercel cloud) because Hermes (the main local brain) is currently offline.

Your capabilities:
- Quick replies and basic questions
- Lead search (use web_search)
- Email drafting
- Opportunity scanning
- Portfolio and CV help

When Hermes comes back online, you'll automatically forward complex tasks to it.

Be helpful, concise, and professional. Sign as "Indigo S / Atelier".`,
});
