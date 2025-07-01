// src/data/useProductData.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useProductData = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [
          fakeStoreRes,
          fragrances,
          skincare,
          dresses,
          tops,
          shoes,
        ] = await Promise.all([
          axios.get("https://fakestoreapi.com/products"),
          axios.get("https://dummyjson.com/products/category/fragrances"),
          axios.get("https://dummyjson.com/products/category/skincare"),
          axios.get("https://dummyjson.com/products/category/womens-dresses"),
          axios.get("https://dummyjson.com/products/category/tops"),
          axios.get("https://dummyjson.com/products/category/womens-shoes"),
        ]);

        const fakeStoreProducts = fakeStoreRes.data.filter((p) =>
          ["men's clothing", "women's clothing", "jewelery"].includes(p.category)
        );

        const dummyProducts = [
          ...fragrances.data.products,
          ...skincare.data.products,
          ...dresses.data.products,
          ...tops.data.products,
          ...shoes.data.products,
        ].map((item) => ({
          id: `dummy-${item.id}`,
          title: item.title,
          price: item.price,
          category: ["womens-dresses", "tops", "womens-shoes"].includes(item.category)
            ? "women's clothing"
            : "makeup",
          image: item.thumbnail,
          description: item.description,
        }));

        setAllProducts([...fakeStoreProducts, ...dummyProducts]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { allProducts, loading };
};
