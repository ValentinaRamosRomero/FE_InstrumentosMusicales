import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Landing from "./pages/landing/Landing.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/productos" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
