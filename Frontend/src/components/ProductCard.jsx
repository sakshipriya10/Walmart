import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer h-full">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mx-auto"
      />
      <h3 className="text-lg font-semibold mt-2 line-clamp-1">{product.title}</h3>
      <p className="text-gray-500 text-sm capitalize">{product.category}</p>
      <p className="text-pink-600 font-bold mt-1">
        ₹{Math.round(product.price * 85)}
      </p>
    </div>
  );
};

export default ProductCard;
