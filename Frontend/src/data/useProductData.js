// src/data/useProductData.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useProductData = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setAllProducts(res.data); // adjust this if your data is nested
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products from backend:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { allProducts, loading };
};
