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
import { useRef } from "react";
import { spinWheel } from "../api/spin";  // API call
import spinWheelImage from "../assets/spinWheel.jpg";  // Image

export default function DailySpin() {
  const wheelRef = useRef(null); // to target the image

  async function handleSpin() {
    if (wheelRef.current) {
      // Reset any existing animation
      wheelRef.current.style.animation = "none";
      // Force reflow to reset animation
      wheelRef.current.offsetHeight; 
      // Apply spin animation
      wheelRef.current.style.animation = "spin 2s ease-out";
    }

    try {
      const result = await spinWheel();
      console.log("You won:", result.reward); // Show result
    } catch (error) {
      console.error("Spin failed", error);
    }
  }

  return (
    <div className="bg-white p-3 rounded-xl shadow-md text-center">
      <h2 className="font-bold text-xl mb-2">Daily Spin</h2>
      <img
        ref={wheelRef}
        src={spinWheelImage}
        alt="Spin Wheel"
        className="mx-auto w-full h-25 mb-4"
        style={{ maxWidth: "200px" }} // optional sizing
      />
      <button
        className="bg-purple-400 text-white px-4 py-2 rounded hover:scale-[1.02] hover:shadow-md"
        onClick={handleSpin}
      >
        SPIN
      </button>
      <p className="text-sm mt-2 text-gray-600">You can spin the wheel once a day</p>
    </div>
  );
}
