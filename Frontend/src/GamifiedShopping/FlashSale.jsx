import React, { useState, useEffect } from "react";

const FlashSaleClock = () => {
  const saleHour = 16; // 6 PM in 24-hour format
  const saleMinute = 0;

  const [timeRemaining, setTimeRemaining] = useState(getTimeUntilNextSale());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(getTimeUntilNextSale());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeUntilNextSale() {
    const now = new Date();
    const nextSale = new Date();
    nextSale.setHours(saleHour, saleMinute, 0, 0);

    // If sale time already passed today, schedule for tomorrow
    if (now >= nextSale) {
      nextSale.setDate(nextSale.getDate() + 1);
    }

    const diff = nextSale - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, isLive: diff <= 0 };
  }

  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
      {timeRemaining.isLive ? (
        <span>🔥 Flash Sale is LIVE!</span>
      ) : (
        <span>
          Flash Sale starts in&nbsp;
          {String(timeRemaining.hours).padStart(2, "0")}:
          {String(timeRemaining.minutes).padStart(2, "0")}:
          {String(timeRemaining.seconds).padStart(2, "0")}
        </span>
      )}
    </div>
  );
};

export default FlashSaleClock;
