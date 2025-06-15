// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/voice-command", async (req, res) => {
  const userCommand = req.body.command;
  console.log("Received command:", userCommand);

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
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTERAPI_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000/", // Replace with your site if deployed
        "X-Title": "VoiceCartBot"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt.trim()
          }
        ]
      })
    });

    const result = await response.json();
    const text = result.choices[0]?.message?.content.trim();

    console.log("OpenRouter response:", text);

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON from model" });
    }

    res.json({ actions: parsed });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Failed to process command" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
