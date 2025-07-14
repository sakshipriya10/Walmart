 import React, { useRef, useState } from "react";
import CanvasConfetti from "react-canvas-confetti";
import { useNavigate } from "react-router-dom";

const ScratchCard = () => {
  const [scratched, setScratched] = useState(false);
  const canvasRef = useRef(null);
  const confettiRef = useRef(null);
  const navigate = useNavigate();

  const coupons = ["SAVE50", "WALMART10", "DISCOUNT25", "FREESHIP", "LUCKY30"];
  const [rewardCode] = useState(() => coupons[Math.floor(Math.random() * coupons.length)]);

  const handleScratch = () => {
    if (!scratched) {
      setScratched(true);

      // Trigger confetti
      if (confettiRef.current) {
        confettiRef.current({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleShopClick = () => {
    navigate("/products");
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <CanvasConfetti
        ref={confettiRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
      />

      <div
        className="w-full max-w-xs h-40 bg-indigo-200 border border-yellow-300 flex items-center justify-center text-xl font-bold text-gray-800 cursor-pointer rounded-lg shadow-inner"
        onClick={handleScratch}
      >
        {scratched ? `🎁 Coupon: ${rewardCode}` : "🎯 Scratch Me"}
      </div>

      {scratched && (
        <>
          <p className="mt-3 text-green-600 text-sm text-center">
            🎉 You've unlocked a reward! Copy your coupon and shop now.
          </p>
          <button
            onClick={handleShopClick}
            className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-semibold shadow transition duration-300"
          >
            🛍️ Shop Now & Use Reward
          </button>
        </>
      )}
    </div>
  );
};

export default ScratchCard;
