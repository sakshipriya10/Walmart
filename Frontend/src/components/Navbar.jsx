  import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100 px-8 py-4 shadow-md border-b border-pink-200">
  {/* Logo + Tagline */}
  <div className="flex flex-col">
    <div className="text-3xl font-bold text-pink-500">UrbanEDGE Mart</div>
    <div className="text-sm font-medium text-pink-600 mt-1">Where Style Meets Experience.</div>
  </div>

  {/* Center Navigation Links */}
  <ul className="flex items-center gap-8 text-pink-700 font-semibold">
    <li className="hover:text-pink-400 cursor-pointer transition">Home</li>

    <Link to="/About">
      <li className="hover:text-pink-400 cursor-pointer transition">About</li>
    </Link>

    <li ref={domNode} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="bg-transparent hover:text-pink-400 cursor-pointer transition"
      >
        Experiences ▾
      </button>
      {dropdownOpen && (
        <div className="absolute top-full mt-2 w-48 rounded-md bg-white shadow-lg z-50">
          <a href="/TryOnPage" className="block px-4 py-2 hover:bg-pink-100 text-sm">Virtual Try-On</a>
          <a href="/ShoppingPage" className="block px-4 py-2 hover:bg-pink-100 text-sm">Gamified Shopping</a>
          <a href="/products" className="block px-4 py-2 hover:bg-pink-100 text-sm">Shop Now</a>
        </div>
      )}
    </li>

    <Link to="/contact">
      <li className="hover:text-pink-400 cursor-pointer transition">Contact</li>
    </Link>

    <Link to="/profile">
      <li className="hover:text-pink-400 cursor-pointer transition">User Profile</li>
    </Link>
  </ul>

  {/* Auth Buttons */}
  <div className="flex items-center gap-4">
    <Link to="/Login">
      <button className="px-4 py-2 bg-pink-200 text-pink-900 rounded-3xl font-semibold hover:bg-pink-300 transition">
        Login
      </button>
    </Link>

    <Link to="/SignUp">
      <button className="px-4 py-2 bg-pink-200 text-pink-900 rounded-3xl font-semibold hover:bg-pink-300 transition">
        Sign Up
      </button>
    </Link>
  </div>
</nav>


  );
}