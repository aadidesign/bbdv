import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { fullSystemInstruction } from "@/lib/chat-kb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({
      reply:
        "Our live assistant is being connected right now. In the meantime our team can answer anything on WhatsApp at +61 411 888 504, or you can request a free quote and we will reply within 48 hours.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const contents = messages
      .filter((m) => m.content?.trim())
      .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));

    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: fullSystemInstruction(),
        temperature: 0.6,
        maxOutputTokens: 600,
      },
    });

    const reply = response.text?.trim() || "I am not certain about that one. Our team can help on WhatsApp at +61 411 888 504.";
    return NextResponse.json({ reply });
  } catch (e) {
    console.error("chat error", e);
    return NextResponse.json({
      reply:
        "I had trouble responding just now. Please try again, or reach our team on WhatsApp at +61 411 888 504.",
    });
  }
}
