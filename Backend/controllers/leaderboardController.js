import { Challenge } from '../models/challengeModel.js';
import User from '../models/userModel.js';

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Challenge.aggregate([
      {
        $lookup: {
          from: 'users', // must match actual MongoDB collection name
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          fullName: '$user.fullName',
          pointsEarned: 1,
        },
      },
      { $sort: { pointsEarned: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard", error });
  }
};
