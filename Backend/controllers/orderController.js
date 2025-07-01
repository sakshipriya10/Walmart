import User from "../models/User.js";

export const handlePurchase = async (req, res) => {
  const { userId, category } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user.purchasedCategories.includes(category)) {
      user.purchasedCategories.push(category);
    }

    const requiredCategories = ["Men", "Women", "Makeup"];
    const isComplete = requiredCategories.every((cat) =>
      user.purchasedCategories.includes(cat)
    );

    user.challengeCompleted = isComplete;
    await user.save();

    res.status(200).json({
      message: "Purchase recorded",
      challengeCompleted: isComplete,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
