 import axios from "axios";
import Product from "../models/productModel.js";

// 🔍 Function to parse user query with OpenRouter AI
const parseQueryWithGPT = async (text) => {
  const prompt = `Extract filters from the user's message: "${text}". 
Return JSON in this format:
{
  "category": "jackets",
  "color": "black",
  "price_max": 1000
}`;

  try {
    console.log("📨 Sending request to OpenRouter...");

    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // ✅ Free model on OpenRouter
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5174", // ✅ Use your frontend port here
          "X-Title": "WalmartHackathon",
        },
      }
    );

    const reply = res.data.choices[0].message.content;
    console.log("✅ Received response from OpenRouter:", reply);

    // ✅ Extract JSON even if it’s wrapped in ```json code block
    const match = reply.match(/```json([\s\S]*?)```/);
    const jsonText = match ? match[1].trim() : reply.trim();

    const parsed = JSON.parse(jsonText);
    console.log("✅ Parsed JSON:", parsed);

    return parsed;
  } catch (err) {
    console.error("❌ OpenRouter API error:");
    if (err.response) {
      console.error("🔎 Status:", err.response.status);
      console.error("📩 Data:", err.response.data);
    } else {
      console.error("⚠️ Error message:", err.message);
    }

    // Return fallback filters to avoid crashing app
    throw new Error("Failed to parse query with OpenRouter");
  }
};

// 🧠 Main Controller for /api/assistant
export const handleAssistantQuery = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const filters = await parseQueryWithGPT(message);

    // 🛒 Build MongoDB query
    const query = {};
    if (filters.category) query.category = filters.category.toLowerCase();
    if (filters.color) query.color = filters.color.toLowerCase();
    if (filters.price_max) query.price = { $lte: filters.price_max };

    // 🔍 Search products
    const products = await Product.find(query).limit(10);
    res.json({ products });
  } catch (error) {
    console.error("❌ Assistant handler error:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
