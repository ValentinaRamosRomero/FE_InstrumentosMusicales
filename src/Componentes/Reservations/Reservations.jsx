import React, {useEffect, useState} from "react";
import "../Products/ProductDetail.css";
import "./Reservations.css";
import Header from "../Header/Header";
import Calendar from "./Calendar";
import Footer from "../Footer/Footer";
import {FaCalendarAlt} from "react-icons/fa";
import axios from "axios";
import {useParams} from "react-router-dom";
import Confirmation from "./Confirmation";
import ErrorReserve from "./ErrorReserve";

const Reservations = ({product, isAuthenticated, userData, onLogout}) => {
    const {id} = useParams();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [bookedDateRanges, setBookedDateRanges] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [reservationStatus, setReservationStatus] = useState(null); // Nuevo estado

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_API_URL + `/reservations/products/${id}`
                );
                const reservationData = response.data.data;
                setBookedDateRanges(
                    reservationData.map((reservation) => ({
                        startDate: new Date(reservation.startDate),
                        endDate: new Date(reservation.endDate),
                    }))
                );
            } catch (error) {
                console.error("Error cargando fechas reservadas:", error);
            }
        };

        fetchAvailability();
    }, [id]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const email = localStorage.getItem("email");
                if (email && !userData) {
                    const response = await axios.get(
                        import.meta.env.VITE_API_URL + `/users/email/${email}`
                    );
                    setUserInfo(response.data);
                }
            } catch (error) {
                console.error("Error al traer datos del usuario:", error);
            }
        };

        fetchUserInfo();
    }, [userData]);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const isDateBooked = (date) => {
        return bookedDateRanges.some((range) => {
            const checkDate = new Date(date);
            checkDate.setHours(0, 0, 0, 0);
            const start = new Date(range.startDate);
            const end = new Date(range.endDate);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            return checkDate >= start && checkDate <= end;
        });
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const calcularDuracion = () => {
        if (!startDate || !endDate) return "";
        const diff = endDate - startDate;
        const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return dias > 0 ? `${dias} día(s)` : "Fechas inválidas";
    };

    const handleSubmit = async () => {
        if (!startDate || !endDate) {
            alert("Por favor selecciona un rango de fechas válido.");
            return;
        }

        const formattedStart = startDate.toISOString().split("T")[0];
        const formattedEnd = endDate.toISOString().split("T")[0];

        const reservationData = {
            productId: product.id,
            nombre: currentUser?.nombre,
            apellido: currentUser?.apellido,
            userEmail: currentUser?.email,
            startDate: formattedStart,
            endDate: formattedEnd,
        };

        try {
            const token = localStorage.getItem("token"); // Recupera el Bearer Token
            await axios.post(
                import.meta.env.VITE_API_URL + "/reservations/save",
                reservationData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Se agrega el Bearer Token

                    }
                }
            );

            setReservationStatus("success"); // Estado de éxito
        } catch (error) {
            console.error("Error al confirmar la reserva:", error);
            setReservationStatus("error"); // Estado de error
        }
    };

    if (!product) return <p>Cargando...</p>;

    useEffect(() => {
        const storedStart = localStorage.getItem("fechaInicio");
        const storedEnd = localStorage.getItem("fechaFin");

        const parseLocalDate = (str) => {
            const [year, month, day] = str.split("-");
            return new Date(Number(year), Number(month) - 1, Number(day));
        };

        if (storedStart) setStartDate(parseLocalDate(storedStart));
        if (storedEnd) setEndDate(parseLocalDate(storedEnd));
    }, []);

    const fallbackUser = {
        nombre: localStorage.getItem("nombre") || "",
        apellido: localStorage.getItem("apellido") || "",
        email: localStorage.getItem("email") || "",
    };

    const currentUser = userData?.nombre
        ? userData
        : userInfo?.nombre
            ? userInfo
            : fallbackUser;

    // Renderizar componentes en función del estado de la reserva
    if (reservationStatus === "success") return <Confirmation/>;
    if (reservationStatus === "error") return <ErrorReserve/>;

    return (
        <>
            <Header isAuthenticated={isAuthenticated} userData={currentUser} onLogout={onLogout}/>

            <div className="reservations-container">
                <h2 className="reservationProduct-title">{product.name}</h2>

                <div className="Detalles-reservacion">
                    <div className="user-info-row">
                        <div className="user-info-grid">
                            <div><strong>Nombre:</strong> {currentUser?.nombre} {currentUser?.apellido}</div>
                            <div><strong>Correo electrónico:</strong> {currentUser?.email}</div>
                        </div>
                    </div>

                    <div className="fechas-seleccionadas">
                        <p><strong>Fecha de
                            entrega:</strong> {startDate ? startDate.toLocaleDateString() : "No seleccionada"}</p>
                        <p><strong>Fecha de
                            devolución:</strong> {endDate ? endDate.toLocaleDateString() : "No seleccionada"}</p>
                        <p><strong>Duración total del alquiler:</strong> {calcularDuracion()}</p>
                    </div>
                </div>

                {/* Botón para mostrar el calendario */}
                <div className="calendar-toggle-container">
                    <h3>Selecciona el período de reserva</h3>
                    <button className="calendar-icon-button" onClick={toggleCalendar}>
                        <FaCalendarAlt size={24}/>
                        {showCalendar ? " Ocultar calendario" : " Ver calendario"}
                    </button>
                </div>

                {/* Mostrar calendario si es necesario */}
                {showCalendar && (
                    <Calendar
                        startDate={startDate}
                        endDate={endDate}
                        onChange={handleDateChange}
                        isDateBooked={isDateBooked}
                    />
                )}

                {/* Botón de confirmación */}
                <div className="reservation-actions">
                    <button className="reservation-button" onClick={handleSubmit}>
                        Confirmar Reserva
                    </button>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Reservations;
