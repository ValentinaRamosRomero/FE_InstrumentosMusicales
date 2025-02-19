import React from "react";
import "./Categoria.css";

const Categoria = ({ imgSrc, nombre }) => {
  return (
    <button className="categoria">
      <img src={imgSrc} alt={nombre} />
      <span>{nombre}</span>
    </button>
  );
};

export default Categoria;
