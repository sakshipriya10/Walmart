  
import logo from '../assets/logo.jpeg';
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="UrbanEdge Mart Logo" style={{ height: '150px' }} />
      </div>

      <input type="text" className="search" placeholder="Search furniture, decor..." />

      <ul className="nav-links">
        <li>Categories</li>
        <li>Deals</li>
        <li>New Arrivals</li>
        <li>Best Sellers</li>
      </ul>

      <div className="actions">
        <span className="cart">🛒<sup className="badge">3</sup></span>
        <button className="login">Login</button>
        <button className="signup">Sign Up</button>
      </div>
    </nav>
  );
}