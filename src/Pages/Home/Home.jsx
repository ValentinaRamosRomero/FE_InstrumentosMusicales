import React from "react";
import "./Home.css";
import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";
import Categoria from "../../Componentes/Categories/Categoria";
import Producto from "../../Componentes/products/Producto";

const Home = () => {
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

        <div className="categorias-container">
          <h1>Categorías</h1>
          <Categoria />
        </div>

        <div className="productos">
          <h1>Productos</h1>
          <Producto />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
