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
        <h1 className="text-5xl md:text-6xl font-extrabold text-white-600 leading-tight mb-4  opacity-0 animate-fade-in-down ">
          Find Your Perfect <br />
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Home Aesthetic.
          </span>
        </h1>

        <p className="text-gray-600  font-semibold text-lg md:text-xl mb-6">
          Shop curated collections of modern furniture, decor, and essentials designed
          to elevate your living space.
        </p>
         
  <button className="bg-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-pink-700 transition">
    Explore More
  </button>

        
      </div>
    </section>
  );
}
