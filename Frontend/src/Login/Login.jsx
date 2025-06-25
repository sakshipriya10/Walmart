import React from "react";
import { Link } from "react-router-dom";


const Login = () => {
  return (
<div className="w-screen h-screen flex items-center justify-center bg-[#ffe4f0] font-sans">

      <div className="bg-white shadow-xl rounded-3xl flex w-[900px] h-[550px] overflow-hidden">
        {/* Left Side - Image and Text */}
        <div className="w-1/2 bg-[#fdf2f8] flex flex-col items-center justify-center p-8">
          <img
            src="./Login.jsx"
            alt="Logo"
            className="w-40 mb-6"
          />
          <h2 className="text-lg font-semibold text-[#333]">Discover Your Style</h2>
          <p className="text-sm text-[#555] mt-2 text-center">
            Colorful finds for a vibrant life. 🌈
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-10 bg-white">
          <div className="mb-6 text-right">
            <a href="/" className="text-sm text-pink-600 hover:underline">
              🔙 Back to Home
            </a>
          </div>
          <h2 className="text-2xl font-bold text-[#333] mb-2">Welcome Back! ✨</h2>
          <p className="text-sm text-[#666] mb-6">
            Sign in to continue your shopping journey.
          </p>

          <form autoComplete="off">
            <label className="block mb-2 text-sm text-[#555]">Your email</label>
            <input
              type="email"
              placeholder="name@pastel.com"
              className="w-full p-3 rounded-xl border border-[#ccc] mb-4 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <label className="block mb-2 text-sm text-[#555]">Your password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-xl border border-[#ccc] mb-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="text-pink-600 flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-pink-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold hover:opacity-90 transition"
            >
              Sign In
            </button> 

            <div className="text-center my-4 text-sm text-[#999]">OR New User ?</div>

<div className="text-center mt-4">
<Link to="/SignUp" className="text-blue-600">Sign up</Link>

</div>



{/* 
            <div className="text-center my-4 text-sm text-[#999]">OR New User ?</div>

            <button
              type="submit"
              className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>

            {/* <button
              type="button"
              className="w-full p-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button> */} 

            <p className="text-sm text-center mt-6 text-[#777]">
              Don’t have an account yet?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
