import React from "react";
import "./Landing.css";
import Header from "../../Componentes/Header/Header";
import Producto from "../../Componentes/Products/Producto";
import Footer from "../../Componentes/Footer/Footer";
import landingImage from "../../assets/landing_portada.png";
import { Link, ScrollRestoration } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <Header />
      <div className="landing-container">
        {}
        <div className="landing-image-container">
          <img
            src={landingImage}
            alt="Landing portada"
            className="landing-image"
          />
        </div>

        {}
        <div className="landing-content">
          <h1 className="landing-title">
            Encuentra el Sonido Perfecto para Ti
          </h1>
          <p className="landing-text">
            Explora nuestra colección de instrumentos musicales y lleva tu
            música al siguiente nivel. ¡Calidad, variedad y el mejor sonido te
            esperan!
          </p>
        </div>

        {}
        <div className="button-container">
          <Link to="/productos">
            <button className="landing-button">COMPRA AHORA</button>
          </Link>
          
        </div>

        {}
        <Producto />
      </div>
      <Footer /> {}
    </>
  );
};

export default Landing;
