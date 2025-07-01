import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMsg("Reset link sent to your email.");
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.message || "Try again"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-pink-500">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-200 text-pink-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-pink-300 transition"
        >
          Send Reset Link
        </button>
        {msg && <div className="mt-4 text-center text-sm text-gray-700">{msg}</div>}
      </form>
    </div>
  );
}