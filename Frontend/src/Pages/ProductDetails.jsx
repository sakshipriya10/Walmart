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
const [reviews, setReviews] = useState([]);



  useEffect(() => {
  let ignore = false;

  const fetchProductAndReviews = async () => {
    try {
      const productRes = await axios.get(`http://localhost:5000/api/products/${id}?increment=true`);
      const feedbackRes = await axios.get(`http://localhost:5000/api/feedback/${id}`);

      if (!ignore) {
        setProduct(productRes.data);
        setReviews(feedbackRes.data);
      }
    } catch (err) {
      console.error("Error loading product or reviews:", err);
      if (!ignore) setProduct(null);
    }
  };

  fetchProductAndReviews();

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
    const updatedReviews = await axios.get(`http://localhost:5000/api/feedback/${product._id}`);
setReviews(updatedReviews.data);

    setRating(0);
    setReviewText("");  // ✅ corrected this
  } catch (error) {
    console.error("Error submitting feedback:", error);
    toast.error("Failed to submit feedback.");
  }
};



 return (
  <div className="p-6 min-h-screen bg-[#FDEEF4]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* 🔵 LEFT COLUMN */}
      <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center text-center">
        <img
          src={product.image || product.thumbnail}
          alt={product.name}
          className="h-96 object-contain rounded-xl mb-6"
        />
        <h2 className="text-3xl font-bold text-pink-600 mb-2">{product.name}</h2>
        <p className="text-md bg-pink-100 text-pink-700 px-4 py-1 rounded-full mb-2 capitalize">
          Category: {product.category}
        </p>
        <p className="text-2xl font-extrabold text-pink-500">₹{Math.round(product.price * 85)}</p>
        {/* Buttons Below Product */}
<div className="mt-6 flex flex-col sm:flex-row gap-4">
  <button
    className="flex-1 bg-pink-500 text-white text-lg px-5 py-1 rounded-full hover:bg-pink-600 transition font-semibold flex items-center justify-center gap-2 shadow"
    onClick={handleAddToWishlist}
  >
    <FaHeart className="text-white" /> Add to Wishlist
  </button>
  <button
    className="flex-1 bg-pink-500 text-white text-lg px-5 py-1 rounded-full hover:bg-pink-600 transition font-semibold shadow"
    onClick={handleAddToCart}
  >
    Add to Cart
  </button>
</div>

      </div>

      {/* 🟣 RIGHT COLUMN */}
      <div className="flex flex-col gap-8">
    

        {/* 👉 SHARE REWARD */}
        <ShareRewardCard userId={user?._id} productId={product?._id} />

        {/* ✍️ REVIEW FORM */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-pink-600">Leave a Review</h3>

          {/* Stars */}
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

        {/* 💬 REVIEWS LIST */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-pink-600">Customer Reviews</h3>

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev._id} className="border-b pb-4">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={16}
                        className={`${
                          i < rev.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{rev.reviewText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

};

export default ProductDetails;
