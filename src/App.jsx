import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Componentes/Products/ProductDetail";
import LoginPage from "./Pages/Login/Login";  // ✅ Agregamos la importación de Login
import RegisterPage from "./Pages/Register/Register";  // ✅ Agregamos la importación de Register

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />  {/* ✅ Nueva ruta */}
        <Route path="/register" element={<RegisterPage />} />  {/* ✅ Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;
