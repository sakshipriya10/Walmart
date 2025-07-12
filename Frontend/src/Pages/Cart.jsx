import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [relatedItems, setRelatedItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCart(res.data);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
      fetchAllRelated(res.data); // fetch related after cart is set
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllRelated = async (cartItems) => {
    try {
      const relatedMap = {};
      await Promise.all(
        cartItems.map(async (item) => {
          const res = await axios.get(
            `http://localhost:5000/api/products/related/${item.productId}`
          );
          relatedMap[item._id] = res.data;
        })
      );
      setRelatedItems(relatedMap);
    } catch (err) {
      console.error("Failed to fetch related items:", err);
    }
  };

  const handleRemove = (itemId) => {
    axios
      .delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setCart(cart.filter((item) => item._id !== itemId));
      })
      .catch((err) => console.error("Failed to remove item:", err));
  };

  const addToCart = async (product) => {
    try {
      await axios.post(
        `http://localhost:5000/api/cart/${product._id}`,
        {
          name: product.name,
          price: product.price,
          image: product.image,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-screen min-h-screen bg-[#FFEEEE] overflow-x-hidden flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl text-pink-700 font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-8 w-full max-w-2xl">
            {cart.map((item) => (
              <li
                key={item._id}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
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
                </div>

                {relatedItems[item._id]?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md text-gray-700 mb-2">
                      Frequently Bought Together:
                    </h4>
                    <div className="flex flex-col gap-3">
                      {relatedItems[item._id].map((related) => (
                        <div
                          key={related._id}
                          className="flex justify-between items-center bg-[#FFF7F7] p-3 rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={related.image}
                              alt={related.name}
                              className="h-12 w-12 object-contain"
                            />
                            <div>
                              <p className="text-sm font-semibold">
                                {related.name}
                              </p>
                              <p className="text-pink-600 text-sm font-bold">
                                ₹{related.price}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(related)}
                            className="text-sm px-2 py-1 bg-green-200 text-green-900 rounded hover:bg-green-300"
                          >
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <p className="text-xl text-pink-600 font-bold mt-6">Total: ₹{total}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
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
