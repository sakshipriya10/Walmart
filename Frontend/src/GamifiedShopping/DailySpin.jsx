 import spinWheel from "../assets/spinWheel.jpg"

 
 export default function DailySpin() {
  return (
   
<div className="bg-white p-3 rounded-xl shadow-md text-center">
      <h2 className="font-bold text-xl mb-2">Daily Spin</h2>
      <img src={spinWheel} alt="Spin Wheel" className="mx-auto w-full h-25 mb-4" />
      <button className="bg-purple-400 text-white px-4 py-2 rounded hover:scale-[1.02] hover:shadow-md">SPIN</button>
      <p className="text-sm mt-2 text-gray-600">You can spin the wheel once a day</p>
    </div>
    
    
  );
}
