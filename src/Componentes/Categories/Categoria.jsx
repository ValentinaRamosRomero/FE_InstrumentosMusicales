import React from "react";
import "./Categoria.css";
import guitarra from "../../assets/GuitarraDesktop.png";
import bateria from "../../assets/BateriaDesktop.png";
import piano from "../../assets/PianoDesktop.png";
import electrico from "../../assets/ElectronicoDesktop.png";
import accesorio from "../../assets/AccesorioDesktop.png";
import bajos from "../../assets/BajoDesktop.png";

const Categoria = () => {
  const categoriasDesktop = [
    { imgSrc: guitarra, nombre: "Guitarras" },
    { imgSrc: bateria, nombre: "Baterías" },
    { imgSrc: piano, nombre: "Pianos" },
    { imgSrc: bajos, nombre: "Bajos" },
    { imgSrc: electrico, nombre: "Eléctricos" },
    { imgSrc: accesorio, nombre: "Accesorios" },
  ];

  return (
    <div className="categorias-types">
      {categoriasDesktop.map((cat, index) => (
        <button key={index} className="categoria">
          <img src={cat.imgSrc} alt={cat.nombre} />
          <span>{cat.nombre}</span>
        </button>
      ))}
    </div>
  );
};

export default Categoria;
