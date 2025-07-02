import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 bg-[#FDEEF4] min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item._id} className="bg-white p-4 rounded-xl shadow-md flex gap-4 items-center">
                <img src={item.image} className="h-16 w-16 object-contain" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-pink-600 font-bold">₹{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold mt-6">Total: ₹{total}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
