import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMsg("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/Login"), 2000);
    } catch (err) {
      setMsg("Error: " + (err.response?.data?.message || "Try again"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-pink-500">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 rounded w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-200 text-pink-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-pink-300 transition"
        >
          Set New Password
        </button>
        {msg && <div className="mt-4 text-center text-sm text-gray-700">{msg}</div>}
      </form>
    </div>
  );
}