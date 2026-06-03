import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { systemInstruction } from "./kb.js";

const app = express();
const PORT = process.env.PORT || 8787;
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const apiKey = process.env.GEMINI_API_KEY;

// CORS: allow the site origin(s). Comma-separated ALLOWED_ORIGINS, or * by default.
const allowed = (process.env.ALLOWED_ORIGINS || "*").split(",").map((s) => s.trim());
app.use(
  cors({
    origin: allowed.includes("*") ? true : allowed,
    methods: ["POST", "GET", "OPTIONS"],
  })
);
app.use(express.json({ limit: "1mb" }));

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

app.get("/health", (_req, res) => res.json({ ok: true, model: MODEL, configured: !!apiKey }));

async function handleChat(req, res) {
  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];

  if (!ai) {
    return res.json({
      reply:
        "Our live assistant is being connected right now. In the meantime our team can help on WhatsApp at +61 411 888 504, or you can request a free quote and we will reply within 48 hours.",
    });
  }

  try {
    const contents = messages
      .filter((m) => m?.content?.trim())
      .slice(-12)
      .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: String(m.content) }] }));

    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: { systemInstruction, temperature: 0.6, maxOutputTokens: 600 },
    });

    const reply =
      response.text?.trim() ||
      "I am not certain about that one. Our team can help on WhatsApp at +61 411 888 504.";
    res.json({ reply });
  } catch (err) {
    console.error("chat error:", err?.message || err);
    res.status(200).json({
      reply: "I had trouble responding just now. Please try again, or reach our team on WhatsApp at +61 411 888 504.",
    });
  }
}

app.post("/chat", handleChat);
app.post("/api/chat", handleChat);

app.listen(PORT, () => console.log(`BBDV chatbot listening on :${PORT} (model ${MODEL}, configured: ${!!apiKey})`));
