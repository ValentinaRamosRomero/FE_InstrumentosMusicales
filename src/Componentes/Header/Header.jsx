import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importamos useNavigate
import "./Header.css";
import logo from "../../assets/Logo.svg";
import MenuHamburguesa from "./MenuHamburguesa";

const Header = () => {
  const navigate = useNavigate(); // ✅ Definir navigate para la navegación

  return (
    <header className="header">
      {/* Logo alineado a la izquierda */}
      <img 
        src={logo} 
        alt="Logo" 
        className="logo" 
        onClick={() => navigate("/")} // ✅ Redirige a Home al hacer clic en el logo
        style={{ cursor: "pointer" }} // ✅ Cambia el cursor para indicar que es clickeable
      />

      {/* Botones de autenticación en tablet y desktop */}
      <div className="auth-buttons">
        <button className="btn-create-account" onClick={() => navigate("/register")}>
          Crear cuenta
        </button>
        <button className="btn-login" onClick={() => navigate("/login")}>
          Iniciar Sesión
        </button>
      </div>

      {/* Menú hamburguesa en móviles */}
      <MenuHamburguesa />
    </header>
  );
};

export default Header;
