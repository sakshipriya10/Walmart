// src/api/purchaseApi.js
import axios from "axios";

export const recordPurchase = async (userId, category) => {
  try {
    const res = await axios.post("http://localhost:5000/api/order/purchase", {
      userId,
      category,
    });
    return res.data;
  } catch (err) {
    console.error("Purchase tracking error:", err);
    return null;
  }
};
