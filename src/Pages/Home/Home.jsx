import React from "react";
import "./Home.css";
import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";
import Categoria from "../../Componentes/Categories/Categoria";
import Producto from "../../Componentes/Products/Producto";
import Banner from "../../Componentes/Banner/Banner";

import guitarra from "../../assets/guitarra1.jpg";
import bateria from "../../assets/bateria.jpg";
import piano from "../../assets/piano.jpg";
import electrico from "../../assets/electrico.jpg";
import accesorio from "../../assets/accesorio.jpg";
import bajos from "../../assets/bajos.jpg";

const Home = () => {
  const categorias = [
    { imgSrc: guitarra, nombre: "Guitarras" },
    { imgSrc: bateria, nombre: "Baterías" },
    { imgSrc: bajos, nombre: "Bajos" },
    { imgSrc: piano, nombre: "Teclados" },
    { imgSrc: electrico, nombre: "Eléctricos" },
    { imgSrc: accesorio, nombre: "Accesorios" },
  ];

  return (
    <div className="container">
      <Header />
      <Banner />

      <h1 className="section-title">Categorías</h1>
      <div className="categorias-container">
        {categorias.map((cat, index) => (
          <Categoria key={index} {...cat} />
        ))}
      </div>

      <h1 className="section-title">Productos para ti</h1>
      <div className="productos">
        <Producto />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
