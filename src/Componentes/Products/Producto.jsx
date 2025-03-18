import React from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Importamos useNavigate para la navegación
import "./Producto.css";

const Producto = ({ data, pagina, setPagina, totalPaginas }) => {
  const navigate = useNavigate(); // ✅ Ahora tenemos el hook de navegación

  return (
    <div className="productos-container">
      {data.length === 0 ? (
        <p>No hay películas para mostrar.</p>
      ) : (
        data.map((movie) => (
          <div key={movie.id} className="producto-card">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "https://via.placeholder.com/300x450"}
              alt={movie.title}
              className="producto-img"
              onClick={() => navigate(`/producto/${movie.id}`)} // ✅ Redirigir al detalle de la película
              style={{ cursor: "pointer" }} // ✅ Cambia el cursor para indicar que es clickeable
            />
            <h3 className="producto-nombre">{movie.title}</h3>
            <h4 className="producto-precio">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
            </h4>
          </div>
        ))
      )}

      {/* Controles de paginación */}
      <div className="pagination">
        <button 
          disabled={pagina === 1} 
          onClick={() => setPagina(pagina - 1)}
        >
          Anterior
        </button>
        <span>Página {pagina} de {totalPaginas}</span>
        <button 
          disabled={pagina >= totalPaginas} 
          onClick={() => setPagina(pagina + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Producto;
