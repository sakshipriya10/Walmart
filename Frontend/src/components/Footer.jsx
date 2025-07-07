import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t mt-4">
      {/* Top Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-8 px-4 md:px-16">
        <div>
          <div className="text-3xl mb-2">🚚</div>
          <h3 className="font-semibold text-lg">Free Delivery</h3>
          <p className="text-sm text-gray-600">
            Enjoy hassle-free delivery on all your fashion and beauty favorites.
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">💳</div>
          <h3 className="font-semibold text-lg">Secure Online Payment</h3>
          <p className="text-sm text-gray-600">
            Pay with confidence using our fully encrypted payment gateway.
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">🔄</div>
          <h3 className="font-semibold text-lg">Easy Returns</h3>
          <p className="text-sm text-gray-600">
            Not happy with your purchase? Return it easily within 7 days.
          </p>
        </div>
      </div>

      {/* Middle Info Section */}
      <div className="border-t py-10 px-4 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
        {/* Logo + Contact */}
        <div>
          <h2 className="font-bold text-lg mb-4">UrbanEdge Mart</h2>
          <p className="flex items-start gap-2 text-gray-600">
            <FaMapMarkerAlt /> Shop 009A, Level 4, Block A, Demo Park, Ottawa
          </p>
          <p className="flex items-center gap-2 mt-2 text-gray-600">
            <FaPhoneAlt /> +1-613-555-0182
          </p>
          <p className="flex items-center gap-2 mt-2 text-gray-600">
            <FaEnvelope /> contact@urbanedgemart.com
          </p>
        </div>

        {/* My Account */}
        <div>
          <h3 className="font-semibold mb-4">My Account</h3>
          <ul className="space-y-2 text-gray-600">
            <li>My Profile</li>
            <li>Order History</li>
            <li>Order Tracking</li>
            <li>Shopping Cart</li>
          </ul>
        </div>

        {/* Shop Departments */}
        <div>
          <h3 className="font-semibold mb-4">Shop Departments</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Men's & Women's Fashion</li>
            <li>Makeup & Skincare</li>
            <li>Accessories & Jewelry</li>
            <li>Seasonal Collections</li>
          </ul>
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
