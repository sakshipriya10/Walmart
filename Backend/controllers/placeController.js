import mongoose from "mongoose";
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, addressId, items } = req.body;

    if (!userId || !addressId || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = new Order({
      user: new mongoose.Types.ObjectId(userId),     // ✅ wrap with ObjectId
      address: new mongoose.Types.ObjectId(addressId), // ✅ wrap with ObjectId
      items,
    });

    await newOrder.save();
    console.log("✅ New order saved:", newOrder);
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};
