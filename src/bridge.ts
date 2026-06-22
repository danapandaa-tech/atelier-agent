/**
 * EVE ↔ Hermes Bridge
 * 
 * This is the cloud proxy that:
 * 1. Receives Telegram messages 24/7 (via EVE on Vercel)
 * 2. Checks if Hermes (local) is online
 * 3. Forwards to Hermes if online, handles locally if offline
 * 
 * Environment variables needed:
 * - HERMES_URL: URL of local Hermes gateway (e.g., http://localhost:3000)
 * - TELEGRAM_BOT_TOKEN: Your Telegram bot token
 * - OPENROUTER_API_KEY: OpenRouter API key for cloud processing
 */

import { Telegraf } from "telegraf";

const HERMES_URL = process.env.HERMES_URL || "http://localhost:3000";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Check if Hermes is online
async function isHermesOnline(): Promise<boolean> {
  try {
    const resp = await fetch(`${HERMES_URL}/api/health`, { 
      method: "GET",
      signal: AbortSignal.timeout(3000) 
    });
    return resp.ok;
  } catch {
    return false;
  }
}

// Forward message to Hermes
async function forwardToHermes(text: string, chatId: number): Promise<string> {
  const resp = await fetch(`${HERMES_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text, chat_id: chatId }),
  });
  const data = await resp.json();
  return data.response || "Hermes processed your message.";
}

// Handle message locally (when Hermes is offline)
async function handleLocally(text: string): Promise<string> {
  // Use OpenRouter free model for basic responses
  const { generateText } = await import("ai");
  const { createOpenRouter } = await import("@ai-sdk/openrouter");
  
  const openrouter = createOpenRouter({ 
    apiKey: process.env.OPENROUTER_API_KEY 
  });
  
  const { text: response } = await generateText({
    model: openrouter("google/gemma-4-31b-it:free"),
    system: "You are Tris, Indigo Atelier's AI assistant. Hermes (the main brain) is currently offline. Handle basic queries yourself and let Dana know when Hermes is back online.",
    prompt: text,
    maxTokens: 500,
  });
  
  return response;
}

// Main handler
export async function handleTelegramMessage(text: string, chatId: number): Promise<string> {
  const hermesOnline = await isHermesOnline();
  
  if (hermesOnline) {
    return await forwardToHermes(text, chatId);
  } else {
    return await handleLocally(text);
  }
}

// Telegram bot setup (for Vercel serverless)
export function createBot() {
  const bot = new Telegraf(TELEGRAM_BOT_TOKEN!);
  
  bot.on("text", async (ctx) => {
    const response = await handleTelegramMessage(ctx.message.text, ctx.chat.id);
    await ctx.reply(response);
  });
  
  return bot;
}
