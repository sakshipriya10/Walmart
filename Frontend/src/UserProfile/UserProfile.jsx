import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/SignUp");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/user/userDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);

        // Fetch addresses for this user
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
          const addrRes = await axios.get(`http://localhost:5000/api/address/user/${user.id}`);
          setAddresses(addrRes.data);
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
        navigate("/SignUp");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Delete address handler
  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/address/${id}`);
      setAddresses(addresses.filter((a) => a._id !== id));
    } catch (err) {
      alert("Failed to delete address");
    }
  };

  if (!userData) return <div>Loading user data...</div>;

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#F8BBD0] to-[#E1BEE7] flex flex-col justify-center items-center p-6">
      <div className="min-h-screen flex items-center justify-center bg-pink-100">
        <div className="w-[420px] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-pink-100">
          <h2 className="text-3xl font-extrabold text-pink-500 mb-6 tracking-wide text-center">
            {userData.fullName}
          </h2>
          <div className="w-full flex flex-col gap-2">
            <div className="flex">
              <span className="w-12 font-semibold text-gray-700">Email:</span>
              <span className="text-gray-600">{userData.email}</span>
            </div>
            <div className="flex">
              <span className="w-14 font-semibold text-gray-700">Phone:</span>
              <span className="text-gray-600">{userData.phone || "N/A"}</span>
            </div>
            <div className="flex">
              <span className="w-16 font-semibold text-gray-700">Gender:</span>
              <span className="text-gray-600">{userData.gender || "N/A"}</span>
            </div>
            <div className="flex">
              <span className="w-19 font-semibold text-gray-700">Interests:</span>
              <span className="text-gray-600">{userData.interests?.join(", ") || "N/A"}</span>
            </div>
            <div className="flex items-start">
              <span className="w-23 font-semibold text-gray-700">Address:</span>
              <span className="text-gray-600 flex-1">
                {addresses.length === 0
                  ? "N/A"
                  : addresses.map((addr, idx) => (
                      <span key={addr._id}>
                        {`${addr.name}, ${addr.street}, ${addr.city}, ${addr.state}, ${addr.pincode}, ${addr.country}, ${addr.phone}`}
                        <button
                          onClick={() => handleDeleteAddress(addr._id)}
                          style={{
                            color: "red",
                            marginLeft: "8px",
                            cursor: "pointer",
                            border: "none",
                            background: "none",
                          }}
                          title="Delete Address"
                        >
                          🗑️
                        </button>
                        {idx !== addresses.length - 1 && " | "}
                      </span>
                    ))}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6 w-full">
            <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-300 transition">
              Wishlist
            </button>
            <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-300 transition">
              Edit Profile
            </button>
            <button
              className="bg-blue-200 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-300 transition"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/Home");
              }}
            >
              Logout
            </button>
            <button
              className="bg-blue-200 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-300 transition"
              onClick={() => navigate("/address")}
            >
              Address
            </button>
            <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-300 transition">
              Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;