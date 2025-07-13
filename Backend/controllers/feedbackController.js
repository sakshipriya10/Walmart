// controllers/feedbackController.js
import Feedback from '../models/Feedback.js';
import { Challenge } from '../models/challengeModel.js';

export const submitFeedback = async (req, res) => {
  const { productId, userId, rating, comment } = req.body;

  if (!productId || !userId || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Step 1: Save feedback
    const feedback = new Feedback({
      productId,
      userId,
      rating,
      reviewText: comment,
    });
    await feedback.save();

    // Step 2: Count unique products reviewed by user
    const distinctReviewedProducts = await Feedback.find({ userId }).distinct("productId");
    const totalReviewed = distinctReviewedProducts.length;

    // Step 3: Update Challenge
    let challenge = await Challenge.findOne({ userId });

    if (!challenge) {
      // First-time review — create challenge
      challenge = new Challenge({
        userId,
        challenges: { productsReviewed: totalReviewed },
        pointsEarned: totalReviewed >= 3 ? 50 : 0,
      });
    } else {
      const prevCount = challenge.challenges.productsReviewed || 0;

      // Only award points once when hitting 5 reviews
      if (totalReviewed >= 3 && prevCount < 3) {
        challenge.pointsEarned += 50;
      }

      challenge.challenges.productsReviewed = totalReviewed;
    }

    await challenge.save();

    res.status(201).json({
      message: totalReviewed >= 3
        ? "Feedback submitted! You earned 50 reward points for reviewing 5 products 🎉"
        : "Feedback submitted successfully",
      feedback,
      updatedChallenge: challenge,
    });
  } catch (error) {
    console.error("Error saving feedback or updating challenge:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getFeedbackByProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const feedbacks = await Feedback.find({ productId });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Failed to fetch feedback." });
  }
};

