// Importamos React y los hooks useState y useEffect
import React, { useState, useEffect } from "react";

// Importamos la hoja de estilos CSS para este componente
import "./Home.css";

// Importamos los componentes que se usarán en esta página
import Footer from "../../Componentes/Footer/Footer";
import Categoria from "../../Componentes/Categories/Categoria";
import Header from "../../Componentes/Header/Header";
import Banner from "../../Componentes/Banner/Banner";
import SearchBar from "../../Componentes/SearchBar/SearchBar";
import Producto from "../../Componentes/Products/Producto";

const Home = ({ isAuthenticated, userData, onLogout }) => {
  // Estado para almacenar todos los instrumentos obtenidos del backend
  const [instruments, setInstruments] = useState([]);

  // Estado para manejar los productos filtrados (desde la barra de búsqueda o categorías)
  const [filteredResults, setFilteredResults] = useState([]);

  // Estado para manejar la paginación
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // useEffect para obtener los productos recomendados al cargar la página o cambiar de página
  useEffect(() => {
    if (!filteredResults.length) {
      fetchRecommendedInstruments();
    }
  }, [pagina]); // Se ejecuta cada vez que cambia la página

  // Función para obtener todos los instrumentos recomendados desde el backend
  const fetchRecommendedInstruments = async () => {
    try {
      const response = await fetch("http://localhost:8080/products/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: "" }), // Enviamos un texto vacío para obtener todos los productos
      });

      if (!response.ok) {
        throw new Error(`Error al obtener instrumentos: ${response.statusText}`);
      }

      const data = await response.json();

      // Guardamos los primeros 6 productos
      setInstruments(data.slice((pagina - 1) * 6, pagina * 6));
      setTotalPaginas(Math.ceil(data.length / 6));
    } catch (error) {
      console.error("Error al obtener instrumentos musicales:", error);
    }
  };

  // Función para buscar productos por un término (desde la barra de búsqueda o categorías)
  const fetchInstruments = async (query) => {
    try {
      const response = await fetch("http://localhost:8080/products/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: query }), // Enviamos el texto de búsqueda
      });

      if (!response.ok) {
        throw new Error(`Error al buscar instrumentos: ${response.statusText}`);
      }

      const data = await response.json();

      // Guardamos los resultados filtrados
      setFilteredResults(data);
    } catch (error) {
      console.error("Error al buscar instrumentos musicales:", error);
    }
  };

  // Función para manejar la paginación
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPaginas) {
      setPagina(newPage);
    }
  };

  return (
    <div className="container">
      {/* Header con sesión de usuario */}
      <Header isAuthenticated={isAuthenticated} userData={userData} onLogout={onLogout} />

      {/* Banner principal */}
      <Banner />

      {/* Barra de búsqueda, conectada con fetchInstruments */}
      <SearchBar setSearchResults={setFilteredResults} />

      {/* Categorías, conectadas con fetchInstruments para filtrar */}
      <div className="categorias-container">
        <h1>Categorías</h1>
        <Categoria setSearchResults={setFilteredResults} />
      </div>

      {/* Lista de productos (filtrados o recomendados) */}
      <div className="productos">
        <h1>{filteredResults.length > 0 ? "Resultados de búsqueda" : "Instrumentos Recomendados"}</h1>

        <Producto 
          data={filteredResults.length > 0 ? filteredResults : instruments} 
          pagina={pagina} 
          setPagina={handlePageChange} 
          totalPaginas={totalPaginas} 
        />
      </div>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default Home;