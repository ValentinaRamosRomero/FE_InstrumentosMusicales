import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
{/*import ProductDetail from "./Componentes/Products/ProductDetail";*/}
import Login from "./Pages/Login/Login";
import RegisterPage from "./Pages/Register/Register";
import PanelAdmin from "./Componentes/PanelAdmin/PanelAdmin";

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
        const storedUserData = JSON.parse(localStorage.getItem("role") || "{}");
        setUserData(storedUserData);
      } catch (error) {
        console.error("Error al parsear datos de usuario:", error);
        localStorage.removeItem("role");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (token, userData) => {
    console.log("Login data:", userData);
    localStorage.setItem("token", token);
    localStorage.setItem("role", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUserData(userData);
  };
  console.log(userData);
  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
        {/*<Route path="/:id" element={<ProductDetail {...authProps} />} />*/}
        {/* Ruta de home personalizado para después del login */}
        <Route
          path="/home/:id"
          element={
            isAuthenticated ? <Home {...authProps} /> : <Navigate to="/login" />
          }
        />
        {/* Ruta Registro */}
        <Route path="/register" element={<RegisterPage />} />{" "}
        <Route path="/admin" element={<PanelAdmin/>} />
        {/* Ruta del panel de administrador - Protegida */}
        {/*
          <Route
            path="/admin"
            element={
              isAdmin() ? (
                <PanelAdmin {...authProps} />
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
        */
        
          <Route path="/admin" element={<PanelAdmin/>} /> 
        
          }
          {/*<Route path="/producto/:id" element={<ProductDetail />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
