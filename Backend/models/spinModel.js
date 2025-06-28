import mongoose from "mongoose";

const spinSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  lastSpin: {
    type: Date,
    default: null,
  },
  totalPoints: {
    type: Number,
    default: 0,
  }
});

const Spin = mongoose.model("Spin", spinSchema);
export default Spin;
