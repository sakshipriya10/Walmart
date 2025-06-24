import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./register/SignUp.jsx";
import Login from "./Login/Login.jsx";

import ShoppingPage from './GamifiedShopping/ShoppingPage.jsx';
function App() {
  return (
     <BrowserRouter>
    
     <ShoppingPage />
     <Routes>
      {/* Default route goes to Signup */}
      <Route path="/" element={<SignUp />} />
      <Route path="/Login" element={<Login/>} />
     

      
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
