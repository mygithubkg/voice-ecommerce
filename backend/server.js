// ====== LIVE CART MONITORING ENDPOINT ======

// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import PRODUCT_CATALOG, { getAllProducts, findProductByName } from "./productlist.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

function buildProductContext() {
  const allProducts = getAllProducts();
  return allProducts.map(p => `- ${p.name} ($${p.price}) [aliases: ${p.aliases.join(", ")}]`).join("\n");
}

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// ====== RAG ENDPOINT: Get Product Catalog ======
app.get("/products", (req, res) => {
  res.json({
    success: true,
    catalog: PRODUCT_CATALOG,
    totalProducts: getAllProducts().length,
  });
});
app.post("/cart-monitor", (req, res) => {
  const cart = req.body.cart;
  console.log("🛒 Live Cart Update:", cart);
  // Optionally, store or process cart state here
  res.json({ success: true, received: cart });
});

// ====== RAG-ENHANCED VOICE COMMAND ENDPOINT ======
app.post("/voice-command", async (req, res) => {
  const userCommand = req.body.command;
  console.log("📥 Received command:", userCommand);

  // Build RAG context with available products
  const productContext = buildProductContext();

  const prompt = `
You are an intelligent shopping assistant AI with access to the product catalog.

AVAILABLE PRODUCTS IN OUR STORE:
${productContext}

Your task: Analyze the user's command and extract shopping cart actions ONLY for products that exist in our catalog.

Rules:
1. For each item, extract: action ("add" or "remove"), product (exact name from catalog), quantity (number)
2. If user mentions a product NOT in our catalog, include it with action "unavailable"
3. Match products intelligently using aliases (e.g., "mangoes" → "Mango", "chai" → "Tea")
4. Output ONLY valid JSON array, no markdown formatting
5. Use exact product names from the catalog

Examples:

Input: "Add 2 mangoes and 1 milk"
Output: [{"action": "add", "product": "Mango", "quantity": 2}, {"action": "add", "product": "Milk", "quantity": 1}]

Input: "Remove 1 sugar and add 3 apples"
Output: [{"action": "remove", "product": "Sugar", "quantity": 1}, {"action": "add", "product": "Apple", "quantity": 3}]

Input: "Add 2 pizzas and 1 coffee"
Output: [{"action": "unavailable", "product": "pizza", "quantity": 2, "message": "Pizza is not available in our catalog"}, {"action": "add", "product": "Coffee", "quantity": 1}]

Now process this command:
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

    // ====== RAG POST-PROCESSING: Validate products against catalog ======
    const validatedActions = parsed.map(action => {
      if (action.action === "unavailable") {
        return action; // Already marked as unavailable by Gemini
      }

      const product = findProductByName(action.product);
      
      if (!product) {
        console.log(`⚠️ Product not found: ${action.product}`);
        return {
          action: "unavailable",
          product: action.product,
          quantity: action.quantity,
          message: `"${action.product}" is not available in our catalog`,
        };
      }

      // Add product details to the response
      return {
        ...action,
        productId: product.id,
        productName: product.name,
        price: product.price,
        available: true,
      };
    });

    console.log("✅ Validated actions:", JSON.stringify(validatedActions, null, 2));

    res.json({ 
      actions: validatedActions,
      totalActions: validatedActions.length,
      availableActions: validatedActions.filter(a => a.action !== "unavailable").length,
      unavailableActions: validatedActions.filter(a => a.action === "unavailable").length,
    });
  } catch (err) {
    console.error("❌ Gemini API error:", err.message);
    res.status(500).json({ error: "Failed to process command" });
  }
});

// ====== RAG-ENHANCED CHATBOT ENDPOINT ======
app.post("/chatbot", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  // Build RAG context with product catalog
  const productContext = buildProductContext();
  const categories = PRODUCT_CATALOG.categories.map(c => c.name).join(", ");

  const prompt = `You are VoiceCart AI Assistant, a helpful and friendly AI assistant for an e-commerce grocery shopping website called VoiceCart. 

Your capabilities:
- Help users find products from our catalog
- Answer questions about the website features
- Explain how voice shopping works
- Provide shopping tips and recommendations
- Answer queries about specific products and their prices

AVAILABLE PRODUCTS IN OUR STORE:
${productContext}

PRODUCT CATEGORIES: ${categories}

Website features you should know:
- Voice-powered shopping using speech recognition
- AI-powered cart management with natural language (powered by RAG and Gemini)
- Instant invoice generation
- Multiple product categories: ${categories}
- Google authentication for user accounts
- Real-time product availability checking

When users ask about products:
- Only recommend products from the available catalog above
- Mention exact prices when relevant
- Suggest alternatives if a product isn't available
- Be specific about what's in stock

Keep responses conversational, helpful, and concise (2-3 sentences max unless more detail is requested).

User: ${userMessage}
AI Assistant:`;

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
          maxOutputTokens: 200,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
      }
    );

    const geminiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!geminiText) {
      return res.status(500).json({ error: "No response from Gemini model" });
    }
    res.json({ reply: geminiText.trim() });
  } catch (err) {
    console.error("❌ Gemini API error (chatbot):", err.message);
    res.status(500).json({ error: "Failed to process chat message" });
  }
});

// ====== RAG ENDPOINT: Intelligent Product Search ======
app.post("/search-products", async (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  console.log("🔍 Search query:", query);

  const productContext = buildProductContext();

  const prompt = `You are a product search assistant for VoiceCart grocery store.

AVAILABLE PRODUCTS:
${productContext}

User is searching for: "${query}"

Your task:
1. Find ALL matching products from the catalog (consider names, aliases, categories)
2. If no exact match, suggest similar or related products
3. Return a JSON array with matching products

Output format:
[
  {
    "name": "Product Name",
    "price": 1.5,
    "relevance": "exact" | "similar" | "related",
    "reason": "why this product matches"
  }
]

Search query: "${query}"
Output:`;

  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.5, maxOutputTokens: 500 },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
      }
    );

    const geminiText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleaned = geminiText.replace(/```json|```/g, "").trim();
    const results = JSON.parse(cleaned);

    res.json({ 
      success: true,
      query,
      results,
      totalResults: results.length 
    });
  } catch (err) {
    console.error("❌ Search error:", err.message);
    res.status(500).json({ error: "Failed to search products" });
  }
});

// ====== RAG ANALYTICS ENDPOINT ======
app.get("/rag-analytics", (req, res) => {
  const allProducts = getAllProducts();
  const analytics = {
    totalProducts: allProducts.length,
    totalCategories: PRODUCT_CATALOG.categories.length,
    categories: PRODUCT_CATALOG.categories.map(cat => ({
      name: cat.name,
      productCount: cat.products.length,
      products: cat.products.map(p => p.name),
    })),
    priceRange: {
      min: Math.min(...allProducts.map(p => p.price)),
      max: Math.max(...allProducts.map(p => p.price)),
      average: (allProducts.reduce((sum, p) => sum + p.price, 0) / allProducts.length).toFixed(2),
    },
    ragStatus: {
      catalogLoaded: true,
      geminiIntegration: !!API_KEY,
      endpoints: [
        "/products - Get full product catalog",
        "/voice-command - RAG-enhanced voice commands",
        "/chatbot - RAG-enhanced chatbot",
        "/search-products - Intelligent product search",
        "/rag-analytics - This endpoint",
      ],
    },
  };

  res.json(analytics);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📦 Product catalog loaded: ${getAllProducts().length} products`);
  console.log(`🧠 RAG Pipeline active with Gemini AI`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   GET  /products - Get product catalog`);
  console.log(`   POST /voice-command - Process voice commands with RAG`);
  console.log(`   POST /chatbot - Chat with RAG-enhanced AI`);
  console.log(`   POST /search-products - Intelligent product search`);
  console.log(`   GET  /rag-analytics - View RAG system analytics\n`);
});

  