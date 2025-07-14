 import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  // Check for screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/60 border-b border-pink-200/60 px-6 py-3 shadow-md">
      <div className="flex items-center justify-between flex-wrap">
        {/* Logo + Tagline */}
        <div className="flex flex-col">
          <div className="text-2xl md:text-3xl font-bold text-pink-500">UrbanEDGE Mart</div>
          {/* <div className="text-xs md:text-sm font-medium text-pink-600 mt-0.5">
            Where Style Meets Experience.
          </div> */}
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-pink-700 font-semibold">
          <li className="hover:text-pink-400 transition cursor-pointer">Home</li>

          <Link to="/About">
            <li className="hover:text-pink-400 transition cursor-pointer">About</li>
          </Link>

          <Link to="/products">
            <li className="hover:text-pink-400 transition cursor-pointer">Shop Now</li>
          </Link>

          {/* Hover Dropdown */}
          <li className="relative group">
            <div className="cursor-pointer transition group-hover:text-pink-400">
              Experiences ▾
            </div>
            <div className="absolute top-full left-0 w-48 rounded-md bg-white shadow-lg z-50 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition duration-200">
              <Link to="/TryOnPage" className="block px-4 py-2 hover:bg-pink-100 text-sm">
                Virtual Try-On
              </Link>
              <Link to="/shoppingpage" className="block px-4 py-2 hover:bg-pink-100 text-sm">
                Gamified Shopping
              </Link>
            </div>
          </li>

          <Link to="/contact">
            <li className="hover:text-pink-400 transition cursor-pointer">Contact</li>
          </Link>

          <Link to="/profile">
            <li className="hover:text-pink-400 transition cursor-pointer">User Profile</li>
          </Link>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
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
      </div>

      {/* Mobile Nav (optional enhancement) */}
      {isMobile && (
        <div className="mt-3 flex flex-col gap-2 md:hidden text-pink-700 font-semibold">
          <Link to="/" className="hover:text-pink-400 transition">Home</Link>
          <Link to="/About" className="hover:text-pink-400 transition">About</Link>
          <Link to="/products" className="hover:text-pink-400 transition">Shop Now</Link>
          <Link to="/TryOnPage" className="hover:text-pink-400 transition">Virtual Try-On</Link>
          <Link to="/shoppingpage" className="hover:text-pink-400 transition">Gamified Shopping</Link>
          <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>
          <Link to="/profile" className="hover:text-pink-400 transition">User Profile</Link>

          <div className="flex gap-2 mt-2">
            <Link to="/Login">
              <button className="px-4 py-2 bg-pink-200 text-pink-900 rounded-3xl font-semibold hover:bg-pink-300 transition w-full">
                Login
              </button>
            </Link>
            <Link to="/SignUp">
              <button className="px-4 py-2 bg-pink-200 text-pink-900 rounded-3xl font-semibold hover:bg-pink-300 transition w-full">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
