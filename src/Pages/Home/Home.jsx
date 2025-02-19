import React from "react";
import "./Home.css";
import Header from "../../componentes/header/Header";
import Footer from "../../componentes/footer/Footer";
import Categoria from "../../componentes/categories/Categoria";
import Producto from "../../componentes/products/Producto";
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

  const productos = [
    { imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
    { imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
    { imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
    { imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
    { imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
    { imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
    { imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
    { imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
    { imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
  ];

  return (
    <div className="container">
      <Header />
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
        {productos.map((prod, index) => (
          <Producto key={index} {...prod} />
        ))}
      </div>
      <Footer /> {}
    </div>
  );
};

export default Home;
