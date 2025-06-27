 import mongoose from "mongoose";
 import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
dotenv.config();
connectDB();

const sample = [
  { category: "jackets", color: "black", price: 999 },
  { category: "jackets", color: "red",   price: 1200 },
  { category: "shoes",   color: "black", price: 850 },
  { category: "shoes",   color: "white", price: 1499 },
];

(async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sample);
    console.log("✅ Sample products seeded");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
