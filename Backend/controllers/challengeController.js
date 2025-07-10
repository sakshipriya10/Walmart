import User from "../models/userModel.js";

export const shareProduct = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.challenges?.sharedProduct) {
      return res.status(400).json({ message: "Product already shared" });
    }

    user.challenges.sharedProduct = true;
    user.points = (user.points || 0) + 10;

    await user.save();
    res.status(200).json({ message: "Shared successfully! 10 points added." });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
