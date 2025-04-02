import React from "react";
import "./ErrorReserve.css";
import ErrorReserva from "../../assets/ReservaError.png";

export const ErrorReserve = () => {
  return (
    <div className="container-error">
      {/* Icono de verificación */}
      <img src={ErrorReserva} alt="ReservaCheck" className="iconReserveError" />

      {/* Texto de confirmación */}
      <h2>Ha ocurrido un error</h2>
      <p>
        Su reserva no se ha podido realizar por un error de disponibilidad,
        seleccione una nueva fecha o seleccione otro producto
      </p>

      {/* Botones */}
      <div className="container-button">
        <button className="button-modify">Modificar reserva</button>
      </div>
    </div>
  );
};

export default ErrorReserve;
