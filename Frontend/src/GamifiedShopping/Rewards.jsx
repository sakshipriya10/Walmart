 export default function Rewards() {
  return (
    <div className="bg-white p-3 rounded-xl shadow-md">
      <h2 className="font-semibold text-xl mb-2">Rewards System</h2>
      <div className="bg-gray-200 rounded-full h-4 w-full mb-2">
        <div className="bg-purple-400 h-4 rounded-full w-[70%]"></div>
      </div>
      <p className="text-lg font-bold">850 POINTS</p>
      <p className="text-sm text-gray-600">Earn points for purchases, reviews, and more</p>
      <button className="mt-3 px-4 py-2 bg-gray-200 rounded hover:scale-[1.02] hover:shadow-md">Rewards Store</button>
    </div>
  );
}
