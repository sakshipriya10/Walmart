 import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const challengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  challenges: {
    categoriesPurchased: { type: Number, default: 0 },
    productsReviewed: { type: Number, default: 0 },
    sharedOnSocial: { type: Boolean, default: false },
  },
  pointsEarned: { type: Number, default: 0 },
});

const Challenge = mongoose.model("Challenge", challengeSchema);

// Increment category purchase
router.post("/category-purchase", async (req, res) => {
  const { userId } = req.body;
  try {
    const challenge = await Challenge.findOneAndUpdate(
      { userId },
      { $inc: { "challenges.categoriesPurchased": 1 } },
      { new: true, upsert: true }
    );
    if (challenge.challenges.categoriesPurchased >= 3) {
      challenge.pointsEarned += 100;
      await challenge.save();
    }
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Increment review
router.post("/review-product", async (req, res) => {
  const { userId } = req.body;
  try {
    const challenge = await Challenge.findOneAndUpdate(
      { userId },
      { $inc: { "challenges.productsReviewed": 1 } },
      { new: true, upsert: true }
    );
    if (challenge.challenges.productsReviewed >= 5) {
      challenge.pointsEarned += 150;
      await challenge.save();
    }
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Mark as shared
router.post("/share-product", async (req, res) => {
  const { userId } = req.body;
  try {
    const challenge = await Challenge.findOneAndUpdate(
      { userId },
      { "challenges.sharedOnSocial": true, $inc: { pointsEarned: 50 } },
      { new: true, upsert: true }
    );
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Fetch user challenge
router.post("/get", async (req, res) => {
  const { userId } = req.body;
  try {
    const challenge = await Challenge.findOne({ userId });
    res.json(challenge || { pointsEarned: 0 });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
