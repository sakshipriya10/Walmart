import Cart from "../models/cartModel.js";
import mongoose from "mongoose";

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
  const cartItemId = req.params.productId; // this is actually cart _id

  try {
    const deleted = await Cart.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(cartItemId), // ✅ FIXED
      user: new mongoose.Types.ObjectId(userId),     // ✅ FIXED
    });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error removing from cart:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};