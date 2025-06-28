import mongoose from 'mongoose';

const spinSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  lastSpin: { type: Date, default: null },
  reward: { type: String, default: null },
});

export default mongoose.model('Spin', spinSchema);

