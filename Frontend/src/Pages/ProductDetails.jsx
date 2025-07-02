import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa"; // ⬅️ Import heart icon
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error loading product:", err);
      setProduct(null);
    }
  };

  fetchProduct();
}, [id]);
if (!product)
    return <p className="p-6 text-center text-gray-600">Product not found or failed to load.</p>;
const handleAddToWishlist = async () => {
  try {
    await axios.post(
      `/api/wishlist/${product._id}`,
      {
        name: product.title,
        price: Math.round(product.price * 85),
        image: product.image || product.thumbnail,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Added to Wishlist");
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    toast.error("Could not add to wishlist");
  }
};

const handleAddToCart = async () => {
  try {
    await axios.post(
      `/api/cart/${product._id}`,
      {
        name: product.name || product.title || "Unnamed Product",
        price: Math.round(product.price * 85),
        image: product.image || product.thumbnail,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Added to Cart");
  } catch (err) {
    console.error("Error adding to cart:", err);
    toast.error(err.response?.data?.error || "Could not add to cart");
  }
};

  return (
    <div className="p-6 min-h-screen bg-[#FDEEF4] flex flex-col md:flex-row gap-10 items-center">
      <img
        src={product.image || product.thumbnail}
        alt={product.title}
        className="h-80 object-contain rounded-xl shadow-md"
      />
      <div className="max-w-xl">
        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl text-pink-600 font-bold mb-4">
          ₹{Math.round(product.price * 85)}
        </p>
        <p className="text-sm bg-pink-100 px-3 py-1 rounded-full inline-block capitalize">
          Category: {product.category}
        </p>

        {/* Cart & Order Buttons */}
        <div className="mt-6 flex gap-4">
          <button
    className="bg-white border border-pink-600 text-pink-600 px-4 py-2 rounded-full hover:bg-pink-300 transition flex items-center gap-2"
    onClick= {
      handleAddToWishlist
    }
  >
    <FaHeart className="text-pink-600" /> Wishlist
  </button>
          <button
            className="bg-white text-pink-600 px-6 py-2 rounded-full hover:bg-pink-300 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
