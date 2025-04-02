import React from 'react';
import CheckReserva from "../../assets/ReservaCheck.png";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import "./Confirmation.css";

export const Confirmation = () => {
    let navigate = useNavigate();

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
        <button className = "button-details"  onClick={() => navigate(-1)}>
          Ver detalles
        </button>
          <button className="button-home" onClick={() => navigate("/")}>
          Ir a inicio
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
