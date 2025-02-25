import React from "react";
import { FaSearch } from "react-icons/fa"; // Importamos el icono de búsqueda
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-container">
      <p className="search-text">
        Busca tus instrumentos o accesorios favoritos, debajo la barra de búsqueda
      </p>
      <div className="search-wrapper">
        <input type="text" className="search-input" placeholder="Buscar..." />
        <button className="search-button">
          <FaSearch className="search-icon" />
          <span className="search-text-button">Buscar</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
