import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useProductData } from "../data/useProductData";

const Products = () => {
  const { allProducts, loading } = useProductData();
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState("all");
  const navigate = useNavigate();

  const categories = [
    { label: "All", value: "all" },
    { label: "Men's Fashion", value: "men's clothing" },
    { label: "Women's Fashion", value: "women's clothing" },
    { label: "Accessories", value: "jewelery" },
    { label: "Makeup", value: "makeup" },
  ];

  useEffect(() => {
    setFiltered(allProducts);
  }, [allProducts]);

  const handleFilter = (category) => {
    setSelected(category);
    if (category === "all") {
      setFiltered(allProducts);
    } else {
      setFiltered(allProducts.filter((p) => p.category === category));
    }
  };

  if (loading) return <p className="text-center mt-8">Loading products...</p>;
  return (
    <div className="p-6 bg-gradient-to-br from-[#FDEEF4] to-[#E0F7FA] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        UrbanEdgeMART Collection
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`px-4 py-2 rounded-full border ${
              selected === cat.value
                ? "bg-pink-500 text-white"
                : "bg-white text-pink-600"
            } shadow transition`}
            onClick={() => handleFilter(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
