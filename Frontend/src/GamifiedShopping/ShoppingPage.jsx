 import React from "react";
import DailySpin from "./DailySpin";
import Rewards from "./Rewards";
import Leaderboard from "./Leaderboard";
import ChallengesQuests from "./ChallengesQuests";
import ProductBadges from "./ProductBadges";
import AugmentedReality from "./AugmentedReality";
import FlashSale from "./FlashSale";

export default function ShoppingPage() {
  

  // ✅ Get userId from localStorage (or from auth context if you use one)
  const userId = localStorage.getItem("userId");

  return (
    <div className="w-screen h-full min-h-screen bg-gray-100 px-8 py-8 p-0 m-0">
      {/* Header with Flash Sale */}
      <div className="flex items-center justify-between mu-0 mb-2 bg-white px-3 py-4 rounded-xl shadow m-0 p-0">
        <h1 className="text-3xl font-bold text-gray-900">Gamified Shopping</h1>
        <FlashSale />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Daily Spin */}
        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <DailySpin />
        </div>

        {/* Challenges & Quests */}
        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <ChallengesQuests userId={userId} />
        </div>

        {/* Augmented Reality */}
        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <AugmentedReality />
        </div>

        {/* Rewards System */}
        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <Rewards userId={userId} />
        </div>

        {/* Product Badges */}
        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <ProductBadges />
        </div>

        {/* Leaderboard */}
        <div className="rounded-xl shadow p-4 h-full transition-transform hover:scale-105 hover:shadow-xl duration-300 bg-blue-50">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
