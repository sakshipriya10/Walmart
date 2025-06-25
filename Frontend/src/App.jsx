import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./register/SignUp.jsx";
import Login from "./Login/Login.jsx";
import Home from "./home/Home.jsx";
import UserProfile from "./UserProfile/UserProfile.jsx";

import TryOnPage from "./Pages/TryOnPage.jsx";
import About from "./Pages/About.jsx";
import ShoppingPage from './GamifiedShopping/ShoppingPage.jsx';
import ContactUs from './Contact/ContactUs.jsx';
function App() {
  return (
     <BrowserRouter>
     <Routes>
      
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/ShoppingPage" element={<ShoppingPage/>} />
      <Route path="/" element={<Home />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      {/* Redirect to Home if no route matches */}
      
     <Route path="/TryOnPage" element={<TryOnPage/>} />  
     <Route path="/About" element={<About/>} />

     <Route path="/contact" element={<ContactUs />} />
    
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
