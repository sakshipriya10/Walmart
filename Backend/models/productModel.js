 import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
