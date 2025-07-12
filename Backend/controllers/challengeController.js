import User from "../models/userModel.js";
// export const shareProduct = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     // Find user by ID
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Add points for sharing
//     user.rewardPoints += 10;
//     await user.save();

//     res.status(200).json({ message: "Product shared successfully!", points: user.rewardPoints });
//   } catch (error) {
//     console.error("❌ Error in shareProduct:", error.message);  // <== Log the actual error
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const shareProduct = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ this must exist
    console.log("User ID:", userId); // Debug log

    // Continue your logic (update points, etc.)

    res.status(200).json({ message: 'Shared successfully!' });
  } catch (err) {
    console.error("Error in shareProduct:", err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
