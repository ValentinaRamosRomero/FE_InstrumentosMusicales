import React from "react";
import "./ErrorReserve.css";
import ErrorReserva from "../../assets/ReservaError.png";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export const ErrorReserve = () => {
  let navigate = useNavigate();

  return (
    <div className="error">
      <div className="container-error">
        {/* Icono de verificación */}
        <img
          src={ErrorReserva}
          alt="ReservaCheck"
          className="iconReserveError"
        />

        {/* Texto de confirmación */}
        <h2>Ha ocurrido un error</h2>
        <p>
          Su reserva no se ha podido realizar por un error de disponibilidad,
          seleccione una nueva fecha o seleccione otro producto
        </p>

        {/* Botones */}
        <div className="container-button">
          <button className="button-modify" onClick={() => navigate(-1)}>
            Modificar reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorReserve;
