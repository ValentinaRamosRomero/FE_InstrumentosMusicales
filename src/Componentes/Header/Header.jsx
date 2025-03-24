import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import user_icon from "../../assets/user-icon.svg";
import MenuHamburguesa from "./MenuHamburguesa";
import { useState } from "react";

const Header = ({ isAuthenticated, userData, onLogout }) => {
  //console.log(userData)
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

  {/*Función para navegar al panel de administrador
  const goToAdminPanel = () => {
    navigate("/admin");
  };*/}

  // Verificar si el usuario es administrador
  const isAdmin = userData && userData?.role === "ADMIN";
  const isInvitado = userData && userData?.role === "USER";

  const getUserInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
    }
  };

  return (
    <header className="header">
      {/* Logo alineado a la izquierda */}
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />

      {/* Botones de autenticación o perfil de usuario dependiendo del estado */}

      {isAuthenticated ? (
        <div className="user-profile">
          <div className="user-info" onClick={toggleDropdown}>
            <span>{getUserInitials()}</span>
            <div className="user-avatar">
              <img src={user_icon} alt="user-avatar" className="user-icon" />
            </div>
          </div>
          {/* Mostrar botón de Panel Admin si el usuario es administrador */}
          {/*isAdmin && (
            <button className="btn-admin-panel" onClick={goToAdminPanel}>
              Panel Admin
            </button>
          )*/}
          {/* Menú desplegable que aparece al hacer clic en el avatar */}
          {dropdownOpen && (
            <div className="user-dropdown" style={{ display: "block" }}>
              <button className="btn-logout" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <button
            className="btn-create-account"
            onClick={() => navigate("/register")}
          >
            Crear cuenta
          </button>
          <button className="btn-login" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </button>
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
