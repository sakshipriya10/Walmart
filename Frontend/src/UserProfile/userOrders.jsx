import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) return;

        const res = await axios.get(`http://localhost:5000/api/order/user/${user.id}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      await axios.patch(`http://localhost:5000/api/order/cancel/${orderId}`);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel order");
    }
  };

  if (loading) {
    return <p className="text-center text-pink-400 text-lg mt-10">Loading your orders...</p>;
  }

  return (
    <div className="w-screen min-h-screen p-6 bg-[#FEF5EF]">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-pink-100 rounded-2xl p-6 shadow-md transition-all hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-pink-700 mb-2">
                Order ID: <span className="text-gray-700">{order._id}</span>
              </h3>

              <p className="text-sm text-gray-600 mb-3">Status: 
                <span className={`ml-1 font-semibold ${
                  order.status === "Cancelled" ? "text-red-400" : "text-green-500"
                }`}>
                  {order.status}
                </span>
              </p>

              <div className="space-y-1 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-gray-700">
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>

              {order.status !== "Cancelled" ? (
                <button
                  onClick={() => handleCancel(order._id)}
                  className="bg-pink-300 hover:bg-pink-400 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
                >
                  Cancel Order
                </button>
              ) : (
                <p className="text-sm text-red-400 font-medium">Order Cancelled</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
