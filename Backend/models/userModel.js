 // models/userModel.js
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

  // Wishlist and cart
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qty: { type: Number, default: 1 },
    },
  ],


  // REward point on sharing social media
  points: { type: Number, default: 0 },
  challenges: {
    sharedProduct: { type: Boolean, default: false },
    // other challenges...
  }
});

export default mongoose.model("User", userSchema);
