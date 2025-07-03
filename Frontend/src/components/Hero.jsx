  import { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/heroBg.jpg";
import AssistantComponent from "../assistant/AssistantPage";
import ObjectDetection from "../components/ObjectDetection";
import ARViewer from "../components/ARViewer";
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ for page navigation


export default function Hero() {
  const [showAssistant, setShowAssistant] = useState(false);
  const [showDetection, setShowDetection] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate(); // ✅ Add this line
  const bottomRef = useRef(null);

const handleScrollToBottom = () => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
};



  return (
    <section className="w-screen overflow-x-hidden">
      {/* Hero Banner */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0  bg-opacity-30"></div>

        <div className="relative z-10 flex flex-col justify-center h-full pl-12 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down">
            Your taste. Your trends. <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Powered by UrbanEDGE Mart.
            </span>
          </h1>

          <p className="text-gray-500 font-medium text-lg md:text-xl mb-6">
            Discover the latest trends in clothing and accessories. Curated styles and essentials to elevate your wardrobe for every season.
          </p>

       <button
         className="relative px-3 py-2 font-semibold text-white text-sm bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-3xl shadow-3xl ring-1 ring-cyan-600 hover:ring-1 hover:shadow-cyan-500/80 hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.6)] transition-all duration-300"
         onClick={handleScrollToBottom}
       >
         Explore More
       </button>

        </div>
      </div>

      {/* Smart Features */}
      <div className="bg-white-50 py-16 px-8 md:px-20 text-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-blue-500 to-cyan-300 mb-4">
           Smart Shopping Tools
        </h2>
     
        <p className="text-gray-600 max-w-2xl mx-auto mb-5">
          ⚡️Ask questions to your AI assistant or scan real-world objects to unlock smart product recommendations and AR previews.
        </p>

   <div className="flex flex-col md:flex-row justify-center gap-6">
  {/* AI Assistant Card with Gradient Border */}
  <div className="md:w-1/2 w-full">
    <div className="p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl h-full">
      <div className="bg-white rounded-xl p-6 h-full text-left">
        <h3 className="text-xl font-semibold mb-2">🔒 Personal AI Assistant</h3>
        <p className="text-gray-600 mb-4">
          Try asking: <em>"Show me black jackets under ₹1000"</em>
        </p>
        <button
          className="relative px-4 py-2 font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg shadow-lg ring-2 ring-purple-600 hover:ring-2 hover:shadow-purple-500/80 hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.6)] transition-all duration-300"
          onClick={() => setShowAssistant(true)}
        >
          Start Assistant
        </button>
        {showAssistant && (
          <div className="mt-6">
            <AssistantComponent />
            <button
              onClick={() => setShowAssistant(false)}
              className="mt-4 text-sm text-red-500 underline"
            >
              Close Assistant
            </button>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Object Detection Card with Gradient Border */}
  <div className="md:w-1/2 w-full">
    <div className="p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl h-full">
      <div className="bg-white rounded-xl p-6 h-full text-left">
        <h3 className="text-xl font-semibold mb-2">🎥 Smart Object Detection</h3>
        <p className="text-gray-600 mb-4">
          Detect real-world items using your webcam and get shopping suggestions instantly.
        </p>
        <button
          className="relative px-4 py-2 font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg shadow-lg ring-2 ring-purple-600 hover:ring-2 hover:shadow-purple-500/80 hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.6)] transition-all duration-300"
          onClick={() => setShowDetection(true)}
        >
          Start Detection
        </button>

        {showDetection && (
          <div className="mt-6">
            <ObjectDetection />
            <button
              onClick={() => setShowDetection(false)}
              className="mt-4 text-sm text-red-500 underline"
            >
              Close Detection
            </button>
          </div>
          
        )}
      </div>
    </div>
  </div>
</div>
</div>

<div ref={bottomRef}></div>

    </section>
  );
}