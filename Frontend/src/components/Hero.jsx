 import { Link } from "react-router-dom";
import bgImage from "../assets/heroBg.jpg";
import AssistantComponent from "../assistant/AssistantPage"; // Assuming this is the AI component

export default function Hero() {
  return (
    <section className="w-screen overflow-x-hidden">
      {/* Hero Banner */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 "></div>

        <div className="relative z-10 flex flex-col justify-center h-full pl-12 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down">
            Your taste. Your trends. <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Powered by UrbanEDGE Mart.
            </span>
          </h1>

          <p className="text-white/80 font-medium text-lg md:text-xl mb-6">
            Discover the latest trends in clothing and accessories. Curated styles and essentials to elevate your wardrobe for every season.
          </p>

          <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition w-fit">
            Explore More
          </button>
        </div>
      </div>

  {/* AI Assistant Feature Section */}
      <div className="bg-gradient-to-b from-cyan-100 to-blue-50 py-16 px-8  md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          💡 Meet Your Personal Shopping Assistant
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-5">
          Ask our AI Assistant to help you find the perfect styles based on color, category, or budget. Try asking: <em>"Show me black jackets under 1000"</em>!
        </p>

        <div className="max-w-4xl mx-auto shadow-xl border rounded-xl p-4 bg-gray-50">
          {/* Embedding the assistant component directly */}
          <AssistantComponent />
        </div>
      </div> 

    </section>
  );
}
