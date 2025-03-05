import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Componentes/Products/ProductDetail";
import Login from "./Pages/Login/Login"; 
import RegisterPage from "./Pages/Register/Register";

const App = () => {
  // Estados de autenticación centralizados
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({toke:null, role:null});
  
  // Verificar si hay token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      setIsAuthenticated(true);
      try {
        const storedUserData = JSON.parse(
          localStorage.getItem("user") || "{}"
        );
        setUserData(storedUserData);
      } catch (error) {
        console.error("Error al parsear datos de usuario:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (token, role) => {
    console.log(role)
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(role));
    setIsAuthenticated(true);
    setUserData(role);
    
  };
  console.log(userData);
  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserData(null);
  };

  // Props de autenticación para pasar a los componentes
  const authProps = {
    isAuthenticated,
    userData,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    return isAuthenticated && userData && userData.role === "ADMIN";
  };

  return (
    <Router>
      <Routes>
        ¿ {/* Ruta principal */}
        <Route path="/" element={<Home {...authProps} />} />
        {/* Ruta de login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login {...authProps} />
          }
        />
        {/* Ruta de detalle de producto */}
        <Route path="/:id" element={<ProductDetail {...authProps} />} />
        {/* Ruta de home personalizado para después del login */}
        <Route
          path="/home/:id"
          element={
            isAuthenticated ? <Home {...authProps} /> : <Navigate to="/login" />
          }
        />
        {/* ✅ Ruta Registro */}
        <Route path="/register" element={<RegisterPage />} />{" "}
        {/* Ruta del panel de administrador - Protegida */}
        <Route
          path="/admin"
          element={
            isAdmin() ? (
              <AdminPanel {...authProps} />
            ) : (
              <Navigate
                to="/"
                replace
                state={{
                  from: "/admin",
                  message: "No tienes permisos de administrador",
                }}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
