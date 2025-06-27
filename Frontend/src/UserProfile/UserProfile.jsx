// src/pages/UserProfile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:5000/api/user/userDetails",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User data:", res.data);
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user profile", err);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!userData) return <div>Loading user data...</div>;

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#F8BBD0] to-[#E1BEE7] flex flex-col relative justify-center items-center p-6">
      <div className="min-h-screen flex items-center justify-center bg-pink-100">
        <div className="w-[420px] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-pink-100">
          {/* Profile Image */}
          

          {/* User Info */}
          <h2 className="text-3xl font-extrabold text-pink-500 mb-1 tracking-wide">
            {userData.fullName}
          </h2>
          <p className="text-gray-600 mb-1 text-lg">{userData.email}</p>
          <p className="text-gray-600 mb-1 text-lg">
            Phone: <span className="font-medium">{userData.phone || "N/A"}</span>
          </p>
          <p className="text-gray-600 mb-1 text-lg">
            Gender: <span className="font-medium">{userData.gender || "N/A"}</span>
          </p>
          <p className="text-gray-600 mb-1 text-lg">
            Interests:{" "}
            <span className="font-medium">
              {userData.interests?.join(", ") || "N/A"}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
            <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-300 transition">
              Wishlist
            </button>
            <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-300 transition">
              Edit Profile
            </button>
            <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-300 transition">
              Logout
            </button>
            <button className="bg-blue-200 text-blue-900 px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-300 transition"
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