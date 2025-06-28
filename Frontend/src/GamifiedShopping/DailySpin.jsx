//  import spinWheel from "../assets/spinWheel.jpg"

 
//  export default function DailySpin() {
//   return (
   
// <div className="bg-white p-3 rounded-xl shadow-md text-center">
//       <h2 className="font-bold text-xl mb-2">Daily Spin</h2>
//       <img src={spinWheel} alt="Spin Wheel" className="mx-auto w-full h-25 mb-4" />
//       <button className="bg-purple-400 text-white px-4 py-2 rounded hover:scale-[1.02] hover:shadow-md">SPIN</button>
//       <p className="text-sm mt-2 text-gray-600">You can spin the wheel once a day</p>
//     </div>
    
    
//   );
// }
import React, { useRef, useState } from 'react';
import spinWheel from '../assets/spinWheel.png';
import pointer from '../assets/spinPointer.png';
import { spinWheelAPI } from '../api/spin';

export default function DailySpin() {
  const wheelRef = useRef(null);
  const [rotating, setRotating] = useState(false);
  const [reward, setReward] = useState('');

  const handleSpin = async () => {
    if (rotating) return;
    setRotating(true);

    try {
      const result = await spinWheelAPI("user123");
      if (result.success) {
        const angle = calculateRotationAngle(result.reward); // Calculate angle
        rotateWheel(angle);
        setTimeout(() => {
          setReward(result.reward);
          setRotating(false);
        }, 3000);
      } else {
        alert(result.message || result.error);
        setRotating(false);
      }
    } catch (error) {
      console.error(error);
      setRotating(false);
    }
  };

  const calculateRotationAngle = (reward) => {
    const rewards = ['100$', '900$', 'Jackpot', '5000$', '700$', '2000$', '50$', '1000$'];
    const index = rewards.indexOf(reward);
    const anglePerSegment = 360 / rewards.length;
    const spins = 5; // extra spins for animation
    return 360 * spins + index * anglePerSegment;
  };

  const rotateWheel = (angle) => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 3s ease-out';
      wheelRef.current.style.transform = `rotate(${angle}deg)`;
    }
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow-md text-center">
      <h2 className="font-bold text-xl mb-2">Daily Spin</h2>

      <div className="relative mx-auto" style={{ width: 200, height: 200 }}>
        {/* Pointer stays at top */}
        <img
          src={pointer}
          alt="Pointer"
          style={{
            position: 'absolute',
            top: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: 40
          }}
        />
        {/* Wheel rotates */}
        <img
          ref={wheelRef}
          src={spinWheel}
          alt="Spin Wheel"
          className="w-full h-full"
        />
      </div>

      <button
        onClick={handleSpin}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:scale-105"
        disabled={rotating}
      >
        {rotating ? 'Spinning...' : 'SPIN'}
      </button>

      {reward && <p className="mt-4 font-medium">🎁 You won: {reward}</p>}
      <p className="text-sm mt-2 text-gray-600">You can spin the wheel once a day</p>
    </div>
  );
}
