 import bgImage from "../assets/heroBg.jpg"; // update with your actual image path


export default function Hero() {
  return (
    <section
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full pl-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white-600 leading-tight mb-4  opacity-0 animate-fade-in-down ">
          "Your taste. Your trends. <br />
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Powered by UrbanEDGE Mart."
          </span>
        </h1>

        <p className="text-gray-600  font-semibold text-lg md:text-xl mb-6">
          Discover the latest trends in clothing and accessories. Curated styles and essentials to elevate your wardrobe for every season.
        </p>
         
  <button className="bg-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-pink-700 transition">
    Explore More
  </button>

        
      </div>
    </section>
  );
}
