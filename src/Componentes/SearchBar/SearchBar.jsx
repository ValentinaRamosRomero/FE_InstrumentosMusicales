import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./SearchBar.css";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

const API_KEY = "774b1b5877fc0a512419b8e0c10d36c2";

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [yearRange, setYearRange] = useState({ start: 2000, end: new Date().getFullYear() });

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&primary_release_date.gte=${yearRange.start}-01-01&primary_release_date.lte=${yearRange.end}-12-31&page=1`
        );

        if (response.data.results) {
          setSuggestions(response.data.results.slice(0, 5));
        }
      } catch (error) {
        console.error("Error obteniendo sugerencias:", error);
      }
    };

    fetchSuggestions();
  }, [query, yearRange]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setQuery(suggestions[selectedIndex].title);
      setSearchResults(suggestions[selectedIndex].title, 1, yearRange);
      setSuggestions([]);
      e.preventDefault();
    }
  };

  return (
    <div className="search-container">
      {/* 📌 Título del bloque de búsqueda */}
      <h2 className="search-title">Encuentra tu instrumento favorito</h2>

      {/* 📌 Párrafo informativo debajo de la barra de búsqueda */}
      <p className="search-text">
        Busca por nombre, categoria o año de lanzamiento y encuentra la mejor opción para ti.
      </p>

      <div className="search-bar-wrapper">
        <form className="search-wrapper" onSubmit={(e) => {
          e.preventDefault();
          if (query.length > 1) {
            setSearchResults(query, 1, yearRange);
            setSuggestions([]);
          }
        }}>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar películas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" type="submit">
            <FaSearch className="search-icon" />
            <span className="search-text-button">Buscar</span>
          </button>
        </form>
        {/*<DateRangePicker setYearRange={setYearRange} />*/}
      </div>

      {/* Mostrar sugerencias */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((movie, index) => (
            <li 
              key={movie.id} 
              className={index === selectedIndex ? "suggestion-selected" : ""}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => {
                setQuery(movie.title);
                setSearchResults(movie.title, 1, yearRange);
                setSuggestions([]);
              }}
            >
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : "https://via.placeholder.com/92"}
                alt={movie.title}
              />
              {movie.title} ({movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
