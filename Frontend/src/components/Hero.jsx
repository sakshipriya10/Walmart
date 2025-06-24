export default function Hero() {
  return (
    <div className="w-screen min-h-screen flex justify-center items-start bg-pink-100">
      <div className="w-[900px] bg-blue-100 text-gray-800 py-20 flex justify-center items-center rounded-2xl shadow-lg mt-12">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect <span className="text-pink-400">Home Aesthetic.</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl text-gray-500">
            Shop curated collections of modern furniture, decor, and essentials designed to elevate your living space.
          </p>
          <button className="px-8 py-3 bg-pink-200 text-gray-800 rounded font-semibold text-lg hover:bg-pink-300 transition">
            Shop Now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}