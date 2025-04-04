import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Componentes/Products/ProductDetail";
import Login from "./Pages/Login/Login";
import RegisterPage from "./Pages/Register/Register";
import PanelAdmin from "./Componentes/PanelAdmin/PanelAdmin";
import Reservations from "./Componentes/Reservations/Reservations";
import Confirmation from "./Componentes/Reservations/Confirmation";

// Separate component to use useNavigate
const ProductDetailWrapper = ({ product, onReserve, ...props }) => {
  const navigate = useNavigate();

  const handleReserve = () => {
    onReserve(product, navigate);
  };

  return <ProductDetail {...props} onReserve={handleReserve} />;
};

const App = () => {
  // Estados de autenticación centralizados
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const handleReserveProduct = (product) => {
    setSelectedProduct(product);
    navigate("/reserva");
  };

  // Verificar si hay token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      setIsAuthenticated(true);
      try {
        const storedUserData = JSON.parse(localStorage.getItem("role") || "{}");
        setUserData(JSON.parse(storedUserData));
      } catch (error) {
        console.error("Error al parsear datos de usuario:", error);
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        //borrado del email e iniciales del usuario
        localStorage.removeItem("email");
        localStorage.removeItem("iniciales");
      }
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (token, userData) => {
    console.log("Login data:", { token, userData });
    localStorage.setItem("token", token);
    localStorage.setItem("role", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUserData(JSON.parse(userData));
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    localStorage.removeItem("email");
    localStorage.removeItem("iniciales");

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
    console.log({ isAuthenticated, userData });
    return isAuthenticated && userData && userData.role === "ADMIN";
  };

  return (
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
      <Route
        path="product-details/:id"
        element={
          <ProductDetail {...authProps} onReserve={handleReserveProduct} />
        }
      />
      {/* Ruta de home personalizado para después del login */}
      <Route
        path="/reserva"
        element={<Reservations {...authProps} product={selectedProduct} />}
      />
      <Route
        path="/home/:id"
        element={
          isAuthenticated ? <Home {...authProps} /> : <Navigate to="/login" />
        }
      />
      {/* Ruta Registro */}
      <Route path="/register" element={<RegisterPage />} />{" "}
      
      {/* Ruta del panel de administrador - Protegida */}
      {
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
        />
      }

      {<Route path="/confirmation" element={<Confirmation/>} /> }
    </Routes>
  );
};

// Wrap everything in Router in the main component
const MainApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default MainApp;