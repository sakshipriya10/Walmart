import React from "react";

import DailySpin from "./DailySpin";
import Rewards from "./Rewards";
import Leaderboard from "./Leaderboard";
import ChallengesQuests from "./ChallengesQuests";
import AugmentedReality from "./AugmentedReality";
import FlashSale from "./FlashSale";

export default function ShoppingPage() {
  const userId = localStorage.getItem("userId"); // optional, for props

  return (
    <div className="w-screen h-full min-h-screen bg-gray-100 px-8 py-8 p-0 m-0">
      {/* Header with Flash Sale */}
      <div className="flex items-center justify-between mu-0 mb-2 bg-white px-3 py-4 rounded-xl shadow m-0 p-0">
        <h1 className="text-3xl font-bold text-gray-900">Gamified Shopping</h1>
        <FlashSale />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <DailySpin />
        </div>

        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <ChallengesQuests userId={userId} />
        </div>

        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <AugmentedReality />
        </div>

        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <Rewards userId={userId} />
        </div>

        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
