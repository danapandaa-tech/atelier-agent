import { defineAgent } from "eve";

export default defineAgent({
  // Vercel AI Gateway — $5 free credits every 30 days (refreshes monthly)
  // deepseek-v4-flash: ~$0.20/1M input tokens → $5 = ~25M tokens
  // For lead search + email gen, this is plenty for a free product
  model: "deepseek/deepseek-v4-flash",
});
