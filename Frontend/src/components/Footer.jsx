 import React from "react";
import { FaApple, FaGooglePlay, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t mt-10">
      {/* Top Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-8 px-4 md:px-16">
        <div>
          <div className="text-3xl mb-2">🚚</div>
          <h3 className="font-semibold text-lg">Free delivery</h3>
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div>
          <div className="text-3xl mb-2">💳</div>
          <h3 className="font-semibold text-lg">Online Payment</h3>
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div>
          <div className="text-3xl mb-2">🔄</div>
          <h3 className="font-semibold text-lg">Easy Return</h3>
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>

      {/* Middle Info Section */}
      <div className="border-t py-10 px-4 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Logo + Contact */}
        <div>
          <h2 className="font-bold text-lg mb-4">UrbanEdge Mart</h2>
          <p className="flex items-start gap-2"><FaMapMarkerAlt /> Shop 009A, Level 4, Block A, Demo Park, Ottawa</p>
          <p className="flex items-center gap-2 mt-2"><FaPhoneAlt /> +1-613-555-0182</p>
          <p className="flex items-center gap-2 mt-2"><FaEnvelope /> contact@yourmail.com</p>
        </div>

        {/* My Account */}
        <div>
          <h3 className="font-semibold mb-4">My Account</h3>
          <ul className="space-y-2 text-gray-600">
            <li>My Profile</li>
            <li>My Order History</li>
            <li>Order Tracking</li>
            <li>Shopping Cart</li>
          </ul>
        </div>

        {/* Shop Departments */}
        <div>
          <h3 className="font-semibold mb-4">Shop Departments</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Fashion & Accessories</li>
            <li>Makeup & Skincare</li>
            <li>TV, Video & Audio</li>
            <li>Cameras, Photo & Video</li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="font-semibold mb-4">Download App</h3>
          <div className="space-y-2">
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded">
              <FaApple /> Download from Apple App Store
            </button>
            <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded">
              <FaGooglePlay /> Get it on Google Play Store
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 py-4 border-t text-sm">
        © 2025 UrbanEdge Mart. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
