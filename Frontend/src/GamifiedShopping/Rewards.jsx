//  import { useEffect, useState } from "react";
// import axios from "axios";

// const Rewards = ({ userId }) => {
//   const [points, setPoints] = useState(0);

//   useEffect(() => {
//     const fetchPoints = async () => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/challenges/get", { userId });
//         setPoints(res.data.pointsEarned || 0);
//       } catch (err) {
//         console.error("Error fetching reward points:", err);
//       }
//     };

//     fetchPoints();
//   }, [userId]);

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-md">
//       <h2 className="text-lg font-bold text-black mb-2">Rewards System</h2>
//       <div className="w-full h-3 bg-gray-200 rounded-full mb-2">
//         <div
//           className="h-full bg-purple-500 rounded-full transition-all duration-300"
//           style={{ width: `${Math.min((points / 1000) * 100, 100)}%` }}
//         />
//       </div>
//       <p className="text-2xl font-bold text-purple-700">{points} POINTS</p>
//       <p className="text-sm text-gray-600">Earn points for purchases, reviews, and more</p>
//     </div>
//   );
// };

// export default Rewards;
import { useEffect, useState } from "react";
import axios from "axios";

const Rewards = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ JWT token

        if (!token) {
          console.warn("No token found. User might not be logged in.");
          return;
        }

        const res = await axios.post(
          "http://localhost:5000/api/challenges/get",
          {}, // ✅ No body needed
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Send token in headers
            },
          }
        );

        setPoints(res.data.pointsEarned || 0);
      } catch (err) {
        console.error("Error fetching reward points:", err);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold text-black mb-2">Rewards System</h2>
      <div className="w-full h-3 bg-gray-200 rounded-full mb-2">
        <div
          className="h-full bg-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${Math.min((points / 1000) * 100, 100)}%` }}
        />
      </div>
      <p className="text-2xl font-bold text-purple-700">{points} POINTS</p>
      <p className="text-sm text-gray-600">
        Earn points for purchases, reviews, and more
      </p>
    </div>
  );
};

export default Rewards;
