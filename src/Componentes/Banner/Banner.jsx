import React from "react";
import { motion } from "framer-motion";
import mobileImage from "../../assets/mobile_home.png";
import brandsImage from "../../assets/Marcas.png";
import GuitarCanvas from "./GuitarCanvas";
import "./Banner.css";
import { GiMusicalScore, GiMusicSpell } from "react-icons/gi";

const Banner = () => {
  return (
    <div className="banner-container">
      {/* Mobile */}
      <img
        src={mobileImage}
        alt="Banner móvil"
        className="banner-image mobile"
      />
      <div className="banner-content mobile">
        <h1 className="banner-title">Encuentra el Sonido Perfecto para Ti</h1>
        <p className="banner-text">
          Explora nuestra colección de instrumentos musicales y lleva tu música
          al siguiente nivel. ¡Calidad, variedad y el mejor sonido te esperan!
        </p>
        <div className="button-container">
          <a href="#productos">
            <button className="banner-button">VER PRODUCTOS</button>
          </a>
        </div>
      </div>

      {/* Desktop */}
      <div className="banner-desktop">
        <div className="animated-bg"></div>

        <div className="banner-desktop-left">
          <motion.div
            className="banner-desktop-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="banner-desktop-title">
              <GiMusicSpell size={50} color="black" /> ¡Encuentra el Sonido
              Perfecto para Tí!
            </h1>
            <p className="banner-desktop-text">
              Explora nuestra colección de instrumentos musicales y lleva tu
              música al siguiente nivel. ¡Calidad, variedad y el mejor sonido te
              esperan!
            </p>
            <a href="#productos" className="banner-desktop-button">
              Explorar Catálogo
            </a>

            <div className="banner-desktop-stats">
              <div>
                <strong>200+</strong>
                <span>Marcas</span>
              </div>
              <div>
                <strong>2,000+</strong>
                <span>Instrumentos</span>
              </div>
              <div>
                <strong>30,000+</strong>
                <span>Clientes Felices</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="banner-desktop-right">
          <GuitarCanvas />
        </div>
      </div>
    </div>
  );
};

export default Banner;
