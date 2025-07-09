// controllers/feedbackController.js
import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  const { productId, userId, rating, comment } = req.body;

  if (!productId || !userId || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const feedback = new Feedback({
      productId,
      userId,
      rating,
      reviewText: comment, // map comment to reviewText field in DB
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

