import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SelectDeliveryAddress() {
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      axios
        .get(`http://localhost:5000/api/address/user/${user.id}`)
        .then((res) => setAddresses(res.data));
    }
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
  };

  const handleConfirm = () => {
    if (selected) {
      // Save selected address to localStorage or context, or send to backend
      localStorage.setItem("selectedAddressId", selected._id);
      console.log("Saved Address ID:", selected._id);
      alert("Delivery address selected!");
      // Redirect to next step (e.g., payment)
      navigate("/place-order");
    } else {
      alert("Please select an address.");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F8BBD0] to-[#E1BEE7]">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold text-pink-500 mb-4 text-center">Select Delivery Address</h2>
        {addresses.length === 0 ? (
          <div className="text-gray-600 text-center">No addresses found. Please add one.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {addresses.map((addr) => (
              <label
                key={addr._id}
                className={`flex items-center border rounded-lg p-3 cursor-pointer ${
                  selected === addr._id ? "border-pink-400 bg-pink-50" : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  value={addr._id}
                  checked={selected === addr._id}
                  onChange={() => handleSelect(addr._id)}
                  className="mr-3"
                />
                <span>
                  {addr.name}, {addr.street}, {addr.city}, {addr.state}, {addr.pincode}, {addr.country}, {addr.phone}
                </span>
              </label>
            ))}
          </div>
        )}
        <button
  onClick={() => {
    if (!selected) {
      alert("Please select an address");
      return;
    }
    localStorage.setItem("selectedAddressId", selected);
    console.log("Selected address stored:", selected);
    navigate("/place-order");
  }}
  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded"
>
  Confirm Delivery Address
</button>

      </div>
    </div>
  );
}