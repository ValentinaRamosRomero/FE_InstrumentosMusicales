import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Componentes/Products/ProductDetail.jsx";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
