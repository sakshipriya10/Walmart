 import Product from "../models/productModel.js";
import mongoose from "mongoose"; 

// @desc   Get all products
// @route  GET /api/products
// @access Public
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all from MongoDB

    // ✅ Debug: Show sample products in backend terminal
    console.log("🛍 Sample Products:", products.slice(0, 3));

    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// @desc   Get product by ID
// @route  GET /api/products/:id
// @access Public
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const { increment } = req.query; // check if ?increment=true is passed

  // ✅ Optional: Validate ObjectId if using MongoDB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (increment === "true") {
      product.views += 1;
      await product.save();
    }

    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};


export const getTrendingProducts = async (req, res) => {
  try {
    const trending = await Product.find().sort({ views: -1 }).limit(8);
    res.json(trending);
  } catch (error) {
    console.error("Error fetching trending products:", error);
    res.status(500).json({ message: "Failed to fetch trending products" });
  }
};
