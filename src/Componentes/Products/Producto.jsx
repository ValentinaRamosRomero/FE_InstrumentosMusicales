// Importamos React para poder utilizar JSX y definir componentes funcionales
import React from "react";

// Importamos useNavigate de react-router-dom para manejar la navegación programática
import { useNavigate } from "react-router-dom"; 

// Importamos la hoja de estilos CSS para darle diseño al componente
import "./Producto.css";


// Definimos el componente funcional Producto que recibe las siguientes props:
// - data: Un array con la información de los instrumentos musicales
// - pagina: Número de la página actual en la paginación
// - setPagina: Función para actualizar el número de página
// - totalPaginas: Número total de páginas disponibles
const Producto = ({ data, pagina, setPagina, totalPaginas }) => {
  const navigate = useNavigate();

  // ✅ Verificamos que data es un array, si no, inicializamos como un array vacío
  if (!Array.isArray(data)) {
    console.error("Error: data no es un array", data);
    data = [];
  }

  return (
    <div className="productos-container" id="productos">
      {data.length === 0 ? (
        <p>No hay instrumentos disponibles.</p>
      ) : (
        data.map((instrument) => (
          <div key={instrument.id} className="producto-card">
            <img 
              src={instrument.images ? instrument.images : "https://via.placeholder.com/300x450"}
              alt={instrument.name}
              className="producto-img"
              onClick={() => navigate(`/product-details/${instrument.id}`)}
              style={{ cursor: "pointer" }} 
            />
            <h3 className="producto-nombre">{instrument.name}</h3>
            <h4 className="producto-precio">${instrument.pricePerHour} / día</h4>
  
            <button
              className="agregar-producto-btn"
              onClick={() => navigate(`/product-details/${instrument.id}`)}
            >
              Ver producto
            </button>
          </div>
        ))
      )}

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



// Exportamos el componente Producto para que pueda ser utilizado en otros archivos
export default Producto;