import React from "react";
import "./Home.css";
import Footer from "../../Componentes/Footer/Footer";
import Categoria from "../../Componentes/Categories/Categoria";
import Producto from "../../Componentes/Products/Producto";
import Header from "../../Componentes/Header/Header";
import Banner from "../../Componentes/Banner/Banner";
import SearchBar from "../../Componentes/SearchBar/SearchBar";

// Recibimos las props de autenticación
const Home = ({ isAuthenticated, userData, onLogout }) => {
  return (
    <>
      <div className="container">
        {/* Pasamos las props al Header */}
        <Header 
          isAuthenticated={isAuthenticated} 
          userData={userData} 
          onLogout={onLogout} 
        />
        <Banner />
        <SearchBar/>
        
        {/* Opcional: Mensaje de bienvenida personalizado */}
        {isAuthenticated && userData && (
          <div className="welcome-message">
            <h2>Bienvenido, {userData.nombre} {userData.apellido}</h2>
          </div>
        )}
        
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
