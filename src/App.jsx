import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Landing from "./Pages/Landing/Landing";
import Home from "./Pages/Home/Home";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/productos" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;
