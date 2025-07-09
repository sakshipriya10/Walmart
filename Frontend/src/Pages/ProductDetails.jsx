import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa"; // 
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import ShareRewardCard from "../components/ShareRewardCard";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 
  const [rating, setRating] = useState(0);
const [hover, setHover] = useState(null);
const [reviewText, setReviewText] = useState("");


  useEffect(() => {
  let ignore = false;

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}?increment=true`);
      if (!ignore) setProduct(res.data);
    } catch (err) {
      console.error("Error loading product:", err);
      if (!ignore) setProduct(null);
    }
  };

  fetchProduct();

  return () => {
    ignore = true;
  };
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
const handleSubmitFeedback = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  if (!userId) {
    alert("Please login to submit feedback.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/feedback",
      {
        productId: product._id,
        userId: userId,
        rating,
        comment: reviewText,  // ✅ corrected this
      }
    );

    toast.success("Feedback submitted successfully!");
    setRating(0);
    setReviewText("");  // ✅ corrected this
  } catch (error) {
    console.error("Error submitting feedback:", error);
    toast.error("Failed to submit feedback.");
  }
};



  return (
  <div className="p-6 min-h-screen bg-[#FDEEF4] flex flex-col items-center md:items-start md:flex-row md:justify-center gap-12">
    {/* Product Image */}
    <img
      src={product.image || product.thumbnail}
      alt={product.title}
      className="h-96 object-contain rounded-3xl shadow-xl bg-white p-4"
    />

    {/* Product Info */}
    <div className="w-full max-w-2xl">
      <h2 className="text-4xl font-bold mb-4 text-pink-600">{product.title}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-2xl text-pink-500 font-extrabold mb-4">
        ₹{Math.round(product.price * 85)}
      </p>
      <p className="text-sm bg-pink-100 px-3 py-1 rounded-full inline-block capitalize text-pink-600 font-medium">
        Category: {product.category}
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          className="bg-pink-100 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-200 transition font-semibold flex items-center gap-2 shadow-sm"
          onClick={handleAddToWishlist}
        >
          <FaHeart className="text-pink-500" /> Add to Wishlist
        </button>
        <button
          className="bg-pink-100 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-200 transition font-semibold shadow-sm"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>

      {/* Share Rewards */}
      <div className="mt-6">
        <ShareRewardCard userId={user?._id} productId={product?._id} />
      </div>

      {/* Review Section */}
      <div className="w-full mt-10 bg-white p-6 rounded-3xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-pink-600">Leave a Review</h3>

        {/* Star Rating */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => {
            const currentRating = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                  className="hidden"
                />
                <FaStar
                  size={28}
                  className={`cursor-pointer transition-colors ${
                    currentRating <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          placeholder="Write your feedback here..."
          className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        {/* Submit */}
        <button
          onClick={handleSubmitFeedback}
          className="mt-4 px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition shadow"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  </div>
);
};

export default ProductDetails;
