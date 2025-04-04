import React from "react";
import "./Categoria.css";
import guitarra from "../../assets/GuitarraDesktop.png";
import bateria from "../../assets/BateriaDesktop.png";
import piano from "../../assets/PianoDesktop.png";
import electrico from "../../assets/ElectronicoDesktop.png";
import accesorio from "../../assets/AccesorioDesktop.png";
import bajos from "../../assets/BajoDesktop.png";

const Categoria = ({ setSearchResults }) => {
  const categoriasDesktop = [
    { imgSrc: guitarra, nombre: "Guitarras" },
    { imgSrc: bateria, nombre: "Baterías" },
    { imgSrc: piano, nombre: "Pianos" },
    { imgSrc: bajos, nombre: "Bajos" },
    { imgSrc: electrico, nombre: "Eléctricos" },
    { imgSrc: accesorio, nombre: "Accesorios" },
  ];

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/products/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: category }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error al filtrar por categoría: ${response.statusText}`
        );
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error al filtrar productos:", error);
    }
  };

  return (
    <div className="categorias-types">
      {categoriasDesktop.map((cat, index) => (
        <div
          key={index}
          className="categoria"
          role="button"
          tabIndex="0"
          onClick={() => handleCategoryClick(cat.nombre)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCategoryClick(cat.nombre);
            }
          }}
        >
          <img className="image-desktop" src={cat.imgSrc} alt={cat.nombre} />
          <span className="d-none d-md-block">{cat.nombre}</span>
        </div>
      ))}
    </div>
  );
};

export default Categoria;
