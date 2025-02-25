import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import MenuHamburguesa from "./MenuHamburguesa";

const Header = () => {
  return (
    <header className="header">
      {/* Logo alineado a la izquierda */}
      <img src={logo} alt="Logo" className="logo" />

      {/* Botones de autenticación en tablet y desktop */}
      <div className="auth-buttons">
        <button className="btn-create-account">Crear cuenta</button>
        <button className="btn-login">Iniciar Sesión</button>
      </div>

      {/* Menú hamburguesa en móviles */}
      <MenuHamburguesa />
    </header>
  );
};

export default Header;
