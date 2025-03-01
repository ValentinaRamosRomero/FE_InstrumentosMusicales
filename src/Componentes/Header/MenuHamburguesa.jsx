import React, { useState } from "react";
import "./MenuHamburguesa.css";
import { FaBars, FaTimes } from "react-icons/fa";

const MenuHamburguesa = ({ isAuthenticated, userData, onLogout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setMenuAbierto(false);
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
              <div className="mobile-user-initials">
                {userData.nombre.charAt(0)}{userData.apellido.charAt(0)}
              </div>
              <div className="mobile-user-avatar"></div>
            </div>
            {/* Opción de cerrar sesión */}
            <p className="auth-text" onClick={handleLogout}>Cerrar sesión</p>
          </>
        ) : (
          <>
            {/* Opciones de autenticación en el menú para móviles */}
            <p className="auth-text">Crear cuenta</p>
            <p className="auth-text">Iniciar sesión</p>
          </>
        )}
      </nav>
    </div>
  );
};

export default MenuHamburguesa;