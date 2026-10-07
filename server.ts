import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { generateReply, generateFallbackReply } from "./api/_lib/assistant";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for chat — shares its implementation with api/chat.ts (Vercel)
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    try {
      res.json({ reply: await generateReply(messages) });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      const lastUserMessage = messages[messages.length - 1]?.content || "";
      res.json({ reply: generateFallbackReply(lastUserMessage), degraded: true });
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

startServer();
