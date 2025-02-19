import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home.jsx";
import Landing from "./Pages/Landing/Landing.jsx";

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
