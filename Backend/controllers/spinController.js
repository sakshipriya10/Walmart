import Spin from "../models/spinModel.js";
import spinOptions from "../utils/SpinOptions.js";

export const spinWheel = (req, res) => {
  try {
    const rewards = [100, 200, 500, 1000];
    const randomIndex = Math.floor(Math.random() * rewards.length);
    const reward = rewards[randomIndex];

    return res.status(200).json({ success: true, reward });
  } catch (error) {
    console.error("Spin Controller Error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};
