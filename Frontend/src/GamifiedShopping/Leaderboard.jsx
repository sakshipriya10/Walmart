import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('/api/leaderboard');
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="font-bold text-xl mb-4 text-pink-600">🏆 Leaderboard</h2>

      {loading ? (
        <p className="text-gray-500 italic">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 italic">No leaderboard data yet.</p>
      ) : (
        users.map((user, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-800 mb-2">
            <div className="w-7 h-7 bg-pink-200 rounded-full flex items-center justify-center text-sm font-bold">
              {i + 1}
            </div>
            <span className="flex-1">
              {user.fullName}
            </span>
            <span className="text-sm text-gray-500">
              {user.pointsEarned} pts
            </span>
          </div>
        ))
      )}
    </div>
  );
}
