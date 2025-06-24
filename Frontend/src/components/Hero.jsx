export default function Hero() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-pink-100">
      <div className="flex w-[1100px] items-center justify-between relative">
        {/* Left: Content Box aligned left */}
        <div className="w-[800px]h-[100px]  bg-blue-100 text-gray-600 py-14 flex flex-col justify-center rounded-2xl shadow-lg px-10 z-20">
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
        {/* Right: Image */}
        <img
          src="https://thumbs.dreamstime.com/b/fashion-summer-women-clothes-set-cosmetics-accessories-flat-lay-top-view-91902924.jpg"
          alt="Aesthetic Clothing and Accessories"
          className="w-[420px] h-[370px] object-cover rounded-3xl shadow-2xl ml-12"
        />
      </div>
    </div>
  );
}