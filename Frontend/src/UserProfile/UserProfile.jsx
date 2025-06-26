import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#F8BBD0] to-[#E1BEE7] flex flex-col relative justify-center items-center p-6">
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="w-[420px] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-pink-100">
        {/* Profile Image */}
        <div className="w-36 h-36 rounded-full bg-pink-100 flex items-center justify-center mb-6 overflow-hidden shadow-lg border-4 border-blue-100">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {/* User Info */}
        <h2 className="text-3xl font-extrabold text-pink-500 mb-1 tracking-wide">Sakshi Priya</h2>
        <p className="text-gray-600 mb-1 text-lg">sakshi@example.com</p>
        <p className="text-gray-600 mb-1 text-lg">7667870198</p>
        <p className="text-blue-400 mb-6 font-medium">Patna, India</p>
        {/* Shipping Address */}
        
        {/* Order Summary */}
        <div className="w-full mb-6">
          <h3 className="font-semibold text-lg text-blue-400 mb-1">Order Summary</h3>
          <div className="flex flex-col gap-1 text-gray-700 text-base">
            <span><span className="font-semibold">Total Orders:</span> 8</span>
            <span><span className="font-semibold">Pending Deliveries:</span> 2</span>
            <span><span className="font-semibold">Last Order:</span> 15 June 2025</span>
          </div>
        </div>
        {/* Action Buttons */}
         <div className="grid grid-cols-3 gap-3 w-full">
          <button className="bg-pink-100 text-pink-600 px-6 py-2 rounded-xl font-semibold shadow hover:bg-pink-300 transition">Wishlist</button>
          <button className="bg-pink-100 text-pink-600 px-6 py-2 rounded-xl font-semibold shadow hover:bg-pink-300 transition">Edit Profile</button>
          <button className="bg-pink-100 text-pink-600 px-6 py-2 rounded-xl font-semibold shadow hover:bg-pink-300 transition">Logout</button>
          <button 
          className="bg-pink-100 text-pink-600 px-6 py-2 rounded-xl font-semibold shadow hover:bg-pink-300 transition"
          onClick={() => navigate("/address")}
          >
            Address
          </button>
          <button className="bg-pink-100 text-pink-600 px-6 py-2 rounded-xl font-semibold shadow hover:bg-pink-300 transition">Orders</button>
        </div>
      </div>
    </div>
    </div>
  );
};