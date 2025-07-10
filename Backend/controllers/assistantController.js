  import Product from "../models/productModel.js";

// Simple keyword-based filter
const extractFiltersFromMessage = (message) => {
  const lower = message.toLowerCase();
  const filters = {};

  // 🏷️ Category match (improved with regex for variations)
  if (/\bjacket(s)?\b/.test(lower)) filters.category = "jackets";
  else if (/\bmen('?s)?\b/.test(lower)) filters.category = "men's clothing";
  else if (/\bwomen('?s)?\b/.test(lower)) filters.category = "women's clothing";
  else if (/\b(makeup|cosmetic(s)?)\b/.test(lower)) filters.category = "makeup";
  else if (/\b(heel(s)?|shoe(s)?)\b/.test(lower)) filters.category = "shoes";
  else if (/\b(accessor(y|ies)?|jewel(ry|ery))\b/.test(lower)) filters.category = "jewelery";

  // 🎨 Color detection
  const colors = ["black", "white", "blue", "red", "green", "pink", "yellow"];
  for (const color of colors) {
    if (lower.includes(color)) {
      filters.color = color;
      break;
    }
  }

  // 💰 Price detection: e.g., "under 1000"
  const priceMatch = lower.match(/under\s+(\d+)/);
  if (priceMatch) {
    filters.price_max = parseInt(priceMatch[1]);
  }

  return filters;
};


// Main controller
export const handleAssistantQuery = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const filters = extractFiltersFromMessage(message);
    console.log("🧠 Parsed Filters:", filters);

    // ❌ If no filters are detected, return early with message
    if (Object.keys(filters).length === 0) {
      return res.status(400).json({
        error: "Sorry, I couldn't understand your query. Please try again with more specific keywords like category, color, or price.",
        products: [],
      });
    }

    // ✅ Build MongoDB query based on filters
    const query = {};
    if (filters.category) query.category = filters.category;
    if (filters.color) query.color = filters.color;
    if (filters.price_max) query.price = { $lte: filters.price_max / 85 }; // prices are in USD

    const products = await Product.find(query)
      .select("name image price category color")
      .limit(20);

    console.log("🔍 Final Query:", query);
    console.log("✅ Products Found:", products.length);

    res.json({ products });
  } catch (err) {
    console.error("❌ Assistant Error:", err.message);
    res.status(500).json({ error: "Internal Server Error", products: [] });
  }
};

