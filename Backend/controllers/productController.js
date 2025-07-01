  import Product from "../models/productModel.js";

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
