import React from "react";
import ProductCard from "./ProductCard";

const ResultList = ({ products }) => {
  if (!products) return null;

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-6">
        🧐 No matching products found.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-center text-pink-700">
        🔍 Search Results:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ResultList;
