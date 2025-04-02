import React, { useEffect, useState } from "react";
import CheckReserva from "../../assets/ReservaCheck.png";
import ErrorReservaImg from "../../assets/ReservaError.png";
import "./Confirmation.css";
import "./ErrorReserve.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado inicial desde la navegación o valores predeterminados
  const [isLoading, setIsLoading] = useState(true); // Siempre comienza cargando
  const [isSuccess, setIsSuccess] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    // Actualizar el estado con la información recibida de la navegación
    if (location.state?.reservationData) {
      setReservationData(location.state.reservationData);
      
      // Procesar la reserva automáticamente cuando el componente se monte
      processReservation(location.state.reservationData);
    } else {
      // Si no hay datos de reserva, mostrar error
      setIsLoading(false);
      setIsSuccess(false);
    }


    // Obtener fechas de localStorage
    const storedStart = localStorage.getItem("fechaInicio");
    const storedEnd = localStorage.getItem("fechaFin");

    if (storedStart) {
      const [year, month, day] = storedStart.split("-");
      setStartDate(new Date(Number(year), Number(month) - 1, Number(day)));
    }

    if (storedEnd) {
      const [year, month, day] = storedEnd.split("-");
      setEndDate(new Date(Number(year), Number(month) - 1, Number(day)));
    }
  }, [location.state]);
  const processReservation = async (data) => {
    try {
      const token = localStorage.getItem("token");
      
      // Configurar los headers con el token de autenticación
      const headers = {
        "Content-Type": "application/json",
      };

      // Añadir el token Authorization si existe
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      // Hacer la solicitud con los headers de autenticación
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/reservations/save",
        data,
        { headers }
      );

      console.log("Respuesta exitosa:", response.data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      console.error(
        "Error al confirmar la reserva:",
        error.response ? error.response.data : error.message
      );
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <p>Procesando su reserva...</p>
        </div>
      ) : isSuccess ? (
        <div className="container-success">
          {/* Icono de verificación */}
          <img
            src={CheckReserva}
            alt="ReservaCheck"
            className="iconReserveCheck"
          />

          {/* Texto de confirmación */}
          <h2>Reserva realizada con éxito</h2>
          <p>
            Su reserva ha sido generada exitosamente, gracias por utilizar
            nuestros servicios
          </p>

          {startDate && endDate && (
            <div className="reserva-detalles">
              <p>
                <strong>Fecha de entrega:</strong>{" "}
                {startDate.toLocaleDateString()}
              </p>
              <p>
                <strong>Fecha de devolución:</strong>{" "}
                {endDate.toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="container-buttons">
            <button className="button-home" onClick={() => navigate(`/`)}>
              Ir a inicio
            </button>
          </div>
        </div>
      ) : (
        <div className="container-error">
          <img
            src={ErrorReservaImg}
            alt="ReservaError"
            className="iconReserveError"
          />

          {/* Texto de error */}
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
      )}
    </>
  );
};

export default Confirmation;
