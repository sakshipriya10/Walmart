 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ---------- Emoji “icons” (no package needed) ---------- */
const Heart = () => <span role="img" aria-label="heart" className="text-pink-500">❤️</span>;
const Cart = () => <span role="img" aria-label="cart"  className="mr-1">🛒</span>;
const Trash = () => <span role="img" aria-label="delete" className="mr-1">🗑️</span>;

const WishlistPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  /** Auth header helper (assumes JWT in localStorage) */
  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  /* ---------- Fetch wishlist on mount ---------- */
  useEffect(() => {
    axios
      .get("/api/wishlist", authHeader())
      .then((res) => setItems(res.data))          // [{_id,name,price,image}]
      .catch((err) => console.error(err));
  }, []);

  /* ---------- Actions ---------- */
  const removeItem = (productId) =>
    axios
      .delete(`/api/wishlist/${productId}`, authHeader())
      .then(() => setItems((prev) => prev.filter((p) => p._id !== productId)));

  const moveToCart = (productId) =>
    axios
      .post(`/api/wishlist/${productId}/move-to-cart`, {}, authHeader())
      .then(() => setItems((prev) => prev.filter((p) => p._id !== productId)))
      .then(() => navigate("/cart"));             // optional redirect

  return (
  <div className="w-screen min-h-screen px-6 py-12 bg-[#FFEEEE]">
    <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
      <Heart /> My Wishlist
    </h1>

    {items.length === 0 ? (
      <p className="text-center text-gray-500">Your wishlist is empty.</p>
    ) : (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map(({ _id, name, price, image }) => (
          <div
            key={_id}
            className="bg-white rounded-2xl shadow p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={image}
              alt={name}
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-medium text-gray-800 text-center line-clamp-2">
              {name}
            </h2>
            <p className="text-pink-600 font-semibold mt-1">₹{price}</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => moveToCart(_id)}
                className="flex items-center bg-[#f9c8d9] text-black text-sm px-3 py-1 rounded-lg hover:bg-[#f7b4cd]"
              >
                <Cart /> Add&nbsp;to&nbsp;Cart
              </button>
              <button
                onClick={() => removeItem(_id)}
                className="flex items-center bg-[#f9c8d9] text-black text-sm px-3 py-1 rounded-lg hover:bg-[#f7b4cd]"
              >
                <Trash /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default WishlistPage;
