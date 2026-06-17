/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config(); 

// Securely check for key or lazy load
const getGeminiClient = (): GoogleGenAI | null => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not configured or left as default, falling back to smart local chatbot rule engine.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

async function startServer() {
  const app = express();
  const port = 3000; // Hardcoded container port specification

  app.use(express.json());

  // Dynamic API route for assistant conversation with server side Gemini SDK proxying
  app.post("/api/assistant", async (req: Request, res: Response): Promise<void> => {
    try {
      const { message, products } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message parameter is required." });
        return;
      }

      const client = getGeminiClient();
      if (!client) {
        // Safe backend response if API key is not configured yet
        res.json({
          reply: `I received your message! Due to missing API keys in runtime environment, here is my smart client response:
          
We have excellent original products like **SAMSUNG Galaxy S24 Ultra**, **Apple iPhone 15 Pro**, **Sony WH-1000XM5 Headphones** or the high performance **HP Victus Gaming Laptop**.

Please set your Gemini API key in the Secrets panel on the top-right settings to test with the fully powered live Gemini model!`
        });
        return;
      }

      // Format a concise context prompt describing catalog products to model
      const catalogSummary = Array.isArray(products) 
        ? products.map((p: any) => `- ID: ${p.id}, Title: ${p.title}, Price: ₹${p.price.toLocaleString()}, Rating: ${p.rating}, Brand: ${p.brand}, FAssured: ${p.isFAssured}`).join("\n")
        : "No products catalog populated";

      const systemContext = `
You are an intelligent, friendly, and helpful Flipkart Shopping Assistant shopping chatbot.
We are presenting a Flipkart Clone application with the following curated product catalog to our user:
${catalogSummary}

Guidelines:
1. Speak objectively, cordially, and in a friendly voice.
2. Help the user discover, compare, and understand these specific catalog products. Do not suggest products not present in this catalog or adjacent catalog alternatives.
3. Keep responses compact, readable, using bullet points where necessary.
4. If a user asks about pricing, highlight final prices and discounts.
5. If the user is comparing, present a structured difference in specs.
6. Refuse to talk about non-shopping topics politely.
`;

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemContext}\n\nUser message: ${message}` }] }
        ]
      });

      const reply = response.text || "I processed your request, but wasn't able to construct a readable text response. How can I help you today?";
      res.json({ reply });

    } catch (error: any) {
      console.error("Gemini Assistant Route Error:", error);
      res.json({
        reply: "Oops, I encountered a temporary model parsing error. You can still query our prefilled product database seamlessly!"
      });
    }
  });

  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    // In development mode: Mount Vite as middleware to support seamless HMR and styling
    console.log("Starting server in DEVELOPMENT mode, constructing Vite middleware...");
    const viteInstance = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    
    app.use(viteInstance.middlewares);
  } else {
    // In production mode: Serve built production assets from dist directory
    console.log("Starting server in PRODUCTION mode, serving static distribution assets...");
    const distPath = path.resolve(__dirname, "dist");
    
    // Serve static files from dist/client or dist/ depending on Vite output folder structure
    app.use(express.static(distPath));
    
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Flipkart Clone applet server dynamically booted on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to boot full-stack Express server:", err);
});
