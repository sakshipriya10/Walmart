import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import FeaturedProducts from "../components/FeaturedProducts";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
     
      <Navbar />
      <Hero />
     <FeaturedProducts />
    <Link to="/profile" className="text-blue-600 underline">Go to Profile</Link>
    </div>
  );
}