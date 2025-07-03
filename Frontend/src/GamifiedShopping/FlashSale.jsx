import React, { useState, useEffect } from "react";

const FlashSaleClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="bg-purple-400 text-white px-4 py-2 rounded-xl font-bold">
      Flash Sale &nbsp; {formatTime(currentTime)}
    </div>
  );
};

export default FlashSaleClock;
