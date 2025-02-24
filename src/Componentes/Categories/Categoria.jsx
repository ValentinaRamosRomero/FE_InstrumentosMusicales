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
    { imgSrc: guitarra, imgSrcMobile: guitarra, nombre: "Guitarras" },
    { imgSrc: bateria, imgSrcMobile: bateria, nombre: "Baterías" },
    { imgSrc: piano, imgSrcMobile: piano, nombre: "Pianos" },
    { imgSrc: bajos, imgSrcMobile: bajos, nombre: "Bajos" },
    { imgSrc: electrico, imgSrcMobile: electrico, nombre: "Eléctricos" },
    { imgSrc: accesorio, imgSrcMobile: accesorio, nombre: "Accesorios" },
  ];

  return (
    <div className="categorias-types">
      {categoriasDesktop.map((cat, index) => (
        <button key={index} className="categoria">
          <img className="image-desktop" src={cat.imgSrc} alt={cat.nombre} />
          <img className="image-mobile" src={cat.imgSrcMobile} alt={cat.nombre} />
          <span>{cat.nombre}</span>
        </button>
      ))}
    </div>
  );
};

export default Categoria;
