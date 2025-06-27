import React, { useState } from "react";
import axios from "axios";

export default function AddressPage() {
  const [form, setForm] = useState({
    userId: "", // Set this to the logged-in user's ID if available
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/address/add", form);
      alert("Address added successfully!");
    } catch (err) {
      alert("Error adding address");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#F8BBD0] to-[#E1BEE7] flex flex-col relative justify-center items-center p-6">
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="w-[420px] bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-pink-100">
        <h2 className="text-2xl font-bold text-pink-500 mb-2">Add Address</h2>
        <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded bg-white text-black" required />
          <input name="street" placeholder="Street" value={form.street} onChange={handleChange} className="border p-2 rounded bg-white text-black" required />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 rounded bg-white text-black" required />
          <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border p-2 rounded bg-white text-black" required />
          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="border p-2 rounded bg-white text-black" required />
          <input name="country" placeholder="Country" value={form.country} onChange={handleChange} className="border p-2 rounded bg-white text-black" required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border p-2 rounded bg-white text-black" required />
          <button type="submit" className="bg-pink-200 text-pink-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-pink-300 transition">
            Add Address
          </button>
          </form>
      </div>
    </div>
    </div>
  );
}