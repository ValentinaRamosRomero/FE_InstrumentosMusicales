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
      {}
      {!menuAbierto && (
        <button className="menu-icono" onClick={toggleMenu}>
          <FaBars />
        </button>
      )}

      {}
      <nav className={`menu-links ${menuAbierto ? "abierto" : ""}`}>
        {}
        <button className="menu-icono cerrar" onClick={toggleMenu}>
          <FaTimes />
        </button>

        {}
        <a href="/categorias/guitarras">Guitarras</a>
        <a href="/categorias/baterias">Baterías</a>
        <a href="/categorias/bajos">Bajos</a>
        <a href="/categorias/pianos">Pianos</a>
        <a href="/categorias/electricos">Eléctricos</a>
        <a href="/categorias/accesorios">Accesorios</a>
      </nav>
    </div>
  );
};

export default MenuHamburguesa;
