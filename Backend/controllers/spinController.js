// import Spin from '../models/spinModel.js';

// const rewards = ['10 Coins', '50 Coins', '1 Free Item', 'Try Again'];

// export const handleSpin = async (req, res) => {
//   const { userId } = req.body;
//   if (!userId) return res.status(400).json({ message: 'User ID required' });

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   let spinData = await Spin.findOne({ userId });

//   if (spinData && spinData.lastSpin >= today) {
//     return res.status(403).json({ message: 'Already spun today' });
//   }

//   const reward = rewards[Math.floor(Math.random() * rewards.length)];

//   if (!spinData) {
//     spinData = new Spin({ userId });
//   }

//   spinData.lastSpin = new Date();
//   spinData.reward = reward;
//   await spinData.save();

//   res.json({ success: true, reward });
// };

// import Spin from '../models/spinModel.js';

// const rewards = ['10 Coins', '50 Coins', '1 Free Item', 'Try Again'];

// export const handleSpin = async (req, res) => {
//   const { userId } = req.body;
//   if (!userId) return res.status(400).json({ message: 'User ID required' });

//   // No daily restriction
//   let spinData = await Spin.findOne({ userId });

//   if (spinData && spinData.lastSpin >= today) {
//     return res.status(403).json({ message: 'Already spun today' });
//   }
//   const reward = rewards[Math.floor(Math.random() * rewards.length)];

//   if (!spinData) {
//     spinData = new Spin({ userId });
//   }

//   spinData.lastSpin = new Date(); // Optional: can still track when they last spun
//   spinData.reward = reward;
//   await spinData.save();

//   res.json({ success: true, reward });
// };


import Spin from '../models/spinModel.js';

const rewards = ['10 Coins', '50 Coins', '1 Free Item', 'Try Again'];

export const handleSpin = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  try {
    let spinData = await Spin.findOne({ userId });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today (midnight)

    if (spinData && spinData.lastSpin) {
      const lastSpinDate = new Date(spinData.lastSpin);
      lastSpinDate.setHours(0, 0, 0, 0);

      if (lastSpinDate.getTime() === today.getTime()) {
        return res.status(403).json({ message: 'You have already spun today' });
      }
    }

    // Spin allowed
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    if (!spinData) {
      spinData = new Spin({ userId });
    }

    spinData.lastSpin = new Date(); // Save current date-time
    spinData.reward = reward;
    await spinData.save();

    res.json({ success: true, reward });

  } catch (error) {
    console.error("Spin Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

