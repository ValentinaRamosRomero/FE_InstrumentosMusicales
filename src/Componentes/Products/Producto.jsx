import React from "react";
import "./Producto.css";
import ejemplo from "../../assets/ejemplo.png";

const productos = [
  { id: 1,imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
  { id: 2,imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
  { id: 3,imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
  { id: 4,imgSrc: ejemplo, nombre: "Nombre Producto", precio: "$179.99" },
  
];

const Producto = () => {
  return (
    <div className="productos-container">
      {productos.map((producto, index) => (
        <div key={index} className="producto-card">
          <img
            src={producto.imgSrc}
            alt={producto.nombre}
            className="producto-img"
          />
          <h3 className="producto-nombre">{producto.nombre}</h3>
          <h4 className="producto-precio">{producto.precio}</h4>
          <button className="producto-boton">Añadir</button>
        </div>
      ))}
    </div>
  );
};

export default Producto;
