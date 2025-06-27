import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./register/SignUp.jsx";
import Login from "./Login/Login.jsx";
import Home from "./home/Home.jsx";
import UserProfile from "./UserProfile/UserProfile.jsx";

import TryOnPage from "./Pages/TryOnPage.jsx";
import About from "./Pages/About.jsx";
import ShoppingPage from './GamifiedShopping/ShoppingPage.jsx';
import ContactUs from './Contact/ContactUs.jsx';
import Footer from "./components/Footer.jsx"
import AddressPage from "./UserProfile/AddressPage.jsx";

import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";


import AssistantPage from "./assistant/AssistantPage.jsx";

function AppWrapper() {
 const location = useLocation();

  return (
 
 <div className="flex flex-col min-h-screen">
  <div className="flex-grow">


     <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/ShoppingPage" element={<ShoppingPage/>} />
      <Route path="/Home" element={<Home />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      {/* Redirect to Home if no route matches */}
      
     <Route path="/TryOnPage" element={<TryOnPage/>} />  
     <Route path="/About" element={<About/>} />
     <Route path="/contact" element={<ContactUs />} />

     <Route path="/address" element={<AddressPage />} />
     <Route path="/profile" element={<UserProfile />} />
    </Routes>


  </div>
 {/* ✅ Show footer only on Home page */}
      {location.pathname === "/" && <Footer />}
 
 </div>
   
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
