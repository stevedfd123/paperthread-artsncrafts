/**
 * Shared PaperThreads assistant logic.
 *
 * Used by both the local dev server (server.ts) and the Vercel serverless
 * function (api/chat.ts) so the chatbot behaves identically in both places.
 * Files prefixed with "_" inside api/ are treated as libraries by Vercel,
 * not as routes.
 */
import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

/** Override without a code change by setting GEMINI_MODEL in the environment. */
export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

export const SYSTEM_INSTRUCTION = `You are the friendly and elegant PaperThreads AI Chatbot, representing PaperThreads, a single-owner arts and crafts studio founded in 2019 by Kavindi.

About the Founder & Creator:
- Kavindi is the artist and maker behind PaperThreads. It began with her love of making things by hand, especially handmade cards and small gifts for the people around her.
- After seeing one of her cards, her friend Malee suggested she start an Instagram page. That single suggestion started everything.
- She founded PaperThreads in 2019 while studying for her Software Engineering degree, finding ideas on Pinterest and sharing work on WhatsApp Status and Facebook. The first orders followed, and she balanced university life with PaperThreads.
- During COVID she finally had time to slow down, picked up a pen and started drawing. She never studied art professionally; pure curiosity led her to mandala art, which she fell in love with.
- After graduating she worked full-time in the IT industry while still creating, and eventually left her job to run PaperThreads full-time. She calls it one of the best decisions she has ever made.
- She later opened a second creative space, PaperThreads_Arts, dedicated to her hand-drawn art.
- Today she shares her work on Instagram, Facebook, TikTok and YouTube, takes part in art exhibitions, accepts custom creations, and conducts art workshops.

Our Philosophy:
Turn imagination into handmade treasures. Creativity connects people, making life's moments memorable.

Arts Section collections (PaperThreads_Arts, hand-drawn work):
Mandalas, Wooden Mandalas, Figure Drawings, Animal Drawings, Painted Shoes, Occasion Art, Wedding Fingerprint Trees, Wedding Guest Books, Gender Reveal pieces, and Workshops.

Crafts Section collections (PaperThreads, handmade paper work):
Greeting Cards, Seasonal Cards, Twisted & Pop-Out Cards, Exploding Boxes, Paper Bouquets, Calendars, Photo Books, Pocket Albums, and the Framed Collection.

Inquiries, Events & Booking:
- PaperThreads caters to events and occasions (Weddings, Corporate, Birthdays, Anniversaries, Memory Lane celebrations). We offer customized packages.
- Every piece is made to order and pricing is tailored to the design complexity and materials, so prices are quoted on request.
- Direct inquiries can be requested via our Enquiry Form or by clicking the WhatsApp link (+94 77 123 4567).

Tone:
Polished, warm, helpful, creative, and slightly artistic. Speak in first person plural ("We at PaperThreads" or "On behalf of Kavindi...") or as a dedicated studio assistant.
Always guide the user to check our Arts & Crafts showcase, try our interactive reminder calendar, or visit our beautiful memory lane. Keep replies relatively succinct, elegant, and beautifully formatted in markdown.`;

/** Deterministic replies used whenever GEMINI_API_KEY is absent or the API fails. */
export function generateFallbackReply(message: string): string {
  const msg = (message || '').toLowerCase();
  if (
    msg.includes('kavindi') ||
    msg.includes('founder') ||
    msg.includes('story') ||
    msg.includes('creator')
  ) {
    return "PaperThreads was founded by Kavindi in 2019. It began with one handmade birthday card and a friend named Malee who suggested she start an Instagram page. She built it up while studying Software Engineering, discovered mandala art during COVID, and eventually left her IT career to create full-time. Today she also runs PaperThreads_Arts for her hand-drawn work!";
  }
  if (
    msg.includes('mandala') ||
    msg.includes('art') ||
    msg.includes('drawing') ||
    msg.includes('painting')
  ) {
    return 'Our Arts collections include Mandalas and Wooden Mandalas, Figure and Animal Drawings, hand-painted Shoes, Occasion Art, Wedding Fingerprint Trees and Guest Books, and Gender Reveal pieces. Which one would you like to see?';
  }
  if (
    msg.includes('craft') ||
    msg.includes('card') ||
    msg.includes('album') ||
    msg.includes('calendar') ||
    msg.includes('box')
  ) {
    return 'Our Crafts collections feature Greeting and Seasonal Cards, Twisted & Pop-Out Cards, Exploding Boxes, Paper Bouquets, Calendars, Photo Books, Pocket Albums, and our Framed Collection. Everything is made to order!';
  }
  if (
    msg.includes('price') ||
    msg.includes('cost') ||
    msg.includes('how much') ||
    msg.includes('rate')
  ) {
    return 'Every piece is handmade to order, so pricing depends on the design, size and materials. Send us an enquiry through the form or on WhatsApp (+94 77 123 4567) and Kavindi will quote you personally.';
  }
  if (
    msg.includes('contact') ||
    msg.includes('phone') ||
    msg.includes('whatsapp') ||
    msg.includes('email')
  ) {
    return 'You can reach PaperThreads via WhatsApp (+94 77 123 4567) or send an inquiry directly through our styled Contact Form on the page. Kavindi will reply to you personally!';
  }
  return "Welcome to PaperThreads! I am the automated helper. Feel free to ask about Kavindi's journey, our arts (mandalas, figure and animal drawings, painted shoes and more), our crafts (cards, pop-out cards, exploding boxes, albums, calendars), or how to book a customized order for your special event!";
}

/**
 * Produces an assistant reply. Falls back to canned answers when no API key is
 * configured, so the chatbot always responds instead of erroring.
 */
export async function generateReply(messages: ChatMessage[]): Promise<string> {
  const lastUserMessage = messages[messages.length - 1]?.content || '';
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    console.warn('GEMINI_API_KEY is not configured. Using simulated assistance.');
    return generateFallbackReply(lastUserMessage);
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
  });

  const formattedHistory = messages
    .map(
      (m) =>
        `${m.role === 'user' ? 'Customer' : 'PaperThreads Assistant'}: ${m.content}`
    )
    .join('\n');

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: `System Instruction: ${SYSTEM_INSTRUCTION}\n\nChat History:\n${formattedHistory}\n\nPaperThreads Assistant Reply:`,
  });

  return (
    response.text ||
    "I'd love to help you with that! Feel free to ask more details about PaperThreads."
  );
}
