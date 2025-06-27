import React from "react";
import clothes from "../assets/clothes.png";
import makeup from "../assets/makeup.png";
import accessories from "../assets/accessories.png";
import { Link } from "react-router-dom";
// Removed featuresImg import since it's not used anymore

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE2E4] to-[#E2ECE9] text-gray-800 p-10">
      <div className="max-w-full">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#7C6A9C]">
          About UrbanEdgeMART
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Your one-stop destination for the latest in fashion, beauty, and lifestyle.
        </p>
             
        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src={clothes}
              alt="Clothing"
              className="rounded-xl shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-semibold text-[#C08497] mb-2">Trendy Clothing</h2>
            <p className="text-gray-700 leading-relaxed">
              From everyday essentials to statement pieces, UrbanEdgeMART offers a wide
              variety of clothing options designed to keep you stylish and confident.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 flex-row-reverse">
          <div>
            <img
              src={makeup}
              alt="Makeup"
              className="rounded-xl shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-semibold text-[#F2A7B3] mb-2">Beauty & Makeup</h2>
            <p className="text-gray-700 leading-relaxed">
              Explore our curated collection of beauty products. Whether you're a makeup
              enthusiast or a skincare lover, we've got something just for you.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src={accessories}
              alt="Accessories"
              className="rounded-xl shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-semibold text-[#A2C7E5] mb-2">Stylish Accessories</h2>
            <p className="text-gray-700 leading-relaxed">
              Elevate your look with our handpicked accessories, including bags, jewelry,
              and more – all designed to complement your style effortlessly.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-[rgb(241,201,216)] backdrop-blur-xl rounded-xl p-8 shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-[#6D6875] mb-6">Why Shop With Us?</h2>
          <ul className="grid md:grid-cols-2 gap-6 text-gray-800 text-lg list-disc list-inside">
            <li><strong>Virtual Try-On:</strong> Try products before you buy using your camera.</li>
            <li><strong>Smart Maps:</strong> Discover product origin, store pickups, and nearby offers.</li>
            <li><strong>Gamified Shopping:</strong> Earn rewards, play to win discounts, and level up.</li>
            <li><strong>Product Recommender:</strong> Personalized suggestions powered by AI.</li>
            <li><strong>Rewards & Points:</strong> Loyalty benefits that actually benefit you.</li>
            <li><strong>Mobile-First Design:</strong> Smooth shopping across all screen sizes.</li>
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-[#7C6A9C] mb-2">Join the UrbanEdgeMART Family!</h3>
          <p className="text-gray-700 mb-6">
            Experience a new way of shopping that's fun, fashionable, and futuristic.
          </p>
          <Link to = "/">
           <button className="px-6 py-3 bg-[#F2A7B3] text-white font-semibold rounded-full shadow-lg hover:bg-[#e18ca1] transition">
            Start Shopping
          </button>
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default About;
