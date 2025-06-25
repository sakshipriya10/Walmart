  import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./register/SignUp.jsx";
import Login from "./Login/Login.jsx";
import Home from "./home/Home.jsx";

import TryOnPage from "./Pages/TryOnPage.jsx";
import ShoppingPage from './GamifiedShopping/ShoppingPage.jsx';


function App() {
  return (
    <BrowserRouter>
     <Routes>
      {/* Default route goes to Signup */}
<<<<<<< Updated upstream
      
      <Route path="/SignUp" element={<SignUp />} />
=======
       
      <Route path="/" element={<SignUp />} />
>>>>>>> Stashed changes
      <Route path="/Login" element={<Login/>} />
      <Route path="/ShoppingPage" element={<ShoppingPage/>} />
      <Route path="/" element={<Home />} />
      
     <Route path="/TryOnPage" element={<TryOnPage/>} />      
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
