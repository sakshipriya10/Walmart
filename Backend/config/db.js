 import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ Ensures .env is loaded even if this is run before server.js

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
