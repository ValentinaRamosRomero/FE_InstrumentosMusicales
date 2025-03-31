import React from 'react';
import CheckReserva from "../../assets/ReservaCheck.png";
import "./Confirmation.css";

export const Confirmation = () => {
  return (
    <div className ="container-success">
      {/* Icono de verificación */}
        <img src={CheckReserva} alt="ReservaCheck" 
        className = "iconReserveCheck" />

      {/* Texto de confirmación */}
      <h2>Reserva realizada con éxito</h2>
      <p>
        Su reserva ha sido generada exitosamente, gracias por utilizar nuestros
        servicios
      </p>

      {/* Botones */}
      <div className = "container-buttons">
        <button className = "button-details">
          Ver detalles
        </button>
        <button className = "button-home">
          Ir a inicio
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
