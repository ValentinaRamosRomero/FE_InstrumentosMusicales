import React from "react";
import "./Banner.css";
import SearchBar from "../SearchBar/SearchBar";
import mobileImage from "../../assets/mobile_home.png"; // Verifica que la imagen esté en assets

const Banner = () => {
  return (
    <div className="banner-container">
      {/* Imagen que cubre todo el ancho */}
      <img src={mobileImage} alt="Banner principal" className="banner-image" />

      {/* Contenido del banner */}
      <div className="banner-content">
        <h1 className="banner-title">Encuentra el Sonido Perfecto para Ti</h1>
        <p className="banner-text">
          Explora nuestra colección de instrumentos musicales y lleva tu música al siguiente nivel. 
          ¡Calidad, variedad y el mejor sonido te esperan!
        </p>
        <div className="button-container">
          <button className="banner-button">RENTAR AHORA</button>
        </div>
      </div>


    </div>
  );
};

export default Banner;
