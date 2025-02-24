import React from "react";
import "./Home.css";

// Componentes
import Header from "../../Componentes/Header/Header";
import Footer from "../../Componentes/Footer/Footer";
import Categoria from "../../Componentes/Categories/Categoria";
import Producto from "../../Componentes/Products/Producto";
import Banner from "../../Componentes/Banner/Banner";
import SearchBar from "../../Componentes/SearchBar/SearchBar"; // Asegúrate de que este componente exista

// Lista de categorías con imágenes (ubicadas en "public/assets/")
const categorias = [
  { imgSrc: "/assets/guitarra1.jpg", nombre: "Guitarras" },
  { imgSrc: "/assets/bateria.jpg", nombre: "Baterías" },
  { imgSrc: "/assets/bajos.jpg", nombre: "Bajos" },
  { imgSrc: "/assets/piano.jpg", nombre: "Teclados" },
  { imgSrc: "/assets/electrico.jpg", nombre: "Eléctricos" },
  { imgSrc: "/assets/accesorio.jpg", nombre: "Accesorios" },
];

const Home = () => {
  return (
    <div className="container">
      {/* Encabezado y banner */}
      <Header />
      <Banner />

      {/* Barra de búsqueda */}
      <div className="search-section">
        <SearchBar />
      </div>

      {/* Sección de categorías */}
      <section className="categories-section">
        <h1 className="section-title">Categorías</h1>
        <div className="categorias-container">
          {categorias.map((categoria, index) => (
            <Categoria key={index} {...categoria} />
          ))}
        </div>
      </section>

      {/* Sección de productos */}
      <section className="products-section">
        <h1 className="section-title">Productos para ti</h1>
        <div className="productos">
          <Producto />
        </div>
      </section>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default Home;
