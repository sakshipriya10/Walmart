 import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    /* 🔑 Core */
    name:        { type: String, required: true },
    image:       { type: String, required: true },      // URL to main product image
    price:       { type: Number, required: true },

    /* 🏷️  Catalog info */
    category:    { type: String, required: true },
    color:       { type: String, required: true },

    /* 📦  Inventory & metadata (optional but handy) */
    brand:       { type: String },
    countInStock:{ type: Number, default: 0 },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
