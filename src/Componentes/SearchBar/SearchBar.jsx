// Importamos React y los hooks useState y useEffect para manejar estados y efectos secundarios
import React, { useState, useEffect } from "react";

// Importamos el ícono de búsqueda de react-icons
import { FaSearch } from "react-icons/fa";

// Importamos los estilos CSS específicos para el componente de la barra de búsqueda
import "./SearchBar.css";
import AvailabilityCalendar from "./AvailabilityCalendar";


// Definimos el componente funcional SearchBar, que recibe una prop:
// - setSearchResults: función que actualiza los resultados de búsqueda en el estado del componente padre
const SearchBar = ({ setSearchResults }) => {
  
  // Estado para almacenar la consulta ingresada en la barra de búsqueda
  const [query, setQuery] = useState("");

  // Estado para almacenar las sugerencias de instrumentos musicales basadas en la consulta
  const [suggestions, setSuggestions] = useState([]);

  // Estado para manejar la selección de sugerencias con las flechas del teclado
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // useEffect para obtener sugerencias cuando el usuario escribe en la barra de búsqueda
  useEffect(() => {
    // Si la consulta tiene menos de 2 caracteres, vaciamos las sugerencias y salimos
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    // Función asíncrona para obtener sugerencias de instrumentos desde la API local
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL+"/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: query }),
        });

        if (!response.ok) {
          throw new Error(`Error obteniendo sugerencias: ${response.statusText}`);
        }

        const data = await response.json();

        // ✅ Asegurar que siempre sea un array antes de actualizar el estado
        setSuggestions(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (error) {
        console.error("Error obteniendo sugerencias de instrumentos:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  // Función para manejar la búsqueda al presionar Enter o hacer clic en el botón de búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.length > 1) {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL+"/products/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: query }),
        });

        if (!response.ok) {
          throw new Error(`Error en la búsqueda: ${response.statusText}`);
        }

        const data = await response.json();

        // ✅ Enviar un array a setSearchResults para evitar errores en Producto.jsx
        setSearchResults(Array.isArray(data) ? data : []);

        // Limpiar sugerencias después de buscar
        setSuggestions([]);

      } catch (error) {
        console.error("Error en la búsqueda:", error);
        setSearchResults([]);
      }
    }
  };

  // Manejo de eventos de teclado para la navegación en la lista de sugerencias
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
      {/* 📌 Título del bloque de búsqueda */}
      <h2 className="search-title">Encuentra tu instrumento favorito</h2>

      {/* 📌 Párrafo informativo debajo de la barra de búsqueda */}
      <p className="search-text">
        Busca por nombre, categoría o marca y encuentra la mejor opción para ti.
      </p>

      <div className="search-bar-wrapper">
        {/* Formulario de búsqueda */}
        <form className="search-wrapper" onSubmit={handleSearch}>
          {/* Input donde el usuario ingresa la consulta de búsqueda */}
          <input
            type="text"
            className="search-input"
            placeholder="Buscar instrumentos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* 📌 Calendario de disponibilidad */}
          <AvailabilityCalendar />
          
          {/* Botón de búsqueda */}
          <button className="search-button" type="submit">
            <FaSearch className="search-icon" />
            <span className="search-text-button">Buscar</span>
          </button>
        </form>

      </div>

      {/* Mostrar sugerencias de instrumentos si hay resultados */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((instrument, index) => (
            <li 
              key={instrument.id}
              className={index === selectedIndex ? "suggestion-selected" : ""}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => {
                setQuery(instrument.name);
                setSearchResults([instrument]); // ✅ Enviar array con un solo resultado
                setSuggestions([]);
              }}
            >
              {/* Imagen del instrumento */}
              <img
                src={instrument.images ? instrument.images : "https://via.placeholder.com/92"}
                alt={instrument.name}
              />
              {/* Nombre del instrumento y su marca */}
              {instrument.name} - {instrument.brand} ({instrument.model})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Exportamos el componente para su uso en otros archivos
export default SearchBar;