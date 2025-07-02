 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);

        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id) {
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

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/address/${id}`);
      setAddresses(addresses.filter((a) => a._id !== id));
    } catch (err) {
      alert("Failed to delete address");
    }
  };

  if (!userData) return <div className="text-center mt-10">Loading user data...</div>;

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-200 via-purple-100 to-pink-300 flex items-center justify-center p-4">
      {/* Glowy Gradient Border + Shadow */}
      <div className="p-[3px] rounded-xl bg-gradient-to-tr from-pink-500 via-purple-400 to-pink-500 shadow-[0_0_25px_rgba(238,72,153,0.6)]">
        <div className="bg-white rounded-xl p-8 w-full max-w-lg sm:w-[90%] md:w-[500px]">
          <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">{userData.fullName}</h1>

          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
            <p><strong>Gender:</strong> {userData.gender || "N/A"}</p>
            <p><strong>Interests:</strong> {userData.interests?.join(", ") || "N/A"}</p>
            <div>
              <strong>Address:</strong>
              {addresses.length === 0 ? (
                <span className="ml-2">N/A</span>
              ) : (
                <ul className="mt-1 list-disc list-inside space-y-1">
                  {addresses.map((addr) => (
                    <li key={addr._id} className="flex justify-between items-start text-xs">
                      <span>
                        {`${addr.name}, ${addr.street}, ${addr.city}, ${addr.state}, ${addr.pincode}, ${addr.country}, ${addr.phone}`}
                      </span>
                      <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteAddress(addr._id)}
                        title="Delete address"
                      >
                        🗑️
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
  {/* Wishlist Button */}
  <Link
    to="/wishlist"
    className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-lg text-sm"
  >
    ❤️ Wishlist
  </Link>

  {/* Cart Button */}
  <Link
    to="/cart"
    className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-lg text-sm"
  >
    🛒 Cart
  </Link>

  {/* Edit Profile */}
  <button
    className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-lg text-sm"
    onClick={() => navigate("/edit-profile")}
  >
    Edit Profile
  </button>

  {/* Logout */}
  <button
    onClick={() => {
      localStorage.removeItem("token");
      navigate("/Home");
    }}
    className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-lg text-sm"
  >
    Logout
  </button>

  {/* Address */}
  <button
    className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-lg text-sm"
    onClick={() => navigate("/address")}
  >
    Address
  </button>

  {/* Orders */}
  <button
    className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-lg text-sm col-span-2 sm:col-span-1"
  >
    Orders
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
