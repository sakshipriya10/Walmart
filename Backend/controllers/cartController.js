import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  const { name, price, image } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    console.log("⛔ No userId from JWT middleware");
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("📦 Incoming cart data:", {
    productId: req.params.productId,
    name,
    price,
    image,
    user: userId,
  });

  try {
    const item = await Cart.create({
      productId: req.params.productId,
      name,
      price,
      image,
      user: userId,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("❌ Cart insert failed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const items = await Cart.find({ user: userId });
    res.json(items);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  try {
    await Cart.findOneAndDelete({ user: userId, productId });
    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
