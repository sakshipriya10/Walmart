 import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  { name: "Smart Watch", price: "$59", img: "https://picsum.photos/200?1" },
  { name: "Wireless Earbuds", price: "$39", img: "https://picsum.photos/200?2" },
  { name: "Gaming Mouse", price: "$29", img: "https://picsum.photos/200?3" },
  { name: "Bluetooth Speaker", price: "$49", img: "https://picsum.photos/200?4" },
  { name: "Fitness Band", price: "$35", img: "https://picsum.photos/200?5" },
  { name: "Power Bank", price: "$25", img: "https://picsum.photos/200?6" },
];

const FeaturedProducts = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100 relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">🔥 Trending Products</h2>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
      >
        <ChevronRight />
      </button>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 px-8 pb-4 scroll-smooth no-scrollbar"
      >
        {products.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="min-w-[220px] bg-gray-100 p-4 rounded-xl shadow-md flex-shrink-0 hover:scale-105 transition-transform text-center text-black"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-blue-600 font-bold">{item.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
