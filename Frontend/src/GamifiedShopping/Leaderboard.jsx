 export default function Leaderboard() {
  const users = ['Courtney', 'Gavin', 'Colleen'];
  return (
    <div className="bg-white p-3 rounded-xl shadow-md">
      <h2 className="font-bold text-xl mb-2">Leaderboard</h2>
      {users.map((user, i) => (
        <div key={i} className="flex items-center gap-2 text-gray-800 mb-1">
          <div className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center text-sm font-bold hover:scale-[1.02] hover:shadow-md">
            {i + 1}
          </div>
          <span>{user}</span>
        </div>
      ))}
    </div>
  );
}
