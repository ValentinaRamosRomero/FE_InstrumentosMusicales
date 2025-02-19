import React from "react";
import "./Categoria.css";

const Categoria = ({ imgSrc, nombre }) => {
  return (
    <div className="categoria">
      <img src={imgSrc} alt={nombre} />
      <span>{nombre}</span>
    </div>
  );
};

export default Categoria;
