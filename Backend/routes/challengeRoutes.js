//  import express from "express";
// import mongoose from "mongoose";
// import { verifyJWT } from '../middlewares/authMiddleware.js';
// import { shareProduct } from "../controllers/challengeController.js";

// const router = express.Router();

// // ✅ Extended schema
// const challengeSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   challenges: {
//     categoriesPurchased: { type: Number, default: 0 },
//     productsReviewed: { type: Number, default: 0 },
//     sharedOnSocial: { type: Boolean, default: false },
//   },
//   pointsEarned: { type: Number, default: 0 },
//   lastSpinDate: { type: Date, default: null }   // ✅ Added for daily spin
// });

// const Challenge = mongoose.model("Challenge", challengeSchema);

// // ✅ Buy from 3 categories
// router.post("/category-purchase", async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const challenge = await Challenge.findOneAndUpdate(
//       { userId },
//       { $inc: { "challenges.categoriesPurchased": 1 } },
//       { new: true, upsert: true }
//     );
//     if (challenge.challenges.categoriesPurchased >= 3) {
//       challenge.pointsEarned += 50;
//       await challenge.save();
//     }
//     res.json(challenge);
//   } catch (err) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // ✅ Review 5 products
// router.post("/review-product", async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const challenge = await Challenge.findOneAndUpdate(
//       { userId },
//       { $inc: { "challenges.productsReviewed": 1 } },
//       { new: true, upsert: true }
//     );
//     if (challenge.challenges.productsReviewed >= 5) {
//       challenge.pointsEarned += 50;
//       await challenge.save();
//     }
//     res.json(challenge);
//   } catch (err) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // ✅ Shared on social
// // Note: You already imported shareProduct in controller
// router.post("/share", verifyJWT, shareProduct);

// // ✅ Get current user's rewards
// router.post("/get", verifyJWT, async (req, res) => {
//   const userId = req.user.id;
//   try {
//     const challenge = await Challenge.findOne({ userId });
//     res.json(challenge || { pointsEarned: 0 });
//   } catch (err) {
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// export default router;

import express from "express";
import { verifyJWT } from '../middlewares/authMiddleware.js';
import { shareProduct } from "../controllers/challengeController.js";
import { Challenge } from "../models/challengeModel.js"; // ✅ Import the model

const router = express.Router();

// ✅ Buy from 3 categories
router.post("/category-purchase", async (req, res) => {
  const { userId } = req.body;
  try {
    const challenge = await Challenge.findOneAndUpdate(
      { userId },
      { $inc: { "challenges.categoriesPurchased": 1 } },
      { new: true, upsert: true }
    );
    if (challenge.challenges.categoriesPurchased >= 3) {
      challenge.pointsEarned += 50;
      await challenge.save();
    }
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Review 5 products
router.post("/review-product", async (req, res) => {
  const { userId } = req.body;
  try {
    const challenge = await Challenge.findOneAndUpdate(
      { userId },
      { $inc: { "challenges.productsReviewed": 1 } },
      { new: true, upsert: true }
    );
    if (challenge.challenges.productsReviewed >= 5) {
      challenge.pointsEarned += 50;
      await challenge.save();
    }
    res.json(challenge);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Shared on social
router.post("/share", verifyJWT, shareProduct);

// ✅ Get current user's rewards
router.post("/get", verifyJWT, async (req, res) => {
  const userId = req.user.id;
  try {
    const challenge = await Challenge.findOne({ userId });
    res.json(challenge || { pointsEarned: 0 });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
