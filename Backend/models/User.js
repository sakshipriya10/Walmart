import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // other fields...
  purchasedCategories: {
    type: [String], // e.g., ["Men", "Women", "Makeup"]
    default: [],
  },
  challengeCompleted: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
