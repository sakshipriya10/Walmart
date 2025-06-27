 import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h4 className="text-lg font-bold capitalize">{product.category}</h4>
      <p className="text-gray-600">Color: {product.color}</p>
      <p className="text-green-700 font-semibold">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
