  import Product from "../models/productModel.js";
import mongoose from "mongoose"; 
// @desc   Get all products
// @route  GET /api/products
// @access Public
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // fetch all from MongoDB
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;

  // Optional: validate ObjectId if using MongoDB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
