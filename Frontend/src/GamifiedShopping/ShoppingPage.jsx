 import React from "react";

import DailySpin from "./DailySpin";
import Rewards from "./Rewards";
import Leaderboard from "./Leaderboard";
import ChallengesQuests from "./ChallengesQuests";
import FlashSale from "./FlashSale";
// import ScratchCard from "./ScratchCard"; // ✅ Import Scratch Card
import ScratchCard from "../components/ScratchCard";
import MiniQuiz from ".//MiniQuiz";


export default function ShoppingPage() {
  const userId = localStorage.getItem("userId"); // optional, for props

  return (
    <div className="w-screen min-h-screen p-0 m-0 bg-gradient-to-br from-cyan-100 via-blue-100 to-white">
      {/* Header with Flash Sale */}
      <div className="flex items-center justify-between mu-0 mb-2 bg-white px-3 py-4 rounded-xl shadow m-0 p-0">
        <h1 className="text-3xl font-bold text-black">Gamified Shopping</h1>
        <FlashSale />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="rounded-xl shadow p-4 h-full transition-transform duration-300 bg-blue-50 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.3)] hover:ring-2 hover:ring-blue-300">
          <DailySpin />
        </div>

        <div className="rounded-xl shadow p-4 h-full transition-transform duration-300 bg-blue-50 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.3)] hover:ring-2 hover:ring-blue-300">
          <ChallengesQuests userId={userId} />
        </div>

        {/* ✅ New Scratch Card Section */}
        <div className="rounded-xl shadow p-4 h-full transition-transform duration-300 bg-blue-50 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.3)] hover:ring-2 hover:ring-blue-300">
          <ScratchCard />
        </div>

        <div className="rounded-xl shadow p-4 h-full transition-transform duration-300 bg-blue-50 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.3)] hover:ring-2 hover:ring-blue-300">
          <Rewards userId={userId} />
        </div>

        <div className="rounded-xl shadow p-4 h-full transition-transform duration-300 bg-blue-50 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.3)] hover:ring-2 hover:ring-blue-300">
          <Leaderboard />
        </div>
        <div className="rounded-xl shadow p-4 h-full transition-transform duration-300 bg-blue-50 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.3)] hover:ring-2 hover:ring-blue-300">
          <MiniQuiz />
        </div>
      </div>
    </div>
  );
}

