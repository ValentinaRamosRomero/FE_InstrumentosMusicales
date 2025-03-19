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

  // Creamos una constante navigate usando el hook useNavigate
  // Esto nos permitirá redirigir a otras páginas dentro de la aplicación
  const navigate = useNavigate(); 

  // Función para manejar la acción de agregar un producto
  const handleAddProduct = (instrument) => {
    console.log(`Producto agregado: ${instrument.name}`);
    // Aquí puedes agregar lógica para almacenar en un carrito, enviar a una API, etc.
  };

  // Retornamos el JSX del componente
  return (
    // Contenedor principal del componente con la clase "productos-container"
    <div className="productos-container"> 

      {/* Si no hay datos en el array "data", mostramos un mensaje */}
      {data.length === 0 ? (
        <p>No hay instrumentos disponibles.</p> // Mensaje cuando no hay instrumentos
      ) : 
      data.map((instrument) => (
        // Cada instrumento se renderiza dentro de un div con una clave única (key)
        <div key={instrument.id} className="producto-card"> 
          
          {/* Imagen del instrumento */}
          <img 
            // Si el instrumento tiene una imagen, se usa la URL de la API, de lo contrario, se muestra una imagen de reemplazo
            src={instrument.images ? instrument.images : "https://via.placeholder.com/300x450"} 
            alt={instrument.name} // Texto alternativo con el nombre del instrumento
            className="producto-img" // Clase para aplicar estilos a la imagen
      
            // Evento onClick: cuando se haga clic en la imagen, navegamos a la ruta "/producto/{id}"
            onClick={() => navigate(`/producto/${instrument.id}`)} 
      
            // Estilo en línea para cambiar el cursor al pasar sobre la imagen
            style={{ cursor: "pointer" }} 
          />
      
          {/* Nombre del instrumento */}
          <h3 className="producto-nombre">{instrument.name}</h3>
      
      
          {/* Precio por hora de alquiler */}
          <h4 className="producto-precio">
            ${instrument.pricePerHour} / hora
          </h4>

          {/* Botón para agregar el producto */}
          <button 
            className="agregar-producto-btn" 
            onClick={() => handleAddProduct(instrument)}
          >
            Agregar Producto
          </button>
        </div>
      ))}

      {/* Controles de paginación */}
      <div className="pagination">
        {/* Botón "Anterior" que solo estará habilitado si la página actual es mayor a 1 */}
        <button 
          disabled={pagina === 1} // Si estamos en la primera página, el botón se deshabilita
          onClick={() => setPagina(pagina - 1)} // Al hacer clic, disminuye el número de página
        >
          Anterior
        </button>

        {/* Muestra la página actual y el total de páginas */}
        <span>Página {pagina} de {totalPaginas}</span>

        {/* Botón "Siguiente" que solo estará habilitado si la página actual es menor al total de páginas */}
        <button 
          disabled={pagina >= totalPaginas} // Si estamos en la última página, el botón se deshabilita
          onClick={() => setPagina(pagina + 1)} // Al hacer clic, aumenta el número de página
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

// Exportamos el componente Producto para que pueda ser utilizado en otros archivos
export default Producto;
