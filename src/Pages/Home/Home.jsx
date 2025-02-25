import React from "react";
import "./Home.css";
import Footer from "../../Componentes/Footer/Footer";
import Categoria from "../../Componentes/Categories/Categoria";
import Producto from "../../Componentes/products/Producto";
import Header from "../../Componentes/Header/Header";
import Banner from "../../Componentes/Banner/Banner";
import SearchBar from "../../Componentes/SearchBar/SearchBar";

const Home = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Banner />
        <SearchBar/>
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
  )
}

export default Home;
