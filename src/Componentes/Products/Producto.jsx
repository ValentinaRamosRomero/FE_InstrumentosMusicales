import React from "react";
import "./Producto.css";
import ejemplo from "../../assets/ejemplo.png";
import { useNavigate } from "react-router-dom";

const productos = [
  { id: 1,imgSrc: "https://res.cloudinary.com/dqc7cuyox/image/upload/fl_preserve_transparency/v1740764829/bateria_wv0uz9.jpg?_s=public-apps", nombre: "Nombre Producto", precio: "$179.99" },
  { id: 2,imgSrc: "https://res.cloudinary.com/dqc7cuyox/image/upload/fl_preserve_transparency/v1740764931/teclado_dwzjio.jpg?_s=public-apps", nombre: "Nombre Producto", precio: "$179.99" },
  { id: 3,imgSrc: "https://res.cloudinary.com/dqc7cuyox/image/upload/fl_preserve_transparency/v1740765016/guitarra_foto_1_err4rl.jpg?_s=public-apps", nombre: "Nombre Producto", precio: "$179.99" },
  { id: 4,imgSrc: "https://res.cloudinary.com/dqc7cuyox/image/upload/fl_preserve_transparency/v1740765108/bateria2_z2hmc5.jpg?_s=public-apps", nombre: "Nombre Producto", precio: "$179.99" },
  
];

const Producto = () => {
  const navigate = useNavigate();

  return (
    <div className="productos-container">
      {productos.map((producto, index) => (
        <div key={index} className="producto-card" onClick={() => navigate("/1")}>
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
