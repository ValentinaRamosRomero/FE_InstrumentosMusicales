// Importamos React y los hooks useState y useEffect para manejar estados y efectos secundarios
import React, { useState, useEffect } from "react";

// Importamos el ícono de búsqueda de react-icons
import { FaSearch } from "react-icons/fa";

// Importamos los estilos CSS específicos para el componente de la barra de búsqueda
import "./SearchBar.css";

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
        // Hacemos una solicitud POST a la API local para obtener sugerencias de instrumentos
        const response = await fetch("http://localhost:8080/products/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: query }),
        });

        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
          throw new Error(`Error obteniendo sugerencias: ${response.statusText}`);
        }

        // Convertimos la respuesta a JSON
        const data = await response.json();

        // Guardamos las primeras 5 sugerencias en el estado
        if (data) {
          setSuggestions(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error obteniendo sugerencias de instrumentos:", error);
      }
    };

    // Llamamos a la función para obtener sugerencias
    fetchSuggestions();
  }, [query]); // Se ejecuta cuando cambia la consulta

  // Manejo de eventos de teclado para la navegación en la lista de sugerencias
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setQuery(suggestions[selectedIndex].name);
      setSearchResults(suggestions[selectedIndex].name);
      setSuggestions([]);
      e.preventDefault();
    }
  };

  // Retorno del JSX del componente
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
        <form className="search-wrapper" onSubmit={(e) => {
          e.preventDefault();
          if (query.length > 1) {
            setSearchResults(query);
            setSuggestions([]);
          }
        }}>
          {/* Input donde el usuario ingresa la consulta de búsqueda */}
          <input
            type="text"
            className="search-input"
            placeholder="Buscar instrumentos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

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
                setSearchResults(instrument.name);
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
