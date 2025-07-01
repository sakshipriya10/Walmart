 // controllers/wishlistController.js
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export const addItem = async (req, res) => {
  const { productId } = req.params;

  if (!productId || productId === "undefined") {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValidProduct = await Product.findById(productId);
    if (!isValidProduct) return res.status(404).json({ message: "Product not found" });

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.status(201).json({ message: "Added to wishlist" });
  } catch (err) {
    console.error("Error in addItem:", err);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

export const removeItem = async (req, res) => {
  const { productId } = req.params;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { wishlist: productId },
    });
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};

export const moveToCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const user = await User.findById(req.user.id);

    user.wishlist.pull(productId);
    const item = user.cart.find((c) => c.product.toString() === productId);
    if (item) item.qty += 1;
    else user.cart.push({ product: productId });

    await user.save();
    res.json({ message: "Moved to cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to move to cart" });
  }
};
