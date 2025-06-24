import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./register/SignUp.jsx";
function App() {
  return (
     <BrowserRouter>
     <Routes>
      {/* Default route goes to Signup */}
      <Route path="/" element={<SignUp />} />

    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
