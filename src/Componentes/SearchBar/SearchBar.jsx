import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import AvailabilityCalendar from "./AvailabilityCalendar";

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dateInit, setDateInit] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/products/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: query }),
        });

        if (!response.ok) throw new Error(`Error obteniendo sugerencias: ${response.statusText}`);

        const data = await response.json();
        setSuggestions(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (error) {
        console.error("Error obteniendo sugerencias de instrumentos:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const filters = {
      text: query.trim(),
      dateInit: dateInit ? formatDate(dateInit) : null,
      dateEnd: dateEnd ? formatDate(dateEnd) : null,
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/products/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      if (!response.ok) throw new Error(`Error en la búsqueda: ${response.statusText}`);

      const data = await response.json();
      setSearchResults(Array.isArray(data) ? data : []);
      setSuggestions([]);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setSearchResults([]);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setQuery(suggestions[selectedIndex].name);
      setSearchResults([suggestions[selectedIndex]]);
      setSuggestions([]);
      e.preventDefault();
    }
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Encuentra tu instrumento favorito</h2>
      <p className="search-text">
        Busca por nombre, categoría o marca y encuentra la mejor opción para ti.
      </p>

      <div className="search-bar-wrapper">
        <form className="search-wrapper" onSubmit={handleSearch}>
          <div className="Calendar_Input">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar instrumentos..."
              value={query}
              onChange={(e) => {
                const value = e.target.value;
                setQuery(value);
                if (value.trim().length < 2) {
                  setSuggestions([]);
                  setSelectedIndex(-1);
                }
              }}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => {
                setSuggestions([]);
                setSelectedIndex(-1);
              }, 100)}
            />
            <AvailabilityCalendar
              dateInit={dateInit}
              dateEnd={dateEnd}
              setDateInit={setDateInit}
              setDateEnd={setDateEnd}
            />
          </div>
          <button className="search-button" type="submit">
            <FaSearch className="search-icon" />
            <span className="search-text-button">Buscar</span>
          </button>
        </form>
      </div>

      {Array.isArray(suggestions) && suggestions.length > 0 && query.length >= 2 && (
        <ul className="suggestions-list">
          {suggestions.map((instrument, index) => (
            <li
              key={instrument.id}
              className={index === selectedIndex ? "suggestion-selected" : ""}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => {
                setQuery(instrument.name);
                setSearchResults([instrument]);
                setSuggestions([]);
              }}
            >
              <img
                src={instrument.images ? instrument.images : "https://via.placeholder.com/92"}
                alt={instrument.name}
              />
              {instrument.name} - {instrument.brand} ({instrument.model})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
