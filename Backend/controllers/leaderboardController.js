import User from '../models/userModel.js'; 

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ bonusPoints: -1 })
      .limit(10)
      .select('fullName bonusPoints');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
};