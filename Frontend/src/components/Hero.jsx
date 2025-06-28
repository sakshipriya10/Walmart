  import { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/heroBg.jpg";
import AssistantComponent from "../assistant/AssistantPage";
import ObjectDetection from "../components/ObjectDetection";
import ARViewer from "../components/ARViewer";

export default function Hero() {
  const [showAssistant, setShowAssistant] = useState(false);
  const [showDetection, setShowDetection] = useState(false);
  const [showAR, setShowAR] = useState(false);

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

          <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition w-fit">
            Explore More
          </button>
        </div>
      </div>

      {/* Smart Features */}
      <div className="bg-blue-50 py-16 px-8 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          💡 Smart Shopping Tools
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-5">
          Ask questions to your AI assistant or scan real-world objects to unlock smart product recommendations and AR previews.
        </p>

        {/* Cards */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* AI Assistant Card */}
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2 text-left">
            <h3 className="text-xl font-semibold mb-2">🔒 Personal AI Assistant</h3>
            <p className="text-gray-600 mb-4">
              Try asking: <em>"Show me black jackets under ₹1000"</em>
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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

          {/* Object Detection Card */}
          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2 text-left">
            <h3 className="text-xl font-semibold mb-2">🎥 Smart Object Detection</h3>
            <p className="text-gray-600 mb-4">
              Detect real-world items using your webcam and get shopping suggestions instantly.
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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

        {/* Optional: AR Button */}
        <div className="mt-10">
          <button
            onClick={() => setShowAR(true)}
            className="bg-purple-600 text-white px-5 py-3 rounded-full font-semibold shadow hover:bg-purple-700"
          >
            🪄 Try AR Product Placement
          </button>
        </div>

        {showAR && (
          <ARViewer
            modelUrl="/models/plant1.glb"
            onClose={() => setShowAR(false)}
          />
        )}
      </div>
    </section>
  );
}