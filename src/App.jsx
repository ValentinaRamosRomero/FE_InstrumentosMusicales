import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import RegisterPage from "./Pages/Register/Register";
import PanelAdmin from "./Componentes/PanelAdmin/PanelAdmin";
import ProductDetail from "./Componentes/Products/ProductDetail"; // Comentado temporalmente si no se usa

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
        const storedUserData = localStorage.getItem("role");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error("Error al parsear datos de usuario:", error);
        localStorage.removeItem("role");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (token, userData) => {
    console.log("Login data:", { token, userData });
    localStorage.setItem("token", token);
    localStorage.setItem("role", JSON.stringify(userData)); // Almacena los datos correctamente
    setIsAuthenticated(true);
    setUserData(userData); // Ya está en formato JSON
  };

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
    return isAuthenticated && userData?.role === "ADMIN";
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home {...authProps} />} />

        {/* Ruta de login */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login {...authProps} />}
        />

        {/* Ruta de detalle de producto (comentada si no se usa) */}
        {/* <Route path="/producto/:id" element={<ProductDetail {...authProps} />} /> */}

        {/* Ruta de home personalizado después del login */}
        <Route
          path="/home/:id"
          element={isAuthenticated ? <Home {...authProps} /> : <Navigate to="/login" />}
        />

        {/* Ruta de Registro */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Ruta del panel de administrador - Protegida */}
        <Route
          path="/admin"
          element={
            isAdmin() ? (
              <PanelAdmin {...authProps} />
            ) : (
              <Navigate to="/" replace state={{ from: "/admin", message: "No tienes permisos de administrador" }} />
            )
          }
        />

        {/* Ruta de detalle de producto, si se descomenta */}
        <Route path="/product-details/:id" element={<ProductDetail />} />

      </Routes>
    </Router>
  );
};

export default App;