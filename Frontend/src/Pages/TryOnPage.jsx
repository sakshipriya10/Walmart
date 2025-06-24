import React, { useState } from "react";

const TryOnPage = () => {
  const [category, setCategory] = useState("clothes");

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#FDEEF4] to-[#E0F7FA] flex flex-col p-6">
      <h1 className="text-4xl font-bold text-[#4A4A4A] text-center mb-6">
        Virtual Try-On
      </h1>

      {/* Category Switch */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setCategory("clothes")}
          className={`px-6 py-2 rounded-full text-lg font-medium border ${
            category === "clothes"
              ? "bg-[#F8BBD0] text-white border-transparent"
              : "bg-white text-[#4A4A4A] border-gray-300"
          }`}
        >
          Clothes
        </button>
        <button
          onClick={() => setCategory("makeup")}
          className={`px-6 py-2 rounded-full text-lg font-medium border ${
            category === "makeup"
              ? "bg-[#CE93D8] text-white border-transparent"
              : "bg-white text-[#4A4A4A] border-gray-300"
          }`}
        >
          Makeup
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 gap-6">
        {/* Left: Try-On Area */}
        <div className="flex flex-col items-center justify-center flex-1  bg-[#E6E6FA] rounded-2xl p-6 shadow-lg">
          <div className="w-full h-full max-h-[500px] bg-[#F3F4F6] rounded-xl flex items-center justify-center">
            <span className="text-gray-400">Your image or live feed</span>
          </div>
          <button className="mt-6 bg-[#81D4FA] text-white px-5 py-2 rounded-lg hover:bg-[#4FC3F7] transition">
            Upload Photo / Start Camera
          </button>
        </div>

        {/* Right: Item List */}
        <div className="w-[350px] bg-[#E6E6FA] rounded-2xl p-6 shadow-lg overflow-y-auto">
          <h2 className="text-xl font-semibold text-[#4A4A4A] mb-4">
            Try {category === "clothes" ? "Clothes" : "Makeup"}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(12)].map((_, idx) => (
              <div
                key={idx}
                className="bg-[#F8BBD0] rounded-xl h-24 flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:scale-105 transition"
              >
                Item {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnPage;
