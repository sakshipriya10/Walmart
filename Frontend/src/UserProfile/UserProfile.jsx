import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    interests: "",
  });
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
        setFormData({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          gender: res.data.gender || "",
          interests: (res.data.interests || []).join(", "),
        });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const updated = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        interests: formData.interests.split(",").map((i) => i.trim()),
      };
      await axios.put("http://localhost:5000/api/user/update", updated, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(updated);
      setIsEditing(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!userData) return <div className="text-center mt-10">Loading user data...</div>;

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-200 via-purple-100 to-pink-300 flex items-center justify-center p-4">
      <div className="p-[3px] rounded-xl bg-gradient-to-tr from-pink-500 via-purple-400 to-pink-500 shadow-[0_0_25px_rgba(238,72,153,0.6)]">
        <div className="bg-white rounded-xl p-8 w-full max-w-lg sm:w-[90%] md:w-[500px]">
          <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">
            {isEditing ? "Edit Profile" : userData.fullName}
          </h1>

          <div className="space-y-3 text-sm text-gray-700">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                   className="w-full rounded px-3 py-2 bg-pink-100 text-black placeholder-white placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-pink-400"

                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                   className="w-full rounded px-3 py-2 bg-pink-100 text-black placeholder-white placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-pink-400"

                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                   className="w-full rounded px-3 py-2 bg-pink-100 text-black placeholder-white placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-pink-400"

                />
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                   className="w-full rounded px-3 py-2 bg-pink-100 text-black placeholder-white placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-pink-400"

                />
                <input
                  type="text"
                  name="interests"
                  placeholder="Interests (comma-separated)"
                  value={formData.interests}
                  onChange={handleChange}
                   className="w-full rounded px-3 py-2 bg-pink-100 text-black placeholder-white placeholder-opacity-80 focus:outline-none focus:ring-2 focus:ring-pink-400"

                />
              </>
            ) : (
              <>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone || "N/A"}</p>
                <p><strong>Gender:</strong> {userData.gender || "N/A"}</p>
                <p><strong>Interests:</strong> {userData.interests?.join(", ") || "N/A"}</p>
              </>
            )}

            {/* Address List */}
            <div>
              <strong>Address:</strong>
              {addresses.length === 0 ? (
                <span className="ml-2">N/A</span>
              ) : (
                <ul className="mt-1 list-disc list-inside space-y-1 text-xs">
                  {addresses.map((addr) => (
                    <li key={addr._id} className="flex justify-between">
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
  {!isEditing ? (
    <>
      <Link to="/wishlist" className="btn bg-pink-200 hover:bg-pink-300 text-pink-800 rounded py-2">❤️ Wishlist</Link>
      <Link to="/cart" className="btn bg-pink-200 hover:bg-pink-300 text-pink-800 rounded py-2">🛒 Cart</Link>
      <button className="btn bg-pink-200 hover:bg-pink-300 text-pink-800 rounded py-2" onClick={() => setIsEditing(true)}>Edit Profile</button>
      <button className="btn bg-pink-200 hover:bg-pink-300 text-pink-800 rounded py-2" onClick={() => {
        localStorage.removeItem("token");
        navigate("/Home");
      }}>Logout</button>
      <button className="btn bg-pink-200 hover:bg-pink-300 text-pink-800 rounded py-2" onClick={() => navigate("/address")}>Address</button>
      <button className="btn bg-pink-200 hover:bg-pink-300 text-pink-800 rounded py-2 col-span-2 sm:col-span-1">Orders</button>
    </>
  ) : (
    <>
      <button className="btn bg-green-300 hover:bg-green-400 rounded py-2 text-white" onClick={handleUpdate}>Save</button>
      <button className="btn bg-gray-300 hover:bg-gray-400 rounded py-2" onClick={() => setIsEditing(false)}>Cancel</button>
    </>
  )}
</div>
        </div>
      </div>
    </div>
  );
};

// Utility class
const btnClass = "bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold px-4 py-2 rounded-lg text-sm";
const btn = (props) => <button className={btnClass} {...props} />;

export default UserProfile;
