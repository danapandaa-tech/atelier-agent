import { defineAgent } from "eve";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const openrouter = createOpenAICompatible({
  name: "openrouter",
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "https://indigos.uk",
    "X-Title": "Indigo Atelier Agent",
  },
});

export default defineAgent({
  model: openrouter("nvidia/nemotron-3-super-120b-a12b:free"),
  modelContextWindowTokens: 64_000,
});
