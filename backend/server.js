// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // if using fetch
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

app.post("/voice-command", async (req, res) => {
  const userCommand = req.body.command;
  console.log("📥 Received command:", userCommand);

  const prompt = `
You are an AI that extracts shopping cart actions from user commands.

For each item in the sentence, extract:
- action: "add" or "remove"
- product: name of the item
- quantity: a number

Output a JSON array.

Examples:

Input: "Add 2 mangoes and 1 milk"
Output: [{"action": "add", "product": "mango", "quantity": 2}, {"action": "add", "product": "milk", "quantity": 1}]

Input: "Remove 1 sugar"
Output: [{"action": "remove", "product": "sugar", "quantity": 1}]

Input: "${userCommand}"
Output:
`;

  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY, // ✅ API Key sent in headers
        },
      }
    );

    const geminiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("🧠 Gemini raw output:", geminiText);

    if (!geminiText) {
      return res.status(500).json({ error: "No response from Gemini model" });
    }

    // ✅ Clean output from markdown if present
    const cleaned = geminiText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      return res.status(400).json({
        error: "❌ Could not parse Gemini output to JSON.",
        raw: geminiText,
      });
    }

    res.json({ actions: parsed });
  } catch (err) {
    console.error("❌ Gemini API error:", err.message);
    res.status(500).json({ error: "Failed to process command" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
