import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { Challenge } from "../models/challengeModel.js";
import mongoose from "mongoose";

export const placeOrder = async (req, res) => {
  try {
    const { userId, addressId, items } = req.body;

    if (!userId || !addressId || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = new Order({ user: userId, address: addressId, items });
    await newOrder.save();

    const allUserOrders = await Order.find({ user: userId });
    const allProductIds = allUserOrders.flatMap(order =>
  order.items.map(item => item?.product?.toString()).filter(Boolean)
);

console.log("All product IDs from orders:", allProductIds);

const products = await Product.find({
  _id: { $in: allProductIds.map(id => new mongoose.Types.ObjectId(id)) }
});

console.log("Products fetched from DB:", products.map(p => p.name));
console.log("Categories:", products.map(p => p.category));

    const uniqueCategories = new Set(products.map(p => p.category));
    console.log("🎯 Unique categories count:", uniqueCategories.size);
    const currentCategoryCount = uniqueCategories.size;

    let challenge = await Challenge.findOne({ userId });
    let earnedCategoryReward = false;

    if (!challenge) {
      challenge = new Challenge({
        userId,
        challenges: { categoriesPurchased: currentCategoryCount },
        pointsEarned: currentCategoryCount >= 3 ? 50 : 0,
      });
      earnedCategoryReward = currentCategoryCount >= 3;
    } else {
      const prevCategoryCount = challenge.challenges.categoriesPurchased || 0;

      if (currentCategoryCount >= 3 && prevCategoryCount < 3) {
        challenge.pointsEarned += 50;
        earnedCategoryReward = true;
      }

      challenge.challenges.categoriesPurchased = currentCategoryCount;
    }

    await challenge.save();

    res.status(201).json({
      message: earnedCategoryReward
        ? "🎉 Order placed! You earned 50 bonus points for buying from 3 categories!"
        : "Order placed successfully",
      order: newOrder,
      updatedChallenge: challenge,
    });

  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate("address");
    res.status(200).json({ orders });
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ error: "Failed to cancel order" });
  }
};
