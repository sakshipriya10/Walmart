 
 export default function Navbar() {
  return (
    <nav className="  fixed top-0 w-full z-10 flex items-center justify-between bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100 px-8 py-3 shadow-md  border-pink-200">
      {/* Logo as text */}
      <div className="flex items-center">
        <span className="text-2xl font-bold text-pink-500 tracking-wide">UrbanEDGE Mart</span>
      </div>

      {/* Search bar */}
      <input
        type="text"
        className=" ml-4 flex-1 max-w-md px-4 py-2 rounded-3xl border border-pink-200 bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Search furniture, decor..."
      />

      {/* Navigation buttons */}
      <ul className="flex space-x-6 ml-8  text-pink-700 text-semibold">
        <li className="hover:text-pink-400 cursor-pointer transition">Home</li>
        <li className="hover:text-pink-400 cursor-pointer transition">About</li>
        <li className="hover:text-pink-400 cursor-pointer transition">Experiences</li>
        <li className="hover:text-pink-400 cursor-pointer transition">Contact</li>
        <li className="hover:text-pink-400 cursor-pointer transition">User Profile</li>
      </ul>

      {/* Add to cart, Login, Signup */}
      <div className="flex items-center space-x-4 ml-8 ">
        <span className="relative text-2xl text-blue-400 cursor-pointer hover:text-pink-400 transition">
          🛒
          <sup className="absolute -top-2 -right-3 bg-pink-300 text-xs text-white rounded-full px-2">3</sup>
        </span>
        <button className="px-4 py-2 bg-pink-200 text-pink-900 rounded-3xl border rounded font-semibold hover:bg-pink-300 transition">Login</button>
        <button className="px-4 py-2 bg-pink-200 text-pink-900 rounded-3xl border rounded font-semibold hover:bg-pink-300 transition">Sign Up</button>
      </div>
    </nav>
  );
 }