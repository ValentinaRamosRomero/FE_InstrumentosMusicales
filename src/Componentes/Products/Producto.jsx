import React from "react";
import "./Producto.css"; 
import ejemplo from "../../assets/ejemplo.jpg"; 

const productos = [
  { imgSrc: ejemplo, nombre: "Guitarra Clásica", precio: "$179.99" },
  { imgSrc: ejemplo, nombre: "Batería Completa", precio: "$499.99" },
  { imgSrc: ejemplo, nombre: "Piano Digital", precio: "$899.99" },
  { imgSrc: ejemplo, nombre: "Bajo Eléctrico", precio: "$299.99" },
];

const Producto = () => {
  return (
    <div className="productos-container">
      <div className="productos-grid">
        {productos.map((producto, index) => (
          <div key={index} className="producto-card">
            <img src={producto.imgSrc} alt={producto.nombre} className="producto-img" />
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <h4 className="producto-precio">{producto.precio}</h4>
            <button className="producto-boton">Añadir al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Producto;
