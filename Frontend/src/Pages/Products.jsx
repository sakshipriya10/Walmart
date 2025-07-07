import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [challengeMessage, setChallengeMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { label: "All", value: "all" },
    { label: "Men's Fashion", value: "men's clothing" },
    { label: "Women's Fashion", value: "women's clothing" },
    { label: "Accessories", value: "jewelery" },
    { label: "Makeup", value: "makeup" },
    { label: "Jackets", value: "jackets" },
    { label: "Shoes", value: "shoes" },
  ];

  // 🔍 Check if user came from challenge
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fromChallenge = queryParams.get("fromChallenge");

    if (fromChallenge === "category") {
      setChallengeMessage("🎯 You're here to complete your Category Challenge!");
      setSelected("all"); // You can change this default
    }
  }, [location.search]);

  // 🌐 Fetch products from backend
  useEffect(() => {
  let ignore = false;

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      if (!ignore) {
        setAllProducts(res.data);
        setFiltered(res.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      if (!ignore) setLoading(false);
    }
  };

  fetchProducts();

  return () => {
    ignore = true; // prevents second call in dev mode
  };
}, []);


  // 🔄 Filter when selected category changes
  useEffect(() => {
    if (selected === "all") {
      setFiltered(allProducts);
    } else {
      setFiltered(allProducts.filter((p) => p.category === selected));
    }
  }, [selected, allProducts]);

  const handleFilter = (category) => {
    setSelected(category);
  };

  if (loading) return <p className="text-center mt-8">Loading products...</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-[#FDEEF4] to-[#E0F7FA] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        UrbanEdgeMART Collection
      </h1>

      {/* 🎯 Challenge Message */}
      {challengeMessage && (
        <div className="text-center text-pink-700 font-medium mb-4 bg-pink-100 p-3 rounded-lg shadow-md">
          {challengeMessage}
        </div>
      )}

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
          <div
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
            className="cursor-pointer bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image || product.thumbnail}
              alt={product.title}
              className="h-48 w-full object-contain mb-4 rounded"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {product.title}
            </h2>
            <p className="text-pink-600 font-bold text-md">
              ₹{Math.round(product.price * 85)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;