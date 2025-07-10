import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interests: [String],
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // Wishlist and Cart
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: { type: Number, default: 1 },
    },
  ],

  // Reward Points
  points: { type: Number, default: 0 },
  bonusPoints: { type: Number, default: 0 },

  // Challenges
  challenges: {
    sharedProduct: { type: Boolean, default: false },
    // other challenges...
  },
  challengeCompleted: {
    type: Boolean,
    default: false,
  },

  purchasedCategories: {
    type: [String], // e.g., ["Men", "Women", "Makeup"]
    default: [],
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
