import React, { useState } from "react";
import "./MenuHamburguesa.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir
import user_icon from "../../assets/user-icon.svg";

const MenuHamburguesa = ({ isAuthenticated, userData, onLogout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Llama a la función de cierre de sesión
    }
    setMenuAbierto(false); // Cierra el menú
    navigate("/login"); // Redirige al usuario a la página de login
  };

  const handleLoginRedirect = () => {
    setMenuAbierto(false); // Cierra el menú
    navigate("/login"); // Redirige al usuario a la página de login
  };

  const handleRegisterRedirect = () => {
    setMenuAbierto(false); // Cierra el menú
    navigate("/register"); // Redirige al usuario a la página de registro
  };

  return (
    <div className="menu-hamburguesa">
      {/* Icono de menú hamburguesa */}
      <button className="menu-icono" onClick={toggleMenu}>
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menú lateral cuando está abierto */}
      <nav className={`menu-links ${menuAbierto ? "abierto" : ""}`}>
        {isAuthenticated ? (
          <>
            {/* Mostrar perfil de usuario cuando está autenticado */}
            <div className="mobile-user-profile">
              <img src={user_icon} alt="user-avatar" className="user-icon" />
              <div className="mobile-user-initials">
                {userData?.nombre?.charAt(0)}
                {userData?.apellido?.charAt(0)}
              </div>
            </div>
            {/* Opción de cerrar sesión */}
            <p className="auth-text" onClick={handleLogout}>
              Cerrar sesión
            </p>
          </>
        ) : (
          <>
            {/* Opciones de autenticación en el menú para móviles */}
            <p className="auth-text" onClick={handleRegisterRedirect}>
              Crear cuenta
            </p>
            <p className="auth-text" onClick={handleLoginRedirect}>
              Iniciar sesión
            </p>
          </>
        )}
      </nav>
    </div>
  );
};

export default MenuHamburguesa;
