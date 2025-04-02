import React from "react";
import "./Banner.css";
import mobileImage from "../../assets/mobile_home.png";
import desktopImage from "../../assets/Musico.png";
import brandsImage from "../../assets/Marcas.png";

const Banner = () => {
  return (
    <div className="banner-container">
      {/* Imagen para dispositivos móviles */}
      <img src={mobileImage} alt="Banner móvil" className="banner-image mobile" />

      {/* Contenido del banner */}
      <div className="banner-content">
        <h1 className="banner-title">Encuentra el Sonido Perfecto para Ti</h1>
        <p className="banner-text">
          Explora nuestra colección de instrumentos musicales y lleva tu música al siguiente nivel.
          ¡Calidad, variedad y el mejor sonido te esperan!
        </p>
        <div className="button-container">
          <a href="#productos">
            <button className="banner-button">VER PRODUCTOS</button>
          </a>
        </div>
      </div>

      {/* Sección exclusiva para escritorio y tablet */}
      <div className="Banner_Desktop">
        <div className="General_Info">
          <div className="banner-stats">
            <p><strong>200+</strong> Marcas Internacionales</p>
            <p><strong>2,000+</strong> Productos de calidad</p>
            <p><strong>30,000+</strong> Clientes Satisfechos</p>
          </div>
          <img src={desktopImage} alt="Músico" className="banner-image desktop" />
        </div>
        <img src={brandsImage} alt="Marcas" className="banner-image brands" />
      </div>
    </div>
  );
};

export default Banner;
