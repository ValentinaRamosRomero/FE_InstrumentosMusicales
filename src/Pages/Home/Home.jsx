import React from "react";
import "./Home.css";
import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";
import Categoria from "../../Componentes/Categories/Categoria";
import Producto from "../../Componentes/Products/Producto";
import banner from "../../assets/guitarras.jpg";
import guitarra from "../../assets/guitarra1.jpg";
import bateria from "../../assets/bateria.jpg";
import piano from "../../assets/piano.jpg";
import electrico from "../../assets/electrico.jpg";
import accesorio from "../../assets/accesorio.jpg";
import bajos from "../../assets/bajos.jpg";
import ejemplo from "../../assets/ejemplo.jpg";

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
    <>
      <div className="container">
        <Header />
        <div className="buscador">
          <h1>Busca tus instrumentos o accesorios favoritos</h1>
          <div className="input-group">
            <input type="text" placeholder="" className="input-container" />
            <button className="buscar-boton">Buscar</button>
          </div>
        </div>
        <div className="banner">
          <img src={banner} alt="Banner" className="item" />
        </div>
        <h1>Categorías</h1>
        <div className="categorias-container">
          {categorias.map((cat, index) => (
            <Categoria key={index} {...cat} />
          ))}
        </div>
        <h1>Productos para ti</h1>
        <div className="productos">
          <Producto />
        </div>
        <Footer /> {}
      </div>
    </>
  );
};

export default Home;
