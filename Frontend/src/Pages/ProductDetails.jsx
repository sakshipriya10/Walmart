import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let res;
        if (id.startsWith("dummy-")) {
          const dummyId = id.replace("dummy-", "");
          res = await axios.get(`https://dummyjson.com/products/${dummyId}`);
        } else {
          res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        }
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
            className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition"
            onClick={() => addToCart({ ...product, price: Math.round(product.price * 85) })}
          >
            Add to Cart
          </button>
          <button
            className="bg-white border border-pink-600 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-100 transition"
            onClick={() => {
              addToCart({ ...product, price: Math.round(product.price * 85) });
              navigate("/cart");
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
