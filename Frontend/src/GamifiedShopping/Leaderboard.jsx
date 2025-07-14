import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('/api/leaderboard');
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white p-3 rounded-xl shadow-md">
      <h2 className="font-bold text-black text-xl mb-2">Leaderboard</h2>
      {users.map((user, i) => (
        <div key={user._id} className="flex items-center gap-2 text-gray-800 mb-1">
          <div className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center text-sm font-bold hover:scale-[1.02] hover:shadow-md">
            {i + 1}
          </div>
          <span>
  {user.fullName} — <span className="text-sm text-gray-500">{user.bonusPoints} pts</span>
</span>

        </div>
      ))}
    </div>
  );
}
