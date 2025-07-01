 import React from "react";
import axios from "axios";

import { recordPurchase } from "../api/purchaseApi"; // adjust the path if needed

const handleBuy = async () => {
  // Assuming you have user info and category from props/context
  await recordPurchase(user._id, product.category);

  // You can optionally show toast or update UI
  toast.success("Purchase recorded!");
};



const ProductCard = ({ product }) => {
  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("token");
    const productId = product._id || product.id;

    if (!token) return alert("Please login to add items to wishlist");
    if (!productId) return alert("Product ID not found!");

    try {
      await axios.post(
        `http://localhost:5000/api/wishlist/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Product added to wishlist!");
    } catch (error) {
      console.error("❌ Wishlist error:", error);
      alert("Failed to add to wishlist");
    }
  };

  console.log("📦 ProductCard data →", product);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer h-full relative">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mx-auto"
      />
      <h3 className="text-lg font-semibold mt-2 line-clamp-1">
        {product.title}
      </h3>
      <p className="text-gray-500 text-sm capitalize">{product.category}</p>
      <p className="text-pink-600 font-bold mt-1">
        ₹{Math.round(product.price * 85)}
      </p>

      {/* ❤️ Wishlist Button */}
      <button
        onClick={handleAddToWishlist}
        className="absolute top-2 right-2 text-pink-500 hover:text-red-600 text-2xl"
        title="Add to Wishlist"
      >
        ❤️
      </button>
    </div>
  );
};

export default ProductCard;
