import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import user_icon from "../../assets/user-icon.svg"
import MenuHamburguesa from "./MenuHamburguesa";

const Header = () => {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState({ nombre: "Juan", apellido: "Pérez" });
  // Estado para controlar el menú desplegable
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Función para alternar el menú desplegable
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    //lógica para cerrar sesión (llamada API, limpiar localStorage, etc.)
  };

  // Simulación de autenticación, reemplazar  con  lógica reaL
  useEffect(() => {
    // Ejemplo: verificar si hay un token en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      //  obtener los datos del usuario desde tu API
    }
  }, []);

  return (
    <header className="header">
      {/* Logo alineado a la izquierda */}
      <img src={logo} alt="Logo" className="logo" />

      {/* Botones de autenticación o perfil de usuario dependiendo del estado */}
      {isAuthenticated ? (
        <div className="user-profile">
          <div className="user-info" onClick={toggleDropdown}>
            <div className="user-initials">
              {userData.nombre.charAt(0)}{userData.apellido.charAt(0)}
            </div>
            <div className="user-avatar">
              <img src={user_icon} alt="user-avatar" className="user-icon"/>
            </div>
          </div>
          {dropdownOpen && (
            <div className="user-dropdown">
              <button className="btn-logout" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <button className="btn-create-account">Crear cuenta</button>
          <button className="btn-login">Iniciar Sesión</button>
        </div>
      )}

      {/* Menú hamburguesa en móviles */}
      <MenuHamburguesa isAuthenticated={isAuthenticated} userData={userData} onLogout={handleLogout} />
    </header>
  );
};

export default Header;