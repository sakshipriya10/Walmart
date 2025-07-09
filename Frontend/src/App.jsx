 import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import SignUp from "./register/SignUp.jsx";
import Login from "./Login/Login.jsx";
import Home from "./home/Home.jsx";
import UserProfile from "./UserProfile/UserProfile.jsx";
import TryOnPage from "./Pages/TryOnPage.jsx";
import About from "./Pages/About.jsx";
import ShoppingPage from "./GamifiedShopping/ShoppingPage.jsx";
import ContactUs from "./Contact/ContactUs.jsx";
import Footer from "./components/Footer.jsx";
import AddressPage from "./UserProfile/AddressPage.jsx";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import AssistantPage from "./assistant/AssistantPage.jsx";
import WishlistPage from "./Pages/WishlistPage";
import SelectDeliveryAddress from "./UserProfile/SelectDeliveryAddress.jsx";
import PlaceOrder from "./Pages/placeOrder.jsx";
import UserOrders from "./UserProfile/userOrders.jsx";


function AppWrapper() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
         <Route path="/shoppingpage" element={<ShoppingPage />} />

          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/TryOnPage" element={<TryOnPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="*" element={<Navigate to="/Home" />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/select-address" element={<SelectDeliveryAddress />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<UserOrders />} />
        </Routes>
      </div>

      {/* ✅ Show footer only on Home page */}
      {(location.pathname === "/" || location.pathname.toLowerCase() === "/home") && (
        <Footer />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
      <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
