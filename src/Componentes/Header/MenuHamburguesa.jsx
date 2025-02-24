import React, { useState } from "react";
import "./MenuHamburguesa.css";
import { FaBars, FaTimes } from "react-icons/fa";

const MenuHamburguesa = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className="menu-hamburguesa">
      {/* Icono de menú hamburguesa */}
      <button className="menu-icono" onClick={toggleMenu}>
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menú lateral cuando está abierto */}
      <nav className={`menu-links ${menuAbierto ? "abierto" : ""}`}>
        {/* Opciones de autenticación en el menú para móviles como texto */}
        <p className="auth-text">Crear cuenta</p>
        <p className="auth-text">Iniciar sesión</p>
      </nav>
    </div>
  );
};

export default MenuHamburguesa;
