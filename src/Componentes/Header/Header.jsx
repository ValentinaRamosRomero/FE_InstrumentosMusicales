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

  // Función para navegar al panel de administrador
  const goToAdminPanel = () => {
    navigate("/admin");
  };

  // Verificar si el usuario es administrador
  const isAdmin = userData && userData.role === "ADMIN";

  return (
    <header className="header">
      {/* Logo alineado a la izquierda */}
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/")} // Redirige a Home al hacer clic en el logo
        style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es clickeable
      />

      {/* Botones de autenticación o perfil de usuario dependiendo del estado */}
      {isAuthenticated /*&& userData*/ ? (
        <div className="user-profile">
          <div className="user-info" onClick={toggleDropdown}>
            {/*} <div className="user-initials">
              {userData.nombre?.charAt(0)}
              {userData.apellido?.charAt(0)}
            </div>*/}
            <div className="user-avatar">
              <img src={user_icon} alt="user-avatar" className="user-icon" />
            </div>
          </div>

          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
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
