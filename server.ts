import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for chat
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        console.warn("GEMINI_API_KEY is not configured or using default value. Falling back to simulated assistance.");
        const lastUserMessage = messages[messages.length - 1]?.content || "";
        const fallbackReply = generateFallbackReply(lastUserMessage);
        return res.json({ reply: fallbackReply });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const formattedHistory = messages.map(m => `${m.role === 'user' ? 'Customer' : 'PaperThreads Assistant'}: ${m.content}`).join("\n");

      const systemInstruction = `You are the friendly and elegant PaperThreads AI Chatbot, representing PaperThreads, a single-owner arts and crafts proprietary company founded in 2018 by Kavindi Samudika.

About the Founder & Creator:
- Kavindi Samudika started PaperThreads in 2018 as a hobby during her degree, finding inspiration on Pinterest and exploring paper crafting techniques.
- During the COVID-19 pandemic, she discovered a true passion for hand-drawn art, branching into personalized custom creations.
- Her work is a blend of patience, love, attention to detail, and passion. She transforms ordinary materials into treasured keepsake gifts.

Our Philosophy:
Turn imagination into handmade treasures. Creativity connects people, making life's moments memorable.

Art Types (Arts Section):
1. Line Art: Sophisticated hand-drawn black & white or single-line drawings capturing human silhouettes, nature, and minimalist aesthetics.
2. Abstract Art: Dynamic canvas pieces that convey rich emotions, shapes, and colorful expressions.
3. Fusion Art: Mix-media blending structural designs, textures, and paper carving with traditional paint mediums.

Craft Types (Crafts Section):
1. Handicrafts: Exquisite papercrafts, 3D shadow boxes, quilling designs, custom wall décor, and woven thread arts.
2. Customized Greeting Cards: Heartfelt, interactive 3D pop-up cards, explosive boxes, and customized envelopes for birthdays, anniversaries, and weddings.

Inquiries, Events & Booking:
- PaperThreads caters to events and occasions (Weddings, Corporate, Birthdays, Anniversaries, Memory Lane celebrations). We offer customized packages.
- Pricing is tailored to the design complexity and materials.
- Direct inquiries can be requested via our Enquiry Form or by clicking the WhatsApp link (+94 77 123 4567).

Tone:
Polished, warm, helpful, creative, and slightly artistic. Speak in first person plural ("We at PaperThreads" or "On behalf of Kavindi...") or as a dedicated studio assistant.
Always guide the user to check our Arts & Crafts showcase, try our interactive reminder calendar, or visit our beautiful memory lane. Keep replies relatively succinct, elegant, and beautifully formatted in markdown.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `System Instruction: ${systemInstruction}\n\nChat History:\n${formattedHistory}\n\nPaperThreads Assistant Reply:`,
      });

      res.json({ reply: response.text || "I'd love to help you with that! Feel free to ask more details about PaperThreads." });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.status(500).json({ error: "Failed to generate AI response. Pls try again later.", details: err.message });
    }
  });

  // Simple inquiry submission endpoint
  app.post("/api/inquiry", (req, res) => {
    const { name, email, type, interest, notes } = req.body;
    console.log(`Received inquiry from ${name} (${email}) for ${type}: ${interest}. Notes: ${notes}`);
    res.json({ success: true, message: "Thank you! Your inquiry has been submitted successfully. Kavindi will contact you personally soon." });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(
          path.resolve(process.cwd(), "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express-Vite backend running on port ${PORT}`);
  });
}

function generateFallbackReply(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes("kavindi") || msg.includes("founder") || msg.includes("story") || msg.includes("creator")) {
    return "PaperThreads was founded by Kavindi Samudika in 2018. It started as a relaxing hobby while pursuing her degree, drawing inspiration from Pinterest paper crafts. During the COVID-19 pandemic, her passion expanded to hand-drawn art, and today she creates beautiful, customized keepsakes full of love and heart!";
  }
  if (msg.includes("art") || msg.includes("painting") || msg.includes("abstract") || msg.includes("line")) {
    return "Our Arts range includes minimalistic Line Art, colorful and emotional Abstract compositions on canvas, and mixed-media Fusion Art combining paper-carving with paint. Which style resonates with you most?";
  }
  if (msg.includes("craft") || msg.includes("card") || msg.includes("handicraft")) {
    return "Our Crafts feature lovely premium Handicrafts (3D quilled wall frames, shadowboxes, thread weave) and ultra-personalized 3D Greeting Cards or Explosive boxes perfect for anniversaries, birthdays, and special surprises!";
  }
  if (msg.includes("contact") || msg.includes("phone") || msg.includes("whatsapp") || msg.includes("email")) {
    return "You can reach PaperThreads via WhatsApp (+94 77 123 4567) or send an inquiry directly through our styled Contact Form on the page. Kavindi will reply to you personally!";
  }
  return "Welcome to PaperThreads! I am the automated helper. Feel free to ask about Kavindi Samudika's journey, our arts (line, abstract, fusion), our crafts (handicrafts, pop-up cards), or how to book a customized order for your special event!";
}

startServer();
