// Home.jsx
import React, { useState, useEffect } from "react";
import "./Home.css";
import Footer from "../../Componentes/Footer/Footer";
import Categoria from "../../Componentes/Categories/Categoria";
import Header from "../../Componentes/Header/Header";
import Banner from "../../Componentes/Banner/Banner";
import SearchBar from "../../Componentes/SearchBar/SearchBar";
import Producto from "../../Componentes/Products/Producto";

const Home = ({ isAuthenticated, userData, onLogout }) => {
  const [instruments, setInstruments] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    if (!filteredResults.length) {
      fetchRecommendedInstruments();
    }
  }, [pagina]);

  const fetchRecommendedInstruments = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/products/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: "" }),
        }
      );

      if (!response.ok)
        throw new Error(
          `Error al obtener instrumentos: ${response.statusText}`
        );

      const data = await response.json();
      //setInstruments(Array.isArray(data.data) ? data.data : []);
      //setTotalPaginas(Math.ceil((data.data?.length || 0) / 6));
      setInstruments(data);
      setTotalPaginas(Math.ceil(data.length / 6));
    } catch (error) {
      console.error("Error al obtener instrumentos musicales:", error);
    }
  };

  const fetchInstrumentsByDate = async (dateInit, dateEnd) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/products/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dateInit, dateEnd }),
        }
      );

      if (!response.ok) throw new Error("Error al filtrar por fecha");

      const data = await response.json();
      setFilteredResults(data);
      setPagina(1);
      setTotalPaginas(Math.ceil(data.length / 6));
    } catch (error) {
      console.error("Error al filtrar por fecha:", error);
      setFilteredResults([]);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPaginas) {
      setPagina(newPage);
    }
  };

  const productosParaMostrar =
    filteredResults.length > 0
      ? filteredResults.slice((pagina - 1) * 6, pagina * 6)
      : instruments.slice((pagina - 1) * 6, pagina * 6);

  return (
    <div className="container">
      <Header
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={onLogout}
      />
      <Banner />
      <SearchBar
        setSearchResults={setFilteredResults}
        onSearchByDate={fetchInstrumentsByDate}
      />

      <div className="categorias-container">
        <h1>Categorías</h1>
        <Categoria setSearchResults={setFilteredResults} />
      </div>

      <div className="productos">
        <h1>
          {filteredResults.length > 0
            ? "Resultados de búsqueda"
            : "Instrumentos Recomendados"}
        </h1>
        <Producto
          data={productosParaMostrar}
          pagina={pagina}
          setPagina={handlePageChange}
          totalPaginas={totalPaginas}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;