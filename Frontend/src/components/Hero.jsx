 import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/heroBg.jpg";
import AssistantComponent from "../assistant/AssistantPage";
import ObjectDetection from "../components/ObjectDetection";

export default function Hero() {
  const [showAssistant, setShowAssistant] = useState(false);
  const [showDetection, setShowDetection] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const handleScrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-screen overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center flex items-center justify-start"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 " />
        <div className="relative z-10 px-6 md:px-12 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-snug mb-4 animate-pulse infinite">
            Your taste. Your trends. <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-textGlow">
              Powered by UrbanEDGE Mart.
            </span>
          </h1>

          <p className="text-gray-800 text-sm sm:text-base md:text-lg mb-6 max-w-xl">
            Discover the latest trends in clothing and accessories. Curated styles to elevate your wardrobe for every season.
          </p>

          <button
            onClick={handleScrollToBottom}
            className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-2xl hover:shadow-[0_0_20px_#38bdf8] ring-1 ring-cyan-500 transition-all duration-300"
          >
             Explore More ✨

          </button>
        </div>
      </div>

      {/* Smart Shopping Section */}
      <div className="bg-white py-16 px-4 sm:px-8 md:px-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-blue-500 to-cyan-300 mb-4">
          Smart Shopping Tools
        </h2>

        <p className="text-gray-700 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
          ⚡️ Ask questions to your AI assistant or scan real-world objects to unlock smart recommendations and AR previews.
        </p>

        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8">
          {/* AI Assistant */}
          <div className="w-full lg:w-1/2">
            <div className="p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl">
              <div className="bg-white rounded-xl p-6 h-full text-left">
                <h3 className="text-lg text-pink-600 font-semibold mb-2">🤖 Personal AI Assistant</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Try asking: <em>"Show me black jackets under ₹1000"</em>
                </p>
                <button
                  onClick={() => setShowAssistant(true)}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:scale-105 shadow-lg transition-all duration-300"
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

          {/* Object Detection */}
          <div className="w-full lg:w-1/2">
            <div className="p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl">
              <div className="bg-white rounded-xl p-6 h-full text-left">
                <h3 className="text-lg text-indigo-600 font-semibold mb-2">🎥 Smart Object Detection</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Scan real-world items using your webcam and get instant suggestions.
                </p>
                <button
                  onClick={() => setShowDetection(true)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:scale-105 shadow-lg transition-all duration-300"
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
