
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Componentes/Products/ProductDetail.jsx";
import Login from "./Pages/Login/Login"; // Importa el componente Login


const App = () => {
  // Estados de autenticación centralizados
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Verificar si hay token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      try {
        const storedUserData = JSON.parse(localStorage.getItem("usuario") || "{}");
        setUserData(storedUserData);
      } catch (error) {
        console.error("Error al parsear datos de usuario:", error);
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (token, usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setIsAuthenticated(true);
    setUserData(usuario);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setIsAuthenticated(false);
    setUserData(null);
  };

  // Props de autenticación para pasar a los componentes
  const authProps = {
    isAuthenticated,
    userData,
    onLogin: handleLogin,
    onLogout: handleLogout
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home {...authProps} />} />
        
        {/* Ruta de login */}
        <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/" /> : 
            <Login {...authProps} />
        } />
        
        {/* Ruta de detalle de producto */}
        <Route path="/:id" element={<ProductDetail {...authProps} />} />
        
        {/* Ruta de home personalizado para después del login */}
        <Route path="/home/:id" element={
          isAuthenticated ? 
            <Home {...authProps} /> : 
            <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
};

export default App;
