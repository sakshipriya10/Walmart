 import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <img
        src={product.image || product.thumbnail}
        alt={product.title}
        className="h-48 w-full object-contain mb-4 rounded"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {product.title}
      </h2>
      <p className="text-gray-600 capitalize mb-1">
        {product.category} • {product.color}
      </p>
      <p className="text-pink-600 font-bold text-md">
        ₹{Math.round(product.price * 85)}
      </p>
    </div>
  );
};

export default ProductCard;
