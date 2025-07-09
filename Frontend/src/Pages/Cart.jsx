import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios
      .get("/api/cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err));
  };

  const handleRemove = (itemId) => {
    axios
      .delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setCart(cart.filter((item) => item._id !== itemId)); // Remove item from state
      })
      .catch((err) => console.error("Failed to remove item:", err));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-screen min-h-screen bg-[#FFEEEE] overflow-x-hidden flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl text-pink-700 font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 w-full max-w-md">
            {cart.map((item) => (
              <li
                key={item._id}
                className="bg-white p-4 rounded-xl shadow-md flex gap-4 items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-contain"
                  />
                  <div>
                    <h3 className="text-black font-semibold">{item.name}</h3>
                    <p className="text-pink-600 font-bold">₹{item.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-sm px-3 py-1 bg-pink-200 text-pink-900 rounded-lg hover:bg-pink-300 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xl text-pink-600 font-bold mt-6">Total: ₹{total}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/select-address")}
           >
           Select Delivery Address
         </button>
        </>
      )}
    </div>
  );
};

export default Cart;
