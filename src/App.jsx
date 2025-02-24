import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ProductDetail from "./componentes/Products/ProductDetail.jsx";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/productos" element={<Home/>} />
        <Route path="/productos/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
