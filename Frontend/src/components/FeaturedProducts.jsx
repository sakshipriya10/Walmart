import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/trending");
        setTrending(res.data);
      } catch (err) {
        console.error("Failed to fetch trending products:", err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="p-6 mt-8 bg-gradient-to-br from-pink-50 via-blue-50 to-pink-100 rounded-2xl shadow-md mx-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-6">
        🔥 Trending Products
      </h2>

      {trending.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {trending.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="cursor-pointer bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-contain mb-4 rounded"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-pink-600 font-bold text-md mt-1">
                ₹{Math.round(product.price * 85)}
              </p>
              <p className="text-xs text-gray-500 capitalize">{product.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No trending products right now.</p>
      )}
    </div>
  );
};

export default FeaturedProducts;
