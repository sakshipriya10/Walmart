import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Load cart from localStorage (or fetch from backend if needed)
    setCart(JSON.parse(localStorage.getItem("cart")) || []);

    // 2. Load selected address ID from localStorage
    const addressId = localStorage.getItem("selectedAddressId");

    if (addressId) {
      axios
        .get(`http://localhost:5000/api/address/${addressId}`)
        .then((res) => {
          setAddress(res.data); // Adjust based on your API's return shape
        })
        .catch((err) => {
          console.error("Error fetching address:", err);
        });
    }
  }, []);

  const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id || !address || cart.length === 0) {
      alert("Missing required information");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/order/place", {
        userId: user.id,
        addressId: address._id,
        items: cart,
      });

      console.log("Order placed:", res.data);
      localStorage.removeItem("cart");
      localStorage.removeItem("selectedAddressId");
      navigate("/orders"); // Redirect to order history
    } catch (err) {
      console.error("Order failed:", err);
      alert("Order placement failed. Please try again.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-[#FFFBFA] py-8 px-4">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">Confirm Your Order</h2>

      {/* Cart Summary */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Cart Items:</h3>
        {cart.map((item) => (
          <div key={item.productId} className="flex justify-between py-1">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
        <p className="font-bold mt-2 text-right">
          Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}
        </p>
      </div>

      {/* Address Summary */}
      {address && (
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Deliver to:</h3>
          <p>{address.name}</p>
          <p>{address.street}, {address.city}</p>
          <p>{address.state} - {address.pincode}</p>
          <p>{address.country}</p>
          <p>📞 {address.phone}</p>
        </div>
      )}

      <button
        onClick={handlePlaceOrder}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg shadow"
      >
        Place Order
      </button>
    </div>
  );
}
