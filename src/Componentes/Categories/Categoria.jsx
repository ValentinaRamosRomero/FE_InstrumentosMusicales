{/*import React from "react";
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

export default Categoria;*/}


import React from "react";
import "./Categoria.css";
import guitarra from "../../assets/GuitarraDesktop.png";
import bateria from "../../assets/BateriaDesktop.png";
import piano from "../../assets/PianoDesktop.png";
import electrico from "../../assets/ElectronicoDesktop.png";
import accesorio from "../../assets/AccesorioDesktop.png";
import bajos from "../../assets/BajoDesktop.png";

const Categoria = ({ setSearchResults }) => {
  // Lista de categorías disponibles
  const categoriasDesktop = [
    { imgSrc: guitarra, nombre: "Guitarras" },
    { imgSrc: bateria, nombre: "Baterías" },
    { imgSrc: piano, nombre: "Pianos" },
    { imgSrc: bajos, nombre: "Bajos" },
    { imgSrc: electrico, nombre: "Eléctricos" },
    { imgSrc: accesorio, nombre: "Accesorios" },
  ];

  // Función para filtrar productos por categoría
  const handleCategoryClick = async (category) => {
    try {
      // Hacemos una solicitud POST al backend con la categoría seleccionada
      const response = await fetch("http://localhost:8080/products/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: category }), // Enviamos la categoría como parámetro de búsqueda
      });

      if (!response.ok) {
        throw new Error(`Error al filtrar por categoría: ${response.statusText}`);
      }

      const data = await response.json();

      // Actualizamos los resultados en la lista de productos
      setSearchResults(data);
    } catch (error) {
      console.error("Error al filtrar productos:", error);
    }
  };

  return (
    <div className="categorias-types">
      {categoriasDesktop.map((cat, index) => (
        <button key={index} className="categoria" onClick={() => handleCategoryClick(cat.nombre)}>
          <img className="image-desktop" src={cat.imgSrc} alt={cat.nombre} />
          <span>{cat.nombre}</span>
        </button>
      ))}
    </div>
  );
};

export default Categoria;
