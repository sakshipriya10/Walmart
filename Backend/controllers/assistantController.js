  import Product from "../models/productModel.js";

// Simple keyword-based filter
const extractFiltersFromMessage = (message) => {
  const lower = message.toLowerCase();
  const filters = {};



  // Detect category keywords
  if (lower.includes("jacket")) filters.category = "jackets";
  else if (lower.includes("men")) filters.category = "men's clothing";
  else if (lower.includes("women")) filters.category = "women's clothing";
  else if (lower.includes("makeup")) filters.category = "makeup";
  else if (lower.includes("shoe")) filters.category = "shoes";
  else if (lower.includes("accessor")) filters.category = "jewelery";

  // Detect color (basic example)
  const colors = ["black", "white", "blue", "red", "green", "pink", "yellow"];
  for (const color of colors) {
    if (lower.includes(color)) {
      filters.color = color;
      break;
    }
  }

  // Detect price (extract number)
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
    console.log("🧠 Local Filters:", filters);

    const query = {};
    if (filters.category) query.category = filters.category;
    if (filters.color) query.color = filters.color;
    if (filters.price_max) query.price = { $lte: filters.price_max / 85 };

    const products = await Product.find(query)
      .select("name image price category color")
      .limit(20);

    console.log("🛒 Final Mongo Query:", query);
    console.log("🔎 Matched Products:", products.map(p => ({ name: p.name, image: p.image })));

    res.json({ products });
  } catch (err) {
    console.error("❌ Assistant error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

