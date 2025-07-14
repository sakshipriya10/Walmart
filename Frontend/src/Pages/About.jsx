 import React from "react";
import clothes from "../assets/clothing.jpg"
import makeup from "../assets/makeup.png";
import accessories from "../assets/accessories.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-50 to-white text-gray-900 p-10">
      <div className="max-w-full">
        {/* Header */}
        <h1 className="text-gray-800 text-4xl md:text-5xl font-bold mb-4 text-center animate-bounce">
          About UrbanEDGE MART
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-500 max-w-3xl mx-auto mb-10 animate-fade-in">
          Discover fashion, beauty, and lifestyle products powered by cutting-edge technology and elegant design.
        </p>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center animate-slide-in-right">
          <div>
            <img src={clothes} alt="Clothing" className="w-full max-w-sm mx-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-semibold text-pink-600 mb-2">Trendy Clothing</h2>
            <p className="text-pink-500 leading-relaxed">
              Discover contemporary clothing that suits every occasion. Whether it’s a casual hangout or a grand celebration, our collection ensures you’re always dressed in confidence, class, and charm.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center animate-slide-in-left">
          <div>
            <img src={makeup} alt="Makeup" className="w-full max-w-sm mx-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-semibold text-purple-600 mb-2">Beauty & Makeup</h2>
            <p className="text-purple-500 leading-relaxed">
              Explore radiant beauty products curated to bring out your best features. From bold makeup to natural skincare, each item is handpicked to enhance your daily glow.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center animate-slide-in-right">
          <div>
            <img src={accessories} alt="Accessories" className="w-full max-w-sm mx-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-semibold text-cyan-500 mb-2">Stylish Accessories</h2>
            <p className="text-cyan-400 leading-relaxed">
              Accentuate your outfit with our range of accessories. From classy handbags to statement earrings and digital watches, our selection elevates your entire look with finesse.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white/50 backdrop-blur-xl rounded-xl p-8 shadow-xl animate-fade-in">
          <h2 className="text-3xl font-semibold text-center text-pink-600 mb-6">Why Shop With Us?</h2>
          <ul className="grid md:grid-cols-2 gap-6 text-purple-900 text-lg list-disc list-inside">
            <li><strong>Virtual Try-On:</strong> Experience try-before-you-buy with smart camera tech.</li>
            <li><strong>Smart Maps:</strong> Navigate to nearby stores and view product origin easily.</li>
            <li><strong>Gamified Shopping:</strong> Complete fun tasks, earn badges, and unlock discounts.</li>
            <li><strong>AI-Powered Recommender:</strong> Discover what fits your vibe and preferences.</li>
            <li><strong>Exclusive Rewards:</strong> Earn loyalty points and exciting bonuses on every purchase.</li>
            <li><strong>Seamless Experience:</strong> Mobile-first, fast, and fun to use from any device.</li>
          </ul>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16 animate-bounce">
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">Join the UrbanEDGE MART Family!</h3>
          <p className="text-gray-700 mb-6">
            Shop smart. Look great. Experience more.
          </p>
          <Link to="/">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-[0_0_20px_#38bdf8] transition">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
