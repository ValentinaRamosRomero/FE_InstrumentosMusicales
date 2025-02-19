import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import MenuHamburguesa from "./MenuHamburguesa";

const Header = () => {
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />

      {/*<div className={`input-container ${buscadorAbierto ? "activo" : ""}`}>
        {!buscadorAbierto ? (
          <FaMagnifyingGlass className="icon" onClick={() => setBuscadorAbierto(true)} />
        ) : (
          <>
            <input type="text" placeholder="" />
            <FaMagnifyingGlass className="icon" />
          </>
        )}
      </div>*/}

      <div className="auth-container">
        <div className="auth-buttons">
          <button className="btn-login">Crear cuenta</button>
          <button className="btn-register">Iniciar Sesion</button>
        </div>

        <div className="mobile-auth">
          <FaRegUserCircle className="icon" onClick={() => setMenuAbierto(!menuAbierto)} />
          {menuAbierto && (
            <div className="auth-dropdown">
              <button className="dropdown-btn">Iniciar Sesión</button>
              <button className="dropdown-btn">Registrarse</button>
            </div>
          )}
        </div>
      </div>

      <MenuHamburguesa />
    </header>
  );
};

export default Header;
