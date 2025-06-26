 import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

function useClickOutside(handler) {
  const domNode = useRef();
  useEffect(() => {
    const maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);
  return domNode;
}

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const domNode = useClickOutside(() => setDropdownOpen(false));

  return (
    <nav className="fixed top-0 w-full z-10 flex items-center justify-between bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100 px-8 py-3 shadow-md border-pink-200">
      <div className="text-2xl font-bold text-pink-500">UrbanEDGE Mart</div>

      <input
        type="text"
        className="ml-4 flex-1 max-w-md px-4 py-2 rounded-3xl border border-pink-200 bg-white/80 text-gray-700"
        placeholder="Search furniture, decor..."
      />

      <ul className="flex space-x-6 ml-8 text-pink-700 font-semibold relative">
        <li className="hover:text-pink-400 cursor-pointer transition mt-3">Home</li>
        <Link to="/About">
  <li className="hover:text-pink-400 cursor-pointer transition mt-3">About</li>
</Link>

        <li ref={domNode} className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className=" bg-transparent hover:text-pink-400 cursor-pointer transition border-0 top-margin-0"
          >
             
            Experiences ▾
          </button>
          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-48 rounded-md bg-white shadow-lg z-50">
              <a href="/TryOnPage" className="block px-4 py-2 hover:bg-pink-100 text-sm">Virtual Try-On</a>
              <a href="/ShoppingPage" className="block px-4 py-2 hover:bg-pink-100 text-sm">Gamified Shopping</a>
              <a href="/ai-recommendations" className="block px-4 py-2 hover:bg-pink-100 text-sm">AI Recommendations</a>
            </div>
          )}
        </li>


        <li className="hover:text-pink-400 cursor-pointer transition mt-3">
  <Link to="/contact">Contact</Link>
</li>



        <li className="hover:text-pink-400 cursor-pointer transition mt-3">
          <Link to="/UserProfile">User Profile</Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4 ml-8">
        <span className="relative text-2xl text-blue-400 cursor-pointer hover:text-pink-400 transition">
          🛒
          <sup className="absolute -top-2 -right-3 bg-pink-300 text-xs text-white rounded-full px-2">3</sup>
        </span>
        <button className="px-4 py-2 bg-pink-200 text-pink-900 rounded-3xl font-semibold hover:bg-pink-300 transition">Login</button>
        <button className="px-4 py-2 bg-pink-200 text-pink-900 rounded-3xl font-semibold hover:bg-pink-300 transition">Sign Up</button>
      </div>
    </nav>
  );
}
