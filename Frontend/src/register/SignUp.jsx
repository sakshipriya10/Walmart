import React from "react";
import { Link } from "react-router-dom";


const SignUp = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#F8BBD0] to-[#E1BEE7] flex flex-col relative justify-center items-center p-6">
      
      {/* Brand Text */}
      <h1 className="text-3xl font-extrabold text-black absolute top-6 left-6">
        UrbanEdgeMART
      </h1>

      {/* Form Box */}
            <div className="bg-white rounded-2xl shadow-lg px-12 py-12 w-full max-w-xl mt-20">

        <h2 className="text-2xl font-bold text-center mb-1">Create Account</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Let’s get you started on your shopping journey!
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-white text-black bg-black/20"

          />

          <div className="flex gap-3">
             <select className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-black bg-white/20">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="tel"
              placeholder="Phone Number"
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-white text-black bg-black/20"

            />
          </div>

          <input
            type="email"
            placeholder="email@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none placeholder-white text-black bg-black/20"

          />

          {/* Interests */}
          <div>
            <p className="font-semibold text-sm mb-2">Shopping Interests ✨</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-500" />
                Women’s Fashion
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-500" />
                Men’s Fashion
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-500" />
                Electronics
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-500" />
                Home & Decor
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md"
          >
            Sign Up Now
          </button>

          <div className="text-sm text-black text-center mt-3">
            <label className="flex items-center justify-center gap-2">
              <input type="checkbox" className="accent-black" />
              I agree to the{" "}
              <a href="#" className="text-purple-700 font-medium">
                Terms of Service
              </a>
            </label>
          </div>

          <p className="text-xs text-black text-center mt-2">
            Already have an account?{" "}
           <Link to="/Login" className="text-blue-600">Sign in</Link>

          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
