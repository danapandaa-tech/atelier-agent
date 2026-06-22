// EVE ↔ Hermes Bridge API
// This runs on Vercel and acts as a cloud proxy

import { handleTelegramMessage } from "../src/bridge";

// Health check
export function GET_health() {
  return Response.json({ 
    status: "ok", 
    service: "eve-bridge",
    timestamp: new Date().toISOString() 
  });
}

// Telegram webhook handler
export async function POST_telegram(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message;
    
    if (!message?.text) {
      return Response.json({ ok: true });
    }
    
    const chatId = message.chat.id;
    const text = message.text;
    
    // Process through bridge
    const response = await handleTelegramMessage(text, chatId);
    
    // Send response back via Telegram API
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (token) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: response,
        }),
      });
    }
    
    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("Bridge error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// Direct chat endpoint (for testing)
export async function POST_bridge(request: Request) {
  try {
    const { message } = await request.json();
    const response = await handleTelegramMessage(message, 0);
    return Response.json({ response });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
