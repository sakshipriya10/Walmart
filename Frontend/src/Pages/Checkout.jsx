 import React from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const fromChallenge = new URLSearchParams(location.search).get("fromChallenge");

  const handleCheckout = async () => {
    if (!userId || cart.length === 0) {
      toast.error("Cart is empty or user not found.");
      return;
    }

    try {
      // Simulate order placement
      await axios.post("http://localhost:5000/api/order/place", {
        userId,
        items: cart,
      });

      // Challenge progress
      if (fromChallenge === "category") {
        const uniqueCategories = new Set(cart.map((p) => p.category));
        for (let category of uniqueCategories) {
          await axios.post("http://localhost:5000/api/challenges/category-purchase", {
            userId,
            category,
          });
        }
        toast.success("🎉 +100 Bonus Points Earned for Category Challenge!");
      }

      // Clear cart and redirect
      clearCart();
      toast.success("🛍️ Order placed successfully!");
      setTimeout(() => navigate("/thank-you"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong during checkout.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index} className="border-b py-2">
                {item.title} - {item.category}
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
