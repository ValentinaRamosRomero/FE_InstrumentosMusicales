import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import user_icon from "../../assets/user-icon.svg";
import MenuHamburguesa from "./MenuHamburguesa";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const Header = ({ isAuthenticated, userData, onLogout }) => {
  // Estado para controlar el menú desplegable
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Para navegación

  // Función para alternar el menú desplegable
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirigir al home después de cerrar sesión
  };

  // Función para navegar al login
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <header className="header">
      {/* Logo alineado a la izquierda */}
      <img src={logo} alt="Logo" className="logo" />

      {/* Botones de autenticación o perfil de usuario dependiendo del estado */}
      {isAuthenticated && userData ? (
        <div className="user-profile">
          <div className="user-info" onClick={toggleDropdown}>
            <div className="user-initials">
              {userData.nombre?.charAt(0)}{userData.apellido?.charAt(0)}
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
          <button className="btn-login" onClick={goToLogin}>Iniciar Sesión</button>
        </div>
      )}

      {/* Menú hamburguesa en móviles */}
      <MenuHamburguesa 
        isAuthenticated={isAuthenticated} 
        userData={userData} 
        onLogout={handleLogout} 
      />
    </header>
  );
};

export default Header;
