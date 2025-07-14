  import Product from "../models/productModel.js";
import mongoose from "mongoose";

// @desc   Get all products
// @route  GET /api/products
// @access Public
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
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
  const { increment } = req.query;

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

// @desc   Get trending products
// @route  GET /api/products/trending
// @access Public
export const getTrendingProducts = async (req, res) => {
  try {
    const trending = await Product.find().sort({ views: -1 }).limit(8);
    res.json(trending);
  } catch (error) {
    console.error("Error fetching trending products:", error);
    res.status(500).json({ message: "Failed to fetch trending products" });
  }
};

// @desc   Get related products
// @route  GET /api/products/related/:productId
// @access Public
export const getRelatedProducts = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const related = await Product.find({
      category: product.category,
      _id: { $ne: productId },
    }).limit(2);

    res.json(related);
  } catch (err) {
    console.error("Error fetching related items:", err);
    res.status(500).json({ message: "Failed to fetch related products" });
  }
};

// ✅ NEW: Search products by keyword
// @desc   Search products
// @route  GET /api/products/search?q=handbag
// @access Public
export const searchProducts = async (req, res) => {
  const query = req.query.q;
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).limit(6);

    res.json(products);
  } catch (error) {
    console.error("❌ Error searching products:", error);
    res.status(500).json({ message: "Search failed" });
  }
};
