import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Footer from "../../Componentes/Footer/Footer";
import Categoria from "../../Componentes/Categories/Categoria";
import Header from "../../Componentes/Header/Header";
import Banner from "../../Componentes/Banner/Banner";
import SearchBar from "../../Componentes/SearchBar/SearchBar";
import Producto from "../../Componentes/Products/Producto";

const API_KEY = "774b1b5877fc0a512419b8e0c10d36c2";

const Home = ({ isAuthenticated, userData, onLogout }) => {
  const [movies, setMovies] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [currentQuery, setCurrentQuery] = useState(null);

  // Obtener películas recomendadas al inicio
  useEffect(() => {
    if (!currentQuery) {
      fetchRecommendedMovies(pagina);
    }
  }, [pagina]);

  const fetchRecommendedMovies = async (page) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      setMovies(response.data.results.slice(0, 6)); // Limitar a solo 6 películas
      setTotalPaginas(response.data.total_pages);
    } catch (error) {
      console.error("Error al obtener películas recomendadas:", error);
    }
  };

  // Obtener películas por búsqueda
  const fetchMovies = async (query, page = 1) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
      );
      setMovies(response.data.results.slice(0, 6)); // Limitar a solo 6 películas
      setTotalPaginas(response.data.total_pages);
      setCurrentQuery(query);
      setPagina(page);
    } catch (error) {
      console.error("Error al buscar películas:", error);
    }
  };

  // Cambiar de página en resultados
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPaginas) {
      setPagina(newPage);
      if (currentQuery) {
        fetchMovies(currentQuery, newPage);
      } else {
        fetchRecommendedMovies(newPage);
      }
    }
  };

  return (
    <div className="container">
      <Header isAuthenticated={isAuthenticated} userData={userData} onLogout={onLogout} />
      <Banner />
      <SearchBar setSearchResults={fetchMovies} />

      <div className="categorias-container">
        <h1>Categorías</h1>
        <Categoria />
      </div>

      <div className="productos">
        <h1>{currentQuery ? "Resultados de búsqueda" : "Películas Recomendadas"}</h1>
        <Producto data={movies} pagina={pagina} setPagina={handlePageChange} totalPaginas={totalPaginas} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
